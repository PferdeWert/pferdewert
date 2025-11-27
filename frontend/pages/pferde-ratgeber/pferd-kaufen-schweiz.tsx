import { useRouter } from 'next/router';
import Head from 'next/head';
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
import { Award, Shield, TrendingUp, ExternalLink, Clock, User, Sparkles, ChevronDown } from 'lucide-react';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const awardIcon = <Award className="h-4 w-4" />;
const shieldIcon = <Shield className="h-5 w-5 text-brand-brown" />;
const trendingUpIcon = <TrendingUp className="h-5 w-5 text-brand-brown" />;
const externalLinkIcon = <ExternalLink className="h-4 w-4" />;
const clockIcon = <Clock className="h-4 w-4" />;
const userIcon = <User className="h-4 w-4" />;
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const chevronDownIcon = <ChevronDown className="h-5 w-5" />;

// FAST REFRESH FIX: Define arrays and objects at module level
const heroMetaItems = [
  { icon: clockIcon, label: '18 Min. Lesezeit' },
  { icon: userIcon, label: 'PferdeWert Redaktion' }
];

export default function PferdKaufenSchweizPage() {
  const { locale } = useRouter();
  const isAT = locale === 'at';

  // Locale-specific metadata
  const baseUrl = isAT ? 'https://pferdewert.at' : 'https://pferdewert.de';
  const pageTitle = isAT
    ? 'Pferd kaufen in Österreich: Schweizer Marktplätze & Tipps'
    : 'Pferd kaufen in der Schweiz: Marktplatz-Vergleich & Leitfaden';
  const metaDescription = isAT
    ? 'Für österreichische Pferdeliebhaber: Schweizer Marktplätze entdecken. Vergleich von 8 Plattformen, Schritt-für-Schritt Anleitung, Budget-Planer und Sicherheits-Checkliste.'
    : 'Pferdekauf in der Schweiz leicht gemacht. Vergleich von 8 Marktplätzen, Schritt-für-Schritt Anleitung, Budget-Planer & Sicherheits-Tipps für Anfänger.';
  const canonicalUrl = `${baseUrl}/pferde-ratgeber/pferd-kaufen-schweiz`;

  const heroPrimaryCta = {
    label: 'Pferdewert berechnen',
    href: '/pferde-preis-berechnen',
    icon: sparklesIcon
  };

  const heroSecondaryCta = {
    label: 'Zum Inhalt',
    icon: chevronDownIcon,
    onClick: () => {
      document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'marktplaetze', title: 'Top Marktplätze im Vergleich' },
    { id: 'anleitung', title: 'Schritt-für-Schritt Anleitung' },
    { id: 'filterkriterien', title: 'Filterkriterien erklärt' },
    { id: 'kosten', title: 'Kosten beim Pferdekauf' },
    { id: 'sicherheit', title: 'Sicherheit beim Pferdekauf' },
    { id: 'pferdtypen', title: 'Spezielle Pferd-Typen' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Welche Plattform hat die beste Auswahl an Pferden?',
      answer: 'ehorses.ch bietet mit über 19.000 aktiven Inseraten die größte Auswahl in der Schweiz und ganz Europa. Für spezialisierte Pferdetypen: BillyRider.ch für Reitsport, FM-CH für Freiberger-Pferde, Swisshorse.ch für Zuchtpferde. Für lokalen Fokus: Tier-Inserate.ch ist eine bewährte Schweizer Plattform. Anfänger profitieren von Anibis.ch und Tutti.ch für breitere Auswahl.',
    },
    {
      question: 'Was kostet ein Pferd in der Schweiz?',
      answer: 'Preise variieren stark je nach Typ: Freizeitpferde kosten 5.000-15.000 CHF, Sport-Pferde 15.000-80.000+ CHF. Zusätzlich solltest du Transport (200-3.000 CHF), Veterinäruntersuchung (500-1.500 CHF) und Ausrüstung (2.000-3.000 CHF) berücksichtigen. Gesamtbudget für Anfänger: 10.000-20.000 CHF für Kaufpreis plus Nebenkosten.',
    },
    {
      question: 'Wie finde ich das richtige Pferd für mich?',
      answer: 'Definiere zuerst dein Reitlevel (Anfänger/Mittler/Fortgeschritten) und deinen Pferdetyp (Sport/Freizeit). Nutze Plattform-Filter für Alter (6-12 Jahre ideal für Anfänger), Temperament, Größe (Stockmaß) und Preis. Besichtige mehrere Pferde in Person, mache einen Proberitt und lasse eine Veterinär-Untersuchung durchführen bevor du dich entscheidest.',
    },
    {
      question: 'Welche Pferderasse passt zu mir?',
      answer: 'Anfänger sollten ruhige Rassen wählen: Freiberger oder ältere Warmblüter. Sportreiter brauchen Warmblüter oder Vollblüter. Für Freizeit: Robuste Rassen wie Freiberger. Deine Körpergröße und dein Reitergewicht spielen auch eine Rolle - kleinere Reiter sollten Pferde unter 160cm Stockmaß wählen. Konsultiere erfahrene Reiter bei der Auswahl.',
    },
    {
      question: 'Kann ich ein Pferd vor dem Kauf testen/Probe-reiten?',
      answer: 'Ja, und das ist stark empfohlen! Die meisten seriösen Verkäufer ermöglichen einen Proberitt. Ein guter Testritt sollte mindestens 30-45 Minuten dauern: Aufwärmen (20 Min), Testritt im normalen Tempo, Tests für Springen oder Dressur (je nach Pferdtyp), und Handling-Tests. Stelle sicher, dass die Versicherung bei Unfällen geklärt ist.',
    },
    {
      question: 'Welche Dokumente brauche ich beim Pferdekauf in der Schweiz?',
      answer: 'Notwendig sind: Kaufvertrag (signiert), Pferdepass (Pedigree), Impfausweis (Tetanus, EHV), Zahnstufe-Bestätigung (zur Altersverification). Optional aber empfohlen: Veterinär-Untersuchungsbericht, Rasse-Registrierung bei Zuchtverband, Versicherungspolice, Schutzvertrag-Bestätigung. Alle Dokumente sollten vor Übernahme vorhanden sein.',
    },
    {
      question: 'Wie lange dauert es, bis ich mein Pferd abholen kann?',
      answer: 'Nach Kaufvertrag: 3-14 Tage abhängig von Transport und Vorbereitungen. Lokale Pferde: 3-5 Tage Abholung. Grenzüberschreitend: 2-4 Wochen mit professionellem Transport. Mit Transporteur-Beauftragte: zusätzlich 1-2 Wochen Planungszeit. Vorabsprachen mit Verkäufer und Transporteur sind essentiell.',
    },
    {
      question: 'Was ist ein Schutzvertrag und brauche ich einen?',
      answer: 'Ein Schutzvertrag gibt dem Käufer das Recht, das Pferd innerhalb von 30 Tagen zurückzugeben, wenn es nicht wie beschrieben ist oder gesundheitliche Mängel hat. Es ist nicht gesetzlich verpflichtend, aber stark empfohlen. Der Schutzvertrag kostet meist 50-200 CHF extra. Er schützt beide Seiten: den Käufer vor versteckten Fehlern und den Verkäufer vor unrealistischen Rückmeldungen.',
    },
    {
      question: 'Wie erkenne ich ein betrügerisches Inserat oder einen unseriösen Verkäufer?',
      answer: 'Rote Flaggen sind: Stock-Fotos statt echte Bilder, extrem niedriger Preis, aggressive Dringlichkeit (&quot;heute noch kaufen&quot;), keine/schlechte Kontaktinfos, negative Bewertungen, kein Proberitt-Angebot, vordefinierte Finanzierungsangebote. Vertrauens-Zeichen sind: detaillierte Fotos, Transparenz bei Mängeln, Referenzen von früheren Käufern, Plattform-Verifizierung.',
    },
    {
      question: 'Kann ich ein Pferd direkt aus dem Ausland importieren?',
      answer: 'Ja, ehorses.ch facilitiert internationale Käufe aus Deutschland, Österreich und Frankreich. Kostenfaktoren: Transport (1.500-3.000+ CHF je nach Distanz), Gesundheitszertifikate (200-500 CHF), Zollbehandlung, Versicherung während Transport (100-300 CHF). Zeitrahmen: 2-4 Wochen von Kaufvertrag bis Übernahme. Empfehlung: Vertrauensvolle Transporteure mit Referenzen.',
    },
  ];

  // Related Articles - automatically fetched from registry
  const relatedArticles: RatgeberRelatedArticle[] = getRelatedArticles('pferd-kaufen-schweiz').map(entry => ({
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
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* hreflang Tags für beide Märkte */}
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/pferde-ratgeber/pferd-kaufen-schweiz" />
        <link rel="alternate" hrefLang="de-AT" href="https://pferdewert.at/pferde-ratgeber/pferd-kaufen-schweiz" />
        <link rel="alternate" hrefLang="x-default" href="https://pferdewert.de/pferde-ratgeber/pferd-kaufen-schweiz" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={isAT ? 'de_AT' : 'de_DE'} />
        <meta property="og:site_name" content="PferdeWert" />
        <meta property="og:image" content={`${baseUrl}/images/ratgeber/horses-zermatt-switzerland.webp`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${baseUrl}/images/ratgeber/horses-zermatt-switzerland.webp`} />
        <meta name="twitter:site" content="@PferdeWert" />

        {/* Structured Data - Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Pferd kaufen in der Schweiz: Marktplatz-Vergleich & Leitfaden",
              "description": metaDescription,
              "author": {
                "@type": "Organization",
                "name": "PferdeWert"
              },
              "publisher": {
                "@type": "Organization",
                "name": "PferdeWert",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/images/logo.png`
                }
              },
              "datePublished": "2024-11-26",
              "dateModified": "2024-11-26",
              "image": `${baseUrl}/images/ratgeber/horses-zermatt-switzerland.webp`,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              },
              "wordCount": 4620
            })
          }}
        />

        {/* Structured Data - Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": baseUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Pferde Ratgeber",
                  "item": `${baseUrl}/pferde-ratgeber`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Pferd kaufen in der Schweiz: Marktplatz-Vergleich & Leitfaden",
                  "item": canonicalUrl
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <RatgeberHero
        badgeLabel="Schweizer Marktplätze"
        badgeIcon={awardIcon}
        title="Pferd kaufen Schweiz: Vollständiger Leitfaden mit Marktplatz-Vergleich"
        subtitle="Pferdekauf in der Schweiz ist ein großes Abenteuer, aber auch eine Entscheidung, die gut überlegt sein will. Mit über 50 verschiedenen Pferderassen und neun etablierten Marktplätzen zur Auswahl fühlt sich der Start oft überwältigend an."
        metaItems={heroMetaItems}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
      />

      {/* Hero Image */}
      <RatgeberHeroImage
        src="/images/ratgeber/horses-zermatt-switzerland.webp"
        alt="Pferde in Zermatt, Schweiz - Symbolbild für Pferdekauf in der Schweiz"
        priority
        attribution={{
          author: 'Wikimedia Commons',
          license: 'CC BY-SA 3.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
          source: 'Wikimedia Commons',
          originalUrl: 'https://commons.wikimedia.org/wiki/File:Horses_in_Zermatt.jpg'
        }}
      />

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-12 lg:mt-16">
        <RatgeberTableOfContents
          sections={sections}
          onNavigate={(id) => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Main Content */}
      <article id="content" className="max-w-4xl mx-auto px-4 md:px-6 mt-12 lg:mt-16 space-y-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Dieser Leitfaden zeigt dir alle gängigen Marktplätze, erklärt wie du sie richtig nutzt,
            und leitet dich Schritt für Schritt durch den kompletten Kaufprozess. Zusätzlich bekommst
            du konkrete Tipps zu Budget, Sicherheit und häufigen Anfängerfehler – damit du
            selbstbewusst dein erstes oder nächstes Pferd kaufst.
          </p>
        </div>

        {/* Section 1: Top Marktplätze im Vergleich */}
        <section id="marktplaetze" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Die Top Schweizer Pferde-Marktplätze im Vergleich
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Schweiz bietet eine beeindruckende Palette an Pferdemarktplätzen – von großen internationalen Portalen
            wie ehorses.ch bis zu spezialisierten Nischen-Seiten für bestimmte Rassen. Hier ist der vollständige
            Überblick über alle relevanten Marktplätze in der Schweiz.
          </p>

          <div className="space-y-8 mt-8">
            {/* ehorses.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">1. ehorses.ch</h3>
                <a
                  href="https://www.ehorses.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Größte Auswahl:</strong> Mit über 19.000 aktiven Inseraten ist ehorses.ch der größte
                Pferdemarktplatz in Europa.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Gratis Suchen, Kostenpflichtige Inserate für Verkäufer (ab 29 CHF/Monat)</li>
                <li><strong>Spezialität:</strong> Alle Pferdetypen – Sport, Zucht, Freizeit, Fohlen</li>
                <li><strong>Filter-Features:</strong> Erweiterte Suche nach Rasse, Alter, Stockmaß, Preis, Standort, Geschlecht, Ausbildung</li>
                <li><strong>Zusatz-Features:</strong> Detaillierte Profile mit Videos, Abstammung, Gesundheitschecks, Veterinär-Berichte</li>
                <li><strong>Käufer-Support:</strong> Professionelle Transportvermittlung, Kaufberatung, Versicherungsoptionen</li>
              </ul>
            </div>

            {/* BillyRider.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">2. BillyRider.ch</h3>
                <a
                  href="https://www.billyrider.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Reitsport-Fokus:</strong> Spezialisiert auf Sportpferde und Turnierpferde.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Gratis für Käufer, Verkäufer zahlen ab 19 CHF/Monat</li>
                <li><strong>Spezialität:</strong> Dressur, Springen, Vielseitigkeit, Turnierpferde</li>
                <li><strong>Community:</strong> Aktives Forum, Event-Kalender, Reitsport-News</li>
              </ul>
            </div>

            {/* FM-CH */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">3. FM-CH (Freiberger-Markt)</h3>
                <a
                  href="https://www.fm-ch.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Freiberger-Spezialisten:</strong> Ausschließlich für die Schweizer Nationalrasse.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Mitgliedschaft erforderlich (ca. 50-100 CHF/Jahr)</li>
                <li><strong>Spezialität:</strong> Freiberger-Pferde (alle Linien: FM, EM, Ponies)</li>
                <li><strong>Zusatz-Features:</strong> Zuchtdatenbank, Pedigree-Suche, Züchter-Verzeichnis</li>
              </ul>
            </div>

            {/* Swisshorse.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">4. Swisshorse.ch</h3>
                <a
                  href="https://www.swisshorse.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Zucht-Fokus:</strong> Plattform für Züchter und Zuchtpferde.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Verkäufer zahlen ab 25 CHF/Inserat</li>
                <li><strong>Spezialität:</strong> Zuchtpferde, Deckhengste, Fohlen, Jungpferde</li>
                <li><strong>Zusatz-Features:</strong> Genetik-Datenbank, Züchter-Profile, Zucht-Beratung</li>
              </ul>
            </div>

            {/* Tier-Inserate.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">5. Tier-Inserate.ch</h3>
                <a
                  href="https://www.tier-inserate.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Lokaler Fokus:</strong> Schweizer Plattform für alle Tierarten, stark in der Pferde-Kategorie.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Gratis für Käufer, Verkäufer zahlen ab 15 CHF/Inserat</li>
                <li><strong>Spezialität:</strong> Lokale Verkäufe, private Anbieter, Freizeitpferde</li>
                <li><strong>Besonderheit:</strong> Starke regionale Präsenz in der Deutschschweiz</li>
              </ul>
            </div>

            {/* Anibis.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">6. Anibis.ch</h3>
                <a
                  href="https://www.anibis.ch/de/q/pferde/Ak8CmaG9yc2VzlMDAwMA?sorting=newest&page=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>General-Marktplatz:</strong> Größte Schweizer Kleinanzeigen-Plattform mit aktiver Pferde-Sektion.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Gratis Inserate für private Verkäufer</li>
                <li><strong>Spezialität:</strong> Private Verkäufe, Freizeitpferde, Ausrüstung</li>
                <li><strong>Besonderheit:</strong> Sehr hohe Reichweite in der gesamten Schweiz</li>
              </ul>
            </div>

            {/* Tutti.ch */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">7. Tutti.ch</h3>
                <a
                  href="https://www.tutti.ch/de/q/pferde/Ak8CmaG9yc2VzlMDAwMA?sorting=newest&page=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Budget-Option:</strong> Kleinanzeigen-Portal mit günstigen Pferden und Zubehör.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Gratis Inserate</li>
                <li><strong>Spezialität:</strong> Günstige Pferde, Reit-Beteiligungen, Ausrüstung</li>
                <li><strong>Besonderheit:</strong> Viele private Verkäufer, niedrigere Preise</li>
              </ul>
            </div>

            {/* Pferdepark.ch Pferdevermittlung */}
            <div className="border-l-4 border-brand-brown pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-serif font-bold text-brand mb-0">8. Pferdepark.ch Pferdevermittlung</h3>
                <a
                  href="https://www.pferdepark.ch/pferdevermittlung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-brownDark inline-flex items-center gap-1 text-sm"
                >
                  Website besuchen {externalLinkIcon}
                </a>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                <strong>Tierschutz-Fokus:</strong> Spezialisiert auf Pferde in Not und Vermittlung.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Kostenstruktur:</strong> Spenden-basiert, keine festen Preise</li>
                <li><strong>Spezialität:</strong> Pferde in Not, Gnadenbrot-Plätze, Adoption</li>
                <li><strong>Besonderheit:</strong> Ethischer Ansatz, Tierschutz-orientiert</li>
              </ul>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-brand/5">
                <tr>
                  <th className="px-4 py-3 text-left text-brand font-bold">Plattform</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Beste für</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Inserate</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Kosten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-800 font-medium">ehorses.ch</td>
                  <td className="px-4 py-3 text-gray-700">Alle Pferdetypen</td>
                  <td className="px-4 py-3 text-gray-700">19.000+</td>
                  <td className="px-4 py-3 text-gray-700">Ab 29 CHF/Monat</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">BillyRider.ch</td>
                  <td className="px-4 py-3 text-gray-700">Sportpferde</td>
                  <td className="px-4 py-3 text-gray-700">5.000+</td>
                  <td className="px-4 py-3 text-gray-700">Ab 19 CHF/Monat</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-800 font-medium">FM-CH</td>
                  <td className="px-4 py-3 text-gray-700">Freiberger</td>
                  <td className="px-4 py-3 text-gray-700">1.000+</td>
                  <td className="px-4 py-3 text-gray-700">Mitgliedschaft 50-100 CHF/Jahr</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">Swisshorse.ch</td>
                  <td className="px-4 py-3 text-gray-700">Zuchtpferde</td>
                  <td className="px-4 py-3 text-gray-700">2.000+</td>
                  <td className="px-4 py-3 text-gray-700">Ab 25 CHF/Inserat</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-800 font-medium">Tier-Inserate.ch</td>
                  <td className="px-4 py-3 text-gray-700">Lokale Verkäufe</td>
                  <td className="px-4 py-3 text-gray-700">3.000+</td>
                  <td className="px-4 py-3 text-gray-700">Ab 15 CHF/Inserat</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">Anibis.ch</td>
                  <td className="px-4 py-3 text-gray-700">Private Verkäufe</td>
                  <td className="px-4 py-3 text-gray-700">2.500+</td>
                  <td className="px-4 py-3 text-gray-700">Gratis</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-800 font-medium">Tutti.ch</td>
                  <td className="px-4 py-3 text-gray-700">Budget-Pferde</td>
                  <td className="px-4 py-3 text-gray-700">2.000+</td>
                  <td className="px-4 py-3 text-gray-700">Gratis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Highlight Box */}
        <RatgeberHighlightBox
          title="Kenne den fairen Marktwert deines Wunschpferds"
          icon={trendingUpIcon}
        >
          <p className="text-gray-700 mb-4">
            Bevor du ein Pferd kaufst, solltest du den fairen Marktwert kennen. Nutze unsere
            KI-gestützte Bewertung, um den aktuellen Preis zu überprüfen und Überzahlungen zu vermeiden.
          </p>
          <LocalizedLink
            href="/pferde-preis-berechnen"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-brown hover:bg-brand-brownDark text-white font-semibold rounded-lg transition-all"
          >
            Jetzt Pferdewert berechnen {sparklesIcon}
          </LocalizedLink>
        </RatgeberHighlightBox>

        {/* Section 2: Schritt-für-Schritt Anleitung */}
        <section id="anleitung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Schritt-für-Schritt Anleitung: So kaufst du dein erstes Pferd
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Der Pferdekauf kann überwältigend sein, besonders für Anfänger. Diese strukturierte Anleitung
            führt dich durch jeden Schritt des Prozesses – von der ersten Recherche bis zur Übernahme.
          </p>

          <div className="space-y-6 mt-8">
            <div className="bg-amber-50 border-2 border-brand/20 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Schritt 1: Selbsteinschätzung und Vorbereitung</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Reitlevel bestimmen:</strong> Anfänger, Fortgeschritten, oder Profi? Sei ehrlich!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Verwendungszweck klären:</strong> Freizeit, Sport, Zucht, oder Turnier?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Budget festlegen:</strong> Kaufpreis + laufende Kosten (siehe Kosten-Sektion)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Unterbringung sichern:</strong> Stallplatz recherchieren und reservieren</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-brand/20 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Schritt 2: Marktplatz-Auswahl und Filter-Nutzung</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Plattform wählen:</strong> ehorses.ch für größte Auswahl, BillyRider.ch für Sport</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Filter setzen:</strong> Rasse, Alter (6-12 Jahre für Anfänger), Stockmaß, Preis, Region</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Temperament:</strong> Ruhig/Ausgeglichen für Anfänger, Lebhaft für Erfahrene</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Speichern:</strong> Favoriten-Liste anlegen und regelmäßig aktualisieren</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-brand/20 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Schritt 3: Inserat-Analyse und Erstbesichtigung</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Qualitäts-Check:</strong> Detaillierte Fotos, Videos, vollständige Beschreibung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Verkäufer kontaktieren:</strong> Telefonisch vorab sprechen (nicht nur E-Mail)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Fragen stellen:</strong> Gesundheit, Charakter, Ausbildungsstand, Gründe für Verkauf</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Termin vereinbaren:</strong> Besichtigung in Person (NIEMALS ohne Besichtigung kaufen!)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-brand/20 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Schritt 4: Proberitt und Veterinär-Untersuchung</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Proberitt durchführen:</strong> Mindestens 30-45 Minuten in verschiedenen Gangarten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Handling-Tests:</strong> Führen, Satteln, Hufgeben, Verladen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Veterinär beauftragen:</strong> Ankaufsuntersuchung (AKU) durch unabhängigen Tierarzt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>AKU-Umfang:</strong> Basis-AKU (500-800 CHF) oder Große AKU mit Röntgen (1.200-1.500 CHF)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-brand/20 rounded-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Schritt 5: Kaufvertrag und Übergabe</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Kaufvertrag prüfen:</strong> Schriftlicher Vertrag mit allen Details (Preis, Gesundheitszustand, Rücktrittsrechte)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Dokumente verlangen:</strong> Pferdepass, Impfausweis, Abstammungsnachweis, AKU-Bericht</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Schutzvertrag:</strong> Optional, aber empfohlen (30 Tage Rückgaberecht bei versteckten Mängeln)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Zahlung:</strong> Niemals vor Übergabe! Bank-Überweisung oder Barzahlung bei Übergabe</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Transport organisieren:</strong> Professioneller Transporteur oder eigener Anhänger</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Filterkriterien erklärt */}
        <section id="filterkriterien" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Filterkriterien erklärt: Rasse, Alter, Stockmaß, Preis und Region
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Filter-Funktionen der Marktplätze helfen dir, die Auswahl gezielt einzuschränken.
            Hier erfährst du, was jedes Kriterium bedeutet und wie du sie sinnvoll nutzt.
          </p>

          <div className="space-y-6 mt-8">
            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Rasse</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Die Schweiz hat eine vielfältige Pferderassen-Landschaft. Hier sind die beliebtesten:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Freiberger (FM):</strong> Schweizer Nationalrasse, robust, ausgeglichen, ideal für Freizeit und Fahren</li>
                <li><strong>Warmblüter:</strong> Vielseitig, Sport- und Freizeiteignung, verschiedene Linien (Deutsches Warmblut, Holsteiner, etc.)</li>
                <li><strong>Haflinger:</strong> Klein, kräftig, freundlich, perfekt für Kinder und leichtere Reiter</li>
                <li><strong>Vollblüter:</strong> Schnell, temperamentvoll, für erfahrene Reiter und Rennsport</li>
                <li><strong>Ponys (Shetland, Welsh):</strong> Klein, robust, für Kinder und Fahrsport</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Alter</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Das Alter beeinflusst Ausbildungsstand, Gesundheit und Preis:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>0-3 Jahre (Fohlen/Jungpferde):</strong> Günstig, aber benötigen Ausbildung und Geduld</li>
                <li><strong>4-7 Jahre (Junge Pferde):</strong> In Ausbildung, für erfahrene Reiter geeignet</li>
                <li><strong>8-15 Jahre (Erfahrene Pferde):</strong> Vollständig ausgebildet, ideal für Anfänger, höchster Preis</li>
                <li><strong>16+ Jahre (Ältere Pferde):</strong> Erfahren, ruhig, günstiger, aber Gesundheit beachten</li>
              </ul>
              <p className="text-brand-brown font-semibold mt-3">
                💡 Empfehlung für Anfänger: 6-12 Jahre alte Pferde mit ruhigem Temperament
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Stockmaß (Größe)</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Das Stockmaß wird in Zentimetern vom Boden bis zum Widerrist gemessen:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Unter 148 cm:</strong> Ponys, für Kinder und leichte Erwachsene</li>
                <li><strong>148-160 cm:</strong> Kleine Pferde, für durchschnittliche Reiter</li>
                <li><strong>160-170 cm:</strong> Standard-Größe, für die meisten Erwachsenen</li>
                <li><strong>Über 170 cm:</strong> Großpferde, für große/schwere Reiter</li>
              </ul>
              <p className="text-brand-brown font-semibold mt-3">
                💡 Faustformel: Dein Gewicht sollte max. 15-20% des Pferdegewichts sein
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Preis</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Preise variieren stark je nach Typ, Ausbildung und Gesundheit:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Budget (unter 5.000 CHF):</strong> Ältere Pferde, Jungpferde ohne Ausbildung, Notfälle</li>
                <li><strong>Mittelklasse (5.000-15.000 CHF):</strong> Freizeitpferde, ausgebildete Pferde, gängige Rassen</li>
                <li><strong>Premium (15.000-30.000 CHF):</strong> Sportpferde, Turniereignung, hochwertige Zuchtpferde</li>
                <li><strong>Luxus (30.000+ CHF):</strong> Elite-Sportpferde, Champions, seltene Rassen</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Region/Standort</h3>
              <p className="text-gray-700 leading-relaxed">
                Der Standort beeinflusst Transport-Kosten und Besichtigungsmöglichkeiten. Schweizer Regionen:
                <strong className="block mt-2">Deutschschweiz, Westschweiz (Romandie), Tessin</strong>.
                Nähere Standorte sparen Transport-Kosten (siehe Kosten-Sektion).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Kosten beim Pferdekauf */}
        <section id="kosten" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Kosten beim Pferdekauf: Kompletter Budget-Überblick
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Gesamtkosten beim Pferdekauf gehen weit über den Kaufpreis hinaus. Hier ist die vollständige
            Aufschlüsselung aller Einmal- und laufenden Kosten, damit du realistisch budgetieren kannst.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-bold text-amber-900 mb-2">Einmalige Kosten beim Kauf</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Kaufpreis (Freizeitpferd):</span>
                <span className="font-semibold">5.000 - 15.000 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Kaufpreis (Sportpferd):</span>
                <span className="font-semibold">15.000 - 80.000+ CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Ankaufsuntersuchung (AKU):</span>
                <span className="font-semibold">500 - 1.500 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Transport (lokal bis 100km):</span>
                <span className="font-semibold">200 - 500 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Transport (national 100-400km):</span>
                <span className="font-semibold">500 - 1.500 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Transport (international 400+km):</span>
                <span className="font-semibold">1.500 - 3.000+ CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Grundausrüstung (Sattel, Trense, Decken):</span>
                <span className="font-semibold">2.000 - 3.000 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Erstversicherung (Haftpflicht + Kranken):</span>
                <span className="font-semibold">800 - 1.200 CHF/Jahr</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-amber-300">
                <span className="font-bold">GESAMT (Freizeitpferd, minimal):</span>
                <span className="font-bold text-amber-900">10.000 - 20.000 CHF</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">GESAMT (Sportpferd, komplett):</span>
                <span className="font-bold text-amber-900">20.000 - 90.000+ CHF</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Laufende Kosten (monatlich)</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Stallmiete (Offenstall/Paddock):</span>
                <span className="font-semibold">400 - 600 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Stallmiete (Box mit Weide):</span>
                <span className="font-semibold">600 - 900 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Futter (Heu, Kraftfutter):</span>
                <span className="font-semibold">150 - 250 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Hufschmied (alle 6-8 Wochen):</span>
                <span className="font-semibold">120 - 180 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Tierarzt (Routine-Checks, Impfungen):</span>
                <span className="font-semibold">80 - 150 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Versicherung (monatlich umgelegt):</span>
                <span className="font-semibold">70 - 100 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Zusatzkosten (Leckerlis, Pflegeprodukte):</span>
                <span className="font-semibold">50 - 80 CHF</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-blue-300">
                <span className="font-bold">GESAMT (monatlich, minimal):</span>
                <span className="font-bold text-blue-900">870 - 1.360 CHF</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">GESAMT (jährlich):</span>
                <span className="font-bold text-blue-900">10.440 - 16.320 CHF</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-bold text-red-900 mb-2">Unvorhergesehene Kosten (Notfall-Reserve)</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Tierarzt (Kolik-Operation):</span>
                <span className="font-semibold">3.000 - 8.000 CHF</span>
              </div>
              <div className="flex justify-between">
                <span>Tierarzt (Sehnenverletzung):</span>
                <span className="font-semibold">2.000 - 5.000 CHF</span>
              </div>
              <div className="flex justify-start gap-3 mt-4">
                <span className="font-bold text-red-900">💡 Empfehlung:</span>
                <span className="flex-1">Spare 3.000-5.000 CHF als Notfall-Reserve für unerwartete Tierarztkosten</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Sicherheit beim Pferdekauf */}
        <section id="sicherheit" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Sicherheit beim Pferdekauf: Was du wissen musst
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Sicherheit beim Pferdekauf bedeutet nicht nur physische Sicherheit beim Proberitt, sondern auch
            rechtliche und finanzielle Absicherung gegen Betrug und versteckte Mängel.
          </p>

          {/* Safety Warning */}
          <RatgeberHighlightBox
            title="Vorsicht vor Betrügern!"
            icon={shieldIcon}
          >
            <div className="space-y-3 text-gray-700">
              <p><strong>Rote Flaggen bei Inseraten:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Stock-Fotos statt echte Bilder des Pferdes</li>
                <li>Extrem niedriger Preis (&quot;Schnäppchen&quot; unter Marktwert)</li>
                <li>Aggressive Dringlichkeit (&quot;heute noch kaufen&quot;)</li>
                <li>Keine/schlechte Kontaktinformationen</li>
                <li>Verkäufer verweigert Besichtigung vor Ort</li>
                <li>Vorauszahlung vor Besichtigung gefordert</li>
              </ul>
              <p className="mt-4"><strong>Vertrauens-Zeichen:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Detaillierte Fotos und Videos des Pferdes</li>
                <li>Transparenz bei bekannten Mängeln/Besonderheiten</li>
                <li>Referenzen von früheren Käufern</li>
                <li>Plattform-Verifizierung des Verkäufers</li>
                <li>Bereitschaft für Proberitt und AKU</li>
              </ul>
            </div>
          </RatgeberHighlightBox>

          <div className="space-y-6 mt-8">
            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Ankaufsuntersuchung (AKU)</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Die AKU ist deine wichtigste Absicherung gegen versteckte Gesundheitsmängel:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">✓</span>
                  <span><strong>Basis-AKU (500-800 CHF):</strong> Klinische Untersuchung, Bewegungsprüfung, Herzcheck</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">✓</span>
                  <span><strong>Große AKU (1.200-1.500 CHF):</strong> + Röntgen (Beine, Rücken), Bluttest, erweiterte Checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">✓</span>
                  <span><strong>Wichtig:</strong> NIEMALS die AKU vom Verkäufer beauftragen! Eigenen unabhängigen Tierarzt wählen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">✓</span>
                  <span><strong>Zeitpunkt:</strong> Nach erfolgreichem Proberitt, vor Kaufvertrag</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Kaufvertrag und Rechtssicherheit</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Schriftlicher Vertrag:</strong> IMMER schriftlich! Mündliche Vereinbarungen sind rechtlich schwach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Pflichtangaben:</strong> Namen, Adressen, Pferdedaten (Name, Alter, Rasse, Pass-Nr), Kaufpreis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Gesundheitserklärung:</strong> Bekannte Krankheiten/Mängel müssen im Vertrag stehen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Rücktrittsrecht:</strong> Optional 30-Tage Schutzvertrag (50-200 CHF extra)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Zahlung:</strong> Niemals im Voraus! Erst bei Übergabe zahlen (Bank oder Bar)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Proberitt-Sicherheit</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Helm und Schutzweste:</strong> Auch wenn du normalerweise keine trägst – Sicherheit geht vor!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Versicherung klären:</strong> Wer haftet bei Unfall während Proberitt? Im Voraus besprechen!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Begleitperson:</strong> Nimm erfahrenen Reiter/Trainer mit zur Einschätzung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Testkatalog:</strong> Aufwärmen, Grundgangarten, Springen/Dressur-Tests, Geländeritt</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Transport-Sicherheit</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Professioneller Transporteur:</strong> Empfohlen für weite Strecken (200+ km)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Transport-Versicherung:</strong> 100-300 CHF, deckt Unfälle während Transport</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Eigener Anhänger:</strong> Nur für kurze Strecken und wenn Pferd verladefreundlich ist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-brown font-bold mt-1">•</span>
                  <span><strong>Vorbereitung:</strong> Wasser, Heu, Pausen alle 2-3 Stunden bei langen Fahrten</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Spezielle Pferd-Typen */}
        <section id="pferdtypen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Spezielle Pferd-Typen: Sport, Zucht, Freizeit und Anfänger-Pferde
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nicht alle Pferde sind gleich. Hier erfährst du die Unterschiede zwischen verschiedenen
            Pferdetypen und welcher Typ am besten zu deinen Zielen passt.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Sportpferde</h3>
              <p className="text-gray-700 mb-3">
                Für ambitionierte Reiter und Turnier-Teilnahme.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Disziplinen:</strong> Dressur, Springen, Vielseitigkeit</li>
                <li><strong>Eigenschaften:</strong> Ausbildung bis L/M/S Niveau</li>
                <li><strong>Preis:</strong> 15.000 - 80.000+ CHF</li>
                <li><strong>Anforderung:</strong> Erfahrener Reiter notwendig</li>
                <li><strong>Plattformen:</strong> BillyRider.ch, ehorses.ch</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Freizeitpferde</h3>
              <p className="text-gray-700 mb-3">
                Für Genussreiter und entspannte Ausritte.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Nutzung:</strong> Ausritte, leichte Dressur, Gelände</li>
                <li><strong>Eigenschaften:</strong> Ruhig, ausgeglichen, verlässlich</li>
                <li><strong>Preis:</strong> 5.000 - 15.000 CHF</li>
                <li><strong>Anforderung:</strong> Anfänger-freundlich</li>
                <li><strong>Plattformen:</strong> Tier-Inserate.ch, Anibis.ch</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Zuchtpferde</h3>
              <p className="text-gray-700 mb-3">
                Für Züchter und Zucht-Interessierte.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Arten:</strong> Zuchtstuten, Deckhengste, Fohlen</li>
                <li><strong>Eigenschaften:</strong> Hervorragende Abstammung, Zuchtgenehmigung</li>
                <li><strong>Preis:</strong> 8.000 - 40.000+ CHF</li>
                <li><strong>Anforderung:</strong> Zucht-Kenntnisse erforderlich</li>
                <li><strong>Plattformen:</strong> Swisshorse.ch, FM-CH</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg border-2 border-brand/20 p-6">
              <h3 className="text-2xl font-serif font-bold text-brand mb-3">Anfänger-Pferde</h3>
              <p className="text-gray-700 mb-3">
                Speziell für Reitanfänger und -wiedereinsteiger.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Eigenschaften:</strong> Gutmütig, geduldig, fehlerverzeihend</li>
                <li><strong>Alter:</strong> Idealerweise 8-15 Jahre (erfahren)</li>
                <li><strong>Preis:</strong> 6.000 - 12.000 CHF</li>
                <li><strong>Rassen:</strong> Freiberger, Haflinger, ältere Warmblüter</li>
                <li><strong>Tipp:</strong> Schulpferde sind oft ideal für Anfänger</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-32 lg:scroll-mt-40">
          <FAQ
            faqs={faqItems}
            sectionTitle="Häufig gestellte Fragen"
            sectionSubtitle="Die wichtigsten Fragen zu Marktplätzen, Kosten, Sicherheit und Dokumenten beim Pferdekauf in der Schweiz"
          />
        </section>

        {/* Related Articles */}
        <div className="mt-16">
          <RatgeberRelatedArticles
            title="Weitere hilfreiche Ratgeber"
            description="Vertiefe dein Wissen rund um den Pferdekauf mit diesen weiterführenden Artikeln"
            articles={relatedArticles}
          />
        </div>

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Professionelle Pferdebewertung mit PferdeWert',
            width: 960,
            height: 640
          }}
          title="Bereit für deinen Pferdekauf?"
          description="Nutze unsere KI-gestützte Bewertung, um den fairen Marktwert deines Wunschpferds zu ermitteln. In nur 2 Minuten erhältst du eine professionelle Einschätzung."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
