# Action Items: PferdeWert.de Technical SEO Fixes

**Generated:** 2025-12-30
**Priority System:** 1 (Highest) - 3 (Lowest)

---

## Sprint 1: Quick Wins (Priority 1)

### 1. Kürze Title Tags auf ≤60 Zeichen

**Problem:** 4 Seiten haben Title Tags, die in SERPs abgeschnitten werden.

**Betroffene URLs:**

| URL | Aktuell | Länge | Vorschlag |
|-----|---------|-------|-----------|
| /pferde-ratgeber/aku-pferd | AKU Pferd: Ablauf, Überblick & Leitfaden der Ankaufsuntersuchung \| PferdeWert | 77 | AKU Pferd: Ablauf & Leitfaden 2025 \| PferdeWert |
| /pferd-kaufen/freizeitpferd | Freizeitpferd kaufen: Vielseitige Allrounder für ambitionierte Reiter | 69 | Freizeitpferd kaufen: Guide & Preise 2025 |
| /pferd-kaufen/bayern | Pferd kaufen Bayern 2025: Alle Marktplätze, Gestüte & Pferdemärkte | 66 | Pferd kaufen Bayern: Gestüte & Märkte 2025 |
| /pferd-kaufen/nrw | Pferd kaufen NRW 2025: Alle Marktplätze, Züchter & Märkte im Überblick | 70 | Pferd kaufen NRW: Züchter & Märkte 2025 |

**Impact:** CTR-Verbesserung durch vollständig sichtbare Titles in SERPs

**Implementierung:**

```tsx
// Beispiel: pages/pferde-ratgeber/aku-pferd.tsx
<Head>
  <title>AKU Pferd: Ablauf & Leitfaden 2025 | PferdeWert</title>
</Head>
```

**Effort:** 15 Minuten
**Success Metric:** Alle Titles ≤60 Zeichen in GSC

---

### 2. Kürze Meta Descriptions auf ≤155 Zeichen

**Problem:** 2 Seiten haben zu lange Meta Descriptions.

**Betroffene URLs:**

| URL | Aktuell | Länge | Vorschlag |
|-----|---------|-------|-----------|
| /pferde-ratgeber/was-kostet-ein-pferd | Pferd Kosten 2025: Komplette Tabellen! ✓ Monatlich (300-900€) ✓ Anschaffung (2.500-20.000€) ✓ Rasse-Vergleich ✓ Regional-Unterschiede ✓ 3 Budget-Szenarien. Jetzt informieren! | 174 | Pferd Kosten 2025: Monatlich 300-900€, Anschaffung 2.500-20.000€. Komplette Tabellen mit Rasse-Vergleich & Budget-Szenarien. |
| /pferd-verkaufen | Pferd verkaufen 2025: Verkaufspreis ermitteln mit KI-Bewertung in 2 Min (ab 14,90€). Plattformvergleich (eHorses vs. pferde.de), 7-Phasen-Verkaufsprozess, rechtliche Absicherung. Jetzt erfolgreich verkaufen! | 207 | Pferd verkaufen 2025: KI-Bewertung in 2 Min (14,90€). Plattformvergleich, 7-Phasen-Prozess & rechtliche Tipps. |

**Implementierung:**

```tsx
// pages/pferde-ratgeber/was-kostet-ein-pferd.tsx
<meta
  name="description"
  content="Pferd Kosten 2025: Monatlich 300-900€, Anschaffung 2.500-20.000€. Komplette Tabellen mit Rasse-Vergleich & Budget-Szenarien."
/>
```

**Effort:** 10 Minuten
**Success Metric:** Alle Descriptions ≤155 Zeichen

---

### 3. Entferne Duplicate Meta Tags

**Problem:** /pferde-ratgeber/aku-pferd hat doppelte meta tags.

**Betroffene Tags:**
- `theme-color` (doppelt)
- `msapplication-tilecolor` (doppelt)

**Implementierung:**

```tsx
// Prüfe _document.tsx oder Layout-Komponente
// Entferne doppelte Meta-Tags - wahrscheinlich einmal global + einmal page-spezifisch

// VORHER (doppelt):
<meta name="theme-color" content="#ffffff" />
<meta name="theme-color" content="#4338ca" />

// NACHHER (einmal):
<meta name="theme-color" content="#4338ca" />
```

**Effort:** 5 Minuten
**Success Metric:** Keine Duplicate Warnings in Lighthouse

---

## Sprint 2: Performance Optimierungen (Priority 2)

### 4. Implementiere längere Cache-TTLs für statische Assets

**Problem:** Lighthouse meldet "Serve static assets with an efficient cache policy" (Score: 0.5)

**Aktuelle Situation:**
- HTML: 1 hour TTL (OK)
- Statische Assets: Variabel/Kurz

**Lösung für Vercel:**

```json
// vercel.json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Effort:** 15 Minuten
**Success Metric:** Lighthouse Cache-Score > 0.8

---

### 5. Entferne Unused CSS

**Problem:** Lighthouse meldet "Reduce unused CSS" (Score: 0.5)

**Ursache:** Tailwind CSS beinhaltet alle Utility-Klassen, auch ungenutzte.

**Lösung:**

```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // PurgeCSS ist standardmäßig in Tailwind v3+ aktiv
  // Prüfe ob alle Pfade korrekt sind
}
```

**Prüfe auch:**
1. Gibt es importierte CSS-Bibliotheken die nicht genutzt werden?
2. Werden globale Styles in _app.tsx importiert die nicht benötigt werden?

```bash
# Analysiere Bundle
npm run build
npx next-bundle-analyzer
```

**Effort:** 30 Minuten
**Success Metric:** CSS Bundle Size -20%

---

### 6. Modernisiere JavaScript Build Target

**Problem:** Lighthouse meldet "Avoid serving legacy JavaScript to modern browsers" (Score: 0.5)

**Lösung:**

```js
// next.config.js
module.exports = {
  // Moderne Browser-Targets (ES2020+)
  experimental: {
    modern: true,
  },
  // Oder explizit in tsconfig.json:
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

**Alternativ: Browserslist konfigurieren:**

```json
// package.json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions"
  ]
}
```

**Effort:** 20 Minuten (+ Testing)
**Success Metric:** JS Bundle Size -10-15%

---

## Sprint 3: Nice-to-Have (Priority 3)

### 7. Füge Image Title Attribute hinzu

**Problem:** Alle Bilder haben nur `alt`, kein `title` Attribut.

**Impact:** Minimal für SEO, aber verbessert UX (Tooltip beim Hover).

**Implementierung:**

```tsx
// Nur für wichtige/informationale Bilder
<Image
  src="/images/hero.webp"
  alt="Pferdebewertung mit KI"
  title="KI-gestützte Pferdebewertung von PferdeWert"
/>
```

**Effort:** 30 Minuten
**Success Metric:** Key images haben title attributes

---

### 8. Inline Critical CSS

**Problem:** 2 render-blocking Stylesheets auf jeder Seite.

**Lösung:** Next.js mit CSS Optimization:

```js
// next.config.js
module.exports = {
  optimizeFonts: true,
  experimental: {
    optimizeCss: true, // Experimentell, prüfen
  }
}
```

**Alternative: Critical CSS Plugin:**

```bash
npm install critters --save-dev
```

**Effort:** 45 Minuten
**Success Metric:** FCP Verbesserung um 50-100ms

---

### 9. Erhöhe Content-Rate auf /pferde-preis-berechnen

**Problem:** Nur 8.1% Text-zu-HTML Ratio (als "low_content_rate" markiert)

**Kontext:** Die Seite ist ein Formular, daher naturgemäß weniger Text.

**Lösung:**
1. Füge FAQ-Abschnitt mit 5-7 Fragen hinzu
2. Erweitere "Was erwartet dich?" Text
3. Füge Trust-Elemente als Text hinzu

**Vorschlag:**

```tsx
<section className="faq-section">
  <h2>Häufige Fragen zur Pferdepreis-Berechnung</h2>
  <details>
    <summary>Wie genau ist die KI-Bewertung?</summary>
    <p>Unsere KI analysiert über 15 Faktoren...</p>
  </details>
  {/* 5-7 weitere FAQs */}
</section>
```

**Effort:** 45 Minuten
**Success Metric:** Text-Ratio > 15%

---

## Implementation Checklist

### Sprint 1 (Diese Woche)

- [ ] Title Tags kürzen (4 Seiten)
- [ ] Meta Descriptions kürzen (2 Seiten)
- [ ] Duplicate Meta Tags entfernen (1 Seite)
- [ ] Änderungen committen
- [ ] Deploy & Verify

### Sprint 2 (Nächste Woche)

- [ ] vercel.json Cache-Headers hinzufügen
- [ ] Tailwind/CSS Purge verifizieren
- [ ] JavaScript Build-Target modernisieren
- [ ] Bundle-Analyse durchführen
- [ ] Performance-Test vor/nach

### Sprint 3 (Backlog)

- [ ] Image Titles bei Hero-Bildern
- [ ] Critical CSS Experiment
- [ ] Bewertungsformular Content erweitern

---

## Verification Commands

```bash
# Nach Deployment prüfen:

# 1. Title Längen
curl -s https://pferdewert.de/pferde-ratgeber/aku-pferd | grep -o '<title>.*</title>'

# 2. Meta Description
curl -s https://pferdewert.de/pferd-verkaufen | grep -o 'name="description" content="[^"]*"'

# 3. Lighthouse CLI
npx lighthouse https://pferdewert.de --output json --quiet | jq '.categories.performance.score'

# 4. Cache Headers prüfen
curl -I https://pferdewert.de/images/shared/blossi-shooting.webp | grep -i cache-control
```

---

## Success Metrics Summary

| Action | Before | Target | Measurement |
|--------|--------|--------|-------------|
| Title Length | 4 too long | 0 too long | GSC/Screaming Frog |
| Description Length | 2 too long | 0 too long | GSC |
| Lighthouse Performance | 97% | >97% | Lighthouse |
| Cache Policy Score | 0.5 | >0.8 | Lighthouse |
| Unused CSS Score | 0.5 | >0.8 | Lighthouse |
| Legacy JS Score | 0.5 | >0.8 | Lighthouse |

---

**Nächster Audit:** Nach Implementierung von Sprint 1+2 (ca. 2 Wochen)
