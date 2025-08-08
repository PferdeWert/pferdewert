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
// Resend sicher initialisieren
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const BACKEND_URL = process.env.BACKEND_URL || 'https://pferdewert-api.onrender.com'; // Fallback auf Standard-URL, falls nicht gesetzt



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
      console.log("🔥 [WEBHOOK] Dokument gefunden:", doc._id.toString());

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
        alter: parseInt(String(alter)) || 0,
        geschlecht,
        abstammung,
        stockmass: Math.round(parseFloat(String(stockmass)) * 100) || 0,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
      };

      console.log("🔥 [WEBHOOK] Daten für FastAPI vorbereitet");

      // Health check first
      console.log("🔥 [WEBHOOK] Prüfe Backend-Verfügbarkeit:", `${BACKEND_URL}/health`);
      try {
        const healthResponse = await fetch(`${BACKEND_URL}/health`, { 
          method: "GET"
        });
        if (!healthResponse.ok) {
          console.warn("⚠️ [WEBHOOK] Backend health check failed, continuing anyway");
        } else {
          const healthData = await healthResponse.json();
          console.log("✅ [WEBHOOK] Backend health:", healthData);
        }
      } catch (healthErr) {
        console.warn("⚠️ [WEBHOOK] Backend health check error:", healthErr);
        // Continue anyway, might be a network issue
      }

      console.log("🔥 [WEBHOOK] Rufe FastAPI auf:", `${BACKEND_URL}/api/bewertung`);
      const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });

      console.log("🔥 [WEBHOOK] FastAPI Response Status:", response.status);
      console.log("🔥 [WEBHOOK] FastAPI Response Headers erhalten");

      if (!response.ok) {
        console.error("❌ [WEBHOOK] Backend-Fehler:", response.status, response.statusText);
        console.error("❌ [WEBHOOK] Backend URL:", `${BACKEND_URL}/api/bewertung`);
        const errorText = await response.text();
        console.error("❌ [WEBHOOK] Backend-Error-Details:", errorText);
        
        // Log CORS error specifically
        if (response.status === 0 || response.status === 403 || response.status === 405) {
          console.error("❌ [WEBHOOK] Possible CORS issue - check backend allowed origins");
        }
        
        // Trotzdem 200 zurückgeben, um Stripe-Retries zu vermeiden
        return res.status(200).json({ 
          error: "Backend temporarily unavailable", 
          status: response.status,
          backend_url: `${BACKEND_URL}/api/bewertung`
        });
      }

      let gpt_response;
      try {
        gpt_response = await response.json();
        console.log("🔥 [WEBHOOK] AI-Bewertung erhalten:", gpt_response?.raw_gpt ? "Erfolgreich" : "Fehler");
      } catch (jsonError) {
        console.error("❌ [WEBHOOK] JSON-Parse-Fehler:", jsonError);
        // Trotzdem 200 zurückgeben für Stripe
        return res.status(200).json({ error: "Invalid JSON response from backend" });
      }

      const raw_gpt = gpt_response?.raw_gpt;

      if (!raw_gpt) {
        console.error("❌ [WEBHOOK] Keine GPT-Antwort in Response");
        console.error("❌ [WEBHOOK] Expected 'raw_gpt' field, got:", Object.keys(gpt_response));
        console.error("❌ [WEBHOOK] Full response:", JSON.stringify(gpt_response));
        // 200 statt 500 zurückgeben, um Stripe-Retries zu vermeiden
        return res.status(200).json({ 
          error: "No AI response received",
          received: Object.keys(gpt_response)
        });
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
  // Webhook trotzdem erfolgreich beenden, damit Stripe nicht retry macht
  return res.status(200).end();
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

// Nur senden wenn Resend verfügbar ist
if (!resend) {
  console.error("❌ Resend nicht initialisiert - RESEND_API_KEY fehlt!");
  // Trotzdem 200 zurückgeben, damit Stripe nicht retry macht
  return res.status(200).end();
}

await resend.emails.send({
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
  console.log("✅ [WEBHOOK] Mail gesendet an:", empfaenger.join(", "));
} catch (err) {
  console.error("❌ [WEBHOOK] Fehler beim Mailversand:", err);
}

// 📧 Email an Kunden
const customerEmail = session.customer_details?.email;

if (customerEmail && resend) {
  try {
  await resend.emails.send({
    from: "PferdeWert <info@pferdewert.de>",
    to: customerEmail,
    subject: "🐴 Deine Pferdebewertung ist fertig!",
    html: `
      <h2>Hallo!</h2>
      <p>Deine Pferdebewertung ist jetzt verfügbar:</p>
          <br> 
      <p><strong><a href="https://pferdewert.de/ergebnis?session_id=${sessionId}" 
         style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
         🐴 Zur Bewertung & PDF-Download
      </a></strong></p>
          <br>
      <p><small>Falls der Button nicht funktioniert:<br>
      https://pferdewert.de/ergebnis?session_id=${sessionId}</small></p>
      
      <p>Viele Grüße,<br>Dein PferdeWert-Team</p>
    `
  });
  console.log("✅ [WEBHOOK] Kunden-Mail gesendet an:", session.customer_email);
  } catch (err) {
    console.error("❌ [WEBHOOK] Fehler beim Kunden-Mailversand:", err);
  }
} else {
  console.warn("⚠️ [WEBHOOK] Keine Kunden-Email verfügbar");
}

      return res.status(200).end("Done");
    } catch (err) {
      console.error("❌ [WEBHOOK] Fehler bei Bewertung:", err);
      console.error("❌ [WEBHOOK] Error Stack:", err instanceof Error ? err.stack : "No stack");
      console.error("❌ [WEBHOOK] Error Details:", err instanceof Error ? err.message : String(err));
      
      // WICHTIG: Immer 200 zurückgeben, damit Stripe nicht endlos retried!
      // Der Fehler wird geloggt, aber wir verhindern Webhook-Retry-Loops
      return res.status(200).json({ 
        success: false, 
        error: "Webhook processing failed but acknowledged",
        details: err instanceof Error ? err.message : "Unknown error"
      });
    }
  } else {
    console.log("ℹ️ [WEBHOOK] Event ignoriert:", event.type);
  }

  
  res.status(200).end("Event ignoriert");
}