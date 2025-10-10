# Phase 1B Algorithm Changelog

## v2.2 (2025-01-10) - Relevance-First Scoring

### Problem
The v2.1 algorithm prioritized search volume (47% weight) over keyword relevance (35% weight), causing irrelevant high-search-volume keywords to rank in the top 20 results.

**Examples of problematic rankings:**
- "labubu kaufen" (SV=5,000) - Completely unrelated to horses
- "trojanisches pferd" (SV=3,000) - Historical reference, not literal horse
- These keywords ranked high solely due to search volume despite low relevance

### Solution
Implemented relevance-first scoring with intelligent filtering:

**Weight Distribution Changes:**
- Similarity: 35% → **60%** (max 6.0 points)
- Search Volume: 47% → **25%** (max 2.5 points)
- CPC: 18% → **15%** (max 1.5 points)

**New Filtering Logic:**
1. **Minimum Similarity Threshold**: 0.40 (40%)
   - Filters keywords with less than 40% text similarity to primary keyword

2. **Word Overlap Requirements**:
   - Multi-word primaries: At least 50% of core words must match
   - Single-word primaries: Exact word match required
   - Excludes German stop words (der, die, das, in, zu, etc.)

3. **Weak Verb Match Detection**:
   - Identifies keywords matching only on common verbs (kaufen, verkaufen, etc.)
   - Requires similarity ≥ 0.60 for verb-only matches
   - Prevents false positives like "labubu kaufen"

4. **German Plural Handling**:
   - Treats "pferd" and "pferde" as equivalent stems
   - Correctly handles plural variations in matching

### Validation Results

**Successfully Filtered (Irrelevant High-Volume Keywords):**
- ⛔ "labubu kaufen" (SV=5,000) - Filtered by weak verb match
- ⛔ "trojanisches pferd" (SV=3,000) - Filtered by low similarity (0.333)
- ⛔ "pferderasse" (SV=1,000) - Filtered by insufficient word overlap

**Top Rankings (Relevant Keywords Prioritized):**
1. "pferd kaufen" - Score: 8.83 | SIM=1.000 | SV=40,500
2. "pferd verkaufen" - Score: 7.36 | SIM=0.889 | SV=6,600
3. "pferd kaufen ebay" - Score: 5.78 | SIM=0.828 | SV=2,400
4. "reitpferd kaufen" - Score: 5.72 | SIM=0.857 | SV=800
5. "pferde kaufen in der nähe" - Score: 4.76 | SIM=0.649 | SV=2,400

**Key Improvements:**
- Relevant low-volume keywords now rank higher than irrelevant high-volume ones
- Plural forms handled correctly ("pferde kaufen" scores properly)
- Commercial intent keywords properly weighted
- Algorithm maintains performance constraints (~200 tokens, 2-3 min execution)

### Technical Details

**Algorithm Complexity:**
- No additional API calls required
- Uses existing `difflib.SequenceMatcher` for similarity
- Simple set operations for word overlap
- Execution time: ~0.1s for 50 keywords

**Output Format:**
Added fields to keyword objects:
- `similarity`: Decimal similarity score (0.000-1.000)
- `word_overlap`: Count of matching core words

**Backward Compatibility:**
- Maintains existing output structure
- Clustering logic unchanged (STEP 3)
- JSON output format unchanged

---

## v2.1 (2025-01-06) - Compact
Initial production version with basic relevance scoring.

**Weight Distribution:**
- Search Volume: 47% (max 4.0 points)
- Similarity: 35% (max 3.0 points)
- CPC: 18% (max 1.5 points)

**Limitations:**
- No filtering for irrelevant high-volume keywords
- No word overlap validation
- No plural handling for German keywords
