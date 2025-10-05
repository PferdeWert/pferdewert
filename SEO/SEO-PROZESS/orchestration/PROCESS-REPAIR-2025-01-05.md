# Process Repair: SEO Pipeline Architecture Fix

**Date**: 2025-01-05
**Issue**: Sub-agents spawned via Task tool don't have MCP tool access (DataForSEO)
**Solution**: Hybrid Architecture - Main Agent handles API calls, Sub-Agents handle analysis

---

## Problem Analysis

### Original (Broken) Architecture
```
Main Agent → Spawns Sub-Agent → Sub-Agent uses DataForSEO MCP tools
                                  ❌ FAILS: Sub-agents have NO MCP access
```

### Root Cause
- Task tool creates isolated agent contexts
- MCP tools (DataForSEO) are NOT passed to spawned agents
- Sub-agents can only use: Read, Write, Edit, Bash - NO MCP tools

---

## Repaired Architecture

### NEW Pattern: Main Agent = Data Collection, Sub-Agent = Analysis
```
Phase Execution Flow:
1. Main Agent reads phase-MD file (~60k tokens - acceptable for single phase)
2. Main Agent makes ALL DataForSEO API calls
3. Main Agent saves raw API responses to files
4. Main Agent spawns Sub-Agent
5. Sub-Agent reads data files + instructions
6. Sub-Agent creates analysis/content deliverables
7. Sub-Agent returns compact summary (<200 words)
```

### Token Budget Impact
- **Before**: Main Agent never reads phase-MDs (0 tokens) ✓
- **After**: Main Agent reads ONE phase-MD at a time (60k tokens per phase) ✓
- **Critical**: Main Agent context is CLEARED after each phase (no accumulation)

---

## Updated Phase-1 Workflow

### Step 1: Main Agent Execution
```xml
<!-- Main Agent reads phase-1 instructions -->
<invoke name="Read">
<parameter name="file_path">SEO/SEO-PROZESS/orchestration/phase-1-keyword-research.md</parameter>
</invoke>

<!-- Main Agent makes API calls -->
<invoke name="mcp__dataforseo__dataforseo_labs_google_related_keywords">
<parameter name="keyword">{PRIMARY_KEYWORD}</parameter>
<parameter name="location_name">Germany</parameter>
<parameter name="language_code">de</parameter>
<parameter name="depth">1</parameter>
<parameter name="limit">20</parameter>
</invoke>

<invoke name="mcp__dataforseo__dataforseo_labs_google_keyword_ideas">
<parameter name="keywords">["{PRIMARY_KEYWORD}"]</parameter>
<parameter name="location_name">Germany</parameter>
<parameter name="language_code">de</parameter>
<parameter name="limit">15</parameter>
</invoke>

<!-- Main Agent saves raw data -->
<invoke name="Write">
<parameter name="file_path">SEO/SEO-CONTENT/{keyword-slug}/research/raw-related-keywords.json</parameter>
<parameter name="content">{API_RESPONSE_1}</parameter>
</invoke>

<invoke name="Write">
<parameter name="file_path">SEO/SEO-CONTENT/{keyword-slug}/research/raw-keyword-ideas.json</parameter>
<parameter name="content">{API_RESPONSE_2}</parameter>
</invoke>
```

### Step 2: Sub-Agent Delegation
```xml
<!-- Main Agent spawns Sub-Agent with clear instructions -->
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
PHASE 1 KEYWORD ANALYSIS

Your task:
1. Read raw API data from:
   - SEO/SEO-CONTENT/{keyword-slug}/research/raw-related-keywords.json
   - SEO/SEO-CONTENT/{keyword-slug}/research/raw-keyword-ideas.json

2. Create analysis deliverables:
   - SEO/SEO-CONTENT/{keyword-slug}/research/keyword-analysis.json
     (Top 20 keywords with metrics: search_volume, competition, intent)

   - SEO/SEO-CONTENT/{keyword-slug}/research/keyword-summary.md
     (Human-readable summary with strategic recommendations)

3. Return compact summary (<200 words):
   - Total keywords found
   - Top 3 keywords with metrics
   - Key insights for content strategy

DO NOT make any API calls - all data is already provided in files.
</parameter>
</invoke>
```

---

## Benefits of Repaired Architecture

✅ **Main Agent has MCP access** - can make DataForSEO calls
✅ **Sub-Agent focuses on analysis** - processes data, creates deliverables
✅ **Clear separation of concerns** - API calls vs. content creation
✅ **Context budget maintained** - phase-MDs read one at a time, context cleared between phases
✅ **Parallel API calls still possible** - Main Agent can invoke multiple MCP tools simultaneously

---

## Implementation Checklist

- [ ] Update `phase-1-keyword-research.md` with new architecture
- [ ] Update `phase-2-serp-analysis.md` with new architecture
- [ ] Update `phase-3-outline.md` with new architecture
- [ ] Update `phase-4-content.md` with new architecture
- [ ] Update `phase-5-onpage-seo.md` with new architecture
- [ ] Update `phase-6-quality-check.md` with new architecture
- [ ] Update `seo-workflow-index.md` with corrected delegation pattern
- [ ] Test full pipeline with "pferd kaufen" keyword

---

## Next Steps

1. Backup old phase-MD files (archiv folder)
2. Implement repaired architecture in all 6 phase files
3. Test with real keyword: "pferd kaufen"
4. Validate that all 35+ deliverables are created correctly
