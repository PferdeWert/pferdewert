import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  details: string[];
  tips: string[];
}

const AkuPferdAblauf: NextPage = () => {
  const [selectedStep, setSelectedStep] = useState<string>('');
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
        }
      });
    });

    const timelineElement = document.getElementById('timeline-section');
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => observer.disconnect();
  }, []);

  const trackStepClick = useCallback((stepId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'aku_ablauf_step_viewed', {
        event_category: 'User Interaction',
        event_label: stepId,
        page_title: 'AKU Pferd Ablauf'
      });
      info('GA4 Event: AKU Ablauf Step Viewed', stepId);
    }
  }, []);

  const handleStepClick = (stepId: string) => {
    setSelectedStep(selectedStep === stepId ? '' : stepId);
    trackStepClick(stepId);
  };

  const timelineSteps: TimelineStep[] = [
    {
      id: 'termin',
      title: '1. Terminvereinbarung',
      description: 'Planung und Vorbereitung der AKU',
      duration: '1-7 Tage vorab',
      details: [
        'Tierarzt kontaktieren und AKU-Termin vereinbaren',
        'Verkäufer über geplante Untersuchung informieren',
        'AKU-Klasse und Umfang festlegen',
        'Kosten und Zahlungsmodalitäten klären'
      ],
      tips: [
        'Termin 1-2 Wochen im Voraus planen',
        'Bei beliebten Tierärzten früh buchen',
        'Backup-Termine vereinbaren'
      ]
    },
    {
      id: 'vorbereitung',
      title: '2. Vorbereitung vor Ort',
      description: 'Aufbau und erste Einschätzung',
      duration: '15-30 Minuten',
      details: [
        'Tierarzt baut Equipment auf',
        'Pferd in ruhiger Umgebung bereitstellen',
        'Anamnese und Vorgeschichte besprechen',
        'Identität des Pferdes überprüfen'
      ],
      tips: [
        'Pferd sollte trocken und sauber sein',
        'Ruhige Atmosphäre schaffen',
        'Alle Papiere bereithalten'
      ]
    },
    {
      id: 'adspektion',
      title: '3. Adspektion',
      description: 'Äußere Begutachtung im Stand',
      duration: '20-30 Minuten',
      details: [
        'Allgemeine Körperkondition bewerten',
        'Exterieur und Gliedmaßenstellung prüfen',
        'Sichtbare Mängel oder Verletzungen dokumentieren',
        'Symmetrie und Proportionen beurteilen'
      ],
      tips: [
        'Pferd sollte entspannt stehen',
        'Gute Beleuchtung wichtig',
        'Alle Winkel begutachten lassen'
      ]
    },
    {
      id: 'palpation',
      title: '4. Palpation',
      description: 'Abtasten und manuelle Untersuchung',
      duration: '30-45 Minuten',
      details: [
        'Gelenke, Sehnen und Bänder abtasten',
        'Schwellungen oder Verhärtungen lokalisieren',
        'Schmerzreaktionen testen',
        'Beweglichkeit der Gelenke prüfen'
      ],
      tips: [
        'Pferd an Berührungen gewöhnen',
        'Bei Schmerzreaktionen nachfragen',
        'Vergleich zwischen rechts und links'
      ]
    },
    {
      id: 'fuehrung',
      title: '5. Führung im Schritt',
      description: 'Bewegungsanalyse an der Hand',
      duration: '15-20 Minuten',
      details: [
        'Gangbild im Schritt analysieren',
        'Lahmheiten oder Irregularitäten erkennen',
        'Geradeauslauf und Wendungen testen',
        'Reaktion auf verschiedene Böden prüfen'
      ],
      tips: [
        'Gleichmäßiges Tempo halten',
        'Pferd nicht drängen',
        'Verschiedene Untergründe nutzen'
      ]
    },
    {
      id: 'trab',
      title: '6. Trabvorführung',
      description: 'Bewegungsanalyse im Trab',
      duration: '20-30 Minuten',
      details: [
        'Geradeauslauf im Trab (30-50m)',
        'Wendungen und Kreise',
        'Bergauf/bergab wenn verfügbar',
        'Reaktion nach Belastung beobachten'
      ],
      tips: [
        'Ebener, fester Untergrund ideal',
        'Sicherheit geht vor',
        'Nachschwitzen beobachten'
      ]
    },
    {
      id: 'beugeprobe',
      title: '7. Beugeproben',
      description: 'Provokationstests der Gelenke',
      duration: '15-25 Minuten',
      details: [
        'Gelenke 30-60 Sekunden beugen',
        'Sofortige Trabvorführung',
        'Reaktion und Gangveränderung bewerten',
        'Verschiedene Gelenke einzeln testen'
      ],
      tips: [
        'Pferd sollte entspannt sein',
        'Nicht bei akuten Verletzungen',
        'Deutliche Reaktionen beachten'
      ]
    },
    {
      id: 'klinisch',
      title: '8. Klinische Untersuchung',
      description: 'Herz, Lunge und Allgemeinbefinden',
      duration: '15-20 Minuten',
      details: [
        'Herz und Kreislauf abhören',
        'Atemwege und Lunge untersuchen',
        'Schleimhäute und Lymphknoten prüfen',
        'Körpertemperatur messen'
      ],
      tips: [
        'Ruhe für Herzfrequenz wichtig',
        'Nach Belastung nochmals prüfen',
        'Auffälligkeiten dokumentieren'
      ]
    },
    {
      id: 'augen',
      title: '9. Augenuntersuchung',
      description: 'Ophthalmologische Kontrolle',
      duration: '10-15 Minuten',
      details: [
        'Pupillenreflexe testen',
        'Hornhaut und Linse begutachten',
        'Augenhintergrund wenn nötig',
        'Tränenfluss und Lider prüfen'
      ],
      tips: [
        'Dunkle Umgebung für Untersuchung',
        'Pferd ruhig halten',
        'Beidseitig vergleichen'
      ]
    },
    {
      id: 'roentgen',
      title: '10. Röntgen (je nach Klasse)',
      description: 'Bildgebende Diagnostik',
      duration: '30-90 Minuten',
      details: [
        'Röntgenaufnahmen nach AKU-Standard',
        'Verschiedene Projektionen',
        'Sofortige Beurteilung der Bilder',
        'Digitale Archivierung'
      ],
      tips: [
        'Pferd muss stillstehen',
        'Strahlenschutz beachten',
        'Qualität der Aufnahmen prüfen'
      ]
    },
    {
      id: 'dokumentation',
      title: '11. Dokumentation',
      description: 'Befunde zusammenfassen',
      duration: '15-30 Minuten',
      details: [
        'Alle Befunde protokollieren',
        'AKU-Klasse vergeben (1-5)',
        'Empfehlungen aussprechen',
        'Bericht erstellen und aushändigen'
      ],
      tips: [
        'Alle Details festhalten',
        'Verständlich erklären lassen',
        'Kopie für eigene Unterlagen'
      ]
    },
    {
      id: 'nachbesprechung',
      title: '12. Nachbesprechung',
      description: 'Ergebnisse und Empfehlungen',
      duration: '15-20 Minuten',
      details: [
        'Befunde ausführlich erläutern',
        'Kaufempfehlung aussprechen',
        'Risiken und Prognose diskutieren',
        'Weitere Schritte besprechen'
      ],
      tips: [
        'Alle Fragen stellen',
        'Unklarheiten sofort klären',
        'Bedenkzeit einplanen'
      ]
    }
  ];

  const akuKlassen = [
    { klasse: 1, beschreibung: 'Ohne Befund', empfehlung: 'Kaufen empfohlen', farbe: 'bg-green-100 text-green-800' },
    { klasse: 2, beschreibung: 'Geringfügige Befunde', empfehlung: 'Kaufen meist empfohlen', farbe: 'bg-blue-100 text-blue-800' },
    { klasse: 3, beschreibung: 'Mäßige Befunde', empfehlung: 'Verwendungszweck beachten', farbe: 'bg-yellow-100 text-yellow-800' },
    { klasse: 4, beschreibung: 'Deutliche Befunde', empfehlung: 'Kaufen meist nicht empfohlen', farbe: 'bg-orange-100 text-orange-800' },
    { klasse: 5, beschreibung: 'Hochgradige Befunde', empfehlung: 'Kaufen nicht empfohlen', farbe: 'bg-red-100 text-red-800' }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AKU Pferd Ablauf - Ankaufsuntersuchung Schritt für Schritt",
    "description": "Detaillierte Anleitung zum Ablauf einer Ankaufsuntersuchung (AKU) beim Pferdekauf",
    "image": "https://pferdewert.de/images/aku-ablauf.jpg",
    "totalTime": "PT3H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "500"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Qualifizierter Tierarzt"
      },
      {
        "@type": "HowToSupply",
        "name": "Röntgengerät"
      },
      {
        "@type": "HowToSupply",
        "name": "Stethoskop"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "AKU-Protokoll"
      },
      {
        "@type": "HowToTool",
        "name": "Röntgenausrüstung"
      }
    ],
    "step": timelineSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "image": `https://pferdewert.de/images/aku-step-${index + 1}.jpg`,
      "url": `https://pferdewert.de/aku-pferd-ablauf#${step.id}`
    }))
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
        "name": "Wie lange dauert eine AKU beim Pferd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine komplette Ankaufsuntersuchung dauert je nach Klasse 2-4 Stunden. AKU Klasse 1 benötigt etwa 2 Stunden, während AKU Klasse 5 mit umfangreichem Röntgen bis zu 4 Stunden dauern kann."
        }
      },
      {
        "@type": "Question",
        "name": "Was passiert bei der AKU Beugeprobe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei der Beugeprobe werden die Gelenke 30-60 Sekunden stark gebeugt und das Pferd anschließend sofort im Trab vorgeführt. So können versteckte Lahmheiten oder Gelenkprobleme erkannt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Wann werden Röntgenbilder bei der AKU gemacht?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Röntgenaufnahmen sind je nach AKU-Klasse unterschiedlich: Klasse 1-2 meist ohne Röntgen, Klasse 3-4 mit ausgewählten Aufnahmen, Klasse 5 mit umfangreichem Röntgenprogramm aller wichtigen Strukturen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann die AKU auch bei schlechtem Wetter durchgeführt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die meisten AKU-Schritte sind wetterunabhängig möglich. Bei starkem Regen sollte die Trabvorführung jedoch verschoben werden, da rutschiger Boden die Sicherheit gefährdet und das Gangbild verfälscht."
        }
      },
      {
        "@type": "Question",
        "name": "Was bedeuten die AKU-Klassen 1-5?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AKU-Klassen bewerten die Befunde: Klasse 1 = ohne Befund (Kauf empfohlen), Klasse 2 = geringfügige Befunde, Klasse 3 = mäßige Befunde, Klasse 4 = deutliche Befunde (meist nicht empfohlen), Klasse 5 = hochgradige Befunde (Kauf nicht empfohlen)."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>AKU Pferd Ablauf - So läuft die Ankaufsuntersuchung ab | PferdeWert</title>
        <meta name="description" content="AKU Ablauf Schritt für Schritt: Von der Terminvereinbarung bis zum Ergebnis. Alles zur Ankaufsuntersuchung beim Pferdekauf." />
        <meta name="keywords" content="aku pferd ablauf, ankaufsuntersuchung ablauf, pferdekauf untersuchung, aku schritte, beugeprobe pferd, tierarzt pferdekauf" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.country" content="Germany" />
        <meta name="audience" content="horse buyers, horse owners, equestrian professionals" />
        <meta name="page-topic" content="Horse Purchase Examination Process" />
        <meta name="page-type" content="Guide" />
        <meta name="content-language" content="de" />
        <link rel="canonical" href="https://pferdewert.de/aku-pferd-ablauf" />
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/aku-pferd-ablauf" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AKU Pferd Ablauf - So läuft die Ankaufsuntersuchung ab" />
        <meta property="og:description" content="AKU Ablauf Schritt für Schritt: Von der Terminvereinbarung bis zum Ergebnis. Alles zur Ankaufsuntersuchung beim Pferdekauf." />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd-ablauf" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-ablauf-guide.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd Ablauf - So läuft die Ankaufsuntersuchung ab" />
        <meta name="twitter:description" content="AKU Ablauf Schritt für Schritt: Von der Terminvereinbarung bis zum Ergebnis. Alles zur Ankaufsuntersuchung beim Pferdekauf." />
        <meta name="twitter:image" content="https://pferdewert.de/images/aku-ablauf-guide.jpg" />
        <meta name="twitter:site" content="@pferdewert_de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="prefetch" href="https://pferdewert.de/aku-pferd-kosten" />
        <link rel="prefetch" href="https://pferdewert.de/aku-pferd-klassen" />
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
                Schritt-für-Schritt Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AKU Pferd Ablauf
                <span className="block text-2xl md:text-3xl text-blue-200 font-normal mt-2">
                  So läuft die Ankaufsuntersuchung ab
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Von der Terminvereinbarung bis zum Ergebnis - Alles zur Ankaufsuntersuchung beim Pferdekauf
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Ablauf ansehen
                </button>
                <button
                  onClick={() => document.getElementById('klassen-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200"
                >
                  AKU-Klassen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Die Ankaufsuntersuchung im Überblick
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">2-4h</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dauer</h3>
                  <p className="text-gray-600">Je nach AKU-Klasse und Umfang</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">12</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Schritte</h3>
                  <p className="text-gray-600">Systematische Untersuchung</p>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">1-5</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Klassen</h3>
                  <p className="text-gray-600">Bewertung der Befunde</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                AKU Ablauf - 12 Schritte im Detail
              </h2>

              <div className="space-y-8">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className={`transform transition-all duration-500 ${isTimelineVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <div
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
                          onClick={() => handleStepClick(step.id)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>

                          {selectedStep === step.id && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-3">Ablauf im Detail:</h4>
                                  <ul className="space-y-2">
                                    {step.details.map((detail, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-3">Wichtige Tipps:</h4>
                                  <ul className="space-y-2">
                                    {step.tips.map((tip, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span className="text-gray-700">{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AKU Klassen Section */}
        <section id="klassen-section" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                AKU-Klassen verstehen
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Am Ende der Untersuchung wird eine AKU-Klasse von 1-5 vergeben
              </p>

              <div className="space-y-4">
                {akuKlassen.map((klasse) => (
                  <div key={klasse.klasse} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${klasse.farbe}`}>
                          {klasse.klasse}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{klasse.beschreibung}</h3>
                          <p className="text-gray-600">{klasse.empfehlung}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Checklist */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Vorbereitung auf die AKU
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Vor der AKU organisieren</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>Qualifizierten Tierarzt auswählen</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>AKU-Klasse mit Verkäufer absprechen</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>Termin 1-2 Wochen vorab planen</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>Kosten und Zahlungsweise klären</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>Alle Pferdepapiere bereithalten</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Am Tag der AKU</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Pferd sauber und trocken vorbereiten</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Ruhige, stressfreie Atmosphäre</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Ausreichend Zeit einplanen</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Fragen zur Krankengeschichte</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>Alle Unklarheiten ansprechen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Häufige Fragen zum AKU-Ablauf
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Wie lange dauert eine AKU beim Pferd?</h3>
                  <p className="text-gray-700">Eine komplette Ankaufsuntersuchung dauert je nach Klasse 2-4 Stunden. AKU Klasse 1 benötigt etwa 2 Stunden, während AKU Klasse 5 mit umfangreichem Röntgen bis zu 4 Stunden dauern kann.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Was passiert bei der AKU Beugeprobe?</h3>
                  <p className="text-gray-700">Bei der Beugeprobe werden die Gelenke 30-60 Sekunden stark gebeugt und das Pferd anschließend sofort im Trab vorgeführt. So können versteckte Lahmheiten oder Gelenkprobleme erkannt werden.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Wann werden Röntgenbilder bei der AKU gemacht?</h3>
                  <p className="text-gray-700">Röntgenaufnahmen sind je nach AKU-Klasse unterschiedlich: Klasse 1-2 meist ohne Röntgen, Klasse 3-4 mit ausgewählten Aufnahmen, Klasse 5 mit umfangreichem Röntgenprogramm aller wichtigen Strukturen.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Kann die AKU auch bei schlechtem Wetter durchgeführt werden?</h3>
                  <p className="text-gray-700">Die meisten AKU-Schritte sind wetterunabhängig möglich. Bei starkem Regen sollte die Trabvorführung jedoch verschoben werden, da rutschiger Boden die Sicherheit gefährdet und das Gangbild verfälscht.</p>
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
                Bewerten Sie Ihr Pferd vor der AKU
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Nutzen Sie unsere KI-gestützte Bewertung als Vorbereitung für die Ankaufsuntersuchung
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

export default AkuPferdAblauf;