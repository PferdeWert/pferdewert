// frontend/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
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
