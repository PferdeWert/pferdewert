# Phase 5: On-Page SEO Optimization

**Token Budget**: ~400 Tokens
**Main Deliverables**: `seo-metadata.json`, Schema Markup JSONs, `internal-linking.json`
**Agent Pattern**: Sub-Agent (Metadata + Schema + Links)

---

## Phase 5A: Metadata Optimization (Sub-Agent)

**WICHTIG**: Alle Metadata-Tasks via `seo-content-writer` Agent delegation.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Create SEO metadata and schema markup</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Erstelle SEO-Metadaten und Schema Markup basierend auf dem finalen Artikel aus Phase 4.

## DATEN (JSON):
{
  "article_content": "...",        // Final article text from Phase 4
  "primary_keyword": "...",         // From Phase 1
  "supporting_keywords": [...],     // From Phase 1
  "paa_questions": [...],           // From Phase 2 für FAQ Schema
  "content_outline": {...},         // From Phase 3 für Structure
  "sitemap": [...]                  // Existing Ratgeber URLs for internal linking validation
}

## AUFGABE - STEP-BY-STEP:

**Phase 5A**: Erstelle Title Tag + Meta Description + OG/Twitter Tags
**Phase 5B**: Generiere Schema Markup (Article + FAQ/HowTo + Breadcrumb)
**Phase 5C**: Identifiziere interne Links (mit Sitemap-Validation)
**Phase 5D**: Optimiere URL Slug
**Phase 5E**: Validiere alle Outputs (JSON-LD Syntax, Length Checks)

---

## PHASE 5A: METADATA OPTIMIZATION

### 1. Title Tag Optimization

**KRITISCHE Anforderungen**:
- **Länge**: 50-60 Zeichen (inkl. Leerzeichen)
- **Primary Keyword**: MUSS am Anfang stehen
- **Brand**: Optional am Ende "| PferdeWert.de"
- **Compelling**: Neugier wecken, nicht nur Keyword-Stuffing

**Best Practices**:
- Power Words verwenden: "Guide", "Tipps", "Checkliste", "Einfach"
- Zahlen integrieren wenn möglich: "5 Tipps...", "3 wichtigste..."
- Emotionale Trigger: "sicher", "erfolgreich", "vertrauensvoll"

**Beispiele**:
- ✅ "Pferd kaufen: 5 Tipps für sicheren Pferdekauf | PferdeWert.de"
- ✅ "Pferdekauf Guide - Worauf achten beim Pferd kaufen?"
- ❌ "Pferd kaufen worauf achten pferd kaufen tipps" (Keyword-Stuffing)
- ❌ "Alles was du über den Pferdekauf wissen musst um ein..." (zu lang)

---

### 2. Meta Description Optimization

**KRITISCHE Anforderungen**:
- **Länge**: 150-160 Zeichen (inkl. Leerzeichen)
- **Primary Keyword**: Natürlich integriert
- **Call-to-Action**: Klar formuliert
- **Unique Value Proposition**: Was macht diesen Artikel besonders?

**Best Practices**:
- Frage + Antwort-Format nutzen
- Nutzen klar kommunizieren: "Erfahre wie...", "Lerne..."
- Pain Point adressieren: "Vermeide Fehler beim..."
- Dringlichkeit schaffen: "Jetzt...", "Heute..."

**Beispiele**:
- ✅ "Pferd kaufen: Unsere Experten-Checkliste hilft dir, Fehler zu vermeiden. Erfahre, worauf du bei Gesundheitscheck & Kaufvertrag achten musst."
- ✅ "Worauf beim Pferdekauf achten? Praktischer Guide mit 5 wichtigen Tipps für sicheren Kauf. Von Tierärzten empfohlen."
- ❌ "Dieser Artikel erklärt alles über den Pferdekauf" (zu generic)

---

### 3. Image Optimization (Featured Image + OG Image)

**KRITISCHE Anforderungen**:
- **Open Graph Image**: 1200x630 Pixel (optimal für Facebook/LinkedIn)
- **Alt Text**: Beschreibend + Primary Keyword integriert (Accessibility + SEO)
- **Dateiname**: SEO-friendly, hyphen-separated, keyword-rich
- **Komprimierung**: WebP-Format bevorzugt, max 200KB Dateigröße
- **Absolute URL**: Vollständiger HTTPS-Pfad erforderlich

**Featured Image Strategie**:
1. **Primäres Bild** (falls verfügbar):
   - Custom-Foto zum Thema (z.B. Pferdekauf-Szene, Gesundheitscheck)
   - Professionelle Qualität, relevantes Motiv
   - Text-Overlays möglich aber nicht erforderlich

2. **Fallback-Strategie** (falls kein Custom-Bild):
   - Standard PferdeWert.de OG-Bild: `https://pferdewert.de/images/og-default.jpg`
   - Beinhaltet Logo + generisches Pferde-Motiv

**Alt Text Best Practices**:
- ✅ "Tierarzt beim Gesundheitscheck vor dem Pferdekauf - Worauf achten?"
- ✅ "Kaufvertrag Pferd unterschreiben - Wichtige Dokumente beim Pferdekauf"
- ❌ "Bild1.jpg" (nicht beschreibend)
- ❌ "Pferd kaufen worauf achten pferd kaufen tipps kaufen" (Keyword-Stuffing)

**Dateiname Convention**:
```
Format: {primary-keyword}-{descriptor}.{ext}
Beispiele:
✅ pferdekauf-gesundheitscheck.webp
✅ pferd-kaufen-vertrag-unterschreiben.jpg
❌ IMG_1234.jpg
❌ Pferd Kaufen Bild.png (Leerzeichen, Großbuchstaben)
```

**Output Format**:
```json
{
  "featured_image": {
    "url": "https://pferdewert.de/images/pferdekauf-gesundheitscheck.webp",
    "alt": "Tierarzt beim Gesundheitscheck vor dem Pferdekauf",
    "width": 1200,
    "height": 630,
    "format": "webp",
    "file_size_kb": 145
  }
}
```

**WICHTIG**:
- Falls kein Custom-Bild verfügbar: Nutze Fallback `og-default.jpg`
- Alt Text MUSS immer gesetzt werden (WCAG 2.1 Compliance)
- OG Image wird automatisch in Phase 5A.4 (Open Graph Tags) referenziert

---

### 4. Social Media Tags (Open Graph + Twitter Cards)

**DRY-Prinzip**: Gemeinsame Metadata + Platform-spezifische Overrides

**Basis-Metadata** (geteilt zwischen OG + Twitter):
```json
{
  "social_metadata": {
    "title": "Pferd kaufen: 5 Experten-Tipps für sicheren Pferdekauf",
    "description": "Vermeide teure Fehler beim Pferdekauf! Unsere Checkliste zeigt, worauf du achten musst.",
    "image": "https://pferdewert.de/images/pferdekauf-guide.jpg",
    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten"
  }
}
```

**Platform-Spezifische Overrides**:
```json
{
  "og_overrides": {
    "type": "article"
  },
  "twitter_overrides": {
    "card": "summary_large_image",
    "description": "Vermeide teure Fehler beim Pferdekauf! Checkliste mit 5 Experten-Tipps."
  }
}
```

**Rendering-Logik** (für Implementation):
- **Open Graph Tags**: `social_metadata` + `og_overrides`
  - `og:title` = `social_metadata.title`
  - `og:description` = `social_metadata.description`
  - `og:image` = `social_metadata.image`
  - `og:url` = `social_metadata.url`
  - `og:type` = `og_overrides.type`

- **Twitter Card Tags**: `social_metadata` + `twitter_overrides`
  - `twitter:card` = `twitter_overrides.card`
  - `twitter:title` = `social_metadata.title`
  - `twitter:description` = `twitter_overrides.description` (max 120 chars, gekürzt falls nötig)
  - `twitter:image` = `social_metadata.image`

**WICHTIG**:
- Twitter Description max 120 Zeichen (vs. 150-160 Standard Meta Description)
- Falls kein `twitter_overrides.description` gesetzt: Automatisch aus `social_metadata.description` kürzen
- Image muss identisch sein (1200x630 funktioniert für beide Platforms)

### 5. Canonical URL (Duplicate Content Prevention)

**KRITISCH**: Canonical URL verhindert Duplicate Content Penalties durch Konsolidierung von URL-Varianten.

**1. URL Normalization Rules**:
- **Protocol**: Immer `https://` (nie http://)
- **Domain**: Ohne `www.` → `pferdewert.de` (konsistent über alle URLs)
- **Trailing Slash**: Ohne Trailing Slash (außer Root: `https://pferdewert.de/`)
- **Lowercase**: Alle Buchstaben lowercase (bereits via URL Slug Rules)
- **Hyphens**: Als Wort-Trenner (keine Underscores)

**2. Tracking Parameter Stripping** (UTM & Analytics):
Folgende Query Parameter werden aus Canonical URL entfernt:
```
utm_source, utm_medium, utm_campaign, utm_content, utm_term
fbclid, gclid, msclkid
ref, source, campaign
```

**3. Query Parameter Whitelist** (erlaubte Parameter):
Nur funktionale Parameter behalten:
- `page` → Pagination (z.B. `/ratgeber/artikel?page=2`)
- `sort` → Sortierung (falls relevant)
- **NICHT** behalten: Tracking, Session-IDs, temporäre Tokens

**4. Canonical URL Format**:
```
https://pferdewert.de/pferde-ratgeber/{url-slug}

Beispiele:
✅ https://pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten
✅ https://pferdewert.de/pferde-ratgeber/pferdekaufvertrag
✅ https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen
❌ https://www.pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten/ (www + trailing slash)
❌ https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten (WRONG - old base path)
❌ https://pferdewert.de/pferde-ratgeber/artikel?utm_source=facebook (tracking param)
```

**CRITICAL**: Base path is `/pferde-ratgeber/` NOT `/ratgeber/`. See `SEO/URL-STRUCTURE-GUIDELINES.md` for full details.

**5. Cross-Domain Canonicals** (falls anwendbar):
Falls Content auf mehreren Domains existiert (z.B. Staging, Partner-Sites):
- Immer auf Production Domain verweisen: `https://pferdewert.de/...`
- NIEMALS auf Staging/Dev: `https://staging.pferdewert.de/...`

**Output Format**:
```json
{
  "canonical_url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten",
  "original_url": "https://www.pferdewert.de/ratgeber/pferd-kaufen-worauf-achten/?utm_source=facebook&utm_medium=social",
  "stripped_params": ["utm_source", "utm_medium"],
  "normalized": ["removed_www", "removed_trailing_slash", "protocol_https"]
}
```

**WICHTIG**:
- Canonical URL MUSS mit finaler Live-URL übereinstimmen (nach Normalisierung)
- Bei Pagination: `?page=2` behält separaten Canonical (keine Konsolidierung zu Page 1)
- Self-referencing Canonical erlaubt (URL zeigt auf sich selbst nach Normalisierung)

---

## Phase 5B: Schema Markup Generation (Sub-Agent)

**KRITISCH**: Verwende JSON-LD Format für alle Schemas. Referenziere `methodology/schema-markup.md` für Templates.

### 1. Article Schema (PFLICHT)

**Zweck**: Google versteht Artikel-Struktur und zeigt Rich Snippets.

**Erforderliche Felder**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",                    // Title Tag Content
  "description": "...",                 // Meta Description
  "image": "...",                       // Featured Image URL
  "author": {
    "@type": "Person",
    "name": "PferdeWert.de Redaktion",
    "url": "https://pferdewert.de/ueber-uns"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    }
  },
  "datePublished": "2025-01-04",
  "dateModified": "2025-01-04",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pferdewert.de/pferde-ratgeber/{slug}"
  }
}
```

**WICHTIG**: Alle URLs müssen absolute URLs sein (https://...).

---

### 2. FAQ Schema (falls PAA integriert)

**Zweck**: PAA-Fragen erscheinen direkt in Google SERP.

**Format**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein gesundes Pferd?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein gesundes Pferd kostet durchschnittlich 5.000-15.000 Euro, abhängig von Rasse, Ausbildung und Alter. Zusätzlich fallen Kosten für Gesundheitscheck (300-500€) und Kaufuntersuchung an."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Dokumente brauche ich beim Pferdekauf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beim Pferdekauf benötigst du: Equidenpass, Kaufvertrag, Eigentumsurkunde, Gesundheitszeugnis der letzten Untersuchung. Optional: Abstammungsurkunde bei Zuchtpferden."
      }
    }
  ]
}
```

**Regel**: Max 5-8 FAQ-Einträge für optimale Darstellung.

---

### 3. HowTo Schema (falls Tutorial-Content)

**Zweck**: Step-by-Step Anleitungen erscheinen als Rich Results.

**Wann verwenden?**:
- Artikel enthält klare Schritt-für-Schritt-Anleitung
- Mindestens 3 definierte Steps
- Praktische Handlungsanweisungen (nicht nur Theorie)

**Format**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Pferdekauf: Schritt-für-Schritt Anleitung",
  "description": "So kaufst du ein Pferd sicher und erfolgreich",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Budget festlegen",
      "text": "Definiere dein Budget inklusive Kaufpreis, Gesundheitscheck und laufende Kosten.",
      "itemListElement": [
        {
          "@type": "HowToDirection",
          "text": "Berechne monatliche Kosten für Stall, Futter, Tierarzt"
        }
      ]
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Gesundheitscheck durchführen",
      "text": "Lasse einen Tierarzt das Pferd gründlich untersuchen."
    }
  ]
}
```

---

### 4. Breadcrumb Schema (Navigation)

**Zweck**: Breadcrumb-Navigation in SERP anzeigen.

**Format**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pferdewert.de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ratgeber",
      "item": "https://pferdewert.de/pferde-ratgeber"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pferd kaufen: Worauf achten",
      "item": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten"
    }
  ]
}
```

**VALIDATION (CRITICAL)**:
- JSON-LD Syntax Check: Validiere alle Schema JSONs auf korrekte Syntax
- Pflichtfelder: Prüfe dass alle required fields vorhanden sind
- URL Format: Alle URLs müssen absolute URLs sein (https://...)
- Google Rich Results Test empfohlen: https://search.google.com/test/rich-results

---

## Phase 5C: Internal Linking Strategy (Sub-Agent)

**WICHTIG**: Fokus auf natürliche, kontextuelle Links zu bestehenden PferdeWert.de Ratgeber-Seiten.

### Linking-Regeln:

**1. Contextual Relevance**:
- Link nur wenn thematisch relevant
- Anchor Text muss natürlich im Satz-Flow stehen
- Keine erzwungenen "Hier klicken" Links

**2. Anchor Text Best Practices**:
- ✅ "Erfahre mehr über [Pferdewert ermitteln](link)"
- ✅ "Unsere [Pferdewert-Bewertung](link) hilft dir dabei"
- ❌ "Klicke hier für mehr Infos"
- ❌ "Weitere Informationen findest du auf dieser Seite"

**3. Link-Platzierung**:
- Erste 200 Wörter: 0-1 Links (nicht zu früh)
- Middle Content: 2-4 Links (natürlich verteilt)
- Conclusion: 1-2 Links (Related Content)

**4. Anzahl**:
- **Min 3 interne Links** (Quality Gate)
- **Max 8 interne Links** (nicht zu viel)
- Fokus auf relevanteste Ratgeber-Artikel

**5. Sitemap Validation** (CRITICAL):
- Prüfe ob `target_url` in vorhandener Sitemap existiert
- Falls nicht in Sitemap → NICHT verlinken (verhindert 404s)
- Fallback: Bei < 3 validen Links → suche thematisch ähnliche URLs aus Sitemap
- Sitemap liegt als JSON im Input (siehe Sub-Agent Prompt oben)

---

### Beispiel Internal Linking Map:

```json
{
  "internal_links": [
    {
      "section": "Einleitung",
      "anchor_text": "Pferdewert ermitteln",
      "target_url": "/pferde-ratgeber/pferdewert-ermitteln",
      "context": "Bevor du ein Pferd kaufst, solltest du den fairen Marktwert kennen. Nutze unsere [Pferdewert ermitteln] Funktion.",
      "relevance": "high"
    },
    {
      "section": "Gesundheitscheck",
      "anchor_text": "Pferd Gesundheitscheck Kosten",
      "target_url": "/pferde-ratgeber/pferd-gesundheitscheck-kosten",
      "context": "Die [Pferd Gesundheitscheck Kosten] variieren je nach Umfang der Untersuchung.",
      "relevance": "high"
    },
    {
      "section": "Kaufvertrag",
      "anchor_text": "Pferdekauf Kaufvertrag Muster",
      "target_url": "/pferde-ratgeber/pferdekaufvertrag",
      "context": "Verwende unser [Pferdekauf Kaufvertrag Muster] um rechtlich abgesichert zu sein.",
      "relevance": "medium"
    }
  ]
}
```

---

### Linking-Opportunities Identifizieren:

**Frage dich bei jedem Abschnitt**:
- Welche verwandten Themen gibt es im PferdeWert.de Ratgeber?
- Wo würde ein Link dem User ECHTEN Mehrwert bieten?
- Passt der Link natürlich in den Textfluss?

**Automatische Link-Kandidaten**:
- Primary Service (Pferdewert-Bewertung) → Min 1x verlinken
- Related How-To Guides → 2-3x verlinken
- Supporting Content (Checklisten, Vorlagen) → 1-2x verlinken

---

## Phase 5D: URL Slug Optimization (Sub-Agent)

**WICHTIG**: SEO-friendly URL-Struktur für optimales Ranking.

### Slug-Regeln:

**1. Format**:
- Lowercase only: `pferd-kaufen-worauf-achten`
- Bindestriche als Trenner: ✅ `pferd-kaufen` ❌ `pferd_kaufen`
- Keine Umlaute - Ersetze nach Standard-Mapping:
  - `ä` → `ae` (Beispiel: `ähnlich` → `aehnlich`)
  - `ö` → `oe` (Beispiel: `schön` → `schoen`)
  - `ü` → `ue` (Beispiel: `über` → `ueber`)
  - `ß` → `ss` (Beispiel: `groß` → `gross`)
  - `Ä` → `Ae` (dann lowercase)
  - `Ö` → `Oe` (dann lowercase)
  - `Ü` → `Ue` (dann lowercase)
- Keine Sonderzeichen: ✅ `pferd-kaufen` ❌ `pferd-kaufen?`

**2. Länge**:
- Optimal: 3-5 Wörter
- Max: 60 Zeichen
- Fokus auf wichtigste Keywords

**3. Keyword-Integration**:
- Primary Keyword MUSS im Slug sein
- Supporting Keywords optional
- Stop Words entfernen wenn zu lang: ✅ `pferd-kaufen-tipps` ❌ `pferd-kaufen-die-besten-tipps`

**Beispiele**:
- Primary Keyword: "pferd kaufen worauf achten"
- ✅ Slug: `pferd-kaufen-worauf-achten`
- ✅ Slug: `pferdekauf-worauf-achten`
- ❌ Slug: `pferd-kaufen-worauf-achten-guide-2025` (zu lang)
- ❌ Slug: `artikel-pferdekauf` (Primary Keyword fehlt)

---

## Quality Gate Phase 5

Prüfe ob alle On-Page SEO-Elemente korrekt erstellt wurden:

### ERROR (Hard Fail - Retry Required):
❌ **Title Tag > 60 Zeichen** → Kürzen und Phase 5A wiederholen
❌ **Meta Description > 160 Zeichen** → Kürzen und Phase 5A wiederholen
❌ **Primary Keyword fehlt in Title** → Überarbeiten und Phase 5A wiederholen
❌ **< 2 Schema Markup Typen** → Min FAQ oder Breadcrumb hinzufügen (Phase 5B)
❌ **URL Slug enthält Umlaute oder Sonderzeichen** → Korrigieren (Phase 5D)
❌ **Article Schema fehlt** → Essentiell für Ratgeber-Content (Phase 5B)

### WARNING (Proceed mit Caution):
⚠️ **Title Tag < 50 Zeichen** → Suboptimal, aber erlaubt (mehr Keyword-Platz verschenkt)
⚠️ **Meta Description < 150 Zeichen** → Suboptimal, aber erlaubt
⚠️ **Nur 2 interne Links statt 3** → Akzeptabel wenn thematisch begrenzt
⚠️ **Keine Twitter Cards** → Optional, aber empfohlen für Social Sharing

### INFO (Nice-to-Have):
ℹ️ **Breadcrumb Schema vorhanden** → Bonus für Navigation
ℹ️ **HowTo Schema bei Tutorial-Content** → Bonus für Rich Snippets
ℹ️ **> 3 interne Links** → Stärkere interne Verlinkung

**Validation Summary Output**:
```json
{
  "status": "ERROR|WARNING|SUCCESS",
  "errors": [...],          // Hard fails requiring retry
  "warnings": [...],        // Suboptimal but proceed
  "info": [...],           // Bonus achievements
  "retry_required": true|false
}
```

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/seo/`:

### 1. `seo-metadata.json`
```json
{
  "phase": "5A",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T15:00:00Z",
  "metadata": {
    "title": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf | PferdeWert.de",
    "description": "Pferd kaufen: Unsere Experten-Checkliste hilft dir, Fehler zu vermeiden. Erfahre, worauf du bei Gesundheitscheck & Kaufvertrag achten musst.",
    "keywords": "pferd kaufen worauf achten, pferdekauf tipps, gesundes pferd kaufen",
    "canonical_url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten",
    "slug": "pferd-kaufen-worauf-achten"
  },
  "open_graph": {
    "og_title": "Pferd kaufen: 5 Experten-Tipps für sicheren Pferdekauf",
    "og_description": "Vermeide teure Fehler beim Pferdekauf! Unsere Checkliste zeigt, worauf du achten musst.",
    "og_image": "https://pferdewert.de/images/pferdekauf-guide.jpg",
    "og_type": "article",
    "og_url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen-worauf-achten"
  },
  "twitter_card": {
    "twitter_card": "summary_large_image",
    "twitter_title": "Pferd kaufen: 5 Experten-Tipps",
    "twitter_description": "Vermeide Fehler beim Pferdekauf mit unserer Checkliste!",
    "twitter_image": "https://pferdewert.de/images/pferdekauf-guide.jpg"
  }
}
```

### 2. `schema-article.json`
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pferd kaufen: 5 Tipps für sicheren Pferdekauf",
  "description": "Praktischer Guide mit Experten-Tipps...",
  "image": "https://pferdewert.de/images/pferdekauf-guide.jpg",
  "author": {
    "@type": "Person",
    "name": "PferdeWert.de Redaktion"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    }
  },
  "datePublished": "2025-01-04",
  "dateModified": "2025-01-04"
}
```

### 3. `schema-faq.json` (Optional)
FAQ Schema mit PAA-Fragen.

### 4. `schema-howto.json` (Optional)
HowTo Schema wenn Tutorial-Content.

### 5. `schema-breadcrumb.json`
Breadcrumb Navigation Schema.

### 6. `internal-linking.json`
```json
{
  "phase": "5C",
  "total_internal_links": 4,
  "internal_links": [
    {
      "section": "Einleitung",
      "anchor_text": "Pferdewert ermitteln",
      "target_url": "/pferde-ratgeber/pferdewert-ermitteln",
      "relevance": "high"
    }
  ]
}
```

---

## OUTPUT FORMAT (JSON)

Der Sub-Agent muss alle Daten in diesem Format zurückgeben:

```json
{
  "metadata": {
    "title": "...",
    "description": "...",
    "keywords": "...",
    "slug": "...",
    "canonical_url": "...",
    "open_graph": {...},
    "twitter_card": {...}
  },
  "schema_markup": {
    "article": {...},
    "faq": {...},
    "howto": {...},
    "breadcrumb": {...}
  },
  "internal_linking": {
    "total_links": 4,
    "links": [...]
  },
  "quality_metrics": {
    "title_length": 58,
    "description_length": 156,
    "schema_types_count": 3,
    "internal_links_count": 4,
    "slug_valid": true
  }
}
```

---

## Troubleshooting

### Problem: Title zu lang (> 60 chars)
**Lösung**:
- Power Words kürzer fassen: "Guide" → "5 Tipps"
- Brand suffix entfernen: "| PferdeWert.de" optional
- Zahlen nutzen statt Wörter: "5" statt "fünf"

### Problem: Meta Description zu generic
**Lösung**:
- Unique Value Proposition hinzufügen: "Von Tierärzten empfohlen"
- Pain Point adressieren: "Vermeide teure Fehler beim..."
- Emotional Trigger: "sicher", "erfolgreich", "vertrauensvoll"

### Problem: Keine passenden internen Links gefunden
**Lösung**:
- Prüfe ob PferdeWert.de Ratgeber-Seiten existieren (via Sitemap)
- Link zu Primary Service (Pferdewert-Bewertung) IMMER möglich
- Verwende allgemeinere Related Content Links

### Problem: FAQ Schema hat zu viele Fragen (> 8)
**Lösung**:
- Priorisiere PAA-Fragen mit "high" priority (aus Phase 2)
- Max 5-6 FAQ-Einträge für optimale Darstellung
- Restliche Fragen im Artikel-Text integrieren

---

## Best Practices

### 1. Metadata-Optimierung

**Title Tag**:
- Primary Keyword am Anfang = wichtiger für Ranking
- Power Words steigern CTR: "Guide", "Tipps", "Checkliste"
- Zahlen = höhere CTR: "5 Tipps", "3 wichtigste"

**Meta Description**:
- Frage-Antwort-Format funktioniert gut: "Worauf achten? Erfahre..."
- CTA steigert Klicks: "Jetzt lesen", "Erfahre mehr"
- USP kommunizieren: "Von Experten empfohlen", "Praxiserprobt"

### 2. Schema Markup

**Article Schema** (Pflicht für alle Artikel):
- Erhöht Chancen auf Rich Snippets
- Verbessert Artikel-Verständnis für Google
- Zeigt Author/Publisher Authority

**FAQ Schema** (wenn PAA vorhanden):
- Erscheint direkt in SERP als Accordion
- Erhöht SERP Real Estate
- Beantwortet User Questions direkt

**HowTo Schema** (wenn Tutorial):
- Rich Results mit Step-by-Step Display
- Höhere CTR durch visuelle Darstellung
- Ideal für Anleitungen/Checklisten

### 3. Internal Linking

**Strategische Platzierung**:
- Erste 200 Wörter: Max 1 Link (nicht zu aggressiv)
- Middle Content: 2-4 Links (natürlich verteilt)
- Conclusion: 1-2 Links (Related Content)

**Anchor Text Variation**:
- Nicht immer exakt gleicher Anchor Text
- Natürliche Variationen: "Pferdewert ermitteln", "unsere Bewertung", "Wert-Analyse"

**Link zu Primary Service**:
- IMMER min 1x zur Pferdewert-Bewertung verlinken
- Natürlich integriert: "Nutze unsere [Pferdewert-Bewertung] um..."

---

## Integration mit anderen Phasen

**Input aus Phase 4**:
- Final article text → Basis für Metadata-Extraktion
- Heading-Struktur → Basis für Breadcrumb Schema
- FAQ-Sektion → Basis für FAQ Schema
- Tutorial-Schritte → Basis für HowTo Schema

**Input aus Phase 2**:
- PAA-Fragen → FAQ Schema Content
- Must-Have Topics → Interne Link-Opportunities

**Input aus Phase 1**:
- Primary Keyword → Title, Description, Slug
- Supporting Keywords → Keywords Meta Tag

**Output für Phase 6**:
- Alle Metadata → Quality Check Validation
- Schema Markup → JSON-LD Syntax Validation
- Internal Links → Link-Anzahl Quality Gate

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 5:
→ **Phase 6: Quality Check** (`phase-6-quality-check.md`)

Verwende alle generierten Dateien (`seo-metadata.json`, Schema JSONs, `internal-linking.json`) als Input für Phase 6 Quality Validation.

---

**Phase 5 Checklist**:
- [ ] Sub-Agent Delegation für Metadata-Erstellung
- [ ] Title Tag 50-60 Zeichen optimiert
- [ ] Meta Description 150-160 Zeichen optimiert
- [ ] Min 2 Schema Markup Typen generiert (Article + FAQ/HowTo)
- [ ] Breadcrumb Schema erstellt
- [ ] Min 3 interne Links identifiziert
- [ ] URL Slug SEO-optimiert
- [ ] Quality Gate 5: Alle Metadata-Anforderungen erfüllt
- [ ] Output Files gespeichert in `seo/` Ordner
- [ ] Ready für Phase 6: Alle On-Page SEO-Elemente implementiert
