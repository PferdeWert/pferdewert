// page pdf-test.tsx
'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const PDFTestClient = dynamic(() => import('@/components/pdf-test-client'), {
  ssr: false,
});

export default function PDFTestPage() {
  return (
    <>
      <Head>
        <title>PDF Test | PferdeWert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PDFTestClient />
    </>
  );
}
