import { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import { Calculator, ShieldAlert } from 'lucide-react'
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry'
import { useCountryConfig } from '@/hooks/useCountryConfig'

// Section definitions for Table of Contents
const sections = [
  { id: 'anschaffungskosten', title: 'Anschaffungskosten eines Pferdes' },
  { id: 'pferd-preis-nach-rasse', title: 'Pferdepreise nach Rasse' },
  { id: 'pferdehaltung-kosten-monatlich', title: 'Pferdehaltungskosten monatlich: Komplette Kostenübersicht' },
  { id: 'jaehrliche-kosten', title: 'Pferdekosten jährlich: Jährliche Fixkosten im Detail' },
  { id: 'versteckte-kosten', title: 'Versteckte Kosten, die oft vergessen werden' },
  { id: 'budget-szenarien', title: 'Budget-Szenarien: 3 realistische Beispiele' },
  { id: 'regionale-unterschiede', title: 'Regionale Preisunterschiede für Pferde in Deutschland' },
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
    question: 'Wie viel kostet das günstigste Pferd?',
    answer: 'Das günstigste Pferd kostet zwischen 500€ - 2.000€ und ist meist ein älteres Freizeitpferd oder ein Pferd mit kleineren gesundheitlichen Problemen. Allerdings: Ein billiges Pferd kann teuer werden. Unsichtbare Gesundheitsprobleme können zu Tierarztkosten von 2.000€ - 8.000€+ führen. Eine Ankaufsuntersuchung (AKU) für 200€ - 800€ ist also auch beim günstigen Kauf essentiell. Viele Pferdehalter sparen am falschen Ende: Ein 4.000€ Pferd mit guter AKU ist langfristig günstiger als ein 1.500€ Pferd mit versteckten Erkrankungen. Wir empfehlen: Budget für AKU einplanen (mindestens 400€) und lieber 3.000€+ für ein gesundes, gut ausgebildetes Pferd investieren.'
  },
  {
    question: 'Wie viel kostet ein Reitpony oder Mini-Pferd?',
    answer: 'Ein Reitpony oder Mini-Pferd kostet zwischen 1.500€ - 8.000€ in der Anschaffung, deutlich weniger als ein Warmblut-Pferd (8.000€ - 20.000€+). Die monatlichen Pferdekosten sind auch geringer: Ein Pony benötigt weniger Futter (20-30% weniger als ein Großpferd), die Stallmiete ist oft identisch, aber Ausrüstung ist günstiger. Allerdings: Spezialisierte Reitponys (für Turniere) können 5.000€ - 15.000€ kosten. Faustregel: Mit Pony sparst du 100€ - 200€ monatlich, amortisierst du die "billigere" Anschaffung aber erst nach 5-10 Jahren.'
  },
  {
    question: 'Wie unterscheiden sich Pferdkosten zwischen Offenstall und Vollpension?',
    answer: 'Offenstall/Laufstall: 300€ - 600€/Monat (nur Grundversorgung: Stall, Futter, Wasser). Vollpension: 600€ - 1.200€+/Monat (alles inklusive: tägliche Versorgung, Fütterung, Stallausmisten, Weidegang). Vollpension mit Beritt/Training: 1.200€ - 2.000€+/Monat. Bei der Vollpension sparst du Zeit und Arbeit, bei Offenstall sparst du bis zu 50% der monatlichen Kosten. Allerdings: Eigenständige Pferdehalter unterschätzen versteckte Kosten - Tierarzt-Notfälle, Transport, Reparaturen nehmen schnell 200€ - 500€/Monat zusätzlich in Anspruch. Wähle basierend auf deinem Zeitbudget: Vollpension = weniger Zeit, Offenstall = mehr Eigenarbeit aber günstiger.'
  },
  {
    question: 'Welche versteckten Kosten gibt es bei der Pferdehaltung?',
    answer: 'Die häufigsten versteckten Kosten sind: (1) Notfall-Tierarztkosten von 2.000€ - 8.000€ für Kolik-OPs oder Verletzungen, (2) Equipment-Erneuerung mit 200€ - 700€/Jahr für Decken und Sattelzeug, (3) Transport mit 80€ - 600€ für Tierarzt-Notfälle oder Turniere, (4) Weiterbildung/Reitunterricht mit 120€ - 600€/Monat, (5) Zusatzbehandlungen wie Physiotherapie (60€ - 100€/Termin) oder Osteopathie (80€ - 150€/Termin) und (6) Anhänger-Wartung/TÜV mit 200€ - 500€/Jahr. Wir empfehlen eine monatliche Rücklage von mindestens 100€ - 200€ für unvorhergesehene Kosten.'
  },
  {
    question: 'Ist eine Pferde-Versicherung sinnvoll?',
    answer: 'Ja, Versicherungen sind essenziell. Die Haftpflichtversicherung (60€ - 120€/Jahr) ist OBLIGATORISCH und deckt Schäden ab, die das Pferd Dritten zufügt. Ohne Haftpflicht haftest du unbegrenzt mit deinem Privatvermögen. Eine OP-Versicherung (150€ - 400€/Jahr) ist DRINGEND EMPFOHLEN, da Operationen 3.000€ - 15.000€ kosten können. Die Versicherung deckt bis zu 10.000€ - 25.000€. Eine Kolik-OP kostet z.B. 6.000€, eine Fraktur-OP 12.000€ – ohne Versicherung oft finanzieller Ruin. Eine Krankenversicherung (400€ - 1.200€/Jahr) ist OPTIONAL und lohnt sich meist nur für Pferde mit chronischen Problemen.'
  },
  {
    question: 'Was beeinflusst den Pferdepreis am meisten?',
    answer: 'Der Pferdepreis wird hauptsächlich von 5 Faktoren bestimmt: (1) Ausbildungsstand – ein rohes Jungpferd kostet 3.000€ - 6.000€, während ein turniererfahrenes Sportpferd 15.000€ - 30.000€+ kostet. (2) Rasse – Warmblüter (8.000€ - 20.000€) sind teurer als Freiberger (4.000€ - 8.000€). (3) Alter – Pferde zwischen 5-12 Jahren erzielen Höchstpreise. (4) Gesundheitszustand – eine positive AKU erhöht den Wert um 15-25%. (5) Abstammung – Pferde mit Championatslinien können 50-100% teurer sein. Regional können Preise um 20-30% variieren: Süddeutschland ist teurer als Ostdeutschland.'
  },
  {
    question: 'Wie unterscheiden sich Pferdepreise nach Rasse?',
    answer: 'Pferdepreise variieren stark nach Rasse: Warmblüter (z.B. Hannoveraner, Holsteiner) kosten 8.000€ - 20.000€ für Freizeit/Sport, Spitzensportpferde bis 100.000€+. Quarter Horses liegen bei 6.000€ - 15.000€, spezialisierte Westernpferde bis 30.000€+. Islandpferde kosten 4.000€ - 12.000€, mit Tölt-Champions bis 25.000€+. Haflinger/Freiberger sind günstiger bei 3.000€ - 8.000€, Zuchtpferde bis 15.000€. Ponys starten bei 2.000€ - 6.000€, Turnierpponys bis 20.000€. Vollblüter reichen von 3.000€ (Off-Track) bis 500.000€+ (Spitzenzucht). Der Preis spiegelt Zucht, Ausbildung und Marktnachfrage wider.'
  }
]

// Related articles will be created inside component with useMemo to prevent Fast Refresh loops

// FAST REFRESH FIX: Define icons at module level to prevent recreation on every render
const CALCULATOR_ICON = <Calculator className="w-5 h-5" />
const SHIELD_ALERT_ICON = <ShieldAlert className="h-5 w-5 text-brand-brown" />

// FAST REFRESH FIX: Define onClick handlers at module level
const handleScrollToAnschaffung = () => {
  document.getElementById('anschaffungskosten')?.scrollIntoView({ behavior: 'smooth' })
}

// FAST REFRESH FIX: Define CTA objects at module level
const PRIMARY_CTA = {
  href: '/pferde-preis-berechnen',
  label: 'Jetzt Pferd bewerten',
  icon: CALCULATOR_ICON
}

const SECONDARY_CTA = {
  onClick: handleScrollToAnschaffung,
  label: 'Mehr erfahren'
}

// FAST REFRESH FIX: Define JSON-LD schemas at module level to prevent recreation on every render
// JSON-LD Article Schema
const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Was kostet ein Pferd? Pferd Kosten & Preis 2025 - Vollständige Übersicht',
    description: 'Pferd Kosten 2025: Anschaffung (2.500-20.000€) + monatliche Kosten (400-800€). Pferdepreise nach Rasse, Haltungsform, Versicherung & Tierarzt. Inkl. Budget-Szenarien.',
    url: 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd',
    datePublished: '2025-10-11T10:00:00+01:00',
    dateModified: '2025-10-25T10:00:00+01:00',
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
      'pferd preis',
      'pferd kosten monatlich',
      'pferd kosten tabelle',
      'pferd preis rasse',
      'pferdehaltung kosten',
      'pferd anschaffungskosten',
      'günstigstes pferd',
      'stallmiete',
      'hufschmied kosten',
      'tierarztkosten pferd',
      'pferd versicherung',
      'pferd kaufen kosten',
      'pferdekosten deutschland'
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
const BREADCRUMB_SCHEMA = {
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

export default function WasKostetEinPferd() {
  const { getLocalizedPath } = useCountryConfig()
  // CRITICAL: Related articles MUST be inside component to avoid Next.js cache issues
  const relatedArticles = useMemo(() =>
    getRelatedArticles('was-kostet-ein-pferd').map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    })),
  [])

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        {/* Primary Meta Tags */}
        <title>Pferd Kosten & Preis 2025 - Vollständige Übersicht</title>
        <meta
          name="description"
          content="Pferdekosten 2025: Anschaffung (2.500-20.000€) + monatliche Kosten (400-800€). Pferdepreise nach Rasse, Stallmiete, Futter, Tierarzt & Versicherung kalkulieren."
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
          content="Pferd Kosten & Preis 2025: Vollständige Kostenübersicht inkl. Anschaffung (2.500-20.000€), monatliche Kosten (400-800€), Stallmiete, Futter & Tierarzt."
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
          content="Pferd Kosten & Preis 2025: Vollständige Kostenübersicht inkl. Anschaffung (2.500-20.000€), monatliche Kosten (400-800€), Stallmiete, Futter & Tierarzt."
        />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
        />
      </Head>

      {/* Hero Section */}
      <RatgeberHero
          title="Was kostet ein Pferd?"
          subtitle="Vollständige Kostenübersicht 2025: Von der Anschaffung bis zum monatlichen Unterhalt"
          primaryCta={PRIMARY_CTA}
          secondaryCta={SECONDARY_CTA}
        />

      <RatgeberHeroImage
        src="/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/horse-chestnut-eating-hay-stable-window.webp"
        alt="Was kostet ein Pferd? Kostenübersicht"
        priority
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-5xl mx-auto space-y-16">
        {/* Lead Paragraph */}
        <section className="scroll-mt-32 lg:scroll-mt-40">
          <p className="text-lg text-gray-700 leading-relaxed">
            Pferdekosten sind ein wichtiger Faktor beim Pferdebesitz. Ein Pferd kostet in der Anschaffung zwischen <strong>2.500€ und 20.000€+</strong>, abhängig von Rasse, Alter und Ausbildungsstand. Die <strong>Pferdekosten monatlich</strong> liegen durchschnittlich bei <strong>400€ - 800€</strong>, während die <strong>Pferdekosten jährlich</strong> ohne Anschaffung etwa 5.000€ - 10.000€ betragen. In diesem{' '}
            <Link href="/pferde-ratgeber/pferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
              umfassenden Pferdekauf-Ratgeber
            </Link>{' '}
            erfährst du, wie du ein passendes Pferd findest und worauf du beim Kauf achten solltest.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="scroll-mt-32 lg:scroll-mt-40">
          <RatgeberTableOfContents sections={sections} />
        </section>

        {/* Featured Snippet Box: Pferdekosten auf einen Blick */}
        <RatgeberHighlightBox
          title="Pferdekosten auf einen Blick"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
              <span className="font-semibold text-gray-900">Anschaffungskosten:</span>
              <span className="text-brand-brown font-bold">2.500€ - 20.000€+</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
              <span className="font-semibold text-gray-900">Monatliche Kosten:</span>
              <span className="text-brand-brown font-bold">400€ - 800€</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
              <span className="font-semibold text-gray-900">Jährliche Kosten:</span>
              <span className="text-brand-brown font-bold">5.000€ - 10.000€</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-semibold text-gray-900">Lebenszykluskosten (20 Jahre):</span>
              <span className="text-brand-brown font-bold">100.000€ - 200.000€</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-brand-brown-light">
              Diese Werte sind Richtwerte für Deutschland und können je nach Region, Pferdetyp und individuellen Umständen variieren.
            </p>
          </div>
        </RatgeberHighlightBox>

          {/* Section 1: Anschaffungskosten */}
          <section id="anschaffungskosten" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Anschaffungskosten eines Pferdes
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Anschaffung eines Pferdes ist eine bedeutende finanzielle Entscheidung. Die Kosten variieren stark je nach Rasse, Alter, Ausbildungsstand und gesundheitlichem Zustand des Pferdes. Eine gute Übersicht über aktuelle Marktpreise bietet unser{' '}
                <Link href="/pferde-ratgeber/pferdemarkt" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Pferdemarkt-Ratgeber
                </Link>{' '}
                mit den wichtigsten Online-Plattformen und traditionellen Märkten in Deutschland.
              </p>
            </div>

            {/* Preise nach Pferdetyp */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preise nach Pferdetyp</h3>

            <h4 className="text-xl font-bold text-brand-brown mb-3">Freizeitpferd</h4>
            <p className="text-lg text-gray-700 mb-2"><strong>Preisspanne:</strong> 2.500€ - 8.000€ (Durchschnitt: ~5.000€)</p>
            <ul className="text-lg text-gray-700 space-y-2 mb-8">
              <li>• Geeignet für Anfänger und Hobbyreiter</li>
              <li>• Meist ältere, gut ausgebildete Pferde</li>
              <li>• Solide Grundausbildung vorhanden</li>
            </ul>

            <h4 className="text-xl font-bold text-brand-brown mb-3">Sportpferd</h4>
            <p className="text-lg text-gray-700 mb-2"><strong>Preisspanne:</strong> 8.000€ - 30.000€+ (Durchschnitt: ~15.000€)</p>
            <ul className="text-lg text-gray-700 space-y-2 mb-8">
              <li>
                • Spezialisierte Ausbildung (
                <Link href="/pferde-ratgeber/dressurpferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Dressur
                </Link>
                ,
                <Link href="/pferde-ratgeber/springpferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Springen
                </Link>
                , Vielseitigkeit)
              </li>
              <li>• Jüngere Pferde mit nachgewiesenem Potenzial</li>
              <li>• Oft mit Abstammungsnachweisen und Turnierresultaten</li>
            </ul>

            <h4 className="text-xl font-bold text-brand-brown mb-3">Jungpferd (3-4 Jahre)</h4>
            <p className="text-lg text-gray-700 mb-2"><strong>Preisspanne:</strong> 3.000€ - 12.000€ (Durchschnitt: ~6.000€)</p>
            <ul className="text-lg text-gray-700 space-y-2 mb-12">
              <li>• Wenig oder keine Ausbildung</li>
              <li>• Höheres Risiko, aber auch Entwicklungspotenzial</li>
              <li>• Erfordert erfahrenen Ausbilder</li>
            </ul>

            {/* Ankaufsuntersuchung (AKU) */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ankaufsuntersuchung (AKU) - Unverzichtbare Investition</h3>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
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
              <p className="text-lg text-gray-700 leading-relaxed">
                Wenn du mehr über den{' '}
                <Link href="/pferde-ratgeber/aku-pferd/ablauf" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Ablauf der Ankaufsuntersuchung
                </Link>{' '}
                erfahren möchtest, kannst du dort alle Details zu den einzelnen Untersuchungsschritten nachlesen.
              </p>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-4">AKU-Kosten nach Umfang:</h4>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Untersuchungsart</th>
                  <th className="text-right py-3 px-4 text-lg font-bold text-gray-900">Preisspanne</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Kleine AKU (Basis-Check)</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">200€ - 350€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Große AKU (Standard)</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">400€ - 600€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Erweiterte AKU (mit Röntgen)</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">600€ - 1.000€</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Umfassende AKU (inkl. Kardiologie, Endoskopie)</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">1.000€ - 1.500€+</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <p className="text-lg font-bold text-gray-900 mb-2">Warum ist die AKU so wichtig?</p>
              <p className="text-lg text-gray-700">
                Ein Pferd mit unentdeckten gesundheitlichen Problemen kann langfristig deutlich teurer werden als die einmaligen AKU-Kosten. Chronische Erkrankungen wie Hufrollenentzündung, Atemwegserkrankungen oder Rückenprobleme können zu dauerhaften Tierarztkosten von mehreren Tausend Euro pro Jahr führen.
              </p>
            </div>

            {/* Pferdekaufvertrag */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-lg text-gray-700">
                Nach erfolgreicher AKU solltest du den Kauf rechtssicher mit einem{' '}
                <Link href="/pferde-ratgeber/pferdekaufvertrag" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Pferdekaufvertrag
                </Link>{' '}
                abschließen. Dies schützt beide Parteien und klärt wichtige Details wie Gewährleistung, Rücktrittsbedingungen und vereinbarte Mängel.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Erstausstattung: Diese Kosten kommen hinzu</h3>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Reitausrüstung (pro Pferd):</h4>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Ausrüstung</th>
                  <th className="text-right py-3 px-4 text-lg font-bold text-gray-900">Preisspanne</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Sattel</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">500€ - 3.000€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Trense</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">80€ - 300€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Satteldecke/Schabracke</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">30€ - 100€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Halfter und Strick</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">20€ - 60€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Longiergurt und -leine</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">40€ - 120€</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Bandagen/Gamaschen</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">30€ - 100€</td>
                </tr>
              </tbody>
            </table>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Stallausrüstung:</h4>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Ausrüstung</th>
                  <th className="text-right py-3 px-4 text-lg font-bold text-gray-900">Preisspanne</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Putzkiste komplett</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">80€ - 200€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Decken (Sommer, Winter, Regen)</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">150€ - 600€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Futtereimer und Tränken</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">30€ - 80€</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-lg font-semibold text-gray-800">Mistgabel, Besen, Schaufel</td>
                  <td className="py-3 px-4 text-lg text-brand-brown font-bold text-right">40€ - 100€</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-lg font-bold text-gray-900 mb-2">Spartipp</p>
              <p className="text-lg text-gray-700">
                Viele Gegenstände können gebraucht gekauft werden. Online-Plattformen wie{' '}
                <Link href="/pferde-ratgeber/pferdemarkt" className="text-primary-600 hover:text-primary-700 font-semibold">
                  ehorses.de und weitere Pferdemärkte
                </Link>, eBay Kleinanzeigen oder spezialisierte Facebook-Gruppen bieten oft gut erhaltene Ausrüstung zu 40-60% des Neupreises.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-2"><strong>Gesamtkosten Erstausstattung:</strong></p>
            <p className="text-2xl font-bold text-brand-brown mb-2">1.000€ - 4.660€</p>
            <p className="text-lg text-gray-600 mb-8">je nach Qualität und ob Neu- oder Gebrauchtkauf</p>
          </section>

          {/* Section 2: Pferdepreis nach Rasse */}
          <section id="pferd-preis-nach-rasse" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pferdepreis nach Rasse
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Der Pferdepreis variiert stark je nach Rasse, Ausbildungsstand und Verwendungszweck. Während manche Rassen bereits als Jungpferde höhere Preise erzielen, können gut ausgebildete Turnierpferde deutlich höhere Summen erreichen. Einen aktuellen Überblick über die wichtigsten{' '}
                <Link href="/pferde-ratgeber/pferdemarkt" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Pferdemärkte und Online-Plattformen
                </Link>{' '}
                findest du in unserem Pferdemarkt-Ratgeber. Die folgende Übersicht zeigt realistische Preisspannen für beliebte Pferderassen in Deutschland.
              </p>
            </div>

            <RatgeberHighlightBox
              title="Preisspanne erklärt"
            >
              Die Preise variieren basierend auf Abstammung, Ausbildungsstand, Erfolgen, Gesundheitszustand und individuellen Anlagen. Premium-Blutlinien oder besondere Erfolge können Preise deutlich erhöhen.
            </RatgeberHighlightBox>

            {/* Warmblut Preise */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-12">Warmblut</h3>
            <p className="text-lg text-gray-700 mb-6">
              Deutsche Warmblüter (z.B. Hannoveraner, Oldenburger, Westfalen) sind vielseitige Sport- und Freizeitpferde mit breiter Preisrange je nach Qualität und Ausbildung.
            </p>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Ausbildungsstand</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Preisspanne</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Besonderheiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Jungpferd (1-3 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">3.000€ - 15.000€</td>
                    <td className="p-4 text-gray-700">Abhängig von Abstammung und Körung</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Ausgebildetes Pferd (5-8 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">8.000€ - 35.000€</td>
                    <td className="p-4 text-gray-700">Grundausbildung bis L-Niveau</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900">Turnierpferd (6+ Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">20.000€ - 100.000€+</td>
                    <td className="p-4 text-gray-700">Platzierungen ab S-Niveau, Premium-Blutlinien</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Haflinger Preise */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Haflinger</h3>
            <p className="text-lg text-gray-700 mb-6">
              Haflinger sind robuste, vielseitige Kleinpferde, die sich für Freizeit, Fahrsport und Therapeutisches Reiten eignen. Sie sind in der Anschaffung oft günstiger als Warmblüter.
            </p>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Ausbildungsstand</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Preisspanne</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Besonderheiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Jungpferd (1-3 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">2.000€ - 6.000€</td>
                    <td className="p-4 text-gray-700">Beliebte Freizeitrasse, gutes Preis-Leistungs-Verhältnis</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Ausgebildetes Pferd (5-8 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">5.000€ - 12.000€</td>
                    <td className="p-4 text-gray-700">Reit- und fahrfertig ausgebildet</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900">Turnierpferd (6+ Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">10.000€ - 25.000€</td>
                    <td className="p-4 text-gray-700">Erfolge im Fahrsport oder Distanzreiten</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quarter Horse Preise */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quarter Horse</h3>
            <p className="text-lg text-gray-700 mb-6">
              American Quarter Horses sind wendige Westernpferde mit ausgeprägtem &ldquo;Cow Sense&rdquo;. Sie sind besonders beliebt für Western-Disziplinen wie Reining, Cutting und Trail.
            </p>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Ausbildungsstand</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Preisspanne</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Besonderheiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Jungpferd (1-3 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">3.500€ - 10.000€</td>
                    <td className="p-4 text-gray-700">Amerikanische Blutlinien oft teurer</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Ausgebildetes Pferd (5-8 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">7.000€ - 20.000€</td>
                    <td className="p-4 text-gray-700">Western-Grundausbildung bis fortgeschritten</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900">Turnierpferd (6+ Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">15.000€ - 80.000€+</td>
                    <td className="p-4 text-gray-700">Erfolge in Reining, Cutting oder Western Pleasure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Vollblut Preise */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vollblut</h3>
            <p className="text-lg text-gray-700 mb-6">
              Englische Vollblüter sind temperamentvolle Rennpferde mit hoher Leistungsbereitschaft. Ehemalige Rennpferde können nach Karriereende deutlich günstiger erworben werden.
            </p>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Ausbildungsstand</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Preisspanne</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Besonderheiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Jungpferd (1-3 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">2.000€ - 50.000€+</td>
                    <td className="p-4 text-gray-700">Extrem große Spanne je nach Abstammung</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Ex-Rennpferd umgeschult</td>
                    <td className="p-4 font-bold text-brand-brown">1.500€ - 8.000€</td>
                    <td className="p-4 text-gray-700">Für Vielseitigkeit oder ambitioniertes Freizeitreiten</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900">Turnierpferd (6+ Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">10.000€ - 200.000€+</td>
                    <td className="p-4 text-gray-700">Vielseitigkeit, Galopprennen, Premium-Zuchtpferde</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Friese Preise */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Friese</h3>
            <p className="text-lg text-gray-700 mb-6">
              Friesen sind elegante Barockpferde mit charakteristischer schwarzer Färbung und üppiger Mähne. Sie sind beliebt für Dressur, Fahrsport und barocke Reitkunst.
            </p>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Ausbildungsstand</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Preisspanne</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Besonderheiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Jungpferd (1-3 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">5.000€ - 18.000€</td>
                    <td className="p-4 text-gray-700">Reinrassige Friesen mit Papieren (KFPS)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Ausgebildetes Pferd (5-8 Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">12.000€ - 30.000€</td>
                    <td className="p-4 text-gray-700">Dressur- oder fahrfertig ausgebildet</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900">Turnierpferd (6+ Jahre)</td>
                    <td className="p-4 font-bold text-brand-brown">25.000€ - 80.000€+</td>
                    <td className="p-4 text-gray-700">Dressur-Platzierungen oder Show-Erfolge</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <RatgeberHighlightBox
              title="Wichtig beim Pferdekauf"
            >
              Der Pferdepreis allein sagt nichts über die Gesamtkosten aus. Bedenke immer die laufenden monatlichen Kosten (300-800€), Versicherungen, Tierarzt und unvorhersehbare Ausgaben. Ein günstiges Pferd kann durch hohe Folgekosten teurer werden als ein gut ausgebildetes, gesundes Pferd mit höherem Kaufpreis.
            </RatgeberHighlightBox>
          </section>

          {/* Section 3: Monatliche Kosten */}
          <section id="pferdehaltung-kosten-monatlich" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pferdehaltungskosten monatlich: Komplette Kostenübersicht
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Die <strong>Pferdehaltungskosten</strong> setzen sich aus regelmäßigen monatlichen Fixkosten zusammen, die für den Unterhalt eines Pferdes notwendig sind. Der monatliche Unterhalt eines Pferdes ist der größte laufende Posten in der Pferdehaltung. Mit den richtigen Kenntnissen über die <strong>laufenden Kosten der Pferdehaltung</strong> können Sie ein realistisches Budget für Ihre Pferdehaltung planen und versteckte Ausgaben vermeiden. Diese Ausgaben für die Pferdehaltung fallen regelmäßig an und sollten in keinem Monat unterschätzt werden.
              </p>
            </div>

            {/* Comprehensive Monthly Cost Breakdown Table */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detaillierte Übersicht: Pferdehaltungskosten pro Monat</h3>

              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-900">Kostenposition</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Minimum</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Maximum</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Durchschnitt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Stallmiete & Unterbringung</td>
                    <td className="p-4 font-bold text-brand-brown">150€</td>
                    <td className="p-4 font-bold text-brand-brown">1.200€</td>
                    <td className="p-4 text-gray-700">350€ - 500€</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Futter & Einstreu</td>
                    <td className="p-4 font-bold text-brand-brown">50€</td>
                    <td className="p-4 font-bold text-brand-brown">200€</td>
                    <td className="p-4 text-gray-700">80€ - 120€</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Hufschmied (alle 6-8 Wochen)</td>
                    <td className="p-4 font-bold text-brand-brown">40€</td>
                    <td className="p-4 font-bold text-brand-brown">200€</td>
                    <td className="p-4 text-gray-700">60€ - 120€</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Tierarzt (Routineversorgung)</td>
                    <td className="p-4 font-bold text-brand-brown">30€</td>
                    <td className="p-4 font-bold text-brand-brown">150€</td>
                    <td className="p-4 text-gray-700">50€ - 80€</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-900">Versicherungen (Haftpflicht + OP)</td>
                    <td className="p-4 font-bold text-brand-brown">20€</td>
                    <td className="p-4 font-bold text-brand-brown">100€</td>
                    <td className="p-4 text-gray-700">40€ - 60€</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="p-4 text-gray-900">Gesamtkosten pro Monat</td>
                    <td className="p-4 text-brand-brown">290€</td>
                    <td className="p-4 text-brand-brown">1.850€</td>
                    <td className="p-4 text-blue-600">580€ - 880€</td>
                  </tr>
                </tbody>
              </table>

              <RatgeberHighlightBox
                title="Pferdehaltungskosten auf einen Blick"
              >
                Die durchschnittlichen <strong>Pferdehaltungskosten monatlich</strong> liegen bei <strong>580€ - 880€</strong> für die reguläre Pferdehaltung. Der monatliche Unterhalt eines Pferdes setzt sich aus Stallmiete, Futter, Hufpflege, Tierarzt und Versicherungen zusammen. Budget immer nach oben planen: Unvorhergesehene Tierarztkosten, Zusatzfutter im Winter oder Notfall-Hufbeschlag können die laufenden Kosten der Pferdehaltung schnell erhöhen. Eine Rücklage von mindestens 2.000€ für Notfälle ist essentiell für ein solides Budget für Ihre Pferdehaltung.
              </RatgeberHighlightBox>
            </div>

            {/* Stallmiete und Unterbringung - Converted to semantic comparison table */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stallmiete und Unterbringung</h3>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Stallmiete ist häufig der größte Kostenfaktor in der Pferdehaltung. Die genaue Höhe der Pferdehaltungskosten für die Unterbringung hängt stark von der gewählten Haltungsform ab. Ob Offenstall, Boxenhaltung oder Vollpension – jede Form hat unterschiedliche Auswirkungen auf Ihr Budget für Ihre Pferdehaltung.
              </p>
            </div>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Haltungsform</th>
                    <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Preisspanne</th>
                    <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown mb-2">Offenstallhaltung</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown">150€ - 350€/Monat</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-2 text-lg text-gray-700">
                        <p><strong className="text-green-700">Vorteile:</strong> Natürliche Sozialkontakte, viel Bewegung, artgerechte Haltung</p>
                        <p><strong className="text-red-700">Nachteile:</strong> Weniger Kontrolle über Fütterung, Witterungseinflüsse</p>
                        <p className="text-gray-600"><strong>Ideal für:</strong> Robuste Rassen, Freizeitpferde</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown mb-2">Boxenhaltung</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown">250€ - 600€/Monat</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-2 text-lg text-gray-700">
                        <p><strong className="text-green-700">Vorteile:</strong> Individuelle Fütterung, geschützte Umgebung, bessere Kontrolle</p>
                        <p><strong className="text-red-700">Nachteile:</strong> Weniger Bewegung, höhere Kosten, weniger Sozialkontakte</p>
                        <p className="text-gray-600"><strong>Ideal für:</strong> Sportpferde, empfindliche Pferde</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown mb-2">Vollpension-Plus (mit Beritt)</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown">450€ - 1.200€+/Monat</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-2 text-lg text-gray-700">
                        <p><strong>Inkludiert:</strong> Stallmiete, Futter, Pflege, professionelles Training</p>
                        <p><strong className="text-green-700">Vorteile:</strong> Professionelle Ausbildung, weniger Eigenaufwand</p>
                        <p className="text-gray-600"><strong>Ideal für:</strong> Berufstätige mit wenig Zeit, Jungpferdeausbildung</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Futter und Einstreu - Semantic table structure */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Futter und Einstreu</h3>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Neben der Stallmiete macht das Futter einen großen Teil der laufenden Kosten der Pferdehaltung aus. Die Futterausgaben variieren je nach Pferdetyp, Jahreszeit und Aktivitätsniveau. Eine realistische Planung dieser Pferdehaltungskosten ist für Ihr Budget essentiell.
              </p>
            </div>

            <div className="mb-12">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Grundfutter (Heu, Stroh)</h4>
                  <ul className="space-y-2 text-lg text-gray-700">
                    <li>• Heu: 40€ - 80€/Monat (abhängig von Region und Qualität)</li>
                    <li>• Stroh (als Einstreu): 30€ - 60€/Monat</li>
                    <li>• Alternative Einstreu (Späne, Pellets): 40€ - 100€/Monat</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kraftfutter</h4>
                  <ul className="space-y-2 text-lg text-gray-700">
                    <li>• Grundversorgung: 30€ - 80€/Monat</li>
                    <li>• Sportpferd (intensives Training): 80€ - 150€/Monat</li>
                    <li>• Senior-Pferd (Spezialfutter): 60€ - 120€/Monat</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Zusatzfutter und Mineralien</h4>
                  <ul className="space-y-2 text-lg text-gray-700">
                    <li>• Mineralfutter: 15€ - 40€/Monat</li>
                    <li>• Öle (z.B. Leinöl): 10€ - 25€/Monat</li>
                    <li>• Kräuter/Ergänzungen: 15€ - 50€/Monat</li>
                  </ul>
                </div>

                <div className="pt-4 border-t-2 border-gray-300">
                  <p className="text-xl font-bold text-gray-900">
                    Gesamtkosten Futter und Einstreu: <span className="text-brand-brown">100€ - 300€/Monat</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Hufpflege - Semantic comparison table */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hufpflege</h3>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Die regelmäßige Hufpflege ist ein unverzichtbarer Teil der Pferdehaltungskosten und des monatlichen Unterhalts eines Pferdes. Diese Kosten für den Hufschmied oder die Hufpflege fallen regelmäßig an und sollten nicht in Ihrem Budget für Ihre Pferdehaltung unterschätzt werden.
              </p>
            </div>

            <div className="mb-12">
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Pflegeart</th>
                    <th className="text-left py-3 px-4 text-lg font-bold text-gray-900">Details</th>
                    <th className="text-right py-3 px-4 text-lg font-bold text-gray-900">Monatliche Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown">Barhuf-Pflege</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <ul className="space-y-2 text-lg text-gray-700">
                        <li>• Preis: 30€ - 50€ pro Termin</li>
                        <li>• Intervall: Alle 6-8 Wochen</li>
                      </ul>
                    </td>
                    <td className="py-4 px-4 align-top text-right">
                      <p className="text-xl font-bold text-brand-brown">~40€/Monat</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 align-top">
                      <p className="text-xl font-bold text-brand-brown">Hufbeschlag</p>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <ul className="space-y-2 text-lg text-gray-700">
                        <li>• Einfacher Beschlag: 80€ - 120€ pro Termin</li>
                        <li>• Spezialbeschlag (orthopädisch): 120€ - 200€ pro Termin</li>
                        <li>• Intervall: Alle 6-8 Wochen</li>
                      </ul>
                    </td>
                    <td className="py-4 px-4 align-top text-right">
                      <p className="text-xl font-bold text-brand-brown">80€ - 150€/Monat</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <RatgeberHighlightBox
              title="Wichtiger Hinweis"
              icon={SHIELD_ALERT_ICON}
            >
              <p className="text-base text-gray-700 leading-relaxed">
                Regelmäßige Hufpflege ist keine optionale Ausgabe. Vernachlässigte Hufe führen zu schwerwiegenden gesundheitlichen Problemen, die langfristig deutlich teurer werden (Hufgeschwüre, Fehlstellungen, Lahmheiten).
              </p>
            </RatgeberHighlightBox>

            {/* Tierarztkosten (Basisversorgung) - Semantic list structure */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tierarztkosten (Basisversorgung)</h3>

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Die Tierarztkosten für die Grundversorgung sind ein fester Bestandteil der laufenden Kosten der Pferdehaltung. Diese Ausgaben sind notwendig für die Gesundheit und das Wohlbefinden Ihres Pferdes und sollten in keinem realistischen Budget für Ihre Pferdehaltung fehlen.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-lg text-gray-700">Routineimpfungen (Tetanus, Influenza, Herpes)</span>
                  <span className="font-bold text-lg text-brand-brown">~10€/Monat</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-lg text-gray-700">Entwurmung (2-4x pro Jahr nach Kotproben)</span>
                  <span className="font-bold text-lg text-brand-brown">~8€/Monat</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-lg text-gray-700">Zahnkontrolle (jährlich)</span>
                  <span className="font-bold text-lg text-brand-brown">~10€/Monat</span>
                </div>
                <div className="pt-4 border-t-2 border-gray-300">
                  <p className="text-xl font-bold text-gray-900">
                    Durchschnittliche monatliche Tierarzt-Grundkosten: <span className="text-brand-brown">30€ - 50€/Monat</span>
                  </p>
                </div>
              </div>

              <RatgeberHighlightBox
                title="WICHTIG"
                icon={SHIELD_ALERT_ICON}
              >
                <p className="text-base text-gray-700 leading-relaxed">
                  Diese Kosten decken NUR die Grundversorgung. Notfälle, Verletzungen oder chronische Erkrankungen sind hier NICHT enthalten und können schnell mehrere Tausend Euro kosten.
                </p>
              </RatgeberHighlightBox>
            </div>

            {/* Versicherungen - Semantic structure with importance indicators */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Versicherungen</h3>

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Versicherungen sind ein wichtiger Teil der Pferdehaltungskosten und des monatlichen Unterhalts eines Pferdes. Diese Ausgaben schützen Sie vor unerwarteten finanziellen Belastungen und sollten in Ihrem Budget für Ihre Pferdehaltung berücksichtigt werden. Die laufenden Kosten der Pferdehaltung für Versicherungen variieren je nach Leistungsumfang.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-red-700 mb-3">Haftpflichtversicherung (obligatorisch!)</h4>
                  <div className="space-y-2 text-lg text-gray-700 pl-4 border-l-4 border-red-500">
                    <p><strong>Kosten:</strong> 60€ - 120€/Jahr (umgerechnet ~8€/Monat)</p>
                    <p><strong>Deckt ab:</strong> Schäden, die das Pferd Dritten zufügt (z.B. Autounfall)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-amber-700 mb-3">Pferde-OP-Versicherung (dringend empfohlen)</h4>
                  <div className="space-y-2 text-lg text-gray-700 pl-4 border-l-4 border-amber-500">
                    <p><strong>Kosten:</strong> 150€ - 400€/Jahr (umgerechnet 15€ - 35€/Monat)</p>
                    <p><strong>Deckt ab:</strong> Operationskosten bis zu 10.000€ - 25.000€</p>
                    <p><strong>Beispiele:</strong> Kolik-OP (3.000€ - 8.000€), Fraktur-OP (5.000€ - 15.000€)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Pferdekrankenversicherung (optional)</h4>
                  <div className="space-y-2 text-lg text-gray-700 pl-4 border-l-4 border-gray-300">
                    <p><strong>Kosten:</strong> 400€ - 1.200€/Jahr (umgerechnet 35€ - 100€/Monat)</p>
                    <p><strong>Deckt ab:</strong> Auch kleinere Tierarztbehandlungen</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-300">
                <p className="text-xl font-bold text-gray-900">
                  Monatliche Versicherungskosten gesamt: <span className="text-brand-brown">25€ - 145€/Monat</span>
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Jährliche Fixkosten */}
          <section id="jaehrliche-kosten" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pferdekosten jährlich: Jährliche Fixkosten im Detail
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Einige Kosten fallen nicht monatlich, sondern jährlich an. Diese sollten in die Gesamtkalkulation einbezogen werden, auch wenn sie nicht jeden Monat zu Buche schlagen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">Jährliche Gesundheitschecks</h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>Impfungen: 80€ - 120€</li>
                  <li>Zahnbehandlung: 80€ - 300€</li>
                  <li>Entwurmung: 60€ - 120€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 380€ - 810€/Jahr</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">Equipment-Erneuerung</h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>Decken (Verschleiß): 100€ - 300€</li>
                  <li>Sattelzeug-Wartung: 50€ - 100€</li>
                  <li>Reparaturen: 30€ - 150€</li>
                  <li>Kleinteile: 50€ - 150€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 230€ - 700€/Jahr</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">Versicherungen (Jahresbeitrag)</h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>Haftpflicht: 60€ - 120€</li>
                  <li>OP-Versicherung: 150€ - 400€</li>
                  <li>Optional Krankenversicherung: 400€ - 1.200€</li>
                  <li className="pt-2 border-t border-gray-200 font-bold">Gesamt: 210€ - 1.720€/Jahr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Versteckte Kosten */}
          <section id="versteckte-kosten" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Versteckte Kosten, die oft vergessen werden
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Bei der Pferdehaltung gibt es zahlreiche Ausgaben, die in der anfänglichen Kalkulation oft übersehen werden, aber dennoch regelmäßig anfallen.
              </p>
            </div>

            {/* Notfall-Tierarztkosten - Strategic red box preserved for emergency warning */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-brand-brown mb-4">Notfall-Tierarztkosten</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Kolik-Notfall:</h4>
                  <ul className="text-lg space-y-1 ml-4">
                    <li>• Konservative Behandlung: 200€ - 800€</li>
                    <li>• Operation: 3.000€ - 8.000€</li>
                    <li>• Nachsorge: 500€ - 2.000€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Lahmheitsuntersuchung:</h4>
                  <ul className="text-lg space-y-1 ml-4">
                    <li>• Basis-Check: 100€ - 200€</li>
                    <li>• Röntgen: 150€ - 400€</li>
                    <li>• MRT: 800€ - 1.500€</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Wundversorgung:</h4>
                  <ul className="text-lg space-y-1 ml-4">
                    <li>• Einfache Wunde: 80€ - 200€</li>
                    <li>• Komplexe Wunde (mehrere Termine): 300€ - 1.000€+</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-red-300">
                  <p className="text-lg font-bold text-red-800">
                    Empfehlung: Eine finanzielle Reserve von mindestens 2.000€ - 5.000€ für Notfälle ist ratsam, selbst mit OP-Versicherung.
                  </p>
                </div>
              </div>
            </div>

            {/* Transport und Mobilität */}
            <h3 className="text-2xl font-bold text-brand-brown mb-4">Transport und Mobilität</h3>
            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Anhänger/Transporter:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Kauf Anhänger: 3.000€ - 15.000€ (einmalig)</li>
                  <li>• Wartung/TÜV: 200€ - 500€/Jahr</li>
                  <li>• Versicherung: 150€ - 400€/Jahr</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Transport-Dienstleister:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Lokaler Transport (&lt; 50km): 80€ - 150€</li>
                  <li>• Längere Strecken: 1,50€ - 2,50€ pro km</li>
                  <li>• Notfall-Transport: 200€ - 600€</li>
                </ul>
              </div>
            </div>

            {/* Weiterbildung und Training */}
            <h3 className="text-2xl font-bold text-brand-brown mb-4">Weiterbildung und Training</h3>
            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Reitunterricht:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Einzelstunde: 30€ - 60€</li>
                  <li>• 10er-Karte: 250€ - 500€</li>
                  <li>• Monatlich (1x/Woche): 120€ - 240€/Monat</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Kurse und Lehrgänge:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Wochenend-Kurs: 150€ - 400€</li>
                  <li>• Mehrtägiger Lehrgang: 400€ - 1.200€</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Beritt (professionelles Training des Pferdes):</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Pro Einheit: 25€ - 50€</li>
                  <li>• Monatlich (3x/Woche): 300€ - 600€/Monat</li>
                </ul>
              </div>
            </div>

            {/* Turniere und Freizeitaktivitäten */}
            <h3 className="text-2xl font-bold text-brand-brown mb-4">Turniere und Freizeitaktivitäten</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Turnierteilnahme:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Nenngeld: 15€ - 60€ pro Prüfung</li>
                  <li>• Boxenmiete: 30€ - 80€ pro Nacht</li>
                  <li>• Transport: 50€ - 200€</li>
                  <li className="font-bold text-brand-brown">• Gesamt Turnierwochenende: 150€ - 500€</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Freizeitaktivitäten:</h4>
                <ul className="text-lg space-y-1 text-gray-700 ml-4">
                  <li>• Geländeritt: 30€ - 80€</li>
                  <li>• Kurs/Workshop: 80€ - 250€</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Budget-Szenarien - Keep strategic boxes for important scenarios */}
          <section id="budget-szenarien" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Budget-Szenarien: 3 realistische Beispiele
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Um ein besseres Gefühl für die tatsächlichen Gesamtkosten zu bekommen, hier drei realistische Budget-Szenarien basierend auf unterschiedlichen Haltungsformen und Nutzungsarten.
              </p>
            </div>

            {/* Keep boxes for Budget scenarios as they are strategic summaries */}
            <RatgeberHighlightBox title="Szenario 1: Offenstall-Freizeitpferd - 500€/Monat">
              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-2">Grunddaten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Haltungsform: Offenstall mit Paddock</li>
                  <li>• Pferd: Robustes Freizeitpferd (z.B. Haflinger, Isländer)</li>
                  <li>• Nutzung: 3-4x/Woche Freizeitreiten</li>
                  <li>• Region: Ländlich, moderate Preise</li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-3">Monatliche Kosten:</p>
                <div className="space-y-2 text-lg text-gray-700">
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
                <p className="font-bold text-base text-gray-900 mb-2">Jährliche Zusatzkosten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Impfungen/Zahnkontrolle: 280€</li>
                  <li>• Equipment-Ersatz: 200€</li>
                  <li className="font-bold">• Gesamt Jahr: ~5.640€ + 480€ = 6.120€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-base text-gray-900 mb-2">Für wen geeignet:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>✓ Einsteiger mit solidem Budget</li>
                  <li>✓ Hobbyreiter ohne Turnierambitionen</li>
                  <li>✓ Pferde mit geringen gesundheitlichen Ansprüchen</li>
                </ul>
              </div>
            </RatgeberHighlightBox>

            <div className="mb-8"></div>

            <RatgeberHighlightBox title="Szenario 2: Boxenhaltung Allrounder - 800€/Monat">
              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-2">Grunddaten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Haltungsform: Boxenhaltung mit Paddock/Weide</li>
                  <li>• Pferd: Sportpferd mittlerer Anspruch (z.B. Warmblut)</li>
                  <li>• Nutzung: Regelmäßiges Training, gelegentliche Turniere</li>
                  <li>• Region: Stadtrand, durchschnittliche Preise</li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-3">Monatliche Kosten:</p>
                <div className="space-y-2 text-lg text-gray-700">
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
                <p className="font-bold text-base text-gray-900 mb-2">Jährliche Zusatzkosten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Impfungen/Zahnkontrolle: 350€</li>
                  <li>• Equipment-Ersatz: 400€</li>
                  <li>• Turniere (4-6x/Jahr): 800€</li>
                  <li className="font-bold">• Gesamt Jahr: ~10.560€ + 1.550€ = 12.110€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-base text-gray-900 mb-2">Für wen geeignet:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>✓ Ambitionierte Freizeitreiter</li>
                  <li>✓ Gelegenheits-Turnierteilnehmer</li>
                  <li>✓ Reiter mit mittlerem bis gehobenem Budget</li>
                </ul>
              </div>
            </RatgeberHighlightBox>

            <div className="mb-8"></div>

            <RatgeberHighlightBox title="Szenario 3: Vollpension Sportpferd - 1.200€+/Monat">
              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-2">Grunddaten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Haltungsform: Vollpension mit Beritt</li>
                  <li>• Pferd: Leistungssportpferd (z.B. Turnierpferd Dressur/Springen)</li>
                  <li>• Nutzung: Intensives Training, regelmäßige Turniere</li>
                  <li>• Region: Stadtnähe, gehobene Anlage</li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="font-bold text-base text-gray-900 mb-3">Monatliche Kosten:</p>
                <div className="space-y-2 text-lg text-gray-700">
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
                <p className="font-bold text-base text-gray-900 mb-2">Jährliche Zusatzkosten:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>• Impfungen/Zahnkontrolle: 450€</li>
                  <li>• Equipment-Ersatz (hochwertig): 800€</li>
                  <li>• Turniere (15-20x/Jahr): 3.000€</li>
                  <li>• Kurse/Lehrgänge: 1.000€</li>
                  <li className="font-bold">• Gesamt Jahr: ~21.600€ + 5.250€ = 26.850€/Jahr</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-base text-gray-900 mb-2">Für wen geeignet:</p>
                <ul className="text-lg text-gray-700 space-y-1">
                  <li>✓ Professionelle Reiter</li>
                  <li>✓ Turnier-ambitionierte Sportreiter</li>
                  <li>✓ Hohe finanzielle Ressourcen erforderlich</li>
                </ul>
              </div>
            </RatgeberHighlightBox>
          </section>

          {/* Section 6: Regionale Preisunterschiede */}
          <section id="regionale-unterschiede" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Regionale Preisunterschiede in Deutschland
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Die Kosten für die Pferdehaltung variieren erheblich zwischen verschiedenen Regionen Deutschlands. Hier eine Übersicht der wichtigsten Preisunterschiede:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stallmieten nach Regionen</h3>

            <div className="space-y-8 mb-10">
              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">
                  Ländliche Regionen (z.B. Mecklenburg-Vorpommern, Brandenburg, Niedersachsen)
                </h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">150€ - 280€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">250€ - 450€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">400€ - 800€/Monat</span></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">
                  Stadtnahe Regionen (z.B. Umland Hamburg, München, Köln)
                </h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">250€ - 400€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">400€ - 650€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">700€ - 1.500€/Monat</span></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">
                  Ballungsräume (z.B. München, Hamburg, Frankfurt, Stuttgart)
                </h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex justify-between"><span>Offenstall:</span><span className="font-semibold">350€ - 500€/Monat</span></li>
                  <li className="flex justify-between"><span>Boxenhaltung:</span><span className="font-semibold">500€ - 900€/Monat</span></li>
                  <li className="flex justify-between"><span>Vollpension:</span><span className="font-semibold">900€ - 2.000€+/Monat</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hufschmied und Tierarzt</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">
                  Ländliche Regionen
                </h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>Hufschmied (Beschlag): 70€ - 100€</li>
                  <li>Tierarzt (Routinebesuch): 40€ - 60€ Anfahrt + Behandlung</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-brown mb-4">
                  Stadtnahe/Ballungsräume
                </h4>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>Hufschmied (Beschlag): 100€ - 150€</li>
                  <li>Tierarzt (Routinebesuch): 60€ - 100€ Anfahrt + Behandlung</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-lg font-bold text-gray-900 mb-2">Spartipp</p>
              <p className="text-lg text-gray-700">
                In ländlichen Regionen sind die Lebenshaltungskosten für Pferde durchschnittlich 30-40% niedriger als in Ballungsräumen.
              </p>
            </div>
          </section>

          {/* Section 7: Fazit - Keep strategic summary boxes */}
          <section id="fazit" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fazit: Was kostet ein Pferd wirklich?
            </h2>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Zusammenfassung der Gesamtkosten</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border-l-4 border-brand-brown rounded-lg p-6 shadow-sm">
                <p className="text-xl font-bold text-brand-brown mb-4">Einmalige Anschaffungskosten</p>
                <ul className="text-lg text-gray-700 space-y-2">
                  <li>Pferd: 2.500€ - 20.000€</li>
                  <li>Ankaufsuntersuchung: 200€ - 800€</li>
                  <li>Erstausstattung: 1.000€ - 4.660€</li>
                  <li className="pt-2 border-t border-gray-300 font-bold text-brand-brown">Gesamt: 3.700€ - 20.460€</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand-brown rounded-lg p-6 shadow-sm">
                <p className="text-xl font-bold text-brand-brown mb-4">Monatliche Kosten (Durchschnitt)</p>
                <ul className="text-lg text-gray-700 space-y-2">
                  <li>Basis-Budget (Offenstall): 470€ - 600€/Monat</li>
                  <li>Mittel-Budget (Boxenhaltung): 700€ - 1.000€/Monat</li>
                  <li>Gehoben-Budget (Vollpension/Sport): 1.200€ - 2.000€+/Monat</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand-brown rounded-lg p-6 shadow-sm">
                <p className="text-xl font-bold text-brand-brown mb-4">Jährliche Gesamtkosten</p>
                <ul className="text-lg text-gray-700 space-y-2">
                  <li>Basis-Budget: 5.640€ - 7.200€/Jahr</li>
                  <li>Mittel-Budget: 8.400€ - 12.000€/Jahr</li>
                  <li>Gehoben-Budget: 14.400€ - 24.000€+/Jahr</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Wichtigste Erkenntnisse</h3>
            <ol className="space-y-4 text-lg text-gray-700 mb-8">
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

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ehrliche Selbsteinschätzung</h3>
            <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-700 mb-4">Bevor du dich für ein Pferd entscheidest, stelle dir diese Fragen:</p>
              <ul className="space-y-3 text-lg text-gray-700">
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
              <p className="text-lg text-gray-700 mt-4 font-bold">
                Nur wenn du alle Fragen mit &quot;Ja&quot; beantworten kannst, bist du finanziell und zeitlich für ein eigenes Pferd bereit. Weitere wichtige Aspekte zur Vorbereitung findest du in unserem{' '}
                <Link href="/pferde-ratgeber/pferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Pferdekauf-Ratgeber
                </Link>
                .
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative: Reitbeteiligung</h3>
            <p className="text-lg text-gray-700 mb-4">
              Wenn das Budget nicht für ein eigenes Pferd reicht, ist eine Reitbeteiligung eine sinnvolle Alternative:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Kosten:</strong> 80€ - 250€/Monat</li>
              <li><strong>Zeitaufwand:</strong> 3-5 Stunden/Woche</li>
              <li><strong>Vorteile:</strong> Geringeres finanzielles Risiko, Flexibilität, trotzdem regelmäßiger Zugang zu einem Pferd</li>
            </ul>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="mb-20 scroll-mt-32 lg:scroll-mt-40">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufige Fragen"
              sectionSubtitle="Schnelle Antworten zu Kaufpreis, monatlichen Kosten und versteckten Ausgaben"
            />
          </section>


          {/* Related Articles */}
          <section className="mb-20">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel"
              articles={relatedArticles}
            />
          </section>
        </article>

        {/* Final CTA - CORRECTED */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Professionelle Pferdebewertung'
          }}
          title="Wie viel ist dein Pferd wert?"
          description="Nutze unsere KI-gestützte Pferdebewertung für eine professionelle Werteinschätzung in nur 2 Minuten."
          ctaLabel="Jetzt Pferdewert berechnen"
          ctaHref="/pferde-preis-berechnen"
        />
      </div>
    </Layout>
  )
}
