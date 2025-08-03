# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PferdeWert is an AI-assisted service for estimating the market value of horses. The project combines a Next.js frontend with a FastAPI backend that communicates with AI services (OpenAI GPT & Anthropic Claude).

## Development Setup

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev        # Starts development server on port 3000
npm run lint       # ESLint checking
npm run type-check # TypeScript type checking
```

### Backend (FastAPI)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Environment Variables Required
- `OPENAI_API_KEY` - OpenAI API access
- `ANTHROPIC_API_KEY` - Claude API access  
- `MONGODB_URI` - MongoDB connection string
- `PW_MODEL` - OpenAI model to use (default: gpt-4o)
- `USE_CLAUDE` - Whether to use Claude as primary AI (true/false)

## Architecture

### Frontend Structure
- **Next.js 15** with TypeScript and React 19
- **Tailwind CSS** for styling
- **Pages Router** (not App Router)
- **MongoDB** integration via `/lib/mongo.ts`
- **Stripe** for payments
- **PDF generation** using jsPDF and @react-pdf/renderer

Key directories:
- `pages/` - Next.js pages and API routes
- `components/` - React components
- `lib/` - Utilities (mongo.ts, log.ts, pdfLayout.ts)
- `styles/` - CSS files

### Backend Structure
- **FastAPI** with Python
- **Dual AI system**: GPT (primary) + Claude (benchmark/comparison)
- **Pydantic** models for request validation
- **Token counting** with tiktoken
- **CORS** configured for frontend domains

Main endpoints:
- `POST /api/bewertung` - Horse valuation
- `POST /api/debug-comparison` - Compare AI models
- `GET /health` - Health check

### Database
- **MongoDB** with connection caching
- Collections accessed via `getCollection()` helper
- Used for storing Stripe sessions and horse evaluation data

## TypeScript & ESLint Rules

**Critical requirements** (from TYPESCRIPT_GUIDELINES.md):
- **Never use `any` type** - `@typescript-eslint/no-explicit-any` is enabled
- **No CommonJS require()** - Use ES6 imports only
- **Window object extensions** - Properly typed in `types/global.d.ts`

### Allowed Patterns
```typescript
// ✅ Correct: Window extensions in types/global.d.ts
declare global {
  interface Window {
    cookieconsent?: {
      initialise?: (config: Record<string, unknown>) => void;
    };
  }
}

// ✅ Correct: Safe external library usage
const cookieConsent = window.cookieconsent;
if (!cookieConsent?.initialise) return;
```

### Forbidden Patterns
```typescript
// ❌ Never do this
const cookieConsent = (window as any).cookieconsent;
const CookieConsent = require("@/components/CookieConsent");
```

## Code Quality Standards

### Pre-commit Requirements
```bash
npm run lint       # Must return 0 errors
npm run type-check # Must return 0 errors
```

**CRITICAL: Claude must ALWAYS run these commands before any git commit!**
- Never commit without running lint and type-check first
- This prevents runtime errors, hydration issues, and TypeScript problems
- If either command fails, fix the issues before committing

### React/Next.js Best Practices
- Always import all used modules/components
- Use async/await with proper try/catch for API calls
- Clean up useEffect with return functions
- Follow React Hooks rules (top-level only)
- Update UI state for loading/error states

### Backend Best Practices
- Validate inputs with Pydantic/Zod schemas
- Use async/await for all asynchronous operations
- Wrap external calls in try/catch blocks
- Ensure every API path sends exactly one response
- Use structured logging (avoid console.log in production)

## Git Workflow
- Husky pre-commit hooks run ESLint and Prettier
- All files are formatted with Prettier on commit
- lint-staged processes TypeScript/JavaScript files

## Deployment
- Backend: Deployed on Render using `render.yaml`
- Frontend: Likely Vercel deployment
- Build command: `pip install -r requirements.txt` (backend)
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`