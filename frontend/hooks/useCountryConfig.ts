import { useState, useEffect, useMemo } from 'react';

interface CountryConfig {
  country: 'DE' | 'AT';
  locale: 'de' | 'de-AT';
  ausbildungOptions: string[];
  landOptions: Array<{ value: string; label: string }>;
}

/**
 * Custom hook for country-specific configuration
 * Detects locale from URL and returns country-specific options
 *
 * Usage:
 * const { country, locale, ausbildungOptions, landOptions } = useCountryConfig();
 */
export function useCountryConfig(): CountryConfig {
  const [isAustria, setIsAustria] = useState(false);

  // Client-side only locale detection to avoid hydration mismatch
  useEffect(() => {
    const pathname = window.location.pathname;
    setIsAustria(pathname.startsWith('/at'));
  }, []);

  const config = useMemo(() => {
    const locale = isAustria ? 'de-AT' : 'de';
    const country = isAustria ? 'AT' : 'DE';

    return {
      country: country as 'DE' | 'AT',
      locale: locale as 'de' | 'de-AT',

      // Ausbildungsstand: AT ohne E-Level, aber mit LP/LM Zwischenstufen
      // LP = L mit fliegenden Galoppwechseln (in DE/CH erst ab M)
      // LM = L mit Seitengängen (beim Springen bis 130cm)
      ausbildungOptions: isAustria
        ? ["roh", "angeritten", "A", "L", "LP", "LM", "M", "S", "Sonstiges"]
        : ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"],

      // Land-Dropdown Options (für zukünftiges Formular-Feld)
      landOptions: [
        { value: "DE", label: "Deutschland 🇩🇪" },
        { value: "AT", label: "Österreich 🇦🇹" }
      ]
    };
  }, [isAustria]);

  return config;
}
