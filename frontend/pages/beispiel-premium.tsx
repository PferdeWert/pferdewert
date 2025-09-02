import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import { TIER_PRICES, formatPrice } from "@/lib/pricing";

const markdown = `

## **Zusätzlich zur Pro-Analyse erhälst du eine vollständige Exterieurbewertung:**

---

## Gesamteindruck & Typ

Dieser 4-jährige DSP-Wallach präsentiert sich als kräftiger, substanzieller Typ mit deutlich mehr Masse als das vorherige Pferd. Das schwarze/dunkelbbraune Pferd zeigt einen robusten, bodenständigen Charakter und steht sicher auf seinen Beinen. Der Gesamteindruck ist der eines soliden, verlässlichen Sportpferdes.

---

## Rahmen & Proportionen

**Beurteilung:**

- **Kompakteres Format:** Deutlich quadratischeres Format als das erste Pferd
- **Kräftiger Körperbau:** Mehr Substanz und Tiefe im Rumpf
- **Gedrungener Typ:** Weniger elegant, dafür kraftvoller wirkend

**Rahmen-Score: 7/10**

---

## Kopf & Hals

**Kopf:**
- Ausdrucksvoller, kräftiger Kopf mit geradem Profil
- Aufmerksame Ohrenstellung zeigt gutes Temperament
- Proportional passend zum kräftigen Körperbau

**Hals:**
- **Kritischer Punkt:** Relativ kurzer, kräftiger Hals
- Guter Aufsatz, aber weniger elegant als bei Dressurpferden erwünscht
- Muskulös, aber könnte länger sein für optimale Dressurveranlagung

**Kopf/Hals-Score: 6.5/10**

---

## Rumpf & Oberlinie

**Widerrist & Rücken:**
- Gut ausgeprägter Widerrist
- Kurze, stabile Rückenlinie - vorteilhaft für Tragkraft
- Gute Tiefe im Rumpf

**Kruppe:**
- Kräftige, gut bemuskelte Kruppe
- Leicht abfallend, gute Winkelung
- Zeigt bereits für 4-jähriges Pferd gute Entwicklung

**Rumpf-Score: 7.5/10**

---

## Gliedmaßen-Bewertung

**Vorderhand:**
- **Sehr positiv:** Starke, korrekte Vorderbeine
- Kräftige Röhrbeine mit gutem Knochenumfang
- Stabile Fesselstellung
- Trockene Gelenke

**Hinterhand:**
- Kraftvolle Hinterhand mit guter Winkelung
- Sprunggelenke korrekt gestellt
- Kräftige Oberschenkel- und Unterschenkelmuskulatur
- Solides Fundament

**Gliedmaßen-Score: 8.5/10**

---

## Fundamentqualität

**Hervorragend:** Sehr stabiles, korrektes Fundament
- Kräftige Hufe in guter Proportion
- Keine sichtbaren Stellungsfehler
- Robust und belastbar wirkend

**Fundament-Score: 9/10**

---

## Auswirkungen auf Wert & Potential

**Positive Wertfaktoren (+)**

- **Exzellentes Fundament:** Hervorragende Basis für langfristige sportliche Nutzung
- **Substanz & Kraft:** Ideal für kraftvolle Dressurbewegungen und Tragkraft
- **Robuste Konstitution:** Verspricht Langlebigkeit und Gesundheit
- **Korrekte Gliedmaßen:** Minimiert Verletzungsrisiko

**Herausforderungen (-)**

- **Kompakter Hals:** Weniger ideal für klassische Dressuraufrichtung
- **Weniger Eleganz:** Nicht der moderne, edle Dressurtyp
- **Quadratisches Format:** Weniger typisch für Dressursport

---

## Marktpositionierung

Dieses Pferd eignet sich besonders für:

- Robuste Dressurarbeit bis mittleres Niveau
- Vielseitigkeit (Dressur + leichtes Springen)
- Amateur-/Freizeitsport mit hohen Ansprüchen an Verlässlichkeit

---

## Werteinschätzung & Marktpotential

**Exterieur-basierte Werteinschätzung**

**Basierend auf dem Exterieur: 8.000 - 14.000 €**

**Begründung:**
- Das hervorragende Fundament und die robuste Konstitution rechtfertigen eine solide Preispositionierung
- Der weniger elegante Typ für Dressur drückt den Preis gegenüber modernen Dressurlinien
- Sehr gutes Preis-Leistungs-Verhältnis für praktisch orientierte Käufer

---

## Potential-Einschätzung

**Dressursport: ⭐⭐⭐ (3/5)**
- Solide Basis, aber begrenzt durch Körperbau
- Potential bis L-/M-Niveau realistisch

**Vielseitigkeit: ⭐⭐⭐⭐⭐ (5/5)**
- Idealer Typ für vielseitige Nutzung
- Kraft und Substanz für verschiedene Disziplinen

**Freizeitsport: ⭐⭐⭐⭐⭐ (5/5)**
- Perfekt für anspruchsvolle Freizeitreiter
- Verlässlichkeit und Robustheit

---

## Vergleich zum ersten Pferd

- **Erstes Pferd (elegant):** Höheres Dressurpotential, eleganter Typ, höherer Preis
- **Dieses Pferd (robust):** Praktischer Allrounder, sehr gutes Fundament, solidere Investition

---

## Empfehlungen für Wertoptimierung

- **Vielseitigkeitstraining:** Verschiedene Disziplinen anbieten
- **Zielgruppe:** Amateur- und Freizeitreiter ansprechen
- **Stärken betonen:** Robustheit, Verlässlichkeit, Gesundheit hervorheben
- **Preispositionierung:** Als "ehrliches Arbeitspferd" mit Qualität vermarkten

---

## Marktpositionierung

Dieses Pferd sollte als solides, verlässliches Sportpferd für pragmatische Reiter vermarktet werden, die Wert auf Substanz und Langlebigkeit legen.

**Gesamtbewertung Exterieur: 7,5/10** - Ein sehr solides, robustes Pferd mit exzellentem Fundament, ideal für vielseitige Nutzung und langfristige Partnerschaft.

---

## Fazit

Während das erste Pferd mehr "Glamour" hatte, bietet dieses Pferd mehr Substanz und praktischen Nutzen - zwei verschiedene Marktansätze für unterschiedliche Käufertypen.

_Ergebnis erstellt durch die PferdeWert-KI mit KI-Vision Foto-Analyse – keine rechtsverbindliche Bewertung._`;

export default function PremiumBeispiel() {
  return (
    <Layout>
      <Head>
        <title>Premium Beispiel-Analyse – KI-Foto-Analyse mit ausführlicher Exterieur-Bewertung | PferdeWert</title>
        <meta
          name="description"
          content={`🐎 Premium Beispiel-Analyse: KI-Foto-Analyse für ${formatPrice(TIER_PRICES.premium)} ➤ Vollständiger Premium-Report ✓ Exterieur-Bewertung ✓ Transparent & nachvollziehbar ✓ Jetzt ansehen!`}
        />
        <meta property="og:title" content="Premium Beispiel-Analyse – KI-Vision mit Foto-Analyse | PferdeWert" />
        <meta property="og:description" content="Sieh dir die Premium Beispiel-Analyse: Marktwert-Band, Begründung, Tipps und KI-Vision Exterieur-Bewertung." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/beispiel-premium" />
        <link rel="canonical" href="https://pferdewert.de/beispiel-premium" />
      </Head>

      <BewertungLayout title="📝 PferdeWert Premium">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
            {`Premium Tarif - ${formatPrice(TIER_PRICES.premium)}`}
          </div>
          <p className="text-lg text-gray-600">
            Das bekommst du mit unserem Premium-Tarif:
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
            Jetzt Premium Bewertung starten
          </Link>
          </div>
      </BewertungLayout>
    </Layout>
  );
}
