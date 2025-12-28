import { useMemo } from 'react';
import { useRouter } from 'next/compat/router';

interface CountryConfig {
  country: 'DE' | 'AT' | 'CH';
  locale: 'de' | 'de-AT' | 'de-CH';
  isAustria: boolean;
  isSwitzerland: boolean;
  domain: string;
  currency: 'EUR' | 'CHF';
  currencySymbol: string;
  ausbildungOptions: string[];
  landOptions: Array<{ value: string; label: string }>;
  getLocalizedPath: (path: string) => string;
  getLocalizedUrl: (path: string) => string;
}

// FAST REFRESH FIX: Define static data at module level to prevent recreation
const LAND_OPTIONS = [
  { value: "DE", label: "Deutschland" },
  { value: "AT", label: "Österreich" },
  { value: "CH", label: "Schweiz" }
];

const AUSBILDUNG_OPTIONS_AT = ["roh", "angeritten", "A", "L", "LP", "LM", "M", "S", "Sonstiges"];
const AUSBILDUNG_OPTIONS_DE = ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"];
// CH: Kein E-Level, keine LP/LM Zwischenstufen (einfacher als AT)
const AUSBILDUNG_OPTIONS_CH = ["roh", "angeritten", "A", "L", "M", "S", "Sonstiges"];

// Domain configuration
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',
} as const;

// Map Next.js i18n locale to country code
const LOCALE_TO_COUNTRY: Record<string, 'DE' | 'AT' | 'CH'> = {
  'de': 'DE',
  'de-AT': 'AT',
  'de-CH': 'CH',
};

/**
 * Custom hook for country-specific configuration
 *
 * SSR-SAFE: Uses Next.js router.locale which is set correctly on both
 * server and client via i18n domain routing (next.config.js).
 *
 * This fixes the bug where Schema.org data showed pferdewert.de on .ch/.at domains.
 *
 * Usage:
 * const { country, locale, ausbildungOptions, landOptions } = useCountryConfig();
 */
export function useCountryConfig(): CountryConfig {
  // next/compat/router returns null if router is not mounted yet
  const router = useRouter();

  // SSR-SAFE: Next.js i18n domain routing sets router.locale correctly on server AND client
  // This is configured in next.config.js with domain-based locale detection
  // Fallback to 'de' if router is not yet mounted (edge case during initial render)
  const country = LOCALE_TO_COUNTRY[router?.locale || 'de'] || 'DE';

  // FAST REFRESH FIX: Memoize config based on country to prevent recreation
  const config = useMemo(() => {
    const isAustria = country === 'AT';
    const isSwitzerland = country === 'CH';
    const locale = isSwitzerland ? 'de-CH' : (isAustria ? 'de-AT' : 'de');
    const domain = DOMAINS[country];
    const currency: 'EUR' | 'CHF' = isSwitzerland ? 'CHF' : 'EUR';
    const currencySymbol = isSwitzerland ? 'CHF' : '€';

    // Determine Ausbildung options based on country
    let ausbildungOptions: string[];
    if (isSwitzerland) {
      ausbildungOptions = AUSBILDUNG_OPTIONS_CH;
    } else if (isAustria) {
      ausbildungOptions = AUSBILDUNG_OPTIONS_AT;
    } else {
      ausbildungOptions = AUSBILDUNG_OPTIONS_DE;
    }

    return {
      country,
      locale: locale as 'de' | 'de-AT' | 'de-CH',
      isAustria,
      isSwitzerland,
      domain,
      currency,
      currencySymbol,

      // Ausbildungsstand: AT ohne E-Level, aber mit LP/LM Zwischenstufen
      // LP = L mit fliegenden Galoppwechseln (in DE/CH erst ab M)
      // LM = L mit Seitengängen (beim Springen bis 130cm)
      // CH: Kein E-Level, keine LP/LM Zwischenstufen (einfacher als AT)
      ausbildungOptions,

      // Land-Dropdown Options (ohne Flaggen - professioneller)
      landOptions: LAND_OPTIONS,

      // Helper: Localized path generator
      // NEW: On .at/.ch domain, paths stay clean (no /at/ or /ch/ prefix)
      // On .de domain, AT/CH links point to pferdewert.at/ch
      getLocalizedPath: (path: string): string => {
        // Clean the path (ensure leading slash)
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        // On AT/CH domain or for AT/CH users: no prefix needed
        // On DE domain: no prefix needed either
        // Cross-country links should use getLocalizedUrl() instead
        return cleanPath;
      },

      // Helper: Get full URL for cross-domain links
      // Usage: getLocalizedUrl('/pferde-preis-berechnen') → 'https://pferdewert.ch/pferde-preis-berechnen'
      getLocalizedUrl: (path: string): string => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${domain}${cleanPath}`;
      }
    };
  }, [country]);

  return config;
}
