// pages/index.tsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Clock, Shield, Award, Star, ArrowRight, TrendingUp, Users, CheckCircle } from "lucide-react";

export default function PferdeWertHomepage() {
  // Preise als Konstanten
  const PRICING = {
    launch: 9.90,
    regular: 39
  };

  // FAQ Data
  const faqItems = [
    {
      frage: "Was ist mein Pferd wert?",
      antwort: "Unser KI-Modell analysiert Verkaufsdaten, Rasse, Alter, Ausbildung, Gesundheitsstatus und mehr – so erhältst du eine realistische Preisspanne für dein Pferd, sofort und ohne Anmeldung."
    },
    {
      frage: "Wie kann ich den Preis für mein Pferd berechnen?",
      antwort: "Einfach das Online-Formular ausfüllen und unser KI-System ermittelt in unter 2 Minuten eine fundierte Preisspanne – ideal zur Vorbereitung für Verkauf oder Kauf."
    },
    {
      frage: "Wie funktioniert die KI-basierte Bewertung?",
      antwort: "Unsere KI analysiert über 50.000 Verkaufsdaten, berücksichtigt Rasse, Alter, Ausbildungsstand, Gesundheit und aktuelle Markttrends für eine präzise Bewertung."
    },
    {
      frage: "Ist die Bewertung für Käufer und Verkäufer geeignet?",
      antwort: "Ja! Verkäufer erhalten eine realistische Preiseinschätzung, Käufer können überprüfen ob ein Angebot fair ist und haben starke Argumente für Verhandlungen."
    },
    {
      frage: "Warum kostet die Bewertung nur 9,90€?",
      antwort: `Das ist unser Launch-Angebot als neues Startup. Wir möchten möglichst vielen Pferdebesitzern helfen, unseren Service kennenzulernen. Später liegt der reguläre Preis bei ${PRICING.regular}€.`
    },
    {
      frage: "Erhalte ich eine Geld-zurück-Garantie?",
      antwort: "Ja, absolut! Falls du nicht zufrieden bist, erstatten wir dir den vollen Betrag zurück. Kein Risiko für dich."
    }
  ];

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-brand-light to-white">
      <Head>
        <title>Pferd verkaufen & kaufen: Marktwert berechnen | PferdeWert</title>
        <meta
          name="description"
          content="Pferd verkaufen oder kaufen? Marktwert berechnen mit KI ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min Analyse als PDF"
        />
        <meta property="og:title" content="Pferd verkaufen & kaufen: Marktwert mit KI berechnen | PferdeWert" />
        <meta property="og:description" content="Pferd verkaufen oder kaufen? Marktwert berechnen mit KI ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min Analyse als PDF" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/" />
        <meta property="og:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd verkaufen & kaufen: Marktwert mit KI berechnen" />
        <meta name="twitter:description" content="Marktwert berechnen ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min KI-Analyse" />
        <meta name="twitter:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <link rel="canonical" href="https://pferdewert.de/" />

        {/* Structured Data für SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PferdeWert",
              "url": "https://pferdewert.de/",
              "description": "Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung",
              "publisher": {
                "@type": "Organization",
                "name": "PferdeWert",
                "url": "https://pferdewert.de"
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
      </Head>

      <main className="min-h-screen">
        {/* Scroll offset für sticky header */}
        <style jsx>{`
          section[id] {
            scroll-margin-top: 4rem;
          }
          .hero-fade-in-left {
            animation: fadeInLeft 1s ease 0.2s both;
          }
          .hero-fade-in-right {
            animation: fadeInRight 1s ease 0.5s both;
          }
          @keyframes fadeInLeft {
            from { 
              opacity: 0; 
              transform: translateX(-10px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          @keyframes fadeInRight {
            from { 
              opacity: 0; 
              transform: translateX(10px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-fade-in-left,
            .hero-fade-in-right {
              animation: none;
            }
          }
        `}</style>

        {/* Hero Section */}
        <section id="bewertung" className="relative overflow-hidden">
          <div className="px-4 lg:px-8 xl:px-12 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 hero-fade-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                    🏆 KI-gestützte Pferdebewertung
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Deutschlands führende Plattform für{" "}
                    <span className="text-brand-brown">Pferdebewertung</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Entwickelt von Reitern für Reiter – präzise, transparent, vertrauenswürdig. Erhalten Sie eine
                    professionelle KI-basierte Bewertung Ihres Pferdes in nur 2 Minuten.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-brand-brown" />
                    <span>In 2 Minuten</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-brand-brown" />
                    <span>Kein Abo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-brand-brown" />
                    <span>Geld-zurück-Garantie</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span>4,7/5</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/pferde-preis-berechnen"
                    className="btn-primary group text-lg px-8 py-4"
                  >
                    Jetzt Pferdewert berechnen
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/beispiel-analyse"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Beispielanalyse ansehen
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative hero-fade-in-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/20 to-brand-gold/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/images/blossi-shooting.webp"
                    alt="Unser Pferd Blossom beim Photoshooting - Professionelle Pferdebewertung Beispiel"
                    width={600}
                    height={600}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="relative rounded-3xl shadow-2xl object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <section id="preise" className="bg-gradient-to-r from-brand-gold/20 to-brand-brown/20 border-y border-brand-brown/20">
          <div className="px-4 lg:px-8 xl:px-12 py-6">
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold text-brand-brown">🎯 Launch-Angebot:</span> Nur{" "}
                <span className="font-bold text-2xl text-brand-brown">{PRICING.launch.toFixed(2).replace('.', ',')} €</span>{" "}
                <span className="line-through text-gray-500">statt {PRICING.regular} €</span> – jetzt bei unserem Launch!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Keine versteckten Kosten • Einmalzahlung • Direkt online starten
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="vorteile" className="py-20 bg-white">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Warum PferdeWert die beste Wahl ist</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professionelle Pferdebewertung basierend auf jahrelanger Expertise und modernster KI-Technologie
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8 text-brand-brown" />,
                  title: "Blitzschnell",
                  description: "Professionelle Bewertung in nur 2 Minuten – ohne Wartezeit, ohne Terminvereinbarung.",
                },
                {
                  icon: <Shield className="w-8 h-8 text-brand-brown" />,
                  title: "100% Transparent",
                  description: "Nachvollziehbare Bewertungskriterien und detaillierte Erklärung aller Faktoren.",
                },
                {
                  icon: <Award className="w-8 h-8 text-brand-brown" />,
                  title: "Expertenwissen",
                  description: "Entwickelt von erfahrenen Reitern und Pferdeexperten.",
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-brand-brown" />,
                  title: "Marktgerecht",
                  description: "Aktuelle Marktpreise und Trends fließen in jede Bewertung mit ein.",
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-brand-brown" />,
                  title: "Geld-zurück-Garantie",
                  description: "Nicht zufrieden? Wir erstatten Ihnen den vollen Betrag zurück.",
                },
                {
                  icon: <Users className="w-8 h-8 text-brand-brown" />,
                  title: "Vertrauenswürdig",
                  description: "Professionelle Bewertungen für Pferdebesitzer deutschlandweit.",
                },
              ].map((feature, index) => (
                <div key={index} className="border-0 shadow-soft hover:shadow-xl transition-shadow duration-300 bg-white rounded-2xl">
                  <div className="p-8 text-center">
                    <div className="bg-brand-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-brand-light/50">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
              <p className="text-xl text-gray-600">
                Echte Erfahrungen von Pferdebesitzern, die unseren Service bereits genutzt haben
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown relative">
                <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                  &quot;
                </div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  Das Pferd wurde für 18.000€ angeboten. Die PferdeWert-Analyse ergab 14.000-16.000€. 
                  Ich konnte auf 15.500€ verhandeln und habe 2.500€ gespart!
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  - Lisa K., Dressurreiterin
                </cite>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown relative">
                <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                  &quot;
                </div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen 
                  eine Einschätzung zu bekommen und ich konnte mein Pferd auch zu dem empfohlenen Preis verkaufen!
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  - Sarah M., Freizeitreiterin
                </cite>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-brand-brown relative">
                <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                  &quot;
                </div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  Ich besitze ein Pferd und wollte einfach nur aus Neugier den aktuellen Marktwert wissen. 
                  Super interessant was PferdeWert als Ergebnis bereitstellt, vor allem auch die Analyse der Abstammung!
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  - Anna L., Pferdebesitzerin
                </cite>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4"
              >
                Jetzt Pferdewert berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Häufige Fragen</h2>
              <p className="text-xl text-gray-600">
                Alles was Sie über unsere Pferdebewertung wissen möchten
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <details key={index} className="bg-brand-light/50 rounded-2xl border border-gray-200 p-6">
                  <summary className="cursor-pointer text-lg font-semibold text-brand hover:text-brand-brown transition-colors">
                    {item.frage}
                  </summary>
                  <div className="mt-4">
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
                className="btn-primary text-lg px-8 py-4"
              >
                Jetzt {PRICING.launch.toFixed(2).replace('.', ',')} €-Analyse starten
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-brown to-brand-brownDark">
          <div className="px-4 lg:px-8 xl:px-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Bereit für Ihre professionelle Pferdebewertung?
              </h2>
              <p className="text-xl text-brand-light mb-8">
                Starten Sie jetzt und erhalten Sie in wenigen Minuten eine detaillierte, professionelle Bewertung Ihres
                Pferdes.
              </p>
              <Link
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold bg-white text-brand-brown hover:bg-brand-light transition-colors rounded-xl shadow-lg"
              >
                Jetzt {PRICING.launch.toFixed(2).replace('.', ',')} €-Analyse starten
              </Link>
              <p className="text-sm text-brand-light/80 mt-4">
                Launch-Angebot – danach regulärer Preis von {PRICING.regular} €
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}