// pages/api/webhook.ts
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { Resend } from 'resend';


// import { info, error } from "@/lib/log"; // Auskommentiert für Debug-Phase

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🔥 [WEBHOOK] Webhook aufgerufen!");
  console.log("🔥 [WEBHOOK] Method:", req.method);
  console.log("🔥 [WEBHOOK] URL:", req.url);
  console.log("🔥 [WEBHOOK] Headers:", JSON.stringify(req.headers, null, 2));
  console.log("🔍 [RESEND MAIL] RESEND_TO_EMAIL:", process.env.RESEND_TO_EMAIL);


  if (req.method !== "POST") {
    console.log("❌ [WEBHOOK] Falsche Methode:", req.method);
    return res.status(405).end("Method Not Allowed");
  }

  console.log("🔥 [WEBHOOK] ENV SECRET:", process.env.STRIPE_WEBHOOK_SECRET ? "✅ gesetzt" : "❌ fehlt");

  const buf = await buffer(req);
  console.log("🔥 [WEBHOOK] Buffer Größe:", buf.length, "bytes");
  
  const sig = req.headers["stripe-signature"] as string;
  console.log("🔥 [WEBHOOK] Stripe Signature:", sig ? "✅ vorhanden" : "❌ fehlt");

  let event: Stripe.Event;

  try {
    console.log("🔥 [WEBHOOK] Versuche Event zu konstruieren...");
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log("✅ [WEBHOOK] Event erfolgreich konstruiert:", event.type);
  } catch (err) {
    console.error("❌ [WEBHOOK] Signature verification failed:", err);
    console.error("❌ [WEBHOOK] Error details:", {
      message: err instanceof Error ? err.message : String(err),
      signature: sig,
      bufferLength: buf.length,
      endpointSecret: endpointSecret ? "gesetzt" : "nicht gesetzt"
    });
    return res.status(400).send("Webhook Error");
  }

  console.log("🔥 [WEBHOOK] Event Type:", event.type);
  console.log("🔥 [WEBHOOK] Event ID:", event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;

    console.log("✅ [WEBHOOK] Zahlung abgeschlossen!");
    console.log("🔥 [WEBHOOK] Session ID:", sessionId);
    console.log("🔥 [WEBHOOK] Session Metadata:", JSON.stringify(session.metadata, null, 2));

    try {
      console.log("🔥 [WEBHOOK] Suche MongoDB-Dokument...");
      const collection = await getCollection("bewertungen");
      const doc = await collection.findOne({ stripeSessionId: sessionId });

      if (!doc) {
        console.error("❌ [WEBHOOK] Keine Bewertung mit Session ID gefunden:", sessionId);
        return res.status(404).end();
      }

      console.log("✅ [WEBHOOK] MongoDB-Dokument gefunden:");
      console.log("🔥 [WEBHOOK] Dokument ID:", doc._id);
      console.log("🔥 [WEBHOOK] Dokument Daten:", JSON.stringify(doc, null, 2));

      const {
        rasse,
        alter,
        geschlecht,
        abstammung,
        stockmass,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
      } = doc;

      const bewertbareDaten = {
        rasse,
        alter,
        geschlecht,
        abstammung,
        stockmass,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
      };

      console.log("🔥 [WEBHOOK] Daten für FastAPI:");
      console.log(JSON.stringify(bewertbareDaten, null, 2));

      console.log("🔥 [WEBHOOK] Rufe FastAPI auf...");
      const response = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });

      console.log("🔥 [WEBHOOK] FastAPI Response Status:", response.status);
      console.log("🔥 [WEBHOOK] FastAPI Response Headers:", JSON.stringify([...response.headers.entries()], null, 2));

      const gpt_response = await response.json();
      console.log("🔥 [WEBHOOK] FastAPI Response Body:");
      console.log(JSON.stringify(gpt_response, null, 2));

      const raw_gpt = gpt_response?.raw_gpt;

      if (!raw_gpt) {
        console.error("❌ [WEBHOOK] Keine GPT-Antwort in Response");
        console.error("❌ [WEBHOOK] Expected 'raw_gpt' field, got:", Object.keys(gpt_response));
        return res.status(500).end();
      }

      console.log("🔥 [WEBHOOK] Speichere Bewertung in MongoDB...");
      const updateResult = await collection.updateOne(
        { _id: doc._id },
        { $set: { bewertung: raw_gpt, status: "fertig", aktualisiert: new Date() } }
      );

      console.log("✅ [WEBHOOK] MongoDB Update Result:", updateResult);
      console.log("✅ [WEBHOOK] Bewertung erfolgreich gespeichert!");
      console.log("🚀 [DEBUG] Starte Mail-Bereich...");
      console.log("🚀 [DEBUG] RESEND_TO_EMAIL existiert:", !!process.env.RESEND_TO_EMAIL);

      // 📬 Mailbenachrichtigung versenden per Resend
      console.log("🚀 [DEBUG] Verarbeite Empfänger...");  
const empfaenger = (process.env.RESEND_TO_EMAIL ?? "")   // Fallback auf leeren String, falls nicht gesetzt
  .split(",") // Aufteilen bei Kommas
  .map(email => email.trim()) // Leerzeichen entfernen
  .filter(email => !!email); // Nur nicht-leere E-Mails behalten
console.log("📬 Empfänger:", empfaenger);

      try {

console.log("📬 Empfänger:", empfaenger); // direkt vor resend.emails.send

if (empfaenger.length === 0) {  
  console.error("❌ Keine Empfänger definiert – prüfe RESEND_TO_EMAIL");  
  return;
}

const betrag = session.amount_total
  ? `${(session.amount_total / 100).toFixed(2)} €`
  : "unbekannt";

// Formatierte Darstellung aller Formularfelder
const formularFelderHtml = `
  <h3>📋 Eingabedaten des Kunden:</h3>
  
  <p><strong>Rasse (Pflicht):</strong> ${rasse || 'nicht angegeben'}</p>
  <p><strong>Alter (Pflicht):</strong> ${alter ? `${alter} Jahre` : 'nicht angegeben'}</p>
  <p><strong>Geschlecht (Pflicht):</strong> ${geschlecht || 'nicht angegeben'}</p>
  <p><strong>Stockmaß (Pflicht):</strong> ${stockmass ? `${stockmass} cm` : 'nicht angegeben'}</p>
  <p><strong>Abstammung (Pflicht):</strong> ${abstammung || 'nicht angegeben'}</p>
  <p><strong>Ausbildungsstand (Pflicht):</strong> ${ausbildung || 'nicht angegeben'}</p>
  
  <hr style="margin: 20px 0; border: 1px solid #eee;">
  
  <p><strong>Gesundheitsstatus/AKU (Optional):</strong> ${aku || 'nicht angegeben'}</p>
  <p><strong>Erfolge (Optional):</strong> ${erfolge || 'nicht angegeben'}</p>
  <p><strong>Farbe (Optional):</strong> ${farbe || 'nicht angegeben'}</p>
  <p><strong>Standort (Optional):</strong> ${standort || 'nicht angegeben'}</p>
  <p><strong>Züchter (Optional):</strong> ${zuechter || 'nicht angegeben'}</p>
  <p><strong>Verwendungszweck (Optional):</strong> ${verwendungszweck || 'nicht angegeben'}</p>
`;

const mailResult = await resend.emails.send({
  from: "PferdeWert <kauf@pferdewert.de>",
  to: empfaenger,
  subject: `💰 Neuer Kauf auf PferdeWert.de von: ${session.customer_details?.email || "unbekannt"}`,
  html: `
    <h2>🐴 Neue Zahlung bei PferdeWert.de!</h2>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3>💳 Zahlungsdetails:</h3>
      <p><strong>Session ID:</strong> ${sessionId}</p>
      <p><strong>Betrag:</strong> ${betrag}</p>
      <p><strong>Kunde:</strong> ${session.customer_details?.email || "unbekannt"}</p>
    </div>
    
    <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
      ${formularFelderHtml}
    </div>
    
    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3>🤖 KI-Bewertung:</h3>
      <div style="white-space: pre-wrap; font-family: monospace; background: white; padding: 10px; border-radius: 4px;">
        ${raw_gpt}
      </div>
    </div>
    
    <hr style="margin: 30px 0;">
    <p style="color: #666; font-size: 12px;">
      Diese E-Mail wurde automatisch von PferdeWert.de generiert.
    </p>
  `,
});

  // ⚠️ Kein Zugriff auf .id mehr – stattdessen ganze Antwort loggen
  console.log("✅ [WEBHOOK] Resend-Mail gesendet:", mailResult);
} catch (err) {
  console.error("❌ [WEBHOOK] Fehler beim Mailversand:", err);
}

      return res.status(200).end("Done");
    } catch (err) {
      console.error("❌ [WEBHOOK] Fehler bei Bewertung:", err);
      console.error("❌ [WEBHOOK] Error Stack:", err instanceof Error ? err.stack : "No stack");
      return res.status(500).end("Interner Fehler");
    }
  } else {
    console.log("ℹ️ [WEBHOOK] Event ignoriert:", event.type);
  }

  res.status(200).end("Event ignoriert");
}