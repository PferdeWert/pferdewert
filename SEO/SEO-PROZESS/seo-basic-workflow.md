# SEO-BASIC Workflow - Vereinfachter Prozess für kleinere Keywords

## 🎯 Workflow-Ziel

**Use Case**: Kleinere Keywords mit geringerem Traffic-Potenzial
**Ziel**: Solider, rankingfähiger Content - schnell und effizient

---

## 📊 4-Phasen-Pipeline vs. Full-Workflow

| Aspekt | SEO-BASIC | SEO-FULL |
|--------|-----------|----------|
| **Phasen** | 4 | 6+ |
| **API Calls** | 2 | 5+ |
| **Deliverables** | 9 Dateien | 17+ Dateien |
| **Use Case** | Small Keywords | High-Value Keywords |

---

## 🚀 Quick Start

### Workflow starten
```bash
/seo-basic {keyword}
```

Der Main Agent:
1. Erstellt Ordnerstruktur: `SEO/SEO-CONTENT/{keyword-slug}/basic/`
2. Führt Phase 1-3 sequenziell aus
3. Erstellt 8 essenzielle Deliverables

**Ordner-Struktur**:
```bash
mkdir -p SEO/SEO-CONTENT/{keyword-slug}/basic/research
mkdir -p SEO/SEO-CONTENT/{keyword-slug}/basic/content
mkdir -p SEO/SEO-CONTENT/{keyword-slug}/basic/seo
```

---

## 📋 Phase-Übersicht

### Phase 1: Quick Research (~300 tokens)
**Ziel**: Essenzielle Keyword- und SERP-Daten sammeln
**Output**: `research/quick-research.json`

**Schritte**:

1. **Single API Call: Keyword Overview**
```
Tool: mcp__dataforseo__dataforseo_labs_google_keyword_overview
Parameters:
- keywords: [PRIMARY_KEYWORD]
- location_name: "Germany"
- language_code: "de"
- include_clickstream_data: false
```

**Extrahiere**:
- Search Volume
- CPC
- Competition
- Top 5 Related Keywords (aus suggestions)

2. **SERP Quick Check**
```
Tool: mcp__dataforseo__serp_organic_live_advanced
Parameters:
- keyword: PRIMARY_KEYWORD
- location_name: "Germany"
- language_code: "de"
- depth: 10
- max_crawl_pages: 1
- people_also_ask_click_depth: 1
```

**Extrahiere**:
- Top 5 Ranking URLs (nicht Top 10)
- Titles der Top 5
- People Also Ask (PAA) Questions (max 5)

3. **Quick Analysis**
- Keyword Difficulty einschätzen (Low/Medium/High basierend auf Competition)
- PAA-Fragen identifizieren (für H2/H3)
- Top-Ranking Title-Patterns analysieren

**Output Format** (`quick-research.json`):
```json
{
  "keyword": "string",
  "metrics": {
    "search_volume": number,
    "difficulty": "Low|Medium|High",
    "cpc": number
  },
  "related_keywords": ["string", ...],  // max 5
  "top_ranking": [
    {
      "position": number,
      "title": "string",
      "url": "string"
    }
  ],  // max 5
  "paa_questions": ["string", ...]  // max 5
}
```

---

### Phase 2: Outline Creation (~150 tokens)
**Ziel**: Strukturierte Outline als Blueprint für Content Writing
**Input**: `research/quick-research.json`
**Output**: `content/outline.md`

**Schritte**:

1. **Outline Structure aufbauen**
   - H1 aus Top-Ranking Title Patterns ableiten
   - 4-6 H2-Sections aus PAA-Fragen erstellen
   - 1-2 H3 pro H2 (nur wo sinnvoll)
   - Pro Section: Content Plan als Bullet Points

2. **Keyword-Mapping**
   - Primary Keyword → H1 + Intro
   - Related Keywords → H2 Sections zuweisen
   - Target Word Count pro Section festlegen

3. **Quality Blueprint**
   - Target Metrics dokumentieren (Word Count, Keyword Density)
   - E-E-A-T Signale pro Section planen
   - Interne Link-Opportunities identifizieren

**Output Format** (`outline.md`):
```markdown
# Content Outline: {Primary Keyword}

## Target Metrics
- Word Count Target: 1200-1500
- Primary Keyword: {keyword}
- Keyword Density Target: 0.8-1.2%
- Related Keywords: [list from research]

## Structure

### H1: {Title aus Top-Ranking Patterns}

### Intro (100-150 Wörter)
- Hook: {Problem/Question}
- Primary Keyword einbauen
- Überblick: Was wird behandelt?

### H2: {PAA Question 1}
**Content Plan:**
- Punkt 1 zu behandeln
- Punkt 2 zu behandeln
- Keyword-Integration: {related keyword}
- Target: 150-200 Wörter

### H2: {PAA Question 2}
...

### H2: Fazit
**Content Plan:**
- Zusammenfassung Key Points
- Call-to-Action
- Target: 100 Wörter
```

**Wichtig**:
- ⚠️ **KEIN Content Writing in dieser Phase!**
- ⚠️ **Nur Struktur + Content Plan als Bullets!**
- ✅ Outline muss als MD-Datei persistent gespeichert werden

---

### Phase 3: Content Writing (~350 tokens)
**Ziel**: Content Writing basierend auf persistentem Outline
**Input**: `research/quick-research.json` + `content/outline.md`
**Output**: `content/article-basic.md`

**KRITISCHE CONSTRAINT**:
⚠️ **Folge `outline.md` strikt! Keine Struktur-Abweichungen!**

**Schritte**:

1. **Outline einlesen und verstehen**
   - H2/H3-Struktur ist fix
   - Content Plans sind Roadmap
   - Word Count Targets sind bindend

2. **Section-by-Section Writing**
   - Pro H2: Content Plan in Fließtext umsetzen
   - **Wortanzahl**: 150-200 Wörter pro H2 (wie in outline definiert)
   - **Keyword-Integration**: Wie in outline zugewiesen
   - **E-E-A-T Basics**:
     - Kurze Expertise-Signale (1-2 Sätze)
     - Quellenangaben nur bei Claims
     - Einfache Praxis-Beispiele

3. **Final Article Structure**
```markdown
# {Title aus outline.md}

{Intro - 100-150 Wörter mit Primary Keyword}

## {H2 aus outline.md}
{Content - 150-200 Wörter, folgt Content Plan}

## {H2 aus outline.md}
{Content - 150-200 Wörter, folgt Content Plan}

## Fazit
{Summary - 100 Wörter, folgt Content Plan}
```

**Qualitäts-Checks während Writing**:
- ✅ Outline-Struktur 1:1 eingehalten
- ✅ Primary Keyword in H1, Intro, 1x H2
- ✅ Related Keywords wie zugewiesen integriert
- ✅ Word Count Targets erreicht (±50 Wörter ok)
- ✅ Mind. 1 Expertise-Signal pro 2 H2-Sections
- ✅ Lesbarkeit: Kurze Sätze, aktive Sprache

**Total Word Count**: 1200-1500 Wörter
**Output**: `article-basic.md`

---

### Phase 4: Essential SEO (~200 tokens)
**Ziel**: Minimum-SEO-Optimierung für Indexierung
**Output**: `seo/metadata.json`, `seo/schema-article.json`

**Schritte**:

1. **Metadata Creation**

**Title (max 60 Zeichen)**:
- Pattern: `{Primary Keyword} - {Benefit/Hook}`
- Beispiel: "Pferdekauf Checkliste - 10 Prüfpunkte vor dem Kauf"

**Description (max 155 Zeichen)**:
- Pattern: `{Problem} {Solution} {CTA}`
- Beispiel: "Was beim Pferdekauf beachten? Unsere Experten-Checkliste hilft dir, teure Fehler zu vermeiden. Jetzt lesen!"

**Output Format** (`metadata.json`):
```json
{
  "title": "string",
  "description": "string",
  "canonical": "/ratgeber/{slug}",
  "og": {
    "title": "string",
    "description": "string",
    "type": "article"
  }
}
```

2. **Basic Schema Markup**

Nur **Article Schema** (kein FAQ/HowTo/Breadcrumb):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Title}",
  "description": "{Description}",
  "author": {
    "@type": "Organization",
    "name": "PferdeWert.de"
  },
  "datePublished": "{ISO-Date}",
  "dateModified": "{ISO-Date}",
  "image": "{Featured-Image-URL}",
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    }
  }
}
```

**Output**: `schema-article.json`

---

## 📁 Output-Struktur

```
{keyword-slug}/basic/
├── research/
│   └── quick-research.json           # Phase 1 Output
├── content/
│   ├── outline.md                    # Phase 2 Output (NEW!)
│   └── article-basic.md              # Phase 3 Output
└── seo/
    ├── metadata.json                 # Phase 4 Output
    └── schema-article.json           # Phase 4 Output
```

**Total Deliverables**: 5 strukturierte Dateien (vs. 17+ im Full-Workflow)

---

## 🎯 Main vs. Sub-Agent Pattern

Gleiche Struktur wie Full-Workflow:

### Main Agent (Pipeline Coordinator)
- **Aufgaben**: Ordner erstellen, Sub-Agents spawnen, Todo-Tracking
- **VERBOTEN**: Phase-MDs lesen (Context-Overflow!)

### Sub-Agent (seo-content-writer-basic)
- **Pro Phase**:
  1. Liest Phase-Instruktionen (aus diesem MD)
  2. Führt Tasks aus
  3. Gibt kompakte Summary zurück (max 100 Wörter)

### Delegation Pattern

```xml
<!-- Phase 1: Quick Research -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO-BASIC PHASE 1: QUICK RESEARCH

TARGET KEYWORD: '{PRIMARY_KEYWORD}'
OUTPUT DIR: SEO/SEO-CONTENT/{keyword-slug}/basic/

INSTRUCTIONS:
1. Read: SEO/SEO-PROZESS/seo-basic-workflow.md (Phase 1 section)
2. Execute: Keyword Overview API + SERP API (2 calls only)
3. Create: quick-research.json
4. Return: Compact summary (max 100 words) + metrics overview

FOCUS: Top 5 competitors, 5 PAA questions, basic metrics only.
</parameter>
</invoke>

<!-- Phase 2: Outline Creation -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO-BASIC PHASE 2: OUTLINE CREATION ONLY

TARGET: '{PRIMARY_KEYWORD}'
INPUT: SEO/SEO-CONTENT/{keyword-slug}/basic/research/quick-research.json
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/basic/content/outline.md

TASK:
1. Read: SEO/SEO-PROZESS/seo-basic-workflow.md (Phase 2 section)
2. Read: quick-research.json (PAA questions, top ranking titles)
3. Create detailed outline structure:
   - H1 from top-ranking patterns
   - 4-6 H2s from PAA questions
   - Content plan per section (bullet points)
   - Related keyword assignment per H2
4. Save as outline.md with target metrics

⚠️ DO NOT WRITE CONTENT! Only structure + content plan.

Return: "Outline created: [list H2 titles] | Sections: X"
</parameter>
</invoke>

<!-- Phase 3: Content Writing -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO-BASIC PHASE 3: CONTENT WRITING

TARGET: '{PRIMARY_KEYWORD}'
INPUT:
- SEO/SEO-CONTENT/{keyword-slug}/basic/research/quick-research.json (metrics, keywords)
- SEO/SEO-CONTENT/{keyword-slug}/basic/content/outline.md (STRICT CONSTRAINT!)
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/basic/content/article-basic.md

TASK:
1. Read: SEO/SEO-PROZESS/seo-basic-workflow.md (Phase 3 section)
2. Read: outline.md - this is your ROADMAP
3. Fill each H2 section from outline:
   - Follow content plan exactly
   - 150-200 words per H2
   - Integrate assigned keywords
4. Total: 1200-1500 words
5. ⚠️ DO NOT DEVIATE from outline structure!

Return: "Word Count: X | Sections: Y | Keywords integrated: Z"
</parameter>
</invoke>

<!-- Phase 4: Essential SEO -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO-BASIC PHASE 4: ESSENTIAL SEO

TARGET: '{PRIMARY_KEYWORD}'
INPUT: SEO/SEO-CONTENT/{keyword-slug}/basic/content/article-basic.md
OUTPUT: SEO/SEO-CONTENT/{keyword-slug}/basic/seo/

1. Read: SEO/SEO-PROZESS/seo-basic-workflow.md (Phase 4 section)
2. Read: article-basic.md
3. Create: metadata.json (Title + Description)
4. Create: schema-article.json (Article Schema only)
5. Return: Summary (max 50 words)

FOCUS: Minimum SEO for indexing, no FAQ/HowTo schema.
</parameter>
</invoke>
```

---

## ✅ Quality Standards (Simplified)

**Minimum Requirements** (keine Quality-Gate-Phase!):

- ✅ **Word Count**: 1200-1500 Wörter
- ✅ **Primary Keyword**: In H1, Intro, min 1x H2
- ✅ **Related Keywords**: Mind. 5 integriert
- ✅ **H2 Sections**: 4-6
- ✅ **E-E-A-T Signal**: Mind. 1 vorhanden
- ✅ **Metadata**: Title + Description vorhanden
- ✅ **Schema**: Article Schema korrekt

**Was NICHT geprüft wird**:
- ❌ Kein separater Quality Check Agent
- ❌ Keine E-E-A-T Score Berechnung
- ❌ Keine Readability-Analyse
- ❌ Keine Competitor Content Gap Validation

---

## 🔄 Wann welchen Workflow?

### SEO-BASIC nutzen bei:
- ✅ Search Volume < 500/Monat
- ✅ Low Competition Keywords
- ✅ Informational Content (nicht Commercial)
- ✅ Budget/Zeit limitiert
- ✅ Content-Test für neue Themen

### SEO-FULL nutzen bei:
- ✅ Search Volume > 1000/Monat
- ✅ High Competition Keywords
- ✅ Money Keywords (Commercial Intent)
- ✅ Pillar Content / Hauptkategorien
- ✅ Qualität > Quantität

---

## 🚨 Wichtige Unterschiede zum Full-Workflow

| Feature | SEO-BASIC | SEO-FULL |
|---------|-----------|----------|
| Phases | 4 | 6+ |
| API Calls | 2 | 5+ |
| Keyword Analysis | Basic (Top 5) | Advanced (Top 20, Clustering) |
| SERP Analysis | Top 5 nur | Top 10 + Deep Analysis |
| Outline | Separate Phase | Integrated in Content Phase |
| Content Length | 1200-1500 | 2000-2500 |
| E-E-A-T | Basic Signals | Full Integration |
| Schema Types | 1 (Article) | 3+ (Article, FAQ, HowTo) |
| Internal Linking | Manual | Automated Analysis |
| Quality Check | None | Automated + Manual |

---

## 💡 Pro-Tipps für SEO-BASIC

1. **Use für schnelle Content-Tests**
   - Teste neue Themengebiete mit BASIC
   - Bei gutem Ranking → später zu FULL upgraden

2. **Batch-Processing**
   - Mehrere BASIC-Keywords parallel
   - 10 BASIC-Articles in der Zeit von 3 FULL-Articles

3. **Manual Optimization Post-Publishing**
   - BASIC gibt Grundlage
   - Nach 2-3 Monaten: Manual FAQ/HowTo ergänzen
   - Internal Links nachträglich setzen

4. **Keyword-Gruppen**
   - Related Low-Volume Keywords als BASIC-Cluster
   - Später: Internal Linking zwischen BASIC-Articles

---

## 📖 Beispiel-Output

**Input**: `/seo-basic pferd einreiten alter`

**Phase 1 Output** (`quick-research.json`):
```json
{
  "keyword": "pferd einreiten alter",
  "metrics": {
    "search_volume": 320,
    "difficulty": "Low",
    "cpc": 0.45
  },
  "related_keywords": [
    "jungpferd einreiten wann",
    "pferd anreiten zeitpunkt",
    "junges pferd reiten ab wann",
    "pferd einreiten lassen kosten",
    "einreiten pferd alter"
  ],
  "top_ranking": [
    {
      "position": 1,
      "title": "Ab wann darf man ein Pferd einreiten? | Ratgeber",
      "url": "example1.de"
    },
    // ... 4 more
  ],
  "paa_questions": [
    "Wann ist ein Pferd alt genug zum Einreiten?",
    "Was passiert beim Einreiten?",
    "Wie lange dauert das Einreiten?",
    "Kann man ein Pferd mit 5 Jahren noch einreiten?",
    "Was kostet das Einreiten beim Profi?"
  ]
}
```

**Phase 2 Output** (`article-basic.md`):
```markdown
# Pferd Einreiten: Ab welchem Alter ist es richtig?

Das Einreiten eines jungen Pferdes ist ein entscheidender Moment...
(1300 Wörter Content mit 4-6 H2-Sections)
```

**Phase 3 Output** (`metadata.json`):
```json
{
  "title": "Pferd Einreiten Alter - Ab wann ist es richtig? | PferdeWert",
  "description": "Ab wann kann man ein Pferd einreiten? Unser Ratgeber erklärt das richtige Alter, den Ablauf und worauf du achten musst. Jetzt lesen!",
  // ...
}
```

---

## ✅ Success Metrics

**Pro SEO-BASIC Workflow erwarten wir**:
- 📝 **Word Count**: 1200-1500 Wörter
- 🎯 **Primary Keyword Density**: 0.8-1.2%
- 🔍 **Supporting Keywords**: Min 5
- ⭐ **E-E-A-T**: Basic Signals vorhanden
- 📊 **Schema**: 1 Type (Article only)
- 🔗 **Internal Links**: Manual nachträglich
