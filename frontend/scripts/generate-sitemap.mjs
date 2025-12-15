// scripts/generate-sitemap.mjs
// Updated Nov 2025: Domain-based routing (pferdewert.de vs pferdewert.at)
import fs from 'fs';
import { RATGEBER_ENTRIES } from '../lib/ratgeber-registry.ts';

// Domain configuration for multi-country support
// NOTE: DE uses non-www (Vercel redirects www → non-www)
const DOMAINS = {
  DE: 'https://pferdewert.de',
  AT: 'https://pferdewert.at',
  CH: 'https://pferdewert.ch',
};

// Output paths - separate sitemaps per domain
// Named with -de/-at/-ch suffix to avoid conflict with API routes
const OUTPUT_PATHS = {
  DE: 'public/sitemap-de.xml',
  AT: 'public/sitemap-at.xml',
  CH: 'public/sitemap-ch.xml',
};

// Base pages (same structure for both domains)
// NOTE: Only include canonical URLs here, NOT redirect sources!
// - /was-ist-mein-pferd-wert → 301 → /pferde-preis-berechnen (REMOVED)
// - /pferd-verkaufen → 301 → /pferde-ratgeber/pferd-verkaufen (REMOVED)
const BASE_PAGES = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/pferde-preis-berechnen': { priority: '0.9', changefreq: 'weekly' },
  '/pferde-ratgeber': { priority: '0.8', changefreq: 'monthly' },
  '/pferde-ratgeber/pferd-kaufen': { priority: '0.8', changefreq: 'monthly' },
  '/beispiel-analyse': { priority: '0.7', changefreq: 'monthly' },
  '/ueber-pferdewert': { priority: '0.6', changefreq: 'monthly' },
  '/impressum': { priority: '0.3', changefreq: 'yearly' },
  '/datenschutz': { priority: '0.3', changefreq: 'yearly' },
  '/agb': { priority: '0.3', changefreq: 'yearly' },
};

// Build page config for a specific domain
function buildPageConfig() {
  const config = { ...BASE_PAGES };

  // Add Ratgeber articles from registry
  RATGEBER_ENTRIES.forEach(entry => {
    // Use custom basePath if provided, otherwise default to /pferde-ratgeber
    const basePath = entry.basePath || '/pferde-ratgeber';
    const path = `${basePath}/${entry.slug}`;
    config[path] = {
      priority: entry.priority,
      changefreq: entry.changefreq
    };
  });

  return config;
}

// Seiten die NICHT indexiert werden sollen
const EXCLUDED_PAGES = [
  '/ergebnis',
  '/pdf-test',
  '/test-loading',
  '/api/*',
  '/_next/*',
  '/admin/*'
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

/**
 * Generate sitemap XML for a specific domain
 */
function generateSitemap(domain, pageConfig) {
  const lastmod = getCurrentDate();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  Object.entries(pageConfig).forEach(([path, config]) => {
    sitemap += `
  <url>
    <loc>${domain}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>
`;

  return sitemap;
}

/**
 * Generate robots.txt for a specific domain
 * Note: Vercel serves different robots.txt per domain via middleware/rewrites
 */
function generateRobotsTxt(domain) {
  return `User-agent: *
Allow: /

# Block test and development pages
${EXCLUDED_PAGES.map(page => `Disallow: ${page}`).join('\n')}

# Block admin areas
Disallow: /admin/
Disallow: /_next/

# Sitemap location
Sitemap: ${domain}/sitemap.xml
`;
}

function main() {
  try {
    const pageConfig = buildPageConfig();
    const lastmod = getCurrentDate();

    // Generate DE sitemap (primary)
    const deSitemap = generateSitemap(DOMAINS.DE, pageConfig);
    fs.writeFileSync(OUTPUT_PATHS.DE, deSitemap, 'utf-8');
    console.log('✅ DE Sitemap generated: public/sitemap-de.xml');

    // Generate AT sitemap (separate domain)
    const atSitemap = generateSitemap(DOMAINS.AT, pageConfig);
    fs.writeFileSync(OUTPUT_PATHS.AT, atSitemap, 'utf-8');
    console.log('✅ AT Sitemap generated: public/sitemap-at.xml');

    // Generate CH sitemap (separate domain)
    const chSitemap = generateSitemap(DOMAINS.CH, pageConfig);
    fs.writeFileSync(OUTPUT_PATHS.CH, chSitemap, 'utf-8');
    console.log('✅ CH Sitemap generated: public/sitemap-ch.xml');

    // Generate robots.txt (named robots-de.txt to avoid conflict with API route)
    const robotsTxt = generateRobotsTxt(DOMAINS.DE);
    fs.writeFileSync('public/robots-de.txt', robotsTxt, 'utf-8');
    console.log('✅ robots-de.txt generated');

    // Generate AT robots.txt
    const atRobotsTxt = generateRobotsTxt(DOMAINS.AT);
    fs.writeFileSync('public/robots-at.txt', atRobotsTxt, 'utf-8');
    console.log('✅ robots-at.txt generated (for AT domain)');

    // Generate CH robots.txt
    const chRobotsTxt = generateRobotsTxt(DOMAINS.CH);
    fs.writeFileSync('public/robots-ch.txt', chRobotsTxt, 'utf-8');
    console.log('✅ robots-ch.txt generated (for CH domain)');

    console.log('\n📊 Sitemap stats:');
    console.log(`   - ${Object.keys(pageConfig).length} pages per domain`);
    console.log(`   - 3 domains: pferdewert.de, pferdewert.at, pferdewert.ch`);
    console.log(`   - Last updated: ${lastmod}`);
    console.log('\n⚠️  GSC Action Required:');
    console.log('   1. Add pferdewert.ch as new property in Google Search Console');
    console.log('   2. Submit sitemap-ch.xml for pferdewert.ch');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();