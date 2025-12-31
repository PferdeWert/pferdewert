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
import { MapPin, TrendingUp, Euro, ExternalLink, Star, Calendar, Building2, Award } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const mapPinIcon = <MapPin className="w-5 h-5" />;
const trendingIcon = <TrendingUp className="w-5 h-5" />;
const euroIcon = <Euro className="w-5 h-5" />;
const buildingIcon = <Building2 className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pferd kaufen NRW 2025: Alle Marktplätze, Züchter & Märkte im Überblick',
    description: 'Pferd kaufen in NRW: 2.500+ Inserate auf ehorses & Co. Top-Züchter im Münsterland, Pferdemärkte 2025 & Zuchtverbände.',
    keywords: 'pferd kaufen nrw, pferdemarkt nrw, pferdezüchter münsterland, westfale kaufen, pferde kleinanzeigen nrw',
    ogTitle: 'Pferd kaufen NRW 2025: Alle Marktplätze & Züchter',
    ogDescription: 'Komplette Übersicht: Online-Marktplätze, regionale Züchter im Münsterland & Niederrhein, Pferdemärkte 2025 und Zuchtverbände in NRW.',
    twitterTitle: 'Pferd kaufen NRW 2025: Alle Marktplätze & Züchter',
    twitterDescription: 'Über 2.500 Pferde-Inserate in NRW. Plus: Top-Züchter, Pferdemärkte 2025 & Verbands-Verkaufsportale.',
  },
  at: {
    title: 'Pferde aus NRW kaufen: Marktplätze & Import-Guide für Österreicher',
    description: 'Pferde aus Nordrhein-Westfalen für österreichische Käufer: Online-Portale, renommierte Züchter, Westfälisches Pferdestammbuch & Import-Tipps.',
    keywords: 'pferd kaufen deutschland, westfale kaufen österreich, import pferd nrw, deutsche warmblüter',
    ogTitle: 'Pferde aus NRW kaufen: Guide für Österreicher',
    ogDescription: 'Pferde aus Nordrhein-Westfalen: Online-Marktplätze, Züchter & Import-Tipps für österreichische Käufer.',
    twitterTitle: 'Pferde aus NRW für Österreicher',
    twitterDescription: 'Import-Guide: Pferde aus Nordrhein-Westfalen kaufen.',
  },
  ch: {
    title: 'Pferde aus NRW kaufen: Marktplätze & Import für Schweizer',
    description: 'Pferde aus Nordrhein-Westfalen für Schweizer Käufer: Online-Portale, Züchter im Münsterland, Westfalen & Import aus Deutschland.',
    keywords: 'pferd import deutschland, nrw züchter schweiz, westfale kaufen, pferdekauf deutschland',
    ogTitle: 'Pferde aus NRW kaufen: Guide für Schweizer',
    ogDescription: 'Pferde aus Nordrhein-Westfalen: Marktplätze, Züchter & Import-Tipps für Schweizer Käufer.',
    twitterTitle: 'Pferde aus NRW für Schweizer',
    twitterDescription: 'Import-Guide: Pferde aus Nordrhein-Westfalen kaufen.',
  },
};

// Online Marketplace Data
const onlineMarketplaces = [
  {
    name: 'ehorses.de',
    url: 'https://www.ehorses.de/pferde/nordrhein-westfalen/',
    listings: '~1.550',
    description: 'Größter Pferdemarkt Europas mit umfangreichen NRW-Filtern',
    highlight: true,
  },
  {
    name: 'Kleinanzeigen',
    url: 'https://www.kleinanzeigen.de/s-nordrhein-westfalen/pferde/k0l928',
    listings: '~800',
    description: 'Viele Privatanbieter, oft günstigere Preise',
    highlight: false,
  },
  {
    name: 'pferde.de',
    url: 'https://www.pferde.de/pferdemarkt/nordrhein-westfalen/',
    listings: '~400',
    description: 'Traditioneller Marktplatz mit regionaler Suche',
    highlight: false,
  },
  {
    name: 'caballo-horsemarket.com',
    url: 'https://www.caballo-horsemarket.com/',
    listings: '~150',
    description: 'Fokus auf Sportpferde und Dressur',
    highlight: false,
  },
];

// Regional Breeders Data
const regionalBreeders = {
  muensterland: {
    region: 'Münsterland',
    description: 'Deutschlands Pferdezucht-Hochburg mit jahrhundertelanger Tradition',
    breeders: [
      { name: 'Gestüt Letter Berg', location: 'Coesfeld', specialty: 'Westfälische Warmblüter, Dressur', rating: '4.7', url: 'https://gestuet-letterberg.de' },
      { name: 'Gestüt Isselhook', location: 'Isselburg', specialty: 'Spring- und Dressurpferde', rating: '5.0', url: null },
      { name: 'Hof Kasselmann', location: 'Hagen a.T.W.', specialty: 'Internationale Dressurpferde', rating: null, url: 'https://hof-kasselmann.de' },
      { name: 'Gestüt Ligges', location: 'Herbern', specialty: 'Springpferde, Hengststation', rating: '4.8', url: null },
    ],
  },
  niederrhein: {
    region: 'Niederrhein',
    description: 'Grenznahe Region mit Einflüssen aus den Niederlanden',
    breeders: [
      { name: 'Gestüt Niederrhein', location: 'Wesel', specialty: 'KWPN & Rheinische Warmblüter', rating: null, url: null },
      { name: 'Equus Finest', location: 'Kempen', specialty: 'Hochwertige Sportpferde', rating: '5.0', url: 'https://equus-finest.de' },
      { name: 'Reitsportzentrum Langenfeld', location: 'Langenfeld', specialty: 'Ausbildung & Verkauf', rating: '4.6', url: null },
    ],
  },
  sauerland: {
    region: 'Sauerland',
    description: 'Bergige Region mit robusten Freizeitpferden',
    breeders: [
      { name: 'Stefan Lang Freizeitpferde', location: 'Eslohe', specialty: 'Westernpferde, Quarter Horses', rating: '4.8', url: null },
      { name: 'Gestüt Sommerberg', location: 'Schmallenberg', specialty: 'Freizeitpferde, Ponys', rating: '4.9', url: null },
      { name: 'Reiterhof Schulte', location: 'Meschede', specialty: 'Haflinger, Isländer', rating: '4.5', url: null },
    ],
  },
  ruhrgebiet: {
    region: 'Ruhrgebiet & Köln/Düsseldorf',
    description: 'Urbane Pferdeszene mit modernen Anlagen',
    breeders: [
      { name: 'Pferdevermittlung May', location: 'Essen', specialty: 'Vermittlung aller Rassen', rating: null, url: null },
      { name: 'Gripshöver Sportpferde', location: 'Mülheim', specialty: 'Springpferde', rating: '4.7', url: null },
      { name: 'Reitanlage Gut Gnadental', location: 'Neuss', specialty: 'Dressur, Schulpferde', rating: '4.8', url: null },
    ],
  },
};

// Breeding Associations
const breedingAssociations = [
  {
    name: 'Westfälisches Pferdestammbuch e.V.',
    shortName: 'Westfalen',
    url: 'https://www.westfalenpferde.de',
    salesPortal: 'https://www.westfalenpferde.de/verkaufspferde/',
    description: 'Einer der größten deutschen Zuchtverbände. Regelmäßige Auktionen in Münster-Handorf.',
    events: 'Frühjahrs- und Herbstauktion',
  },
  {
    name: 'Rheinisches Pferdestammbuch e.V.',
    shortName: 'Rheinland',
    url: 'https://www.pferdezucht-rheinland.de',
    salesPortal: 'https://www.pferdezucht-rheinland.de/verkaufspferde/',
    description: 'Zuchtverband für den Rheinländer und andere Rassen. Verkaufsportal mit geprüften Pferden.',
    events: 'Rheinische Auktion, Fohlenchampionate',
  },
];

// Events 2025
const events2025 = [
  {
    name: 'Mariä-Geburts-Markt Telgte',
    date: '12.-16. September 2025',
    location: 'Telgte (Münsterland)',
    description: 'Einer der ältesten Pferdemärkte Deutschlands. Über 400 Jahre Tradition mit Pferdeschau und Verkauf.',
    type: 'Traditioneller Markt',
  },
  {
    name: 'Warendorfer Pferdenacht',
    date: '28.-30. August 2025',
    location: 'Warendorf',
    description: 'Große Pferdeveranstaltung mit Präsentationen, Auktionen und internationalem Publikum.',
    type: 'Event & Auktion',
  },
  {
    name: 'Westfalen-Woche',
    date: '29. Juli - 3. August 2025',
    location: 'Münster-Handorf',
    description: 'Bedeutendstes Turnier- und Zucht-Event in Westfalen mit Eliteauktion.',
    type: 'Turnier & Auktion',
  },
  {
    name: 'Rheinische Auktion',
    date: 'Oktober 2025 (genaues Datum folgt)',
    location: 'Langenfeld',
    description: 'Jährliche Auktion des Rheinischen Pferdestammbuchs mit ausgewählten Reitpferden.',
    type: 'Verbandsauktion',
  },
];

// Price Overview
const priceOverview = [
  { category: 'Freizeitpferde (solide Grundausbildung)', priceRange: '4.000 - 8.000 €', note: 'Viele Angebote auf Kleinanzeigen' },
  { category: 'Westfälische Warmblüter (L-Niveau)', priceRange: '10.000 - 20.000 €', note: 'Direkt vom Züchter oft günstiger' },
  { category: 'Springpferde (M-Niveau)', priceRange: '15.000 - 35.000 €', note: 'Münsterland hat große Auswahl' },
  { category: 'Dressurpferde (M-Niveau)', priceRange: '18.000 - 40.000 €', note: 'Hof Kasselmann als Referenz' },
  { category: 'Auktionspferde (Westfalen)', priceRange: '8.000 - 100.000+ €', note: 'Handorf-Auktionen haben breites Spektrum' },
  { category: 'Ponys & Kleinpferde', priceRange: '2.000 - 6.000 €', note: 'Gutes Angebot im Sauerland' },
];

export default function PferdKaufenNrw() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: trendingIcon
  };

  const sections = [
    { id: 'online-marktplaetze', title: 'Online-Marktplätze mit NRW-Filter' },
    { id: 'regionale-zuechter', title: 'Regionale Züchter nach Gebiet' },
    { id: 'zuchtverbande', title: 'Zuchtverbände & Verkaufsportale' },
    { id: 'maerkte-events', title: 'Pferdemärkte & Events 2025' },
    { id: 'preise', title: 'Preisübersicht NRW' },
    { id: 'kauftipps', title: 'Tipps für den Kauf in NRW' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Wie viele Pferde werden aktuell in NRW angeboten?',
      answer: 'Auf den großen Online-Plattformen finden Sie zusammen über 2.500 Pferde-Inserate mit Standort NRW. Allein auf ehorses.de sind es rund 1.550 Pferde, auf Kleinanzeigen etwa 800 und auf pferde.de weitere 400. Dazu kommen die Verkaufspferde direkt bei den Züchtern und Zuchtverbänden.'
    },
    {
      question: 'Welche Region in NRW ist am besten für den Pferdekauf?',
      answer: 'Das Münsterland ist die traditionsreichste Pferdezucht-Region mit der höchsten Dichte an Züchtern und Gestüten. Hier finden Sie vor allem Westfälische Warmblüter für Dressur und Springen. Der Niederrhein bietet Einflüsse aus den Niederlanden (KWPN), während das Sauerland für robuste Freizeitpferde bekannt ist.'
    },
    {
      question: 'Wann finden die wichtigsten Pferdemärkte in NRW statt?',
      answer: 'Die Hauptsaison für Pferdemärkte ist von Sommer bis Herbst. Highlights sind die Westfalen-Woche Ende Juli/Anfang August in Münster-Handorf, die Warendorfer Pferdenacht Ende August und der traditionelle Mariä-Geburts-Markt in Telgte Mitte September.'
    },
    {
      question: 'Was kosten Pferde in NRW im Vergleich zu anderen Bundesländern?',
      answer: 'NRW liegt preislich im oberen Mittelfeld. Durch die hohe Züchterdichte und starke Nachfrage sind die Preise stabil. Westfälische Warmblüter auf L-Niveau kosten etwa 10.000-20.000 EUR. Direkt beim Züchter im Münsterland kaufen Sie oft günstiger als über Vermittler.'
    },
    {
      question: 'Wie kaufe ich über die Zuchtverbände?',
      answer: 'Sowohl das Westfälische als auch das Rheinische Pferdestammbuch haben Online-Verkaufsportale mit geprüften Pferden. Zusätzlich veranstalten beide regelmäßig Auktionen. Der Vorteil: Die Pferde sind registriert, haben dokumentierte Abstammung und wurden oft körperlich beurteilt.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('nrw').map(entry => ({
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
        slug="nrw"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/pferde-weide-duelmen-muensterland.webp"
        locales={seoLocales}
        datePublished="2025-12-14"
        wordCount={1850}
        breadcrumbTitle="Pferd kaufen NRW"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={mapPinIcon}
          badgeLabel="Marktplatz-Übersicht"
          title="Pferd kaufen in NRW: Alle Marktplätze, Züchter & Märkte 2025"
          subtitle="Über 2.500 Pferde warten in Nordrhein-Westfalen auf neue Besitzer. Hier findest du alle Online-Portale, renommierte Züchter im Münsterland, die wichtigsten Pferdemärkte und Verbands-Auktionen im Überblick."
          readTime="12 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/pferde-weide-duelmen-muensterland.webp"
          alt="Pferde grasen auf einer Weide im Münsterland bei Dülmen"
          priority={true}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Nordrhein-Westfalen ist Deutschlands Pferde-Bundesland Nummer 1.</strong> Mit über 400.000 Pferden, dem legendären Münsterland als Zucht-Hochburg und einer Infrastruktur von Weltklasse-Niveau findest du hier eine riesige Auswahl an Pferden aller Rassen und Preisklassen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Seite gibt dir einen vollständigen Überblick über alle Möglichkeiten, in NRW ein Pferd zu finden: Online-Marktplätze mit regionalen Filtern, renommierte Züchter sortiert nach Region, Zuchtverbände mit eigenen Verkaufsportalen und die wichtigsten Pferdemärkte und Events 2025.
            </p>
          </section>

          {/* Section: Online Marketplaces */}
          <section id="online-marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Online-Marktplätze mit NRW-Filter
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die schnellste Möglichkeit, einen Überblick über das aktuelle Angebot zu bekommen: Online-Pferdemärkte. Alle großen Plattformen bieten Filter für Nordrhein-Westfalen. Hier die wichtigsten im Vergleich:
            </p>

            {/* Marketplace Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="px-4 py-3 text-left font-semibold">Plattform</th>
                    <th className="px-4 py-3 text-left font-semibold">Inserate NRW</th>
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
              Regionale Züchter & Gestüte nach Gebiet
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wer direkt beim Züchter kauft, spart oft Vermittlungsgebühren und bekommt die Vorgeschichte des Pferdes aus erster Hand. NRW hat vier Hauptregionen für die Pferdezucht:
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
              <strong>Tipp:</strong> Die meisten Züchter haben keine eigene Website, sind aber über das Westfälische oder Rheinische Pferdestammbuch zu finden. Auch eine direkte Suche bei Google Maps nach &quot;Pferdezucht + Ort&quot; liefert oft gute Ergebnisse.
            </p>
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="Gefundenes Pferd bewerten lassen"
            icon={euroIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Du hast ein interessantes Pferd gefunden? Lass dir in 2 Minuten eine KI-gestützte Werteinschätzung geben und gehe informiert in die Verhandlung.
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
              Die beiden großen NRW-Zuchtverbände betreiben eigene Verkaufsportale und veranstalten regelmäßig Auktionen. Der Vorteil: Registrierte Pferde mit dokumentierter Abstammung und oft körperlicher Beurteilung.
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

          {/* Section: Events 2025 */}
          <section id="maerkte-events" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pferdemärkte & Events 2025 in NRW
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Traditionelle Pferdemärkte und moderne Auktionen sind die beste Gelegenheit, viele Pferde an einem Ort zu sehen und mit Züchtern ins Gespräch zu kommen. Hier die wichtigsten Termine 2025:
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
            icon={buildingIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Auktionen können schnell und emotional werden. Mit einer vorherigen Werteinschätzung weißt du genau, bis zu welchem Preis du mitbieten solltest.
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
              Preisübersicht: Was kosten Pferde in NRW?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise in NRW sind durch die hohe Züchterdichte und starke Nachfrage stabil. Hier eine Orientierung nach Kategorie:
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
              Tipps für den Pferdekauf in NRW
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">1. Nutze die Vielfalt</h3>
                <p className="text-gray-600">
                  NRW bietet alles von Privatverkäufen über Kleinanzeigen bis zu Premium-Auktionen. Starte breit mit Online-Suchen, dann fokussiere dich auf die passende Region und Bezugsquelle.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">2. Besuche die Zuchtgebiete persönlich</h3>
                <p className="text-gray-600">
                  Ein Wochenendausflug ins Münsterland lohnt sich. Viele Züchter sind nicht online präsent, aber offen für Besucher. Die Pferdedichte ist so hoch, dass du mehrere Höfe an einem Tag besichtigen kannst.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">3. Verbandsauktionen als Alternative</h3>
                <p className="text-gray-600">
                  Die Auktionen des Westfälischen und Rheinischen Verbandes bieten geprüfte Pferde mit dokumentierter Abstammung. Ideal, wenn du Wert auf Transparenz legst.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">4. AKU vor Ort machen lassen</h3>
                <p className="text-gray-600">
                  In NRW gibt es eine hohe Dichte an spezialisierten Pferde-Tierärzten. Lass die <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">Ankaufsuntersuchung</LocalizedLink> vor Ort von einem lokalen Experten durchführen.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">5. Kaufvertrag nicht vergessen</h3>
                <p className="text-gray-600">
                  Auch bei einem netten Züchter im Münsterland gilt: Nur ein schriftlicher <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-brand hover:text-brand-dark underline">Kaufvertrag</LocalizedLink> schützt dich rechtlich.
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
              sectionTitle="Häufig gestellte Fragen zum Pferdekauf in NRW"
              sectionSubtitle="Antworten zu Marktplätzen, Regionen, Preisen und Terminen in Nordrhein-Westfalen"
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
