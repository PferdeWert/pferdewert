// frontend/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/cookieconsent@3.1.1/build/cookieconsent.min.css"
/>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
