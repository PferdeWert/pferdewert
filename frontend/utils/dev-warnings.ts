/**
 * Development-only warnings for common Fast Refresh issues
 * These checks run only in dev mode and help catch problems early
 */

import { ReactNode } from 'react'

/**
 * Checks if a value looks like it might be recreated on every render
 * (which would cause Fast Refresh loops)
 */
export function warnIfUnstableReference(
  value: unknown,
  propName: string,
  componentName: string
): void {
  if (process.env.NODE_ENV !== 'development') return

  // Check if value is a React element (JSX)
  if (
    value &&
    typeof value === 'object' &&
    '$$typeof' in value &&
    value.$$typeof === Symbol.for('react.element')
  ) {
    console.warn(
      `⚠️  Fast Refresh Warning in ${componentName}:\n` +
      `   Prop "${propName}" contains a React element.\n` +
      `   This should be defined at module level to prevent infinite reload loops.\n` +
      `   \n` +
      `   ❌ Bad:  ${componentName}({ ${propName}: <Icon /> })\n` +
      `   ✅ Good: const icon = <Icon />; ${componentName}({ ${propName}: icon })\n` +
      `   \n` +
      `   See: /docs/frontend-guidelines.md lines 729-813`
    )
  }

  // Check for inline functions
  if (typeof value === 'function' && !value.name) {
    console.warn(
      `⚠️  Fast Refresh Warning in ${componentName}:\n` +
      `   Prop "${propName}" contains an anonymous function.\n` +
      `   This creates a new function on every render and may cause Fast Refresh loops.\n` +
      `   \n` +
      `   ❌ Bad:  ${componentName}({ ${propName}: () => {} })\n` +
      `   ✅ Good: const handler = () => {}; ${componentName}({ ${propName}: handler })\n`
    )
  }
}

/**
 * Validates CTA props for Fast Refresh stability
 */
export function validateCtaProps(
  cta: { icon?: ReactNode } | undefined,
  ctaName: string,
  componentName: string
): void {
  if (!cta) return

  warnIfUnstableReference(cta.icon, `${ctaName}.icon`, componentName)
}
