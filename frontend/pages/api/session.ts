// frontend/pages/api/session.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paid = session.payment_status === "paid";
    const bewertung = session.metadata?.bewertung || null;

    return res.status(200).json({ paid, bewertung });
  } catch (error) {
    console.error("Error loading Stripe session:", error);
    return res.status(500).json({ error: "Unable to load Stripe session" });
  }
}
