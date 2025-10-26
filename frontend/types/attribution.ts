/**
 * Image Attribution Interface
 *
 * Used for documenting image sources and licenses (e.g., from Wikimedia Commons)
 * to comply with Creative Commons and other attribution requirements.
 */
export interface ImageAttribution {
  /** Author/Creator name */
  author: string
  /** License type (e.g., "CC BY-SA 3.0", "CC BY 4.0") */
  license: string
  /** Full URL to the license text */
  licenseUrl: string
  /** Optional source name (e.g., "Wikimedia Commons") */
  source?: string
  /** Optional link to original image */
  originalUrl?: string
}
