// pages/bewerten.tsx
import Head from "next/head";
import React, { useState } from "react";

export default function Bewerten() {
  const [loading, setLoading] = useState(false);
  const LIVE_LINK = "https://buy.stripe.com/14A8wQc6L4d4d4d2fwcbC00";

  const handleClick = () => {
    setLoading(true);
    window.location.href = LIVE_LINK;
  };

  return (
    <>
      <Head>
        <title>Pferd bewerten – PferdeWert</title>
        <meta
          name="description"
          content="Jetzt Pferd bewerten lassen – KI-gestützt, anonym und in 30 Sekunden. PferdeWert ist Marktführer für digitale Pferdebewertung."
        />
      </Head>

      <main className="bg-brand-light min-h-screen py-20 px-4">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-soft p-8 border border-brand/10">
          <h1 className="text-h1 font-serif font-bold text-brand mb-6">
            Jetzt Pferd bewerten
          </h1>
          <p className="text-brand mb-8 text-base">
            Trage die wichtigsten Informationen ein – unsere KI analysiert sofort den Marktwert deines Pferdes.
            <span className="block mt-2 text-brand-accent font-medium">
              100% anonym und sofort verfügbar.
            </span>
          </p>

          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-brand-accent text-white py-4 rounded-2xl font-bold text-button shadow-soft hover:bg-brand transition"
          >
            {loading ? "🔄 Bewertung läuft..." : "Jetzt Bewertung starten"}
          </button>
        </div>
      </main>
    </>
  );
}
