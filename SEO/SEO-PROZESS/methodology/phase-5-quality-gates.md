# Phase 5 Quality Gates - On-Page SEO Validation

## Übersicht

Dieses Dokument definiert die **granularen Quality Gates** für Phase 5 (On-Page SEO Optimization).

**Zweck**: Frühe Fehlererkennung durch Sub-Phase-spezifische Validierung statt monolithischer End-of-Phase Prüfung.

**Architektur-Pattern**:
- Jede Sub-Phase (5A, 5B, 5C) hat eigenen Quality Gate
- Sub-Agent validiert nach Deliverable-Erstellung
- Bei ERROR: Sofortiger Retry (max 1× Wiederholung)
- Bei WARNING: Fortfahren mit Dokumentation im Summary
- Bei INFO: Fortfahren ohne Aktion

---

## Quality Gate 5A: Metadata Optimization

**Validiert**: `seo/seo-metadata.json`

### ERROR Criteria (Hard Fail - Retry Required)

```json
{
  "title_length_max": {
    "threshold": 60,
    "check": "title.length > 60",
    "message": "Title Tag überschreitet 60 Zeichen ({{actual}} chars)",
    "action": "RETRY: Kürze Title auf 50-60 Zeichen"
  },
  "meta_description_length_max": {
    "threshold": 160,
    "check": "meta_description.length > 160",
    "message": "Meta Description überschreitet 160 Zeichen ({{actual}} chars)",
    "action": "RETRY: Kürze Description auf 150-160 Zeichen"
  },
  "primary_keyword_in_title": {
    "threshold": true,
    "check": "!title.toLowerCase().includes(primary_keyword.toLowerCase())",
    "message": "Primary Keyword '{{keyword}}' fehlt in Title Tag",
    "action": "RETRY: Integriere Primary Keyword natürlich in Title"
  },
  "og_title_missing": {
    "threshold": true,
    "check": "!openGraph.title",
    "message": "Open Graph Title fehlt",
    "action": "RETRY: Generiere og:title (kann identisch zu Title sein)"
  },
  "og_description_missing": {
    "threshold": true,
    "check": "!openGraph.description",
    "message": "Open Graph Description fehlt",
    "action": "RETRY: Generiere og:description (kann identisch zu Meta Description sein)"
  },
  "twitter_card_type_missing": {
    "threshold": true,
    "check": "!twitterCard.card",
    "message": "Twitter Card Type fehlt",
    "action": "RETRY: Setze twitter:card auf 'summary_large_image'"
  }
}
```

### WARNING Criteria (Proceed with Caution)

```json
{
  "title_length_min": {
    "threshold": 50,
    "check": "title.length < 50",
    "message": "Title Tag unter 50 Zeichen ({{actual}} chars) - könnte mehr Kontext nutzen",
    "action": "CONTINUE: Dokumentiere in Summary, aber fahre fort"
  },
  "meta_description_length_min": {
    "threshold": 120,
    "check": "meta_description.length < 120",
    "message": "Meta Description unter 120 Zeichen ({{actual}} chars)",
    "action": "CONTINUE: Nutze verfügbare Zeichen für mehr Kontext"
  },
  "og_image_missing": {
    "threshold": false,
    "check": "!openGraph.image",
    "message": "Open Graph Image fehlt (Social Media Preview suboptimal)",
    "action": "CONTINUE: Image in Phase 6 manuell hinzufügen"
  }
}
```

### INFO Criteria (Nice-to-Have)

```json
{
  "canonical_url_present": {
    "check": "canonical",
    "message": "✓ Canonical URL definiert: {{canonical}}"
  },
  "robots_meta_defined": {
    "check": "robots",
    "message": "✓ Robots Meta Tag definiert: {{robots}}"
  }
}
```

---

## Quality Gate 5B: Schema Markup Validation

**Validiert**: `seo/schema-article.json`, `seo/schema-faq.json` (optional), `seo/schema-howto.json` (optional), `seo/schema-breadcrumb.json`

### ERROR Criteria (Hard Fail - Retry Required)

```json
{
  "article_schema_missing": {
    "threshold": true,
    "check": "!exists('seo/schema-article.json')",
    "message": "Article Schema fehlt - PRIMARY REQUIREMENT!",
    "action": "RETRY: Generiere Article Schema (PFLICHT für jeden Content)"
  },
  "article_schema_invalid_json": {
    "threshold": true,
    "check": "!isValidJSON('seo/schema-article.json')",
    "message": "Article Schema enthält ungültiges JSON",
    "action": "RETRY: Validiere JSON-LD Syntax"
  },
  "article_schema_missing_context": {
    "threshold": true,
    "check": "!schema['@context'] || schema['@context'] !== 'https://schema.org'",
    "message": "@context fehlt oder ist nicht 'https://schema.org'",
    "action": "RETRY: Füge '@context': 'https://schema.org' hinzu"
  },
  "article_schema_missing_type": {
    "threshold": true,
    "check": "!schema['@type'] || schema['@type'] !== 'Article'",
    "message": "@type fehlt oder ist nicht 'Article'",
    "action": "RETRY: Setze '@type': 'Article'"
  },
  "article_schema_missing_headline": {
    "threshold": true,
    "check": "!schema.headline",
    "message": "headline property fehlt in Article Schema",
    "action": "RETRY: Nutze Title Tag als headline"
  },
  "article_schema_missing_author": {
    "threshold": true,
    "check": "!schema.author || !schema.author.name",
    "message": "author.name fehlt in Article Schema (E-E-A-T kritisch!)",
    "action": "RETRY: Füge author: {name: 'PferdeWert Redaktion', url: 'https://www.pferdewert.de'} hinzu"
  },
  "min_schema_types_count": {
    "threshold": 2,
    "check": "schemaCount < 2",
    "message": "Nur {{actual}} Schema Markup Typen statt min 2 (Article + FAQ/HowTo/Breadcrumb)",
    "action": "RETRY: Generiere zusätzlichen Schema-Typ basierend auf Content"
  }
}
```

### WARNING Criteria (Proceed with Caution)

```json
{
  "faq_schema_missing_when_paa_present": {
    "threshold": true,
    "check": "paa_questions.length > 0 && !exists('seo/schema-faq.json')",
    "message": "PAA Questions vorhanden ({{count}}), aber kein FAQ Schema generiert",
    "action": "CONTINUE: FAQ Schema wäre ideal, aber nicht kritisch"
  },
  "breadcrumb_schema_missing": {
    "threshold": false,
    "check": "!exists('seo/schema-breadcrumb.json')",
    "message": "Breadcrumb Schema fehlt (verbessert Navigation Context)",
    "action": "CONTINUE: Breadcrumb Schema in Phase 6 manuell hinzufügen"
  },
  "article_image_missing": {
    "threshold": false,
    "check": "!schema.image",
    "message": "image property fehlt in Article Schema (Google bevorzugt Bilder)",
    "action": "CONTINUE: Image in Phase 6 hinzufügen"
  }
}
```

### INFO Criteria (Nice-to-Have)

```json
{
  "howto_schema_present": {
    "check": "exists('seo/schema-howto.json')",
    "message": "✓ HowTo Schema vorhanden (ideal für Tutorial-Content)"
  },
  "faq_schema_present": {
    "check": "exists('seo/schema-faq.json')",
    "message": "✓ FAQ Schema vorhanden ({{questionCount}} Fragen integriert)"
  },
  "breadcrumb_schema_present": {
    "check": "exists('seo/schema-breadcrumb.json')",
    "message": "✓ Breadcrumb Schema vorhanden (Navigation Context für Google)"
  }
}
```

---

## Quality Gate 5C: Internal Linking Validation

**Validiert**: `seo/internal-linking.json`

### ERROR Criteria (Hard Fail - Retry Required)

```json
{
  "min_internal_links": {
    "threshold": 3,
    "check": "links.length < 3",
    "message": "Nur {{actual}} interne Links statt min 3",
    "action": "RETRY: Finde zusätzliche relevante Ratgeber-Links aus sitemap.xml"
  },
  "broken_link_detected": {
    "threshold": 0,
    "check": "links.some(link => !sitemap.includes(link.url))",
    "message": "Link zu {{url}} nicht in sitemap.xml gefunden (potenzieller 404!)",
    "action": "RETRY: Validiere alle Links gegen sitemap.xml, entferne ungültige"
  },
  "duplicate_anchor_text": {
    "threshold": true,
    "check": "new Set(links.map(l => l.anchor)).size < links.length",
    "message": "Doppelter Anchor Text erkannt: {{duplicates}}",
    "action": "RETRY: Variiere Anchor Texte für bessere UX"
  },
  "empty_anchor_text": {
    "threshold": 0,
    "check": "links.some(link => !link.anchor || link.anchor.trim() === '')",
    "message": "Leerer Anchor Text bei Link zu {{url}}",
    "action": "RETRY: Generiere beschreibenden Anchor Text"
  }
}
```

### WARNING Criteria (Proceed with Caution)

```json
{
  "optimal_internal_links": {
    "threshold": 5,
    "check": "links.length < 5",
    "message": "{{actual}} interne Links (optimal wären 5-7 für bessere Topic Clustering)",
    "action": "CONTINUE: Mehr Links wären gut, aber nicht kritisch"
  },
  "low_contextual_relevance": {
    "threshold": 0.6,
    "check": "links.some(link => link.relevance < 0.6)",
    "message": "Link zu {{url}} hat niedrige Relevanz ({{score}})",
    "action": "CONTINUE: Link ist gültig, könnte aber relevanter sein"
  },
  "generic_anchor_text": {
    "threshold": 0,
    "check": "links.some(link => ['hier', 'klicken', 'mehr'].includes(link.anchor.toLowerCase()))",
    "message": "Generischer Anchor Text erkannt: '{{anchor}}'",
    "action": "CONTINUE: Generische Anchors funktionieren, beschreibende sind besser"
  }
}
```

### INFO Criteria (Nice-to-Have)

```json
{
  "diverse_link_targets": {
    "check": "links.map(l => new URL(l.url).pathname.split('/')[1]).filter((v,i,a) => a.indexOf(v) === i).length > 1",
    "message": "✓ Links zu {{count}} verschiedenen Ratgeber-Kategorien (gute Topic Diversity)"
  },
  "keyword_in_anchor": {
    "check": "links.some(link => link.anchor.toLowerCase().includes(primary_keyword.split(' ')[0]))",
    "message": "✓ Primary Keyword in Anchor Text integriert (SEO+)"
  }
}
```

---

## Validation Logic (Pseudo-Code)

```python
def validate_phase_5a(metadata_json):
    """Quality Gate nach Phase 5A - Metadata Optimization"""
    errors = []
    warnings = []
    infos = []

    # ERROR Checks
    if len(metadata_json['title']) > 60:
        errors.append({
            'code': 'title_length_max',
            'message': f"Title Tag überschreitet 60 Zeichen ({len(metadata_json['title'])} chars)",
            'action': 'RETRY: Kürze Title auf 50-60 Zeichen'
        })

    if primary_keyword.lower() not in metadata_json['title'].lower():
        errors.append({
            'code': 'primary_keyword_in_title',
            'message': f"Primary Keyword '{primary_keyword}' fehlt in Title Tag",
            'action': 'RETRY: Integriere Primary Keyword natürlich in Title'
        })

    # ... weitere ERROR checks

    # WARNING Checks
    if len(metadata_json['title']) < 50:
        warnings.append({
            'code': 'title_length_min',
            'message': f"Title Tag unter 50 Zeichen ({len(metadata_json['title'])} chars)",
            'action': 'CONTINUE: Dokumentiere in Summary'
        })

    # ... weitere WARNING checks

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


def validate_phase_5b(schema_files):
    """Quality Gate nach Phase 5B - Schema Markup"""
    # Analog zu 5A, validiert alle Schema JSONs
    pass


def validate_phase_5c(internal_links_json, sitemap_urls):
    """Quality Gate nach Phase 5C - Internal Linking"""
    # Analog zu 5A, validiert Links gegen Sitemap
    pass
```

---

## Integration in Sub-Agent Prompts

### Beispiel: Phase 5A Sub-Agent Prompt

```markdown
## PHASE 5A: METADATA OPTIMIZATION

**Tasks**:
1. Read `content/article-draft.md` + `planning/content-outline.json`
2. Generate `seo/seo-metadata.json`
3. **QUALITY GATE**: Validate gegen `methodology/phase-5-quality-gates.md` (Section: Quality Gate 5A)
4. Return Summary

**Quality Gate Actions**:
- Bei ERROR: Retry Metadata-Generierung (max 1× Wiederholung)
- Bei WARNING: Dokumentiere in Summary, fahre fort
- Bei PASSED: Fahre fort zu nächstem Task

**Output Format**:
```json
{
  "phase": "5A",
  "status": "PASSED" | "PASSED_WITH_WARNINGS" | "FAILED",
  "deliverables": ["seo/seo-metadata.json"],
  "quality_gate": {
    "errors": [],
    "warnings": [...]
  },
  "summary": "150-200 Wörter Zusammenfassung"
}
```
```

---

## Retry Logic (Max 1× Wiederholung)

**Pattern**:
1. Erste Generierung des Deliverables
2. Quality Gate Validation
3. **Wenn ERROR**:
   - Log: "Quality Gate 5A FAILED - Initiating Retry (1/1)"
   - Retry Generierung mit angepassten Parametern
   - Quality Gate Validation (zweiter Versuch)
   - **Wenn ERROR bleibt**:
     - Log: "Quality Gate 5A FAILED after Retry - Escalating to Main Agent"
     - Return: FAILED Status mit Error Details
     - Main Agent entscheidet über Fortsetzung
4. **Wenn PASSED oder PASSED_WITH_WARNINGS**: Fortfahren

**Keine Infinite Retries**: Max 1× Retry verhindert Token-Verschwendung durch sinnlose Wiederholungen.

---

## Output Files (Quality Reports)

Jeder Quality Gate erstellt Mini-Report in Summary:

```markdown
### Quality Gate 5A - Metadata Optimization

**Status**: ✅ PASSED_WITH_WARNINGS

**Deliverables**:
- ✅ `seo/seo-metadata.json` (512 bytes)

**Validierung**:
- ✅ Title Tag: 58 chars (valid range 50-60)
- ✅ Meta Description: 155 chars (valid range 120-160)
- ✅ Primary Keyword "pferd kaufen" in Title
- ✅ Open Graph Tags vollständig
- ⚠️  WARNING: Open Graph Image fehlt (Social Preview suboptimal)

**Errors**: 0
**Warnings**: 1
**Action**: CONTINUE to Phase 5B
```

---

## Benefits der Granularen Quality Gates

1. **Frühe Fehlererkennung**: ERROR in 5A wird sofort erkannt, nicht erst nach 5E
2. **Schnellere Retries**: Nur fehlerhafte Sub-Phase wiederholen, nicht gesamte Phase 5
3. **Bessere Debugging Experience**: Klare Fehlermeldungen mit konkreten Aktionen
4. **Dokumentierte Warnings**: Alle Sub-Optimal Cases werden getrackt, nicht vergessen
5. **Flexible Validierung**: ERROR/WARNING/INFO Severity erlaubt nuancierte Entscheidungen

---

**Version**: 1.0 (2025-01-04)
**Priority**: HIGH (laut Optimization Analysis)
**Effort**: ~1h Implementation
**Token Impact**: Minimal (~50 tokens pro Quality Gate Check)
