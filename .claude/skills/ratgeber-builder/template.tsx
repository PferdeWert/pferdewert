// TEMPLATE: Ratgeber Page nach SEO-DESIGN.md
// Dieses Template zeigt die korrekte Struktur für neue Ratgeber-Seiten

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { getRatgeberBySlug } from '@/lib/ratgeber-registry';
import { Award, Info, ShieldAlert, ChevronDown } from 'lucide-react';
// import metaData from '@/SEO/SEO-CONTENT/[keyword]/[keyword]-meta.json';

export default function RatgeberPageTemplate() {
  // Sections für Table of Contents
  const sections = [
    { id: 'overview', title: 'Übersicht' },
    { id: 'main-topic', title: 'Hauptthema' },
    { id: 'details', title: 'Details' },
    { id: 'faq', title: 'Häufige Fragen' },
  ];

  // FAQ Items
  const faqItems = [
    {
      question: 'Beispiel-Frage 1?',
      answer: 'Antwort auf Frage 1...',
    },
    {
      question: 'Beispiel-Frage 2?',
      answer: 'Antwort auf Frage 2...',
    },
  ];

  // Related Articles (aus Registry holen!)
  const relatedArticles = [
    getRatgeberBySlug('pferd-kaufen'),
    getRatgeberBySlug('pferd-verkaufen'),
    getRatgeberBySlug('aku-pferd'),
  ].filter(Boolean);

  // Scroll Helper für Table of Contents
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Header-Höhe
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <Head>
        {/* Basic Meta Tags */}
        <title>Titel aus meta_tags.title</title>
        <meta name="description" content="Beschreibung aus meta_tags.description" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/[slug]" />
        <meta httpEquiv="content-language" content="de" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="OG Titel" />
        <meta property="og:description" content="OG Beschreibung" />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/[slug]" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="/images/ratgeber/[inhaltsbasiert].webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bild Alt Text" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Twitter Titel" />
        <meta name="twitter:description" content="Twitter Beschreibung" />
        <meta name="twitter:image" content="/images/ratgeber/[inhaltsbasiert].webp" />
      </Head>

      {/* Structured Data - Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Artikel Headline',
            description: 'Artikel Beschreibung',
            author: {
              '@type': 'Organization',
              name: 'PferdeWert.de',
            },
            publisher: {
              '@type': 'Organization',
              name: 'PferdeWert.de',
              logo: {
                '@type': 'ImageObject',
                url: 'https://pferdewert.de/images/logo.webp',
              },
            },
            datePublished: '2025-11-09',
            dateModified: '2025-11-09',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://pferdewert.de/pferde-ratgeber/[slug]',
            },
            image: 'https://pferdewert.de/images/ratgeber/[inhaltsbasiert].webp',
          }),
        }}
      />

      {/* Structured Data - Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://pferdewert.de',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Ratgeber',
                item: 'https://pferdewert.de/pferde-ratgeber',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Artikel Titel',
                item: 'https://pferdewert.de/pferde-ratgeber/[slug]',
              },
            ],
          }),
        }}
      />

      {/* ⚠️ WICHTIG: FAQ Schema wird automatisch vom <FAQ> Component generiert!
          NICHT manuell hinzufügen, um Duplikate zu vermeiden! */}

      <article className="min-h-screen">
        {/* Hero Section */}
        <RatgeberHero
          badge={{
            icon: <Award className="h-4 w-4" />,
            text: 'Expertenwissen',
          }}
          title="Haupttitel des Artikels"
          subtitle="Untertitel mit 2-3 Sätzen für besseres Verständnis des Themas."
          metadata={{
            readTime: '12 Min.',
            publishDate: '9. November 2025',
            category: 'Kategorie',
          }}
          primaryCta={{
            label: 'Jetzt Pferdewert berechnen',
            href: '/pferde-preis-berechnen',
          }}
          secondaryCta={{
            label: 'Zum Inhalt',
            onClick: () => handleNavigate('overview'),
            icon: <ChevronDown className="h-5 w-5" />,
          }}
        />

        {/* Hero Image */}
        <RatgeberHeroImage
          src="/images/ratgeber/horses-mountain-field-spain.webp"
          alt="Beschreibung des Bildinhalts"
          width={1200}
          height={800}
          priority
        />

        {/* Table of Contents */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 mt-12">
          <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />
        </div>

        {/* Content Body - TEXT FIRST! */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 mt-12 space-y-16">
          {/* Section 1: Übersicht */}
          <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Hauptüberschrift des ersten Abschnitts
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Einleitender Absatz mit 3-4 Sätzen. Nutze semantisches HTML für 95% des Contents.
              Listen, Absätze und Überschriften bilden die Basis. Boxen nur strategisch einsetzen.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Unterüberschrift für Details
            </h3>

            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Listenpunkt mit wichtigen Informationen</li>
              <li>• Weitere relevante Details ohne Box-Wrapper</li>
              <li>
                • Keywords können <strong>fett</strong> hervorgehoben werden
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              Weiterer Absatz mit zusätzlichen Informationen. Halte Absätze kurz (max. 3-4 Sätze)
              für bessere Lesbarkeit.
            </p>
          </section>

          {/* Strategische Highlight-Box (max. 2-4 pro Artikel!) */}
          <RatgeberHighlightBox
            title="KI-Bewertung für präzise Marktwert-Ermittlung"
            icon={<Award className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-base text-gray-700 leading-relaxed">
              Unsere KI-gestützte Bewertung analysiert über 50 Faktoren und liefert in 2 Minuten
              eine professionelle Marktanalyse für nur 19,90€. Vermeide Underpricing und
              optimiere deinen Verkaufspreis.
            </p>
            <div className="mt-4">
              <a
                href="/pferde-preis-berechnen"
                className="inline-block bg-brand-brown hover:bg-brand-brownDark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Jetzt Pferdewert berechnen
              </a>
            </div>
          </RatgeberHighlightBox>

          {/* Section 2: Hauptthema */}
          <section id="main-topic" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Zweiter Hauptabschnitt
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Content für den zweiten Abschnitt. Strukturiere mit semantischem HTML.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Unterüberschrift
            </h3>

            <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
              <li>
                <strong>Erster Schritt:</strong> Beschreibung des ersten Schritts mit Details
              </li>
              <li>
                <strong>Zweiter Schritt:</strong> Beschreibung des zweiten Schritts
              </li>
              <li>
                <strong>Dritter Schritt:</strong> Beschreibung des dritten Schritts
              </li>
            </ol>
          </section>

          {/* Weitere Sections nach Bedarf... */}
        </div>

        {/* FAQ Section - WICHTIG: Schema wird automatisch generiert! */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen"
              sectionSubtitle="Die wichtigsten Antworten zu [Thema] auf einen Blick"
            />
          </div>
        </section>

        {/* Related Articles */}
        <div className="mt-16">
          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe dein Wissen mit diesen ergänzenden Ratgebern."
            articles={relatedArticles}
          />
        </div>

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'PferdeWert.de KI-Bewertung',
            width: 800,
            height: 600,
          }}
          title="Bereit für deine professionelle Pferdebewertung?"
          description="Erhalte in nur 2 Minuten eine KI-gestützte Marktanalyse für 19,90€. Präzise, datenbasiert und sofort verfügbar."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
