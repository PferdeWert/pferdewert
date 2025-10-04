# Phase 6: Quality Check & E-E-A-T Validation

**Token Budget**: ~400 Tokens
**Main Deliverables**: E-E-A-T Score Report, Quality Checklist, Publication Decision
**Agent Pattern**: Sub-Agent only (seo-content-writer)

---

## Phase 6A: Quality Validation (Sub-Agent)

**WICHTIG**: Diese Phase wird komplett vom Sub-Agent ausgeführt. Main-Agent delegiert nur.

### Sub-Agent Delegation

Der Main-Agent delegiert die Quality-Analyse via Task-Tool an den `seo-content-writer` Sub-Agent:

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Perform quality check and E-E-A-T validation</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Führe eine umfassende Qualitätsprüfung des fertigen Artikels durch und erstelle einen E-E-A-T Score Report.

## INPUT-DATEN:
- Vollständiger Artikel-Content (markdown) von Phase 4
- On-Page SEO Metadaten von Phase 5
- Content-Outline von Phase 3
- Primary Keyword und Supporting Keywords von Phase 1

## AUFGABE:

### 1. E-E-A-T Scoring (0-10 pro Kategorie)

#### Experience (Erfahrung) - Scoring:

**Was prüfen:**
- Sind konkrete Case Studies vorhanden?
- Werden persönliche Erfahrungen/Beobachtungen geteilt?
- Gibt es praktische Beispiele aus realen Situationen?
- Wie detailliert sind die Praxis-Insights?

**Scoring-Skala:**
- **0-3**: Keine persönlichen Insights, nur generische Informationen
- **4-6**: Einzelne generische Beispiele, wenig persönliche Tiefe
- **7-8**: 1-2 konkrete Case Studies mit praktischen Details
- **9-10**: 3+ detaillierte Case Studies, tiefe persönliche Einblicke

**Beispiel-Bewertung:**
```
Experience Score: 8/10
Begründung: Artikel enthält 2 detaillierte Case Studies (Pferdekauf-Erfahrung mit Ankaufsuntersuchung, Vertragsproblematik bei Privatverkauf). Praktische Insights zu Probereiten und Gesundheitscheck sind spezifisch und erfahrungsbasiert.
```

#### Expertise (Fachwissen) - Scoring:

**Was prüfen:**
- Werden Experten-Zitate verwendet?
- Sind Credentials der Experten genannt?
- Ist Fachterminologie korrekt verwendet?
- Wird tiefes Fachwissen demonstriert?

**Scoring-Skala:**
- **0-3**: Keine Experten-Zitate, oberflächliches Wissen
- **4-6**: Einige Fachbegriffe, 1 Experten-Zitat ohne Credentials
- **7-8**: 2-3 Experten-Zitate mit Credentials (z.B. "Tierarzt Dr. Müller")
- **9-10**: 3+ Experten-Zitate mit vollständigen Credentials, tiefes Fachwissen erkennbar

**Beispiel-Bewertung:**
```
Expertise Score: 7/10
Begründung: 3 Experten-Zitate vorhanden (Tierarzt, Anwalt, Pferdewirtschaftsmeister). Alle mit Credentials. Fachterminologie korrekt verwendet. Könnte noch detaillierter sein bei rechtlichen Aspekten.
```

#### Authoritativeness (Autorität) - Scoring:

**Was prüfen:**
- Werden externe vertrauenswürdige Quellen verlinkt?
- Sind Daten/Statistiken mit Quellen belegt?
- Wird auf anerkannte Institutionen referenziert?

**Scoring-Skala:**
- **0-3**: Keine externen Quellen, keine Daten-Belege
- **4-6**: 1-2 externe Links, wenige Daten-Referenzen
- **7-8**: 3+ vertrauenswürdige Quellen (z.B. FN, Studien, Fachverbände)
- **9-10**: 5+ hochwertige Quellen, alle Daten belegt, anerkannte Institutionen

**Beispiel-Bewertung:**
```
Authoritativeness Score: 8/10
Begründung: 4 externe Quellen verlinkt (FN-Richtlinien, Veterinär-Leitfaden, Rechtsprechung, Marktdaten-Studie). Alle Statistiken mit Quellen belegt. Könnte noch mehr auf Fachverbände referenzieren.
```

#### Trustworthiness (Vertrauenswürdigkeit) - Scoring:

**Was prüfen:**
- Wird transparent über Limitationen gesprochen?
- Sind Interessenkonflikte offengelegt?
- Wird ausgewogene Perspektive geboten?
- Sind Disclaimer/Hinweise vorhanden wo nötig?

**Scoring-Skala:**
- **0-3**: Einseitige Perspektive, keine Limitationen erwähnt
- **4-6**: Teilweise ausgewogen, wenige Disclaimer
- **7-8**: Transparenz über Limitationen, ausgewogene Perspektive
- **9-10**: Vollständige Transparenz, Disclaimer, Interessenkonflikte offengelegt

**Beispiel-Bewertung:**
```
Trustworthiness Score: 9/10
Begründung: Disclaimer zu rechtlichen Hinweisen vorhanden. Limitationen bei Preisangaben transparent kommuniziert. Ausgewogene Darstellung (Pro/Contra). PferdeWert-CTA als bezahlter Service klar gekennzeichnet.
```

**Gesamt-E-E-A-T Score Berechnung:**
```
E-E-A-T Score = (Experience + Expertise + Authoritativeness + Trustworthiness) / 4
Beispiel: (8 + 7 + 8 + 9) / 4 = 8.0 / 10
```

**Minimum-Schwellwert für Publication**: Score ≥ 7.0

---

### 2. Readability Check

**Flesch Reading Ease (Deutsch)**:
- Ziel: 60-70 (leicht verständlich)
- Methode: Schätze basierend auf:
  - Durchschnittliche Satzlänge (ideal: 12-18 Wörter)
  - Durchschnittliche Wortlänge (ideal: unter 2 Silben)
  - Komplexität der Fachbegriffe

**Struktur-Readability**:
- Absatzlänge: Max 4-5 Zeilen pro Absatz
- Listen/Aufzählungen: Mindestens 3-5 im gesamten Artikel
- Zwischenüberschriften: Alle 200-300 Wörter
- Fettungen/Hervorhebungen: Wichtige Konzepte hervorgehoben

**Beispiel-Bewertung:**
```
Readability Score: 7/10
Flesch Ease geschätzt: 65 (gut lesbar)
Struktur: Gut (17 Absätze, 6 Listen, Zwischenüberschriften alle 250 Wörter)
Verbesserung: Einige Schachtelsätze in "Rechtliche Aspekte" Sektion kürzen
```

---

### 3. Keyword Integration Validation

**Primary Keyword Density**:
- Ziel: 0.8-1.2% des Gesamt-Word-Counts
- Methode: Zähle exakte Keyword-Vorkommen
- Beispiel: Bei 2400 Wörtern → 19-29 Vorkommen (optimal: ~24)

**Supporting Keywords**:
- Min 60% der Supporting Keywords müssen vorkommen
- Natural Distribution (nicht geclustert)
- In H2/H3 Headlines integriert

**LSI Keywords (Latent Semantic Indexing)**:
- Sind verwandte Begriffe natürlich integriert?
- Beispiel für "Pferd kaufen": Ankaufsuntersuchung, Probereiten, Kaufvertrag

**Beispiel-Bewertung:**
```
Keyword Integration Score: 8/10
Primary Keyword: 26 Vorkommen = 1.08% (✓ im Zielbereich)
Supporting Keywords: 12/15 verwendet (80%, ✓)
LSI-Keywords: Gut integriert, natürliche Verwendung
Verbesserung: "Pferdekauf Kosten" könnte 2x mehr vorkommen
```

---

### 4. Brand Language Compliance

**Lese Brand Language Guideline**: `SEO/pferdewert-brand-language.md`

**Check-Items:**
- ✅ Duzen ("Du") konsequent verwendet?
- ✅ Aktive statt passive Formulierungen?
- ✅ Konkrete Beispiele statt abstrakte Konzepte?
- ✅ Emotional aber fundiert (nicht reißerisch)?
- ❌ KEINE "kostenlos/free" Erwähnungen? (KRITISCH - Service ist PAID)
- ❌ KEINE Marketing-Floskeln ("revolutionär", "einzigartig")?

**Beispiel-Bewertung:**
```
Brand Language Score: 9/10
✓ Duzen konsequent (100%)
✓ Aktive Formulierungen (85%)
✓ Konkrete Beispiele vorhanden
✓ Emotionaler Ton aber fundiert
✓ Kein "kostenlos/free"
✓ Keine Marketing-Floskeln
Verbesserung: 2-3 passive Formulierungen in Fazit umformulieren
```

---

### 5. Technical SEO Validation

**Title Tag:**
- Länge: 50-60 Zeichen (max 60)
- Primary Keyword enthalten?
- Emotional Hook vorhanden?

**Meta Description:**
- Länge: 140-155 Zeichen (max 160)
- Primary Keyword enthalten?
- CTA vorhanden?
- Benefit-orientiert?

**H1-H6 Hierarchie:**
- Nur 1x H1
- H2s in logischer Reihenfolge
- H3s unter relevanten H2s verschachtelt
- Keine Hierarchie-Sprünge (H2 → H4 ohne H3)

**Schema Markup:**
- Article Schema vollständig?
- FAQ Schema (wenn FAQ-Sektion vorhanden)?
- Breadcrumb Schema vorhanden?

**Beispiel-Bewertung:**
```
Technical SEO Score: 10/10
Title: 57 chars, Primary Keyword am Anfang, Hook vorhanden ✓
Meta: 152 chars, Keyword + CTA + Benefits ✓
Hierarchie: Korrekt, 1 H1, 7 H2s, 18 H3s ✓
Schema: Article + FAQ + Breadcrumb vollständig ✓
```

---

### 6. Content Completeness Check

**Content-Outline Adherence:**
- Alle geplanten H2s aus Phase 3 vorhanden?
- Word Count im Target-Bereich (±200 Wörter Toleranz)?
- Alle Must-Have Topics aus Phase 2 abgedeckt?

**PAA-Integration:**
- Alle High-Priority PAA-Fragen beantwortet?
- Medium-Priority PAA-Fragen in FAQ integriert?

**Visual Elements:**
- Alle geplanten Visual Elements platziert?
- Checklist/Download-Link vorhanden (wenn geplant)?
- Vergleichstabellen eingefügt (wenn geplant)?

**Internal Linking:**
- Alle geplanten Internal Links gesetzt?
- Anchor-Texte keyword-optimiert?

**Beispiel-Bewertung:**
```
Completeness Score: 8/10
✓ 7/7 H2s aus Outline vorhanden
✓ Word Count: 2380 (Target: 2400, ±20 Wörter)
✓ 5/5 Must-Have Topics abgedeckt
✓ 8/8 High-Priority PAA beantwortet
✓ 2/3 Visual Elements platziert
✗ Checkliste-Download fehlt (1 Element)
✓ 2/2 Internal Links gesetzt
Verbesserung: Checkliste-Download-CTA hinzufügen
```

---

## OUTPUT FORMAT (JSON):

```json
{
  "phase": "6",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T16:30:00Z",
  "eeat_scores": {
    "experience": {
      "score": 8,
      "reasoning": "2 detaillierte Case Studies mit praktischen Insights zu Ankaufsuntersuchung und Vertragsgestaltung. Praxis-Beispiele spezifisch und erfahrungsbasiert."
    },
    "expertise": {
      "score": 7,
      "reasoning": "3 Experten-Zitate mit Credentials (Tierarzt, Anwalt, Pferdewirtschaftsmeister). Fachterminologie korrekt. Rechtliche Details könnten tiefer sein."
    },
    "authoritativeness": {
      "score": 8,
      "reasoning": "4 externe vertrauenswürdige Quellen (FN, Veterinär-Leitfaden, Rechtsprechung, Marktdaten). Alle Statistiken belegt."
    },
    "trustworthiness": {
      "score": 9,
      "reasoning": "Disclaimer vorhanden, Limitationen transparent, ausgewogene Perspektive, PferdeWert-CTA als paid Service gekennzeichnet."
    },
    "overall_score": 8.0,
    "meets_threshold": true
  },
  "quality_checks": {
    "readability": {
      "score": 7,
      "flesch_ease_estimate": 65,
      "issues": ["Einige Schachtelsätze in 'Rechtliche Aspekte' Sektion"]
    },
    "keyword_integration": {
      "score": 8,
      "primary_keyword_density": 1.08,
      "primary_keyword_count": 26,
      "supporting_keywords_used": "12/15 (80%)",
      "lsi_integration": "good",
      "issues": ["'Pferdekauf Kosten' könnte 2x mehr vorkommen"]
    },
    "brand_language": {
      "score": 9,
      "duzen_compliance": 100,
      "active_voice_percentage": 85,
      "no_kostenlos_mentions": true,
      "issues": ["2-3 passive Formulierungen in Fazit"]
    },
    "technical_seo": {
      "score": 10,
      "title_length": 57,
      "meta_length": 152,
      "heading_hierarchy_correct": true,
      "schema_markup_complete": true
    },
    "completeness": {
      "score": 8,
      "outline_adherence": "7/7 H2s",
      "word_count": 2380,
      "must_have_topics": "5/5",
      "paa_integration": "8/8 high-priority",
      "visual_elements": "2/3",
      "issues": ["Checkliste-Download-CTA fehlt"]
    }
  },
  "overall_quality_score": 8.3,
  "publication_decision": {
    "approved": true,
    "confidence": "high",
    "recommended_improvements": [
      "Schachtelsätze in 'Rechtliche Aspekte' kürzen für bessere Readability",
      "'Pferdekauf Kosten' 2x zusätzlich natürlich integrieren",
      "2-3 passive Formulierungen in Fazit zu aktiv umformulieren",
      "Checkliste-Download-CTA in 'Checkliste Schritt-für-Schritt' Sektion hinzufügen"
    ],
    "optional_enhancements": [
      "Weitere externe Quelle zu Versicherungsaspekten hinzufügen",
      "Infografik für Kosten-Übersicht erstellen"
    ]
  }
}
```

**WICHTIG**:
- Alle Scores basieren auf objektiven Kriterien (siehe Scoring-Skalen)
- Reasoning muss spezifisch sein (nicht generisch)
- Issues konkret benennen mit Sektion/Zeile wenn möglich
- Publication Decision nur bei Overall E-E-A-T ≥ 7.0 approved
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 6

Prüfe ob Sub-Agent vollständigen Quality-Report geliefert hat:

✅ **E-E-A-T Overall Score berechnet (0-10)**
✅ **Alle 4 E-E-A-T Kategorien einzeln bewertet**
✅ **Min 3 Quality Check Kategorien analysiert**
✅ **Publication Decision getroffen (approved/rejected)**
✅ **Recommended Improvements konkret benannt**
❌ **Wenn Overall E-E-A-T < 7.0** → Article muss überarbeitet werden (zurück zu Phase 4)

**Partial Success**: Wenn Readability-Score fehlt → proceed mit Warning.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/validation/`:

### 1. `quality-report.json`
```json
{
  "phase": "6",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T16:30:00Z",
  "eeat_scores": {...},
  "quality_checks": {...},
  "overall_quality_score": 8.3,
  "publication_decision": {...}
}
```

### 2. `publication-checklist.md` (Optional)
Human-readable Checklist für finale Review.

---

## Troubleshooting

### Problem: E-E-A-T Score < 7.0
**Lösung**:
- Identifiziere schwächste Kategorie (Experience/Expertise/Authority/Trust)
- Wenn Experience < 7 → Füge 1-2 Case Studies hinzu (zurück zu Phase 4)
- Wenn Expertise < 7 → Füge Experten-Zitate mit Credentials hinzu
- Wenn Authority < 7 → Recherchiere und verlinke 2-3 hochwertige Quellen
- Wenn Trust < 7 → Füge Disclaimer/Transparenz-Statements hinzu

### Problem: Keyword Density zu hoch (> 1.5%)
**Lösung**:
- Ersetze einige exakte Keyword-Matches durch Synonyme
- Verwende LSI-Keywords statt Primary Keyword
- Prüfe ob Keyword unnatürlich oft in kurzer Passage vorkommt

### Problem: Brand Language "kostenlos" erwähnt
**Lösung**:
- **KRITISCH - MUSS gefixt werden**
- Suche und ersetze "kostenlos" → "günstig", "erschwinglich", "mit fairem Preis"
- Suche und ersetze "free" → "affordable", "budget-friendly"
- Reject Article bis Fix (zurück zu Phase 4)

### Problem: Schema Markup incomplete
**Lösung**:
- Prüfe ob alle geplanten Schemas aus Phase 5 vorhanden
- FAQ Schema fehlt oft → Zurück zu Phase 5 und hinzufügen
- Breadcrumb ist PFLICHT → Muss immer vorhanden sein

---

## Publication Decision Logic

**Approve Publication wenn:**
- Overall E-E-A-T Score ≥ 7.0
- No critical Brand Language violations
- Technical SEO Score ≥ 8.0
- Completeness Score ≥ 7.0

**Reject (Return to Phase 4) wenn:**
- Overall E-E-A-T Score < 7.0
- "kostenlos/free" erwähnt (Brand violation)
- < 4 Must-Have Topics abgedeckt
- Primary Keyword Density < 0.5% oder > 2.0%

**Conditional Approve (mit Verbesserungen) wenn:**
- E-E-A-T Score 7.0-7.5 (niedrig aber akzeptabel)
- Readability Score < 6.0
- 1-2 Visual Elements fehlen

---

## Next Steps

Nach erfolgreichem Quality Check:

### ✅ Wenn APPROVED:
→ Artikel bereit für Publication
→ Files finalisieren: `final-article.md`, `seo-metadata.json`, `schema-markup.json`
→ Übergabe an Content-Management für Upload

### ❌ Wenn REJECTED:
→ Zurück zu **Phase 4: Content Creation** (`phase-4-content.md`)
→ Implementiere alle **Recommended Improvements**
→ Führe Phase 6 erneut aus nach Überarbeitung

---

**Phase 6 Checklist**:
- [ ] Sub-Agent Delegation für Quality Check
- [ ] Quality Gate: E-E-A-T Overall ≥ 7.0
- [ ] Alle Quality Check Kategorien analysiert
- [ ] Publication Decision getroffen
- [ ] Recommended Improvements dokumentiert
- [ ] Output Files gespeichert in `validation/` Ordner
- [ ] Ready für Publication ODER Return to Phase 4

