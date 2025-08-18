// scripts/search-orders.js
// Script to search for orders and find the failed one

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function searchOrders() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('pferdewert');
    const collection = db.collection('bewertungen');
    
    // Get total count
    const totalCount = await collection.countDocuments();
    console.log(`📊 Total documents in collection: ${totalCount}`);
    
    // Find recent documents (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentDocs = await collection.find({
      erstelltAm: { $gte: sevenDaysAgo }
    }).sort({ erstelltAm: -1 }).limit(10).toArray();
    
    console.log('\n🕐 Recent documents (last 7 days):');
    recentDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ID: ${doc._id.toString()}`);
      console.log(`   Session: ${doc.stripeSessionId || 'N/A'}`);
      console.log(`   Status: ${doc.status || 'N/A'}`);
      console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
      console.log(`   Created: ${doc.erstelltAm || 'N/A'}`);
      console.log(`   Updated: ${doc.aktualisiert || 'N/A'}`);
      console.log('   ---');
    });
    
    // Find documents without bewertung (failed orders)
    const failedDocs = await collection.find({
      $or: [
        { bewertung: { $exists: false } },
        { bewertung: null },
        { bewertung: '' },
        { status: { $ne: 'fertig' } }
      ]
    }).sort({ erstelltAm: -1 }).limit(10).toArray();
    
    console.log('\n❌ Documents without evaluation (potential failed orders):');
    failedDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ID: ${doc._id.toString()}`);
      console.log(`   Session: ${doc.stripeSessionId || 'N/A'}`);
      console.log(`   Status: ${doc.status || 'N/A'}`);
      console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
      console.log(`   Created: ${doc.erstelltAm || 'N/A'}`);
      console.log(`   Has Bewertung: ${!!doc.bewertung}`);
      console.log('   ---');
    });
    
    // Search for documents with stripeSessionId (paid orders)
    const paidDocs = await collection.find({
      stripeSessionId: { $exists: true, $ne: null }
    }).sort({ erstelltAm: -1 }).limit(5).toArray();
    
    console.log('\n💳 Documents with Stripe Session (paid orders):');
    paidDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ID: ${doc._id.toString()}`);
      console.log(`   Session: ${doc.stripeSessionId}`);
      console.log(`   Status: ${doc.status || 'N/A'}`);
      console.log(`   Rasse: ${doc.rasse || 'N/A'}`);
      console.log(`   Has Bewertung: ${!!doc.bewertung}`);
      console.log('   ---');
    });
    
  } catch (error) {
    console.error('❌ Error searching orders:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

searchOrders().catch(console.error);