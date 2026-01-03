import type { NextApiRequest, NextApiResponse } from 'next'
import { getCollection } from '@/lib/mongo'
import { monthlyCostsSurvey } from '@/data/surveys/monthly-costs'
import { error as logError, info } from '@/lib/log'

/**
 * API Route: /api/surveys/seed-votes
 *
 * Seeds MongoDB with dummy votes based on monthly-costs.ts data
 * So that first real vote doesn't show "1 participant"
 *
 * ⚠️ DEVELOPMENT ONLY! Delete this endpoint before production!
 *
 * Usage:
 * curl -X POST http://localhost:3000/api/surveys/seed-votes
 */

interface VoteDocument {
  surveyId: string
  range: string
  timestamp: Date
  ip?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Query param: ?reset=true to delete existing votes
    const resetExisting = req.query.reset === 'true'

    info('🌱 Seeding survey votes...')

    const votesCollection = await getCollection<VoteDocument>('survey_votes')

    // 1. Check if votes already exist
    const existingVotes = await votesCollection.countDocuments({
      surveyId: monthlyCostsSurvey.id
    })

    if (existingVotes > 0) {
      if (resetExisting) {
        info(`🗑️  Deleting ${existingVotes} existing votes...`)
        await votesCollection.deleteMany({
          surveyId: monthlyCostsSurvey.id
        })
      } else {
        return res.status(400).json({
          error: `${existingVotes} votes already exist for ${monthlyCostsSurvey.id}`,
          hint: 'Use ?reset=true to delete existing votes first'
        })
      }
    }

    // 2. Generate dummy votes based on monthly-costs.ts
    const dummyVotes: VoteDocument[] = []
    const baseTimestamp = new Date('2025-12-01') // Start date

    monthlyCostsSurvey.results.forEach((result, rangeIndex) => {
      for (let i = 0; i < result.count; i++) {
        // Distribute timestamps over 25 days (Dec 1-25)
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

    // 3. Insert into MongoDB
    info(`📊 Inserting ${dummyVotes.length} dummy votes...`)
    await votesCollection.insertMany(dummyVotes)

    // 4. Verification
    const insertedCount = await votesCollection.countDocuments({
      surveyId: monthlyCostsSurvey.id
    })

    // Get distribution
    const distribution = await Promise.all(
      monthlyCostsSurvey.results.map(async (result) => {
        const count = await votesCollection.countDocuments({
          surveyId: monthlyCostsSurvey.id,
          range: result.range
        })
        return {
          range: result.range,
          count,
          percentage: result.percentage
        }
      })
    )

    info(`✅ Successfully seeded ${insertedCount} votes!`)

    return res.status(200).json({
      success: true,
      message: `Seeded ${insertedCount} dummy votes`,
      distribution
    })

  } catch (err) {
    logError('[SURVEY SEED] Error:', err)
    return res.status(500).json({
      error: 'Seeding failed',
      message: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
