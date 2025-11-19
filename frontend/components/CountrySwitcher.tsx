import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import { getAvailableCountries, getCountryFromPath } from '@/lib/countries';
import { useMemo } from 'react';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const globeIconSmall = <Globe className="w-4 h-4" />;
const globeIconDesktop = <Globe className="w-4 h-4 text-gray-600" />;

interface CountrySwitcherProps {
  variant?: 'mobile' | 'desktop';
  onCountryChange?: () => void; // Callback to close mobile menu
}

/**
 * Country Switcher Component
 *
 * Best Practices 2025:
 * - Globe icon (not flags - language ≠ country, political issues)
 * - Non-modal approach (better UX)
 * - User control (no auto-redirect)
 * - Scalable for future countries (CH, NL, BE, LU)
 */
export default function CountrySwitcher({ variant = 'mobile', onCountryChange }: CountrySwitcherProps) {
  const router = useRouter();
  const availableCountries = getAvailableCountries();

  // Memoize current country to prevent Fast Refresh issues
  const currentCountry = useMemo(() =>
    getCountryFromPath(router.pathname),
    [router.pathname]
  );

  const handleCountrySwitch = (targetUrlPrefix: string) => {
    const { pathname, query } = router;

    // Remove current country prefix (if any)
    let newPath = pathname;
    for (const country of availableCountries) {
      if (country.urlPrefix && newPath.startsWith(country.urlPrefix)) {
        newPath = newPath.replace(country.urlPrefix, '');
        break;
      }
    }

    // Add new country prefix
    const finalPath = targetUrlPrefix ? `${targetUrlPrefix}${newPath}` : newPath;

    // Navigate to new locale
    router.push({ pathname: finalPath, query }, undefined, { shallow: false });

    // Close mobile menu if callback provided
    onCountryChange?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {globeIconSmall}
            <span className="font-medium">Land:</span>
          </div>
        </div>

        {/* Pill-Style Toggle (modern, touch-friendly) */}
        <div className="flex space-x-2">
          {availableCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySwitch(country.urlPrefix)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                currentCountry.code === country.code
                  ? 'bg-brand-brown text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-brand-brown hover:text-brand-brown'
              }`}
              aria-label={`Wechseln zu ${country.name}`}
              aria-current={currentCountry.code === country.code ? 'true' : 'false'}
            >
              {country.code}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="flex items-center space-x-2">
      {globeIconDesktop}
      <div className="flex items-center space-x-1">
        {availableCountries.map((country, index) => (
          <div key={country.code} className="flex items-center">
            <button
              onClick={() => handleCountrySwitch(country.urlPrefix)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentCountry.code === country.code
                  ? 'text-brand-brown underline underline-offset-4'
                  : 'text-gray-600 hover:text-brand-brown'
              }`}
              aria-label={`Wechseln zu ${country.name}`}
              aria-current={currentCountry.code === country.code ? 'true' : 'false'}
            >
              {country.code}
            </button>
            {index < availableCountries.length - 1 && (
              <span className="text-gray-400 mx-1">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
