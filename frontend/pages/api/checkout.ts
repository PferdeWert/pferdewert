import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log"; // 🔧 zentraler Import

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutBody = {
  text: string;
};

type EingabeDaten = Record<string, unknown>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    warn("[CHECKOUT] ❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body as CheckoutBody;

    if (!text) {
      warn("[CHECKOUT] ⚠️ Keine Eingabedaten übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData: EingabeDaten;
    try {
      parsedData = JSON.parse(text);
      info("[CHECKOUT] ✅ Eingabedaten geparst:", parsedData);
    } catch (err) {
      error("[CHECKOUT] ❌ JSON-Parsing fehlgeschlagen:", err);
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const origin =
      req.headers.origin ||
      (req.headers.host?.includes("localhost") ? "http://localhost:3000" : `https://${req.headers.host}`);

    info("[CHECKOUT] 📤 Sende Daten an /api/generate...");
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) {
      const text = await response.text();
      error("[CHECKOUT] ❌ KI-Antwort fehlgeschlagen:", text);
      throw new Error("KI-Anfrage fehlgeschlagen");
    }

    const { result }: { result: string | null } = await response.json();
    if (!result) {
      warn("[CHECKOUT] ⚠️ Keine Bewertung erhalten");
      return res.status(500).json({ error: "Keine Bewertung erzeugt" });
    }

    info("[CHECKOUT] 💾 Speichere Bewertung in MongoDB...");
    const collection = await getCollection("bewertungen");

    let insertResult;
    try {
      insertResult = await collection.insertOne({
        ...parsedData,
        bewertung: result,
        erstellt: new Date(),
      });
      info("[CHECKOUT] ✅ Bewertung gespeichert, ID:", insertResult.insertedId);
    } catch (err) {
      error("[CHECKOUT] ❌ Fehler beim MongoDB Insert:", err);
      return res.status(500).json({ error: "MongoDB Insert fehlgeschlagen" });
    }

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        mode: "payment",
        success_url: `${origin}/ergebnis?id=${insertResult.insertedId}`,
        cancel_url: `${origin}/bewerten?abgebrochen=1`,
        metadata: { bewertungId: insertResult.insertedId.toString() },
      });
      info("[CHECKOUT] ✅ Stripe-Session erstellt, sessionId:", session.id);
    } catch (err) {
      error("[CHECKOUT] ❌ Fehler beim Stripe-Session-Create:", err);
      return res.status(500).json({ error: "Stripe-Session-Fehler" });
    }

    res.status(200).json({ url: session.url });
  } catch (e) {
    error("[CHECKOUT] ❌ Allgemeiner Fehler im Handler:", e);
    res.status(500).json({ error: "Interner Fehler im Checkout" });
  }
}
