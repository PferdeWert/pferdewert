import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutBody = {
  text: string;
};

type EingabeDaten = Record<string, unknown>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.warn("❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body as CheckoutBody;

    if (!text) {
      console.warn("⚠️ Keine Eingabedaten übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData: EingabeDaten;
    try {
      parsedData = JSON.parse(text);
      console.log("✅ Eingabedaten geparst:", parsedData);
    } catch (err) {
      console.error("❌ JSON-Parsing fehlgeschlagen:", err);
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const origin =
      req.headers.origin ||
      (req.headers.host?.includes("localhost") ? "http://localhost:3000" : `https://${req.headers.host}`);

    console.log("📤 Sende Daten an /api/generate...");
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ KI-Antwort fehlgeschlagen:", text);
      throw new Error("KI-Anfrage fehlgeschlagen");
    }

    const { result }: { result: string | null } = await response.json();
    if (!result) {
      console.warn("⚠️ Keine Bewertung erhalten");
      return res.status(500).json({ error: "Keine Bewertung erzeugt" });
    }

    console.log("💾 Speichere Bewertung in MongoDB...");
    const collection = await getCollection("bewertungen");
    const insertResult = await collection.insertOne({
      eingabe: parsedData,
      bewertung: result,
      createdAt: new Date(),
    });

    const bewertungId = insertResult.insertedId.toString();
    console.log("✅ Bewertung gespeichert:", bewertungId);

    console.log("💳 Erstelle Stripe-Checkout-Session...");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      metadata: { bewertungId },
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten`,
    });

    console.log("✅ Stripe-Session erstellt:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("💥 Fehler im Checkout-Handler:", message);
    return res.status(500).json({ error: message });
  }
}
