# Code Review Checklist für PferdeWert Frontend

## 🚨 KRITISCH: Fast Refresh Loop Prevention

### Vor jedem PR-Merge prüfen:

#### ✅ JSX in Props
- [ ] **Keine inline JSX-Objekte in Component Props**
  ```typescript
  // ❌ REJECT PR
  <RatgeberHero primaryCta={{ icon: <ArrowRight /> }} />

  // ✅ APPROVE
  const icon = <ArrowRight />;
  <RatgeberHero primaryCta={{ icon }} />
  ```

#### ✅ Component-spezifische Checks

**RatgeberHero:**
- [ ] `primaryCta.icon` ist auf Modul-Level definiert?
- [ ] `secondaryCta.icon` ist auf Modul-Level definiert?
- [ ] `onClick` Handler sind mit `useCallback()` wrapped?

**RatgeberMeta / BreadcrumbList:**
- [ ] `items` Array ist außerhalb Component definiert?
- [ ] Falls dynamisch: `useMemo()` verwendet?

**Custom Buttons / Links:**
- [ ] `icon` Props sind stabile Referenzen?
- [ ] `children` mit JSX sind auf Modul-Level?

**Navigation / TabBar:**
- [ ] `tabs` / `items` Arrays sind außerhalb Component?
- [ ] Icons in Navigation sind auf Modul-Level?

#### ✅ Häufige Problemmuster

```typescript
// ❌ PROBLEM 1: Inline Array mit JSX
const tabs = [
  { label: 'Home', icon: <Home /> }, // ❌ Neu bei jedem Render
];

// ✅ LÖSUNG 1: Modul-Level Array
const TABS = [
  { label: 'Home', icon: <Home /> }, // ✅ Nur einmal erstellt
];

// ❌ PROBLEM 2: JSX in useEffect/useCallback Dependencies
useEffect(() => {
  setIcon(<ArrowRight />); // ❌ Instabil
}, [<ArrowRight />]); // ❌ Dependency ist immer neu

// ✅ LÖSUNG 2: String/Boolean Dependencies
const ICON = <ArrowRight />;
useEffect(() => {
  setIcon(ICON); // ✅ Stabile Referenz
}, []); // ✅ Keine JSX-Dependencies

// ❌ PROBLEM 3: Conditional Rendering mit neuen Objekten
{showIcon && <Button icon={<Check />} />} // ❌ Neu bei jedem Toggle

// ✅ LÖSUNG 3: Modul-Level Konstanten
const CHECK_ICON = <Check />;
{showIcon && <Button icon={CHECK_ICON} />}
```

---

## 📝 Allgemeine Code Quality Checks

### TypeScript
- [ ] Keine `any` Types (ESLint-Regel aktiv)
- [ ] Alle Interfaces exportiert und dokumentiert
- [ ] `npm run type-check` läuft ohne Fehler

### ESLint
- [ ] `npm run lint` zeigt keine Errors
- [ ] Warnings sind gerechtfertigt und dokumentiert
- [ ] Keine `// eslint-disable` ohne Kommentar

### React Best Practices
- [ ] Keine `async` Funktionen direkt in `useEffect()`
  ```typescript
  // ❌ WRONG
  useEffect(async () => { await fetch() })

  // ✅ CORRECT
  useEffect(() => {
    const load = async () => { await fetch() }
    load()
  })
  ```
- [ ] Dependencies in `useEffect` / `useCallback` vollständig
- [ ] Keine `console.log()` - nur `import { info } from '@/lib/log'`

### Next.js Pages Router
- [ ] `getStaticProps` / `getServerSideProps` korrekt typisiert
- [ ] Meta Tags vollständig (Title, Description, OG Tags)
- [ ] Canonical URLs korrekt gesetzt

### Styling & Responsiveness
- [ ] Mobile-First: `sm:`, `md:`, `lg:` Breakpoints verwendet
- [ ] Keine hardcoded Farben - nur Tailwind-Tokens
- [ ] `hover:` und `focus:` States definiert

---

## 🔍 Ratgeber-spezifische Checks

### SEO & Content
- [ ] Kein "kostenlos" / "free" in Content (PAID Service!)
- [ ] "KI" statt "AI" verwendet
- [ ] Dauer ist "2 Minuten" (NICHT "3 Minuten")
- [ ] Meta Description < 160 Zeichen
- [ ] H1 nur einmal pro Page

### Strukturdaten (Schema.org)
- [ ] FAQ Schema korrekt implementiert (`FAQPage`)
- [ ] Article Schema mit author/datePublished
- [ ] BreadcrumbList mit korrekten Positionen

### Performance
- [ ] Bilder mit `next/image` optimiert
- [ ] Lazy Loading für below-the-fold Content
- [ ] Keine unnötigen API-Calls in `getStaticProps`

---

## 🧪 Testing Checklist

### Manuelles Testing
- [ ] Page lädt ohne Errors in Browser Console
- [ ] Keine Fast Refresh Loop im Dev-Mode
- [ ] Mobile Ansicht funktioniert (Chrome DevTools)
- [ ] Alle Links funktionieren
- [ ] CTAs führen zu korrekten Zielen

### Automatisierte Checks
```bash
# Diese Commands MÜSSEN vor Merge erfolgreich sein:
npm run lint
npm run type-check
npm run build  # Production Build erfolgreich?
```

### Dev Server Stabilität
- [ ] `npm run dev` startet ohne Errors
- [ ] Keine `⚠ Fast Refresh had to perform a full reload` Warnings
- [ ] Hot Reload funktioniert bei Code-Änderungen

---

## ✅ PR Approval Kriterien

Ein PR darf nur gemerged werden, wenn:

1. ✅ Alle kritischen Fast Refresh Checks bestanden
2. ✅ `npm run lint && npm run type-check` erfolgreich
3. ✅ Manuelle Browser-Tests ohne Console Errors
4. ✅ Keine Business-Regel verletzt (kostenlos, Dauer, KI vs AI)
5. ✅ Code folgt Frontend Guidelines (`/docs/frontend-guidelines.md`)

---

## 📚 Referenzen

- **Fast Refresh Anti-Patterns:** `/docs/frontend-guidelines.md` (Zeilen 729-813)
- **ESLint Prevention:** `/docs/eslint-fast-refresh-prevention.md`
- **Frontend Guidelines:** `/docs/frontend-guidelines.md`
- **TypeScript Guidelines:** `/docs/typescript-guidelines.md`
- **Design Guidelines:** `/docs/design-guidelines.md`

---

## 🚀 Quick-Check für Reviewer

**30-Sekunden-Check vor Approval:**

```bash
# 1. Terminal Check
npm run lint && npm run type-check

# 2. Visual Scan
# - Suche nach "inline JSX" in Component Props
# - Grep nach console.log
grep -r "console.log" pages/ components/ --exclude-dir=node_modules

# 3. Dev Server Test
npm run dev
# Öffne veränderte Pages → Keine Fast Refresh Warnings?
```

**Bei Unsicherheit:** Frag nach oder teste lokal!

---

## 📌 Cheat Sheet

| Pattern | Status | Grund |
|---------|--------|-------|
| `<Button icon={<Icon />} />` | ❌ | Inline JSX in Props |
| `const icon = <Icon />; <Button icon={icon} />` | ✅ | Modul-Level Konstante |
| `useEffect(async () => {})` | ❌ | Async direkt in useEffect |
| `console.log()` | ❌ | Nutze `import { info } from '@/lib/log'` |
| `any` Type | ❌ | ESLint-Regel aktiv |
| `require()` | ❌ | ES6 Imports only |
| "kostenlos" | ❌ | Service ist PAID! |
| "3 Minuten" | ❌ | Dauer ist "2 Minuten" |
| "AI" | ❌ | Nutze "KI" in deutschem Content |

