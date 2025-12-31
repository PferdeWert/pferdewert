/**
 * useSEOHreflang Hook
 *
 * Generates hreflang tags for multi-country SEO (DE, AT, CH)
 * Used in Ratgeber articles to signal to Google that the same content
 * exists on different domains for different countries.
 *
 * CRITICAL: Only use for articles with IDENTICAL content across domains.
 * For country-specific articles (e.g., "pferd-kaufen-schweiz"), do NOT use hreflang.
 *
 * Usage in Ratgeber articles:
 * ```tsx
 * import useSEOHreflang from '@/hooks/useSEOHreflang';
 *
 * export default function DressurpferdKaufen() {
 *   const hreflangTags = useSEOHreflang('/pferd-kaufen/dressurpferd');
 *
 *   return (
 *     <Layout>
 *       <Head>
 *         <title>...</title>
 *         {hreflangTags}
 *       </Head>
 *       ...
 *     </Layout>
 *   );
 * }
 * ```
 */

import { useRouter } from 'next/router';
import { getAvailableCountries } from '@/lib/countries';
import { isPageAllowedForCountry, type CountryCode } from '@/lib/country-exclusive-pages';

export interface HreflangTag {
  hreflang: string;
  href: string;
}

// Map locale to country code for whitelist check
const LOCALE_TO_COUNTRY: Record<string, CountryCode> = {
  'de': 'DE',
  'de-AT': 'AT',
  'de-CH': 'CH',
};

/**
 * Generate hreflang link tags for a given path
 *
 * @param path - The path without domain (e.g., '/pferd-kaufen/dressurpferd')
 * @returns React elements with hreflang link tags
 *
 * IMPORTANT: Only generates hreflang for countries where the page is actually
 * accessible. Pages not on AT/CH whitelist will NOT get AT/CH hreflang tags,
 * preventing "hreflang to redirect" errors in search console.
 */
export default function useSEOHreflang(path: string) {
  const countries = getAvailableCountries();

  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Generate hreflang data ONLY for countries where page is actually accessible
  // This prevents hreflang pointing to pages that redirect on AT/CH
  const hreflangData: HreflangTag[] = countries
    .filter(country => {
      const countryCode = LOCALE_TO_COUNTRY[country.locale];
      return countryCode && isPageAllowedForCountry(cleanPath, countryCode);
    })
    .map(country => ({
      hreflang: country.locale,
      href: `https://${country.domain}${cleanPath}`
    }));

  // Add x-default (points to DE) - always include since DE allows all pages
  const defaultCountry = countries.find(c => c.code === 'DE');
  if (defaultCountry) {
    hreflangData.push({
      hreflang: 'x-default',
      href: `https://${defaultCountry.domain}${cleanPath}`
    });
  }

  // Return JSX elements
  return (
    <>
      {hreflangData.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
    </>
  );
}

/**
 * FAST REFRESH FIX: Alternative version that returns data instead of JSX
 * Use this if you need to avoid inline JSX creation in component props
 *
 * IMPORTANT: Only generates hreflang for countries where the page is actually
 * accessible (checks whitelist).
 */
export function useHreflangData(path: string): HreflangTag[] {
  const countries = getAvailableCountries();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Filter to only countries where page is accessible
  const hreflangData: HreflangTag[] = countries
    .filter(country => {
      const countryCode = LOCALE_TO_COUNTRY[country.locale];
      return countryCode && isPageAllowedForCountry(cleanPath, countryCode);
    })
    .map(country => ({
      hreflang: country.locale,
      href: `https://${country.domain}${cleanPath}`
    }));

  // Add x-default (always points to DE)
  const defaultCountry = countries.find(c => c.code === 'DE');
  if (defaultCountry) {
    hreflangData.push({
      hreflang: 'x-default',
      href: `https://${defaultCountry.domain}${cleanPath}`
    });
  }

  return hreflangData;
}

// Domain mapping per Next.js i18n locale
const LOCALE_TO_DOMAIN: Record<string, string> = {
  'de': 'pferdewert.de',
  'de-AT': 'pferdewert.at',
  'de-CH': 'pferdewert.ch',
} as const;

/**
 * Get canonical URL for current domain
 * Uses useRouter().locale for SSR-safe domain detection
 *
 * @param path - The path without domain (e.g., '/pferd-kaufen/dressurpferd')
 * @returns Canonical URL for the current domain
 *
 * Usage:
 * ```tsx
 * const canonicalUrl = useCanonicalUrl('/pferd-kaufen/dressurpferd');
 * // On pferdewert.de → https://pferdewert.de/pferd-kaufen/dressurpferd
 * // On pferdewert.at → https://pferdewert.at/pferd-kaufen/dressurpferd
 * // On pferdewert.ch → https://pferdewert.ch/pferd-kaufen/dressurpferd
 * ```
 *
 * CRITICAL: Uses useRouter().locale instead of getCurrentCountry() to ensure
 * correct canonical URL during SSR. This fixes Google indexing issues where
 * .at/.ch pages were showing .de canonical URLs.
 */
export function useCanonicalUrl(path: string): string {
  const { locale } = useRouter();
  const domain = LOCALE_TO_DOMAIN[locale || 'de'] || 'pferdewert.de';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://${domain}${cleanPath}`;
}
