# Infinite Refresh Loop - ROOT CAUSE ANALYSIS

## ECHTE ROOT CAUSE IDENTIFIZIERT ✓

### Problem Type: React Hydration Mismatch + Invalid Head Component Nesting

---

## Kritisches Problem #1: Head Components in Head-Block

**Ort:** `/pages/index.tsx` Zeile 253 & `/pages/pferde-preis-berechnen.tsx`

```tsx
<Head>
  {/* ... multiple dangerouslySetInnerHTML scripts ... */}

  {/* PROBLEM: Komponente wird aufgerufen die SELBST <Head> rendert! */}
  <HomepageReviewSchema />  {/* Returns <Head> with <script> tags */}
</Head>
```

**Was ist falsch?**
- `HomepageReviewSchema` → `PferdeWertReviewSchema` → `ReviewSchema`
- `ReviewSchema` (Zeile 122) rendert `<Head>` mit `dangerouslySetInnerHTML`
- `ServiceSchema` (Zeile 221) rendert AUCH `<Head>` mit `dangerouslySetInnerHTML`
- **Nested `<Head>` Tags sind in Next.js NICHT erlaubt!**

---

## Kritisches Problem #2: Multiple Duplicate Head Injections

Wenn eine Seite initial rendert (index.tsx):

1. **Server-Side Rendering (SSR)**:
   - Hauptseite rendert ihre `<Head>` Tags
   - `<HomepageReviewSchema />` wird aufgerufen → rendert ZUSÄTZLICHE `<Head>` Tags
   - Result: Duplizierte `<script type="application/ld+json">` Tags

2. **Hydration im Browser**:
   - Browser erwartet das gleiche DOM wie vom Server
   - React vergleicht Server-HTML mit Client-Initial-Render
   - **SERVER:** 2x `<Head>` (main Head + nested from ReviewSchema)
   - **CLIENT:** ? (variiert je nach Render-Reihenfolge)
   - **MISMATCH!** → Fast Refresh wird getriggert

3. **Fast Refresh Loop**:
   - Fast Refresh detektiert Mismatch → Full Reload
   - Page navigiert zu `/pferde-preis-berechnen`
   - Dieser hat AUCH `<ServiceReviewSchema />` + `<ServicePageSchema />`
   - Beide rendert zusätzliche `<Head>` Tags
   - Fast Refresh detektiert ERNEUT Mismatch
   - Loop beginnt erneut!

---

## Problem #3: State-Dependent Rendering in pferde-preis-berechnen

`pferde-preis-berechnen.tsx` (Zeile 249-254):

```tsx
const [currentStep, setCurrentStep] = useState<number>(1);
const [form, setForm] = useState<FormState>(initialForm);
const [isMounted, setIsMounted] = useState<boolean>(false);

useEffect(() => {
  setIsMounted(true);  // HYDRATION MISMATCH!
}, []);
```

**Das Problem:**
- Initial Render: `isMounted = false`
- Nach Hydration: `isMounted = true`
- Aber der `<Head>` Block wird VOR diesem useEffect evaluation rendert
- Möglicher Hydration Mismatch mit der komplexen Form-Struktur

---

## LOGS ANALYSE - Warum Two Different Pages Loading?

```
GET /pferde-preis-berechnen 200 in 221ms
GET /_next/static/webpack/7ae0e3079c841c95.webpack.hot-update.json 404
⚠ Fast Refresh had to perform a full reload
GET /pferde-ratgeber/pferdemarkt 200 in 229ms
```

**Erklärung:**
1. Seite A lädt: `/pferde-preis-berechnen`
2. Browser hydration mismatch wegen nested `<Head>`
3. Fast Refresh kann nicht hot-update durchführen (Webpack .json missing)
4. Full reload getriggert → Browser requested neue Seite
5. Aber: **SimpleCookieConsent** mit `router.reload()` wird auch aufgerufen (Zeile 281)
6. Router.reload() triggert Seiten-Navigation
7. Eine ANDERE Seite wird geladen: `/pferde-ratgeber/pferdemarkt`
8. Cycle startet erneut

---

## Die Komplette Kette:

```
User loads index.tsx
    ↓
<Head> renders with multiple schemas
    ↓
<HomepageReviewSchema /> is called INSIDE <Head>
    ↓
ReviewSchema returns ANOTHER <Head> tag
    ↓
Browser hydration: Server DOM ≠ Client DOM
    ↓
React detects Hydration Mismatch
    ↓
Next.js Fast Refresh initializes
    ↓
Cannot find webpack hot update (404)
    ↓
Full page reload triggered
    ↓
SimpleCookieConsent.router.reload() potentially called
    ↓
Navigation to different route
    ↓
pferde-preis-berechnen.tsx loads
    ↓
SAME PROBLEM: ServiceReviewSchema + ServicePageSchema in <Head>
    ↓
Hydration mismatch again
    ↓
Loop continues indefinitely
```

---

## WHY HEADER.TX FIX DIDN'T SOLVE THIS

Header.tsx fix (commit 37cf246) fixed:
- Array recreation in navigationItems
- Potential hydration issues in Header component

But it DIDN'T fix:
- **Nested `<Head>` component rendering** (this is the MAIN issue)
- Schema components returning JSX.Element with `<Head>`
- Invalid Next.js structure

---

## THE SOLUTION

### Fix #1: Remove `<Head>` from Schema Components

**ReviewSchema.tsx** should return schema scripts WITHOUT `<Head>`:

```tsx
// BEFORE (WRONG):
return (
  <Head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{...}} />
  </Head>
);

// AFTER (CORRECT):
return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{...}} />
  </>
);
```

**Why this works:**
- Schema scripts can be returned as Fragment
- Next.js `<Head>` in pages will automatically insert them
- No nested `<Head>` tags = No Hydration Mismatch
- Valid React structure

### Fix #2: Ensure Proper Head Component Usage

In pages (index.tsx, pferde-preis-berechnen.tsx):

```tsx
<Head>
  {/* All direct children, including schema components */}
  <title>...</title>
  <meta ... />

  {/* Schema components now return fragments instead of <Head> */}
  <HomepageReviewSchema />
  <HomepageServiceSchema />  {/* Both work as fragments now */}
</Head>
```

### Fix #3: Remove State-Dependent Hydration Issues

The `isMounted` pattern is fine for client-only features, but ensure:
- No conditional rendering of schema metadata based on state
- All Head content is static and available on initial render

---

## VERIFICATION CHECKLIST

- [ ] ReviewSchema.tsx: Remove `<Head>`, return Fragment
- [ ] ServiceSchema.tsx: Remove `<Head>`, return Fragment
- [ ] PferdeWertReviewSchema.tsx: Verify it doesn't add extra `<Head>`
- [ ] PferdeWertServiceSchema.tsx: Verify it doesn't add extra `<Head>`
- [ ] index.tsx: Verify schema components work as fragments
- [ ] pferde-preis-berechnen.tsx: Verify schema components work as fragments
- [ ] Clear .next directory
- [ ] Test navigation between pages without reload loop

---

## EXPECTED BEHAVIOR AFTER FIX

✓ Initial page load: No hydration mismatch
✓ Navigation between pages: Works normally
✓ Fast Refresh: Works correctly on file changes
✓ No infinite loop on homepage OR pferde-preis-berechnen
✓ Schema.org tags still present in HTML (just rendered differently)

---

## ROOT CAUSE SEVERITY

**CRITICAL** - This is a fundamental React/Next.js architecture error that breaks the entire page.

The fix is simple but MUST be applied correctly.
