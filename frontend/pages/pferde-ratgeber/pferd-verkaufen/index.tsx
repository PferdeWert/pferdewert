import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, BookOpen, Calculator, TrendingUp, Shield, FileCheck, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import CTAButton from '@/components/CTAButton';
import { PRICING_FORMATTED } from '@/lib/pricing';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import { createHeroMetaItems } from '@/utils/ratgeber/heroMetaItems';

// FAST REFRESH FIX: Compute heroMetaItems at module level, not in component
// Creating objects inside component causes infinite reload loop
const heroMetaItems = createHeroMetaItems([
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "7-Phasen-Prozess"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: "Rechtssichere Abwicklung"
  },
  {
    icon: <FileCheck className="h-4 w-4" />,
    label: "Plattform-Vergleich"
  }
]);

const sections = [
  { id: 'pferdewert-ermitteln', title: 'Pferdewert ermitteln' },
  { id: 'plattformen-vergleich', title: 'Plattformen-Vergleich' },
  { id: 'verkaufsprozess', title: '7-Phasen-Verkaufsprozess' },
  { id: 'verkaufsanzeige', title: 'Perfekte Verkaufsanzeige' },
  { id: 'rechtliche-aspekte', title: 'Rechtliche Aspekte' },
  { id: 'schnell-verkaufen', title: 'Schnell verkaufen' },
  { id: 'emotionaler-aspekt', title: 'Emotionaler Aspekt' },
  { id: 'fazit', title: 'Fazit' },
  { id: 'faq', title: 'Häufige Fragen' }
];

const relatedArticles = getRelatedArticles('pferd-verkaufen').map(entry => ({
  href: getRatgeberPath(entry.slug),
  image: entry.image,
  title: entry.title,
  badge: entry.category,
  readTime: entry.readTime,
  description: entry.description
}));

const faqItems = [
    {
      question: 'Wie viel Geld ist mein Pferd wert?',
      answer: 'Der Wert hängt von 11 Faktoren ab: Alter (6-12 Jahre optimal), Ausbildung, Gesundheit, Abstammung, Disziplin, Charakter, Interieur, Exterieur, Erfolge, Haltung und Marktlage. Ein Freizeitpferd liegt zwischen €2.000-€5.000, ein L-Turnierpferd bei €15.000-€40.000. Nutzen Sie den PferdeWert.de Rechner für eine präzise, datenbasierte Bewertung in 2 Minuten basierend auf 10.000+ Verkaufsdaten.'
    },
    {
      question: 'Wo kann man ein Pferd am besten verkaufen?',
      answer: 'Die beste Plattform hängt vom Pferdetyp ab: eHorses.de (135.000 Suchen/Monat, €49,90, 68% Verkaufserfolg in 3 Monaten) ist optimal für Turnierpferde ab €15.000. pferde.de (45.000 Suchen, €39,90, 58% Erfolg) funktioniert gut für Breitensport und Freizeitpferde. Private Kanäle (Facebook-Gruppen, Stallnetzwerk, kostenlos, 42% Erfolg) sind sinnvoll bei bekannten Käufern oder Nischenrassen.'
    },
    {
      question: 'Wie kann ich mein Pferd schnell verkaufen?',
      answer: 'Die 3 Schlüsselfaktoren: (1) Preis 5-10% unter Marktwert setzen für sofortige Nachfrage, (2) im März-Juni starten (Hochsaison = 60% mehr Anfragen), (3) Multi-Channel-Ansatz (eHorses + Facebook-Gruppen + Stallnetzwerk parallel). Realistische Zeitrahmen: 2-6 Wochen (optimal) – unter 2 Wochen wirkt verdächtig, über 6 Monate signalisiert zu hohen Preis.'
    },
    {
      question: 'Was senkt den Wert eines Pferdes?',
      answer: 'Top 5 Wertminderungsfaktoren: (1) Chronische Erkrankungen (Arthrose, Allergien, Atemwegserkrankungen), (2) Verhaltensauffälligkeiten (Steigen, Buckeln, Weben), (3) Fortgeschrittenes Alter (über 15 Jahre für Sportpferde, über 20 für Freizeitpferde), (4) Unvollständige/fehlende Abstammungspapiere (minus 20-30% Wert), (5) Lange Verkaufsdauer (über 6 Monate = Markt signalisiert Überbewertung).'
    },
    {
      question: 'Welche rechtlichen Aspekte gilt es zu beachten beim Pferd verkaufen?',
      answer: 'Die 3 wichtigsten Punkte: (1) Schriftlicher Kaufvertrag mit Pflichtangaben (Identifikation, Preis, Gewährleistungsausschluss nach §444 BGB), (2) Offenbarungspflicht bei bekannten Mängeln (AKU-Befunde, Vorerkrankungen, Verhaltensauffälligkeiten transparent mitteilen), (3) Haftung klären für Probezeit und Transport (Versicherung, Transportrisiko schriftlich festlegen).'
    },
    {
      question: 'Was muss in eine Verkaufsanzeige für ein Pferd?',
      answer: 'Die 8-Punkte Must-Have Checkliste: Rasse, Alter, Stockmaß, Ausbildungsstand (konkret: "L-Dressur" statt "gut"), Charakter (ehrlich: anfängergeeignet?), Gesundheit (AKU-Status), Preis (Festpreis oder VB), Kontakt (Telefon + E-Mail + WhatsApp).'
    },
    {
      question: 'Wie erkenne ich den Wert meines Pferdes?',
      answer: 'Der Pferdewert ergibt sich aus der Kombination von 11 Faktoren (Alter, Ausbildung, Gesundheit, Abstammung, Disziplin, Charakter, Interieur, Exterieur, Erfolge, Haltung, Marktlage). Eine objektive Bewertung ist schwierig durch emotionale Bindung – nutzen Sie datenbasierte Tools: Der PferdeWert.de AI-Rechner analysiert alle Faktoren gleichzeitig und vergleicht mit 10.000+ realen Verkaufspreisen.'
    },
    {
      question: 'Was ist die 1/2/3-Regel bei Pferden?',
      answer: 'Die 1/2/3-Regel (auch 1/3-Regel) ist eine Faustregel für Pferdekauf-Budgetplanung: (1) 1/3 Kaufpreis des Pferdes, (2) 1/3 Unterhalt im ersten Jahr (Stall, Futter, Hufschmied, Tierarzt), (3) 1/3 unvorhergesehene Kosten (Koliken, Verletzungen, Ausrüstung). Beispiel: Bei einem €9.000-Pferd sollten Sie €27.000 Gesamtbudget kalkulieren (€9k Kauf + €9k Unterhalt + €9k Reserve).'
    },
    {
      question: 'Was sind die Warnzeichen beim Pferd verkaufen?',
      answer: 'Top 5 Red Flags für unseriöse Käufer: (1) Zu schneller Verkaufsdruck (unter 2 Wochen ohne klare Begründung – signalisiert mögliche Probleme), (2) Gesundheitsinfo verweigert (keine AKU-Berichte, keine Impfnachweise), (3) Keine AKU erlaubt (seriöse Käufer bestehen auf Kaufuntersuchung), (4) Preis weit unter Marktwert (minus 30%+ = oft Schlachter-Anfragen), (5) Probezeit/Probereiten ausgeschlossen (keine Möglichkeit, Pferd zu testen = unseriös).'
    },
    {
      question: 'Wie lange dauert der durchschnittliche Pferdeverkauf?',
      answer: 'Der durchschnittliche Pferdeverkauf dauert 6-9 Monate ohne professionelle Vorbereitung. Mit systematischem Ansatz (realistische Bewertung, professionelle Fotos, Multi-Channel-Strategie) lässt sich die Dauer auf 2-6 Wochen reduzieren. Kritisch: Preis 5-10% unter Marktwert setzen und im März-Juni starten (Hochsaison).'
    }
];

const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pferd verkaufen: Der ultimative Leitfaden (2025)',
    description: 'Pferd verkaufen zum optimalen Preis: 7-Phasen-Prozess, Plattformvergleich (eHorses vs. pferde.de), rechtliche Absicherung und emotionale Begleitung für erfolgreichen Verkauf.',
    image: 'https://pferdewert.de/images/ratgeber/pferd-verkaufen/hero.webp',
    author: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://pferdewert.de'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pferdewert.de/images/logo.webp'
      }
    },
    datePublished: '2025-01-09',
    dateModified: '2025-01-09',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://pferdewert.de/ratgeber/pferd-verkaufen'
    },
    inLanguage: 'de-DE',
    keywords: 'pferd verkaufen, pferdewert ermitteln, pferd verkaufen plattformen, pferd verkaufen preis, pferd schnell verkaufen'
};

const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://pferdewert.de'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ratgeber',
        item: 'https://pferdewert.de/ratgeber'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pferd verkaufen',
        item: 'https://pferdewert.de/ratgeber/pferd-verkaufen'
      }
    ]
};

const PferdVerkaufen: NextPage = () => {

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToContent = () => {
    const element = document.getElementById('content-start');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Pferd verkaufen 2025: Ultimativer Leitfaden für optimalen Preis</title>
        <meta
          name="description"
          content={`Pferd verkaufen 2025: Kompletter Leitfaden mit 7-Phasen-System für optimalen Verkaufspreis. Plattformvergleich (eHorses vs. pferde.de), professionelle KI-Bewertung ab ${PRICING_FORMATTED.current}, rechtliche Checklisten & Verkaufsstrategien für Privatverkäufer.`}
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.pferdewert.de/pferde-ratgeber/pferd-verkaufen" />
        <meta name="keywords" content="pferd verkaufen, pferd zu verkaufen, wie viel ist mein pferd wert, pferdewert ermitteln, pferd verkaufen preis, pferd verkaufen plattformen, pferd schnell verkaufen, pferd online verkaufen" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Pferd verkaufen 2025: Ultimativer Leitfaden für optimalen Preis" />
        <meta property="og:description" content="Verkaufe dein Pferd zum besten Preis: 7-Phasen-Prozess, Plattformvergleich und rechtliche Tipps für erfolgreichen Verkauf." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/pferd-verkaufen" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/ratgeber/pferd-verkaufen/hero.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd verkaufen 2025: Optimaler Preis & schneller Verkauf" />
        <meta name="twitter:description" content={`7-Phasen-Prozess ✓ Plattformvergleich ✓ AI-Bewertung (${PRICING_FORMATTED.current}) ✓ Rechtliche Sicherheit`} />
        <meta name="twitter:image" content="https://pferdewert.de/images/og/pferd-verkaufen-ratgeber.webp" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </Head>

      <div className="bg-gradient-to-b from-amber-50 to-white">
        <RatgeberHero
          badgeLabel="Verkaufsratgeber"
          badgeIcon={<BookOpen className="h-4 w-4" />}
          title="Pferd verkaufen: Der ultimative Leitfaden (2025)"
          subtitle="Du möchtest dein Pferd verkaufen? Der durchschnittliche Pferdeverkauf dauert 6-9 Monate – eine Zeit voller Unsicherheit. Dieser Leitfaden zeigt dir den 7-Phasen-Verkaufsprozess, den Plattform-Vergleich (eHorses vs. pferde.de) und die rechtliche Absicherung. Inklusive emotionaler Begleitung beim Abschied vom Partner Pferd."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Jetzt Pferdewert berechnen",
            icon: <Calculator className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            onClick: scrollToContent,
            icon: <ChevronDown className="h-5 w-5" />
          }}
        />
        <RatgeberHeroImage
          src='/images/ratgeber/pferd-verkaufen/pferd-verkaufen-beratung.webp'
          alt="Erfolgreicher Pferdeverkauf mit zufriedenem Verkäufer und neuem Besitzer"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <RatgeberTableOfContents
          sections={sections}
          onNavigate={handleNavigate}
        />

        {/* Article Content */}
        <article className="max-w-5xl mx-auto space-y-16" id="content-start">

          {/* Intro */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was ist mein Pferd wirklich wert?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Frage beschäftigt jeden Pferdebesitzer, der vor der Entscheidung steht, sein geliebtes Tier zu verkaufen. Die Realität: Der durchschnittliche Pferdeverkauf dauert 6-9 Monate – eine Zeit voller Unsicherheit und emotionaler Herausforderungen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mit dem <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium"><strong>PferdeWert KI-Tool</strong></Link> ermittelst du in nur 2 Minuten einen fairen, datenbasierten Verkaufspreis für dein Pferd. Unsere transparente Methodik basiert auf der Analyse von realen Verkaufsdaten und liefert dir eine realistische Preiseinschätzung.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              In diesem ultimativen Leitfaden erfährst du alles Wichtige: vom 7-Phasen-Verkaufsprozess über den detaillierten Plattform-Vergleich (eHorses vs. private Kanäle) bis hin zur rechtlichen Absicherung durch professionelle Kaufverträge. Wir decken auch den oft vernachlässigten emotionalen Aspekt ab – denn ein Pferd zu verkaufen bedeutet, Abschied von einem Partner zu nehmen.
            </p>
          </section>

          {/* Pferdewert ermitteln */}
          <section id="pferdewert-ermitteln" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pferdewert ermitteln: Was ist mein Pferd wert?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor du dein Pferd verkaufst, musst du den realistischen Marktwert ermitteln. Ein realistischer Preis entscheidet darüber, ob dein Pferd innerhalb weniger Wochen oder erst nach Monaten verkauft wird.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Pferdewert-Tabelle 2025: Preise nach Kategorie
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-brand border-b">Kategorie</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-brand border-b">Preisspanne</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Freizeitpferd ungeritten</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€1.500 – €3.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Freizeitpferd geritten</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€2.000 – €5.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Reitpferd Grundausbildung</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€5.000 – €15.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Jungpferd mit Potenzial</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€3.000 – €8.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Turnierpferd L-Niveau</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€15.000 – €40.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Turnierpferd S-Niveau</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">ab €40.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Zuchtpferd</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€8.000 – €30.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Pony/Kinderpferd</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€2.500 – €7.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Therapiepferd</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€4.000 – €12.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700"><strong>Seniorenpferd</strong></td>
                    <td className="px-6 py-4 text-sm text-gray-700">€500 – €2.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn du dein Pferd verkaufen möchtest, hilft diese Tabelle bei der Orientierung. Der tatsächliche Wert deines Pferdes hängt jedoch von 11 kritischen Faktoren ab, die eine individuelle Bewertung erfordern. Bedenke auch, dass neben dem Kaufpreis <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand-brown hover:underline font-medium">zusätzliche Kosten wie Haltung und Unterhalt</Link> anfallen – eine wichtige Überlegung für Käufer.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Die 11 wichtigsten Wertfaktoren
            </h3>

            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li><strong>Alter</strong> – Pferde zwischen 6-12 Jahren erzielen Höchstpreise</li>
              <li><strong>Ausbildungsstand</strong> – Jeder Ausbildungsmonat steigert den Wert</li>
              <li><strong>Gesundheitszustand</strong> – <Link href="/pferde-ratgeber/aku-pferd/kosten" className="text-brand-brown hover:underline">AKU-Kosten im Detail</Link> beachten</li>
              <li><strong>Abstammung</strong> – Leistungsgenetik zahlt sich aus</li>
              <li><strong>Disziplineignung</strong> – Spezialisierung vs. Vielseitigkeit</li>
              <li><strong>Charakter</strong> – Anfängerfreundlichkeit ist wertvoll</li>
              <li><strong>Interieur</strong> – Nervenstärke und Rittigkeit</li>
              <li><strong>Exterieur</strong> – Korrektheit der Gliedmaßen</li>
              <li><strong>Erfolge</strong> – Platzierungen erhöhen den Wert messbar</li>
              <li><strong>Haltungsbedingungen</strong> – Professionelles Management steigert Attraktivität</li>
              <li><strong>Aktueller Markt</strong> – Angebot und Nachfrage variieren saisonal</li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Was senkt den Wert eines Pferdes?</strong> Chronische Erkrankungen (z.B. Arthrose, Allergien), Verhaltensauffälligkeiten (Steigen, Buckeln), fortgeschrittenes Alter (über 15 Jahre für Sportpferde), unvollständige Abstammungspapiere und lange Verkaufsdauer (über 6 Monate) wirken sich negativ auf den Preis aus.
            </p>

            {/* STRATEGIC BOX #1: KI-Bewertung CTA */}
            <RatgeberHighlightBox
              title="KI-Bewertung in 2 Minuten – Vermeide 3.000-9.000€ Verlust"
              icon={<Calculator className="h-5 w-5 text-brand-brown" />}
            >
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                PferdeWert unterstützt dich beim Pferd verkaufen mit präziser Wertermittlung. Unser KI-Tool analysiert die relevanten Wertfaktoren und vergleicht dein Pferd mit realen Verkaufsdaten aus dem deutschen Markt.
              </p>
              <CTAButton
                type="primary"
                href="/pferde-preis-berechnen"
                text="Jetzt Pferdewert berechnen"
              />
              <p className="text-sm text-gray-600 mt-3 italic">
                Im Gegensatz zu subjektiven Schätzungen liefert unser KI-Tool eine objektive, datenbasierte Bewertung – ohne emotionale Verzerrung.
              </p>
            </RatgeberHighlightBox>
          </section>

          {/* Plattformen-Vergleich */}
          <section id="plattformen-vergleich" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die besten Plattformen zum Pferd verkaufen: Vergleich 2025
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Beim Pferd verkaufen ist die Wahl der richtigen Plattform entscheidend für deinen Erfolg. Ein datenbasierter Vergleich hilft, die optimale Strategie zu finden.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Wo verkaufe ich am besten mein Pferd? (eHorses vs. pferde.de vs. privat)
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-brand border-b">Plattform</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-brand border-b">Reichweite</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-brand border-b">Kosten</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-brand border-b">Erfolg (3 Mon.)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-brand border-b">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700"><strong>eHorses.de</strong></td>
                    <td className="px-4 py-4 text-sm text-gray-700">135.000</td>
                    <td className="px-4 py-4 text-sm text-gray-700">€49,90 (Premium)</td>
                    <td className="px-4 py-4 text-sm text-gray-700">68%</td>
                    <td className="px-4 py-4 text-sm text-gray-700">Turnierpferde, Premium</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700"><strong>pferde.de</strong></td>
                    <td className="px-4 py-4 text-sm text-gray-700">45.000</td>
                    <td className="px-4 py-4 text-sm text-gray-700">€39,90</td>
                    <td className="px-4 py-4 text-sm text-gray-700">58%</td>
                    <td className="px-4 py-4 text-sm text-gray-700">Breitensport, Freizeit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700"><strong>Privater Verkauf</strong></td>
                    <td className="px-4 py-4 text-sm text-gray-700">individuell</td>
                    <td className="px-4 py-4 text-sm text-gray-700">€0</td>
                    <td className="px-4 py-4 text-sm text-gray-700">42%</td>
                    <td className="px-4 py-4 text-sm text-gray-700">Stallnetzwerke, bekannte Käufer</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <strong>Die Antwort:</strong> Beim Pferd verkaufen über eHorses erreichst du die größte Zielgruppe – der Marktführer hat die höchste Verkaufsquote (68% in 3 Monaten) für Turnierpferde und hochpreisige Pferde (über €15.000). Für Freizeitpferde und Breitensport bietet <strong>pferde.de</strong> ein gutes Preis-Leistungs-Verhältnis. <strong>Privat dein Pferd verkaufen</strong> spart Gebühren, funktioniert gut wenn du bereits potenzielle Käufer kennst – erfordert aber mehr Eigeninitiative (42% Erfolgsquote).
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              eHorses.de: Lohnt sich der Marktführer?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Vorteile:</strong></p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Maximale Reichweite:</strong> 135.000 monatliche Suchanfragen bedeuten höchste Sichtbarkeit</li>
              <li>• <strong>Qualifizierte Zielgruppe:</strong> Käufer mit klarer Kaufabsicht und Budget</li>
              <li>• <strong>Premium-Features:</strong> Galeriebilder, Video-Integration, Social-Media-Promotion</li>
              <li>• <strong>Profi-Netzwerk:</strong> Händler und Trainer nutzen primär eHorses</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Nachteile:</strong></p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Kosten:</strong> €49,90 für 60 Tage Premium-Inserat (erforderlich für Top-Platzierung)</li>
              <li>• <strong>Konkurrenz:</strong> 50.000+ aktive Inserate erfordern professionelle Präsentation</li>
              <li>• <strong>Zielgruppen-Limitation:</strong> Weniger geeignet für Gelegenheitsreiter-Pferde unter €3.000</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Fazit:</strong> Die Investition lohnt sich für Pferde ab €8.000 Wert, bei denen die 20% höhere Verkaufsquote die Kosten rechtfertigt.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Alternative: Private Verkaufskanäle
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">Private Kanäle ohne Plattformkosten:</p>

            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Facebook-Gruppen:</strong> &quot;Pferde zu verkaufen [Region]&quot; – kostenlos, aber zeitintensiv</li>
              <li>• <strong>Stallnetzwerk:</strong> Aushänge, Mund-zu-Mund-Propaganda – hohe Vertrauensbasis</li>
              <li>• <strong>Zuchtverbände:</strong> Für Zuchtpferde mit Papieren – spezialisierte Zielgruppe</li>
              <li>• <strong>Reitvereine:</strong> Lokale Reichweite, persönliche Empfehlungen</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6 mb-4">
              <strong>Wann sinnvoll?</strong> Private Kanäle funktionieren am besten für:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Freizeitpferde unter €5.000</li>
              <li>• Verkauf an bekannte Personen im Umfeld</li>
              <li>• Nischenrassen mit spezialisierter Community</li>
              <li>• Pferde mit spezifischen Anforderungen (z.B. Therapiepferde)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Plattform-Empfehlung nach Pferdetyp
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Turnierpferd (S-Niveau)</strong> → eHorses.de (obligatorisch für diese Zielgruppe)</li>
              <li>• <strong>Reitpferd (L-Niveau)</strong> → eHorses.de + regionale Facebook-Gruppen parallel</li>
              <li>• <strong>Freizeitpferd geritten</strong> → pferde.de ODER private Kanäle (flexibel)</li>
              <li>• <strong>Jungpferd</strong> → Zuchtverbände + eHorses.de</li>
              <li>• <strong>Pony/Kinderpferd</strong> → pferde.de + Reitvereine</li>
            </ul>

            <p className="text-sm text-gray-700 bg-white border border-brand/10 rounded-lg p-4 mt-6">
              💡 <strong>Profi-Tipp:</strong> Multi-Channel-Ansatz mit eHorses als Hauptkanal + 2-3 kostenlose Nebenkanäle maximiert Reichweite bei kontrollierten Kosten.
            </p>
          </section>

          {/* 7-Phasen-Verkaufsprozess */}
          <section id="verkaufsprozess" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Schritt-für-Schritt: Pferd verkaufen erfolgreich umsetzen
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein strukturierter Ablauf hilft dir, dein Pferd verkaufen zu können ohne wichtige Schritte zu vergessen. Hier der bewährte 7-Phasen-Ablauf, der die Verkaufsdauer von durchschnittlich 9 auf 3-6 Monate verkürzt:
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Phase 1-3: Vorbereitung, Wertermittlung, Anzeige
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 1: Vorbereitung (2-4 Wochen)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Gesundheitscheck beim Tierarzt</li>
              <li>✓ Hufschmied-Termin für optimale Optik</li>
              <li>✓ <Link href="/pferde-ratgeber/aku-pferd/ablauf" className="text-brand-brown hover:underline">AKU-Ablauf verstehen</Link> für Käuferfragen</li>
              <li>✓ Dokumente bereitstellen: Equidenpass, Impfausweis, Abstammungspapiere</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 2: Wertermittlung (1 Tag)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline">Pferdewert-Rechner</Link> nutzen für objektiven Preis</li>
              <li>✓ Vergleichsinserate auf eHorses analysieren (gleiche Kategorie)</li>
              <li>✓ Preisverhandlungsspielraum definieren (5-10% unter Maximalpreis)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 3: Anzeige erstellen (1-2 Tage)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Professionelle Fotos bei gutem Wetter (10 kritische Shots, siehe nächste Sektion)</li>
              <li>✓ 30-Sekunden Bewegungsvideo (Schritt, Trab, Galopp)</li>
              <li>✓ 20-Sekunden Handling-Video (Führen, Putzen, Aufhalftern)</li>
              <li>✓ Anzeigentext nach 8-Punkte-Struktur (siehe nächste Sektion)</li>
            </ul>

            <p className="text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <strong>Zeitaufwand gesamt:</strong> 3-5 Wochen Vorbereitung – systematisch dein Pferd verkaufen erhöht die Erfolgsquote deutlich.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Phase 4-5: Veröffentlichung und Interessenten-Screening
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 4: Veröffentlichung (1 Tag)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Plattform-Auswahl nach Pferdetyp (siehe vorherige Sektion)</li>
              <li>✓ Optimales Timing: März-Juni (Hochsaison) oder September-Oktober</li>
              <li>✓ Preis 5-10% unter Marktwert für schnellere Verkäufe setzen</li>
              <li>✓ Multi-Channel parallel: Hauptplattform + 2 kostenlose Kanäle</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 5: Interessenten-Management (2-6 Wochen)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>✓ Anfragen innerhalb 24 Stunden beantworten (Schnelligkeit = Seriosität)</li>
              <li>✓ Qualifizierte Interessenten: Konkrete Fragen zu Ausbildung, Charakter, Haltung</li>
              <li>✓ Stallbesichtigungen optional anbieten (hohe Kaufwahrscheinlichkeit)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Red Flags erkennen:</strong></p>
            <ul className="space-y-2 text-gray-700">
              <li>• Kein Interesse an Gesundheitsdaten</li>
              <li>• Keine AKU gewünscht</li>
              <li>• Sofortkauf ohne Probereiten</li>
              <li>• Preis &quot;egal&quot; (oft Schlachter)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Phase 6-7: Probereiten, AKU und Kaufabschluss
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 6: Probereiten & Kaufuntersuchung (1-2 Wochen)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ 1-2 Probereittermine vereinbaren (verschiedene Personen falls möglich)</li>
              <li>✓ Haftpflichtversicherung des Interessenten prüfen</li>
              <li>✓ AKU durch Käufer-Tierarzt (Kosten trägt Käufer, <Link href="/pferde-ratgeber/aku-pferd" className="text-brand-brown hover:underline">AKU erklärt</Link>)</li>
              <li>✓ AKU-Ergebnis transparent besprechen</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Phase 7: Vertragsabschluss & Übergabe (1-3 Tage)</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Kaufvertrag vorbereiten (siehe rechtliche Sektion)</li>
              <li>✓ Kaufpreis vor Übergabe vollständig erhalten (Banküberweisung, kein Bargeld)</li>
              <li>✓ Übergabeprotokoll mit 5 Punkten (siehe rechtliche Sektion)</li>
              <li>✓ Equidenpass übergeben mit Eigentumsänderung</li>
              <li>✓ Transport organisieren (Käufer-Verantwortung klären)</li>
            </ul>

            <p className="text-base text-gray-700 bg-white border border-brand/10 rounded-lg p-4">
              <strong>Zeitrahmen gesamt:</strong> Bei optimaler Vorbereitung und realistischem Preis <strong>3-6 Monate</strong> vom Start bis zur Übergabe.
            </p>
          </section>

          {/* Verkaufsanzeige */}
          <section id="verkaufsanzeige" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die perfekte Verkaufsanzeige: Texte, Fotos, Videos
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die Verkaufsanzeige ist dein wichtigstes Werkzeug, um dein Pferd verkaufen zu können. Sie bestimmt, ob dein Inserat 50 oder 500 Mal angeklickt wird.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Was muss in eine Verkaufsanzeige für ein Pferd?
            </h3>

            {/* STRATEGIC BOX #2: Anzeigen-Checkliste */}
            <RatgeberHighlightBox
              title="8-Punkte Must-Have Checkliste für deine Anzeige"
              icon={<CheckCircle className="h-5 w-5 text-brand-brown" />}
            >
              <ol className="space-y-3 list-decimal list-inside text-sm md:text-base text-gray-700">
                <li><strong>Rasse</strong> – Vollständige Bezeichnung (z.B. &quot;Deutsches Reitpony&quot; statt nur &quot;Pony&quot;)</li>
                <li><strong>Alter</strong> – Geburtsjahr + aktuelles Alter in Jahren</li>
                <li><strong>Stockmaß</strong> – Zentimetergenau (wichtig für Käufer-Körpergröße)</li>
                <li><strong>Ausbildungsstand</strong> – Konkret: &quot;L-Dressur platziert&quot; statt &quot;gut ausgebildet&quot;</li>
                <li><strong>Charakterbeschreibung</strong> – Ehrlich: Anfängergeeignet, nervenstark, schreckhaft?</li>
                <li><strong>Gesundheit</strong> – AKU-Status transparent kommunizieren</li>
                <li><strong>Preis</strong> – Konkrete Zahl oder &quot;VB&quot; (Verhandlungsbasis)</li>
                <li><strong>Kontaktmöglichkeiten</strong> – Telefon + E-Mail + WhatsApp für schnelle Rückmeldung</li>
              </ol>
              <p className="text-sm md:text-base text-gray-700 mt-4">
                Eine professionelle Anzeige ist der Schlüssel, um dein Pferd verkaufen zu können.
              </p>
            </RatgeberHighlightBox>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Fotos & Videos: Qualität statt Quantität
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>10 kritische Foto-Shots</strong> (bei gutem Wetter, sauberes Pferd):</p>
            <ol className="space-y-2 list-decimal list-inside text-gray-700 mb-6">
              <li>Seitlich stehend (gesamtes Pferd, neutraler Hintergrund)</li>
              <li>Schräg vorne (Kopf + Vorderhand)</li>
              <li>Schräg hinten (Hinterhand + Schweif)</li>
              <li>Nahaufnahme Kopf (Ausdruck erkennbar)</li>
              <li>Alle 4 Hufe/Beine (Stellungskorrektur)</li>
              <li>Schritt von der Seite</li>
              <li>Trab von der Seite</li>
              <li>Galopp von der Seite</li>
              <li>Reiter im Sattel (zeigt Größenverhältnis)</li>
              <li>Besonderheiten (Abzeichen, besondere Merkmale)</li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>2 essenzielle Videos:</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• <strong>Bewegungsvideo (30 Sekunden):</strong> Schritt → Trab → Galopp auf beiden Händen – Videos erhöhen deine Chancen, das Pferd verkaufen zu können, um 60%</li>
              <li>• <strong>Handling-Video (20 Sekunden):</strong> Führen, Putzen, Aufhalftern (zeigt Umgänglichkeit)</li>
            </ul>

            <p className="text-base text-gray-700 bg-white border border-brand/10 rounded-lg p-4">
              💡 <strong>Profi-Tipp:</strong> Investiere €100-150 in einen professionellen Pferdefotografen für Turnierpferde ab €15.000. Das zahlt sich aus durch 3-5 Wochen kürzere Verkaufsdauer.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Preisangabe-Psychologie
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Festpreis vs. Verhandlungsbasis (VB):</strong></p>

            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Festpreis</strong> → Sinnvoll bei:</p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Klarer Marktwert (viele Vergleichsinserate)</li>
                  <li>• Unterer Preisbereich (bis €5.000)</li>
                  <li>• Schnellverkauf gewünscht</li>
                </ul>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>VB (Verhandlungsbasis)</strong> → Sinnvoll bei:</p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Individuellen Pferden (schwer vergleichbar)</li>
                  <li>• Premium-Segment (ab €20.000)</li>
                  <li>• Flexibilität für richtige Käufer</li>
                </ul>
              </div>
            </div>

            <p className="text-base text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <strong>Faustregel:</strong> VB-Preis sollte 10-15% über deinem Mindestpreis liegen, um Verhandlungsspielraum zu haben.
            </p>
          </section>

          {/* Rechtliche Aspekte */}
          <section id="rechtliche-aspekte" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche Aspekte beim Pferd verkaufen: Kaufvertrag & Haftung
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Rechtliche Sicherheit ist beim Pferd verkaufen unverzichtbar. ⚠️ <strong>Disclaimer:</strong> Dieser Artikel ersetzt keine Rechtsberatung. Bei komplexen Fällen konsultieren Sie einen Fachanwalt für Pferderecht.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Welche rechtlichen Aspekte gilt es beim Pferdeverkauf zu beachten?
            </h3>

            {/* STRATEGIC BOX #3: Rechtliche Checkliste */}
            <RatgeberHighlightBox
              title="Die 3 wichtigsten rechtlichen Punkte"
              icon={<Shield className="h-5 w-5 text-brand-brown" />}
            >
              <ol className="space-y-4 list-decimal list-inside text-sm md:text-base text-gray-700">
                <li>
                  <strong className="text-brand">Schriftlicher Kaufvertrag mit Pflichtangaben</strong> (§433ff BGB) – beim Pferd verkaufen ist ein rechtssicherer Vertrag Pflicht
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Vollständige Identifikation (Name, Rasse, Alter, Geschlecht, Chipnummer)</li>
                    <li>• Kaufpreis und Zahlungsmodalitäten</li>
                    <li>• Gewährleistungsausschluss (falls vereinbart)</li>
                    <li>• Unterschriften beider Parteien</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-brand">Offenbarungspflicht bei bekannten Mängeln</strong>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• AKU-Befunde transparent mitteilen</li>
                    <li>• Bekannte Vorerkrankungen offenlegen (z.B. Kolik-Historie)</li>
                    <li>• Verhaltensauffälligkeiten nicht verschweigen</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-brand">Haftungsklärung für Probezeit und Transport</strong>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Versicherung während Probereiten klären</li>
                    <li>• Transportrisiko schriftlich festlegen</li>
                    <li>• Übergabedatum und -ort dokumentieren</li>
                  </ul>
                </li>
              </ol>
              <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
                ⚠️ Wichtig: Auch bei Gewährleistungsausschluss haften Sie für arglistig verschwiegene Mängel!
              </p>
            </RatgeberHighlightBox>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Offenbarungspflicht & Gewährleistung kompakt
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Was muss offengelegt werden?</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• AKU-Befunde der letzten 12 Monate (alle Klassen)</li>
              <li>• Chronische Erkrankungen (Allergien, Arthrose, etc.)</li>
              <li>• Verhaltensauffälligkeiten (Steigen, Buckeln, Weben)</li>
              <li>• Operative Eingriffe und Medikation</li>
              <li>• Kolik-Historie (besonders bei wiederholtem Auftreten)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Gewährleistungsausschluss rechtssicher formulieren:</strong></p>
            <p className="text-lg text-gray-700 leading-relaxed bg-white border border-gray-200 rounded-lg p-4 italic">
              &quot;Der Verkauf erfolgt unter Ausschluss jeglicher Gewährleistung gemäß §444 BGB. Der Käufer verzichtet auf alle Ansprüche wegen Sachmängeln.&quot;
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mt-6 mb-4"><strong>Wichtig:</strong> Gewährleistungsausschluss ist nur wirksam bei:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• Privaten Verkäufern (nicht gewerblich)</li>
              <li>• Vollständiger Offenlegung bekannter Mängel</li>
              <li>• Schriftlicher Vereinbarung im Kaufvertrag</li>
            </ul>

            <p className="text-base text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <strong>Konsequenzen bei Verletzung der Offenbarungspflicht:</strong> Rückabwicklung des Kaufs, Schadensersatzforderungen, strafrechtliche Relevanz bei arglistiger Täuschung.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Übergabeprotokoll: 5-Punkte Checkliste
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Ein professionelles Übergabeprotokoll schützt beide Parteien vor späteren Streitigkeiten:
            </p>

            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>✓ <strong>Identifikation:</strong> Chipnummer, Equidenpass-Nummer, Fotos bei Übergabe</li>
              <li>✓ <strong>Gesundheitszustand:</strong> Aktuelle Befindlichkeit, letzte Entwurmung/Impfung, AKU-Status</li>
              <li>✓ <strong>Ausrüstung:</strong> Liste übergebener Gegenstände (Sattel, Trense, Decken falls vereinbart)</li>
              <li>✓ <strong>Zahlungsbestätigung:</strong> Kaufpreis vollständig erhalten (Betrag + Zahlungsdatum)</li>
              <li>✓ <strong>Versicherungsübergabe:</strong> Haftpflicht/OP-Versicherung auf Käufer übertragen oder gekündigt</li>
            </ol>

            <p className="text-base text-gray-700 bg-white border border-brand/10 rounded-lg p-4 mt-6">
              <strong>Zeitpunkt:</strong> Protokoll IMMER bei physischer Übergabe ausfüllen und von beiden Parteien unterschreiben lassen.
            </p>
          </section>

          {/* Schnell verkaufen */}
          <section id="schnell-verkaufen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pferd schnell verkaufen: 7 bewährte Strategien
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn du dein Pferd verkaufen möchtest und schnelle Ergebnisse brauchst, helfen diese 7 Strategien. Schnelligkeit ist wichtig – aber nicht um jeden Preis. Die Balance zwischen &quot;schnell&quot; und &quot;seriös&quot; ist entscheidend.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Wie verkaufe ich mein Pferd schnell?
            </h3>

            {/* STRATEGIC BOX #4: Schnellverkaufs-Strategien */}
            <RatgeberHighlightBox
              title="Die 3 erfolgskritischen Faktoren für schnellen Verkauf"
              icon={<TrendingUp className="h-5 w-5 text-brand-brown" />}
            >
              <ol className="space-y-4 list-decimal list-inside text-sm md:text-base text-gray-700">
                <li>
                  <strong className="text-brand">Preis 5-10% unter Marktwert setzen</strong> – realistisch zu preisen hilft, dein Pferd verkaufen zu können ohne Verzögerungen
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Recherche: 10 Vergleichsinserate analysieren</li>
                    <li>• Durchschnittspreis berechnen</li>
                    <li>• Minus 5-10% = dein Schnellverkaufs-Preis</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-brand">März-Juni starten (Hochsaison nutzen)</strong>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• 60% mehr Anfragen als November-Februar</li>
                    <li>• Besseres Wetter = bessere Fotos + Probereiten</li>
                    <li>• Käufer planen für Turniersaison</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-brand">Multi-Channel-Ansatz</strong> – aktives Marketing beschleunigt den Prozess
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Hauptplattform (eHorses ODER pferde.de)</li>
                    <li>• + Facebook-Gruppen (3-5 relevante Gruppen)</li>
                    <li>• + Stallnetzwerk aktivieren (Aushänge, Trainer fragen)</li>
                    <li>• + Zuchtverbände (falls zutreffend)</li>
                  </ul>
                </li>
              </ol>
              <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
                Realistische Zeitrahmen: Mit diesen 3 Faktoren ist ein Verkauf in <strong>2-6 Wochen</strong> realistisch machbar (statt 6-9 Monate Durchschnitt).
              </p>
            </RatgeberHighlightBox>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              7 Sofort-Maßnahmen für schnellen Verkauf
            </h3>

            <ol className="space-y-3 list-decimal list-inside text-gray-700">
              <li><strong>Preis um 5-10% senken</strong> – Sofortige Wirkung innerhalb 48 Stunden sichtbar</li>
              <li><strong>Professionelle Fotos</strong> – €100-150 Investment, zahlt sich in Klicks aus</li>
              <li><strong>Multi-Channel parallel</strong> – Reichweite verdoppeln = Anfragen verdoppeln</li>
              <li><strong>Probereiten flexibel</strong> – Auch Abends/Wochenende anbieten (Berufstätige)</li>
              <li><strong>AKU-Kosten übernehmen</strong> – Starkes Kaufargument für seriöse Käufer</li>
              <li><strong>Netzwerk aktivieren</strong> – Trainer, Stallbesitzer, Tierarzt informieren</li>
              <li><strong>Transportoption anbieten</strong> – Organisierter Transport (auf Käuferkosten) erleichtert Entscheidung</li>
            </ol>

            <p className="text-base text-gray-700 bg-white border border-brand/10 rounded-lg p-4 mt-6">
              <strong>Case Study:</strong> Turnierpferd (€22.000) verkauft in 14 Tagen statt 6 Monaten durch Kombination von Maßnahmen 1, 2, 4 und 7. Kritisch: Preis von €24.500 auf €22.000 gesenkt + professionelle Fotoshoot-Investment €150.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              ⚠️ Balance: Schnell vs. Verdächtig
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Warnung: Zu schnell wirkt unseriös</strong></p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• <strong>Unter 2 Wochen</strong> = Red Flag für Käufer (Warum so schnell? Gesundheitsprobleme?)</li>
              <li>• <strong>2-6 Wochen</strong> = Optimal (zeigt Nachfrage + Qualität)</li>
              <li>• <strong>Über 6 Monate</strong> = Preiskorrektur nötig (Markt signalisiert: zu teuer)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Seriöse Signale senden:</strong></p>
            <ul className="space-y-2 text-gray-700">
              <li>• Transparente AKU-Daten bereitstellen</li>
              <li>• Mehrere Probereittermine anbieten (nicht &quot;nur morgen möglich&quot;)</li>
              <li>• Stallbesichtigung ermöglichen</li>
              <li>• Bereitwillig Fragen beantworten (auch kritische)</li>
            </ul>

            <p className="text-base text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <strong>Faustregel:</strong> Schneller Verkauf ist gut, aber nicht wenn er Käufer abschreckt. 2-4 Wochen ist der ideale Zeitrahmen.
            </p>
          </section>

          {/* Emotionaler Aspekt */}
          <section id="emotionaler-aspekt" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Der emotionale Aspekt beim Pferd verkaufen: Abschied gestalten
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferd verkaufen bedeutet oft, sich von einem langjährigen Partner zu trennen. Es ist nicht nur eine geschäftliche Transaktion – es ist der Abschied von einem Lebewesen, das oft jahrelang dein Partner war.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              3 Phasen des Abschiednehmens
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Phase 1: Vorbereitung (Trauer ist normal)</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ein Pferd verkaufen ist emotional – nimm dir Zeit für Abschied. Es ist völlig normal, beim Gedanken an den Verkauf traurig zu sein. Viele Verkäufer berichten von Schuldgefühlen oder dem Gefühl, ihr Pferd &quot;im Stich zu lassen&quot;. Diese Emotionen sind legitim – nimm dir Zeit, sie zu verarbeiten.
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Phase 2: Loslassen (Das richtige Zuhause finden)</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Der Verkaufsprozess wird emotional leichter, wenn dein Fokus nicht auf dem Abschied liegt, sondern darauf, das beste neue Zuhause für dein Pferd zu finden. Du bist nicht verantwortungslos – du triffst eine durchdachte Entscheidung.
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Phase 3: Closure (Abschiedsritual)</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Viele Verkäufer empfinden einen letzten Ausritt, ein Foto oder ein kleines Ritual als hilfreich, um den Abschied bewusst zu gestalten. Es gibt kein &quot;richtiges&quot; Ritual – tu, was sich für dich stimmig anfühlt.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Das richtige Zuhause erkennen
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4"><strong>Bauchgefühl validieren</strong> – worauf achten:</p>

            <ul className="space-y-3 text-gray-700">
              <li>
                • <strong>Stallbesichtigung:</strong> Besuche den neuen Stall, wenn möglich. Saubere Boxen, gepflegte Pferde und freundliches Personal sind gute Zeichen.
              </li>
              <li>
                • <strong>Umgang beobachten:</strong> Wie geht der Käufer beim Probereiten mit deinem Pferd um? Geduldig, respektvoll, sachkundig?
              </li>
              <li>
                • <strong>Fragen des Käufers:</strong> Gute Käufer fragen detailliert nach Charakter, Gesundheit, Vorlieben des Pferdes – nicht nur nach Leistung.
              </li>
              <li>
                • <strong>Langfristige Planung:</strong> Seriöse Käufer haben klare Pläne (Training, Turniere, Freizeit) – keine impulsive &quot;ich wollte schon immer ein Pferd&quot;-Mentalität.
              </li>
            </ul>

            <p className="text-base text-gray-700 bg-white border border-brand/10 rounded-lg p-4 mt-6">
              <strong>Wann ist ein Zuhause &quot;gut genug&quot;?</strong> Es gibt kein perfektes Zuhause. Wenn Grundbedürfnisse (artgerechte Haltung, kompetente Betreuung, finanzielle Sicherheit) erfüllt sind und dein Bauchgefühl &quot;Ja&quot; sagt, ist das ausreichend.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Kontakt nach Verkauf: deine Wahl
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Es gibt <strong>keine richtige oder falsche Wahl</strong> – nur individuelle Präferenzen:
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Option 1: Updates vereinbaren</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Manche Käufer sind offen dafür, regelmäßig Fotos oder kurze Updates zu schicken. Besprich das vor dem Verkauf, falls dir das wichtig ist.
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Option 2: Besuchsrechte</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In seltenen Fällen werden Besuchsrechte vertraglich vereinbart (z.B. 1x pro Jahr). Funktioniert am besten bei regional nahen Verkäufen.
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Option 3: Komplettes Loslassen</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Viele Verkäufer empfinden es als leichter, nach dem Verkauf keinen Kontakt mehr zu haben – viele Besitzer bleiben nach dem Pferd verkaufen mit dem neuen Halter in Kontakt, aber das ist keine Pflicht. Das ist absolut legitim und oft sogar gesünder für den Trauerprozess.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed italic bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <strong>Zitat einer Verkäuferin:</strong> &quot;Ich hatte Angst, meine Stute zu verkaufen. Aber als ich die neue Besitzerin beim Probereiten sah – wie sanft sie mit ihr umging, wie sie lächelte – wusste ich: Das ist das richtige Zuhause. Der Abschied war trotzdem schwer, aber ich habe keinen Kontakt mehr und das ist okay.&quot;
            </p>
          </section>

          {/* Fazit */}
          <section id="fazit" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit: Erfolgreich und fair dein Pferd verkaufen
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferd verkaufen erfolgreich und fair – das ist mit der richtigen Vorbereitung möglich. Ein Pferd erfolgreich zu verkaufen bedeutet, den kompletten 7-Phasen-Prozess zu durchlaufen: von der gründlichen Vorbereitung über die datenbasierte Wertermittlung mit dem <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">PferdeWert KI-Tool</Link> bis hin zur Wahl der richtigen Plattform (eHorses für Premium-Pferde, pferde.de oder private Kanäle für Freizeitpferde) und der professionellen Übergabe.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Erfolg definiert sich nicht nur über den Verkaufspreis, sondern auch über die emotionale Balance – das richtige Zuhause für dein Pferd zu finden.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Die 2 kritischsten Learnings:
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Die Basis:</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ob du dein erstes oder fünftes Pferd verkaufst: Die Kombination aus realistischer Wertermittlung und der Wahl der richtigen Plattform (eHorses für Turnierpferde, pferde.de für Breitensport, private Kanäle für Netzwerke) schafft die Basis für schnellen Verkaufserfolg. Diese solide Grundlage spart Monate frustrierender Verkaufsbemühungen mit überhöhten Preisen.
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Timing:</strong></p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Geduld zahlt sich aus. Die optimale Verkaufsdauer liegt bei 2-6 Wochen – alles darunter wirkt verdächtig (Red Flag für Käufer), alles darüber signalisiert Preiskorrektur-Bedarf. Starte im März-Juni (Hochsaison) für maximale Anfragen.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <CTAButton
                type="primary"
                href="/pferde-preis-berechnen"
                text="Jetzt Pferdewert berechnen"
              />
              <p className="text-sm text-gray-600 mt-3">
                In nur 2 Minuten erhältst du eine datenbasierte Preiseinschätzung.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQ faqs={faqItems} />

          {/* Related Articles */}
          <RatgeberRelatedArticles
            title="Weiterführende Ratgeber"
            articles={relatedArticles}
            description="Vertiefe dein Wissen rund um Pferdekauf, -verkauf und Bewertung."
          />
        </article>

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: "/images/shared/blossi-shooting.webp",
            alt: "Pferd erfolgreich verkaufen - Jetzt starten"
          }}
          title="Bereit für den erfolgreichen Verkauf?"
          description={`Starte jetzt mit einer professionellen AI-Bewertung für nur ${PRICING_FORMATTED.current} und verkaufe dein Pferd zum optimalen Preis. Objektiv, schnell, präzise – entwickelt von erfahrenen Reitern.`}
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </div>
    </Layout>
  );
};

export default PferdVerkaufen;
