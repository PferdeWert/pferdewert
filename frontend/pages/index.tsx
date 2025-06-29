// frontend/pages/index.tsx
import Head from "next/head";
import Image from "next/image"; // genutzt in Hero & Beispiel-Ergebnis
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert</title>
        <meta
          name="description"
          content="Lass dein Pferd jetzt professionell bewerten – schnell, anonym & datenbasiert. Nur für kurze Zeit: Analyse für 4,90 € statt 39 €!"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert" />
        <meta
          property="og:description"
          content="Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF. Ideal zur Vorbereitung auf Pferdekauf oder Verkauf."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/" />
        <meta property="og:image" content="https://pferdewert.de/images/hero.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert" />
        <meta
          name="twitter:description"
          content="Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF. Ideal zur Vorbereitung auf Pferdekauf oder Verkauf."
        />
        <meta name="twitter:image" content="https://pferdewert.de/images/hero.webp" />

        {/* Strukturierte Daten */}
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

          {/* Preisbanner */}
          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-xl mt-6 shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              💥 Schnell sein lohnt sich: Nur <span className="text-red-600 font-bold text-xl">4,90 €</span>
              <span className="line-through text-gray-500 text-sm ml-2">statt 39 €</span> – für die ersten 100 Bewertungen!
            </p>
            <p className="text-sm text-gray-600 mt-1">Keine versteckten Kosten • Einmalzahlung • Direkt online starten</p>
          </div>

          <Link href="/bewerten">
            <a className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
              Jetzt für nur 4,90 € bewerten lassen
            </a>
          </Link>

          <p className="text-xs text-gray-500 mt-2">
            Aktion gültig für die ersten 100 Analysen – danach regulärer Preis von 39 €.
          </p>
        </div>
      </main>
    </>
  );
}
