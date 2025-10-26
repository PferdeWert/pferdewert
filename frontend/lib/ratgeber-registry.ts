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
    changefreq: 'monthly'
  },
  {
    slug: 'aku-pferd/ablauf',
    title: 'AKU Ablauf Schritt für Schritt',
    description: 'So läuft eine Ankaufsuntersuchung ab: Von der Vorbereitung bis zum Befund. Alle Untersuchungsschritte verständlich erklärt.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/aku-pferd/ablauf/aku-ablauf-untersuchung.webp', // Tierarzt führt Ankaufsuntersuchung durch
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    slug: 'aku-pferd/kosten',
    title: 'AKU Kosten im Detail',
    description: 'Was kostet eine Ankaufsuntersuchung? Alle Preise und Faktoren im Überblick - von der kleinen bis zur großen AKU.',
    category: 'Kauf & Verkauf',
    readTime: '8 Min.',
    image: '/images/ratgeber/aku-pferd/kosten/aku-kosten-tierarzt.webp', // Außenaufnahme mit Besitzerin – passend zum Kostenthema
    priority: '0.6',
    changefreq: 'monthly'
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
    changefreq: 'monthly'
  },
  {
    slug: 'pferd-kaufen/was-kostet-ein-pferd',
    title: 'Was kostet ein Pferd?',
    description: 'Detaillierte Übersicht aller Kosten: Kaufpreis, laufende Kosten und versteckte Ausgaben. So planst du dein Budget richtig.',
    category: 'Kauf & Verkauf',
    readTime: '14 Min.',
    image: '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/pferd-kosten-uebersicht.webp', // Stallaufnahme – fokussiert auf Kosten & Versorgung
    priority: '0.7',
    changefreq: 'monthly'
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
    changefreq: 'monthly'
  },
  {
    slug: 'pferd-verkaufen/tipps',
    title: 'Pferd verkaufen - Die 10 wichtigsten Tipps',
    description: 'Praktische Ratschläge für einen erfolgreichen und stressfreien Pferdeverkauf. Was du wirklich beachten musst.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/pferd-verkaufen/tipps/verkaufstipps-pferd.webp', // Eigenes Motiv für die Tipp-Sammlung
    priority: '0.7',
    changefreq: 'monthly'
  },

  // Pferdemarkt Guide
  {
    slug: 'pferdemarkt',
    title: 'Pferdemarkt 2025: Online Plattformen & traditionelle Märkte',
    description: 'Deutschlands größte Pferdemärkte: Havelberg mit 200.000 Besuchern, Bietigheim, Online-Plattformen mit 19.000+ Inseraten. Tipps und Veranstaltungskalender.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/pferdemarkt-hero.webp', // Springreiter auf Pferd bei Wettbewerb
    priority: '0.7',
    changefreq: 'monthly'
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
