#!/usr/bin/env node
/**
 * List all databases and collections in MongoDB Atlas
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

async function listDatabases() {
  let client;

  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    console.log('✅ Connected to MongoDB Atlas\n');

    // List all databases
    const adminDb = client.db().admin();
    const { databases } = await adminDb.listDatabases();

    console.log('📚 AVAILABLE DATABASES:\n');
    console.log('='.repeat(80));

    for (const database of databases) {
      console.log(`\n📊 Database: ${database.name}`);
      console.log(`   Size: ${(database.sizeOnDisk / 1024 / 1024).toFixed(2)} MB`);

      // List collections in this database
      const db = client.db(database.name);
      const collections = await db.listCollections().toArray();

      console.log('   Collections:');
      for (const col of collections) {
        const collection = db.collection(col.name);
        const count = await collection.countDocuments();
        console.log(`      - ${col.name} (${count} documents)`);
      }
    }

    console.log('\n' + '='.repeat(80));

    // Check for bewertungen in each database
    console.log('\n🔍 Searching for bewertungen collection...\n');

    for (const database of databases) {
      const db = client.db(database.name);
      const collections = await db.listCollections({ name: 'bewertungen' }).toArray();

      if (collections.length > 0) {
        const collection = db.collection('bewertungen');
        const count = await collection.countDocuments();
        const latest = await collection.find({}).sort({ erstellt: -1 }).limit(1).toArray();

        console.log(`✅ Found bewertungen in: ${database.name}`);
        console.log(`   Total documents: ${count}`);

        if (latest.length > 0) {
          console.log('   Latest evaluation:');
          console.log('      ID:', latest[0]._id.toString());
          console.log('      Created:', latest[0].erstellt);
          console.log('      Status:', latest[0].status);
          console.log('      Has bewertung:', !!(latest[0].bewertung));
        }

        console.log('\n   💡 To use this database, set:');
        console.log(`      MONGODB_DB=${database.name}\n`);
      }
    }

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

listDatabases();
