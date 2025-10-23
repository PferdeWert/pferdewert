// Text index creation script for MongoDB
// Run with: mongosh your_connection_string create_text_index.js

db = db.getSiblingDB('pferdewert');

db.ratgeber_articles.createIndex(
  {
    "outrank.title": "text",
    "outrank.content.markdown": "text"
  },
  {
    name: "fulltext_search",
    weights: {
      "outrank.title": 10,
      "outrank.content.markdown": 5
    },
    default_language: "german"
  }
);

print("Text index 'fulltext_search' created successfully");
