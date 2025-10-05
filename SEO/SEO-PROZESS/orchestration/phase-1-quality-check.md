# Phase 1 Quality Check: Automated Validation & Retry

**Ziel**: Validierung von Phase 1A+1B Outputs mit automatischer Retry-Logik (KEINE User-Prompts!)

**Token Budget**: ~300 tokens
**Execution Time**: 1-2 Minuten
**Subagent Type**: `seo-quality-checker`

---

## Eingabe-Parameter

- `PRIMARY_KEYWORD`: Das Ziel-Keyword (z.B. "pferd kaufen worauf achten")
- `OUTPUT_DIR`: Basis-Ordner für alle Outputs (z.B. `SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/`)

---

## STEP 1: Phase 1A Output Validation

**AKTION: Validiere raw-api-data.json**

File: `{OUTPUT_DIR}/research/raw-api-data.json`

### Validation Gates:

1. **File Exists Check**
   - File muss existieren und ≥1 KB groß sein
   - WENN FAIL → Status: `ABORT`, Reason: "Phase 1A Output fehlt komplett"

2. **API Call Success Check**
   - Prüfe `api_calls.related_keywords.status` = "success"
   - Prüfe `api_calls.keyword_ideas.status` = "success"
   - Prüfe `api_calls.keyword_overview.status` = "success"
   - **ALLE 3 müssen erfolgreich sein!** (nicht nur ≥1)
   - WENN FAIL → Speichere failed_apis (Liste)

3. **Minimum Keywords Check**
   - Zähle Total Keywords aus allen 3 API Responses:
     - `count_related = len(api_calls.related_keywords.data)`
     - `count_ideas = len(api_calls.keyword_ideas.data)`
     - `count_overview = 1 if api_calls.keyword_overview.data else 0`
     - `total_keywords = count_related + count_ideas + count_overview`
   - **Min Threshold: ≥30 Keywords**
   - WENN FAIL → Speichere actual_count

**Speichere Result**: `phase_1a_validation` (dict)

```python
phase_1a_validation = {
    "valid": True|False,
    "file_exists": True|False,
    "all_apis_success": True|False,
    "failed_apis": [],  # z.B. ["keyword_ideas"]
    "total_keywords": 45,
    "meets_threshold": True|False,  # ≥30?
    "errors": []
}
```

---

## STEP 2: Phase 1B Output Validation

**AKTION: Validiere keyword-analysis.json**

File: `{OUTPUT_DIR}/research/keyword-analysis.json`

### Validation Gates:

1. **File Exists Check**
   - File muss existieren und ≥5 KB groß sein
   - WENN FAIL → Status: `ABORT`, Reason: "Phase 1B Output fehlt komplett"

2. **Minimum Top Keywords Check**
   - Prüfe `len(top_keywords)` ≥ **15** (NICHT ≥10!)
   - WENN FAIL → Speichere actual_count

3. **Cluster Diversity Check**
   - Zähle unique `cluster_id` in `top_keywords`
   - **Min Threshold: ≥3 verschiedene Cluster**
   - WENN FAIL → Speichere actual_cluster_count

4. **Average Relevance Score Check**
   - Berechne `avg_score = mean([kw.relevance_score for kw in top_keywords])`
   - **Min Threshold: ≥5.0/8.5**
   - WENN FAIL → Speichere actual_avg_score

**Speichere Result**: `phase_1b_validation` (dict)

```python
phase_1b_validation = {
    "valid": True|False,
    "file_exists": True|False,
    "top_keywords_count": 20,
    "meets_min_keywords": True|False,  # ≥15?
    "cluster_count": 4,
    "meets_cluster_diversity": True|False,  # ≥3?
    "avg_relevance_score": 6.4,
    "meets_score_threshold": True|False,  # ≥5.0?
    "errors": []
}
```

---

## STEP 3: Automatic Retry Logic (NO USER PROMPTS!)

**WICHTIG**: Alle Retry-Entscheidungen erfolgen AUTOMATISCH ohne User-Input!

### Retry Strategy 1: Phase 1A Failed

**WENN** `phase_1a_validation.valid == False`:

```python
if retry_count_1a < 2:
    # Automatic Retry with adjusted parameters
    print("Phase 1A FAILED - Auto-Retry {retry_count_1a + 1}/2")

    # Adjusted Parameters:
    params = {
        "depth": 2,        # Original: 1
        "limit": 30,       # Original: 20/15
        "location_name": "Germany",
        "language_code": "de"
    }

    # Spawn new Sub-Agent für Phase 1A Retry
    # → Main Agent wird Task Tool aufrufen mit adjusted params

    return {
        "status": "RETRY_1A",
        "retry_count": retry_count_1a + 1,
        "adjusted_params": params,
        "reason": f"Total Keywords: {phase_1a_validation.total_keywords} < 30 OR API failures: {phase_1a_validation.failed_apis}"
    }
else:
    # Max Retries erreicht → ABORT
    return {
        "status": "ABORT",
        "reason": "Phase 1A failed after 2 retries",
        "details": phase_1a_validation
    }
```

### Retry Strategy 2: Phase 1B Failed (BUT Phase 1A Valid)

**WENN** `phase_1a_validation.valid == True` AND `phase_1b_validation.valid == False`:

```python
if retry_count_1b < 2:
    # Automatic Retry with adjusted scoring weights
    print("Phase 1B FAILED - Auto-Retry {retry_count_1b + 1}/2")

    # Adjusted Scoring Weights:
    adjusted_weights = {
        "sv_weight_factor": 0.3,       # Original: 0.4
        "cpc_weight_factor": 0.3,      # Original: 0.3 (unchanged)
        "similarity_weight_factor": 0.4 # Original: 0.3 (increased!)
    }

    # Spawn new Sub-Agent für Phase 1B Retry
    # → Main Agent wird Task Tool aufrufen mit adjusted weights

    return {
        "status": "RETRY_1B",
        "retry_count": retry_count_1b + 1,
        "adjusted_weights": adjusted_weights,
        "reason": f"Top Keywords: {phase_1b_validation.top_keywords_count} < 15 OR Avg Score: {phase_1b_validation.avg_relevance_score} < 5.0"
    }
else:
    # Max Retries erreicht → ABORT
    return {
        "status": "ABORT",
        "reason": "Phase 1B failed after 2 retries",
        "details": phase_1b_validation
    }
```

### Success Case: Both Phases Valid

**WENN** `phase_1a_validation.valid == True` AND `phase_1b_validation.valid == True`:

```python
return {
    "status": "PASSED",
    "phase_1a_summary": {
        "total_keywords": phase_1a_validation.total_keywords,
        "all_apis_success": True
    },
    "phase_1b_summary": {
        "top_keywords_count": phase_1b_validation.top_keywords_count,
        "cluster_count": phase_1b_validation.cluster_count,
        "avg_relevance_score": phase_1b_validation.avg_relevance_score
    },
    "next_action": "PROCEED_TO_PHASE_2"
}
```

---

## STEP 4: Output erstellen

**File: Quality Report** (`{OUTPUT_DIR}/quality/phase-1-quality-report.json`)

**WICHTIG**: Ordner `{OUTPUT_DIR}/quality/` MUSS existieren!

```bash
mkdir -p {OUTPUT_DIR}/quality
```

Format:
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "validated_at": "{ISO_TIMESTAMP}",
  "status": "PASSED|RETRY_1A|RETRY_1B|ABORT",
  "phase_1a_validation": {
    "valid": true,
    "total_keywords": 45,
    "all_apis_success": true,
    "errors": []
  },
  "phase_1b_validation": {
    "valid": true,
    "top_keywords_count": 20,
    "cluster_count": 4,
    "avg_relevance_score": 6.4,
    "errors": []
  },
  "retry_info": {
    "retry_count_1a": 0,
    "retry_count_1b": 0,
    "total_retries": 0,
    "adjusted_params": null
  },
  "next_action": "PROCEED_TO_PHASE_2|RETRY_1A|RETRY_1B|ABORT"
}
```

---

## STEP 5: Return Summary (Main Agent)

**WICHTIG**: Gib NUR eine kompakte Summary zurück, NICHT die kompletten Validation Details!

### Success Case Format:
```
QUALITY CHECK PASSED ✅

Phase 1A Validation:
- Total Keywords: 45 ✅ (≥30)
- All API Calls: SUCCESS ✅
- File: raw-api-data.json (85 KB)

Phase 1B Validation:
- Top Keywords: 20 ✅ (≥15)
- Cluster Diversity: 4 clusters ✅ (≥3)
- Avg Relevance Score: 6.4/8.5 ✅ (≥5.0)
- File: keyword-analysis.json (15 KB)

Retry Count: 0/2 (no retries needed)

Files Created:
- quality/phase-1-quality-report.json (2 KB)

Next Action: PROCEED_TO_PHASE_2
```

### Retry Case Format (Phase 1A):
```
QUALITY CHECK RETRY ⚠️

Phase 1A Validation FAILED:
- Total Keywords: 18 ❌ (< 30)
- Failed APIs: keyword_ideas ❌
- File: raw-api-data.json (22 KB)

Auto-Retry 1/2 with adjusted parameters:
- depth: 2 (was: 1)
- limit: 30 (was: 20)

Action: Spawning Phase 1A Sub-Agent with retry params...
```

### Retry Case Format (Phase 1B):
```
QUALITY CHECK RETRY ⚠️

Phase 1A: VALID ✅ (45 keywords)

Phase 1B Validation FAILED:
- Top Keywords: 12 ❌ (< 15)
- Avg Score: 4.2/8.5 ❌ (< 5.0)

Auto-Retry 1/2 with adjusted scoring weights:
- similarity_weight: 0.4 (was: 0.3)
- sv_weight: 0.3 (was: 0.4)

Action: Spawning Phase 1B Sub-Agent with adjusted weights...
```

### Abort Case Format:
```
QUALITY CHECK FAILED ❌

Phase 1A: FAILED after 2 retries
- Total Keywords: 18 (< 30)
- Failed APIs: keyword_ideas, keyword_overview

Phase 1B: NOT EXECUTED (depends on Phase 1A)

Files Created:
- quality/phase-1-quality-report.json (ABORT details)

ABORT REASON: Phase 1A konnte nicht genug Keywords sammeln nach 2 Retry-Versuchen.

RECOMMENDED ACTION:
- Prüfe DataForSEO MCP Server Status: `claude mcp list`
- Prüfe PRIMARY_KEYWORD auf Gültigkeit
- Evtl. andere Keyword-Variante versuchen
```

---

## Integration mit Main Agent (Delegation Pattern)

**Main Agent ruft Quality-Check-Agent auf NACH Phase 1B**:

```xml
<!-- Main Agent spawnt Quality-Check-Agent nach Phase 1B -->
<invoke name="Task">
<parameter name="subagent_type">seo-quality-checker</parameter>
<parameter name="prompt">
QUALITY CHECK: Phase 1A+1B

TARGET: '{PRIMARY_KEYWORD}'
OUTPUT_DIR: SEO/SEO-CONTENT/{keyword-slug}/

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
```

**Main Agent Response auf QC-Agent Return**:

```python
if qc_result.status == "PASSED":
    # Continue to Phase 2
    spawn_phase_2_agent()

elif qc_result.status == "RETRY_1A":
    # Spawn Phase 1A with adjusted params
    spawn_phase_1a_agent(
        params=qc_result.adjusted_params,
        retry_count=qc_result.retry_count
    )
    # Then re-run Phase 1B
    # Then re-run QC

elif qc_result.status == "RETRY_1B":
    # Spawn Phase 1B with adjusted weights
    spawn_phase_1b_agent(
        weights=qc_result.adjusted_weights,
        retry_count=qc_result.retry_count
    )
    # Then re-run QC

elif qc_result.status == "ABORT":
    # Stop workflow, report to user
    print(f"Workflow ABORTED: {qc_result.reason}")
```

---

## Error Cases

### Case 1: Both Phases fehlen komplett
```
QUALITY CHECK FAILED ❌

Error: Keine Output-Dateien gefunden!
- raw-api-data.json: NOT FOUND
- keyword-analysis.json: NOT FOUND

ABORT: Phase 1A+1B müssen zuerst ausgeführt werden.
ACTION REQUIRED: Führe `/seo {keyword}` Command aus.
```

### Case 2: Phase 1B fehlt (aber 1A vorhanden)
```
QUALITY CHECK PARTIAL ⚠️

Phase 1A: VALID ✅ (45 keywords)
Phase 1B: NOT FOUND ❌

ABORT: Phase 1B Output fehlt komplett.
ACTION REQUIRED: Führe Phase 1B aus mit gleichem PRIMARY_KEYWORD.
```

---

## Token Budget Breakdown

| Task | Tokens |
|------|--------|
| Phase 1A Validation (File Read + Checks) | ~80 |
| Phase 1B Validation (File Read + Checks) | ~80 |
| Retry Logic Evaluation | ~40 |
| Quality Report schreiben | ~50 |
| Summary erstellen | ~50 |
| **TOTAL** | **~300** ✅ |

---

**Version**: 1.0 (Initial Release)
**Last Updated**: 2025-01-05
**Previous Phases**: Phase 1A Data Collection → Phase 1B Keyword Analysis
**Next Phase**: Phase 2 SERP Analysis (wenn QC PASSED)
