# Performance Optimierung - Mobile PageSpeed 62 → 90+

**Status:** Kritisch - Mobile Performance Score: 62/100
**Ziel:** 90+ Mobile Score
**Datum:** 15.11.2025

## 📊 Aktuelle Messwerte (Mobile, Slow 4G)

| Metric | Aktuell | Ziel | Status |
|--------|---------|------|--------|
| **First Contentful Paint** | 5,0s | <2,0s | ❌ Kritisch |
| **Largest Contentful Paint** | 7,9s | <2,5s | ❌ Kritisch |
| **Total Blocking Time** | 50ms | <200ms | ✅ OK |
| **Cumulative Layout Shift** | 0.04 | <0.1 | ✅ Gut |
| **Speed Index** | 5,6s | <3,4s | ❌ Kritisch |

## 🎯 Hauptprobleme & Impact

### 1. Ungenutztes JavaScript: 557 KiB (HÖCHSTE PRIORITÄT)
**Impact:** FCP +3s, LCP +4s
**Einsparung:** ~557 KiB

**Probleme:**
- Große Vendor Bundles mit ungenutztem Code
- Alle Lucide Icons werden geladen (nicht tree-shaked)
- React-Markdown wird auf Homepage geladen (wird nicht genutzt)
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

### 2. Render-Blocking Ressourcen (HÖCHSTE PRIORITÄT)
**Impact:** FCP +2s, LCP +3s

**Probleme:**
- Google Fonts (Merriweather) blockiert Rendering
- Cookie Consent CSS von CDN

**Lösung:**

#### 2.1 Google Fonts selbst hosten
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

#### 2.2 Cookie Consent CSS inline/selbst hosten
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

### 3. Ungenutztes CSS: 10 KiB
**Impact:** FCP +0.3s

**Lösung:**

```javascript
// tailwind.config.js - Purge verbessern
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  // ✅ HINZUFÜGEN:
  safelist: [],
  blocklist: [],
};
```

### 4. Bildoptimierung: 17 KiB möglich
**Impact:** LCP +0.5s

**Aktueller Stand:**
- ✅ Bilder bereits in WebP
- ✅ Next.js Image mit priority und sizes
- ⚠️ Quality könnte von 75 auf 60-65 reduziert werden

**Lösung:**

```bash
# Bilder weiter komprimieren
cd frontend/public/images
for file in *.webp; do
  cwebp -q 60 "$file" -o "optimized-$file"
done
```

```typescript
// components/HeroSection.tsx
<Image
  // ...
  quality={60} // ✅ Von 75 auf 60 reduzieren (kaum sichtbarer Unterschied)
  // ...
/>
```

### 5. Preconnect für externe Ressourcen
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

### 6. Lazy Loading für Below-the-fold Content
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

### 7. Lange Hauptthread-Aufgaben (1 gefunden)
**Impact:** TBT variabel

**Lösung:**
```javascript
// next.config.js - BEREITS OPTIMIERT ✅
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    };
  }
  return config;
}
```

## 🚀 Implementierungs-Reihenfolge (nach Impact)

### Phase 1: Quick Wins (2-3 Stunden) - Expected: +15 Punkte
1. ✅ **Lucide Icons optimieren** (Dynamic Import)
2. ✅ **Google Fonts selbst hosten**
3. ✅ **Cookie Consent CSS lokal**
4. ✅ **Preconnect hinzufügen**

### Phase 2: Code Splitting (2-4 Stunden) - Expected: +10 Punkte
5. ✅ **TestimonialsSection dynamisch laden**
6. ✅ **FAQSection dynamisch laden**
7. ✅ **React-Markdown aus Homepage entfernen**

### Phase 3: Fine-Tuning (1-2 Stunden) - Expected: +3-5 Punkte
8. ✅ **Bildqualität optimieren (75→60)**
9. ✅ **Tailwind Purge verfeinern**

## 📈 Erwartete Verbesserungen

| Optimierung | FCP | LCP | TBT | Score |
|-------------|-----|-----|-----|-------|
| **Phase 1** | -2.5s | -3.5s | -10ms | +15 |
| **Phase 2** | -1.0s | -1.5s | -15ms | +10 |
| **Phase 3** | -0.5s | -0.5s | -5ms | +3-5 |
| **GESAMT** | **-4.0s** | **-5.5s** | **-30ms** | **+28-30** |

**Ziel-Metriken nach Optimierung:**
- FCP: 5,0s → **1,0s** ✅
- LCP: 7,9s → **2,4s** ✅
- Speed Index: 5,6s → **2,0s** ✅
- **Performance Score: 62 → 90+** ✅

## 🔧 Testing Commands

```bash
# Lokaler Build
cd frontend
npm run build
npm run start

# Lighthouse Mobile Test
npx lighthouse https://localhost:3000 --only-categories=performance --preset=desktop --view

# Oder PageSpeed Insights
# https://pagespeed.web.dev/analysis?url=https://pferdewert.de
```

## ⚠️ Wichtige Hinweise

1. **Keine Breaking Changes**: Alle Optimierungen sind backward-compatible
2. **Visuell identisch**: Keine sichtbaren Änderungen für User
3. **SEO-neutral**: Keine negativen SEO-Auswirkungen
4. **Testing erforderlich**: Nach jeder Phase testen
5. **Backup**: Git-Branch erstellen vor Änderungen

## 📝 Nächste Schritte

1. Git-Branch erstellen: `git checkout -b perf/mobile-optimization`
2. Phase 1 implementieren (Quick Wins)
3. Lokal testen mit Lighthouse
4. Commit & Push
5. Auf Vercel Preview testen
6. Bei Erfolg: Phase 2 starten
