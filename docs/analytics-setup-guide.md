# Google Analytics 4 Setup Guide

## Issue Fixed
Missing `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable was preventing GA4 and DataFast analytics from tracking visitors.

## ✅ Completed Steps
- [x] Added `NEXT_PUBLIC_GA_MEASUREMENT_ID` placeholder to `.env.local`
- [x] Added `NEXT_PUBLIC_GA_MEASUREMENT_ID` placeholder to `.env.production.template`

## 📋 Remaining Steps

### Step 1: Obtain Your GA4 Measurement ID
1. Go to https://analytics.google.com
2. Navigate to: **Admin** → **Property** → **Data Streams** → **Web**
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Configure Local Development
1. Open `frontend/.env.local`
2. Find line 23: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Save the file

### Step 3: Configure Vercel Production
1. Go to https://vercel.com/dashboard
2. Select your PferdeWert project
3. Navigate to: **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** Your actual Measurement ID (G-XXXXXXXXXX)
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**

### Step 4: Test Locally
1. Start your development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open http://localhost:3000 in your browser
3. Open browser console (F12)
4. Run verification script:
   ```javascript
   // Check if GA4 is configured
   console.log('GA4 ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

   // This should show your Measurement ID, not undefined
   ```
5. Accept cookie consent banner
6. Check console for GA4 initialization messages

### Step 5: Deploy to Production
1. Trigger new deployment:
   ```bash
   git add .
   git commit -m "fix: configure Google Analytics 4 environment variables"
   git push
   ```
2. Vercel will automatically deploy with new environment variables

### Step 6: Verify Tracking
1. Wait 2-4 hours after deployment
2. Go to https://analytics.google.com
3. Navigate to: **Reports** → **Realtime**
4. Visit https://pferdewert.de
5. Verify visitor appears in real-time dashboard

## 🧪 Advanced Testing

### Console Verification Script
After accepting cookies, run this in browser console:
```javascript
// Verify GA4 is loaded
if (window.gtag) {
  console.log('✅ GA4 loaded successfully');

  // Send test event
  gtag('event', 'test_event', {
    'event_category': 'Testing',
    'event_label': 'Manual Test'
  });
  console.log('✅ Test event sent');
} else {
  console.error('❌ GA4 not loaded - check environment variables');
}
```

## 📊 Expected Behavior After Fix

### Before Fix
- ❌ GA4 Real-Time: 0 visitors
- ❌ DataFast: 0 visitors
- ✅ Vercel Analytics: Shows visitors (unaffected)

### After Fix
- ✅ GA4 Real-Time: Shows visitors
- ✅ DataFast: Shows visitors (if properly integrated)
- ✅ Vercel Analytics: Shows visitors (unchanged)

## 🔍 Troubleshooting

### GA4 Still Shows 0 Visitors
1. Check browser console for errors
2. Verify Measurement ID format is exactly `G-XXXXXXXXXX`
3. Ensure cookies are accepted (check cookie consent banner)
4. Wait 2-4 hours for data to appear (GA4 has reporting delay)
5. Check Vercel environment variables are set for all environments

### DataFast Not Working
- DataFast may require separate configuration
- Verify DataFast integration method in codebase
- Check if DataFast uses GA4 as data source

## 📁 Modified Files
- `frontend/.env.local` (lines 21-23)
- `frontend/.env.production.template` (lines 12-15)
- `docs/analytics-setup-guide.md` (this file)

## 🔐 Security Note
Never commit `.env.local` to git. It's already in `.gitignore`.
Only commit `.env.production.template` with placeholder values.
