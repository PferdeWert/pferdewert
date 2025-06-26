// pages/api/webhook.ts
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { info, error } from "@/lib/log";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  console.log("[WEBHOOK] HEADERS:", req.headers);
  console.log("[WEBHOOK] ENV SECRET:", process.env.STRIPE_WEBHOOK_SECRET);

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    error("[WEBHOOK] ❌ Signature verification failed:", err);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;

    info("[WEBHOOK] ✅ Zahlung abgeschlossen, Session ID:", sessionId);

    try {
      const collection = await getCollection("bewertungen");
      const doc = await collection.findOne({ stripeSessionId: sessionId });

      if (!doc) {
        error("[WEBHOOK] ❌ Keine Bewertung mit Session ID gefunden");
        return res.status(404).end();
      }

      const {
        rasse,
        alter,
        geschlecht,
        abstammung,
        stockmass,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
      } = doc;

      const bewertbareDaten = {
        rasse,
        alter,
        geschlecht,
        abstammung,
        stockmass,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
      };

      const response = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });

      const gpt_response = await response.json();
      const raw_gpt = gpt_response?.raw_gpt;

      if (!raw_gpt) {
        error("[WEBHOOK] ❌ Keine GPT-Antwort");
        return res.status(500).end();
      }

      await collection.updateOne(
        { _id: doc._id },
        { $set: { bewertung: raw_gpt, status: "fertig", aktualisiert: new Date() } }
      );

      info("[WEBHOOK] ✅ Bewertung gespeichert.");
      return res.status(200).end("Done");
    } catch (err) {
      error("[WEBHOOK] ❌ Fehler bei Bewertung:", err);
      return res.status(500).end("Interner Fehler");
    }
  }

  res.status(200).end("Event ignoriert");
}
