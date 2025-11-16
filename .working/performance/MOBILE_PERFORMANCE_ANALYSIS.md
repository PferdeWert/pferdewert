# Mobile Performance-Analyse für pferdewert.de
**Analyse-Datum:** 2025-11-16
**Überblick:** Umfassende Mobile Performance-Bewertung mit Bundle-Optimierung und Core Web Vitals

---

## 1. LIGHTHOUSE MOBILE PERFORMANCE SCORES

### Overall Leistungsbewertung (Desktop-Test mit Mobile-Simulation)

| Kategorie | Score | Status |
|-----------|-------|--------|
| **Performance** | **75/100** | ⚠️ Muss optimiert werden |
| **Accessibility** | 97/100 | ✅ Ausgezeichnet |
| **Best Practices** | 100/100 | ✅ Ausgezeichnet |
| **SEO** | 100/100 | ✅ Ausgezeichnet |

---

## 2. CORE WEB VITALS - KRITISCHE METRIKEN

### 2.1 Größte Contentful Paint (LCP) - **HAUPTPROBLEM**
- **Aktueller Wert:** 5.6s
- **Ideal:** < 2.5s
- **Status:** 🔴 SCHLECHT (Score: 0.18)
- **Sparpotential:** 2.7 Sekunden durch Lazy Loading

**Root Causes:**
- Langsame Element-Render-Verzögerung: 921ms (gegenüber 367ms Time-to-First-Byte)
- Großes Vendor-Bundle blockiert hauptes Rendering
- Unused JavaScript lädt automatisch (558 KiB)

**LCP Breakdown:**
- Time to First Byte: 367ms ✅
- Element Render Delay: **921ms** ⚠️ (Hauptproblem)

### 2.2 First Contentful Paint (FCP)
- **Aktueller Wert:** 2.1s
- **Ideal:** < 1.8s
- **Status:** 🟡 GUT ABER OPTIMIERBAR (Score: 0.82)

### 2.3 Cumulative Layout Shift (CLS)
- **Aktueller Wert:** 0.002
- **Ideal:** < 0.1
- **Status:** ✅ AUSGEZEICHNET (Score: 1.0)

### 2.4 Total Blocking Time (TBT) - JavaScript Execution
- **Aktueller Wert:** 50ms
- **Ideal:** < 300ms
- **Status:** ✅ AUSGEZEICHNET (Score: 1.0)
- **JS Execution Time:** 206ms (gering, kein Problem)

### 2.5 Speed Index
- **Aktueller Wert:** 4.6s
- **Ideal:** < 3.4s
- **Status:** 🟡 BEFRIEDIGEND (Score: 0.70)

### 2.6 Time to Interactive
- **Aktueller Wert:** 8.3s
- **Status:** ⚠️ VERBESSERUNGSBEDÜRFTIG (Score: 0.40)

---

## 3. BUNDLE-GRÖSSEN ANALYSE

### 3.1 Production Build Bundle Breakdown

```
Frontend Build Statistik:
├── Gesamtgröße .next/static/chunks/: 2.8M
├── JavaScript Gesamtgröße:           1.95M
├── CSS Gesamtgröße:                  12.8K
└── Andere:                           8.0K
```

### 3.2 JavaScript Chunks - Größen und Probleme

| Chunk | Größe | Typ | Problem |
|-------|-------|-----|---------|
| **vendors-850c761e.js** | **1.2M** | Production Vendor Bundle | 🔴 KRITISCH - 87.6% unused! |
| **react-pdf.055f6e8c.js** | **720K** | @react-pdf Library | ⚠️ Lazy-loaded aber könnte besser sein |
| **polyfills-423726ed.js** | **110K** | Polyfills | ✅ OK |
| **common-9aefab42.js** | **41K** | Shared Chunks | ✅ OK |
| **Pages chunks** | **736K** | Page-specific JS | ⚠️ Teilweise optimierbar |

### 3.3 Vendor Bundle Detailanalyse

**Problem:** Größter Performance-Blocker
- **Größe:** 1.2M (618K transportiert)
- **Unused JavaScript:** 542 KiB (87.6% waste!)
- **Spa-Potentiell:** 558 KiB Einsparung möglich

**In diesem Bundle geladen:**
- ✅ React (große Abhängigkeit)
- ✅ React-DOM (notwendig)
- ✅ Stripe JavaScript
- ✅ lucide-react Icons
- ✅ @tailwindcss Utilities
- ⚠️ Openai/Claude API Clients (ALLE Seiten!)
- ⚠️ MongoDB Driver (CLIENT-SIDE?!)
- ⚠️ Resend Email Library
- ⚠️ markdown-react Parser

**Kritisches Problem:** Nicht alle diese Abhängigkeiten sind notwendig auf JEDER Seite!

### 3.4 Page-specific Chunks

**pferde-preis-berechnen-8144d139.js:**
- Größe: 35K
- Unused: 29K (83.4% waste!)
- Problem: Module auf dieser Seite sind auch im Vendor Bundle enthalten

---

## 4. PERFORMANCE-BLOCKER IDENTIFIZIERT

### 4.1 🔴 KRITISCH - Unused JavaScript (558 KiB)

**Metrik:** Estimated Savings: 558 KiB (LCP -2.7s)

**Betroffene Chunks:**
1. **vendors-850c761e.js** (542 KiB wasted)
   - 87.6% des Vendor Bundles ist nicht notwendig für Homepage
   - Code für Evaluierung (Claude API, MongoDB) auf jeder Seite geladen
   - Email-Library (Resend) auf jeder Seite geladen

2. **pferde-preis-berechnen page** (29 KiB wasted)
   - Duplizierte Dependencies im Vendor Bundle
   - Module könnte async geladen werden

**Impact:** Verzögert LCP um bis zu 2.7 Sekunden!

### 4.2 🟡 WARNUNG - Element Render Delay (921ms)

**Ursache:** Langes JavaScript Parsing/Execution vor dem Rendering
- Vendor Bundle wird geparst: **102ms**
- Browser CPU wird belastet beim Rendering des kritischen Inhalts
- Keine Render-Blocking Ressourcen, aber starke JS-Last

**Potenzielle Ursachen:**
- Große Abhängigkeiten werden synchron geparst
- React-Komponenten könnten Code-Split besser nutzen

### 4.3 🟡 WARNUNG - Time to Interactive (8.3s)

**Ursache:** JavaScript Bootup und Execution
- 206ms für JS Parsing/Execution registriert (gering, aber nicht optimal)
- Main Thread blockiert durch große Bundle-Größe
- Viel JavaScript muss geparst werden bevor Seite interaktiv ist

**Details JS Bootup Time:**
| URL | Total CPU | Scripting | Parse/Compile |
|-----|-----------|-----------|----------------|
| Page Entry | 251ms | 10.8ms | 0.9ms |
| vendors-68124c2f.js | 228ms | **76.6ms** | **102.6ms** |
| Unattributable | 165ms | 15.6ms | 0ms |

### 4.4 🟡 WARNUNG - First Contentful Paint (2.1s)

**Akzeptabel aber verbesserungsfähig**
- Ideal: < 1.8s
- Aktuell: 2.1s (0.3s über Ideal)
- Ursache: Vendor Bundle Parsing kostet 102ms

---

## 5. DEPENDENCIES-ANALYSE

### 5.1 Problematische Dependencies (auf jeder Seite geladen)

```javascript
// ❌ PROBLEM: Diese sind im Vendor Bundle enthalten aber nicht überall nötig
@react-pdf/renderer@4.3.0    // 347 KB! (nur auf /ergebnis nötig)
jspdf@3.0.1                  // Nur auf /ergebnis nötig
openai@5.11.0                // Nur auf /pferde-preis-berechnen nötig
mongodb@6.18.0               // Sollte nicht im Frontend sein! (Backend-only)
resend@4.6.0                 // Nur für Server-Actions nötig
react-markdown@10.1.0        // Nur auf Ratgeber-Seiten nötig
```

### 5.2 Analyse: Warum sind diese im Vendor Bundle?

| Package | Größe | Importiert von | Problem |
|---------|-------|---------------|---------|
| @react-pdf | 347K | pages/ergebnis.tsx | Direct Import = Bundled |
| MongoDB | ~500K | API Routes + Shared Code | Client + Server Code vermischt |
| Openai | ~200K | Evaluation Logic | In _app.tsx oder früh importiert |
| Resend | ~50K | API Routes | Nicht in API isoliert |

**Root Cause:** Große Libraries in _app.tsx oder getLayoutProps importiert

---

## 6. NEXT.JS CONFIGURATION ANALYSE

### 6.1 Current webpack Optimization (next.config.js)

```javascript
✅ Split Chunks Konfiguration existiert:
   - reactPdf mit async chunks (gut!)
   - vendor Chunk (gut!)
   - common Chunk (gut!)

⚠️ Probleme:
   - @react-pdf ist auf async gestellt aber wird trotzdem geladen
   - Keine Isolation für API-only Dependencies
   - MongoDB wird wahrscheinlich durch shared Code importiert
```

### 6.2 Experimental Optimizations

```javascript
optimizePackageImports: ['lucide-react']  ✅ Gut!
```

**Funktioniert nur für lucide-react, sollte erweitert werden.**

---

## 7. CSS PERFORMANCE

### CSS Bundle Größe
- **Gesamt:** 12.8K (gcompressed)
- **Status:** ✅ Ausgezeichnet

**Keine CSS-Probleme erkannt. Tailwind ist gut optimiert.**

---

## 8. IMAGE OPTIMIZATION

**Status:** ✅ Keine kritischen Probleme

**Konfiguration gut:**
- WebP und AVIF enabled
- Cache-TTL: 1 Jahr für Bilder
- Next.js Image Optimization aktiv

---

## 9. ZUSAMMENFASSUNG PROBLEME NACH PRIORITÄT

| Rang | Problem | Impact | Einsparung | Effort |
|------|---------|--------|-----------|---------|
| 1️⃣ | Unused JS im Vendor Bundle | LCP +2.7s | 558 KiB | Medium |
| 2️⃣ | @react-pdf/jspdf auf jeder Seite | Bundle +347K | 347 KiB | Low |
| 3️⃣ | Element Render Delay | LCP +921ms | ~500ms | Medium |
| 4️⃣ | Time to Interactive | -8.3s | -3s | High |
| 5️⃣ | MongoDB im Frontend? | Bundle +500K | 500 KiB | High |

---

## 10. IMPLEMENTIERUNGS-ROADMAP

### Phase 1: Quick Wins (1-2 Stunden)

**1.1 - @react-pdf Dynamic Import optimieren**
```javascript
// Aktuell: import überall, wird bundled
import { Document } from '@react-pdf/renderer';

// Sollte sein: nur auf /ergebnis geladen
const Document = dynamic(() => import('@react-pdf/renderer').then(m => m.Document), {
  loading: () => <Spinner />,
  ssr: false
});
```
- **Einsparung:** 347 KiB Bundle
- **LCP Impact:** -500-800ms
- **Zeit:** 30 min

**1.2 - next/dynamic für schwere Komponenten**
```javascript
// Heavy Component nur wenn nötig laden
const EvaluationForm = dynamic(() => import('@/components/EvaluationForm'), {
  loading: () => <FormSkeleton />,
  ssr: false // Client-only für interaktive Forms
});
```
- **Einsparung:** ~100-200 KiB
- **Zeit:** 1 Stunde

### Phase 2: Bundle Analysis (1-2 Stunden)

**2.1 - Bundle-Analyzer durchführen**
```bash
ANALYZE=true npm run build
```
- Visuell alle großen Chunks identifizieren
- Dependencies genauer analysieren
- **Zeit:** 30 min

**2.2 - MongoDB aus Frontend entfernen**
- Prüfen wo MongoDB importiert wird
- Alle DB-Queries in API Routes verschieben
- **Einsparung:** 500+ KiB
- **Zeit:** 1-2 Stunden

### Phase 3: Code Splitting (2-3 Stunden)

**3.1 - API-only Dependencies isolieren**
```javascript
// next.config.js
optimizePackageImports: [
  'lucide-react',
  'mongodb',           // Nur für API
  'openai',            // Nur für Evaluation
  'resend',            // Nur für Server-Actions
]
```
- **Einsparung:** 750+ KiB
- **Zeit:** 2 hours

**3.2 - Route-based Code Splitting**
- EvaluationForm: nur auf /pferde-preis-berechnen
- PDFDocument: nur auf /ergebnis
- Ratgeber-spezifische: nur auf /pferde-ratgeber/*
- **Zeit:** 1-2 Stunden

### Phase 4: Advanced Optimizations (3-4 Stunden)

**4.1 - Module Federation für schwere Libraries**
- Externe Stripe Integration
- External Claude/OpenAI API Clients
- Externe PDF Library

**4.2 - Service Worker Caching**
- Cache-first für vendor Bundle
- Network-first für HTML Pages
- Stale-while-revalidate für Ratgeber

---

## 11. PERFORMANCE-METRIKEN NACHHER ERWARTET

### Nach Phase 1-2 Implementierung:

| Metrik | Aktuell | Erwartet | Improvement |
|--------|---------|----------|------------|
| LCP | 5.6s | 3.2s | -2.4s (-43%) |
| FCP | 2.1s | 1.5s | -0.6s (-29%) |
| Speed Index | 4.6s | 2.8s | -1.8s (-39%) |
| TTI | 8.3s | 5.0s | -3.3s (-40%) |
| Bundle Size | 2.8M | 1.8M | -1.0M (-36%) |
| **Performance Score** | **75** | **85-90** | **+10-15** |

---

## 12. MONITORING & METRIKEN

### Performance Budget empfohlen:
- **JavaScript Bundle:** < 500 KiB (gzipped)
- **CSS Bundle:** < 20 KiB
- **LCP:** < 2.5s
- **FCP:** < 1.8s
- **TTI:** < 5.0s

### Automated Monitoring (in CI/CD):
```bash
npm run build -- --analyze  # Bundle-Größe checken
npm run test:e2e           # Lighthouse in CI
npm run lighthouse         # Regelmäßige Performance-Tests
```

---

## 13. FURTHER ANALYSIS BENÖTIGT

### Mobile-Specific Tests:
- [ ] Test auf 4G Throttle (Lighthouse macht das)
- [ ] Test auf echtem Mobile Device
- [ ] Größere Netzwerk-Delays simulieren
- [ ] CPU Throttle testen

### Desktop vs Mobile:
- [ ] Mobile-spezifische Performance-Metriken
- [ ] Touch-Optimierungen prüfen
- [ ] Viewport-Größen für Bilder optimieren

---

## VERWANDTE DATEIEN

- **Bundle Config:** `/Users/benjaminreder/Developer/pferdewert/frontend/next.config.js`
- **Dependencies:** `/Users/benjaminreder/Developer/pferdewert/frontend/package.json`
- **Lighthouse Report (vollständig):** `/Users/benjaminreder/Developer/pferdewert/lighthouse-report.json`
- **Build Output:** `.next/static/chunks/` (2.8M gesamt)

---

**Nächste Schritte:** Phase 1 Implementierung beginnen mit @react-pdf Dynamic Import
