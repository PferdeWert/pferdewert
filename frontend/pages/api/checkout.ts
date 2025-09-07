// frontend/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { validateStripeEnvironment } from "@/lib/env-validation";
import { z } from "zod";
import crypto from "crypto";

// Conditional Stripe initialization - only initialize if environment is valid
let stripe: Stripe | null = null;

// Initialize Stripe only if environment is properly configured
const initializeStripe = (): Stripe => {
  if (stripe) return stripe;
  
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
  }
  
  stripe = new Stripe(stripeKey);
  return stripe;
};

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

  // Runtime validation - only runs when API is called, not during build
  const envValidation = validateStripeEnvironment();
  if (!envValidation.isValid) {
    error("[CHECKOUT] ❌ Stripe environment validation failed:", envValidation.error);
    return res.status(500).json({ 
      error: "Server configuration error",
      details: envValidation.error 
    });
  }

  try {
    // Initialize Stripe now that environment is validated
    const stripeClient = initializeStripe();
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

    // Debug: Log the raw parsed data INCLUDING tier information
    info(`[CHECKOUT DEBUG] Raw parsedData received:`, {
      ...parsedData,
      selectedTier: parsedData.selectedTier || parsedData.tier || 'NOT_PROVIDED',
      keys: Object.keys(parsedData)
    });

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
    
    // Enhanced debugging for tier processing
    info(`[CHECKOUT DEBUG] Tier processing:`, {
      selectedTier: pd?.selectedTier,
      tier: pd?.tier,
      rawSelectedTier,
      rawSelectedTierType: typeof rawSelectedTier,
      isEmpty: !rawSelectedTier || (typeof rawSelectedTier === 'string' && rawSelectedTier.trim() === '')
    });
    
    // Check if tier is provided - if not, reject the request to force tier selection
    if (!rawSelectedTier || (typeof rawSelectedTier === 'string' && rawSelectedTier.trim() === '')) {
      warn("[CHECKOUT] ❌ Kein Tier ausgewählt - Tier-Auswahl erforderlich");
      return res.status(400).json({ error: "Tier selection required", code: "NO_TIER_SELECTED" });
    }
    
    const normalizeTier = (t: unknown): 'basic' | 'pro' | 'premium' => {
      const v = typeof t === 'string' ? t.toLowerCase().trim() : '';
      if (v === 'basic') return 'basic';
      if (v === 'pro') return 'pro';
      if (v === 'premium') return 'premium';
      // Backward-compat: map legacy 'standard' explicitly to 'pro'
      if (v === 'standard') return 'pro';
      // No default fallback - tier must be explicitly provided
      throw new Error(`Invalid tier: ${v}`);
    };
    
    let tierId: 'basic' | 'pro' | 'premium';
    try {
      tierId = normalizeTier(rawSelectedTier);
      info(`[CHECKOUT DEBUG] Tier successfully normalized:`, {
        from: rawSelectedTier,
        to: tierId
      });
    } catch (normalizeError) {
      warn("[CHECKOUT] ❌ Ungültiger Tier:", {
        rawSelectedTier,
        error: normalizeError,
        type: typeof rawSelectedTier
      });
      return res.status(400).json({ error: "Invalid tier selected", code: "INVALID_TIER" });
    }
    // Safe Stripe Price ID configuration - no empty string fallbacks
    const PRICE_IDS: Record<'basic' | 'pro' | 'premium', string> = {
      basic: process.env.STRIPE_PRICE_ID_BASIC!,
      pro: process.env.STRIPE_PRICE_ID_PRO!,
      premium: process.env.STRIPE_PRICE_ID_PREMIUM!,
    };

    // Validate Price IDs at runtime (double-check after env validation)
    Object.entries(PRICE_IDS).forEach(([tier, priceId]) => {
      if (!priceId || (!priceId.startsWith('price_') && !priceId.includes('_test_'))) {
        error(`[CHECKOUT] ❌ Invalid STRIPE_PRICE_ID for ${tier}:`, priceId);
        throw new Error(`Invalid Stripe Price ID for tier ${tier}: ${priceId}`);
      }
    });
    const priceIdForTier = PRICE_IDS[tierId];
    if (!priceIdForTier) {
      error("[CHECKOUT] ❌ Stripe Price ID fehlt für Tier:", tierId);
      return res.status(500).json({ error: "Stripe price id not configured for selected tier", code: "PRICE_ID_MISSING" });
    }

    // Light logging of Stripe key type for observability (no brittle mode checks)
    const keyMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') ? 'test' : 'live';
    info(`[CHECKOUT] ✅ Stripe-Konfiguration geprüft:`, {
      tier: tierId,
      priceId: priceIdForTier,
      keyMode
    });

    // Proactively verify that the price exists for the current key/account
    try {
      await stripeClient.prices.retrieve(priceIdForTier);
    } catch (priceErr) {
      warn('[CHECKOUT] ❌ Preis-ID nicht gefunden oder nicht im aktuellen Modus verfügbar', {
        tier: tierId,
        priceId: priceIdForTier,
        error: priceErr instanceof Error ? priceErr.message : String(priceErr)
      });
      return res.status(500).json({
        error: 'Stripe Konfigurationsfehler: Price ID ungültig oder falscher Modus',
        code: 'STRIPE_PRICE_NOT_FOUND'
      });
    }

    const session = await stripeClient.checkout.sessions.create({
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
    
    // Check if it's a Stripe error
    if (_err && typeof _err === 'object' && 'type' in _err) {
      const stripeErr = _err as { type: string; code?: string; param?: string };
      if (stripeErr.type === 'StripeInvalidRequestError') {
        warn("[CHECKOUT] 🔴 Stripe-spezifischer Fehler:", {
          type: stripeErr.type,
          code: stripeErr.code,
          param: stripeErr.param
        });
        
        if (stripeErr.code === 'resource_missing') {
          return res.status(500).json({ 
            error: "Stripe Konfigurationsfehler: Price ID ungültig", 
            code: "STRIPE_PRICE_NOT_FOUND",
            details: "Die konfigurierte Stripe Price ID existiert nicht im aktuellen Modus"
          });
        }
      }
    }
    
    res.status(500).json({ error: "Interner Serverfehler" });
  }

}
