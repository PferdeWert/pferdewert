import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { getAvailableCountries, getCountryFromPath, getSortedCountries, COUNTRIES } from '@/lib/countries';
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
 * Best Practices 2025:
 * - Globe icon (not flags - language ≠ country, political issues)
 * - Dropdown approach (scalable for 4+ countries)
 * - User control (no auto-redirect)
 * - Scalable for future countries (CH, NL, BE, LU)
 */
export default function CountrySwitcher({ variant = 'desktop' }: CountrySwitcherProps) {
  const router = useRouter();

  // HYDRATION FIX: Start with default (DE) to match SSR, then update client-side
  // This prevents hydration mismatch when server doesn't know about /at/ prefix
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES[0]);

  // Detect country client-side after mount to avoid hydration mismatch
  useEffect(() => {
    const pathname = router.asPath.split('?')[0].split('#')[0];
    const country = getCountryFromPath(pathname);
    setCurrentCountry(country);
  }, [router.asPath]);

  const handleCountrySwitch = (targetUrlPrefix: string) => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    // Remove current country prefix from path
    let basePath = currentPath;
    const sortedCountries = getSortedCountries();

    for (const country of sortedCountries) {
      // Match exact prefix with word boundary
      if (currentPath === country.urlPrefix || currentPath.startsWith(country.urlPrefix + '/')) {
        basePath = currentPath.substring(country.urlPrefix.length);
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
            onClick={() => handleCountrySwitch(country.urlPrefix)}
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
