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
  const [currentPath, setCurrentPath] = useState('');

  // Update current path on client side (to detect /at/ prefix)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, [router.asPath]); // Update when URL changes

  // Memoize current country to prevent Fast Refresh issues
  const currentCountry = useMemo(() =>
    getCountryFromPath(currentPath),
    [currentPath]
  );

  const handleCountrySwitch = (targetUrlPrefix: string) => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    // Remove ALL possible country prefixes from current path
    let basePath = currentPath;
    const allCountries = getAvailableCountries();

    for (const country of allCountries) {
      if (country.urlPrefix && basePath.startsWith(country.urlPrefix)) {
        basePath = basePath.substring(country.urlPrefix.length);
        break;
      }
    }

    // Ensure basePath starts with /
    if (!basePath.startsWith('/')) {
      basePath = '/' + basePath;
    }

    // Build new path with target country prefix
    const newPath = targetUrlPrefix
      ? `${targetUrlPrefix}${basePath}`
      : basePath;

    // Navigate with full page reload (ensures server-side rewrites work)
    window.location.href = newPath + currentSearch;

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
      <>
        {/* Mobile Trigger - Compact */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1.5 text-gray-700 hover:text-brand-brown transition-colors"
          aria-label="Land wählen"
          aria-expanded={isOpen}
        >
          {globeIcon}
          <span className="text-xs font-medium">{currentCountry.code}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Bottom Sheet - Portal-style rendering */}
        {isOpen && (
          <div className="fixed inset-0 z-[9999]" ref={dropdownRef} style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            {/* Backdrop with fade-in */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
              style={{
                backdropFilter: 'blur(4px)',
                animation: 'fadeIn 200ms ease-out',
              }}
            />

            {/* Bottom Sheet with slide-up animation */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
              style={{
                maxHeight: '85vh',
                animation: 'slideUp 300ms cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {/* Drag Handle */}
              <div className="pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-brand-brown" />
                  <span>Land wählen</span>
                </h3>
              </div>

              {/* Country List - Scrollable */}
              <div className="px-4 py-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                {availableCountries.map((country, index) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySwitch(country.urlPrefix)}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-medium transition-all duration-200 ${
                      currentCountry.code === country.code
                        ? 'bg-brand-brown text-white shadow-lg shadow-brand-brown/20 scale-[1.02]'
                        : 'bg-gray-50 text-gray-900 hover:bg-amber-50 hover:shadow-md active:scale-[0.98]'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 300ms ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{country.name}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        currentCountry.code === country.code
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-600'
                      }`}>
                        {country.code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Safe area bottom padding */}
              <div className="h-6" />
            </div>

            {/* Inline keyframe definitions */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes slideUp {
                  from {
                    transform: translateY(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `
            }} />
          </div>
        )}
      </>
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
                  ? 'bg-amber-50 text-brand-brown'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-brown'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={currentCountry.code === country.code ? 'font-semibold' : 'font-normal'}>
                  {country.name}
                </span>
                <span className="text-xs opacity-75">{country.code}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
