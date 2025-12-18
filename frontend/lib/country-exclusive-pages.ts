/**
 * Country-Exclusive Pages Configuration
 * ======================================
 * Single Source of Truth for pages that should only exist on one domain.
 *
 * Used by:
 * - middleware.ts (404 blocking on wrong domains)
 * - generate-sitemap.mjs (filter pages per country sitemap)
 * - RatgeberHead.tsx (skip hreflang for exclusive pages)
 *
 * When adding new regional pages:
 * 1. Add the full path to the appropriate country array below
 * 2. The slug will be automatically derived for hreflang checks
 * 3. All three systems will stay in sync automatically
 */

export type CountryCode = 'DE' | 'AT' | 'CH';

/**
 * Pages exclusive to specific country domains.
 * These pages return 404 on other domains to prevent duplicate content.
 */
export const COUNTRY_EXCLUSIVE_PAGES: Record<CountryCode, readonly string[]> = {
  DE: [
    '/pferd-kaufen/bayern',
    '/pferd-kaufen/nrw',
    '/pferd-kaufen/sachsen',
    '/pferd-kaufen/schleswig-holstein',
    '/pferd-kaufen/brandenburg',
    '/pferd-kaufen/hessen',
    '/pferd-kaufen/baden-wuerttemberg',
    '/pferd-kaufen/niedersachsen',
  ],
  AT: [
    '/pferd-kaufen/oesterreich',
  ],
  CH: [
    '/pferd-kaufen/schweiz',
  ],
} as const;

/**
 * Get the country that exclusively owns a page.
 * Returns null if the page is available on all domains.
 */
export function getExclusiveCountry(pathname: string): CountryCode | null {
  for (const [country, pages] of Object.entries(COUNTRY_EXCLUSIVE_PAGES)) {
    if (pages.some(page => pathname === page || pathname.startsWith(page + '/'))) {
      return country as CountryCode;
    }
  }
  return null;
}

/**
 * Check if a page should be blocked for a specific country.
 * Returns true if the page belongs to a different country.
 */
export function isPageBlockedForCountry(pathname: string, country: CountryCode): boolean {
  const exclusiveCountry = getExclusiveCountry(pathname);
  return exclusiveCountry !== null && exclusiveCountry !== country;
}

/**
 * Check if a path should be included in a country's sitemap.
 * Uses startsWith for consistency with middleware blocking.
 */
export function isPageAvailableForCountry(path: string, countryCode: CountryCode): boolean {
  for (const [exclusiveCountry, pages] of Object.entries(COUNTRY_EXCLUSIVE_PAGES)) {
    if (pages.some(page => path === page || path.startsWith(page + '/')) && exclusiveCountry !== countryCode) {
      return false;
    }
  }
  return true;
}

/**
 * Derived slug list for RatgeberHead hreflang checks.
 * Extracts the last path segment from each exclusive page.
 */
export const COUNTRY_EXCLUSIVE_SLUGS: readonly string[] = Object.values(COUNTRY_EXCLUSIVE_PAGES)
  .flat()
  .map(path => path.split('/').pop()!);

/**
 * All exclusive paths as a flat array (for quick lookups).
 */
export const ALL_EXCLUSIVE_PATHS: readonly string[] = Object.values(COUNTRY_EXCLUSIVE_PAGES).flat();

/**
 * ============================================================
 * NOTE: Two systems coexist for different purposes:
 *
 * 1. WHITELIST (COUNTRY_ALLOWED_PATHS) - Used by middleware
 *    AT/CH only allow 8 core pages, everything else redirects 301 to homepage
 *
 * 2. BLACKLIST (COUNTRY_EXCLUSIVE_PAGES) - Used by sitemap & hreflang
 *    Regional pages (e.g., /pferd-kaufen/bayern) only appear on their home domain
 * ============================================================
 */

/**
 * Whitelist: Pages allowed per country domain.
 * AT/CH only show core conversion pages + local SEO magnet.
 * Everything else redirects 301 to homepage.
 */
export const COUNTRY_ALLOWED_PATHS: Record<CountryCode, readonly string[]> = {
  DE: ['*'], // All pages allowed
  AT: [
    '/',
    '/pferde-preis-berechnen',
    '/pferd-kaufen/oesterreich', // Local SEO magnet (footer only)
    '/ueber-pferdewert',
    '/impressum',
    '/datenschutz',
    '/agb',
  ],
  CH: [
    '/',
    '/pferde-preis-berechnen',
    '/pferd-kaufen/schweiz', // Local SEO magnet (footer only)
    '/ueber-pferdewert',
    '/impressum',
    '/datenschutz',
    '/agb',
  ],
} as const;

/**
 * Check if a page is allowed for a specific country (whitelist approach).
 * Used by middleware to block all non-whitelisted pages on AT/CH.
 * Uses EXACT match - each allowed path must be explicitly listed.
 */
export function isPageAllowedForCountry(pathname: string, country: CountryCode): boolean {
  if (country === 'DE') return true;

  // Always allow system paths (API, assets, SSL verification)
  const systemPaths = ['/api', '/_next', '/images', '/favicon', '/fonts', '/.well-known'];
  if (systemPaths.some(p => pathname.startsWith(p))) return true;

  const allowed = COUNTRY_ALLOWED_PATHS[country];
  // EXACT match only - /pferd-kaufen does NOT allow /pferd-kaufen/haflinger
  return allowed.includes(pathname);
}
