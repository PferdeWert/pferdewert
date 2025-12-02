# Webhook Production Fixes - Implementation Summary

## Overview

This document describes the production-ready fixes implemented for the Outrank webhook integration following code review findings. All fixes address critical security and reliability issues.

## Priority 1: Rate Limiting Implementation

### What Was Fixed
- **Issue**: No rate limiting on webhook endpoint, creating DoS vulnerability
- **Impact**: Bad actors could overwhelm the endpoint with malicious requests

### Implementation Details

#### Files Modified
1. **frontend/lib/webhook-security.ts** (lines 252-346)
   - Enhanced `WebhookRateLimiter` class with automatic memory cleanup
   - Added `getClientIp()` helper to extract client IP from proxied requests
   - Implemented 5-minute cleanup interval to prevent memory leaks

2. **frontend/pages/api/webhooks/outrank-publish.ts** (lines 79-86, 259-265)
   - Instantiated global `rateLimiter` instance
   - Moved rate limiting to Step 1 (before auth, to prevent timing leaks)
   - Extract client IP using `x-forwarded-for` and `x-real-ip` headers

#### Configuration
```typescript
const WEBHOOK_RATE_LIMIT = {
  MAX_REQUESTS: 100,        // Max 100 requests
  WINDOW_MS: 60 * 1000,     // Per 1 minute (60 seconds)
  BURST_SIZE: 10,           // Allow 10 burst requests
} as const;
```

#### Response
Rate limit exceeded returns HTTP 429:
```json
{
  "error": "Too many requests - rate limit exceeded. Maximum 100 requests per minute."
}
```

#### IP Detection
Handles both direct connections and proxied requests:
```
x-forwarded-for: 192.168.1.1, 10.0.0.1  -> Uses 192.168.1.1 (first in list)
x-real-ip: 192.168.1.1                  -> Uses 192.168.1.1
socket.remoteAddress: 192.168.1.1       -> Falls back to direct connection
```

### Testing Rate Limiting
```bash
# Within limit (should succeed)
curl -H "Authorization: Bearer YOUR_SECRET" \
  https://pferdewert.de/api/webhooks/outrank-publish

# Exceed limit (should return 429)
for i in {1..105}; do
  curl -H "Authorization: Bearer YOUR_SECRET" \
    https://pferdewert.de/api/webhooks/outrank-publish &
done
wait
```

---

## Priority 2: MongoDB Dead Letter Queue Implementation

### What Was Fixed
- **Issue**: Failed webhooks only logged, not persisted for audit/retry
- **Impact**: Lost visibility into failures, no way to manually recover failed webhooks

### Implementation Details

#### Files Modified
1. **frontend/lib/webhook-utils.ts** (lines 1-11, 44-92, 208-305)
   - Added MongoDB imports and Zod validation schema
   - Updated `FailedWebhookEntry` interface with `expiresAt` field
   - Implemented actual MongoDB storage in `storeFailedWebhook()`
   - Added fallback console logging if MongoDB fails

2. **frontend/lib/mongo/failed-webhooks-setup.ts** (NEW FILE)
   - Collection schema definition
   - TTL index setup (30-day automatic deletion)
   - Helper functions for verification and querying

3. **frontend/pages/api/webhooks/outrank-publish.ts** (lines 127-142)
   - Calculate `expiresAt` timestamp (30 days from now)
   - Pass to `storeFailedWebhook()` for persistence

#### MongoDB Collection Schema

**Collection Name**: `failed_webhooks`

**Document Structure**:
```javascript
{
  _id: "outrank_2024-01-15T10:30:00.000Z_1705314600000",
  id: "outrank_2024-01-15T10:30:00.000Z_1705314600000",
  timestamp: "2024-01-15T10:30:00.000Z",
  eventType: "publish_articles",
  payload: { /* complete webhook payload */ },
  errorMessage: "Database connection failed",
  errorStack: "Error: connect ECONNREFUSED 127.0.0.1:27017\n    at TCPConnectWrap...",
  retryCount: 3,
  lastRetryAt: "2024-01-15T10:35:00.000Z",
  requiresManualReview: true,
  expiresAt: "2024-02-14T10:30:00.000Z",  // 30 days later
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

#### Required Indexes

Execute this to initialize the collection:
```typescript
import { setupFailedWebhooksCollection } from '@/lib/mongo/failed-webhooks-setup';

// During deployment
await setupFailedWebhooksCollection();
```

**Indexes created**:
1. `expiresAt` (TTL) - Auto-delete after 30 days
2. `timestamp` (descending) - Recent failures first
3. `eventType` - Filter by webhook type
4. `requiresManualReview` - Find items needing attention
5. `eventType + timestamp + requiresManualReview` - Efficient audit queries

#### DSGVO Compliance
- **TTL Index**: Documents automatically deleted 30 days after `expiresAt`
- **No Indefinite Storage**: Failed webhooks don't persist indefinitely
- **Audit Trail**: Timestamps allow tracing issues over 30-day period

#### Fallback Handling
If MongoDB fails:
1. Logs error: "Failed to store webhook in MongoDB, attempting fallback logging"
2. Writes to console as `WEBHOOK_DLQ_FALLBACK` JSON line
3. Operations continue (non-blocking)

### Testing MongoDB DLQ

```typescript
// Verify collection exists and has proper indexes
import { verifyFailedWebhooksCollection, countPendingWebhookReviews } from '@/lib/mongo/failed-webhooks-setup';

const status = await verifyFailedWebhooksCollection();
console.log(status);
// {
//   collectionExists: true,
//   indexes: [
//     { name: '_id_', spec: { _id: 1 } },
//     { name: 'expiresAt_ttl', spec: { expiresAt: 1 } },
//     { name: 'timestamp_desc', spec: { timestamp: -1 } },
//     ...
//   ]
// }

// Count pending reviews
const pending = await countPendingWebhookReviews();
console.log(`${pending} webhooks require manual review`);

// Retrieve recent failures
const recent = await getRecentFailedWebhooks(5);
recent.forEach(entry => {
  console.log(`${entry.eventType}: ${entry.errorMessage}`);
});
```

---

## Priority 3: Type Safety for DLQ Payload

### What Was Fixed
- **Issue**: Payload typed as `unknown`, losing type information
- **Impact**: Lost IDE autocomplete and type safety for webhook debugging

### Implementation Details

#### File Modified
**frontend/lib/webhook-utils.ts** (lines 44-92)

#### Before
```typescript
payload: unknown;  // Not type-safe
```

#### After
```typescript
// Define schema in webhook-utils for reusability
export const OutrankWebhookEventSchema = z.object({
  event_type: z.enum(['publish_articles']),
  timestamp: z.string(),
  data: z.object({
    articles: z.array(/* ... */)
  }),
});

// Use in FailedWebhookEntry
interface FailedWebhookEntry {
  payload: z.infer<typeof OutrankWebhookEventSchema>;  // Fully typed
  // ...
}
```

#### Benefits
- IDE autocomplete on `entry.payload.event_type`
- Type checking at compile time
- Single source of truth for schema definition

---

## Priority 4: Field Naming Consistency

### What Was Fixed
- **Issue**: Inconsistent field naming between schema and documentation
- **Impact**: Developer confusion about event type values

### Implementation Details

#### Clarified Conversion
```
Incoming from Outrank: event_type: "publish_articles"
                       ↓ (converted on receipt)
Stored in database:    eventType: "publish_articles"
                       ↓ (same value, different case)
In responses:          eventType: "publish_articles"
```

This is consistent throughout the system - only the field name changes, not the value.

**Updated examples in webhook-utils.ts** to use `'publish_articles'` consistently.

---

## Priority 5: Sitemap Regeneration Error Tracking

### What Was Fixed
- **Issue**: Sitemap errors silently ignored, no tracking in webhook response
- **Impact**: Missed SEO issues, users unaware of generation failures

### Implementation Details

#### Files Modified
1. **frontend/pages/api/webhooks/outrank-publish.ts**
   - Modified `regenerateSitemap()` to return error message (or null on success)
   - Added warning collection (lines 352-357)
   - Include warnings in response (line 367)

2. **frontend/lib/webhook-utils.ts**
   - Updated type to `Promise<string | null>`

#### Implementation
```typescript
async function regenerateSitemap(): Promise<string | null> {
  try {
    info('🔄 Regenerating sitemap.xml and robots.txt...');
    await execAsync('npm run sitemap');
    return null;  // Success - no warning
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    logError('Failed to regenerate sitemap:', err);
    return `Sitemap regeneration failed: ${errorMsg}`;
  }
}
```

#### Response Format
If sitemap regeneration fails:
```json
{
  "success": true,
  "processed": 5,
  "failed": 0,
  "skipped": 0,
  "warnings": [
    "Sitemap regeneration failed: ENOENT: no such file or directory, open '/app/public/sitemap.xml'"
  ],
  "results": [...]
}
```

---

## API Request/Response Examples

### 1. Successful Request
```bash
curl -X POST https://pferdewert.de/api/webhooks/outrank-publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secret_token" \
  -d '{
    "event_type": "publish_articles",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "data": {
      "articles": [
        {
          "id": "article_123",
          "title": "Pferdekauf Guide 2024",
          "content_markdown": "...",
          "content_html": "...",
          "meta_description": "Complete guide for buying horses",
          "created_at": "2024-01-15T10:30:00.000Z",
          "image_url": "https://example.com/image.jpg",
          "slug": "pferdekauf-guide-2024",
          "tags": ["pferdekauf", "guide"]
        }
      ]
    }
  }'
```

### 2. Rate Limited Response (429)
```bash
HTTP/1.1 429 Too Many Requests

{
  "error": "Too many requests - rate limit exceeded. Maximum 100 requests per minute."
}
```

### 3. Successful Response with Warnings
```json
HTTP/1.1 200 OK

{
  "success": true,
  "processed": 5,
  "failed": 0,
  "skipped": 0,
  "timestamp": "2024-01-15T10:30:15.000Z",
  "failed_list_revalidations": [
    "/pferde-ratgeber"
  ],
  "warnings": [
    "Sitemap regeneration failed: ENOENT: no such file or directory"
  ],
  "results": [
    {
      "slug": "pferdekauf-guide-2024",
      "status": "success",
      "message": "Article created successfully",
      "article_id": "507f1f77bcf86cd799439011",
      "revalidation_failed": false
    },
    {
      "slug": "pferdeverkauf-tipps",
      "status": "success",
      "message": "Article created successfully",
      "article_id": "507f1f77bcf86cd799439012"
    }
  ]
}
```

---

## Deployment Checklist

### Before Deployment
- [ ] Run tests: `npm run test` (if tests exist)
- [ ] Run type check: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Review all changes: `git diff`

### During Deployment
1. **Initialize MongoDB Collection** (run once):
   ```typescript
   import { setupFailedWebhooksCollection } from '@/lib/mongo/failed-webhooks-setup';
   await setupFailedWebhooksCollection();
   ```

2. **Verify Webhook Secret** is set:
   ```bash
   echo $OUTRANK_WEBHOOK_SECRET  # Should output secret, not empty
   ```

3. **Test Rate Limiting**:
   ```bash
   curl -X GET https://your-domain/api/webhooks/outrank-publish \
     -H "Authorization: Bearer $OUTRANK_WEBHOOK_SECRET"
   # Should return 200 OK on first 100 requests per minute
   ```

### After Deployment
- [ ] Verify collection exists: `db.failed_webhooks.stats()`
- [ ] Verify TTL index: `db.failed_webhooks.getIndexes()`
- [ ] Test with sample webhook
- [ ] Monitor error logs for rate limiting or DLQ issues

---

## Monitoring & Alerts

### Metrics to Monitor
1. **Rate Limit Violations**: Check logs for `Rate limit exceeded for IP`
2. **Failed Webhooks**: Query `db.failed_webhooks.countDocuments({ requiresManualReview: true })`
3. **DLQ Failures**: Log entries: `CRITICAL: Failed to store webhook in Dead Letter Queue`
4. **Sitemap Regeneration**: Warnings field in webhook responses

### Alert Triggers
- Rate limit exceeded from same IP 3+ times in 5 minutes
- DLQ insertion failures
- Pending webhooks requiring review > 10
- Consecutive sitemap regeneration failures

### Useful Queries
```javascript
// Recent failures (last hour)
db.failed_webhooks.find({
  timestamp: { $gte: new Date(Date.now() - 3600000) },
  requiresManualReview: true
}).sort({ timestamp: -1 })

// All pending reviews
db.failed_webhooks.find({ requiresManualReview: true }).count()

// Failures by error type
db.failed_webhooks.aggregate([
  { $group: { _id: "$errorMessage", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Cleanup old entries manually (before TTL)
db.failed_webhooks.deleteMany({
  expiresAt: { $lt: new Date() }
})
```

---

## Testing Instructions

### Unit Tests
See `frontend/lib/webhook-testing.ts` for helper functions:

```typescript
import {
  testRateLimiter,
  testWebhookAuth,
  runAllWebhookTests
} from '@/lib/webhook-testing';

// Run individual tests
const rateLimitTests = testRateLimiter();
console.log(rateLimitTests);

// Run full suite
const results = await runAllWebhookTests();
if (results.overallPassed) {
  console.log('All tests passed!');
}
```

### Integration Testing
```bash
# Get test curl command
node -e "
  const { getCurlTestCommand } = require('@/lib/webhook-testing');
  console.log(getCurlTestCommand(
    'http://localhost:3000/api/webhooks/outrank-publish',
    'test_secret_123',
    1
  ));
"

# Test with sample payload
curl -X POST http://localhost:3000/api/webhooks/outrank-publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_secret_123" \
  -d '{
    "event_type": "publish_articles",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "data": {
      "articles": [{...}]
    }
  }'
```

### Load Testing
```bash
# Test rate limiting with concurrent requests
ab -n 110 -c 10 \
  -H "Authorization: Bearer $OUTRANK_WEBHOOK_SECRET" \
  https://pferdewert.de/api/webhooks/outrank-publish

# Should see rate limit errors (429) after 100 requests
```

---

## Rollback Instructions

If issues arise:

1. **Disable Rate Limiting** (temporarily):
   - Comment out rate limit check in outrank-publish.ts (line 260-265)
   - Redeploy
   - Investigate root cause

2. **Restore Old DLQ Behavior**:
   - Revert changes to `storeFailedWebhook()` in webhook-utils.ts
   - Keep error logging but disable MongoDB storage

3. **Database Recovery**:
   - If `failed_webhooks` collection corrupted:
   ```javascript
   db.failed_webhooks.drop()
   // Re-run setupFailedWebhooksCollection()
   ```

---

## Summary of Changes

| File | Changes | Lines |
|------|---------|-------|
| `frontend/lib/webhook-security.ts` | Enhanced rate limiter, added IP detection | 252-346 |
| `frontend/lib/webhook-utils.ts` | Added MongoDB storage, Zod schema, type safety | 1-11, 44-92, 208-305 |
| `frontend/pages/api/webhooks/outrank-publish.ts` | Rate limiting integration, error tracking | 19, 79-86, 127-142, 184-201, 259-265, 337-338, 352-367 |
| `frontend/lib/mongo/failed-webhooks-setup.ts` | NEW: Collection setup and helpers | All |
| `frontend/lib/webhook-testing.ts` | NEW: Test utilities | All |

**Total Lines Added**: ~600 lines (production code + documentation)
**Breaking Changes**: None
**Migration Needed**: Yes - run `setupFailedWebhooksCollection()` after deployment

---

## References

- [Rate Limiting Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Prevention_Cheat_Sheet.html)
- [MongoDB TTL Indexes](https://docs.mongodb.com/manual/core/index-ttl/)
- [DSGVO Data Retention Requirements](https://gdpr-info.eu/art-5-gdpr/)
- [Express Rate Limiting Patterns](https://expressjs.com/en/resources/middleware/rate-limit.html)
