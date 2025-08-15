# PferdeWert.de

PferdeWert.de is an AI-assisted horse market value estimation platform. The project combines a Next.js 15 frontend with a FastAPI backend that uses dual AI (GPT/Claude) for accurate horse valuations.

## Architecture

- **Frontend**: Next.js 15 (Pages Router) + TypeScript + Tailwind + Stripe
- **Backend**: FastAPI + MongoDB + Dual AI (GPT/Claude)  
- **Deployment**: Frontend on Vercel, Backend on Render
- **Development**: Hetzner Cloud server for development
- **Voice Bot**: Whisper AI + Claude Code CLI integration

## Running in GitHub Codespaces

1. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app will be available at `https://<CODESPACE_HOST>-3000.app.github.dev`.

2. **Backend**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   The API is then reachable at `https://<CODESPACE_HOST>-8000.app.github.dev`.

Set the environment variables `OPENAI_API_KEY` and `PW_MODEL` in your Codespace so the backend can access the OpenAI model.

## Documentation

For detailed development guidelines and setup instructions, see:

- **[CLAUDE.md](./CLAUDE.md)** - Main development guide and architecture overview
- **[FRONTEND_CODING_GUIDELINES.md](./FRONTEND_CODING_GUIDELINES.md)** - React/Next.js standards
- **[TYPESCRIPT_GUIDELINES.md](./TYPESCRIPT_GUIDELINES.md)** - TypeScript and ESLint rules
- **[DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md)** - UI/UX design patterns
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and recent changes
- **[NOTION_VOICE_SETUP_COMPLETE.md](./NOTION_VOICE_SETUP_COMPLETE.md)** - Voice bot setup guide

