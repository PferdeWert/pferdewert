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

      {/* Hero-Bereich mit leichtem Overlay und höherem Fokuspunkt */}
      <section className="relative bg-gray-900 text-white min-h-[65vh] flex items-start justify-center text-center px-4 pt-20 overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="Pferd vor schwarzem Hintergrund"
          fill
          priority
          className="object-cover object-center brightness-50 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-0" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Was ist dein Pferd wirklich wert?</h1>
          <p className="mt-4 text-lg sm:text-xl">Jetzt Analyse starten – schnell, anonym & professionell</p>
          <Link
            href="/bewerten"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
          >
            Für 4,90 € bewerten lassen
          </Link>
          <p className="mt-3 text-sm text-white/80">Von Reitern für Reiter entwickelt</p>
        </div>
      </section>

      {/* Weiterer Seiteninhalt bleibt unverändert erhalten */}
      <main className="bg-white px-4 py-6 sm:px-6 lg:px-8">
        <section className="py-20 bg-white">
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

      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
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
