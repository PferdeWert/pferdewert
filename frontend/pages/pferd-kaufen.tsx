// pages/pferd-kaufen.tsx
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, AlertTriangle, Calculator, Shield, TrendingUp, Users } from "lucide-react";
import { PRICING_FORMATTED, PRICING_TEXTS } from "../lib/pricing";

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
        <title>Pferd kaufen: Faire Preise erkennen & günstig verhandeln | PferdeWert</title>
        <meta
         name="description"
         content="Pferd kaufen deutschlandweit - KI-Preischeck für 14,90€ - Faire Preise erkennen und gezielt verhandeln - Keine Überzahlung beim Pferdekauf"
        />
         <meta
         name="keywords"
         content="pferd kaufen bayern, pferd kaufen nrw, pferd kaufen baden württemberg, pferdekauf deutschland, faire preise, verhandlungshilfe, pferd kaufen preis"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Pferd kaufen Bayern NRW: Preis prüfen & günstig verhandeln | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen? Nutze den Pferdepreis-Rechner und finde faire Angebote in NRW, Bayern & deutschlandweit ✓ Keine Überzahlung ✓ Sofort-Analyse in 2 Min" />
         <meta property="og:type" content="website" />
         <meta property="og:url" content="https://pferdewert.de/pferd-kaufen" />
         <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-hero.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content="Pferd kaufen – Preis prüfen & günstig verhandeln | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen? Nutze den Pferdepreis-Rechner und finde faire Angebote in NRW, Bayern & deutschlandweit ✓ Keine Überzahlung ✓ Sofort-Analyse in 2 Min" />
         <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-hero.webp" />
         
          {/* Structured Data für SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Pferd kaufen: Faire Preise erkennen",
                "description": "Erkenne faire Preise mit KI-Bewertung und vermeide Überzahlung beim Pferdekauf",
                "url": "https://pferdewert.de/pferd-kaufen",
                "mainEntity": {
                  "@type": "Service", 
                  "name": "Pferdebewertung für Käufer",
                  "provider": {
                    "@type": "Organization",
                    "name": "PferdeWert"
                  }
                }
              })
            }}
          />
          <link rel="canonical" href="https://pferdewert.de/pferd-kaufen" />
        </Head>

        {/* Hero-Bereich für Käufer */}
        <section className="bg-[#fdf9f4] py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Pferd kaufen: So erkennst du faire Preise
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Warum Preisbewertung beim Pferdekauf?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {kauftipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {tipp.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
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

        {/* So funktioniert's für Käufer */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Häufige Fragen von Pferdekäufern
            </h2>
            
            <div className="space-y-6">
              <details className="rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Kann ich die Bewertung auch für Pferde nutzen, die ich kaufen möchte?</span>
                    <svg className="w-5 h-5 text-gray-600 transform transition-transform duration-200 details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700">
                    Ja, absolut! Gib einfach die Daten des Pferdes ein, das du kaufen möchtest.
                    Du erhältst eine objektive Preisbewertung, die dir bei der Verhandlung hilft.
                  </p>
                </div>
              </details>

              <details className="rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Wie kann mir die Bewertung beim Verhandeln helfen?</span>
                    <svg className="w-5 h-5 text-gray-600 transform transition-transform duration-200 details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700">
                    Die Bewertung zeigt dir eine realistische Preisspanne basierend auf Marktdaten.
                    So weißt du, ob ein Angebot fair ist und hast Argumente für deine Preisvorstellung.
                  </p>
                </div>
              </details>

              <details className="rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Wann sollte ich eine Bewertung machen lassen?</span>
                    <svg className="w-5 h-5 text-gray-600 transform transition-transform duration-200 details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700">
                    Am besten vor der ersten Besichtigung. So gehst du informiert zum Verkäufer
                    und kannst gezielt nachfragen, falls der Preis nicht zum Marktwert passt.
                  </p>
                </div>
              </details>

              <details className="rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="text-lg font-semibold text-gray-800 p-6 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span>Was ist, wenn der Verkäufer deutlich mehr verlangt?</span>
                    <svg className="w-5 h-5 text-gray-600 transform transition-transform duration-200 details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700">
                    Das kann verschiedene Gründe haben: Besondere Qualitäten, emotionaler Wert oder unrealistische Preisvorstellung.
                    Die Bewertung hilft dir zu entscheiden, ob der Aufpreis gerechtfertigt ist.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

{/* Regional & Rassen SEO Section */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pferd kaufen in deiner Region
            </h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              Ob Warmblut in Bayern, Friese in NRW oder Tinker in Niedersachsen – 
              unsere KI-Bewertung kennt regionale Preisunterschiede und Rassenbesonderheiten. 
              So kaufst du deutschlandweit zum fairen Preis.
            </p>
            
            {/* Bundesländer Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pferdekauf in allen Bundesländern</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {[
                  "NRW", "Bayern", "Niedersachsen", "Baden-Württemberg", "Hessen", 
                  "Sachsen", "Thüringen", "Brandenburg", "Schleswig-Holstein", 
                  "Sachsen-Anhalt", "Saarland", "Mecklenburg-Vorpommern", "Berlin", "Hamburg", "Bremen"
                ].map(bundesland => (
                  <div key={bundesland} className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                    <span className="font-medium">Pferd kaufen {bundesland}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rassen Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Beliebte Pferderassen richtig bewerten</h3>
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
            <h2 className="text-3xl font-bold text-white mb-6">
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
