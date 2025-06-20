// pages/datenschutz.tsx
export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Datenschutzerklärung</h1>

      <p className="mb-4">
        Wir freuen uns über Ihr Interesse an PferdeWert. Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend
        informieren wir Sie über die Art, den Umfang und Zweck der Erhebung und Verwendung personenbezogener Daten im Rahmen
        unseres Onlineangebots.
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Verantwortliche Stelle</h2>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg&nbsp;17B<br />
        70619&nbsp;Stuttgart<br />
        E-Mail:&nbsp;
        <a href="mailto:info@pferdewert.de" className="text-blue-600 underline hover:text-blue-800">info@pferdewert.de</a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Zugriffsdaten und Hosting</h2>
      <p className="mb-4">
        Unsere Website wird über den Anbieter Vercel gehostet. Beim Aufruf der Seite werden automatisch Daten wie IP-Adresse,
        Browsertyp, Betriebssystem und Zugriffszeit erfasst. Diese Informationen dienen der technischen Sicherheit und
        Optimierung des Angebots. Vercel hat seinen Sitz in den USA – wir haben mit dem Anbieter einen
        Auftragsverarbeitungsvertrag gemäß Art.&nbsp;28 DSGVO abgeschlossen.
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Datenverarbeitung bei Anfragen</h2>
      <p className="mb-4">
        Bei Kontaktaufnahme per E-Mail werden Ihre Angaben (Name, E-Mail-Adresse, Inhalt der Nachricht) ausschließlich zur
        Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Pferdebewertung</h2>
      <p className="mb-4">
        Wenn Sie über das Formular Angaben zu einem Pferd machen, werden diese Daten ausschließlich zur Erstellung einer
        Einschätzung verarbeitet und nach der Analyse nicht dauerhaft gespeichert. Das Ergebnis wird direkt im Browser
        angezeigt. Es erfolgt keine Weitergabe an Dritte.
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Einsatz von Google Analytics</h2>
      <p className="mb-4">
        Wir nutzen Google Analytics, einen Webanalysedienst der Google Ireland Limited. Google Analytics verwendet Cookies,
        um die Nutzung der Website zu analysieren. Die gesammelten Informationen werden in der Regel an Server von Google in
        den USA übertragen. Die IP-Anonymisierung ist aktiviert. Sie können der Verarbeitung widersprechen, z.&nbsp;B. durch
        ein Opt‑out‑Plugin:&nbsp;
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          https://tools.google.com/dlpage/gaoptout
        </a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Ihre Rechte</h2>
      <p className="mb-4">
        Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer
        personenbezogenen Daten. Wenden Sie sich hierzu bitte an die oben genannte Kontaktadresse.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Änderungen</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Bitte informieren Sie sich regelmäßig über
        den aktuellen Stand.
      </p>
    </main>
  );
}
