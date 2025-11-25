/**
 * Zentrale Preiskonfiguration für PferdeWert.de
 * 
 * Diese Datei ist die EINZIGE Quelle für alle Preisangaben in der Anwendung.
 * Bei Preisänderungen muss nur diese Datei angepasst werden.
 * 
 * @author PferdeWert.de
 * @version 3.4.0 - Preisanpassung auf 19,90€
 */

// ===== PREIS KONFIGURATION =====
export const PRICING = {
  /**
   * Aktueller Hauptpreis für Pferdebewertung
   * Format: Dezimalzahl für Berechnungen
   */
  current: 19.90,

  /**
   * Decoy-Preis (Ankerpreis für psychologische Preisgestaltung)
   * Soll deutlich höher sein als current price
   */
  decoy: 39.90,
  
  /** 
   * Historische Preise (für Vergleiche und "war früher X€" Texte)
   */
  historical: {
    launch: 4.90,   // Startpreis 
    previous: 19.90   // Vorheriger Preis
  }
} as const;

// ===== FORMATIERTE PREISE =====
export const PRICING_FORMATTED = {
  /** Aktueller Preis formatiert für deutsche Anzeige */
  current: `${PRICING.current.toFixed(2).replace('.', ',')}€`,
  
  /** Decoy-Preis formatiert */
  decoy: `${PRICING.decoy.toFixed(2).replace('.', ',')}€`,
  
  /** Historische Preise formatiert */
  historical: {
    launch: `${PRICING.historical.launch.toFixed(2).replace('.', ',')}€`,
    previous: `${PRICING.historical.previous.toFixed(2).replace('.', ',')}€`
  }
} as const;

// ===== STRIPE KONFIGURATION =====
export const STRIPE_CONFIG = {
  /**
   * Stripe Price-ID für aktuellen Preis (EUR)
   * Automatisch aus Environment-Variable geladen
   */
  priceId: process.env.STRIPE_PRICE_ID || 'price_1RuFlMKoHsLHy9OTPv9tRBa0',

  /**
   * Preis in Stripe-Format (Cent-Betrag)
   * Automatisch berechnet aus PRICING.current
   */
  amountCents: Math.round(PRICING.current * 100),

  /** Währung */
  currency: 'EUR'
} as const;

// ===== MULTI-COUNTRY PRICING =====
/**
 * Pricing configuration per country
 * CH uses CHF with premium pricing (19.90 CHF)
 * DE/AT use EUR with standard pricing (19.90 EUR)
 */
export const PRICING_BY_COUNTRY = {
  DE: {
    price: PRICING.current,
    currency: 'EUR' as const,
    priceId: STRIPE_CONFIG.priceId,
    symbol: '€',
    formatted: PRICING_FORMATTED.current,
  },
  AT: {
    price: PRICING.current,
    currency: 'EUR' as const,
    priceId: STRIPE_CONFIG.priceId,
    symbol: '€',
    formatted: PRICING_FORMATTED.current,
  },
  CH: {
    price: 19.90,
    currency: 'CHF' as const,
    // TODO: Create CHF price in Stripe Dashboard and add price_id here
    priceId: process.env.STRIPE_PRICE_ID_CHF || 'price_xxx_chf',
    symbol: 'CHF',
    formatted: 'CHF 19,90',
  },
} as const;

export type CountryCode = keyof typeof PRICING_BY_COUNTRY;

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
  
  /** Preisvergleich mit Historie */
  priceComparison: `Früher ${PRICING_FORMATTED.historical.previous}, jetzt ${PRICING_FORMATTED.current}`,
  
  /** Verkaufen-Seite CTA */
  sellCta: `Jetzt Verkaufspreis berechnen → ${PRICING_FORMATTED.current}`,
  
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

// ===== DEVELOPMENT HELPERS =====
// Note: Development logging removed to prevent Fast Refresh loops
// Pricing config can be inspected via browser console or React DevTools