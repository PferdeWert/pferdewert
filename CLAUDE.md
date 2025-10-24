# CLAUDE.md

## 🚨 Critical Rules (Always Active)

### Pricing & Business Model
- **Service is PAID**: Pricing defined in `frontend/lib/pricing.ts`
- **NEVER use "kostenlos" / "free" in content or UI** - this is business-critical

## Content & Localization
- **Use "KI" not "AI"**: German market prefers "KI" (Künstliche Intelligenz) over "AI" in all content and UI
- **Evaluation Duration is ALWAYS "2 Minuten"**: NEVER use "3 Minuten" or any other duration in content, UI, or AI-generated text - this is a critical accuracy requirement

## Critical Coding Patterns
- **Custom Logger**: `import { info, warn, error } from '@/lib/log'` - NEVER use console.log
- **No `any` type**: ESLint enforced, use proper interfaces
- **No `require()`**: ES6 imports only

## Common Anti-Patterns to Avoid
- ❌ `useEffect(async () => {})` - breaks React rules
- ✅ Create async function inside useEffect
- ❌ Missing dependency arrays in useEffect
- ❌ Not awaiting promises before sending API responses
- ❌ Using "kostenlos" or "free" in content (PAID service!)

## Architecture & Development
- **Frontend**: Next.js 15 (Pages Router) + TypeScript + Tailwind + Stripe
- **Backend**: FastAPI + MongoDB + Dual KI (GPT/Claude)
- **Deployment**: Frontend on Vercel, Backend on Render

## Development Commands
```bash
# Frontend
cd frontend && npm run dev     # Port 3000
npm run lint && npm run type-check  # REQUIRED before commits
npm run sitemap                # Generate sitemap.xml & robots.txt (vor deployment)

# Backend  
cd backend && uvicorn main:app --reload --port 8000

# Hetzner Server Access
ssh pferdewert-hetzner  # Configured alias in ~/.ssh/config
```

## Key Files
- `pages/` - Next.js routes
- `components/` - React components
- `lib/mongo.ts` - Database connection
- `types/global.d.ts` - Window extensions

## Troubleshooting
- **Evaluations Issues**: See [troubleshooting-evaluations.md](docs/troubleshooting-evaluations.md) for scripts to fix incomplete evaluations
  - **CRITICAL**: Use `MONGODB_DB=test` for evaluation scripts (not `pferdewert` database)

## Quick Access
- Use `/docs` for Claude Code capabilities and MCP guides
- Use Context7: "use context7" for current docs
- Agents: `pferdewert-frontend-dev`, `pferdewert-debugger`, `pferdewert-code-reviewer`

---

## 📁 Extended Documentation (Load on-demand)

When you need detailed information about specific areas, refer to these docs:

### Core Documentation
- **[project-context.md](docs/project-context.md)** - Vision, mission, target users, value propositions, business priorities
- **[development-standards.md](docs/development-standards.md)** - Critical coding rules, quality standards, deployment checklist
- **[extended-guides.md](docs/extended-guides.md)** - Specialized agents, MCP troubleshooting, server access, additional guides

### Specialized Guides
- **[frontend-guidelines.md](docs/frontend-guidelines.md)** - React/Next.js standards
- **[typescript-guidelines.md](docs/typescript-guidelines.md)** - TS/ESLint rules
- **[design-guidelines.md](docs/design-guidelines.md)** - UI/UX patterns
- **[agents.md](docs/agents.md)** - pferdewert-* specialized agents
- **[security-fixes.md](docs/security-fixes.md)** - Security implementation guide
- **[troubleshooting-evaluations.md](docs/troubleshooting-evaluations.md)** - Evaluation debugging scripts

### Advanced Topics
- **[gemini/setup.md](docs/gemini/setup.md)** - Gemini CLI setup and integration
- **[gemini/usage.md](docs/gemini/usage.md)** - Gemini CLI usage patterns for token savings
- **[notion-voice-setup.md](docs/notion-voice-setup.md)** - Complete Notion voice integration setup

> **Note**: These docs are NOT automatically loaded. Use the Read tool to access them only when needed.
