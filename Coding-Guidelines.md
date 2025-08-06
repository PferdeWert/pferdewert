# PferdeWert Coding Guidelines for AI-Generated Code

> **⚠️ IMPORTANT**: For detailed frontend guidelines, see [`FRONTEND_CODING_GUIDELINES.md`](./FRONTEND_CODING_GUIDELINES.md)

## 🎯 Quick Reference

### Frontend Development
- **Main Guidelines**: [`FRONTEND_CODING_GUIDELINES.md`](./FRONTEND_CODING_GUIDELINES.md) - Comprehensive React/Next.js patterns
- **TypeScript Rules**: [`TYPESCRIPT_GUIDELINES.md`](./TYPESCRIPT_GUIDELINES.md) - Type safety and ESLint configuration
- **Design System**: [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md) - UI/UX standards and tokens

### Backend Development
See [Backend Best Practices](#backend-api-best-practices) below.

---

## 🔧 Frontend Best Practices (Summary)

> **Full details in [`FRONTEND_CODING_GUIDELINES.md`](./FRONTEND_CODING_GUIDELINES.md)**

### Critical Rules
- **Always import all necessary modules**: Prevent `'X is not defined'` errors
- **Use custom logger**: `import { info, warn, error } from '@/lib/log'` instead of `console.log`
- **Follow TypeScript strict mode**: No `any` types, no `require()` imports
- **Async/await patterns**: Proper error handling with try/catch
- **Clean up unused imports**: Remove variables/imports that aren't needed
- **Update UI state**: Show loading spinners, handle errors, use `finally` blocks
- **React Hooks rules**: Call at top level, include dependency arrays in `useEffect`

---
## 🔧 Backend (API) Best Practices
### Input Validation
- **Always validate inputs** using Zod schemas before processing
- **Fail fast** with 400 responses for invalid data
- **Define expected shape** of `req.body` and `req.query` at handler start
### Imports & Dependencies  
- **Import all required libraries** and types (Next.js types, database utilities, config values)
- **Check each identifier** has proper import after AI generation
- **Remove unused imports** to keep code clean

### Async Operations
- **Always use async/await** for database calls and external APIs  
- **Await all promises** before sending responses
- **Handle parallel operations** explicitly with `Promise.all`
### Error Handling
- **Wrap external calls** in try/catch (database, Stripe, OpenAI APIs)
- **Log errors** with custom logger: `error('Message:', err)`
- **Return appropriate HTTP status**: 400 for bad input, 500 for server errors
- **Never let promises escape** - catch and handle all errors

### Response Management
- **Every code path must send response** exactly once
- **Return immediately** after `res.json()` or `res.end()`
- **Handle both success and error branches** explicitly
- **Avoid hanging requests** - review all logical branches

### Logging & Style
- **Use custom logger**: `import { info, warn, error } from '@/lib/log'`
- **Consistent code style** - same Prettier/ESLint rules as frontend
- **Remove console.log** before committing

---

## ✅ Pre-Commit Checklist

**For Frontend:**
- [ ] `npm run lint` passes without errors
- [ ] `npm run type-check` validates TypeScript  
- [ ] All imports are used and properly typed
- [ ] No `console.log` statements (use custom logger)

**For Backend:**
- [ ] All API routes have input validation
- [ ] Every code path sends exactly one response
- [ ] External calls wrapped in try/catch
- [ ] Custom logging instead of console methods

---

## 📚 Complete Documentation

- **[`FRONTEND_CODING_GUIDELINES.md`](./FRONTEND_CODING_GUIDELINES.md)** - Comprehensive React/Next.js patterns
- **[`TYPESCRIPT_GUIDELINES.md`](./TYPESCRIPT_GUIDELINES.md)** - TypeScript rules and ESLint configuration  
- **[`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md)** - UI/UX design standards and tokens
- **[`CLAUDE.md`](./CLAUDE.md)** - Project setup and development environment

> **Remember**: These guidelines help maintain code quality when using AI code generation. Always review and test AI-generated code against these standards.