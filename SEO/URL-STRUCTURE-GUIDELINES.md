# URL Structure Guidelines - PferdeWert.de

**CRITICAL**: This document defines the canonical URL structure for all content on PferdeWert.de.

**Letzte Aktualisierung**: Dezember 2025

---

## URL-Strategie Übersicht

PferdeWert.de verwendet **zwei verschiedene URL-Strukturen** basierend auf Content-Intent:

| Intent | URL-Präfix | Struktur | Beispiel |
|--------|------------|----------|----------|
| **Commercial** | `/pferd-kaufen/` | Hierarchisch | `/pferd-kaufen/bayern` |
| **Informational** | `/pferde-ratgeber/` | Flach | `/pferde-ratgeber/aku-pferd` |

---

## 1. COMMERCIAL CLUSTER: `/pferd-kaufen/`

**Für**: Kaufbezogene Inhalte mit hoher Conversion-Absicht

### Hub (Pillar Page)
**URL**: `https://pferdewert.de/pferd-kaufen/`

### Spokes (Cluster Pages)
**Pattern**: `https://pferdewert.de/pferd-kaufen/{spoke-slug}`

**Beispiele**:
- ✅ `/pferd-kaufen/bayern` (Regional)
- ✅ `/pferd-kaufen/nrw` (Regional)
- ✅ `/pferd-kaufen/oesterreich` (Länder)
- ✅ `/pferd-kaufen/schweiz` (Länder)
- ✅ `/pferd-kaufen/haflinger` (Rassen-Kaufen)
- ✅ `/pferd-kaufen/islandpferd` (Rassen-Kaufen)
- ✅ `/pferd-kaufen/checkliste` (Thematisch)
- ❌ `/pferde-ratgeber/pferd-kaufen-bayern` (FALSCH - gehört ins Kauf-Cluster)

**Vorteile dieser Struktur**:
- Keyword "pferd-kaufen" direkt nach Domain = maximale Relevanz
- Google erkennt Cluster-Zugehörigkeit durch URL-Hierarchie
- Breadcrumbs: Home → Pferd kaufen → Bayern
- Alle Spokes stärken automatisch den Hub

---

## 2. INFORMATIONAL CONTENT: `/pferde-ratgeber/`

**Für**: Informationale Inhalte ohne direkten Kaufbezug

### Pattern
**URL**: `https://pferdewert.de/pferde-ratgeber/{article-slug}`

**Beispiele**:
- ✅ `/pferde-ratgeber/aku-pferd`
- ✅ `/pferde-ratgeber/was-kostet-ein-pferd`
- ✅ `/pferde-ratgeber/pferdehaltung-kosten`
- ✅ `/pferde-ratgeber/pferdekaufvertrag`
- ✅ `/pferde-ratgeber/pferderassen`
- ❌ `/ratgeber/pferdekauf/dressurpferd-kaufen` (FALSCH - alte Struktur)
- ❌ `/ratgeber/dressurpferd-kaufen` (FALSCH - falscher Base Path)

**Regel**: Flache Struktur unter `/pferde-ratgeber/` - KEINE verschachtelten Pfade!

**Reasoning**:
- Flache Struktur = bessere SEO bei informationalem Content
- `/pferde-ratgeber/` = "Guide"-Signal an Google
- Kategorie impliziert durch Slug selbst

---

### 3. Service Pages

**Pattern**: `https://pferdewert.de/{service-name}`

**Examples**:
- `/pferdebewertung` (main service)
- `/pferde-preis-berechnen` (calculator)
- `/ergebnis` (results page)

---

### 4. Static Pages

**Pattern**: `https://pferdewert.de/{page-name}`

**Examples**:
- `/datenschutz`
- `/impressum`
- `/ueber-pferdewert`

---

## URL Slug Formatting Rules

### Required Format:
- **Lowercase only**: `dressurpferd-kaufen` (not `Dressurpferd-Kaufen`)
- **Hyphens as separators**: `pferd-kaufen` (not `pferd_kaufen`)
- **No special characters**: Only `a-z`, `0-9`, `-`
- **No umlauts** - Replace with standard mapping:
  - `ä` → `ae`
  - `ö` → `oe`
  - `ü` → `ue`
  - `ß` → `ss`

### Length Guidelines:
- **Optimal**: 3-5 words
- **Maximum**: 60 characters
- **Primary keyword MUST be present**

### Examples:
- ✅ `dressurpferd-kaufen`
- ✅ `pferd-kaufen-kosten`
- ✅ `springpferd-kaufen-tipps`
- ❌ `dressurpferd-kaufen-der-ultimative-ratgeber-2025` (too long)
- ❌ `artikel-123` (no keyword)
- ❌ `pferd_kaufen` (underscore instead of hyphen)

---

## Canonical URL Rules

### Format:
```
https://pferdewert.de/{content-type}/{slug}
```

### Requirements:
- Always `https://` (never `http://`)
- Never include `www.` subdomain
- No trailing slash (except root: `https://pferdewert.de/`)
- Strip tracking parameters: `utm_*`, `fbclid`, `gclid`, etc.

### Examples:
✅ `https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen`
❌ `https://www.pferdewert.de/pferde-ratgeber/dressurpferd-kaufen/` (www + trailing slash)
❌ `https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen?utm_source=facebook` (tracking param)

---

## Implementation Checklist

When creating new content, verify:

### Für Commercial Cluster Content (Pferd-Kaufen):
- [ ] URL-Präfix ist `/pferd-kaufen/` für alle Kauf-bezogenen Spokes
- [ ] Hub-Page hat URL `/pferd-kaufen/`
- [ ] Spokes haben URL `/pferd-kaufen/{spoke-slug}`

### Für Informational Content:
- [ ] Base path ist `/pferde-ratgeber/` für Guide Content
- [ ] Keine verschachtelten Pfade unter `/pferde-ratgeber/`

### Allgemein:
- [ ] Slug folgt Formatierungsregeln (lowercase, hyphens, keine Umlaute)
- [ ] Primary keyword ist im Slug vorhanden
- [ ] Canonical URL verwendet korrektes Format
- [ ] Alle Metadata-Referenzen nutzen korrekte URL-Struktur
- [ ] Schema markup nutzt korrekte absolute URLs
- [ ] Interne Links referenzieren korrekte Pfade

---

## Quick Reference

### Commercial Intent (Kaufen):
```
/pferd-kaufen/                    ← Hub
/pferd-kaufen/{spoke}             ← Spokes (bayern, haflinger, etc.)
```

### Informational Intent (Ratgeber):
```
/pferde-ratgeber/{article-slug}   ← Flache Struktur
```

### VERBOTEN:
```
❌ /pferde-ratgeber/pferd-kaufen-bayern    (Kauf-Content gehört ins Kauf-Cluster!)
❌ /pferde-ratgeber/pferd-kaufen/bayern    (Nested unter Ratgeber)
❌ /ratgeber/...                           (Falscher Base Path)
```

---

## Entscheidungsbaum: Welche URL-Struktur?

```
Ist der Content kaufbezogen?
├── JA → Gehört zu /pferd-kaufen/
│   ├── Hub? → /pferd-kaufen/
│   └── Spoke? → /pferd-kaufen/{topic}
│
└── NEIN → Gehört zu /pferde-ratgeber/
    └── Flach: /pferde-ratgeber/{slug}
```

---

## Directory Structure (Frontend)

```
frontend/pages/
├── pferd-kaufen/
│   ├── index.tsx           ← Hub: /pferd-kaufen/
│   ├── bayern.tsx          ← Spoke: /pferd-kaufen/bayern
│   ├── haflinger.tsx       ← Spoke: /pferd-kaufen/haflinger
│   └── ...
│
└── pferde-ratgeber/
    ├── aku-pferd.tsx       ← /pferde-ratgeber/aku-pferd
    ├── was-kostet-ein-pferd.tsx
    └── ...
```

---

**Last Updated**: 2025-12-16
**Status**: CANONICAL - This is the definitive URL structure reference
