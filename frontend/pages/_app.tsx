// frontend/pages/_app.tsx

import "@/styles/globals.css";
// ✅ LIGHTHOUSE OPTIMIZED: cookieconsent.min.css loaded in _document.tsx local
import type { AppProps } from "next/app";
import { JSX } from "react";
import { Analytics } from "@vercel/analytics/next";

// FAST REFRESH FIX: Regular import instead of dynamic to prevent infinite loop
// SimpleCookieConsent already uses useEffect which only runs on client side
import SimpleCookieConsent from "@/components/SimpleCookieConsent";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <SimpleCookieConsent />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}