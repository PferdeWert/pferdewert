## Ratgeber Designsystem (SEO & Content)

Ausgerichtet am Layout von `/aku-pferd` – gilt für alle bestehenden und zukünftigen Ratgeberseiten.

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
4. **Content Body**
   - Abschnittstitel `text-brand`.
   - `ContentSection` für thematische Blöcke, Icons als Emoji oder Brand-SVGs.
   - Infokarten und Tabellen in Beige-Boxen (siehe Farben).
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
- **Highlight-Boxen (Standard)**
  - Hintergrund `#fdf7f1`.
  - Border `#e0c9aa`.
  - Überschriften `text-brand-brown`.
  - Schatten `shadow-soft` (Tailwind Config).
- **InfoBox**
  - Default Style: `type="cost"` (liefert exakt obige Farben).
  - Für Regionlisten etc. `icon="📍"` nutzen, um farblich konsistent zu bleiben.

### 4. Komponenten-Richtlinien
- **RatgeberHero / RatgeberHeroImage**: Standard-Hero mit Badge, Meta-Row und CTA-Buttons; Bilder immer via `RatgeberHeroImage`.
  - Sekundärer CTA `"Zum Inhalt"` nutzt immer das `ChevronDown` Icon (`lucide-react`, `h-5 w-5`).
- **RatgeberTableOfContents**: Nutzt `sections`-Array `{ id, title }` + `onNavigate` (scroll helper).
- **ContentSection**: Für inhaltliche Blöcke mit Icon (z. B. `icon="⚖️"`).
- **RatgeberHighlightBox**: Beige Karten (`bg-[#fdf7f1]`) inkl. optionalem Icon und Titel; nutzen statt manueller `div`-Styles.
- **RatgeberInfoTiles**: Für Zeit-/Kennzahlen-Grids mit gleichmäßigen Karten.
- **RatgeberRegionGrid**: Drei InfoBoxen (`type="cost"`) mit 📍-Icon für regionale Schwerpunktlisten.
- **CTAButton**: Vorhandene Varianten verwenden (`type="primary" | "secondary"`).
- **FAQ**: Immer unter `id="faq"`, Schema-Daten via Komponente automatisch.
- **RatgeberRelatedArticles**: Max. drei Einträge; bei <3 Artikeln automatisch mittig ausgerichtet (`md:w-[320px]`). Datenstruktur `{ href, image, title, badge, readTime, description }`.
- **RatgeberFinalCTA**: Abschluss-CTA mit Bild + Button "Jetzt Pferdewert berechnen".
- **ArticleMetadata** (falls genutzt): direkt unter H1 platzieren.

### 5. Content-Guidelines
- Absätze: max. 3–4 Sätze, `leading-relaxed`.
- Zwischenüberschriften alle 4–6 Absätze einbauen (`text-3xl` → `text-2xl`).
- Listen als `<ol>`/`<ul>`; Keywords fett hervorheben.
- Blockquotes für Key-Statements.
- Tabellen vermeiden → stattdessen `grid` mit Highlight-Boxen.

### 6. Media & Assets
- Bilder nur via `next/image` + `sizes` Attribut.
- Formate: `.webp` bevorzugen.
- Emotionale, authentische Pferde-/Menschen-Bilder (kein Stock-Look).
- Videos eingebettet, keine Autoplay.

### 7. CTA & Conversion
- Abschluss-CTA immer eigene Beige-Box (`#fdf7f1` + `#e0c9aa`).
- Headline `text-brand`, Subtext `text-brand/80`.
- Button immer: `Jetzt Pferdewert berechnen` (`CTAButton type="primary"`).
- Optional sekundärer Link (Analyse-Beispiel) als Outline-Button.

### 8. Code-Snippets & Beispiele
```tsx
// Highlight-Box
<RatgeberHighlightBox title="AKU Klasse I" icon="📋">
  <p>Geeignet für Freizeitpferde bis 5.000 €.</p>
  <p>Typischer Umfang: Klinische Untersuchung, Basisröntgen.</p>
</RatgeberHighlightBox>

// Regionale Infos
<RatgeberRegionGrid
  regions={[
    { title: 'Bayern', description: 'Warmblut-Zentren mit hochspezialisierten Praxen.' },
    { title: 'Niedersachsen', description: 'Größte Dichte an AKU-Tierärzten.' },
    { title: 'Nordrhein-Westfalen', description: 'Fokus auf Freizeit- und Schulpferde.' }
  ]}
/>

// Related Articles
<RatgeberRelatedArticles
  title="Weiterführende Artikel"
  articles={akuRelatedArticles}
  description="Vertiefen Sie Ihr Wissen über die AKU."
/>
```

**Interne Verlinkung:** Jede Ratgeberseite mit einem Abschnitt „Weiterführende Artikel“ muss einen Eintrag zum zentralen AKU-Hub unter `/aku-pferd` enthalten.

Diese Vorgaben sind verbindlich für alle SEO-Ratgeberseiten. Änderungen am Design nur nach Abstimmung mit dem Design-Team vornehmen.