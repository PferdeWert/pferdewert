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
import { Sparkles, Euro, CheckCircle, ShieldCheck } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const euroIcon = <Euro className="w-5 h-5" />;
const checkIcon = <CheckCircle className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pferd kaufen in Bayern: Die besten Marktplätze & Preise',
    description: 'Pferd kaufen in Bayern: Vergleich der Top-Marktplätze (ehorses, Kleinanzeigen, pferde.de), realistische Preise 2025 & Kaufcheckliste für Anfänger.',
    keywords: 'pferd kaufen bayern, pferdemarkt bayern, pferde kaufen, pferd in bayern',
    ogTitle: 'Pferd kaufen in Bayern: Die besten Marktplätze & Preise',
    ogDescription: 'Entdecke die Top-Marktplätze zum Pferd kaufen in Bayern mit aktuellen Preisen, Rasse-Empfehlungen & Kaufcheckliste. Ratgeber für Anfänger & Wiedereinsteiger.',
    twitterTitle: 'Pferd kaufen in Bayern: Marktplätze & Preise 2025',
    twitterDescription: 'Finde dein perfektes Pferd in Bayern. Marktplatz-Vergleich, Kosten & Kaufcheckliste.',
  },
  at: {
    title: 'Pferd kaufen in Bayern – Deutsche Angebote online finden',
    description: 'Pferd kaufen in Bayern: Leitfaden für österreichische Käufer. Marktplätze, Preisvergleich & Tipps zum Kauf in Deutschland. Inklusive Kostenübersicht.',
    keywords: 'pferd kaufen bayern, pferdemarkt bayern, pferde kaufen deutschland',
    ogTitle: 'Pferd kaufen in Bayern: Leitfaden für österreichische Käufer',
    ogDescription: 'Alles über Pferdekauf in Bayern für österreichische Interessenten. Marktplatz-Tipps, Preise & praktischer Kaufratgeber.',
    twitterTitle: 'Pferd kaufen in Bayern für Österreicher',
    twitterDescription: 'Marktplatz-Guide & Preisvergleich für Pferdekauf in Bayern.',
  },
  ch: {
    title: 'Pferd kaufen in Bayern – Für Schweizer Interessenten',
    description: 'Pferd kaufen in Bayern: Umfassender Ratgeber für Schweizer Käufer. Marktplätze, Preise in EUR & praktische Tipps zum Kauf in Deutschland.',
    keywords: 'pferd kaufen bayern, pferdemarkt bayern, pferde kaufen deutschland',
    ogTitle: 'Pferd kaufen in Bayern: Guide für Schweizer',
    ogDescription: 'Pferdekauf in Bayern für Schweizer Interessenten. Marktplatz-Vergleich, EUR-Preise & kompletter Kaufratgeber.',
    twitterTitle: 'Pferd kaufen in Bayern für Schweizer',
    twitterDescription: 'Marktplatz-Leitfaden & Preise für Pferdekauf in Deutschland.',
  },
};

export default function PferdKaufenBayern() {
  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: sparklesIcon
  };

  const sections = [
    { id: 'marktplaetze', title: 'Die besten Marktplätze zum Pferd kaufen' },
    { id: 'pferdetypen', title: 'Welches Pferd passt zu dir?' },
    { id: 'kosten', title: 'Was kostet ein Pferd in Bayern?' },
    { id: 'bayern-tipps', title: 'Bayern-spezifische Kauftipps' },
    { id: 'checkliste', title: 'Kaufcheckliste: 10 Schritte' },
    { id: 'anfaenger', title: 'Anfänger-Leitfaden: Beste Rassen' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Wie viel Geld brauche ich für ein Anfänger-Pferd in Bayern?',
      answer: 'Für ein gutes Freizeitpferd solltest du mit folgendem Budget rechnen: Anschaffung 3.000-6.000 EUR, erste Ausstattung 1.000-2.000 EUR, Ankaufsuntersuchung 250 EUR. Für das erste Jahr insgesamt 12.000-17.000 EUR eingeplant. Danach ca. 600-900 EUR monatlich für laufende Kosten wie Stallmiete, Futter, Hufschmied und Versicherung.'
    },
    {
      question: 'Welche sind die besten Marktplätze zum Pferd kaufen in Bayern?',
      answer: 'Die vier Haupt-Marktplätze sind: ehorses.de (19.000+ Angebote, größte Auswahl), Kleinanzeigen.de (5.000+ Angebote, oft günstig), pferde.de (3.000+ spezialisierte Angebote), deine-tierwelt.de (2.000+ Angebote, anfängerfreundlich). Zusätzlich gibt es traditionelle Pferdmärkte wie den Ingolstädter Markt (jeden 2. Samstag) und den Berchinger Rossmarkt (Februar & August).'
    },
    {
      question: 'Welche Pferderasse ist am besten für Anfänger geeignet?',
      answer: 'Für Anfänger empfehlen wir Haflinger oder Connemara. Haflinger (1.35-1.50m, 3.000-7.000 EUR) zeichnen sich durch natürliche Bravheit, Trittsicherheit und Robustheit aus. Connemara (1.30-1.48m, 2.500-5.000 EUR) sind überraschend sportlich und preislich sehr günstig. Auch Isländer und Fjordpferde sind hervorragende Anfänger-Rassen mit sicheren Temperamenten.'
    },
    {
      question: 'Was ist eine Ankaufsuntersuchung und ist sie erforderlich?',
      answer: 'Die Ankaufsuntersuchung (AKU) ist ein Pferde-TÜV und essentiell vor jedem Kauf. Kosten: 150-300 EUR. Zeitpunkt: VOR Kaufvertrag unterschreiben! Umfang: Allgemein-Status, Bluttest, optional Röntgen. Die AKU schützt dich vor versteckten Krankheiten wie Arthrose, Hufrehe oder Zahnproblemen, die später tausende EUR kosten können.'
    },
    {
      question: 'Wann ist der beste Zeitpunkt zum Pferdekauf in Bayern?',
      answer: 'Jahreszeiten beeinflussen Angebot und Preis deutlich: Frühling (März-Mai) hat die meiste Auswahl, aber höhere Preise. Sommer (Juni-August) bietet stabilere Preise und gutes Angebot. Herbst (September-November) zeigt fallende Preise mit weniger Auswahl. Winter (Dezember-Februar) ist günstigste Zeit – du kannst 10-20% Preisvorteil erreichen, da weniger Käufer am Markt sind.'
    },
    {
      question: 'Was sind die wichtigsten Punkte beim Pferdekauf-Vertrag?',
      answer: 'Der Kaufvertrag sollte folgende Punkte enthalten: vollständige Pferddaten (Name, Chip-Nr., Rasse, Farbe), Leistungsgarantie (mindestens 14 Tage Proberitzeit), Gewährleistung für versteckte Mängel, Rücktrittsrecht bei Problemen, Klarheit über Versicherungen. Alle Vereinbarungen müssen schriftlich dokumentiert sein – mündliche Garantien sind vor Gericht nicht bindbar.'
    }
  ];

  // Related articles from registry (using 'bayern' slug with basePath '/pferd-kaufen')
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
        image="/images/ratgeber/pferd-weide-haimhausen-bayern.webp"
        locales={seoLocales}
        datePublished="2025-11-30"
        wordCount={3337}
        breadcrumbTitle="Pferd kaufen Bayern"
        faqItems={faqItems}
        basePath="/pferd-kaufen"
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Marktplatz-Guide"
          title="Pferd kaufen in Bayern: Die besten Marktplätze & Kaufratgeber 2025"
          subtitle="Bayern ist Deutschlands Pferde-Hochburg mit über 450 Zuchtbetrieben. Entdecke die Top-Marktplätze, realistische Preise und unsere Kaufcheckliste für deinen sicheren Pferdekauf."
          readTime="16 Min."
          publishDate="November 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        {/* Hero Image
            Source: Wikimedia Commons
            URL: https://commons.wikimedia.org/wiki/File:Haimhausen_Pferd_2075.jpg
            License: CC BY-SA 3.0
            Author: GFreihalter
        */}
        <RatgeberHeroImage
          src="/images/ratgeber/pferd-weide-haimhausen-bayern.webp"
          alt="Pferd auf einer Weide in Bayern bei Haimhausen"
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
              Du willst ein <strong>Pferd kaufen in Bayern</strong>? Mit über 450 Zucht- und Verkaufsbetrieben ist Bayern Deutschlands Pferde-Hochburg – aber wo findest du das richtige Pferd? Anfänger verlieren sich schnell in Hunderten Angeboten auf verschiedenen Plattformen. Welcher Marktplatz ist sicher? Welcher Preis ist fair? Welche Rasse passt überhaupt zu dir?
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dieser Ratgeber zeigt dir die besten Marktplätze zum Pferd kaufen in Bayern, realistische Kosten für dein Budget und eine konkrete Kaufcheckliste. Außerdem: Mit dem <LocalizedLink href="/pferde-bewertung" className="text-brand hover:text-brand-dark underline">PferdeWert-Tool</LocalizedLink> berechnen Sie den echten Marktwert eines Pferdes – bevor Sie einen Kaufvertrag unterzeichnen.
            </p>
          </section>

          {/* Section: Marktplätze */}
          <section id="marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die besten Marktplätze zum Pferd kaufen in Bayern
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt vier Haupt-Marktplätze in Deutschland, auf denen du erfolgreich nach deinem Traumpferd suchen kannst. Jeder hat Vor- und Nachteile:
            </p>

            {/* Marketplace Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand/20">
                    <th className="py-3 px-4 font-semibold text-gray-900">Marktplatz</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Angebote</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Verifizierung</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Gebühren</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-semibold">ehorses.de</td>
                    <td className="py-3 px-4">19.000+</td>
                    <td className="py-3 px-4">Ja</td>
                    <td className="py-3 px-4">29 EUR (Verkauf)</td>
                    <td className="py-3 px-4">Größte Auswahl</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-semibold">Kleinanzeigen.de</td>
                    <td className="py-3 px-4">5.000+</td>
                    <td className="py-3 px-4">Nein</td>
                    <td className="py-3 px-4">0-5 EUR</td>
                    <td className="py-3 px-4">Budget-Käufer</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-semibold">pferde.de</td>
                    <td className="py-3 px-4">3.000+</td>
                    <td className="py-3 px-4">Mittelstufe</td>
                    <td className="py-3 px-4">0 EUR</td>
                    <td className="py-3 px-4">Rasse-Käufer</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-semibold">deine-tierwelt.de</td>
                    <td className="py-3 px-4">2.000+</td>
                    <td className="py-3 px-4">Nein</td>
                    <td className="py-3 px-4">0 EUR</td>
                    <td className="py-3 px-4">Anfänger</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              ehorses.de – Der Marktführer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              ehorses.de ist die größte Plattform für Pferdekauf in Deutschland mit über 19.000 aktiven Angeboten. Du findest hier Pferde aus ganz Bayern, von Freizeitpferden bis zu Sportpferden. Die meisten Angebote sind verifiziert – das heißt, Verkäufer haben ihre Identität bestätigt.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Vorteile:</strong> Riesige Auswahl, Verkäufer-Rating sichtbar, Suchalarme einstellbar, Bayern-Filter verfügbar</li>
              <li><strong>Nachteile:</strong> Nicht alle Angebote verifiziert, Gebühren für Verkäufer, viel Konkurrenz</li>
              <li><strong>Best for:</strong> Käufer, die Auswahl und Sicherheit vor Preis bevorzugen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kleinanzeigen.de – Flexibel & Günstig
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kleinanzeigen ist die zweitgrößte Plattform mit etwa 5.000 aktiven Pferde-Angeboten in Bayern. Hier findest du viele private Verkäufer und kleinere Züchter, die ihre Pferde direkt anbieten.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Vorteile:</strong> Direkte Kontaktaufnahme, weniger Gebühren, oft günstigere Preise, Verhandlungsraum</li>
              <li><strong>Nachteile:</strong> Keine Verifizierung, mehr Spam, weniger Käuferschutz</li>
              <li><strong>Best for:</strong> Käufer mit etwas Erfahrung, die Preis senken wollen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Traditionelle Pferdmärkte in Bayern
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Neben online Marktplätzen gibt es in Bayern auch traditionelle Pferdmärkte, wo du Pferde live besichtigen und Verkäufer treffen kannst:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Ingolstädter Pferdemarkt:</strong> 2. Samstag jeden Monat um 7:00 Uhr (250+ Pferde)</li>
              <li><strong>Berchinger Rossmarkt:</strong> Februar und August (traditionsreich seit 200+ Jahren)</li>
              <li><strong>Privatverkäufer:</strong> Über Mundpropaganda und lokale Vereine</li>
            </ul>
          </section>

          {/* Section: Pferdetypen */}
          <section id="pferdetypen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Welches Pferd passt zu dir? Freizeitpferd vs. Reitpferd vs. Sportpferd
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Preis eines Pferdes hängt stark von seinem Typ und seiner Ausbildung ab. Es gibt drei Hauptkategorien – jede mit unterschiedlichen Kosten und Anforderungen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              1. Freizeitpferd – Der klassische Einstieg (3.000-6.000 EUR)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein <LocalizedLink href="/pferde-ratgeber/freizeitpferd-kaufen" className="text-brand hover:text-brand-dark underline">Freizeitpferd</LocalizedLink> ist perfekt, wenn du entspannt ausreiten, lange Touren machen oder einfach Zeit mit einem zuverlässigen Partner verbringen möchtest – ohne Turnier-Ambitionen.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Temperament:</strong> Gutmütig, geduldig, nervenstark</li>
              <li><strong>Rassen:</strong> Haflinger, Isländer, Fjordpferd, Connemara</li>
              <li><strong>Monatliche Kosten:</strong> 600-800 EUR</li>
              <li><strong>Vorteile:</strong> Erschwingliche Anschaffung, robust und pflegeleicht</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              2. Reitpferd – Der Klassiker (10.000-25.000 EUR)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Reitpferd ist für fortgeschrittene Reiter ideal. Es hat bessere Reitqualitäten und kann für Turniere im Hobby-Bereich geritten werden – Dressur, Springen oder Geländeritt.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Temperament:</strong> Lebhaft, arbeitswillig, intelligent</li>
              <li><strong>Rassen:</strong> Warmblüter (Hannoveraner, Westfale), Quarter Horse</li>
              <li><strong>Monatliche Kosten:</strong> 800-1.200 EUR</li>
              <li><strong>Vorteile:</strong> Bessere Reitqualitäten, guter Wiederverkaufswert</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              3. Sportpferd – Der Profi (25.000+ EUR)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Sportpferd ist für ehrgeizige, erfahrene Reiter mit Turnier-Ambitionen. Diese Pferde haben spezialisierte Ausbildung und großes Potenzial.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Temperament:</strong> Hochwertig, sensibel, nervenstark</li>
              <li><strong>Rassen:</strong> Elite-Warmblüter (Trakehner, Holsteiner)</li>
              <li><strong>Monatliche Kosten:</strong> 1.200-2.000+ EUR</li>
              <li><strong>Achtung:</strong> Nur für erfahrene Reiter mit solidem Budget!</li>
            </ul>

            {/* Comparison Table */}
            <div className="overflow-x-auto mt-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand/20">
                    <th className="py-3 px-4 font-semibold text-gray-900">Kriterium</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Freizeitpferd</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Reitpferd</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Sportpferd</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-semibold">Kaufpreis</td>
                    <td className="py-3 px-4">3.000-6.000 EUR</td>
                    <td className="py-3 px-4">10.000-25.000 EUR</td>
                    <td className="py-3 px-4">25.000-100.000+ EUR</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-semibold">Monatliche Kosten</td>
                    <td className="py-3 px-4">600-800 EUR</td>
                    <td className="py-3 px-4">800-1.200 EUR</td>
                    <td className="py-3 px-4">1.200-2.000+ EUR</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-semibold">Best for</td>
                    <td className="py-3 px-4">Anfänger, Freizeitreiter</td>
                    <td className="py-3 px-4">Fortgeschrittene</td>
                    <td className="py-3 px-4">Profis, Turnier-Reiter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="Berechne den Marktwert deines Wunsch-Pferdes"
            icon={euroIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Du hast ein perfektes Pferd gefunden, aber der Verkäufer verlangt 15.000 EUR? Ist das fair? Mit dem <strong>PferdeWert-Bewertungs-Tool</strong> erhältst du sofort eine marktgerechte Bewertung basierend auf Alter, Ausbildungsstand, Rasse und aktueller Marktlage 2025.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Pferdewert berechnen (Ergebnis in nur 2 Minuten)
              <Sparkles className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was kostet ein Pferd in Bayern? Vollständige Kostenübersicht 2025
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kaufpreis ist nur der Anfang. Hier sind die realistischen Kosten, die auf dich zukommen. Die <LocalizedLink href="/pferde-ratgeber/aku-pferd/kosten" className="text-brand hover:text-brand-dark underline">AKU-Kosten</LocalizedLink> für die Ankaufsuntersuchung betragen 150-300 EUR und schützen dich vor versteckten Krankheiten.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Monatliche Betriebskosten – Was kostet wirklich?
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Stallmiete:</strong> 300-700 EUR/Monat (Offenstall günstiger, Pensionsstall teurer)</li>
              <li><strong>Futter:</strong> 20-80 EUR/Monat (je nach Pferdetyp und Qualität)</li>
              <li><strong>Hufschmied:</strong> ~65 EUR/Monat (alle 8 Wochen = 6x pro Jahr)</li>
              <li><strong>Versicherung:</strong> 10-20 EUR/Monat (Haftpflicht essentiell!)</li>
              <li><strong>Tierarzt/Impfungen:</strong> ~25 EUR/Monat (durchschnittlich)</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-4">
              GESAMT MONATLICH: 600-1.000 EUR
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Jahresbudget-Beispiel für ein Freizeitpferd
            </h3>

            {/* Einmalige Kosten */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🏷️</span> Einmalige Kosten (Jahr 1)
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Pferdekauf</span>
                  <span className="font-semibold text-gray-900">5.000 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Erste Ausrüstung</span>
                  <span className="font-semibold text-gray-900">1.000 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Ankaufsuntersuchung</span>
                  <span className="font-semibold text-gray-900">250 EUR</span>
                </div>
                <div className="border-t border-amber-300 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-amber-900">Summe Einmalig</span>
                  <span className="font-bold text-amber-900">6.250 EUR</span>
                </div>
              </div>
            </div>

            {/* Laufende Kosten */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mt-4">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📅</span> Laufende Kosten (12 Monate)
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Stallmiete</span>
                  <span className="font-semibold text-gray-900">4.800 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Futter</span>
                  <span className="font-semibold text-gray-900">600 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Hufschmied (6×)</span>
                  <span className="font-semibold text-gray-900">390 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Versicherung</span>
                  <span className="font-semibold text-gray-900">180 EUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tierarzt</span>
                  <span className="font-semibold text-gray-900">150 EUR</span>
                </div>
                <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-blue-900">Summe Jahr</span>
                  <span className="font-bold text-blue-900">6.120 EUR</span>
                </div>
              </div>
            </div>

            {/* Gesamtübersicht */}
            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200 mt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Gesamtinvestition Jahr 1</p>
                  <p className="text-3xl font-bold text-gray-900">12.370 EUR</p>
                  <p className="text-gray-500 text-sm mt-1">(inkl. Pferdekauf: 17.370 EUR)</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Laufend ab Jahr 2</p>
                  <p className="text-3xl font-bold text-gray-900">~510 EUR/Monat</p>
                  <p className="text-gray-500 text-sm mt-1">(ca. 6.120 EUR/Jahr)</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wo du sparen kannst – und wo NICHT
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✓ Hier kannst du sparen:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>Weidehaltung statt Box (150-300 EUR/Monat)</li>
                  <li>Gemeinsame Stallanlage (30-50% Ersparnis)</li>
                  <li>Selbstversorger-Stall</li>
                  <li>Online-Marktplätze statt Züchter</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">✗ Hier NICHT sparen:</h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>Ankaufsuntersuchung (schützt vor Krankheiten)</li>
                  <li>Versicherung (Haftpflicht essentiell)</li>
                  <li>Qualitätsfutter (Gesundheit!)</li>
                  <li>Regelmäßiger Schmied (Hufe!)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Bayern-Tipps */}
          <section id="bayern-tipps" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Bayern-spezifische Kauftipps: Märkte, Züchter & Regionen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bayern ist Deutschlands Pferde-Hochburg – und das merkt man beim Angebot. Hier sind deine regionalen Optionen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Traditionelle Pferdmärkte in Bayern
            </h3>

            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900">Ingolstädter Pferdemarkt (größter in Bayern)</h4>
                <ul className="text-amber-800 text-sm mt-2 space-y-1">
                  <li><strong>Termin:</strong> Jeden 2. Samstag des Monats um 7:00 Uhr</li>
                  <li><strong>Ort:</strong> Luitpoldhafen Ingolstadt</li>
                  <li><strong>Angebot:</strong> 250+ Pferde bei jedem Markt</li>
                  <li><strong>Vorteil:</strong> Vor-Ort-Besichtigung, günstige Preise</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900">Berchinger Rossmarkt (traditionsreich)</h4>
                <ul className="text-amber-800 text-sm mt-2 space-y-1">
                  <li><strong>Termin:</strong> Februar (Langsammarkt) + August (Schnellmarkt)</li>
                  <li><strong>Ort:</strong> Berching in der Altmühl-Tal</li>
                  <li><strong>Besonderheit:</strong> Über 200 Jahre Tradition</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Züchter und Verbände in Bayern
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Bayerns Pferde e.V.:</strong> 450+ zertifizierte Züchter (bayerns-pferde.de)</li>
              <li><strong>Haflinger-Züchter:</strong> Süddeutscher Haflinger-Verein</li>
              <li><strong>Isländer:</strong> Isländer-Züchter-Verband</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Best Practice:</strong> Züchter-Kontakt kostet 10-20% mehr, aber du bekommst bessere Genetik, Zuchtgarantien und längerfristigen Support.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Regionale Preisunterschiede in Bayern
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Oberland (München-Umland):</strong> +10-20% über Durchschnitt (München-Nähe teuer)</li>
              <li><strong>Ingolstadt/Pfaffenhofen:</strong> Marktmitte (Durchschnittspreis)</li>
              <li><strong>Altmühl-Tal:</strong> -5-10% günstiger (ländliche Region)</li>
              <li><strong>Nürnberg-Erlangen:</strong> +5-10% höher (urban)</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Tipp:</strong> Auf dem Land sind Pferde oft billiger, aber Fahrwege sind länger. Der Ingolstädter Markt ist ein guter Mittelweg zwischen Preis und Auswahl.
            </p>
          </section>

          {/* CTA Box 2 */}
          <RatgeberHighlightBox
            title="Ankaufsuntersuchung nicht vergessen!"
            icon={checkIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Die <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">Ankaufsuntersuchung</LocalizedLink> ist ein Pferde-TÜV und essentiell vor jedem Kauf. Sie kostet 150-300 EUR und schützt dich vor Arthrose, Hufrehe und anderen versteckten Problemen, die später tausende EUR kosten können.
            </p>
            <LocalizedLink
              href="/pferde-ratgeber/aku-pferd"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Zur AKU-Checkliste
              <ShieldCheck className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Checkliste */}
          <section id="checkliste" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kaufcheckliste: 10 Schritte zum erfolgreichen Pferdekauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor du einen Kaufvertrag unterschreibst – gehe diese Checkliste durch. Diese Punkte haben anderen Käufern vor teuren Fehlkäufen bewahrt.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Phase 1: Vor dem Kauf (Vorbereitung)
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">1.</span>
                <span><strong>Finanzielle Vorbereitung:</strong> Gesamtbudget berechnet? Monatliche Kosten (600-1.000 EUR) eingeplant? Notgroschen (1.000-2.000 EUR) für Tierarzt?</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">2.</span>
                <span><strong>Anforderungen klären:</strong> Pferdetyp ausgewählt? Idealgewicht und Größe? Alter und Temperament?</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">3.</span>
                <span><strong>Marktplatz-Recherche:</strong> Mehrere Plattformen durchsucht? Preisvergleich gemacht? Betrüger-Warnsignale erkannt?</span>
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Phase 2: Besichtigung & Proberitt
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">4.</span>
                <span><strong>Persönliche Besichtigung:</strong> Mindestens 30-60 Minuten vor Ort! Gewicht, Körperbau, Fellglanz prüfen.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">5.</span>
                <span><strong>Proberitt durchführen:</strong> Mit deinem eigenen Sattel reiten! Verschiedene Gangarten testen.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">6.</span>
                <span><strong>Vergangenheit überprüfen:</strong> Gründe für Verkauf hinterfragen (zu viele Verkäufe = red flag).</span>
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Phase 3: Professionelle Kontrolle
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">7.</span>
                <span><strong>Ankaufsuntersuchung (AKU):</strong> VOR Kaufvertrag! Kosten: 150-300 EUR. Umfang: Allgemein-Status, Bluttest, optional Röntgen.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">8.</span>
                <span><strong>Zahntechnik-Kontrolle:</strong> Zahnalter überprüft? Zahnprobleme erkannt?</span>
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Phase 4: Vertrag & Abschluss
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">9.</span>
                <span><strong>Kaufvertrag überprüfen:</strong> Vollständige Daten, Proberitzeit (14 Tage), Gewährleistung, Rücktrittsrecht.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand font-bold mr-3">10.</span>
                <span><strong>Transport & Versicherung:</strong> Spediteur arrangiert? Risikoversicherung? Eingewöhnung geplant?</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-4">
              Wichtigste Regel: Alle Vereinbarungen schriftlich im Kaufvertrag! Mündliche Garantien sind vor Gericht nicht bindbar.
            </p>
          </section>

          {/* Section: Anfänger-Leitfaden */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Anfänger-Leitfaden: Die besten Pferderassen für Reiter ohne Erfahrung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht jede Rasse ist für Anfänger geeignet. Hier sind unsere Top 5 Empfehlungen für Bayern, basierend auf Temperament, Preis und Verfügbarkeit:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              1. Haflinger – Der Allrounder (TOP EMPFEHLUNG)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der <LocalizedLink href="/pferde-ratgeber/haflinger-kaufen" className="text-brand hover:text-brand-dark underline">Haflinger</LocalizedLink> ist das perfekte Anfänger-Pferd. Mit seiner natürlich braven Veranlagung und Trittsicherheit im schwierigen Gelände ist er ideal für entspanntes Reiten.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Größe:</strong> 1,35-1,50m</li>
              <li><strong>Temperament:</strong> Gutmütig, geduldig, zuverlässig</li>
              <li><strong>Preis in Bayern:</strong> 3.000-7.000 EUR</li>
              <li><strong>Verfügbarkeit:</strong> ehorses.de hat ~200 Haflinger in Bayern</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              2. Isländer – Der sichere Bergsteiger
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Isländer ist extrem nervenstark – perfekt für ängstliche Anfänger oder Trail-Reiten. Die natürlichen Gangarten (Tölt) machen Reiten extrem komfortabel.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Größe:</strong> 1,40-1,50m</li>
              <li><strong>Preis:</strong> 4.000-8.000 EUR</li>
              <li><strong>Best for:</strong> Ängstliche Anfänger und lange Touren</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              3. Connemara Pony – Der Sportliche
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Connemara ist überraschend sportlich – nicht &quot;nur Pony&quot;, sondern ein echtes Reitpferd im Miniformat. Elegant und leistungsfähig.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Größe:</strong> 1,30-1,48m</li>
              <li><strong>Preis:</strong> 2.500-5.000 EUR</li>
              <li><strong>Best for:</strong> Beste Budget-Option, auch für ältere Anfänger</li>
            </ul>

            {/* Breeds Comparison Table */}
            <div className="overflow-x-auto mt-8">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-brand/20">
                    <th className="py-3 px-3 font-semibold text-gray-900">Rasse</th>
                    <th className="py-3 px-3 font-semibold text-gray-900">Größe</th>
                    <th className="py-3 px-3 font-semibold text-gray-900">Mut</th>
                    <th className="py-3 px-3 font-semibold text-gray-900">Preis</th>
                    <th className="py-3 px-3 font-semibold text-gray-900">Anfänger-Fit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 bg-amber-50">
                    <td className="py-3 px-3 font-semibold">Haflinger</td>
                    <td className="py-3 px-3">1,35-1,50</td>
                    <td className="py-3 px-3">★★★★☆</td>
                    <td className="py-3 px-3">3-7K EUR</td>
                    <td className="py-3 px-3 font-bold text-brand">★★★★★ TOP</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-3 font-semibold">Isländer</td>
                    <td className="py-3 px-3">1,40-1,50</td>
                    <td className="py-3 px-3">★★★★★</td>
                    <td className="py-3 px-3">4-8K EUR</td>
                    <td className="py-3 px-3">★★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-3 px-3 font-semibold">Fjord</td>
                    <td className="py-3 px-3">1,40-1,50</td>
                    <td className="py-3 px-3">★★★☆☆</td>
                    <td className="py-3 px-3">3-6K EUR</td>
                    <td className="py-3 px-3">★★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-3 font-semibold">Connemara</td>
                    <td className="py-3 px-3">1,30-1,48</td>
                    <td className="py-3 px-3">★★★★☆</td>
                    <td className="py-3 px-3">2,5-5K EUR</td>
                    <td className="py-3 px-3">★★★★☆</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-4">
              Fazit: Für absolute Anfänger empfehlen wir einen <strong>Haflinger oder Connemara</strong> – beste Preis/Wert Kombination mit extrem sicherem Temperament.
            </p>
          </section>

          {/* Zusammenfassung */}
          <section className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Dein Weg zum perfekten Pferd – Zusammenfassung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du hast es geschafft! Hier ist eine Zusammenfassung der wichtigsten Punkte zum Pferd kaufen in Bayern:
            </p>

            <div className="bg-brand/5 p-6 rounded-lg border border-brand/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Die wichtigsten Erkenntnisse:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Bayern hat 4 Haupt-Marktplätze: <strong>ehorses.de</strong> (größte Auswahl), <strong>Kleinanzeigen</strong> (günstig), <strong>pferde.de</strong> (spezialisiert), <strong>deine-tierwelt</strong> (anfängerfreundlich)</li>
                <li>✓ Freizeitpferde kosten <strong>3.000-6.000 EUR</strong> + <strong>600-900 EUR monatlich</strong></li>
                <li>✓ Die beste Rasse für Anfänger: <strong>Haflinger oder Connemara</strong></li>
                <li>✓ Ankaufsuntersuchung ist <strong>essentiell</strong> (150-300 EUR vor Kaufvertrag)</li>
                <li>✓ Kaufvertrag mit <strong>Probezeit + Rücktrittsrecht</strong> vereinbaren</li>
              </ul>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Dein 7-Schritte-Aktionsplan:
            </h3>
            <ol className="space-y-2 text-lg text-gray-700 list-decimal list-inside">
              <li>Budget definieren (Kauf + monatliche Kosten)</li>
              <li>Marktplätze durchsuchen (mehrere Plattformen parallel)</li>
              <li>Besichtigung + Proberitt durchführen (mindestens 30 Min vor Ort)</li>
              <li>Tierärztliche Ankaufsuntersuchung</li>
              <li>Kaufvertrag überprüfen und unterzeichnen</li>
              <li>Transport arrangieren</li>
              <li>Willkommen zuhause! Erste Woche ist Eingewöhnungszeit</li>
            </ol>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen"
              sectionSubtitle="Die wichtigsten Fragen und Antworten rund um den Pferdekauf in Bayern"
              withSchema={false}
            />
          </div>
        </section>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto px-4 md:px-6">
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
          title="Noch unsicher über den Preis?"
          description="Mit dem PferdeWert-Bewertungs-Tool erhältst du in 2 Minuten eine marktgerechte Bewertung: Sofort-Analyse, Preisvergleich mit ähnlichen Pferden in Bayern und konkrete Verhandlungs-Tipps."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
