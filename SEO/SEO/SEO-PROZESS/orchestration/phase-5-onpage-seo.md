# Phase 5: On-Page SEO

**Token Budget**: ~400 Tokens
**Main Deliverables**: `seo-metadata.json`, Schema Markup JSONs, Internal Links
**Agent Pattern**: Sub-Agent only (seo-content-writer)

---

## Phase 5A: SEO Metadata Generation (Sub-Agent)

**WICHTIG**: Diese Phase wird komplett vom Sub-Agent ausgeführt. Main-Agent delegiert nur.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Generate SEO metadata and schema markup</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Erstelle SEO-Metadaten und Schema Markup für den Artikel.

## INPUT-DATEN (JSON):
{
  "article_draft": "...",      // Kompletter Artikel-Text von Phase 4
  "content_outline": {...},    // Von Phase 3
  "primary_keyword": "pferd kaufen worauf achten",
  "paa_questions": [...]       // Von Phase 2B
}

## AUFGABE:

### 1. SEO Title Tag

**Optimierungs-Regeln**:
- **Max 60 Zeichen** (ideal: 50-60 für vollständige SERP-Anzeige)
- **Primary Keyword am Anfang** (first 30 characters wichtigster Bereich)
- **Emotionale Hooks**: Zahlen, Jahreszahl, Trigger-Wörter
- **Unique Selling Point**: Was macht diesen Artikel besser?

**Title-Formeln**:
- **How-To**: "Pferd kaufen: Worauf achten? [2025 Experten-Guide]" (57 chars)
- **Checkliste**: "Pferdekauf-Checkliste 2025: So findest du dein Traumpferd" (58 chars)
- **Fehler-Focus**: "Pferdekauf: 7 teure Fehler vermeiden [2025 Guide]" (50 chars)
- **Kosten-Focus**: "Pferd kaufen: Kosten-Guide + Checkliste [2025]" (47 chars)

**Trigger-Wörter** (erhöhen CTR):
- Zahlen: "7 Tipps", "2025", "10 Fehler"
- Power-Words: "Experten-Guide", "Komplette Anleitung", "Ultimativ"
- FOMO: "[2025]", "Aktuell", "Neu"
- Benefit: "So findest du...", "Ohne Fehler", "Schritt für Schritt"

**Beispiel-Optimierung**:
- ❌ **Schlecht**: "Worauf Sie beim Pferdekauf achten sollten" (zu lang, kein Keyword am Anfang, formell)
- ✅ **Gut**: "Pferd kaufen: Worauf achten? [2025 Experten-Guide]"

### 2. Meta Description

**Optimierungs-Regeln**:
- **Max 155 Zeichen** (ideal: 150-155 für vollständige SERP-Anzeige)
- **Primary Keyword einbauen** (wird geboldet in SERP wenn User danach sucht)
- **Min 2 Supporting Keywords** erwähnen
- **Call-to-Action** am Ende
- **Checkmarks ✓** für visuelle Highlights (erhöht CTR)

**Description-Formula**:
```
[Keyword-Frage beantworten] ✓ [Benefit 1] ✓ [Benefit 2] ✓ [Benefit 3]. [CTA] [Jahreszahl].
```

**Beispiele**:
```
Pferd kaufen worauf achten? ✓ Gesundheitscheck ✓ Rechtliches ✓ Kosten-Übersicht. Experten-Checkliste für sicheren Pferdekauf 2025. (154 chars)

Pferdekauf leicht gemacht: ✓ Schritt-für-Schritt Guide ✓ Checkliste ✓ Experten-Tipps. So findest du dein Traumpferd ohne Fehlkauf. (139 chars)
```

**Fehler vermeiden**:
- ❌ Keyword-Stuffing: "Pferd kaufen pferd kaufen worauf achten pferd..."
- ❌ Zu generisch: "Alles über Pferdekauf was Sie wissen müssen"
- ❌ Zu lang: > 160 chars wird abgeschnitten in SERP

### 3. URL Slug

**Slug-Regeln**:
- **Max 3-5 Wörter** aus Primary Keyword
- **Nur Kleinbuchstaben, Bindestriche**
- **Keine Füllwörter** (der, die, das, ein, worauf, wie, etc.)
- **Kurz & prägnant**

**Slug-Generierung**:
- Primary: "pferd kaufen worauf achten" → Slug: "pferd-kaufen-checkliste"
- Alternative: "pferd-kaufen-guide"
- Alternative: "pferdekauf-tipps"

**Best Practices**:
- ✅ **Gut**: `/ratgeber/pferd-kaufen-checkliste`
- ❌ **Schlecht**: `/ratgeber/worauf-sollte-man-beim-pferdekauf-achten-2025`

### 4. Open Graph Meta Tags

**Für Social Media Sharing** (Facebook, LinkedIn, etc.):

```json
{
  "og:title": "[SEO Title oder leicht angepasst für Social]",
  "og:description": "[Meta Description oder Social-optimierte Version]",
  "og:image": "[URL zum Hero-Bild des Artikels]",
  "og:url": "https://pferdewert.de/ratgeber/[slug]",
  "og:type": "article"
}
```

**Twitter Card Tags**:
```json
{
  "twitter:card": "summary_large_image",
  "twitter:title": "[SEO Title]",
  "twitter:description": "[Meta Description]",
  "twitter:image": "[URL zum Hero-Bild]"
}
```

### 5. Canonical URL

**Duplicate Content Prevention**:
```json
{
  "canonical": "https://pferdewert.de/ratgeber/[slug]"
}
```

## OUTPUT FORMAT (JSON):
{
  "seo_title": "Pferd kaufen: Worauf achten? [2025 Experten-Guide]",
  "meta_description": "Pferd kaufen worauf achten? ✓ Gesundheitscheck ✓ Rechtliches ✓ Kosten-Übersicht. Experten-Checkliste für sicheren Pferdekauf 2025.",
  "url_slug": "pferd-kaufen-checkliste",
  "canonical_url": "https://pferdewert.de/ratgeber/pferd-kaufen-checkliste",
  "open_graph": {
    "og:title": "Pferd kaufen: Worauf achten? [2025 Experten-Guide]",
    "og:description": "Pferd kaufen worauf achten? ✓ Gesundheitscheck ✓ Rechtliches ✓ Kosten-Übersicht. Experten-Checkliste für sicheren Pferdekauf 2025.",
    "og:image": "https://pferdewert.de/images/pferdekauf-guide-hero.jpg",
    "og:url": "https://pferdewert.de/ratgeber/pferd-kaufen-checkliste",
    "og:type": "article"
  },
  "twitter_card": {
    "twitter:card": "summary_large_image",
    "twitter:title": "Pferd kaufen: Worauf achten? [2025 Experten-Guide]",
    "twitter:description": "Pferd kaufen worauf achten? ✓ Gesundheitscheck ✓ Rechtliches ✓ Kosten. Experten-Checkliste 2025.",
    "twitter:image": "https://pferdewert.de/images/pferdekauf-guide-hero.jpg"
  }
}
</parameter>
</invoke>
</function_calls>
```

---

## Phase 5B: Schema Markup Generation (Sub-Agent)

**Fortsetzung der Sub-Agent Delegation** (gleiches Task-Invoke):

```xml
<parameter name="prompt">
[... SEO Metadata von oben ...]

### 6. Article Schema (JSON-LD)

**Primary Schema** für jeden Ratgeber-Artikel:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[SEO Title]",
  "description": "[Meta Description]",
  "image": "[Hero Image URL]",
  "author": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    }
  },
  "datePublished": "[ISO 8601 Date z.B. 2025-01-04T10:00:00Z]",
  "dateModified": "[ISO 8601 Date - initial = datePublished]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pferdewert.de/ratgeber/[slug]"
  }
}
```

### 7. FAQ Schema (JSON-LD)

**Wenn FAQ-Sektion vorhanden** (aus article_draft extrahieren):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[FAQ-Frage 1 aus article_draft]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Antwort-Text aus article_draft. HTML erlaubt für Formatierung]"
      }
    },
    {
      "@type": "Question",
      "name": "[FAQ-Frage 2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Antwort-Text]"
      }
    }
    // ... alle FAQ-Fragen aus Artikel
  ]
}
```

**Extraktions-Regel**:
- Parse article_draft für FAQ-Sektion
- Jede H3 unter "Häufig gestellte Fragen" = 1 Question
- Text unter H3 bis nächste H3 = Answer

### 8. HowTo Schema (Optional - nur bei Tutorial-Content)

**Wenn article_draft Step-by-Step Anleitung enthält**:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[Tutorial Title z.B. 'Pferdekauf Schritt für Schritt']",
  "description": "[Kurze Beschreibung was Tutorial abdeckt]",
  "image": "[Tutorial Hero Image URL]",
  "totalTime": "[Geschätzte Dauer z.B. PT30M für 30 Minuten]",
  "step": [
    {
      "@type": "HowToStep",
      "name": "[Schritt 1 Title aus article_draft]",
      "text": "[Schritt 1 Beschreibung]",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "[Schritt 2 Title]",
      "text": "[Schritt 2 Beschreibung]",
      "position": 2
    }
    // ... alle Steps
  ]
}
```

**Wann verwenden**:
- Wenn Artikel "Schritt-für-Schritt" / "Step-by-Step" Sektion hat
- Wenn Numbered List mit Tutorial-Charakter vorhanden
- Nicht bei generischen Checklisten

### 9. Breadcrumb Schema (JSON-LD)

**Navigation Path** für bessere SERP Breadcrumbs:

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
      "name": "[Article Title]",
      "item": "https://pferdewert.de/ratgeber/[slug]"
    }
  ]
}
```

## OUTPUT FORMAT für Schemas (separate JSONs):
Erstelle separate JSON-Dateien für jedes Schema:

1. `schema-article.json` - PFLICHT für jeden Artikel
2. `schema-faq.json` - Nur wenn FAQ-Sektion vorhanden
3. `schema-howto.json` - Nur wenn Tutorial/Step-by-Step Content
4. `schema-breadcrumb.json` - PFLICHT für jeden Artikel
</parameter>
</invoke>
</function_calls>
```

---

## Phase 5C: Internal Linking Strategy (Sub-Agent)

**Fortsetzung der Sub-Agent Delegation** (gleiches Task-Invoke):

```xml
<parameter name="prompt">
[... SEO Metadata & Schemas von oben ...]

### 10. Internal Link Recommendations

**Ziel**: Ratgeber-Artikel untereinander vernetzen für Topic Cluster Authority.

**Link-Kategorien**:

1. **Service-Links** (zu PferdeWert Core-Features):
   - Bewertung-Seite: `/bewertung`
   - Homepage: `/`
   - Pricing: `/preise` (nur wenn Kosten-Thema)

2. **Ratgeber-Vernetzung** (zwischen Artikeln):
   - Related Topics: Andere Artikel zum Thema Pferdekauf
   - Prerequisite Content: Grundlagen-Artikel
   - Deep-Dive Content: Spezifischere Detail-Artikel

**Link-Platzierungs-Regeln**:
- **Max 2-3 Service-Links** pro Artikel (nicht zu promotionlastig)
- **3-5 Ratgeber-Links** zu verwandten Artikeln
- **Natürlich im Kontext** platzieren (nicht forciert)
- **Anchor-Text**: Beschreibend, nicht "Klick hier"

**Link-Opportunities identifizieren**:
Analysiere article_draft für Stellen wo Links Sinn machen:

```markdown
## Beispiel-Kontext im Artikel:
"... Neben dem Kaufpreis fallen auch laufende Kosten an.
[LINK: Mehr zu Pferdehaltung Kosten in unserem Ratgeber]."

"... Tools wie PferdeWert [LINK: /bewertung] helfen dir,
den fairen Marktwert zu ermitteln."
```

## OUTPUT FORMAT für Internal Links (JSON):
{
  "internal_links": [
    {
      "type": "service_link",
      "target_url": "/bewertung",
      "anchor_text": "Lass dein Pferd von Experten bewerten",
      "placement_context": "Im Fazit nach Key Takeaways",
      "surrounding_text": "Tools wie PferdeWert helfen dir, den fairen Marktwert zu ermitteln."
    },
    {
      "type": "ratgeber_link",
      "target_url": "/ratgeber/pferdehaltung-kosten",
      "anchor_text": "Pferdehaltung Kosten im Detail",
      "placement_context": "In Sektion 'Was kostet ein Pferd?'",
      "surrounding_text": "Neben dem Kaufpreis fallen auch laufende Kosten an."
    }
    // ... weitere Links
  ],
  "linking_notes": [
    "Priorisiere Service-Links in High-Value Sektionen (Kosten, Fazit)",
    "Ratgeber-Links zu verwandten Topics wo thematisch passend",
    "Anchor-Texte beschreibend und keyword-relevant halten"
  ]
}
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 5

Prüfe ob Sub-Agent vollständige SEO-Optimierung geliefert hat:

✅ **SEO Title max 60 Zeichen + Primary Keyword enthalten**
✅ **Meta Description max 155 Zeichen + min 2 Keywords**
✅ **URL Slug kurz & prägnant (max 5 Wörter)**
✅ **Article Schema JSON korrekt formatiert**
✅ **Breadcrumb Schema JSON vorhanden**
✅ **FAQ Schema JSON wenn FAQ-Sektion im Artikel**
✅ **Min 2 Internal Links definiert**
❌ **Wenn Title > 60 chars** → Retry mit kürzerem Title
❌ **Wenn Schema JSON invalid** → Retry mit korrekter Syntax

**Partial Success**: Wenn HowTo Schema fehlt aber kein Tutorial-Content → proceed ohne HowTo Schema.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/seo/`:

### 1. `seo-metadata.json`
```json
{
  "phase": "5",
  "timestamp": "2025-01-04T16:00:00Z",
  "seo_title": "...",
  "meta_description": "...",
  "url_slug": "...",
  "canonical_url": "...",
  "open_graph": {...},
  "twitter_card": {...}
}
```

### 2. `schema-article.json`
Article Schema JSON-LD (wie oben definiert)

### 3. `schema-faq.json` (Optional)
FAQ Schema JSON-LD wenn FAQ-Sektion vorhanden

### 4. `schema-howto.json` (Optional)
HowTo Schema JSON-LD wenn Tutorial-Content vorhanden

### 5. `schema-breadcrumb.json`
Breadcrumb Schema JSON-LD

### 6. `internal-linking.json`
Internal Link Recommendations

---

## Troubleshooting

### Problem: Title zu lang (> 60 chars)
**Lösung**:
- Kürze Beschreibungen ("Experten-Guide" → "Guide")
- Entferne Jahreszahl wenn nicht kritisch
- Fokus auf Primary Keyword + 1 Hook-Element

### Problem: Meta Description > 155 chars
**Lösung**:
- Reduziere auf 2 statt 3 Benefits mit Checkmarks
- Kürze CTA ("Experten-Checkliste" → "Checkliste")
- Priorisiere wichtigste Keywords

### Problem: FAQ Schema enthält HTML-Fehler
**Lösung**:
- Escapen von Quotes in Answer-Text: `\"` statt `"`
- HTML in Answer-Text erlaubt aber korrekt formatiert
- Validiere JSON mit JSON-Linter

### Problem: Keine verwandten Ratgeber-Artikel für Internal Linking
**Lösung**:
- Fokus auf Service-Links (Bewertung, Homepage)
- Placeholder-Links für zukünftige Artikel setzen
- Min 2 Service-Links sind PFLICHT

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 5:
→ **Phase 6: Quality Check** (`phase-6-quality-check.md`)

Verwende alle bisherigen Outputs für finale Quality-Validierung.

---

**Phase 5 Checklist**:
- [ ] Sub-Agent Delegation für SEO Metadata
- [ ] Quality Gate: Title + Description Länge validiert
- [ ] Article Schema JSON erstellt
- [ ] Breadcrumb Schema JSON erstellt
- [ ] FAQ/HowTo Schemas wenn applicable
- [ ] Internal Links definiert (min 2)
- [ ] Output Files gespeichert in `seo/` Ordner
- [ ] Ready für Phase 6: Alle SEO-Elemente vorhanden
