// pages/pdf-test.tsx

import Head from "next/head";
import { generateBewertungsPDF } from "@/lib/pdfLayout";
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
    const pdf = generateBewertungsPDF(sampleText);
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
