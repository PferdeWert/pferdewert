import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing or invalid session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
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
  } catch (error: any) {
    console.error("Error loading Stripe session:", error.message);
    return res.status(500).json({ error: "Unable to load session or Bewertung" });
  }
}
