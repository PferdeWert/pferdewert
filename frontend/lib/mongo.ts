import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Bitte setze MONGODB_URI in deiner .env.local Datei");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let lastHealthCheck = 0;
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

async function isConnectionHealthy(): Promise<boolean> {
  const now = Date.now();
  
  // Skip health check if recently verified
  if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL && cachedClient && cachedDb) {
    return true;
  }
  
  try {
    if (!cachedClient || !cachedDb) return false;
    
    // Simple ping to verify connection
    await cachedDb.admin().ping();
    lastHealthCheck = now;
    return true;
  } catch (err) {
    console.warn("❌ MongoDB health check failed:", err);
    // Reset cached connections
    cachedClient = null;
    cachedDb = null;
    lastHealthCheck = 0;
    return false;
  }
}

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  
  // Check if existing connection is healthy
  if (await isConnectionHealthy()) {
    return cachedDb!.collection<T>(collectionName);
  }

  try {
    console.log("🔄 Creating new MongoDB connection...");
    
    const client = new MongoClient(uri as string, {
      maxPoolSize: 5, // Limit connection pool size for serverless
      serverSelectionTimeoutMS: 5000, // 5s timeout for connection
      socketTimeoutMS: 45000, // 45s socket timeout (under Vercel 10min limit)
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      connectTimeoutMS: 10000, // 10s connection timeout
    });
    
    await client.connect();
    const db = client.db(); // Uses default database from connection string

    // Verify connection with a ping
    await db.admin().ping();
    
    cachedClient = client;
    cachedDb = db;
    lastHealthCheck = Date.now();
    
    console.log("✅ MongoDB connection established successfully");
    return db.collection<T>(collectionName);
    
  } catch (err) {
    console.error("❌ Fehler bei MongoDB Verbindung:", err);
    
    // Clean up any partial connections
    cachedClient = null;
    cachedDb = null;
    lastHealthCheck = 0;
    
    throw new Error(`MongoDB connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
