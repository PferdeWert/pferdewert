// Datei: frontend/pages/pdf-test-client.tsx

'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from "next/head";
import BewertungLayout from "@/components/BewertungLayout";

// Lazy load PDF component to avoid loading @react-pdf/renderer on all pages
const PferdeWertPDF = dynamic(() => import("@/components/PferdeWertPDF"), {
  ssr: false,
});
// Lazy-loaded to reduce main bundle size (-347 KB!)
import PDFDownloadLink from "@/components/LazyPDFDownload";

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

export default function PDFTestClient() {
  // Memoize PDF document to prevent Fast Refresh infinite loops
  const pdfDocument = useMemo(
    () => <PferdeWertPDF markdownData={sampleText} />,
    []
  );

  return (
    <>
      <Head>
        <title>PDF Test</title>
      </Head>
      <BewertungLayout title="PDF-Layout Vorschau">
        <div className="prose max-w-3xl">
          <h1>PDF Test</h1>
          <p>Hier kannst du das neue PDF-Layout testen:</p>
          <PDFDownloadLink
            document={pdfDocument}
            fileName="pferdewert-analyse.pdf"
          >
            {({ loading }) => (
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                {loading ? 'Lade PDF...' : '🧞 PDF herunterladen'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </BewertungLayout>
    </>
  );
}
