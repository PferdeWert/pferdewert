# DataForSEO MCP Authentication Fix

## Problem Summary

**Status:** ✗ DataForSEO MCP tools are non-functional
**Root Cause:** Missing API credentials in MCP server configuration
**Impact:** SEO analytics, keyword research, and SERP analysis unavailable

## Investigation Findings

### ✓ Sub-agent MCP Access Works Correctly
- Wildcard syntax `mcp__dataforseo__*` is valid and functional
- Sub-agents successfully invoke MCP tools via wildcard configuration
- No tool access issues between main agent and sub-agents

### ✗ Authentication Issue Discovered
```
Error: 401 Unauthorized from https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live
```

**Current MCP Configuration:**
```bash
dataforseo: npx dataforseo-mcp-server - ✓ Connected
```

**Problem:** Server is connected at protocol level but lacks authentication credentials.

## Required Fix

### Step 1: Obtain DataForSEO Credentials
You need your DataForSEO API credentials:
- Login (username/email)
- Password (API key)

Get these from: https://app.dataforseo.com/api-dashboard

### Step 2: Remove Current Configuration
```bash
claude mcp remove dataforseo --scope user
```

### Step 3: Reconfigure with Credentials
```bash
claude mcp add dataforseo --scope user \
  --env DATAFORSEO_LOGIN="your_actual_login_here" \
  --env DATAFORSEO_PASSWORD="your_actual_password_here" \
  -- npx -y @modelcontextprotocol/server-dataforseo
```

**CRITICAL:** Replace `your_actual_login_here` and `your_actual_password_here` with real credentials.

### Step 4: Verify Connection
```bash
claude mcp list
```

Should show:
```
dataforseo: npx @modelcontextprotocol/server-dataforseo - ✓ Connected
  Environment: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
```

### Step 5: Test API Call
Invoke a sub-agent to test:
```bash
# Test with business analyst agent
claude --agent pferdewert-business-analyst
```

Then request a keyword analysis to verify the MCP tools work.

## Affected Agents

Both agents use DataForSEO MCP tools via wildcard syntax:

### `seo-content-writer.md`
```yaml
tools:
  - mcp__dataforseo__*
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
```

### `pferdewert-business-analyst.md`
```yaml
tools:
  - mcp__dataforseo__*
```

## Expected Functionality After Fix

Once credentials are configured, these MCP tools will work:

**Keyword Research:**
- `mcp__dataforseo__dataforseo_labs_google_keyword_overview`
- `mcp__dataforseo__dataforseo_labs_google_related_keywords`
- `mcp__dataforseo__dataforseo_labs_google_keyword_suggestions`

**SERP Analysis:**
- `mcp__dataforseo__serp_organic_live_advanced`

**Competitive Intelligence:**
- `mcp__dataforseo__dataforseo_labs_google_competitors_domain`
- `mcp__dataforseo__dataforseo_labs_google_domain_rank_overview`

## Business Impact

**Current State (Without Fix):**
- ✗ Cannot perform keyword research for SEO content
- ✗ Cannot analyze SERP competition
- ✗ Cannot calculate ROI projections for keywords
- ✗ SEO content writer agent cannot gather required data
- ✗ Business analyst agent cannot provide market intelligence

**After Fix:**
- ✓ Full keyword research capabilities for German market
- ✓ Competitive SERP analysis for "pferd kaufen", "pferd verkaufen"
- ✓ Data-driven content strategy development
- ✓ Revenue projections based on search volume
- ✓ Automated SEO analytics and reporting

## Original Misconception

**What User Thought Was Wrong:**
> "MCP works when main agent uses it, but not when sub-agents use it despite having permissions"

**Actual Problem:**
Both main agent and sub-agents would fail equally because the underlying MCP server lacks authentication. Sub-agent tool access via wildcards works perfectly. The issue is purely authentication-related, not a tool access configuration issue.

## Verification Checklist

After applying the fix:
- [ ] `claude mcp list` shows environment variables configured
- [ ] Test keyword overview API call returns data (not 401 error)
- [ ] Test SERP analysis API call returns data
- [ ] Business analyst agent can perform keyword research
- [ ] Content writer agent can gather SEO intelligence

## Security Note

Per `docs/development-standards.md`:
> **SECURITY: No real API keys in documentation** - Always use placeholders like `your_api_key_here` in docs

This documentation follows that standard. Never commit actual credentials to the repository.
