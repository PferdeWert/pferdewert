# Phase 1C: Competitor Ranked Keywords Analysis

**Agent**: `seo-content-writer`
**NEW in v3.0**: Added to capture keywords competitors rank for

---

## Purpose

**Problem**: Wir finden nur Keywords die semantisch ähnlich sind, aber verpassen Keywords für die Wettbewerber bereits ranken.

**Lösung**: Analysiere Top 3 SERP-Ergebnisse für das Primary Keyword und extrahiere deren rankende Keywords.

**Ziel**: 20-30 zusätzliche Keywords die nachweislich Traffic bringen.

---

## Input
- `PRIMARY_KEYWORD`: Target keyword
- `OUTPUT_DIR`: Base folder
- `keyword-analysis.json` from Phase 1B

---

## Execution

### STEP 1: Get SERP Results

Use DataForSEO API to get top 10 organic results:

```
mcp__dataforseo__serp_organic_live_advanced:
{
  "keyword": "{PRIMARY_KEYWORD}",
  "location_name": "Germany",
  "language_code": "de",
  "depth": 10
}
```

Extract top 3 competitor domains (exclude pferdewert.de).

### STEP 2: Get Competitor Ranked Keywords

For each of the top 3 competitors, call:

```
mcp__dataforseo__dataforseo_labs_google_ranked_keywords:
{
  "target": "{competitor_domain}",
  "location_name": "Germany",
  "language_code": "de",
  "limit": 50,
  "filters": [
    ["ranked_serp_element.serp_item.rank_group", "<=", 10]
  ],
  "order_by": ["keyword_data.keyword_info.search_volume,desc"]
}
```

### STEP 3: Filter & Merge Keywords

```python
def filter_competitor_keywords(competitor_keywords, primary_keyword, existing_keywords):
    """
    Filter competitor keywords for relevance to our topic.

    Criteria:
    1. Must contain at least 1 word from primary keyword (or horse-related term)
    2. Must not already be in existing_keywords (from Phase 1B)
    3. Must have search_volume > 50
    4. Must rank in Top 10 for competitor
    """
    horse_terms = {'pferd', 'pferde', 'reiter', 'reiten', 'stall', 'huf', 'fohlen',
                   'stute', 'hengst', 'wallach', 'rasse', 'zucht', 'equi'}

    primary_words = set(primary_keyword.lower().split())
    relevant_terms = primary_words | horse_terms

    existing_set = {kw['keyword'].lower() for kw in existing_keywords}

    filtered = []
    for kw in competitor_keywords:
        keyword_text = kw.get('keyword', '').lower()
        keyword_words = set(keyword_text.split())

        # Check relevance
        if not (keyword_words & relevant_terms):
            continue

        # Check not duplicate
        if keyword_text in existing_set:
            continue

        # Check search volume
        sv = kw.get('keyword_data', {}).get('keyword_info', {}).get('search_volume', 0)
        if sv < 50:
            continue

        # Check rank
        rank = kw.get('ranked_serp_element', {}).get('serp_item', {}).get('rank_group', 100)
        if rank > 10:
            continue

        filtered.append({
            'keyword': kw.get('keyword'),
            'search_volume': sv,
            'competitor_rank': rank,
            'competitor_domain': kw.get('source_domain'),
            'source': 'competitor_analysis',
            'cpc': kw.get('keyword_data', {}).get('keyword_info', {}).get('cpc', 0)
        })

    return filtered

# Merge and deduplicate
all_competitor_keywords = []
for competitor in top_3_competitors:
    filtered = filter_competitor_keywords(
        competitor['ranked_keywords'],
        PRIMARY_KEYWORD,
        existing_keywords_from_1b
    )
    all_competitor_keywords.extend(filtered)

# Deduplicate by keyword
seen = set()
unique_competitor_keywords = []
for kw in sorted(all_competitor_keywords, key=lambda x: x['search_volume'], reverse=True):
    if kw['keyword'].lower() not in seen:
        seen.add(kw['keyword'].lower())
        unique_competitor_keywords.append(kw)

# Take top 30
final_competitor_keywords = unique_competitor_keywords[:30]
```

### STEP 4: Save Results

**File 1**: `{OUTPUT_DIR}/research/competitor-keywords.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "analyzed_at": "{ISO_TIMESTAMP}",
  "competitors_analyzed": [
    {
      "domain": "cavallo.de",
      "serp_position": 1,
      "keywords_extracted": 45
    },
    {
      "domain": "pferde.de",
      "serp_position": 2,
      "keywords_extracted": 38
    },
    {
      "domain": "ehorses.de",
      "serp_position": 3,
      "keywords_extracted": 42
    }
  ],
  "competitor_keywords": [
    {
      "keyword": "pferd kaufen privat",
      "search_volume": 880,
      "cpc": 0.45,
      "competitor_rank": 3,
      "competitor_domain": "cavallo.de",
      "source": "competitor_analysis"
    }
  ],
  "statistics": {
    "total_extracted": 125,
    "after_filtering": 30,
    "avg_search_volume": 456,
    "avg_competitor_rank": 5.2
  }
}
```

**File 2**: `{OUTPUT_DIR}/research/phase-1c-summary.md`
```markdown
# Phase 1C: Competitor Keyword Analysis

**Keyword**: {PRIMARY_KEYWORD}
**Date**: {TIMESTAMP}

## Competitors Analyzed
1. cavallo.de (Position 1) - 45 keywords
2. pferde.de (Position 2) - 38 keywords
3. ehorses.de (Position 3) - 42 keywords

## Results
- Total extracted: 125 keywords
- After filtering: 30 relevant keywords
- Avg SV: 456/month
- Avg Competitor Rank: 5.2

## Top 10 Competitor Keywords
1. pferd kaufen privat (SV: 880, Rank: 3)
2. pferd kaufen worauf achten (SV: 720, Rank: 2)
3. ...

## Files
- competitor-keywords.json
```

### STEP 5: Merge with Phase 1B Keywords

Create combined keyword list:
- Phase 1B: 50 keywords (own research)
- Phase 1C: 30 keywords (competitor analysis)
- **Total: 80 keywords** for content optimization

**File 3**: `{OUTPUT_DIR}/research/all-keywords-merged.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "merged_at": "{ISO_TIMESTAMP}",
  "sources": {
    "phase_1b": 50,
    "phase_1c": 30,
    "total": 80
  },
  "all_keywords": [
    {
      "keyword": "...",
      "search_volume": 1200,
      "source": "phase_1b|phase_1c",
      "cluster_name": "Commercial",
      "priority": "high|medium|low"
    }
  ],
  "priority_keywords": {
    "high": ["top 20 by SV"],
    "medium": ["next 30"],
    "low": ["remaining 30"]
  }
}
```

### STEP 6: Return Summary

```
Phase 1C ✅ Competitor Keyword Analysis

Competitors:
- cavallo.de (Pos 1): 45 keywords
- pferde.de (Pos 2): 38 keywords
- ehorses.de (Pos 3): 42 keywords

Results:
- Extracted: 125 keywords
- Filtered: 30 relevant
- Merged Total: 80 keywords (50 from 1B + 30 from 1C)

Top Competitor Keywords:
1. pferd kaufen privat (SV: 880)
2. pferd kaufen worauf achten (SV: 720)
3. pferdekauf tipps (SV: 590)

Files: competitor-keywords.json, phase-1c-summary.md, all-keywords-merged.json

Ready for Phase 2 (SERP Analysis)
```

---

## Why This Matters

| Ohne Phase 1C | Mit Phase 1C |
|---------------|--------------|
| 20 Keywords | 80 Keywords |
| Nur semantisch ähnlich | + Competitor-proven keywords |
| 3-5 Top 10 Rankings | 15-25+ Top 10 Rankings |
| Keyword-Lücken | Keyword-Gap geschlossen |

---

## API Cost Estimate

- 1x SERP call: ~$0.002
- 3x Ranked Keywords: ~$0.006
- **Total per article: ~$0.008**

---

**v3.0** | Created: 2025-11-30 | Purpose: Multi-Keyword Ranking Strategy
