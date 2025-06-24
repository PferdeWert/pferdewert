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
        Bei Kontakt per E-Mail werden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht gespeichert, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Verarbeitung personenbezogener Daten bei Nutzung der KI-Funktion</h2>
      <p className="mb-4">
        Wenn Sie eine Pferdebewertung auf unserer Website anfordern, verarbeiten wir die von Ihnen eingegebenen Daten (z. B. Name, Alter, Rasse, Disziplin des Pferdes), um die Bewertung durchzuführen. Diese Daten werden an die Server unseres technischen Dienstleisters <strong>OpenAI, L.L.C.</strong> in den USA übermittelt, da dort die KI-Verarbeitung erfolgt. Die Übermittlung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 46 Abs. 2 lit. c DSGVO (Standardvertragsklauseln).
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Zahlungsabwicklung über Stripe</h2>
      <p className="mb-4">
        Für kostenpflichtige Bewertungen nutzen wir den Zahlungsdienstleister <strong>Stripe Payments Europe Ltd.</strong> (Irland). Bei einem Kaufvorgang werden Daten wie Name, E-Mail-Adresse und Zahlungsinformationen an Stripe übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Stripe verarbeitet Ihre Daten auch in den USA. Es bestehen EU-Standardvertragsklauseln mit Stripe.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Speicherdauer</h2>
      <p className="mb-4">
        Ihre Bewertungsdaten werden für die Dauer der gesetzlichen Aufbewahrungsfrist gespeichert oder bis Sie deren Löschung verlangen (sofern dem keine rechtlichen Pflichten entgegenstehen).
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Ihre Rechte</h2>
      <p className="mb-4">
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Datenübertragbarkeit Ihrer gespeicherten personenbezogenen Daten. Sie können sich bei einer Aufsichtsbehörde beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung gegen Datenschutzrecht verstößt.
      </p>

      <h2 className="mt-6 text-xl font-semibold">8. Cookies & Tracking</h2>
<p className="mb-4">
  Unsere Website verwendet Cookies, um bestimmte Funktionen bereitzustellen und das Nutzerverhalten auszuwerten. Dies geschieht nur mit Ihrer ausdrücklichen Einwilligung über unseren Cookie-Banner.
</p>
<p className="mb-4">
  Für die Analyse nutzen wir den Dienst <strong>Google Analytics</strong> der Google Ireland Ltd. Die Datenverarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
</p>
<p className="mb-4">
  Google Analytics verwendet Cookies, um Informationen über die Nutzung unserer Website zu erfassen und pseudonymisierte Nutzungsstatistiken zu erstellen. Die gewonnenen Informationen können an Server von Google LLC in den USA übertragen und dort gespeichert werden. Wir nutzen Google Analytics ausschließlich mit IP-Anonymisierung und auf Basis von EU-Standardvertragsklauseln.
</p>
<p className="mb-4">
  Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen.
</p>

    </main>
  );
}
