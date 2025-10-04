# Schema Markup Reference - PferdeWert.de SEO

**Purpose**: JSON-LD Schema.org implementation guide for Phase 5 (On-Page SEO)

**Token Budget**: Reference-only (loaded on-demand, not part of pipeline budget)

**Primary Use Case**: Generate structured data markup for articles, FAQs, tutorials, and navigation

---

## When to Use This Document

### ✅ Phase 5: On-Page SEO
- **Step 1**: Generate Article Schema (required for all content)
- **Step 2**: Add FAQ Schema (if PAA questions integrated)
- **Step 3**: Add HowTo Schema (if tutorial/step-by-step content)
- **Step 4**: Add Breadcrumb Schema (for navigation)

### ✅ Phase 6: Quality Check
- Validate Schema markup with Google Structured Data Testing Tool
- Verify required properties present
- Check for schema warnings/errors

---

## Core Schema Types for PferdeWert.de

### 1. Article Schema (Primary - REQUIRED for all content)

**When to use**: Every Ratgeber article published

**Required Properties**:
- `headline` - Article title (max 110 chars)
- `description` - Meta description
- `author` - Organization: PferdeWert.de
- `publisher` - Organization with logo
- `datePublished` - ISO 8601 format
- `dateModified` - ISO 8601 format
- `image` - Article main image (16:9, 9:16, 4:3, 1:1 ratios)

**Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pferd kaufen: Worauf achten beim Pferdekauf?",
  "description": "Kompletter Guide für den Pferdekauf: Gesundheitscheck, Rechtliches, Kosten und Tipps vom Experten. Schritt-für-Schritt Anleitung für einen sicheren Kauf.",
  "image": {
    "@type": "ImageObject",
    "url": "https://pferdewert.de/images/ratgeber/pferd-kaufen-guide.jpg",
    "width": 1200,
    "height": 630
  },
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
      "url": "https://pferdewert.de/images/logo-600x60.png",
      "width": 600,
      "height": 60
    }
  },
  "datePublished": "2025-01-04T10:00:00+01:00",
  "dateModified": "2025-01-04T10:00:00+01:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten"
  }
}
```

**PferdeWert.de-Specific Implementation**:
- Always use Organization as author (not Person)
- Logo must be 600x60px (Google requirement)
- Image aspect ratios: Prefer 16:9 for hero images
- datePublished and dateModified use German timezone (+01:00 for CET, +02:00 for CEST)

---

### 2. FAQ Schema (for PAA Integration)

**When to use**:
- ✅ If article includes FAQ section (from Phase 2 PAA integration)
- ✅ If 3+ People Also Ask questions answered in content
- ❌ Do NOT use for < 3 questions

**Required Properties**:
- `mainEntity` - Array of Question objects
- Each Question needs `name` (question text) and `acceptedAnswer` (answer text)

**Template**:
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
        "text": "Ein gesundes Freizeitpferd kostet in Deutschland durchschnittlich 3.000-8.000€. Die Preisspanne hängt von Rasse, Alter, Ausbildungsstand und Gesundheitszustand ab. Turniererprobte Pferde können 15.000-50.000€+ kosten. Wichtig: Zusätzlich fallen Kaufuntersuchungskosten von 200-500€ an."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Dokumente braucht man beim Pferdekauf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beim Pferdekauf sind folgende Dokumente erforderlich: 1) Equidenpass (Pferdepapiere mit Abstammung), 2) Kaufvertrag (schriftlich empfohlen), 3) Kaufuntersuchungsbericht vom Tierarzt, 4) ggf. Leistungsurkunden bei Sportpferden, 5) Gesundheitszeugnis für Transport. Der Equidenpass ist gesetzlich verpflichtend und muss beim Verkauf übergeben werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie läuft eine Ankaufsuntersuchung ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Ankaufsuntersuchung (AKU) umfasst: 1) Klinische Untersuchung (Herz, Lunge, Bewegungsapparat), 2) Belastungstest (Longe/Reiten), 3) Röntgenbilder (meist 10-18 Aufnahmen), 4) Optional: Bluttest, Ultraschall. Die Untersuchung dauert 2-3 Stunden und kostet je nach Umfang 200-800€. Der Käufer wählt den Tierarzt aus und bezahlt die Untersuchung."
      }
    }
  ]
}
```

**Best Practices**:
- Questions: Use exact PAA wording from Phase 2 SERP Analysis
- Answers: 150-300 characters for rich snippet optimization
- Include concrete numbers/steps for better featured snippet chances
- Avoid promotional language in answers (purely informational)

**Integration with Phase 2 Output**:
```javascript
// Phase 2 provides PAA questions:
{
  "paa_integration": [
    {
      "question": "Was kostet ein gesundes Pferd?",
      "category": "costs",
      "section_placement": "Kosten-Übersicht",
      "priority": "high"
    }
  ]
}

// Phase 5 converts to FAQ Schema:
// Use question text as "name"
// Extract answer from content section specified in "section_placement"
// Create Answer object with 150-300 char summary
```

---

### 3. HowTo Schema (for Tutorial Content)

**When to use**:
- ✅ If article contains step-by-step instructions
- ✅ If content format is "tutorial" or "guide" (from Phase 3 outline)
- ✅ If 3+ sequential steps present
- ❌ Do NOT use for general informational content

**Required Properties**:
- `name` - Tutorial title
- `description` - Brief overview
- `step` - Array of HowToStep objects with text/image
- `totalTime` - Estimated completion time (ISO 8601 duration)

**Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Pferd kaufen: Schritt-für-Schritt Anleitung",
  "description": "Komplette Anleitung für den sicheren Pferdekauf - vom ersten Kontakt bis zur Übergabe",
  "totalTime": "P14D",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "5000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Budget und Anforderungen festlegen",
      "text": "Definieren Sie Ihr Budget (Kaufpreis + Nebenkosten) und erstellen Sie ein Anforderungsprofil: Reitweise, Erfahrungslevel, Charakter. Planen Sie 20-30% des Kaufpreises für Nebenkosten ein.",
      "image": "https://pferdewert.de/images/ratgeber/schritt-1-budget.jpg",
      "url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten#schritt-1"
    },
    {
      "@type": "HowToStep",
      "name": "Pferde besichtigen und Proberitt vereinbaren",
      "text": "Vereinbaren Sie mindestens 2-3 Besichtigungstermine. Achten Sie auf Verhalten im Stall, beim Führen und beim Reiten. Nehmen Sie eine erfahrene Begleitperson mit.",
      "image": "https://pferdewert.de/images/ratgeber/schritt-2-besichtigung.jpg",
      "url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten#schritt-2"
    },
    {
      "@type": "HowToStep",
      "name": "Ankaufsuntersuchung durchführen lassen",
      "text": "Beauftragen Sie einen unabhängigen Tierarzt mit einer großen AKU (inkl. Röntgen). Klären Sie vorher den Umfang (Standard 10 oder große 18 Bilder) und erwartete Kosten (300-800€).",
      "image": "https://pferdewert.de/images/ratgeber/schritt-3-aku.jpg",
      "url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten#schritt-3"
    },
    {
      "@type": "HowToStep",
      "name": "Kaufvertrag prüfen und unterzeichnen",
      "text": "Lassen Sie einen schriftlichen Kaufvertrag aufsetzen mit: Kaufpreis, Sachmängelhaftung, Übergabedatum, Equidenpass-Details. Optional: Rücktrittsklausel bei negativer AKU.",
      "image": "https://pferdewert.de/images/ratgeber/schritt-4-vertrag.jpg",
      "url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten#schritt-4"
    },
    {
      "@type": "HowToStep",
      "name": "Pferd abholen und eingewöhnen",
      "text": "Planen Sie den Transport (Anhänger oder Transportunternehmen) und bereiten Sie den Stall vor. Erste 2-3 Wochen: Eingewöhnungsphase mit leichtem Training und Haltungswechsel-Beobachtung.",
      "image": "https://pferdewert.de/images/ratgeber/schritt-5-transport.jpg",
      "url": "https://pferdewert.de/ratgeber/pferd-kaufen-worauf-achten#schritt-5"
    }
  ]
}
```

**Best Practices**:
- `totalTime`: Use ISO 8601 duration (P14D = 14 days, PT2H = 2 hours)
- `estimatedCost`: Include average cost for entire process
- Each step: 100-200 characters text for clarity
- Images: Optional but improve rich snippet chances (1200x900px recommended)
- URLs: Deep-link to specific H2/H3 sections with anchor IDs

**Integration with Phase 3 Outline**:
```javascript
// Phase 3 defines sections with content_type:
{
  "sections": [
    {
      "heading": "H2: Budget und Anforderungsprofil",
      "content_type": "tutorial",  // ← Triggers HowTo Schema
      "word_count": 300
    }
  ]
}

// Phase 5 converts tutorial sections to HowToStep objects
// Each H3 subsection becomes one step
// Extract first 150 chars of section content as step text
```

---

### 4. Breadcrumb Schema (Navigation)

**When to use**:
- ✅ For all Ratgeber articles (required for navigation clarity)
- ✅ Especially important for deep URLs (/ratgeber/category/article)

**Required Properties**:
- `itemListElement` - Array of ListItem objects
- Each ListItem needs `position`, `name`, `item` (URL)

**Template**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
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
      "name": "Pferdekauf",
      "item": "https://pferdewert.de/ratgeber/pferdekauf"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Pferd kaufen: Worauf achten?",
      "item": "https://pferdewert.de/ratgeber/pferdekauf/pferd-kaufen-worauf-achten"
    }
  ]
}
```

**PferdeWert.de URL Structure Patterns**:

| URL Pattern | Breadcrumb Structure |
|------------|---------------------|
| `/ratgeber/{article}` | Startseite → Ratgeber → {article} |
| `/ratgeber/{category}/{article}` | Startseite → Ratgeber → {category} → {article} |
| `/ratgeber/{cat1}/{cat2}/{article}` | Startseite → Ratgeber → {cat1} → {cat2} → {article} |

**Best Practices**:
- Always start with "Startseite" (position 1)
- Always include "Ratgeber" (position 2)
- Last item (current page) should match article H1 title
- URLs must be absolute (https://pferdewert.de/...)
- Max 5 levels (Google recommendation)

---

## Implementation Patterns

### Pattern 1: Multiple Schemas on One Page

**Recommended Order**:
1. Article Schema (primary, always first)
2. Breadcrumb Schema (navigation, always second)
3. FAQ Schema (if applicable)
4. HowTo Schema (if applicable)

**Implementation**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "...",
      ...
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [...]
    }
  ]
}
</script>
```

**Alternative (separate script tags)**:
```html
<script type="application/ld+json">
{ "@type": "Article", ... }
</script>
<script type="application/ld+json">
{ "@type": "BreadcrumbList", ... }
</script>
<script type="application/ld+json">
{ "@type": "FAQPage", ... }
</script>
```

**Recommendation**: Use `@graph` approach (single script tag) for better maintainability.

---

### Pattern 2: Dynamic Schema Generation (Phase 5 Automation)

**Input**: Phase 3 Outline + Phase 4 Content

**Process**:
1. Extract metadata from frontmatter (title, description, date)
2. Parse URL structure for Breadcrumb levels
3. Identify FAQ section for FAQ Schema
4. Identify tutorial/step sections for HowTo Schema
5. Generate JSON-LD objects
6. Validate with Google Structured Data Testing Tool

**Example Automation Logic**:
```javascript
// Pseudo-code for Phase 5 Sub-Agent prompt:

function generateSchemas(article) {
  const schemas = [];

  // 1. Article Schema (always required)
  schemas.push({
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "datePublished": article.publishDate,
    "dateModified": article.lastModified,
    // ... other required fields
  });

  // 2. Breadcrumb Schema (always required)
  const breadcrumbs = parseBreadcrumbsFromURL(article.url);
  schemas.push({
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  });

  // 3. FAQ Schema (conditional)
  if (article.hasFAQSection) {
    const faqQuestions = extractFAQFromContent(article.content);
    schemas.push({
      "@type": "FAQPage",
      "mainEntity": faqQuestions
    });
  }

  // 4. HowTo Schema (conditional)
  if (article.contentFormat === "tutorial") {
    const steps = extractStepsFromContent(article.content);
    schemas.push({
      "@type": "HowTo",
      "name": article.title,
      "step": steps
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": schemas
  };
}
```

---

## Validation & Testing

### Google Structured Data Testing Tools

**Primary Tool**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- Validates JSON-LD syntax
- Shows preview of rich snippet
- Identifies errors and warnings

**Alternative**: [Schema.org Validator](https://validator.schema.org/)
- More detailed technical validation
- Checks all schema.org properties

**Validation Checklist**:
- ✅ No syntax errors (JSON valid)
- ✅ All required properties present
- ✅ No critical warnings (yellow flags acceptable)
- ✅ Rich snippet preview looks correct
- ✅ Mobile preview tested

---

## Common Errors & Fixes

### Error 1: Missing Required Property

**Error Message**: "Missing field 'datePublished' (required)"

**Fix**: Add missing property to Article Schema
```json
{
  "@type": "Article",
  "headline": "...",
  "datePublished": "2025-01-04T10:00:00+01:00"  // ← Add this
}
```

---

### Error 2: Invalid Image Dimensions

**Error Message**: "The image should be at least 1200px wide"

**Fix**: Ensure hero images are ≥1200px width
```json
{
  "image": {
    "@type": "ImageObject",
    "url": "https://pferdewert.de/images/hero-1920x1080.jpg",  // ✅ 1920px wide
    "width": 1920,
    "height": 1080
  }
}
```

**PferdeWert.de Standard Image Sizes**:
- Hero Images: 1920x1080px (16:9)
- Step Images: 1200x900px (4:3)
- Logo: 600x60px (10:1)

---

### Error 3: Invalid Date Format

**Error Message**: "Invalid ISO 8601 date"

**Fix**: Use correct ISO 8601 format with timezone
```json
// ❌ Wrong:
"datePublished": "04.01.2025"
"datePublished": "2025-01-04"

// ✅ Correct:
"datePublished": "2025-01-04T10:00:00+01:00"  // CET (winter)
"datePublished": "2025-06-15T10:00:00+02:00"  // CEST (summer)
```

---

### Error 4: FAQ Answers Too Short

**Warning**: "Answer text is very short"

**Fix**: Expand answers to 150-300 characters with concrete details
```json
// ❌ Too short:
"text": "Ein gesundes Pferd kostet 3.000-8.000€."

// ✅ Better:
"text": "Ein gesundes Freizeitpferd kostet in Deutschland durchschnittlich 3.000-8.000€. Die Preisspanne hängt von Rasse, Alter, Ausbildungsstand und Gesundheitszustand ab. Turniererprobte Pferde können 15.000-50.000€+ kosten."
```

---

### Error 5: Incorrect Schema Type for Content

**Warning**: "HowTo schema recommended for this content"

**Fix**: Use HowTo instead of Article for step-by-step tutorials
```json
// If content has clear steps (1., 2., 3.):
{
  "@type": "HowTo",  // ← Not "Article"
  "name": "Pferd kaufen Anleitung",
  "step": [...]
}
```

**Note**: You can use both Article AND HowTo via `@graph` for tutorial content.

---

## PferdeWert.de-Specific Guidelines

### Author Attribution

**Always use Organization (not Person)**:
```json
// ✅ Correct:
"author": {
  "@type": "Organization",
  "name": "PferdeWert.de",
  "url": "https://pferdewert.de"
}

// ❌ Wrong:
"author": {
  "@type": "Person",
  "name": "Max Mustermann"
}
```

**Reason**: PferdeWert.de is a platform brand, not personal blog.

---

### Publisher Logo Requirements

**Exact Specifications** (Google requirement):
- Format: PNG or JPG
- Dimensions: 600x60px (10:1 ratio) OR 60x600px (1:10 ratio)
- Background: White or transparent
- File size: < 100KB

**PferdeWert.de Logo**:
```json
"publisher": {
  "@type": "Organization",
  "name": "PferdeWert.de",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pferdewert.de/images/logo-600x60.png",
    "width": 600,
    "height": 60
  }
}
```

**Location**: `/frontend/public/images/logo-600x60.png`

---

### Image Best Practices for Equestrian Content

**Hero Images** (main article image):
- Size: 1920x1080px (16:9)
- Format: WebP with JPG fallback
- File size: < 200KB
- Alt text: Descriptive, keyword-optimized
- Example: "Pferdekauf Beratung: Gesundheitscheck beim Tierarzt"

**Step Images** (for HowTo schemas):
- Size: 1200x900px (4:3)
- Format: WebP with JPG fallback
- File size: < 150KB
- Naming: `schritt-{n}-{description}.jpg`

**Image CDN**: Use Vercel Image Optimization
```javascript
// Next.js Image component:
<Image
  src="/images/ratgeber/pferd-kaufen-guide.jpg"
  width={1920}
  height={1080}
  alt="Pferdekauf Guide"
/>
```

---

### Category-Specific Schema Recommendations

| Content Category | Primary Schema | Additional Schemas |
|-----------------|----------------|-------------------|
| **Pferdekauf** | Article | HowTo + FAQ + Breadcrumb |
| **Pferdegesundheit** | Article | FAQ + Breadcrumb |
| **Pferderassen** | Article | Breadcrumb |
| **Pferdehaltung** | Article | HowTo (if tutorial) + FAQ |
| **Rechtliches** | Article | FAQ + Breadcrumb |

**Reasoning**:
- Pferdekauf: Often step-by-step process → HowTo Schema
- Gesundheit: Many user questions → FAQ Schema
- Rassen: Informational, FAQ less common
- Haltung: Tutorial content common → HowTo Schema
- Rechtliches: Complex questions → FAQ Schema

---

## Integration with Phase 5 Workflow

### Step-by-Step Schema Generation (Phase 5 Sub-Agent)

**Input from Previous Phases**:
- Phase 3: `content-outline.json` (structure, sections, content_type)
- Phase 4: `article-draft.md` (full content, FAQ section, steps)

**Phase 5 Process**:

1. **Generate Article Schema** (required)
   - Extract `article_title` from outline
   - Extract `meta_description` from outline
   - Use current date for `datePublished` and `dateModified`
   - Get hero image URL from content frontmatter
   - Add PferdeWert.de organization author/publisher

2. **Generate Breadcrumb Schema** (required)
   - Parse article URL structure
   - Create ListItem for each URL segment
   - Use outline `article_title` for last breadcrumb

3. **Generate FAQ Schema** (conditional)
   - Check if `faq_section` exists in outline
   - Extract questions and answers from article content
   - Format as Question/Answer objects
   - Ensure answers are 150-300 characters

4. **Generate HowTo Schema** (conditional)
   - Check if any section has `content_type: "tutorial"`
   - Extract H3 headings as steps
   - Extract first paragraph of each subsection as step text
   - Add step images if present in content

5. **Combine into @graph structure**
   - Create single JSON-LD object with all schemas
   - Validate syntax (JSON valid)
   - Save to `seo/schema-article.json`

**Output Files**:
- `seo/schema-article.json` - Complete JSON-LD with all schemas
- `seo/schema-faq.json` - Standalone FAQ Schema (optional, for reference)
- `seo/schema-howto.json` - Standalone HowTo Schema (optional)

---

### Sub-Agent Prompt Template (Phase 5)

```xml
<invoke name="Task">
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Generiere Schema.org JSON-LD Markup für den finalen Artikel.

## INPUT-DATEN:
1. Phase 3 Output: content-outline.json
2. Phase 4 Output: article-draft.md
3. Article URL: {url}
4. Publish Date: {current_date}

## AUFGABE:
Erstelle JSON-LD Schema Markup mit folgenden Schemas:

### 1. Article Schema (PFLICHT)
- headline: {article_title} aus Outline
- description: {meta_description} aus Outline
- author: Organization "PferdeWert.de"
- publisher: Organization mit logo-600x60.png
- datePublished/dateModified: {current_date} in ISO 8601 (+01:00 timezone)
- image: Hero image URL aus Content
- mainEntityOfPage: {url}

### 2. Breadcrumb Schema (PFLICHT)
- Parse URL structure: {url}
- Create ListItem für jeden URL-Segment:
  - Position 1: Startseite
  - Position 2: Ratgeber
  - Position N: Current article title

### 3. FAQ Schema (wenn faq_section in Outline)
- Extract questions aus `faq_section` in Outline
- Extract answers aus article-draft.md FAQ section
- Ensure answers 150-300 chars
- Format as Question/Answer objects

### 4. HowTo Schema (wenn content_type="tutorial" in Outline)
- Extract steps aus H3 headings in tutorial sections
- Each step: name (H3), text (first 150 chars), url (anchor link)
- totalTime: Estimate based on step count
- estimatedCost: Average cost aus Content (if mentioned)

## OUTPUT FORMAT (JSON):
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", ... },
    { "@type": "BreadcrumbList", ... },
    { "@type": "FAQPage", ... },  // if applicable
    { "@type": "HowTo", ... }     // if applicable
  ]
}

## VALIDATION:
- Verwende https://search.google.com/test/rich-results für Validation
- Alle required properties müssen vorhanden sein
- Keine syntax errors erlaubt
- Image URLs müssen absolute paths sein (https://pferdewert.de/...)

## REFERENCE:
Verwende Templates aus SEO/SEO-PROZESS/methodology/schema-markup.md
</parameter>
</invoke>
```

---

## Quality Checklist

### Before Publishing (Phase 6 Integration)

- [ ] **Article Schema**: All required properties present (headline, description, author, publisher, dates, image)
- [ ] **Breadcrumb Schema**: URL structure correctly parsed, all levels present
- [ ] **FAQ Schema**: Min 3 questions, answers 150-300 chars, PAA questions used
- [ ] **HowTo Schema**: Min 3 steps, each step has name + text, totalTime estimated
- [ ] **Image Requirements**: Hero ≥1200px wide, logo 600x60px, all absolute URLs
- [ ] **Date Format**: ISO 8601 with German timezone (+01:00 or +02:00)
- [ ] **JSON Syntax**: Valid JSON, no trailing commas, proper escaping
- [ ] **Google Validation**: Rich Results Test shows no errors, rich snippet preview correct
- [ ] **Mobile Preview**: Tested in Rich Results Test mobile view

### Common Validation Errors to Check

- [ ] Missing `datePublished` in Article
- [ ] Invalid image dimensions (< 1200px)
- [ ] Incorrect date format (not ISO 8601)
- [ ] FAQ answers too short (< 150 chars)
- [ ] HowTo missing `totalTime` property
- [ ] Breadcrumb URLs not absolute (missing https://)
- [ ] Logo not 600x60px dimensions
- [ ] Syntax errors (trailing commas, unescaped quotes)

---

## Advanced: Multi-Language Schema (Future)

**Note**: Currently PferdeWert.de is German-only, but for future expansion:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pferd kaufen: Worauf achten?",
  "inLanguage": "de-DE",
  "availableLanguage": ["de-DE"],
  "translationOfWork": {
    "@type": "Article",
    "@id": "https://pferdewert.com/en/guide/buying-a-horse"
  }
}
```

**When to implement**: If English version (.com) launched.

---

## Version History

**v1.0** (2025-01-04):
- Initial Schema Markup reference for Phase 5 integration
- Article, FAQ, HowTo, Breadcrumb templates
- PferdeWert.de-specific guidelines
- Integration patterns with Phase 5 workflow

---

**Next Methodology File**: `quality-gates.md` (Validation thresholds for all 6 phases)
