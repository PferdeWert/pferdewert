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

### Coding Guidelines Documentation
**IMPORTANT: All AI agents and developers must follow these guidelines:**

- **[`FRONTEND_CODING_GUIDELINES.md`](./FRONTEND_CODING_GUIDELINES.md)** - **PRIMARY** React/Next.js development standards
- **[`TYPESCRIPT_GUIDELINES.md`](./TYPESCRIPT_GUIDELINES.md)** - TypeScript rules and ESLint configuration
- **[`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md)** - UI/UX design standards and component patterns
- **[`Coding-Guidelines.md`](./Coding-Guidelines.md)** - General best practices and backend API standards

### Pre-commit Requirements
```bash
npm run lint       # Must return 0 errors
npm run type-check # Must return 0 errors
```

**CRITICAL: Claude must ALWAYS run these commands before any git commit!**
- Never commit without running lint and type-check first
- This prevents runtime errors, hydration issues, and TypeScript problems
- If either command fails, fix the issues before committing

### Key Frontend Standards (see FRONTEND_CODING_GUIDELINES.md for details)
- **Context7 Usage**: ALWAYS prefix development prompts with "use context7" for current documentation
- **Import all modules**: Prevent `'X is not defined'` errors
- **Custom logging**: Use `import { info, warn, error } from '@/lib/log'` instead of `console.log`
- **TypeScript strict**: No `any` types, no `require()` imports
- **Async patterns**: Proper try/catch, loading states, error handling
- **React Hooks**: Top-level only, dependency arrays, cleanup functions
- **Responsive design**: Mobile-first with Tailwind classes
- **Accessibility**: Semantic HTML, ARIA attributes, form labels

### Backend Best Practices
- **Context7 Usage**: ALWAYS prefix development prompts with "use context7" for current documentation
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

## Playwright MCP Integration

### Overview
The Playwright MCP server enables autonomous browser automation for testing, visual validation, and iterative UI development. This dramatically improves the quality of frontend work by allowing real-time visual feedback and iteration.

### Key Use Cases

#### 1. Visual Change Validation
**IMPORTANT**: Always use the Playwright MCP server when making visual changes to the front-end to check your work.

```typescript
// After making UI changes:
mcp__ide__executeCode({ code: `
  // Navigate to the changed page
  await page.goto('http://localhost:3000/bewertung');
  
  // Take screenshot for visual validation
  await page.screenshot({ path: 'ui-changes.png', fullPage: true });
  
  // Check specific element visibility
  await expect(page.locator('.hero-section')).toBeVisible();
`});
```

#### 2. UI/UX Iteration
When redesigning features, use Playwright to:
- Take screenshots after each major change
- Compare before/after states
- Validate responsive design across viewports
- Ensure animations and transitions work correctly

Example workflow:
```typescript
// Test responsive design
const viewports = [
  { width: 375, height: 667 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1920, height: 1080 }  // Desktop
];

for (const viewport of viewports) {
  await page.setViewportSize(viewport);
  await page.screenshot({ path: `design-${viewport.width}.png` });
}
```

#### 3. Debugging & Error Detection
Use Playwright to:
- Check console logs for errors
- Monitor network requests
- Validate API responses
- Detect hydration issues

```typescript
// Listen for console errors
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.error('Console error:', msg.text());
  }
});

// Monitor failed network requests
page.on('requestfailed', request => {
  console.error('Request failed:', request.url());
});
```

#### 4. Form & Interactive Element Testing
Test complex interactions:
```typescript
// Test horse valuation form
await page.fill('input[name="horseName"]', 'Thunder');
await page.selectOption('select[name="breed"]', 'warmblood');
await page.fill('input[name="age"]', '8');
await page.click('button[type="submit"]');

// Wait for and validate results
await page.waitForSelector('.valuation-result');
const result = await page.textContent('.price-estimate');
expect(result).toContain('€');
```

#### 5. Performance & Lighthouse Integration
```typescript
// Measure performance metrics
const metrics = await page.evaluate(() => ({
  FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
  LCP: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
  CLS: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0)
}));
```

### Best Practices

1. **Always validate visual changes**: After any CSS/component changes, take screenshots
2. **Test critical user paths**: Form submissions, payment flows, navigation
3. **Check accessibility**: Use Playwright's accessibility tree inspection
4. **Monitor performance**: Track loading times and Core Web Vitals
5. **Cross-browser testing**: Test in Chromium, Firefox, and WebKit

### Common Playwright Commands for PferdeWert

```typescript
// Navigate to main pages
await page.goto('http://localhost:3000');
await page.goto('http://localhost:3000/bewertung');
await page.goto('http://localhost:3000/result/[id]');

// Test language switching
await page.click('button[aria-label="Language selector"]');
await page.click('button:has-text("English")');
await expect(page.locator('h1')).toContainText('Market Value');

// Test PDF generation
await page.click('button:has-text("PDF herunterladen")');
const download = await page.waitForEvent('download');
expect(download.suggestedFilename()).toContain('.pdf');

// Test Stripe payment flow
await page.click('button:has-text("Premium-Bewertung")');
await page.waitForURL(/checkout\.stripe\.com/);
```

### Integration Tips

1. **Before commits**: Run visual regression tests
2. **During development**: Keep Playwright running to see changes in real-time
3. **For bug fixes**: Reproduce the bug with Playwright first, then fix and verify
4. **For new features**: Build with Playwright feedback loop for optimal UX

Remember: The goal is to "see" what you're building and iterate based on visual feedback, not just code changes in isolation.

## PferdeWert UX Designer Agent

### Overview
The specialized UX Designer Agent (`pferdewert-ux-designer`) is available for UI/UX design tasks specific to PferdeWert.de. This agent combines conversion optimization expertise with deep knowledge of the horse valuation platform's user needs.

### When to Use the UX Agent
Use the `pferdewert-ux-designer` agent for:
- **Conversion optimization** - Improving form completion rates, pricing page performance
- **SEO-driven design decisions** - Using DataForSEO insights for keyword-optimized headlines and content hierarchy
- **Competitor UX analysis** - SERP-based analysis of competitor positioning and features
- **Mobile experience improvements** - Mobile SERP optimization and responsive design
- **Form flow enhancements** - Optimizing horse valuation form user journey
- **Content strategy** - Search volume-based content prioritization and landing page optimization
- **Local SEO optimization** - Optimizing for regional horse markets and location-based searches

### Agent Capabilities
The UX agent has access to:
- **DataForSEO MCP**: Keyword research, SERP analysis, competitor insights, search volume data
- **Playwright MCP**: Visual validation and responsive testing
- **Figma MCP**: Access to design system, components, and assets
- **Conversion expertise**: Focus on hobby/leisure horse owners (target audience)
- **Performance optimization**: Core Web Vitals and mobile-first design
- **Trust building**: Design elements that establish AI valuation credibility

### Usage Examples
```
// SEO-driven UX optimization
"Analyze top keywords for horse valuation and optimize our landing page headlines and content hierarchy"

// Competitor SERP analysis
"Research how competitors position themselves in 'Pferd bewerten' search results and improve our UX accordingly"

// Mobile SERP optimization
"What SERP features does Google show for horse valuation queries? How should we optimize our mobile experience?"

// Conversion + SEO integration
"Use search volume data to prioritize which conversion elements to A/B test first"

// Traditional UX optimization
"Our horse valuation form has a high abandonment rate on mobile devices. Can you help optimize it?"
```

### Integration with Development Workflow
1. **SEO Research**: Uses DataForSEO to analyze keywords, competitors, and SERP features
2. **Pre-design**: Agent uses Playwright to screenshot current state
3. **Design research**: Accesses Figma files for existing design system
4. **Content strategy**: Prioritizes design elements based on search volume and competition data
5. **Prototype creation**: Builds HTML/CSS mockups with SEO-optimized content hierarchy
6. **Validation**: Uses Playwright to test across devices and viewports
7. **SERP optimization**: Ensures design works well with Google's mobile and desktop SERP features
8. **Implementation specs**: Provides detailed specs with Figma component mappings and SEO considerations

The UX agent maintains consistency with the existing design system while focusing on measurable conversion improvements and mobile experience optimization. All specific UI/UX design guidelines are integrated directly into the agent's system configuration.

## PferdeWert Specialized Agents

### Overview
The project includes specialized agents designed specifically for PferdeWert.de development workflows. These agents have deep knowledge of the horse valuation platform's architecture, coding standards, and business requirements.

### Available Agents

#### pferdewert-code-reviewer
**Purpose**: Code review and quality assurance for PferdeWert-specific development
**Use Cases**:
- Review new features and bug fixes before merging
- Ensure TypeScript compliance and ESLint standards
- Validate React/Next.js best practices specific to PferdeWert
- Check for proper error handling in AI integration code
- Verify DSGVO compliance and security best practices
- Review payment processing and Stripe integration changes

**When to Use**:
```
// After implementing new features
"I've just finished implementing the new horse breed selection component with improved validation. Here's the code:"

// Before critical changes
"Please review these changes to the Stripe webhook handler before I commit them."

// For security-sensitive code
"Can you review this MongoDB query for potential security issues?"
```

#### pferdewert-debugger  
**Purpose**: Debug and troubleshoot issues specific to the PferdeWert platform
**Use Cases**:
- Frontend React/Next.js errors and hydration issues
- Backend FastAPI integration problems
- MongoDB connection and query optimization
- Stripe payment failures and webhook debugging
- AI service (OpenAI/Claude) timeout and error handling
- Performance issues and Core Web Vitals optimization
- Mobile-specific UI/UX problems

**When to Use**:
```
// Payment system issues
"Users are getting an error when trying to purchase premium valuations. The checkout page loads but payment fails with a 500 error."

// AI integration problems
"The horse valuation form is hanging and users aren't getting results back. It seems to timeout after 30 seconds."

// Mobile rendering issues
"Several users reported that the horse breed dropdown isn't working on mobile devices."
```

#### pferdewert-frontend-dev
**Purpose**: Specialized frontend development for PferdeWert.de with React, TypeScript, and Tailwind
**Use Cases**:
- React component creation and TypeScript implementation
- Tailwind CSS styling and responsive design
- Stripe payment integration and checkout flows
- Form development with proper validation
- Next.js Pages Router functionality
- Accessibility improvements and WCAG compliance
- Mobile-first responsive design optimization

**When to Use**:
```
// Component creation
"I need to create a dropdown component for horse breed selection with proper TypeScript types and validation"

// Payment integration
"The checkout flow needs to handle form data and redirect to Stripe properly"

// Mobile optimization
"Users are reporting the horse evaluation form is hard to use on mobile devices"
```

#### pferdewert-backend-architect
**Purpose**: Backend architecture expertise for PferdeWert.de FastAPI, MongoDB, and infrastructure
**Use Cases**:
- FastAPI optimization and performance improvements
- MongoDB schema design and query optimization
- Stripe payment integration and webhook handling
- DSGVO-compliant data architecture
- API performance bottlenecks and scaling
- Deployment strategies and infrastructure
- Security best practices and compliance

**When to Use**:
```
// Performance issues
"Our /api/bewertung endpoint is taking 8+ seconds to respond during peak hours. Users are abandoning the form."

// Compliance requirements
"We want to add user accounts so people can save their horse valuations, but we need to stay DSGVO compliant."

// Payment reliability
"Some Stripe payments are completing but our webhook isn't processing them reliably. Users pay but don't get access to premium features."
```

#### pferdewert-business-analyst
**Purpose**: SEO analytics, pricing strategy, and business intelligence for PferdeWert.de
**Use Cases**:
- SEO analytics and keyword ranking analysis using DataforSEO APIs
- Competitor research and market intelligence
- Conversion rate optimization and A/B testing strategies
- Revenue projections and pricing elasticity analysis
- Organic traffic growth opportunities
- Business performance metrics and KPI tracking

**When to Use**:
```
// SEO optimization
"Can you analyze our current keyword rankings and identify quick wins for organic traffic growth?"

// Pricing strategy
"Our conversion rate at 9,90€ seems lower than expected. Should we test different price points?"

// Market analysis
"I want to understand how we compare to competitors in the German horse valuation market"
```

### Agent Integration with Development Workflow

#### Code Review Process
1. **Implementation**: Write code following PferdeWert standards
2. **Self-check**: Run `npm run lint` and `npm run type-check`
3. **Agent Review**: Use `pferdewert-code-reviewer` for specialized review
4. **Testing**: Use Playwright MCP for visual validation
5. **Commit**: Only after all checks pass

#### Debugging Workflow
1. **Issue Identification**: User reports or monitoring alerts
2. **Initial Analysis**: Use `pferdewert-debugger` for specialized diagnosis  
3. **Visual Debugging**: Use Playwright MCP for frontend issues
4. **Database Debugging**: Use MongoDB MCP for data issues
5. **Fix Implementation**: Code review with `pferdewert-code-reviewer`
6. **Verification**: Test fix with original reproduction steps

### Agent Capabilities
All specialized agents have access to:
- **Full MCP Server Stack**: Playwright, MongoDB, Figma, Filesystem, **DataForSEO** (UX Agent)
- **PferdeWert Architecture Knowledge**: Next.js Pages Router, FastAPI backend, dual AI system
- **Business Context**: Horse valuation domain expertise, target audience understanding
- **Compliance Requirements**: DSGVO, PCI DSS for payments, TypeScript strict mode
- **Performance Standards**: Core Web Vitals targets, mobile-first optimization
- **SEO Intelligence**: Keyword research, competitor analysis, SERP optimization (UX Agent)

### Usage Examples

#### Code Review Agent
```typescript
// Agent will check for:
// - TypeScript strict mode compliance
// - Proper error boundaries in React components  
// - Secure API key handling
// - DSGVO-compliant data collection
// - Stripe PCI DSS requirements
// - Mobile responsiveness
```

#### Debugger Agent  
```typescript
// Agent will analyze:
// - Console errors and stack traces
// - Network request failures
// - Database query performance
// - AI service response times
// - Payment flow interruptions
// - Cross-browser compatibility issues
```

### Best Practices
1. **Use agents proactively**: Don't wait for issues to escalate
2. **Combine agents**: Code review → implementation → debugging → review cycle
3. **Leverage MCP integration**: Agents can directly test and validate using Playwright
4. **Document findings**: Agents help update this CLAUDE.md with new patterns and solutions

## MCP Server Integration Status

### Overview
This project uses multiple MCP (Model Context Protocol) servers for enhanced AI capabilities. Different servers are available in Claude Desktop vs Claude Code due to platform limitations.

### Available MCP Servers

#### Claude Code (claude.ai/code) - Fully Supported
✅ **MongoDB Atlas**: Database operations and cluster management
- Command: `npx mcp-mongodb-atlas`
- Env: `ATLAS_PUBLIC_KEY`, `ATLAS_PRIVATE_KEY`

✅ **MongoDB**: Direct database queries and operations  
- Command: `npx mongo-mcp [connection-string]`
- Used for PferdeWert database operations

✅ **Playwright**: Browser automation and visual testing
- Command: `npx @playwright/mcp`
- **CRITICAL**: Always use when making visual changes to frontend
- Enables autonomous UI iteration and testing

✅ **Figma**: Design system access and asset management
- Command: `npx figma-mcp`
- Env: `FIGMA_ACCESS_TOKEN`
- Integrates with UX Designer Agent

✅ **Filesystem**: File operations on Desktop and Downloads
- Command: `npx -y @modelcontextprotocol/server-filesystem`
- Paths: `/Users/benjaminreder/Desktop`, `/Users/benjaminreder/Downloads`

✅ **Vercel**: Deployment and project management
- Command: `npx --package @vercel/sdk mcp start`
- Auth: Bearer token for API access

✅ **Zilliz**: Vector database and code context for debugging/review agents
- Command: `npx @zilliz/claude-context-mcp@latest`
- Env: `MILVUS_TOKEN`, `ZILLIZ_CLOUD_URI`, `OPENAI_API_KEY`
- **Use Case**: Code debugging, review agents, semantic search

✅ **Context7**: Dynamic documentation injection for up-to-date AI suggestions
- Command: `npx @upstash/context7-mcp@latest`
- **CRITICAL**: Always use "use context7" prefix for current documentation
- **Use Cases**: Prevent outdated API suggestions, get latest library versions
- **Examples**: "use context7 for Next.js 15", "use context7 for FastAPI", "use context7 for Stripe"

#### Claude Desktop Only - Limited Claude Code Support
⚠️ **Notion**: Workspace and document access
- **Claude Desktop**: Full integration with OAuth
- **Claude Code**: Server connects but tools not available
- OAuth required via Notion App → Settings → Connections → Notion MCP

### MCP Server Configuration Differences

#### Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer NOTION_TOKEN_REMOVED\", \"Notion-Version\": \"2022-06-28\" }"
      }
    }
  }
}
```

#### Claude Code (`~/.claude.json`)
```json
{
  "mcpServers": {
    "notion": {
      "type": "stdio", 
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.notion.com/mcp"],
      "env": {}
    }
  }
}
```

### Current Project Integration Status

#### Development Environment
- **Primary**: Claude Code for development, testing, and database operations
- **Secondary**: Claude Desktop for Notion workspace access and project management
- **MCP Server Health**: All servers connected and operational

#### Workflow Recommendations
1. **Code Development**: Use Claude Code with Playwright for visual validation
2. **Database Operations**: MongoDB MCP for PferdeWert data management  
3. **Design Work**: Figma MCP + UX Designer Agent in Claude Code
4. **Project Planning**: Notion MCP in Claude Desktop for roadmap and documentation
5. **Deployment**: Vercel MCP for production management

### Known Limitations
- **Notion MCP Tools**: Not available as `mcp__notion__` in Claude Code
- **OAuth Dependencies**: Some servers require external authentication flows
- **Platform Differences**: Full MCP tool integration varies between Claude platforms

## Gemini CLI Integration - Token-Einsparung

### Overview
PferdeWert nutzt Gemini CLI für einfache Code-Tasks, um Claude Tokens zu sparen (60-80% Einsparung bei Routine-Tasks).

### Task Distribution Strategy

#### Use Gemini CLI for (FREE - 1,000 requests/day):
- **ESLint fixes**: `gemini -p "Fix all ESLint errors in frontend/components/"`
- **TypeScript types**: `gemini -p "Add proper TypeScript types to this component"`
- **Unit tests**: `gemini -p "Generate unit tests for this function"`
- **Code formatting**: `gemini -p "Format this code according to project standards"`
- **Simple refactoring**: `gemini -p "Extract this logic into a reusable hook"`
- **Documentation**: `gemini -p "Add JSDoc comments to these functions"`
- **CSS/Tailwind**: `gemini -p "Convert this CSS to Tailwind classes"`

#### Keep Claude Code for (Token-intensive):
- **Architecture decisions**: Complex system design and planning
- **Database operations**: MongoDB queries, schema design
- **AI integration**: OpenAI/Claude API implementation
- **Business logic**: Horse valuation algorithms, pricing logic
- **Payment flows**: Stripe integration, webhook handling
- **Performance optimization**: Core Web Vitals, bundle size
- **Security**: DSGVO compliance, authentication
- **Specialized agents**: pferdewert-* agents for deep context

### Gemini CLI Configuration

**~/.gemini/settings.json:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "FILESYSTEM_ALLOWED_PATHS": "/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp@latest"]
    }
  },
  "usageStatisticsEnabled": false
}
```

**Note**: MongoDB access intentionally excluded - database operations remain with Claude for security and complexity reasons.

### Usage Examples

```bash
# Quick ESLint fixes
cd pferdewert
gemini -p "Fix ESLint errors in frontend/pages/bewertung.tsx"

# Performance optimizations (SHOULD BE GEMINI FIRST!)
gemini -p "Fix font loading performance - replace blocking @import with preconnect"
gemini -p "Optimize responsive image sizes for mobile performance"

# Generate TypeScript interfaces
gemini -p "Create TypeScript interfaces for the horse evaluation form data"

# Write tests
gemini -p "Write unit tests for frontend/lib/pdfLayout.ts"

# Refactor components
gemini -p "Extract the form validation logic into a custom hook"
```

### Critical Decision Rule: Gemini First!
**IMPORTANT**: Always ask "Could Gemini do this?" before using Claude tokens:

✅ **Use Gemini First**:
- Performance optimizations (font loading, image sizing, CSS)
- ESLint fixes and TypeScript errors
- Simple refactoring and code cleanup
- Tailwind CSS optimizations
- Component styling and responsive design

❌ **Keep for Claude**:
- Architecture decisions and complex system design
- Database operations and AI integration
- Business logic and payment flows
- Specialized agent tasks (debugging, review)
- Security and DSGVO compliance

### Agent-Specific Guidelines

#### pferdewert-frontend-dev
- Simple component creation → Gemini
- Complex state management → Claude
- Tailwind styling → Gemini
- Stripe integration → Claude

#### pferdewert-debugger
- Console error fixes → Gemini
- Performance debugging → Claude
- TypeScript errors → Gemini
- API integration issues → Claude

#### pferdewert-code-reviewer
- ESLint compliance → Can delegate to Gemini first
- Architecture review → Claude only
- Security review → Claude only

### Cost Optimization Results
- **Gemini**: 1,000 free requests/day
- **Claude**: Reserved for complex tasks requiring deep context
- **Estimated savings**: 60-80% reduction in Claude token usage
- **Monthly cost reduction**: ~$30-40 for typical development workflow

### How to Set Up a New MCP Server in Claude Code

#### Step-by-Step Guide

1. **Add the MCP Server**
```bash
claude mcp add [server-name] [command] [args...]
```

2. **Configure Environment Variables**
Edit `~/.claude.json` and add required env vars to the server configuration:
```json
{
  "mcpServers": {
    "your-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["your-package"],
      "env": {
        "API_KEY": "your-api-key",
        "OTHER_CONFIG": "value"
      }
    }
  }
}
```

3. **Test the Connection**
```bash
claude mcp list
```
Look for ✅ **Connected** status.

#### Real Example: Zilliz MCP Server Setup

**Problem**: Zilliz needed multiple environment variables that weren't obvious from documentation.

**Solution**:
1. **Add the server**:
```bash
claude mcp add zilliz npx @zilliz/claude-context-mcp@latest
```

2. **Configure environment variables** (the key was discovering OpenAI API Key was required):
```json
{
  "mcpServers": {
    "zilliz": {
      "type": "stdio",
      "command": "npx",
      "args": ["@zilliz/claude-context-mcp@latest"],
      "env": {
        "MILVUS_TOKEN": "your-milvus-token",
        "ZILLIZ_CLOUD_URI": "https://your-cluster.api.region.zillizcloud.com",
        "OPENAI_API_KEY": "$OPENAI_API_KEY"
      }
    }
  }
}
```

3. **Result**: `claude mcp list` shows `zilliz: ✅ Connected`

#### Troubleshooting MCP Server Issues

**"Failed to connect" Status**:
- ✅ Check if all required environment variables are set
- ✅ Try running the command directly to see error messages:
  ```bash
  MILVUS_TOKEN="token" ZILLIZ_CLOUD_URI="uri" npx @zilliz/claude-context-mcp@latest
  ```
- ✅ Check the package name and version (use `@latest` for newest)

**"Needs authentication" Status**:
- ✅ Some servers require OAuth flows (like Notion)
- ✅ Check the MCP server's documentation for auth requirements
- ✅ May need external app configuration first

**Server Connected but Tools Not Available**:
- ⚠️ **Known Limitation**: Claude Code only exposes tools (`mcp__server__`) for predefined servers
- ✅ **Workaround**: Server still works in background for specialized tasks (embeddings, context, etc.)
- ✅ For full tool access, use Claude Desktop with `claude_desktop_config.json`

#### Finding Configuration Requirements

1. **Check existing settings**: Look in `.claude/settings.local.json` for working examples
2. **Run server directly**: Execute the MCP command manually to see error messages
3. **Check documentation**: Visit the MCP server's GitHub/npm page
4. **Environment variables**: Use `$VAR_NAME` syntax to reference system env vars

### Setup Commands
```bash
# Check all MCP server status
claude mcp list

# Add new MCP server (Claude Code)
claude mcp add [name] [command] [args...]

# Add HTTP/SSE server (Claude Code)  
claude mcp add --transport [http|sse] [name] [url]

# Remove MCP server
claude mcp remove [name]

# Test server directly (for debugging)
[ENV_VARS] npx [package-name]
```