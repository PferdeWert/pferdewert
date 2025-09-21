import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Star, MapPin, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

const PferdKaufenBadenWuerttemberg = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Navigation will be handled by Link component
    setTimeout(() => setIsLoading(false), 100);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wie viel kostet ein Pferd in Baden-Württemberg?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Preise für Pferde in Baden-Württemberg variieren je nach Rasse, Ausbildungsstand und Region. Freizeitpferde kosten zwischen €3.000-€8.000, gut ausgebildete Sportpferde €8.000-€25.000+. Unsere KI-Analyse berücksichtigt lokale Marktdaten für realistische Bewertungen."
            }
          },
          {
            "@type": "Question",
            "name": "Welche Rassen sind in Baden-Württemberg besonders beliebt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Baden-Württemberg sind besonders Warmblüter (Württemberger, Hannoveraner), Haflinger und Freiberger beliebt. Die regionale Zucht hat eine lange Tradition, was sich in der Qualität und den Preisen widerspiegelt."
            }
          },
          {
            "@type": "Question",
            "name": "Wo finde ich seriöse Pferdehändler in Baden-Württemberg?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Seriöse Händler finden Sie über Reitvereine, Zuchtverbände oder Online-Plattformen. Achten Sie auf Transparenz bei Gesundheitszeugnissen und lassen Sie das Pferd vor Kauf professionell bewerten."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "PferdeWert - Pferdebewertung Baden-Württemberg",
        "description": "Professionelle KI-gestützte Pferdebewertung für faire Marktpreise in Baden-Württemberg",
        "url": "https://pferdewert.de/pferd-kaufen-baden-wuerttemberg",
        "telephone": "+49-XXX-XXXXXXX",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Baden-Württemberg",
          "addressCountry": "DE"
        },
        "areaServed": {
          "@type": "State",
          "name": "Baden-Württemberg"
        },
        "serviceType": "Pferdebewertung"
      },
      {
        "@type": "Product",
        "name": "KI-Pferdebewertung Baden-Württemberg",
        "description": "Professionelle Pferdebewertung mit KI-Analyse für Baden-Württemberg",
        "brand": {
          "@type": "Brand",
          "name": "PferdeWert"
        },
        "offers": {
          "@type": "Offer",
          "price": "14.90",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01"
        }
      },
      {
        "@type": "WebPage",
        "name": "Pferd kaufen Baden-Württemberg - Faire Preise finden | PferdeWert",
        "description": "Pferdekauf in BW: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Baden-Württemberg.",
        "url": "https://pferdewert.de/pferd-kaufen-baden-wuerttemberg",
        "mainEntity": {
          "@type": "Service",
          "name": "Pferdebewertung Baden-Württemberg",
          "provider": {
            "@type": "Organization",
            "name": "PferdeWert"
          }
        }
      },
      {
        "@type": "ItemList",
        "name": "Beliebte Pferderassen in Baden-Württemberg",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Württemberger Warmblut"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Hannoveraner"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Haflinger"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Freiberger"
          }
        ]
      },
      {
        "@type": "AggregateOffer",
        "offerCount": "3",
        "offers": [
          {
            "@type": "Offer",
            "name": "Freizeitpferd BW",
            "price": "3000-8000",
            "priceCurrency": "EUR"
          },
          {
            "@type": "Offer",
            "name": "Sportpferd BW",
            "price": "8000-25000",
            "priceCurrency": "EUR"
          },
          {
            "@type": "Offer",
            "name": "Zuchtpferd BW",
            "price": "5000-15000",
            "priceCurrency": "EUR"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pferdewert.de/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Pferd kaufen Baden-Württemberg",
            "item": "https://pferdewert.de/pferd-kaufen-baden-wuerttemberg"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd kaufen Baden-Württemberg: KI-Bewertung & Preisanalyse | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen Baden-Württemberg & Bayern: KI-gestützte Preisanalyse für Stuttgart, Karlsruhe & Mannheim. Württemberger, Hannoveraner & Warmblüter professionell bewerten!"
        />
        <meta
          name="keywords"
          content="pferd kaufen baden württemberg, pferde stuttgart, pferdemarkt karlsruhe, pferdebewertung bw, pferde mannheim, reitpferd baden württemberg"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Baden-Württemberg: KI-Bewertung & Preisanalyse | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Baden-Württemberg & Bayern: KI-gestützte Preisanalyse für Stuttgart, Karlsruhe & Mannheim. Württemberger, Hannoveraner & Warmblüter professionell bewerten!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen-baden-wuerttemberg" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-baden-wuerttemberg-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Baden-Württemberg: KI-Bewertung & Preisanalyse | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen Baden-Württemberg & Bayern: KI-gestützte Preisanalyse für Stuttgart, Karlsruhe & Mannheim. Württemberger, Hannoveraner & Warmblüter professionell bewerten!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-baden-wuerttemberg-twitter.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen-baden-wuerttemberg" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
              <span className="text-gray-700 font-medium">Pferd kaufen Baden-Württemberg</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  #1 Pferdebewertung in Baden-Württemberg
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Pferd kaufen in{' '}
                <span className="text-blue-600">Baden-Württemberg</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Ermitteln Sie mit KI-Analyse faire Marktpreise für Pferde in BW.
                Professionelle Bewertung für sichere Kaufentscheidungen.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/bewertung"
                  onClick={handleGetStarted}
                  className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Pferd bewerten lassen - 14,90€
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>
                <Link
                  href="#mehr-erfahren"
                  className="text-blue-600 hover:text-blue-800 font-semibold py-4 px-8 rounded-lg border-2 border-blue-600 hover:border-blue-800 transition-all duration-200 text-lg"
                >
                  Mehr erfahren
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>KI-gestützte Analyse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Datenschutz garantiert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>4.8/5 Kundenbewertung</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Statistics */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pferdemarkt Baden-Württemberg in Zahlen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Baden-Württemberg hat eine der aktivsten Reitsportszenen Deutschlands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">2.800+</div>
                <div className="text-gray-700 font-medium">Reitvereine in BW</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">45.000+</div>
                <div className="text-gray-700 font-medium">Pferdebesitzer</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-yellow-600 mb-2">€8.500</div>
                <div className="text-gray-700 font-medium">Ø Pferdewert in BW</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-12 w-12 text-purple-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-gray-700 font-medium">Regierungsbezirke</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="mehr-erfahren" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Warum Pferdebewertung in Baden-Württemberg?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Starker Pferdemarkt</h3>
                      <p className="text-gray-700">
                        Baden-Württemberg hat eine der aktivsten Reitsportszenen in Deutschland mit über
                        2.800 Reitvereinen und 45.000+ Pferdebesitzern.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Faire Preisgestaltung</h3>
                      <p className="text-gray-700">
                        Regionale Marktdaten aus Stuttgart, Karlsruhe und Mannheim für
                        realistische und marktgerechte Bewertungen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professionelle Unterstützung</h3>
                      <p className="text-gray-700">
                        KI-basierte Analyse kombiniert mit Expertenwissen für fundierte
                        Kaufentscheidungen im baden-württembergischen Pferdemarkt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    Beliebt bei Kunden
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Jetzt Pferd bewerten lassen
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professionelle KI-Analyse für faire Marktpreise in Baden-Württemberg
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">KI-gestützte Marktanalyse</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Regionale Marktdaten BW</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Sofortiger PDF-Report</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Geld-zurück-Garantie</span>
                  </div>
                </div>

                <Link
                  href="/bewertung"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 inline-block text-center text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Pferd bewerten lassen - 14,90€
                </Link>

                <p className="text-center text-sm text-gray-500 mt-4">
                  ✓ Sichere Zahlung ✓ Sofortiger Zugang ✓ 30 Tage Geld-zurück
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pferdemarkt in den BW-Regionen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Detaillierte Marktdaten aus den wichtigsten Pferdezentren Baden-Württembergs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Stuttgart Region</h3>
                </div>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Reit- und Fahrverein Stuttgart
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PSV Stuttgart-Vaihingen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Stuttgarter Reitclub
                  </li>
                </ul>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">€9.200</div>
                  <div className="text-sm text-gray-600">Durchschnittspreis</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Karlsruhe Region</h3>
                </div>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Karlsruher Reit- und Fahrclub
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    RFV Ettlingen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PSV Karlsruhe
                  </li>
                </ul>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">€8.800</div>
                  <div className="text-sm text-gray-600">Durchschnittspreis</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-8 w-8 text-yellow-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Mannheim Region</h3>
                </div>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mannheimer RV 1880
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    RFV Mannheim-Neckarau
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PSV Kurpfalz
                  </li>
                </ul>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">€8.400</div>
                  <div className="text-sm text-gray-600">Durchschnittspreis</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fragen zum Pferdekauf in Baden-Württemberg
              </h2>
              <p className="text-xl text-gray-600">
                Antworten auf die wichtigsten Fragen rund um den Pferdekauf in BW
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Wie viel kostet ein Pferd in Baden-Württemberg?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Preise für Pferde in Baden-Württemberg variieren je nach Rasse, Ausbildungsstand und Region.
                  Freizeitpferde kosten zwischen €3.000-€8.000, gut ausgebildete Sportpferde €8.000-€25.000+.
                  Unsere KI-Analyse berücksichtigt lokale Marktdaten für realistische Bewertungen.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Welche Rassen sind in Baden-Württemberg besonders beliebt?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  In Baden-Württemberg sind besonders Warmblüter (Württemberger, Hannoveraner),
                  Haflinger und Freiberger beliebt. Die regionale Zucht hat eine lange Tradition,
                  was sich in der Qualität und den Preisen widerspiegelt.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Wo finde ich seriöse Pferdehändler in Baden-Württemberg?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Seriöse Händler finden Sie über Reitvereine, Zuchtverbände oder Online-Plattformen.
                  Achten Sie auf Transparenz bei Gesundheitszeugnissen und lassen Sie das Pferd vor Kauf
                  professionell bewerten - unsere KI-Analyse hilft dabei, faire Preise zu ermitteln.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Professionelle Pferdebewertung für Baden-Württemberg
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Nutzen Sie unsere KI-gestützte Analyse für faire Marktpreise und sichere Kaufentscheidungen
              im baden-württembergischen Pferdemarkt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/bewertung"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Jetzt Pferd bewerten lassen
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/kontakt"
                className="text-white hover:text-blue-100 font-semibold py-4 px-8 rounded-lg border-2 border-white hover:border-blue-100 transition-all duration-200 text-lg"
              >
                Beratung anfordern
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Über 10.000 zufriedene Kunden</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>100% Geld-zurück-Garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.8/5 Sterne Bewertung</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PferdKaufenBadenWuerttemberg;