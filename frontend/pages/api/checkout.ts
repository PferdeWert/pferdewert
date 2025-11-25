// frontend/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { z } from "zod";
import { STRIPE_CONFIG, PRICING_BY_COUNTRY } from "@/lib/pricing";

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
  land: z.enum(['DE', 'AT', 'CH']).optional(), // Land des Pferdes - für KI-Marktdaten (strict validation)
  user_country: z.enum(['DE', 'AT', 'CH']).default('DE'), // Land des Kunden - für Payment Methods (strict validation)
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

  // Development bypass für Rate Limiting Tests
  if (process.env.NODE_ENV === "development" && req.body.skipPayment) {
    warn("[CHECKOUT] 🚧 DEV MODE: Skipping payment for testing");
    return res.status(200).json({ url: "/ergebnis?id=test-bypass" });
  }

  try {
    // Next.js automatically parses JSON request bodies, so req.body is already the form object
    const parsedData = req.body;

    if (!parsedData || typeof parsedData !== "object") {
      warn("[CHECKOUT] ⚠️ Keine validen Daten übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    const validation = BewertungSchema.safeParse(parsedData);
    if (!validation.success) {
      warn("[CHECKOUT] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ error: "Ungültige Bewertungsdaten" });
    }

    const bewertungData = validation.data;

    info("[CHECKOUT] ✅ Eingabedaten validiert und geparst.");
    log("[CHECKOUT] Eingabe:", bewertungData);

    // Extract DataFast cookies for revenue attribution
    const datafastVisitorId = req.cookies['df_visitor_id'] || req.cookies['datafast_visitor_id'] || '';
    const datafastSessionId = req.cookies['df_session_id'] || req.cookies['datafast_session_id'] || '';

    if (datafastVisitorId || datafastSessionId) {
      info("[CHECKOUT] 📊 DataFast cookies found:", {
        visitor_id: datafastVisitorId ? 'present' : 'missing',
        session_id: datafastSessionId ? 'present' : 'missing'
      });
    } else {
      info("[CHECKOUT] 📊 No DataFast cookies found for attribution");
    }

    // Check analytics consent for DSGVO compliance
    const hasConsent = req.cookies['pferdewert_cookie_consent'];
    const analyticsConsent = hasConsent === 'allow' || hasConsent === 'analytics_only';
    info("[CHECKOUT] 📊 Analytics consent:", analyticsConsent ? 'granted' : 'denied');

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

    // Proaktive Prüfung: Existiert die Preis-ID im aktuellen Stripe-Account?
    try {
      await stripe.prices.retrieve(STRIPE_CONFIG.priceId);
      info("[CHECKOUT] ✅ Stripe-Preis-ID validiert:", STRIPE_CONFIG.priceId);
    } catch (priceErr) {
      warn("[CHECKOUT] ❌ Preis-ID nicht gefunden oder nicht verfügbar", {
        priceId: STRIPE_CONFIG.priceId,
        error: priceErr instanceof Error ? priceErr.message : String(priceErr)
      });
      return res.status(500).json({
        error: "Stripe Konfigurationsfehler: Preis-ID ungültig",
        code: "STRIPE_PRICE_NOT_FOUND"
      });
    }

    // Dynamische Payment Methods basierend auf KUNDEN-Land (nicht Pferde-Land!)
    // user_country = Land des Kunden (aus URL: /at/ → AT) → bestimmt Payment Methods
    // land = Land des Pferdes (aus Formular) → bestimmt KI-Marktdaten (später im Backend)
    const userCountry = bewertungData.user_country || 'DE'; // Fallback auf Deutschland

    // Payment Methods: AT hat EPS, DE/CH haben nur Card/Klarna/PayPal
    // TWINT für CH wird von Stripe nicht unterstützt
    let paymentMethods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
    if (userCountry === 'AT') {
      paymentMethods = ["card", "eps", "klarna", "paypal"]; // EPS für österreichische Kunden
    } else {
      paymentMethods = ["card", "klarna", "paypal"]; // Standard für DE + CH
    }

    // Get country-specific pricing (CHF for CH, EUR for DE/AT)
    const countryPricing = PRICING_BY_COUNTRY[userCountry as keyof typeof PRICING_BY_COUNTRY] || PRICING_BY_COUNTRY.DE;
    const priceId = countryPricing.priceId;

    info("[CHECKOUT] 💳 Payment Methods für Kundenland", userCountry, ":", paymentMethods);
    info("[CHECKOUT] 💰 Preis-ID für Kundenland", userCountry, ":", priceId, `(${countryPricing.currency})`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
      metadata: {
        bewertungId: bewertungId.toHexString(),
        // DataFast revenue attribution cookies
        datafast_visitor_id: datafastVisitorId,
        datafast_session_id: datafastSessionId,
        // Analytics consent for DSGVO-compliant tracking
        analytics_consent: analyticsConsent ? 'true' : 'false',
      },
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
    return res.status(200).json({ url: session.url });
  } catch (_err: unknown) {
    error("[CHECKOUT] ❌ Unerwarteter Fehler im Checkout-Prozess:", _err);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
}
