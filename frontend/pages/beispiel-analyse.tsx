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
            <p className="text-3xl font-bold text-blue-800 mb-6">18.000 – 25.000&nbsp;€</p>
            <p className="text-gray-700 mb-4">
              Diese Preisspanne ergibt sich aus mehreren Faktoren. Am unteren Ende der Spanne steht die Tatsache, dass die Stute erst angeritten ist und noch keine Turniererfolge vorweisen kann. Am oberen Ende der Spanne wirken sich die vielversprechende Abstammung, das korrekte Exterieur und die gesunde AKU positiv aus. Der Privatverkauf kann den Preis im Vergleich zu einer Auktion etwas niedriger halten.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Abstammung</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>
                <strong>Bernay</strong>: Ein Hengst, der sich durch seine beeindruckende Bewegungsqualität und Rittigkeit auszeichnet. Er hat bereits mehrere Nachkommen hervorgebracht, die im Dressursport erfolgreich sind.
              </li>
              <li>
                <strong>London-Swing</strong>: Bekannt für seine Vielseitigkeit und Leistungsbereitschaft. Er hat in der Zucht durch seine Vererbung von Größe und Substanz gepunktet.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">Was den Endpreis besonders bewegt</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Ausbildungsstand: Derzeit nur angeritten, was die Vermarktungschancen bei sportlich ambitionierten Käufern einschränken könnte.</li>
              <li>Abstammung: Hochkarätige Dressurabstammung, die Potenzial für den Sport verspricht.</li>
              <li>Gesundheitsstatus: Aktueller AKU-Bericht ohne Befund, was das Vertrauen in die Gesundheit des Pferdes stärkt.</li>
              <li>Vermarktungsweg: Der Verkauf über einen privaten Anbieter kann den Preis im Vergleich zu einer Auktion beeinflussen.</li>
              <li>Stutenleistungsprüfung: Mit einer Note von 7,4 zeigt die Stute Potenzial, auch wenn sie noch nicht herausragend ist.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">Fazit</h3>
            <p className="text-gray-700 mb-4">
              Die Stute ist ein vielversprechendes Nachwuchspferd für den Dressursport mit einer soliden Abstammung und einem positiven Gesundheitsbericht. Der Preis orientiert sich an ihrem aktuellen Ausbildungsstand und den Möglichkeiten, die ihre Abstammung bietet. Es handelt sich um einen Orientierungswert, der je nach weiteren Entwicklungen im Training und ersten Turniererfolgen angepasst werden kann.
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
