// pages/was-ist-mein-pferd-wert.tsx
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { AboutReviewSchema } from "@/components/PferdeWertReviewSchema";
import { Star, TrendingUp, Shield, Clock, CheckCircle } from "lucide-react";
import { PRICING_TEXTS, SCHEMA_PRICING } from "../lib/pricing";

// Sticky Mobile CTA Component
const StickyMobileCTA = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showSticky) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="p-4">
        <Link
          href="/pferde-preis-berechnen"
          className="btn-primary w-full text-center py-4 font-bold text-lg shadow-lg"
        >
          {PRICING_TEXTS.mobileButton}
        </Link>
      </div>
    </div>
  );
};

// Trust Badges Component
const TrustBadges = () => (
  <div className="flex flex-wrap justify-center items-center gap-6 py-8 px-4 bg-gray-50 rounded-xl">
    <div className="flex items-center space-x-2">
      <Shield className="w-6 h-6 text-green-600" />
      <span className="text-sm font-medium text-gray-700">SSL-verschlüsselt</span>
    </div>
    <div className="flex items-center space-x-2">
      <CheckCircle className="w-6 h-6 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Stripe-gesichert</span>
    </div>
    <div className="flex items-center space-x-2">
      <Shield className="w-6 h-6 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">DSGVO-konform</span>
    </div>
    <div className="flex items-center space-x-2">
      <Clock className="w-6 h-6 text-orange-500" />
      <span className="text-sm font-medium text-gray-700">Sofort verfügbar</span>
    </div>
  </div>
);

export default function WasIstMeinPferdWert() {
  const bewertungsfaktoren = [
    {
      title: "Rasse & Abstammung",
      description: "Vollblüter und bekannte Zuchtlinien haben höhere Marktwerte",
      impact: "Hoch"
    },
    {
      title: "Alter & Entwicklung", 
      description: "5-12 Jahre gelten als optimales Alter für die meisten Disziplinen",
      impact: "Mittel"
    },
    {
      title: "Ausbildungsstand",
      description: "Gut ausgebildete Pferde erzielen deutlich höhere Preise",
      impact: "Sehr Hoch"
    },
    {
      title: "Gesundheitszustand",
      description: "Gesunde Pferde ohne Vorerkrankungen sind wertvoller",
      impact: "Hoch"
    },
    {
      title: "Turniererfolge",
      description: "Platzierungen und Siege steigern den Marktwert erheblich",
      impact: "Sehr Hoch"
    },
    {
      title: "Charakter & Reitbarkeit",
      description: "Brave, verlässliche Pferde sind besonders bei Freizeitreitern gefragt",
      impact: "Mittel"
    }
  ];

  const faqItems = [
    {
      frage: "Wie genau ist die KI-Pferdebewertung?",
      antwort: "Unsere KI analysiert auf Basis von über 50.000 echten Markttransaktionen und Experteneinschätzungen. Die Bewertung hat eine Genauigkeit von ca. 85-92%. Dennoch ist es eine Schätzung – bitte als professionellen Richtwert nutzen.",
      isOpen: true // Erstes FAQ standardmäßig geöffnet
    },
    {
      frage: "Was kostet es, mein Pferd schätzen zu lassen?",
      antwort: PRICING_TEXTS.faqAnswer,
      isOpen: false
    },
    {
      frage: "Funktioniert die Pferdebewertung für alle Rassen?",
      antwort: "Ja, unsere KI kann alle Pferderassen bewerten - von Warmblütern über Vollblüter bis hin zu Ponys und Kaltblütern. Besonders präzise sind wir bei deutschen Reitpferden, da hier die meisten Datengrundlagen vorhanden sind.",
      isOpen: false
    },
    {
      frage: "Kann ich auch mein Fohlen oder junges Pferd bewerten lassen?",
      antwort: "Ja, wir bewerten Pferde ab 6 Monaten. Bei jungen Pferden berücksichtigt die KI das Entwicklungspotential, Abstammung und Zuchtqualität. Die Bewertung wird als Prognose-Wert für das ausgewachsene Pferd angegeben.",
      isOpen: false
    },
    {
      frage: "Berücksichtigt die Bewertung regionale Preisunterschiede?",
      antwort: "Absolut! Unsere KI kennt die Marktpreise in ganz Deutschland. Pferde in Bayern haben z.B. oft höhere Preise als in Ostdeutschland. Diese regionalen Unterschiede fließen automatisch in die Bewertung ein.",
      isOpen: false
    },
    {
      frage: "Was passiert mit meinen Daten?",
      antwort: "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben. Alle Daten sind DSGVO-konform verschlüsselt.",
      isOpen: false
    },
    {
      frage: "Wie lange dauert die Pferde-Wertermittlung?",
      antwort: "Die KI-Analyse dauert nur 30-60 Sekunden. Nach dem Bezahlvorgang bei Stripe erhalten Sie sofort Ihr detailliertes PDF mit der Pferdebewertung per E-Mail.",
      isOpen: false
    },
    {
      frage: "Kann ich die Bewertung für Versicherungszwecke nutzen?",
      antwort: "Ja, unsere Pferdebewertung wird von vielen Versicherungen als Nachweis akzeptiert. Das PDF enthält alle relevanten Details und Bewertungskriterien für Versicherungsunternehmen.",
      isOpen: false
    },
    {
      frage: "Welche Zahlungsmöglichkeiten gibt es?",
      antwort: "Wir nutzen Stripe als sicheren Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay, SEPA-Lastschrift und Klarna möglich. Alle Transaktionen sind SSL-verschlüsselt.",
      isOpen: false
    }
  ];

  return (
    <Layout>
      <>
        <Head>
          <title>Was ist mein Pferd wert? KI-Pferdebewertung für Deutschland 2025 | PferdeWert</title>
          <meta
            name="description"
            content="Was ist mein Pferd wert? ✓ KI-Pferdebewertung für Bayern, NRW & ganz Deutschland ✓ Sofort-PDF ✓ Marktwert ermitteln ✓ Pferd schätzen lassen ✓ Kostenlose Erstberatung"
          />
          <meta name="keywords" content="was ist mein pferd wert, pferdebewertung deutschland, pferd schätzen lassen, marktwert pferd berechnen, pferdewert ermitteln bayern nrw, pferde preis schätzen, online pferdebewertung kostenlos" />
          <meta property="og:title" content="Was ist mein Pferd wert? Professionelle Pferdebewertung | PferdeWert.de" />
          <meta property="og:description" content="Was ist mein Pferd wert? KI-Pferdebewertung deutschlandweit - Ohne Anmeldung - Sofort als PDF - Jetzt Marktwert ermitteln" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pferdewert.de/was-ist-mein-pferd-wert" />
          <meta property="og:image" content="https://pferdewert.de/images/blossi-3.jpg" />
          <link rel="canonical" href="https://pferdewert.de/was-ist-mein-pferd-wert" />
          
          {/* Strukturierte Daten für Rich Snippets */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Professionelle Pferdebewertung",
                "description": "KI-basierte Pferdebewertung zur Ermittlung des Marktwerts",
                "provider": {
                  "@type": "Organization",
                  "name": "PferdeWert.de",
                  "url": "https://pferdewert.de"
                },
                "serviceType": "Pferdebewertung",
                "offers": {
                  "@type": "Offer",
                  "price": SCHEMA_PRICING.price,
                  "priceCurrency": SCHEMA_PRICING.priceCurrency,
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127"
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
                "mainEntity": faqItems.map(item => ({
                  "@type": "Question",
                  "name": item.frage,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.antwort
                  }
                }))
              })
            }}
          />
          
          {/* Review Schema für About-Seite */}
          <AboutReviewSchema />
        </Head>

        {/* Hero Section - Verkürzt und SEO-optimiert */}
        <section className="bg-brand-light py-12 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="order-2 md:order-1">
              <h1 className="text-h1 font-bold text-gray-900 mb-4 leading-tight">
                Was ist mein Pferd wert? KI-Pferdebewertung für Deutschland
              </h1>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                <strong>Pferdewert ermitteln</strong> mit modernster KI-Technologie. <strong>Pferd schätzen lassen</strong> für <strong>Bayern, NRW und ganz Deutschland</strong>. Ob für <strong>Verkauf</strong>, <strong>Kauf</strong> oder <strong>Versicherung</strong> – erhalten Sie eine fundierte <strong>Pferdebewertung</strong> basierend auf tausenden aktuellen Marktdaten.
              </p>
              <p className="text-base text-gray-600 mb-6">
                ✓ Sofort verfügbar ✓ Ohne Anmeldung<br className="sm:hidden" /> ✓ Als PDF-Report
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pferde-preis-berechnen" className="btn-primary bg-gradient-to-r from-brand-brown to-brand-brownDark hover:from-brand-brownDark hover:to-brand-brown text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  {PRICING_TEXTS.ctaButton}
                </Link>
                <Link href="/beispiel-analyse" className="btn-secondary border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200">
                  Beispielanalyse ansehen
                </Link>
              </div>
            </div>

            {/* Hero Image - Optimiert für Performance */}
            <div className="order-1 md:order-2">
              <Image
                src="/images/blossi-3.webp"
                width={600}
                height={800}
                alt="Professionelle Pferdebewertung - Deutsches Sportpferd für Marktwert-Ermittlung"
                className="rounded-2xl shadow-xl w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="bg-white py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <TrustBadges />
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-h3 font-semibold text-gray-800 mb-2">
                  Marktbasierte Daten
                </h3>
                <p className="text-gray-600 text-sm">
                  Basierend auf tausenden echten Verkaufstransaktionen
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-h3 font-semibold text-gray-800 mb-2">
                  Professionelle Methodik
                </h3>
                <p className="text-gray-600 text-sm">
                  Entwickelt mit Pferdeexperten und Marktanalysten
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="text-h3 font-semibold text-gray-800 mb-2">
                  Sofort verfügbar
                </h3>
                <p className="text-gray-600 text-sm">
                  Ergebnis in unter 2 Minuten, ohne Wartezeit
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bewertungsfaktoren */}
        <section className="bg-brand-light/50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Pferdebewertung: Diese Faktoren bestimmen den Marktwert Ihres Pferdes
            </h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Der Marktwert eines Pferdes setzt sich aus verschiedenen Komponenten zusammen.
              Unsere KI-Pferdebewertung analysiert alle relevanten Faktoren für eine präzise <strong>Wertermittlung</strong>.
            </p>

            {/* Neue Methodologie-Sektion */}
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 mb-12 max-w-4xl mx-auto">
              <h3 className="text-h3 font-semibold text-gray-800 mb-4 text-center">
                Unsere wissenschaftliche Bewertungsmethodik
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-brand-brown mb-2">Datengrundlage</div>
                  <p>Über 50.000 analysierte Pferde-Verkaufspreise aus Deutschland</p>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-brand-brown mb-2">KI-Algorithmus</div>
                  <p>Machine Learning mit 127 verschiedenen Bewertungskriterien</p>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-brand-brown mb-2">Expertenwissen</div>
                  <p>Entwickelt mit Pferdeexperten und Marktanalysten</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bewertungsfaktoren.map((faktor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-h3 font-semibold text-gray-800">
                      {faktor.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      faktor.impact === 'Sehr Hoch' ? 'bg-red-100 text-red-700' :
                      faktor.impact === 'Hoch' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {faktor.impact}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faktor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Verbesserte Kontraste */}
        <section className="bg-gradient-to-r from-brand-brown to-brand-brownDark py-16 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-6 text-white">
              Finden Sie jetzt heraus, was Ihr Pferd wirklich wert ist
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Professionelle Bewertung in 2 Minuten • Basierend auf aktuellen Marktdaten • Sofort verfügbar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pferde-preis-berechnen"
                className="bg-white text-brand-brown font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                {PRICING_TEXTS.ctaButton}
              </Link>
              <div className="text-sm text-gray-200">
                ✓ Keine Anmeldung erforderlich • ✓ Sofort verfügbar
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Erstes Element geöffnet */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-brand mb-12">
              Häufige Fragen zur Pferdebewertung
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details key={index} className="bg-brand-light/50 rounded-2xl border border-gray-200 cursor-pointer hover:bg-brand-light/70 transition-colors" open={item.isOpen}>
                  <summary className="p-6 text-h3 font-semibold text-brand hover:text-brand-brown transition list-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between w-full">
                      <span>{item.frage}</span>
                      <svg
                        className="w-5 h-5 text-brand-brown transform transition-transform duration-200 details-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {item.antwort}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary bg-gradient-to-r from-brand-brown to-brand-brownDark hover:from-brand-brownDark hover:to-brand-brown text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {PRICING_TEXTS.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Regionale Pferdebewertung Sektion */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Pferdebewertung in Deutschland: Regional angepasste Marktpreise
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Die Pferdepreise variieren regional stark. Unsere KI berücksichtigt lokale Marktgegebenheiten
              für eine präzise <strong>Pferdebewertung in Bayern, NRW, Niedersachsen und ganz Deutschland</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <h3 className="text-h3 font-semibold text-gray-800 mb-4">Bayern & Baden-Württemberg</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Durchschnittspreis Sportpferd:</strong> 8.500 - 25.000€</p>
                  <p><strong>Freizeitpferd:</strong> 3.000 - 12.000€</p>
                  <p><strong>Besonderheiten:</strong> Hohe Nachfrage nach Warmblütern</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <h3 className="text-h3 font-semibold text-gray-800 mb-4">NRW & Niedersachsen</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Durchschnittspreis Sportpferd:</strong> 7.000 - 22.000€</p>
                  <p><strong>Freizeitpferd:</strong> 2.500 - 10.000€</p>
                  <p><strong>Besonderheiten:</strong> Starker Springsport-Markt</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                <h3 className="text-h3 font-semibold text-gray-800 mb-4">Ostdeutschland</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Durchschnittspreis Sportpferd:</strong> 5.000 - 18.000€</p>
                  <p><strong>Freizeitpferd:</strong> 2.000 - 8.000€</p>
                  <p><strong>Besonderheiten:</strong> Günstigere Preise, gute Zuchtqualität</p>
                </div>
              </div>
            </div>

            <div className="text-center bg-brand-light/50 rounded-xl p-8">
              <h3 className="text-h3 font-semibold text-gray-800 mb-4">
                🎯 Ihre Vorteile bei der regionalen Pferdebewertung
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">✓ Lokale Marktkenntnis</h4>
                  <p className="text-sm text-gray-600">Berücksichtigung regionaler Preisunterschiede und Nachfrage</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">✓ Aktuelle Marktdaten</h4>
                  <p className="text-sm text-gray-600">Wöchentlich aktualisierte Preise aus Online-Verkaufsplattformen</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">✓ Disziplin-spezifisch</h4>
                  <p className="text-sm text-gray-600">Unterschiedliche Bewertung für Dressur, Springen, Vielseitigkeit</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">✓ Jahreszeit-Effekte</h4>
                  <p className="text-sm text-gray-600">Saisonale Preisschwankungen werden berücksichtigt</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-linking Section - Erweitert */}
        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-h2 font-bold text-center text-gray-900 mb-8">
              Weitere Services für Pferdebesitzer
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Käufer-Tipp:</strong> Du möchtest ein <Link href="/pferd-kaufen" className="text-blue-700 underline hover:text-blue-900">Pferd kaufen in Bayern oder NRW</Link>? Nutze unsere Bewertung zur Preisüberprüfung vor dem Kauf.
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  💡 <strong>Verkäufer-Tipp:</strong> Du möchtest dein <Link href="/pferd-verkaufen" className="text-green-700 underline hover:text-green-900">Pferd verkaufen in Bayern oder NRW</Link>? Ermittle den optimalen Verkaufspreis mit unserer Bewertung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-brand-light/50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-brand mb-12">
              Das sagen Pferdebesitzer über unsere Bewertungen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  &quot;Ich wollte wissen, ob der Preis für mein Pferd fair war. Die Bewertung hat meine Einschätzung bestätigt und mir Sicherheit gegeben.&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Maria S., Freizeitreiterin
                </cite>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  &quot;Für die Versicherung brauchte ich eine realistische Werteinschätzung. Sehr detaillierte und nachvollziehbare Analyse!&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Thomas K., Springreiter
                </cite>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  &quot;Wollte einfach aus Neugier wissen, was mein Pferd wert ist. Sehr interessante und ausführliche Bewertung erhalten!&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Jennifer L., Hobbyreiterin
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA />
      </>
    </Layout>
  );
}