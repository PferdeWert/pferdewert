// pages/api/session.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { z } from "zod";
import { info, warn, error } from "@/lib/log";

// Safe Stripe initialization with existence check
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}
const stripe = new Stripe(stripeKey);

const querySchema = z.object({
  session_id: z.string().min(10, "Ungültige Session-ID"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parse = querySchema.safeParse(req.query);

  if (!parse.success) {
    warn("[SESSION] ⚠️ Ungültige session_id:", parse.error.flatten());
    return res.status(400).json({ error: "Ungültige oder fehlende Session-ID", details: parse.error.flatten() });
  }

  const { session_id } = parse.data;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "customer"],
    });

    info("[SESSION] ✅ Stripe-Session erfolgreich geladen:", session.id);
    return res.status(200).json({ session });
  } catch (err) {
    error("[SESSION] ❌ Fehler beim Laden der Stripe-Session:", err);
    return res.status(500).json({ error: "Fehler beim Laden der Stripe-Session" });
  }
}
