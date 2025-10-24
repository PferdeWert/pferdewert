/**
 * MongoDB Connection Client
 * Implements connection pooling for serverless environments (Vercel)
 *
 * Pattern: Cache client and db instances across function invocations
 * to avoid creating new connections on every request
 */

import { MongoClient, Db } from 'mongodb';
import { info, error } from '@/lib/log';

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB; // Optional: falls back to database in connection string

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

// Cache connection across function invocations (serverless optimization)
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connect to MongoDB with connection pooling
 *
 * In serverless environments (Vercel), this function caches the connection
 * to avoid creating new connections on every request.
 *
 * @returns Promise resolving to object containing Db instance
 *
 * @example
 * ```typescript
 * const { db } = await connectToDatabase();
 * const collection = db.collection('ratgeber_articles');
 * ```
 */
export async function connectToDatabase(): Promise<{ db: Db }> {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    info('Using cached MongoDB connection');
    return { db: cachedDb };
  }

  try {
    info('Creating new MongoDB connection...');

    // Create new client
    const client = new MongoClient(MONGODB_URI, {
      // Connection pool settings for serverless
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 60000, // Close idle connections after 60s
    });

    // Connect to MongoDB
    await client.connect();

    // Get database (if MONGODB_DB not set, uses database from connection string)
    const db = client.db(MONGODB_DB || undefined);

    // Cache for reuse
    cachedClient = client;
    cachedDb = db;

    info('✅ MongoDB connection established');

    return { db };
  } catch (err) {
    error('❌ Failed to connect to MongoDB:', err);
    throw err;
  }
}

/**
 * Close MongoDB connection
 * Useful for cleanup in tests or graceful shutdown
 */
export async function closeConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    info('MongoDB connection closed');
  }
}
