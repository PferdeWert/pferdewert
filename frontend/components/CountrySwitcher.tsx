import { useRouter } from 'next/router';
import { Globe, ChevronDown } from 'lucide-react';
import { getAvailableCountries, getCountryFromPath } from '@/lib/countries';
import { useMemo, useState, useRef, useEffect } from 'react';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const globeIcon = <Globe className="w-4 h-4" />;
const chevronIcon = <ChevronDown className="w-3 h-3" />;

interface CountrySwitcherProps {
  variant?: 'mobile' | 'desktop';
}

/**
 * Country Switcher Component - Scalable Dropdown
 *
 * Best Practices 2025:
 * - Globe icon (not flags - language ≠ country, political issues)
 * - Dropdown approach (scalable for 4+ countries)
 * - User control (no auto-redirect)
 * - Scalable for future countries (CH, NL, BE, LU)
 */
export default function CountrySwitcher({ variant = 'desktop' }: CountrySwitcherProps) {
  const router = useRouter();
  const availableCountries = getAvailableCountries();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdown
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Mobile Trigger - Compact */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1.5 text-gray-700 hover:text-brand-brown transition-colors"
          aria-label="Land wählen"
          aria-expanded={isOpen}
        >
          {globeIcon}
          <span className="text-xs font-medium">{currentCountry.code}</span>
          {chevronIcon}
        </button>

        {/* Mobile Dropdown - Bottom Sheet Style */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-[60] transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu - Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[70] pb-6 pt-3 animate-slide-up">
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="px-6 mb-5">
                <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                  {globeIcon}
                  <span>Land wählen</span>
                </h3>
              </div>

              {/* Country Buttons - Large Touch Targets */}
              <div className="px-6 space-y-3 pb-2">
                {availableCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySwitch(country.urlPrefix)}
                    className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all shadow-sm ${
                      currentCountry.code === country.code
                        ? 'bg-brand-brown text-white shadow-md scale-[1.02]'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-brand-brown hover:bg-amber-50 active:scale-[0.98]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{country.name}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        currentCountry.code === country.code
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {country.code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop variant - Dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 px-3 py-2 text-gray-700 hover:text-brand-brown transition-colors rounded-md hover:bg-gray-50"
        aria-label="Land wählen"
        aria-expanded={isOpen}
      >
        {globeIcon}
        <span className="text-sm font-medium">{currentCountry.code}</span>
        {chevronIcon}
      </button>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {availableCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySwitch(country.urlPrefix)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                currentCountry.code === country.code
                  ? 'bg-amber-50 text-brand-brown font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-brown'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{country.name}</span>
                <span className="text-xs opacity-75">{country.code}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
