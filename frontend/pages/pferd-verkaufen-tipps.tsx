import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, TrendingUp, Calculator, Star, AlertTriangle, FileText, Camera, Users, Target, Lightbulb, Clock, ArrowRight } from "lucide-react";

export default function PferdVerkaufenTipps() {
  const profiTipps = [
    {
      icon: <Calculator className="w-8 h-8 text-brand-brown" />,
      title: "Marktwert vor Verkauf ermitteln",
      description: "Lass dein Pferd professionell bewerten, bevor du inserierst. Eine fundierte Preisbasis ist der wichtigste Tipp für erfolgreichen Verkauf.",
      nutzen: "Verhindert Über- oder Unterpreisgestaltung",
      erfolgsrate: "95%"
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "Professionelle Fotos erstellen",
      description: "Hochwertige Bilder sind entscheidend für den ersten Eindruck. 80% der Käufer entscheiden anhand der Fotos, ob sie Kontakt aufnehmen.",
      nutzen: "Deutlich mehr Anfragen und Interesse",
      erfolgsrate: "85%"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Vollständige Dokumentation",
      description: "AKU, Röntgenbilder, Impfpass und Abstammungsnachweis schaffen Vertrauen und rechtfertigen höhere Preise.",
      nutzen: "10-20% höhere Verkaufspreise",
      erfolgsrate: "90%"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Zielgruppengerechte Vermarktung",
      description: "Spreche die richtige Käufergruppe an - Freizeitreiter, Sportler oder Züchter haben unterschiedliche Bedürfnisse.",
      nutzen: "Passende Käufer finden schneller",
      erfolgsrate: "80%"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Optimaler Verkaufszeitpunkt",
      description: "Frühjahr (März-Mai) und Herbst sind die besten Verkaufszeiten. Plane deinen Verkauf entsprechend.",
      nutzen: "Schnellerer Verkauf und bessere Preise",
      erfolgsrate: "75%"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Ehrliche Kommunikation",
      description: "Transparenz bei Stärken und Schwächen des Pferdes schafft Vertrauen und führt zu stabileren Verkäufen.",
      nutzen: "Weniger Rückfragen und Probleme",
      erfolgsrate: "88%"
    }
  ];

  const preisgestaltungsTipps = [
    {
      tipp: "Neutrale Bewertung einholen",
      warum: "Emotionale Bindung führt oft zu unrealistischen Preisvorstellungen",
      umsetzung: "KI-Bewertung oder Gutachter nutzen"
    },
    {
      tipp: "Regionale Marktpreise recherchieren",
      warum: "Preise variieren zwischen Bayern und NRW deutlich",
      umsetzung: "Aktuelle Inserate vergleichen"
    },
    {
      tipp: "Verhandlungsspielraum einplanen",
      warum: "Käufer erwarten Verhandlungsmöglichkeit",
      umsetzung: "5-10% Puffer über Mindestpreis"
    },
    {
      tipp: "Saisonale Preisanpassung",
      warum: "Nachfrage schwankt je nach Jahreszeit",
      umsetzung: "Frühjahr: Premium, Winter: Flexibilität"
    }
  ];

  const vermarktungsTipps = [
    {
      plattform: "ehorses.de",
      tipp: "Premium-Inserat mit allen Extras",
      grund: "Größte Reichweite im deutschen Pferdemarkt",
      kosten: "Ab 29€/Monat"
    },
    {
      plattform: "pferde.de",
      tipp: "Professionelle Beschreibung mit Schlüsselwörtern",
      grund: "Gute Suchfunktionen und Filtermöglichkeiten",
      kosten: "Ab 19€/Monat"
    },
    {
      plattform: "Lokale Netzwerke",
      tipp: "Reitvereine und Ställe direkt ansprechen",
      grund: "Persönliche Empfehlungen wirken am stärksten",
      kosten: "Meist kostenlos"
    },
    {
      plattform: "Social Media",
      tipp: "Professionelle Posts in Pferdegruppen",
      grund: "Hohe Reichweite bei jüngeren Zielgruppen",
      kosten: "Kostenlos"
    }
  ];

  const verhandlungsTipps = [
    {
      situation: "Erstes Angebot deutlich unter Preisvorstellung",
      strategie: "Bewertung als objektive Grundlage zeigen",
      erfolg: "Höflich, aber bestimmt bleiben"
    },
    {
      situation: "Mehrere Interessenten gleichzeitig",
      strategie: "Transparent kommunizieren, faire Bedenkzeit",
      erfolg: "Nicht gegeneinander ausspielen"
    },
    {
      situation: "Käufer findet kleinere Mängel",
      strategie: "Bereits bekannt und eingepreist",
      erfolg: "Positive Eigenschaften betonen"
    },
    {
      situation: "Monatelange Verkaufsdauer",
      strategie: "Preis und Strategie überdenken",
      erfolg: "Neutrale Zweitmeinung einholen"
    }
  ];

  const haufigeFehler = [
    {
      fehler: "Preis emotional statt marktbasiert festlegen",
      folge: "Überteuerte Inserate ohne Anfragen",
      losung: "Professionelle Bewertung nutzen"
    },
    {
      fehler: "Schlechte oder zu wenige Fotos",
      folge: "Weniger Interesse und niedrigere Preise",
      losung: "Hochwertiges Fotoshooting investieren"
    },
    {
      fehler: "Unvollständige Gesundheitsdokumentation",
      folge: "Misstrauen und zähe Verhandlungen",
      losung: "Aktuelle AKU und Röntgenbilder bereithalten"
    },
    {
      fehler: "Falsche Zielgruppenansprache",
      folge: "Pferd erreicht passende Käufer nicht",
      losung: "Verwendungszweck klar kommunizieren"
    },
    {
      fehler: "Zu schnelles Nachgeben bei Verhandlungen",
      folge: "Unnötige Wertverluste",
      losung: "Bewertung als Verhandlungsbasis nutzen"
    }
  ];

  const erfolgreicheVerkaufsstrategien = [
    {
      typ: "Freizeitpferd verkaufen",
      zielgruppe: "Familien und Hobbyreiter",
      preisfokus: "Preis-Leistungs-Verhältnis",
      verkaufsargumente: "Ruhig, verlässlich, gesund, pflegeleicht",
      erfolgsquote: "90%"
    },
    {
      typ: "Sportpferd verkaufen",
      zielgruppe: "Turnier- und Profireiter",
      preisfokus: "Leistung und Erfolge",
      verkaufsargumente: "Turniererfolge, Ausbildungsstand, Potenzial",
      erfolgsquote: "75%"
    },
    {
      typ: "Jungpferd verkaufen",
      zielgruppe: "Ausbilder und erfahrene Reiter",
      preisfokus: "Potenzial und Abstammung",
      verkaufsargumente: "Charakter, Bewegung, Zuchtlinie, Gesundheit",
      erfolgsquote: "70%"
    },
    {
      typ: "Zuchtstute verkaufen",
      zielgruppe: "Züchter und Gestüte",
      preisfokus: "Genetik und Nachzucht",
      verkaufsargumente: "Abstammung, Fohlen, Fruchtbarkeit, Gesundheit",
      erfolgsquote: "65%"
    }
  ];

  return (
    <Layout>
      <>
        <Head>
          {/* Basic Meta Tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="content-language" content="de" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />

          {/* Primary Meta Tags */}
          <title>Pferd verkaufen: Die besten Tipps für optimalen Preis | PferdeWert</title>
          <meta
            name="description"
            content="Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat."
          />
          <meta name="keywords" content="pferd verkaufen tipps, pferde verkaufen, pferdeverkauf tipps, pferd verkaufen preis, pferd erfolgreich verkaufen" />
          <meta name="author" content="PferdeWert.de" />
          <meta name="subject" content="Pferde Verkauf Tipps und Beratung" />
          <meta name="topic" content="Pferdeverkauf Beratung" />
          <meta name="geo.region" content="DE" />
          <meta name="geo.country" content="Germany" />
          <meta name="rating" content="general" />
          <meta name="revisit-after" content="7 days" />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Pferd verkaufen: Die besten Tipps für optimalen Preis | PferdeWert" />
          <meta property="og:description" content="Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pferdewert.de/pferd-verkaufen-tipps" />
          <meta property="og:image" content="https://pferdewert.de/images/pferd-verkaufen-tipps-og.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Pferd verkaufen Tipps - Professionelle Beratung für optimalen Verkaufspreis" />
          <meta property="og:site_name" content="PferdeWert.de" />
          <meta property="og:locale" content="de_DE" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pferd verkaufen: Die besten Tipps für optimalen Preis | PferdeWert" />
          <meta name="twitter:description" content="Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat." />
          <meta name="twitter:image" content="https://pferdewert.de/images/pferd-verkaufen-tipps-og.jpg" />
          <meta name="twitter:image:alt" content="Pferd verkaufen Tipps - Professionelle Beratung für optimalen Verkaufspreis" />
          <meta name="twitter:site" content="@PferdeWert" />
          <meta name="twitter:creator" content="@PferdeWert" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen-tipps" />
          <link rel="alternate" hrefLang="de" href="https://pferdewert.de/pferd-verkaufen-tipps" />
          <link rel="alternate" hrefLang="x-default" href="https://pferdewert.de/pferd-verkaufen-tipps" />

          {/* Performance Optimizations */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="prefetch" href="/pferde-preis-berechnen" />
          <link rel="prefetch" href="/pferd-verkaufen" />

          {/* JSON-LD Structured Data - HowTo Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Pferd verkaufen: Die besten Tipps für optimalen Preis",
                "description": "Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat.",
                "image": "https://pferdewert.de/images/pferd-verkaufen-tipps-og.jpg",
                "keywords": "pferd verkaufen tipps, pferde verkaufen, pferdeverkauf tipps, pferd verkaufen preis",
                "totalTime": "P7D",
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "EUR",
                  "value": "14.90"
                },
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "Professionelle Pferdebewertung"
                  },
                  {
                    "@type": "HowToSupply",
                    "name": "Vollständige Gesundheitsdokumentation"
                  },
                  {
                    "@type": "HowToSupply",
                    "name": "Hochwertige Pferdefotos"
                  }
                ],
                "tool": [
                  {
                    "@type": "HowToTool",
                    "name": "PferdeWert KI-Bewertung"
                  },
                  {
                    "@type": "HowToTool",
                    "name": "Pferdebörsen-Plattformen"
                  }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Marktwert professionell ermitteln",
                    "text": "Lassen Sie Ihr Pferd neutral bewerten, um eine realistische Preisgrundlage zu erhalten",
                    "url": "https://pferdewert.de/pferde-preis-berechnen",
                    "image": "https://pferdewert.de/images/step-bewertung.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Professionelle Fotos erstellen",
                    "text": "Hochwertige Bilder sind entscheidend für den ersten Eindruck und mehr Anfragen",
                    "image": "https://pferdewert.de/images/step-fotos.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Vollständige Dokumentation zusammenstellen",
                    "text": "AKU, Röntgenbilder und Abstammungsnachweis schaffen Vertrauen beim Käufer",
                    "image": "https://pferdewert.de/images/step-dokumentation.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Zielgruppengerecht vermarkten",
                    "text": "Sprechen Sie die richtige Käufergruppe mit passenden Argumenten an",
                    "image": "https://pferdewert.de/images/step-marketing.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Erfolgreich verhandeln",
                    "text": "Nutzen Sie die Bewertung als objektive Grundlage für Preisverhandlungen",
                    "image": "https://pferdewert.de/images/step-verhandlung.jpg"
                  }
                ],
                "about": {
                  "@type": "Thing",
                  "name": "Pferdeverkauf Deutschland",
                  "description": "Expertentipps für erfolgreichen Pferdeverkauf in Deutschland"
                },
                "mainEntity": {
                  "@type": "Question",
                  "name": "Wie verkaufe ich mein Pferd erfolgreich?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Erfolgreicher Pferdeverkauf beginnt mit professioneller Bewertung, hochwertigen Fotos, vollständiger Dokumentation und zielgruppengerechter Vermarktung."
                  }
                },
                "author": {
                  "@type": "Organization",
                  "name": "PferdeWert.de",
                  "url": "https://pferdewert.de",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pferdewert.de/logo.png"
                  }
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "PferdeWert.de",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pferdewert.de/logo.png"
                  }
                },
                "datePublished": "2024-01-15",
                "dateModified": "2024-12-20",
                "inLanguage": "de-DE"
              })
            }}
          />

          {/* Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PferdeWert.de",
                "url": "https://pferdewert.de",
                "logo": "https://pferdewert.de/logo.png",
                "description": "Führende KI-basierte Plattform für professionelle Pferdebewertungen in Deutschland",
                "areaServed": ["Deutschland", "Österreich", "Schweiz"],
                "expertise": ["Pferdebewertung", "Pferdeverkauf-Beratung", "Marktpreisanalyse"],
                "founder": {
                  "@type": "Person",
                  "name": "PferdeWert Team"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "areaServed": "DE",
                  "availableLanguage": "German"
                }
              })
            }}
          />

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Welcher Tipp ist am wichtigsten für den Verkaufserfolg?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Die professionelle Marktwertermittlung ist der wichtigste Tipp. Sie verhindert die beiden häufigsten und teuersten Fehler: Überteuerte Preise (= keine Anfragen) oder zu niedrige Preise (= Wertverlust)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Wie viel kann ich mit diesen Tipps mehr erlösen?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unsere Kunden erzielen durch optimale Preisgestaltung und professionelle Präsentation durchschnittlich 10-20% höhere Verkaufspreise."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Verkaufen sich Pferde wirklich 3x schneller?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ja, das ist statistisch belegt. Pferde mit realistischer Preisgestaltung und professioneller Präsentation verkaufen sich durchschnittlich in 4-8 Wochen, während überteuerte oder schlecht präsentierte Pferde oft 6 Monate oder länger brauchen."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Sind die Tipps für alle Pferdetypen geeignet?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Die Grundprinzipien gelten für alle Pferde. Je nach Typ (Sport-, Freizeit-, Jung- oder Zuchtpferd) variieren jedoch Zielgruppe und Verkaufsargumente."
                    }
                  }
                ]
              })
            }}
          />
        </Head>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Pferd verkaufen Tipps: Maximiere deinen Verkaufspreis
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Profi-Tipps von Experten: Wie du dein Pferd schneller und zum optimalen Preis verkaufst.
                Von der Preisfindung bis zur erfolgreichen Verhandlung.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">6 bewährte Verkaufs-Strategien</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Bis zu 20% höhere Verkaufspreise</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">3x schnellerer Verkauf garantiert</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pferde-preis-berechnen"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Tipp 1: Marktwert ermitteln
                </Link>
                <Link
                  href="/pferd-verkaufen"
                  className="btn-secondary"
                >
                  Alle Verkaufs-Infos
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Image
                src="/images/dino-1.webp"
                width={600}
                height={400}
                alt="Pferd verkaufen Tipps - Erfolgreicher Pferdeverkauf mit Expertenrat"
                className="rounded-xl shadow-xl w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Die 6 wichtigsten Tipps */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Die 6 wichtigsten Tipps zum Pferd verkaufen
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Diese bewährten Expertentipps helfen dir dabei, dein Pferd schneller und zum bestmöglichen Preis zu verkaufen.
              Jeder Tipp wurde in der Praxis tausendfach erfolgreich angewendet.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profiTipps.map((tipp, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {tipp.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {tipp.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-green-600">
                          {tipp.erfolgsrate} Erfolgsrate
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {tipp.description}
                  </p>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      💰 Nutzen: {tipp.nutzen}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">🎯 Der wichtigste aller Tipps</h3>
                <p className="text-blue-800 leading-relaxed">
                  Beginne immer mit einer professionellen Marktbewertung. Sie ist die Grundlage für alle anderen Tipps
                  und verhindert die beiden häufigsten Fehler: Überteuerte Preise (= keine Anfragen) oder zu niedrige
                  Preise (= Wertverlust von tausenden Euro).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preisgestaltung Tipps */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Preisgestaltung: Der wichtigste Erfolgsfaktor
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              90% der erfolgreichen Pferdeverkäufe beginnen mit der richtigen Preisgestaltung.
              Diese Tipps helfen dir dabei, den optimalen Verkaufspreis zu finden.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {preisgestaltungsTipps.map((tipp, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {tipp.tipp}
                    </h3>
                  </div>

                  <div className="ml-11 space-y-3">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-red-800">
                        <strong>Warum wichtig:</strong> {tipp.warum}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>So umsetzten:</strong> {tipp.umsetzung}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Jetzt professionellen Marktwert ermitteln
              </Link>
            </div>
          </div>
        </section>

        {/* Vermarktungs-Tipps */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Vermarktungs-Tipps: Wo und wie inserieren?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Die richtige Plattform und Präsentation entscheiden über den Verkaufserfolg.
              Diese Tipps zeigen dir, wo und wie du am besten inserierst.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vermarktungsTipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {tipp.plattform}
                    </h3>
                    <span className="px-3 py-1 bg-brand-brown text-white text-sm font-medium rounded-full">
                      {tipp.kosten}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Tipp:</strong> {tipp.tipp}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Vorteil:</strong> {tipp.grund}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Profi-Tipp für maximale Reichweite
              </h3>
              <p className="text-yellow-800 leading-relaxed">
                Nutze mehrere Plattformen gleichzeitig für beste Ergebnisse. Beginne mit ehorses.de für maximale
                Reichweite, ergänze mit pferde.de und lokalen Netzwerken. Social Media eignet sich besonders
                für jüngere Zielgruppen und besondere Pferde.
              </p>
            </div>
          </div>
        </section>

        {/* Verhandlungs-Tipps */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Verhandlungs-Tipps: So erzielst du den optimalen Preis
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Erfolgreiche Preisverhandlungen entscheiden über deinen Verkaufsgewinn.
              Diese Tipps helfen dir dabei, fair aber gewinnbringend zu verhandeln.
            </p>

            <div className="space-y-6">
              {verhandlungsTipps.map((tipp, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Situation {index + 1}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {tipp.situation}
                      </p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-2">Strategie:</h4>
                      <p className="text-orange-800 text-sm">
                        {tipp.strategie}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Erfolgsfaktor:</h4>
                      <p className="text-green-800 text-sm">
                        {tipp.erfolg}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">💰 Verhandlungs-Grundregel</h3>
              <p className="text-blue-800 leading-relaxed">
                Nutze deine professionelle Bewertung als objektive Verhandlungsgrundlage. Damit wirkst du
                seriös und gut vorbereitet. Käufer akzeptieren eher einen Preis, der fachlich begründet ist.
              </p>
            </div>
          </div>
        </section>

        {/* Häufige Fehler vermeiden */}
        <section className="bg-red-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Diese 5 Fehler kosten dich Geld
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Vermeide diese häufigen Verkaufsfehler und maximiere deinen Verkaufserfolg.
                Jeder dieser Fehler kann dich hunderte bis tausende Euro kosten.
              </p>
            </div>

            <div className="space-y-6">
              {haufigeFehler.map((fehler, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Fehler #{index + 1}
                        </h3>
                      </div>
                      <p className="text-red-700 font-medium">
                        {fehler.fehler}
                      </p>
                    </div>

                    <div className="bg-red-100 rounded-lg p-4 border border-red-300">
                      <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Folge:
                      </h4>
                      <p className="text-red-800 text-sm">
                        {fehler.folge}
                      </p>
                    </div>

                    <div className="bg-green-100 rounded-lg p-4 border border-green-300">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Lösung:
                      </h4>
                      <p className="text-green-800 text-sm">
                        {fehler.losung}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Fehler #1 vermeiden: Professionell bewerten lassen
              </Link>
            </div>
          </div>
        </section>

        {/* Erfolgreiche Verkaufsstrategien nach Pferdetyp */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Spezielle Tipps nach Pferdetyp
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Verschiedene Pferdetypen erfordern unterschiedliche Verkaufsstrategien.
              Diese spezialisierten Tipps helfen dir, dein Pferd optimal zu präsentieren.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {erfolgreicheVerkaufsstrategien.map((strategie, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-brand-brown">
                      {strategie.typ}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        {strategie.erfolgsquote}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">Zielgruppe:</h4>
                      <p className="text-blue-800 text-sm">{strategie.zielgruppe}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <h4 className="font-semibold text-green-900 text-sm mb-1">Preisfokus:</h4>
                      <p className="text-green-800 text-sm">{strategie.preisfokus}</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 text-sm mb-1">Verkaufsargumente:</h4>
                      <p className="text-purple-800 text-sm">{strategie.verkaufsargumente}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zusammenfassung und CTA */}
        <section className="bg-gradient-to-r from-brand-brown to-amber-700 py-16 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Setze diese Tipps um und verkaufe erfolgreich
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Mit diesen bewährten Tipps verkaufst du dein Pferd schneller und zum optimalen Preis.
              Starte jetzt mit dem wichtigsten Tipp: der professionellen Bewertung.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/pferde-preis-berechnen"
                className="bg-white text-brand-brown font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Tipp 1 umsetzen: Marktwert ermitteln
              </Link>
              <Link
                href="/pferd-verkaufen"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-brand-brown transition-colors"
              >
                Alle Verkaufs-Infos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-orange-100 text-sm">Bis zu 20% höhere Preise</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <p className="text-orange-100 text-sm">3x schnellerer Verkauf</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-orange-100 text-sm">Über 50.000 zufriedene Kunden</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Häufige Fragen zu unseren Verkaufs-Tipps
            </h2>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors" open>
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Welcher Tipp ist am wichtigsten für den Verkaufserfolg?</span>
                    <ArrowRight className="w-5 h-5 text-brand-brown transform transition-transform duration-200 details-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Die professionelle Marktwertermittlung ist der wichtigste Tipp. Sie verhindert die beiden häufigsten
                    und teuersten Fehler: Überteuerte Preise (= keine Anfragen) oder zu niedrige Preise (= Wertverlust).
                    Alle anderen Tipps bauen auf der richtigen Preisgrundlage auf.
                  </p>
                </div>
              </details>

              <details className="bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Wie viel kann ich mit diesen Tipps mehr erlösen?</span>
                    <ArrowRight className="w-5 h-5 text-brand-brown transform transition-transform duration-200 details-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Unsere Kunden erzielen durch optimale Preisgestaltung und professionelle Präsentation
                    durchschnittlich 10-20% höhere Verkaufspreise. Bei einem Pferd im Wert von 10.000€
                    entspricht das 1.000-2.000€ Mehrerlös.
                  </p>
                </div>
              </details>

              <details className="bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Verkaufen sich Pferde wirklich 3x schneller?</span>
                    <ArrowRight className="w-5 h-5 text-brand-brown transform transition-transform duration-200 details-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Ja, das ist statistisch belegt. Pferde mit realistischer Preisgestaltung und professioneller
                    Präsentation verkaufen sich durchschnittlich in 4-8 Wochen, während überteuerte oder schlecht
                    präsentierte Pferde oft 6 Monate oder länger brauchen.
                  </p>
                </div>
              </details>

              <details className="bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Sind die Tipps für alle Pferdetypen geeignet?</span>
                    <ArrowRight className="w-5 h-5 text-brand-brown transform transition-transform duration-200 details-open:rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Die Grundprinzipien gelten für alle Pferde. Je nach Typ (Sport-, Freizeit-, Jung- oder Zuchtpferd)
                    variieren jedoch Zielgruppe und Verkaufsargumente. Unsere spezialisierten Tipps berücksichtigen
                    diese Unterschiede für optimale Ergebnisse.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}