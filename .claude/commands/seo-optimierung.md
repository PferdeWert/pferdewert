---
argument-hint: <article-slug or path>
description: SEO-Optimierung für existierende Ratgeber-Artikel mit KI-Analyse
allowed-tools: Task, Read, Write, Edit, Bash(mkdir:*), mcp__dataforseo__*, mcp__firecrawl__*
---

Du bist SEO Content Optimizer für PferdeWert.de.

**Target Article**: "$ARGUMENTS"

## 🎯 ZIEL
Analysiere und optimiere einen existierenden Ratgeber-Artikel für bessere SEO-Performance.

## 🚨 CRITICAL RULES
- **Use "KI" not "AI"**: German market prefers "KI" (Künstliche Intelligenz)
- **NEVER use "kostenlos" / "free"**: This is a PAID service
- **Evaluation Duration is ALWAYS "2 Minuten"**: NEVER use "3 Minuten"
- **Ratgeber Base Path**: `/pferde-ratgeber/` - NEVER use `/ratgeber/`

## WORKFLOW

### 1. ARTIKEL IDENTIFIZIEREN
```bash
# Wenn $ARGUMENTS ein slug ist (z.B. "pferd-kaufen-tipps"):
ARTICLE_PATH="frontend/pages/pferde-ratgeber/$ARGUMENTS.tsx"

# Wenn $ARGUMENTS ein path ist (z.B. "frontend/pages/..."):
ARTICLE_PATH="$ARGUMENTS"

# Prüfe ob Datei existiert
if [ ! -f "$ARTICLE_PATH" ]; then
  echo "❌ Artikel nicht gefunden: $ARTICLE_PATH"
  echo "💡 Tipp: Verwende den Article-Slug oder den vollständigen Pfad"
  exit 1
fi
```

### 2. ARTIKEL ANALYSIEREN
Spawne einen Sub-Agent mit:
- subagent_type: `seo-content-writer`
- prompt:
  ```
  SEO CONTENT OPTIMIZATION PHASE 1: ANALYSIS

  TARGET: $ARTICLE_PATH

  STEP 1: Read Article File
  - Load the complete TSX/MDX file
  - Extract: title, meta description, keywords, content structure
  - Extract: all H1-H6 headings
  - Extract: internal/external links
  - Count: word count, keyword density

  STEP 2: SEO-Audit via DataForSEO
  Call mcp__dataforseo__on_page_instant_pages with article URL:
  {
    "url": "https://pferdewert.de/pferde-ratgeber/$ARTICLE_SLUG",
    "enable_javascript": true
  }

  STEP 3: Competitor Analysis
  - Extract main keyword from article
  - Call mcp__dataforseo__serp_organic_live_advanced:
    {
      "keyword": "$MAIN_KEYWORD",
      "location_name": "Germany",
      "language_code": "de",
      "depth": 10
    }
  - Scrape top 3 competitors with Firecrawl:
    mcp__firecrawl__firecrawl_scrape for each top result

  STEP 4: Gap Analysis
  - Compare our content vs competitors:
    - Missing topics/sections
    - Keyword gaps (keywords competitors rank for, we don't)
    - Content depth (word count, detail level)
    - Internal linking opportunities

  STEP 5: Hub-Spoke-Analysis
  Read: SEO/HUB-SPOKE-STRATEGY.md

  - Detect article type (hub/spoke) based on:
    * Word count (>2500 = hub, <2500 = spoke)
    * Keyword type (broad = hub, long-tail = spoke)
    * Outgoing links (5+ = hub, 1-3 = spoke)

  - If SPOKE:
    * Find related hub article (semantic match)
    * Check duplicate content overlap (<30% required)
    * Check hub links (min 2 required: first paragraph + end)
    * Check cross-spoke links (min 1 recommended)

  - If HUB:
    * Find all related spoke articles
    * Check spoke links (min 3 required)
    * Calculate hub-authority-score:
      incoming_spoke_links * 2.0 +
      outgoing_spoke_links * 1.0 +
      cross_spoke_mentions * 0.5

  Save to: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/hub-spoke-analysis.json

  STEP 6: Create Analysis Report
  Save to: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/analysis-report.md

  Include:
  - Current SEO Score (0-100)
  - Article Type (Hub/Spoke)
  - Hub-Spoke-Status (linking, duplicate content)
  - Main Issues (Top 5)
  - Competitor Comparison
  - Keyword Gaps
  - Improvement Potential

  Return: Summary with SEO score + article type + hub-spoke-status + top 3 issues
  ```

### 3. OPTIMIERUNGSPLAN ERSTELLEN
Spawne einen Sub-Agent mit:
- subagent_type: `seo-content-writer`
- prompt:
  ```
  SEO CONTENT OPTIMIZATION PHASE 2: OPTIMIZATION PLAN

  STEP 1: Read Analysis Report
  Load: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/analysis-report.md

  STEP 2: Create Prioritized Action Plan
  Categories:
  1. Quick Wins (0-2h, high impact)
     - Meta description optimization
     - Title tag optimization
     - Missing alt texts
     - Internal linking

  2. Content Improvements (2-5h, medium impact)
     - Add missing sections
     - Expand thin content
     - Keyword optimization
     - FAQ/Schema markup

  3. Strategic Enhancements (5+ h, long-term)
     - Comprehensive content rewrite
     - New sections
     - Multimedia content
     - Advanced schema

  STEP 3: Calculate Impact Scores
  For each action:
  - SEO Impact: 1-10
  - Effort: 1-10
  - Priority: Impact / Effort ratio

  STEP 4: Generate Optimization Plan
  Save to: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/optimization-plan.md

  Include:
  - Top 10 prioritized actions
  - Estimated time per action
  - Expected SEO impact
  - Implementation instructions

  Return: Summary with top 3 quick wins
  ```

### 4. OPTIMIERUNGEN DURCHFÜHREN
Spawne einen Sub-Agent mit:
- subagent_type: `pferdewert-frontend-dev`
- prompt:
  ```
  SEO CONTENT OPTIMIZATION PHASE 3: IMPLEMENTATION

  STEP 1: Load Optimization Plan
  Read: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/optimization-plan.md

  STEP 2: Implement Quick Wins
  - Update meta description (optimize for CTR + keyword)
  - Update title tag (include main keyword, max 60 chars)
  - Add/optimize alt texts for all images
  - Add FAQ schema if FAQ section exists

  STEP 3: Fix Hub-Spoke-Linking
  Read: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/hub-spoke-analysis.json

  IF article is SPOKE:
    - Add hub link to first paragraph (if missing):
      "In unserem umfassenden <Link href=\"/pferde-ratgeber/{hub-slug}\">{hub-title}</Link> findest du alle Basics zum Thema."

    - Add hub link to conclusion/end (if missing):
      "→ Zurück zum <Link href=\"/pferde-ratgeber/{hub-slug}\">kompletten {hub-title}</Link>"

    - Add 1-2 cross-spoke links in relevant sections (semantic match)

    - Check duplicate content: If overlap >30%, rewrite overlapping paragraphs with unique angle

  IF article is HUB:
    - Add links to all related spoke articles (min 3)
    - Place spoke links in relevant H2 sections (contextual)
    - Add "Weitere Artikel" section at end with remaining spokes
    - Ensure descriptive anchor texts (include keywords)

  STEP 4: Apply Changes to Article
  Use Edit tool to update: $ARTICLE_PATH

  STEP 5: Verify Changes
  - Check TypeScript compilation
  - Check ESLint (no new errors)
  - Verify no Fast Refresh loops

  STEP 6: Create Change Log
  Save to: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/changes-applied.md

  Return: Summary with changes applied + new estimated SEO score
  ```

### 5. FINAL REPORT
```markdown
✅ SEO-Optimierung abgeschlossen!

📁 **Artikel**: $ARTICLE_PATH
📊 **SEO Score**: {before} → {after} (+{delta} points)
⚡ **Quick Wins Applied**: {count}
📝 **Changes**: See SEO/OPTIMIZATIONS/$ARTICLE_SLUG/changes-applied.md
🎯 **Next Steps**: See SEO/OPTIMIZATIONS/$ARTICLE_SLUG/optimization-plan.md

**Top Improvements**:
1. {improvement_1}
2. {improvement_2}
3. {improvement_3}
```

## CONTEXT-BUDGET PROTECTION
- Main Agent (DU): Orchestriert nur, liest keine großen Dateien
- Sub-Agents: Lesen Files, führen Analysis aus, geben nur Summary zurück
- Pro Phase: Maximal 200 Wörter Summary

## ERROR HANDLING
- Article not found → Liste verfügbare Ratgeber-Artikel
- No DataForSEO results → Use manual SERP analysis
- Optimization fails → Create detailed error report with recommendations

**Los geht's mit der Optimierung!**
