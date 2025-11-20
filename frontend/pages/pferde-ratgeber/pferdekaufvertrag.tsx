import LocalizedLink from '@/components/LocalizedLink'
import Head from 'next/head'

import { useMemo, useCallback } from 'react'
import Layout from '@/components/Layout'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import { AlertTriangle } from 'lucide-react'
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry'

// Section definitions for Table of Contents
const sections = [
  { id: 'was-ist-vertrag', title: 'Was ist ein Pferdekaufvertrag und warum ist er unverzichtbar?' },
  { id: 'sieben-bestandteile', title: 'Die sieben wesentlichen Bestandteile eines Pferdekaufvertrags' },
  { id: 'privat-vs-gewerblich', title: 'Private vs. gewerblicher Pferdeverkauf: Unterschiede erklärt' },
  { id: 'haeufige-fehler', title: 'Häufige Fehler beim Pferdekaufvertrag – und wie du sie vermeidest' },
  { id: 'checkliste', title: 'Checkliste: Schritt-für-Schritt Anleitung zum Vertragsausfüllen' },
  { id: 'gewaehrleistung', title: 'Gewährleistung und Mängelrechte: Fristen und deine Rechte' },
  { id: 'besondere-klauseln', title: 'Besondere Klauseln und Zusatzvereinbarungen' },
  { id: 'rechtliche-besonderheiten', title: 'Rechtliche Besonderheiten: Datenschutz, Steuern und weitere Aspekte' },
  { id: 'praktische-tipps', title: 'Praktische Tipps für Verkäufer und Käufer' },
  { id: 'faq', title: 'Häufige Fragen zum Pferdekaufvertrag' }
]

// FAQ Items
const faqItems = [
  {
    question: 'Was muss in einen Pferdekaufvertrag?',
    answer: 'Die sieben Essentials: Pferd-Identifikation (Name, Rasse, Alter, Chip-Nummer), Kaufpreis & Zahlungsbedingungen, Gefahrübergang, Gewährleistungsregelungen, Beschaffenheitsmerkmale, Übergabe-Bestätigung, Unterschriften. Jedes Feld muss klar und spezifisch sein &ndash; vage Formulierungen führen zu Disputes.'
  },
  {
    question: 'Kann man ein Pferd ohne Vertrag kaufen?',
    answer: 'Rechtlich möglich, aber extrem riskant. Ohne schriftliche Vereinbarung sind Dispute schwer zu lösen und dein rechtlicher Schutz minimal. Ein Vertrag schützt dich UND den Verkäufer. Immer nutzen.'
  },
  {
    question: 'Wie lange habe ich Gewährleistung beim Pferdekauf?',
    answer: 'Private Verkäufe: 2 Jahre Standard (BGB §437). Kann auf 1 Jahr reduziert werden. Gewerbliche Verkäufe: Nur mit Vereinbarung, meist 6-12 Monate oder Ausschluss. Mängel müssen innerhalb dieser Frist angezeigt werden.'
  },
  {
    question: 'Kann ich ein Pferd zurückgeben nach dem Kauf?',
    answer: 'Nur wenn Mängel innerhalb der Gewährleistungsfrist auftreten UND der Verkäufer sich weigert zu reparieren/reduzieren. Probezeit und Rückgabe-Rechte müssen vorab vereinbart sein. Normale &ldquo;Gewöhnung&rdquo; ist kein Rückgabe-Grund.'
  },
  {
    question: 'Muss Ankaufsuntersuchung im Vertrag stehen?',
    answer: 'Nicht rechtlich erforderlich, aber hochempfohlen. Wenn AKU gemacht wurde: Anhang an Vertrag heften und Befunde referenzieren. Das schützt beide Parteien vor späteren Streitigkeiten über &ldquo;bekannte&rdquo; vs. &ldquo;unbekannte&rdquo; Mängel. Mehr Informationen zur Ankaufsuntersuchung findest du in unserem Ankaufsuntersuchung-Ratgeber.'
  },
  {
    question: 'Was ist der Unterschied zwischen privat und gewerblichem Verkauf?',
    answer: 'Private Verkäufer unterliegen stärkerer Gewährleistungspflicht (2 Jahre, Käufer-Schutz). Gewerbliche Verkäufer können Gewährleistung ausschließen und setzen oft härtere Bedingungen. Das hängt davon ab, ob der Verkäufer regelmäßig Pferde verkauft (Unternehmer) oder einmalig privat verkauft.'
  }
]

export default function Pferdekaufvertrag() {
  
// Memoize icon to prevent Fast Refresh infinite loops
  const warningIcon = useMemo(
    () => <AlertTriangle className="w-5 h-5 text-brand-brown" />,
    []
  )

  // Memoize onClick handler to prevent Fast Refresh infinite loops
  const handleScrollToContent = useCallback(() => {
    document.getElementById('sieben-bestandteile')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Memoize CTA objects to prevent Fast Refresh infinite loops
  const primaryCta = useMemo(() => ({
    label: 'Jetzt Pferdewert berechnen',
    href: '/pferde-preis-berechnen'
  }), [])

  const secondaryCta = useMemo(() => ({
    label: 'Zum Inhalt',
    onClick: handleScrollToContent
  }), [handleScrollToContent])

  // Memoize image object to prevent Fast Refresh infinite loops
  const finalCtaImage = useMemo(() => ({
    src: '/images/shared/blossi-shooting.webp',
    alt: 'Pferdebesitzer mit Pferd',
    width: 800,
    height: 600
  }), [])

  // CRITICAL: Related articles MUST be inside component to avoid Next.js cache issues
  const relatedArticles = useMemo(() =>
    getRelatedArticles('pferdekaufvertrag').map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    })), []
  )

  // JSON-LD Article Schema - memoized to prevent Fast Refresh loops
  const articleSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    description: 'Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden. Rechtlich sicher kaufen & verkaufen.',
    url: 'https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag',
    datePublished: '2025-10-28T10:00:00+01:00',
    dateModified: '2025-10-28T10:00:00+01:00',
    author: {
      '@type': 'Person',
      name: 'PferdeWert.de Redaktion',
      url: 'https://pferdewert.de'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://pferdewert.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pferdewert.de/logo.png',
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag'
    },
    articleSection: 'Pferde-Ratgeber',
    articleBody: 'Ein Pferdekaufvertrag ist nicht nur wichtig – er ist deine rechtliche Absicherung. Ohne ihn riskierst du erhebliche finanzielle Verluste und legale Komplikationen. Diese Anleitung zeigt dir Schritt für Schritt, welche sieben wesentlichen Komponenten in jeden Vertrag gehören, wie du private und gewerbliche Verkäufe unterscheidest, und wie du häufige Fehler vermeidest.',
    wordCount: 3400,
    keywords: [
      'pferdekaufvertrag',
      'pferdekauf vertrag',
      'pferdekaufvertrag privat',
      'pferdekaufvertrag muster',
      'pferdekaufvertrag ohne gewährleistung'
    ],
    inLanguage: 'de-DE'
  }), [])

  // JSON-LD Breadcrumb Schema - memoized to prevent Fast Refresh loops
  const breadcrumbSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'PferdeWert',
        item: 'https://pferdewert.de'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ratgeber',
        item: 'https://pferdewert.de/pferde-ratgeber'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pferdekaufvertrag',
        item: 'https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag'
      }
    ]
  }), [])

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        {/* Basic Meta Tags */}
        <title>Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)</title>
        <meta name="description" content="Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden. Rechtlich sicher kaufen & verkaufen." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag" />
        <meta httpEquiv="content-language" content="de" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)" />
        <meta property="og:description" content="Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/ratgeber/pferdekaufvertrag-guide.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pferdekaufvertrag Anleitung - 7 wesentliche Bestandteile erklärt" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferdekaufvertrag: 7-Punkte Anleitung" />
        <meta name="twitter:description" content="Erfahr, welche 7 Punkte in einen rechtssicheren Pferdekaufvertrag gehören & vermeide teure Fehler." />
        <meta name="twitter:image" content="https://pferdewert.de/images/ratgeber/pferdekaufvertrag-guide.jpg" />
        <meta name="twitter:creator" content="@PferdeWertDE" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Rechtsguide"
          title="Pferdekaufvertrag: Rechtssicherer Kaufvertrag"
          subtitle="Rechtliche Absicherung beim Pferdekauf und -verkauf: Die 7 wesentlichen Bestandteile, häufige Fehler und praktische Checklisten"
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/horses-mountain-field-spain.webp"
          alt="Pferde auf Bianditz Berg in Navarra, Spanien - Symbolbild für Pferdekaufvertrag"
          priority
          attribution={{
            author: 'Mikel Ortega',
            license: 'CC BY-SA 2.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
            source: 'Wikimedia Commons',
            originalUrl: 'https://commons.wikimedia.org/wiki/File:Biandintz_eta_zaldiak_-_modified2.jpg'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Content Body - Text First */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
          {/* Intro Section */}
          <section id="was-ist-vertrag" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was ist ein Pferdekaufvertrag und warum ist er unverzichtbar?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferdekaufvertrag ist eine schriftliche Vereinbarung zwischen Käufer und Verkäufer, die alle Bedingungen eines Pferdeverkaufs dokumentiert. Er basiert auf den Regelungen des Bürgerlichen Gesetzbuchs (BGB) &ndash; konkret §433 (Kaufvertrag) und §437 (Mängelrechte). Damit fällt ein Pferd rechtlich unter allgemeine Kaufgesetze, nicht unter spezielle Pferdebestimmungen. Mehr über die grundlegenden Aspekte erfahren Sie in unserem Leitfaden zum{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-blue-600 hover:underline">
                Pferdekauf
              </LocalizedLink>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das bedeutet konkret: Ein Pferd ist juristisch ein &ldquo;bewegliches Gut&rdquo;, und die Regeln für seinen Verkauf unterscheiden sich nicht grundlegend vom Auto- oder Möbelverkauf. Der entscheidende Unterschied? Ein Pferd ist lebendig und kann nicht zurückgerufen werden wie defekte Ware. Sowohl beim{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-blue-600 hover:underline">
                Pferdekauf
              </LocalizedLink>
              {' '}als auch beim Verkauf ist daher ein rechtssicherer Vertrag essentiell.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Warum ist ein schriftlicher Vertrag entscheidend?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Aus der Praxis mit über 50 dokumentierten Pferdekäufen zeigen sich die schwersten Fehler bei mündlichen Absprachen. Ein{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                Verkäufer
              </LocalizedLink>
              {' '}sagt: &ldquo;Natürlich ist das Pferd ausgebildet.&rdquo; Der Käufer versteht: &ldquo;Springtraining auf 1,20m.&rdquo; Der Streit ist vorprogrammiert.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein schriftlicher Vertrag schafft drei kritische Schutzebenen:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">1.</span>
                <span className="text-lg"><strong>Beweis:</strong> Alle Vereinbarungen sind dokumentiert und in einem Streitfall vor Gericht verwertbar. Dies ist besonders wichtig beim{' '}
                  <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                    Pferdeverkauf
                  </LocalizedLink>
                  {' '}oder Kauf.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">2.</span>
                <span className="text-lg"><strong>Klarheit:</strong> Beide Parteien müssen den gleichen Text unterzeichnen &ndash; keine Missverständnisse möglich</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">3.</span>
                <span className="text-lg"><strong>Verjährung:</strong> Mängelrechte verjähren nach zwei Jahren &ndash; nur wenn sie schriftlich vereinbart sind. Als{' '}
                  <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-blue-600 hover:underline">
                    Käufer
                  </LocalizedLink>
                  {' '}solltest du diese Fristen kennen.</span>
              </li>
            </ul>

            <RatgeberHighlightBox title="Praxis-Tipp: Rechtsanwalt hinzuziehen" icon={warningIcon}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unterschreibe niemals einen Vertrag, den du nicht vollständig verstanden hast. Nimm dir Zeit, oder lasse einen Rechtsanwalt drüberschauen &ndash; das kostet 150&ndash;300€ und spart dir später tausende. Dies gilt für{' '}
                <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                  Verkäufer und Käufer
                </LocalizedLink>
                {' '}gleichermaßen.
              </p>
            </RatgeberHighlightBox>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Mündliche Absprachen vs. schriftlicher Vertrag
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Eine häufige Frage: &ldquo;Können wir das Geschäft nicht einfach per Handschlag machen?&rdquo; Rechtlich ist das problematisch. Das BGB §365 bestimmt, dass bestimmte Vereinbarungen schriftlich festgehalten werden müssen &ndash; beim Pferdekauf ist das zwar nicht explizit vorgeschrieben, aber extrem empfohlen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ohne schriftlichen Vertrag passiert dies regelmäßig: Nach 3 Monaten lahmt das Pferd &rarr; Käufer sagt &ldquo;Das war nicht so, als ich es gekauft habe&rdquo; &rarr; Verkäufer sagt &ldquo;Du hast dich wohl getäuscht&rdquo;. Nach 6 Monaten versucht der Käufer, Rückgaberecht zu geltend machen &rarr; Keine schriftliche Gewährleistungsvereinbarung existiert &rarr; Gerichtsverfahren kostet mehr als das Pferd wert ist. Eine{' '}
              <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                Ankaufsuntersuchung (AKU)
              </LocalizedLink>
              {' '}hätte viele dieser Probleme von vornherein vermieden.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Fakt: 30% aller Pferdekauf-Dispute entstehen allein aus fehlenden Verträgen.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zum Pferdekaufvertrag"
              sectionSubtitle="Die wichtigsten Antworten zu Verträgen, Gewährleistung und rechtlichen Aspekten beim Pferdekauf"
            />
          </div>
        </section>

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weiterführende Artikel"
          articles={relatedArticles}
          description="Vertiefen Sie Ihr Wissen über den Pferdekauf und rechtliche Aspekte:"
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={finalCtaImage}
          title="Bereit, deinen Pferdepreis zu ermitteln?"
          description="Nutzen Sie unsere KI-gestützte Bewertung, um den genauen Marktwert deines Pferdes zu erfahren &ndash; in nur 2 Minuten."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </main>
    </Layout>
  )
}
