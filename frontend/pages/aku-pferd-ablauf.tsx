import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';
import FAQ from '../components/FAQ';
import InfoBox from '../components/InfoBox';
import ContentSection from '../components/ContentSection';
import CTASection from '../components/CTASection';
import { FAQItem } from '../types/faq.types';

interface PhaseData {
  id: string;
  title: string;
  description: string;
  duration: string;
  details: string[];
  keyPoints: string[];
  tips: string[];
}

interface AKUClass {
  klasse: string;
  titel: string;
  beschreibung: string;
  kosten: string;
  empfehlung: string;
  farbe: string;
}

const AkuPferdAblauf: NextPage = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [isPhasesVisible, setIsPhasesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsPhasesVisible(true);
        }
      });
    });

    const phasesElement = document.getElementById('phases-section');
    if (phasesElement) {
      observer.observe(phasesElement);
    }

    return () => observer.disconnect();
  }, []);

  const trackPhaseClick = useCallback((phaseId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'aku_ablauf_phase_viewed', {
        event_category: 'User Interaction',
        event_label: phaseId,
        page_title: 'AKU Pferd Ablauf'
      });
      info('GA4 Event: AKU Ablauf Phase Viewed', phaseId);
    }
  }, []);

  const handlePhaseClick = (phaseId: string) => {
    setSelectedPhase(selectedPhase === phaseId ? '' : phaseId);
    trackPhaseClick(phaseId);
  };

  const akuPhases: PhaseData[] = [
    {
      id: 'vorbereitung',
      title: '1. Vorbereitung und Terminvereinbarung',
      description: 'Planung und Organisation der Ankaufsuntersuchung',
      duration: '1-2 Wochen vorher',
      details: [
        'Qualifizierten Tierarzt mit AKU-Erfahrung auswählen',
        'Termin mit Verkäufer und Tierarzt abstimmen',
        'AKU-Klasse entsprechend dem Verwendungszweck festlegen',
        'Kosten transparent vereinbaren',
        'Alle Pferdepapiere und Unterlagen zusammenstellen'
      ],
      keyPoints: [
        'Tierarzt sollte nicht der Haustierarzt des Verkäufers sein',
        'AKU-Klasse richtet sich nach Kaufpreis und Verwendung',
        'Anfahrtskosten bei weiter Entfernung berücksichtigen'
      ],
      tips: [
        'Mindestens 1-2 Wochen Vorlauf einplanen',
        'Bei beliebten Tierärzten früh buchen',
        'Backup-Termin für Schlechtwetter vereinbaren'
      ]
    },
    {
      id: 'anamnese',
      title: '2. Anamnese und Vorgeschichte',
      description: 'Erfassung der medizinischen Historie und des Leistungsstandes',
      duration: '15-30 Minuten',
      details: [
        'Krankengeschichte und Vorerkrankungen erfassen',
        'Bisherige Nutzung und Leistungsstand dokumentieren',
        'Impfungen, Wurmkuren und Behandlungen prüfen',
        'Verhalten und Eigenarten besprechen',
        'Identität des Pferdes durch Chip oder Pass verifizieren'
      ],
      keyPoints: [
        'Ehrliche Angaben sind rechtlich wichtig',
        'Auch scheinbar unbedeutende Verletzungen erwähnen',
        'Leistungsabfall kann Hinweis auf Probleme sein'
      ],
      tips: [
        'Alle verfügbaren Unterlagen mitbringen',
        'Auch nach kleineren Auffälligkeiten fragen',
        'Bei Zweifeln nachbohren'
      ]
    },
    {
      id: 'klinische-untersuchung',
      title: '3. Klinische Untersuchung',
      description: 'Umfassende körperliche Untersuchung des Pferdes',
      duration: '45-90 Minuten',
      details: [
        'Adspektion im Stand: Körperbau, Haltung, Gliedmaßenstellung',
        'Palpation: Abtasten von Gelenken, Sehnen, Bändern',
        'Herz-Kreislauf-System: Puls, Herzgeräusche, Rhythmus',
        'Atmungsapparat: Lunge, Nüstern, Kehlkopf',
        'Augen: Pupillenreflexe, Hornhaut, Linse',
        'Bewegungsapparat: Ganganalyse im Schritt und Trab'
      ],
      keyPoints: [
        'Systematisches Vorgehen von Kopf bis Schweif',
        'Vergleich zwischen linker und rechter Körperhälfte',
        'Dokumentation aller Befunde, auch geringfügiger'
      ],
      tips: [
        'Pferd sollte entspannt und trocken sein',
        'Ausreichend Platz für Bewegungsanalyse',
        'Bei Unklarheiten Nachuntersuchung anbieten'
      ]
    },
    {
      id: 'spezielle-untersuchungen',
      title: '4. Spezielle Untersuchungen',
      description: 'Vertiefende Diagnostik je nach AKU-Klasse',
      duration: '30-120 Minuten',
      details: [
        'Beugeproben: Provokationstests der Gelenke',
        'Röntgenuntersuchung: Bildgebende Diagnostik je nach Klasse',
        'Endoskopie: Atemwege bei Bedarf',
        'Ultraschall: Weichteile und Sehnen',
        'Blutuntersuchung: Bei besonderen Indikationen'
      ],
      keyPoints: [
        'Umfang richtet sich nach vereinbarter AKU-Klasse',
        'Zusatzuntersuchungen nur nach Absprache',
        'Röntgenbilder gehören dem Auftraggeber'
      ],
      tips: [
        'Standard-Röntgenprojektionen kennen',
        'Bei auffälligen Beugeproben nachhaken',
        'Zusatzkosten vorab klären'
      ]
    },
    {
      id: 'befundauswertung',
      title: '5. Befundauswertung und Protokoll',
      description: 'Zusammenfassung und Bewertung aller Untersuchungsergebnisse',
      duration: '30-45 Minuten',
      details: [
        'Systematische Auswertung aller Befunde',
        'Klassifizierung nach AKU-Schema (Klasse I-V)',
        'Erstellung des schriftlichen Protokolls',
        'Kaufempfehlung aussprechen',
        'Aufklärung über Risiken und Prognose',
        'Empfehlungen für weitere Maßnahmen'
      ],
      keyPoints: [
        'Objektive Befundbewertung ohne Emotionen',
        'Klare Kaufempfehlung oder -warnung',
        'Rechtliche Absicherung durch Dokumentation'
      ],
      tips: [
        'Alle Details im Protokoll festhalten lassen',
        'Unverständliches erklären lassen',
        'Kopie des Protokolls für eigene Unterlagen'
      ]
    }
  ];

  const akuKlassen: AKUClass[] = [
    {
      klasse: 'I',
      titel: 'Kleine AKU',
      beschreibung: 'Basisuntersuchung ohne Röntgen',
      kosten: '900 - 1.400 €',
      empfehlung: 'Für Freizeitpferde bis 15.000 €',
      farbe: 'bg-green-100 text-green-800 border-green-300'
    },
    {
      klasse: 'II',
      titel: 'Große AKU',
      beschreibung: 'Umfassende Untersuchung mit Standard-Röntgen',
      kosten: '1.400 - 2.500 €',
      empfehlung: 'Für Turnier- und Zuchtpferde',
      farbe: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      klasse: 'III-V',
      titel: 'Spezial-AKU',
      beschreibung: 'Erweiterte Diagnostik mit Zusatzuntersuchungen',
      kosten: '2.500 - 4.000 €',
      empfehlung: 'Für hochwertige Sport- und Zuchtpferde',
      farbe: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ];

  // Schema Markup Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AKU Pferd Ablauf - Der komplette Leitfaden zur Ankaufsuntersuchung",
    "description": "Umfassender Guide zum AKU Pferd Ablauf: Phasen, Kosten, Klassen und Tipps für eine erfolgreiche Ankaufsuntersuchung beim Pferdekauf.",
    "image": "https://pferdewert.de/images/aku-pferd-ablauf-guide.jpg",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert",
      "url": "https://pferdewert.de",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pferdewert.de/logo.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "PferdeWert",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pferdewert.de/logo.png"
      }
    },
    "datePublished": "2025-01-20",
    "dateModified": "2025-01-20",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pferdewert.de/ratgeber/aku-pferd-ablauf"
    },
    "keywords": ["aku pferd ablauf", "ankaufsuntersuchung", "pferdekauf", "tierarzt untersuchung", "aku klassen"],
    "articleSection": "Ratgeber",
    "wordCount": 2850
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pferdewert.de"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ratgeber",
        "item": "https://pferdewert.de/ratgeber"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AKU Pferd Ablauf",
        "item": "https://pferdewert.de/ratgeber/aku-pferd-ablauf"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert",
    "url": "https://pferdewert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@pferdewert.de"
    },
    "sameAs": [
      "https://www.facebook.com/pferdewert",
      "https://www.instagram.com/pferdewert"
    ]
  };

  const faqItems: FAQItem[] = [
    {
      question: "Wie lange dauert eine Ankaufsuntersuchung?",
      answer: "Eine kleine AKU (Klasse I) dauert 2-3 Stunden, eine große AKU (Klasse II) 4-6 Stunden. Die Dauer hängt vom Kooperationsverhalten des Pferdes und eventuellen Zusatzuntersuchungen ab."
    },
    {
      question: "Was kostet eine Ankaufsuntersuchung?",
      answer: "Eine kleine AKU kostet 900-1.400€, eine große AKU 1.400-2.500€. Die Preise variieren je nach Region und Untersuchungsumfang. Zusatzkosten können für Anfahrt und Spezialuntersuchungen anfallen."
    },
    {
      question: "Kann ein Pferd bei der AKU durchfallen?",
      answer: "Ein Pferd kann bei der AKU nicht 'durchfallen'. Die Untersuchung ist eine objektive Zustandsbeschreibung. Die Entscheidung, ob Sie das Pferd trotz bestimmter Befunde kaufen möchten, liegt bei Ihnen."
    },
    {
      question: "Wer bezahlt die AKU?",
      answer: "Grundsätzlich zahlt der potenzielle Käufer die AKU, auch wenn der Kauf nicht zustande kommt. In seltenen Fällen teilen sich Käufer und Verkäufer die Kosten."
    },
    {
      question: "Wie lange ist ein AKU-Protokoll gültig?",
      answer: "Ein AKU-Protokoll beschreibt den Zustand zum Untersuchungstag. 0-4 Wochen ist es vollwertig, 1-3 Monate noch brauchbar, über 6 Monate wird eine neue AKU empfohlen."
    },
    {
      question: "Brauche ich eine AKU bei jedem Pferdekauf?",
      answer: "Eine AKU ist besonders sinnvoll bei Pferden über 15.000€, Turnierpferden, Zuchttieren und Pferden mit unbekannter Vorgeschichte. Bei günstigen Freizeitpferden kann eine kleine AKU ausreichend sein."
    },
    {
      question: "Kann ich den Tierarzt selbst wählen?",
      answer: "Ja, Sie sollten einen erfahrenen Tierarzt wählen, der nicht der Haustierarzt des Verkäufers ist. Wichtig sind Spezialisierung auf Pferde und Erfahrung mit Ankaufsuntersuchungen."
    },
    {
      question: "Was passiert wenn Befunde gefunden werden?",
      answer: "Bei Befunden haben Sie mehrere Optionen: Kaufverzicht, Preisverhandlung, Nachuntersuchung durch Spezialisten oder Anpassung des Kaufvertrags mit Haftungsausschluss."
    }
  ];

  return (
    <>
      <Head>
        <title>AKU Pferd Ablauf - So läuft die Ankaufsuntersuchung ab | PferdeWert</title>
        <meta name="description" content="AKU Ablauf Schritt für Schritt: Von der Terminvereinbarung bis zum Ergebnis. Alles zur Ankaufsuntersuchung beim Pferdekauf." />
        <meta name="keywords" content="aku pferd ablauf, ankaufsuntersuchung ablauf, aku pferd kosten, aku klassen pferd, tierarzt ankaufsuntersuchung" />
        <link rel="canonical" href="https://pferdewert.de/ratgeber/aku-pferd-ablauf" />

        {/* Open Graph */}
        <meta property="og:title" content="AKU Pferd Ablauf - Kompletter Leitfaden zur Ankaufsuntersuchung" />
        <meta property="og:description" content="Erfahren Sie Schritt für Schritt, wie der AKU Ablauf beim Pferd funktioniert. Von der Vorbereitung bis zum Protokoll - alle wichtigen Informationen." />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferd-ablauf-guide.jpg" />
        <meta property="og:url" content="https://pferdewert.de/ratgeber/aku-pferd-ablauf" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="PferdeWert" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd Ablauf - Kompletter Leitfaden zur Ankaufsuntersuchung" />
        <meta name="twitter:description" content="Erfahren Sie Schritt für Schritt, wie der AKU Ablauf beim Pferd funktioniert. Von der Vorbereitung bis zum Protokoll - alle wichtigen Informationen." />
        <meta name="twitter:image" content="https://pferdewert.de/images/aku-pferd-ablauf-guide.jpg" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>›</span>
              <a href="/ratgeber" className="hover:text-blue-600 transition-colors">Ratgeber</a>
              <span>›</span>
              <span className="text-gray-900 font-medium">AKU Pferd Ablauf</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#4e463b] to-[#5a4b3b] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-[#f6c36a]/20 px-4 py-2 rounded-full text-[#f6c36a] text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#f6c36a] rounded-full mr-2"></span>
                Schritt-für-Schritt Anleitung
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AKU Pferd Ablauf
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
                Der komplette Leitfaden zur Ankaufsuntersuchung beim Pferdekauf
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('phases-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#f6c36a] hover:bg-[#f3c27b] text-[#4e463b] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  5 Phasen ansehen
                </button>
                <button
                  onClick={() => document.getElementById('klassen-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-[#4e463b] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  AKU-Klassen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Introduction */}
        <ContentSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Die Ankaufsuntersuchung verstehen
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Eine Ankaufsuntersuchung (AKU) ist die wichtigste Absicherung beim Pferdekauf. Sie läuft in 5 systematischen Phasen ab und gibt Ihnen objektive Gewissheit über den Gesundheitszustand Ihres Wunschpferdes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2-6h</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Dauer</h3>
                <p className="text-gray-600">Je nach AKU-Klasse und Untersuchungsumfang</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-[#f6c36a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#4e463b] font-bold text-2xl">5</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Phasen</h3>
                <p className="text-gray-600">Systematische Untersuchung in fester Reihenfolge</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">I-V</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Klassen</h3>
                <p className="text-gray-600">Bewertung von ohne Befund bis hochgradig</p>
              </div>
            </div>

            <InfoBox
              type="tip"
              title="Wichtiger Hinweis vor der AKU"
              content="Wählen Sie immer einen erfahrenen Tierarzt, der nicht der Haustierarzt des Verkäufers ist. Eine unabhängige Beurteilung ist für Ihre Sicherheit beim Pferdekauf entscheidend."
            />
          </div>
        </ContentSection>

        {/* AKU Phases Section */}
        <section id="phases-section" className="py-16 bg-[#fcfaf6]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Die 5 Phasen der Ankaufsuntersuchung
                </h2>
                <p className="text-xl text-gray-600">
                  Jede Phase baut systematisch aufeinander auf und liefert wichtige Erkenntnisse
                </p>
              </div>

              <div className="space-y-8">
                {akuPhases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className={`transform transition-all duration-500 ${
                      isPhasesVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      <div
                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handlePhaseClick(phase.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">{phase.title}</h3>
                              <span className="text-sm text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full font-medium ml-4">
                                {phase.duration}
                              </span>
                            </div>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">{phase.description}</p>
                            <div className="flex items-center text-[#3B82F6] font-medium">
                              <span className="mr-2">Details ansehen</span>
                              <svg
                                className={`w-5 h-5 transition-transform ${selectedPhase === phase.id ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedPhase === phase.id && (
                        <div className="px-6 pb-6 bg-gradient-to-r from-blue-50 to-amber-50">
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                              <h4 className="font-serif font-bold text-gray-900 mb-3 text-lg">Ablauf im Detail:</h4>
                              <ul className="space-y-2">
                                {phase.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-gray-700 text-sm leading-relaxed">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                              <h4 className="font-serif font-bold text-gray-900 mb-3 text-lg">Wichtige Aspekte:</h4>
                              <ul className="space-y-2">
                                {phase.keyPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-[#f6c36a] mr-2 text-xl">★</span>
                                    <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                              <h4 className="font-serif font-bold text-gray-900 mb-3 text-lg">Praktische Tipps:</h4>
                              <ul className="space-y-2">
                                {phase.tips.map((tip, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                                  </li>
                                ))}
                              </ul>
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

        {/* AKU Classes Section */}
        <section id="klassen-section" className="py-16 bg-white">
          <ContentSection>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  AKU-Klassen und Kosten im Überblick
                </h2>
                <p className="text-xl text-gray-600">
                  Wählen Sie die passende AKU-Klasse für Ihren Verwendungszweck und Ihr Budget
                </p>
              </div>

              <div className="space-y-6">
                {akuKlassen.map((klasse) => (
                  <div key={klasse.klasse} className={`border-2 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg ${klasse.farbe}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center font-bold text-2xl mr-4 shadow-sm">
                          {klasse.klasse}
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl font-bold mb-1">{klasse.titel}</h3>
                          <p className="text-lg opacity-90">{klasse.beschreibung}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">{klasse.kosten}</div>
                        <div className="text-sm opacity-75">{klasse.empfehlung}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <InfoBox
                type="cost"
                title="Zusätzliche Kostenaspekte beachten"
                content="Neben den Grundkosten können Anfahrtskosten, Wochenendzuschläge und spezielle Untersuchungen (Endoskopie, erweiterte Röntgendiagnostik) zusätzliche Kosten verursachen. Klären Sie alle Kostenpunkte vorab transparent ab."
              />
            </div>
          </ContentSection>
        </section>

        {/* Warning Section */}
        <section className="py-16 bg-amber-50">
          <ContentSection>
            <div className="max-w-4xl mx-auto">
              <InfoBox
                type="warning"
                title="Rechtliche Aspekte der AKU"
                content={
                  <div>
                    <p className="mb-4">
                      Die AKU ist eine Momentaufnahme und beschreibt den Zustand zum Untersuchungszeitpunkt.
                      Der Tierarzt haftet für die ordnungsgemäße Durchführung, nicht aber für die Entwicklung des Pferdes nach dem Kauf.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>AKU-Protokoll hat dokumentarischen Charakter</li>
                      <li>Gewährleistungsrechte bleiben gegenüber dem Verkäufer bestehen</li>
                      <li>Bei Kaufrücktritt wegen AKU-Befunden entstehen keine Schadensersatzansprüche</li>
                      <li>Zweitmeinung ist bei kritischen Befunden immer möglich</li>
                    </ul>
                  </div>
                }
              />
            </div>
          </ContentSection>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FAQ
                faqs={faqItems}
                sectionTitle="Häufig gestellte Fragen zum AKU-Ablauf"
                withSchema={true}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Bewerten Sie Ihr Pferd vor der AKU"
          description="Unsere KI-gestützte Pferdebewertung für nur 14,90€ gibt Ihnen vorab wichtige Erkenntnisse über den Marktwert und hilft bei der Vorbereitung auf die Ankaufsuntersuchung."
          buttonText="Pferd jetzt bewerten - nur 14,90€"
          buttonLink="/"
          backgroundColor="bg-gradient-to-r from-[#4e463b] to-[#5a4b3b]"
          buttonColor="bg-[#f6c36a] hover:bg-[#f3c27b] text-[#4e463b]"
        />
      </div>
    </>
  );
};

export default AkuPferdAblauf;