# Phase 1A: Keyword Data Collection

**Ziel**: Rohdaten von DataForSEO APIs sammeln (Related Keywords, Keyword Ideas, Keyword Overview)

**Token Budget**: ~500-800 tokens
**Execution Time**: 2-3 Minuten
**Subagent Type**: `seo-content-writer`

---

## Eingabe-Parameter

- `PRIMARY_KEYWORD`: Das Ziel-Keyword (z.B. "pferd kaufen worauf achten")
- `OUTPUT_DIR`: Basis-Ordner für alle Outputs (z.B. `SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/`)

---

**VORBEREITUNG: Erstelle Research-Ordner (idempotent)**

```bash
mkdir -p {OUTPUT_DIR}/research
```

**WICHTIG**: `-p` Flag verhindert Fehler bei Workflow-Reruns.

---

## STEP 1: API Calls ausführen (Parallel)

**WICHTIG**: Alle 3 API-Calls PARALLEL ausführen für Performance-Optimierung.

### Call 1: Related Keywords
```
AKTION: Rufe DataForSEO Tool auf
Tool: mcp__dataforseo__dataforseo_labs_google_related_keywords

Parameter:
- keyword: {PRIMARY_KEYWORD}
- location_name: "Germany"
- language_code: "de"
- depth: 1
- limit: 20

Speichere Response in Variable: related_keywords_response
```

### Call 2: Keyword Ideas
```
AKTION: Rufe DataForSEO Tool auf
Tool: mcp__dataforseo__dataforseo_labs_google_keyword_ideas

Parameter:
- keywords: ["{PRIMARY_KEYWORD}"]
- location_name: "Germany"
- language_code: "de"
- limit: 15

Speichere Response in Variable: keyword_ideas_response
```

### Call 3: Keyword Overview
```
AKTION: Rufe DataForSEO Tool auf
Tool: mcp__dataforseo__dataforseo_labs_google_keyword_overview

Parameter:
- keywords: ["{PRIMARY_KEYWORD}"]
- location_name: "Germany"
- language_code: "de"

Speichere Response in Variable: keyword_overview_response
```

---

## STEP 2: Error Handling & Validation

**WICHTIG**: Quality validation and automatic retry logic is handled by Phase 1 Quality Check Agent (see `phase-1-quality-check.md`).

**Sub-Agent Responsibility**:
- Execute all 3 API calls and save raw responses to JSON
- Quality-Check-Agent will validate results and trigger retries automatically if needed
- **NO manual retry logic in Phase 1A**
- **NO user prompts**

**Automatic Validation by QC-Agent**:
- All 3 API calls must return `status: "success"`
- Total keywords across all 3 APIs must be ≥30
- If validation fails: QC-Agent spawns retry with adjusted parameters (depth=2, limit=30)
- Max 2 retries before ABORT

---

## STEP 3: Output erstellen

**File 1: Raw API Data** (`{OUTPUT_DIR}/research/raw-api-data.json`)

Format:
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "collected_at": "{ISO_TIMESTAMP}",
  "api_calls": {
    "related_keywords": {
      "status": "success|error",
      "count": 20,
      "data": [ /* Full API Response */ ]
    },
    "keyword_ideas": {
      "status": "success|error",
      "count": 15,
      "data": [ /* Full API Response */ ]
    },
    "keyword_overview": {
      "status": "success|error",
      "data": { /* Full API Response */ }
    }
  },
  "warnings": [
    "related_keywords hatte nur 3 Ergebnisse (< 5)",
    "..."
  ]
}
```

**WICHTIG**:
- Speichere ALLE API-Responses komplett (nicht gefiltert!)
- Speichere auch Error-Messages bei fehlgeschlagenen Calls
- Füge `warnings` Array hinzu für Retry-Events

**File 2: Phase 1A Summary** (`{OUTPUT_DIR}/research/phase-1a-summary.md`)

Format:
```markdown
# Phase 1A Summary: Data Collection

**Primary Keyword**: {PRIMARY_KEYWORD}
**Executed**: {TIMESTAMP}

## API Call Results

### Related Keywords
- Status: ✅ Success / ❌ Error
- Keywords Found: 20
- Warnings: [Liste]

### Keyword Ideas
- Status: ✅ Success / ❌ Error
- Keywords Found: 15
- Warnings: [Liste]

### Keyword Overview
- Status: ✅ Success / ❌ Error
- Search Volume: 1200
- CPC: €0.45

## Next Steps
Phase 1B wird diese Daten verarbeiten und analysieren.

## Files Created
- raw-api-data.json
- phase-1a-summary.md
```

---

## STEP 4: Return Summary (Main Agent)

**WICHTIG**: Gib NUR eine kompakte Summary zurück (max 150 Wörter), NICHT die kompletten API-Responses!

Format:
```
Phase 1A COMPLETED ✅

API Calls:
- Related Keywords: 20 results ✅
- Keyword Ideas: 15 results ✅
- Keyword Overview: SV=1200, CPC=€0.45 ✅

Files Created:
- research/raw-api-data.json (85 KB)
- research/phase-1a-summary.md (1 KB)

Warnings: 0
Errors: 0

Ready for Phase 1B: Keyword Analysis
```

---

## Error Cases

### Case 1: Alle API-Calls fehlgeschlagen
```
Phase 1A FAILED ❌

Errors:
- Related Keywords: Timeout after 30s
- Keyword Ideas: API Rate Limit exceeded
- Keyword Overview: Invalid API Key

ABORT: Phase 1A kann nicht fortgesetzt werden.
ACTION REQUIRED: Prüfe DataForSEO MCP Server Status mit `claude mcp list`
```

### Case 2: Partial Success (min. 1 Call erfolgreich)
```
Phase 1A COMPLETED ⚠️ (Partial Success)

API Calls:
- Related Keywords: 20 results ✅
- Keyword Ideas: ERROR (Timeout) ❌
- Keyword Overview: 0 results (Keyword unknown) ⚠️

Files Created:
- research/raw-api-data.json (45 KB, nur related_keywords)
- research/phase-1a-summary.md

Warnings: 2
Phase 1B kann mit eingeschränkten Daten fortfahren.
```

---

## Validation (Minimal)

**WICHTIG**: All quality validation is handled by Phase 1 Quality Check Agent (see `phase-1-quality-check.md`).

**Sub-Agent Responsibility in Phase 1A**:
1. ✅ Execute all 3 API calls
2. ✅ Save raw responses to `raw-api-data.json`
3. ✅ Create phase-1a-summary.md

**QC-Agent will validate**:
- All 3 API calls returned `status: "success"`
- Total keywords ≥30 across all APIs
- File size ≥1 KB

**NO validation in Phase 1A** - Quality-Check-Agent handles all checks!

---

## Token Budget Breakdown

| Task | Tokens |
|------|--------|
| API Calls (3x parallel) | ~400 |
| Error Handling (QC-Agent delegation) | ~50 |
| JSON File schreiben | ~100 |
| Summary erstellen | ~50 |
| mkdir -p command | ~10 |
| **TOTAL** | **~610** ✅ |

---

**Version**: 2.0 (Split Refactor)
**Last Updated**: 2025-01-05
**Next Phase**: Phase 1B Keyword Analysis
