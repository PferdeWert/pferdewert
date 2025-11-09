# Ratgeber Page Builder

Erstellt aus SEO-Content automatisch eine fertige Ratgeber-Seite nach den Design-Vorgaben von SEO-DESIGN.md.

## Verwendung

```
/ratgeber-builder <keyword-ordner>
```

**Beispiel:**
```
/ratgeber-builder pferdemarkt
```

## Was dieser Skill tut

1. **Liest SEO-Content**:
   - FINAL-ARTICLE.md aus `/SEO/SEO-CONTENT/<keyword>/content/`
   - seo-metadata.json aus `/SEO/SEO-CONTENT/<keyword>/seo/`
   - schema-*.json Dateien aus `/SEO/SEO-CONTENT/<keyword>/seo/`

2. **Erstellt vollständige Next.js Page**:
   - Hero mit Badge, Meta-Row, CTAs
   - Hero Image (inhaltsbasierte Benennung)
   - Table of Contents
   - Content Body (Text First mit max. 2-4 strategischen HighlightBoxen + 5-7 inline Links)
   - FAQ Section mit automatischem Schema
   - Related Articles Component (3 Artikel-Karten)
   - Final CTA

3. **Befolgt alle Design-Guidelines**:
   - Layout Props: `fullWidth={true}` + `background="bg-gradient-to-b from-amber-50 to-white"`
   - Typografie: Playfair Display für Headings, Lato für Body
   - Farben: Brand-Palette mit strategischen Akzenten
   - Komponenten: RatgeberHero, RatgeberTableOfContents, FAQ, RatgeberRelatedArticles, RatgeberFinalCTA
   - **NIEMALS** InfoBox verwenden (deprecated!)
   - **IMMER** semantisches HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`)

4. **Integriert SEO Meta-Daten**:
   - Title, Description, Canonical URL
   - Open Graph Tags
   - Twitter Card Tags
   - Structured Data (Article, Breadcrumb)
   - FAQ Schema wird vom Component generiert (NICHT manuell!)

5. **Aktualisiert Registry**:
   - Fügt Eintrag zu `/frontend/lib/ratgeber-registry.ts` hinzu
   - Generiert Sitemap via `npm run sitemap`

## Wichtige Regeln

### Content-Struktur
- **Text First**: 95% semantisches HTML, nur 2-4 strategische HighlightBoxen
- **Keine Box-Inflation**: NICHT jeden Absatz in Boxen packen!
- **Body Paragraphs**: IMMER `text-lg` für `<p>` Tags (NIEMALS `text-sm`)
- **Duzen**: IMMER "Du", "Dein", "Dir" in Ratgebern

### Layout Props (KRITISCH!)
```tsx
<Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
```
- **NIEMALS** Layout ohne diese Props verwenden!

### Bilder
- **Naming Convention**: Inhaltsbasiert (z.B. `horses-mountain-field-spain.webp`)
- **NICHT** verwendungsbasiert (z.B. ❌ `pferdekaufvertrag-hero.webp`)
- **Speicherort**: `/public/images/ratgeber/`

### FAQ Section (WICHTIG!)
```tsx
<section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
  <div className="max-w-3xl mx-auto px-4 md:px-6">
    <FAQ
      faqs={faqItems}
      sectionTitle="Häufig gestellte Fragen"
      sectionSubtitle="[Themenspezifische Beschreibung]"  // PFLICHT anpassen!
    />
  </div>
</section>
```
- **NIEMALS** manuelles FAQ Schema im `<Head>` (wird automatisch generiert!)

### Interne Verlinkung im Text (WICHTIG!)
- **Anzahl**: 5-7 kontextbasierte inline Links im Fließtext
- **Platzierung**: Natürlich im Text eingebettet, wo thematisch passend
- **Quelle**: Aus `/frontend/lib/ratgeber-registry.ts` holen
- **Format**: `<Link href="/pferde-ratgeber/[slug]">Ankertext</Link>`
- **Kriterien für Auswahl**:
  - Thematische Relevanz zum umgebenden Absatz
  - Natürlicher Lesefluss bleibt erhalten
  - Mehrwert für den Leser (weiterführende Informationen)
  - Verteilung über den gesamten Artikel
  - Nicht zu viele Links in einem Absatz (max. 1-2)
- **Beispiele für kontextbasierte inline Links**:
  - Bei "Dressurpferd kaufen" Text über AKU → Link zu "Ankaufsuntersuchung beim Pferd"
  - Bei Erwähnung von Kaufvertrag → Link zu "Pferdekaufvertrag"
  - Bei "Springpferd kaufen" → Link zu "Dressurpferd kaufen" oder umgekehrt
  - Bei Erwähnung von Versicherungen → Link zu "Pferdehaftpflicht"

### Related Articles Component
- **Anzahl**: Immer 3 Artikel
- **Component**: `<RatgeberRelatedArticles articles={relatedArticles} />`
- **Platzierung**: Nach FAQ, vor Final CTA
- **Auswahl**: Thematisch am engsten verwandt
- **Quelle**: Aus `/frontend/lib/ratgeber-registry.ts` holen

### Final CTA
- **Standard Image**: `/images/shared/blossi-shooting.webp`
- **Standard CTA-Text**: "Jetzt Pferdewert berechnen"
- **CTA-Link**: `/pferde-preis-berechnen` (NICHT `/bewertung`!)

### Registry-Eintrag
```typescript
{
  slug: 'keyword',
  title: 'Titel aus meta.title',
  description: 'Aus meta.description',
  category: '[Kategorie aus Context]',
  readTime: '[Geschätzt aus Content-Länge]',
  image: '/images/ratgeber/[inhaltsbasiert].webp',
  priority: '0.7',
  changefreq: 'monthly'
}
```

## Deployment Checklist

Nach Erstellung der Page:

1. ✅ Page erstellt in `/frontend/pages/pferde-ratgeber/[slug].tsx`
2. ✅ Registry-Eintrag hinzugefügt
3. ✅ Sitemap generiert: `cd frontend && npm run sitemap`
4. ✅ Lint & Type-Check: `npm run lint && npm run type-check`
5. ✅ Lokaler Test: `npm run dev`
6. ✅ Commit & Push

## Beispiel-Output-Struktur

```tsx
import Head from 'next/head';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import metaData from '@/SEO/SEO-CONTENT/[keyword]/[keyword]-meta.json';
import { Award, Info, ShieldAlert } from 'lucide-react';

export default function RatgeberPage() {
  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <Head>
        {/* Meta Tags */}
        {/* Structured Data (Article, Breadcrumb) */}
        {/* KEIN FAQ Schema - wird vom Component generiert! */}
      </Head>

      <article>
        {/* Hero */}
        <RatgeberHero />
        <RatgeberHeroImage />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Content Body - TEXT FIRST! */}
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <section id="overview" className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Hauptüberschrift
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Semantischer Content...
            </p>
          </section>

          {/* Max. 2-4 HighlightBoxen für strategische Zwecke */}
          <RatgeberHighlightBox
            title="KI-Bewertung nutzen"
            icon={<Award />}
          >
            <p className="text-base">Conversion-CTA...</p>
          </RatgeberHighlightBox>
        </div>

        {/* FAQ */}
        <section id="faq">
          <FAQ faqs={faqItems} sectionTitle="..." sectionSubtitle="..." />
        </section>

        {/* Related Articles */}
        <RatgeberRelatedArticles articles={relatedArticles} />

        {/* Final CTA */}
        <RatgeberFinalCTA />
      </article>
    </Layout>
  );
}
```

## Fehlervermeidung

❌ **NIEMALS**:
- `text-sm` für Body-Text (minimum `text-base`, besser `text-lg`)
- InfoBox Component verwenden (deprecated!)
- Layout ohne `fullWidth={true}` und `background` Props
- Verwendungsbasierte Bildnamen (z.B. `hero-1.webp`)
- Manuelles FAQ Schema im `<Head>` definieren
- Mehr als 4 HighlightBoxen pro Artikel
- "kostenlos" oder "free" verwenden (Service ist PAID!)
- "3 Minuten" statt "2 Minuten" für Evaluations-Dauer
- "AI" statt "KI" in deutschem Content

✅ **IMMER**:
- Semantisches HTML für 95% des Contents
- `text-lg` für alle `<p>` Tags
- Inhaltsbasierte Bildnamen
- Duzen in Ratgebern
- FAQ Component generiert Schema automatisch
- Layout Props korrekt setzen
- CTAs zu `/pferde-preis-berechnen`
- 5-7 inline Links im Text zu anderen Ratgebern
- 3 Related Articles am Ende (Component)
- "KI" statt "AI"
- "2 Minuten" für Evaluations-Dauer

---

**Version:** 1.1.0
**Zuletzt aktualisiert:** 2025-11-09
**Changelog:**
- v1.1.0: Interne Verlinkung im Text hinzugefügt (5-7 inline Links) + Related Articles Component Klarstellung (3 Artikel-Karten)
- v1.0.0: Initial Release
