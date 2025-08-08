// scripts/fix-order.js
// Simple Node.js script to manually complete a failed order

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const BACKEND_URL = process.env.BACKEND_URL || 'https://pferdewert-api.onrender.com';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function fixFailedOrder(documentId) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('test');
    const collection = db.collection('bewertungen');
    
    // Find the document
    const objectId = new ObjectId(documentId);
    const doc = await collection.findOne({ _id: objectId });
    
    if (!doc) {
      throw new Error(`Document with ID ${documentId} not found`);
    }
    
    console.log('✅ Found document:', {
      _id: doc._id.toString(),
      stripeSessionId: doc.stripeSessionId,
      rasse: doc.rasse,
      status: doc.status
    });
    
    // Check if already processed
    if (doc.bewertung && doc.status === 'fertig') {
      console.log('⚠️  Document already has evaluation. Current status:', doc.status);
      console.log('Existing evaluation preview:', doc.bewertung.substring(0, 100) + '...');
      return;
    }
    
    // Prepare data for AI evaluation
    const bewertbareDaten = {
      rasse: doc.rasse,
      alter: parseInt(String(doc.alter)) || 0,
      geschlecht: doc.geschlecht,
      abstammung: doc.abstammung,
      stockmass: Math.round(parseFloat(String(doc.stockmass)) * 100) || 0, // Convert to cm*100
      ausbildung: doc.ausbildung,
      aku: doc.aku,
      erfolge: doc.erfolge,
      farbe: doc.farbe,
      zuechter: doc.zuechter,
      standort: doc.standort,
      verwendungszweck: doc.verwendungszweck,
    };
    
    console.log('🤖 Calling AI evaluation API with data:', {
      ...bewertbareDaten,
      stockmass: `${bewertbareDaten.stockmass} (converted from ${doc.stockmass})`
    });
    
    // Call backend API for evaluation
    console.log('📡 Making request to:', `${BACKEND_URL}/api/bewertung`);
    const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bewertbareDaten),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend API failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const gptResponse = await response.json();
    const rawGpt = gptResponse?.raw_gpt;
    
    if (!rawGpt) {
      throw new Error('No AI evaluation received from backend');
    }
    
    console.log('✅ AI evaluation received');
    console.log('Preview:', rawGpt.substring(0, 200) + '...');
    
    // Update document in MongoDB
    const updateResult = await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          bewertung: rawGpt, 
          status: 'fertig', 
          aktualisiert: new Date() 
        } 
      }
    );
    
    if (updateResult.modifiedCount === 1) {
      console.log('✅ Document successfully updated in MongoDB');
      console.log('✅ Order completion successful!');
      
      console.log('\n📧 Next steps:');
      console.log('1. Customer should receive email notification automatically');
      console.log('2. Customer can access their evaluation at:');
      console.log(`   https://pferdewert.de/ergebnis?session_id=${doc.stripeSessionId}`);
    } else {
      throw new Error('Failed to update document in MongoDB');
    }
    
  } catch (error) {
    console.error('❌ Error fixing failed order:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Main execution
async function main() {
  const documentId = process.argv[2];
  
  if (!documentId) {
    console.error('❌ Usage: node scripts/fix-order.js <document-id>');
    console.error('Example: node scripts/fix-order.js 68963bc9818a940a01833301');
    process.exit(1);
  }
  
  try {
    console.log(`🚀 Starting order fix for document ID: ${documentId}`);
    await fixFailedOrder(documentId);
    console.log('🎉 Order fix completed successfully!');
  } catch (error) {
    console.error('💥 Order fix failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);