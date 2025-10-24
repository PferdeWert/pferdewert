# Analytics Verification Script

## Quick Browser Console Test

After accepting cookies on your site, paste this script into your browser console (F12) to verify both GA4 and DataFast are working correctly:

```javascript
/**
 * PferdeWert.de Analytics Verification Script
 * Tests: Google Analytics 4 + DataFa.st tracking
 *
 * Usage:
 * 1. Visit https://pferdewert.de (or localhost:3000)
 * 2. Accept cookie consent banner
 * 3. Open browser console (F12)
 * 4. Paste this entire script and press Enter
 */

console.log('🔍 Starting PferdeWert Analytics Verification...\n');

// ============================================================================
// 1. CHECK ENVIRONMENT VARIABLES
// ============================================================================
console.log('📋 STEP 1: Environment Variables Check');
console.log('─────────────────────────────────────');

const gaId = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GA_MEASUREMENT_ID;
if (gaId && gaId !== 'G-XXXXXXXXXX') {
  console.log('✅ GA4 Measurement ID configured:', gaId);
} else if (gaId === 'G-XXXXXXXXXX') {
  console.warn('⚠️  GA4 Measurement ID is still placeholder value');
  console.warn('   Action: Replace in .env.local or Vercel Dashboard');
} else {
  console.error('❌ GA4 Measurement ID missing');
  console.error('   Action: Add NEXT_PUBLIC_GA_MEASUREMENT_ID to environment');
}

console.log('\n');

// ============================================================================
// 2. CHECK GOOGLE ANALYTICS 4
// ============================================================================
console.log('📊 STEP 2: Google Analytics 4 Check');
console.log('─────────────────────────────────────');

if (typeof window.gtag === 'function') {
  console.log('✅ GA4 gtag function loaded successfully');

  // Send test event
  try {
    gtag('event', 'verification_test', {
      'event_category': 'Analytics Testing',
      'event_label': 'Manual Verification',
      'value': 1
    });
    console.log('✅ Test event sent to GA4');
    console.log('   Event: verification_test');
  } catch (error) {
    console.error('❌ Error sending test event:', error);
  }
} else {
  console.error('❌ GA4 not loaded');
  console.error('   Possible causes:');
  console.error('   - Cookie consent not granted');
  console.error('   - NEXT_PUBLIC_GA_MEASUREMENT_ID missing or invalid');
  console.error('   - Ad blocker enabled');
  console.error('   - Script loading failed');
}

console.log('\n');

// ============================================================================
// 3. CHECK DATAFAST ANALYTICS
// ============================================================================
console.log('🌐 STEP 3: DataFa.st Analytics Check');
console.log('─────────────────────────────────────');

// Check if DataFast script is loaded
const datafastScript = document.querySelector('[data-website-id="68d59a9dcb0e8d111148811a"]');
if (datafastScript) {
  console.log('✅ DataFa.st script element found in DOM');
  console.log('   Website ID: 68d59a9dcb0e8d111148811a');
  console.log('   Script URL:', datafastScript.src);
} else {
  console.warn('⚠️  DataFa.st script not found in DOM');
  console.warn('   Possible causes:');
  console.warn('   - Cookie consent not granted (script loads AFTER consent)');
  console.warn('   - Ad blocker enabled');
  console.warn('   - Privacy mode/incognito blocking third-party scripts');
}

// Check if DataFast function is available
if (typeof window.datafast === 'function') {
  console.log('✅ DataFa.st function loaded successfully');

  // Send test event
  try {
    window.datafast('test_verification', {
      source: 'manual_verification',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Test event sent to DataFa.st');
    console.log('   Event: test_verification');
  } catch (error) {
    console.error('❌ Error sending test event:', error);
  }
} else {
  console.warn('⚠️  DataFa.st function not available');
  console.warn('   Note: This is normal if consent was JUST granted');
  console.warn('   The script loads asynchronously after consent');
}

// Check DataFast queue
if (window.datafast && window.datafast.q) {
  console.log('✅ DataFa.st queue initialized');
  console.log('   Queued events:', window.datafast.q.length);
} else {
  console.warn('⚠️  DataFa.st queue not found');
}

console.log('\n');

// ============================================================================
// 4. CHECK DATAFAST COOKIES
// ============================================================================
console.log('🍪 STEP 4: DataFa.st Attribution Cookies');
console.log('─────────────────────────────────────────');

const cookies = document.cookie.split(';').reduce((acc, cookie) => {
  const [key, value] = cookie.trim().split('=');
  acc[key] = value;
  return acc;
}, {});

const dfVisitorId = cookies['df_visitor_id'] || cookies['datafast_visitor_id'];
const dfSessionId = cookies['df_session_id'] || cookies['datafast_session_id'];

if (dfVisitorId) {
  console.log('✅ DataFa.st Visitor ID found:', dfVisitorId);
} else {
  console.warn('⚠️  DataFa.st Visitor ID not found');
  console.warn('   This cookie is set after the script loads');
}

if (dfSessionId) {
  console.log('✅ DataFa.st Session ID found:', dfSessionId);
} else {
  console.warn('⚠️  DataFa.st Session ID not found');
  console.warn('   This cookie is set after the script loads');
}

console.log('\n');

// ============================================================================
// 5. CHECK COOKIE CONSENT
// ============================================================================
console.log('🔐 STEP 5: Cookie Consent Status');
console.log('─────────────────────────────────');

const cookieConsent = cookies['cc_cookie'];
if (cookieConsent) {
  try {
    const consent = JSON.parse(decodeURIComponent(cookieConsent));
    console.log('✅ Cookie consent found:', consent);

    if (consent.categories && consent.categories.includes('analytics')) {
      console.log('✅ Analytics consent GRANTED');
    } else {
      console.error('❌ Analytics consent NOT granted');
      console.error('   Action: Accept cookie banner to enable tracking');
    }
  } catch (error) {
    console.warn('⚠️  Could not parse cookie consent:', error);
  }
} else {
  console.error('❌ No cookie consent found');
  console.error('   Action: Accept cookie banner to enable tracking');
}

console.log('\n');

// ============================================================================
// 6. CHECK VERCEL ANALYTICS (BASELINE)
// ============================================================================
console.log('✅ STEP 6: Vercel Analytics Check (Baseline)');
console.log('─────────────────────────────────────────────');

if (window.va) {
  console.log('✅ Vercel Analytics loaded successfully');
  console.log('   This confirms: Network working, page loading correctly');
} else {
  console.warn('⚠️  Vercel Analytics not detected');
}

console.log('\n');

// ============================================================================
// 7. NETWORK DIAGNOSTIC
// ============================================================================
console.log('🌐 STEP 7: Network Diagnostic');
console.log('──────────────────────────────');

console.log('Run this to check for blocked requests:');
console.log('1. Open Network tab (F12 → Network)');
console.log('2. Reload page');
console.log('3. Filter by "analytics" or "datafa"');
console.log('4. Check for failed requests (red) or blocked (yellow)');
console.log('\nLook for:');
console.log('  • googletagmanager.com/gtag/js (GA4)');
console.log('  • datafa.st/js/script.js (DataFast)');

console.log('\n');

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('═══════════════════════════════════════════════════════════');
console.log('📊 VERIFICATION SUMMARY');
console.log('═══════════════════════════════════════════════════════════');

const results = {
  ga4_loaded: typeof window.gtag === 'function',
  datafast_loaded: typeof window.datafast === 'function',
  datafast_script: !!datafastScript,
  consent_granted: cookieConsent && JSON.parse(decodeURIComponent(cookieConsent)).categories?.includes('analytics'),
  vercel_working: !!window.va
};

console.log('GA4:', results.ga4_loaded ? '✅ WORKING' : '❌ NOT WORKING');
console.log('DataFast:', results.datafast_loaded ? '✅ WORKING' : '⚠️  LOADING');
console.log('Cookie Consent:', results.consent_granted ? '✅ GRANTED' : '❌ NOT GRANTED');
console.log('Vercel Analytics:', results.vercel_working ? '✅ WORKING' : '⚠️  CHECK');

console.log('\n💡 RECOMMENDED ACTIONS:');
if (!results.consent_granted) {
  console.log('1. Accept cookie consent banner on the page');
  console.log('2. Reload page and run this script again');
}
if (!results.ga4_loaded && results.consent_granted) {
  console.log('1. Check NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel Dashboard');
  console.log('2. Verify format: G-XXXXXXXXXX (must start with G-)');
  console.log('3. Redeploy after adding environment variable');
}
if (!results.datafast_loaded && results.consent_granted) {
  console.log('1. Wait 30 seconds - DataFast loads asynchronously');
  console.log('2. Check browser console for loading errors');
  console.log('3. Disable ad blockers and reload');
  console.log('4. Run this script again');
}

console.log('\n🎯 EXPECTED BEHAVIOR:');
console.log('After accepting cookies + waiting 30 seconds:');
console.log('  • All checks should be ✅ (except warnings are OK)');
console.log('  • GA4 Real-Time should show visitors in 1-2 minutes');
console.log('  • DataFa.st should show visitors in 2-4 hours');
console.log('  • Vercel Analytics should show visitors immediately');

console.log('\n📖 Documentation: docs/analytics-setup-guide.md');
console.log('═══════════════════════════════════════════════════════════\n');
```

## Quick Manual Checks

### 1. Cookie Consent Check
- Visit your site
- Look for cookie consent banner
- Click "Accept" or "Accept all cookies"
- **Without consent = No tracking possible**

### 2. Browser Console Check
- Press F12 to open DevTools
- Go to Console tab
- Look for these messages:
  - `✅ GA4 loaded successfully` (after consent)
  - `📊 DataFa.st tracking enabled after consent` (after consent)

### 3. Network Tab Check
- Press F12 → Network tab
- Reload page
- Filter by "analytics" or "datafa"
- Expected requests:
  - `https://www.googletagmanager.com/gtag/js?id=G-*` (GA4)
  - `https://datafa.st/js/script.js` (DataFast)
- If blocked (red/yellow): Check ad blocker settings

### 4. Real-Time Dashboard Check

**GA4:**
1. Go to https://analytics.google.com
2. Navigate to: Reports → Realtime
3. Expected: Shows visitors within 1-2 minutes

**DataFast:**
1. Go to your DataFa.st dashboard
2. Check visitor count
3. Expected: Shows visitors within 2-4 hours (has reporting delay)

**Vercel Analytics:**
1. Go to https://vercel.com/dashboard
2. Select your project → Analytics
3. Expected: Shows visitors immediately (baseline verification)

## Troubleshooting

### GA4 Shows 0 Visitors
- **Check 1:** Environment variable configured? (Run verification script)
- **Check 2:** Consent granted? (Look for cookie banner)
- **Check 3:** Correct format? (Must be `G-XXXXXXXXXX`)
- **Check 4:** Wait 2-4 hours (GA4 has reporting delay)

### DataFast Shows 0 Visitors
- **Check 1:** Consent granted? (Script only loads after consent)
- **Check 2:** Ad blocker disabled? (Check Network tab for blocks)
- **Check 3:** Private/Incognito mode? (Blocks third-party scripts)
- **Check 4:** Wait 2-4 hours (DataFast has reporting delay)

### Both GA4 and DataFast Show 0
- **Most likely:** Cookie consent not granted
- **Solution:** Accept cookie banner and wait 2-4 hours

## Testing in Development

```bash
# Start local server
cd frontend
npm run dev

# Visit http://localhost:3000
# Accept cookie consent
# Open console (F12) and run verification script
```

**Note:** GA4 will only work in development if you've set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`

## Expected Timeline

| Event | GA4 | DataFast | Vercel |
|-------|-----|----------|--------|
| Accept cookies | Loads immediately | Loads immediately | Always active |
| Script loads | ~1-2 seconds | ~1-2 seconds | Always loaded |
| Visitor appears in dashboard | 1-2 minutes | 2-4 hours | Immediately |

## Success Criteria

✅ **GA4 Working:**
- Verification script shows: `GA4: ✅ WORKING`
- Real-Time dashboard shows visitors
- Console shows: `✅ Test event sent to GA4`

✅ **DataFast Working:**
- Verification script shows: `DataFast: ✅ WORKING`
- Script element found in DOM
- Console shows: `📊 DataFa.st tracking enabled after consent`
- Dashboard shows visitors (after 2-4 hours)

✅ **Both Working:**
- Cookie consent granted
- No blocked requests in Network tab
- Vercel Analytics shows baseline (confirms network working)
