#!/usr/bin/env node
/**
 * Script to regenerate AI evaluation for an existing horse valuation
 *
 * Usage:
 *   node scripts/regenerate-evaluation.mjs <bewertung-id>
 *   node scripts/regenerate-evaluation.mjs --session <stripe-session-id>
 *
 * Example:
 *   node scripts/regenerate-evaluation.mjs 67193c2e8f9a1b2c3d4e5f6a
 *   node scripts/regenerate-evaluation.mjs --session cs_test_abc123
 */

import { MongoClient, ObjectId } from 'mongodb';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Manually load .env file from project root
const envPath = join(__dirname, '..', '.env');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch (e) {
  // .env file not found, environment variables must be set manually
  console.warn('⚠️ .env file not found, using existing environment variables');
}

// Also try frontend/.env.local
const frontendEnvPath = join(__dirname, '..', 'frontend', '.env.local');
try {
  const envContent = readFileSync(frontendEnvPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch (e) {
  // frontend .env file not found
}

// Configuration
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';
const BACKEND_URL = process.env.BACKEND_URL || 'https://pferdewert-api.onrender.com';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

/**
 * Utility function to safely convert stockmass to centimeters
 * (Same logic as webhook.ts)
 */
const convertStockmassToNumber = (stockmass) => {
  if (stockmass === null || stockmass === undefined || stockmass === '') {
    console.warn('⚠️ Stockmass is empty, defaulting to 0');
    return 0;
  }

  const raw = String(stockmass).trim().toLowerCase();
  const numValue = parseFloat(raw.replace(/cm|m/g, '').trim());

  if (isNaN(numValue)) {
    console.warn('⚠️ Invalid stockmass value, defaulting to 0:', raw);
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

  console.warn('⚠️ Stockmass out of expected range, using 0:', numValue);
  return 0;
};

/**
 * Main function to regenerate evaluation
 */
async function regenerateEvaluation(identifier, useSessionId = false) {
  let client;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);
    const collection = db.collection('bewertungen');

    console.log('✅ Connected to MongoDB');

    // Find the evaluation document
    let doc;
    if (useSessionId) {
      console.log('🔍 Searching for evaluation by Session ID:', identifier);
      doc = await collection.findOne({ stripeSessionId: identifier });
    } else {
      console.log('🔍 Searching for evaluation by ID:', identifier);
      if (!ObjectId.isValid(identifier)) {
        throw new Error('Invalid ObjectId format');
      }
      doc = await collection.findOne({ _id: new ObjectId(identifier) });
    }

    if (!doc) {
      throw new Error('Evaluation not found in database');
    }

    console.log('✅ Evaluation document found');
    console.log('📋 Document ID:', doc._id.toString());
    console.log('📋 Status:', doc.status);
    console.log('📋 Created:', doc.erstellt);

    // Extract horse data from document
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
    } = doc;

    // Prepare data for backend API (same structure as webhook)
    const bewertbareDaten = {
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
    };

    console.log('\n📤 Sending data to backend API...');
    console.log('🌐 Backend URL:', BACKEND_URL);
    console.log('🐴 Horse data:', JSON.stringify(bewertbareDaten, null, 2));

    // Check backend health first
    try {
      console.log('\n🏥 Checking backend health...');
      const healthResponse = await fetch(`${BACKEND_URL}/health`);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ Backend is healthy:', healthData.status);
      } else {
        console.warn('⚠️ Backend health check failed, continuing anyway');
      }
    } catch (healthErr) {
      console.warn('⚠️ Backend health check error:', healthErr.message);
    }

    // Call backend API for evaluation
    console.log('\n🤖 Generating AI evaluation...');
    const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bewertbareDaten),
    });

    console.log('📥 Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend API error (${response.status}): ${errorText}`);
    }

    const gptResponse = await response.json();
    const aiResponse = gptResponse?.ai_response;
    const aiModel = gptResponse?.ai_model;
    const aiModelVersion = gptResponse?.ai_model_version;

    if (!aiResponse) {
      throw new Error('No AI response received from backend');
    }

    console.log('✅ AI evaluation generated successfully');
    console.log('🤖 Model used:', aiModel, `(${aiModelVersion})`);
    console.log('📝 Response length:', aiResponse.length, 'characters');

    // Save evaluation to MongoDB
    console.log('\n💾 Saving evaluation to MongoDB...');
    const updateResult = await collection.updateOne(
      { _id: doc._id },
      {
        $set: {
          bewertung: aiResponse,
          status: 'fertig',
          aktualisiert: new Date(),
          ai_model: aiModel,
          ai_model_version: aiModelVersion,
          regenerated: true,
          regenerated_at: new Date(),
        }
      }
    );

    console.log('✅ MongoDB update completed');
    console.log('📊 Modified documents:', updateResult.modifiedCount);

    // Generate customer link
    const evaluationId = doc._id.toString();
    const customerLink = `https://pferdewert.de/ergebnis?id=${evaluationId}`;

    console.log('\n' + '='.repeat(80));
    console.log('✅ SUCCESS! Evaluation regenerated successfully');
    console.log('='.repeat(80));
    console.log('\n📋 EVALUATION DETAILS:');
    console.log('  ID:', evaluationId);
    console.log('  Status:', 'fertig');
    console.log('  Model:', aiModel, `(${aiModelVersion})`);
    console.log('  Response length:', aiResponse.length, 'characters');
    console.log('\n🔗 CUSTOMER LINK:');
    console.log('  ', customerLink);
    console.log('\n📧 Send this link to your customer!');
    console.log('='.repeat(80) + '\n');

    // Optional: Print first 500 chars of evaluation
    if (process.env.SHOW_PREVIEW === 'true') {
      console.log('\n📄 EVALUATION PREVIEW (first 500 chars):');
      console.log('-'.repeat(80));
      console.log(aiResponse.substring(0, 500) + '...');
      console.log('-'.repeat(80) + '\n');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.stack) {
      console.error('\n🔍 Stack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('\n❌ Usage:');
  console.error('  node scripts/regenerate-evaluation.mjs <bewertung-id>');
  console.error('  node scripts/regenerate-evaluation.mjs --session <stripe-session-id>');
  console.error('\nExample:');
  console.error('  node scripts/regenerate-evaluation.mjs 67193c2e8f9a1b2c3d4e5f6a');
  console.error('  node scripts/regenerate-evaluation.mjs --session cs_test_abc123');
  console.error('\nEnvironment variables:');
  console.error('  MONGODB_URI     - MongoDB connection string (required)');
  console.error('  MONGODB_DB      - MongoDB database name (default: pferdewert)');
  console.error('  BACKEND_URL     - Backend API URL (default: https://pferdewert-api.onrender.com)');
  console.error('  SHOW_PREVIEW    - Show evaluation preview (default: false)\n');
  process.exit(1);
}

let identifier;
let useSessionId = false;

if (args[0] === '--session' || args[0] === '-s') {
  if (args.length < 2) {
    console.error('❌ Session ID required after --session flag');
    process.exit(1);
  }
  identifier = args[1];
  useSessionId = true;
} else {
  identifier = args[0];
}

// Run the script
regenerateEvaluation(identifier, useSessionId);
