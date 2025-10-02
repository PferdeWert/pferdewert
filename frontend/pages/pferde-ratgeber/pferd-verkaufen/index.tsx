import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown, BookOpen, Calculator, TrendingUp, Shield, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';
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
        <section id="wert-ermitteln" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Schritt 1: Den realistischen Pferdewert ermitteln
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die Bewertung Ihres Pferdes ist der wichtigste erste Schritt beim Verkauf. Ein realistischer Preis
            entscheidet über Verkaufserfolg oder monatelanges Warten. Die größte Herausforderung: Emotionale Bindung
            führt oft zu überhöhten Preisvorstellungen.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Marktpreise 2025: Was ist Ihr Pferd wirklich wert?
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Die Preisspanne im Pferdemarkt ist enorm – von 500€ für Rentner-Pferde bis über 50.000€ für
            Spitzensportpferde. Eine grobe Orientierung:
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Freizeitpferd (gut):</span>
              <span>2.500€ – 6.000€ - Gut ausgebildete Freizeitpferde mit solider Grundausbildung</span>
            </li>
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Turnierpferd L-Niveau:</span>
              <span>8.000€ – 20.000€ - Turniererprobte Pferde mit L-Platzierungen</span>
            </li>
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Jungpferd (3-4 Jahre):</span>
              <span>1.500€ – 5.000€ - Junge Pferde am Beginn der Ausbildung</span>
            </li>
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Rentner (20+ Jahre):</span>
              <span>500€ – 2.000€ - Erfahrene Pferde im fortgeschrittenen Alter</span>
            </li>
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Zuchtpferd m. Erfolg:</span>
              <span>10.000€ – 50.000€+ - Erfolgreiche Zuchtstuten und -hengste</span>
            </li>
            <li className="flex">
              <span className="text-brand-brown font-semibold min-w-[200px]">Spezialpferd (Western):</span>
              <span>5.000€ – 15.000€ - Spezialisierte Western-Reitpferde</span>
            </li>
          </ul>

          {/* STRATEGIC BOX #1: Conversion CTA */}
          <RatgeberHighlightBox
            title="Professionelle Bewertung in 2 Minuten"
            icon={<Calculator className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              PferdeWert.de nutzt modernste Künstliche Intelligenz, um den fairen Marktwert Ihres Pferdes in
              nur 2 Minuten zu berechnen. Unser duales KI-System (GPT-4 + Claude) wurde von erfahrenen Reitern
              entwickelt und berücksichtigt über 50 Bewertungskriterien sowie aktuelle Marktdaten.
            </p>
            <div className="mb-6">
              <p className="font-semibold text-brand mb-3">Die Vorteile für Sie als Verkäufer:</p>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li>✓ <strong>Objektive Bewertung:</strong> KI ohne emotionale Verzerrung</li>
                <li>✓ <strong>Realistische Preisfindung:</strong> Vermeiden Sie Über- oder Unterbewertung</li>
                <li>✓ <strong>Verkaufsargument:</strong> Professionelle Bewertung als Verhandlungsgrundlage</li>
                <li>✓ <strong>Schneller Verkauf:</strong> Fairer Preis zieht seriöse Käufer an</li>
                <li>✓ <strong>Aktualität:</strong> Berücksichtigt aktuelle Markttrends 2025</li>
                <li>✓ <strong>Risikofrei:</strong> 30 Tage Geld-zurück-Garantie</li>
              </ul>
            </div>
            <CTAButton type="primary" href="/pferde-preis-berechnen" text={`Jetzt Verkaufspreis berechnen – nur ${PRICING_FORMATTED.current}`} />
            <p className="text-sm text-gray-600 mt-3 italic">
              Von Reitern entwickelt. Über 10.000 erfolgreiche Bewertungen.
            </p>
          </RatgeberHighlightBox>
        </section>

        {/* Emotionale Faktoren */}
        <section id="emotionale-faktoren" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Die emotionale Seite: Abschied nehmen vom Partner Pferd
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Verkauf eines Pferdes ist nicht nur eine Transaktion – es ist oft ein schmerzhafter Abschied
            von einem langjährigen Partner. Diese emotionale Dimension wird häufig unterschätzt.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Typische emotionale Herausforderungen
          </h3>

          <ul className="space-y-3 text-gray-700">
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

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            So gehen Sie professionell mit Emotionen um
          </h3>

          <ol className="space-y-3 list-decimal list-inside text-gray-700">
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

          <p className="text-sm text-gray-700 bg-white border border-brand/10 rounded-lg p-4">
            💡 <strong>Profi-Tipp:</strong> Emotionen und Preisverhandlungen trennen! Verkaufen Sie nicht
            aus Verzweiflung unter Wert, aber überschätzen Sie auch nicht aufgrund emotionaler Bindung.
            Eine objektive Bewertung mit{' '}
            <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
              PferdeWert.de
            </Link>
            {' '}hilft dabei.
          </p>
        </section>

        {/* Plattform-Vergleich */}
        <section id="plattform-vergleich" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Verkaufsplattformen im Vergleich: Wo verkaufe ich am besten?
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die Wahl der richtigen Verkaufsplattform ist entscheidend für Ihren Erfolg. Jede Plattform hat
            ihre Stärken und Zielgruppen. Ein strategischer Mix mehrerer Plattformen maximiert Ihre Reichweite.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            ehorses.de – Die Premium-Plattform
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Mit über 19.000 aktiven Inseraten ist ehorses.de Deutschlands größter Pferdemarkt und die erste Wahl
            für hochwertige Pferde.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Zielgruppe:</strong> Erfahrene Reiter, Turniersportler, professionelle Käufer</li>
            <li>• <strong>Beste Eignung:</strong> Turnierpferde ab 8.000€, Zuchtpferde, Spezialrassen</li>
            <li>• <strong>Kosten:</strong> Premium-Inserat 39€/Monat, Basis-Inserat 19€/Monat</li>
            <li>• <strong>Verkaufsdauer:</strong> Durchschnittlich 6-10 Wochen bei realistischem Preis</li>
            <li>• <strong>Vorteile:</strong> Hohe Qualitätsansprüche, seriöse Käufer, internationale Reichweite</li>
            <li>• <strong>Nachteile:</strong> Kostenintensiv, hohe Konkurrenz bei Freizeitpferden</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            pferde.de – Die Community-Plattform
          </h3>

          <p className="text-gray-700 leading-relaxed">
            pferde.de ist bekannt für seine aktive Community und eignet sich besonders für Freizeitpferde
            im mittleren Preissegment.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Zielgruppe:</strong> Privatreiter, Freizeitreiter, Anfänger</li>
            <li>• <strong>Beste Eignung:</strong> Freizeitpferde 2.000€-10.000€, Reitbeteiligungen</li>
            <li>• <strong>Kosten:</strong> Premium-Inserat 29€/Monat, Basis oft kostenlos</li>
            <li>• <strong>Verkaufsdauer:</strong> 4-8 Wochen bei fairem Preis</li>
            <li>• <strong>Vorteile:</strong> Hohe Aktivität, Community-Features, günstigere Preise</li>
            <li>• <strong>Nachteile:</strong> Weniger professionelle Käufer, niedrigeres Preisniveau</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            kleinanzeigen.de (ehemals eBay Kleinanzeigen) – Der regionale Marktplatz
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Ideal für regionale Verkäufe und Pferde im unteren bis mittleren Preissegment.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Zielgruppe:</strong> Lokale Käufer, Preisbewusste, Anfänger</li>
            <li>• <strong>Beste Eignung:</strong> Freizeitpferde bis 5.000€, Rentner, Jungpferde</li>
            <li>• <strong>Kosten:</strong> Basis kostenlos, Top-Anzeige 5-10€</li>
            <li>• <strong>Verkaufsdauer:</strong> 3-12 Wochen, sehr variabel</li>
            <li>• <strong>Vorteile:</strong> Kostenlos, große Nutzerbasis, regionale Reichweite</li>
            <li>• <strong>Nachteile:</strong> Viele unseriöse Anfragen, niedrigere Zahlungsbereitschaft</li>
          </ul>
        </section>

        {/* Preisfaktoren */}
        <section id="preisfaktoren" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Die 5 wichtigsten Preisfaktoren im Detail
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Wert eines Pferdes wird durch eine Kombination verschiedener Faktoren bestimmt. Verstehen Sie
            diese Faktoren, um den optimalen Verkaufspreis zu ermitteln.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            1. Ausbildungsstand (Einfluss: 40%)
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Jede Ausbildungsstufe erhöht den Wert merklich. Ein Pferd mit A-Niveau ist 2.000-3.000€ mehr wert
            als ein vergleichbares ohne Turniererfahrung. L-Niveau: +4.000-7.000€, M-Niveau: +8.000-15.000€.
            Spezialisierungen wie Dressur oder Springen erhöhen den Wert zusätzlich.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            2. Gesundheitszustand (Einfluss: 30%)
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Chronische Erkrankungen (Hufrehe, Arthrose, Atemwegsprobleme) senken den Wert um 30-60%. Eine aktuelle
            AKU ohne Befund steigert Verkaufschancen und Preis um 10-20%. Röntgenbilder und Blutbild können
            zusätzliches Vertrauen schaffen.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            3. Alter (Einfluss: 15%)
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Pferde zwischen 6 und 12 Jahren erzielen Höchstpreise. Ab 15 Jahren sinkt der Wert merklich,
            ab 20 Jahren deutlich (Rentner-Status). Jungpferde (3-4 Jahre) haben Potenzial, aber auch Risiko.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            4. Rasse und Abstammung (Einfluss: 10%)
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Warmblüter aus anerkannten Zuchtlinien (Hannoveraner, Oldenburger, Westfalen) rechtfertigen
            1.000-3.000€ Aufschlag. Elitetiere mit Körung oder gekörten Eltern erzielen Spitzenpreise.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            5. Charakter und Eignung (Einfluss: 5%)
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Anfängertaugliche, gelassene Pferde sind gefragter und erzielen 10-15% höhere Preise als
            schwierige Charaktere. Vielseitigkeit (Dressur + Springen) steigert ebenfalls den Wert.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Regionale Preisunterschiede
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Auch die Region beeinflusst den Preis erheblich:
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong className="text-brand">Bayern:</strong> Premium-Preise durch hohe Kaufkraft.
              Warmblut-Markt mit 10-15% Aufschlag. München, Nürnberg, Regensburg als Zentren.
            </li>
            <li>
              <strong className="text-brand">Nordrhein-Westfalen:</strong> Größter deutscher Pferdemarkt.
              Münsterland und Warendorf als Hochburgen. Moderate Preise durch große Konkurrenz.
            </li>
            <li>
              <strong className="text-brand">Niedersachsen:</strong> Hannoveraner-Heimat. Turnierpferde
              erzielen Spitzenpreise. Verden als bedeutendes Handelszentrum.
            </li>
          </ul>
        </section>

        {/* Häufige Fehler */}
        <section id="fehler" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Die 7 teuersten Fehler beim Pferdeverkauf (und wie Sie sie vermeiden)
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Diese Fehler kosten Verkäufer jährlich tausende Euro. Lernen Sie aus den Erfahrungen anderer
            und vermeiden Sie diese klassischen Fallen.
          </p>

          {/* STRATEGIC BOX #2: Critical Warning */}
          <RatgeberHighlightBox
            title="Kritische Warnung: Diese Fehler kosten Sie 3.000-9.000€"
            icon={<AlertTriangle className="h-5 w-5 text-brand-brown" />}
          >
            <ol className="space-y-3 list-decimal list-inside text-sm md:text-base text-gray-700">
              <li>
                <strong className="text-brand">Überhöhter Verkaufspreis (Verlust: 3.000-6.000€):</strong> Der häufigste
                und teuerste Fehler. Monatelange Wartezeit, verpasste Käufer, am Ende doch Preisreduktion mit
                Signalwirkung &quot;Problem-Pferd&quot;.
              </li>
              <li>
                <strong className="text-brand">Schlechte Fotos (Verlust: 1.500-3.000€):</strong> Verwackelte,
                dunkle oder unscharfe Bilder reduzieren Anfragen um 70%. Professionelle Fotos amortisieren
                sich mehrfach.
              </li>
              <li>
                <strong className="text-brand">Unvollständige Inserat-Beschreibung (Verlust: 1.000-2.000€):</strong> Fehlende
                Angaben zu Ausbildung, Gesundheit oder Charakter schrecken seriöse Käufer ab.
              </li>
              <li>
                <strong className="text-brand">Keine AKU anbieten (Verlust: 2.000-4.000€):</strong> Käufer sind
                bereit, 10-20% mehr zu zahlen, wenn eine aktuelle AKU ohne Befund vorliegt.
              </li>
              <li>
                <strong className="text-brand">Emotionale Verkaufsgespräche (Verlust: 500-1.500€):</strong> Argumente
                wie &quot;Ich habe so viel investiert&quot; sind kontraproduktiv. Bleiben Sie sachlich.
              </li>
              <li>
                <strong className="text-brand">Falscher Verkaufszeitpunkt (Verlust: 1.000-2.500€):</strong> Im Winter
                (November-Februar) sind Preise 10-15% niedriger als im Frühjahr/Sommer.
              </li>
              <li>
                <strong className="text-brand">Mängel verschweigen (Verlust: 5.000-15.000€):</strong> Arglistig verschwiegene
                Mängel können zu Schadenersatzforderungen führen, auch bei Privatverkauf!
              </li>
            </ol>
            <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
              Eine professionelle Bewertung für {PRICING_FORMATTED.current} verhindert bereits Fehler #1 und
              amortisiert sich tausendfach.
            </p>
          </RatgeberHighlightBox>
        </section>

        {/* Schritt-für-Schritt-Anleitung */}
        <section id="schritt-anleitung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Pferd verkaufen: Die komplette Schritt-für-Schritt-Anleitung
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Folgen Sie dieser bewährten 9-Schritte-Methode für einen erfolgreichen und rechtssicheren Verkauf.
          </p>

          {/* STRATEGIC BOX #3: Important Checklist */}
          <RatgeberHighlightBox
            title="Verkaufs-Checkliste: Die 9 Schritte zum Erfolg"
            icon={<CheckCircle className="h-5 w-5 text-brand-brown" />}
          >
            <ol className="space-y-4 list-decimal list-inside text-sm md:text-base text-gray-700">
              <li>
                <strong className="text-brand">Pferdewert ermitteln (Dauer: 2 Min):</strong> Nutzen Sie
                PferdeWert.de für eine objektive KI-Bewertung. Vermeiden Sie emotionale Überschätzung.
              </li>
              <li>
                <strong className="text-brand">Professionelle Fotos erstellen (Dauer: 2-3 Std):</strong> Mindestens
                10 Bilder: Ganzkörper von beiden Seiten, Kopf, Detail-Beine, unter dem Sattel, bei der Arbeit.
              </li>
              <li>
                <strong className="text-brand">Detailliertes Inserat schreiben (Dauer: 1-2 Std):</strong> Ehrliche
                Beschreibung von Ausbildung, Charakter, Gesundheit, Eignung. Keywords nutzen für Auffindbarkeit.
              </li>
              <li>
                <strong className="text-brand">Plattformen wählen (Dauer: 30 Min):</strong> Hochwertig: ehorses.de,
                Freizeit: pferde.de, Regional: kleinanzeigen.de. Mehrfach-Veröffentlichung erhöht Reichweite.
              </li>
              <li>
                <strong className="text-brand">Anfragen professionell beantworten (laufend):</strong> Antwort innerhalb
                24h, sachlich bleiben, Fragen zu Erfahrung/Verwendungszweck stellen.
              </li>
              <li>
                <strong className="text-brand">Besichtigungen organisieren (Dauer: 1-2 Std pro Termin):</strong> Ruhige
                Umgebung, Pferd vorführen (Führen, Putzen, Reiten), Interessent probelaufen lassen.
              </li>
              <li>
                <strong className="text-brand">Preisverhandlung führen (Dauer: 30 Min - 1 Std):</strong> Sachliche
                Argumentation, professionelle Bewertung als Grundlage, Verhandlungsspielraum 10-15% einplanen.
              </li>
              <li>
                <strong className="text-brand">AKU ermöglichen (Dauer: 2-4 Std):</strong> Käufer zahlt, unabhängiger
                Tierarzt, alle Ergebnisse transparent kommunizieren.
              </li>
              <li>
                <strong className="text-brand">Kaufvertrag & Übergabe (Dauer: 1-2 Std):</strong> Schriftlicher Vertrag
                (FN-Vorlage), alle Papiere (Equidenpass, Eigentumsurkunde), Zahlungsbestätigung vor Übergabe.
              </li>
            </ol>
            <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
              Gesamtdauer vom Bewertung bis Übergabe: 6-12 Wochen bei realistischem Preis
            </p>
          </RatgeberHighlightBox>
        </section>

        {/* KI-Bewertung */}
        <section id="ki-bewertung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            KI-gestützte Pferdebewertung: So funktioniert PferdeWert.de
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Moderne Künstliche Intelligenz revolutioniert die Pferdebewertung. Erfahren Sie, wie unser
            duales KI-System (GPT-4 + Claude) in nur 2 Minuten objektive Marktwerte berechnet.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Die Technologie hinter PferdeWert.de
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Unser System kombiniert zwei führende KI-Modelle (GPT-4 von OpenAI und Claude von Anthropic),
            um maximale Präzision zu erreichen. Beide Systeme wurden mit tausenden Pferdedaten trainiert
            und von erfahrenen Reitern validiert.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Was die KI analysiert (50+ Kriterien)
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li>• Rasse, Alter, Geschlecht, Größe, Farbe</li>
            <li>• Ausbildungsstand (Basis, A-, L-, M-, S-Niveau)</li>
            <li>• Turniererfolge und Platzierungen</li>
            <li>• Gesundheitszustand und AKU-Befunde</li>
            <li>• Charakter und Eignung (Anfänger, Fortgeschrittene, Profis)</li>
            <li>• Abstammung und Zuchtlinien</li>
            <li>• Aktuelle Markttrends und regionale Preisunterschiede</li>
            <li>• Saisonale Schwankungen</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Warum zwei KI-Modelle besser sind als eines
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Unterschiedliche KI-Systeme haben unterschiedliche Stärken. GPT-4 ist hervorragend bei der
            Marktdatenanalyse und Trendprognosen, während Claude besonders stark bei komplexen Faktoren
            wie Charakterbewertung und Eignungsanalyse ist. Die Kombination beider Systeme erhöht die
            Genauigkeit um durchschnittlich 23% gegenüber Einzelsystemen.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            So läuft Ihre Bewertung ab (2 Minuten)
          </h3>

          <ol className="space-y-3 list-decimal list-inside text-gray-700">
            <li>
              <strong className="text-brand">Fragebogen ausfüllen (90 Sekunden):</strong> Einfache Fragen
              zu Ihrem Pferd (Rasse, Alter, Ausbildung, Gesundheit, Charakter)
            </li>
            <li>
              <strong className="text-brand">KI-Analyse (30 Sekunden):</strong> Beide Systeme analysieren
              parallel Ihre Angaben und vergleichen mit Marktdaten
            </li>
            <li>
              <strong className="text-brand">Ergebnis erhalten (sofort):</strong> Detaillierter Bewertungsbericht
              mit Preisspanne, Verkaufsempfehlungen und Optimierungstipps
            </li>
          </ol>

          <p className="text-gray-700 leading-relaxed mt-6">
            <strong>Investition:</strong> {PRICING_FORMATTED.current} für die KI-Bewertung amortisieren sich
            bereits bei 1% Mehrerlös. Bei einem 5.000€ Pferd sind das 50€ – Sie zahlen {PRICING_FORMATTED.current}
            und gewinnen potenziell hunderte bis tausende Euro.
          </p>

          <div className="mt-6">
            <CTAButton type="primary" href="/pferde-preis-berechnen" text="Jetzt KI-Bewertung starten" />
          </div>
        </section>

        {/* Preisverhandlung */}
        <section id="preisverhandlung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Preisverhandlung meistern: Psychologie & Taktik
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Die richtige Verhandlungsstrategie kann den Unterschied zwischen gutem und optimalem Preis ausmachen.
            Lernen Sie die wichtigsten psychologischen Prinzipien und taktischen Werkzeuge.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Preisanker setzen
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Der erste genannte Preis (Anker) beeinflusst die gesamte Verhandlung. Setzen Sie Ihren Verkaufspreis
            10-15% über Ihrem Minimalpreis, aber bleiben Sie im realistischen Rahmen. Ein absurd hoher Anker
            schreckt seriöse Käufer ab.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Objektive Argumente nutzen
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Emotionale Argumente wie &quot;Ich habe so viel investiert&quot; überzeugen nicht. Nutzen Sie stattdessen:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• Professionelle Bewertung (z.B. von PferdeWert.de)</li>
            <li>• Vergleichbare Verkaufspreise auf Plattformen</li>
            <li>• Aktuelle AKU ohne Befund</li>
            <li>• Turniererfolge und Platzierungen</li>
            <li>• Ausbildungsstand und Spezialisierung</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Verhandlungsspielraum kommunizieren
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Formulieren Sie Ihren Preis geschickt: &quot;Der Preis liegt bei 7.500€ – ich bin allerdings
            gesprächsbereit bei einem schnellen Abschluss.&quot; Dies signalisiert Flexibilität ohne Schwäche.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Win-Win-Lösungen finden
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Manchmal sind kreative Lösungen besser als Preisreduzierungen:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• Sattel und Zubehör im Preis einbeziehen</li>
            <li>• Kostenlose Eingewöhnungsphase (1-2 Wochen Probe)</li>
            <li>• Transport organisieren</li>
            <li>• Unterstützung bei der Eingewöhnung anbieten</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Timing ist entscheidend
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Verhandeln Sie nicht sofort beim ersten Kontakt. Lassen Sie den Interessenten zuerst das Pferd
            kennenlernen. Nach einer erfolgreichen Besichtigung ist die Zahlungsbereitschaft 15-25% höher.
          </p>
        </section>

        {/* Rechtliche Aspekte */}
        <section id="rechtliche-aspekte" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
            Rechtliche Aspekte: Kaufvertrag, Gewährleistung & Haftung
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Der Pferdeverkauf unterliegt klaren rechtlichen Vorgaben. Schützen Sie sich vor späteren
            Rechtsstreitigkeiten durch korrekte Vertragsgestaltung und transparente Kommunikation.
          </p>

          {/* STRATEGIC BOX #4: Legal Warning */}
          <RatgeberHighlightBox
            title="Rechtliche Fallstricke: Das MUSS in den Kaufvertrag"
            icon={<Shield className="h-5 w-5 text-brand-brown" />}
          >
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Ein ordentlicher Kaufvertrag ist Pflicht – nicht nur für gewerbliche Verkäufer, sondern auch
              für Privatpersonen. Folgende Punkte sind zwingend erforderlich:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-sm md:text-base text-gray-700">
              <li>
                <strong className="text-brand">Vollständige Parteienangaben:</strong> Name, Adresse, Geburtsdatum
                von Käufer und Verkäufer
              </li>
              <li>
                <strong className="text-brand">Detaillierte Pferdebeschreibung:</strong> Name, Rasse, Alter,
                Geschlecht, Farbe, Abzeichen, Chipnummer (UELN)
              </li>
              <li>
                <strong className="text-brand">Kaufpreis und Zahlungsmodalitäten:</strong> Gesamtpreis, Anzahlung,
                Restzahlung, Zahlungsfrist
              </li>
              <li>
                <strong className="text-brand">Gesundheitszustand und Mängel:</strong> Bekannte Erkrankungen,
                Verletzungen, Verhaltensauffälligkeiten MÜSSEN angegeben werden
              </li>
              <li>
                <strong className="text-brand">Gewährleistungsausschluss (bei Privatverkauf):</strong> Klare
                Formulierung &quot;Gekauft wie gesehen&quot; + Ausschluss der Sachmängelhaftung
              </li>
              <li>
                <strong className="text-brand">Übergabezeitpunkt und -ort:</strong> Wann und wo findet die
                Übergabe statt?
              </li>
              <li>
                <strong className="text-brand">Eigentumsübergang:</strong> Wann geht das Eigentum über? (meist
                mit vollständiger Zahlung)
              </li>
              <li>
                <strong className="text-brand">Unterschriften beider Parteien:</strong> Handschriftlich, Ort und Datum
              </li>
            </ol>
            <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
              ⚠️ Wichtig: Auch bei Gewährleistungsausschluss haften Sie für arglistig verschwiegene Mängel!
              Dokumentieren Sie alles ehrlich.
            </p>
            <p className="text-sm text-gray-600 mt-3 italic">
              Empfehlung: Nutzen Sie die offiziellen Kaufvertragsvorlagen der FN (Deutsche Reiterliche Vereinigung).
            </p>
          </RatgeberHighlightBox>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Gewährleistung: Privat vs. Gewerblich
          </h3>

          <p className="text-gray-700 leading-relaxed">
            <strong className="text-brand">Privatverkauf:</strong> Sie können die Gewährleistung komplett
            ausschließen (&quot;Gekauft wie gesehen&quot;). Aber Achtung: Bei arglistig verschwiegenen Mängeln
            haften Sie trotzdem! Arglist liegt vor, wenn Sie Mängel kannten und bewusst verschwiegen haben.
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            <strong className="text-brand">Gewerblicher Verkauf:</strong> Händler können die gesetzliche
            Gewährleistung (24 Monate) auf 12 Monate verkürzen, aber nicht komplett ausschließen. Bei
            gebrauchten Pferden ist eine Verkürzung auf 12 Monate üblich und rechtlich zulässig.
          </p>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Häufige Rechtsstreitigkeiten und wie Sie sie vermeiden
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong className="text-brand">Verschweigen von Erkrankungen:</strong> Dokumentieren Sie
              alle bekannten Gesundheitsprobleme schriftlich im Vertrag. Bei Unsicherheit: Tierärztliches
              Attest einholen.
            </li>
            <li>
              <strong className="text-brand">Falsche Altersangaben:</strong> Geben Sie das korrekte Alter
              an, wie im Equidenpass vermerkt. Falsche Angaben können als Betrug gewertet werden.
            </li>
            <li>
              <strong className="text-brand">Verschweigen von Verhaltensauffälligkeiten:</strong> Buckeln,
              Beißen, Durchgehen sind meldepflichtige Eigenschaften. Verschweigen kann zu Rücktritt führen.
            </li>
            <li>
              <strong className="text-brand">Unklare Zahlungsmodalitäten:</strong> Legen Sie fest: Wann
              wird gezahlt? Wie (Bar, Überweisung)? Wann erfolgt die Übergabe? Erst nach Zahlungseingang!
            </li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-brand mt-8">
            Dokumente bei Übergabe
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Folgende Dokumente müssen Sie dem Käufer übergeben:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Equidenpass:</strong> Zwingend erforderlich für Eigentumsübertragung</li>
            <li>• <strong>Eigentumsurkunde:</strong> Falls vorhanden (bei Zuchtpferden)</li>
            <li>• <strong>Abstammungsnachweis:</strong> Bei Zuchtpferden</li>
            <li>• <strong>Gesundheitszeugnisse:</strong> AKU-Berichte, Impfpass, Wurmkuren-Protokoll</li>
            <li>• <strong>Turnierunterlagen:</strong> Platzierungsurkunden, Leistungsnachweise</li>
          </ul>
        </section>

        {/* FAQ */}
        <FAQ faqs={faqItems} />

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weiterführende Ratgeber"
          articles={relatedArticles}
          description="Vertiefen Sie Ihr Wissen rund um Pferdekauf, -verkauf und Bewertung."
        />

        {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: "/images/ratgeber/pferd-verkaufen-final.jpg",
              alt: "Pferd erfolgreich verkaufen - Jetzt starten"
            }}
            title="Bereit für den erfolgreichen Verkauf?"
            description={`Starten Sie jetzt mit einer professionellen KI-Bewertung für nur ${PRICING_FORMATTED.current} und verkaufen Sie Ihr Pferd zum optimalen Preis. Objektiv, schnell, präzise – entwickelt von erfahrenen Reitern.`}
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Verkaufspreis berechnen"
          />      </div>
    </Layout>
  );
};

export default PferdVerkaufen;
