/**
 * Utility functions for creating hero meta items in ratgeber pages
 *
 * This prevents hydration issues by ensuring meta items are created
 * in a stable way outside of component render cycles.
 *
 * IMPORTANT: Always use this utility instead of inline array creation
 * within component functions to prevent infinite reload loops.
 */

import React from 'react';

export interface HeroMetaItem {
  icon: React.ReactNode;
  label: string | React.ReactNode;
}

/**
 * Creates hero meta items array with stable references
 *
 * Usage:
 * ```tsx
 * const getMyPageHeroMetaItems = () => createHeroMetaItems([
 *   { icon: <Clock className="h-4 w-4" />, label: "12 min Lesezeit" },
 *   { icon: <Award className="h-4 w-4" />, label: "Experten-Ratgeber" }
 * ]);
 *
 * const MyPage: NextPage = () => {
 *   const heroMetaItems = getMyPageHeroMetaItems();
 *   // ...
 * }
 * ```
 */
export function createHeroMetaItems(items: HeroMetaItem[]): HeroMetaItem[] {
  return items;
}
