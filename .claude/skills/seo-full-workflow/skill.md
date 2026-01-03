---
name: seo-full-workflow
description: Orchestriert komplette 7-Phase SEO Pipeline von Keyword Research bis Publication. Verwenden bei "SEO content erstellen" oder "neuen ratgeber artikel".
allowed-tools: Task, Read, Write, Edit, Glob, Grep, Bash, mcp__dataforseo__*
---

# SEO Full Workflow - Complete Content Pipeline

Orchestrates complete 7-phase SEO pipeline via specialized sub-agents for token efficiency.

**Purpose**: End-to-end content creation from keyword research to publication-ready Next.js page.

## When to use

- User requests complete SEO content workflow
- User says "create SEO content for [keyword]"
- User needs full pipeline: research → outline → content → optimization → package
- Multiple related keywords need structured approach

## Prerequisites

- DataForSEO MCP server connected
- Target keyword(s) identified
- Target market: Germany (de/DE)
- Output directory: `SEO/SEO-CONTENT/{keyword-slug}/`

## Process Overview

**Token Efficiency**: ~62k tokens (vs. 95k manual) = 35% savings

### Phase 0: Setup & Validation

- Create working directory: `SEO/SEO-CONTENT/{keyword-slug}/`
- Validate keyword format (no special chars, reasonable length)
- Check DataForSEO connection
- Initialize phase tracking file: `workflow-status.json`

### Phases 1-7: Sub-Agent Execution Pattern

**For EACH phase, spawn sub-agent via Task tool**:

```
subagent_type: "general-purpose"
description: "SEO [Phase Name]"
prompt: "
TASK: Execute Phase [X] - [Phase Name] for '{PRIMARY_KEYWORD}'

Instructions:
1. Use the `[skill-name]` skill
2. Input files: [previous phase outputs]
3. Create: [expected output files]

Validation: [Phase-specific checks]

Return: Compact summary (max 250 words)
"
```

#### Phase 1: Keyword Research (`seo-keyword-research`)
- **Agent Prompt**: Use seo-keyword-research skill, output to `keywords/`
- **Validation**:
  - Min 20 keyword ideas (vol > 50)
  - Min 15 related keywords (depth 2)
  - Primary keyword data present
- **Output**: `keywords/keyword-ideas.json`, `keywords/related-keywords.json`, `keywords/primary-keyword-data.json`

#### Phase 2: SERP Analysis (`seo-serp-analysis`)
- **Agent Prompt**: Use seo-serp-analysis skill with primary keyword, output to `serp-analysis/`
- **Validation**:
  - Min 3 competitor pages analyzed
  - PAA questions extracted
  - SERP features identified
- **Output**: `serp-analysis/competitors.json`, `serp-analysis/paa-questions.json`, `serp-analysis/serp-features.json`

#### Phase 3: Content Outline (`seo-outline-generator`)
- **Agent Prompt**: Use seo-outline-generator skill, input from Phase 1+2, output to `outline/`
- **Validation**:
  - H1 + 5-8 H2 sections
  - 2-4 H3s per H2
  - Word count target: 1500-2500
  - Search intent alignment
- **Output**: `outline/content-outline.md`

#### Phase 4: Content Creation (`seo-content-generator`)
- **Agent Prompt**: Use seo-content-generator skill, input outline, output to `content/`
- **Validation**:
  - All outline sections covered
  - E-E-A-T signals present
  - Brand compliance (KI, 2 Minuten, PAID)
  - Internal links (2-5)
- **Output**: `content/full-content.md`

#### Phase 5: On-Page SEO (`seo-onpage-optimizer`)
- **Agent Prompt**: Use seo-onpage-optimizer skill, input content, output to `onpage/`
- **Validation**:
  - Title tag (50-60 chars)
  - Meta description (140-160 chars)
  - FAQ Schema (min 3 Q&As)
  - Article Schema valid
  - Image alt texts present
- **Output**: `onpage/metadata.json`, `onpage/schemas.json`, `onpage/internal-links.json`

#### Phase 6: Quality Check (`seo-quality-check`)
- **Agent Prompt**: Use seo-quality-check skill, validate all outputs
- **Validation**:
  - E-E-A-T Score ≥ 7.0
  - Keyword density 0.8-1.5%
  - No duplicate content
  - Brand compliance verified
  - Readability score acceptable
- **Output**: `quality/quality-report.json`

#### Phase 7: Final Package (`seo-final-package`)
- **Agent Prompt**: Use seo-final-package skill, compile all phases
- **Validation**:
  - Complete Next.js page code
  - All schemas embedded
  - Metadata complete
  - Ready for deployment
- **Output**: `FINAL-PACKAGE.md` (all-in-one publication doc)

## Phase Coordination

### Sequential Dependencies
```
Phase 1 (Keywords) → Phase 2 (SERP)
                  ↘
Phase 3 (Outline) → Phase 4 (Content) → Phase 5 (On-Page) → Phase 6 (Quality) → Phase 7 (Package)
```

### Status Tracking (`workflow-status.json`)
```json
{
  "keyword": "primary keyword",
  "started": "2025-01-09T10:30:00Z",
  "phases": {
    "1": "completed",
    "2": "completed",
    "3": "in_progress",
    "4": "pending"
  },
  "current_phase": 3
}
```

## Output Structure

```
SEO/SEO-CONTENT/{keyword-slug}/
├── workflow-status.json
├── keywords/
│   ├── keyword-ideas.json
│   ├── related-keywords.json
│   └── primary-keyword-data.json
├── serp-analysis/
│   ├── competitors.json
│   ├── paa-questions.json
│   └── serp-features.json
├── outline/
│   └── content-outline.md
├── content/
│   └── full-content.md
├── onpage/
│   ├── metadata.json
│   ├── schemas.json
│   └── internal-links.json
├── quality/
│   └── quality-report.json
└── FINAL-PACKAGE.md
```

## Critical Rules

**Sub-Agent Pattern**:
- ONE sub-agent per phase (isolation)
- Pass compact prompts (< 500 words)
- Skills handle tool calls (not sub-agents)
- Sub-agents return summaries only

**Brand Compliance** (validated in Phase 6):
- "KI" not "AI"
- "2 Minuten" evaluation duration
- PAID service (never "kostenlos")

**Quality Standards** (enforced in Phase 6):
- E-E-A-T Score ≥ 7.0
- Keyword density 0.8-1.5%
- All schemas valid JSON-LD
- Word count competitive vs. SERP top 3

**Error Handling**:
- Phase failure → retry once with extended timeout
- Quality check fail → loop back to Phase 4
- Final validation fail → manual review required

## Token Efficiency

**Total Pipeline**: ~62k tokens
- Phase setup: ~2k
- 7 sub-agent spawns: ~45k (vs 95k manual)
- Coordination: ~15k

**Savings**: 35% vs. manual execution

## Integration

**Uses these skills**:
- `seo-keyword-research` - Phase 1
- `seo-serp-analysis` - Phase 2
- `seo-outline-generator` - Phase 3
- `seo-content-generator` - Phase 4
- `seo-onpage-optimizer` - Phase 5
- `seo-quality-check` - Phase 6
- `seo-final-package` - Phase 7

**Related to**:
- `seo-content-optimizer` - For EXISTING content optimization
- `seo-metadata-optimization` - For metadata-only updates

## Notes

- **Hybrid Architecture**: Sub-agents for orchestration, skills for execution
- **Resume Support**: Use workflow-status.json to continue from last completed phase
- **Parallel Phases**: Phase 1 + 2 can run in parallel if desired
- **Quality Gate**: Phase 6 blocks Phase 7 if quality < threshold
- **Reusable**: Template for all future SEO content workflows
