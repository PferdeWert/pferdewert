// frontend/pages/zertifikat-preview.tsx
// Preview für das Wertgutachten PDF

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import QRCode from 'qrcode';
import Layout from '@/components/Layout';
import type { ZertifikatData } from '@/components/VerkaufsZertifikatPDF';

// Lazy load PDF components
const VerkaufsZertifikatPDF = dynamic(
  () => import('@/components/VerkaufsZertifikatPDF'),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

export default function ZertifikatPreview() {
  const [isClient, setIsClient] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Beispieldaten
  const zertifikatNummer = 'CERT-2025-000847';
  const verifyUrl = `https://pferdewert.de/verify/${zertifikatNummer}`;

  useEffect(() => {
    setIsClient(true);

    // QR-Code generieren
    QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: '#1a365d', light: '#ffffff' }
    }).then(setQrCodeDataUrl);
  }, [verifyUrl]);

  const beispielDaten: ZertifikatData = {
    zertifikatNummer,
    ausstellungsDatum: new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    pferdeName: 'De Niro\'s Legacy',
    rasse: 'Hannoveraner',
    alter: '11',
    geschlecht: 'Wallach',
    stockmass: '168',
    ausbildung: 'L-Dressur',
    aku: 'Ohne Befund',
    haupteignung: 'Dressur / Vielseitigkeit',
    abstammung: 'De Niro x Schwadroneur',
    preisVon: 14000,
    preisBis: 16000,
    qrCodeDataUrl,
    bewertungsDetails: {
      rasseText: 'Hannoveraner sind die führende deutsche Warmblutrasse im Dressursport. Die Zuchtrichtung garantiert Rittigkeit, Leistungsbereitschaft und solides Temperament. Dies rechtfertigt einen Preisaufschlag von etwa 15-20% gegenüber weniger etablierten Rassen.',
      abstammungText: 'De Niro (De Niro - Donnerhall) ist ein Ausnahmevererber der modernen Dressurpferdezucht. Als Bundeschampion und Weltmeister der jungen Dressurpferde prägte er die hannoveranische Zucht nachhaltig. Seine Nachkommen zeichnen sich durch überdurchschnittliche Bewegungsqualität, Rittigkeit und Arbeitseinstellung aus. Die Mutterlinie (Schwadroneur) verstärkt die genetische Qualität zusätzlich.',
      ausbildungText: 'Der Ausbildungsstand auf L-Niveau ist solide, jedoch nicht herausragend. Potenzial für weitere Ausbildungsschritte bis M-Niveau ist vorhanden, was den Wert stabilisiert und das Pferd für ambitionierte Käufer attraktiv macht.',
      gesundheitText: 'Der AKU-Bericht ohne Befund ist ein sehr positiver Faktor, der das Vertrauen potenzieller Käufer stärkt. Dies ist besonders bei einem 11-jährigen Pferd ein wichtiges Verkaufsargument und rechtfertigt den angesetzten Preis.',
      fazit: 'Der Hannoveraner Wallach bietet ein hervorragendes Preis-Leistungs-Verhältnis für Käufer, die ein verlässliches und gut ausgebildetes Dressurpferd mit Entwicklungspotenzial suchen. Die renommierte De Niro-Abstammung und der einwandfreie Gesundheitszustand rechtfertigen den angesetzten Marktwert.',
    },
  };

  return (
    <Layout>
      <Head>
        <title>Wertgutachten Preview | PferdeWert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-white font-bold text-xl">Wertgutachten Preview</h1>
                  <p className="text-amber-200 text-sm">2 Seiten · Mit Logo & QR-Code</p>
                </div>
                {isClient && qrCodeDataUrl && (
                  <PDFDownloadLink
                    document={<VerkaufsZertifikatPDF data={beispielDaten} variante="ausfuehrlich" />}
                    fileName="PferdeWert-Wertgutachten.pdf"
                    className="px-4 py-2 bg-white text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    {({ loading }) => (loading ? 'Lädt...' : 'PDF Download')}
                  </PDFDownloadLink>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Beispiel-Pferd:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div><span className="font-medium">Name:</span> {beispielDaten.pferdeName}</div>
                  <div><span className="font-medium">Rasse:</span> {beispielDaten.rasse}</div>
                  <div><span className="font-medium">Alter:</span> {beispielDaten.alter} Jahre</div>
                  <div><span className="font-medium">Ausbildung:</span> {beispielDaten.ausbildung}</div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">Ermittelter Marktwert:</h3>
                <p className="text-2xl font-bold text-amber-900">
                  {beispielDaten.preisVon?.toLocaleString('de-DE')} € – {beispielDaten.preisBis?.toLocaleString('de-DE')} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
