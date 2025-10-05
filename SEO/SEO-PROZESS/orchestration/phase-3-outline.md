# Phase 3: Content Outline Creation

**Token Budget**: ~700 Tokens
**Main Deliverables**: `content-outline.json`, Article Structure with H2/H3
**Agent Pattern**: Sub-Agent only (combines Phase 1+2 data)

---

## Phase 3: SUB-AGENT erstellt strukturierten Outline

**WICHTIG**: Diese Phase hat keinen Main-Agent-Teil (keine API-Calls). Der Sub-Agent kombiniert nur die Ergebnisse aus Phase 1 und Phase 2.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Create detailed SEO content outline</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Erstelle einen detaillierten Content-Outline basierend auf Keyword- und SERP-Analyse aus Phase 1 und 2.

## INPUT-DATEN:

### Aus Phase 1 (keyword-analysis.json):
{
  "top_keywords": [...],           // Top 10 Keywords mit Relevanz-Scores
  "content_clusters": [...],       // Thematische Keyword-Cluster
  "recommendations": {
    "top_article_topics": [...],
    "estimated_word_count": 2500
  }
}

### Aus Phase 2 (serp-analysis.json):
{
  "content_gaps": {
    "must_have_topics": [...],     // PFLICHT-Themen (alle Top 10 decken ab)
    "differentiation_opportunities": [...],  // Chance für unique angles
    "completely_missing": [...]    // Content-Gaps (keiner deckt ab)
  },
  "format_recommendations": {
    "avg_word_count": 2150,        // SERP-competitive: Durchschnitt Top 3 URLs
    "target_word_count": 2365,     // Dein Ziel = avg × 1.10 (10% mehr)
    "word_count_range_min": 1828,  // Min-Threshold = avg × 0.85
    "word_count_range_max": 2795,  // Max-Threshold = avg × 1.30
    "word_count_strategy": "serp_competitive",  // oder "fallback"
    "word_count_fallback": 2500,   // Fallback wenn Content Parsing API unavailable
    "required_sections": [...],
    "visual_elements": [...]
  },
  "eeat_signals": {...},
  "paa_integration": [...]         // PAA-Fragen mit Sektion-Placement
}

**WICHTIG - Word Count Berechnung**:
Nutze die dynamischen Word Count Daten aus serp-analysis.json:

1. **Extrahiere word_count_data**:
   - Lies `format_recommendations.target_word_count` aus serp-analysis.json
   - Lies `format_recommendations.word_count_strategy` (sollte "serp_competitive" sein)

2. **Berechne Sektion-Längen** basierend auf fixen Prozentsätzen:
   - Einleitung: target_word_count × 0.07 (~7%)
   - Hauptsektionen: target_word_count × 0.72 (~72%, verteilt auf 5-8 H2-Sektionen)
   - FAQ: target_word_count × 0.10 (~10%)
   - Zusammenfassung/Fazit: target_word_count × 0.07 (~7%)

3. **Beispiel-Rechnung** bei target_word_count = 2365:
   - Einleitung: 2365 × 0.07 = 165 Wörter
   - Hauptsektionen (bei 6 Sektionen): (2365 × 0.72) / 6 = 284 Wörter/Sektion
   - FAQ: 2365 × 0.10 = 237 Wörter
   - Fazit: 2365 × 0.07 = 165 Wörter

4. **Fallback**: Wenn word_count_strategy = "fallback", nutze word_count_fallback (2500)

## AUFGABE:

Erstelle einen vollständig ausgearbeiteten Artikel-Outline mit präzisen Anweisungen für Phase 4 (Content Writing).

### 1. Artikel-Titel und Meta-Description

**Titel-Anforderungen**:
- Primary Keyword natürlich integriert (am besten am Anfang)
- 50-60 Zeichen optimal für SEO
- Emotional Hook (Nutzen/Problem/Lösung)
- Beispiel: "Pferd kaufen: Worauf achten? Der ultimative Kaufratgeber 2025"

**Meta-Description-Anforderungen**:
- 150-160 Zeichen
- Primary + 1-2 Supporting Keywords
- Call-to-Action
- Beispiel: "Pferd kaufen leicht gemacht: Gesundheitscheck, Kaufvertrag, Kosten-Übersicht. Experten-Tipps für sicheren Pferdekauf. Jetzt informieren!"

### 2. Einleitung (~7% des target_word_count)

**Struktur**:
- **Hook** (2-3 Sätze): Relevantes Problem oder emotionaler Einstieg
- **User-Intent-Adressierung** (2-3 Sätze): Was wird der Leser lernen?
- **Primary Keyword Integration**: Natürlich im ersten Absatz
- **Preview** (2-3 Sätze): Überblick über Artikel-Inhalt

**Word Count Berechnung**:
- Beispiel bei 2365 target: 2365 × 0.07 = ~165 Wörter
- Beispiel bei 3000 target: 3000 × 0.07 = ~210 Wörter

**Beispiel-Outline**:
```
Hook: "Ein Pferd zu kaufen ist eine emotionale Entscheidung – aber auch eine finanzielle Verantwortung."
Intent: "In diesem Ratgeber erfährst du alle wichtigen Aspekte beim Pferdekauf."
Preview: "Von Gesundheitschecks über rechtliche Absicherung bis zur Kostenplanung."
```

### 3. Hauptsektionen (5-8 Sektionen)

Für jede Hauptsektion definiere:

**H2-Heading**:
- Keyword-optimiert (primary oder supporting keyword)
- Frage-Format bevorzugt (wenn PAA-Frage passt)
- Beispiel: "Was sollte beim Gesundheitscheck beachtet werden?"

**Content-Type**:
- `explanation` - Konzepte erklären
- `tutorial` - Schritt-für-Schritt-Anleitung
- `comparison` - Vergleich von Optionen
- `checklist` - Actionable Liste
- `case_study` - Praktisches Beispiel

**Subsektionen (H3)**:
- 2-4 Subsektionen pro Hauptsektion
- Spezifische Aspekte des H2-Themas
- Supporting Keywords integriert
- Beispiel H3: "Röntgenuntersuchung: Wann sinnvoll?"

**Ziel-Wortanzahl**: ~72% des target_word_count, verteilt auf 5-8 Sektionen

**Word Count Berechnung pro Sektion**:
- Bei 2365 target mit 6 Sektionen: (2365 × 0.72) / 6 = ~284 Wörter/Sektion
- Bei 2365 target mit 5 Sektionen: (2365 × 0.72) / 5 = ~340 Wörter/Sektion
- Bei 3000 target mit 6 Sektionen: (3000 × 0.72) / 6 = ~360 Wörter/Sektion
- Bei 3000 target mit 8 Sektionen: (3000 × 0.72) / 8 = ~270 Wörter/Sektion

**Keyword-Integration**:
- Welche Keywords in dieser Sektion natürlich verwenden?
- Primary Keyword: Max 1-2x pro Sektion
- Supporting Keywords: 2-3 pro Sektion

**E-E-A-T Signale**:
- Welche Expertise-Signale einbauen?
- Beispiele: "Aus 15 Jahren Pferdekauf-Beratung weiß ich...", "Studien zeigen...", "Tierärzte empfehlen..."
- Welche Quellen/Daten zitieren?

**Visual Elements**:
- Tabellen, Checklisten, Diagramme
- Beispiel: "Vergleichstabelle: Ankaufsuntersuchung Stufen"

### 4. FAQ-Sektion (~10% des target_word_count)

**Word Count Berechnung**:
- Beispiel bei 2365 target: 2365 × 0.10 = ~237 Wörter
- Beispiel bei 3000 target: 3000 × 0.10 = ~300 Wörter

**Anforderungen**:
- Min 5 PAA-basierte Fragen aus Phase 2 (`serp-analysis.json` → `paa_integration` Array)
- Kurze, prägnante Antworten (50-100 Wörter pro Frage)
- Schema-Markup-ready (für FAQ Schema in Phase 5)
- Long-tail Keywords natürlich integriert

**Frage-Auswahl-Kriterien**:
- Nutze `paa_integration` Array aus `serp-analysis.json` als primäre Quelle
- High-Priority PAA-Fragen zuerst
- Fragen die NICHT in Hauptsektionen beantwortet wurden
- Mix aus verschiedenen Kategorien (Kosten, Gesundheit, Rechtliches)

### 5. Zusammenfassung/Fazit (~7% des target_word_count)

**Word Count Berechnung**:
- Beispiel bei 2365 target: 2365 × 0.07 = ~165 Wörter
- Beispiel bei 3000 target: 3000 × 0.07 = ~210 Wörter

**Struktur**:
- **Key Takeaways** (3-5 Bullet Points): Wichtigste Learnings
- **Call-to-Action**: Nächste Schritte für den Leser
- **Primary Keyword**: Nochmal natürlich erwähnt

## OUTPUT FORMAT (JSON):

{
  "article_metadata": {
    "title": "Pferd kaufen: Worauf achten? Der ultimative Kaufratgeber 2025",
    "meta_description": "Pferd kaufen leicht gemacht: Gesundheitscheck, Kaufvertrag, Kosten. Experten-Tipps für sicheren Pferdekauf.",
    "primary_keyword": "pferd kaufen worauf achten",
    "secondary_keywords": ["gesundes pferd kaufen", "pferdekauf beratung", "pferd kaufen tipps"],
    "word_count_data": {
      "avg_word_count": 2150,
      "target_word_count": 2365,
      "word_count_range_min": 1828,
      "word_count_range_max": 2795,
      "word_count_strategy": "serp_competitive",
      "word_count_fallback": 2500,
      "word_count_distribution": {
        "introduction": {"percentage": 0.07, "calculated_words": 165},
        "main_sections": {"percentage": 0.72, "calculated_words": 1703},
        "faq": {"percentage": 0.10, "calculated_words": 237},
        "conclusion": {"percentage": 0.07, "calculated_words": 165}
      }
    }
  },
  "introduction": {
    "word_count": 180,
    "hook": "Ein Pferd zu kaufen ist eine der emotionalsten Entscheidungen im Leben eines Reiters – aber auch eine der größten finanziellen Verantwortungen.",
    "user_intent": "Orientierung und Sicherheit beim Pferdekauf",
    "preview": "In diesem Ratgeber erfährst du alle wichtigen Aspekte: Gesundheitscheck, rechtliche Absicherung, Kostenplanung.",
    "keyword_integration": ["pferd kaufen worauf achten", "pferdekauf"]
  },
  "main_sections": [
    {
      "section_number": 1,
      "heading": "H2: Was sollte beim Gesundheitscheck beachtet werden?",
      "content_type": "tutorial",
      "word_count": 450,
      "subsections": [
        {
          "heading": "H3: Ankaufsuntersuchung: Welche Stufen gibt es?",
          "word_count": 200,
          "keywords": ["ankaufsuntersuchung pferd", "gesundheitscheck"],
          "content_focus": "Erklärung der 5 Untersuchungsstufen mit Empfehlungen"
        },
        {
          "heading": "H3: Röntgenbilder richtig interpretieren",
          "word_count": 150,
          "keywords": ["röntgen pferd", "gesundheitsprüfung"],
          "content_focus": "Was bedeuten häufige Befunde?"
        },
        {
          "heading": "H3: Kosten der Ankaufsuntersuchung",
          "word_count": 100,
          "keywords": ["ankaufsuntersuchung kosten"],
          "content_focus": "Preisspanne je nach Umfang"
        }
      ],
      "keyword_integration": {
        "primary": ["pferd kaufen worauf achten"],
        "supporting": ["gesundes pferd kaufen", "pferdekauf gesundheit"]
      },
      "eeat_signals": [
        {
          "type": "expertise",
          "content": "Tierärzte empfehlen mindestens Stufe 2 für Freizeitpferde"
        },
        {
          "type": "data",
          "content": "Studien zeigen: 80% der Kaufreue entsteht durch mangelnde Gesundheitsprüfung"
        }
      ],
      "visual_elements": [
        {
          "type": "table",
          "description": "Vergleichstabelle: Ankaufsuntersuchung Stufen 1-5"
        }
      ]
    },
    {
      "section_number": 2,
      "heading": "H2: Kaufvertrag und rechtliche Absicherung",
      "content_type": "checklist",
      "word_count": 400,
      "subsections": [
        {
          "heading": "H3: Pflichtangaben im Pferdekaufvertrag",
          "word_count": 180,
          "keywords": ["pferdekaufvertrag", "kaufvertrag pferd"],
          "content_focus": "Checkliste der rechtlich notwendigen Angaben"
        },
        {
          "heading": "H3: Gewährleistung und Garantie beim Pferdekauf",
          "word_count": 120,
          "keywords": ["gewährleistung pferdekauf"],
          "content_focus": "Unterschied zwischen gewerblichem und privatem Verkauf"
        },
        {
          "heading": "H3: Häufige Fehler im Kaufvertrag vermeiden",
          "word_count": 100,
          "keywords": ["fehler pferdekauf"],
          "content_focus": "Top 5 Vertragsfallen"
        }
      ],
      "keyword_integration": {
        "primary": [],
        "supporting": ["rechtliche absicherung pferdekauf", "kaufvertrag"]
      },
      "eeat_signals": [
        {
          "type": "experience",
          "content": "Aus meiner 10-jährigen Beratungspraxis: Diese Vertragsklauseln werden oft vergessen"
        }
      ],
      "visual_elements": [
        {
          "type": "checklist",
          "description": "Downloadbare Checkliste: Kaufvertrag-Pflichtangaben"
        }
      ]
    }
  ],
  "faq_section": {
    "word_count": 250,
    "questions": [
      {
        "question": "Was kostet ein gesundes Pferd?",
        "answer_outline": "Preisspanne je nach Rasse, Ausbildung, Alter. Durchschnitt 5000-15000€. Zusatzkosten nicht vergessen.",
        "word_count": 80,
        "paa_source": true,
        "keywords": ["pferd kosten", "gesundes pferd kaufen"]
      },
      {
        "question": "Welche Dokumente brauche ich beim Pferdekauf?",
        "answer_outline": "Equidenpass, Kaufvertrag, Ankaufsuntersuchung, Impfpass, ggf. Abstammungsnachweis.",
        "word_count": 60,
        "paa_source": true,
        "keywords": ["dokumente pferdekauf"]
      },
      {
        "question": "Kann ich ein Pferd ohne Ankaufsuntersuchung kaufen?",
        "answer_outline": "Rechtlich ja, aber stark abgeraten. Risiko von versteckten Mängeln sehr hoch.",
        "word_count": 50,
        "paa_source": true,
        "keywords": ["ankaufsuntersuchung pflicht"]
      },
      {
        "question": "Was ist besser: Pferd vom Züchter oder Privatverkauf?",
        "answer_outline": "Züchter: Mehr Gewährleistung, höhere Preise. Privat: Günstiger, aber weniger rechtliche Absicherung.",
        "word_count": 70,
        "paa_source": false,
        "keywords": ["pferd züchter oder privat"]
      },
      {
        "question": "Wie erkenne ich ein gesundes Pferd beim ersten Besichtigungstermin?",
        "answer_outline": "Aufmerksames Verhalten, klare Augen, glänzendes Fell, gleichmäßiger Gang. Aber: Nur Tierarzt kann Gesundheit bestätigen.",
        "word_count": 60,
        "paa_source": true,
        "keywords": ["gesundes pferd erkennen"]
      }
    ]
  },
  "conclusion": {
    "word_count": 180,
    "key_takeaways": [
      "Ankaufsuntersuchung ist Pflicht für sicheren Pferdekauf",
      "Rechtlich abgesicherter Kaufvertrag schützt beide Parteien",
      "Kosten realistisch kalkulieren: Kaufpreis ist nur der Anfang",
      "Zeit nehmen: Mehrere Besichtigungen vor Kaufentscheidung"
    ],
    "call_to_action": "Nutze unsere kostenlose Pferdewert-Schätzung um den fairen Marktwert deines Wunschpferdes zu ermitteln.",
    "keyword_integration": ["pferd kaufen worauf achten"]
  },
  "internal_linking_opportunities": [
    {
      "section": "Gesundheitscheck",
      "target_page": "/ratgeber/pferdekrankheiten",
      "anchor_text": "häufige Pferdekrankheiten"
    },
    {
      "section": "Kosten",
      "target_page": "/pferdewert-schaetzung",
      "anchor_text": "Pferdewert kostenlos schätzen"
    },
    {
      "section": "Ankaufsuntersuchung",
      "target_page": "/ratgeber/ankaufsuntersuchung-pferd",
      "anchor_text": "Ablauf und Kosten der Ankaufsuntersuchung"
    },
    {
      "section": "Rasse-Auswahl",
      "target_page": "/ratgeber/pferderassen-anfaenger",
      "anchor_text": "geeignete Pferderassen für Anfänger"
    },
    {
      "section": "FAQ",
      "target_page": "/ratgeber/pferdehaltung-kosten",
      "anchor_text": "monatliche Pferdehaltungskosten"
    }
  ]
}

**KRITISCH**:
- Outline muss direkt umsetzbar sein für Phase 4 (Content Writing)
- Jede Sektion braucht klare Anweisungen: Was schreiben? Welche Keywords? Welche E-E-A-T Signale?
- Verwende NUR Daten aus Phase 1 und Phase 2, keine neuen Annahmen!
- Wenn Phase 2 Content-Gaps identifiziert hat → diese MÜSSEN in Outline integriert sein
- PAA-Fragen aus Phase 2 → min 50% davon in FAQ-Sektion verwenden
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 3

Prüfe ob Sub-Agent vollständigen Outline geliefert hat:

✅ **5-8 Hauptsektionen definiert**
✅ **Primary Keyword in min 3 H2-Headings integriert**
✅ **Target Word Count im SERP-competitive Range**:
   - **Warning**: < `word_count_range_min` (avg_word_count × 0.85)
   - **Failure**: < (`word_count_range_min` × 0.90) OR > `word_count_range_max`
   - **Target Range**: `word_count_range_min` - `word_count_range_max` (aus serp-analysis.json)
   - **Fallback**: 2000-3500 wenn word_count_strategy = "fallback"
✅ **Min 5 FAQ-Fragen (davon min 3 aus PAA)**
✅ **Jede Sektion hat Content-Type, Keywords, E-E-A-T Signale**
✅ **Min 5 Internal Linking Opportunities identifiziert** (optimal 5-8)
❌ **Wenn < 5 Sektionen** → Retry mit mehr Detail-Anforderungen

**Partial Success**: Wenn E-E-A-T Signale fehlen → proceed mit generic placeholders für Phase 4.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/planning/`:

### 1. `content-outline.json`
```json
{
  "phase": "3",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T15:00:00Z",
  "based_on": {
    "phase_1_data": "keyword-analysis.json",
    "phase_2_data": "serp-analysis.json"
  },
  "article_metadata": {...},
  "introduction": {...},
  "main_sections": [...],
  "faq_section": {...},
  "conclusion": {...},
  "internal_linking_opportunities": [...]
}
```

### 2. `content-structure.md` (Optional)
Human-readable Markdown-Version des Outlines für Review.

---

## Troubleshooting

### Problem: Outline zu generisch (keine spezifischen Anweisungen)
**Lösung**:
- Prüfe ob Phase 1+2 Output korrekt übergeben wurde
- Stelle sicher dass `content_type`, `keywords`, `eeat_signals` für JEDE Sektion definiert sind
- Retry mit expliziterem Beispiel-Output

### Problem: Zu viele Sektionen (> 8)
**Lösung**:
- Fasse ähnliche Themen zusammen
- Verschiebe Detail-Aspekte in Subsektionen (H3)
- Fokus auf Must-Have Topics aus Phase 2

### Problem: FAQ-Sektion fehlt oder zu kurz
**Lösung**:
- Prüfe ob PAA-Daten aus Phase 2 korrekt übergeben wurden
- Min 5 Fragen sind Pflicht für SEO-Optimierung
- Nutze `paa_integration` Array aus Phase 2

### Problem: Primary Keyword nicht ausreichend in Headings
**Lösung**:
- Min 3 H2-Headings sollten primary oder close variant enthalten
- Aber: Keyword-Stuffing vermeiden → natürliche Fragenformulierung
- Nutze Variationen: "Pferd kaufen", "Pferdekauf", "Beim Pferdekauf"

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 3:
→ **Phase 4: Content Writing** (`phase-4-content.md`)

Verwende `content-outline.json` als Blueprint für Phase 4 Content-Generierung.

---

**Phase 3 Checklist**:
- [ ] Sub-Agent Delegation mit Phase 1+2 Daten
- [ ] Quality Gate: Min 5 Hauptsektionen definiert
- [ ] Quality Gate: Min 5 FAQ-Fragen aus PAA
- [ ] Quality Gate: Jede Sektion hat detaillierte Anweisungen
- [ ] Output Files gespeichert in `planning/` Ordner
- [ ] Ready für Phase 4: Vollständiger, umsetzbarer Outline erstellt
