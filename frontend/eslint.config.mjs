import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores - these files/folders will be completely ignored
  {
    ignores: [
      // Build outputs
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",

      // Dependencies
      "node_modules/**",

      // Environment files
      ".env*",

      // Logs
      "*.log",

      // Minified files
      "**/*.min.js",
      "**/*.min.css",

      // Public static files (usually third-party)
      "public/js/**",
      "public/lib/**",

      // Config files that don't need linting
      "postcss.config.js",
      "tailwind.config.js",

      // TypeScript declaration files from libraries (but keep our own)
      "**/*.d.ts",
      "!types/**/*.d.ts"
    ],
  },

  // Apply Next.js config to remaining files
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ============================================================================
  // FAST REFRESH PREVENTION RULES
  // ============================================================================
  // These rules prevent common anti-patterns that cause Fast Refresh loops
  // See: docs/eslint-fast-refresh-prevention.md for details
  {
    files: ["**/*.tsx", "**/*.ts"],
    rules: {
      // Warn about inline JSX in props (most common Fast Refresh issue)
      // ❌ Bad: <Component icon={<Icon />} />
      // ✅ Good: const icon = <Icon />; <Component icon={icon} />
      "react/jsx-no-constructed-context-values": "warn",

      // Enforce dependency arrays in hooks
      "react-hooks/exhaustive-deps": "warn",

      // Warn about missing React import (can cause Fast Refresh issues in some cases)
      "react/react-in-jsx-scope": "off", // Next.js auto-imports React

      // Prevent inline functions in JSX props (performance + Fast Refresh)
      // Note: This is a performance rule but also helps with Fast Refresh
      // ❌ Bad: onClick={() => handleClick()}
      // ✅ Good: onClick={handleClick}
      // We set to 'off' for now as it can be too strict, but consider 'warn'
      "react/jsx-no-bind": "off",
    }
  }
];

export default eslintConfig;