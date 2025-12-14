// frontend/pages/api/checkout-wertgutachten.ts
// Checkout-Endpoint für Wertgutachten / Verkaufs-Zertifikat (49,90€)
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { info, warn, error } from "@/lib/log";
import { z } from "zod";
import { WERTGUTACHTEN_PRICING } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Schema für Wertgutachten - gleiche Pferdedaten wie Bewertung
const WertgutachtenSchema = z.object({
  // Pflichtfelder
  rasse: z.string(),
  alter: z.coerce.number(),
  geschlecht: z.string(),
  stockmass: z.coerce.number(),
  haupteignung: z.string(),
  ausbildung: z.string(),

  // Optionale Angaben
  abstammung: z.string().optional(),
  aku: z.string().optional(),
  erfolge: z.string().optional(),
  standort: z.string().optional(),
  land: z.enum(['DE', 'AT', 'CH']).optional(),
  user_country: z.enum(['DE', 'AT', 'CH']).default('DE'),
  charakter: z.string().optional(),
  besonderheiten: z.string().optional(),

  // Pferdename für das Zertifikat
  pferdeName: z.string().optional(),
  // Marketing attribution
  attribution_source: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    warn("[CHECKOUT-WERTGUTACHTEN] ❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsedData = req.body;

    if (!parsedData || typeof parsedData !== "object") {
      warn("[CHECKOUT-WERTGUTACHTEN] ⚠️ Keine validen Daten übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    const validation = WertgutachtenSchema.safeParse(parsedData);
    if (!validation.success) {
      warn("[CHECKOUT-WERTGUTACHTEN] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ error: "Ungültige Daten" });
    }

    const wertgutachtenData = validation.data;
    info("[CHECKOUT-WERTGUTACHTEN] ✅ Eingabedaten validiert.");

    // DataFast cookies für Attribution
    const datafastVisitorId = req.cookies['df_visitor_id'] || req.cookies['datafast_visitor_id'] || '';
    const datafastSessionId = req.cookies['df_session_id'] || req.cookies['datafast_session_id'] || '';

    // Analytics consent
    const hasConsent = req.cookies['pferdewert_cookie_consent'];
    const analyticsConsent = hasConsent === 'allow' || hasConsent === 'analytics_only';

    const wertgutachtenId = new ObjectId();
    info("[CHECKOUT-WERTGUTACHTEN] 🆕 Neue Wertgutachten-ID:", wertgutachtenId.toHexString());

    // Origin für Stripe URLs
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.origin ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

    if (!origin) {
      error("[CHECKOUT-WERTGUTACHTEN] ❌ origin konnte nicht ermittelt werden.");
      return res.status(500).json({ error: "Server misconfigured: origin fehlt" });
    }

    // Preis-ID validieren
    const priceId = WERTGUTACHTEN_PRICING.priceId;
    try {
      await stripe.prices.retrieve(priceId);
      info("[CHECKOUT-WERTGUTACHTEN] ✅ Stripe-Preis-ID validiert:", priceId);
    } catch (priceErr) {
      warn("[CHECKOUT-WERTGUTACHTEN] ❌ Preis-ID nicht gefunden", {
        priceId,
        error: priceErr instanceof Error ? priceErr.message : String(priceErr)
      });
      return res.status(500).json({
        error: "Stripe Konfigurationsfehler: Wertgutachten Preis-ID ungültig",
        code: "STRIPE_PRICE_NOT_FOUND"
      });
    }

    // Payment Methods basierend auf Kundenland
    const userCountry = wertgutachtenData.user_country || 'DE';
    const paymentMethods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =
      userCountry === 'AT'
        ? ["card", "eps", "klarna", "paypal"]
        : ["card", "klarna", "paypal"];

    info("[CHECKOUT-WERTGUTACHTEN] 💳 Payment Methods:", paymentMethods);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/wertgutachten-ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
      metadata: {
        wertgutachtenId: wertgutachtenId.toHexString(),
        product_type: "wertgutachten",
        attribution_source: wertgutachtenData.attribution_source || 'unknown',
        datafast_visitor_id: datafastVisitorId,
        datafast_session_id: datafastSessionId,
        analytics_consent: analyticsConsent ? 'true' : 'false',
      },
    });

    // In Collection speichern
    const collection = await getCollection("wertgutachten");
    await collection.insertOne({
      _id: wertgutachtenId,
      ...wertgutachtenData,
      status: "offen",
      stripeSessionId: session.id,
      erstellt: new Date(),
    });

    info("[CHECKOUT-WERTGUTACHTEN] ✅ Session gespeichert, ID:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (_err: unknown) {
    error("[CHECKOUT-WERTGUTACHTEN] ❌ Unerwarteter Fehler:", _err);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
}
