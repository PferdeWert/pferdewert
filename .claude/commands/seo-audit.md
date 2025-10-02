# Technical SEO Audit - PferdeWert.de

Execute comprehensive Technical SEO Audit following the 7-step process defined in SEO/SEO-AUDIT.md.

## Process Overview

You will perform a complete Technical SEO Audit for PferdeWert.de, analyzing:
- Core Web Vitals (LCP, INP, CLS)
- OnPage SEO factors (meta tags, headings, content)
- Technical issues (broken links, redirects, mobile optimization)
- Performance metrics via Lighthouse
- Prioritized action items with effort estimation

## Workflow Steps

### Step 1: Website Mapping
Use `firecrawl_map` to discover all URLs on pferdewert.de:
- Map the complete website structure
- Categorize URLs by type (main pages, ratgeber articles, info pages)
- Create URL inventory: `SEO/SEO-AUDIT/{keyword}/url-inventory-{date}.json`

### Step 2: URL Prioritization
Classify URLs by business priority:
- **Prio 1 (Business Critical)**: Homepage, Bewertungsformular, Checkout
- **Prio 2 (High Value)**: Top Ratgeber articles, Service pages
- **Prio 3 (Medium)**: Additional Ratgeber, Info pages
- **Prio 4 (Low)**: Footer links, technical pages

Focus deep analysis on Prio 1-2 URLs.

### Step 3: OnPage Analysis
For each Prio 1-2 URL, use DataForSEO OnPage API:
- Endpoint: `on_page_instant_pages`
- Analyze: Meta tags, heading structure, content quality, internal links
- Check: HTTPS status, redirects, broken links, image alt attributes
- Verify: Mobile optimization, viewport settings

Save results to: `SEO/SEO-AUDIT/{keyword}/onpage-issues-{date}.json`

### Step 4: Lighthouse Performance Audit
For Top 10 URLs, use DataForSEO Lighthouse API:
- Endpoint: `on_page_lighthouse`
- Measure Core Web Vitals (LCP, INP, CLS)
- Get Performance, Accessibility, Best Practices, SEO scores
- Identify render-blocking resources, optimization opportunities

Run for both Mobile and Desktop.

Save results to: `SEO/SEO-AUDIT/{keyword}/lighthouse-scores-{date}.json`

### Step 5: Problem Categorization
Classify all identified issues:

**CRITICAL** (Fix immediately):
- Broken pages (404/500) on Prio 1 URLs
- Missing/duplicate title tags on critical pages
- Core Web Vitals below thresholds
- Mobile usability issues on conversion pages
- HTTPS problems

**WARNING** (Fix short-term):
- Suboptimal meta descriptions
- H1 duplicates
- Slow load times (non-critical)
- Missing alt attributes
- Redirect chains

**INFO** (Long-term optimization):
- Keyword optimization potential
- Internal linking improvements
- Content expansion opportunities
- Schema markup optimizations

### Step 6: Report Generation
Create comprehensive audit report: `SEO/SEO-AUDIT/{keyword}/technical-audit-{date}.md`

Include:
- Executive Summary with Health Score
- Top 3 Action Recommendations
- Core Web Vitals Performance (Mobile + Desktop)
- OnPage SEO Issues (categorized by severity)
- Technical SEO Health (indexing, crawlability, mobile)
- Content Analysis (keyword optimization, heading structure)
- Priorisierte Action Items (Sprint 1, Sprint 2, Backlog)

### Step 7: Action Items Generation
Create detailed action items: `SEO/SEO-AUDIT/{keyword}/action-items-{date}.md`

For each critical issue, document:
- Problem description
- Affected URLs
- Business impact (SEO/UX/Conversion)
- Step-by-step solution
- Code examples (if applicable)
- Effort estimation (dev time, testing, deployment)
- Success metrics (KPIs with current/target values)

## Execution Checklist

- [ ] 1. Website Mapping with firecrawl_map
- [ ] 2. URL Prioritization (identify Top 20 URLs)
- [ ] 3. OnPage Analysis for Prio 1-2 URLs
- [ ] 4. Lighthouse Audit for Top 10 URLs (Mobile + Desktop)
- [ ] 5. Problem Categorization (CRITICAL/WARNING/INFO)
- [ ] 6. Generate comprehensive audit report
- [ ] 7. Create detailed action items for Top 10 issues

## Output Structure

All results saved to:
```
SEO/SEO-AUDIT/{keyword}/
├── url-inventory-{date}.json
├── onpage-issues-{date}.json
├── lighthouse-scores-{date}.json
├── technical-audit-{date}.md
└── action-items-{date}.md
```

## Quality Metrics

Successful audit requires:
- **URL Coverage**: >95% of important pages analyzed
- **API Success Rate**: >90% successful API calls
- **Lighthouse Data**: Mobile + Desktop for Top 10 URLs
- **Action Items**: Minimum 3 CRITICAL + 5 WARNING items identified
- **Actionability**: Every issue has concrete solution recommendation
- **Prioritization**: Issues sorted by business impact
- **Effort Estimation**: Realistic time estimates for fixes
- **Measurability**: Success metrics defined for each action item

---

**Begin the audit process now. Start with Step 1: Website Mapping.**
