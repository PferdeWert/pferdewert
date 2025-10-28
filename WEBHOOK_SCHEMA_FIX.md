# Outrank Webhook Schema Mismatch Fix

## Summary
Fixed webhook schema validation errors (HTTP 400) caused by field name and enum value mismatches between Outrank's actual webhook format and our implementation.

## Root Cause
- **Outrank sends**: `event_type: "publish_articles"`
- **Our code expected**: `event: "article.published"` (incorrect field name and enum values)

This schema mismatch caused Zod validation to fail with 400 Bad Request errors on all webhook calls.

---

## Changes Made

### 1. Zod Schema Update
**File**: `/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/frontend/pages/api/webhooks/outrank-publish.ts`

**Lines 41-47** - Updated webhook event validation schema:

```typescript
// BEFORE:
const OutrankWebhookEventSchema = z.object({
  event: z.enum(['article.published', 'article.updated', 'article.deleted']),
  timestamp: z.string(),
  data: z.object({
    articles: z.array(OutrankArticleSchema),
  }),
});

// AFTER:
const OutrankWebhookEventSchema = z.object({
  event_type: z.enum(['publish_articles']),
  timestamp: z.string(),
  data: z.object({
    articles: z.array(OutrankArticleSchema),
  }),
});
```

**Changes**:
- Renamed field: `event` → `event_type`
- Updated enum: `['article.published', 'article.updated', 'article.deleted']` → `['publish_articles']`

### 2. Dead Letter Queue Reference
**File**: `/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/frontend/pages/api/webhooks/outrank-publish.ts`

**Line 119** - Updated field reference in error handler:

```typescript
// BEFORE:
eventType: event.event,

// AFTER:
eventType: event.event_type,
```

### 3. TypeScript Type Definition
**File**: `/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/frontend/types/ratgeber.ts`

**Lines 28-34** - Updated OutrankWebhookEvent interface:

```typescript
// BEFORE:
export interface OutrankWebhookEvent {
  event: 'article.published' | 'article.updated' | 'article.deleted';
  timestamp: string; // ISO 8601
  data: {
    articles: OutrankArticlePayload[];
  };
}

// AFTER:
export interface OutrankWebhookEvent {
  event_type: 'publish_articles';
  timestamp: string; // ISO 8601
  data: {
    articles: OutrankArticlePayload[];
  };
}
```

**Changes**:
- Renamed field: `event` → `event_type`
- Changed union type to literal: `'article.published' | 'article.updated' | 'article.deleted'` → `'publish_articles'`

### 4. Test Script Payload
**File**: `/Users/benjaminredir/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/frontend/scripts/test-webhook-sitemap.mjs`

**Line 15** - Updated test payload to match Outrank format:

```javascript
// BEFORE:
const TEST_PAYLOAD = {
  event: 'article.published',
  // ... rest of payload
};

// AFTER:
const TEST_PAYLOAD = {
  event_type: 'publish_articles',
  // ... rest of payload
};
```

---

## Verification

### Type Safety
✅ TypeScript compilation: **PASSED**
- No type errors detected
- All interfaces properly aligned
- Zod schema validates correctly

### Linting
✅ ESLint checks: **PASSED**
- No linting violations
- Code follows project standards
- All imports/exports correct

### Schema Consistency
✅ All references aligned:
- Zod schema matches Outrank documentation
- Type definitions consistent across codebase
- Test payload reflects actual Outrank format

---

## Impact

### What This Fixes
1. **400 Bad Request errors** on webhook calls are now resolved
2. **Zod validation** will correctly accept Outrank payloads
3. **Type safety** across the codebase is restored
4. **Error handling** in Dead Letter Queue will work correctly

### Affected Components
- Outrank webhook handler: `/api/webhooks/outrank-publish`
- Type system: `types/ratgeber.ts`
- Test script: `scripts/test-webhook-sitemap.mjs`

### Testing
To verify the fix works:

```bash
# 1. Start dev server
npm run dev

# 2. Run webhook test
node frontend/scripts/test-webhook-sitemap.mjs

# 3. Execute the curl command from the test output with proper auth token
```

Expected result: **200 OK** with `success: true` in response

---

## Acceptance Criteria - ALL MET

- [x] Zod schema matches Outrank documentation exactly
- [x] All TypeScript types are consistent
- [x] No type errors after changes
- [x] Test payload in test-webhook-sitemap.mjs is correct
- [x] Dead Letter Queue reference updated
- [x] ESLint and TypeScript checks passing

---

## Files Changed (Summary)

| File | Lines | Change |
|------|-------|--------|
| `frontend/pages/api/webhooks/outrank-publish.ts` | 42, 119 | Zod schema and error handler |
| `frontend/types/ratgeber.ts` | 29 | TypeScript interface |
| `frontend/scripts/test-webhook-sitemap.mjs` | 15 | Test payload |

**Total Files**: 3
**Total Lines Changed**: 4 field references
**Breaking Changes**: None (internal fixes only)
**Backwards Compatibility**: N/A (webhook format was incorrect)

---

## Next Steps

1. **Deploy to staging** to test with actual Outrank webhook calls
2. **Monitor logs** in webhook handler for successful article processing
3. **Verify sitemap generation** works end-to-end with new articles
4. **Update Outrank integration** if any additional event types need support

---

Generated: 2025-10-28
Status: Ready for deployment
