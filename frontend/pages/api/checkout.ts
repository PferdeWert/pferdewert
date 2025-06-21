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
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body as CheckoutBody;
    if (!text) {
      console.warn("❗️Request ohne Text-Feld erhalten");
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData: EingabeDaten;
    try {
      parsedData = JSON.parse(text);
    } catch (e) {
      console.warn("❗️Ungültiges JSON im Text-Feld:", e);
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const isLocal = process.env.NODE_ENV === "development" || req.headers.host?.includes("localhost");
    const origin = isLocal ? "http://localhost:3000" : "https://pferdewert.vercel.app";

    console.log("📤 Sende Daten an /api/generate...");
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Fehler bei /api/generate:", errorText);
      return res.status(500).json({ error: "Fehler bei der Bewertungserzeugung" });
    }

    const { result }: { result: string | null } = await response.json();
    if (!result) {
      console.warn("⚠️ Keine Bewertung von der KI zurückbekommen");
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

    console.log("💳 Erstelle Stripe-Checkout-Session...");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      metadata: { bewertungId },
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten`,
    });

    console.log("✅ Checkout-Session erstellt:", session.url);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("💥 Fehler im Checkout-Handler:", message);
    return res.status(500).json({ error: message });
  }
}
