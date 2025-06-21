// pages/datenschutz.tsx

export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Datenschutzerklärung</h1>

      <p className="mb-4">
        Wir freuen uns über Ihr Interesse an PferdeWert. Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend
        informieren wir Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten im Rahmen unseres Onlineangebots.
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Verantwortliche Stelle</h2>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg 17B<br />
        70619 Stuttgart<br />
        E-Mail:&nbsp;
        <a href="mailto:info@pferdewert.de" className="text-blue-600 underline hover:text-blue-800">info@pferdewert.de</a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Zugriffsdaten und Hosting</h2>
      <p className="mb-4">
        Unsere Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf unserer Website werden automatisch Informationen erfasst
        (z. B. IP-Adresse, Browsertyp, Uhrzeit). Diese Daten dienen der technischen Sicherheit. Mit Vercel besteht ein
        Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Kontaktaufnahme</h2>
      <p className="mb-4">
        Bei Kontakt per E-Mail werden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Pferdebewertung</h2>
      <p className="mb-4">
        Die von Ihnen übermittelten Informationen zur Pferdebewertung werden ausschließlich zur automatisierten Analyse verwendet.
        Es erfolgt keine dauerhafte Speicherung oder Weitergabe der Daten.
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Zahlungsabwicklung über Stripe</h2>
      <p className="mb-4">
        Zur Zahlungsabwicklung nutzen wir Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland. Stripe verarbeitet
        personenbezogene Daten wie Name, E-Mail-Adresse, Zahlungsdetails und IP-Adresse. Weitere Informationen finden Sie in der
        <a
          href="https://stripe.com/de/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          &nbsp;Datenschutzerklärung von Stripe
        </a>.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Einsatz von Google Analytics</h2>
      <p className="mb-4">
        Unsere Website nutzt Google Analytics (Google Ireland Ltd.) zur anonymisierten Reichweitenanalyse. Google verwendet Cookies,
        um Informationen über die Nutzung der Website zu sammeln. Die IP-Anonymisierung ist aktiviert. Die Datenverarbeitung erfolgt
        nur nach ausdrücklicher Zustimmung im Rahmen unseres Cookie-Hinweises. Widerspruchsmöglichkeit:
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          &nbsp;https://tools.google.com/dlpage/gaoptout
        </a>.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Ihre Rechte</h2>
      <p className="mb-4">
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten. Bitte wenden Sie sich
        dazu an die oben genannte Kontaktadresse.
      </p>

      <h2 className="mt-6 text-xl font-semibold">8. Änderungen</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, z. B. bei neuen gesetzlichen Vorgaben oder technischen Änderungen.
        Bitte informieren Sie sich regelmäßig über den aktuellen Stand.
      </p>
    </main>
  );
}
