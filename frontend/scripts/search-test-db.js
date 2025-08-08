// scripts/search-test-db.js
// Script to search in the correct database (test)

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function searchInTestDB(documentId) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('test'); // Using 'test' database instead of 'pferdewert'
    const collection = db.collection('bewertungen');
    
    // Search by ObjectId
    if (documentId) {
      console.log(`🔍 Searching for document ID: ${documentId}`);
      
      try {
        const objectId = new ObjectId(documentId);
        const doc = await collection.findOne({ _id: objectId });
        
        if (doc) {
          console.log('✅ Document found!');
          console.log('📋 Document details:');
          console.log(`   ID: ${doc._id.toString()}`);
          console.log(`   Stripe Session: ${doc.stripeSessionId || 'N/A'}`);
          console.log(`   Status: ${doc.status || 'N/A'}`);
          console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
          console.log(`   Alter: ${doc.alter || 'N/A'}`);
          console.log(`   Geschlecht: ${doc.geschlecht || 'N/A'}`);
          console.log(`   Stockmass: ${doc.stockmass || 'N/A'}`);
          console.log(`   Has Bewertung: ${!!doc.bewertung}`);
          console.log(`   Created: ${doc.erstellt || doc.erstelltAm || 'N/A'}`);
          
          if (doc.bewertung) {
            console.log(`   Bewertung preview: ${doc.bewertung.substring(0, 100)}...`);
          }
          
          return doc;
        } else {
          console.log('❌ Document not found with that ID');
        }
      } catch (err) {
        console.log('❌ Invalid ObjectId format');
      }
    }
    
    // Search for documents without bewertung (failed orders)
    console.log('\n🔍 Searching for failed orders (without bewertung)...');
    const failedDocs = await collection.find({
      $and: [
        { stripeSessionId: { $exists: true, $ne: null } }, // Has paid
        {
          $or: [
            { bewertung: { $exists: false } },
            { bewertung: null },
            { bewertung: '' },
            { status: { $ne: 'fertig' } }
          ]
        }
      ]
    }).sort({ erstellt: -1 }).limit(10).toArray();
    
    console.log(`\n💳❌ Failed orders (paid but no evaluation): ${failedDocs.length}`);
    failedDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ID: ${doc._id.toString()}`);
      console.log(`   Session: ${doc.stripeSessionId}`);
      console.log(`   Status: ${doc.status || 'N/A'}`);
      console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
      console.log(`   Has Bewertung: ${!!doc.bewertung}`);
      console.log('   ---');
    });
    
    // Get some recent successful orders for comparison
    console.log('\n✅ Recent successful orders:');
    const successfulDocs = await collection.find({
      bewertung: { $exists: true, $ne: null, $ne: '' }
    }).sort({ erstellt: -1 }).limit(3).toArray();
    
    successfulDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ID: ${doc._id.toString()}`);
      console.log(`   Session: ${doc.stripeSessionId || 'N/A'}`);
      console.log(`   Status: ${doc.status || 'N/A'}`);
      console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
      console.log('   ---');
    });
    
  } catch (error) {
    console.error('❌ Error searching database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Main execution
const documentId = process.argv[2];
searchInTestDB(documentId).catch(console.error);