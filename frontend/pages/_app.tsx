// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css"; // ✅ korrekt importiert aus /styles/
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ✅ CookieConsent Script */}
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("📥 CookieConsent Script geladen:", typeof window.cookieconsent);

          if (typeof window.cookieconsent !== "undefined") {
            const cc = window.cookieconsent.initialise({
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

                  popup.setAttribute("role", "dialog");
                  popup.setAttribute("aria-live", "assertive");
                }
                console.log("🍪 Popup geöffnet");
              },
              onStatusChange: (status: "allow" | "deny") => {
                console.log("🍪 Status geändert:", status);
                if (status === "allow") {
                  if (window.gtag) {
                    window.gtag("consent", "update", {
                      ad_storage: "granted",
                      analytics_storage: "granted",
                    });
                  } else {
                    console.warn("⚠️ gtag nicht verfügbar");
                  }
                }
              },
            });
            console.log("🍪 CookieConsent initialisiert:", cc);
          } else {
            console.error("❌ CookieConsent nicht gefunden");
          }
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
