// frontend/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/cookieconsent.min.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* -------------------------------------------------------------
           CookieConsent-Script
           ------------------------------------------------------------- */}
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          /* ----------------------------------------------------------
           * 1 · Helper-Funktion immer verfügbar machen
           * ---------------------------------------------------------- */
          window.showCookieSettings = () => {
            window.cookieconsent?.setStatus("deny");
            window.cookieconsent?.close();
          };

          console.log(
            "📥 CookieConsent Script geladen:",
            typeof window.cookieconsent
          );

          // Früh exitieren, falls Consent‑Cookie bereits existiert
          const consentExists = /cookieconsent_status=(allow|deny)/.test(
            document.cookie
          );
          if (consentExists) {
            console.log(
              "🍪 Consent bereits vorhanden – Initialisierung übersprungen"
            );
            return;
          }

          /* ----------------------------------------------------------
           * 2 · Banner initialisieren
           * ---------------------------------------------------------- */
          if (window.cookieconsent?.initialise) {
            window.cookieconsent.initialise({
              type: "opt-in",
              palette: {
                popup: { background: "#ffffff", text: "#000000" },
                button: { background: "#4285f4", text: "#ffffff" },
              },
              theme: "classic",
              content: {
                header:
                  "PferdeWert.de bittet um Einwilligung, Ihre personenbezogenen Daten für Folgendes zu nutzen:",
                message: `
                  <div class="consent-purposes">
                    <div class="purpose-item">
                      <div class="purpose-icon">👤</div>
                      <div>
                        <strong>Personalisierte Werbung und Inhalte</strong><br>
                        Messung von Werbeleistung und Performance von Inhalten,
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
              /* ----------------------- Callbacks ------------------- */
              onPopupOpen: () => {
                document
                  .querySelector<HTMLElement>(".cc-window")
                  ?.setAttribute("aria-live", "assertive");
                document.body.style.overflow = "hidden"; // TODO Prev‑overflow sichern
                console.log("🍪 Banner geöffnet");
              },
              onPopupClose: () => {
                document.body.style.overflow = "";
                console.log("🍪 Banner geschlossen");
              },
              onStatusChange: (status: "allow" | "deny") => {
                console.log("🍪 Status geändert:", status);
                document.body.style.overflow = "";

                const granted = status === "allow";
                window.gtag?.("consent", "update", {
                  ad_storage: granted ? "granted" : "denied",
                  analytics_storage: granted ? "granted" : "denied",
                  ad_user_data: granted ? "granted" : "denied",
                  ad_personalization: granted ? "granted" : "denied",
                });
              },
            });

            console.log("🍪 CookieConsent initialisiert");
          } else {
            console.error("❌ CookieConsent nicht gefunden");
          }
        }}
      />

      {/* Haupt‑Komponente */}
      <Component {...pageProps} />
    </>
  );
}
// Note: This file is responsible for initializing the Cookie Consent banner
// and making the `showCookieSettings` function globally available.
// It also sets up Google Analytics consent management.
// The banner is configured to ask for user consent for personalized ads and content,
// and it provides options to manage cookie settings.
// The styles for the banner are imported from `globals.css` and `cookieconsent.min.css`.
// The banner will not be shown if a consent cookie already exists.
// The `gtag` function is used to update consent status in Google Analytics.
