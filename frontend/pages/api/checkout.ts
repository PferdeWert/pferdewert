import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Stripe-Instanz (ohne apiVersion → vermeidet TS-Konflikte)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing input data" });
    }

    const origin =
      req.headers.origin || `http${req.headers.host?.includes("localhost") ? "" : "s"}://${req.headers.host}`;

    // KI Bewertung anfordern
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: JSON.parse(text) }),
    });

    if (!response.ok) {
      console.error("Fehler bei KI-Antwort", await response.text());
      throw new Error("OpenAI request failed");
    }

    const { result } = await response.json();

    if (!result) {
      return res.status(500).json({ error: "Kein Ergebnis vom KI-Modell" });
    }

    // Stripe Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID as string,
          quantity: 1,
        },
      ],
      metadata: {
        bewertung: result,
      },
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Stripe Checkout Error:", message);
    return res.status(500).json({ error: "Stripe Session error" });
  }
}
