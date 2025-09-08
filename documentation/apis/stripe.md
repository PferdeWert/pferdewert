# Stripe API Integration

## Overview

Stripe is integrated into PferdeWert.de to handle payment processing for premium horse valuation services. Users can purchase detailed AI-generated valuation reports.

## Configuration

### Environment Variables
```bash
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PRICE_ID=your_stripe_price_id_here  
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

### Package Dependencies
```json
{
  "stripe": "^18.2.1"
}
```

## Implementation

### Frontend Integration

The Stripe integration is implemented on the frontend using the Stripe JavaScript SDK:

```typescript
import Stripe from 'stripe';

// Initialize Stripe (server-side only)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});
```

### Payment Flow

1. **Price Configuration**: Uses a predefined price ID (`price_1RuFlMKoHsLHy9OTPv9tRBa0`) for the premium valuation service
2. **Checkout Session**: Creates a Stripe Checkout session for secure payment processing
3. **Webhook Handling**: Processes payment events via webhooks to update valuation status

### Key Features

- **Secure Checkout**: Uses Stripe Checkout for PCI-compliant payment processing  
- **Test Environment**: Currently configured with test API keys for development
- **Webhook Security**: Validates webhook signatures using the webhook secret
- **Single Product**: Focused on one premium valuation product

## Usage Examples

### Creating a Checkout Session

```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price: process.env.STRIPE_PRICE_ID,
    quantity: 1,
  }],
  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
});
```

### Webhook Event Processing

```typescript
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body, 
  sig, 
  process.env.STRIPE_WEBHOOK_SECRET
);

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  // Process successful payment
}
```

## Security Considerations

- API keys are stored as environment variables
- Webhook signatures are verified to ensure authenticity  
- Test keys are used in development environment
- All communication occurs over HTTPS

## Error Handling

- Network timeout handling for API calls
- Validation of webhook signatures
- User-friendly error messages for failed payments
- Retry logic for temporary failures

## Testing

The integration currently uses Stripe's test environment:
- Test card numbers can be used for development
- No real money is processed in test mode
- All transactions are simulated

## Next Steps

For production deployment:
1. Replace test API keys with live keys
2. Update webhook endpoints for production URLs
3. Implement additional payment methods if needed
4. Add payment analytics and reporting

---

*Documentation generated from codebase analysis*