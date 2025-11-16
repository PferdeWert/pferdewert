# Performance Optimization Dev Checklist

**Start Date:** ___________
**Completed Date:** ___________
**Developer Name:** ___________
**Estimated Effort:** 9-11 hours

---

## PHASE 1: QUICK WINS (4-5 Hours)

### Task 1.1: React PDF Dynamic Import (30 minutes)

**Objective:** Remove @react-pdf from being bundled on every page

- [ ] **Step 1:** Find all @react-pdf imports
  ```bash
  grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/pages
  grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/components
  grep -r "@react-pdf" /Users/benjaminreder/Developer/pferdewert/frontend/lib
  ```
  Files found:
  - _______________
  - _______________
  - _______________

- [ ] **Step 2:** For each import location, verify it's only used on `/ergebnis`
  - [ ] Check if import is in _app.tsx (if yes, MUST move)
  - [ ] Check if import is in layout.tsx (if yes, MUST move)
  - [ ] Check if conditional use possible

- [ ] **Step 3:** Replace with dynamic import
  ```typescript
  import dynamic from 'next/dynamic';

  const PDFDocument = dynamic(
    () => import('@react-pdf/renderer').then(m => m.Document),
    { loading: () => <PDFLoadingSpinner />, ssr: false }
  );
  ```

  Changes made:
  - [ ] File: __________________ (Date: ______)
  - [ ] File: __________________ (Date: ______)
  - [ ] File: __________________ (Date: ______)

- [ ] **Step 4:** Create PDFLoadingSpinner component
  - [ ] File created: `/components/PDFLoadingSpinner.tsx`
  - [ ] Tested visually

- [ ] **Step 5:** Test dynamic import works
  - [ ] Run `npm run build` - no errors?
  - [ ] Run `npm run start` locally
  - [ ] Navigate to `/ergebnis` - PDF loads?
  - [ ] Check network tab - PDF library loads only on demand?

- [ ] **Step 6:** Verify bundle reduction
  ```bash
  ls -lhS .next/static/chunks/*.js
  # vendors-*.js should be smaller!
  ```
  Bundle size before: _______ KB
  Bundle size after: _______ KB
  Reduction: _______ KB

**Sign-off:** __________ Date: __________

---

### Task 1.2: MongoDB Audit & Frontend Removal (1.5 hours)

**Objective:** Ensure MongoDB is ONLY in backend, not frontend

- [ ] **Step 1:** Audit all MongoDB imports
  ```bash
  grep -r "from 'mongodb'" /Users/benjaminreder/Developer/pferdewert/frontend
  grep -r 'from "mongodb"' /Users/benjaminreder/Developer/pferdewert/frontend
  grep -r "mongodb" /Users/benjaminreder/Developer/pferdewert/frontend/package.json
  ```

  MongoDB imports found in:
  - _______________
  - _______________
  - _______________
  - None found (Safe!)

- [ ] **Step 2:** For each MongoDB import location:

  **Location 1:** _______________
  - [ ] Is this a `/pages/api/` file? (YES = OK, NO = FIX)
  - [ ] Is this a server-side only file? (YES = OK, NO = FIX)
  - [ ] Move to API route if in component/lib

  **Location 2:** _______________
  - [ ] Is this a `/pages/api/` file? (YES = OK, NO = FIX)
  - [ ] Is this a server-side only file? (YES = OK, NO = FIX)
  - [ ] Move to API route if in component/lib

  **Location 3:** _______________
  - [ ] Is this a `/pages/api/` file? (YES = OK, NO = FIX)
  - [ ] Is this a server-side only file? (YES = OK, NO = FIX)
  - [ ] Move to API route if in component/lib

- [ ] **Step 3:** Create API route for each MongoDB operation
  ```typescript
  // pages/api/db/[operation].ts
  import { MongoClient } from 'mongodb';

  export default async function handler(req, res) {
    // Only in API!
  }
  ```

  API routes created:
  - [ ] `/api/db/save-evaluation`
  - [ ] `/api/db/get-evaluation`
  - [ ] (other routes as needed)

- [ ] **Step 4:** Update components to use fetch() instead
  ```typescript
  // Before (REMOVE):
  import { connectDB } from '@/lib/mongo';
  const db = await connectDB();

  // After (ADD):
  const response = await fetch('/api/db/get-evaluation', {...});
  ```

  Components updated:
  - _______________
  - _______________
  - _______________

- [ ] **Step 5:** Test database operations still work
  - [ ] npm run build - no errors?
  - [ ] npm run start locally
  - [ ] Test evaluation save flow
  - [ ] Test evaluation retrieval
  - [ ] Check console for errors

- [ ] **Step 6:** Verify bundle doesn't contain MongoDB
  ```bash
  npm run build
  ls -lh .next/static/chunks/vendors-*.js
  # Should be ~500KB smaller!
  ```
  Bundle size before: _______ KB
  Bundle size after: _______ KB
  Reduction: _______ KB

**Sign-off:** __________ Date: __________

---

### Task 1.3: Analyze Unused JavaScript (30 minutes)

**Objective:** Identify all unused code with Bundle Analyzer

- [ ] **Step 1:** Run bundle analyzer
  ```bash
  cd /Users/benjaminreder/Developer/pferdewert/frontend
  ANALYZE=true npm run build
  ```

- [ ] **Step 2:** Open generated report
  - [ ] File: `.next/analyze/__bundle_analysis.html`
  - [ ] Document findings below

  Libraries > 100 KB found:
  - __________________ (Size: ______ KB)
  - __________________ (Size: ______ KB)
  - __________________ (Size: ______ KB)

- [ ] **Step 3:** For each large library, assess if dynamic import needed

  Library: __________________
  - [ ] Used on every page? (YES = keep, NO = dynamic import)
  - [ ] Import location: __________________
  - [ ] Change to dynamic? (YES / NO)

  Library: __________________
  - [ ] Used on every page? (YES = keep, NO = dynamic import)
  - [ ] Import location: __________________
  - [ ] Change to dynamic? (YES / NO)

- [ ] **Step 4:** Document findings
  Report location: `/Users/benjaminreder/Developer/pferdewert/BUNDLE_ANALYSIS_RESULTS.md`

**Sign-off:** __________ Date: __________

---

### Task 1.4: Testing & Verification (1 hour)

**Objective:** Ensure no regressions from changes

- [ ] **Step 1:** Run build
  ```bash
  npm run build
  # Check for errors
  ```
  - [ ] Build succeeds without errors
  - [ ] Build warnings noted: _______________

- [ ] **Step 2:** Run type checking
  ```bash
  npm run type-check
  ```
  - [ ] All TypeScript OK
  - [ ] No type errors

- [ ] **Step 3:** Run linting
  ```bash
  npm run lint
  ```
  - [ ] All linting passes
  - [ ] No ESLint warnings

- [ ] **Step 4:** Manual testing
  ```bash
  npm run start
  # http://localhost:3000
  ```

  Test each route:
  - [ ] Homepage loads
  - [ ] Evaluation form works
  - [ ] Results page (PDF generation)
  - [ ] Ratgeber articles load
  - [ ] Checkout flow works

  Issues found:
  - _______________
  - _______________
  - (none = great!)

- [ ] **Step 5:** Lighthouse test
  ```bash
  # Using Chrome DevTools Lighthouse
  # Test: https://localhost:3000
  ```

  Baseline metrics:
  - [ ] FCP: _______ ms
  - [ ] LCP: _______ ms
  - [ ] CLS: _______
  - [ ] Performance Score: _______ /100

- [ ] **Step 6:** Compare metrics
  Original LCP: 5600ms
  New LCP: _______ ms
  Improvement: _______ ms (-_______%)

  Target achieved? (LCP should be < 3200ms)

**Sign-off:** __________ Date: __________

---

## PHASE 2: CODE SPLITTING (2-3 Hours)

### Task 2.1: Webpack Configuration Optimization (1 hour)

**Objective:** Improve chunk splitting for better parallel loading

- [ ] **Step 1:** Review current configuration
  File: `/Users/benjaminreder/Developer/pferdewert/frontend/next.config.js`

  Current cacheGroups:
  - [ ] reactPdf (async) - present
  - [ ] vendor - present
  - [ ] common - present

- [ ] **Step 2:** Add more granular chunks
  ```javascript
  // Add to splitChunks.cacheGroups:
  reactCore: { // React + React-DOM only
    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    name: 'react-core',
    priority: 30,
    enforce: true,
  },
  stripe: { // Stripe lib separate
    test: /[\\/]node_modules[\\/]@stripe[\\/]/,
    name: 'stripe-lib',
    priority: 25,
    enforce: true,
  },
  ```

  - [ ] Changes made to next.config.js
  - [ ] Syntax verified (no errors)

- [ ] **Step 3:** Test configuration
  ```bash
  npm run build
  ls -lhS .next/static/chunks/*.js
  # Check if new chunks created
  ```

  New chunks observed:
  - [ ] react-core-*.js
  - [ ] stripe-lib-*.js
  - [ ] Other: _______________

- [ ] **Step 4:** Verify bundle is smaller
  Total size reduction: _______ KB

**Sign-off:** __________ Date: __________

---

### Task 2.2: Dynamic Imports for Heavy Components (1-2 hours)

**Objective:** Load components only when needed

- [ ] **Step 1:** Identify heavy components
  From bundle analysis:

  Component 1: _______________
  - [ ] Only used on which page(s)? _______________
  - [ ] Current size: _______ KB
  - [ ] Make dynamic? YES / NO

  Component 2: _______________
  - [ ] Only used on which page(s)? _______________
  - [ ] Current size: _______ KB
  - [ ] Make dynamic? YES / NO

  Component 3: _______________
  - [ ] Only used on which page(s)? _______________
  - [ ] Current size: _______ KB
  - [ ] Make dynamic? YES / NO

- [ ] **Step 2:** For each component, create dynamic import
  ```typescript
  import dynamic from 'next/dynamic';

  const HeavyComponent = dynamic(
    () => import('@/components/Heavy'),
    {
      loading: () => <Spinner />,
      ssr: false // if client-only
    }
  );
  ```

  - [ ] Component: ______________ (Date: ______)
  - [ ] Component: ______________ (Date: ______)
  - [ ] Component: ______________ (Date: ______)

- [ ] **Step 3:** Test each page with dynamic components
  - [ ] Page loads correctly
  - [ ] Component loads on demand
  - [ ] Spinner/loading state visible
  - [ ] No console errors

  Pages tested:
  - [ ] _______________
  - [ ] _______________
  - [ ] _______________

- [ ] **Step 4:** Verify performance improvement
  ```bash
  npm run build
  ls -lhS .next/static/chunks/*.js
  ```

  Bundle size reduction: _______ KB

**Sign-off:** __________ Date: __________

---

## PHASE 3: ADVANCED OPTIMIZATIONS (3-4 Hours)

### Task 3.1: Critical CSS Inlining (1 hour)

**Objective:** Inline critical CSS to speed up FCP

- [ ] **Step 1:** Identify critical CSS
  - [ ] Review: https://web.dev/extract-critical-css/
  - [ ] Critical CSS for homepage identified

- [ ] **Step 2:** Extract critical CSS
  ```bash
  # Using CriticalCSS or similar
  # OR manually identify:
  # - Header styles
  # - Hero section
  # - Navigation
  ```

  Critical CSS file created: `______________`

- [ ] **Step 3:** Inline in _document.tsx
  ```typescript
  // pages/_document.tsx
  <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
  ```

  - [ ] Changes made to _document.tsx
  - [ ] Syntax verified

- [ ] **Step 4:** Test FCP improvement
  ```bash
  npm run build && npm run start
  # Lighthouse test
  ```

  FCP before: _______ ms
  FCP after: _______ ms
  Improvement: _______ ms

**Sign-off:** __________ Date: __________

---

### Task 3.2: Script Loading Strategy (1 hour)

**Objective:** Optimize when scripts load

- [ ] **Step 1:** Identify non-critical scripts
  - [ ] Analytics? (lazyOnload)
  - [ ] Tracking? (lazyOnload)
  - [ ] Ads? (lazyOnload)
  - [ ] Core functionality? (beforeInteractive)

  Scripts to optimize:
  - _______________
  - _______________
  - _______________

- [ ] **Step 2:** Update script loading strategy
  ```typescript
  // pages/_app.tsx
  <Script
    src="..."
    strategy="lazyOnload"  // Not critical
  />
  ```

  - [ ] Script: ______________ → strategy: ______________
  - [ ] Script: ______________ → strategy: ______________
  - [ ] Script: ______________ → strategy: ______________

- [ ] **Step 3:** Test functionality
  - [ ] All scripts load when expected
  - [ ] No console errors
  - [ ] Analytics working
  - [ ] No core functionality broken

**Sign-off:** __________ Date: __________

---

### Task 3.3: Resource Preloading (30 minutes)

**Objective:** Preload critical resources

- [ ] **Step 1:** Identify preloadable resources
  - [ ] Main chunks
  - [ ] Vendor chunks
  - [ ] Critical fonts
  - [ ] Hero images

  Resources to preload:
  - _______________
  - _______________
  - _______________

- [ ] **Step 2:** Add preload links
  ```typescript
  // pages/_document.tsx or _app.tsx
  <link rel="preload" as="script" href="/_next/static/chunks/main.js" />
  <link rel="preload" as="font" href="/fonts/font.woff2" />
  ```

  - [ ] Links added to _document.tsx
  - [ ] Verified syntax

- [ ] **Step 3:** Test resource timing
  Chrome DevTools → Network:
  - [ ] Preloaded resources show "preload" indicator
  - [ ] Resources load earlier than without preload

**Sign-off:** __________ Date: __________

---

### Task 3.4: Performance Monitoring Setup (30 minutes)

**Objective:** Set up tracking for future regressions

- [ ] **Step 1:** Create performance test script
  ```bash
  scripts/performance-test.sh
  ```

  - [ ] Script created
  - [ ] Can run: `./scripts/performance-test.sh`
  - [ ] Output shows metrics

- [ ] **Step 2:** Set bundle size limits
  ```javascript
  // .eslintrc or custom check
  // Warn if chunks exceed limits
  ```

  Limits defined:
  - [ ] Vendor chunk: < 800 KB
  - [ ] Page chunks: < 200 KB each
  - [ ] Total: < 2 MB

- [ ] **Step 3:** Add to CI/CD pipeline (if available)
  - [ ] Performance test runs on PR
  - [ ] Fails if Performance Score < 80
  - [ ] Warns if bundles exceed limits

**Sign-off:** __________ Date: __________

---

## FINAL VERIFICATION

### Overall Checklist

- [ ] All Phase 1 tasks complete
- [ ] All Phase 2 tasks complete
- [ ] All Phase 3 tasks complete (or marked as optional)

### Quality Assurance

- [ ] npm run build succeeds
- [ ] npm run type-check passes
- [ ] npm run lint passes
- [ ] All pages tested manually
- [ ] No console errors on any page
- [ ] Mobile responsive tested
- [ ] Forms/interactions tested

### Performance Goals

- [ ] LCP improvement measured
- [ ] Bundle size reduction verified
- [ ] Performance score improvement confirmed
- [ ] No regressions detected

### Final Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | 5.6s | _______ | _______ |
| FCP | 2.1s | _______ | _______ |
| Bundle | 2.8M | _______ | _______ |
| Score | 75 | _______ | _______ |

### Approval

Developer: _______________ Date: __________

Code Review: _______________ Date: __________

Approved for Production: _______________ Date: __________

---

## NOTES & OBSERVATIONS

Use this space to note any issues, learnings, or recommendations:

```
____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________

____________________________________________________________________________
```

---

**Implementation Start Date:** _______________
**Implementation End Date:** _______________
**Total Hours Spent:** _______________
**Estimate Accuracy:** _____ % (Actual vs Estimated)

