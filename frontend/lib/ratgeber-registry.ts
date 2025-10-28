/**
 * Centralized Ratgeber Registry
 *
 * This registry serves as the single source of truth for all ratgeber entries.
 * It is used to:
 * - Automatically generate sitemap URLs
 * - Populate the ratgeber overview page
 * - Maintain consistency across the platform
 *
 * Usage:
 * 1. Add new ratgeber entries here
 * 2. Run `npm run sitemap` to update sitemap.xml
 * 3. Deploy (overview page updates automatically)
 */

export interface RatgeberEntry {
  /** URL slug (e.g., "pferd-verkaufen" or "aku-pferd/ablauf") */
  slug: string;

  /** Display title for the card */
  title: string;

  /** Short description for the card */
  description: string;

  /** Category badge */
  category: string;

  /** Reading time estimate */
  readTime: string;

  /** Image path for the card */
  image: string;

  /** Sitemap priority (0.0 - 1.0) */
  priority: string;

  /** Sitemap change frequency */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';

  /** Related article slugs for internal linking */
  relatedSlugs?: string[];
}

/**
 * All ratgeber entries in the system.
 * Add new entries here to automatically include them in:
 * - Sitemap generation
 * - Overview page (/pferde-ratgeber)
 */
export const RATGEBER_ENTRIES: RatgeberEntry[] = [
  // AKU Pferd Series
  {
    slug: 'aku-pferd',
    title: 'AKU Pferd - Ankaufsuntersuchung erklärt',
    description: 'Der umfassende Leitfaden zur Ankaufsuntersuchung beim Pferdekauf. Kosten, Ablauf, Bewertung und wie AKU-Befunde den Pferdewert beeinflussen.',
    category: 'Kauf & Verkauf',
    readTime: '15 Min.',
    image: '/images/ratgeber/aku-pferd/aku-pferd-untersuchung.webp', // Tierärztin untersucht Pferd – zentrales Motiv für die Gesamtübersicht
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'aku-pferd/ablauf',
      'aku-pferd/kosten',
      'pferd-kaufen'
    ]
  },
  {
    slug: 'aku-pferd/ablauf',
    title: 'AKU Ablauf Schritt für Schritt',
    description: 'So läuft eine Ankaufsuntersuchung ab: Von der Vorbereitung bis zum Befund. Alle Untersuchungsschritte verständlich erklärt.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/aku-pferd/ablauf/aku-ablauf-untersuchung.webp', // Tierarzt führt Ankaufsuntersuchung durch
    priority: '0.6',
    changefreq: 'monthly',
    relatedSlugs: ['aku-pferd', 'aku-pferd/kosten', 'pferd-kaufen']
  },
  {
    slug: 'aku-pferd/kosten',
    title: 'AKU Kosten im Detail',
    description: 'Was kostet eine Ankaufsuntersuchung? Alle Preise und Faktoren im Überblick - von der kleinen bis zur großen AKU.',
    category: 'Kauf & Verkauf',
    readTime: '8 Min.',
    image: '/images/ratgeber/aku-pferd/kosten/aku-kosten-tierarzt.webp', // Außenaufnahme mit Besitzerin – passend zum Kostenthema
    priority: '0.6',
    changefreq: 'monthly',
    relatedSlugs: ['aku-pferd/ablauf', 'aku-pferd', 'pferd-kaufen']
  },

  // Pferd Kaufen Series
  {
    slug: 'pferd-kaufen',
    title: 'Pferd kaufen - Der komplette Ratgeber',
    description: 'Der ultimative Ratgeber für den Pferdekauf. Checklisten, rechtliche Aspekte, Bewertungskriterien und Tipps für die richtige Entscheidung.',
    category: 'Kauf & Verkauf',
    readTime: '18 Min.',
    image: '/images/ratgeber/pferd-kaufen/pferd-kaufen-ratgeber.webp', // Trainingsszene – ideal für Kaufberatung
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'was-kostet-ein-pferd',
      'aku-pferd',
      'pferdemarkt'
    ]
  },
  {
    slug: 'was-kostet-ein-pferd',
    title: 'Was kostet ein Pferd?',
    description: 'Detaillierte Übersicht aller Kosten: Kaufpreis, laufende Kosten und versteckte Ausgaben. So planst du dein Budget richtig.',
    category: 'Kauf & Verkauf',
    readTime: '14 Min.',
    image: '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/pferd-kosten-uebersicht.webp', // Stallaufnahme – fokussiert auf Kosten & Versorgung
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'pferd-kaufen',
      'aku-pferd',
      'pferdemarkt'
    ]
  },

  // Pferd Verkaufen Series
  {
    slug: 'pferd-verkaufen',
    title: 'Pferd verkaufen - Erfolgreich & Optimal',
    description: 'Professionelle Tipps für den erfolgreichen Pferdeverkauf. Von der optimalen Bewertung bis zur rechtssicheren Abwicklung.',
    category: 'Kauf & Verkauf',
    readTime: '16 Min.',
    image: '/images/ratgeber/pferd-verkaufen/pferd-verkaufen-beratung.webp', // Hauptmotiv für den Verkaufsratgeber
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'pferdemarkt',
      'aku-pferd',
      'was-kostet-ein-pferd'
    ]
  },

  // Pferdemarkt Guide
  {
    slug: 'pferdemarkt',
    title: 'Pferdemarkt 2025: Online Plattformen & traditionelle Märkte',
    description: 'Deutschlands größte Pferdemärkte: Havelberg mit 200.000 Besuchern, Bietigheim, Online-Plattformen mit 19.000+ Inseraten. Tipps und Veranstaltungskalender.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/pferdemarkt-hero-v2.webp', // Springreiter auf Pferd bei Wettbewerb
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'was-kostet-ein-pferd',
      'pferd-kaufen',
      'aku-pferd'
    ]
  }
];

/**
 * Get full URL path for a ratgeber entry
 */
export function getRatgeberPath(slug: string): string {
  return `/pferde-ratgeber/${slug}`;
}

/**
 * Get ratgeber entry by slug
 */
export function getRatgeberBySlug(slug: string): RatgeberEntry | undefined {
  return RATGEBER_ENTRIES.find(entry => entry.slug === slug);
}

/**
 * Get all ratgeber entries for a specific category
 */
export function getRatgeberByCategory(category: string): RatgeberEntry[] {
  return RATGEBER_ENTRIES.filter(entry => entry.category === category);
}

/**
 * Get related articles for a given ratgeber entry.
 *
 * Implements 3-tier fallback logic:
 * 1. If overrideSlugs provided → use those (highest priority)
 * 2. If entry.relatedSlugs exists → use those (registry defaults)
 * 3. Fallback → Auto-select 3 articles from same category (excluding current)
 *
 * @param slug - The article slug to get related articles for
 * @param overrideSlugs - Optional override slugs (highest priority)
 * @returns Array of related RatgeberEntry objects
 */
export function getRelatedArticles(slug: string, overrideSlugs?: string[]): RatgeberEntry[] {
  const currentEntry = getRatgeberBySlug(slug);
  if (!currentEntry) return [];

  // Determine which slugs to use (3-tier fallback)
  let slugsToUse: string[] = [];

  if (overrideSlugs && overrideSlugs.length > 0) {
    // Tier 1: Use override slugs (highest priority)
    slugsToUse = overrideSlugs;
  } else if (currentEntry.relatedSlugs && currentEntry.relatedSlugs.length > 0) {
    // Tier 2: Use relatedSlugs from registry entry (default)
    slugsToUse = currentEntry.relatedSlugs;
  } else {
    // Tier 3: Fallback - auto-select 3 from same category (excluding current)
    const sameCategory = getRatgeberByCategory(currentEntry.category)
      .filter(entry => entry.slug !== slug)
      .slice(0, 3);
    slugsToUse = sameCategory.map(entry => entry.slug);
  }

  // Map slugs to entries and filter out any that don't exist
  const relatedEntries = slugsToUse
    .map(relatedSlug => getRatgeberBySlug(relatedSlug))
    .filter((entry): entry is RatgeberEntry => entry !== undefined);

  return relatedEntries;
}
