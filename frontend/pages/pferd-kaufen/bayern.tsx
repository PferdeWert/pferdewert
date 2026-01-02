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
    title: 'Pferd kaufen Bayern: Gestüte & Märkte 2025 | PferdeWert',
    description: 'Pferd kaufen in Bayern: Über 1.800 Inserate auf ehorses & Co. Plus: Top-Gestüte in Oberbayern, Pferdemärkte 2025 & Landesverband mit Auktionen.',
    keywords: 'pferd kaufen bayern, pferdemarkt bayern, gestüt oberbayern, bayerisches warmblut, pferde münchen, rottaler kaufen',
    ogTitle: 'Pferd kaufen Bayern 2025: Alle Marktplätze & Gestüte',
    ogDescription: 'Komplette Übersicht: Online-Marktplätze, renommierte Gestüte in Oberbayern & Niederbayern, Pferdemärkte 2025 und Zuchtverbände in Bayern.',
    twitterTitle: 'Pferd kaufen Bayern 2025: Alle Marktplätze & Gestüte',
    twitterDescription: 'Über 1.800 Pferde-Inserate in Bayern. Plus: Top-Gestüte, Pferdemärkte 2025 & Verbands-Auktionen.',
  },
  at: {
    title: 'Pferde aus Bayern kaufen: Grenznahe Gestüte für Österreicher',
    description: 'Pferde aus Bayern für österreichische Käufer: Online-Portale, grenznahe Gestüte in Oberbayern, kurze Transportwege & Import-Tipps.',
    keywords: 'pferd kaufen bayern österreich, grenznahe gestüte, bayerisches warmblut österreich, pferdetransport bayern',
    ogTitle: 'Pferde aus Bayern kaufen: Guide für Österreicher',
    ogDescription: 'Pferde aus Bayern: Grenznahe Gestüte, kurze Transportwege & Import-Tipps für österreichische Käufer.',
    twitterTitle: 'Pferde aus Bayern für Österreicher',
    twitterDescription: 'Grenznahe Gestüte & kurze Transportwege nach Österreich.',
  },
  ch: {
    title: 'Pferde aus Bayern kaufen: Marktplätze & Import für Schweizer',
    description: 'Pferde aus Bayern für Schweizer Käufer: Online-Portale, renommierte Gestüte, Bayerisches Warmblut & Import aus Deutschland.',
    keywords: 'pferd import bayern, bayerische gestüte schweiz, warmblut kaufen deutschland',
    ogTitle: 'Pferde aus Bayern kaufen: Guide für Schweizer',
    ogDescription: 'Pferde aus Bayern: Marktplätze, Gestüte & Import-Tipps für Schweizer Käufer.',
    twitterTitle: 'Pferde aus Bayern für Schweizer',
    twitterDescription: 'Import-Guide: Pferde aus Bayern kaufen.',
  },
};

// Online Marketplace Data
const onlineMarketplaces = [
  {
    name: 'ehorses.de',
    url: 'https://www.ehorses.de/pferde/bayern/',
    listings: '~1.100',
    description: 'Größter Pferdemarkt Europas mit umfangreichen Bayern-Filtern',
    highlight: true,
  },
  {
    name: 'Kleinanzeigen',
    url: 'https://www.kleinanzeigen.de/s-bayern/pferde/k0l937',
    listings: '~450',
    description: 'Viele Privatanbieter, oft günstigere Preise',
    highlight: false,
  },
  {
    name: 'pferde.de',
    url: 'https://www.pferde.de/pferdemarkt/bayern/',
    listings: '~200',
    description: 'Traditioneller Marktplatz mit regionaler Suche',
    highlight: false,
  },
  {
    name: 'caballo-horsemarket.com',
    url: 'https://www.caballo-horsemarket.com/',
    listings: '~80',
    description: 'Fokus auf Sportpferde und Dressur',
    highlight: false,
  },
];

// Regional Breeders/Sellers Data
const regionalBreeders = {
  oberbayern: {
    region: 'Oberbayern',
    description: 'Premium-Segment mit internationalen Sportpferden und exzellenter Infrastruktur',
    breeders: [
      { name: 'Landgestüt Schwaiganger', location: 'Ohlstadt', specialty: 'Bayerisches Warmblut, Hengststation', rating: '4.8', url: 'https://www.schwaiganger.bayern.de', official: true },
      { name: 'Gestüt Gut Ising', location: 'Chieming', specialty: 'Dressur- und Springpferde', rating: '4.9', url: 'https://www.gut-ising.de' },
      { name: 'Reitanlage Aubenhausen', location: 'Bad Aibling', specialty: 'Dressurpferde, Verkauf', rating: '4.7', url: null },
      { name: 'Pferdehof Tegernbach', location: 'Moosburg', specialty: 'Freizeitpferde, Westernpferde', rating: '4.6', url: null },
    ],
  },
  niederbayern: {
    region: 'Niederbayern',
    description: 'Traditionelle Zuchtgebiete mit Rottaler und Süddeutschem Kaltblut',
    breeders: [
      { name: 'Gestüt Mönchhof', location: 'Pfarrkirchen', specialty: 'Rottaler (seltene Rasse!)', rating: '4.9', url: null },
      { name: 'Pferdezucht Bauer', location: 'Landshut', specialty: 'Bayerisches Warmblut, Sportpferde', rating: '4.5', url: null },
      { name: 'Reiterhof Deggendorf', location: 'Deggendorf', specialty: 'Freizeitpferde, Schulbetrieb', rating: '4.4', url: null },
      { name: 'Kaltblutzucht Niederbayern', location: 'Straubing', specialty: 'Süddeutsches Kaltblut', rating: '4.8', url: null },
    ],
  },
  schwaben: {
    region: 'Schwaben & Allgäu',
    description: 'Paradies für Haflinger, Westernpferde und robuste Freizeitpferde',
    breeders: [
      { name: 'Western City Dasing', location: 'Dasing', specialty: 'Quarter Horses, Paint Horses', rating: '4.3', url: 'https://www.western-city.de' },
      { name: 'Haflingerhof Allgäu', location: 'Oberstdorf', specialty: 'Haflinger, almgeprägte Pferde', rating: '4.9', url: null },
      { name: 'Gestüt Augsburg', location: 'Augsburg', specialty: 'Sportpferde, Warmblut', rating: '4.5', url: null },
      { name: 'Reiterhof Kempten', location: 'Kempten', specialty: 'Freizeitpferde, Fjordpferde', rating: '4.6', url: null },
    ],
  },
  franken: {
    region: 'Franken (Ober-, Mittel-, Unterfranken)',
    description: 'Vielfältige Pferdeszene mit Warmblut und Freizeitpferden',
    breeders: [
      { name: 'Gestüt Frankenland', location: 'Nürnberg', specialty: 'Bayerisches Warmblut, Dressur', rating: '4.7', url: null },
      { name: 'Reitanlage Würzburg', location: 'Würzburg', specialty: 'Sportpferde, Ausbildung', rating: '4.5', url: null },
      { name: 'Pferdehof Bamberg', location: 'Bamberg', specialty: 'Freizeitpferde, Ponys', rating: '4.4', url: null },
      { name: 'Zuchtbetrieb Oberfranken', location: 'Bayreuth', specialty: 'Warmblut, Fohlen', rating: '4.6', url: null },
    ],
  },
};

// Breeding Associations
const breedingAssociations = [
  {
    name: 'Landesverband Bayerischer Pferdezüchter e.V.',
    shortName: 'LVBP',
    url: 'https://www.bayerns-pferde.de',
    salesPortal: 'https://www.bayerns-pferde.de',
    description: 'Offizieller Zuchtverband für Bayern. Auktionen in München und Südbayern.',
    events: 'Südbayerisches Reitpferdefohlen-Championat, Bayerns Pferde International',
  },
  {
    name: 'Landgestüt Schwaiganger',
    shortName: 'Schwaiganger',
    url: 'https://www.schwaiganger.bayern.de',
    salesPortal: 'https://www.schwaiganger.bayern.de/hengste/',
    description: 'Staatliches Landgestüt seit 1747. Hengststation und Ausbildungszentrum.',
    events: 'Hengstparade (jährlich im September)',
  },
];

// Events 2025
const events2025 = [
  {
    name: "Bayerns Pferde International",
    date: '5.-8. Juni 2025',
    location: 'München-Riem (Olympiareitanlage)',
    description: 'Größte Pferdemesse Süddeutschlands mit Auktionen, Turnieren und Verkaufspferden.',
    type: 'Messe & Auktion',
  },
  {
    name: 'Hengstparade Schwaiganger',
    date: 'September 2025 (genaues Datum folgt)',
    location: 'Ohlstadt (Landgestüt)',
    description: 'Traditionelle Präsentation der Landbeschäler. Einblick in die bayerische Zucht.',
    type: 'Staatliche Veranstaltung',
  },
  {
    name: 'Berchinger Rossmarkt',
    date: 'Februar & August 2025',
    location: 'Berching (Oberpfalz)',
    description: 'Einer der ältesten Pferdemärkte Bayerns. Traditioneller Handel mit Kaltblütern.',
    type: 'Traditioneller Markt',
  },
  {
    name: 'Ingolstädter Pferdemarkt',
    date: 'Jeden 2. Samstag im Monat',
    location: 'Ingolstadt',
    description: 'Regelmäßiger regionaler Markt für Freizeitpferde und Ponys.',
    type: 'Regelmäßiger Markt',
  },
  {
    name: 'Herbstmarkt Landshut',
    date: 'Oktober 2025 (genaues Datum folgt)',
    location: 'Landshut',
    description: 'Traditioneller Jahrmarkt mit Pferdehandel. Fokus auf Niederbayerische Zucht.',
    type: 'Traditioneller Markt',
  },
];

// Price Overview
const priceOverview = [
  { category: 'Freizeitpferde (solide Grundausbildung)', priceRange: '3.500 - 8.000 €', note: 'Niederbayern oft günstiger' },
  { category: 'Bayerisches Warmblut (L-Niveau)', priceRange: '12.000 - 25.000 €', note: 'Oberbayern Premium-Segment' },
  { category: 'Haflinger (gut ausgebildet)', priceRange: '4.000 - 9.000 €', note: 'Allgäu beste Auswahl' },
  { category: 'Springpferde (M-Niveau)', priceRange: '18.000 - 40.000 €', note: 'München-Umland teurer' },
  { category: 'Dressurpferde (M-Niveau)', priceRange: '20.000 - 50.000 €', note: 'Gut Ising als Referenz' },
  { category: 'Quarter Horses (Freizeit)', priceRange: '5.000 - 12.000 €', note: 'Western City Dasing' },
  { category: 'Süddeutsches Kaltblut', priceRange: '4.000 - 12.000 €', note: 'Niederbayern Zuchtgebiet' },
  { category: 'Rottaler (selten!)', priceRange: '5.000 - 15.000 €', note: 'Nur ~30 Zuchttiere existieren' },
];

// Bavarian breed highlights
const bavarianBreeds = [
  {
    name: 'Bayerisches Warmblut',
    description: 'Die Hauptrasse des Freistaats, gezüchtet seit 1754 im Landgestüt Schwaiganger. Vielseitig einsetzbar für Dressur, Springen und Fahrsport.',
    size: '160-170 cm',
    priceRange: '8.000-25.000 €',
  },
  {
    name: 'Rottaler',
    description: 'Bayerns vergessener Schatz und eine der seltensten deutschen Rassen. Nur noch etwa 30 Zuchttiere, fast ausschließlich in Niederbayern.',
    size: '155-165 cm',
    priceRange: '5.000-15.000 €',
  },
  {
    name: 'Süddeutsches Kaltblut',
    description: 'Der bayerische Kraftprotz, perfekt an bergige Regionen angepasst. Unersetzlich in der Forstwirtschaft des Bayerischen Waldes.',
    size: '155-165 cm',
    priceRange: '4.000-12.000 €',
  },
];

export default function PferdKaufenBayern() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: trendingIcon
  };

  const sections = [
    { id: 'online-marktplaetze', title: 'Online-Marktplätze mit Bayern-Filter' },
    { id: 'regionale-zuechter', title: 'Gestüte & Züchter nach Region' },
    { id: 'zuchtverband', title: 'Zuchtverband & Landgestüt' },
    { id: 'bayerische-rassen', title: 'Bayerische Pferderassen' },
    { id: 'maerkte-events', title: 'Pferdemärkte & Events 2025' },
    { id: 'preise', title: 'Preisübersicht Bayern' },
    { id: 'kauftipps', title: 'Tipps für den Kauf in Bayern' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Wie viele Pferde werden aktuell in Bayern angeboten?',
      answer: 'Auf den großen Online-Plattformen finden Sie zusammen über 1.800 Pferde-Inserate mit Standort Bayern. Allein auf ehorses.de sind es rund 1.100 Pferde, auf Kleinanzeigen etwa 450 und auf pferde.de weitere 200. Dazu kommen die Verkaufspferde direkt bei den Gestüten und über den Landesverband.'
    },
    {
      question: 'Welche Region in Bayern ist am besten für den Pferdekauf?',
      answer: 'Das hängt von Ihrem Budget und Ziel ab: Oberbayern (München, Chiemsee) bietet Premium-Sportpferde, ist aber teurer. Niederbayern hat die traditionellen Zuchtgebiete mit Rottaler und Kaltblut zu moderaten Preisen. Das Allgäu ist ideal für Haflinger und robuste Freizeitpferde. Franken bietet eine vielfältige Mischung.'
    },
    {
      question: 'Was ist das Besondere an bayerischen Pferden?',
      answer: 'Viele bayerische Pferde profitieren von der traditionellen Alm-Aufzucht. Jungpferde verbringen ihre ersten Sommer auf Almen in 1.000-1.800m Höhe. Das macht sie besonders robust, trittsicher und sozialverträglich. Fragen Sie gezielt nach "almgeprägten" Pferden.'
    },
    {
      question: 'Was kosten Pferde in Bayern im Vergleich?',
      answer: 'Bayern hat regionale Preisunterschiede: Oberbayern (Münchner Umland) ist 20-30% teurer als der Durchschnitt. Niederbayern und Franken bieten moderate Preise. Ein solides Freizeitpferd kostet 3.500-8.000 EUR, Bayerische Warmblüter auf L-Niveau 12.000-25.000 EUR.'
    },
    {
      question: 'Wann finden die wichtigsten Pferdemärkte in Bayern statt?',
      answer: 'Das Highlight ist "Bayerns Pferde International" im Juni in München-Riem. Der Berchinger Rossmarkt findet im Februar und August statt, die Hengstparade in Schwaiganger im September. In Ingolstadt gibt es jeden 2. Samstag einen regelmäßigen Pferdemarkt.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('bayern').map(entry => ({
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
        slug="bayern"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/pferd-weide-haimhausen-bayern.webp"
        locales={seoLocales}
        datePublished="2025-12-14"
        wordCount={2100}
        breadcrumbTitle="Pferd kaufen Bayern"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={mapPinIcon}
          badgeLabel="Marktplatz-Übersicht"
          title="Pferd kaufen in Bayern: Alle Marktplätze, Gestüte & Pferdemärkte 2025"
          subtitle="Über 1.800 Pferde warten im Freistaat auf neue Besitzer. Hier findest du alle Online-Portale, renommierte Gestüte von Oberbayern bis Franken, die wichtigsten Pferdemärkte und das staatliche Landgestüt Schwaiganger."
          readTime="14 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/pferd-weide-haimhausen-bayern.webp"
          alt="Pferd auf grüner Weide vor bayerischer Alpenkulisse"
          priority={true}
          objectPosition="center 30%"
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Bayern ist mehr als nur Pferdekauf – es ist eine Reise in eine lebendige Zuchtkultur.</strong> Vom staatlichen Landgestüt Schwaiganger (gegründet 1747) über die Alm-Aufzucht im Allgäu bis zu den seltenen Rottaler Pferden in Niederbayern: Der Freistaat bietet einzigartige Möglichkeiten für Pferdeliebhaber.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Seite gibt dir einen vollständigen Überblick: Online-Marktplätze mit Bayern-Filter, renommierte Gestüte sortiert nach Region, der Landesverband mit seinen Auktionen, die traditionellen Pferdemärkte 2025 und alles zu den bayerischen Pferderassen.
            </p>
          </section>

          {/* Section: Online Marketplaces */}
          <section id="online-marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Online-Marktplätze mit Bayern-Filter
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die schnellste Möglichkeit, einen Überblick über das aktuelle Angebot zu bekommen: Online-Pferdemärkte. Alle großen Plattformen bieten Filter für Bayern. Hier die wichtigsten im Vergleich:
            </p>

            {/* Marketplace Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="px-4 py-3 text-left font-semibold">Plattform</th>
                    <th className="px-4 py-3 text-left font-semibold">Inserate Bayern</th>
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

            <p className="text-lg text-gray-700 leading-relaxed">
              Einen ausführlichen Vergleich aller Pferdemarkt-Portale findest du in unserem <LocalizedLink href="/pferde-ratgeber/pferdemarkt" className="text-brand hover:text-brand-dark underline">Pferdemarkt-Vergleich</LocalizedLink>.
            </p>
          </section>

          {/* Section: Regional Breeders */}
          <section id="regionale-zuechter" className="scroll-mt-32 lg:scroll-mt-40 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gestüte & Züchter nach Region
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wer direkt beim Züchter oder Gestüt kauft, erhält oft die beste Beratung und kennt die komplette Vorgeschichte des Pferdes. Bayern hat vier große Pferderegionen mit unterschiedlichen Schwerpunkten:
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
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Staatlich</span>
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

            <p className="text-lg text-gray-700 leading-relaxed bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <strong>Tipp:</strong> Viele kleinere Züchter in Bayern haben keine Website, sind aber über den Landesverband Bayerischer Pferdezüchter zu finden. Eine Google-Maps-Suche nach &quot;Pferdezucht + Ort&quot; liefert oft gute Ergebnisse.
            </p>
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="Gefundenes Pferd bewerten lassen"
            icon={euroIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Du hast ein interessantes Pferd in Bayern gefunden? Lass dir in 2 Minuten eine KI-gestützte Werteinschätzung geben und gehe informiert in die Verhandlung.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Pferdewert berechnen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Breeding Association */}
          <section id="zuchtverband" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Zuchtverband & Landgestüt
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Landesverband Bayerischer Pferdezüchter und das staatliche Landgestüt Schwaiganger sind zentrale Anlaufstellen für den Pferdekauf in Bayern:
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

          {/* Section: Bavarian Breeds */}
          <section id="bayerische-rassen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Bayerische Pferderassen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bayern hat einzigartige Pferderassen, die nirgendwo sonst so authentisch zu finden sind:
            </p>

            <div className="space-y-6">
              {bavarianBreeds.map((breed) => (
                <div key={breed.name} className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                  <p className="text-gray-600 mb-3">{breed.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-500">Stockmaß: {breed.size}</span>
                    <span className="font-semibold text-brand">Preis: {breed.priceRange}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mehr zu Pferderassen findest du in unseren Ratgebern zu <LocalizedLink href="/pferd-kaufen/haflinger" className="text-brand hover:text-brand-dark underline">Haflinger</LocalizedLink> und <LocalizedLink href="/pferd-kaufen/quarter-horse" className="text-brand hover:text-brand-dark underline">Quarter Horses</LocalizedLink>.
            </p>
          </section>

          {/* Section: Events 2025 */}
          <section id="maerkte-events" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pferdemärkte & Events 2025 in Bayern
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bayern hat eine reiche Tradition an Pferdemärkten und Events. Hier die wichtigsten Termine 2025:
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
            title="Vorbereitet zum Pferdemarkt"
            icon={mountainIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Ob Bayerns Pferde International oder traditioneller Rossmarkt: Mit einer vorherigen Werteinschätzung weißt du genau, welcher Preis fair ist.
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
              Preisübersicht: Was kosten Pferde in Bayern?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bayern hat deutliche regionale Preisunterschiede: Oberbayern (Münchner Umland, Chiemsee) ist 20-30% teurer als Niederbayern oder Franken. Hier eine Orientierung:
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
              Tipps für den Pferdekauf in Bayern
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">1. Frag nach Alm-Aufzucht</h3>
                <p className="text-gray-600">
                  Viele bayerische Pferde verbringen ihre ersten Sommer auf Almen in 1.000-1.800m Höhe. Diese Pferde sind besonders robust, trittsicher und sozialverträglich. Ein echtes Qualitätsmerkmal!
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">2. Beachte die Preisunterschiede</h3>
                <p className="text-gray-600">
                  Oberbayern ist das Premium-Segment mit entsprechenden Preisen. In Niederbayern und Franken findest du oft die gleiche Qualität zu moderateren Preisen – nur die Anreise ist länger.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">3. Nutze die Pferdemärkte</h3>
                <p className="text-gray-600">
                  &quot;Bayerns Pferde International&quot; im Juni ist das Highlight des Jahres. Aber auch kleinere Märkte wie Berching oder Ingolstadt bieten gute Gelegenheiten, Züchter kennenzulernen.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">4. Transportkosten einplanen</h3>
                <p className="text-gray-600">
                  Bayern ist groß! Von Lindau nach Passau sind es 400 km. Rechne mit 1,50-2,50 € pro Kilometer für den Pferdetransport. Viele Züchter bieten aber vergünstigte Konditionen innerhalb des Freistaats.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">5. AKU von Spezialisten</h3>
                <p className="text-gray-600">
                  Bayern hat exzellente Pferdekliniken. Die <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">Ankaufsuntersuchung</LocalizedLink> kostet 250-500 € (Standard) bzw. bis 1.200 € mit Röntgen.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">6. Kaufvertrag nicht vergessen</h3>
                <p className="text-gray-600">
                  Auch beim sympathischen Almbauern gilt: Nur ein schriftlicher <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-brand hover:text-brand-dark underline">Kaufvertrag</LocalizedLink> schützt dich rechtlich.
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
              sectionTitle="Häufig gestellte Fragen zum Pferdekauf in Bayern"
              sectionSubtitle="Antworten zu Marktplätzen, Regionen, Preisen und bayerischen Besonderheiten"
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
