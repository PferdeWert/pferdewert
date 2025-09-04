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

**Zielpreis (14.000 €):** Ein realistischer Verkaufspreis bei optimaler Vermarktung und Ansprache der richtigen Zielgruppe, die Wert auf einen verlässlichen Partner für den Dressursport legt.

---

## Preisfaktoren im Detail

### Aufschlüsselung der wertbestimmenden Eigenschaften:

- **Rasse & Abstammung:** Die Hannoveraner-Rasse ist bekannt für ihre Eignung im Dressursport. Die Abstammung von De Niro, einem der führenden Dressurvererber, steigert den Wert, auch wenn die Erfolge des Wallachs selbst begrenzt sind.

- **Alter & Entwicklungsstand:** Mit 11 Jahren ist der Wallach im besten Alter für den Dressursport, jedoch nicht mehr im optimalen Verkaufsalter für junge Talente. Dies beeinflusst den Preis leicht negativ.

- **Ausbildungsstand:** Der Ausbildungsstand auf L-Niveau ist solide, jedoch nicht herausragend. Potenzial für weitere Ausbildungsschritte ist vorhanden, was den Wert stabilisiert.

- **Gesundheit & Kondition:** Der AKU-Bericht ohne Befund ist ein positiver Faktor, der den Wert unterstützt.

- **Erfolge & Leistungsnachweis:** Die bisherigen Erfolge sind begrenzt auf einen E-Sieg und A-Platzierungen, was den Preis nicht signifikant erhöht.

- **Besondere Eigenschaften:** Der sehr brave Charakter und die Verladefrommheit sind wertsteigernde Eigenschaften.

---

## Markteinschätzung & Timing

- **Aktuelle Marktlage:** Die Nachfrage nach gut ausgebildeten, verlässlichen Dressurpferden ist stabil. Der Markt für Freizeit- und Lehrpferde ist ebenfalls robust.

- **Regionale Faktoren:** Der Standort in der Region Stuttgart (PLZ 70619) bietet Zugang zu einem breiten Käufer:innenkreis, was den Verkauf erleichtert.

- **Optimaler Verkaufszeitpunkt:** Der Herbst ist eine gute Zeit für den Verkauf, da viele Reiter:innen nach neuen Pferden für die kommende Saison suchen.

---

## Verkaufsempfehlungen

### Wertsteigerungspotenzial:

- Weiteres Training auf M-Niveau könnte den Wert steigern.
- Teilnahme an kleineren Turnieren zur Verbesserung der Erfolgsbilanz.
- Professionelle Fotos und Videos für die Vermarktung nutzen.
- Präsentation auf Online-Plattformen und in regionalen Reitvereinen.

---

## Kaufberatung

### Wichtige Kaufaspekte:

- Beim Probereiten auf den braven Charakter und die Rittigkeit achten.
- Die Preisspanne ist gerechtfertigt, wenn der Fokus auf einem verlässlichen Freizeit- oder Lehrpferd liegt.
- Das Preis-Leistungs-Verhältnis ist gut, wenn der Käufer Wert auf Abstammung und Charakter legt.

---

## Zukunftspotenzial

- In den nächsten 2-5 Jahren könnte der Wallach durch gezielte Ausbildung und Turnierteilnahmen im Amateurbereich erfolgreich sein.
- Eignet sich gut für den Freizeit- und Lehrbetrieb, weniger für den Spitzensport.
- Weitere Erfolge im Amateurbereich sind realistisch, wenn kontinuierlich trainiert wird.

---

## Fazit

Der Hannoveraner Wallach bietet ein solides Preis-Leistungs-Verhältnis für Käufer:innen, die ein verlässliches und gut ausgebildetes Dressurpferd suchen. Der Wert ist ein Orientierungswert und kann je nach Vermarktung und Käufer:inneninteresse variieren.

_Ergebnis erstellt durch die PferdeWert-KI – keine rechtsverbindliche Bewertung._`;

export default function ProBeispiel() {
  return (
    <Layout>
      <Head>
        <title>Professional Beispiel-Analyse – Detaillierte KI-Analyse | PferdeWert</title>
        <meta
          name="description"
          content={`🐎 Professional Beispiel-Analyse: Detaillierte KI-Analyse für ${formatPrice(TIER_PRICES.pro)} ➤ Ausführlicher PDF-Report ✓ Begründung & Tipps ✓ Transparent & nachvollziehbar ✓ Jetzt ansehen!`}
        />
        <meta property="og:title" content="Professional Beispiel-Analyse – Detaillierte KI-Analyse | PferdeWert" />
        <meta property="og:description" content="Sieh dir die Professional Beispiel-Analyse: Marktwert-Band, Begründung und Tipps zur Preisoptimierung." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/beispiel-pro" />
        <link rel="canonical" href="https://pferdewert.de/beispiel-pro" />
      </Head>

      <BewertungLayout title="📝 PferdeWert Pro">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            {`Professional Tarif - ${formatPrice(TIER_PRICES.pro)}`}
          </div>
          <p className="text-lg text-gray-600">
            Das bekommst du mit unserem Professional-Tarif:
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
            Jetzt Professional Bewertung starten
          </Link>
          </div>
      </BewertungLayout>
    </Layout>
  );
}
