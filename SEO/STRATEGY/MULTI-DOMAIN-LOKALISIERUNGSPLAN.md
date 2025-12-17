# Multi-Domain Lokalisierungsplan für PferdeWert

**Status:** Implementierungsbereit
**Erstellt:** 17. Dezember 2025
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

### Phase 1: Middleware - Regional-Seiten blockieren (Priorität: HOCH)

**Datei:** `frontend/middleware.ts`

```typescript
// Neue Konstante: Seiten die NUR auf bestimmten Domains erlaubt sind
const COUNTRY_EXCLUSIVE_PAGES: Record<string, string[]> = {
  'DE': [
    '/pferd-kaufen/bayern',
    '/pferd-kaufen/nrw',
    '/pferd-kaufen/sachsen',
    '/pferd-kaufen/schleswig-holstein',
    '/pferd-kaufen/brandenburg',
    '/pferd-kaufen/hessen',
    '/pferd-kaufen/baden-wuerttemberg',
    '/pferd-kaufen/niedersachsen',
  ],
  'AT': [
    '/pferd-kaufen/oesterreich',
  ],
  'CH': [
    '/pferd-kaufen/schweiz',
  ],
};

// Im middleware() Funktion, nach Locale-Detection:
function middleware(request: NextRequest) {
  // ... bestehende Logik ...

  const country = domainConfig?.country || 'DE';

  // NEUE LOGIK: Regional-exklusive Seiten prüfen
  const pathname = request.nextUrl.pathname;

  // Prüfe ob die Seite für ein anderes Land exklusiv ist
  for (const [exclusiveCountry, exclusivePages] of Object.entries(COUNTRY_EXCLUSIVE_PAGES)) {
    if (exclusiveCountry !== country) {
      // Diese Seite gehört zu einem anderen Land
      if (exclusivePages.some(page => pathname === page || pathname.startsWith(page + '/'))) {
        // Option A: 404 zurückgeben
        return new NextResponse(null, { status: 404 });

        // Option B (besser für UX): Redirect zur Haupt-Hub-Seite
        // const hubUrl = new URL('/pferd-kaufen/', request.url);
        // return NextResponse.redirect(hubUrl, 302);
      }
    }
  }

  // ... Rest der bestehenden Logik ...
}
```

### Phase 2: Sitemaps anpassen (Priorität: HOCH)

**Datei:** `frontend/scripts/generate-sitemap.mjs`

Die Sitemaps müssen pro Domain nur die relevanten URLs enthalten:

```javascript
// Seiten die pro Domain exklusiv sind
const COUNTRY_EXCLUSIVE_PAGES = {
  'de': ['/pferd-kaufen/bayern', '/pferd-kaufen/nrw'],
  'at': ['/pferd-kaufen/oesterreich'],
  'ch': ['/pferd-kaufen/schweiz'],
};

// Beim Generieren der Sitemap:
function generateSitemap(domain, country) {
  const pages = getAllPages();

  return pages.filter(page => {
    // Prüfe ob die Seite für ein anderes Land exklusiv ist
    for (const [exclusiveCountry, exclusivePages] of Object.entries(COUNTRY_EXCLUSIVE_PAGES)) {
      if (exclusiveCountry !== country && exclusivePages.includes(page)) {
        return false; // Diese Seite nicht in dieser Sitemap
      }
    }
    return true;
  });
}
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

### Phase 5: hreflang anpassen (Priorität: NIEDRIG)

Für Regional-exklusive Seiten: **KEINE hreflang-Tags**

**Datei:** `components/ratgeber/RatgeberHead.tsx`

```tsx
// Regional-exklusive Seiten (keine hreflang!)
const COUNTRY_EXCLUSIVE_SLUGS = [
  'bayern', 'nrw', 'sachsen', // DE-only
  'oesterreich', // AT-only
  'schweiz', // CH-only
];

// Im Component:
const isExclusivePage = COUNTRY_EXCLUSIVE_SLUGS.includes(slug);

// Nur hreflang rendern wenn NICHT exklusiv
{!isExclusivePage && hreflangTags.map((tag) => (
  <link key={tag.hreflang} rel="alternate" hrefLang={tag.hreflang} href={tag.href} />
))}
```

---

## 4. Migrations-Checkliste

### Vor dem Deployment
- [ ] Middleware mit Regional-Blocking erweitern
- [ ] Sitemaps pro Domain generieren (ohne fremde Regionen)
- [ ] Sitemaps bei Google Search Console neu einreichen
- [ ] hreflang für exklusive Seiten entfernen

### Nach dem Deployment
- [ ] Google Search Console: Indexierung prüfen (404 für exklusive Seiten)
- [ ] Analytics: Traffic-Verteilung pro Domain prüfen
- [ ] Backlinks: Ggf. interne Verlinkung anpassen

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
