// pages/index.tsx – Neue Landing Page für PferdeWert.de

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pferdebewertung online – ideal für Pferdekauf & Pferdeverkauf | PferdeWert</title>
        <meta
          name="description"
          content="Pferdebewertung online: Schnell und günstig zur Marktwert-Schätzung – ideal zur Vorbereitung auf Pferdekauf oder Pferdeverkauf."
        />
        {/* SEO Basics */}
        <meta property="og:title" content="Pferdebewertung online – ideal für Pferdekauf & Pferdeverkauf | PferdeWert" />
        <meta property="og:description" content="Pferdebewertung online: Schnell und günstig zur Marktwert-Schätzung – ideal zur Vorbereitung auf Pferdekauf oder Pferdeverkauf." />
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
              Kostenlose & sofortige Marktwert-Schätzung deines Pferdes –
              <span className="font-bold text-brand-accent"> anonym, digital und unabhängig.</span> 
              <br />
              Inklusive ausführlicher Analyse und PDF zum Download.
            </p>
            <ul className="mt-8 space-y-2 text-brand-green text-base font-medium">
              <li className="flex items-center gap-2">
                <span className="text-brand-gold text-lg leading-none" aria-hidden="true">★</span>
                Zahlreiche zufriedene Pferdebesitzer
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-accent text-lg leading-none" aria-hidden="true">✔</span>
                Ohne Anmeldung – Bewertung selbst erstellen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand text-lg leading-none" aria-hidden="true">⚡</span>
                Marktwert & Analyse in nur 2 Minuten
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
    </>
  );
}
