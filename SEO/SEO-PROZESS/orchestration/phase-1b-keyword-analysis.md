# Phase 1B: Keyword Analysis

**Agent**: `seo-content-writer`

---

## Input
- `PRIMARY_KEYWORD`: Target keyword
- `OUTPUT_DIR`: Base folder

---

## Goal: Multi-Keyword Ranking Strategy

**Problem**: Einzelne Artikel ranken nur für 3-5 Keywords in Top 10.
**Ziel**: Artikel sollen für 15-25+ Keyword-Variationen in Top 10 ranken (wie CAVALLO).

**Strategie**:
1. Mehr Keywords sammeln (50+ statt 20)
2. Niedrigere Similarity-Schwelle (30% statt 40%)
3. Semantische Variationen erfassen (Singular/Plural, Synonyme, Fragen)

---

## Execution

### STEP 1: Load Data
Read: `{OUTPUT_DIR}/research/raw-api-data.json`

Extract all keywords from:
- `api_calls.related_keywords.data[]`
- `api_calls.keyword_ideas.data[]`
- `api_calls.keyword_overview.data[]`

Expected: 50-80 keywords total (increased from 35-50)

### STEP 2: Score Keywords (executeCode)

```python
import difflib

def calculate_relevance_score(kw, primary_keyword):
    """
    OPTIMIZED FORMULA (v3.0): Multi-Keyword Ranking Strategy

    GOAL: Capture 50+ keyword variations to rank for 15-25+ keywords in Top 10

    WEIGHTS:
    - Similarity: 50% (max 5.0 points) - Reduced to allow more variations
    - Search Volume: 30% (max 3.0 points) - Increased importance
    - CPC: 20% (max 2.0 points) - Commercial signal

    FILTERING LOGIC (RELAXED for more coverage):
    1. Minimum similarity: 0.30 (30%) - Lowered from 40% for semantic variations
    2. Word overlap: At least 1 core word must match (was 50%)
    3. Weak verb filtering: Common verbs require similarity >= 0.50 (was 0.60)
    4. German plural handling: Treats "pferd" and "pferde" as equivalent
    5. NEW: Question words (wie, was, warum) boost relevance

    Returns None for filtered keywords, dict with score data for valid keywords.
    """
    sv = kw.get('keyword_info', {}).get('search_volume', 0) or 0
    cpc = kw.get('keyword_info', {}).get('cpc', 0) or 0
    keyword_text = kw.get('keyword', '')

    # Calculate similarity
    similarity = difflib.SequenceMatcher(None, keyword_text.lower(), primary_keyword.lower()).ratio()

    # Filter 1: Minimum similarity threshold (LOWERED from 0.40 to 0.30)
    if similarity < 0.30:
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

    # For multi-word primary keywords, require at least 1 core word match (RELAXED from 50%)
    if len(primary_core) >= 2:
        if word_overlap < 1:  # Changed from len(primary_core) // 2
            return None
    elif len(primary_core) == 1:
        # For single-word primary, require exact match
        if word_overlap == 0:
            return None

    # Filter 3: Check for weak single-verb matches (RELAXED threshold)
    if word_overlap == 1 and len(primary_core) >= 2:
        matching_stems = primary_stems & keyword_stems
        common_verbs = {'kaufen', 'verkaufen', 'suchen', 'finden', 'haben', 'sein', 'werden'}

        # If only matching word is a common verb AND similarity is low, filter it
        if matching_stems <= common_verbs and similarity < 0.50:  # Lowered from 0.60
            return None

    # NEW: Question word bonus for informational keywords
    question_words = {'wie', 'was', 'warum', 'wann', 'wo', 'welche', 'welcher'}
    has_question = bool(keyword_words & question_words)
    question_bonus = 0.5 if has_question else 0

    # Calculate weighted components (REBALANCED for more keyword coverage)
    similarity_weight = similarity * 0.5 * 10  # max 5.0 (50%) - reduced from 60%
    sv_weight = min(sv / 1000, 10) * 0.30     # max 3.0 (30%) - increased from 25%
    cpc_weight = min(cpc * 10, 5) * 0.20      # max 2.0 (20%) - increased from 15%

    total = similarity_weight + sv_weight + cpc_weight + question_bonus

    return {
        'keyword': keyword_text,
        'search_volume': sv,
        'cpc': cpc,
        'relevance_score': round(total, 2),
        'similarity': round(similarity, 3),
        'word_overlap': word_overlap,
        'has_question_word': has_question,
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

### STEP 4: Select Top 50 Keywords (INCREASED from 20)
Sort by `relevance_score` DESC, take top 50 with cluster diversity (min 5 per cluster).

**Rationale**: More keywords = more ranking opportunities. CAVALLO ranks for 20+ variations per article.

### STEP 5: Save Results

**File 1**: `{OUTPUT_DIR}/research/keyword-analysis.json`
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "analyzed_at": "{ISO_TIMESTAMP}",
  "algorithm_version": "v3.0",
  "total_keywords_analyzed": 75,
  "top_keywords": [
    {
      "keyword": "...",
      "search_volume": 1200,
      "cpc": 0.45,
      "relevance_score": 8.2,
      "similarity": 0.65,
      "cluster_id": 2,
      "cluster_name": "Commercial",
      "word_count": 4,
      "has_question_word": false,
      "keyword_info": {}
    }
  ],
  "cluster_distribution": {
    "Informational": 12,
    "Commercial": 18,
    "Long-Tail": 10,
    "General": 10
  },
  "statistics": {
    "avg_search_volume": 856,
    "avg_cpc": 0.38,
    "avg_relevance_score": 5.8,
    "keywords_with_questions": 8
  }
}
```

**File 2**: `{OUTPUT_DIR}/research/phase-1b-summary.md`
```markdown
# Phase 1B: Keyword Analysis (v3.0)

**Keyword**: {PRIMARY_KEYWORD}
**Date**: {TIMESTAMP}
**Algorithm**: Multi-Keyword Ranking Strategy

## Results
- Total: 75 keywords analyzed
- Top 50 selected (increased from 20)
- Clusters: 4

## Cluster Distribution
- Informational: 12 (24%)
- Commercial: 18 (36%)
- Long-Tail: 10 (20%)
- General: 10 (20%)

## Statistics
- Avg SV: 856/month
- Avg CPC: €0.38
- Avg Score: 5.8/10
- Question Keywords: 8

## Algorithm Changes (v3.0)
- Similarity threshold: 30% (was 40%)
- Keyword limit: 50 (was 20)
- Question word bonus: +0.5 score

## Files
- keyword-analysis.json
```

### STEP 6: Return Summary
```
Phase 1B ✅ (v3.0 Multi-Keyword Strategy)

Analysis:
- 75 keywords analyzed
- Top 50 selected (2.5x increase)
- 4 clusters

Distribution:
- Informational: 12 (24%)
- Commercial: 18 (36%)
- Long-Tail: 10 (20%)
- General: 10 (20%)

Stats: SV=856, CPC=€0.38, Score=5.8, Questions=8

Files: keyword-analysis.json, phase-1b-summary.md

Ready for Phase 1C (Competitor Analysis)
```

---

**v3.0 Multi-Keyword Strategy** | Updated: 2025-11-30 | Goal: 15-25+ Top 10 Rankings per Article
