# Outrank.so Integration - Comprehensive Implementation Plan

**Status**: Planning Phase
**Created**: 2025-10-18
**Owner**: PferdeWert.de Development Team
**Estimated Timeline**: 4 Wochen (Pilot Phase)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Performance & SEO Analysis](#performance--seo-analysis)
4. [Implementation Details](#implementation-details)
   - [Part 1: MongoDB Schema Design](#part-1-mongodb-schema-design)
   - [Part 2: ISR Setup for /pferde-ratgeber/[slug]](#part-2-isr-setup-for-pferde-ratgeberslug)
   - [Part 3: Webhook Handler Implementation](#part-3-webhook-handler-implementation)
   - [Part 4: Related Articles Component](#part-4-related-articles-component)
5. [Security Considerations](#security-considerations)
6. [Testing Strategy](#testing-strategy)
7. [Rollout Plan](#rollout-plan)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Cost-Benefit Analysis](#cost-benefit-analysis)
10. [Risk Assessment](#risk-assessment)

---

## Executive Summary

### Problem Statement
PferdeWert.de benötigt hochwertigen SEO-Content zur Steigerung des organischen Traffics. Manuelle Content-Erstellung ist zeitaufwendig und kostenintensiv.

### Proposed Solution
Integration von Outrank.so via Webhook → MongoDB → Next.js ISR für automatisierte, SEO-optimierte Ratgeber-Articles.

### Key Benefits
- **Performance**: 0-5ms Ladezeiten nach ISR-Caching
- **SEO**: Statische HTML für optimale Crawlability
- **Content Control**: 100% Editierbarkeit durch MongoDB-Layer
- **Scalability**: 30+ Articles/month für €99
- **ROI**: Payback nach 1-2 Monaten bei voller Auslastung

### Critical Success Factors
1. Nur 20-30% des Gesamt-Contents via Outrank (Duplicate Content Vermeidung)
2. 10-15% lokale Customization pro Article (Brand Voice)
3. Strikte SEO-Monitoring (Search Console, Rankings)
4. Phase 1 Pilot mit 5 Articles vor Scaling

---

## Architecture Overview

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        OUTRANK.SO                                │
│  (AI Content Generation: 3.000+ Wörter pro Article)             │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS Webhook POST
                             │ Authorization: Bearer TOKEN
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              PFERDEWERT.DE BACKEND (Next.js API)                │
│  /api/webhooks/outrank-publish                                  │
│  - Token Validation                                             │
│  - Payload Parsing & Validation                                 │
│  - MongoDB Storage                                              │
│  - ISR Revalidation Trigger                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB (Atlas)                               │
│  Collection: ratgeber_articles                                  │
│  - Original Outrank Content                                     │
│  - Edited Content (Post-Processing)                             │
│  - Metadata (Tags, SEO, Categories)                             │
│  - Publishing Status & History                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│           NEXT.JS ISR (Incremental Static Regeneration)         │
│  /pferde-ratgeber/[slug]                                        │
│  - getStaticProps: Fetch from MongoDB                           │
│  - getStaticPaths: Dynamic route generation                     │
│  - revalidate: 86400s (24h auto-refresh)                        │
│  - On-Demand Revalidation: Via Webhook trigger                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   VERCEL CDN (Edge Network)                      │
│  - Static HTML Caching                                          │
│  - Global Distribution                                          │
│  - 0-5ms Response Times                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
                    ┌────────┴────────┐
                    │                 │
             ┌──────▼──────┐   ┌─────▼──────┐
             │    USER      │   │ GOOGLE BOT │
             │  (Browser)   │   │ (Crawler)  │
             └──────────────┘   └────────────┘
```

### Technology Stack

**Frontend**:
- Next.js 15 (Pages Router)
- TypeScript (Strict Mode)
- Tailwind CSS
- ISR (Incremental Static Regeneration)

**Backend**:
- Next.js API Routes (Webhook Handler)
- MongoDB Atlas (Content Storage)
- Zod (Payload Validation)

**External Services**:
- Outrank.so (Content Generation)
- Vercel CDN (Static Hosting)

---

## Performance & SEO Analysis

### Load Time Metrics

| Scenario | First Request | Subsequent Requests | SEO Impact |
|----------|---------------|---------------------|------------|
| **ISR (Recommended)** | 500ms | 0-5ms | ✅ Optimal (Static HTML) |
| SSR | 200-600ms | 200-600ms | ⚠️ Good (Dynamic HTML) |
| Static Generation | 0ms | 0ms | ✅ Optimal (Pre-built) |
| Client-Side (SPA) | 800ms+ | 300ms+ | ❌ Poor (JS Required) |

### SEO Performance Factors

**Positive**:
- ✅ 3.000+ Wörter AI-Content (Long-form bevorzugt von Google)
- ✅ Auto-Meta-Tags durch Outrank
- ✅ Statisches HTML für Crawler (ISR)
- ✅ CDN-Distribution (Core Web Vitals)
- ✅ Backlink-Netzwerk von Outrank (Domain Authority Boost)

**Risks**:
- ⚠️ AI-Generated Content (Google bevorzugt Original-Content)
- ⚠️ Duplicate Content Risiko (bei mehreren Outrank-Usern)
- ⚠️ Unnatürliches Backlink-Profil (Google Penguin Risiko)

**Mitigation Strategy**:
- 10-15% lokale Customization pro Article
- Canonical Tags strategisch setzen
- Max. 20-30% des Gesamt-Contents via Outrank
- Brand Voice stark differenzieren
- Regelmäßige Duplicate Content Checks

---

## Implementation Details

## Part 1: MongoDB Schema Design

### TypeScript Interfaces

```typescript
// types/ratgeber.ts

/**
 * Original Article Data from Outrank Webhook
 */
export interface OutrankArticlePayload {
  id: string;
  title: string;
  content_markdown: string;
  content_html: string;
  meta_description: string;
  created_at: string; // ISO 8601
  image_url: string;
  slug: string;
  tags: string[];
}

/**
 * Outrank Webhook Event Structure
 */
export interface OutrankWebhookEvent {
  event_type: 'publish_articles';
  timestamp: string; // ISO 8601
  data: {
    articles: OutrankArticlePayload[];
  };
}

/**
 * Enhanced Article Model (MongoDB Document)
 */
export interface RatgeberArticle {
  _id: string; // MongoDB ObjectId

  // Outrank Original Data
  outrank: {
    id: string;
    title: string;
    content_markdown: string;
    content_html: string;
    meta_description: string;
    created_at: Date;
    image_url: string;
    slug: string;
    tags: string[];
    received_at: Date; // Webhook receipt timestamp
  };

  // PferdeWert Customization
  pferdewert: {
    edited_title?: string; // Custom title override
    edited_content_html?: string; // Post-processed HTML
    custom_intro?: string; // PferdeWert-specific intro paragraph
    custom_outro?: string; // CTA or related links section
    seo_keywords: string[]; // Additional SEO keywords
    internal_links: InternalLink[]; // Links to PferdeWert pages
    featured_image?: string; // Custom header image override
  };

  // Publishing & Status
  publishing: {
    status: 'draft' | 'review' | 'published' | 'archived';
    published_at?: Date;
    scheduled_for?: Date; // Future publishing
    last_modified: Date;
    modified_by?: string; // User ID who edited
  };

  // SEO Metadata
  seo: {
    meta_title: string; // 50-60 chars
    meta_description: string; // 150-160 chars
    canonical_url: string; // Self-referencing or external
    og_image: string;
    og_title: string;
    og_description: string;
    structured_data: ArticleStructuredData; // JSON-LD
  };

  // Categorization & Taxonomy
  taxonomy: {
    primary_category: RatgeberCategory;
    subcategories: string[];
    related_topics: string[];
    target_keywords: string[]; // Primary SEO targets
  };

  // Analytics & Performance
  analytics: {
    views: number;
    unique_visitors: number;
    avg_time_on_page: number; // seconds
    bounce_rate: number; // percentage
    conversion_rate: number; // percentage (CTA clicks)
    last_analytics_update: Date;
  };

  // Versioning & History
  history: ArticleVersion[];

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

/**
 * Internal Link Structure
 */
export interface InternalLink {
  text: string; // Anchor text
  url: string; // Relative path (e.g., "/pferd-kaufen")
  position: 'intro' | 'body' | 'outro';
}

/**
 * Article Version for Edit History
 */
export interface ArticleVersion {
  version: number;
  edited_at: Date;
  edited_by: string; // User ID
  changes: {
    field: keyof RatgeberArticle;
    old_value: unknown;
    new_value: unknown;
  }[];
  commit_message?: string;
}

/**
 * Structured Data for SEO (JSON-LD)
 */
export interface ArticleStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Organization';
    name: 'PferdeWert.de';
    url: 'https://pferdewert.de';
  };
  publisher: {
    '@type': 'Organization';
    name: 'PferdeWert.de';
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  description: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

/**
 * Ratgeber Categories
 */
export enum RatgeberCategory {
  Pferdekauf = 'pferdekauf',
  Pferdeverkauf = 'pferdeverkauf',
  Pferdehaltung = 'pferdehaltung',
  Pferdegesundheit = 'pferdegesundheit',
  Pferdetraining = 'pferdetraining',
  Pferdewissen = 'pferdewissen',
  Marktanalyse = 'marktanalyse',
}
```

### MongoDB Collection Setup

```typescript
// lib/mongo/ratgeber-setup.ts

import { MongoClient, Db } from 'mongodb';
import { info, error } from '@/lib/log';

/**
 * Create Ratgeber Collection with Indexes
 */
export async function setupRatgeberCollection(db: Db): Promise<void> {
  const collectionName = 'ratgeber_articles';

  try {
    // Check if collection exists
    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName);
      info('Created collection:', collectionName);
    }

    const collection = db.collection(collectionName);

    // Create Indexes for Performance

    // 1. Slug Index (Unique) - for URL lookups
    await collection.createIndex(
      { 'outrank.slug': 1 },
      { unique: true, name: 'slug_unique' }
    );

    // 2. Status + Published Date - for listing published articles
    await collection.createIndex(
      { 'publishing.status': 1, 'publishing.published_at': -1 },
      { name: 'status_published' }
    );

    // 3. Category + Status - for category pages
    await collection.createIndex(
      { 'taxonomy.primary_category': 1, 'publishing.status': 1 },
      { name: 'category_status' }
    );

    // 4. Tags - for tag-based queries
    await collection.createIndex(
      { 'outrank.tags': 1 },
      { name: 'tags_index' }
    );

    // 5. Related Topics - for finding related articles
    await collection.createIndex(
      { 'taxonomy.related_topics': 1 },
      { name: 'related_topics' }
    );

    // 6. Full-Text Search Index
    await collection.createIndex(
      {
        'outrank.title': 'text',
        'outrank.content_markdown': 'text',
        'taxonomy.target_keywords': 'text',
      },
      {
        name: 'fulltext_search',
        weights: {
          'outrank.title': 10,
          'taxonomy.target_keywords': 5,
          'outrank.content_markdown': 1,
        },
      }
    );

    // 7. Outrank ID - for webhook idempotency checks
    await collection.createIndex(
      { 'outrank.id': 1 },
      { unique: true, name: 'outrank_id_unique' }
    );

    // 8. Created At - for sorting by recency
    await collection.createIndex(
      { 'created_at': -1 },
      { name: 'created_at_desc' }
    );

    info('✅ All indexes created successfully');

  } catch (err) {
    error('Failed to setup ratgeber collection:', err);
    throw err;
  }
}

/**
 * Migration: Add new fields to existing documents
 */
export async function migrateExistingArticles(db: Db): Promise<void> {
  const collection = db.collection('ratgeber_articles');

  try {
    const result = await collection.updateMany(
      { 'analytics.views': { $exists: false } },
      {
        $set: {
          'analytics.views': 0,
          'analytics.unique_visitors': 0,
          'analytics.avg_time_on_page': 0,
          'analytics.bounce_rate': 0,
          'analytics.conversion_rate': 0,
          'analytics.last_analytics_update': new Date(),
        },
      }
    );

    info(`Migrated ${result.modifiedCount} articles with analytics fields`);
  } catch (err) {
    error('Migration failed:', err);
    throw err;
  }
}
```

### Repository Pattern (Data Access Layer)

```typescript
// lib/mongo/ratgeber-repository.ts

import { Db, ObjectId } from 'mongodb';
import { RatgeberArticle, OutrankArticlePayload, RatgeberCategory } from '@/types/ratgeber';
import { info, warn, error } from '@/lib/log';

export class RatgeberRepository {
  private collection;

  constructor(private db: Db) {
    this.collection = db.collection<RatgeberArticle>('ratgeber_articles');
  }

  /**
   * Create article from Outrank webhook
   */
  async createFromOutrank(payload: OutrankArticlePayload): Promise<RatgeberArticle> {
    try {
      // Check if article already exists (idempotency)
      const existing = await this.collection.findOne({ 'outrank.id': payload.id });

      if (existing) {
        warn('Article already exists, skipping:', payload.id);
        return existing;
      }

      const now = new Date();

      const article: Omit<RatgeberArticle, '_id'> = {
        outrank: {
          id: payload.id,
          title: payload.title,
          content_markdown: payload.content_markdown,
          content_html: payload.content_html,
          meta_description: payload.meta_description,
          created_at: new Date(payload.created_at),
          image_url: payload.image_url,
          slug: payload.slug,
          tags: payload.tags,
          received_at: now,
        },
        pferdewert: {
          seo_keywords: [],
          internal_links: [],
        },
        publishing: {
          status: 'draft', // Require manual review before publishing
          last_modified: now,
        },
        seo: {
          meta_title: payload.title.substring(0, 60),
          meta_description: payload.meta_description.substring(0, 160),
          canonical_url: `https://pferdewert.de/pferde-ratgeber/${payload.slug}`,
          og_image: payload.image_url,
          og_title: payload.title,
          og_description: payload.meta_description,
          structured_data: this.generateStructuredData(payload),
        },
        taxonomy: {
          primary_category: this.inferCategory(payload),
          subcategories: [],
          related_topics: payload.tags,
          target_keywords: payload.tags,
        },
        analytics: {
          views: 0,
          unique_visitors: 0,
          avg_time_on_page: 0,
          bounce_rate: 0,
          conversion_rate: 0,
          last_analytics_update: now,
        },
        history: [],
        created_at: now,
        updated_at: now,
      };

      const result = await this.collection.insertOne(article as RatgeberArticle);
      info('✅ Created article:', result.insertedId);

      return { ...article, _id: result.insertedId.toString() } as RatgeberArticle;

    } catch (err) {
      error('Failed to create article:', err);
      throw err;
    }
  }

  /**
   * Find article by slug
   */
  async findBySlug(slug: string): Promise<RatgeberArticle | null> {
    return this.collection.findOne({ 'outrank.slug': slug });
  }

  /**
   * Find published articles
   */
  async findPublished(limit = 50, skip = 0): Promise<RatgeberArticle[]> {
    return this.collection
      .find({ 'publishing.status': 'published' })
      .sort({ 'publishing.published_at': -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  /**
   * Find related articles by tags
   */
  async findRelated(
    tags: string[],
    excludeSlug: string,
    limit = 3
  ): Promise<RatgeberArticle[]> {
    return this.collection
      .find({
        'publishing.status': 'published',
        'outrank.tags': { $in: tags },
        'outrank.slug': { $ne: excludeSlug },
      })
      .sort({ 'analytics.views': -1 }) // Prioritize popular articles
      .limit(limit)
      .toArray();
  }

  /**
   * Update article (with versioning)
   */
  async update(
    slug: string,
    updates: Partial<RatgeberArticle>,
    userId: string
  ): Promise<boolean> {
    try {
      const current = await this.findBySlug(slug);
      if (!current) return false;

      // Create version history entry
      const version: ArticleVersion = {
        version: (current.history?.length || 0) + 1,
        edited_at: new Date(),
        edited_by: userId,
        changes: Object.keys(updates).map(field => ({
          field: field as keyof RatgeberArticle,
          old_value: current[field as keyof RatgeberArticle],
          new_value: updates[field as keyof RatgeberArticle],
        })),
      };

      const result = await this.collection.updateOne(
        { 'outrank.slug': slug },
        {
          $set: {
            ...updates,
            'publishing.last_modified': new Date(),
            'publishing.modified_by': userId,
            updated_at: new Date(),
          },
          $push: { history: version },
        }
      );

      return result.modifiedCount > 0;

    } catch (err) {
      error('Failed to update article:', err);
      throw err;
    }
  }

  /**
   * Publish article
   */
  async publish(slug: string, userId: string): Promise<boolean> {
    return this.update(
      slug,
      {
        publishing: {
          status: 'published',
          published_at: new Date(),
          last_modified: new Date(),
          modified_by: userId,
        },
      } as Partial<RatgeberArticle>,
      userId
    );
  }

  /**
   * Get all slugs for ISR getStaticPaths
   */
  async getAllSlugs(): Promise<string[]> {
    const articles = await this.collection
      .find({ 'publishing.status': 'published' })
      .project({ 'outrank.slug': 1 })
      .toArray();

    return articles.map(a => a.outrank.slug);
  }

  /**
   * Helper: Infer category from article content
   */
  private inferCategory(payload: OutrankArticlePayload): RatgeberCategory {
    const title = payload.title.toLowerCase();
    const content = payload.content_markdown.toLowerCase();

    if (title.includes('kaufen') || content.includes('pferd kaufen')) {
      return RatgeberCategory.Pferdekauf;
    }
    if (title.includes('verkaufen') || content.includes('pferd verkaufen')) {
      return RatgeberCategory.Pferdeverkauf;
    }
    if (title.includes('haltung') || content.includes('stallhaltung')) {
      return RatgeberCategory.Pferdehaltung;
    }
    if (title.includes('gesundheit') || content.includes('tierarzt')) {
      return RatgeberCategory.Pferdegesundheit;
    }
    if (title.includes('training') || content.includes('ausbildung')) {
      return RatgeberCategory.Pferdetraining;
    }

    return RatgeberCategory.Pferdewissen; // Default
  }

  /**
   * Helper: Generate JSON-LD structured data
   */
  private generateStructuredData(payload: OutrankArticlePayload): ArticleStructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: payload.title,
      image: [payload.image_url],
      datePublished: payload.created_at,
      dateModified: payload.created_at,
      author: {
        '@type': 'Organization',
        name: 'PferdeWert.de',
        url: 'https://pferdewert.de',
      },
      publisher: {
        '@type': 'Organization',
        name: 'PferdeWert.de',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pferdewert.de/logo.png',
        },
      },
      description: payload.meta_description,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://pferdewert.de/pferde-ratgeber/${payload.slug}`,
      },
    };
  }
}

// Usage example
import { connectToDatabase } from '@/lib/mongo';

export async function getRatgeberRepository(): Promise<RatgeberRepository> {
  const { db } = await connectToDatabase();
  return new RatgeberRepository(db);
}
```

---

## Part 2: ISR Setup for /pferde-ratgeber/[slug]

### Next.js Page Component

```typescript
// pages/pferde-ratgeber/[slug].tsx

import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { RatgeberArticle } from '@/types/ratgeber';
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import RatgeberLayout from '@/components/layouts/RatgeberLayout';
import RelatedArticles from '@/components/ratgeber/RelatedArticles';
import TableOfContents from '@/components/ratgeber/TableOfContents';
import ArticleContent from '@/components/ratgeber/ArticleContent';
import ArticleSchema from '@/components/seo/ArticleSchema';
import { info, error } from '@/lib/log';

interface RatgeberPageProps {
  article: RatgeberArticle;
  relatedArticles: RatgeberArticle[];
}

export default function RatgeberPage({ article, relatedArticles }: RatgeberPageProps) {
  // Use edited content if available, otherwise original
  const displayTitle = article.pferdewert.edited_title || article.outrank.title;
  const displayContent = article.pferdewert.edited_content_html || article.outrank.content_html;
  const displayImage = article.pferdewert.featured_image || article.outrank.image_url;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{article.seo.meta_title}</title>
        <meta name="title" content={article.seo.meta_title} />
        <meta name="description" content={article.seo.meta_description} />
        <link rel="canonical" href={article.seo.canonical_url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={article.seo.canonical_url} />
        <meta property="og:title" content={article.seo.og_title} />
        <meta property="og:description" content={article.seo.og_description} />
        <meta property="og:image" content={article.seo.og_image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={article.seo.canonical_url} />
        <meta property="twitter:title" content={article.seo.og_title} />
        <meta property="twitter:description" content={article.seo.og_description} />
        <meta property="twitter:image" content={article.seo.og_image} />

        {/* Article Meta */}
        <meta property="article:published_time" content={article.publishing.published_at?.toISOString()} />
        <meta property="article:modified_time" content={article.updated_at.toISOString()} />
        <meta property="article:author" content="PferdeWert.de" />
        {article.outrank.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>

      {/* JSON-LD Structured Data */}
      <ArticleSchema data={article.seo.structured_data} />

      <RatgeberLayout>
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Featured Image */}
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={displayImage}
              alt={displayTitle}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Meta */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {displayTitle}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time dateTime={article.publishing.published_at?.toISOString()}>
                {new Date(article.publishing.published_at || '').toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              <span>·</span>

              <span>{Math.ceil(article.analytics.avg_time_on_page / 60)} Min. Lesezeit</span>

              <span>·</span>

              <span>{article.analytics.views} Aufrufe</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {article.outrank.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Custom Intro (if set) */}
          {article.pferdewert.custom_intro && (
            <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg text-gray-800">{article.pferdewert.custom_intro}</p>
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents content={displayContent} />

          {/* Article Content */}
          <ArticleContent
            html={displayContent}
            internalLinks={article.pferdewert.internal_links}
          />

          {/* Custom Outro / CTA (if set) */}
          {article.pferdewert.custom_outro && (
            <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <div dangerouslySetInnerHTML={{ __html: article.pferdewert.custom_outro }} />
            </div>
          )}

          {/* CTA to Valuation */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Möchtest du den Wert deines Pferdes ermitteln?
            </h3>
            <p className="text-lg mb-6">
              Nutze unsere KI-gestützte Bewertung für eine präzise Marktanalyse in nur 2 Minuten.
            </p>
            <a
              href="/pferd-verkaufen"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Jetzt Pferdewert ermitteln
            </a>
          </div>
        </article>

        {/* Related Articles Component */}
        <RelatedArticles articles={relatedArticles} />
      </RatgeberLayout>
    </>
  );
}

/**
 * ISR: Generate static paths for all published articles
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const repo = await getRatgeberRepository();
    const slugs = await repo.getAllSlugs();

    info(`Generated ${slugs.length} static paths for ratgeber articles`);

    return {
      paths: slugs.map(slug => ({ params: { slug } })),
      fallback: 'blocking', // ISR: Generate new pages on-demand
    };
  } catch (err) {
    error('Failed to generate static paths:', err);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

/**
 * ISR: Fetch article data at build time + on-demand revalidation
 */
export const getStaticProps: GetStaticProps<RatgeberPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  try {
    const repo = await getRatgeberRepository();

    // Fetch main article
    const article = await repo.findBySlug(slug);

    if (!article || article.publishing.status !== 'published') {
      return { notFound: true };
    }

    // Fetch related articles
    const relatedArticles = await repo.findRelated(article.outrank.tags, slug, 3);

    // Serialize dates for Next.js
    const serializedArticle = JSON.parse(JSON.stringify(article));
    const serializedRelated = JSON.parse(JSON.stringify(relatedArticles));

    return {
      props: {
        article: serializedArticle,
        relatedArticles: serializedRelated,
      },
      revalidate: 86400, // 24 hours automatic revalidation
    };
  } catch (err) {
    error('Failed to fetch article:', err);
    return { notFound: true };
  }
};
```

### Ratgeber Index Page

```typescript
// pages/pferde-ratgeber/index.tsx

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { RatgeberArticle } from '@/types/ratgeber';
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import RatgeberLayout from '@/components/layouts/RatgeberLayout';

interface RatgeberIndexProps {
  articles: RatgeberArticle[];
}

export default function RatgeberIndex({ articles }: RatgeberIndexProps) {
  return (
    <>
      <Head>
        <title>Ratgeber | PferdeWert.de - Expertenratschläge für Pferdebesitzer</title>
        <meta
          name="description"
          content="Entdecke unseren umfassenden Ratgeber mit Expertenratschlägen zu Pferdekauf, -verkauf, -haltung und mehr. Von Profis für Pferdebesitzer."
        />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber" />
      </Head>

      <RatgeberLayout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Ratgeber für Pferdebesitzer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fundiertes Wissen zu Pferdekauf, Haltung, Gesundheit und mehr – von Experten für Pferdeliebhaber.
            </p>
          </header>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <Link
                key={article._id}
                href={`/pferde-ratgeber/${article.outrank.slug}`}
                className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Article Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={article.pferdewert.featured_image || article.outrank.image_url}
                    alt={article.pferdewert.edited_title || article.outrank.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.pferdewert.edited_title || article.outrank.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.seo.meta_description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.outrank.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RatgeberLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<RatgeberIndexProps> = async () => {
  try {
    const repo = await getRatgeberRepository();
    const articles = await repo.findPublished(50);

    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)),
      },
      revalidate: 3600, // 1 hour
    };
  } catch (err) {
    error('Failed to fetch articles:', err);
    return {
      props: { articles: [] },
      revalidate: 60,
    };
  }
};
```

---

## Part 3: Webhook Handler Implementation

### Webhook API Route

```typescript
// pages/api/webhooks/outrank-publish.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { OutrankWebhookEvent } from '@/types/ratgeber';
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import { info, warn, error } from '@/lib/log';

/**
 * Zod Schema for Payload Validation
 */
const OutrankArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  content_markdown: z.string().min(100),
  content_html: z.string().min(100),
  meta_description: z.string().min(50).max(200),
  created_at: z.string().datetime(),
  image_url: z.string().url(),
  slug: z.string().min(1).max(100),
  tags: z.array(z.string()).min(1),
});

const OutrankWebhookSchema = z.object({
  event_type: z.literal('publish_articles'),
  timestamp: z.string().datetime(),
  data: z.object({
    articles: z.array(OutrankArticleSchema).min(1),
  }),
});

/**
 * Webhook Handler for Outrank Article Publishing
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      allowed: ['POST'],
    });
  }

  // 2. Authorization: Bearer Token Validation
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    warn('Webhook request missing Authorization header');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid Authorization header',
    });
  }

  const token = authHeader.split(' ')[1];
  const expectedToken = process.env.OUTRANK_WEBHOOK_SECRET;

  if (!expectedToken) {
    error('OUTRANK_WEBHOOK_SECRET not configured in environment');
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Webhook authentication not configured',
    });
  }

  if (token !== expectedToken) {
    warn('Invalid webhook token received');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid access token',
    });
  }

  // 3. Payload Validation
  let payload: OutrankWebhookEvent;

  try {
    payload = OutrankWebhookSchema.parse(req.body);
    info('✅ Webhook payload validated:', {
      event: payload.event_type,
      article_count: payload.data.articles.length,
      timestamp: payload.timestamp,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      error('Invalid webhook payload:', err.errors);
      return res.status(400).json({
        error: 'Invalid payload',
        details: err.errors,
      });
    }

    error('Unexpected validation error:', err);
    return res.status(500).json({
      error: 'Validation failed',
    });
  }

  // 4. Process Articles
  const repo = await getRatgeberRepository();
  const results = {
    success: [] as string[],
    failed: [] as { id: string; error: string }[],
    skipped: [] as string[],
  };

  for (const article of payload.data.articles) {
    try {
      // Create article in MongoDB
      const created = await repo.createFromOutrank(article);

      if (created) {
        results.success.push(article.id);
        info(`✅ Article stored: ${article.slug}`);

        // 5. Trigger ISR Revalidation
        try {
          await res.revalidate(`/pferde-ratgeber/${article.slug}`);
          await res.revalidate('/pferde-ratgeber'); // Index page
          info(`✅ ISR revalidated: /pferde-ratgeber/${article.slug}`);
        } catch (revalidateErr) {
          // Non-critical error: log but don't fail the webhook
          warn('ISR revalidation failed:', revalidateErr);
        }
      } else {
        results.skipped.push(article.id);
        info(`⚠️ Article skipped (already exists): ${article.slug}`);
      }
    } catch (err) {
      results.failed.push({
        id: article.id,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
      error(`❌ Failed to process article ${article.id}:`, err);
    }
  }

  // 6. Send Response
  const totalProcessed = results.success.length + results.failed.length + results.skipped.length;
  const statusCode = results.failed.length > 0 ? 207 : 200; // 207 Multi-Status if partial failure

  info(`Webhook processed: ${results.success.length} success, ${results.failed.length} failed, ${results.skipped.length} skipped`);

  return res.status(statusCode).json({
    message: 'Webhook processed',
    total: totalProcessed,
    results,
  });
}

/**
 * Disable body parsing to handle raw body for signature verification (future)
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase for large article content
    },
  },
};
```

### Environment Variables Setup

```bash
# .env.local

# Outrank Webhook Secret
OUTRANK_WEBHOOK_SECRET=your_secure_random_token_here_min_32_chars
# Generate with: openssl rand -base64 32
```

### Webhook Security Best Practices

```typescript
// lib/webhook-security.ts

import crypto from 'crypto';

/**
 * Generate secure random token for webhook
 */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString('base64');
}

/**
 * Constant-time comparison to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');

  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Rate limiting configuration (using Vercel Edge Config or Redis)
 */
export interface RateLimitConfig {
  maxRequests: number; // Max requests per window
  windowMs: number; // Time window in milliseconds
}

export const WEBHOOK_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10, // Max 10 webhook calls
  windowMs: 60 * 1000, // Per minute
};
```

### Error Handling & Retry Logic

```typescript
// lib/webhook-utils.ts

import { info, warn, error } from '@/lib/log';

/**
 * Retry configuration for failed operations
 */
export interface RetryConfig {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier: number;
}

/**
 * Retry wrapper with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  config: RetryConfig = {
    maxRetries: 3,
    delayMs: 1000,
    backoffMultiplier: 2,
  }
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < config.maxRetries) {
        const delay = config.delayMs * Math.pow(config.backoffMultiplier, attempt);
        warn(`Retry attempt ${attempt + 1}/${config.maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  error('All retry attempts failed:', lastError);
  throw lastError;
}

/**
 * Dead Letter Queue for failed webhooks
 */
export interface FailedWebhookEntry {
  id: string;
  payload: unknown;
  error: string;
  timestamp: Date;
  retry_count: number;
}

export async function storeFailedWebhook(
  db: Db,
  payload: unknown,
  error: Error
): Promise<void> {
  try {
    await db.collection('webhook_failures').insertOne({
      id: crypto.randomUUID(),
      payload,
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
      retry_count: 0,
    });
  } catch (err) {
    error('Failed to store webhook failure:', err);
  }
}
```

---

## Part 4: Related Articles Component

### Component Implementation

```typescript
// components/ratgeber/RelatedArticles.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RatgeberArticle } from '@/types/ratgeber';

interface RelatedArticlesProps {
  articles: RatgeberArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Weiterführende Artikel
        </h2>
        <p className="text-lg text-gray-600">
          Diese Artikel könnten dich ebenfalls interessieren
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <RelatedArticleCard key={article._id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}

interface RelatedArticleCardProps {
  article: RatgeberArticle;
  index: number;
}

function RelatedArticleCard({ article, index }: RelatedArticleCardProps) {
  const displayTitle = article.pferdewert.edited_title || article.outrank.title;
  const displayImage = article.pferdewert.featured_image || article.outrank.image_url;

  return (
    <Link
      href={`/pferde-ratgeber/${article.outrank.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={displayImage}
          alt={displayTitle}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {displayTitle}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {article.seo.meta_description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.outrank.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
          <span>Weiterlesen</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
```

### Table of Contents Component

```typescript
// components/ratgeber/TableOfContents.tsx

import React, { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extracted: Heading[] = Array.from(headingElements).map((el, index) => {
      const id = el.id || `heading-${index}`;
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
      };
    });

    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📋 Inhaltsverzeichnis
      </h2>

      <ul className="space-y-2">
        {headings.map(heading => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`
                text-sm hover:text-blue-600 transition-colors
                ${activeId === heading.id ? 'text-blue-600 font-semibold' : 'text-gray-700'}
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Article Content Component (with Internal Links)

```typescript
// components/ratgeber/ArticleContent.tsx

import React, { useEffect, useRef } from 'react';
import { InternalLink } from '@/types/ratgeber';

interface ArticleContentProps {
  html: string;
  internalLinks: InternalLink[];
}

export default function ArticleContent({ html, internalLinks }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Add IDs to headings for anchor links
    const headings = contentRef.current.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent || '';
        heading.id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `heading-${index}`;
      }
    });

    // Inject internal links at specified positions
    internalLinks.forEach(link => {
      const targetSelector = getPositionSelector(link.position);
      const targetElement = contentRef.current?.querySelector(targetSelector);

      if (targetElement) {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.text;
        linkElement.className = 'text-blue-600 hover:underline font-medium';

        targetElement.appendChild(linkElement);
      }
    });
  }, [html, internalLinks]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-lg prose-img:shadow-md
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
        prose-li:mb-2
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function getPositionSelector(position: InternalLink['position']): string {
  switch (position) {
    case 'intro':
      return 'p:first-of-type';
    case 'body':
      return 'p:nth-of-type(5)'; // Middle of article
    case 'outro':
      return 'p:last-of-type';
  }
}
```

---

## Security Considerations

### Authentication & Authorization

1. **Webhook Secret Validation**
   - Use cryptographically secure random tokens (min 32 chars)
   - Store in environment variables, never in code
   - Implement constant-time comparison to prevent timing attacks

2. **HTTPS Enforcement**
   - All webhook endpoints MUST use HTTPS
   - Vercel automatically enforces HTTPS

3. **Rate Limiting**
   - Implement rate limiting: max 10 requests/minute per IP
   - Use Vercel Edge Middleware or Upstash Redis for distributed rate limiting

4. **Input Validation**
   - Use Zod for strict schema validation
   - Sanitize HTML content before storage (prevent XSS)
   - Validate image URLs (prevent SSRF)

### Content Security

1. **HTML Sanitization**
   ```typescript
   import DOMPurify from 'isomorphic-dompurify';

   const sanitized = DOMPurify.sanitize(rawHtml, {
     ALLOWED_TAGS: ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img'],
     ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
   });
   ```

2. **Image URL Validation**
   - Whitelist allowed image domains (Outrank CDN)
   - Validate URLs before displaying
   - Use Next.js Image Optimization with `remotePatterns`

3. **MongoDB Injection Prevention**
   - Use parameterized queries (MongoDB driver handles this)
   - Never concatenate user input into queries
   - Validate all ObjectIds before querying

### Monitoring & Alerting

1. **Webhook Failure Alerts**
   - Log all webhook failures to Dead Letter Queue
   - Send Slack/Email notifications for critical errors
   - Implement retry mechanism with exponential backoff

2. **Security Monitoring**
   - Log all authentication failures
   - Monitor for suspicious patterns (high failure rates)
   - Track webhook request origins

---

## Testing Strategy

### Unit Tests

```typescript
// __tests__/lib/ratgeber-repository.test.ts

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { RatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import { OutrankArticlePayload } from '@/types/ratgeber';

describe('RatgeberRepository', () => {
  let mongod: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let repo: RatgeberRepository;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    client = await MongoClient.connect(mongod.getUri());
    db = client.db('test');
    repo = new RatgeberRepository(db);
  });

  afterEach(async () => {
    await client.close();
    await mongod.stop();
  });

  describe('createFromOutrank', () => {
    it('should create article from valid payload', async () => {
      const payload: OutrankArticlePayload = {
        id: 'test-123',
        title: 'Test Article',
        content_markdown: '# Test\n\nThis is a test article.',
        content_html: '<h1>Test</h1><p>This is a test article.</p>',
        meta_description: 'Test description for SEO',
        created_at: new Date().toISOString(),
        image_url: 'https://example.com/image.jpg',
        slug: 'test-article',
        tags: ['test', 'article'],
      };

      const article = await repo.createFromOutrank(payload);

      expect(article).toBeDefined();
      expect(article.outrank.title).toBe('Test Article');
      expect(article.publishing.status).toBe('draft');
    });

    it('should prevent duplicate articles (idempotency)', async () => {
      const payload: OutrankArticlePayload = {
        id: 'test-456',
        title: 'Duplicate Test',
        content_markdown: 'Content',
        content_html: '<p>Content</p>',
        meta_description: 'Description',
        created_at: new Date().toISOString(),
        image_url: 'https://example.com/image.jpg',
        slug: 'duplicate-test',
        tags: ['test'],
      };

      const first = await repo.createFromOutrank(payload);
      const second = await repo.createFromOutrank(payload);

      expect(first._id).toBe(second._id); // Same article returned
    });
  });

  describe('findBySlug', () => {
    it('should find article by slug', async () => {
      const payload: OutrankArticlePayload = {
        id: 'test-789',
        title: 'Find By Slug Test',
        content_markdown: 'Content',
        content_html: '<p>Content</p>',
        meta_description: 'Description',
        created_at: new Date().toISOString(),
        image_url: 'https://example.com/image.jpg',
        slug: 'find-by-slug-test',
        tags: ['test'],
      };

      await repo.createFromOutrank(payload);
      const found = await repo.findBySlug('find-by-slug-test');

      expect(found).toBeDefined();
      expect(found?.outrank.title).toBe('Find By Slug Test');
    });

    it('should return null for non-existent slug', async () => {
      const found = await repo.findBySlug('non-existent');
      expect(found).toBeNull();
    });
  });
});
```

### Integration Tests

```typescript
// __tests__/api/webhooks/outrank-publish.test.ts

import { describe, it, expect } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/webhooks/outrank-publish';

describe('/api/webhooks/outrank-publish', () => {
  const validPayload = {
    event_type: 'publish_articles',
    timestamp: new Date().toISOString(),
    data: {
      articles: [
        {
          id: 'test-webhook-123',
          title: 'Webhook Test Article',
          content_markdown: '# Test\n\nWebhook test content.',
          content_html: '<h1>Test</h1><p>Webhook test content.</p>',
          meta_description: 'Webhook test description',
          created_at: new Date().toISOString(),
          image_url: 'https://example.com/webhook-test.jpg',
          slug: 'webhook-test-article',
          tags: ['webhook', 'test'],
        },
      ],
    },
  };

  it('should reject non-POST requests', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed',
      allowed: ['POST'],
    });
  });

  it('should reject requests without Authorization header', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: validPayload,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it('should reject requests with invalid token', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        authorization: 'Bearer invalid_token',
      },
      body: validPayload,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it('should process valid webhook with correct token', async () => {
    process.env.OUTRANK_WEBHOOK_SECRET = 'test_secret_token';

    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        authorization: 'Bearer test_secret_token',
      },
      body: validPayload,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.results.success.length).toBeGreaterThan(0);
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/ratgeber.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Ratgeber Pages', () => {
  test('should load ratgeber index page', async ({ page }) => {
    await page.goto('/pferde-ratgeber');

    await expect(page.locator('h1')).toContainText('Ratgeber für Pferdebesitzer');

    // Check that articles are displayed
    const articles = page.locator('[href^="/pferde-ratgeber/"]');
    await expect(articles).toHaveCountGreaterThan(0);
  });

  test('should load individual article page', async ({ page }) => {
    await page.goto('/pferde-ratgeber');

    // Click first article
    await page.locator('[href^="/pferde-ratgeber/"]').first().click();

    // Check article page loaded
    await expect(page.locator('article h1')).toBeVisible();

    // Check related articles component
    await expect(page.locator('h2:has-text("Weiterführende Artikel")')).toBeVisible();

    // Check CTA button
    await expect(page.locator('a:has-text("Jetzt Pferdewert ermitteln")')).toBeVisible();
  });

  test('should have correct meta tags for SEO', async ({ page }) => {
    await page.goto('/pferde-ratgeber/test-article');

    // Check meta description
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/pferdewert\.de\/pferde-ratgeber\/.+/);
  });

  test('should display table of contents', async ({ page }) => {
    await page.goto('/pferde-ratgeber/test-article');

    // Check TOC exists
    const toc = page.locator('nav:has-text("Inhaltsverzeichnis")');
    await expect(toc).toBeVisible();

    // Click TOC link and verify scroll
    const firstLink = toc.locator('a').first();
    await firstLink.click();

    // Verify URL has anchor
    await expect(page).toHaveURL(/#.+/);
  });
});
```

---

## Rollout Plan

### Phase 1: Pilot (Weeks 1-4)

**Goals**:
- Validate Outrank integration
- Test ISR performance
- Gather user feedback
- Measure SEO impact

**Tasks**:
1. **Week 1: Setup & Configuration**
   - [ ] Create Outrank account (€99/month plan)
   - [ ] Generate webhook secret token
   - [ ] Configure Outrank webhook endpoint
   - [ ] Set up MongoDB collection & indexes
   - [ ] Deploy webhook handler to production

2. **Week 2: Content Creation**
   - [ ] Create 5 test articles in Outrank:
     - "Pferdekauf: Regionale Preisunterschiede in Deutschland"
     - "Gesundheitscheck vor dem Pferdekauf: Checkliste"
     - "Versicherungen für Pferde: Was ist sinnvoll?"
     - "Stallkosten in Deutschland: Übersicht 2025"
     - "Pferdewert ermitteln: Faktoren und Methoden"
   - [ ] Customize each article with 15% PferdeWert-specific content
   - [ ] Add internal links to /pferd-kaufen, /pferd-verkaufen
   - [ ] Review and publish articles

3. **Week 3: Monitoring & Optimization**
   - [ ] Monitor Google Search Console for indexing
   - [ ] Check Core Web Vitals (Lighthouse)
   - [ ] Track user engagement (Google Analytics)
   - [ ] Measure load times (Real User Monitoring)
   - [ ] Fix any issues identified

4. **Week 4: Analysis & Decision**
   - [ ] Analyze SEO performance (rankings, impressions, clicks)
   - [ ] Review user metrics (time on page, bounce rate)
   - [ ] Calculate ROI (traffic value vs. €99 cost)
   - [ ] Decision: Continue to Phase 2 or adjust strategy

**Success Criteria**:
- ✅ All 5 articles indexed by Google within 7 days
- ✅ Average load time < 1 second (LCP < 2.5s)
- ✅ Bounce rate < 60%
- ✅ At least 1 article ranking in top 50 for target keyword

### Phase 2: Scaling (Weeks 5-12)

**Goals**:
- Scale to 30 articles/month
- Implement content editing workflow
- Build admin dashboard
- Optimize for conversions

**Tasks**:
1. **Content Production**
   - [ ] Create 30+ articles over 8 weeks
   - [ ] Focus on high-volume keywords (GSC insights)
   - [ ] Diversify content categories

2. **Admin Dashboard Development**
   - [ ] Build article management UI (list, edit, publish)
   - [ ] Implement rich text editor for post-processing
   - [ ] Add analytics dashboard (views, rankings)
   - [ ] Create content calendar

3. **Conversion Optimization**
   - [ ] A/B test CTA placements
   - [ ] Optimize internal linking strategy
   - [ ] Add lead magnets (e.g., "Pferdekauf Checkliste PDF")

4. **SEO Enhancement**
   - [ ] Implement automatic internal linking
   - [ ] Add FAQ schema markup
   - [ ] Create topic clusters
   - [ ] Build backlinks to top articles

**Success Criteria**:
- ✅ 10+ articles ranking in top 20 for target keywords
- ✅ 500+ organic visits/month from Ratgeber articles
- ✅ 5+ conversions/month attributed to Ratgeber content

### Phase 3: Optimization (Months 4-6)

**Goals**:
- Maximize ROI
- Refine content strategy
- Automate workflows
- Scale to 60+ articles/month (if ROI positive)

**Tasks**:
1. **Content Refinement**
   - [ ] Update underperforming articles
   - [ ] Refresh outdated content
   - [ ] Expand top-performing topics

2. **Automation**
   - [ ] Auto-generate internal links based on topics
   - [ ] Implement automatic social media posting
   - [ ] Set up email newsletter integration

3. **Advanced SEO**
   - [ ] Build topic authority (pillar pages)
   - [ ] Target featured snippets
   - [ ] Optimize for voice search

---

## Monitoring & Maintenance

### Key Metrics to Track

| Metric | Target | Tool | Frequency |
|--------|--------|------|-----------|
| **Page Load Time (LCP)** | < 2.5s | Lighthouse, Vercel Analytics | Weekly |
| **Indexing Rate** | 100% within 7 days | Google Search Console | Weekly |
| **Organic Traffic** | +50% MoM | Google Analytics | Weekly |
| **Keyword Rankings** | 10+ in top 20 | Ahrefs/SEMrush | Bi-weekly |
| **Bounce Rate** | < 60% | Google Analytics | Weekly |
| **Conversion Rate** | > 5% | Google Analytics | Weekly |
| **Webhook Success Rate** | > 99% | Custom Logs | Daily |
| **ISR Cache Hit Rate** | > 95% | Vercel Analytics | Weekly |

### Alerting Setup

```typescript
// lib/monitoring.ts

import { error, warn } from '@/lib/log';

/**
 * Send alert to Slack
 */
export async function sendSlackAlert(message: string, severity: 'info' | 'warning' | 'error') {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    warn('Slack webhook URL not configured');
    return;
  }

  const color = severity === 'error' ? 'danger' : severity === 'warning' ? 'warning' : 'good';

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attachments: [
          {
            color,
            title: `🚨 PferdeWert Alert (${severity.toUpperCase()})`,
            text: message,
            ts: Math.floor(Date.now() / 1000),
          },
        ],
      }),
    });
  } catch (err) {
    error('Failed to send Slack alert:', err);
  }
}

/**
 * Monitor webhook health
 */
export async function checkWebhookHealth(db: Db): Promise<void> {
  const failureCount = await db
    .collection('webhook_failures')
    .countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24h
    });

  if (failureCount > 5) {
    await sendSlackAlert(
      `⚠️ High webhook failure rate: ${failureCount} failures in last 24h`,
      'warning'
    );
  }
}
```

### Maintenance Tasks

**Daily**:
- [ ] Check webhook failure logs
- [ ] Monitor error rates (Vercel logs)
- [ ] Review analytics anomalies

**Weekly**:
- [ ] Review SEO performance (GSC)
- [ ] Update article metadata if needed
- [ ] Check for broken images/links

**Monthly**:
- [ ] Content audit (identify underperformers)
- [ ] Update outdated information
- [ ] Refresh high-performing articles
- [ ] Review MongoDB indexes performance
- [ ] Clean up old webhook failures (>30 days)

---

## Cost-Benefit Analysis

### Monthly Costs

| Item | Cost (EUR) | Notes |
|------|------------|-------|
| **Outrank Subscription** | €99 | 30 articles/month included |
| **Vercel Hosting** | €0 | Free tier sufficient (ISR cached) |
| **MongoDB Atlas** | €0 | Free tier (512MB) sufficient |
| **Development Time (Initial)** | €0 | Internal development (10h one-time) |
| **Monthly Maintenance** | €0 | 2h/month internal (content review) |
| **TOTAL** | **€99/month** | |

### Expected Benefits (Conservative Estimates)

**Assumptions**:
- 30 articles published/month
- Average 50 organic visits/article/month = 1.500 visits/month
- Conversion rate: 3% (45 conversions/month)
- Average valuation price: €14.90
- Conversion to paid valuation: 30% (13.5 paid valuations/month)

**Revenue Projection**:
```
Month 1: 5 articles × 50 visits × 3% × 30% × €14.90 = €3.35
Month 2: 10 articles × 50 visits × 3% × 30% × €14.90 = €6.70
Month 3: 15 articles × 50 visits × 3% × 30% × €14.90 = €10.05
Month 4: 20 articles × 50 visits × 3% × 30% × €14.90 = €13.40
Month 5: 25 articles × 50 visits × 3% × 30% × €14.90 = €16.75
Month 6: 30 articles × 50 visits × 3% × 30% × €14.90 = €20.10

Total Revenue (6 months): €70.35
Total Cost (6 months): €594

Break-even: Month 29-30
```

**Revised Assumptions (Optimistic)**:
- Average 100 visits/article/month (better SEO performance)
- Conversion rate: 5% (improved CTAs)
- Conversion to paid: 40%

**Optimistic Revenue Projection**:
```
Month 6: 30 articles × 100 visits × 5% × 40% × €14.90 = €89.40/month
Break-even: Month 6-7
```

### ROI Calculation

**Conservative Scenario**:
- Payback period: 29-30 months
- ROI (12 months): -75%
- **Conclusion**: Not viable without optimization

**Optimistic Scenario**:
- Payback period: 6-7 months
- ROI (12 months): +8%
- **Conclusion**: Viable if traffic/conversion targets met

**Recommendation**:
- Proceed with Phase 1 (€99 risk)
- Measure actual conversion rates in first 4 weeks
- Adjust strategy based on real data
- Consider scaling only if Month 1 shows > 10 paid valuations

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Webhook Failures** | Medium | High | Retry logic, Dead Letter Queue, Alerts |
| **ISR Cache Invalidation Issues** | Low | Medium | Manual revalidation API, Monitoring |
| **MongoDB Storage Limits** | Low | Medium | Monitor usage, upgrade plan if needed |
| **Duplicate Content Penalties** | Medium | High | 15% customization, canonical tags, limit to 20-30% of content |
| **Outrank API Changes** | Low | High | Version pinning, changelog monitoring |
| **Performance Degradation** | Low | Medium | CDN caching, Image optimization, Monitoring |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Low Conversion Rates** | High | High | A/B testing, CTA optimization, User research |
| **SEO Penalties (AI Content)** | Medium | High | Human review, customization, E-E-A-T signals |
| **Negative ROI** | Medium | Medium | Phase 1 validation, early termination if metrics poor |
| **Brand Voice Mismatch** | Medium | Medium | Strict content review, editorial guidelines |
| **Outrank Service Discontinuation** | Low | High | Vendor diversification, retain content ownership |

### Mitigation Strategies

1. **Technical**:
   - Implement comprehensive error handling
   - Set up monitoring & alerting
   - Regular backups of MongoDB data
   - Automated testing (CI/CD)

2. **Business**:
   - Phase 1 validation before scaling
   - Monthly ROI reviews
   - Content quality audits
   - User feedback collection

3. **SEO**:
   - Regular GSC monitoring
   - Duplicate content checks
   - Backlink profile monitoring
   - Core Web Vitals tracking

---

## Next Steps

### Immediate Actions (This Week)

1. **Decision Point**: Review this plan and decide: Proceed with Phase 1?
2. **If YES**:
   - [ ] Create Outrank.so account
   - [ ] Generate webhook secret token
   - [ ] Add `OUTRANK_WEBHOOK_SECRET` to Vercel environment variables
   - [ ] Configure Outrank webhook in their dashboard:
     - **URL**: `https://pferdewert.de/api/webhooks/outrank-publish`
     - **Headers**: `Authorization: Bearer YOUR_SECRET_TOKEN`
     - **Events**: `article.published`
3. **Development**:
   - [ ] Implement MongoDB schema & repository
   - [ ] Create webhook handler API route
   - [ ] Build ISR pages for /pferde-ratgeber/[slug]
   - [ ] Develop RelatedArticles component
   - [ ] Write tests (unit + integration)
4. **Testing**:
   - [ ] Test webhook locally (ngrok or Vercel preview)
   - [ ] Verify article storage in MongoDB
   - [ ] Confirm ISR revalidation works
   - [ ] Check page load performance
5. **Deploy to Production**:
   - [ ] Deploy all changes to Vercel
   - [ ] Test webhook in production
   - [ ] Create first 5 articles in Outrank

### Questions to Answer

1. **Content Strategy**: Which 5 articles should we prioritize for Phase 1?
2. **Brand Voice**: Do we have editorial guidelines for customizing Outrank content?
3. **Budget Approval**: Confirm €99/month budget for Outrank subscription
4. **Success Metrics**: What are acceptable Phase 1 success thresholds?

---

## Conclusion

This comprehensive plan provides a **low-risk, high-reward pathway** to scaling PferdeWert.de's content strategy using Outrank.so. The proposed architecture (Webhook → MongoDB → ISR) ensures:

- ✅ **Optimal Performance**: 0-5ms load times via ISR caching
- ✅ **SEO Excellence**: Statisches HTML für perfekte Crawlability
- ✅ **Full Control**: 100% Editierbarkeit durch MongoDB-Layer
- ✅ **Scalability**: 30+ Articles/month for €99
- ✅ **Low Risk**: €99 monthly commitment, cancel anytime

**Recommendation**: Proceed with Phase 1 pilot to validate the approach with real data before committing to long-term scaling.

---

**Document Version**: 1.0
**Last Updated**: 2025-10-18
**Next Review**: After Phase 1 completion (Week 4)
