# Multi-Domain Lokalisierungsplan für PferdeWert

**Status:** Phase 1, 2, 5 implementiert ✅ | Phase 3, 4 ausstehend
**Erstellt:** 17. Dezember 2025
**Zuletzt aktualisiert:** 18. Dezember 2025
**Ziel:** Duplicate Content eliminieren, Google-Konsolidierung verhindern, lokalen Mehrwert schaffen

---

## 1. Problemanalyse

### Aktueller Stand
```
pferdewert.de  ─┬─ /pferd-kaufen/bayern     (macht Sinn ✅)
               ├─ /pferd-kaufen/nrw        (macht Sinn ✅)
               ├─ /pferd-kaufen/oesterreich (macht Sinn für DE-Käufer ⚠️)
               └─ /pferd-kaufen/schweiz     (macht Sinn für DE-Käufer ⚠️)

pferdewert.at  ─┬─ /pferd-kaufen/bayern     (❌ irrelevant für AT-Nutzer)
               ├─ /pferd-kaufen/nrw        (❌ irrelevant für AT-Nutzer)
               ├─ /pferd-kaufen/oesterreich (macht Sinn ✅)
               └─ /pferd-kaufen/schweiz     (⚠️ weniger relevant)

pferdewert.ch  ─┬─ /pferd-kaufen/bayern     (❌ irrelevant für CH-Nutzer)
               ├─ /pferd-kaufen/nrw        (❌ irrelevant für CH-Nutzer)
               ├─ /pferd-kaufen/oesterreich (⚠️ weniger relevant)
               └─ /pferd-kaufen/schweiz     (macht Sinn ✅)
```

### Das Problem
1. **Duplicate Content:** 3x gleicher Content auf 3 Domains
2. **Kein lokaler Mehrwert:** AT/CH-Nutzer sehen Bayern-Content
3. **Google-Konsolidierung:** Google wählt eine Version, ignoriert andere
4. **Link Equity Split:** Backlinks verteilen sich auf 3 Domains

---

## 2. Ziel-Struktur

### Regional-Seiten: EXKLUSIV pro Domain

| Seite | .de | .at | .ch | Begründung |
|-------|-----|-----|-----|------------|
| `/pferd-kaufen/bayern` | ✅ Live | ❌ 404 | ❌ 404 | Nur für DE relevant |
| `/pferd-kaufen/nrw` | ✅ Live | ❌ 404 | ❌ 404 | Nur für DE relevant |
| `/pferd-kaufen/sachsen` (geplant) | ✅ Live | ❌ 404 | ❌ 404 | Nur für DE relevant |
| `/pferd-kaufen/oesterreich` | ❌ 404 | ✅ Live | ❌ 404 | Nur für AT relevant |
| `/pferd-kaufen/schweiz` | ❌ 404 | ❌ 404 | ✅ Live | Nur für CH relevant |

### Rassen- & Ratgeber-Seiten: ALLE Domains (aber lokalisiert!)

| Seite | .de | .at | .ch | Lokalisierung |
|-------|-----|-----|-----|---------------|
| `/pferd-kaufen/haflinger` | ✅ EUR | ✅ EUR (AT-Fokus) | ✅ CHF | Preise, Marktplätze |
| `/pferd-kaufen/` (Hub) | ✅ DE-Fokus | ✅ AT-Fokus | ✅ CH-Fokus | Marktplätze, Regionen |
| `/pferde-ratgeber/aku-pferd` | ✅ EUR | ✅ EUR | ✅ CHF | Preise |
| `/pferde-ratgeber/was-kostet-ein-pferd` | ✅ EUR | ✅ EUR | ✅ CHF | Alle Preise |

---

## 3. Implementierungsschritte

### Phase 1: Middleware - Regional-Seiten blockieren ✅ IMPLEMENTIERT

**Datei:** `frontend/middleware.ts`
**Konfiguration:** `frontend/lib/country-exclusive-pages.ts` (Single Source of Truth)

```typescript
// Zentrale Konfiguration in lib/country-exclusive-pages.ts
import { getExclusiveCountry } from './lib/country-exclusive-pages'

// In middleware.ts:
const exclusiveCountry = getExclusiveCountry(pathname);
if (exclusiveCountry && exclusiveCountry !== country) {
  // 404 mit noindex zurückgeben
  return new NextResponse(htmlWith404AndNoindex, { status: 404 });
}
```

**Ergebnis:** Regionale Seiten geben 404 + `X-Robots-Tag: noindex` auf falschen Domains zurück.

### Phase 2: Sitemaps anpassen ✅ IMPLEMENTIERT

**Datei:** `frontend/scripts/generate-sitemap.mjs`
**Konfiguration:** `frontend/lib/country-exclusive-pages.ts` (importiert)

```javascript
import { isPageAvailableForCountry } from '../lib/country-exclusive-pages.ts';

// Pro Domain wird gefiltert:
// - sitemap-de.xml: 28 Seiten (inkl. DE-Bundesländer, ohne AT/CH)
// - sitemap-at.xml: 27 Seiten (inkl. Österreich, ohne DE/CH)
// - sitemap-ch.xml: 27 Seiten (inkl. Schweiz, ohne DE/AT)
```

### Phase 3: Preise lokalisieren (Priorität: MITTEL)

#### 3.1 Utility-Funktion erstellen

**Neue Datei:** `frontend/lib/currency.ts`

```typescript
import { getCurrentCountry } from '@/lib/countries';

export interface PriceRange {
  min: number;
  max: number;
  currency: 'EUR' | 'CHF';
}

// CHF/EUR Wechselkurs (ungefähr, für Anzeige)
const CHF_EUR_RATE = 1.05; // 1 EUR = ~1.05 CHF

export function formatPriceRange(
  minEur: number,
  maxEur: number,
  country?: string
): string {
  const currentCountry = country || getCurrentCountry().code;

  if (currentCountry === 'CH') {
    const minChf = Math.round(minEur * CHF_EUR_RATE / 100) * 100;
    const maxChf = Math.round(maxEur * CHF_EUR_RATE / 100) * 100;
    return `CHF ${minChf.toLocaleString('de-CH')} – ${maxChf.toLocaleString('de-CH')}`;
  }

  // DE und AT: Euro
  return `${minEur.toLocaleString('de-DE')} – ${maxEur.toLocaleString('de-DE')} €`;
}

export function formatPrice(eurAmount: number, country?: string): string {
  const currentCountry = country || getCurrentCountry().code;

  if (currentCountry === 'CH') {
    const chfAmount = Math.round(eurAmount * CHF_EUR_RATE / 100) * 100;
    return `CHF ${chfAmount.toLocaleString('de-CH')}`;
  }

  return `${eurAmount.toLocaleString('de-DE')} €`;
}
```

#### 3.2 In Komponenten verwenden

**Beispiel in** `pages/pferd-kaufen/haflinger.tsx`:

```tsx
import { formatPriceRange } from '@/lib/currency';
import { useCountryConfig } from '@/hooks/useCountryConfig';

// Im Component:
const { country } = useCountryConfig();

// Statt:
// <td>4.000 - 15.000 €</td>

// Jetzt:
<td>{formatPriceRange(4000, 15000, country.code)}</td>
// .de/.at: "4.000 – 15.000 €"
// .ch: "CHF 4'200 – 15'800"
```

### Phase 4: Hub-Seiten lokalisieren (Priorität: MITTEL)

**Datei:** `pages/pferd-kaufen/index.tsx`

Die Hub-Seite `/pferd-kaufen/` sollte je nach Domain unterschiedliche Inhalte zeigen:

```tsx
import { useCountryConfig } from '@/hooks/useCountryConfig';

export default function PferdKaufenHub() {
  const { country } = useCountryConfig();

  // Marktplätze je nach Land
  const marketplaces = {
    DE: [
      { name: 'ehorses.de', url: '...', listings: '~12.000' },
      { name: 'Kleinanzeigen', url: '...', listings: '~8.000' },
    ],
    AT: [
      { name: 'Willhaben.at', url: '...', listings: '~1.500' },
      { name: 'ehorses.at', url: '...', listings: '~2.200' },
      { name: 'Landwirt.com', url: '...', listings: '~800' },
    ],
    CH: [
      { name: 'anibis.ch', url: '...', listings: '~600' },
      { name: 'tutti.ch', url: '...', listings: '~400' },
      { name: 'ehorses.ch', url: '...', listings: '~500' },
    ],
  };

  // Regionale Spokes je nach Land
  const regionalSpokes = {
    DE: ['bayern', 'nrw', 'sachsen', 'niedersachsen'],
    AT: ['oesterreich'], // Nur eine Seite, aber Bundesländer als Sections
    CH: ['schweiz'], // Nur eine Seite, aber Kantone als Sections
  };

  return (
    // ... Render basierend auf country.code ...
  );
}
```

### Phase 5: hreflang anpassen ✅ IMPLEMENTIERT

**Datei:** `components/ratgeber/RatgeberHead.tsx`
**Konfiguration:** `frontend/lib/country-exclusive-pages.ts` (importiert)

```tsx
import { COUNTRY_EXCLUSIVE_SLUGS } from '@/lib/country-exclusive-pages';

// Im Component:
const isExclusivePage = COUNTRY_EXCLUSIVE_SLUGS.includes(slug);

// hreflang nur für nicht-exklusive Seiten
const hreflangTags = isExclusivePage ? [] : [
  { hreflang: 'de', href: `${DOMAINS['de']}${basePath}/${slug}` },
  // ... AT, CH, x-default
];
```

**Ergebnis:** Exklusive Seiten haben keine hreflang-Tags → Google versteht, dass sie nur auf einer Domain existieren.

---

## 4. Migrations-Checkliste

### Technische Implementierung (Dezember 2025)
- [x] Middleware mit Regional-Blocking erweitern (Phase 1)
- [x] Sitemaps pro Domain generieren (Phase 2)
- [x] hreflang für exklusive Seiten entfernen (Phase 5)
- [x] Zentrale Konfiguration erstellen (`lib/country-exclusive-pages.ts`)

### Noch offen
- [ ] Sitemaps bei Google Search Console neu einreichen
- [ ] Phase 3: Währungslokalisierung (CHF für .ch)
- [ ] Phase 4: Hub-Seiten lokalisieren (Marktplätze pro Land)
- [ ] Google Search Console: Indexierung nach 2-4 Wochen prüfen
- [ ] Analytics: Traffic-Verteilung pro Domain prüfen

---

## 5. Erwartete Ergebnisse

| Metrik | Vorher | Nachher (erwartet) |
|--------|--------|-------------------|
| Indexierte Seiten .de | 25 | 22 (exklusive AT/CH weg) |
| Indexierte Seiten .at | 25 | 20 (exklusive DE/CH weg) |
| Indexierte Seiten .ch | 25 | 20 (exklusive DE/AT weg) |
| Duplicate Content | 100% | ~20% (nur noch Ratgeber) |
| Google Konsolidierung | Wahrscheinlich | Unwahrscheinlich |
| Lokaler Mehrwert | Keiner | CHF-Preise, lokale Marktplätze |

---

## 6. Offene Fragen

1. **Was passiert mit bestehenden Rankings?**
   - Bayern-Seite auf .at hat vermutlich keine Rankings → kein Verlust
   - Sollte trotzdem vorsichtig ausgerollt werden

2. **Redirect oder 404?**
   - **Empfehlung: 404** (klarer für Google)
   - Alternative: 302-Redirect zur Hub-Seite (besser für User)

3. **Schweiz-Seite auf .de behalten?**
   - Für DE-Käufer die in CH kaufen wollen ist das relevant
   - **Empfehlung:** Auf .de behalten, aber mit DE-Perspektive ("Import aus CH")
   - Auf .ch ist es die Hauptseite

---

## 7. Quick Wins (Sofort umsetzbar)

1. **Sitemaps sofort anpassen** – Regional-Seiten nur in passende Sitemap
2. **hreflang für Regional-Seiten entfernen** – Kein Cross-Domain-Signal
3. **Meta-Descriptions lokalisieren** – Bereits teilweise vorhanden (seoLocales)

---

**Nächster Schritt:** Middleware-Änderung implementieren (Phase 1)
