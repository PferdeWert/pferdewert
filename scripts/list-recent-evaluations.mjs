#!/usr/bin/env node
/**
 * List all recent evaluations regardless of status
 */

import { MongoClient } from 'mongodb';
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
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';

async function listRecentEvaluations() {
  let client;

  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('📊 Database:', MONGODB_DB);

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);

    // List all collections
    console.log('\n📚 Available collections:');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log('  -', col.name);
    });

    // Check bewertungen collection
    const collection = db.collection('bewertungen');
    const count = await collection.countDocuments();

    console.log('\n📊 Total evaluations:', count);

    if (count === 0) {
      console.log('❌ No evaluations found in database');
      return;
    }

    // Get most recent evaluations
    const evaluations = await collection
      .find({})
      .sort({ erstellt: -1 })
      .limit(5)
      .toArray();

    console.log('\n📋 RECENT EVALUATIONS:\n');
    console.log('='.repeat(100));

    evaluations.forEach((doc, index) => {
      const id = doc._id.toString();
      const hasBewertung = !!(doc.bewertung && doc.bewertung.trim());
      const sessionId = doc.stripeSessionId || 'N/A';
      const created = doc.erstellt ? new Date(doc.erstellt).toLocaleString('de-DE') : 'N/A';
      const status = doc.status || 'unknown';

      console.log(`\n${index + 1}. EVALUATION:`);
      console.log('   ID:', id);
      console.log('   Status:', status);
      console.log('   Created:', created);
      console.log('   Has AI Evaluation:', hasBewertung ? '✅ YES' : '❌ NO');
      console.log('   Stripe Session ID:', sessionId);

      if (doc.bewertung) {
        console.log('   Evaluation length:', doc.bewertung.length, 'chars');
        console.log('   First 100 chars:', doc.bewertung.substring(0, 100) + '...');
      }

      console.log('\n   🐴 Horse Data:');
      console.log('      Rasse:', doc.rasse || 'N/A');
      console.log('      Alter:', doc.alter || 'N/A', 'Jahre');
      console.log('      Geschlecht:', doc.geschlecht || 'N/A');

      console.log('\n   🔗 Customer Link:');
      console.log('      https://pferdewert.de/ergebnis?id=' + id);

      if (!hasBewertung) {
        console.log('\n   ⚠️ MISSING EVALUATION - TO REGENERATE:');
        console.log('      node scripts/regenerate-evaluation.mjs', id);
      }

      console.log('\n' + '-'.repeat(100));
    });

    console.log('\n' + '='.repeat(100) + '\n');

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

listRecentEvaluations();
