import { useRouter } from 'next/router';
import { useMemo, useEffect, useState } from 'react';

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

// Domain configuration for multi-country SEO
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
} as const;

/**
 * Detect country from hostname
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
 * Custom hook for SEO configuration with hreflang support
 *
 * NEW BEHAVIOR (Domain-based):
 * - pferdewert.de → canonical to .de, hreflang points to .at for AT version
 * - pferdewert.at → canonical to .at, hreflang points to .de for DE version
 *
 * Generates canonical URL and hreflang tags for international pages
 * Prevents duplicate content issues between domains
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
  const [country, setCountry] = useState<'DE' | 'AT'>('DE');

  // Client-side: Detect from hostname
  useEffect(() => {
    setCountry(detectCountryFromHost());
  }, []);

  // Extract pathname without query string and hash
  // Remove any /at/ prefix (for backwards compatibility during transition)
  const rawPathname = router.asPath.split('?')[0].split('#')[0];
  const pathname = rawPathname.replace(/^\/at/, '') || '/';

  // FAST REFRESH FIX: Compute all values in ONE useMemo to prevent intermediate re-renders
  const config = useMemo<SEOConfig>(() => {
    const isAustria = country === 'AT';
    const locale = isAustria ? 'de-AT' : 'de';

    // Generate URLs for both domains (clean paths, no /at/ prefix)
    const deUrl = `${DOMAINS.DE}${pathname}`;
    const atUrl = `${DOMAINS.AT}${pathname}`;

    // Canonical points to current domain
    const canonical = isAustria ? atUrl : deUrl;

    // Hreflang tags (tell Google about both domain versions)
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
  }, [pathname, country]);

  return config;
}
