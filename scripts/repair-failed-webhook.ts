/**
 * Repair Script: Manually process failed webhook
 *
 * This script manually processes a failed webhook by:
 * 1. Fetching evaluation data from MongoDB
 * 2. Calling backend API (without user_country field)
 * 3. Saving the AI response back to MongoDB
 *
 * Usage: tsx scripts/repair-failed-webhook.ts <session_id_or_bewertung_id>
 */

import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Ben:0uHLigRaM3od7rIj@cluster0.5hnp1sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const BACKEND_URL = process.env.BACKEND_URL || 'https://pferdewert-api.onrender.com';

interface BackendRequestData {
  rasse: string;
  alter: number;
  geschlecht: string;
  abstammung?: string;
  stockmass: number;
  ausbildung: string;
  haupteignung: string;
  aku?: string;
  erfolge?: string;
  farbe?: string;
  zuechter?: string;
  standort?: string;
  charakter?: string;
  besonderheiten?: string;
  land?: string;
}

interface BackendResponse {
  ai_response?: string;
  ai_model?: string;
  ai_model_version?: string;
}

const convertStockmassToNumber = (stockmass: unknown): number => {
  if (stockmass === null || stockmass === undefined || stockmass === '') {
    return 0;
  }

  const raw = String(stockmass).trim().toLowerCase();
  const numValue = parseFloat(raw.replace(/cm|m/g, '').trim());
  if (isNaN(numValue)) {
    return 0;
  }

  const hasMetersUnit = /(^|\s|\b)m(\b|\s|$)/.test(raw) && !/cm/.test(raw);

  if (hasMetersUnit || (numValue >= 1.0 && numValue <= 2.5)) {
    return Math.round(numValue * 100);
  }
  if (numValue >= 50 && numValue <= 250) {
    return Math.round(numValue);
  }
  if (numValue >= 1000 && numValue <= 3000) {
    const cm = Math.round(numValue / 10);
    if (cm >= 50 && cm <= 250) return cm;
  }
  if (numValue >= 3000 && numValue <= 30000) {
    const cm = Math.round(numValue / 100);
    if (cm >= 50 && cm <= 250) return cm;
  }

  return 0;
};

async function repairFailedWebhook(identifier: string) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Use 'test' database (production evaluations are stored here)
    const db = client.db('test');
    const collection = db.collection('bewertungen');

    // Find document by stripeSessionId OR _id
    let doc;
    if (ObjectId.isValid(identifier)) {
      doc = await collection.findOne({ _id: new ObjectId(identifier) });
    } else {
      doc = await collection.findOne({ stripeSessionId: identifier });
    }

    if (!doc) {
      console.error('❌ No document found for:', identifier);
      process.exit(1);
    }

    console.log('📄 Found document:', doc._id.toString());
    console.log('📊 Current status:', doc.status);

    if (doc.bewertung && doc.status === 'fertig') {
      console.log('✅ Document already has bewertung. Nothing to do.');
      process.exit(0);
    }

    // Extract data
    const {
      rasse,
      alter,
      geschlecht,
      abstammung,
      stockmass,
      ausbildung,
      haupteignung,
      aku,
      erfolge,
      farbe,
      zuechter,
      standort,
      charakter,
      besonderheiten,
      land,
    } = doc;

    // Prepare backend request (WITHOUT user_country)
    const bewertbareDaten: BackendRequestData = {
      rasse: String(rasse || ''),
      alter: parseInt(String(alter)) || 0,
      geschlecht: String(geschlecht || ''),
      abstammung: abstammung ? String(abstammung) : undefined,
      stockmass: convertStockmassToNumber(stockmass),
      ausbildung: String(ausbildung || ''),
      haupteignung: String(haupteignung || 'Sport'),
      aku: aku ? String(aku) : undefined,
      erfolge: erfolge ? String(erfolge) : undefined,
      farbe: farbe ? String(farbe) : undefined,
      zuechter: zuechter ? String(zuechter) : undefined,
      standort: standort ? String(standort) : undefined,
      charakter: charakter ? String(charakter) : undefined,
      besonderheiten: besonderheiten ? String(besonderheiten) : undefined,
      land: land ? String(land) : undefined,
    };

    console.log('🚀 Calling backend API...');
    console.log('📦 Request data:', bewertbareDaten);

    const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bewertbareDaten),
    });

    console.log('📡 Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend API error:', errorText);
      process.exit(1);
    }

    const gptResponse: BackendResponse = await response.json();
    const aiResponse = gptResponse?.ai_response;
    const aiModel = gptResponse?.ai_model;
    const aiModelVersion = gptResponse?.ai_model_version;

    if (!aiResponse) {
      console.error('❌ No AI response in backend response');
      process.exit(1);
    }

    console.log('✅ Received AI response');
    console.log('🤖 AI Model:', aiModel, aiModelVersion);

    // Update MongoDB
    const updateResult = await collection.updateOne(
      { _id: doc._id },
      {
        $set: {
          bewertung: aiResponse,
          status: 'fertig',
          aktualisiert: new Date(),
          ...(aiModel && { ai_model: aiModel }),
          ...(aiModelVersion && { ai_model_version: aiModelVersion }),
        },
      }
    );

    console.log('💾 MongoDB update result:', {
      acknowledged: updateResult.acknowledged,
      modifiedCount: updateResult.modifiedCount,
    });

    if (updateResult.modifiedCount === 0) {
      console.error('⚠️  No documents were modified');
      process.exit(1);
    }

    console.log('✅ Successfully repaired webhook for:', doc._id.toString());
    console.log('🔗 User can now view result at: https://pferdewert.de/ergebnis?id=' + doc._id.toString());

  } catch (err) {
    console.error('❌ Error:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run script
const identifier = process.argv[2];
if (!identifier) {
  console.error('Usage: tsx scripts/repair-failed-webhook.ts <session_id_or_bewertung_id>');
  process.exit(1);
}

repairFailedWebhook(identifier);
