import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing or invalid id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    const paid = session.payment_status === "paid";
    const bewertungId = session.metadata?.bewertungId;

    if (!bewertungId) {
      return res.status(404).json({ error: "Bewertung ID not found in session" });
    }

    const collection = await getCollection("bewertungen");
    const doc = await collection.findOne({ _id: new ObjectId(bewertungId) });

    if (!doc) {
      return res.status(404).json({ error: "Bewertung not found" });
    }

    return res.status(200).json({ paid, bewertung: doc.bewertung });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("Error loading Stripe session:", message);
    return res.status(500).json({ error: "Unable to load session or Bewertung" });
  }
}
