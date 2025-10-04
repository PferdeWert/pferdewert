---
argument-hint: <keyword>
description: Execute complete 6-phase SEO pipeline with 35+ deliverables with agents
allowed-tools: Task, Read, Write, Bash(mkdir:*), mcp__dataforseo__*, firecrawl
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
   mkdir -p "SEO/SEO-CONTENT/{keyword-slug}/{research,planning,content,seo,quality}"
   ```

2. **Definiere Keyword-Slug**
   ```
   keyword_slug = keyword.lower().replace(' ', '-').replace('ä','ae').replace('ö','oe').replace('ü','ue').replace('ß','ss')
   ```

3. **Starte 6 Sequential Sub-Agents** (jeder liest sein eigenes Phase-MD):

   **Phase 1 - Keyword Research**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-1-keyword-research.md
   2. Befolge ALLE Instruktionen aus dem Phase-MD
   3. Erstelle alle geforderten Deliverables
   4. Return: Kompakte Summary (max 200 Wörter) + Liste der erstellten Dateien"
   ```

   **Phase 2 - SERP Analysis**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-2-serp-analysis.md
   2. Befolge ALLE Instruktionen aus dem Phase-MD
   3. Nutze Ergebnisse aus Phase 1 (im Output-Ordner)
   4. Return: Kompakte Summary + Liste der erstellten Dateien"
   ```

   **Phase 3 - Outline Creation**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-3-outline.md
   2. Befolge ALLE Instruktionen
   3. Nutze Ergebnisse aus Phase 1+2
   4. Return: Kompakte Summary + erstellte Dateien"
   ```

   **Phase 4 - Content Writing**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-4-content.md
   2. Nutze Outline aus Phase 3
   3. Schreibe 2000-2500 Wörter Ratgeber-Content
   4. Return: Kompakte Summary + Word Count"
   ```

   **Phase 5 - On-Page SEO**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-5-onpage-seo.md
   2. Optimiere Content aus Phase 4
   3. Erstelle Meta-Tags, Schema-Markup
   4. Return: SEO-Score + erstellte Assets"
   ```

   **Phase 6 - Quality Check**:
   ```
   Task(seo-content-writer):
   "TARGET: '{keyword}'
   OUTPUT: SEO/SEO-CONTENT/{keyword_slug}/

   1. Lies: SEO/SEO-PROZESS/orchestration/phase-6-quality-check.md
   2. Validiere alle Deliverables aus Phase 1-5
   3. Erstelle E-E-A-T Quality Report
   4. Return: Final Score (Ziel: ≥7/10) + Quality Report Path"
   ```

4. **Final Summary** (nach Phase 6):
   ```
   ✅ Pipeline completed!
   📁 Output: SEO/SEO-CONTENT/{keyword_slug}/
   📊 E-E-A-T Score: {score}/10
   📄 Word Count: {count} Wörter
   🎯 Publication-Ready: {yes/no}
   ```

## DELEGATION PATTERN (KRITISCH!)
- **DU (Main Agent)**:
  - Erstelle Ordner
  - Spawne 6 Sub-Agents sequenziell
  - Tracke Todos
  - **LESE NIEMALS DIE PHASE-MD DATEIEN!**

- **Sub-Agent (seo-content-writer)**:
  - Liest sein eigenes Phase-MD
  - Führt Phase aus
  - Gibt nur kompakte Summary zurück (max 200 Wörter)
  - **Verhindert Context-Overflow beim Main Agent**

**Los geht's mit Phase 1 Sub-Agent!**
