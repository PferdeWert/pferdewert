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
│   ├── phase-1-keyword-research.md
│   ├── phase-2-serp-analysis.md
│   ├── phase-3-outline.md
│   ├── phase-4-content.md
│   ├── phase-5-onpage-seo.md
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
2. Führt Phase 1-6 sequenziell aus (on-demand loading)
3. Erstellt 35+ Deliverables in `SEO/SEO-CONTENT/{keyword-slug}/`

---

## 📊 6-Phasen-Pipeline

| Phase | File | Haupt-Tasks | Output | Tokens |
|-------|------|-------------|--------|--------|
| **1** | `phase-1-keyword-research.md` | Related Keywords, Keyword Ideas, Overview | `keyword-analysis.json`, Top 20 Keywords | ~500 |
| **2** | `phase-2-serp-analysis.md` | SERP Data, PAA Expansion, Competitor Analysis | `serp-analysis.json`, Content Gaps | ~600 |
| **3** | `phase-3-outline.md` | Content Cluster, Outline Creation, H2/H3 Structure | `content-outline.json`, Article Structure | ~700 |
| **4** | `phase-4-content.md` | Content Writing, E-E-A-T Integration, Fact-Checking | `article-draft.md`, 2000-2500 Wörter | ~700 |
| **5** | `phase-5-onpage-seo.md` | Metadata, Schema Markup, Internal Linking | `seo-metadata.json`, Schema JSONs | ~400 |
| **6** | `phase-6-quality-check.md` | Quality Validation, Readability Check, Final Review | `quality-report.json`, Publication-Ready | ~400 |

**Total Token Budget**: ~3300 Tokens (vs. 7-8k im alten Monolith-System)

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

### Delegation-Pattern (UPDATED 2025-01-04)
```xml
<!-- Main Agent spawnt Sub-Agent für Phase 1 -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
TARGET: 'pferd kaufen worauf achten'
OUTPUT: SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/

1. Lies: SEO/SEO-PROZESS/orchestration/phase-1-keyword-research.md
2. Befolge ALLE Instruktionen aus dem Phase-MD
3. Erstelle alle geforderten Deliverables
4. Return: Kompakte Summary (max 200 Wörter) + Liste der erstellten Dateien
</parameter>
</invoke>

<!-- Main Agent spawnt neuen Sub-Agent für Phase 2 (frischer Context!) -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
TARGET: 'pferd kaufen worauf achten'
OUTPUT: SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/

1. Lies: SEO/SEO-PROZESS/orchestration/phase-2-serp-analysis.md
2. Befolge ALLE Instruktionen aus dem Phase-MD
3. Nutze Ergebnisse aus Phase 1 (im Output-Ordner)
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
Phase 1 Summary: 0.2k tokens
Phase 2 Summary: 0.2k tokens
Phase 3 Summary: 0.2k tokens
Phase 4 Summary: 0.2k tokens
Phase 5 Summary: 0.2k tokens
Phase 6 Summary: 0.2k tokens
TOTAL:           1.2k tokens ✅ Context-Safe!
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
│   ├── keyword-analysis.json          # Phase 1 Output
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

**Total Deliverables**: 15+ strukturierte Dateien pro Keyword

---


## 🔄 Workflow-Execution

### Standard-Ablauf (sequenziell)
```bash
/seo {keyword}
# → Lädt Phase 1 → Ausführung → Phase 2 → ... → Phase 6
```

### Einzelne Phase ausführen (Ad-hoc)
```bash
# Main-Agent liest nur die benötigte Phase
Read SEO/SEO-PROZESS/orchestration/phase-2-serp-analysis.md
# → Führt nur SERP-Analyse aus
```

### Phase wiederholen (Retry)
```bash
# Wenn Quality Gate failed in Phase 1
Read SEO/SEO-PROZESS/orchestration/phase-1-keyword-research.md
# → Retry mit anderen API-Parametern (time_period, limit)
# → Aber immer zum gleichen Ziel-Keyword
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
