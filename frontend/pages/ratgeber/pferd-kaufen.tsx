import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Layout from '../../components/Layout';
import RatgeberHero from '../../components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '../../components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '../../components/ratgeber/RatgeberTableOfContents';
import ContentSection from '../../components/ratgeber/ContentSection';
import RatgeberHighlightBox from '../../components/ratgeber/RatgeberHighlightBox';
import RatgeberInfoTiles from '../../components/ratgeber/RatgeberInfoTiles';
import InfoBox from '../../components/InfoBox';
import FAQ from '../../components/FAQ';
import RatgeberRelatedArticles from '../../components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '../../components/ratgeber/RatgeberFinalCTA';
import CTAButton from '../../components/CTAButton';

const PferdKaufen: NextPage = () => {
  const sections = [
    { id: 'preise', title: 'Was kostet ein Pferd?' },
    { id: 'checkliste', title: '7-Schritte-Checkliste' },
    { id: 'anfaenger', title: 'Pferd für Anfänger' },
    { id: 'regional', title: 'Regionale Unterschiede' },
    { id: 'fehler', title: 'Fehler vermeiden' },
    { id: 'preiserkennung', title: 'Faire Preise erkennen' },
    { id: 'vergleich', title: 'Online vs. Händler vs. Privat' },
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

  const kostenTiles = [
    { label: 'Freizeitpferde', value: '1.500€ – 8.000€' },
    { label: 'Dressurpferde', value: '5.000€ – 30.000€+' },
    { label: 'Springpferde', value: '5.000€ – 50.000€+' },
    { label: 'Fohlen', value: '800€ – 5.000€' },
    { label: 'Reitponys', value: '2.000€ – 10.000€' },
    { label: 'Folgekosten/Jahr', value: '4.000€ – 8.000€' }
  ];

  const relatedArticles = [
    {
      href: '/ratgeber/aku-pferd',
      image: '/images/ratgeber/aku-pferd-hero.jpg',
      title: 'AKU beim Pferd: Kosten, Ablauf & Klassen 2025',
      badge: 'Kaufsicherheit',
      readTime: 12,
      description: 'Alles zur Ankaufsuntersuchung: Welche AKU-Klasse brauchen Sie? Was wird untersucht? Kompletter Ratgeber für Pferdekäufer.'
    },
    {
      href: '/ratgeber/pferdewert-ermitteln',
      image: '/images/ratgeber/pferdewert-hero.jpg',
      title: 'Pferdewert ermitteln: 5 Methoden im Vergleich',
      badge: 'Bewertung',
      readTime: 8,
      description: 'Wie ermitteln Sie den fairen Marktwert eines Pferdes? Vergleich klassischer Methoden vs. moderne AI-Bewertung.'
    },
    {
      href: '/pferd-verkaufen',
      image: '/images/ratgeber/pferd-verkaufen-hero.jpg',
      title: 'Pferd verkaufen: Optimaler Preis & schneller Verkauf',
      badge: 'Verkauf',
      readTime: 10,
      description: 'Der Ratgeber für Pferdeverkäufer: Optimaler Verkaufspreis, beste Plattformen und rechtliche Aspekte beim Pferdeverkauf.'
    }
  ];

  const faqItems = [
    {
      question: 'Was kostet ein Pferd durchschnittlich?',
      answer: 'Ein Freizeitpferd kostet zwischen 1.500€ und 8.000€. Gut ausgebildete Freizeitpferde mit solidem Charakter liegen bei 3.500€ bis 5.000€. Sportpferde für Dressur oder Springen bewegen sich zwischen 5.000€ und 50.000€, abhängig von Ausbildungsstand und Turniererfolgen. Fohlen und Jungpferde sind mit 800€ bis 5.000€ günstiger, brauchen aber noch mehrere Jahre Ausbildung.'
    },
    {
      question: 'Kann man Pferde für 200-500 Euro kaufen?',
      answer: 'Ja, solche Angebote existieren, aber Vorsicht ist geboten. Pferde in diesem Preissegment haben meist erhebliche Probleme: chronische Erkrankungen, schwere Ausbildungsdefizite, Verhaltensauffälligkeiten oder hohes Alter. Eine gründliche Ankaufsuntersuchung ist hier absolut essentiell. Oft übersteigen die anschließenden Tierarzt- und Ausbildungskosten den niedrigen Kaufpreis um ein Vielfaches. Für Anfänger sind diese Pferde nicht geeignet.'
    },
    {
      question: 'Brauche ich eine Ankaufsuntersuchung?',
      answer: 'Ja, unbedingt! Die AKU ist Ihre wichtigste Absicherung vor teuren Fehlkäufen. Eine kleine AKU kostet 150€ bis 250€, eine große AKU mit Röntgen 400€ bis 600€. Diese Investition kann Sie vor Kosten im fünfstelligen Bereich bewahren. Wählen Sie die AKU-Klasse passend zum Kaufpreis: Bei Pferden unter 3.000€ reicht oft die kleine AKU, bei Pferden über 5.000€ ist die große AKU mit Röntgen Standard.'
    },
    {
      question: 'Wo finde ich Pferde in meiner Nähe?',
      answer: 'Nutzen Sie große Online-Pferdemarktplätze wie ehorses.de, pferde.de oder kleinanzeigen.de mit Regionalfilter. Geben Sie Ihre PLZ oder Ihr Bundesland ein, um nur lokale Angebote zu sehen. Besuchen Sie außerdem lokale Gestüte, Ausbildungsbetriebe und Reiterhöfe. Regionale Pferdemarkt-Events, Hengstparaden und Zuchtschauen sind gute Gelegenheiten für persönliche Kontakte.'
    },
    {
      question: 'Ist ein älteres Pferd besser für Anfänger?',
      answer: 'Ja, in der Regel. Pferde zwischen 8 und 15 Jahren sind ideal für Anfänger. Sie haben einen ausgeglichenen, gefestigten Charakter, umfangreiche Lebenserfahrung und eine solide Ausbildung. Jungpferde unter 6 Jahren sind für Anfänger ungeeignet – sie sind noch unsicher, brauchen erfahrene Ausbilder und können unberechenbar reagieren. Die goldene Mitte liegt bei 8-15 Jahren.'
    },
    {
      question: 'Wie erkenne ich einen seriösen Verkäufer?',
      answer: 'Seriöse Verkäufer zeigen vollständige Papiere (Equidenpass, Eigentumsurkunde), sind transparent über Gesundheitszustand und Vorgeschichte des Pferdes, ermöglichen mehrfache Besichtigungen und Proberitte, stimmen einer unabhängigen Ankaufsuntersuchung durch Ihren Tierarzt zu und drängen nicht zu schnellen Entscheidungen. Warnsignale: Zeitdruck, Verweigerung von AKU oder Proberitt, unvollständige Papiere, unrealistisch günstige Preise ohne erkennbaren Grund.'
    },
    {
      question: 'Lohnt sich eine Pferdebewertung vor dem Kauf?',
      answer: 'Absolut! Eine objektive Bewertung des Marktwerts verschafft Ihnen entscheidende Vorteile: Sie wissen vor der Verhandlung, ob der Preis fair oder überteuert ist, Sie können selbstbewusster verhandeln und Sie vermeiden Überzahlung um mehrere tausend Euro. Mit PferdeWert.de erhalten Sie in nur 2 Minuten eine AI-gestützte Bewertung für nur 19,90€. Unser Algorithmus berücksichtigt über 50 Kriterien sowie aktuelle Marktdaten.'
    }
  ];

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pferd kaufen: Der ultimative Ratgeber für 2025',
    description: 'Umfassender Ratgeber zum Pferdekauf mit Preisübersicht, Checkliste, Anfänger-Tipps und AI-Bewertung für faire Preise.',
    image: 'https://pferdewert.de/images/articles/pferd-kaufen-ratgeber.jpg',
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
        url: 'https://pferdewert.de/logo.png'
      }
    },
    datePublished: '2025-09-30',
    dateModified: '2025-09-30',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://pferdewert.de/ratgeber/pferd-kaufen'
    },
    inLanguage: 'de-DE'
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
        name: 'Pferd kaufen',
        item: 'https://pferdewert.de/ratgeber/pferd-kaufen'
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <title>Pferd kaufen 2025: Checkliste, Preise & Expertentipps</title>
        <meta
          name="description"
          content="Pferd kaufen leicht gemacht ✓ Was kostet ein Pferd? ✓ Checkliste für Käufer ✓ Faire Preise erkennen ✓ AI-Bewertung in 2 Min ➜ Jetzt informieren!"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://pferdewert.de/ratgeber/pferd-kaufen" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Pferd kaufen 2025: Der ultimative Ratgeber" />
        <meta property="og:description" content="Entdecken Sie den kompletten Ratgeber zum Pferdekauf: Preise, Checkliste, Fehler vermeiden & faire Preise erkennen mit AI-Bewertung." />
        <meta property="og:url" content="https://pferdewert.de/ratgeber/pferd-kaufen" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/og/pferd-kaufen-ratgeber.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen 2025: Checkliste & Expertentipps" />
        <meta name="twitter:description" content="Der ultimative Ratgeber zum Pferdekauf ✓ Preise ✓ Checkliste ✓ AI-Bewertung" />
        <meta name="twitter:image" content="https://pferdewert.de/images/og/pferd-kaufen-ratgeber.jpg" />

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
          badge="Kaufberatung"
          title="Pferd kaufen: Der ultimative Ratgeber für 2025"
          subtitle="Sie träumen davon, endlich Ihr eigenes Pferd zu besitzen? Der Kauf eines Pferdes ist eine der aufregendsten Entscheidungen im Leben eines Reiters – aber auch eine der komplexesten. Dieser umfassende Ratgeber führt Sie durch jeden Schritt: von der Budgetplanung über die Verkäuferauswahl bis zur professionellen Ankaufsuntersuchung."
          readTime={11}
          lastUpdated="30.09.2025"
          category="Pferdekauf"
          primaryCTA={{
            text: 'Jetzt Pferdewert berechnen',
            href: '/pferde-preis-berechnen'
          }}
          secondaryCTA={{
            text: 'Zum Inhalt',
            onClick: scrollToContent,
            icon: <ChevronDown className="h-5 w-5" />
          }}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/pferd-kaufen-hero.jpg"
          alt="Glückliche Familie kauft ihr erstes Pferd von seriösem Verkäufer"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="content-start">
        <RatgeberTableOfContents
          sections={sections}
          onNavigate={handleNavigate}
        />

        {/* Preisübersicht */}
        <ContentSection id="preise" title="Was kostet ein Pferd? Preisübersicht 2025" icon="💰">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Preise beim Pferdekauf variieren erheblich – von unter 1.000 Euro bis weit über 50.000 Euro.
            Um realistische Erwartungen zu entwickeln, sollten Sie die aktuellen Marktpreise nach Pferdetyp kennen:
          </p>

          <RatgeberInfoTiles tiles={kostenTiles} />

          <div className="mt-8 space-y-6">
            <RatgeberHighlightBox title="Freizeitpferde: 1.500€ – 8.000€" icon="🐴">
              <p>
                Gut ausgebildete Freizeitpferde für entspannte Ausritte und leichte Dressurarbeit bewegen sich
                typischerweise in diesem Preissegment. Ein solides Freizeitpferd mit gutem Charakter und
                Grundausbildung kostet durchschnittlich 3.500€ bis 5.000€.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Dressurpferde: 5.000€ – 30.000€+" icon="🏆">
              <p>
                Pferde mit qualifizierter Dressurausbildung beginnen bei etwa 5.000€ für junge Talente mit
                Basis-Ausbildung. Turniererprobte Dressurpferde mit Erfolgen auf L-Niveau und höher können
                schnell 15.000€ bis 30.000€ kosten. Spitzenpferde mit internationalen Erfolgen erreichen
                Preise im sechsstelligen Bereich.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Springpferde: 5.000€ – 50.000€+" icon="🎯">
              <p>
                Ähnlich wie bei Dressurpferden hängt der Preis stark vom Ausbildungsstand und den Turniererfolgen ab.
                Ein junges Springpferd mit Potenzial startet bei 5.000€ bis 8.000€. Springpferde mit Siegen auf
                S-Niveau kosten regelmäßig 25.000€ bis 50.000€ und mehr.
              </p>
            </RatgeberHighlightBox>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-serif text-brand mb-4">Faktoren, die den Pferde-Preis beeinflussen</h3>
            <div className="space-y-4 text-brand/90 leading-relaxed">
              <p>
                <strong className="text-brand">Rasse und Abstammung:</strong> Warmblüter aus anerkannten Zuchtlinien
                (z.B. Hannoveraner, Oldenburger, Westfalen) sind teurer als Pferde ohne Papiere oder seltene Rassen.
                Die Abstammung von erfolgreichen Hengsten kann den Preis um 2.000€ bis 5.000€ erhöhen.
              </p>
              <p>
                <strong className="text-brand">Alter und Gesundheitszustand:</strong> Pferde zwischen 6 und 12 Jahren
                befinden sich in ihrer besten Phase und erzielen Höchstpreise. Ältere Pferde (15+ Jahre) sind günstiger,
                während sehr junge Pferde (unter 4 Jahren) aufgrund ihres Potenzials teurer sein können.
              </p>
              <p>
                <strong className="text-brand">Ausbildungsstand:</strong> Jeder Ausbildungsschritt erhöht den Wert.
                Ein rohes 3-jähriges Pferd kostet deutlich weniger als ein 5-jähriges mit solider Grundausbildung.
                Spezialisierte Ausbildung (z.B. Westernreining, Vielseitigkeit) steigert den Preis zusätzlich.
              </p>
              <p>
                <strong className="text-brand">Turniererfolge:</strong> Nachweisliche Erfolge auf Turnieren sind
                direkte Wertsteigerer. Ein Pferd mit Platzierungen auf A-Niveau ist 2.000€ bis 3.000€ mehr wert
                als ein vergleichbares ohne Turniererfahrung.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
            <p className="text-brand/90 leading-relaxed mb-4">
              Die große Preisspanne macht deutlich: Ohne Marktkenntnisse riskieren Sie, mehrere tausend Euro zu viel
              zu bezahlen. Mit PferdeWert.de können Sie in nur 2 Minuten den fairen Marktwert eines Pferdes berechnen
              lassen – basierend auf modernster KI-Technologie und aktuellen Marktdaten.
            </p>
            <CTAButton type="primary" href="/pferde-preis-berechnen">
              Jetzt Pferdewert berechnen
            </CTAButton>
          </div>
        </ContentSection>

        {/* 7-Schritte-Checkliste */}
        <ContentSection id="checkliste" title="Die 7-Schritte-Checkliste: So kaufen Sie Ihr Traumpferd" icon="✅">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der strukturierte Ablauf beim Pferdekauf verhindert teure Fehler und emotionale Spontankäufe.
            Folgen Sie dieser bewährten Checkliste:
          </p>

          <div className="space-y-8">
            <RatgeberHighlightBox title="Schritt 1: Budget und Folgekosten kalkulieren" icon="💵">
              <p className="mb-4">
                Der Kaufpreis ist nur der Anfang. Die laufenden Kosten für Pferdehaltung übersteigen den
                Anschaffungspreis oft bereits im ersten Jahr.
              </p>
              <ul className="space-y-2 text-brand/90">
                <li><strong>Stallmiete:</strong> 200€ – 600€/Monat</li>
                <li><strong>Futter und Einstreu:</strong> 100€ – 200€/Monat</li>
                <li><strong>Versicherung:</strong> 15€ – 50€/Monat</li>
                <li><strong>Hufschmied:</strong> 40€ – 120€ alle 6-8 Wochen</li>
                <li><strong>Tierarzt (Routine):</strong> 500€ – 1.500€/Jahr</li>
              </ul>
              <p className="mt-4 font-semibold text-brand">
                Realistische Jahreskosten: 4.000€ – 8.000€ zusätzlich zum Kaufpreis
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 2: Anforderungen definieren" icon="📋">
              <p className="mb-3">Bevor Sie mit der Suche beginnen, klären Sie diese essentiellen Fragen:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li><strong>Ihr Erfahrungslevel:</strong> Anfänger brauchen erfahrene, ausgeglichene Pferde</li>
                <li><strong>Verwendungszweck:</strong> Freizeitreiten, Turnierreiten, Zucht oder Bodenarbeit</li>
                <li><strong>Rasse und Charakter:</strong> Warmblüter, Kaltblüter, Ponys, Westernpferde</li>
                <li><strong>Alter:</strong> Ideal für Anfänger sind 8-15 Jahre alte Pferde</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 3: Seriöse Verkaufsplattformen nutzen" icon="🔍">
              <p className="mb-3">Die großen Online-Pferdemarktplätze bieten die größte Auswahl:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li><strong>ehorses.de:</strong> Größter europäischer Pferdemarkt mit über 19.000 Inseraten</li>
                <li><strong>pferde.de:</strong> Etabliertes deutsches Portal mit Community-Funktionen</li>
                <li><strong>kleinanzeigen.de:</strong> Regionale Nähe, aber gemischte Qualität</li>
                <li><strong>Lokale Züchter/Händler:</strong> Persönliche Beratung, oft höhere Preise</li>
              </ul>
              <div className="mt-4 p-4 bg-white rounded-md">
                <p className="text-sm text-brand/80 mb-2">
                  💡 <strong>Kritischer Tipp:</strong> Bevor Sie in Kaufverhandlungen gehen, sollten Sie wissen,
                  ob der angebotene Preis fair ist.
                </p>
                <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                  Mit der AI-Bewertung von PferdeWert.de erhalten Sie in 2 Minuten eine objektive Einschätzung →
                </Link>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 4: Besichtigung professionell vorbereiten" icon="👁️">
              <p className="mb-3">Die erste Besichtigung entscheidet oft über Kauf oder Absage:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li>Nehmen Sie eine erfahrene Person mit (Reitlehrer, Trainer)</li>
                <li>Beobachten Sie das Pferd zunächst in der Box und auf der Weide</li>
                <li>Lassen Sie den Verkäufer das Pferd putzen, satteln und vorführen</li>
                <li>Achten Sie auf Handling beim Führen, Putzen und Satteln</li>
                <li>Vereinbaren Sie mindestens 2 Probetermine an verschiedenen Tagen</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 5: Ankaufsuntersuchung (AKU) durchführen" icon="🏥">
              <p className="mb-4">
                Die Ankaufsuntersuchung ist der wichtigste Schritt zum Schutz vor Fehlkäufen.
                <strong> Niemals sollten Sie ein Pferd ohne AKU kaufen.</strong>
              </p>
              <div className="space-y-3">
                <p><strong>AKU-Klassen und Kosten:</strong></p>
                <ul className="space-y-2 list-disc list-inside text-brand/90">
                  <li><strong>Kleine AKU (150€ – 250€):</strong> Klinische Untersuchung ohne Röntgen</li>
                  <li><strong>Große AKU (400€ – 600€):</strong> Inklusive Röntgen, Standard für Turnierpferde</li>
                  <li><strong>Erweiterte AKU (800€ – 1.200€):</strong> Zusätzlich Ultraschall, Endoskopie</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  ℹ️ Weitere Details finden Sie in unserem ausführlichen{' '}
                  <Link href="/ratgeber/aku-pferd" className="text-brand-brown hover:underline font-medium">
                    AKU-Ratgeber
                  </Link>
                </p>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 6: Kaufvertrag und Rechtliches" icon="📝">
              <p className="mb-3">
                Ein schriftlicher Kaufvertrag ist beim Pferdekauf rechtlich nicht vorgeschrieben,
                aber dringend empfohlen.
              </p>
              <p className="mb-3"><strong>Wichtige Vertragsklauseln:</strong></p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li>Vollständige Angaben zu Käufer und Verkäufer</li>
                <li>Detaillierte Pferdebeschreibung (Name, Rasse, Alter, Chipnummer)</li>
                <li>Kaufpreis und Zahlungsmodalitäten</li>
                <li>Aussagen zu Gesundheit und bekannten Mängeln</li>
                <li>Regelung zur AKU und Rücktrittsrecht</li>
              </ul>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Schritt 7: Transport und Eingewöhnung" icon="🚛">
              <p className="mb-3">Nach erfolgreichem Kauf steht der Transport in den neuen Stall an:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li><strong>Pferdetransport:</strong> 1€ – 2,50€ pro km, versicherter Transporter</li>
                <li><strong>Versicherung:</strong> Haftpflicht bereits vor Übergabe abschließen</li>
                <li><strong>Eingewöhnung:</strong> 2-4 Wochen mit leichter Arbeit einplanen</li>
              </ul>
            </RatgeberHighlightBox>
          </div>
        </ContentSection>

        {/* Pferd für Anfänger */}
        <ContentSection id="anfaenger" title="Pferd für Anfänger kaufen: Worauf achten?" icon="🌱">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der Kauf des ersten eigenen Pferdes ist ein besonderer Moment – aber auch eine Herausforderung
            für unerfahrene Käufer. Diese Aspekte sind speziell für Anfänger wichtig:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif text-brand mb-4">Charaktermerkmale anfängertauglicher Pferde</h3>
              <p className="mb-3 text-brand/90">Ein Anfängerpferd sollte diese Eigenschaften mitbringen:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li><strong>Gelassenheit:</strong> Ruhiges Temperament, nicht schreckhaft</li>
                <li><strong>Geduld:</strong> Verzeiht Fehler des Reiters</li>
                <li><strong>Gehorsam:</strong> Reagiert auf Hilfen, ohne stur oder dominant zu sein</li>
                <li><strong>Gesundheit:</strong> Keine chronischen Erkrankungen oder Schmerzprobleme</li>
                <li><strong>Erfahrung:</strong> Kennt verschiedene Situationen (Gelände, Halle, Verkehr)</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-brand/90">
                  <strong>⚠️ Warnung:</strong> Ein &quot;Anfängerpferd&quot; ist nicht dasselbe wie ein günstiges oder
                  altes Pferd. Viele günstige Angebote sind problembehaftet – schwierig im Umgang, gesundheitlich
                  angeschlagen oder unzureichend ausgebildet.
                </p>
              </div>
            </div>

            <RatgeberHighlightBox title="Geeignete Rassen für Einsteiger" icon="🐎">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-brand mb-1">Haflinger (2.500€ – 6.000€)</p>
                  <p className="text-brand/90">
                    Robust, ausgeglichen, gutmütig. Ideale Allrounder für Freizeit und leichte Arbeit.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-1">Norwegische Fjordpferde (3.000€ – 7.000€)</p>
                  <p className="text-brand/90">
                    Ruhig, zuverlässig, sozial verträglich. Starker Will-to-please.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-1">Quarter Horses (3.500€ – 10.000€)</p>
                  <p className="text-brand/90">
                    Gelassen, menschenbezogen, vielseitig. Besonders im Westernbereich beliebt.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brand mb-1">Freiberger (4.000€ – 8.000€)</p>
                  <p className="text-brand/90">
                    Vielseitig, robust, unkompliziert. Schweizer Rasse für Fahren und Reiten.
                  </p>
                </div>
              </div>
            </RatgeberHighlightBox>

            <div>
              <h3 className="text-2xl font-serif text-brand mb-4">Das richtige Alter für Anfänger</h3>
              <div className="space-y-4">
                <InfoBox type="cost" icon="✅">
                  <p className="font-semibold text-brand-brown mb-2">Ideal: 8-15 Jahre</p>
                  <p className="text-brand/90">
                    Pferde in diesem Alter haben genügend Erfahrung, einen gefestigten Charakter und sind
                    körperlich noch fit. Ein 10-jähriges, gut ausgebildetes Pferd ist oft die beste Wahl.
                  </p>
                </InfoBox>

                <InfoBox type="cost" icon="⚠️">
                  <p className="font-semibold text-brand-brown mb-2">Zu jung: unter 6 Jahre</p>
                  <p className="text-brand/90">
                    Junge Pferde sind noch in der Ausbildung, oft unsicher und brauchen erfahrene Reiter.
                    Für Anfänger ungeeignet.
                  </p>
                </InfoBox>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <p className="text-brand/90 leading-relaxed mb-4">
                <strong>Sind Sie unsicher, ob ein Pferd zu Ihnen passt?</strong> Nutzen Sie die PferdeWert.de
                AI-Bewertung, um den fairen Marktwert zu ermitteln. Ein realistischer Preis ist oft ein Indikator
                für die Qualität des Angebots – unrealistisch günstige Preise sollten Sie stutzig machen.
              </p>
              <CTAButton type="primary" href="/pferde-preis-berechnen">
                Jetzt Pferdewert berechnen
              </CTAButton>
            </div>
          </div>
        </ContentSection>

        {/* Regionale Unterschiede */}
        <ContentSection id="regional" title="Regionale Unterschiede: Wo kauft man Pferde am besten?" icon="📍">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Der deutsche Pferdemarkt ist regional unterschiedlich geprägt. Je nach Bundesland finden Sie
            verschiedene Schwerpunkte, Preisstrukturen und Angebote:
          </p>

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <InfoBox type="cost" icon="📍">
                <h4 className="font-semibold text-brand-brown mb-2">Bayern</h4>
                <p className="text-brand/90 text-sm">
                  Zucht-Hochburg mit Premium-Preisen. Warmblüter aus erfolgreichen Zuchtlinien.
                  Preise 10-15% über Bundesdurchschnitt, dafür erstklassige Qualität.
                </p>
              </InfoBox>

              <InfoBox type="cost" icon="📍">
                <h4 className="font-semibold text-brand-brown mb-2">Nordrhein-Westfalen</h4>
                <p className="text-brand/90 text-sm">
                  Größter Pferdemarkt Deutschlands mit über 300.000 Pferden. Größte Auswahl aller Kategorien.
                  Münsterland und Warendorf als Zentren.
                </p>
              </InfoBox>

              <InfoBox type="cost" icon="📍">
                <h4 className="font-semibold text-brand-brown mb-2">Niedersachsen</h4>
                <p className="text-brand/90 text-sm">
                  Hannoveraner-Heimat. Erstklassige Sportpferde, besonders im Raum Verden.
                  Preise im oberen Segment für hochwertige Turnierpferde.
                </p>
              </InfoBox>
            </div>

            <RatgeberHighlightBox title="Preisunterschiede zwischen Regionen" icon="💰">
              <p className="mb-3">Regionale Preisunterschiede von 5-15% sind normal:</p>
              <ul className="space-y-2 list-disc list-inside text-brand/90">
                <li><strong>Teuer:</strong> München, Hamburg, Frankfurt (Großstadtnähe)</li>
                <li><strong>Mittel:</strong> Ländliche Gebiete in Bayern, NRW, Niedersachsen</li>
                <li><strong>Günstiger:</strong> Ostdeutsche Bundesländer, Brandenburg, Mecklenburg-Vorpommern</li>
              </ul>
            </RatgeberHighlightBox>

            <div>
              <h3 className="text-2xl font-serif text-brand mb-4">Vorteile lokaler Käufe</h3>
              <ul className="space-y-3 text-brand/90">
                <li>
                  <strong className="text-brand">Persönliche Besichtigung:</strong> Mehrfache Besuche
                  ohne hohe Fahrtkosten
                </li>
                <li>
                  <strong className="text-brand">Günstigerer Transport:</strong> Kurze Wege sparen
                  Kosten und Stress für das Pferd
                </li>
                <li>
                  <strong className="text-brand">Netzwerk aufbauen:</strong> Kontakt zu anderen Reitern,
                  Tierärzten und Hufschmieden
                </li>
                <li>
                  <strong className="text-brand">Nachkontakte möglich:</strong> Bei Problemen Verkäufer
                  leichter erreichbar
                </li>
              </ul>
            </div>
          </div>
        </ContentSection>

        {/* Häufige Fehler */}
        <ContentSection id="fehler" title="Häufige Fehler beim Pferdekauf vermeiden" icon="⚠️">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Viele Pferdekäufe scheitern oder führen zu Enttäuschungen durch vermeidbare Fehler.
            Lernen Sie aus den häufigsten Fehlern anderer:
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Fehler 1: Emotionaler Kauf ohne objektive Prüfung" icon="💔">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie verlieben sich beim ersten Blick und kaufen überstürzt, ohne kritische Prüfung.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                Nehmen Sie immer eine emotional unbeteiligte, erfahrene Person zur Besichtigung mit.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 2: Überzahlung durch fehlende Marktkenntnis" icon="💸">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie kennen die Marktpreise nicht und glauben der Preisvorstellung des Verkäufers.
                Verkäufer überschätzen ihre Pferde häufig um 20-40%.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Folge:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie zahlen mehrere tausend Euro zu viel für ein Pferd, das diesen Wert objektiv nicht hat.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                Mit der AI-Bewertung von PferdeWert.de erhalten Sie in nur 2 Minuten eine objektive
                Marktwert-Einschätzung – für 19,90€ verschaffen Sie sich Preistransparenz und
                Verhandlungssicherheit.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 3: AKU auslassen oder falsche Klasse wählen" icon="🏥">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie sparen die 200€ für eine kleine AKU oder wählen bei einem 15.000€ Turnierpferd
                nur die kleine statt der großen AKU mit Röntgen.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                <strong>NIEMALS auf die AKU verzichten.</strong> Wählen Sie die AKU-Klasse passend zum
                Kaufpreis. Bei Pferden über 5.000€ ist die große AKU mit Röntgen Standard.
              </p>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Fehler 4: Folgekosten unterschätzen" icon="📊">
              <p className="mb-2"><strong className="text-brand-brown">Das Problem:</strong></p>
              <p className="mb-3 text-brand/90">
                Sie konzentrieren sich nur auf den Kaufpreis und vergessen die laufenden Kosten
                von 400€ bis 700€ pro Monat.
              </p>
              <p className="mb-2"><strong className="text-brand-brown">Die Lösung:</strong></p>
              <p className="text-brand/90">
                Kalkulieren Sie realistisch mit mindestens 5.000€ Jahreskosten (besser 7.000€ mit Puffer).
                Legen Sie eine Notfallreserve von 2.000€ für unvorhergesehene Tierarztkosten an.
              </p>
            </RatgeberHighlightBox>
          </div>
        </ContentSection>

        {/* Faire Preise erkennen */}
        <ContentSection id="preiserkennung" title="So erkennen Sie faire Pferde-Preise" icon="🎯">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Preisfindung beim Pferdekauf ist eine der größten Herausforderungen. Woher wissen Sie,
            ob 8.000€ für ein bestimmtes Pferd angemessen oder überteuert sind?
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Bewertungskriterien verstehen" icon="📐">
              <p className="mb-3">Ein fairer Preis ergibt sich aus der Kombination dieser Faktoren:</p>
              <ul className="space-y-3 text-brand/90">
                <li>
                  <strong className="text-brand">Rasse und Zuchtlinien (Einfluss: 20-30%):</strong><br />
                  Warmblüter aus erfolgreichen Zuchtlinien rechtfertigen deutliche Preisaufschläge.
                </li>
                <li>
                  <strong className="text-brand">Ausbildung und Turnierergebnisse (Einfluss: 30-40%):</strong><br />
                  Jede Ausbildungsstufe erhöht den Wert. A-Niveau: +1.500€-3.000€, L-Niveau: +3.000€-6.000€
                </li>
                <li>
                  <strong className="text-brand">Gesundheit und Alter (Einfluss: 20-30%):</strong><br />
                  Pferde in ihren besten Jahren (6-12) erzielen Höchstpreise. Gesundheitsprobleme
                  senken den Wert um 30-50%.
                </li>
                <li>
                  <strong className="text-brand">Aktueller Markttrend (Einfluss: 10-20%):</strong><br />
                  Modetrends beeinflussen Preise erheblich.
                </li>
              </ul>
            </RatgeberHighlightBox>

            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h4 className="font-semibold text-brand mb-2">Das Problem: Verkäufer überschätzen ihre Pferde</h4>
              <p className="text-brand/90 mb-3">
                Studien und Markterfahrung zeigen: Die meisten privaten Verkäufer überschätzen den Wert
                ihres Pferdes um durchschnittlich <strong>25-35%</strong>. Emotionale Bindung und subjektive
                Wahrnehmung führen zu überhöhten Preisvorstellungen.
              </p>
              <p className="text-brand/90">
                <strong>Für Käufer bedeutet das:</strong> Sie brauchen objektive Bewertungskriterien,
                um nicht überhöhte Forderungen zu akzeptieren.
              </p>
            </div>

            <div className="mt-8 p-6 bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg">
              <h4 className="text-2xl font-serif text-brand mb-4">Die Lösung: AI-gestützte Pferdebewertung</h4>
              <p className="text-brand/90 mb-4 leading-relaxed">
                PferdeWert.de nutzt modernste Künstliche Intelligenz, um den fairen Marktwert eines Pferdes
                in nur 2 Minuten zu berechnen. Unser Algorithmus wurde von erfahrenen Reitern entwickelt und
                berücksichtigt über 50 Bewertungskriterien sowie aktuelle Marktdaten.
              </p>

              <div className="mb-6">
                <p className="font-semibold text-brand mb-3">Die Vorteile für Sie:</p>
                <ul className="space-y-2 text-brand/90">
                  <li>✓ <strong>Verhandlungssicherheit:</strong> Sie wissen, was das Pferd wirklich wert ist</li>
                  <li>✓ <strong>Schnelligkeit:</strong> Ergebnis in 2 Minuten, nicht Tage der Recherche</li>
                  <li>✓ <strong>Objektivität:</strong> KI ohne emotionale Verzerrung</li>
                  <li>✓ <strong>Aktualität:</strong> Berücksichtigt aktuelle Markttrends</li>
                  <li>✓ <strong>Risikofrei:</strong> 30 Tage Geld-zurück-Garantie</li>
                </ul>
              </div>

              <CTAButton type="primary" href="/pferde-preis-berechnen">
                Jetzt Pferdewert berechnen – nur 19,90€
              </CTAButton>
              <p className="text-sm text-brand/70 mt-3 italic">
                Entwickelt von Reitern für Reiter. Mit Geld-zurück-Garantie.
              </p>
            </div>
          </div>
        </ContentSection>

        {/* Online vs. Händler vs. Privat */}
        <ContentSection id="vergleich" title="Pferd kaufen: Online vs. Händler vs. Privat" icon="🔄">
          <p className="text-lg leading-relaxed text-brand/90 mb-6">
            Die Wahl des Verkaufswegs beeinflusst Preis, Sicherheit und Kaufabwicklung erheblich:
          </p>

          <div className="space-y-6">
            <RatgeberHighlightBox title="Online-Pferdemarkt" icon="💻">
              <div className="mb-4">
                <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>Riesige Auswahl (über 19.000 Pferde auf ehorses.de)</li>
                  <li>Einfacher Preisvergleich ähnlicher Angebote</li>
                  <li>Bundesweite Suche mit Filter-Funktionen</li>
                  <li>24/7 Zugriff auf Inserate</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>Keine physische Vorab-Besichtigung</li>
                  <li>Betrugsrisiko bei Fake-Inseraten</li>
                  <li>Transportkosten bei weiter Entfernung</li>
                </ul>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Pferdehändler" icon="🏢">
              <div className="mb-4">
                <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>12 Monate Gewährleistung (oft verkürzt)</li>
                  <li>Professionelle Beratung</li>
                  <li>AKU oft inklusive</li>
                  <li>Probezeit möglich (2-4 Wochen)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>Höhere Preise (10-30% Aufschlag)</li>
                  <li>Verkaufsdruck durch wirtschaftliches Interesse</li>
                  <li>Begrenzete Auswahl (10-50 Pferde)</li>
                </ul>
              </div>
            </RatgeberHighlightBox>

            <RatgeberHighlightBox title="Privatkauf" icon="👤">
              <div className="mb-4">
                <p className="font-semibold text-brand-brown mb-2">Vorteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>Günstigste Option (kein Händler-Aufschlag)</li>
                  <li>Direkte Historie vom Vorbesitzer</li>
                  <li>Oft ehrlichere Informationen</li>
                  <li>Persönlicher Kontakt und Vertrauen</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-brand-brown mb-2">Nachteile:</p>
                <ul className="space-y-1 text-brand/90 text-sm list-disc list-inside">
                  <li>Keine Gewährleistung (&quot;gekauft wie gesehen&quot;)</li>
                  <li>AKU auf eigene Kosten</li>
                  <li>Verhandlungsgeschick erforderlich</li>
                  <li>Keine rechtliche Absicherung bei Mängeln</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-white rounded-md">
                <p className="text-sm text-brand/90">
                  💡 <strong>Faire Preisfindung beim Privatkauf:</strong> Private Verkäufer haben oft
                  unrealistische Preisvorstellungen.{' '}
                  <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-medium">
                    Nutzen Sie die PferdeWert.de AI-Bewertung für klares Preiswissen →
                  </Link>
                </p>
              </div>
            </RatgeberHighlightBox>
          </div>
        </ContentSection>

        {/* FAQ */}
        <div id="faq" className="mt-16">
          <FAQ items={faqItems} />
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefen Sie Ihr Wissen rund um den Pferdekauf"
            articles={relatedArticles}
          />
        </div>

        {/* Final CTA */}
        <div className="mt-16">
          <RatgeberFinalCTA
            title="Pferd kaufen mit Verstand statt Emotion"
            description="Der Kauf eines Pferdes ist eine bedeutende Entscheidung – finanziell, zeitlich und emotional. Mit PferdeWert.de haben Sie einen verlässlichen Partner für faire Pferdebewertung an Ihrer Seite. Unsere KI-Technologie verschafft Ihnen Preistransparenz und Verhandlungssicherheit in nur 2 Minuten."
            buttonText="Jetzt Pferdewert berechnen"
            buttonHref="/pferde-preis-berechnen"
            imageSrc="/images/cta/pferd-bewertung-final.jpg"
            imageAlt="AI-Pferdebewertung in 2 Minuten"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PferdKaufen;