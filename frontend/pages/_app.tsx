// frontend/pages/_app.tsx

import "@/styles/globals.css";
// ✅ LIGHTHOUSE OPTIMIZED: cookieconsent.min.css loaded in _document.tsx local
import type { AppProps } from "next/app";
import { JSX, useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';

// FAST REFRESH FIX: Regular import instead of dynamic to prevent infinite loop
// SimpleCookieConsent already uses useEffect which only runs on client side
import SimpleCookieConsent from "@/components/SimpleCookieConsent";

// Import messages for each locale
import deMessages from '@/messages/de/common.json';
import deATMessages from '@/messages/de-AT/common.json';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [locale, setLocale] = useState<'de' | 'de-AT'>('de');

  // Client-side locale detection to avoid hydration mismatch
  useEffect(() => {
    const pathname = window.location.pathname;
    const isAustria = pathname.startsWith('/at');
    setLocale(isAustria ? 'de-AT' : 'de');
  }, []);

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