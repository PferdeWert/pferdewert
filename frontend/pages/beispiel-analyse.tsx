import Head from "next/head";
import ReactMarkdown from "react-markdown";

const markdown = `## Preisspanne

**10.000 – 15.000 €**

Diese Preisspanne reflektiert die unterschiedlichen Faktoren, die den Wert des Pferdes beeinflussen. Das untere Ende der Spanne berücksichtigt den Ausbildungsstand des Wallachs, der sich im L-Bereich im Ansatz befindet, sowie seine bisherigen Erfolge, die sich auf E-Siege und A-Platzierungen beschränken. Das obere Ende der Spanne könnte erreicht werden, wenn die Bewegungsqualität des Pferdes überdurchschnittlich ist und es eine besonders gute AKU vorweisen kann. Der Verkauf über einen privaten Anbieter und der derzeitige Standort können ebenfalls den Preis beeinflussen.

## Abstammung

**De Niro**: Ein bedeutender Hannoveraner Hengst, bekannt für seine Vererbung von Dressurtalent. De Niro hat zahlreiche Nachkommen, die im internationalen Dressursport erfolgreich sind, und ist als Vererber von Rittigkeit und Leistungsbereitschaft geschätzt.

**Schwadroneur**: Ein Hengst, der ebenfalls in der Dressurszene bekannt ist. Schwadroneur hat eine solide Nachzucht, die durch Rittigkeit und gute Grundgangarten überzeugt.

## Was den Endpreis besonders bewegt

- **Abstammung**: De Niro als Vater ist ein starker Pluspunkt für die Dressurveranlagung.
- **Ausbildungsstand**: Der Wallach ist im L-Bereich im Ansatz, was für einen 11-Jährigen relativ niedrig ist.
- **Erfolge**: Nur E-Siege und A-Platzierungen, was den Preis drückt.
- **Gesundheitsstatus**: Eine AKU ohne Befund ist ein positiver Faktor.
- **Vermarktungsweg**: Privatverkauf kann den Preis im Vergleich zu einer Auktion niedriger halten.

## Fazit

Dieser Hannoveraner Wallach hat aufgrund seiner Abstammung und seines Gesundheitsstatus Potenzial, jedoch sind der Ausbildungsstand und die bisherigen Erfolge begrenzt, was den Preis beeinflusst. Der genannte Preisbereich ist ein Orientierungswert, der je nach Marktsituation variieren kann.
`;

export default function BeispielAnalyse() {
  return (
    <>
      <Head>
        <title>Beispiel Pferdebewertung – PferdeWert für Pferdekauf oder Pferdeverkauf</title>
        <meta
          name="description"
          content="Beispiel Pferdebewertung mit Preisspanne, Abstammung und Gesundheitsstatus. Ideal für Pferdekauf, Pferdeverkauf und Marktwertanalyse."
        />
        <meta property="og:title" content="Beispiel Pferdebewertung – PferdeWert" />
        <meta
          property="og:description"
          content="Beispiel Pferdebewertung mit Preisspanne, Abstammung und Gesundheitsstatus. Ideal für Pferdekauf, Pferdeverkauf und Marktwertanalyse."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/beispiel-analyse" />
        <meta property="og:image" content="https://pferdewert.de/images/social-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Beispiel Pferdebewertung</h1>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </main>
    </>
  );
}
