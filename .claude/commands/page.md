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
Die Datei enthält separate Objekte für DE, AT und CH unter `locales`:
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
    },
    "ch": {
      "metadata": { "title": "...", "description": "...", "canonical_url": "...", "robots": "..." },
      "open_graph": { "og:title": "...", "og:description": "...", "og:type": "article", "og:url": "...", "og:locale": "de_CH" },
      "twitter_card": { "twitter:card": "...", "twitter:title": "...", "twitter:description": "..." }
    }
  },
  "hreflang": [
    { "hreflang": "de", "href": "https://pferdewert.de/pferde-ratgeber/{slug}" },
    { "hreflang": "de-AT", "href": "https://pferdewert.at/pferde-ratgeber/{slug}" },
    { "hreflang": "de-CH", "href": "https://pferdewert.ch/pferde-ratgeber/{slug}" },
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

## 4. KRITISCH: Referenz-Template lesen

**BEVOR du die Page erstellst, lies diese funktionierende Referenz-Page:**
`frontend/pages/pferde-ratgeber/dressurpferd-kaufen.tsx`

Diese Page demonstriert ALLE kritischen Patterns korrekt. Verwende sie als Template.

### 4.1 Kritische Patterns (Fast Refresh, Component APIs, Related Articles)

**Pattern 1: Fast Refresh Fix - Icons auf Module-Level**
```tsx
// ✅ CORRECT: Definiere Icons EINMAL auf Module-Level (außerhalb Component)
const ICONS = {
  award: <Award className="h-4 w-4" />,
  shield: <ShieldAlert className="h-4 w-4" />,
  trending: <TrendingUp className="h-4 w-4" />,
  file: <FileText className="h-4 w-4" />,
  alert: <AlertTriangle className="h-4 w-4" />
};

export default function MyPage() {
  // Nutze Icons aus ICONS object
  return <RatgeberHero badgeIcon={ICONS.award} ... />
}

// ❌ FALSCH: Icons im Component neu erstellen (verursacht Fast Refresh Loop!)
export default function MyPage() {
  return <RatgeberHero badgeIcon={<Award />} ... />  // NIEMALS!
}
```

**Pattern 2: RatgeberHero korrekte Props**
```tsx
// ✅ CORRECT
<RatgeberHero
  badgeIcon={ICONS.award}           // Separate Prop (JSX Element)
  badgeLabel="Kompletter Ratgeber"  // Separate Prop (String)
  title="..."
  subtitle="..."
  primaryCta={{
    label: "Jetzt bewerten",         // 'label' nicht 'text'!
    href: "/pferde-preis-berechnen"
  }}
  secondaryCta={{
    label: "Zum Inhalt"              // Kein href nötig bei Anchor-Link
  }}
/>

// ❌ FALSCH
<RatgeberHero
  badge={{ icon: <Award />, text: "..." }}  // Falsche Struktur
  primaryCta={{ text: "...", href: "..." }} // 'text' existiert nicht
/>
```

**Pattern 3: Related Articles INNERHALB Component + Registry Helper**
```tsx
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import RatgeberRelatedArticles, { RatgeberRelatedArticle } from '@/components/ratgeber/RatgeberRelatedArticles';

export default function MyPage() {
  // ✅ CORRECT: Related Articles INNERHALB Component, nutze Registry Helper
  const relatedArticles: RatgeberRelatedArticle[] = getRelatedArticles('{slug}').map(entry => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,              // Kommt automatisch aus Registry
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description
  }));

  return (
    <>
      {/* ... Content ... */}
      <RatgeberRelatedArticles articles={relatedArticles} />
    </>
  );
}

// ❌ FALSCH: Hardcoded Articles auf Module-Level
const RELATED_ARTICLES = [
  { href: '...', image: '...', ... }  // NIEMALS hardcoden!
];
```

**Pattern 4: Bilder-Benennung**
- ❌ **FALSCH**: Bild nach Page-Slug benennen (z.B. `haflinger-kaufen.webp`)
- ✅ **RICHTIG**: Bild nach Original-Quelle benennen (z.B. `haflinger-roebel.webp`)
- **Grund**: Verhindert Duplikate, wenn mehrere Pages das gleiche Bild nutzen

### 4.2 Warum diese Patterns kritisch sind

1. **Fast Refresh Loop**: Icons/Objekte im Component neu erstellt → Endlos-Loop im Dev-Server
2. **TypeScript Errors**: Falsche Prop-Namen → Build schlägt fehl
3. **Falsche Bilder**: Related Articles außerhalb Component → Bilder werden nicht aus Registry geladen
4. **Bild-Duplikate**: Benennung nach Page-Slug → Gleiche Bilder mehrfach hochgeladen

## 5. React/Next.js Page erstellen

Erstelle: `frontend/pages/pferde-ratgeber/{slug}.tsx`

**Kritische Anforderungen:**
- Folge ALLEN Design-Guidelines aus SEO-DESIGN.md
- **Text First**: 95% semantisches HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`)
- **Max 2-4 RatgeberHighlightBox** pro Artikel (nicht mehr!)
- **Integriere DE + AT Meta-Tags** aus seo-metadata.json (siehe unten)
- JSON-LD Structured Data: Article Schema + FAQ Schema (falls vorhanden) + Breadcrumb
- Nutze interne Links aus internal-linking.json (falls vorhanden)
- **Alle CTAs verlinken auf "/pferde-preis-berechnen"** (NICHT /bewertung!)

**SEO Meta-Tags Integration (DE + AT + CH) - NUTZE RatgeberHead Component:**

Die `RatgeberHead` Komponente übernimmt automatisch:
- Locale-basierte Meta-Tags (DE/AT/CH)
- hreflang Tags
- Open Graph & Twitter Cards
- Article, Breadcrumb und FAQ Schema

```tsx
import RatgeberHead from '@/components/ratgeber/RatgeberHead';

// SEO Locales - konvertiere aus seo-metadata.json
const seoLocales = {
  de: {
    title: "...",        // aus locales.de.metadata.title
    description: "...",  // aus locales.de.metadata.description
    keywords: "...",     // aus locales.de.metadata.keywords
    ogTitle: "...",      // aus locales.de.open_graph['og:title']
    ogDescription: "...",// aus locales.de.open_graph['og:description']
    twitterTitle: "...", // aus locales.de.twitter_card['twitter:title']
    twitterDescription: "...", // aus locales.de.twitter_card['twitter:description']
  },
  at: {
    title: "...",        // aus locales.at.metadata.title
    description: "...",  // usw.
    keywords: "...",
    ogTitle: "...",
    ogDescription: "...",
    twitterTitle: "...",
    twitterDescription: "...",
  },
  ch: {
    title: "...",        // aus locales.ch.metadata.title
    description: "...",  // usw.
    keywords: "...",
    ogTitle: "...",
    ogDescription: "...",
    twitterTitle: "...",
    twitterDescription: "...",
  },
};

// In der Page-Komponente:
<RatgeberHead
  slug="{slug}"
  image="/images/ratgeber/{image-name}.webp"
  locales={seoLocales}
  datePublished="{YYYY-MM-DD}"  // aus schema-article.json
  wordCount={1234}              // aus schema-article.json
  breadcrumbTitle="{Breadcrumb Title}"  // Kurzer Titel für Breadcrumbs
  faqItems={faqItems}           // Falls FAQ vorhanden
/>
```

**WICHTIG**: RatgeberHead generiert automatisch alle Schema-Markups (Article, Breadcrumb, FAQ). Du musst KEINE zusätzlichen `<script type="application/ld+json">` Tags mehr einfügen!

**Komponenten nutzen:**
- `RatgeberHero`
- `RatgeberTableOfContents`
- `RatgeberHighlightBox` (sparsam!)
- `FAQ`
- `AuthorBox` (E-E-A-T Signal - zwischen FAQ und RatgeberRelatedArticles platzieren)
- `RatgeberRelatedArticles`
- `RatgeberFinalCTA`

**Code-Standards:**
- TypeScript: keine `any` Types
- Custom Logger: `import { info, warn, error } from '@/lib/log'`
- **LocalizedLink PFLICHT**: Nutze `<LocalizedLink href="/path">` statt `<Link>` für ALLE internen Links - stellt korrekten Domain-Kontext sicher (pferdewert.de/.at/.ch)

**JSON-LD Schema Markup:**

Schema-Markup wird automatisch von `RatgeberHead` generiert! Du musst nur die Props übergeben.

**FAQ Integration:**
- Lies `schema-faq.json` und konvertiere in `faqItems` Array
- Übergebe `faqItems` an `<RatgeberHead faqItems={faqItems} />` - generiert FAQ Schema automatisch
- Nutze `<FAQ faqs={faqItems} />` Component für sichtbare FAQs im Content

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

## 6. STATIC_PAGE_SLUGS aktualisieren

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

## 7. Registry aktualisieren

Füge Eintrag hinzu in: `frontend/lib/ratgeber-registry.ts`

## 8. Sitemap generieren

```bash
cd frontend && npm run sitemap
```

## 9. Qualitätsprüfung

```bash
cd frontend && npm run lint && npm run type-check
```

---

Starte mit Schritt 1 (Validierung) und arbeite dich durch alle Schritte.
