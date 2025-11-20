import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import { getAvailableCountries, getCountryFromPath } from '@/lib/countries';
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

  // FAST REFRESH FIX: Derive currentCountry directly from router.pathname
  // No state or useMemo needed - router.pathname is stable and only changes on navigation
  const currentCountry = getCountryFromPath(router.pathname);

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
          <span className={variant === 'mobile' ? 'text-xs font-semibold' : 'font-semibold'} suppressHydrationWarning>
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
