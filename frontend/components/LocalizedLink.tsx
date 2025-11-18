import Link from 'next/link';
import { useCountryConfig } from '@/hooks/useCountryConfig';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface LocalizedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
}

/**
 * LocalizedLink - Automatically adds /at/ prefix for Austrian locale
 *
 * Usage:
 *   <LocalizedLink href="/pferde-preis-berechnen">Link text</LocalizedLink>
 *
 * Behavior:
 *   - On DE pages: /pferde-preis-berechnen
 *   - On AT pages: /at/pferde-preis-berechnen
 *
 * This ensures users stay in their locale context when navigating.
 */
export default function LocalizedLink({ href, children, className, prefetch, ...props }: LocalizedLinkProps) {
  const { getLocalizedPath } = useCountryConfig();

  return (
    <Link href={getLocalizedPath(href)} className={className} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
