#!/usr/bin/env node

/**
 * /page Command - Generates SEO-optimized Ratgeber page from keyword
 *
 * Usage: /page <keyword>
 * Example: /page pferd kaufen
 *
 * This command:
 * 1. Reads article content from SEO/SEO-CONTENT/<keyword>/<keyword>-article.md
 * 2. Reads meta data from SEO/SEO-CONTENT/<keyword>/<keyword>-meta.json
 * 3. Generates a React/Next.js page following SEO-DESIGN.md guidelines
 * 4. Adds entry to frontend/lib/ratgeber-registry.ts
 * 5. Runs npm run sitemap to update sitemap.xml and robots.txt
 */

const fs = require('fs');
const path = require('path');

// Get keyword from command line arguments
const keyword = process.argv.slice(2).join(' ');

if (!keyword) {
  console.error('❌ Error: No keyword provided');
  console.error('Usage: /page <keyword>');
  console.error('Example: /page pferd kaufen');
  process.exit(1);
}

// Define paths
const SEO_CONTENT_BASE = '/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/SEO/SEO-CONTENT';
const DESIGN_GUIDELINES = '/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/SEO/SEO-DESIGN.md';

const keywordFolder = path.join(SEO_CONTENT_BASE, keyword);
const articleFile = path.join(keywordFolder, `${keyword}-article.md`);
const metaFile = path.join(keywordFolder, `${keyword}-meta.json`);

// Validate keyword folder exists
if (!fs.existsSync(keywordFolder)) {
  console.error(`❌ Error: Keyword folder not found: ${keywordFolder}`);
  console.error(`\nAvailable keywords in ${SEO_CONTENT_BASE}:`);

  try {
    const folders = fs.readdirSync(SEO_CONTENT_BASE, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => `  - ${dirent.name}`);
    console.error(folders.join('\n'));
  } catch (e) {
    console.error('  (Could not list available keywords)');
  }

  process.exit(1);
}

// Validate article file exists
if (!fs.existsSync(articleFile)) {
  console.error(`❌ Error: Article file not found: ${articleFile}`);
  process.exit(1);
}

// Validate meta file exists
if (!fs.existsSync(metaFile)) {
  console.error(`❌ Error: Meta data file not found: ${metaFile}`);
  process.exit(1);
}

console.log(`✅ Found keyword folder: ${keyword}`);
console.log(`✅ Found article: ${path.basename(articleFile)}`);
console.log(`✅ Found meta data: ${path.basename(metaFile)}`);
console.log('');

// Output the full prompt for Claude
console.log(`Please generate a SEO-optimized Ratgeber page for keyword "${keyword}".

**Task Overview:**
1. Read and analyze the article content from: ${articleFile}
2. Read SEO meta data from: ${metaFile}
3. Read design guidelines from: ${DESIGN_GUIDELINES}
4. Generate a new React/Next.js page following the SEO-DESIGN guidelines
5. Add entry to frontend/lib/ratgeber-registry.ts
6. Run "npm run sitemap" to update sitemap.xml and robots.txt

**Critical Requirements:**
- Follow ALL design guidelines from SEO-DESIGN.md (Text First approach, max 2-4 RatgeberHighlightBox per article)
- Use semantic HTML (<h2>, <h3>, <p>, <ul>, <ol>) for 95% of content
- Integrate SEO meta tags from ${keyword}-meta.json into Next.js <Head>
- Add JSON-LD structured data (Article, FAQ, Breadcrumb)
- All CTAs link to "/pferde-preis-berechnen" (NOT /bewertung!)
- Use existing components: RatgeberHero, RatgeberTableOfContents, RatgeberHighlightBox, FAQ, RatgeberRelatedArticles, RatgeberFinalCTA
- Ensure TypeScript compliance (no 'any' types)
- Run ESLint and type-check before finalizing

**File Structure:**
- New page: frontend/pages/pferde-ratgeber/${keyword.replace(/ /g, '-')}.tsx
- Registry: frontend/lib/ratgeber-registry.ts (add new entry)
- Sitemap: Run "npm run sitemap" after registry update

Please proceed with the implementation.`);