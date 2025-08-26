# Changelog

All notable changes to the PferdeWert frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2025-01-25] - Critical Production Fixes

### Fixed
- **CRITICAL: Resolved infinite loading screen bug for customers** - Fixed dual-layer rate limiting conflict that was blocking legitimate evaluation requests even when results existed in database
- **Rate Limiting System**: Removed `/api/bewertung` from middleware rate limiting to prevent conflicts with API handler rate limits
  - Middleware was blocking at 5 requests/15 minutes before reaching API's 120/200 per minute limits
  - Now only `/api/checkout` endpoint uses strict middleware rate limiting
- **ObjectId Validation**: Fixed overly strict ObjectId sanitization that was corrupting valid MongoDB ObjectIds
  - Removed problematic regex `/[^a-fA-F0-9]/g` that stripped valid characters
  - Now uses MongoDB's built-in `ObjectId.isValid()` method for proper validation
- **Runtime Errors**: Fixed variable reference errors (`sanitizedId` → `idString`) that caused crashes when evaluations not found or during caching operations

### Changed
- **Rate Limits**: Increased API rate limits from 60/100 to 120/200 requests per minute for better customer experience with direct email links
- **Error Handling**: Improved logging and error messages for better debugging in production
- **Code Quality**: Updated variable naming for consistency and clarity

### Impact
- ✅ Customer email links now work correctly on first attempt
- ✅ Loading screens resolve properly when evaluation results are ready
- ✅ Eliminated infinite polling loops that frustrated customers
- ✅ Improved system reliability and customer satisfaction

### Technical Details
- Fixed in files: `pages/api/bewertung.ts`, `middleware.ts`
- Deployed to production via main branch
- No breaking changes to existing functionality