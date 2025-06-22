// pages/api/session.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { log, info, warn, error } from "@/lib/log";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    warn("[SESSION] ❌ Ungültige oder fehlende ID:", id);
    return res.status(400).json({ error: "Missing or invalid id" });
  }

  try {
    info("[SESSION] 📡 Lade Stripe-Session:", id);
    const session = await stripe.checkout.sessions.retrieve(id);
    const paid = session.payment_status === "paid";
    const bewertungId = session.metadata?.bewertungId;

    if (!bewertungId) {
      warn("[SESSION] ⚠️ Keine Bewertung-ID in Stripe-Session:", session.id);
      return res.status(404).json({ error: "Bewertung ID not found in session" });
    }

    info("[SESSION] 🔍 Suche Bewertung in MongoDB:", bewertungId);
    const collection = await getCollection("bewertungen");
    const doc = await collection.findOne({ _id: new ObjectId(bewertungId) });

    if (!doc) {
      warn("[SESSION] ❌ Keine Bewertung gefunden in DB für ID:", bewertungId);
      return res.status(404).json({ error: "Bewertung not found" });
    }

    info("[SESSION] ✅ Bewertung gefunden und zurückgegeben.");
    log("[SESSION] Bewertungstext (Auszug):", doc.bewertung?.slice(0, 200));

    return res.status(200).json({ paid, bewertung: doc.bewertung });
  } catch (err) {
    error("[SESSION] ❌ Fehler beim Laden der Session:", err);
    return res.status(500).json({ error: "Unable to load session or Bewertung" });
  }
}
