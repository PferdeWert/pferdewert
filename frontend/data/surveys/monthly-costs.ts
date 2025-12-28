import { Survey } from '@/types/surveys'

/**
 * Monatliche Pferdehaltungskosten - Community Umfrage
 *
 * Frage: "Wie viel zahlt ihr monatlich für euer Pferd?"
 * Quelle: PferdeWert Community Umfrage
 *
 * Update-Prozess:
 * 1. Community-Umfrage durchführen (1. des Monats)
 * 2. Nach 24h Ergebnisse sammeln
 * 3. totalParticipants KUMULATIV erhöhen (alle Monate zusammen)
 * 4. results aktualisieren mit neuen Prozenten
 * 5. lastUpdated auf aktuelles Datum
 * 6. Git commit: "feat(surveys): Update monthly costs survey (Monat YYYY - XXX participants)"
 */

export const monthlyCostsSurvey: Survey = {
  id: 'monthly-costs-2025-12',
  lastUpdated: '2025-12-28',
  totalParticipants: 43,
  question: 'Wie viel zahlt ihr monatlich für euer Pferd?',
  description: 'Umfrage in unserer Community unter aktiven Pferdebesitzern',
  platform: 'instagram',
  category: 'costs',
  results: [
    {
      range: 'Unter 400€',
      percentage: 23,
      count: 10
    },
    {
      range: '400-600€',
      percentage: 40,
      count: 17
    },
    {
      range: '600-800€',
      percentage: 7,
      count: 3
    },
    {
      range: 'Über 800€',
      percentage: 30,
      count: 13
    },
  ],

  /**
   * Instagram Baseline für Delta-Berechnung
   * Bei nächstem Instagram-Update:
   * 1. Neue Insta-Zahlen minus diese Baseline = Insta-Delta
   * 2. Website-Votes aus MongoDB addieren
   * 3. Neue Baseline setzen
   */
  instagramBaseline: {
    date: '2025-12-28',
    totalVotes: 43,
    byRange: {
      'Unter 400€': 10,
      '400-600€': 17,
      '600-800€': 3,
      'Über 800€': 13
    }
  }
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
