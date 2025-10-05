#!/usr/bin/env node

/**
 * /page Command - Generates SEO-optimized Ratgeber page from keyword
 *
 * Usage: /page <keyword>
 * Example: /page pferd kaufen
 *
 * This command:
 * 1. Reads final article from SEO/SEO-CONTENT/<keyword>/content/final-article.md (Phase 6)
 * 2. Reads meta data from SEO/SEO-CONTENT/<keyword>/seo/seo-metadata.json (Phase 5A)
 * 3. Reads FAQ schema from SEO/SEO-CONTENT/<keyword>/seo/schema-faq.json (Phase 5B, optional)
 * 4. Reads internal links from SEO/SEO-CONTENT/<keyword>/seo/internal-linking.json (Phase 5C)
 * 5. Generates a React/Next.js page following SEO-DESIGN.md guidelines
 * 6. Adds entry to frontend/lib/ratgeber-registry.ts
 * 7. Runs npm run sitemap to update sitemap.xml and robots.txt
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

// ES6 module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Validates keyword for security and correctness
 * @param {string} keyword - The keyword to validate
 * @returns {boolean} - True if valid
 */
function validateKeyword(keyword) {
  if (!keyword || typeof keyword !== 'string') {
    return false;
  }

  // Allow only alphanumeric, spaces, umlauts, and hyphens
  // Prevents path traversal attacks (.., /, \, etc.)
  const validPattern = /^[\w\säöüßÄÖÜ-]+$/i;
  return validPattern.test(keyword);
}

/**
 * Lists available keywords in the SEO content directory
 * @param {string} baseDir - Base directory path
 * @returns {string[]} - Array of keyword folder names
 */
function listAvailableKeywords(baseDir) {
  try {
    return readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    return [];
  }
}

// Get keyword from command line arguments
const keyword = process.argv.slice(2).join(' ');

// Validate keyword
if (!keyword) {
  console.error('❌ Error: No keyword provided');
  console.error('Usage: /page <keyword>');
  console.error('Example: /page pferd kaufen');
  process.exit(1);
}

if (!validateKeyword(keyword)) {
  console.error('❌ Error: Invalid keyword format');
  console.error('Keyword must contain only letters, numbers, spaces, umlauts, and hyphens');
  console.error(`Provided: "${keyword}"`);
  process.exit(1);
}

// Define paths using relative paths from script location
const SEO_CONTENT_BASE = join(__dirname, '../../SEO/SEO-CONTENT');
const DESIGN_GUIDELINES = join(__dirname, '../../SEO/SEO-DESIGN.md');

const keywordFolder = join(SEO_CONTENT_BASE, keyword);
const articleFile = join(keywordFolder, 'content', 'final-article.md');
const metaFile = join(keywordFolder, 'seo', 'seo-metadata.json');
const faqFile = join(keywordFolder, 'seo', 'schema-faq.json');
const linksFile = join(keywordFolder, 'seo', 'internal-linking.json');

// Validate keyword folder exists
if (!existsSync(keywordFolder)) {
  console.error(`❌ Error: Keyword folder not found: ${keyword}`);
  console.error(`\nAvailable keywords in SEO/SEO-CONTENT:`);

  const availableKeywords = listAvailableKeywords(SEO_CONTENT_BASE);
  if (availableKeywords.length > 0) {
    availableKeywords.forEach(kw => console.error(`  - ${kw}`));
  } else {
    console.error('  (No keyword folders found or unable to read directory)');
  }

  process.exit(1);
}

// Validate article file exists
if (!existsSync(articleFile)) {
  console.error(`❌ Error: Final article not found`);
  console.error(`   Expected: ${relative(process.cwd(), articleFile)}`);
  console.error(`   (Phase 6 output: content/final-article.md)`);
  process.exit(1);
}

// Validate meta file exists
if (!existsSync(metaFile)) {
  console.error(`❌ Error: SEO metadata not found`);
  console.error(`   Expected: ${relative(process.cwd(), metaFile)}`);
  console.error(`   (Phase 5A output: seo/seo-metadata.json)`);
  process.exit(1);
}

// Validate design guidelines exist
if (!existsSync(DESIGN_GUIDELINES)) {
  console.error(`❌ Warning: SEO design guidelines not found`);
  console.error(`   Expected: ${relative(process.cwd(), DESIGN_GUIDELINES)}`);
  console.error(`   Proceeding without design guidelines...`);
}

console.log(`✅ Found keyword folder: ${keyword}`);
console.log(`✅ Found final article: ${relative(keywordFolder, articleFile)}`);
console.log(`✅ Found SEO metadata: ${relative(keywordFolder, metaFile)}`);

// Check for optional files
if (existsSync(faqFile)) {
  console.log(`✅ Found FAQ schema: ${relative(keywordFolder, faqFile)}`);
}
if (existsSync(linksFile)) {
  console.log(`✅ Found internal linking: ${relative(keywordFolder, linksFile)}`);
}
console.log('');

// Generate URL-friendly slug
const slug = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[äöüß]/g, match => {
  const map = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
  return map[match] || match;
});

// Output the full prompt for Claude
console.log(`Please generate a SEO-optimized Ratgeber page for keyword "${keyword}".

**Task Overview:**
1. Read and analyze the final article (Phase 6, publication-ready) from: ${relative(process.cwd(), articleFile)}
2. Read SEO metadata (Phase 5A) from: ${relative(process.cwd(), metaFile)}
3. Read FAQ schema (Phase 5B, if exists) from: ${relative(process.cwd(), faqFile)}
4. Read internal linking data (Phase 5C, if exists) from: ${relative(process.cwd(), linksFile)}
5. Read design guidelines from: ${relative(process.cwd(), DESIGN_GUIDELINES)}
6. Generate a new React/Next.js page following the SEO-DESIGN guidelines
7. Add entry to frontend/lib/ratgeber-registry.ts
8. Run "npm run sitemap" to update sitemap.xml and robots.txt

**Critical Requirements:**
- Follow ALL design guidelines from SEO-DESIGN.md (Text First approach, max 2-4 RatgeberHighlightBox per article)
- Use semantic HTML (<h2>, <h3>, <p>, <ul>, <ol>) for 95% of content
- Integrate SEO meta tags from seo/seo-metadata.json into Next.js <Head>
- Add JSON-LD structured data (Article schema + FAQ schema if available, Breadcrumb)
- Use internal linking data if available from seo/internal-linking.json
- All CTAs link to "/pferde-preis-berechnen" (NOT /bewertung!)
- Use existing components: RatgeberHero, RatgeberTableOfContents, RatgeberHighlightBox, FAQ, RatgeberRelatedArticles, RatgeberFinalCTA
- Ensure TypeScript compliance (no 'any' types)
- Run ESLint and type-check before finalizing

**File Structure:**
- New page: frontend/pages/pferde-ratgeber/${slug}.tsx
- Registry: frontend/lib/ratgeber-registry.ts (add new entry)
- Sitemap: Run "npm run sitemap" after registry update

Please proceed with the implementation.`);
