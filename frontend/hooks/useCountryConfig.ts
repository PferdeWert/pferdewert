import { useMemo } from 'react';
import { useRouter } from 'next/router';

interface CountryConfig {
  country: 'DE' | 'AT';
  locale: 'de' | 'de-AT';
  ausbildungOptions: string[];
  landOptions: Array<{ value: string; label: string }>;
  getLocalizedPath: (path: string) => string;
}

// FAST REFRESH FIX: Define static data at module level to prevent recreation
const LAND_OPTIONS = [
  { value: "DE", label: "Deutschland" },
  { value: "AT", label: "Österreich" }
];

const AUSBILDUNG_OPTIONS_AT = ["roh", "angeritten", "A", "L", "LP", "LM", "M", "S", "Sonstiges"];
const AUSBILDUNG_OPTIONS_DE = ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"];

/**
 * Custom hook for country-specific configuration
 * Detects locale from URL and returns country-specific options
 *
 * Usage:
 * const { country, locale, ausbildungOptions, landOptions } = useCountryConfig();
 */
export function useCountryConfig(): CountryConfig {
  const router = useRouter();

  // FIX: Use router.asPath to get actual browser URL (not rewritten internal path)
  // Next.js rewrites /at/* to /*, so router.pathname would always be / instead of /at
  // Extract pathname without query string and hash
  const pathname = router.asPath.split('?')[0].split('#')[0];
  const isAustria = pathname.startsWith('/at');

  // FAST REFRESH FIX: Memoize config based on pathname to prevent recreation
  const config = useMemo(() => {
    const locale = isAustria ? 'de-AT' : 'de';
    const country = isAustria ? 'AT' : 'DE';

    return {
      country: country as 'DE' | 'AT',
      locale: locale as 'de' | 'de-AT',

      // Ausbildungsstand: AT ohne E-Level, aber mit LP/LM Zwischenstufen
      // LP = L mit fliegenden Galoppwechseln (in DE/CH erst ab M)
      // LM = L mit Seitengängen (beim Springen bis 130cm)
      ausbildungOptions: isAustria ? AUSBILDUNG_OPTIONS_AT : AUSBILDUNG_OPTIONS_DE,

      // Land-Dropdown Options (ohne Flaggen - professioneller)
      landOptions: LAND_OPTIONS,

      // Helper: Localized path generator
      // Automatically adds /at/ prefix for Austrian version
      // Usage: getLocalizedPath('/pferde-preis-berechnen') → '/at/pferde-preis-berechnen' (AT) or '/pferde-preis-berechnen' (DE)
      getLocalizedPath: (path: string): string => {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        // Add /at prefix for Austria, keep as-is for Germany
        return isAustria ? `/at${cleanPath}` : cleanPath;
      }
    };
  }, [isAustria]); // Only recompute when locale changes (isAustria derived from pathname)

  return config;
}
