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
      
      // 📬 Mailbenachrichtigung versenden per Resend
      const empfaenger = process.env.RESEND_TO_EMAIL || "info@pferdewert.de";

      await resend.emails.send({
       from: "PferdeWert <noreply@pferdewert.onresend.com>",
       to: empfaenger,
       subject: `💰 Neuer Kauf auf PferdeWert.de von: ${session.customer_details?.email || "unbekannt"}`,
       html: `
         <h2>Neue Zahlung bei PferdeWert.de!</h2>
         <p><strong>Session ID:</strong> ${sessionId}</p>
         <p><strong>Pferd:</strong> ${rasse}, ${alter} Jahre, ${geschlecht}</p>
         <p><strong>Standort:</strong> ${standort}</p>
         <p><strong>Betrag:</strong> ${(session.amount_total! / 100).toFixed(2)} €</p>
         <p>Kunde: ${session.customer_details?.email}</p>
         <p>Bewertung: ${raw_gpt}</p>

        `,
      });
      console.log("✅ [WEBHOOK] Resend-Mail versendet an:", empfaenger);

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