---
argument-hint: <keyword>
description: Execute complete SEO process with DataForSEO research and content creation
allowed-tools: Task, Read, Write, Bash(mkdir:*), mcp__dataforseo__*
---

Execute the complete SEO process for keyword: $ARGUMENTS

**STEP 1: Read Process Documentation**
Read /SEO/SEO-CONTENT/SEO-PROZESS-PROMPT.md

**STEP 2: Keyword Research**
Launch pferdewert-business-analyst agent with this task:
"Use DataForSEO to research keyword: $ARGUMENTS
- Get search volume, competition, CPC
- Analyze SERP features
- Identify related keywords
- Save results to /SEO/ANALYSIS/$ARGUMENTS-research.json"

**STEP 3: Content Creation**
Launch seo-content-writer agent with this task:
"Create SEO-optimized content for: $ARGUMENTS
- Use research from /SEO/ANALYSIS/$ARGUMENTS-research.json
- Follow E-E-A-T principles
- Include FAQ schema
- Add internal links
- Save to /SEO/SEO-CONTENT/$ARGUMENTS/
- Implement in Next.js pages or ratgeber data"

**STEP 4: Verify Output**
Confirm all files are created and content follows PferdeWert brand voice.