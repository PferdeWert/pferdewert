# Pages Cleanup Analysis

## 🔴 ZUM LÖSCHEN - Duplikate & Test-Dateien

### Regionale Pages (Duplikate)
**Problem**: Diese existieren 2x - einmal im Root und einmal in Unterordner
- ❌ `pferd-kaufen-baden-wuerttemberg.tsx` (Root)
- ❌ `pferd-kaufen-bayern.tsx` (Root) → ✅ BEHALTEN: `pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern.tsx`
- ❌ `pferd-kaufen-nrw.tsx` (Root) → ✅ BEHALTEN: `pferd-kaufen/regionale-pferdepreise/pferd-kaufen-nrw.tsx`
- ❌ `pferd-kaufen-niedersachsen.tsx` (Root) → ✅ BEHALTEN: `pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen.tsx`
- ❌ `pferd-kaufen-schleswig-holstein.tsx` (Root) → ✅ BEHALTEN: `pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein.tsx`
- ❌ `pferd-kaufen-hessen.tsx` (Root) → ✅ BEHALTEN: `pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen.tsx`

### Test & Backup Pages
- ❌ `test-loading.tsx` (Stripe Loading Test)
- ❌ `pdf-test.tsx` (PDF Test)
- ❌ `test-bew.tsx` (falls vorhanden)
- ❌ `navigation-test.tsx` (falls vorhanden)
- ❌ `index-backup.tsx` (Backup der Index)
- ❌ `index-alt.tsx` (Alternative Index)

### Pricing Experimente
- ❌ `preise-neu.tsx` (Experiment)
- ❌ `basic-beispiel.tsx` (Tier Example)
- ❌ `premium-beispiel.tsx` (Tier Example)
- ❌ `pro-beispiel.tsx` (Tier Example)
- ⚠️ `preise.tsx` (Check if still used)

### Sonstige veraltete Pages
- ❌ `bewerten.tsx` (falls vorhanden - check if obsolete)

## ✅ BEHALTEN - Produktive Pages

### Core Pages
- ✅ `index.tsx` (Homepage)
- ✅ `ergebnis.tsx` (Bewertungsergebnis)
- ✅ `beispiel-analyse.tsx` (Example Result)

### Pferd Kaufen Cluster
- ✅ `pferd-kaufen.tsx` (Main Landing Page)
- ✅ `pferd-kaufen/regionale-pferdepreise.tsx` (Regional Overview)
- ✅ `pferd-kaufen/regionale-pferdepreise/*` (5 regionale Unterseiten)
- ✅ `dressurpferd-kaufen.tsx` (Disziplin-spezifisch)
- ✅ `springpferd-kaufen.tsx` (Disziplin-spezifisch)
- ✅ `warmblut-kaufen.tsx` (Rasse-spezifisch)

### Pferd Verkaufen Cluster
- ✅ `pferd-verkaufen.tsx` (Main Landing Page)
- ✅ `pferd-verkaufen/verkaufspreis-optimieren.tsx`
- ✅ `pferd-verkaufen/pferdewert-berechnen.tsx`
- ✅ `pferd-verkaufen-tipps.tsx`

### AKU Cluster
- ✅ `aku-pferd.tsx` (Main Landing Page)
- ✅ `aku-pferd-ablauf.tsx`
- ✅ `aku-pferd-klassen.tsx`
- ✅ `aku-pferd-kosten.tsx`

### Ratgeber Cluster
- ✅ `pferde-ratgeber/index.tsx` (Übersicht)
- ✅ `pferde-ratgeber/aku-verstehen.tsx`
- ✅ `pferde-ratgeber/aku-verstehen/aku-kosten-nutzen.tsx`
- ✅ `pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku.tsx`
- ✅ `pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren.tsx`

### Tool Pages
- ✅ `was-ist-mein-pferd-wert.tsx` (SEO Landing Page)
- ✅ `pferde-preis-berechnen.tsx` (SEO Landing Page)

### Legal & Info
- ✅ `ueber-pferdewert.tsx`
- ✅ `datenschutz.tsx`
- ✅ `impressum.tsx`
- ✅ `agb.tsx`

### API Routes
- ✅ `api/bewertung.ts`
- ✅ `api/bewertung-by-session.ts`
- ✅ `api/session.ts`
- ✅ `api/checkout.ts`
- ✅ `api/webhook.ts`

### System Pages
- ✅ `_app.tsx`
- ✅ `_document.tsx`

## 📊 Zusammenfassung
- **Total Pages**: ~46
- **Zu löschen**: ~18
- **Produktiv behalten**: ~28
- **Check required**: 2-3 (preise.tsx, bewerten.tsx)

## 🎯 Empfohlene Struktur-Verbesserung

```
pages/
├── Core (4)
│   ├── index.tsx
│   ├── ergebnis.tsx
│   ├── beispiel-analyse.tsx
│   └── [preise.tsx evtl. zu pricing/ verschieben]
│
├── pferd-kaufen/ (10)
│   ├── index.tsx (Main Landing)
│   ├── dressurpferd-kaufen.tsx
│   ├── springpferd-kaufen.tsx
│   ├── warmblut-kaufen.tsx
│   └── regionale-pferdepreise/
│       ├── index.tsx
│       ├── pferd-kaufen-bayern.tsx
│       ├── pferd-kaufen-nrw.tsx
│       ├── pferd-kaufen-niedersachsen.tsx
│       ├── pferd-kaufen-schleswig-holstein.tsx
│       └── pferd-kaufen-hessen.tsx
│
├── pferd-verkaufen/ (4)
│   ├── index.tsx (Main Landing)
│   ├── verkaufspreis-optimieren.tsx
│   ├── pferdewert-berechnen.tsx
│   └── pferd-verkaufen-tipps.tsx (evtl. nach tipps/ verschieben)
│
├── aku-pferd/ (4)
│   ├── index.tsx (Main Landing)
│   ├── aku-pferd-ablauf.tsx
│   ├── aku-pferd-klassen.tsx
│   └── aku-pferd-kosten.tsx
│
├── pferde-ratgeber/ (5)
│   ├── index.tsx
│   └── aku-verstehen/
│       ├── index.tsx
│       ├── aku-kosten-nutzen.tsx
│       ├── pferdewert-trotz-aku.tsx
│       └── aku-befunde-interpretieren.tsx
│
├── tools/ (2)
│   ├── was-ist-mein-pferd-wert.tsx
│   └── pferde-preis-berechnen.tsx
│
└── legal/ (4)
    ├── ueber-pferdewert.tsx
    ├── datenschutz.tsx
    ├── impressum.tsx
    └── agb.tsx
```