// frontend/pages/api/upgrade-checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { validateStripeEnvironment } from "@/lib/env-validation";
import { info, warn, error } from "@/lib/log";

// Lazy Stripe init
let stripe: Stripe | null = null;
const getStripe = (): Stripe => {
  if (stripe) return stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is required");
  stripe = new Stripe(key);
  return stripe;
};

// Map upgrade routes to dedicated Stripe Price IDs (difference pricing)
const getUpgradePriceId = (from: 'basic' | 'pro', to: 'pro' | 'premium'): string | null => {
  if (from === 'basic' && to === 'pro') {
    return process.env.STRIPE_PRICE_ID_UPGRADE_BASIC_TO_PRO || null;
  }
  if (from === 'pro' && to === 'premium') {
    return process.env.STRIPE_PRICE_ID_UPGRADE_PRO_TO_PREMIUM || null;
  }
  return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Guard: ensure environment ready for Stripe
  const envValidation = validateStripeEnvironment();
  if (!envValidation.isValid) {
    error("[UPGRADE CHECKOUT] ❌ Stripe environment validation failed:", envValidation.error);
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { bewertungId, fromTier, targetTier, readToken } = req.body || {} as {
      bewertungId?: string;
      fromTier?: 'basic' | 'pro' | 'premium';
      targetTier?: 'pro' | 'premium';
      readToken?: string;
    };

    if (!bewertungId || !ObjectId.isValid(bewertungId)) {
      warn('[UPGRADE CHECKOUT] Invalid or missing bewertungId', { bewertungId });
      return res.status(400).json({ error: 'Invalid analysis id' });
    }

    // Only allow valid upgrade steps (basic->pro, pro->premium)
    if (!fromTier || !targetTier) {
      return res.status(400).json({ error: 'fromTier and targetTier are required' });
    }
    const from = String(fromTier) as 'basic' | 'pro' | 'premium';
    const to = String(targetTier) as 'pro' | 'premium';
    const isValidUpgrade = (from === 'basic' && to === 'pro') || (from === 'pro' && to === 'premium');
    if (!isValidUpgrade) {
      warn('[UPGRADE CHECKOUT] Invalid upgrade route', { from, to });
      return res.status(400).json({ error: 'Invalid upgrade route' });
    }

    const priceId = getUpgradePriceId(from, to);
    if (!priceId) {
      error('[UPGRADE CHECKOUT] Missing Stripe Price ID for upgrade', { from, to });
      return res.status(500).json({ error: 'Upgrade price not configured' });
    }

    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.origin ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
    if (!origin) {
      error('[UPGRADE CHECKOUT] Unable to determine origin');
      return res.status(500).json({ error: 'Server misconfigured: origin missing' });
    }

    const stripeClient = getStripe();

    // Create a dedicated Stripe Checkout session for the upgrade (difference pricing)
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "paypal"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ergebnis?id=${bewertungId}${readToken ? `&token=${encodeURIComponent(readToken)}` : ''}`,
      metadata: {
        mode: 'upgrade',
        bewertungId,
        upgrade_from: from,
        selectedTier: to,
      }
    });

    info('[UPGRADE CHECKOUT] ✅ Created upgrade session', { id: session.id, from, to });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    error('[UPGRADE CHECKOUT] ❌ Error creating upgrade session:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
