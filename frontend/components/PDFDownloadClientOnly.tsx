'use client';

import dynamic from 'next/dynamic';
import PferdeWertPDF from './PferdeWertPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  markdownData: string;
};

const PDFDownloadClientOnly: FC<Props> = ({ markdownData }) => (
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

export default dynamic(() => Promise.resolve(PDFDownloadClientOnly), { ssr: false });
