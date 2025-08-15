# CLAUDE.md

PferdeWert.de - AI-assisted horse market value estimation platform.

## Architecture
- **Frontend**: Next.js 15 (Pages Router) + TypeScript + Tailwind + Stripe
- **Backend**: FastAPI + MongoDB + Dual AI (GPT/Claude)
- **Deployment**: Frontend on Vercel, Backend on Render
- **Development Server**: Hetzner Cloud (167.235.233.90) - Claude Code via Terminus mobile

## Development Commands
```bash
# Frontend
cd frontend && npm run dev     # Port 3000
npm run lint && npm run type-check  # REQUIRED before commits

# Backend  
cd backend && uvicorn main:app --reload --port 8000

# Hetzner Server Access
ssh dev@167.235.233.90
```

## Critical Rules
- **Never use `any` type** - ESLint enforced
- **No `require()`** - ES6 imports only
- **Always run lint + type-check before commits**
- **Use Context7**: Prefix prompts with "use context7" for current docs

## Key Files
- `pages/` - Next.js routes
- `components/` - React components  
- `lib/mongo.ts` - Database connection
- `types/global.d.ts` - Window extensions

## Detailed Guidelines
See separate files for full standards:
- **[FRONTEND_CODING_GUIDELINES.md](./FRONTEND_CODING_GUIDELINES.md)** - React/Next.js standards
- **[TYPESCRIPT_GUIDELINES.md](./TYPESCRIPT_GUIDELINES.md)** - TS/ESLint rules  
- **[DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md)** - UI/UX patterns

## Extended Documentation
For specialized workflows and tools:
- **[CLAUDE_AGENTS.md](./CLAUDE_AGENTS.md)** - pferdewert-* specialized agents
- **[CLAUDE_MCP.md](./CLAUDE_MCP.md)** - MCP server setup and integration
- **[CLAUDE_PLAYWRIGHT.md](./CLAUDE_PLAYWRIGHT.md)** - Browser automation and visual testing
- **[CLAUDE_GEMINI.md](./CLAUDE_GEMINI.md)** - Gemini CLI for token savings

## Quick References
- **Agents**: Use `pferdewert-frontend-dev`, `pferdewert-debugger`, `pferdewert-code-reviewer`
- **Visual Testing**: Always use Playwright MCP for frontend changes
- **Token Savings**: Use Gemini CLI for ESLint fixes, TypeScript types
- **Context7**: `"use context7 for Next.js 15"` for current docs