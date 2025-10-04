# Phase 6: Quality Check & Publication Readiness

**Token Budget**: ~400 Tokens
**Main Deliverables**: `quality-report.json`, `eeat-score.json`, Publication-Ready Article
**Agent Pattern**: Sub-Agent (comprehensive validation)

---

## Phase 6A: Content Quality Validation (Sub-Agent)

**WICHTIG**: Sub-Agent führt alle Validierungen durch. Main-Agent orchestriert nur!

### Step 1: Comprehensive Quality Check

Führe finale Qualitätsprüfung aller Deliverables aus Phase 1-5 durch.

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Comprehensive quality validation for SEO article</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Führe eine umfassende Qualitätsprüfung des finalen SEO-Artikels durch.

## DATEN (JSON):
{
  "article_content": "...",              // Finaler Artikel aus Phase 4
  "seo_metadata": {...},                  // Metadaten aus Phase 5
  "schema_markup": [...],                 // Schema JSONs aus Phase 5
  "internal_links": [...],                // Internal Linking aus Phase 5
  "keyword_data": {...},                  // Keyword-Analyse aus Phase 1
  "serp_analysis": {...},                 // SERP-Daten aus Phase 2
  "content_outline": {...}                // Outline aus Phase 3
}

## AUFGABE:

### 1. Content Quality Validation

**Word Count Check**:
- **Ziel**: 2000-2500 Wörter (basierend auf `format_recommendations.target_word_count` aus Phase 2)
- **Akzeptabel**: 1800-2800 Wörter
- **KRITISCH**: Wenn < 1800 oder > 3000 → Flag für Revision

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

### 2. Readability Analysis

**Flesch Reading Ease Score**:
- **Ziel**: 60-70 (Standard-Lesbarkeit für deutsches Publikum)
- **Akzeptabel**: 50-80
- **KRITISCH**: < 40 (zu komplex) oder > 90 (zu simpel)

**Formel** (für Deutsch angepasst):
```
FRE = 180 - (ASL * 1.0) - (ASW * 58.5)
ASL = Average Sentence Length
ASW = Average Syllables per Word
```

**Sentence Length Check**:
- **Durchschnitt**: 15-20 Wörter pro Satz
- **Max**: Keine Sätze > 40 Wörter
- **WARNUNG**: Wenn > 30% der Sätze länger als 25 Wörter

**Paragraph Length Check**:
- **Durchschnitt**: 3-5 Sätze pro Absatz
- **Max**: Keine Absätze > 8 Sätze
- **WARNUNG**: Wenn > 20% der Absätze länger als 6 Sätze

### 3. E-E-A-T Score Calculation

Berechne E-E-A-T Score (0-10) basierend auf:

**Experience (25% Gewicht)**:
- ✅ **+2.5 Punkte**: Min 1 persönliche Erfahrung/Fallbeispiel integriert
- ✅ **+1.5 Punkte**: Praktische Tipps basierend auf realen Szenarien
- ✅ **+1.0 Punkte**: "Wir haben getestet"-Formulierungen oder eigene Insights
- ❌ **0 Punkte**: Rein theoretischer Content ohne Praxis-Bezug

**Expertise (25% Gewicht)**:
- ✅ **+2.5 Punkte**: Autorenkredit mit relevanten Credentials (Tierarzt, Pferdewirt, etc.)
- ✅ **+1.5 Punkte**: Fachbegriffe korrekt verwendet und erklärt
- ✅ **+1.0 Punkte**: Detailtiefe zeigt Fachkompetenz
- ❌ **0 Punkte**: Generic Content ohne erkennbare Expertise

**Authoritativeness (25% Gewicht)**:
- ✅ **+2.5 Punkte**: Min 3 externe Referenzen zu autoritativen Quellen
- ✅ **+1.5 Punkte**: Branchendaten/Statistiken zitiert
- ✅ **+1.0 Punkte**: Verweise auf etablierte Standards/Guidelines
- ❌ **0 Punkte**: Keine Quellenangaben

**Trustworthiness (25% Gewicht)**:
- ✅ **+2.5 Punkte**: Alle Behauptungen mit Quellen belegt
- ✅ **+1.5 Punkte**: Balanced Content (Pro/Contra, Risiken erwähnt)
- ✅ **+1.0 Punkte**: Transparenz über Limitationen/Unsicherheiten
- ❌ **0 Punkte**: Unbelegt Claims oder einseitiger Content

**E-E-A-T Score Interpretation**:
- **8-10**: Excellent - Publication-Ready
- **6-7**: Good - Minor improvements möglich
- **4-5**: Acceptable - Mehrere E-E-A-T Signale fehlen
- **0-3**: Poor - Major Revision erforderlich

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

### 5. Content Completeness Check

**Phase 2 Content Gaps abgedeckt?**:
- Prüfe ob alle `must_have_topics` aus Phase 2 im Artikel vorhanden sind
- Liste fehlende Topics im Quality Report

**PAA Integration Check**:
- Min 5 PAA-Fragen aus Phase 2 im Artikel beantwortet
- FAQ-Sektion mit min 3 PAA-basierten Fragen vorhanden
- Answers sind comprehensive (min 50 Wörter pro Antwort)

**Differentiation Opportunities genutzt?**:
- Min 2 von 3 `differentiation_opportunities` aus Phase 2 implementiert
- Unique Angles erkennbar vs. Competitor Content

**Visual Elements Recommendations umgesetzt?**:
- Wenn `visual_elements` in Phase 2 definiert → im Artikel referenziert
- Platzhalter für Bilder/Tabellen/Checklisten vorhanden

## OUTPUT FORMAT (JSON):
{
  "quality_report": {
    "overall_score": 8.5,
    "publication_ready": true,
    "content_quality": {
      "word_count": 2450,
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
      "flesch_reading_ease": 65,
      "flesch_status": "optimal",
      "avg_sentence_length": 18,
      "sentences_over_25_words": 0.15,
      "avg_paragraph_length": 4.2,
      "paragraphs_over_6_sentences": 0.1
    },
    "eeat_score": {
      "total_score": 8.5,
      "experience_score": 2.0,
      "expertise_score": 2.5,
      "authoritativeness_score": 2.0,
      "trustworthiness_score": 2.0,
      "breakdown": {
        "personal_examples": true,
        "credentials_present": true,
        "external_references": 4,
        "sources_cited": true
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
    "content_completeness": {
      "must_have_topics_covered": 9,
      "must_have_topics_total": 10,
      "missing_topics": ["Versicherung beim Kauf"],
      "paa_questions_answered": 6,
      "faq_section_present": true,
      "faq_questions_count": 4,
      "differentiation_opportunities_used": 2
    },
    "warnings": [
      "Topic 'Versicherung beim Kauf' aus Must-Have List fehlt im Artikel"
    ],
    "recommendations": [
      "Ergänze Sektion zu Versicherung beim Pferdekauf (150-200 Wörter)",
      "Erwäge HowTo Schema für Tutorial-Sektion hinzuzufügen"
    ]
  }
}

**WICHTIG**:
- Alle Scores müssen auf tatsächlichen Messungen basieren, nicht geschätzt!
- Wenn Daten für eine Metrik fehlen → klar kommunizieren in warnings
- Recommendations müssen actionable sein (konkrete Verbesserungsvorschläge)
- Wenn overall_score < 7.0 → publication_ready = false
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 6

Prüfe ob finale Validierung erfolgreich war:

✅ **Overall Quality Score ≥ 7.0** (Publication-Ready Threshold)
✅ **E-E-A-T Score ≥ 6.0** (Minimum für Google Quality Guidelines)
✅ **Word Count 1800-2800** (Acceptable Range)
✅ **Primary Keyword Density 0.5-1.5%** (SEO-optimiert, kein Stuffing)
✅ **Min 5 H2 Headings** (Strukturierte Content-Hierarchie)
✅ **Flesch Reading Ease 50-80** (Lesbar für Zielgruppe)
✅ **Min 2 Schema Types** (Rich Snippets Optimization)
✅ **Min 3 Internal Links** (User Journey + Link Equity)
❌ **Wenn Overall Score < 7.0** → Review warnings/recommendations, implement fixes

**Partial Success**: Wenn Score = 6.5-6.9 → Proceed mit Warning für "Good but not excellent" Quality.

---

## Phase 6B: Final Content Refinement (Optional)

**WICHTIG**: Nur ausführen wenn Quality Gate Warnings/Recommendations vorhanden sind!

### Step 1: Implement Fixes

Wenn Quality Report Warnings enthält:

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Implement quality improvements based on report</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Implementiere die Verbesserungsvorschläge aus dem Quality Report.

## QUALITY REPORT WARNINGS:
{quality_report.warnings}

## RECOMMENDATIONS:
{quality_report.recommendations}

## AUFGABE:
Für jede Warning/Recommendation:
1. Identifiziere betroffene Sektion im Artikel
2. Implementiere Fix (z.B. fehlende Topics ergänzen, Keywords reduzieren)
3. Stelle sicher dass Fix keine neuen Probleme verursacht
4. Re-check impacted metrics (z.B. Word Count nach Ergänzung)

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
✅ **Keine neuen Warnings entstanden**
❌ **Wenn Fixes neue Probleme verursachen** → Rollback, accept current quality level

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/quality/`:

### 1. `quality-report.json`
```json
{
  "phase": "6A",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T16:00:00Z",
  "overall_score": 8.5,
  "publication_ready": true,
  "quality_report": {
    "content_quality": {...},
    "readability": {...},
    "eeat_score": {...},
    "seo_technical": {...},
    "content_completeness": {...}
  },
  "warnings": [...],
  "recommendations": [...]
}
```

### 2. `eeat-score.json`
```json
{
  "total_score": 8.5,
  "experience_score": 2.0,
  "expertise_score": 2.5,
  "authoritativeness_score": 2.0,
  "trustworthiness_score": 2.0,
  "breakdown": {
    "personal_examples": true,
    "credentials_present": true,
    "external_references": 4,
    "sources_cited": true,
    "practical_tips": true,
    "balanced_content": true
  },
  "status": "excellent"
}
```

### 3. `final-article.md` (Copy of article-draft.md)
Publication-ready Artikel-Kopie in `content/` Ordner.

### 4. `publication-checklist.md`
```markdown
# Publication Checklist - {keyword}

## Pre-Publication Checks
- [ ] Quality Score ≥ 7.0
- [ ] E-E-A-T Score ≥ 6.0
- [ ] All Must-Have Topics covered
- [ ] Min 3 Internal Links implementiert
- [ ] Schema Markup validated (Google Structured Data Testing Tool)
- [ ] Metadata optimiert (Title, Description, OG, Twitter)
- [ ] Readability Score 50-80
- [ ] No Broken Links

## Content Files
- [ ] `content/final-article.md` bereit
- [ ] `seo/seo-metadata.json` bereit
- [ ] `seo/schema-article.json` bereit
- [ ] `seo/schema-faq.json` bereit (optional)
- [ ] `seo/internal-linking.json` bereit

## Next Steps
1. Copy `final-article.md` zu CMS/Publishing-System
2. Implementiere Schema Markup im HTML <head>
3. Setze Metadata aus `seo-metadata.json`
4. Integriere interne Links aus `internal-linking.json`
5. Upload Hero Image (basierend auf `image_url` in metadata)
6. Schedule Publication oder publish sofort

## Post-Publication
- [ ] Google Search Console: URL zur Indexierung einreichen
- [ ] Interne Verlinkung von anderen Ratgeber-Seiten hinzufügen
- [ ] Social Media Promotion (LinkedIn/Instagram)
- [ ] Tracking einrichten (Google Analytics Event für Ratgeber-Artikel)
```

---

## Troubleshooting

### Problem: Overall Quality Score < 7.0
**Symptom**: Quality Report zeigt `publication_ready: false`

**Diagnose**:
1. Prüfe welche Sub-Scores am niedrigsten sind
2. Fokus auf größte Verbesserungspotenziale (z.B. E-E-A-T = 4.0 → hier ansetzen)

**Lösung**:
- **Wenn E-E-A-T niedrig**: Ergänze Credentials, externe Referenzen, Fallbeispiele
- **Wenn Readability niedrig**: Kürze lange Sätze, vereinfache Fachbegriffe
- **Wenn SEO Technical niedrig**: Fix Metadata (Title/Description zu lang/kurz)
- **Wenn Content Completeness niedrig**: Ergänze fehlende Must-Have Topics

### Problem: Keyword Density zu hoch (> 1.5%)
**Symptom**: Warning "Primary Keyword Stuffing Risk"

**Lösung**:
1. Identifiziere Sektionen mit höchster Keyword-Dichte
2. Ersetze einige Primary Keyword Mentions durch:
   - Synonyme (z.B. "Pferdekauf" statt "Pferd kaufen")
   - Pronomen (z.B. "Es" statt Keyword-Wiederholung)
   - Verwandte Begriffe (z.B. "Tier" statt "Pferd")
3. Re-check Density nach Änderungen

### Problem: Readability Score zu niedrig (< 50)
**Symptom**: Flesch Reading Ease = 40 → "zu komplex"

**Lösung**:
1. **Sentence Length reduzieren**:
   - Teile Sätze > 25 Wörter in 2 Sätze auf
   - Verwende Bullet Points statt langer Aufzählungssätze
2. **Fachbegriffe vereinfachen**:
   - Erkläre Fachbegriffe bei erster Verwendung
   - Verwende einfachere Synonyme wo möglich
3. **Paragraph Length reduzieren**:
   - Teile lange Absätze (> 6 Sätze) auf
   - Verwende Subheadings (H3) für bessere Gliederung

### Problem: E-E-A-T Score zu niedrig (< 6.0)
**Symptom**: Authoritativeness = 0, Trustworthiness = 1.0 → fehlende Quellen

**Lösung**:
1. **Authoritativeness erhöhen**:
   - Füge min 3 externe Referenzen hinzu (z.B. Tierarzt-Verbände, Studien)
   - Zitiere Branchendaten/Statistiken
   - Verweise auf Guidelines/Standards (z.B. FN-Kaufverträge)
2. **Trustworthiness erhöhen**:
   - Belege alle Claims mit Quellen
   - Erwähne Risiken/Limitationen (balanced content)
   - Transparenz über Unsicherheiten ("Es gibt keine pauschale Antwort...")

### Problem: Must-Have Topics fehlen im Artikel
**Symptom**: Content Completeness = 70% → 3 von 10 Topics fehlen

**Lösung**:
1. Prüfe `missing_topics` Liste im Quality Report
2. Für jedes fehlende Topic:
   - Identifiziere beste Integration-Stelle (existierende Sektion oder neue Sektion)
   - Ergänze min 100-150 Wörter Content zu diesem Topic
   - Stelle sicher dass Topic mit Must-Have aus Phase 2 übereinstimmt
3. Re-validate Content Completeness nach Ergänzung

---

## Best Practices

### Quality Scoring Philosophy
- **Objective Metrics bevorzugen**: Word Count, Keyword Density, Link Count sind messbar
- **Subjektive Metrics transparent machen**: E-E-A-T Score basierend auf klaren Kriterien (Checkliste)
- **Keine 100% Perfektion erwarten**: 8.0-8.5 Overall Score ist excellent, 10.0 ist unrealistisch

### E-E-A-T Integration
- **Experience**: Mindestens 1 "Wir haben getestet" oder "In der Praxis zeigt sich" Formulierung
- **Expertise**: Autorenkredit mit Credentials prominent platzieren (unter Titel oder am Ende)
- **Authoritativeness**: Min 3 externe Referenzen zu autoritativen Quellen (nicht zu Competitor Blogs)
- **Trustworthiness**: Alle statistischen Claims belegen, Risiken erwähnen, transparent kommunizieren

### Readability Optimization
- **Durchschnittliche Satzlänge**: 15-20 Wörter optimal für deutsche Texte
- **Absatzlänge**: 3-5 Sätze pro Absatz, keine "Textwüsten"
- **Subheadings**: Min jede 200-300 Wörter ein H3 für Orientierung
- **Bullet Points**: Nutzen für Listen, Checklisten, Vor-/Nachteile

### SEO Technical Validation
- **Google Structured Data Testing Tool**: Immer vor Publikation testen
- **Internal Links**: Nur zu relevanten, thematisch verwandten Seiten verlinken
- **Metadata**: Title + Description müssen zusammen Sinn ergeben (User sieht beides im SERP)
- **URL Slug**: Kurz halten (max 5 Wörter), Primary Keyword am Anfang

### Publication Readiness
- **Min Quality Score 7.0**: Darunter ist Artikelqualität nicht wettbewerbsfähig
- **E-E-A-T Score ≥ 6.0**: Google Quality Rater Guidelines Minimum
- **Zero Critical Warnings**: Alle "CRITICAL"-Warnings müssen vor Publikation behoben sein
- **Recommendations Review**: Entscheide für jede Recommendation ob Implementation vor/nach Publikation

---

## Integration mit anderen Phasen

### Input von Phase 4 (Content Creation):
- `article-draft.md` - Finaler Artikel-Text
- `fact-check-results.json` - Validierte Claims

### Input von Phase 5 (On-Page SEO):
- `seo-metadata.json` - Title, Description, Keywords, OG, Twitter
- `schema-*.json` - Alle Schema Markup Files
- `internal-linking.json` - Interne Verlinkungsstrategie

### Input von Phase 2 (SERP Analysis):
- `content_gaps.must_have_topics` - Topics die MÜSSEN abgedeckt sein
- `format_recommendations.target_word_count` - Ziel-Wortanzahl
- `paa_integration` - PAA-Fragen für FAQ-Sektion

### Output für Publication:
- `quality-report.json` - Verwendung: QA-Review, Tracking, Iteration
- `final-article.md` - Verwendung: CMS Import, HTML Conversion
- `publication-checklist.md` - Verwendung: Publishing Workflow

---

## Next Steps

Nach erfolgreichem Abschluss von Phase 6:
→ **Article Publication** - Copy Files zu CMS/Publishing-System

**Post-Publication Monitoring**:
1. Google Search Console: URL indexiert?
2. Google Rich Results Test: Schema Markup erkannt?
3. Analytics Tracking: Pageviews, Time on Page, Bounce Rate
4. Ranking Tracking: Position für Primary Keyword nach 2-4 Wochen

**Iteration**:
- Wenn Ranking nach 4 Wochen < Position 10 → Review Competitor Content Changes
- Wenn User Engagement niedrig (High Bounce) → Readability + Hook überarbeiten
- Wenn Featured Snippet nicht erreicht → FAQ-Sektion + Liste-Formate erweitern

---

**Phase 6 Checklist**:
- [ ] Sub-Agent Quality Check ausgeführt
- [ ] Quality Report erstellt mit Overall Score
- [ ] E-E-A-T Score berechnet (min 6.0)
- [ ] Content Quality validiert (Word Count, Keywords, Topics)
- [ ] Readability Score geprüft (50-80 Range)
- [ ] SEO Technical Check (Metadata, Schema, Links)
- [ ] Warnings/Recommendations reviewed
- [ ] Quality Gate 6: Overall Score ≥ 7.0
- [ ] Optional Phase 6B Fixes implementiert (wenn nötig)
- [ ] Output Files gespeichert in `quality/` Ordner
- [ ] Publication Checklist erstellt
- [ ] Ready für Publication: Artikel ist publish-ready!
