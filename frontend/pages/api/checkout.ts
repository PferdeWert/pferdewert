// /pages/api/checkout.ts
// Neuer Ablauf: KI-Bewertung VOR Zahlung
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { BewertungSchema, type Bewertung } from "@/lib/bewertung-schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Umgebungsvariablen validieren
if (!process.env.STRIPE_PRICE_ID) {
  throw new Error("STRIPE_PRICE_ID ist nicht gesetzt");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    warn("[CHECKOUT] ❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const start = Date.now(); // Performance-Messung

  try {
    // 1. Formulardaten validieren
    const validation = BewertungSchema.safeParse(req.body);
    if (!validation.success) {
      warn("[CHECKOUT] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ 
        error: "Ungültige Bewertungsdaten",
        details: validation.error.flatten() 
      });
    }

    const formData: Bewertung = validation.data;
    info("[CHECKOUT] ✅ Eingabedaten validiert");
    log("[CHECKOUT] Formular-Daten:", formData);

    // 2. KI-Bewertung über FastAPI durchführen
    info("[CHECKOUT] 🤖 Starte KI-Bewertung über FastAPI...");
    
    // AbortController für Timeout (30 Sekunden)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const fastApiResponse = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Timeout löschen bei erfolgreicher Antwort

      if (!fastApiResponse.ok) {
        error("[CHECKOUT] ❌ FastAPI Fehler:", fastApiResponse.status);
        return res.status(500).json({ 
          error: "KI-Bewertung fehlgeschlagen", 
          details: `FastAPI Status: ${fastApiResponse.status}` 
        });
      }

      const gptResponse = await fastApiResponse.json();
      const bewertungsText = gptResponse?.raw_gpt;

      if (!bewertungsText) {
        error("[CHECKOUT] ❌ Keine KI-Antwort erhalten");
        return res.status(500).json({ error: "Keine KI-Bewertung erhalten" });
      }

      info("[CHECKOUT] ✅ KI-Bewertung erfolgreich erhalten");
      log("[CHECKOUT] Bewertung (erste 100 Zeichen):", bewertungsText.substring(0, 100));

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        error("[CHECKOUT] ❌ FastAPI Timeout nach 30 Sekunden");
        return res.status(504).json({ 
          error: "KI-Service Timeout", 
          details: "Die KI-Bewertung dauert zu lange. Bitte versuchen Sie es erneut." 
        });
      }
      
      // Andere Fetch-Fehler
      throw fetchError; // Wird vom äußeren catch gefangen
    }

    // 3. Bewertungsdokument in MongoDB speichern (Status: "bewertet")
    const bewertungId = new ObjectId();
    const collection = await getCollection("bewertungen");

    const bewertungsDokument = {
      _id: bewertungId,
      ...formData,
      status: "bewertet", // Bewertung liegt vor, aber noch nicht freigegeben
      bewertung: bewertungsText,
      erstellt_am: new Date(),
      aktualisiert_am: new Date(),
      stripe_session_id: null, // wird gleich gesetzt
      // Metainfos für Analyse
      user_agent: req.headers['user-agent'] || null,
      client_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
    };

    await collection.insertOne(bewertungsDokument);
    info("[CHECKOUT] ✅ Bewertungsdokument in DB gespeichert, ID:", bewertungId.toHexString());

    // 4. Stripe Checkout-Session erstellen
    const origin = process.env.NEXT_PUBLIC_BASE_URL || req.headers.origin;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      line_items: [{ 
        price: process.env.STRIPE_PRICE_ID, // Bereits validiert oben
        quantity: 1 
      }],
      mode: "payment",
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten?abgebrochen=1`,
      metadata: { 
        bewertungId: bewertungId.toHexString() // Wichtig für Webhook!
      },
    });

    // 5. Stripe Session ID in Dokument speichern
    await collection.updateOne(
      { _id: bewertungId },
      { $set: { stripe_session_id: session.id } }
    );

    info("[CHECKOUT] ✅ Stripe-Session erstellt:", session.id);
    info("[CHECKOUT] ✅ Session-ID im Dokument gespeichert");
    info(`[CHECKOUT] ⏱️ Dauer gesamt: ${Date.now() - start}ms`);

    // 6. Session-URL zurückgeben für Frontend-Redirect
    return res.status(200).json({ 
      url: session.url,
      sessionId: session.id,
      bewertungId: bewertungId.toHexString()
    });

  } catch (err: unknown) {
    error("[CHECKOUT] ❌ Unerwarteter Fehler:", err);
    
    // Detaillierte Fehlerbehandlung
    if (err instanceof Error) {
      if (err.message.includes('ENOTFOUND') || err.message.includes('fetch')) {
        return res.status(503).json({ 
          error: "KI-Service temporär nicht verfügbar", 
          details: "Bitte versuchen Sie es in wenigen Minuten erneut" 
        });
      }
    }

    return res.status(500).json({ 
      error: "Interner Serverfehler",
      details: "Unbekannter Fehler beim Erstellen der Bewertung"
    });
  }
}