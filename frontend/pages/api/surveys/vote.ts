import type { NextApiRequest, NextApiResponse } from 'next'
import { getCollection } from '@/lib/mongo'
import { Survey } from '@/types/surveys'
import { error as logError } from '@/lib/log'
import { monthlyCostsSurvey } from '@/data/surveys/monthly-costs'

/**
 * API Route: /api/surveys/vote
 *
 * Handles survey voting submissions with security measures:
 * - Input validation & sanitization (MongoDB injection prevention)
 * - Rate limiting via IP (60s cooldown)
 * - Duplicate vote prevention (24h window)
 * - Complete error handling
 *
 * Request Body:
 * {
 *   surveyId: string,  // e.g. "monthly-costs-2025-12"
 *   range: string      // e.g. "400-600€"
 * }
 *
 * Response:
 * {
 *   success: true,
 *   survey: Survey  // Complete updated survey object
 * }
 */

interface VoteRequest {
  surveyId: string
  range: string
}

interface VoteDocument {
  surveyId: string
  range: string
  timestamp: Date
  ip?: string
}

// In-memory rate limiting (use Redis in production for multi-server)
const recentVotes = new Map<string, number>()

// Valid ranges per survey (TODO: Move to survey-registry.ts later)
const VALID_RANGES: Record<string, string[]> = {
  'monthly-costs-2025-12': ['Unter 400€', '400-600€', '600-800€', 'Über 800€']
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { surveyId, range } = req.body as VoteRequest

    // 1. INPUT VALIDATION (MongoDB Injection Prevention)
    if (!surveyId || typeof surveyId !== 'string' || surveyId.length > 100) {
      return res.status(400).json({ error: 'Invalid surveyId' })
    }

    if (!range || typeof range !== 'string' || range.length > 50) {
      return res.status(400).json({ error: 'Invalid range' })
    }

    // 2. WHITELIST VALIDATION (Only allow known ranges)
    const validRanges = VALID_RANGES[surveyId]
    if (!validRanges || !validRanges.includes(range)) {
      return res.status(400).json({ error: 'Invalid range value' })
    }

    // 3. RATE LIMITING (60 second cooldown per IP)
    const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
    const rateLimitKey = `vote_${surveyId}_${ip}`
    const lastVoteTime = recentVotes.get(rateLimitKey)
    const now = Date.now()

    if (lastVoteTime && (now - lastVoteTime) < 60000) {
      return res.status(429).json({
        error: 'Zu viele Votes. Bitte warte 1 Minute.'
      })
    }

    recentVotes.set(rateLimitKey, now)

    // 4. MONGODB CONNECTION with Error Handling
    let votesCollection
    try {
      votesCollection = await getCollection<VoteDocument>('survey_votes')
    } catch (error) {
      logError('[SURVEY] MongoDB connection failed:', error)
      return res.status(503).json({
        error: 'Datenbankverbindung fehlgeschlagen. Bitte später erneut versuchen.'
      })
    }

    // 5. DUPLICATE CHECK (24h window per IP)
    const existingVote = await votesCollection.findOne({
      surveyId,
      ip,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    })

    if (existingVote) {
      return res.status(400).json({
        error: 'Du hast bereits für diese Umfrage gestimmt.'
      })
    }

    // 6. STORE VOTE
    const vote: VoteDocument = {
      surveyId,
      range,
      timestamp: new Date(),
      ip
    }

    await votesCollection.insertOne(vote)

    // 7. CALCULATE UPDATED RESULTS (Instagram + Website combined)
    const allWebsiteVotes = await votesCollection
      .find({ surveyId })
      .toArray()

    // Get Instagram baseline (static data from last Instagram update)
    const instagramBaseline = monthlyCostsSurvey.instagramBaseline ?? {
      totalVotes: 0,
      byRange: {} as Record<string, number>
    }

    // Combine Instagram baseline + Website votes
    const websiteVotesByRange = allWebsiteVotes.reduce((acc: Record<string, number>, vote: VoteDocument) => {
      acc[vote.range] = (acc[vote.range] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalCombined = instagramBaseline.totalVotes + allWebsiteVotes.length

    // 8. CREATE COMPLETE UPDATED SURVEY OBJECT
    const updatedResults = validRanges.map(rangeKey => {
      const instagramCount = instagramBaseline.byRange[rangeKey] || 0
      const websiteCount = websiteVotesByRange[rangeKey] || 0
      const combinedCount = instagramCount + websiteCount

      return {
        range: rangeKey,
        count: combinedCount,
        percentage: totalCombined > 0
          ? Math.round((combinedCount / totalCombined) * 100)
          : 0
      }
    })

    const updatedSurvey: Survey = {
      ...monthlyCostsSurvey, // Base survey data (question, platform, category, etc.)
      platform: allWebsiteVotes.length > 0 ? 'multi' : 'instagram',
      totalParticipants: totalCombined,
      results: updatedResults,
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    return res.status(200).json({
      success: true,
      survey: updatedSurvey,
      message: 'Vote recorded successfully'
    })

  } catch (error) {
    logError('[SURVEY] Vote API error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
