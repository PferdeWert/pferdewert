# Development Standards

## Critical Rules
- **Never use `any` type** - ESLint enforced for type safety
- **No `require()`** - ES6 imports only for consistency
- **Always run lint + type-check before commits** - Non-negotiable quality gate
- **SECURITY: No real API keys in documentation** - Always use placeholders like `your_api_key_here` in docs

## Code Quality Standards
- **TypeScript Strict Mode**: All new code must pass strict type checking
- **ESLint Compliance**: Zero warnings in production builds
- **Component Structure**: Follow existing patterns in `components/` directory
- **Database Patterns**: Use established patterns from `lib/mongo.ts`

## Development Workflow
- **Feature Branches**: Create feature branches for all changes
- **Code Reviews**: Required for all PRs
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update relevant docs for significant changes

## Context & Documentation Rules
- **Use Context7**: Prefix prompts with "use context7" for current docs
- **Auto-Check Documentation**: Always use `/docs` when questions arise about Claude Code capabilities, MCP, or available features
- **Memory Management**: Use `@docs/` imports for accessing extended documentation

## Deployment Standards
- **Pre-deployment Checklist**: 
  - Run `npm run lint && npm run type-check`
  - Run `npm run sitemap` to update SEO files
  - Verify all environment variables are set
  - Test critical user flows

## File Organization
- **Components**: Reusable UI components in `components/`
- **Pages**: Next.js routes in `pages/`
- **Types**: Global types in `types/global.d.ts`
- **Utils**: Helper functions in `lib/`
- **Documentation**: Extended docs in `docs/` directory