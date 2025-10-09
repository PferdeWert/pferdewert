# PferdeWert.de Frontend Coding Guidelines

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