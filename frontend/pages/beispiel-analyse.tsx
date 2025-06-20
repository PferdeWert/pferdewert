// pages/beispiel-analyse.tsx

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";

const markdown = `### Preisspanne

**10.000 – 15.000 €**

Diese Preisspanne reflektiert die unterschiedlichen Faktoren, die den Wert des Pferdes beeinflussen. Das untere Ende der Spanne berücksichtigt den Ausbildungsstand des Wallachs, der sich im L-Bereich im Ansatz befindet, sowie seine bisherigen Erfolge, die sich auf E-Siege und A-Platzierungen beschränken. Das obere Ende der Spanne könnte erreicht werden, wenn die Bewegungsqualität des Pferdes überdurchschnittlich ist und es eine besonders gute AKU vorweisen kann. Der Verkauf über einen privaten Anbieter und der derzeitige Standort können ebenfalls den Preis beeinflussen.

### Abstammung

**De Niro**: Ein bedeutender Hannoveraner Hengst, bekannt für seine Vererbung von Dressurtalent. De Niro hat zahlreiche Nachkommen, die im internationalen Dressursport erfolgreich sind, und ist als Vererber von Rittigkeit und Leistungsbereitschaft geschätzt.

**Schwadroneur**: Ein Hengst, der ebenfalls in der Dressurszene bekannt ist. Schwadroneur hat eine solide Nachzucht, die durch Rittigkeit und gute Grundgangarten überzeugt.

### Was den Endpreis besonders bewegt

- **Abstammung**: De Niro als Vater ist ein starker Pluspunkt für die Dressurveranlagung.
- **Ausbildungsstand**: Der Wallach ist im L-Bereich im Ansatz, was für einen 11-Jährigen relativ niedrig ist.
- **Erfolge**: Nur E-Siege und A-Platzierungen, was den Preis drückt.
- **Gesundheitsstatus**: Eine AKU ohne Befund ist ein positiver Faktor.
- **Vermarktungsweg**: Privatverkauf kann den Preis im Vergleich zu einer Auktion niedriger halten.

### Fazit

Dieser Hannoveraner Wallach hat aufgrund seiner Abstammung und seines Gesundheitsstatus Potenzial, jedoch sind der Ausbildungsstand und die bisherigen Erfolge begrenzt, was den Preis beeinflusst. Der genannte Preisbereich ist ein Orientierungswert, der je nach weiteren individuellen Faktoren und Marktbedingungen variieren kann.

_Ich bin PferdeWert AI von [www.pferdewert.de](https://www.pferdewert.de) – dies ist keine verbindliche Wertermittlung._
`;

export default function BeispielAnalyse() {
  return (
    <BewertungLayout title="📝 Beispiel-Analyse">
      <div className="prose prose-blue max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/bewerten"
          className="inline-block rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white shadow hover:bg-brand transition"
        >
          ➕ Eigene Bewertung starten
        </Link>
      </div>
    </BewertungLayout>
  );
}
