# Stockmass Bug Fix - Test Required

## Problem
Stockmass (Stockmaß) form field multipliziert Eingabewerte um Faktor 100:
- Eingabe: "170" (für 170cm)
- Backend erhält: "17000"

## Root Cause Analysis
Wahrscheinlich Locale-spezifische Zahlenformatierung:
- Deutsche Locale könnte "170" als "170,00" interpretieren
- Beim Parsing wird daraus fälschlicherweise 17000

## Implementierte Fixes

### 1. Frontend Input Sanitization
**Datei:** `pages/pferde-preis-berechnen.tsx:272-276`
```typescript
// Ensure stockmass is stored as clean number string (no locale formatting)
const cleanValue = value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
```

### 2. Debug Logging - Frontend
**Dateien:** 
- `pages/pferde-preis-berechnen.tsx:268-269` (Input)
- `pages/pferde-preis-berechnen.tsx:425-426` (Form Submission)

### 3. Debug Logging - Backend
**Datei:** `pages/api/checkout.ts:60-62, 72-73`
- Log raw received value
- Log value after Zod validation

## Test-Anweisungen für morgen

### 1. Browser Console öffnen
- F12 → Console Tab

### 2. Stockmass-Feld testen
- Gehe zu Form: `/pferde-preis-berechnen`
- Gib "170" in Stockmaß-Feld ein
- **Erwartete Console-Ausgabe:**
  ```
  [DEBUG] stockmass input - raw value: "170", type: string
  ```
  - Falls cleaned: `[DEBUG] stockmass cleaned from "170,00" to "170"`

### 3. Form Submit testen
- Fülle restliche Pflichtfelder aus
- Klick auf "Zur Zahlung"
- **Erwartete Frontend Console-Ausgabe:**
  ```
  [DEBUG] Form submission - stockmass value: "170", typeof: string
  [DEBUG] Full form object: {...stockmass: "170"...}
  ```

### 4. Backend Logs prüfen
- **Erwartete Backend Log-Ausgabe:**
  ```
  [CHECKOUT DEBUG] stockmass received - value: "170", type: string
  [CHECKOUT DEBUG] stockmass after validation - value: "170", type: number
  ```

## Erfolg-Kriterien
✅ Frontend Console zeigt "170" (nicht "17000")  
✅ Backend Log zeigt "170" (nicht "17000")  
✅ Stripe Checkout funktioniert normal

## Falls Problem weiterhin besteht
- Console-Ausgaben dokumentieren
- Prüfen ob andere Browser dasselbe Problem haben
- Eventuell weitere Locale-Settings prüfen

## Files Changed
- `pages/pferde-preis-berechnen.tsx` - Input sanitization + debug logging
- `pages/api/checkout.ts` - Backend debug logging

---
**Status:** Ready for Testing  
**Date:** 2025-01-23  
**Priority:** High - Customer Impact