# Gemini CLI Integration - Token Optimization Strategy

Comprehensive guide for using Gemini CLI to reduce Claude token consumption by 60-80% while maintaining code quality for PferdeWert.de development.

## Overview

PferdeWert implements a dual-AI strategy: **Gemini CLI for routine tasks (FREE)** + **Claude Code for complex architecture (PAID)**. This approach optimizes development costs while maintaining high-quality output.

**Cost Impact**: ~$30-40 monthly savings + 1,000 free Gemini requests daily

## Setup

### Gemini CLI Configuration
**~/.gemini/settings.json:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "FILESYSTEM_ALLOWED_PATHS": "/path/to/pferdewert"
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

**Security Note**: MongoDB access intentionally excluded - database operations remain with Claude for security and complexity reasons.

## Task Distribution Strategy

### ✅ Use Gemini CLI First (FREE - 1,000 requests/day)

#### Code Quality & Maintenance
```bash
# ESLint fixes
gemini -p "Fix all ESLint errors in frontend/components/"

# TypeScript improvements
gemini -p "Add proper TypeScript types to this component"
gemini -p "Fix TypeScript strict mode violations"

# Code formatting
gemini -p "Format this code according to project standards"
gemini -p "Clean up unused imports and variables"
```

#### Performance Optimizations
```bash
# Font loading optimization
gemini -p "Fix font loading performance - replace blocking @import with preconnect"

# Image optimization
gemini -p "Optimize responsive image sizes for mobile performance"

# CSS optimization
gemini -p "Convert this CSS to Tailwind classes for better performance"
```

#### Testing & Documentation
```bash
# Unit tests
gemini -p "Generate unit tests for frontend/lib/pdfLayout.ts"

# JSDoc comments
gemini -p "Add comprehensive JSDoc comments to these functions"

# Component documentation
gemini -p "Create documentation for this React component's props and usage"
```

#### Simple Refactoring
```bash
# Extract logic
gemini -p "Extract the form validation logic into a custom hook"

# Component splitting
gemini -p "Split this large component into smaller, focused components"

# Utility functions
gemini -p "Extract repeated logic into reusable utility functions"
```

### ❌ Keep for Claude Code (Token-intensive)

#### Complex Architecture
- System design decisions
- Database schema planning
- API architecture design
- Microservices planning
- Integration patterns

#### Business Logic
- Horse valuation algorithms
- Pricing strategy implementation
- Complex validation rules
- Multi-step form logic
- Payment processing flows

#### Specialized Tasks
- DSGVO compliance implementation
- Security architecture
- Performance profiling
- Specialized agent usage
- Cross-system integrations

## Decision Framework: "Gemini First" Rule

**Before using Claude tokens, ask:**

### Quick Decision Tree
```
Is this task...?
├── Syntax/formatting? → Gemini
├── Simple TypeScript fix? → Gemini  
├── CSS/Tailwind styling? → Gemini
├── Unit test creation? → Gemini
├── Documentation? → Gemini
├── Performance optimization? → Try Gemini first
├── Architecture design? → Claude
├── Business logic? → Claude
├── Security implementation? → Claude
└── Database operations? → Claude
```

### Examples by Complexity

#### ✅ Gemini-First Tasks
```bash
# Performance (80% of cases can be handled by Gemini)
gemini -p "Optimize this React component for better performance"

# Styling (95% Gemini success rate)
gemini -p "Make this component mobile-responsive with Tailwind"

# Testing (90% Gemini success rate)
gemini -p "Create Jest tests for this utility function"

# TypeScript (85% Gemini success rate for simple fixes)
gemini -p "Fix TypeScript errors in this component"
```

#### ❌ Claude-Only Tasks
```bash
# Complex system integration
"Design a DSGVO-compliant user account system with MongoDB"

# Business logic
"Implement horse valuation algorithm with market data integration"

# Architecture decisions
"Plan microservices architecture for scaling to 10k users"

# Security implementation
"Implement secure payment processing with Stripe webhooks"
```

## Agent-Specific Guidelines

### pferdewert-frontend-dev
**Gemini First**:
- Component styling and responsive design
- Simple React hooks implementation
- Tailwind CSS optimization
- Basic form validation

**Claude Required**:
- Complex state management (Redux, Context)
- Stripe payment integration
- Multi-step form orchestration
- Performance profiling and optimization

### pferdewert-debugger
**Gemini First**:
- Console error fixes
- TypeScript compilation errors
- Basic CSS rendering issues
- Simple React warning fixes

**Claude Required**:
- Performance bottleneck analysis
- Database query optimization
- API integration debugging
- Cross-browser compatibility issues

### pferdewert-code-reviewer
**Gemini First**:
- ESLint rule compliance
- TypeScript strict mode validation
- Code formatting checks
- Basic security pattern validation

**Claude Required**:
- Architecture review
- Business logic validation
- Security vulnerability assessment
- Performance impact analysis

### pferdewert-backend-architect
**Gemini First**:
- Simple API endpoint fixes
- Basic validation schema updates
- Code formatting and linting

**Claude Required**:
- Database schema design
- API architecture planning
- Performance optimization strategy
- Security architecture design

### pferdewert-business-analyst
**Claude Only**:
- All tasks require complex analysis and strategic thinking
- SEO strategy development
- Conversion optimization planning
- Market research and competitive analysis

## Practical Workflows

### Daily Development Workflow
```bash
# 1. Start with Gemini for routine tasks
cd pferdewert
gemini -p "Fix any ESLint errors in the current branch"

# 2. Use Claude for feature implementation
# (Complex React components, API integration, etc.)

# 3. Back to Gemini for cleanup
gemini -p "Add TypeScript types for any untyped variables"
gemini -p "Add JSDoc comments to new functions"

# 4. Final review with Claude agents
# Use pferdewert-code-reviewer before commit
```

### Bug Fix Workflow
```bash
# 1. Try Gemini first for simple fixes
gemini -p "Fix the TypeScript error in this component: [paste error]"

# 2. If Gemini can't solve it, escalate to Claude
# Use pferdewert-debugger for complex debugging

# 3. Use Gemini for cleanup after fix
gemini -p "Add error handling and logging to this fixed component"
```

### Feature Development Workflow
```bash
# 1. Architecture planning (Claude)
# Use pferdewert-backend-architect or pferdewert-frontend-dev

# 2. Implementation (Mix of Claude and Gemini)
# Complex logic → Claude
# Styling and formatting → Gemini

# 3. Testing and documentation (Gemini)
gemini -p "Create comprehensive tests for this new feature"
gemini -p "Document the new API endpoints"

# 4. Code review (Claude)
# Use pferdewert-code-reviewer
```

## Cost Optimization Results

### Token Usage Reduction
- **Before**: 100% Claude for all tasks
- **After**: 20-40% Claude, 60-80% Gemini
- **Savings**: ~60-80% reduction in paid AI usage

### Task Distribution Stats
```
ESLint fixes: 95% → Gemini
TypeScript errors: 85% → Gemini  
CSS/Tailwind: 90% → Gemini
Unit tests: 85% → Gemini
Documentation: 95% → Gemini
Simple refactoring: 80% → Gemini

Architecture design: 100% → Claude
Business logic: 100% → Claude
Security implementation: 100% → Claude
Complex debugging: 70% → Claude
Performance optimization: 60% → Claude
```

### Monthly Cost Impact
```
Claude Code subscription: $20/month (baseline)
Previous token overage: ~$40/month
With Gemini optimization: ~$5-10/month overage
Total savings: $30-40/month (60-75% reduction)
```

## Common Pitfalls & Solutions

### When Gemini Fails
**Symptom**: Gemini provides incorrect or incomplete solution
**Solution**: 
1. Refine prompt with more specific context
2. If still failing, escalate to Claude
3. Document the failure pattern to improve future task distribution

### Over-reliance on Gemini
**Symptom**: Trying to force Gemini for complex architectural decisions
**Solution**: 
- Stick to the decision framework
- Remember: Gemini excels at syntax, Claude at strategy
- Don't sacrifice quality for cost savings

### Context Loss
**Symptom**: Gemini provides solutions that don't fit PferdeWert patterns
**Solution**: 
- Always include project context in prompts
- Reference existing components and patterns
- Use Context7 MCP for current documentation

## Advanced Strategies

### Gemini + Claude Workflows
```bash
# 1. Gemini generates initial implementation
gemini -p "Create a React component for horse breed selection dropdown"

# 2. Claude reviews and enhances
# Use pferdewert-code-reviewer to ensure quality

# 3. Gemini handles final polish
gemini -p "Add comprehensive TypeScript types and JSDoc comments"
```

### Batch Processing with Gemini
```bash
# Process multiple files at once
gemini -p "Fix ESLint errors in all files in frontend/components/ directory"

# Batch documentation updates
gemini -p "Add JSDoc comments to all functions in frontend/lib/"

# Mass TypeScript improvements
gemini -p "Add proper types to all props interfaces in components/"
```

### Quality Assurance
- **Always run linting after Gemini changes**: `npm run lint`
- **Type-check Gemini output**: `npm run type-check`
- **Test Gemini implementations**: Ensure functionality isn't broken
- **Code review critical paths**: Use Claude agents for important features

## Monitoring & Metrics

### Track Gemini Effectiveness
- **Success Rate**: Percentage of Gemini tasks that work without modification
- **Time Savings**: Compare development time with/without Gemini
- **Quality Impact**: Monitor for regressions in code quality
- **Cost Savings**: Track monthly token usage reduction

### Key Performance Indicators
```
Target Metrics:
- Gemini success rate: >85% for designated tasks
- Claude token reduction: >60%
- Code quality score: Maintain current standards
- Development velocity: 20-30% improvement
- Monthly cost reduction: $30-40
```

Remember: The goal is optimal resource utilization, not just cost cutting. Maintain high code quality while reducing operational costs through smart task distribution.