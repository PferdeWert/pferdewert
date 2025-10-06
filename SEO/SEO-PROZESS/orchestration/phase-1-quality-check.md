# Phase 1 Quality Check

**Token Budget**: ~300 | **Time**: 1-2 min | **Agent**: `seo-quality-checker`

---

## Input
- `PRIMARY_KEYWORD`: Target keyword
- `OUTPUT_DIR`: Base folder

---

## Execution

### STEP 1: Validate Phase 1A
Read: `{OUTPUT_DIR}/research/raw-api-data.json`

**Gates**:
1. File exists, ≥1 KB → else `ABORT`
2. All 3 API calls status = "success" → else store `failed_apis`
3. Total keywords ≥30 → else store `actual_count`

Result:
```python
phase_1a_validation = {
    "valid": True|False,
    "total_keywords": 45,
    "all_apis_success": True|False,
    "failed_apis": [],
    "errors": []
}
```

### STEP 2: Validate Phase 1B
Read: `{OUTPUT_DIR}/research/keyword-analysis.json`

**Gates**:
1. File exists, ≥5 KB → else `ABORT`
2. `len(top_keywords)` ≥15 → else store `actual_count`
3. Unique `cluster_id` count ≥3 → else store `actual_cluster_count`
4. `mean(relevance_score)` ≥5.0 → else store `actual_avg_score`

Result:
```python
phase_1b_validation = {
    "valid": True|False,
    "top_keywords_count": 20,
    "cluster_count": 4,
    "avg_relevance_score": 6.4,
    "errors": []
}
```

### STEP 3: Auto-Retry Logic

**If Phase 1A Failed**:
```python
if retry_count_1a < 2:
    return {
        "status": "RETRY_1A",
        "retry_count": retry_count_1a + 1,
        "adjusted_params": {"depth": 2, "limit": 30}
    }
else:
    return {"status": "ABORT", "reason": "Phase 1A failed after 2 retries"}
```

**If Phase 1B Failed (1A Valid)**:
```python
if retry_count_1b < 2:
    return {
        "status": "RETRY_1B",
        "retry_count": retry_count_1b + 1,
        "adjusted_weights": {"sv_weight": 0.3, "similarity_weight": 0.4}
    }
else:
    return {"status": "ABORT", "reason": "Phase 1B failed after 2 retries"}
```

**If Both Valid**:
```python
return {
    "status": "PASSED",
    "next_action": "PROCEED_TO_PHASE_2"
}
```

### STEP 4: Save Report

```bash
mkdir -p {OUTPUT_DIR}/quality
```

**File**: `{OUTPUT_DIR}/quality/phase-1-quality-report.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "validated_at": "{ISO_TIMESTAMP}",
  "status": "PASSED|RETRY_1A|RETRY_1B|ABORT",
  "phase_1a_validation": {"valid": true, "total_keywords": 45},
  "phase_1b_validation": {"valid": true, "top_keywords_count": 20, "avg_relevance_score": 6.4},
  "retry_info": {"retry_count_1a": 0, "retry_count_1b": 0},
  "next_action": "PROCEED_TO_PHASE_2|RETRY_1A|RETRY_1B|ABORT"
}
```

### STEP 5: Return Summary

**PASSED**:
```
QC PASSED ✅

1A: 45 keywords, all APIs success ✅
1B: 20 keywords, 4 clusters, score 6.4 ✅

Retries: 0/2
File: quality/phase-1-quality-report.json

Next: PROCEED_TO_PHASE_2
```

**RETRY_1A**:
```
QC RETRY ⚠️

1A FAILED: 18 keywords (< 30)

Auto-Retry 1/2:
- depth: 2 (was: 1)
- limit: 30 (was: 20)

Spawning Phase 1A with retry params...
```

**RETRY_1B**:
```
QC RETRY ⚠️

1A: VALID ✅
1B FAILED: 12 keywords (< 15)

Auto-Retry 1/2:
- similarity_weight: 0.4 (was: 0.3)

Spawning Phase 1B with adjusted weights...
```

**ABORT**:
```
QC FAILED ❌

1A: FAILED after 2 retries
1B: NOT EXECUTED

ABORT: Phase 1A konnte nicht genug Keywords sammeln.

CHECK:
- DataForSEO MCP: `claude mcp list`
- PRIMARY_KEYWORD Gültigkeit
```

---

**v2.1 Compact** | Updated: 2025-01-06
