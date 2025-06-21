// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1PvqHgGR0aWZuTFLbApPKlLd", // ⬅️ Deine Preis-ID
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/ergebnis?paid=true&text=${encodeURIComponent(text)}`,
      cancel_url: `${req.headers.origin}/bewerten`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ error: "Stripe Session error" });
  }
}
