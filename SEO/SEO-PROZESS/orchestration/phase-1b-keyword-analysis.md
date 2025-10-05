# Phase 1B: Keyword Analysis

**Ziel**: Rohdaten aus Phase 1A analysieren, relevante Keywords clustern und Top 20 auswählen

**Token Budget**: ~200 tokens
**Execution Time**: 2-3 Minuten
**Subagent Type**: `seo-content-writer`

---

## Eingabe-Parameter

- `PRIMARY_KEYWORD`: Das Ziel-Keyword (z.B. "pferd kaufen worauf achten")
- `OUTPUT_DIR`: Basis-Ordner für alle Outputs (z.B. `SEO/SEO-CONTENT/pferd-kaufen-worauf-achten/`)

---

## STEP 1: Raw Data einlesen

**AKTION: Lies Phase 1A Output**

File: `{OUTPUT_DIR}/research/raw-api-data.json`

**WENN File nicht existiert oder < 1 KB**:
- ABORT mit Error: "Phase 1A muss zuerst ausgeführt werden"

**Extrahiere alle Keywords**:
- Aus `api_calls.related_keywords.data[]` → `keyword_data.keyword`
- Aus `api_calls.keyword_ideas.data[]` → `keyword`
- Aus `api_calls.keyword_overview.data[]` → `keyword`

Speichere in Variable: `all_keywords` (Liste von Keyword-Objekten)

**Erwarteter Umfang**: 35-50 Keywords total

---

## STEP 2: Relevance Scoring (Python Execution)

**AKTION: Berechne Relevanz-Scores mit executeCode Tool**

**WICHTIG**: Verwende `executeCode` Tool für alle Berechnungen, NICHT manuell!

### Execution Strategy (executeCode with Fallback):

**PRIMARY Method**: `executeCode` Tool (Jupyter Kernel)
- Preferred für konsistente Berechnungen
- Nutzt Jupyter Kernel im IDE

**FALLBACK Method**: Manual Python-Style Calculation
- Nur wenn executeCode Tool nicht verfügbar
- Gleiche Scoring-Formel, aber simplified implementation
- Nutze difflib-Logik direkt in Prompt-Response

**Implementation**:
```python
# TRY: executeCode Tool first
try:
    # Use executeCode with full scoring logic below
except ToolUnavailableError:
    # FALLBACK: Calculate scores manually with same formula
    # Continue workflow WITHOUT ABORT
    pass
```

### Scoring-Formel (Python):

```python
# Eingabe: all_keywords (Liste von Keyword-Objekten aus raw-api-data.json)
# Output: scored_keywords (Liste mit relevance_score)

def calculate_relevance_score(kw, primary_keyword):
    """
    Relevanz-Score Formel:
    Score = (Search Volume Weight) + (CPC Weight) + (Keyword Similarity Weight)

    - Search Volume Weight: min(search_volume / 1000, 10) * 0.4  (max 4 Punkte)
    - CPC Weight: min(cpc * 10, 5) * 0.3  (max 1.5 Punkte)
    - Keyword Similarity Weight: similarity_to_primary * 0.3 * 10  (max 3 Punkte)

    Max Score: 8.5 Punkte
    """
    import difflib

    sv = kw.get('keyword_info', {}).get('search_volume', 0) or 0
    cpc = kw.get('keyword_info', {}).get('cpc', 0) or 0
    keyword_text = kw.get('keyword', '')

    # Search Volume Weight (max 4.0)
    sv_weight = min(sv / 1000, 10) * 0.4

    # CPC Weight (max 1.5)
    cpc_weight = min(cpc * 10, 5) * 0.3

    # Keyword Similarity (max 3.0)
    similarity = difflib.SequenceMatcher(None, keyword_text.lower(), primary_keyword.lower()).ratio()
    similarity_weight = similarity * 0.3 * 10

    total_score = sv_weight + cpc_weight + similarity_weight

    return {
        'keyword': keyword_text,
        'search_volume': sv,
        'cpc': cpc,
        'relevance_score': round(total_score, 2),
        'keyword_info': kw.get('keyword_info', {})
    }

# Berechne Scores für alle Keywords
scored_keywords = [calculate_relevance_score(kw, PRIMARY_KEYWORD) for kw in all_keywords]

# Sortiere nach Score (descending)
scored_keywords.sort(key=lambda x: x['relevance_score'], reverse=True)
```

**Speichere Result in Variable**: `scored_keywords`

---

## STEP 3: Keyword Clustering

**AKTION: Clustere Keywords nach Intent mit executeCode Tool**

### Clustering-Algorithmus (Python):

```python
# Eingabe: scored_keywords
# Output: clustered_keywords (mit cluster_id und cluster_name)

def cluster_keywords_by_intent(scored_keywords):
    """
    Einfacher Intent-Clustering basierend auf Keyword-Struktur:
    - Cluster 1 (Informational): enthält "wie", "was", "warum", "ratgeber", "tipps"
    - Cluster 2 (Commercial): enthält "kaufen", "verkaufen", "preis", "kosten"
    - Cluster 3 (Navigational): enthält Markennamen, spezifische Orte
    - Cluster 4 (Long-Tail): > 5 Wörter
    - Cluster 5 (Exact Match): sehr ähnlich zu PRIMARY_KEYWORD (similarity > 0.8)
    """

    clustered = []

    for kw in scored_keywords:
        keyword_lower = kw['keyword'].lower()
        word_count = len(keyword_lower.split())

        # Cluster-Logik
        if any(x in keyword_lower for x in ['wie', 'was', 'warum', 'ratgeber', 'tipps', 'anleitung']):
            cluster = {'id': 1, 'name': 'Informational'}
        elif any(x in keyword_lower for x in ['kaufen', 'verkaufen', 'preis', 'kosten', 'wert']):
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

**Speichere Result in Variable**: `clustered_keywords`

---

## STEP 4: Top 20 Keyword Selection

**AKTION: Wähle Top 20 Keywords aus**

**Selection Strategy**:
1. Sortiere `clustered_keywords` nach `relevance_score` (DESC)
2. Stelle sicher: Min 2 Keywords aus jedem Cluster (Diversität)
3. Nehme Top 20 Keywords

**WENN < 20 Keywords vorhanden**:
- Nehme alle verfügbaren Keywords
- Logge Warning: "Nur {count} Keywords verfügbar (< 20)"

**Speichere in Variable**: `top_keywords` (Liste von 20 Keyword-Objekten)

---

## STEP 5: Output erstellen

**File 1: Keyword Analysis** (`{OUTPUT_DIR}/research/keyword-analysis.json`)

Format:
```json
{
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "analyzed_at": "{ISO_TIMESTAMP}",
  "total_keywords_analyzed": 45,
  "top_keywords": [
    {
      "keyword": "pferd kaufen worauf achten",
      "search_volume": 1200,
      "cpc": 0.45,
      "relevance_score": 8.2,
      "cluster_id": 2,
      "cluster_name": "Commercial",
      "word_count": 4,
      "keyword_info": { /* Full keyword_info object */ }
    },
    // ... 19 weitere Keywords
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
    "avg_relevance_score": 6.4,
    "min_score": 4.2,
    "max_score": 8.5
  }
}
```

**WICHTIG**:
- Speichere ALLE 20 Keywords komplett (mit `keyword_info` object)
- Berechne `cluster_distribution` aus Top 20
- Berechne `statistics` aus Top 20

**File 2: Phase 1B Summary** (`{OUTPUT_DIR}/research/phase-1b-summary.md`)

Format:
```markdown
# Phase 1B Summary: Keyword Analysis

**Primary Keyword**: {PRIMARY_KEYWORD}
**Executed**: {TIMESTAMP}

## Analysis Results

### Keywords Processed
- Total Analyzed: 45 keywords
- Top Keywords Selected: 20 keywords
- Clusters Identified: 4 clusters

### Cluster Distribution (Top 20)
- Informational: 5 keywords (25%)
- Commercial: 8 keywords (40%)
- Long-Tail: 4 keywords (20%)
- General: 3 keywords (15%)

### Statistics (Top 20)
- Avg Search Volume: 856/month
- Avg CPC: €0.38
- Avg Relevance Score: 6.4/8.5
- Score Range: 4.2 - 8.5

## Top 5 Keywords Preview
1. pferd kaufen worauf achten (SV: 1200, Score: 8.2) [Commercial]
2. pferd kaufen tipps (SV: 980, Score: 7.8) [Informational]
3. pferdekauf worauf achten (SV: 890, Score: 7.5) [Commercial]
4. ...

## Next Steps
Phase 2 wird diese Keywords für SERP-Analyse nutzen.

## Files Created
- keyword-analysis.json
- phase-1b-summary.md
```

---

## STEP 6: Return Summary (Main Agent)

**WICHTIG**: Gib NUR eine kompakte Summary zurück (max 150 Wörter), NICHT die kompletten Keyword-Listen!

Format:
```
Phase 1B COMPLETED ✅

Analysis:
- Total Keywords Analyzed: 45
- Top 20 Selected: ✅
- Clusters Identified: 4 (Informational, Commercial, Long-Tail, General)

Cluster Distribution (Top 20):
- Informational: 5 (25%)
- Commercial: 8 (40%)
- Long-Tail: 4 (20%)
- General: 3 (15%)

Statistics:
- Avg Search Volume: 856/month
- Avg CPC: €0.38
- Avg Relevance Score: 6.4/8.5

Files Created:
- research/keyword-analysis.json (15 KB)
- research/phase-1b-summary.md (1 KB)

Warnings: 0
Errors: 0

Ready for Phase 2: SERP Analysis
```

---

## Error Cases

### Case 1: Phase 1A Output fehlt
```
Phase 1B FAILED ❌

Error: raw-api-data.json nicht gefunden in {OUTPUT_DIR}/research/

ABORT: Phase 1A muss zuerst ausgeführt werden.
ACTION REQUIRED: Führe Phase 1A aus mit gleichem PRIMARY_KEYWORD.
```

### Case 2: Zu wenig Keywords (< 15)
```
Phase 1B COMPLETED ⚠️ (Low Data)

Analysis:
- Total Keywords Analyzed: 12 (< 15 expected)
- Top Keywords Selected: 12 (< 20)

Warning: Nur 12 Keywords verfügbar. Empfehlung:
- Phase 1A wiederholen mit `depth: 2` für Related Keywords
- Oder fortfahren mit eingeschränktem Keyword-Set

Files Created:
- research/keyword-analysis.json (10 KB, nur 12 Keywords)
- research/phase-1b-summary.md

Phase 2 kann fortfahren, aber mit eingeschränkter SERP-Analyse.
```

### Case 3: executeCode Tool Fehler
```
Phase 1B FAILED ❌

Error: executeCode Tool konnte Relevance Scoring nicht ausführen
Details: [Python Error Message]

ABORT: Relevance Scoring ist essentiell für Top 20 Selection.
ACTION REQUIRED: Prüfe executeCode Tool Status im Jupyter Kernel.
```

---

## Validation (Minimal)

**NO HEAVY VALIDATION in Phase 1B!**

Einzige Checks:
1. ✅ `keyword-analysis.json` erstellt (> 5 KB)
2. ✅ Mind. 15 Keywords in `top_keywords` (Partial Success bei < 20)
3. ✅ Alle Scores zwischen 0-10 (Sanity Check)

**KEINE** der folgenden Checks (werden in Phase 6 gemacht):
- ❌ Keyword Quality Assessment
- ❌ Intent Matching Validation
- ❌ Competitor Keyword Overlap
- ❌ Semantic Similarity Deep Analysis

---

## Token Budget Breakdown

| Task | Tokens |
|------|--------|
| Raw Data einlesen | ~30 |
| Relevance Scoring (executeCode) | ~60 |
| Clustering (executeCode) | ~40 |
| Top 20 Selection | ~20 |
| JSON File schreiben | ~30 |
| Summary erstellen | ~20 |
| **TOTAL** | **~200** ✅ |

---

**Version**: 2.0 (Split Refactor)
**Last Updated**: 2025-01-05
**Previous Phase**: Phase 1A Data Collection
**Next Phase**: Phase 2 SERP Analysis
