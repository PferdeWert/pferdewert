/**
 * Server-Side SEO Utilities
 *
 * CRITICAL: These functions run on the server and read the Host header
 * to determine the correct country/domain for canonical URLs.
 *
 * This fixes the SSR bug where `window` is undefined and country
 * always defaults to 'DE', causing Google to see wrong canonical URLs.
 */

import { GetServerSidePropsContext } from 'next';
import { getCountryFromDomain, Country, getAvailableCountries } from './countries';

export interface SEOServerProps {
  country: 'DE' | 'AT' | 'CH';
  canonical: string;
  domain: string;
  hreflangTags: Array<{ hreflang: string; href: string }>;
}

/**
 * Get country from request headers (server-side)
 * Reads the Host header to determine which domain the request came from
 */
export function getCountryFromRequest(context: GetServerSidePropsContext): Country {
  const host = context.req.headers.host || 'pferdewert.de';
  return getCountryFromDomain(host);
}

/**
 * Generate SEO props for a page (server-side)
 * Use this in getServerSideProps to get correct canonical URLs
 *
 * @param context - Next.js getServerSideProps context
 * @param pathname - The page path (e.g., '/' or '/pferde-preis-berechnen')
 * @returns SEO props including canonical URL and hreflang tags
 *
 * Usage:
 * ```tsx
 * export const getServerSideProps: GetServerSideProps = async (context) => {
 *   const seoProps = getSEOServerProps(context, '/');
 *   return { props: { seoProps } };
 * };
 * ```
 */
export function getSEOServerProps(
  context: GetServerSidePropsContext,
  pathname: string = '/'
): SEOServerProps {
  const country = getCountryFromRequest(context);
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  // Build URLs for all domains
  const availableCountries = getAvailableCountries();
  const urls = availableCountries.reduce((acc, c) => {
    acc[c.code] = `https://${c.domain}${cleanPath}`;
    return acc;
  }, {} as Record<string, string>);

  // Canonical points to current domain
  const canonical = `https://${country.domain}${cleanPath}`;

  // Hreflang tags for all enabled countries
  const hreflangTags = [
    ...availableCountries.map(c => ({
      hreflang: c.locale,
      href: `https://${c.domain}${cleanPath}`,
    })),
    { hreflang: 'x-default', href: urls['DE'] || canonical },
  ];

  return {
    country: country.code as 'DE' | 'AT' | 'CH',
    canonical,
    domain: country.domain,
    hreflangTags,
  };
}

/**
 * Helper to create getServerSideProps with SEO props
 * Wraps an existing getServerSideProps to add SEO data
 *
 * Usage:
 * ```tsx
 * export const getServerSideProps = withSEOProps('/pferde-preis-berechnen');
 *
 * // Or with additional props:
 * export const getServerSideProps = withSEOProps('/', async (context) => {
 *   return { additionalProp: 'value' };
 * });
 * ```
 */
export function withSEOProps<T extends Record<string, unknown> = Record<string, never>>(
  pathname: string,
  getAdditionalProps?: (context: GetServerSidePropsContext) => Promise<T> | T
) {
  return async (context: GetServerSidePropsContext) => {
    const seoProps = getSEOServerProps(context, pathname);
    const additionalProps = getAdditionalProps ? await getAdditionalProps(context) : ({} as T);

    return {
      props: {
        seoProps,
        ...additionalProps,
      },
    };
  };
}
