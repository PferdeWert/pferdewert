// frontend/components/Breadcrumbs.tsx
// RECOMMENDATION: Consistent breadcrumb navigation for AKU content hierarchy

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { useCountryConfig } from '@/hooks/useCountryConfig'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

// FAST REFRESH FIX: Define icons at module level to prevent recreation on every render
const HOME_ICON = <Home className="w-4 h-4" />
const CHEVRON_RIGHT_ICON = <ChevronRight className="w-4 h-4 text-gray-400" />

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const { getLocalizedPath } = useCountryConfig()

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`} aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link
        href={getLocalizedPath("/")}
        className="text-gray-500 hover:text-brand-brown transition-colors p-1 rounded"
        aria-label="Startseite"
      >
        {HOME_ICON}
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {CHEVRON_RIGHT_ICON}
          {item.current ? (
            <span className="font-medium text-gray-900" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={getLocalizedPath(item.href!)}
              className="hover:text-brand-brown transition-colors hover:underline"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

// USAGE EXAMPLES for AKU content:

// Hub page: /pferde-ratgeber/aku-verstehen/
export const AkuHubBreadcrumbs = () => (
  <Breadcrumbs
    items={[
      { label: 'Ratgeber', href: '/pferde-ratgeber' },
      { label: 'AKU verstehen', current: true }
    ]}
  />
)

// Sub-page: /pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren
export const AkuBefundeBreadcrumbs = () => (
  <Breadcrumbs
    items={[
      { label: 'Ratgeber', href: '/pferde-ratgeber' },
      { label: 'AKU verstehen', href: '/pferde-ratgeber/aku-verstehen' },
      { label: 'AKU Befunde interpretieren', current: true }
    ]}
  />
)

// Sub-page: /pferde-ratgeber/aku-verstehen/aku-kosten-nutzen
export const AkuKostenBreadcrumbs = () => (
  <Breadcrumbs
    items={[
      { label: 'Ratgeber', href: '/pferde-ratgeber' },
      { label: 'AKU verstehen', href: '/pferde-ratgeber/aku-verstehen' },
      { label: 'AKU Kosten & Nutzen', current: true }
    ]}
  />
)

// Sub-page: /pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku
export const PferdewertAkuBreadcrumbs = () => (
  <Breadcrumbs
    items={[
      { label: 'Ratgeber', href: '/pferde-ratgeber' },
      { label: 'AKU verstehen', href: '/pferde-ratgeber/aku-verstehen' },
      { label: 'Pferdewert trotz AKU', current: true }
    ]}
  />
)