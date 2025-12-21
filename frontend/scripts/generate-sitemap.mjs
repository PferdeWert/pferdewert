// scripts/generate-sitemap.mjs
// Updated Dec 2025: Multi-domain SEO with whitelist (AT/CH) and blacklist (DE)
import fs from 'fs';
import { RATGEBER_ENTRIES } from '../lib/ratgeber-registry.ts';
import { isPageAllowedForCountry, isPageAvailableForCountry } from '../lib/country-exclusive-pages.ts';

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
// - /pferde-ratgeber/pferd-kaufen → 301 → /pferd-kaufen (REMOVED - now in registry with basePath)
const BASE_PAGES = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/pferde-preis-berechnen': { priority: '0.9', changefreq: 'weekly' },
  '/pferde-ratgeber': { priority: '0.8', changefreq: 'monthly' },
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
    // Handle empty slug for index pages (e.g., /pferd-kaufen/ hub)
    const path = entry.slug === '' ? basePath : `${basePath}/${entry.slug}`;
    config[path] = {
      priority: entry.priority,
      changefreq: entry.changefreq
    };
  });

  return config;
}

// Seiten die NICHT indexiert werden sollen (technische Seiten)
const EXCLUDED_PAGES = [
  '/ergebnis',
  '/pdf-test',
  '/test-loading',
  '/api/*',
  '/_next/*',
  '/admin/*'
];

// SEO Recovery: noindex-Seiten aus Sitemap ausschließen
// Diese Seiten haben meta robots="noindex, follow" und sollten nicht in der Sitemap sein
// Stand: 21.12.2025 - Google December 2025 Core Update Recovery
const NOINDEX_PAGES = [
  '/pferd-kaufen',              // Hub-Seite ohne unique Content
  '/pferde-ratgeber',           // Hub-Seite ohne unique Content
  '/pferd-kaufen/fohlen',       // SV: 1.300 - konsolidiert
  '/pferd-kaufen/kaufvertrag',  // SV: 1.000 - informational intent
  '/pferd-kaufen/lipizzaner',   // SV: 480 - niedrig
  '/pferd-kaufen/anfaenger',    // SV: 260 - niedrig
  '/pferde-ratgeber/aku-pferd/kosten', // SV: 210 - in Haupt-AKU integrieren
  '/pferde-ratgeber/pferdemarkt',      // SV: 110 - nicht core business
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

/**
 * Generate sitemap XML for a specific domain
 * @param {string} domain - Full domain URL (e.g., 'https://pferdewert.de')
 * @param {object} pageConfig - Page configuration object
 * @param {string} countryCode - Country code ('DE', 'AT', 'CH')
 */
function generateSitemap(domain, pageConfig, countryCode) {
  const lastmod = getCurrentDate();
  let includedCount = 0;
  let excludedCount = 0;

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  Object.entries(pageConfig).forEach(([path, config]) => {
    // Check if this page should be included for this country
    // Uses WHITELIST for AT/CH (only 8 core pages) and BLACKLIST for DE (all except AT/CH exclusive)
    const isAllowed = isPageAllowedForCountry(path, countryCode);
    const isAvailable = isPageAvailableForCountry(path, countryCode);

    // AT/CH: Must pass whitelist check
    // DE: Must pass blacklist check (not exclusive to other country)
    if (!isAllowed || !isAvailable) {
      excludedCount++;
      return; // Skip this page for this domain
    }

    // SEO Recovery: Skip noindex pages from sitemap
    // These pages have meta robots="noindex, follow" and should not be in sitemap
    if (NOINDEX_PAGES.includes(path)) {
      excludedCount++;
      return; // Skip noindex pages
    }

    includedCount++;
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

  // Log exclusion stats
  if (excludedCount > 0) {
    console.log(`   ${countryCode}: ${includedCount} pages included, ${excludedCount} country-exclusive pages excluded`);
  }

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

    console.log('\n📍 Generating country-specific sitemaps...');
    console.log('   (Regional pages are excluded from other countries\' sitemaps)\n');

    // Generate DE sitemap (primary) - includes DE-only pages like Bayern, NRW
    const deSitemap = generateSitemap(DOMAINS.DE, pageConfig, 'DE');
    fs.writeFileSync(OUTPUT_PATHS.DE, deSitemap, 'utf-8');
    console.log('✅ DE Sitemap generated: public/sitemap-de.xml');

    // Generate AT sitemap - includes AT-only page (Österreich), excludes DE/CH pages
    const atSitemap = generateSitemap(DOMAINS.AT, pageConfig, 'AT');
    fs.writeFileSync(OUTPUT_PATHS.AT, atSitemap, 'utf-8');
    console.log('✅ AT Sitemap generated: public/sitemap-at.xml');

    // Generate CH sitemap - includes CH-only page (Schweiz), excludes DE/AT pages
    const chSitemap = generateSitemap(DOMAINS.CH, pageConfig, 'CH');
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