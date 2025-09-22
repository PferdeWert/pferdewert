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