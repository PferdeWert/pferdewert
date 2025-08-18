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
      frage: "Wie genau ist die Bewertung?",
      antwort: "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen.",
      isOpen: true // Erstes FAQ standardmäßig geöffnet
    },
    {
      frage: "Kostet der Service etwas?",
      antwort: PRICING_TEXTS.faqAnswer,
      isOpen: false
    },
    {
      frage: "Was passiert mit meinen Daten?",
      antwort: "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben.",
      isOpen: false
    },
    {
      frage: "Wie lange dauert die Analyse?",
      antwort: "Unser KI-Modell erstellt deine Analyse sofort nach dem Bezahlvorgang bei Stripe.",
      isOpen: false
    },
    {
      frage: "Welche Zahlungsmöglichkeiten gibt es?",
      antwort: "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay und Klarna möglich.",
      isOpen: false
    }
  ];

  return (
    <Layout>
      <>
        <Head>
          <title>Was ist mein Pferd wert Bayern NRW? Professionelle Bewertung | PferdeWert</title>
          <meta
            name="description"
            content="🐎 Pferdebewertung Bayern & NRW: Was ist mein Pferd wert? KI-Analyse für 14,90€ ✓ Sofort-PDF ✓ 32+ Bewertungen täglich ✓ Jetzt Marktwert ermitteln!"
          />
          <meta name="keywords" content="was ist mein pferd wert bayern, pferd wert nrw, pferdebewertung baden württemberg, pferd wert ermitteln, marktwert pferd regional, pferde preis berechnen" />
          <meta property="og:title" content="Was ist mein Pferd wert? Professionelle Pferdebewertung | PferdeWert.de" />
          <meta property="og:description" content="🐎 Was ist mein Pferd wert? KI-Pferdebewertung für nur 14,90€ ✓ Ohne Anmeldung ✓ Sofort als PDF ✓ Jetzt Marktwert ermitteln!" />
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Was ist mein Pferd wert? Professionelle Bewertung in 2 Minuten
              </h1>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                <strong>Pferdewert ermitteln</strong> mit KI-basierter Analyse. Ob für <strong>Verkauf</strong>, <strong>Kauf</strong> oder <strong>Versicherung</strong> – erhalten Sie eine fundierte <strong>Pferdebewertung</strong> basierend auf tausenden Marktdaten.
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Diese Faktoren bestimmen den Wert Ihres Pferdes
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Der Marktwert eines Pferdes setzt sich aus verschiedenen Komponenten zusammen. 
              Je besser Sie diese Faktoren kennen, desto realistischer können Sie den Wert einschätzen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bewertungsfaktoren.map((faktor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
            <h2 className="text-3xl font-bold text-center text-brand mb-12">
              Häufige Fragen zur Pferdebewertung
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details key={index} className="bg-brand-light/50 rounded-2xl border border-gray-200" open={item.isOpen}>
                  <summary className="cursor-pointer p-6 text-lg font-semibold text-brand hover:text-brand-brown transition">
                    {item.frage}
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

        {/* Cross-linking Section */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-4xl mx-auto">
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
            <h2 className="text-3xl font-bold text-center text-brand mb-12">
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