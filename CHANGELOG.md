# Changelog

## [2025-01-10] - Price Increase Implementation: 9,90€ → 14,90€

### Added
- **Centralized pricing configuration** - Single source of truth in `lib/pricing.ts` for all price data
- **TypeScript types** - Complete type safety for pricing constants and configurations
- **Utility functions** - formatPrice(), toCents(), validatePricing() helpers
- **Schema.org pricing** - Structured data support for SEO optimization
- **Environment-based Stripe config** - Dynamic Price ID loading from environment variables

### Enhanced  
- **Psychological pricing strategy** - 14,90€ current price with 39€ decoy price for anchoring effect
- **Historical price tracking** - Launch (4,90€), previous (9,90€), current (14,90€) for comparison texts
- **German currency formatting** - Proper comma decimal separator throughout application
- **Marketing copy automation** - Dynamic CTA buttons and FAQ answers based on pricing config

### Fixed
- **FAQ display bug** - Corrected literal string "{PRICING_TEXTS.whyAffordable}" to proper JSX expression
- **Hardcoded price removal** - Eliminated all static 9,90€ references across frontend pages
- **Console.log replacement** - Development-only logging with proper dynamic import structure
- **TypeScript compliance** - All pricing references now type-safe with const assertions

### Technical
- **Centralized configuration pattern** - All prices managed from single `lib/pricing.ts` file
- **Stripe integration update** - New Price ID for 14,90€ with automatic cent conversion
- **Development helpers** - Validation and logging for price configuration integrity
- **Template literal migration** - All pricing texts now use centralized string templates

### Files Changed
- `frontend/lib/pricing.ts` - New centralized pricing configuration (154 lines)
- `frontend/pages/index.tsx` - Updated pricing imports and fixed FAQ bug (line 86)
- `frontend/pages/pferd-kaufen.tsx` - Migrated to centralized pricing imports
- `frontend/pages/pferd-verkaufen.tsx` - Migrated to centralized pricing imports  
- `frontend/pages/was-ist-mein-pferd-wert.tsx` - Migrated to centralized pricing imports

### Quality Assurance
- ✅ TypeScript: No type errors
- ✅ ESLint: All pricing-related violations resolved
- ✅ Manual verification: All hardcoded prices removed
- ✅ Functionality: Pricing displays consistently across all pages

---

## [2025-01-09] - Real Customer Testimonial Integration & Asset Cleanup

### Added
- **Real customer testimonial** - Eva T. testimonial with authentic content about Fürstiano
- **Instagram integration** - Added @die_rappenschmiede link with proper icon display
- **Image optimization** - WebP conversion for Eva's customer photo (64x64, 2.18 KB)

### Enhanced
- **Mixed testimonial approach** - 2 real customer testimonials + 1 composite for balanced social proof
- **Consistent Instagram styling** - Matching icon treatment across all customer testimonials
- **Professional testimonial content** - Authentic German testimonial about post-injury horse valuation

### Optimized
- **Asset management** - Cleaned up testimonials folder from 18 files to 2 active images
- **File structure** - Removed 16 unused customer photos (various formats and sizes)
- **Storage efficiency** - Deleted redundant Eva.jpg source file after WebP conversion

### Technical
- Extended `RealTestimonial` interface to support multiple real customers
- Changed from single `realTestimonial` to `realTestimonials` array structure
- Added Sharp-based image processing workflow for optimal WebP conversion
- Maintained responsive layout consistency with new testimonial structure

### Files Changed
- `frontend/pages/index.tsx` - Added Eva T. testimonial, updated testimonial arrays
- `frontend/public/images/testimonials/` - Added eva-customer-64.webp, removed 16 unused files
- `docs/Eva.jpg` - Removed after conversion to optimized WebP format

---

## [2025-01-07] - Testimonial Content & Technical Fixes

### Fixed
- **Critical Instagram import error** - Resolved ReferenceError that was crashing homepage
- **Testimonial content alignment** - Fixed vertical text positioning consistency across all cards
- **Content optimization** - Shortened testimonial text for better readability and layout balance

### Enhanced
- **Improved text flow** - Reduced testimonial text length while maintaining authenticity
- **Better visual hierarchy** - Consistent spacing and alignment between photo and placeholder testimonials
- **Content quality** - More concise messaging while preserving social proof value

### Technical
- Added `Instagram` import to lucide-react imports in pages/index.tsx
- Standardized customer info section structure with consistent min-height and flex layout
- Improved responsive design with proper width constraints for testimonial photos

### Files Changed
- `frontend/pages/index.tsx` - Fixed import errors and testimonial content alignment

---

## [2025-01-07] - Testimonial Section UX Optimization

### Fixed
- **Testimonial alignment issues** - Cards now properly aligned horizontally on desktop
- **Inconsistent card heights** - Replaced fixed min-height with flexible auto-sizing
- **Mobile layout spacing** - Improved responsive stacking with consistent gaps

### Enhanced  
- **Real customer testimonials** - Added authentic customer with Instagram integration
- **Visual hierarchy** - Better spacing with `gap-6 lg:gap-8` grid layout
- **Responsive design** - Optimized breakpoints: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Social proof** - Customer photos and verified Instagram handles for credibility

### Technical
- Removed problematic `transform lg:scale-105` causing alignment issues
- Flattened testimonial grid structure for consistent positioning
- Added TypeScript interfaces for testimonial data
- Optimized container classes for better responsive behavior

### Files Changed
- `frontend/pages/index.tsx` - Complete testimonial section redesign
- `frontend/public/images/testimonials/` - Added customer photos (WebP optimized)

---

*Previous commits available in git history*