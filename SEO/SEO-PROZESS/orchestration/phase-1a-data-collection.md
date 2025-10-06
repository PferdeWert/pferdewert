# Phase 1A: Keyword Data Collection

**Token Budget**: ~500 | **Time**: 2-3 min | **Agent**: `seo-content-writer`

---

## Input
- `PRIMARY_KEYWORD`: Target keyword
- `OUTPUT_DIR`: Base folder (e.g., `SEO/SEO-CONTENT/pferd-kaufen/`)

---

## Execution

### STEP 1: Create Folder
```bash
mkdir -p {OUTPUT_DIR}/research
```

### STEP 2: Execute API Calls (Parallel)

**Call all 3 functions in ONE message:**

**Function 1**: `mcp__dataforseo__dataforseo_labs_google_related_keywords`
```json
{
  "keyword": "{PRIMARY_KEYWORD}",
  "location_name": "Germany",
  "language_code": "de",
  "depth": 1,
  "limit": 20
}
```

**Function 2**: `mcp__dataforseo__dataforseo_labs_google_keyword_ideas`
```json
{
  "keywords": ["{PRIMARY_KEYWORD}"],
  "location_name": "Germany",
  "language_code": "de",
  "limit": 15
}
```

**Function 3**: `mcp__dataforseo__dataforseo_labs_google_keyword_overview`
```json
{
  "keywords": ["{PRIMARY_KEYWORD}"],
  "location_name": "Germany",
  "language_code": "de"
}
```

### STEP 3: Save Results

**File 1**: `{OUTPUT_DIR}/research/raw-api-data.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "collected_at": "{ISO_TIMESTAMP}",
  "api_calls": {
    "related_keywords": {"status": "success|error", "count": 20, "data": []},
    "keyword_ideas": {"status": "success|error", "count": 15, "data": []},
    "keyword_overview": {"status": "success|error", "data": {}}
  }
}
```

**File 2**: `{OUTPUT_DIR}/research/phase-1a-summary.md`
```markdown
# Phase 1A: Data Collection

**Keyword**: {PRIMARY_KEYWORD}
**Date**: {TIMESTAMP}

## Results
- Related Keywords: {count} results
- Keyword Ideas: {count} results
- Overview: SV={volume}, CPC={cpc}

## Files
- raw-api-data.json
```

### STEP 4: Return Summary
```
Phase 1A ✅

API Calls:
- Related: 20 ✅
- Ideas: 15 ✅
- Overview: SV=1200, CPC=€0.45 ✅

Files: raw-api-data.json, phase-1a-summary.md

Ready for Phase 1B
```

---

**v2.1 Compact** | Updated: 2025-01-06
