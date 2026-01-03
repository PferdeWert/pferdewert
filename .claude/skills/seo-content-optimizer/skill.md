---
name: seo-content-optimizer
description: Analysiert und optimiert bestehende Ratgeber-Artikel durch DataForSEO-Analyse mit automatischer Implementierung. Verwenden bei "artikel optimieren" oder "ranking verbessern".
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, mcp__dataforseo__*
---

# SEO Content Optimizer - Bestehende Artikel verbessern

Analysiert und optimiert bestehende Ratgeber-Artikel auf PferdeWert.de durch DataForSEO-Analyse mit **automatischer Implementierung**.

**Purpose**: Ranking-Verbesserung für bereits publizierte Inhalte durch datengetriebene Optimierung MIT direkter Content-Umsetzung.

## When to use

- User möchte bestehenden Artikel SEO-optimieren
- User fragt "wie kann ich [article] verbessern"
- User erwähnt "ranking verbessern" oder "SEO optimieren"
- Article URL oder Datei-Pfad wird angegeben

## Prerequisites

- DataForSEO MCP server verbunden
- URL oder Dateipfad des zu optimierenden Artikels
- Target Keyword bekannt (oder wird aus Artikel extrahiert)

## Process Overview

### Phase 1-2: Initial Analysis
- Artikel einlesen (URL via `on_page_content_parsing` oder Datei via Read)
- Primary Keyword aus H1/Title extrahieren
- On-Page SEO-Score via `mcp__dataforseo__on_page_instant_pages`
- Output: `analysis/onpage-score.json`

### Phase 3-4: Rankings & Competition
- Aktuelle Rankings via `dataforseo_labs_google_ranked_keywords` (filter: rank ≤ 20)
- SERP-Analyse via `seo-serp-analysis` skill
- Competitor gap analysis (Top 3 vs. uns)
- Output: `analysis/current-rankings.json`, `analysis/competitor-gap.json`

### Phase 5-6: Keyword Opportunities
- Keyword Ideas via `dataforseo_labs_google_keyword_ideas`
- Related Keywords via `dataforseo_labs_google_related_keywords` (depth: 2)
- Filter: Volume > 100, Quick Wins (rank 11-20), LSI keywords
- Content-Qualität re-use `seo-quality-check` logic
- Output: `analysis/keyword-opportunities.json`, `analysis/content-gaps.json`

### Phase 7: Optimization Plan
**Erstelle priorisierten Plan** → `recommendations/optimization-plan.md`:
- **Priority 0: Readability Fix** (wenn Flesch <60 - MUSS ZUERST!)
- **Priority 1: Quick Wins** (Title, Meta, top 5 Keywords, Schema)
- **Priority 2: Content Expansion** (neue H2s, PAA-Fragen, Section-Erweiterungen)
- **Priority 3: E-E-A-T** (optional, nur auf Anfrage)
- Expected Impact: Ranking, Traffic, SEO Score projections

### Phase 7.5: Readability Optimization (wenn Flesch <60)

**🎯 Ziel: Flesch-Kincaid Score ≥60**

Wenn der aktuelle Score <60 ist, MUSS dieser Schritt VOR allen anderen Optimierungen erfolgen!

**Readability-Check durchführen:**
```
mcp__dataforseo__on_page_instant_pages mit URL
→ meta.content.flesch_kincaid_readability_index extrahieren
```

**Bei Score <60 - Systematische Überarbeitung:**

1. **Lange Sätze finden und kürzen:**
   - Alle Sätze >20 Wörter identifizieren
   - Aufteilen in 2-3 kürzere Sätze (Ziel: 10-15 Wörter)
   - Nebensätze als eigenständige Sätze formulieren

2. **Schachtelsätze auflösen:**
   ```
   ❌ VORHER: "Wenn du ein Pferd kaufen möchtest, das für Anfänger
   geeignet ist und über eine solide Ausbildung verfügt, solltest du
   eine AKU durchführen lassen, die von einem erfahrenen Tierarzt
   durchgeführt wird."

   ✅ NACHHER: "Du suchst ein Anfänger-Pferd mit guter Ausbildung?
   Dann brauchst du eine AKU. Ein erfahrener Tierarzt prüft das Pferd
   gründlich durch."
   ```

3. **Passive → Aktive Formulierungen:**
   ```
   ❌ "Das Pferd wird untersucht" → ✅ "Der Tierarzt untersucht das Pferd"
   ❌ "Es wird empfohlen" → ✅ "Wir empfehlen dir"
   ```

4. **Komplexe Wörter ersetzen:**
   | Komplex | Einfach |
   |---------|---------|
   | Ankaufsuntersuchung | AKU |
   | Veterinärmedizinisch | tierärztlich |
   | Qualitätskriterien | Prüfpunkte |
   | entsprechend | passend |
   | hinsichtlich | wegen / für |

5. **Listen statt Fließtext:**
   - Aufzählungen wo möglich einsetzen
   - Lange Absätze in Bulletpoints aufbrechen

6. **Fragen einbauen:**
   - "Was kostet das?" statt "Die Kosten betragen..."
   - Lockert den Text auf + verbessert Score

**Nach Überarbeitung erneut prüfen:**
- Readability-Check wiederholen
- Erst wenn Flesch ≥60: weiter mit Phase 8

### Phase 8: Automatic Implementation

**⚠️ AUTOMATIC - NO USER CONFIRMATION**

#### Step 8.1: Git Safety Backup (CRITICAL!)
```bash
# Check status, create backup commit
git add {ARTICLE_FILE_PATH}
git commit -m "backup: SEO optimization starting for '{PRIMARY_KEYWORD}'"
git branch backup/seo-optimizer-{keyword_slug}-{timestamp}
```
Save backup info → `implementation/backup-info.json`

#### Step 8.2: Implement Priority 1 & 2

**Priority 1: Quick Wins**
- Update Title & Meta in Next.js metadata export
- Integrate top 5 missing keywords in appropriate H2 sections
- Add/Update Schema Markup (FAQ + Article schemas)

**Priority 2: Content Expansion**
- Add missing H2 sections (150-200 words each)
- Expand short sections (< 150 words)
- Integrate PAA questions as H3s

**Brand Compliance Check**:
- ✅ Use "KI" not "AI"
- ✅ "2 Minuten" duration
- ✅ PAID service (never "kostenlos")

#### Step 8.3: Quality Validation
- Run `seo-quality-check` on modified article
- Compare before/after scores
- Save → `implementation/quality-comparison.json`

#### Step 8.4: Git Commit Changes
```bash
git add {ARTICLE_FILE_PATH}
git commit -m "seo: optimize '{PRIMARY_KEYWORD}' article

Implemented:
- Title & Meta optimized
- Keywords: +{X} keywords (+{Y} vol/mo)
- Content: +{Z} sections, +{A} words
- Schema: FAQ + Article updated
- Score: {before}/100 → {after}/100

Expected: Position {current} → {target}
Traffic: +{X}% projected"
```

#### Step 8.5: Implementation Report
Generate → `implementation/IMPLEMENTATION-REPORT.md`:
- Before/After comparison table
- All implemented changes
- Expected impact (rankings, traffic)
- Rollback instructions
- Monitoring plan

### Phase 9: Design Review (Automatic)

**Auto-trigger `ratgeber-builder` skill** for design validation:
```
Input: Modified article file path
Purpose: Validate design compliance, component usage, layout props
Output: Design review recommendations (if any issues found)
```

## Output Structure

```
SEO/SEO-OPTIMIZATION/{keyword-slug}/
├── analysis/
│   ├── onpage-score.json
│   ├── current-rankings.json
│   ├── competitor-gap.json
│   ├── keyword-opportunities.json
│   └── content-gaps.json
├── recommendations/
│   └── optimization-plan.md
└── implementation/
    ├── backup-info.json
    ├── quality-comparison.json
    └── IMPLEMENTATION-REPORT.md
```

## Critical Rules

**Safety First**:
- ALWAYS create Git backup BEFORE any changes
- NEVER skip backup commit
- Save rollback info for easy recovery

**Brand Compliance**:
- "KI" not "AI" in all content
- "2 Minuten" evaluation duration
- PAID service (never "kostenlos")

**Implementation Guidelines**:
- Use Edit tool for precise modifications
- Natural keyword integration (not forced)
- Maintain existing writing style and tone
- Update "Zuletzt aktualisiert" date

**Quality Standards**:
- E-E-A-T Score ≥ 7.0
- Keyword Density 0.8-1.5%
- All schemas valid JSON-LD
- Word count vs. competitors competitive

## Quality Checks

Post-implementation validation:
- ✅ SEO Score improved
- ✅ E-E-A-T Score ≥ 7.0
- ✅ Keyword density optimized
- ✅ Git backup created
- ✅ Brand compliance verified
- ✅ Design review completed

## Token Efficiency

**Total Process**: ~45k tokens
- Phase 1-7 (Analysis): ~27k tokens
- Phase 8 (Implementation): ~15k tokens
- Phase 9 (Design Review): ~3k tokens

**vs. Manual**: 95k+ tokens → **55% savings**

## Error Handling

**URL nicht erreichbar**: Try with/without www, ask user for alternative
**Keine Rankings**: Article not indexed yet, recommend waiting
**API Timeout**: Retry with increased timeout, use cached data if available

## Integration

**Uses these skills**:
- `seo-serp-analysis` - SERP competitor analysis
- `seo-quality-check` - Content quality validation
- `ratgeber-builder` - Design review (auto-triggered)

**Related to**:
- `seo-full-workflow` - For NEW content creation
- `seo-metadata-optimization` - For metadata-only optimizations

## Notes

- **Auto-Implementation**: Changes are applied automatically after analysis
- **Git Safety**: Backup commit + branch created BEFORE changes
- **Data-Driven**: All recommendations based on DataForSEO data
- **Quick Wins Focus**: Prioritize rank 11-20 → Top 10 improvements
- **Rollback Support**: Easy rollback via Git backup branch
- **Design Validation**: Automatic design review after implementation
- **Re-usable**: Run quarterly for continuous optimization
