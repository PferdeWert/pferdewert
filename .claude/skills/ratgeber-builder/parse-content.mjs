#!/usr/bin/env node
/**
 * Helper Script: Parse Ratgeber Content
 *
 * Parst FINAL-ARTICLE.md und *-meta.json und gibt die Struktur
 * für eine neue Ratgeber-Page aus.
 *
 * Usage:
 *   node .claude/skills/parse-ratgeber-content.mjs <keyword>
 *
 * Example:
 *   node .claude/skills/parse-ratgeber-content.mjs pferdemarkt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const keyword = process.argv[2];

if (!keyword) {
  console.error('❌ Fehler: Bitte Keyword-Ordner angeben');
  console.log('\nUsage: node parse-ratgeber-content.mjs <keyword>');
  console.log('Example: node parse-ratgeber-content.mjs pferdemarkt');
  process.exit(1);
}

// Pfade (von .claude/skills/ratgeber-builder/ aus, also 3 Ebenen hoch zum Projekt-Root)
const projectRoot = path.resolve(__dirname, '../../..');
const seoContentPath = path.join(projectRoot, 'SEO', 'SEO-CONTENT', keyword);
const finalArticlePath = path.join(seoContentPath, 'content', 'FINAL-ARTICLE.md');

// Neue SEO-Ordner-Struktur
const seoMetadataPath = path.join(seoContentPath, 'seo', 'seo-metadata.json');
const schemaArticlePath = path.join(seoContentPath, 'seo', 'schema-article.json');
const schemaFaqPath = path.join(seoContentPath, 'seo', 'schema-faq.json');
const schemaBreadcrumbPath = path.join(seoContentPath, 'seo', 'schema-breadcrumb.json');

console.log('🔍 Suche SEO-Content für:', keyword);
console.log('📁 Content-Pfad:', seoContentPath);

// Check if files exist
if (!fs.existsSync(finalArticlePath)) {
  console.error(`❌ FINAL-ARTICLE.md nicht gefunden: ${finalArticlePath}`);
  process.exit(1);
}

if (!fs.existsSync(seoMetadataPath)) {
  console.error(`❌ seo-metadata.json nicht gefunden: ${seoMetadataPath}`);
  process.exit(1);
}

console.log('✅ Artikel-Content gefunden');

// Read files
const articleContent = fs.readFileSync(finalArticlePath, 'utf-8');
const seoMetadata = JSON.parse(fs.readFileSync(seoMetadataPath, 'utf-8'));

// Optional: Schema-Dateien (falls vorhanden)
let schemaArticle = null;
let schemaFaq = null;
let schemaBreadcrumb = null;

if (fs.existsSync(schemaArticlePath)) {
  schemaArticle = JSON.parse(fs.readFileSync(schemaArticlePath, 'utf-8'));
  console.log('✅ Article Schema gefunden');
}

if (fs.existsSync(schemaFaqPath)) {
  schemaFaq = JSON.parse(fs.readFileSync(schemaFaqPath, 'utf-8'));
  console.log('✅ FAQ Schema gefunden');
}

if (fs.existsSync(schemaBreadcrumbPath)) {
  schemaBreadcrumb = JSON.parse(fs.readFileSync(schemaBreadcrumbPath, 'utf-8'));
  console.log('✅ Breadcrumb Schema gefunden');
}

console.log();

// Parse article structure
console.log('📖 Parse Artikel-Struktur...\n');

// Extract H2 headings for Table of Contents
const h2Regex = /^## (.+)$/gm;
const sections = [];
let match;

while ((match = h2Regex.exec(articleContent)) !== null) {
  const title = match[1];
  // Create ID from title (lowercase, replace spaces/special chars with hyphens)
  const id = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  sections.push({ id, title });
}

// Extract first paragraph for subtitle (if not in meta)
const firstParagraphRegex = /^(?!#)(.+?)(?=\n\n|\n#)/m;
const firstParaMatch = articleContent.match(firstParagraphRegex);
const suggestedSubtitle = firstParaMatch ? firstParaMatch[0].trim() : '';

// Calculate estimated read time
const wordCount = articleContent.split(/\s+/).length;
const readTimeMinutes = Math.ceil(wordCount / 200); // 200 words per minute

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 CONTENT-ANALYSE');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📝 Content-Statistiken:');
console.log(`   - Wortanzahl: ${wordCount}`);
console.log(`   - Geschätzte Lesezeit: ${readTimeMinutes} Min.`);
console.log(`   - Anzahl H2-Sections: ${sections.length}\n`);

console.log('📑 Table of Contents Sections:');
sections.forEach((section, index) => {
  console.log(`   ${index + 1}. ${section.title} (id: "${section.id}")`);
});
console.log();

console.log('═══════════════════════════════════════════════════════════');
console.log('📋 META-DATEN');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('🏷️  SEO Meta:');
console.log(`   - Title: ${seoMetadata.metadata?.title || 'N/A'}`);
console.log(`   - Description: ${seoMetadata.metadata?.description || 'N/A'}`);
console.log(`   - Primary Keyword: ${seoMetadata.primary_keyword || 'N/A'}`);
console.log(`   - Canonical URL: ${seoMetadata.metadata?.canonical_url || 'N/A'}\n`);

if (schemaFaq?.mainEntity) {
  console.log('❓ FAQ Items:');
  schemaFaq.mainEntity.forEach((faq, index) => {
    console.log(`   ${index + 1}. ${faq.name}`);
  });
  console.log();
}

console.log('═══════════════════════════════════════════════════════════');
console.log('🎨 VORSCHLAG FÜR HERO-SECTION');
console.log('═══════════════════════════════════════════════════════════\n');

// Extract first heading as title
const titleMatch = articleContent.match(/^# (.+)$/m);
const title = titleMatch ? titleMatch[1] : seoMetadata.metadata?.title || 'Titel fehlt';

console.log('```tsx');
console.log('<RatgeberHero');
console.log('  badge={{');
console.log('    icon: <Award className="h-4 w-4" />,');
console.log('    text: "Expertenwissen"  // Anpassen!');
console.log('  }}');
console.log(`  title="${title}"`);
console.log(`  subtitle="${suggestedSubtitle || 'Untertitel hier einfügen'}"`);
console.log('  metadata={{');
console.log(`    readTime: "${readTimeMinutes} Min.",`);
console.log(`    publishDate: "${new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}",`);
console.log('    category: "Kategorie"  // Anpassen!');
console.log('  }}');
console.log('  primaryCta={{');
console.log('    label: "Jetzt Pferdewert berechnen",');
console.log('    href: "/pferde-preis-berechnen"');
console.log('  }}');
console.log('  secondaryCta={{');
console.log('    label: "Zum Inhalt",');
console.log('    onClick: () => handleNavigate("overview"),');
console.log('    icon: <ChevronDown className="h-5 w-5" />');
console.log('  }}');
console.log('/>');
console.log('```\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('📑 VORSCHLAG FÜR TABLE OF CONTENTS');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('```tsx');
console.log('const sections = [');
sections.forEach((section, index) => {
  const isLast = index === sections.length - 1;
  console.log(`  { id: '${section.id}', title: '${section.title}' }${isLast ? '' : ','}`);
});
console.log('];');
console.log('```\n');

if (schemaFaq?.mainEntity) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('❓ VORSCHLAG FÜR FAQ-ITEMS');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('```tsx');
  console.log('const faqItems = [');
  schemaFaq.mainEntity.forEach((faq, index) => {
    const isLast = index === schemaFaq.mainEntity.length - 1;
    console.log('  {');
    console.log(`    question: ${JSON.stringify(faq.name)},`);
    console.log(`    answer: ${JSON.stringify(faq.acceptedAnswer?.text || '')}`);
    console.log(`  }${isLast ? '' : ','}`);
  });
  console.log('];');
  console.log('```\n');
}

console.log('═══════════════════════════════════════════════════════════');
console.log('🎯 REGISTRY-EINTRAG VORSCHLAG');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('```typescript');
console.log('{');
console.log(`  slug: '${keyword}',`);
console.log(`  title: ${JSON.stringify(seoMetadata.metadata?.title || title)},`);
console.log(`  description: ${JSON.stringify(seoMetadata.metadata?.description || '')},`);
console.log('  category: "Kategorie",  // Manuell anpassen!');
console.log(`  readTime: "${readTimeMinutes} Min.",`);
console.log(`  image: '/images/ratgeber/INHALTSBASIERT-BENENNEN.webp',  // WICHTIG: Inhaltsbasiert!`);
console.log(`  priority: '0.7',`);
console.log(`  changefreq: 'monthly'`);
console.log('}');
console.log('```\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('✅ NÄCHSTE SCHRITTE');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('1. ✅ Erstelle Page: /frontend/pages/pferde-ratgeber/' + keyword + '.tsx');
console.log('2. ✅ Verwende Template: .claude/skills/ratgeber-page-template.tsx');
console.log('3. ✅ Füge oben generierte Daten ein (Hero, Sections, FAQ)');
console.log('4. ✅ Parse Markdown-Content in semantisches HTML (Text First!)');
console.log('5. ✅ Füge max. 2-4 strategische HighlightBoxen hinzu');
console.log('6. ✅ Wähle inhaltsbasiertes Hero-Image (z.B. horses-field-sunset.webp)');
console.log('7. ✅ Aktualisiere ratgeber-registry.ts mit obigem Eintrag');
console.log('8. ✅ Generiere Sitemap: npm run sitemap');
console.log('9. ✅ Lint & Type-Check: npm run lint && npm run type-check');
console.log('10. ✅ Lokaler Test: npm run dev\n');

console.log('🎨 Design-Checkliste:');
console.log('   - ✅ Layout Props: fullWidth={true} + background="bg-gradient-to-b from-amber-50 to-white"');
console.log('   - ✅ Text First: 95% semantisches HTML, max. 2-4 HighlightBoxen');
console.log('   - ✅ Body Text: text-lg (NIEMALS text-sm!)');
console.log('   - ✅ Duzen: "Du", "Dein", "Dir"');
console.log('   - ✅ FAQ Schema: Automatisch via Component (NICHT manuell!)');
console.log('   - ✅ Final CTA: /images/shared/blossi-shooting.webp');
console.log('   - ✅ CTA-Link: /pferde-preis-berechnen\n');

console.log('📖 Dokumentation: SEO/SEO-DESIGN.md');
console.log('🔗 Template: .claude/skills/ratgeber-page-template.tsx\n');
