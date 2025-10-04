# SEO Designer Handoff - Page Build Prompt

## 🎯 Dein Auftrag

Du bist der **Frontend Designer/Developer** für PferdeWert.de. Du baust jetzt eine **neue SEO-optimierte Blog-Seite** basierend auf den fertigen SEO-Dokumenten.

**Keyword:** `{KEYWORD}`  
Alle Dokumente sind in diesem Ordner in einem unterordner zu dem keyword: 
/SEO/SEO-CONTENT
**Artikel-Slug:** `{keyword-slug}`

---

## 📋 Dokumente die du brauchst

### **MUST-HAVE (4 Kern-Dokumente):**

#### 1. **Content & Structure**
```
📄 08-final-output/final_article.md
```
**Enthält:** Kompletter Artikel-Content in Markdown
**Nutze für:** 
- Alle H1, H2, H3 Überschriften
- Kompletter Text-Content
- FAQ-Sektion
- Interne/Externe Links

---

#### 2. **SEO Metadaten**
```
📄 05-content-outline/seo_metadata.json
```
**Enthält:** Alle technischen SEO-Daten
**Nutze für:**
- `<title>` Tag
- `<meta name="description">`
- Open Graph Tags (og:title, og:image, etc.)
- Twitter Cards
- Schema Markup (Article, FAQ, Breadcrumb)
- Hreflang Tags
- Canonical URL

**Beispiel-Extraktion:**
```javascript
const metadata = JSON.parse(fs.readFileSync('05-content-outline/seo_metadata.json'));

// Head Section
<title>{metadata.basic.meta_title}</title>
<meta name="description" content="{metadata.basic.meta_description}" />
<link rel="canonical" href="{metadata.basic.canonical_url}" />

// Open Graph
<meta property="og:title" content="{metadata.open_graph.og_title}" />
<meta property="og:image" content="{metadata.open_graph.og_image}" />

// Schema
<script type="application/ld+json">
  {metadata.schema_markup.article_schema}
</script>
```

---

#### 3. **FAQ Schema & Content**
```
📄 05-content-outline/faq_structured.json
```
**Enthält:** Strukturierte FAQ-Daten + Schema Markup
**Nutze für:**
- FAQ-Komponente im UI
- FAQ Schema im `<head>`

**Beispiel-Extraktion:**
```javascript
const faq = JSON.parse(fs.readFileSync('05-content-outline/faq_structured.json'));

// Schema ins <head>
<script type="application/ld+json">
  {faq.schema_markup}
</script>

// UI Komponente
{faq.faq_section.questions.map(q => (
  <FAQItem question={q.question} answer={q.answer} />
))}
```

---

#### 4. **Assets Liste**
```
📄 08-final-output/assets_list.md
```
**Enthält:** Alle Bilder, Grafiken, Videos
**Nutze für:**
- Hero Image URL
- Content Images mit Alt-Texten
- Infografiken
- Custom Graphics

---

### **NICE-TO-HAVE (3 Zusatz-Dokumente):**

#### 5. **Design-Spezifikationen** (dein bestehendes)
```
📄 SEO/SEO-DESIGN.md (deine Design-Guidelines)
```
**Nutze für:**
- Layout-Struktur
- Component-Styling
- Responsive Breakpoints
- Typography
- Colors

---

#### 6. **Internal Links**
```
📄 06-content-draft/internal_links.json
```
**Enthält:** Alle internen Verlinkungen
**Nutze für:**
- Links zu anderen PferdeWert.de Seiten
- Related Articles
- CTA-Buttons

---

#### 7. **Performance Metadata**
```
📄 08-final-output/metadata.json
```
**Enthält:** Content-Stats & Performance-Targets
**Nutze für:**
- Reading Time Display
- Word Count
- Last Updated Date
- Author Info

---

## 🏗️ Build-Anleitung

### **Schritt 1: Page Setup**

1. **Erstelle neue Page/Route:**
   ```
   /pferde-ratgeber/{keyword-slug}
   ```

2. **Lade alle 4 Kern-Dokumente:**
   ```javascript
   const articleContent = fs.readFileSync('08-final-output/final_article.md', 'utf8');
   const seoMetadata = JSON.parse(fs.readFileSync('05-content-outline/seo_metadata.json'));
   const faqData = JSON.parse(fs.readFileSync('05-content-outline/faq_structured.json'));
   const assets = parseMarkdown('08-final-output/assets_list.md');
   ```

---

### **Schritt 2: HTML Head aufbauen**

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Basic SEO -->
  <title>{seoMetadata.basic.meta_title}</title>
  <meta name="description" content="{seoMetadata.basic.meta_description}" />
  <link rel="canonical" href="{seoMetadata.basic.canonical_url}" />
  
  <!-- Robots -->
  <meta name="robots" content="{seoMetadata.technical_seo.robots}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="{seoMetadata.open_graph.og_title}" />
  <meta property="og:description" content="{seoMetadata.open_graph.og_description}" />
  <meta property="og:type" content="{seoMetadata.open_graph.og_type}" />
  <meta property="og:url" content="{seoMetadata.open_graph.og_url}" />
  <meta property="og:image" content="{seoMetadata.open_graph.og_image}" />
  <meta property="og:image:width" content="{seoMetadata.open_graph.og_image_width}" />
  <meta property="og:image:height" content="{seoMetadata.open_graph.og_image_height}" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="{seoMetadata.twitter_card.twitter_card}" />
  <meta name="twitter:title" content="{seoMetadata.twitter_card.twitter_title}" />
  <meta name="twitter:description" content="{seoMetadata.twitter_card.twitter_description}" />
  <meta name="twitter:image" content="{seoMetadata.twitter_card.twitter_image}" />
  
  <!-- Hreflang -->
  <link rel="alternate" hreflang="de" href="{seoMetadata.hreflang.de}" />
  <link rel="alternate" hreflang="de-at" href="{seoMetadata.hreflang['de-at']}" />
  <link rel="alternate" hreflang="de-ch" href="{seoMetadata.hreflang['de-ch']}" />
  
  <!-- Schema Markup: Article -->
  <script type="application/ld+json">
    {JSON.stringify(seoMetadata.schema_markup.article_schema)}
  </script>
  
  <!-- Schema Markup: FAQ -->
  <script type="application/ld+json">
    {JSON.stringify(faqData.schema_markup)}
  </script>
  
  <!-- Schema Markup: Breadcrumb -->
  <script type="application/ld+json">
    {JSON.stringify(seoMetadata.schema_markup.breadcrumb_schema)}
  </script>
</head>
```

---

### **Schritt 3: Page Layout aufbauen**

**Befolge deine `SEO/SEO-DESIGN.md` Guidelines für:**

#### **Hero Section:**
- H1 aus `final_article.md`
- Hero Image aus `assets_list.md`
- Author Info + Date aus `seo_metadata.json`
- Reading Time aus `metadata.json`

#### **Breadcrumbs:**
- Nutze `seo_metadata.json` → `schema_markup.breadcrumb_schema`

#### **Table of Contents:**
- Extrahiere alle H2 aus `final_article.md`
- Generiere Jump-Links

#### **Article Content:**
- Render `final_article.md` als HTML
- Behalte alle H2, H3, H4 Hierarchie
- Füge Images aus `assets_list.md` ein
- Achte auf Alt-Texte

#### **FAQ Section:**
- Render `faqData.faq_section.questions`
- Nutze Accordion/Collapse Component
- Schema ist bereits im Head

#### **Author Bio:**
- Aus `seo_metadata.json` → `article_metadata.author`
- Name, Job Title, Credentials

#### **Related Articles / Internal Links:**
- Aus `internal_links.json`
- "Das könnte dich auch interessieren"-Sektion

#### **CTA Sections:**
- "Pferdewert jetzt berechnen"-Button
- Platziere strategisch nach Content-Brief

---

### **Schritt 4: Styling & Responsiveness**

**Befolge `SEO-DESIGN.md` für:**
- Typography (Font-Sizes, Line-Heights)
- Colors (Primary, Secondary, Text)
- Spacing (Margins, Paddings)
- Responsive Breakpoints (Mobile, Tablet, Desktop)
- Component-Styles (FAQ, Tables, Lists, etc.)

---

### **Schritt 5: Performance-Optimierung**

1. **Images:**
   - Lazy Loading für alle Content-Images
   - Next.js Image Component nutzen
   - WebP Format
   - Responsive Sizes

2. **Code Splitting:**
   - Lazy Load FAQ-Component
   - Lazy Load Heavy Components

3. **Core Web Vitals:**
   - LCP: Hero Image optimieren
   - CLS: Image Dimensions definieren
   - FID: Minimal JavaScript

---

### **Schritt 6: Testing Checklist**

**Vor Go-Live prüfen:**

- [ ] **SEO Meta Tags:**
  - Title korrekt (50-60 Zeichen)
  - Meta Description korrekt (150-160 Zeichen)
  - Canonical URL gesetzt
  - All Schema Markups validiert (via schema.org validator)

- [ ] **Content:**
  - Alle H1, H2, H3 korrekt gerendert
  - FAQ funktioniert (Accordion)
  - Alle Bilder laden + haben Alt-Text
  - Alle internen Links funktionieren

- [ ] **Responsive:**
  - Mobile: Layout passt
  - Tablet: Layout passt
  - Desktop: Layout passt

- [ ] **Performance:**
  - Lighthouse Score >90
  - Page Speed <3s
  - Core Web Vitals grün

- [ ] **Schema Validation:**
  - Google Rich Results Test: OK
  - Schema.org Validator: OK

---

## 📦 Finale Deliverables

Nach dem Build:

1. **Page URL:** `https://pferdewert.de/pferde-ratgeber/{keyword-slug}`
2. **Deployed:** Production
3. **Indexed:** Google Search Console submitted
4. **Tracked:** Analytics + Tracking Setup aus `tracking_setup.json`

---

## 🎯 Zusammenfassung: Diese 4 Files reichen!

```
✅ 08-final-output/final_article.md          (Content)
✅ 05-content-outline/seo_metadata.json      (SEO Meta)
✅ 05-content-outline/faq_structured.json    (FAQ + Schema)
✅ 08-final-output/assets_list.md            (Images)

+ Dein SEO-DESIGN.md                         (Design Guidelines)
```

**Optional:**
```
📄 06-content-draft/internal_links.json      (Related Links)
📄 08-final-output/metadata.json             (Stats wie Reading Time)
```

---

## 🚀 Start Command für Designer

```bash
Task: "Build SEO Pferde-Ratgeber Page"

Keyword: "{KEYWORD}"
Slug: "{keyword-slug}"

Input Files:
- SEO/SEO-CONTENT/{keyword-slug}/08-final-output/final_article.md
- SEO/SEO-CONTENT/{keyword-slug}/05-content-outline/seo_metadata.json
- SEO/SEO-CONTENT/{keyword-slug}/05-content-outline/faq_structured.json
- SEO/SEO-CONTENT/{keyword-slug}/08-final-output/assets_list.md

Design Guidelines: /Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/SEO/SEO-DESIGN.md

Output: /pferde-ratgeber/{keyword-slug} page ready for production
```

**Los geht's!** 🎨