// scripts/get-customer-email.js
// Script to get customer email from Stripe session

const { MongoClient, ObjectId } = require('mongodb');
const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

async function getCustomerEmail(documentId) {
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
    
    if (!doc.stripeSessionId) {
      throw new Error('Document does not have a Stripe session ID');
    }
    
    console.log('✅ Found document with session:', doc.stripeSessionId);
    
    // Get session details from Stripe
    console.log('🔍 Retrieving Stripe session details...');
    const session = await stripe.checkout.sessions.retrieve(doc.stripeSessionId);
    
    console.log('✅ Stripe session retrieved');
    console.log('📧 Customer details:');
    console.log(`   Email: ${session.customer_details?.email || 'Not available'}`);
    console.log(`   Name: ${session.customer_details?.name || 'Not available'}`);
    console.log(`   Phone: ${session.customer_details?.phone || 'Not available'}`);
    console.log(`   Status: ${session.status}`);
    console.log(`   Payment Status: ${session.payment_status}`);
    console.log(`   Amount: ${session.amount_total ? (session.amount_total / 100) + ' EUR' : 'N/A'}`);
    
    return {
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      phone: session.customer_details?.phone,
      sessionId: doc.stripeSessionId,
      documentId: doc._id.toString()
    };
    
  } catch (error) {
    console.error('❌ Error getting customer email:', error);
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
    console.error('❌ Usage: node scripts/get-customer-email.js <document-id>');
    console.error('Example: node scripts/get-customer-email.js 68963bc9818a940a01833301');
    process.exit(1);
  }
  
  try {
    console.log(`🔍 Getting customer email for document: ${documentId}`);
    const customerInfo = await getCustomerEmail(documentId);
    
    if (customerInfo.email) {
      console.log('\n🎯 Ready to send email:');
      console.log(`Command: node scripts/send-customer-email.js ${documentId} ${customerInfo.email}`);
    } else {
      console.log('\n❌ No customer email found in Stripe session');
    }
    
  } catch (error) {
    console.error('💥 Failed to get customer email:', error);
    process.exit(1);
  }
}

main().catch(console.error);