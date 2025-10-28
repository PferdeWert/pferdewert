import { NextPage } from 'next'
import Head from 'next/head'
import { Clock, Calendar, Award, ArrowRight, ChevronDown, AlertCircle } from 'lucide-react'

import Layout from '@/components/Layout'
import FAQ from '@/components/FAQ'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import scrollToSection from '@/utils/ratgeber/scrollToSection'
import { getRatgeberBySlug, getRatgeberPath } from '@/lib/ratgeber-registry'
import { info } from '@/lib/log'
import { createHeroMetaItems } from '@/utils/ratgeber/heroMetaItems'

// SEO Metadata
const seoMetadata = {
  title: 'Pferdemarkt 2025: Online Plattformen & traditionelle Märkte',
  description: 'Pferdemarkt Deutschland 2025: Havelberger Markt mit 200.000 Besuchern, Bietigheim, Online-Plattformen mit 19.000+ Inserate. Tipps für Pferdekauf. Jetzt entdecken!',
  canonical_url: 'https://pferdewert.de/ratgeber/pferdemarkt',
  og_image: 'https://pferdewert.de/images/ratgeber/pferdemarkt-hero.webp',
  og_image_alt: 'Pferdemarkt Deutschland 2025 - Havelberger Pferdemarkt mit Besuchern'
}

// FAQ Items
const pferdemarktFaqItems = [
  {
    question: 'Wann ist der nächste Pferdemarkt in Deutschland?',
    answer: 'Der Havelberger Pferdemarkt, Europas größtes Event, findet jährlich im September statt. 2025 ist der Termin vom 03.-06. September. Der Bietigheimer Pferdemarkt findet 2025 vom 29. August bis 2. September statt. Weitere Märkte: Heilbronn, Leonberg und regionale Events – meist im Herbst.'
  },
  {
    question: 'Was ist der größte Pferdemarkt in Deutschland?',
    answer: 'Der Havelberger Pferdemarkt in Sachsen-Anhalt ist mit etwa 200.000 Besuchern pro Jahr Europas größtes Pferde-Event. Die Tradition reicht bis 1750 zurück. Das Event verbindet klassische Pferdemärkte mit modernem Unterhaltungsangebot: Live-Shows, Springwettbewerbe, Vergnügungspark und Kunsthandwerk.'
  },
  {
    question: 'Wie viele Pferde gibt es auf Online-Pferdemärkten?',
    answer: 'Die größte Online-Plattform Ehorses bietet über 19.000 aktive Inserate von Pferden. Pferde.de bietet mehrere Tausend Inserate. Diese Online-Märkte ermöglichen es, bundesweit zu stöbern, ohne an Markt-Termine gebunden zu sein.'
  },
  {
    question: 'Wie viel kostet ein Pferd auf dem Pferdemarkt?',
    answer: 'Freizeitpferde kosten 500–3.000 Euro je nach Alter und Ausbildung. Einsteiger-Sportpferde: 5.000–12.000 Euro. Hochleistungs-Sportpferde: 15.000–100.000 Euro+. Auf Ehorses siehst du aktuelle Marktpreise. Verhandlungsraum von 10–15% ist üblich bei traditionellen Märkten.'
  },
  {
    question: 'Sollte ich online oder auf traditionellen Märkten kaufen?',
    answer: 'Online-Plattformen (Ehorses, Pferde.de) bieten 19.000+ Inserate, Flexibilität und schnellen Vergleich. Traditionelle Märkte (Havelberg, Bietigheim) ermöglichen Live-Besichtigung, direkten Kontakt zu Züchtern und Verhandlungen vor Ort. Ideal: Online vorrecherchieren, dann zum Markt fahren für Live-Check.'
  }
]

// Related Articles - loaded from registry
const relatedArticlesSlugs = [
  'pferd-kaufen/was-kostet-ein-pferd',
  'pferd-kaufen',
  'aku-pferd'
]

const relatedArticles = relatedArticlesSlugs
  .map(slug => {
    const entry = getRatgeberBySlug(slug)
    if (!entry) return null
    return {
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      title: entry.title,
      description: entry.description,
      readTime: entry.readTime,
      badge: entry.category
    }
  })
  .filter(Boolean) as Array<{
    href: string
    image: string
    title: string
    description: string
    readTime: string
    badge: string
  }>

// Table of Contents Sections
const tableOfContentsSections = [
  { id: 'definition', title: 'Was ist ein Pferdemarkt?' },
  { id: 'top-markets', title: 'Die größten Pferdemärkte Deutschlands' },
  { id: 'online-platforms', title: 'Online-Plattformen' },
  { id: 'regional-markets', title: 'Pferdemärkte nach Region' },
  { id: 'calendar', title: 'Veranstaltungskalender 2025–2026' },
  { id: 'comparison', title: 'Online vs. Traditionelle Märkte' },
  { id: 'purchase-guide', title: 'Tipps für den Pferdekauf' },
  { id: 'faq', title: 'Häufig gestellte Fragen' }
]

// FAST REFRESH FIX: Compute heroMetaItems at module level, not in component
// Creating objects inside component causes infinite reload loop
const heroMetaItems = createHeroMetaItems([
  {
    icon: <Clock className="h-4 w-4" />,
    label: '12 min Lesezeit'
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    label: (
      <span suppressHydrationWarning>
        {new Date().toLocaleDateString('de-DE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </span>
    )
  },
  {
    icon: <Award className="h-4 w-4" />,
    label: 'Experten-Ratgeber'
  }
])

const Pferdemarkt: NextPage = () => {

  const handleTableOfContentsClick = (sectionId: string) => {
    info('Navigating to section:', sectionId)
    scrollToSection(sectionId)
  }

  const handleScrollToToc = () => {
    if (typeof window === 'undefined') return
    document.getElementById('inhaltsverzeichnis')?.scrollIntoView({ behavior: 'smooth' })
  }

  // JSON-LD Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Pferdemarkt 2025: Online Plattformen & traditionelle Märkte',
    'alternativeHeadline': 'Pferdemarkt Deutschland - Havelberger Markt, Bietigheim & Online-Plattformen',
    'description': 'Pferdemarkt Deutschland 2025: Havelberger Markt mit 200.000 Besuchern, Bietigheim, Online-Plattformen mit 19.000+ Inserate. Tipps für Pferdekauf.',
    'image': {
      '@type': 'ImageObject',
      'url': 'https://pferdewert.de/images/ratgeber/pferdemarkt-hero.webp',
      'width': 1200,
      'height': 800
    },
    'author': {
      '@type': 'Organization',
      'name': 'PferdeWert.de Redaktion',
      'url': 'https://pferdewert.de/ueber-uns'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'PferdeWert.de',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://pferdewert.de/logo.png',
        'width': 250,
        'height': 60
      },
      'sameAs': 'https://pferdewert.de'
    },
    'datePublished': '2025-10-25',
    'dateModified': '2025-10-25',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://pferdewert.de/ratgeber/pferdemarkt'
    },
    'articleBody': 'Der Pferdemarkt ist eine faszinierende Tradition in Deutschland mit einer langen Geschichte. In diesem Ratgeber entdeckst du die größten Pferdemärkte Deutschlands, moderne Online-Plattformen mit Tausenden Inseraten, traditionelle Events 2025–2026, und praktische Tipps für deinen Besuch oder Einkauf.',
    'articleSection': 'Ratgeber',
    'keywords': [
      'pferdemarkt',
      'pferdemarkt deutschland',
      'havelberger pferdemarkt',
      'bietigheimer pferdemarkt',
      'online pferdemarkt',
      'ehorses',
      'pferde kaufen'
    ],
    'wordCount': 1725,
    'inLanguage': 'de-DE'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': pferdemarktFaqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://pferdewert.de'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Ratgeber',
        'item': 'https://pferdewert.de/ratgeber'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Pferdemarkt 2025: Online Plattformen & traditionelle Märkte',
        'item': 'https://pferdewert.de/ratgeber/pferdemarkt'
      }
    ]
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seoMetadata.title}</title>
        <meta name="description" content={seoMetadata.description} />
        <meta name="keywords" content="pferdemarkt, pferdemarkt deutschland, pferdemärkte, online pferdemarkt, havelberger pferdemarkt, bietigheimer pferdemarkt" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Technical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5A4B3B" />
        <meta name="msapplication-TileColor" content="#5A4B3B" />

        {/* Canonical and hreflang */}
        <link rel="canonical" href={seoMetadata.canonical_url} />
        <link rel="alternate" hrefLang="de-DE" href={seoMetadata.canonical_url} />

        {/* Open Graph */}
        <meta property="og:title" content={seoMetadata.title} />
        <meta property="og:description" content="Pferdemarkt Deutschland: Entdecke Havelberg (200.000 Besucher), Bietigheim & Online-Plattformen. Praktische Tipps für sicheren Pferdekauf." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seoMetadata.canonical_url} />
        <meta property="og:image" content={seoMetadata.og_image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seoMetadata.og_image_alt} />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferdemarkt 2025: Online & Traditionelle Märkte" />
        <meta name="twitter:description" content="Havelberg, Bietigheim & Online-Plattformen: Finde das richtige Pferd auf 22.200+ monatliche Suchanfragen." />
        <meta name="twitter:image" content={seoMetadata.og_image} />
        <meta name="twitter:creator" content="@pferdewertde" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch for Core Pages */}
        <link rel="prefetch" href="/pferde-preis-berechnen" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
        {/* HERO */}
        <RatgeberHero
          badgeLabel="Pferde-Ratgeber"
          badgeIcon={<Award className="h-4 w-4" />}
          title="Pferdemarkt 2025"
          subtitle="Ob online auf großen Plattformen wie Ehorses mit 19.000+ Inseraten oder auf traditionellen Events wie Havelberg mit 200.000 Besuchern – in diesem Ratgeber entdeckst du alle wichtigen Pferdemärkte Deutschlands 2025–2026, praktische Kauftipps und einen Vergleich der besten Optionen für deinen Pferdekauf."
          metaItems={heroMetaItems}
          primaryCta={{
            href: '/pferde-preis-berechnen',
            label: 'Pferdewert jetzt berechnen',
            icon: <ArrowRight className="w-5 h-5" />
          }}
          secondaryCta={{
            label: 'Zum Inhalt',
            icon: <ChevronDown className="w-5 h-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/pferdemarkt-hero.webp"
          alt="Pferdemarkt Deutschland 2025 - Havelberger Pferdemarkt mit Besuchern"
          priority
          attribution={{
            author: 'Usien',
            license: 'CC BY-SA 3.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
            source: 'Wikimedia Commons'
          }}
        />

        <RatgeberTableOfContents sections={tableOfContentsSections} onNavigate={handleTableOfContentsClick} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">

            {/* 1. Was ist ein Pferdemarkt? */}
            <section id="definition" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Was ist ein Pferdemarkt? Definition & Bedeutung
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Ein Pferdemarkt ist mehr als nur ein Handelsplatz – es ist ein kulturelles Erlebnis mit jahrhundertealter Tradition. Heute vereint der Begriff zwei völlig unterschiedliche Konzepte: traditionelle regionale Märkte und digitale Verkaufsplattformen.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Historische Tradition
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Pferdemärkte haben in Deutschland eine beeindruckende Geschichte. Der <a href="https://www.havelberg.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Havelberger Pferdemarkt</a> etwa existiert seit <strong>1750</strong> – über 270 Jahre kontinuierliche Tradition. Ursprünglich dienten diese Märkte als zentrale Handelsplätze, wo Züchter, Händler und Käufer zusammenkamen, um Pferde zu begutachten, zu verhandeln und zu kaufen.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Regionale Spezialzuchten entstanden um diese Märkte herum: Bayern entwickelte seine Haflinger-Tradition, Baden-Württemberg wurde bekannt für Württemberger Warmblüter, und Nordrhein-Westfalen etablierte sich als Zentrum für Sportpferde-Zucht.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Moderne Funktion heute
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Heute funktioniert der Markt nach dem Dual-System. <strong>Traditionelle Events</strong> sind nach wie vor große Veranstaltungen mit Vergnügungspark-Charakter, Fachausstellungen und direktem Kontakt zu Züchtern. Parallel dazu entstanden <strong>Online-Verkaufsplattformen</strong> wie Ehorses und Pferde.de, die Millionen Pferde-Inserate anbieten.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Diese moderne Struktur gibt dir maximale Flexibilität: Du kannst stöbernd online 19.000+ Pferde vergleichen oder reist zum nächsten großen Event, um Pferde live zu besichtigen.
              </p>
            </section>

            {/* 2. Die größten Pferdemärkte Deutschlands */}
            <section id="top-markets" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Die größten Pferdemärkte Deutschlands 2025–2026
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Deutschland hat mehrere etablierte Top-Events, die Jahr für Jahr Zehntausende Besucher anziehen. Hier sind die wichtigsten Veranstaltungen:
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Havelberger Pferdemarkt – Das größte Event Europas
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Der <a href="https://www.havelberg.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Havelberger Pferdemarkt</a> in Sachsen-Anhalt ist mit etwa <strong>200.000 Besuchern pro Jahr</strong> Europas größtes Pferde-Event. Die Tradition reicht bis <strong>1750</strong> zurück – was diese Veranstaltung zur ältesten kontinuierlich stattfindenden Pferdemesse Europas macht.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Das Event findet jeden <strong>September</strong> statt und verbindet klassische Handelsfunktionen (Verkauf, Zucht-Begutachtung) mit modernem Unterhaltungsangebot: Live-Shows, Springwettbewerbe, Vergnügungspark und Kunsthandwerk. Du kommst nicht nur um zu kaufen, sondern auch um die Pferdekultur zu erleben.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Bietigheimer Pferdemarkt – Baden-Württemberg Tradition
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Der <a href="https://www.bietigheim-bissingen.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bietigheimer Pferdemarkt</a> in Baden-Württemberg ist eines der ältesten Traditionsevents Deutschlands (100+ Jahre Geschichte). <strong>2025 findet die Veranstaltung vom 29. August bis 2. September statt</strong>.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Bietigheim konzentriert sich stärker auf Pferde-Verkauf und Zucht-Shows und ist ideal für spezialisierte Käufer, die Württemberger Warmblüter oder regionale Spezialzuchten suchen.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Weitere renommierte Events
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li><strong>Heilbronn</strong>: 300+ Ausstellerstände, Vergnügungspark, fachliche Ausstellung</li>
                <li><strong>Leonberg</strong> (Februar 2026): Traditionelles württembergisches Event</li>
                <li><strong>Oberhausen</strong>: Moderne Veranstaltung mit über 150 Ausstellern, spezialisiert auf Freizeitpferde</li>
                <li><strong>Karlsruhe</strong>: Regionales Event mit Focus auf Baden-Württemberg Zuchtlinien</li>
                <li><strong>Warendorf</strong>: Deutschlands Pferdehauptstadt (Sportpferde-Zentrum, Reitsport-Hub)</li>
              </ul>
            </section>

            {/* 3. Online-Plattformen */}
            <section id="online-platforms" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Online-Plattformen – Die großen Verkaufsplattformen
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Wenn du zuhause stöbern willst oder zeitlich flexibel sein möchtest, bieten Online-Angebote enorme Vorteile. Hier ist ein Überblick der führenden Plattformen:
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Vergleich der Top-Verkaufsplattformen
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Plattform</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Aktive Inserate</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Gebührenmodell</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Besonderheiten</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-amber-200 px-4 py-3 font-bold text-brand"><a href="https://www.ehorses.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ehorses</a></td>
                      <td className="border border-amber-200 px-4 py-3">19.000+</td>
                      <td className="border border-amber-200 px-4 py-3">Kostenlos + Premium</td>
                      <td className="border border-amber-200 px-4 py-3">Weltgrößter Markt, Mobile App, Filter nach Rasse/Alter/Ausbildung</td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="border border-amber-200 px-4 py-3 font-bold text-brand"><a href="https://www.pferde.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pferde.de</a></td>
                      <td className="border border-amber-200 px-4 py-3">5.000+</td>
                      <td className="border border-amber-200 px-4 py-3">Gebührengestaffelt</td>
                      <td className="border border-amber-200 px-4 py-3">Deutschsprachig, etablierte Plattform, Lokaler Support</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-amber-200 px-4 py-3 font-bold text-brand"><a href="https://www.landwirt.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Landwirt.com</a></td>
                      <td className="border border-amber-200 px-4 py-3">~180</td>
                      <td className="border border-amber-200 px-4 py-3">Gebührenmodell</td>
                      <td className="border border-amber-200 px-4 py-3">Spezialisiert auf Landwirtschaftstiere, regionale Fokus</td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="border border-amber-200 px-4 py-3 font-bold text-brand">BillyRider</td>
                      <td className="border border-amber-200 px-4 py-3">2.000+</td>
                      <td className="border border-amber-200 px-4 py-3">Kostenlos + Premium</td>
                      <td className="border border-amber-200 px-4 py-3">Deutsche Plattform, gute Such-Filter</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-amber-200 px-4 py-3 font-bold text-brand">eBay Kleinanzeigen</td>
                      <td className="border border-amber-200 px-4 py-3">1.000+</td>
                      <td className="border border-amber-200 px-4 py-3">Kostenlos + Premium</td>
                      <td className="border border-amber-200 px-4 py-3">Große Reichweite, viele Privatverkäufer</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Ehorses – Die Top-Plattform mit 19.000+ Inserate
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                <a href="https://www.ehorses.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ehorses.de</a> ist der weltgrößte Online-Markt mit derzeit <strong>über 19.000 aktiven Inseraten</strong>. Die Plattform bietet:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• Kostenlose Inserat-Möglichkeiten (alternativ Premium-Features für bessere Sichtbarkeit)</li>
                <li>• Umfangreiche Such-Filter nach Rasse, Alter, Preis, Ausbildungsstand</li>
                <li>• Internationale Reichweite (nicht nur Deutschland, sondern weltweit)</li>
                <li>• Mobile App für Kaufsuche unterwegs</li>
                <li>• Bewertungssystem für Verkäufer und Käufer</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                Ehorses dominiert die Google-Rankings und ist der Marktführer – für reine Auswahl nicht zu schlagen.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Pferde.de – Klassische deutsche Plattform
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                <a href="https://www.pferde.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pferde.de</a> ist eine traditionelle deutschsprachige Plattform mit <strong>mehreren Tausend aktiven Inseraten</strong>. Die Vorteile:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• Deutschsprachige Fokussierung (hauptsächlich deutsche Verkäufer und Käufer)</li>
                <li>• Etablierte, vertrauenswürdige Plattform seit vielen Jahren</li>
                <li>• Nutzerfreundliches Interface und effektive Suchfunktionen</li>
                <li>• Starke Präsenz im deutschen Markt mit lokalen Regionen-Filtern</li>
                <li>• Deutschsprachiger Kundenservice und Support</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                Für klassische deutsche Pferdekäufe eine sichere Wahl mit etabliertem Ruf.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Weitere spezialisierte Plattformen
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <a href="https://www.landwirt.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Landwirt.com</a>: Spezialisiert auf landwirtschaftliche Tiere, gute regionale Übersicht</li>
                <li>• <strong>Caballo Horsemarket</strong>: International mit Fokus auf Hochleistungspferde</li>
                <li>• <strong>BillyRider</strong>: Deutsche Plattform mit speziellen Suchfiltern</li>
                <li>• <strong>eBay Kleinanzeigen</strong>: Kleinere Auswahl, aber häufig regionale Privat-Verkäufer</li>
              </ul>
            </section>

            {/* 4. Pferdemärkte nach Region */}
            <section id="regional-markets" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Pferdemärkte nach Region – Bayern, Baden-Württemberg & NRW
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Jede Region Deutschlands hat ihre eigenen Pferdemärkte und Spezialzuchten. Hier eine Übersicht:
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Bayern – Haflinger & traditionsreiche Events
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Bayern ist Hochburg der <strong>Haflinger-Zucht</strong> und Zugpferde-Tradition. Regionale Märkte und Auktionen sind häufig, besonders im Herbst rund um München und Augsburg. Wenn du Haflinger oder Freizeitpferde suchst, ist Bayern eine Hochburg mit intensiver Zuchtkultur.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Die bayerischen Pferdemärkte sind bekannt für ihre familienfreundliche Atmosphäre und großes Freizeitangebot neben dem Handel.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Baden-Württemberg – Bietigheim & Leonberg
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Baden-Württemberg ist die Heimat der <strong>Württemberger Warmblüter</strong> und traditionellen Reitkultur:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <a href="https://www.bietigheim-bissingen.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bietigheim</a> (August–September) – Größtes Baden-Württemberg Event</li>
                <li>• <strong>Leonberg</strong> (Februar 2026) – Traditioneller württembergischer Markt</li>
                <li>• Zusätzliche regionale Märkte rund um Stuttgart, Karlsruhe und Heilbronn</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                Ideal für Sportpferde-Käufer, die regionale Spezialzuchten und etablierte Warmblüter-Linien suchen.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Nordrhein-Westfalen & Sachsen-Anhalt – Großereignisse
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <a href="https://www.havelberg.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Havelberg</a> (Sachsen-Anhalt, September) – Das größte Event Europas mit 200.000 Besuchern</li>
                <li>• <strong>Warendorf</strong> (NRW) – Deutschlands Pferdehauptstadt mit internationalem Sportpferde-Zentrum</li>
                <li>• <strong>Oberhausen</strong> (NRW) – Moderne regionale Veranstaltung mit guter Erreichbarkeit</li>
                <li>• Zusätzliche NRW-Märkte in Recklinghausen und anderen Großstädten</li>
              </ul>
            </section>

            {/* 5. Veranstaltungskalender */}
            <section id="calendar" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Pferdemärkte Veranstaltungskalender 2025–2026
              </h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Herbst 2025 – Die Hauptsaison
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Die Herbstmonate sind Hochsaison für Events:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>29. August – 2. September 2025</strong>: <a href="https://www.bietigheim-bissingen.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bietigheimer Pferdemarkt</a> (Baden-Württemberg)</li>
                <li>• <strong>20. September 2025</strong>: Burgdorf Pferdemarkt</li>
                <li>• <strong>September 2025</strong>: <a href="https://www.havelberg.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Havelberger Pferdemarkt</a> (Sachsen-Anhalt, genaues Datum im September)</li>
                <li>• <strong>Oktober–November 2025</strong>: Diverse regionale Herbstmärkte in verschiedenen Bundesländern</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Winter & Frühjahr 2026
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Februar 2026</strong>: Leonberg Pferdemarkt (Baden-Württemberg)</li>
                <li>• <strong>Ganzjährig</strong>: Online-Plattformen (Ehorses, Pferde.de) mit kontinuierlichen neuen Inseraten</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                Für zeitnahe Events empfehlen wir, die offizielle Websites der Regional-Märkte zu besuchen oder lokale Pferdeverbände zu kontaktieren.
              </p>
            </section>

            {/* 6. Online vs. Traditionelle Märkte */}
            <section id="comparison" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Online vs. Traditionelle Märkte – Vor- & Nachteile
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Welcher Weg passt zu dir? Hier ein Vergleich:
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Vorteile Online-Plattformen
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                <a href="https://www.ehorses.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ehorses</a> & <a href="https://www.pferde.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pferde.de</a> bieten:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>19.000+ Inserate zur Auswahl</strong> – deutlich mehr Optionen als physische Events</li>
                <li>• <strong>Zeitersparnis</strong> – vom Sofa aus stöbern, keine Anfahrtswege</li>
                <li>• <strong>Such-Filter</strong> – gezielt nach Rasse, Preis, Ausbildung filtern</li>
                <li>• <strong>Bundesweit vergleichen</strong> – kein Ortszwang</li>
                <li>• <strong>Jederzeit verfügbar</strong> – nicht an Event-Termine gebunden</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Vorteile Traditionelle Events
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Pferde live besichtigen</strong> – Gang, Bewegungen, Charakter persönlich prüfen</li>
                <li>• <strong>Direkter Kontakt zu Züchtern</strong> – Fragen zu Abstammung, Ausbildung, Gesundheit stellen</li>
                <li>• <strong>Verhandlungen vor Ort</strong> – sofort Preisgespräche führen</li>
                <li>• <strong>Tradition & Event-Erlebnis</strong> – Havelberg hat auch Unterhaltung für die Familie</li>
                <li>• <strong>Lokale Spezialisierungen</strong> – Haflinger in Bayern, Warmblüter in Baden-Württemberg</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Tipps für die richtige Wahl
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Große Auswahl nötig?</strong> → Online (Ehorses mit 19.000+)</li>
                <li>• <strong>Spezialzucht suchen?</strong> → Traditionelle Events in der Region</li>
                <li>• <strong>Spontan kaufen?</strong> → Online schneller</li>
                <li>• <strong>Pferd live prüfen wichtig?</strong> → Traditionelle Events essentiell</li>
                <li>• <strong>Kombination?</strong> → Online vorrecherchieren, dann zum Event fahren</li>
              </ul>
            </section>

            {/* 7. Tipps für den Pferdekauf */}
            <section id="purchase-guide" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Tipps für den Pferdekauf – Checkliste & praktische Hinweise
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Ob online oder vor Ort – beim Pferdekauf gibt es einige Punkte zu beachten:
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Preis-Orientierung – Wie viel kostet ein Pferd?
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Die Preise variieren erheblich:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Freizeitpferde</strong>: 500–3.000€ (je nach Alter, Ausbildung)</li>
                <li>• <strong>Einsteiger-Sportpferde</strong>: 5.000–12.000€</li>
                <li>• <strong>Hochleistungs-Sportpferde</strong>: 15.000–100.000€+</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                Auf <a href="https://www.ehorses.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ehorses</a> siehst du aktuelle Marktpreise für deine Wunschrasse. <strong>Verhandlungsraum von 10–15%</strong> ist üblich bei traditionellen Märkten. Detaillierte Informationen zu Pferdekauf-Kosten finden Sie in unserem Ratgeber.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Gesundheits- & Qualitäts-Check
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Bevor du Geld zahlst:
              </p>
              <ol className="text-lg text-gray-700 space-y-2 list-decimal list-inside">
                <li><strong>Tierärztliche Ankaufsuntersuchung</strong> (200–400€) – nicht optional!</li>
                <li><strong>Hufe und Zähne prüfen</strong> – Alter und Gesundheit erkennen</li>
                <li><strong>Gang beobachten</strong> – an der Hand und unter dem Reiter</li>
                <li><strong>Papiere checken</strong> – Stammbuch, Impfpass, Rechnungen</li>
              </ol>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Checkliste vor dem Kaufen
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-brand pl-4">
                  <h4 className="font-bold text-lg mb-2">Vor dem Kauf</h4>
                  <ul className="text-lg text-gray-700 space-y-1">
                    <li>□ Budget festlegen und realistisch halten</li>
                    <li>□ Rasse und Nutzung klar definieren</li>
                    <li>□ Mindestens 3 Kandidaten vergleichen</li>
                    <li>□ Vorbesitzer-Kontakt aufnehmen und fragen</li>
                  </ul>
                </div>

                <div className="border-l-4 border-brand pl-4">
                  <h4 className="font-bold text-lg mb-2">Bei Besichtigung</h4>
                  <ul className="text-lg text-gray-700 space-y-1">
                    <li>□ Pferd in Ruhe beobachten</li>
                    <li>□ Unter Sattel/Geschirr testen lassen</li>
                    <li>□ Mit Vorbesitzer über Besonderheiten sprechen</li>
                    <li>□ Fotografie und Video machen</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Praktische Tipps für Event-Besucher
              </h3>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Anfahrtszeit planen</strong> – Havelberg zieht 200.000 Besucher an, plane mehr Zeit ein</li>
                <li>• <strong>Parkgebühren</strong> – ca. 5-10€ je nach Location</li>
                <li>• <strong>Bequeme Kleidung</strong> – du wirst viel laufen und stehen</li>
                <li>• <strong>Fütterung im Auge behalten</strong> – Wasser und Fütterung für dein Pferd einplanen</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Sicherheit & Fraud-Warnung
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Besonders beim Online-Kauf ist Vorsicht geboten:
              </p>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>• <strong>Niemals Geld vor Besichtigung zahlen</strong></li>
                <li>• <strong>Vorsicht bei unrealistisch niedrigen Preisen</strong> – oft Betrugssignale</li>
                <li>• <strong>Nur mit verifizierten Verkäufern interagieren</strong> – Bewertungen checken</li>
                <li>• <strong>Persönliche Daten schützen</strong> – Adresse/Bankverbindung erst nach Vertrauen teilen</li>
              </ul>

              <RatgeberHighlightBox
                title="Wichtig: Tierärztliche Untersuchung vor dem Kauf"
                icon={<AlertCircle className="h-5 w-5 text-brand-brown" />}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Eine <strong>Ankaufsuntersuchung (AKU)</strong> ist die wichtigste Investition beim Pferdekauf. Sie schützt dich vor versteckten Mängeln und bietet dir rechtliche Sicherheit. Nutze einen unabhängigen Tierarzt und vereinbare einen AKU-Vorbehalt im Kaufvertrag. Detaillierte Informationen findest du in unserem AKU-Ratgeber.
                </p>
              </RatgeberHighlightBox>
            </section>

            {/* 8. Fazit */}
            <section id="takeaways" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Fazit – Dein Weg zum richtigen Pferdemarkt
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Es gibt zwei wirksame Wege, dein Traumpferd zu finden: <strong>Online-Plattformen</strong> wie <a href="https://www.ehorses.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ehorses</a> mit 19.000+ Inseraten bieten maximale Auswahl und Flexibilität. <strong>Traditionelle Events</strong> wie <a href="https://www.havelberg.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Havelberg</a> (200.000 Besucher) geben dir direkten Kontakt zu Züchtern und Live-Besichtigungen.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Unabhängig vom Weg: Eine <strong>tierärztliche Ankaufsuntersuchung</strong>, realistische <strong>Preis-Orientierung</strong> und gründliche <strong>Papier-Prüfung</strong> sind essentiell für einen sicheren Kauf.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Du möchtest wissen, wie viel dein aktuelles Pferd wert ist? Mit unserer <strong>KI-gestützten Bewertung</strong> erhältst du in <strong>2 Minuten</strong> eine datenbasierte Einschätzung – basierend auf echten Marktdaten.
              </p>
            </section>

          </article>

          {/* FAQ Section */}
          <div id="faq" className="mt-16">
            <FAQ faqs={pferdemarktFaqItems} />
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel zum Pferdekauf"
              description="Vertiefen Sie Ihr Wissen mit unseren speziellen Guides zu Pferdekauf-Kosten, Ankaufsuntersuchung und Gesundheitschecks."
              articles={relatedArticles}
            />
          </div>

          {/* Final CTA */}
          <RatgeberFinalCTA
            title="Bereit für den Pferdekauf?"
            description="Nutzen Sie unsere KI-gestützte Pferdebewertung, um den Marktwert Ihres zukünftigen Pferdes zu analysieren. Kombiniert mit einer professionellen Ankaufsuntersuchung erhalten Sie maximale Sicherheit beim Pferdekauf."
            image={{
              src: '/images/shared/blossi-shooting.webp',
              alt: 'KI-gestützte Pferdebewertung für sichere Kaufentscheidungen',
              width: 800,
              height: 600
            }}
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />

        </div>
      </Layout>
    </>
  )
}

export default Pferdemarkt
