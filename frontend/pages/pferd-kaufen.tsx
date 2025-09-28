// pages/pferd-kaufen.tsx
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, AlertTriangle, Calculator, Shield, TrendingUp, Users } from "lucide-react";
import { PRICING_FORMATTED, PRICING_TEXTS } from "../lib/pricing";
import FAQ from "@/components/FAQ";
import { FAQItem } from "@/types/faq.types";

export default function PferdKaufen() {
  const kauftipps = [
    {
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      title: "Marktpreis vor Besichtigung prüfen",
      description: "Lass den Preis objektiv bewerten, bevor du zum Verkäufer fährst. So weißt du sofort, ob das Angebot fair ist."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Verhandlungsspielraum erkennen",
      description: "Unsere Analyse zeigt dir eine realistische Preisspanne. So kannst du gezielt verhandeln."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Überteuerte Angebote vermeiden",
      description: "Erkenne sofort, wenn ein Pferd deutlich über dem Marktwert angeboten wird."
    }
  ];

  const warnzeichen = [
    "Preis deutlich unter Marktwert (mögliche versteckte Mängel)",
    "Verkäufer will schnell verkaufen ohne Proberitt",
    "Keine aktuellen Röntgenbilder oder AKU vorhanden",
    "Pferd wird als 'Notverkauf' beworben",
    "Unrealistische Erfolgsangaben für das Alter"
  ];

  const kaufFAQs: FAQItem[] = [
    {
      question: "Kann ich die Bewertung auch für Pferde nutzen, die ich kaufen möchte?",
      answer: "Ja, unsere KI-Bewertung ist perfekt dafür geeignet! Gib einfach die Daten des Pferdes ein, das du kaufen möchtest, und du erhältst eine objektive Markteinschätzung. So erkennst du sofort, ob der Verkaufspreis angemessen ist oder ob Verhandlungsspielraum besteht."
    },
    {
      question: "Wie kann mir die Bewertung beim Verhandeln helfen?",
      answer: "Die Bewertung gibt dir eine fundierte Verhandlungsgrundlage. Du siehst den geschätzten Marktwert und eine realistische Preisspanne. Mit diesen objektiven Daten kannst du selbstbewusst verhandeln und begründen, warum ein Preis zu hoch oder angemessen ist."
    },
    {
      question: "Wann sollte ich eine Bewertung machen lassen?",
      answer: "Am besten **vor** der ersten Besichtigung. So gehst du bereits informiert zum Verkäufer und verschwendest keine Zeit mit überteuerten Angeboten. Du kannst auch mehrere interessante Pferde vorab bewerten lassen, um die besten Kandidaten zu identifizieren."
    },
    {
      question: "Was ist, wenn der Verkäufer deutlich mehr verlangt?",
      answer: "Das kommt häufiger vor, als du denkst. Mit unserer Bewertung hast du objektive Argumente in der Hand. Entweder der Verkäufer geht im Preis runter, oder du erkennst rechtzeitig, dass es kein gutes Geschäft wäre. Beides spart dir Geld und Zeit."
    }
  ];

  const kaufschritte = [
    {
      schritt: "1",
      title: "Preis vorab prüfen",
      description: "Gib die Daten des Pferdes in unsere KI-Bewertung ein und erhalte eine objektive Preisbewertung."
    },
    {
      schritt: "2",
      title: "Besichtigung planen",
      description: "Mit der Marktkenntnis gehst du selbstbewusst zur Besichtigung und kannst gezielte Fragen stellen."
    },
    {
      schritt: "3",
      title: "Verhandeln mit Fakten",
      description: "Nutze die Bewertung als Verhandlungsgrundlage und kaufe zum fairen Preis."
    }
  ];

  return (
    <Layout>
      <>
        <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd kaufen Bayern: Preis prüfen & günstig verhandeln | PferdeWert</title>
        <meta
         name="description"
         content={`Pferd kaufen deutschlandweit - KI-Preischeck für ${PRICING_FORMATTED.current} - Faire Preise erkennen und gezielt verhandeln - Keine Überzahlung beim Pferdekauf`}
        />
        <meta
         name="keywords"
         content="pferd kaufen bayern, pferd kaufen nrw, pferd kaufen deutschland, pferdekauf tipps, pferde preise, verhandlungshilfe pferdekauf, pferdemarkt bayern"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Bayern: Preis prüfen & günstig verhandeln | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Bayern & NRW: KI-Preischeck schützt vor Überzahlung. Faire Preise erkennen ✓ Verhandlungshilfe ✓ 40.500+ erfolgreiche Käufer deutschlandweit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-hero.webp" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Bayern: Preis prüfen & günstig verhandeln | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen Bayern & NRW: KI-Preischeck schützt vor Überzahlung. Faire Preise erkennen ✓ Verhandlungshilfe ✓ 40.500+ erfolgreiche Käufer deutschlandweit." />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-hero.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />
         
          {/* Enhanced Structured Data für SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Pferd kaufen: Faire Preise erkennen",
                  "description": "Erkenne faire Preise mit KI-Bewertung und vermeide Überzahlung beim Pferdekauf",
                  "url": "https://pferdewert.de/pferd-kaufen",
                  "breadcrumb": {
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
                      }
                    ]
                  },
                  "mainEntity": {
                    "@type": "Service",
                    "name": "Pferdebewertung für Käufer",
                    "description": "KI-gestützte Pferdebewertung für faire Kaufpreise",
                    "provider": {
                      "@type": "Organization",
                      "name": "PferdeWert",
                      "url": "https://pferdewert.de"
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "14.90",
                      "priceCurrency": "EUR",
                      "description": "Einmalige KI-Pferdebewertung"
                    }
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Kann ich die Bewertung auch für Pferde nutzen, die ich kaufen möchte?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ja, absolut! Gib einfach die Daten des Pferdes ein, das du kaufen möchtest. Du erhältst eine objektive Preisbewertung, die dir bei der Verhandlung hilft."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Wie kann mir die Bewertung beim Verhandeln helfen?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Die Bewertung zeigt dir eine realistische Preisspanne basierend auf Marktdaten. So weißt du, ob ein Angebot fair ist und hast Argumente für deine Preisvorstellung."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Wann sollte ich eine Bewertung machen lassen?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Am besten vor der ersten Besichtigung. So gehst du informiert zum Verkäufer und kannst gezielt nachfragen, falls der Preis nicht zum Marktwert passt."
                      }
                    }
                  ]
                },
                {
                  "@context": "https://schema.org",
                  "@type": "HowTo",
                  "name": "Pferd kaufen: So erkennst du faire Preise",
                  "description": "Schritt-für-Schritt Anleitung für den Pferdekauf mit fairer Preisbewertung",
                  "step": [
                    {
                      "@type": "HowToStep",
                      "name": "Preis vorab prüfen",
                      "text": "Gib die Daten des Pferdes in unsere KI-Bewertung ein und erhalte eine objektive Preisbewertung.",
                      "url": "https://pferdewert.de/pferde-preis-berechnen"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Besichtigung planen",
                      "text": "Mit der Marktkenntnis gehst du selbstbewusst zur Besichtigung und kannst gezielte Fragen stellen."
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Verhandeln mit Fakten",
                      "text": "Nutze die Bewertung als Verhandlungsgrundlage und kaufe zum fairen Preis."
                    }
                  ]
                }
              ])
            }}
          />
        </Head>

        {/* Hero-Bereich für Käufer */}
        <section className="bg-[#fdf9f4] py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-h1 font-bold text-gray-900 mb-6">
                Pferd kaufen in Deutschland: Preis prüfen & richtig verhandeln
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Vermeide Überzahlung mit objektiver KI-Bewertung. 
                Verhandle selbstbewusst mit professioneller Marktkenntnis.
              </p>
              
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">🎯 Perfekt für Pferdekäufer:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Objektive Preisbewertung vor Besichtigung</li>
                  <li>✓ Verhandlungsgrundlage mit Marktdaten</li>
                  <li>✓ Überteuerte Angebote sofort erkennen</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pferde-preis-berechnen"
                  className="btn-primary"
                >
                  Kaufpreis vor Verhandlung prüfen
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="btn-secondary"
                >
                  Beispiel-Bewertung ansehen
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 md:order-2">
              <Image
                src="/images/blossi-5.webp"
                width={600}
                height={400}
                alt="Unser Pferd Blossom bei Sonnenschein - Pferd kaufen mit professioneller Preisbewertung"
                className="rounded-xl shadow-lg"
                />
              <div className="mt-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <p className="font-semibold">40.500+ Käufer</p>
                <p className="text-sm">suchen monatlich nach fairen Preisen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Warum Preisbewertung beim Kauf wichtig ist */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              Warum Preisbewertung beim Pferdekauf?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {kauftipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {tipp.icon}
                  </div>
                  <h3 className="text-h3 font-semibold text-gray-900 mb-4">
                    {tipp.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {tipp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pferd kaufen Preis & Pferdekauf Tipps Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              Pferd kaufen Preis: Was kostet ein Pferd wirklich?
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Pferd kaufen Preis */}
              <div className="bg-blue-50 rounded-xl p-8">
                <h3 className="text-h2 font-semibold text-gray-900 mb-6">
                  💰 Pferde Preise in Deutschland 2024
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Freizeitpferd</span>
                      <span className="text-blue-600 font-bold">2.000 - 8.000€</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Turnierpferd (A/L)</span>
                      <span className="text-blue-600 font-bold">8.000 - 25.000€</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sportpferd (M/S)</span>
                      <span className="text-blue-600 font-bold">25.000 - 100.000€+</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Jungpferd (roh)</span>
                      <span className="text-blue-600 font-bold">3.000 - 15.000€</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  *Preise variieren je nach Region, Rasse und Ausbildungsstand
                </p>
              </div>

              {/* Pferdekauf Tipps */}
              <div className="bg-green-50 rounded-xl p-8">
                <h3 className="text-h2 font-semibold text-gray-900 mb-6">
                  🎯 Die 7 wichtigsten Pferdekauf Tipps
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span className="text-gray-700"><strong>Preis vorab prüfen:</strong> KI-Bewertung vor Besichtigung</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span className="text-gray-700"><strong>AKU mitbringen:</strong> Tierarztcheck ist Pflicht</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span className="text-gray-700"><strong>Proberitt vereinbaren:</strong> Charakter testen</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span className="text-gray-700"><strong>Papiere prüfen:</strong> Abstammung & Impfpass</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</span>
                    <span className="text-gray-700"><strong>Regional vergleichen:</strong> Bayern vs. NRW Preise</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">6</span>
                    <span className="text-gray-700"><strong>Verhandlungsspielraum:</strong> 10-15% sind normal</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">7</span>
                    <span className="text-gray-700"><strong>Kaufvertrag aufsetzen:</strong> Rechtsschutz wichtig</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-4xl mx-auto">
                <h4 className="font-semibold text-gray-900 mb-3">💡 Insider-Tipp für Pferdekäufer</h4>
                <p className="text-gray-700">
                  Die meisten Überzahlungen passieren bei Pferden zwischen 8.000-15.000€.
                  In diesem Preissegment schwanken die Bewertungen am stärksten.
                  Unsere KI-Analyse gibt dir hier die größte Sicherheit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* So funktioniert's für Käufer */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              So kaufst du zum fairen Preis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {kaufschritte.map((schritt, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                    <span className="text-white font-bold text-lg">{schritt.schritt}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {schritt.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {schritt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                Jetzt Kaufpreis bewerten
              </Link>
            </div>
          </div>
        </section>

        {/* Warnzeichen beim Pferdekauf */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Warnzeichen beim Pferdekauf
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                Diese Anzeichen sollten dich hellhörig machen:
              </p>
              
              <ul className="space-y-3">
                {warnzeichen.map((warnung, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{warnung}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  💡 Tipp: Mit unserer Preisbewertung erkennst du sofort, ob ein Angebot realistisch ist!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Erfolgsgeschichten von Käufern */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              Erfolgreiche Käufer berichten
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Käufer Testimonial 1 */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-900">Käufer-Erfolg</span>
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  &quot;Das Pferd wurde für 18.000€ angeboten. Die PferdeWert-Analyse ergab 14.000-16.000€. 
                  Ich konnte auf 15.500€ verhandeln und habe 2.500€ gespart!&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Lisa K., Dressurreiterin
                </cite>
              </div>

              {/* Käufer Testimonial 2 */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-semibold text-gray-900">Smartkauf</span>
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  &quot;Ich wollte einen jungen Wallach kaufen. Die Bewertung zeigte, dass der Preis fair war. 
                  Das gab mir Sicherheit für diese wichtige Entscheidung.&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Thomas R., Freizeitreiter
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ für Käufer */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <FAQ
              faqs={kaufFAQs}
              sectionTitle="Häufige Fragen von Pferdekäufern"
            />
          </div>
        </section>

{/* Regional & Rassen SEO Section */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-h2 font-bold text-gray-900 mb-6">
              Pferd kaufen in deiner Region
            </h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              Ob Warmblut in Bayern, Friese in NRW oder Tinker in Niedersachsen – 
              unsere KI-Bewertung kennt regionale Preisunterschiede und Rassenbesonderheiten. 
              So kaufst du deutschlandweit zum fairen Preis.
            </p>
            
            {/* Bundesländer Grid mit Internal Links */}
            <div className="mb-8">
              <h3 className="text-h3 font-semibold text-gray-800 mb-4">Pferdekauf in allen Bundesländern - Regionale Preise</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {[
                  { name: "NRW", slug: "nordrhein-westfalen" },
                  { name: "Bayern", slug: "bayern" },
                  { name: "Niedersachsen", slug: "niedersachsen" },
                  { name: "Baden-Württemberg", slug: "baden-wuerttemberg" },
                  { name: "Hessen", slug: "hessen" },
                  { name: "Sachsen", slug: "sachsen" },
                  { name: "Thüringen", slug: "thueringen" },
                  { name: "Brandenburg", slug: "brandenburg" },
                  { name: "Schleswig-Holstein", slug: "schleswig-holstein" },
                  { name: "Sachsen-Anhalt", slug: "sachsen-anhalt" },
                  { name: "Saarland", slug: "saarland" },
                  { name: "Mecklenburg-Vorpommern", slug: "mecklenburg-vorpommern" },
                  { name: "Berlin", slug: "berlin" },
                  { name: "Hamburg", slug: "hamburg" },
                  { name: "Bremen", slug: "bremen" }
                ].map(bundesland => (
                  <Link
                    key={bundesland.name}
                    href={`/pferd-kaufen/regionale-pferdepreise/${bundesland.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors block text-center"
                  >
                    <span className="font-medium">Pferd kaufen {bundesland.name}</span>
                    <div className="text-xs text-blue-600 mt-1">→ Regionale Preise</div>
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Klicke auf dein Bundesland für detaillierte Preisinformationen und regionale Marktanalysen
              </p>
            </div>

            {/* Rassen Grid */}
            <div>
              <h3 className="text-h3 font-semibold text-gray-800 mb-4">Beliebte Pferderassen richtig bewerten</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { rasse: "Warmblut", emoji: "🐎" },
                  { rasse: "Friese", emoji: "🖤" },
                  { rasse: "Tinker", emoji: "🎨" },
                  { rasse: "Kaltblut", emoji: "💪" },
                  { rasse: "Araber", emoji: "🏆" },
                  { rasse: "Pony", emoji: "🦄" },
                  { rasse: "Isländer", emoji: "🌬️" },
                  { rasse: "Quarter Horse", emoji: "🤠" }
                ].map(({rasse, emoji}) => (
                  <div key={rasse} className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:bg-green-50 transition-colors">
                    <span>{emoji}</span> <span className="font-medium">{rasse} kaufen</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                💡 Egal wo und welche Rasse – unsere KI-Bewertung berücksichtigt lokale Marktgegebenheiten und Rassenbesonderheiten
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 <strong>Verkäufer-Tipp:</strong> Du möchtest dein <Link href="/pferd-verkaufen" className="text-green-700 underline hover:text-green-900">Pferd verkaufen in Bayern oder NRW</Link>? Nutze unsere Bewertung für den optimalen Verkaufspreis.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action für Käufer */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-bold text-white mb-6">
              Bereit für den smarteren Pferdekauf?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Lass den Preis bewerten, bevor du verhandelst. 
              {PRICING_TEXTS.savings}
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                <div>
                  <div className="text-2xl font-bold">2 Min</div>
                  <div className="text-sm text-blue-100">Analysedauer</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{PRICING_FORMATTED.current}</div>
                  <div className="text-sm text-blue-100">Einmalpreis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Sofort</div>
                  <div className="text-sm text-blue-100">PDF-Ergebnis</div>
                </div>
              </div>
            </div>

            <Link
              href="/pferde-preis-berechnen"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Jetzt Kaufpreis bewerten
            </Link>
            
            <p className="text-sm text-blue-200 mt-4">
              Sichere Bezahlung • Sofortiges Ergebnis • Keine Abos
            </p>
          </div>
        </section>
      </>
    </Layout>
  );
}
