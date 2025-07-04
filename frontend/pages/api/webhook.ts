// pages/api/webhook.ts
// NEUER FLOW: Nur Status-Update von "bewertet" → "freigegeben"
// KI-Bewertung findet bereits in checkout.ts statt!

import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { info, warn, error } from "@/lib/log";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Umgebungsvariablen validieren
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET ist nicht gesetzt");
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Debug-Logging für Produktionsumstellung
  console.log("\n" + "=".repeat(60));
  console.log("[WEBHOOK] 🚀 === NEUER WEBHOOK FLOW ===");
  console.log(`[WEBHOOK] ⏰ ${new Date().toISOString()}`);
  console.log(`[WEBHOOK] 🎯 Method: ${req.method}`);
  console.log("=".repeat(60));

  if (req.method !== "POST") {
    warn("[WEBHOOK] ❌ Ungültige Methode:", req.method);
    return res.status(405).end("Method Not Allowed");
  }

  // 1. Stripe Signature Verification
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    info("[WEBHOOK] ✅ Stripe-Signatur verifiziert");
  } catch (err) {
    error("[WEBHOOK] ❌ Signature verification failed:", err);
    return res.status(400).send("Webhook signature verification failed");
  }

  // 2. Nur checkout.session.completed Events verarbeiten
  if (event.type !== "checkout.session.completed") {
    info(`[WEBHOOK] ℹ️ Event-Type ignoriert: ${event.type}`);
    return res.status(200).end("Event ignored");
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const sessionId = session.id;
  const bewertungId = session.metadata?.bewertungId;

  info("[WEBHOOK] ✅ Zahlung abgeschlossen für Session:", sessionId);
  console.log(`[WEBHOOK] 📋 Metadata bewertungId: ${bewertungId}`);

  // 3. Validierung der bewertungId
  if (!bewertungId) {
    error("[WEBHOOK] ❌ Keine bewertungId in Session-Metadaten gefunden");
    console.log("[WEBHOOK] 📊 Verfügbare Metadata:", session.metadata);
    return res.status(400).json({ error: "Keine bewertungId in Metadaten" });
  }

  if (!ObjectId.isValid(bewertungId)) {
    error("[WEBHOOK] ❌ Ungültige bewertungId Format:", bewertungId);
    return res.status(400).json({ error: "Ungültige Bewertungs-ID" });
  }

  try {
    // 4. Bewertungsdokument finden
    const collection = await getCollection("bewertungen");
    const objectId = new ObjectId(bewertungId);
    
    console.log(`[WEBHOOK] 🔍 Suche Dokument mit ID: ${bewertungId}`);
    const dokument = await collection.findOne({ _id: objectId });

    if (!dokument) {
      error("[WEBHOOK] ❌ Kein Bewertungsdokument mit ID gefunden:", bewertungId);
      
      // Debug: Zeige verfügbare Dokumente
      const count = await collection.countDocuments();
      console.log(`[WEBHOOK] 📊 Anzahl Dokumente in Collection: ${count}`);
      
      return res.status(404).json({ error: "Bewertungsdokument nicht gefunden" });
    }

    console.log(`[WEBHOOK] ✅ Dokument gefunden mit Status: ${dokument.status}`);
    console.log(`[WEBHOOK] 📄 Stripe Session ID im Dokument: ${dokument.stripe_session_id}`);

    // 5. Status prüfen
    if (dokument.status !== "bewertet") {
      warn(`[WEBHOOK] ⚠️ Unerwarteter Status: ${dokument.status}`);
      
      if (dokument.status === "freigegeben") {
        info("[WEBHOOK] ℹ️ Dokument bereits freigegeben, Webhook ignoriert");
        return res.status(200).end("Already processed");
      }
      
      // Bei anderen Status trotzdem fortfahren und freigeben
      warn("[WEBHOOK] ⚠️ Gebe trotz Status freigegeben:", dokument.status);
    }

    // 6. WICHTIG: Status-Update von "bewertet" auf "freigegeben"
    // Hier passiert KEINE KI-Bewertung mehr - die ist bereits in checkout.ts!
    console.log("[WEBHOOK] 🔄 Aktualisiere Status auf 'freigegeben'...");
    
    const updateResult = await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          status: "freigegeben",
          aktualisiert_am: new Date()
        } 
      }
    );

    if (updateResult.modifiedCount === 0) {
      warn("[WEBHOOK] ⚠️ Dokument wurde nicht aktualisiert - bereits freigegeben?");
      return res.status(200).end("No update needed");
    }

    info("[WEBHOOK] ✅ Status erfolgreich auf 'freigegeben' gesetzt");
    info(`[WEBHOOK] ✅ Bewertung freigeschaltet für ID: ${bewertungId}`);
    
    console.log(`[WEBHOOK] 📊 Update-Ergebnis: matched=${updateResult.matchedCount}, modified=${updateResult.modifiedCount}`);
    console.log("[WEBHOOK] 🎉 === WEBHOOK ERFOLGREICH ===");

    return res.status(200).end("Success");

  } catch (err) {
    error("[WEBHOOK] ❌ Fehler beim Status-Update:", err);
    
    console.log("[WEBHOOK] 💥 === WEBHOOK FEHLER ===");
    if (err instanceof Error) {
      console.log(`[WEBHOOK] Error: ${err.name} - ${err.message}`);
      console.log(`[WEBHOOK] Stack: ${err.stack}`);
    }

    return res.status(500).json({ error: "Interner Fehler beim Status-Update" });
  }
}