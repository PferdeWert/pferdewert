import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';

interface AKUKlasse {
  nummer: number;
  bezeichnung: string;
  beschreibung: string;
  kaufempfehlung: string;
  risikoeinschätzung: string;
  verwendungszweck: string[];
  häufigkeit: number;
  farbe: string;
  bgColor: string;
  beispiele: string[];
  prognose: string;
  empfehlung: string;
}

interface KlassenStatistik {
  klasse: number;
  prozent: number;
  anzahl: number;
}

const AkuPferdKlassen: NextPage = () => {
  const [selectedKlasse, setSelectedKlasse] = useState<number | null>(null);
  const [showStatistik, setShowStatistik] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const trackKlasseClick = useCallback((klasse: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'aku_klasse_viewed', {
        event_category: 'User Interaction',
        event_label: `Klasse ${klasse}`,
        page_title: 'AKU Pferd Klassen'
      });
      info('GA4 Event: AKU Klasse Viewed', klasse);
    }
  }, []);

  const handleKlasseClick = (klassenNummer: number) => {
    setSelectedKlasse(selectedKlasse === klassenNummer ? null : klassenNummer);
    trackKlasseClick(klassenNummer);
  };

  const akuKlassen: AKUKlasse[] = [
    {
      nummer: 1,
      bezeichnung: 'Ohne Befund',
      beschreibung: 'Keine klinisch relevanten Befunde feststellbar',
      kaufempfehlung: 'Kauf uneingeschränkt empfohlen',
      risikoeinschätzung: 'Sehr gering',
      verwendungszweck: ['Sport', 'Zucht', 'Freizeit', 'Alle Disziplinen'],
      häufigkeit: 15,
      farbe: 'text-green-800',
      bgColor: 'bg-green-50 border-green-200',
      beispiele: [
        'Keine Lahmheiten oder Bewegungsunregelmäßigkeiten',
        'Röntgenbilder ohne pathologische Befunde',
        'Alle Beugeproben negativ',
        'Herz-Kreislauf und Atmung einwandfrei'
      ],
      prognose: 'Ausgezeichnet - Pferd ist sporttauglich und belastbar',
      empfehlung: 'Optimale Grundlage für alle Verwendungszwecke'
    },
    {
      nummer: 2,
      bezeichnung: 'Geringfügige Befunde',
      beschreibung: 'Geringfügige Abweichungen ohne funktionelle Bedeutung',
      kaufempfehlung: 'Kauf meist empfohlen',
      risikoeinschätzung: 'Gering',
      verwendungszweck: ['Sport mit Einschränkungen', 'Zucht', 'Freizeit'],
      häufigkeit: 25,
      farbe: 'text-blue-800',
      bgColor: 'bg-blue-50 border-blue-200',
      beispiele: [
        'Minimale röntgenologische Veränderungen',
        'Leichte Asymmetrien ohne Lahmheit',
        'Geringfügige Herzgeräusche Grad 1',
        'Kleinere Narben oder Hautveränderungen'
      ],
      prognose: 'Gut - Befunde meist ohne Auswirkung auf Leistung',
      empfehlung: 'Regelmäßige Kontrollen und angepasstes Training'
    },
    {
      nummer: 3,
      bezeichnung: 'Mäßige Befunde',
      beschreibung: 'Befunde mit möglicher funktioneller Bedeutung',
      kaufempfehlung: 'Verwendungszweck beachten',
      risikoeinschätzung: 'Mäßig',
      verwendungszweck: ['Freizeit', 'Leichter Sport', 'Eingeschränkte Zucht'],
      häufigkeit: 35,
      farbe: 'text-yellow-800',
      bgColor: 'bg-yellow-50 border-yellow-200',
      beispiele: [
        'Mäßige Arthrose in unbelasteten Gelenken',
        'Positive Beugeproben ohne Lahmheit',
        'Herzgeräusche Grad 2',
        'Atemwegserkrankungen in Remission'
      ],
      prognose: 'Abhängig von Nutzung - regelmäßige Überwachung nötig',
      empfehlung: 'Spezialisierte Betreuung und angepasste Belastung'
    },
    {
      nummer: 4,
      bezeichnung: 'Deutliche Befunde',
      beschreibung: 'Befunde mit wahrscheinlicher funktioneller Bedeutung',
      kaufempfehlung: 'Kauf meist nicht empfohlen',
      risikoeinschätzung: 'Hoch',
      verwendungszweck: ['Eingeschränkte Freizeitnutzung'],
      häufigkeit: 20,
      farbe: 'text-orange-800',
      bgColor: 'bg-orange-50 border-orange-200',
      beispiele: [
        'Deutliche Arthrosen in belasteten Gelenken',
        'Chronische Lahmheiten',
        'Schwere Herzerkrankungen',
        'Atemwegserkrankungen mit Leistungsminderung'
      ],
      prognose: 'Eingeschränkt - erhöhtes Risiko für Verschlechterung',
      empfehlung: 'Nur bei speziellen Anforderungen und intensiver Betreuung'
    },
    {
      nummer: 5,
      bezeichnung: 'Hochgradige Befunde',
      beschreibung: 'Schwerwiegende Befunde mit erheblicher funktioneller Bedeutung',
      kaufempfehlung: 'Kauf nicht empfohlen',
      risikoeinschätzung: 'Sehr hoch',
      verwendungszweck: ['Keine sportliche Nutzung'],
      häufigkeit: 5,
      farbe: 'text-red-800',
      bgColor: 'bg-red-50 border-red-200',
      beispiele: [
        'Hochgradige Arthrosen mit Funktionseinschränkung',
        'Manifeste Lahmheiten',
        'Schwere Herz-Kreislauf-Erkrankungen',
        'Chronische Atemwegserkrankungen'
      ],
      prognose: 'Schlecht - erhebliche Einschränkungen zu erwarten',
      empfehlung: 'Kauf nur in Ausnahmefällen (z.B. Gnadenhof)'
    }
  ];

  const klassenStatistik: KlassenStatistik[] = [
    { klasse: 1, prozent: 15, anzahl: 1500 },
    { klasse: 2, prozent: 25, anzahl: 2500 },
    { klasse: 3, prozent: 35, anzahl: 3500 },
    { klasse: 4, prozent: 20, anzahl: 2000 },
    { klasse: 5, prozent: 5, anzahl: 500 }
  ];

  const entscheidungsHilfe = [
    {
      titel: 'Klasse 1-2: Grünes Licht',
      beschreibung: 'Kaufen Sie mit gutem Gewissen - optimale Voraussetzungen',
      farbe: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      titel: 'Klasse 3: Vorsichtige Abwägung',
      beschreibung: 'Prüfen Sie Verwendungszweck und holen Sie Zweitmeinung ein',
      farbe: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      titel: 'Klasse 4-5: Hohes Risiko',
      beschreibung: 'Überdenken Sie den Kauf - nur in Ausnahmefällen empfehlenswert',
      farbe: 'bg-red-100 border-red-300 text-red-800'
    }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AKU Pferd Klassen verstehen und richtig bewerten",
    "description": "Anleitung zum Verstehen der AKU-Klassen 1-5 bei der Pferde-Ankaufsuntersuchung",
    "image": "https://pferdewert.de/images/aku-klassen-guide.jpg",
    "totalTime": "PT15M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "AKU-Klasse erhalten",
        "text": "Nach der Ankaufsuntersuchung erhalten Sie die AKU-Klasse vom Tierarzt",
        "image": "https://pferdewert.de/images/aku-ergebnis.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Klassenbedeutung verstehen",
        "text": "Verstehen Sie was die Klassen 1-5 für Ihr Pferd bedeuten",
        "image": "https://pferdewert.de/images/aku-klassen-bedeutung.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Kaufentscheidung treffen",
        "text": "Treffen Sie basierend auf der AKU-Klasse eine informierte Kaufentscheidung",
        "image": "https://pferdewert.de/images/kaufentscheidung.jpg"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/images/logo.png",
    "description": "Deutschlands führende Plattform für AI-gestützte Pferdebewertung und Marktanalyse",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-800-PFERDE",
      "contactType": "customer service",
      "availableLanguage": "German"
    },
    "sameAs": [
      "https://www.facebook.com/pferdewert",
      "https://www.instagram.com/pferdewert_de"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Germany"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was bedeutet AKU-Klasse 1 beim Pferd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AKU-Klasse 1 bedeutet 'ohne Befund' - das Pferd ist gesund und der Kauf wird uneingeschränkt empfohlen. Diese Klasse erhalten etwa 15% aller untersuchten Pferde."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man ein Pferd mit AKU-Klasse 3 kaufen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei AKU-Klasse 3 sollten Sie den Verwendungszweck beachten. Für Freizeitreiten oft noch geeignet, für Hochleistungssport kritisch zu betrachten. Holen Sie eine Zweitmeinung ein."
        }
      },
      {
        "@type": "Question",
        "name": "Wie häufig ist AKU-Klasse 4 bei Pferden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Etwa 20% der untersuchten Pferde erhalten AKU-Klasse 4. Diese Pferde haben deutliche Befunde und der Kauf wird meist nicht empfohlen, außer für sehr spezielle Verwendungszwecke."
        }
      },
      {
        "@type": "Question",
        "name": "Kann sich eine AKU-Klasse im Laufe der Zeit ändern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, AKU-Klassen können sich verschlechtern (z.B. durch Alter oder Verletzungen) oder in seltenen Fällen auch verbessern (bei vorübergehenden Befunden). Regelmäßige Nachuntersuchungen sind sinnvoll."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine AKU je nach gewünschter Klasse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Kosten steigen mit der AKU-Klasse: Klasse 1 ca. 200-300€, Klasse 2-3 ca. 400-600€, Klasse 4-5 ca. 800-1.500€ je nach Umfang der Röntgenaufnahmen."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>AKU Pferd Klassen erklärt - 1-5 Bewertung | PferdeWert Ratgeber</title>
        <meta name="description" content="AKU Klassen 1-5 beim Pferd: Bedeutung, Bewertung und Auswirkung auf den Pferdewert. Verstehen Sie die Ankaufsuntersuchung-Ergebnisse." />
        <meta name="keywords" content="aku pferd klassen, aku klasse 1 2 3 4 5, ankaufsuntersuchung bewertung, pferdekauf entscheidung, aku ergebnis verstehen" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.country" content="Germany" />
        <meta name="audience" content="horse buyers, horse owners, equestrian professionals" />
        <meta name="page-topic" content="Horse Purchase Examination Classes" />
        <meta name="page-type" content="Guide" />
        <meta name="content-language" content="de" />
        <link rel="canonical" href="https://pferdewert.de/aku-pferd-klassen" />
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/aku-pferd-klassen" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AKU Pferd Klassen erklärt - 1-5 Bewertung" />
        <meta property="og:description" content="AKU Klassen 1-5 beim Pferd: Bedeutung, Bewertung und Auswirkung auf den Pferdewert. Verstehen Sie die Ankaufsuntersuchung-Ergebnisse." />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd-klassen" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-klassen-overview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd Klassen erklärt - 1-5 Bewertung" />
        <meta name="twitter:description" content="AKU Klassen 1-5 beim Pferd: Bedeutung, Bewertung und Auswirkung auf den Pferdewert. Verstehen Sie die Ankaufsuntersuchung-Ergebnisse." />
        <meta name="twitter:image" content="https://pferdewert.de/images/aku-klassen-overview.jpg" />
        <meta name="twitter:site" content="@pferdewert_de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="prefetch" href="https://pferdewert.de/aku-pferd" />
        <link rel="prefetch" href="https://pferdewert.de/aku-pferd-kosten" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-blue-500/20 px-4 py-2 rounded-full text-blue-100 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                Bewertungssystem erklärt
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AKU Pferd Klassen
                <span className="block text-2xl md:text-3xl text-blue-200 font-normal mt-2">
                  1-5 Bewertung verständlich erklärt
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Bedeutung, Bewertung und Auswirkung auf den Pferdewert - Verstehen Sie die Ankaufsuntersuchung-Ergebnisse
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('klassen-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Klassen verstehen
                </button>
                <button
                  onClick={() => setShowStatistik(!showStatistik)}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200"
                >
                  Statistiken zeigen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                AKU-Klassen auf einen Blick
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Von Klasse 1 (ohne Befund) bis Klasse 5 (hochgradige Befunde)
              </p>

              <div className="grid md:grid-cols-5 gap-4 mb-12">
                {akuKlassen.map((klasse) => (
                  <div key={klasse.nummer} className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${klasse.bgColor.replace('bg-', 'bg-').replace('-50', '-500')} text-white font-bold text-xl`}>
                      {klasse.nummer}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{klasse.bezeichnung}</h3>
                    <p className="text-sm text-gray-600">{klasse.häufigkeit}% der Pferde</p>
                  </div>
                ))}
              </div>

              {/* Entscheidungshilfe */}
              <div className="grid md:grid-cols-3 gap-6">
                {entscheidungsHilfe.map((hilfe, index) => (
                  <div key={index} className={`p-6 rounded-lg border-2 ${hilfe.farbe}`}>
                    <h3 className="font-bold text-lg mb-2">{hilfe.titel}</h3>
                    <p className="text-sm">{hilfe.beschreibung}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Classes Section */}
        <section id="klassen-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                AKU-Klassen im Detail
              </h2>

              <div className="space-y-6">
                {akuKlassen.map((klasse, index) => (
                  <div
                    key={klasse.nummer}
                    className={`transform transition-all duration-500 ${animateCards ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`${klasse.bgColor} border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200`}
                      onClick={() => handleKlasseClick(klasse.nummer)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-4 ${klasse.bgColor.replace('bg-', 'bg-').replace('-50', '-500')} text-white`}>
                            {klasse.nummer}
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${klasse.farbe}`}>{klasse.bezeichnung}</h3>
                            <p className="text-gray-600">{klasse.beschreibung}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${klasse.farbe}`}>{klasse.kaufempfehlung}</p>
                          <p className="text-sm text-gray-500">{klasse.häufigkeit}% aller AKU</p>
                        </div>
                      </div>

                      {selectedKlasse === klasse.nummer && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3">Typische Befunde:</h4>
                              <ul className="space-y-2">
                                {klasse.beispiele.map((beispiel, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-gray-700">{beispiel}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3">Verwendungszweck:</h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {klasse.verwendungszweck.map((zweck, idx) => (
                                  <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                                    {zweck}
                                  </span>
                                ))}
                              </div>
                              <div className="space-y-2">
                                <p><span className="font-semibold">Prognose:</span> {klasse.prognose}</p>
                                <p><span className="font-semibold">Empfehlung:</span> {klasse.empfehlung}</p>
                                <p><span className="font-semibold">Risiko:</span> {klasse.risikoeinschätzung}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        {showStatistik && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  AKU-Klassen Statistik
                </h2>
                <p className="text-gray-600 text-center mb-12">
                  Verteilung der AKU-Klassen basierend auf 10.000 Untersuchungen
                </p>

                <div className="space-y-4">
                  {klassenStatistik.map((stat) => (
                    <div key={stat.klasse} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Klasse {stat.klasse}</span>
                        <span className="text-sm text-gray-600">{stat.anzahl} Pferde</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full transition-all duration-1000 ${
                            stat.klasse === 1 ? 'bg-green-500' :
                            stat.klasse === 2 ? 'bg-blue-500' :
                            stat.klasse === 3 ? 'bg-yellow-500' :
                            stat.klasse === 4 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${stat.prozent}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-600 mt-1">
                        {stat.prozent}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Decision Matrix */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Entscheidungsmatrix nach Verwendungszweck
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-gray-900">AKU-Klasse</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-900">Sport</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-900">Zucht</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-900">Freizeit</th>
                      <th className="px-6 py-4 text-center font-bold text-gray-900">Therapie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {akuKlassen.map((klasse) => (
                      <tr key={klasse.nummer} className="border-t">
                        <td className="px-6 py-4 font-semibold">Klasse {klasse.nummer}</td>
                        <td className="px-6 py-4 text-center">
                          {klasse.nummer <= 2 ? '✅' : klasse.nummer === 3 ? '⚠️' : '❌'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {klasse.nummer <= 2 ? '✅' : klasse.nummer === 3 ? '⚠️' : '❌'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {klasse.nummer <= 3 ? '✅' : klasse.nummer === 4 ? '⚠️' : '❌'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {klasse.nummer <= 4 ? '✅' : '⚠️'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p><strong>Legende:</strong> ✅ = Geeignet | ⚠️ = Bedingt geeignet | ❌ = Nicht geeignet</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Häufige Fragen zu AKU-Klassen
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Was bedeutet AKU-Klasse 1 beim Pferd?</h3>
                  <p className="text-gray-700">AKU-Klasse 1 bedeutet 'ohne Befund' - das Pferd ist gesund und der Kauf wird uneingeschränkt empfohlen. Diese Klasse erhalten etwa 15% aller untersuchten Pferde.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Sollte man ein Pferd mit AKU-Klasse 3 kaufen?</h3>
                  <p className="text-gray-700">Bei AKU-Klasse 3 sollten Sie den Verwendungszweck beachten. Für Freizeitreiten oft noch geeignet, für Hochleistungssport kritisch zu betrachten. Holen Sie eine Zweitmeinung ein.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Wie häufig ist AKU-Klasse 4 bei Pferden?</h3>
                  <p className="text-gray-700">Etwa 20% der untersuchten Pferde erhalten AKU-Klasse 4. Diese Pferde haben deutliche Befunde und der Kauf wird meist nicht empfohlen, außer für sehr spezielle Verwendungszwecke.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Kann sich eine AKU-Klasse im Laufe der Zeit ändern?</h3>
                  <p className="text-gray-700">Ja, AKU-Klassen können sich verschlechtern (z.B. durch Alter oder Verletzungen) oder in seltenen Fällen auch verbessern (bei vorübergehenden Befunden). Regelmäßige Nachuntersuchungen sind sinnvoll.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bewerten Sie Ihr Pferd professionell
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Nutzen Sie unsere KI-gestützte Bewertung für eine realistische Werteinschätzung
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105">
                Pferd jetzt bewerten
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AkuPferdKlassen;