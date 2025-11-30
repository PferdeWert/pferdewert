---
argument-hint: <keyword>
description: Execute complete 7-phase SEO pipeline with 40+ deliverables with agents (v3.0 Multi-Keyword Strategy)
allowed-tools: Task, Read, Write, Bash(mkdir:*), Bash(echo:*), mcp__dataforseo__*
---

Du bist SEO Pipeline Coordinator für PferdeWert.de.

**Target Keyword**: "$ARGUMENTS"

## 🚨 CRITICAL: CONTEXT-BUDGET PROTECTION
**DU (MAIN AGENT) LIEST NIEMALS DIE PHASE-MD DATEIEN!**
- **DEINE Rolle**: Orchestration, Todo-Tracking, Agent-Spawning
- **SUB-AGENT Rolle**: Liest Phase-MD, führt Phase aus, gibt nur Summary zurück
- **Warum**: Wenn DU die Phase-MDs liest, füllt sich dein Context mit 60k+ tokens über 6 Phasen
- **Lösung**: Jeder Sub-Agent liest sein eigenes Phase-MD → du kriegst nur kompakte Summaries

## WORKFLOW START

1. **Erstelle Projekt-Ordner**
   ```bash
   # Erstelle keyword_slug (lowercase, replace spaces/umlauts)
   # Example: "Pferd kaufen Tipps" → "pferd-kaufen-tipps"

   # Erstelle Hauptordner
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG"

   # Erstelle Unterordner (separate commands für Zuverlässigkeit)
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research"
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG/planning"
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG/content"
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG/seo"
   mkdir -p "SEO/SEO-CONTENT/$ARGUMENTS_SLUG/quality"
   ```

2. **Konvertiere Keyword zu Slug**
   ```
   $ARGUMENTS_SLUG = $ARGUMENTS in lowercase mit:
   - Spaces → Hyphens
   - ä→ae, ö→oe, ü→ue, ß→ss
   - Beispiel: "Pferd kaufen Tipps" → "pferd-kaufen-tipps"
   ```

3. **Starte 8 Sequential Sub-Agents** (jeder liest sein eigenes Phase-MD):

   **WICHTIG**: Verwende `seo-content-writer` Agent (custom agent mit DataForSEO MCP Tools)

   **v3.0 Multi-Keyword Strategy**: Phase 1 wurde in 3 Teile aufgeteilt (1A, 1B, 1C) um mehr Keywords zu erfassen.
   Ziel: 80 Keywords statt 20 → 15-25+ Top 10 Rankings pro Artikel.

   **Phase 1A - Data Collection**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 1A: DATA COLLECTION for '$ARGUMENTS'

       STEP 1: Create folder
       mkdir -p SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research

       STEP 2: Execute these 3 DataForSEO API calls IN PARALLEL:

       Call 1 - mcp__dataforseo__dataforseo_labs_google_related_keywords:
       {
         "keyword": "$ARGUMENTS",
         "location_name": "Germany",
         "language_code": "de",
         "depth": 2,
         "limit": 40
       }

       Call 2 - mcp__dataforseo__dataforseo_labs_google_keyword_ideas:
       {
         "keywords": ["$ARGUMENTS"],
         "location_name": "Germany",
         "language_code": "de",
         "limit": 30
       }

       Call 3 - mcp__dataforseo__dataforseo_labs_google_keyword_overview:
       {
         "keywords": ["$ARGUMENTS"],
         "location_name": "Germany",
         "language_code": "de"
       }

       STEP 3: Save results to:
       - SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research/raw-api-data.json
       - SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research/phase-1a-summary.md

       STEP 4: Return summary:
       "Phase 1A ✅ | API Calls: Related={count}, Ideas={count}, Overview SV={volume} | Files: 2"
       ```

   **Phase 1B - Keyword Analysis (v3.0 - Extended)**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 1B: KEYWORD ANALYSIS (v3.0) for '$ARGUMENTS'

       LIES ZUERST: SEO/SEO-PROZESS/orchestration/phase-1b-keyword-analysis.md

       WICHTIGE ÄNDERUNGEN v3.0:
       - Similarity threshold: 30% (nicht 40%)
       - Keyword limit: 50 (nicht 20)
       - Question word bonus: +0.5 score für wie/was/warum

       STEP 1: Load data from Phase 1A
       STEP 2: Score keywords mit v3.0 Formel (siehe Phase-MD)
       STEP 3: Cluster by intent
       STEP 4: Select TOP 50 keywords (nicht 20!)
       STEP 5: Save results
       STEP 6: Return summary:
       "Phase 1B ✅ (v3.0) | Keywords: {total} analyzed, Top 50 selected | Clusters: Info={n}, Commercial={n}, LT={n}, General={n} | Stats: SV={avg}, CPC={avg} | Files: 2"
       ```

   **Phase 1C - Competitor Keyword Analysis (NEW in v3.0)**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 1C: COMPETITOR KEYWORD ANALYSIS for '$ARGUMENTS'

       LIES ZUERST: SEO/SEO-PROZESS/orchestration/phase-1c-competitor-keywords.md

       ZIEL: Finde 30 zusätzliche Keywords die Wettbewerber bereits erfolgreich ranken.

       STEP 1: Get SERP results für '$ARGUMENTS' (Top 10)
       mcp__dataforseo__serp_organic_live_advanced:
       {
         "keyword": "$ARGUMENTS",
         "location_name": "Germany",
         "language_code": "de",
         "depth": 10
       }

       STEP 2: Für Top 3 Competitors (außer pferdewert.de):
       mcp__dataforseo__dataforseo_labs_google_ranked_keywords:
       {
         "target": "{competitor_domain}",
         "location_name": "Germany",
         "language_code": "de",
         "limit": 50,
         "filters": [["ranked_serp_element.serp_item.rank_group", "<=", 10]]
       }

       STEP 3: Filter & merge mit Phase 1B keywords
       STEP 4: Save to competitor-keywords.json + all-keywords-merged.json
       STEP 5: Return summary:
       "Phase 1C ✅ | Competitors: 3 analyzed | New keywords: 30 | Total merged: 80 | Files: 3"
       ```

   **Phase 2 - SERP Analysis**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 2: SERP ANALYSIS

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-2-serp-analysis.md
       2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. DataForSEO!)
       3. Nutze all-keywords-merged.json aus Phase 1C (80 Keywords!)
       4. Return: Kompakte Summary + Liste der erstellten Dateien
       ```

   **Phase 3 - Outline Creation**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 3: OUTLINE CREATION

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-3-outline.md
       2. Befolge ALLE Instruktionen
       3. Nutze Ergebnisse aus Phase 1+2
       4. Return: Kompakte Summary + erstellte Dateien
       ```

   **Phase 4 - Content Writing**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 4: CONTENT WRITING

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-4-content.md
       2. Nutze Outline aus Phase 3
       3. Schreibe 2000-2500 Wörter Ratgeber-Content
       4. Return: Kompakte Summary + Word Count
       ```

   **Phase 5 - On-Page SEO (inkl. DE + AT + CH Lokalisierung)**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 5: ON-PAGE SEO (DE + AT + CH Lokalisierung)

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-5-onpage-seo.md
       2. Lies: SEO/SEO-PROZESS/orchestration/phase-5a-metadata.md (WICHTIG: DE + AT + CH Lokalisierung!)
       3. Optimiere Content aus Phase 4
       4. Erstelle seo-metadata.json mit ALLEN DREI Markt-Varianten (siehe Struktur unten)
       5. Erstelle Schema-Markup (schema-faq.json)
       6. Erstelle internal-linking.json
       7. Return: SEO-Score + erstellte Assets

       🚨 KRITISCH: seo-metadata.json STRUKTUR
       Die Datei MUSS separate "de", "at" und "ch" Objekte enthalten:

       {
         "phase": "5A",
         "primary_keyword": "$ARGUMENTS",
         "timestamp": "ISO-8601",
         "de": {
           "metadata": {
             "title": "SEO-optimierter Titel (50-60 Zeichen)",
             "description": "Meta-Description (150-160 Zeichen)",
             "keywords": "komma,separierte,keywords",
             "canonical_url": "https://pferdewert.de/pferde-ratgeber/{slug}",
             "locale": "de_DE"
           },
           "open_graph": { ... },
           "twitter_card": { ... }
         },
         "at": {
           "metadata": {
             "title": "Angepasster AT-Titel (z.B. '... in Österreich' wenn geografisch relevant)",
             "description": "AT-spezifische Description (Österreich-Bezug, ggf. angepasste Begriffe)",
             "keywords": "komma,separierte,keywords",
             "canonical_url": "https://pferdewert.at/pferde-ratgeber/{slug}",
             "locale": "de_AT"
           },
           "open_graph": { ... },
           "twitter_card": { ... }
         },
         "ch": {
           "metadata": {
             "title": "Angepasster CH-Titel (z.B. '... in der Schweiz' wenn geografisch relevant)",
             "description": "CH-spezifische Description (Schweiz-Bezug, ggf. CHF statt €, Helvetismen)",
             "keywords": "komma,separierte,keywords",
             "canonical_url": "https://pferdewert.ch/pferde-ratgeber/{slug}",
             "locale": "de_CH"
           },
           "open_graph": { ... },
           "twitter_card": { ... }
         },
         "hreflang": {
           "de": "https://pferdewert.de/pferde-ratgeber/{slug}",
           "de-AT": "https://pferdewert.at/pferde-ratgeber/{slug}",
           "de-CH": "https://pferdewert.ch/pferde-ratgeber/{slug}",
           "x-default": "https://pferdewert.de/pferde-ratgeber/{slug}"
         }
       }

       LOKALISIERUNGS-REGELN (DOMAIN-BASIERT):
       - AT Title: Bei geografisch relevantem Content → "... in Österreich" anhängen
       - AT Description: Österreich-Bezug einbauen, regionale Begriffe anpassen
       - CH Title: Bei geografisch relevantem Content → "... in der Schweiz" anhängen
       - CH Description: Schweiz-Bezug einbauen, CHF statt € erwähnen wenn preisrelevant, Helvetismen nutzen
       - Canonical URLs: DE → pferdewert.de/..., AT → pferdewert.at/..., CH → pferdewert.ch/... (SEPARATE DOMAINS!)
       - hreflang: de → .de Domain, de-AT → .at Domain, de-CH → .ch Domain, x-default → .de Domain
       - og:locale: de_DE für DE, de_AT für AT, de_CH für CH
       ```

   **Phase 6 - Quality Check**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 6: QUALITY CHECK & FINAL VALIDATION (v2.1)

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-6-quality-check.md
       2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. File Reads + Writes!)
       3. Erstelle alle geforderten Deliverables (5 Dateien in quality/ + 1 in content/)
       4. Return: Kompakte Summary (max 200 Wörter) + Liste der erstellten Dateien

       WICHTIG:
       - Du liest SELBST alle Input-Dateien (siehe Phase-MD Section "INPUT FILES")
       - Du schreibst SELBST alle Output-Dateien (siehe Phase-MD Section "FILE OPERATIONS")
       - Main Agent bekommt NUR deine Summary, KEINE Raw Data!
       ```

4. **Final Summary** (nach Phase 6):
   ```
   ✅ Pipeline completed! (v3.0 Multi-Keyword Strategy)
   📁 Output: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/
   📊 E-E-A-T Score: {score}/10
   📄 Word Count: {count} Wörter
   🔑 Keywords: 80 (50 own + 30 competitor)
   🎯 Expected Top 10 Rankings: 15-25+
   🎯 Publication-Ready: {yes/no}
   ```

## DELEGATION PATTERN (UPDATED 2025-11-30 v3.0)

### Main Agent (DU)
- **Rolle**: Orchestration ONLY
- **Tasks**:
  1. Erstelle Ordner-Struktur via separate `mkdir -p` commands
  2. Spawne 8 Sub-Agents sequenziell (1A, 1B, 1C, 2, 3, 4, 5, 6)
  3. Tracke Todos via `TodoWrite`
  4. Sammle kompakte Summaries (je ~200 Wörter)
- **VERBOTEN**: NIEMALS Phase-MDs lesen (würde 60k+ tokens addieren!)

### Sub-Agent (general-purpose)
- **Rolle**: Phase-Execution
- **Tool-Zugriff**: Automatisch geerbt via `allowed-tools` vom Command (inkl. MCP tools)
- **Tasks pro Phase**:
  1. Liest sein eigenes Phase-MD (z.B. `phase-1-keyword-research.md`)
  2. Befolgt ALLE Instruktionen
  3. Macht DataForSEO API-Calls wenn nötig
  4. Erstellt alle Deliverables
  5. Gibt nur kompakte Summary zurück (max 200 Wörter)
- **Vorteil**: Context wird nach jeder Phase verworfen → keine Akkumulation!

### Tool-Vererbung (WICHTIG!)
- ✅ **Sub-Agents erben automatisch** alle `allowed-tools` vom Slash Command
- ✅ Command hat: `mcp__dataforseo__*` → Sub-Agents können diese nutzen
- ❌ **Keine manuelle Tool-Deklaration nötig** im Prompt (nur zur Dokumentation)
- ✅ `general-purpose` Agent hat `tools: *` → vollen MCP-Zugriff

### Context-Budget-Vergleich
**❌ Alte Methode**: Main Agent liest Phase-MDs
- 6 Phasen × 10k tokens Phase-MD = 60k tokens
- + 6 × 20k tokens Results = 120k tokens
- **TOTAL**: ~180k tokens → OVERFLOW!

**✅ Neue Methode**: Sub-Agents lesen Phase-MDs
- 8 Phasen × 0.2k Summary = 1.6k tokens
- Main Agent Context bleibt minimal (~2k tokens)
- **TOTAL**: ~4k tokens → 97% Einsparung!

---

## v3.0 MULTI-KEYWORD STRATEGY (2025-11-30)

### Problem (vorher)
- Nur 20 Keywords pro Artikel
- 40% Similarity threshold = zu restriktiv
- Keine Competitor-Analyse
- **Ergebnis**: 3-5 Keywords in Top 10

### Lösung (jetzt)
- 80 Keywords pro Artikel (50 own + 30 competitor)
- 30% Similarity threshold = mehr Variationen
- Neue Phase 1C: Competitor Keyword Analysis
- **Ergebnis erwartet**: 15-25+ Keywords in Top 10

### Änderungen im Detail
| Phase | Alt | Neu |
|-------|-----|-----|
| 1A Data | 35 keywords | 70 keywords |
| 1B Analysis | Top 20, 40% sim | Top 50, 30% sim |
| 1C Competitor | - | NEW: 30 keywords |
| Total | 20 keywords | 80 keywords |

**Los geht's mit Phase 1A Sub-Agent!**
