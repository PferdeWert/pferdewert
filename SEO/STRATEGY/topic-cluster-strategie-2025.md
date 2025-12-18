# SEO Content-Architektur PferdeWert.de

**Stand:** Dezember 2025 (aktualisiert 17.12.2025)

---

## 🔍 Search Intent Analyse: Pferderassen (Dezember 2025)

**Kernerkenntnisse aus DataForSEO-Analyse:**

| Keyword | Suchvolumen | Main Intent | Probability | Empfehlung |
|---------|-------------|-------------|-------------|------------|
| **pferderassen** | 18.100 | 🔵 Informational | 87% | Info-Hub erstellen |
| **haflinger** | 27.100 | 🟡 Navigational | 44% | Info + Kauf-Seite |
| **hannoveraner** | 18.100 | 🟠 Commercial | 43% (+41% info) | Beides |
| **araber pferd** | 9.900 | 🟠 Commercial | 100% | Kauf-fokussiert |
| **lipizzaner** | 9.900 | 🟠 Commercial | 100% | → `/pferd-kaufen/` |
| **fohlen** | 9.900 | 🟠 Commercial | 92% | ✅ Bleibt Kauf-Cluster |
| **quarter horse** | 9.900 | 🔵 Informational | 53% | Info-Seite erstellen |
| **trakehner** | 8.100 | 🔵 Informational | 52% | Info-Seite erstellen |
| **islandpferd** | 6.600 | 🔵 Informational | 58% | Info-Seite erstellen |
| **andalusier** | 5.400 | 🟠 Commercial | 79% | Kauf-fokussiert |
| **friese pferd** | 4.400 | 🟠 Commercial | 100% | Kauf-fokussiert |
| **warmblut** | 3.600 | 🔵 Informational | 56% | Info-Seite erstellen |

**Wettbewerber-Strategie (ehorses.de, pferdefluesterei.de):**
- Trennen Info-Content (Rasseporträts) von Commercial-Content (Marktplatz)
- Hub `/magazin/pferderassen/` mit A-Z Lexikon → verlinkt zum Marktplatz
- Das funktioniert nachweislich (Featured Snippets, Top-Rankings)

---

## 🎯 Zwei-Cluster-Strategie für Pferderassen

### Problem mit aktueller Struktur
Alles unter `/pferd-kaufen/` - aber nicht jeder, der "Haflinger" sucht, will kaufen!
- "quarter horse" → 53% wollen **lernen**, nicht kaufen
- "islandpferd" → 58% wollen **lernen**, nicht kaufen
- Diese Nutzer bouncen, weil sie Info-Content erwarten

### Lösung: Zwei Cluster + Smarte Verlinkung

```
┌─────────────────────────────────────────────────────────────────────┐
│  INFORMATIONAL CLUSTER (NEU)                                        │
│  Hub: /pferde-ratgeber/pferderassen                                 │
│  Intent: Lernen, Recherche, Charakter verstehen                     │
│                                                                      │
│  Spokes: /pferde-ratgeber/haflinger                                 │
│          /pferde-ratgeber/quarter-horse                             │
│          /pferde-ratgeber/hannoveraner                              │
│          ...                                                         │
│                                                                      │
│  Content: Charakter, Geschichte, Aussehen, Eignung, Haltung         │
│  CTA: "Du willst einen Haflinger kaufen? → /pferd-kaufen/haflinger" │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ verlinkt zu
┌─────────────────────────────────────────────────────────────────────┐
│  COMMERCIAL CLUSTER (bestehend)                                      │
│  Hub: /pferd-kaufen/                                                │
│  Intent: Kaufen, Preise, Anbieter finden                            │
│                                                                      │
│  Spokes: /pferd-kaufen/haflinger (bestehend)                        │
│          /pferd-kaufen/friese (bestehend)                           │
│          /pferd-kaufen/lipizzaner (NEU - Migration)                 │
│          ...                                                         │
│                                                                      │
│  Content: Preise, worauf achten, Züchter, Kaufberatung              │
│  CTA: "Mehr zur Rasse → /pferde-ratgeber/haflinger"                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Content-Unterschiede Info vs. Kauf

| Aspekt | Ratgeber (Info) | Kaufen (Commercial) |
|--------|-----------------|---------------------|
| **H1** | "Der Haflinger: Charakter & Eigenschaften" | "Haflinger kaufen: Preise & Tipps 2025" |
| **Fokus** | Geschichte, Wesen, Eignung, Haltungstipps | Preisübersicht, Worauf achten, Wo kaufen |
| **Fragen** | "Wie ist der Charakter?" "Für wen geeignet?" | "Was kostet ein Haflinger?" "Wo kaufen?" |
| **CTA** | Link zur Kaufseite | Link zum Pferdewert-Rechner |

---

## 🎯 Regionale Spokes: Marktplatz-Aggregator Strategie

**Erkenntnis (Dezember 2025):** Regionale Keywords wie "Pferd kaufen Bayern" haben **transactional intent** - Nutzer wollen Marktplätze und Händler finden, keine generischen Kaufratgeber lesen.

**Strategie:** Regionale Spokes als **Marktplatz-Aggregatoren** positionieren.

### Regionale Spokes - Status nach Rewrite (17.12.2025)

| Spoke | Wörter | Status | Content-Typ |
|-------|--------|--------|-------------|
| NRW | ~1.850 | ✅ Aggregator | Marktplätze + Züchter (Münsterland, Niederrhein, Sauerland, Ruhrgebiet) + Events 2025 |
| Bayern | ~2.100 | ✅ Aggregator | Marktplätze + Züchter nach Region + Landgestüt Schwaiganger + Bayerische Rassen |
| Österreich | ~2.400 | ✅ Aggregator | Marktplätze (Willhaben, ehorses.at) + Züchter nach Bundesland + Noriker/Haflinger/Lipizzaner |
| Schweiz | ~2.350 | ✅ Aggregator | Marktplätze (anibis, tutti, FM-CH) + Züchter nach Kanton + Freiberger + Events |

---

## ⚠️ Content-Expansion Prioritäten

### Pferderassen Info-Cluster (NEUE Priorität)

| Priorität | Seite | Suchvol. | Info-Intent | Status |
|-----------|-------|----------|-------------|--------|
| 🔴 1 | pferderassen (Hub) | 18.100 | 87% | ⚪ Offen |
| 🔴 2 | haflinger | 27.100 | ~45% | ⚪ Offen |
| 🔴 3 | quarter horse | 9.900 | 53% | ⚪ Offen |
| 🔴 4 | trakehner | 8.100 | 52% | ⚪ Offen |
| 🔴 5 | islandpferd | 6.600 | 58% | ⚪ Offen |
| 🟠 6 | hannoveraner | 18.100 | 41% | ⚪ Offen |
| 🟠 7 | warmblut | 3.600 | 56% | ⚪ Offen |

### Bestehende Kauf-Seiten (Expansion)

| Priorität | Seite | Aktuell | Ziel | Grund |
|-----------|-------|---------|------|-------|
| 🔴 1 | Quarter Horse (Kauf) | 705 | 2.500+ | Hohes Suchvolumen (3.600), dünn |
| 🔴 2 | Friese (Kauf) | 805 | 2.500+ | Starker Commercial Intent (100%), dünn |

**Bereits gut aufgestellt (> 2.000 Wörter):**
NRW (1.850), Bayern (2.100), Österreich (2.400), Schweiz (2.350), Anfängerpferd (4.180), Haflinger (3.833), Fohlen (3.200), Dressurpferd (2.643), Freizeitpferd (2.487), Was kostet ein Pferd (2.750)

---

## URL-Struktur

| Intent | URL-Präfix | Beispiele |
|--------|------------|-----------|
| **Commercial** | `/pferd-kaufen/` | `/pferd-kaufen/bayern`, `/pferd-kaufen/haflinger` |
| **Informational** | `/pferde-ratgeber/` | `/pferde-ratgeber/aku-pferd`, `/pferde-ratgeber/pferderassen` |

---

## Topic Cluster Übersicht

### 1. Pferd Kaufen (Commercial Hub)

**Hub:** `/pferd-kaufen/` (40.500 Vol/Mo) — **2.167 Wörter**

| Spoke | URL | Vol/Mo | Status | Wörter | Typ |
|-------|-----|--------|--------|--------|-----|
| Anfängerpferd | `/pferd-kaufen/anfaenger` | 390 | ✅ Live | 4.180 | Ratgeber |
| Haflinger | `/pferd-kaufen/haflinger` | 5.400 | ✅ Live | 3.833 | Kauf-Ratgeber |
| Fohlen | `/pferd-kaufen/fohlen` | 2.900 | ✅ Live | 3.200 | Kauf-Ratgeber |
| Dressurpferd | `/pferd-kaufen/dressurpferd` | 590 | ✅ Live | 2.643 | Ratgeber |
| Freizeitpferd | `/pferd-kaufen/freizeitpferd` | 480 | ✅ Live | 2.487 | Ratgeber |
| Österreich | `/pferd-kaufen/oesterreich` | 5.400 | ✅ Live | ~2.400 | 🗺️ Aggregator |
| Schweiz | `/pferd-kaufen/schweiz` | 2.400 | ✅ Live | ~2.350 | 🗺️ Aggregator |
| Bayern | `/pferd-kaufen/bayern` | 1.900 | ✅ Live | ~2.100 | 🗺️ Aggregator |
| Pony | `/pferd-kaufen/pony` | 6.600 | ✅ Live | 1.900 | Ratgeber |
| NRW | `/pferd-kaufen/nrw` | 1.600 | ✅ Live | ~1.850 | 🗺️ Aggregator |
| Springpferd | `/pferd-kaufen/springpferd` | 720 | ✅ Live | 1.450 | Ratgeber |
| Islandpferd | `/pferd-kaufen/islandpferd` | 4.400 | ✅ Live | 1.143 | Kauf-Ratgeber |
| Friese | `/pferd-kaufen/friese` | 1.900 | ⚠️ Dünn | 805 | Kauf-Ratgeber |
| Quarter Horse | `/pferd-kaufen/quarter-horse` | 3.600 | ⚠️ Dünn | 705 | Kauf-Ratgeber |
| **Lipizzaner** | `/pferd-kaufen/lipizzaner` | 480 | 🔄 Migration | — | **NEU** (von /pferde-ratgeber/) |

**Geplante Regional-Erweiterungen (Phase 3):**
| Spoke | URL | Vol/Mo | Status |
|-------|-----|--------|--------|
| Sachsen | `/pferd-kaufen/sachsen` | 1.000 | ⚪ Offen |
| Schleswig-Holstein | `/pferd-kaufen/schleswig-holstein` | 880 | ⚪ Offen |
| Brandenburg | `/pferd-kaufen/brandenburg` | 720 | ⚪ Offen |
| Hessen | `/pferd-kaufen/hessen` | 590 | ⚪ Offen |
| Baden-Württemberg | `/pferd-kaufen/baden-wuerttemberg` | 480 | ⚪ Offen |
| Niedersachsen | `/pferd-kaufen/niedersachsen` | 390 | ⚪ Offen |

---

### 2. Pferderassen (Informational Hub) — NEU

**Hub:** `/pferde-ratgeber/pferderassen` (18.100 Vol/Mo) — ⚪ Offen

**Wettbewerber-Analyse:**
- ehorses.de dominiert mit Featured Snippet für "pferderassen"
- URL-Struktur: `/magazin/pferderassen/` + `/magazin/pferderassen/[rasse]/`
- Content: A-Z Lexikon mit ~100 Rasseporträts

**Unsere Strategie:** Fokus auf Top-20 Rassen mit höchstem Suchvolumen

| Priorität | Spoke | URL | Vol/Mo | Intent | Status |
|-----------|-------|-----|--------|--------|--------|
| 🔴 1 | Haflinger | `/pferde-ratgeber/haflinger` | 27.100 | 45% Info | ⚪ Offen |
| 🔴 2 | Hannoveraner | `/pferde-ratgeber/hannoveraner` | 18.100 | 41% Info | ⚪ Offen |
| 🔴 3 | Quarter Horse | `/pferde-ratgeber/quarter-horse` | 9.900 | 53% Info | ⚪ Offen |
| 🔴 4 | Trakehner | `/pferde-ratgeber/trakehner` | 8.100 | 52% Info | ⚪ Offen |
| 🔴 5 | Islandpferd | `/pferde-ratgeber/islandpferd` | 6.600 | 58% Info | ⚪ Offen |
| 🟠 6 | Andalusier | `/pferde-ratgeber/andalusier` | 5.400 | 21% Info | ⚪ Offen |
| 🟠 7 | Friese | `/pferde-ratgeber/friese` | 4.400 | ~20% Info | ⚪ Offen |
| 🟠 8 | Warmblut | `/pferde-ratgeber/warmblut` | 3.600 | 56% Info | ⚪ Offen |
| 🟠 9 | Oldenburger | `/pferde-ratgeber/oldenburger` | 3.600 | ~50% Info | ⚪ Offen |
| 🟠 10 | Holsteiner | `/pferde-ratgeber/holsteiner` | 1.900 | ~50% Info | ⚪ Offen |
| ⚪ 11 | Deutsches Reitpony | `/pferde-ratgeber/deutsches-reitpony` | 880 | ~60% Info | ⚪ Offen |

**Content-Struktur für Info-Rasseporträts:**
```
1. Steckbrief (Größe, Gewicht, Farben, Lebenserwartung)
2. Geschichte & Herkunft
3. Charakter & Wesen
4. Exterieur & Aussehen
5. Eignung (Sport, Freizeit, Anfänger?)
6. Haltung & Pflege
7. Typische Krankheiten
8. FAQ
9. CTA: "Du willst einen [Rasse] kaufen? → /pferd-kaufen/[rasse]"
```

**Traffic-Potential:** 8.000-15.000 Besucher/Mo → davon 10-15% Weiterleitung zu Kauf-Seiten

---

### 3. AKU Cluster (Informational)

**Hub:** `/pferde-ratgeber/aku-pferd` (480 Vol/Mo) — **4.847 Wörter**

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| AKU Kosten | `/pferde-ratgeber/aku-pferd/kosten` | 260 | ✅ Live | 2.200 ✅ |
| Große/Kleine AKU | `/pferde-ratgeber/grosse-kleine-aku` | 170 | ⚪ Offen | — |
| AKU Röntgen | `/pferde-ratgeber/aku-roentgen` | 140 | ⚪ Offen | — |
| AKU Checkliste | `/pferde-ratgeber/aku-checkliste` | 110 | ⚪ Offen | — |

---

### 4. Pferdehaltung Kosten (Informational)

**Hub:** `/pferde-ratgeber/pferdehaltung-kosten` (1.900 Vol/Mo) — ⚪ Offen

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| Was kostet ein Pferd | `/pferde-ratgeber/was-kostet-ein-pferd` | 2.900 | ✅ Live | 2.750 ✅ |
| Kosten pro Monat | `/pferde-ratgeber/pferd-kosten-monat` | 1.300 | ⚪ Offen | — |
| Stallmiete | `/pferde-ratgeber/stallmiete-pferd` | 880 | ⚪ Offen | — |
| Hufschmied Kosten | `/pferde-ratgeber/hufschmied-kosten` | 1.600 | ⚪ Offen | — |
| Tierarzt Kosten | `/pferde-ratgeber/tierarzt-pferd-kosten` | 590 | ⚪ Offen | — |

---

### 5. Pferd Verkaufen (Mixed)

**Hub:** `/pferde-ratgeber/pferd-verkaufen` (1.300 Vol/Mo) — **6.847 Wörter**

| Spoke | URL | Vol/Mo | Status | Wörter |
|-------|-----|--------|--------|--------|
| Pferdekaufvertrag | `/pferd-kaufen/kaufvertrag` | 2.600* | ✅ Live | 4.500 ✅ |
| Pferdemarkt | `/pferde-ratgeber/pferdemarkt` | TBD | ✅ Live | 1.725 ✅ |
| Pferd inserieren | `/pferde-ratgeber/pferd-inserieren` | 480 | ⚪ Offen | — |

*\*Kombiniertes Volumen: "kaufvertrag pferd" (1.600) + "pferdekaufvertrag" (1.000)*

**⚠️ Migration erforderlich:**
- Aktuelle URL: `/pferd-kaufen/kaufvertrag`
- Neue URL: `/pferde-ratgeber/pferdekaufvertrag`
- Grund: Intent ist informational (60%), nicht commercial.
- Action: 301-Redirect einrichten

---

### 6. Migrations-Aktionen

| Seite | Aktuelle URL | Neue URL | Grund | Priorität |
|-------|--------------|----------|-------|-----------|
| Lipizzaner | `/pferde-ratgeber/lipizzaner` | `/pferd-kaufen/lipizzaner` | 100% Commercial Intent | 🔴 Hoch |
| Kaufvertrag | `/pferd-kaufen/kaufvertrag` | `/pferde-ratgeber/pferdekaufvertrag` | 60% Informational Intent | 🟠 Mittel |

---

## Quick Reference: Was gehört wohin?

| Thema | Gehört in | NICHT in |
|-------|-----------|----------|
| **Rasse-Charakter & Geschichte** | `/pferde-ratgeber/[rasse]` | Kauf-Seiten |
| **Rasse-Preise & Kauftipps** | `/pferd-kaufen/[rasse]` | Info-Seiten |
| Allgemeine Kaufberatung | Pferd-kaufen Pillar | Regional-Aggregatoren |
| AKU Basics | AKU-Pferd Pillar | Kaufen-Spokes |
| Preisübersicht allgemein | Was-kostet-ein-Pferd | Regional-Aggregatoren |
| **Marktplatz-Vergleich (regional)** | 🗺️ [Region]-Aggregator | Pferd-kaufen Pillar |
| **Züchter & Gestüte (regional)** | 🗺️ [Region]-Aggregator | Andere Spokes |
| **Events & Messen (regional)** | 🗺️ [Region]-Aggregator | Andere Spokes |
| Rechtliches (Vertrag) | Pferdekaufvertrag | Andere Spokes |
| Monatliche Kosten | Pferdehaltung-Kosten Pillar | Was-kostet-ein-Pferd |

---

## Internal Linking: Info ↔ Kauf Rassen-Seiten

### Neue Cross-Linking-Regel für Pferderassen

```
/pferde-ratgeber/haflinger
    └── CTA am Ende: "Haflinger kaufen? → /pferd-kaufen/haflinger"
    └── Sidebar: "Kaufberatung: Haflinger kaufen"

/pferd-kaufen/haflinger
    └── Intro: "Mehr zum Charakter: → /pferde-ratgeber/haflinger"
    └── Sidebar: "Rasseporträt: Der Haflinger"
```

### Grundregeln
1. **Pillar → Spokes:** Jeder Hub verlinkt im Text auf alle zugehörigen Spokes (min. 3)
2. **Spoke → Pillar:** Link im ersten Absatz + am Ende
3. **Spoke ↔ Spoke:** 1-2 Links zu verwandten Artikeln
4. **Cross-Cluster:** Thematisch verwandte Cluster verlinken aufeinander
5. **Info ↔ Kauf:** Jede Info-Rassen-Seite verlinkt zur Kauf-Seite und umgekehrt

---

## Content-Specs

| Typ | Wörter | Struktur |
|-----|--------|----------|
| **Pillar (Hub)** | 2.500-3.500 | Intro → TOC → Grundlagen → 8-12 Sektionen → FAQ → CTA |
| **Spoke (Standard)** | 1.200-2.000 | Intro (Link zu Hub) → Hauptinhalt → FAQ → CTA |
| **🗺️ Regional-Aggregator** | 1.800-2.500 | Marktplatz-Tabelle → Züchter nach Subregion → Verbände → Rassen → Events → Preise → FAQ |
| **📚 Info-Rasseporträt** | 2.000-3.000 | Steckbrief → Geschichte → Charakter → Eignung → Haltung → FAQ → CTA zu Kauf-Seite |
| **🛒 Kauf-Rasseporträt** | 1.500-2.500 | Preisübersicht → Worauf achten → Züchter → Marktplätze → FAQ → CTA zu Rechner |

---

## Duplicate Content Prevention: Info vs. Kauf

**Kritisch:** Info- und Kauf-Seiten für dieselbe Rasse dürfen max. 20% Overlap haben!

| Info-Seite (Ratgeber) | Kauf-Seite (Commercial) |
|----------------------|-------------------------|
| Geschichte & Herkunft | ❌ Nicht enthalten |
| Charakter & Wesen | Nur 1-2 Sätze Zusammenfassung |
| Exterieur detailliert | ❌ Nicht enthalten |
| Eignung (allgemein) | Eignung für Käufer (Anfänger ja/nein) |
| Haltung & Pflege | ❌ Nicht enthalten |
| ❌ Nicht enthalten | Preisübersicht detailliert |
| ❌ Nicht enthalten | Worauf beim Kauf achten |
| ❌ Nicht enthalten | Züchter & Marktplätze |

---

## Quarterly Update-Zyklus

| Quartal | Cluster |
|---------|---------|
| Q1 2025 | Pferd Kaufen + AKU |
| Q2 2025 | Pferdehaltung Kosten |
| Q3 2025 | Pferd Verkaufen |
| **Q4 2025** | **Pferderassen Info-Cluster (NEU)** |

---

## USP-Integration

Jeder Artikel endet mit Pferdewert-Rechner CTA:
> **Was ist dein Pferd wert?** → [Pferdewert-Rechner](/)

---

## Technische SEO-Standards (Dezember 2025)

### Pflicht für jede Ratgeber/Kauf-Seite

| Anforderung | Component/Datei | Status-Check |
|-------------|-----------------|--------------|
| **RatgeberHead verwenden** | `components/ratgeber/RatgeberHead.tsx` | Meta, OG, Schema automatisch |
| **Exakt 1 H1 pro Seite** | Im `RatgeberHero` oder erstem Section | Nicht mehrere H2 ohne H1 |
| **Alt-Text auf allen Bildern** | `RatgeberHeroImage`, alle `<Image>` | WCAG + Bild-SEO |
| **FAQ-Items übergeben** | `faqItems` Prop an RatgeberHead | FAQ-Schema generieren |
| **LocalizedLink verwenden** | `@/components/LocalizedLink` | Multi-Domain korrekt |
| **seoLocales definieren** | de, at, ch Varianten | Lokalisierte Meta-Tags |

### RatgeberHead Minimal-Beispiel

```tsx
<RatgeberHead
  slug="haflinger"
  image="/images/ratgeber/haflinger-hero.webp"
  locales={seoLocales}
  datePublished="2025-01-15"
  dateModified="2025-12-18"
  wordCount={3500}
  breadcrumbTitle="Haflinger kaufen"
  faqItems={faqData}  // ← Nicht vergessen!
  basePath="/pferd-kaufen"  // oder /pferde-ratgeber
/>
```

### Heading-Hierarchie (korrekt)

```
<RatgeberHero>
  <h1>Haflinger kaufen: Preise & Tipps 2025</h1>  ← Exakt 1x H1
</RatgeberHero>

<section>
  <h2>Preisübersicht</h2>  ← H2 für Hauptsektionen
  <h3>Freizeit-Haflinger</h3>  ← H3 für Untersektionen
</section>
```

### Bild-Optimierung

```tsx
// ✅ RICHTIG
<RatgeberHeroImage
  src="/images/ratgeber/haflinger-hero.webp"
  alt="Haflinger Pferd auf Almwiese in Tirol"  // ← Beschreibend!
/>

// ❌ FALSCH
<img src="/images/ratgeber/haflinger-hero.webp" />  // Kein alt, kein next/image
```

### Multi-Domain Konfiguration

Exklusive Seiten werden zentral verwaltet in:
`frontend/lib/country-exclusive-pages.ts`

```typescript
// Neue regionale Seite hinzufügen:
COUNTRY_EXCLUSIVE_PAGES = {
  DE: [..., '/pferd-kaufen/thueringen'],  // ← Nur hier eintragen
  // Middleware, Sitemap, hreflang werden automatisch angepasst
}
```

---

## Ausstehende Migrationen

| Seite | Von | Nach | Grund | Priorität |
|-------|-----|------|-------|-----------|
| Lipizzaner | `/pferde-ratgeber/lipizzaner` | `/pferd-kaufen/lipizzaner` | 100% Commercial Intent | 🔴 Hoch |
| Kaufvertrag | `/pferd-kaufen/kaufvertrag` | `/pferde-ratgeber/pferdekaufvertrag` | 60% Informational | 🟠 Mittel |

**Bei Migration:** 301-Redirect in `next.config.js` einrichten!
