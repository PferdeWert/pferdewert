import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  TrendingUp,
  Target,
  Calculator,
  Award,
  CheckCircle,
  DollarSign,
  Users,
  Clock,
  Star,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Shield,
  Camera,
  FileText,
  MapPin
} from 'lucide-react';

const VerkaufspreisOptimierenPage: NextPage = () => {
  const preisOptimierungsStrategien = [
    {
      titel: "Professionelle Bewertung durchführen",
      beschreibung: "Holen Sie eine unabhängige Bewertung von zertifizierten Sachverständigen ein",
      icon: Award,
      tipps: [
        "Beauftragen Sie mehrere Gutachter für verschiedene Perspektiven",
        "Nutzen Sie spezialisierte Bewertungstools wie PferdeWert.de",
        "Dokumentieren Sie alle Bewertungsergebnisse systematisch"
      ]
    },
    {
      titel: "Marktanalyse und Timing",
      beschreibung: "Verkaufen Sie zum optimalen Zeitpunkt basierend auf Markttrends",
      icon: BarChart3,
      tipps: [
        "Frühjahr und Herbst sind traditionell stärkere Verkaufsphasen",
        "Überwachen Sie regionale Marktentwicklungen",
        "Berücksichtigen Sie saisonale Nachfrageschwankungen"
      ]
    },
    {
      titel: "Präsentation optimieren",
      beschreibung: "Hochwertige Darstellung steigert den wahrgenommenen Wert erheblich",
      icon: Camera,
      tipps: [
        "Professionelle Fotos bei gutem Licht und in verschiedenen Gangarten",
        "Vollständige Dokumentation aller Papiere und Auszeichnungen",
        "Gepflegter Zustand des Pferdes zum Besichtigungstermin"
      ]
    },
    {
      titel: "Gesundheitsnachweis und Transparenz",
      beschreibung: "Vollständige Gesundheitsdokumentation schafft Vertrauen und Wert",
      icon: Shield,
      tipps: [
        "Aktuelle tierärztliche Untersuchung (AKU) vorlegen",
        "Impfpass und Gesundheitshistorie transparent dokumentieren",
        "Bei Bedarf Röntgenbilder und weitere Befunde bereitstellen"
      ]
    }
  ];

  const verkaufsplattformStrategien = [
    {
      plattform: "Premium-Pferdebörsen",
      zielgruppe: "Hochpreissegment",
      gebühren: "3-8% des Verkaufspreises",
      reichweite: "National & International",
      vorteile: ["Qualifizierte Käufer", "Professionelle Präsentation", "Hohe Sichtbarkeit"]
    },
    {
      plattform: "Regionale Märkte",
      zielgruppe: "Lokale Käufer",
      gebühren: "Festpreis oder niedrige Provision",
      reichweite: "Regional",
      vorteile: ["Persönlicher Kontakt", "Niedrige Kosten", "Schnelle Abwicklung"]
    },
    {
      plattform: "Spezialisierte Zuchtverbände",
      zielgruppe: "Züchter und Profis",
      gebühren: "Variable Mitgliedsgebühren",
      reichweite: "Fachspezifisch",
      vorteile: ["Expertennetzwerk", "Rassespecific", "Hohe Glaubwürdigkeit"]
    }
  ];

  const preisfaktoren = [
    { faktor: "Alter und Ausbildungsstand", gewichtung: "25%", optimierung: "Professionelle Ausbildung dokumentieren" },
    { faktor: "Gesundheit und Konstitution", gewichtung: "20%", optimierung: "Gesundheitscheck und Transparenz" },
    { faktor: "Abstammung und Papiere", gewichtung: "15%", optimierung: "Vollständige Pedigree-Dokumentation" },
    { faktor: "Erfolge und Auszeichnungen", gewichtung: "15%", optimierung: "Leistungsnachweis systematisch aufbereiten" },
    { faktor: "Rasse und Marktnachfrage", gewichtung: "10%", optimierung: "Markttrends analysieren und nutzen" },
    { faktor: "Charakter und Rittigkeit", gewichtung: "10%", optimierung: "Probereiten und Referenzen ermöglichen" },
    { faktor: "Optik und Präsentation", gewichtung: "5%", optimierung: "Professionelle Aufmachung und Fotos" }
  ];

  const häufigeFehler = [
    {
      fehler: "Unrealistische Preisvorstellungen",
      auswirkung: "Verlängerte Verkaufsdauer, sinkende Aufmerksamkeit",
      lösung: "Marktgerechte Bewertung durch Experten einholen"
    },
    {
      fehler: "Unvollständige Dokumentation",
      auswirkung: "Vertrauensverlust, niedrigere Gebote",
      lösung: "Alle Papiere, Untersuchungen und Erfolge vollständig zusammenstellen"
    },
    {
      fehler: "Schlechte Präsentation",
      auswirkung: "Niedriger wahrgenommener Wert",
      lösung: "Professionelle Fotos und gepflegter Zustand bei Besichtigung"
    },
    {
      fehler: "Falscher Verkaufszeitpunkt",
      auswirkung: "Schwächere Nachfrage, niedrigere Preise",
      lösung: "Saisonale Marktzyklen und regionale Trends beachten"
    }
  ];

  const faqItems = [
    {
      frage: "Wie bestimme ich den optimalen Verkaufspreis für mein Pferd?",
      antwort: "Der optimale Verkaufspreis ergibt sich aus einer professionellen Bewertung, aktueller Marktanalyse und der individuellen Situation Ihres Pferdes. Nutzen Sie mehrere Bewertungsquellen und orientieren Sie sich an vergleichbaren Verkäufen in Ihrer Region."
    },
    {
      frage: "Wann ist der beste Zeitpunkt für den Pferdeverkauf?",
      antwort: "Traditionell sind Frühjahr (März-Mai) und Herbst (September-November) die stärksten Verkaufsphasen. Berücksichtigen Sie auch regionale Besonderheiten, Turniersaison und persönliche Umstände des Käufers."
    },
    {
      frage: "Welche Unterlagen benötige ich für einen erfolgreichen Verkauf?",
      antwort: "Equidenpass, Abstammungsnachweis, aktuelle Gesundheitsuntersuchung (AKU), Impfpass, Erfolgs- und Ausbildungsnachweise sowie aussagekräftige Fotos und Videos sind essentiell für einen vertrauensvollen Verkauf."
    },
    {
      frage: "Wie kann ich den Wert meines Pferdes steigern?",
      antwort: "Investieren Sie in professionelle Ausbildung, halten Sie Gesundheitsnachweise aktuell, dokumentieren Sie Erfolge systematisch und sorgen Sie für eine professionelle Präsentation mit hochwertigen Fotos."
    },
    {
      frage: "Welche Kosten entstehen beim Pferdeverkauf?",
      antwort: "Kalkulieren Sie 5-15% des Verkaufspreises für Provisionen, Bewertungskosten, professionelle Fotos, Gesundheitsuntersuchungen und eventuelle Transportkosten. Bei Premium-Plattformen können die Gebühren höher ausfallen."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren",
        "url": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren",
        "name": "Verkaufspreis optimieren - Maximaler Erlös beim Pferdeverkauf",
        "description": "Professionelle Strategien zur Verkaufspreisoptimierung: Marktanalyse, Bewertung, Timing und Präsentation für maximale Erlöse beim Pferdeverkauf.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://pferdewert.de",
          "name": "PferdeWert.de"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Startseite",
              "item": "https://pferdewert.de"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Pferd verkaufen",
              "item": "https://pferdewert.de/pferd-verkaufen"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Verkaufspreis optimieren"
            }
          ]
        }
      },
      {
        "@type": "HowTo",
        "name": "Verkaufspreis für Pferde optimieren",
        "description": "Schritt-für-Schritt Anleitung zur Maximierung des Verkaufserlöses beim Pferdeverkauf",
        "totalTime": "P30D",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "500-2000"
        },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Professionelle Bewertung durchführen",
            "text": "Beauftragen Sie eine unabhängige Bewertung von zertifizierten Sachverständigen oder nutzen Sie digitale Bewertungstools.",
            "url": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren#bewertung"
          },
          {
            "@type": "HowToStep",
            "name": "Marktanalyse und optimales Timing",
            "text": "Analysieren Sie aktuelle Markttrends und wählen Sie den optimalen Verkaufszeitpunkt basierend auf saisonalen Schwankungen.",
            "url": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren#marktanalyse"
          },
          {
            "@type": "HowToStep",
            "name": "Präsentation und Dokumentation optimieren",
            "text": "Erstellen Sie professionelle Fotos, stellen Sie alle Papiere zusammen und sorgen Sie für eine hochwertige Darstellung.",
            "url": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren#präsentation"
          },
          {
            "@type": "HowToStep",
            "name": "Verkaufsplattform strategisch wählen",
            "text": "Wählen Sie die passende Verkaufsplattform basierend auf Ihrer Zielgruppe und dem Preissegment Ihres Pferdes.",
            "url": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren#plattform"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item, index) => ({
          "@type": "Question",
          "name": item.frage,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.antwort
          }
        }))
      },
      {
        "@type": "Article",
        "headline": "Verkaufspreis optimieren: Maximaler Erlös beim Pferdeverkauf",
        "description": "Umfassender Leitfaden zur Verkaufspreisoptimierung mit bewährten Strategien für Marktanalyse, Bewertung und Präsentation.",
        "author": {
          "@type": "Organization",
          "@id": "https://pferdewert.de/#organization"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://pferdewert.de/#organization"
        },
        "datePublished": "2024-01-15",
        "dateModified": new Date().toISOString().split('T')[0],
        "mainEntityOfPage": "https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren",
        "articleSection": "Pferdeverkauf",
        "keywords": ["Pferd Verkaufspreis optimieren", "Pferdemarkt Verkaufsstrategie", "Pferd teurer verkaufen", "Pferdewert steigern", "Pferdeverkauf Gewinn maximieren"]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Verkaufspreis optimieren - Maximaler Erlös beim Pferdeverkauf | PferdeWert.de</title>
        <meta
          name="description"
          content="Professionelle Strategien zur Verkaufspreisoptimierung: Marktanalyse, Bewertung, Timing und Präsentation für maximale Erlöse beim Pferdeverkauf. Expertentipps für Deutschland."
        />
        <meta
          name="keywords"
          content="Pferd Verkaufspreis optimieren, Pferdemarkt Verkaufsstrategie, Pferd teurer verkaufen, Pferdewert steigern, Pferdeverkauf Gewinn maximieren, Pferdebewertung"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren" />

        {/* Open Graph */}
        <meta property="og:title" content="Verkaufspreis optimieren - Maximaler Erlös beim Pferdeverkauf" />
        <meta property="og:description" content="Professionelle Strategien zur Verkaufspreisoptimierung für maximale Erlöse beim Pferdeverkauf. Marktanalyse, Bewertung und Präsentationstipps." />
        <meta property="og:url" content="https://pferdewert.de/pferd-verkaufen/verkaufspreis-optimieren" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://pferdewert.de/images/verkaufspreis-optimierung-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verkaufspreis optimieren - Maximaler Erlös beim Pferdeverkauf" />
        <meta name="twitter:description" content="Professionelle Strategien zur Verkaufspreisoptimierung für maximale Erlöse beim Pferdeverkauf." />
        <meta name="twitter:image" content="https://pferdewert.de/images/verkaufspreis-optimierung-twitter.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-amber-600 transition-colors">
                Startseite
              </Link>
              <span>/</span>
              <Link href="/pferd-verkaufen" className="hover:text-amber-600 transition-colors">
                Pferd verkaufen
              </Link>
              <span>/</span>
              <span className="text-amber-600 font-medium">Verkaufspreis optimieren</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Verkaufspreis optimieren
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
                Maximieren Sie Ihren Erlös beim Pferdeverkauf mit bewährten Strategien für Marktanalyse,
                professionelle Bewertung und optimale Präsentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pferd-verkaufen/pferdewert-berechnen"
                  className="inline-flex items-center bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Pferdewert berechnen
                </Link>
                <a
                  href="#strategien"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Strategien entdecken
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">25%</div>
                <div className="text-gray-600">Durchschnittliche Wertsteigerung durch optimierte Präsentation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">60 Tage</div>
                <div className="text-gray-600">Reduzierte Verkaufsdauer bei professioneller Vorbereitung</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">15%</div>
                <div className="text-gray-600">Höhere Erlöse durch optimales Timing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">90%</div>
                <div className="text-gray-600">Erfolgsquote bei vollständiger Dokumentation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Preisoptimierungsstrategien */}
        <section id="strategien" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bewährte Preisoptimierungsstrategien
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vier Kernstrategien, die nachweislich zu höheren Verkaufserlösen führen und
                die Verkaufsdauer verkürzen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {preisOptimierungsStrategien.map((strategie, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      <strategie.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{strategie.titel}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{strategie.beschreibung}</p>
                  <ul className="space-y-3">
                    {strategie.tipps.map((tipp, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tipp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preisfaktoren und Gewichtung */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preisfaktoren und ihre Gewichtung
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Verstehen Sie, welche Faktoren den Verkaufspreis am stärksten beeinflussen
                und wo Sie gezielt optimieren können.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid gap-6">
                {preisfaktoren.map((faktor, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{faktor.faktor}</h3>
                      <p className="text-gray-600 text-sm">{faktor.optimierung}</p>
                    </div>
                    <div className="flex items-center ml-6">
                      <div className="text-right mr-4">
                        <div className="text-2xl font-bold text-amber-600">{faktor.gewichtung}</div>
                        <div className="text-sm text-gray-500">Einfluss</div>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-amber-500 h-3 rounded-full"
                          style={{ width: faktor.gewichtung }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verkaufsplattform-Strategien */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Verkaufsplattform strategisch wählen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Die richtige Plattform kann den Verkaufspreis um 10-30% steigern.
                Wählen Sie basierend auf Ihrem Preissegment und Ihrer Zielgruppe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufsplattformStrategien.map((plattform, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{plattform.plattform}</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zielgruppe:</span>
                      <span className="font-medium">{plattform.zielgruppe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gebühren:</span>
                      <span className="font-medium">{plattform.gebühren}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reichweite:</span>
                      <span className="font-medium">{plattform.reichweite}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Vorteile:</h4>
                    <ul className="space-y-2">
                      {plattform.vorteile.map((vorteil, vIndex) => (
                        <li key={vIndex} className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 mr-2" />
                          <span className="text-gray-700 text-sm">{vorteil}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Häufige Fehler vermeiden */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fehler vermeiden
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Diese vier Fehler können Ihren Verkaufserlös erheblich schmälern.
                Lernen Sie, wie Sie sie vermeiden und stattdessen profitabel verkaufen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {häufigeFehler.map((fehler, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-600 mb-3">{fehler.fehler}</h3>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Auswirkung:</span>
                    <p className="text-gray-700 mt-1">{fehler.auswirkung}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Lösung:</span>
                    <p className="text-gray-700 mt-1">{fehler.lösung}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Starten Sie Ihre Preisoptimierung heute
            </h2>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Nutzen Sie unsere AI-gestützte Bewertung als Grundlage für Ihre
              Verkaufspreisoptimierung und maximieren Sie Ihren Erlös.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pferd-verkaufen/pferdewert-berechnen"
                className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors text-lg"
              >
                <Calculator className="mr-3 h-6 w-6" />
                Kostenlosen Pferdewert berechnen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufig gestellte Fragen
              </h2>
              <p className="text-xl text-gray-600">
                Antworten auf die wichtigsten Fragen zur Verkaufspreisoptimierung
              </p>
            </div>

            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                    <span className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </span>
                    {item.frage}
                  </h3>
                  <p className="text-gray-700 leading-relaxed ml-12">{item.antwort}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Weiterführende Informationen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/pferd-verkaufen"
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center group"
              >
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Users className="h-8 w-8 text-amber-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pferd verkaufen</h3>
                <p className="text-gray-600">Kompletter Leitfaden für den erfolgreichen Pferdeverkauf</p>
              </Link>

              <Link
                href="/pferd-verkaufen/pferdewert-berechnen"
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center group"
              >
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Calculator className="h-8 w-8 text-amber-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pferdewert berechnen</h3>
                <p className="text-gray-600">AI-gestützte Bewertung für Ihr Pferd</p>
              </Link>

              <Link
                href="/pferd-kaufen"
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center group"
              >
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Target className="h-8 w-8 text-amber-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pferd kaufen</h3>
                <p className="text-gray-600">Ratgeber für den erfolgreichen Pferdekauf</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VerkaufspreisOptimierenPage;