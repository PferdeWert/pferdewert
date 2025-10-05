# Phase 4: Content Creation (3-Phase Split)

**Token Budget**: ~700 tokens (Phase 4A: ~200, 4B: ~400, 4C: ~100)

---

## Phase 4A: Content-Brief Consolidation

**Ziel**: Konsolidiere Phase 1-3 Outputs in ein einziges Content-Brief JSON (Single Source of Truth).

**Sub-Agent Task** (seo-content-writer):
```
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

1. Lies folgende Dateien:
   - research/keyword-analysis.json (Phase 1 Output)
   - research/serp-analysis.json (Phase 2 Output)
   - planning/content-outline.json (Phase 3 Output)

2. Lies Template:
   - SEO/SEO-PROZESS/templates/content-brief-template.json

3. Konsolidiere Daten in einheitliches Content-Brief:
   - meta: primaryKeyword, slug, createdAt, phase
   - keyword: primary (term, searchVolume, difficulty, searchIntent), secondary[], longtail[]
   - contentStrategy: targetWordCount (aus word_count_data), primaryKeywordDensity, tone, brandVoice
   - outline: h1, metaTitle, metaDescription, sections[] (aus content-outline.json)
   - contentRequirements.eeat: experienceSnippets[], expertiseCredentials[], authoritySignals[], trustElements[] (aus serp-analysis.json)
   - contentRequirements.semanticTopics: [] (aus keyword-analysis.json supporting_keywords)
   - contentRequirements.mandatoryElements: internalLinks.min=3, externalSources.min=2, visuals.min=1
   - serpInsights: topCompetitors[], contentGaps[], paaQuestions[], uniqueAngles[] (aus serp-analysis.json)
   - qualityGates: wordCount (min/target/max aus word_count_data), keywordDensity, semanticCoverage, eeatScore, internalLinks

4. Erstelle Datei:
   - planning/content-brief.json (vollständiges konsolidiertes JSON)

5. Return: "Content-Brief created: {file_count} Dateien gelesen, 1 Brief erstellt"
```

### Quality Gate Phase 4A

✅ **content-brief.json existiert** im planning/ Ordner
✅ **Alle Pflichtfelder befüllt** (keyword.primary, contentStrategy, outline.h1, qualityGates)
✅ **Word Count Target gesetzt** (aus word_count_data oder Fallback 2000-3500)
❌ **Wenn Felder fehlen** → Retry mit expliziter Aufforderung fehlende Daten zu ergänzen

---

## Phase 4B: Content Writing

**Ziel**: Schreibe 2000-2500 Wörter Rank-1 Content basierend auf Content-Brief.

**Sub-Agent Task** (seo-content-writer):
```
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

1. Lies Content-Brief:
   - planning/content-brief.json (Single Source of Truth)

2. Lies Methodology Reference (für Beispiele):
   - SEO/SEO-PROZESS/methodology/content-writing-examples.md
   - SEO/pferdewert-brand-language.md

3. Schreibe vollständigen Artikel:
   - Nutze outline.sections[] als Struktur
   - Integriere keyword.primary, secondary, longtail natürlich
   - Verwende contentRequirements.eeat.experienceSnippets[] für E-E-A-T Signale
   - Beantworte serpInsights.paaQuestions[] im FAQ-Bereich
   - Implementiere contentRequirements.mandatoryElements (min 3 interne Links, min 2 externe Quellen)
   - Befolge contentStrategy.tone: "Du-Ansprache, vertrauensvoll, praxisorientiert"
   - Orientiere dich an Beispielen aus content-writing-examples.md (Struktur, E-E-A-T Integration, Ton)

4. Erstelle Datei:
   - content/article-draft.md (2000-2500 Wörter, Markdown-formatiert)

5. OUTPUT FORMAT (Summary für Main-Agent):
   Return kompakte Summary:
   - Word Count: {actual_count}
   - Primary Keyword Density: {density}%
   - E-E-A-T Signals: {count}
   - Internal Links: {count}
   - FAQ Questions: {count}
   - File: content/article-draft.md
```

**IMPORTANT**: Sub-Agent soll content-writing-examples.md **referenzieren**, NICHT im Prompt wiederholen!

### Quality Gate Phase 4B

Prüfe ob Sub-Agent vollständigen Artikel geliefert hat:

✅ **Target Word Count im SERP-competitive Range**:
   - **Warning**: &lt; `word_count_range_min` (aus word_count_data in content-brief.json)
   - **Failure**: &lt; (`word_count_range_min` × 0.90) OR &gt; `word_count_range_max`
   - **Target Range**: `word_count_range_min` - `word_count_range_max`
   - **Fallback**: 2000-3500 wenn word_count_strategy = "fallback"
✅ **Alle Hauptsektionen aus Outline umgesetzt** (5-8 Sektionen)
✅ **Primary Keyword Density 0.8-1.2%**
✅ **Min 3 E-E-A-T Signale integriert** (Expertise, Erfahrung, References)
✅ **Min 3 interne Links eingebaut**
✅ **FAQ mit min 5 PAA-basierten Fragen**
✅ **Brand Language konsistent** (Du-Ansprache, warmherzig, praktisch)
✅ **Markdown-Formatierung sauber** (korrekte Heading-Hierarchie)
❌ **Wenn &lt; 2000 Wörter** → Retry mit expliziter Aufforderung mehr Content zu erstellen
❌ **Wenn Keyword-Stuffing erkennbar** → Retry mit natürlicherer Integration

**Partial Success**: Wenn Word Count bei 1800 statt 2000 → proceed mit Warning.

---

## Phase 4C: Quality Validation

**Ziel**: Validiere Lesbarkeit, E-E-A-T Score, Keyword-Dichte.

**Sub-Agent Task** (seo-content-writer):
```
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

1. Lies Artikel:
   - content/article-draft.md

2. Lies Content-Brief (für Validation Gates):
   - planning/content-brief.json

3. Validiere:
   - Word Count (min/target/max aus qualityGates.wordCount)
   - Primary Keyword Density (min 0.008, target 0.01, max 0.012)
   - E-E-A-T Score (min 7/10):
     * Experience Signals (min 2)
     * Expertise Credentials (min 1)
     * Authority Backlinks/Citations (min 2)
     * Trust Elements (Quellen, Transparenz) (min 2)
   - Internal Links (min 3, target 5)
   - Semantic Coverage (min 8 supporting keywords natürlich integriert)
   - Readability (Flesch-Reading-Ease &gt; 60 für Deutsch)

4. Erstelle Validation Report:
   - quality/quality-report.json (JSON mit allen Metriken + Pass/Fail Status)

5. Return: "Quality Report: {pass_count}/{total_checks} passed, E-E-A-T Score: {score}/10"
```

### Quality Gate Phase 4C

✅ **quality-report.json existiert** im quality/ Ordner
✅ **E-E-A-T Score ≥ 7/10**
✅ **Word Count im Target Range**
✅ **Primary Keyword Density 0.8-1.2%**
✅ **Min 8 semantische Topics abgedeckt**
❌ **Wenn E-E-A-T Score &lt; 7** → Retry Phase 4B mit expliziter E-E-A-T Verstärkung
❌ **Wenn Readability &lt; 60** → Retry mit Aufforderung kürzere Sätze/einfachere Sprache

**Partial Success**: Wenn 1-2 Checks failed aber E-E-A-T Score ≥ 7 → proceed mit Warning.

---

## File Dependencies (Phase 4)

**Input** (gelesen von Sub-Agents):
- `research/keyword-analysis.json` (Phase 1)
- `research/serp-analysis.json` (Phase 2)
- `planning/content-outline.json` (Phase 3)
- `SEO/SEO-PROZESS/templates/content-brief-template.json` (Template)
- `SEO/SEO-PROZESS/methodology/content-writing-examples.md` (Referenz)
- `SEO/pferdewert-brand-language.md` (Referenz)

**Output** (erstellt von Sub-Agents):
- Phase 4A: `planning/content-brief.json` (konsolidiert)
- Phase 4B: `content/article-draft.md` (2000-2500 Wörter)
- Phase 4C: `quality/quality-report.json` (Validation Report)

---

## Main-Agent Delegation Pattern

```
# Phase 4A: Content-Brief Consolidation
&lt;invoke name="Task"&gt;
&lt;parameter name="subagent_type"&gt;seo-content-writer&lt;/parameter&gt;
&lt;parameter name="prompt"&gt;
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

Lies: SEO/SEO-PROZESS/orchestration/phase-4-content.md
Befolge: Phase 4A Instruktionen (Content-Brief Consolidation)
Return: Kompakte Summary (max 100 Wörter)
&lt;/parameter&gt;
&lt;/invoke&gt;

# Phase 4B: Content Writing
&lt;invoke name="Task"&gt;
&lt;parameter name="subagent_type"&gt;seo-content-writer&lt;/parameter&gt;
&lt;parameter name="prompt"&gt;
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

Lies: SEO/SEO-PROZESS/orchestration/phase-4-content.md
Befolge: Phase 4B Instruktionen (Content Writing)
Return: Kompakte Summary (max 150 Wörter) mit Word Count + Metriken
&lt;/parameter&gt;
&lt;/invoke&gt;

# Phase 4C: Quality Validation
&lt;invoke name="Task"&gt;
&lt;parameter name="subagent_type"&gt;seo-content-writer&lt;/parameter&gt;
&lt;parameter name="prompt"&gt;
TARGET: {keyword}
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/

Lies: SEO/SEO-PROZESS/orchestration/phase-4-content.md
Befolge: Phase 4C Instruktionen (Quality Validation)
Return: Kompakte Summary (max 100 Wörter) mit E-E-A-T Score
&lt;/parameter&gt;
&lt;/invoke&gt;
```

---

**Version**: 2.0 (2025-01-04)
**Changes**: Split into 3-Phase Structure, Content-Brief Consolidation, External Reference Pattern
**Token Budget**: ~700 (68% reduction from ~2200)
