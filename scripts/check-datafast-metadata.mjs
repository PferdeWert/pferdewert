#!/usr/bin/env node
// scripts/check-datafast-metadata.mjs
// Prüft ob DataFast Cookies in MongoDB Bewertungen vorhanden sind

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'test';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI fehlt');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

async function checkDataFastMetadata() {
  try {
    await client.connect();
    console.log('✅ Mit MongoDB verbunden\n');
    console.log(`📊 Datenbank: ${MONGODB_DB}\n`);

    const db = client.db(MONGODB_DB);
    const bewertungen = db.collection('bewertungen');

    // Heutige Bewertungen
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysEvals = await bewertungen
      .find({ erstellt: { $gte: today } })
      .sort({ erstellt: 1 })
      .toArray();

    console.log(`📅 Bewertungen heute: ${todaysEvals.length}\n`);

    for (const doc of todaysEvals) {
      const time = doc.erstellt.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log(`⏰ ${time} - ${doc.rasse}`);
      console.log(`   Bewertung ID: ${doc._id}`);
      console.log(`   Stripe Session: ${doc.stripeSessionId}`);
      console.log(`   Status: ${doc.status}`);
      console.log(`   Attribution Source: ${doc.attribution_source || '❌ fehlt'}`);

      // Prüfe ob DataFast Cookies im Dokument gespeichert sind
      const hasDataFastVisitor = !!doc.datafast_visitor_id;
      const hasDataFastSession = !!doc.datafast_session_id;

      console.log(`   DataFast Visitor ID: ${hasDataFastVisitor ? '✅ vorhanden' : '❌ fehlt'}`);
      console.log(`   DataFast Session ID: ${hasDataFastSession ? '✅ vorhanden' : '❌ fehlt'}`);

      if (hasDataFastVisitor) {
        console.log(`     → Visitor: ${doc.datafast_visitor_id}`);
      }
      if (hasDataFastSession) {
        console.log(`     → Session: ${doc.datafast_session_id}`);
      }

      console.log('');
    }

    // Zusammenfassung
    const withAttribution = todaysEvals.filter(d => d.attribution_source).length;
    const withDataFastVisitor = todaysEvals.filter(d => d.datafast_visitor_id).length;
    const withDataFastSession = todaysEvals.filter(d => d.datafast_session_id).length;

    console.log('📊 Zusammenfassung:');
    console.log(`   Mit Attribution Source: ${withAttribution}/${todaysEvals.length}`);
    console.log(`   Mit DataFast Visitor ID: ${withDataFastVisitor}/${todaysEvals.length}`);
    console.log(`   Mit DataFast Session ID: ${withDataFastSession}/${todaysEvals.length}`);

    if (withDataFastVisitor === 0 && withDataFastSession === 0) {
      console.log('\n⚠️  PROBLEM: Keine DataFast Cookies in MongoDB gespeichert!');
      console.log('   → Cookies werden nicht von checkout.ts in die Datenbank geschrieben');
      console.log('   → Stripe erhält die Cookies in metadata, aber MongoDB nicht');
    }

  } catch (error) {
    console.error('❌ Fehler:', error);
  } finally {
    await client.close();
    console.log('\n✅ Verbindung geschlossen');
  }
}

checkDataFastMetadata();
