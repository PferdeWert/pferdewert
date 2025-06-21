// pages/api/checkout.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CheckoutBody {
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as CheckoutBody;
    if (!body.text) {
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(body.text);
    } catch {
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const origin =
      req.headers.origin ||
      `http${req.headers.host?.includes("localhost") ? "" : "s"}://${req.headers.host}`;

    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) {
      throw new Error("KI-Anfrage fehlgeschlagen");
    }

    const { result }: { result: string | null } = await response.json();
    if (!result) {
      return res.status(500).json({ error: "Keine Bewertung erzeugt" });
    }

    const collection = await getCollection("bewertungen");
    const insertResult = await collection.insertOne({
      eingabe: parsedData,
      bewertung: result,
      createdAt: new Date(),
    });

    const bewertungId = insertResult.insertedId.toString();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      metadata: { bewertungId },
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("Fehler beim Checkout:", message);
    return res.status(500).json({ error: message });
  }
}
