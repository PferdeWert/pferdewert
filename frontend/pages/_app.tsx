import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("📥 CookieConsent Script geladen:", typeof window.cookieconsent);

          if (window.cookieconsent) {
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
                  popup.setAttribute("role", "dialog");
                  popup.setAttribute("aria-live", "assertive");
                }
                console.log("🍪 Popup geöffnet");
              },
              onStatusChange(status: "allow" | "deny") {
                console.log("🍪 Status geändert:", status);
                if (status === "allow") {
                  window.gtag?.("consent", "update", {
                    ad_storage: "granted",
                    analytics_storage: "granted",
                  });
                }

                // Optional: Manuelles Entfernen, falls nötig
                setTimeout(() => {
                  const popup = document.querySelector(".cc-window");
                  if (popup && popup.classList.contains("cc-invisible") === false) {
                    popup.remove();
                  }
                }, 500);
              },
            });
            console.log("🍪 CookieConsent initialisiert");
          } else {
            console.error("❌ CookieConsent nicht gefunden");
          }
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
