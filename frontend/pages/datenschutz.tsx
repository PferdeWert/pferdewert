export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Datenschutzerklärung</h1>

      <p className="mb-4">
        Wir freuen uns über Ihr Interesse an PferdeWert. Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten im Rahmen unseres Onlineangebots.
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Verantwortliche Stelle</h2>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg 17B<br />
        70619 Stuttgart<br />
        E-Mail:&nbsp;
        <a href="mailto:info@pferdewert.de" className="text-blue-600 underline hover:text-blue-800">
          info@pferdewert.de
        </a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Zugriffsdaten und Hosting</h2>
      <p className="mb-4">
        Unsere Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf unserer Website werden automatisch Informationen erfasst (z. B. IP-Adresse, Browsertyp, Uhrzeit). Diese Daten dienen der technischen Sicherheit. Mit Vercel besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Die Übertragung der Daten in die USA erfolgt auf Basis von Standardvertragsklauseln.
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Nutzung von Google Analytics</h2>
      <p className="mb-4">
        Diese Website verwendet Google Analytics, einen Webanalysedienst der Google LLC ("Google"). Google Analytics verwendet sogenannte "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und eine Analyse der Benutzung der Website ermöglichen.
      </p>
      <p className="mb-4">
        Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung auf dieser Website aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.
      </p>
      <p className="mb-4">
        Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich nutzen können.
      </p>
      <p className="mb-4">
        Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Add-on herunterladen und installieren:{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          https://tools.google.com/dlpage/gaoptout
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Kontaktaufnahme</h2>
      <p className="mb-4">
        Wenn Sie uns per E-Mail kontaktieren, werden Ihre angegebenen Daten zur Bearbeitung der Anfrage genutzt. Ohne Ihre Einwilligung erfolgt keine Speicherung dieser Daten über die Bearbeitung hinaus.
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Ihre Rechte</h2>
      <p className="mb-4">
        Sie haben jederzeit das Recht auf Auskunft über die bezüglich Ihrer Person gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung. Sie haben das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Sie können eine erteilte Einwilligung zur Datenverarbeitung jederzeit widerrufen. Bitte wenden Sie sich dazu an unsere oben genannte Kontaktadresse.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Datenübermittlung in Drittländer</h2>
      <p className="mb-4">
        Datenübermittlungen in Länder außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums erfolgen nur, wenn dies gesetzlich erlaubt ist oder Sie eingewilligt haben. Bei Übermittlungen in die USA verwenden wir Standardvertragsklauseln als Schutzmaßnahme.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Speicherdauer</h2>
      <p className="mb-4">
        Personenbezogene Daten werden nur so lange gespeichert, wie es für den Zweck der Verarbeitung erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
      </p>

      <p className="mt-6 text-xs text-gray-500">
        Diese Datenschutzerklärung wurde zuletzt am 26.06.2025 aktualisiert.
      </p>
    </main>
  );
}
