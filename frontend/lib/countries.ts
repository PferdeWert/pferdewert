/**
 * Central Country Configuration for International Rollout
 *
 * NEW: Domain-based localization (Nov 2025)
 * - Each country has its own domain (pferdewert.de, pferdewert.at, pferdewert.ch)
 * - No more path prefixes like /at/
 * - Clean URLs for better SEO
 *
 * Currently: DE, AT
 * Planned: CH, NL, BE, LU
 */

export interface Country {
  code: 'DE' | 'AT' | 'CH' | 'NL' | 'BE' | 'LU';
  name: string;
  domain: string; // Full domain: 'pferdewert.de', 'pferdewert.at', etc.
  urlPrefix: string; // DEPRECATED: kept for backwards compatibility, use domain instead
  locale: string; // 'de', 'de-AT', 'de-CH', 'nl', etc.
  enabled: boolean; // Enable/disable countries for gradual rollout
}

export const COUNTRIES: Country[] = [
  {
    code: 'DE',
    name: 'Deutschland',
    domain: 'pferdewert.de',
    urlPrefix: '', // DEPRECATED
    locale: 'de',
    enabled: true,
  },
  {
    code: 'AT',
    name: 'Österreich',
    domain: 'pferdewert.at',
    urlPrefix: '/at', // DEPRECATED
    locale: 'de-AT',
    enabled: true,
  },
  {
    code: 'CH',
    name: 'Schweiz',
    domain: 'pferdewert.ch',
    urlPrefix: '/ch', // DEPRECATED
    locale: 'de-CH',
    enabled: true, // Enabled Nov 2025
  },
  // Future rollouts (disabled for now)
  {
    code: 'NL',
    name: 'Niederlande',
    domain: 'pferdewert.nl',
    urlPrefix: '/nl', // DEPRECATED
    locale: 'nl',
    enabled: false, // TODO: Enable when ready
  },
];

/**
 * Get only enabled countries for display
 * FAST REFRESH FIX: Cache the filtered array to prevent new array creation on every call
 * Without caching, each call creates a new array reference causing Fast Refresh loops
 */
let availableCountriesCache: Country[] | null = null;

export function getAvailableCountries(): Country[] {
  if (!availableCountriesCache) {
    availableCountriesCache = COUNTRIES.filter(c => c.enabled);
  }
  return availableCountriesCache;
}

/**
 * FAST REFRESH FIX: Cache sorted countries array to prevent recreation on every call
 * Without caching, each call creates new arrays causing Fast Refresh loops
 */
let sortedCountriesCache: Country[] | null = null;

export function getSortedCountries(): Country[] {
  if (!sortedCountriesCache) {
    sortedCountriesCache = [...COUNTRIES]
      .filter(c => c.urlPrefix !== '') // Exclude default (DE)
      .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length);
  }
  return sortedCountriesCache;
}

/**
 * Get country by URL path (DEPRECATED - use getCountryFromDomain instead)
 * Matches longest prefix first to prevent /at matching /austria
 * Kept for backwards compatibility during transition
 */
export function getCountryFromPath(pathname: string): Country {
  // Get cached sorted countries
  const sortedCountries = getSortedCountries();

  // Check for specific country prefixes
  for (const country of sortedCountries) {
    // Match exact prefix with word boundary (/ or end of string)
    if (pathname === country.urlPrefix || pathname.startsWith(country.urlPrefix + '/')) {
      return country;
    }
  }

  // Default to DE (first country with empty prefix)
  return COUNTRIES[0];
}

/**
 * Get country from hostname/domain
 * NEW: Primary method for domain-based localization
 *
 * @param hostname - e.g., 'pferdewert.at', 'www.pferdewert.de', 'localhost'
 * @returns Country object
 */
export function getCountryFromDomain(hostname: string): Country {
  // Remove www. prefix for matching
  const cleanHost = hostname.replace(/^www\./, '');

  // Find matching country by domain
  for (const country of COUNTRIES) {
    if (cleanHost === country.domain || cleanHost.endsWith(`.${country.domain}`)) {
      return country;
    }
  }

  // Default to DE
  return COUNTRIES[0];
}

/**
 * Get current country from browser context
 * Works client-side only, returns DE on server
 */
export function getCurrentCountry(): Country {
  if (typeof window === 'undefined') {
    return COUNTRIES[0]; // DE default for SSR
  }

  // Try domain detection first (new system)
  const hostname = window.location.hostname;
  const countryFromDomain = getCountryFromDomain(hostname);

  // If not on a known domain (e.g., localhost), check cookie
  if (countryFromDomain.code === 'DE' && !hostname.includes('pferdewert')) {
    const cookieMatch = document.cookie.match(/(?:^|;\s*)x-country=(\w+)/);
    if (cookieMatch?.[1]) {
      const countryFromCookie = getCountryByCode(cookieMatch[1]);
      if (countryFromCookie) return countryFromCookie;
    }
  }

  return countryFromDomain;
}

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

/**
 * Build full URL for a country
 * @param country - Target country
 * @param path - Path without domain (e.g., '/pferde-preis-berechnen')
 * @returns Full URL (e.g., 'https://pferdewert.at/pferde-preis-berechnen')
 */
export function buildCountryUrl(country: Country, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://${country.domain}${cleanPath}`;
}

/**
 * Get allowed hostnames for DataFa.st cross-domain tracking
 * Returns comma-separated list of non-primary domains (excludes pferdewert.de)
 * Used for data-allowed-hostnames attribute in DataFa.st script
 *
 * FAST REFRESH FIX: Cache result to prevent new string creation on every call
 *
 * @returns Comma-separated hostnames (e.g., 'pferdewert.at,pferdewert.ch')
 */
let dataFastHostnamesCache: string | null = null;

export function getDataFastAllowedHostnames(): string {
  if (!dataFastHostnamesCache) {
    dataFastHostnamesCache = getAvailableCountries()
      .filter(c => c.domain !== 'pferdewert.de') // Primary domain excluded
      .map(c => c.domain)
      .join(',');
  }
  return dataFastHostnamesCache;
}
