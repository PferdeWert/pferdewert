#!/usr/bin/env node
/**
 * Test Script for Outrank Webhook Sitemap Integration
 *
 * Tests that:
 * 1. Webhook accepts valid payload
 * 2. Article is processed
 * 3. Sitemap is automatically regenerated
 */

import fs from 'fs';
import path from 'path';

const TEST_PAYLOAD = {
  event_type: 'publish_articles',
  timestamp: new Date().toISOString(),
  data: {
    articles: [
      {
        id: 'test-article-' + Date.now(),
        title: 'Test Artikel: Automatisches Sitemap Update',
        content_markdown: 'Dies ist ein Test-Artikel um das automatische Sitemap-Update zu testen. '.repeat(10),
        content_html: '<p>Dies ist ein Test-Artikel um das automatische Sitemap-Update zu testen.</p>'.repeat(10),
        meta_description: 'Test Meta Description für automatisches Sitemap Update Test. Mindestens 50 Zeichen lang.',
        created_at: new Date().toISOString(),
        image_url: 'https://example.com/test-image.jpg',
        slug: 'test-webhook-sitemap-' + Date.now(),
        tags: ['test', 'webhook', 'sitemap']
      }
    ]
  }
};

console.log('🧪 Outrank Webhook Sitemap Test');
console.log('================================\n');

// Step 1: Check sitemap before webhook call
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let sitemapBefore = null;
let sitemapBeforeModTime = null;

if (fs.existsSync(sitemapPath)) {
  sitemapBefore = fs.readFileSync(sitemapPath, 'utf-8');
  const stats = fs.statSync(sitemapPath);
  sitemapBeforeModTime = stats.mtime;
  console.log('✅ Sitemap exists before webhook');
  console.log(`   Modified: ${sitemapBeforeModTime.toISOString()}`);

  // Count URLs in sitemap
  const urlCount = (sitemapBefore.match(/<url>/g) || []).length;
  console.log(`   Contains ${urlCount} URLs\n`);
} else {
  console.log('⚠️  Sitemap does not exist yet\n');
}

// Step 2: Test webhook locally (requires dev server running)
console.log('📝 Test Payload:');
console.log(JSON.stringify(TEST_PAYLOAD, null, 2));
console.log('\n');

console.log('📤 To test the webhook:');
console.log('1. Make sure dev server is running: npm run dev');
console.log('2. Make sure OUTRANK_WEBHOOK_SECRET is set in .env.local');
console.log('3. Run this curl command:\n');

const curlCommand = `curl -X POST http://localhost:3000/api/webhooks/outrank-publish \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_WEBHOOK_SECRET_HERE" \\
  -d '${JSON.stringify(TEST_PAYLOAD)}'`;

console.log(curlCommand);
console.log('\n');

console.log('✅ Expected behavior:');
console.log('   1. Webhook returns 200 with success: true');
console.log('   2. Article is stored in MongoDB');
console.log('   3. Sitemap.xml is regenerated with new article');
console.log('   4. robots.txt is updated');
console.log('\n');

console.log('📊 To verify sitemap was updated:');
console.log('   node scripts/verify-sitemap-update.mjs');
