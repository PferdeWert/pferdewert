import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Ergebnis() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (router.query.text) {
      setText(decodeURIComponent(router.query.text as string));
    }
  }, [router.query.text]);

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

  const handleDownloadPDF = () => {
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
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📋 Ergebnis kopieren
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              🧾 PDF herunterladen
            </button>
          </div>
          {copied && <p className="text-green-600 mt-2">✔️ In Zwischenablage kopiert!</p>}
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
