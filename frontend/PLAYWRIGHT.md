# Playwright MCP for PferdeWert Frontend

This guide covers advanced Playwright MCP usage specifically for the PferdeWert horse valuation application.

## Quick Start

1. Ensure development server is running: `npm run dev`
2. Use Playwright MCP commands through Claude Code
3. Always take screenshots after visual changes

## PferdeWert-Specific Test Scenarios

### 1. Horse Valuation Form Flow

```typescript
// Complete valuation flow test
await page.goto('http://localhost:3000');

// Fill main form
await page.fill('input[name="horseName"]', 'Thunderbolt');
await page.fill('input[name="age"]', '12');
await page.selectOption('select[name="breed"]', 'warmblood');
await page.selectOption('select[name="discipline"]', 'dressage');
await page.fill('textarea[name="achievements"]', 'Winner of regional championships');

// Handle image uploads
await page.setInputFiles('input[type="file"]', ['./test-images/horse1.jpg']);

// Submit and validate
await page.click('button[type="submit"]');
await page.waitForSelector('.valuation-result', { timeout: 30000 });

// Validate result structure
const priceRange = await page.textContent('.price-range');
expect(priceRange).toMatch(/€[\d,.]+ - €[\d,.]+/);

// Take screenshot of results
await page.screenshot({ path: 'valuation-result.png', fullPage: true });
```

### 2. Multi-language Testing

```typescript
// Test German (default)
await page.goto('http://localhost:3000');
let title = await page.textContent('h1');
expect(title).toContain('Pferdewert');

// Switch to English
await page.click('[data-testid="language-toggle"]');
await page.click('button:has-text("English")');

// Validate translation
title = await page.textContent('h1');
expect(title).toContain('Horse Value');

// Test form labels are translated
const ageLabel = await page.textContent('label[for="age"]');
expect(ageLabel).toContain('Age');
```

### 3. Payment Integration Testing

```typescript
// Test premium valuation flow
await page.goto('http://localhost:3000/bewertung');

// Select premium option
await page.click('button:has-text("Premium-Bewertung")');

// Should redirect to Stripe
await page.waitForURL(/checkout\.stripe\.com/);

// Validate Stripe elements are loaded
await expect(page.locator('#card-element')).toBeVisible();

// For test mode, fill test card
await page.fill('#card-element', '4242424242424242');
await page.fill('#expiry-element', '12/34');
await page.fill('#cvc-element', '123');
```

### 4. PDF Generation Validation

```typescript
// Navigate to results page
await page.goto('http://localhost:3000/result/test-id');

// Test PDF download
const downloadPromise = page.waitForEvent('download');
await page.click('button:has-text("PDF herunterladen")');
const download = await downloadPromise;

// Validate download
expect(download.suggestedFilename()).toMatch(/pferdewert.*\.pdf/);

// Save for manual inspection
await download.saveAs('./downloads/test-report.pdf');
```

### 5. Mobile Responsiveness Testing

```typescript
const mobileViewports = [
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'Samsung Galaxy', width: 360, height: 640 },
  { name: 'iPad', width: 768, height: 1024 }
];

for (const viewport of mobileViewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  
  // Test navigation menu
  await page.click('button[aria-label="Menu"]');
  await expect(page.locator('.mobile-menu')).toBeVisible();
  
  // Test form usability
  await page.goto('http://localhost:3000/bewertung');
  await page.fill('input[name="horseName"]', 'Mobile Test');
  
  // Screenshot for visual validation
  await page.screenshot({ 
    path: `mobile-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
    fullPage: true 
  });
}
```

### 6. Performance & Analytics Testing

```typescript
// Test loading performance
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Measure Core Web Vitals
const vitals = await page.evaluate(() => {
  return new Promise((resolve) => {
    let fcpValue, lcpValue, clsValue = 0;
    
    // First Contentful Paint
    new PerformanceObserver((list) => {
      fcpValue = list.getEntries()[0].startTime;
    }).observe({ entryTypes: ['paint'] });
    
    // Largest Contentful Paint  
    new PerformanceObserver((list) => {
      lcpValue = list.getEntries()[0].startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      clsValue += list.getEntries().reduce((sum, entry) => sum + entry.value, 0);
    }).observe({ entryTypes: ['layout-shift'] });
    
    setTimeout(() => resolve({ fcp: fcpValue, lcp: lcpValue, cls: clsValue }), 3000);
  });
});

console.log('Web Vitals:', vitals);
```

### 7. Error State Testing

```typescript
// Test network failure scenarios
await page.route('**/api/bewertung', route => route.abort());

await page.goto('http://localhost:3000/bewertung');
await page.fill('input[name="horseName"]', 'Test Horse');
await page.click('button[type="submit"]');

// Should show error message
await expect(page.locator('.error-message')).toBeVisible();
await expect(page.locator('.error-message')).toContainText('Netzwerkfehler');

// Screenshot error state
await page.screenshot({ path: 'error-state.png' });
```

### 8. A/B Testing & Feature Flags

```typescript
// Test different UI variants
const variants = ['control', 'variant-a', 'variant-b'];

for (const variant of variants) {
  // Set feature flag cookie
  await page.context().addCookies([{
    name: 'ab_test_hero',
    value: variant,
    url: 'http://localhost:3000'
  }]);
  
  await page.goto('http://localhost:3000');
  
  // Take screenshot of each variant
  await page.screenshot({ path: `hero-${variant}.png` });
  
  // Measure conversion rates
  await page.click('button:has-text("Jetzt bewerten")');
  const conversionTime = Date.now();
  console.log(`${variant} conversion time:`, conversionTime);
}
```

## Advanced Debugging Workflows

### Console & Network Monitoring

```typescript
// Listen for all console messages
page.on('console', msg => {
  console.log(`[${msg.type()}] ${msg.text()}`);
});

// Track failed requests
page.on('requestfailed', request => {
  console.error(`Failed: ${request.method()} ${request.url()}`);
});

// Monitor API responses
page.on('response', response => {
  if (response.url().includes('/api/bewertung')) {
    console.log(`API Response: ${response.status()}`);
  }
});
```

### Visual Regression Testing

```typescript
// Baseline screenshot
await page.goto('http://localhost:3000');
await page.screenshot({ path: 'baseline-homepage.png', fullPage: true });

// After changes, compare
await page.screenshot({ path: 'current-homepage.png', fullPage: true });

// Use image comparison tools or manual review
```

## Best Practices for PferdeWert

1. **Always test the full valuation flow** - from form input to PDF generation
2. **Validate multilingual content** - ensure all translations work correctly  
3. **Test payment integration carefully** - use Stripe test keys only
4. **Monitor performance on form submission** - AI processing can be slow
5. **Test image upload edge cases** - large files, unsupported formats
6. **Validate responsive design** - forms must be usable on mobile
7. **Check accessibility** - screen readers, keyboard navigation
8. **Test error scenarios** - network failures, API timeouts

## Integration with Development Workflow

```typescript
// Pre-commit visual validation
const criticalPages = [
  'http://localhost:3000',
  'http://localhost:3000/bewertung',
  'http://localhost:3000/preise'
];

for (const url of criticalPages) {
  await page.goto(url);
  await page.screenshot({ 
    path: `pre-commit-${url.split('/').pop() || 'home'}.png`,
    fullPage: true 
  });
}
```

Remember: Use Playwright MCP as your "eyes" - always visually validate changes, especially UI/UX improvements, and iterate based on what you see, not just what the code looks like.