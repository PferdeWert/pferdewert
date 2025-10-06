# SEO Workflow Index - PferdeWert.de Ratgeber

## 🎯 Workflow-Übersicht

Dieser Ordner enthält die **modular-hierarchische SEO-Prozess-Dokumentation** für das PferdeWert.de Ratgeber-Content-System.

**Ziel**: Rank-1 Content Creation durch datengetriebene 6-Phasen-Pipeline mit DataForSEO MCP + Multi-Agent-Orchestration.

---

## 📁 Struktur

```
SEO-PROZESS/
├── seo-workflow-index.md          ← Du bist hier (Navigation Hub)
├── orchestration/                 ← Executable Workflows (Phase 1-6)
│   ├── phase-1a-data-collection.md
│   ├── phase-1b-keyword-analysis.md
│   ├── phase-2-serp-analysis.md
│   ├── phase-3-outline.md
│   ├── phase-4-content.md
│   ├── phase-5a-metadata.md          ← Modular Phase 5A
│   ├── phase-5b-schema-markup.md     ← Modular Phase 5B
│   ├── phase-5c-internal-linking.md  ← Modular Phase 5C
│   └── phase-6-quality-check.md
└── methodology/                   ← Reference Documentation
    ├── eeat-signals.md
    ├── schema-markup.md
    └── quality-gates.md
```

---

## 🚀 Quick Start

### Workflow starten via Slash Command
```bash
/seo pferd kaufen worauf achten
```

Der `/seo` Command:
1. Lädt dieses Index-Dokument als Entry Point
2. Erstellt Ordnerstruktur für Output-Dateien (siehe unten)
3. Führt Phase 1-6 sequenziell aus (on-demand loading)
4. Erstellt 35+ Deliverables in `SEO/SEO-CONTENT/{keyword-slug}/`

**Ordner-Erstellung** - Main Agent erstellt die Unterordner:

Der Main Agent erstellt die Ordnerstruktur mit folgenden Unterordnern:
Ordner erstellen: `SEO/SEO-CONTENT/{keyword-slug}/`
Dann folgende Unterordner:
- research
- planning
- content
- seo
- quality

Technisch wird das durch 5 separate mkdir-Befehle umgesetzt, da Brace Expansion in der Shell nicht zuverlässig funktioniert.

---

## 📊 6-Phasen-Pipeline

| Phase | File | Haupt-Tasks | Output | Tokens |
|-------|------|-------------|--------|--------|
| **1A** | `phase-1a-data-collection.md` (102 lines) | API Data Collection (3 parallel calls) | `raw-api-data.json` | ~500 |
| **1B** | `phase-1b-keyword-analysis.md` (170 lines) | Scoring, Clustering, Top 20 Selection | `keyword-analysis.json`, Top 20 Keywords | ~200 |
| **QC** | `phase-1-quality-check.md` (165 lines) | Validate Phase 1A+1B, Auto-Retry on Fail | `phase-1-quality-report.json` | ~300 |
| **2** | `phase-2-serp-analysis.md` | SERP Data, PAA Expansion, Competitor Analysis | `serp-analysis.json`, Content Gaps | ~600 |
| **3** | `phase-3-outline.md` | Content Cluster, Outline Creation, H2/H3 Structure | `content-outline.json`, Article Structure | ~700 |
| **4** | `phase-4-content.md` | Content Writing, E-E-A-T Integration, Fact-Checking | `article-draft.md`, 2000-2500 Wörter | ~700 |
| **5A** | `phase-5a-metadata.md` | Title, Description, OG Tags, Twitter Cards, Canonical | `seo-metadata.json` | ~150 |
| **5B** | `phase-5b-schema-markup.md` | Article, FAQ, HowTo, Breadcrumb Schema | Schema JSONs | ~200 |
| **5C** | `phase-5c-internal-linking.md` | Sitemap Analysis, Relevance Scoring, Link Placement | `internal-linking.json` | ~200 |
| **6** | `phase-6-quality-check.md` (v2.1) | Quality Validation, Readability Check, Final Review (Fixed Delegation) | `quality-report.json`, Publication-Ready | ~400 |

**Total Token Budget**: ~3760 Tokens (vs. 7-8k im alten Monolith-System)

---

## 🔧 Main vs. Sub-Agent Pattern

**CRITICAL**: Main Agent liest NIEMALS die Phase-MD Dateien → verhindert 85k+ Token Context-Overflow!

### Main Agent (Pipeline Coordinator via `/seo` Command)
- **Führt aus**: Ordner-Erstellung, Sub-Agent-Spawning, Todo-Tracking
- **Tools**: `Bash(mkdir:*)`, `Task`, `TodoWrite`
- **Rolle**: Orchestration ONLY, keine Phase-MDs lesen!
- **Context**: Bleibt minimal (~1-2k tokens) durch kompakte Summaries
- **VERBOTEN**: `Read` auf Phase-MDs (würde 60k+ tokens addieren über 6 Phasen)

### Sub-Agent (seo-content-writer - pro Phase)
- **Führt aus**:
  1. Liest sein eigenes Phase-MD (z.B. `phase-1-keyword-research.md`)
  2. Befolgt alle Instruktionen aus dem Phase-MD
  3. Macht alle DataForSEO API-Calls
  4. Erstellt alle Deliverables
  5. Gibt nur kompakte Summary zurück (max 200 Wörter)
- **Tools**: `mcp__dataforseo__*`, `Read`, `Write`
- **Context**: Wird nach jeder Phase verworfen (keine Akkumulation!)
- **Vorteil**: Phase-MDs + API-Responses bleiben isoliert

### Delegation-Pattern

```xml
<!-- Main Agent spawnt Sub-Agent für Phase 1A -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO PHASE 1A: DATA COLLECTION

TARGET KEYWORD: '{PRIMARY_KEYWORD}'
OUTPUT DIR: SEO/SEO-CONTENT/{keyword-slug}/

INSTRUCTIONS:
1. Read SEO/SEO-PROZESS/orchestration/phase-1a-data-collection.md
2. Follow ALL steps in the phase-MD file (API calls, file creation, validation)
3. Return: Compact summary (max 150 words) + list of created files

IMPORTANT: The phase-MD contains exact DataForSEO API call specifications. Execute them as documented.
</parameter>
</invoke>

<!-- Main Agent spawnt neuen Sub-Agent für Phase 1B (frischer Context!) -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO PHASE 1B: KEYWORD ANALYSIS

TARGET: 'pferd kaufen worauf achten'
OUTPUT: SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/

1. Lies: SEO/SEO-PROZESS/orchestration/phase-1b-keyword-analysis.md
2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. executeCode für Scoring!)
3. Nutze Ergebnisse aus Phase 1A (raw-api-data.json im Output-Ordner)
4. Return: Kompakte Summary (max 150 Wörter) + Liste der erstellten Dateien
</parameter>
</invoke>

<!-- Main Agent spawnt Quality-Check-Agent nach Phase 1B -->
<invoke name="Task">
<parameter name="subagent_type">seo-quality-checker</parameter>
<parameter name="prompt">
QUALITY CHECK: Phase 1A+1B

TARGET: 'pferd kaufen worauf achten'
OUTPUT_DIR: SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/

1. Lies: SEO/SEO-PROZESS/orchestration/phase-1-quality-check.md
2. Validiere Phase 1A Output (raw-api-data.json)
3. Validiere Phase 1B Output (keyword-analysis.json)
4. Entscheide automatisch: PASSED | RETRY_1A | RETRY_1B | ABORT
5. Return: Kompakte Summary (max 200 Wörter) + next_action

WICHTIG:
- KEINE User-Prompts für Retry-Entscheidungen!
- Max 2 Retries pro Phase
- Bei RETRY → Gib adjusted_params zurück (Main Agent spawnt dann retry Sub-Agent)
</parameter>
</invoke>

<!-- Main Agent spawnt neuen Sub-Agent für Phase 2 (frischer Context!) -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
SEO PHASE 2: SERP ANALYSIS

TARGET: 'pferd kaufen worauf achten'
OUTPUT: SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/

1. Lies: SEO/SEO-PROZESS/orchestration/phase-2-serp-analysis.md
2. Befolge ALLE Instruktionen aus dem Phase-MD (inkl. DataForSEO API-Calls!)
3. Nutze Ergebnisse aus Phase 1A+1B (im Output-Ordner)
4. Return: Kompakte Summary + Liste der erstellten Dateien
</parameter>
</invoke>
```

### Context-Budget-Vergleich
**❌ Alte Methode (Main Agent liest Phase-MDs)**:
```
Phase 1 MD:     10k tokens
Phase 1 Result: 20k tokens  } = 30k
Phase 2 MD:     10k tokens
Phase 2 Result: 20k tokens  } = 60k
Phase 3 MD:     10k tokens
Phase 3 Result: 20k tokens  } = 90k ❌ OVERFLOW!
```

**✅ Neue Methode (Sub-Agents lesen Phase-MDs)**:
```
Phase 1A Summary: 0.15k tokens
Phase 1B Summary: 0.15k tokens
Phase 2 Summary:  0.2k tokens
Phase 3 Summary:  0.2k tokens
Phase 4 Summary:  0.2k tokens
Phase 5A Summary: 0.15k tokens
Phase 5B Summary: 0.2k tokens
Phase 5C Summary: 0.2k tokens
Phase 6 Summary:  0.2k tokens
TOTAL:            1.65k tokens ✅ Context-Safe!
```

**Einsparung**: ~85k tokens (98% Reduktion!)

---

## 📚 Methodology Reference Docs

### 1. E-E-A-T Signals (`methodology/eeat-signals.md`)
Wann verwenden:
- ✅ In Phase 4 (Content Creation) für Credentials-Integration
- ✅ In Phase 6 (Quality Check) für E-E-A-T Score Validation

**Key Topics**:
- Experience: Praxis-Beispiele, Fallstudien, persönliche Erfahrungen
- Expertise: Credentials, Zertifikate, Fachwissen
- Authoritativeness: Backlinks, Citations, Branchenanerkennung
- Trustworthiness: Quellenangaben, Transparenz, Impressum

### 2. Schema Markup (`methodology/schema-markup.md`)
Wann verwenden:
- ✅ In Phase 5 (On-Page SEO) für JSON-LD Schema-Generierung

**Templates**:
- Article Schema (Primary)
- FAQ Schema (für PAA-Integration)
- HowTo Schema (für Tutorial-Content)
- Breadcrumb Schema (Navigation)

### 3. Quality Gates (`methodology/quality-gates.md`)
Wann verwenden:
- ✅ Nach jeder Phase für Validierung
- ✅ In Phase 6 für Final Quality Check

**Validation Patterns**:
- Min/Max Thresholds (flexibel, kein all-or-nothing)
- Partial Success (Fortsetzung bei Warnings möglich)
- Retry Logic (bei < Min Threshold)

---

## 🎯 Output-Struktur

Jeder Workflow erstellt folgende Dateien in `SEO/SEO-CONTENT/{keyword-slug}/`:

```
{keyword-slug}/
├── research/
│   ├── raw-api-data.json              # Phase 1A Output
│   ├── phase-1a-summary.md            # Phase 1A Summary
│   ├── keyword-analysis.json          # Phase 1B Output
│   ├── phase-1b-summary.md            # Phase 1B Summary
│   ├── serp-analysis.json             # Phase 2 Output
│   └── competitor-content-gaps.json   # Phase 2 Output
├── planning/
│   ├── content-clusters.json          # Phase 1 Sub-Agent Output
│   └── content-outline.json           # Phase 3 Output
├── content/
│   ├── article-draft.md               # Phase 4 Output
│   └── final-article.md               # Phase 6 Output (publication-ready)
├── seo/
│   ├── seo-metadata.json              # Phase 5 Output
│   ├── schema-article.json            # Phase 5 Output
│   ├── schema-faq.json                # Phase 5 Output (optional)
│   └── internal-linking.json          # Phase 5 Output
└── quality/
    ├── quality-report.json            # Phase 6 Output
    └── eeat-score.json                # Phase 6 Output
```

**Total Deliverables**: 17+ strukturierte Dateien pro Keyword

---


## 🔄 Workflow-Execution

### Standard-Ablauf (sequenziell)
```bash
/seo {keyword}
# → Lädt Phase 1A → Ausführung → Phase 1B → Phase 2 → ... → Phase 6
```

### Einzelne Phase ausführen (Ad-hoc)
```bash
# Main-Agent spawnt Sub-Agent für einzelne Phase
Task: SEO PHASE 2 - SERP ANALYSIS
# → Führt nur SERP-Analyse aus

# Oder für einzelne Sub-Phase von Phase 5
Task: SEO PHASE 5A - METADATA OPTIMIZATION
# → Führt nur Metadata-Optimierung aus
```

### Phase wiederholen (Retry)
```bash
# Wenn Quality Gate failed in Phase 1A
Task: SEO PHASE 1A - DATA COLLECTION (RETRY)
# → Retry mit anderen API-Parametern (depth, limit)

# Wenn Quality Gate failed in Phase 5B
Task: SEO PHASE 5B - SCHEMA MARKUP (RETRY)
# → Retry Schema-Generierung mit angepassten Parametern
```

---

## 📖 Weitere Referenzen

- **Brand Language**: `SEO/pferdewert-brand-language.md`
- **Company Profile**: `SEO/company/company-profile-2025-09-21.md`

---

## ✅ Success Metrics

**Pro Keyword-Workflow erwarten wir**:
- ⏱️ **Execution Time**: 15-20 Minuten (automatisiert)
- 📝 **Word Count**: 2000-2500 Wörter (quality content)
- 🎯 **Primary Keyword Density**: 0.8-1.2%
- 🔍 **Supporting Keywords**: Min 15 natürlich integriert
- ⭐ **E-E-A-T Score**: Min 7/10 (via Quality Check)
- 📊 **Schema Markup**: Min 2 Typen (Article + FAQ/HowTo)
- 🔗 **Internal Links**: Min 3 relevante Ratgeber-Links

---

## 🚨 Troubleshooting

### Problem: Token-Overflow bei großen Datasets
**Lösung**: Limits in Phase-Files reduzieren (z.B. `limit=15` statt `limit=50`)

### Problem: Quality Gate failed
**Lösung**: Prüfe `quality-report.json` → Retry Phase mit angepassten Parametern

### Problem: Sub-Agent liefert unstrukturiertes Output
**Lösung**: Prüfe Prompt in Phase-File → Stelle sicher "OUTPUT FORMAT (JSON)" klar definiert ist

### Problem: DataForSEO API Error
**Lösung**: Prüfe MCP Server Status (`claude mcp list`) → Ggf. Retry mit anderen Parametern 

---

**Version**: 1.0 (2025-01-04)
**Maintainer**: Claude Code (SEO Pipeline Coordinator)
**Last Updated**: Initial Modular Structure Creation
