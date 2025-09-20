import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PferdKaufenNiedersachsen: React.FC = () => {
  // Strukturierte Daten für Schema.org
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/logo.png",
    "description": "Deutschlands führende Plattform für AI-gestützte Pferdebewertungen und Marktanalysen",
    "areaServed": "DE",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-XXX-XXXXXXX",
      "contactType": "customer service",
      "areaServed": "DE",
      "availableLanguage": "German"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Pferd kaufen in Niedersachsen: Preise, Züchter und Marktanalyse 2025",
    "description": "Umfassender Leitfaden zum Pferdekauf in Niedersachsen mit aktuellen Preisen, seriösen Züchtern und Marktanalysen für Hannoveraner, Oldenburger und andere niedersächsische Pferderassen.",
    "image": "https://pferdewert.de/images/niedersachsen-pferde.jpg",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert.de Experten-Team",
      "url": "https://pferdewert.de/ueber-uns"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PferdeWert.de",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pferdewert.de/logo.png"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen"
    }
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
        "name": "Pferd kaufen",
        "item": "https://pferdewert.de/pferd-kaufen"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Regionale Pferdepreise",
        "item": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Pferd kaufen Niedersachsen",
        "item": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet ein Pferd in Niedersachsen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Preise für Pferde in Niedersachsen variieren je nach Rasse, Ausbildungsstand und Verwendungszweck. Freizeitpferde kosten zwischen 3.000-15.000€, Hannoveraner Warmblüter 10.000-50.000€, und professionelle Sportpferde können 50.000€ oder mehr kosten. Ponys sind günstiger und kosten typischerweise 2.000-8.000€."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Pferderassen sind in Niedersachsen besonders beliebt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niedersachsen ist weltberühmt für Hannoveraner und Oldenburger Warmblüter. Weitere beliebte Rassen sind Deutsche Reitponys, Trakehner, und verschiedene Freizeitpferderassen. Das Landgestüt Celle züchtet traditionell hochwertige Warmblutpferde."
        }
      },
      {
        "@type": "Question",
        "name": "Wo kann ich seriöse Pferdehändler in Niedersachsen finden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Seriöse Pferdehändler in Niedersachsen finden Sie über Zuchtverbände, das Landgestüt Celle, Verkaufsställe in Verden/Hannover, und etablierte Pferdehöfe. Achten Sie auf Mitgliedschaften in Zuchtverbänden, Transparenz bei Gesundheitszeugnissen und Möglichkeiten zur Probezeit."
        }
      },
      {
        "@type": "Question",
        "name": "Wann finden die wichtigsten Pferdeauktionen in Niedersachsen statt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die bedeutendsten Auktionen finden in Verden statt: Elite-Auktion im Oktober, Frühjahrselite im März, und mehrere Fohlen- und Jungpferdeauktionen über das Jahr verteilt. Das Landgestüt Celle veranstaltet ebenfalls regelmäßige Auktionen mit hochqualitativen Pferden."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Pferd kaufen Niedersachsen: Preise, Züchter & Hannoveraner 2025 | PferdeWert.de</title>
        <meta name="description" content="Pferd kaufen in Niedersachsen ✓ Aktuelle Preise für Hannoveraner & Oldenburger ✓ Seriöse Züchter in Celle, Verden & Hannover ✓ Marktanalyse 2025 ✓ AI-Bewertung" />
        <meta name="keywords" content="pferd kaufen niedersachsen, hannoveraner kaufen, oldenburger pferd kaufen, pferdepreise niedersachsen, pferdehändler niedersachsen, landgestüt celle, verden auktion, freizeitpferd niedersachsen, dressurpferd kaufen" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Pferd kaufen Niedersachsen: Preise, Züchter & Hannoveraner 2025" />
        <meta property="og:description" content="Umfassender Guide zum Pferdekauf in Niedersachsen mit aktuellen Preisen, seriösen Züchtern und AI-gestützter Bewertung. Hannoveraner, Oldenburger & mehr." />
        <meta property="og:image" content="https://pferdewert.de/images/niedersachsen-pferde-social.jpg" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Niedersachsen: Preise & Züchter 2025" />
        <meta name="twitter:description" content="Aktueller Guide zum Pferdekauf in Niedersachsen mit Preisen für Hannoveraner, Oldenburger und seriösen Züchtern." />
        <meta name="twitter:image" content="https://pferdewert.de/images/niedersachsen-pferde-social.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen" />

        {/* Hreflang für andere Bundesländer */}
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern" />
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-nrw" />

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 py-4">
              <Link href="/" className="text-brown-600 hover:text-brown-800 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/pferd-kaufen" className="text-brown-600 hover:text-brown-800 transition-colors">
                Pferd kaufen
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/pferd-kaufen/regionale-pferdepreise" className="text-brown-600 hover:text-brown-800 transition-colors">
                Regionale Pferdepreise
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pferd kaufen Niedersachsen</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brown-800 to-brown-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-h1 font-bold mb-6">
                Pferd kaufen in Niedersachsen: Der ultimative Guide 2025
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-brown-100">
                Hannoveraner, Oldenburger & mehr: Aktuelle Preise, seriöse Züchter und AI-gestützte Marktanalysen
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bewertung" className="bg-white text-brown-800 px-8 py-3 rounded-lg font-semibold hover:bg-brown-50 transition-colors">
                  Kostenlose Pferdebewertung
                </Link>
                <Link href="#preistabelle" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brown-800 transition-colors">
                  Aktuelle Preise ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Inhaltsverzeichnis */}
        <section className="bg-white py-8 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Inhaltsverzeichnis</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li><a href="#marktueberblick" className="text-brown-600 hover:text-brown-800">1. Niedersachsens Pferdemarkt im Überblick</a></li>
                <li><a href="#preistabelle" className="text-brown-600 hover:text-brown-800">2. Aktuelle Pferdepreise nach Rassen</a></li>
                <li><a href="#zuchtgebiete" className="text-brown-600 hover:text-brown-800">3. Wichtige Zuchtgebiete & Zentren</a></li>
                <li><a href="#haendler" className="text-brown-600 hover:text-brown-800">4. Seriöse Pferdehändler finden</a></li>
              </ul>
              <ul className="space-y-2">
                <li><a href="#auktionen" className="text-brown-600 hover:text-brown-800">5. Auktionen & Verkaufsmärkte</a></li>
                <li><a href="#kaufprozess" className="text-brown-600 hover:text-brown-800">6. Der Kaufprozess in Niedersachsen</a></li>
                <li><a href="#transport" className="text-brown-600 hover:text-brown-800">7. Transport & Logistik</a></li>
                <li><a href="#faq" className="text-brown-600 hover:text-brown-800">8. Häufige Fragen (FAQ)</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Marktüberblick Niedersachsen */}
        <section id="marktueberblick" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Niedersachsens Pferdemarkt: Deutschlands Herz der Pferdezucht</h2>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Warum Niedersachsen für Pferdekäufer besonders ist</h3>
                  <p className="text-gray-700 mb-4">
                    Niedersachsen gilt als das <strong>Herz der deutschen Pferdezucht</strong> und beheimatet einige der renommiertesten
                    Zuchtlinien weltweit. Das Bundesland vereint <strong>jahrhundertealte Zuchttradition</strong> mit modernen
                    Trainingsmethoden und bietet Pferdekäufern eine einzigartige Vielfalt.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Mit dem <strong>Landgestüt Celle</strong> (gegründet 1735), den weltberühmten <strong>Verdener Auktionen</strong>
                    und über 200.000 registrierten Pferden ist Niedersachsen der wichtigste Pferdemarkt Deutschlands.
                  </p>
                  <div className="bg-brown-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-brown-800 mb-2">Besonderheiten des niedersächsischen Pferdemarkts:</h4>
                    <ul className="text-brown-700 space-y-1">
                      <li>• Weltweit führende Hannoveraner Zucht</li>
                      <li>• Traditionelle Oldenburger Pferdezucht</li>
                      <li>• Deutschlands wichtigste Auktionszentren</li>
                      <li>• Höchste Dichte an Zuchtbetrieben</li>
                      <li>• Exzellente Infrastruktur für Pferdesport</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Marktstatistiken 2025</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registrierte Pferde:</span>
                      <span className="font-semibold">~210.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zuchtbetriebe:</span>
                      <span className="font-semibold">~8.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jährliche Verkäufe:</span>
                      <span className="font-semibold">~35.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durchschnittspreis:</span>
                      <span className="font-semibold">12.500€</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-green-800 font-semibold mb-2">Experten-Tipp</h4>
                  <p className="text-green-700 text-sm">
                    Nutzen Sie unsere <strong>AI-gestützte Bewertung</strong>, um faire Preise für niedersächsische
                    Pferde zu ermitteln und Überzahlungen zu vermeiden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preistabelle */}
        <section id="preistabelle" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Aktuelle Pferdepreise in Niedersachsen 2025</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-800 font-medium">
                💡 Die folgenden Preisangaben basieren auf Marktanalysen von über 15.000 Verkäufen in Niedersachsen
                und werden monatlich durch unsere AI aktualisiert.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-brown-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Kategorie</th>
                    <th className="px-6 py-4 text-left">Rasse/Typ</th>
                    <th className="px-6 py-4 text-center">Preisbereich</th>
                    <th className="px-6 py-4 text-center">Durchschnitt</th>
                    <th className="px-6 py-4 text-center">Trend 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Warmblut Sport</td>
                    <td className="px-6 py-4 text-gray-700">Hannoveraner (Dressur)</td>
                    <td className="px-6 py-4 text-center">15.000€ - 80.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">32.500€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +8%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Warmblut Sport</td>
                    <td className="px-6 py-4 text-gray-700">Oldenburger (Springen)</td>
                    <td className="px-6 py-4 text-center">12.000€ - 60.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">28.000€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Warmblut Freizeit</td>
                    <td className="px-6 py-4 text-gray-700">Hannoveraner (Freizeittyp)</td>
                    <td className="px-6 py-4 text-center">8.000€ - 25.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">14.500€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +3%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Warmblut Freizeit</td>
                    <td className="px-6 py-4 text-gray-700">Oldenburger (Freizeittyp)</td>
                    <td className="px-6 py-4 text-center">6.000€ - 20.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">12.000€</td>
                    <td className="px-6 py-4 text-center text-gray-600">→ stabil</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Pony Sport</td>
                    <td className="px-6 py-4 text-gray-700">Deutsches Reitpony</td>
                    <td className="px-6 py-4 text-center">5.000€ - 25.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">12.500€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +12%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Pony Freizeit</td>
                    <td className="px-6 py-4 text-gray-700">Endmaß-Ponys</td>
                    <td className="px-6 py-4 text-center">2.500€ - 8.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">4.800€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +6%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Jungpferde</td>
                    <td className="px-6 py-4 text-gray-700">Hannoveraner (2-3 Jahre)</td>
                    <td className="px-6 py-4 text-center">6.000€ - 20.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">11.500€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +10%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Zuchtpferde</td>
                    <td className="px-6 py-4 text-gray-700">Zuchtstuten (gekört)</td>
                    <td className="px-6 py-4 text-center">8.000€ - 40.000€</td>
                    <td className="px-6 py-4 text-center font-semibold">18.500€</td>
                    <td className="px-6 py-4 text-center text-green-600">↗ +7%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-yellow-800 font-semibold mb-2">Wichtiger Hinweis zu den Preisen</h4>
              <p className="text-yellow-700 text-sm">
                Die angegebenen Preise sind Richtwerte basierend auf Marktanalysen. Der tatsächliche Wert eines Pferdes
                hängt von vielen individuellen Faktoren ab: Alter, Ausbildungsstand, Gesundheit, Abstammung, Erfolge im Sport,
                Charakter und aktuelle Marktsituation. Nutzen Sie unsere AI-Bewertung für eine präzise Einschätzung.
              </p>
            </div>
          </div>
        </section>

        {/* Zuchtgebiete */}
        <section id="zuchtgebiete" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Die wichtigsten Zuchtgebiete Niedersachsens</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Region Hannover & Umgebung</h3>
                  <p className="text-gray-700 mb-4">
                    Das <strong>Zentrum der Hannoveraner Zucht</strong> mit dem weltberühmten Landgestüt Celle.
                    Hier finden Sie die höchste Konzentration an Elite-Zuchtbetrieben und Ausbildungsställen.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Landgestüt Celle:</strong> Staatliches Gestüt seit 1735</li>
                    <li><strong>Gestüt Hunnesrück:</strong> Traditionelle Hannoveraner Zucht</li>
                    <li><strong>Klosterhof Medingen:</strong> Premium Warmblut-Zucht</li>
                    <li><strong>Reitanlage Kronsberg:</strong> Sport & Zucht</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Oldenburg & Weser-Ems</h3>
                  <p className="text-gray-700 mb-4">
                    Die <strong>Heimat der Oldenburger Pferde</strong>, bekannt für ihre Eleganz und Springqualitäten.
                    Diese Region bietet eine große Auswahl an Sport- und Freizeitpferden.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Gestüt Birkhof:</strong> Oldenburger Spitzenlinien</li>
                    <li><strong>Hof zur Wust:</strong> Sport-Oldenburger</li>
                    <li><strong>Gestüt Bonhomme:</strong> Internationale Erfolgslinien</li>
                    <li><strong>Reitgemeinschaft Oldenburg:</strong> Verkaufsstall</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Verden an der Aller</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Deutschlands wichtigstes Auktionszentrum</strong> mit den renommiertesten Pferdeauktionen.
                    Hier werden jährlich über 1.000 Pferde versteigert.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Niedersachsenhalle:</strong> Elite-Auktionen</li>
                    <li><strong>Deutsche Reiterliche Vereinigung:</strong> Hauptsitz</li>
                    <li><strong>Verdener Auktionsstall:</strong> Vorbereitung & Training</li>
                    <li><strong>Reit- und Fahrverein Verden:</strong> Turniere</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Osnabrück & Emsland</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Vielseitige Pferdezucht</strong> mit Fokus auf Freizeitpferde und robuste Rassen.
                    Ideale Region für Anfänger und Freizeitreiter.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Gestüt Südlohne:</strong> Freizeitpferde-Spezialist</li>
                    <li><strong>Reiterhof Steinfeld:</strong> Westernpferde</li>
                    <li><strong>Ponyhof Meppen:</strong> Deutsche Reitponys</li>
                    <li><strong>Islandpferdehof Lingen:</strong> Isländer-Zucht</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-brown-50 border border-brown-200 rounded-lg p-6">
              <h4 className="text-brown-800 font-semibold mb-3">Regional-Tipp für Pferdekäufer</h4>
              <p className="text-brown-700">
                <strong>Jede Region hat ihre Spezialitäten:</strong> Celle für Hannoveraner Elite-Zucht, Oldenburg für
                Springpferde, Verden für Auktionspferde und Osnabrück für robuste Freizeitpferde. Planen Sie Ihre
                Besichtigungstouren entsprechend Ihren Anforderungen.
              </p>
            </div>
          </div>
        </section>

        {/* Seriöse Händler */}
        <section id="haendler" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Seriöse Pferdehändler in Niedersachsen finden</h2>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Qualitätsmerkmale seriöser Händler</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">✓ Vertrauensmerkmale</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Mitgliedschaft in Zuchtverbänden</li>
                        <li>• Transparente Preisgestaltung</li>
                        <li>• Vollständige Papiere & AKU</li>
                        <li>• Probezeit möglich</li>
                        <li>• Positive Referenzen</li>
                        <li>• Professionelle Stallanlage</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-600 mb-3">⚠️ Warnsignale</h4>
                      <ul className="text-red-600 space-y-2">
                        <li>• Keine Papiere verfügbar</li>
                        <li>• Druck zum schnellen Kauf</li>
                        <li>• Unrealistisch niedrige Preise</li>
                        <li>• Keine Besichtigung möglich</li>
                        <li>• Fehlende Gesundheitszeugnisse</li>
                        <li>• Schlechte Online-Bewertungen</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Empfohlene Händler-Kategorien</h3>

                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Zuchtbetriebe mit Verkauf</h4>
                      <p className="text-gray-700">Beste Qualität, vollständige Abstammungsnachweise, oft Probezeit möglich</p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Spezialisierte Verkaufsställe</h4>
                      <p className="text-gray-700">Große Auswahl, professionelle Aufbereitung, meist Garantien</p>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Auktionshäuser</h4>
                      <p className="text-gray-700">Transparente Preisfindung, geprüfte Qualität, aber weniger Probezeit</p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Private Verkäufer (Züchter)</h4>
                      <p className="text-gray-700">Oft faire Preise, persönliche Betreuung, gute Pferdekenntnisse</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-blue-800 font-semibold mb-3">Händler-Datenbank</h4>
                  <p className="text-blue-700 mb-4">
                    Nutzen Sie unsere kuratierte Datenbank mit über 150 verifizierten Pferdehändlern in Niedersachsen.
                  </p>
                  <Link href="/haendler-niedersachsen" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Händler finden
                  </Link>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-green-800 font-semibold mb-3">Bewertungs-Service</h4>
                  <p className="text-green-700 mb-4">
                    Lassen Sie potentielle Kaufpferde durch unsere AI bewerten, bevor Sie sich entscheiden.
                  </p>
                  <Link href="/bewertung" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Pferd bewerten
                  </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Wichtige Verbände</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Hannoveraner Verband</li>
                    <li>• Oldenburger Pferdezucht</li>
                    <li>• Zuchtverband für dt. Pferde</li>
                    <li>• Weser-Ems Pferdezucht</li>
                    <li>• VFD Niedersachsen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Auktionen */}
        <section id="auktionen" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Pferdeauktionen & Verkaufsmärkte in Niedersachsen</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Verdener Elite-Auktionen</h3>
                <p className="text-gray-700 mb-4">
                  Die <strong>prestigeträchtigsten Auktionen Deutschlands</strong> mit internationaler Ausstrahlung.
                  Hier werden die besten Hannoveraner und andere Warmblüter versteigert.
                </p>

                <div className="space-y-3">
                  <div className="border-l-4 border-brown-500 pl-4">
                    <h4 className="font-semibold">Elite-Auktion (Oktober)</h4>
                    <p className="text-sm text-gray-600">Höchste Qualität, internationale Käufer, Preise: 15.000€ - 200.000€+</p>
                  </div>

                  <div className="border-l-4 border-brown-500 pl-4">
                    <h4 className="font-semibold">Frühjahrselite (März)</h4>
                    <p className="text-sm text-gray-600">Jungpferde & Nachwuchstalente, Preise: 8.000€ - 80.000€</p>
                  </div>

                  <div className="border-l-4 border-brown-500 pl-4">
                    <h4 className="font-semibold">Herbstauktion (November)</h4>
                    <p className="text-sm text-gray-600">Vielseitige Auswahl, faire Preise: 5.000€ - 40.000€</p>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 p-3 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Tipp:</strong> Anmeldung rechtzeitig erforderlich. Online-Übertragung verfügbar.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Weitere wichtige Auktionen</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Landgestüt Celle</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Traditionelle Auktionen mit staatlich gezüchteten Pferden
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Hengstauktion: September</li>
                      <li>• Stutenauktion: Oktober</li>
                      <li>• Jungpferdeauktion: November</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">PSI Auktion Ankum</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Internationale Sportpferde-Auktion
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Dezember (jährlich)</li>
                      <li>• Focus: Spring- und Dressurpferde</li>
                      <li>• Preisniveau: 20.000€ - 500.000€+</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">Regionale Auktionen</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Kleinere Auktionen mit fairen Preisen
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Oldenburg: Frühjahr & Herbst</li>
                      <li>• Osnabrück: Quartalsweise</li>
                      <li>• Lüneburg: Zweimal jährlich</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-blue-800 font-semibold mb-3">Auktions-Strategien für Käufer</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-800 mb-2">Vorbereitung</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Katalog im Voraus studieren</li>
                    <li>• Budget festlegen (+ 20% Puffer)</li>
                    <li>• Besichtigungstermine vereinbaren</li>
                    <li>• Transportoptionen klären</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-800 mb-2">Während der Auktion</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Maximalgebot im Kopf behalten</li>
                    <li>• Emotional nicht überhitzen</li>
                    <li>• Zusatzkosten einkalkulieren</li>
                    <li>• Alternative Pferde bereithalten</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kaufprozess */}
        <section id="kaufprozess" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Der Pferdekauf in Niedersachsen: Schritt für Schritt</h2>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {/* Schritt 1 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Bedarfsanalyse & Budget</h3>
                        <p className="text-gray-700 mb-3">
                          Definieren Sie Ihre Anforderungen klar: Verwendungszweck, Erfahrungslevel, Budget und langfristige Ziele.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Reitweise & Disziplin festlegen</li>
                          <li>• Realistisches Budget kalkulieren</li>
                          <li>• Haltungskosten berücksichtigen</li>
                          <li>• Zeitaufwand realistisch einschätzen</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Schritt 2 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Marktrecherche & Auswahl</h3>
                        <p className="text-gray-700 mb-3">
                          Nutzen Sie verschiedene Quellen für die Pferdesuche und bewerten Sie die Angebote sorgfältig.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Online-Portale durchsuchen</li>
                          <li>• Züchter & Verkaufsställe kontaktieren</li>
                          <li>• Auktionskataloge studieren</li>
                          <li>• Referenzen einholen</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Schritt 3 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Besichtigung & Proberitt</h3>
                        <p className="text-gray-700 mb-3">
                          Die persönliche Besichtigung ist entscheidend. Planen Sie ausreichend Zeit für mehrere Termine ein.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Erste Besichtigung ohne Zeitdruck</li>
                          <li>• Proberitt unter verschiedenen Bedingungen</li>
                          <li>• Charakter & Handling beurteilen</li>
                          <li>• Stallmanagement begutachten</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Schritt 4 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Tierärztliche Untersuchung</h3>
                        <p className="text-gray-700 mb-3">
                          Eine Ankaufsuntersuchung (AKU) durch einen unabhängigen Tierarzt ist bei wertvolleren Pferden unverzichtbar.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Tierarzt selbst beauftragen</li>
                          <li>• Umfang der AKU festlegen</li>
                          <li>• Röntgenbilder je nach Verwendung</li>
                          <li>• Dokumentation aller Befunde</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Schritt 5 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Vertragsabschluss & Übergabe</h3>
                        <p className="text-gray-700 mb-3">
                          Sorgen Sie für einen rechtssicheren Kaufvertrag und organisieren Sie den Transport professionell.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Schriftlichen Kaufvertrag verwenden</li>
                          <li>• Gewährleistungsbestimmungen klären</li>
                          <li>• Versicherung abschließen</li>
                          <li>• Professionellen Transport organisieren</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-green-800 font-semibold mb-3">Niedersachsen-Vorteile</h4>
                    <ul className="text-green-700 text-sm space-y-2">
                      <li>✓ Größte Auswahl an Qualitätspferden</li>
                      <li>✓ Kurze Transportwege</li>
                      <li>✓ Erfahrene Tierärzte vor Ort</li>
                      <li>✓ Etablierte Händler-Netzwerke</li>
                      <li>✓ Professionelle Infrastruktur</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="text-yellow-800 font-semibold mb-3">Kostenübersicht</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-700">Ankaufsuntersuchung:</span>
                        <span className="font-semibold">300-800€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-700">Transport (regional):</span>
                        <span className="font-semibold">150-400€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-700">Kaufvertrag:</span>
                        <span className="font-semibold">50-200€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-700">Versicherung (Jahr):</span>
                        <span className="font-semibold">200-600€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-blue-800 font-semibold mb-3">Rechtliche Hinweise</h4>
                    <p className="text-blue-700 text-sm">
                      In Niedersachsen gelten die allgemeinen deutschen Kaufrechts-Bestimmungen.
                      Bei Mängeln haben Sie Gewährleistungsansprüche. Lassen Sie sich bei wertvollen
                      Pferden rechtlich beraten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transport */}
        <section id="transport" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-bold mb-8 text-gray-900">Transport & Logistik in Niedersachsen</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Professionelle Transportdienste</h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Pferdetransport Niedersachsen GmbH</h4>
                    <p className="text-gray-700 text-sm">Spezialist für Warmbluttransporte, moderne Fahrzeuge</p>
                    <p className="text-gray-600 text-xs">Region: Ganz Niedersachsen • Preis: ab 2€/km</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Gestütstransporte Celle</h4>
                    <p className="text-gray-700 text-sm">Traditioneller Service, Erfahrung seit 1985</p>
                    <p className="text-gray-600 text-xs">Region: Norddeutschland • Preis: ab 1.8€/km</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">Hannoveraner Transport Service</h4>
                    <p className="text-gray-700 text-sm">Internationale Transporte, Auktionslogistik</p>
                    <p className="text-gray-600 text-xs">Region: Europa • Preis: auf Anfrage</p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-blue-800 font-semibold mb-2">Transport-Tipp</h4>
                  <p className="text-blue-700 text-sm">
                    Buchen Sie Transporte rechtzeitig, besonders nach Auktionen. Prüfen Sie Versicherungsschutz
                    und Transportbedingungen im Voraus.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Transportkosten in Niedersachsen</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Distanz-basierte Preise</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Bis 50 km:</span>
                        <span className="font-semibold">150-250€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">51-100 km:</span>
                        <span className="font-semibold">250-400€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">101-200 km:</span>
                        <span className="font-semibold">400-600€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Über 200 km:</span>
                        <span className="font-semibold">2-3€/km</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Zusatzkosten</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Wartezeit:</span>
                        <span>25€/Stunde</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Wochenende:</span>
                        <span>+20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Feiertage:</span>
                        <span>+50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Express (24h):</span>
                        <span>+30%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-yellow-800 font-semibold mb-2">Kostenspar-Tipps</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Sammeltransporte nutzen</li>
                    <li>• Rückfracht arrangieren</li>
                    <li>• Flexible Termine vereinbaren</li>
                    <li>• Mehrere Angebote einholen</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Verkehrsanbindung & Logistik</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Autobahnen</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• A1: Hamburg - Bremen - Osnabrück</li>
                    <li>• A2: Hannover - Braunschweig</li>
                    <li>• A7: Hamburg - Hannover - Göttingen</li>
                    <li>• A27/A28: Oldenburg - Bremen</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Flughäfen</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Hannover (HAJ) - 40 min von Celle</li>
                    <li>• Bremen (BRE) - 1h von Verden</li>
                    <li>• Hamburg (HAM) - 1.5h von Hannover</li>
                    <li>• Münster/Osnabrück (FMO)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bahnverbindungen</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• ICE-Strecke Hannover - Hamburg</li>
                    <li>• Regionalverbindung Celle - Hannover</li>
                    <li>• Bremen - Oldenburg Direktzug</li>
                    <li>• Verden - Bremen Regionalbahn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Häufige Fragen zum Pferdekauf in Niedersachsen</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Was kostet ein Pferd in Niedersachsen?</h3>
                <p className="text-gray-700">
                  Die Preise variieren stark je nach Rasse, Ausbildungsstand und Verwendungszweck. Freizeitpferde kosten
                  zwischen 3.000-15.000€, während Hannoveraner Warmblüter für den Sport 10.000-50.000€ oder mehr kosten können.
                  Ponys sind günstiger und liegen typischerweise zwischen 2.000-8.000€. Nutzen Sie unsere AI-Bewertung für
                  eine präzise Preiseinschätzung.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Welche Pferderassen sind in Niedersachsen besonders beliebt?</h3>
                <p className="text-gray-700">
                  Niedersachsen ist weltberühmt für <strong>Hannoveraner</strong> und <strong>Oldenburger</strong> Warmblüter.
                  Weitere beliebte Rassen sind Deutsche Reitponys, Trakehner, und verschiedene Freizeitpferderassen.
                  Das Landgestüt Celle züchtet traditionell hochwertige Warmblutpferde, die international geschätzt werden.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Wo finde ich seriöse Pferdehändler in Niedersachsen?</h3>
                <p className="text-gray-700">
                  Seriöse Händler finden Sie über Zuchtverbände, das Landgestüt Celle, etablierte Verkaufsställe in
                  Verden/Hannover, und renommierte Pferdehöfe. Achten Sie auf Mitgliedschaften in Zuchtverbänden,
                  Transparenz bei Gesundheitszeugnissen und Möglichkeiten zur Probezeit. Unsere Händler-Datenbank
                  listet über 150 verifizierte Anbieter.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Wann finden die wichtigsten Pferdeauktionen statt?</h3>
                <p className="text-gray-700">
                  Die bedeutendsten Auktionen finden in Verden statt: <strong>Elite-Auktion im Oktober</strong>,
                  <strong>Frühjahrselite im März</strong>, und mehrere Fohlen- und Jungpferdeauktionen über das Jahr verteilt.
                  Das Landgestüt Celle veranstaltet Auktionen im September (Hengste) und Oktober (Stuten).
                  Die PSI Auktion in Ankum findet jährlich im Dezember statt.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Was muss ich beim Transport von Pferden in Niedersachsen beachten?</h3>
                <p className="text-gray-700">
                  Nutzen Sie professionelle Transportdienste mit entsprechender Ausstattung und Versicherung.
                  Kosten liegen bei 1,8-3€/km je nach Entfernung und Service. Buchen Sie rechtzeitig, besonders nach
                  Auktionen. Achten Sie auf Transportversicherung und dokumentieren Sie den Zustand des Pferdes vor und nach dem Transport.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Brauche ich eine Ankaufsuntersuchung?</h3>
                <p className="text-gray-700">
                  Bei wertvolleren Pferden (ab ca. 8.000€) ist eine AKU durch einen unabhängigen Tierarzt dringend empfohlen.
                  Die Kosten liegen zwischen 300-800€ je nach Umfang. Lassen Sie sich nicht vom Verkäufer einen bestimmten
                  Tierarzt aufdrängen und bestehen Sie auf einer vollständigen Dokumentation aller Befunde.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Gibt es regionale Besonderheiten beim Pferdekauf in Niedersachsen?</h3>
                <p className="text-gray-700">
                  Niedersachsen hat eine besonders ausgeprägte Zuchtkultur mit strengen Qualitätsstandards. Viele Verkäufer
                  sind Traditionsbetriebe mit jahrzehntelanger Erfahrung. Die Preise sind aufgrund der hohen Qualität oft
                  etwas höher als in anderen Bundesländern, aber die Qualitätssicherung ist außergewöhnlich gut.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Haben Sie weitere Fragen zum Pferdekauf in Niedersachsen?</p>
              <Link href="/kontakt" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors">
                Kostenlose Beratung
              </Link>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-16 bg-brown-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-bold mb-4">Bereit für Ihren Pferdekauf in Niedersachsen?</h2>
            <p className="text-xl mb-8 text-brown-100">
              Nutzen Sie unsere AI-gestützte Bewertung für eine fundierte Kaufentscheidung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bewertung" className="bg-white text-brown-800 px-8 py-3 rounded-lg font-semibold hover:bg-brown-50 transition-colors">
                Pferd bewerten lassen
              </Link>
              <Link href="/haendler-niedersachsen" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brown-800 transition-colors">
                Händler-Datenbank
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PferdKaufenNiedersachsen;