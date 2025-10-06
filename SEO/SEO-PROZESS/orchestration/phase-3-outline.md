# Phase 3: Content Outline Creation

**Token Budget**: ~180 Tokens (75% reduction)
**Main Deliverable**: `content-outline.json`
**Agent**: `seo-content-writer` Sub-Agent (spawned by Main Agent)

---

## Input Files (Read via File Tool)

**WICHTIG**: Nutze Read-Tool um diese Files einzulesen:

1. **Keyword-Analyse** (Phase 1B):
   `SEO/SEO-CONTENT/{keyword-slug}/research/keyword-analysis.json`

   Extrahiere:
   - `top_keywords` → für Heading-Optimierung
   - `content_clusters` → für Sektions-Gruppierung
   - `recommendations.top_article_topics` → für H2-Headings
   - `recommendations.estimated_word_count` → als Fallback

2. **SERP-Analyse** (Phase 2):
   `SEO/SEO-CONTENT/{keyword-slug}/research/serp-analysis.json`

   Extrahiere:
   - `content_gaps.must_have_topics` → PFLICHT-Sektionen
   - `content_gaps.differentiation_opportunities` → Unique Angles
   - `format_recommendations.target_word_count` → Primäres Word Count Ziel
   - `format_recommendations.word_count_strategy` → "serp_competitive" oder "fallback"
   - `paa_integration` → für FAQ-Fragen (min 5, davon 3+ aus PAA)
   - `eeat_signals` → für Expertise-Integration

---

## Output Structure: `content-outline.json`

```json
{
  "phase": "3",
  "primary_keyword": "<aus keyword-analysis.json>",
  "timestamp": "<ISO 8601>",
  "based_on": {
    "phase_1b": "keyword-analysis.json",
    "phase_2": "serp-analysis.json"
  },

  "article_metadata": {
    "title": "<50-60 chars, primary keyword am Anfang, emotional hook>",
    "meta_description": "<150-160 chars, primary + 1-2 supporting keywords, CTA>",
    "primary_keyword": "",
    "secondary_keywords": ["keyword1", "keyword2", "keyword3"],
    "word_count_data": {
      "target_word_count": "<aus serp-analysis.json>",
      "word_count_strategy": "<aus serp-analysis.json>",
      "distribution": {
        "introduction": {"percentage": 0.07, "calculated_words": "<target × 0.07>"},
        "main_sections": {"percentage": 0.72, "calculated_words": "<target × 0.72>"},
        "faq": {"percentage": 0.10, "calculated_words": "<target × 0.10>"},
        "conclusion": {"percentage": 0.07, "calculated_words": "<target × 0.07>"}
      }
    }
  },

  "introduction": {
    "word_count": "<target × 0.07>",
    "hook": "<2-3 Sätze: Problem oder emotionaler Einstieg>",
    "user_intent": "<Was lernt der Leser?>",
    "preview": "<2-3 Sätze: Artikel-Überblick>",
    "keyword_integration": ["primary keyword", "variation"]
  },

  "main_sections": [
    {
      "section_number": 1,
      "heading": "H2: <Keyword-optimiert, idealerweise Frage-Format>",
      "content_type": "<explanation|tutorial|comparison|checklist|case_study>",
      "word_count": "<(target × 0.72) / anzahl_sektionen>",
      "subsections": [
        {
          "heading": "H3: <Spezifischer Aspekt>",
          "word_count": 150,
          "keywords": ["supporting keyword 1", "supporting keyword 2"],
          "content_focus": "<Was wird hier erklärt?>"
        }
      ],
      "keyword_integration": {
        "primary": ["primary keyword variation"],
        "supporting": ["supporting keyword 1", "supporting keyword 2"]
      },
      "eeat_signals": [
        {
          "type": "expertise|experience|data",
          "content": "<Konkreter Expertise-Nachweis>"
        }
      ],
      "visual_elements": [
        {
          "type": "table|checklist|diagram",
          "description": "<Was zeigt das Visual?>"
        }
      ]
    }
  ],

  "faq_section": {
    "word_count": "<target × 0.10>",
    "questions": [
      {
        "question": "<PAA-Frage aus serp-analysis.json>",
        "answer_outline": "<50-100 Wörter Antwort-Skizze>",
        "word_count": 80,
        "paa_source": true,
        "keywords": ["relevant keyword"]
      }
    ]
  },

  "conclusion": {
    "word_count": "<target × 0.07>",
    "key_takeaways": [
      "Takeaway 1",
      "Takeaway 2",
      "Takeaway 3"
    ],
    "call_to_action": "<Nächster Schritt für Leser>",
    "keyword_integration": ["primary keyword"]
  },

  "internal_linking_opportunities": [
    {
      "section": "<Sektion-Name>",
      "target_page": "/ratgeber/example",
      "anchor_text": "<Natural anchor text>"
    }
  ]
}
```

---

## Critical Rules

### 1. Word Count Berechnung
- Lies `target_word_count` aus `serp-analysis.json`
- Berechne Sektions-Längen mit **fixen Prozentsätzen**:
  - Einleitung: target × 0.07 (~7%)
  - Hauptsektionen: target × 0.72 (~72%, verteilt auf 5-8 H2)
  - FAQ: target × 0.10 (~10%)
  - Fazit: target × 0.07 (~7%)

### 2. Sektions-Anforderungen
- **5-8 Hauptsektionen** (nicht mehr, nicht weniger)
- Jede Sektion braucht:
  - `content_type` (explanation, tutorial, comparison, checklist, case_study)
  - `keyword_integration` (primary + supporting)
  - `eeat_signals` (min 1 pro Sektion)
  - 2-4 Subsektionen (H3)

### 3. FAQ-Integration
- **Min 5 Fragen**
- **Min 3 Fragen aus PAA** (nutze `paa_integration` Array aus serp-analysis.json)
- Kurze Antworten (50-100 Wörter)
- Schema-Markup-ready

### 4. Must-Have Topics
- Alle Topics aus `content_gaps.must_have_topics` MÜSSEN als Sektionen erscheinen
- Nutze `differentiation_opportunities` für unique angles

### 5. Internal Linking
- **Min 5 Opportunities** identifizieren
- Sections: wo im Artikel?
- Target Pages: relevante PferdeWert.de Unterseiten
- Natural Anchor Text

---

## Save Output

Speichere das vollständige JSON als:
`SEO/SEO-CONTENT/{keyword-slug}/planning/content-outline.json`

**WICHTIG**: Outline muss direkt umsetzbar sein für Phase 4 (Content Writing).
Jede Sektion braucht klare Anweisungen: Was schreiben? Welche Keywords? Welche E-E-A-T Signale?

---

## Quality Gate: Automated Bash Verification

```bash
KEYWORD_SLUG="pferd-kaufen-worauf-achten"
OUTLINE_FILE="SEO/SEO-CONTENT/${KEYWORD_SLUG}/planning/content-outline.json"

# 1. File exists
[ ! -f "$OUTLINE_FILE" ] && echo "❌ FAIL: File not created" && exit 1

# 2. Valid JSON
jq empty "$OUTLINE_FILE" 2>/dev/null || { echo "❌ FAIL: Invalid JSON"; exit 1; }

# 3. Section count (5-8)
SECTION_COUNT=$(jq '.main_sections | length' "$OUTLINE_FILE")
[ "$SECTION_COUNT" -lt 5 ] || [ "$SECTION_COUNT" -gt 8 ] && echo "❌ FAIL: $SECTION_COUNT sections (need 5-8)" && exit 1

# 4. FAQ count (min 5)
FAQ_COUNT=$(jq '.faq_section.questions | length' "$OUTLINE_FILE")
[ "$FAQ_COUNT" -lt 5 ] && echo "❌ FAIL: $FAQ_COUNT FAQs (min 5)" && exit 1

# 5. PAA sources (min 3)
PAA_COUNT=$(jq '[.faq_section.questions[] | select(.paa_source == true)] | length' "$OUTLINE_FILE")
[ "$PAA_COUNT" -lt 3 ] && echo "⚠️  WARNING: Only $PAA_COUNT PAA sources (min 3)"

# 6. Word count data
jq -e '.article_metadata.word_count_data.target_word_count' "$OUTLINE_FILE" >/dev/null || { echo "❌ FAIL: No target_word_count"; exit 1; }

# 7. Internal links (min 5)
LINK_COUNT=$(jq '.internal_linking_opportunities | length' "$OUTLINE_FILE")
[ "$LINK_COUNT" -lt 5 ] && echo "⚠️  WARNING: Only $LINK_COUNT internal links (min 5)"

echo "✅ PASS: Sections=$SECTION_COUNT | FAQ=$FAQ_COUNT (PAA=$PAA_COUNT) | Links=$LINK_COUNT"
```

---

## Quality Criteria

### ✅ PASS Requirements:
- 5-8 Hauptsektionen
- Min 5 FAQ-Fragen (davon 3+ aus PAA)
- Valid JSON structure
- `word_count_data` present
- Each section has: `content_type`, `keyword_integration`, `eeat_signals`

### ⚠️  WARNINGS (proceed with caution):
- < 3 PAA-sourced FAQ questions
- < 5 internal linking opportunities

### ❌ FAILURE (retry required):
- < 5 or > 8 sections
- < 5 FAQ questions
- Missing `target_word_count`
- Invalid JSON

---

## Troubleshooting

**Problem**: Word count calculations missing
**Solution**: Verify `serp-analysis.json` has `format_recommendations.target_word_count`

**Problem**: Too generic outline
**Solution**: Check if `content_gaps.must_have_topics` was used from Phase 2

**Problem**: FAQ missing PAA questions
**Solution**: Verify `paa_integration` array exists in serp-analysis.json

---

## Next Phase

→ **Phase 4: Content Writing** (`phase-4-content.md`)

Pass `content-outline.json` as blueprint.
