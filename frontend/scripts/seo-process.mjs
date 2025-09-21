#!/usr/bin/env node

/**
 * SEO Process Script for PferdeWert.de
 * Usage: npm run seo "keyword"
 *
 * This script orchestrates the complete 6-agent SEO content creation pipeline:
 * 1. Process Coordination (pferdewert-frontend-dev)
 * 2. Data Collection (general-purpose)
 * 3. Keyword Analysis (pferdewert-frontend-dev)
 * 4. Competitor Research (general-purpose)
 * 5. Content Outline Generation (pferdewert-frontend-dev)
 * 6. Final Content Creation (pferdewert-frontend-dev)
 */

import fs from 'fs';
import path from 'path';

const keyword = process.argv[2];

if (!keyword) {
    console.error('❌ Fehler: Keyword fehlt!');
    console.log('📋 Verwendung: npm run seo "pferd kaufen bayern"');
    console.log('📋 Beispiel: npm run seo "warmblut kaufen"');
    process.exit(1);
}

console.log(`🚀 Starte SEO-Prozess für Keyword: "${keyword}"`);
console.log('📊 Kompletter 6-Agenten-Prozess wird durchgeführt...\n');

// Create SEO folder structure
const seoPath = path.join(process.cwd(), '..', 'SEO', 'SEO-CONTENT', keyword.replace(/\s+/g, '-'));
const timestamp = new Date().toISOString().split('T')[0];

console.log('📁 Erstelle Ordnerstruktur...');
try {
    fs.mkdirSync(seoPath, { recursive: true });
    console.log(`✅ Ordner erstellt: ${seoPath}`);
} catch {
    console.log(`ℹ️  Ordner existiert bereits: ${seoPath}`);
}

// Create process tracking file
const processFile = path.join(seoPath, `${keyword.replace(/\s+/g, '-')}-process.md`);
const processContent = `# SEO Content Generation Process
## Target Keyword: ${keyword}
## Date: ${timestamp}
## Process ID: ${Date.now()}

## Status: RUNNING
- ⏳ Agent 1: Process Coordination (in progress)
- ⏸️ Agent 2: Data Collection (pending)
- ⏸️ Agent 3: Keyword Analysis (pending)
- ⏸️ Agent 4: Competitor Research (pending)
- ⏸️ Agent 5: Content Outline Generation (pending)
- ⏸️ Agent 6: Final Content Creation (pending)

## Output Files
- \`${keyword.replace(/\s+/g, '-')}-keywords.json\` - Keyword research results
- \`${keyword.replace(/\s+/g, '-')}-competitors.json\` - Competitor analysis
- \`${keyword.replace(/\s+/g, '-')}-outline.md\` - Content outline
- \`${keyword.replace(/\s+/g, '-')}-technical.json\` - Technical SEO recommendations
- \`${keyword.replace(/\s+/g, '-')}-article.md\` - Final article
- \`${keyword.replace(/\s+/g, '-')}-meta.json\` - Meta assets

## Process Log
${new Date().toISOString()}: SEO process started for keyword "${keyword}"
`;

fs.writeFileSync(processFile, processContent);
console.log(`✅ Process-Tracking erstellt: ${processFile}\n`);

console.log('🔄 KOMPLETTER 6-AGENTEN-PROZESS WIRD DURCHGEFÜHRT:');
console.log('   1️⃣ Process Coordination & Setup');
console.log('   2️⃣ Data Collection (Keywords, SERP)');
console.log('   3️⃣ Keyword Analysis & Filtering');
console.log('   4️⃣ Competitor Research & Content Gaps');
console.log('   5️⃣ Content Outline Generation');
console.log('   6️⃣ Final Content Creation');
console.log('\n💡 Tipp: Du kannst den Fortschritt in der generierten process.md Datei verfolgen\n');

// Agent 1: Process Coordination
console.log('🎯 Agent 1: Process Coordination wird gestartet...');

try {
    console.log('🤖 Führe kompletten SEO-Prozess aus...');
    console.log('⚠️  WICHTIG: Dies ist ein umfassender Prozess der alle 6 Agenten durchläuft!');
    console.log('📝 Kommando für Claude Code:');
    console.log('---');
    console.log(`Task(pferdewert-frontend-dev): "Setup complete SEO process for keyword '${keyword}' - create all necessary folder structures, initialize tracking files, perform keyword research expansion using DataForSEO APIs (keyword_ideas, related_keywords, keyword_suggestions), analyze regional search patterns for German market, filter and categorize keywords by search intent, save results to ${keyword.replace(/\s+/g, '-')}-keywords.json, then automatically continue with competitor analysis using DataForSEO SERP analysis and Firecrawl content extraction for top 10 results, create content outline with H1-H3 structure plus FAQ section, and finally generate complete 1000-2500 word German SEO article with meta assets - execute full 6-agent pipeline automatically"`);
    console.log('---');

} catch (error) {
    console.error('❌ Fehler beim Starten des SEO-Prozesses:', error.message);
    process.exit(1);
}

console.log('\n✅ SEO-Prozess erfolgreich initialisiert!');
console.log('📂 Alle Dateien werden gespeichert in:', seoPath);
console.log('📊 Prozess-Status verfolgbar in:', processFile);