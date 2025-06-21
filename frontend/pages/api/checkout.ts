// pages/api/checkout.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";

// Initialisiere Stripe ohne apiVersion (nutzt automatisch die passende)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutBody = {
  text: string;
};

type BewertungEingabe = Record<string, unknown>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body as CheckoutBody;
    if (!text) {
      return res.status(400).json({ error: "Missing input data" });
    }

    // Eingabe parsen
    let parsedData: BewertungEingabe;
    try {
      parsedData = JSON.parse(text);
    } catch {
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    console.log("📤 Sende Daten an /api/generate...");

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) throw new Error("KI-Anfrage fehlgeschlagen");

    const { result }: { result: string | null } = await response.json();
    if (!result) {
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

    const isProd = process.env.NODE_ENV === "production";
    const baseUrl = isProd
      ? "https://pferdewert.vercel.app"
      : "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      metadata: { bewertungId },
      success_url: `${baseUrl}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/bewerten`,
    });

    console.log("✅ Stripe-Session erstellt:", session.id);

    return res.status(200).json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("💥 Fehler im Checkout-Handler:", message);
    return res.status(500).json({ error: message });
  }
}
