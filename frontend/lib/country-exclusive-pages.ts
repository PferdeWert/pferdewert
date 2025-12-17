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
