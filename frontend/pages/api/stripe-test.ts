// pages/api/stripe-test.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Testprodukt" },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe-Testfehler:", error);
    return res.status(500).json({ error: "Stripe test failed" });
  }
}
