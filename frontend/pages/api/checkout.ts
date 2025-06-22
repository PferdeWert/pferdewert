// pages/api/checkout.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";

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
      info("[CHECKOUT] ✅ Eingabedaten erfolgreich geparst.");
      log("[CHECKOUT] Eingabe:", parsedData);
    } catch (err) {
      error("[CHECKOUT] ❌ JSON-Parsing fehlgeschlagen:", err);
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const origin = process.env.NEXT_PUBLIC_BASE_URL!;
    info("[CHECKOUT] 🌍 BASE-URL verwendet:", origin);

    info("[CHECKOUT] 📤 Sende Daten an /api/bewertung...");
const response = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(parsedData),
});


    if (!response.ok) {
      const text = await response.text();
      error("[CHECKOUT] ❌ KI-Fehler:", text);
      throw new Error("KI-Antwort fehlgeschlagen");
    }

    const { result }: { result: string | null } = await response.json();

    if (!result) {
      warn("[CHECKOUT] ⚠️ Keine Bewertung von der KI erhalten.");
      return res.status(500).json({ error: "Keine Bewertung erzeugt" });
    }

    info("[CHECKOUT] 🧠 Bewertung von KI empfangen.");
    log("[CHECKOUT] Bewertung (Auszug):", result.slice(0, 200));

    const collection = await getCollection("bewertungen");
    const insertResult = await collection.insertOne({
      ...parsedData,
      bewertung: result,
      erstellt: new Date(),
    });
    info("[CHECKOUT] ✅ In MongoDB gespeichert – ID:", insertResult.insertedId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten?abgebrochen=1`,
      metadata: { bewertungId: insertResult.insertedId.toString() },
    });

    info("[CHECKOUT] ✅ Stripe-Session erstellt, ID:", session.id);
    res.status(200).json({ url: session.url });
  } catch (err) {
    error("[CHECKOUT] ❌ Unerwarteter Fehler:", err);
    res.status(500).json({ error: "Interner Fehler im Checkout" });
  }
}
