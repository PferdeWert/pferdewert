#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Phase 1B: Keyword Analysis
Target: was kostet ein pferd
"""

import json
import difflib
from datetime import datetime

PRIMARY_KEYWORD = "was kostet ein pferd"
OUTPUT_DIR = "/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/SEO/SEO-CONTENT/was-kostet-ein-pferd"

def calculate_relevance_score(kw, primary_keyword):
    """
    OPTIMIZED FORMULA (v2.2): Relevance-first scoring with smart filtering
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

def cluster_keywords_by_intent(scored_keywords):
    """Cluster keywords by search intent"""
    clustered = []
    for kw in scored_keywords:
        keyword_lower = kw['keyword'].lower()
        word_count = len(keyword_lower.split())

        if any(x in keyword_lower for x in ['kaufen', 'verkaufen', 'preis', 'kost']):
            cluster = {'id': 2, 'name': 'Commercial'}
        elif any(x in keyword_lower for x in ['wie', 'was', 'warum', 'ratgeber', 'tipps']):
            cluster = {'id': 1, 'name': 'Informational'}
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

def main():
    # Load raw API data
    raw_data_path = f"{OUTPUT_DIR}/research/raw-api-data.json"
    with open(raw_data_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    # Extract all keywords from different API sources
    all_keywords = []

    # From keyword_overview
    if raw_data['api_calls']['keyword_overview']['status'] == 'success':
        overview_data = raw_data['api_calls']['keyword_overview']['data']
        all_keywords.append({
            'keyword': overview_data['keyword'],
            'keyword_info': {
                'search_volume': overview_data['search_volume'],
                'cpc': overview_data['cpc'],
                'competition_level': overview_data['competition_level'],
                'keyword_difficulty': overview_data['keyword_difficulty']
            }
        })

    # From keyword_suggestions
    if raw_data['api_calls']['keyword_suggestions']['status'] == 'success':
        for kw in raw_data['api_calls']['keyword_suggestions']['data']:
            all_keywords.append({
                'keyword': kw['keyword'],
                'keyword_info': {
                    'search_volume': kw['search_volume'],
                    'cpc': kw.get('cpc', 0),
                    'competition_level': kw['competition_level'],
                    'keyword_difficulty': kw.get('keyword_difficulty', 0)
                }
            })

    # From related_keywords
    if raw_data['api_calls']['related_keywords']['status'] == 'success':
        for kw in raw_data['api_calls']['related_keywords']['data']:
            # Check if keyword already exists
            if not any(k['keyword'] == kw['keyword'] for k in all_keywords):
                all_keywords.append({
                    'keyword': kw['keyword'],
                    'keyword_info': {
                        'search_volume': kw['search_volume'],
                        'cpc': kw.get('cpc', 0) or 0,
                        'competition_level': kw['competition_level'],
                        'keyword_difficulty': kw.get('keyword_difficulty', 0)
                    }
                })

    # From keyword_ideas
    if raw_data['api_calls']['keyword_ideas']['status'] == 'success':
        for kw in raw_data['api_calls']['keyword_ideas']['data']:
            # Check if keyword already exists
            if not any(k['keyword'] == kw['keyword'] for k in all_keywords):
                all_keywords.append({
                    'keyword': kw['keyword'],
                    'keyword_info': {
                        'search_volume': kw.get('search_volume', 0),
                        'cpc': kw.get('cpc', 0) or 0,
                        'competition_level': kw.get('competition_level', 'LOW'),
                        'keyword_difficulty': kw.get('keyword_difficulty', 0)
                    }
                })

    print(f"✓ Loaded {len(all_keywords)} unique keywords")

    # Score and filter keywords
    scored_keywords = []
    for kw in all_keywords:
        result = calculate_relevance_score(kw, PRIMARY_KEYWORD)
        if result is not None:
            scored_keywords.append(result)

    scored_keywords.sort(key=lambda x: x['relevance_score'], reverse=True)
    print(f"✓ Scored and filtered to {len(scored_keywords)} relevant keywords")

    # Cluster keywords
    clustered_keywords = cluster_keywords_by_intent(scored_keywords)
    print(f"✓ Clustered {len(clustered_keywords)} keywords")

    # Select top 20 with cluster diversity
    top_keywords = clustered_keywords[:20]

    # Calculate cluster distribution
    cluster_dist = {}
    for kw in top_keywords:
        cluster_name = kw['cluster_name']
        cluster_dist[cluster_name] = cluster_dist.get(cluster_name, 0) + 1

    # Calculate statistics
    total_sv = sum(kw['search_volume'] for kw in top_keywords)
    total_cpc = sum(kw['cpc'] for kw in top_keywords if kw['cpc'])
    cpc_count = sum(1 for kw in top_keywords if kw['cpc'])
    total_score = sum(kw['relevance_score'] for kw in top_keywords)

    stats = {
        'avg_search_volume': round(total_sv / len(top_keywords)),
        'avg_cpc': round(total_cpc / cpc_count, 2) if cpc_count > 0 else 0,
        'avg_relevance_score': round(total_score / len(top_keywords), 2)
    }

    # Create analysis output
    analysis_output = {
        'primary_keyword': PRIMARY_KEYWORD,
        'analyzed_at': datetime.utcnow().isoformat() + 'Z',
        'total_keywords_analyzed': len(scored_keywords),
        'top_keywords': top_keywords,
        'cluster_distribution': cluster_dist,
        'statistics': stats
    }

    # Save keyword-analysis.json
    analysis_path = f"{OUTPUT_DIR}/research/keyword-analysis.json"
    with open(analysis_path, 'w', encoding='utf-8') as f:
        json.dump(analysis_output, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved keyword-analysis.json")

    # Create summary report
    summary_md = f"""# Phase 1B: Keyword Analysis

**Keyword**: {PRIMARY_KEYWORD}
**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Results
- Total: {len(scored_keywords)} keywords analyzed
- Top 20 selected
- Clusters: {len(cluster_dist)}

## Cluster Distribution
"""
    for cluster, count in cluster_dist.items():
        percentage = round(count / len(top_keywords) * 100)
        summary_md += f"- {cluster}: {count} ({percentage}%)\n"

    summary_md += f"""
## Statistics
- Avg SV: {stats['avg_search_volume']}/month
- Avg CPC: €{stats['avg_cpc']}
- Avg Score: {stats['avg_relevance_score']}/10.0

## Top 10 Keywords
"""
    for i, kw in enumerate(top_keywords[:10], 1):
        summary_md += f"{i}. **{kw['keyword']}** - SV: {kw['search_volume']}, Score: {kw['relevance_score']}\n"

    summary_md += f"""
## Files
- keyword-analysis.json
- phase-1b-summary.md
"""

    # Save summary
    summary_path = f"{OUTPUT_DIR}/research/phase-1b-summary.md"
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write(summary_md)
    print(f"✓ Saved phase-1b-summary.md")

    # Print compact summary
    print(f"\n{'='*60}")
    print("Phase 1B ✅")
    print(f"{'='*60}")
    print(f"\nAnalysis:")
    print(f"- {len(scored_keywords)} keywords analyzed")
    print(f"- Top {len(top_keywords)} selected")
    print(f"- {len(cluster_dist)} clusters")
    print(f"\nDistribution:")
    for cluster, count in cluster_dist.items():
        percentage = round(count / len(top_keywords) * 100)
        print(f"- {cluster}: {count} ({percentage}%)")
    print(f"\nStats: SV={stats['avg_search_volume']}, CPC=€{stats['avg_cpc']}, Score={stats['avg_relevance_score']}")
    print(f"\nFiles: keyword-analysis.json, phase-1b-summary.md")
    print(f"\nReady for Phase 2")

if __name__ == '__main__':
    main()
