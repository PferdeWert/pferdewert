// frontend/pages/index.tsx
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, Lock, Zap } from "lucide-react"; // ← HIER: Neue Icons hinzugefügt


export default function Home() {
  const faqs = [
    [
      "Wie genau ist die Bewertung?",
      "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen."
    ],
    [
      "Kostet der Service etwas?",
      "Unsere umfassende Preisanalyse kostet aktuell 9,90 Euro (Einführungspreis), anstatt regulär 39 Euro."
    ],
    [
      "Was passiert mit meinen Daten?",
      "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben."
    ],
    [
      "Wie lange dauert die Analyse?",
      "Unser KI-Modell erstellt deine Analyse sofort nach dem Bezahlvorgang bei Stripe."
    ],
    [
      "Welche Zahlungsmöglichkeiten gibt es?",
      "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay und Klarna möglich."
    ]
  ];

  return (
    <Layout>
      <>
        <Head>
          <title>Pferde Preis berechnen: Was ist mein Pferd wert? | PferdeWert.de</title>
          <meta
            name="description"
            content="Pferde Preis professionell berechnen ✓ Sofort Marktwert ermitteln ✓ Für Freizeitreiter beim Kauf & Verkauf ✓ 2 Min zur Bewertung"
          />
          <meta property="og:title" content="Pferde Preis berechnen mit KI – Was ist dein Pferd wert?" />
          <meta property="og:description" content="Jetzt Pferdebewertung durchführen – schnell, anonym & ohne Anmeldung. Ideal für Verkauf, Kauf oder einfach aus Neugier." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pferdewert.de/" />
          <meta property="og:image" content="https://pferdewert.de/images/hero.webp" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert" />
          <meta name="twitter:description" content="Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF. Ideal zur Vorbereitung auf Pferdekauf oder Verkauf." />
          <meta name="twitter:image" content="https://pferdewert.de/images/hero.webp" />
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
          <link rel="canonical" href="https://pferdewert.de/" />
        </Head>
{/* Hero-Bereich neu (bild oben auf mobil) */}
<section className="bg-[#fdf9f4] py-16 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-y-10 md:gap-10 items-center">
    {/* Bild zuerst – auf Mobilgeräten oben */}
    <div className="order-1 md:order-1">
      <Image
        src="/images/blossi-shooting.webp"
        width={700}
        height={500}
        alt="Deutsches Sportpferd Blossom im Porträt für KI-Pferdebewertung"
        className="rounded-xl shadow-md w-full h-auto"
      />
    </div>

            {/* Textblock */}
              <div className="order-2 md:order-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Was ist Dein Pferd wert?
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                Jetzt <strong>Pferde Preis berechnen</strong> mit KI – ideal für Kauf, Verkauf oder einfach aus Neugier. Professionelle KI-Bewertung in 2 Minuten. Von Reitern entwickelt, für Reiter gemacht.
              </p>
              <Link
                href="/beispiel-analyse"
                className="btn-primary"
              >
                Beispiel einer PferdeWert Analyse
              </Link>
          </div>
          </div>
        </section>

        {/* Preisbanner-Sektion */}
  <section className="bg-white py-16 px-6 text-center">
  <div className="max-w-4xl mx-auto">
    {/* Preisbanner */}
    <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl shadow-md">
      <p className="text-lg font-semibold text-gray-800">
        💥 Schnell sein lohnt sich: Nur <span className="text-red-600 font-bold text-xl">9,90 €</span>
        <span className="line-through text-gray-500 text-sm ml-2">statt 39 €</span> – für die ersten 100 Bewertungen!
      </p>
      <p className="text-sm text-gray-600 mt-1">Keine versteckten Kosten • Einmalzahlung • Direkt online starten</p>
    </div>

    <Link
      href="/pferde-preis-berechnen"
      className="btn-primary mt-6">    
      Jetzt 9,90 €-Analyse starten
    </Link>

    <p className="text-xs text-gray-500 mt-3">
      Aktion gültig für die ersten 100 Analysen – danach regulärer Preis von 39 €.
    </p>

    <p className="mt-6 text-base font-semibold text-gray-700 italic">
      Von Reitern für Reiter entwickelt
    </p>
  </div>
</section>

        {/* Warum PferdeWert vertrauen Sektion */}
<section className="bg-[#fdf9f4] py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-12">
      Warum PferdeWert vertrauen?
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Karte 1: Präzise KI-Analyse */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-pink-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Präzise KI-Analyse
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Basiert auf tausenden echten<br />
          Markttransaktionen und Expertenwissen
        </p>
      </div>

      {/* Karte 2: 100% Datenschutz */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          100% Datenschutz
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Deine Daten bleiben anonym und werden<br />
          nicht weitergegeben
        </p>
      </div>

      {/* Karte 3: Sofort verfügbar */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Sofort verfügbar
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Analyse in unter 2 Minuten - kein Warten,<br />
          keine Termine
        </p>
      </div>
    </div>
  </div>
</section>

        {/* So einfach geht's Sektion */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-amber-800 mb-12">
            So einfach geht&rsquo;s
            </h2>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Schritt 1: Pferdedetails eingeben */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Pferdedetails eingeben
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Rasse, Alter, Ausbildungsstand,<br />
                  Gesundheit und weitere wichtige<br />
                  Informationen.
                </p>
              </div>

              {/* Schritt 2: Bezahlung */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Bezahlvorgang abschließen
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sicher und verschlüsselt bezahlen –<br />
                  mit Stripe, dem Zahlungsstandard für<br />
                  über 4 Millionen Unternehmen.
                </p>
              </div>

              {/* Schritt 3: Ergebnis erhalten */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 -mt-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Ergebnis in 2 Minuten

                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Detaillierte PDF-Analyse mit Marktwert,<br />
                  Begründung und Abstammungsanalyse.
                </p>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                Jetzt Bewertung starten
              </Link>
              <Link
                href="/beispiel-analyse"
                className="btn-secondary"
              >
                Beispiel-Analyse anschauen
              </Link>
            </div>
          </div>
        </section>

{/* Das sagen unsere Kunden Sektion */}
<section className="bg-[#fdf9f4] py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">
      Das sagen unsere Kunden
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {/* Testimonial 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative">
        <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">
          &quot;
        </div>
        <div className="flex mb-4 ml-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
          &quot;Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen eine Einschätzung zu bekommen und ich konnte mein Pferd auch zu dem empfohlenen Preis verkaufen!&quot;
        </blockquote>
        <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
          - Sarah M., Freizeitreiterin
        </cite>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative">
        <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">
          &quot;
        </div>
        <div className="flex mb-4 ml-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
          &quot;Vor dem Pferdekauf wollte ich wissen, ob der angegebene Preis fair ist. Die PferdeWert-Analyse war sehr detailliert und hat mir bei der Preisverhandlung sehr geholfen.&quot;
        </blockquote>
        <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
          - Michael K., Hobbyreiter
        </cite>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-600 relative md:col-span-2 lg:col-span-1">
        <div className="absolute -left-1 top-6 text-4xl text-amber-600 font-serif leading-none">
          &quot;
        </div>
        <div className="flex mb-4 ml-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-4 ml-6 leading-relaxed">
        &quot;Ich besitze ein Pferd und wollte einfach nur aus Neugier den aktuellen Marktwert wissen. Super interessant was PferdeWert als Ergebnis bereitstellt, vor allem auch die Analyse der Abstammung fand ich sehr spannend!&quot;
        </blockquote>
        <cite className="text-sm text-gray-600 font-semibold ml-6 not-italic">
          - Anna L., Pferdebesitzerin
        </cite>
      </div>
    </div>

    {/* Call-to-Action Button */}
    <div className="text-center">
      <Link
        href="/pferde-preis-berechnen"
        className="btn-primary"
      >
        Jetzt Bewertung starten
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
                <Link
                  href="/pferde-preis-berechnen"
                  className="btn-primary"
                >
                  Jetzt Bewertung starten
                </Link>
              </div>
            </div>
          </section>
        </main>
      </>
    </Layout>
  );
}
