# Niederlande-Rollout: Kompakt-Guide

**Status:** GEPLANT | **Domain:** pferdewert.nl
**Ziel:** Q4 2026 / Q1 2027

---

## Warum NL der richtige nächste Schritt ist

| Pro | Contra |
|-----|--------|
| #1 Sport Horse Hub weltweit (KWPN) | Vollständige Übersetzung nötig |
| 93% E-Commerce-Adoption | Andere Sprache (Niederländisch) |
| Exzellente Datenquellen (Auktionen) | KWPN vs. E/A/L/M/S Klassifikation |
| Keine KI-Bewertungsplattform existiert | iDEAL Payment zwingend (70% Markt) |

---

## Der fundamentale Unterschied zu AT/CH

### AT/CH (DACH-Synergien)

```
Aufwand:           2-3 Tage
Übersetzung:       10-20 Wörter (Jänner, ß→ss)
i18n-System:       Simple JSON-Overrides
Klassifikation:    E/A/L/M/S (gleich oder ähnlich)
Content:           99% wiederverwendbar
```

### NL (Erste echte Internationalisierung)

```
Aufwand:           4-6 Wochen
Übersetzung:       ALLES (UI, Content, SEO)
i18n-System:       Strukturierte Datenbank (i18next + Namespaces)
Klassifikation:    KWPN + Training-Level (Hybrid-System nötig)
Content:           Neu erstellen auf Niederländisch
```

---

## Phase 0: i18n-Architektur Migration (VORAUSSETZUNG)

### Warum zuerst die Architektur?

Das aktuelle System reicht für NL nicht:

```
AKTUELL:
messages/
  de/common.json       # ~20 Zeilen
  de-AT/common.json    # ~5 Zeilen (nur Overrides)

PROBLEM FÜR NL:
→ Eine riesige nl/common.json mit 500+ Zeilen
→ Schwer zu maintainen
→ Keine Trennung UI vs. Fachvokabular vs. Content
```

### Neue Struktur mit Namespaces

```
messages/
  de/
    common.json          # Navigation, Buttons, allgemeine UI
    evaluation.json      # Formular, Ausbildungsstufen, Bewertung
    checkout.json        # Payment, Checkout-Flow
    horse-vocab.json     # Pferdesport-Fachvokabular
    seo.json             # Meta-Titles, Descriptions
  de-AT/
    common.json          # Overrides (Jänner)
    evaluation.json      # LP/LM Optionen
  de-CH/
    common.json          # Overrides (ss statt ß)
  nl/
    common.json          # Vollständige NL-Übersetzung
    evaluation.json      # KWPN-Begriffe + Training-Levels
    checkout.json        # iDEAL-Texte
    horse-vocab.json     # NL Pferdevokabular
    seo.json             # NL SEO-Texte
```

### i18next Implementation

```typescript
// lib/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    lng: 'de',
    fallbackLng: 'de',
    ns: ['common', 'evaluation', 'checkout', 'horse-vocab', 'seo'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18next;
```

```typescript
// Usage in Components
import { useTranslation } from 'react-i18next';

function EvaluationForm() {
  const { t } = useTranslation('evaluation');
  return <label>{t('ausbildung.label')}</label>;
}
```

**Aufwand Phase 0:** 3-5 Tage (einmalig, skaliert für alle zukünftigen Länder)

---

## Phase 1: Übersetzung (KRITISCH)

### Übersetzungsstrategie: Hybrid-Ansatz

| Bereich | Methode | Kosten |
|---------|---------|--------|
| **Fachvokabular** | Professionelle Agentur mit Equestrian-Expertise | ~500 |
| **UI-Texte** | Freelance Native Speaker + KI-unterstützt | ~300 |
| **SEO-Content** | Agentur (KWPN-Expertise kritisch) | ~400 |
| **TOTAL** | | **~1.200** |

### Kritische Übersetzungsbereiche

**1. Pferdesport-Fachvokabular:**
```json
// messages/nl/horse-vocab.json
{
  "breeds": {
    "kwpn": "KWPN Warmbloed",
    "friesian": "Fries paard",
    "warmblood": "Warmbloed",
    "haflinger": "Haflinger"
  },
  "disciplines": {
    "dressage": "Dressuur",
    "showjumping": "Springen",
    "eventing": "Eventing",
    "driving": "Mennen"
  },
  "training": {
    "raw": "Onbereden",
    "broken-in": "Aangereden",
    "beginner": "Beginnersniveau",
    "advanced": "Gevorderd"
  }
}
```

**2. KWPN-spezifische Begriffe:**
```json
// messages/nl/evaluation.json
{
  "classification": {
    "kwpn-title": "KWPN Classificatie",
    "ster": "Ster (Zuchtqualität)",
    "keur": "Keur (Elite-Zucht)",
    "preferent": "Preferent (Vererber)"
  },
  "training-levels": {
    "B": "B (Basis)",
    "L": "L (Licht)",
    "M": "M (Midden)",
    "Z": "Z (Zwaar)",
    "ZZ": "ZZ (Zeer Zwaar)"
  }
}
```

**3. Payment & Checkout (iDEAL!):**
```json
// messages/nl/checkout.json
{
  "payment": {
    "ideal-title": "Betaal met iDEAL",
    "ideal-description": "Veilig betalen via uw bank",
    "card-title": "Creditcard",
    "total": "Totaal"
  },
  "cta": {
    "buy-now": "Nu kopen",
    "secure-payment": "Veilige betaling"
  }
}
```

---

## Phase 2: Klassifikationssystem

### Das Problem: KWPN ≠ E/A/L/M/S

| Deutschland (E/A/L/M/S) | Niederlande (KWPN) |
|-------------------------|---------------------|
| Training-basiert | Zucht-basiert |
| E → A → L → M → S | Dressuur / Springen / Tuigpaard |
| Reiter-Perspektive | Züchter-Perspektive |

### Lösung: Hybrid-Formular für NL

```typescript
// NL-Formular bietet BEIDE Systeme an
const NL_FORM_FIELDS = [
  {
    name: 'kwpn_category',
    label: 'KWPN Categorie',
    type: 'select',
    options: ['Dressuur', 'Springen', 'Tuigpaard', 'Gelders', 'Recreatie']
  },
  {
    name: 'training_level',
    label: 'Trainingsniveau',
    type: 'select',
    options: ['Onbereden', 'Aangereden', 'B', 'L', 'M', 'Z', 'ZZ']
  },
  {
    name: 'kwpn_quality',
    label: 'KWPN Kwaliteit (optioneel)',
    type: 'select',
    options: ['Geen', 'Ster', 'Keur', 'Preferent']
  }
];
```

### Training-Level Mapping (intern)

```typescript
const nlTrainingLevelMapping = {
  'Onbereden': 'roh',
  'Aangereden': 'angeritten',
  'B': 'A',     // Basis ≈ Anfänger
  'L': 'L',     // Gleich
  'M': 'M',     // Gleich
  'Z': 'M/S',   // Zwaar ≈ Mittel bis Schwer
  'ZZ': 'S'     // Zeer Zwaar ≈ Schwer
};
```

### KI-Prompt Anpassung

```
System Prompt (Niederlande):

"Bewerte dieses Pferd basierend auf:

KWPN-Kategorie: {kwpn_category}
Trainingsniveau: {training_level} (NL-System: B/L/M/Z/ZZ)
KWPN-Qualität: {kwpn_quality}

Nutze niederländische Marktdaten:
- PaardPlaats.nl Preise
- Dutch Horse Trading Auktionsergebnisse
- KWPN Zuchtstandards

WICHTIG: KWPN-Zuchtqualität (Ster/Keur/Preferent) ist
ein signifikanter Wertfaktor im NL-Markt!"
```

---

## Phase 3: iDEAL Payment (NON-NEGOTIABLE)

### Warum kritisch?

- **70% Marktanteil** in NL E-Commerce
- **Ohne iDEAL:** 70% Conversion-Verlust

### Stripe iDEAL Setup

**1. Stripe Dashboard:**
```
Settings → Payment Methods → iDEAL → Enable
```

**2. Code-Integration:**
```typescript
// lib/checkout.ts
const paymentMethods =
  userCountry === 'NL'
    ? ['ideal', 'card', 'paypal']    // iDEAL an ERSTER Stelle!
    : userCountry === 'AT'
    ? ['card', 'eps', 'paypal']
    : userCountry === 'CH'
    ? ['card', 'paypal']
    : ['card', 'sofort', 'paypal'];
```

**3. UI mit iDEAL Badge:**
```typescript
{userCountry === 'NL' && (
  <div className="ideal-badge">
    <img src="/images/ideal-logo.svg" alt="iDEAL" />
    <span>Betaal veilig met iDEAL</span>
  </div>
)}
```

**Kosten:** 0 extra (gleiche Stripe-Fees: 1,4% + 0,25)

---

## Phase 4: SEO & Content

### 4 Artikel für Launch (Minimum)

| Artikel | Target Keyword | Suchvolumen |
|---------|----------------|-------------|
| Paard waarderen: Nederlandse gids | "paard waarderen" | ~200-300/Mo |
| Paardenprijzen Nederland | "paardenprijzen" | ~150-200/Mo |
| Paard kopen Nederland | "paard kopen" | ~800-1200/Mo |
| KI vs. traditionele taxatie | "paard taxatie" | ~100-150/Mo |

### URL-Struktur

```
pferdewert.nl/               # Homepage (NL)
pferdewert.nl/paard-waarderen    # Bewertung
pferdewert.nl/prijzen            # Preise
pferdewert.nl/paarden-ratgeber/  # Ratgeber-Basis
pferdewert.nl/paarden-ratgeber/paard-kopen-nederland
```

**Hinweis:** Andere Basis-URL als DE (`paarden-ratgeber` statt `pferde-ratgeber`)

### hreflang Tags

```html
<link rel="alternate" hreflang="de" href="https://pferdewert.de/..." />
<link rel="alternate" hreflang="de-AT" href="https://pferdewert.at/..." />
<link rel="alternate" hreflang="de-CH" href="https://pferdewert.ch/..." />
<link rel="alternate" hreflang="nl" href="https://pferdewert.nl/..." />
<link rel="alternate" hreflang="x-default" href="https://pferdewert.de/..." />
```

---

## Phase 5: Technische Integration

### countries.ts erweitern

```typescript
{
  code: 'NL',
  name: 'Nederland',
  domain: 'pferdewert.nl',
  urlPrefix: '/nl', // DEPRECATED
  locale: 'nl',
  enabled: true,  // Aktivieren bei Launch
}
```

### middleware.ts

```typescript
const DOMAIN_CONFIG = {
  // ... existing
  'pferdewert.nl': { locale: 'nl', country: 'NL' },
  'www.pferdewert.nl': { locale: 'nl', country: 'NL' },
} as const;
```

### pricing.ts

```typescript
export const PRICING_BY_COUNTRY = {
  DE: { price: 14.90, currency: 'EUR', symbol: '€' },
  AT: { price: 14.90, currency: 'EUR', symbol: '€' },
  CH: { price: 19.90, currency: 'CHF', symbol: 'CHF' },
  NL: { price: 14.90, currency: 'EUR', symbol: '€' },  // NEU
} as const;
```

### Sitemap & Robots

```javascript
// scripts/generate-sitemap.mjs
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',
  NL: 'https://pferdewert.nl',  // NEU
};

const OUTPUT_PATHS = {
  // ...
  NL: 'public/sitemap-nl.xml',
};
```

### DataFa.st

```
Dashboard → Settings → Additional domains → pferdewert.nl hinzufügen
```

Code bereits vorbereitet: `getDataFastAllowedHostnames()` generiert automatisch alle enabled Domains.

---

## Checkliste: NL-Rollout

### Vorbereitung (vor Entwicklung)

- [ ] pferdewert.nl Domain kaufen
- [ ] i18next Migration planen
- [ ] Übersetzungsagentur mit Equestrian-Expertise finden
- [ ] KWPN-System verstehen (Recherche)

### Phase 0: i18n-Architektur (3-5 Tage)

- [ ] i18next + react-i18next installieren
- [ ] Namespace-Struktur einrichten
- [ ] Bestehende DE-Texte in Namespaces aufteilen
- [ ] AT/CH Overrides migrieren
- [ ] Tests: Bestehende Funktionalität unverändert

### Phase 1: Übersetzung (2-3 Wochen)

- [ ] Fachvokabular-Liste erstellen (horse-vocab.json)
- [ ] UI-Texte extrahieren (common.json)
- [ ] Formular-Texte extrahieren (evaluation.json)
- [ ] Checkout-Texte extrahieren (checkout.json)
- [ ] Agentur beauftragen
- [ ] Review durch Native Speaker

### Phase 2: Klassifikation (1 Woche)

- [ ] KWPN-Felder im Formular
- [ ] Training-Level Mapping
- [ ] KI-Prompt für NL anpassen
- [ ] Backend: KWPN-Felder speichern

### Phase 3: Payment (1 Tag)

- [ ] Stripe: iDEAL aktivieren
- [ ] checkout.ts: iDEAL für NL
- [ ] UI: iDEAL Badge
- [ ] Test-Payment

### Phase 4: SEO & Content (1-2 Wochen)

- [ ] 4 Artikel schreiben (NL)
- [ ] Meta-Titles/Descriptions
- [ ] hreflang Tags erweitern
- [ ] Sitemap generieren

### Phase 5: Integration (2-3 Tage)

- [ ] Vercel: pferdewert.nl hinzufügen
- [ ] DNS konfigurieren
- [ ] countries.ts erweitern
- [ ] middleware.ts erweitern
- [ ] DataFa.st: Domain hinzufügen
- [ ] GSC: Property einrichten

### Phase 6: Testing (1 Woche)

- [ ] Full Flow: DE-User
- [ ] Full Flow: NL-User
- [ ] iDEAL Payment Test
- [ ] KWPN-Formular Test
- [ ] SEO Checks (hreflang, Sitemap)
- [ ] Mobile/Desktop
- [ ] Cross-Browser

### Launch

- [ ] Soft Launch (NL Horse Community)
- [ ] Feedback sammeln
- [ ] Production Launch

---

## Zusammenfassung

### NL ist die erste "echte" Internationalisierung

| Aspekt | AT/CH | NL |
|--------|-------|-----|
| Sprache | Deutsch | Niederländisch |
| Übersetzung | 10-20 Wörter | Alles |
| i18n-System | JSON-Overrides | Namespace-DB |
| Klassifikation | E/A/L/M/S | KWPN + Hybrid |
| Payment | Standard | iDEAL (70%!) |
| Aufwand | 2-3 Tage | 4-6 Wochen |

### Kritische Erfolgsfaktoren

1. **i18n-Architektur zuerst** - Skaliert für zukünftige Länder (FR, BE, UK)
2. **Professionelle Übersetzung** - Pferdesport-Fachvokabular kritisch
3. **iDEAL Payment** - Ohne = 70% Conversion-Verlust
4. **KWPN-Integration** - Hybrid-System für NL-Züchter-Markt

### Nach NL

Die i18next-Architektur ermöglicht dann einfache Erweiterung für:
- Belgien (NL + FR)
- Frankreich
- UK

---

**Nächste Aktion:** Phase 0 (i18n-Migration) planen und umsetzen
