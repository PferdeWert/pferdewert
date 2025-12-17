import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import RatgeberHead from '@/components/ratgeber/RatgeberHead';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles, { RatgeberRelatedArticle } from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import LocalizedLink from '@/components/LocalizedLink';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import { Award, Shield, MapPin, ExternalLink, Sparkles, ChevronDown, Star, Calendar } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const awardIcon = <Award className="h-4 w-4" />;
const shieldIcon = <Shield className="h-5 w-5 text-brand-brown" />;
const mapPinIcon = <MapPin className="h-5 w-5 text-brand-brown" />;
const externalLinkIcon = <ExternalLink className="h-4 w-4" />;
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const chevronDownIcon = <ChevronDown className="h-5 w-5" />;
const starIcon = <Star className="h-4 w-4 fill-amber-400 text-amber-400" />;
const calendarIcon = <Calendar className="h-5 w-5 text-brand-brown" />;

// ============================================================================
// STRUCTURED DATA: Online Marktplätze
// ============================================================================
const onlineMarketplaces = [
  {
    name: 'ehorses.ch',
    url: 'https://www.ehorses.ch/',
    listings: '~2.800',
    description: 'Größter Pferdemarkt Europas mit umfangreicher Schweiz-Sektion',
    highlight: true
  },
  {
    name: 'anibis.ch',
    url: 'https://www.anibis.ch/de/c/tiere-pferde-ponys-pferde',
    listings: '~1.200',
    description: 'Größte Schweizer Kleinanzeigen-Plattform mit aktiver Pferde-Rubrik'
  },
  {
    name: 'tutti.ch',
    url: 'https://www.tutti.ch/de/q/pferde',
    listings: '~800',
    description: 'Beliebte Kleinanzeigen mit vielen privaten Angeboten'
  },
  {
    name: 'tier-inserate.ch',
    url: 'https://www.tier-inserate.ch/pferde/',
    listings: '~600',
    description: 'Schweizer Tierportal mit starkem regionalem Fokus'
  },
  {
    name: 'FM-CH (Freiberger)',
    url: 'https://www.fm-ch.ch/',
    listings: '~400',
    description: 'Offizieller Marktplatz für Schweizer Freiberger-Pferde'
  },
  {
    name: 'pferde.de (Schweiz)',
    url: 'https://www.pferde.de/pferdemarkt/suche/?land=ch',
    listings: '~350',
    description: 'Internationale Plattform mit Schweiz-Filter'
  }
];

// ============================================================================
// STRUCTURED DATA: Regionale Züchter nach Kanton
// ============================================================================
interface Breeder {
  name: string;
  specialty: string;
  rating: number;
  url?: string;
  official?: boolean;
}

interface RegionalBreederData {
  region: string;
  description: string;
  breeders: Breeder[];
}

const regionalBreeders: Record<string, RegionalBreederData> = {
  zuerich: {
    region: 'Zürich & Ostschweiz',
    description: 'Wirtschaftszentrum mit professionellen Reitanlagen und Sportpferdezucht',
    breeders: [
      { name: 'Reitanlage Kyburg', specialty: 'Springpferde', rating: 4.7, url: 'https://www.reitanlage-kyburg.ch/' },
      { name: 'Pferdezucht Winterthur', specialty: 'Warmblut', rating: 4.5 },
      { name: 'Gestüt Seuzach', specialty: 'Dressurpferde', rating: 4.6 }
    ]
  },
  bern: {
    region: 'Bern & Mittelland',
    description: 'Herz der Schweizer Pferdezucht mit Tradition seit Jahrhunderten',
    breeders: [
      { name: 'Nationalgestüt Avenches', specialty: 'Freiberger & Sportpferde', rating: 4.9, url: 'https://www.agroscope.admin.ch/agroscope/de/home/themen/nutztiere/pferde.html', official: true },
      { name: 'Pferdezucht Emmental', specialty: 'Freiberger', rating: 4.6 },
      { name: 'Reiterhof Berner Oberland', specialty: 'Haflinger', rating: 4.5 }
    ]
  },
  jura: {
    region: 'Jura & Westschweiz',
    description: 'Ursprungsgebiet des Freiberg - der Schweizer Nationalrasse',
    breeders: [
      { name: 'Freiberger Züchterverband', specialty: 'Freiberger (alle Linien)', rating: 4.8, url: 'https://www.fm-ch.ch/', official: true },
      { name: 'Gestüt Les Franches-Montagnes', specialty: 'Originalzucht Freiberger', rating: 4.7 },
      { name: 'Elevage du Jura', specialty: 'Freiberger & Ponys', rating: 4.4 }
    ]
  },
  aargau: {
    region: 'Aargau & Nordwestschweiz',
    description: 'Zentrale Lage mit guter Anbindung und vielfältigem Angebot',
    breeders: [
      { name: 'Reiterhof Baden', specialty: 'Vielseitigkeit', rating: 4.5 },
      { name: 'Pferdezucht Fricktal', specialty: 'Warmblut', rating: 4.4 },
      { name: 'Gestüt Lenzburg', specialty: 'Sportpferde', rating: 4.6 }
    ]
  },
  luzern: {
    region: 'Zentralschweiz',
    description: 'Malerische Region mit Fokus auf Freizeitpferde und Haflinger',
    breeders: [
      { name: 'Haflinger Zucht Zentralschweiz', specialty: 'Haflinger', rating: 4.7, url: 'https://www.haflinger-schweiz.ch/' },
      { name: 'Reitanlage Pilatus', specialty: 'Freizeitpferde', rating: 4.5 },
      { name: 'Pferdehof Vierwaldstättersee', specialty: 'Isländer', rating: 4.4 }
    ]
  },
  romandie: {
    region: 'Romandie (Waadt, Genf)',
    description: 'Französischsprachige Schweiz mit internationalem Reitsport-Flair',
    breeders: [
      { name: 'Centre Equestre Lausanne', specialty: 'Springpferde', rating: 4.6 },
      { name: 'Haras de Genève', specialty: 'Dressur & Springen', rating: 4.7 },
      { name: 'Elevage Vaudois', specialty: 'Schweizer Warmblut', rating: 4.5 }
    ]
  }
};

// ============================================================================
// STRUCTURED DATA: Schweizer Pferderassen
// ============================================================================
const swissBreeds = [
  {
    name: 'Freiberger',
    description: 'Die einzige originäre Schweizer Pferderasse - vielseitig, robust und gutmütig. Ideal für Freizeit, Fahren und leichten Sport.',
    size: '150-160 cm',
    priceRange: '5.000-15.000 CHF',
    region: 'Jura (Franches-Montagnes)'
  },
  {
    name: 'Schweizer Warmblut (CH)',
    description: 'Edle Sportpferde für Dressur und Springen, gezüchtet vom ZVCH nach internationalen Standards.',
    size: '165-175 cm',
    priceRange: '15.000-60.000+ CHF',
    region: 'Landesweit'
  },
  {
    name: 'Haflinger',
    description: 'In der Schweiz sehr beliebt für Freizeit und Familie. Robust, trittsicher und kinderfreundlich.',
    size: '138-150 cm',
    priceRange: '4.000-12.000 CHF',
    region: 'Alpenregionen'
  },
  {
    name: 'Einsiedler',
    description: 'Historische Rasse aus dem Kloster Einsiedeln - heute im Schweizer Warmblut aufgegangen.',
    size: '160-170 cm',
    priceRange: '12.000-35.000 CHF',
    region: 'Schwyz'
  }
];

// ============================================================================
// STRUCTURED DATA: Zuchtverbände
// ============================================================================
const breedingAssociations = [
  {
    name: 'ZVCH - Zuchtverband CH-Sportpferde',
    url: 'https://www.zvch.ch/',
    salesPortal: 'Hengstschau & Fohlenauktionen',
    events: 'Nationale Stutbuchaufnahme, Fohlenprämierung'
  },
  {
    name: 'Freiberger Zuchtverband (FM)',
    url: 'https://www.fm-ch.ch/',
    salesPortal: 'FM-Marktplatz online',
    events: 'Marché-Concours Saignelégier (August)'
  },
  {
    name: 'Schweizerischer Haflingerverband',
    url: 'https://www.haflinger-schweiz.ch/',
    salesPortal: 'Vermittlung über Verband',
    events: 'Bundesschau, Hengstkörung'
  },
  {
    name: 'Nationalgestüt Avenches',
    url: 'https://www.agroscope.admin.ch/agroscope/de/home/themen/nutztiere/pferde.html',
    salesPortal: 'Staatliche Pferdezucht',
    events: 'Hengstvorführungen, Zuchtberatung'
  }
];

// ============================================================================
// STRUCTURED DATA: Events 2025
// ============================================================================
const events2025 = [
  {
    name: 'CHI Genf - Rolex Grand Slam',
    date: '11.-15. Dezember 2025',
    location: 'Palexpo Genf',
    type: 'Weltklasse-Turnier',
    url: 'https://www.chi-geneve.ch/'
  },
  {
    name: 'Marché-Concours Saignelégier',
    date: '8.-10. August 2025',
    location: 'Saignelégier, Jura',
    type: 'Freiberger-Nationalfest',
    url: 'https://www.marche-concours.ch/'
  },
  {
    name: 'Pferd Messe Zürich',
    date: '13.-16. Februar 2025',
    location: 'Messe Zürich',
    type: 'Pferdemesse mit Verkauf',
    url: 'https://www.pferd-messe.ch/'
  },
  {
    name: 'CSIO St. Gallen',
    date: '29. Mai - 1. Juni 2025',
    location: 'Gründenmoos St. Gallen',
    type: 'Internationales Springturnier'
  },
  {
    name: 'Equus Helveticus',
    date: '24.-27. April 2025',
    location: 'BernExpo',
    type: 'Schweizer Pferdetage',
    url: 'https://www.equus-helveticus.ch/'
  },
  {
    name: 'Haflinger Bundesschau',
    date: 'September 2025',
    location: 'Wechselnd',
    type: 'Zuchtschau'
  }
];

// ============================================================================
// STRUCTURED DATA: Preisübersicht
// ============================================================================
const priceOverview = [
  { category: 'Freizeitpferd (Freiberger/Haflinger)', priceRange: '5.000 - 12.000 CHF', description: 'Ausgebildet, 8-15 Jahre' },
  { category: 'Sportpferd Einsteiger (A-L)', priceRange: '12.000 - 25.000 CHF', description: 'Turniererfahrung vorhanden' },
  { category: 'Sportpferd Fortgeschritten (M-S)', priceRange: '25.000 - 80.000 CHF', description: 'Höhere Klassen, Turnierpferd' },
  { category: 'Fohlen/Jungpferd', priceRange: '3.000 - 10.000 CHF', description: 'Je nach Abstammung' },
  { category: 'Zuchtpferd (Stute/Hengst)', priceRange: '8.000 - 40.000+ CHF', description: 'Mit Papieren & Leistungsnachweis' },
  { category: 'Elite-/Championatspferde', priceRange: '100.000+ CHF', description: 'Internationale Klasse' }
];

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pferd kaufen Schweiz 2025: Alle Marktplätze, Züchter & Preise',
    description: 'Pferd kaufen in der Schweiz: Kompletter Überblick über alle Marktplätze (ehorses, anibis, tutti), regionale Züchter nach Kanton, Freiberger & Preise 2025.',
    keywords: 'pferd kaufen schweiz, schweizer pferdemarkt, freiberger kaufen, pferde schweiz, ehorses.ch',
    ogTitle: 'Pferd kaufen Schweiz 2025: Marktplätze & Züchter',
    ogDescription: 'Alle Schweizer Pferdemärkte, Züchter nach Kanton und Freiberger-Zucht im Überblick.',
    twitterTitle: 'Pferd kaufen Schweiz 2025',
    twitterDescription: 'Kompletter Überblick: Marktplätze, Züchter & Preise in der Schweiz.',
  },
  at: {
    title: 'Pferd kaufen in der Schweiz: Guide für österreichische Käufer',
    description: 'Pferde in der Schweiz kaufen: Marktplätze, Freiberger-Zucht und Preise für österreichische Käufer erklärt.',
    keywords: 'pferd kaufen schweiz österreich, schweizer pferdemarkt, freiberger kaufen',
    ogTitle: 'Schweizer Pferdemarkt für Österreicher',
    ogDescription: 'Alle wichtigen Infos zum Pferdekauf in der Schweiz.',
    twitterTitle: 'Pferd kaufen Schweiz - Österreich Guide',
    twitterDescription: 'Schweizer Pferdemärkte für österreichische Käufer.',
  },
  ch: {
    title: 'Pferd kaufen Schweiz 2025: Alle Marktplätze & Züchter',
    description: 'Der komplette Überblick zum Pferdekauf in der Schweiz: Marktplätze, regionale Züchter, Freiberger-Zucht, Events und aktuelle Preise 2025.',
    keywords: 'pferd kaufen schweiz, freiberger kaufen, pferdemarkt schweiz, züchter schweiz',
    ogTitle: 'Pferd kaufen Schweiz 2025',
    ogDescription: 'Kompletter Überblick: Marktplätze, Züchter & Freiberger-Zucht.',
    twitterTitle: 'Pferd kaufen Schweiz 2025',
    twitterDescription: 'Marktplätze, Züchter und Preise in der Schweiz.',
  },
};

export default function PferdKaufenSchweizPage() {

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
    { id: 'marktplaetze', title: 'Online-Marktplätze Vergleich' },
    { id: 'zuechter', title: 'Züchter nach Kanton' },
    { id: 'rassen', title: 'Schweizer Pferderassen' },
    { id: 'verbaende', title: 'Zuchtverbände & Gestüte' },
    { id: 'events', title: 'Pferde-Events 2025' },
    { id: 'preise', title: 'Preisübersicht' },
    { id: 'faq', title: 'Häufige Fragen' },
  ];

  const faqItems = [
    {
      question: 'Welcher Pferdemarkt ist in der Schweiz am größten?',
      answer: 'ehorses.ch ist mit rund 2.800 Inseraten der größte Pferdemarkt für die Schweiz. Für private Verkäufe sind anibis.ch (~1.200) und tutti.ch (~800) sehr beliebt. Für Freiberger ist der FM-CH Marktplatz die erste Anlaufstelle.'
    },
    {
      question: 'Was kostet ein Pferd in der Schweiz?',
      answer: 'Freizeitpferde (Freiberger, Haflinger) kosten 5.000-12.000 CHF. Sportpferde beginnen bei 12.000 CHF und können bis 80.000 CHF und mehr kosten. Fohlen sind ab 3.000 CHF erhältlich, Elite-Pferde kosten oft über 100.000 CHF.'
    },
    {
      question: 'Was ist ein Freiberger und warum ist er so beliebt?',
      answer: 'Der Freiberger ist die einzige originäre Schweizer Pferderasse. Er stammt aus dem Jura und zeichnet sich durch Vielseitigkeit, Robustheit und ein ausgeglichenes Temperament aus. Er eignet sich für Freizeit, Fahren, Wanderreiten und leichten Sport.'
    },
    {
      question: 'Wo finde ich seriöse Züchter in der Schweiz?',
      answer: 'Das Nationalgestüt Avenches ist die wichtigste staatliche Institution. Der ZVCH (Zuchtverband CH-Sportpferde) und der Freiberger-Verband FM-CH vermitteln geprüfte Züchter. Regionale Züchter finden Sie über die kantonalen Verbände.'
    },
    {
      question: 'Welche Pferdemessen gibt es in der Schweiz?',
      answer: 'Die wichtigsten sind: Pferd Messe Zürich (Februar), Equus Helveticus in Bern (April), Marché-Concours Saignelégier für Freiberger (August), CHI Genf (Dezember) und CSIO St. Gallen (Mai/Juni).'
    },
    {
      question: 'Kann ich als Deutscher oder Österreicher ein Pferd in der Schweiz kaufen?',
      answer: 'Ja, allerdings müssen Sie bei der Ausfuhr die Zollbestimmungen beachten. Pferde aus der Schweiz benötigen für den EU-Import Gesundheitszertifikate. Der Transport sollte über erfahrene Spediteure erfolgen. Die Preise in CHF sind aufgrund des Wechselkurses oft höher.'
    },
    {
      question: 'Welche Dokumente brauche ich beim Pferdekauf in der Schweiz?',
      answer: 'Notwendig sind: Pferdepass (Equidenpass), Kaufvertrag, Impfausweis. Bei Zuchtpferden: Abstammungsnachweis vom Zuchtverband. Für den Export: TRACES-Zertifikat, tierärztliches Gesundheitszeugnis.'
    }
  ];

  // Related Articles - automatically fetched from registry
  const relatedArticles: RatgeberRelatedArticle[] = getRelatedArticles('schweiz').map(entry => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description
  }));

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <RatgeberHead
        slug="schweiz"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/horses-zermatt-switzerland.webp"
        locales={seoLocales}
        datePublished="2025-12-04"
        wordCount={2350}
        breadcrumbTitle="Pferd kaufen Schweiz"
        faqItems={faqItems}
      />

      {/* Hero Section */}
      <RatgeberHero
        badgeLabel="Marktplatz-Übersicht"
        badgeIcon={awardIcon}
        title="Pferd kaufen Schweiz: Alle Marktplätze & Züchter im Überblick"
        subtitle="Der komplette Guide zum Pferdekauf in der Schweiz: Online-Marktplätze verglichen, regionale Züchter nach Kanton, die Schweizer Nationalrasse Freiberger und aktuelle Preise 2025."
        readTime="10 Min."
        publishDate="Dezember 2025"
        author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
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
            Die Schweiz bietet mit ihrer langen Pferdetradition und dem <strong>Freiberger als einziger originärer Schweizer Rasse</strong> ein
            einzigartiges Angebot für Pferdekäufer. Von internationalen Plattformen über lokale Kleinanzeigen bis zu
            spezialisierten Zuchtverbänden - hier findest du alle wichtigen Anlaufstellen für deinen Pferdekauf in der Schweiz.
          </p>
        </div>

        {/* Section 1: Online-Marktplätze */}
        <section id="marktplaetze" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Online-Marktplätze für Pferde in der Schweiz
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die wichtigsten Plattformen für den Pferdekauf in der Schweiz im direkten Vergleich -
            von der größten internationalen Börse bis zu Schweizer Kleinanzeigen.
          </p>

          {/* Marketplace Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-brand/10">
                <tr>
                  <th className="px-4 py-3 text-left text-brand font-bold">Plattform</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Inserate</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Beschreibung</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {onlineMarketplaces.map((marketplace, index) => (
                  <tr key={marketplace.name} className={`${marketplace.highlight ? 'bg-amber-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {marketplace.name}
                      {marketplace.highlight && <span className="ml-2 text-xs bg-brand text-white px-2 py-0.5 rounded">Top</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{marketplace.listings}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{marketplace.description}</td>
                    <td className="px-4 py-3">
                      <a
                        href={marketplace.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-brown hover:text-brand-brownDark"
                      >
                        Besuchen {externalLinkIcon}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Box */}
        <RatgeberHighlightBox
          title="Den fairen Preis kennen"
          icon={shieldIcon}
        >
          <p className="text-gray-700 mb-4">
            Bevor du ein Pferd in der Schweiz kaufst, solltest du den aktuellen Marktwert kennen.
            Unsere KI-gestützte Bewertung analysiert aktuelle Marktdaten und gibt dir eine realistische Preiseinschätzung.
          </p>
          <LocalizedLink
            href="/pferde-preis-berechnen"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-brown hover:bg-brand-brownDark text-white font-semibold rounded-lg transition-all"
          >
            Pferdewert berechnen {sparklesIcon}
          </LocalizedLink>
        </RatgeberHighlightBox>

        {/* Section 2: Regionale Züchter */}
        <section id="zuechter" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Züchter & Reitanlagen nach Kanton
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Schweiz hat in jedem Kanton renommierte Züchter und Reitanlagen.
            Hier findest du die wichtigsten Anlaufstellen nach Region sortiert.
          </p>

          <div className="grid gap-6 mt-6">
            {Object.entries(regionalBreeders).map(([key, region]) => (
              <div key={key} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {mapPinIcon}
                  <h3 className="text-xl font-serif font-bold text-brand">{region.region}</h3>
                </div>
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="space-y-3">
                  {region.breeders.map((breeder) => (
                    <div key={breeder.name} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                      <div>
                        <span className="font-medium text-gray-900">{breeder.name}</span>
                        {breeder.official && (
                          <span className="ml-2 text-xs bg-brand/10 text-brand px-2 py-0.5 rounded">Offiziell</span>
                        )}
                        <span className="text-gray-500 text-sm ml-2">({breeder.specialty})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {starIcon}
                          <span className="text-sm text-gray-600">{breeder.rating}</span>
                        </div>
                        {breeder.url && (
                          <a
                            href={breeder.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-brown hover:text-brand-brownDark"
                          >
                            {externalLinkIcon}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Schweizer Pferderassen */}
        <section id="rassen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Schweizer Pferderassen im Überblick
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Der <strong>Freiberger</strong> ist die einzige originäre Schweizer Pferderasse und gilt als Nationalpferd.
            Daneben werden in der Schweiz verschiedene andere Rassen gezüchtet.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {swissBreeds.map((breed) => (
              <div key={breed.name} className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-serif font-bold text-brand mb-2">{breed.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{breed.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stockmaß:</span>
                    <span className="font-medium">{breed.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preisbereich:</span>
                    <span className="font-medium text-brand-brown">{breed.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hauptgebiet:</span>
                    <span className="font-medium">{breed.region}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Zuchtverbände */}
        <section id="verbaende" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Zuchtverbände & Gestüte in der Schweiz
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die offiziellen Zuchtverbände sind wichtige Anlaufstellen für den Kauf von
            Zuchtpferden mit Papieren und für die Vermittlung seriöser Züchter.
          </p>

          <div className="space-y-4 mt-6">
            {breedingAssociations.map((association) => (
              <div key={association.name} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-brand mb-1">{association.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{association.salesPortal}</p>
                    <p className="text-gray-500 text-sm">{association.events}</p>
                  </div>
                  <a
                    href={association.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-brand-brown hover:text-brand-brownDark text-sm"
                  >
                    Website {externalLinkIcon}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Events 2025 */}
        <section id="events" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Pferde-Events & Messen 2025 in der Schweiz
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pferdemessen und -turniere bieten ideale Gelegenheiten, Züchter kennenzulernen und Pferde live zu erleben.
            Die wichtigsten Termine 2025:
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-brand/10">
                <tr>
                  <th className="px-4 py-3 text-left text-brand font-bold">Event</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Datum</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Ort</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Art</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events2025.map((event, index) => (
                  <tr key={event.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {calendarIcon}
                        {event.url ? (
                          <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:underline">
                            {event.name}
                          </a>
                        ) : (
                          event.name
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{event.date}</td>
                    <td className="px-4 py-3 text-gray-600">{event.location}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{event.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Preisübersicht */}
        <section id="preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Preisübersicht: Was kostet ein Pferd in der Schweiz?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Preise für Pferde in der Schweiz liegen aufgrund des höheren Preisniveaus oft über
            dem EU-Durchschnitt. Hier eine Orientierung nach Kategorie:
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-brand/10">
                <tr>
                  <th className="px-4 py-3 text-left text-brand font-bold">Kategorie</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Preisbereich</th>
                  <th className="px-4 py-3 text-left text-brand font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceOverview.map((item, index) => (
                  <tr key={item.category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.category}</td>
                    <td className="px-4 py-3 text-brand-brown font-semibold">{item.priceRange}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-blue-800 text-sm">
              <strong>Hinweis für EU-Käufer:</strong> Bei Kauf aus der Schweiz kommen Transportkosten (500-1.500 CHF),
              Zollformalitäten und Gesundheitszertifikate hinzu. Der CHF-EUR Wechselkurs beeinflusst den effektiven Preis.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-32 lg:scroll-mt-40">
          <FAQ
            faqs={faqItems}
            sectionTitle="Häufige Fragen zum Pferdekauf in der Schweiz"
            sectionSubtitle="Antworten auf die wichtigsten Fragen zu Marktplätzen, Freiberger-Zucht und Preisen"
            withSchema={false}
          />
        </section>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto">
          <AuthorBox />
        </div>

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
          title="Bereit für deinen Pferdekauf in der Schweiz?"
          description="Nutze unsere KI-gestützte Bewertung, um den fairen Marktwert deines Wunschpferds zu ermitteln. In nur 2 Minuten erhältst du eine professionelle Einschätzung."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
