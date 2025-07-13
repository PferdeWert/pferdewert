// pages/was-ist-mein-pferd-wert.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Star, TrendingUp, Calculator, Shield, Clock, CheckCircle } from "lucide-react";

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
      antwort: "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen."
    },
    {
      frage: "Kostet der Service etwas?",
      antwort: "Unsere umfassende Preisanalyse kostet aktuell 9,90 Euro (Einführungspreis), anstatt regulär 39 Euro."
    },
    {
      frage: "Was passiert mit meinen Daten?",
      antwort: "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben."
    },
    {
      frage: "Wie lange dauert die Analyse?",
      antwort: "Unser KI-Modell erstellt deine Analyse sofort nach dem Bezahlvorgang bei Stripe."
    },
    {
      frage: "Welche Zahlungsmöglichkeiten gibt es?",
      antwort: "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay und Klarna möglich."
    }
  ];

  return (
    <Layout>
      <>
        <Head>
          <title>Was ist mein Pferd wert? Professionelle Pferdebewertung | PferdeWert.de</title>
          <meta
            name="description"
            content="Was ist mein Pferd wert? Erfahren Sie, welche Faktoren den Pferdewert bestimmen ✓ Kostenlose Ersteinschätzung ✓ Professionelle Bewertung in 2 Minuten"
          />
          <meta name="keywords" content="was ist mein pferd wert, pferdewert, pferdebewertung, pferd wert ermitteln, marktwert pferd" />
          <meta property="og:title" content="Was ist mein Pferd wert? Professionelle Antworten & Bewertung" />
          <meta property="og:description" content="Finden Sie heraus, was Ihr Pferd wirklich wert ist. Professionelle Bewertung basierend auf Marktdaten und Expertenwissen." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pferdewert.de/was-ist-mein-pferd-wert" />
          <meta property="og:image" content="https://pferdewert.de/images/blossi-3.jpg" />
          <link rel="canonical" href="https://pferdewert.de/was-ist-mein-pferd-wert" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "headline": "Was ist mein Pferd wert? Professionelle Pferdebewertung",
                "description": "Umfassender Ratgeber zur Ermittlung des Pferdewerts mit professionellen Bewertungsmethoden",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Wie genau ist die Bewertung?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen."
                    }
                  },
                  {
                    "@type": "Question", 
                    "name": "Kostet der Service etwas?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unsere umfassende Preisanalyse kostet aktuell 9,90 Euro (Einführungspreis), anstatt regulär 39 Euro."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Was passiert mit meinen Daten?", 
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Wie lange dauert die Analyse?",
                    "acceptedAnswer": {
                      "@type": "Answer", 
                      "text": "Unser KI-Modell erstellt deine Analyse sofort nach dem Bezahlvorgang bei Stripe."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Welche Zahlungsmöglichkeiten gibt es?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay und Klarna möglich."
                    }
                  }
                ],
                "author": {
                  "@type": "Organization",
                  "name": "PferdeWert.de"
                },
                "publisher": {
                  "@type": "Organization", 
                  "name": "PferdeWert.de"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://pferdewert.de/was-ist-mein-pferd-wert"
                }
              })
            }}
          />
        </Head>

        {/* Hero Section */}
        <section className="bg-brand-light py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Was ist mein Pferd wert?
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Eine Frage, die sich jeder Pferdebesitzer früher oder später stellt. Ob vor dem <strong>Kauf</strong>, einem anstehenden <strong>Verkauf</strong>, die <strong>Versicherung</strong> oder einfach aus <strong>Neugier</strong> – der Wert Ihres treuen Gefährten hängt von vielen Faktoren ab.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Erfahren Sie, welche Kriterien den Marktwert bestimmen und erhalten Sie eine professionelle Einschätzung für Ihr Pferd.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pferde-preis-berechnen" className="btn-primary">
                  Jetzt Bewertung starten
                </Link>
                <Link href="/beispiel-analyse" className="btn-secondary">
                  Beispiel-Analyse anschauen
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 md:order-2">
              <Image
                src="/images/blossi-3.webp"
                width={600}
                height={800}
                alt="Professionelle Pferdebewertung - Deutsches Sportpferd für Marktwert-Ermittlung"
                className="rounded-2xl shadow-xl w-full h-auto"
                priority
              />
            </div>
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-brand-brown to-brand-brownDark py-16 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Finden Sie jetzt heraus, was Ihr Pferd wirklich wert ist
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Professionelle Bewertung in 2 Minuten • Basierend auf aktuellen Marktdaten • Sofort verfügbar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                Jetzt Bewertung starten
              </Link>
              <div className="text-sm opacity-75">
                ✓ Keine Anmeldung erforderlich • ✓ Sofort verfügbar
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-brand mb-12">
              Häufige Fragen zur Pferdebewertung
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details key={index} className="bg-brand-light/50 rounded-2xl border border-gray-200">
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
                className="btn-primary"
              >
                Jetzt Bewertung starten
              </Link>
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
      </>
    </Layout>
  );
}