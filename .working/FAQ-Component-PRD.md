# FAQ Component PRD (Product Requirements Document)

## Executive Summary
Erstelle eine standardisierte, wiederverwendbare FAQ-Komponente für alle Ratgeber-Seiten von PferdeWert.de. Ziel ist die Eliminierung der inkonsistenten FAQ-Implementierungen und die Sicherstellung eines einheitlichen Designs gemäß SEO-DESIGN.md.

## Problem Statement
**Aktueller Zustand**: FAQ-Sections sind inkonsistent implementiert:
- `aku-pferd-kosten.tsx`: Blaue Focus-Rings, komplexe Verschachtelung
- `aku-pferd.tsx`: Einfache Implementierung ohne Toggle
- `pferd-kaufen-niedersachsen.tsx`: Accordion mit State Management
- 18+ Seiten mit unterschiedlichen FAQ-Styling

**Gewünschter Zustand**: Eine einheitliche FAQ-Komponente mit konsistentem Design und Verhalten.

## Business Goals
- **Konsistenz**: Einheitliches Design auf allen Ratgeber-Seiten
- **Wartbarkeit**: Zentrale Komponente für einfache Updates
- **SEO**: Automatische Schema.org JSON-LD Integration
- **UX**: Verbesserte Benutzerfreundlichkeit durch standardisierte Interaktion

## Target Users
- **Pferdebegeisterte**: Benutzer, die FAQ-Sections lesen
- **Entwickler**: Team-Mitglieder, die neue Ratgeber-Seiten erstellen
- **Content-Manager**: Personen, die FAQ-Inhalte pflegen

## Functional Requirements

### FR-1: FAQ Component Interface
```tsx
interface FAQItem {
  question: string;
  answer: string;
  highlight?: boolean;
}

interface FAQProps {
  faqs: FAQItem[];
  sectionTitle?: string;
  withToggle?: boolean;
  withSchema?: boolean;
}
```

### FR-2: Design Specifications (aus SEO-DESIGN.md)
- **Container**: `brand-light` Hintergrund (#f8f8f6), `rounded-xl`
- **FAQ Items**: Weiß, `rounded-lg`, `border border-gray-200`
- **Questions**: Playfair Display, 18px, `brand-default` (#4e463b), `font-semibold`
- **Answers**: Lato, 16px, `brand-default/80`, `line-height 1.6`
- **Toggle-Buttons**: Hover: `brand-light` (#f8f8f6), **KEINE** blauen focus-rings
- **Highlight Items**: `brand-gold` Border (#f6c36a), leichter `brand-gold/5` Hintergrund
- **Icons**: `brand-brown` (#92400e) statt blau

### FR-3: Responsive Design
- **Desktop**: `p-6` für Items, `mb-4` zwischen Items
- **Mobile**: Reduzierte Padding (`p-4`), kleinere Schrift
- **Touch-Targets**: Mindestens 44px für mobile Interaktion

### FR-4: Accessibility
- **Keyboard Navigation**: Tab-Navigation durch alle FAQ-Items
- **Screen Reader**: Proper ARIA-Labels für Accordion-States
- **Focus Management**: Sichtbare Focus-Indikatoren (brand-gold, nicht blau)

### FR-5: SEO Integration
- **Schema.org JSON-LD**: Automatische Generation für FAQ-Schema
- **Semantic HTML**: Proper H3/H4 für Questions, strukturierte Answer-Paragraphen

## Technical Requirements

### TR-1: Technology Stack
- **Framework**: React/TypeScript/Next.js 15
- **Styling**: Tailwind CSS mit bestehenden Brand-Klassen
- **State Management**: React useState für Toggle-Funktionalität
- **Icons**: Bestehende Icon-Library oder Tailwind

### TR-2: File Structure
```
frontend/
├── components/
│   ├── FAQ.tsx                 # Haupt-FAQ-Komponente
│   └── FAQ.module.css         # Optional: Custom Styles
├── types/
│   └── faq.types.ts           # TypeScript Interfaces
└── utils/
    └── faq-schema.ts          # Schema.org JSON-LD Generator
```

### TR-3: Performance Requirements
- **Bundle Size**: Komponente < 5KB gzipped
- **Rendering**: Lazy Loading für große FAQ-Lists
- **Accessibility**: Keine Layout-Shifts bei Toggle-Animationen

## Implementation Plan

### Phase 1: Core Component (1-2 Tage)
**Ziel**: Basis-FAQ-Komponente mit korrektem Design

**Tasks**:
1. **Erstelle `components/FAQ.tsx`**
   - TypeScript Interface implementieren
   - Basic Accordion-Funktionalität
   - Tailwind-Styling gemäß SEO-DESIGN.md

2. **Erstelle `types/faq.types.ts`**
   - FAQItem Interface
   - FAQProps Interface
   - Export für Wiederverwendung

3. **Testing**
   - Erstelle Test-Page mit Sample-FAQs
   - Mobile/Desktop Responsiveness testen
   - Accessibility mit Screen Reader testen

**Deliverable**: Funktionsfähige FAQ-Komponente

### Phase 2: SEO Integration (1 Tag)
**Ziel**: Schema.org JSON-LD automatisch generieren

**Tasks**:
1. **Erstelle `utils/faq-schema.ts`**
   - Function für Schema.org FAQ-Generation
   - Integration in FAQ-Komponente

2. **Schema Testing**
   - Google Rich Results Test
   - Validierung der JSON-LD Struktur

**Deliverable**: SEO-optimierte FAQ-Komponente

### Phase 3: Migration (2-3 Tage)
**Ziel**: Bestehende FAQ-Implementierungen migrieren

**Tasks**:
1. **Audit bestehender FAQ-Sections**
   - Liste aller 18+ Seiten mit FAQs
   - Content-Extraktion für Migration

2. **Schrittweise Migration**
   - Start mit problematischen Seiten (aku-pferd-kosten.tsx)
   - Testing nach jeder Migration
   - Content-Validation

3. **Cleanup**
   - Entfernung alter FAQ-Code
   - CSS-Cleanup nicht genutzter Styles

**Deliverable**: Alle FAQs nutzen neue Komponente

### Phase 4: Enhancement (Optional, 1 Tag)
**Ziel**: Advanced Features

**Tasks**:
1. **Animation Enhancement**
   - Smooth Toggle-Animationen
   - Fade-in Effekte für Answers

2. **Analytics Integration**
   - FAQ Click-Tracking
   - User Interaction Metrics

**Deliverable**: Enhanced User Experience

## Acceptance Criteria

### AC-1: Design Compliance
- [ ] FAQ-Komponente folgt exakt SEO-DESIGN.md Spezifikationen
- [ ] Keine blauen Focus-Rings oder Accent-Farben
- [ ] Korrekte Brand-Farben (brown, gold, beige)
- [ ] Mobile-Responsive Design

### AC-2: Functionality
- [ ] Toggle-Funktionalität funktioniert einwandfrei
- [ ] Highlight-FAQs sind visuell hervorgehoben
- [ ] Keyboard-Navigation möglich
- [ ] Screen Reader kompatibel

### AC-3: SEO Requirements
- [ ] Schema.org JSON-LD wird automatisch generiert
- [ ] Rich Results Test bestanden
- [ ] Semantic HTML-Struktur

### AC-4: Performance
- [ ] Page Speed nicht beeinträchtigt
- [ ] Keine Layout-Shifts
- [ ] Bundle-Size optimiert

### AC-5: Migration Success
- [ ] Alle bestehenden FAQ-Sections erfolgreich migriert
- [ ] Kein Content-Verlust
- [ ] Konsistentes Design auf allen Seiten

## Risk Assessment

### High Risk
- **Breaking Changes**: Migration könnte bestehende Seiten brechen
  - **Mitigation**: Schrittweise Migration mit Testing

### Medium Risk
- **Design Inconsistencies**: Neue Komponente passt nicht zu bestehendem Design
  - **Mitigation**: Strikte Adherence zu SEO-DESIGN.md

### Low Risk
- **Performance Impact**: Komponente könnte Page Speed beeinträchtigen
  - **Mitigation**: Performance-Testing während Entwicklung

## Success Metrics

### Technical Metrics
- **Migration Rate**: 100% aller FAQ-Sections migriert
- **Performance**: Keine Page Speed Regression
- **Accessibility Score**: 100% in Lighthouse

### Business Metrics
- **Consistency**: Einheitliche FAQ-Darstellung auf allen Seiten
- **Development Velocity**: Schnellere Erstellung neuer Ratgeber-Seiten
- **SEO**: Verbesserte Rich Results für FAQ-Queries

## Timeline

**Total Estimated Time**: 4-6 Tage

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Core Component | 1-2 Tage | SEO-DESIGN.md |
| Phase 2: SEO Integration | 1 Tag | Phase 1 complete |
| Phase 3: Migration | 2-3 Tage | Phase 2 complete |
| Phase 4: Enhancement | 1 Tag | Optional |

**Target Completion**: Innerhalb 1 Woche

## Implementation Notes

### Code Standards
- Folge bestehende TypeScript-Standards
- ESLint-Compliance erforderlich
- Keine `any` Types verwenden

### Testing Strategy
- Component Unit Tests
- Integration Tests für Schema.org
- Visual Regression Tests für Design
- Accessibility Tests

### Documentation
- Komponenten-Dokumentaion in README
- Usage Examples für Developer
- Migration Guide für bestehende Seiten