# PferdeWert.de API Reference

This document provides comprehensive information about all third-party APIs integrated into the PferdeWert.de platform.

## Overview

PferdeWert.de integrates with several third-party services to provide AI-assisted horse market value estimation, payment processing, email notifications, and analytics.

## Architecture

- **Frontend**: Next.js 15 (Pages Router) + TypeScript
- **Backend**: FastAPI + Python  
- **Database**: MongoDB Atlas
- **Deployment**: Frontend on Vercel, Backend on Render

## Integrated APIs

### Core Business APIs
- [MongoDB Atlas](apis/mongodb.md) - Primary database for horse data and valuations
- [OpenAI API](apis/openai.md) - GPT-5 model for horse valuation analysis
- [Anthropic API](apis/anthropic.md) - Claude model as secondary AI option

### Payment & E-commerce
- [Stripe API](apis/stripe.md) - Payment processing for premium valuations

### Communication & Notifications  
- [Resend API](apis/resend.md) - Email notifications and transactional emails

### Analytics & Marketing
- [Google Analytics 4](apis/google-analytics.md) - Web analytics and user behavior tracking

### Social Media (Planned)
- Instagram Basic Display API - Social media integration (pending implementation)

## Environment Variables

Key environment variables used across the platform:

```bash
# Database
MONGODB_URI=mongodb+srv://...

# AI Services  
OPENAI_API_KEY=sk-proj-...
PW_MODEL=gpt-5

# Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

## API Usage Patterns

### Error Handling
All API integrations implement consistent error handling with:
- Proper HTTP status code checking
- Timeout handling
- Retry mechanisms for transient failures
- User-friendly error messages

### Security Considerations
- API keys stored as environment variables
- HTTPS-only communication
- Rate limiting compliance
- Data validation and sanitization

## Development Setup

1. Copy environment variables from `.env.local`
2. Install dependencies: `npm install` (frontend) and `pip install -r requirements.txt` (backend)
3. Start development servers:
   - Frontend: `npm run dev` (port 3000)
   - Backend: `uvicorn main:app --reload --port 8000`

## Testing

Before committing changes:
```bash
# Frontend
npm run lint && npm run type-check

# Backend  
ruff check
```

---

*Last updated: August 2025*