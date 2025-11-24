# Schweiz-Rollout: Kompakt-Guide

**Status:** GEPLANT | **Timeline:** 2 Wochen | **Strategie:** Deutsch-Only (75% Markt)
**Domain:** pferdewert.ch (gekauft)

---

## Warum Schweiz?

- 90% AT-Code wiederverwendbar
- Keine KI-Bewertungsplattform existiert = RIESIGE Marktlücke
- Premium-Markt: CHF 19,90 (statt EUR 14,90)
- Suchvolumen Deutsch: 530-750/Monat
- **Eigene .ch ccTLD** = Starkes lokales SEO-Signal

---

## Domain-Strategie (NEU - wie AT!)

Mit dem neuen Multi-Domain-Setup (Branch `feature/austria-domain-separation`):

| Domain | Inhalt | URL-Struktur |
|--------|--------|--------------|
| pferdewert.de | Deutschland | `/pferde-ratgeber/...` |
| pferdewert.at | Österreich | `/pferde-ratgeber/...` (clean!) |
| **pferdewert.ch** | **Schweiz** | `/pferde-ratgeber/...` (clean!) |

**Vorteile:**
- Keine `/ch/` Prefixe nötig
- ccTLD gibt starkes lokales Signal
- Saubere URLs für Nutzer
- hreflang zeigt auf separate Domains

---

## Technische Unterschiede zu AT

| Aspekt | AT | CH |
|--------|----|----|
| Domain | pferdewert.at | **pferdewert.ch** |
| Währung | EUR | **CHF** |
| Preis | 14,90 | **19,90** |
| Lokale Zahlart | EPS | **Keine** (TWINT nicht von Stripe unterstützt) |
| Ausbildungsstufen | A, L, LP, LM, M, S | A, L, M, S (**keine LP/LM**) |
| Rechtschreibung | ß | **ss** (Strasse, Grösse) |

---

## Implementation Checklist

### Phase 0: Vercel Domain Setup (5min)

```
1. Vercel Dashboard → Settings → Domains
2. Add Domain: pferdewert.ch
3. DNS beim Registrar:
   - CNAME: pferdewert.ch → cname.vercel-dns.com
   - Oder A-Record: 76.76.21.21
```

### Phase 1: Stripe Setup (1h)

```
1. Stripe Dashboard → Settings → Currencies → CHF aktivieren
2. Products → Deinen Price öffnen → "Add another price"
   - Amount: CHF 19.90
   - Currency: CHF
   → Neue price_id kopieren (z.B. price_xxx_chf)
3. Payment Methods: card, klarna, paypal (KEIN EPS für CH)
```

### Phase 2: Code-Anpassungen (2h)

**1. middleware.ts - Domain hinzufügen:**
```typescript
const DOMAIN_CONFIG = {
  'pferdewert.at': { locale: 'de-AT', country: 'AT' },
  'www.pferdewert.at': { locale: 'de-AT', country: 'AT' },
  'pferdewert.de': { locale: 'de', country: 'DE' },
  'www.pferdewert.de': { locale: 'de', country: 'DE' },
  // NEU:
  'pferdewert.ch': { locale: 'de-CH', country: 'CH' },
  'www.pferdewert.ch': { locale: 'de-CH', country: 'CH' },
} as const;
```

**2. useCountryConfig.ts erweitern:**
```typescript
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',  // NEU
} as const;

function detectCountryFromHost(): 'DE' | 'AT' | 'CH' {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.includes('pferdewert.ch')) return 'CH';  // NEU
    if (host.includes('pferdewert.at')) return 'AT';
    // ...
  }
  return 'DE';
}

// Ausbildung für CH (kein LP/LM)
const AUSBILDUNG_OPTIONS_CH = ["roh", "angeritten", "A", "L", "M", "S", "Sonstiges"];
```

**3. useSEO.ts - hreflang erweitern:**
```typescript
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',  // NEU
} as const;

// hreflang Tags
const hreflangTags: HreflangTag[] = [
  { hreflang: 'de', href: deUrl },
  { hreflang: 'de-AT', href: atUrl },
  { hreflang: 'de-CH', href: chUrl },  // NEU
  { hreflang: 'x-default', href: deUrl },
];
```

**4. pricing.ts erweitern:**
```typescript
export const PRICING_BY_COUNTRY = {
  DE: { price: 14.90, currency: 'EUR', priceId: 'price_xxx_eur', symbol: '€' },
  AT: { price: 14.90, currency: 'EUR', priceId: 'price_xxx_eur', symbol: '€' },
  CH: { price: 19.90, currency: 'CHF', priceId: 'price_xxx_chf', symbol: 'CHF' }
} as const;
```

**5. checkout.ts - Payment Methods:**
```typescript
const paymentMethods = userCountry === 'AT'
  ? ["card", "eps", "klarna", "paypal"]  // AT: mit EPS
  : ["card", "klarna", "paypal"];         // DE + CH: ohne EPS
```

### Phase 3: Content (6h)

4 Artikel erstellen (jetzt ohne /ch/ Prefix!):
1. `pferdewert.ch/pferde-ratgeber/pferd-bewerten-schweiz` (90-120 Suchen)
2. `pferdewert.ch/pferde-ratgeber/pferdepreise-schweiz` (120-150 Suchen)
3. `pferdewert.ch/pferde-ratgeber/pferd-kaufen-schweiz` (200-300 Suchen)
4. `pferdewert.ch/pferde-ratgeber/ki-pferdebewertung`

**Content-Hinweise für CH:**
- "ß" → "ss" (Strasse, Grösse, etc.)
- "Grüezi" statt "Hallo" in lockeren Texten
- CHF Preise verwenden

### Phase 3.5: Analytics Setup (15min)

**DataFa.st Cross-Domain Tracking erweitern:**

1. **Dashboard:** datafa.st → Website Settings → Additional domains → `pferdewert.ch` hinzufügen

2. **Code refactoren** (vor CH-Launch empfohlen):

```typescript
// In countries.ts hinzufügen:
export function getDataFastAllowedHostnames(): string {
  return getAvailableCountries()
    .filter(c => c.domain !== 'pferdewert.de') // Primary domain ausschließen
    .map(c => c.domain)
    .join(',');
}
```

3. **SimpleCookieConsent.tsx aktualisieren:**
```typescript
// Zeile 122 ändern von:
datafastScript.setAttribute('data-allowed-hostnames', 'pferdewert.at');

// Zu:
import { getDataFastAllowedHostnames } from '@/lib/countries';
datafastScript.setAttribute('data-allowed-hostnames', getDataFastAllowedHostnames());
// → Generiert automatisch: 'pferdewert.at,pferdewert.ch'
```

**Hinweis:** Aktuell ist `pferdewert.at` hardcoded. Vor CH-Launch sollte die dynamische Lösung implementiert werden, damit neue Länder automatisch erfasst werden.

### Phase 3.6: SEO & Sitemap Setup (30min)

**Basierend auf AT-Learnings (Nov 2025):**

**1. Sitemap-Script erweitern** (`scripts/generate-sitemap.mjs`):
```javascript
const DOMAINS = {
  DE: 'https://pferdewert.de',  // non-www (Vercel redirects www → non-www)
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',  // NEU
};

const OUTPUT_PATHS = {
  DE: 'public/sitemap-de.xml',
  AT: 'public/sitemap-at.xml',
  CH: 'public/sitemap-ch.xml',  // NEU
};
```

**2. API Routes erweitern** (`pages/api/sitemap.ts` + `pages/api/robots.ts`):
```typescript
const isChDomain = host.includes('pferdewert.ch');
const isAtDomain = host.includes('pferdewert.at');

const sitemapFile = isChDomain ? 'sitemap-ch.xml'
  : isAtDomain ? 'sitemap-at.xml'
  : 'sitemap-de.xml';
```

**3. middleware.ts - Canonical Domains erweitern:**
```typescript
const CANONICAL_DOMAINS = {
  AT: 'pferdewert.at',
  DE: 'pferdewert.de',  // non-www (Vercel redirects www → non-www)
  CH: 'pferdewert.ch',  // CH ohne www (wie AT)
};
```

**4. Google Search Console Setup:**
- [ ] `pferdewert.ch` als neue Property hinzufügen
- [ ] Sitemap einreichen: `https://pferdewert.ch/sitemap.xml`
- [ ] Favicon wird automatisch gecrawlt (kann 1-2 Wochen dauern)

**5. countries.ts erweitern:**
```typescript
{
  code: 'CH',
  name: 'Schweiz',
  domain: 'pferdewert.ch',
  urlPrefix: '/ch', // DEPRECATED
  locale: 'de-CH',
  enabled: true,  // Aktivieren bei Launch
}
```

### Phase 4: Testing

- [ ] pferdewert.ch zeigt CH-Content
- [ ] CHF 19,90 wird angezeigt
- [ ] Stripe CHF Payment funktioniert
- [ ] Ausbildung: A/L/M/S (kein E, keine LP/LM)
- [ ] hreflang Tags: `de-CH` zeigt auf pferdewert.ch
- [ ] Sitemap enthält CH-URLs (pferdewert.ch/...)
- [ ] LocalizedLink funktioniert (bleibt auf .ch)
- [ ] DataFa.st trackt pferdewert.ch Besucher (Cross-Domain)
- [ ] `/sitemap.xml` auf pferdewert.ch liefert CH-URLs (nicht DE!)
- [ ] `/robots.txt` auf pferdewert.ch zeigt auf CH-Sitemap
- [ ] GSC Property für pferdewert.ch eingerichtet

---

## Nächste Schritte

1. [x] pferdewert.ch Domain gekauft
2. [x] AT Domain-Separation implementiert und gemerged (Nov 2025)
3. [x] DataFa.st Cross-Domain für AT konfiguriert (`data-allowed-hostnames`)
4. [x] Sitemap/robots.txt Domain-basiert (API Routes für dynamische Auslieferung)
5. [x] GSC: pferdewert.at Property hinzugefügt
6. [ ] CH zu Domain-Config hinzufügen (middleware.ts, countries.ts, CANONICAL_DOMAINS)
7. [ ] Stripe CHF aktivieren + Price erstellen
8. [ ] pferdewert.ch in Vercel hinzufügen (DNS: CNAME → cname.vercel-dns.com)
9. [ ] Sitemap-Script erweitern (CH hinzufügen)
10. [ ] API Routes erweitern (sitemap.ts, robots.ts für CH)
11. [ ] DataFa.st: `getDataFastAllowedHostnames()` implementieren (dynamisch)
12. [ ] DataFa.st Dashboard: pferdewert.ch als Additional Domain hinzufügen
13. [ ] GSC: pferdewert.ch Property hinzufügen + Sitemap einreichen
14. [ ] 4 Artikel schreiben (6h)
15. [ ] Testing (inkl. Sitemap/robots.txt Checks!)
16. [ ] Launch

---

**Wichtig:** Französische Schweiz (20% Markt) erst wenn Deutsch-CH > 2 Verkäufe/Monat generiert.
