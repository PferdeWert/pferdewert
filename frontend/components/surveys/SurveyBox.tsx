import { useState, useEffect } from 'react'
import { SurveyBoxProps } from '@/types/surveys'
import { error as logError } from '@/lib/log'

/**
 * SurveyBox Component - Display Community Survey Results
 *
 * Features:
 * - Bar chart visualization with percentages
 * - Interactive voting (optional via allowVoting prop)
 * - Responsive design (mobile-optimized)
 * - Brand-brown color scheme
 * - Shows total participants and last updated date
 * - E-E-A-T signal: "Echte Daten von XXX Pferdebesitzern"
 * - Vote tracking via localStorage (prevents duplicate voting)
 *
 * Usage:
 * ```tsx
 * // Read-only mode
 * <SurveyBox survey={monthlyCostsSurvey} />
 *
 * // Interactive voting mode
 * <SurveyBox survey={monthlyCostsSurvey} allowVoting={true} />
 * ```
 */

export default function SurveyBox({
  survey,
  showChart = true,
  compact = false,
  className = '',
  allowVoting = false,
  onVoteComplete
}: SurveyBoxProps) {

  const [ownsHorse, setOwnsHorse] = useState<boolean | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localSurvey, setLocalSurvey] = useState(survey)
  const [error, setError] = useState<string | null>(null)

  // Check localStorage on mount to see if user already answered/voted
  useEffect(() => {
    if (typeof window !== 'undefined' && allowVoting) {
      const ownsHorseKey = `survey_owns_horse_${survey.id}`
      const voteKey = `survey_vote_${survey.id}`

      try {
        const savedOwnsHorse = localStorage.getItem(ownsHorseKey)
        const existingVote = localStorage.getItem(voteKey)

        if (savedOwnsHorse !== null) {
          setOwnsHorse(savedOwnsHorse === 'true')
        }

        if (existingVote) {
          setHasVoted(true)
          setSelectedOption(existingVote)
        }
      } catch (e) {
        logError('[SURVEY] localStorage read failed:', e)
        // Continue without localStorage - user can still vote
      }
    }
  }, [survey.id, allowVoting])

  // Handle horse ownership answer
  const handleOwnsHorseAnswer = (answer: boolean) => {
    setOwnsHorse(answer)

    if (typeof window !== 'undefined') {
      const ownsHorseKey = `survey_owns_horse_${survey.id}`
      try {
        localStorage.setItem(ownsHorseKey, answer.toString())
      } catch (e) {
        logError('[SURVEY] localStorage write failed:', e)
        // Not critical - continue with vote
      }
    }

    // If user doesn't own a horse, skip to results
    if (!answer) {
      setHasVoted(true) // Show results immediately
    }
  }

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
  const maxPercentage = Math.max(...localSurvey.results.map(r => r.percentage))

  // Handle vote submission
  const handleVote = async (range: string) => {
    if (!allowVoting || hasVoted || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/surveys/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId: survey.id,
          range: range
        })
      })

      if (!response.ok) {
        throw new Error('Voting fehlgeschlagen')
      }

      const data = await response.json()

      // Update local survey with new results
      if (data.survey) {
        setLocalSurvey(data.survey)
      }

      // Mark as voted in localStorage
      const voteKey = `survey_vote_${survey.id}`
      try {
        localStorage.setItem(voteKey, range)
      } catch (e) {
        logError('[SURVEY] localStorage write failed:', e)
      }

      setHasVoted(true)
      setSelectedOption(range)

      // Call callback if provided
      if (onVoteComplete && data.survey) {
        onVoteComplete(data.survey)
      }

    } catch (err) {
      logError('[SURVEY] Vote submission failed:', err)
      setError('Abstimmung fehlgeschlagen. Bitte versuche es später erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          💡 Echte Daten von {localSurvey.totalParticipants.toLocaleString('de-DE')} Pferdebesitzern
        </h3>
        <p className="text-sm text-gray-600">
          Stand: {formatDate(localSurvey.lastUpdated)}
        </p>
      </div>

      {/* Question */}
      <p className={`text-gray-900 mb-4 ${compact ? 'text-base' : 'text-lg'} font-medium`}>
        {localSurvey.question}
      </p>

      {/* Description (optional) */}
      {localSurvey.description && (
        <p className="text-sm text-gray-600 mb-4 italic">
          {localSurvey.description}
        </p>
      )}

      {/* Step 1: Horse Ownership Question (only if voting is enabled and not answered yet) */}
      {allowVoting && ownsHorse === null && (
        <div className="mb-4 p-5 bg-white border-2 border-brand-brown-light rounded-lg">
          <p className="text-base text-gray-900 font-semibold mb-4">
            Besitzt du ein eigenes Pferd?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleOwnsHorseAnswer(true)}
              className="flex-1 px-5 py-3 bg-brand-brown text-white rounded-lg font-medium hover:bg-brand-brown-dark transition-colors"
            >
              Ja, ich habe ein Pferd
            </button>
            <button
              onClick={() => handleOwnsHorseAnswer(false)}
              className="flex-1 px-5 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Nein, noch nicht
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Interactive Voting (only shown if user owns a horse) */}
      {allowVoting && ownsHorse === true && !hasVoted && (
        <div className="space-y-3 mb-4">
          <p className="text-sm text-gray-700 font-medium mb-3">
            Stimme jetzt ab:
          </p>
          {localSurvey.results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleVote(result.range)}
              disabled={isSubmitting}
              className={`
                w-full text-left px-4 py-3 rounded-lg border-2
                transition-all duration-200
                ${isSubmitting
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                  : 'bg-white border-brand-brown-light hover:border-brand-brown hover:bg-brand-brown-light/20 cursor-pointer'
                }
              `}
            >
              <span className="text-gray-900 font-medium">{result.range}</span>
            </button>
          ))}
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>
      )}

      {/* Thank You Message after voting */}
      {allowVoting && hasVoted && ownsHorse === true && selectedOption && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            ✓ Danke für deine Stimme! Du hast für &ldquo;{selectedOption}&rdquo; gestimmt.
          </p>
        </div>
      )}

      {/* Message for non-horse owners */}
      {allowVoting && ownsHorse === false && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            ℹ️ Danke! Hier siehst du, was echte Pferdebesitzer zahlen:
          </p>
        </div>
      )}

      {/* Results - Bar Chart (shown after voting or in read-only mode) */}
      {showChart && (!allowVoting || hasVoted) && (
        <div className="space-y-3 mb-4">
          {localSurvey.results.map((result, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Range Label */}
              <div className={`${compact ? 'w-24 text-sm' : 'w-32 text-base'} text-gray-700 font-medium flex-shrink-0`}>
                {result.range}
                {allowVoting && hasVoted && selectedOption === result.range && (
                  <span className="ml-1 text-green-600">✓</span>
                )}
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
          <strong>Quelle:</strong> PferdeWert Community, {formatDate(localSurvey.lastUpdated)}
          {' '} • {localSurvey.totalParticipants.toLocaleString('de-DE')} Teilnehmer
        </p>
      </div>
    </div>
  )
}
