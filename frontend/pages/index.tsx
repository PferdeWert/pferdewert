// pages/index-tiered.tsx - Test implementation of 3-tier homepage design
// Based on wireframe: .3-tier-pricing/homepage-wireframe.md
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HomepageReviewSchema } from "@/components/PferdeWertReviewSchema";
import { Clock, Shield, Award, Star, ArrowRight, TrendingUp, CheckCircle, Instagram, Zap, Eye, Camera } from "lucide-react";
import { TIER_PRICES, formatPrice } from "../lib/pricing";

// Consistent bullet point component for better alignment
const BulletPoint = ({ icon: Icon, children, className = "" }: { 
  icon: React.ComponentType<{ className?: string }>, 
  children: React.ReactNode,
  className?: string 
}) => (
  <div className={`flex items-start text-sm leading-5 ${className}`}>
    <div className="flex-shrink-0 w-4 h-4 mt-0.5 mr-3 flex items-center justify-center">
      <Icon className="w-4 h-4 text-brand-brown" />
    </div>
    <span className="flex-1">{children}</span>
  </div>
);

// TypeScript interfaces for testimonials with tier indicators
interface RealTestimonial {
  name: string;
  location: string;
  role: string;
  photo: string;
  instagramHandle?: string;
  quote: string;
  verifiedDate: string;
  rating: number;
  tier?: 'basic' | 'pro' | 'premium'; // NEW: Tier indicator
}

export default function TieredPferdeWertHomepage() {
  // Testimonials data - original from index.tsx
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

  // Enhanced FAQ with tier-specific questions
  const faqItems = [
    {
      frage: "Welche Bewertung passt zu mir?",
      antwort: "Basic (€14,90) für schnelle Marktwert-Einschätzung, Pro (€19,90) für detaillierte Analyse mit Auswertung, Premium (€39,90) für umfassende Bewertung mit professioneller Foto-Analyse."
    },
    {
      frage: "Was ist der Unterschied zwischen den Bewertungen?",
      antwort: "Basic: Schnelle Marktpreis-Einschätzung in 1-2 Min. Pro: Detaillierte Analyse mit Begründung in 2-3 Min. Premium: Umfassende Bewertung mit Exterior-Analyse bis zu 24h."
    },
    {
      frage: "Kann ich später upgraden?",
      antwort: "Ja, du kannst jederzeit auf Pro oder Premium upgraden und zahlst nur die Differenz. Deine bereits eingegebenen Daten werden dabei übernommen."
    },
    {
      frage: "Was ist mein Pferd wert?",
      antwort: "Unser KI-Modell analysiert Verkaufsdaten, Rasse, Alter, Ausbildung, Gesundheitsstatus und mehr – so erhältst du eine realistische Preisspanne für dein Pferd, sofort und ohne Anmeldung."
    },
    {
      frage: "Wie funktioniert die KI-basierte Bewertung?",
      antwort: "Unsere KI analysiert über 50.000 Verkaufsdaten, berücksichtigt Rasse, Alter, Ausbildungsstand, Gesundheit und aktuelle Markttrends für eine präzise Bewertung."
    },
    {
      frage: "Erhalte ich eine Geld-zurück-Garantie?",
      antwort: "Ja, absolut! Falls du nicht zufrieden bist, erstatten wir dir den vollen Betrag zurück. Kein Risiko für dich."
    }
  ];

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Was ist mein Pferd wert? KI‑Pferdebewertung | PferdeWert</title>
        <meta
          name="description"
          content="Marktwert deines Pferdes online berechnen – 3 Bewertungsarten zur Auswahl. Basic €14,90, Pro €19,90, Premium €39,90. KI‑Ergebnis in 2 Minuten."
        />
        <meta property="og:title" content="Was ist mein Pferd wert? KI‑Pferdebewertung | PferdeWert" />
        <meta property="og:description" content="Pferdewert online berechnen – 3 Bewertungsarten zur Auswahl. Basic, Pro oder Premium. KI‑gestützte Bewertung für Kauf oder Verkauf." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/" />
        <meta property="og:image" content="https://pferdewert.de/images/og-home-1200x630.jpg" />
        <link rel="canonical" href="https://pferdewert.de/" />
        
        {/* Critical CSS for above-the-fold content */}
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
            .tier-badge{font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:0.5rem;font-weight:600;text-transform:uppercase}
            .tier-basic{background-color:#e5e7eb;color:#374151}
            .tier-pro{background-color:#fbbf24;color:#92400e}
            .tier-premium{background-color:#8B4513;color:#fff}
          `
        }} />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PferdeWert",
              "url": "https://pferdewert.de/",
              "description": "Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung mit 3 Bewertungsarten",
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

        {/* Review Schema for Trust Signals */}
        <HomepageReviewSchema />
      </Head>

      <main className="min-h-screen">

        {/* Hero Section - Enhanced with tier awareness */}
        <section id="bewertung" className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 hero-fade-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                    🏆 #1 Online Pferdebewertung
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Deutschlands führende Plattform für{" "}
                    <span className="text-brand-brown">Pferdebewertung</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Entwickelt von Reitern für Reiter – präzise, transparent, vertrauenswürdig.
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

                {/* Main CTA to Pricing Page */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/preise"
                    className="btn-primary group text-lg px-8 py-4"
                  >
                    Jetzt Bewertung wählen
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Image */}
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
        </section>

        {/* Enhanced Special Offer Banner with 3-tier introduction */}
        <section id="preise" className="bg-gradient-to-r from-brand-gold/20 to-brand-brown/20 border-y border-brand-brown/20">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-lg">
                <span className="font-semibold text-brand-brown">🎯 3 Bewertungsarten zur Auswahl:</span>
              </p>
              <p className="text-xl font-bold text-brand-brown mt-2">
                Basic {formatPrice(TIER_PRICES.basic)} • Pro {formatPrice(TIER_PRICES.pro)} • Premium {formatPrice(TIER_PRICES.premium)}
              </p>
              <p className="text-base text-gray-700 mt-2">
                Finde die perfekte Analyse für dein Pferd
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Keine versteckten Kosten • Einmalzahlung • Sofort starten
              </p>
            </div>
          </div>
        </section>

        {/* NEW: Tier Preview Section */}
        <section id="tier-selection" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Welche Bewertung passt zu dir?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wähle die passende Bewertung für deine Bedürfnisse – von schneller Markteinschätzung bis zur umfassenden Analyse
              </p>
            </div>

            {/* Simplified Tier Cards for Homepage Preview */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              
              {/* Basic Tier */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-brand-brown/30 transition-colors h-full flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
                    <div className="text-3xl font-bold text-brand-brown">{formatPrice(TIER_PRICES.basic)}</div>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-left flex-1">
                    <BulletPoint icon={Zap}>
                      Schnelle Marktpreis-Einschätzung
                    </BulletPoint>
                    <BulletPoint icon={Clock}>
                      Ergebnis in unter 1 Minute
                    </BulletPoint>
                    <BulletPoint icon={CheckCircle}>
                      Perfekt für schnelle Einschätzung
                    </BulletPoint>
                  </div>
                  
                  <div className="pt-4 mt-auto">
                    <Link href="/beispiel-basic" className="text-sm text-brand-brown hover:underline block mb-4">
                      Basic-Beispiel ansehen
                    </Link>
                    <Link
                      href="/preise#basic"
                      className="w-full btn-secondary py-3 inline-block text-center"
                    >
                      Basic wählen
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pro Tier - Highlighted */}
              <div className="bg-white border-2 border-brand-brown rounded-2xl p-6 text-center relative shadow-xl h-full flex flex-col md:-mt-2 md:mb-2">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-brown text-white px-4 py-1 rounded-full text-sm font-semibold">
                    BELIEBTESTE WAHL
                  </span>
                </div>
                
                <div className="space-y-4 pt-2 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                    <div className="text-3xl font-bold text-brand-brown">{formatPrice(TIER_PRICES.pro)}</div>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-left flex-1">
                    <BulletPoint icon={CheckCircle}>
                      Alles aus Basic, zusätzlich:
                    </BulletPoint>
                    <BulletPoint icon={TrendingUp}>
                      Detaillierte Pferdebewertung
                    </BulletPoint>
                    <BulletPoint icon={Clock}>
                      Ausführlicher PDF-Report
                    </BulletPoint>
                  </div>
                  
                  <div className="pt-4 mt-auto">
                    <Link href="/beispiel-pro" className="text-sm text-brand-brown hover:underline block mb-4">
                      Pro-Beispiel ansehen
                    </Link>
                    <Link
                      href="/preise#pro"
                      className="w-full btn-primary py-3 inline-block text-center"
                    >
                      Pro wählen
                    </Link>
                  </div>
                </div>
              </div>

              {/* Premium Tier */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-brand-brown/30 transition-colors h-full flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                    <div className="text-3xl font-bold text-brand-brown">{formatPrice(TIER_PRICES.premium)}</div>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-left flex-1">
                    <BulletPoint icon={CheckCircle}>
                      Alles aus Basic und Pro, zusätzlich:
                    </BulletPoint>
                    <BulletPoint icon={Camera}>
                      Bilder-Upload
                    </BulletPoint>
                    <BulletPoint icon={Eye}>
                      Ausführliche Exterieur-Bewertung
                    </BulletPoint>
                  </div>
                  
                  <div className="pt-4 mt-auto">
                    <Link href="/beispiel-premium" className="text-sm text-brand-brown hover:underline block mb-4">
                      Premium-Beispiel ansehen
                    </Link>
                    <Link
                      href="/preise#premium"
                      className="w-full btn-secondary py-3 inline-block text-center"
                    >
                      Premium wählen
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-sm text-gray-600">
                🔒 Sichere Bezahlung • ⚡ Sofortiges Ergebnis • 💰 30-Tage Geld-zurück-Garantie
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section with Tier Indicators */}
        <section className="section bg-brand-light/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
              <p className="text-xl text-gray-600">
                Erfahrungen von Pferdebesitzern mit unseren verschiedenen Bewertungsarten
              </p>
            </div>

            {/* Testimonials with tier badges */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {realTestimonials.map((testimonial, index) => (
                <div key={index} className="flex">
                  <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-brand-brown relative flex flex-col w-full h-auto">
                    
                    {/* Quote mark */}
                    <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                      &quot;
                    </div>
                    
                    {/* Customer info with tier badge */}
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
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          {testimonial.tier && (
                            <span className={`tier-badge tier-${testimonial.tier}`}>
                              {testimonial.tier}
                            </span>
                          )}
                        </div>
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
                    
                    {/* Quote */}
                    <blockquote className="text-gray-700 mb-6 ml-6 leading-relaxed flex-grow text-sm">
                      {testimonial.quote}
                    </blockquote>
                    
                    {/* Instagram link */}
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
              <div className="mb-6">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  Finde deine passende Bewertung
                </p>
              </div>
              
              <Link
                href="/preise"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Zur Bewertungsauswahl
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

        {/* Enhanced Features Section with Tier Organization */}
        <section id="vorteile" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Warum PferdeWert die beste Wahl ist</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professionelle Pferdebewertung basierend auf jahrelanger Expertise und modernster KI-Technologie
              </p>
            </div>

            {/* Universal Benefits (All Tiers) */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">In allen Bewertungsarten enthalten:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Clock className="w-8 h-8 text-brand-brown" />,
                    title: "Blitzschnell",
                    description: "Professionelle Bewertung ohne Wartezeit, ohne Terminvereinbarung.",
                    tier: "Basic+"
                  },
                  {
                    icon: <Shield className="w-8 h-8 text-brand-brown" />,
                    title: "100% Transparent",
                    description: "Nachvollziehbare Bewertungskriterien und detaillierte Erklärung.",
                    tier: "Basic+"
                  },
                  {
                    icon: <Award className="w-8 h-8 text-brand-brown" />,
                    title: "Expertenwissen",
                    description: "Entwickelt von erfahrenen Reitern und Pferdeexperten.",
                    tier: "Basic+"
                  },
                ].map((feature, index) => (
                  <div key={index} className="border-0 shadow-soft hover:shadow-xl transition-shadow duration-300 bg-white rounded-2xl">
                    <div className="p-8 text-center">
                      <div className="bg-brand-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                        <span className="text-xs text-gray-500 ml-2">({feature.tier})</span>
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Benefits */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Erweiterte Features:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8 text-brand-brown" />,
                    title: "Detaillierte Analyse",
                    description: "Umfassende Marktanalyse mit Begründung aller Bewertungsfaktoren.",
                    tier: "Pro+"
                  },
                  {
                    icon: <Camera className="w-8 h-8 text-brand-brown" />,
                    title: "Foto-Analyse",
                    description: "Professionelle Exterior-Bewertung anhand deiner Pferdefotos.",
                    tier: "Nur Premium"
                  },
                  {
                    icon: <CheckCircle className="w-8 h-8 text-brand-brown" />,
                    title: "Geld-zurück-Garantie",
                    description: "Nicht zufrieden? Wir erstatten dir den vollen Betrag zurück.",
                    tier: "Alle Tiers"
                  },
                ].map((feature, index) => (
                  <div key={index} className="border-0 shadow-soft hover:shadow-xl transition-shadow duration-300 bg-white rounded-2xl">
                    <div className="p-8 text-center">
                      <div className="bg-brand-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                        <span className="text-xs text-gray-500 ml-2">({feature.tier})</span>
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Häufige Fragen</h2>
              <p className="text-xl text-gray-600">
                Alles was du über unsere Pferdebewertung wissen möchtest
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
                href="/preise"
                className="btn-primary text-lg px-8 py-4"
              >
                Bewertung auswählen
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Tier Selection */}
        <section className="section bg-gradient-to-r from-brand-brown to-brand-brownDark">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Bereit für deine professionelle Pferdebewertung?
              </h2>
              <p className="text-xl text-brand-light mb-8">
                Wähle die passende Bewertung für deine Bedürfnisse und erhalte sofort eine detaillierte Analyse.
              </p>
              
              {/* Main CTA to Pricing */}
              <div className="mb-8">
                <Link
                  href="/preise"
                  className="bg-white text-brand-brown hover:bg-brand-light border-2 border-white rounded-xl p-6 transition-colors inline-flex flex-col items-center text-lg font-semibold"
                >
                  <div className="text-xl font-bold mb-2">Bewertung wählen</div>
                  <div className="text-base opacity-90">
                    Basic ab {formatPrice(TIER_PRICES.basic)} • Pro ab {formatPrice(TIER_PRICES.pro)} • Premium ab {formatPrice(TIER_PRICES.premium)}
                  </div>
                </Link>
              </div>
              
              <p className="text-sm text-brand-light/80">
                Launch-Angebot – Preise steigen ab März 2025
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
