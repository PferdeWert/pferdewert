# Outrank Integration Archive

**Archived on**: 2025-12-02
**Reason**: Integration was built but never actively used. Causes confusion in codebase.

## What this was

A complete Outrank.so webhook integration for automatic Ratgeber article publishing:
- Webhook receives articles from Outrank.so CMS
- Stores in MongoDB with versioning/analytics
- Triggers ISR revalidation for automatic page generation

## Archived Files

### API & Webhooks
- `outrank-publish.ts` - Main webhook handler
- `webhook-security.ts` - Bearer token auth, rate limiting
- `webhook-utils.ts` - Retry logic, dead letter queue
- `webhook-testing.ts` - Test utilities
- `failed-webhooks.ts` - Admin endpoint for failed webhook review

### MongoDB Layer
- `ratgeber-repository.ts` - Repository pattern for articles
- `ratgeber-repository.test.ts` - Unit tests
- `ratgeber-setup.ts` - Index creation
- `failed-webhooks-setup.ts` - DLQ collection setup
- `ratgeber.ts` - TypeScript types

### React Components
- `[slug].tsx` - Dynamic ISR page for Outrank articles
- `RelatedArticles.tsx` - Related articles component (MongoDB)
- `ArticleContent.tsx` - Article renderer with internal links
- `ArticleSchema.tsx` - Schema.org structured data
- `RatgeberLayout.tsx` - Layout wrapper

### Scripts & Docs
- `test-webhook.sh` - Curl test script
- `test-webhook-sitemap.mjs` - Sitemap test
- `outrank-*.md` - Implementation plans and status docs

## How to Restore

If you want to use Outrank integration again:

1. Move files back to their original locations
2. Update `frontend/lib/mongo/index.ts` to re-export repository
3. Configure `OUTRANK_WEBHOOK_SECRET` in environment
4. Run index creation script for MongoDB

## Current System

Ratgeber articles are now managed as static `.tsx` files in `pages/pferde-ratgeber/`.
Related articles use `RatgeberRelatedArticles` component with `ratgeber-registry.ts`.
