# PferdeWert.de Frontend Coding Guidelines

## 🎯 Business Requirements

### Critical Platform Standards

These business requirements are non-negotiable and must be followed in all frontend code:

**Timeframe Standard:**
```typescript
// ✅ CORRECT - Always use "2 Minuten"
<p>Professionelle KI-Bewertung in 2 Minuten</p>

// ❌ WRONG - Never use "3 Minuten" or other durations
<p>Bewertung in 3 Minuten</p>
```

**Terminology Standard:**
```typescript
// ✅ CORRECT - Use German "KI"
<h2>KI-gestützte Pferdebewertung</h2>

// ❌ WRONG - Never use "AI"
<h2>AI-gestützte Pferdebewertung</h2>
```

**Service Positioning:**
```typescript
// ✅ CORRECT - Emphasize paid premium service
<p>Professionelle Bewertung für 14,90€</p>
<button>Jetzt für 14,90€ bewerten</button>

// ❌ WRONG - Never suggest free service
<p>Kostenlose Bewertung</p>
<button>Gratis testen</button>
```

### Standard CTA Patterns

**Link Target:**
```typescript
// ✅ CORRECT - Standard evaluation page
<Link href="/pferde-preis-berechnen">
  Jetzt bewerten
</Link>

// ❌ WRONG - Non-standard URLs
<Link href="/bewerten">...</Link>
<Link href="/evaluation">...</Link>
```

**CTA Text:**
```typescript
// ✅ CORRECT - Standard call-to-action
<button>Jetzt Pferdewert berechnen</button>

// ❌ WRONG - Inconsistent wording
<button>Pferd bewerten</button>
<button>Wert ermitteln</button>
```

### Price Display
```typescript
// ✅ CORRECT - German number format
const price = "14,90€";
<span>Nur 14,90€</span>

// ❌ WRONG - English format
const price = "$14.90";
<span>Only 14.90 EUR</span>
```

## 🏗️ Architecture Overview

**Project Structure:**
```
frontend/
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main page wrapper
│   ├── Footer.tsx      # Site footer
│   └── BewertungLayout.tsx # Form wrapper
├── lib/                # Utility functions  
│   ├── log.ts         # Custom logging (REQUIRED)
│   └── mongo.ts       # Database utilities
├── pages/             # Next.js Pages Router
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document head
│   ├── index.tsx      # Landing page
│   ├── bewerten.tsx   # Evaluation form
│   ├── ergebnis.tsx   # Results page
│   └── api/           # API routes
└── styles/            # Global CSS and fonts
```

## 📏 ESLint Configuration

Our `eslint.config.mjs` extends Next.js standards:

```javascript
// ✅ Our actual ESLint config
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "**/*.min.js"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript")
];
```

**Key Rules Enforced:**
- `@typescript-eslint/no-explicit-any` - NO `any` types
- `@typescript-eslint/no-require-imports` - NO `require()`
- `react-hooks/exhaustive-deps` - Proper useEffect dependencies
- `no-unused-vars` - Clean up unused imports/variables

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-500: #3B82F6;        /* Primary actions */
--brand-brown: #5A4B3B;     /* Brand identity */
--yellow-300: #FCD34D;      /* Highlights */

/* Backgrounds */  
--amber-50: #FFFBEB;        /* Light sections */
--warm-white: #FCFAF6;      /* Card backgrounds */
```

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Lato (sans-serif)
- **Weights**: 300, 400, 700, 900

### Design Philosophy

**Text-First Approach:**
PferdeWert.de prioritizes semantic HTML and text content over decorative boxes. Content should be readable and accessible without visual containers.

**Box Usage Limits:**
```typescript
// ✅ CORRECT - Strategic use of 2-4 boxes per article for key information
<article>
  <h1>Was kostet ein Pferd?</h1>

  {/* Semantic text content - no boxes needed */}
  <p className="text-lg">Der Kauf eines Pferdes ist eine bedeutende finanzielle Entscheidung...</p>

  <h2>Anschaffungskosten</h2>
  <p className="text-lg">Die Preise variieren stark je nach Rasse und Ausbildung...</p>

  {/* Strategic box #1 - Key pricing ranges */}
  <div className="bg-warm-white rounded-lg p-6 my-8">
    <h3>Preisübersicht nach Kategorie</h3>
    <ul>
      <li>Freizeitpferd: 2.000€ - 8.000€</li>
      <li>Sportpferd: 10.000€ - 50.000€+</li>
    </ul>
  </div>

  {/* More semantic text */}
  <h2>Laufende Kosten</h2>
  <p className="text-lg">Monatlich müssen Sie mit 300-600€ rechnen...</p>

  {/* Strategic box #2 - Monthly cost breakdown */}
  <div className="bg-amber-50 rounded-lg p-6 my-8">
    <h3>Monatliche Kosten im Überblick</h3>
    {/* cost breakdown */}
  </div>
</article>

// ❌ WRONG - Excessive boxes distract from content
<article>
  {/* Every section in a box - visual overload */}
  <div className="bg-warm-white p-6">
    <h2>Abschnitt 1</h2>
    <p>Text...</p>
  </div>
  <div className="bg-amber-50 p-6">
    <h2>Abschnitt 2</h2>
    <p>Text...</p>
  </div>
  <div className="bg-warm-white p-6">
    <h2>Abschnitt 3</h2>
    <p>Text...</p>
  </div>
  {/* Too many boxes - breaks reading flow */}
</article>
```

**Implementation Rule:**
- Maximum 2-4 highlighted boxes per full Ratgeber article
- Use boxes only for: pricing tables, key statistics, budget breakdowns, or actionable summaries
- Default to semantic HTML: `<p>`, `<h2>`, `<ul>`, `<section>` without background containers
- Let content hierarchy be defined by typography, not visual boxes

### Component Patterns

**Button Styles:**
```typescript
// ✅ Standard CTA Button
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
  Jetzt bewerten
</button>

// ✅ Secondary Button  
<button className="bg-brand-brown hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded">
  Mehr erfahren
</button>
```

## 🚫 Deprecated Components

### Components No Longer in Use

The following components should NOT be used in new development. Existing usage should be migrated during refactoring.

#### Header_alt.tsx → Header.tsx

**Status**: ❌ DEPRECATED - Do not use

**Migration Guide:**
```typescript
// ❌ WRONG - Old alternative header (not imported anywhere)
import HeaderAlt from '@/components/Header_alt';

// ✅ CORRECT - Current unified header component
import Header from '@/components/Header';

// Usage in _app.tsx or Layout components
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
```

**Why Deprecated**: Header_alt.tsx is an unused alternative header implementation. The current Header.tsx component (308 lines) provides comprehensive functionality including:
- Desktop navigation with dropdown menus
- Mobile navigation with progressive disclosure
- Integrated breadcrumb navigation
- Keyboard accessibility (ESC key handling)
- Responsive design patterns
- Proper ARIA labels and semantic HTML

**Migration Steps:**
1. Replace any `Header_alt` imports with `Header` from `@/components/Header`
2. Remove Header_alt.tsx from components directory after verifying no usage
3. Test navigation functionality across desktop and mobile viewports
4. Verify breadcrumb navigation on Ratgeber pages

## 📚 Ratgeber Content Guidelines

### Content Structure & SEO Patterns

Ratgeber articles are educational content pages that follow specific SEO and structural patterns to maximize organic discovery and user engagement.

#### Required File Structure

All Ratgeber pages MUST be registered in the Ratgeber registry system:

```typescript
// frontend/lib/ratgeberRegistry.ts
export const ratgeberPages = [
  {
    slug: 'aku-pferd',
    title: 'AKU Pferd',
    path: '/pferde-ratgeber/aku-pferd',
    metaDescription: '...',
    lastUpdated: '2025-01-10'
  },
  // Add new pages here
];
```

#### SEO Best Practices

**1. Heading Hierarchy:**
- **H1**: One per page, main topic (e.g., "Was kostet ein Pferd?")
- **H2**: Major sections (e.g., "Anschaffungskosten", "Monatliche Kosten")
- **H3**: Subsections within H2 (e.g., "Pferdekauf", "Sattel und Zaumzeug")
- **H4+**: Rare, only for deep nested content

**2. Keyword Optimization:**
- Primary keyword in H1, first paragraph, and naturally throughout content
- LSI keywords in H2 headings
- Internal links to related Ratgeber articles
- External links to authoritative sources (sparingly)

**3. Meta Tags:**
```typescript
<Head>
  <title>Was kostet ein Pferd? | PferdeWert.de</title>
  <meta name="description" content="Kompletter Kostenüberblick: Anschaffung, monatliche Ausgaben & realistische Budget-Szenarien für Pferdebesitzer." />
  <meta property="og:title" content="Was kostet ein Pferd? | PferdeWert.de" />
  <meta property="og:description" content="..." />
  <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd" />
</Head>
```

#### Content Length Standards

- **Minimum**: 1,500 words for basic topics
- **Optimal**: 2,500-3,500 words for comprehensive guides
- **Maximum**: 5,000 words (split into multiple pages if longer)

#### Box Usage in Ratgeber Articles

Follow the text-first design philosophy (see Design Philosophy section above):

```typescript
// ✅ CORRECT - 2-4 strategic boxes for key information
export default function RatgeberArticle() {
  return (
    <>
      <h1>Article Title</h1>
      <p>Introduction text...</p>

      {/* Box 1: Key Statistics */}
      <div className="bg-amber-50 border-l-4 border-brand-brown p-6 my-8">
        <h3>Wichtige Zahlen auf einen Blick</h3>
        <ul>...</ul>
      </div>

      <h2>Section with pure text</h2>
      <p>Multiple paragraphs of educational content...</p>

      {/* Box 2: Warning or Important Note */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
        <h3>⚠️ Wichtiger Hinweis</h3>
        <p>Critical information...</p>
      </div>
    </>
  );
}

// ❌ WRONG - Too many boxes, overwhelming layout
// Multiple consecutive boxes create visual clutter
```

#### Registry System Requirements

**Before Deployment:**

1. **Add page to registry** (`frontend/lib/ratgeberRegistry.ts`):
   - Unique slug
   - Full title
   - Canonical path
   - Meta description (150-160 characters)
   - Last updated date (ISO format)

2. **Update navigation** (if top-level category):
   ```typescript
   // frontend/components/Header.tsx
   const navigationItems = [
     {
       label: "Ratgeber",
       href: "/pferde-ratgeber",
       dropdown: [
         { label: "AKU Pferd", href: "/pferde-ratgeber/aku-pferd" },
         { label: "Pferd kaufen", href: "/pferde-ratgeber/pferd-kaufen" },
         // Add new top-level Ratgeber articles here
       ]
     }
   ];
   ```

3. **Generate sitemap**:
   ```bash
   npm run sitemap
   ```
   This updates `sitemap.xml` and `robots.txt` automatically.

4. **Verify in Pre-Commit Checklist**:
   - ✅ Page registered in ratgeberRegistry.ts
   - ✅ Navigation updated (if needed)
   - ✅ Sitemap regenerated
   - ✅ Meta tags validated
   - ✅ Internal links tested

#### Ratgeber-Specific Components

**Breadcrumbs:**
Automatically generated from Header.tsx based on navigation structure. No manual implementation needed.

**FAQ Sections:**
Use structured data for SEO:
```typescript
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})}
</script>
```

**Table of Contents:**
For articles >2,000 words, include jump links:
```typescript
<nav className="bg-gray-50 p-6 rounded-lg mb-8">
  <h2 className="text-xl font-bold mb-4">Inhaltsverzeichnis</h2>
  <ul className="space-y-2">
    <li><a href="#section-1" className="text-brand-brown hover:underline">Section 1</a></li>
    <li><a href="#section-2" className="text-brand-brown hover:underline">Section 2</a></li>
  </ul>
</nav>
```

## 🔧 TypeScript Standards

### Interface Definitions
```typescript
// ✅ CORRECT - Proper interfaces
interface HorseData {
  name: string;
  age: number;
  breed: string;
  training?: string; // Optional properties with ?
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// ❌ WRONG - Never use any
const data: any = response; // ESLint error!
```

### Async/Await Patterns
```typescript
// ✅ CORRECT - useEffect with async function
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setData(data);
    } catch (err) {
      error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []); // Always include dependency array

// ❌ WRONG - async useEffect directly
useEffect(async () => {
  // This breaks React rules!
}, []);
```

## 📱 Responsive Design

### Mobile-First Approach
```typescript
// ✅ Tailwind responsive classes
<div className="
  px-4 py-6           // Mobile base
  md:px-8 md:py-12    // Tablet
  lg:px-12 lg:py-20   // Desktop
">
  <h1 className="
    text-2xl          // Mobile: 24px
    md:text-3xl       // Tablet: 30px  
    lg:text-5xl       // Desktop: 48px
    font-bold
  ">
    Pferd bewerten
  </h1>
</div>
```

### Touch Optimization
- Minimum tap target: 44px × 44px
- Button padding: `py-3 px-6` minimum
- Form inputs: Large and clearly labeled

## 🔐 Stripe Integration

### Checkout Flow
```typescript
// ✅ Standard checkout handler
const handlePayment = async (formData: HorseData) => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { sessionUrl } = await response.json();
    window.location.href = sessionUrl; // Redirect to Stripe
  } catch (err) {
    error('Checkout failed:', err);
    setError('Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.');
  } finally {
    setIsLoading(false);
  }
};
```

### Session Validation
```typescript
// ✅ Results page protection
useEffect(() => {
  const validateSession = async () => {
    const sessionId = router.query.session_id;

    if (!sessionId) {
      router.push('/pferde-preis-berechnen');
      return;
    }

    try {
      const response = await fetch(`/api/session?session_id=${sessionId}`);
      if (!response.ok) throw new Error('Invalid session');

      const data = await response.json();
      setSessionData(data);
    } catch (err) {
      error('Session validation failed:', err);
      router.push('/pferde-preis-berechnen');
    }
  };

  validateSession();
}, [router.query.session_id]);
```

## 📊 Analytics Integration

### GA4 Event Tracking
```typescript
// ✅ Custom event tracking
import { info } from '@/lib/log';

const trackEvent = (eventName: string, parameters: object = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: Date.now()
    });
    info('GA4 Event tracked:', eventName, parameters);
  }
};

// Usage examples
trackEvent('form_start', { form_name: 'horse_evaluation' });
trackEvent('payment_attempt', { value: 14.90, currency: 'EUR' });  
```

## 🛡️ Error Handling & Logging

### Custom Logger Usage
```typescript
import { log, info, warn, error } from '@/lib/log';

// ✅ CORRECT - Use custom logger
info('Component mounted successfully');
warn('Deprecated API endpoint used');  
error('Payment processing failed:', errorObject);

// ❌ WRONG - Raw console (remove before commit)
console.log('Debug info'); 
```

### API Error Patterns
```typescript
// ✅ API route error handling  
export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    warn(`Invalid method: ${req.method}`);
    return res.status(405).end('Method not allowed');
  }

  try {
    const result = await processRequest(req.body);
    info('Request processed successfully');
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    error('API request failed:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
```

## ♿ Accessibility Standards

### Semantic HTML
```typescript
// ✅ Proper semantic structure
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Was ist dein Pferd wert?</h1>
    <p>Professionelle KI-Bewertung in 2 Minuten</p>
    
    <button 
      type="button"
      aria-describedby="price-info"
      onClick={handleStart}
    >
      Jetzt für 14,90€ bewerten
    </button>
    <p id="price-info">Keine versteckten Kosten</p>
  </section>
</main>
```

### Form Accessibility
```typescript
// ✅ Accessible form fields
<div className="mb-4">
  <label 
    htmlFor="horse-name" 
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Pferdename *
  </label>
  <input
    id="horse-name"
    name="horseName"
    type="text"
    required
    aria-describedby="name-help"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    value={formData.horseName}
    onChange={handleInputChange}
  />
  <p id="name-help" className="mt-1 text-xs text-gray-500">
    Der Name Ihres Pferdes für den Bewertungsbericht
  </p>
</div>
```

## 🚀 Performance Guidelines

### Code Splitting
```typescript
// ✅ Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false
});
```

### Image Optimization
```typescript
// ✅ Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="Pferd auf der Weide"
  width={800}
  height={600}
  priority // Above fold images
  sizes="(max-width: 768px) 100vw, 50vw"
  className="rounded-lg shadow-lg"
/>
```

## 🍪 Cookie Consent Integration

### SimpleCookieConsent Usage
```typescript
// ✅ Already integrated in _app.tsx
import SimpleCookieConsent from '@/components/SimpleCookieConsent';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SimpleCookieConsent />
    </>
  );
}
```

The component handles:
- DSGVO compliance (opt-in)
- GA4 Consent Mode v2
- Mobile-optimized UI
- Custom cookie naming

## 🧪 Testing Patterns

### Component Testing
```typescript
// ✅ React Testing Library patterns
import { render, screen, fireEvent } from '@testing-library/react';
import PriceButton from './PriceButton';

test('shows correct price and handles click', async () => {
  const handleClick = jest.fn();
  
  render(<PriceButton price={14.90} onClick={handleClick} />);
  
  expect(screen.getByText('14,90€')).toBeInTheDocument();
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## ⚠️ Fast Refresh Anti-Patterns

### Problem: useRouter() in useCallback Dependencies

**NEVER include `useRouter()` in useCallback dependency arrays** - this causes infinite Fast Refresh loops.

**Why This Happens:**
- `useRouter()` returns a new object on every render in Next.js
- When included in `useCallback` dependencies, it forces recreation on every render
- This triggers Fast Refresh, which causes another render → infinite loop
- Symptoms: Page reloads continuously, only stops after clearing browser data

**❌ WRONG - Causes Infinite Loop:**
```typescript
import { useRouter } from 'next/router';

const Component = () => {
  const router = useRouter();

  const someCallback = useCallback(() => {
    // ... some logic
    router.reload(); // Using router in callback
  }, [router]); // ❌ PROBLEM: router in dependencies

  return <button onClick={someCallback}>Click</button>;
};
```

**✅ CORRECT - Use window.location instead:**
```typescript
// No useRouter import needed

const Component = () => {
  const someCallback = useCallback(() => {
    // ... some logic
    window.location.reload(); // Use native browser API
  }, []); // ✅ No unstable dependencies

  return <button onClick={someCallback}>Click</button>;
};
```

**When to Use Each:**
- **`window.location.reload()`**: Full page reset (cookie changes, auth state changes)
- **`router.reload()`**: Soft refresh for data updates (needs router in scope, avoid in callbacks)

**Related Issues Fixed:**
- `SimpleCookieConsent.tsx:281` - Removed router dependency causing daily reload loops

---

## 🔄 Common Patterns

### Loading States
```typescript
// ✅ Standard loading pattern
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

return (
  <button 
    disabled={isLoading}
    className={`
      px-6 py-3 rounded-lg font-semibold transition-all
      ${isLoading 
        ? 'bg-gray-300 cursor-not-allowed' 
        : 'bg-blue-500 hover:bg-blue-600 text-white'
      }
    `}
    onClick={handleSubmit}
  >
    {isLoading ? (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" /* spinner */ />
        Wird verarbeitet...
      </>
    ) : (
      'Bewertung starten'
    )}
  </button>
);
```

### Error Boundaries
```typescript
// ✅ Error boundary for robust UX
class ErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidDidCatch(error: Error, errorInfo: ErrorInfo) {
    error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Etwas ist schiefgelaufen
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## ✅ Pre-Commit Checklist

Before committing code, ensure:

- [ ] `npm run lint` passes without errors
- [ ] `npm run type-check` validates TypeScript
- [ ] No `console.log` statements (use custom logger)
- [ ] All imports are used and properly typed
- [ ] Mobile responsiveness tested
- [ ] Accessibility attributes included
- [ ] Error handling implemented
- [ ] Loading states provided
- [ ] Analytics events tracked where appropriate

**Remember**: PferdeWert.de is a professional platform serving the German equestrian market. Code quality, performance, and user experience are paramount for conversion optimization.

---

## 📚 Related Documentation

- [`TYPESCRIPT_GUIDELINES.md`](./TYPESCRIPT_GUIDELINES.md) - TypeScript-specific rules and patterns
- [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md) - UI/UX design standards and tokens
- [`CLAUDE.md`](./CLAUDE.md) - Project setup and development environment
- [`Coding-Guidelines.md`](./Coding-Guidelines.md) - General coding best practices