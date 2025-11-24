---
argument-hint: <keyword>
description: Execute complete 6-phase SEO pipeline with 35+ deliverables with agents
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

3. **Starte 7 Sequential Sub-Agents** (jeder liest sein eigenes Phase-MD):

   **WICHTIG**: Verwende `seo-content-writer` Agent (custom agent mit DataForSEO MCP Tools)

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
         "depth": 1,
         "limit": 20
       }

       Call 2 - mcp__dataforseo__dataforseo_labs_google_keyword_ideas:
       {
         "keywords": ["$ARGUMENTS"],
         "location_name": "Germany",
         "language_code": "de",
         "limit": 15
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

   **Phase 1B - Keyword Analysis**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 1B: KEYWORD ANALYSIS for '$ARGUMENTS'

       STEP 1: Load data
       Read SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research/raw-api-data.json
       Extract all keywords from related_keywords, keyword_ideas, keyword_overview

       STEP 2: Score keywords using Python (executeCode)
       Calculate relevance_score = (SV/1000*0.4) + (CPC*10*0.3) + (similarity*0.3*10)
       Sort by score DESC

       STEP 3: Cluster by intent (executeCode)
       - Informational: wie/was/warum/ratgeber/tipps
       - Commercial: kaufen/verkaufen/preis/kosten
       - Long-Tail: word_count > 5
       - General: rest

       STEP 4: Select top 20 with cluster diversity

       STEP 5: Save results to:
       - SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research/keyword-analysis.json
       - SEO/SEO-CONTENT/$ARGUMENTS_SLUG/research/phase-1b-summary.md

       STEP 6: Return summary:
       "Phase 1B ✅ | Keywords: {total} analyzed, Top 20 selected | Clusters: Info={n}, Commercial={n}, LT={n}, General={n} | Stats: SV={avg}, CPC={avg} | Files: 2"
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
       3. Nutze Ergebnisse aus Phase 1 (im Output-Ordner)
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

   **Phase 5 - On-Page SEO (inkl. DE + AT Lokalisierung)**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 5: ON-PAGE SEO (DE + AT Lokalisierung)

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-5-onpage-seo.md
       2. Lies: SEO/SEO-PROZESS/orchestration/phase-5a-metadata.md (WICHTIG: DE + AT Lokalisierung!)
       3. Optimiere Content aus Phase 4
       4. Erstelle seo-metadata.json mit BEIDEN Markt-Varianten (siehe Struktur unten)
       5. Erstelle Schema-Markup (schema-faq.json)
       6. Erstelle internal-linking.json
       7. Return: SEO-Score + erstellte Assets

       🚨 KRITISCH: seo-metadata.json STRUKTUR
       Die Datei MUSS separate "de" und "at" Objekte enthalten:

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
             "canonical_url": "https://pferdewert.de/at/pferde-ratgeber/{slug}",
             "locale": "de_AT"
           },
           "open_graph": { ... },
           "twitter_card": { ... }
         },
         "hreflang": {
           "de-de": "https://pferdewert.de/pferde-ratgeber/{slug}",
           "de-at": "https://pferdewert.de/at/pferde-ratgeber/{slug}",
           "x-default": "https://pferdewert.de/pferde-ratgeber/{slug}"
         }
       }

       LOKALISIERUNGS-REGELN:
       - AT Title: Bei geografisch relevantem Content → "... in Österreich" anhängen
       - AT Description: Österreich-Bezug einbauen, regionale Begriffe anpassen
       - Canonical URLs: DE → /pferde-ratgeber/{slug}, AT → /at/pferde-ratgeber/{slug}
       - hreflang: Beide Versionen MÜSSEN aufeinander verweisen + x-default
       - og:locale: de_DE für DE, de_AT für AT
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
   ✅ Pipeline completed!
   📁 Output: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/
   📊 E-E-A-T Score: {score}/10
   📄 Word Count: {count} Wörter
   🎯 Publication-Ready: {yes/no}
   ```

## DELEGATION PATTERN (FIXED 2025-01-05)

### Main Agent (DU)
- **Rolle**: Orchestration ONLY
- **Tasks**:
  1. Erstelle Ordner-Struktur via separate `mkdir -p` commands
  2. Spawne 6 Sub-Agents sequenziell (`general-purpose` type)
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
- 6 Phasen × 0.2k Summary = 1.2k tokens
- Main Agent Context bleibt minimal (~2k tokens)
- **TOTAL**: ~3k tokens → 98% Einsparung!

**Los geht's mit Phase 1 Sub-Agent!**
