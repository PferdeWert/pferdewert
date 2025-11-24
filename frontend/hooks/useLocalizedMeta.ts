import { useMemo } from 'react';
import { useCountryConfig } from './useCountryConfig';

interface LocalizedMetaConfig {
  // Country-specific content
  countryName: string;
  countryNameShort: string;
  geoRegion: string;
  currency: string;

  // Domain for URLs
  domain: string;

  // Helper to localize text with country name
  localize: (deText: string, atText?: string) => string;

  // Helper to create country-specific meta description
  localizeDescription: (baseDescription: string) => string;
}

/**
 * Hook for localized meta tags and content
 *
 * Usage:
 * ```tsx
 * const { countryName, geoRegion, localize } = useLocalizedMeta();
 *
 * <title>{localize(
 *   'Pferdebewertung Deutschland | PferdeWert.de',
 *   'Pferdebewertung Österreich | PferdeWert.at'
 * )}</title>
 * ```
 */
export function useLocalizedMeta(): LocalizedMetaConfig {
  const { country, domain } = useCountryConfig();

  const config = useMemo(() => {
    const isAustria = country === 'AT';

    return {
      countryName: isAustria ? 'Österreich' : 'Deutschland',
      countryNameShort: country,
      geoRegion: country,
      currency: 'EUR',
      domain,

      // Helper: Return appropriate text based on country
      localize: (deText: string, atText?: string): string => {
        if (!atText) return deText;
        return isAustria ? atText : deText;
      },

      // Helper: Append country name to description if it contains region placeholder
      localizeDescription: (baseDescription: string): string => {
        const countryName = isAustria ? 'Österreich' : 'Deutschland';
        // Replace {country} placeholder or append country if not present
        if (baseDescription.includes('{country}')) {
          return baseDescription.replace('{country}', countryName);
        }
        return baseDescription;
      },
    };
  }, [country, domain]);

  return config;
}

// Pre-defined localized meta content for main pages
export const LOCALIZED_META = {
  homepage: {
    title: {
      DE: 'Was ist mein Pferd wert? KI-Pferdebewertung | PferdeWert.de',
      AT: 'Was ist mein Pferd wert? KI-Pferdebewertung Österreich | PferdeWert.at',
    },
    description: {
      DE: 'Wie viel ist mein Pferd wert? Professionelle KI-Pferdebewertung basierend auf aktuellen Marktdaten. Präzise Marktwert-Einschätzung in 2 Minuten.',
      AT: 'Wie viel ist mein Pferd wert? Professionelle KI-Pferdebewertung für Österreich basierend auf aktuellen Marktdaten. Präzise Marktwert-Einschätzung in 2 Minuten.',
    },
    geoPlacename: {
      DE: 'Deutschland',
      AT: 'Österreich',
    },
  },
  bewertung: {
    title: {
      DE: 'Pferdewert berechnen - Online Pferdebewertung | PferdeWert.de',
      AT: 'Pferdewert berechnen - Online Pferdebewertung Österreich | PferdeWert.at',
    },
    description: {
      DE: 'Berechne den Wert deines Pferdes mit unserer KI-Bewertung. Basierend auf aktuellen deutschen Marktdaten - präzise und schnell.',
      AT: 'Berechne den Wert deines Pferdes mit unserer KI-Bewertung. Basierend auf aktuellen österreichischen Marktdaten - präzise und schnell.',
    },
  },
} as const;
