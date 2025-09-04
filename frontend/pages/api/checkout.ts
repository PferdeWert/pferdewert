// frontend/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { z } from "zod";
import { STRIPE_CONFIG } from "@/lib/pricing";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Schema entspricht backend.BewertungRequest - OPTIMIERT
const BewertungSchema = z.object({
  // Pflichtfelder (6 statt 8)
  rasse: z.string(),
  alter: z.coerce.number(),
  geschlecht: z.string(),
  stockmass: z.coerce.number(),
  haupteignung: z.string(), // NEU: ersetzt verwendungszweck
  ausbildung: z.string(),

  // Optionale Angaben
  abstammung: z.string().optional(), // JETZT OPTIONAL
  aku: z.string().optional(),
  erfolge: z.string().optional(),
  standort: z.string().optional(),
  charakter: z.string().optional(), // NEU
  besonderheiten: z.string().optional(), // NEU
  attribution_source: z.string().optional(), // Marketing-Attribution
  
  // Legacy Support (falls alte Daten gesendet werden)
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



    // Debug logging für stockmass
    if (parsedData.stockmass !== undefined) {
      info(`[CHECKOUT DEBUG] stockmass received - value: "${parsedData.stockmass}", type: ${typeof parsedData.stockmass}`);
    }

    const validation = BewertungSchema.safeParse(parsedData);
    if (!validation.success) {
      warn("[CHECKOUT] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ error: "Ungültige Bewertungsdaten" });
    }

    const bewertungData = validation.data;
    
    // Debug logging nach Validierung
    info(`[CHECKOUT DEBUG] stockmass after validation - value: "${bewertungData.stockmass}", type: ${typeof bewertungData.stockmass}`);

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

    // Determine Stripe price by selected tier - REQUIRE tier selection for alternative flow
    const pd = parsedData as { selectedTier?: unknown; tier?: unknown };
    const rawSelectedTier: unknown = pd?.selectedTier ?? pd?.tier;
    
    // Check if tier is provided - if not, reject the request to force tier selection
    if (!rawSelectedTier || (typeof rawSelectedTier === 'string' && rawSelectedTier.trim() === '')) {
      warn("[CHECKOUT] ❌ Kein Tier ausgewählt - Tier-Auswahl erforderlich");
      return res.status(400).json({ error: "Tier selection required", code: "NO_TIER_SELECTED" });
    }
    
    const normalizeTier = (t: unknown): 'basic' | 'pro' | 'premium' => {
      const v = typeof t === 'string' ? t.toLowerCase() : '';
      if (v === 'pro') return 'pro';
      // Backward-compat: treat legacy 'standard' as 'basic'
      if (v === 'standard') return 'basic';
      if (v === 'premium') return 'premium';
      // No default fallback - tier must be explicitly provided
      throw new Error(`Invalid tier: ${v}`);
    };
    
    let tierId: 'basic' | 'pro' | 'premium';
    try {
      tierId = normalizeTier(rawSelectedTier);
    } catch {
      warn("[CHECKOUT] ❌ Ungültiger Tier:", rawSelectedTier);
      return res.status(400).json({ error: "Invalid tier selected", code: "INVALID_TIER" });
    }
    const PRICE_IDS: Record<'basic' | 'pro' | 'premium', string> = {
      basic: process.env.STRIPE_PRICE_ID_BASIC || '',
      pro: process.env.STRIPE_PRICE_ID_PRO || '',
      premium: process.env.STRIPE_PRICE_ID_PREMIUM || '',
    };
    const priceIdForTier = PRICE_IDS[tierId];
    if (!priceIdForTier) {
      error("[CHECKOUT] ❌ Stripe Price ID fehlt für Tier:", tierId);
      return res.status(500).json({ error: "Stripe price id not configured for selected tier", code: "PRICE_ID_MISSING" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "paypal"],
      line_items: [{ price: priceIdForTier, quantity: 1 }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
      metadata: { bewertungId: bewertungId.toHexString(), selectedTier: tierId },
    });

    const collection = await getCollection("bewertungen");
    const readToken = crypto.randomBytes(24).toString("hex");
    await collection.insertOne({
      _id: bewertungId,
      ...bewertungData,
      status: "offen",
      stripeSessionId: session.id,
      // Persist purchased/current tier early, so direct links can gate content
      purchased_tier: tierId,
      current_tier: tierId,
      readToken,
      erstellt: new Date(),
    });

    info("[CHECKOUT] ✅ Session gespeichert, ID:", session.id);
    res.status(200).json({ url: session.url });
  } catch (_err: unknown) {
  error("[CHECKOUT] ❌ Fehler im Checkout:", _err);
  res.status(500).json({ error: "Interner Serverfehler" });
}

}
