// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutBody = {
  text: string;
};

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

    const parsedData = JSON.parse(text);
    info("[CHECKOUT] ✅ Eingabedaten geparst.");
    log("[CHECKOUT] Eingabe:", parsedData);

    // Neue BewertungId erzeugen
    const bewertungId = new ObjectId();

    // 1. Stripe-Session erstellen
    const origin = process.env.NEXT_PUBLIC_BASE_URL!;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten?abgebrochen=1`,
      metadata: {
        bewertungId: bewertungId.toHexString(),
      },
    });

    // 2. Daten in MongoDB speichern mit stripeSessionId
    const collection = await getCollection("bewertungen");
    await collection.insertOne({
      _id: bewertungId,
      ...parsedData,
      status: "offen",
      stripeSessionId: session.id,
      erstellt: new Date(),
    });

    info("[CHECKOUT] ✅ Session gespeichert, ID:", session.id);
    res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    error("[CHECKOUT] ❌ Fehler im Checkout:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
}
