# Phase 6: Quality Check & Publication Readiness

**Token Budget**: ~400 Tokens
**Main Deliverables**: `quality-report.json`, `eeat-score.json`, `competitive-positioning.json`, Publication-Ready Article
**Agent Pattern**: Sub-Agent (comprehensive validation)
**Version**: 2.1 (2025-01-05) - Kompakt-Version

---

## Phase 6A: Content Quality Validation (Sub-Agent)

**WICHTIG**: Sub-Agent führt alle Validierungen durch. Main-Agent orchestriert nur!

### INPUT FILES

Lies ALLE 8 Dateien sequenziell aus `SEO/SEO-CONTENT/{keyword-slug}/`:

**Content & SEO Files (Phase 4-5)**:
1. `content/article-draft.md` - Content Quality, Readability, Word Count, E-E-A-T
2. `seo/seo-metadata.json` - Metadata Validation (Title, Description)
3. `seo/schema-article.json` - Schema Markup Validation
4. `seo/schema-faq.json` - FAQ Schema (optional)
5. `seo/internal-linking.json` - Internal Linking (min 3 Links)

**Research Files (Phase 1-2)**:
6. `research/keyword-analysis.json` - Primary Keyword, Supporting Keywords, Target Word Count
7. `research/serp-analysis.json` - Competitive Positioning, PAA Coverage, Search Intent
8. `planning/content-outline.json` - Must-Have Topics, H2/H3 Structure

---

## AUFGABE: 8-Punkt-Validierung

### 1. Content Quality Validation

**Word Count Check**:
- Ziel: `target_word_count` (aus content-outline.json)
- Akzeptabel: `word_count_range_min` - `word_count_range_max`
- KRITISCH: < (min × 0.90) OR > max

**Keyword Density**:
- Primary: 0.8-1.2% | WARNUNG: >1.5% (Stuffing) | <0.5% (Under-optimized)
- Supporting: 0.3-0.6% pro Keyword
- Formel: `(Keyword Count / Total Words) * 100`

**Must-Have Topics Coverage**:
- Min 80% Coverage erforderlich
- Liste fehlende Topics

**H2/H3 Structure**:
- Min 5 H2 Headings
- Primary Keyword in min 1 H2
- Keine Heading-Hierarchie-Sprünge

### 2. Readability Analysis

**Flesch Reading Ease**: 70-80 (Ziel) | 60-85 (Akzeptabel) | <50 oder >90 (KRITISCH)
Formel: `FRE = 180 - (ASL * 1.0) - (ASW * 58.5)`

**Sentence Length**: Durchschnitt 12-18 Wörter | Max: Keine Sätze >35 Wörter

**Paragraph Length**: Durchschnitt 3-4 Sätze | Max: Keine Absätze >7 Sätze

**Fachbegriff-Ratio**: <5% (Ziel) | 5-8% (Akzeptabel) | >10% (KRITISCH)
Formel: `(Ungeklärte Fachbegriffe / Total Words) * 100`

### 3. E-E-A-T Deep Scoring (Nuanciert 0.0-10.0)

#### Experience (Max 2.5):
- +1.5: Min 1 konkretes Fallbeispiel mit Zahlen
- +0.5: Eigene Fotos/Videos integriert
- +0.5: Ich/Wir-Perspektive verwendet
- +0.5: Min 3 konkrete Handlungsempfehlungen
- +0.5: Checklisten/Step-by-Step-Guides

#### Expertise (Max 2.5):
- +1.5: Autor mit relevanten Credentials
- +0.5: Credentials prominent platziert
- +0.5: Mehrjährige Berufserfahrung erwähnt
- +0.5: Fachbegriffe korrekt verwendet UND erklärt (min 5)
- +0.5: Detailtiefe zeigt Fachkompetenz

#### Authoritativeness (Max 2.5):
- +1.0: Min 3 externe Referenzen (FN, Tierarzt-Verbände, Studien)
- +0.5: Min 1 aktuelle Studie/Statistik (<2 Jahre)
- +0.5: Min 1 Referenz zu offiziellen Guidelines
- +0.5: Branchendaten/Marktstatistiken zitiert

#### Trustworthiness (Max 2.5):
- +1.0: Alle statistischen Claims mit Quellen belegt
- +0.5: Quellen direkt verlinkt
- +0.5: Transparenz über Limitationen
- +0.5: Pro/Contra oder Vor-/Nachteile aufgeführt
- +0.5: Risiken/Challenges erwähnt

**Total E-E-A-T Score**: Sum(Experience + Expertise + Authoritativeness + Trustworthiness)
**Interpretation**: 8.5-10.0: Outstanding | 7.0-8.4: Excellent | 6.0-6.9: Good | <6.0: Needs Improvement

### 4. SEO Technical Validation

**Metadata Check**:
- Title Tag: 50-60 Zeichen, Primary Keyword am Anfang
- Meta Description: 150-160 Zeichen, CTA enthalten
- URL Slug: SEO-optimiert (lowercase, hyphens, primary keyword)
- Open Graph Tags: Vollständig (title, description, image, url, type)
- Twitter Cards: Vollständig

**Schema Markup**:
- Min 2 Schema Types (Article + FAQ/HowTo/Breadcrumb)
- JSON-LD Syntax korrekt
- Required Properties vorhanden

**Internal Linking**:
- Min 3 interne Links
- Contextual Anchor Text
- No Broken Links
- Relevanz-Score >0.7 für alle Links

### 5. Competitive Positioning (v2.0)

#### Content Length Delta:
```
Top 3 Word Counts: [2100, 2300, 2450]
Median: 2300
Unser Artikel: 2500
Delta: +200 (+8.7%)
```
- ✅ Target: +10-20% mehr als Top 3 Median
- ⚠️ Acceptable: ±10%
- ❌ Unacceptable: <-10%

#### Topic Completeness Gap:
- Extrahiere H2/H3 aus Top 3 SERP Results
- Identifiziere Topics die ≥2 der Top 3 abdecken
- Prüfe Coverage unseres Artikels
- ✅ Target: ≥90% | ⚠️ Acceptable: 80-90% | ❌ Unacceptable: <80%

#### Freshness Score:
- 2024/2025 Erwähnungen vs. bester Competitor
- Aktuelle Statistiken (<1 Jahr alt)
- Trending Topics integriert
- ✅ Target: Min gleich viele wie bester Competitor + min 1 frische Statistik

### 6. Search Intent Alignment (v2.0)

#### PAA Coverage Rate:
- Prüfe alle PAA-Fragen aus Phase 2
- Pro PAA: Min 50 Wörter Answer erforderlich
- ✅ Target: 80% (4/5 PAAs) | ⚠️ Acceptable: 60% | ❌ Unacceptable: <60%

#### Intent Match:
- Informational → comprehensive Guide (nicht sales-lastig)
- Transactional → Handlungsempfehlungen + CTAs
- Commercial → Vergleiche/Reviews
- Navigational → Landingpage

#### Query Refinement Coverage:
- Top 10 Related Keywords aus Phase 1
- Prüfe natürliche Integration (min 1x)
- ✅ Target: 80% (8/10) | ⚠️ Acceptable: 60-70% | ❌ Unacceptable: <60%

### 7. Click-Worthiness Validation (v2.0)

#### Title Optimization (4 Kriterien):
1. Emotional Trigger: Power Words ("Ultimativ", "Sicher", "Bewährt")
2. Primary Keyword Position: In ersten 5 Wörtern
3. Number/Year: "7 Schritte", "2024 Guide"
4. Unique Angle: Differentiator vs. Generic Titles
- ✅ Excellent: 4/4 | ⚠️ Good: 3/4 | ❌ Poor: <3/4

#### Meta Description Quality (3 Kriterien):
1. Hook: Starker Einstieg (erste 10 Wörter)
2. Benefit-Oriented: Was hat der User davon?
3. CTA Present: Call-to-Action integriert
- ✅ Excellent: 3/3 | ⚠️ Good: 2/3 | ❌ Poor: <2/3

#### Content Hook (3 Kriterien):
Erste 100 Wörter: Problem Statement + Promise + Credibility Anchor
- ✅ Strong: 3/3 | ⚠️ Acceptable: 2/3 | ❌ Weak: <2/3

### 8. Overall Quality Score Berechnung

```
Overall Score = Weighted Average:
- Content Quality (20%)
- Readability (15%)
- E-E-A-T (20%)
- SEO Technical (10%)
- Competitive Positioning (15%)
- Search Intent (10%)
- Click-Worthiness (10%)
```

---

## OUTPUT FORMAT (JSON)

```json
{
  "quality_report": {
    "overall_score": 8.7,
    "publication_ready": true,
    "content_quality": {
      "word_count": 2500,
      "word_count_status": "optimal",
      "primary_keyword_density": 1.1,
      "must_have_topics_coverage": 0.9,
      "h2_count": 7
    },
    "readability": {
      "flesch_reading_ease": 72,
      "avg_sentence_length": 16,
      "fachbegriff_ratio": 4.2
    },
    "eeat_score": {
      "total_score": 8.5,
      "experience_score": 2.5,
      "expertise_score": 2.0,
      "authoritativeness_score": 2.0,
      "trustworthiness_score": 2.0
    },
    "seo_technical": {
      "schema_types_count": 2,
      "internal_links_count": 4
    },
    "competitive_positioning": {
      "content_length_delta": { "delta_percent": 8.7, "status": "target_reached" },
      "topic_completeness": { "coverage_rate": 0.9, "missing_topics": ["Versicherung"] },
      "freshness_score": { "freshness_delta": 1.2, "status": "exceeds_target" }
    },
    "search_intent_alignment": {
      "paa_coverage": { "coverage_rate": 0.8, "missing_paas": [] },
      "query_refinement_coverage": { "integration_rate": 0.8 }
    },
    "click_worthiness": {
      "title_optimization": { "score": 4, "status": "excellent" },
      "meta_description_quality": { "score": 3, "status": "excellent" },
      "content_hook": { "score": 3, "status": "strong" }
    },
    "warnings": [],
    "recommendations": []
  }
}
```

**WICHTIG**:
- Alle Scores müssen gemessen werden, nicht geschätzt!
- Wenn Daten fehlen → klar in warnings kommunizieren
- Recommendations müssen actionable sein
- v2.0 Threshold: overall_score <7.5 → publication_ready = false

---

## Quality Gate Phase 6 (v2.0)

| Check | Target | Acceptable | Critical |
|-------|--------|------------|----------|
| Overall Quality Score | ≥8.0 | ≥7.5 | <7.5 |
| E-E-A-T Score | ≥7.0 | ≥6.5 | <6.5 |
| Primary Keyword Density | 0.8-1.2% | 0.5-1.5% | <0.5% or >1.5% |
| Flesch Reading Ease | 70-80 | 60-85 | <50 or >90 |
| Content Length Delta | +10-20% | ±10% | <-10% |
| Topic Completeness | ≥90% | ≥80% | <80% |
| PAA Coverage | ≥80% | ≥60% | <60% |
| Title CTR Score | 4/4 | 3/4 | <3/4 |

**Publication Decision**:
- ✅ All Targets → Publish immediately
- ⚠️ Acceptable range → Publish mit Monitoring
- ❌ Critical threshold → Mandatory Phase 6B Revision

---

## Phase 6B: Final Content Refinement (Conditional)

Nur ausführen wenn Quality Gate Critical Warnings vorhanden sind!

**Priorität**:
1. Critical: Competitive Gaps (missing topics aus Top 3)
2. High: PAA Coverage Gaps
3. Medium: E-E-A-T Improvements
4. Low: CTR Optimizations

**Quality Gate 6B**:
- Alle Critical Warnings behoben
- Overall Score Improvement (min +0.5)
- Competitive Gaps geschlossen (min 90%)
- Keine neuen Warnings

---

## Output Files

Speichere in `SEO/SEO-CONTENT/{keyword-slug}/quality/`:

1. **quality-report.json** - Vollständiger Quality Check
2. **eeat-score.json** - E-E-A-T Breakdown
3. **competitive-positioning.json** - Competitive Metrics
4. **final-article.md** - Copy von article-draft.md (publication-ready)
5. **publication-checklist.md** - Pre-/Post-Publication Checks

---

**Phase 6 Checklist**:
- [ ] Sub-Agent Quality Check ausgeführt
- [ ] Quality Report erstellt (Overall Score ≥7.5)
- [ ] E-E-A-T Deep Score berechnet (≥6.5)
- [ ] Competitive Positioning validiert (Length Delta, Topic Completeness, Freshness)
- [ ] Search Intent Alignment geprüft (PAA, Intent Match, Query Refinement)
- [ ] CTR-Optimierung validiert (Title, Meta Description, Content Hook)
- [ ] Output Files gespeichert
- [ ] Publication Checklist erstellt
- [ ] Ready für Publication: Rank-1 Potential!
