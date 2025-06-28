// frontend/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

      const loadGtag = () => {
        if (!GA_MEASUREMENT_ID) return;

        const gtagScript = document.createElement("script");
        gtagScript.setAttribute("async", "true");
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gtagScript);

        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `;
        document.head.appendChild(inlineScript);
      };

      const runConsent = () => {
        window.cookieconsent.initialise({
  palette: {
    popup: { background: "#ffffff", text: "#000000" },
    button: { background: "#007bff", text: "#ffffff" },
  },
  theme: "classic",
  position: "bottom",
  type: "opt-in",
  content: {
    message:
      "Wir verwenden Cookies, um die Nutzung dieser Website zu analysieren und unser Angebot zu verbessern. Sie entscheiden, welche Cookies Sie zulassen.",
    dismiss: "Nur essenzielle",
    allow: "Alle akzeptieren",
    deny: "Ablehnen",
    link: "Datenschutzerklärung",
    href: "/datenschutz",
  },
  
  onPopupOpen() {
    const popup = document.querySelector(".cc-window");
    if (popup) {
      popup.setAttribute("role", "dialog");
      popup.setAttribute("aria-label", "Cookie-Einstellungen");
    }
  },
  onInitialise() {
    if (this.hasConsented()) loadGtag();
  },
  onStatusChange() {
    if (this.hasConsented()) loadGtag();
  },
});

      };

      const waitForCookieConsent = (callback: () => void) => {
        if (window.cookieconsent) {
          callback();
        } else {
          const interval = setInterval(() => {
            if (window.cookieconsent) {
              clearInterval(interval);
              callback();
            }
          }, 100);
        }
      };

      waitForCookieConsent(runConsent);
    }
  }, []);

  return (
    <>
      <Script
  strategy="afterInteractive"
  src="/js/cookieconsent.min.js"
/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
