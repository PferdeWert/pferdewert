#!/usr/bin/env node
/**
 * Script to check for incorrect /ratgeber URLs in the codebase
 * Prevents using /ratgeber instead of /pferde-ratgeber for SEO consistency
 *
 * Usage: node scripts/check-ratgeber-urls.mjs
 * Exit code: 0 = no errors, 1 = errors found
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Patterns that indicate incorrect /ratgeber usage
const INCORRECT_PATTERNS = [
  // URLs in SEO metadata
  /['"`]https?:\/\/[^'"]*pferdewert\.de\/ratgeber\/[^'"]*['"`]/,
  // Canonical URLs
  /canonical_url:\s*['"`][^'"]*\/ratgeber\/[^'"]*['"`]/,
  // @id in JSON-LD
  /'@id':\s*['"`][^'"]*\/ratgeber\/[^'"]*['"`]/,
  // Breadcrumb items
  /item:\s*['"`][^'"]*\/ratgeber\/[^'"]*['"`]/,
  // href attributes - catch ALL /ratgeber URLs (redirects only allowed in next.config.js)
  /href=['"`]\/ratgeber\/[^'"]*['"`]/,
];

// Files to check
const FILES_TO_CHECK = [
  'pages/**/*.{ts,tsx}',
  'components/**/*.{ts,tsx}',
  'lib/**/*.{ts,tsx}',
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/next.config.js', // Redirects are OK here
  '**/*.backup',
];

let hasErrors = false;

// Simple recursive file finder
function findFiles(dir, extensions, exclude = []) {
  const results = [];

  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = join(dir, file);

      // Skip excluded patterns
      if (exclude.some(pattern => filePath.includes(pattern))) continue;

      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        results.push(...findFiles(filePath, extensions, exclude));
      } else if (extensions.some(ext => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  } catch (err) {
    // Directory doesn't exist or not accessible
  }

  return results;
}

function checkFiles() {
  console.log('🔍 Checking for incorrect /ratgeber URLs...\n');

  const files = [
    ...findFiles('pages', ['.ts', '.tsx'], ['node_modules', '.next', '.backup']),
    ...findFiles('components', ['.ts', '.tsx'], ['node_modules', '.next']),
    ...findFiles('lib', ['.ts', '.tsx'], ['node_modules', '.next']),
  ];

  for (const file of files) {
    // Skip next.config.js (redirects are OK there)
    if (file.includes('next.config.js')) continue;

    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      for (const pattern of INCORRECT_PATTERNS) {
        if (pattern.test(line)) {
          // Skip if it's a comment example that's already marked as correct
          if (line.includes('pferde-ratgeber')) continue;

          console.error(`❌ ${file}:${index + 1}`);
          console.error(`   ${line.trim()}`);
          console.error(`   ^ Should use /pferde-ratgeber instead of /ratgeber\n`);
          hasErrors = true;
        }
      }
    });
  }

  if (hasErrors) {
    console.error('\n❌ Found incorrect /ratgeber URLs!');
    console.error('ℹ️  All ratgeber URLs should use /pferde-ratgeber for SEO consistency.\n');
    process.exit(1);
  } else {
    console.log('✅ No incorrect /ratgeber URLs found!\n');
    process.exit(0);
  }
}

try {
  checkFiles();
} catch (error) {
  console.error('Error checking files:', error);
  process.exit(1);
}
