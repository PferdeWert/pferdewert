// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import Script from "next/script";

// Add a TypeScript declaration for window.cookieconsent


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("📥 CookieConsent Script geladen:", typeof window.cookieconsent);

          const existingConsent =
            document.cookie.includes("cookieconsent_status=allow") ||
            document.cookie.includes("cookieconsent_status=deny");

          if (existingConsent) {
            console.log("🍪 Bereits bestehender Consent erkannt, Initialisierung übersprungen");
            return;
          }

          if (window.cookieconsent) {
          const cookieConsent = window.cookieconsent as { initialise?: (config: unknown) => void };
          cookieConsent.initialise?.({
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
              cookie: {
                name: "cookieconsent_status",
                path: "/",
                expiryDays: 365,
                sameSite: "Lax", // oder "None" + secure wenn Cross-Site nötig
                secure: true,    // notwendig bei HTTPS (Vercel = ✅)
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

                const popup = document.querySelector(".cc-window") as HTMLElement;
                if (popup) {
                  popup.classList.add("opacity-0", "transition-opacity", "duration-200");
                  setTimeout(() => popup.remove(), 200);
                }
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
