# Image Attribution Guide

**When to use:** Only load this guide when adding new images from external sources (Wikimedia Commons, Creative Commons, etc.)

## Overview

This guide covers how to properly attribute images from external sources to comply with licensing requirements, especially for Creative Commons (CC) licenses commonly found on Wikimedia Commons.

---

## Legal Requirements for Wikimedia Commons Images

### What You MUST Check

1. **License Type** - Each image has a specific license (CC BY-SA, CC BY, CC0, Public Domain)
2. **Attribution Required?** - Most CC licenses require attribution
3. **Commercial Use Allowed?** - PferdeWert is commercial, avoid NC (Non-Commercial) licenses
4. **Derivatives Allowed?** - Avoid ND (No Derivatives) if resizing/converting images

### Recommended Licenses for PferdeWert

✅ **Safe to use:**
- CC0 (Public Domain)
- CC BY
- CC BY-SA

❌ **DO NOT use:**
- CC BY-NC (Non-Commercial)
- CC BY-ND (No Derivatives)
- CC BY-NC-ND

---

## Required Attribution Information

When you find an image on Wikimedia Commons, collect:

1. **Author/Creator name** (e.g., "Usien")
2. **License type** (e.g., "CC BY-SA 3.0")
3. **License URL** (e.g., https://creativecommons.org/licenses/by-sa/3.0)
4. **Original image URL** (full Wikimedia Commons link)
5. **Image title** (optional but recommended)
6. **Changes made** (e.g., "Resized to 1200x800, converted to WebP")

### Example from Wikimedia Commons

```
Usien, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
Original: https://commons.wikimedia.org/wiki/File:Pferd_International_2011_Reiter_Hassmann_Toni_auf_Pferd_Contact.JPG
```

---

## Implementation Steps

### 1. Add to ATTRIBUTIONS.md

Add full attribution details to `/ATTRIBUTIONS.md`:

```markdown
### /public/images/ratgeber/your-image.webp
- **Original Title**: "Original Title from Wikimedia"
- **Source**: https://commons.wikimedia.org/wiki/File:XYZ.jpg
- **Author**: Author Name
- **License**: CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)
- **Via**: Wikimedia Commons
- **Changes**: Resized to 1200x800, converted to WebP format
```

### 2. Add Attribution to Component

For Ratgeber hero images, use the `RatgeberHeroImage` component with attribution prop:

```tsx
<RatgeberHeroImage
  src="/images/ratgeber/your-image.webp"
  alt="Descriptive alt text"
  priority
  attribution={{
    author: 'Author Name',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'Wikimedia Commons'
  }}
/>
```

This will display under the image:
```
Foto: Author Name / CC BY-SA 3.0 / Wikimedia Commons
```

### 3. For Other Images (Non-Hero)

For inline images, add attribution in a `<figcaption>`:

```tsx
<figure>
  <Image
    src="/images/example.webp"
    alt="..."
    width={800}
    height={600}
  />
  <figcaption className="text-xs text-gray-500 mt-1 text-center">
    Foto: Author Name /{' '}
    <a
      href="https://creativecommons.org/licenses/by-sa/3.0"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-gray-700"
    >
      CC BY-SA 3.0
    </a>
    {' '} / Wikimedia Commons
  </figcaption>
</figure>
```

---

## TypeScript Interface

Use the `ImageAttribution` interface from `@/types/attribution`:

```typescript
import { ImageAttribution } from '@/types/attribution'

const myAttribution: ImageAttribution = {
  author: 'Author Name',
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
  source: 'Wikimedia Commons',
  originalUrl: 'https://commons.wikimedia.org/wiki/File:XYZ.jpg' // optional
}
```

---

## Finding Images on Wikimedia Commons

### Search Process

1. Go to https://commons.wikimedia.org
2. Search for your topic (e.g., "Pferd Springreiten")
3. **Filter by license:**
   - Click "Advanced search"
   - Select "Free licenses" or specific CC licenses
   - Avoid "Non-commercial only"

### Getting Attribution Info

1. Click on the image
2. Click **"Use this file"** button on the right
3. Copy the attribution text provided
4. Note the license URL

---

## Common Mistakes to Avoid

❌ **Missing attribution** - Always include author + license + link
❌ **Using NC licenses** - PferdeWert is commercial
❌ **No link to license** - Link must be clickable
❌ **Attribution only in code comments** - Must be visible to users
❌ **Forgetting to document changes** - List all modifications

---

## Example: Complete Implementation

### 1. ATTRIBUTIONS.md Entry

```markdown
### /public/images/ratgeber/pferdemarkt-hero.webp
- **Original Title**: "Pferd International 2011 Reiter Hassmann Toni auf Pferd Contact"
- **Source**: https://commons.wikimedia.org/wiki/File:Pferd_International_2011_Reiter_Hassmann_Toni_auf_Pferd_Contact.JPG
- **Author**: Usien
- **License**: CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)
- **Via**: Wikimedia Commons
- **Changes**: Resized and converted to WebP format
```

### 2. Component Implementation

```tsx
<RatgeberHeroImage
  src="/images/ratgeber/pferdemarkt-hero.webp"
  alt="Pferdemarkt Deutschland 2025 - Springreiter auf Pferd bei Wettbewerb"
  priority
  attribution={{
    author: 'Usien',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'Wikimedia Commons'
  }}
/>
```

### 3. Result

✅ Legally compliant
✅ Attribution visible to users
✅ Documented in ATTRIBUTIONS.md
✅ Reusable pattern for future images

---

## Quick Checklist

When adding a new Wikimedia image:

- [ ] Check license is commercial-friendly (no NC/ND)
- [ ] Collect author, license, license URL, original URL
- [ ] Add entry to ATTRIBUTIONS.md
- [ ] Add attribution prop to component OR use figcaption
- [ ] Test that attribution link works
- [ ] Document any changes made to the image

---

## Additional Resources

- [Creative Commons License Chooser](https://creativecommons.org/choose/)
- [Wikimedia Commons](https://commons.wikimedia.org)
- [CC License Types Explained](https://creativecommons.org/licenses/)

---

## Questions?

For complex licensing questions, consult:
- Project owner
- Legal advisor for commercial use clarification
