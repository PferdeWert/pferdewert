// pages/ergebnis.tsx – Ergebnisanzeige
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

export default function Ergebnis() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Fallback-Hinweis, falls KI gerade nicht verfügbar
  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell, bitte schicke uns eine E-Mail an info@pferdewert.de und wir melden uns sobald das Modell wieder online ist.";

  useEffect(() => {
    if (router.query.text) {
      const decoded = decodeURIComponent(router.query.text as string);
      // Prüfen, ob Backend-Heuristik oder Error-Placeholder geliefert hat
      if (decoded.includes("Heuristik")) {
        setText(fallbackMessage);
      } else {
        setText(decoded);
      }
    }
  }, [router.query.text]);

  // Text kopieren
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // PDF herunterladen
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
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Ergebnis deiner Pferdebewertung</h1>

      {text ? (
        <>
          <div className="bg-gray-100 border border-gray-300 p-4 rounded whitespace-pre-line text-gray-800">
            {text}
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleCopy}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              📋 Ergebnis kopieren
            </button>
            <button
              onClick={handleDownloadPDF}
              className="rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              🧾 PDF herunterladen
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-green-600">✔️ In Zwischenablage kopiert!</p>
          )}
        </>
      ) : (
        <p className="text-gray-600">Kein Bewertungsergebnis verfügbar.</p>
      )}

      <div className="mt-6">
        <a href="/bewerten" className="text-blue-600 hover:underline">
          ➕ Noch ein Pferd bewerten
        </a>
      </div>
    </main>
  );
}
