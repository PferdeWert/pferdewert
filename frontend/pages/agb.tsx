// pages/agb.tsx

export default function AGB() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <p className="mb-4">
        Diese AGB gelten für alle Verträge, die über die Website <strong>pferdewert.de</strong> zwischen der
        PferdeWert GbR und Verbraucher:innen abgeschlossen werden.
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Anbieter</h2>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg 17B<br />
        70619 Stuttgart<br />
        E-Mail:{" "}
        <a href="mailto:info@pferdewert.de" className="text-blue-600 underline hover:text-blue-800">
          info@pferdewert.de
        </a>
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Leistungen</h2>
      <p className="mb-4">
        Über die Website wird eine einmalige, KI-basierte Analyse für Pferde angeboten. Das Ergebnis basiert auf den vom
        Nutzer bereitgestellten Angaben und stellt keine tierärztliche oder rechtsverbindliche Bewertung dar.
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Vertragsschluss</h2>
      <p className="mb-4">
        Der Vertrag kommt zustande, indem der Kunde im Stripe-Zahlungsprozess auf „Jetzt bezahlen“ klickt. Mit Abschluss der
        Zahlung wird der digitale Inhalt freigeschaltet bzw. angezeigt.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Preise und Zahlung</h2>
      <p className="mb-4">
        Alle Preise verstehen sich als Endpreise in Euro. Die Zahlungsabwicklung erfolgt über Stripe. Es gelten deren
        Nutzungsbedingungen.
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Lieferung und Nutzung</h2>
      <p className="mb-4">
        Das Analyseergebnis wird nach Zahlung direkt im Browser angezeigt. Es erfolgt kein physischer Versand.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Widerrufsrecht</h2>
      <p className="mb-4">
        Bei digitalen Inhalten, die unmittelbar nach Vertragsschluss bereitgestellt werden, erlischt das Widerrufsrecht,
        sobald die Ausführung beginnt (§ 356 Abs. 5 BGB). Nutzer:innen stimmen dem durch den Klick auf „Jetzt bezahlen“ zu.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Haftungsausschluss</h2>
      <p className="mb-4">
        Die Analyse stellt keine tierärztliche Untersuchung dar. Für die Richtigkeit oder Vollständigkeit der Bewertung
        wird keine Haftung übernommen. Die Nutzung erfolgt auf eigenes Risiko.
      </p>

      <h2 className="mt-6 text-xl font-semibold">8. Schlussbestimmungen</h2>
      <p className="mb-4">
        Es gilt deutsches Recht. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Gültigkeit der übrigen AGB unberührt.
      </p>
    </main>
  );
}
