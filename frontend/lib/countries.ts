/**
 * Central Country Configuration for International Rollout
 *
 * Currently: DE, AT
 * Planned: CH, NL, BE, LU
 */

export interface Country {
  code: 'DE' | 'AT' | 'CH' | 'NL' | 'BE' | 'LU';
  name: string;
  urlPrefix: string; // '' for default (DE), '/at', '/ch', etc.
  locale: string; // 'de', 'de-AT', 'de-CH', 'nl', etc.
  enabled: boolean; // Enable/disable countries for gradual rollout
}

export const COUNTRIES: Country[] = [
  {
    code: 'DE',
    name: 'Deutschland',
    urlPrefix: '',
    locale: 'de',
    enabled: true,
  },
  {
    code: 'AT',
    name: 'Österreich',
    urlPrefix: '/at',
    locale: 'de-AT',
    enabled: true,
  },
  // Future rollouts (disabled for now)
  {
    code: 'CH',
    name: 'Schweiz',
    urlPrefix: '/ch',
    locale: 'de-CH',
    enabled: false, // TODO: Enable when ready
  },
  {
    code: 'NL',
    name: 'Niederlande',
    urlPrefix: '/nl',
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
 * Get country by URL path
 * Matches longest prefix first to prevent /at matching /austria
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
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}
