// pages/pdf-test.tsx

import { useState } from "react";
import Head from "next/head";
import { jsPDF } from "jspdf";

export default function PdfTest() {
  const [generating, setGenerating] = useState(false);

  const markdownText = `
**Abstammung**

Vater: Donnerhall
Muttervater: Rubinstein

**Besondere Merkmale**

- Sehr gute Rittigkeit
- Klarer Kopf
- Drei gute Grundgangarten

**Was den Endpreis besonders bewegt**

- Erfolge auf Turnierniveau
- Gesundheitszustand (AKU ohne Befund)

**Fazit**

Das Pferd überzeugt durch seine Abstammung, seinen Ausbildungsstand und seine Turniererfolge. Eine faire Preisspanne liegt bei ca. 25.000 € – 32.000 €.
`;

  const generatePDF = () => {
    setGenerating(true);
    const pdf = new jsPDF();

    const heute = new Date().toLocaleDateString("de-DE");
    const marginLeft = 20;
    const contentWidth = 170;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text("Pferdebewertung", pdf.internal.pageSize.getWidth() / 2, 30, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(`Erstellt am ${heute}`, pdf.internal.pageSize.getWidth() / 2, 38, { align: "center" });

    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => {
      pdf.addImage(img, "PNG", pdf.internal.pageSize.getWidth() / 2 - 25, 10, 50, 15);

      pdf.setFontSize(12);
      const lines = pdf.splitTextToSize(markdownText, contentWidth);
      pdf.text(lines, marginLeft, 50);

      pdf.setFontSize(10);
      pdf.text("Bereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse", marginLeft, 280);
      pdf.text("www.pferdewert.de", marginLeft, 285);

      pdf.save("pferdebewertung.pdf");
      setGenerating(false);
    };
  };

  return (
    <>
      <Head>
        <title>PDF-Test | PferdeWert</title>
      </Head>
      <main className="max-w-xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">PDF-Testseite</h1>
        <p className="mb-4">Klicke unten, um eine Beispielbewertung als PDF zu generieren.</p>
        <button
          onClick={generatePDF}
          disabled={generating}
          className="bg-brand-accent text-white px-6 py-3 rounded-2xl font-semibold shadow hover:bg-brand-accent/80"
        >
          {generating ? "Generiere PDF…" : "PDF erzeugen"}
        </button>
      </main>
    </>
  );
} 
