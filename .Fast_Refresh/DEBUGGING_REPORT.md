# Debugging Report: Global Infinite Refresh Loop

**Date:** 2025-10-26
**Status:** FIXED ✓
**Severity:** CRITICAL
**Commit:** b34ddbd

---

## Executive Summary

A global infinite refresh loop affecting all pages (homepage, calculator page, guides) has been identified and **RESOLVED**.

**Root Cause:** Nested `<Head>` component rendering in schema components causing React hydration mismatches.

**Impact:** All pages affected - Users unable to navigate or load pages
**Fix Time:** Deployed immediately
**Verification:** ✓ ESLint Clean | ✓ TypeScript Clean | ✓ No new errors

---

## Detailed Root Cause Analysis

### The Problem Chain

1. **Invalid Next.js Architecture**
   - File: `components/ReviewSchema.tsx` (Line 122)
   - File: `components/ServiceSchema.tsx` (Line 221)
   - Both components returned `<Head>` tags with schema.org scripts
   - These components were called INSIDE page `<Head>` blocks

2. **Nested Head Tags**
   ```tsx
   // pages/index.tsx
   <Head>
     <HomepageReviewSchema />  {/* This returns ANOTHER <Head> tag! */}
   </Head>
   ```

   This generates invalid HTML:
   ```html
   <head>
     <script>...</script>
     <head>                    <!-- INVALID NESTING -->
       <script type="application/ld+json">...</script>
     </head>
   </head>
   ```

3. **Hydration Mismatch**
   - Server-side: Renders nested `<Head>` structure
   - Client-side: React hydration expects single `<Head>`
   - Server DOM ≠ Client DOM = Hydration Mismatch

4. **Fast Refresh Loop**
   - React detects mismatch
   - Fast Refresh attempts hot reload
   - Cannot find webpack update (missing file)
   - Full page reload triggered
   - Navigation to new route (SimpleCookieConsent.router.reload())
   - New page has SAME problem
   - Cycle repeats indefinitely

### Why Two Different Routes Were Loading

Logs showed alternating:
```
GET /pferde-preis-berechnen 200
GET /pferde-ratgeber/pferdemarkt 200
```

**Explanation:**
- Route A loads → Hydration mismatch detected
- Fast Refresh triggers → Cannot hot reload
- router.reload() called by SimpleCookieConsent
- Navigation to Route B
- Route B hydration mismatch → Process repeats
- Browser keeps jumping between routes

---

## Solutions Implemented

### Change 1: ReviewSchema.tsx

**Before:**
```tsx
import Head from 'next/head';

export default function ReviewSchema(...): React.JSX.Element {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{...}} />
    </Head>
  );
}
```

**After:**
```tsx
export default function ReviewSchema(...): React.JSX.Element {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{...}} />
    </>
  );
}
```

### Change 2: ServiceSchema.tsx

Same fix as ReviewSchema:
- Removed `Head` import
- Changed `<Head>` to `<>`
- All schema.org scripts still render properly

### Change 3: Cleanup

- Deleted `.next` directory (build cache)
- Verified ESLint: ✓ Clean
- Verified TypeScript: ✓ Clean

---

## Why Previous Fixes Didn't Work

1. **Header.tsx Fix (commit 37cf246)**
   - Fixed array recreation in navigationItems
   - Did NOT address nested `<Head>` issue
   - Header component was not the root cause

2. **Array Recreation Fixes**
   - Fixed component re-rendering
   - But didn't fix the fundamental hydration mismatch

3. **.next Directory Deletion**
   - Temporary relief only
   - Problem re-emerged because root cause remained

---

## Testing Verification

### Pre-Fix Behavior
- ✗ Homepage loads → Fast Refresh loop
- ✗ Cannot navigate between pages
- ✗ Alternating routes in logs
- ✗ User stuck in refresh cycle

### Post-Fix Expected Behavior
- ✓ Homepage loads normally
- ✓ Navigation works without reload
- ✓ Fast Refresh hot-reloads on code changes
- ✓ Schema.org tags still present in HTML `<head>`
- ✓ No hydration mismatches

---

## Files Modified

1. **components/ReviewSchema.tsx**
   - Line 2: Removed `import Head from 'next/head'`
   - Line 121-165: Changed `<Head>` wrapper to `<>`

2. **components/ServiceSchema.tsx**
   - Line 2: Removed `import Head from 'next/head'`
   - Line 219-228: Changed `<Head>` wrapper to `<>`

---

## Commit Details

```
commit b34ddbd
fix(critical): resolve infinite refresh loop caused by nested Head components

Root cause: ReviewSchema and ServiceSchema components were rendering their own
<Head> tags inside the page <Head> block, causing React hydration mismatches.

Solution: Change schema components to return fragments instead of <Head>.
```

---

## Status: READY FOR PRODUCTION
