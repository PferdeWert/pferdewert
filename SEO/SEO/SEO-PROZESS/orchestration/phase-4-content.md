# Phase 4: Content Creation

**Token Budget**: ~700 Tokens
**Main Deliverables**: `article-draft.md`, 2000-2500 Wörter Ratgeber-Content
**Agent Pattern**: Sub-Agent only (seo-content-writer)

---

## Phase 4A: Content Writing (Sub-Agent)

**WICHTIG**: Diese Phase wird komplett vom Sub-Agent ausgeführt. Main-Agent delegiert nur.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Write SEO-optimized article content</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Schreibe den kompletten Ratgeber-Artikel basierend auf Outline und Analysen.

## INPUT-DATEN (JSON):
{
  "content_outline": {...},        // Von Phase 3
  "keyword_analysis": {...},       // Von Phase 1B
  "serp_analysis": {...},          // Von Phase 2B
  "primary_keyword": "pferd kaufen worauf achten",
  "supporting_keywords": [...],
  "paa_questions": [...],
  "eeat_signals": {...}
}

## AUFGABE:

### 1. PferdeWert Brand Language

**KRITISCH - Lies Brand Language Guideline**:
→ **MUSS LESEN**: `SEO/pferdewert-brand-language.md` für PferdeWert Tone & Style!

**Zusammenfassung Key Rules**:
- ✅ **Duzen**: "Du" statt "Sie" (persönlich & zugänglich)
- ✅ **Aktiv statt Passiv**: "Wir helfen dir" statt "Es wird geholfen"
- ✅ **Konkret statt abstrakt**: "Spare 30% Zeit" statt "Effizienter"
- ✅ **Emotional aber fundiert**: Begeisterung + Fachwissen kombinieren
- ❌ **NIEMALS "kostenlos/free"**: Service ist PAID (14,90€)
- ❌ **Keine Marketing-Floskeln**: Nicht "revolutionär", "einzigartig", "bahnbrechend"
- ❌ **Keine übertriebenen Superlative**: "sehr gut" statt "absolut fantastisch"

**Tone Beispiele**:
- ❌ **Falsch**: "Unsere revolutionäre KI-Technologie bietet einzigartige Lösungen."
- ✅ **Richtig**: "Unsere KI analysiert Pferdedaten und gibt dir eine fundierte Einschätzung."

**PferdeWert Erwähnungen**:
- Max 2-3 subtile Erwähnungen im Artikel
- Immer im Kontext (z.B. "Tools wie PferdeWert helfen bei...")
- NIEMALS aggressive CTAs ("Jetzt kaufen!", "Limitiertes Angebot!")
- ✅ **Gute CTAs**: "Lass dein Pferd von Experten bewerten", "Ermittle den Marktwert"

### 2. Content-Format-Patterns

**Für jede H2-Sektion verwende passende Format-Patterns**:

#### Pattern A: How-To / Tutorial
```markdown
## [H2 Title: z.B. "Gesundheitscheck beim Pferdekauf"]

[Einleitungs-Absatz: Warum wichtig? 2-3 Sätze]

**Schritt-für-Schritt Anleitung:**

1. **[Schritt 1 Title]**: [Beschreibung was zu tun ist. 2-3 Sätze mit konkreten Details]

2. **[Schritt 2 Title]**: [Beschreibung. Inkl. Tipps/Warnsignale wenn relevant]

3. **[Schritt 3 Title]**: [Beschreibung mit praktischem Beispiel]

[Zusammenfassung: Key Takeaway dieser Sektion. 1-2 Sätze]
```

#### Pattern B: Expert-Tipps / Best Practices
```markdown
## [H2 Title: z.B. "Typische Fehler beim Pferdekauf"]

[Einleitung: Problem-Statement. 2-3 Sätze]

**Die häufigsten Fehler:**

- ❌ **[Fehler 1]**: [Was passiert. Warum problematisch. 2 Sätze]

  ✅ **Besser so**: [Richtige Vorgehensweise. Konkreter Tipp]

- ❌ **[Fehler 2]**: [Beschreibung + Impact]

  ✅ **Besser so**: [Alternative Lösung]

[Experten-Tipp Box wenn verfügbar]

> 💡 **Experten-Tipp von [Name, Credentials]:**
> "[Zitat mit praktischem Insight. 2-3 Sätze]"

[Abschluss: Zusammenfassung der Learnings]
```

#### Pattern C: Checkliste / Vergleich
```markdown
## [H2 Title: z.B. "Dokumente beim Pferdekauf"]

[Einleitung: Warum diese Liste wichtig ist]

**Deine Pferdekauf-Checkliste:**

| Dokument | Warum wichtig | Was prüfen |
|----------|---------------|------------|
| Equidenpass | Pflichtdokument für Eigentumswechsel | Vollständigkeit, Impfungen aktuell |
| Abstammungsnachweis | Beweist Reinrassigkeit | Namen der Elterntiere, Zuchtverband |
| Gesundheitszeugnis | Aktuelle Gesundheitslage | Datum max. 2 Wochen alt |

[Oder als Bullet-List wenn Tabelle nicht passt:]

✅ **[Item 1]**: [Kurze Erklärung warum relevant. 1-2 Sätze]

✅ **[Item 2]**: [Erklärung + praktischer Hinweis]

✅ **[Item 3]**: [Erklärung]

[Zusammenfassung]
```

#### Pattern D: PAA-Frage Direktantwort
```markdown
## [H2 Title als Frage: z.B. "Was kostet ein gesundes Pferd?"]

[FEATURED SNIPPET OPTIMIERUNG - Erste 40-60 Wörter]:
[Direkte Antwort auf die Frage. Konkrete Zahlen/Facts wenn möglich.
Beispiel: "Ein gesundes Freizeitpferd kostet in Deutschland zwischen 3.000€ und 15.000€.
Der Preis hängt von Rasse, Alter, Ausbildungsstand und Gesundheitszustand ab.
Sportpferde mit Turniererfolgen kosten 20.000€-100.000€ oder mehr."]

### [H3: Detaillierter Aspekt]

[Tiefere Erklärung. 150-200 Wörter mit Beispielen]

### [H3: Weiterer Aspekt]

[Details + praktische Hinweise]

[Zusammenfassung der Sektion]
```

### 3. E-E-A-T Integration

**Experience (Erfahrung)**:
- **Case Study einfügen** (1-2 pro Artikel):
  ```markdown
  📖 **Praxis-Beispiel: [Titel]**

  [Name/Person] hatte folgendes Problem: [Situation beschreiben. 2-3 Sätze]

  **Das hat geholfen**: [Lösung + Ergebnis. 2-3 Sätze]

  **Learnings**: [Was kann der Leser daraus mitnehmen]
  ```

- **Persönliche Insights** (wo passend):
  - "In meiner Erfahrung mit über 500 Pferdekäufen..."
  - "Häufig sehe ich, dass Käufer..."
  - "Ein typischer Fall aus der Praxis..."

**Expertise (Fachwissen)**:
- **Experten-Zitate** (2-3 pro Artikel):
  ```markdown
  > 🗣️ **[Name], [Credentials z.B. Tierarzt, Reitlehrer]:**
  > "[Fachliches Statement mit praktischem Wert. 2-3 Sätze]"
  ```

- **Fachbegriffe erklären**:
  - Beim ersten Vorkommen: "Die Ankaufsuntersuchung (AKU) ist..."
  - Aber: Nicht zu akademisch, verständlich bleiben

**Authoritativeness (Autorität)**:
- **Externe Quellen verlinken** (2-3 pro Artikel):
  - Format: "Laut [Quelle] ..."
  - Am Ende der Sektion: `Quelle: [Link zu Studie/FN/Tierärztekammer]`
  - NUR vertrauenswürdige Quellen (keine Foren/Blogs)

- **Statistiken/Daten einbauen**:
  - "Eine Studie der FN zeigt: 70% der Pferdekäufer..."
  - "Laut Tierärzteverband kosten AKUs durchschnittlich..."

**Trustworthiness (Vertrauenswürdigkeit)**:
- **Transparenz über Limitationen**:
  - "Diese Tipps ersetzen keine tierärztliche Beratung"
  - "Preise können regional stark variieren"

- **Quellenangaben konsistent**:
  - Alle Statistiken mit Quelle
  - Alle Expertenmeinungen mit Namen + Credentials

### 4. Keyword-Integration

**Primary Keyword** ("pferd kaufen worauf achten"):
- **Natürliche Platzierungen**:
  - Im H1 Title (bereits in Phase 3 definiert)
  - In der Einleitung (erste 100 Wörter)
  - In 2-3 H2/H3-Überschriften
  - In Meta Description (bereits in Phase 3 definiert)
  - Im Fazit

- **Keyword-Density Target**: 0.8-1.2%
  - Bei 2400 Wörtern = 19-29 Erwähnungen
  - Verteilt über ganzen Artikel
  - NIEMALS forciert, nur wo natürlich passend

**Supporting Keywords**:
- **Natürlich im Text einstreuen**:
  - "gesundes pferd kaufen" → In Gesundheits-Sektion
  - "pferd kaufen tipps" → In Checklisten-Sektion
  - "pferdekauf beratung" → In Experten-Zitat-Kontext

- **Synonyme & verwandte Begriffe**:
  - "Pferdekauf", "Pferdeankauf", "Pferd erwerben"
  - "Ankaufsuntersuchung", "AKU", "Gesundheitscheck"
  - Natürliche Variation = bessere Rankings

### 5. Visual Elements Placeholders

**Bilder/Infografiken** (aus content_outline.visual_elements):
```markdown
[BILD: Pferd beim Gesundheitscheck]
*Alt-Text: Tierarzt untersucht Pferd bei Ankaufsuntersuchung - worauf achten beim Pferdekauf*

[INFOGRAFIK: Pferdekauf-Checkliste Übersicht]
*Alt-Text: Komplette Checkliste für Pferdekauf - Dokumente, Gesundheit, Rechtliches*

[TABELLE: Siehe Content-Format Pattern C oben]
```

**Download-CTAs** (wenn Checkliste vorhanden):
```markdown
📥 **[Download: Pferdekauf-Checkliste als PDF](#)**
*Alle wichtigen Punkte zum Abhaken*
```

### 6. Internal Linking

**PferdeWert Service Links** (aus content_outline.internal_linking_opportunities):
- **Natürlich im Kontext**:
  - ❌ **Falsch**: "Klicke hier für unseren Service!"
  - ✅ **Richtig**: "Tools wie PferdeWert helfen dir, den fairen Marktwert zu ermitteln."

- **Platzierung**:
  - 1x in Haupt-Content (wo thematisch passt)
  - 1x im Fazit als CTA
  - Max 2-3 interne Links gesamt

**Ratgeber-Vernetzung** (wenn andere Artikel existieren):
- "Mehr dazu in unserem Ratgeber: [Pferde-Versicherungen im Vergleich](#)"
- "Siehe auch: [Pferdehaltung Kosten-Übersicht](#)"

## OUTPUT FORMAT (Markdown):

Schreibe vollständigen Artikel als Markdown-Datei:

```markdown
# [H1 Title aus content_outline]

[Einleitung: 150-200 Wörter. Hook + Problem-Statement + Overview]

## [H2 aus content_outline]

[Content für diese Sektion basierend auf Format-Patterns]

### [H3 Subsection]

[Content...]

### [H3 Subsection]

[Content mit E-E-A-T Signalen...]

[Weiter mit allen H2s aus content_outline...]

## Häufig gestellte Fragen

### Was kostet ein gesundes Pferd?

[Kurze Antwort. 50-100 Wörter]

### [Weitere FAQ-Fragen...]

[Kurze Antworten...]

## Fazit: [Title aus content_outline]

[Zusammenfassung. Key Takeaways als Bullet Points. CTA zu PferdeWert.]

**Key Takeaways:**

- ✅ [Wichtigster Punkt]
- ✅ [Zweitwichtigster Punkt]
- ✅ [Dritter Punkt]

[Finaler CTA mit internem Link]

---

**Disclaimer**: Dieser Ratgeber ersetzt keine individuelle Beratung durch Tierärzte oder Rechtsexperten.

**Quellen:**
- [Quelle 1 mit Link]
- [Quelle 2 mit Link]
- [Quelle 3 mit Link]
```

**WICHTIG**:
- Befolge ALLE Brand Language Rules aus `SEO/pferdewert-brand-language.md`
- Verwende Format-Patterns (How-To, Expert-Tipps, Checkliste, PAA)
- Integriere E-E-A-T Signale an definierten Stellen
- Keyword-Integration natürlich, niemals forciert
- Visual Placeholders für Bilder/Tabellen/Infografiken
- Interne Links subtil und im Kontext
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 4

Prüfe ob Sub-Agent vollständigen Artikel geliefert hat:

✅ **Word Count in Range 2000-2500** (±100 Toleranz)
✅ **Alle H2s aus content_outline abgedeckt**
✅ **Min 2 E-E-A-T Signale integriert** (Case Study, Expert Quote, External Reference)
✅ **Primary Keyword Density 0.8-1.2%**
✅ **Min 10 Supporting Keywords natürlich verwendet**
✅ **Brand Language Rules befolgt** (Duzen, Aktiv, keine "kostenlos")
✅ **FAQ-Sektion vorhanden mit min 5 Fragen**
❌ **Wenn Word Count < 1900** → Retry mit mehr Detail in Haupt-Sektionen
❌ **Wenn Keyword Density > 1.5%** → Retry mit natürlicherem Flow

**Partial Success**: Wenn nur 1 E-E-A-T Signal → proceed mit Warning.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/content/`:

### 1. `article-draft.md`
Vollständiger Markdown-Artikel wie oben definiert.

### 2. `content-stats.json` (Optional für Tracking)
```json
{
  "phase": "4",
  "timestamp": "2025-01-04T15:30:00Z",
  "word_count": 2380,
  "primary_keyword_density": 0.011,
  "supporting_keywords_count": 18,
  "eeat_signals": {
    "case_studies": 2,
    "expert_quotes": 3,
    "external_references": 3
  },
  "internal_links": 2,
  "visual_elements": 3
}
```

---

## Troubleshooting

### Problem: Word Count zu niedrig (< 2000)
**Lösung**:
- Erweitere Haupt-Sektionen mit Beispielen
- Füge mehr H3-Subsections hinzu
- Tiefere Erklärungen statt Oberflächen-Statements

### Problem: Keyword-Stuffing (Density > 1.5%)
**Lösung**:
- Verwende mehr Synonyme und verwandte Begriffe
- Entferne forcierte Keyword-Wiederholungen
- Fokus auf natürlichen Lesefluss

### Problem: Zu viele PferdeWert-Erwähnungen
**Lösung**:
- Max 2-3 subtile Erwähnungen
- NUR im relevanten Kontext (z.B. Marktwert-Ermittlung)
- Keine aggressiven Sales-CTAs

### Problem: Keine E-E-A-T Signale integriert
**Lösung**:
- Min 1 Case Study ist PFLICHT
- Min 1 Expert Quote mit Credentials
- Min 2 externe Quellenangaben
- Retry wenn komplett fehlend

### Problem: Brand Language nicht befolgt
**Lösung**:
- Prüfe auf "Sie" statt "Du" → Ersetzen
- Prüfe auf Passiv-Formulierungen → Aktiv umformulieren
- Prüfe auf "kostenlos/free" → KRITISCHER FEHLER, sofort fixen

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 4:
→ **Phase 5: On-Page SEO** (`phase-5-onpage-seo.md`)

Verwende `article-draft.md` als Basis für Metadata-Generierung und Schema-Markup.

---

**Phase 4 Checklist**:
- [ ] Sub-Agent Delegation für Content-Writing
- [ ] Brand Language Guidelines aus `SEO/pferdewert-brand-language.md` gelesen
- [ ] Quality Gate: Word Count 2000-2500
- [ ] Quality Gate: Keyword Density 0.8-1.2%
- [ ] Quality Gate: Min 2 E-E-A-T Signale
- [ ] FAQ-Sektion mit PAA-Fragen integriert
- [ ] Output File gespeichert in `content/` Ordner
- [ ] Ready für Phase 5: Artikel-Draft steht
