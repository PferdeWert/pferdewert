# Quality Gates - SEO Pipeline Validation

**Purpose**: Quality Gates ensure data completeness and content quality at each phase checkpoint before proceeding to the next phase.

**Core Principle**: Flexible thresholds with partial success patterns - avoid all-or-nothing failures.

---

## Quality Gate Pattern

### Three-Tier Validation

✅ **PASS** - All minimum requirements met → Proceed to next phase
⚠️ **WARNING** - Partial success, some requirements met → Log warning, proceed with available data
❌ **FAIL** - Critical requirements not met → Retry phase with adjusted parameters

### Validation Syntax

```
✅ Min X items collected/identified
❌ If < Y items → retry with [specific adjustment]
⚠️ Partial success: If Z items → proceed with warning
```

---

## Phase 1A: Keyword Data Collection

**Checkpoint**: After all DataForSEO API calls (Related Keywords, Keyword Ideas, Keyword Overview)

### Validation Rules

✅ **Min 10 keywords collected** (from all three API calls combined)
✅ **Min 5 keywords with search_volume > 100**
✅ **Min 3 keywords with informational intent**
❌ **If < 5 keywords total** → Retry with different seed keywords or increase depth
⚠️ **If 8-9 keywords** → Proceed with warning (acceptable for niche topics)

### Retry Logic

**Scenario 1**: < 5 Keywords collected
- **Action**: Retry Related Keywords with `depth=2` (instead of depth=1)
- **Alternative**: Use broader seed keywords

**Scenario 2**: All keywords have LOW search volume (< 100)
- **Action**: Verify keyword is not too niche
- **Alternative**: Proceed anyway if topic is strategic (e.g., premium niche content)

**Scenario 3**: Token overflow error from Keyword Ideas
- **Action**: Reduce `limit` from 15 to 10
- **Alternative**: Reduce number of seed keywords from 3 to 2

---

## Phase 1B: Keyword Analysis (Sub-Agent)

**Checkpoint**: After Sub-Agent completes keyword analysis and clustering

### Validation Rules

✅ **Min 3 content clusters identified**
✅ **Top 10 keywords with relevance scores** (ranked by relevance_score formula)
✅ **Min 1 article recommendation** with primary + supporting keywords
✅ **Target word count defined** (must be in 2000-3500 range)
❌ **If analysis unstructured or missing JSON format** → Retry with explicit format examples
⚠️ **If only 2 clusters instead of 3** → Proceed with warning

### Retry Logic

**Scenario 1**: Sub-Agent returns unstructured output (no JSON)
- **Action**: Retry delegation with clearer "OUTPUT FORMAT (JSON)" section
- **Include**: Explicit example output in prompt

**Scenario 2**: Relevance scores all similar (no clear differentiation)
- **Action**: Acceptable - proceed with top 10 by search volume as fallback
- **Note**: Relevance formula may not differentiate well for very niche topics

**Scenario 3**: Target word count unrealistic (< 1500 or > 4000)
- **Action**: Log warning, proceed with adjusted count (2000-2500 default)

---

## Phase 2A: SERP Data Collection

**Checkpoint**: After SERP Organic Results + PAA Deep Expansion API calls

### Validation Rules

✅ **Min 10 SERP results received** (from top 30 depth query)
✅ **Min 3 Featured Snippets or PAA questions identified**
✅ **Min 5 unique domains in Top 10** (domain diversity check)
❌ **If < 10 results** → Log warning, proceed anyway (niche keyword acceptable)
⚠️ **If only 2 PAA instead of 3** → Proceed with warning

### Retry Logic

**Scenario 1**: < 10 SERP results returned
- **Action**: Log warning for niche keyword, proceed with available data
- **Note**: Some keywords genuinely have limited competition

**Scenario 2**: No Featured Snippets found
- **Action**: Normal for commercial keywords, proceed
- **Adjust**: Focus on PAA integration instead of Featured Snippet optimization

**Scenario 3**: < 3 PAA questions
- **Action**: Retry with `people_also_ask_click_depth=2` if not already set
- **Alternative**: Use related keywords for PAA expansion
- **Fallback**: Proceed with fewer PAA questions if topic is niche

---

## Phase 2B: SERP Competitor Analysis (Sub-Agent)

**Checkpoint**: After Sub-Agent completes competitor content gap analysis

### Validation Rules

✅ **Min 5 must-have topics identified** (topics ALL top 10 cover)
✅ **Target word count defined** (2000-3500 range)
✅ **Min 3 differentiation opportunities found** (topics only 3-5 competitors cover)
✅ **Min 5 PAA questions selected for integration** (with section placement defined)
✅ **E-E-A-T signals defined** (credentials, case studies, references)
❌ **If < 5 must-have topics** → Retry with deeper analysis prompt
⚠️ **If E-E-A-T analysis weak or generic** → Proceed with generic recommendations

### Retry Logic

**Scenario 1**: Sub-Agent returns < 5 must-have topics
- **Action**: Retry with explicit instruction to analyze ALL top 10 titles/descriptions
- **Clarify**: "Must-have = topic appears in ALL 10 results"

**Scenario 2**: Differentiation opportunities list is empty
- **Action**: Acceptable - proceed with must-have topics only
- **Note**: Highly competitive SERPs may have uniform content coverage

**Scenario 3**: PAA integration list missing section placements
- **Action**: Retry with clearer output format
- **Example**: Include sample PAA integration object in prompt

**Scenario 4**: E-E-A-T signals too generic ("expert quotes needed")
- **Action**: Acceptable - proceed with generic signals
- **Improve**: Phase 4 content agent will make specific

---

## Phase 3: Content Outline Creation (Sub-Agent)

**Checkpoint**: After Sub-Agent creates detailed article outline

### Validation Rules

✅ **5-8 main sections defined** (H2 level)
✅ **Primary keyword in min 3 H2/H3 headings**
✅ **Target word count: 2000-3500** (total article length)
✅ **FAQ section with min 3 PAA-based questions**
✅ **Each section has**: heading, word count, keywords, content type, E-E-A-T signals
❌ **If < 5 sections** → Retry with more detailed outline requirements
⚠️ **If only 2 headings contain primary keyword** → Proceed, add in Phase 4

### Retry Logic

**Scenario 1**: < 5 main sections defined
- **Action**: Retry with explicit requirement for 6-7 sections
- **Provide**: Example section structure from must-have topics

**Scenario 2**: Sections lack detail (only headings, no content type or E-E-A-T)
- **Action**: Retry with complete "OUTPUT FORMAT (JSON)" example
- **Emphasize**: "Für jede Sektion definiere: heading, word_count, keywords, content_type, eeat_signals"

**Scenario 3**: Target word count unrealistic (< 1800 or > 3800)
- **Action**: Acceptable - proceed with adjusted count
- **Log**: Warning about deviation from 2000-3500 target

**Scenario 4**: FAQ section missing or < 3 questions
- **Action**: Retry with PAA questions from Phase 2B explicitly included in prompt
- **Fallback**: Add FAQ section in Phase 4 if retry fails

---

## Phase 4: Content Creation (Sub-Agent)

**Checkpoint**: After Sub-Agent writes full article draft

### Validation Rules

✅ **Word count: 2000-2500** (target range, acceptable: 1800-2800)
✅ **Primary keyword density: 0.8-1.2%** (natural integration)
✅ **Min 15 supporting keywords integrated** (from Phase 1 clusters)
✅ **All must-have topics covered** (from Phase 2B)
✅ **Min 2 E-E-A-T signals integrated** (case studies, credentials, references)
✅ **PAA questions integrated as H2/H3** (min 3 from Phase 2B)
❌ **If < 1800 words** → Retry with missing sections identified
⚠️ **If 1800-1999 words** → Proceed, acceptable for concise content

### Retry Logic

**Scenario 1**: Word count < 1800 words
- **Action**: Identify which sections are too short
- **Retry**: Expand specific sections with more detail, examples, data

**Scenario 2**: Keyword density too low (< 0.5%) or too high (> 2%)
- **Action**: Log warning, proceed
- **Note**: Manual review in Phase 6 will catch this

**Scenario 3**: E-E-A-T signals missing or generic
- **Action**: Retry with explicit E-E-A-T requirements from Phase 2B
- **Example**: "Integrate 2 case studies from PferdeWert experience + 3 external references"

**Scenario 4**: PAA questions not integrated
- **Action**: Retry with PAA list from Phase 2B explicitly in prompt
- **Format**: "Add these 5 PAA questions as H2/H3 sections: [list]"

---

## Phase 5: On-Page SEO Optimization (Sub-Agent)

**Checkpoint**: After Sub-Agent generates SEO metadata and schema markup

### Validation Rules

✅ **Title tag: 50-60 characters** (with primary keyword)
✅ **Meta description: 150-160 characters** (with primary keyword and CTA)
✅ **Min 2 schema types generated** (Article + FAQ/HowTo)
✅ **Schema JSON-LD validates** (passes schema.org validation)
✅ **Min 3 internal links identified** (to relevant Ratgeber articles)
❌ **If schema validation fails** → Retry with corrected template
⚠️ **If only 1 schema type** → Proceed (Article schema is sufficient)

### Retry Logic

**Scenario 1**: Title tag too long (> 65 characters)
- **Action**: Retry with instruction to shorten while keeping primary keyword
- **Max**: 60 characters hard limit

**Scenario 2**: Meta description too short (< 120 characters)
- **Action**: Retry with instruction to expand with supporting keywords or benefit statement
- **Target**: 155 characters ideal

**Scenario 3**: Schema validation fails
- **Action**: Check JSON syntax errors
- **Retry**: Use validated template from methodology/schema-markup.md
- **Common fix**: Missing required fields (datePublished, author, etc.)

**Scenario 4**: Internal links missing or irrelevant
- **Action**: Acceptable - proceed without internal links
- **Note**: Can be added manually during CMS upload

---

## Phase 6: Quality Check and Final Review (Sub-Agent)

**Checkpoint**: After Sub-Agent completes comprehensive quality validation

### Validation Rules

✅ **Readability score: Min 60/100** (Flesch Reading Ease equivalent)
✅ **Keyword density check passed** (0.8-1.2% for primary)
✅ **E-E-A-T score: Min 7/10** (based on signals present)
✅ **All must-have topics verified** (from Phase 2B checklist)
✅ **PAA questions verified** (min 3 integrated as sections)
✅ **Fact-check passed** (no obvious factual errors or outdated info)
❌ **If E-E-A-T < 5/10** → Return to Phase 4, add more signals
⚠️ **If readability 50-59** → Proceed with simplification notes

### Retry Logic

**Scenario 1**: E-E-A-T score < 5/10
- **Action**: Identify missing E-E-A-T signals
- **Retry Phase 4**: Add 2-3 more signals (credentials, case studies, external references)
- **Do NOT proceed**: Low E-E-A-T is critical ranking factor

**Scenario 2**: Readability score too low (< 50)
- **Action**: Retry Phase 4 with simpler sentence structure
- **Guidelines**: Shorter sentences, simpler vocabulary, more bullet points

**Scenario 3**: Keyword density issues (< 0.5% or > 2%)
- **Action**: If < 0.5%: Add primary keyword to 2-3 more headings or paragraphs
- **Action**: If > 2%: Replace some instances with synonyms or supporting keywords
- **Retry**: Phase 4 with keyword density targets clearly stated

**Scenario 4**: Missing must-have topics
- **Action**: CRITICAL - must retry Phase 4
- **Identify**: Which must-have topics from Phase 2B are missing
- **Add**: Dedicated section for each missing topic (200-300 words)

**Scenario 5**: Fact-check failures
- **Action**: Identify specific claims that are wrong or outdated
- **Retry Phase 4**: Correct facts, add sources, update data
- **Use**: DataForSEO APIs for real-time fact verification if needed

---

## Quality Gate Summary Table

| Phase | Critical Requirements | Acceptable Warnings | Hard Failures (Retry Required) |
|-------|----------------------|--------------------|---------------------------------|
| **1A** | Min 10 keywords, Min 5 with volume >100, Min 3 informational | 8-9 keywords (niche topic) | < 5 keywords total |
| **1B** | Min 3 clusters, Top 10 with scores, Min 1 recommendation | 2 clusters | No JSON format output |
| **2A** | Min 10 SERP results, Min 3 PAA/Snippets | Only 2 PAA | None (niche acceptable) |
| **2B** | Min 5 must-have topics, Word count defined, Min 3 differentiation | Weak E-E-A-T | < 5 must-have topics |
| **3** | 5-8 sections, Keyword in 3 headings, 2000-3500 words, 3 FAQ | Keyword in 2 headings | < 5 sections |
| **4** | 2000-2500 words, 0.8-1.2% density, 15 keywords, Must-haves covered | 1800-1999 words | < 1800 words, E-E-A-T missing |
| **5** | Title 50-60 chars, Meta 150-160 chars, 2 schemas, Valid JSON-LD | 1 schema only | Schema validation fails |
| **6** | Readability ≥60, E-E-A-T ≥7/10, Must-haves verified | Readability 50-59 | E-E-A-T < 5/10, Missing must-haves |

---

## Integration with Orchestration Phases

### How to Use Quality Gates in Phase Files

**Pattern in each phase file:**

```markdown
### Quality Gate Phase X

Prüfe ob [phase objective] erreicht wurde:

✅ **[Requirement 1]**
✅ **[Requirement 2]**
✅ **[Requirement 3]**
❌ **Wenn [condition]** → [retry action]
⚠️ **Partial Success**: Wenn [condition] → proceed mit Warning

**Proceed to next phase if**:
- All ✅ requirements met, OR
- ⚠️ Partial success with documented warnings

**Retry current phase if**:
- Any ❌ hard failure condition met
```

**Example from phase-1-keyword-research.md:**

```markdown
### Quality Gate Phase 1A

Prüfe ob genug Daten gesammelt wurden:

✅ **Min 10 Keywords gesammelt** (flexibler Schwellwert)
✅ **Min 5 Keywords mit search_volume > 100**
✅ **Min 3 Keywords mit informational intent**
❌ **Wenn < 5 Keywords** → Retry mit anderen Seed-Keywords

**Partial Success erlaubt**: Wenn nur 8 Keywords statt 10 → proceed mit Warning.
```

---

## Best Practices

### 1. Always Log Warnings
Even when proceeding with partial success, always log warnings for:
- Missing data points
- Reduced quality metrics
- Deviations from target thresholds

**Format**:
```json
{
  "phase": "1A",
  "status": "partial_success",
  "warnings": [
    "Only 8 keywords collected instead of target 10",
    "No keywords with HIGH search volume (all MEDIUM/LOW)"
  ]
}
```

### 2. Prefer Warnings over Hard Failures
**Use hard failures (retry) only for**:
- Critical data missing (e.g., < 5 keywords in Phase 1A)
- Broken output format (e.g., no JSON from Sub-Agent)
- Quality below minimum threshold (e.g., E-E-A-T < 5/10)

**Use warnings (proceed) for**:
- Slightly below target (e.g., 8 keywords instead of 10)
- Non-critical omissions (e.g., only 1 schema instead of 2)
- Niche topic constraints (e.g., limited PAA questions)

### 3. Make Retry Actions Specific
Bad: ❌ "Retry with better data"
Good: ✅ "Retry Step 1 with depth=2 (instead of depth=1) and broader seed keywords"

### 4. Document Acceptable Ranges
For numerical thresholds, define:
- **Target**: Ideal value
- **Acceptable**: Will proceed without warning
- **Warning**: Will proceed with logged warning
- **Failure**: Must retry

**Example: Word Count**
- **Target**: 2000-2500 words
- **Acceptable**: 1900-2600 words
- **Warning**: 1800-1899 or 2601-2800 words
- **Failure**: < 1800 or > 2800 words

---

## Troubleshooting Quality Gate Issues

### Problem: Quality Gates too strict, constant retries

**Symptoms**:
- Every workflow requires 2-3 retries per phase
- Even good content fails gates
- Niche topics always fail

**Solution**:
- Review and relax min/max thresholds
- Add more "acceptable warning" ranges
- Consider topic-specific gates (e.g., niche vs. mainstream keywords)

### Problem: Quality Gates too loose, poor content passes

**Symptoms**:
- Phase 6 consistently flags issues that should have been caught earlier
- Content missing must-have topics from Phase 2
- Keyword density way off target

**Solution**:
- Add more critical requirements (✅ checks)
- Make some warnings into hard failures
- Add cross-phase validation (e.g., verify Phase 2 must-haves in Phase 4 gate)

### Problem: Sub-Agent ignoring quality requirements

**Symptoms**:
- Sub-Agent returns incomplete data
- Output format doesn't match requested JSON structure
- E-E-A-T signals missing even after retry

**Solution**:
- Make "OUTPUT FORMAT (JSON)" section more prominent in prompts
- Include explicit example output
- Add "WICHTIG: Verwende NUR die bereitgestellten Daten" reminder
- Consider breaking complex Sub-Agent tasks into smaller sub-tasks

---

## Version History

**Version**: 1.0 (2025-01-04)
**Status**: Initial Quality Gates Documentation
**Aligned with**: SEO-PROZESS modular documentation structure (Phases 1-6)

---

**Next Steps After Quality Gate Failure:**
1. Log specific failure reason and retry count
2. Adjust parameters based on retry logic above
3. Re-run failed phase with adjustments
4. If 3rd retry also fails → escalate to manual review (log for user attention)
