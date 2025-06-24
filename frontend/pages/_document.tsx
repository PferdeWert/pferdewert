import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        {/* Silktide Consent Manager (Open Source Version) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          data-cfasync="false"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", function(){
                window.cookieconsent.initialise({
                  palette: {
                    popup: {
                      background: "#fff",
                      text: "#000"
                    },
                    button: {
                      background: "#007bff",
                      text: "#fff"
                    }
                  },
                  theme: "classic",
                  position: "bottom-right",
                  type: "opt-in",
                  content: {
                    message: "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.",
                    dismiss: "Nur notwendige",
                    allow: "Alle akzeptieren",
                    deny: "Ablehnen",
                    link: "Mehr erfahren",
                    href: "/datenschutz"
                  },
                  onInitialise: function (status) {
                    if (this.hasConsented()) {
                      // Cookies aktivieren (z. B. Google Analytics)
                    }
                  },
                  onStatusChange: function(status, chosenBefore) {
                    if (this.hasConsented()) {
                      // Cookies aktivieren
                    } else {
                      // Cookies blockieren
                    }
                  }
                });
              });
            `
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
