# UX Plan: Mobile-Optimiertes Wizard-Formular für /pferde-preis-berechnen

## Analyse des aktuellen Zustands

### Aktuelle Formularfelder (13 Felder identifiziert):
1. **rasse** (required) - Rasse des Pferdes
2. **alter** (required) - Alter in Jahren
3. **geschlecht** (required) - Stute/Wallach/Hengst
4. **stockmass** (required) - Stockmaß in cm
5. **haupteignung** (required) - Haupteignung/Disziplin
6. **ausbildung** (required) - Ausbildungsstand
7. **erfolge** (optional) - Turniererfahrung/Erfolge
8. **abstammung** (optional) - Vater x Muttervater
9. **charakter** (optional) - Charakter & Rittigkeit
10. **aku** (optional) - Gesundheit/AKU
11. **besonderheiten** (optional) - Besonderheiten
12. **standort** (optional) - Standort (PLZ)
13. **attribution_source** (optional) - Wie auf PferdeWert aufmerksam geworden

### Aktuelles Problem:
- Nur 2 echte Wizard-Schritte vor Checkout
- Schritt 1: 6 Felder (zu viele für mobile UX)
- Schritt 2: 7 Felder (deutlich zu viele für mobile UX)
- Checkout als Schritt 3

## Neue 4-Schritt Wizard-Struktur

### Schritt 1: Grunddaten (4 Felder) - Basis-Informationen
**Ziel**: Essenzielle Pferdedaten erfassen
```
1. rasse (required) - Rasse
2. alter (required) - Alter (Jahre)
3. geschlecht (required) - Geschlecht
4. stockmass (required) - Stockmaß (cm)
```
**Mobile UX**:
- 2x2 Grid auf größeren Mobiles (>375px)
- Single Column auf kleinen Mobiles
- Touch-optimierte Eingabefelder (min. 44px)
- Numerische Tastatur für Alter/Stockmaß

### Schritt 2: Fähigkeiten & Eignung (4 Felder) - Performance-Daten
**Ziel**: Ausbildung und Verwendung erfassen
```
1. haupteignung (required) - Haupteignung/Disziplin
2. ausbildung (required) - Ausbildungsstand
3. erfolge (optional) - Turniererfahrung/Erfolge
4. abstammung (optional) - Abstammung (Vater x Muttervater)
```
**Mobile UX**:
- Haupteignung und Ausbildung als Pflichtfelder prominent
- Erfolge und Abstammung als "Für genauere Bewertung" markiert
- Auto-Suggest für häufige Rassen in Abstammung

### Schritt 3: Charakter & Gesundheit (5 Felder) - Zusatzinformationen
**Ziel**: Qualitative Faktoren und Tracking
```
1. charakter (optional) - Charakter & Rittigkeit
2. aku (optional) - Gesundheit/AKU
3. besonderheiten (optional) - Besonderheiten
4. standort (optional) - Standort (PLZ)
5. attribution_source (optional) - Traffic-Quelle
```
**Mobile UX**:
- Alle Felder optional → entspannter Schritt
- Großzügige Textarea-Felder für Freitext
- PLZ-Validierung mit Autocomplete
- Attribution diskret am Ende

### Schritt 4: Checkout (EXTRA) - Bezahlung
**Ziel**: Kaufabschluss optimieren
- Pricing prominent
- Trust-Signale verstärken
- Consent-Checkbox
- Mobile Sticky-Button

## Mobile UX Verbesserungen

### 1. Responsive Feldanordnung
```css
/* Mobile First Approach */
.wizard-fields {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 480px) {
  .wizard-fields {
    grid-template-columns: 1fr 1fr;
  }

  .full-width {
    grid-column: 1 / -1;
  }
}
```

### 2. Touch-Optimierte Eingabefelder
- **Minimum Target Size**: 44px x 44px (Apple/WCAG Standard)
- **Padding**: 16px vertikal, 20px horizontal
- **Font Size**: min. 16px (verhindert iOS Safari Zoom)
- **Border Radius**: 12px für moderne Optik
- **Focus States**: Deutliche 4px Ring mit Brand-Farbe

### 3. Progressive Enhancement
```typescript
// Input Types für bessere Mobile-Erfahrung
- alter: inputMode="numeric" pattern="[0-9]*"
- stockmass: inputMode="numeric" pattern="[0-9]*"
- standort: inputMode="numeric" pattern="[0-9]*"
```

### 4. Verbesserte Navigation
**Mobile Navigation Pattern**:
- Zurück-Button: Links, nur Icon mit Label für Screen Reader
- Weiter-Button: Rechts, primärer Call-to-Action
- Progress Bar: Sticky am oberen Rand
- Schritt-Indikatoren: Nur Nummern auf Mobile, Labels auf Desktop

**Scroll-Verhalten**:
- Nach Schritt-Wechsel: Smooth scroll zur Form-Card
- Form-Validierung: Scroll zum ersten Fehler-Feld
- Mobile-spezifisch: Berücksichtigung von Virtual Keyboard

## Navigation zwischen den Schritten

### State Management
```typescript
interface WizardState {
  currentStep: number; // 1-4
  formData: FormState;
  fieldErrors: Record<string, string>;
  stepValidation: Record<number, boolean>;
}
```

### Validierungs-Logik
```typescript
const stepValidation = {
  1: ['rasse', 'alter', 'geschlecht', 'stockmass'], // Alle required
  2: ['haupteignung', 'ausbildung'], // Nur diese required
  3: [], // Alle optional
  4: ['consent'] // Nur Consent required
};
```

### Navigation Guards
- **Vorwärts**: Validierung des aktuellen Schritts
- **Rückwärts**: Immer erlaubt (keine Validierung)
- **Direkte Navigation**: Nur zu bereits besuchten/validierten Schritten
- **Form Auto-Save**: Lokaler Storage nach jedem Feldwechsel

## Checkout als separater finaler Schritt

### Checkout-Optimierungen
1. **Trust-Building Elements**:
   - SSL-Badge prominent
   - Geld-zurück-Garantie
   - Stripe-Logo für Vertrauen
   - 4.7/5 Sterne Bewertung

2. **Mobile Checkout UX**:
   - Sticky Submit-Button am unteren Rand
   - Preis-Information klar sichtbar
   - Consent-Checkbox groß und deutlich
   - Loading-State mit Progress-Feedback

3. **Conversion-Optimierung**:
   - Single-Step Checkout (keine weiteren Schritte)
   - Klare Preis-Kommunikation: "29€ einmalig"
   - Urgency: "Sofortiges Ergebnis in 2 Minuten"
   - Risk Reversal: Geld-zurück-Garantie

## Implementierungshinweise für Frontend Developer

### 1. Schritt-Konfiguration anpassen
```typescript
// Neue stepData Konfiguration
const stepData: StepData[] = [
  {
    id: 1,
    title: "Grunddaten",
    subtitle: "Grunddaten deines Pferdes",
    description: "Die wichtigsten Informationen zu deinem Pferd",
    icon: "🐎",
    iconBg: "bg-amber-100",
    fields: [
      { name: "rasse", required: true, fullWidth: true },
      { name: "alter", required: true, halfWidth: true },
      { name: "geschlecht", required: true, halfWidth: true },
      { name: "stockmass", required: true, halfWidth: true }
    ]
  },
  {
    id: 2,
    title: "Fähigkeiten",
    subtitle: "Ausbildung & Verwendung",
    description: "Wofür ist dein Pferd ausgebildet?",
    icon: "🏆",
    iconBg: "bg-blue-100",
    fields: [
      { name: "haupteignung", required: true, halfWidth: true },
      { name: "ausbildung", required: true, halfWidth: true },
      { name: "erfolge", required: false, fullWidth: true },
      { name: "abstammung", required: false, fullWidth: true }
    ]
  },
  {
    id: 3,
    title: "Details",
    subtitle: "Charakter & Gesundheit",
    description: "Weitere Details für eine genauere Bewertung",
    icon: "❤️",
    iconBg: "bg-green-100",
    fields: [
      { name: "charakter", required: false, fullWidth: true },
      { name: "aku", required: false, fullWidth: true },
      { name: "besonderheiten", required: false, fullWidth: true },
      { name: "standort", required: false, halfWidth: true },
      { name: "attribution_source", required: false, halfWidth: true }
    ]
  },
  {
    id: 4,
    title: "Checkout",
    subtitle: "Analyse starten",
    description: "Nur noch ein Klick zur professionellen Pferdebewertung",
    icon: "💳",
    iconBg: "bg-purple-100",
    fields: []
  }
];
```

### 2. Validierungs-Logik erweitern
```typescript
const validateStep = (step: number): boolean => {
  const requiredFields = {
    1: ['rasse', 'alter', 'geschlecht', 'stockmass'],
    2: ['haupteignung', 'ausbildung'],
    3: [], // Alle optional
    4: ['consent'] // Nur im handleSubmit
  };

  const fieldsToValidate = requiredFields[step] || [];
  // Rest der Validation...
};
```

### 3. Progress Indicator Update
```tsx
// Progress Indicator für 4 Schritte
<div className="flex items-center justify-center space-x-2 sm:space-x-6">
  {stepData.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div className={`
        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
        text-sm font-semibold transition-all duration-300
        ${currentStep >= step.id
          ? 'bg-brand-brown text-white shadow-lg scale-110'
          : 'bg-gray-200 text-gray-500'}
      `}>
        {step.id}
      </div>
      {/* Responsive Labels */}
      <span className={`ml-2 text-xs sm:text-sm font-medium hidden sm:block
        ${currentStep >= step.id ? 'text-brand-brown' : 'text-gray-500'}`}>
        {step.title}
      </span>
      {/* Progress Line */}
      {index < stepData.length - 1 && (
        <div className={`ml-2 sm:ml-4 w-4 sm:w-8 h-0.5 transition-all
          ${currentStep > step.id ? 'bg-brand-brown' : 'bg-gray-200'}`} />
      )}
    </div>
  ))}
</div>
```

### 4. Mobile-spezifische CSS-Klassen
```css
/* Neue Utility-Klassen für .../globals.css */
.wizard-field-mobile {
  @apply w-full p-4 border rounded-2xl transition-all text-base;
  font-size: 16px; /* Verhindert iOS Safari Zoom */
  min-height: 44px; /* Touch-Target Minimum */
}

.wizard-grid-mobile {
  @apply grid gap-6 grid-cols-1;
}

@media (min-width: 480px) {
  .wizard-grid-mobile {
    @apply grid-cols-2;
  }
}

.sticky-progress-mobile {
  @apply sticky top-0 bg-white/95 backdrop-blur-sm z-30 py-4;
}
```

### 5. Accessibility Verbesserungen
```tsx
// ARIA Labels für Screen Reader
<div role="progressbar"
     aria-valuenow={currentStep}
     aria-valuemin={1}
     aria-valuemax={4}
     aria-label={`Schritt ${currentStep} von 4`}>

// Fokus-Management nach Schritt-Wechsel
const focusFirstField = () => {
  const firstField = document.querySelector('#wizard-card input, #wizard-card select');
  if (firstField) {
    (firstField as HTMLElement).focus();
  }
};
```

## Performance-Optimierungen

### 1. Lazy Loading
- Step-spezifische Komponenten erst bei Bedarf laden
- Bildoptimierung für Testimonials weiter unten auf der Seite

### 2. Form State Management
- Debounced localStorage saves (bereits implementiert)
- Optimistic UI updates
- Validierung nur bei Schritt-Wechsel, nicht bei jedem Input

### 3. Mobile-spezifische Optimierungen
- Reduzierte Animationen auf schwächeren Geräten
- Touch-Event Optimierungen
- Viewport Meta Tag Optimierung

## A/B Testing Empfehlungen

### Test 1: Schritt-Aufteilung
- **Variante A**: 3 Schritte (aktuell)
- **Variante B**: 4 Schritte (vorgeschlagen)
- **Metrik**: Form Completion Rate

### Test 2: Feld-Beschriftungen
- **Variante A**: Aktuelle Labels
- **Variante B**: Vereinfachte, konversationelle Labels
- **Metrik**: Field Completion Time

### Test 3: Progress Indicator
- **Variante A**: Numerisch (1,2,3,4)
- **Variante B**: Iconbasiert (🐎,🏆,❤️,💳)
- **Metrik**: User Engagement & Completion

## Messbare KPIs

### Conversion Metrics
- **Form Start Rate**: Klicks auf erstes Eingabefeld
- **Step Completion Rate**: % der User pro Schritt
- **Form Abandonment Points**: Wo steigen User aus?
- **Mobile vs Desktop Completion**: Vergleich der Plattformen

### UX Metrics
- **Time per Step**: Durchschnittliche Verweildauer
- **Error Rate per Field**: Validierungsfehler-Häufigkeit
- **Back Navigation Usage**: Rückwärts-Navigation-Häufigkeit
- **Help/Placeholder Interaction**: Nutzer-Guidance Effectiveness

### Technical Metrics
- **Form Loading Time**: Time to Interactive
- **Mobile Performance Score**: Lighthouse Mobile Score
- **Input Response Time**: Zeit bis erste Eingabe registriert wird

---

**Nächste Schritte**:
1. Frontend Developer implementiert neue 4-Schritt Struktur
2. Mobile Testing auf realen Geräten (iOS Safari, Android Chrome)
3. Analytics Integration für KPI-Tracking
4. A/B Testing Setup für Conversion-Optimierung