# Phase 6: Quality Check & Publication Readiness

**Token Budget**: ~550-600 Tokens (v2.0 erweitert)
**Main Deliverables**: `quality-report.json`, `eeat-score.json`, `competitive-positioning.json`, Publication-Ready Article
**Agent Pattern**: Sub-Agent (comprehensive validation)
**Version**: 2.1 (2025-01-05)

---

## Phase 6A: Content Quality Validation (Sub-Agent)

**WICHTIG**: Sub-Agent führt alle Validierungen durch. Main-Agent orchestriert nur!

### Step 1: Comprehensive Quality Check

Führe finale Qualitätsprüfung aller Deliverables aus Phase 1-5 durch.

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Comprehensive quality validation for SEO article v2.0</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Führe eine umfassende Qualitätsprüfung des finalen SEO-Artikels durch (v2.0 mit Competitive Positioning).

## INPUT FILES (Sub-Agent liest selbst)

Du benötigst folgende Dateien aus `SEO/SEO-CONTENT/{keyword-slug}/`:

### Content & SEO Files (Phase 4-5 Outputs):
1. **content/article-draft.md**
   - Verwendung: Content Quality Check, Readability Analysis, Word Count, E-E-A-T Scoring
   - Tool: `Read`

2. **seo/seo-metadata.json**
   - Verwendung: Metadata Validation (Title, Description Längen, CTR Optimization)
   - Tool: `Read`

3. **seo/schema-article.json**
   - Verwendung: Schema Markup Validation (Article Schema Pflicht-Check)
   - Tool: `Read`

4. **seo/schema-faq.json** (optional)
   - Verwendung: FAQ Schema Validation (falls vorhanden)
   - Tool: `Read`

5. **seo/internal-linking.json**
   - Verwendung: Internal Linking Check (min 3 Links)
   - Tool: `Read`

### Research Files (Phase 1-2 Outputs):
6. **research/keyword-analysis.json**
   - Verwendung: Primary Keyword, Supporting Keywords, Target Word Count, Keyword Density Checks
   - Tool: `Read`

7. **research/serp-analysis.json**
   - Verwendung: Competitive Positioning (top_3_serp_results), PAA Coverage, Search Intent
   - Tool: `Read`

### Planning Files (Phase 3 Outputs):
8. **planning/content-outline.json**
   - Verwendung: Must-Have Topics Check, H2/H3 Structure Validation, Topic Completeness
   - Tool: `Read`

**WICHTIG**:
- Lies ALLE 8 Dateien sequenziell mit `Read` Tool
- Extrahiere relevante Daten für Quality Checks
- Speichere extrahierte Daten in lokalen Variablen (keine JSON-Serialisierung!)

## AUFGABE:

### 1. Content Quality Validation

**Word Count Check**:
- **Ziel**: `word_count_data.target_word_count` (aus content-outline.json Phase 3)
- **Akzeptabel**: `word_count_range_min` - `word_count_range_max` (SERP-competitive range)
- **Warning**: < `word_count_range_min` (avg × 0.85)
- **KRITISCH**: < (`word_count_range_min` × 0.90) OR > `word_count_range_max` → Flag für Revision
- **Fallback**: Bei word_count_strategy = "fallback" → Ziel 2500, Akzeptabel 2000-3500

**Keyword Density Check**:
- **Primary Keyword**: 0.8-1.2% Density
- **Supporting Keywords**: 0.3-0.6% Density pro Keyword
- **WARNUNG**: Wenn Primary > 1.5% → Keyword-Stuffing-Risiko
- **WARNUNG**: Wenn Primary < 0.5% → Under-Optimization

**Berechnung**:
```
Keyword Density = (Keyword Count / Total Words) * 100
```

**Must-Have Topics Coverage**:
- Prüfe ob ALLE `must_have_topics` aus Phase 2 im Artikel abgedeckt sind
- Min 80% Coverage erforderlich
- Wenn Topic fehlt → Liste in Quality Report

**H2/H3 Structure Validation**:
- Min 5 H2 Headings vorhanden
- Primary Keyword in min 1 H2 integriert
- H3s korrekt unter H2s gruppiert (keine verwaiste H3s)
- Keine Heading-Hierarchie-Sprünge (H2 → H4)

### 2. Readability Analysis (Enhanced v2.0)

**Flesch Reading Ease Score**:
- **Ziel**: 70-80 (Leicht lesbar für Pferdekäufer ohne Fachkenntnisse)
- **Akzeptabel**: 60-85
- **KRITISCH**: < 50 (zu komplex) oder > 90 (zu simpel)

**⚠️ ÄNDERUNG v2.0**: Target von 60-70 auf 70-80 erhöht für bessere Accessibility.

**Formel** (für Deutsch angepasst):
```
FRE = 180 - (ASL * 1.0) - (ASW * 58.5)
ASL = Average Sentence Length
ASW = Average Syllables per Word
```

**Sentence Length Check**:
- **Durchschnitt**: 12-18 Wörter pro Satz (verschärft v2.0)
- **Max**: Keine Sätze > 35 Wörter
- **WARNUNG**: Wenn > 20% der Sätze länger als 22 Wörter

**Paragraph Length Check**:
- **Durchschnitt**: 3-4 Sätze pro Absatz (verschärft v2.0)
- **Max**: Keine Absätze > 7 Sätze
- **WARNUNG**: Wenn > 15% der Absätze länger als 5 Sätze

**Fachbegriff-Ratio Check (NEU v2.0)**:
- **Fachbegriffe identifizieren**: Pferdewirtschaftliche Termini ohne Erklärung
- **Ziel**: < 5% aller Wörter sind ungeklärte Fachbegriffe
- **Akzeptabel**: 5-8%
- **KRITISCH**: > 10% → Accessibility-Problem für Laien

**Berechnung**:
```
Fachbegriff-Ratio = (Ungeklärte Fachbegriffe Count / Total Words) * 100
```

### 3. E-E-A-T Deep Scoring (Enhanced v2.0)

**⚠️ WICHTIGER HINWEIS v2.0**:
Die E-E-A-T Bewertung wurde von einem **binären All-or-Nothing-System** zu einem **nuancierten Punktesystem** weiterentwickelt. Dies ermöglicht präzisere Scores und verhindert unfaire Null-Punktierung bei partiell erfüllten Kriterien.

Berechne E-E-A-T Score (0-10) basierend auf:

#### **Experience (Max 2.5 Punkte)**

**Konkrete Case Studies & Praxis-Erfahrung**:
- ✅ **+1.5 Punkte**: Min 1 konkretes Fallbeispiel mit Zahlen/Details (z.B. "Beim Kauf unseres Warmbluts 2024...")
- ✅ **+0.5 Punkte**: Eigene Fotos/Videos im Content integriert oder referenziert
- ✅ **+0.5 Punkte**: Ich/Wir-Perspektive verwendet ("Wir haben getestet", "In unserer Erfahrung")

**Praktische Tipps & Actionable Insights**:
- ✅ **+0.5 Punkte**: Min 3 konkrete Handlungsempfehlungen (z.B. "Bestehen Sie auf Ankaufsuntersuchung")
- ✅ **+0.5 Punkte**: Checklisten oder Step-by-Step-Guides integriert

**Scoring-Logik**:
```
Total Experience Score = Sum(obige Punkte, max 2.5)
Example: 1.5 + 0.5 + 0.5 + 0.5 = 3.0 → capped at 2.5
```

#### **Expertise (Max 2.5 Punkte)**

**Credentials & Autorenkredit**:
- ✅ **+1.5 Punkte**: Autor mit relevanten Credentials (Tierarzt, Pferdewirt, Reitlehrer, etc.)
- ✅ **+0.5 Punkte**: Credentials prominent platziert (Autorenbox oder unter Titel)
- ✅ **+0.5 Punkte**: Mehrjährige Berufserfahrung erwähnt (z.B. "10 Jahre als Pferdewirt")

**Fachkompetenz-Signale**:
- ✅ **+0.5 Punkte**: Fachbegriffe korrekt verwendet UND erklärt (min 5 Begriffe)
- ✅ **+0.5 Punkte**: Detailtiefe zeigt Fachkompetenz (z.B. spezifische Rassenmerkmale, medizinische Details)

**Scoring-Logik**:
```
Total Expertise Score = Sum(obige Punkte, max 2.5)
Example: 1.5 + 0.5 + 0.5 + 0.5 = 3.5 → capped at 2.5
```

#### **Authoritativeness (Max 2.5 Punkte)**

**Externe Referenzen & Quellen**:
- ✅ **+1.0 Punkte**: Min 3 externe Referenzen zu autoritativen Quellen (FN, Tierarzt-Verbände, Studien)
- ✅ **+0.5 Punkte**: Mindestens 1 Referenz ist aktuelle Studie/Statistik (<2 Jahre alt)
- ✅ **+0.5 Punkte**: Mindestens 1 Referenz zu offiziellen Guidelines/Standards (z.B. FN-Kaufverträge)

**Branchenanerkennung & Citations**:
- ✅ **+0.5 Punkte**: Verweise auf etablierte Standards/Best Practices (z.B. "Laut FN-Richtlinien...")
- ✅ **+0.5 Punkte**: Branchendaten/Marktstatistiken zitiert (z.B. "Durchschnittspreis in Deutschland 2024: €X")

**Scoring-Logik**:
```
Total Authoritativeness Score = Sum(obige Punkte, max 2.5)
Example: 1.0 + 0.5 + 0.5 + 0.5 = 2.5
```

#### **Trustworthiness (Max 2.5 Punkte)**

**Quellenangaben & Transparenz**:
- ✅ **+1.0 Punkte**: Alle statistischen/faktischen Claims mit Quellen belegt
- ✅ **+0.5 Punkte**: Quellen direkt verlinkt (nicht nur "laut XY", sondern mit URL)
- ✅ **+0.5 Punkte**: Transparenz über Limitationen/Unsicherheiten ("Es gibt keine pauschale Antwort...")

**Balanced Content & Objektivität**:
- ✅ **+0.5 Punkte**: Pro/Contra oder Vor-/Nachteile explizit aufgeführt
- ✅ **+0.5 Punkte**: Risiken/Challenges erwähnt (nicht nur positive Seite)

**Scoring-Logik**:
```
Total Trustworthiness Score = Sum(obige Punkte, max 2.5)
Example: 1.0 + 0.5 + 0.5 + 0.5 = 2.5
```

#### **Total E-E-A-T Score Berechnung**:
```
Total E-E-A-T Score = Experience + Expertise + Authoritativeness + Trustworthiness
Range: 0.0 - 10.0
```

**E-E-A-T Score Interpretation**:
- **8.5-10.0**: Outstanding - Top 5% Quality Level
- **7.0-8.4**: Excellent - Publication-Ready ohne Revision
- **6.0-6.9**: Good - Minor E-E-A-T improvements möglich
- **4.0-5.9**: Acceptable - Mehrere E-E-A-T Signale fehlen
- **0.0-3.9**: Poor - Major Revision erforderlich

### 4. SEO Technical Validation

**Metadata Check**:
- ✅ **Title Tag**: 50-60 Zeichen, Primary Keyword am Anfang
- ✅ **Meta Description**: 150-160 Zeichen, CTA enthalten
- ✅ **URL Slug**: SEO-optimiert (lowercase, hyphens, primary keyword)
- ✅ **Open Graph Tags**: Vollständig (title, description, image, url, type)
- ✅ **Twitter Cards**: Vollständig (card, title, description, image)

**Schema Markup Validation**:
- ✅ **Min 2 Schema Types** implementiert (Article + FAQ/HowTo/Breadcrumb)
- ✅ **JSON-LD Syntax korrekt** (keine Syntax-Fehler)
- ✅ **Required Properties vorhanden** (z.B. Article braucht headline, datePublished, author)
- ✅ **Structured Data Testing Tool kompatibel** (Google-valide)

**Internal Linking Check**:
- ✅ **Min 3 interne Links** zu relevanten PferdeWert.de Ratgeber-Seiten
- ✅ **Contextual Anchor Text** (natürlich integriert, kein "Hier klicken")
- ✅ **No Broken Links** (alle URLs erreichbar)
- ✅ **Relevanz-Score > 0.7** für alle Links

### 5. Competitive Positioning Validation (NEU v2.0)

**KONTEXT**: Diese Validierung prüft ob der Artikel kompetitiv gegenüber den Top 3 SERP-Rankings positioniert ist. Basierend auf den `top_3_serp_results` aus Phase 2.

**⚠️ WICHTIG**: Dies ist der entscheidende Unterschied zwischen "gutem Content" und "Rank-1 Content". Ohne Competitive Positioning validieren wir Content im Vakuum.

#### **5.1 Content Length Delta**

Vergleiche Word Count des Artikels mit Top 3 SERP Median.

**Berechnung**:
```
Top 3 Word Counts: [2100, 2300, 2450]
Median: 2300
Unser Artikel: 2500 Wörter
Delta: +200 Wörter (+8.7%)
```

**Bewertung**:
- ✅ **Target**: +10-20% mehr Wörter als Top 3 Median (zeigt Comprehensiveness)
- ⚠️ **Acceptable**: ±10% vom Median (ähnliche Tiefe)
- ❌ **Unacceptable**: < -10% (kürzer als Competitors → Comprehensiveness-Risiko)

**Rationale**: Google bevorzugt comprehensive Content. 10-20% mehr Wörter = bessere Topic Coverage ohne Filler.

#### **5.2 Topic Completeness Gap Analysis**

Prüfe welche Topics die Top 3 Competitors abdecken, die in unserem Artikel fehlen.

**Methodik**:
1. Extrahiere H2/H3 Headings aus Top 3 SERP Results (aus `serp_analysis.top_3_serp_results[].headings`)
2. Mappe diese auf Topics (z.B. H2 "Ankaufsuntersuchung" → Topic "Veterinärcheck")
3. Identifiziere Topics die ≥2 der Top 3 abdecken (= wichtige Topics)
4. Prüfe ob unser Artikel diese Topics auch abdeckt

**Bewertung**:
- ✅ **Target**: Min 90% Coverage (alle wichtigen Competitor-Topics abgedeckt)
- ⚠️ **Acceptable**: 80-90% Coverage (1-2 Topics fehlen)
- ❌ **Unacceptable**: < 80% Coverage (mehrere wichtige Topics fehlen → Completeness-Gap)

**Output**:
```json
{
  "important_competitor_topics": [
    "Ankaufsuntersuchung",
    "Kaufvertrag",
    "Haftung & Gewährleistung",
    "Transportorganisation",
    "Versicherung"
  ],
  "our_coverage": [
    "Ankaufsuntersuchung",
    "Kaufvertrag",
    "Haftung & Gewährleistung",
    "Transportorganisation"
  ],
  "missing_topics": ["Versicherung"],
  "coverage_rate": 0.8  // 4/5 = 80%
}
```

#### **5.3 Freshness Score**

Prüfe ob Artikel aktuelle Informationen enthält vs. Competitors.

**Indikatoren**:
- **2024/2025 Erwähnungen**: Wie oft werden aktuelle Jahre erwähnt? (z.B. "Preise 2024", "neue Regelung 2025")
- **Aktuelle Statistiken**: Wie viele Datenquellen sind <1 Jahr alt?
- **Trending Topics**: Werden aktuelle Entwicklungen erwähnt? (z.B. "gestiegene Futterkosten 2024")

**Bewertung**:
- ✅ **Target**: Min gleich viele 2024/2025-Erwähnungen wie bester Competitor + min 1 frische Statistik
- ⚠️ **Acceptable**: 70-90% der Freshness-Signale vom besten Competitor
- ❌ **Unacceptable**: < 50% Freshness vs. Competitor → outdated perception

**Berechnung**:
```
Best Competitor Freshness Score:
- 2024/2025 mentions: 5
- Fresh stats (<1yr): 2
Total: 7

Unser Artikel:
- 2024/2025 mentions: 6
- Fresh stats (<1yr): 2
Total: 8

Freshness Delta: +1 (114% vom Competitor) → ✅ Target erreicht
```

**Output**:
```json
{
  "freshness_score": {
    "our_year_mentions": 6,
    "best_competitor_year_mentions": 5,
    "our_fresh_stats": 2,
    "best_competitor_fresh_stats": 2,
    "freshness_delta": 1.14,
    "status": "exceeds_target"
  }
}
```

### 6. Search Intent Alignment Check (NEU v2.0)

**KONTEXT**: Prüft ob der Artikel die tatsächliche User Search Intent erfüllt. Basierend auf PAA-Daten und Related Keywords aus Phase 1/2.

#### **6.1 PAA Coverage Rate**

People Also Ask (PAA) Fragen repräsentieren typische User-Intents. Hohe PAA-Coverage = bessere Intent-Erfüllung.

**Methodik**:
1. Nimm alle PAA-Fragen aus Phase 2 SERP-Analyse (typisch 5-8 Fragen)
2. Prüfe für jede PAA ob sie im Artikel beantwortet wird (nicht nur erwähnt, sondern mit min 50 Wörter Answer)
3. Berechne Coverage Rate

**Bewertung**:
- ✅ **Target**: Min 4/5 PAAs beantwortet (80% Coverage)
- ⚠️ **Acceptable**: 3/5 PAAs beantwortet (60% Coverage)
- ❌ **Unacceptable**: < 3/5 PAAs (< 60% Coverage → Intent-Gaps)

**Output**:
```json
{
  "paa_coverage": {
    "total_paas": 5,
    "answered_paas": 4,
    "coverage_rate": 0.8,
    "missing_paas": [
      "Wie teuer ist eine Ankaufsuntersuchung?"
    ],
    "status": "target_reached"
  }
}
```

#### **6.2 Intent Match Validation**

Prüfe ob der Artikel den primären Search Intent erfüllt.

**Intent-Typen**:
1. **Informational**: User sucht Wissen (z.B. "Wie kaufe ich ein Pferd?")
2. **Transactional**: User will Action (z.B. "Pferd kaufen")
3. **Commercial**: User evaluiert Optionen (z.B. "Bestes Anfängerpferd")
4. **Navigational**: User sucht spezifische Seite (z.B. "PferdeWert Bewertung")

**Validierung**:
- **Informational Intent** → Artikel muss comprehensive Guide sein (nicht sales-lastig)
- **Transactional Intent** → Artikel muss Handlungsempfehlungen + CTAs enthalten
- **Commercial Intent** → Artikel muss Vergleiche/Reviews enthalten
- **Navigational Intent** → Artikel ist Landingpage (kein Ratgeber)

**Methodik**:
1. Identifiziere Primary Intent basierend auf Keyword (aus Phase 1)
2. Prüfe ob Content-Type zum Intent passt

**Bewertung**:
- ✅ **Match**: Content-Type entspricht Primary Intent
- ❌ **Mismatch**: Content-Type widerspricht Intent (z.B. Sales-Content für Informational Intent)

#### **6.3 Query Refinement Coverage**

Prüfe wie viele der Related Keywords (Query Refinements) aus Phase 1 natürlich im Artikel integriert sind.

**Methodik**:
1. Nimm Top 10 Related Keywords aus Phase 1 (`related_keywords`)
2. Prüfe für jedes Keyword ob es im Artikel vorkommt (min 1x natürlich integriert)
3. Berechne Integration Rate

**Bewertung**:
- ✅ **Target**: Min 8/10 Related Keywords natürlich integriert (80%)
- ⚠️ **Acceptable**: 6-7/10 Related Keywords (60-70%)
- ❌ **Unacceptable**: < 6/10 (< 60% → Semantic Breadth fehlt)

**Rationale**: Related Keywords decken semantisches Feld ab. Hohe Integration Rate = bessere Topical Authority.

**Output**:
```json
{
  "query_refinement_coverage": {
    "total_related_keywords": 10,
    "integrated_keywords": 8,
    "integration_rate": 0.8,
    "missing_keywords": [
      "pferdekauf versicherung",
      "gesundheitscheck pferd"
    ],
    "status": "target_reached"
  }
}
```

### 7. Click-Worthiness Validation (NEU v2.0)

**KONTEXT**: Selbst Rank-1 Content ist nutzlos wenn niemand klickt. Diese Validierung prüft SERP-CTR-Faktoren.

#### **7.1 Title Optimization Check**

**Kriterien für click-worthy Titles**:

1. **Emotional Trigger Present**:
   - ✅ Power Words enthalten: "Ultimativ", "Komplett", "Geheim", "Einfach", "Sicher", "Bewährt"
   - Beispiel: "Pferd kaufen: Der **ultimative** Leitfaden für **sichere** Kaufentscheidungen"

2. **Primary Keyword Position**:
   - ✅ Primary Keyword in ersten 5 Wörtern
   - ❌ Primary Keyword erst nach Position 5 → Relevanz nicht sofort erkennbar

3. **Number/Year Present**:
   - ✅ Zahlen erhöhen CTR: "7 Schritte", "2024 Guide", "10 Fehler"
   - Beispiel: "**7 kritische Schritte** beim Pferdekauf [2024]"

4. **Unique Angle**:
   - ✅ Differentiator erkennbar vs. Generic Titles
   - Beispiel: "Pferd kaufen **ohne teure Fehlkäufe**" (Unique Angle: Fehlkauf-Vermeidung)

**Bewertung**:
- ✅ **Excellent**: 4/4 Kriterien erfüllt → High-CTR Title
- ⚠️ **Good**: 3/4 Kriterien erfüllt → Acceptable CTR
- ❌ **Poor**: < 3/4 Kriterien → Generic Title, CTR-Risiko

#### **7.2 Meta Description Quality**

**Kriterien für click-worthy Meta Descriptions**:

1. **Hook (erste 10 Wörter)**:
   - ✅ Starker Einstieg der Attention grabbt
   - Beispiel: "**Teurer Fehlkauf vermeiden**: Entdecken Sie die 7 Schritte..."

2. **Benefit-Oriented**:
   - ✅ Was hat der User davon? (nicht nur Features)
   - Beispiel: "...damit Sie **sicher und entspannt** Ihr Traumpferd finden"

3. **CTA Present**:
   - ✅ Call-to-Action integriert
   - Beispiel: "→ Jetzt **Checkliste kostenlos sichern**"

**Bewertung**:
- ✅ **Excellent**: 3/3 Kriterien erfüllt → High-CTR Description
- ⚠️ **Good**: 2/3 Kriterien erfüllt → Acceptable CTR
- ❌ **Poor**: < 2/3 Kriterien → Generic Description, CTR-Risiko

#### **7.3 Content Hook Validation**

**KONTEXT**: Erste 100 Wörter entscheiden ob User bleibt (Dwell Time Signal).

**Kriterien**:
1. **Problem Statement**: Wird User-Problem in ersten 2 Sätzen adressiert?
2. **Promise**: Wird klar kommuniziert was der Artikel liefert?
3. **Credibility Anchor**: Wird Expertise/Experience früh etabliert?

**Beispiel Strong Hook**:
> "Der Kauf eines Pferdes ist eine der wichtigsten Entscheidungen für jeden Reiter – **und eine der teuersten**. Ein Fehlkauf kostet Sie nicht nur 10.000-50.000€, sondern auch **Jahre verlorene Zeit**. Als Pferdewirte mit über 15 Jahren Erfahrung haben wir **mehr als 200 Ankaufsuntersuchungen begleitet** und zeigen Ihnen die 7 Schritte, mit denen Sie Ihr Traumpferd finden – **ohne teure Überraschungen**."

**Bewertung**:
- ✅ **Strong Hook**: 3/3 Kriterien erfüllt → User bleibt
- ⚠️ **Acceptable Hook**: 2/3 Kriterien erfüllt → Moderate Dwell Time
- ❌ **Weak Hook**: < 2/3 Kriterien → Bounce-Risiko

## OUTPUT FORMAT (JSON):
{
  "quality_report": {
    "overall_score": 8.7,
    "publication_ready": true,
    "version": "2.0",

    "content_quality": {
      "word_count": 2500,
      "word_count_status": "optimal",
      "primary_keyword_density": 1.1,
      "primary_keyword_status": "optimal",
      "supporting_keywords_density": [
        {"keyword": "gesundes pferd kaufen", "density": 0.5, "status": "optimal"}
      ],
      "must_have_topics_coverage": 0.9,
      "h2_count": 7,
      "h2_with_primary_keyword": 2,
      "heading_structure_valid": true
    },

    "readability": {
      "flesch_reading_ease": 72,
      "flesch_status": "optimal",
      "flesch_target": "70-80",
      "avg_sentence_length": 16,
      "sentences_over_22_words": 0.12,
      "avg_paragraph_length": 3.8,
      "paragraphs_over_5_sentences": 0.08,
      "fachbegriff_ratio": 4.2,
      "fachbegriff_status": "optimal"
    },

    "eeat_score": {
      "total_score": 8.5,
      "experience_score": 2.5,
      "expertise_score": 2.0,
      "authoritativeness_score": 2.0,
      "trustworthiness_score": 2.0,
      "breakdown": {
        "experience": {
          "case_study": true,
          "own_media": true,
          "first_person": true,
          "actionable_tips": true,
          "checklists": true
        },
        "expertise": {
          "credentials_present": true,
          "credentials_prominent": true,
          "years_experience": true,
          "technical_terms_explained": 7,
          "depth_signals": true
        },
        "authoritativeness": {
          "external_references": 4,
          "recent_study": true,
          "official_guidelines": true,
          "industry_data": true
        },
        "trustworthiness": {
          "sources_linked": true,
          "limitations_mentioned": true,
          "pros_cons_present": true,
          "risks_mentioned": true
        }
      }
    },

    "seo_technical": {
      "title_tag_length": 58,
      "title_tag_status": "optimal",
      "meta_description_length": 155,
      "meta_description_status": "optimal",
      "url_slug_optimized": true,
      "open_graph_complete": true,
      "twitter_cards_complete": true,
      "schema_types_count": 2,
      "schema_types": ["Article", "FAQPage"],
      "schema_valid": true,
      "internal_links_count": 4,
      "internal_links_status": "optimal"
    },

    "competitive_positioning": {
      "content_length_delta": {
        "our_word_count": 2500,
        "top3_median": 2300,
        "delta_words": 200,
        "delta_percent": 8.7,
        "status": "target_reached"
      },
      "topic_completeness": {
        "important_competitor_topics": 10,
        "our_coverage": 9,
        "missing_topics": ["Versicherung beim Kauf"],
        "coverage_rate": 0.9,
        "status": "target_reached"
      },
      "freshness_score": {
        "our_year_mentions": 6,
        "best_competitor_year_mentions": 5,
        "our_fresh_stats": 2,
        "best_competitor_fresh_stats": 2,
        "freshness_delta": 1.2,
        "status": "exceeds_target"
      }
    },

    "search_intent_alignment": {
      "paa_coverage": {
        "total_paas": 5,
        "answered_paas": 4,
        "coverage_rate": 0.8,
        "missing_paas": ["Wie teuer ist eine Ankaufsuntersuchung?"],
        "status": "target_reached"
      },
      "intent_match": {
        "primary_intent": "informational",
        "content_type": "comprehensive_guide",
        "match": true
      },
      "query_refinement_coverage": {
        "total_related_keywords": 10,
        "integrated_keywords": 8,
        "integration_rate": 0.8,
        "missing_keywords": ["pferdekauf versicherung"],
        "status": "target_reached"
      }
    },

    "click_worthiness": {
      "title_optimization": {
        "emotional_trigger": true,
        "keyword_position": "first_5_words",
        "number_year_present": true,
        "unique_angle": true,
        "score": 4,
        "status": "excellent"
      },
      "meta_description_quality": {
        "hook_present": true,
        "benefit_oriented": true,
        "cta_present": true,
        "score": 3,
        "status": "excellent"
      },
      "content_hook": {
        "problem_statement": true,
        "promise_clear": true,
        "credibility_anchor": true,
        "score": 3,
        "status": "strong"
      }
    },

    "warnings": [
      "Topic 'Versicherung beim Kauf' aus Must-Have List fehlt im Artikel",
      "PAA 'Wie teuer ist eine Ankaufsuntersuchung?' nicht beantwortet"
    ],

    "recommendations": [
      "Ergänze Sektion zu Versicherung beim Pferdekauf (150-200 Wörter)",
      "Füge PAA-Antwort zu Kosten der Ankaufsuntersuchung hinzu (50-100 Wörter)",
      "Erwäge HowTo Schema für Tutorial-Sektion hinzuzufügen"
    ]
  }
}

**WICHTIG**:
- Alle Scores müssen auf tatsächlichen Messungen basieren, nicht geschätzt!
- Wenn Daten für eine Metrik fehlen → klar kommunizieren in warnings
- Recommendations müssen actionable sein (konkrete Verbesserungsvorschläge)
- **v2.0 Threshold**: Wenn overall_score < 7.5 → publication_ready = false (verschärft)
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 6 (v2.0 Enhanced)

Prüfe ob finale Validierung erfolgreich war:

| Check | Target v2.0 | Acceptable v2.0 | Critical v2.0 |
|-------|-------------|-----------------|---------------|
| **Overall Quality Score** | ≥ 8.0 | ≥ 7.5 | < 7.5 |
| **E-E-A-T Score** | ≥ 7.0 | ≥ 6.5 | < 6.5 |
| **Word Count** | target_word_count | word_count_range_min - word_count_range_max | < (word_count_range_min × 0.90) or > word_count_range_max |
| **Primary Keyword Density** | 0.8-1.2% | 0.5-1.5% | < 0.5% or > 1.5% |
| **H2 Headings** | ≥ 7 | ≥ 5 | < 5 |
| **Flesch Reading Ease** | 70-80 | 60-85 | < 50 or > 90 |
| **Fachbegriff-Ratio** | < 5% | < 8% | > 10% |
| **Schema Types** | ≥ 3 | ≥ 2 | < 2 |
| **Internal Links** | ≥ 4 | ≥ 3 | < 3 |
| **Content Length Delta** | +10-20% | ±10% | < -10% |
| **Topic Completeness** | ≥ 90% | ≥ 80% | < 80% |
| **PAA Coverage** | ≥ 80% | ≥ 60% | < 60% |
| **Query Refinement Coverage** | ≥ 80% | ≥ 60% | < 60% |
| **Title CTR Score** | 4/4 | 3/4 | < 3/4 |

**Publication Decision Tree**:
- ✅ **All Targets reached** → Publish immediately, Rank-1 potential
- ⚠️ **Acceptable range** → Publish mit Monitoring, consider iteration after 2 weeks
- ❌ **Critical threshold breached** → Mandatory Phase 6B Revision

**Partial Success**: Wenn Score = 7.0-7.4 → Proceed mit Warning für "Good but not competitive" Quality.

---

## Phase 6B: Final Content Refinement (Conditional)

**WICHTIG**: Nur ausführen wenn Quality Gate Critical Warnings vorhanden sind!

### Step 1: Implement Fixes

Wenn Quality Report Warnings enthält:

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Implement quality improvements based on v2.0 report</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Implementiere die Verbesserungsvorschläge aus dem Quality Report v2.0.

## QUALITY REPORT WARNINGS:
{quality_report.warnings}

## RECOMMENDATIONS:
{quality_report.recommendations}

## COMPETITIVE GAPS (NEU v2.0):
{quality_report.competitive_positioning.topic_completeness.missing_topics}
{quality_report.search_intent_alignment.paa_coverage.missing_paas}

## AUFGABE:
Für jede Warning/Recommendation:
1. Identifiziere betroffene Sektion im Artikel
2. Implementiere Fix (z.B. fehlende Topics ergänzen, Keywords reduzieren)
3. **NEU v2.0**: Für competitive gaps → analysiere wie Top 3 Competitors das Topic abdecken, dann besser machen
4. Stelle sicher dass Fix keine neuen Probleme verursacht
5. Re-check impacted metrics (z.B. Word Count nach Ergänzung)

## PRIORITÄT (v2.0):
1. **Critical**: Competitive Gaps (missing topics aus Top 3)
2. **High**: PAA Coverage Gaps (unbeantwortete PAAs)
3. **Medium**: E-E-A-T Improvements
4. **Low**: CTR Optimizations

## OUTPUT:
Überarbeiteter Artikel mit allen Fixes implementiert.

**WICHTIG**: Nur minimal-invasive Änderungen, keine komplette Umschreibung!
</parameter>
</invoke>
</function_calls>
```

**Quality Gate Phase 6B**:
✅ **Alle Critical Warnings behoben**
✅ **Overall Score Improvement** (min +0.5 Punkte)
✅ **Competitive Gaps geschlossen** (min 90% Topic Completeness)
✅ **Keine neuen Warnings entstanden**
❌ **Wenn Fixes neue Probleme verursachen** → Rollback, accept current quality level

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/quality/`:

### 1. `quality-report.json`
```json
{
  "phase": "6A",
  "version": "2.0",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T16:00:00Z",
  "overall_score": 8.7,
  "publication_ready": true,
  "quality_report": {
    "content_quality": {...},
    "readability": {...},
    "eeat_score": {...},
    "seo_technical": {...},
    "competitive_positioning": {...},
    "search_intent_alignment": {...},
    "click_worthiness": {...}
  },
  "warnings": [...],
  "recommendations": [...]
}
```

### 2. `eeat-score.json`
```json
{
  "version": "2.0",
  "total_score": 8.5,
  "experience_score": 2.5,
  "expertise_score": 2.0,
  "authoritativeness_score": 2.0,
  "trustworthiness_score": 2.0,
  "breakdown": {
    "experience": {
      "case_study": true,
      "own_media": true,
      "first_person": true,
      "actionable_tips": true,
      "checklists": true
    },
    "expertise": {...},
    "authoritativeness": {...},
    "trustworthiness": {...}
  },
  "status": "excellent",
  "interpretation": "Outstanding - Top 5% Quality Level"
}
```

### 3. `competitive-positioning.json` (NEU v2.0)
```json
{
  "content_length_delta": {
    "our_word_count": 2500,
    "top3_median": 2300,
    "delta_words": 200,
    "delta_percent": 8.7,
    "status": "target_reached"
  },
  "topic_completeness": {
    "important_competitor_topics": 10,
    "our_coverage": 9,
    "missing_topics": ["Versicherung beim Kauf"],
    "coverage_rate": 0.9,
    "status": "target_reached"
  },
  "freshness_score": {
    "our_year_mentions": 6,
    "best_competitor_year_mentions": 5,
    "freshness_delta": 1.2,
    "status": "exceeds_target"
  }
}
```

### 4. `final-article.md` (Copy of article-draft.md)
Publication-ready Artikel-Kopie in `content/` Ordner.

### 5. `publication-checklist.md`
```markdown
# Publication Checklist v2.0 - {keyword}

## Pre-Publication Checks (Enhanced)
- [ ] Overall Quality Score ≥ 7.5 (v2.0 threshold)
- [ ] E-E-A-T Score ≥ 6.5
- [ ] Competitive Positioning: Topic Completeness ≥ 90%
- [ ] Competitive Positioning: Content Length Delta +10-20%
- [ ] Search Intent: PAA Coverage ≥ 80%
- [ ] CTR Optimization: Title Score 4/4 or 3/4
- [ ] All Must-Have Topics covered
- [ ] Min 3 Internal Links implementiert
- [ ] Schema Markup validated (Google Structured Data Testing Tool)
- [ ] Metadata optimiert (Title, Description, OG, Twitter)
- [ ] Readability Score 70-80 (v2.0 target)
- [ ] Fachbegriff-Ratio < 5%
- [ ] No Broken Links

## Content Files
- [ ] `content/final-article.md` bereit
- [ ] `seo/seo-metadata.json` bereit
- [ ] `seo/schema-article.json` bereit
- [ ] `seo/schema-faq.json` bereit (optional)
- [ ] `seo/internal-linking.json` bereit
- [ ] `quality/competitive-positioning.json` dokumentiert (v2.0)

## Next Steps
1. Copy `final-article.md` zu CMS/Publishing-System
2. Implementiere Schema Markup im HTML <head>
3. Setze Metadata aus `seo-metadata.json`
4. Integriere interne Links aus `internal-linking.json`
5. Upload Hero Image (basierend auf `image_url` in metadata)
6. Schedule Publication oder publish sofort

## Post-Publication (v2.0 Enhanced)
- [ ] Google Search Console: URL zur Indexierung einreichen
- [ ] Interne Verlinkung von anderen Ratgeber-Seiten hinzufügen
- [ ] Social Media Promotion (LinkedIn/Instagram)
- [ ] Tracking einrichten (Google Analytics Event für Ratgeber-Artikel)
- [ ] **NEU v2.0**: Rank Tracking Setup für Primary Keyword (Position täglich tracken)
- [ ] **NEU v2.0**: Competitor Monitoring (monatlich prüfen ob Top 3 Content Updates machen)
```

---

## Troubleshooting (v2.0 Enhanced)

### Problem: Overall Quality Score < 7.5 (v2.0 Threshold)
**Symptom**: Quality Report zeigt `publication_ready: false`

**Diagnose**:
1. Prüfe welche Sub-Scores am niedrigsten sind
2. **NEU v2.0**: Prüfe ob competitive_positioning oder search_intent_alignment niedrig ist (oft größte Hebel)
3. Fokus auf größte Verbesserungspotenziale (z.B. E-E-A-T = 4.0 → hier ansetzen)

**Lösung**:
- **Wenn Competitive Positioning niedrig**:
  - Content Length Delta < -10% → Artikel zu kurz, missing topics ergänzen
  - Topic Completeness < 80% → fehlende Competitor-Topics hinzufügen (check ihre H2/H3s)
  - Freshness Score niedrig → 2024/2025 Mentions + frische Statistiken ergänzen
- **Wenn Search Intent Alignment niedrig**:
  - PAA Coverage < 60% → unbeantwortete PAAs in FAQ-Sektion integrieren
  - Query Refinement < 60% → Related Keywords natürlicher einbauen
- **Wenn E-E-A-T niedrig**: Ergänze Credentials, externe Referenzen, Fallbeispiele
- **Wenn Readability niedrig**: Kürze lange Sätze, vereinfache Fachbegriffe, erhöhe Flesch auf 70-80
- **Wenn SEO Technical niedrig**: Fix Metadata (Title/Description zu lang/kurz)

### Problem: Competitive Positioning: Topic Completeness < 80%
**Symptom**: Mehrere wichtige Competitor-Topics fehlen im Artikel

**Lösung**:
1. **Identifiziere missing topics** aus `competitive_positioning.topic_completeness.missing_topics`
2. **Analysiere Top 3 Coverage**:
   - Wie tief behandeln Competitors diese Topics? (Word Count pro Topic)
   - Welche Unique Angles verwenden sie?
3. **Ergänze Topics im Artikel**:
   - Pro fehlendem Topic: Min 150-200 Wörter Content
   - Besser als Competitor: +20% Wortanzahl + unique angle
   - Verlinke zu relevanten PferdeWert.de Seiten
4. **Re-validate**: Nach Ergänzung erneut Topic Completeness Check → Ziel 90%+

**Beispiel**:
```
Missing Topic: "Versicherung beim Pferdekauf"
Competitor 1: 180 Wörter zu diesem Topic
Competitor 2: 220 Wörter
Competitor 3: Keine Coverage

→ Unser Target: 250 Wörter + Unique Angle: "Welche Versicherungen VOR dem Kauf abschließen"
```

### Problem: PAA Coverage < 60%
**Symptom**: Mehrere wichtige PAA-Fragen nicht im Artikel beantwortet

**Lösung**:
1. **Prüfe `search_intent_alignment.paa_coverage.missing_paas`**
2. **Für jede unbeantwortete PAA**:
   - Erstelle 50-100 Wörter Answer (comprehensive, nicht nur 1 Satz)
   - Integriere in FAQ-Sektion (oder inline wenn besser passt)
   - Verwende H3 mit exakter PAA-Formulierung
3. **Schema Markup Update**: Ergänze FAQPage Schema mit neuen PAAs
4. **Re-validate**: Nach Ergänzung erneut PAA Coverage Check → Ziel 80%+

**Beispiel**:
```
Missing PAA: "Wie teuer ist eine Ankaufsuntersuchung?"

Answer (80 Wörter):
"Die Kosten einer Ankaufsuntersuchung variieren zwischen 200€ und 800€, abhängig vom Umfang.
Eine kleine Ankaufsuntersuchung (ca. 200-300€) umfasst Basischeck, klinische Untersuchung und
Bewegungsanalyse. Die große Ankaufsuntersuchung (500-800€) beinhaltet zusätzlich Röntgenbilder,
Blutbild und erweiterte Diagnostik. Für Sportpferde ab 20.000€ empfehlen wir immer die große
Variante – eine Investition die sich bei 9 von 10 Fällen durch Aufdecken versteckter Mängel lohnt."

→ FAQ-Sektion erweitern + FAQPage Schema updaten
```

### Problem: Keyword Density zu hoch (> 1.5%)
**Symptom**: Warning "Primary Keyword Stuffing Risk"

**Lösung**:
1. Identifiziere Sektionen mit höchster Keyword-Dichte
2. Ersetze einige Primary Keyword Mentions durch:
   - Synonyme (z.B. "Pferdekauf" statt "Pferd kaufen")
   - Pronomen (z.B. "Es" statt Keyword-Wiederholung)
   - Verwandte Begriffe (z.B. "Tier" statt "Pferd")
3. Re-check Density nach Änderungen → Ziel 0.8-1.2%

### Problem: Readability Score zu niedrig (< 60)
**Symptom**: Flesch Reading Ease = 55 → "zu komplex für Zielgruppe"

**Lösung v2.0** (verschärfte Targets):
1. **Sentence Length reduzieren**:
   - Teile Sätze > 22 Wörter in 2 Sätze auf (v2.0 Threshold)
   - Verwende Bullet Points statt langer Aufzählungssätze
   - Ziel: Durchschnitt 12-18 Wörter/Satz
2. **Fachbegriffe reduzieren/erklären**:
   - Fachbegriff-Ratio < 5% (v2.0 Target)
   - Jeden Fachbegriff bei erster Verwendung erklären
   - Verwende einfachere Synonyme wo möglich
3. **Paragraph Length reduzieren**:
   - Teile Absätze > 5 Sätze auf (v2.0 Threshold)
   - Verwende Subheadings (H3) für bessere Gliederung
   - Ziel: Durchschnitt 3-4 Sätze/Absatz
4. **Re-validate**: Nach Änderungen Flesch Check → Ziel 70-80

### Problem: E-E-A-T Score zu niedrig (< 6.5)
**Symptom**: Authoritativeness = 0.5, Trustworthiness = 1.0 → fehlende Quellen

**Lösung v2.0** (nuanciertes Scoring):
1. **Experience erhöhen** (aktuell z.B. nur 1.0/2.5):
   - Füge min 1 konkretes Fallbeispiel hinzu (+1.5 Punkte)
   - Verwende Ich/Wir-Perspektive (+0.5 Punkte)
   - Integriere Checklisten (+0.5 Punkte)
   → Ziel: Min 2.0/2.5 Punkte

2. **Authoritativeness erhöhen** (aktuell z.B. nur 0.5/2.5):
   - Füge min 3 externe Referenzen hinzu (+1.0 Punkte)
   - Min 1 aktuelle Studie (<2 Jahre) zitieren (+0.5 Punkte)
   - Offizielle Guidelines referenzieren (+0.5 Punkte)
   - Branchendaten/Statistiken einbauen (+0.5 Punkte)
   → Ziel: Min 2.0/2.5 Punkte

3. **Trustworthiness erhöhen** (aktuell z.B. nur 1.0/2.5):
   - Alle Claims mit Quellen belegen (+1.0 Punkte)
   - Quellen direkt verlinken (+0.5 Punkte)
   - Pro/Contra explizit aufführen (+0.5 Punkte)
   - Risiken/Challenges erwähnen (+0.5 Punkte)
   → Ziel: Min 2.0/2.5 Punkte

4. **Re-validate**: Nach Verbesserungen E-E-A-T Score neu berechnen → Ziel ≥ 6.5

### Problem: CTR Optimization Score niedrig (Title < 3/4)
**Symptom**: Title hat keinen Emotional Trigger, kein Number, keine Unique Angle

**Lösung**:
1. **Analysiere aktuellen Title**:
   - Beispiel: "Pferd kaufen worauf achten" → Generic, kein CTR-Faktor
2. **Rewrite mit CTR-Faktoren**:
   - **+ Emotional Trigger**: "Sicher ein Pferd kaufen"
   - **+ Number**: "7 kritische Schritte"
   - **+ Year**: "[2024 Guide]"
   - **+ Unique Angle**: "ohne teure Fehlkäufe"
   - **Finaler Title**: "Sicher ein Pferd kaufen: 7 kritische Schritte [2024] - Ohne teure Fehlkäufe"
3. **Validate**:
   - Emotional Trigger: ✅ "Sicher", "kritisch"
   - Keyword Position: ✅ "Pferd kaufen" in ersten 3 Wörtern
   - Number/Year: ✅ "7", "2024"
   - Unique Angle: ✅ "Ohne teure Fehlkäufe"
   - Score: 4/4 → Excellent

### Problem: Content Length Delta < -10% (zu kurz vs. Top 3)
**Symptom**: Unser Artikel 1900 Wörter, Top 3 Median 2300 Wörter → -400 Wörter (-17%)

**Lösung**:
1. **Gap-Analyse**: Welche Topics behandeln Top 3, die wir nicht/zu kurz abdecken?
2. **Expansion Strategy**:
   - Identifiziere 3-5 Sektionen die ausgebaut werden können
   - Pro Sektion: +80-100 Wörter Tiefe
   - Ziel: 2300 + 10% = 2530 Wörter
3. **Quality over Quantity**:
   - Keine Filler-Sätze ("Wie bereits erwähnt...")
   - Konkrete Details, Beispiele, Daten hinzufügen
   - Sub-Topics ausbauen (H3-Level)
4. **Re-validate**: Nach Expansion Word Count Check → Ziel 2300-2500 Wörter (+0-9%)

---

## Best Practices (v2.0 Enhanced)

### Quality Scoring Philosophy
- **Objective Metrics bevorzugen**: Word Count, Keyword Density, Link Count sind messbar
- **Subjektive Metrics transparent machen**: E-E-A-T Score basierend auf klaren Kriterien (Checkliste)
- **Keine 100% Perfektion erwarten**: 8.5-9.0 Overall Score ist excellent, 10.0 ist unrealistisch
- **NEU v2.0**: Competitive Positioning > Absolute Metrics (lieber 2400 Wörter wenn Top 3 Median 2200, als fixe 2000)

### E-E-A-T Integration (v2.0 Nuanced Scoring)
- **Experience**:
  - Mindestens 1 konkretes Fallbeispiel mit Zahlen (+1.5 Punkte)
  - Ich/Wir-Perspektive mehrfach verwenden (+0.5 Punkte)
  - Min 1 Checklist integrieren (+0.5 Punkte)
- **Expertise**:
  - Autorenkredit mit Credentials prominent platzieren (+1.5 Punkte wenn credentials, +0.5 wenn prominent)
  - Min 5 Fachbegriffe korrekt verwendet UND erklärt (+0.5 Punkte)
- **Authoritativeness**:
  - Min 3 externe Referenzen (+1.0 Punkte), davon min 1 aktuelle Studie (+0.5)
  - Min 1 offizielle Guideline (+0.5 Punkte)
- **Trustworthiness**:
  - Alle statistischen Claims belegt (+1.0 Punkte)
  - Risiken erwähnen (+0.5 Punkte), Pro/Contra (+0.5 Punkte)

### Competitive Positioning Strategy (NEU v2.0)
- **Content Length**: Ziel +10-20% vs. Top 3 Median → zeigt Comprehensiveness ohne Bloat
- **Topic Completeness**: Min 90% aller wichtigen Competitor-Topics abdecken → keine Lücken
- **Freshness Signals**:
  - Min gleich viele 2024/2025-Erwähnungen wie bester Competitor
  - Min 1 frische Statistik (<1 Jahr alt)
  - Trending Topics integrieren (z.B. "gestiegene Futterkosten 2024")
- **Differentiation**: Nicht nur kopieren → für jedes Competitor-Topic einen unique angle finden

### Search Intent Alignment (NEU v2.0)
- **PAA Coverage**:
  - Min 80% (4/5 PAAs beantwortet)
  - Pro PAA min 50 Wörter comprehensive answer
  - FAQPage Schema für PAAs nutzen → Rich Snippet Chance
- **Intent Match**:
  - Informational Intent → comprehensive Guide, kein Sales-Pitch
  - Transactional Intent → Handlungsempfehlungen + CTAs prominent
- **Query Refinement**:
  - Min 80% Related Keywords natürlich integriert
  - Nicht forcieren → nur wo semantisch sinnvoll

### CTR Optimization (NEU v2.0)
- **Title Formula**: [Emotional Trigger] + [Primary Keyword] + [Number] + [Unique Angle] + [Year]
  - Beispiel: "Sicher ein Pferd kaufen: 7 kritische Schritte [2024] - Ohne teure Fehlkäufe"
- **Meta Description Formula**: [Hook] + [Benefit] + [CTA]
  - Beispiel: "Teurer Fehlkauf vermeiden: Entdecken Sie die 7 Schritte, mit denen Sie sicher Ihr Traumpferd finden → Jetzt Checkliste kostenlos sichern"
- **Content Hook**: Erste 100 Wörter entscheiden über Dwell Time
  - Problem Statement + Promise + Credibility Anchor

### Readability Optimization (v2.0 Targets)
- **Flesch Reading Ease**: 70-80 optimal (v2.0 erhöht von 60-70)
  - Einfacher als "Standard-Lesbarkeit" → Accessibility für Laien
- **Durchschnittliche Satzlänge**: 12-18 Wörter (v2.0 verschärft von 15-20)
- **Absatzlänge**: 3-4 Sätze pro Absatz (v2.0 verschärft von 3-5)
- **Fachbegriff-Ratio**: < 5% (v2.0 neu)
  - Jeden Fachbegriff bei erster Verwendung erklären
- **Subheadings**: Min alle 200-250 Wörter ein H3 für Orientierung
- **Bullet Points**: Nutzen für Listen, Checklisten, Vor-/Nachteile

### SEO Technical Validation
- **Google Structured Data Testing Tool**: Immer vor Publikation testen
- **Internal Links**: Nur zu relevanten, thematisch verwandten Seiten verlinken
- **Metadata**: Title + Description müssen zusammen Sinn ergeben (User sieht beides im SERP)
- **URL Slug**: Kurz halten (max 5 Wörter), Primary Keyword am Anfang
- **NEU v2.0**: Min 3 Schema Types für maximale Rich Snippet Coverage (Article + FAQPage + HowTo/Breadcrumb)

### Publication Readiness (v2.0 Enhanced)
- **Min Quality Score 7.5** (v2.0 erhöht von 7.0): Darunter ist Artikelqualität nicht wettbewerbsfähig für Rank-1
- **E-E-A-T Score ≥ 6.5** (v2.0 erhöht von 6.0): Google Quality Rater Guidelines + Competitive Buffer
- **Competitive Positioning**:
  - Topic Completeness ≥ 90% (kein wichtiges Topic darf fehlen)
  - Content Length Delta +10-20% (comprehensive ohne Bloat)
- **Search Intent Alignment**:
  - PAA Coverage ≥ 80% (typische User-Fragen beantwortet)
  - Query Refinement ≥ 80% (semantisches Feld abgedeckt)
- **Zero Critical Warnings**: Alle "CRITICAL"-Warnings müssen vor Publikation behoben sein
- **Recommendations Review**: Entscheide für jede Recommendation ob Implementation vor/nach Publikation

---

## Success Metrics (v2.0)

**Pro Keyword-Workflow erwarten wir** (v2.0 Enhanced Targets):

### Content Quality
- ⏱️ **Execution Time**: 15-20 Minuten (automatisiert, Phase 6 jetzt ~5min länger durch Competitive Checks)
- 📝 **Word Count**: `target_word_count` (SERP-competitive: avg_word_count_top_3 × 1.10, typically +10% vs. Top 3 Avg)
- 🎯 **Primary Keyword Density**: 0.8-1.2% (SEO-optimiert, kein Stuffing)
- 🔍 **Supporting Keywords**: Min 8/10 Related Keywords natürlich integriert (80% Coverage)

### E-E-A-T & Readability
- ⭐ **E-E-A-T Score**: Min 6.5/10 (v2.0 erhöht, nuanced scoring)
- 📖 **Flesch Reading Ease**: 70-80 (v2.0 erhöht für Accessibility)
- 🔤 **Fachbegriff-Ratio**: < 5% (v2.0 neu, Laien-freundlich)

### SEO Technical
- 📊 **Schema Markup**: Min 3 Typen (v2.0 erhöht von 2: Article + FAQ + HowTo/Breadcrumb)
- 🔗 **Internal Links**: Min 4 relevante Ratgeber-Links (v2.0 erhöht von 3)

### Competitive Positioning (NEU v2.0)
- 🏆 **Topic Completeness**: Min 90% Coverage (alle wichtigen Competitor-Topics)
- 📏 **Content Length Delta**: +10-20% vs. Top 3 Median
- 🆕 **Freshness Score**: Min gleich viele 2024/2025-Mentions wie bester Competitor

### Search Intent Alignment (NEU v2.0)
- ❓ **PAA Coverage**: Min 80% (4/5 PAAs beantwortet)
- 🎯 **Query Refinement**: Min 80% Related Keywords integriert
- ✅ **Intent Match**: Content-Type passt zu Primary Intent

### CTR Optimization (NEU v2.0)
- 🔥 **Title CTR Score**: 4/4 oder min 3/4 (Emotional Trigger + Number + Unique Angle + Keyword Position)
- 📢 **Meta Description Score**: 3/3 (Hook + Benefit + CTA)
- 🪝 **Content Hook**: 3/3 (Problem + Promise + Credibility)

### Expected Impact (v2.0 Improvements)
- 📈 **Ranking Chance**: +25-35% vs. v1.0 (durch Competitive Positioning)
- 👆 **CTR**: +15-20% vs. generic titles (durch CTR Optimization)
- ⏱️ **Dwell Time**: +10-15% (durch Content Hook + Readability)
- 🏅 **E-E-A-T Robustness**: +30-40% (durch nuanced scoring)

---

## Integration mit anderen Phasen

### Input von Phase 1 (Keyword Research):
- `keyword-analysis.json` - Primary Keyword Data
- `related_keywords` - Query Refinements für Search Intent Alignment (v2.0)

### Input von Phase 2 (SERP Analysis):
- `content_gaps.must_have_topics` - Topics die MÜSSEN abgedeckt sein
- `format_recommendations.target_word_count` - Ziel-Wortanzahl
- `paa_integration` - PAA-Fragen für FAQ-Sektion
- **NEU v2.0**: `top_3_serp_results` - Competitor Data für Positioning (Word Counts, H2/H3s, Freshness)

### Input von Phase 4 (Content Creation):
- `article-draft.md` - Finaler Artikel-Text
- `fact-check-results.json` - Validierte Claims

### Input von Phase 5 (On-Page SEO):
- `seo-metadata.json` - Title, Description, Keywords, OG, Twitter
- `schema-*.json` - Alle Schema Markup Files
- `internal-linking.json` - Interne Verlinkungsstrategie

### Output für Publication:
- `quality-report.json` - Verwendung: QA-Review, Tracking, Iteration
- `eeat-score.json` - Verwendung: E-E-A-T Monitoring, Improvement Tracking
- **NEU v2.0**: `competitive-positioning.json` - Verwendung: Competitive Analysis, Gap Identification
- `final-article.md` - Verwendung: CMS Import, HTML Conversion
- `publication-checklist.md` - Verwendung: Publishing Workflow

---

## Next Steps

Nach erfolgreichem Abschluss von Phase 6:
→ **Article Publication** - Copy Files zu CMS/Publishing-System

**Post-Publication Monitoring (v2.0 Enhanced)**:
1. **Google Search Console**: URL indexiert?
2. **Google Rich Results Test**: Schema Markup erkannt? (v2.0: Min 3 Typen)
3. **Analytics Tracking**: Pageviews, Time on Page (v2.0: erwarte +10-15% Dwell Time), Bounce Rate
4. **Ranking Tracking**: Position für Primary Keyword nach 2-4 Wochen
5. **NEU v2.0**: CTR Tracking (GSC) → erwarte +15-20% vs. Position-Durchschnitt durch Title Optimization
6. **NEU v2.0**: Competitor Monitoring → monatlich prüfen ob Top 3 Updates machen (Content Freshness Race)

**Iteration (v2.0 Enhanced)**:
- **Wenn Ranking nach 4 Wochen < Position 5** → Review Competitive Positioning (haben Competitors neue Topics hinzugefügt?)
- **Wenn User Engagement niedrig** (High Bounce, Low Dwell Time) → Readability + Content Hook überarbeiten
- **Wenn Featured Snippet nicht erreicht** → FAQ-Sektion + Liste-Formate erweitern, HowTo Schema hinzufügen
- **NEU v2.0**: Wenn CTR < Position-Durchschnitt → Title/Meta Description Rewrite mit CTR Optimization
- **NEU v2.0**: Quarterly Content Audit → Freshness Update (neue 2024/2025 Statistiken, neue PAAs integrieren)

---

## Changelog

### v2.0 (2025-01-04)
**Major Enhancements**:
1. ✅ **Competitive Positioning Validation** (Section 5):
   - Content Length Delta vs. Top 3 Median (+10-20% Target)
   - Topic Completeness Gap Analysis (90% Coverage)
   - Freshness Score (2024/2025 Mentions, Fresh Stats)

2. ✅ **Search Intent Alignment Check** (Section 6):
   - PAA Coverage Rate (80% Target: 4/5 PAAs)
   - Intent Match Validation (Informational/Transactional/Commercial/Navigational)
   - Query Refinement Coverage (80% Related Keywords)

3. ✅ **E-E-A-T Deep Scoring** (Section 3 Enhanced):
   - Binary → Nuanced Point System (0.0-10.0 Scale)
   - Each Pillar: Granular Sub-Scores (max 2.5 each)
   - Experience, Expertise, Authoritativeness, Trustworthiness detailliert aufgeschlüsselt

4. ✅ **CTR-Optimierung Check** (Section 7):
   - Title Optimization (Emotional Trigger + Number + Unique Angle + Keyword Position)
   - Meta Description Quality (Hook + Benefit + CTA)
   - Content Hook Validation (Problem + Promise + Credibility)

5. ✅ **Readability Targets Adjustment** (Section 2 Enhanced):
   - Flesch Target: 60-70 → 70-80 (bessere Accessibility für Laien)
   - Sentence Length: 15-20 → 12-18 Wörter (verschärft)
   - Paragraph Length: 3-5 → 3-4 Sätze (verschärft)
   - NEU: Fachbegriff-Ratio < 5% Check

**Quality Gates Enhanced**:
- Overall Score Threshold: 7.0 → 7.5 (publication_ready)
- E-E-A-T Score Threshold: 6.0 → 6.5
- Schema Types Min: 2 → 3
- Internal Links Min: 3 → 4
- NEU: Content Length Delta, Topic Completeness, PAA Coverage, CTR Scores

**Token Budget**:
- ~400 Tokens (v1.0) → ~550-600 Tokens (v2.0)
- Reason: Competitive Positioning + Search Intent Alignment + CTR Checks

**Troubleshooting Expanded**:
- 7 neue Scenarios (v1.0: 5 → v2.0: 12 Total)
- Competitive Gaps, PAA Coverage, CTR Optimization, Fachbegriff-Ratio

**Expected Impact**:
- +25-35% höhere Ranking-Chance (durch Competitive Positioning)
- +15-20% bessere CTR (durch Title/Meta Optimization)
- +10-15% längere Dwell Time (durch Hook + Readability)
- +30-40% robusterer E-E-A-T Score (durch nuanciertes Scoring)

### v1.0 (2024-12-15)
- Initial Phase 6 Quality Check
- Basic Content Quality, Readability, E-E-A-T, SEO Technical Validation
- Binary E-E-A-T Scoring System
- Quality Gate Threshold: Overall Score ≥ 7.0

---

**Phase 6 Checklist (v2.0)**:
- [ ] Sub-Agent Quality Check ausgeführt
- [ ] Quality Report erstellt mit Overall Score
- [ ] E-E-A-T Deep Score berechnet (min 6.5, nuanced system)
- [ ] Content Quality validiert (Word Count, Keywords, Topics)
- [ ] Readability Score geprüft (70-80 Range, Fachbegriff < 5%)
- [ ] SEO Technical Check (Metadata, Schema min 3 Typen, Links min 4)
- [ ] **NEU v2.0**: Competitive Positioning validiert (Length Delta, Topic Completeness, Freshness)
- [ ] **NEU v2.0**: Search Intent Alignment geprüft (PAA Coverage, Intent Match, Query Refinement)
- [ ] **NEU v2.0**: CTR-Optimierung validiert (Title 4/4, Meta Description 3/3, Content Hook 3/3)
- [ ] Warnings/Recommendations reviewed
- [ ] Quality Gate 6: Overall Score ≥ 7.5
- [ ] Optional Phase 6B Fixes implementiert (wenn nötig)
- [ ] Output Files gespeichert in `quality/` Ordner
- [ ] `competitive-positioning.json` dokumentiert (v2.0)
- [ ] Publication Checklist erstellt
- [ ] Ready für Publication: Artikel ist publish-ready mit Rank-1 Potential!
