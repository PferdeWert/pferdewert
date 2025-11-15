// frontend/pages/_app.tsx
// ===== Self-hosted Fonts für Performance (vor globals.css!) =====
import '@fontsource/merriweather/300.css';
import '@fontsource/merriweather/400.css';
import '@fontsource/merriweather/700.css';
import '@fontsource/merriweather/900.css';

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