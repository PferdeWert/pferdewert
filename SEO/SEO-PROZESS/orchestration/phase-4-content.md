# Phase 4: Content Creation

**Token Budget**: ~700 Tokens
**Main Deliverables**: `article-draft.md`, E-E-A-T Integration, Fact-Checked Content
**Agent Pattern**: Sub-Agent (content writing) + Optional Main-Agent (fact-checking)

---

## Phase 4A: Content Writing Preparation (Optional Main-Agent)

**WICHTIG**: Main-Agent ist nur für Fact-Checking notwendig, falls externe Daten benötigt werden.

### Optional Step: Fact-Checking via Firecrawl

Falls der Content externe Fakten/Statistiken benötigt (z.B. Marktdaten, wissenschaftliche Studien, Gesetzestexte):

```xml
<function_calls>
<invoke name="mcp__firecrawl__firecrawl_scrape">
<parameter name="url">https://example-veterinary-source.com/horse-health-guidelines</parameter>
<parameter name="formats">["markdown"]</parameter>
<parameter name="onlyMainContent">true</parameter>
</invoke>
</function_calls>
```

**Verwende Firecrawl nur wenn**:
- Externe Daten-Quellen für E-E-A-T nötig (Studien, Statistiken)
- Aktuelle Gesetzestexte/Regulierungen zitiert werden müssen
- Expertenzitate von bekannten Branchenquellen

**Skip diesen Step wenn**:
- Content basiert auf allgemeinem Fachwissen
- Keine spezifischen externen Referenzen nötig

---

## Phase 4B: Content-Erstellung (Sub-Agent)

**WICHTIG**: Sub-Agent erstellt vollständigen Artikel basierend auf Phase 3 Outline.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Write SEO-optimized article from outline</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Schreibe einen vollständigen SEO-optimierten Artikel basierend auf dem Content-Outline aus Phase 3.

## INPUT-DATEN:

### Aus Phase 3 (content-outline.json):
{
  "article_metadata": {
    "title": "...",
    "meta_description": "...",
    "primary_keyword": "...",
    "secondary_keywords": [...],
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
  "introduction": {...},
  "main_sections": [...],
  "faq_section": {...},
  "conclusion": {...},
  "internal_linking_opportunities": [...]
}

### Aus Phase 2 (serp-analysis.json):
{
  "eeat_signals": {
    "required_credentials": "equestrian_professional",
    "case_studies_needed": 2,
    "external_references": 3,
    "expert_quotes": true
  },
  "content_gaps": {
    "must_have_topics": [...],
    "differentiation_opportunities": [...]
  }
}

### Optional: Fact-Checking Daten (falls Phase 4A ausgeführt):
{
  "external_sources": [...],
  "verified_data_points": [...]
}

## AUFGABE:

Schreibe einen vollständigen Ratgeber-Artikel für PferdeWert.de mit folgenden Anforderungen:

### 1. Brand Language & Tone of Voice

**Lies zuerst**: `SEO/pferdewert-brand-language.md` für exakte Tonalität-Vorgaben.

**Kernprinzipien**:
- **Du-Ansprache**: Direkt und persönlich
- **Warmherzig aber professionell**: Fachkompetenz ohne Fachjargon
- **Praktisch orientiert**: Konkrete Handlungsempfehlungen statt theoretischer Erklärungen
- **Emotionale Verbindung**: Pferdeliebe und Verantwortungsbewusstsein ansprechen

**Verbotene Formulierungen**:
- ❌ "Wir empfehlen..." → ✅ "Du solltest darauf achten..."
- ❌ "Es ist wichtig zu beachten..." → ✅ "Achte besonders darauf..."
- ❌ "Man sollte..." → ✅ "Du kannst... / Du solltest..."

### 2. Artikel-Struktur (Exakt nach Outline)

#### Einleitung (150-200 Wörter)
- **Hook**: Stelle eine relevante Frage oder beschreibe ein häufiges Problem
- **Primary Keyword**: Natürlich in den ersten 100 Wörtern integriert
- **User Intent**: Klar kommunizieren was der Leser lernen wird
- **Emotional Connection**: Pferdeliebe und Verantwortung ansprechen

Beispiel-Hook:
> "Du träumst schon lange von einem eigenen Pferd, aber beim Gedanken an den Kauf fühlst du dich unsicher? Keine Sorge – mit der richtigen Vorbereitung wird der Pferdekauf zu einem aufregenden Erlebnis statt einer Stressprobe."

#### Hauptsektionen (5-8 Sektionen)

Für **jede Sektion aus dem Outline** (main_sections array):

**Heading**: Verwende exakt den H2/H3 aus dem Outline
**Wortanzahl**: Halte dich an die target word_count pro Sektion (±10%)
**Content-Type umsetzen**:
- `explanation`: Erkläre Konzepte mit Beispielen
- `tutorial`: Schritt-für-Schritt-Anleitungen mit nummerierten Listen
- `comparison`: Vor-/Nachteile-Tabellen oder Vergleiche
- `checklist`: Bullet-Point-Listen zum Abhaken
- `case_study`: Echte oder realistische Praxis-Beispiele

**Keyword-Integration**:
- Primary Keyword: 2-3 Mal pro Sektion (natürlich eingebunden)
- Supporting Keywords: 1-2 Mal pro Sektion
- **KRITISCH**: Keine Keyword-Stuffing! Nur natürliche Verwendung.

**E-E-A-T Signal-Integration**:
Je nach `eeat_signals` aus Outline:
- `personal_experience`: "In meiner 15-jährigen Erfahrung als Pferdetrainerin habe ich gesehen..."
- `expert_quote`: "Dr. Sarah Müller, Tierärztin und Expertin für Pferdekauf, empfiehlt..."
- `data_reference`: "Laut einer Studie des Deutschen Reitsportverbands 2024..."
- `case_study`: "Ein Beispiel aus der Praxis: Anna kaufte 2023 ihr erstes Pferd und..."
- `credentials`: "Als zertifizierte Reitlehrerin mit FN-Trainerlizenz kann ich dir versichern..."

**Visual Elements umsetzen**:
Falls `visual_elements` im Outline enthält:
- `comparison_table`: Erstelle Markdown-Tabelle
- `checklist`: Erstelle Bullet-Point-Liste mit Checkboxen
- `step_by_step`: Erstelle nummerierte Liste mit klaren Schritten
- `pros_cons`: Erstelle Pro/Contra-Auflistung

Beispiel Markdown-Tabelle:
```markdown
| Kriterium | Worauf achten? | Warnsignale |
|-----------|----------------|-------------|
| Augen | Klar und wach | Tränen, Ausfluss |
| Fell | Glänzend | Stumpf, Parasitenbefall |
```

#### FAQ-Sektion (200-300 Wörter)

Verwende `faq_section` aus Outline und beantworte jede Frage:

**Format**:
```markdown
## Häufig gestellte Fragen zum Pferdekauf

### Was kostet ein gesundes Pferd?

Die Kosten variieren stark je nach Rasse, Ausbildungsstand und Alter...
```

**Antwort-Länge**: 50-100 Wörter pro Frage
**Keyword-Integration**: PAA-basierte Fragen enthalten natürlich relevante Keywords
**Stil**: Direkte Antworten, keine Umschweife

#### Zusammenfassung/Fazit (150-200 Wörter)

- **Key Takeaways**: 3-5 wichtigste Punkte als Bullet-List
- **Call-to-Action**: Verwende PferdeWert.de-Dienste (falls commercial intent)
- **Ermutigung**: Positive, motivierende Abschluss-Botschaft

Beispiel CTA:
> "Du bist bereit für den Pferdekauf, aber möchtest vorher wissen, was dein Traumpferd wert ist? Mit der AI-gestützten Pferdebewertung von PferdeWert.de erhältst du eine präzise Einschätzung des Marktwerts – damit du beim Kauf auf der sicheren Seite bist."

### 3. Interne Verlinkung

Verwende `internal_linking_opportunities` aus Outline:

**Format**: Kontextuelle Links im Fließtext
```markdown
Wenn du mehr über [Pferdehaltung und laufende Kosten](/ratgeber/pferdehaltung-kosten) erfahren möchtest, lies unseren detaillierten Guide.
```

**Regeln**:
- Min 3 interne Links pro Artikel
- Nur Links zu tatsächlich existierenden Ratgeber-Seiten
- Anchor-Text natürlich (kein "Klicke hier")
- Relevanter Kontext (nicht forciert)

### 4. Keyword-Dichte-Management

**Target Keyword Density**:
- Primary Keyword: 0.8-1.2% des Gesamt-Contents
- Supporting Keywords: 0.3-0.6% des Gesamt-Contents

**Berechnung**:
- Bei 2500 Wörtern: Primary Keyword = 20-30 Mal erwähnen
- Supporting Keywords: 8-15 Mal pro Keyword

**KRITISCH**: Natürliche Integration! Lieber 0.7% natürlich als 1.2% forciert.

### 5. Content-Qualität

**Must-Have Eigenschaften**:
- ✅ **Actionable**: Jede Sektion gibt konkrete Handlungsempfehlungen
- ✅ **Comprehensive**: Alle Must-Have Topics aus Phase 2 abgedeckt
- ✅ **Unique Angles**: Differenzierungs-Chancen aus Phase 2 genutzt
- ✅ **Well-Structured**: Klare H2/H3-Hierarchie, gute Lesbarkeit
- ✅ **E-E-A-T Signals**: Min 3 Expertise-Signale pro Artikel
- ✅ **Fehlerfreiheit**: Korrekte Grammatik, Rechtschreibung, Interpunktion

**Vermeide**:
- ❌ Generische Aussagen ohne praktischen Nutzen
- ❌ Zu komplexer Fachjargon ohne Erklärung
- ❌ Lange Schachtelsätze (max 20 Wörter pro Satz)
- ❌ Passive Formulierungen ("Es wird empfohlen..." → "Achte darauf...")
- ❌ Keyword-Stuffing

## OUTPUT FORMAT (Markdown):

Erstelle eine vollständige Markdown-Datei mit:

```markdown
# {Article Title aus Outline}

*Letzte Aktualisierung: {Aktuelles Datum}*

## Einleitung

{150-200 Wörter Einleitungstext mit Hook, Primary Keyword, Intent-Statement}

## {H2 Sektion 1 Heading}

{Content für Sektion 1...}

### {H3 Subsektion 1.1 Heading}

{Content...}

### {H3 Subsektion 1.2 Heading}

{Content...}

## {H2 Sektion 2 Heading}

{Content für Sektion 2...}

...

## Häufig gestellte Fragen zum {Topic}

### {FAQ Frage 1}

{Antwort 1...}

### {FAQ Frage 2}

{Antwort 2...}

...

## Fazit: {Catchy Conclusion Title}

**Das Wichtigste in Kürze:**
- {Key Takeaway 1}
- {Key Takeaway 2}
- {Key Takeaway 3}

{Abschluss-Paragraph mit CTA...}

---

*Artikel-Statistiken*:
- Wortanzahl: {Actual Word Count}
- Lesedauer: {Geschätzte Minuten}
- Primary Keyword Density: {Calculated %}
```

**KRITISCH**:
- Verwende NUR die Daten aus Phase 3 Outline für Struktur
- Integriere E-E-A-T Signale aus Phase 2 wo definiert
- Halte dich an PferdeWert.de Brand Language (lies Brand-Language-Datei!)
- Markdown-Formatierung sauber (keine HTML-Tags)
- Alle Fakten müssen korrekt sein (nutze Fact-Checking-Daten falls vorhanden)
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 4B

Prüfe ob Sub-Agent vollständigen Artikel geliefert hat:

✅ **Target Word Count im SERP-competitive Range**:
   - **Warning**: < `word_count_range_min` (aus word_count_data in content-outline.json)
   - **Failure**: < (`word_count_range_min` × 0.90) OR > `word_count_range_max`
   - **Target Range**: `word_count_range_min` - `word_count_range_max`
   - **Fallback**: 2000-3500 wenn word_count_strategy = "fallback"
✅ **Alle Hauptsektionen aus Outline umgesetzt** (5-8 Sektionen)
✅ **Primary Keyword Density 0.8-1.2%**
✅ **Min 3 E-E-A-T Signale integriert** (Expertise, Erfahrung, References)
✅ **Min 3 interne Links eingebaut**
✅ **FAQ mit min 5 PAA-basierten Fragen**
✅ **Brand Language konsistent** (Du-Ansprache, warmherzig, praktisch)
✅ **Markdown-Formatierung sauber** (korrekte Heading-Hierarchie)
❌ **Wenn < 2000 Wörter** → Retry mit expliziter Aufforderung mehr Content zu erstellen
❌ **Wenn Keyword-Stuffing erkennbar** → Retry mit natürlicherer Integration

**Partial Success**: Wenn Word Count bei 1800 statt 2000 → proceed mit Warning.

---

## Output Files

Speichere Ergebnis in `SEO/SEO-CONTENT/{keyword-slug}/content/`:

### 1. `article-draft.md`
```markdown
# Pferd kaufen: Worauf achten? Der ultimative Kaufratgeber 2025

*Letzte Aktualisierung: 2025-01-04*

## Einleitung

Du träumst schon lange von einem eigenen Pferd...

[Vollständiger Artikel-Content]

---

*Artikel-Statistiken*:
- Wortanzahl: 2487
- Lesedauer: 12 Minuten
- Primary Keyword Density: 1.1%
```

### 2. `content-metadata.json` (Optional)
Metadata für Tracking und Quality-Check:
```json
{
  "phase": "4B",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T15:30:00Z",
  "stats": {
    "word_count": 2487,
    "primary_keyword_count": 27,
    "primary_keyword_density": 1.1,
    "supporting_keywords_count": 42,
    "eeat_signals_count": 5,
    "internal_links_count": 4,
    "faq_questions_count": 6,
    "sections_count": 7
  },
  "quality_gates_passed": {
    "word_count_target": true,
    "keyword_density": true,
    "eeat_signals": true,
    "internal_links": true,
    "faq_section": true,
    "brand_language": true
  }
}
```

---

## Troubleshooting

### Problem: Content zu generisch/oberflächlich
**Lösung**:
- Prüfe ob E-E-A-T Signals aus Phase 2 im Prompt enthalten waren
- Retry mit expliziter Aufforderung: "Verwende konkrete Praxis-Beispiele"
- Stelle sicher dass Content-Type pro Sektion klar definiert ist (tutorial vs. explanation)

### Problem: Keyword-Density zu hoch (> 1.5%)
**Lösung**:
- Retry mit: "Reduziere Keyword-Verwendung, fokussiere auf natürliche Sprache"
- Prüfe ob Supporting Keywords statt Primary Keyword verwendet werden können
- Verwende Synonyme und natürliche Variationen

### Problem: Artikel zu kurz (< 2000 Wörter)
**Lösung**:
- Prüfe ob alle Subsections aus Outline umgesetzt wurden
- Retry mit: "Erweitere jede Subsektion auf min 200 Wörter"
- Füge mehr Beispiele und Praxis-Tipps hinzu

### Problem: Brand Language nicht konsistent
**Lösung**:
- Stelle sicher dass `SEO/pferdewert-brand-language.md` im Prompt referenziert ist
- Retry mit expliziten Beispielen: "Verwende 'Du' statt 'Sie', 'Dein Pferd' statt 'das Pferd'"
- Prüfe auf verbotene Formulierungen ("Wir empfehlen..." statt "Du solltest...")

### Problem: Fact-Checking-Daten nicht verfügbar
**Lösung**:
- Proceed ohne Firecrawl-Daten (Phase 4A skip)
- Verwende allgemein bekannte Fakten und Best Practices
- Markiere Stellen wo externe Referenzen später hinzugefügt werden können

### Problem: Interne Links zu nicht-existierenden Seiten
**Lösung**:
- Prüfe welche Ratgeber-Seiten tatsächlich existieren (über sitemap oder Dateistruktur)
- Verwende nur Links zu existierenden Seiten
- Falls keine passenden Seiten existieren → erstelle generische Links für späteren Aufbau

---

## Best Practices

### E-E-A-T Signal-Integration Beispiele

**Experience (Persönliche Erfahrung)**:
```markdown
Als ich vor 10 Jahren mein erstes Pferd kaufte, machte ich einen entscheidenden Fehler: Ich verzichtete auf den Gesundheitscheck durch einen unabhängigen Tierarzt. Das kostete mich später tausende Euro in Behandlungskosten.
```

**Expertise (Fachliche Kompetenz)**:
```markdown
Dr. Laura Schmidt, Fachtierärztin für Pferde mit 20 Jahren Erfahrung, erklärt: "Die Ankaufsuntersuchung sollte immer eine Röntgenaufnahme der Gliedmaßen beinhalten, besonders bei Sportpferden."
```

**Authoritativeness (Quellenangabe)**:
```markdown
Laut dem Deutschen Olympiade-Komitee für Reiterei (DOKR) liegt der durchschnittliche Kaufpreis für ein gut ausgebildetes Dressurpferd zwischen 15.000 und 40.000 Euro (Stand 2024).
```

**Trustworthiness (Transparenz)**:
```markdown
Wichtig: Dieser Artikel ersetzt keine individuelle Beratung durch einen Tierarzt oder Fachmann vor Ort. Bei gesundheitlichen Fragen zu deinem Pferd konsultiere immer einen qualifizierten Veterinär.
```

### Keyword-Integration Beispiele

**Natürlich (✅)**:
```markdown
Bevor du ein Pferd kaufst, solltest du dir über die laufenden Kosten im Klaren sein. Die Entscheidung, ein Pferd zu kaufen, ist nicht nur emotional, sondern auch finanziell weitreichend.
```

**Forciert (❌)**:
```markdown
Wenn du ein Pferd kaufen möchtest, musst du beim Pferd kaufen auf viele Dinge achten. Der Pferdekauf erfordert beim Pferd kaufen besondere Sorgfalt.
```

### Interne Verlinkung Best Practices

**Kontextuell (✅)**:
```markdown
Die laufenden Kosten für ein Pferd belaufen sich auf 300-800 Euro monatlich. Mehr Details zu den verschiedenen Kostenpunkten findest du in unserem [detaillierten Ratgeber zur Pferdehaltung](/ratgeber/pferdehaltung-kosten).
```

**Forciert (❌)**:
```markdown
Pferde kosten Geld. [Klicke hier](/ratgeber/kosten) für mehr Infos. Lies auch unseren [Artikel über Versicherungen](/ratgeber/versicherung).
```

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 4:
→ **Phase 5: On-Page SEO** (`phase-5-onpage-seo.md`)

Verwende `article-draft.md` aus Phase 4B als Input für Phase 5.

---

**Phase 4 Checklist**:
- [ ] Optional Step: Fact-Checking via Firecrawl ausgeführt (wenn benötigt)
- [ ] Sub-Agent Delegation für Content-Erstellung
- [ ] Brand Language Guide referenziert im Prompt
- [ ] Quality Gate 4B: Min 2000 Wörter erreicht
- [ ] Quality Gate 4B: Keyword Density 0.8-1.2%
- [ ] Quality Gate 4B: Min 3 E-E-A-T Signale integriert
- [ ] Output Files gespeichert in `content/` Ordner
- [ ] Ready für Phase 5: Vollständiger Artikel-Draft vorhanden
