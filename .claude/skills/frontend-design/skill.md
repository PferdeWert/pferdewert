# PferdeWert Frontend Design Skill

Erstellt produktionsreife Frontend-Komponenten und UI-Elemente mit dem **PferdeWert Design-System**. Verhindert generische AI-Ästhetik und hält sich strikt an die Brand-Farben.

## Verwendung

Dieser Skill wird automatisch aktiviert, wenn du Frontend-Komponenten, UI-Elemente oder Styling erstellst.

---

## Design-System (STRIKT!)

### Farbpalette - NUR DIESE FARBEN VERWENDEN

#### Primary Colors
| Name | Tailwind Class | Verwendung |
|------|----------------|------------|
| Brand Brown | `brand-brown`, `brand-brownDark` | Buttons, CTAs, Headlines, Primary Actions |
| Brand Gold | `brand-gold` | Akzente, Highlights, Icons, Hover-States |
| Brand Light | `brand-light` | Section-Backgrounds, Cards |

#### Neutral Colors
| Name | Tailwind Class | Verwendung |
|------|----------------|------------|
| Amber 50 | `amber-50` | Warme Backgrounds, Gradients |
| Amber 100 | `amber-100` | Leichte Akzente |
| Gray 50-900 | `gray-*` | Text, Borders, Schatten |
| White | `white` | Cards, Clean Backgrounds |

#### Functional Colors (NUR für Status!)
| Name | Tailwind Class | Verwendung |
|------|----------------|------------|
| Green 500/600 | `green-500`, `green-600` | **NUR** Success-States, Checkmarks |
| Red 500/600 | `red-500`, `red-600` | **NUR** Error-States, Warnungen |
| Blue 500/600 | `blue-500`, `blue-600` | **NUR** Info-States, Links |

---

## VERBOTENE FARBEN (NIEMALS VERWENDEN!)

Diese Farben gehören NICHT zum PferdeWert Design-System:

```
❌ pink-*        (Nicht in Brand!)
❌ purple-*      (Nicht in Brand!)
❌ violet-*      (Nicht in Brand!)
❌ fuchsia-*     (Nicht in Brand!)
❌ rose-*        (Nicht in Brand!)
❌ indigo-*      (Nicht in Brand!)
❌ cyan-*        (Nicht in Brand!)
❌ teal-*        (Nicht in Brand!)
```

### Verbotene Patterns
- ❌ Instagram-Style Gradients (`from-purple-500 via-pink-500 to-orange-400`)
- ❌ Neon-Farben oder Glow-Effekte
- ❌ Rainbow-Gradients
- ❌ Dunkle/Schwarze Hintergründe (außer Footer)
- ❌ Übertriebene Schatten (`shadow-2xl` sparsam!)

---

## Erlaubte Background-Patterns

```tsx
// Section Backgrounds
className="bg-brand-light/50"
className="bg-brand-light/30"
className="bg-amber-50"
className="bg-white"

// Gradients (NUR amber/white!)
className="bg-gradient-to-b from-amber-50 to-white"
className="bg-gradient-to-r from-brand-gold/20 to-brand-brown/20"

// NIEMALS:
className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50" // ❌
```

---

## Typografie

### Fonts
- **Headlines**: Playfair Display (serif) - `font-serif`
- **Body**: Lato (sans-serif) - `font-sans` (default)

### Größen
| Element | Class | Verwendung |
|---------|-------|------------|
| H1 | `text-4xl md:text-5xl font-serif font-bold` | Page Titles |
| H2 | `text-3xl md:text-4xl font-serif font-bold` | Section Headers |
| H3 | `text-xl md:text-2xl font-semibold` | Subsections |
| Body | `text-lg` | **STANDARD** für alle `<p>` Tags |
| Small | `text-base` | Minimum für lesbaren Text |

**NIEMALS** `text-sm` für Body-Text verwenden!

---

## Button-Styles

### Primary Button (CTA)
```tsx
className="btn-primary"
// = bg-brand-brown text-white hover:bg-brand-brownDark rounded-xl px-6 py-3 font-semibold
```

### Secondary Button
```tsx
className="btn-secondary"
// = border border-brand-brown text-brand-brown bg-white hover:bg-gray-50 rounded-xl px-6 py-3 font-semibold
```

### Button mit Icon
```tsx
// Icon IMMER auf Module-Level definieren (Fast Refresh Fix!)
const arrowIcon = <ArrowRight className="ml-2 w-5 h-5" />;

// In Component:
<button className="btn-primary">
  Text {arrowIcon}
</button>
```

---

## Component Patterns

### Cards
```tsx
<div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
```

### Section Container
```tsx
<section className="py-12 md:py-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

### Trust Indicators
```tsx
<div className="flex items-center space-x-2">
  {iconAtModuleLevel}
  <span className="text-gray-600">Trust Text</span>
</div>
```

---

## Fast Refresh Rules (KRITISCH!)

Um Fast Refresh Loops zu vermeiden:

### Icons IMMER auf Module-Level definieren
```tsx
// ✅ RICHTIG - Außerhalb der Component
const clockIcon = <Clock className="w-4 h-4 text-brand-brown" />;
const arrowIcon = <ArrowRight className="w-5 h-5" />;

export default function Component() {
  return <div>{clockIcon}</div>;
}

// ❌ FALSCH - Im JSX inline
export default function Component() {
  return <div><Clock className="w-4 h-4" /></div>; // Fast Refresh Loop!
}
```

### Keine JSX in Props
```tsx
// ❌ FALSCH
<Hero primaryCta={{ icon: <ArrowRight /> }} />

// ✅ RICHTIG
const icon = <ArrowRight />;
<Hero primaryCta={{ icon }} />
```

---

## Social Media Integration

Auch für Social-Media-Elemente (Instagram, etc.) gilt das Brand-Design:

```tsx
// ✅ RICHTIG - On-Brand Instagram Button
<a className="group flex items-center gap-4 bg-white rounded-2xl px-8 py-5
              shadow-md hover:shadow-lg border border-gray-100 hover:border-brand-gold">
  <div className="w-14 h-14 rounded-xl bg-brand-brown flex items-center justify-center text-white">
    {instagramIcon}
  </div>
  <div>
    <p className="font-semibold text-gray-900 group-hover:text-brand-brown">@pferdewert.de</p>
    <p className="text-sm text-gray-600">Folge uns auf Instagram</p>
  </div>
</a>

// ❌ FALSCH - Instagram-Style Gradient (VERBOTEN!)
<div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
```

---

## Anti-Patterns (NIEMALS!)

### Generische AI-Ästhetik vermeiden
- ❌ Lila/Pink Gradients
- ❌ "Futuristische" Neon-Farben
- ❌ Übertriebene Animationen
- ❌ Dunkle Tech-Themes
- ❌ Generische Stock-Photo-Ästhetik

### PferdeWert Look & Feel
- ✅ Warme, einladende Erdtöne (Braun, Gold, Amber)
- ✅ Klare, professionelle Typografie
- ✅ Subtile Schatten und Hover-Effekte
- ✅ Viel Whitespace
- ✅ Trust-fokussiertes Design (Pferdebesitzer ansprechen)

---

## Content Rules

| Regel | Richtig | Falsch |
|-------|---------|--------|
| KI-Bezeichnung | "KI" | "AI" |
| Evaluation Dauer | "2 Minuten" | "3 Minuten" |
| Preismodell | Nie "kostenlos" | "kostenlos", "free" |
| Ansprache | "Du", "Dein" | "Sie", "Ihr" |
| CTA Link | `/pferde-preis-berechnen` | `/bewertung` |

---

## Checkliste vor Commit

- [ ] Nur erlaubte Farben verwendet (keine pink/purple/etc.)
- [ ] Icons auf Module-Level definiert (Fast Refresh)
- [ ] `text-lg` für Body-Text (nicht `text-sm`)
- [ ] Buttons mit `btn-primary` / `btn-secondary`
- [ ] Backgrounds nur mit Brand-Farben
- [ ] "KI" statt "AI", "2 Minuten" für Dauer
- [ ] Mobile-first responsive Design
- [ ] `npm run lint && npm run type-check` bestanden

---

**Version:** 1.0.0
**Erstellt:** 2025-12-14
