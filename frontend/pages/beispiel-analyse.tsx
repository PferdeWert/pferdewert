import Head from "next/head";
import Layout from "@/components/Layout"; // Neu: Layout mit Footer
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

_Ergebnis erstellt von PferdeWert AI – keine rechtsverbindliche Bewertung._`;

export default function BeispielAnalyse() {
  return (
    <Layout>
      <Head>
  <title>Beispiel-Analyse Pferd – So sieht dein Ergebnis aus | PferdeWert</title>
  <meta
  name="description"
  content="🐎 Beispiel-Analyse: Pferdebewertung für 14,90€ ➤ Detailliertes PDF mit Preisspanne ✓ Begründung & Tipps ✓ Transparent & nachvollziehbar ✓ Jetzt ansehen!"
/>


  {/* Open Graph */}
  <meta property="og:title" content="Beispiel-Analyse Pferd – So sieht dein Ergebnis aus | PferdeWert" />
  <meta property="og:description" content="Sieh dir die Beispiel-Analyse: Marktwert-Band, Begründung und Tipps zur Preisoptimierung. Transparenz & Fairness im Pferdemarkt." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pferdewert.de/beispiel-analyse" />
  <meta property="og:image" content="https://pferdewert.de/images/result.webp" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Beispiel-Analyse Pferd – So sieht dein Ergebnis aus | PferdeWert" />
  <meta name="twitter:description" content="Sieh dir die Beispiel-Analyse: Marktwert-Band, Begründung und Tipps zur Preisoptimierung." />
  <meta name="twitter:image" content="https://pferdewert.de/images/result.webp" />

  {/* Strukturierte Daten */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Beispiel-Analyse Pferd",
      "description": "Sieh dir die Beispiel-Analyse: Marktwert-Band, Begründung und Tipps zur Preisoptimierung.",
      "image": "https://pferdewert.de/images/result.webp",
      "url": "https://pferdewert.de/beispiel-analyse",
      "publisher": {
        "@type": "Organization",
        "name": "PferdeWert"
      }
    }
    `}
  </script>
  <link rel="canonical" href="https://pferdewert.de/beispiel-analyse" />

</Head>


      <BewertungLayout title="📝 Beispiel-Analyse">
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <div className="not-prose mt-10 flex justify-center">
          <Link
            href="/pferde-preis-berechnen"
            className="btn-primary"
          >
            Jetzt Pferdewert berechnen
          </Link>
        </div>
      </BewertungLayout>
    </Layout>
  );
}
