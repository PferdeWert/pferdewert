# SEO hreflang Implementation Guide

**Created**: 2025-11-26
**Status**: ✅ Production Ready
**Applies to**: All Ratgeber articles with identical content across DE/AT/CH

---

## 🎯 Purpose

The `useSEOHreflang` hook automatically generates hreflang tags for multi-country SEO. This signals to Google that the same article exists on different domains (pferdewert.de, pferdewert.at, pferdewert.ch) for different countries.

**CRITICAL**: Only use for articles with **IDENTICAL** content across all domains.
❌ Do NOT use for country-specific articles like "pferd-kaufen-schweiz".

---

## 📦 Quick Start

### 1. Import the Hook

```tsx
import useSEOHreflang from '@/hooks/useSEOHreflang';
```

### 2. Use in Your Component

```tsx
export default function DressurpferdKaufen() {
  // Generate hreflang tags for this article path
  const hreflangTags = useSEOHreflang('/pferde-ratgeber/dressurpferd-kaufen');

  return (
    <Layout>
      <Head>
        <title>Dressurpferd kaufen: Ratgeber</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen" />

        {/* Add hreflang tags here */}
        {hreflangTags}

        {/* Rest of meta tags */}
      </Head>
      {/* Article content */}
    </Layout>
  );
}
```

---

## 🔍 What It Generates

For the path `/pferde-ratgeber/dressurpferd-kaufen`, the hook generates:

```html
<link rel="alternate" hreflang="de" href="https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen" />
<link rel="alternate" hreflang="de-AT" href="https://pferdewert.at/pferde-ratgeber/dressurpferd-kaufen" />
<link rel="alternate" hreflang="de-CH" href="https://pferdewert.ch/pferde-ratgeber/dressurpferd-kaufen" />
<link rel="alternate" hreflang="x-default" href="https://pferdewert.de/pferde-ratgeber/dressurpferd-kaufen" />
```

**Important**: The hook automatically adapts to `getAvailableCountries()`, so when you enable new countries in `lib/countries.ts`, the hreflang tags update automatically!

---

## ✅ Articles That SHOULD Use hreflang

Use `useSEOHreflang` for these types of articles:

- ✅ Generic buying guides (e.g., "dressurpferd-kaufen")
- ✅ General information articles (e.g., "was-kostet-ein-pferd")
- ✅ Breed guides (e.g., "hannoveraner")
- ✅ Any article where content is 95%+ identical across DE/AT/CH

**Reasoning**: Same content, different domain = tell Google they're equivalent.

---

## ❌ Articles That Should NOT Use hreflang

**DO NOT** use for country-specific articles:

- ❌ "pferd-kaufen-schweiz" (CH-specific marketplaces, prices)
- ❌ "pferd-kaufen-oesterreich" (AT-specific content)
- ❌ Any article with unique country-specific information

**Reasoning**: These are unique pages targeting different keywords, not translations/alternatives.

---

## 🚀 Rollout Checklist

### Phase 1: Add to Existing Articles (Priority Order)

**High-Traffic Articles** (add first):
- [ ] `/pferde-ratgeber/dressurpferd-kaufen.tsx` ✅ DONE
- [ ] `/pferde-ratgeber/springpferd-kaufen.tsx`
- [ ] `/pferde-ratgeber/freizeitpferd-kaufen.tsx`
- [ ] `/pferde-ratgeber/was-kostet-ein-pferd.tsx`
- [ ] `/pferde-ratgeber/pferdekaufvertrag.tsx`

**Medium-Traffic Articles**:
- [ ] `/pferde-ratgeber/anfaengerpferd-kaufen.tsx`
- [ ] `/pferde-ratgeber/pferdemarkt.tsx`
- [ ] `/pferde-ratgeber/lipizzaner.tsx`

**All Other Articles**:
- [ ] Any article in `/pferde-ratgeber/` with generic content

### Phase 2: Verify Implementation

For each updated article:
1. Run dev server: `npm run dev`
2. Visit article on localhost
3. View page source (Cmd+U / Ctrl+U)
4. Search for `hreflang` in source
5. Verify 4 tags present (de, de-AT, de-CH, x-default)

---

## 🔧 Implementation Pattern

**Step-by-step for each article:**

1. **Add import** at the top:
```tsx
import useSEOHreflang from '@/hooks/useSEOHreflang';
```

2. **Call hook** inside component (after function declaration):
```tsx
export default function MyArticle() {
  const hreflangTags = useSEOHreflang('/pferde-ratgeber/my-article-slug');
  // ... rest of component
}
```

3. **Insert tags** in `<Head>` (after canonical, before Open Graph):
```tsx
<Head>
  <link rel="canonical" href="..." />

  {/* hreflang tags for multi-country SEO */}
  {hreflangTags}

  {/* Open Graph */}
  <meta property="og:title" content="..." />
</Head>
```

---

## 🐛 Troubleshooting

### Tags not appearing in page source?
- Check browser console for React errors
- Verify hook import path is correct
- Ensure path starts with `/` (e.g., `/pferde-ratgeber/...`)

### Wrong domains in hreflang tags?
- Check `frontend/lib/countries.ts` → `getAvailableCountries()`
- Verify domain configuration is correct

### Build fails with "Cannot find module"?
- Ensure `frontend/hooks/useSEOHreflang.ts` exists
- Check TypeScript compilation: `npm run type-check`

---

## 📊 SEO Impact

**Expected results** (3-6 months after implementation):

1. **Reduced duplicate content issues**: Google knows pferdewert.de/.at/.ch domain versions are intentional
2. **Better geo-targeting**: Users in AT see .at domain, CH users see .ch domain
3. **Improved click-through**: Local domains (pferdewert.at) inspire more trust in local markets

**Measurement**:
- Google Search Console → Performance → Filter by country
- Track impressions/clicks for AT/CH separately
- Monitor rankings for generic keywords in local markets

---

## 🔗 Related Documentation

- [lib/countries.ts](../frontend/lib/countries.ts) - Country configuration
- [URL Structure Guidelines](../SEO/URL-STRUCTURE-GUIDELINES.md) - Canonical URL rules
- [International Rollout: Schweiz](../.working/International%20Rollout/Schweiz.md) - CH launch plan

---

## ⚡ Performance Notes

**Fast Refresh Compatibility**: The hook is optimized to avoid Fast Refresh loops by:
- Using `getAvailableCountries()` which caches results
- Returning React elements directly (no inline JSX in props)
- No dynamic dependencies in the hook

**Alternative Version**: If you need raw data instead of JSX (e.g., for server-side rendering):

```tsx
import { useHreflangData } from '@/hooks/useSEOHreflang';

const hreflangData = useHreflangData('/pferde-ratgeber/article');
// Returns: HreflangTag[] = [{ hreflang: 'de', href: '...' }, ...]
```

---

## 🎯 Next Steps

1. ✅ Hook created (`frontend/hooks/useSEOHreflang.ts`)
2. ✅ Example implementation (`dressurpferd-kaufen.tsx`)
3. ⏳ Roll out to remaining Ratgeber articles (see checklist above)
4. ⏳ Verify in Google Search Console (check Index Coverage)
5. ⏳ Monitor rankings for AT/CH markets (3-6 months)

---

**Questions?** Check the hook source code for detailed JSDoc comments:
`frontend/hooks/useSEOHreflang.ts`
