## Ratgeber Designsystem (SEO & Content)

**Design-Philosophie: Text First** – Ratgeberseiten sind Blog-Artikel mit semantischem HTML als Basis. Boxen werden nur sparsam für strategische Zwecke eingesetzt (max. 2-4 pro Artikel).

### 1. Seitenaufbau
1. **Hero**
   - Hintergrund (Layout + Hero): `bg-gradient-to-b from-amber-50 to-white`.
   - Optionales Badge (`Award` Icon) mit `bg-brand-light` und `text-brand/80`.
   - Haupttitel in Playfair Display, `text-brand`.
   - Subheadline `text-brand/80` (max. 2–3 Sätze).
   - Metadaten (Lesezeit, Datum, Kategorie) als Icon-Row in `text-brand/70`.
   - Primär-CTA: `bg-brand-brown` → Hover `bg-brand-brownDark`, Sekundär-CTA: Outline mit `border-brand-brown`.
2. **Hero Image**
   - `next/image` mit `priority`, 4:3 Zuschnitt, `rounded-xl` + `shadow-lg`.
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
- Basisgrößen: `text-base` (Body), `text-xl+` für wichtige Absätze.
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
- **FAQ**: Immer unter `id="faq"`, Schema-Daten via Komponente automatisch.
- **RatgeberRelatedArticles**: Max. drei Einträge; bei <3 Artikeln automatisch mittig ausgerichtet (`md:w-[320px]`). Datenstruktur `{ href, image, title, badge, readTime, description }`.
- **RatgeberFinalCTA**: Abschluss-CTA mit Bild + Button "Jetzt Pferdewert berechnen".
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
- Absätze: max. 3–4 Sätze, `leading-relaxed`.
- Zwischenüberschriften alle 4–6 Absätze einbauen (`text-3xl` → `text-2xl`).
- Listen als `<ol>`/`<ul>`; Keywords fett hervorheben.
- Blockquotes für Key-Statements.
- Tabellen: Nutze semantic HTML `<table>` oder einfache Listen statt grid mit Boxen.

### 6. Media & Assets
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

**Meta-Daten Checkliste bei Page-Erstellung:**
- ✅ Title Tag aus `meta_tags.title`
- ✅ Meta Description aus `meta_tags.description`
- ✅ Canonical URL aus `meta_tags.canonical`
- ✅ Open Graph Tags vollständig (Social Media Previews)
- ✅ Twitter Card Tags vollständig
- ✅ Structured Data: Article, FAQ, Breadcrumb als JSON-LD
- ✅ Service Schema (falls AI-Bewertung erwähnt)

**Hinweis:** Die Meta-Daten sind **NICHT** Teil des sichtbaren Artikel-Contents, sondern ausschließlich für SEO und Social Media Previews im `<Head>`.

### 9. Code-Snippets & Beispiele

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
  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
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

### 10. Deployment Checklist für neue Ratgeber

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