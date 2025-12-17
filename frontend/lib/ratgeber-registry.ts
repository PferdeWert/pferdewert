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

  /** Custom base path (defaults to /pferde-ratgeber if not specified)
   *  Use for pages outside /pferde-ratgeber/, e.g., basePath: '/pferd-kaufen'
   */
  basePath?: string;
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
    image: '/images/ratgeber/aku-pferd/veterinarian-examining-horse-head-outdoor.webp', // Tierärztin untersucht Pferd – zentrales Motiv für die Gesamtübersicht
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'aku-pferd/kosten',
      '', // Hub-Seite /pferd-kaufen/
      'was-kostet-ein-pferd'
    ]
  },
  {
    slug: 'aku-pferd/kosten',
    title: 'AKU Kosten im Detail',
    description: 'Was kostet eine Ankaufsuntersuchung? Alle Preise und Faktoren im Überblick - von der kleinen bis zur großen AKU.',
    category: 'Kauf & Verkauf',
    readTime: '8 Min.',
    image: '/images/ratgeber/aku-pferd/kosten/woman-handler-horse-halter-outdoor.webp', // Außenaufnahme mit Besitzerin – passend zum Kostenthema
    priority: '0.6',
    changefreq: 'monthly',
    relatedSlugs: ['aku-pferd', '', 'was-kostet-ein-pferd'] // '' = Hub-Seite /pferd-kaufen/
  },

  // ============================================================================
  // PFERD KAUFEN HUB/SPOKE CLUSTER (unter /pferd-kaufen/)
  // Diese Seiten haben commercial intent und verwenden die Hub-URL-Struktur
  // ============================================================================

  // Hub-Seite: /pferd-kaufen/ (index)
  {
    slug: '', // Leerer Slug für Index-Seite
    basePath: '/pferd-kaufen',
    title: 'Pferd kaufen - Der komplette Ratgeber',
    description: 'Der ultimative Ratgeber für den Pferdekauf. Checklisten, rechtliche Aspekte, Bewertungskriterien und Tipps für die richtige Entscheidung.',
    category: 'Kauf & Verkauf',
    readTime: '18 Min.',
    image: '/images/ratgeber/pferd-kaufen/rider-brown-horse-dressage-arena.webp',
    priority: '0.9', // Hub-Seite hat höhere Priorität
    changefreq: 'weekly',
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
    image: '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/horse-chestnut-eating-hay-stable-window.webp', // Stallaufnahme – fokussiert auf Kosten & Versorgung
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite /pferd-kaufen/
      'aku-pferd',
      'pferdemarkt'
    ]
  },
  // Spoke: /pferd-kaufen/freizeitpferd
  {
    slug: 'freizeitpferd',
    basePath: '/pferd-kaufen',
    title: 'Freizeitpferd kaufen: Kompletter Guide für Anfänger',
    description: 'Freizeitpferd kaufen leicht gemacht: Rassen, Kosten, Gesundheitschecks & Kaufvertrag. Unser Leitfaden mit Checklisten hilft dir, das richtige Pferd sicher zu kaufen.',
    category: 'Kauf & Verkauf',
    readTime: '15 Min.',
    image: '/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'kaufvertrag',
      'aku-pferd',
      '' // Hub-Seite
    ]
  },
  // Spoke: /pferd-kaufen/anfaenger
  {
    slug: 'anfaenger',
    basePath: '/pferd-kaufen',
    title: 'Anfängerpferd kaufen: Ratgeber für sicheren Kauf 2025',
    description: 'Finden Sie Ihr perfektes Anfängerpferd: Von geeigneten Rassen über realistische Kosten bis zur rechtlichen Absicherung. KI-Bewertung in 2 Minuten verfügbar.',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/anfaengerpferd-hero.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'freizeitpferd',
      'kaufvertrag',
      'aku-pferd'
    ]
  },
  // Spoke: /pferd-kaufen/schweiz
  {
    slug: 'schweiz',
    basePath: '/pferd-kaufen',
    title: 'Pferd kaufen Schweiz: Vollständiger Leitfaden mit Marktplatz-Vergleich',
    description: 'Pferdekauf in der Schweiz leicht gemacht. Vergleich von 8 Marktplätzen, Schritt-für-Schritt Anleitung, Budget-Planer & Sicherheits-Tipps für Anfänger.',
    category: 'Kauf & Verkauf',
    readTime: '18 Min.',
    image: '/images/ratgeber/horses-zermatt-switzerland.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'anfaenger',
      'kaufvertrag'
    ]
  },

  // Pferd Verkaufen Series
  {
    slug: 'pferd-verkaufen',
    title: 'Pferd verkaufen - Erfolgreich & Optimal',
    description: 'Professionelle Tipps für den erfolgreichen Pferdeverkauf. Von der optimalen Bewertung bis zur rechtssicheren Abwicklung.',
    category: 'Kauf & Verkauf',
    readTime: '16 Min.',
    image: '/images/ratgeber/pferd-verkaufen/woman-horse-portrait-outdoor-bonding.webp', // Hauptmotiv für den Verkaufsratgeber
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
    image: '/images/ratgeber/horse-market-havelberg-crowd.webp', // Springreiter auf Pferd bei Wettbewerb
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'was-kostet-ein-pferd',
      '', // Hub-Seite /pferd-kaufen/
      'aku-pferd'
    ]
  },

  // Spoke: /pferd-kaufen/kaufvertrag
  {
    slug: 'kaufvertrag',
    basePath: '/pferd-kaufen',
    title: 'Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    description: 'Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden. Rechtlich sicher kaufen & verkaufen.',
    category: 'Finanzen & Recht',
    readTime: '12 Min.',
    image: '/images/ratgeber/horses-mountain-field-spain.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'aku-pferd',
      'pferd-verkaufen'
    ]
  },

  // Spoke: /pferd-kaufen/springpferd
  {
    slug: 'springpferd',
    basePath: '/pferd-kaufen',
    title: 'Springpferd kaufen: Ratgeber, Preise & Tipps',
    description: 'Springpferd kaufen leicht gemacht: Auswahlkriterien, Preise (10.000-100.000€+), seriöse Züchter, AKU-Tipps & Kaufvertrag. Jetzt informieren!',
    category: 'Kauf & Verkauf',
    readTime: '12 Min.',
    image: '/images/ratgeber/springpferd-hero-jumping.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'aku-pferd',
      'kaufvertrag'
    ]
  },

  // Spoke: /pferd-kaufen/dressurpferd
  {
    slug: 'dressurpferd',
    basePath: '/pferd-kaufen',
    title: 'Dressurpferd kaufen: Ratgeber für sichere Kaufentscheidung',
    description: 'Dressurpferd kaufen leicht gemacht: Preise, Qualitätskriterien, Kaufquellen & AKU-Checkliste. Vom A-Pferd bis Grand Prix. Jetzt informieren!',
    category: 'Kauf & Verkauf',
    readTime: '14 Min.',
    image: '/images/ratgeber/dressage-rider-competition-arena.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'kaufvertrag',
      'aku-pferd',
      '' // Hub-Seite
    ]
  },

  // Pferderassen Guides
  {
    slug: 'lipizzaner',
    title: 'Lipizzaner – Der ultimative Ratgeber zur edlen Pferderasse',
    description: 'Alles über Lipizzaner: Geschichte, Farben, Charakter & Kaufen. Kompletter Ratgeber mit Preisen, Gestüten & Tipps für Anfänger. 2025 aktualisiert.',
    category: 'Pferderassen',
    readTime: '16 Min.',
    image: '/images/ratgeber/lipizzaner-white-horse.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'dressurpferd',
      'was-kostet-ein-pferd',
      'anfaenger'
    ]
  },
  // Spoke: /pferd-kaufen/haflinger
  {
    slug: 'haflinger',
    basePath: '/pferd-kaufen',
    title: 'Haflinger kaufen: Kompletter Guide mit Preisen & Tipps',
    description: 'Haflinger kaufen leicht gemacht: Marktpreise (€4.900 Median), Rassen-Übersicht, Kosten & Betrugsschutz. Schritt-für-Schritt Anleitung für Anfänger & Profis.',
    category: 'Pferderassen',
    readTime: '19 Min.',
    image: '/images/ratgeber/haflinger-roebel.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'anfaenger',
      'was-kostet-ein-pferd',
      '' // Hub-Seite
    ]
  },

  // Spoke: /pferd-kaufen/oesterreich
  {
    slug: 'oesterreich',
    basePath: '/pferd-kaufen',
    title: 'Pferd kaufen in Österreich: Kompletter Ratgeber 2025',
    description: 'Pferd kaufen in Österreich: Alle Marktplätze (Willhaben, ehorses, Landwirt.com), Preise nach Bundesland, Noriker & Haflinger, Kaufvertrag & AKU.',
    category: 'Kauf & Verkauf',
    readTime: '18 Min.',
    image: '/images/ratgeber/horses-mountain-meadow-lake.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'haflinger',
      'aku-pferd'
    ]
  },

  // Spoke: /pferd-kaufen/pony
  {
    slug: 'pony',
    basePath: '/pferd-kaufen',
    title: 'Pony kaufen: Kompletter Leitfaden für Anfänger',
    description: 'Pony kaufen leicht gemacht: Ponyrassen, Kosten, Kaufwege & Checkliste. Von Shetland bis Haflinger - der ultimative Guide für sicheren Ponykauf.',
    category: 'Kauf & Verkauf',
    readTime: '8 Min.',
    image: '/images/ratgeber/pony-foal-green-pasture.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'haflinger',
      'anfaenger'
    ]
  },

  // Spoke: /pferd-kaufen/fohlen
  {
    slug: 'fohlen',
    basePath: '/pferd-kaufen',
    title: 'Fohlen kaufen: Der komplette Ratgeber 2025',
    description: 'Fohlen kaufen leicht gemacht: Marktplätze, Preise, Gesundheitschecks, Rechtliches. Schritt-für-Schritt Anleitung + Checkliste für sicheren Fohlenkauf.',
    category: 'Kauf & Verkauf',
    readTime: '16 Min.',
    image: '/images/ratgeber/braunes-fohlen-stute-weide-irland.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'aku-pferd',
      'kaufvertrag'
    ]
  },

  // Spoke: /pferd-kaufen/quarter-horse
  {
    slug: 'quarter-horse',
    basePath: '/pferd-kaufen',
    title: 'Quarter Horse kaufen: Westernreiten und amerikanische Zuchtlinien',
    description: 'Quarter Horse kaufen in Deutschland: Foundation vs Performance Bloodlines, AQHA-Papiere, Western-Ausbildung & Züchter. Preise 5.000-50.000€.',
    category: 'Pferderassen',
    readTime: '7 Min.',
    image: '/images/ratgeber/quarter-horse-weide.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'freizeitpferd',
      '', // Hub-Seite
      'aku-pferd'
    ]
  },

  // Spoke: /pferd-kaufen/friese
  {
    slug: 'friese',
    basePath: '/pferd-kaufen',
    title: 'Friese kaufen: KFPS-Papiere, Preise & Gesundheit',
    description: 'Friese kaufen leicht gemacht: KFPS-Registrierung, rassetypische Gesundheit, Preise 5.000-50.000€. Der komplette Ratgeber zur barocken Pferderasse.',
    category: 'Pferderassen',
    readTime: '8 Min.',
    image: '/images/ratgeber/friese-weide.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'dressurpferd',
      'haflinger',
      '' // Hub-Seite
    ]
  },

  // Spoke: /pferd-kaufen/islandpferd
  {
    slug: 'islandpferd',
    basePath: '/pferd-kaufen',
    title: 'Islandpferd kaufen: Tölt, Gangarten & FIZO-Tests',
    description: 'Islandpferd kaufen ✓ Tölt & 5 Gangarten verstehen ✓ FIZO-Bewertung richtig lesen ✓ Winterhaltung & Robustheit. Experten-Guide für Isländer.',
    category: 'Pferderassen',
    readTime: '12 Min.',
    image: '/images/ratgeber/islandpferd-weide-1.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      'pony',
      'freizeitpferd',
      '' // Hub-Seite
    ]
  },

  // Spoke: /pferd-kaufen/bayern (Regional)
  {
    slug: 'bayern',
    basePath: '/pferd-kaufen',
    title: 'Pferd kaufen in Bayern: Regionale Besonderheiten und Top-Adressen',
    description: 'Pferd kaufen in Bayern: Top-Gestüte, Rottaler & Bayerisches Warmblut, regionale Märkte und praktische Tipps. Preise 3.000-25.000€.',
    category: 'Regional Guides',
    readTime: '8 Min.',
    image: '/images/ratgeber/pferd-weide-haimhausen-bayern.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'haflinger',
      'quarter-horse'
    ]
  },

  // Spoke: /pferd-kaufen/nrw (Regional)
  {
    slug: 'nrw',
    basePath: '/pferd-kaufen',
    title: 'Pferd kaufen in NRW: Regionale Züchter & Märkte',
    description: 'Pferd kaufen in NRW: Top-Züchter im Münsterland, moderne Reitanlagen im Ruhrgebiet. Westfälische Warmblüter, lokale Märkte und praktische Tipps.',
    category: 'Regional Guides',
    readTime: '7 Min.',
    image: '/images/ratgeber/pferde-weide-duelmen-muensterland.webp',
    priority: '0.7',
    changefreq: 'monthly',
    relatedSlugs: [
      '', // Hub-Seite
      'freizeitpferd',
      'kaufvertrag'
    ]
  }
];

/**
 * Get full URL path for a ratgeber entry
 * Respects custom basePath if defined in the entry
 * Handles empty slugs for hub/index pages (e.g., /pferd-kaufen/)
 */
export function getRatgeberPath(slug: string): string {
  const entry = getRatgeberBySlug(slug);
  const basePath = entry?.basePath || '/pferde-ratgeber';
  // Handle empty slug for index pages
  return slug === '' ? basePath : `${basePath}/${slug}`;
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
