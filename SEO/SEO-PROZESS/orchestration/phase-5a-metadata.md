# PHASE 5A: METADATA OPTIMIZATION

## Übersicht

**Sub-Phase**: 5A - Metadata Optimization
**Verantwortung**: Sub-Agent (seo-content-writer)
**Execution Time**: ~3 Minuten
**Token Budget**: ~150 Tokens

**Ziel**: Generiere SEO-optimierte Metadaten (Title, Description, OpenGraph, Twitter Cards) basierend auf Content-Outline + Article Draft.

**Input Dependencies**:
- `planning/content-outline.json` (aus Phase 3)
- `content/article-draft.md` (aus Phase 4)

**Output Deliverables**:
- `seo/seo-metadata.json` (Primary Deliverable)

---

## TASKS

### 1. Read Input Files

```markdown
REQUIRED INPUT FILES:
- planning/content-outline.json → Primary Keyword, H1, H2 Structure
- content/article-draft.md → Content für Meta Description Extraktion
```

**Verwendung**:
- Primary Keyword aus `content-outline.json` → Title Tag Integration
- H1 aus `content-outline.json` → Basis für Title Tag
- Erste 1-2 Sätze aus `article-draft.md` → Basis für Meta Description

---

### 2. Title Tag Optimization

**KRITISCHE Anforderungen**:
- **Länge**: 50-60 Zeichen (inkl. Leerzeichen)
- **Primary Keyword**: MUSS enthalten sein (idealerweise am Anfang)
- **Brand**: Optional am Ende "| PferdeWert.de"
- **Compelling**: Neugier wecken, nicht nur Keyword-Stuffing

**Beispiele**:
- ✅ "Pferd kaufen: 5 Tipps für sicheren Pferdekauf | PferdeWert.de"
- ❌ "Pferd kaufen worauf achten pferd kaufen tipps" (Keyword-Stuffing)

**Formeln**:
```
[Primary Keyword]: [Value Proposition] | PferdeWert.de
[How-to/Anzahl]: [Benefit] für [Target Audience] | PferdeWert.de
```

**Validation**:
- Character Count: 50-60 chars (ERROR if >60, WARNING if <50)
- Primary Keyword presence (ERROR if missing)

---

### 3. Meta Description Optimization

**Anforderungen**:
- **Länge**: 150-160 Zeichen (inkl. Leerzeichen)
- **Primary Keyword**: Sollte enthalten sein (nicht kritisch wie bei Title)
- **Call-to-Action**: Optional, aber empfohlen
- **Unique Selling Points**: Min 1 USP erwähnen

**Beispiel**:
```
"Pferd kaufen: Unsere Experten-Checkliste hilft Ihnen, häufige Fehler zu vermeiden und das perfekte Pferd zu finden. Jetzt Ratgeber lesen!"
```

**Validation**:
- Character Count: 120-160 chars (ERROR if >160, WARNING if <120)
- Primary Keyword recommended but not required

---

### 4. Canonical URL Generation

**URL Structure Pattern**:
```
https://www.pferdewert.de/ratgeber/[slug]
```

**URL Normalization Rules**:
1. **Protocol**: Always HTTPS (not HTTP)
2. **Subdomain**: Always `www` prefix
3. **Domain**: `pferdewert.de` (lowercase)
4. **Path Prefix**: `/ratgeber/` for all content
5. **Slug**: Lowercase, hyphenated, no special characters
6. **Trailing Slash**: NO trailing slash
7. **Query Parameters**: NO query parameters in canonical

**Slug Generation**:
- Basis: Primary Keyword
- Transformation:
  - Lowercase
  - Spaces → Hyphens
  - Umlaute: ä→ae, ö→oe, ü→ue, ß→ss
  - Remove: ?, !, ., ,, :, ;, ', "
  - Multiple hyphens → Single hyphen

**Beispiel**:
```
Primary Keyword: "Pferd kaufen: Worauf achten?"
Slug: "pferd-kaufen-worauf-achten"
Canonical URL: "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
```

---

### 5. Open Graph Tags

**Required OG Tags**:
```json
{
  "og:title": "...",        // Kann identisch zu Title sein (oder kürzer)
  "og:description": "...",  // Kann identisch zu Meta Description sein
  "og:type": "article",     // Immer "article" für Ratgeber
  "og:url": "...",          // Canonical URL
  "og:site_name": "PferdeWert.de",
  "og:locale": "de_DE"
}
```

**Optional OG Tags** (wenn Image verfügbar):
```json
{
  "og:image": "https://www.pferdewert.de/images/ratgeber/[slug].jpg",
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:alt": "..."
}
```

**Note**: Image ist optional (WARNING if missing, not ERROR)

---

### 6. Twitter Card Tags

**Required Twitter Tags**:
```json
{
  "twitter:card": "summary_large_image",  // Standard für Content
  "twitter:title": "...",                 // Kann identisch zu Title sein
  "twitter:description": "...",           // Kann identisch zu Meta Description sein
  "twitter:site": "@PferdeWert",          // PferdeWert Twitter Handle
  "twitter:creator": "@PferdeWert"
}
```

**Optional Twitter Tags** (wenn Image verfügbar):
```json
{
  "twitter:image": "https://www.pferdewert.de/images/ratgeber/[slug].jpg",
  "twitter:image:alt": "..."
}
```

---

### 7. Robots Meta Tag

**Standard Configuration**:
```json
{
  "robots": "index, follow"
}
```

**Only use noindex/nofollow if**:
- Content is duplicate (canonical points elsewhere)
- Content is thin/low-quality (should be rare!)
- Explicitly requested by user

**Default**: Always `"index, follow"` for new Ratgeber content.

---

### 8. Generate Output File: `seo/seo-metadata.json`

**Complete Output Structure**:
```json
{
  "phase": "5A",
  "primary_keyword": "pferd kaufen worauf achten",
  "metadata": {
    "title": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf | PferdeWert.de",
    "description": "Pferd kaufen: Unsere Experten-Checkliste hilft Ihnen, häufige Fehler zu vermeiden und das perfekte Pferd zu finden. Jetzt Ratgeber lesen!",
    "canonical_url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten",
    "slug": "pferd-kaufen-worauf-achten",
    "robots": "index, follow"
  },
  "open_graph": {
    "og:title": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf",
    "og:description": "Pferd kaufen: Unsere Experten-Checkliste hilft Ihnen, häufige Fehler zu vermeiden und das perfekte Pferd zu finden.",
    "og:type": "article",
    "og:url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten",
    "og:site_name": "PferdeWert.de",
    "og:locale": "de_DE",
    "og:image": null,
    "og:image:width": null,
    "og:image:height": null,
    "og:image:alt": null
  },
  "twitter_card": {
    "twitter:card": "summary_large_image",
    "twitter:title": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf",
    "twitter:description": "Pferd kaufen: Unsere Experten-Checkliste hilft Ihnen, häufige Fehler zu vermeiden und das perfekte Pferd zu finden.",
    "twitter:site": "@PferdeWert",
    "twitter:creator": "@PferdeWert",
    "twitter:image": null,
    "twitter:image:alt": null
  },
  "validation": {
    "title_length": 58,
    "description_length": 155,
    "primary_keyword_in_title": true,
    "canonical_format_valid": true
  }
}
```

---

## QUALITY GATE 5A: METADATA VALIDATION

**Execution**: After generating `seo/seo-metadata.json`, validate against quality gate criteria.

### ERROR Criteria (Hard Fail - Retry Required)

**If ANY of these fail → RETRY metadata generation (max 1× retry)**:

1. **Title Length Maximum** (threshold: 60 chars):
   - Check: `title.length > 60`
   - Action: Kürze Title auf 50-60 Zeichen, retry Phase 5A

2. **Meta Description Length Maximum** (threshold: 160 chars):
   - Check: `meta_description.length > 160`
   - Action: Kürze Description auf 150-160 Zeichen, retry Phase 5A

3. **Primary Keyword in Title** (threshold: true):
   - Check: `!title.toLowerCase().includes(primary_keyword.toLowerCase())`
   - Action: Integriere Primary Keyword natürlich in Title, retry Phase 5A

4. **Open Graph Title Missing**:
   - Check: `!openGraph['og:title']`
   - Action: Generiere og:title (kann identisch zu Title sein), retry Phase 5A

5. **Open Graph Description Missing**:
   - Check: `!openGraph['og:description']`
   - Action: Generiere og:description (kann identisch zu Meta Description sein), retry Phase 5A

6. **Twitter Card Type Missing**:
   - Check: `!twitterCard['twitter:card']`
   - Action: Setze twitter:card auf 'summary_large_image', retry Phase 5A

### WARNING Criteria (Proceed with Caution)

**Document in summary but continue to Phase 5B**:

1. **Title Length Minimum** (threshold: 50 chars):
   - Check: `title.length < 50`
   - Message: "Title Tag unter 50 Zeichen ({{actual}} chars) - könnte mehr Kontext nutzen"
   - Action: CONTINUE (dokumentiere in Summary)

2. **Meta Description Length Minimum** (threshold: 120 chars):
   - Check: `meta_description.length < 120`
   - Message: "Meta Description unter 120 Zeichen ({{actual}} chars)"
   - Action: CONTINUE (nutze verfügbare Zeichen für mehr Kontext)

3. **Open Graph Image Missing**:
   - Check: `!openGraph['og:image']`
   - Message: "Open Graph Image fehlt (Social Media Preview suboptimal)"
   - Action: CONTINUE (Image in Phase 6 manuell hinzufügen)

### INFO Criteria (Nice-to-Have)

**Optional checks that indicate good practices**:

1. **Canonical URL Present**:
   - Check: `canonical_url exists`
   - Message: "✓ Canonical URL definiert: {{canonical}}"

2. **Robots Meta Defined**:
   - Check: `robots exists`
   - Message: "✓ Robots Meta Tag definiert: {{robots}}"

---

## VALIDATION LOGIC

```python
def validate_phase_5a(metadata_json, primary_keyword):
    """Quality Gate nach Phase 5A - Metadata Optimization"""
    errors = []
    warnings = []
    infos = []

    # ERROR Checks
    if len(metadata_json['metadata']['title']) > 60:
        errors.append({
            'code': 'title_length_max',
            'message': f"Title Tag überschreitet 60 Zeichen ({len(metadata_json['metadata']['title'])} chars)",
            'action': 'RETRY: Kürze Title auf 50-60 Zeichen'
        })

    if primary_keyword.lower() not in metadata_json['metadata']['title'].lower():
        errors.append({
            'code': 'primary_keyword_in_title',
            'message': f"Primary Keyword '{primary_keyword}' fehlt in Title Tag",
            'action': 'RETRY: Integriere Primary Keyword natürlich in Title'
        })

    if len(metadata_json['metadata']['description']) > 160:
        errors.append({
            'code': 'meta_description_length_max',
            'message': f"Meta Description überschreitet 160 Zeichen ({len(metadata_json['metadata']['description'])} chars)",
            'action': 'RETRY: Kürze Description auf 150-160 Zeichen'
        })

    if not metadata_json['open_graph'].get('og:title'):
        errors.append({
            'code': 'og_title_missing',
            'message': 'Open Graph Title fehlt',
            'action': 'RETRY: Generiere og:title'
        })

    if not metadata_json['open_graph'].get('og:description'):
        errors.append({
            'code': 'og_description_missing',
            'message': 'Open Graph Description fehlt',
            'action': 'RETRY: Generiere og:description'
        })

    if not metadata_json['twitter_card'].get('twitter:card'):
        errors.append({
            'code': 'twitter_card_type_missing',
            'message': 'Twitter Card Type fehlt',
            'action': 'RETRY: Setze twitter:card auf summary_large_image'
        })

    # WARNING Checks
    if len(metadata_json['metadata']['title']) < 50:
        warnings.append({
            'code': 'title_length_min',
            'message': f"Title Tag unter 50 Zeichen ({len(metadata_json['metadata']['title'])} chars)",
            'action': 'CONTINUE: Dokumentiere in Summary'
        })

    if len(metadata_json['metadata']['description']) < 120:
        warnings.append({
            'code': 'meta_description_length_min',
            'message': f"Meta Description unter 120 Zeichen ({len(metadata_json['metadata']['description'])} chars)",
            'action': 'CONTINUE: Nutze verfügbare Zeichen'
        })

    if not metadata_json['open_graph'].get('og:image'):
        warnings.append({
            'code': 'og_image_missing',
            'message': 'Open Graph Image fehlt (Social Preview suboptimal)',
            'action': 'CONTINUE: Image in Phase 6 manuell hinzufügen'
        })

    # INFO Checks
    if metadata_json['metadata'].get('canonical_url'):
        infos.append({
            'code': 'canonical_url_present',
            'message': f"✓ Canonical URL definiert: {metadata_json['metadata']['canonical_url']}"
        })

    if metadata_json['metadata'].get('robots'):
        infos.append({
            'code': 'robots_meta_defined',
            'message': f"✓ Robots Meta Tag definiert: {metadata_json['metadata']['robots']}"
        })

    # Entscheidung
    if errors:
        return {
            'status': 'FAILED',
            'gate': 'phase_5a_metadata',
            'errors': errors,
            'warnings': warnings,
            'action': 'RETRY_REQUIRED'
        }
    elif warnings:
        return {
            'status': 'PASSED_WITH_WARNINGS',
            'gate': 'phase_5a_metadata',
            'warnings': warnings,
            'infos': infos,
            'action': 'CONTINUE'
        }
    else:
        return {
            'status': 'PASSED',
            'gate': 'phase_5a_metadata',
            'infos': infos,
            'action': 'CONTINUE'
        }
```

---

## RETRY LOGIC (Max 1× Wiederholung)

**Pattern**:
1. Erste Generierung von `seo-metadata.json`
2. Quality Gate Validation
3. **Wenn ERROR**:
   - Log: "Quality Gate 5A FAILED - Initiating Retry (1/1)"
   - Retry Generierung mit angepassten Parametern (z.B. kürzerer Title)
   - Quality Gate Validation (zweiter Versuch)
   - **Wenn ERROR bleibt**:
     - Log: "Quality Gate 5A FAILED after Retry - Escalating to Main Agent"
     - Return: FAILED Status mit Error Details
     - Main Agent entscheidet über Fortsetzung
4. **Wenn PASSED oder PASSED_WITH_WARNINGS**: Fortfahren zu Phase 5B

**Keine Infinite Retries**: Max 1× Retry verhindert Token-Verschwendung durch sinnlose Wiederholungen.

---

## OUTPUT FORMAT (Return to Main Agent)

```json
{
  "phase": "5A",
  "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
  "deliverables": [
    "seo/seo-metadata.json"
  ],
  "quality_gate": {
    "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
    "errors": [],
    "warnings": [
      {
        "code": "og_image_missing",
        "message": "Open Graph Image fehlt (Social Preview suboptimal)",
        "action": "CONTINUE: Image in Phase 6 manuell hinzufügen"
      }
    ],
    "infos": [
      {
        "code": "canonical_url_present",
        "message": "✓ Canonical URL definiert: https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
      }
    ]
  },
  "validation": {
    "title_length": 58,
    "description_length": 155,
    "primary_keyword_in_title": true,
    "canonical_format_valid": true
  },
  "summary": "Metadata für 'pferd kaufen worauf achten' generiert. Title: 58 chars, Description: 155 chars, Primary Keyword integriert. Open Graph und Twitter Cards vollständig. ⚠️ WARNING: Open Graph Image fehlt (Social Preview suboptimal), kann in Phase 6 manuell hinzugefügt werden."
}
```

**Summary Guidelines**:
- Max 150-200 Wörter
- Erwähne alle ERROR/WARNING Findings
- Bestätige successful Validations
- Konkrete nächste Schritte wenn FAILED

---

**Version**: 1.0 (2025-01-04)
**Token Budget**: ~150 Tokens (inkl. Quality Gate Validation)
**Execution Time**: ~3 Minuten
**Priority**: HIGH (Core SEO Deliverable)
