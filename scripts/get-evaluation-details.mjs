#!/usr/bin/env node
/**
 * Get details of a specific evaluation
 */

import { MongoClient, ObjectId } from 'mongodb';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '..', '.env');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch (e) {}

const frontendEnvPath = join(__dirname, '..', 'frontend', '.env.local');
try {
  const envContent = readFileSync(frontendEnvPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch (e) {}

const MONGODB_URI = process.env.MONGODB_URI;
const evaluationId = process.argv[2];

if (!evaluationId) {
  console.error('❌ Usage: node scripts/get-evaluation-details.mjs <evaluation-id>');
  process.exit(1);
}

async function getEvaluationDetails() {
  let client;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    // Try both databases
    const databases = ['test', 'pferdewert'];

    for (const dbName of databases) {
      const db = client.db(dbName);
      const collection = db.collection('bewertungen');

      const doc = await collection.findOne({ _id: new ObjectId(evaluationId) });

      if (doc) {
        console.log(`\n✅ Found evaluation in database: ${dbName}\n`);
        console.log('='.repeat(100));
        console.log('\n📋 EVALUATION DETAILS:\n');
        console.log('   ID:', doc._id.toString());
        console.log('   Status:', doc.status);
        console.log('   Created:', doc.erstellt ? new Date(doc.erstellt).toLocaleString('de-DE') : 'N/A');
        console.log('   Updated:', doc.aktualisiert ? new Date(doc.aktualisiert).toLocaleString('de-DE') : 'N/A');
        console.log('   Stripe Session:', doc.stripeSessionId || 'N/A');

        console.log('\n🐴 HORSE DATA:\n');
        console.log('   Rasse:', doc.rasse || 'N/A');
        console.log('   Alter:', doc.alter || 'N/A', 'Jahre');
        console.log('   Geschlecht:', doc.geschlecht || 'N/A');
        console.log('   Stockmaß:', doc.stockmass || 'N/A', 'cm');
        console.log('   Ausbildung:', doc.ausbildung || 'N/A');
        console.log('   Haupteignung:', doc.haupteignung || 'N/A');

        if (doc.abstammung) console.log('   Abstammung:', doc.abstammung);
        if (doc.aku) console.log('   AKU:', doc.aku);
        if (doc.erfolge) console.log('   Erfolge:', doc.erfolge);
        if (doc.standort) console.log('   Standort:', doc.standort);
        if (doc.charakter) console.log('   Charakter:', doc.charakter);
        if (doc.besonderheiten) console.log('   Besonderheiten:', doc.besonderheiten);

        console.log('\n🤖 AI MODEL INFO:\n');
        console.log('   Model:', doc.ai_model || 'N/A');
        console.log('   Version:', doc.ai_model_version || 'N/A');

        const hasBewertung = !!(doc.bewertung && doc.bewertung.trim());
        console.log('\n📝 EVALUATION:\n');
        console.log('   Has bewertung:', hasBewertung ? '✅ YES' : '❌ NO');

        if (hasBewertung) {
          console.log('   Length:', doc.bewertung.length, 'characters');
          console.log('\n   Content:');
          console.log('   ' + '-'.repeat(96));
          console.log('   ' + doc.bewertung.substring(0, 500).replace(/\n/g, '\n   ') + '...');
          console.log('   ' + '-'.repeat(96));

          // Check if it's the fallback message
          if (doc.bewertung.includes('Wir arbeiten gerade an unserem KI-Modell')) {
            console.log('\n   ⚠️ WARNING: This is a FALLBACK message, not a real AI evaluation!');
            console.log('   The evaluation should be regenerated with:');
            console.log('   MONGODB_DB=test node scripts/regenerate-evaluation.mjs', evaluationId);
          }
        }

        console.log('\n🔗 CUSTOMER LINKS:\n');
        console.log('   Production:', `https://pferdewert.de/ergebnis?id=${doc._id.toString()}`);
        console.log('   Direct URL:', `https://pferdewert.de/ergebnis?session_id=${doc.stripeSessionId}`);

        console.log('\n' + '='.repeat(100) + '\n');

        return;
      }
    }

    console.log('❌ Evaluation not found in any database');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
  }
}

getEvaluationDetails();
