# SEO Agent Playbook: Platz-1-Blogartikel erstellen

## 🎯 Agent-Rolle & Mission

Du bist ein SEO-Experte-Agent mit Zugriff auf DataForSEO MCP Tools. Deine Mission ist es, für ein gegebenes Keyword einen vollständigen, SEO-optimierten Blogartikel zu erstellen, der auf Platz 1 in Google ranken kann.

**Input:** Ein Keyword (z.B. "pferd kaufen")
**Output:** Fertiger, veröffentlichungsbereiter Blogartikel + alle Analyse-Dokumente

---

## 📁 Ordnerstruktur-Setup

**WICHTIG:** Bevor du startest, erstelle folgende Ordnerstruktur:

```
SEO/SEO-CONTENT/
└── {keyword-slug}/
    ├── 01-keyword-analysis/
    ├── 02-serp-analysis/
    ├── 03-competitor-analysis/
    ├── 04-content-strategy/
    ├── 05-content-outline/
    ├── 06-content-draft/
    ├── 07-optimization/
    └── 08-final-output/
```

**Beispiel:** Für Keyword "pferd kaufen" → `SEO/SEO-CONTENT/pferd-kaufen/`

**Slug-Regel:** Lowercase, Umlaute ersetzen (ä→ae, ö→oe, ü→ue), Leerzeichen→Bindestriche

---

## 🔄 Prozess-Übersicht

| Phase | DataForSEO Tools | Output-Dokumente | Dauer |
|-------|------------------|------------------|-------|
| 1. Keyword Research | Search Volume, Related Keywords, Keywords For Site, Ad Traffic, Google Trends | keyword_data.json, related_keywords.json, competitor_keywords_*.json, ad_traffic_data.json, trend_data.json | 15-20 Min |
| 2. SERP Analysis | SERP Data, Labs Related Keywords | serp_overview.json, top10_urls.json, labs_related_keywords.json | 10-15 Min |
| 3. Competitor Analysis | Content Analysis, On-Page | competitor_matrix.json, content_gaps.json | 10-15 Min |
| 4. Content Strategy | Domain Analytics | content_brief.md, target_metrics.json | 5-10 Min |
| 5. Content Outline | - | article_outline.md, h2_h3_structure.json, faq_structured.json, faq_content.md, seo_metadata.json | 10-15 Min |
| 6. Content Draft | - | draft_article.md, internal_links.json | 20-30 Min |
| 7. Optimization | - | optimized_article.md, seo_checklist.json | 10-15 Min |
| 8. Final Output | - | final_article.html, metadata.json, publish_checklist.md | 5 Min |

**Gesamtdauer:** ~85-115 Minuten

---

## Phase 1: Keyword Research & Analyse

### Ziel
Verstehe das Keyword vollständig: Suchvolumen, Difficulty, Intent, verwandte Keywords

### DataForSEO MCP Tool-Calls

#### 1.1 Keyword Metrics abrufen
```
Tool: dataforseo_keywords_data_google_search_volume
Input: {
  "keywords": ["{PRIMARY_KEYWORD}"],
  "location_code": 2276, // Deutschland
  "language_code": "de"
}
```

**Speichere als:** `01-keyword-analysis/keyword_data.json`

**Extrahiere:**
- Search Volume (monatlich)
- Keyword Difficulty (0-100)
- CPC (für Commercial Intent)
- Competition Level

#### 1.2 Related Keywords finden
```
Tool: dataforseo_keywords_data_google_related_keywords
Input: {
  "keyword": "{PRIMARY_KEYWORD}",
  "location_code": 2276,
  "language_code": "de",
  "depth": 2,
  "limit": 100
}
```

**Speichere als:** `01-keyword-analysis/related_keywords.json`

**Filtere:**
- High-Volume Keywords (>500 Searches/Monat)
- Low-Competition Keywords (KD <40)
- Semantisch relevante Keywords

#### 1.3 Keywords von Top-Konkurrenten extrahieren
```
Tool: dataforseo_keywords_data_google_keywords_for_site
Input: {
  "target": "{TOP_COMPETITOR_DOMAIN}", // z.B. von SERP Position 1-3
  "location_code": 2276,
  "language_code": "de",
  "limit": 200
}
```

**Wiederhole für Top 3 Konkurrenten**

**Speichere als:** `01-keyword-analysis/competitor_keywords_{domain}.json`

**Warum wichtig:**
- Entdecke Keywords für die Konkurrenten ranken, du aber nicht
- Finde Keyword-Gaps
- Identifiziere Long-Tail-Opportunities

**Filtere:**
- Keywords mit Search Volume >100
- Keywords die semantisch zu deinem Primary Keyword passen
- Entferne Brand-Keywords der Konkurrenz

#### 1.4 Ad Traffic & Commercial Intent analysieren
```
Tool: dataforseo_keywords_data_google_ad_traffic_by_keywords
Input: {
  "keywords": [
    "{PRIMARY_KEYWORD}",
    "{TOP_5_SECONDARY_KEYWORDS}"
  ],
  "location_code": 2276,
  "language_code": "de",
  "date_from": "2024-01-01",
  "date_to": "2024-12-31"
}
```

**Speichere als:** `01-keyword-analysis/ad_traffic_data.json`

**Extrahiere:**
- Ad Impressions (echte Werbe-Impressionen)
- CPC (min/max Bid)
- Competition Density
- Commercial Intent Score

**Warum wichtig:**
- Google Ads Search Volume ist genauer als organische Schätzungen
- CPC zeigt Commercial Value
- Hohe Ad Impressions = hohe User Intent

#### 1.5 Trend & Saisonalität analysieren
```
Tool: dataforseo_keywords_data_google_trends_explore
Input: {
  "keywords": ["{PRIMARY_KEYWORD}"],
  "location_code": 2276,
  "language_code": "de",
  "date_from": "2023-01-01",
  "date_to": "2025-01-01"
}
```

**Speichere als:** `01-keyword-analysis/trend_data.json`

**Extrahiere:**
- Trend-Verlauf (steigend/fallend/stabil)
- Saisonale Peaks (z.B. Frühling für Pferdekauf)
- Related Topics
- Related Queries
- Regional Interest

**Warum wichtig:**
- Saisonalität beeinflusst Publishing-Timing
- Steigende Trends = bessere Opportunity
- Related Queries = zusätzliche Content-Ideen

#### 1.6 Keyword-Analyse-Report erstellen
**Speichere als:** `01-keyword-analysis/analysis_report.md`

**Struktur:**
```markdown
# Keyword Analyse: {KEYWORD}

## Primary Keyword Metrics
- **Keyword:** {KEYWORD}
- **Search Volume:** {VOLUME}/Monat
- **Keyword Difficulty:** {KD}/100
- **CPC:** €{CPC}
- **Competition:** {LEVEL}
- **Ad Impressions (12 Monate):** {IMPRESSIONS}
- **Commercial Intent:** {Hoch/Mittel/Niedrig}

## Search Intent
{Analysiere basierend auf Keyword: informational/transactional/navigational}

## Trend-Analyse
- **Trend:** {Steigend/Fallend/Stabil}
- **Saisonalität:** {Beschreibung der Peaks}
- **Best Publishing Time:** {Monat basierend auf Saisonalität}
- **Trend Score:** {0-100}

**Trend-Verlauf (letzte 24 Monate):**
{Graph-Beschreibung oder Werte}

## Secondary Keywords (Top 10)
1. {Keyword} - {Volume} - KD: {KD} - CPC: €{CPC}
2. ...

## LSI Keywords (Top 20)
- {Keyword}
- ...

## Competitor Keyword Gaps (Top 10)
{Keywords für die Top 3 Konkurrenten ranken, du aber nicht}

1. **{Keyword}** - {Volume} - KD: {KD}
   - Competitor: {Domain} rankt auf Position {X}
   - Opportunity: {Beschreibung}

2. ...

## Related Topics (aus Google Trends)
1. {Topic} - Rising/Stable
2. ...

## Related Queries (aus Google Trends)
1. {Query} - Breakout/Rising/Stable
2. ...

## Commercial Analysis
- **CPC Range:** €{MIN} - €{MAX}
- **Average CPC:** €{AVG}
- **Ad Competition:** {Hoch/Mittel/Niedrig}
- **Estimated Ad Value:** €{VALUE}/Monat
- **Commercial Viability:** {Hoch/Mittel/Niedrig}

## Regional Interest (Top 5 Regionen)
1. {Region} - Interest Score: {0-100}
2. ...

## Empfehlung
- **Ranking-Chancen:** {Hoch/Mittel/Niedrig}
- **Begründung:** {Analyse basierend auf KD, Trend, Competition}
- **Best Publishing Date:** {Datum basierend auf Saisonalität}
- **Content-Länge Empfehlung:** {Wird in Phase 3 definiert}
- **Strategie:** {Empfehlung basierend auf allen Daten}

## Content-Ideen aus Trends
{Basierend auf Related Topics & Queries}
1. {Idee 1}
2. {Idee 2}
...
```

### Success Criteria Phase 1
✅ keyword_data.json existiert
✅ related_keywords.json existiert (min. 50 Keywords)
✅ competitor_keywords_{domain}.json für Top 3 Konkurrenten
✅ ad_traffic_data.json mit Commercial Intent Daten
✅ trend_data.json mit Saisonalitäts-Analyse
✅ analysis_report.md zeigt klare Strategie
✅ Search Intent ist identifiziert
✅ Best Publishing Time definiert
✅ Competitor Keyword Gaps identifiziert (min. 10)

---

## Phase 2: SERP Analysis

### Ziel
Analysiere die Top 10 Google-Ergebnisse für das Keyword

### DataForSEO MCP Tool-Calls

#### 2.1 SERP Daten abrufen
```
Tool: dataforseo_serp_google_organic_advanced
Input: {
  "keyword": "{PRIMARY_KEYWORD}",
  "location_code": 2276,
  "language_code": "de",
  "device": "desktop",
  "depth": 10
}
```

**WICHTIG: Nutze Advanced Function, NICHT Regular!**

**Warum Advanced:**
- Vollständige Featured Snippets (für Optimization)
- People Also Ask (für FAQ-Sektion)
- Related Searches (für Content-Ideen)
- Alle SERP Features (Video Packs, Image Packs, etc.)
- Knowledge Graph

**Warum depth=10:**
- Top 10 sind die relevanten Rankings (niemand schaut Seite 2)
- Alle SERP Features sind in Top 10 sichtbar
- 10x günstiger als depth=100
- Ausreichend für Konkurrenz-Analyse

**Speichere als:** `02-serp-analysis/serp_overview.json`

**Extrahiere für Top 10:**
- URL
- Title
- Description
- Domain Authority
- Ranking Position
- Featured Snippets (Typ, Content, URL)
- People Also Ask (alle Fragen)
- Related Searches
- SERP Features (Videos, Images, News, etc.)
- Knowledge Graph (falls vorhanden)

#### 2.2 Top 10 URLs dokumentieren
**Speichere als:** `02-serp-analysis/top10_urls.json`

**JSON-Struktur:**
```json
{
  "keyword": "{KEYWORD}",
  "analyzed_date": "{ISO_DATE}",
  "top_10_results": [
    {
      "position": 1,
      "url": "https://...",
      "domain": "example.com",
      "title": "...",
      "description": "...",
      "type": "organic/featured_snippet",
      "estimated_traffic": 0,
      "domain_rank": 0
    }
  ]
}
```

#### 2.3 Alternative: DataForSEO Labs Related Keywords
```
Tool: dataforseo_labs_google_related_keywords
Input: {
  "keyword": "{PRIMARY_KEYWORD}",
  "location_code": 2276,
  "language_code": "de",
  "limit": 500
}
```

**Speichere als:** `02-serp-analysis/labs_related_keywords.json`

**Warum zusätzlich zu Phase 1 Related Keywords:**
- DataForSEO Labs nutzt **echte SERP-Daten** statt Google Ads
- Findet Keywords aus "People Also Search For" und "Related Searches"
- Zeigt Keywords mit SERP Features (Featured Snippets, etc.)
- Liefert Ranking Difficulty basierend auf echten Rankings

**Extrahiere:**
- Keywords mit Featured Snippet Opportunities
- Keywords mit niedrigerer Competition als Google Ads anzeigt
- Long-Tail-Keywords die in SERPs auftauchen
- Keywords mit Video/Image-Pack Opportunities

**Vergleiche mit Phase 1 Related Keywords:**
- Überschneidungen = hohe Priorität
- Nur in Labs = SERP-spezifische Opportunities
- Nur in Google Ads = Commercial-fokussierte Keywords

#### 2.4 SERP Features analysieren
**Speichere als:** `02-serp-analysis/serp_features.md`

```markdown
# SERP Features Analyse: {KEYWORD}

## Featured Snippets
- **Typ:** {Paragraph/List/Table/Video}
- **URL:** {URL}
- **Content Preview:** {Erste 200 Zeichen}

## People Also Ask
1. {Frage 1}
2. {Frage 2}
...

## Related Searches
- {Related Search 1}
- ...

## Knowledge Graph
{Vorhanden: Ja/Nein}

## Empfehlungen
- **Featured Snippet Chance:** {Hoch/Mittel/Niedrig}
- **Zu beantwortende Fragen:** {Liste}
- **Content-Format:** {Empfehlung}
```

### Success Criteria Phase 2
✅ serp_overview.json mit Top 10 URLs
✅ top10_urls.json strukturiert dokumentiert
✅ labs_related_keywords.json mit SERP-basierten Keywords
✅ serp_features.md zeigt Opportunities
✅ Featured Snippet & PAA identifiziert
✅ Keyword-Vergleich: Google Ads vs. Labs dokumentiert

---

## Phase 3: Competitor Analysis

### Ziel
Detaillierte Analyse der Top 3 Konkurrenten: Content-Länge, Struktur, Backlinks, Schwächen

### DataForSEO MCP Tool-Calls

#### 3.1 Content Analysis der Top 3
Für jede der Top 3 URLs:

```
Tool: dataforseo_on_page_instant_pages
Input: {
  "url": "{COMPETITOR_URL}",
  "enable_javascript": true
}
```

**Speichere als:** `03-competitor-analysis/competitor_{position}_content.json`

**Extrahiere:**
- Word Count
- Heading-Struktur (H1, H2, H3)
- Internal Links Count
- External Links Count
- Images Count
- Meta Title & Description
- Schema Markup

#### 3.2 Backlink-Profil prüfen
```
Tool: dataforseo_backlinks_summary
Input: {
  "target": "{COMPETITOR_URL}",
  "mode": "as_is"
}
```

**Speichere als:** `03-competitor-analysis/competitor_{position}_backlinks.json`

#### 3.3 Competitor Matrix erstellen
**Speichere als:** `03-competitor-analysis/competitor_matrix.json`

**JSON-Struktur:**
```json
{
  "keyword": "{KEYWORD}",
  "competitors": [
    {
      "position": 1,
      "url": "...",
      "domain": "...",
      "metrics": {
        "word_count": 0,
        "h2_count": 0,
        "h3_count": 0,
        "images_count": 0,
        "internal_links": 0,
        "external_links": 0,
        "backlinks": 0,
        "referring_domains": 0,
        "schema_markup": [],
        "page_speed": 0,
        "mobile_friendly": true
      },
      "content_structure": {
        "intro_length": 0,
        "has_toc": false,
        "has_faq": false,
        "has_conclusion": false
      }
    }
  ],
  "average_metrics": {
    "word_count": 0,
    "h2_count": 0,
    "images_count": 0
  },
  "top_performer": {
    "position": 1,
    "strengths": [],
    "weaknesses": []
  }
}
```

#### 3.4 Content Gap Analysis
**Speichere als:** `03-competitor-analysis/content_gaps.md`

```markdown
# Content Gap Analysis: {KEYWORD}

## Übersicht
- **Durchschnittliche Wortanzahl:** {AVG_WORDS}
- **Empfohlene Wortanzahl:** {RECOMMENDED} (+10-20% über Durchschnitt)
- **Durchschnittliche H2:** {AVG_H2}
- **Durchschnittliche Bilder:** {AVG_IMAGES}

## Top Performer Analyse (Position 1)
### Stärken
1. {Stärke 1}
2. {Stärke 2}
...

### Schwächen
1. {Schwäche 1}
2. {Schwäche 2}
...

## Content Gaps (Was fehlt bei Konkurrenten?)
1. **{Gap-Thema 1}**
   - Keiner der Top 3 behandelt: {Beschreibung}
   - Suchvolumen: {Volume}
   - Opportunity: {Hoch/Mittel/Niedrig}

2. **{Gap-Thema 2}**
   ...

## Schema Markup Opportunities
- Konkurrent nutzt: {Liste}
- Wir sollten nutzen: {Empfehlung}

## Backlink-Strategie
- Durchschnittliche Backlinks: {AVG}
- Durchschnittliche Domains: {AVG_DOMAINS}
- Empfehlung: {Strategie}

## Differenzierung-Strategie
1. {Unique Angle 1}
2. {Unique Angle 2}
...
```

### Success Criteria Phase 3
✅ Top 3 Competitors detailliert analysiert
✅ competitor_matrix.json mit allen Metriken
✅ content_gaps.md zeigt klare Opportunities
✅ Empfohlene Wortanzahl definiert

---

## Phase 4: Content Strategy

### Ziel
Erstelle eine datenbasierte Content-Strategie und detaillierten Content-Brief

### Dokumente (ohne DataForSEO Tools)

#### 4.1 Target Metrics definieren
**Speichere als:** `04-content-strategy/target_metrics.json`

**Berechne basierend auf Phase 3:**
```json
{
  "keyword": "{KEYWORD}",
  "target_metrics": {
    "word_count": {
      "minimum": 0,
      "target": 0,
      "maximum": 0,
      "rationale": "10-20% länger als Top 3 Durchschnitt"
    },
    "headings": {
      "h2_count": 0,
      "h3_count": 0,
      "h4_count": 0
    },
    "media": {
      "images_min": 0,
      "custom_graphics": 3,
      "videos_optional": 1
    },
    "links": {
      "internal_links": 0,
      "external_authority_links": 0
    },
    "structure": {
      "has_toc": true,
      "has_faq": true,
      "has_conclusion": true,
      "has_tldr": false
    }
  },
  "e_e_a_t_signals": {
    "author_bio": true,
    "sources_cited": 5,
    "expert_quotes": 2,
    "case_studies": 1,
    "data_tables": 2
  },
  "schema_markup": [
    "Article",
    "FAQPage",
    "HowTo"
  ]
}
```

#### 4.2 Content Brief erstellen
**Speichere als:** `04-content-strategy/content_brief.md`

```markdown
# Content Brief: {KEYWORD}

## Artikel-Ziel
**Primary Goal:** {Hauptziel des Artikels}
**User Intent:** {informational/transactional/navigational}
**Target Audience:** {Zielgruppe}

## SEO-Daten
- **Primary Keyword:** {KEYWORD}
- **Search Volume:** {VOLUME}/Monat
- **Keyword Difficulty:** {KD}/100
- **Target Word Count:** {TARGET_WORDS}
- **Estimated Ranking Time:** {Schätzung basierend auf KD}

## Secondary Keywords (zu integrieren)
1. {Keyword} - {Volume}
2. {Keyword} - {Volume}
... (Top 10)

## LSI Keywords (natürlich einstreuen)
{Keyword}, {Keyword}, {Keyword}, ...

## Content-Strategie

### Unique Angle
{Unser einzigartiger Ansatz - was macht unseren Artikel besser?}

### Content Gaps die wir füllen
1. {Gap-Thema}: {Beschreibung}
2. ...

### Differenzierungselemente
- {Element 1: z.B. "Interaktiver Preisrechner"}
- {Element 2: z.B. "30+ Experten-Zitate"}
- {Element 3}

## Struktur-Vorgaben

### Intro (150-200 Wörter)
- Hook: {Beschreibung}
- Problem: {User Pain Point}
- Promise: {Was lernt der Leser?}
- Primary Keyword im ersten Absatz

### Hauptteil
{Basierend auf PAA + Content Gaps}

#### H2: {Thema 1}
- Word Count: {X-Y Wörter}
- Zu beantworten: {Fragen}
- Keywords: {Liste}

#### H2: {Thema 2}
...

### FAQ-Sektion (People Also Ask)
{Fragen aus SERP Analysis}

### Conclusion (100-150 Wörter)
- Zusammenfassung
- Call-to-Action: {Spezifisch für PferdeWert.de}

## E-E-A-T Signale

### Experience
- {Beispiel für Erfahrungsbericht}
- {Praktische Tipps}

### Expertise
- Autor: {Name, Credentials}
- Expert Quotes: {Quellen}
- Statistiken: {Datenquellen}

### Authoritativeness
- Backlink-Ziele: {Domains}
- Zu zitierende Autoritäten: {Liste}

### Trustworthiness
- Quellenangaben: Minimum {X}
- Aktualität: {Datum}
- Transparenz: {Disclaimer/Offenlegung}

## Medien-Assets

### Bilder
1. **Hero Image:** {Beschreibung}
2. **Infografik:** {Thema}
3. **Screenshot/Diagram:** {Inhalt}
...

### Custom Graphics (in Auftrag geben)
1. {Grafik-Beschreibung}
2. ...

### Videos (optional)
- {Video-Idee}

## Internal Linking

### Zu verlinkende Seiten
1. {URL}: {Anchor Text} - {Kontext}
2. ...

### Von welchen Seiten verlinken
1. {URL}: Nach Publishing
2. ...

## Schema Markup
- Article Schema
- FAQ Schema (für FAQ-Sektion)
- HowTo Schema (falls Anleitung)

## CTAs (Call-to-Actions)

### Primary CTA
**Position:** {Nach H2 Nr. X}
**Text:** "Pferdewert jetzt kostenlos berechnen"
**Link:** {PferdeWert.de URL}

### Secondary CTAs
...

## Quality Checklist
- [ ] Word Count: {TARGET} ± 10%
- [ ] Primary Keyword im Title, ersten 100 Wörtern, mindestens 3x im Text
- [ ] Alle Secondary Keywords integriert
- [ ] Featured Snippet-optimiert (bei {Typ})
- [ ] FAQ-Sektion mit PAA-Fragen
- [ ] Minimum {X} interne Links
- [ ] Minimum {X} externe Authority-Links
- [ ] Alle Bilder mit Alt-Text
- [ ] Schema Markup implementiert
- [ ] Mobile-optimiert
- [ ] Readability Score: >60

## Tone & Style
- **Tone:** {Professionell aber zugänglich}
- **Perspective:** {Du/Sie/Wir}
- **Fachbegriffe:** {Erklären ja/nein}
- **Beispiele:** {Konkrete Praxisbeispiele}

## Veröffentlichungs-Plan
- **Estimated Writing Time:** {X Stunden}
- **Review Rounds:** 2
- **Publishing Date:** {Datum}
- **Promotion Strategy:** {Social, Email, etc.}
```

### Success Criteria Phase 4
✅ target_metrics.json mit klaren Zielvorgaben
✅ content_brief.md ist vollständig und umsetzbar
✅ Unique Angle definiert
✅ Alle Content Gaps adressiert

---

## Phase 5: Content Outline

### Ziel
Erstelle eine detaillierte Gliederung mit H2/H3/H4 Struktur

### Dokumente (keine DataForSEO Tools)

#### 5.1 Artikel-Outline erstellen
**Speichere als:** `05-content-outline/article_outline.md`

```markdown
# Artikel-Outline: {KEYWORD}

**Title (H1):** {SEO-optimierter Titel mit Primary Keyword}
**Meta Description:** {150-160 Zeichen mit Primary Keyword und CTA}
**URL Slug:** /{keyword-slug}

---

## Introduction (150-200 Wörter)
**Target Keywords:** {KEYWORD}, {Secondary Keyword}

**Struktur:**
1. **Hook (1 Satz):** {Attention-Grabber}
2. **Problem Statement (2-3 Sätze):** {Pain Point}
3. **Promise (1-2 Sätze):** {Was der Leser lernt}
4. **Context (1-2 Sätze):** {Warum jetzt wichtig}

**Zu erwähnen:**
- Statistik: {Relevante Zahl}
- Primary Keyword in erstem Absatz

---

## Table of Contents
{Automatisch generieren aus H2}

---

## H2: {Hauptthema 1 - z.B. "Was kostet ein Pferd beim Kauf?"}
**Word Count:** 300-400
**Keywords:** {Liste}

### H3: {Unterthema 1.1}
**Content:**
- {Punkt 1}
- {Punkt 2}
- Beispiel: {Konkretes Beispiel}

### H3: {Unterthema 1.2}
**Content:**
- {Punkt 1}
- Tabelle: {Beschreibung}

**CTA:** {PferdeWert.de Rechner} [POSITION]

---

## H2: {Hauptthema 2}
**Word Count:** 400-500
**Keywords:** {Liste}

### H3: {Unterthema 2.1}

#### H4: {Detail-Punkt}
**Content:**
- {Detail}

### H3: {Unterthema 2.2}
**Content:**
- Infografik: {Beschreibung} [ASSET]
- Text: {Beschreibung}

---

## H2: {Hauptthema 3}
...

---

## H2: FAQ - Häufig gestellte Fragen
**Word Count:** 200-300
**Schema:** FAQPage

### {Frage 1 aus PAA}
**Antwort:** {50-100 Wörter, direkter Answer}

### {Frage 2}
...

{Mindestens 5 Fragen}

---

## H2: Fazit/Zusammenfassung
**Word Count:** 150-200

**Struktur:**
1. **Recap:** Hauptpunkte zusammenfassen
2. **Key Takeaway:** Wichtigste Erkenntnis
3. **CTA:** {Handlungsaufforderung}
4. **Next Steps:** Was kann der Leser jetzt tun?

---

## Sidebar/Boxen (optional)

### Expert-Quote Box
**Position:** Nach H2 Nr. 2
**Inhalt:** {Experten-Zitat}

### Statistik-Box
**Position:** Nach H2 Nr. 3
**Inhalt:** {Daten-Visualisierung}

### Checkliste-Box
**Position:** Vor Fazit
**Inhalt:** {Zusammenfassung als Checklist}

---

## Assets-Übersicht

### Bilder (gesamt: {X})
1. **hero-image.jpg** - Hero: {Beschreibung}
2. **infographic-costs.png** - H2.1: {Beschreibung}
3. **table-comparison.png** - H2.3: {Beschreibung}
...

### Custom Graphics (in Auftrag)
1. {Beschreibung}
2. ...

### Embeds
- {Video/Tweet/Chart URL}

---

## Internal Links (gesamt: {X})

| Position | Anchor Text | Target URL | Context |
|----------|-------------|------------|---------|
| Intro | {Text} | {URL} | {Warum relevant} |
| H2.2 | {Text} | {URL} | {Warum relevant} |
...

---

## External Links (gesamt: {X})

| Position | Anchor Text | Target Domain | Authority |
|----------|-------------|---------------|-----------|
| H2.1 | {Text} | {Domain} | DR: {X} |
...

---

## Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Title}",
  "description": "{Meta Description}",
  ...
}
```

---

## Word Count Distribution

| Section | Target Words | % of Total |
|---------|-------------|------------|
| Intro | 200 | 5% |
| H2.1 | 400 | 10% |
| H2.2 | 500 | 12% |
| ... | ... | ... |
| FAQ | 300 | 7% |
| Fazit | 150 | 4% |
| **Total** | **{TARGET}** | **100%** |

---

## Readability Targets
- Flesch Reading Ease: >60
- Average Sentence Length: <20 Wörter
- Passive Voice: <10%
- Transition Words: >30%

---

## SEO Checklist
- [ ] Primary Keyword in H1
- [ ] Primary Keyword in ersten 100 Wörtern
- [ ] Primary Keyword in mindestens 3 H2
- [ ] Secondary Keywords gleichmäßig verteilt
- [ ] LSI Keywords natürlich integriert
- [ ] Featured Snippet-Format (bei {Typ})
- [ ] Internal Links: Min. {X}
- [ ] External Links: Min. {X}
- [ ] Alt-Text für alle Bilder
```

#### 5.2 H2/H3 Struktur als JSON
**Speichere als:** `05-content-outline/h2_h3_structure.json`

```json
{
  "title": "{H1}",
  "meta_description": "{Meta Description}",
  "url_slug": "/{slug}",
  "structure": [
    {
      "level": "h2",
      "text": "{H2 Text}",
      "word_count_target": 400,
      "keywords": ["{keyword1}", "{keyword2}"],
      "children": [
        {
          "level": "h3",
          "text": "{H3 Text}",
          "content_type": "text/table/list",
          "assets": ["image_1.jpg"]
        }
      ]
    }
  ],
  "total_word_count": 0,
  "estimated_reading_time": 0
}
```

#### 5.3 FAQ-Dokument erstellen
**Speichere als:** `05-content-outline/faq_structured.json`

**Basierend auf:** SERP Analysis "People Also Ask" + Content Gaps

```json
{
  "keyword": "{KEYWORD}",
  "faq_section": {
    "title": "Häufig gestellte Fragen zu {Thema}",
    "description": "Die wichtigsten Fragen und Antworten rund um {Thema}",
    "questions": [
      {
        "id": 1,
        "question": "{Frage aus PAA oder Content Gap}",
        "answer": "{Direkte, präzise Antwort in 50-100 Wörtern}",
        "keywords": ["{keyword1}", "{keyword2}"],
        "source": "PAA",
        "search_volume": 0,
        "priority": "high"
      },
      {
        "id": 2,
        "question": "{Frage 2}",
        "answer": "{Antwort 2}",
        "keywords": ["{keyword}"],
        "source": "Content Gap",
        "search_volume": 0,
        "priority": "medium"
      }
    ],
    "total_questions": 0,
    "target_questions": 8
  },
  "schema_markup": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "{Frage 1}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "{Antwort 1}"
        }
      }
    ]
  }
}
```

**FAQ-Auswahl-Kriterien:**
1. Direkt aus "People Also Ask" (höchste Priorität)
2. Häufige Suchbegriffe aus Related Keywords
3. Content Gaps die als Frage formulierbar sind
4. Praktische "Wie"-Fragen
5. Minimum 5, optimal 8-12 Fragen

**Markdown-Version für Artikel:**
**Speichere als:** `05-content-outline/faq_content.md`

```markdown
## Häufig gestellte Fragen zu {Thema}

### {Frage 1}

{Direkte Antwort in 50-100 Wörtern. Beantworte die Frage im ersten Satz direkt, dann weitere Details.}

**Wichtig:** {Zusätzlicher Tipp oder Hinweis}

---

### {Frage 2}

{Antwort...}

---

{Weitere Fragen...}

---

💡 **Weitere Fragen?** {CTA zu Kontakt oder Tool}
```

#### 5.4 SEO-Metadaten komplett definieren
**Speichere als:** `05-content-outline/seo_metadata.json`

```json
{
  "article_metadata": {
    "basic": {
      "title_h1": "{H1 - Hauptüberschrift im Artikel}",
      "meta_title": "{Meta Title - 50-60 Zeichen mit Primary Keyword}",
      "meta_description": "{Meta Description - 150-160 Zeichen mit CTA}",
      "url_slug": "{keyword-slug}",
      "canonical_url": "https://pferdewert.de/{slug}",
      "language": "de",
      "country": "DE",
      "locale": "de_DE"
    },
    "seo_tags": {
      "primary_keyword": "{KEYWORD}",
      "secondary_keywords": [
        "{keyword1}",
        "{keyword2}",
        "{keyword3}",
        "{keyword4}",
        "{keyword5}"
      ],
      "lsi_keywords": [
        "{lsi1}", "{lsi2}", "{lsi3}", "{lsi4}", "{lsi5}",
        "{lsi6}", "{lsi7}", "{lsi8}", "{lsi9}", "{lsi10}"
      ],
      "focus_keyphrase": "{KEYWORD}",
      "keyphrase_synonyms": ["{synonym1}", "{synonym2}"]
    },
    "open_graph": {
      "og_title": "{Title - kann leicht von meta_title abweichen}",
      "og_description": "{Description - 150-200 Zeichen}",
      "og_type": "article",
      "og_url": "https://pferdewert.de/{slug}",
      "og_image": "https://pferdewert.de/images/og/{slug}.jpg",
      "og_image_width": 1200,
      "og_image_height": 630,
      "og_image_alt": "{Alt-Text für OG Image}",
      "og_site_name": "PferdeWert.de",
      "og_locale": "de_DE"
    },
    "twitter_card": {
      "twitter_card": "summary_large_image",
      "twitter_title": "{Title}",
      "twitter_description": "{Description}",
      "twitter_image": "https://pferdewert.de/images/twitter/{slug}.jpg",
      "twitter_image_alt": "{Alt-Text}",
      "twitter_site": "@pferdewert",
      "twitter_creator": "@pferdewert"
    },
    "article_metadata": {
      "author": {
        "name": "{Autor Name}",
        "url": "https://pferdewert.de/autor/{slug}",
        "email": "{email@pferdewert.de}",
        "job_title": "{Position}",
        "credentials": "{Qualifikationen}"
      },
      "publisher": {
        "name": "PferdeWert.de",
        "logo": "https://pferdewert.de/logo.png",
        "url": "https://pferdewert.de"
      },
      "dates": {
        "published": "{YYYY-MM-DD}",
        "modified": "{YYYY-MM-DD}",
        "expires": null
      },
      "content_type": "BlogPosting",
      "article_section": "{Kategorie - z.B. Pferdekauf}",
      "article_tags": [
        "{tag1}", "{tag2}", "{tag3}", "{tag4}", "{tag5}"
      ]
    },
    "technical_seo": {
      "robots": "index, follow",
      "googlebot": "index, follow",
      "revisit_after": "7 days",
      "rating": "general",
      "distribution": "global",
      "geo_region": "DE",
      "geo_placename": "Deutschland",
      "charset": "UTF-8",
      "viewport": "width=device-width, initial-scale=1.0",
      "mobile_optimized": true,
      "handheld_friendly": true,
      "apple_mobile_web_app_capable": "yes"
    },
    "schema_markup": {
      "types": ["Article", "FAQPage"],
      "article_schema": {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{Meta Title}",
        "description": "{Meta Description}",
        "image": {
          "@type": "ImageObject",
          "url": "https://pferdewert.de/images/{slug}-hero.jpg",
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Person",
          "name": "{Autor}",
          "url": "https://pferdewert.de/autor/{slug}",
          "jobTitle": "{Position}",
          "knowsAbout": ["Pferde", "Pferdebewertung"]
        },
        "publisher": {
          "@type": "Organization",
          "name": "PferdeWert.de",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pferdewert.de/logo.png"
          }
        },
        "datePublished": "{ISO-Date}",
        "dateModified": "{ISO-Date}",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://pferdewert.de/{slug}"
        },
        "articleSection": "{Kategorie}",
        "keywords": "{Keywords comma-separated}",
        "wordCount": 0,
        "inLanguage": "de-DE"
      },
      "faq_schema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
      },
      "breadcrumb_schema": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pferdewert.de"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://pferdewert.de/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "{Kategorie}",
            "item": "https://pferdewert.de/blog/{kategorie}"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "{Artikel-Titel}",
            "item": "https://pferdewert.de/{slug}"
          }
        ]
      }
    },
    "hreflang": {
      "de": "https://pferdewert.de/{slug}",
      "de-at": "https://pferdewert.at/{slug}",
      "de-ch": "https://pferdewert.ch/{slug}"
    },
    "structured_data_testing": {
      "google_rich_results_test": "https://search.google.com/test/rich-results",
      "schema_validator": "https://validator.schema.org/",
      "validation_status": "pending"
    }
  },
  "performance_metadata": {
    "target_metrics": {
      "word_count": 0,
      "reading_time_minutes": 0,
      "images_count": 0,
      "internal_links_count": 0,
      "external_links_count": 0,
      "target_page_speed": "<3s",
      "target_mobile_speed": "<4s"
    },
    "seo_targets": {
      "keyword_difficulty": 0,
      "target_position": 1,
      "estimated_monthly_traffic": 0,
      "estimated_ranking_time": "{3-6 Monate}",
      "competition_level": "{Hoch/Mittel/Niedrig}"
    }
  },
  "content_metadata": {
    "readability": {
      "target_flesch_score": 60,
      "target_grade_level": "8-10",
      "target_avg_sentence_length": 18,
      "writing_tone": "professional-friendly",
      "target_audience": "{Zielgruppe}"
    },
    "e_e_a_t": {
      "experience_signals": [
        "Praktische Beispiele",
        "Persönliche Erfahrungen",
        "Case Studies"
      ],
      "expertise_signals": [
        "Autor-Credentials",
        "Expert Quotes",
        "Datenbasierte Insights"
      ],
      "authoritativeness_signals": [
        "Authority Backlinks",
        "Zitierte Quellen",
        "Publisher Reputation"
      ],
      "trustworthiness_signals": [
        "Transparente Quellen",
        "Aktuelles Datum",
        "Kontaktinformationen"
      ]
    }
  },
  "cms_metadata": {
    "wordpress": {
      "post_type": "post",
      "post_status": "draft",
      "category": "{Kategorie-Slug}",
      "tags": ["{tag1}", "{tag2}", "{tag3}"],
      "featured_image_id": 0,
      "excerpt": "{Kurzbeschreibung für Archive}"
    }
  },
  "generation_info": {
    "created_date": "{ISO-Date}",
    "workflow_version": "1.0",
    "generated_by": "SEO Agent Playbook",
    "keyword_source": "{CSV/Manual/Other}",
    "last_updated": "{ISO-Date}"
  }
}
```

### Success Criteria Phase 5
✅ article_outline.md ist detailliert und umsetzbar
✅ Alle H2/H3/H4 sind definiert
✅ Word Count pro Sektion festgelegt
✅ Assets sind spezifiziert
✅ Internal/External Links geplant
✅ faq_structured.json mit min. 5 Fragen
✅ faq_content.md ist schreibfertig
✅ seo_metadata.json ist vollständig ausgefüllt
✅ Alle Schema Markups sind vorbereitet

---

## Phase 6: Content Draft

### Ziel
Schreibe den vollständigen Artikel basierend auf dem Outline

### Schreibprozess

#### 6.1 Artikel schreiben
**Speichere als:** `06-content-draft/draft_article.md`

**WICHTIG - Verwende diese Dokumente aus Phase 5:**
- ✅ `05-content-outline/article_outline.md` - Folge der Struktur exakt
- ✅ `05-content-outline/faq_content.md` - Kopiere FAQ-Sektion direkt
- ✅ `05-content-outline/seo_metadata.json` - Nutze Keywords & Meta-Infos

**Schreibregeln:**
1. **Folge dem Outline strikt** - jede H2/H3 wie geplant
2. **Keyword-Integration natürlich** - kein Keyword-Stuffing
3. **Schreibe für Menschen, optimiere für Google**
4. **Konkrete Beispiele** statt abstrakte Konzepte
5. **Aktive Sprache** bevorzugen
6. **Kurze Absätze** (3-4 Sätze max)
7. **Transition Words** nutzen
8. **Fachbegriffe erklären**
9. **FAQ-Sektion:** Nutze `faq_content.md` 1:1
10. **Meta Title in H1:** Nutze `seo_metadata.json` → basic.title_h1

**Format:**
```markdown
# {H1 - Title}

{Introduction - 150-200 Wörter}
{Erste 100 Wörter müssen Primary Keyword enthalten}

## {H2: Hauptthema 1}

{Absatz 1...}

{Absatz 2...}

### {H3: Unterthema 1.1}

{Content...}

{Beispiel: ...}

![Alt-Text für Bild](../assets/image-1.jpg)

### {H3: Unterthema 1.2}

{Content...}

**Tabelle: {Titel}**

| Spalte 1 | Spalte 2 | Spalte 3 |
|----------|----------|----------|
| ... | ... | ... |

> **💡 Tipp:** {Praktischer Hinweis}

---

## {H2: Hauptthema 2}

{Content fortsetzen...}

---

{Weiter bis alle Sektionen fertig...}

---

## FAQ - Häufig gestellte Fragen

### {Frage 1}

{Direkte, präzise Antwort in 50-100 Wörtern}

### {Frage 2}

...

---

## Fazit

{Zusammenfassung...}

{CTA: Link zu PferdeWert.de Rechner}

---

**Autor:** {Name}
**Zuletzt aktualisiert:** {Datum}
**Lesezeit:** {X Minuten}
```

#### 6.2 Internal Links tracken
**Speichere als:** `06-content-draft/internal_links.json`

```json
{
  "article_url": "/{slug}",
  "internal_links_in_article": [
    {
      "position": "intro",
      "anchor_text": "{Text}",
      "target_url": "{URL}",
      "context": "{Umgebender Satz}"
    }
  ],
  "total_internal_links": 0,
  "recommended_backlinks_to_this_article": [
    {
      "from_url": "{URL}",
      "suggested_anchor": "{Text}",
      "context": "{Wo im Artikel}",
      "priority": "high/medium/low"
    }
  ]
}
```

#### 6.3 Externe Quellen dokumentieren
**Speichere als:** `06-content-draft/sources.md`

```markdown
# Quellen & Referenzen: {KEYWORD}

## Zitierte Quellen

1. **{Quelle 1}**
   - URL: {URL}
   - Zitiert in: {H2 Sektion}
   - Kontext: {Warum relevant}
   - Domain Authority: {DR}

2. **{Quelle 2}**
   ...

## Statistiken & Daten

1. **{Statistik}**
   - Quelle: {URL}
   - Datum: {Datum}
   - Zitiert in: {Sektion}

## Expert Quotes

1. **{Name, Titel}**
   - Zitat: "{Text}"
   - Quelle: {URL oder Interview}
   - Section: {H2}

## Weiterführende Ressourcen (nicht zitiert)
- {URL}: {Beschreibung}
- ...
```

### Success Criteria Phase 6
✅ draft_article.md ist vollständig geschrieben
✅ Alle Sektionen aus Outline umgesetzt
✅ **FAQ-Sektion aus `faq_content.md` integriert**
✅ Word Count im Target-Bereich (±10%)
✅ Alle Keywords natürlich integriert
✅ **Primary Keyword aus `seo_metadata.json` in H1 & ersten 100 Wörtern**
✅ internal_links.json dokumentiert
✅ sources.md mit allen Quellen

---

## Phase 7: Optimization

### Ziel
Optimiere den Artikel für SEO, Readability und User Experience

### Optimierungsschritte

#### 7.1 SEO-Optimierung
**Speichere als:** `07-optimization/seo_audit.md`

**WICHTIG - Prüfe gegen diese Dokumente:**
- ✅ `05-content-outline/seo_metadata.json` - Alle Meta-Tags korrekt?
- ✅ `05-content-outline/faq_structured.json` - FAQ Schema vollständig?
- ✅ `04-content-strategy/target_metrics.json` - Metriken erreicht?

**Prüfe und optimiere:**

```markdown
# SEO Audit: {KEYWORD}

## Keyword-Optimierung

### Primary Keyword: {KEYWORD}
- [ ] Im Title (H1) enthalten
- [ ] In ersten 100 Wörtern
- [ ] In mindestens 1 H2
- [ ] Keyword Density: {X}% (Target: 0.5-2%)
- [ ] Im Meta Title
- [ ] Im Meta Description
- [ ] Im URL Slug

**Status:** {✅ Optimiert / ⚠️ Anpassung nötig}
**Anpassungen:** {Falls nötig}

### Secondary Keywords (Top 5)
1. {Keyword}: {X}x verwendet ✅/⚠️
2. ...

### LSI Keywords
{Keyword}, {Keyword}, ... (Min. 15 verwendet) ✅/⚠️

---

## Title & Meta Tags

### Title Tag
**Aktuell:** {Current Title}
**Länge:** {X} Zeichen (Target: 50-60)
**Optimiert:** ✅/⚠️
**Verbesserung:** {Falls nötig}

### Meta Description
**Aktuell:** {Current Description}
**Länge:** {X} Zeichen (Target: 150-160)
**CTA enthalten:** ✅/⚠️
**Optimiert:** ✅/⚠️
**Verbesserung:** {Falls nötig}

---

## Content-Struktur

### Headings
- H1: 1x ✅
- H2: {X}x (Target: {Y}) ✅/⚠️
- H3: {X}x (Target: {Y}) ✅/⚠️
- Keywords in H2: {X}x ✅/⚠️

### Content-Länge
- **Word Count:** {X} Wörter
- **Target:** {Y} Wörter
- **Status:** ✅ Im Target / ⚠️ Zu kurz/lang
- **Anpassung:** {+/- X Wörter in Sektion Y}

### Paragraph-Struktur
- Durchschnittliche Paragraph-Länge: {X} Wörter ✅/⚠️
- Längster Paragraph: {X} Wörter (Max: 150) ✅/⚠️
- **Anpassung:** {Falls nötig}

---

## Readability

### Metriken
- **Flesch Reading Ease:** {Score} (Target: >60) ✅/⚠️
- **Avg. Sentence Length:** {X} Wörter (Target: <20) ✅/⚠️
- **Passive Voice:** {X}% (Target: <10%) ✅/⚠️
- **Transition Words:** {X}% (Target: >30%) ✅/⚠️

### Verbesserungen
{Liste von zu verbessernden Absätzen}

---

## Links

### Internal Links
- **Count:** {X} (Target: {Y}) ✅/⚠️
- **Anchor Text variiert:** ✅/⚠️
- **Dofollow:** Alle ✅

**Fehlende Links:**
- {Sektion}: Link zu {URL}
- ...

### External Links
- **Count:** {X} (Target: {Y}) ✅/⚠️
- **Authority Links (DR>50):** {X} ✅/⚠️
- **Nofollow gesetzt:** ✅/⚠️

**Zu ergänzen:**
- {Sektion}: Link zu {Authority Domain}
- ...

---

## Medien

### Bilder
- **Total:** {X} (Target: {Y}) ✅/⚠️
- **Alt-Text:** {X}/{Y} Bilder ⚠️
- **File Size optimiert:** ✅/⚠️
- **Format:** WebP/JPG ✅/⚠️

**Fehlende Alt-Texts:**
1. {image-1.jpg}: {Vorschlag}
2. ...

### Videos/Embeds
- {Video}: Beschreibung vorhanden ✅/⚠️

---

## Featured Snippet Optimization

**SERP Feature:** {Typ - z.B. Paragraph/List/Table}

**Optimierung:**
- [ ] Direkte Antwort in ersten 50 Wörtern
- [ ] Liste/Tabelle formatiert (falls relevant)
- [ ] Präzise, auf den Punkt
- [ ] Primary Keyword in Antwort

**Empfohlene Position:** {H2 Sektion}
**Aktueller Status:** ✅/⚠️

---

## Schema Markup

### Article Schema
```json
{Validiertes Schema}
```
**Status:** ✅/⚠️

### FAQ Schema
**Quelle:** `05-content-outline/faq_structured.json`
**Validierung:**
- [ ] Alle Fragen aus faq_structured.json im Artikel vorhanden
- [ ] Antworten identisch oder besser als in faq_structured.json
- [ ] Schema syntaktisch korrekt (via validator.schema.org)
- [ ] Minimum 5 Fragen erfüllt

{Falls FAQ vorhanden}
**Status:** ✅/⚠️

### HowTo Schema
{Falls Anleitung}
**Status:** ✅/⚠️

### Breadcrumb Schema
**Quelle:** `05-content-outline/seo_metadata.json`
**Status:** ✅/⚠️

---

## Mobile Optimization
- [ ] Kurze Paragraphen (<150 Wörter)
- [ ] Große Touch-Targets für Links/Buttons
- [ ] Bilder responsive
- [ ] Keine horizontalen Scrolls

---

## User Experience

### Call-to-Actions
- **Count:** {X} (Min: 2) ✅/⚠️
- **Positionen:** {Liste}
- **Klar & actionable:** ✅/⚠️

### Navigation
- [ ] Table of Contents
- [ ] Sprungmarken funktionieren
- [ ] Breadcrumbs (falls relevant)

---

## Final Score: {X}/100

**Kritische Issues:** {X}
**Warnungen:** {X}
**Empfehlungen:** {X}

**Next Steps:**
1. {Wichtigste Anpassung}
2. {Zweitwichtigste}
...
```

#### 7.2 Optimierten Artikel erstellen
**Speichere als:** `07-optimization/optimized_article.md`

**Nehme alle Anpassungen aus SEO Audit vor:**
- Title & Meta optimieren
- Keywords anpassen
- Readability verbessern
- Fehlende Links/Alt-Texts ergänzen
- Absätze aufbrechen
- Featured Snippet-Sektion optimieren

#### 7.3 SEO Checklist
**Speichere als:** `07-optimization/seo_checklist.json`

```json
{
  "keyword": "{KEYWORD}",
  "audit_date": "{ISO_DATE}",
  "checklist": {
    "keywords": {
      "primary_in_title": true,
      "primary_in_first_100": true,
      "primary_in_h2": true,
      "keyword_density_ok": true,
      "secondary_keywords_used": true,
      "lsi_keywords_used": true,
      "score": 6
    },
    "meta_tags": {
      "title_optimized": true,
      "title_length_ok": true,
      "description_optimized": true,
      "description_length_ok": true,
      "score": 4
    },
    "content": {
      "word_count_target_met": true,
      "heading_structure_ok": true,
      "paragraph_length_ok": true,
      "readability_score_ok": true,
      "score": 4
    },
    "links": {
      "internal_links_min": true,
      "external_authority_links": true,
      "anchor_text_varied": true,
      "score": 3
    },
    "media": {
      "images_sufficient": true,
      "all_alt_texts": true,
      "images_optimized": true,
      "score": 3
    },
    "technical": {
      "schema_markup": true,
      "mobile_optimized": true,
      "featured_snippet_optimized": true,
      "score": 3
    },
    "ux": {
      "ctas_present": true,
      "toc_present": true,
      "faq_present": true,
      "score": 3
    }
  },
  "total_score": 26,
  "max_score": 26,
  "percentage": 100,
  "status": "ready_to_publish"
}
```

### Success Criteria Phase 7
✅ seo_audit.md zeigt Score >90/100
✅ optimized_article.md hat alle Issues behoben
✅ seo_checklist.json ist vollständig grün
✅ Readability Score >60

---

## Phase 8: Final Output

### Ziel
Erstelle veröffentlichungsreife Dateien

### Final Deliverables

#### 8.1 Final Article (Markdown)
**Speichere als:** `08-final-output/final_article.md`

**Exakt wie optimized_article.md, aber mit:**
- Finaler Review
- Datum gesetzt
- Autor-Info ergänzt

#### 8.2 Final Article (HTML)
**Speichere als:** `08-final-output/final_article.html`

**WICHTIG - Integriere diese Dokumente:**
- ✅ `05-content-outline/seo_metadata.json` - Alle Meta-Tags im <head>
- ✅ `05-content-outline/faq_structured.json` - FAQ Schema im <head>
- ✅ `07-optimization/optimized_article.md` - Content konvertieren

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Aus seo_metadata.json → basic -->
    <title>{Meta Title aus seo_metadata.json}</title>
    <meta name="description" content="{Meta Description aus seo_metadata.json}">
    <meta name="keywords" content="{Keywords aus seo_metadata.json}">
    <link rel="canonical" href="{canonical_url aus seo_metadata.json}">
    
    <!-- Aus seo_metadata.json → technical_seo -->
    <meta name="robots" content="{robots aus seo_metadata.json}">
    <meta name="googlebot" content="{googlebot aus seo_metadata.json}">
    
    <!-- Aus seo_metadata.json → open_graph -->
    <meta property="og:title" content="{og_title aus seo_metadata.json}">
    <meta property="og:description" content="{og_description aus seo_metadata.json}">
    <meta property="og:type" content="{og_type aus seo_metadata.json}">
    <meta property="og:url" content="{og_url aus seo_metadata.json}">
    <meta property="og:image" content="{og_image aus seo_metadata.json}">
    <meta property="og:image:width" content="{og_image_width aus seo_metadata.json}">
    <meta property="og:image:height" content="{og_image_height aus seo_metadata.json}">
    
    <!-- Aus seo_metadata.json → twitter_card -->
    <meta name="twitter:card" content="{twitter_card aus seo_metadata.json}">
    <meta name="twitter:title" content="{twitter_title aus seo_metadata.json}">
    <meta name="twitter:description" content="{twitter_description aus seo_metadata.json}">
    <meta name="twitter:image" content="{twitter_image aus seo_metadata.json}">
    
    <!-- Aus seo_metadata.json → hreflang -->
    <link rel="alternate" hreflang="de" href="{hreflang.de aus seo_metadata.json}">
    <link rel="alternate" hreflang="de-at" href="{hreflang.de-at aus seo_metadata.json}">
    <link rel="alternate" hreflang="de-ch" href="{hreflang.de-ch aus seo_metadata.json}">
    
    <!-- Aus seo_metadata.json → schema_markup.article_schema -->
    <script type="application/ld+json">
    {Article Schema aus seo_metadata.json → schema_markup.article_schema}
    </script>
    
    <!-- Aus faq_structured.json → schema_markup -->
    <script type="application/ld+json">
    {FAQ Schema aus faq_structured.json → schema_markup}
    </script>
    
    <!-- Aus seo_metadata.json → schema_markup.breadcrumb_schema -->
    <script type="application/ld+json">
    {Breadcrumb Schema aus seo_metadata.json → schema_markup.breadcrumb_schema}
    </script>
</head>
<body>
    <article>
        <header>
            <h1>{Title aus seo_metadata.json → basic.title_h1}</h1>
            <div class="meta">
                <span class="author">{Autor aus seo_metadata.json → article_metadata.author.name}</span>
                <time datetime="{ISO Date aus seo_metadata.json → article_metadata.dates.published}">{Datum}</time>
                <span class="reading-time">{X} Min. Lesezeit</span>
            </div>
        </header>
        
        {Konvertierter Markdown Content aus optimized_article.md}
        
        <footer>
            <div class="author-bio">
                <h3>{Autor Name aus seo_metadata.json}</h3>
                <p>{job_title aus seo_metadata.json} - {credentials aus seo_metadata.json}</p>
            </div>
            <div class="sources">
                <h3>Quellen</h3>
                {Quellen-Liste aus sources.md}
            </div>
        </footer>
    </article>
</body>
</html>
```

#### 8.3 Metadata
**Speichere als:** `08-final-output/metadata.json`

**WICHTIG - Übernimm Werte aus:**
- ✅ `05-content-outline/seo_metadata.json` - Basis-Daten
- ✅ `07-optimization/seo_checklist.json` - Performance-Scores

```json
{
  "article": {
    "title": "{H1 aus seo_metadata.json → basic.title_h1}",
    "meta_title": "{Meta Title aus seo_metadata.json → basic.meta_title}",
    "meta_description": "{Meta Description aus seo_metadata.json → basic.meta_description}",
    "url_slug": "{slug aus seo_metadata.json → basic.url_slug}",
    "canonical_url": "{canonical_url aus seo_metadata.json → basic.canonical_url}",
    "language": "de",
    "country": "DE"
  },
  "seo": {
    "primary_keyword": "{KEYWORD aus seo_metadata.json → seo_tags.primary_keyword}",
    "secondary_keywords": ["{aus seo_metadata.json → seo_tags.secondary_keywords}"],
    "search_volume": "{aus keyword_data.json}",
    "keyword_difficulty": "{aus keyword_data.json}",
    "target_position": 1,
    "estimated_traffic": "{aus seo_metadata.json → performance_metadata.seo_targets.estimated_monthly_traffic}"
  },
  "content": {
    "word_count": "{tatsächlicher count aus final_article.md}",
    "reading_time_minutes": "{berechnet}",
    "images_count": "{aus assets_list.md}",
    "internal_links": "{aus internal_links.json}",
    "external_links": "{aus sources.md}",
    "h2_count": "{aus final_article.md gezählt}",
    "h3_count": "{aus final_article.md gezählt}"
  },
  "schema": {
    "types": ["Article", "FAQPage"],
    "author": {
      "name": "{aus seo_metadata.json → article_metadata.author.name}",
      "url": "{aus seo_metadata.json → article_metadata.author.url}"
    },
    "publisher": {
      "name": "PferdeWert.de",
      "logo": "{aus seo_metadata.json → article_metadata.publisher.logo}"
    },
    "date_published": "{ISO Date}",
    "date_modified": "{ISO Date}"
  },
  "media": {
    "hero_image": {
      "url": "{aus seo_metadata.json → open_graph.og_image}",
      "alt": "{aus seo_metadata.json → open_graph.og_image_alt}",
      "width": "{aus seo_metadata.json → open_graph.og_image_width}",
      "height": "{aus seo_metadata.json → open_graph.og_image_height}"
    },
    "og_image": "{aus seo_metadata.json → open_graph.og_image}",
    "images": "{Liste aus assets_list.md}"
  },
  "performance": {
    "target_word_count": "{aus target_metrics.json}",
    "actual_word_count": "{tatsächlich}",
    "seo_score": "{aus seo_checklist.json → percentage}",
    "readability_score": "{aus seo_audit.md}",
    "optimization_level": "high"
  },
  "publishing": {
    "status": "ready",
    "priority": "high",
    "scheduled_date": null,
    "author": "{aus seo_metadata.json → article_metadata.author.name}",
    "reviewer": null
  }
}
```

#### 8.4 Assets List
**Speichere als:** `08-final-output/assets_list.md`

```markdown
# Assets für: {KEYWORD}

## Bilder (zu beschaffen/erstellen)

### Hero Image
- **Filename:** hero-{slug}.jpg
- **Size:** 1200x630px
- **Description:** {Beschreibung}
- **Alt Text:** {Alt Text}
- **Source:** {Quelle oder "Custom"}
- **Status:** ⬜ Ausstehend / ✅ Bereit

### Content Images
1. **infographic-{slug}-1.png**
   - Size: 800x600px
   - Description: {Beschreibung}
   - Alt: {Alt}
   - Position: H2.2
   - Status: ⬜/✅

2. ...

## Custom Graphics (zu erstellen)
1. **{Grafik Name}**
   - Type: Infografik/Diagramm/Illustration
   - Description: {Was zeigt sie}
   - Specs: {Technische Details}
   - Designer: {Name}
   - Status: ⬜/✅

## Videos (optional)
1. **{Video Titel}**
   - Platform: YouTube/Vimeo
   - Length: {X Min}
   - Description: {Inhalt}
   - Embed Code: {Code}
   - Status: ⬜/✅
```

#### 8.5 Publishing Checklist
**Speichere als:** `08-final-output/publish_checklist.md`

```markdown
# Publishing Checklist: {KEYWORD}

## Pre-Publishing

### Content Review
- [ ] Artikel vollständig gelesen & geprüft
- [ ] Alle Fakten verifiziert
- [ ] Keine Rechtschreibfehler
- [ ] Alle Links funktionieren
- [ ] Alle Bilder laden
- [ ] Alt-Texte für alle Bilder

### SEO Final Check
- [ ] Meta Title optimiert (50-60 Zeichen)
- [ ] Meta Description optimiert (150-160 Zeichen)
- [ ] URL Slug SEO-friendly
- [ ] Primary Keyword in H1, ersten 100 Wörtern
- [ ] Internal Links gesetzt (min. {X})
- [ ] External Authority Links (min. {X})
- [ ] Schema Markup implementiert & validiert
- [ ] **FAQ Schema aus `faq_structured.json` korrekt integriert**
- [ ] **Alle Meta-Tags aus `seo_metadata.json` im HTML**
- [ ] Canonical URL gesetzt

### Technical
- [ ] HTML validiert (W3C Validator)
- [ ] Mobile Preview geprüft
- [ ] Page Speed OK (<3s)
- [ ] Images optimiert (WebP/Compressed)
- [ ] All assets uploaded
- [ ] 404 Links geprüft

### Content-Qualität
- [ ] Word Count: {TARGET} ±10% ✅
- [ ] Readability Score >60 ✅
- [ ] E-E-A-T Signale vorhanden
- [ ] CTAs klar & actionable
- [ ] Autor-Info & Bio ergänzt
- [ ] Datum gesetzt
- [ ] Quellen korrekt zitiert

---

## Publishing

### CMS/Platform
- [ ] Artikel in CMS hochgeladen
- [ ] Kategorien zugewiesen
- [ ] Tags gesetzt
- [ ] Featured Image gesetzt
- [ ] Excerpt/Teaser geschrieben
- [ ] Author korrekt zugewiesen

### URL & Indexierung
- [ ] URL Structure: /blog/{slug} ✅
- [ ] Canonical Tag gesetzt
- [ ] Sitemap automatisch updated
- [ ] Robots.txt erlaubt Crawling

---

## Post-Publishing (Sofort)

### Indexierung
- [ ] Google Search Console: URL Inspection
- [ ] Indexierung beantragt
- [ ] Sitemap in GSC submitted

### Internal Linking
- [ ] Von Homepage verlinkt
- [ ] Von relevanten Artikeln verlinkt (Liste aus internal_links.json)
- [ ] In Navigation/Footer (falls relevant)

### Social Media
- [ ] LinkedIn-Post geplant
- [ ] Twitter/X-Thread geplant
- [ ] Facebook (falls relevant)
- [ ] Newsletter eingeplant

---

## Post-Publishing (First 48h)

### Monitoring
- [ ] Google Analytics: Tracking funktioniert
- [ ] Search Console: Crawl-Fehler prüfen
- [ ] Page Speed: Performance messen
- [ ] Mobile Usability: Testen

### Promotion
- [ ] Email-Blast an Subscribers
- [ ] Relevant Communities (Reddit, Foren)
- [ ] Outreach für Backlinks gestartet

---

## Week 1 Follow-Up

### Performance
- [ ] Impressions in GSC prüfen
- [ ] Click-Through-Rate analysieren
- [ ] Average Position tracken
- [ ] Engagement Metrics (Time on Page, Bounce Rate)

### Optimization
- [ ] Featured Snippet captured? Ja/Nein
- [ ] Falls nein: Snippet-Optimization
- [ ] Meta Description anpassen (falls CTR niedrig)
- [ ] Internal Links ergänzen

---

## Month 1 Review

### Rankings
- [ ] Position für Primary Keyword: {Position}
- [ ] Position für Top 5 Secondary Keywords: {Positionen}
- [ ] Top 10 für: {X} Keywords
- [ ] Featured Snippets: {X}

### Traffic
- [ ] Organic Sessions: {X}
- [ ] Avg. Time on Page: {X Min}
- [ ] Bounce Rate: {X}%
- [ ] Conversions: {X}

### Actions
- [ ] Content Update (falls nötig)
- [ ] Backlink-Building fortsetzen
- [ ] Internal Linking ausbauen
- [ ] Competing gegen Top 3

---

## Backlink Strategy

### Target Sites (DR >40)
1. **{Domain}**
   - Contact: {Email}
   - Approach: {Guest Post/Resource Link/Broken Link}
   - Status: ⬜ Pitch / 📧 Sent / ✅ Live

2. ...

### Resource Pages
1. {URL}: {Relevanz}
2. ...

---

## Notes & Learnings
{Was lief gut? Was könnte besser sein? Für nächsten Artikel...}
```

#### 8.6 Performance Tracking Setup
**Speichere als:** `08-final-output/tracking_setup.json`

```json
{
  "article_url": "https://pferdewert.de/{slug}",
  "primary_keyword": "{KEYWORD}",
  "tracking": {
    "google_analytics": {
      "page_path": "/{slug}",
      "goals": [
        {
          "name": "CTA Click - Pferdewert Rechner",
          "type": "event",
          "action": "click_cta"
        },
        {
          "name": "Time on Page >3min",
          "type": "engagement"
        }
      ]
    },
    "google_search_console": {
      "url": "https://pferdewert.de/{slug}",
      "tracked_keywords": [
        "{primary}",
        "{secondary1}",
        "{secondary2}"
      ]
    },
    "rank_tracking": {
      "tool": "DataForSEO",
      "keywords": [
        {
          "keyword": "{KEYWORD}",
          "location": 2276,
          "language": "de",
          "device": "desktop"
        }
      ],
      "competitors": [
        "{competitor1.com}",
        "{competitor2.com}"
      ],
      "check_frequency": "daily"
    }
  },
  "kpis": {
    "target_position": 1,
    "target_traffic_monthly": 0,
    "target_conversions_monthly": 0,
    "target_backlinks": 10,
    "target_referring_domains": 8
  }
}
```

### Success Criteria Phase 8
✅ Alle 6 Final Documents erstellt
✅ HTML validiert
✅ Publishing Checklist vollständig
✅ Tracking Setup bereit
✅ Artikel ist publikationsreif

---

## 📊 Gesamtübersicht aller Dokumente

Nach Abschluss des Prozesses sollten folgende **35+ Dokumente** existieren:

```
SEO/SEO-CONTENT/{keyword-slug}/
│
├── 01-keyword-analysis/
│   ├── keyword_data.json
│   ├── related_keywords.json
│   ├── competitor_keywords_{domain1}.json
│   ├── competitor_keywords_{domain2}.json
│   ├── competitor_keywords_{domain3}.json
│   ├── ad_traffic_data.json
│   ├── trend_data.json
│   └── analysis_report.md
│
├── 02-serp-analysis/
│   ├── serp_overview.json
│   ├── top10_urls.json
│   ├── labs_related_keywords.json
│   └── serp_features.md
│
├── 03-competitor-analysis/
│   ├── competitor_1_content.json
│   ├── competitor_1_backlinks.json
│   ├── competitor_2_content.json
│   ├── competitor_2_backlinks.json
│   ├── competitor_3_content.json
│   ├── competitor_3_backlinks.json
│   ├── competitor_matrix.json
│   └── content_gaps.md
│
├── 04-content-strategy/
│   ├── target_metrics.json
│   └── content_brief.md
│
├── 05-content-outline/
│   ├── article_outline.md
│   ├── h2_h3_structure.json
│   ├── faq_structured.json
│   ├── faq_content.md
│   └── seo_metadata.json
│
├── 06-content-draft/
│   ├── draft_article.md
│   ├── internal_links.json
│   └── sources.md
│
├── 07-optimization/
│   ├── seo_audit.md
│   ├── optimized_article.md
│   └── seo_checklist.json
│
└── 08-final-output/
    ├── final_article.md
    ├── final_article.html
    ├── metadata.json
    ├── assets_list.md
    ├── publish_checklist.md
    └── tracking_setup.json
```

---

## 🚨 Quality Gates

Zwischen den Phasen MÜSSEN folgende Bedingungen erfüllt sein:

### Gate 1→2: Keyword Research Complete
- ✅ Search Volume >500/Monat ODER strategisch relevant
- ✅ Keyword Difficulty <70 (realistisch rankbar)
- ✅ Search Intent klar identifiziert
- ✅ Min. 50 Related Keywords gefunden
- ✅ Min. 10 Competitor Keyword Gaps identifiziert
- ✅ Trend ist steigend oder stabil (nicht stark fallend)
- ✅ Commercial Intent analysiert (wenn relevant)
- ✅ Best Publishing Time definiert (bei Saisonalität)

**Falls NICHT erfüllt:** Keyword überdenken oder anpassen

### Gate 2→3: SERP Understanding
- ✅ Top 10 URLs dokumentiert
- ✅ SERP Features identifiziert
- ✅ Featured Snippet-Opportunity erkannt
- ✅ User Intent aus SERP ableitbar
- ✅ Labs Related Keywords vs. Google Ads Keywords verglichen
- ✅ SERP-spezifische Opportunities identifiziert

### Gate 3→4: Competitive Advantage
- ✅ Top 3 vollständig analysiert
- ✅ Target Word Count definiert (basierend auf Daten)
- ✅ Min. 3 Content Gaps identifiziert
- ✅ Unique Angle gefunden

**Falls NICHT erfüllt:** Mehr Recherche oder anderes Keyword

### Gate 4→5: Strategy Clear
- ✅ Content Brief ist vollständig
- ✅ Alle Target Metrics definiert
- ✅ E-E-A-T Strategie vorhanden
- ✅ CTAs geplant

### Gate 5→6: Outline Approved
- ✅ Alle H2/H3 sind definiert
- ✅ Word Count pro Sektion realistisch
- ✅ Keywords gut verteilt
- ✅ Featured Snippet-Sektion optimiert

**Manueller Checkpoint:** Outline mit Team reviewen

### Gate 6→7: Draft Complete
- ✅ Alle Sektionen geschrieben
- ✅ Word Count im Target (±10%)
- ✅ Keine [Platzhalter] mehr im Text
- ✅ Alle Quellen dokumentiert

### Gate 7→8: Optimization Done
- ✅ SEO Score >90/100
- ✅ Readability Score >60
- ✅ Alle kritischen Issues behoben
- ✅ Checklist vollständig grün

**Manueller Checkpoint:** Final Review vor Publishing

---

## 🛠️ DataForSEO MCP Tools - Quick Reference

### Verfügbare Tools

**Phase 1 - Keyword Research (5 Tools):**

1. **dataforseo_keywords_data_google_search_volume**
   - Input: keywords[], location_code, language_code
   - Output: Search Volume, KD, CPC, Competition

2. **dataforseo_keywords_data_google_related_keywords**
   - Input: keyword, location_code, language_code, depth, limit
   - Output: Related Keywords mit Metrics

3. **dataforseo_keywords_data_google_keywords_for_site** 🆕
   - Input: target (domain), location_code, language_code, limit
   - Output: Keywords für die eine Domain rankt
   - **Nutzen:** Competitor Keyword Gaps finden

4. **dataforseo_keywords_data_google_ad_traffic_by_keywords** 🆕
   - Input: keywords[], location_code, language_code, date_from, date_to
   - Output: Ad Impressions, CPC, Competition Density
   - **Nutzen:** Commercial Intent & echte Traffic-Daten

5. **dataforseo_keywords_data_google_trends_explore** 🆕
   - Input: keywords[], location_code, language_code, date_from, date_to
   - Output: Trend-Verlauf, Saisonalität, Related Topics/Queries
   - **Nutzen:** Publishing-Timing & Content-Ideen

**Phase 2 - SERP Analysis (2 Tools):**

6. **dataforseo_serp_google_organic**
   - Input: keyword, location_code, language_code, device, depth
   - Output: SERP Results mit Rankings

7. **dataforseo_labs_google_related_keywords** 🆕
   - Input: keyword, location_code, language_code, limit
   - Output: SERP-basierte Related Keywords (echte SERP-Daten)
   - **Nutzen:** Featured Snippet Opportunities, SERP Features

**Phase 3 - Competitor Analysis (2 Tools):**

8. **dataforseo_on_page_instant_pages**
   - Input: url, enable_javascript
   - Output: On-Page Daten (Word Count, Headers, Links, etc.)

9. **dataforseo_backlinks_summary**
   - Input: target, mode
   - Output: Backlinks, Referring Domains, Authority

### Standard-Parameter
- **location_code:** 2276 (Deutschland)
- **language_code:** "de"
- **device:** "desktop"

---

## 🎯 Agent-Instruktionen

### Als Agent befolge diese Regeln:

1. **Arbeite den Prozess sequenziell ab** - keine Phase überspringen
2. **Erstelle ALLE Dokumente** - nicht nur einige
3. **Speichere exakt unter den angegebenen Pfaden**
4. **Nutze DataForSEO MCP Tools** wie beschrieben
5. **Prüfe Quality Gates** vor jeder neuen Phase
6. **Dokumentiere Entscheidungen** in den MD-Files
7. **Bei Unsicherheiten:** Conservative Schätzungen, später optimieren
8. **Timeouts:** Falls API langsam, weiter mit nächstem Schritt
9. **Fehler:** In error_log.md im Hauptordner dokumentieren
10. **Am Ende:** Erstelle summary_report.md mit allen KPIs

### Error Handling
Falls ein DataForSEO Call fehlschlägt:
1. Retry 2x mit 30s Pause
2. Falls immer noch fehler: Mock-Daten mit Platzhalter
3. In error_log.md dokumentieren
4. Nach Publishing manuell nachtragen

### Workflow-Start
```
INPUT: Keyword = "{USER_KEYWORD}"

1. Parse Keyword → Slug erstellen
2. Ordnerstruktur aufbauen
3. Phase 1 starten
4. Nach jeder Phase: Quality Gate prüfen
5. Bei Gate-Fail: Anpassen oder abbrechen
6. Bei erfolg: Summary Report erstellen
```

---

## 📈 Expected Outcomes

Nach Befolgung dieses Playbooks sollte der Artikel:

✅ **SEO-optimiert** für Platz 1-5 in 3-6 Monaten
✅ **10-20% länger** als Top-Ranking-Konkurrenz
✅ **Featured Snippet-optimiert**
✅ **E-E-A-T Signale** stark vorhanden
✅ **Mobile-first** & schnell ladend
✅ **User-zentriert** mit klaren CTAs
✅ **Datenbasiert** auf echten SERP-Analysen
✅ **Vollständig dokumentiert** für zukünftige Updates

---

## 🔄 Maintenance & Updates

### Monatlich (First 6 Months)
- Rankings tracken (DataForSEO)
- Content anpassen basierend auf GSC Queries
- Internal Links erweitern
- Neue Backlinks aufbauen

### Quartalweise
- Vollständiges Content Audit
- Konkurrenz-Analyse wiederholen
- Content erweitern/updaten
- Bilder/Grafiken refreshen

### Jährlich
- Komplettes Re-Optimization
- Statistiken aktualisieren
- Veraltete Infos entfernen
- Schema Markup prüfen

---

**Version:** 1.0
**Erstellt für:** PferdeWert.de SEO-Prozess
**Agent-Type:** Autonomous Content Creation Agent
**Tool-Requirement:** DataForSEO MCP Access

---

## 📋 Dokument-Referenzen: Wann wird was verwendet?

### Phase 5 → Phase 6 (Content Draft)
- `article_outline.md` → Struktur für Draft folgen
- `faq_content.md` → FAQ-Sektion 1:1 übernehmen
- `seo_metadata.json` → Meta Title, Keywords, Autor-Info

### Phase 5 → Phase 7 (Optimization)
- `seo_metadata.json` → Gegen alle Meta-Tags prüfen
- `faq_structured.json` → FAQ Schema validieren
- `target_metrics.json` → Performance-Ziele prüfen

### Phase 5 → Phase 8 (Final Output)
- `seo_metadata.json` → Alle Meta-Tags ins HTML integrieren
- `faq_structured.json` → FAQ Schema ins HTML <head>
- `h2_h3_structure.json` → Breadcrumb Navigation

### Phase 6 → Phase 7 (Optimization)
- `draft_article.md` → Basis für Optimierung

### Phase 7 → Phase 8 (Final Output)
- `optimized_article.md` → Final Content
- `seo_checklist.json` → Performance-Scores

### Phase 8 - Cross-Referenzen
- `metadata.json` nutzt Daten aus: seo_metadata.json, seo_checklist.json, keyword_data.json
- `final_article.html` nutzt: seo_metadata.json, faq_structured.json, optimized_article.md
- `publish_checklist.md` validiert gegen: seo_metadata.json, faq_structured.json

---

**START COMMAND:**
```
Agent, erstelle einen Platz-1-Blogartikel für Keyword: "{KEYWORD}"
Folge diesem Playbook Schritt für Schritt.
Erstelle alle 35+ Dokumente im Ordner SEO/SEO-CONTENT/{slug}/
Achte auf die Dokument-Referenzen zwischen den Phasen.
Nutze alle 9 DataForSEO MCP Tools für maximale Datenqualität.
```