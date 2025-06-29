// frontend/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const faqs = [
    [
      "Wie genau ist die Bewertung?",
      "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen."
    ],
    [
      "Kostet der Service etwas?",
      "Unsere umfassende Preisanalyse kostet aktuell nur 4,90 Euro."
    ],
    [
      "Was passiert mit meinen Daten?",
      "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben."
    ],
    [
      "Wie lange dauert die Analyse?",
      "Unser KI-Modell erstellt deine Analyse in der Regel in weniger als 2 Minuten nach Absenden des Formulars."
    ],
    [
      "Welche Zahlungsmöglichkeiten gibt es?",
      "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay, Giropay und Klarna möglich."
    ]
  ];

  return (
    <>
      <Head>
        <title>Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert</title>
        <meta
          name="description"
          content="Nur für kurze Zeit: Pferdebewertung für 4,90 € statt 39 € auf PferdeWert.de"
        />
        <meta property="og:title" content="Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert" />
        <meta property="og:description" content="Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF. Ideal zur Vorbereitung auf Pferdekauf oder Verkauf." />
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

      {/* Hero-Bereich */}
      <section className="bg-white text-center py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Was ist dein Pferd wirklich wert?</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">Jetzt Analyse starten – schnell, anonym & professionell</p>

          {/* Preisbanner */}
          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-xl mt-6 shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              💥 Schnell sein lohnt sich: Nur <span className="text-red-600 font-bold text-xl">4,90 €</span>
              <span className="line-through text-gray-500 text-sm ml-2">statt 39 €</span> – für die ersten 100 Bewertungen!
            </p>
            <p className="text-sm text-gray-600 mt-1">Keine versteckten Kosten • Einmalzahlung • Direkt online starten</p>
          </div>

          <Link
            href="/bewerten"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-colors"
          >
            Jetzt für nur 4,90 € bewerten lassen
          </Link>

          <p className="text-xs text-gray-500 mt-2">
            Aktion gültig für die ersten 100 Analysen – danach regulärer Preis von 39 €.
          </p>

          <p className="mt-2 text-sm text-gray-600">Von Reitern für Reiter entwickelt</p>
        </div>
        <div className="mt-10">
          <Image
            src="/images/hero.webp"
            width={800}
            height={500}
            alt="Pferd als Symbolbild für Bewertung"
            className="rounded-xl mx-auto shadow-md"
          />
        </div>
      </section>

      {/* Beispiel-Ergebnis Sektion */}
      <section className="bg-[#fefaf1] py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Beispiel-Ergebnis deiner Analyse</h2>
          <p className="mb-6 text-gray-700">So könnte dein Analyse-PDF aussehen – fundiert, strukturiert & professionell aufbereitet.</p>
          <Image
            src="/images/result.webp"
            width={800}
            height={500}
            alt="Beispiel einer Pferdewert-Analyse"
            className="rounded-lg shadow-md mx-auto"
          />
          <div className="mt-6">
            <Link
              href="/beispiel-analyse"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800"
            >
              Beispiel ansehen
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
                href="/bewerten"
                className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700"
              >
                Jetzt Bewertung starten
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 text-center py-6 text-xs text-gray-600">
        <div className="space-x-4">
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} PferdeWert</p>
      </footer>
    </>
  );
}
