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
];

export default eslintConfig;