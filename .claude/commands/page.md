---
argument-hint: <keyword>
description: Generate SEO-optimized Ratgeber page from completed SEO pipeline content
allowed-tools: Read, Write, Edit, Glob, Bash(npm run sitemap:*), Bash(cd:*), Bash(npm run lint:*), Bash(npm run type-check:*)
---

Du generierst eine SEO-optimierte Ratgeber-Seite aus den fertigen SEO-Pipeline-Inhalten.

**Target Keyword**: "$ARGUMENTS"

## 1. Validierung

Prüfe zuerst, ob alle benötigten Dateien existieren:

```
SEO/SEO-CONTENT/$ARGUMENTS/
├── content/
│   └── final-article.md        # REQUIRED (Phase 6)
├── seo/
│   ├── seo-metadata.json       # REQUIRED (Phase 5A) - DE + AT Lokalisierung
│   ├── schema-article.json     # REQUIRED (Phase 5B) - Article Schema
│   ├── schema-breadcrumb.json  # RECOMMENDED (Phase 5B) - Breadcrumb Navigation
│   ├── schema-faq.json         # OPTIONAL (Phase 5B) - FAQs für Component
│   └── internal-linking.json   # REQUIRED (Phase 5C) - Interne Links
```

Falls der Keyword-Ordner nicht existiert, liste verfügbare Keywords in `SEO/SEO-CONTENT/` auf.

## 2. Dateien lesen

Lies folgende Dateien:
1. `SEO/SEO-CONTENT/$ARGUMENTS/content/final-article.md` - Der finale Artikel
2. `SEO/SEO-CONTENT/$ARGUMENTS/seo/seo-metadata.json` - Meta-Tags (DE + AT Varianten!)
3. `SEO/SEO-CONTENT/$ARGUMENTS/seo/schema-article.json` - Article Schema
4. `SEO/SEO-CONTENT/$ARGUMENTS/seo/schema-breadcrumb.json` - Breadcrumb Schema (falls vorhanden)
5. `SEO/SEO-CONTENT/$ARGUMENTS/seo/schema-faq.json` - FAQs (für faqItems Array)
6. `SEO/SEO-CONTENT/$ARGUMENTS/seo/internal-linking.json` - Interne Links
7. `SEO/SEO-DESIGN.md` - Design-Guidelines

**WICHTIG - seo-metadata.json Struktur (Phase 5A Output):**
Die Datei enthält separate Objekte für DE und AT unter `locales`:
```json
{
  "phase": "5A",
  "primary_keyword": "...",
  "slug": "...",
  "locales": {
    "de": {
      "metadata": { "title": "...", "description": "...", "canonical_url": "...", "robots": "..." },
      "open_graph": { "og:title": "...", "og:description": "...", "og:type": "article", "og:url": "...", "og:locale": "de_DE" },
      "twitter_card": { "twitter:card": "...", "twitter:title": "...", "twitter:description": "..." }
    },
    "at": {
      "metadata": { "title": "...", "description": "...", "canonical_url": "...", "robots": "..." },
      "open_graph": { "og:title": "...", "og:description": "...", "og:type": "article", "og:url": "...", "og:locale": "de_AT" },
      "twitter_card": { "twitter:card": "...", "twitter:title": "...", "twitter:description": "..." }
    }
  },
  "hreflang": [
    { "hreflang": "de", "href": "https://pferdewert.de/pferde-ratgeber/{slug}" },
    { "hreflang": "de-AT", "href": "https://pferdewert.de/at/pferde-ratgeber/{slug}" },
    { "hreflang": "x-default", "href": "https://pferdewert.de/pferde-ratgeber/{slug}" }
  ],
  "shared": { "twitter:site": "@PferdeWert", "twitter:creator": "@PferdeWert" }
}
```

## 3. Slug generieren

Erstelle URL-slug aus Keyword:
- Lowercase
- Leerzeichen → Bindestriche
- Umlaute: ä→ae, ö→oe, ü→ue, ß→ss

Beispiel: "Pferd kaufen Tipps" → "pferd-kaufen-tipps"

## 4. React/Next.js Page erstellen

Erstelle: `frontend/pages/pferde-ratgeber/{slug}.tsx`

**Kritische Anforderungen:**
- Folge ALLEN Design-Guidelines aus SEO-DESIGN.md
- **Text First**: 95% semantisches HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`)
- **Max 2-4 RatgeberHighlightBox** pro Artikel (nicht mehr!)
- **Integriere DE + AT Meta-Tags** aus seo-metadata.json (siehe unten)
- JSON-LD Structured Data: Article Schema + FAQ Schema (falls vorhanden) + Breadcrumb
- Nutze interne Links aus internal-linking.json (falls vorhanden)
- **Alle CTAs verlinken auf "/pferde-preis-berechnen"** (NICHT /bewertung!)

**SEO Meta-Tags Integration (DE + AT):**
```tsx
import { useRouter } from 'next/router';
import Head from 'next/head';

// In der Page-Komponente:
const { locale } = useRouter();
const isAT = locale === 'at';
const localeData = isAT ? seoMetadata.locales.at : seoMetadata.locales.de;

<Head>
  <title>{localeData.metadata.title}</title>
  <meta name="description" content={localeData.metadata.description} />
  <link rel="canonical" href={localeData.metadata.canonical_url} />

  {/* hreflang Tags für beide Märkte (Array-Format aus Phase 5A) */}
  {seoMetadata.hreflang.map((link) => (
    <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
  ))}

  {/* Open Graph */}
  <meta property="og:title" content={localeData.open_graph['og:title']} />
  <meta property="og:description" content={localeData.open_graph['og:description']} />
  <meta property="og:type" content={localeData.open_graph['og:type']} />
  <meta property="og:url" content={localeData.open_graph['og:url']} />
  <meta property="og:locale" content={localeData.open_graph['og:locale']} />
  <meta property="og:site_name" content="PferdeWert.de" />

  {/* Twitter Card */}
  <meta name="twitter:card" content={localeData.twitter_card['twitter:card']} />
  <meta name="twitter:title" content={localeData.twitter_card['twitter:title']} />
  <meta name="twitter:description" content={localeData.twitter_card['twitter:description']} />
  <meta name="twitter:site" content={seoMetadata.shared['twitter:site']} />
</Head>
```

**Komponenten nutzen:**
- `RatgeberHero`
- `RatgeberTableOfContents`
- `RatgeberHighlightBox` (sparsam!)
- `FAQ`
- `RatgeberRelatedArticles`
- `RatgeberFinalCTA`

**Code-Standards:**
- TypeScript: keine `any` Types
- Custom Logger: `import { info, warn, error } from '@/lib/log'`
- **LocalizedLink PFLICHT**: Nutze `<LocalizedLink href="/path">` statt `<Link>` für ALLE internen Links - dies fügt automatisch `/at/` Prefix für österreichische Locale hinzu

**JSON-LD Schema Markup Integration:**

```tsx
// Article + Breadcrumb Schema im <Head>
<Head>
  {/* Article Schema (REQUIRED) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
  />

  {/* Breadcrumb Schema (falls vorhanden) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
  />
</Head>
```

**FAQ Integration:**
- Lies `schema-faq.json` und konvertiere in `faqItems` Array
- Nutze `<FAQ faqItems={faqItems} />` Component (generiert automatisch Schema + sichtbare FAQs)
- ❌ **NICHT** FAQ Schema manuell im `<Head>` einfügen (verhindert Duplikate)

**Interne Verlinkung (aus Phase 5C `internal-linking.json`):**
Die Datei enthält vorbereitete Links mit Platzierungs-Empfehlungen:
```json
{
  "internal_links": [
    {
      "url": "/pferde-ratgeber/pferd-kaufen-checkliste",
      "anchor": "detaillierte Pferdekauf-Checkliste",
      "relevance_score": 0.85,
      "placement": {
        "section": "h2",
        "section_title": "Worauf beim Pferdekauf achten",
        "recommendation": "Natürlich in Satz einfügen nach Erwähnung von Checklisten"
      }
    }
  ]
}
```

**Integration:**
- **Mindestens 5-7 interne Links** zu anderen Ratgeber-Artikeln einbauen
- Nutze `placement.section_title` um Links in der richtigen H2-Sektion zu platzieren
- Anchor-Texte aus `anchor` Feld verwenden (bereits SEO-optimiert)
- Links natürlich im Fließtext integrieren gemäß `placement.recommendation`
- Prüfe verfügbare Artikel zusätzlich in `frontend/lib/ratgeber-registry.ts`

**Design-Qualität:**
- Nutze den `frontend-design` Skill für hochwertige, distinctive Komponenten
- Vermeide generische AI-Ästhetik - erstelle production-grade Interfaces

## 5. STATIC_PAGE_SLUGS aktualisieren

**KRITISCH**: Füge den Slug in `frontend/pages/pferde-ratgeber/[slug].tsx` hinzu:

```typescript
const STATIC_PAGE_SLUGS = [
  '{slug}',  // <-- Neuer Slug hier
  'lipizzaner',
  'anfaengerpferd-kaufen',
  // ... andere Slugs
];
```

**Warum wichtig**: Verhindert, dass die dynamische Route [slug].tsx die statische Seite behandelt. Ohne diesen Schritt gibt es einen Runtime Error, weil [slug].tsx Outrank/MongoDB-Daten erwartet, die bei manuell erstellten Seiten nicht existieren.

## 6. Registry aktualisieren

Füge Eintrag hinzu in: `frontend/lib/ratgeber-registry.ts`

## 7. Sitemap generieren

```bash
cd frontend && npm run sitemap
```

## 8. Qualitätsprüfung

```bash
cd frontend && npm run lint && npm run type-check
```

---

Starte mit Schritt 1 (Validierung) und arbeite dich durch alle Schritte.
