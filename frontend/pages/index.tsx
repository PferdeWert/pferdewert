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
          content="Pferdebewertung online: Schnell und günstig zur Marktwert-Schätzung – ideal zur Vorbereitung auf Pferdekauf oder Pferdeverkauf."
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
            <h2 className="text-h2 mt-4 text-brand font-semibold">
              Günstige Pferdebewertung in wenigen Minuten – digital und fundiert
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Unsere KI-gestützte Online-Bewertung hilft dir, den realistischen Marktwert deines Pferdes schnell und einfach zu ermitteln. Ideal für Verkauf, Versicherung oder Einschätzung.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/bewerten"
                className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Jetzt bewerten
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-md lg:max-w-xl">
            <Image
              src="/images/hero.webp"
              alt="Pferdebewertung"
              width={800}
              height={600}
              className="w-full rounded-xl shadow-md"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
