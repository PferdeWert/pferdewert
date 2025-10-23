# MongoDB Setup Verification Guide

## Current Status

✅ **Completed:**
- Collection `ratgeber_articles` created
- 7 indexes created via MongoDB MCP tools
- TypeScript interfaces in `frontend/types/ratgeber.ts` (284 lines)
- Repository pattern in `frontend/lib/mongo/ratgeber-repository.ts` (548 lines)
- Verification script `verify_mongo_setup.js` (127 lines)
- Text index creation script `create_text_index.js`

⏳ **Pending Verification:**
- Confirm all 9 indexes exist (8 created + 1 default `_id` index)
- Verify unique constraints on `outrank.slug` and `outrank.id`
- Confirm text search index with German language support
- Check placeholder document status

## Step 1: Run Verification Script

Execute the following command with your MongoDB Atlas connection string:

```bash
mongosh 'mongodb+srv://[username]:[password]@[cluster].mongodb.net/pferdewert' \
  --file verify_mongo_setup.js
```

**Example:**
```bash
mongosh 'mongodb+srv://pferdewert:mypass123@cluster0.abc123.mongodb.net/pferdewert' \
  --file verify_mongo_setup.js
```

### Expected Output

The script will check and report on:

```
================================================================================
MONGODB SETUP VERIFICATION FOR RATGEBER_ARTICLES
================================================================================

1. Checking collection existence...
   Collection 'ratgeber_articles': ✓ EXISTS

2. Checking indexes...
   Total indexes found: 9

   Index Details:
   - _id_:
     Fields: {"_id":1}
   - slug_unique:
     Fields: {"outrank.slug":1}
     Unique: ✓ YES
   - outrank_id_unique:
     Fields: {"outrank.id":1}
     Unique: ✓ YES
   - status_published:
     Fields: {"publishing.status":1,"publishing.published_at":-1}
   - category_status:
     Fields: {"taxonomy.category":1,"publishing.status":1}
   - tags_index:
     Fields: {"outrank.tags":1}
   - related_topics:
     Fields: {"taxonomy.related_topics":1}
   - fulltext_search:
     Fields: {"_fts":"text","_ftsx":1}
     Language: german
   - created_at_desc:
     Fields: {"created_at":-1}

3. Checking for placeholder document...
   ⚠ WARNING: Placeholder document found (should be removed)
   Document ID: [ObjectId]

4. Document count...
   Total documents: 1

5. Verifying unique constraints...
   outrank.slug index: ✓ UNIQUE
   outrank.id index: ✓ UNIQUE

6. Verifying text search index...
   ✓ Text search index exists
   ✓ German language support enabled

================================================================================
VERIFICATION COMPLETE
================================================================================

SUMMARY:
- Collection exists: ✓
- Total indexes: 9/9 expected
- Unique constraints: ✓
- Text search: ✓
- Placeholder cleanup: ⚠

Next steps:
4. Remove placeholder document: db.ratgeber_articles.deleteOne({_placeholder: true})
```

## Step 2: Address Issues Based on Verification Results

### Scenario A: Text Index Missing

If verification shows: **✗ Text search index NOT FOUND**

Execute the text index creation script:

```bash
mongosh 'mongodb+srv://[connection-string]/pferdewert' \
  --file create_text_index.js
```

This creates a text search index with:
- German language support
- Custom weights: `title` (10), `content_markdown` (5)
- Name: `fulltext_search`

### Scenario B: Missing Unique Constraints

If verification shows: **✗ NOT UNIQUE (NEEDS FIX)**

Connect to MongoDB and fix the indexes:

```bash
mongosh 'mongodb+srv://[connection-string]/pferdewert'
```

Then execute:

```javascript
// Drop existing non-unique indexes
db.ratgeber_articles.dropIndex("slug_index");  // or whatever the current name is
db.ratgeber_articles.dropIndex("outrank_id_index");

// Recreate with unique constraint
db.ratgeber_articles.createIndex(
  { "outrank.slug": 1 },
  { name: "slug_unique", unique: true }
);

db.ratgeber_articles.createIndex(
  { "outrank.id": 1 },
  { name: "outrank_id_unique", unique: true }
);

print("Unique indexes recreated successfully");
```

### Scenario C: Missing Indexes

If verification shows fewer than 9 indexes, create the missing ones:

```javascript
// Connect to pferdewert database
db = db.getSiblingDB('pferdewert');

// Create missing indexes (example for each type)
db.ratgeber_articles.createIndex(
  { "publishing.status": 1, "publishing.published_at": -1 },
  { name: "status_published" }
);

db.ratgeber_articles.createIndex(
  { "taxonomy.category": 1, "publishing.status": 1 },
  { name: "category_status" }
);

db.ratgeber_articles.createIndex(
  { "outrank.tags": 1 },
  { name: "tags_index" }
);

db.ratgeber_articles.createIndex(
  { "taxonomy.related_topics": 1 },
  { name: "related_topics" }
);

db.ratgeber_articles.createIndex(
  { "created_at": -1 },
  { name: "created_at_desc" }
);
```

## Step 3: Cleanup Placeholder Document

After verification confirms all indexes are correct, remove the placeholder:

```bash
mongosh 'mongodb+srv://[connection-string]/pferdewert'
```

```javascript
// Remove placeholder document
db.ratgeber_articles.deleteOne({ _placeholder: true });

// Verify removal
db.ratgeber_articles.countDocuments();  // Should return 0
```

## Step 4: Final Verification

Run the verification script again to confirm everything is perfect:

```bash
mongosh 'mongodb+srv://[connection-string]/pferdewert' \
  --file verify_mongo_setup.js
```

Expected final output:
```
SUMMARY:
- Collection exists: ✓
- Total indexes: 9/9 expected
- Unique constraints: ✓
- Text search: ✓
- Placeholder cleanup: ✓

Next steps:
[No next steps - setup complete!]
```

## Step 5: Test Repository Integration

After MongoDB verification is complete, test the repository integration:

```typescript
// In Next.js API route or test file
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import clientPromise from '@/lib/mongo';

// Test basic operations
async function testSetup() {
  const client = await clientPromise;
  const db = client.db('pferdewert');
  const repo = getRatgeberRepository(db);

  // Test findPublished (should return empty array)
  const result = await repo.findPublished(1, 10);
  console.log('Published articles:', result);
  // Expected: { articles: [], total: 0, page: 1, limit: 10, hasMore: false }

  // Test getAllSlugs (should return empty array)
  const slugs = await repo.getAllSlugs();
  console.log('All slugs:', slugs);
  // Expected: []

  console.log('✓ Repository integration working correctly');
}
```

## Complete Index List Reference

The `ratgeber_articles` collection should have exactly **9 indexes**:

1. **`_id_`** (default)
   - Fields: `{ "_id": 1 }`
   - Type: Single field, unique

2. **`slug_unique`**
   - Fields: `{ "outrank.slug": 1 }`
   - Type: Single field, unique
   - Purpose: Prevent duplicate slugs, enable fast slug-based lookups

3. **`outrank_id_unique`**
   - Fields: `{ "outrank.id": 1 }`
   - Type: Single field, unique
   - Purpose: Idempotency for Outrank webhook processing

4. **`status_published`**
   - Fields: `{ "publishing.status": 1, "publishing.published_at": -1 }`
   - Type: Compound
   - Purpose: Filter published articles sorted by date

5. **`category_status`**
   - Fields: `{ "taxonomy.category": 1, "publishing.status": 1 }`
   - Type: Compound
   - Purpose: Category filtering with status

6. **`tags_index`**
   - Fields: `{ "outrank.tags": 1 }`
   - Type: Array index
   - Purpose: Tag-based queries and related articles

7. **`related_topics`**
   - Fields: `{ "taxonomy.related_topics": 1 }`
   - Type: Array index
   - Purpose: Topic-based article discovery

8. **`fulltext_search`**
   - Fields: `{ "outrank.title": "text", "outrank.content_markdown": "text" }`
   - Type: Text index
   - Language: German
   - Weights: title (10), content (5)
   - Purpose: Full-text search functionality

9. **`created_at_desc`**
   - Fields: `{ "created_at": -1 }`
   - Type: Single field, descending
   - Purpose: Chronological sorting

## Troubleshooting

### Connection Issues

If mongosh fails to connect:

```bash
# Test connection first
mongosh 'mongodb+srv://[connection-string]/pferdewert' --eval "db.version()"

# Check MongoDB Atlas:
# 1. IP whitelist includes your current IP (or 0.0.0.0/0 for testing)
# 2. Database user credentials are correct
# 3. Network access is enabled
```

### Permission Issues

If you get permission errors:

```bash
# Ensure user has readWrite role on pferdewert database
# In Atlas Console: Database Access → Edit User → Add Role:
# - Database: pferdewert
# - Role: readWrite (or atlasAdmin for full access)
```

### MCP Tools Returning "[object Object]"

This is a known limitation. Always use the verification script via mongosh for reliable outputs.

## Next Steps After Verification

Once verification is complete and all checks pass:

1. **Set up Outrank Webhook Handler**: Create API route at `pages/api/webhooks/outrank.ts`
2. **Test Webhook Processing**: Send test payload to webhook endpoint
3. **Create ISR Pages**: Set up `pages/pferde-ratgeber/[slug].tsx` with ISR
4. **Implement Search**: Create search API route using repository's `search()` method
5. **Build Admin Interface**: Create internal admin pages for article management

## Files Reference

- **Verification Script**: `verify_mongo_setup.js`
- **Text Index Script**: `create_text_index.js`
- **Helper Script**: `run_verification.sh`
- **Repository Implementation**: `frontend/lib/mongo/ratgeber-repository.ts`
- **Type Definitions**: `frontend/types/ratgeber.ts`
- **This Guide**: `MONGODB_VERIFICATION_GUIDE.md`

---

**Document Status**: Ready for execution
**Last Updated**: Current session
**Prerequisites**: MongoDB Atlas connection string, mongosh installed
