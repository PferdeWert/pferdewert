// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { JSX } from "react";

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