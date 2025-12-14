// pages/index.tsx
// Updated: 2025-10-10 - Deployment trigger
import React from "react";
import Head from "next/head";
import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import { HomepageReviewSchema } from "@/components/PferdeWertReviewSchema";

// Lazy load below-the-fold components for better performance
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />,
});
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <div className="min-h-[500px] bg-gray-50 animate-pulse" />,
});
import { Clock, Shield, Award, ArrowRight, TrendingUp, CheckCircle, Instagram, Users } from "lucide-react";
import { PRICING_FORMATTED, PRICING_TEXTS } from "../lib/pricing";
import { useSEO } from "@/hooks/useSEO";

// FAQ Data - HYDRATION FIX: Moved outside component to prevent infinite re-renders
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
      frage: "Was kostet eine Pferdebewertung normalerweise?",
      antwort: "Professionelle Pferdegutachten kosten normalerweise zwischen 200-500€. Unsere KI-Bewertung bietet dir eine vergleichbare Einschätzung für nur einen Bruchteil der Kosten."
    },
    {
      frage: "Wie unterscheiden sich Pferdepreise nach Rassen?",
      antwort: "Die Rasse beeinflusst den Preis erheblich: Warmblüter für den Sport (15.000-50.000€+), Haflingers und Fjordpferde (8.000-20.000€), Quarter Horses (10.000-25.000€). Seltene Rassen oder Championlinien können deutlich höhere Preise erzielen."
    },
    {
      frage: "Wann ist der beste Zeitpunkt für eine Pferdebewertung?",
      antwort: "Vor dem Verkauf: um einen realistischen Preis festzulegen. Vor dem Kauf: um Verhandlungsspielraum zu erkennen. Bei Versicherung: für korrekte Deckungssummen. Bei Erbschaft oder Scheidung: für faire Vermögensaufteilung."
    },
    {
      frage: PRICING_TEXTS.whyAffordable,
      // FAST REFRESH FIX: Hardcoded statt Template Literal um Fast Refresh Loops zu vermeiden
      antwort: "Wir möchten möglichst vielen Pferdebesitzern helfen, unseren Service kennenzulernen. Später liegt der reguläre Preis bei 39,90€."
    },
    {
      frage: "Erhalte ich eine Geld-zurück-Garantie?",
      antwort: "Ja, absolut! Falls du nicht zufrieden bist, erstatten wir dir den vollen Betrag zurück. Kein Risiko für dich."
    },
    {
      frage: "Welche Zahlungsmethoden werden akzeptiert?",
      antwort: "Wir akzeptieren Kreditkarte, Klarna, PayPal sowie für Kunden aus Österreich zusätzlich EPS (Electronic Payment Standard). Die Zahlung erfolgt sicher über Stripe."
    }
];

// FAST REFRESH FIX: Pre-compute FAQ schema at module level
// The .map() in JSX creates new objects causing infinite Fast Refresh loops
const FAQ_SCHEMA_ENTITIES = faqItems.map(item => ({
  "@type": "Question",
  "name": item.frage,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": item.antwort
  }
}));

// FAST REFRESH FIX: Define all icons at module level to prevent recreation
const clockIcon = <Clock className="w-4 h-4 text-brand-brown" />;
const shieldIcon = <Shield className="w-4 h-4 text-brand-brown" />;
const awardIcon = <Award className="w-4 h-4 text-brand-brown" />;
const arrowRightIcon = <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />;

// Icons for "Pferd kaufen Preis" section
const trendingUpIconLarge = <TrendingUp className="w-8 h-8 text-blue-600" />;
const shieldIconLarge = <Shield className="w-8 h-8 text-green-600" />;
const checkCircleIconLarge = <CheckCircle className="w-8 h-8 text-brand-brown" />;

// FAST REFRESH FIX: Don't store JSX arrays at module level
// Stars will be rendered inline in component instead

// FAST REFRESH FIX: Pre-define icons at module level
const usersIcon = <Users className="w-4 h-4 text-brand-brown" />;
const instagramIcon = <Instagram className="w-5 h-5" />;

export default function PferdeWertHomepage() {
  // AT-Rollout: SEO with hreflang tags
  const { canonical, hreflangTags, ogLocale } = useSEO();

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Was ist mein Pferd wert? KI-Pferdebewertung | PferdeWert.de</title>
        <meta
          name="description"
          content="Wie viel ist mein Pferd wert? Professionelle KI-Pferdebewertung basierend auf aktuellen Marktdaten. Präzise Marktwert-Einschätzung in 2 Minuten."
        />
        <meta name="keywords" content="pferde preis berechnen, pferdewert ermitteln, pferdebewertung online, pferdepreise, was ist mein pferd wert, pferd preis, pferdemarkt preise, pferde bewertung" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="PferdeWert.de" />

        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="DE" />
        <meta name="geo.country" content="Deutschland" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="ICBM" content="51.0, 9.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PferdeWert" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:url" content="https://pferdewert.de/" />
        <meta property="og:title" content="Was ist mein Pferd wert? KI-Pferdebewertung | PferdeWert.de" />
        <meta property="og:description" content="Wie viel ist mein Pferd wert? Professionelle KI-Pferdebewertung basierend auf aktuellen Marktdaten. Präzise Marktwert-Einschätzung in 2 Minuten." />
        <meta property="og:image" content="https://pferdewert.de/images/shared/blossi-shooting.webp" />
        <meta property="og:image:alt" content="Pferdepreis berechnen - KI-basierte Pferdebewertung von PferdeWert" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Was ist mein Pferd wert? ✓ KI-Pferdebewertung | PferdeWert.de" />
        <meta name="twitter:description" content="Wie viel ist mein Pferd wert? Professionelle KI-Pferdebewertung basierend auf aktuellen Marktdaten. Präzise Marktwert-Einschätzung in 2 Minuten." />
        <meta name="twitter:image" content="https://pferdewert.de/images/shared/blossi-shooting.webp" />
        <meta name="twitter:image:alt" content="Pferdepreis berechnen - KI-basierte Pferdebewertung von PferdeWert" />

        {/* Canonical and Hreflang - AT Rollout */}
        <link rel="canonical" href={canonical} />
        {hreflangTags.map(tag => (
          <link key={tag.hreflang} rel="alternate" hrefLang={tag.hreflang} href={tag.href} />
        ))}

        {/* Google Fonts jetzt self-hosted via @fontsource - Performance Optimierung */}
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />
        
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
              "name": "PferdeWert.de",
              "alternateName": "PferdeWert",
              "url": "https://pferdewert.de/",
              "description": "Pferdepreis berechnen und ermitteln: Deutschlands führende Plattform für professionelle KI-basierte Online Pferdebewertung mit präziser Pferdepreis Berechnung",
              "publisher": {
                "@type": "Organization",
                "name": "PferdeWert.de",
                "url": "https://pferdewert.de",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://pferdewert.de/images/logo.webp"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://pferdewert.de/pferde-preis-berechnen?query={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "Service",
                "name": "Pferdepreis berechnen",
                "description": "Online Pferdebewertung mit KI-gestützter Pferdepreis Berechnung",
                "serviceType": "Pferdebewertung"
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
              "mainEntity": FAQ_SCHEMA_ENTITIES
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
              "name": "PferdeWert.de",
              "alternateName": "PferdeWert",
              "description": "Pferdepreis berechnen: Deutschlands führende Plattform für professionelle KI-basierte Online Pferdebewertung mit präziser Pferdepreis Berechnung",
              "url": "https://pferdewert.de",
              "logo": "https://pferdewert.de/images/logo.webp",
              "image": "https://pferdewert.de/images/shared/blossi-shooting.webp",
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
                "name": "Pferdepreis Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pferdepreis berechnen",
                      "description": "Online Pferdebewertung mit KI-gestützter Pferdepreis Berechnung für faire Marktpreise. Ermitteln Sie den Wert Ihres Pferdes in 2 Minuten.",
                      "provider": {
                        "@type": "Organization",
                        "name": "PferdeWert.de"
                      },
                      "category": "Pferdebewertung",
                      "areaServed": {
                        "@type": "Country",
                        "name": "Deutschland"
                      }
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
        <HeroSection
          badge="🏆 #1 Online Pferdebewertung"
          headline="Wie viel ist mein Pferd wert?"
          highlightedWord="Pferd wert"
          image="/images/shared/blossi-shooting.webp"
          imageAlt="Unser Pferd Blossom beim Photoshooting - Professionelle Pferdebewertung Beispiel"
          imageWidth={600}
          imageHeight={600}
          sectionId="bewertung"
          useContainer={true}
          showImageGradient={true}
          imageClassName="relative rounded-3xl shadow-2xl object-cover"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvND+0532KzGVhZQAAAAD//Z"
        >
          <p className="text-xl text-gray-600 leading-relaxed">
            Erfahre den Marktwert deines Pferdes mit unserer professionellen KI-Pferdebewertung.
            Entwickelt von Reitern für Reiter – präzise Analyse in nur 2 Minuten.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              {clockIcon}
              <span>In 2 Minuten</span>
            </div>
            <div className="flex items-center space-x-2">
              {shieldIcon}
              <span>Kein Abo</span>
            </div>
            <div className="flex items-center space-x-2">
              {awardIcon}
              <span>Geld-zurück-Garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              {usersIcon}
              <span>100+ erfolgreiche Bewertungen</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="btn-primary group text-lg px-8 py-4"
            >
              Jetzt Pferdewert berechnen
              {arrowRightIcon}
            </LocalizedLink>
            <LocalizedLink
              href="/beispiel-analyse"
              className="btn-secondary text-lg px-8 py-4"
            >
              Beispielanalyse ansehen
            </LocalizedLink>
          </div>
        </HeroSection>

        {/* Special Offer Banner */}
        <section id="preise" className="bg-gradient-to-r from-brand-gold/20 to-brand-brown/20 border-y border-brand-brown/20">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold text-brand-brown">🎯 Professionelle Pferdebewertung:</span> Nur{" "}
                <span className="font-bold text-2xl text-brand-brown">{PRICING_FORMATTED.current}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Keine versteckten Kosten • Einmalzahlung • Direkt online starten
              </p>
            </div>
          </div>
        </section>

{/* CTA Section direkt darunter */}
<section className="py-12 px-4">
  <div className="container mx-auto text-center">
    <LocalizedLink
      href="/pferde-preis-berechnen"
      className="btn-primary px-8 py-4 text-lg"
    >
      Jetzt Pferdewert berechnen
    </LocalizedLink>

    <p className="text-sm text-gray-600 mt-4">
      Sichere Bezahlung • Sofortiges Ergebnis • Keine Abos
    </p>
  </div>
</section>

{/* Instagram Section */}
<section className="py-12 bg-brand-light/50">
  <div className="container mx-auto px-4">
    <div className="max-w-xl mx-auto">
      <a
        href="https://www.instagram.com/pferdewert.de/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-brand-gold"
      >
        {/* Header mit Logo und Info */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-brown to-brand-brownDark flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            {instagramIcon}
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-gray-900 group-hover:text-brand-brown transition-colors">
              @pferdewert.de
            </p>
            <p className="text-sm text-gray-500">
              4.000+ Follower · Reiter-Community
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 bg-brand-brown text-white text-sm font-semibold px-4 py-2 rounded-lg group-hover:bg-brand-brownDark transition-colors">
            Folgen
          </span>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
            <Image
              src="/images/instagram/post-1.webp"
              alt="PferdeWert Instagram - Pferd mit Abschwitzdecke"
              fill
              sizes="(max-width: 640px) 33vw, 150px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
            <Image
              src="/images/instagram/post-2.webp"
              alt="PferdeWert Instagram - Pferd mit Turnierschleife"
              fill
              sizes="(max-width: 640px) 33vw, 150px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
            <Image
              src="/images/instagram/post-3.webp"
              alt="PferdeWert Instagram - Dressurreiten"
              fill
              sizes="(max-width: 640px) 33vw, 150px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center">
          <span className="inline-flex items-center gap-2 bg-brand-brown text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
            Auf Instagram folgen
          </span>
        </div>
      </a>
    </div>
  </div>
</section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Pferd kaufen Preis Section - High-value keyword targeting */}
        <section id="pferd-kaufen-preis" className="section bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                Pferd kaufen, Preis richtig einschätzen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vermeide Fehlkäufe und Überzahlung – mit unserer KI-Pferdebewertung online erhältst du transparente Marktpreise vor dem Pferdekauf
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {trendingUpIconLarge}
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Aktuelle Marktpreise</h3>
                <p className="text-gray-600">
                  Realistische Pferdepreis-Daten basierend auf über 50.000 Verkaufsdaten aus Deutschland
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {shieldIconLarge}
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Schutz vor Überzahlung</h3>
                <p className="text-gray-600">
                  Unsere objektive Pferdebewertung hilft dir, faire Pferde-Preise zu erkennen
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  {checkCircleIconLarge}
                </div>
                <h3 className="text-h3 font-bold text-gray-900 mb-3">Verhandlung richtig vorbereiten</h3>
                <p className="text-gray-600">
                  Mit fundierter Pferdebewertung optimal auf Preisverhandlungen beim Pferdekauf vorbereitet
                </p>
              </div>
            </div>

            <div className="text-center">
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4"
              >
                Jetzt Pferdewert berechnen
              </LocalizedLink>
            </div>
          </div>
        </section>

        {/* Features Section - Lazy loaded for better performance */}
        <FeaturesSection />

        {/* FAQ Section */}
        <section className="section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">Häufige Fragen</h2>
              <p className="text-xl text-gray-600">
                Alles was du über PferdeWert wissen möchtest
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
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4"
              >
                Jetzt Pferdewert berechnen
              </LocalizedLink>
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
                Ob Pferdepreis ermitteln, Verkauf oder einfach aus Neugier – unsere KI-Bewertung unterstützt dich bei allen Entscheidungen rund um deinen Pferdewert
              </p>
            </div>

            {/* Central Service Hub */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-brand-brown/20 max-w-2xl mx-auto">
                <h3 className="text-h3 font-bold text-gray-900 mb-4">
                  💡 Neugierig auf den aktuellen Marktwert deines Pferdes?
                </h3>
                <p className="text-gray-600 mb-6">
                  Erfahre mit unserer <LocalizedLink href="/pferde-preis-berechnen" className="text-brand-brown underline hover:text-brand-brownDark">professionellen Pferdebewertung</LocalizedLink> den aktuellen Pferdepreis –
                  egal ob aus Neugier, für den Kauf oder Verkauf eines Pferdes.
                </p>
                <LocalizedLink
                  href="/pferde-preis-berechnen"
                  className="inline-flex items-center gap-2 bg-brand-brown text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-brownDark transition-colors"
                >
                  Was ist mein Pferd wert?
                </LocalizedLink>
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
                Starte jetzt und erhalte in wenigen Minuten eine detaillierte Pferdebewertung.
              </p>
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold bg-white text-brand-brown hover:bg-brand-light transition-colors rounded-xl shadow-lg"
              >
                Jetzt Pferdewert berechnen
              </LocalizedLink>
              <p className="text-sm text-brand-light/80 mt-4">

              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
