// frontend/pages/_app.tsx
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

          const existingConsent =
            document.cookie.includes("cookieconsent_status=allow") ||
            document.cookie.includes("cookieconsent_status=deny");

          if (existingConsent) {
            console.log("🍪 Bereits bestehender Consent erkannt, Initialisierung übersprungen");
            return;
          }

          if (window.cookieconsent) {
            // TypeScript-sicher: Verwende die bestehenden Deklarationen
            const cookieConsent = window.cookieconsent as Record<string, unknown>;
            const initialise = cookieConsent.initialise as ((config: Record<string, unknown>) => void) | undefined;
            
            initialise?.({
              type: "opt-in",
              palette: {
                popup: { background: "#ffffff", text: "#000000" },
                button: { background: "#4285f4", text: "#ffffff" },
              },
              theme: "classic",
              content: {
                header: "PferdeWert.de bittet um Einwilligung, Ihre personenbezogenen Daten für Folgendes zu nutzen:",
                message: `
                  <div class="consent-purposes">
                    <div class="purpose-item">
                      <div class="purpose-icon">👤</div>
                      <div>
                        <strong>Personalisierte Werbung und Inhalte</strong><br>
                        Messung von Werbeleistung und der Performance von Inhalten,
                        Zielgruppenforschung sowie Entwicklung und Verbesserung von Angeboten
                      </div>
                    </div>
                    <div class="purpose-item">
                      <div class="purpose-icon">💾</div>
                      <div>
                        <strong>Speichern von oder Zugriff auf Informationen auf einem Endgerät</strong>
                      </div>
                    </div>
                    <div class="purpose-item">
                      <div class="purpose-icon">⚙️</div>
                      <div>
                        <strong>Weitere Informationen</strong>
                      </div>
                    </div>
                  </div>
                `,
                allow: "Einwilligen",
                deny: "Optionen verwalten",
                link: "Mehr erfahren",
                href: "/datenschutz",
              },
              elements: {
                header: '<div class="cc-header">{{header}}</div>',
                message: '<div class="cc-message">{{message}}</div>',
                messagelink: '<div class="cc-message">{{message}}</div>',
                allow: '<button class="cc-btn cc-allow">{{allow}}</button>',
                deny: '<button class="cc-btn cc-deny" onclick="showCookieSettings()">{{deny}}</button>',
                link: '<a class="cc-link" href="{{href}}" target="_blank" rel="noopener">{{link}}</a>',
              },
              window: `
                <div role="dialog" aria-live="polite" aria-label="cookieconsent" class="cc-window {{classes}}">
                  <div class="cc-logo">
                    <img src="/logo.png" alt="PferdeWert Logo" />
                  </div>
                  {{children}}
                </div>
              `,
              compliance: {
                "opt-in": '<div class="cc-compliance">{{deny}}{{allow}}</div>',
              },
              cookie: {
                name: "cookieconsent_status",
                path: "/",
                expiryDays: 365,
                sameSite: "Lax",
                secure: true,
              },
              onPopupOpen: () => {
                const popup = document.querySelector(".cc-window") as HTMLElement;
                if (popup) {
                  popup.setAttribute("role", "dialog");
                  popup.setAttribute("aria-live", "assertive");
                  // Verhindere Scrollen im Hintergrund auf Mobile
                  document.body.style.overflow = "hidden";
                }
                console.log("🍪 Cookie Banner geöffnet");
              },
              onPopupClose: () => {
                // Scrolling wieder aktivieren
                document.body.style.overflow = "";
                console.log("🍪 Cookie Banner geschlossen");
              },
              onStatusChange: (status: string) => {
                console.log("🍪 Status geändert:", status);
                
                // Scrolling wieder aktivieren
                document.body.style.overflow = "";

                if (status === "allow") {
                  if (window.gtag) {
                    window.gtag("consent", "update", {
                      ad_storage: "granted",
                      analytics_storage: "granted",
                      ad_user_data: "granted",
                      ad_personalization: "granted",
                    });
                  }
                  console.log("✅ Alle Cookies zugelassen");
                } else {
                  if (window.gtag) {
                    window.gtag("consent", "update", {
                      ad_storage: "denied",
                      analytics_storage: "denied",
                      ad_user_data: "denied",
                      ad_personalization: "denied",
                    });
                  }
                  console.log("❌ Cookies abgelehnt");
                }
              },
            });

            // Globale Funktion für Cookie-Settings
              (window as unknown as Record<string, unknown>).showCookieSettings = () => {
              if (window.cookieconsent) {
                const cc = window.cookieconsent as Record<string, unknown>;
                const setStatus = cc.setStatus as ((status: string) => void) | undefined;
                const close = cc.close as (() => void) | undefined;
                
                setStatus?.("deny");
                close?.();
              }
            };

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