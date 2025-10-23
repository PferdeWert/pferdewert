# Outrank Integration - Quick Reference

**Status**: MVP Complete (95%) | **Last Updated**: 2025-10-21

## Critical Info

### What's Working ✅
- **MongoDB**: Complete schema, 8 indexes, repository pattern (100%)
- **Webhook**: `/api/webhooks/outrank-publish` - secure, validated, ISR trigger (100%)
- **Components**: RelatedArticles, TableOfContents, ArticleContent (100%)
- **ISR Article Pages**: `/pferde-ratgeber/[slug]` - fully functional (100%)


## Key Files

```
✅ types/ratgeber.ts                    - Complete schema (284 lines)
✅ lib/mongo/ratgeber-repository.ts     - All CRUD + search (541 lines)
✅ lib/mongo/ratgeber-setup.ts          - 8 indexes + utilities
✅ pages/api/webhooks/outrank-publish.ts - Webhook handler (296 lines)
✅ lib/webhook-security.ts              - Auth + rate limiting
✅ lib/webhook-utils.ts                 - Retry + DLQ
✅ components/ratgeber/*.tsx            - 3/3 components
✅ pages/pferde-ratgeber/[slug].tsx     - ISR article page
📦 pages/pferde-ratgeber/index.tsx      - Static registry (MVP scope)
```

## Repository Methods

```typescript
// Available in getRatgeberRepository(db)
findBySlug(slug)              // Single article for ISR
findPublished(page, limit)    // Paginated list
findRelated(articleId, limit) // Related articles
findByCategory(cat, page)     // Category filter
search(query, page, limit)    // Full-text search
getAllSlugs()                 // For getStaticPaths
createFromOutrank(payload)    // Webhook creates article
updatePferdewertFields()      // Edit customizations
updatePublishingStatus()      // Workflow transitions
```

## MVP Complete - Post-Launch Enhancements

1. **Phase 2 - Dynamic Index Page** (4h)
   - Migrate `/pferde-ratgeber/index.tsx` to MongoDB
   - Implement pagination with `findPublished()`

2. **Phase 2 - Sitemap Integration** (2h)
   - Update sitemap generation to include MongoDB articles

3. **Phase 3 - DLQ Backend** (3h)
   - Persist failed webhooks to MongoDB collection for retry management

## Environment Variables

```bash
OUTRANK_WEBHOOK_SECRET=your_secure_token_here
MONGODB_URI=mongodb+srv://...
```

## MVP Testing Flow

1. Send webhook → MongoDB article created ✅
2. Access `/pferde-ratgeber/{slug}` → ISR generates page ✅
3. Article accessible via direct URL (SEO/sharing ready)
4. Index page uses static registry (manual addition for MVP)

## Architecture

```
Outrank.so → Webhook (Zod validated, Bearer auth)
           → MongoDB (ratgeber_articles collection)
           → ISR Revalidation
           → [slug].tsx ✅ | index.tsx ❌
           → CDN (0-5ms load times)
```

## Business Model

- **Cost**: €99/month (30 articles)
- **Break-even**: 6-7 months (optimistic) | 30 months (conservative)
- **Risk**: Phase 1 with 5 articles to validate ROI
- **Mitigation**: 15% local customization, max 20-30% AI content

## Code Quality

- ✅ No `any` types
- ✅ Structured logging (`@/lib/log`)
- ✅ Constant-time comparison (timing attacks)
- ✅ Exponential backoff with jitter
- ✅ Enterprise security (HMAC, rate limiting)
