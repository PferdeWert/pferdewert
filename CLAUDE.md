# CLAUDE.md

@docs/project-context.md
@docs/development-standards.md
@docs/extended-guides.md

## Pricing & Business Model
- **Service is PAID**: Pricing defined in `frontend/lib/pricing.ts`
- **NEVER use "kostenlos" / "free" in content or UI** - this is business-critical

## Architecture & Development
- **Frontend**: Next.js 15 (Pages Router) + TypeScript + Tailwind + Stripe
- **Backend**: FastAPI + MongoDB + Dual AI (GPT/Claude)
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

## Quick Access
- Use `/docs` for Claude Code capabilities and MCP guides
- Use Context7: "use context7" for current docs
- Agents: `pferdewert-frontend-dev`, `pferdewert-debugger`, `pferdewert-code-reviewer`
