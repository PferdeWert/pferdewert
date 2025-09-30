// scripts/generate-sitemap.js
import fs from 'fs';

const DOMAIN = 'https://pferdewert.de';
const OUTPUT_PATH = 'public/sitemap.xml';

// Konfiguration: Welche Seiten sollen indexiert werden
const PAGE_CONFIG = {
  // SEO-relevante Seiten (hohe Priorität)
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/pferde-preis-berechnen': { priority: '0.9', changefreq: 'weekly' },

  // Hub-Seiten (hohe Priorität)
  '/pferde-ratgeber': { priority: '0.8', changefreq: 'monthly' },

  // Ratgeber-Artikel (SEO-relevanter Content)
  '/pferde-ratgeber/pferd-kaufen': { priority: '0.7', changefreq: 'monthly' },
  '/pferde-ratgeber/pferd-kaufen/was-kostet-ein-pferd': { priority: '0.7', changefreq: 'monthly' },
  '/pferde-ratgeber/pferd-verkaufen': { priority: '0.7', changefreq: 'monthly' },
  '/pferde-ratgeber/pferd-verkaufen/pferd-verkaufen-tipps': { priority: '0.7', changefreq: 'monthly' },
  '/pferde-ratgeber/aku-pferd': { priority: '0.7', changefreq: 'monthly' },
  '/pferde-ratgeber/aku-pferd/ablauf': { priority: '0.6', changefreq: 'monthly' },
  '/pferde-ratgeber/aku-pferd/klassen': { priority: '0.6', changefreq: 'monthly' },
  '/pferde-ratgeber/aku-pferd/kosten': { priority: '0.6', changefreq: 'monthly' },

  // Content-Seiten (mittlere Priorität)
  '/beispiel-analyse': { priority: '0.7', changefreq: 'monthly' },
  '/ueber-pferdewert': { priority: '0.6', changefreq: 'monthly' },

};

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

function generateSitemap() {
  const lastmod = getCurrentDate();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Generiere URLs für alle konfigurierten Seiten
  Object.entries(PAGE_CONFIG).forEach(([path, config]) => {
    sitemap += `
  <url>
    <loc>${DOMAIN}${path}</loc>
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

function updateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Block test and development pages
${EXCLUDED_PAGES.map(page => `Disallow: ${page}`).join('\n')}

# Block admin areas if any exist
Disallow: /admin/
Disallow: /_next/

# Allow important crawlable content
${Object.keys(PAGE_CONFIG).filter(p => p !== '/').map(page => `Allow: ${page}`).join('\n')}

# Sitemap location
Sitemap: ${DOMAIN}/sitemap.xml`;

  fs.writeFileSync('public/robots.txt', robotsContent, 'utf-8');
  console.log('✅ robots.txt updated');
}

function main() {
  try {
    const sitemap = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf-8');
    console.log('✅ Sitemap generated successfully');
    
    updateRobotsTxt();
    
    console.log('📊 Sitemap stats:');
    console.log(`   - ${Object.keys(PAGE_CONFIG).length} pages included`);
    console.log(`   - ${EXCLUDED_PAGES.length} patterns excluded`);
    console.log(`   - Last updated: ${getCurrentDate()}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();