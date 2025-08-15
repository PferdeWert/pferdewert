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
ssh pferdewert-hetzner  # Configured alias in ~/.ssh/config
# Alternative: ssh dev@167.235.233.90
# SSH key is stored at: ~/.ssh/hetzner_key
# Claude CAN access the server when started with: c (alias for --dangerous-allow-all-permissions)
# Server: Ubuntu 24.04.3 LTS, Python 3.12.3, Node.js v20.19.4
```

## Critical Rules
- **Never use `any` type** - ESLint enforced
- **No `require()`** - ES6 imports only
- **Always run lint + type-check before commits**
- **Use Context7**: Prefix prompts with "use context7" for current docs
- **Claude Capabilities**: Use `/docs` command for Claude Code documentation and capabilities

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
- **[AGENTS.md](./AGENTS.md)** - pferdewert-* specialized agents
- **[GEMINI_CLI_SETUP.md](./GEMINI_CLI_SETUP.md)** - Gemini CLI setup and integration
- **[GEMINI_USAGE.md](./GEMINI_USAGE.md)** - Gemini CLI usage patterns for token savings
- **[WHISPER_TODO.md](./WHISPER_TODO.md)** - Whisper Voice Bot implementation guide

## Recent Additions
- **[CHANGELOG.md](./CHANGELOG.md)** - Project changelog with detailed version history
- **[NOTION_VOICE_SETUP_COMPLETE.md](./NOTION_VOICE_SETUP_COMPLETE.md)** - Complete Notion voice integration setup
- Voice bot scripts: `voice_bot.py`, `voice_bot_notion.py`, `notion_analyzer.py`, etc.

## Quick References
- **Agents**: Use `pferdewert-frontend-dev`, `pferdewert-debugger`, `pferdewert-code-reviewer`
- **Visual Testing**: Always use Playwright MCP for frontend changes
- **Token Savings**: Use Gemini CLI for ESLint fixes, TypeScript types
- **Context7**: `"use context7 for Next.js 15"` for current docs
- **Voice Bot**: Whisper transcription → Claude Code CLI integration on Hetzner server
- **Notion Integration**: Voice-controlled diary entries and workspace management