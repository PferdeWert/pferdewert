// pages/api/session.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    console.warn("[SESSION] ⚠️ Ungültige oder fehlende session_id:", session_id);
    return res.status(400).json({ error: "Missing or invalid session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "customer"],
    });

    console.info("[SESSION] ✅ Stripe-Session erfolgreich geladen:", session.id);
    return res.status(200).json({ session });
  } catch (err) {
    console.error("[SESSION] ❌ Fehler beim Laden der Stripe-Session:", err);
    return res.status(500).json({ error: "Fehler beim Laden der Stripe-Session" });
  }
}
