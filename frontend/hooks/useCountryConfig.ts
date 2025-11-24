import { useMemo, useEffect, useState } from 'react';

interface CountryConfig {
  country: 'DE' | 'AT';
  locale: 'de' | 'de-AT';
  isAustria: boolean;
  domain: string;
  ausbildungOptions: string[];
  landOptions: Array<{ value: string; label: string }>;
  getLocalizedPath: (path: string) => string;
  getLocalizedUrl: (path: string) => string;
}

// FAST REFRESH FIX: Define static data at module level to prevent recreation
const LAND_OPTIONS = [
  { value: "DE", label: "Deutschland" },
  { value: "AT", label: "Österreich" }
];

const AUSBILDUNG_OPTIONS_AT = ["roh", "angeritten", "A", "L", "LP", "LM", "M", "S", "Sonstiges"];
const AUSBILDUNG_OPTIONS_DE = ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"];

// Domain configuration
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
} as const;

/**
 * Detect country from hostname
 * Works both server-side (via cookie from middleware) and client-side (via window.location)
 */
function detectCountryFromHost(): 'DE' | 'AT' {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.includes('pferdewert.at')) return 'AT';
    // Fallback: Check cookie set by middleware
    const cookieMatch = document.cookie.match(/x-country=(\w+)/);
    if (cookieMatch?.[1] === 'AT') return 'AT';
  }
  return 'DE';
}

/**
 * Custom hook for country-specific configuration
 * Detects locale from domain (primary) or cookie (fallback)
 *
 * NEW BEHAVIOR (Domain-based):
 * - pferdewert.de → DE config
 * - pferdewert.at → AT config
 * - No more /at/ path prefix needed on .at domain
 *
 * Usage:
 * const { country, locale, ausbildungOptions, landOptions } = useCountryConfig();
 */
export function useCountryConfig(): CountryConfig {
  // Initial detection (may be wrong during SSR, corrected on client)
  const [country, setCountry] = useState<'DE' | 'AT'>('DE');

  // Client-side: Detect from hostname
  useEffect(() => {
    setCountry(detectCountryFromHost());
  }, []);

  // FAST REFRESH FIX: Memoize config based on country to prevent recreation
  const config = useMemo(() => {
    const isAustria = country === 'AT';
    const locale = isAustria ? 'de-AT' : 'de';
    const domain = DOMAINS[country];

    return {
      country,
      locale: locale as 'de' | 'de-AT',
      isAustria,
      domain,

      // Ausbildungsstand: AT ohne E-Level, aber mit LP/LM Zwischenstufen
      // LP = L mit fliegenden Galoppwechseln (in DE/CH erst ab M)
      // LM = L mit Seitengängen (beim Springen bis 130cm)
      ausbildungOptions: isAustria ? AUSBILDUNG_OPTIONS_AT : AUSBILDUNG_OPTIONS_DE,

      // Land-Dropdown Options (ohne Flaggen - professioneller)
      landOptions: LAND_OPTIONS,

      // Helper: Localized path generator
      // NEW: On .at domain, paths stay clean (no /at/ prefix)
      // On .de domain, AT links point to pferdewert.at
      getLocalizedPath: (path: string): string => {
        // Clean the path (ensure leading slash)
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        // On AT domain or for AT users: no prefix needed
        // On DE domain: no prefix needed either
        // Cross-country links should use getLocalizedUrl() instead
        return cleanPath;
      },

      // Helper: Get full URL for cross-domain links
      // Usage: getLocalizedUrl('/pferde-preis-berechnen') → 'https://pferdewert.at/pferde-preis-berechnen'
      getLocalizedUrl: (path: string): string => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${domain}${cleanPath}`;
      }
    };
  }, [country]);

  return config;
}
