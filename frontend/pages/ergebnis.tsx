// pages/ergebnis.tsx

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";

export default function Ergebnis() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    const raw = router.query.text;
    const paid = router.query.paid;

    if (!paid || paid !== "true") {
      router.replace("/bewerten");
      return;
    }

    if (raw && typeof raw === "string") {
      const decoded = decodeURIComponent(raw);
      setText(decoded.includes("Heuristik") ? fallbackMessage : decoded);
    }
  }, [router.query]);

  const clean = (input: string) =>
    input
      .replace(/\/\s?/g, "")
      .replace(/(\d)\s?[\u2013-]\s?(\d)/g, "$1 - $2")
      .replace(/(\d{1,3})[ .](\d{3})/g, "$1 $2")
      .replace(/\u20ac\s?/g, " €");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fehler ignorieren
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const margin = 20;
    const maxWidth = 170;
    let y = margin;

    // Header mit Logo und Titel
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("PferdeWert Analyse", margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("KI-gestützte Pferdebewertung direkt online", margin, y);
    y += 10;

    doc.setDrawColor(200);
    doc.line(margin, y, 210 - margin, y);
    y += 10;

    const drawTextBlock = (
      content: string,
      type: "heading" | "paragraph" | "list"
    ) => {
      const cleaned = clean(content);
      doc.setFont("helvetica", type === "heading" ? "bold" : "normal");
      doc.setFontSize(type === "heading" ? 14 : 11);
      const lines = doc.splitTextToSize(
        type === "list" ? "• " + cleaned : cleaned,
        maxWidth
      );
      doc.text(lines, margin, y);
      y += lines.length * 6 + 2;
    };

    const lines = clean(text).split("\n");
    lines.forEach((line) => {
      if (y > 270) {
        doc.addPage();
        y = margin;
      }

      if (line.startsWith("###")) drawTextBlock(line.replace(/^#+\s*/, ""), "heading");
      else if (line.startsWith("- ")) drawTextBlock(line.slice(2), "list");
      else if (line.trim() !== "") drawTextBlock(line, "paragraph");
      else y += 4;
    });

    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Bereitgestellt von www.pferdewert.de", margin, 290);
    doc.save("pferdebewertung.pdf");
  };

  return (
    <>
      <Head>
        <title>Pferdebewertung – Ergebnis | PferdeWert</title>
        <meta
          name="description"
          content="Individuelle KI-Analyse für dein Pferd mit Preisspanne, Bewertung und Download."
        />
      </Head>

      <BewertungLayout title="📊 Ergebnis deiner Pferdebewertung">
        <p className="mb-6 text-green-700 font-semibold bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
          ✅ Zahlung erfolgreich – deine Analyse ist jetzt bereit.
        </p>

        {text ? (
          <>
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown>{text}</ReactMarkdown>
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
                🧞 PDF herunterladen
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
      </BewertungLayout>
    </>
  );
}
