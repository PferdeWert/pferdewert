/**
 * Zentrale Preiskonfiguration für PferdeWert.de
 * 
 * Diese Datei ist die EINZIGE Quelle für alle Preisangaben in der Anwendung.
 * Bei Preisänderungen muss nur diese Datei angepasst werden.
 * 
 * @author PferdeWert.de
 * @version 3.1.0 - Preisanpassung auf 14,90€
 */

// ===== PREIS KONFIGURATION =====
export const PRICING = {
  /** 
   * Aktueller Hauptpreis für Pferdebewertung
   * Format: Dezimalzahl für Berechnungen 
   */
  current: 14.90,
  
  /** 
   * Decoy-Preis (Ankerpreis für psychologische Preisgestaltung)
   * Soll deutlich höher sein als current price
   */
  decoy: 29.00
} as const;

// ===== FORMATIERTE PREISE =====
export const PRICING_FORMATTED = {
  /** Aktueller Preis formatiert für deutsche Anzeige */
  current: `${PRICING.current.toFixed(2).replace('.', ',')}€`,
  
  /** Decoy-Preis formatiert */
  decoy: `${PRICING.decoy.toFixed(0)}€`
} as const;

// ===== STRIPE KONFIGURATION =====
export const STRIPE_CONFIG = {
  /** 
   * Stripe Price-ID für aktuellen Preis
   * MUSS als Environment-Variable STRIPE_PRICE_ID in Vercel gesetzt werden
   */
  priceId: process.env.STRIPE_PRICE_ID,
  
  /** 
   * Preis in Stripe-Format (Cent-Betrag)
   * Automatisch berechnet aus PRICING.current 
   */
  amountCents: Math.round(PRICING.current * 100),
  
  /** Währung */
  currency: 'EUR'
} as const;

// ===== TEXT TEMPLATES =====
export const PRICING_TEXTS = {
  /** Standard CTA Button Text */
  ctaButton: `Jetzt ${PRICING_FORMATTED.current}-Analyse starten`,
  
  /** Mobile Sticky Button */
  mobileButton: `Jetzt Pferd bewerten → ${PRICING_FORMATTED.current}`,
  
  /** FAQ Antwort Text */
  faqAnswer: `Unsere umfassende Preisanalyse kostet aktuell ${PRICING_FORMATTED.current} (Einführungspreis), anstatt regulär ${PRICING_FORMATTED.decoy}.`,
  
  /** Sparpotenzial Text */
  savings: `Nur ${PRICING_FORMATTED.current} können dir tausende Euro sparen.`,
  
  
  /** Verkaufen-Seite CTA */
  sellCta: `Jetzt Verkaufspreis ermitteln → ${PRICING_FORMATTED.current}`,
  
  /** Marketing Copy - Warum so günstig */
  whyAffordable: `Warum kostet die Bewertung nur ${PRICING_FORMATTED.current}?`
} as const;

// ===== SCHEMA.ORG STRUCTURED DATA =====
export const SCHEMA_PRICING = {
  /** Preis für Schema.org Markup (immer mit Punkt als Dezimaltrennzeichen) */
  price: PRICING.current.toFixed(2),
  
  /** Währung für Schema.org */
  priceCurrency: "EUR",
  
  /** Vollständiges Schema.org Offer Object */
  offer: {
    "@type": "Offer",
    "price": PRICING.current.toFixed(2),
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-09"
  }
} as const;

// ===== TYPESCRIPT TYPES =====
export type PricingConfig = typeof PRICING;
export type PricingTexts = typeof PRICING_TEXTS;
export type StripeConfig = typeof STRIPE_CONFIG;

// ===== UTILITY FUNCTIONS =====
/**
 * Formatiert einen Preis für deutsche Anzeige
 * @param price Preis als Dezimalzahl
 * @returns Formatierter String (z.B. "14,90€")
 */
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2).replace('.', ',')}€`;
};

/**
 * Konvertiert Preis in Stripe-Cent-Format
 * @param price Preis als Dezimalzahl  
 * @returns Preis in Cent (Integer)
 */
export const toCents = (price: number): number => {
  return Math.round(price * 100);
};

/**
 * Validiert ob alle Preise korrekt konfiguriert sind
 * @returns true wenn gültig, sonst Error
 */
export const validatePricing = (): boolean => {
  if (PRICING.current <= 0) throw new Error('Current price must be positive');
  if (PRICING.decoy <= PRICING.current) throw new Error('Decoy price must be higher than current price');
  if (!STRIPE_CONFIG.priceId && process.env.NODE_ENV === 'production') {
    throw new Error('Stripe Price ID missing');
  }
  return true;
};

// ===== 3-TIER PRICING VARIABLES =====
export const TIER_PRICES = {
  basic: 14.90,
  pro: 19.90,
  premium: 39.90,
} as const;


export const TIER_STRIPE_IDS = {
  basic: process.env.STRIPE_PRICE_ID_BASIC || '',
  pro: process.env.STRIPE_PRICE_ID_PRO || '',
  premium: process.env.STRIPE_PRICE_ID_PREMIUM || '',
} as const;

export type PricingTier = keyof typeof TIER_PRICES; // 'basic' | 'pro' | 'premium'

// ===== 3-TIER PRICING CONFIGURATION =====
export const PRICING_TIERS = {
  basic: {
    displayName: 'Basic',
    price: TIER_PRICES.basic,
    stripeId: TIER_STRIPE_IDS.basic
  },
  pro: {
    displayName: 'Pro',
    price: TIER_PRICES.pro,
    stripeId: TIER_STRIPE_IDS.pro
  },
  premium: {
    displayName: 'Premium',
    price: TIER_PRICES.premium,
    stripeId: TIER_STRIPE_IDS.premium
  }
} as const;

// ===== DEVELOPMENT HELPERS =====
if (process.env.NODE_ENV === 'development') {
  import('@/lib/log').then(({ log }) => {
    log('💰 PferdeWert Pricing Config loaded:', {
      current: PRICING_FORMATTED.current,
      decoy: PRICING_FORMATTED.decoy,
      stripeId: STRIPE_CONFIG.priceId,
      valid: validatePricing(),
      tierPrices: TIER_PRICES
    });
  });
}
