#!/bin/bash
# Script to add locale-aware routing to all pages

# List of pages to update (excluding api, _app, _document, test pages)
PAGES=(
  "pages/agb.tsx"
  "pages/beispiel-analyse.tsx"
  "pages/datenschutz.tsx"
  "pages/ergebnis.tsx"
  "pages/impressum.tsx"
  "pages/ueber-pferdewert.tsx"
  "pages/pferde-ratgeber/index.tsx"
  "pages/pferde-ratgeber/[slug].tsx"
  "pages/pferde-ratgeber/aku-pferd/index.tsx"
  "pages/pferde-ratgeber/aku-pferd/kosten.tsx"
  "pages/pferde-ratgeber/anfaengerpferd-kaufen.tsx"
  "pages/pferde-ratgeber/dressurpferd-kaufen.tsx"
  "pages/pferde-ratgeber/freizeitpferd-kaufen.tsx"
  "pages/pferde-ratgeber/pferd-kaufen/index.tsx"
  "pages/pferde-ratgeber/pferd-verkaufen/index.tsx"
  "pages/pferde-ratgeber/pferdekaufvertrag.tsx"
  "pages/pferde-ratgeber/pferdemarkt.tsx"
  "pages/pferde-ratgeber/springpferd-kaufen.tsx"
  "pages/pferde-ratgeber/was-kostet-ein-pferd.tsx"
)

echo "🔄 Updating locale-aware links in all pages..."
echo ""

for PAGE in "${PAGES[@]}"; do
  if [ ! -f "$PAGE" ]; then
    echo "⚠️  Skipping $PAGE (not found)"
    continue
  fi

  echo "📄 Processing: $PAGE"

  # Check if useCountryConfig is already imported
  if ! grep -q "useCountryConfig" "$PAGE"; then
    echo "  ✓ Adding useCountryConfig import"
    # Add import after other imports
    sed -i '' '/^import.*from.*react/a\
import { useCountryConfig } from "@/hooks/useCountryConfig";
' "$PAGE"
  fi

  # Replace internal links with getLocalizedPath
  # Main form link
  sed -i '' 's|href="/pferde-preis-berechnen"|href={getLocalizedPath("/pferde-preis-berechnen")}|g' "$PAGE"

  # Example analysis link
  sed -i '' 's|href="/beispiel-analyse"|href={getLocalizedPath("/beispiel-analyse")}|g' "$PAGE"

  # Ratgeber links
  sed -i '' 's|href="/pferde-ratgeber/\([^"]*\)"|href={getLocalizedPath("/pferde-ratgeber/\1")}|g' "$PAGE"

  echo "  ✓ Updated links"
done

echo ""
echo "✅ Done! Please manually add 'const { getLocalizedPath } = useCountryConfig();' to each component function."
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Add hook call to each component"
echo "3. Run: npm run type-check"
echo "4. Test all pages"
