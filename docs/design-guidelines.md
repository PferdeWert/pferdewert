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
- **Paragraphen**: Standard Font-Weight 400, 16px
- **Sekundäre Farbe** für weniger Kontrast als Headlines
- **Line-height erhöhen** für bessere Lesbarkeit
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

### Color Hierarchy
- **Primary Headlines**: Highest contrast color (text-gray-900)
- **Body Text**: Secondary contrast (text-gray-600)
- **Emphasized Text**: Medium contrast (text-gray-800, font-medium)

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

*These guidelines should be followed consistently across all PferdeWert design work to ensure optimal user experience and conversion rates.*