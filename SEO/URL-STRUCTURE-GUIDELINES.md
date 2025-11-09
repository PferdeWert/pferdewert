# URL Structure Guidelines - PferdeWert.de

**CRITICAL**: This document defines the canonical URL structure for all content on PferdeWert.de.

---

## Content Type URL Patterns

### 1. Ratgeber (Guide) Content

**Base Path**: `/pferde-ratgeber/`

**Pattern**: `https://pferdewert.de/pferde-ratgeber/{article-slug}`

**Examples**:
- ✅ `/pferde-ratgeber/dressurpferd-kaufen`
- ✅ `/pferde-ratgeber/was-kostet-ein-pferd`
- ✅ `/pferde-ratgeber/pferdekaufvertrag`
- ✅ `/pferde-ratgeber/springpferd-kaufen`
- ❌ `/ratgeber/pferdekauf/dressurpferd-kaufen` (WRONG - old structure)
- ❌ `/ratgeber/dressurpferd-kaufen` (WRONG - wrong base path)

**Nested Categories**: AVOID nested paths. Use flat structure with descriptive slugs instead.

**Reasoning**:
- Flat structure = better for SEO (less URL depth)
- `/pferde-ratgeber/` = includes target keyword "pferde" in URL
- Category implied by slug itself (e.g., `pferdekauf-*`, `springpferd-*`)

---

### 2. Sub-Topics within Guides

**Pattern**: `https://pferdewert.de/pferde-ratgeber/{main-topic}/{sub-topic}`

**Use ONLY when necessary** (max 1 level deep):

**Examples**:
- ✅ `/pferde-ratgeber/pferd-kaufen/kosten`
- ✅ `/pferde-ratgeber/pferd-verkaufen/tipps`
- ✅ `/pferde-ratgeber/aku-pferd/kosten`
- ❌ `/pferde-ratgeber/pferd/kaufen/kosten` (too deep)

**Rule**: Max 2 levels after `/pferde-ratgeber/` (main-topic + sub-topic)

---

### 3. Service Pages

**Pattern**: `https://pferdewert.de/{service-name}`

**Examples**:
- `/pferdebewertung` (main service)
- `/pferde-preis-berechnen` (calculator)
- `/ergebnis` (results page)

---

### 4. Static Pages

**Pattern**: `https://pferdewert.de/{page-name}`

**Examples**:
- `/datenschutz`
- `/impressum`
- `/ueber-pferdewert`

---

## URL Slug Formatting Rules

### Required Format:
- **Lowercase only**: `dressurpferd-kaufen` (not `Dressurpferd-Kaufen`)
- **Hyphens as separators**: `pferd-kaufen` (not `pferd_kaufen`)
- **No special characters**: Only `a-z`, `0-9`, `-`
- **No umlauts** - Replace with standard mapping:
  - `ä` → `ae`
  - `ö` → `oe`
  - `ü` → `ue`
  - `ß` → `ss`

### Length Guidelines:
- **Optimal**: 3-5 words
- **Maximum**: 60 characters
- **Primary keyword MUST be present**

### Examples:
- ✅ `dressurpferd-kaufen`
- ✅ `pferd-kaufen-kosten`
- ✅ `springpferd-kaufen-tipps`
- ❌ `dressurpferd-kaufen-der-ultimative-ratgeber-2025` (too long)
- ❌ `artikel-123` (no keyword)
- ❌ `pferd_kaufen` (underscore instead of hyphen)

---

## Canonical URL Rules

### Format:
```
https://pferdewert.de/{content-type}/{slug}
```

### Requirements:
- Always `https://` (never `http://`)
- Never include `www.` subdomain
- No trailing slash (except root: `https://pferdewert.de/`)
- Strip tracking parameters: `utm_*`, `fbclid`, `gclid`, etc.

### Examples:
✅ `https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen`
❌ `https://www.pferdewert.de/pferde-ratgeber/dressurpferd-kaufen/` (www + trailing slash)
❌ `https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen?utm_source=facebook` (tracking param)

---

## Implementation Checklist

When creating new content, verify:

- [ ] Base path is `/pferde-ratgeber/` for guide content
- [ ] Slug follows formatting rules (lowercase, hyphens, no umlauts)
- [ ] URL depth is max 2 levels (base + main-topic + sub-topic)
- [ ] Primary keyword is present in slug
- [ ] Canonical URL uses correct format
- [ ] All metadata references use correct URL structure
- [ ] Schema markup uses correct absolute URLs
- [ ] Internal links reference correct paths

---

## Migration Notes

**Historical URLs** (before 2025-01-09):
- Some SEO documentation incorrectly used `/ratgeber/pferdekauf/` structure
- This structure was NEVER implemented on the live site
- All new content MUST use `/pferde-ratgeber/` structure

**Reference Files to Update**:
- `SEO/SEO-PROZESS/orchestration/phase-5-onpage-seo.md` (lines 218-224)
- Any content outlines referencing old structure

---

## Quick Reference

**Correct Base Path**: `/pferde-ratgeber/`
**Incorrect Base Path**: `/ratgeber/` or `/ratgeber/pferdekauf/`

**When in doubt**: Check `frontend/pages/pferde-ratgeber/` directory for existing structure.

---

**Last Updated**: 2025-01-09
**Status**: CANONICAL - This is the definitive URL structure reference
