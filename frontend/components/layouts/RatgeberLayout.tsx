/**
 * RatgeberLayout Component
 * Common layout wrapper for all Ratgeber pages
 * Includes header, breadcrumbs, footer, and SEO schema
 */

import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbSchema from '../seo/BreadcrumbSchema';
import ArticleSchema from '../seo/ArticleSchema';
import { ArticleStructuredData } from '@/types/ratgeber';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface RatgeberLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage?: string;
  breadcrumbs: BreadcrumbItem[];
  articleSchema?: ArticleStructuredData;
  showSidebar?: boolean;
}

/**
 * Layout wrapper for all Ratgeber pages with SEO optimization
 *
 * @param children - Page content to render
 * @param pageTitle - Page title for SEO meta tags
 * @param metaDescription - Meta description for SEO
 * @param canonicalUrl - Canonical URL to prevent duplicate content
 * @param ogImage - Open Graph image URL for social sharing
 * @param breadcrumbs - Breadcrumb navigation items
 * @param articleSchema - Optional Article structured data for rich snippets
 * @param showSidebar - Whether to show category/tag sidebar
 * @returns Layout component with SEO and navigation
 *
 * @example
 * ```tsx
 * <RatgeberLayout
 *   pageTitle="Pferd kaufen - Der ultimative Ratgeber"
 *   metaDescription="Alles was Sie über den Pferdekauf wissen müssen"
 *   canonicalUrl="https://pferdewert.de/ratgeber/pferd-kaufen"
 *   breadcrumbs={[
 *     { name: 'Home', url: '/' },
 *     { name: 'Ratgeber', url: '/ratgeber' },
 *     { name: 'Pferd kaufen', url: '/ratgeber/pferd-kaufen' }
 *   ]}
 *   articleSchema={articleData}
 * >
 *   <ArticleContent />
 * </RatgeberLayout>
 * ```
 */
export default function RatgeberLayout({
  children,
  pageTitle,
  metaDescription,
  canonicalUrl,
  ogImage,
  breadcrumbs,
  articleSchema,
  showSidebar = false,
}: RatgeberLayoutProps) {
  const defaultOgImage = ogImage || 'https://pferdewert.de/og-image-default.jpg';

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={defaultOgImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={defaultOgImage} />

        {/* Structured Data */}
        <BreadcrumbSchema items={breadcrumbs} />
        {articleSchema && <ArticleSchema data={articleSchema} />}
      </Head>

      <div className="min-h-screen bg-amber-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/logo.svg"
                  alt="PferdeWert.de Logo"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-gray-900">
                  PferdeWert.de
                </span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Bewertung
                </Link>
                <Link
                  href="/ratgeber"
                  className="text-blue-600 font-medium"
                >
                  Ratgeber
                </Link>
                <Link
                  href="/ueber-uns"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Über uns
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Content Layout */}
          <div className={showSidebar ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''}>
            {/* Article Content */}
            <article className={showSidebar ? 'lg:col-span-8' : ''}>
              {children}
            </article>

            {/* Sidebar */}
            {showSidebar && (
              <aside className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Kategorien
                  </h3>
                  <nav className="space-y-2">
                    <Link
                      href="/ratgeber/pferdekauf"
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Pferdekauf
                    </Link>
                    <Link
                      href="/ratgeber/pferdeverkauf"
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Pferdeverkauf
                    </Link>
                    <Link
                      href="/ratgeber/pferdehaltung"
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Pferdehaltung
                    </Link>
                    <Link
                      href="/ratgeber/pferdegesundheit"
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Pferdegesundheit
                    </Link>
                    <Link
                      href="/ratgeber/pferdetraining"
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Pferdetraining
                    </Link>
                  </nav>

                  {/* Call to Action */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-md font-bold text-gray-900 mb-2">
                      Pferd bewerten lassen?
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Erhalten Sie in 2 Minuten eine KI-gestützte Bewertung Ihres Pferdes.
                    </p>
                    <Link
                      href="/"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium px-4 py-3 rounded-lg transition-colors"
                    >
                      Jetzt bewerten
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h5 className="text-sm font-bold text-gray-900 mb-4">
                  PferdeWert.de
                </h5>
                <p className="text-sm text-gray-600">
                  KI-gestützte Pferdebewertungen für faire Marktpreise.
                </p>
              </div>

              {/* Ratgeber Links */}
              <div>
                <h5 className="text-sm font-bold text-gray-900 mb-4">
                  Ratgeber
                </h5>
                <nav className="space-y-2">
                  <Link
                    href="/ratgeber/pferdekauf"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Pferdekauf
                  </Link>
                  <Link
                    href="/ratgeber/pferdeverkauf"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Pferdeverkauf
                  </Link>
                  <Link
                    href="/ratgeber/pferdehaltung"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Pferdehaltung
                  </Link>
                </nav>
              </div>

              {/* Service Links */}
              <div>
                <h5 className="text-sm font-bold text-gray-900 mb-4">
                  Service
                </h5>
                <nav className="space-y-2">
                  <Link
                    href="/ueber-uns"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Über uns
                  </Link>
                  <Link
                    href="/kontakt"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Kontakt
                  </Link>
                  <Link
                    href="/faq"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    FAQ
                  </Link>
                </nav>
              </div>

              {/* Legal Links */}
              <div>
                <h5 className="text-sm font-bold text-gray-900 mb-4">
                  Rechtliches
                </h5>
                <nav className="space-y-2">
                  <Link
                    href="/datenschutz"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Datenschutz
                  </Link>
                  <Link
                    href="/impressum"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    Impressum
                  </Link>
                  <Link
                    href="/agb"
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    AGB
                  </Link>
                </nav>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} PferdeWert.de. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
