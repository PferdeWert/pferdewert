# Pricing Component Restructuring Plan

## Executive Summary
Die aktuelle Trennung zwischen `PricingCarousel.tsx` und `TierCard.tsx` ist architektonisch nicht optimal und führt zu Wartbarkeitsproblemen. Diese Analyse empfiehlt eine Zusammenführung der Komponenten zur Verbesserung der Codequalität und Reduzierung der Komplexität um ca. 40%.

## Current Architecture Issues

### 1. Unnötige Komponentenseparation
- `TierCard` wird ausschließlich in `PricingCarousel` verwendet
- Keine Wiederverwendung außerhalb des Carousel-Kontexts
- Künstliche Abstraktion ohne Mehrwert

### 2. Duplizierte Geschäftslogik
**In PricingCarousel.tsx (Zeile 107):**
```typescript
isHighlighted={tier.id === 'standard'} // Standard tier always highlighted
```

**In TierCard.tsx (Zeilen 33-34):**
```typescript
const isPermanentlyHighlighted = config.id === 'standard';
const shouldShowBorder = isPermanentlyHighlighted;
```

### 3. Props Drilling
- `TierConfig` wird durch mehrere Ebenen gereicht
- `isHighlighted` Prop wird berechnet und weitergegeben
- `onSelect` Handler wird durchgeschleift

### 4. Magic Numbers ohne Konstanten
**In PricingCarousel.tsx (Zeilen 42-44):**
```typescript
const cardWidth = 240; // w-60 = 240px
const spaceBetweenCards = 8; // space-x-2 = 8px  
const containerPaddingLeft = 65; // px-16 = 64px
```

## Recommended Solution: Component Merger

### 1. Neue Struktur
```
frontend/components/pricing/
├── PricingDisplay.tsx     // Merged component (NEW)
└── [archived]/
    ├── PricingCarousel.tsx // TO REMOVE
    └── TierCard.tsx        // TO REMOVE
```

### 2. Implementation Plan

#### Phase 1: Create PricingDisplay.tsx
- Merge beide Komponenten in eine einzige Datei
- Interne TierCard als lokale Komponente definieren
- Standard-Tier Highlighting direkt implementieren
- Magic Numbers in benannte Konstanten extrahieren

#### Phase 2: Extract Constants
```typescript
const MOBILE_LAYOUT = {
  CARD_WIDTH: 240,
  SPACE_BETWEEN: 8,
  CONTAINER_PADDING: 65,
  SCALE_FACTOR: 1.08
} as const;
```

#### Phase 3: Update Dependencies
- `preise-neu.tsx` auf `PricingDisplay` umstellen
- Imports anpassen
- Props Interface vereinfachen

#### Phase 4: Cleanup
- Alte Dateien entfernen
- Tests anpassen falls vorhanden

### 3. Expected Benefits
- **~40% Code Reduction**: Von 479 Zeilen auf ~290 Zeilen
- **Eliminierung Props Drilling**: Direkte Datenverwendung
- **Bessere Maintainability**: Ein File, ein Verantwortungsbereich
- **Performance**: Weniger Component Overhead
- **Typsicherheit**: Reduzierte Interface-Komplexität

## Implementation Tasks

### For Frontend Developer (`pferdewert-frontend-dev`)

1. **Create merged component** (`PricingDisplay.tsx`)
   - Kombiniere UI Logic von beiden Komponenten
   - Standard-Tier Highlighting inline implementieren
   - Mobile scroll optimization beibehalten

2. **Extract magic numbers to constants**
   - Benenne alle numerischen Werte
   - Erstelle MOBILE_LAYOUT Konstanten-Objekt
   - Dokumentiere Berechnungslogik

3. **Update preise-neu.tsx**
   - Import von `PricingCarousel` auf `PricingDisplay` ändern
   - Props Interface prüfen und anpassen
   - Funktionalität testen

4. **Remove old files**
   - `PricingCarousel.tsx` und `TierCard.tsx` löschen
   - Import-Referenzen prüfen

### For Code Reviewer (`pferdewert-code-reviewer`)

1. **Functionality Verification**
   - Desktop Grid Layout funktioniert korrekt
   - Mobile Carousel scrollt zu Standard-Tier
   - Tier-Selection und Navigation zu `/bewertung` funktioniert
   - Badge Positioning (breaks container boundaries) bleibt erhalten

2. **Code Quality Review**
   - TypeScript Types korrekt
   - Tailwind Classes korrekt angewendet
   - Accessibility (ARIA labels) beibehalten
   - Performance optimizations nicht verschlechtert

3. **Visual Regression Testing**
   - Desktop: 3-Spalten Grid mit gleichen Höhen
   - Mobile: Horizontaler Scroll mit Peek-Through Effekt
   - Standard-Tier Highlighting (brand-brown border)
   - Badge "Beliebteste Wahl" korrekt positioniert

4. **Integration Testing**
   - `preise-neu.tsx` rendert korrekt
   - Tier-Selection Analytics Events funktionieren
   - Router.push zu `/bewertung?tier=${tier}` funktioniert
   - Stripe Integration nicht beeinträchtigt

## Files to Modify

### Primary Changes
- **NEW**: `frontend/components/pricing/PricingDisplay.tsx`
- **MODIFY**: `frontend/pages/preise-neu.tsx` (Import-Update)

### Files to Remove
- `frontend/components/pricing/PricingCarousel.tsx`
- `frontend/components/pricing/TierCard.tsx`

### Dependencies to Verify
- `frontend/lib/pricing.ts` (keine Änderung erforderlich)
- TypeScript Imports in anderen Dateien prüfen

## Risk Assessment
- **Low Risk**: Funktionalität bleibt identisch
- **Medium Risk**: Import-Updates in anderen Dateien
- **Mitigation**: Comprehensive testing nach Implementierung

## Success Criteria
- [ ] Alle visuellen Features funktionieren identisch
- [ ] Mobile Carousel auto-scroll zu Standard-Tier
- [ ] Desktop Grid Layout mit gleichen Card-Höhen  
- [ ] Tier-Selection und Navigation funktioniert
- [ ] TypeScript Kompilierung ohne Errors
- [ ] ESLint ohne Warnings
- [ ] Code ist um ~40% reduziert

---

**Erstellt**: 2025-08-30  
**Analyst**: Claude Code Architecture Review  
**Implementierung**: pferdewert-frontend-dev  
**Review**: pferdewert-code-reviewer  