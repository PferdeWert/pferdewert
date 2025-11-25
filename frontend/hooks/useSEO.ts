import { useRouter } from 'next/router';
import { useMemo, useEffect, useState } from 'react';

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
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',
} as const;

/**
 * Detect country from hostname or cookie
 */
function detectCountryFromHost(): 'DE' | 'AT' | 'CH' {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.includes('pferdewert.ch')) return 'CH';
    if (host.includes('pferdewert.at')) return 'AT';
    // Fallback: Check cookie set by middleware (handles whitespace)
    const cookieMatch = document.cookie.match(/(?:^|;\s*)x-country=(\w+)/);
    if (cookieMatch?.[1] === 'CH') return 'CH';
    if (cookieMatch?.[1] === 'AT') return 'AT';
  }
  return 'DE';
}

/**
 * Get initial country - runs immediately to prevent hydration mismatch
 */
function getInitialCountry(): 'DE' | 'AT' | 'CH' {
  if (typeof window !== 'undefined') {
    return detectCountryFromHost();
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

  // HYDRATION FIX: Initialize with detected country to prevent flash
  const [country, setCountry] = useState<'DE' | 'AT' | 'CH'>(getInitialCountry);

  // Client-side: Sync if country changes (e.g., user switches domain mid-session)
  useEffect(() => {
    const detected = detectCountryFromHost();
    if (detected !== country) {
      setCountry(detected);
    }
  }, [country]);

  // Extract pathname without query string and hash
  // Remove any /at/ or /ch/ prefix (for backwards compatibility during transition)
  const rawPathname = router.asPath.split('?')[0].split('#')[0];
  const pathname = rawPathname.replace(/^\/(at|ch)/, '') || '/';

  // FAST REFRESH FIX: Compute all values in ONE useMemo to prevent intermediate re-renders
  const config = useMemo<SEOConfig>(() => {
    const isAustria = country === 'AT';
    const isSwitzerland = country === 'CH';
    const locale = isSwitzerland ? 'de-CH' : (isAustria ? 'de-AT' : 'de');

    // Generate URLs for all domains (clean paths, no /at/ or /ch/ prefix)
    const deUrl = `${DOMAINS.DE}${pathname}`;
    const atUrl = `${DOMAINS.AT}${pathname}`;
    const chUrl = `${DOMAINS.CH}${pathname}`;

    // Canonical points to current domain
    const canonical = isSwitzerland ? chUrl : (isAustria ? atUrl : deUrl);

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
  }, [pathname, country]);

  return config;
}
