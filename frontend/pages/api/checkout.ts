import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// ❌ Keine apiVersion hier angeben → sonst TypeScript-Konflikt
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  // Dynamische Origin: lokal & Prod kompatibel
  const origin =
    req.headers.origin || `http${req.headers.host?.includes("localhost") ? "" : "s"}://${req.headers.host}`;

  try {
    // Bewertung vom KI-Modell generieren
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: JSON.parse(text) }),
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }

    const { result } = await response.json();

    // Stripe Checkout-Session mit Bewertung in metadata
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
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ error: "Stripe Session error" });
  }
}
