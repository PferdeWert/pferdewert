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
        {/* SEO Basics */}
        <meta property="og:title" content="PferdeWert – Online Pferdebewertung vom Experten" />
        <meta property="og:description" content="Kostenlos & anonym: Sofortige KI-gestützte Marktwert-Schätzung für dein Pferd." />
        <meta property="og:image" content="/images/hero.webp" />
        <meta property="og:url" content="https://www.pferdewert.de/" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-brand-light">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pt-24 pb-16 lg:flex-row lg:gap-20 lg:pb-32">
          {/* Text */}
          <div className="max-w-xl lg:flex-auto">
            <h1 className="text-h1 font-serif font-bold text-brand">
              Was ist dein Pferd wert?
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand">
              Kostenlose & sofortige Marktwert-Schätzung für dein Pferd –
              <span className="font-bold text-brand-accent"> anonym, digital und unabhängig.</span> 
              <br />
              Inklusive ausführlicher Analyse und PDF zum Download.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-brand-green text-base font-medium">
              <li className="flex items-center gap-2">
                <span className="text-brand-gold text-lg">★</span>
                Über 1.200 zufriedene Pferdebesitzer
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-accent text-lg">✔</span>
                DSGVO-konform & anonym
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand text-lg">⚡</span>
                Ergebnis in 30 Sekunden
              </li>
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/bewerten"
                className="rounded-2xl bg-brand-accent px-8 py-4 text-button font-bold text-white shadow-soft transition hover:bg-brand focus:outline-none focus:ring-4 focus:ring-brand-accent/30"
              >
                Pferd jetzt bewerten
              </Link>
              <a href="#ablauf" className="self-center text-brand-accent underline underline-offset-4 hover:text-brand font-medium">
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
            So einfach geht’s
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
                text: "Modernste OpenAI-Technologie berechnet sofort den Marktwert.",
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
            Vertraut von über <span className="text-brand-accent">1.200 Pferdebesitzern</span>
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-base text-brand">
            <span className="px-3 py-1 rounded bg-brand-light/80 font-medium shadow-sm">
              DSGVO-konform
            </span>
            <span className="px-3 py-1 rounded bg-brand-light/80 font-medium shadow-sm">
              Powered by OpenAI
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
                "Die Basis-Bewertung ist kostenlos. Zukünftige Premium-Funktionen können kostenpflichtig sein.",
              ],
              [
                "Was passiert mit meinen Daten?",
                "Wir speichern nur anonyme Bewertungsdaten zur Verbesserung des Modells. Keine personenbezogenen Daten werden weitergegeben.",
              ],
              [
                "Wie lange dauert die Analyse?",
                "In der Regel weniger als 30 Sekunden nach Absenden des Formulars.",
              ],
              [
                "Kann ich mehrere Pferde bewerten?",
                "Ja, nach jeder Bewertung kannst du sofort ein weiteres Pferd eingeben.",
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
