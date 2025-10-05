---
argument-hint: <keyword>
description: Execute complete 6-phase SEO pipeline with 35+ deliverables with agents
allowed-tools: Task, Read, Write, Bash(mkdir:*), Bash(echo:*), mcp__dataforseo__*, firecrawl_*
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

3. **Starte 6 Sequential Sub-Agents** (jeder liest sein eigenes Phase-MD):

   **WICHTIG**: Verwende `seo-content-writer` Agent (custom agent mit DataForSEO MCP Tools)

   **Phase 1 - Keyword Research**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 1: KEYWORD RESEARCH

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-1-keyword-research.md
       2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. DataForSEO API-Calls!)
       3. Erstelle alle geforderten Deliverables
       4. Return: Kompakte Summary (max 200 Wörter) + Liste der erstellten Dateien
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
       2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. DataForSEO + Firecrawl!)
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

   **Phase 5 - On-Page SEO**:
   - Spawne Sub-Agent mit:
     - subagent_type: `seo-content-writer`
     - prompt:
       ```
       SEO PHASE 5: ON-PAGE SEO

       TARGET: '$ARGUMENTS'
       OUTPUT: SEO/SEO-CONTENT/$ARGUMENTS_SLUG/

       1. Lies: SEO/SEO-PROZESS/orchestration/phase-5-onpage-seo.md
       2. Optimiere Content aus Phase 4
       3. Erstelle Meta-Tags, Schema-Markup
       4. Return: SEO-Score + erstellte Assets
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
  3. Macht DataForSEO/Firecrawl API-Calls wenn nötig
  4. Erstellt alle Deliverables
  5. Gibt nur kompakte Summary zurück (max 200 Wörter)
- **Vorteil**: Context wird nach jeder Phase verworfen → keine Akkumulation!

### Tool-Vererbung (WICHTIG!)
- ✅ **Sub-Agents erben automatisch** alle `allowed-tools` vom Slash Command
- ✅ Command hat: `mcp__dataforseo__*`, `firecrawl_*` → Sub-Agents können diese nutzen
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
