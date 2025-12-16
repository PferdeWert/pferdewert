# SEO Content-Architektur PferdeWert.de

**Stand:** Dezember 2025

---

## URL-Struktur

| Intent | URL-Präfix | Beispiele |
|--------|------------|-----------|
| **Commercial** | `/pferd-kaufen/` | `/pferd-kaufen/bayern`, `/pferd-kaufen/haflinger` |
| **Informational** | `/pferde-ratgeber/` | `/pferde-ratgeber/aku-pferd`, `/pferde-ratgeber/was-kostet-ein-pferd` |

---

## Topic Cluster Übersicht

### 1. Pferd Kaufen (Commercial Hub)

**Hub:** `/pferd-kaufen/` (40.500 Vol/Mo) — **2.167 Wörter**

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| Bayern | `/pferd-kaufen/bayern` | 1.900 | ✅ Live | 287 |
| NRW | `/pferd-kaufen/nrw` | 1.600 | ✅ Live | 1.247 |
| Österreich | `/pferd-kaufen/oesterreich` | 5.400 | ✅ Live | 4.442 |
| Schweiz | `/pferd-kaufen/schweiz` | 2.400 | ✅ Live | 4.620 |
| Haflinger | `/pferd-kaufen/haflinger` | 5.400 | ✅ Live | 3.833 |
| Islandpferd | `/pferd-kaufen/islandpferd` | 4.400 | ✅ Live | 248 |
| Quarter Horse | `/pferd-kaufen/quarter-horse` | 3.600 | ✅ Live | 2.847 |
| Friese | `/pferd-kaufen/friese` | 1.900 | ✅ Live | 3.850 |
| Springpferd | `/pferd-kaufen/springpferd` | 720 | ✅ Live | 314 |
| Dressurpferd | `/pferd-kaufen/dressurpferd` | 590 | ✅ Live | 287 |
| Freizeitpferd | `/pferd-kaufen/freizeitpferd` | 480 | ✅ Live | 287 |
| Anfängerpferd | `/pferd-kaufen/anfaenger` | 390 | ✅ Live | 267 |
| Pony | `/pferd-kaufen/pony` | 6.600 | ⚪ Offen | — |
| Fohlen | `/pferd-kaufen/fohlen` | 2.900 | ⚪ Offen | — |

---

### 2. AKU Cluster (Informational)

**Hub:** `/pferde-ratgeber/aku-pferd` (480 Vol/Mo) — **4.847 Wörter**

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| AKU Kosten | `/pferde-ratgeber/aku-pferd-kosten` | 260 | ⚠️ 404 | — |
| Große/Kleine AKU | `/pferde-ratgeber/grosse-kleine-aku` | 170 | ⚠️ 404 | — |
| AKU Röntgen | `/pferde-ratgeber/aku-roentgen` | 140 | ⚪ Offen | — |
| AKU Checkliste | `/pferde-ratgeber/aku-checkliste` | 110 | ⚪ Offen | — |

---

### 3. Pferdehaltung Kosten (Informational)

**Hub:** `/pferde-ratgeber/pferdehaltung-kosten` (1.900 Vol/Mo) — ⚪ Offen

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| Was kostet ein Pferd | `/pferde-ratgeber/was-kostet-ein-pferd` | 2.900 | ✅ Live | 268 |
| Kosten pro Monat | `/pferde-ratgeber/pferd-kosten-monat` | 1.300 | ⚪ Offen | — |
| Stallmiete | `/pferde-ratgeber/stallmiete-pferd` | 880 | ⚪ Offen | — |
| Hufschmied Kosten | `/pferde-ratgeber/hufschmied-kosten` | 1.600 | ⚪ Offen | — |
| Tierarzt Kosten | `/pferde-ratgeber/tierarzt-pferd-kosten` | 590 | ⚪ Offen | — |

---

### 4. Pferd Verkaufen (Mixed)

**Hub:** `/pferde-ratgeber/pferd-verkaufen` (1.300 Vol/Mo)

| Spoke | URL | Vol/Mo | Status |
|-------|-----|--------|--------|
| Pferdewert ermitteln | `/pferde-ratgeber/wie-viel-ist-mein-pferd-wert` | 2.900 | ✅ Live |
| Pferdekaufvertrag | `/pferde-ratgeber/pferdekaufvertrag` | 720 | ✅ Live |
| Pferd inserieren | `/pferde-ratgeber/pferd-inserieren` | 480 | ⚪ Offen |

---

### 5. Pferderassen (Informational) — Phase 3

**Hub:** `/pferde-ratgeber/pferderassen` (8.100 Vol/Mo)

| Spoke | URL | Vol/Mo | Status |
|-------|-----|--------|--------|
| Hannoveraner | `/pferde-ratgeber/hannoveraner` | 2.400 | ⚪ Offen |
| Oldenburger | `/pferde-ratgeber/oldenburger` | 1.900 | ⚪ Offen |
| Holsteiner | `/pferde-ratgeber/holsteiner` | 1.300 | ⚪ Offen |
| Trakehner | `/pferde-ratgeber/trakehner` | 1.000 | ⚪ Offen |
| Deutsches Reitpony | `/pferde-ratgeber/deutsches-reitpony` | 880 | ⚪ Offen |

---

## Internal Linking Regeln

1. **Pillar → Spokes:** Jeder Hub verlinkt im Text auf alle zugehörigen Spokes (min. 3)
2. **Spoke → Pillar:** Link im ersten Absatz + am Ende
3. **Spoke ↔ Spoke:** 1-2 Links zu verwandten Artikeln
4. **Cross-Cluster:** Thematisch verwandte Cluster verlinken aufeinander

---

## Duplicate Content Prevention

**70%-Regel:** Max. 30% Content-Overlap zwischen Hub und Spoke

| Hub-Stil | Spoke-Stil |
|----------|------------|
| Überblick, Vergleich, Entscheidungshilfe | Deep-Dive, Step-by-Step, Spezialfälle |
| Breite Themenabdeckung | Fokus auf spezifischen Aspekt |
| "Was sind die wichtigsten Faktoren?" | "Wie machst du es konkret?" |

**Jeder Spoke muss haben:**
- Min. 3 unique H2-Sections (nicht im Hub)
- Eigene FAQ-Section (andere Fragen)
- Eigene Beispiele/Preistabellen

---

## Content-Specs

| Typ | Wörter | Struktur |
|-----|--------|----------|
| **Pillar (Hub)** | 2.500-3.500 | Intro → TOC → Grundlagen → 8-12 Sektionen → FAQ → CTA |
| **Spoke (Standard)** | 1.200-2.000 | Intro (Link zu Hub) → Hauptinhalt → FAQ → CTA |
| **Mini-Page (Regional/Rasse)** | 800-1.000 | Intro → Lokale Infos → Gestüte/Züchter → CTA |

---

## Quarterly Update-Zyklus

| Quartal | Cluster |
|---------|---------|
| Q1 | Pferd Kaufen + AKU |
| Q2 | Pferdehaltung Kosten |
| Q3 | Pferd Verkaufen |
| Q4 | Pferderassen |

---

## USP-Integration

Jeder Artikel endet mit Pferdewert-Rechner CTA:
> **Was ist dein Pferd wert?** → [Pferdewert-Rechner](/)
