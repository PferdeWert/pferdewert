---
name: seo-metadata-optimization
description: Erstellt SEO Metadata, Structured Data Schemas und Internal Linking Empfehlungen. Verwenden bei "schema erstellen" oder "metadata optimieren".
allowed-tools: Read, Write, Edit, Glob
---

# SEO Metadata Optimization - Schemas & Internal Linking

Creates SEO metadata, structured data schemas, and internal linking recommendations.

**Purpose**: Generate optimized metadata and schemas without modifying main content.

## When to use

- Phase 5 of `seo-full-workflow` (On-Page SEO)
- User requests "create SEO schemas for [article]"
- Metadata-only optimization needed
- Adding structured data to existing content
- Internal linking strategy for article

## Prerequisites

- Content file available (markdown or TSX)
- Target keyword known
- Article outline available (H1, H2s, H3s)
- FAQ section present in content (for FAQ Schema)

## Input

- Content file path or markdown text
- Target keyword
- Optional: SERP analysis data for competitive insights
- Optional: Related articles for internal linking

## Process Steps

### Step 1: Extract Content Structure

Parse content to identify:
- Page title (H1)
- Section headings (H2s, H3s)
- FAQ questions and answers
- Key facts and statistics
- Author information (if present)
- Publication/update dates

### Step 2: Generate Title Tag

**Format**: `{Primary Keyword} | {Benefit/Context} | PferdeWert`

**Requirements**:
- Length: 50-60 characters (mobile SERP)
- Primary keyword at start (preferably)
- Compelling and click-worthy
- Brand modifier optional (if space allows)

**Examples**:
- "Springpferd kaufen: Der ultimative Leitfaden 2024 | PferdeWert"
- "Pferdewert ermitteln in 2 Minuten | KI-gestützte Bewertung"
- "Dressurpferd kaufen: Tipps vom Experten | PferdeWert"

### Step 3: Generate Meta Description

**Format**: `{Value Prop} + {Primary Benefit} + {CTA}`

**Requirements**:
- Length: 140-160 characters
- Primary keyword included
- Call-to-action present
- Unique (not duplicated)
- Compelling reason to click

**Examples**:
- "Erfahren Sie, wie Sie den Wert Ihres Pferdes in nur 2 Minuten ermitteln. KI-gestützte Bewertung von Experten validiert. Jetzt kostenlos testen!"
- "Springpferd kaufen leicht gemacht: Unsere Experten zeigen Ihnen, worauf es ankommt. Vermeiden Sie teure Fehler. Mehr erfahren!"

### Step 4: Create FAQ Schema

**JSON-LD Structure**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

**Requirements**:
- Extract min 3, max 8 FAQ pairs from content
- Questions must be natural language (how/what/why)
- Answers should be 40-300 characters (concise)
- Use exact text from content FAQ section
- Validate JSON-LD syntax

**Extraction Logic**:
1. Find FAQ section in content (H2: "Häufig gestellte Fragen")
2. Extract H3 questions
3. Extract paragraph answers below each H3
4. Format as JSON-LD

### Step 5: Create Article Schema

**JSON-LD Structure**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article title",
  "description": "Meta description",
  "image": "Featured image URL",
  "datePublished": "2025-01-09",
  "dateModified": "2025-01-09",
  "author": {
    "@type": "Organization",
    "name": "PferdeWert",
    "url": "https://pferdewert.de"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PferdeWert",
    "url": "https://pferdewert.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pferdewert.de/logo.png"
    }
  }
}
```

**Requirements**:
- Headline = H1 from content
- Description = Generated meta description
- Image = Featured image (default if not specified)
- Dates = Today (for new content) or actual dates (for updates)
- Author = PferdeWert organization
- Publisher = PferdeWert with logo

### Step 6: Create BreadcrumbList Schema

**JSON-LD Structure**:
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
      "name": "Article title",
      "item": "https://pferdewert.de/ratgeber/{slug}"
    }
  ]
}
```

**Requirements**:
- Start with Home (position 1)
- Include parent category (Ratgeber, position 2)
- End with current article (position 3+)
- Use actual URLs (no placeholders in final output)

### Step 7: Generate Internal Linking Recommendations

**Link Types**:

**Contextual Links** (within content):
- Link to related ratgeber articles
- Link to service pages (Bewertung, Preise)
- Link to glossary terms (if applicable)

**Anchor Text Strategy**:
- Natural, descriptive text (not "click here")
- Include keywords where appropriate
- Vary anchor text (don't repeat)

**Link Placement**:
- Early in content (first 200 words)
- Within relevant H2 sections
- At least 2-5 links per article

**Output Format**:
```json
{
  "contextual_links": [
    {
      "anchor_text": "Pferdewert ermitteln",
      "target_url": "/pferde-preis-berechnen",
      "placement": "Introduction, paragraph 2",
      "reason": "Direct service link for users wanting evaluation"
    },
    {
      "anchor_text": "Dressurpferd kaufen",
      "target_url": "/ratgeber/dressurpferd-kaufen",
      "placement": "Section 'Welche Pferderasse passt zu mir?'",
      "reason": "Related topic for users interested in specific breeds"
    }
  ],
  "related_articles": [
    {
      "title": "Springpferd kaufen: Der ultimative Leitfaden",
      "url": "/ratgeber/springpferd-kaufen",
      "relevance": "Same category, complementary topic"
    }
  ]
}
```

### Step 8: Create OpenGraph & Twitter Card Metadata

**OpenGraph Tags**:
```json
{
  "og:title": "Title (same as meta title or variation)",
  "og:description": "Description (same as meta description)",
  "og:image": "Featured image URL",
  "og:url": "Canonical URL",
  "og:type": "article",
  "og:site_name": "PferdeWert"
}
```

**Twitter Card Tags**:
```json
{
  "twitter:card": "summary_large_image",
  "twitter:title": "Title",
  "twitter:description": "Description",
  "twitter:image": "Featured image URL"
}
```

## Output: metadata.json

```json
{
  "generated": "2025-01-09T10:30:00Z",
  "keyword": "primary keyword",

  "meta_tags": {
    "title": "Optimized title tag (50-60 chars)",
    "description": "Optimized meta description (140-160 chars)",
    "canonical": "https://pferdewert.de/ratgeber/{slug}",
    "robots": "index, follow"
  },

  "opengraph": {
    "og:title": "...",
    "og:description": "...",
    "og:image": "...",
    "og:url": "...",
    "og:type": "article",
    "og:site_name": "PferdeWert"
  },

  "twitter": {
    "twitter:card": "summary_large_image",
    "twitter:title": "...",
    "twitter:description": "...",
    "twitter:image": "..."
  }
}
```

## Output: schemas.json

```json
{
  "generated": "2025-01-09T10:30:00Z",

  "faq_schema": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [...]
  },

  "article_schema": {
    "@context": "https://schema.org",
    "@type": "Article",
    ...
  },

  "breadcrumb_schema": {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  },

  "validation": {
    "faq_valid": true,
    "article_valid": true,
    "breadcrumb_valid": true
  }
}
```

## Output: internal-links.json

```json
{
  "generated": "2025-01-09T10:30:00Z",

  "contextual_links": [
    {
      "anchor_text": "...",
      "target_url": "...",
      "placement": "...",
      "reason": "..."
    }
  ],

  "related_articles": [
    {
      "title": "...",
      "url": "...",
      "relevance": "..."
    }
  ],

  "recommendations": [
    "Add link to Bewertung page in introduction",
    "Link to related breed-specific articles in breed section"
  ]
}
```

## Critical Rules

**Schema Validation**:
- All schemas must be valid JSON-LD
- Test via Google Rich Results Test before deployment
- No syntax errors allowed

**Brand Compliance**:
- Use "KI" not "AI" in meta descriptions
- Mention "2 Minuten" if relevant
- Emphasize PAID service value (not "kostenlos")

**Character Limits**:
- Title: 50-60 chars (strict)
- Meta description: 140-160 chars (strict)
- FAQ answers: 40-300 chars (recommended)

**Internal Linking**:
- Only link to existing pages (no broken links)
- Prefer deep links over homepage
- Use natural anchor text (not keyword stuffed)

## Quality Checks

Post-generation validation:
- ✅ Title length 50-60 characters
- ✅ Meta description length 140-160 characters
- ✅ Primary keyword in title
- ✅ Primary keyword in meta description
- ✅ FAQ Schema valid (min 3 Q&As)
- ✅ Article Schema valid
- ✅ BreadcrumbList Schema valid
- ✅ All internal links resolve
- ✅ No duplicate content in schemas

## Token Efficiency

**Per Execution**: ~4k tokens
- Content parsing: ~1k
- Schema generation: ~2k
- Validation: ~1k

## Integration

**Used by**:
- `seo-full-workflow` (Phase 5)
- `seo-content-optimizer` (metadata updates)
- Manual metadata generation

**Depends on**:
- Content file with H1, H2s, FAQ section
- Target keyword

**Outputs used by**:
- `seo-final-package` (embeds schemas in Next.js page)

## Error Handling

**No FAQ Section**: Create minimal FAQ from H2 questions
**Invalid JSON-LD**: Report syntax error, suggest correction
**Title Too Long**: Truncate while preserving keyword
**Missing Image**: Use default PferdeWert featured image

## Notes

- **Metadata-Only**: Does not modify main content
- **Schema-First**: Prioritize structured data for rich results
- **Internal Linking**: Strategic recommendations, not automatic
- **Validation Required**: Always validate schemas before deployment
- **Quick Updates**: Use for metadata refreshes without content changes
