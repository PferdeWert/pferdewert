// pages/ergebnis.tsx

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";

export default function Ergebnis() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell, bitte schicke uns eine E-Mail an info@pferdewert.de und wir melden uns sobald das Modell wieder online ist.";

  useEffect(() => {
    if (router.query.text) {
      const decoded = decodeURIComponent(router.query.text as string);
      if (decoded.includes("Heuristik")) {
        setText(fallbackMessage);
      } else {
        setText(decoded);
      }
    }
  }, [router.query.text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fehlerhandling, falls Kopieren fehlschlägt
    }
  };

  const handleDownloadPDF = () => {
    if (!text) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Bereitgestellt von www.pferdewert.de", 10, 280);
    doc.save("pferdebewertung.pdf");
  };

  return (
    <>
      <Head>
        <title>Pferdebewertung – Ergebnis | PferdeWert</title>
        <meta
          name="description"
          content="Hier erhältst du das individuelle Ergebnis deiner KI-gestützten Pferdebewertung – inklusive Analyse, Tipps & PDF-Download."
        />
      </Head>

      <main className="bg-brand-light min-h-screen py-20 px-4">
        <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-soft p-8 border border-brand/10">
          <h1 className="mb-6 text-h2 font-serif font-bold text-brand">
            📊 Ergebnis deiner Pferdebewertung
          </h1>

          {text ? (
            <>
              <div className="whitespace-pre-line rounded-2xl border border-brand-light bg-brand-light/70 p-6 text-brand font-mono text-base">
                {text}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 rounded-2xl bg-brand-accent px-6 py-3 font-bold text-white shadow-soft hover:bg-brand transition"
                >
                  📋 Ergebnis kopieren
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
                >
                  🧾 PDF herunterladen
                </button>
              </div>

              {copied && (
                <p className="mt-3 text-center text-brand-green font-semibold">
                  ✔️ In Zwischenablage kopiert!
                </p>
              )}
            </>
          ) : (
            <p className="text-brand">
              Kein Bewertungsergebnis verfügbar.
              <br />
              <span className="text-brand-accent">{fallbackMessage}</span>
            </p>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/bewerten"
              className="inline-block text-brand-accent underline underline-offset-4 hover:text-brand font-medium"
            >
              ➕ Noch ein Pferd bewerten
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
