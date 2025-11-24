# PHASE 5C: INTERNAL LINKING OPTIMIZATION

## Übersicht

**Sub-Phase**: 5C - Internal Linking Optimization
**Agent**: `seo-content-writer`

**Ziel**: Generiere strategische interne Verlinkung basierend auf Content-Outline + Article Draft + Sitemap.xml für Topic Clustering und User Navigation.

**Input Dependencies**:
- `planning/content-outline.json` (aus Phase 3)
- `content/article-draft.md` (aus Phase 4)
- `public/sitemap.xml` (Frontend Sitemap)

**Output Deliverables**:
- `seo/internal-linking.json` (Primary Deliverable)

---

## TASKS

### 1. Read Input Files

```markdown
REQUIRED INPUT FILES:
- planning/content-outline.json → Primary Keyword, H2 Structure, Topic Context
- content/article-draft.md → Content für Kontext-Analyse
- public/sitemap.xml → Verfügbare interne URLs
```

**Verwendung**:
- Primary Keyword aus `content-outline.json` → Relevanz-Scoring für Link-Targets
- H2/H3 Structure aus `content-outline.json` → Thematische Cluster identifizieren
- Content aus `article-draft.md` → Kontext für natürliche Anchor-Platzierung
- URLs aus `sitemap.xml` → Validierte Link-Targets (verhindert 404s)

---

### 2. Sitemap Parsing & URL Filtering

**Sitemap lesen**:
```python
import xml.etree.ElementTree as ET

def parse_sitemap(sitemap_path):
    """Parse sitemap.xml und extrahiere alle URLs"""
    tree = ET.parse(sitemap_path)
    root = tree.getroot()

    # Namespace handling für sitemap.xml
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

    urls = []
    for url in root.findall('ns:url', namespace):
        loc = url.find('ns:loc', namespace).text
        urls.append(loc)

    return urls

# Beispiel Output:
# [
#   "https://www.pferdewert.de/",
#   "https://www.pferdewert.de/ratgeber/pferd-kaufen-checkliste",
#   "https://www.pferdewert.de/ratgeber/pferdehaltung-kosten",
#   ...
# ]
```

**URL Filtering**:
- **Include**: Nur URLs mit `/ratgeber/` Prefix (relevante Ratgeber-Artikel)
- **Exclude**: Homepage, Legal Pages, Bewertungsformular, Pricing
- **Exclude**: Der eigene Artikel (keine Self-Links)

```python
def filter_ratgeber_urls(all_urls, current_slug):
    """Filtere nur relevante Ratgeber-URLs"""
    ratgeber_urls = [
        url for url in all_urls
        if '/ratgeber/' in url
        and url != f"https://www.pferdewert.de/ratgeber/{current_slug}"
    ]
    return ratgeber_urls
```

---

### 3. Link Target Selection (Relevanz-Scoring)

**Ziel**: Finde 3-7 thematisch relevante Ratgeber-Artikel für interne Verlinkung.

**Relevanz-Kriterien**:

1. **Keyword Overlap** (Gewicht: 40%):
   - Wie viele Keywords aus Primary Keyword + H2 Structure überlappen mit Target-URL-Slug?
   - Beispiel: `pferd-kaufen-worauf-achten` ← → `pferd-kaufen-checkliste` (3/4 Wörter = 75% overlap)

2. **Topic Cluster** (Gewicht: 30%):
   - Gehört Target zur gleichen thematischen Kategorie?
   - Cluster-Beispiele:
     - "Pferdekauf": pferd-kaufen-*, pferd-verkaufen-*, pferdekauf-vertrag
     - "Pferdehaltung": pferdehaltung-kosten, stallmiete-*, futter-*
     - "Pferdegesundheit": tierarzt-kosten, impfung-*, hufschmied-*

3. **Semantic Similarity** (Gewicht: 20%):
   - Basierend auf H2/H3 Structure Overlap
   - Beispiel: Beide Artikel haben H2 "Worauf achten beim Pferdekauf"

4. **Content Length Bonus** (Gewicht: 10%):
   - Längere Artikel (>1500 Wörter) sind wertvoller als kurze Snippets

**Scoring-Formel**:
```python
def calculate_relevance_score(current_article, target_article):
    """Berechne Relevanz-Score zwischen 0.0 und 1.0"""

    # 1. Keyword Overlap (40%)
    current_keywords = set(current_article['primary_keyword'].split())
    target_slug_words = set(target_article['slug'].replace('-', ' ').split())
    keyword_overlap = len(current_keywords & target_slug_words) / max(len(current_keywords), 1)
    keyword_score = keyword_overlap * 0.4

    # 2. Topic Cluster (30%)
    cluster_score = 0.3 if same_topic_cluster(current_article, target_article) else 0.0

    # 3. H2 Overlap (20%)
    current_h2s = set(h2['title'].lower() for h2 in current_article.get('h2_structure', []))
    target_h2s = set(h2['title'].lower() for h2 in target_article.get('h2_structure', []))
    h2_overlap = len(current_h2s & target_h2s) / max(len(current_h2s), 1)
    h2_score = h2_overlap * 0.2

    # 4. Content Length Bonus (10%)
    length_score = 0.1 if target_article.get('word_count', 0) > 1500 else 0.05

    total_score = keyword_score + cluster_score + h2_score + length_score
    return round(total_score, 2)
```

**Selection Logic**:
1. Berechne Relevanz-Score für alle Ratgeber-URLs
2. Sortiere absteigend nach Score
3. Wähle Top 5-7 URLs (min 3, optimal 5-7)
4. Validiere gegen Quality Gates (siehe unten)

---

### 4. Anchor Text Generation

**KRITISCHE Anforderungen**:
- **Beschreibend**: Anchor Text sollte klar kommunizieren, was User auf Zielseite erwartet
- **Variiert**: Keine identischen Anchor Texts (verhindert schlechte UX)
- **Keyword-Aware**: Primary Keyword des Targets idealerweise integriert
- **Natürlich**: Muss sich natürlich in Satz einfügen (kein "klicken Sie hier")
- **Länge**: 2-6 Wörter ideal

**Beispiele**:

✅ **GOOD**:
- Target: `/ratgeber/pferd-kaufen-checkliste`
  - Anchor: "Pferdekauf-Checkliste"
  - Anchor: "unsere detaillierte Pferdekauf-Checkliste"

- Target: `/ratgeber/pferdehaltung-kosten`
  - Anchor: "monatliche Pferdehaltungskosten"
  - Anchor: "Kosten der Pferdehaltung"

❌ **BAD**:
- "hier klicken" (nicht beschreibend)
- "mehr Informationen" (zu generisch)
- "pferd-kaufen-checkliste-ratgeber-tipps-tricks-anleitung" (Keyword-Stuffing)
- Identische Anchors: "Pferdekauf-Tipps" + "Pferdekauf-Tipps" (Duplikat!)

**Anchor Text Formula**:
```
[Target Primary Keyword] + [Optional Qualifier]

Beispiele:
- "Pferdekauf-Checkliste" (Primary Keyword only)
- "umfassende Pferdekauf-Checkliste" (mit Qualifier)
- "Kosten der Pferdehaltung" (natürlich formuliert)
```

**Generierung-Logik**:
```python
def generate_anchor_text(target_url, target_primary_keyword, variation_index=0):
    """Generiere beschreibenden Anchor Text mit Variation"""

    variations = [
        f"{target_primary_keyword}",  # Variation 0: Pure keyword
        f"unsere {target_primary_keyword}",  # Variation 1: Mit Possessiv
        f"detaillierte {target_primary_keyword}",  # Variation 2: Mit Adjektiv
        f"{target_primary_keyword.replace('-', ' ')}",  # Variation 3: Natürliche Form
    ]

    return variations[variation_index % len(variations)]
```

---

### 5. Contextual Placement Recommendation

**Ziel**: Empfehle optimale Platzierung im Article Draft.

**Placement-Strategien**:

1. **Within H2 Sections** (bevorzugt):
   - Finde H2 Section mit thematischem Bezug zum Link-Target
   - Platziere Link natürlich im ersten oder zweiten Absatz der Section
   - Beispiel: H2 "Worauf beim Pferdekauf achten" → Link zu "Pferdekauf-Checkliste"

2. **Introduction Paragraph**:
   - Wenn Target sehr relevant ist, im Intro verlinken
   - Beispiel: "Neben dem Kaufpreis spielen auch die laufenden Kosten eine Rolle"
   - → Link zu "Pferdehaltungskosten"

3. **Related Content Section** (optional):
   - Am Ende des Artikels "Weiterführende Ratgeber" Section
   - Liste von 3-5 Links mit kurzer Beschreibung

**Placement Output Format**:
```json
{
  "url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-checkliste",
  "anchor": "detaillierte Pferdekauf-Checkliste",
  "placement": {
    "section": "h2",
    "section_title": "Worauf beim Pferdekauf achten",
    "paragraph_index": 1,
    "recommendation": "Natürlich in Satz einfügen: 'Eine [detaillierte Pferdekauf-Checkliste] hilft Ihnen...'"
  }
}
```

---

### 6. Generate Output File: `seo/internal-linking.json`

**Complete Output Structure**:
```json
{
  "phase": "5C",
  "primary_keyword": "pferd kaufen worauf achten",
  "internal_links": [
    {
      "url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-checkliste",
      "anchor": "detaillierte Pferdekauf-Checkliste",
      "relevance_score": 0.85,
      "target_primary_keyword": "pferd kaufen checkliste",
      "placement": {
        "section": "h2",
        "section_title": "Worauf beim Pferdekauf achten",
        "paragraph_index": 1,
        "recommendation": "Natürlich in Satz einfügen nach Erwähnung von Checklisten"
      },
      "rationale": "Hohe thematische Relevanz (Pferdekauf), direkter Keyword-Overlap, gleicher Topic Cluster"
    },
    {
      "url": "https://www.pferdewert.de/ratgeber/pferdehaltung-kosten",
      "anchor": "monatliche Pferdehaltungskosten",
      "relevance_score": 0.72,
      "target_primary_keyword": "pferdehaltung kosten",
      "placement": {
        "section": "h2",
        "section_title": "Budgetplanung für Pferdekauf",
        "paragraph_index": 2,
        "recommendation": "Nach Kaufpreis-Erwähnung auf laufende Kosten verweisen"
      },
      "rationale": "Ergänzende Information zu Pferdekauf (Kosten-Aspekt), relevanter Kontext"
    },
    {
      "url": "https://www.pferdewert.de/ratgeber/pferdekauf-vertrag",
      "anchor": "Pferdekaufvertrag richtig gestalten",
      "relevance_score": 0.79,
      "target_primary_keyword": "pferdekaufvertrag muster",
      "placement": {
        "section": "h2",
        "section_title": "Rechtliche Absicherung beim Pferdekauf",
        "paragraph_index": 1,
        "recommendation": "Im Kontext von rechtlichen Aspekten verlinken"
      },
      "rationale": "Direkt im Pferdekauf-Cluster, rechtlicher Aspekt ergänzt Kaufprozess"
    },
    {
      "url": "https://www.pferdewert.de/ratgeber/pferd-verkaufen-tipps",
      "anchor": "Pferd erfolgreich verkaufen",
      "relevance_score": 0.65,
      "target_primary_keyword": "pferd verkaufen tipps",
      "placement": {
        "section": "related_content",
        "section_title": "Weiterführende Ratgeber",
        "paragraph_index": 0,
        "recommendation": "Am Ende als verwandter Ratgeber (Verkäufer-Perspektive)"
      },
      "rationale": "Gegenperspektive zum Pferdekauf, relevant für vollständiges Bild"
    },
    {
      "url": "https://www.pferdewert.de/ratgeber/ankaufsuntersuchung-pferd",
      "anchor": "Ankaufsuntersuchung beim Pferd",
      "relevance_score": 0.81,
      "target_primary_keyword": "ankaufsuntersuchung pferd kosten",
      "placement": {
        "section": "h2",
        "section_title": "Gesundheitliche Absicherung beim Pferdekauf",
        "paragraph_index": 1,
        "recommendation": "Im Kontext von Gesundheitscheck vor Kauf verlinken"
      },
      "rationale": "Kritischer Aspekt beim Pferdekauf, hohe Relevanz für Käufer-Absicherung"
    }
  ],
  "sitemap_validation": {
    "total_ratgeber_urls": 47,
    "filtered_candidates": 42,
    "selected_links": 5,
    "all_links_valid": true,
    "broken_links": []
  },
  "anchor_text_validation": {
    "total_anchors": 5,
    "unique_anchors": 5,
    "duplicate_anchors": [],
    "generic_anchors": [],
    "empty_anchors": []
  },
  "diversity_metrics": {
    "unique_target_categories": 3,
    "categories": ["pferdekauf", "pferdehaltung", "gesundheit"],
    "avg_relevance_score": 0.76
  }
}
```

---

## QUALITY GATE 5C: INTERNAL LINKING VALIDATION

**Execution**: After generating `seo/internal-linking.json`, validate against quality gate criteria.

### ERROR Criteria (Hard Fail - Retry Required)

**If ANY of these fail → RETRY link generation (max 1× retry)**:

1. **Minimum Internal Links** (threshold: 3):
   - Check: `internal_links.length < 3`
   - Action: Finde zusätzliche relevante Ratgeber-Links aus sitemap.xml, retry Phase 5C

2. **Broken Link Detected** (threshold: 0):
   - Check: `internal_links.some(link => !sitemap_urls.includes(link.url))`
   - Action: Validiere alle Links gegen sitemap.xml, entferne ungültige, retry Phase 5C

3. **Duplicate Anchor Text** (threshold: true):
   - Check: `new Set(internal_links.map(l => l.anchor)).size < internal_links.length`
   - Action: Variiere Anchor Texte für bessere UX, retry Phase 5C

4. **Empty Anchor Text** (threshold: 0):
   - Check: `internal_links.some(link => !link.anchor || link.anchor.trim() === '')`
   - Action: Generiere beschreibenden Anchor Text, retry Phase 5C

### WARNING Criteria (Proceed with Caution)

**Document in summary but continue to Phase 6**:

1. **Optimal Internal Links** (threshold: 5):
   - Check: `internal_links.length < 5`
   - Message: "{{actual}} interne Links (optimal wären 5-7 für bessere Topic Clustering)"
   - Action: CONTINUE (mehr Links wären gut, aber nicht kritisch)

2. **Low Contextual Relevance** (threshold: 0.6):
   - Check: `internal_links.some(link => link.relevance_score < 0.6)`
   - Message: "Link zu {{url}} hat niedrige Relevanz ({{score}})"
   - Action: CONTINUE (Link ist gültig, könnte aber relevanter sein)

3. **Generic Anchor Text** (threshold: 0):
   - Check: `internal_links.some(link => ['hier', 'klicken', 'mehr'].includes(link.anchor.toLowerCase()))`
   - Message: "Generischer Anchor Text erkannt: '{{anchor}}'"
   - Action: CONTINUE (Generische Anchors funktionieren, beschreibende sind besser)

### INFO Criteria (Nice-to-Have)

**Optional checks that indicate good practices**:

1. **Diverse Link Targets** (threshold: >1 category):
   - Check: `diversity_metrics.unique_target_categories > 1`
   - Message: "✓ Links zu {{count}} verschiedenen Ratgeber-Kategorien (gute Topic Diversity)"

2. **Keyword in Anchor** (threshold: true):
   - Check: `internal_links.some(link => link.anchor.toLowerCase().includes(primary_keyword.split(' ')[0]))`
   - Message: "✓ Primary Keyword in Anchor Text integriert (SEO+)"

---

## VALIDATION LOGIC

```python
def validate_phase_5c(linking_json, sitemap_urls, primary_keyword):
    """Quality Gate nach Phase 5C - Internal Linking Optimization"""
    errors = []
    warnings = []
    infos = []

    internal_links = linking_json['internal_links']

    # ERROR Checks
    if len(internal_links) < 3:
        errors.append({
            'code': 'min_internal_links',
            'message': f"Nur {len(internal_links)} interne Links statt min 3",
            'action': 'RETRY: Finde zusätzliche relevante Ratgeber-Links aus sitemap.xml'
        })

    # Broken Link Detection
    for link in internal_links:
        if link['url'] not in sitemap_urls:
            errors.append({
                'code': 'broken_link_detected',
                'message': f"Link zu {link['url']} nicht in sitemap.xml gefunden (potenzieller 404!)",
                'action': 'RETRY: Validiere alle Links gegen sitemap.xml, entferne ungültige'
            })

    # Duplicate Anchor Detection
    anchors = [link['anchor'] for link in internal_links]
    if len(anchors) != len(set(anchors)):
        duplicates = [anchor for anchor in set(anchors) if anchors.count(anchor) > 1]
        errors.append({
            'code': 'duplicate_anchor_text',
            'message': f"Doppelter Anchor Text erkannt: {', '.join(duplicates)}",
            'action': 'RETRY: Variiere Anchor Texte für bessere UX'
        })

    # Empty Anchor Detection
    for link in internal_links:
        if not link.get('anchor') or link['anchor'].strip() == '':
            errors.append({
                'code': 'empty_anchor_text',
                'message': f"Leerer Anchor Text bei Link zu {link['url']}",
                'action': 'RETRY: Generiere beschreibenden Anchor Text'
            })

    # WARNING Checks
    if len(internal_links) < 5:
        warnings.append({
            'code': 'optimal_internal_links',
            'message': f"{len(internal_links)} interne Links (optimal wären 5-7 für bessere Topic Clustering)",
            'action': 'CONTINUE: Mehr Links wären gut, aber nicht kritisch'
        })

    for link in internal_links:
        if link.get('relevance_score', 1.0) < 0.6:
            warnings.append({
                'code': 'low_contextual_relevance',
                'message': f"Link zu {link['url']} hat niedrige Relevanz ({link['relevance_score']})",
                'action': 'CONTINUE: Link ist gültig, könnte aber relevanter sein'
            })

    generic_keywords = ['hier', 'klicken', 'mehr', 'link', 'weiter']
    for link in internal_links:
        if any(keyword in link['anchor'].lower() for keyword in generic_keywords):
            warnings.append({
                'code': 'generic_anchor_text',
                'message': f"Generischer Anchor Text erkannt: '{link['anchor']}'",
                'action': 'CONTINUE: Generische Anchors funktionieren, beschreibende sind besser'
            })

    # INFO Checks
    if linking_json.get('diversity_metrics', {}).get('unique_target_categories', 0) > 1:
        infos.append({
            'code': 'diverse_link_targets',
            'message': f"✓ Links zu {linking_json['diversity_metrics']['unique_target_categories']} verschiedenen Ratgeber-Kategorien (gute Topic Diversity)"
        })

    primary_keyword_first_word = primary_keyword.split()[0].lower()
    if any(primary_keyword_first_word in link['anchor'].lower() for link in internal_links):
        infos.append({
            'code': 'keyword_in_anchor',
            'message': f"✓ Primary Keyword in Anchor Text integriert (SEO+)"
        })

    # Entscheidung
    if errors:
        return {
            'status': 'FAILED',
            'gate': 'phase_5c_internal_linking',
            'errors': errors,
            'warnings': warnings,
            'action': 'RETRY_REQUIRED'
        }
    elif warnings:
        return {
            'status': 'PASSED_WITH_WARNINGS',
            'gate': 'phase_5c_internal_linking',
            'warnings': warnings,
            'infos': infos,
            'action': 'CONTINUE'
        }
    else:
        return {
            'status': 'PASSED',
            'gate': 'phase_5c_internal_linking',
            'infos': infos,
            'action': 'CONTINUE'
        }
```

---

## RETRY LOGIC (Max 1× Wiederholung)

**Pattern**:
1. Erste Generierung von `internal-linking.json`
2. Quality Gate Validation
3. **Wenn ERROR**:
   - Log: "Quality Gate 5C FAILED - Initiating Retry (1/1)"
   - Retry Generierung mit angepassten Parametern (z.B. niedrigerer Relevanz-Threshold)
   - Quality Gate Validation (zweiter Versuch)
   - **Wenn ERROR bleibt**:
     - Log: "Quality Gate 5C FAILED after Retry - Escalating to Main Agent"
     - Return: FAILED Status mit Error Details
     - Main Agent entscheidet über Fortsetzung
4. **Wenn PASSED oder PASSED_WITH_WARNINGS**: Fortfahren zu Phase 6

**Keine Infinite Retries**: Max 1× Retry verhindert Token-Verschwendung durch sinnlose Wiederholungen.

---

## OUTPUT FORMAT (Return to Main Agent)

```json
{
  "phase": "5C",
  "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
  "deliverables": [
    "seo/internal-linking.json"
  ],
  "quality_gate": {
    "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
    "errors": [],
    "warnings": [
      {
        "code": "optimal_internal_links",
        "message": "4 interne Links (optimal wären 5-7 für bessere Topic Clustering)",
        "action": "CONTINUE: Mehr Links wären gut, aber nicht kritisch"
      }
    ],
    "infos": [
      {
        "code": "diverse_link_targets",
        "message": "✓ Links zu 3 verschiedenen Ratgeber-Kategorien (gute Topic Diversity)"
      },
      {
        "code": "keyword_in_anchor",
        "message": "✓ Primary Keyword in Anchor Text integriert (SEO+)"
      }
    ]
  },
  "linking_metrics": {
    "total_links": 5,
    "avg_relevance_score": 0.76,
    "unique_anchors": 5,
    "all_links_valid": true
  },
  "summary": "Interne Verlinkung für 'pferd kaufen worauf achten' generiert. 5 relevante Links zu Ratgeber-Artikeln (Ø Relevanz: 0.76). Alle Links gegen sitemap.xml validiert (0 broken links). Anchor Texts variiert und beschreibend. Topic Diversity: 3 Kategorien (Pferdekauf, Pferdehaltung, Gesundheit). ⚠️ WARNING: Nur 4 Links statt optimal 5-7, könnte für besseres Topic Clustering erweitert werden."
}
```

**Summary Guidelines**:
- Max 150-200 Wörter
- Erwähne alle ERROR/WARNING Findings
- Bestätige successful Validations
- Konkrete nächste Schritte wenn FAILED

