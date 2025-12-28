import { Survey } from '@/types/surveys'

/**
 * Monatliche Pferdehaltungskosten - Community Umfrage
 *
 * Frage: "Wie viel zahlt ihr monatlich für euer Pferd?"
 * Quelle: PferdeWert Community Umfrage (Instagram + Website)
 *
 * ══════════════════════════════════════════════════════════════
 * UPDATE-PROZESS (Instagram-Daten aktualisieren)
 * ══════════════════════════════════════════════════════════════
 *
 * 1. ZUERST Website-Votes prüfen:
 *    npx tsx scripts/check-survey-votes.ts
 *
 *    → Falls Website-Votes existieren: Diese notieren!
 *      Sie werden beim Update NICHT überschrieben (separate MongoDB Collection),
 *      aber du solltest wissen, wie viele es sind.
 *
 * 2. Instagram-Ergebnisse ablesen:
 *    - Stimmen pro Option zählen (NICHT Views!)
 *    - Beispiel: 10 + 17 + 3 + 13 = 43 Teilnehmer
 *
 * 3. NUR instagramBaseline aktualisieren:
 *    - totalVotes = Summe aller Instagram-Stimmen
 *    - byRange = Stimmen pro Range
 *    - date = aktuelles Datum
 *
 * 4. results + totalParticipants aktualisieren:
 *    - Diese spiegeln die Instagram-Daten wider
 *    - Website-Votes werden bei Anzeige automatisch addiert (siehe vote.ts)
 *
 * 5. Git commit:
 *    "feat(surveys): Update monthly costs survey (Monat YYYY - XX participants)"
 *
 * ══════════════════════════════════════════════════════════════
 * ARCHITEKTUR
 * ══════════════════════════════════════════════════════════════
 *
 * Instagram-Daten: instagramBaseline (statisch in diesem File)
 * Website-Votes:   MongoDB Collection "survey_votes" (dynamisch)
 * Anzeige:         Kombiniert beides automatisch (siehe /api/surveys/vote.ts)
 *
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
