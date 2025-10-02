import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, BookOpen, Calculator, TrendingUp, Shield, FileCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import ContentSection from '@/components/ContentSection';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import RatgeberInfoTiles from '@/components/ratgeber/RatgeberInfoTiles';
import RatgeberRegionGrid from '@/components/ratgeber/RatgeberRegionGrid';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import CTAButton from '@/components/CTAButton';
import { PRICING_FORMATTED } from '@/lib/pricing';
import { getRatgeberBySlug } from '@/lib/ratgeber-registry';

const PferdVerkaufen: NextPage = () => {
  const heroMetaItems = [
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: "Marktpreis-Analyse"
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Rechtssichere Abwicklung"
    },
    {
      icon: <FileCheck className="h-4 w-4" />,
      label: "Verkaufscheckliste"
    }
  ]

  const sections = [
    { id: 'wert-ermitteln', title: 'Pferdewert ermitteln' },
    { id: 'emotionale-faktoren', title: 'Emotionale Faktoren' },
    { id: 'plattform-vergleich', title: 'Verkaufsplattformen im Vergleich' },
    { id: 'preisfaktoren', title: 'Preisfaktoren im Detail' },
    { id: 'fehler', title: 'Häufige Fehler vermeiden' },
    { id: 'schritt-anleitung', title: 'Schritt-für-Schritt-Anleitung' },
    { id: 'ki-bewertung', title: 'KI-gestützte Bewertung' },
    { id: 'preisverhandlung', title: 'Preisverhandlung' },
    { id: 'rechtliche-aspekte', title: 'Rechtliche Aspekte' },
    { id: 'faq', title: 'Häufige Fragen' }
  ];

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

  const preisbeispieleTiles = [
    { title: 'Freizeitpferd (gut)', value: '2.500€ – 6.000€', description: 'Gut ausgebildete Freizeitpferde mit solider Grundausbildung' },
    { title: 'Turnierpferd L-Niveau', value: '8.000€ – 20.000€', description: 'Turniererprobte Pferde mit L-Platzierungen' },
    { title: 'Jungpferd (3-4 Jahre)', value: '1.500€ – 5.000€', description: 'Junge Pferde am Beginn der Ausbildung' },
    { title: 'Rentner (20+ Jahre)', value: '500€ – 2.000€', description: 'Erfahrene Pferde im fortgeschrittenen Alter' },
    { title: 'Zuchtpferd m. Erfolg', value: '10.000€ – 50.000€+', description: 'Erfolgreiche Zuchtstuten und -hengste' },
    { title: 'Spezialpferd (Western)', value: '5.000€ – 15.000€', description: 'Spezialisierte Western-Reitpferde' }
  ];

  const regionalRegions = [
    {
      title: 'Bayern',
      description: 'Premium-Preise durch hohe Kaufkraft. Warmblut-Markt mit 10-15% Aufschlag. München, Nürnberg, Regensburg als Zentren.'
    },
    {
      title: 'Nordrhein-Westfalen',
      description: 'Größter deutscher Pferdemarkt. Münsterland und Warendorf als Hochburgen. Moderate Preise durch große Konkurrenz.'
    },
    {
      title: 'Niedersachsen',
      description: 'Hannoveraner-Heimat. Turnierpferde erzielen Spitzenpreise. Verden als bedeutendes Handelszentrum.'
    }
  ];

  const relatedArticles = [
    {
      href: '/pferde-ratgeber/pferdewert-ermitteln',
      image: '/images/ratgeber/pferd-verkaufen/hero.webp',
      title: 'Pferdewert ermitteln: 5 Methoden im Vergleich',
      badge: 'Bewertung',
      readTime: '8 min',
      description: 'Wie ermitteln Sie den fairen Marktwert eines Pferdes? Vergleich klassischer Methoden vs. moderne AI-Bewertung.'
    },
    {
      href: '/pferde-ratgeber/pferd-kaufen',
      image: '/images/ratgeber/pferd-kaufen/hero.webp',
      title: 'Pferd kaufen: Der ultimative Ratgeber für 2025',
      badge: 'Kaufberatung',
      readTime: '11 min',
      description: 'Umfassender Ratgeber zum Pferdekauf mit Preisübersicht, Checkliste, Anfänger-Tipps und AI-Bewertung für faire Preise.'
    },
    {
      href: '/pferde-ratgeber/aku-pferd',
      image: '/images/ratgeber/aku-pferd/hero.webp',
      title: 'AKU beim Pferd: Kosten, Ablauf & Klassen 2025',
      badge: 'Kaufsicherheit',
      readTime: '12 min',
      description: 'Alles zur Ankaufsuntersuchung: Welche AKU-Klasse brauchen Sie? Was wird untersucht? Kompletter Ratgeber für Pferdekäufer.'
    }
  ];

  const faqItems = [
    {
      question: 'Wie viel ist mein Pferd wert?',
      answer: `Der Wert Ihres Pferdes hängt von vielen Faktoren ab: Rasse, Alter, Ausbildungsstand, Turniererfolge, Gesundheitszustand und aktuelle Marktnachfrage. Freizeitpferde bewegen sich zwischen 2.500€ und 6.000€, Turnierpferde mit L-Niveau zwischen 8.000€ und 20.000€. Eine präzise Bewertung erhalten Sie mit der KI-gestützten Analyse von PferdeWert.de in nur 2 Minuten für ${PRICING_FORMATTED.current}.`
    },
    {
      question: 'Wo verkaufe ich mein Pferd am besten?',
      answer: 'Die beste Verkaufsplattform hängt von Ihrem Pferd und Ihrer Zielgruppe ab. ehorses.de bietet mit über 19.000 Inseraten die größte Reichweite und ist ideal für hochwertige Pferde. pferde.de hat eine aktive Community und ist gut für Freizeitpferde. kleinanzeigen.de eignet sich für regionale Verkäufe. Eine Kombination mehrerer Plattformen maximiert Ihre Chancen.'
    },
    {
      question: 'Soll ich mein Pferd mit oder ohne Ankaufsuntersuchung verkaufen?',
      answer: 'Ein aktueller AKU-Befund (nicht älter als 3 Monate) erhöht die Verkaufschancen erheblich und rechtfertigt höhere Preise. Käufer schätzen die Transparenz und fühlen sich sicherer. Die Kosten von 400€ bis 600€ für eine große AKU amortisieren sich durch schnelleren Verkauf und bessere Preisverhandlungen. Sie können den Verkauf auch ohne AKU anbieten, sollten dann aber bereit sein, dem Käufer eine unabhängige AKU auf dessen Kosten zu ermöglichen.'
    },
    {
      question: 'Wie lange dauert es, ein Pferd zu verkaufen?',
      answer: 'Die Verkaufsdauer variiert stark: Freizeitpferde mit fairem Preis verkaufen sich durchschnittlich in 6-12 Wochen. Hochwertige Turnierpferde können 3-6 Monate benötigen, da die Zielgruppe kleiner ist. Überteuerte oder problembehaftete Pferde bleiben oft monatelang unverkauft. Ein realistischer Preis (ermittelbar mit PferdeWert.de) beschleunigt den Verkauf erheblich.'
    },
    {
      question: 'Wie verhandle ich den Preis richtig?',
      answer: 'Setzen Sie Ihren Verkaufspreis 10-15% über Ihrem Minimalpreis an, um Verhandlungsspielraum zu haben. Bleiben Sie sachlich und begründen Sie Ihren Preis mit objektiven Faktoren (Ausbildung, Gesundheit, Turniererfolge). Nutzen Sie eine professionelle Bewertung von PferdeWert.de als Verhandlungsgrundlage – das schafft Vertrauen und signalisiert Seriosität. Vermeiden Sie emotionale Argumente wie "Ich habe so viel investiert" – Käufer interessieren sich nur für den aktuellen Marktwert.'
    },
    {
      question: 'Brauche ich einen Kaufvertrag?',
      answer: 'Ja, unbedingt! Ein schriftlicher Kaufvertrag schützt beide Seiten rechtlich. Er sollte enthalten: vollständige Angaben zu Käufer und Verkäufer, detaillierte Pferdebeschreibung (Name, Rasse, Alter, Chipnummer), Kaufpreis und Zahlungsmodalitäten, Aussagen zum Gesundheitszustand, Regelung zur Gewährleistung (bei Privatkauf meist ausgeschlossen) und Unterschriften beider Parteien. Verwenden Sie etablierte Vertragsvorlagen, zum Beispiel vom FN (Deutsche Reiterliche Vereinigung).'
    },
    {
      question: 'Was passiert, wenn der Käufer nach dem Kauf Mängel reklamiert?',
      answer: 'Bei Privatkäufen gilt in der Regel "gekauft wie gesehen" und die Gewährleistung wird ausgeschlossen. Bei gewerblichen Verkäufern (Händlern) greift die gesetzliche Gewährleistung, die oft auf 12 Monate verkürzt wird. Wichtig: Arglistig verschwiegene Mängel (z.B. bekannte Krankheiten, die Sie nicht offengelegt haben) können auch bei Privatverkauf zu Schadenersatzforderungen führen. Dokumentieren Sie daher den Gesundheitszustand ehrlich und transparent.'
    },
    {
      question: 'Lohnt sich eine professionelle Pferdebewertung?',
      answer: `Absolut! Eine professionelle Bewertung kostet ${PRICING_FORMATTED.current} bei PferdeWert.de und kann Ihnen tausende Euro Mehrerlös bringen. Sie vermeiden Unterbewertung, haben ein objektives Verkaufsargument für Preisverhandlungen, signalisieren Seriosität gegenüber Käufern und verkaufen schneller durch realistischen Preis. Die Investition von ${PRICING_FORMATTED.current} amortisiert sich bereits, wenn Sie dadurch nur 1% mehr Verkaufspreis erzielen – das sind bei einem 5.000€ Pferd bereits 50€.`
    }
  ];

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pferd verkaufen zum optimalen Preis – Der ultimative Ratgeber 2025',
    description: `Pferd verkaufen zum optimalen Preis: KI-gestützte Bewertung in 2 Min (${PRICING_FORMATTED.current}) verhindert 3.000-9.000€ Verlust. Plattformvergleich, Preisfindung, rechtliche Tipps.`,
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
    keywords: 'pferd verkaufen, pferdewert ermitteln, pferd verkaufen plattformen, pferd verkaufen preis, ki pferdebewertung'
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

  const jsonLdFAQ = {
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
  };

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Pferd verkaufen: Schritt-für-Schritt-Anleitung',
    description: 'Komplette Anleitung zum erfolgreichen Pferdeverkauf – von der Bewertung bis zum Kaufvertrag',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Pferdewert ermitteln',
        text: 'Ermitteln Sie den realistischen Marktwert Ihres Pferdes. Nutzen Sie professionelle Bewertungstools wie PferdeWert.de für eine objektive Einschätzung.',
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Inserat erstellen',
        text: 'Erstellen Sie ein professionelles Verkaufsinserat mit hochwertigen Fotos, detaillierter Beschreibung und ehrlichen Angaben zu Ausbildung, Gesundheit und Charakter.',
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Verkaufsplattform wählen',
        text: 'Veröffentlichen Sie Ihr Inserat auf den passenden Plattformen: ehorses.de für hochwertige Pferde, pferde.de für Community-Reichweite, kleinanzeigen.de für regionale Käufer.',
        position: 3
      },
      {
        '@type': 'HowToStep',
        name: 'Interessenten kontaktieren',
        text: 'Beantworten Sie Anfragen professionell und zeitnah. Filtern Sie ernsthafte Käufer durch gezielte Fragen zu Erfahrung und Verwendungszweck.',
        position: 4
      },
      {
        '@type': 'HowToStep',
        name: 'Besichtigungstermine organisieren',
        text: 'Vereinbaren Sie Besichtigungen in ruhiger Umgebung. Zeigen Sie das Pferd in verschiedenen Situationen (Stall, Führen, Reiten).',
        position: 5
      },
      {
        '@type': 'HowToStep',
        name: 'Preisverhandlungen führen',
        text: 'Verhandeln Sie sachlich und begründen Sie Ihren Preis mit objektiven Kriterien. Nutzen Sie professionelle Bewertungen als Verhandlungsgrundlage.',
        position: 6
      },
      {
        '@type': 'HowToStep',
        name: 'Ankaufsuntersuchung ermöglichen',
        text: 'Bieten Sie dem Käufer eine unabhängige AKU an. Dies schafft Vertrauen und beschleunigt die Kaufentscheidung.',
        position: 7
      },
      {
        '@type': 'HowToStep',
        name: 'Kaufvertrag abschließen',
        text: 'Nutzen Sie einen schriftlichen Kaufvertrag mit allen wichtigen Angaben: Pferdedaten, Kaufpreis, Zahlungsmodalitäten, Gewährleistungsausschluss.',
        position: 8
      },
      {
        '@type': 'HowToStep',
        name: 'Übergabe durchführen',
        text: 'Organisieren Sie die Übergabe mit allen Papieren (Equidenpass, Eigentumsurkunde). Klären Sie Zahlungsmodalitäten und Transportdetails.',
        position: 9
      }
    ]
  };

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Pferd verkaufen 2025: Ultimativer Ratgeber für optimalen Preis</title>
        <meta
          name="description"
          content={`Pferd verkaufen zum optimalen Preis: KI-gestützte Bewertung in 2 Min (${PRICING_FORMATTED.current}) verhindert 3.000-9.000€ Verlust ✓ Plattformvergleich ✓ Preisfindung ✓ Rechtliche Tipps`}
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/pferd-verkaufen" />
        <meta name="keywords" content="pferd verkaufen, pferd zu verkaufen, wie viel ist mein pferd wert, pferdewert ermitteln, pferd verkaufen preis, pferd verkaufen plattformen, ki pferdebewertung, pferd online verkaufen, pferdebewertung kostenlos" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Pferd verkaufen 2025: Ultimativer Ratgeber für optimalen Preis" />
        <meta property="og:description" content="Verkaufen Sie Ihr Pferd zum besten Preis: Professionelle KI-Bewertung, Plattformvergleich und rechtliche Tipps für erfolgreichen Verkauf." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/pferd-verkaufen" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/ratgeber/pferd-verkaufen/hero.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd verkaufen 2025: Optimaler Preis & schneller Verkauf" />
        <meta name="twitter:description" content={`KI-gestützte Pferdebewertung in 2 Min (${PRICING_FORMATTED.current}) ✓ Plattformvergleich ✓ Preistipps ✓ Rechtliche Sicherheit`} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </Head>

      <div className="bg-gradient-to-b from-amber-50 to-white">
        <RatgeberHero
          badgeLabel="Verkaufsratgeber"
          badgeIcon={<BookOpen className="h-4 w-4" />}
          title="Pferd verkaufen zum optimalen Preis – Der ultimative Ratgeber 2025"
          subtitle="Sie möchten Ihr Pferd verkaufen und einen fairen Preis erzielen? Der Pferdeverkauf ist emotional und komplex zugleich. Dieser Ratgeber führt Sie Schritt für Schritt durch den gesamten Prozess: von der professionellen Bewertung über die Plattformwahl bis zur rechtssicheren Übergabe. Vermeiden Sie die häufigsten Fehler, die Sie tausende Euro kosten können."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Jetzt Verkaufspreis berechnen",
            icon: <Calculator className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            onClick: scrollToContent,
            icon: <ChevronDown className="h-5 w-5" />
          }}
        />
        <RatgeberHeroImage
          src={getRatgeberBySlug('pferd-verkaufen')?.image || '/images/ratgeber/pferd-verkaufen/hero.webp'}
          alt="Erfolgreicher Pferdeverkauf mit zufriedenem Verkäufer und neuem Besitzer"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="content-start">
        <RatgeberTableOfContents
          sections={sections}
          onNavigate={handleNavigate}
        />

        {/* Pferdewert ermitteln */}
        <ContentSection id="wert-ermitteln" title="Schritt 1: Den realistischen Pferdewert ermitteln" icon="💰">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Bewertung Ihres Pferdes ist der wichtigste erste Schritt beim Verkauf. Ein realistischer Preis
            entscheidet über Verkaufserfolg oder monatelanges Warten. Die größte Herausforderung: Emotionale Bindung
            führt oft zu überhöhten Preisvorstellungen.
          </p>

          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg mb-8">
            <h4 className="font-semibold text-brand mb-2">Das Problem: Private Verkäufer überschätzen systematisch</h4>
            <p className="text-brand/90 mb-3">
              Studien zeigen: Private Pferdebesitzer überschätzen den Wert ihres Pferdes im Durchschnitt um
              <strong> 25-35%</strong>. Die emotionale Bindung, investierte Zeit und Geld sowie subjektive
              Wahrnehmung verzerren die Bewertung.
            </p>
            <p className="text-brand/90">
              <strong>Konsequenz:</strong> Überteuerter Verkaufspreis → keine Käuferanfragen → monatelange
              Wartezeit → Preisreduktion → Signalwirkung &quot;etwas stimmt nicht&quot; → noch schwierigerer Verkauf
            </p>
          </div>

          <h3 className="text-2xl font-serif text-brand mb-4">Marktpreise 2025: Was ist Ihr Pferd wirklich wert?</h3>
          <p className="text-brand/90 mb-6">
            Die Preisspanne im Pferdemarkt ist enorm – von 500€ für Rentner-Pferde bis über 50.000€ für
            Spitzensportpferde. Eine grobe Orientierung:
          </p>

          <RatgeberInfoTiles headline="Preisbeispiele nach Pferdetyp" tiles={preisbeispieleTiles} />

          <div className="mt-8 space-y-6">
            <RatgeberHighlightBox title="Die 5 wichtigsten Preisfaktoren" icon="📊">
              <ol className="space-y-4 text-brand/90">
                <li>
                  <strong className="text-brand">1. Ausbildungsstand (Einfluss: 40%):</strong> Jede
                  Ausbildungsstufe erhöht den Wert merklich. Ein Pferd mit A-Niveau ist 2.000-3.000€ mehr wert
                  als ein vergleichbares ohne Turniererfahrung. L-Niveau: +4.000-7.000€, M-Niveau: +8.000-15.000€
                </li>
                <li>
                  <strong className="text-brand">2. Gesundheitszustand (Einfluss: 30%):</strong> Chronische
                  Erkrankungen (Hufrehe, Arthrose, Atemwegsprobleme) senken den Wert um 30-60%. Eine aktuelle
                  AKU ohne Befund steigert Verkaufschancen und Preis um 10-20%.
                </li>
                <li>
                  <strong className="text-brand">3. Alter (Einfluss: 15%):</strong> Pferde zwischen 6 und 12 Jahren
                  erzielen Höchstpreise. Ab 15 Jahren sinkt der Wert merklich, ab 20 Jahren deutlich (Rentner-Status).
                </li>
                <li>
                  <strong className="text-brand">4. Rasse und Abstammung (Einfluss: 10%):</strong> Warmblüter aus
                  anerkannten Zuchtlinien (Hannoveraner, Oldenburger) rechtfertigen 1.000-3.000€ Aufschlag.
                </li>
                <li>
                  <strong className="text-brand">5. Charakter und Eignung (Einfluss: 5%):</strong> Anfängertaugliche,
                  gelassene Pferde sind gefragter und erzielen 10-15% höhere Preise als schwierige Charaktere.
                </li>
              </ol>
            </RatgeberHighlightBox>

            <div className="p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <h4 className="text-2xl font-serif text-brand mb-4">Die Lösung: KI-gestützte Pferdebewertung in 2 Minuten</h4>
              <p className="text-brand/90 mb-4 leading-relaxed">
                PferdeWert.de nutzt modernste Künstliche Intelligenz, um den fairen Marktwert Ihres Pferdes in
                nur 2 Minuten zu berechnen. Unser duales KI-System (GPT-4 + Claude) wurde von erfahrenen Reitern
                entwickelt und berücksichtigt über 50 Bewertungskriterien sowie aktuelle Marktdaten.
              </p>
              <div className="mb-6">
                <p className="font-semibold text-brand mb-3">Die Vorteile für Sie als Verkäufer:</p>
                <ul className="space-y-2 text-brand/90">
                  <li>✓ <strong>Objektive Bewertung:</strong> KI ohne emotionale Verzerrung</li>
                  <li>✓ <strong>Realistische Preisfindung:</strong> Vermeiden Sie Über- oder Unterbewertung</li>
                  <li>✓ <strong>Verkaufsargument:</strong> Professionelle Bewertung als Verhandlungsgrundlage</li>
                  <li>✓ <strong>Schneller Verkauf:</strong> Fairer Preis zieht seriöse Käufer an</li>
                  <li>✓ <strong>Aktualität:</strong> Berücksichtigt aktuelle Markttrends 2025</li>
                  <li>✓ <strong>Risikofrei:</strong> 30 Tage Geld-zurück-Garantie</li>
                </ul>
              </div>
              <CTAButton type="primary" href="/pferde-preis-berechnen" text={`Jetzt Verkaufspreis berechnen – nur ${PRICING_FORMATTED.current}`} />
              <p className="text-sm text-brand/70 mt-3 italic">
                Von Reitern entwickelt. Über 10.000 erfolgreiche Bewertungen.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Emotionale Faktoren */}
        <ContentSection id="emotionale-faktoren" title="Die emotionale Seite: Abschied nehmen vom Partner Pferd" icon="💔">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der Verkauf eines Pferdes ist nicht nur eine Transaktion – es ist oft ein schmerzhafter Abschied
            von einem langjährigen Partner. Diese emotionale Dimension wird häufig unterschätzt.
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Typische emotionale Herausforderungen" icon="😢">
              <ul className="space-y-3 text-brand/90">
                <li>
                  <strong className="text-brand">Schuldgefühle:</strong> &quot;Verrate ich mein Pferd?&quot; ist eine häufige
                  Frage. Wichtig: Ein Verkauf kann auch im besten Interesse des Pferdes sein (bessere Haltung,
                  passenderer Reiter, mehr Aufmerksamkeit).
                </li>
                <li>
                  <strong className="text-brand">Trauer und Verlustangst:</strong> Nach Jahren gemeinsamer Erlebnisse
                  ist Trauer beim Abschied normal und legitim.
                </li>
                <li>
                  <strong className="text-brand">Angst vor falscher Entscheidung:</strong> &quot;Was, wenn ich es bereue?&quot;
                  Definieren Sie klar, warum Sie verkaufen, um Klarheit zu gewinnen.
                </li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="So gehen Sie professionell mit Emotionen um" icon="✅">
              <ol className="space-y-3 list-decimal list-inside text-brand/90">
                <li>
                  <strong className="text-brand">Verkaufsgrund klar definieren:</strong> Schreiben Sie auf,
                  warum Sie verkaufen (Zeitmangel, finanzielle Gründe, Überforderung, Lebensumstände).
                  Dies hilft Ihnen, bei Zweifeln Klarheit zu bewahren.
                </li>
                <li>
                  <strong className="text-brand">Perfekten neuen Besitzer suchen:</strong> Wählen Sie den Käufer
                  nicht nur nach Preis, sondern nach Eignung. Ein gutes Gefühl beim neuen Besitzer erleichtert
                  den Abschied erheblich.
                </li>
                <li>
                  <strong className="text-brand">Abschiedsphase einplanen:</strong> Nehmen Sie sich Zeit für ein
                  bewusstes Abschiednehmen. Ein letzter gemeinsamer Ausritt oder ein Fotoshooting können helfen.
                </li>
                <li>
                  <strong className="text-brand">Besuchsvereinbarung treffen:</strong> Wenn möglich, vereinbaren
                  Sie mit dem Käufer gelegentliche Besuchsmöglichkeiten. Das beruhigt beide Seiten.
                </li>
              </ol>
            </RatgeberHighlightBox>

            <div className="p-4 bg-white border border-brand/10 rounded-lg">
              <p className="text-sm text-brand/90">
                💡 <strong>Profi-Tipp:</strong> Emotionen und Preisverhandlungen trennen! Verkaufen Sie nicht
                aus Verzweiflung unter Wert, aber überschätzen Sie auch nicht aufgrund emotionaler Bindung.
                Eine objektive Bewertung mit{' '}
                <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                  PferdeWert.de (nur {PRICING_FORMATTED.current})
                </Link>
                {' '}schafft Klarheit und verhindert emotionale Fehlentscheidungen.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Plattform-Vergleich */}
        <ContentSection id="plattform-vergleich" title="Verkaufsplattformen im Vergleich: Wo verkaufen Sie am besten?" icon="🌐">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Wahl der richtigen Verkaufsplattform entscheidet maßgeblich über Reichweite, Verkaufsdauer und
            erzielbaren Preis. Jede Plattform hat spezifische Vor- und Nachteile für unterschiedliche Pferdetypen.
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="ehorses.de – Die Nummer 1 für hochwertige Pferde" icon="🏆">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Größte Reichweite in Europa (über 19.000 Inserate, 1,5 Mio. Besucher/Monat)</li>
                    <li>Professionelle Zielgruppe mit Kaufkraft (Durchschnittsbudget: 8.000€+)</li>
                    <li>Exzellente Filterfunktionen für gezielte Käufersuche</li>
                    <li>Premium-Features: Top-Inserate, Videouploads, internationale Reichweite</li>
                    <li>Vertrauenswürdiges Image und etablierte Marke</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Kostenpflichtig: Basis-Inserat 29€/30 Tage, Premium 99€/30 Tage</li>
                    <li>Hohe Konkurrenz durch viele professionelle Händler</li>
                    <li>Käufer erwarten professionelle Präsentation (Fotos, Videos)</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-white rounded-md">
                  <p className="text-sm text-brand/90">
                    <strong>Empfohlen für:</strong> Turnierpferde, hochwertige Freizeitpferde (ab 5.000€),
                    Zuchtpferde, Spezialpferde
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="pferde.de – Community-Plattform mit Tradition" icon="🐴">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Etablierte Community mit 500.000+ registrierten Mitgliedern</li>
                    <li>Forum und Austausch mit anderen Pferdebesitzern</li>
                    <li>Kostenlose Basis-Inserate möglich</li>
                    <li>Gute Reichweite bei Freizeitreitern</li>
                    <li>Regionale Suchfunktionen gut ausgeprägt</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Geringere internationale Reichweite als ehorses.de</li>
                    <li>Weniger professionelle Händler (für manche ein Vorteil)</li>
                    <li>Design und Usability etwas veraltet</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-white rounded-md">
                  <p className="text-sm text-brand/90">
                    <strong>Empfohlen für:</strong> Freizeitpferde (2.000€ - 8.000€), Jungpferde,
                    regionale Verkäufe, Privatverkäufer
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="kleinanzeigen.de (ehem. eBay Kleinanzeigen) – Für regionale Käufer" icon="📍">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Komplett kostenlos (keine Inseratsgebühren)</li>
                    <li>Hohe regionale Reichweite durch breite Nutzerbasis</li>
                    <li>Einfache, unkomplizierte Inseratserstellung</li>
                    <li>Schnelle Kommunikation über Messaging-System</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                  <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                    <li>Viele unseriöse Anfragen (&quot;Was ist Ihr letzter Preis?&quot;)</li>
                    <li>Käufer oft mit geringer Kaufkraft und wenig Pferdeerfahrung</li>
                    <li>Keine spezialisierten Filter für Pferde-Eigenschaften</li>
                    <li>Höheres Betrugsrisiko (Vorsicht bei Vorauszahlung-Anfragen)</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 bg-white rounded-md">
                  <p className="text-sm text-brand/90">
                    <strong>Empfohlen für:</strong> Günstige Freizeitpferde (unter 3.000€), Beistellpferde,
                    Rentner-Pferde, sehr regionale Verkäufe
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Weitere Optionen: Facebook, Instagram, lokale Händler" icon="📱">
              <div className="space-y-3 text-brand/90">
                <div>
                  <strong className="text-brand">Facebook-Gruppen:</strong> Kostenlos, gute regionale Reichweite
                  in speziellen Pferde-Verkaufsgruppen. Aber: Viele &quot;Gratissucher&quot; und wenig seriöse Käufer.
                </div>
                <div>
                  <strong className="text-brand">Instagram:</strong> Ideal für hochwertige Pferde mit guter
                  visueller Präsentation. Nutzen Sie Hashtags wie #PferdZuVerkaufen #WarmblutVerkauf.
                  Reichweite hängt von Followerzahl ab.
                </div>
                <div>
                  <strong className="text-brand">Kommissionsverkauf über Händler:</strong> Händler verkauft Ihr
                  Pferd gegen Provision (15-20% des Verkaufspreises). Vorteil: Professionelle Vermarktung.
                  Nachteil: Hohe Kosten.
                </div>
              </div>
            </RatgeberHighlightBox>

            <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <h4 className="font-semibold text-brand mb-3">Multi-Plattform-Strategie für maximale Reichweite</h4>
              <p className="text-brand/90 mb-4">
                Die erfolgreichsten Verkäufer nutzen eine Kombination mehrerer Plattformen:
              </p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside mb-4">
                <li><strong>Hochwertiges Pferd (10.000€+):</strong> ehorses.de Premium + Instagram</li>
                <li><strong>Mittelklasse (4.000€ - 10.000€):</strong> ehorses.de Basis + pferde.de + Facebook</li>
                <li><strong>Günstig (unter 4.000€):</strong> pferde.de + kleinanzeigen.de + Facebook</li>
              </ul>
              <p className="text-brand/90 text-sm">
                💡 <strong>Wichtig:</strong> Egal welche Plattform – ein realistischer Preis ist entscheidend.
                Mit <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                  PferdeWert.de ({PRICING_FORMATTED.current})
                </Link> ermitteln Sie den fairen Marktwert in 2 Minuten.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Preisfaktoren im Detail */}
        <ContentSection id="preisfaktoren" title="Preisfaktoren im Detail: Was beeinflusst den Wert?" icon="📊">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der Marktwert eines Pferdes setzt sich aus einer komplexen Kombination von Faktoren zusammen.
            Verstehen Sie diese Mechanismen, um realistische Preise zu setzen:
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="1. Ausbildung & Turniererfolge (40% Einfluss)" icon="🏆">
              <p className="mb-3 text-brand/90">
                Der Ausbildungsstand ist der wichtigste Preisfaktor. Jede Ausbildungsstufe erhöht den Wert messbar:
              </p>
              <ul className="space-y-2 text-brand/90">
                <li><strong>Roher 3-Jähriger:</strong> Basiswert (z.B. 2.500€)</li>
                <li><strong>Angeritten (4 Jahre):</strong> +1.500€ bis 2.500€</li>
                <li><strong>Grundausbildung abgeschlossen (5-6 Jahre):</strong> +2.000€ bis 4.000€</li>
                <li><strong>A-Niveau mit Turniererfolgen:</strong> +3.000€ bis 5.000€</li>
                <li><strong>L-Niveau platziert:</strong> +6.000€ bis 10.000€</li>
                <li><strong>M-Niveau und höher:</strong> +10.000€ bis 30.000€+</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  <strong>Wichtig:</strong> Ausbildung muss nachweisbar sein (Turnierresultate, Videos, Ausbilderzeugnisse).
                  Selbsteinschätzung ohne Belege wird von Käufern kritisch gesehen.
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="2. Gesundheitszustand (30% Einfluss)" icon="🏥">
              <p className="mb-3 text-brand/90">
                Der Gesundheitszustand ist für Käufer entscheidend. Chronische Erkrankungen senken den Wert dramatisch:
              </p>
              <ul className="space-y-2 text-brand/90">
                <li><strong>Kerngesund mit aktueller AKU:</strong> Voller Marktwert + 10-15% Bonus</li>
                <li><strong>Kleinere Befunde (z.B. alte Verletzung ohne Einschränkung):</strong> -5% bis 10%</li>
                <li><strong>Chronische Atemwegserkrankung (COB):</strong> -30% bis 50%</li>
                <li><strong>Hufrehe-Historie:</strong> -40% bis 60%</li>
                <li><strong>Arthrose mit Einschränkungen:</strong> -50% bis 70%</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  <strong>Verkaufstipp:</strong> Investieren Sie 500€ in eine aktuelle große AKU. Ein sauberer
                  Befund erhöht Verkaufspreis und Geschwindigkeit deutlich – die Investition amortisiert sich mehrfach.
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="3. Alter & Lebensphase (15% Einfluss)" icon="📅">
              <p className="mb-3 text-brand/90">
                Das Alter beeinflusst Verwendungsmöglichkeiten und verbleibende &quot;Nutzungsdauer&quot;:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-brand">Jungpferde (3-5 Jahre): 70-85% des Spitzenwerts</p>
                  <p className="text-sm text-brand/90">
                    Potenzial ist da, aber Ausbildung fehlt noch. Käufer müssen investieren (Zeit, Geld, Risiko).
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand">Beste Jahre (6-12 Jahre): 100% Marktwert</p>
                  <p className="text-sm text-brand/90">
                    Ideale Phase mit voller Leistungsfähigkeit und Erfahrung. Höchstpreise in diesem Alter.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand">Reife Pferde (13-17 Jahre): 60-80% des Spitzenwerts</p>
                  <p className="text-sm text-brand/90">
                    Noch gut nutzbar, aber verbleibende Turnier-/Arbeitsjahre begrenzt. Ideal für Anfänger.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand">Senioren (18-22 Jahre): 30-50% des Spitzenwerts</p>
                  <p className="text-sm text-brand/90">
                    Nur noch leichte Arbeit möglich. Käufer meist Freizeitreiter oder &quot;Gnadenbrotgeber&quot;.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand">Rentner (23+ Jahre): 500€ - 2.000€</p>
                  <p className="text-sm text-brand/90">
                    Keine Reitnutzung mehr. Verkauf schwierig, oft nur Beisteller oder Gnadenbrotplätze.
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="4. Rasse & Abstammung (10% Einfluss)" icon="🧬">
              <p className="mb-3 text-brand/90">
                Rasse und Zuchtlinien beeinflussen Nachfrage und Preise:
              </p>
              <ul className="space-y-2 text-brand/90">
                <li>
                  <strong className="text-brand">Premium-Warmblüter (Hannoveraner, Oldenburger, Westfalen):</strong>
                  {' '}+10-20% Aufschlag bei anerkannten Zuchtlinien
                </li>
                <li>
                  <strong className="text-brand">Spezialisierte Rassen (Friesen, Andalusier, Quarter Horse):</strong>
                  {' '}Starke Nachfrage in Nischenmärkten, erzielt oft höhere Preise
                </li>
                <li>
                  <strong className="text-brand">Ponys & Kleinpferde (Haflinger, Isländer):</strong>
                  {' '}Stabile Nachfrage, moderate Preise (2.000€ - 8.000€)
                </li>
                <li>
                  <strong className="text-brand">Pferde ohne Papiere:</strong> -15% bis 30% Abschlag
                  (keine Zuchtnutzung möglich)
                </li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="5. Charakter & Eignung (5% Einfluss)" icon="❤️">
              <p className="mb-3 text-brand/90">
                Charakter und Temperament beeinflussen Zielgruppe und damit Nachfrage:
              </p>
              <ul className="space-y-2 text-brand/90">
                <li>
                  <strong className="text-brand">Anfängertauglich (gelassen, geduldig):</strong> +10-15% Bonus,
                  da größere Zielgruppe
                </li>
                <li>
                  <strong className="text-brand">Nervös oder dominant:</strong> -15% bis 25%, nur für
                  erfahrene Reiter
                </li>
                <li>
                  <strong className="text-brand">Verladefromm, schmiedefromm:</strong> Wichtige Pluspunkte
                  für Käufer
                </li>
                <li>
                  <strong className="text-brand">Problemverhalten (Steigen, Beißen):</strong> Massiver
                  Wertverfall (-40% bis 70%)
                </li>
              </ul>
            </RatgeberHighlightBox>

            <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <p className="text-brand/90 mb-4 leading-relaxed">
                <strong>Die Komplexität dieser Faktoren macht eine objektive Bewertung schwierig.</strong> Kleine
                Unterschiede in der Gewichtung können zu Preisdifferenzen von mehreren tausend Euro führen.
              </p>
              <p className="text-brand/90 mb-4">
                Die KI-Bewertung von PferdeWert.de berücksichtigt alle diese Faktoren gleichzeitig und gewichtet
                sie nach aktuellen Marktdaten. Das Ergebnis: eine objektive, nachvollziehbare Preisempfehlung
                in nur 2 Minuten.
              </p>
              <CTAButton type="primary" href="/pferde-preis-berechnen" text={`Jetzt fairen Verkaufspreis ermitteln – ${PRICING_FORMATTED.current}`} />
            </div>
          </div>
        </ContentSection>

        {/* Häufige Fehler */}
        <ContentSection id="fehler" title="Die 7 häufigsten Fehler beim Pferdeverkauf" icon="⚠️">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Viele Pferdeverkäufe scheitern oder kosten tausende Euro Verlust durch vermeidbare Fehler.
            Lernen Sie aus den Erfahrungen anderer:
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Fehler 1: Überteuerte Preisvorstellung" icon="💸">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie setzen den Preis 25-40% über Marktwert, weil &quot;so viel investiert wurde&quot; oder emotionale Bindung
                die Bewertung verzerrt. Ihr Inserat wird monatelang ignoriert.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Folge:</strong></p>
              <p className="mb-3 text-brand/90">
                Monatelang keine seriösen Anfragen → Frustration → Preissenkung → Signalwirkung &quot;etwas stimmt nicht
                mit dem Pferd&quot; → noch schwierigerer Verkauf. Verlust durch Stallkosten: 400-600€/Monat.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                Ermitteln Sie den realistischen Marktwert mit objektiven Tools. PferdeWert.de analysiert Ihr Pferd
                in 2 Minuten für nur {PRICING_FORMATTED.current} und gibt Ihnen eine marktgerechte Preisempfehlung.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 2: Unprofessionelles Inserat mit schlechten Fotos" icon="📸">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Verschwommene Handy-Fotos aus der Box, unvollständige Beschreibung, Rechtschreibfehler,
                fehlende Angaben zu Ausbildung und Gesundheit.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Folge:</strong></p>
              <p className="mb-3 text-brand/90">
                Seriöse Käufer scrollen sofort weiter. Sie erreichen nur Schnäppchenjäger, die versuchen,
                den Preis zu drücken.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <ul className="space-y-1 text-brand/90 list-disc list-inside">
                <li>Professionelle Fotos bei Tageslicht (Stallgasse, Halle, Weide)</li>
                <li>Mindestens 8-12 Fotos aus verschiedenen Perspektiven</li>
                <li>Video von Reiten/Führen (60-90 Sekunden)</li>
                <li>Vollständige, ehrliche Beschreibung aller Eigenschaften</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 3: Mängel verschweigen" icon="🙈">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie verschweigen chronische Erkrankungen, Verhaltensauffälligkeiten oder Verletzungshistorie,
                um einen höheren Preis zu erzielen.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Folge:</strong></p>
              <p className="mb-3 text-brand/90">
                Der Käufer entdeckt die Mängel bei der AKU oder nach dem Kauf → rechtliche Konsequenzen
                (Schadensersatz, Rückabwicklung) → Rufschädigung → Stress und Kosten.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                <strong>Absolute Transparenz zahlt sich aus.</strong> Ehrliche Beschreibung aller Eigenschaften
                und Besonderheiten. Käufer schätzen Ehrlichkeit und sind bereit, für ein &quot;ehrliches&quot; Pferd
                mehr zu zahlen als für eines mit versteckten Mängeln.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 4: Falsche Verkaufsplattform gewählt" icon="🌐">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie verkaufen ein 15.000€ Dressurpferd auf kleinanzeigen.de oder ein 2.500€ Freizeitpferd
                auf einer Spezialplattform für Turnierpferde.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <ul className="space-y-1 text-brand/90 list-disc list-inside">
                <li><strong>Hochwertige Pferde (8.000€+):</strong> ehorses.de, evtl. Instagram</li>
                <li><strong>Freizeitpferde (2.000€ - 8.000€):</strong> pferde.de, Facebook, kleinanzeigen.de</li>
                <li><strong>Günstige Pferde (unter 2.000€):</strong> kleinanzeigen.de, Facebook-Gruppen</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 5: Unvorbereitet in Besichtigungen gehen" icon="🤷">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Käufer kommen zur Besichtigung, das Pferd ist dreckig, unvorbereitet, nervös. Sie können
                keine Fragen zur Ausbildungshistorie oder Gesundheit beantworten.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <ul className="space-y-1 text-brand/90 list-disc list-inside">
                <li>Pferd am Besichtigungstag geputzt und presentabel</li>
                <li>Alle Papiere bereithalten (Equidenpass, Eigentumsurkunde, AKU-Befund)</li>
                <li>Ausbildungshistorie dokumentiert (Videos, Turnierresultate)</li>
                <li>Ruhige Umgebung für Besichtigung sicherstellen</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 6: Zu schnell zu viel nachgeben" icon="📉">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Ein Interessent macht ein Angebot 2.000€ unter Ihrem Preis und Sie akzeptieren sofort aus Angst,
                keinen anderen Käufer zu finden.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                Kalkulieren Sie Ihren Minimalpreis im Vorfeld. Setzen Sie Ihren Inseratspreis 10-15% darüber.
                Bei Verhandlungen: Bleiben Sie höflich, aber bestimmt. Begründen Sie Ihren Preis mit objektiven
                Fakten (Ausbildung, Gesundheit, Erfolge). Eine professionelle Bewertung von PferdeWert.de stärkt
                Ihre Verhandlungsposition erheblich.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 7: Käufer nicht sorgfältig auswählen" icon="👤">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie verkaufen an den erstbesten Käufer mit Geld, ohne zu prüfen, ob dieser zu Ihrem Pferd passt.
                Resultat: Schlechte Platzierung, Pferd wird weitergereicht oder landet im Schlachthof.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <ul className="space-y-1 text-brand/90 list-disc list-inside">
                <li>Stellen Sie Fragen zur Erfahrung und Haltungsform des Käufers</li>
                <li>Bestehen Sie auf persönlichen Besuch (keine Ferntransporte ohne Besichtigung)</li>
                <li>Vertrauen Sie Ihrem Bauchgefühl – bei Zweifeln lieber ablehnen</li>
                <li>Vereinbaren Sie Besuchsrecht oder zumindest Updates zum Pferd</li>
              </ul>
            </RatgeberHighlightBox>
          </div>
        </ContentSection>

        {/* Schritt-für-Schritt-Anleitung */}
        <ContentSection id="schritt-anleitung" title="Schritt-für-Schritt: So verkaufen Sie Ihr Pferd erfolgreich" icon="✅">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der strukturierte Ablauf beim Pferdeverkauf verhindert teure Fehler und führt zu schnellem Erfolg.
            Folgen Sie dieser bewährten 9-Schritte-Anleitung:
          </p>

          <div className="space-y-8">
            <RatgeberHighlightBox title="Schritt 1: Pferdewert ermitteln" icon="1️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 2 Minuten</strong>
              </p>
              <p className="mb-3 text-brand/90">
                Ermitteln Sie den realistischen Marktwert Ihres Pferdes. Nutzen Sie professionelle Bewertungstools
                wie PferdeWert.de für eine objektive Einschätzung basierend auf über 50 Kriterien und aktuellen
                Marktdaten.
              </p>
              <div className="p-3 bg-white rounded-md">
                <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                  → Jetzt Pferdewert ermitteln (nur {PRICING_FORMATTED.current})
                </Link>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 2: Inserat erstellen" icon="2️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 2-4 Stunden</strong>
              </p>
              <p className="mb-3">Erstellen Sie ein professionelles Verkaufsinserat:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li><strong>Fotos:</strong> 10-15 hochwertige Bilder (Tageslicht, verschiedene Perspektiven)</li>
                <li><strong>Video:</strong> 1-2 Minuten Reiten/Führen</li>
                <li><strong>Beschreibung:</strong> Detailliert und ehrlich (Ausbildung, Charakter, Gesundheit)</li>
                <li><strong>Kontaktdaten:</strong> Telefon + E-Mail für schnelle Rückmeldung</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 3: Verkaufsplattform wählen" icon="3️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 30 Minuten</strong>
              </p>
              <p className="mb-3 text-brand/90">
                Veröffentlichen Sie Ihr Inserat auf den passenden Plattformen:
              </p>
              <ul className="space-y-1 text-brand/90 list-disc list-inside">
                <li><strong>Hochwertig (8.000€+):</strong> ehorses.de Premium</li>
                <li><strong>Mittelklasse (3.000€ - 8.000€):</strong> ehorses.de + pferde.de</li>
                <li><strong>Günstig (unter 3.000€):</strong> pferde.de + kleinanzeigen.de + Facebook</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 4: Interessenten kontaktieren" icon="4️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 1-2 Stunden/Woche</strong>
              </p>
              <p className="mb-3">Beantworten Sie Anfragen professionell und zeitnah:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Antworten innerhalb 24 Stunden (je schneller, desto besser)</li>
                <li>Filtern Sie ernsthafte Käufer durch gezielte Fragen (Erfahrung, Budget, Verwendungszweck)</li>
                <li>Seien Sie höflich, auch bei unseriösen Anfragen</li>
                <li>Geben Sie keine Rabatte am Telefon – Verhandlung nur bei Besichtigung</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 5: Besichtigungstermine organisieren" icon="5️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 2-3 Stunden pro Termin</strong>
              </p>
              <p className="mb-3">Bereiten Sie Besichtigungen professionell vor:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Pferd geputzt und in guter Verfassung präsentieren</li>
                <li>Alle Papiere bereithalten (Pass, AKU, Turniererfolge)</li>
                <li>Ruhige Umgebung wählen (nicht während Fütterungszeit)</li>
                <li>Zeigen Sie Pferd in verschiedenen Situationen (Box, Führen, Reiten)</li>
                <li>Bieten Sie Proberitt an (nur für erfahrene Reiter)</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 6: Preisverhandlungen führen" icon="6️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 30 Minuten - 1 Stunde</strong>
              </p>
              <p className="mb-3">Verhandeln Sie sachlich und professionell:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Begründen Sie Ihren Preis mit objektiven Kriterien</li>
                <li>Nutzen Sie professionelle Bewertung als Verhandlungsgrundlage</li>
                <li>Kalkulieren Sie 10-15% Verhandlungsspielraum ein</li>
                <li>Bleiben Sie freundlich, aber bestimmt bei Ihrem Minimalpreis</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 7: Ankaufsuntersuchung ermöglichen" icon="7️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 2-4 Stunden</strong>
              </p>
              <p className="mb-3 text-brand/90">
                Bieten Sie dem Käufer eine unabhängige AKU an:
              </p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Käufer wählt eigenen Tierarzt (erhöht Vertrauen)</li>
                <li>Kosten trägt in der Regel der Käufer</li>
                <li>Terminkoordination zwischen Käufer, Tierarzt und Ihnen</li>
                <li>Seien Sie bei der AKU anwesend oder vereinbaren Sie Stellvertreter</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 8: Kaufvertrag abschließen" icon="8️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 30 Minuten</strong>
              </p>
              <p className="mb-3">Nutzen Sie einen schriftlichen Kaufvertrag:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Vollständige Angaben zu Käufer und Verkäufer</li>
                <li>Detaillierte Pferdebeschreibung (Name, Rasse, Alter, Chipnummer)</li>
                <li>Kaufpreis und Zahlungsmodalitäten</li>
                <li>Gewährleistungsausschluss (bei Privatverkauf)</li>
                <li>Unterschriften beider Parteien</li>
              </ul>
              <div className="mt-3 p-3 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  💡 Tipp: Verwenden Sie etablierte Vertragsvorlagen der FN (Deutsche Reiterliche Vereinigung)
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 9: Übergabe durchführen" icon="9️⃣">
              <p className="mb-3 text-brand/90">
                <strong>Zeitaufwand: 1-2 Stunden</strong>
              </p>
              <p className="mb-3">Organisieren Sie die Übergabe sorgfältig:</p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Klären Sie Zahlungsmodalitäten (Überweisung vor Abholung empfohlen)</li>
                <li>Übergeben Sie alle Papiere (Equidenpass, Eigentumsurkunde)</li>
                <li>Organisieren Sie Transport (Käufer oder professioneller Transporter)</li>
                <li>Verabschieden Sie sich in Ruhe von Ihrem Pferd</li>
                <li>Optional: Vereinbaren Sie Besuchsrecht oder Updates</li>
              </ul>
            </RatgeberHighlightBox>
          </div>
        </ContentSection>

        {/* KI-gestützte Bewertung */}
        <ContentSection id="ki-bewertung" title="KI-gestützte Pferdebewertung: Warum nur {PRICING_FORMATTED.current}?" icon="🤖">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Viele Verkäufer fragen sich: &quot;Warum sollte ich {PRICING_FORMATTED.current} für eine Bewertung ausgeben?&quot;
            Die Antwort ist einfach: Weil diese Investition Sie vor Verlusten von 3.000€ bis 9.000€ schützen kann.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h4 className="font-semibold text-brand mb-2">Das Problem ohne objektive Bewertung</h4>
              <div className="space-y-3 text-brand/90">
                <p>
                  <strong>Szenario 1 – Überteuert:</strong> Sie setzen Ihren Preis zu hoch (z.B. 12.000€ statt
                  fairer 8.500€). Ergebnis: 4 Monate keine Anfragen, Stallkosten 2.400€, Preissenkung auf 7.500€
                  (um Verkaufswillen zu signalisieren). <strong>Verlust: 1.000€ + 4 Monate Zeit</strong>
                </p>
                <p>
                  <strong>Szenario 2 – Unterbewertet:</strong> Sie verkaufen aus Unsicherheit unter Wert
                  (z.B. 5.000€ statt fairer 8.500€). <strong>Verlust: 3.500€ direkt</strong>
                </p>
                <p>
                  <strong>Beide Szenarien verhindern Sie mit einer professionellen Bewertung für {PRICING_FORMATTED.current}.</strong>
                </p>
              </div>
            </div>

            <RatgeberHighlightBox title="So funktioniert die PferdeWert.de KI-Bewertung" icon="⚙️">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand mb-2">1. Duales KI-System (GPT-4 + Claude)</p>
                  <p className="text-brand/90">
                    Zwei unabhängige KI-Modelle analysieren Ihr Pferd parallel. Das Cross-Checking eliminiert
                    Verzerrungen und erhöht die Genauigkeit auf über 90%.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">2. Über 50 Bewertungskriterien</p>
                  <p className="text-brand/90">
                    Rasse, Alter, Ausbildung, Gesundheit, Charakter, Turniererfolge, regionale Nachfrage,
                    saisonale Trends – alle relevanten Faktoren fließen in die Analyse ein.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">3. Aktuelle Marktdaten</p>
                  <p className="text-brand/90">
                    Unsere Datenbank wird kontinuierlich mit aktuellen Verkaufspreisen aktualisiert.
                    Die Bewertung berücksichtigt regionale Unterschiede und Saisonalität.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">4. Detaillierter Bewertungsreport</p>
                  <p className="text-brand/90">
                    Sie erhalten nicht nur einen Preis, sondern einen ausführlichen Report mit Preisfaktoren,
                    Stärken, Schwächen und Verkaufstipps.
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Warum PferdeWert.de besser ist als Alternativen" icon="🏆">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-brand mb-1">
                    ❌ Alternative 1: Gutachter vor Ort (Kosten: 200€ - 500€)
                  </p>
                  <p className="text-brand/90 text-sm">
                    Teuer, zeitaufwändig (Terminvereinbarung, Anfahrt), subjektiv (nur eine Meinung),
                    oft Interessenkonflikte bei lokalen Gutachtern
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-1">
                    ❌ Alternative 2: Selbst recherchieren (Zeitaufwand: 5-10 Stunden)
                  </p>
                  <p className="text-brand/90 text-sm">
                    Sehr zeitaufwändig, vergleichbare Inserate schwer zu finden, emotionale Verzerrung bleibt,
                    keine Berücksichtigung aller Faktoren
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-1">
                    ✅ PferdeWert.de ({PRICING_FORMATTED.current})
                  </p>
                  <p className="text-brand/90 text-sm">
                    Günstig, schnell (2 Minuten), objektiv (KI ohne Eigeninteresse), umfassend (50+ Kriterien),
                    aktuell (Marktdaten 2025), mit Geld-zurück-Garantie
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <h4 className="text-2xl font-serif text-brand mb-4">Rechenbeispiel: Warum sich {PRICING_FORMATTED.current} immer lohnen</h4>
              <div className="space-y-4 text-brand/90 mb-6">
                <p>
                  <strong>Beispiel-Pferd:</strong> 8-jähriger Warmblut-Wallach, Freizeitniveau, gesund, guter Charakter
                </p>
                <p>
                  <strong>Ohne Bewertung:</strong> Sie schätzen 6.500€, verkaufen nach 3 Monaten für 5.800€
                  (Verlust durch Unsicherheit + Stallkosten)
                </p>
                <p>
                  <strong>Mit PferdeWert.de-Bewertung:</strong> Fairer Marktwert ist 7.200€. Sie setzen
                  Preis auf 7.500€, verkaufen nach 6 Wochen für 7.100€.
                </p>
                <p className="font-semibold text-brand">
                  <strong>Ihr Mehrgewinn: 1.300€ Mehrerlös - {PRICING_FORMATTED.current} Bewertung - 200€ gesparte Stallkosten
                  = 1.085€ Nettogewinn</strong>
                </p>
              </div>
              <CTAButton type="primary" href="/pferde-preis-berechnen" text={`Jetzt Verkaufspreis optimieren – ${PRICING_FORMATTED.current}`} />
            </div>
          </div>
        </ContentSection>

        {/* Preisverhandlung */}
        <ContentSection id="preisverhandlung" title="Preisverhandlung meistern: Taktiken für Verkäufer" icon="🤝">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Preisverhandlung ist der Moment, in dem sich Vorbereitung auszahlt. Mit der richtigen Strategie
            holen Sie den bestmöglichen Preis heraus, ohne den Käufer zu verlieren.
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Vorbereitung: Ihr Verhandlungsrahmen" icon="📋">
              <p className="mb-3 text-brand/90">
                Definieren Sie vor jeder Verhandlung drei Preispunkte:
              </p>
              <ul className="space-y-3 text-brand/90">
                <li>
                  <strong className="text-brand">1. Wunschpreis (Inseratspreis):</strong> Ihr optimistischer
                  Preis, 10-15% über dem fairen Marktwert. Dieser Preis lässt Verhandlungsspielraum.
                </li>
                <li>
                  <strong className="text-brand">2. Zielpreis:</strong> Der realistische Verkaufspreis,
                  entspricht dem fairen Marktwert (z.B. ermittelt mit PferdeWert.de).
                </li>
                <li>
                  <strong className="text-brand">3. Minimalpreis:</strong> Ihre absolute Schmerzgrenze.
                  Darunter verkaufen Sie nicht. Kalkulieren Sie diesen im Vorfeld und kommunizieren Sie ihn
                  nicht offen.
                </li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Verhandlungstaktiken, die funktionieren" icon="💡">
              <ol className="space-y-4 text-brand/90">
                <li>
                  <strong className="text-brand">1. Begründen Sie Ihren Preis objektiv:</strong> Nennen Sie
                  konkrete Fakten (Ausbildungsstand, Turniererfolge, AKU-Befund, Abstammung). Vermeiden Sie
                  emotionale Argumente wie &quot;Ich habe so viel investiert&quot; – Käufer interessiert nur der
                  aktuelle Marktwert.
                </li>
                <li>
                  <strong className="text-brand">2. Nutzen Sie professionelle Bewertung als Verhandlungsgrundlage:</strong>
                  {' '}&quot;Ich habe eine professionelle KI-Bewertung machen lassen, die den fairen Marktwert bei 8.200€
                  sieht. Ich bin bereit, für 8.000€ zu verkaufen.&quot; – Das schafft Vertrauen und signalisiert, dass
                  Sie Ihre Hausaufgaben gemacht haben.
                </li>
                <li>
                  <strong className="text-brand">3. Verhandeln Sie nicht am Telefon:</strong> Geben Sie keine
                  Rabatte vor der Besichtigung. &quot;Der Preis ist verhandelbar nach der Besichtigung&quot; ist eine
                  professionelle Antwort.
                </li>
                <li>
                  <strong className="text-brand">4. Warten Sie mit Gegenangeboten:</strong> Wenn der Käufer
                  ein niedriges Angebot macht, fragen Sie: &quot;Wie kommen Sie auf diesen Preis?&quot; Oft korrigieren
                  Käufer sich selbst nach oben.
                </li>
                <li>
                  <strong className="text-brand">5. Nutzen Sie Interesse als Hebel:</strong> Wenn Sie mehrere
                  Interessenten haben, kommunizieren Sie das subtil: &quot;Es gibt noch einen weiteren Termin
                  morgen.&quot; Das erhöht die Bereitschaft des Käufers, Ihren Preis zu akzeptieren.
                </li>
              </ol>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Häufige Käufer-Tricks und Ihre Gegenstrategien" icon="🎯">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand mb-2">
                    Trick 1: &quot;Ich habe nur X€ zur Verfügung&quot;
                  </p>
                  <p className="text-brand/90 mb-2">
                    <strong>Gegenstrategie:</strong> &quot;Ich verstehe Ihre Budgetsituation. Leider liegt der
                    faire Marktwert bei Y€, wie diese professionelle Bewertung zeigt. Ich kann nicht unter
                    Z€ gehen.&quot;
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">
                    Trick 2: &quot;Das Pferd hat aber Problem X&quot; (künstlich aufblasen kleiner Mängel)
                  </p>
                  <p className="text-brand/90 mb-2">
                    <strong>Gegenstrategie:</strong> Bleiben Sie sachlich. &quot;Ja, das ist korrekt und wurde im
                    Preis bereits berücksichtigt. Ein vergleichbares Pferd ohne diesen Befund würde 1.000€
                    mehr kosten.&quot;
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">
                    Trick 3: &quot;Ich kenne jemanden, der ein ähnliches Pferd für viel weniger gekauft hat&quot;
                  </p>
                  <p className="text-brand/90 mb-2">
                    <strong>Gegenstrategie:</strong> &quot;Das mag sein. Jedes Pferd ist individuell. Mein Pferd
                    hat diese spezifischen Qualitäten [nennen Sie konkrete Vorteile]. Wenn Sie ein günstigeres
                    Pferd finden, das besser passt, verstehe ich das natürlich.&quot;
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <div className="p-4 bg-white border border-brand/10 rounded-lg">
              <p className="text-sm text-brand/90">
                💡 <strong>Goldene Regel:</strong> Verkaufen Sie nie aus Verzweiflung. Wenn ein Käufer Ihren
                Minimalpreis nicht akzeptiert, warten Sie auf den nächsten Interessenten. Ein fairer Preis
                (ermittelbar mit{' '}
                <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                  PferdeWert.de, {PRICING_FORMATTED.current}
                </Link>
                ) zieht immer Käufer an – es ist nur eine Frage der Zeit.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Rechtliche Aspekte */}
        <ContentSection id="rechtliche-aspekte" title="Rechtliche Aspekte beim Pferdeverkauf" icon="⚖️">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der Pferdeverkauf ist rechtlich komplex. Fehler können zu Schadenersatzforderungen, Rückabwicklungen
            oder langwierigen Rechtsstreitigkeiten führen. Diese Aspekte müssen Sie kennen:
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Kaufvertrag: Was muss rein?" icon="📝">
              <p className="mb-3 text-brand/90">
                Ein schriftlicher Kaufvertrag ist beim Pferdekauf nicht gesetzlich vorgeschrieben, aber
                <strong> dringend empfohlen</strong>. Er schützt beide Seiten rechtlich.
              </p>
              <div className="space-y-2 text-brand/90">
                <p><strong className="text-brand">Pflichtangaben im Kaufvertrag:</strong></p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Vollständige Personalien von Käufer und Verkäufer (Name, Adresse)</li>
                  <li>Detaillierte Pferdebeschreibung (Name, Rasse, Geschlecht, Farbe, Geburtsdatum, Chipnummer)</li>
                  <li>Kaufpreis und Zahlungsmodalitäten</li>
                  <li>Übergabedatum und -ort</li>
                  <li>Aussagen zum Gesundheitszustand (ehrlich und vollständig)</li>
                  <li>Regelung zur Gewährleistung (bei Privatverkauf meist ausgeschlossen)</li>
                  <li>Unterschriften beider Parteien mit Datum</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  💡 Tipp: Nutzen Sie etablierte Vertragsvorlagen der FN (Deutsche Reiterliche Vereinigung)
                  oder lassen Sie sich von einem Anwalt beraten.
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Gewährleistung: Privat vs. gewerblich" icon="⚖️">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand mb-2">Privatverkauf:</p>
                  <p className="text-brand/90 mb-2">
                    Bei Verkäufen zwischen Privatpersonen kann die gesetzliche Gewährleistung (Mängelrechte)
                    ausgeschlossen werden. Das erfolgt durch Klausel im Kaufvertrag wie:
                    &quot;Der Verkauf erfolgt unter Ausschluss jeglicher Gewährleistung.&quot;
                  </p>
                  <p className="text-brand/90 text-sm">
                    <strong>Aber Achtung:</strong> Arglistig verschwiegene Mängel können trotzdem zu Schadensersatz
                    führen. Sie müssen bekannte Krankheiten, Verhaltensauffälligkeiten oder schwerwiegende
                    Vorerkrankungen offenlegen.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-2">Gewerblicher Verkauf (Händler):</p>
                  <p className="text-brand/90 mb-2">
                    Händler können die Gewährleistung nicht vollständig ausschließen. Sie können sie auf
                    12 Monate verkürzen (gesetzlich wären 24 Monate). Der Käufer hat in den ersten 6 Monaten
                    bessere Rechte (Beweislastumkehr).
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Mängelhaftung: Was müssen Sie offenlegen?" icon="🔍">
              <p className="mb-3 text-brand/90">
                <strong>Diese Mängel MÜSSEN Sie offenlegen:</strong>
              </p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside mb-4">
                <li>Chronische Erkrankungen (Hufrehe, COB, Arthrose, etc.)</li>
                <li>Schwerwiegende Verhaltensauffälligkeiten (Steigen, Koppen, Weben)</li>
                <li>Frühere schwere Verletzungen oder Operationen</li>
                <li>Medikamentengabe (insbesondere Schmerzmittel)</li>
                <li>Allergien oder Unverträglichkeiten</li>
              </ul>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-brand/90">
                  <strong>⚠️ Warnung:</strong> Das Verschweigen bekannter Mängel kann zu Schadenersatzforderungen,
                  Kaufpreisminderung oder Rückabwicklung des Kaufs führen – auch bei Gewährleistungsausschluss!
                  Seien Sie transparent und dokumentieren Sie alle bekannten Eigenschaften schriftlich.
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Eigentumsübergang und Gefahrenübergang" icon="📋">
              <div className="space-y-3 text-brand/90">
                <p>
                  <strong className="text-brand">Eigentumsübergang:</strong> Das Eigentum am Pferd geht mit
                  Übergabe und Zahlung auf den Käufer über. Wichtig: Übergeben Sie den Equidenpass und die
                  Eigentumsurkunde erst bei vollständiger Zahlung.
                </p>
                <p>
                  <strong className="text-brand">Gefahrenübergang:</strong> Ab Übergabe trägt der Käufer das
                  Risiko für das Pferd (Krankheit, Tod, Verletzung). Klären Sie im Vertrag, ab wann die Gefahr
                  übergeht (z.B. ab Abholung oder ab Zahlung).
                </p>
                <p>
                  <strong className="text-brand">Versicherung:</strong> Der Käufer sollte eine Haftpflichtversicherung
                  bereits ab Übergabedatum haben. Klären Sie, wer bis zur Abholung versichert (oft: Verkäufer
                  bis Abholung).
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Rücktrittsrecht und Probezeit" icon="⏪">
              <p className="mb-3 text-brand/90">
                <strong>Wichtig: Beim Pferdekauf gibt es KEIN gesetzliches Widerrufsrecht!</strong> Der
                Kaufvertrag ist bindend, sobald er unterschrieben ist.
              </p>
              <p className="mb-3 text-brand/90">
                <strong>Probezeit:</strong> Wenn Sie eine Probezeit vereinbaren möchten (z.B. 2 Wochen),
                muss das explizit im Kaufvertrag stehen:
              </p>
              <ul className="space-y-2 text-brand/90 list-disc list-inside">
                <li>Dauer der Probezeit (z.B. 14 Tage)</li>
                <li>Bedingungen für Rücktritt (z.B. nur bei gesundheitlichen Mängeln)</li>
                <li>Rückgabemodalitäten (Transport, Kosten)</li>
                <li>Wer trägt Kosten während Probezeit (Stall, Futter, Versicherung)</li>
              </ul>
            </RatgeberHighlightBox>

            <div className="mt-6 p-4 bg-white border border-brand/10 rounded-lg">
              <p className="text-sm text-brand/90">
                💡 <strong>Wichtiger Hinweis:</strong> Diese Informationen sind keine Rechtsberatung.
                Bei komplexen Fällen oder hohen Kaufpreisen (ab 15.000€) empfehlen wir die Konsultation
                eines auf Pferderecht spezialisierten Anwalts.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Regionale Unterschiede */}
        <div className="mt-16">
          <h2 className="text-4xl font-serif text-brand mb-6">Regionale Besonderheiten beim Pferdeverkauf</h2>
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der deutsche Pferdemarkt unterscheidet sich regional in Nachfrage, Preisen und Käuferprofilen:
          </p>
          <RatgeberRegionGrid regions={regionalRegions} />
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-16">
          <FAQ sectionTitle="Häufig gestellte Fragen zum Pferdeverkauf" faqs={faqItems} />
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <RatgeberRelatedArticles
            title="Weiterführende Artikel zum Pferdeverkauf"
            description="Vertiefen Sie Ihr Wissen rund um Pferdebewertung und Pferdekauf"
            articles={relatedArticles}
          />
        </div>

        {/* Final CTA */}
        <div className="mt-16">
          <RatgeberFinalCTA
            title="Verkaufen Sie Ihr Pferd zum optimalen Preis"
            description={`Der Verkauf eines Pferdes ist komplex und emotional zugleich. Mit PferdeWert.de haben Sie einen verlässlichen Partner für faire Pferdebewertung an Ihrer Seite. Unsere KI-Technologie verschafft Ihnen Preistransparenz und Verhandlungssicherheit in nur 2 Minuten – für nur ${PRICING_FORMATTED.current}. Vermeiden Sie Über- oder Unterbewertung und verkaufen Sie zum fairen Marktwert.`}
            image={{
              src: "/images/ratgeber/pferd-verkaufen/hero.webp",
              alt: "KI-gestützte Pferdebewertung in 2 Minuten"
            }}
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Verkaufspreis berechnen"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PferdVerkaufen;
