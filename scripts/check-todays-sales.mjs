#!/usr/bin/env node
// scripts/check-todays-sales.mjs
// Überprüft alle heutigen Verkäufe und DataFast-Events
// Run: node --env-file=frontend/.env.local scripts/check-todays-sales.mjs

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI fehlt in .env.local');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

async function checkTodaysSales() {
  try {
    await client.connect();
    console.log('✅ Mit MongoDB verbunden');

    const db = client.db(MONGODB_DB);

    // Heute um 00:00 Uhr
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Morgen um 00:00 Uhr
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log(`\n📅 Suche Verkäufe zwischen ${today.toISOString()} und ${tomorrow.toISOString()}\n`);

    // 1. Alle heutigen Bewertungen
    const bewertungen = db.collection('bewertungen');
    const todaysEvaluations = await bewertungen.find({
      erstellt: { $gte: today, $lt: tomorrow }
    }).sort({ erstellt: 1 }).toArray();

    console.log(`📊 Gefundene Bewertungen heute: ${todaysEvaluations.length}\n`);

    todaysEvaluations.forEach((doc, index) => {
      const erstelltTime = doc.erstellt.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      console.log(`${index + 1}. Bewertung:`);
      console.log(`   ID: ${doc._id}`);
      console.log(`   Erstellt: ${erstelltTime}`);
      console.log(`   Status: ${doc.status}`);
      console.log(`   Stripe Session: ${doc.stripeSessionId}`);
      console.log(`   Rasse: ${doc.rasse}`);
      console.log(`   Attribution: ${doc.attribution_source || 'nicht angegeben'}`);
      console.log('');
    });

    // 2. Webhook-Verarbeitung überprüfen
    const webhookProcessing = db.collection('webhook_processing');
    const todaysWebhooks = await webhookProcessing.find({
      processedAt: { $gte: today, $lt: tomorrow }
    }).sort({ processedAt: 1 }).toArray();

    console.log(`\n🔔 Webhook-Verarbeitungen heute: ${todaysWebhooks.length}\n`);

    todaysWebhooks.forEach((webhook, index) => {
      const processedTime = webhook.processedAt.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      console.log(`${index + 1}. Webhook:`);
      console.log(`   Session ID: ${webhook.sessionId}`);
      console.log(`   Verarbeitet: ${processedTime}`);
      console.log(`   Status: ${webhook.status}`);
      if (webhook.completedAt) {
        const completedTime = webhook.completedAt.toLocaleString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        console.log(`   Abgeschlossen: ${completedTime}`);
      }
      console.log('');
    });

    // 3. Duplikate identifizieren
    const sessionIds = todaysWebhooks.map(w => w.sessionId);
    const duplicates = sessionIds.filter((id, index) => sessionIds.indexOf(id) !== index);

    if (duplicates.length > 0) {
      console.log(`\n⚠️  DUPLIKATE GEFUNDEN: ${duplicates.length}`);
      duplicates.forEach(sessionId => {
        console.log(`   - Session ID: ${sessionId}`);
      });
    } else {
      console.log('\n✅ Keine Webhook-Duplikate gefunden');
    }

    // 4. Zeitanalyse um 21:00 Uhr
    const ninePM = new Date(today);
    ninePM.setHours(21, 0, 0, 0);
    const ninePMEnd = new Date(today);
    ninePMEnd.setHours(21, 59, 59, 999);

    const ninePMEvaluations = todaysEvaluations.filter(doc =>
      doc.erstellt >= ninePM && doc.erstellt <= ninePMEnd
    );

    console.log(`\n🕘 Bewertungen zwischen 21:00-22:00 Uhr: ${ninePMEvaluations.length}`);
    ninePMEvaluations.forEach(doc => {
      const time = doc.erstellt.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      console.log(`   - ${time}: ${doc._id} (${doc.rasse})`);
    });

    // 5. Gesamtumsatz heute
    const totalRevenue = todaysEvaluations.filter(doc => doc.status === 'fertig').length * 14.90;
    console.log(`\n💰 Gesamtumsatz heute: ${totalRevenue.toFixed(2)} €`);
    console.log(`   Abgeschlossene Bewertungen: ${todaysEvaluations.filter(doc => doc.status === 'fertig').length}`);
    console.log(`   Offene Bewertungen: ${todaysEvaluations.filter(doc => doc.status === 'offen').length}`);

  } catch (error) {
    console.error('❌ Fehler:', error);
  } finally {
    await client.close();
    console.log('\n✅ Verbindung geschlossen');
  }
}

checkTodaysSales();
