// frontend/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadGtag = () => {
        const gtagScript = document.createElement("script");
        gtagScript.setAttribute("async", "true");
        gtagScript.src =
          "https://www.googletagmanager.com/gtag/js?id=G-ZCQ4Z3PKND";
        document.head.appendChild(gtagScript);

        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZCQ4Z3PKND');
        `;
        document.head.appendChild(inlineScript);
      };

      const runConsent = () => {
        window.cookieconsent.initialise({
          palette: {
            popup: {
              background: "#fff",
              text: "#000",
            },
            button: {
              background: "#007bff",
              text: "#fff",
            },
          },
          theme: "classic",
          position: "bottom-right",
          type: "opt-in",
          content: {
            message:
              "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.",
            dismiss: "Nur notwendige",
            allow: "Alle akzeptieren",
            deny: "Ablehnen",
            link: "Mehr erfahren",
            href: "/datenschutz",
          },
          onInitialise() {
            if (this.hasConsented()) {
              loadGtag();
            }
          },
          onStatusChange() {
            if (this.hasConsented()) {
              loadGtag();
            }
          },
        });
      };

      if (window.cookieconsent) {
        runConsent();
      } else {
        const interval = setInterval(() => {
          if (window.cookieconsent) {
            clearInterval(interval);
            runConsent();
          }
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
      />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
