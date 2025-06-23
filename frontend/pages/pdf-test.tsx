// pages/pdf-test.tsx

import Head from "next/head";
import { jsPDF } from "jspdf";
import BewertungLayout from "@/components/BewertungLayout";

export default function PdfTest() {
  const sampleText = `
## Allgemeine Bewertung

**Name**: Maximus
**Alter**: 7 Jahre
**Rasse**: Hannoveraner

### Gebäude
Gute Proportionen, korrekte Gliedmaßenstellung, harmonischer Körperbau.

### Bewegung
Raumgreifender Schritt, elastischer Trab, bergauf gesprungener Galopp.

### Gesamteindruck
Sportlich, ausgeglichen, klar im Kopf.
`;

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const heute = new Date().toLocaleDateString("de-DE");

    const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

    const body = sampleText
      .replace(/^### (.*$)/gim, "\n\n$1\n" + "=".repeat(30) + "\n")
      .replace(/^## (.*$)/gim, "\n\n$1\n" + "-".repeat(30) + "\n")
      .replace(/\*\*(.*?)\*\*/gim, "$1:")
      .replace(/\n{2,}/g, "\n\n");

    const lines = pdf.splitTextToSize(body, 180);
    pdf.setFont("times", "normal");
    pdf.setFontSize(12);
    pdf.setLineHeightFactor(1.6);
    pdf.text("Pferdebewertung", 105, 20, { align: "center" });
    pdf.text(headerText, 10, 30);
    pdf.text(lines, 10, 50);
    pdf.save("test.pdf");
  };

  return (
    <>
      <Head>
        <title>PferdeWert – PDF-Test</title>
      </Head>
      <BewertungLayout title="PDF-Testseite">
        <p className="mb-6 text-gray-600">
          Dies ist eine Testseite zur Generierung eines PDFs mit Beispieltext.
        </p>
        <button
          onClick={handleDownloadPDF}
          className="rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
        >
          🧞 PDF herunterladen
        </button>
      </BewertungLayout>
    </>
  );
}
