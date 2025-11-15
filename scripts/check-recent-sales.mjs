#!/usr/bin/env node
// scripts/check-recent-sales.mjs
// Überprüft die letzten 10 Verkäufe mit Zeitstempeln

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI fehlt');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

async function checkRecentSales() {
  try {
    await client.connect();
    console.log('✅ Mit MongoDB verbunden\n');

    const db = client.db(MONGODB_DB);
    const bewertungen = db.collection('bewertungen');

    // Letzte 10 Bewertungen (sortiert nach Erstellung)
    // WICHTIG: MongoDB speichert in UTC, Deutschland ist UTC+1 (Winterzeit)
    const recentEvaluations = await bewertungen
      .find({})
      .sort({ erstellt: -1 })
      .limit(10)
      .toArray();

    console.log(`💡 Hinweis: Zeiten werden in deutscher Zeit (UTC+1) angezeigt, MongoDB speichert in UTC\n`);

    console.log(`📊 Letzte ${recentEvaluations.length} Bewertungen:\n`);

    recentEvaluations.forEach((doc, index) => {
      const erstelltTime = doc.erstellt.toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const updatedTime = doc.aktualisiert ? doc.aktualisiert.toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : 'nicht aktualisiert';

      console.log(`${index + 1}. Bewertung:`);
      console.log(`   ID: ${doc._id}`);
      console.log(`   Erstellt: ${erstelltTime}`);
      console.log(`   Aktualisiert: ${updatedTime}`);
      console.log(`   Status: ${doc.status}`);
      console.log(`   Rasse: ${doc.rasse}`);
      console.log(`   Stripe Session: ${doc.stripeSessionId}`);
      console.log(`   Attribution: ${doc.attribution_source || 'nicht angegeben'}`);
      console.log(`   AI Model: ${doc.ai_model || 'nicht angegeben'}`);
      console.log('');
    });

    // Statistik nach Datum
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterdayEvals = recentEvaluations.filter(doc =>
      doc.erstellt >= yesterday && doc.erstellt < today
    );

    console.log(`📅 Gestern (${yesterday.toLocaleDateString('de-DE')}): ${yesterdayEvals.length} Bewertungen`);
    yesterdayEvals.forEach(doc => {
      const time = doc.erstellt.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });
      console.log(`   - ${time}: ${doc._id} (${doc.rasse}) - ${doc.status}`);
    });

    // Check for webhook processing
    const webhookProcessing = db.collection('webhook_processing');
    const recentWebhooks = await webhookProcessing
      .find({})
      .sort({ processedAt: -1 })
      .limit(10)
      .toArray();

    console.log(`\n🔔 Letzte ${recentWebhooks.length} Webhook-Verarbeitungen:\n`);

    recentWebhooks.forEach((webhook, index) => {
      const processedTime = webhook.processedAt.toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log(`${index + 1}. Webhook:`);
      console.log(`   Session ID: ${webhook.sessionId}`);
      console.log(`   Verarbeitet: ${processedTime}`);
      console.log(`   Status: ${webhook.status}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Fehler:', error);
  } finally {
    await client.close();
    console.log('✅ Verbindung geschlossen');
  }
}

checkRecentSales();
