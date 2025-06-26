// frontend/pages/datenschutz.tsx
import Head from "next/head";

export default function Datenschutz() {
  return (
    <main className="prose mx-auto p-8">
      <Head>
        <title>Datenschutz | PferdeWert</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <h1>Datenschutzerklärung</h1>

      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
        verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen
        Bestimmungen (DSGVO, TKG 2003).
      </p>

      <h2>Zahlungsabwicklung über Stripe</h2>
      <p>
        Zur Abwicklung von Zahlungen nutzen wir den Dienstleister Stripe. Bei Auswahl
        der Zahlungsart "Kreditkarte" erfolgt die Zahlungsabwicklung über Stripe
        Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin,
        Irland. Dabei werden Ihre Zahlungsdaten direkt an Stripe übermittelt und dort
        verarbeitet. Die Übermittlung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs.
        1 lit. b DSGVO (Verarbeitung zur Vertragserfüllung) sowie auf Grundlage eines
        berechtigten Interesses an einer sicheren und effizienten Zahlungsabwicklung
        gemäß Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe unter:
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
          https://stripe.com/privacy
        </a>
      </p>

      <h2>Kontakt mit uns</h2>
      <p>
        Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen,
        werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir nicht
        ohne Ihre Einwilligung weiter.
      </p>
    </main>
  );
}
