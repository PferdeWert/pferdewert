// pages/pdf-test.tsx

import Head from "next/head";
import { jsPDF } from "jspdf";
import BewertungLayout from "@/components/BewertungLayout";

const dummyText = `
# Pferd im Profil

**Rasse:** Hannoveraner  
**Alter:** 5 Jahre  
**Stockmaß:** 168 cm

## Ausbildung & Gesundheit

**Ausbildungsstand:** L-Dressur sicher, M in Arbeit  
**Gesundheitsstatus:** AKU ohne Befund vom 05/2025

## Erfolge

- 1. Platz Dressur L (2024)
- 2. Platz Springprüfung A**

## Bewertung

Dieses Pferd überzeugt durch einen modernen Körperbau, gute Rittigkeit und klaren Leistungsnachweis. Hervorzuheben ist der taktklare Trab mit aktiver Hinterhand.

## Preis-Einschätzung

**Wert:** ca. 18.000 – 22.000 €

*Alle Angaben ohne Gewähr – basiert auf KI-Analyse.*
`;

export default function PDFTest() {
  const handleDownload = () => {
    const pdf = new jsPDF();
    const heute = new Date().toLocaleDateString("de-DE");

    const header = `Pferdebewertung – erstellt am ${heute}\n\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de\n\n`;
    const fullText = header + dummyText;

    const lines = pdf.splitTextToSize(fullText, 180);
    pdf.setFont("helvetica", "");
    pdf.setFontSize(12);

    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => {
      pdf.addImage(img, "PNG", 80, 10, 50, 15);
      pdf.text(lines, 10, 35);
      pdf.save("pferdebewertung.pdf");
    };
  };

  return (
    <>
      <Head>
        <title>PDF-Test</title>
      </Head>
      <BewertungLayout title="PDF-Layout testen">
        <div className="prose prose-blue max-w-none mb-6">
          <p>Hier kannst du das PDF-Layout mit Dummy-Daten testen:</p>
        </div>
        <button
          onClick={handleDownload}
          className="rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
        >🧞 PDF herunterladen</button>
      </BewertungLayout>
    </>
  );
}
