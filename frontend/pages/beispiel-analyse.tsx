import Head from "next/head";
import Link from "next/link";

export default function BeispielAnalyse() {
  return (
    <>
      <Head>
        <title>Beispiel-Analyse – PferdeWert</title>
        <meta
          name="description"
          content="So sieht eine echte PferdeWert-Analyse aus: Beispiel-Report mit Marktwert, Analyse und Tipps zum Preis."
        />
      </Head>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Beispiel-Analyse
          </h1>

          <div className="bg-[#f8f8f6] rounded-xl shadow-md p-8 mb-8">
  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Preisspanne</h2>
  <p className="text-3xl font-bold text-blue-800 mb-6">10.000 – 15.000&nbsp;€</p>
  <p className="text-gray-700 mb-4">
    Diese Preisspanne reflektiert die unterschiedlichen Faktoren, die den Wert des Pferdes beeinflussen. Das untere Ende der Spanne berücksichtigt den Ausbildungsstand des Wallachs, der sich im L-Bereich im Ansatz befindet, sowie seine bisherigen Erfolge, die sich auf E-Siege und A-Platzierungen beschränken. Das obere Ende der Spanne könnte erreicht werden, wenn die Bewegungsqualität des Pferdes überdurchschnittlich ist und es eine besonders gute AKU vorweisen kann. Der Verkauf über einen privaten Anbieter und der derzeitige Standort können ebenfalls den Preis beeinflussen.
  </p>

  <h3 className="text-xl font-semibold mb-2 mt-6">Abstammung</h3>
  <ul className="list-disc ml-6 mb-4 text-gray-700">
    <li>
      <strong>De Niro</strong>: Ein bedeutender Hannoveraner Hengst, bekannt für seine Vererbung von Dressurtalent. De Niro hat zahlreiche Nachkommen, die im internationalen Dressursport erfolgreich sind, und ist als Vererber von Rittigkeit und Leistungsbereitschaft geschätzt.
    </li>
    <li>
      <strong>Schwadroneur</strong>: Ein Hengst, der ebenfalls in der Dressurszene bekannt ist. Schwadroneur hat eine solide Nachzucht, die durch Rittigkeit und gute Grundgangarten überzeugt.
    </li>
  </ul>

  <h3 className="text-xl font-semibold mb-2 mt-6">Was den Endpreis besonders bewegt</h3>
  <ul className="list-disc ml-6 mb-4 text-gray-700">
    <li><strong>Abstammung:</strong> De Niro als Vater ist ein starker Pluspunkt für die Dressurveranlagung.</li>
    <li><strong>Ausbildungsstand:</strong> Der Wallach ist im L-Bereich im Ansatz, was für einen 11-Jährigen relativ niedrig ist.</li>
    <li><strong>Erfolge:</strong> Nur E-Siege und A-Platzierungen, was den Preis drückt.</li>
    <li><strong>Gesundheitsstatus:</strong> Eine AKU ohne Befund ist ein positiver Faktor.</li>
    <li><strong>Vermarktungsweg:</strong> Privatverkauf kann den Preis im Vergleich zu einer Auktion niedriger halten.</li>
  </ul>

  <h3 className="text-xl font-semibold mb-2 mt-6">Fazit</h3>
  <p className="text-gray-700 mb-4">
    Dieser Hannoveraner Wallach hat aufgrund seiner Abstammung und seines Gesundheitsstatus Potenzial, jedoch sind der Ausbildungsstand und die bisherigen Erfolge begrenzt, was den Preis beeinflusst. Der genannte Preisbereich ist ein Orientierungswert, der je nach weiteren individuellen Faktoren und Marktbedingungen variieren kann.
  </p>
  <p className="text-gray-500 text-sm italic">
    Ich bin PferdeWert AI von www.pferdewert.de – dies ist keine verbindliche Wertermittlung.
  </p>
</div>


          <div className="text-center">
            <Link
              href="/bewerten"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
            >
              Eigene Bewertung starten
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
