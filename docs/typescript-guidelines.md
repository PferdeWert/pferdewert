# TypeScript Development Guidelines - PferdeWert.de

## 🚨 ESLint Configuration
- **`@typescript-eslint/no-explicit-any`** ist aktiviert - niemals `any` verwenden
- **`@typescript-eslint/no-require-imports`** ist aktiviert - nur ES6 imports
- **`jsx-a11y/alt-text`** warnings sind OK (bestehende Legacy-Probleme)

## ✅ Erlaubte Patterns

### Window Object Extensions
```typescript
// ✅ RICHTIG - in types/global.d.ts:
declare global {
  interface Window {
    cookieconsent?: {
      initialise?: (config: Record<string, unknown>) => void;
    };
    gtag?: (command: string, action: string, config?: Record<string, unknown>) => void;
  }
}
```

### Type-Safe External Libraries
```typescript
// ✅ RICHTIG - für externe JS Libraries:
const cookieConsent = window.cookieconsent;
if (!cookieConsent?.initialise) {
  console.error('Library not found');
  return;
}

// ✅ RICHTIG - mit Optional Chaining:
window.gtag?.('consent', 'update', { ... });
```

### Component Props
```typescript
// ✅ RICHTIG - spezifische Interfaces:
interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
  autoLoad?: boolean;
}
```

## ❌ Häufige Fehler

### NIEMALS `any` verwenden
```typescript
// ❌ FALSCH:
const cookieConsent = (window as any).cookieconsent;
const gtag = (window as any).gtag;

// ✅ RICHTIG:
const cookieConsent = window.cookieconsent;
const gtag = window.gtag;
```

### Keine rekursiven Type-Definitionen
```typescript
// ❌ FALSCH - Rekursion:
interface CookieConsentWindow extends Window { ... }
declare global {
  interface Window extends CookieConsentWindow { ... }
}

// ✅ RICHTIG - direkte Extension:
declare global {
  interface Window { 
    cookieconsent?: { ... }
  }
}
```

### Keine require() in TypeScript
```typescript
// ❌ FALSCH:
const CookieConsent = require("@/components/CookieConsent");

// ✅ RICHTIG:
import CookieConsent from "@/components/CookieConsent";
```

## 📋 Pre-Commit Checklist

Vor jedem Commit:
```bash
npm run lint     # Muss 0 errors haben
npm run build    # Muss erfolgreich sein
```

## 🏗️ Architecture Patterns

### Komponenten-Struktur
```
components/
├── MyComponent/
│   ├── index.ts          # Export only
│   ├── MyComponent.tsx   # Main component
│   └── types.ts          # Local types (optional)
```

### Import-Hierarchie
1. **React/Next.js** imports
2. **External libraries** 
3. **Internal components** (`@/components/...`)
4. **Internal utils** (`@/lib/...`)
5. **Types** (nur wenn nötig)

## 🎯 PferdeWert-Spezifische Regeln

### Cookie Consent Pattern
```typescript
// Verwende dieses Pattern für externe JS-Libraries:
const initExternalLibrary = () => {
  if (!window.externalLib?.init) {
    console.error('Library not found');
    return;
  }
  
  window.externalLib.init({
    // Konfiguration
  });
};
```

### Error Handling
```typescript
// Immer mit Try-Catch bei External Libraries:
try {
  window.externalLib?.doSomething();
} catch (error) {
  console.error('External library error:', error);
}
```

## 🚀 Performance Rules

- **Lazy Loading**: Verwende `next/dynamic` für schwere Komponenten
- **Optional Chaining**: Immer `?.` bei externen APIs
- **Type Guards**: Bei unbekannten Datenstrukturen

---

*Letzte Aktualisierung: Juli 2025*
*Bei TypeScript-Problemen: Erst diese Guidelines checken, dann fragen!*