# SEO-DESIGN.md: Pferdewert Ratgeber Design System

## Executive Summary
Dieses Dokument definiert das Design System für PferdeWert.de Ratgeber-Inhalte basierend auf einer umfassenden Analyse der führenden Wettbewerber im deutschen Pferdebereich. Das Ziel ist es, konsistente, ansprechende und SEO-optimierte Inhalte zu erstellen, die Pferdebegeisterte gerne lesen.

## Wettbewerber-Analyse

### 1. wehorse.com
**Positioning**: Premium Online-Reitlernplattform
**Design-Charakteristika**:
- **Layout**: Sauberes, kartenbasiertes Design mit deutlicher Kategorisierung
- **Farbschema**: Dunkle Navigation (#2B3034), warme Akzentfarben (Orange/Rot) - **Inspiration für PferdeWert: braun-gold Fokus**
- **Typografie**: Moderne, lesbare Sans-Serif Schriften
- **Content-Struktur**: Kurze Teaser mit großen Bildern, klare CTAs
- **UX-Stärken**: Übersichtliche Navigation, professionelle Bildsprache

### 2. andreakutschakademie.com
**Positioning**: Traditionelle Reitausbildung und Akademie
**Design-Charakteristika**:
- **Layout**: Klassisches Blog-Layout mit Featured Images
- **Farbschema**: Erdige Töne (Braun/Beige) mit grünen Akzenten
- **Typografie**: Traditionelle, elegante Schriftarten
- **Content-Struktur**: Lange Artikel mit detaillierten Erklärungen
- **UX-Stärken**: Vertrauensvolle, akademische Ausstrahlung

### 3. ridays.de
**Positioning**: Moderne Reitsport-Community
**Design-Charakteristika**:
- **Layout**: Modernes Blog-Design mit Autor-Profilen
- **Farbschema**: Frische Farben (Grün/Blau) mit weißen Flächen - **PferdeWert Fokus: braun-beige statt blau-grün**
- **Typografie**: Moderne, mobile-optimierte Schriften
- **Content-Struktur**: Topic-Tags, Social Sharing, Community-Features
- **UX-Stärken**: Moderne Benutzerführung, starke Community-Elemente

### 4. reitguru.de
**Positioning**: E-Commerce mit integriertem Ratgeber
**Design-Charakteristika**:
- **Layout**: Produktintegration mit Content-Marketing
- **Farbschema**: Shop-typische Farben (Blau/Weiß) mit Produktfokus
- **Typografie**: E-Commerce optimierte, verkaufsfördernde Schriften
- **Content-Struktur**: Produktempfehlungen integriert in Ratgeberartikel
- **UX-Stärken**: Nahtlose Integration von Content und Commerce

## PferdeWert Design System

### Bestehende Farbpalette (aus tailwind.config.js)
```css
/* Primärfarben - Existing Brand Colors */
--brand-default: #4e463b;      /* Dunkelbraun - Haupttext, Grundfarbe */
--brand-light: #f8f8f6;        /* Helles Beige - Hintergrundflächen */
--brand-accent: #3068d6;       /* Modernes Blau - SEHR DEZENT, nur Ausnahmen */
--brand-green: #406243;        /* Waldgrün - Akzentfarbe */
--brand-gold: #f6c36a;         /* Amber/Gold - Highlights */
--brand-brown: #92400e;        /* Haupt-CTA Braun */
--brand-brownDark: #78350f;    /* Hover-Variante für CTAs */

/* System Farben (aus globals.css) */
--background: #ffffff;          /* Weiß - Standard Hintergrund */
--foreground: #171717;          /* Dunkelgrau - Standard Text */

/* Funktionale Farben */
--success: #406243;             /* Waldgrün für Erfolg */
--warning: #f6c36a;             /* Gold für Warnungen */
--error: #dc2626;               /* Rot für Fehler */
```

### Bestehende Typografie (aus tailwind.config.js & globals.css)
```css
/* Schriften */
--font-sans: 'Lato', Arial, Helvetica, sans-serif;        /* Body Text */
--font-serif: 'Playfair Display', Georgia, serif;         /* Headlines */
--font-heading: 'Playfair Display', Georgia, serif;       /* H1-H4 */

/* Responsive Schriftgrößen (clamp) */
--text-base: clamp(1rem, 1.5vw, 1.125rem);               /* 16-18px */
--text-h1: clamp(2.25rem, 5.5vw, 3.75rem);               /* 36-60px */
--text-h2: clamp(1.75rem, 4.5vw, 3rem);                  /* 28-48px */
--text-h3: clamp(1.35rem, 3vw, 2rem);                    /* 22-32px */
--text-button: clamp(0.95rem, 2vw, 1.125rem);            /* 15-18px */

/* Typografie-Eigenschaften */
--line-height-base: 1.6;                                  /* Optimal für Lesbarkeit */
--line-height-heading: 1.2;                               /* Kompakt für Headlines */
--letter-spacing-button: 0.02em;                          /* Buttons leicht gesperrt */
```

### Layout-Komponenten

#### 1. Ratgeber-Header
```tsx
interface RatgeberHeaderProps {
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  publishDate: string;
  heroImage: string;
  expertBadge?: boolean;
}

// Design-Spezifikationen:
// - Hero Image: 1200x600px, optimiert für SEO
// - Titel: Playfair Display, 36px, brand-default (#4e463b)
// - Kategorie-Tag: Lato, 14px, brand-gold Hintergrund (#f6c36a)
// - Lesezeit: Lato, 14px, brand-default/70
```

#### 2. Content-Section
```tsx
interface ContentSectionProps {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  highlight?: boolean;
}

// Design-Spezifikationen:
// - Section-Titel: Playfair Display, 24px, brand-default (#4e463b)
// - Content: Lato, 16px, brand-default (#4e463b)
// - Highlight-Sections: brand-light Hintergrund (#f8f8f6), brand-gold Border (#f6c36a)
// - Zeilenhöhe: 1.6 für optimale Lesbarkeit
```

#### 3. Info-Box
```tsx
interface InfoBoxProps {
  type: 'tip' | 'warning' | 'expert' | 'cost';
  title: string;
  content: string;
  icon: ReactNode;
}

// Design-Spezifikationen:
// - Tip: brand-green Hintergrund (#406243/10), brand-green Border (#406243)
// - Warning: brand-gold Hintergrund (#f6c36a/10), brand-gold Border (#f6c36a)
// - Expert: brand-gold Hintergrund (#f6c36a/20), brand-gold Border (#f6c36a)
// - Cost: brand-light Hintergrund (#f8f8f6), brand-brown Border (#92400e)
```

#### 4. FAQ-Komponente
```tsx
interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
    highlight?: boolean;
  }>;
  withToggle?: boolean;
  sectionTitle?: string;
}

// Design-Spezifikationen:
// - Container: brand-light Hintergrund (#f8f8f6), rounded-xl
// - FAQ Items: Weiß, rounded-lg, border border-gray-200
// - Questions: Playfair Display, 18px, brand-default (#4e463b), font-semibold
// - Answers: Lato, 16px, brand-default/80, line-height 1.6
// - Toggle-Buttons: Hover: brand-light (#f8f8f6), KEINE blauen focus-rings
// - Highlight Items: brand-gold Border (#f6c36a), leichter brand-gold/5 Hintergrund
// - Icons: brand-brown (#92400e) statt blau
// - Spacing: p-6 für Items, mb-4 zwischen Items
// - Mobile: Reduzierte Padding (p-4), kleinere Schrift
```

#### 5. CTA-Komponenten
```tsx
interface CTAProps {
  type: 'primary' | 'secondary' | 'expert';
  text: string;
  href: string;
  trackingEvent?: string;
}

// Design-Spezifikationen:
// - Primary: brand-brown (#92400e), weiße Schrift, Lato Bold
// - Secondary: Weiß, brand-brown Schrift (#92400e), Border
// - Expert: brand-gold (#f6c36a), brand-default Schrift (#4e463b), Premium-Look
// - Hover-Effekte: brand-brownDark (#78350f), 0.3s Transition, leichte Schatten
```

## Ratgeber Page Template (Standard Layout)

### Gesamtstruktur
Alle Ratgeber-Seiten folgen einem dreistufigen Aufbau basierend auf der AKU Pferd Design-Vorlage:
1. **Hero Section** - Emotionale Einführung mit Hintergrundbild
2. **Content Grid/Main Content** - Artikel-Übersicht oder Hauptinhalt
3. **CTA Section** - Beratungsangebot und Weiterführung

### 1. Hero Section
**Verwendete Komponente:** `RatgeberHeader`

```tsx
// Struktur basierend auf V0 AKU Pferd Design
<RatgeberHeader
  backgroundImage="/pferd-im-goldenen-licht.jpg"
  title="Ratgeber-Titel"
  subtitle="Beschreibungstext mit emotionaler Verbindung zum Thema"
  ctaText="Primäre Aktion"
  ctaLink="/relevante-seite"
/>
```

**Styling Spezifikationen:**
```css
.ratgeber-hero {
  min-height: 60vh;
  background: linear-gradient(to bottom, var(--brand-light), var(--background));
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ratgeber-hero-bg {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.ratgeber-hero-content {
  position: relative;
  z-index: 10;
  max-width: 64rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  text-align: center;
}

.ratgeber-hero h1 {
  font-size: clamp(3rem, 5vw, 4rem);
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--brand-default);
  margin-bottom: 1.5rem;
  text-balance: balance;
}

.ratgeber-hero p {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  color: var(--brand-default);
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  text-pretty: pretty;
}

.ratgeber-hero .cta-button {
  background-color: var(--brand-gold);
  color: var(--brand-default);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.ratgeber-hero .cta-button:hover {
  background-color: var(--brand-brown);
  color: var(--brand-light);
  transform: translateY(-2px);
}
```

### 2. Content Grid (für Artikel-Übersicht)
**Verwendete Komponenten:** `ContentSection` + `InfoBox` für Artikel-Cards

```tsx
// Für Artikel-Übersicht Pages (wie /ratgeber)
<ContentSection>
  <div className="ratgeber-section-header">
    <h2>Unsere Ratgeber-Artikel</h2>
    <p>Expertenwissen für jeden Pferdeliebhaber – praxisnah und verständlich erklärt</p>
  </div>

  <div className="artikel-grid">
    {artikel.map(item => (
      <InfoBox
        key={item.id}
        image={item.bild}
        category={item.kategorie}
        title={item.titel}
        description={item.beschreibung}
        readTime={item.lesezeit}
        link={item.link}
        className="artikel-card"
      />
    ))}
  </div>
</ContentSection>
```

**Grid Styling:**
```css
.ratgeber-section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.ratgeber-section-header h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--brand-default);
  margin-bottom: 1rem;
}

.ratgeber-section-header p {
  font-size: 1.125rem;
  color: var(--brand-default);
  opacity: 0.8;
  max-width: 32rem;
  margin: 0 auto;
}

.artikel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 5rem 1.5rem;
  max-width: 88rem;
  margin: 0 auto;
}

.artikel-card {
  background: var(--brand-light);
  border: 1px solid rgba(78, 70, 59, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(78, 70, 59, 0.1);
}

.artikel-card:hover {
  box-shadow: 0 8px 24px rgba(78, 70, 59, 0.15);
  transform: translateY(-2px);
  border-color: var(--brand-gold);
}

.artikel-card-image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.artikel-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artikel-card:hover .artikel-card-image img {
  transform: scale(1.05);
}

.artikel-card-content {
  padding: 1.5rem;
}

.artikel-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.artikel-kategorie {
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(246, 195, 106, 0.2);
  color: var(--brand-brown);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.artikel-lesezeit {
  font-size: 0.75rem;
  color: var(--brand-default);
  opacity: 0.6;
}

.artikel-card h3 {
  font-size: 1.25rem;
  font-family: var(--font-serif);
  margin-bottom: 0.75rem;
  color: var(--brand-default);
  text-balance: balance;
  transition: color 0.3s ease;
}

.artikel-card:hover h3 {
  color: var(--brand-brown);
}

.artikel-beschreibung {
  color: var(--brand-default);
  opacity: 0.8;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-pretty: pretty;
}

.artikel-card-button {
  width: 100%;
  background: transparent;
  color: var(--brand-brown);
  border: 1px solid rgba(78, 70, 59, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.artikel-card:hover .artikel-card-button {
  background: var(--brand-brown);
  color: var(--brand-light);
  border-color: var(--brand-brown);
}
```

### 3. CTA Section
**Verwendete Komponenten:** `ContentSection` + `CTAButton`

```tsx
<ContentSection backgroundColor="rgba(248, 248, 246, 0.3)">
  <div className="ratgeber-cta">
    <div className="cta-image-container">
      <img
        src="/happy-horse-owner-with-horse--professional-consult.jpg"
        alt="Professionelle Pferdeberatung"
        className="cta-feature-image"
      />
    </div>

    <h2>Individuelle Beratung gewünscht?</h2>
    <p>
      Unsere Experten stehen Ihnen für persönliche Fragen zur Verfügung.
      Profitieren Sie von jahrelanger Erfahrung in der Pferdebewertung und -beratung.
    </p>

    <div className="cta-buttons">
      <CTAButton type="primary" href="/beratung">
        Beratung anfragen
      </CTAButton>
      <CTAButton type="secondary" href="/bewertung">
        Pferdewert berechnen
      </CTAButton>
    </div>
  </div>
</ContentSection>
```

**CTA Section Styling:**
```css
.ratgeber-cta {
  max-width: 64rem;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  text-align: center;
  background: rgba(248, 248, 246, 0.3); /* var(--brand-light) mit Transparenz */
}

.cta-image-container {
  margin-bottom: 3rem;
}

.cta-feature-image {
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(78, 70, 59, 0.15); /* var(--brand-default) mit Transparenz */
}

.ratgeber-cta h2 {
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--brand-default);
  margin-bottom: 1.5rem;
  text-balance: balance;
}

.ratgeber-cta p {
  font-size: 1.125rem;
  color: var(--brand-default);
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  text-pretty: pretty;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.cta-primary-button {
  background: var(--brand-brown);
  color: var(--brand-light);
  border: none;
  transition: all 0.3s ease;
}

.cta-primary-button:hover {
  background: var(--brand-default);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(78, 70, 59, 0.3);
}

.cta-secondary-button {
  background: transparent;
  color: var(--brand-brown);
  border: 1px solid var(--brand-brown);
  transition: all 0.3s ease;
}

.cta-secondary-button:hover {
  background: var(--brand-gold);
  color: var(--brand-default);
  border-color: var(--brand-gold);
}

@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;
    justify-content: center;
  }
}
```

### 4. Responsive Verhalten
```css
/* Mobile First Approach */
@media (max-width: 768px) {
  .ratgeber-hero {
    min-height: 50vh;
    padding: 2rem 1rem;
  }

  .artikel-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 3rem 1rem;
  }

  .ratgeber-cta {
    padding: 3rem 1rem;
  }

  .ratgeber-section-header {
    margin-bottom: 2rem;
  }
}

@media (min-width: 1024px) {
  .artikel-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 5. Integration mit bestehenden Komponenten

**Mapping V0 → PferdeWert Komponenten:**
- `RatgeberHero` → `RatgeberHeader` (erweitert für Background-Images)
- `RatgeberGrid` → `ContentSection` + `InfoBox` Cards
- `RatgeberCTA` → `ContentSection` + `CTAButton` Kombination

**Erforderliche Erweiterungen:**
- `RatgeberHeader`: Background-Image Support hinzufügen
- `InfoBox`: Card-Layout Variante für Artikel-Grid
- `CTAButton`: Group-Hover Effekte für Cards

### Content-Guidelines

#### 1. Artikel-Struktur
```markdown
1. SEO-optimierter Titel (H1)
2. Einleitungsabsatz mit Hauptkeyword
3. Inhaltsverzeichnis (bei >1500 Wörtern)
4. Hauptcontent in logischen Abschnitten (H2)
5. Praktische Tipps (Info-Boxen)
6. Expertenrat (Expert-Boxen)
7. Kosten-Übersicht (Cost-Boxen)
8. Fazit mit CTA
9. FAQ-Sektion
10. Related Articles
```

#### 2. Bild-Standards
- **Hero Images**: 1200x600px, WebP-Format, Alt-Text mit Keyword
- **Content Images**: 800x400px, optimiert für mobile Ansicht
- **Infografiken**: SVG-Format für scharfe Darstellung
- **Pferde-Fotos**: Authentisch, hochqualitativ, deutsche Rassen bevorzugt

#### 3. SEO-Optimierung
- **Title-Tag**: Keyword + "| PferdeWert.de"
- **Meta Description**: 150-160 Zeichen, Keyword, CTA
- **H1**: Hauptkeyword, nur einmal pro Seite
- **H2-H6**: Semantische Struktur, verwandte Keywords
- **Internal Linking**: Mindestens 3 interne Links zu verwandten Artikeln

### Mobile-First Design

#### Responsive Breakpoints
```css
/* Mobile First Approach */
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--large: 1200px;

/* Layout-Anpassungen */
@media (max-width: 767px) {
  /* Single-Column Layout */
  /* Größere Touch-Targets (min 44px) */
  /* Reduzierte Margins/Paddings */
}

@media (min-width: 768px) {
  /* Two-Column Layout möglich */
  /* Sidebar für Related Content */
}
```

### Conversion-Optimierung

#### 1. Trust-Elemente
- Experten-Badges bei qualifizierten Artikeln
- Autor-Profile mit Qualifikationen
- Testimonials von echten Pferdebesitzern
- Zertifizierungen und Auszeichnungen

#### 2. Call-to-Action Placement
- **Above the Fold**: Soft CTA nach Einleitung
- **Mid-Content**: Expert CTA nach wertvollen Tipps
- **Article End**: Hauptkonversion (Bewertung/Beratung)
- **Sidebar**: Related Services (mobile: Bottom)

#### 3. Social Proof
- Anzahl der Artikel-Leser
- Sharing-Buttons prominent platziert
- Kommentarfunktion für Community Building
- Newsletter-Anmeldung mit Mehrwert

### Performance-Richtlinien

#### 1. Technische Standards
- **Page Speed**: <3 Sekunden Ladezeit
- **Core Web Vitals**: Alle Werte im grünen Bereich
- **Bildoptimierung**: WebP/AVIF, Lazy Loading
- **Code Splitting**: Nur benötigter CSS/JS geladen

#### 2. SEO-Performance
- **Crawlability**: XML Sitemap, robots.txt
- **Schema Markup**: Article, FAQ, Review Schema
- **Internal Linking**: Semantische Verlinkung
- **Content Freshness**: Regelmäßige Updates

### Implementation-Checklist

#### Für jeden neuen Ratgeber-Artikel:
- [ ] Keyword-Recherche durchgeführt
- [ ] Title-Tag mit Hauptkeyword erstellt
- [ ] Meta Description geschrieben
- [ ] Hero Image optimiert (WebP, Alt-Text)
- [ ] H1-H6 Struktur semantisch korrekt
- [ ] Info-Boxen für wichtige Tipps eingefügt
- [ ] Expert-Boxen für Fachwissen hinzugefügt
- [ ] CTA-Buttons strategisch platziert
- [ ] Interne Links zu verwandten Artikeln
- [ ] FAQ-Sektion am Ende
- [ ] Schema Markup implementiert
- [ ] Mobile Responsiveness getestet
- [ ] Page Speed getestet (<3s)
- [ ] Rechtschreibung/Grammatik geprüft

### Artikel Layout Template (AKU Pferd Struktur)

#### 1. Artikel Header (Article Header)
```tsx
// Verwendet: PferdeWert Header Component
<header className="bg-gradient-to-b from-muted/50 to-background py-12 px-6">
  <div className="max-w-4xl mx-auto">
    {/* Breadcrumb Navigation */}
    <nav className="mb-6">
      <Breadcrumb /> {/* Ratgeber > Kategorie > Artikel */}
    </nav>

    {/* Artikel Metadata */}
    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
      <span className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">
        {kategorie} {/* z.B. "Kauf & Verkauf" */}
      </span>
      <span>{lesezeit} Min. Lesezeit</span>
      <span>{datum}</span>
    </div>

    {/* Haupt-Titel */}
    <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance mb-4">
      {artikelTitel} {/* z.B. "AKU Pferd - Der umfassende Leitfaden" */}
    </h1>

    {/* Untertitel/Beschreibung */}
    <p className="text-xl text-muted-foreground max-w-3xl">
      {artikelBeschreibung}
    </p>
  </div>
</header>
```

#### 2. Artikel Content Structure
```tsx
// Verwendet: PferdeWert ContentContainer Component
<article className="max-w-4xl mx-auto px-6 py-12">

  {/* Einleitung (OHNE Bild) */}
  <div className="prose prose-lg max-w-none mb-8">
    <p className="text-lg text-muted-foreground leading-relaxed">
      {einleitungsText} {/* 2-3 Sätze zur Einführung */}
    </p>
  </div>

  {/* Hero Image - NACH der Einleitung */}
  <div className="my-12">
    <Image
      src={heroImage}
      alt={heroImageAlt}
      width={800}
      height={400}
      className="w-full h-[400px] object-cover rounded-lg shadow-lg"
      priority
    />
  </div>

  {/* Inhaltsverzeichnis */}
  <div className="bg-muted/50 p-6 rounded-lg my-8">
    <h2 className="text-xl font-serif font-bold mb-4">Inhaltsverzeichnis</h2>
    <nav className="space-y-2">
      {/* Interne Links zu Sektionen */}
      <a href="#sektion-1" className="block text-primary hover:underline">
        1. {sektionTitel1}
      </a>
      {/* ... weitere Sektionen */}
    </nav>
  </div>

  {/* Content Sektionen */}
  <section id="sektion-1" className="mb-12">
    <h2 className="text-3xl font-serif font-bold mb-6">{sektionTitel}</h2>

    {/* Text Block */}
    <div className="prose prose-lg max-w-none mb-8">
      <p>{sektionText}</p>
    </div>

    {/* Inline Image - strategisch platziert */}
    <div className="my-8">
      <Image
        src={sektionImage}
        alt={sektionImageAlt}
        width={600}
        height={300}
        className="w-full h-[300px] object-cover rounded-lg"
      />
    </div>

    {/* Weitere Text Blöcke */}
    <div className="prose prose-lg max-w-none">
      <p>{weitererText}</p>
    </div>
  </section>

  {/* Info Box Template */}
  <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r-lg">
    <h3 className="font-serif font-bold text-lg mb-3 text-accent-foreground">
      💡 Expertentipp
    </h3>
    <p className="text-muted-foreground">
      {expertentipp}
    </p>
  </div>

  {/* Statistik/Daten Card */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
    <div className="bg-muted/30 p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-accent mb-2">{statistikWert}</div>
      <div className="text-sm text-muted-foreground">{statistikLabel}</div>
    </div>
    {/* ... weitere Statistiken */}
  </div>

</article>
```

#### 3. FAQ Sektion Template
```tsx
// Verwendet: PferdeWert Accordion Component
<section className="max-w-4xl mx-auto px-6 py-12 border-t">
  <h2 className="text-3xl font-serif font-bold text-center mb-8">
    Häufig gestellte Fragen
  </h2>

  <div className="space-y-4">
    {faqItems.map((item, index) => (
      <Accordion key={index}>
        <AccordionItem>
          <AccordionTrigger className="text-left font-medium">
            {item.frage}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.antwort}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))}
  </div>
</section>
```

#### 4. CTA Sektion Template
```tsx
// Verwendet: PferdeWert CTA Component
<section className="bg-muted/30 py-16 mt-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    {/* Feature Image */}
    <div className="mb-8">
      <Image
        src="/cta-image.jpg"
        alt="CTA Beschreibung"
        width={600}
        height={300}
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
      />
    </div>

    <h2 className="text-3xl font-serif font-bold mb-4">
      {ctaTitle}
    </h2>

    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
      {ctaBeschreibung}
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" className="bg-accent hover:bg-accent/90">
        {primaryCTA}
      </Button>
      <Button size="lg" variant="outline">
        {secondaryCTA}
      </Button>
    </div>
  </div>
</section>
```

#### 5. Bild-Platzierungs-Regeln

1. **Hero Image**: IMMER nach der Einleitung, NICHT im Header
2. **Sektion Images**: Strategisch zwischen Text-Blöcken platziert
3. **CTA Image**: Große Feature-Bilder in CTA-Sektionen
4. **Info Box Images**: Icons oder kleine Illustrationen in Boxen
5. **Aspekt-Verhältnisse**:
   - Hero: 2:1 (800x400px)
   - Sektion: 2:1 oder 16:9 (600x300px)
   - CTA: 2:1 (600x300px)

#### 6. Content-Struktur Richtlinien

1. **Artikel-Länge**: 2000-4000 Wörter für SEO-Optimierung
2. **Sektionen**: 4-8 Haupt-Sektionen mit H2-Überschriften
3. **Absätze**: Max. 3-4 Sätze pro Absatz für Lesbarkeit
4. **Listen**: Verwende Bullet Points für bessere Scanbarkeit
5. **Info Boxes**: 2-3 pro Artikel für wichtige Tipps
6. **Interne Links**: 3-5 Links zu verwandten PferdeWert-Artikeln

### Erfolgs-Metriken

#### 1. SEO-KPIs
- Organische Rankings für Ziel-Keywords
- Click-Through-Rate in SERPs
- Durchschnittliche Sitzungsdauer
- Bounce Rate (<60%)
- Seiten pro Sitzung (>2)

#### 2. Conversion-KPIs
- Newsletter-Anmeldungen pro Artikel
- Bewertungs-Tool Nutzung
- Kontaktformular-Ausfüllungen
- Social Shares pro Artikel

#### 3. User Experience KPIs
- Mobile Usability Score
- Core Web Vitals Performance
- Kommentar-Engagement
- Return Visitor Rate

---

## Fazit

Dieses Design System stellt sicher, dass alle PferdeWert Ratgeber-Inhalte:
1. **Konsistent** in Design und Struktur sind
2. **SEO-optimiert** für bessere Rankings
3. **Benutzerfreundlich** für Pferdebegeisterte
4. **Conversion-fokussiert** für Geschäftsziele
5. **Performance-optimiert** für schnelle Ladezeiten

Die Richtlinien basieren auf bewährten Praktiken der erfolgreichsten Wettbewerber, angepasst an die spezifischen Bedürfnisse und Ziele von PferdeWert.de.