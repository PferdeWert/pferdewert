// page pdf-test.tsx
'use client';
import dynamic from 'next/dynamic';

const PDFTestClient = dynamic(() => import('@/components/pdf-test-client'), {
  ssr: false,
});

export default function PDFTestPage() {
  return <PDFTestClient />;
}
