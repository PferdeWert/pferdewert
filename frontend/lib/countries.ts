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
 */
export function getAvailableCountries(): Country[] {
  return COUNTRIES.filter(c => c.enabled);
}

/**
 * Get country by URL path
 */
export function getCountryFromPath(pathname: string): Country {
  const country = COUNTRIES.find(c =>
    c.urlPrefix && pathname.startsWith(c.urlPrefix)
  );
  return country || COUNTRIES[0]; // Default to DE
}

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}
