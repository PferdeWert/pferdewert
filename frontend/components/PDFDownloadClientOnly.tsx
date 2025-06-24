'use client';

import PferdeWertPDF from './PferdeWertPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

type Props = {
  markdownData: string;
};

export default function PDFDownloadClientOnly({ markdownData }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <PDFDownloadLink
      document={<PferdeWertPDF markdownData={markdownData} />}
      fileName="pferdebewertung.pdf"
    >
      {({ loading }) => (
        <button className="rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition">
          {loading ? 'Lade PDF...' : '🧞 PDF herunterladen'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
