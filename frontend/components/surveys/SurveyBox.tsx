import { SurveyBoxProps } from '@/types/surveys'

/**
 * SurveyBox Component - Display Instagram Community Survey Results
 *
 * Features:
 * - Bar chart visualization with percentages
 * - Responsive design (mobile-optimized)
 * - Brand-brown color scheme
 * - Shows total participants and last updated date
 * - E-E-A-T signal: "Echte Daten von XXX Pferdebesitzern"
 *
 * Usage:
 * ```tsx
 * import { monthlyCostsSurvey } from '@/data/surveys/monthly-costs'
 * import SurveyBox from '@/components/surveys/SurveyBox'
 *
 * <SurveyBox survey={monthlyCostsSurvey} />
 * ```
 */

export default function SurveyBox({
  survey,
  showChart = true,
  compact = false,
  className = ''
}: SurveyBoxProps) {

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    }
    return date.toLocaleDateString('de-DE', options)
  }

  // Get max percentage for bar scaling
  const maxPercentage = Math.max(...survey.results.map(r => r.percentage))

  return (
    <div
      className={`
        bg-amber-50
        border-l-4 border-brand-brown
        rounded-lg
        p-6
        my-8
        shadow-sm
        ${compact ? 'p-4 my-4' : ''}
        ${className}
      `}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className={`font-bold text-gray-900 mb-2 ${compact ? 'text-lg' : 'text-xl'}`}>
          💡 Echte Daten von {survey.totalParticipants.toLocaleString('de-DE')} Pferdebesitzern
        </h3>
        <p className="text-sm text-gray-600">
          Stand: {formatDate(survey.lastUpdated)}
        </p>
      </div>

      {/* Question */}
      <p className={`text-gray-900 mb-4 ${compact ? 'text-base' : 'text-lg'} font-medium`}>
        {survey.question}
      </p>

      {/* Description (optional) */}
      {survey.description && (
        <p className="text-sm text-gray-600 mb-4 italic">
          {survey.description}
        </p>
      )}

      {/* Results - Bar Chart */}
      {showChart && (
        <div className="space-y-3 mb-4">
          {survey.results.map((result, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Range Label */}
              <div className={`${compact ? 'w-24 text-sm' : 'w-32 text-base'} text-gray-700 font-medium flex-shrink-0`}>
                {result.range}
              </div>

              {/* Progress Bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div
                  className="bg-brand-brown h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${(result.percentage / maxPercentage) * 100}%` }}
                >
                  {/* Percentage inside bar if wide enough */}
                  {result.percentage > 15 && (
                    <span className="text-white text-sm font-semibold">
                      {result.percentage}%
                    </span>
                  )}
                </div>

                {/* Percentage outside bar if too narrow */}
                {result.percentage <= 15 && (
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 text-sm font-semibold"
                  >
                    {result.percentage}%
                  </span>
                )}
              </div>

              {/* Count (optional, only in non-compact mode) */}
              {!compact && (
                <div className="w-16 text-right text-sm text-gray-600">
                  ({result.count})
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer - Source */}
      <div className="pt-3 border-t border-amber-200">
        <p className="text-xs text-gray-500">
          <strong>Quelle:</strong> PferdeWert {survey.platform === 'instagram' ? 'Instagram-' : ''}Community, {formatDate(survey.lastUpdated)}
          {' '} • {survey.totalParticipants.toLocaleString('de-DE')} Teilnehmer
        </p>
      </div>
    </div>
  )
}
