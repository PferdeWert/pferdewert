import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Stripe-Instanz initialisieren
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  // Validierung der session_id
  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid session_id" });
  }

  try {
    // Session von Stripe abrufen
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    // Zahlung erfolgreich?
    const paid = session.payment_status === "paid";

    // Bewertung aus metadata lesen (kann null sein)
    const bewertung = session.metadata?.bewertung ?? null;

    return res.status(200).json({ paid, bewertung });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error loading Stripe session:", message);
    return res.status(500).json({ error: "Unable to load Stripe session" });
  }
}
