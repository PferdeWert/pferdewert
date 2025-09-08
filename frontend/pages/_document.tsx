// frontend/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* ===== OPTIMIERTE FAVICONS (ersetzt alte favicon.png) ===== */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color für Mobile Browser */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />
        
        {/* Preload wichtiger Fonts für bessere Performance */}
        <link
          rel="preload"
          href="/fonts/playfair-display-v39-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/lato-v24-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Merriweather für Headlines - with swap for fast loading */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
          media="print"
          onLoad={(e: React.SyntheticEvent<HTMLLinkElement>) => {
            const target = e.currentTarget;
            target.media = 'all';
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
          />
        </noscript>
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