import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface HreflangTag {
  hreflang: string;
  href: string;
}

interface SEOConfig {
  canonical: string;
  hreflangTags: HreflangTag[];
  locale: 'de' | 'de-AT';
  isAustria: boolean;
  ogLocale: 'de_DE' | 'de_AT';
}

const DOMAIN = 'https://www.pferdewert.de';

/**
 * Custom hook for SEO configuration with hreflang support
 *
 * Generates canonical URL and hreflang tags for international pages
 * Prevents duplicate content issues between /page and /at/page
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

  const config = useMemo(() => {
    const pathname = router.asPath.split('?')[0]; // Remove query params
    const isAustria = pathname.startsWith('/at');
    const locale = isAustria ? 'de-AT' : 'de';

    // Get base path (remove /at prefix for Austrian version)
    const basePath = isAustria ? pathname.replace(/^\/at/, '') : pathname;

    // Generate URLs for both locales
    const deUrl = `${DOMAIN}${basePath}`;
    const atUrl = `${DOMAIN}/at${basePath}`;

    // Canonical always points to the current page (important!)
    const canonical = isAustria ? atUrl : deUrl;

    // Hreflang tags (tell Google about both versions)
    const hreflangTags: HreflangTag[] = [
      { hreflang: 'de', href: deUrl },           // German version
      { hreflang: 'de-AT', href: atUrl },        // Austrian version
      { hreflang: 'x-default', href: deUrl },    // Default fallback (use DE as default)
    ];

    return {
      canonical,
      hreflangTags,
      locale: locale as 'de' | 'de-AT',
      isAustria,
      ogLocale: isAustria ? 'de_AT' : 'de_DE',
    };
  }, [router.asPath]);

  return config;
}
