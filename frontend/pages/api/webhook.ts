// 📁 pages/api/webhook.ts - FINAL CLEAN VERSION
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { info, error } from "@/lib/log";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[WEBHOOK] 🚀 === WEBHOOK DEBUG START ===");

  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  let buf;
  try {
    buf = await buffer(req);
  } catch (err) {
    console.log("[WEBHOOK] ❌ Buffer extraction failed:", err);
    res.status(400).end();
    return;
  }

  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.log("[WEBHOOK] ❌ Signature verification failed:", err);
    res.status(400).end();
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;

    try {
      const collection = await getCollection("bewertungen");
      const doc = await collection.findOne({ stripeSessionId: sessionId });

      if (!doc) {
        res.status(404).end("No matching document");
        return;
      }

      const bewertbareDaten = {
        rasse: doc.rasse || "",
        abstammung: doc.abstammung || "",
        einsatzgebiet: doc.verwendungszweck || "",
        geburtsjahr: doc.alter || "",
        stockmaß: doc.stockmass || "",
        farbe: doc.farbe || "",
        vater: "",
        mutter: "",
        preise: doc.erfolge || "",
        besonderheiten: doc.aku || "",
      };

      const response = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });

      const responseText = await response.text();
      let gpt_response: any;
      try {
        gpt_response = JSON.parse(responseText);
      } catch (jsonErr) {
        res.status(500).end("GPT API invalid JSON");
        return;
      }

      const raw_gpt = gpt_response?.raw_gpt;
      if (!raw_gpt) {
        res.status(500).end("Missing GPT result");
        return;
      }

      await collection.updateOne(
        { _id: doc._id },
        { $set: { bewertung: raw_gpt, status: "fertig", aktualisiert: new Date() } }
      );

      info("[WEBHOOK] ✅ Bewertung erfolgreich gespeichert.");
      res.status(200).end("Done");
      return;
    } catch (err) {
      error("[WEBHOOK] ❌ Fehler bei Verarbeitung:", err);
      res.status(500).end("Webhook Verarbeitung fehlgeschlagen");
      return;
    }
  }

  // Alle anderen Event-Typen ignorieren
  res.status(200).end("Event ignoriert");
  return;
}
