/**
 * BreadcrumbSchema Component
 * Renders JSON-LD structured data for Schema.org BreadcrumbList type
 * Used for breadcrumb navigation in Google search results
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Generates Schema.org BreadcrumbList structured data
 *
 * @param items - Array of breadcrumb items with name and URL
 * @returns Script tag with properly formatted JSON-LD breadcrumb list
 *
 * @example
 * ```tsx
 * <BreadcrumbSchema
 *   items={[
 *     { name: 'Home', url: 'https://pferdewert.de' },
 *     { name: 'Ratgeber', url: 'https://pferdewert.de/ratgeber' },
 *     { name: 'Pferd kaufen', url: 'https://pferdewert.de/ratgeber/pferd-kaufen' }
 *   ]}
 * />
 * ```
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbList, null, 2),
      }}
    />
  );
}
