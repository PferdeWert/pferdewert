import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import { TIER_PRICES, formatPrice } from "@/lib/pricing";

const markdown = `

## Zusammenfassung

**Geschätzter Marktwert: 12.000 - 16.000 €**

Der Hannoveraner Wallach aus der De Niro x Schwadroneur-Linie zeigt sich als verlässliches Dressurpferd mit solider Grundausbildung auf L-Niveau. Trotz seiner begrenzten Turniererfolge bietet er aufgrund seines guten Charakters und seiner Verladefrommheit ein attraktives Angebot für ambitionierte Freizeitreiter:innen oder als Lehrpferd.

---

## Marktwertanalyse

### Detaillierte Preisspannen-Erklärung:

**Untere Preisgrenze (12.000 €):** Diese konservative Schätzung berücksichtigt den begrenzten Turniererfolg und das Alter des Pferdes, das sich bereits über dem optimalen Verkaufsalter für junge Dressurpferde befindet. Der solide Ausbildungsstand und der gute Gesundheitszustand rechtfertigen jedoch diesen Mindestpreis.

**Obere Preisgrenze (16.000 €):** Die optimistische Schätzung basiert auf der renommierten Abstammung von De Niro, die in der Dressurszene hoch angesehen ist, sowie dem sehr braven Charakter des Wallachs. Diese Faktoren könnten für Käufer:innen, die ein zuverlässiges und gut ausgebildetes Pferd suchen, besonders attraktiv sein.

**Zielpreis (14.000 €):** Ein realistischer Verkaufspreis bei optimaler Vermarktung und Ansprache der richtigen Zielgruppe, die Wert auf einen verlässlichen Partner für den Dressursport legt.`;

export default function BasicBeispiel() {
  return (
    <Layout>
      <Head>
        <title>Basic Beispiel-Analyse – Schnelle Preisspanne | PferdeWert</title>
        <meta
          name="description"
          content={`🐎 Basic Beispiel-Analyse: Schnelle Preisspanne für ${formatPrice(TIER_PRICES.basic)} ➤ Marktwert-Band ✓ Grundlegende Bewertung ✓ Transparent & nachvollziehbar ✓ Jetzt ansehen!`}
        />
        <meta property="og:title" content="Basic Beispiel-Analyse – Schnelle Preisspanne | PferdeWert" />
        <meta property="og:description" content="Sieh dir die Basic Beispiel-Analyse: Schnelle Marktwert-Band ohne detaillierte Analyse." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/beispiel-basic" />
        <link rel="canonical" href="https://pferdewert.de/beispiel-basic" />
      </Head>

      <BewertungLayout title="📝 PferdeWert Basic">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            {`Basic Tarif - ${formatPrice(TIER_PRICES.basic)}`}
          </div>
          <p className="text-lg text-gray-600">
            Das bekommst du mit unserem Basic-Tarif:
          </p>
        </div>

        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <div className="not-prose mt-10 flex justify-center">
          <Link
            href="/pferde-preis-berechnen"
            className="btn-primary"
          >
            Jetzt Basic Bewertung starten
          </Link>
          </div>
      </BewertungLayout>
    </Layout>
  );
}
