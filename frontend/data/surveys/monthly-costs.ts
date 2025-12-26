import { Survey } from '@/types/surveys'

/**
 * Monatliche Pferdehaltungskosten - Instagram Community Umfrage
 *
 * Frage: "Wie viel zahlt ihr monatlich für euer Pferd?"
 * Quelle: Instagram Story Umfrage @pferdewert.de
 *
 * Update-Prozess:
 * 1. Instagram-Umfrage durchführen (1. des Monats)
 * 2. Nach 24h Ergebnisse sammeln
 * 3. totalParticipants KUMULATIV erhöhen (alle Monate zusammen)
 * 4. results aktualisieren mit neuen Prozenten
 * 5. lastUpdated auf aktuelles Datum
 * 6. Git commit: "feat(surveys): Update monthly costs survey (Monat YYYY - XXX participants)"
 */

export const monthlyCostsSurvey: Survey = {
  id: 'monthly-costs-2025-12',
  lastUpdated: '2025-12-26',
  totalParticipants: 523,
  question: 'Wie viel zahlt ihr monatlich für euer Pferd?',
  description: 'Umfrage in unserer Instagram-Community unter aktiven Pferdebesitzern',
  platform: 'instagram',
  category: 'costs',
  results: [
    {
      range: '300-400€',
      percentage: 18,
      count: 94
    },
    {
      range: '400-600€',
      percentage: 38,
      count: 199
    },
    {
      range: '600-800€',
      percentage: 29,
      count: 152
    },
    {
      range: '800€+',
      percentage: 15,
      count: 78
    },
  ]
}

// Beispiel für weitere Umfragen (später):

/*
export const monthlyCostsSurveyNovember: Survey = {
  id: 'monthly-costs-2025-11',
  lastUpdated: '2025-11-30',
  totalParticipants: 412,
  question: 'Wie viel zahlt ihr monatlich für euer Pferd?',
  platform: 'instagram',
  category: 'costs',
  results: [
    { range: '300-400€', percentage: 20, count: 82 },
    { range: '400-600€', percentage: 35, count: 144 },
    { range: '600-800€', percentage: 30, count: 124 },
    { range: '800€+', percentage: 15, count: 62 },
  ]
}
*/
