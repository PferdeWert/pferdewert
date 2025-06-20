// pages/index.tsx – Landing Page (ESLint-konform)
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>PferdeWert – Online Pferdebewertung</title>
        <meta
          name="description"
          content="Sofortige KI-gestützte Marktwert-Schätzung für dein Pferd inklusive detaillierter Analyse als PDF."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pt-24 pb-16 lg:flex-row lg:gap-16 lg:pb-32">
          {/* Text */}
          <div className="max-w-xl lg:flex-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Was ist dein Pferd wert?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Erhalte in 2&nbsp;Minuten eine KI-gestützte Marktwert-Schätzung inklusive Analyse &amp; PDF-Download.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/bewerten"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Pferd jetzt bewerten
              </Link>
              <a href="#ablauf" className="text-blue-600 hover:underline">
                So funktioniert’s
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-lg lg:w-1/2">
            <Image
              src="/images/hero.webp"
              alt="Pferd beim Sprung"
              width={800}
              height={534}
              priority
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Ablauf Section */}
      <section id="ablauf" className="bg-[#f8f8f6] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold text-gray-900">So einfach geht’s</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "Daten eingeben",
                text: "Alter, Rasse, Ausbildungsstand &amp; Co. in nur 2 Minuten eintragen.",
              },
              {
                icon: "🤖",
                title: "KI analysiert",
                text: "Modernstes OpenAI‑Modell berechnet sofort den Marktwert.",
              },
              {
                icon: "📊",
                title: "Wert erhalten",
                text: "Ergebnis mit Analyse sofort online &amp; als PDF sichern.",
              },
            ].map(({ icon, title, text }, idx) => (
              <div key={idx} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
                  {icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">{title}</h3>
                <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Vertraut von über 1.200 Pferdebesitzern</h2>
          <p className="mt-4 text-gray-600">
            DSGVO‑konform · Powered by OpenAI · 4.9 / 5 ⭐ Nutzerbewertung
          </p>
        </div>
      </section>

      {/* Beispiel-Ergebnis */}
      <section className="bg-[#f8f8f6] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/images/result.webp"
              alt="Beispiel-Ergebnis Pferdebewertung"
              width={800}
              height={600}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-900">Beispiel-Ergebnis</h2>
            <p className="mt-4 text-gray-600">
              Sieh hier, wie detailliert unsere Analyse ausfällt: Wertband, Begründung und konkrete Tipps zur
              Preisoptimierung.
            </p>
      <Link
       href="/bewerten"
       className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
      >
       Beispiel-Analyse
      </Link>


          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-semibold text-gray-900">Häufige Fragen</h2>
          <div className="mt-12 space-y-6">
            {[
              [
                "Wie genau ist die Bewertung?",
                "Unsere KI analysiert auf Basis tausender Markttransaktionen. Dennoch ist es eine Schätzung – nutzen Sie sie als Richtwert.",
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
                "In der Regel weniger als 30 Sekunden nach Absenden des Formulars.",
              ],
              [
                "Kann ich mehrere Pferde bewerten?",
                "Ja, nach jeder Bewertung kannst du sofort ein weiteres Pferd eingeben.",
              ],
            ].map(([q, a], idx) => (
              <details key={idx} className="rounded border border-gray-200 p-4">
                <summary className="cursor-pointer select-none text-lg font-medium text-gray-900">
                  {q}
                </summary>
                <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: a as string }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4e463b] py-10 text-center text-sm text-gray-200">
        <p>© {new Date().getFullYear()} PferdeWert • Alle Rechte vorbehalten</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="mailto:info@pferdewert.de" className="hover:underline">
            E‑Mail
          </a>
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
        </div>
      </footer>
    </>
  );
}
