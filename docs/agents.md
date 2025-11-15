# PferdeWert Specialized Agents

Comprehensive guide for using specialized AI agents designed for PferdeWert.de development workflows.

## Overview

PferdeWert uses specialized agents to optimize development efficiency and maintain high code quality. Each agent has deep knowledge of the horse valuation platform's architecture, coding standards, and business requirements.

## Available Agents

### pferdewert-code-reviewer
**Purpose**: Code review and quality assurance for PferdeWert-specific development

**Core Capabilities**:
- TypeScript strict mode compliance validation
- React/Next.js best practices enforcement
- ESLint rule adherence checking
- DSGVO compliance verification
- Stripe PCI DSS security review
- Mobile responsiveness validation
- Performance optimization suggestions
- AI integration error handling review

**When to Use**:
```bash
# New Feature Review
"I've implemented a new horse breed selection component with validation. Please review:"
[paste code]

# Payment System Changes
"Please review these Stripe webhook changes before I commit - critical for payment processing"

# Security-Sensitive Code
"Can you review this MongoDB query for potential security vulnerabilities?"

# Performance-Critical Updates  
"Review this bundle optimization - want to ensure no regressions"
```

**Review Checklist Agent Uses**:
- ✅ No `any` types used
- ✅ Proper error boundaries in React components
- ✅ Secure API key handling (no exposure in client code)
- ✅ DSGVO-compliant data collection patterns
- ✅ Stripe integration follows PCI DSS guidelines
- ✅ Mobile-first responsive design principles
- ✅ Proper TypeScript interfaces and types
- ✅ React hooks used correctly (dependencies, cleanup)
- ✅ Performance considerations (memoization, lazy loading)

**Example Review Output**:
```typescript
// ✅ APPROVED: Component follows PferdeWert standards
// ✅ TypeScript: Proper interfaces, no any types
// ✅ Security: No sensitive data exposure
// ⚠️  SUGGESTION: Add error boundary for better UX
// ❌ REQUIRED: Missing mobile responsiveness for dropdown
```

### pferdewert-debugger
**Purpose**: Debug and troubleshoot issues specific to the PferdeWert platform

**Core Capabilities**:
- React/Next.js hydration issue diagnosis
- FastAPI backend error analysis
- MongoDB query performance optimization
- Stripe payment failure investigation
- AI service timeout debugging
- Core Web Vitals performance analysis
- Mobile-specific rendering issues
- Cross-browser compatibility problems

**When to Use**:
```bash
# Payment System Issues
"Users getting 500 error during premium valuation checkout - payment page loads but fails on submit"

# AI Integration Problems
"Horse valuation API timing out after 30 seconds - users not getting results back"

# Frontend Rendering Issues
"Mobile users report horse breed dropdown not working on iOS Safari"

# Performance Problems
"Lighthouse score dropped to 65 - need to identify performance bottlenecks"
```

**Debugging Process Agent Follows**:
1. **Error Pattern Analysis**: Identifies common error signatures
2. **Stack Trace Investigation**: Analyzes console logs and error traces
3. **Network Request Monitoring**: Checks API calls and responses
4. **Browser Compatibility**: Tests across different browsers/devices
5. **Performance Profiling**: Identifies bottlenecks and optimization opportunities
6. **Root Cause Identification**: Pinpoints exact source of issues
7. **Solution Implementation**: Provides specific fixes with code examples

**Example Debug Output**:
```typescript
// 🔍 ISSUE IDENTIFIED: Stripe webhook timeout
// 📊 ANALYSIS: MongoDB query taking 8.2s (should be <200ms)
// 🎯 ROOT CAUSE: Missing index on 'stripe_session_id' field
// 🛠️  SOLUTION: Add compound index + query optimization
db.evaluations.createIndex({ stripe_session_id: 1, created_at: -1 })
```

### pferdewert-frontend-dev
**Purpose**: Specialized frontend development for PferdeWert.de

**Core Capabilities**:
- React component architecture with TypeScript
- Tailwind CSS responsive design implementation
- Stripe checkout integration and payment flows
- Form development with comprehensive validation
- Next.js Pages Router optimization
- WCAG accessibility compliance
- Mobile-first responsive design
- Performance optimization (Core Web Vitals)

**When to Use**:
```bash
# Component Development
"Create a multi-step horse evaluation form with validation and progress indicator"

# Payment Integration
"Implement Stripe Elements checkout with error handling and loading states"

# Mobile Optimization
"Optimize horse valuation form for mobile - current abandon rate is 60%"

# Accessibility Improvements
"Make the breed selection component WCAG 2.1 AA compliant"
```

**Development Standards Agent Enforces**:
- ✅ TypeScript strict mode (no any types)
- ✅ Tailwind utility classes (no custom CSS unless necessary)
- ✅ React hooks best practices (proper dependencies, cleanup)
- ✅ Mobile-first responsive design approach
- ✅ Accessibility attributes (ARIA labels, semantic HTML)
- ✅ Error handling with user-friendly messages
- ✅ Loading states for all async operations
- ✅ Form validation with real-time feedback

**Ratgeber-Specific Design Guidelines**:
When working on Ratgeber (guide) pages, the agent MUST follow `/SEO/SEO-DESIGN.md`:
- ✅ Layout: `fullWidth={true}` + `background="bg-gradient-to-b from-amber-50 to-white"`
- ✅ Text First: Semantic HTML as foundation, max. 2-4 highlight boxes per article
- ✅ Typography: Body text `text-lg` (NEVER `text-sm` - too small!)
- ✅ Images: Content-based naming (`horses-mountain-field.webp` NOT `hero-1.webp`)
- ✅ Components: Use `RatgeberHero`, `RatgeberTableOfContents`, `FAQ`, `RatgeberFinalCTA`
- ✅ CTAs: Always link to `/pferde-preis-berechnen` (NOT `/bewertung`)
- ✅ FAQ Schema: Auto-generated by `<FAQ>` component (NO manual schema!)
- ⚠️ Complete guidelines: `/SEO/SEO-DESIGN.md` (authoritative source)

**Example Implementation**:
```typescript
// Component created by pferdewert-frontend-dev
interface HorseEvaluationFormProps {
  onSubmit: (data: HorseEvaluationData) => Promise<void>;
  isLoading: boolean;
}

const HorseEvaluationForm: React.FC<HorseEvaluationFormProps> = ({
  onSubmit,
  isLoading
}) => {
  // Mobile-first responsive design
  // Comprehensive validation
  // Accessibility compliance
  // Error handling
};
```

### pferdewert-backend-architect
**Purpose**: Backend architecture expertise for PferdeWert.de

**Core Capabilities**:
- FastAPI performance optimization
- MongoDB schema design and indexing
- Stripe webhook reliability and error handling
- DSGVO-compliant data architecture
- API rate limiting and security
- Deployment strategy optimization
- Microservices architecture planning
- Database query performance tuning

**When to Use**:
```bash
# Performance Issues
"/api/bewertung endpoint taking 8+ seconds during peak hours - users abandoning forms"

# Compliance Requirements
"Design user account system that's DSGVO compliant for saved valuations"

# Payment Reliability
"Stripe payments completing but webhooks failing - users paying but not getting access"

# Scaling Challenges
"Need to handle 1000+ concurrent horse evaluations - current architecture bottlenecks?"
```

**Architecture Principles Agent Follows**:
- ✅ API-first design with OpenAPI documentation
- ✅ Database schema normalization and indexing
- ✅ Asynchronous processing for heavy operations
- ✅ Comprehensive error handling and logging
- ✅ Security by design (input validation, rate limiting)
- ✅ DSGVO compliance with data minimization
- ✅ Horizontal scaling capabilities
- ✅ Monitoring and observability integration

### pferdewert-seo-writer
**Purpose**: SEO content creation and optimization for PferdeWert.de

**Core Capabilities**:
- SEO-optimized content creation (1000-2500 words)
- Keyword-focused article structuring with H1-H6 hierarchy
- Horse industry expertise integration
- German equestrian market knowledge
- SERP competitor analysis and content gaps
- Internal linking strategy for PferdeWert.de
- FAQ and People Also Ask integration
- Meta descriptions and title tag optimization

**When to Use**:
```bash
# Content Outline Creation
"Create SEO content outline for 'Pferd kaufen Bayern' with 8 H2 sections and FAQ"

# Full Article Writing
"Write comprehensive guide on horse valuation targeting 'Pferdewert berechnen' keyword"

# Content Optimization
"Optimize existing horse breed page for better SERP rankings and user engagement"

# Competitor Content Analysis
"Analyze top 5 competitors for 'Warmblut kaufen' and identify content gaps"
```

**Content Standards Agent Follows**:
- ✅ Keyword density optimization (1-2% primary, semantic variations)
- ✅ Structured content hierarchy (H1 > H2 > H3 logical flow)
- ✅ Internal linking to relevant PferdeWert.de pages
- ✅ Horse industry authenticity and expertise demonstration
- ✅ German equestrian terminology and regional specifics
- ✅ User intent alignment (informational, commercial, transactional)
- ✅ SERP feature optimization (Featured Snippets, People Also Ask)
- ✅ Readability optimization for target audience

**Example Content Output**:
```markdown
# Pferd kaufen in Bayern: Der ultimative Ratgeber 2025

## H2: Die besten Regionen in Bayern für den Pferdekauf
### H3: München und Umgebung - Warmblut-Zentrum
### H3: Franken - Traditionale Zucht

## H2: Preise und Bewertung beim Pferdekauf
[Internal Link: PferdeWert.de Bewertung nutzen]

## FAQ: Häufige Fragen zum Pferdekauf in Bayern
```

### pferdewert-business-analyst
**Purpose**: SEO analytics, pricing strategy, and business intelligence

**Core Capabilities**:
- DataForSEO API integration for keyword research
- Competitor SERP analysis and positioning
- Conversion rate optimization strategies
- A/B testing framework design
- Revenue projection modeling
- Market intelligence gathering
- Organic traffic growth planning
- Business metrics dashboard creation

**When to Use**:
```bash
# SEO Optimization
"Analyze our keyword rankings for 'Pferd bewerten' and identify quick wins"

# Pricing Strategy
"Conversion rate at 9,90€ is 3.2% - should we test different price points?"

# Market Research
"How do we compare to competitors in the German horse valuation market?"

# Content Strategy
"Which horse breed keywords should we prioritize for new landing pages?"
```

**Business Intelligence Agent Provides**:
- 📊 Keyword ranking analysis with actionable insights
- 🎯 Competitor positioning and gap analysis
- 💰 Pricing elasticity recommendations
- 📈 Traffic growth opportunity identification
- 🔍 SERP feature optimization strategies
- 🏆 Conversion rate improvement tactics

## Agent Integration Workflows

### Code Review Process
```bash
# 1. Implementation (You/Claude)
# Implement feature following PferdeWert standards

# 2. Self-Validation
npm run lint && npm run type-check

# 3. Agent Review
"@pferdewert-code-reviewer Please review this implementation before commit"

# 4. Visual Testing (if frontend)
# Use Playwright MCP for visual validation

# 5. Commit
# Only after agent approval
```

### Debugging Workflow
```bash
# 1. Issue Identification
# User reports, monitoring alerts, error logs

# 2. Agent Diagnosis
"@pferdewert-debugger Investigate this payment failure issue"

# 3. Visual Debugging (if needed)
# Use Playwright MCP for frontend issues

# 4. Database Analysis (if needed)
# Use MongoDB MCP for data-related issues

# 5. Fix Implementation
# Code review with pferdewert-code-reviewer

# 6. Verification
# Test fix with original reproduction steps
```

### Feature Development Workflow
```bash
# 1. Requirements Analysis
"@pferdewert-business-analyst What's the market opportunity for this feature?"

# 2. Architecture Planning
"@pferdewert-backend-architect Design scalable architecture for user accounts"

# 3. Frontend Implementation
"@pferdewert-frontend-dev Create responsive horse evaluation form"

# 4. Code Review
"@pferdewert-code-reviewer Review implementation before deployment"

# 5. Testing & Deployment
# Playwright visual testing + production deployment
```

## Agent Capabilities Matrix

| Agent | TypeScript | React/Next.js | MongoDB | Stripe | SEO | Performance | Security |
|-------|------------|---------------|---------|--------|-----|-------------|----------|
| code-reviewer | ✅ Expert | ✅ Expert | ✅ Advanced | ✅ Expert | ✅ Basic | ✅ Advanced | ✅ Expert |
| debugger | ✅ Advanced | ✅ Expert | ✅ Expert | ✅ Advanced | ❌ None | ✅ Expert | ✅ Advanced |
| frontend-dev | ✅ Expert | ✅ Expert | ✅ Basic | ✅ Expert | ✅ Basic | ✅ Advanced | ✅ Advanced |
| backend-architect | ✅ Advanced | ❌ None | ✅ Expert | ✅ Expert | ❌ None | ✅ Expert | ✅ Expert |
| business-analyst | ❌ None | ❌ None | ✅ Basic | ❌ None | ✅ Expert | ✅ Basic | ❌ None |

## Best Practices

### Agent Selection Strategy
1. **Start with the most specialized agent** for the primary task
2. **Use code-reviewer as final validation** before commits
3. **Combine agents for complex tasks** (e.g., frontend-dev + business-analyst for conversion optimization)
4. **Leverage agent strengths** - don't use business-analyst for TypeScript issues

### Communication Tips
- **Be specific about context**: "This is for the horse evaluation form on mobile"
- **Provide error messages**: Include exact error text and stack traces
- **Share relevant code**: Paste the specific code sections being reviewed
- **Mention urgency**: "Critical payment issue affecting live users"

### Agent Limitations
- **No cross-agent communication**: Each agent works independently
- **Context window limits**: Keep requests focused and specific
- **No persistent memory**: Each interaction is stateless
- **Specialized knowledge only**: Don't use agents outside their expertise

## Integration with MCP Servers

All agents have access to:
- **Playwright MCP**: Visual validation and browser testing
- **MongoDB MCP**: Database operations and query optimization
- **Figma MCP**: Design system access (frontend-dev, business-analyst)
- **DataForSEO MCP**: SEO analytics and keyword research (business-analyst)
- **Filesystem MCP**: Code file access and analysis
- **Vercel MCP**: Deployment and production monitoring

## Monitoring Agent Effectiveness

Track these metrics to measure agent value:
- **Code Review Efficiency**: Time saved on manual review cycles
- **Bug Detection Rate**: Issues caught before production
- **Performance Improvements**: Core Web Vitals score improvements
- **Security Compliance**: DSGVO/PCI DSS violations prevented
- **Development Velocity**: Feature delivery speed increase

Remember: Agents are force multipliers, not replacements for good development practices!