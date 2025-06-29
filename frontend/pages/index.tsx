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
          content="Lass dein Pferd jetzt professionell bewerten – schnell, anonym & datenbasiert. Nur für kurze Zeit: Analyse für 4,90 € statt 39 €!"
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
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PferdeWert",
              "url": "https://pferdewert.de/",
              "description": "Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF.",
              "publisher": {
                "@type": "Organization",
                "name": "PferdeWert"
              }
            }
          `}
        </script>
        <link rel="canonical" href="https://pferdewert.de/" />
      </Head>

      <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Was ist dein Pferd wirklich wert?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Du willst ein Pferd kaufen oder verkaufen oder einfach nur wissen was dein Pferd aktuell wert ist? Jetzt Analyse starten und objektiven Marktwert deines Pferdes erhalten – fundiert, anonym & datenbasiert.
          </p>

          <div className="mt-8">
            <Image
              src="/images/hero.webp"
              alt="Symbolbild Pferdeanalyse"
              width={800}
              height={400}
              className="rounded-xl mx-auto shadow-md"
              priority
            />
          </div>

          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-xl mt-6 shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              💥 Schnell sein lohnt sich: Nur <span className="text-red-600 font-bold text-xl">4,90 €</span>
              <span className="line-through text-gray-500 text-sm ml-2">statt 39 €</span> – für die ersten 100 Bewertungen!
            </p>
            <p className="text-sm text-gray-600 mt-1">Keine versteckten Kosten • Kein Abo • Direkt online starten</p>
          </div>

          <Link href="/bewerten">
            <a className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
              Jetzt für nur 4,90 € bewerten lassen
            </a>
          </Link>

          <p className="text-xs text-gray-500 mt-2">
            Aktion gültig für die ersten 100 Analysen – danach regulärer Preis von 39 €.
          </p>

          <p className="mt-6 text-sm text-gray-700 italic">Von Reitern für Reiter entwickelt • DSGVO-konform • SSL-verschlüsselt</p>

          <h2 className="text-2xl font-bold mt-16 text-center">Beispiel-Ergebnis deiner Analyse</h2>
          <div className="mt-6">
            <Image
              src="/images/result.webp"
              alt="Beispiel-Ergebnis einer Bewertung"
              width={800}
              height={500}
              className="rounded-lg mx-auto shadow"
            />
            <Link href="/beispiel-analyse">
              <a className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
                Beispiel-Analyse ansehen
              </a>
            </Link>
          </div>

          <Link href="/bewerten">
            <a className="mt-8 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700">
              Jetzt eigene Analyse starten
            </a>
          </Link>
        </div>

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
              <Link href="/bewerten">
                <a className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700">
                  Jetzt Bewertung starten
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
