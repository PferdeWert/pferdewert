import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface HreflangTag {
  hreflang: string;
  href: string;
}

interface SEOConfig {
  canonical: string;
  hreflangTags: HreflangTag[];
  locale: 'de' | 'de-AT' | 'de-CH';
  isAustria: boolean;
  isSwitzerland: boolean;
  ogLocale: 'de_DE' | 'de_AT' | 'de_CH';
}

// Domain configuration for multi-country SEO
const DOMAINS = {
  'de': 'https://pferdewert.de',
  'de-AT': 'https://pferdewert.at',
  'de-CH': 'https://pferdewert.ch',
} as const;

type Locale = keyof typeof DOMAINS;

/**
 * Custom hook for SEO configuration with hreflang support
 *
 * UPDATED 2025-12-14: Now uses Next.js i18n domain routing
 * The locale is automatically detected from the domain via next.config.js i18n settings
 * This fixes the SSR bug where canonical always pointed to pferdewert.de
 *
 * Usage:
 * ```tsx
 * const { canonical, hreflangTags } = useSEO();
 *
 * <Head>
 *   <link rel="canonical" href={canonical} />
 *   {hreflangTags.map(tag => (
 *     <link key={tag.hreflang} rel="alternate" hreflang={tag.hreflang} href={tag.href} />
 *   ))}
 * </Head>
 * ```
 */
export function useSEO(): SEOConfig {
  const router = useRouter();

  // Next.js i18n provides the locale based on domain (configured in next.config.js)
  // This works correctly on both server and client!
  const locale = (router.locale as Locale) || 'de';

  // Extract pathname without query string and hash
  // Remove any /at/ or /ch/ prefix (for backwards compatibility during transition)
  const rawPathname = router.asPath.split('?')[0].split('#')[0];
  const pathname = rawPathname.replace(/^\/(at|ch)/, '') || '/';

  // Compute all values in ONE useMemo to prevent intermediate re-renders
  const config = useMemo<SEOConfig>(() => {
    const isAustria = locale === 'de-AT';
    const isSwitzerland = locale === 'de-CH';

    // Generate URLs for all domains (clean paths, no /at/ or /ch/ prefix)
    const deUrl = `${DOMAINS['de']}${pathname}`;
    const atUrl = `${DOMAINS['de-AT']}${pathname}`;
    const chUrl = `${DOMAINS['de-CH']}${pathname}`;

    // Canonical points to current domain based on locale
    const domain = DOMAINS[locale] || DOMAINS['de'];
    const canonical = `${domain}${pathname}`;

    // Hreflang tags (tell Google about all domain versions)
    const hreflangTags: HreflangTag[] = [
      { hreflang: 'de', href: deUrl },
      { hreflang: 'de-AT', href: atUrl },
      { hreflang: 'de-CH', href: chUrl },
      { hreflang: 'x-default', href: deUrl },
    ];

    const ogLocale = isSwitzerland ? 'de_CH' : (isAustria ? 'de_AT' : 'de_DE');

    return {
      canonical,
      hreflangTags,
      locale: locale as 'de' | 'de-AT' | 'de-CH',
      isAustria,
      isSwitzerland,
      ogLocale: ogLocale as 'de_DE' | 'de_AT' | 'de_CH',
    };
  }, [pathname, locale]);

  return config;
}
