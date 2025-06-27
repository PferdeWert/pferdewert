import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
     <Head>
  <title>Pferdewert jetzt berechnen – schnell & ohne Anmeldung | PferdeWert</title>
  <meta
    name="description"
    content="Jetzt den Marktwert deines Pferdes berechnen – anonym, ohne Anmeldung & direkt als PDF. In 2 Minuten zur fundierten Analyse."
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





      {/* Hero Section */}
<section className="relative isolate overflow-hidden bg-brand-light">
  <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pt-20 pb-16 lg:flex-row lg:gap-20 lg:pb-32">
    {/* Text */}
    <div className="max-w-xl lg:flex-auto">
     <h1 className="text-h1 font-serif font-bold text-brand leading-tight">
  Jetzt Pferdewert berechnen<br />
<span className="block text-lg font-serif text-brand-accent font-medium mt-1">
  ohne Anmeldung & direkt als PDF
</span>
</h1>


      <p className="mt-4 text-base leading-7 text-brand">
        Fundierte Marktwert-Analyse – schnell, objektiv & als PDF zum Download.
      </p>

      <ul className="mt-6 space-y-2 text-brand text-sm font-medium">
        <li className="flex items-center gap-2">
          <span className="text-brand-accent text-lg leading-none">✔</span>
          Zahlreiche zufriedene Pferdebesitzer
        </li>
        <li className="flex items-center gap-2">
          <span className="text-brand-accent text-lg leading-none">✔</span>
          Ohne Anmeldung – Bewertung selbst erstellen
        </li>
        <li className="flex items-center gap-2">
          <span className="text-brand-accent text-lg leading-none">✔</span>
          Marktwert & Analyse in nur 2 Minuten
        </li>
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/bewerten"
          className="rounded-2xl bg-brand-accent px-8 py-3 text-button font-bold text-white shadow-soft transition hover:bg-brand focus:outline-none focus:ring-4 focus:ring-brand-accent/30"
        >
          Pferd jetzt bewerten
        </Link>
        <a
          href="#ablauf"
          className="self-center text-brand-accent underline underline-offset-4 hover:text-brand font-medium"
        >
          So funktioniert’s
        </a>
      </div>
    </div>

    {/* Hero Image */}
    <div className="w-full max-w-lg lg:w-1/2 drop-shadow-xl">
      <Image
        src="/images/hero.webp"
        alt="Pferd beim Sprung"
        width={800}
        height={534}
        priority
        className="rounded-2xl shadow-soft border border-brand/10"
      />
    </div>
  </div>
</section>


      {/* Ablauf Section */}
      <section id="ablauf" className="bg-brand-light py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-h2 font-serif text-brand font-bold">
            So einfach geht’s:
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "Daten eingeben",
                text: "Alter, Rasse & Ausbildungsstand in nur 2 Minuten eintragen.",
              },
              {
                icon: "🤖",
                title: "KI analysiert",
                text: "Modernste KI-Technologie berechnet den Marktwert in wenigen Minuten.",
              },
              {
                icon: "📊",
                title: "Wert erhalten",
                text: "Ergebnis, Analyse & Tipps sofort online & als PDF sichern.",
              },
            ].map(({ icon, title, text }, idx) => (
              <div
                key={idx}
                className="text-center rounded-2xl bg-white/80 p-8 shadow-soft border border-brand-light"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-2xl text-white shadow">
                  {icon}
                </div>
                <h3 className="mt-6 text-xl font-serif text-brand font-semibold">{title}</h3>
                <p className="mt-2 text-brand">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-h2 font-serif text-brand font-bold">
            Zahlreiche zufriedene Pferdebesitzer vertrauen auf <span className="text-brand-accent">PferdeWert.de</span>
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-base text-brand">
            <span className="px-3 py-1 rounded bg-brand-light/80 font-medium shadow-sm">
              DSGVO-konform
            </span>
            <span className="px-3 py-1 rounded bg-brand-light/80 font-medium shadow-sm">
              Powered by KI
            </span>
            <span className="px-3 py-1 rounded bg-brand-light/80 font-medium shadow-sm">
              4.9/5 ⭐ Nutzerbewertung
            </span>
          </div>
        </div>
      </section>

      {/* Beispiel-Ergebnis */}
      <section className="bg-brand-light py-20">
        <div className="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/images/result.webp"
              alt="Beispiel-Ergebnis Pferdebewertung"
              width={800}
              height={600}
              className="rounded-2xl shadow-soft border border-brand/10"
            />
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <h2 className="text-h2 font-serif text-brand font-bold">Beispiel-Ergebnis</h2>
            <p className="mt-4 text-brand">
              Sieh hier, wie detailliert unsere Analyse ausfällt: Wertband, Begründung und konkrete Tipps zur Preisoptimierung. Alles für mehr Transparenz & Fairness auf dem Pferdemarkt!
            </p>
            <Link
              href="/beispiel-analyse"
              className="mt-6 inline-block rounded-xl bg-brand-accent px-6 py-3 text-button font-bold text-white shadow-soft hover:bg-brand"
            >
              Beispiel-Analyse ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-h2 font-serif text-brand font-bold">Häufige Fragen</h2>
          <div className="mt-12 space-y-6">
            {[
              [
                "Wie genau ist die Bewertung?",
                "Unsere KI analysiert auf Basis tausender Markttransaktionen und Experteneinschätzungen. Dennoch ist es eine Schätzung – bitte als Richtwert nutzen.",
              ],
              [
                "Kostet der Service etwas?",
                "Unsere umfassende Preisanalyse kostet dich momentan nur 4,90 Euro.",
              ],
              [
                "Was passiert mit meinen Daten?",
                "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben.",
              ],
              [
                "Wie lange dauert die Analyse?",
                "Unser KI-Modell erstellt deine Analyse in der Regel in weniger als 2 Minuten nach Absenden des Formulars.",
              ],
              [
                "Welche Zahlungsmöglichkeiten gibt es?",
                "Wir nutzen mit Stripe einen der größten Zahlungsdienstleister. Zahlungen sind per Kreditkarte, Apple Pay, Google Pay, Giropay und Klarna möglich.",
              ],
            ].map(([q, a], idx) => (
              <details key={idx} className="rounded-2xl border border-brand-light p-4 bg-brand-light/80">
                <summary className="cursor-pointer select-none text-lg font-semibold text-brand">
                  {q}
                </summary>
                <p className="mt-2 text-brand">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
