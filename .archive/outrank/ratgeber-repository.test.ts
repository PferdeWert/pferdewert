/**
 * Unit Tests for RatgeberRepository
 *
 * Tests cover:
 * - Article creation with idempotency
 * - CRUD operations (findBySlug, findPublished, update, publish)
 * - Search and filtering (findByCategory, search, findRelated)
 * - Helper methods (inferCategory, generateStructuredData)
 * - Edge cases and error handling
 *
 * Uses mongodb-memory-server for isolated in-memory MongoDB testing
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { RatgeberRepository, getRatgeberRepository } from './ratgeber-repository';
import { RatgeberCategory } from '@/types/ratgeber';
import type { OutrankArticlePayload } from '@/types/ratgeber';

// Test fixtures
const mockOutrankPayload: OutrankArticlePayload = {
  id: 'outrank_test_123',
  title: 'Pferdekauf: Der ultimative Ratgeber',
  content_markdown: '## Einleitung\n\nDies ist ein Test-Artikel über den Pferdekauf mit mehr als 100 Zeichen Inhalt für die Validierung.',
  content_html: '<h2>Einleitung</h2><p>Dies ist ein Test-Artikel über den Pferdekauf mit mehr als 100 Zeichen Inhalt für die Validierung.</p>',
  meta_description: 'Erfahren Sie alles über den Pferdekauf: Tipps, Checklisten und Expertenrat für Ihren erfolgreichen Pferdekauf.',
  created_at: '2024-01-15T10:00:00Z',
  image_url: 'https://example.com/horse-image.jpg',
  slug: 'pferdekauf-ultimativer-ratgeber',
  tags: ['pferdekauf', 'ratgeber', 'kaufberatung'],
};

// Test suite global variables
let mongoServer: MongoMemoryServer;
let mongoClient: MongoClient;
let db: Db;
let repository: RatgeberRepository;

// Setup: Start in-memory MongoDB before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  db = mongoClient.db('pferdewert_test');
  repository = getRatgeberRepository(db);
});

// Teardown: Stop MongoDB after all tests
afterAll(async () => {
  await mongoClient.close();
  await mongoServer.stop();
});

// Reset: Clear collection before each test for isolation
beforeEach(async () => {
  await db.collection('ratgeber_articles').deleteMany({});
});

// ============================================================================
// TEST SUITE: createFromOutrank
// ============================================================================

describe('RatgeberRepository.createFromOutrank', () => {
  it('should create article from Outrank payload', async () => {
    const article = await repository.createFromOutrank(mockOutrankPayload);

    expect(article._id).toBeDefined();
    expect(article.outrank.id).toBe('outrank_test_123');
    expect(article.outrank.title).toBe('Pferdekauf: Der ultimative Ratgeber');
    expect(article.outrank.slug).toBe('pferdekauf-ultimativer-ratgeber');
    expect(article.outrank.tags).toEqual(['pferdekauf', 'ratgeber', 'kaufberatung']);
    expect(article.taxonomy.primary_category).toBe(RatgeberCategory.Pferdekauf);
    expect(article.publishing.status).toBe('draft');
    expect(article.analytics.views).toBe(0);
  });

  it('should enforce idempotency - duplicate Outrank ID returns existing article', async () => {
    const first = await repository.createFromOutrank(mockOutrankPayload);
    const second = await repository.createFromOutrank(mockOutrankPayload);

    expect(second._id).toBe(first._id);
    expect(second.outrank.id).toBe(first.outrank.id);
  });

  it('should infer correct category from tags', async () => {
    const payloads = [
      { ...mockOutrankPayload, id: 'test_1', slug: 'verkauf', tags: ['pferdeverkauf'], title: 'Verkauf Test' },
      { ...mockOutrankPayload, id: 'test_2', slug: 'haltung', tags: ['pferdehaltung', 'stall'], title: 'Haltung Test' },
      { ...mockOutrankPayload, id: 'test_3', slug: 'gesundheit', tags: ['pferdegesundheit', 'tierarzt'], title: 'Gesundheit Test' },
      { ...mockOutrankPayload, id: 'test_4', slug: 'training', tags: ['pferdetraining', 'ausbildung'], title: 'Training Test' },
    ];

    const articles = await Promise.all(payloads.map(p => repository.createFromOutrank(p)));

    expect(articles[0].taxonomy.primary_category).toBe(RatgeberCategory.Pferdeverkauf);
    expect(articles[1].taxonomy.primary_category).toBe(RatgeberCategory.Pferdehaltung);
    expect(articles[2].taxonomy.primary_category).toBe(RatgeberCategory.Pferdegesundheit);
    expect(articles[3].taxonomy.primary_category).toBe(RatgeberCategory.Pferdetraining);
  });

  it('should generate valid Schema.org structured data', async () => {
    const article = await repository.createFromOutrank(mockOutrankPayload);

    expect(article.seo.structured_data['@context']).toBe('https://schema.org');
    expect(article.seo.structured_data['@type']).toBe('Article');
    expect(article.seo.structured_data.headline).toBe(mockOutrankPayload.title);
    expect(article.seo.structured_data.author['@type']).toBe('Organization');
    expect(article.seo.structured_data.author.name).toBe('PferdeWert.de');
  });

  it('should set canonical URL correctly', async () => {
    const article = await repository.createFromOutrank(mockOutrankPayload);

    expect(article.seo.canonical_url).toBe('https://pferdewert.de/pferde-ratgeber/pferdekauf-ultimativer-ratgeber');
  });
});

// ============================================================================
// TEST SUITE: findBySlug
// ============================================================================

describe('RatgeberRepository.findBySlug', () => {
  it('should find article by slug', async () => {
    await repository.createFromOutrank(mockOutrankPayload);

    const found = await repository.findBySlug('pferdekauf-ultimativer-ratgeber');

    expect(found).not.toBeNull();
    expect(found?.outrank.slug).toBe('pferdekauf-ultimativer-ratgeber');
    expect(found?.outrank.title).toBe('Pferdekauf: Der ultimative Ratgeber');
  });

  it('should return null for non-existent slug', async () => {
    const found = await repository.findBySlug('non-existent-slug');

    expect(found).toBeNull();
  });
});

// ============================================================================
// TEST SUITE: findPublished
// ============================================================================

describe('RatgeberRepository.findPublished', () => {
  beforeEach(async () => {
    // Create 3 published articles and 1 draft
    for (let i = 1; i <= 3; i++) {
      const payload = {
        ...mockOutrankPayload,
        id: `published_${i}`,
        slug: `published-article-${i}`,
        title: `Published Article ${i}`,
      };
      const article = await repository.createFromOutrank(payload);
      await repository.publish(article._id, 'test-user');
    }

    // Create 1 draft article
    await repository.createFromOutrank({
      ...mockOutrankPayload,
      id: 'draft_1',
      slug: 'draft-article',
      title: 'Draft Article',
    });
  });

  it('should return only published articles', async () => {
    const result = await repository.findPublished(1, 10);

    expect(result.total).toBe(3);
    expect(result.articles.length).toBe(3);
    expect(result.articles.every(a => a.publishing.status === 'published')).toBe(true);
  });

  it('should paginate results correctly', async () => {
    const page1 = await repository.findPublished(1, 2);
    const page2 = await repository.findPublished(2, 2);

    expect(page1.articles.length).toBe(2);
    expect(page1.hasMore).toBe(true);
    expect(page2.articles.length).toBe(1);
    expect(page2.hasMore).toBe(false);
  });

  it('should sort by published_at descending', async () => {
    const result = await repository.findPublished(1, 10);

    // Most recently published should be first
    const dates = result.articles.map(a => a.publishing.published_at?.getTime() || 0);
    expect(dates[0]).toBeGreaterThanOrEqual(dates[1]);
    expect(dates[1]).toBeGreaterThanOrEqual(dates[2]);
  });
});

// ============================================================================
// TEST SUITE: publish
// ============================================================================

describe('RatgeberRepository.publish', () => {
  it('should publish draft article', async () => {
    const article = await repository.createFromOutrank(mockOutrankPayload);
    expect(article.publishing.status).toBe('draft');

    const published = await repository.publish(article._id, 'test-user');

    expect(published).not.toBeNull();
    expect(published?.publishing.status).toBe('published');
    expect(published?.publishing.published_at).toBeDefined();
    expect(published?.publishing.modified_by).toBe('test-user');
  });

  it('should return null for non-existent article', async () => {
    const published = await repository.publish('000000000000000000000000', 'test-user');

    expect(published).toBeNull();
  });
});

// ============================================================================
// TEST SUITE: findByCategory
// ============================================================================

describe('RatgeberRepository.findByCategory', () => {
  beforeEach(async () => {
    // Create articles in different categories
    const payloads = [
      { ...mockOutrankPayload, id: 'kauf_1', slug: 'kauf-1', tags: ['pferdekauf'], title: 'Kauf 1' },
      { ...mockOutrankPayload, id: 'kauf_2', slug: 'kauf-2', tags: ['pferdekauf'], title: 'Kauf 2' },
      { ...mockOutrankPayload, id: 'verkauf_1', slug: 'verkauf-1', tags: ['pferdeverkauf'], title: 'Verkauf 1' },
    ];

    for (const payload of payloads) {
      const article = await repository.createFromOutrank(payload);
      await repository.publish(article._id, 'test-user');
    }
  });

  it('should return articles in specified category only', async () => {
    const result = await repository.findByCategory(RatgeberCategory.Pferdekauf, 1, 10);

    expect(result.total).toBe(2);
    expect(result.articles.every(a => a.taxonomy.primary_category === RatgeberCategory.Pferdekauf)).toBe(true);
  });

  it('should paginate category results', async () => {
    const result = await repository.findByCategory(RatgeberCategory.Pferdekauf, 1, 1);

    expect(result.articles.length).toBe(1);
    expect(result.hasMore).toBe(true);
  });
});

// ============================================================================
// TEST SUITE: update
// ============================================================================

describe('RatgeberRepository.update', () => {
  it('should update article and track version history', async () => {
    const article = await repository.createFromOutrank(mockOutrankPayload);

    const updated = await repository.update(
      article._id,
      {
        pferdewert: {
          seo_keywords: ['updated', 'keywords'],
          internal_links: [],
        },
      },
      'test-user'
    );

    expect(updated).not.toBeNull();
    expect(updated?.pferdewert.seo_keywords).toEqual(['updated', 'keywords']);
    expect(updated?.history.length).toBe(1);
    expect(updated?.history[0].modified_by).toBe('test-user');
    expect(updated?.history[0].version).toBe(1);
  });

  it('should return null for non-existent article', async () => {
    const updated = await repository.update(
      '000000000000000000000000',
      { pferdewert: { seo_keywords: [], internal_links: [] } },
      'test-user'
    );

    expect(updated).toBeNull();
  });
});

// ============================================================================
// TEST SUITE: findRelated
// ============================================================================

describe('RatgeberRepository.findRelated', () => {
  it('should find related articles by tags', async () => {
    // Create source article
    const source = await repository.createFromOutrank({
      ...mockOutrankPayload,
      id: 'source',
      slug: 'source-article',
      tags: ['pferdekauf', 'ratgeber'],
    });
    await repository.publish(source._id, 'test-user');

    // Create related article with overlapping tag
    const related = await repository.createFromOutrank({
      ...mockOutrankPayload,
      id: 'related',
      slug: 'related-article',
      tags: ['pferdekauf', 'tipps'],
    });
    await repository.publish(related._id, 'test-user');

    // Create unrelated article
    await repository.createFromOutrank({
      ...mockOutrankPayload,
      id: 'unrelated',
      slug: 'unrelated-article',
      tags: ['training', 'sport'],
    });

    const result = await repository.findRelated(source._id, 3);

    expect(result.articles.length).toBe(1);
    expect(result.articles[0]._id).toBe(related._id);
  });

  it('should limit results to specified count', async () => {
    const source = await repository.createFromOutrank(mockOutrankPayload);
    await repository.publish(source._id, 'test-user');

    // Create 5 related articles
    for (let i = 1; i <= 5; i++) {
      const article = await repository.createFromOutrank({
        ...mockOutrankPayload,
        id: `related_${i}`,
        slug: `related-${i}`,
        tags: ['pferdekauf'],
      });
      await repository.publish(article._id, 'test-user');
    }

    const result = await repository.findRelated(source._id, 3);

    expect(result.articles.length).toBe(3);
  });
});

// ============================================================================
// TEST SUITE: getAllSlugs
// ============================================================================

describe('RatgeberRepository.getAllSlugs', () => {
  it('should return slugs of published articles only', async () => {
    // Published articles
    for (let i = 1; i <= 3; i++) {
      const article = await repository.createFromOutrank({
        ...mockOutrankPayload,
        id: `pub_${i}`,
        slug: `published-${i}`,
      });
      await repository.publish(article._id, 'test-user');
    }

    // Draft article
    await repository.createFromOutrank({
      ...mockOutrankPayload,
      id: 'draft',
      slug: 'draft-article',
    });

    const slugs = await repository.getAllSlugs();

    expect(slugs.length).toBe(3);
    expect(slugs).toContain('published-1');
    expect(slugs).toContain('published-2');
    expect(slugs).toContain('published-3');
    expect(slugs).not.toContain('draft-article');
  });
});
