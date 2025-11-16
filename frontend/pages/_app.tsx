// frontend/pages/_app.tsx

import "@/styles/globals.css";
// ✅ LIGHTHOUSE OPTIMIZED: cookieconsent.min.css loaded in _document.tsx local
import type { AppProps } from "next/app";
import { JSX } from "react";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

// FAST REFRESH FIX: Regular import instead of dynamic to prevent infinite loop
// SimpleCookieConsent already uses useEffect which only runs on client side
import SimpleCookieConsent from "@/components/SimpleCookieConsent";

// Import messages for each locale
import deMessages from '@/messages/de/common.json';
import deATMessages from '@/messages/de-AT/common.json';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  // Detect locale from URL pathname
  const isAustria = router.pathname.startsWith('/at') || router.asPath.startsWith('/at');
  const locale = isAustria ? 'de-AT' : 'de';

  // Merge messages: de-AT falls back to de for missing keys
  const messages = locale === 'de-AT'
    ? { ...deMessages, ...deATMessages }
    : deMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SimpleCookieConsent />
      <Component {...pageProps} />
      <Analytics />
    </NextIntlClientProvider>
  );
}