import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.log('Keine MONGODB_URI gefunden')
    return
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db('pferdewert')
    const votes = await db.collection('survey_votes').find({}).toArray()

    console.log('Website-Votes gefunden:', votes.length)

    if (votes.length > 0) {
      const byRange: Record<string, number> = {}
      votes.forEach((v) => {
        byRange[v.range] = (byRange[v.range] || 0) + 1
      })
      console.log('Nach Range:', byRange)
    } else {
      console.log('Keine Website-Votes vorhanden - nur Instagram-Daten aktiv.')
    }
  } finally {
    await client.close()
  }
}

main().catch(console.error)
