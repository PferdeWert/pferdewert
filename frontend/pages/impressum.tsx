// pages/impressum.tsx

import Head from "next/head";
import Layout from "@/components/Layout"; // Footer via Layout integriert

export default function Impressum() {
  return (
    <Layout>
      <Head>
        <title>Impressum | PferdeWert.de</title>
        <meta
          name="description"
          content="🐎 Impressum & Kontakt zu PferdeWert.de ➤ Professionelle Pferdebewertung für 14,90€ ✓ Rechtssichere Angaben ✓ Direkter Kontakt ✓ Deutschland"
        />
        <meta name="keywords" content="impressum, kontakt, pferdewert, rechtliche angaben, anbieterkennung, deutschland" />
        <meta property="og:title" content="Impressum | PferdeWert.de" />
        <meta property="og:description" content="Impressum und Kontaktdaten von PferdeWert.de - Professionelle Pferdebewertung in Deutschland" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/impressum" />
        <link rel="canonical" href="https://pferdewert.de/impressum" />
      </Head>
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Impressum</h1>

      <p className="mb-2 font-semibold">Angaben gemäß § 5 TMG:</p>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg 17B<br />
        70619 Stuttgart<br />
        Deutschland
      </p>

      <p className="mb-2 font-semibold">Kontakt:</p>
      <p className="mb-4">
        E-Mail:&nbsp;
        <a
          href="mailto:info@pferdewert.de"
          className="text-blue-600 underline hover:text-blue-800"
        >
          info@pferdewert.de
        </a>
      </p>

      <p className="mb-2 font-semibold">Verantwortlich gemäß § 55 Abs. 2 RStV:</p>
      <p className="mb-4">
        Sabine und Benjamin Reder<br />
        Feigenweg 17B<br />
        70619 Stuttgart
      </p>

      <p className="mb-2 font-semibold">Umsatzsteuer-ID:</p>
      <p className="mb-4">
        Nicht umsatzsteuerpflichtig gemäß § 19 UStG (Kleinunternehmerregelung)
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV: Sabine und Benjamin Reder
      </p>
    </main>
    </Layout>
  );
}
