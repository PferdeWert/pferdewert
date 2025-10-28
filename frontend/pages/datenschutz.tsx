// frontend/pages/datenschutz.tsx
import Head from "next/head";
import Layout from "@/components/Layout";

export default function Datenschutz() {
  return (
    <Layout>
      <Head>
        <title>Datenschutz | PferdeWert</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="prose mx-auto px-4 py-12">
        <h1>Datenschutzerklärung</h1>

        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher
          ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
        </p>

        <h2>Zahlungsabwicklung über Stripe</h2>
        <p>
          Zur Abwicklung von Zahlungen nutzen wir den Dienstleister Stripe. Bei Auswahl der Zahlungsart
          &quot;Kreditkarte&quot; erfolgt die Zahlungsabwicklung über Stripe Payments Europe, Ltd., 1 Grand Canal Street
          Lower, Grand Canal Dock, Dublin, Irland. Dabei werden Ihre Zahlungsdaten direkt an Stripe übermittelt
          und dort verarbeitet. Die Übermittlung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
          (Verarbeitung zur Vertragserfüllung) sowie auf Grundlage eines berechtigten Interesses an einer
          sicheren und effizienten Zahlungsabwicklung gemäß Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe unter:
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
            https://stripe.com/privacy
          </a>
        </p>

        <h2>Kontakt mit uns</h2>
        <p>
          Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen
          Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns
          gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>

        <h2>Analyse und Tracking</h2>
        <p>
          Zur Verbesserung unserer Website nutzen wir folgende Analyse-Tools mit Ihrer ausdrücklichen Einwilligung:
        </p>

        <h3>Google Analytics 4</h3>
        <p>
          Wir nutzen Google Analytics 4 zur Analyse der Website-Nutzung. Dieser Dienst wird nur mit Ihrer
          ausdrücklichen Einwilligung geladen. Dabei werden Daten zu Google in die USA übertragen.
          Die Datenübertragung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          Weitere Informationen finden Sie in der{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Google Datenschutzerklärung
          </a>
          .
        </p>

        <h3>DataFa.st Analytics</h3>
        <p>
          Alternativ verwenden wir DataFa.st für DSGVO-konforme Webanalytics. Diese Daten werden
          ausschließlich in der EU verarbeitet und anonymisiert gespeichert. Die Nutzung erfolgt
          nur mit Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
        </p>

        <h3>Cookies</h3>
        <p>
          Wir setzen folgende Cookies ein:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>pferdewert_cookie_consent</strong>: Speichert Ihre Cookie-Einwilligung (Laufzeit: 1 Jahr)</li>
          <li><strong>Google Analytics Cookies</strong>: Tracking-Cookies zur Analyse (nur mit Einwilligung)</li>
        </ul>
      </main>
    </Layout>
  );
}
