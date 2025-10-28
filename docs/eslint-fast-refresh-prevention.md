# ESLint Rules zur Fast Refresh Loop Prävention

## Problem
Inline JSX-Objekte in Component Props verursachen infinite Fast Refresh Loops, weil bei jedem Render neue Objektreferenzen erstellt werden.

## Empfohlene ESLint Regeln

### 1. React Compiler (Empfohlen für Next.js 15+)

Der React Compiler kann diese Probleme automatisch erkennen und optimieren:

```bash
npm install --save-dev babel-plugin-react-compiler eslint-plugin-react-compiler
```

**`.eslintrc.json` Erweiterung:**
```json
{
  "plugins": ["react-compiler"],
  "rules": {
    "react-compiler/react-compiler": "error"
  }
}
```

### 2. Custom ESLint Rule (Pragmatisch)

Da es keine out-of-the-box ESLint-Regel für dieses spezifische Problem gibt, können wir eine Custom Rule definieren:

**`eslint-rules/no-inline-jsx-props.js`:**
```javascript
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline JSX elements in component props',
      category: 'Possible Errors',
      recommended: true
    },
    messages: {
      noInlineJsx: 'Avoid inline JSX in props. Extract to module-level constant to prevent Fast Refresh loops.'
    }
  },
  create(context) {
    return {
      JSXElement(node) {
        // Check if JSX is inside an object property that looks like a prop
        const parent = node.parent;
        if (parent?.type === 'Property' &&
            parent.parent?.parent?.type === 'JSXExpressionContainer') {
          context.report({
            node,
            messageId: 'noInlineJsx'
          });
        }
      }
    };
  }
};
```

**`.eslintrc.json` mit Custom Rule:**
```json
{
  "plugins": ["local-rules"],
  "rules": {
    "local-rules/no-inline-jsx-props": "warn"
  }
}
```

### 3. Existierende React Rules (Bereits aktiv)

Unsere aktuellen ESLint-Regeln helfen bereits:

```json
{
  "rules": {
    "react/jsx-no-bind": ["warn", {
      "ignoreRefs": true,
      "allowArrowFunctions": false,
      "allowFunctions": false,
      "allowBind": false
    }]
  }
}
```

**Problem:** Diese Regel warnt vor inline Functions, aber NICHT vor inline JSX-Objekten.

## Praktische Lösung: Code Review + Type Guards

Da Custom ESLint Rules komplex sind, empfehlen wir eine Kombination aus:

### A) TypeScript Utility Types für Props mit Icons

**`types/component-props.d.ts`:**
```typescript
// Force icon props to be ReactElement (not inline JSX)
export type StableIconProp = ReactElement<SVGElement>;

export interface CTAProps {
  href?: string;
  label: string;
  icon?: StableIconProp; // Type forces extraction
  onClick?: () => void;
}
```

**Vorteil:** TypeScript zwingt Developer, Icons zu extrahieren, weil inline JSX nicht direkt assignable ist.

### B) Component Prop Validation (Runtime)

**`components/RatgeberHero.tsx`:**
```typescript
const RatgeberHero = ({ primaryCta, secondaryCta }: RatgeberHeroProps) => {
  if (process.env.NODE_ENV === 'development') {
    // Warn if icon looks like it might be recreated
    if (primaryCta?.icon && !Object.isFrozen(primaryCta.icon)) {
      console.warn('⚠️  RatgeberHero: primaryCta.icon should be defined at module level to prevent Fast Refresh loops');
    }
  }

  return (/* ... */);
};
```

### C) Code Review Checklist (Siehe separate Datei)

Die effektivste Lösung ist eine klare Code Review Checklist.

## Implementierungsplan

### Kurzfristig (JETZT):
1. ✅ Frontend Guidelines erweitert
2. ⏳ Code Review Checklist erstellen
3. ⏳ README.md mit Checklist-Link erweitern

### Mittelfristig (Nächste Woche):
1. React Compiler ESLint Plugin testen
2. Custom ESLint Rule für häufige Patterns implementieren

### Langfristig (Nächster Sprint):
1. Alle Hero Components mit Type Guards absichern
2. Runtime Warnings in Development-Mode einbauen

## Warum keine perfekte ESLint-Lösung?

JSX-Props sind **valides React**. Das Problem entsteht nur durch:
- React's Reference Equality Check
- Next.js Fast Refresh System
- Component Re-render Zyklen

ESLint kann nicht zwischen "stabilen" und "instabilen" Objektreferenzen unterscheiden. Das ist ein **Runtime-Konzept**, kein Syntax-Problem.

**Lösung:** Kombination aus:
- Developer Education (Guidelines)
- Code Review (Checklist)
- TypeScript Guards (Type-Level Prevention)
- Runtime Warnings (Dev-Mode nur)

## Siehe auch
- `/docs/frontend-guidelines.md` - Fast Refresh Anti-Patterns Dokumentation
- `/docs/code-review-checklist.md` - Praktische Review-Punkte
