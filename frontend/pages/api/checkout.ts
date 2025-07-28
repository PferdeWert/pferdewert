// frontend/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Schema entspricht backend.BewertungRequest
const BewertungSchema = z.object({
  // Pflichtfelder
  rasse: z.string(),
  alter: z.coerce.number(),
  geschlecht: z.string(),
  abstammung: z.string(),
  stockmass: z.coerce.number(),
  ausbildung: z.string(),

  // Optionale Angaben
  aku: z.string().optional(),
  erfolge: z.string().optional(),
  farbe: z.string().optional(),
  zuechter: z.string().optional(),
  standort: z.string().optional(),
  verwendungszweck: z.string().optional(),
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

    const bewertungData = validation.data;

    info("[CHECKOUT] ✅ Eingabedaten validiert und geparst.");
    log("[CHECKOUT] Eingabe:", bewertungData);

    const bewertungId = new ObjectId();    // Generiere eine neue Bewertung-ID
    info("[CHECKOUT] 🆕 Neue Bewertung-ID generiert:", bewertungId.toHexString()); // Logging der Bewertung-ID

    // Bestimme den Origin für die Stripe-Session. Fallback auf Vercel-URL, falls NEXT_PUBLIC_BASE_URL nicht gesetzt ist.
    // Dies ist wichtig für die success_url und cancel_url der Stripe-Session
    const origin =
    process.env.NEXT_PUBLIC_BASE_URL ||
    req.headers.origin ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

if (!origin) {
  error("[CHECKOUT] ❌ origin konnte nicht ermittelt werden.");
  return res.status(500).json({ error: "Server misconfigured: origin fehlt" });
}

info("[CHECKOUT] 🌐 Verwendeter origin:", origin);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "paypal"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
      metadata: { bewertungId: bewertungId.toHexString() },
    });

    const collection = await getCollection("bewertungen");
    await collection.insertOne({
      _id: bewertungId,
      ...bewertungData,
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
