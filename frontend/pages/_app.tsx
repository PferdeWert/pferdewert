// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

export default function App({ Component, pageProps }: AppProps) {
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