// scripts/send-customer-email.js
// Script to send customer notification email for completed order

import { MongoClient, ObjectId } from 'mongodb';
import { Resend } from 'resend';
import { config } from 'dotenv';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}

const resend = new Resend(RESEND_API_KEY);

async function sendCustomerEmail(documentId, customerEmail) {
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
    
    console.log('✅ Found document:', {
      _id: doc._id.toString(),
      stripeSessionId: doc.stripeSessionId,
      status: doc.status,
      hasBewertung: !!doc.bewertung
    });
    
    if (!doc.bewertung) {
      throw new Error('Document does not have an evaluation yet. Run fix-order first.');
    }
    
    console.log(`📧 Sending email to: ${customerEmail}`);
    
    const emailResult = await resend.emails.send({
      from: "PferdeWert <info@pferdewert.de>",
      to: customerEmail,
      subject: "🐴 Deine Pferdebewertung ist fertig!",
      html: `
        <h2>Hallo!</h2>
        <p>Deine Pferdebewertung ist jetzt verfügbar:</p>
            <br> 
        <p><strong><a href="https://pferdewert.de/ergebnis?id=${doc._id}" 
           style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
           🐴 Zur Bewertung & PDF-Download
        </a></strong></p>
            <br>
        <p><small>Falls der Button nicht funktioniert:<br>
        https://pferdewert.de/ergebnis?id=${doc._id}</small></p>
        
        <p>Entschuldige die Verzögerung - aufgrund eines technischen Problems wurde deine Bewertung mit einiger Verspätung erstellt.</p>
        
        <p>Viele Grüße,<br>Dein PferdeWert-Team</p>
      `
    });
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', emailResult.data?.id || 'N/A');
    
    console.log('\n🎉 Customer notification completed!');
    console.log(`🔗 Customer can access their evaluation at:`);
    console.log(`   https://pferdewert.de/ergebnis?session_id=${doc.stripeSessionId}`);
    
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Main execution
async function main() {
  const documentId = process.argv[2];
  const customerEmail = process.argv[3];
  
  if (!documentId || !customerEmail) {
    console.error('❌ Usage: node scripts/send-customer-email.mjs <document-id> <customer-email>');
    console.error('Example: node scripts/send-customer-email.mjs 68963bc9818a940a01833301 customer@example.com');
    process.exit(1);
  }
  
  try {
    console.log(`📧 Sending customer notification email for document: ${documentId}`);
    await sendCustomerEmail(documentId, customerEmail);
    console.log('🎉 Email notification completed successfully!');
  } catch (error) {
    console.error('💥 Email notification failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
