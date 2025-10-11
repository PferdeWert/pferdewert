import Head from 'next/head'
import Link from 'next/link'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import { Calculator } from 'lucide-react'

// Section definitions for Table of Contents
const sections = [
  { id: 'anschaffungskosten', title: 'Anschaffungskosten eines Pferdes' },
  { id: 'monatliche-kosten', title: 'Monatliche Kosten im Überblick' },
  { id: 'jaehrliche-kosten', title: 'Jährliche Fixkosten' },
  { id: 'versteckte-kosten', title: 'Versteckte Kosten, die oft vergessen werden' },
  { id: 'budget-szenarien', title: 'Budget-Szenarien: 3 realistische Beispiele' },
  { id: 'regionale-unterschiede', title: 'Regionale Preisunterschiede in Deutschland' },
  { id: 'fazit', title: 'Fazit: Was kostet ein Pferd wirklich?' },
  { id: 'faq', title: 'FAQ - Häufige Fragen zu Pferdekosten' }
]

// FAQ Items
const faqItems = [
  {
    question: 'Was kostet ein Pferd im Monat durchschnittlich?',
    answer: 'Ein Pferd kostet im Durchschnitt 400€ - 800€ pro Monat, abhängig von Haltungsform, Region und individuellen Bedürfnissen. In der Offenstallhaltung in ländlichen Regionen können die Kosten bei ~400€ liegen, während Boxenhaltung in Stadtnähe 600€ - 900€/Monat kostet. Sportpferde in Vollpension mit Beritt können 1.200€ - 2.000€+/Monat erreichen. Diese Kosten decken nur die Grundversorgung (Stall, Futter, Hufpflege, Basis-Tierarzt, Versicherung). Notfälle, Turniere oder Zusatzleistungen kommen extra hinzu.'
  },
  {
    question: 'Wie viel kostet ein Pferd in der Anschaffung?',
    answer: 'Die Anschaffungskosten für ein Pferd liegen zwischen 2.500€ und 20.000€. Freizeitpferde kosten 2.500€ - 8.000€, Sportpferde 8.000€ - 30.000€+ und Jungpferde 3.000€ - 12.000€. Hinzu kommen die Ankaufsuntersuchung (AKU) mit 200€ - 800€ sowie die Erstausstattung (Sattel, Trense, Decken etc.) mit 1.000€ - 4.660€. Die Gesamtkosten für die Anschaffung belaufen sich somit auf 3.700€ - 20.460€. Ein günstiges Pferd in der Anschaffung bedeutet nicht zwangsläufig niedrige Gesamtkosten – ein gesundes, gut ausgebildetes Pferd spart langfristig oft mehr Tierarzt- und Trainingskosten.'
  },
  {
    question: 'Welche versteckten Kosten gibt es bei der Pferdehaltung?',
    answer: 'Die häufigsten versteckten Kosten sind: (1) Notfall-Tierarztkosten von 2.000€ - 8.000€ für Kolik-OPs oder Verletzungen, (2) Equipment-Erneuerung mit 200€ - 700€/Jahr für Decken und Sattelzeug, (3) Transport mit 80€ - 600€ für Tierarzt-Notfälle oder Turniere, (4) Weiterbildung/Reitunterricht mit 120€ - 600€/Monat, (5) Zusatzbehandlungen wie Physiotherapie (60€ - 100€/Termin) oder Osteopathie (80€ - 150€/Termin) und (6) Anhänger-Wartung/TÜV mit 200€ - 500€/Jahr. Wir empfehlen eine monatliche Rücklage von mindestens 100€ - 200€ für unvorhergesehene Kosten.'
  },
  {
    question: 'Ist eine Pferde-Versicherung sinnvoll?',
    answer: 'Ja, Versicherungen sind essenziell. Die Haftpflichtversicherung (60€ - 120€/Jahr) ist OBLIGATORISCH und deckt Schäden ab, die das Pferd Dritten zufügt. Ohne Haftpflicht haften Sie unbegrenzt mit Ihrem Privatvermögen. Eine OP-Versicherung (150€ - 400€/Jahr) ist DRINGEND EMPFOHLEN, da Operationen 3.000€ - 15.000€ kosten können. Die Versicherung deckt bis zu 10.000€ - 25.000€. Eine Kolik-OP kostet z.B. 6.000€, eine Fraktur-OP 12.000€ – ohne Versicherung oft finanzieller Ruin. Eine Krankenversicherung (400€ - 1.200€/Jahr) ist OPTIONAL und lohnt sich meist nur für Pferde mit chronischen Problemen.'
  }
]

// Related articles
const relatedArticles = [
  {
    title: 'Pferd kaufen: Der ultimative Ratgeber',
    description: 'Alles Wichtige zum Pferdekauf: Von der Vorbereitung über die Probezeit bis zum Kaufvertrag.',
    href: '/pferde-ratgeber/pferd-kaufen',
    image: '/images/ratgeber/pferd-kaufen-hero.webp',
    badge: 'Kaufberatung',
    readTime: '12 Min. Lesezeit'
  },
  {
    title: 'Ankaufsuntersuchung (AKU): Der komplette Guide',
    description: 'Warum eine AKU unverzichtbar ist und was Sie bei der Untersuchung beachten sollten.',
    href: '/pferde-ratgeber/aku-pferd',
    image: '/images/ratgeber/aku-hero.webp',
    badge: 'Gesundheit',
    readTime: '10 Min. Lesezeit'
  },
  {
    title: 'Pferd verkaufen: Profitipps für Verkäufer',
    description: 'So verkaufen Sie Ihr Pferd erfolgreich: Preisfindung, Inseraterstellung und Vertragsabwicklung.',
    href: '/pferde-ratgeber/pferd-verkaufen',
    image: '/images/ratgeber/pferd-verkaufen-hero.webp',
    badge: 'Verkauf',
    readTime: '11 Min. Lesezeit'
  }
]

export default function WasKostetEinPferd() {
  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Was kostet ein Pferd? Vollständige Kostenübersicht 2025',
    description: 'Ein Pferd kostet 2.500-20.000€ Anschaffung + 400-800€/Monat. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten.',
    url: 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd',
    datePublished: '2025-01-11T10:00:00+01:00',
    dateModified: '2025-01-11T10:00:00+01:00',
    author: {
      '@type': 'Person',
      name: 'PferdeWert Redaktion',
      url: 'https://www.pferdewert.de'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://www.pferdewert.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pferdewert.de/logo.png',
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd'
    },
    articleSection: 'Pferde-Ratgeber',
    articleBody: 'Ein Pferd kostet in der Anschaffung zwischen 2.500€ und 20.000€, abhängig von Rasse, Alter und Ausbildungsstand. Die monatlichen Kosten liegen durchschnittlich bei 300-800€. Diese Preisspanne ist beträchtlich, und viele angehende Pferdebesitzer unterschätzen die tatsächlichen Gesamtkosten erheblich. Basierend auf über 1.000 Pferdebewertungen in der PferdeWert-Datenbank liegt der durchschnittliche Gesamtaufwand für ein Freizeitpferd in Deutschland bei 6.500€ - 12.000€ pro Jahr. Die wichtigsten Kostenpunkte umfassen Anschaffungskosten (2.500€ - 20.000€), monatliche Kosten (400€ - 800€), jährliche Fixkosten (1.500€ - 3.000€), versteckte Kosten (500€ - 2.000€/Jahr) und bei eigenem Stall eine Initialinvestition von 15.000€ - 50.000€.',
    wordCount: 2750,
    keywords: [
      'was kostet ein pferd',
      'pferd kosten',
      'pferdehaltung kosten',
      'pferd monatliche kosten',
      'pferd anschaffungskosten',
      'stallmiete',
      'hufschmied kosten',
      'tierarztkosten pferd',
      'pferd versicherung'
    ],
    inLanguage: 'de-DE',
    about: [
      {
        '@type': 'Thing',
        name: 'Pferdehaltung',
        description: 'Kosten und Aufwand der Pferdehaltung in Deutschland'
      },
      {
        '@type': 'Thing',
        name: 'Pferdekauf',
        description: 'Anschaffungskosten und Kaufpreise für Pferde'
      }
    ],
    mentions: [
      {
        '@type': 'Organization',
        name: 'PferdeWert.de',
        url: 'https://www.pferdewert.de'
      },
      {
        '@type': 'Organization',
        name: 'Bundestierärztekammer',
        description: 'Gebührenordnung für Tierärzte (GOT)'
      }
    ]
  }

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pferdewert.de'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pferde-Ratgeber',
        item: 'https://www.pferdewert.de/pferde-ratgeber'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Was kostet ein Pferd? Vollständige Kostenübersicht 2025',
        item: 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd'
      }
    ]
  }

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie viel kostet ein normales Pferd?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein normales Freizeitpferd kostet in der Anschaffung 3.000€ - 8.000€, abhängig von Rasse, Alter und Ausbildungsstand. Die monatlichen Kosten liegen bei 400€ - 600€ für Vollpension, Hufschmied und Versicherungen. Rechnen Sie mit 6.000€ - 9.000€ Gesamtkosten pro Jahr.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie viel Unterhalt kostet ein Pferd?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der monatliche Unterhalt für ein Pferd liegt durchschnittlich bei 400€ - 800€. Die größten Posten sind Stallmiete (300€ - 600€), Hufschmied (50€ - 120€), Versicherungen (30€ - 50€) und Tierarzt-Reserve (50€ - 100€). Zusätzlich fallen jährliche Kosten für Impfungen (100€ - 180€), Zahnkontrolle (80€ - 150€) und Equipment-Ersatz (200€ - 500€) an.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie viel kostet das billigste Pferd?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das billigste Pferd können Sie theoretisch für 0€ - 500€ bekommen – oft ältere Pferde oder Notfallvermittlungen. Aber Vorsicht: Ein günstiges Pferd bedeutet nicht günstige Haltung. Die laufenden Kosten bleiben gleich (400€ - 800€/Monat), und ältere Pferde haben oft höhere Tierarztkosten. Ein realistischer Mindestpreis für ein gesundes Freizeitpferd liegt bei 2.500€ - 4.000€.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie teuer ist etwa ein Pferd?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gesamtkosten pro Jahr: 6.000€ - 12.000€ für ein durchschnittliches Freizeitpferd. Das entspricht 500€ - 1.000€/Monat. Dazu kommen einmalig Anschaffung (3.000€ - 8.000€) und Grundausstattung (1.500€ - 5.000€). Über 10 Jahre Lebenszeit: 60.000€ - 120.000€ + Anschaffungskosten.'
        }
      }
    ]
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Was kostet ein Pferd? Kosten 2025 im Überblick</title>
        <meta
          name="description"
          content="Ein Pferd kostet 2.500-20.000€ Anschaffung + 400-800€/Monat. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Was kostet ein Pferd? Alle Kosten 2025 im Überblick" />
        <meta
          property="og:description"
          content="Ein Pferd kostet 2.500-20.000€ Anschaffung + 400-800€ monatlich. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd"
        />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Was kostet ein Pferd? Alle Kosten 2025 im Überblick" />
        <meta
          name="twitter:description"
          content="Ein Pferd kostet 2.500-20.000€ Anschaffung + 400-800€ monatlich. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <RatgeberHero
          title="Was kostet ein Pferd?"
          subtitle="Vollständige Kostenübersicht 2025: Von der Anschaffung bis zum monatlichen Unterhalt"
          primaryCta={{
            href: '/pferde-preis-berechnen',
            label: 'Jetzt Pferd bewerten',
            icon: <Calculator className="w-5 h-5" />
          }}
          secondaryCta={{
            onClick: () => {
              document.getElementById('anschaffungskosten')?.scrollIntoView({ behavior: 'smooth' })
            },
            label: 'Mehr erfahren'
          }}
        />

        {/* Lead Paragraph */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xl text-gray-800 leading-relaxed">
              Ein Pferd kostet in der Anschaffung zwischen <strong>2.500€ und 20.000€+</strong>, abhängig von Rasse, Alter und Ausbildungsstand. Die monatlichen Kosten liegen durchschnittlich bei <strong>400€ - 800€</strong>. In diesem{' '}
              <Link href="/pferde-ratgeber/pferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                umfassenden Pferdekauf-Ratgeber
              </Link>{' '}
              erfährst du, wie du ein passendes Pferd findest und worauf du beim Kauf achten solltest.
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RatgeberTableOfContents sections={sections} />
          </div>
        </section>

        {/* Content Container */}
        <article className="container mx-auto px-4 max-w-4xl py-16">
          {/* Section 1: Anschaffungskosten */}
          <section id="anschaffungskosten" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Anschaffungskosten eines Pferdes
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die Anschaffung eines Pferdes ist eine bedeutende finanzielle Entscheidung. Die Kosten variieren stark je nach Rasse, Alter, Ausbildungsstand und gesundheitlichem Zustand des Pferdes.
              </p>
            </div>

            {/* Preise nach Pferdetyp */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preise nach Pferdetyp</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <RatgeberHighlightBox title="Freizeitpferd">
                <p className="text-xl font-bold text-brand-brown mb-2">2.500€ - 8.000€</p>
                <p className="text-gray-700 mb-2">Durchschnitt: ~5.000€</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Geeignet für Anfänger und Hobbyreiter</li>
                  <li>✓ Meist ältere, gut ausgebildete Pferde</li>
                  <li>✓ Solide Grundausbildung vorhanden</li>
                </ul>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Sportpferd">
                <p className="text-xl font-bold text-brand-brown mb-2">8.000€ - 30.000€+</p>
                <p className="text-gray-700 mb-2">Durchschnitt: ~15.000€</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Spezialisierte Ausbildung (Dressur, Springen, Vielseitigkeit)</li>
                  <li>✓ Jüngere Pferde mit nachgewiesenem Potenzial</li>
                  <li>✓ Oft mit Abstammungsnachweisen und Turnierresultaten</li>
                </ul>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Jungpferd (3-4 Jahre)">
                <p className="text-xl font-bold text-brand-brown mb-2">3.000€ - 12.000€</p>
                <p className="text-gray-700 mb-2">Durchschnitt: ~6.000€</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Wenig oder keine Ausbildung</li>
                  <li>✓ Höheres Risiko, aber auch Entwicklungspotenzial</li>
                  <li>✓ Erfordert erfahrenen Ausbilder</li>
                </ul>
              </RatgeberHighlightBox>
            </div>

            {/* Ankaufsuntersuchung (AKU) */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ankaufsuntersuchung (AKU) - Unverzichtbare Investition</h3>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Eine umfassende{' '}
                <Link href="/pferde-ratgeber/aku-pferd" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Ankaufsuntersuchung (AKU)
                </Link>{' '}
                ist unverzichtbar und kostet zwischen 200€ und 800€, abhängig vom Umfang der Untersuchung. Die{' '}
                <Link href="/pferde-ratgeber/aku-pferd/kosten" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Kosten der Ankaufsuntersuchung
                </Link>{' '}
                variieren je nach gewählter Untersuchungsstufe.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Wenn du mehr über den{' '}
                <Link href="/pferde-ratgeber/aku-pferd/ablauf" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Ablauf der Ankaufsuntersuchung
                </Link>{' '}
                erfahren möchtest, kannst du dort alle Details zu den einzelnen Untersuchungsschritten nachlesen.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">AKU-Kosten nach Umfang:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Kleine AKU (Basis-Check)</span>
                  <span className="text-brand-brown font-bold">200€ - 350€</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Große AKU (Standard)</span>
                  <span className="text-brand-brown font-bold">400€ - 600€</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Erweiterte AKU (mit Röntgen)</span>
                  <span className="text-brand-brown font-bold">600€ - 1.000€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Umfassende AKU (inkl. Kardiologie, Endoskopie)</span>
                  <span className="text-brand-brown font-bold">1.000€ - 1.500€+</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Warum ist die AKU so wichtig?</h4>
              <p className="text-gray-700">
                Ein Pferd mit unentdeckten gesundheitlichen Problemen kann langfristig deutlich teurer werden als die einmaligen AKU-Kosten. Chronische Erkrankungen wie Hufrollenentzündung, Atemwegserkrankungen oder Rückenprobleme können zu dauerhaften Tierarztkosten von mehreren Tausend Euro pro Jahr führen.
              </p>
            </div>

            {/* Erstausstattung */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Erstausstattung: Diese Kosten kommen hinzu</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Reitausrüstung (pro Pferd):</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Sattel</span>
                    <span className="font-semibold">500€ - 3.000€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Trense</span>
                    <span className="font-semibold">80€ - 300€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Satteldecke/Schabracke</span>
                    <span className="font-semibold">30€ - 100€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Halfter und Strick</span>
                    <span className="font-semibold">20€ - 60€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Longiergurt und -leine</span>
                    <span className="font-semibold">40€ - 120€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bandagen/Gamaschen</span>
                    <span className="font-semibold">30€ - 100€</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Stallausrüstung:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Putzkiste komplett</span>
                    <span className="font-semibold">80€ - 200€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Decken (Sommer, Winter, Regen)</span>
                    <span className="font-semibold">150€ - 600€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Futtereimer und Tränken</span>
                    <span className="font-semibold">30€ - 80€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mistgabel, Besen, Schaufel</span>
                    <span className="font-semibold">40€ - 100€</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Spartipp</h4>
              <p className="text-gray-700">
                Viele Gegenstände können gebraucht gekauft werden. Online-Plattformen wie ehorses.de, eBay Kleinanzeigen oder spezialisierte Facebook-Gruppen bieten oft gut erhaltene Ausrüstung zu 40-60% des Neupreises.
              </p>
            </div>

            <div className="bg-gradient-to-r from-brand-brown to-amber-800 text-white rounded-lg p-6">
              <h4 className="text-lg font-bold mb-2">Gesamtkosten Erstausstattung</h4>
              <p className="text-2xl font-bold mb-2">1.000€ - 4.660€</p>
              <p className="text-white/90 text-sm">je nach Qualität und ob Neu- oder Gebrauchtkauf</p>
            </div>
          </section>

          {/* Section 2: Monatliche Kosten */}
          <section id="monatliche-kosten" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Monatliche Kosten im Überblick
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die monatlichen Fixkosten sind der größte laufende Posten bei der Pferdehaltung. Diese Ausgaben fallen regelmäßig an und sollten in keinem Monat unterschätzt werden.
              </p>
            </div>

            {/* Stallmiete und Unterbringung */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stallmiete und Unterbringung</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <RatgeberHighlightBox title="Offenstallhaltung">
                <p className="text-xl font-bold text-brand-brown mb-2">150€ - 350€/Monat</p>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <p className="font-semibold text-green-700">Vorteile:</p>
                    <p>Natürliche Sozialkontakte, viel Bewegung, artgerechte Haltung</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700">Nachteile:</p>
                    <p>Weniger Kontrolle über Fütterung, Witterungseinflüsse</p>
                  </div>
                  <p className="font-semibold">Ideal für: Robuste Rassen, Freizeitpferde</p>
                </div>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Boxenhaltung">
                <p className="text-xl font-bold text-brand-brown mb-2">250€ - 600€/Monat</p>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <p className="font-semibold text-green-700">Vorteile:</p>
                    <p>Individuelle Fütterung, geschützte Umgebung, bessere Kontrolle</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700">Nachteile:</p>
                    <p>Weniger Bewegung, höhere Kosten, weniger Sozialkontakte</p>
                  </div>
                  <p className="font-semibold">Ideal für: Sportpferde, empfindliche Pferde</p>
                </div>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Vollpension-Plus (mit Beritt)">
                <p className="text-xl font-bold text-brand-brown mb-2">450€ - 1.200€+/Monat</p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Inkludiert:</strong> Stallmiete, Futter, Pflege, professionelles Training</p>
                  <div>
                    <p className="font-semibold text-green-700">Vorteile:</p>
                    <p>Professionelle Ausbildung, weniger Eigenaufwand</p>
                  </div>
                  <p className="font-semibold">Ideal für: Berufstätige mit wenig Zeit, Jungpferdeausbildung</p>
                </div>
              </RatgeberHighlightBox>
            </div>

            {/* Futter und Einstreu */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Futter und Einstreu</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Grundfutter (Heu, Stroh):</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Heu: 40€ - 80€/Monat (abhängig von Region und Qualität)</li>
                    <li>• Stroh (als Einstreu): 30€ - 60€/Monat</li>
                    <li>• Alternative Einstreu (Späne, Pellets): 40€ - 100€/Monat</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Kraftfutter:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Grundversorgung: 30€ - 80€/Monat</li>
                    <li>• Sportpferd (intensives Training): 80€ - 150€/Monat</li>
                    <li>• Senior-Pferd (Spezialfutter): 60€ - 120€/Monat</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Zusatzfutter und Mineralien:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Mineralfutter: 15€ - 40€/Monat</li>
                    <li>• Öle (z.B. Leinöl): 10€ - 25€/Monat</li>
                    <li>• Kräuter/Ergänzungen: 15€ - 50€/Monat</li>
                  </ul>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-lg font-bold text-gray-900">
                    Gesamtkosten Futter und Einstreu: <span className="text-brand-brown">100€ - 300€/Monat</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Hufpflege */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hufpflege</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Barhuf-Pflege:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Preis: 30€ - 50€ pro Termin</li>
                  <li>Intervall: Alle 6-8 Wochen</li>
                  <li className="font-bold text-brand-brown">Monatliche Kosten: ~40€/Monat</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Hufbeschlag:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Einfacher Beschlag: 80€ - 120€ pro Termin</li>
                  <li>Spezialbeschlag (orthopädisch): 120€ - 200€ pro Termin</li>
                  <li>Intervall: Alle 6-8 Wochen</li>
                  <li className="font-bold text-brand-brown">Monatliche Kosten: 80€ - 150€/Monat</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Wichtiger Hinweis</h4>
              <p className="text-gray-700">
                Regelmäßige Hufpflege ist keine optionale Ausgabe. Vernachlässigte Hufe führen zu schwerwiegenden gesundheitlichen Problemen, die langfristig deutlich teurer werden (Hufgeschwüre, Fehlstellungen, Lahmheiten).
              </p>
            </div>

            {/* Tierarztkosten */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tierarztkosten (Basisversorgung)</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Routineimpfungen (Tetanus, Influenza, Herpes)</span>
                  <span className="font-semibold">~10€/Monat</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Entwurmung (2-4x pro Jahr nach Kotproben)</span>
                  <span className="font-semibold">~8€/Monat</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Zahnkontrolle (jährlich)</span>
                  <span className="font-semibold">~10€/Monat</span>
                </div>
                <div className="pt-2">
                  <p className="text-lg font-bold text-gray-900">
                    Durchschnittliche monatliche Tierarzt-Grundkosten: <span className="text-brand-brown">30€ - 50€/Monat</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-2">WICHTIG</h4>
              <p className="text-gray-700">
                Diese Kosten decken NUR die Grundversorgung. Notfälle, Verletzungen oder chronische Erkrankungen sind hier NICHT enthalten und können schnell mehrere Tausend Euro kosten.
              </p>
            </div>

            {/* Versicherungen */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Versicherungen</h3>
            <div className="space-y-4 mb-8">
              <div className="bg-white border-2 border-red-500 rounded-lg p-6">
                <h4 className="text-lg font-bold text-red-700 mb-2">Haftpflichtversicherung (obligatorisch!)</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Kosten:</strong> 60€ - 120€/Jahr (umgerechnet ~8€/Monat)</p>
                  <p><strong>Deckt ab:</strong> Schäden, die das Pferd Dritten zufügt (z.B. Autounfall)</p>
                </div>
              </div>

              <div className="bg-white border-2 border-amber-500 rounded-lg p-6">
                <h4 className="text-lg font-bold text-amber-700 mb-2">Pferde-OP-Versicherung (dringend empfohlen)</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Kosten:</strong> 150€ - 400€/Jahr (umgerechnet 15€ - 35€/Monat)</p>
                  <p><strong>Deckt ab:</strong> Operationskosten bis zu 10.000€ - 25.000€</p>
                  <p><strong>Beispiele:</strong> Kolik-OP (3.000€ - 8.000€), Fraktur-OP (5.000€ - 15.000€)</p>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Pferdekrankenversicherung (optional)</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Kosten:</strong> 400€ - 1.200€/Jahr (umgerechnet 35€ - 100€/Monat)</p>
                  <p><strong>Deckt ab:</strong> Auch kleinere Tierarztbehandlungen</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-brown to-amber-800 text-white rounded-lg p-6">
              <h4 className="text-lg font-bold mb-2">Monatliche Versicherungskosten gesamt</h4>
              <p className="text-2xl font-bold">25€ - 145€/Monat</p>
            </div>
          </section>

          {/* Section 3: Jährliche Fixkosten */}
          <section id="jaehrliche-kosten" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Jährliche Fixkosten
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Einige Kosten fallen nicht monatlich, sondern jährlich an. Diese sollten in die Gesamtkalkulation einbezogen werden, auch wenn sie nicht jeden Monat zu Buche schlagen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Jährliche Gesundheitschecks</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Impfungen: 80€ - 120€</li>
                  <li>Zahnbehandlung: 80€ - 300€</li>
                  <li>Entwurmung: 60€ - 120€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 380€ - 810€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Equipment-Erneuerung</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Decken (Verschleiß): 100€ - 300€</li>
                  <li>Sattelzeug-Wartung: 50€ - 100€</li>
                  <li>Reparaturen: 30€ - 150€</li>
                  <li>Kleinteile: 50€ - 150€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 230€ - 700€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Versicherungen (Jahresbeitrag)</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Haftpflicht: 60€ - 120€</li>
                  <li>OP-Versicherung: 150€ - 400€</li>
                  <li>Optional Krankenversicherung: 400€ - 1.200€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 210€ - 1.720€/Jahr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Versteckte Kosten */}
          <section id="versteckte-kosten" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Versteckte Kosten, die oft vergessen werden
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Bei der Pferdehaltung gibt es zahlreiche Ausgaben, die in der anfänglichen Kalkulation oft übersehen werden, aber dennoch regelmäßig anfallen.
              </p>
            </div>

            {/* Notfall-Tierarztkosten */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Notfall-Tierarztkosten</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-bold">Kolik-Notfall:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Konservative Behandlung: 200€ - 800€</li>
                    <li>• Operation: 3.000€ - 8.000€</li>
                    <li>• Nachsorge: 500€ - 2.000€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Lahmheitsuntersuchung:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Basis-Check: 100€ - 200€</li>
                    <li>• Röntgen: 150€ - 400€</li>
                    <li>• MRT: 800€ - 1.500€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Wundversorgung:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Einfache Wunde: 80€ - 200€</li>
                    <li>• Komplexe Wunde (mehrere Termine): 300€ - 1.000€+</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-red-300">
                  <p className="font-bold text-red-800">
                    Empfehlung: Eine finanzielle Reserve von mindestens 2.000€ - 5.000€ für Notfälle ist ratsam, selbst mit OP-Versicherung.
                  </p>
                </div>
              </div>
            </div>

            {/* Transport und Mobilität */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transport und Mobilität</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-bold">Anhänger/Transporter:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Kauf Anhänger: 3.000€ - 15.000€ (einmalig)</li>
                    <li>• Wartung/TÜV: 200€ - 500€/Jahr</li>
                    <li>• Versicherung: 150€ - 400€/Jahr</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Transport-Dienstleister:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Lokaler Transport (&lt; 50km): 80€ - 150€</li>
                    <li>• Längere Strecken: 1,50€ - 2,50€ pro km</li>
                    <li>• Notfall-Transport: 200€ - 600€</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weiterbildung und Training */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weiterbildung und Training</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-bold">Reitunterricht:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Einzelstunde: 30€ - 60€</li>
                    <li>• 10er-Karte: 250€ - 500€</li>
                    <li>• Monatlich (1x/Woche): 120€ - 240€/Monat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Kurse und Lehrgänge:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Wochenend-Kurs: 150€ - 400€</li>
                    <li>• Mehrtägiger Lehrgang: 400€ - 1.200€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Beritt (professionelles Training des Pferdes):</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Pro Einheit: 25€ - 50€</li>
                    <li>• Monatlich (3x/Woche): 300€ - 600€/Monat</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Turniere und Freizeitaktivitäten */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Turniere und Freizeitaktivitäten</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-bold">Turnierteilnahme:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Nenngeld: 15€ - 60€ pro Prüfung</li>
                    <li>• Boxenmiete: 30€ - 80€ pro Nacht</li>
                    <li>• Transport: 50€ - 200€</li>
                    <li className="font-bold text-brand-brown">• Gesamt Turnierwochenende: 150€ - 500€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold">Freizeitaktivitäten:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Geländeritt: 30€ - 80€</li>
                    <li>• Kurs/Workshop: 80€ - 250€</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Budget-Szenarien */}
          <section id="budget-szenarien" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Budget-Szenarien: 3 realistische Beispiele
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Um ein besseres Gefühl für die tatsächlichen Gesamtkosten zu bekommen, hier drei realistische Budget-Szenarien basierend auf unterschiedlichen Haltungsformen und Nutzungsarten.
              </p>
            </div>

            {/* Szenario 1 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Szenario 1: Offenstall-Freizeitpferd - 500€/Monat</h3>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Grunddaten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Haltungsform: Offenstall mit Paddock</li>
                  <li>• Pferd: Robustes Freizeitpferd (z.B. Haflinger, Isländer)</li>
                  <li>• Nutzung: 3-4x/Woche Freizeitreiten</li>
                  <li>• Region: Ländlich, moderate Preise</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Monatliche Kosten:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Stallmiete (Offenstall)</span>
                    <span className="font-semibold">180€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Futter (Heu, Mineral)</span>
                    <span className="font-semibold">70€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hufpflege (Barhuf)</span>
                    <span className="font-semibold">40€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tierarzt (Durchschnitt)</span>
                    <span className="font-semibold">35€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versicherung (Haftpflicht + OP)</span>
                    <span className="font-semibold">20€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rücklage Equipment/Notfall</span>
                    <span className="font-semibold">80€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reitunterricht (1x/Monat)</span>
                    <span className="font-semibold">45€</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-green-600 font-bold text-lg">
                    <span>Gesamt:</span>
                    <span className="text-green-700">~470€/Monat</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Jährliche Zusatzkosten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Impfungen/Zahnkontrolle: 280€</li>
                  <li>• Equipment-Ersatz: 200€</li>
                  <li className="font-bold">• Gesamt Jahr: ~5.640€ + 480€ = 6.120€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Für wen geeignet:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>✓ Einsteiger mit solidem Budget</li>
                  <li>✓ Hobbyreiter ohne Turnierambitionen</li>
                  <li>✓ Pferde mit geringen gesundheitlichen Ansprüchen</li>
                </ul>
              </div>
            </div>

            {/* Szenario 2 */}
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Szenario 2: Boxenhaltung Allrounder - 800€/Monat</h3>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Grunddaten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Haltungsform: Boxenhaltung mit Paddock/Weide</li>
                  <li>• Pferd: Sportpferd mittlerer Anspruch (z.B. Warmblut)</li>
                  <li>• Nutzung: Regelmäßiges Training, gelegentliche Turniere</li>
                  <li>• Region: Stadtrand, durchschnittliche Preise</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Monatliche Kosten:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Stallmiete (Box mit Weide)</span>
                    <span className="font-semibold">380€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Futter (Heu, Kraft, Zusatz)</span>
                    <span className="font-semibold">120€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hufpflege (Beschlag)</span>
                    <span className="font-semibold">100€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tierarzt (Durchschnitt)</span>
                    <span className="font-semibold">50€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versicherung (Haftpflicht + OP + Kranken-Basis)</span>
                    <span className="font-semibold">40€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rücklage Equipment/Notfall</span>
                    <span className="font-semibold">100€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reitunterricht (2x/Monat)</span>
                    <span className="font-semibold">90€</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-blue-600 font-bold text-lg">
                    <span>Gesamt:</span>
                    <span className="text-blue-700">~880€/Monat</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Jährliche Zusatzkosten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Impfungen/Zahnkontrolle: 350€</li>
                  <li>• Equipment-Ersatz: 400€</li>
                  <li>• Turniere (4-6x/Jahr): 800€</li>
                  <li className="font-bold">• Gesamt Jahr: ~10.560€ + 1.550€ = 12.110€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Für wen geeignet:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>✓ Ambitionierte Freizeitreiter</li>
                  <li>✓ Gelegenheits-Turnierteilnehmer</li>
                  <li>✓ Reiter mit mittlerem bis gehobenem Budget</li>
                </ul>
              </div>
            </div>

            {/* Szenario 3 */}
            <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Szenario 3: Vollpension Sportpferd - 1.200€+/Monat</h3>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Grunddaten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Haltungsform: Vollpension mit Beritt</li>
                  <li>• Pferd: Leistungssportpferd (z.B. Turnierpferd Dressur/Springen)</li>
                  <li>• Nutzung: Intensives Training, regelmäßige Turniere</li>
                  <li>• Region: Stadtnähe, gehobene Anlage</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Monatliche Kosten:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Stallmiete (Vollpension + Beritt)</span>
                    <span className="font-semibold">700€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Futter (hochwertig, Zusätze)</span>
                    <span className="font-semibold">180€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hufpflege (Spezialbeschlag)</span>
                    <span className="font-semibold">140€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tierarzt (Durchschnitt + Physiotherapie)</span>
                    <span className="font-semibold">150€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versicherung (Haftpflicht + OP + Kranken-Voll)</span>
                    <span className="font-semibold">80€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rücklage Equipment/Notfall</span>
                    <span className="font-semibold">200€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reitunterricht (wöchentlich)</span>
                    <span className="font-semibold">200€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turniere (monatlich 1-2)</span>
                    <span className="font-semibold">150€</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-amber-600 font-bold text-lg">
                    <span>Gesamt:</span>
                    <span className="text-amber-700">~1.800€/Monat</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Jährliche Zusatzkosten:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Impfungen/Zahnkontrolle: 450€</li>
                  <li>• Equipment-Ersatz (hochwertig): 800€</li>
                  <li>• Turniere (15-20x/Jahr): 3.000€</li>
                  <li>• Kurse/Lehrgänge: 1.000€</li>
                  <li className="font-bold">• Gesamt Jahr: ~21.600€ + 5.250€ = 26.850€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Für wen geeignet:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>✓ Professionelle Reiter</li>
                  <li>✓ Turnier-ambitionierte Sportreiter</li>
                  <li>✓ Hohe finanzielle Ressourcen erforderlich</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Regionale Preisunterschiede */}
          <section id="regionale-unterschiede" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Regionale Preisunterschiede in Deutschland
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die Kosten für die Pferdehaltung variieren erheblich zwischen verschiedenen Regionen Deutschlands. Hier eine Übersicht der wichtigsten Preisunterschiede:
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stallmieten nach Regionen</h3>
            <div className="space-y-6 mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Ländliche Regionen (z.B. Mecklenburg-Vorpommern, Brandenburg, Niedersachsen)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">150€ - 280€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">250€ - 450€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">400€ - 800€/Monat</span></li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Stadtnahe Regionen (z.B. Umland Hamburg, München, Köln)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">250€ - 400€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">400€ - 650€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">700€ - 1.500€/Monat</span></li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Ballungsräume (z.B. München, Hamburg, Frankfurt, Stuttgart)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">350€ - 500€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">500€ - 900€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">900€ - 2.000€+/Monat</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hufschmied und Tierarzt</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Ländliche Regionen:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Hufschmied (Beschlag): 70€ - 100€</li>
                  <li>Tierarzt (Routinebesuch): 40€ - 60€ Anfahrt + Behandlung</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Stadtnahe/Ballungsräume:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Hufschmied (Beschlag): 100€ - 150€</li>
                  <li>Tierarzt (Routinebesuch): 60€ - 100€ Anfahrt + Behandlung</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Spartipp</h4>
              <p className="text-gray-700">
                In ländlichen Regionen sind die Lebenshaltungskosten für Pferde durchschnittlich 30-40% niedriger als in Ballungsräumen.
              </p>
            </div>
          </section>

          {/* Section 7: Fazit */}
          <section id="fazit" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fazit: Was kostet ein Pferd wirklich?
            </h2>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Zusammenfassung der Gesamtkosten</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <RatgeberHighlightBox title="Einmalige Anschaffungskosten">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>Pferd: 2.500€ - 20.000€</li>
                  <li>Ankaufsuntersuchung: 200€ - 800€</li>
                  <li>Erstausstattung: 1.000€ - 4.660€</li>
                  <li className="pt-2 border-t border-gray-300 font-bold text-brand-brown">Gesamt: 3.700€ - 20.460€</li>
                </ul>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Monatliche Kosten (Durchschnitt)">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>Basis-Budget (Offenstall): 470€ - 600€/Monat</li>
                  <li>Mittel-Budget (Boxenhaltung): 700€ - 1.000€/Monat</li>
                  <li>Gehoben-Budget (Vollpension/Sport): 1.200€ - 2.000€+/Monat</li>
                </ul>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="Jährliche Gesamtkosten">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>Basis-Budget: 5.640€ - 7.200€/Jahr</li>
                  <li>Mittel-Budget: 8.400€ - 12.000€/Jahr</li>
                  <li>Gehoben-Budget: 14.400€ - 24.000€+/Jahr</li>
                </ul>
              </RatgeberHighlightBox>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Wichtigste Erkenntnisse</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8">
              <ol className="space-y-4 text-gray-700">
                <li className="flex gap-4">
                  <span className="font-bold text-brand-brown text-xl">1.</span>
                  <div>
                    <strong>Anschaffungskosten sind nur der Anfang:</strong> Die laufenden Kosten über 10 Jahre (typische Pferde-Partnerschaft) betragen das 10-20-fache des Kaufpreises.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-brand-brown text-xl">2.</span>
                  <div>
                    <strong>Notfall-Reserve ist essenziell:</strong> Unerwartete Tierarztkosten können schnell 2.000€ - 5.000€ betragen. Eine finanzielle Reserve ist unerlässlich.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-brand-brown text-xl">3.</span>
                  <div>
                    <strong>Regionale Unterschiede beachten:</strong> Zwischen ländlichen und städtischen Regionen liegen bis zu 40% Preisunterschied.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-brand-brown text-xl">4.</span>
                  <div>
                    <strong>Versicherungen sind Pflicht:</strong> Eine OP-Versicherung kann im Ernstfall finanziellen Ruin verhindern (Kolik-OP kostet ohne Versicherung 3.000€ - 8.000€).
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-brand-brown text-xl">5.</span>
                  <div>
                    <strong>Zeitaufwand nicht vergessen:</strong> Neben den finanziellen Kosten sollten 10-20 Stunden/Woche für Pflege, Training und Stallarbeit eingeplant werden.
                  </div>
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ehrliche Selbsteinschätzung</h3>
            <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-8 mb-8">
              <p className="text-gray-700 mb-4">Bevor du dich für ein Pferd entscheidest, stelle dir diese Fragen:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Kann ich dauerhaft 500€ - 1.000€/Monat für das Pferd aufbringen?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Habe ich eine Notfall-Reserve von mindestens 3.000€?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Bin ich bereit, 10-20 Jahre finanzielle Verantwortung zu übernehmen?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Kann ich mir auch bei unerwarteten Kosten (Kolik, Verletzungen) die bestmögliche Versorgung leisten?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Habe ich 10-20 Stunden/Woche Zeit für die Pferdepflege?</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-bold">
                Nur wenn du alle Fragen mit &quot;Ja&quot; beantworten kannst, bist du finanziell und zeitlich für ein eigenes Pferd bereit.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative: Reitbeteiligung</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Wenn das Budget nicht für ein eigenes Pferd reicht, ist eine Reitbeteiligung eine sinnvolle Alternative:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Kosten:</strong> 80€ - 250€/Monat</li>
                <li><strong>Zeitaufwand:</strong> 3-5 Stunden/Woche</li>
                <li><strong>Vorteile:</strong> Geringeres finanzielles Risiko, Flexibilität, trotzdem regelmäßiger Zugang zu einem Pferd</li>
              </ul>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              FAQ - Häufige Fragen zu Pferdekosten
            </h2>
            <FAQ faqs={faqItems} />
          </section>

          {/* Final Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-gray-700">
              <strong>Hinweis:</strong> Du möchtest wissen, was dein Pferd wert ist? Wenn du planst,{' '}
              <Link href="/pferde-ratgeber/pferd-verkaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                dein Pferd zu verkaufen
              </Link>
              , kann eine professionelle Wertermittlung helfen, den fairen Marktpreis zu bestimmen und den Verkaufsprozess zu optimieren.
            </p>
          </div>

          {/* Related Articles */}
          <section className="mb-20">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel"
              articles={relatedArticles}
            />
          </section>
        </article>

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Professionelle Pferdebewertung'
          }}
          title="Wie viel ist dein Pferd wert?"
          description="Nutze unsere KI-gestützte Pferdebewertung für eine professionelle Werteinschätzung in nur 3 Minuten."
          ctaLabel="Jetzt Pferd bewerten"
          ctaHref="/bewertung"
        />
      </main>
    </>
  )
}
