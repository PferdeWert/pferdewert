---
name: seo-quality-check
description: Validiert Content-Qualität, E-E-A-T Signals und Brand Compliance. Quality Gate vor Publication. Verwenden bei "qualität prüfen" oder "content validieren".
allowed-tools: Read, Glob, Grep, mcp__dataforseo__*
---

# SEO Quality Check - Content Validation & E-E-A-T Scoring

Validates content quality, E-E-A-T signals, brand compliance, and SEO best practices.

**Purpose**: Quality gate before publication - ensures content meets PferdeWert standards.

## When to use

- Phase 6 of `seo-full-workflow`
- Before publishing any SEO content
- User requests "validate SEO content quality"
- After content modifications (re-check)
- Part of `seo-content-optimizer` workflow

## Prerequisites

- Content file to validate (markdown or TSX)
- Target keyword known
- Optional: SERP competitor data for benchmarking

## Input

Can accept multiple formats:
- Markdown file path (`content/full-content.md`)
- Next.js page file path (`pages/ratgeber/{slug}.tsx`)
- Raw markdown text
- URL to live page (via `on_page_content_parsing`)

## Validation Checks

### 1. E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trust)

**Experience Signals** (0-10 points):
- Personal anecdotes or case studies
- Specific data/statistics with sources
- Process descriptions with timelines
- Real-world examples
- "We" / "our experience" language

**Expertise Signals** (0-10 points):
- Technical terminology used correctly
- Industry-specific knowledge
- Comparative analysis
- Pros/cons evaluations
- Expert quotes or references

**Authoritativeness Signals** (0-10 points):
- Author credentials mentioned
- Company/organization mentioned
- Industry certifications referenced
- Years of experience stated
- Awards or recognition

**Trust Signals** (0-10 points):
- Privacy policy linked
- Contact information present
- HTTPS mentioned/enforced
- Transparent pricing/costs
- Legal compliance (DSGVO, etc.)
- External sources cited
- Review/update dates

**Scoring**:
- 0-3 points per signal: Poor
- 4-6 points: Acceptable
- 7-8 points: Good
- 9-10 points: Excellent

**Overall E-E-A-T Score**: Average of 4 categories
- < 5.0: Fail (content needs major revision)
- 5.0-6.9: Warning (improvement recommended)
- 7.0-8.4: Pass (good quality)
- 8.5-10.0: Excellent (high quality)

### 2. Brand Compliance (Critical - Must Pass)

**PferdeWert-Specific Rules**:
- ✅ Uses "KI" not "AI" in all German text
- ✅ States "2 Minuten" for evaluation duration
- ✅ Emphasizes PAID service (never "kostenlos" or "free")
- ✅ Mentions expert validation (Tierärzte, Reitlehrer)
- ✅ References 200+ criteria for evaluation
- ✅ States nationwide service ("deutschlandweit")

**Fail Conditions** (any of these fails entire check):
- Contains "AI" instead of "KI" in German text
- States "3 Minuten" or wrong duration
- Uses "kostenlos" or "free" for service
- Misrepresents service capabilities

### 3. SEO Technical Compliance

**Title Tag**:
- Length: 50-60 characters (mobile SERP)
- Contains primary keyword (preferably at start)
- Includes brand modifier (optional: "| PferdeWert")
- Compelling and click-worthy

**Meta Description**:
- Length: 140-160 characters
- Contains primary keyword
- Includes call-to-action
- Unique (not duplicated)

**Heading Structure**:
- Single H1 (contains primary keyword)
- 5-8 H2 sections (hierarchical)
- 2-4 H3s per H2 (supporting topics)
- Natural keyword integration in headings

**Keyword Optimization**:
- **Primary Keyword Density**: 0.8-1.5% (ideal)
  - < 0.5%: Under-optimized
  - 0.5-0.8%: Acceptable
  - 0.8-1.5%: Optimal
  - > 2.0%: Over-optimized (keyword stuffing risk)
- **LSI Keywords**: 5-10 related terms present
- **Synonyms**: Natural variations used
- **Semantic Relevance**: Related entities mentioned

**Content Metrics**:
- Word count: 1500-2500 (competitive with SERP top 3)
- Average sentence length: < 20 words (readability)
- Paragraph length: < 150 words (scannability)
- Reading ease: Flesch score > 60 (German adaptation)

**Internal Linking**:
- 2-5 contextual internal links
- Link to related ratgeber articles
- Link to service pages (Bewertung, Preise)
- Anchor text natural and descriptive
- No broken links

**Structured Data**:
- FAQ Schema present (min 3 Q&As)
- Article Schema complete
- BreadcrumbList Schema
- All schemas valid JSON-LD

**Media Optimization**:
- Images have descriptive alt text
- File names SEO-friendly (keyword-based)
- Images optimized (Next.js Image component)
- At least 1 image per major section

### 4. Readability (KRITISCH - Flesch ≥60 erforderlich!)

**🎯 Ziel: Flesch-Kincaid Score ≥60 (8. Klasse Niveau)**

Der Flesch-Score ist ein HARD FAIL Kriterium. Content mit Score <60 wird NICHT publiziert.

**Flesch-Score Faktoren** (was den Score beeinflusst):
1. **Durchschnittliche Satzlänge** (ASL) → Je kürzer, desto besser
2. **Durchschnittliche Silben pro Wort** (ASW) → Je weniger, desto besser

**Formel**: `206.835 - (1.015 × ASL) - (84.6 × ASW)`

#### Konkrete Schreibregeln für Flesch ≥60:

**Satzlänge (WICHTIGSTER Faktor!):**
- ✅ **Ziel: 10-15 Wörter** pro Satz durchschnittlich
- ⚠️ Max 20 Wörter als absolute Obergrenze
- ❌ NIEMALS Sätze >25 Wörter

**Schachtelsätze vermeiden:**
```
❌ FALSCH (32 Wörter, Flesch ~25):
"Wenn Sie ein Pferd kaufen möchten, das sowohl für Anfänger geeignet ist
als auch über eine solide Ausbildung verfügt, sollten Sie unbedingt darauf
achten, dass Sie eine professionelle Ankaufsuntersuchung durchführen lassen."

✅ RICHTIG (3 Sätze, je ~10 Wörter, Flesch ~70):
"Du möchtest ein Pferd kaufen? Es soll für Anfänger geeignet sein und
eine gute Ausbildung haben. Dann lass unbedingt eine AKU machen."
```

**Wortlänge - Einfache Wörter bevorzugen:**
| Komplex (vermeiden) | Einfach (bevorzugen) |
|---------------------|----------------------|
| Ankaufsuntersuchung | AKU |
| Pferdebewertung | Pferde-Check |
| Gesundheitszustand | Gesundheit |
| Veterinärmedizinisch | tierärztlich |
| Dokumentation | Nachweis |
| Qualitätskriterien | Prüfpunkte |
| Marktwertsteigerung | mehr Wert |

**Aktiv statt Passiv:**
```
❌ "Das Pferd wird von einem Tierarzt untersucht."
✅ "Der Tierarzt untersucht das Pferd."

❌ "Die Bewertung wird in 2 Minuten erstellt."
✅ "Du bekommst die Bewertung in 2 Minuten."
```

**Direkte Ansprache:**
```
❌ "Man sollte darauf achten..."
✅ "Achte darauf..."

❌ "Es empfiehlt sich..."
✅ "Wir empfehlen dir..."
```

**Listen statt Fließtext:**
```
❌ FALSCH (langer Fließtext):
"Bei der Ankaufsuntersuchung prüft der Tierarzt den allgemeinen
Gesundheitszustand, die Bewegungsapparate, die Atemwege und das
Herz-Kreislauf-System sowie die Augen."

✅ RICHTIG (Liste):
"Bei der AKU prüft der Tierarzt:
- Allgemeine Gesundheit
- Bewegung und Gelenke
- Atemwege
- Herz und Kreislauf
- Augen"
```

**Satz-Starter variieren:**
- Nicht jeden Satz mit "Das Pferd..." beginnen
- Fragen einbauen: "Was kostet das?"
- Imperative nutzen: "Prüfe...", "Achte auf..."

#### Readability Check Prozess:

1. **Vor Publikation**: `mcp__dataforseo__on_page_instant_pages` aufrufen
2. **Score prüfen**: `meta.content.flesch_kincaid_readability_index`
3. **Bei Score <60**: Content MUSS überarbeitet werden

#### Readability Score Interpretation:

| Score | Status | Aktion |
|-------|--------|--------|
| 70+ | ✅ Excellent | Sofort publizieren |
| 60-69 | ✅ Pass | Publizieren OK |
| 50-59 | ⚠️ Warning | Überarbeitung empfohlen |
| 40-49 | ❌ Fail | MUSS überarbeitet werden |
| <40 | ❌ Critical | Komplett neu schreiben |

### 5. Content Quality

**Weitere Qualitätskriterien**:
- Clear topic sentences in paragraphs
- Transition words used
- Active voice preferred (> 80%)
- Bullet points/lists for scannability

**User Intent Alignment**:
- Answers the search query directly
- Covers subtopics from SERP analysis
- Addresses People Also Ask questions
- Provides actionable information

**Uniqueness**:
- No duplicate content (external check if URL provided)
- Original insights and perspective
- Not AI-generated boilerplate
- PferdeWert-specific value propositions

**Engagement Elements**:
- Clear call-to-action (CTA)
- Table of contents for long articles
- FAQ section (3-8 questions)
- Summary/conclusion
- Related articles suggestions

### 5. Competitive Benchmarking

If SERP data available, compare to top 3 ranking pages:

**Content Depth**:
- Our word count vs. avg top 3
- Our H2 count vs. avg top 3
- Our FAQ count vs. avg top 3

**Keyword Coverage**:
- LSI keywords: our count vs. top 3
- Related terms: our coverage vs. top 3
- Semantic completeness score

**E-E-A-T Comparison**:
- Our E-E-A-T score vs. estimated top 3
- Signal gaps (what they have that we don't)

## Output: Quality Report JSON

```json
{
  "timestamp": "2025-01-09T10:30:00Z",
  "keyword": "primary keyword",
  "file_path": "path/to/content.md",

  "eeat_score": {
    "experience": 7.5,
    "expertise": 8.0,
    "authoritativeness": 6.5,
    "trust": 9.0,
    "overall": 7.75,
    "status": "pass"
  },

  "brand_compliance": {
    "uses_ki_not_ai": true,
    "states_2_minuten": true,
    "emphasizes_paid": true,
    "mentions_expert_validation": true,
    "status": "pass"
  },

  "seo_technical": {
    "title": {
      "length": 58,
      "has_keyword": true,
      "status": "pass"
    },
    "meta_description": {
      "length": 155,
      "has_keyword": true,
      "has_cta": true,
      "status": "pass"
    },
    "headings": {
      "h1_count": 1,
      "h2_count": 7,
      "h3_count": 18,
      "keyword_in_h1": true,
      "status": "pass"
    },
    "keywords": {
      "density": 1.2,
      "lsi_count": 8,
      "status": "pass"
    },
    "content_metrics": {
      "word_count": 2100,
      "avg_sentence_length": 18,
      "avg_paragraph_length": 120,
      "status": "pass"
    },
    "internal_links": {
      "count": 4,
      "status": "pass"
    },
    "schemas": {
      "faq_present": true,
      "article_present": true,
      "valid_json_ld": true,
      "status": "pass"
    }
  },

  "content_quality": {
    "readability_score": 68,
    "active_voice_percentage": 85,
    "has_cta": true,
    "has_faq": true,
    "has_toc": true,
    "status": "pass"
  },

  "competitive_benchmark": {
    "word_count_vs_avg_top3": "+15%",
    "h2_count_vs_avg_top3": "equal",
    "lsi_coverage_vs_top3": "+20%",
    "status": "competitive"
  },

  "overall_status": "pass",
  "score": 7.75,
  "recommendation": "Ready for publication",

  "issues": [],
  "warnings": [
    "Authoritativeness could be improved with author bio"
  ],
  "suggestions": [
    "Add case study for stronger Experience signals",
    "Link to privacy policy for Trust enhancement"
  ]
}
```

## Pass/Fail Logic

**FAIL** (cannot proceed to publication):
- **Flesch-Kincaid Score < 60** (HARD FAIL - Readability zu niedrig!)
- E-E-A-T overall score < 5.0
- Brand compliance violation (any critical rule)
- Title or meta description missing
- No H1 heading
- Keyword density < 0.3% or > 2.5%
- Word count < 800 words
- No schemas present
- Broken internal links

**WARNING** (can proceed but improvement recommended):
- E-E-A-T score 5.0-6.9
- Keyword density 0.3-0.7% (under-optimized)
- Word count 800-1200 (short)
- Only 1 internal link
- Missing FAQ section

**PASS** (ready for publication):
- E-E-A-T score ≥ 7.0
- All brand compliance rules met
- All SEO technical checks pass
- Content quality acceptable
- Competitive vs. SERP top 3

## Process Steps

1. **Load Content**: Read file or fetch URL
2. **Extract Metadata**: Parse title, meta, headings, schemas
3. **Analyze E-E-A-T**: Score based on signal detection
4. **Check Brand Compliance**: Validate critical rules
5. **Validate SEO Technical**: Check all technical requirements
6. **Assess Content Quality**: Readability, engagement, uniqueness
7. **Benchmark vs. Competitors**: If SERP data available
8. **Generate Report**: Create quality-report.json
9. **Return Status**: Pass/Warning/Fail with recommendations

## Critical Rules

**No False Positives**:
- Be strict on brand compliance (critical business rules)
- Be lenient on creative writing style (don't enforce rigid templates)
- Balance SEO optimization with natural language

**Context-Aware Scoring**:
- Ratgeber articles: Higher E-E-A-T threshold (≥ 7.5)
- Service pages: Medium threshold (≥ 6.5)
- Blog posts: Lower threshold (≥ 6.0)

**Actionable Feedback**:
- Don't just score - provide specific improvement suggestions
- Reference line numbers or sections for issues
- Prioritize fixes (critical → important → nice-to-have)

## Token Efficiency

**Per Check**: ~5k tokens
- Content parsing: ~2k
- Analysis: ~2k
- Report generation: ~1k

## Integration

**Used by**:
- `seo-full-workflow` (Phase 6)
- `seo-content-optimizer` (before/after comparison)
- Manual content validation

**Depends on**:
- Content file or URL
- Optional: `serp-analysis` for competitive benchmarking

## Error Handling

**File Not Found**: Return error, suggest correct path
**Invalid URL**: Try with/without www, suggest alternatives
**Parsing Errors**: Report line number, suggest format correction
**Schema Validation Fails**: Return JSON-LD error details

## Notes

- **Quality Gate**: Blocks publication if critical issues found
- **Continuous Improvement**: Use for quarterly content audits
- **Before/After**: Compare scores when optimizing existing content
- **Benchmarking**: Optional but recommended for competitive analysis
- **E-E-A-T Focus**: Primary quality indicator for Google rankings
- **Brand Critical**: Compliance failures are non-negotiable
