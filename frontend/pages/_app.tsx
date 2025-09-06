// frontend/pages/_app.tsx
import "@/styles/globals.css";
// ✅ LIGHTHOUSE OPTIMIZED: cookieconsent.min.css now loaded via CDN with source maps
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { JSX } from "react";
import { validateEnvironment, validateStripeConfiguration } from "@/lib/env-validation";

// Validate environment on server startup (API routes only)
if (typeof window === "undefined") {
  try {
    validateEnvironment();
    validateStripeConfiguration();
  } catch (error) {
    console.error("❌ Environment validation failed:", error);
    process.exit(1); // Fail fast on missing env vars
  }
}

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