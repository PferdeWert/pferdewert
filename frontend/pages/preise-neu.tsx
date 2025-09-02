/**
 * Preise-Neu Page - 3-Tier Pricing Display
 * 
 * Mobile-first pricing page with carousel implementation and standard tier highlighting.
 * Uses existing components with brand-brown design system.
 * 
 * @author PferdeWert.de
 * @version 1.0.0 - Initial 3-Tier Implementation
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import PricingDisplay from '@/components/pricing/PricingDisplay';
import { info } from '@/lib/log';

export default function PreiseNeuPage() {
  const router = useRouter();

  const handleTierSelect = (data: { tier: string; price: number; stripeId: string; displayName: string }) => {
    
    info('Preise-Neu: Tier selected', { 
      tier: data.tier, 
      price: data.price,
      displayName: data.displayName 
    });

    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pricing_tier_selected', {
        tier_name: data.tier,
        tier_price: data.price,
        currency: 'EUR',
        page_location: '/preise-neu'
      });
    }

    // Redirect to evaluation form with selected tier
    router.push(`/bewertung?tier=${data.tier}`);
  };

  return (
    <>
      <Head>
        <title>Pferdebewertung Preise - PferdeWert.de | KI-gestützte Pferdebewertung</title>
        <meta 
          name="description" 
          content="Transparente Preise für professionelle Pferdebewertung. Wähle Deine Pferdebewertung: Basic (14,90€), Professional (19,90€) oder Premium (39,90€). KI-Analyse mit sofortiger Bewertung und detailliertem PDF-Report." 
        />
        <meta name="keywords" content="Pferdebewertung, Pferd bewerten lassen, Pferdewert ermitteln, AI Pferdebewertung, Pferdemarkt, Preise" />
        <meta property="og:title" content="Pferdebewertung Preise - PferdeWert.de" />
        <meta property="og:description" content="Wähle die perfekte Pferdebewertung für deine Bedürfnisse. Von schneller Preisspanne bis hin zur AI-Vision Analyse." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/preise-neu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://pferdewert.de/preise-neu" />
        
        {/* Schema.org Markup for Pricing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PferdeWert.de Bewertung",
              "description": "AI-gestützte Pferdebewertung mit detailliertem PDF-Report",
              "brand": {
                "@type": "Brand",
                "name": "PferdeWert.de"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "PferdeWert Express",
                  "price": "14.90",
                  "priceCurrency": "EUR",
                  "description": "Schnelle Preisspanne ohne detaillierte Analyse"
                },
                {
                  "@type": "Offer", 
                  "name": "PferdeWert Professional",
                  "price": "19.90",
                  "priceCurrency": "EUR",
                  "description": "Detaillierte KI-Analyse mit ausführlichem Seiten PDF-Report"
                },
                {
                  "@type": "Offer",
                  "name": "PferdeWert KI-Vision",
                  "price": "39.90", 
                  "priceCurrency": "EUR",
                  "description": "Premium KI-Vision mit Foto-Analyse"
                }
              ]
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-gray-100/10">
          <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transparente Preise für
                <span className="block text-brand-brown">deine Pferdebewertung</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Von der schnellen Marktpreis-Schätzung bis zur Premium KI-Foto Analyse – 
              wähle die Bewertung, die zu deinen Bedürfnissen passt.
              </p>
              
              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">KI-gestützte Analyse</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">Sofortiges Ergebnis</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">30 Tage Geld-zurück-Garantie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <PricingDisplay
              onTierSelect={handleTierSelect}
            />
          </div>
        </section>

        {/* Trust Signals & Benefits */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Geld-zurück-Garantie</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nicht zufrieden? Geld zurück innerhalb von 30 Tagen - ohne Wenn und Aber
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sofortiger Zugang</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bewertung startet sofort nach der Zahlung - kein Warten, sofort loslegen und Ergebnis erhalten.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professionelle Analyse</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bewährt bei über 100 Pferdebewertungen - Expertise, der du vertrauen kannst
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Häufig gestellte Fragen
              </h2>
              
              <div className="space-y-6">
                <details className="bg-brand-light/50 rounded-2xl border border-gray-200 p-6">
                  <summary className="cursor-pointer text-lg font-semibold text-brand hover:text-brand-brown transition-colors">
                    Wie schnell erhalte ich meine Bewertung?
                  </summary>
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                      Basic: unter 1 Minute, Standard: 2-3 Minuten, Premium: 5-10 Minuten. 
                      Die Bewertung startet sofort nach deiner Zahlung.
                    </p>
                  </div>
                </details>

                <details className="bg-brand-light/50 rounded-2xl border border-gray-200 p-6">
                  <summary className="cursor-pointer text-lg font-semibold text-brand hover:text-brand-brown transition-colors">
                    Was ist der Unterschied zwischen den Tarifen?
                  </summary>
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                      Basic gibt eine schnelle Preisspanne, Pro bietet detaillierte AI-Analyse mit PDF-Report, 
                      Premium enthält zusätzlich Foto-Analyse mit AI-Vision und ausführlichen Premium-Report.
                    </p>
                  </div>
                </details>

                <details className="bg-brand-light/50 rounded-2xl border border-gray-200 p-6">
                  <summary className="cursor-pointer text-lg font-semibold text-brand hover:text-brand-brown transition-colors">
                    Wie funktioniert die Geld-zurück-Garantie?
                  </summary>
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                      Wenn du nicht zufrieden bist, kannst du innerhalb von 30 Tagen dein Geld zu 100% zurückfordern - ohne Angabe von Gründen.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-20 bg-brand-brown text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für die Bewertung deines Pferdes?
            </h2>
            <p className="text-xl mb-8 text-brand-brown-100 max-w-2xl mx-auto">
              Wähle deinen Tarif und starte sofort mit der professionellen KI-Analyse
            </p>
            <button
              onClick={() => document.querySelector('[data-analytics-component="pricing-carousel"]')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center bg-white text-brand-brown px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
            >
              Jetzt Tarif wählen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}