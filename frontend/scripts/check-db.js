// scripts/check-db.js
// Script to check database structure and collections

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function checkDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    console.log('🔗 Connection URL:', MONGODB_URI.replace(/:[^@]*@/, ':****@'));
    
    // List all databases
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    
    console.log('\n📚 Available databases:');
    dbList.databases.forEach((db, index) => {
      console.log(`${index + 1}. ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    
    // Check pferdewert database specifically
    const db = client.db('pferdewert');
    const collections = await db.listCollections().toArray();
    
    console.log('\n📂 Collections in "pferdewert" database:');
    if (collections.length === 0) {
      console.log('   (No collections found)');
    } else {
      for (const collection of collections) {
        const coll = db.collection(collection.name);
        const count = await coll.countDocuments();
        console.log(`   - ${collection.name}: ${count} documents`);
        
        if (count > 0) {
          const sample = await coll.findOne();
          console.log(`     Sample fields: ${Object.keys(sample).join(', ')}`);
        }
      }
    }
    
    // Also check the default database
    const defaultDb = client.db();
    const defaultCollections = await defaultDb.listCollections().toArray();
    
    console.log(`\n📂 Collections in default database ("${defaultDb.databaseName}"):`)
    if (defaultCollections.length === 0) {
      console.log('   (No collections found)');
    } else {
      for (const collection of defaultCollections) {
        const coll = defaultDb.collection(collection.name);
        const count = await coll.countDocuments();
        console.log(`   - ${collection.name}: ${count} documents`);
        
        if (count > 0) {
          const sample = await coll.findOne();
          console.log(`     Sample fields: ${Object.keys(sample).join(', ')}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

checkDatabase().catch(console.error);