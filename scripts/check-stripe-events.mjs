#!/usr/bin/env node
// scripts/check-stripe-events.mjs
// Prüft Stripe Events für heute und zeigt DataFast Metadata

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY fehlt');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

async function checkStripeEvents() {
  try {
    console.log('✅ Mit Stripe verbunden\n');

    // Heute um 00:00 Uhr UTC
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Math.floor(today.getTime() / 1000);

    console.log(`📅 Suche Events seit: ${today.toISOString()}\n`);

    // Alle checkout.session.completed Events von heute
    const events = await stripe.events.list({
      type: 'checkout.session.completed',
      created: { gte: todayTimestamp },
      limit: 100
    });

    console.log(`🔔 Gefundene checkout.session.completed Events heute: ${events.data.length}\n`);

    for (const event of events.data) {
      const session = event.data.object;
      const created = new Date(event.created * 1000);
      const localTime = created.toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      console.log(`Event ID: ${event.id}`);
      console.log(`  Created: ${localTime} (UTC: ${created.toISOString()})`);
      console.log(`  Session ID: ${session.id}`);
      console.log(`  Amount: ${(session.amount_total / 100).toFixed(2)} EUR`);
      console.log(`  Customer Email: ${session.customer_details?.email || 'nicht angegeben'}`);
      console.log(`  Payment Status: ${session.payment_status}`);
      console.log(`  Metadata:`);
      console.log(`    - bewertungId: ${session.metadata?.bewertungId || 'fehlt'}`);
      console.log(`    - datafast_visitor_id: ${session.metadata?.datafast_visitor_id || 'fehlt'}`);
      console.log(`    - datafast_session_id: ${session.metadata?.datafast_session_id || 'fehlt'}`);
      console.log('');
    }

    // Prüfe auf Duplikate (gleiche Session ID)
    const sessionIds = events.data.map(e => e.data.object.id);
    const duplicates = sessionIds.filter((id, index) => sessionIds.indexOf(id) !== index);

    if (duplicates.length > 0) {
      console.log(`⚠️  DUPLIKATE GEFUNDEN: ${duplicates.length}`);
      duplicates.forEach(sessionId => {
        console.log(`   - Session ID: ${sessionId}`);
      });
    } else {
      console.log('✅ Keine Event-Duplikate in Stripe gefunden');
    }

    // Statistik
    const totalAmount = events.data.reduce((sum, e) => sum + e.data.object.amount_total, 0) / 100;
    console.log(`\n💰 Gesamtumsatz heute (Stripe): ${totalAmount.toFixed(2)} EUR`);
    console.log(`   Anzahl Events: ${events.data.length}`);

    // Prüfe ob DataFast Metadata vorhanden ist
    const eventsWithDataFast = events.data.filter(e =>
      e.data.object.metadata?.datafast_visitor_id || e.data.object.metadata?.datafast_session_id
    );
    console.log(`   Events mit DataFast Metadata: ${eventsWithDataFast.length}/${events.data.length}`);

  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

checkStripeEvents();
