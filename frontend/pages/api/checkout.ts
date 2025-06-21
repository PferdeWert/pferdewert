// frontend/pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// ✅ Stripe-Instanz mit Secret Key aus Umgebungsvariablen
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  // ✅ Dynamische Origin-URL: funktioniert lokal, in Codespaces und in Produktion
  const origin =
    req.headers.origin || `http${req.headers.host?.includes("localhost") ? "" : "s"}://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID as string,
          quantity: 1,
        },
      ],
      success_url: `${origin}/ergebnis?paid=true&text=${encodeURIComponent(text)}`,
      cancel_url: `${origin}/bewerten`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ error: "Stripe Session error" });
  }
}
