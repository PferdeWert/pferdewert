# Performance Optimierung - Implementation Guide

**Ziel:** Bundle-Größe reduzieren und Core Web Vitals verbessern
**Startdatum:** 2025-11-16
**Priorität:** Hoch (Performance Score 75/100)

---

## ISSUE 1: @react-pdf/renderer Dynamic Import

### Problem
- **Größe:** 347 KiB
- **Aktueller Import:** Static, wird auf jeder Seite geladen
- **Betroffen:** Homepage, alle Seiten
- **Impact:** LCP +500-800ms

### Analyse Current Code

```bash
# Suche nach @react-pdf Importen
grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/pages/
grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/components/
grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/lib/
```

### Lösung - Dynamic Import

**Betroffen: `/pages/ergebnis.tsx` oder ähnlich**

Aktueller Code (FALSCH):
```typescript
// ❌ BAD - Wird immer gebundelt
import Document from '@react-pdf/renderer';

export default function ErgebnisPage() {
  return <Document>...</Document>;
}
```

Optimierter Code (RICHTIG):
```typescript
// ✅ GOOD - Nur auf dieser Route geladen
import dynamic from 'next/dynamic';

const PDFDocument = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.Document),
  {
    loading: () => <div className="flex justify-center p-8">PDF wird geladen...</div>,
    ssr: false // PDF Rendering braucht nicht am Server zu passieren
  }
);

export default function ErgebnisPage() {
  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <PDFDocument>...</PDFDocument>
    </Suspense>
  );
}
```

**Fallback Spinner Component (wiederverwenden):**
```typescript
// components/PDFLoadingSpinner.tsx
export function PDFLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="animate-spin">
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v0a8 8 0 100 16v0a8 8 0 01-8-8z" />
        </svg>
      </div>
      <p className="text-sm text-gray-600">PDF wird generiert...</p>
    </div>
  );
}
```

### Testing

```bash
# Bundle-Größe vor und nach testen
npm run build

# Check ob @react-pdf noch im Main Chunk ist
ls -lh .next/static/chunks/ | grep -E '(vendors|react-pdf)'

# Größe sollte sinken!
```

### Metriken Nach Implementierung
- **Bundle Reduction:** -347 KiB
- **LCP Improvement:** -500-800ms (erwartet)
- **TTI Improvement:** -400-600ms (erwartet)

---

## ISSUE 2: MongoDB aus Frontend entfernen

### Problem
- **Größe:** ~500 KiB (geschätzt, im Vendor Bundle)
- **Problem:** NoSQL-DB-Driver sollte NIEMALS im Frontend sein!
- **Security Risk:** DB-Credentials könnten exponiert sein
- **Impact:** Träge Bundle-Parsing

### Root Cause Analyse

```bash
# Finde alle MongoDB Imports im Frontend
grep -r "from 'mongodb'" /Users/benjaminreder/Developer/pferdewert/frontend/
grep -r "from \"mongodb\"" /Users/benjaminreder/Developer/pferdewert/frontend/
grep -r "import.*mongodb" /Users/benjaminreder/Developer/pferdewert/frontend/

# Beispiel Output:
# - lib/mongo.ts: import { MongoClient } from 'mongodb';
# - middleware.ts: Könnte DB-Zugriffe haben
```

### Analyse: Wo wird MongoDB importiert?

**Problem:** `/lib/mongo.ts` wird wahrscheinlich in:
- ❌ API Routes geladen (OK)
- ❌ Server-Side Props (OK)
- ✅ Components (NICHT OK!)
- ✅ _app.tsx (NICHT OK!)
- ✅ Middleware (KÖNNTE ein Problem sein)

### Lösung - Database-Calls isolieren

**Schema:**
```
Frontend Code
    ↓
API Routes (/pages/api/)  ← NUR hier MongoDB verwenden!
    ↓
Backend Service (optional)
```

**Beispiel Migration:**

Vorher (FALSCH - DB im Frontend):
```typescript
// lib/mongo.ts - EXPOSED ZUM FRONTEND!
import { MongoClient } from 'mongodb';

export async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  return client.db('pferdewert');
}
```

Nachher (RICHTIG - nur in API):
```typescript
// pages/api/evaluation/save.ts
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Not allowed' });

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    const db = client.db('pferdewert');
    // Save evaluation...
  } finally {
    await client.close();
  }
}
```

Frontend ruft nur die API auf:
```typescript
// components/EvaluationForm.tsx
async function saveEvaluation(data) {
  const response = await fetch('/api/evaluation/save', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}
```

### Umsetzungs-Schritte

1. **Identifiziere alle MongoDB Imports:**
   ```bash
   grep -r "mongodb" /Users/benjaminreder/Developer/pferdewert/frontend/
   ```

2. **Für jeden Import im Frontend-Code:**
   - Falls in `/pages/api/` → ✅ Keep as-is
   - Falls in `/components/` → ❌ Move to API Route
   - Falls in `/lib/` → ✅ Keep but only for server
   - Falls in `_app.tsx` → ❌ Move to getInitialProps/getServerSideProps

3. **Umschreiben zu API-Calls:**
   ```typescript
   // Vorher
   import { connectDB } from '@/lib/mongo';

   export async function getServerSideProps() {
     const db = await connectDB();
     const data = await db.collection('users').findOne({...});
     return { props: { data } };
   }

   // Nachher (Server-Side nur!)
   export async function getServerSideProps(context) {
     const response = await fetch('http://localhost:3000/api/user', {
       headers: { 'Cookie': context.req.headers.cookie }
     });
     const data = await response.json();
     return { props: { data } };
   }
   ```

### Metriken Nach Implementierung
- **Bundle Reduction:** -500 KiB
- **Security:** Enormer Gewinn (keine DB-Credentials im Frontend!)
- **Parsing Time:** -100ms
- **TTI Improvement:** -600-800ms

---

## ISSUE 3: Unused JavaScript in Vendor Bundle (558 KiB)

### Problem
- **87.6% des Vendor Bundles ist unused auf der Homepage!**
- **542 KiB verschwendet**
- **Impact:** LCP -2.7 Sekunden möglich

### Root Cause

Vendor Bundle enthält:
- ✅ React, React-DOM (immer nötig)
- ✅ Stripe (nötig auf Checkout)
- ⚠️ OpenAI/Claude APIs (nur auf Evaluation nötig)
- ⚠️ Markdown Parser (nur auf Ratgeber nötig)
- ⚠️ PDF Libraries (nur auf Ergebnis nötig)
- ⚠️ Form Libraries (nur auf Preis-Berechnung nötig)

### Analyse: Bundle-Zusammensetzung

```bash
# Verwende Bundle-Analyzer
ANALYZE=true npm run build
```

Dies generiert eine HTML-Visualization der Bundle-Größe.

### Lösung - Code-Splitting nach Route

**next.config.js Update:**

```javascript
// Aktuell (nicht optimal)
experimental: {
  optimizePackageImports: ['lucide-react'],
},

// Verbessert:
experimental: {
  optimizePackageImports: [
    'lucide-react',
    'openai',      // Nur für API/Server-Funcs
    'mongodb',     // Nur für API/Server-Funcs
    'resend',      // Nur für Server-Actions
  ],
},
```

### Lösung - Dynamic Imports für Heavy Components

Identifiziere schwere Komponenten und lade sie dynamisch:

```typescript
// pages/pferde-preis-berechnen.tsx
import dynamic from 'next/dynamic';

const HeavyEvaluationForm = dynamic(
  () => import('@/components/HeavyEvaluationForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: true // Falls SEO wichtig ist
  }
);

// Nur wenn nötig geladen!
export default function PricePage() {
  return (
    <div>
      <h1>Pferd bewerten</h1>
      <HeavyEvaluationForm />
    </div>
  );
}
```

### Umsetzungs-Schritte

1. **Bundle-Analyzer laufen lassen:**
   ```bash
   cd /Users/benjaminreder/Developer/pferdewert/frontend
   ANALYZE=true npm run build

   # Öffnet: .next/analyze/__bundle_analysis.html
   ```

2. **Große Dependencies identifizieren:**
   - Notiere alles > 100 KiB
   - Prüfe ob es auf JEDER Seite nötig ist

3. **Für nicht-essenzielle:** Dynamic Import nutzen

4. **Teste ob Functionality noch funktioniert:**
   ```bash
   npm run build
   npm run start
   ```

### Metriken Nach Implementierung
- **Bundle Reduction:** -558 KiB (Estimate)
- **LCP Improvement:** -1.5-2.0 seconds
- **TTI Improvement:** -1.5-2.0 seconds
- **Performance Score:** +15-20 Punkte

---

## ISSUE 4: Element Render Delay (921ms)

### Problem
- **Aktuell:** 921ms
- **Sollte sein:** < 500ms
- **Root Cause:** Großes JavaScript wird vor Render geparst

### Analyse

LCP Breakdown (aus Lighthouse):
- Time to First Byte: 367ms ✅
- Element Render Delay: **921ms** ⚠️
  - Script Parse/Compile: 102ms (aus Vendor JS)
  - Browser Rendering: ~300ms
  - Other JS: ~519ms

### Lösungs-Strategien

#### 4.1 Vendor Bundle in kleinere Chunks aufteilen

```javascript
// next.config.js - Bessere Chunk-Strategie
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,  // Mehr Chunks erlauben
      minSize: 20000,           // Smaller minimum
      cacheGroups: {
        // React-Core Chunk
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-core',
          priority: 30,
          enforce: true,
          reuseExistingChunk: true,
        },

        // Stripe Chunk
        stripe: {
          test: /[\\/]node_modules[\\/]@stripe[\\/]/,
          name: 'stripe-lib',
          priority: 25,
          enforce: true,
        },

        // Icons Library
        lucide: {
          test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
          name: 'lucide-icons',
          priority: 20,
          enforce: true,
        },

        // PDF Libraries (async)
        reactPdf: {
          test: /[\\/]node_modules[\\/]@react-pdf[\\/]/,
          name: 'react-pdf',
          chunks: 'async',
          priority: 20,
          enforce: true,
        },

        // Rest der Vendor Dependencies
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors-other',
          priority: 10,
          reuseExistingChunk: true,
        },

        // Shared Code zwischen Routes
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    };
  }
  return config;
},
```

#### 4.2 Script Streaming nutzen

```typescript
// components/Layout.tsx
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Prioritäts-Bundles - im <head> geladen, ssr=false */}
      </head>
      <body>
        <header>
          <Nav /> {/* Kritisch, in main.js */}
        </header>

        <Suspense fallback={<div>Loading content...</div>}>
          <main>
            {/* Seiten-spezifisches JS wird async geladen */}
            {children}
          </main>
        </Suspense>

        {/* Non-kritisches JS am Ende */}
        <Analytics />
      </body>
    </html>
  );
}
```

#### 4.3 NextJS script optimization

```typescript
// _app.tsx
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      {/* Nur wenn nötig laden */}
      <Script
        src="..."
        strategy="lazyOnload"  // Nicht critical
        onLoad={() => {
          // Callback after script loaded
        }}
      />
    </>
  );
}
```

### Metriken Nach Implementierung
- **Script Parse/Compile:** 102ms → 30-50ms (-50%)
- **Element Render Delay:** 921ms → 400-500ms (-50%)
- **LCP:** 5.6s → 4.5-5.0s (-0.6-1.1s)

---

## ISSUE 5: First Contentful Paint (2.1s)

### Problem
- **Aktuell:** 2.1s
- **Ideal:** < 1.8s
- **Gap:** 300ms

### Ursachen
1. Vendor Bundle Parsing: 102ms
2. TTFB: 367ms (evtl. Server-Latenz)
3. CSS Loading: Minimal (12.8K gut)

### Lösungen (in Priorität)

#### 5.1 CDN für JavaScript (große Einsparung)
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/_next/static/chunks/vendors-(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'  // 1 Jahr cachen
        }
      ]
    }
  ];
}
```

Damit Vercel/CDN die Bundles aggressiv cachen kann.

#### 5.2 Critical CSS Inlinen
```typescript
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Critical CSS inline in <head> */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

#### 5.3 Preload Critical Resources
```typescript
// _app.tsx oder _document.tsx
<link rel="preload" as="script" href="/_next/static/chunks/main.js" />
<link rel="preload" as="script" href="/_next/static/chunks/react-core.js" />
```

### Metriken Nach Implementierung
- **FCP:** 2.1s → 1.5-1.8s (-0.3-0.6s)

---

## IMPLEMENTIERUNGS-CHECKLISTE

### Phase 1: Quick Wins (3-4 Stunden)

- [ ] @react-pdf dynamic import (30 min)
  - [ ] Finde alle @react-pdf Importe
  - [ ] Umschreibe zu dynamic()
  - [ ] Teste auf /ergebnis Seite
  - [ ] npm run build && check bundle size

- [ ] MongoDB aus Frontend entfernen (1-2 hours)
  - [ ] Finde alle MongoDB Importe
  - [ ] Erstelle API Routes für DB-Zugriffe
  - [ ] Umschreibe Components zu fetch()
  - [ ] Teste alle Funktionalitäten

- [ ] Unused JavaScript identifizieren (30 min)
  - [ ] npm run build mit ANALYZE=true
  - [ ] Identifiziere > 100KiB chunks
  - [ ] Documente welche auf jeder Seite nötig sind

### Phase 2: Code-Splitting (2-3 Stunden)

- [ ] Dynamic Imports für schwere Components
  - [ ] EvaluationForm nur auf /pferde-preis-berechnen
  - [ ] RatgeberContent nur auf /pferde-ratgeber/*
  - [ ] PDF stuff nur auf /ergebnis

- [ ] next.config.js Chunk-Splitting verbessern
  - [ ] react-core separater Chunk
  - [ ] stripe separater Chunk
  - [ ] lucide-icons separater Chunk

- [ ] Testing
  - [ ] npm run build
  - [ ] npm run start
  - [ ] Manuelle Tests aller Routes

### Phase 3: Advanced Optimizations (3-4 Stunden)

- [ ] Script Loading Strategy
  - [ ] <Script strategy="lazyOnload"> für Analytics
  - [ ] Preload für kritische Chunks

- [ ] Lighthouse Regression Testing
  - [ ] Baseline: Score 75
  - [ ] Target: Score 85+
  - [ ] Monitoring einrichten

---

## TESTING & VERIFICATION

### Bundle Size Check Script

```bash
#!/bin/bash
# scripts/check-bundle-size.sh

echo "Building..."
npm run build

echo "=== Bundle Sizes ==="
du -sh .next/static/chunks/* | sort -h

echo "=== JavaScript Chunks ==="
ls -lhS .next/static/chunks/*.js

echo "=== Total Size ==="
du -sh .next/static/chunks/

# Warning wenn zu groß
TOTAL=$(du -sb .next/static/chunks/ | cut -f1)
LIMIT=2097152  # 2 MB
if [ $TOTAL -gt $LIMIT ]; then
  echo "⚠️ WARNING: Bundle größer als 2 MB!"
  exit 1
fi

echo "✅ Bundle OK"
```

### Lighthouse Testing

```bash
npm run build
npm run start

# Im anderen Terminal:
npm run test:e2e -- --reporter=list

# Oder manuell mit Lighthouse CLI:
npm install -g @google/lighthouse
lighthouse https://localhost:3000 --view
```

---

## METRIKEN TRACKING

Erstelle vor-Implementierung einen Baseline:

```bash
# 1. Current Bundle Sizes dokumentieren
du -sh /Users/benjaminreder/Developer/pferdewert/frontend/.next/static/chunks/*

# 2. Lighthouse Score exportieren
npm run build
# Copy lighthouse-report.json

# 3. Nach jeder Phase neu messen
npm run build
du -sh /Users/benjaminreder/Developer/pferdewert/frontend/.next/static/chunks/*
```

---

## NEXT STEPS

1. **Diese Woche:**
   - [ ] Issue #1 & #2 implementieren (Quick Wins)
   - [ ] Testing & QA
   - [ ] PR erstellen & review

2. **Nächste Woche:**
   - [ ] Phase 2 Code-Splitting
   - [ ] Lighthouse Regression Testing
   - [ ] Deploy zu Production

3. **Monitoring:**
   - [ ] Performance Budgets in CI/CD einbauen
   - [ ] Regelmäßige Bundle-Analysen
   - [ ] Lighthouse Monitoring auf Production

---

**Kontakt:** Benjamin Reder (pferdewert.de Entwicklung)
**Last Updated:** 2025-11-16
