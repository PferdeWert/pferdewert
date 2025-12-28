// Survey Types for Instagram Umfragen Feature
// Used to display community survey data in Ratgeber pages

export interface SurveyResult {
  range: string           // "300-400€", "1-2 Mal", etc.
  percentage: number      // 18
  count: number          // 94
  color?: string         // Optional: Custom color for chart bar
}

export interface Survey {
  id: string                          // "monthly-costs-2025-12"
  lastUpdated: string                 // "2025-12-26"
  totalParticipants: number           // 523
  question: string                    // "Wie viel zahlt ihr monatlich..."
  description?: string                // Optional context/explanation
  platform: 'instagram' | 'website' | 'multi'  // Source of survey
  results: SurveyResult[]
  category: 'costs' | 'health' | 'insurance' | 'purchase'

  /**
   * Instagram Baseline für Delta-Berechnung
   * Speichert den letzten Stand der Instagram-Umfrage,
   * damit wir bei Updates das Delta berechnen können.
   * Website-Votes werden separat in MongoDB gezählt.
   */
  instagramBaseline?: {
    date: string              // "2025-12-28" - Datum des letzten Insta-Updates
    totalVotes: number        // Gesamt-Stimmen aus Instagram zu diesem Datum
    byRange: Record<string, number>  // z.B. { "Unter 400€": 6, "400-600€": 12, ... }
  }
}

export interface SurveyBoxProps {
  survey: Survey
  showChart?: boolean      // Default: true - show bar chart
  compact?: boolean        // Compact view for sidebars
  className?: string       // Additional Tailwind classes
  allowVoting?: boolean    // Enable interactive voting (default: false)
  onVoteComplete?: (updatedSurvey: Survey) => void  // Callback after successful vote
}
