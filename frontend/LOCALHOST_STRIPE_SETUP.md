# Localhost Stripe Setup Guide

## Quick Fix for Localhost Checkout Issues

### 1. Setup Stripe Test Mode

1. **Get Test Keys from Stripe Dashboard**:
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable Key** (starts with `pk_test_`)
   - Copy your **Secret Key** (starts with `sk_test_`)

2. **Create Test Products & Prices**:
   - Go to https://dashboard.stripe.com/test/products
   - Create 3 products: "PferdeWert Basic", "PferdeWert Pro", "PferdeWert Premium"
   - Set prices: €19.90, €39.90, €79.90
   - Copy the Price IDs (start with `price_`)

### 2. Configure Environment Variables

Your `.env.local` file is already created. **Update it with your real values**:

```bash
# Replace these placeholders with your actual Stripe test values:
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PRICE_ID_BASIC=price_your_actual_basic_price_id
STRIPE_PRICE_ID_PRO=price_your_actual_pro_price_id  
STRIPE_PRICE_ID_PREMIUM=price_your_actual_premium_price_id
```

### 3. Setup Webhook for Localhost

1. **Install Stripe CLI**:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Start Webhook Forwarding** (in separate terminal):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. **Copy Webhook Secret**: The CLI will show a webhook secret starting with `whsec_`. Add it to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_cli
   ```

### 4. Start Development Server

```bash
cd frontend
npm run dev
```

### 5. Test the Flow

1. Go to http://localhost:3000/pferde-preis-berechnen
2. Fill out the form
3. Select a tier (Basic/Pro/Premium) 
4. Click "Analyse starten"
5. Complete Stripe test payment using card `4242 4242 4242 4242`

## Common Issues & Solutions

### Issue: "Missing Stripe environment variables"
- **Cause**: `.env.local` file has placeholder values
- **Fix**: Replace all placeholder values with actual Stripe test keys/prices

### Issue: "STRIPE_PRICE_NOT_FOUND" 
- **Cause**: Price IDs don't exist in your Stripe test account
- **Fix**: Create products in Stripe test dashboard and use those Price IDs

### Issue: "Webhook signature verification failed"
- **Cause**: Stripe CLI not running or wrong webhook secret
- **Fix**: Ensure `stripe listen --forward-to localhost:3000/api/webhook` is running

### Issue: "Server configuration error"
- **Cause**: Missing required environment variables  
- **Fix**: Check that all required vars are in `.env.local` (not `.env.production.template`)

## Stripe Test Cards

For testing payments, use these test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`  
- **3D Secure**: `4000 0027 6000 3184`

## Environment File Checklist

Your `.env.local` must contain:
- ✅ `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- ✅ `STRIPE_PUBLISHABLE_KEY=pk_test_...` (real value)
- ✅ `STRIPE_SECRET_KEY=sk_test_...` (real value) 
- ✅ `STRIPE_PRICE_ID_BASIC=price_...` (real value)
- ✅ `STRIPE_PRICE_ID_PRO=price_...` (real value)
- ✅ `STRIPE_PRICE_ID_PREMIUM=price_...` (real value)
- ✅ `STRIPE_WEBHOOK_SECRET=whsec_...` (from Stripe CLI)
- ✅ `MONGODB_URI=mongodb+srv://...` (can use production or local)

## Debugging Commands

Check environment variables are loaded:
```bash
cd frontend
node -e "console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY?.substring(0,20) + '...')"
```

Test Stripe connection:
```bash
curl -u sk_test_YOUR_KEY: https://api.stripe.com/v1/prices/YOUR_BASIC_PRICE_ID
```

## Next Steps After Localhost Works

1. Test all 3 tiers (Basic/Pro/Premium) 
2. Verify webhook processing works
3. Check MongoDB documents are created
4. Test email notifications (if configured)
5. Verify PDF generation and result page access