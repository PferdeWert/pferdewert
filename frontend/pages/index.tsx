// pages/index.tsx – Neue Landing Page für PferdeWert.de

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>PferdeWert – Online Pferdebewertung vom Experten</title>
        <meta
          name="description"
          content="Kostenlos & anonym: Sofortige KI-gestützte Marktwert-Schätzung für dein Pferd – inkl. PDF, Analyse und Preisoptimierungs-Tipps. PferdeWert ist Marktführer für digitale Pferdebewertung in Deutschland."
        />
        <meta property="og:title" content="PferdeWert – Online Pferdebewertung vom Experten" />
        <meta property="og:description" content="Kostenlos & anonym: Sofortige KI-gestützte Marktwert-Schätzung für dein Pferd." />
        <meta property="og:image" content="/images/hero.webp" />
        <meta property="og:url" content="https://www.pferdewert.de/" />
        <meta name="robots" content="index, follow" />
      </Head>

      <section className="relative isolate overflow-hidden bg-brand-light">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pt-24 pb-16 lg:flex-row lg:gap-20 lg:pb-32">
          <div className="max-w-xl lg:flex-auto">
            <h1 className="text-4xl font-bold text-center mb-4">
              Was ist dein Pferd aktuell wert?
            </h1>
            <p className="text-lg text-center text-gray-700 mb-6">
              In 2 Minuten zur individuellen Marktwert-Schätzung – kostenlos, anonym & als PDF.
            </p>
            <ul className="space-y-2 text-gray-800 text-base mb-8">
              <li>✅ Über 500 zufriedene Pferdebesitzer</li>
              <li>🔒 100 % DSGVO-konform & anonym</li>
              <li>⚡ Ergebnis in unter 2 Minuten</li>
            </ul>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/bewerten"
                className="px-6 py-4 bg-brand text-white rounded-2xl text-lg font-bold shadow-soft hover:bg-brand-dark transition"
              >
                Pferd jetzt bewerten
              </Link>
              <a href="#so-funktionierts" className="text-brand underline text-sm sm:text-base">
                So funktioniert’s
              </a>
            </div>
          </div>
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
