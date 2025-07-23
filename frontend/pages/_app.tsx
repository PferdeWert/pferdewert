// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import SimpleCookieConsent from "@/components/SimpleCookieConsent";
import { JSX } from "react";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <SimpleCookieConsent />
      <Component {...pageProps} />
    </>
  );
}