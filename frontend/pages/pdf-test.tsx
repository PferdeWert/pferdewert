// pages/pdf-test.tsx

import Head from "next/head";
import { generateBewertungsPDF } from "@/lib/pdfLayout";
import BewertungLayout from "@/components/BewertungLayout";

const sampleText = `### Preisspanne

**10.000 – 15.000 €**

Diese Preisspanne reflektiert die unterschiedlichen Faktoren, die den Wert des Pferdes beeinflussen. Das untere Ende der Spanne berücksichtigt den Ausbildungsstand des Wallachs, der sich im L-Bereich im Ansatz befindet, sowie seine bisherigen Erfolge, die sich auf E-Siege und A-Platzierungen beschränken. Das obere Ende der Spanne könnte erreicht werden, wenn die Bewegungsqualität des Pferdes überdurchschnittlich ist und es eine besonders gute AKU vorweisen kann. Der Verkauf über einen privaten Anbieter und der derzeitige Standort können ebenfalls den Preis beeinflussen.

### Abstammung

**De Niro**: Ein bedeutender Hannoveraner Hengst, bekannt für seine Vererbung von Dressurtalent. De Niro hat zahlreiche Nachkommen, die im internationalen Dressursport erfolgreich sind, und ist als Vererber von Rittigkeit und Leistungsbereitschaft geschätzt.

**Schwadroneur**: Ein Hengst, der ebenfalls in der Dressurszene bekannt ist. Schwadroneur hat eine solide Nachzucht, die durch Rittigkeit und gute Grundgangarten überzeugt.

### Was den Endpreis besonders bewegt

- **Abstammung**: De Niro als Vater ist ein starker Pluspunkt für die Dressurveranlagung.
- **Ausbildungsstand**: Der Wallach ist im L-Bereich im Ansatz, was für einen 11-Jährigen relativ niedrig ist.
- **Erfolge**: Nur E-Siege und A-Platzierungen, was den Preis drückt.
- **Gesundheitsstatus**: Eine AKU ohne Befund ist ein positiver Faktor.
- **Vermarktungsweg**: Privatverkauf kann den Preis im Vergleich zu einer Auktion niedriger halten.

### Fazit

Dieser Hannoveraner Wallach hat aufgrund seiner Abstammung und seines Gesundheitsstatus Potenzial, jedoch sind der Ausbildungsstand und die bisherigen Erfolge begrenzt, was den Preis beeinflusst. Der genannte Preisbereich ist ein Orientierungswert, der je nach weiteren Informationen variieren kann.`;

export default function PdfTest() {
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
