/**
 * Zentrale Preiskonfiguration für PferdeWert.de - 3-Tier Pricing
 * 
 * Diese Datei ist die EINZIGE Quelle für alle Preisangaben in der Anwendung.
 * Bei Preisänderungen muss nur diese Datei angepasst werden.
 * 
 * @author PferdeWert.de
 * @version 4.0.0 - 3-Tier Pricing System
 */

// ===== 3-TIER PRICING PRICES =====
export const TIER_PRICES = {
  basic: 14.90,
  pro: 19.90,
  premium: 39.90,
} as const;

// ===== STRIPE CONFIGURATION =====
export const TIER_STRIPE_IDS = {
  basic: process.env.STRIPE_PRICE_ID_BASIC || '',
  pro: process.env.STRIPE_PRICE_ID_PRO || '',
  premium: process.env.STRIPE_PRICE_ID_PREMIUM || '',
} as const;

// ===== UTILITY FUNCTIONS =====
/**
 * Formatiert einen Preis für deutsche Anzeige
 * @param price Preis als Dezimalzahl
 * @returns Formatierter String (z.B. "14,90€")
 */
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2).replace('.', ',')}€`;
};

// ===== TYPESCRIPT TYPES =====
export type PricingTier = keyof typeof TIER_PRICES; // 'basic' | 'pro' | 'premium'

// ===== 3-TIER PRICING CONFIGURATION =====
export const PRICING_TIERS = {
  basic: {
    displayName: 'Basic',
    price: TIER_PRICES.basic,
    stripeId: TIER_STRIPE_IDS.basic,
    formatted: formatPrice(TIER_PRICES.basic)
  },
  pro: {
    displayName: 'Pro', 
    price: TIER_PRICES.pro,
    stripeId: TIER_STRIPE_IDS.pro,
    formatted: formatPrice(TIER_PRICES.pro)
  },
  premium: {
    displayName: 'Premium',
    price: TIER_PRICES.premium,
    stripeId: TIER_STRIPE_IDS.premium,
    formatted: formatPrice(TIER_PRICES.premium)
  }
} as const;

/**
 * Konvertiert Preis in Stripe-Cent-Format
 * @param price Preis als Dezimalzahl  
 * @returns Preis in Cent (Integer)
 */
export const toCents = (price: number): number => {
  return Math.round(price * 100);
};

/**
 * Validiert ob ein Stripe Price ID das korrekte Format hat
 * @param stripeId Die zu validierende Stripe Price ID
 * @returns true wenn gültig, sonst false
 */
export const isValidStripePriceId = (stripeId: string): boolean => {
  return stripeId.startsWith('price_') && stripeId.length > 6;
};

/**
 * Validiert ob alle Tier-Preise korrekt konfiguriert sind
 * @returns true wenn gültig, sonst Error
 */
export const validatePricing = (): boolean => {
  Object.values(TIER_PRICES).forEach(price => {
    if (price <= 0) throw new Error('All tier prices must be positive');
  });
  
  if (process.env.NODE_ENV === 'production') {
    Object.entries(TIER_STRIPE_IDS).forEach(([tier, stripeId]) => {
      if (!stripeId) throw new Error(`Stripe Price ID for tier '${tier}' must be set in production`);
      if (!isValidStripePriceId(stripeId)) {
        throw new Error(`Stripe Price ID for tier '${tier}' has invalid format. Must start with 'price_'`);
      }
    });
  }
  
  return true;
};

/**
 * Holt Tier-Konfiguration für spezifischen Tier
 * @param tier Der gewünschte Pricing Tier
 * @returns Tier-Konfiguration
 */
export const getTierConfig = (tier: PricingTier) => {
  return PRICING_TIERS[tier];
};

/**
 * Holt den formatierten Preis für einen Tier
 * @param tier Der gewünschte Pricing Tier
 * @returns Formatierter Preis-String
 */
export const getTierPrice = (tier: PricingTier): string => {
  return PRICING_TIERS[tier].formatted;
};

// ===== BACKWARD COMPATIBILITY EXPORTS =====
// Diese Exporte sind für die Übergangszeit, bis alle Dateien auf das neue System umgestellt sind
export const PRICING = {
  current: TIER_PRICES.basic,
  decoy: TIER_PRICES.premium
} as const;

export const PRICING_FORMATTED = {
  current: formatPrice(TIER_PRICES.basic),
  decoy: formatPrice(TIER_PRICES.premium)
} as const;

export const PRICING_TEXTS = {
  ctaButton: `Jetzt ${formatPrice(TIER_PRICES.basic)}-Analyse starten`,
  mobileButton: `Jetzt Pferd bewerten → ${formatPrice(TIER_PRICES.basic)}`,
  faqAnswer: `Unsere umfassende Preisanalyse kostet aktuell ${formatPrice(TIER_PRICES.basic)} (Einführungspreis), anstatt regulär ${formatPrice(TIER_PRICES.premium)}.`,
  savings: `Nur ${formatPrice(TIER_PRICES.basic)} können dir tausende Euro sparen.`,
  sellCta: `Jetzt Verkaufspreis ermitteln → ${formatPrice(TIER_PRICES.basic)}`,
  whyAffordable: `Warum kostet die Bewertung nur ${formatPrice(TIER_PRICES.basic)}?`
} as const;

export const SCHEMA_PRICING = {
  price: TIER_PRICES.basic.toFixed(2),
  priceCurrency: "EUR",
  offer: {
    "@type": "Offer",
    "price": TIER_PRICES.basic.toFixed(2),
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-09"
  }
} as const;

// ===== DEVELOPMENT HELPERS =====
if (process.env.NODE_ENV === 'development') {
  import('@/lib/log').then(({ log }) => {
    log('💰 PferdeWert 3-Tier Pricing Config loaded:', {
      tierPrices: TIER_PRICES,
      stripeIds: TIER_STRIPE_IDS,
      valid: validatePricing()
    });
  });
}
