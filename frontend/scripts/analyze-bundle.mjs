#!/usr/bin/env node
// Script to analyze bundle and find largest dependencies

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the webpack stats from next build
const statsPath = path.join(__dirname, '../.next/client-stats.json');

if (!fs.existsSync(statsPath)) {
  console.log('❌ Stats file not found. Run: npm run build first');
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

// Extract module sizes
const modules = stats.modules || [];
const dependencySizes = {};

modules.forEach(module => {
  const name = module.name || module.identifier;
  const size = module.size || 0;

  // Extract package name from node_modules path
  const match = name.match(/node_modules[\/\\](@?[^\/\\]+(?:[\/\\][^\/\\]+)?)/);
  if (match) {
    const pkgName = match[1];
    dependencySizes[pkgName] = (dependencySizes[pkgName] || 0) + size;
  }
});

// Sort by size
const sorted = Object.entries(dependencySizes)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

console.log('\n📦 Top 15 Dependencies by Size:\n');
console.log('Package'.padEnd(40) + 'Size');
console.log('─'.repeat(60));

sorted.forEach(([pkg, size]) => {
  const sizeKB = (size / 1024).toFixed(1);
  console.log(pkg.padEnd(40) + `${sizeKB} KB`);
});

const total = sorted.reduce((sum, [, size]) => sum + size, 0);
console.log('─'.repeat(60));
console.log('TOTAL (Top 15)'.padEnd(40) + `${(total / 1024).toFixed(1)} KB`);
console.log('\n');
