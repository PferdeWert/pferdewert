# Google Analytics 4 Integration

## Overview

Google Analytics 4 (GA4) provides comprehensive web analytics for PferdeWert.de, tracking user behavior, conversion metrics, and business performance indicators across the horse valuation platform.

## Configuration

### Environment Variables
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=<ga4_measurement_id>
```

### Package Dependencies
Google Analytics is integrated using the gtag.js library loaded via CDN:

```javascript
// Via Google Tag Manager or direct gtag implementation
gtag('config', 'GA_MEASUREMENT_ID');
```

## Implementation

### Next.js Integration

GA4 is typically integrated in Next.js applications through the `_document.js` or `_app.js` files:

```typescript
// pages/_document.js or _app.js
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </Head>
    </Html>
  );
}
```

### Event Tracking Setup

```typescript
// utils/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

## Key Metrics Tracked

### Core Business Events

1. **Valuation Requests**: When users submit horse data for analysis
2. **Payment Events**: Premium valuation purchases via Stripe
3. **Report Downloads**: PDF valuation report downloads
4. **Form Completions**: Horse information form submissions
5. **User Engagement**: Time on site, page views, bounce rate

### Custom Events Implementation

```typescript
// Track valuation request
const trackValuationRequest = (horseBreed: string, premium: boolean) => {
  event({
    action: 'valuation_request',
    category: 'engagement',
    label: horseBreed,
    value: premium ? 1 : 0
  });
};

// Track payment completion
const trackPayment = (amount: number, currency: string) => {
  event({
    action: 'purchase',
    category: 'ecommerce',
    label: 'premium_valuation',
    value: amount
  });
};

// Track report download
const trackReportDownload = (reportType: string) => {
  event({
    action: 'download',
    category: 'engagement', 
    label: reportType
  });
};
```

## Enhanced Ecommerce Tracking

### Purchase Events
```typescript
// Track Stripe payment success
const trackPurchase = (transactionId: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'EUR',
      items: [{
        item_id: 'premium_valuation',
        item_name: 'Premium Horse Valuation',
        category: 'digital_service',
        quantity: 1,
        price: value
      }]
    });
  }
};
```

### Conversion Tracking
- **Goal Completions**: Successful valuation requests
- **Revenue Tracking**: Premium service purchases
- **Funnel Analysis**: User journey from landing to purchase
- **Attribution**: Traffic source effectiveness

## User Experience Tracking

### Page Performance
```typescript
// Track Core Web Vitals
const trackWebVitals = (metric: any) => {
  event({
    action: metric.name,
    category: 'web_vitals',
    label: metric.id,
    value: Math.round(metric.value)
  });
};
```

### User Interactions
- Form field interactions and abandonment
- Navigation patterns and user flows  
- Feature usage and adoption rates
- Error occurrences and user friction points

## Privacy and Compliance

### GDPR Compliance
```typescript
// Cookie consent integration
const initializeAnalytics = (consentGiven: boolean) => {
  if (consentGiven && typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Strict;Secure'
    });
  }
};
```

### Data Protection
- IP address anonymization enabled
- Cookie consent management
- Data retention policies configured
- User opt-out capabilities

## Reporting and Insights

### Key Performance Indicators
- **User Acquisition**: Traffic sources and channels
- **User Behavior**: Session duration, pages per session
- **Conversions**: Valuation requests and premium purchases
- **Revenue**: Monthly recurring revenue from premium services

### Custom Dimensions
- User type (free vs premium)
- Horse breed preferences
- Geographic location
- Device type and browser

### Audience Segmentation
- First-time vs returning users
- Paid vs organic traffic
- Mobile vs desktop usage
- Geographic market segments

## Integration with Business Logic

### Real-time Analytics
```typescript
// Track user journey through valuation process
const trackValuationStep = (step: string, data: any) => {
  event({
    action: 'valuation_step',
    category: 'user_journey',
    label: step,
    value: Date.now()
  });
};

// Usage in components
useEffect(() => {
  trackValuationStep('form_started', { breed: selectedBreed });
}, [selectedBreed]);
```

### A/B Testing Integration
- Test different valuation form layouts
- Compare pricing page variations
- Analyze feature adoption rates
- Measure conversion rate improvements

## Performance Monitoring

### Loading Strategy
- **Strategy**: `afterInteractive` to avoid blocking page rendering
- **Optimization**: Minimized impact on Core Web Vitals
- **Error Handling**: Graceful fallback if GA4 fails to load

### Data Quality
- Event validation and debugging
- Duplicate event prevention
- Cross-device tracking accuracy
- Data sampling and accuracy monitoring

## Development Workflow

### Testing Setup
```typescript
// Development environment detection
const isDev = process.env.NODE_ENV === 'development';

const trackEvent = (eventData: any) => {
  if (isDev) {
    console.log('GA4 Event:', eventData);
  } else {
    // Send to GA4
    window.gtag('event', eventData.action, eventData);
  }
};
```

### Debug Mode
- Enable debug mode in development
- Console logging for event verification
- GA4 DebugView for real-time testing

## Best Practices

### Implementation
- Load analytics asynchronously to avoid blocking rendering
- Use Next.js Script component with appropriate strategy
- Implement proper TypeScript types for gtag
- Handle client-side routing in SPA

### Data Accuracy
- Validate events before sending
- Use consistent naming conventions
- Implement proper error boundaries
- Monitor data quality regularly

### Privacy-First
- Respect user consent preferences
- Implement proper cookie management
- Use anonymized data where possible
- Provide clear privacy policy

## Troubleshooting

### Common Issues
- Events not appearing in real-time reports
- Cross-domain tracking problems
- Mobile app integration challenges
- Cookie consent blocking analytics

### Debugging Tools
- GA4 DebugView for real-time event monitoring
- Browser developer tools for gtag verification
- Google Tag Assistant for implementation validation
- Real User Monitoring for performance impact

---

*Documentation generated from codebase analysis*