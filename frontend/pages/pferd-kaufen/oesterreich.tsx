import LocalizedLink from '@/components/LocalizedLink'
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import RatgeberHead from '@/components/ratgeber/RatgeberHead';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import { MapPin, Euro, TrendingUp, ExternalLink, Star, Calendar, Mountain, Award } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const mapPinIcon = <MapPin className="w-5 h-5" />;
const trendingIcon = <TrendingUp className="w-5 h-5" />;
const euroIcon = <Euro className="w-5 h-5" />;
const mountainIcon = <Mountain className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pferd kaufen Österreich 2025: Alle Marktplätze, Züchter & Auktionen',
    description: 'Pferd kaufen in Österreich: Willhaben, ehorses & Landwirt.com im Vergleich. Plus: Top-Züchter von Tirol bis Wien, Auktionen 2025 & Zuchtverbände.',
    keywords: 'pferd kaufen österreich, willhaben pferde, landwirt pferde, noriker kaufen, haflinger kaufen, pferdemarkt österreich',
    ogTitle: 'Pferd kaufen Österreich 2025: Alle Marktplätze & Züchter',
    ogDescription: 'Komplette Übersicht: Online-Marktplätze, regionale Züchter von Tirol bis Wien, Auktionen 2025 und Zuchtverbände in Österreich.',
    twitterTitle: 'Pferd kaufen Österreich 2025: Alle Marktplätze & Züchter',
    twitterDescription: 'Willhaben, ehorses & Landwirt.com. Plus: Top-Züchter, Auktionen 2025 & Verbände.',
  },
  at: {
    title: 'Pferd kaufen Österreich 2025: Alle Marktplätze, Züchter & Auktionen',
    description: 'Pferd kaufen in Österreich: Willhaben, ehorses & Landwirt.com. Plus: Top-Züchter von Tirol bis Wien, Auktionen 2025 & Zuchtverbände mit Verkaufsportalen.',
    keywords: 'pferd kaufen österreich, willhaben pferde, landwirt pferde, noriker kaufen, haflinger kaufen, pferdezucht austria',
    ogTitle: 'Pferd kaufen Österreich 2025: Alle Marktplätze & Züchter',
    ogDescription: 'Dein österreichischer Guide: Online-Marktplätze, Züchter von Tirol bis Wien, Auktionen 2025 und alle Zuchtverbände.',
    twitterTitle: 'Pferd kaufen Österreich 2025',
    twitterDescription: 'Alle Marktplätze, Züchter & Auktionen in Österreich.',
  },
  ch: {
    title: 'Pferde aus Österreich kaufen: Marktplätze & Import für Schweizer',
    description: 'Pferde aus Österreich für Schweizer Käufer: Willhaben, ehorses, Noriker & Haflinger, Import-Tipps und Transport.',
    keywords: 'pferd österreich kaufen, import pferd österreich schweiz, noriker schweiz, haflinger kaufen',
    ogTitle: 'Pferde aus Österreich kaufen: Guide für Schweizer',
    ogDescription: 'Pferde aus Österreich: Marktplätze, Züchter & Import-Tipps für Schweizer Käufer.',
    twitterTitle: 'Pferde aus Österreich für Schweizer',
    twitterDescription: 'Import-Guide: Pferde aus Österreich kaufen.',
  },
};

// Online Marketplace Data
const onlineMarketplaces = [
  {
    name: 'ehorses.at',
    url: 'https://www.ehorses.at/',
    listings: '~2.200',
    description: 'Größter internationaler Pferdemarkt mit AT-Inseraten',
    highlight: true,
  },
  {
    name: 'Willhaben.at',
    url: 'https://www.willhaben.at/iad/kaufen-und-verkaufen/marktplatz/pferde-ponys-esel',
    listings: '~1.500',
    description: 'Österreichs größtes Kleinanzeigenportal, viele Privatverkäufer',
    highlight: true,
  },
  {
    name: 'Landwirt.com',
    url: 'https://www.landwirt.com/pferdemarkt/',
    listings: '~800',
    description: 'Direktkauf von Bauern und Züchtern, besonders Noriker',
    highlight: false,
  },
  {
    name: 'pferde.de',
    url: 'https://www.pferde.de/pferdemarkt/oesterreich/',
    listings: '~400',
    description: 'Traditioneller Marktplatz mit österreichischen Angeboten',
    highlight: false,
  },
];

// Regional Breeders/Sellers Data
const regionalBreeders = {
  tirol: {
    region: 'Tirol',
    description: 'Österreichs Pferde-Hochburg Nr. 1 mit Haflinger-Tradition und alpiner Aufzucht',
    breeders: [
      { name: 'Haflinger Pferdezuchtverband Tirol', location: 'Absam', specialty: 'Haflinger (offizielle Zuchtstelle)', rating: '4.9', url: 'https://www.haflinger-tirol.com', official: true },
      { name: 'Gestüt Fohlenhof', location: 'Ebbs', specialty: 'Haflinger, almgeprägte Aufzucht', rating: '4.8', url: 'https://www.fohlenhof.at' },
      { name: 'Lipizzanergestüt Piber', location: 'Piber (Stmk)', specialty: 'Lipizzaner (Spanische Hofreitschule)', rating: '4.9', url: 'https://www.piber.com', official: true },
      { name: 'Reiterhof Inntal', location: 'Wattens', specialty: 'Warmblut, Freizeitpferde', rating: '4.6', url: null },
    ],
  },
  kaernten: {
    region: 'Kärnten',
    description: 'Schnell wachsender Markt mit Noriker-Tradition und günstigen Preisen',
    breeders: [
      { name: 'Kärntner Pferdezuchtverband', location: 'Klagenfurt', specialty: 'Noriker, Kärntner Warmblut', rating: '4.7', url: 'https://www.pferdezucht-kaernten.at', official: true },
      { name: 'Gestüt Ossiacher See', location: 'Ossiach', specialty: 'Noriker, Freizeitpferde', rating: '4.5', url: null },
      { name: 'Reiterhof Kärnten', location: 'Villach', specialty: 'Warmblut, Sportpferde', rating: '4.6', url: null },
    ],
  },
  steiermark: {
    region: 'Steiermark',
    description: 'Traditioneller Pferdemarkt mit Lipizzaner-Zucht und Landesgestüt',
    breeders: [
      { name: 'Landesgestüt Piber', location: 'Köflach', specialty: 'Lipizzaner (Staatlich)', rating: '4.9', url: 'https://www.piber.com', official: true },
      { name: 'Steirischer Pferdezuchtverband', location: 'Graz', specialty: 'Warmblut, Noriker', rating: '4.6', url: 'https://www.pferdezucht-stmk.at', official: true },
      { name: 'Gestüt Murtal', location: 'Murau', specialty: 'Freizeitpferde, Ponys', rating: '4.5', url: null },
      { name: 'Reiterhof Südsteiermark', location: 'Leibnitz', specialty: 'Warmblut, Dressur', rating: '4.7', url: null },
    ],
  },
  oberoesterreich: {
    region: 'Oberösterreich',
    description: 'Großes Angebot mit vielfältiger Zuchtszene',
    breeders: [
      { name: 'OÖ Pferdezuchtverband', location: 'Linz', specialty: 'Warmblut, alle Rassen', rating: '4.6', url: 'https://www.pferdezucht-ooe.at', official: true },
      { name: 'Gestüt Innviertel', location: 'Ried im Innkreis', specialty: 'Warmblut, Sportpferde', rating: '4.5', url: null },
      { name: 'Reiterhof Salzkammergut', location: 'Vöcklabruck', specialty: 'Freizeitpferde, Haflinger', rating: '4.7', url: null },
    ],
  },
  niederoesterreich: {
    region: 'Niederösterreich & Wien',
    description: 'Urbane Nähe zu Wien mit breitem Angebot und höheren Preisen',
    breeders: [
      { name: 'NÖ Pferdezuchtverband', location: 'St. Pölten', specialty: 'Warmblut, alle Rassen', rating: '4.6', url: 'https://www.pferdezucht-noe.at', official: true },
      { name: 'Gestüt Weinviertel', location: 'Hollabrunn', specialty: 'Warmblut, Dressur', rating: '4.5', url: null },
      { name: 'Spanische Hofreitschule Wien', location: 'Wien', specialty: 'Lipizzaner (Ausbildung)', rating: '4.9', url: 'https://www.srs.at', official: true },
      { name: 'Reitanlage Wienerwald', location: 'Purkersdorf', specialty: 'Freizeitpferde, Schulbetrieb', rating: '4.4', url: null },
    ],
  },
  salzburg: {
    region: 'Salzburg',
    description: 'Alpine Pferdeszene mit Haflinger und touristischem Fokus',
    breeders: [
      { name: 'Salzburger Pferdezuchtverband', location: 'Salzburg', specialty: 'Haflinger, Noriker, Warmblut', rating: '4.7', url: 'https://www.pferdezucht-salzburg.at', official: true },
      { name: 'Gestüt Pinzgau', location: 'Zell am See', specialty: 'Noriker, alpine Aufzucht', rating: '4.8', url: null },
      { name: 'Reiterhof Pongau', location: 'St. Johann', specialty: 'Haflinger, Freizeitpferde', rating: '4.6', url: null },
    ],
  },
};

// Austrian Breeding Associations
const breedingAssociations = [
  {
    name: 'Pferdezucht Austria',
    shortName: 'PZA',
    url: 'https://www.pferdezucht-austria.at',
    salesPortal: 'https://www.pferdezucht-austria.at/verkaufspferde/',
    description: 'Dachorganisation aller österreichischen Pferdezuchtverbände. Zentrale Anlaufstelle für Zuchtpferde.',
    events: 'Pferdezuchtmesse Wels, Österreichische Bundesschau',
  },
  {
    name: 'Haflinger Pferdezuchtverband Tirol',
    shortName: 'HPVT',
    url: 'https://www.haflinger-tirol.com',
    salesPortal: 'https://www.haflinger-tirol.com/verkauf/',
    description: 'Weltweites Zentrum der Haflinger-Zucht. Direkte Vermittlung von Haflingern.',
    events: 'Haflinger Weltschau, Fohlenauktionen',
  },
  {
    name: 'Österreichischer Noriker-Zuchtverband',
    shortName: 'ÖNZV',
    url: 'https://www.noriker.at',
    salesPortal: 'https://www.noriker.at/verkaufspferde/',
    description: 'Zuchtverband für Österreichs heimische Kaltblutrasse.',
    events: 'Noriker-Championat, Bundesschau',
  },
];

// Events 2025
const events2025 = [
  {
    name: 'Pferd Wels',
    date: '7.-9. November 2025',
    location: 'Messe Wels (OÖ)',
    description: 'Österreichs größte Pferdemesse mit Auktionen, Präsentationen und Verkaufsständen aller Rassen.',
    type: 'Messe & Auktion',
  },
  {
    name: 'Haflinger Weltausstellung',
    date: '2025 (Datum wird bekannt gegeben)',
    location: 'Ebbs (Tirol)',
    description: 'Internationale Schau der weltbesten Haflinger mit Verkauf und Auktionen.',
    type: 'Internationale Schau',
  },
  {
    name: 'Noriker Bundesschau',
    date: 'September 2025',
    location: 'Rotiert zwischen Bundesländern',
    description: 'Jährliche Präsentation der besten Noriker Österreichs mit Prämierungen.',
    type: 'Bundesschau',
  },
  {
    name: 'Lipizzaner Fohlenmarkt Piber',
    date: 'Oktober 2025',
    location: 'Gestüt Piber (Stmk)',
    description: 'Traditioneller Verkauf von Lipizzaner-Fohlen aus dem staatlichen Gestüt.',
    type: 'Staatliche Auktion',
  },
  {
    name: 'Pferdemarkt Klagenfurt',
    date: 'Mai & Oktober 2025',
    location: 'Klagenfurt (Kärnten)',
    description: 'Regionaler Pferdemarkt mit Fokus auf Noriker und Freizeitpferde.',
    type: 'Traditioneller Markt',
  },
  {
    name: 'Warmblut Auktion Stadl-Paura',
    date: 'Frühjahr & Herbst 2025',
    location: 'Stadl-Paura (OÖ)',
    description: 'Auktion für österreichische Warmblüter durch den OÖ Pferdezuchtverband.',
    type: 'Verbandsauktion',
  },
];

// Austrian breed highlights
const austrianBreeds = [
  {
    name: 'Noriker',
    description: 'Österreichs heimische Kaltblutrasse aus den Alpen. Robust, sanft und vielseitig. Ideal für Freizeit, Fahren und leichte Landwirtschaft.',
    size: '155-170 cm',
    priceRange: '3.000-12.000 €',
    region: 'Kärnten, Salzburg, Steiermark',
  },
  {
    name: 'Haflinger',
    description: 'Die goldene Bergrasse mit Weltruf. Tirol ist das Zentrum der Haflinger-Zucht. Trittsicher, genügsam und ideal für Anfänger.',
    size: '138-150 cm',
    priceRange: '4.000-15.000 €',
    region: 'Tirol, Vorarlberg',
  },
  {
    name: 'Lipizzaner',
    description: 'Die edle Barockrasse der Spanischen Hofreitschule. Das Gestüt Piber züchtet alle Lipizzaner für Wien.',
    size: '155-165 cm',
    priceRange: '10.000-50.000+ €',
    region: 'Steiermark (Piber), Wien',
  },
  {
    name: 'Österreichisches Warmblut',
    description: 'Vielseitiges Sportpferd für Dressur, Springen und Vielseitigkeit. Gezüchtet von den Landespferdezuchtverbänden.',
    size: '165-175 cm',
    priceRange: '8.000-30.000 €',
    region: 'Alle Bundesländer',
  },
];

// Price Overview by Region
const priceOverview = [
  { category: 'Freizeitpferde (Einsteiger)', priceRange: '2.500 - 6.000 €', note: 'Kärnten/Steiermark günstiger' },
  { category: 'Noriker (gut ausgebildet)', priceRange: '4.000 - 10.000 €', note: 'Salzburg/Kärnten beste Auswahl' },
  { category: 'Haflinger (gut ausgebildet)', priceRange: '5.000 - 12.000 €', note: 'Tirol 10-15% teurer' },
  { category: 'Lipizzaner', priceRange: '10.000 - 50.000+ €', note: 'Nur aus Piber oder privaten Züchtern' },
  { category: 'Warmblut Dressur (L-Niveau)', priceRange: '12.000 - 25.000 €', note: 'Wien/NÖ teurer' },
  { category: 'Warmblut Springen (M-Niveau)', priceRange: '15.000 - 35.000 €', note: 'Auktionen in Stadl-Paura' },
  { category: 'Ponys & Kleinpferde', priceRange: '2.000 - 5.000 €', note: 'Willhaben gute Auswahl' },
];

export default function PferdKaufenOesterreich() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: trendingIcon
  };

  const sections = [
    { id: 'online-marktplaetze', title: 'Online-Marktplätze im Vergleich' },
    { id: 'regionale-zuechter', title: 'Züchter & Gestüte nach Bundesland' },
    { id: 'zuchtverbande', title: 'Zuchtverbände & Verkaufsportale' },
    { id: 'oesterreichische-rassen', title: 'Österreichische Pferderassen' },
    { id: 'maerkte-events', title: 'Pferdemärkte & Auktionen 2025' },
    { id: 'preise', title: 'Preisübersicht nach Region' },
    { id: 'kauftipps', title: 'Tipps für den Kauf in Österreich' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Wie viele Pferde werden aktuell in Österreich angeboten?',
      answer: 'Auf den großen Online-Plattformen finden Sie zusammen über 4.500 Pferde-Inserate in Österreich. Ehorses.at hat rund 2.200 Inserate, Willhaben.at etwa 1.500 und Landwirt.com weitere 800. Dazu kommen die Verkaufspferde direkt bei den Zuchtverbänden und auf den regionalen Pferdemärkten.'
    },
    {
      question: 'Welches Bundesland ist am besten für den Pferdekauf?',
      answer: 'Das hängt von der gewünschten Rasse ab: Tirol ist das Zentrum für Haflinger (aber 10-15% teurer). Kärnten und Salzburg sind ideal für Noriker zu guten Preisen. Die Steiermark bietet Lipizzaner aus Piber. Oberösterreich hat die größte Vielfalt. Wien ist teuer, aber nah an vielen Reitanlagen.'
    },
    {
      question: 'Was kosten Pferde in Österreich?',
      answer: 'Die Preise variieren stark nach Rasse und Region: Freizeitpferde kosten 2.500-6.000 EUR, Noriker 4.000-10.000 EUR, Haflinger 5.000-12.000 EUR. Lipizzaner aus Piber starten bei 10.000 EUR. Warmblüter für den Sport liegen bei 12.000-35.000 EUR. Kärnten und Steiermark sind generell günstiger als Tirol oder Wien.'
    },
    {
      question: 'Was ist besser: Willhaben oder ehorses?',
      answer: 'Beide haben Vorteile: Willhaben ist Österreichs größtes Kleinanzeigenportal mit vielen Privatverkäufern und oft günstigeren Preisen. Ehorses ist der größte internationale Pferdemarkt mit professionelleren Anzeigen und mehr Sportpferden. Tipp: Nutze beide parallel für die größte Auswahl.'
    },
    {
      question: 'Wann finden die wichtigsten Pferdemessen statt?',
      answer: 'Das Highlight ist "Pferd Wels" im November – Österreichs größte Pferdemesse mit Auktionen aller Rassen. Für Haflinger gibt es die Weltschau in Ebbs (Tirol), für Noriker die Bundesschau im September. Lipizzaner-Fohlen werden im Oktober in Piber versteigert.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('oesterreich').map(entry => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description
  }));

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <RatgeberHead
        slug="oesterreich"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/horses-mountain-meadow-lake.webp"
        locales={seoLocales}
        datePublished="2025-11-30"
        wordCount={2400}
        breadcrumbTitle="Pferd kaufen Österreich"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={mapPinIcon}
          badgeLabel="Marktplatz-Übersicht"
          title="Pferd kaufen in Österreich: Alle Marktplätze, Züchter & Auktionen 2025"
          subtitle="Über 4.500 Pferde warten in Österreich auf neue Besitzer. Hier findest du alle Online-Portale von Willhaben bis Landwirt.com, Züchter von Tirol bis Wien, die wichtigsten Pferdemessen und Zuchtverbände mit Verkaufsportalen."
          readTime="15 Min."
          publishDate="November 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/horses-mountain-meadow-lake.webp"
          alt="Pferde auf einer Bergwiese am See - typisch für die alpine Pferdehaltung in Österreich"
          priority={true}
          objectPosition="center 95%"
          attribution={{
            author: 'rejflinger',
            license: 'CC BY 2.0',
            licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
            source: ''
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Österreich ist ein Pferdeland mit langer Tradition.</strong> Von den weltberühmten Lipizzanern der Spanischen Hofreitschule über die robusten Noriker aus den Alpen bis zu den goldenen Haflingern aus Tirol: In Österreich findest du einzigartige Pferderassen, die nirgendwo sonst so authentisch gezüchtet werden.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Seite gibt dir einen vollständigen Überblick über alle Möglichkeiten, in Österreich ein Pferd zu finden: Online-Marktplätze im Vergleich, Züchter und Gestüte sortiert nach Bundesland, die Zuchtverbände mit ihren Verkaufsportalen und die wichtigsten Pferdemessen und Auktionen 2025.
            </p>
          </section>

          {/* Section: Online Marketplaces */}
          <section id="online-marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Online-Marktplätze im Vergleich
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Österreich hat eine einzigartige Marktplatz-Landschaft: Neben den internationalen Plattformen gibt es mit Willhaben und Landwirt.com starke lokale Alternativen. Hier die wichtigsten im Vergleich:
            </p>

            {/* Marketplace Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="px-4 py-3 text-left font-semibold">Plattform</th>
                    <th className="px-4 py-3 text-left font-semibold">Inserate AT</th>
                    <th className="px-4 py-3 text-left font-semibold">Besonderheit</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineMarketplaces.map((marketplace, index) => (
                    <tr key={marketplace.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3">
                        <a
                          href={marketplace.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-dark font-medium inline-flex items-center gap-1"
                        >
                          {marketplace.name}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {marketplace.highlight && (
                          <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">Empfohlen</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{marketplace.listings}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{marketplace.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 italic">
              Stand: Dezember 2025. Die Zahlen schwanken je nach Saison.
            </p>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Tipp:</strong> Für österreichische Rassen wie Noriker und Haflinger ist <strong>Landwirt.com</strong> oft die beste Quelle – hier inserieren die Bauern und Züchter direkt. Für Sportpferde und internationale Rassen ist <strong>ehorses</strong> die erste Wahl.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Einen ausführlichen Vergleich aller Pferdemarkt-Portale findest du in unserem <LocalizedLink href="/pferde-ratgeber/pferdemarkt" className="text-brand hover:text-brand-dark underline">Pferdemarkt-Vergleich</LocalizedLink>.
            </p>
          </section>

          {/* Section: Regional Breeders */}
          <section id="regionale-zuechter" className="scroll-mt-32 lg:scroll-mt-40 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Züchter & Gestüte nach Bundesland
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Jedes Bundesland hat seine Pferde-Tradition. Tirol ist das Zentrum der Haflinger-Zucht, Kärnten und Salzburg sind bekannt für Noriker, die Steiermark beherbergt das weltberühmte Lipizzaner-Gestüt Piber.
            </p>

            {Object.values(regionalBreeders).map((region) => (
              <div key={region.region} className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                  {region.region}
                </h3>
                <p className="text-gray-600">{region.description}</p>

                <div className="grid gap-4">
                  {region.breeders.map((breeder) => (
                    <div key={breeder.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {breeder.url ? (
                              <a
                                href={breeder.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand hover:text-brand-dark inline-flex items-center gap-1"
                              >
                                {breeder.name}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              breeder.name
                            )}
                            {'official' in breeder && breeder.official && (
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Offiziell</span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-500">{breeder.location}</p>
                        </div>
                        {breeder.rating && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{breeder.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">{breeder.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="Gefundenes Pferd bewerten lassen"
            icon={euroIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Du hast ein interessantes Pferd in Österreich gefunden? Lass dir in 2 Minuten eine KI-gestützte Werteinschätzung geben und gehe informiert in die Verhandlung.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Pferdewert berechnen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Breeding Associations */}
          <section id="zuchtverbande" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Zuchtverbände mit Verkaufsportalen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die österreichischen Zuchtverbände betreiben eigene Verkaufsportale und veranstalten regelmäßig Auktionen. Der Vorteil: Registrierte Pferde mit dokumentierter Abstammung und oft tierärztlicher Beurteilung.
            </p>

            <div className="grid gap-6">
              {breedingAssociations.map((association) => (
                <div key={association.name} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand/10 rounded-lg">
                      <Award className="w-6 h-6 text-brand" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <a
                          href={association.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-dark inline-flex items-center gap-1"
                        >
                          {association.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-3">{association.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href={association.salesPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-dark font-medium inline-flex items-center gap-1"
                        >
                          Verkaufsportal
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-gray-500">Events: {association.events}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Austrian Breeds */}
          <section id="oesterreichische-rassen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Österreichische Pferderassen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Österreich hat einzigartige Pferderassen mit jahrhundertelanger Tradition. Diese Rassen findest du nirgendwo sonst in dieser Qualität und Authentizität:
            </p>

            <div className="space-y-6">
              {austrianBreeds.map((breed) => (
                <div key={breed.name} className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                  <p className="text-gray-600 mb-3">{breed.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-500">Stockmaß: {breed.size}</span>
                    <span className="font-semibold text-brand">Preis: {breed.priceRange}</span>
                    <span className="text-gray-500">Zuchtgebiet: {breed.region}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mehr zu einzelnen Rassen findest du in unseren Ratgebern zu <LocalizedLink href="/pferd-kaufen/haflinger" className="text-brand hover:text-brand-dark underline">Haflinger</LocalizedLink> und <LocalizedLink href="/pferde-ratgeber/lipizzaner" className="text-brand hover:text-brand-dark underline">Lipizzaner</LocalizedLink>.
            </p>
          </section>

          {/* Section: Events 2025 */}
          <section id="maerkte-events" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pferdemärkte & Auktionen 2025 in Österreich
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Österreich hat eine reiche Tradition an Pferdemessen und Auktionen. Die wichtigsten Termine 2025:
            </p>

            <div className="space-y-4">
              {events2025.map((event) => (
                <div key={event.name} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-brand" />
                        <span className="text-sm font-medium text-brand">{event.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Box 2 */}
          <RatgeberHighlightBox
            title="Vorbereitet zur Auktion"
            icon={mountainIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Ob Pferd Wels oder Lipizzaner-Fohlenmarkt in Piber: Mit einer vorherigen Werteinschätzung weißt du genau, bis zu welchem Preis du mitbieten solltest.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Werteinschätzung holen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Price Overview */}
          <section id="preise" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Preisübersicht: Was kosten Pferde in Österreich?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Österreich hat regionale Preisunterschiede: Tirol ist für Haflinger 10-15% teurer als der Durchschnitt. Wien und Umgebung sind generell teurer. Kärnten und Steiermark bieten oft die besten Preis-Leistungs-Verhältnisse.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="px-4 py-3 text-left font-semibold">Kategorie</th>
                    <th className="px-4 py-3 text-left font-semibold">Preisspanne</th>
                    <th className="px-4 py-3 text-left font-semibold">Hinweis</th>
                  </tr>
                </thead>
                <tbody>
                  {priceOverview.map((item, index) => (
                    <tr key={item.category} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.category}</td>
                      <td className="px-4 py-3 font-semibold text-brand">{item.priceRange}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mehr Informationen zu Pferdepreisen allgemein findest du in unserem <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand hover:text-brand-dark underline">ausführlichen Kostenratgeber</LocalizedLink>.
            </p>
          </section>

          {/* Section: Buying Tips */}
          <section id="kauftipps" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Tipps für den Pferdekauf in Österreich
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">1. Nutze die Vielfalt der Marktplätze</h3>
                <p className="text-gray-600">
                  Willhaben hat die meisten Privatverkäufer, Landwirt.com die besten Noriker-Angebote, ehorses die größte Sportpferde-Auswahl. Nutze alle drei parallel.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">2. Besuche die Zuchtgebiete</h3>
                <p className="text-gray-600">
                  Für Haflinger lohnt sich eine Reise nach Tirol (Ebbs), für Noriker nach Kärnten oder Salzburg, für Lipizzaner nach Piber. Die Pferdedichte ist dort so hoch, dass du an einem Wochenende mehrere Züchter besuchen kannst.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">3. Pferd Wels nicht verpassen</h3>
                <p className="text-gray-600">
                  Die Messe &quot;Pferd Wels&quot; im November ist der perfekte Ort, um Züchter kennenzulernen, Pferde zu vergleichen und an Auktionen teilzunehmen. Hier triffst du die gesamte österreichische Pferdeszene.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">4. AKU von lokalen Tierärzten</h3>
                <p className="text-gray-600">
                  Österreich hat eine hohe Dichte an spezialisierten Pferde-Tierärzten. Lass die <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">Ankaufsuntersuchung</LocalizedLink> vor Ort durchführen. Kosten: 300-600 EUR.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">5. Kaufvertrag nicht vergessen</h3>
                <p className="text-gray-600">
                  Auch beim freundlichen Tiroler Bauern gilt: Nur ein schriftlicher <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-brand hover:text-brand-dark underline">Kaufvertrag</LocalizedLink> schützt dich rechtlich. Das ist in Österreich Standard.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zum Pferdekauf in Österreich"
              sectionSubtitle="Antworten zu Marktplätzen, Bundesländern, Preisen und österreichischen Rassen"
              withSchema={false}
            />
          </div>
        </section>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 mt-16">
          <AuthorBox />
        </div>

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weitere hilfreiche Ratgeber"
          articles={relatedArticles}
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Pferdebewertung mit PferdeWert'
          }}
          title="Gefunden? Jetzt bewerten lassen."
          description="Nutze unsere KI-gestützte Analyse in nur 2 Minuten und gehe mit einer fundierten Werteinschätzung in die Verhandlung – objektiv, schnell und zuverlässig."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
