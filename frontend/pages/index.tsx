// pages/index.tsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HomepageReviewSchema } from "@/components/PferdeWertReviewSchema";
import { Clock, Shield, Award, Star, ArrowRight, TrendingUp, Users, CheckCircle, Instagram } from "lucide-react";
import { PRICING_FORMATTED, PRICING_TEXTS } from "../lib/pricing";

// TypeScript interfaces for testimonials
interface RealTestimonial {
  name: string;
  location: string;
  role: string;
  photo: string;
  instagramHandle?: string;
  quote: string;
  verifiedDate: string;
  rating: number;
}


export default function PferdeWertHomepage() {
  // Preise aus zentraler Konfiguration (importiert)

  // Testimonials data
  const realTestimonials: RealTestimonial[] = [
    {
      name: "Miriam F.",
      location: "Deutschland",
      role: "Ambitionierte Freizeitreiterin (Dressur)",
      photo: "/images/testimonials/miriam-customer-64.webp",
      instagramHandle: "herzenspferd_felino",
      quote: "Nach einem Jahr gemeinsamer Zeit war ich neugierig, wie mein Pferd aktuell bewertet wird. Die Bewertung über PferdeWert war für mich eine tolle Möglichkeit, eine realistische Einschätzung zu bekommen – unkompliziert, nachvollziehbar und professionell. Wer wissen möchte, was das eigene Pferd wirklich wert ist, findet bei PferdeWert eine durchdachte und fachlich fundierte Einschätzung. Besonders gut: Es wird nicht nur pauschal bewertet, sondern auch individuell auf Abstammung und Gesundheitsstatus eingegangen.",
      verifiedDate: "2024-01-15",
      rating: 5
    },
    {
      name: "Eva T.",
      location: "Deutschland",
      role: "Besitzerin von Fürstiano",
      photo: "/images/testimonials/eva-customer-64.webp",
      instagramHandle: "die_rappenschmiede",
      quote: "Nach einer Verletzung von Fürstiano war ich unsicher über seinen aktuellen Marktwert. Die PferdeWert-Analyse war super einfach auszufüllen und das Ergebnis kam sofort. Besonders hilfreich fand ich die detaillierte Aufschlüsselung der Bewertungsfaktoren - das hat mir wirklich geholfen, die Situation realistisch einzuschätzen. Auch wenn für mich mein Pferd unbezahlbar bleibt, war es interessant zu wissen, wo er marktmäßig steht.",
      verifiedDate: "2024-12-20",
      rating: 5
    },
    {
      name: "Denise B.",
      location: "Deutschland", 
      role: "von energy_emotion",
      photo: "/images/testimonials/denise-customer-64.webp",
      instagramHandle: "energy_emotion",
      quote: "Auch wenn ein Verkauf meiner beiden Stuten nicht in Frage kommt, war ich neugierig, wo ihr aktueller Marktwert liegt. Die Bewertung bei PferdeWert war überraschend einfach – ein paar Fragen zur Abstammung, zu eventuellen Krankheitsbildern, Ausbildung und Turniererfolgen, das war's. Keine 10 Minuten später hatte ich eine detaillierte Analyse zu beiden Pferden. Perfekt für alle, die vor einem Pferdekauf oder Pferdeverkauf stehen oder einfach so wissen möchten, was ihre Pferde wert sind.",
      verifiedDate: "2025-01-12",
      rating: 5
    }
  ];

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
      frage: "Welche Faktoren beeinflussen den Pferdewert am meisten?",
      antwort: "Die wichtigsten Faktoren sind: Rasse und Abstammung, Alter des Pferdes, Ausbildungsstand und Turniererfolge, Gesundheitszustand, Charakter und Reitbarkeit sowie aktuelle Marktnachfrage. Premium-Rassen und gut ausgebildete Sportpferde erzielen meist höhere Preise."
    },
    {
      frage: "Ist die Bewertung für Käufer und Verkäufer geeignet?",
      antwort: "Ja! Verkäufer erhalten eine realistische Preisbewertung, Käufer können überprüfen, ob ein Angebot fair ist und haben starke Argumente für Verhandlungen."
    },
    {
      frage: "Kann ich auch Fohlen und Jungpferde bewerten lassen?",
      antwort: "Ja, unser System bewertet Pferde ab 6 Monaten. Bei jungen Pferden fließen vor allem Abstammung, Rasse, Gesundheit und Entwicklungspotenzial in die Bewertung ein. Je älter das Pferd, desto mehr Gewicht haben Ausbildung und Turniererfolge."
    },
    {
      frage: "Wie genau ist die KI-Bewertung im Vergleich zu einem Gutachter?",
      antwort: "Unsere KI-Bewertung erreicht eine Genauigkeit von über 85% und liegt damit sehr nah an professionellen Gutachten. Der Vorteil: Du erhältst das Ergebnis sofort, kostengünstig und basierend auf aktuellsten Marktdaten. Für offizielle Zwecke empfehlen wir zusätzlich einen zertifizierten Gutachter."
    },
    {
      frage: "Berücksichtigt die Bewertung regionale Preisunterschiede?",
      antwort: "Ja, definitiv! Unsere KI analysiert regionale Marktdaten und berücksichtigt, dass Pferde in Bayern, NRW oder anderen Bundesländern unterschiedliche Preise erzielen können. Auch die Nähe zu Reitzentren und die lokale Nachfrage fließen in die Bewertung ein."
    },
    {
      frage: "Was passiert, wenn mein Pferd Gesundheitsprobleme hat?",
      antwort: "Gesundheitsprobleme werden transparent in der Bewertung berücksichtigt. Du gibst den Gesundheitsstatus ehrlich an und unsere KI passt den Wert entsprechend an. Kleinere Probleme haben weniger Einfluss als chronische Erkrankungen oder Operationen."
    },
    {
      frage: "Kann ich mehrere Pferde gleichzeitig bewerten lassen?",
      antwort: "Derzeit ist eine Bewertung pro Durchgang möglich. Für jedes weitere Pferd startest du einfach eine neue Bewertung. Bei größeren Beständen kontaktiere uns gerne für individuelle Lösungen."
    },
    {
      frage: "Wie aktuell sind die Marktdaten in der Bewertung?",
      antwort: "Unsere Datenbank wird kontinuierlich aktualisiert. Wir analysieren laufend aktuelle Verkäufe, Auktionsergebnisse und Markttrends. So reflektiert jede Bewertung die neuesten Entwicklungen des deutschen Pferdemarktes."
    },
    {
      frage: PRICING_TEXTS.whyAffordable,
      antwort: `Das ist unser Launch-Angebot als neues Startup. Wir möchten möglichst vielen Pferdebesitzern helfen, unseren Service kennenzulernen. Später liegt der reguläre Preis bei ${PRICING_FORMATTED.decoy}.`
    },
    {
      frage: "Erhalte ich eine Geld-zurück-Garantie?",
      antwort: "Ja, absolut! Falls du nicht zufrieden bist, erstatten wir dir den vollen Betrag zurück. Kein Risiko für dich."
    }
  ];

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Pferd kaufen Preis berechnen | KI-Pferdebewertung online | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen Preis berechnen ✓ KI-Pferdebewertung online in 2 Min ✓ Für Käufer & Verkäufer ✓ Transparente Marktpreise ohne Anmeldung ✓ Jetzt starten!"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Pferd kaufen Preis berechnen | KI-Pferdebewertung online | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Preis berechnen ✓ KI-Pferdebewertung online in 2 Min ✓ Transparente Marktpreise ohne Anmeldung ✓ Jetzt starten!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/" />
        <meta property="og:site_name" content="PferdeWert" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <meta property="og:image:alt" content="PferdeWert – KI-Pferdebewertung" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Preis berechnen | KI-Pferdebewertung online" />
        <meta name="twitter:description" content="Pferd kaufen Preis berechnen ✓ KI-Pferdebewertung online in 2 Min ✓ Transparente Marktpreise ohne Anmeldung" />
        <meta name="twitter:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <meta name="twitter:image:alt" content="PferdeWert – KI-Pferdebewertung" />
        <link rel="canonical" href="https://pferdewert.de/" />
        
        {/* Critical CSS für above-the-fold Content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-fade-in-left,.hero-fade-in-right{opacity:1;transform:none}
            @media(min-width:768px){
              .hero-fade-in-left{animation:fadeInLeft 1s ease 0.2s both}
              .hero-fade-in-right{animation:fadeInRight 1s ease 0.2s both}
            }
            @keyframes fadeInLeft{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
            @keyframes fadeInRight{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
            .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 1.5rem;background-color:#8B4513;color:#fff;font-weight:700;border-radius:1rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);transition:all 0.3s;text-decoration:none}
            .btn-primary:hover{background-color:#7A3F12}
            .btn-secondary{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 1.5rem;border:1px solid #8B4513;color:#8B4513;background:#fff;font-weight:700;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.1);transition:all 0.3s;text-decoration:none}
            .btn-secondary:hover{background-color:#f9fafb}
          `
        }} />

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

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PferdeWert",
              "description": "Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung",
              "url": "https://pferdewert.de",
              "logo": "https://pferdewert.de/logo.webp",
              "image": "https://pferdewert.de/images/blossi-shooting.webp",
              "priceRange": "€",
              "areaServed": {
                "@type": "Country",
                "name": "Deutschland"
              },
              "serviceArea": {
                "@type": "Country", 
                "name": "Deutschland"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Pferdebewertung Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "KI-basierte Pferdebewertung",
                      "description": "Professionelle Bewertung des Marktwerts von Pferden mittels künstlicher Intelligenz"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Review Schema für Trust-Signale */}
        <HomepageReviewSchema />
      </Head>

      <main className="min-h-screen">

        {/* Hero Section */}
        <section id="bewertung" className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 hero-fade-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                    🏆 #1 Online Pferdebewertung
                  </div>
                  <h1 className="text-h1 font-bold text-gray-900">
                    Was ist mein <span className="text-brand-brown">Pferd wert?</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Entwickelt von Reitern für Reiter – präzise, transparent, vertrauenswürdig. Erhalte eine
                    professionelle KI-basierte Bewertung deines Pferdes in nur 2 Minuten.
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
                <div className="relative hero-fade-in-right">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/20 to-brand-gold/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/images/blossi-shooting.webp"
                    alt="Unser Pferd Blossom beim Photoshooting - Professionelle Pferdebewertung Beispiel"
                    width={600}
                    height={600}
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 80vw, 90vw"
                    className="relative rounded-3xl shadow-2xl object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvND+0532KzGVhZQAAAAD//Z"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <section id="preise" className="bg-gradient-to-r from-brand-gold/20 to-brand-brown/20 border-y border-brand-brown/20">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold text-brand-brown">🎯 Schnell sein lohnt sich:</span> Nur{" "}
                <span className="font-bold text-2xl text-brand-brown">{PRICING_FORMATTED.current}</span>{" "}
                <span className="line-through text-gray-500">statt {PRICING_FORMATTED.decoy}</span> – exklusiv in der Sommer-Aktion!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Keine versteckten Kosten • Einmalzahlung • Direkt online starten
              </p>
            </div>
          </div>
        </section>

{/* CTA Section direkt darunter */}
<section className="bg-white py-12 px-4">
  <div className="container mx-auto text-center">
    <Link
      href="/pferde-preis-berechnen"
      className="btn-primary px-8 py-4 text-lg"
    >
      Jetzt Pferdewert berechnen
    </Link>
    
    <p className="text-sm text-gray-600 mt-4">
      Sichere Bezahlung • Sofortiges Ergebnis • Keine Abos
    </p>
  </div>
</section>

        {/* Testimonials Section */}
        <section className="section bg-brand-light/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
              <p className="text-xl text-gray-600">
                Erfahrungen von Pferdebesitzern und Reitern
              </p>
            </div>

            {/* Optimized grid layout for 3 testimonials */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {/* Real Testimonials with Photos */}
              {realTestimonials.map((testimonial, index) => (
                <div key={index} className="flex">
                  <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-brand-brown relative flex flex-col w-full h-auto">
                    
                    {/* Quote mark */}
                    <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                      &quot;
                    </div>
                    
                    {/* Customer info with consistent height */}
                    <div className="flex items-start mb-4 ml-6 min-h-[80px]">
                      <div className="relative w-16 mr-4 flex-shrink-0">
                        <Image
                          src={testimonial.photo}
                          alt={`${testimonial.name} Profilbild`}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-md object-cover"
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 leading-snug">{testimonial.role}</div>
                        <div className="text-xs text-gray-500">{testimonial.location}</div>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex mb-4 ml-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                      ))}
                    </div>
                    
                    {/* Quote - grows to fill available space */}
                    <blockquote className="text-gray-700 mb-6 ml-6 leading-relaxed flex-grow text-sm">
                      {testimonial.quote}
                    </blockquote>
                    
                    {/* Instagram link - always at bottom with consistent height */}
                    <div className="ml-6 mt-auto min-h-[48px] flex items-center">
                      {testimonial.instagramHandle && (
                        <a
                          href={`https://instagram.com/${testimonial.instagramHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-brown transition-colors py-2 px-3 rounded-lg hover:bg-brand-light/50"
                          aria-label={`${testimonial.name} auf Instagram folgen`}
                        >
                          <Instagram className="w-4 h-4" />
                          @{testimonial.instagramHandle}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Call-to-Action */}
            <div className="text-center mt-16">
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-medium mb-6">
                  Professionelle Bewertungen für Pferdebesitzer und Pferdekäufer
                </p>
              </div>
              
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Jetzt Pferdewert berechnen
              </Link>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  30 Tage Geld-zurück-Garantie
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pferd kaufen Preis Section - High-value keyword targeting */}
        <section id="pferd-kaufen-preis" className="section bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                Pferd kaufen Preis richtig einschätzen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vermeide Fehlkäufe und Überzahlung – mit unserer KI-Pferdebewertung online erhältst du transparente Marktpreise vor dem Pferdekauf
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Aktuelle Marktpreise</h3>
                <p className="text-gray-600">
                  Realistische Pferd kaufen Preise basierend auf über 50.000 Verkaufsdaten aus Deutschland
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Schutz vor Überzahlung</h3>
                <p className="text-gray-600">
                  Objektive Pferdebewertung online hilft dir, faire Pferd kaufen Preise zu erkennen
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-brown" />
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Verhandlungssicherheit</h3>
                <p className="text-gray-600">
                  Mit fundierter Pferdebewertung online optimal auf Preisverhandlungen beim Pferdekauf vorbereitet
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4"
              >
                Pferd kaufen Preis jetzt berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="vorteile" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">Warum PferdeWert die beste Wahl ist</h2>
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
                  description: "Nicht zufrieden? Wir erstatten dir den vollen Betrag zurück.",
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
                    <h3 className="text-h3 font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">Häufige Fragen</h2>
              <p className="text-xl text-gray-600">
                Alles was du über unsere Pferdebewertung wissen möchtest
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <details key={index} className="bg-brand-light/50 rounded-2xl border border-gray-200 cursor-pointer hover:bg-brand-light/70 transition-colors">
                  <summary className="p-6 text-lg font-semibold text-brand hover:text-brand-brown transition-colors list-none [&::-webkit-details-marker]:hidden">
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
                className="btn-primary text-lg px-8 py-4"
              >
                Jetzt Pferdewert berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* Regional Services Cross-linking Section */}
        <section className="section bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                Pferdebewertung für alle Lebenslagen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ob Kauf, Verkauf oder einfach aus Neugier – unsere KI-Bewertung unterstützt dich bei allen Entscheidungen rund um deinen Pferdewert
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Käufer-Service */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-h3 font-bold text-gray-900 mb-2">Für Pferdekäufer</h3>
                  <p className="text-gray-600">Sichere Kaufentscheidungen treffen</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Faire Preise erkennen und Überzahlung vermeiden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fundierte Verhandlungsgrundlage mit Marktdaten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Objektive Bewertung vor der Besichtigung</span>
                  </li>
                </ul>
                <Link 
                  href="/pferd-kaufen" 
                  className="block w-full text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Pferd kaufen in Bayern & NRW →
                </Link>
              </div>

              {/* Verkäufer-Service */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-h3 font-bold text-gray-900 mb-2">Für Pferdeverkäufer</h3>
                  <p className="text-gray-600">Optimalen Verkaufspreis ermitteln</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Marktgerechten Verkaufspreis bestimmen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Schneller verkaufen durch realistische Preisgestaltung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Verhandlungssicherheit mit professioneller Bewertung</span>
                  </li>
                </ul>
                <Link 
                  href="/pferd-verkaufen" 
                  className="block w-full text-center bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Pferd verkaufen in Bayern & NRW →
                </Link>
              </div>
            </div>

            {/* Central Service Hub */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-brand-brown/20 max-w-2xl mx-auto">
                <h3 className="text-h3 font-bold text-gray-900 mb-4">
                  💡 Neugierig auf den aktuellen Marktwert deines Pferdes?
                </h3>
                <p className="text-gray-600 mb-6">
                  Erfahre mit unserer <Link href="/was-ist-mein-pferd-wert" className="text-brand-brown underline hover:text-brand-brownDark">professionellen Pferdebewertung</Link> den aktuellen Marktwert – 
                  egal ob aus Neugier, für Versicherung oder zukünftige Planung.
                </p>
                <Link 
                  href="/was-ist-mein-pferd-wert" 
                  className="inline-flex items-center gap-2 bg-brand-brown text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-brownDark transition-colors"
                >
                  Was ist mein Pferd wert? <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section bg-gradient-to-r from-brand-brown to-brand-brownDark">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-h2 font-bold text-white mb-6">
                Bereit für deine professionelle Pferdebewertung?
              </h2>
              <p className="text-xl text-brand-light mb-8">
                Starte jetzt und erhalte in wenigen Minuten eine detaillierte, professionelle Bewertung deines
                Pferdes.
              </p>
              <Link
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold bg-white text-brand-brown hover:bg-brand-light transition-colors rounded-xl shadow-lg"
              >
                Jetzt Pferdewert berechnen
              </Link>
              <p className="text-sm text-brand-light/80 mt-4">
                Launch-Angebot – danach regulärer Preis von {PRICING_FORMATTED.decoy}
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
