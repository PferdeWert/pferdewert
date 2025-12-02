# Frontend Design Skill

## Zielgruppe
PferdeWert richtet sich an Pferdeliebhaber, Reiter und Pferdebesitzer - NICHT an Software-Entwickler oder technische Nutzer.

## Design Anti-Patterns (NIEMALS verwenden)

### 1. Code-Style Darstellungen
**VERBOTEN:**
- `font-mono` für Inhalte (wirkt wie Terminal/Code)
- ASCII-Art Strukturen (`├─`, `└─`, `│`)
- `whitespace-pre-line` für strukturierte Daten
- `bg-gray-50` mit `border-gray-200` für Code-artige Boxen (das "Developer-Grau")
- Jede Kombination die nach Terminal oder IDE aussieht

**STATTDESSEN:**
- Saubere Karten mit `flex justify-between`
- Strukturierte Listen mit echten HTML-Elementen
- Farbcodierte Boxen (amber, blue, green) mit Icons

### 2. Zu bunte/grelle Akzent-Boxen
**VERBOTEN:**
- `bg-gradient-to-r from-brand to-brand-brown` für Infoboxen
- Starke Farbverläufe die vom Inhalt ablenken
- Weiße Schrift auf buntem Hintergrund für Daten

**STATTDESSEN:**
- Dezente Hintergründe: `bg-gray-100`, `bg-amber-50`, `bg-blue-50`
- Dunkle Schrift auf hellem Grund: `text-gray-900`
- Subtile Borders: `border border-gray-200`

## Empfohlene Muster

### Kosten-/Preistabellen
```tsx
<div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
  <h4 className="font-semibold text-amber-900 mb-4">Titel</h4>
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-gray-700">Position</span>
      <span className="font-semibold text-gray-900">1.000 EUR</span>
    </div>
    {/* Summenzeile */}
    <div className="border-t border-amber-300 pt-3 flex justify-between">
      <span className="font-semibold text-amber-900">Summe</span>
      <span className="font-bold text-amber-900">5.000 EUR</span>
    </div>
  </div>
</div>
```

### Zusammenfassungs-Box
```tsx
<div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
  <div className="grid md:grid-cols-2 gap-6">
    <div className="text-center">
      <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Label</p>
      <p className="text-3xl font-bold text-gray-900">Wert</p>
      <p className="text-gray-500 text-sm mt-1">(Zusatzinfo)</p>
    </div>
  </div>
</div>
```

## Farbpalette für Infoboxen

| Zweck | Background | Border | Text Header | Text Content |
|-------|------------|--------|-------------|--------------|
| Einmalige Kosten | `bg-amber-50` | `border-amber-200` | `text-amber-900` | `text-gray-700` |
| Laufende Kosten | `bg-blue-50` | `border-blue-200` | `text-blue-900` | `text-gray-700` |
| Tipps/Positiv | `bg-green-50` | `border-green-200` | `text-green-900` | `text-gray-700` |
| Warnung | `bg-red-50` | `border-red-200` | `text-red-900` | `text-gray-700` |
| Neutral/Summe | `bg-gray-100` | `border-gray-200` | `text-gray-900` | `text-gray-700` |
