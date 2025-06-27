// frontend/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const BewertungSchema = z.object({
  rasse: z.string().min(2),
  abstammung: z.string().optional(),
  einsatzgebiet: z.string().optional(),
  geburtsjahr: z.string().optional(),
  stockmaß: z.string().optional(),
  farbe: z.string().optional(),
  vater: z.string().optional(),
  mutter: z.string().optional(),
  preise: z.string().optional(),
  besonderheiten: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    warn("[CHECKOUT] ❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      warn("[CHECKOUT] ⚠️ Kein valider Text übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData;
try {
  parsedData = JSON.parse(text);
} catch {
  warn("[CHECKOUT] ⚠️ JSON-Parse fehlgeschlagen");
  return res.status(400).json({ error: "Invalid JSON" });
}



    const validation = BewertungSchema.safeParse(parsedData);
    if (!validation.success) {
      warn("[CHECKOUT] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ error: "Ungültige Bewertungsdaten" });
    }

    info("[CHECKOUT] ✅ Eingabedaten validiert und geparst.");
    log("[CHECKOUT] Eingabe:", parsedData);

    const bewertungId = new ObjectId();
    const origin = process.env.NEXT_PUBLIC_BASE_URL!;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten?abgebrochen=1`,
      metadata: { bewertungId: bewertungId.toHexString() },
    });

    const collection = await getCollection("bewertungen");
    await collection.insertOne({
      _id: bewertungId,
      ...parsedData,
      status: "offen",
      stripeSessionId: session.id,
      erstellt: new Date(),
    });

    info("[CHECKOUT] ✅ Session gespeichert, ID:", session.id);
    res.status(200).json({ url: session.url });
  } catch (_err: unknown) {
  error("[CHECKOUT] ❌ Fehler im Checkout:", _err);
  res.status(500).json({ error: "Interner Serverfehler" });
}

}
