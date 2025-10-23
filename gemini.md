# Gemini.md

This file outlines the operating procedures and conventions for the Gemini CLI agent.

## Core Mandates

- **Conventions:** Rigorously adhere to existing project conventions when reading or modifying code. Analyze surrounding code, tests, and configuration first.
- **Libraries/Frameworks:** NEVER assume a library/framework is available or appropriate. Verify its established usage within the project before employing it.
- **Style & Structure:** Mimic the style, structure, and architectural patterns of existing code.
- **Idiomatic Changes:** Ensure changes integrate naturally and idiomatically.
- **Comments:** Add code comments sparingly, focusing on the *why* not the *what*.
- **Proactiveness:** Fulfill requests thoroughly, including adding tests.
- **Confirm Ambiguity/Expansion:** Do not take significant actions beyond the clear scope of the request without confirming.
- **Explaining Changes:** Do not provide summaries unless asked.

## Primary Workflows

### Software Engineering Tasks
1.  **Understand:** Use search and read tools to understand the codebase.
2.  **Plan:** Create and share a concise plan.
3.  **Implement:** Use available tools to act on the plan.
4.  **Verify (Tests):** Verify changes using the project's testing procedures.
5.  **Verify (Standards):** Run project-specific build, linting, and type-checking commands.
6.  **Finalize:** Consider the task complete after all verification passes.

### New Applications
1.  **Understand Requirements:** Analyze the user's request to identify core features, UX, and constraints.
2.  **Propose Plan:** Present a high-level summary of the application, technologies, features, and design.
3.  **User Approval:** Obtain user approval for the proposed plan.
4.  **Implementation:** Autonomously implement the application.
5.  **Verify:** Review work against the request and plan.
6.  **Solicit Feedback:** Provide instructions on how to start the application and request feedback.

## Tool Usage

- **File Paths:** Always use absolute paths.
- **Parallelism:** Execute independent tool calls in parallel.
- **Command Execution:** Use `run_shell_command` for shell commands, explaining modifying commands first.
- **Background Processes:** Use `&` for long-running commands.
- **Interactive Commands:** Inform the user about interactive commands.
- **Remembering Facts:** Use `save_memory` for user-specific facts or preferences.

## Project-Specific Information

- **Service is PAID**: Pricing defined in `frontend/lib/pricing.ts`
- **NEVER use "kostenlos" / "free" in content or UI** - this is business-critical
- **Use "KI" not "AI"**: German market prefers "KI" (Künstliche Intelligenz) over "AI" in all content and UI
- **Evaluation Duration is ALWAYS "2 Minuten"**: NEVER use "3 Minuten" or any other duration in content, UI, or AI-generated text - this is a critical accuracy requirement

## Critical Coding Patterns
- **Custom Logger**: `import { info, warn, error } from '@/lib/log'` - NEVER use console.log
- **No `any` type**: ESLint enforced, use proper interfaces
- **No `require()`**: ES6 imports only

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
