#!/usr/bin/env node
/**
 * Script to find incomplete evaluations (paid but no AI evaluation)
 *
 * Usage:
 *   node scripts/find-incomplete-evaluations.mjs
 *   node scripts/find-incomplete-evaluations.mjs --all  # Show all evaluations
 *   node scripts/find-incomplete-evaluations.mjs --limit 5  # Limit results
 */

import { MongoClient } from 'mongodb';
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

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

async function findIncompleteEvaluations(showAll = false, limit = 10) {
  let client;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);
    const collection = db.collection('bewertungen');

    console.log('✅ Connected to MongoDB');
    console.log('🔍 Searching for evaluations...\n');

    // Build query based on options
    let query = {};
    if (!showAll) {
      // Find evaluations with Stripe session but no AI evaluation
      query = {
        $or: [
          { bewertung: { $exists: false } },
          { bewertung: null },
          { bewertung: '' }
        ],
        stripeSessionId: { $exists: true }
      };
    }

    const evaluations = await collection
      .find(query)
      .sort({ erstellt: -1 })
      .limit(limit)
      .toArray();

    if (evaluations.length === 0) {
      console.log('✅ No incomplete evaluations found!');
      console.log('   All evaluations have been processed successfully.\n');
      return;
    }

    console.log('📋 FOUND', evaluations.length, 'EVALUATION(S):\n');
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
      console.log('   Has AI Evaluation:', hasBewertung ? '✅' : '❌');
      console.log('   Stripe Session ID:', sessionId);

      // Show horse data
      console.log('\n   🐴 Horse Data:');
      console.log('      Rasse:', doc.rasse || 'N/A');
      console.log('      Alter:', doc.alter || 'N/A', 'Jahre');
      console.log('      Geschlecht:', doc.geschlecht || 'N/A');
      console.log('      Stockmaß:', doc.stockmass || 'N/A', 'cm');
      console.log('      Ausbildung:', doc.ausbildung || 'N/A');
      console.log('      Haupteignung:', doc.haupteignung || 'N/A');

      if (!hasBewertung) {
        console.log('\n   🔧 TO REGENERATE:');
        console.log('      node scripts/regenerate-evaluation.mjs', id);
        console.log('      # or with session ID:');
        console.log('      node scripts/regenerate-evaluation.mjs --session', sessionId);
      }

      console.log('\n' + '-'.repeat(100));
    });

    console.log('\n' + '='.repeat(100));
    console.log('\n💡 TIP: To regenerate a missing evaluation, use:');
    console.log('   node scripts/regenerate-evaluation.mjs <evaluation-id>');
    console.log('   node scripts/regenerate-evaluation.mjs --session <stripe-session-id>\n');

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
let showAll = args.includes('--all') || args.includes('-a');
let limit = 10;

const limitIndex = args.findIndex(arg => arg === '--limit' || arg === '-l');
if (limitIndex !== -1 && args[limitIndex + 1]) {
  limit = parseInt(args[limitIndex + 1]) || 10;
}

// Run the script
findIncompleteEvaluations(showAll, limit);
