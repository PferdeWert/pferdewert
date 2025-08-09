// pages/agb.tsx

import Layout from "@/components/Layout"; // Footer via Layout integriert

export default function AGB() {
  return (
    <Layout>
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
        E-Mail: <a href="mailto:info@pferdewert.de" className="text-blue-600 underline hover:text-blue-800">info@pferdewert.de</a>
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

      <h2 className="mt-6 text-xl font-semibold">4. Widerrufsrecht</h2>
      <p className="mb-4">
        Bei digitalen Inhalten erlischt das Widerrufsrecht, wenn mit der Ausführung des Vertrags begonnen wurde, nachdem der Nutzer ausdrücklich zugestimmt hat, dass mit der Ausführung vor Ablauf der Widerrufsfrist begonnen wird, und er seine Kenntnis davon bestätigt hat, dass er dadurch sein Widerrufsrecht verliert (§ 356 Abs. 5 BGB).
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Preise und Zahlung</h2>
      <p className="mb-4">
        Alle Preise verstehen sich in Euro. Es erfolgt kein Ausweis der Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung). Die Bezahlung erfolgt über den Zahlungsdienstleister Stripe.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Haftung</h2>
      <p className="mb-4">
        Die Inhalte der Analyse beruhen auf Algorithmen und externen Datenquellen. Eine Gewähr für deren Richtigkeit, Vollständigkeit oder Eignung für einen bestimmten Zweck wird nicht übernommen. Die Nutzung erfolgt auf eigenes Risiko.
      </p>
    </main>
    </Layout>
  );
}
