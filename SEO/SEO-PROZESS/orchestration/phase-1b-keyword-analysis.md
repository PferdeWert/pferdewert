# Phase 1B: Keyword Analysis

**Agent**: `seo-content-writer`

---

## Input
- `PRIMARY_KEYWORD`: Target keyword
- `OUTPUT_DIR`: Base folder

---

## Execution

### STEP 1: Load Data
Read: `{OUTPUT_DIR}/research/raw-api-data.json`

Extract all keywords from:
- `api_calls.related_keywords.data[]`
- `api_calls.keyword_ideas.data[]`
- `api_calls.keyword_overview.data[]`

Expected: 35-50 keywords total

### STEP 2: Score Keywords (executeCode)

```python
import difflib

def calculate_relevance_score(kw, primary_keyword):
    """
    OPTIMIZED FORMULA (v2.2): Relevance-first scoring with smart filtering

    WEIGHTS:
    - Similarity: 60% (max 6.0 points) - Prioritizes relevance
    - Search Volume: 25% (max 2.5 points) - Secondary factor
    - CPC: 15% (max 1.5 points) - Commercial signal

    FILTERING LOGIC:
    1. Minimum similarity: 0.40 (40%) - Filters highly irrelevant keywords
    2. Word overlap: At least 50% of core words must match for multi-word primaries
    3. Weak verb filtering: Common verbs (kaufen, verkaufen) require similarity >= 0.60
    4. German plural handling: Treats "pferd" and "pferde" as equivalent

    Returns None for filtered keywords, dict with score data for valid keywords.
    """
    sv = kw.get('keyword_info', {}).get('search_volume', 0) or 0
    cpc = kw.get('keyword_info', {}).get('cpc', 0) or 0
    keyword_text = kw.get('keyword', '')

    # Calculate similarity
    similarity = difflib.SequenceMatcher(None, keyword_text.lower(), primary_keyword.lower()).ratio()

    # Filter 1: Minimum similarity threshold
    if similarity < 0.40:
        return None

    # Filter 2: Smart word overlap check with plural handling
    primary_words = set(primary_keyword.lower().split())
    keyword_words = set(keyword_text.lower().split())

    # Stop words to exclude
    stop_words = {'der', 'die', 'das', 'den', 'dem', 'in', 'zu', 'von', 'mit', 'für', 'auf', 'an', 'bei'}

    # Get core words
    primary_core = primary_words - stop_words
    keyword_core = keyword_words - stop_words

    # Handle German plurals (pferd/pferde)
    primary_stems = set()
    keyword_stems = set()

    for word in primary_core:
        primary_stems.add(word)
        if word.endswith('e'):
            primary_stems.add(word[:-1])  # pferde → pferd

    for word in keyword_core:
        keyword_stems.add(word)
        if word.endswith('e'):
            keyword_stems.add(word[:-1])  # pferde → pferd

    # Calculate overlap using stems (handles plurals)
    word_overlap = len(primary_stems & keyword_stems)

    # For multi-word primary keywords, require proportional overlap
    if len(primary_core) >= 2:
        required_overlap = max(1, len(primary_core) // 2)  # At least 50%
        if word_overlap < required_overlap:
            return None
    elif len(primary_core) == 1:
        # For single-word primary, require exact match
        if word_overlap == 0:
            return None

    # Filter 3: Check for weak single-verb matches
    if word_overlap == 1 and len(primary_core) >= 2:
        matching_stems = primary_stems & keyword_stems
        common_verbs = {'kaufen', 'verkaufen', 'suchen', 'finden', 'haben', 'sein', 'werden'}

        # If only matching word is a common verb AND similarity is low, filter it
        if matching_stems <= common_verbs and similarity < 0.60:
            return None

    # Calculate weighted components
    similarity_weight = similarity * 0.6 * 10  # max 6.0 (60%)
    sv_weight = min(sv / 1000, 10) * 0.25     # max 2.5 (25%)
    cpc_weight = min(cpc * 10, 5) * 0.15      # max 1.5 (15%)

    total = similarity_weight + sv_weight + cpc_weight

    return {
        'keyword': keyword_text,
        'search_volume': sv,
        'cpc': cpc,
        'relevance_score': round(total, 2),
        'similarity': round(similarity, 3),
        'word_overlap': word_overlap,
        'keyword_info': kw.get('keyword_info', {})
    }

# Score and filter keywords
scored_keywords = []
for kw in all_keywords:
    result = calculate_relevance_score(kw, PRIMARY_KEYWORD)
    if result is not None:  # Only include keywords that passed filtering
        scored_keywords.append(result)

scored_keywords.sort(key=lambda x: x['relevance_score'], reverse=True)
```

### STEP 3: Cluster Keywords (executeCode)

```python
def cluster_keywords_by_intent(scored_keywords):
    clustered = []
    for kw in scored_keywords:
        keyword_lower = kw['keyword'].lower()
        word_count = len(keyword_lower.split())

        if any(x in keyword_lower for x in ['wie', 'was', 'warum', 'ratgeber', 'tipps']):
            cluster = {'id': 1, 'name': 'Informational'}
        elif any(x in keyword_lower for x in ['kaufen', 'verkaufen', 'preis', 'kosten']):
            cluster = {'id': 2, 'name': 'Commercial'}
        elif word_count > 5:
            cluster = {'id': 4, 'name': 'Long-Tail'}
        else:
            cluster = {'id': 0, 'name': 'General'}

        clustered.append({
            **kw,
            'cluster_id': cluster['id'],
            'cluster_name': cluster['name'],
            'word_count': word_count
        })
    return clustered

clustered_keywords = cluster_keywords_by_intent(scored_keywords)
```

### STEP 4: Select Top 20
Sort by `relevance_score` DESC, take top 20 with cluster diversity (min 2 per cluster).

### STEP 5: Save Results

**File 1**: `{OUTPUT_DIR}/research/keyword-analysis.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "analyzed_at": "{ISO_TIMESTAMP}",
  "total_keywords_analyzed": 45,
  "top_keywords": [
    {
      "keyword": "...",
      "search_volume": 1200,
      "cpc": 0.45,
      "relevance_score": 8.2,
      "cluster_id": 2,
      "cluster_name": "Commercial",
      "word_count": 4,
      "keyword_info": {}
    }
  ],
  "cluster_distribution": {
    "Informational": 5,
    "Commercial": 8,
    "Long-Tail": 4,
    "General": 3
  },
  "statistics": {
    "avg_search_volume": 856,
    "avg_cpc": 0.38,
    "avg_relevance_score": 6.4
  }
}
```

**File 2**: `{OUTPUT_DIR}/research/phase-1b-summary.md`
```markdown
# Phase 1B: Keyword Analysis

**Keyword**: {PRIMARY_KEYWORD}
**Date**: {TIMESTAMP}

## Results
- Total: 45 keywords
- Top 20 selected
- Clusters: 4

## Cluster Distribution
- Informational: 5 (25%)
- Commercial: 8 (40%)
- Long-Tail: 4 (20%)
- General: 3 (15%)

## Statistics
- Avg SV: 856/month
- Avg CPC: €0.38
- Avg Score: 6.4/8.5

## Files
- keyword-analysis.json
```

### STEP 6: Return Summary
```
Phase 1B ✅

Analysis:
- 45 keywords analyzed
- Top 20 selected
- 4 clusters

Distribution:
- Informational: 5 (25%)
- Commercial: 8 (40%)
- Long-Tail: 4 (20%)
- General: 3 (15%)

Stats: SV=856, CPC=€0.38, Score=6.4

Files: keyword-analysis.json, phase-1b-summary.md

Ready for Phase 2
```

---

**v2.2 Optimized** | Updated: 2025-01-10 | Algorithm: Relevance-First Scoring
