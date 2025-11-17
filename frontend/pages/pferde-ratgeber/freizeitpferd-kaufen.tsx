import { useCountryConfig } from '@/hooks/useCountryConfig'
import Head from 'next/head';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { Sparkles, Award, ShieldCheck, TrendingUp, Clock, User } from 'lucide-react';
import Link from 'next/link';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const awardIcon = <Award className="w-5 h-5" />;
const shieldIcon = <ShieldCheck className="w-5 h-5" />;
const clockIcon = <Clock className="h-4 w-4" />;
const userIcon = <User className="h-4 w-4" />;
const trendingUpIcon = <TrendingUp className="w-4 h-4 ml-2" />;

// FAST REFRESH FIX: Define arrays and objects at module level to prevent recreation
const heroMetaItems = [
  { icon: clockIcon, label: '15 Min. Lesezeit' },
  { icon: userIcon, label: 'PferdeWert Redaktion' }
];

export default function FreizeitpferdKaufen() {

  const { getLocalizedPath } = useCountryConfig();

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: getLocalizedPath('/pferde-preis-berechnen'),
    icon: sparklesIcon
  };

  const sections = [
    { id: 'definition', title: 'Was ist ein Freizeitpferd?' },
    { id: 'kosten', title: 'Kosten: Kaufpreis und Unterhalt' },
    { id: 'rassen', title: 'Die besten Pferderassen für Freizeitreiter' },
    { id: 'anfaenger', title: 'Anfängerpferde: Rassen und Alter' },
    { id: 'kaufprozess', title: 'Kaufprozess: Private vs. Händler' },
    { id: 'gesundheit', title: 'Gesundheitscheck und AKU' },
    { id: 'rechtliches', title: 'Rechtliche Aspekte und Kaufvertrag' },
    { id: 'action-plan', title: 'Dein Action Plan' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Was kostet ein gutes Freizeitpferd?',
      answer: 'Ein gutes Freizeitpferd kostet zwischen 6.000€ und 25.000€ beim Kauf, abhängig von Alter, Rasse und Ausbildungsstand. Budget-Varianten (5-10 Jahre, Basis-Ausbildung) kosten 6.000-12.000€, mittleres Segment 12.000-18.000€, Premium-Pferde 18.000€+. Zusätzlich fallen jährliche Unterhaltskosten von 4.000-6.000€ an (Futter, Stall, Tierarzt, Hufschmied).'
    },
    {
      question: 'Welche Pferderasse ist beste für Anfänger?',
      answer: 'Die besten Anfängerrassen sind: 1) Haflinger (extrem zuverlässig, geduldig, ideal für Anfänger), 2) Quarter Horse (nervenstark, intelligent, gehorsam), 3) Isländer (ausdauernd, trittsicher), 4) Fjordpferd (robust, für schwerere Reiter), 5) Hannoveraner (klassisches deutsches Reitpferd). Das Wichtigste ist nicht nur die Rasse, sondern das individuelle Temperament des Pferdes - teste es persönlich vor dem Kauf.'
    },
    {
      question: 'Welches Alter sollte ein Anfängerpferd haben?',
      answer: 'Optimal für Anfänger ist ein Alter zwischen 8-15 Jahren: Der Körper ist vollständig entwickelt, es hat genug Trainingserfahrung, noch 10-15 Jahre Lebensdauer, und das Temperament ist etabliert. Junge Pferde (unter 7 Jahren) brauchen erfahrene Reiter. Senior-Pferde (über 20 Jahren) sind oft günstig, haben aber häufig gesundheitliche Probleme.'
    },
    {
      question: 'Ist eine tierärztliche Ankaufsuntersuchung wirklich nötig?',
      answer: 'Ja, absolut! Eine Ankaufsuntersuchung durch einen Tierarzt kostet 400-600€ und ist nicht optional - es ist Pflicht. Sie dauert 1-2 Stunden und prüft Allgemeinzustand, Bewegung unter Last, Herz, Lungen, Zähne und Augen. Diese Untersuchung schützt dich vor teuren Fehlkäufen und kann dir 5.000€+ in Veterinärkosten sparen.'
    },
    {
      question: 'Was muss in einen Pferd-Kaufvertrag rein?',
      answer: 'Ein gültiger Kaufvertrag muss enthalten: 1) Identifikation (Name, Alter, Rasse, Farbe, besondere Merkmale, ggf. Pferdepass), 2) Finanzielle Bedingungen (Kaufpreis, Zahlungsweise, Anzahlung), 3) Zustandsbeschreibung (Gesundheit, Ausbildung, Temperament), 4) Gewährleistung (meist 6 Monate, Details was abgedeckt), 5) Haftung nach Übergabe (wann wechselt Verantwortung), 6) Unterschriften beider Parteien mit Datum und Ort.'
    },
    {
      question: 'Sollte ich ein Freizeitpferd privat oder von einem Händler kaufen?',
      answer: 'Private Verkäufer bieten 20-30% niedrigere Preise, aber keine Gewährleistung. Händler sind teurer (20-30% höher), bieten aber 1-2 Jahre Gewährleistung, Rückgaberecht und rechtliche Sicherheit. Für Anfänger empfehle ich einen seriösen Händler oder etablierte Plattformen (ehorses.de, pferde.de), da die Mehrkosten durch Sicherheit und Rückgaberecht kompensiert werden.'
    }
  ];

  const relatedArticles = [
    {
      href: '/pferde-ratgeber/pferdekaufvertrag',
      image: '/images/ratgeber/horses-mountain-field-spain.webp',
      title: 'Pferdekaufvertrag: Rechtliche Absicherung beim Pferdekauf',
      badge: 'Finanzen & Recht',
      readTime: '12 Min.',
      description: 'Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden. Rechtlich sicher kaufen & verkaufen.'
    },
    {
      href: '/pferde-ratgeber/aku-pferd',
      image: '/images/ratgeber/aku-pferd/veterinarian-examining-horse-head-outdoor.webp',
      title: 'Ankaufsuntersuchung beim Pferd: Der ultimative AKU-Ratgeber',
      badge: 'Kauf & Verkauf',
      readTime: '15 Min.',
      description: 'Der umfassende Leitfaden zur Ankaufsuntersuchung beim Pferdekauf. Kosten, Ablauf, Bewertung und wie AKU-Befunde den Pferdewert beeinflussen.'
    },
    {
      href: '/pferde-ratgeber/pferd-kaufen',
      image: '/images/ratgeber/pferd-kaufen/rider-brown-horse-dressage-arena.webp',
      title: 'Pferd kaufen: Der ultimative Ratgeber für Erstkäufer',
      badge: 'Kauf & Verkauf',
      readTime: '18 Min.',
      description: 'Der ultimative Ratgeber für den Pferdekauf. Checklisten, rechtliche Aspekte, Bewertungskriterien und Tipps für die richtige Entscheidung.'
    }
  ];

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <Head>
        <title>Freizeitpferd kaufen: Kompletter Guide für Anfänger</title>
        <meta name="description" content="Freizeitpferd kaufen leicht gemacht: Rassen, Kosten, Gesundheitschecks & Kaufvertrag. Unser Leitfaden mit Checklisten hilft dir, das richtige Pferd sicher zu kaufen." />
        <meta name="keywords" content="freizeitpferd kaufen, freizeitpferd rassen, freizeitpferd temperament, anfängerpferd kaufen, gutes freizeitpferd finden" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.pferdewert.de/pferde-ratgeber/freizeitpferd-kaufen" />

        {/* Open Graph */}
        <meta property="og:title" content="Freizeitpferd kaufen: Kompletter Guide für Anfänger" />
        <meta property="og:description" content="Freizeitpferd kaufen: Von Rassenauswahl bis Kaufvertrag. Praktischer Leitfaden mit Checklisten für sicheren Pferdekauf." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.pferdewert.de/pferde-ratgeber/freizeitpferd-kaufen" />
        <meta property="og:image" content="https://www.pferdewert.de/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Freizeitpferd kaufen: Kompletter Guide" />
        <meta name="twitter:description" content="Rassen, Kosten, Gesundheitschecks & Kaufvertrag: So kaufst du dein Freizeitpferd sicher. Mit Checklisten & Praxis-Tipps." />
        <meta name="twitter:creator" content="@pferdewertde" />

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Freizeitpferd kaufen: Kompletter Guide für Anfänger',
              description: 'Freizeitpferd kaufen leicht gemacht: Rassen, Kosten, Gesundheitschecks & Kaufvertrag. Unser Leitfaden mit Checklisten hilft dir, das richtige Pferd sicher zu kaufen.',
              image: 'https://www.pferdewert.de/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp',
              author: {
                '@type': 'Person',
                name: 'PferdeWert.de Redaktion',
                url: 'https://www.pferdewert.de/ueber-uns'
              },
              publisher: {
                '@type': 'Organization',
                name: 'PferdeWert.de',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.pferdewert.de/logo.png',
                  width: 250,
                  height: 60
                },
                url: 'https://www.pferdewert.de'
              },
              datePublished: '2025-11-14',
              dateModified: '2025-11-14',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://www.pferdewert.de/pferde-ratgeber/freizeitpferd-kaufen'
              },
              articleSection: 'Ratgeber',
              keywords: 'freizeitpferd kaufen, freizeitpferd rassen, anfängerpferd, pferderassen anfänger, pferd kaufentscheidung',
              wordCount: 2487
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                  name: 'Freizeitpferd kaufen',
                  item: 'https://www.pferdewert.de/pferde-ratgeber/freizeitpferd-kaufen'
                }
              ]
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer
                }
              }))
            })
          }}
        />

        {/* HowTo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'Freizeitpferd kaufen: Schritt-für-Schritt Anleitung',
              description: 'So kaufst du dein Freizeitpferd sicher und erfolgreich - von der Budgetplanung bis zur Vertragsunterschrift',
              image: 'https://www.pferdewert.de/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp',
              step: [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Budget definieren',
                  text: 'Berechne dein Budget für Kauf und Jahreskosten. Kaufpreis: 6.000-25.000€. Jährliche Unterhaltskosten: 4.000-6.000€ (durchschnittlich 450€/Monat). Klär auch Bankfinanzierung, falls nötig.'
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'Rasse und Anforderungen klären',
                  text: 'Wähle die passende Pferderasse für dein Niveau. Anfänger sollten Haflinger, Quarter Horse oder Isländer bevorzugen. Definiere auch das Idealgewicht des Pferdes und besondere Anforderungen (z.B. für schwerere Reiter: Fjordpferd).'
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Markt durchsuchen und Kandidaten testen',
                  text: 'Nutze ehorses.de, pferde.de oder kleinanzeigen.de. Sieh dir mindestens 10-15 Kandidaten an. Wichtig: Teste das Pferd persönlich (reiten, nicht nur ansehen). Mit Verkäufern kommunizieren, Referenzen erfragen.'
                },
                {
                  '@type': 'HowToStep',
                  position: 4,
                  name: 'Tierärztliche Ankaufsuntersuchung durchführen',
                  text: 'Buche deinen Tierarzt BEVOR du Geld zahlst. Untersuchung dauert 1-2 Stunden, kostet 400-600€. Prüfe: Allgemeinzustand, Bewegung unter Last, Herz/Lungen, Zähne, Augen. Optional: Röntgen bei Gelenkproblemen.'
                },
                {
                  '@type': 'HowToStep',
                  position: 5,
                  name: 'Kaufvertrag prüfen und unterzeichnen',
                  text: 'Kaufvertrag muss enthalten: Pferdeidentifikation, Kaufpreis, Zustand, Gewährleistung (6 Monate Standard), Haftungsklauseln. Lass Anwalt checken (100-200€). Unterzeichne NACH erfolgreicher Tieruntersuchung.'
                },
                {
                  '@type': 'HowToStep',
                  position: 6,
                  name: 'Transport und Integration vorbereiten',
                  text: 'Arrange Transport (sicher und versichert). Kläre Stallplatz. Buche termin mit lokalem Tierarzt vor Ankunft. Kaufe Grundausstattung (Sattel, Zaumzeug, Pflege-Material). Der gesamte Prozess dauert 4-8 Wochen.'
                }
              ],
              totalTime: 'PT4W'
            })
          }}
        />
      </Head>

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Kauf & Verkauf"
          title="Freizeitpferd kaufen: Der komplette Leitfaden für Anfänger"
          subtitle="Dein Traum vom eigenen Freizeitpferd rückt näher. Erfahre alles über die besten Rassen, realistische Kosten, wichtige Gesundheitschecks und die rechtliche Absicherung beim Kauf."
          metaItems={heroMetaItems}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp"
          alt="Haflinger Deckhengst - Typisches Freizeitpferd mit ruhigem Temperament"
          priority={true}
          objectPosition="center center"
          attribution={{
            author: 'Böhringer Friedrich',
            license: 'CC BY-SA 2.5',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/deed.en',
            source: 'Wikimedia Commons'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Dein Traum vom eigenen Freizeitpferd rückt näher – aber wie findest du das richtige Pferd? Mit über 18.000 Angeboten im deutschsprachigen Raum ist die Auswahl riesig. Dieser Guide beantwortet alle deine Fragen zum <strong>Freizeitpferdkauf</strong>: Von den perfekten Rassen für Anfänger bis zur richtigen Gesundheitsprüfung.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nach der Lektüre kennst du die wichtigsten Kriterien, erfährst welche Rassen optimal sind, erhältst eine detaillierte Kostenübersicht, und weißt, wie du dein Traumpferd sicher kaufst. Einen umfassenden Überblick über den gesamten Pferdekauf-Prozess findest du in unserem <Link href={getLocalizedPath("/pferde-ratgeber/pferd-kaufen")} className="text-brand hover:text-brand-dark underline">ultimativen Pferdekauf-Ratgeber</Link>.
            </p>
          </section>

          {/* Section: Definition */}
          <section id="definition" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was ist ein Freizeitpferd? Definition und Charakteristiken
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Freizeitpferd ist nicht einfach &quot;jedes Pferd, das man reitet&quot;. Es hat spezifische Eigenschaften, die es vom Sportreitpferd unterscheiden.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Unterschied zu Sportreitpferden
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Während Springpferde und Dressurpferde für Leistung gezüchtet werden, steht beim <strong>Freizeitpferd der Charakter vor der Leistung</strong>. Ein gutes Freizeitpferd muss zuverlässig, geduldig und nervenstark sein – nicht unbedingt schnell oder spektakulär.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das bedeutet konkret: Ein Freizeitpferd sollte trittsicher über unebenes Gelände gehen, auch bei Ablenkung ruhig bleiben und über längere Distanzen ausdauernd sein. Springpferde dagegen werden für explosive Kraft trainiert, Dressurpferde für Präzision und Eleganz. Diese Spezialisierungen sind für entspannte Ausritte und Freizeitaktivitäten völlig unnötig.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Ideale Charaktereigenschaften eines Freizeitpferdes
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das beste <strong>Freizeitpferd Temperament</strong> kombiniert mehrere Merkmale:
            </p>
            <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
              <li><strong>Nervenstärke</strong>: Ruhe bei unerwartetem Lärm oder Wildwechsel</li>
              <li><strong>Zuverlässigkeit</strong>: Konsistentes Verhalten, keine Überraschungen</li>
              <li><strong>Ausdauer</strong>: Kraft für längere Ausritte ohne Übermüdung</li>
              <li><strong>Menschenbezogenheit</strong>: Vertrauen zum Reiter aufbauen können</li>
              <li><strong>Trittsicherheit</strong>: Sicherer Gang auf schwierigem Untergrund</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Ein nervöses oder unberechenbares Pferd ist für Freizeitreiter ein Risiko. Du suchst nach einem Partner, nicht einer Herausforderung.
            </p>
          </section>

          {/* Section: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kosten: Kaufpreis und laufende Unterhaltskosten
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Viele Anfänger unterschätzen die Gesamtkosten. Es geht nicht nur um den Kaufpreis.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kaufpreis: Was kostet ein gutes Freizeitpferd?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die <strong>Freizeitpferd Kosten</strong> beim Kauf liegen zwischen <strong>6.000€ und 25.000€</strong>, je nach Qualität, Alter und Ausbildung. Das basiert auf aktuellen Marktdaten von ehorses.de (über 18.000 Angebote).
            </p>
            <div className="bg-amber-50 border-l-4 border-brand p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-3">Typische Preisbereiche:</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Budget-Variante</strong> (5-10 Jahre, Basis-Ausbildung): 6.000–12.000€</li>
                <li><strong>Mittleres Segment</strong> (7-15 Jahre, gut geritten): 12.000–18.000€</li>
                <li><strong>Premium</strong> (gutes Pedigree, viel Erfahrung): 18.000–25.000€+</li>
              </ul>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Preis wird bestimmt durch: Alter (8-15 Jahre sind oft günstig), Rasse (Quarter Horses sind billiger als Vollblüter), Ausbildungsstand (ein ruhiges &ldquo;Anfängerpferd&rdquo; ist teurer) und Dokumentation (mit Papieren ca. 20% teurer).
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Jährliche Unterhaltskosten: Das Budget für dein Freizeitpferd
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hier wird es realistisch. Nach dem Kauf kostet ein Freizeitpferd <strong>4.000–6.000€ pro Jahr</strong>:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kostenposition</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Jährlich</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Beispiel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Futter & Zusätze</td>
                    <td className="px-6 py-4 text-sm text-gray-900">2.000€</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Heu, Kraftfutter, Vitamine</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Stall / Weiden</td>
                    <td className="px-6 py-4 text-sm text-gray-900">1.500€</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Boxenhaltung oder Vollweide</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Tierarzt & Zahnarzt</td>
                    <td className="px-6 py-4 text-sm text-gray-900">800€</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Routinechecks, Zahnbehandlung</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Hufschmied / Hufbearbeiter</td>
                    <td className="px-6 py-4 text-sm text-gray-900">600€</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Alle 6-8 Wochen</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Versicherung & Bürokratie</td>
                    <td className="px-6 py-4 text-sm text-gray-900">400€</td>
                    <td className="px-6 py-4 text-sm text-gray-700">OP-Versicherung optional</td>
                  </tr>
                  <tr className="bg-brand/5 font-semibold">
                    <td className="px-6 py-4 text-sm text-gray-900">Gesamt (Budget)</td>
                    <td className="px-6 py-4 text-sm text-brand">~5.300€/Jahr</td>
                    <td className="px-6 py-4 text-sm text-brand">~440€/Monat</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das sind Durchschnittswerte. Ein krankes Pferd oder ein Senior kann 8.000€+ kosten. Plane also mit <strong>mindestens 450€ monatlich</strong>. Weitere Details zu allen Pferde-Kosten findest du in unserem Artikel <Link href={getLocalizedPath("/pferde-ratgeber/was-kostet-ein-pferd")} className="text-brand hover:text-brand-dark underline">Was kostet ein Pferd</Link>.
            </p>
          </section>

          {/* CTA Box 1: KI-Bewertung */}
          <RatgeberHighlightBox
            title="Ist der Preis fair? Finde es in 2 Minuten heraus"
            icon={awardIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Unsicher, ob der Preis für dein Wunsch-Freizeitpferd angemessen ist? PferdeWerts KI-gestützte Analyse vergleicht das Pferd mit aktuellen Marktdaten und liefert dir eine objektive Einschätzung.
            </p>
            <Link
              href={getLocalizedPath("/pferde-preis-berechnen")}
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Pferdewert berechnen
              {trendingUpIcon}
            </Link>
          </RatgeberHighlightBox>

          {/* Section: Rassen */}
          <section id="rassen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die besten Pferderassen für Freizeitreiter
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht alle Rassen sind gleich. Manche sind ideal für Anfänger, andere eher nicht.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Top Anfängerrassen mit Temperamentvergleich
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die beste <strong>Pferderasse für Freizeitreiter</strong> sind:
            </p>

            <div className="space-y-6 mt-6">
              {/* Haflinger */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">1. Haflinger</h4>
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Größe:</strong> 140–150 cm, robust</li>
                  <li><strong>Temperament:</strong> Extrem zuverlässig, sehr geduldig</li>
                  <li><strong>Ideal für:</strong> Anfänger, Kinder, Gewichtsträger</li>
                  <li><strong>Vorteil:</strong> Unerschütterlich ruhig</li>
                  <li><strong>Nachteil:</strong> Weniger Eleganz, höhere Preise</li>
                </ul>
              </div>

              {/* Quarter Horse */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">2. Quarter Horse</h4>
                  <span className="text-yellow-500 text-lg">★★★★☆</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Größe:</strong> 145–160 cm, muskulös</li>
                  <li><strong>Temperament:</strong> Nervenstark, intelligent</li>
                  <li><strong>Ideal für:</strong> Wendige Freizeitaktivitäten</li>
                  <li><strong>Vorteil:</strong> Gehorsam, schnell zu handhaben</li>
                  <li><strong>Nachteil:</strong> Brauchen klare Regeln</li>
                </ul>
              </div>

              {/* Isländer */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">3. Isländer</h4>
                  <span className="text-yellow-500 text-lg">★★★★☆</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Größe:</strong> 125–145 cm, kompakt</li>
                  <li><strong>Temperament:</strong> Vielseitig, eigen, mutig</li>
                  <li><strong>Ideal für:</strong> Geländeausritte, Wanderreiten</li>
                  <li><strong>Vorteil:</strong> Ausdauer, Trittsicherheit</li>
                  <li><strong>Nachteil:</strong> Manchmal eigensinnig</li>
                </ul>
              </div>

              {/* Fjordpferd */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">4. Fjordpferd</h4>
                  <span className="text-yellow-500 text-lg">★★★★☆</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Größe:</strong> 135–150 cm, Kraft</li>
                  <li><strong>Temperament:</strong> Stark, zuverlässig</li>
                  <li><strong>Ideal für:</strong> Schwerere Reiter</li>
                  <li><strong>Vorteil:</strong> Robustheit, geringer Energiebedarf</li>
                  <li><strong>Nachteil:</strong> Langsamere Bewegungen</li>
                </ul>
              </div>

              {/* Friese */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">5. Friese</h4>
                  <span className="text-yellow-500 text-lg">★★★☆☆</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Größe:</strong> 155–170 cm, elegant</li>
                  <li><strong>Temperament:</strong> Sanft, etwas phlegmatisch</li>
                  <li><strong>Ideal für:</strong> Klassisches Reiten, ansprechende Optik</li>
                  <li><strong>Vorteil:</strong> Schönes Aussehen, temperamentvoll</li>
                  <li><strong>Nachteil:</strong> Anfällig für Gesundheit, hohe Unterhaltskosten</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Beliebteste Rassen im deutschen Markt
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nach Marktanalysen (deine-tierwelt.de) sind die häufigsten Freizeitpferde-Rassen:
            </p>
            <ol className="space-y-2 text-lg text-gray-700 list-decimal list-inside">
              <li><strong>Hannoveraner</strong> – Das klassische deutsche Reitpferd (43 Listings)</li>
              <li><strong>Deutsches Reitpferd</strong> – Vielseitig und zuverlässig (32 Listings)</li>
              <li><strong>Quarter Horse</strong> – Für Western & Trail (76 Listings)</li>
              <li><strong>Haflinger</strong> – Der Klassiker für Anfänger (Große Nachfrage)</li>
            </ol>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>Sportlich ambitioniert?</strong> Wenn du neben Freizeitreiten auch sportliche Ambitionen hast, findest du in unseren spezialisierten Ratgebern zum <Link href={getLocalizedPath("/pferde-ratgeber/springpferd-kaufen")} className="text-brand hover:text-brand-dark underline">Springpferd kaufen</Link> und <Link href={getLocalizedPath("/pferde-ratgeber/dressurpferd-kaufen")} className="text-brand hover:text-brand-dark underline">Dressurpferd kaufen</Link> detaillierte Informationen zu Auswahlkriterien und Preisen.
            </p>
          </section>

          {/* Section: Anfänger */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Anfängerpferde: Welche Rassen und welches Alter?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht jedes Freizeitpferd ist ein <strong>Anfängerpferd</strong>. Hier sind die Unterschiede.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Rasse-Matching für Anfänger
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Für dein erstes <strong>Anfängerpferd</strong> solltest du diese 7 Rassen bevorzugen:
            </p>
            <ol className="space-y-2 text-lg text-gray-700 list-decimal list-inside">
              <li>Haflinger – Der sichere Einstieg</li>
              <li>Quarter Horse – Der intelligente Partner</li>
              <li>Isländer – Der Wanderer</li>
              <li>Fjordpferd – Der Kraftprotz</li>
              <li>Hannoveraner – Der Klassiker</li>
              <li>Deutsches Reitpferd – Der Allrounder</li>
              <li>Friese – Der Elegante (mit Vorbehalt)</li>
            </ol>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Das Wichtigste: Auch die beste Rasse kann ein schlechtes Temperament haben. Teste das Pferd immer persönlich, bevor du Geld zahlst. Ein nervöses Haflinger-Mix ist schlechter als ein ruhiger Quarter Horse.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Altersempfehlung: Mit welchem Alter solltest du kaufen?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hier gibt es klare Regeln:
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-3">Optimal für Anfänger: 8–15 Jahre</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Körperlich vollständig entwickelt</li>
                <li>✓ Genug Trainingserfahrung</li>
                <li>✓ Noch 10–15 Jahre Lebensdauer</li>
                <li>✓ Temperament ist etabliert, keine Überraschungen</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-3">Junge Pferde (unter 7 Jahren): Nur für erfahrene Reiter</h4>
              <ul className="space-y-2 text-gray-700">
                <li>⚠ Körper noch wachsend</li>
                <li>⚠ Temperament unvorhersehbar</li>
                <li>⚠ Brauchen erfahrene Anleitung</li>
                <li>⚠ Risiko größer</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-3">Senior-Pferde (über 20 Jahren): Möglich, aber risikobehaftet</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Oft günstig</li>
                <li>✗ Gesundheitliche Probleme häufig</li>
                <li>✗ Veterinärkosten höher</li>
                <li>✗ Lebensdauer begrenzt (3–5 Jahre realistisch)</li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Faustregel:</strong> Kaufe ein Pferd, das 2–3 Jahre jünger ist als dein Retirement-Plan. Wenn du mit 60 Jahren reiten willst, kaufe mit 65 nicht erst ein 10-jähriges Pferd.
            </p>
          </section>

          {/* Section: Kaufprozess */}
          <section id="kaufprozess" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Der Kaufprozess: Private Verkäufer vs. Händler
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Zwei Wege führen zu deinem Freizeitpferd. Beide haben Vor- und Nachteile.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Privater Pferdekauf – Vor- und Nachteile
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Für dich günstig, für deinen Schutz riskant.</strong>
            </p>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Vorteil</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nachteil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">20–30% niedrigere Preise</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Keine Gewährleistung</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Direkte Info über Pferdegeschichte</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Weniger Rechtssicherheit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Oft emotional bessere Übergabe</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Gesundheitsprobleme möglich</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Verhandlung möglich</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Du zahlst die Ankaufsuntersuchung</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Marktdaten:</strong> Auf kleinanzeigen.de sind ca. 485 private Angebote vs. 106 gewerbliche Angebote für Freizeitpferde.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Tipp für privaten Kauf:</strong> Lass IMMER eine Ankaufsuntersuchung durch deinen Tierarzt machen, bevor du unterschreibst. Das kostet 400–600€, aber spart dir später 5.000€+ bei Gesundheitsproblemen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Pferdehändler und professionelle Verkäufer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Teurer, aber rechtlich sicherer.</strong>
            </p>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Vorteil</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nachteil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">1–2 Jahre Gewährleistung Standard</td>
                    <td className="px-6 py-4 text-sm text-gray-700">20–30% höhere Preise</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Professionelle Beratung</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Gewinnspanne einkalkuliert</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Oft Rückgaberecht</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Weniger Transparenz zu Vorgeschichte</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Etablierte Plattformen (ehorses)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Höhere Emotionalität oft fehlt</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Professionelle Plattformen:</strong> ehorses.de und pferde.de haben Millionen Transaktionen und etablierte Käuferschutzrichtlinien.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Mein Rat:</strong> Für dein erstes Freizeitpferd empfehle ich einen seriösen Händler oder eine etablierte Plattform. Die 20% mehr zahlst du mit Sicherheit zurück.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Einen detaillierten Überblick über Online-Plattformen, traditionelle Pferdemärkte und Veranstaltungskalender findest du in unserem <Link href={getLocalizedPath("/pferde-ratgeber/pferdemarkt")} className="text-brand hover:text-brand-dark underline">Pferdemarkt-Guide</Link>.
            </p>
          </section>

          {/* Section: Gesundheit */}
          <section id="gesundheit" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gesundheitscheck und tierärztliche Ankaufsuntersuchung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist nicht optional. Das ist Pflicht.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Schritt-für-Schritt Gesundheitsprüfung vor dem Kauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor du ein Freizeitpferd kaufst, musst du folgende <strong>Gesundheitsprüfung</strong> durchführen:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">1. Allgemeiner Zustand (10 Minuten)</h4>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Gewicht & Körperkondition: Ist das Pferd zu dick/dünn?</li>
                  <li>Fell & Haut: Glänzt das Fell? Keine Parasiten?</li>
                  <li>Augen & Ohren: Klare Augen, reaktive Ohren?</li>
                  <li>Zahnzustand: Fress- oder Verhaltensprobleme?</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">2. Bewegungsablauf (20 Minuten)</h4>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Trittsicherheit in Schritt, Trab, Galopp</li>
                  <li>Lahmheit oder Steifheit?</li>
                  <li>Asymmetrien?</li>
                  <li>Reaktion auf Sattel & Zügel</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-3">3. Professionelle tierärztliche Untersuchung (45–60 Min.) – ESSENTIELL</h4>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Allgemeine Untersuchung (Puls, Temperatur, Atmung)</li>
                  <li>Bewegungsprüfung unter Last</li>
                  <li>Lungen- & Herzbefund (Fitness-Test)</li>
                  <li>Zahnkontrolle, Augenuntersuchung</li>
                  <li>Optional: Röntgenaufnahmen problematischer Gelenke</li>
                  <li>Bluttest auf Krankheiten</li>
                </ul>
                <p className="mt-4 font-semibold text-brand">Kosten: 400–800€ je nach Umfang. Es lohnt sich.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Weitere Details zur Ankaufsuntersuchung findest du in unserem umfassenden <Link href={getLocalizedPath("/pferde-ratgeber/aku-pferd")} className="text-brand hover:text-brand-dark underline">AKU-Ratgeber</Link>.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Rote Flaggen beim Freizeitpferd
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn du eines dieser Zeichen siehst, finger weg:
            </p>
            <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
              <li><strong>Chronischer Husten oder Nasenausfluss</strong> = Atemwegserkrankung (teuer)</li>
              <li><strong>Lahmheit, auch leicht</strong> = Gelenkprobleme (degenerativ)</li>
              <li><strong>Augentrübung oder Narben</strong> = Blindheit möglich</li>
              <li><strong>Extreme Abmagerung</strong> = Zahnprobleme oder Innereien</li>
              <li><strong>Verhaltensauffälligkeiten</strong> (Beißen, Treten) = Langfristig gefährlich</li>
              <li><strong>Unklare Krankengeschichte</strong> = Versteckt der Verkäufer etwas?</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Ein Gesundheitscheck dauert 1–2 Stunden. Es ist die beste Investition, die du machen kannst.
            </p>
          </section>

          {/* CTA Box 2: Sicherheit */}
          <RatgeberHighlightBox
            title="Rechtliche Absicherung beim Pferdekauf"
            icon={shieldIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Ein professioneller Kaufvertrag schützt dich vor bösen Überraschungen. Erfahre, welche 7 Punkte dein Pferdekaufvertrag enthalten muss.
            </p>
            <Link
              href={getLocalizedPath("/pferde-ratgeber/pferdekaufvertrag")}
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Zum Kaufvertrag-Ratgeber
              {trendingUpIcon}
            </Link>
          </RatgeberHighlightBox>

          {/* Section: Rechtliches */}
          <section id="rechtliches" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche Aspekte und Kaufvertrag
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein schriftlicher Vertrag schützt dich. Ein fehlender Vertrag kostet dich später.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was muss in einem Kaufvertrag stehen?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dein <strong>Pferd Kaufvertrag</strong> braucht diese essentiellen Punkte:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">1. Identifikation des Pferdes</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Name, Alter, Rasse, Farbe</li>
                  <li>Abzeichen & besondere Merkmale</li>
                  <li>Pferdepass oder Abstammungsdokumente (falls vorhanden)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">2. Finanzielle Bedingungen</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Kaufpreis in Euro</li>
                  <li>Zahlungsweise & Fälligkeit</li>
                  <li>Anzahlung (falls relevant)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">3. Zustandsbeschreibung</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Gesundheitszustand (basierend auf Ankaufsuntersuchung)</li>
                  <li>Ausbildungsstand</li>
                  <li>Temperament & Verhaltensbesonderheiten</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">4. Gewährleistung & Rückgaberecht</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Zeitraum (normalerweise 6 Monate)</li>
                  <li>Was ist abgedeckt, was nicht</li>
                  <li>Rückkehr Prozedur</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">5. Haftung nach Übergabe</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Wann wechselt die Verantwortung?</li>
                  <li>Kosten während Transport?</li>
                  <li>Versicherungsschutz?</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">6. Unterschriften</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Beide Parteien</li>
                  <li>Datum & Ort</li>
                  <li>Idealerweise vor Zeugen oder notariell</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gewährleistung und Rückgaberecht
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hier lauern rechtliche Fallstricke:
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Private Verkäufer:</strong> Nach deutschem Recht (BGB) haftest du normalerweise 6 Monate für &quot;Mängel zum Kaufzeitpunkt&quot;. Ein privater Verkäufer kann diese Haftung jedoch stark einschränken (vertraglich). Daher: Kaufvertrag IMMER schriftlich!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Professionelle Händler:</strong> Haben klare Gewährleistungspflichten (meist 1–2 Jahre). Das ist dein Schutzvorteil.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Tipp:</strong> Lass die Ankaufsuntersuchung im Kaufvertrag dokumentieren. Wenn der Tierarzt nichts finden konnte und das Pferd später Probleme hat, schützt das dich rechtlich.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Detaillierte Informationen und kostenlose Vertragsvorlagen findest du in unserem <Link href={getLocalizedPath("/pferde-ratgeber/pferdekaufvertrag")} className="text-brand hover:text-brand-dark underline">Pferdekaufvertrag-Ratgeber</Link>.
            </p>
          </section>

          {/* Section: Action Plan */}
          <section id="action-plan" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Dein Action Plan: Die nächsten Schritte
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du weißt jetzt, worauf du achten musst. Hier ist dein Plan:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-white border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-2">Schritt 1 (2 Wochen): Budget definieren</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Kaufpreis: 6.000–15.000€?</li>
                  <li>Jährliche Kosten: 450–600€/Monat realistisch?</li>
                  <li>Bankfinanzierung klären</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-2">Schritt 2 (2 Wochen): Rasse & Anforderungen klären</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Haflinger oder Quarter Horse für dich?</li>
                  <li>Alter 8–15 Jahre zielgerichtet suchen</li>
                  <li>Temperament-Matching ernst nehmen</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-2">Schritt 3 (2–4 Wochen): Markt durchsuchen</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>ehorses.de, pferde.de, kleinanzeigen.de</li>
                  <li>Min. 10–15 Kandidaten ansehen</li>
                  <li>Mit Verkäufern kommunizieren, Referenzen erfragen</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-2">Schritt 4 (1 Woche nach Fund): Ankaufsuntersuchung</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Deinen Tierarzt buchen</li>
                  <li>Untersuchung vor Kaufvertrag</li>
                  <li>Ergebnisse analysieren, ggf. verhandeln</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-brand p-6">
                <h4 className="font-bold text-gray-900 mb-2">Schritt 5 (vor Unterschrift): Vertrag & Finanzierung</h4>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>Kaufvertrag von Anwalt checken lassen (100–200€)</li>
                  <li>Zahlung sichern (nicht bar überweisen)</li>
                  <li>Transport & Versicherung klären</li>
                </ul>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Der Prozess dauert 4–8 Wochen. Das ist normal. Besser, du nimmst dir Zeit, als dass du ein schlechtes Pferd kaufst.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Deine Checkliste zum Mitnehmen
            </h3>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
              <h4 className="font-bold text-gray-900 mb-4">Vor der Besichtigung:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Budget klar (Kauf + Jahreskosten)?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Rasse & Alter definiert?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Verkäufer seriös (Referenzen, Erfahrung)?</span>
                </li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-4 mt-6">Bei der Besichtigung:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Temperament persönlich getestet (Reiten, nicht nur ansehen)?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Gang & Lahmheit check durchgeführt?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Zahnzustand, Augen, Ohren kontrolliert?</span>
                </li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-4 mt-6">Vor dem Kaufvertrag:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Tierärztliche Ankaufsuntersuchung durchgeführt?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Kaufvertrag schriftlich & detailliert?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Gewährleistung & Rückgaberecht klar?</span>
                </li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-4 mt-6">Nach dem Kauf:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Transport sicher & versichert?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Versicherung (OP-Versicherung empfohlen)?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">☐</span>
                  <span>Erstes Treffen mit deinem neuen Tierarzt vor Ort?</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Fazit */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit: Dein Freizeitpferd wartet auf dich
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein gutes <strong>Freizeitpferd kaufen</strong> ist möglich – wenn du methodisch vorgehst. Die Investition in Zeit zahlt sich aus.
            </p>

            <div className="bg-brand/5 border-l-4 border-brand p-6 my-6">
              <h3 className="font-bold text-gray-900 mb-4">Die wichtigsten Lektionen:</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li><strong>Budget realistisch:</strong> 6.000–25.000€ Kauf + 5.000€/Jahr Unterhalt</li>
                <li><strong>Rasse passend:</strong> Haflinger & Quarter Horse sind sichere Anfängerwahl</li>
                <li><strong>Alter optimal:</strong> 8–15 Jahre = zuverlässig & erfahren</li>
                <li><strong>Ankaufsuntersuchung obligatorisch:</strong> 400–600€ sparen dir 5.000€+</li>
                <li><strong>Vertrag schriftlich:</strong> Rechtliche Sicherheit ist nicht verhandelbar</li>
              </ol>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Du hast alle Informationen. Jetzt geht&apos;s ans Umsetzen. Starte mit deiner Recherche bei ehorses und kleinanzeigen. Mach eine Liste. Teste mindestens 5 Pferde persönlich. Und vergiss die Ankaufsuntersuchung nicht.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dein perfektes Freizeitpferd ist da draußen. Gib dir selbst zwei bis drei Monate Zeit, es zu finden. Es lohnt sich.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-32 lg:scroll-mt-40">
          <FAQ
            faqs={faqItems}
            sectionTitle="Häufig gestellte Fragen"
            sectionSubtitle="Die wichtigsten Antworten zum Freizeitpferdkauf – damit du bestens vorbereitet bist."
            withSchema={false}
          />
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
          title="Ist dein Wunschpferd wirklich fair bepreist?"
          description="Nutze PferdeWert und lass dein Traumpferd vor dem Kauf bewerten – mit KI-gestützter Analyse und Marktdaten-Vergleich. In nur 2 Minuten zur objektiven Einschätzung."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
