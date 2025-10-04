# Phase 3: Content Outline

**Token Budget**: ~400 Tokens
**Main Deliverables**: `content-outline.json`, H2/H3 Structure, Word Count Distribution
**Agent Pattern**: Sub-Agent only (seo-content-writer)

---

## Phase 3A: Outline Generation (Sub-Agent)

**WICHTIG**: Diese Phase wird komplett vom Sub-Agent ausgeführt. Main-Agent delegiert nur.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Create comprehensive content outline</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Erstelle einen detaillierten Content-Outline basierend auf den Keyword- und SERP-Analysen.

## INPUT-DATEN (JSON):
{
  "keyword_analysis": {...},  // Von Phase 1B
  "serp_analysis": {...},     // Von Phase 2B
  "primary_keyword": "pferd kaufen worauf achten",
  "supporting_keywords": [...],
  "content_gaps": {...},
  "paa_integration": [...],
  "format_recommendations": {...}
}

## AUFGABE:

### 1. H1 Title Creation

**SEO-optimierter Title**:
- Primary Keyword MUSS im Title vorkommen (idealerweise am Anfang)
- Max 60 Zeichen für SERP Display
- Emotional Hook oder Benefit (z.B. "Pferd kaufen: Worauf achten? [2025 Checkliste]")
- Zahlen/Listen wenn passend ("7 Tipps...", "Der ultimative Guide...")

**Title-Formate**:
- How-To: "Pferd kaufen: So findest du das perfekte Pferd [2025]"
- Checkliste: "Pferdekauf-Checkliste: Darauf musst du achten"
- Guide: "Der komplette Pferdekauf-Guide für Einsteiger"
- Vergleich: "Pferd kaufen vs. Leasen: Was ist besser?"

### 2. H2/H3 Hierarchie

**H2-Struktur-Pattern** (6-8 Haupt-Sektionen):

1. **Einleitung** (150-200 Wörter)
   - Hook: Emotionaler Einstieg oder überraschende Statistik
   - Problem-Statement: Warum ist das Thema wichtig?
   - Artikel-Overview: Was erfährt der Leser?

2. **Must-Have Topics** (aus SERP-Analyse)
   - Jedes Must-Have Topic bekommt eigene H2
   - Diese Topics sind PFLICHT für #1 Ranking
   - H3s für Sub-Aspekte

3. **PAA-Fragen-Integration** (3-5 H2s)
   - High-Priority PAA-Fragen als H2
   - Medium-Priority PAA-Fragen als H3 unter thematisch passendem H2
   - Format: "Was kostet ein gesundes Pferd?" (direkte Frage-Formulierung)

4. **Differenzierungs-Themen** (aus Content-Gaps)
   - Completely Missing Topics als eigene H2s
   - Hier kannst du unique angles bringen
   - Differentiation Opportunities als H3s

5. **Praktische Sektion** (Checkliste/Tutorial)
   - Step-by-Step Anleitung ODER
   - Download-Checkliste ODER
   - Interaktives Tool

6. **FAQ-Sektion** (H2: "Häufig gestellte Fragen")
   - 5-8 Low-Priority PAA-Fragen als H3
   - Kurze, prägnante Antworten (50-100 Wörter)
   - Featured Snippet Optimierung

7. **Zusammenfassung/Fazit** (100-150 Wörter)
   - Key Takeaways (3-5 Bullet Points)
   - Call-to-Action (z.B. Link zu PferdeWert Bewertung)

**H3-Platzierungs-Regeln**:
- Jede H2 sollte 2-4 H3s haben
- H3s für Sub-Themen, Beispiele, spezifische Aspekte
- PAA Medium-Priority Fragen als H3s platzieren

### 3. Word Count Distribution

**Total Target**: 2000-2500 Wörter (aus SERP-Analyse format_recommendations)

**Wort-Verteilung pro Sektion**:
- Einleitung: 150-200 (8%)
- Haupt-Sektionen: 1600-1900 (75%) → verteilt auf 5-6 H2s = ~300 Wörter pro H2
- FAQ: 200-300 (10%)
- Fazit: 100-150 (7%)

**Sektion-Längen basierend auf Priorität**:
- Must-Have Topics: 350-450 Wörter (mehr Detail)
- Differentiation Topics: 250-350 Wörter (medium Detail)
- PAA-Integration: 150-250 Wörter (kurz & prägnant)

### 4. Content-Format-Elemente

**Visuelle Elemente** (aus SERP format_recommendations):
- Wenn "comparison_table" → Sektion mit Vergleichstabelle
- Wenn "checklist" → Download-Checkliste oder Bullet-List
- Wenn "step_by_step_guide" → Numbered List mit Schritt-für-Schritt
- Wenn "infographic" → Platzhalter für Bild/Infografik

**Featured Snippet Target**:
- Wenn target = "list" → Haupt-Sektion als Numbered/Bulleted List strukturieren
- Wenn target = "paragraph" → Prägnante 40-60 Wort Definition am Anfang
- Wenn target = "table" → Vergleichstabelle prominent platzieren

### 5. E-E-A-T Signal Placement

**Wo E-E-A-T Signale integrieren**:
- **Experience**: Personal Case Study in Haupt-Sektion (300-400 Wörter)
- **Expertise**: Experten-Zitat in 2-3 Sektionen
- **Authoritativeness**: Externe Quellen-Referenzen (2-3 Links)
- **Trustworthiness**: Daten/Statistiken in Einleitung + Haupt-Sektion

**Placement Notes**:
- Case Studies in Sektionen mit hoher Relevanz (Must-Have Topics)
- Expert Quotes direkt nach Haupt-Claims
- External References am Ende von Sektionen als "Quelle: [Link]"

## OUTPUT FORMAT (JSON):
{
  "h1_title": "Pferd kaufen: Worauf achten? [2025 Experten-Guide]",
  "meta_description": "Pferd kaufen worauf achten? ✓ Gesundheitscheck ✓ Rechtliches ✓ Kosten-Übersicht. Experten-Checkliste für sicheren Pferdekauf 2025.",
  "target_word_count": 2400,
  "structure": [
    {
      "section": "h2",
      "title": "Warum der richtige Pferdekauf entscheidend ist",
      "word_count": 180,
      "subsections": [],
      "content_notes": "Hook: Statistik über Fehlkäufe. Problem-Statement. Artikel-Overview.",
      "eeat_signals": []
    },
    {
      "section": "h2",
      "title": "Gesundheitscheck beim Pferdekauf",
      "word_count": 400,
      "subsections": [
        {
          "section": "h3",
          "title": "Ankaufsuntersuchung: Was wird geprüft?",
          "word_count": 150
        },
        {
          "section": "h3",
          "title": "Röntgenbilder richtig interpretieren",
          "word_count": 150
        },
        {
          "section": "h3",
          "title": "Typische Gesundheits-Warnsignale",
          "word_count": 100
        }
      ],
      "content_notes": "Must-Have Topic aus SERP-Analyse. Step-by-step Checkliste.",
      "eeat_signals": ["expert_quote_veterinarian", "external_reference_veterinary_guidelines"]
    },
    {
      "section": "h2",
      "title": "Was kostet ein gesundes Pferd?",
      "word_count": 300,
      "subsections": [
        {
          "section": "h3",
          "title": "Kaufpreis nach Rasse und Ausbildung",
          "word_count": 120
        },
        {
          "section": "h3",
          "title": "Versteckte Kosten beim Pferdekauf",
          "word_count": 120
        },
        {
          "section": "h3",
          "title": "Pferdekauf-Budget richtig kalkulieren",
          "word_count": 60
        }
      ],
      "content_notes": "PAA High-Priority Question. Comparison Table: Rassen vs. Preise.",
      "eeat_signals": ["data_market_statistics"]
    },
    {
      "section": "h2",
      "title": "Rechtliche Aspekte beim Pferdekauf",
      "word_count": 350,
      "subsections": [
        {
          "section": "h3",
          "title": "Kaufvertrag: Das muss drinstehen",
          "word_count": 150
        },
        {
          "section": "h3",
          "title": "Gewährleistung und Rücktrittsrecht",
          "word_count": 120
        },
        {
          "section": "h3",
          "title": "Equidenpass und Eigentumsurkunde",
          "word_count": 80
        }
      ],
      "content_notes": "Must-Have Topic. Checkliste: Dokumente beim Pferdekauf.",
      "eeat_signals": ["external_reference_legal_guidelines"]
    },
    {
      "section": "h2",
      "title": "Pferdekauf ohne Anzahlung: Geht das?",
      "word_count": 220,
      "subsections": [],
      "content_notes": "Completely Missing Topic (Content-Gap). Differentiation Opportunity.",
      "eeat_signals": ["case_study_payment_options"]
    },
    {
      "section": "h2",
      "title": "Checkliste: Pferdekauf Schritt für Schritt",
      "word_count": 300,
      "subsections": [
        {
          "section": "h3",
          "title": "Vor dem Besichtigungstermin",
          "word_count": 100
        },
        {
          "section": "h3",
          "title": "Beim Probereiten",
          "word_count": 100
        },
        {
          "section": "h3",
          "title": "Nach der Ankaufsuntersuchung",
          "word_count": 100
        }
      ],
      "content_notes": "Praktische Sektion. Numbered List für Featured Snippet.",
      "eeat_signals": ["personal_experience_case_study"]
    },
    {
      "section": "h2",
      "title": "Häufig gestellte Fragen zum Pferdekauf",
      "word_count": 250,
      "subsections": [
        {
          "section": "h3",
          "title": "Welche Dokumente brauche ich beim Pferdekauf?",
          "word_count": 50
        },
        {
          "section": "h3",
          "title": "Kann ich ein Pferd zurückgeben?",
          "word_count": 50
        },
        {
          "section": "h3",
          "title": "Wie lange dauert eine Ankaufsuntersuchung?",
          "word_count": 40
        },
        {
          "section": "h3",
          "title": "Was ist der Unterschied zwischen Probereiten und Ankauf?",
          "word_count": 50
        },
        {
          "section": "h3",
          "title": "Brauche ich eine Versicherung ab Kaufdatum?",
          "word_count": 60
        }
      ],
      "content_notes": "FAQ-Sektion. Medium/Low-Priority PAA-Fragen. Kurze Antworten.",
      "eeat_signals": []
    },
    {
      "section": "h2",
      "title": "Fazit: So findest du dein Traumpferd",
      "word_count": 120,
      "subsections": [],
      "content_notes": "Key Takeaways (3-5 Punkte). CTA zu PferdeWert Bewertung.",
      "eeat_signals": []
    }
  ],
  "visual_elements": [
    {
      "type": "comparison_table",
      "placement": "Section: Was kostet ein gesundes Pferd?",
      "content": "Rassen vs. Preisspanne vs. Ausbildungsstand"
    },
    {
      "type": "checklist",
      "placement": "Section: Checkliste Schritt für Schritt",
      "content": "Download-PDF: Pferdekauf-Checkliste"
    }
  ],
  "internal_linking_opportunities": [
    {
      "section": "Fazit",
      "link_text": "Lass dein Pferd von Experten bewerten",
      "target": "/bewertung",
      "context": "CTA nach Key Takeaways"
    },
    {
      "section": "Was kostet ein gesundes Pferd?",
      "link_text": "Pferdewert kostenlos ermitteln",
      "target": "/",
      "context": "Nach Preis-Tabelle"
    }
  ],
  "featured_snippet_target": {
    "section": "Checkliste: Pferdekauf Schritt für Schritt",
    "format": "numbered_list",
    "optimization": "8-10 konkrete Steps als Numbered List"
  }
}

**WICHTIG**:
- Jede H2 muss thematisch aus Keyword-/SERP-Analyse stammen
- Word Counts sind Richtwerte (±50 Wörter Toleranz)
- E-E-A-T Signals konkret benennen wo sie platziert werden
- Visual Elements nur wenn aus SERP format_recommendations
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 3

Prüfe ob Sub-Agent vollständigen Outline geliefert hat:

✅ **H1 Title definiert (max 60 Zeichen)**
✅ **Min 6 H2-Sektionen erstellt**
✅ **Min 15 H3-Subsektionen insgesamt**
✅ **Target Word Count in Range 2000-2500**
✅ **Word Count Distribution addiert zu Total Target (±100 Toleranz)**
✅ **Min 3 E-E-A-T Signal Placements definiert**
✅ **Featured Snippet Target-Sektion definiert**
❌ **Wenn < 6 H2s** → Retry mit tieferer Struktur

**Partial Success**: Wenn nur 2 E-E-A-T Signals → proceed mit Warning.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/planning/`:

### 1. `content-outline.json`
```json
{
  "phase": "3",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T15:00:00Z",
  "h1_title": "...",
  "meta_description": "...",
  "target_word_count": 2400,
  "structure": [...],
  "visual_elements": [...],
  "internal_linking_opportunities": [...],
  "featured_snippet_target": {...}
}
```

---

## Troubleshooting

### Problem: Zu viele H2s (> 10)
**Lösung**:
- Konsolidiere ähnliche Topics unter einer H2
- Verschiebe weniger wichtige Topics als H3s
- Fokus auf Must-Have + High-Priority PAA

### Problem: Word Count addiert nicht zu Target
**Lösung**:
- Prüfe ob alle Subsections gezählt wurden
- Adjust Haupt-Sektionen proportional
- Einleitung/Fazit sind oft zu kurz kalkuliert

### Problem: Keine E-E-A-T Signal Placements
**Lösung**:
- Prüfe ob eeat_signals aus Phase 2 übergeben wurde
- Min 1 Case Study + 1 Expert Quote sind PFLICHT
- Default zu generic placements wenn Daten fehlen

### Problem: Featured Snippet Target unklar
**Lösung**:
- Wenn keine SERP-Daten → Default zu "list" Format
- Checklisten/How-To Artikel → "numbered_list"
- Definitionen/Erklärungen → "paragraph"

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 3:
→ **Phase 4: Content Creation** (`phase-4-content.md`)

Verwende `content-outline.json` als Struktur-Vorlage für Content-Writing.

---

**Phase 3 Checklist**:
- [ ] Sub-Agent Delegation für Outline-Erstellung
- [ ] Quality Gate: Min 6 H2s + 15 H3s
- [ ] Word Count Distribution validiert
- [ ] E-E-A-T Signal Placements definiert
- [ ] Featured Snippet Target-Sektion identifiziert
- [ ] Output File gespeichert in `planning/` Ordner
- [ ] Ready für Phase 4: H2/H3-Struktur steht
