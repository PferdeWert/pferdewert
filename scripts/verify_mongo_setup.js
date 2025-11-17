/**
 * MongoDB Setup Verification Script for Ratgeber Articles
 * Run with: mongosh mongodb://[your-connection-string]/pferdewert verify_mongo_setup.js
 */

// Switch to pferdewert database
db = db.getSiblingDB('pferdewert');

print("=".repeat(80));
print("MONGODB SETUP VERIFICATION FOR RATGEBER_ARTICLES");
print("=".repeat(80));

// 1. Check if collection exists
print("\n1. Checking collection existence...");
const collections = db.getCollectionNames();
const collectionExists = collections.includes('ratgeber_articles');
print(`   Collection 'ratgeber_articles': ${collectionExists ? '✓ EXISTS' : '✗ NOT FOUND'}`);

if (!collectionExists) {
  print("   ERROR: Collection does not exist. Setup incomplete.");
  quit(1);
}

// 2. Check indexes
print("\n2. Checking indexes...");
const indexes = db.ratgeber_articles.getIndexes();
print(`   Total indexes found: ${indexes.length}`);

const expectedIndexes = [
  { name: "_id_", fields: { _id: 1 } },
  { name: "slug_unique", fields: { "outrank.slug": 1 }, unique: true },
  { name: "status_published", fields: { "publishing.status": 1, "publishing.published_at": -1 } },
  { name: "category_status", fields: { "taxonomy.category": 1, "publishing.status": 1 } },
  { name: "tags_index", fields: { "outrank.tags": 1 } },
  { name: "related_topics", fields: { "taxonomy.related_topics": 1 } },
  { name: "fulltext_search", type: "text" },
  { name: "outrank_id_unique", fields: { "outrank.id": 1 }, unique: true },
  { name: "created_at_desc", fields: { "created_at": -1 } }
];

print("\n   Index Details:");
indexes.forEach(index => {
  print(`   - ${index.name}:`);
  print(`     Fields: ${JSON.stringify(index.key)}`);
  if (index.unique) {
    print(`     Unique: ✓ YES`);
  }
  if (index.default_language) {
    print(`     Language: ${index.default_language}`);
  }
});

// 3. Check for placeholder document
print("\n3. Checking for placeholder document...");
const placeholderDoc = db.ratgeber_articles.findOne({ _placeholder: true });
if (placeholderDoc) {
  print("   ⚠ WARNING: Placeholder document found (should be removed)");
  print("   Document ID: " + placeholderDoc._id);
} else {
  print("   ✓ No placeholder document found");
}

// 4. Document count
print("\n4. Document count...");
const docCount = db.ratgeber_articles.countDocuments();
print(`   Total documents: ${docCount}`);

// 5. Verify unique indexes
print("\n5. Verifying unique constraints...");
const slugIndex = indexes.find(idx => idx.name === "slug_unique" || JSON.stringify(idx.key).includes("outrank.slug"));
const outrankIdIndex = indexes.find(idx => idx.name === "outrank_id_unique" || JSON.stringify(idx.key).includes("outrank.id"));

if (slugIndex) {
  print(`   outrank.slug index: ${slugIndex.unique ? '✓ UNIQUE' : '✗ NOT UNIQUE (NEEDS FIX)'}`);
} else {
  print("   ✗ outrank.slug index: NOT FOUND");
}

if (outrankIdIndex) {
  print(`   outrank.id index: ${outrankIdIndex.unique ? '✓ UNIQUE' : '✗ NOT UNIQUE (NEEDS FIX)'}`);
} else {
  print("   ✗ outrank.id index: NOT FOUND");
}

// 6. Verify text search index
print("\n6. Verifying text search index...");
const textIndex = indexes.find(idx => idx.name === "fulltext_search" || (idx.key && idx.key._fts === "text"));
if (textIndex) {
  print("   ✓ Text search index exists");
  if (textIndex.default_language === "german") {
    print("   ✓ German language support enabled");
  } else {
    print("   ⚠ WARNING: Language is not set to 'german'");
  }
} else {
  print("   ✗ Text search index NOT FOUND (needs creation)");
}

print("\n" + "=".repeat(80));
print("VERIFICATION COMPLETE");
print("=".repeat(80));

// Summary
print("\nSUMMARY:");
print(`- Collection exists: ${collectionExists ? '✓' : '✗'}`);
print(`- Total indexes: ${indexes.length}/9 expected`);
print(`- Unique constraints: ${slugIndex?.unique && outrankIdIndex?.unique ? '✓' : '⚠'}`);
print(`- Text search: ${textIndex ? '✓' : '✗'}`);
print(`- Placeholder cleanup: ${!placeholderDoc ? '✓' : '⚠'}`);

print("\nNext steps:");
if (!collectionExists) {
  print("1. Create the ratgeber_articles collection");
}
if (!slugIndex?.unique) {
  print("1. Create unique index on outrank.slug");
}
if (!outrankIdIndex?.unique) {
  print("2. Create unique index on outrank.id");
}
if (!textIndex) {
  print("3. Run create_text_index.js to create text search index");
}
if (placeholderDoc) {
  print("4. Remove placeholder document: db.ratgeber_articles.deleteOne({_placeholder: true})");
}
