// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";

// DEBUG: Import testen
console.log("🔥 Starting imports...");
try {
  const CookieConsent = require("@/components/CookieConsent/CookieConsent");
  console.log("🔥 CookieConsent imported:", typeof CookieConsent.default);
} catch (error) {
  console.error("❌ Import failed:", error);
}

import CookieConsent from "@/components/CookieConsent/CookieConsent";

export default function App({ Component, pageProps }: AppProps) {
  console.log("🔥 App rendering, CookieConsent type:", typeof CookieConsent);
  
  return (
    <>
      {/* Cookie Consent Banner */}
      <CookieConsent 
        onAccept={() => {
          console.log("🍪 Analytics accepted");
        }}
        onDecline={() => {
          console.log("🍪 Analytics declined");
        }}
      />
      
      {/* Main Application */}
      <Component {...pageProps} />
    </>
  );
}