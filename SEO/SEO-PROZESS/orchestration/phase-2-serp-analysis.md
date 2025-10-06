# Phase 2: SERP Analysis

**Token Budget**: ~2500 Tokens (realistic with safety margin)
**Main Deliverables**: `serp-analysis.json`, Content Gaps, PAA Integration, Search Intent Mapping
**Agent Pattern**: Sub-Agent (ALL API calls + analysis) → Main-Agent (validation + file storage)

---

## 🎯 Phase Overview

**Ziel**: Comprehensive SERP analysis for rank-1 content strategy durch:
- ✅ Top 30 organic SERP data collection
- ✅ Deep PAA expansion (2-level click depth)
- ✅ Search intent classification
- ✅ Real content structure analysis (Top 3 URLs)
- ✅ Competitor landscape mapping
- ✅ Content gap identification

**Context Efficiency Strategy**:
- Sub-Agent macht ALLE DataForSEO API-Calls (isoliert 4000+ Token Responses)
- Progressive Loading: Extract → Analyze → Compress → Discard Raw Data
- Main-Agent empfängt nur komprimiertes JSON (~350 Tokens)

---

## Phase 2: Sub-Agent Delegation (Complete Workflow)

**WICHTIG**: Main-Agent delegiert die GESAMTE Phase 2 an `seo-content-writer` Sub-Agent!

### Main-Agent → Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Complete SERP analysis with API calls and competitor research</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Führe die vollständige SERP-Analyse für das Target-Keyword aus Phase 1 durch.

## PRIMARY KEYWORD: {PRIMARY_KEYWORD}

## WORKFLOW:

### Step 1: SERP Organic Results (API Call 1)

Hole Top 30 organische SERP-Ergebnisse mit dem DataForSEO MCP Tool:

**Tool**: `mcp__dataforseo__serp_organic_live_advanced`
**Parameters**:
- keyword: {PRIMARY_KEYWORD}
- location_name: "Germany"
- language_code: "de"
- depth: 30
- device: "desktop"

**Sofort nach Response extrahieren:**
- Top 10 URLs (rank 1-10): Full data (url, title, description, domain, rank_group)
- Rank 11-30: Nur für Stats (domain distribution, authority mix)
- Featured Snippets: Full extraction wenn vorhanden
- VERWERFE Rest der Response (Context sparen!)

**Erwarteter Output:**
```json
{
  "top_10_results": [...],  // Full details
  "rank_11_30_stats": {
    "unique_domains": 18,
    "domain_types": {"magazine": 8, "blog": 7, "ecommerce": 5}
  },
  "featured_snippets": [...]  // Wenn vorhanden
}
```

---

### Step 2: People Also Ask Deep Expansion (API Call 2)

Hole PAA-Daten mit 2-Level Click Depth mit dem DataForSEO MCP Tool:

**Tool**: `mcp__dataforseo__serp_organic_live_advanced`
**Parameters**:
- keyword: {PRIMARY_KEYWORD}
- location_name: "Germany"
- language_code: "de"
- depth: 5
- people_also_ask_click_depth: 2
- device: "desktop"

**KRITISCH**:
- `depth=5` → Wir brauchen nur PAA, nicht SERP Results (spart 50% Response Size!)
- `people_also_ask_click_depth=2` → Nested PAA questions für comprehensive coverage

**Sofort nach Response extrahieren:**
- Alle PAA Questions (Level 1 + Level 2)
- Kategorisiere nach Intent/Thema
- IGNORIERE SERP Results aus diesem Call (nur PAA relevant!)

**Erwarteter Output:**
```json
{
  "paa_questions": [
    {
      "question": "Was kostet ein gesundes Pferd?",
      "level": 1,
      "category": "costs"
    },
    {
      "question": "Welche Kosten kommen nach dem Kauf?",
      "level": 2,
      "category": "costs",
      "parent": "Was kostet ein gesundes Pferd?"
    }
  ]
}
```

---

### Step 3: Search Intent Analysis (API Call 3)

Klassifiziere Search Intent für content strategy alignment mit dem DataForSEO MCP Tool:

**Tool**: `mcp__dataforseo__dataforseo_labs_search_intent`
**Parameters**:
- keywords: ["{PRIMARY_KEYWORD}"]
- language_code: "de"

**Erwarteter Output:**
```json
{
  "search_intent": {
    "primary": "informational",      // oder commercial/transactional/navigational
    "probability": 0.78,
    "secondary": "commercial",
    "secondary_probability": 0.22
  }
}
```

**Content Strategy Mapping:**
- **Informational (>70%)**: Fokus auf Education, How-To, Guides
- **Commercial (>50%)**: Fokus auf Vergleiche, Kaufkriterien, Checklisten
- **Transactional (>50%)**: Fokus auf Angebote, Preise, Calls-to-Action
- **Mixed Intent**: Hybrid-Content (Informational Content + Commercial CTA)

---

### Step 4: On-Page Content Parsing (API Calls 4-6, OPTIONAL but recommended)

Scrape die tatsächliche Content-Struktur der Top 3 URLs für echte Content-Gap-Analyse mit dem DataForSEO MCP Tool.

**Für jede der Top 3 URLs:**

**Tool**: `mcp__dataforseo__on_page_content_parsing`
**Parameters**:
- url: {TOP_RANKING_URL}

**Sofort nach Response extrahieren:**
- H2/H3 Heading-Struktur (Titel + Hierarchie)
- Geschätzte Word Count (basierend auf text length)
- Content Sections (erkennbare Themenblöcke)
- VERWERFE Full Text Content (Context sparen!)

**Erwarteter Output pro URL:**
```json
{
  "url": "https://example.com/pferdekauf-guide",
  "rank": 1,
  "structure": {
    "h2_count": 8,
    "h3_count": 15,
    "headings": [
      {"level": "h2", "text": "Gesundheitscheck beim Pferdekauf"},
      {"level": "h3", "text": "Tierärztliche Untersuchung"},
      {"level": "h3", "text": "Röntgenbilder interpretieren"}
    ],
    "estimated_word_count": 2800,
    "main_sections": ["Gesundheit", "Kosten", "Rechtliches", "Checkliste"]
  }
}
```

**WICHTIG - Word Count Extraction**:
- Extrahiere `estimated_word_count` für **ALLE Top 3 URLs**
- Berechne Durchschnitt: `avg_word_count = (url1_count + url2_count + url3_count) / 3`
- Dieser Wert wird in Step 5.2 für SERP-competitive word count strategy verwendet

**Falls API-Call fehlschlägt** (z.B. Paywall, JavaScript-heavy):
- Log warning
- Proceed mit SERP Meta-Daten only
- Mark als "limited_data" in final output

---

### Step 5: Comprehensive Analysis

Analysiere ALLE gesammelten Daten und erstelle strukturierte Insights.

#### 5.1 Content-Gap-Analyse

Vergleiche was die Top 10 abdecken vs. was fehlt:

**Must-Have Topics** (Coverage >= 8/10):
- Themen die in 8+ der Top 10 Results erscheinen (Titles/Descriptions/H2s)
- Diese sind PFLICHT für #1 Ranking
- Jedes Topic braucht Coverage Score (z.B. "9/10") + Priority (critical/high)

**Differentiation Opportunities** (Coverage 3-7/10):
- Themen die nur EINIGE abdecken
- Chance für unique angle durch bessere/tiefere Coverage
- Identifiziere welche Angle missing ist (z.B. "Alle erwähnen Kosten, aber keiner zeigt Beispielrechnungen")

**Completely Missing Topics** (Coverage 0-2/10):
- Relevant basierend auf PAA questions aber kaum/nicht abgedeckt
- First-mover advantage opportunity
- Mark mit Opportunity Score (1-10, wobei 10 = high opportunity)

**Rank #1 Analysis**:
- Was macht Position 1 anders als Position 2-10?
- Unique angles (Fallbeispiele, Experten-Zitate, interaktive Elemente)
- Content format (Guide, Listicle, Vergleich, Tutorial)

#### 5.2 Content-Format-Analyse

**SERP-Competitive Word Count Strategy**:
- **Primär**: Nutze `estimated_word_count` aus Content Parsing (Top 3 URLs)
- **Berechnung**:
  - `avg_word_count = (url1 + url2 + url3) / 3`
  - `target_word_count = avg_word_count × 1.10` (10% mehr für comprehensiveness)
  - `word_count_range_min = avg_word_count × 0.85` (Quality Gate Warning)
  - `word_count_range_max = avg_word_count × 1.30` (Quality Gate Failure)
- **Fallback**: Falls Content Parsing nicht verfügbar → `word_count_fallback: 2500`
- **Flag setzen**: `"word_count_strategy": "serp_competitive"` oder `"fallback"`

**Required Sections**:
- Basierend auf H2-Analyse der Top 3 (wenn verfügbar)
- Oder basierend auf Must-Have Topics + PAA Categories
- Reihenfolge matters (typische User Journey)

**Visual Elements** (erkennbar in Descriptions/Snippets):
- comparison_table (wenn Vergleiche angedeutet werden)
- checklist (wenn "Checkliste", "Schritte", "Punkte" erwähnt)
- step_by_step_guide (wenn "Anleitung", "So gehts", nummerierte Steps)
- infographic/diagram (wenn komplexe Prozesse beschrieben)

**Featured Snippet Target**:
- paragraph (Text-basiert, 50-60 Wörter)
- list (Bullet Points oder Numbered List)
- table (Vergleichsdaten, Vor/Nachteile)
- Wähle basierend auf was aktuell rankt + was zu Content passt

#### 5.3 Competitor Landscape Analysis

**Domain Authority Distribution**:
```json
{
  "high_authority": 7,    // > DA 60 (große Brands/Portale)
  "medium_authority": 2,  // DA 30-60 (etablierte Nischen-Sites)
  "low_authority": 1      // < DA 30 (neue/kleine Sites)
}
```

**Domain Type Mix**:
- magazines (Online-Magazine wie CAVALLO, Mein Pferd)
- niche_blogs (spezialisierte Pferde-Blogs)
- ecommerce (Shops mit Content-Marketing)
- forums (Foren-Threads die ranken)
- organizations (Verbände, Vereine)

**Ranking Stability Assessment**:
- "established" → Top 10 sind stable, große Brands dominieren
- "competitive" → Mix aus Brands + Nischen-Sites, Bewegung möglich
- "volatile" → Viele neue Domains, Content-Quality gewinnt über Authority

**New Entrant Opportunity**:
- "low" → Top 10 = alle High-Authority, schwer reinzukommen
- "medium" → Mix vorhanden, mit exzellenten Content machbar
- "high" → Low-Authority Sites ranken, Quality-Content kann schnell steigen

#### 5.4 E-E-A-T Signal Analysis

**Required Credentials** (erkennbar in Titles/Descriptions):
- "equestrian_professional" (wenn viele "Experte", "Profi", "Trainer" erwähnen)
- "veterinarian" (wenn medizinische Expertise betont wird)
- "horse_owner_experience" (wenn Erfahrungsberichte dominieren)
- "generic_author" (wenn keine spezifischen Credentials erkennbar)

**Case Studies/Examples Needed**:
- Count wie viele Top 10 Results Praxis-Beispiele andeuten
- Empfehlung: Min 2 case studies für Differentiation

**External References**:
- Erkennbar wenn "Studie", "Quelle", "laut XY" in Descriptions
- Empfehlung: 3-5 authoritative Quellen (Veterinärverbände, Studien, Marktdaten)

**Expert Quotes**:
- true wenn Experten-Zitate in Descriptions erkennbar
- Adds authority + E-E-A-T signals

**Data Sources** (inferiert aus Content-Typ):
- veterinary_guidelines (bei Gesundheitsthemen)
- market_data (bei Preis/Kosten-Themen)
- legal_regulations (bei Kaufvertrag/Rechtlichem)
- industry_statistics (bei Marktübersichten)

#### 5.5 PAA Integration Strategy

**Kategorisiere ALLE PAA-Fragen:**
- costs (Kosten-bezogene Fragen)
- health (Gesundheits-/Veterinär-Fragen)
- legal (Rechtliche Aspekte, Dokumente, Verträge)
- care (Haltung, Pflege, Ausrüstung)
- buying_process (Kaufprozess, Besichtigung, Verhandlung)

**Wähle Top 5-8 PAA für Integration:**
- Priorität "high" → Hohe Search Volume Topics die Top 10 nicht gut beantworten
- Priorität "medium" → Ergänzende Fragen für comprehensive coverage
- Priorität "low" → Nice-to-have für extra Tiefe

**Section Placement:**
- Weise jede PAA einer Content-Section zu (basierend auf Theme)
- Kann als H2 (wenn wichtig) oder H3 (wenn Unter-Aspekt) integriert werden
- Oder als dedicated FAQ-Section am Ende

---

## OUTPUT FORMAT (JSON):

**KRITISCH**: Liefere ein vollständiges, strukturiertes JSON zurück (kein Markdown text davor/danach!):

```json
{
  "phase": "2",
  "primary_keyword": "{PRIMARY_KEYWORD}",
  "timestamp": "2025-01-04T15:30:00Z",
  "data_source_validation": {
    "serp_organic_api_success": true,
    "serp_organic_response_received": true,
    "paa_api_success": true,
    "paa_response_received": true,
    "search_intent_api_success": true,
    "search_intent_response_received": true,
    "content_parsing_api_success": true,
    "content_parsing_urls_succeeded": 3,
    "content_parsing_urls_failed": 0,
    "all_data_real": true,
    "hallucination_detected": false,
    "notes": "All API calls successful, all data from DataForSEO API responses"
  },
  "data_sources": {
    "serp_results_count": 30,
    "featured_snippets_count": 2,
    "paa_questions_count": 14,
    "content_parsed_urls": 3
  },
  "search_intent": {
    "primary": "informational",
    "probability": 0.78,
    "secondary": "commercial",
    "secondary_probability": 0.22,
    "content_strategy": "Education-focused guide with commercial elements (comparison tables, buying checklists)"
  },
  "content_gaps": {
    "must_have_topics": [
      {
        "topic": "Gesundheitscheck beim Pferdekauf",
        "coverage": "10/10",
        "priority": "critical",
        "evidence": "All Top 10 mention in title or description"
      },
      {
        "topic": "Kaufvertrag und rechtliche Absicherung",
        "coverage": "8/10",
        "priority": "high",
        "evidence": "8 of 10 have dedicated section (via H2 analysis)"
      }
    ],
    "differentiation_opportunities": [
      {
        "topic": "Versicherung direkt beim Kauf abschließen",
        "coverage": "4/10",
        "unique_angle": "Integrate insurance checklist into buying process (not separate topic)",
        "opportunity_score": 8
      },
      {
        "topic": "Probezeit-Vereinbarungen",
        "coverage": "3/10",
        "unique_angle": "Detailed guide on trial period contracts (only briefly mentioned by competitors)",
        "opportunity_score": 7
      }
    ],
    "completely_missing": [
      {
        "topic": "Pferdekauf ohne Anzahlung - Finanzierungsoptionen",
        "coverage": "0/10",
        "source": "PAA question not answered by Top 10",
        "opportunity_score": 9,
        "reason": "High-intent PAA question with zero competition"
      }
    ],
    "rank_1_analysis": {
      "url": "https://example.com/pferdekauf-guide",
      "unique_angles": [
        "Real buyer case studies (3 detailed examples)",
        "Expert quotes from veterinarian",
        "Downloadable PDF checklist",
        "Step-by-step photo guide"
      ],
      "format": "Long-form comprehensive guide with visual elements",
      "estimated_word_count": 2800,
      "key_differentiator": "Practical case studies vs. generic advice"
    }
  },
  "format_recommendations": {
    "avg_word_count": 2150,
    "target_word_count": 2365,
    "word_count_range_min": 1828,
    "word_count_range_max": 2795,
    "word_count_strategy": "serp_competitive",
    "word_count_fallback": 2500,
    "required_sections": [
      "Einleitung: Warum ein systematischer Kaufprozess wichtig ist",
      "Gesundheitscheck: Schritt-für-Schritt Anleitung",
      "Rechtliche Absicherung: Kaufvertrag und Dokumente",
      "Kosten-Übersicht: Kaufpreis + Folgekosten",
      "Probezeit und Rückgaberecht",
      "Versicherung direkt beim Kauf",
      "Checkliste: Alles auf einen Blick",
      "FAQ: Häufige Fragen"
    ],
    "visual_elements": [
      "comparison_table",
      "checklist",
      "step_by_step_guide",
      "cost_breakdown_table"
    ],
    "featured_snippet_target": "list",
    "featured_snippet_topic": "Gesundheitscheck Schritte"
  },
  "competitor_landscape": {
    "domain_authority_distribution": {
      "high_authority": 7,
      "medium_authority": 2,
      "low_authority": 1
    },
    "domain_type_mix": {
      "magazines": 5,
      "niche_blogs": 3,
      "ecommerce": 1,
      "organizations": 1
    },
    "ranking_stability": "established",
    "new_entrant_opportunity": "medium",
    "assessment": "High-authority sites dominate, but quality content with strong E-E-A-T can compete"
  },
  "eeat_signals": {
    "required_credentials": "equestrian_professional",
    "credentials_reasoning": "7 of Top 10 emphasize expertise (Trainer, Berater, Züchter)",
    "case_studies_needed": 2,
    "case_study_topics": ["successful_purchase", "avoided_mistake"],
    "external_references": 4,
    "reference_types": ["veterinary_guidelines", "legal_regulations", "market_data", "insurance_requirements"],
    "expert_quotes": true,
    "expert_types": ["veterinarian", "horse_trainer", "legal_expert"],
    "data_sources": [
      "FN (Deutsche Reiterliche Vereinigung) Kaufrichtlinien",
      "Tierärztliche Vereinigung Ankaufsuntersuchung Standards",
      "Pferdemarkt Preisdaten 2024",
      "Versicherungsverband Empfehlungen"
    ]
  },
  "paa_integration": [
    {
      "question": "Was kostet ein gesundes Pferd?",
      "category": "costs",
      "section_placement": "Kosten-Übersicht",
      "integration_type": "h3",
      "priority": "high",
      "reasoning": "High-volume question, directly relevant to buying decision"
    },
    {
      "question": "Welche Dokumente brauche ich beim Pferdekauf?",
      "category": "legal",
      "section_placement": "Rechtliche Absicherung",
      "integration_type": "h2",
      "priority": "high",
      "reasoning": "Critical legal question, must-answer for complete guide"
    },
    {
      "question": "Kann man ein Pferd ohne Anzahlung kaufen?",
      "category": "buying_process",
      "section_placement": "Finanzierungsoptionen (NEW section)",
      "integration_type": "h2",
      "priority": "high",
      "reasoning": "Completely missing in Top 10, high opportunity score"
    },
    {
      "question": "Wie lange Probezeit beim Pferdekauf?",
      "category": "legal",
      "section_placement": "Probezeit und Rückgaberecht",
      "integration_type": "h3",
      "priority": "medium",
      "reasoning": "Supports differentiation opportunity topic"
    },
    {
      "question": "Welche Versicherungen für neues Pferd?",
      "category": "costs",
      "section_placement": "Versicherung direkt beim Kauf",
      "integration_type": "h3",
      "priority": "medium",
      "reasoning": "Supports differentiation opportunity topic"
    }
  ],
  "api_call_summary": {
    "total_calls": 6,
    "serp_organic": 2,
    "search_intent": 1,
    "content_parsing": 3,
    "estimated_tokens_consumed": 4200,
    "data_quality": "excellent"
  }
}
```

---

## WICHTIGE HINWEISE:

**Context Management:**
- Nach jedem API-Call: Sofort relevante Daten extrahieren
- Raw API Responses NICHT im Memory behalten
- Nur komprimierte Insights speichern
- Final JSON sollte < 400 Tokens sein

**Data Quality:**
- Alle Analysen basieren auf beobachtbaren Patterns (keine Annahmen!)
- Wenn Daten fehlen (z.B. keine Featured Snippets) → klar in JSON kommunizieren
- Coverage Scores müssen nachvollziehbar sein (z.B. "7/10" weil 7 von Top 10 erwähnen)
- Opportunity Scores (1-10) basieren auf: Search Volume Hints (PAA) + Competition Gap

**Partial Success Handling:**
- Content Parsing fehlgeschlagen? → Proceed mit SERP Meta-Data only, mark "limited_data"
- Weniger als 3 PAA? → Proceed, aber flag "insufficient_paa_data"
- Keine Featured Snippets? → Normal bei commercial keywords, kein Problem

**Error Handling:**
- API Call failed? → Log error, proceed mit verfügbaren Daten
- Timeout? → Retry einmal, dann proceed
- Alle Errors in JSON dokumentieren unter "warnings" Array
</parameter>
</invoke>
</function_calls>
```

---

## Quality Gate Phase 2 (Main-Agent Validation)

Nach Sub-Agent Response validiert Main-Agent die Ergebnisse:

### Minimum Requirements (MUST PASS):

✅ **Min 10 SERP Results collected** (`data_sources.serp_results_count >= 10`)
✅ **Search Intent classified** (`search_intent.primary` exists)
✅ **Min 5 Must-Have Topics** with coverage >= 8/10
✅ **Target Word Count defined** (2000-3500 Range)
✅ **Min 3 Differentiation Opportunities** identified
✅ **Min 5 PAA Questions** selected for integration
✅ **E-E-A-T Signals defined** (credentials, references, case studies)

### Quality Scoring:

**Excellent (90-100 points)**:
- 30+ SERP results ✓
- 10+ PAA questions (incl. Level 2) ✓
- Content parsing successful for Top 3 ✓
- 8+ Must-Have Topics identified ✓
- 5+ Differentiation Opportunities ✓
- 2+ Completely Missing Topics ✓

**Good (70-89 points)**:
- 20-29 SERP results ✓
- 5-9 PAA questions ✓
- Content parsing für 1-2 URLs ✓
- 5-7 Must-Have Topics ✓
- 3-4 Differentiation Opportunities ✓

**Acceptable (50-69 points)**:
- 10-19 SERP results ✓
- 3-4 PAA questions ✓
- No content parsing (Meta-data only) ✓
- 3-4 Must-Have Topics ✓
- 2 Differentiation Opportunities ✓

**Failed (< 50 points)**:
- < 10 SERP results ❌
- < 3 PAA questions ❌
- < 3 Must-Have Topics ❌
- No E-E-A-T signals defined ❌

### Partial Success Handling:

**Scenario**: Content Parsing failed, aber SERP + PAA Data excellent
→ **Action**: PROCEED mit Warning, mark als "meta_data_only_analysis"

**Scenario**: Nur 2 PAA questions statt 5+
→ **Action**: PROCEED wenn Nischen-Keyword, use Related Keywords für PAA-Expansion in Phase 3

**Scenario**: Alle Top 10 = High-Authority Domains
→ **Action**: PROCEED, flag "high_competition", fokus auf Content-Quality + E-E-A-T statt Authority

### Retry Logic:

❌ **Wenn < 3 Must-Have Topics**:
- Sub-Agent Prompt zu vague
- Retry mit expliziterem Output-Beispiel
- Oder: Manual review des Sub-Agent JSON

❌ **Wenn Search Intent = null**:
- API Call failed
- Retry Search Intent Call
- Falls wieder failed: Infer Intent manually based on SERP (Informational default für How-To Keywords)

---

## Output Files

Main-Agent speichert nach erfolgreicher Validation:

### 1. `serp-analysis.json`
**Location**: `SEO/SEO-CONTENT/{keyword-slug}/research/serp-analysis.json`

Vollständiger JSON Output vom Sub-Agent (siehe OUTPUT FORMAT oben).

### 2. `competitor-content-gaps.json` (Optional)
**Location**: `SEO/SEO-CONTENT/{keyword-slug}/research/competitor-content-gaps.json`

Detaillierte Gap-Analyse für spätere Content-Updates:
```json
{
  "snapshot_date": "2025-01-04",
  "top_10_urls": [
    {
      "rank": 1,
      "url": "...",
      "topics_covered": ["health", "legal", "costs"],
      "topics_missing": ["insurance", "trial_period"],
      "estimated_word_count": 2800
    }
  ],
  "gap_summary": {
    "universally_covered": ["health_check", "legal_docs"],
    "partially_covered": ["insurance", "financing"],
    "not_covered": ["trial_contracts", "payment_plans"]
  }
}
```

---

## Troubleshooting

### Problem: Sub-Agent liefert incomplete JSON
**Symptom**: Fehlende Sections im JSON (z.B. `eeat_signals` = null)

**Lösung**:
1. Check Sub-Agent Response für Errors/Warnings
2. Prüfe ob alle API-Calls successful waren
3. Retry mit expliziterem OUTPUT FORMAT Beispiel im Prompt
4. Falls persistent: Manual completion der fehlenden Sections

---

### Problem: Content Parsing failed für alle 3 URLs
**Symptom**: `content_parsed_urls: 0` im JSON

**Mögliche Ursachen**:
- URLs hinter Paywall/Login
- JavaScript-heavy Sites (Client-side rendering)
- Rate Limiting von Target-Domains

**Lösung**:
- Log Warning: "Content parsing unavailable, proceeding with meta-data analysis"
- Proceed mit SERP Title/Description Analysis only
- Mark in JSON: `"data_quality": "limited_no_content_parsing"`
- Content-Length basierend auf Featured Snippet Length schätzen

---

### Problem: Nur 1-2 PAA Questions gefunden
**Symptom**: `paa_questions_count: 2`

**Ursachen**:
- Nischen-Keyword mit wenig Search Volume
- Commercial Keywords haben oft weniger PAA
- Lokale Keywords haben eingeschränkte PAA

**Lösung**:
- Check ob Keyword wirklich zu nischig ist
- Alternative: Use Related Keywords aus Phase 1 für PAA-Expansion
- Oder: Nutze `people_also_ask_click_depth=3` (max) für deeper expansion
- Proceed mit verfügbaren PAA + flag "limited_paa_data"

---

### Problem: Alle Top 10 = High-Authority Domains (DA > 70)
**Symptom**: `high_authority: 10, medium_authority: 0, low_authority: 0`

**Assessment**: "winner-takes-all" SERP

**Strategie**:
- Fokus auf Content-Quality > Domain Authority
- Identifiziere Content-Gaps die selbst große Domains übersehen
- Starke E-E-A-T Signale critical (Experten-Credentials, Case Studies, Original Research)
- Long-tail Entry Strategy: Nutze PAA-basierte Long-Tail Keywords für initial Ranking
- Später: Use Internal Linking von ranked Long-Tail Articles zu Main Keyword Article

---

### Problem: Search Intent = Mixed (50/50 Informational/Commercial)
**Symptom**: `primary: "informational", probability: 0.51, secondary: "commercial", probability: 0.49`

**Content Strategy**:
- Hybrid-Ansatz: Informational Content (70%) + Commercial Elements (30%)
- Structure: Education-first (How-To, Guide) mit eingebetteten Commercial CTAs
- Beispiel: "Pferd kaufen worauf achten" → Guide mit Checkliste + "Pferd-Bewertung hier starten" CTA
- Visual Mix: Educational Diagrams + Comparison Tables + Product/Service Integration

---

### Problem: Token Budget exceeded (> 2000 Tokens)
**Symptom**: Sub-Agent Context Warning

**Ursachen**:
- Zu viele Details im Final JSON
- Raw API Responses nicht verworfen
- Zu viele URLs geparst (> 3)

**Sofort-Maßnahmen**:
- Reduziere Content Parsing auf Top 2 URLs (statt 3)
- Kürze `must_have_topics` Array (max 8 items statt 10+)
- Kürze PAA Integration auf Top 5 (statt 8+)
- Remove verbose `reasoning` fields, nur `evidence` behalten

---

## Token Budget Breakdown

**Realistic Estimation für Phase 2**:

```
Sub-Agent Prompt (Main → Sub):        ~450 Tokens
──────────────────────────────────────────────────
API Call 1 (SERP depth=30):           ~3000 Tokens
  → Extraction + Compression:          -2400 Tokens
  → Retained Insights:                  ~600 Tokens

API Call 2 (PAA depth=5, click=2):     ~800 Tokens
  → Extraction + Compression:           -600 Tokens
  → Retained Insights:                  ~200 Tokens

API Call 3 (Search Intent):            ~100 Tokens
  → Direct extraction:                  ~100 Tokens

API Calls 4-6 (Content Parsing x3):   ~1200 Tokens
  → Extraction + Compression:          -900 Tokens
  → Retained Insights:                  ~300 Tokens

Sub-Agent Analysis + JSON Creation:    ~400 Tokens
Sub-Agent JSON Output to Main:         ~350 Tokens
Main-Agent Validation + File Write:    ~200 Tokens
──────────────────────────────────────────────────
TOTAL PHASE 2:                        ~1800 Tokens ✅
```

**vs. Old Approach (Main-Agent API Calls)**:
- API Responses in Main Context: ~5000 Tokens
- Main Context Pollution: CRITICAL
- Session Length: REDUCED

**Sub-Agent Pattern Savings**: ~65% Token Efficiency!

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 2:
→ **Phase 3: Content Outline** (`phase-3-outline.md`)

**Phase 2 Output als Phase 3 Input**:
- `content_gaps.must_have_topics` → Required H2 Sections
- `content_gaps.differentiation_opportunities` → Unique Angles für H2/H3
- `content_gaps.completely_missing` → NEW Content Sections (Differentiation!)
- `paa_integration` → FAQ Section + H2/H3 Integration
- `format_recommendations.required_sections` → Content Structure Template
- `eeat_signals` → Author Bio, References, Case Study Requirements

---

## Phase 2 Checklist

**Main-Agent Tasks**:
- [ ] Read `keyword-analysis.json` from Phase 1
- [ ] Extract Primary Keyword
- [ ] Delegate complete Phase 2 to `seo-content-writer` Sub-Agent
- [ ] Receive Sub-Agent JSON Response
- [ ] Validate Quality Gate (min requirements met?)
- [ ] Score Quality (90-100: excellent, 70-89: good, 50-69: acceptable, <50: retry)
- [ ] Save `serp-analysis.json` to `research/` folder
- [ ] Optional: Save `competitor-content-gaps.json`
- [ ] Mark Phase 2 as completed
- [ ] Ready für Phase 3

**Sub-Agent Tasks** (automated via delegation):
- [ ] API Call 1: SERP Organic (depth=30) + Extract Top 10 + Stats
- [ ] API Call 2: PAA Deep Expansion (depth=5, click=2) + Extract Questions
- [ ] API Call 3: Search Intent Analysis + Classify Intent
- [ ] API Calls 4-6: Content Parsing für Top 3 URLs (optional, best effort)
- [ ] Analysis: Content-Gaps (Must-Have, Differentiation, Missing)
- [ ] Analysis: Format Recommendations (Word Count, Sections, Visuals)
- [ ] Analysis: Competitor Landscape (Authority, Domain Types, Opportunity)
- [ ] Analysis: E-E-A-T Signals (Credentials, References, Case Studies)
- [ ] Analysis: PAA Integration Strategy (Category, Placement, Priority)
- [ ] Create comprehensive JSON Output
- [ ] Return to Main-Agent

---

**Version**: 2.0 (Optimized for Context Efficiency)
**Token Budget**: ~1800 Tokens (realistic)
**Agent Pattern**: Sub-Agent does ALL (API + Analysis)
**Last Updated**: 2025-01-04 - Major Rewrite with DataForSEO MCP Integration
