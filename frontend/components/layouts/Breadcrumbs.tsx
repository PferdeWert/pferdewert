/**
 * Breadcrumbs Navigation Component
 * Displays hierarchical navigation path for users
 * Works in conjunction with BreadcrumbSchema for SEO
 */

import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Simple chevron right icon SVG
 */
function ChevronRight() {
  return (
    <svg
      className="w-4 h-4 mx-2 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

/**
 * Renders breadcrumb navigation with proper semantic HTML
 *
 * @param items - Array of breadcrumb items with name and URL
 * @returns Accessible breadcrumb navigation component
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { name: 'Home', url: '/' },
 *     { name: 'Ratgeber', url: '/ratgeber' },
 *     { name: 'Pferd kaufen', url: '/ratgeber/pferd-kaufen' }
 *   ]}
 * />
 * ```
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-gray-600 mb-6"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url} className="flex items-center">
              {index > 0 && <ChevronRight />}
              {isLast ? (
                <span
                  className="font-medium text-gray-900"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
