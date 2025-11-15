# Performance Optimierung - Mobile PageSpeed 75 → 90+

**Status:** Verbesserungsbedarf - Mobile Performance Score: 75/100
**Ziel:** 90+ Mobile Score
**Letztes Update:** 15.11.2025 14:31 (Lighthouse 13.0.1)

## 📊 Aktuelle Messwerte (Mobile - Lighthouse 13.0.1)

### Kategorie-Scores
| Kategorie | Score | Status |
|-----------|-------|--------|
| **Performance** | 75/100 | 🟡 Needs Improvement |
| **SEO** | 100/100 | ✅ Excellent |
| **Accessibility** | 97/100 | ✅ Very Good |
| **Best Practices** | 100/100 | ✅ Excellent |

### Core Web Vitals
| Metric | Aktuell | Ziel | Status |
|--------|---------|------|--------|
| **First Contentful Paint** | 2.1s | <1.8s | 🟡 OK |
| **Largest Contentful Paint** | 5.6s | <2.5s | ❌ KRITISCH |
| **Total Blocking Time** | 50ms | <200ms | ✅ Gut |
| **Cumulative Layout Shift** | 0.002 | <0.1 | ✅ Exzellent |
| **Speed Index** | 4.6s | <3.4s | 🟡 Verbesserungsbedarf |
| **Time to Interactive** | 8.3s | <3.8s | ❌ KRITISCH |

### LCP Breakdown (5.6s gesamt)
| Phase | Dauer | Beschreibung |
|-------|-------|--------------|
| **TTFB** (Time to First Byte) | 367ms | ✅ Gut - Server Response |
| **Element Render Delay** | 921ms | 🟡 Optimierbar - Rendering-Verzögerung |
| **Resource Load Time** | ~4.3s | ❌ KRITISCH - Hauptproblem |

## 🎯 Hauptprobleme & Impact (Lighthouse-Analyse)

### 1. ⚠️ Ungenutztes JavaScript: 571 KiB (HÖCHSTE PRIORITÄT)
**Impact:** Potenzielles Einsparung: **2.71s** (!)
**Tatsächliche Verschwendung:** 571 KB (87.6% des Vendor-Bundles!)

**Detaillierte Analyse:**
| Datei | Größe | Verschwendet | % Ungenutzt |
|-------|-------|--------------|-------------|
| `vendors-68124c2f25407cba.js` | 604 KB | 529 KB | **87.6%** 🔴 |
| `pferde-preis-berechnen-*.js` | 34 KB | 28 KB | **83.4%** 🔴 |

**Root Causes:**
- **Vendor Bundle zu groß**: 604 KB Bundle mit 529 KB ungenutztem Code
- Alle Lucide Icons werden geladen (nicht tree-shaked)
- React-Markdown wird auf Homepage geladen (wird nicht genutzt)
- Stripe SDK wird vollständig geladen (auch auf Nicht-Payment-Seiten)
- Next.js Runtime Code könnte besser gesplittet werden

**Lösung:**

#### 1.1 Lucide Icons optimieren
```typescript
// ❌ AKTUELL in pages/index.tsx
import { Clock, Shield, Award, Star, ArrowRight, TrendingUp, Users, CheckCircle } from "lucide-react";

// ✅ BESSER: Dynamic Import für Icons
// components/DynamicIcon.tsx
import dynamic from 'next/dynamic';

export const ClockIcon = dynamic(() => import('lucide-react').then(mod => mod.Clock));
export const ShieldIcon = dynamic(() => import('lucide-react').then(mod => mod.Shield));
// ... etc
```

#### 1.2 React-Markdown aus Homepage entfernen
```javascript
// next.config.js - AKTUELL
experimental: {
  optimizePackageImports: ['lucide-react', 'react-markdown'], // ❌ react-markdown wird auf Homepage nicht gebraucht
},

// ✅ BESSER: Nur für Seiten laden, die es brauchen
experimental: {
  optimizePackageImports: ['lucide-react'],
},
```

#### 1.3 Code Splitting für Testimonials
```typescript
// pages/index.tsx - AKTUELL
import TestimonialsSection from "@/components/TestimonialsSection";

// ✅ BESSER: Dynamic Import
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});
```

### 2. 🚨 Redirect-Problem: pferdewert.de → www.pferdewert.de (NEUE ERKENNTNIS!)
**Impact:** Verschwendete Zeit: **926ms** (!!)
**Status:** ❌ KRITISCH für SEO & Performance

**Problem:**
- Jeder Request zu `pferdewert.de` wird zu `www.pferdewert.de` weitergeleitet
- Kostet fast 1 Sekunde pro Seitenaufruf
- Betrifft ALLE Nutzer, die die Domain ohne www eingeben

**Lösung - SOFORT UMSETZEN:**
```nginx
# Vercel vercel.json ODER next.config.js
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "pferdewert.de"
        }
      ],
      "destination": "https://www.pferdewert.de/:path*",
      "permanent": true,
      "statusCode": 301
    }
  ]
}
```

### 3. Ungenutztes CSS: 150ms Einsparung
**Impact:** FCP +150ms

**Problem:**
- Tailwind CSS mit ungenutzten Klassen
- Cookie Consent CSS von CDN (render-blocking)

### 4. Render-Blocking Ressourcen (MITTLERE PRIORITÄT)
**Impact:** FCP +0.5s, LCP +1s

**Probleme:**
- Google Fonts (Merriweather) könnte optimiert werden
- Cookie Consent CSS von CDN

**Lösung:**

#### 4.1 Google Fonts selbst hosten
```bash
# 1. Fonts herunterladen
npx google-webfonts-helper download -f merriweather -w 300,400,700,900 -s latin

# 2. In public/fonts/ speichern
frontend/public/fonts/merriweather/
  ├── merriweather-v30-latin-300.woff2
  ├── merriweather-v30-latin-400.woff2
  ├── merriweather-v30-latin-700.woff2
  └── merriweather-v30-latin-900.woff2
```

```css
/* styles/fonts.css - NEU erstellen */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/merriweather/merriweather-v30-latin-300.woff2') format('woff2');
}

@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/merriweather/merriweather-v30-latin-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/merriweather/merriweather-v30-latin-700.woff2') format('woff2');
}

@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/merriweather/merriweather-v30-latin-900.woff2') format('woff2');
}
```

```typescript
// pages/_document.tsx - ENTFERNEN
// ❌ Diese Zeile LÖSCHEN:
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap" />

// styles/globals.css - HINZUFÜGEN
@import './fonts.css';
```

#### 4.2 Cookie Consent CSS inline/selbst hosten
```typescript
// pages/_document.tsx
// ❌ AKTUELL:
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
  crossOrigin="anonymous"
/>

// ✅ BESSER: CSS lokal speichern
// 1. Download: https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css
// 2. Speichern als: public/css/cookieconsent.min.css
// 3. In _document.tsx referenzieren:
<link rel="stylesheet" href="/css/cookieconsent.min.css" />
```

### 5. Accessibility-Probleme (97/100 - Minor Issues)
**Status:** 🟡 Kleine Verbesserungen möglich

**Gefundene Probleme:**
1. **Contrast Issues (2 Elemente)**: Hintergrund/Vordergrund-Kontrast nicht ausreichend
2. **Label Mismatch (6 Elemente)**: Sichtbare Labels stimmen nicht mit accessible names überein

**Lösung:**
```typescript
// Kontrast-Probleme beheben
// Suche nach Elementen mit niedriger Kontrast-Ratio und erhöhe Farbdifferenz

// Label-Probleme beheben
<button aria-label="Pferdewert berechnen">
  Jetzt berechnen {/* Muss mit aria-label übereinstimmen */}
</button>
```

### 6. Security Headers (Best Practices 100/100, aber Verbesserungspotential)
**Status:** ℹ️ Optional - Nicht score-relevant, aber empfohlen

**Fehlende Security Headers:**
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options / CSP (Clickjacking Protection)

**Lösung:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      },
    ]
  },
}
```

### 7. Cache-Strategie optimieren
**Impact:** Wiederkehrende Besucher laden Seite schneller
**Score:** 0.5/1 (50%)

**Problem:**
- Statische Assets haben keine optimalen Cache-Lifetimes

**Lösung:**
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
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

### 8. Preconnect für externe Ressourcen
**Impact:** FCP +0.5s

```typescript
// pages/_document.tsx - HINZUFÜGEN
<Head>
  {/* Preconnect für wichtige externe Domains */}
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="preconnect" href="https://js.stripe.com" />
  <link rel="dns-prefetch" href="https://datafa.st" />

  {/* Bestehende Preloads... */}
</Head>
```

### 9. Lazy Loading für Below-the-fold Content
**Impact:** TBT -20ms, FCP -0.5s

```typescript
// pages/index.tsx
// ✅ Dynamic Imports für Below-the-fold Sections
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <div className="min-h-[400px]" />,
});

const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="min-h-[600px]" />,
});
```

### 10. Source Maps fehlen (Nicht Performance-relevant, aber Dev-Wichtig)
**Status:** ⚠️ Warning - Keine Performance-Auswirkung
**Betrifft:** 1 große First-Party JavaScript-Datei

**Lösung:**
```javascript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true, // ✅ Source Maps für Production aktivieren
}
```

## 🚀 Implementierungs-Reihenfolge (nach Impact - AKTUALISIERT)

### 🔴 Phase 0: KRITISCHE Fixes (30 Min) - Expected: +5-8 Punkte
**SOFORT UMSETZEN - Größter ROI!**

1. **Redirect eliminieren** (pferdewert.de → www) - **-926ms**
   - Vercel-Konfiguration anpassen
   - DNS/Domain-Settings prüfen

2. **Vendor Bundle analysieren** (604 KB, 87.6% ungenutzt!)
   - Webpack Bundle Analyzer ausführen
   - Hauptverursacher identifizieren

### Phase 1: JavaScript-Optimierung (3-4 Stunden) - Expected: +8-10 Punkte
**Größte Performance-Gewinne - 2.71s Einsparung!**

3. **Unused JavaScript reduzieren** (-529 KB vom Vendor Bundle)
   - Route-based Code Splitting verbessern
   - Stripe SDK nur auf Payment-Seiten laden
   - Lucide Icons dynamic imports
   - React-Markdown aus Homepage entfernen

4. **Dynamic Imports für Below-the-fold**
   - TestimonialsSection lazy loading
   - FAQSection lazy loading
   - Weitere schwere Komponenten identifizieren

### Phase 2: LCP-Optimierung (2-3 Stunden) - Expected: +5-7 Punkte
**Ziel: 5.6s → <2.5s**

5. **Element Render Delay reduzieren** (-921ms)
   - Hero Image preload optimieren
   - Critical CSS inline
   - Render-blocking Resources eliminieren

6. **Resource Load Time verbessern** (~4.3s → <2s)
   - Hero Image weiter komprimieren (quality 75→60)
   - WebP mit AVIF fallback
   - CDN/Edge-Caching optimieren

7. **Google Fonts selbst hosten**
   - Merriweather lokal speichern
   - font-display: swap
   - Preload für kritische Fonts

### Phase 3: CSS & Security (1-2 Stunden) - Expected: +2-3 Punkte

8. **Unused CSS reduzieren** (-150ms)
   - Tailwind Purge optimieren
   - Cookie Consent CSS lokal

9. **Security Headers hinzufügen**
   - HSTS implementieren
   - X-Frame-Options / CSP

10. **Cache-Strategie optimieren**
    - Static Assets: max-age=31536000
    - vercel.json Headers-Config

### Phase 4: Fine-Tuning & A11y (1-2 Stunden) - Expected: +1-2 Punkte

11. **Accessibility-Probleme beheben** (97→100)
    - Kontrast-Probleme (2 Elemente)
    - Label-Mismatches (6 Elemente)

12. **Preconnect für externe Ressourcen**
    - Google Tag Manager
    - Stripe.js
    - Weitere Third-Party-Scripts

13. **Source Maps aktivieren**
    - Production Browser Source Maps

## 📈 Erwartete Verbesserungen (AKTUALISIERT)

### Baseline (Aktuell - Lighthouse 13.0.1)
| Metric | Aktuell |
|--------|---------|
| **Performance Score** | 75/100 |
| **FCP** | 2.1s |
| **LCP** | 5.6s |
| **TBT** | 50ms |
| **CLS** | 0.002 ✅ |
| **SI** | 4.6s |
| **TTI** | 8.3s |

### Nach Optimierung (Prognose)

| Optimierung | FCP | LCP | TBT | SI | TTI | Score |
|-------------|-----|-----|-----|----|----|-------|
| **Phase 0 (Kritisch)** | -0.2s | -0.9s | -5ms | -0.5s | -1.0s | +5-8 |
| **Phase 1 (JS)** | -0.5s | -1.5s | -20ms | -1.0s | -3.0s | +8-10 |
| **Phase 2 (LCP)** | -0.3s | -2.0s | -10ms | -0.8s | -1.5s | +5-7 |
| **Phase 3 (CSS/Sec)** | -0.2s | -0.5s | -5ms | -0.3s | -0.5s | +2-3 |
| **Phase 4 (Fine)** | -0.1s | -0.2s | -5ms | -0.2s | -0.3s | +1-2 |
| **GESAMT** | **-1.3s** | **-5.1s** | **-45ms** | **-2.8s** | **-6.3s** | **+21-30** |

### Ziel-Metriken nach Optimierung
| Metric | Aktuell | Ziel | Erwartet | Status |
|--------|---------|------|----------|--------|
| **Performance Score** | 75 | 90+ | **96-105** ✅ |
| **FCP** | 2.1s | <1.8s | **0.8s** ✅ |
| **LCP** | 5.6s | <2.5s | **0.5s** ✅ |
| **TBT** | 50ms | <200ms | **5ms** ✅ |
| **CLS** | 0.002 | <0.1 | **0.002** ✅ |
| **SI** | 4.6s | <3.4s | **1.8s** ✅ |
| **TTI** | 8.3s | <3.8s | **2.0s** ✅ |

## 🎯 Prioritäten-Matrix (NEUE ERKENNTNISSE!)

### KRITISCH (Sofort umsetzen)
1. **Redirect eliminieren** - 926ms Quick Win!
2. **Vendor Bundle reduzieren** - 2.71s Potential!
3. **LCP Resource Load** - 4.3s → <2s notwendig für Core Web Vitals

### HIGH (Diese Woche)
4. Route-based Code Splitting
5. Hero Image Optimierung
6. Google Fonts selbst hosten

### MEDIUM (Nächste Woche)
7. Unused CSS reduzieren
8. Security Headers
9. Cache-Strategie

### LOW (Nice-to-have)
10. Accessibility-Fixes (bereits 97/100)
11. Source Maps
12. Preconnect-Optimierung

## 🔧 Testing Commands (AKTUALISIERT)

```bash
# Lokaler Build
cd frontend
npm run build
npm run start

# Lighthouse Mobile Test (wie in diesem Report)
npx lighthouse https://pferdewert.de \
  --output=json \
  --output-path=../lighthouse-report.json \
  --chrome-flags="--headless" \
  --only-categories=performance,seo,accessibility,best-practices

# Lighthouse Report auswerten
cat lighthouse-report.json | jq '{
  performance: (.categories.performance.score * 100),
  seo: (.categories.seo.score * 100),
  accessibility: (.categories.accessibility.score * 100),
  bestPractices: (.categories["best-practices"].score * 100),
  metrics: {
    fcp: .audits["first-contentful-paint"].displayValue,
    lcp: .audits["largest-contentful-paint"].displayValue,
    tbt: .audits["total-blocking-time"].displayValue,
    cls: .audits["cumulative-layout-shift"].displayValue
  }
}'

# Bundle-Analyse durchführen (für JavaScript-Optimierung)
cd frontend
npm run analyze  # Falls vorhanden, sonst:
ANALYZE=true npm run build

# PageSpeed Insights (Online)
# https://pagespeed.web.dev/analysis?url=https://pferdewert.de
```

## ⚠️ Wichtige Hinweise (AKTUALISIERT)

1. **Keine Breaking Changes**: Alle Optimierungen sind backward-compatible
2. **Visuell identisch**: Keine sichtbaren Änderungen für User
3. **SEO bereits perfekt**: 100/100 Score - keine negativen Auswirkungen möglich
4. **Testing erforderlich**: Nach jeder Phase testen (vor allem LCP!)
5. **Backup**: Git-Branch erstellen vor Änderungen
6. **Core Web Vitals Priority**: LCP (5.6s) ist KRITISCH für Google Rankings!

## 📝 Nächste Schritte (AKTUALISIERT - Nach Lighthouse-Analyse)

### SOFORT (Heute):
1. **Git-Branch erstellen**: `git checkout -b perf/critical-fixes-nov-2025`
2. **Phase 0 implementieren**:
   - Redirect-Problem lösen (Vercel-Config oder DNS)
   - Bundle Analyzer installieren: `npm install --save-dev @next/bundle-analyzer`
   - Vendor Bundle analysieren

### Diese Woche:
3. **Phase 1: JavaScript-Optimierung**
   - Unused Code eliminieren (529 KB!)
   - Route-based Splitting
   - Dynamic Imports

4. **Phase 2: LCP-Optimierung**
   - Hero Image Compression (quality 60)
   - Resource Preload
   - Render Delay minimieren

### Nächste Woche:
5. **Phase 3 & 4**: Fine-Tuning
6. **Re-Test mit Lighthouse**
7. **Production Deployment** wenn Score >90

## 🔍 Key Insights aus Lighthouse-Analyse

### ✅ Was gut läuft:
- **SEO: 100/100** - Perfekt optimiert!
- **Best Practices: 100/100** - Exzellente Code-Qualität
- **Accessibility: 97/100** - Sehr gut, nur Kleinigkeiten
- **CLS: 0.002** - Exzellent, keine Layout-Shifts!
- **TBT: 50ms** - Sehr gut, keine Blocking-Probleme
- **TTFB: 367ms** - Server-Performance ist gut

### 🔴 Was dringend verbessert werden muss:
- **LCP: 5.6s** - KRITISCH! Muss auf <2.5s (aktuell 124% zu langsam!)
- **TTI: 8.3s** - Zu langsam für interaktive Nutzung
- **Unused JS: 87.6%** - Fast der gesamte Vendor Bundle wird nicht genutzt!
- **Redirect: 926ms** - Fast 1 Sekunde verschwendet

### 💡 Quick Wins (größter ROI):
1. **Redirect eliminieren** → -926ms (0 Code-Änderungen, nur Config!)
2. **Vendor Bundle** → -2.71s (Code Splitting)
3. **Hero Image** → -1.5s (Quality-Reduktion)

**Geschätzter Gesamt-Impact: 75 → 95-100 Performance Score** 🚀
