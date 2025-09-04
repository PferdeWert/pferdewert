// frontend/lib/analysisSplitter.ts
// Splits a full analysis into a visible and hidden part based on tier.

export type Tier = 'basic' | 'pro' | 'premium';

export interface SplitResult {
  visible: string;
  hidden: string;
  hasMore: boolean;
}

// Preferred markers in order for robust splitting
// Includes markers from the AI prompt as well as headings used in example pages
const CUT_MARKERS = [
  // Example/marketing pages structure
  '## Preisfaktoren im Detail',
  '## Markteinschätzung & Timing',
  '## Markteinschätzung',
  '## Verkaufsempfehlungen',
  '## Kaufberatung',
  '## Zukunftspotenzial',
  '## Fazit',
  // Prompt-based structure for AI output
  '### 🔍 DETAILANALYSE',
  '### 🎯 VERWENDUNGSEIGNUNG',
  '### 📈 MARKT-INTELLIGENCE',
  '### 🏆 HANDLUNGSEMPFEHLUNGEN',
  '### ⚖️ BEWERTUNGS-CONFIDENCE',
  // Legacy/alternative
  '## Marktübersicht'
];

const FALLBACK_CHAR_LIMIT = 1500; // Safe preview length if no marker found

export function splitAnalysis(full: string, tier: Tier): SplitResult {
  if (!full || typeof full !== 'string') {
    return { visible: '', hidden: '', hasMore: false };
  }

  // Only gate for basic
  if (tier !== 'basic') {
    return { visible: full, hidden: '', hasMore: false };
  }

  // Try markers
  for (const marker of CUT_MARKERS) {
    const idx = full.indexOf(marker);
    if (idx > -1) {
      const visible = full.substring(0, idx).trim();
      const hidden = full.substring(idx).trim();
      if (visible.length > 0) {
        return { visible, hidden, hasMore: true };
      }
    }
  }

  // Fallback: cut after a reasonable number of characters at a paragraph boundary
  const limit = Math.min(FALLBACK_CHAR_LIMIT, Math.max(800, Math.floor(full.length * 0.3)));
  let cut = limit;
  const nextParagraph = full.indexOf('\n\n', limit);
  if (nextParagraph > -1 && nextParagraph - limit < 600) {
    cut = nextParagraph;
  }
  const visible = full.substring(0, cut).trim();
  const hidden = full.substring(cut).trim();
  return { visible, hidden, hasMore: hidden.length > 0 };
}

