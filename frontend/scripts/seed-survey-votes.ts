/**
 * Seed Survey Votes - Dummy Data Generator
 *
 * Füllt MongoDB mit Dummy-Votes basierend auf den Daten aus monthly-costs.ts
 * Damit beim ersten echten Vote nicht "1 Teilnehmer" angezeigt wird.
 *
 * Usage:
 * npx tsx scripts/seed-survey-votes.ts
 *
 * WICHTIG: Nur für Development! In Production echte Instagram-Daten verwenden.
 */

// Load environment variables from .env.local
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(__dirname, '../.env.local') })

import { getCollection } from '../lib/mongo'
import { monthlyCostsSurvey } from '../data/surveys/monthly-costs'

interface VoteDocument {
  surveyId: string
  range: string
  timestamp: Date
  ip?: string
}

async function seedSurveyVotes() {
  console.log('🌱 Seeding survey votes...')

  try {
    const votesCollection = await getCollection<VoteDocument>('survey_votes')

    // 1. Prüfen ob bereits Votes existieren
    const existingVotes = await votesCollection.countDocuments({
      surveyId: monthlyCostsSurvey.id
    })

    if (existingVotes > 0) {
      console.log(`⚠️  Warnung: ${existingVotes} Votes bereits vorhanden für ${monthlyCostsSurvey.id}`)
      console.log('Möchtest du diese überschreiben? (Y/n)')

      // In einem echten Script würde man hier auf User-Input warten
      // Für jetzt: Abbrechen wenn Votes existieren
      console.log('❌ Abgebrochen. Lösche zuerst existierende Votes:')
      console.log(`   db.survey_votes.deleteMany({ surveyId: "${monthlyCostsSurvey.id}" })`)
      return
    }

    // 2. Dummy-Votes basierend auf monthly-costs.ts generieren
    const dummyVotes: VoteDocument[] = []
    const baseTimestamp = new Date('2025-12-01') // Startdatum

    monthlyCostsSurvey.results.forEach((result, rangeIndex) => {
      for (let i = 0; i < result.count; i++) {
        // Zeitstempel verteilen über 25 Tage (1.-25. Dezember)
        const dayOffset = Math.floor((i / result.count) * 25)
        const timestamp = new Date(baseTimestamp)
        timestamp.setDate(timestamp.getDate() + dayOffset)
        timestamp.setHours(Math.floor(Math.random() * 24))
        timestamp.setMinutes(Math.floor(Math.random() * 60))

        dummyVotes.push({
          surveyId: monthlyCostsSurvey.id,
          range: result.range,
          timestamp: timestamp,
          ip: `dummy-${rangeIndex}-${i}.local` // Fake IPs
        })
      }
    })

    // 3. In MongoDB einfügen
    console.log(`📊 Generiere ${dummyVotes.length} Dummy-Votes...`)
    await votesCollection.insertMany(dummyVotes)

    // 4. Verifizierung
    const insertedCount = await votesCollection.countDocuments({
      surveyId: monthlyCostsSurvey.id
    })

    console.log(`✅ Erfolgreich! ${insertedCount} Votes eingefügt.`)
    console.log('\nVerteilung:')

    for (const result of monthlyCostsSurvey.results) {
      const count = await votesCollection.countDocuments({
        surveyId: monthlyCostsSurvey.id,
        range: result.range
      })
      console.log(`   ${result.range}: ${count} (${result.percentage}%)`)
    }

  } catch (error) {
    console.error('❌ Fehler beim Seeding:', error)
    throw error
  }
}

// Script ausführen
seedSurveyVotes()
  .then(() => {
    console.log('\n✨ Seeding abgeschlossen!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seeding fehlgeschlagen:', error)
    process.exit(1)
  })
