// frontend/pages/index.tsx

import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, CheckCircle, Lock, Zap } from "lucide-react";

export default function Home() {
  const faqs: [string, string][] = [
    [
      "Was kostet eine Bewertung?",
      "Aktuell bieten wir die Analyse für nur 9,90 € statt 39 € an – ohne Abo, ohne versteckte Gebühren."
    ],
    [
      "Wie lange dauert die Analyse?",
      "Direkt nach der Bezahlung erhältst du deine PferdeWert-Analyse – die Auswertung dauert weniger als 2 Minuten."
    ],
    [
      "Was passiert mit meinen Daten?",
      "Wir wahren deine Privatsphäre: Deine Daten bleiben anonym und werden nicht an Dritte weitergegeben."
    ],
    [
      "Für wen ist die Bewertung geeignet?",
      "Die Bewertung eignet sich für dich, egal ob du dein Pferd verkaufen möchtest, ein Pferd kaufen willst oder einfach nur neugierig auf den Wert bist – in jedem Fall erhältst du eine fundierte, objektive Preiseinschätzung."
    ]
  ];

  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    // Sanftes Einblenden des Hero-Bilds nach erstem Render
    const timer = setTimeout(() => setImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <>
        <Head>
          <title>Pferd verkaufen & kaufen: Marktwert berechnen | Pferde Preis ermitteln | PferdeWert.de</title>
          <meta
            name="description"
            content="Pferd verkaufen oder kaufen? Marktwert berechnen mit KI ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min Analyse als PDF"
          />
          <meta property="og:title" content="Pferd verkaufen & kaufen: Marktwert mit KI berechnen | PferdeWert" />
          <meta property="og:description" content="Pferd verkaufen oder kaufen? Marktwert berechnen mit KI ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min Analyse als PDF" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pferdewert.de/" />
          <meta property="og:image" content="https://pferdewert.de/images/hero.webp" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pferd verkaufen & kaufen: Marktwert mit KI berechnen" />
          <meta name="twitter:description" content="Marktwert berechnen ✓ Faire Preise erkennen ✓ Überzahlung vermeiden ✓ 2 Min KI-Analyse" />
          <meta name="twitter:image" content="https://pferdewert.de/images/hero.webp" />

          {/* Structured Data für SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "PferdeWert",
                "url": "https://pferdewert.de/",
                "description": "Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF.",
                "publisher": {
                  "@type": "Organization",
                  "name": "PferdeWert"
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Was kostet eine Bewertung?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Aktuell bieten wir die Analyse für nur 9,90 € statt 39 € an – ohne Abo, ohne versteckte Gebühren."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Wie lange dauert die Analyse?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Direkt nach der Bezahlung erhältst du deine PferdeWert-Analyse – die Auswertung dauert weniger als 2 Minuten."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Was passiert mit meinen Daten?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Wir wahren deine Privatsphäre: Deine Daten bleiben anonym und werden nicht an Dritte weitergegeben."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Für wen ist die Bewertung geeignet?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Die Bewertung eignet sich für dich, egal ob du dein Pferd verkaufen möchtest, ein Pferd kaufen willst oder einfach nur neugierig auf den Wert bist – in jedem Fall erhältst du eine fundierte, objektive Preiseinschätzung."
                    }
                  }
                ]
              })
            }}
          />
          <link rel="canonical" href="https://pferdewert.de/" />
        </Head>

        {/* Hero-Bereich */}
        <section id="bewertung" className="bg-[#fdf9f4] py-16 px-6 scroll-mt-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-y-10 md:gap-10 items-center">
            {/* Hero-Bild mit sanftem Einblenden */}
            <div className="order-1 md:order-1">
              <div className={`transition-all duration-700 ${imageLoaded ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}>
                <Image
                  src="/images/hero-horse.webp"
                  width={700}
                  height={500}
                  alt="Pferd Blossom – professionelle Bewertung"
                  className="rounded-xl shadow-md w-full h-auto"
                />
              </div>
            </div>
            {/* Hero-Textblock */}
            <div className="order-2 md:order-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Was ist dein Pferd wirklich wert?
              </h1>
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700">
                  <strong className="text-amber-700">Pferd verkaufen?</strong> Finde den optimalen Verkaufspreis und verkaufe schneller.
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-blue-700">Pferd kaufen?</strong> Erkenne faire Preise und verhandle selbstbewusst.
                </p>
                <p className="text-base text-gray-600">
                  KI-basierte Profi-Bewertung in 2 Minuten &bull; Anonym &bull; Sofort als PDF
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/pferde-preis-berechnen" className="btn-primary">
                  Jetzt Pferdewert berechnen
                </Link>
                <Link href="/beispiel-analyse" className="btn-secondary">
                  Beispielanalyse ansehen
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                <strong>In&nbsp;2&nbsp;Minuten</strong>&nbsp;&bull; kein&nbsp;Abo&nbsp;&bull; Geld-zurück-Garantie&nbsp;&bull; <strong>4,7/5&nbsp;⭐</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Preisangebot-Banner */}
        <section id="preise" className="bg-white py-16 px-6 text-center scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                💥 Schnell sein lohnt sich: Nur <span className="text-red-600 font-bold text-xl">9,90 €</span>
                <span className="line-through text-gray-500 text-sm ml-2">statt 39 €</span> – für die ersten 100 Bewertungen!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Keine versteckten Kosten &bull; Einmalzahlung &bull; Direkt online starten
              </p>
            </div>
            <Link href="/pferde-preis-berechnen" className="btn-primary mt-6">
              Jetzt 9,90 €‑Analyse starten
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              Aktion gültig für die ersten 100 Analysen – danach regulärer Preis von 39 €.
            </p>
            <p className="mt-6 text-base font-semibold text-gray-700 italic">
              Von Reitern für Reiter entwickelt
            </p>
          </div>
        </section>

        {/* Vorteile / Warum PferdeWert vertrauen */}
        <section id="vorteile" className="bg-[#fdf9f4] py-16 px-6 scroll-mt-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Warum PferdeWert vertrauen?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vorteil 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Präzise KI-Analyse</h3>
                <p className="text-gray-600 leading-relaxed">
                  Basiert auf tausenden echten<br />
                  Markttransaktionen und Expertenwissen
                </p>
              </div>
              {/* Vorteil 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">100% Datenschutz</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deine Daten bleiben anonym und werden<br />
                  nicht weitergegeben
                </p>
              </div>
              {/* Vorteil 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sofort verfügbar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Analyse in unter 2 Minuten – kein Warten,<br />
                  keine Termine
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ablauf: So einfach geht’s */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-amber-800 mb-12">So einfach geht&rsquo;s</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Schritt 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pferdedetails eingeben</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rasse, Alter, Ausbildungsstand,<br />
                  Gesundheit und weitere wichtige<br />
                  Informationen.
                </p>
              </div>
              {/* Schritt 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Bezahlvorgang abschließen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sicher und verschlüsselt bezahlen –<br />
                  mit Stripe, dem Zahlungsstandard für<br />
                  über 4 Millionen Unternehmen.
                </p>
              </div>
              {/* Schritt 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ergebnis in 2 Minuten</h3>
                <p className="text-gray-600 leading-relaxed">
                  Detaillierte PDF-Analyse mit Marktwert,<br />
                  Begründung und Abstammungsanalyse.
                </p>
              </div>
            </div>
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/pferde-preis-berechnen" className="btn-primary">
                Jetzt Pferdewert berechnen
              </Link>
              <Link href="/beispiel-analyse" className="btn-secondary">
                Beispielanalyse ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials: Das sagen unsere Kunden */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Das sagen unsere Kunden</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative">
                <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">&quot;</div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  &quot;Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen eine Einschätzung zu bekommen und ich konnte mein Pferd auch zu dem empfohlenen Preis verkaufen!&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  – Sarah M., Freizeitreiterin
                </cite>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative">
                <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">&quot;</div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  &quot;Vor dem Pferdekauf wollte ich wissen, ob der angegebene Preis fair ist. Die PferdeWert-Analyse war sehr detailliert und hat mir bei der Preisverhandlung sehr geholfen.&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  – Michael K., Hobbyreiter
                </cite>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative md:col-span-2 lg:col-span-1">
                <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">&quot;</div>
                <div className="flex mb-4 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
                  &quot;Ich besitze ein Pferd und wollte einfach nur aus Neugier den aktuellen Marktwert wissen. Super interessant, was PferdeWert als Ergebnis bereitstellt – vor allem die Analyse der Abstammung fand ich sehr spannend!&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
                  – Anna L., Pferdebesitzerin
                </cite>
              </div>
            </div>
            {/* Abschluss-CTA unter Testimonials */}
            <div className="text-center">
              <Link href="/pferde-preis-berechnen" className="btn-primary">
                Jetzt Pferdewert berechnen
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Sektion */}
        <main className="bg-white px-4 py-6 sm:px-6 lg:px-8">
          <section className="pt-16 pb-20 bg-white">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-center text-2xl sm:text-3xl font-serif text-gray-900 font-bold">Häufige Fragen</h2>
              <div className="mt-12 space-y-6">
                {faqs.map(([question, answer], idx) => (
                  <details key={idx} className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                    <summary className="cursor-pointer select-none text-lg font-semibold text-gray-800">
                      {question}
                    </summary>
                    <p className="mt-2 text-gray-700">{answer}</p>
                  </details>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/pferde-preis-berechnen" className="btn-primary">
                  Jetzt Pferdewert berechnen
                </Link>
              </div>
            </div>
          </section>
        </main>
      </>
    </Layout>
  );
}
