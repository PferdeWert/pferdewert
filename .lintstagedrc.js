/**
 * Lint-Staged Configuration
 * Runs checks on staged files before commit
 *
 * IMPORTANT: This prevents commits with:
 * - ESLint errors
 * - TypeScript errors
 * - Incorrect /ratgeber URLs (should be /pferde-ratgeber)
 */

export default {
  // Frontend TypeScript/TSX files
  'frontend/**/*.{ts,tsx}': (filenames) => [
    // Type check all frontend files (not just staged ones, to catch type errors)
    'cd frontend && npm run type-check',

    // Lint only staged files
    `cd frontend && eslint ${filenames.map(f => f.replace('frontend/', '')).join(' ')}`,

    // Check for incorrect /ratgeber URLs in the entire codebase
    // (Must run on all files because URL references can be anywhere)
    'cd frontend && npm run check-urls',
  ],

  // Frontend JS files
  'frontend/**/*.{js,jsx}': (filenames) => [
    `cd frontend && eslint ${filenames.map(f => f.replace('frontend/', '')).join(' ')}`,
    'cd frontend && npm run check-urls',
  ],

  // Backend Python files (if you add backend checks later)
  'backend/**/*.py': () => [
    // Uncomment when backend linting is configured
    // 'cd backend && ruff check .',
  ],
};
