# DataFast Implementation - Complete Code Reference

## Overview

This document provides the complete code reference for all DataFast tracking in the PferdeWert codebase.

---

## Method 1: Stripe Metadata (Recommended)

### Location
File: `/frontend/pages/api/checkout.ts`
Lines: 138-143

### Current Implementation (CORRECT)

```typescript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card", "klarna", "paypal"],
  line_items: [{ price: STRIPE_CONFIG.priceId, quantity: 1 }],
  mode: "payment",
  allow_promotion_codes: true,
  success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
  metadata: {
    bewertungId: bewertungId.toHexString(),
    // DataFast revenue attribution cookies
    datafast_visitor_id: datafastVisitorId,      // ← PASSED TO STRIPE
    datafast_session_id: datafastSessionId,      // ← PASSED TO STRIPE
  },
});
```

### How It Works

```
Browser sends request to /api/checkout
        ↓
Server reads cookies from request
  ├─ document.cookie.datafast_visitor_id = "abc123..."
  └─ document.cookie.datafast_session_id = "xyz789..."
        ↓
Server creates Stripe session with metadata
  {
    metadata: {
      datafast_visitor_id: "abc123...",
      datafast_session_id: "xyz789..."
    }
  }
        ↓
Stripe stores session with metadata
        ↓
User completes payment
        ↓
Stripe sends webhook to backend (api/webhook.ts)
        ↓
DataFast Stripe integration reads webhook
        ↓
DataFast records payment with visitor/session IDs
        ↓
✅ TRACKED ONCE - CORRECT
```

### Code Snippet: Reading Cookies

```typescript
// frontend/pages/api/checkout.ts - Lines 70-85

const validateDataFastId = (id: string | undefined): string | null => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return null;
  }
  return id.trim();
};

// Priority: Official names first, legacy 'df_*' as fallback
const datafastVisitorId =
  validateDataFastId(req.cookies['datafast_visitor_id']) ??
  validateDataFastId(req.cookies['df_visitor_id']) ??
  '';
const datafastSessionId =
  validateDataFastId(req.cookies['datafast_session_id']) ??
  validateDataFastId(req.cookies['df_session_id']) ??
  '';

const hasBothCookies = !!(datafastVisitorId && datafastSessionId);

if (!hasBothCookies) {
  warn('[CHECKOUT] ⚠️ Missing DataFast cookies - attribution may fail:', {
    hasVisitor: !!datafastVisitorId,
    hasSession: !!datafastSessionId,
    cookiesChecked: ['datafast_visitor_id (official)', 'df_visitor_id (legacy)', 'datafast_session_id (official)', 'df_session_id (legacy)']
  });
} else {
  info("[CHECKOUT] ✅ DataFast cookies validated for attribution");
}
```

### Status: ✅ KEEP THIS

---

## Method 2: Client-Side Payment Call (REDUNDANT)

### Location
File: `/frontend/pages/ergebnis.tsx`
Lines: 200-207

### Current Implementation (INCORRECT - REMOVE)

```typescript
// DataFa.st revenue tracking
if (typeof window !== "undefined" && window.datafast) {
  window.datafast("payment", {
    amount: PRICING.current,
    currency: "EUR",
    transaction_id: session_id,
  });
}
```

### Why This Is Wrong

```
Browser loads /ergebnis page
        ↓
JavaScript executes (if not blocked)
        ↓
window.datafast("payment", {...}) fires
        ↓
DataFast records ANOTHER payment
        ↓
❌ TRACKED TWICE - DUPLICATE
```

### The Problem in Code Flow

```typescript
// What happens:

// Step 1: Payment created with Method 1
const session = await stripe.checkout.sessions.create({
  // ... other config ...
  metadata: {
    datafast_visitor_id: "abc123",  // ← Method 1 passes this
    datafast_session_id: "xyz789"   // ← Method 1 passes this
  }
});

// Step 2: Stripe processes payment
// Step 3: Stripe webhook fires (Method 1 tracks it)
// Step 4: User lands on /ergebnis
// Step 5: THIS CODE FIRES (redundant Method 2):
if (typeof window !== "undefined" && window.datafast) {
  window.datafast("payment", {                    // ❌ DUPLICATE!
    amount: PRICING.current,
    currency: "EUR",
    transaction_id: session_id,
  });
}

// Result: Purchase tracked TWICE in DataFast
```

### Status: ❌ REMOVE THIS

### What To Replace It With

```typescript
// INSTEAD of the above, use this comment:

// NOTE: Revenue tracking is handled via Stripe webhook integration with DataFast
// DataFast visitor/session IDs are passed in Stripe metadata (see api/checkout.ts)
// The Stripe webhook automatically notifies DataFast of the payment
// DO NOT call window.datafast("payment", ...) here - causes double tracking
```

---

## Other DataFast Tracking (Correct Implementations)

### 1. Cookie Consent Events

**Location**: `frontend/components/SimpleCookieConsent.tsx`, Lines 85-86

```typescript
// Track Cookie Banner Interaction
if (window.datafast) {
  window.datafast(granted ? 'cookie_accepted' : 'cookie_rejected');
}
```

**Status**: ✅ CORRECT - Different event type, not payment-related

**How It Works**:
- Fires when user accepts/rejects cookies
- Tracks user privacy preferences
- No conflict with payment tracking

---

### 2. Analytics Event Helper

**Location**: `frontend/lib/analytics.ts`, Lines 22-31

```typescript
const sendDataFastEvent = (eventName: string, eventData: Record<string, unknown> = {}): void => {
  if (typeof window !== "undefined" && window.datafast) {
    try {
      window.datafast(eventName, eventData);
      info(`📊 [DataFast] Event tracked: ${eventName}`, eventData);
    } catch (error) {
      warn(`📊 [DataFast] Failed to track ${eventName}:`, error);
    }
  }
};
```

**Status**: ✅ CORRECT - Used for non-purchase events

**Used For**:
- Form progress tracking: `sendDataFastEvent("form_step_completed_1", {...})`
- Form abandonment: `sendDataFastEvent("form_abandoned", {...})`
- Other engagement events

---

### 3. Queue Initialization

**Location**: `frontend/pages/_document.tsx`, Lines 9-17

```typescript
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.datafast = window.datafast || function() {
        (window.datafast.q = window.datafast.q || []).push(arguments);
      };
    `,
  }}
/>
```

**Status**: ✅ CORRECT - Required for DataFast setup

**How It Works**:
- Creates queue for early event capture
- Events fire before DataFast script loads
- Prevents event loss
- Critical for reliability

---

### 4. DataFast Core Script

**Location**: `frontend/pages/_document.tsx`, Lines 19-29

```typescript
<script
  defer
  data-website-id="68d59a9dcb0e8d111148811a"
  data-domain="Pferdewert.de"
  src="https://datafa.st/js/script.js"
/>
```

**Status**: ✅ CORRECT - Loads DataFast library

---

### 5. Type Definitions

**Location**: `frontend/types/global.d.ts`, Lines 12-16

```typescript
declare global {
  interface Window {
    datafast?: {
      q?: unknown[];
      (event: 'payment', data: { amount: number; currency: string; transaction_id: string }): void;
      (event: string, data?: Record<string, unknown>): void;
    };
  }
}
```

**Status**: ✅ CORRECT - Type safety for DataFast calls

---

## Webhook Processing (Backend)

### Location
File: `/frontend/pages/api/webhook.ts`

### Relevant Section (Lines 184-189)

```typescript
// Log session metadata without sensitive customer data
const safeMetadata = session.metadata ? {
  hasMetadata: true,
  metadataKeys: Object.keys(session.metadata)
} : { hasMetadata: false };
info('[WEBHOOK] Session metadata info:', safeMetadata);
```

**Important**:
- Webhook processes Stripe metadata
- DataFast metadata is stored in Stripe session
- Webhook reads it but doesn't send to DataFast
- DataFast reads it via Stripe webhook integration

---

## Cookie Reading Implementation

### Location
File: `/frontend/pages/api/checkout.ts`, Lines 70-97

```typescript
// Extract DataFast cookies for revenue attribution
// Official cookie names: 'datafast_visitor_id' and 'datafast_session_id'
const validateDataFastId = (id: string | undefined): string | null => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return null;
  }
  return id.trim();
};

// Priority: Official names first, legacy 'df_*' as fallback
const datafastVisitorId =
  validateDataFastId(req.cookies['datafast_visitor_id']) ??
  validateDataFastId(req.cookies['df_visitor_id']) ??
  '';
const datafastSessionId =
  validateDataFastId(req.cookies['datafast_session_id']) ??
  validateDataFastId(req.cookies['df_session_id']) ??
  '';

const hasBothCookies = !!(datafastVisitorId && datafastSessionId);

if (!hasBothCookies) {
  warn('[CHECKOUT] ⚠️ Missing DataFast cookies - attribution may fail:', {
    hasVisitor: !!datafastVisitorId,
    hasSession: !!datafastSessionId,
    cookiesChecked: ['datafast_visitor_id (official)', 'df_visitor_id (legacy)', 'datafast_session_id (official)', 'df_session_id (legacy)']
  });
} else {
  info("[CHECKOUT] ✅ DataFast cookies validated for attribution");
}
```

**Good Practices**:
- Validates before use
- Handles both official and legacy names
- Logs warnings if missing
- Sanitizes input

---

## PRICING Constant

### Location
File: `/frontend/lib/pricing.ts`

```typescript
export const PRICING = {
  current: 9.99,  // €9.99 per valuation
  // ... other pricing info
};
```

**Used in Method 2** (to remove):
```typescript
// DO NOT use this in client-side DataFast tracking
// Would cause double tracking
window.datafast("payment", {
  amount: PRICING.current,  // ❌ Remove this
  currency: "EUR",
  transaction_id: session_id,
});
```

---

## Comparison of Implementations

### Method 1: Correct

```
┌─────────────────────────────────────────────────────────────┐
│ File: api/checkout.ts                                       │
│ When: When creating Stripe session                          │
│ Who: Server-side code                                       │
│ What: Pass DataFast IDs as Stripe metadata                  │
│ How: metadata: { datafast_visitor_id: "...", ... }          │
│ Reliability: ✅ Always fires                                │
│ Can be blocked: ❌ No (server-side)                          │
│ GDPR compliant: ✅ Yes (minimal data)                        │
│ Status: ✅ USE THIS                                          │
└─────────────────────────────────────────────────────────────┘
```

### Method 2: Incorrect

```
┌─────────────────────────────────────────────────────────────┐
│ File: ergebnis.tsx                                          │
│ When: When user lands on success page                       │
│ Who: Client-side JavaScript                                │
│ What: Call window.datafast("payment", ...)                  │
│ How: Direct browser-to-DataFast call                        │
│ Reliability: ⚠️ Can be blocked                               │
│ Can be blocked: ✅ Yes (adblocker, privacy mode)            │
│ GDPR compliant: ⚠️ More data exposure                        │
│ Status: ❌ REMOVE THIS                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## The Fix - Before and After

### BEFORE (Lines 200-207 in ergebnis.tsx)

```typescript
// DataFa.st revenue tracking
if (typeof window !== "undefined" && window.datafast) {
  window.datafast("payment", {
    amount: PRICING.current,
    currency: "EUR",
    transaction_id: session_id,
  });
}
```

### AFTER (Replace with)

```typescript
// NOTE: Revenue tracking is handled via Stripe webhook integration with DataFast
// DataFast visitor/session IDs (datafast_visitor_id, datafast_session_id) are
// passed as metadata when creating Stripe Checkout sessions (see api/checkout.ts lines 138-143).
// The Stripe webhook automatically notifies DataFast when payment is completed.
// DataFast's official Stripe integration handles all revenue tracking.
// DO NOT call window.datafast("payment", ...) here - it causes double tracking!
```

---

## Verification Code

### Check Method 1 Is Working

```typescript
// Run this in browser console to verify cookies are present:
console.log({
  visitor_id: document.cookie.match(/datafast_visitor_id=([^;]*)/)?.[1],
  session_id: document.cookie.match(/datafast_session_id=([^;]*)/)?.[1],
});

// Output should show IDs like:
// {
//   visitor_id: "abc123xyz789...",
//   session_id: "xyz789abc123..."
// }
```

### Check Stripe Metadata

```bash
# In terminal, check a recent Stripe session:
# (requires Stripe CLI or dashboard access)

stripe checkout sessions list --limit 1

# Look for metadata section:
# "metadata": {
#   "datafast_visitor_id": "abc123...",
#   "datafast_session_id": "xyz789...",
#   "bewertungId": "507f1f77bcf86cd799439011"
# }
```

### Check DataFast Dashboard

1. Go to DataFast Dashboard
2. Click "Revenue" or "Transactions"
3. Look for recent payments
4. Each payment should appear ONCE
5. Amount should match Stripe Dashboard exactly

---

## Testing Scenarios

### Scenario 1: Before Fix (Current State)

```
Test Payment: €9.99

Stripe Dashboard:
└─ 1 payment of €9.99

DataFast Dashboard:
├─ Transaction 1: €9.99 (from Stripe webhook)
├─ Transaction 2: €9.99 (from client JS)
└─ Total Revenue: €19.98 ❌

Error: 2x inflation
```

### Scenario 2: After Fix

```
Test Payment: €9.99

Stripe Dashboard:
└─ 1 payment of €9.99

DataFast Dashboard:
└─ 1 Transaction: €9.99 ✅

Error: 0% (Correct)
```

---

## Common Questions

### Q: What if I need to track other events?

**A**: Use the helper function in `analytics.ts`:

```typescript
import { sendDataFastEvent } from '@/lib/analytics';

// Track form progress
sendDataFastEvent('form_step_completed_1', {
  step_number: 1,
  step_name: 'Horse Details'
});

// Track form abandonment
sendDataFastEvent('form_abandoned', {
  exit_point: 3,
  total_steps: 5
});
```

### Q: What if DataFast script fails to load?

**A**: The queue initialization in `_document.tsx` handles this:

```typescript
// Events are queued even if script isn't loaded
window.datafast = window.datafast || function() {
  (window.datafast.q = window.datafast.q || []).push(arguments);
};

// When script loads, it processes the queue
```

### Q: What if cookies aren't present?

**A**: Validation in `checkout.ts` handles this:

```typescript
// If cookies missing:
const datafastVisitorId = ... ?? '';  // Defaults to empty string
const datafastSessionId = ... ?? '';  // Defaults to empty string

// Logs warning but continues
if (!hasBothCookies) {
  warn('[CHECKOUT] ⚠️ Missing DataFast cookies - attribution may fail');
}
```

### Q: Will removing Method 2 break anything?

**A**: No. Method 1 is the primary tracking method. Method 2 was never supposed to be used with Method 1.

---

## Summary

| Aspect | Method 1 (Stripe) | Method 2 (Client JS) |
|--------|-------------------|---------------------|
| **Status** | ✅ Keep | ❌ Remove |
| **File** | api/checkout.ts | ergebnis.tsx |
| **When** | Session creation | Page load |
| **How** | Stripe metadata | Browser call |
| **Reliability** | Server-side | Can be blocked |
| **Double Tracking** | No | YES |

---

## Implementation Checklist

- [ ] Understand the issue (Method 1 + Method 2 = double tracking)
- [ ] Review this code reference
- [ ] Identify the 8 lines to remove (ergebnis.tsx:200-207)
- [ ] Prepare the comment replacement
- [ ] Make the code change
- [ ] Run type-check and lint
- [ ] Create PR
- [ ] Get code review
- [ ] Merge
- [ ] Deploy to staging
- [ ] Test thoroughly
- [ ] Deploy to production
- [ ] Monitor for 24 hours
- [ ] Verify accuracy
- [ ] Close ticket

---

## Next Steps

1. **Read**: `DATAFAST_DOUBLE_TRACKING_ANALYSIS.md` for full details
2. **Understand**: The problem and why the fix works
3. **Prepare**: Your development environment
4. **Implement**: The 1-file change (5 minutes)
5. **Test**: On staging first
6. **Deploy**: To production
7. **Verify**: Everything works correctly
