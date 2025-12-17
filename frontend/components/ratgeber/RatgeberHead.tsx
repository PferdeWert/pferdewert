import Head from 'next/head';
import { useRouter } from 'next/router';

// Domain mapping per Next.js i18n locale (configured in next.config.js)
// UPDATED 2025-12-14: Uses Next.js i18n locales ('de', 'de-AT', 'de-CH')
const DOMAINS = {
  'de': 'https://pferdewert.de',
  'de-AT': 'https://pferdewert.at',
  'de-CH': 'https://pferdewert.ch',
} as const;

const SITE_NAMES = {
  'de': 'PferdeWert.de',
  'de-AT': 'PferdeWert.at',
  'de-CH': 'PferdeWert.ch',
} as const;

const OG_LOCALES = {
  'de': 'de_DE',
  'de-AT': 'de_AT',
  'de-CH': 'de_CH',
} as const;

type Locale = 'de' | 'de-AT' | 'de-CH';

export interface LocaleContent {
  title: string;
  description: string;
  keywords?: string;
  // Optional overrides for OG/Twitter (falls back to title/description)
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface AuthorInfo {
  name: string;
  url?: string; // URL to author page
  jobTitle?: string;
  image?: string; // URL to author image
}

// Support both new Next.js i18n keys ('de-AT', 'de-CH') and legacy keys ('at', 'ch')
interface LocaleMap {
  de: LocaleContent;
  'de-AT'?: LocaleContent;
  'de-CH'?: LocaleContent;
  // Legacy keys for backwards compatibility with existing Ratgeber pages
  at?: LocaleContent;
  ch?: LocaleContent;
}

// ============================================================================
// MULTI-DOMAIN SEO: Country-exclusive pages
// These pages should NOT have hreflang tags (they only exist on one domain)
// ============================================================================
const COUNTRY_EXCLUSIVE_SLUGS = [
  // DE-only regional pages
  'bayern',
  'nrw',
  'sachsen',
  'schleswig-holstein',
  'brandenburg',
  'hessen',
  'baden-wuerttemberg',
  'niedersachsen',
  // AT-only
  'oesterreich',
  // CH-only
  'schweiz',
];

export interface RatgeberHeadProps {
  slug: string;
  image: string; // relative path, e.g., /images/ratgeber/haflinger.webp

  // Locale-specific content (supports both new i18n keys and legacy keys)
  locales: LocaleMap;

  // Article metadata
  datePublished: string; // YYYY-MM-DD
  dateModified?: string;
  wordCount?: number;
  breadcrumbTitle: string; // Short title for breadcrumb

  // Author info for E-E-A-T (optional, falls back to organization)
  author?: AuthorInfo;

  // FAQ data for schema (optional)
  faqItems?: Array<{ question: string; answer: string }>;

  // Base path for URLs (defaults to /pferde-ratgeber)
  // Use for pages outside /pferde-ratgeber/, e.g., basePath="/pferd-kaufen"
  basePath?: string;
}

export default function RatgeberHead({
  slug,
  image,
  locales,
  datePublished,
  dateModified,
  wordCount,
  breadcrumbTitle,
  author,
  faqItems,
  basePath = '/pferde-ratgeber',
}: RatgeberHeadProps) {
  const { locale: routerLocale } = useRouter();
  const locale = (routerLocale as Locale) || 'de';

  // Get content for current locale with backwards compatibility
  // Supports both new keys ('de-AT', 'de-CH') and legacy keys ('at', 'ch')
  const getLocaleContent = (): LocaleContent => {
    // New i18n keys first
    if (locale === 'de-AT') {
      return locales['de-AT'] || locales.at || locales.de;
    }
    if (locale === 'de-CH') {
      return locales['de-CH'] || locales.ch || locales.de;
    }
    return locales.de;
  };

  const content = getLocaleContent();
  const domain = DOMAINS[locale] || DOMAINS['de'];
  const siteName = SITE_NAMES[locale] || SITE_NAMES['de'];
  const ogLocale = OG_LOCALES[locale] || OG_LOCALES['de'];

  const canonicalUrl = `${domain}${basePath}/${slug}`;
  const imageUrl = `${domain}${image}`;
  const finalDateModified = dateModified || datePublished;

  // Check if AT/CH content exists (supports both new and legacy keys)
  const hasAtContent = !!(locales['de-AT'] || locales.at);
  const hasChContent = !!(locales['de-CH'] || locales.ch);

  // Check if this is a country-exclusive page (no hreflang needed)
  const isExclusivePage = COUNTRY_EXCLUSIVE_SLUGS.includes(slug);

  // Generate hreflang tags for all available locales
  // SKIP hreflang for country-exclusive pages (they only exist on one domain)
  const hreflangTags = isExclusivePage ? [] : [
    { hreflang: 'de', href: `${DOMAINS['de']}${basePath}/${slug}` },
    ...(hasAtContent ? [{ hreflang: 'de-AT', href: `${DOMAINS['de-AT']}${basePath}/${slug}` }] : []),
    ...(hasChContent ? [{ hreflang: 'de-CH', href: `${DOMAINS['de-CH']}${basePath}/${slug}` }] : []),
    { hreflang: 'x-default', href: `${DOMAINS['de']}${basePath}/${slug}` },
  ];

  // Build author schema - Person if provided, otherwise Organization fallback
  const authorSchema = author
    ? {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
        ...(author.jobTitle && { jobTitle: author.jobTitle }),
        ...(author.image && { image: author.image }),
      }
    : {
        '@type': 'Organization',
        name: 'PferdeWert.de Redaktion',
        url: `${DOMAINS.de}/ueber-pferdewert`,
      };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    image: imageUrl,
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAINS.de}/logo.png`,
        width: 600,
        height: 60
      }
    },
    datePublished,
    dateModified: finalDateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    ...(content.keywords && { keywords: content.keywords }),
    ...(wordCount && { wordCount }),
    isAccessibleForFree: true
  };

  // Derive breadcrumb parent name from basePath
  const breadcrumbParentName = basePath === '/pferde-ratgeber'
    ? 'Pferde-Ratgeber'
    : basePath.split('/').filter(Boolean).map(s =>
        s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      ).join(' / ');

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbParentName,
        item: `${domain}${basePath}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: breadcrumbTitle,
        item: canonicalUrl
      }
    ]
  };

  // FAQ Schema
  const faqSchema = faqItems && faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  return (
    <Head>
      {/* Basic Meta */}
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      {content.keywords && <meta name="keywords" content={content.keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang Tags */}
      {hreflangTags.map((tag) => (
        <link key={tag.hreflang} rel="alternate" hrefLang={tag.hreflang} href={tag.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={content.ogTitle || content.title} />
      <meta property="og:description" content={content.ogDescription || content.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.twitterTitle || content.ogTitle || content.title} />
      <meta name="twitter:description" content={content.twitterDescription || content.ogDescription || content.description} />
      <meta name="twitter:site" content="@PferdeWert" />
      <meta name="twitter:creator" content="@PferdeWert" />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </Head>
  );
}
