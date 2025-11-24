# PHASE 5B: SCHEMA MARKUP

## Übersicht

**Sub-Phase**: 5B - Schema Markup Generation
**Agent**: `seo-content-writer`

**Ziel**: Generiere strukturierte JSON-LD Schema Markup Types für optimale SERP-Features (Rich Results, Knowledge Graph, Featured Snippets).

**Input Dependencies**:
- `planning/content-outline.json` (aus Phase 3) → H1, H2 Structure, Topic
- `content/article-draft.md` (aus Phase 4) → Content für Schema Properties
- `seo/seo-metadata.json` (aus Phase 5A) → Title, Description, Canonical URL
- `research/serp-analysis.json` (aus Phase 2) → PAA Questions für FAQ Schema

**Output Deliverables**:
- `seo/schema-article.json` (REQUIRED - Primary Schema)
- `seo/schema-faq.json` (CONDITIONAL - if PAA questions present)
- `seo/schema-howto.json` (CONDITIONAL - if Tutorial/Step-by-step content)
- `seo/schema-breadcrumb.json` (RECOMMENDED - Navigation context)

---

## TASKS

### 1. Read Input Files

```markdown
REQUIRED INPUT FILES:
- planning/content-outline.json → H1 (für headline), Topic
- content/article-draft.md → Content für articleBody, datePublished
- seo/seo-metadata.json → Title, Description, Canonical URL
- research/serp-analysis.json → PAA Questions (für FAQ Schema)
```

**Verwendung**:
- H1 aus `content-outline.json` → Article Schema `headline`
- Article Draft aus `article-draft.md` → Article Schema `articleBody`
- Title aus `seo-metadata.json` → Article Schema `headline` (Fallback)
- Canonical URL aus `seo-metadata.json` → Article Schema `url`
- PAA Questions aus `serp-analysis.json` → FAQ Schema `mainEntity`

---

### 2. Generate Article Schema (REQUIRED)

**KRITISCHE Anforderungen**:
- **@context**: MUSS `"https://schema.org"` sein
- **@type**: MUSS `"Article"` sein
- **headline**: MUSS vorhanden sein (max 110 Zeichen)
- **author**: MUSS vorhanden sein (E-E-A-T kritisch!)
- **publisher**: MUSS vorhanden sein (Organization type)
- **datePublished**: MUSS vorhanden sein (ISO 8601 format)
- **dateModified**: Optional aber empfohlen
- **image**: Optional (WARNING if missing, not ERROR)

**Standard Article Schema Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf",
  "description": "Pferd kaufen: Unsere Experten-Checkliste hilft Ihnen, häufige Fehler zu vermeiden und das perfekte Pferd zu finden.",
  "url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten",
  "datePublished": "2025-01-04T10:00:00+00:00",
  "dateModified": "2025-01-04T10:00:00+00:00",
  "author": {
    "@type": "Person",
    "name": "PferdeWert Redaktion",
    "url": "https://www.pferdewert.de"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://www.pferdewert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pferdewert.de/logo.png"
    }
  },
  "image": null,
  "articleBody": "Kurzer Ausschnitt aus dem Article Draft (erste 500 Zeichen)..."
}
```

**Property Generation Rules**:

1. **headline**:
   - Primär: H1 aus `content-outline.json`
   - Fallback: Title aus `seo-metadata.json`
   - Max Length: 110 Zeichen (ERROR if >110)

2. **description**:
   - Nutze Meta Description aus `seo-metadata.json`
   - Max Length: 160 Zeichen

3. **url**:
   - Nutze Canonical URL aus `seo-metadata.json`
   - Format: `https://www.pferdewert.de/ratgeber/[slug]`

4. **datePublished**:
   - Default: Aktuelles Datum/Zeit (ISO 8601 format)
   - Format: `"2025-01-04T10:00:00+00:00"`

5. **dateModified**:
   - Optional: Identisch zu `datePublished` für neuen Content
   - Für Updates: Nutze aktuelles Datum

6. **author**:
   - **PFLICHT für E-E-A-T!**
   - Standard: `{"@type": "Person", "name": "PferdeWert Redaktion", "url": "https://www.pferdewert.de"}`
   - Alternative: Spezifischer Autor falls bekannt

7. **publisher**:
   - **PFLICHT für Google Rich Results!**
   - Standard: PferdeWert.de Organization mit Logo

8. **image**:
   - Optional (WARNING if missing)
   - Format: `{"@type": "ImageObject", "url": "https://www.pferdewert.de/images/ratgeber/[slug].jpg", "width": 1200, "height": 630}`
   - Standard: `null` (Image in Phase 6 manuell hinzufügen)

9. **articleBody**:
   - Optional: Erste 500-1000 Zeichen aus `article-draft.md`
   - Nutze nur Plain Text (keine Markdown-Syntax!)

**Validation**:
- JSON Syntax valid (ERROR if invalid)
- @context = "https://schema.org" (ERROR if missing/wrong)
- @type = "Article" (ERROR if missing/wrong)
- headline present (ERROR if missing)
- author.name present (ERROR if missing)

---

### 3. Generate FAQ Schema (CONDITIONAL)

**Trigger Condition**:
```
IF paa_questions.length > 0 in research/serp-analysis.json
THEN generate seo/schema-faq.json
ELSE skip (WARNING: FAQ Schema wäre ideal, aber nicht kritisch)
```

**FAQ Schema Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie viel kostet ein Pferd im Durchschnitt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für ein Pferd variieren stark je nach Rasse, Ausbildungsstand und Alter. Durchschnittlich liegt der Kaufpreis zwischen 3.000€ und 15.000€. Dazu kommen monatliche Kosten von 300-800€ für Unterbringung, Futter und Pflege."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Dokumente brauche ich beim Pferdekauf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beim Pferdekauf sollten Sie folgende Dokumente einfordern: Equidenpass (Pflicht!), Abstammungsnachweis, aktuelle Impfbescheinigungen, Röntgenbilder (bei wertvollen Pferden), und einen schriftlichen Kaufvertrag mit Gewährleistungsausschlüssen."
      }
    }
  ]
}
```

**FAQ Generation Rules**:

1. **Source für Questions**:
   - Primär: PAA Questions aus `research/serp-analysis.json`
   - Ergänzend: Relevante H2/H3 aus `content-outline.json` als Fragen formuliert

2. **Answer Generation**:
   - Nutze entsprechende Abschnitte aus `article-draft.md`
   - Max Length: 500 Zeichen pro Answer (für Rich Snippet Optimierung)
   - Format: Plain Text (keine Markdown-Syntax!)

3. **Question Count**:
   - Min: 2 Questions (bei < 2 → skip FAQ Schema, nur WARNING)
   - Max: 10 Questions (Fokus auf relevanteste)
   - Optimal: 3-5 Questions

4. **Question Formatting**:
   - Start mit W-Frage: "Wie", "Was", "Wann", "Warum", "Welche"
   - Konkret und spezifisch, nicht generisch
   - Beispiel: ✅ "Wie viel kostet ein Pferd im Durchschnitt?" ❌ "Kosten?"

**Validation**:
- JSON Syntax valid
- @type = "FAQPage"
- mainEntity is array with min 2 items (WARNING if < 2)
- Each Question has name and acceptedAnswer

---

### 4. Generate HowTo Schema (CONDITIONAL)

**Trigger Condition**:
```
IF content_type = "Tutorial" OR "Step-by-Step" OR "Anleitung"
  (detected from H2 structure: "Schritt 1", "Schritt 2", etc.)
THEN generate seo/schema-howto.json
ELSE skip (INFO: HowTo Schema nur für Tutorial-Content)
```

**HowTo Schema Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Pferd kaufen: 5-Schritte-Anleitung für Anfänger",
  "description": "Schritt-für-Schritt Anleitung zum Pferdekauf mit Checkliste",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "5000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Schritt 1: Budget festlegen",
      "text": "Definieren Sie Ihr Budget für Kauf und laufende Kosten. Planen Sie mindestens 300-800€ monatlich für Unterbringung ein.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Schritt 2: Rasse und Typ auswählen",
      "text": "Wählen Sie eine Rasse basierend auf Ihrem Erfahrungslevel und Einsatzzweck (Freizeit, Turnier, Zucht).",
      "position": 2
    }
  ]
}
```

**HowTo Generation Rules**:

1. **Step Extraction**:
   - Source: H2/H3 aus `content-outline.json` mit Pattern "Schritt X", "Step X", "Phase X"
   - Min Steps: 3 (bei < 3 → skip HowTo Schema)
   - Max Steps: 10 (Fokus auf Hauptschritte)

2. **Step Text**:
   - Nutze Absätze aus `article-draft.md` unterhalb des entsprechenden H2/H3
   - Max Length: 300 Zeichen pro Step
   - Format: Plain Text, actionable Anweisung

3. **totalTime**:
   - Optional: ISO 8601 Duration Format
   - Beispiel: `"PT2H"` = 2 Stunden
   - Nur angeben wenn im Content erwähnt

4. **estimatedCost**:
   - Optional: Wenn Kosten im Content erwähnt
   - Format: MonetaryAmount mit currency + value

**Validation**:
- JSON Syntax valid
- @type = "HowTo"
- step is array with min 3 items
- Each step has name, text, position

---

### 5. Generate Breadcrumb Schema (RECOMMENDED)

**Standard Breadcrumb für Ratgeber**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.pferdewert.de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ratgeber",
      "item": "https://www.pferdewert.de/ratgeber"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pferd kaufen: Worauf achten?",
      "item": "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
    }
  ]
}
```

**Breadcrumb Generation Rules**:

1. **Structure**:
   - Level 1: Always "Home" → `https://www.pferdewert.de`
   - Level 2: Always "Ratgeber" → `https://www.pferdewert.de/ratgeber`
   - Level 3: Current Article Title → Canonical URL

2. **Level 3 Name**:
   - Primär: H1 aus `content-outline.json`
   - Fallback: Title aus `seo-metadata.json`
   - Max Length: 60 Zeichen (für Lesbarkeit in Breadcrumb)

3. **Level 3 Item URL**:
   - Nutze Canonical URL aus `seo-metadata.json`

**Validation**:
- JSON Syntax valid
- @type = "BreadcrumbList"
- itemListElement has exactly 3 items
- position values: 1, 2, 3 (sequential)

---

### 6. Validate All Schema Files

**Post-Generation Validation Checklist**:

1. **JSON Syntax Validation**:
   - Alle generierten Schema-Dateien müssen valid JSON sein
   - Test mit `json.loads()` oder JSON Validator
   - ERROR if syntax invalid

2. **Schema.org Context Validation**:
   - Jedes Schema MUSS `"@context": "https://schema.org"` haben
   - ERROR if missing oder falsch

3. **Type Validation**:
   - Article Schema: `@type = "Article"` (ERROR if wrong)
   - FAQ Schema: `@type = "FAQPage"` (ERROR if wrong)
   - HowTo Schema: `@type = "HowTo"` (ERROR if wrong)
   - Breadcrumb Schema: `@type = "BreadcrumbList"` (ERROR if wrong)

4. **Required Properties per Type**:
   - Article: headline, author.name (ERROR if missing)
   - FAQ: mainEntity with min 2 Questions (WARNING if < 2)
   - HowTo: step with min 3 Steps (skip if < 3)
   - Breadcrumb: itemListElement with 3 items

5. **Minimum Schema Count**:
   - Min 2 Schema Types required: Article + (FAQ OR HowTo OR Breadcrumb)
   - ERROR if only Article Schema generated

---

## QUALITY GATE 5B: SCHEMA MARKUP VALIDATION

**Execution**: After generating all Schema files, validate against quality gate criteria.

### ERROR Criteria (Hard Fail - Retry Required)

**If ANY of these fail → RETRY schema generation (max 1× retry)**:

1. **Article Schema Missing** (threshold: true):
   - Check: `!exists('seo/schema-article.json')`
   - Action: Generiere Article Schema (PFLICHT für jeden Content), retry Phase 5B

2. **Article Schema Invalid JSON** (threshold: true):
   - Check: `!isValidJSON('seo/schema-article.json')`
   - Action: Validiere JSON-LD Syntax, retry Phase 5B

3. **Article Schema Missing @context** (threshold: true):
   - Check: `!schema['@context'] || schema['@context'] !== 'https://schema.org'`
   - Action: Füge `'@context': 'https://schema.org'` hinzu, retry Phase 5B

4. **Article Schema Missing @type** (threshold: true):
   - Check: `!schema['@type'] || schema['@type'] !== 'Article'`
   - Action: Setze `'@type': 'Article'`, retry Phase 5B

5. **Article Schema Missing headline** (threshold: true):
   - Check: `!schema.headline`
   - Action: Nutze Title Tag als headline, retry Phase 5B

6. **Article Schema Missing author** (threshold: true):
   - Check: `!schema.author || !schema.author.name`
   - Action: Füge `author: {name: 'PferdeWert Redaktion', url: 'https://www.pferdewert.de'}` hinzu, retry Phase 5B

7. **Minimum Schema Types Count** (threshold: 2):
   - Check: `schemaCount < 2`
   - Message: "Nur {{actual}} Schema Markup Typen statt min 2 (Article + FAQ/HowTo/Breadcrumb)"
   - Action: Generiere zusätzlichen Schema-Typ basierend auf Content, retry Phase 5B

### WARNING Criteria (Proceed with Caution)

**Document in summary but continue to Phase 5C**:

1. **FAQ Schema Missing When PAA Present** (threshold: true):
   - Check: `paa_questions.length > 0 && !exists('seo/schema-faq.json')`
   - Message: "PAA Questions vorhanden ({{count}}), aber kein FAQ Schema generiert"
   - Action: CONTINUE (FAQ Schema wäre ideal, aber nicht kritisch)

2. **Breadcrumb Schema Missing** (threshold: false):
   - Check: `!exists('seo/schema-breadcrumb.json')`
   - Message: "Breadcrumb Schema fehlt (verbessert Navigation Context)"
   - Action: CONTINUE (Breadcrumb Schema in Phase 6 manuell hinzufügen)

3. **Article Image Missing** (threshold: false):
   - Check: `!schema.image`
   - Message: "image property fehlt in Article Schema (Google bevorzugt Bilder)"
   - Action: CONTINUE (Image in Phase 6 hinzufügen)

### INFO Criteria (Nice-to-Have)

**Optional checks that indicate good practices**:

1. **HowTo Schema Present**:
   - Check: `exists('seo/schema-howto.json')`
   - Message: "✓ HowTo Schema vorhanden (ideal für Tutorial-Content)"

2. **FAQ Schema Present**:
   - Check: `exists('seo/schema-faq.json')`
   - Message: "✓ FAQ Schema vorhanden ({{questionCount}} Fragen integriert)"

3. **Breadcrumb Schema Present**:
   - Check: `exists('seo/schema-breadcrumb.json')`
   - Message: "✓ Breadcrumb Schema vorhanden (Navigation Context für Google)"

---

## VALIDATION LOGIC

```python
def validate_phase_5b(schema_files, primary_keyword, paa_questions_count):
    """Quality Gate nach Phase 5B - Schema Markup Validation"""
    errors = []
    warnings = []
    infos = []

    # Count generated schema types
    schema_count = len([f for f in schema_files if os.path.exists(f)])

    # ERROR Checks
    if not os.path.exists('seo/schema-article.json'):
        errors.append({
            'code': 'article_schema_missing',
            'message': 'Article Schema fehlt - PRIMARY REQUIREMENT!',
            'action': 'RETRY: Generiere Article Schema (PFLICHT für jeden Content)'
        })
    else:
        # Load article schema for validation
        try:
            with open('seo/schema-article.json', 'r') as f:
                article_schema = json.load(f)
        except json.JSONDecodeError:
            errors.append({
                'code': 'article_schema_invalid_json',
                'message': 'Article Schema enthält ungültiges JSON',
                'action': 'RETRY: Validiere JSON-LD Syntax'
            })
        else:
            # Validate @context
            if not article_schema.get('@context') or article_schema['@context'] != 'https://schema.org':
                errors.append({
                    'code': 'article_schema_missing_context',
                    'message': "@context fehlt oder ist nicht 'https://schema.org'",
                    'action': "RETRY: Füge '@context': 'https://schema.org' hinzu"
                })

            # Validate @type
            if not article_schema.get('@type') or article_schema['@type'] != 'Article':
                errors.append({
                    'code': 'article_schema_missing_type',
                    'message': "@type fehlt oder ist nicht 'Article'",
                    'action': "RETRY: Setze '@type': 'Article'"
                })

            # Validate headline
            if not article_schema.get('headline'):
                errors.append({
                    'code': 'article_schema_missing_headline',
                    'message': 'headline property fehlt in Article Schema',
                    'action': 'RETRY: Nutze Title Tag als headline'
                })

            # Validate author (E-E-A-T critical!)
            if not article_schema.get('author') or not article_schema['author'].get('name'):
                errors.append({
                    'code': 'article_schema_missing_author',
                    'message': 'author.name fehlt in Article Schema (E-E-A-T kritisch!)',
                    'action': "RETRY: Füge author: {name: 'PferdeWert Redaktion', url: 'https://www.pferdewert.de'} hinzu"
                })

            # WARNING: Check for image
            if not article_schema.get('image'):
                warnings.append({
                    'code': 'article_image_missing',
                    'message': 'image property fehlt in Article Schema (Google bevorzugt Bilder)',
                    'action': 'CONTINUE: Image in Phase 6 hinzufügen'
                })

    # Validate minimum schema count
    if schema_count < 2:
        errors.append({
            'code': 'min_schema_types_count',
            'message': f'Nur {schema_count} Schema Markup Typen statt min 2 (Article + FAQ/HowTo/Breadcrumb)',
            'action': 'RETRY: Generiere zusätzlichen Schema-Typ basierend auf Content'
        })

    # WARNING Checks
    if paa_questions_count > 0 and not os.path.exists('seo/schema-faq.json'):
        warnings.append({
            'code': 'faq_schema_missing_when_paa_present',
            'message': f'PAA Questions vorhanden ({paa_questions_count}), aber kein FAQ Schema generiert',
            'action': 'CONTINUE: FAQ Schema wäre ideal, aber nicht kritisch'
        })

    if not os.path.exists('seo/schema-breadcrumb.json'):
        warnings.append({
            'code': 'breadcrumb_schema_missing',
            'message': 'Breadcrumb Schema fehlt (verbessert Navigation Context)',
            'action': 'CONTINUE: Breadcrumb Schema in Phase 6 manuell hinzufügen'
        })

    # INFO Checks
    if os.path.exists('seo/schema-howto.json'):
        infos.append({
            'code': 'howto_schema_present',
            'message': '✓ HowTo Schema vorhanden (ideal für Tutorial-Content)'
        })

    if os.path.exists('seo/schema-faq.json'):
        # Count FAQ questions
        try:
            with open('seo/schema-faq.json', 'r') as f:
                faq_schema = json.load(f)
            question_count = len(faq_schema.get('mainEntity', []))
            infos.append({
                'code': 'faq_schema_present',
                'message': f'✓ FAQ Schema vorhanden ({question_count} Fragen integriert)'
            })
        except:
            pass

    if os.path.exists('seo/schema-breadcrumb.json'):
        infos.append({
            'code': 'breadcrumb_schema_present',
            'message': '✓ Breadcrumb Schema vorhanden (Navigation Context für Google)'
        })

    # Entscheidung
    if errors:
        return {
            'status': 'FAILED',
            'gate': 'phase_5b_schema',
            'errors': errors,
            'warnings': warnings,
            'action': 'RETRY_REQUIRED'
        }
    elif warnings:
        return {
            'status': 'PASSED_WITH_WARNINGS',
            'gate': 'phase_5b_schema',
            'warnings': warnings,
            'infos': infos,
            'action': 'CONTINUE'
        }
    else:
        return {
            'status': 'PASSED',
            'gate': 'phase_5b_schema',
            'infos': infos,
            'action': 'CONTINUE'
        }
```

---

## RETRY LOGIC (Max 1× Wiederholung)

**Pattern**:
1. Erste Generierung von Schema JSON Files
2. Quality Gate Validation
3. **Wenn ERROR**:
   - Log: "Quality Gate 5B FAILED - Initiating Retry (1/1)"
   - Retry Generierung mit angepassten Parametern (z.B. fehlende Properties ergänzen)
   - Quality Gate Validation (zweiter Versuch)
   - **Wenn ERROR bleibt**:
     - Log: "Quality Gate 5B FAILED after Retry - Escalating to Main Agent"
     - Return: FAILED Status mit Error Details
     - Main Agent entscheidet über Fortsetzung
4. **Wenn PASSED oder PASSED_WITH_WARNINGS**: Fortfahren zu Phase 5C

**Keine Infinite Retries**: Max 1× Retry verhindert Token-Verschwendung durch sinnlose Wiederholungen.

---

## OUTPUT FORMAT (Return to Main Agent)

```json
{
  "phase": "5B",
  "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
  "deliverables": [
    "seo/schema-article.json",
    "seo/schema-faq.json",
    "seo/schema-breadcrumb.json"
  ],
  "quality_gate": {
    "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
    "errors": [],
    "warnings": [
      {
        "code": "article_image_missing",
        "message": "image property fehlt in Article Schema (Google bevorzugt Bilder)",
        "action": "CONTINUE: Image in Phase 6 hinzufügen"
      }
    ],
    "infos": [
      {
        "code": "faq_schema_present",
        "message": "✓ FAQ Schema vorhanden (3 Fragen integriert)"
      },
      {
        "code": "breadcrumb_schema_present",
        "message": "✓ Breadcrumb Schema vorhanden (Navigation Context für Google)"
      }
    ]
  },
  "validation": {
    "schema_count": 3,
    "article_schema_valid": true,
    "faq_questions_count": 3,
    "breadcrumb_levels": 3
  },
  "summary": "Schema Markup für 'pferd kaufen worauf achten' generiert. Article Schema vollständig mit author + publisher (E-E-A-T). FAQ Schema mit 3 PAA Questions integriert. Breadcrumb Schema für Navigation Context erstellt. ⚠️ WARNING: image property fehlt in Article Schema (Google bevorzugt Bilder), kann in Phase 6 hinzugefügt werden."
}
```

**Summary Guidelines**:
- Max 150-200 Wörter
- Erwähne alle ERROR/WARNING Findings
- Bestätige successful Validations
- Zähle generierte Schema Types
- Konkrete nächste Schritte wenn FAILED

