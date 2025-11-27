import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Award, ShieldAlert, TrendingUp, FileText, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles, { RatgeberRelatedArticle } from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import LocalizedLink from '@/components/LocalizedLink';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';

// SEO Metadata (DE/AT/CH)
const seoMetadata = {
  "phase": "5A",
  "primary_keyword": "haflinger kaufen",
  "timestamp": "2025-11-27T12:00:00Z",
  "slug": "haflinger-kaufen",
  "locales": {
    "de": {
      "metadata": {
        "title": "Haflinger kaufen: Kompletter Guide mit Preisen & Tipps",
        "description": "Haflinger kaufen leicht gemacht: Marktpreise (€4.900 Median), Rassen-Übersicht, Kosten & Betrugsschutz. Schritt-für-Schritt Anleitung für Anfänger & Profis.",
        "keywords": "haflinger kaufen, haflinger preis, haflinger pferd kaufen, haflinger kosten, haflinger anschaffung",
        "canonical_url": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen",
        "robots": "index, follow"
      },
      "open_graph": {
        "og:title": "Haflinger kaufen: Kompletter Guide mit Preisen",
        "og:description": "Haflinger kaufen: Marktpreise, Rassen-Unterschiede, Kostenrechnung & sichere Kaufabwicklung von Experten erklärt.",
        "og:type": "article",
        "og:url": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen",
        "og:site_name": "PferdeWert.de",
        "og:locale": "de_DE",
        "og:image": "https://pferdewert.de/images/ratgeber/haflinger-kaufen.webp"
      },
      "twitter_card": {
        "twitter:card": "summary_large_image",
        "twitter:title": "Haflinger kaufen: Kompletter Guide",
        "twitter:description": "Marktpreise, Rassen-Unterschiede, Kostenrechnung & sichere Kaufabwicklung.",
        "twitter:site": "@PferdeWert"
      }
    },
    "at": {
      "metadata": {
        "title": "Haflinger kaufen in Österreich: Ratgeber 2025",
        "description": "Haflinger kaufen in Österreich: Marktpreise (€4.900 Median), Züchter-Tipps & Betrugsschutz. Kompletter Ratgeber für österreichische Käufer.",
        "keywords": "haflinger kaufen österreich, haflinger kaufen tirol, haflinger züchter österreich, haflinger kosten österreich",
        "canonical_url": "https://pferdewert.at/pferde-ratgeber/haflinger-kaufen",
        "robots": "index, follow"
      },
      "open_graph": {
        "og:title": "Haflinger kaufen in Österreich: Ratgeber",
        "og:description": "Haflinger kaufen in Österreich: Marktpreise, Züchter-Tipps, Betrugsschutz & sichere Abwicklung für österreichische Käufer.",
        "og:type": "article",
        "og:url": "https://pferdewert.at/pferde-ratgeber/haflinger-kaufen",
        "og:site_name": "PferdeWert.at",
        "og:locale": "de_AT",
        "og:image": "https://pferdewert.at/images/ratgeber/haflinger-kaufen.webp"
      },
      "twitter_card": {
        "twitter:card": "summary_large_image",
        "twitter:title": "Haflinger kaufen in Österreich",
        "twitter:description": "Marktpreise, Züchter-Tipps & Betrugsschutz für österreichische Käufer.",
        "twitter:site": "@PferdeWert"
      }
    },
    "ch": {
      "metadata": {
        "title": "Haflinger kaufen Schweiz: Ratgeber 2025",
        "description": "Haflinger kaufen in der Schweiz: Preise (CHF 5.200 Median), Züchter & Betrugsschutz. Schweizer Ratgeber für sichere Pferdekäufe.",
        "keywords": "haflinger kaufen schweiz, haflinger kaufen graubünden, haflinger züchter schweiz, haflinger kosten schweiz",
        "canonical_url": "https://pferdewert.ch/pferde-ratgeber/haflinger-kaufen",
        "robots": "index, follow"
      },
      "open_graph": {
        "og:title": "Haflinger kaufen Schweiz: Ratgeber",
        "og:description": "Haflinger kaufen Schweiz: CHF 5.200 Median, Züchter-Tipps, Betrugsschutz & sichere Abwicklung für Schweizer Käufer.",
        "og:type": "article",
        "og:url": "https://pferdewert.ch/pferde-ratgeber/haflinger-kaufen",
        "og:site_name": "PferdeWert.ch",
        "og:locale": "de_CH",
        "og:image": "https://pferdewert.ch/images/ratgeber/haflinger-kaufen.webp"
      },
      "twitter_card": {
        "twitter:card": "summary_large_image",
        "twitter:title": "Haflinger kaufen Schweiz",
        "twitter:description": "CHF 5.200 Median, Züchter-Tipps & Betrugsschutz für Schweizer Käufer.",
        "twitter:site": "@PferdeWert"
      }
    }
  },
  "hreflang": [
    {
      "hreflang": "de",
      "href": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen"
    },
    {
      "hreflang": "de-AT",
      "href": "https://pferdewert.at/pferde-ratgeber/haflinger-kaufen"
    },
    {
      "hreflang": "de-CH",
      "href": "https://pferdewert.ch/pferde-ratgeber/haflinger-kaufen"
    },
    {
      "hreflang": "x-default",
      "href": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen"
    }
  ],
  "shared": {
    "twitter:creator": "@PferdeWert",
    "og:image:width": 1200,
    "og:image:height": 630,
    "og:image:type": "image/webp"
  }
};

// Schema Markup
const schemaArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Haflinger kaufen: Kompletter Guide mit Preisen & Tipps",
  "description": "Haflinger kaufen leicht gemacht: Marktpreise (€4.900 Median), Rassen-Übersicht, Kosten & Betrugsschutz. Schritt-für-Schritt Anleitung für Anfänger & Profis.",
  "image": "https://pferdewert.de/images/ratgeber/haflinger-kaufen.webp",
  "author": {
    "@type": "Organization",
    "name": "PferdeWert.de Redaktion",
    "url": "https://pferdewert.de/ueber-uns"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "datePublished": "2025-11-27",
  "dateModified": "2025-11-27",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen"
  },
  "keywords": "haflinger kaufen, haflinger preis, haflinger pferd kaufen, haflinger kosten, haflinger anschaffung",
  "wordCount": 3833,
  "isAccessibleForFree": true
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": "https://pferdewert.de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pferde-Ratgeber",
      "item": "https://pferdewert.de/pferde-ratgeber"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Haflinger kaufen",
      "item": "https://pferdewert.de/pferde-ratgeber/haflinger-kaufen"
    }
  ]
};

// FAQ Items (from schema-faq.json)
const faqItems = [
  {
    question: "Wie viel kostet ein guter Haflinger?",
    answer: "Der Median-Preis liegt bei €4.900 basierend auf 250+ ehorses-Angeboten. Die Spanne reicht von €850 (junges, ungezähmtes Pferd) bis €20.000+ (Show-quality). Die meisten zahlen €4.000-7.000 für einen zuverlässigen Freizeit-Haflinger. Addiere €1.200-1.700 monatlich für Haltungskosten."
  },
  {
    question: "Ist ein Haflinger ein gutes Anfängerpferd?",
    answer: "Ja – wenn 'Anfänger' bedeutet 'du hast 5+ Jahre Reitstunden genommen'. Haflingerpferde sind gutmütig, intelligent und vergebend, aber sie sind nicht 'Push-Button-Horses'. Sie testen Reiter mit schwacher Führung und werden störrisch. Ein kompletter Anfänger mit 3 Lektionen ist zu früh."
  },
  {
    question: "Kann ein Haflinger 90 kg tragen?",
    answer: "Ja, die meisten Standard-Haflingerpferde (450+ kg) können Reiter bis 90-100 kg sicher tragen. Die Regel: 10-20% des Pferd-Körpergewichts = sichere Last. Ein Edelbluthaflinger trägt 80-90 kg sicherer. Sattelpassung und Trainingsstand sind kritisch."
  },
  {
    question: "Wie lange lebt ein Haflinger?",
    answer: "Durchschnittlich 25-30 Jahre. Manche leben bis 40+. Das ist eine 25-35 Jahre Verpflichtung mit €360.000+ Gesamtkosten über die Lebensdauer. Plan accordingly mit realistischen Erwartungen."
  },
  {
    question: "Welche Gesundheitsprobleme haben Haflingerpferde?",
    answer: "Das Hauptproblem ist SCC (Squamous Cell Carcinoma) – Augen-Krebs bei light-colored Pferden. Die Häufigkeit: 2-3% bei Haflingerpferden. Ein ophthalmologisches Screening (€300-500) ist empfohlen. Dysplasia ist praktisch nicht vorhanden (robuste Rasse)."
  },
  {
    question: "Züchter, Marketplace oder Privatverkauf – wo kaufe ich sicher?",
    answer: "Züchter: Höchste Qualität, Gesundheitsgarantie, aber teuer (€8.000+). Marketplace (ehorses): 250+ Optionen, gute Preise, aber höheres Betrugs-Risiko – verifiziere den Seller. Privatverkauf: €2.000+ Ersparnisse, aber NULL Schutz – vet-Inspektionen sind non-negotiable."
  },
  {
    question: "Was ist ein Edelbluthaflinger? Unterschied zum Standard?",
    answer: "Edelbluthaflinger sind mit Arabischem Blut gekreuzt – leichter, athletischer, eleganter. Standard-Haflingerpferde sind das Original – robuster, stärker, bessere Lastträger. Preis: Edelblut €6.000-15.000+, Standard €2.500-8.000. Wähle je nach dein Reiter-Profil."
  },
  {
    question: "Kann ich mit 100 kg ein Haflinger reiten?",
    answer: "Ja, aber wähle einen großen Standard-Haflinger (450+ kg, spezial-ausgebildet). Kosten: €6.000-9.000+. Zusatzkosten: spezielle Sattel (€3.000), regelmäßige vet-Checks, limitierte Rittdistanzen. Ein Edelbluthaflinger ist für 100+ kg nicht ideal."
  }
];

// Table of Contents
const sections = [
  { id: "overview", title: "Haflinger Pferde – Das solltest du wissen" },
  { id: "kosten", title: "Was kostet ein Haflinger?" },
  { id: "anfaenger", title: "Ist ein Haflinger das richtige Anfängerpferd?" },
  { id: "gewicht", title: "Haflinger Gewichtskapazität" },
  { id: "kaufprozess", title: "Haflinger Kaufprozess" },
  { id: "zuechter-marketplace", title: "Züchter vs. Marketplace vs. Privatverkauf" },
  { id: "vet-checks", title: "Tierärztliche Inspektionen" },
  { id: "lebensdauer", title: "Haflinger Lebensdauer & Langzeitpflege" },
  { id: "betrug", title: "Online-Betrug erkennen" },
  { id: "faq", title: "Häufig gestellte Fragen" }
];

export default function HaflingerKaufenPage() {
  const { locale } = useRouter();
  const localeData = seoMetadata.locales[locale as keyof typeof seoMetadata.locales] || seoMetadata.locales.de;

  // Related Articles - automatically fetched from registry based on relatedSlugs
  const relatedArticles: RatgeberRelatedArticle[] = getRelatedArticles('haflinger-kaufen').map(entry => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description
  }));

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        {/* Basic Meta Tags */}
        <title>{localeData.metadata.title}</title>
        <meta name="description" content={localeData.metadata.description} />
        <meta name="robots" content={localeData.metadata.robots} />
        <link rel="canonical" href={localeData.metadata.canonical_url} />

        {/* hreflang Tags für alle drei Märkte */}
        {seoMetadata.hreflang.map((link) => (
          <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={localeData.open_graph['og:title']} />
        <meta property="og:description" content={localeData.open_graph['og:description']} />
        <meta property="og:type" content={localeData.open_graph['og:type']} />
        <meta property="og:url" content={localeData.open_graph['og:url']} />
        <meta property="og:locale" content={localeData.open_graph['og:locale']} />
        <meta property="og:site_name" content={localeData.open_graph['og:site_name']} />
        <meta property="og:image" content={localeData.open_graph['og:image']} />
        <meta property="og:image:width" content={String(seoMetadata.shared['og:image:width'])} />
        <meta property="og:image:height" content={String(seoMetadata.shared['og:image:height'])} />
        <meta property="og:image:type" content={seoMetadata.shared['og:image:type']} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={localeData.twitter_card['twitter:card']} />
        <meta name="twitter:title" content={localeData.twitter_card['twitter:title']} />
        <meta name="twitter:description" content={localeData.twitter_card['twitter:description']} />
        <meta name="twitter:site" content={localeData.twitter_card['twitter:site']} />
        <meta name="twitter:creator" content={seoMetadata.shared['twitter:creator']} />

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
        />
      </Head>

      {/* Hero Section */}
      <RatgeberHero
        badgeIcon={<Award className="h-4 w-4" />}
        badgeLabel="Kompletter Kaufratgeber"
        title="Haflinger kaufen: Anleitung für Anfänger & erfahrene Reiter"
        subtitle="Du träumst von deinem eigenen Haflinger? Diese robusten, zuverlässigen Pferde sind perfekt für Anfänger – aber nur wenn du weißt, worauf du beim Kauf achten musst. Ein Haflinger ist eine langfristige Investition (25-30 Jahre!), und die richtige Wahl kann dir sehr viel Geld bei den Folgekosten sparen."
        primaryCta={{
          label: "Jetzt Pferdewert berechnen",
          href: "/pferde-preis-berechnen"
        }}
        secondaryCta={{
          label: "Zum Inhalt"
        }}
      />

      {/* Hero Image
          Source: Wikimedia Commons
          URL: https://commons.wikimedia.org/wiki/File:Haflinger_(Röbel).JPG
          License: CC BY-SA 3.0
          Author: Bea1965
      */}
      <RatgeberHeroImage
        src="/images/ratgeber/haflinger-roebel.webp"
        alt="Haflinger Pferd - charakteristische blonde Mähne und goldene Fuchs-Färbung"
        priority={true}
      />

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-12">
        <RatgeberTableOfContents sections={sections} />
      </div>

      {/* Main Content */}
      <article id="content" className="max-w-4xl mx-auto px-4 md:px-6 mt-12 space-y-16">

        {/* Section 1: Haflinger Pferde Overview */}
        <section id="overview" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Haflinger Pferde – Das solltest du vor dem Kauf wissen
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Dieser umfassende Leitfaden behandelt alles: Haflinger-Charakteristiken, realistische Kostenkalkulation (Kaufpreis + monatliche Ausgaben), Schritt-für-Schritt Kaufprozess, Gesundheitschecks, und wie du seriöse Anbieter identifizierst. Am Ende wirst du genau wissen, ob ein Haflinger zu dir passt – und wie du den perfekten Kandidaten findest.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Die Geschichte des Haflingers – Gebirgspferd aus Südtirol
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Haflinger stammt aus Südtirol und hat eine faszinierende Geschichte. Die moderne Zucht begann 1874 mit dem Hengst &ldquo;El Bedavi XXII&rdquo;, der die Grundlage für alle heutigen Haflingerpferde bildet. Diese Rasse wurde speziell für die anspruchsvolle bergige Landschaft Südtirols entwickelt – trittsicher, robust und zuverlässig.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Südtiroler Haflinger Pferdezuchtverband pflegt diese Zuchtstandards bis heute. Wichtig zu wissen: Ein echter Haflinger ist im Zuchtbuch registriert. Das garantiert dir Authentizität und eine gewisse Gesundheitsqualität.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Was macht Haflinger besonders? – Charakter & Eigenschaften
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">Was ist das Besondere an einem Haflinger? Diese Pferde begeistern durch ihre charakteristische Kombination: Sie sind gutmütig, menschenbezogen, intelligent und arbeitsfreudig. Das macht sie zu idealen Partnern für Anfänger – mit einem großen &quot;aber&quot;.
          </p>

          <RatgeberHighlightBox
            title="Haflingerpferde sind KEINE 'Push-Button-Horses'"
            icon={<AlertTriangle className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-base text-gray-700 leading-relaxed">
              Sie testen ihre Reiter und brauchen konsistente, selbstsichere Führung. Diese Intelligenz ist ein Segen und eine Herausforderung zugleich. Ein Haflinger vergisst schlechte Reiterei – er wird nur aufmüpfig.
            </p>
          </RatgeberHighlightBox>

          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            Optisch sind Haflingerpferde unverwechselbar: helle Mähne, Fuchs-Färbung (rotbraun mit hellerer Mähne), kräftige Statur, starke Hufe. Die Rasse ist äußerst vielseitig – als Reitpferd, Zuchtstute, Fahrpferd oder Geländepferd.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Standard Haflinger vs. Edelbluthaflinger – Was ist der Unterschied?
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            Es gibt zwei distinkte Typen: Den <strong>Standard-Haflinger</strong> (robust, kräftig, 420-450 kg) und den <strong>Edelbluthaflinger</strong> (leichter, athletischer, oft mit Arabischem Blut gekreuzt, 380-420 kg).
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">Der Standard ist das &quot;Original&quot; – perfekt für schwere Arbeit und übergewichtige Reiter. Der Edelbluthaflinger ist eleganter, springfreudig, aber weniger Lastträger. Preislich: Standard Haflingerpferde kosten €2.500-8.000, Edelblut €6.000-15.000+.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Für weitere Informationen über die Eignung verschiedener <LocalizedLink href="/pferde-ratgeber/pferderassen-anfanger" className="text-brand-brown hover:text-brand-brownDark underline">Pferderassen für Anfänger</LocalizedLink> lies unseren umfassenden Vergleichsratgeber.
          </p>
        </section>

        {/* Section 2: Kosten */}
        <section id="kosten" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Was kostet ein Haflinger? – Komplette Kostenübersicht
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Haflinger Kaufpreis – Von 850€ bis 20.000€
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Wie viel kostet ein guter Haflinger?</strong> Die aktuelle Marktanalyse (basierend auf 250+ Einträgen von ehorses) zeigt: Der Median-Preis liegt bei <strong>€4.900</strong>. Die Spanne reicht von €850 (junges, ungezähmtes Pferd) bis €20.000+ (Show-qualität, hochwertige Abstammung).
          </p>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Preis-Einflussfaktoren:
          </p>

          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Alter:</strong> Junge Pferde (2-5 Jahre) kosten 30% weniger als ausgebildete (8-12 Jahre)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Ausbildungsstand:</strong> Ungezähmt €850-2.500 → Ausgebildet €3.500-8.000 → Turnier-erprobt €8.000+</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Abstammung:</strong> Gezüchtete Haflingerpferde (mit Zuchtbuch-Papieren) kosten 40% mehr</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Gesundheitszustand:</strong> Eine vet-gecheckte Historie spart dir später €5.000+</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Marktplatz:</strong> Züchter 10-30% teurer, Privatverkauf 30% günstiger, eBay-Kleinanzeigen schwer kalkulierbar</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            Die meisten seriösen Käufer zahlen €4.000-7.000 für einen zuverlässigen, ausgebildeten Haflinger. Um den fairen Marktwert eines Pferdes zu ermitteln, nutze unsere <LocalizedLink href="/pferde-ratgeber/pferdewert-ermitteln" className="text-brand-brown hover:text-brand-brownDark underline">KI-gestützte Pferdewert-Bewertung</LocalizedLink>.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Haflinger-Typ Preisvergleich – Was zahlst du wirklich?
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-brand-light">
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Haflinger-Typ</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Alter</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Ausbildung</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Preis-Range</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-base">
                <tr>
                  <td className="border border-brand/20 px-4 py-3">Jung/Ungezähmt</td>
                  <td className="border border-brand/20 px-4 py-3">2-5 Jahre</td>
                  <td className="border border-brand/20 px-4 py-3">Keine</td>
                  <td className="border border-brand/20 px-4 py-3">€850-2.500</td>
                  <td className="border border-brand/20 px-4 py-3">Profis mit Zeit & Geld</td>
                </tr>
                <tr className="bg-brand-light/30">
                  <td className="border border-brand/20 px-4 py-3">Ausgebildet</td>
                  <td className="border border-brand/20 px-4 py-3">6-10 Jahre</td>
                  <td className="border border-brand/20 px-4 py-3">Geritten</td>
                  <td className="border border-brand/20 px-4 py-3">€3.500-8.000</td>
                  <td className="border border-brand/20 px-4 py-3">Anfänger & Freizeitreiter</td>
                </tr>
                <tr>
                  <td className="border border-brand/20 px-4 py-3">Show-Qualität</td>
                  <td className="border border-brand/20 px-4 py-3">8-14 Jahre</td>
                  <td className="border border-brand/20 px-4 py-3">Turnier-erprobt</td>
                  <td className="border border-brand/20 px-4 py-3">€6.000-15.000</td>
                  <td className="border border-brand/20 px-4 py-3">Ambitionierte Amateure</td>
                </tr>
                <tr className="bg-brand-light/30">
                  <td className="border border-brand/20 px-4 py-3">Zucht-Stuten</td>
                  <td className="border border-brand/20 px-4 py-3">5-15 Jahre</td>
                  <td className="border border-brand/20 px-4 py-3">Variabel</td>
                  <td className="border border-brand/20 px-4 py-3">€5.000-20.000+</td>
                  <td className="border border-brand/20 px-4 py-3">Züchter</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Was kostet es monatlich, einen Haflinger zu halten?
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Kaufpreis ist nur die Spitze des Eisbergs. Die echten Kosten entstehen im täglichen Betrieb. Für eine detaillierte Aufschlüsselung aller <LocalizedLink href="/pferde-ratgeber/pferd-haltungskosten" className="text-brand-brown hover:text-brand-brownDark underline">Haltungskosten für Pferde</LocalizedLink> lies unseren umfassenden Kostenratgeber.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand mt-4">
            Realistische Monats-Kostenrechnung:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Futter (Heu/Hafer):</strong> €300-500</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Tierärztliche Versorgung</strong> (Impfungen, Zahnkontrolle): €150-300</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Hufschmied</strong> (Hufeisen, Bearbeitung alle 6-8 Wochen): €80-150</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Versicherung</strong> (Haftung + optional Krankenversicherung): €30-80</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Heu & Einstreu</strong> (wenn kein Weidegang): €200-300</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Sonstiges</strong> (Desinfektionsmittel, Wartung): €100+</span>
            </li>
          </ul>

          <RatgeberHighlightBox
            title="Monatliche Gesamtkosten"
            icon={<TrendingUp className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-base text-gray-700 leading-relaxed">
              <strong>Gesamt: €900-1.700 pro Monat, durchschnittlich €1.200.</strong> Das ist ohne Kosten für Reitstunden, Therapien oder unerwartete Tierarzt-Notfälle. Im Senior-Alter (15+) können Zusatzkosten für Zahnbehandlung, Gelenktherapie +€200-400/Monat hinzukommen.
            </p>
          </RatgeberHighlightBox>
        </section>

        {/* Section 3: Anfängerpferd */}
        <section id="anfaenger" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Ist ein Haflinger das richtige Anfängerpferd für dich?
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Haflinger für Anfänger – Warum sie ideal sind (und warum nicht)
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Ist ein Haflinger ein gutes Anfängerpferd?</strong> Ja – mit Voraussetzungen.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Haflingerpferde sind ideal weil: Sie sind gutmütig und vergeben kleine Fehler. Sie sind intelligent und lernen schnell. Sie sind körperlich robust (keine zickigen Verletzungen). Sie sind bezahlbar (€5.000 statt €15.000 für andere Rassen).
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Aber:</strong> Sie sind <strong>nicht</strong>&quot;kostenlos trainierbar&quot;. Ein Haflinger mit schwachem Reiter wird bald die Kontrolle übernehmen. Sie brauchen konsistente, selbstsichere Führung. Das ist nicht &quot;Anfänger&quot; im Sinne von &quot;komplett Reit-unerfahren&quot; – das ist &quot;Anfänger&quot; im Sinne von &quot;du hast Lektionen, aber nicht 20 Jahre Erfahrung&quot;. Wenn du dein <LocalizedLink href="/pferde-ratgeber/erstes-pferd-kaufen-anfanger" className="text-brand-brown hover:text-brand-brownDark underline">erstes Pferd kaufen</LocalizedLink> möchtest, lies unseren Anfänger-Guide.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Anfänger-Checkliste: Passt ein Haflinger zu dir?
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Beantworte diese Fragen ehrlich:
          </p>

          <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
            <li><strong>Reit-Erfahrung:</strong> Hast du mindestens 5+ Jahre regelmäßig geritten? (Ja/Nein)</li>
            <li><strong>Selbstvertrauen:</strong>Kannst du einem 500-kg-Pferd ruhig sagen &quot;Nein&quot;? (Ja/Nein)</li>
            <li><strong>Lektionen:</strong> Hast du Zugang zu regelmäßigen Reitstunden? (Ja/Nein)</li>
            <li><strong>Zeit:</strong> Kannst du täglich (1-2 Stunden) mit dem Pferd verbringen? (Ja/Nein)</li>
            <li><strong>Infrastruktur:</strong> Hast du Stall, Weide, Futter-Sicherheit? (Ja/Nein)</li>
            <li><strong>Finanzielle Stabilität:</strong> Kannst du €1.500/Monat + Notfälle tragen? (Ja/Nein)</li>
          </ol>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold text-brand">
            Scoring:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>6x Ja</strong> = Exzellente Kandidat für Haflinger</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>4-5x Ja</strong> = Gut, aber plane deine Schwächen (z.B. mehr Lektionen wenn Selbstvertrauen niedrig)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>&lt;3x Ja</strong> = Ein Haflinger ist zu früh; starte mit Pony oder Reitstunden-Pferd</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Gewichtskapazität */}
        <section id="gewicht" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Haflinger Gewichtskapazität – Wieviel kannst du wiegen?
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Kann ein Haflinger 90 kg tragen? – Gewichtsgrenzen erklärt
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Ja, die meisten Haflingerpferde können Reiter bis 90-100 kg tragen.</strong> Die Details sind wichtig:
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Wissenschaftliche Regel:</strong> Ein Pferd sollte nicht mehr als 10-20% seines Körpergewichts tragen. Ein Standard-Haflinger wiegt 420-450 kg → 10% = 42-45 kg, 20% = 84-90 kg sicher, bis 100 kg möglich mit guter Vorbereitung.
          </p>

          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Ein <strong>Standard-Haflinger</strong> (450+ kg): 90-100 kg sicher, mit korrektem Sattel und Training sogar bis 120 kg möglich</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Ein <strong>Edelbluthaflinger</strong> (380-420 kg): 80-90 kg optimal, über 100 kg stressig</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold text-brand">
            Kritische Faktoren:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Sattelpassung:</strong> Ein schlechter Sattel reduziert die sichere Kapazität um 30%</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Trainingsstand:</strong> Ein athletisch trainierter Haflinger trägt mehr als ein untätiges Pferd</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Terrain:</strong> Flaches Gelände vs. Berge = große Unterschiede</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Satteldauer:</strong> Kurze Ritte (1h) vs. Tagesausflüge (6h)</span>
            </li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Haflinger-Typ vs. Gewichtskapazität – Welcher Typ passt zu dir?
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-brand-light">
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Dein Gewicht</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Best Haflinger Type</th>
                  <th className="border border-brand/20 px-4 py-3 text-left text-brand font-semibold">Anmerkungen</th>
                </tr>
              </thead>
              <tbody className="text-base">
                <tr>
                  <td className="border border-brand/20 px-4 py-3">&lt;90 kg</td>
                  <td className="border border-brand/20 px-4 py-3">Standard oder Edelblut</td>
                  <td className="border border-brand/20 px-4 py-3">Beide funktionieren, Edelblut komfortabler</td>
                </tr>
                <tr className="bg-brand-light/30">
                  <td className="border border-brand/20 px-4 py-3">90-100 kg</td>
                  <td className="border border-brand/20 px-4 py-3">Großer Standard</td>
                  <td className="border border-brand/20 px-4 py-3">Notwendig für sichere Lasten</td>
                </tr>
                <tr>
                  <td className="border border-brand/20 px-4 py-3">100-120 kg</td>
                  <td className="border border-brand/20 px-4 py-3">Großer Standard+ spezial-ausgebildet</td>
                  <td className="border border-brand/20 px-4 py-3">Selten, teuer, aber machbar</td>
                </tr>
                <tr className="bg-brand-light/30">
                  <td className="border border-brand/20 px-4 py-3">&gt;120 kg</td>
                  <td className="border border-brand/20 px-4 py-3">Nicht empfohlen</td>
                  <td className="border border-brand/20 px-4 py-3">Zu riskant, auch für große Pferde</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Kaufprozess */}
        <section id="kaufprozess" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Haflinger Kaufprozess: Schritt-für-Schritt Anleitung
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Haflinger Kaufprozess folgt den gleichen Schritten wie beim allgemeinen Pferdekauf. Nutze unsere umfassende <LocalizedLink href="/pferde-ratgeber/pferd-kaufen-worauf-achten" className="text-brand-brown hover:text-brand-brownDark underline">Pferd kaufen Checkliste</LocalizedLink> um sicherzustellen, dass du nichts vergisst.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Schritt 1-3: Vorbereitung & Recherche
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Schritt 1: Definiere deine Anforderungen
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Budget: €4.000-7.000?</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Alter/Ausbildungsstand: Junges Potential oder ausgebildet?</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Größe/Typ: Standard oder Edelblut?</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Geographisch: Lokal oder bundesweit (Transportkosten €300-800)?</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold text-brand">
            Schritt 2: Recherche Marktplätze & Züchter
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>ehorses.de:</strong> 250+ Haflingerpferde, Käuferschutz, verifizierte Anbieter</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Kleinanzeigen.de:</strong> Günstiger, aber höheres Scam-Risiko</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Deine-Tierwelt.de:</strong> Mittelweg, gute Filterung</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Züchter direkt:</strong> Teurere Pferde, aber garantierte Qualität</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold text-brand">
            Schritt 3: Verifiziere Glaubwürdigkeit
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Prüfe Zuchtbuch-Einträge des Haflingers beim Südtiroler Verband</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Lies Verkäufer-Bewertungen (3+ Sterne)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Frag nach Referenzen (vorherige Käufer anrufen!)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span>Überprüfe Pedigree-Papiere (keine Fälschungen)</span>
            </li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Schritt 4-6: Besichtigung, Vet-Check, Vertragsverhandlung
          </h3>

          <RatgeberHighlightBox
            title="Video-Call VOR Besichtigung (Betrugsschutz)"
            icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-base text-gray-700 leading-relaxed">Viele Anfänger fahren 300 km zu einem &quot;Schnäppchen-Haflinger&quot; für €2.500, der nicht existiert oder völlig anders ist. Fordere einen Video-Call an – du siehst das Pferd am Boden, beim Longieren, in der Box. 10 Minuten Video spart dir Fahrtkosten und Zeit.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mt-3 font-semibold">
              Rote Flaggen:
            </p>
            <ul className="mt-2 space-y-1 text-base">
              <li>❌ &quot;Ich kann kein Video-Call machen&quot; = Scam</li>
              <li>❌ &quot;Der Besitzer ist gerade im Ausland&quot; = Scam</li>
              <li>❌ &quot;Preis ist Zeit-limitiert&quot; = Druck-Taktik</li>
            </ul>
          </RatgeberHighlightBox>

          <p className="text-lg text-gray-700 leading-relaxed mt-8 font-semibold text-brand">
            Schritt 5: Tierärztliche Vor-Kaufs-Inspektionen (ABSOLUT NOTWENDIG)
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die Inspektionskosten (€200-400) sind die beste Versicherung, die du kaufst. Hier passieren 40% aller Pferde-Kaufentscheidungen. Detaillierte Informationen über was der Tierarzt prüft findest du in unserem <LocalizedLink href="/pferde-ratgeber/tierarztliche-untersuchung-pferd" className="text-brand-brown hover:text-brand-brownDark underline">Guide zur tierärztlichen Untersuchung</LocalizedLink>.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold text-brand">
            Schritt 6: Vertrag & Verhandlung
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Ein Kaufvertrag ist NICHT optional. Er muss enthalten:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Pferdeidentifikation (Name, Alter, Markierungen, Chipmummer)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Kaufpreis & Zahlungsbedingungen</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Gesundheitsgarantie (mindestens 14 Tage Rückgaberecht wenn Mängel entdeckt)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Vet-Inspektions-Bedingungen (der Käufer wählt den Vet)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Absicherung gegen Betrug (Identitätsverifikation des Verkäufers)</span>
            </li>
          </ul>
        </section>

        {/* Section 6: Züchter vs. Marketplace */}
        <section id="zuechter-marketplace" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Züchter vs. Marketplace vs. Privatverkauf – Welcher Weg ist sicher?
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Haflinger Züchter – Pros, Cons & Qualitätsgarantie
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Haflinger Züchter bieten:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Registrierte, ge-screened Pferde</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Zuchtbuch-Papiere garantiert</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Gesundheitsgarantie (oft 1-2 Jahre für genetische Probleme)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Lebenslange Unterstützung</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Höhere Preise (€8.000-15.000+)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Kleine Auswahl & lange Wartelisten</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Geographische Grenzen (Züchter in Bayern/Österreich)</span>
            </li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Marketplace (ehorses, Kleinanzeigen) – Riesige Auswahl, Risiken beachten
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Marktplätze bieten:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>250+ Haflinger-Angebote (ehorses allein)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Preisvergleich möglich (€3.000-10.000)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-600">✅</span>
              <span>Schnellere Abwicklung (Tage, nicht Monate)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Buyer Beware (Qualität variiert massiv)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Betrugs-Risiko ist real (€1.000 Betrug-Opfer pro Jahr in Deutschland)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-red-600">❌</span>
              <span>Keine automatische Gesundheitsgarantie</span>
            </li>
          </ul>
        </section>

        {/* Section 7: Vet-Checks */}
        <section id="vet-checks" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Tierärztliche Inspektionen beim Haflinger-Kauf – Gesundheit prüfen
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Warum Vet-Checks essentiell sind – Vermeide teure Probleme
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die Inspektionskosten betragen €200-400. Die Kosten, wenn du ein verstecktes Problem übersehen: €5.000+ (SCC-Auge-OP, chronische Lahmheit, Genetische Dysplasie).
          </p>

          <RatgeberHighlightBox
            title="Real Case Study"
            icon={<FileText className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-base text-gray-700 leading-relaxed">Ein Käufer kaufte einen &quot;gesunden&quot; 5-jährigen Haflinger für €4.000 ohne Vet-Inspektion. Nach 2 Monaten war das Pferd lahm. Der Vet entdeckte eine alte Sesambeinfraktur in schlechter Heilung – €8.000 Therapiekosten. Der Verkäufer war plötzlich nicht erreichbar.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mt-3">
              Mit einer €300 Inspektion hätte der Käufer die Fraktur entdeckt und den Kauf verhandelt oder abgesagt.
            </p>
          </RatgeberHighlightBox>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Genetische Screening & Haflinger-spezifische Concerns
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Squamous Cell Carcinoma (SCC)</strong> ist das Hauptproblem bei Haflingerpferden, besonders bei heller Färbung (die typische Haflinger-Färbung). SCC ist Augenkrebs (Equine Intraocular Squamous Cell Carcinoma), unheilbar, erfordert Auge-Entfernung.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die Häufigkeit: 2-3% bei light-colored Haflingerpferden. Das ist hoch genug, dass ein ophthalmologisches Screening sinnvoll ist. <strong>Screening-Kosten:</strong> €300-500 für eine spezialisierte Augen-Untersuchung durch Equine Ophthalmologist. Lohnt sich für jeden Haflinger &gt;€4.000.
          </p>
        </section>

        {/* Section 8: Lebensdauer */}
        <section id="lebensdauer" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Haflinger Lebensdauer & langfristige Haltung – Für wie lange?
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Haflinger Lebenserwartung – 25-30 Jahre oder mehr
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Wie lange lebt ein Haflinger?</strong> Die Durchschnittslebensdauer liegt bei <strong>25-30 Jahren</strong>. Einige Haflingerpferde leben bis 40+ Jahre.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Dies hängt von Genetik, Pflege, Futter, Bewegung und Glück ab. Das Wichtigste: Wenn du heute einen 5-jährigen Haflinger kaufst, bist du bis 2055 Pferdebesitzer. Das ist eine <strong>30-35 Jahre Verpflichtung</strong>. Lies unseren Guide zur <LocalizedLink href="/pferde-ratgeber/seniorpferde-pflege" className="text-brand-brown hover:text-brand-brownDark underline">Seniorpferde-Pflege</LocalizedLink> für langfristige Planung.
          </p>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Total Cost of Ownership – 25 Jahre investieren
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            Realistisches Szenario:
          </p>

          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Kaufpreis:</strong> €5.000</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>Monatliche Kosten:</strong> €1.200 × 12 Monate = €14.400 pro Jahr</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-brand-brown">•</span>
              <span><strong>25 Jahre Haltung:</strong> €14.400 × 25 = €360.000</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-bold text-brand-brown text-xl">
            Total Lifetime Cost: €365.000
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Plus unvorhersehene Kosten (Notfall-Op €3.000, Therapie €2.000, Pensionswechsel €1.500/Monat beim Umzug). Das ist die Realität. <strong>Ein Haflinger kostet dich etwa so viel wie ein billiges Auto für den Rest der Reise.</strong>
          </p>
        </section>

        {/* Section 9: Betrug */}
        <section id="betrug" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Haflinger Online-Betrug erkennen & seriöse Anbieter verifizieren
          </h2>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
            Rote Flaggen – So erkennst du unseriöse Angebote
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Online-Betrug im Pferdemarkt ist real.</strong> Die durchschnittliche Betrugs-Summe: €1.500-3.000 pro Fall. Anfänger sind die bevorzugten Ziele.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand mt-4">
            Klassische Rote Flaggen:
          </p>

          <ol className="space-y-4 text-lg text-gray-700 list-decimal list-inside">
            <li>
              <strong>Unrealistisch niedrige Preise</strong>
              <ul className="mt-2 ml-6 space-y-1 text-base list-none">
                <li>❌ &quot;Ausgebildeter Haflinger nur €2.000&quot; = Scam 100%</li>
                <li>✅ Realistisch: €4.000-7.000 für ausgebildet</li>
              </ul>
            </li>
            <li>
              <strong>Verkäufer-Druck</strong>
              <ul className="mt-2 ml-6 space-y-1 text-base list-none">
                <li>❌ &quot;Andere Käufer sind interessiert, Entscheidung bis morgen&quot;</li>
                <li>❌ &quot;Preis ist nur heute gültig&quot;</li>
              </ul>
            </li>
            <li>
              <strong>Zahlung vor Lieferung/Inspektion</strong>
              <ul className="mt-2 ml-6 space-y-1 text-base list-none">
                <li>❌ Verkäufer fordert Vorkasse / Western Union / Kryptowährung</li>
                <li>✅ Seriös: Zahlung nur nach Lieferung + vet-Clearance</li>
              </ul>
            </li>
            <li>
              <strong>Foto & Video-Probleme</strong>
              <ul className="mt-2 ml-6 space-y-1 text-base list-none">
                <li>❌ Nur 1-2 altmodische Fotos</li>
                <li>❌ Bilder sind aus Google-Bildersuche</li>
                <li>✅ Seriös: Aktuelle Fotos, bereit für Video-Call</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
            Sicherer Kaufprozess – Zahlung, Papiere, Vertragsschutz
          </h3>

          <p className="text-lg text-gray-700 leading-relaxed font-semibold text-brand">
            Schritt-für-Schritt zu einem sicheren Kauf:
          </p>

          <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
            <li><strong>Video-Call mit dem Pferd</strong> (nicht mit Verkäufer-Foto-Kulisse faken möglich)</li>
            <li><strong>Unabhängige Vet-Inspektion</strong> (NICHT verhandelbar) – Du wählst den Vet</li>
            <li><strong>Kaufvertrag mit Schutzklauseln</strong> – Pferde-Identifikation, Gesundheitsgarantie</li>
            <li><strong>Sichere Zahlung</strong> – Nie Vorkasse ohne Vet-Clearance, nutze PayPal Käuferschutz</li>
            <li><strong>Papier-Verifizierung VOR Zahlung</strong> – Zuchtbuch-Papiere original, Impfpass aktuell</li>
            <li><strong>Versicherungsübernahme klären</strong> – Schließe Versicherung ab VOR Transport</li>
          </ol>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zum Haflinger-Kauf"
              sectionSubtitle="Die wichtigsten Antworten zu Preisen, Eignung für Anfänger, Gewichtskapazität und Kaufabwicklung"
            />
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel"
              articles={relatedArticles}
              description="Vertiefen Sie Ihr Wissen über Pferdekauf, Kosten und Anfängerrassen."
            />
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-16">
          <RatgeberFinalCTA
            image={{
              src: "/images/shared/blossi-shooting.webp",
              alt: "PferdeWert KI-Bewertung - Professionelle Pferdebewertung in 2 Minuten",
              width: 800,
              height: 600
            }}
            title="Bereit zum Haflinger-Kauf?"
            description="Nutze unsere KI-gestützte Bewertung um den fairen Marktwert deines Wunsch-Haflingers zu ermitteln. Professionelle Analyse in nur 2 Minuten – damit du nie zu viel zahlst."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </article>
    </Layout>
  );
}
