// frontend/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* CookieConsent Script wird erst geladen, wenn der Browser bereit ist */}
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.cookieconsent) {
            window.cookieconsent.initialise({
              type: "opt-in",
              palette: {
                popup: { background: "#ffffff", text: "#000000" },
                button: { background: "#0a74da", text: "#ffffff" },
              },
              theme: "classic",
              content: {
                message: "Wir verwenden Cookies für eine bessere Nutzererfahrung.",
                allow: "Zustimmen",
                deny: "Ablehnen",
                link: "Mehr erfahren",
                href: "/datenschutz",
              },
              onPopupOpen: () => {
                const popup = document.querySelector(".cc-window") as HTMLElement;
                if (popup) {
                  popup.style.setProperty("display", "flex", "important");
                  popup.style.setProperty("pointer-events", "auto", "important");
                  popup.style.setProperty("z-index", "9999", "important");
                }
              },
onStatusChange(status: "allow" | "deny") {
  console.log("Consent status changed:", status);
  if (status === "allow") {
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  }
}

            });
          } else {
            console.warn("CookieConsent konnte nicht initialisiert werden.");
          }
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
