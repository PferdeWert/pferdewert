// Lazy-loaded wrapper for PDFDownloadLink to reduce bundle size
import dynamic from 'next/dynamic';

// Dynamic import only loads @react-pdf/renderer when this component is used
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
      >
        PDF wird vorbereitet...
      </button>
    ),
  }
);

export default PDFDownloadLink;
