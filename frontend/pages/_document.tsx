// frontend/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Performance: Preconnect für externe Ressourcen */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://datafa.st" />
        <link rel="dns-prefetch" href="https://checkout.stripe.com" />

        {/* DataFa.st Queue Script - Must load early to capture events */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.datafast = window.datafast || function() {
                (window.datafast.q = window.datafast.q || []).push(arguments);
              };
            `,
          }}
        />

        {/* ===== OPTIMIERTE FAVICONS (ersetzt alte favicon.png) ===== */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color für Mobile Browser */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />


        {/* Cookie Consent CSS - Self-hosted für Performance */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          rel="stylesheet"
          href="/css/cookieconsent.min.css"
        />
      </Head>
      <body className="antialiased">
        <noscript>
          <div
            role="alert"
            aria-live="assertive"
            style={{
              background: "#fff",
              color: "#000",
              padding: "1rem",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: "sans-serif",
              zIndex: 9999,
            }}
          >
            Diese Website benötigt JavaScript für die Cookie-Einstellungen. Bitte aktivieren Sie JavaScript in Ihrem Browser.
          </div>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
