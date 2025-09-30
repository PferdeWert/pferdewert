# Pages Cleanup Plan - Final Version

## Executive Summary

**Total Pages Analyzed**: 52 pages
- ✅ **KEEP**: 20 pages (15 production + 5 SEO-processed)
- ❌ **DELETE**: 22 pages (AI-created without SEO process)

---

## ✅ KEEP - Production Pages (15 pages)

These pages exist on the `main` branch and are currently live in production.

### Core Pages
- `frontend/pages/_app.tsx`
- `frontend/pages/_document.tsx`
- `frontend/pages/index.tsx`
- `frontend/pages/ergebnis.tsx`
- `frontend/pages/beispiel-analyse.tsx`

### Service Pages
- `frontend/pages/was-ist-mein-pferd-wert.tsx`
- `frontend/pages/pferde-preis-berechnen.tsx`
- `frontend/pages/pferd-kaufen.tsx`
- `frontend/pages/pferd-verkaufen.tsx`

### Legal Pages
- `frontend/pages/ueber-pferdewert.tsx`
- `frontend/pages/datenschutz.tsx`
- `frontend/pages/impressum.tsx`
- `frontend/pages/agb.tsx`

### Test Pages (Production)
- `frontend/pages/pdf-test.tsx`
- `frontend/pages/test-loading.tsx`

**Status**: These pages are live and must NOT be deleted.

---

## ✅ KEEP - SEO Processed Pages (5 pages)

These pages went through the formal 6-step SEO process and have corresponding folders in `SEO/SEO-CONTENT/`.

| Page File | SEO Content Folder |
|-----------|-------------------|
| `frontend/pages/aku-pferd.tsx` | `SEO/SEO-CONTENT/aku-pferd/` |
| `frontend/pages/aku-pferd-ablauf.tsx` | `SEO/SEO-CONTENT/aku-pferd-ablauf/` |
| `frontend/pages/aku-pferd-klassen.tsx` | `SEO/SEO-CONTENT/aku-pferd-klassen/` |
| `frontend/pages/aku-pferd-kosten.tsx` | `SEO/SEO-CONTENT/aku-pferd-kosten/` |
| `frontend/pages/pferd-verkaufen-tipps.tsx` | `SEO/SEO-CONTENT/pferd-verkaufen-tipps/` |

**Status**: These are properly SEO-optimized pages and must be kept.

---

## ❌ DELETE - AI-Created Without SEO Process (22 pages)

These pages were created by AI but did NOT go through the formal SEO process.

### Regional Pages - Root Level (6 pages)
- ❌ `frontend/pages/pferd-kaufen-baden-wuerttemberg.tsx`
- ❌ `frontend/pages/pferd-kaufen-bayern.tsx`
- ❌ `frontend/pages/pferd-kaufen-hessen.tsx`
- ❌ `frontend/pages/pferd-kaufen-niedersachsen.tsx`
- ❌ `frontend/pages/pferd-kaufen-nrw.tsx`
- ❌ `frontend/pages/pferd-kaufen-schleswig-holstein.tsx`

### Regional Pages - Subfolder (6 pages)
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise.tsx`
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern.tsx`
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen.tsx`
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-niedersachsen.tsx`
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-nrw.tsx`
- ❌ `frontend/pages/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein.tsx`

### Category Pages (3 pages)
- ❌ `frontend/pages/dressurpferd-kaufen.tsx`
- ❌ `frontend/pages/springpferd-kaufen.tsx`
- ❌ `frontend/pages/warmblut-kaufen.tsx`

### Pferd Verkaufen Subfolder (2 pages)
- ❌ `frontend/pages/pferd-verkaufen/pferdewert-berechnen.tsx`
- ❌ `frontend/pages/pferd-verkaufen/verkaufspreis-optimieren.tsx`

### Ratgeber Pages (5 pages)
- ❌ `frontend/pages/pferde-ratgeber/index.tsx`
- ❌ `frontend/pages/pferde-ratgeber/aku-verstehen.tsx`
- ❌ `frontend/pages/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren.tsx`
- ❌ `frontend/pages/pferde-ratgeber/aku-verstehen/aku-kosten-nutzen.tsx`
- ❌ `frontend/pages/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku.tsx`

**Status**: These pages can be safely deleted as they were AI-generated without proper SEO process.

---

## Verification Checklist

Before proceeding with deletion, verify:

- [ ] All 15 production pages from `main` branch are in KEEP list
- [ ] All 5 SEO-processed pages have corresponding `SEO/SEO-CONTENT/{keyword}/` folders
- [ ] No pages in DELETE list exist on `main` branch
- [ ] Modified versions of production pages are preserved (not deleted)
- [ ] User has confirmed the cleanup plan

---

## Next Steps

1. **User Confirmation**: Review this cleanup plan
2. **Execute Deletion**: Delete all 22 pages marked with ❌
3. **Update Documentation**: Update `page-struktur-seo.md` with final structure
4. **Test**: Verify site functionality after cleanup
5. **Commit**: Create commit with cleanup changes

---

## Command Reference

### Delete Regional Pages (Root)
```bash
rm frontend/pages/pferd-kaufen-baden-wuerttemberg.tsx
rm frontend/pages/pferd-kaufen-bayern.tsx
rm frontend/pages/pferd-kaufen-hessen.tsx
rm frontend/pages/pferd-kaufen-niedersachsen.tsx
rm frontend/pages/pferd-kaufen-nrw.tsx
rm frontend/pages/pferd-kaufen-schleswig-holstein.tsx
```

### Delete Regional Pages (Subfolder + Parent)
```bash
rm -rf frontend/pages/pferd-kaufen/regionale-pferdepreise/
rm frontend/pages/pferd-kaufen/regionale-pferdepreise.tsx
```

### Delete Category Pages
```bash
rm frontend/pages/dressurpferd-kaufen.tsx
rm frontend/pages/springpferd-kaufen.tsx
rm frontend/pages/warmblut-kaufen.tsx
```

### Delete Verkaufen Subfolder
```bash
rm frontend/pages/pferd-verkaufen/pferdewert-berechnen.tsx
rm frontend/pages/pferd-verkaufen/verkaufspreis-optimieren.tsx
rmdir frontend/pages/pferd-verkaufen/
```

### Delete Ratgeber Pages
```bash
rm -rf frontend/pages/pferde-ratgeber/
```

---

## Notes

- This cleanup plan is based on git branch comparison (`main` vs current branch) and `SEO/SEO-CONTENT/` folder analysis
- All pages on `main` branch are preserved regardless of SEO process status
- Only new pages without SEO process documentation are marked for deletion
- Modified versions of existing production pages are automatically preserved