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

const DOMAIN = 'https://pferdewert.de';

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

  // FIX: Use router.asPath to get actual browser URL (not rewritten internal path)
  // Next.js rewrites /at/* to /*, so router.pathname would always be / instead of /at
  // Extract pathname without query string and hash to avoid Fast Refresh issues
  const pathname = router.asPath.split('?')[0].split('#')[0];

  // FAST REFRESH FIX: Compute all values in ONE useMemo to prevent intermediate re-renders
  // Multiple useMemo calls can cause cascading updates
  const config = useMemo<SEOConfig>(() => {
    const isAustria = pathname.startsWith('/at');
    const locale = isAustria ? 'de-AT' : 'de';

    // Get base path (remove /at prefix for Austrian version)
    const basePath = isAustria ? pathname.replace(/^\/at/, '') : pathname;

    // Generate URLs for both locales
    const deUrl = `${DOMAIN}${basePath}`;
    const atUrl = `${DOMAIN}/at${basePath}`;

    // Canonical always points to the current page
    const canonical = isAustria ? atUrl : deUrl;

    // Hreflang tags (tell Google about both versions)
    const hreflangTags: HreflangTag[] = [
      { hreflang: 'de', href: deUrl },
      { hreflang: 'de-AT', href: atUrl },
      { hreflang: 'x-default', href: deUrl },
    ];

    const ogLocale = isAustria ? 'de_AT' : 'de_DE';

    return {
      canonical,
      hreflangTags,
      locale: locale as 'de' | 'de-AT',
      isAustria,
      ogLocale: ogLocale as 'de_DE' | 'de_AT',
    };
  }, [pathname]); // Only depend on pathname, which is stable

  return config;
}
