## Ratgeber Designsystem (SEO & Content)

**Design-Philosophie: Text First** – Ratgeberseiten sind Blog-Artikel mit semantischem HTML als Basis. Boxen werden nur sparsam für strategische Zwecke eingesetzt (max. 2-4 pro Artikel).

### 1. Seitenaufbau

**⚠️ KRITISCH: Layout Props**
Alle Ratgeber-Seiten MÜSSEN das Layout mit diesen Props verwenden:
```tsx
<Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
```
- `fullWidth={true}` → Vollbreite Layout aktivieren
- `background="bg-gradient-to-b from-amber-50 to-white"` → Sanfter Amber-Gradient
- **NIEMALS** Layout ohne diese Props verwenden!

1. **Hero**
   - Hintergrund über Layout Props (siehe oben)
   - Optionales Badge (`Award` Icon) mit `bg-brand-light` und `text-brand/80`.
   - Haupttitel in Playfair Display, `text-brand`.
   - Subheadline `text-brand/80` (max. 2–3 Sätze).
   - Metadaten (Lesezeit, Datum, Kategorie) als Icon-Row in `text-brand/70`.
   - Primär-CTA: `bg-brand-brown` → Hover `bg-brand-brownDark`, Sekundär-CTA: Outline mit `border-brand-brown`.
2. **Hero Image**
   - `next/image` mit `priority`, 4:3 Zuschnitt, `rounded-xl` + `shadow-lg`.
   - **Naming Convention**: Inhaltsbasiert (siehe Section 6 "Media & Assets")
   - Bilder im Ordner: `/public/images/ratgeber/`
3. **Inhaltsverzeichnis**
   - Überschrift `text-brand`, Links `text-brand/80`, Hover `text-brand-brown`.
4. **Content Body (TEXT FIRST!)**
   - **Basis: Semantisches HTML** – Nutze `<h2>`, `<h3>`, `<h4>`, `<p>`, `<ul>`, `<ol>` für Content-Struktur.
   - **Boxen nur strategisch**: Max. 2-4 `RatgeberHighlightBox` pro Artikel für:
     - Conversion-CTAs (AI-Bewertungs-Angebot)
     - Kritische Warnungen (Sicherheitshinweise, rechtliche Risiken)
     - Zusammenfassungen wichtiger Checklisten
   - **Keine Box-Inflation**: NICHT jeden Absatz in Boxen packen!
   - Abschnittstitel `text-brand`, Fließtext `text-gray-700 leading-relaxed`.
5. **FAQ + Related Articles + Final CTA** am Ende der Seite.

### 2. Typografie
- Headings: Playfair Display (`font-serif`).
- Fließtext & UI-Elemente: Lato (`font-sans`).
- **Body Paragraphs**: `text-lg` is the STANDARD for ALL `<p>` tags in ratgeber content (for better readability and consistency).
- **WICHTIG**: Verwende NIEMALS `text-sm` – minimum ist `text-base` (besser `text-lg` für Fließtext). `text-sm` ist zu klein und schlecht lesbar.
- Blockquotes: Playfair Display kursiv, linke Border in `brand-green`.

### 3. Farb- & Boxsystem
- Grundfläche: `#f8f8f6` (Tailwind `brand.light`).
- Primärtext: `#4e463b` (`brand`).
- Akzentgrün: `#406243` (`brand.green`).
- CTA Braun: `#92400e` + Hover `#78350f`.
- **Highlight-Boxen (sparsam einsetzen!)**
  - Hintergrund `#fdf7f1`.
  - Border `#e0c9aa`.
  - Überschriften `text-brand-brown`.
  - Schatten `shadow-soft` (Tailwind Config).
  - **Max. 2-4 Boxen pro Artikel** – nur für CTAs, Warnungen, wichtige Checklisten.
- **InfoBox** (veraltet – vermeiden!)
  - Nicht mehr verwenden. Nutze stattdessen semantisches HTML mit `<div>`, `<ul>`, `<p>`.
  - Alte `icon` Props verursachen Rendering-Probleme.

### 4. Komponenten-Richtlinien

**Priorität: Semantisches HTML zuerst, Komponenten nur wo strategisch notwendig!**

#### Immer verwenden (Struktur & Conversion)
- **RatgeberHero / RatgeberHeroImage**: Standard-Hero mit Badge, Meta-Row und CTA-Buttons; Bilder immer via `RatgeberHeroImage`.
  - Sekundärer CTA `"Zum Inhalt"` nutzt immer das `ChevronDown` Icon (`lucide-react`, `h-5 w-5`).
- **RatgeberTableOfContents**: Nutzt `sections`-Array `{ id, title }` + `onNavigate` (scroll helper).
- **FAQ**: FAQ-Komponente mit automatischer Schema-Generierung
  - **Props**: `faqs` (required), `sectionTitle` (optional), `sectionSubtitle` (optional), `withSchema` (default: true)
  - **Platzierung**: Immer unter `id="faq"` im Content
  - **Schema**: FAQPage Schema wird automatisch generiert (siehe Abschnitt 9)
  - **⚠️ KRITISCH**: IMMER `sectionSubtitle` themenspezifisch anpassen!
  - **Standard-Verwendung** (PFLICHT für neue Ratgeber):
    ```tsx
    <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <FAQ
          faqs={faqItems}
          sectionTitle="Häufig gestellte Fragen"  // Standard-Headline (nicht ändern)
          sectionSubtitle="[Themenspezifische Beschreibung was beantwortet wird]"  // PFLICHT anpassen!
        />
      </div>
    </section>
    ```
  - **Beispiele für gute sectionSubtitle:**
    - "Die wichtigsten Antworten zu Verträgen, Gewährleistung und rechtlichen Aspekten beim Pferdekauf"
    - "Alles was du über Kosten, Versicherung und Haltung wissen möchtest"
    - "Häufige Fragen zu Vorbereitung, Untersuchung und rechtlichen Themen"
    - "Die wichtigsten Fragen zu Pferdemärkten, Online-Plattformen und Kauftipps beantwortet"
  - **❌ NIEMALS**: `sectionTitle=""` oder fehlende `sectionSubtitle` bei neuen Ratgebern!
  - **Alternative** (NUR bei Legacy-Content mit bestehender H2):
    ```tsx
    <section id="faq" className="mt-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand mb-8">
        Häufig gestellte Fragen
      </h2>
      <FAQ faqs={faqItems} sectionTitle="" /> {/* Nur bei bestehenden H2 Headlines! */}
    </section>
    ```
- **RatgeberRelatedArticles**: Max. drei Einträge; bei <3 Artikeln automatisch mittig ausgerichtet (`md:w-[320px]`). Datenstruktur `{ href, image, title, badge, readTime, description }`.
  - **Datenquelle**: Nutze `getRatgeberBySlug()` aus Registry für konsistente Bildpfade.
- **RatgeberFinalCTA**: Abschluss-CTA mit Bild + Button "Jetzt Pferdewert berechnen".
  - **STANDARD IMAGE**: Immer `/images/shared/blossi-shooting.webp` verwenden (Hero-Bild von Index-Page)
  - Design: Beige Box (`bg-[#fdf7f1]`, `border-[#e0c9aa]`), zentriertes Layout
  - Responsive: Image `max-w-2xl`, Button mit `min-h-[44px]` (Touch-Target)
  - Platzierung: Immer nach Related Articles, vor Seitenende
  - Props: `image` (src/alt/width/height), `title`, `description`, `ctaHref`, `ctaLabel`
- **CTAButton**: Vorhandene Varianten verwenden (`type="primary" | "secondary"`).

#### Sparsam verwenden (max. 2-4x pro Artikel)
- **RatgeberHighlightBox**: Beige Karten (`bg-[#fdf7f1]`) inkl. optionalem Icon und Titel.
  - **Nur nutzen für**:
    - Conversion-CTAs (AI-Bewertungs-Angebot)
    - Kritische Warnungen (Sicherheitshinweise, rechtliche Risiken)
    - Zusammenfassungen wichtiger Checklisten
  - **NICHT nutzen für**: Reguläre Inhalte, Listenformate, allgemeine Erklärungen
  - **Maximal 2-4 Boxen pro Artikel** – sonst semantic HTML verwenden!

#### Veraltet – Nicht mehr verwenden
- ❌ **ContentSection**: Ersetze mit `<section>`, `<h2>`, `<h3>`, `<p>` für bessere Semantik
- ❌ **RatgeberInfoTiles**: Ersetze mit normalem `<ul>` oder `<ol>` innerhalb von `<section>`
- ❌ **RatgeberRegionGrid**: Ersetze mit semantischen Listen und Headings
- ❌ **InfoBox**: Deprecated wegen `icon` Prop Konflikten – nutze `<div>`, `<ul>`, `<p>` stattdessen
- ❌ **ArticleMetadata**: Falls verwendet, prüfe ob wirklich nötig (oft redundant zu Hero-Meta)

### 5. Content-Guidelines
- **Ansprache**: IMMER duzen ("Du", "Dein", "Dir") in Ratgeber-Artikeln – keine Siez-Form!
- Absätze: max. 3–4 Sätze, `leading-relaxed`.
- Zwischenüberschriften alle 4–6 Absätze einbauen (`text-3xl` → `text-2xl`).
- Listen als `<ol>`/`<ul>`; Keywords fett hervorheben.
- Blockquotes für Key-Statements.
- Tabellen: Nutze semantic HTML `<table>` oder einfache Listen statt grid mit Boxen.

### 6. Media & Assets

**⚠️ KRITISCH: Bildbenennungs-Schema**

**Best Practice: Sprechende, inhaltsbasierte Namen**

Bilder MÜSSEN nach ihrem **INHALT** benannt werden, nicht nach ihrer Verwendung:

✅ **RICHTIG - Beschreibt Bildinhalt:**
- `horses-mountain-field-spain.webp` (Pferde auf Bergwiese in Spanien)
- `horse-brown-portrait-stable.webp` (Braunes Pferd Portrait im Stall)
- `horses-grazing-meadow-sunset.webp` (Pferde beim Grasen bei Sonnenuntergang)
- `horse-riding-training-arena.webp` (Reittraining in der Arena)

❌ **FALSCH - Verwendungsbezogene Namen:**
- `pferdekaufvertrag-hero.webp` ← Was ist auf dem Bild? Nicht erkennbar!
- `page-header-image.webp` ← Keine Ahnung vom Inhalt
- `hero-1.webp` ← Komplett nutzlos

**Vorteile inhaltsbasierter Namen:**
- ✅ **Wiederverwendbarkeit**: Gleiches Bild kann auf mehreren Seiten genutzt werden
- ✅ **Keine Duplikate**: Bild existiert nur einmal im System
- ✅ **Cache-Effizienz**: Bild wird einmal geladen, überall gecacht
- ✅ **Erkennbarkeit**: Entwickler wissen sofort, was auf dem Bild ist
- ✅ **SEO-Bonus**: Sprechender Dateiname hilft Google Image Search

**Naming Convention:**
- Format: `[subject]-[location/context]-[details].webp`
- Kleinbuchstaben, Bindestriche statt Leerzeichen
- Deutsch oder Englisch, aber konsistent
- Beispiele:
  - `horses-mountain-field-spain.webp`
  - `pferde-weide-sonnenuntergang.webp`
  - `horse-jumping-competition.webp`

**Speicherort**: `/public/images/ratgeber/` (zentral für alle Ratgeber-Bilder)

**Weitere Media-Richtlinien:**
- Bilder nur via `next/image` + `sizes` Attribut.
- Formate: `.webp` bevorzugen.
- Emotionale, authentische Pferde-/Menschen-Bilder (kein Stock-Look).
- Videos eingebettet, keine Autoplay.

### 7. CTA & Conversion
- **WICHTIG**: Alle CTAs verlinken zu `/pferde-preis-berechnen` (NICHT `/bewertung`!)
- **Standard CTA-Text**: `"Jetzt Pferdewert berechnen"` (nur bei thematischer Passung leicht anpassen)
- Abschluss-CTA immer eigene Beige-Box (`#fdf7f1` + `#e0c9aa`).
- Headline `text-brand`, Subtext `text-brand/80`.
- Button immer: `Jetzt Pferdewert berechnen` (`CTAButton type="primary"`).
- Optional sekundärer Link (Analyse-Beispiel) als Outline-Button.

### 8. SEO Meta-Daten Integration

**WICHTIG**: Jeder Ratgeber-Artikel hat eine entsprechende `*-meta.json` Datei im SEO-Content-Ordner (z.B. `SEO/SEO-CONTENT/pferd kaufen/pferd kaufen-meta.json`).

Diese Meta-Daten müssen im `<Head>` der Next.js Page eingebunden werden:

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
      {/* ⚠️ WICHTIG: FAQ Schema wird automatisch vom <FAQ> Component generiert!
          NICHT manuell hinzufügen, um Duplikate zu vermeiden! */}
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

**Meta-Daten Checkliste bei Page-Erstellung:**
- ✅ Title Tag aus `meta_tags.title`
- ✅ Meta Description aus `meta_tags.description`
- ✅ Canonical URL aus `meta_tags.canonical`
- ✅ Open Graph Tags vollständig (Social Media Previews)
- ✅ Twitter Card Tags vollständig
- ✅ Structured Data: Article, FAQ, Breadcrumb als JSON-LD
- ✅ Service Schema (falls AI-Bewertung erwähnt)

**Hinweis:** Die Meta-Daten sind **NICHT** Teil des sichtbaren Artikel-Contents, sondern ausschließlich für SEO und Social Media Previews im `<Head>`.

### 9. Structured Data & Schema Management

**⚠️ WICHTIG: FAQ Schema wird automatisch generiert – KEINE manuellen Duplikate!**

#### FAQ Schema Richtlinien

Das `<FAQ>` Component generiert automatisch ein FAQPage Schema basierend auf den `faqs` Props. **NIEMALS** manuell ein FAQPage Schema im `<Head>` definieren!

**✅ RICHTIG - Automatisches Schema via Component:**
```tsx
// 1. FAQ Items in der Page definieren
const faqItems = [
  {
    question: 'Wie viel kostet ein Pferd?',
    answer: 'Ein Pferd kostet zwischen 2.500€ und 20.000€...'
  },
  // weitere FAQs...
]

// 2. FAQ Component verwenden (generiert Schema automatisch)
<FAQ
  faqs={faqItems}
  sectionTitle="Häufige Fragen zu Pferdekosten"
  sectionSubtitle="Alles was du über Kosten und Preise wissen möchtest"
/>
```

**Verfügbare Props:**
- `faqs` (required): Array von FAQ Items mit `question` und `answer`
- `sectionTitle` (optional): Überschrift für die FAQ Section (wird als H2 gerendert)
- `sectionSubtitle` (optional): Untertitel/Beschreibung unter der Überschrift
- `withSchema` (optional, default: `true`): Steuert die automatische Schema-Generierung
- `className` (optional): Zusätzliche CSS-Klassen

**⚠️ Wichtig**: Wenn dein Content bereits eine H2-Überschrift für die FAQ Section hat, setze `sectionTitle=""` um doppelte Headlines zu vermeiden.

**❌ FALSCH - Manuelles Schema erstellt Duplikate:**
```tsx
// NICHT MACHEN! Verursacht "Feld FAQPage doppelt" Fehler in Search Console
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(item => ({...}))
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

#### Schema Checkliste für neue Ratgeber Pages

**Im `<Head>` einfügen:**
- ✅ Article Schema (aus `structured_data.article`)
- ✅ Breadcrumb Schema (aus `structured_data.breadcrumb`)
- ❌ **KEIN** FAQPage Schema (wird vom `<FAQ>` Component generiert)

**Im Body verwenden:**
- ✅ `<FAQ faqs={faqItems} />` Component (generiert Schema automatisch)

#### Weitere Schemas

**Service Schema** (optional, bei Erwähnung der AI-Bewertung):
```tsx
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'KI-gestützte Pferdebewertung',
  'provider': {
    '@type': 'Organization',
    'name': 'PferdeWert.de'
  },
  'description': 'Professionelle Pferdebewertung in 2 Minuten'
}
```

### 10. Code-Snippets & Beispiele

**Text-First mit strategischen Boxen:**
```tsx
// Semantische Content-Struktur (Standard)
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

// Strategische Highlight-Box (max. 2-4 pro Artikel!)
<RatgeberHighlightBox
  title="Wichtiger Hinweis zur Sicherheit"
  icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />}
>
  <p className="text-base text-gray-700 leading-relaxed">
    Nur für kritische Warnungen, Conversion-CTAs oder wichtige Checklisten.
    Nicht für reguläre Inhalte verwenden!
  </p>
</RatgeberHighlightBox>

// Related Articles (Strukturkomponente)
<RatgeberRelatedArticles
  title="Weiterführende Artikel"
  articles={relatedArticles}
  description="Vertiefen Sie Ihr Wissen über die AKU."
/>
```

**Interne Verlinkung:** Jede Ratgeberseite mit einem Abschnitt „Weiterführende Artikel" muss einen Eintrag zum zentralen AKU-Hub unter `/aku-pferd` enthalten.

### 11. Deployment Checklist für neue Ratgeber

**WICHTIG**: Alle Ratgeber-Artikel werden zentral über das Ratgeber-Registry verwaltet. Dieses System automatisiert die Sitemap-Generierung und die Anzeige auf der Übersichtsseite.

#### 4-Schritte-Prozess für neue Ratgeber:

1. **Ratgeber-Seite erstellen**
   - Erstelle die neue Page-Datei in `/frontend/pages/pferde-ratgeber/`
   - Beispiel: `/frontend/pages/pferde-ratgeber/pferd-versichern.tsx`
   - Implementiere alle Design-Guidelines aus diesem Dokument
   - Integriere SEO Meta-Daten aus der entsprechenden `*-meta.json` Datei

2. **Registry-Eintrag hinzufügen**
   - Öffne `/frontend/lib/ratgeber-registry.ts`
   - Füge einen neuen Eintrag zum `RATGEBER_ENTRIES` Array hinzu:
   ```typescript
   {
     slug: 'pferd-versichern',  // URL-Slug (ohne /pferde-ratgeber/)
     title: 'Pferd versichern - Der komplette Ratgeber',
     description: 'Alles über Pferdeversicherungen...',
     category: 'Finanzen & Recht',
     readTime: '12 Min.',
     image: '/path-to-image.jpg',
     priority: '0.7',  // SEO Priority (0.0 - 1.0)
     changefreq: 'monthly'  // SEO Change Frequency
   }
   ```

3. **Sitemap & robots.txt aktualisieren**
   - Führe aus: `npm run sitemap`
   - Dieser Befehl generiert automatisch:
     - `/frontend/public/sitemap.xml` mit dem neuen Ratgeber-Eintrag
     - `/frontend/public/robots.txt` mit aktualisierter Crawling-Struktur
   - Verifiziere die Generierung in der Konsolen-Ausgabe

4. **Deploy durchführen**
   - Commit & Push der Änderungen
   - Nach Deployment wird:
     - Die Übersichtsseite `/pferde-ratgeber` automatisch den neuen Artikel anzeigen
     - Die Sitemap für Suchmaschinen aktualisiert sein
     - Die neue Page unter `/pferde-ratgeber/[slug]` verfügbar sein

#### Wichtige Hinweise:

- **Single Source of Truth**: Das Ratgeber-Registry (`ratgeber-registry.ts`) ist die zentrale Datenquelle
- **Keine manuellen Sitemap-Änderungen**: NIEMALS direkt `sitemap.xml` oder `robots.txt` editieren
- **Übersichtsseite**: Wird automatisch aus dem Registry generiert, keine manuellen Updates nötig
- **Reihenfolge zählt**: Ratgeber werden in der Reihenfolge angezeigt, wie sie im Registry-Array stehen
- **Testing**: Teste die neue Page lokal (`npm run dev`) bevor du die Sitemap generierst

#### Häufige Fehler vermeiden:

- ❌ **Sitemap manuell editieren** → Nutze `npm run sitemap`
- ❌ **Übersichtsseite hardcoden** → Registry wird automatisch gelesen
- ❌ **Registry-Eintrag vergessen** → Page wird nicht in Sitemap/Übersicht auftauchen
- ❌ **Sitemap vor Deploy vergessen** → Alte Sitemap wird deployed

#### Verfügbare Helper-Funktionen:

```typescript
import { getRatgeberPath, getRatgeberBySlug, getRatgeberByCategory } from '@/lib/ratgeber-registry';

// URL-Pfad generieren
const path = getRatgeberPath('pferd-versichern'); // → /pferde-ratgeber/pferd-versichern

// Entry nach Slug finden
const entry = getRatgeberBySlug('pferd-versichern');

// Alle Entries einer Kategorie
const financeArticles = getRatgeberByCategory('Finanzen & Recht');
```

Diese Vorgaben sind verbindlich für alle SEO-Ratgeberseiten. Änderungen am Design nur nach Abstimmung mit dem Design-Team vornehmen.