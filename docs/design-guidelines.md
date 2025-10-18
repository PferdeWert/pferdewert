# UI/UX Design Guidelines for PferdeWert

This document provides comprehensive design guidelines for PferdeWert.de. These principles should be followed for all design work to ensure consistency, conversion optimization, and excellent user experience.

## 📝 Headlines Design

### Schriftgröße & Gewichtung
- **H1 (Hero)**: 60px (Desktop) / 32-40px (Mobile)
- **H2**: 48px (Desktop) / 32-40px (Mobile)
- **Font-Weight**: 700-900 (Bold bis Black)
- **Maximal 70 Zeichen pro Headline**
- **Maximal 2 Zeilen verwenden**

### Spacing & Typografie
- **Letter-spacing**: -0.4px reduzieren
- **Line-height**: 1 (kompakt halten)
- **Semantische Zeilenumbrüche**, nicht visuelle
- **Höchsten Kontrast** zur Basis-Farbe verwenden

### Inhaltsstrategie
- **Eine Headline pro Abschnitt** - nicht 0, nicht 2, genau 1
- Headlines sollen **"zu gut um wahr zu sein" klingen**
- **Neugier wecken**, aber dann mit Beweisen untermauern

## 📄 Text-Paragraphen Design

### Visuelle Hierarchie
- **Paragraphen**: Standard Font-Weight 400, text-lg (18px) bevorzugt
- **IMPORTANT**: NEVER use `text-sm` (14px) for body paragraphs – minimum is `text-base` (16px), better: `text-lg` (18px)
- **Why**: `text-sm` is too small and hard to read, especially on mobile devices
- **Sekundäre Farbe** für weniger Kontrast als Headlines
- **Line-height erhöhen** für bessere Lesbarkeit (`leading-relaxed`)
- **Text linksbündig ausrichten** (nie zentriert bei längeren Texten)

### Lesbarkeit optimieren
- **Max-width**: 500px für Paragraphen
- **Große Textblöke in Bullet Points aufteilen**
- **Maximal 3 Sätze pro Paragraph**
- **Wichtige Wörter** mit Base Content Farbe (500/600 font-weight) hervorheben

## 🎯 Spacing System

### 4-Punkte Grid System
Alle Abstände durch 4 teilbar: `4px, 16px, 48px, etc.`

### Semantische Beziehungen durch Abstände
- **Paragraph zu Headline**: 16px
- **Button zu Textblock**: 32px
- **Bild zu Textblock**: 48px
- **Sektion zu Sektion**: 256px

### Breathing Room Prinzip
- **Im Zweifel zu viel Whitespace verwenden**
- **Maximal 5-6 Spacing-Regeln** definieren
- **Konsistent** über die gesamte Landing Page anwenden

## 🏆 Website-Optimierung Strategie

### Landing Page Struktur (Promise → Proof)
1. **Promise**: Headline die "zu gut um wahr zu sein" klingt
2. **Proof**: Jede durch die Promise aufgeworfene Frage beantworten:
   - **Wie funktioniert es?** → Schritte zeigen
   - **Warum dieses Produkt?** → Problem verstärken
   - **Kann ich vertrauen?** → Testimonials
   - **Kann ich es mir leisten?** → Preise zeigen
   - **Brauche ich es jetzt?** → Dringlichkeit schaffen

### Conversion-Optimierung
- **Alles entfernen**, was nicht die Promise unterstützt
- **Eine klare visuelle Hierarchie** pro Sektion:
  - 1 Headline
  - 1 Paragraph
  - 1 Bild
  - 1 Button

## 🎨 Vertrauensaufbau (speziell für PferdeWert)

### Vertrauenssignale implementieren
- **"1000+ Bewertungen"** (wenn erreicht)
- **DSGVO-Hinweise**
- **Konkrete Beispiele zeigen**
- **FAQ-Bereich**
- **Testimonials** (authentisch gestalten)

### Über Uns Seite
- **Story als Pferdebesitzer und KI-Experte** erzählen
- **Problem beim eigenen Pferdekauf** schildern
- **Lösung durch Leidenschaft** für beide Bereiche

## 📱 Responsive Design

### Mobile Anpassungen
- **Headlines kleiner**: 32-40px statt 60px
- **Alle Spacing-Regeln beibehalten**
- **Touch-freundliche Button-Größen**
- **Lesbarkeit auf kleinen Bildschirmen** priorisieren

## 🎨 Design Tokens & Implementation

### Typography Scale (Tailwind Classes)
```css
/* Headlines */
.headline-hero { @apply text-6xl md:text-5xl font-black tracking-tight leading-tight; }
.headline-section { @apply text-4xl md:text-3xl font-bold tracking-tight leading-tight; }

/* Body Text */
.body-text { @apply text-base font-normal leading-relaxed max-w-prose; }
.body-emphasis { @apply font-medium text-gray-900; }
```

### Spacing Scale (Tailwind Classes)
```css
/* Semantic Spacing */
.spacing-paragraph-to-headline { @apply mt-4; }
.spacing-button-to-text { @apply mt-8; }
.spacing-image-to-text { @apply mt-12; }
.spacing-section-to-section { @apply mt-64; }
```

### Color Hierarchy & Brand Colors

#### Brand Color System (Hex Values)
```css
/* Primary Brand Colors */
--brand: #4e463b          /* Primary brand color for headings, key elements */
--brand-light: #f8f8f6    /* Light background, subtle sections */
--brand-green: #406243    /* Accent green for highlights */
--brand-brown: #92400e    /* CTA brown for buttons */
--brand-brownDark: #78350f /* CTA hover state */

/* Additional Brand Colors */
--brand-beige: #fdf7f1    /* Highlight box backgrounds */
--brand-beige-border: #e0c9aa /* Highlight box borders */
```

#### Tailwind Class Mappings
```tsx
/* Brand Colors */
text-brand           // #4e463b - Primary headings, key text
bg-brand-light       // #f8f8f6 - Light backgrounds
text-brand-green     // #406243 - Accent highlights
bg-brand-brown       // #92400e - Primary CTA buttons
bg-brand-brownDark   // #78350f - CTA hover state

/* Ratgeber Highlight Boxes */
bg-[#fdf7f1]         // Beige box background
border-[#e0c9aa]     // Beige box border

/* Gradients */
bg-gradient-to-b from-amber-50 to-white  // Hero section background
```

#### Usage Guidelines
- **Primary Headlines**: `text-brand` (#4e463b) for maximum contrast
- **Body Text**: `text-gray-700` for readable secondary contrast
- **Emphasized Text**: `text-gray-900 font-medium` for medium contrast
- **CTA Buttons**: `bg-brand-brown` with `hover:bg-brand-brownDark`
- **Accent Elements**: `text-brand-green` for special highlights
- **Backgrounds**: `bg-brand-light` for subtle section backgrounds

## 🧪 Testing & Validation

### Pre-Design Checklist
- [ ] Screenshot current state with Playwright
- [ ] Identify conversion bottlenecks
- [ ] Review mobile experience first

### Post-Design Validation
- [ ] Test across all viewport sizes
- [ ] Validate typography hierarchy
- [ ] Check spacing consistency
- [ ] Measure loading performance
- [ ] A/B test critical conversion elements

### Conversion Metrics to Track
- **Form completion rate** (horse valuation form)
- **Pricing page conversion** 
- **Mobile bounce rate**
- **Time to first interaction**
- **Core Web Vitals scores**

## 🔧 Development Integration

### CSS Custom Properties
```css
:root {
  /* Typography */
  --font-size-hero: 3.75rem; /* 60px */
  --font-size-section: 3rem; /* 48px */
  --font-size-body: 1rem; /* 16px */
  
  /* Spacing */
  --space-paragraph-headline: 1rem; /* 16px */
  --space-button-text: 2rem; /* 32px */
  --space-image-text: 3rem; /* 48px */
  --space-section: 16rem; /* 256px */
  
  /* Line Heights */
  --line-height-tight: 1;
  --line-height-relaxed: 1.625;
}

@media (max-width: 768px) {
  :root {
    --font-size-hero: 2.25rem; /* 36px */
    --font-size-section: 2rem; /* 32px */
  }
}
```

## 📋 Component Guidelines

### Button Design
- **Minimum touch target**: 44px × 44px
- **Clear call-to-action text**
- **Single primary CTA per section**
- **Secondary buttons with lower visual weight**

### Form Design (Horse Valuation)
- **Progressive disclosure** for complex fields
- **Clear field labels** and helper text
- **Immediate validation feedback**
- **Mobile-optimized input types**

### Image Guidelines
- **WebP format** for all photos
- **Lazy loading** for performance
- **Alt text** for accessibility
- **Aspect ratio preservation** across devices

---

# 🔖 PART 2: Ratgeber-Specific Design Guidelines

This section contains design rules specific to SEO Ratgeber articles. These guidelines supplement the general landing page rules above and define the "Text First" approach for blog-style content.

---

## 📄 Ratgeber Design Philosophy

**"Text First"** – Ratgeber articles are blog-style content with semantic HTML as the foundation. Boxes should be used sparingly for strategic purposes only (max. 2-4 per article).

### Core Principle: Semantic HTML First, Components Only Where Strategic

95% of Ratgeber content should use semantic HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`). Custom components are only for:
- Conversion-CTAs (AI evaluation offer)
- Critical warnings (security notices, legal risks)
- Important checklist summaries

**NO Box Inflation!** Do NOT wrap every paragraph in boxes.

---

## 📐 Ratgeber Page Structure

Every Ratgeber article follows this structure:

1. **Hero Section**
   - Background: `bg-gradient-to-b from-amber-50 to-white` (Layout + Hero)
   - Optional Badge with `Award` icon: `bg-brand-light` + `text-brand/80`
   - Main title in Playfair Display: `text-brand`
   - Subheadline: `text-brand/80` (max. 2-3 sentences)
   - Metadata row (read time, date, category): Icon-Row with `text-brand/70`
   - Primary CTA: `bg-brand-brown` → Hover `bg-brand-brownDark`
   - Secondary CTA: Outline with `border-brand-brown`

2. **Hero Image**
   - Use `next/image` with `priority`
   - 4:3 aspect ratio
   - `rounded-xl` + `shadow-lg`

3. **Table of Contents**
   - Heading: `text-brand`
   - Links: `text-brand/80`, Hover: `text-brand-brown`

4. **Content Body (TEXT FIRST!)**
   - **Base: Semantic HTML** – Use `<h2>`, `<h3>`, `<h4>`, `<p>`, `<ul>`, `<ol>` for content structure
   - **Boxes only strategic**: Max. 2-4 `RatgeberHighlightBox` per article for:
     - Conversion-CTAs (AI evaluation offer)
     - Critical warnings (security notices, legal risks)
     - Important checklist summaries
   - **No Box Inflation**: DO NOT wrap every section in boxes!
   - Section titles: `text-brand`
   - Body text: `text-gray-700 leading-relaxed`

5. **FAQ + Related Articles + Final CTA** at the end of the page

---

## 🔤 Ratgeber Typography Rules

### Font Families
- **Headings**: Playfair Display (`font-serif`)
- **Body Text & UI Elements**: Lato (`font-sans`)

### Body Text Standards
- **STANDARD**: `text-lg` for ALL `<p>` tags in Ratgeber content (better readability and consistency)
- **IMPORTANT**: NEVER use `text-sm` – minimum is `text-base` (better: `text-lg` for body text)
- **Why**: `text-sm` is too small and hard to read

### Other Typography Elements
- **Blockquotes**: Playfair Display italic, left border in `brand-green`
- **Max-width**: 500px for paragraphs
- **Line-height**: `leading-relaxed` for body text

---

## 🎨 Ratgeber Color & Box System

### Brand Colors (Hex Values)
- **Base Background**: `#f8f8f6` (Tailwind: `brand.light`)
- **Primary Text**: `#4e463b` (`brand`)
- **Accent Green**: `#406243` (`brand.green`)
- **CTA Brown**: `#92400e` + Hover: `#78350f`

### Highlight Boxes (Use Sparingly!)
- **Background**: `#fdf7f1`
- **Border**: `#e0c9aa`
- **Headings**: `text-brand-brown`
- **Shadow**: `shadow-soft` (Tailwind Config)
- **Max. 2-4 boxes per article** – only for CTAs, warnings, important checklists

### Deprecated InfoBox
- ❌ **Do NOT use InfoBox** – causes rendering issues with `icon` prop
- Use semantic HTML with `<div>`, `<ul>`, `<p>` instead

---

## 🧩 Ratgeber Component Guidelines

### Priority: Semantic HTML First, Components Only Where Strategic!

#### Always Use (Structure & Conversion)

**RatgeberHero / RatgeberHeroImage**
- Standard hero with badge, meta row, and CTA buttons
- Images always via `RatgeberHeroImage`
- Secondary CTA "Zum Inhalt" always uses `ChevronDown` icon from `lucide-react` (`h-5 w-5`)

**RatgeberTableOfContents**
- Uses `sections` array: `{ id, title }`
- `onNavigate` for scroll helper

**FAQ**
- Always under `id="faq"`
- Schema data automatically via component

**RatgeberRelatedArticles**
- Max. three entries
- Auto-centered if <3 articles (`md:w-[320px]`)
- Data structure: `{ href, image, title, badge, readTime, description }`
- **Data Source**: Use `getRatgeberBySlug()` from Registry for consistent image paths

**RatgeberFinalCTA**
- Final CTA with image + button "Jetzt Pferdewert berechnen"
- **STANDARD IMAGE**: Always use `/images/shared/blossi-shooting.webp` (Hero image from index page)
- Design: Beige box (`bg-[#fdf7f1]`, `border-[#e0c9aa]`), centered layout
- Responsive: Image `max-w-2xl`, Button with `min-h-[44px]` (touch target)
- Placement: Always after Related Articles, before page end
- Props: `image` (src/alt/width/height), `title`, `description`, `ctaHref`, `ctaLabel`

**CTAButton**
- Use existing variants: `type="primary" | "secondary"`

#### Use Sparingly (Max. 2-4x per article)

**RatgeberHighlightBox**
- Beige cards (`bg-[#fdf7f1]`) with optional icon and title
- **Only use for**:
  - Conversion-CTAs (AI evaluation offer)
  - Critical warnings (security notices, legal risks)
  - Important checklist summaries
- **DO NOT use for**: Regular content, list formats, general explanations
- **Max. 2-4 boxes per article** – otherwise use semantic HTML!

#### Deprecated – Do Not Use

- ❌ **ContentSection**: Replace with `<section>`, `<h2>`, `<h3>`, `<p>` for better semantics
- ❌ **RatgeberInfoTiles**: Replace with normal `<ul>` or `<ol>` within `<section>`
- ❌ **RatgeberRegionGrid**: Replace with semantic lists and headings
- ❌ **InfoBox**: Deprecated due to `icon` prop conflicts – use `<div>`, `<ul>`, `<p>` instead
- ❌ **ArticleMetadata**: If used, verify if really needed (often redundant to Hero meta)

---

## ✍️ Ratgeber Content Guidelines

### Tone & Voice
- **ALWAYS use "Du" form** ("Du", "Dein", "Dir") in Ratgeber articles – NO formal "Sie" form!

### Text Structure
- **Paragraphs**: Max. 3-4 sentences, `leading-relaxed`
- **Subheadings**: Every 4-6 paragraphs (`text-3xl` → `text-2xl`)
- **Lists**: Use `<ol>`/`<ul>`; bold keywords for emphasis
- **Blockquotes**: For key statements
- **Tables**: Use semantic HTML `<table>` or simple lists instead of grid with boxes

---

## 📸 Ratgeber Media & Assets

- **Images**: Only via `next/image` + `sizes` attribute
- **Formats**: Prefer `.webp`
- **Style**: Emotional, authentic horse/people images (no stock look)
- **Videos**: Embedded, no autoplay

---

## 🎯 Ratgeber CTA & Conversion

### Link Targets
- **IMPORTANT**: All CTAs link to `/pferde-preis-berechnen` (NOT `/bewertung`!)

### Standard CTA Text
- **Default**: "Jetzt Pferdewert berechnen"
- Only slightly adjust if thematically appropriate

### Final CTA Design
- Always in own beige box: `#fdf7f1` + `#e0c9aa`
- Headline: `text-brand`
- Subtext: `text-brand/80`
- Button: `CTAButton type="primary"`
- Optional secondary link (analysis example) as outline button

---

## 🔍 Ratgeber SEO Meta-Data Integration

**IMPORTANT**: Every Ratgeber article has a corresponding `*-meta.json` file in the SEO content folder (e.g., `SEO/SEO-CONTENT/pferd-kaufen/pferd-kaufen-meta.json`).

### Meta-Data Implementation in Next.js

```tsx
import Head from 'next/head';
import metaData from '@/SEO/SEO-CONTENT/[keyword]/[keyword]-meta.json';

export default function RatgeberPage() {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaData.meta_tags.title}</title>
        <meta name="description" content={metaData.meta_tags.description} />
        <meta name="robots" content={metaData.meta_tags.robots} />
        <link rel="canonical" href={metaData.meta_tags.canonical} />
        <meta httpEquiv="content-language" content={metaData.meta_tags.language} />

        {/* Open Graph Tags */}
        <meta property="og:type" content={metaData.open_graph.type} />
        <meta property="og:title" content={metaData.open_graph.title} />
        <meta property="og:description" content={metaData.open_graph.description} />
        <meta property="og:url" content={metaData.open_graph.url} />
        <meta property="og:site_name" content={metaData.open_graph.site_name} />
        <meta property="og:locale" content={metaData.open_graph.locale} />
        <meta property="og:image" content={metaData.open_graph.image.url} />
        <meta property="og:image:width" content={metaData.open_graph.image.width} />
        <meta property="og:image:height" content={metaData.open_graph.image.height} />
        <meta property="og:image:alt" content={metaData.open_graph.image.alt} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content={metaData.twitter_card.card} />
        <meta name="twitter:title" content={metaData.twitter_card.title} />
        <meta name="twitter:description" content={metaData.twitter_card.description} />
        <meta name="twitter:image" content={metaData.twitter_card.image} />
      </Head>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metaData.structured_data.article)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metaData.structured_data.faq)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metaData.structured_data.breadcrumb)
        }}
      />

      {/* Page Content */}
      <main>{/* Artikel-Content hier */}</main>
    </>
  );
}
```

### Meta-Data Checklist for Page Creation

- ✅ Title tag from `meta_tags.title`
- ✅ Meta description from `meta_tags.description`
- ✅ Canonical URL from `meta_tags.canonical`
- ✅ Open Graph tags complete (social media previews)
- ✅ Twitter Card tags complete
- ✅ Structured data: Article, FAQ, Breadcrumb as JSON-LD
- ✅ Service schema (if AI evaluation mentioned)

**Note**: Meta-data is **NOT** part of visible article content, but exclusively for SEO and social media previews in `<Head>`.

---

## 💻 Ratgeber Code Snippets & Examples

### Text-First with Strategic Boxes

```tsx
// Semantic Content Structure (Standard - Use for 95% of content)
<section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
    Hauptüberschrift des Abschnitts
  </h2>

  <p className="text-lg text-gray-700 leading-relaxed">
    Einleitender Absatz mit 3-4 Sätzen. Nutze semantisches HTML für 95%
    des Contents. Listen, Absätze und Überschriften bilden die Basis.
  </p>

  <h3 className="text-2xl font-serif font-bold text-brand mt-8">
    Unterüberschrift für Details
  </h3>

  <ul className="space-y-2 text-gray-700">
    <li>• Listenpunkt mit wichtigen Informationen</li>
    <li>• Weitere relevante Details ohne Box-Wrapper</li>
    <li>• Keywords können <strong>fett</strong> hervorgehoben werden</li>
  </ul>
</section>

// Strategic Highlight Box (max. 2-4 per article!)
<RatgeberHighlightBox
  title="Wichtiger Hinweis zur Sicherheit"
  icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />}
>
  <p className="text-base text-gray-700 leading-relaxed">
    Nur für kritische Warnungen, Conversion-CTAs oder wichtige Checklisten.
    Nicht für reguläre Inhalte verwenden!
  </p>
</RatgeberHighlightBox>

// Related Articles (Structural Component)
<RatgeberRelatedArticles
  title="Weiterführende Artikel"
  articles={relatedArticles}
  description="Vertiefen Sie Ihr Wissen über die AKU."
/>
```

### Internal Linking

Every Ratgeber page with a "Related Articles" section must include an entry to the central AKU hub at `/aku-pferd`.

---

## 🚀 Deployment Checklist for New Ratgeber Articles

**IMPORTANT**: All Ratgeber articles are centrally managed via the Ratgeber Registry. This system automates sitemap generation and display on the overview page.

### 4-Step Process for New Ratgeber:

#### 1. Create Ratgeber Page
- Create new page file in `/frontend/pages/pferde-ratgeber/`
- Example: `/frontend/pages/pferde-ratgeber/pferd-versichern.tsx`
- Implement all design guidelines from this document
- Integrate SEO meta-data from corresponding `*-meta.json` file

#### 2. Add Registry Entry
- Open `/frontend/lib/ratgeber-registry.ts`
- Add new entry to `RATGEBER_ENTRIES` array:

```typescript
{
  slug: 'pferd-versichern',  // URL slug (without /pferde-ratgeber/)
  title: 'Pferd versichern - Der komplette Ratgeber',
  description: 'Alles über Pferdeversicherungen...',
  category: 'Finanzen & Recht',
  readTime: '12 Min.',
  image: '/path-to-image.jpg',
  priority: '0.7',  // SEO Priority (0.0 - 1.0)
  changefreq: 'monthly'  // SEO Change Frequency
}
```

#### 3. Update Sitemap & robots.txt
- Run: `npm run sitemap`
- This command automatically generates:
  - `/frontend/public/sitemap.xml` with new Ratgeber entry
  - `/frontend/public/robots.txt` with updated crawling structure
- Verify generation in console output

#### 4. Deploy
- Commit & push changes
- After deployment:
  - Overview page `/pferde-ratgeber` automatically displays new article
  - Sitemap updated for search engines
  - New page available at `/pferde-ratgeber/[slug]`

### Important Notes

- **Single Source of Truth**: Ratgeber Registry (`ratgeber-registry.ts`) is the central data source
- **No Manual Sitemap Changes**: NEVER directly edit `sitemap.xml` or `robots.txt`
- **Overview Page**: Automatically generated from Registry, no manual updates needed
- **Order Matters**: Ratgeber displayed in order they appear in Registry array
- **Testing**: Test new page locally (`npm run dev`) before generating sitemap

### Common Mistakes to Avoid

- ❌ **Manually edit sitemap** → Use `npm run sitemap`
- ❌ **Hardcode overview page** → Registry automatically read
- ❌ **Forget Registry entry** → Page won't appear in sitemap/overview
- ❌ **Forget sitemap before deploy** → Old sitemap deployed

### Available Helper Functions

```typescript
import { getRatgeberPath, getRatgeberBySlug, getRatgeberByCategory } from '@/lib/ratgeber-registry';

// Generate URL path
const path = getRatgeberPath('pferd-versichern'); // → /pferde-ratgeber/pferd-versichern

// Find entry by slug
const entry = getRatgeberBySlug('pferd-versichern');

// Get all entries of a category
const financeArticles = getRatgeberByCategory('Finanzen & Recht');
```

---

# Summary: Two Design Systems

This document now contains **two complementary design systems**:

## PART 1: General Landing Page Design Guidelines
Use for:
- Homepage
- Pricing pages
- Product landing pages
- Marketing pages
- Conversion-focused pages

Key principles:
- Headlines "too good to be true"
- Promise → Proof structure
- Heavy use of custom components
- Maximum conversion optimization

## PART 2: Ratgeber-Specific Design Guidelines
Use for:
- All `/pferde-ratgeber/*` pages
- SEO blog articles
- Content-heavy pages
- Educational content

Key principles:
- **"Text First"** philosophy
- 95% semantic HTML
- Strategic component usage (max. 2-4 boxes)
- Always "Du" form
- Managed via Ratgeber Registry

---

*These guidelines should be followed consistently across all PferdeWert design work to ensure optimal user experience and conversion rates.*