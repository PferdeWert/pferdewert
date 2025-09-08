// frontend/pages/_app.tsx
import "@/styles/globals.css";
// ✅ LIGHTHOUSE OPTIMIZED: cookieconsent.min.css now loaded via CDN with source maps
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { JSX } from "react";

// Environment validation moved to API routes to prevent build failures
// The validation now happens at runtime when API routes are actually called

// Dynamic import for better performance - loads only when needed
const SimpleCookieConsent = dynamic(() => import("@/components/SimpleCookieConsent"), {
  ssr: false, // Cookie consent should only run on client side
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <SimpleCookieConsent />
      <Component {...pageProps} />
    </>
  );
}