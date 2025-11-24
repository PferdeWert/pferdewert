import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { getAvailableCountries, getCurrentCountry, buildCountryUrl, COUNTRIES, Country } from '@/lib/countries';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CountrySwitcherProps {
  variant?: 'mobile' | 'desktop';
}

/**
 * Country Switcher Component - Radix UI Dropdown
 *
 * NEW: Domain-based switching (Nov 2025)
 * - Switches between pferdewert.de, pferdewert.at, etc.
 * - No more path prefixes
 * - Direct domain navigation
 *
 * Best Practices 2025:
 * - Globe icon (not flags - language ≠ country, political issues)
 * - Dropdown approach (scalable for 4+ countries)
 * - User control (no auto-redirect)
 * - Scalable for future countries (CH, NL, BE, LU)
 */
export default function CountrySwitcher({ variant = 'desktop' }: CountrySwitcherProps) {
  // HYDRATION FIX: Start with default (DE) to match SSR, then update client-side
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES[0]);

  // Detect country client-side after mount to avoid hydration mismatch
  useEffect(() => {
    setCurrentCountry(getCurrentCountry());
  }, []);

  /**
   * Handle country switch - navigates to the same page on the target domain
   */
  const handleCountrySwitch = (targetCountry: Country) => {
    if (typeof window === 'undefined') return;

    // Get current path (without domain)
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    // Remove any legacy /at/ prefix from path (backwards compatibility)
    let cleanPath = currentPath;
    if (cleanPath.startsWith('/at/')) {
      cleanPath = cleanPath.slice(3);
    } else if (cleanPath === '/at') {
      cleanPath = '/';
    }

    // Build URL for target country's domain
    const targetUrl = buildCountryUrl(targetCountry, cleanPath) + currentSearch;

    // Navigate with full page reload (cross-domain navigation)
    window.location.href = targetUrl;
  };

  // Get available countries once
  const availableCountries = getAvailableCountries();

  // Both Mobile & Desktop use the same Radix UI Dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={variant === 'mobile' ? 'gap-1.5 px-2 h-8' : 'gap-2'}
        >
          <Globe className="h-4 w-4" />
          <span className={variant === 'mobile' ? 'text-xs font-medium' : 'font-medium'} suppressHydrationWarning>
            {currentCountry.code}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {availableCountries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => handleCountrySwitch(country)}
            className={`cursor-pointer ${
              currentCountry.code === country.code
                ? 'bg-amber-50 text-brand-brown font-semibold'
                : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{country.name}</span>
              <span className="text-xs opacity-75 ml-2">{country.code}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
