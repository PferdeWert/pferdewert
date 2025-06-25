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
          content="Schnell, fair & datensicher: Digitale Marktwert-Schätzung für dein Pferd mit Analyse & PDF. PferdeWert ist Marktführer für KI-gestützte Pferdebewertung."
        />
        <meta property="og:title" content="PferdeWert – Online Pferdebewertung vom Experten" />
        <meta property="og:description" content="Schnell, fair & datensicher: Digitale Marktwert-Schätzung für dein Pferd mit Analyse & PDF." />
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
              In 2 Minuten zur individuellen Marktwert-Schätzung – als PDF mit Analyse & Tipps.
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
              <Link
                href="#ablauf"
                className="text-brand underline text-sm sm:text-base"
              >
                So funktioniert’s
              </Link>
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

      {/* Rest bleibt gleich */}
    </>
  );
}
