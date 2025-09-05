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
   * Stripe Price-ID für aktuellen Preis (14,90€ für main branch)
   * Automatisch aus Environment-Variable geladen 
   */
  priceId: process.env.STRIPE_PRICE_ID!,
  
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
  if (!STRIPE_CONFIG.priceId) throw new Error('Stripe Price ID missing');
  return true;
};

// ===== 3-TIER PRICING SYSTEM =====

export type PricingTier = 'basic' | 'standard' | 'premium';

export interface TierConfig {
  id: PricingTier;
  displayName: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlights: string[];
  badge?: string;
  ctaText: string;
  stripeId: string;
  popular?: boolean;
  deliveryTime: string;
  reportPages: string;
}

export const PRICING_TIERS: Record<PricingTier, TierConfig> = {
  basic: {
    id: 'basic',
    displayName: 'PferdeWert Express',
    price: 14.90,
    description: 'Schnelle Marktpreis-Schätzung',
    features: [
      'Sofortiges Ergebnis',
      'Nur die Preisspanne, kein Analysebericht',
    ],
    highlights: [
      'Preisspanne in unter 1 Minute',
    ],
    ctaText: 'Express-Bewertung starten',
    stripeId: 'price_basic',
    deliveryTime: '< 1 Minute',
    reportPages: '1 Seite',
  },
  
  standard: {
    id: 'standard',
    displayName: 'PferdeWert Professional',
    price: 24.90,
    originalPrice: 39.90,
    description: 'Detaillierte Pferdebewertung mit ausführlicher Analyse',
    features: [
      'Detaillierte Pferdebewertung',
      'Ausführlicher PDF-Report',
      'Verkaufsempfehlungen',
      'Abstammungsanalyse'
    ],
    highlights: [
      'Ausführlicher Bericht über dein Pferd'
    ],
    badge: 'Beliebteste Wahl',
    ctaText: 'Professional-Analyse starten',
    stripeId: 'price_standard',
    popular: true,
    deliveryTime: '2-3 Minuten',
    reportPages: '3-5 Seiten',
  },
  
  premium: {
    id: 'premium',
    displayName: 'PferdeWert KI-Vision',
    price: 99.90,
    description: 'Premium KI-Vision mit Foto-Analyse',
    features: [
      'KI-Vision Foto-Analyse',
      'Detaillierte Exterieur-Bewertung',
      'Premium PDF-Report',
    ],
    highlights: [
      'Revolutionäre Foto-KI-Technologie',
    ],
    ctaText: 'KI-Vision Analyse starten',
    stripeId: 'price_premium',
    deliveryTime: '5-10 Minuten',
    reportPages: '8-12 Seiten',
  }
} as const;

export const DEFAULT_TIER: PricingTier = 'standard';

// ===== 3-TIER UTILITY FUNCTIONS =====
export const getTierConfig = (tier: PricingTier): TierConfig => {
  return PRICING_TIERS[tier];
};

export const formatTierPrice = (tier: PricingTier): string => {
  const config = getTierConfig(tier);
  return `${config.price.toFixed(2).replace('.', ',')}€`;
};

export const getTierSavings = (tier: PricingTier): string | null => {
  const config = getTierConfig(tier);
  if (!config.originalPrice) return null;
  const savings = config.originalPrice - config.price;
  return `${savings.toFixed(2).replace('.', ',')}€`;
};

// ===== DEVELOPMENT HELPERS =====
if (process.env.NODE_ENV === 'development') {
  import('@/lib/log').then(({ log }) => {
    log('💰 PferdeWert Pricing Config loaded:', {
      current: PRICING_FORMATTED.current,
      decoy: PRICING_FORMATTED.decoy,
      stripeId: STRIPE_CONFIG.priceId,
      valid: validatePricing()
    });
  });
}