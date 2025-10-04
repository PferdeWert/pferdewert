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
  "content_outline": {...}          // From Phase 3 für Structure
}

## AUFGABE:

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

### 3. Meta Keywords (Deprecated but Complete)

**HINWEIS**: Meta Keywords sind offiziell deprecated, aber für Vollständigkeit inkludieren.

**Format**:
- Komma-separierte Liste
- Primary Keyword zuerst
- 5-8 Supporting Keywords
- Keine Duplikate

**Beispiel**:
```
pferd kaufen worauf achten, pferdekauf tipps, gesundes pferd kaufen, pferdekauf beratung, pferd kaufen checkliste
```

---

### 4. Open Graph Tags (Social Media)

**Für Facebook/LinkedIn Sharing**:
- `og:title` - Wie Title Tag aber emotionaler
- `og:description` - Wie Meta Description
- `og:image` - Featured Image URL (falls vorhanden)
- `og:type` - "article"
- `og:url` - Canonical URL

**Beispiel**:
```json
{
  "og_title": "Pferd kaufen: 5 Experten-Tipps für sicheren Pferdekauf",
  "og_description": "Vermeide teure Fehler beim Pferdekauf! Unsere Checkliste zeigt, worauf du achten musst.",
  "og_image": "https://pferdewert.de/images/pferdekauf-guide.jpg",
  "og_type": "article"
}
```

---

### 5. Twitter Card Tags

**Für Twitter Sharing**:
- `twitter:card` - "summary_large_image"
- `twitter:title` - Wie OG Title
- `twitter:description` - Kürzer als Meta Description (120 chars)
- `twitter:image` - Wie OG Image

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
    "@id": "https://pferdewert.de/ratgeber/{slug}"
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
      "item": "https://pferdewert.de/ratgeber"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pferd kaufen: Worauf achten",
      "item": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
    }
  ]
}
```

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

---

### Beispiel Internal Linking Map:

```json
{
  "internal_links": [
    {
      "section": "Einleitung",
      "anchor_text": "Pferdewert ermitteln",
      "target_url": "/ratgeber/pferdewert-ermitteln",
      "context": "Bevor du ein Pferd kaufst, solltest du den fairen Marktwert kennen. Nutze unsere [Pferdewert ermitteln] Funktion.",
      "relevance": "high"
    },
    {
      "section": "Gesundheitscheck",
      "anchor_text": "Pferd Gesundheitscheck Kosten",
      "target_url": "/ratgeber/pferd-gesundheitscheck-kosten",
      "context": "Die [Pferd Gesundheitscheck Kosten] variieren je nach Umfang der Untersuchung.",
      "relevance": "high"
    },
    {
      "section": "Kaufvertrag",
      "anchor_text": "Pferdekauf Kaufvertrag Muster",
      "target_url": "/ratgeber/pferdekauf-kaufvertrag",
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
- Keine Umlaute: ✅ `ueber-uns` ❌ `über-uns`
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

✅ **Title Tag 50-60 Zeichen**
✅ **Meta Description 150-160 Zeichen**
✅ **Primary Keyword in Title + Description integriert**
✅ **Min 2 Schema Markup Typen implementiert** (Article + FAQ/HowTo/Breadcrumb)
✅ **Min 3 interne Links identifiziert**
✅ **URL Slug SEO-optimiert** (lowercase, hyphens, primary keyword)
✅ **Open Graph Tags vollständig** (og:title, og:description, og:image)
❌ **Wenn Title > 60 chars** → kürzen und retry
❌ **Wenn < 2 Schema Types** → min FAQ oder Breadcrumb hinzufügen

**Partial Success erlaubt**:
- Wenn nur 2 interne Links statt 3 → proceed mit Warning
- Wenn Twitter Cards fehlen → proceed (optional)

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
    "canonical_url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten",
    "slug": "pferd-kaufen-worauf-achten"
  },
  "open_graph": {
    "og_title": "Pferd kaufen: 5 Experten-Tipps für sicheren Pferdekauf",
    "og_description": "Vermeide teure Fehler beim Pferdekauf! Unsere Checkliste zeigt, worauf du achten musst.",
    "og_image": "https://pferdewert.de/images/pferdekauf-guide.jpg",
    "og_type": "article",
    "og_url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
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
      "target_url": "/ratgeber/pferdewert-ermitteln",
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
