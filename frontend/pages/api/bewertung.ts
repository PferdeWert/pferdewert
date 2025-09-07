// pages/api/bewertung.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { info, warn, error } from "@/lib/log";

const querySchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Ungültige ObjectId",
  }),
  token: z.string().min(16).max(128).optional(),
});

// Simplified rate limiting - more permissive for loading issues
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

// In-memory cache for frequently accessed bewertungen (5 minute TTL)
interface BewertungResponse {
  bewertung: string;
  tier?: string;
}

// Database document shape for bewertung collection
interface BewertungDocument {
  _id: ObjectId;
  bewertung?: string;
  status?: string;
  readToken?: string;
  current_tier?: string;
  purchased_tier?: string;
  [key: string]: unknown;
}

const bewertungCache = new Map<string, { data: BewertungResponse; expiry: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedBewertung(id: string): BewertungResponse | null {
  const cached = bewertungCache.get(id);
  if (cached && Date.now() < cached.expiry) {
    info(`[BEWERTUNG] ✅ Cache hit for ID: ${id}`);
    return cached.data;
  }
  
  if (cached) {
    bewertungCache.delete(id); // Remove expired entry
  }
  return null;
}

function setCachedBewertung(id: string, data: BewertungResponse): void {
  bewertungCache.set(id, {
    data,
    expiry: Date.now() + CACHE_TTL
  });
  
  // Cleanup old entries (simple LRU simulation)
  if (bewertungCache.size > 100) {
    const oldestKey = bewertungCache.keys().next().value;
    if (oldestKey) {
      bewertungCache.delete(oldestKey);
    }
  }
}

function checkRateLimit(ip: string, isDirect: boolean = false): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  
  // MUCH more permissive limits to avoid blocking legitimate requests
  const maxRequests = isDirect ? 200 : 120; // Doubled limits
  
  const clientData = rateLimiter.get(ip);
  
  if (!clientData || now > clientData.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (clientData.count >= maxRequests) {
    const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  clientData.count++;
  return { allowed: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientIP = req.headers['x-forwarded-for'] as string || 
                   req.headers['x-real-ip'] as string || 
                   req.socket?.remoteAddress || 'unknown';
  
  // Detect same-origin requests vs direct access (from email links)
  const refererRaw = req.headers.referer || req.headers.referrer;
  const referer = Array.isArray(refererRaw) ? refererRaw[0] : refererRaw;
  const userAgent = req.headers['user-agent'] || '';
  
  // Get current request host (handles Vercel previews)
  const requestHost = (req.headers['x-forwarded-host'] as string) || 
                      (req.headers.host as string) || 
                      'unknown';
  
  // Parse referer host for comparison
  let refererHost = 'none';
  let isSameOrigin = false;
  
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      refererHost = refererUrl.hostname;
      isSameOrigin = refererHost === requestHost;
    } catch {
      refererHost = 'invalid';
    }
  }
  
  // Consider it direct access ONLY if:
  // 1. No referer (direct email link click)
  // 2. Different host (external referer) 
  // 3. User agent suggests email client
  const isDirect = !referer || 
                   !isSameOrigin || 
                   userAgent.includes('Mail') || 
                   userAgent.includes('Outlook');
  
  const rateLimitCheck = checkRateLimit(clientIP, isDirect);
  if (!rateLimitCheck.allowed) {
    warn(`[BEWERTUNG] Rate limit exceeded for IP: ${clientIP} (direct: ${isDirect})`);
    res.setHeader('Retry-After', rateLimitCheck.retryAfter!);
    return res.status(429).json({ 
      error: "Too many requests", 
      retryAfter: rateLimitCheck.retryAfter 
    });
  }
  
  info("[BEWERTUNG] Request received for ID:", req.query.id, {
    clientIP,
    requestHost,
    refererHost,
    isSameOrigin,
    isDirect,
    referer,
    userAgent: userAgent.substring(0, 100) // First 100 chars to avoid log overflow
  });
  
  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    warn("[BEWERTUNG] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Missing or invalid id", details: parse.error.flatten() });
  }

  const { id, token } = parse.data;

  // Simplified ID validation - let MongoDB validate the ObjectId
  if (!ObjectId.isValid(id)) {
    warn("[BEWERTUNG] ❌ Invalid ObjectId format:", id);
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const idString = id.toString();

  try {
    // Check cache first
    const cachedResult = getCachedBewertung(idString);
    if (cachedResult) {
      return res.status(200).json(cachedResult);
    }
    
    info("[BEWERTUNG] Searching MongoDB for ID:", idString);
    const collection = await getCollection("bewertungen");
    const result = await collection.findOne({ _id: new ObjectId(idString) }) as BewertungDocument | null;

    info("[BEWERTUNG] MongoDB result:", {
      found: !!result,
      hasFields: result ? Object.keys(result) : [],
      hasBewertung: !!(result?.bewertung),
      bewertungLength: result?.bewertung ? result.bewertung.length : 0,
      status: result?.status
    });

    if (!result) {
      warn("[BEWERTUNG] ❌ Document not found for ID:", idString);
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    // Security: If document has a readToken (new docs), require matching token on direct access
    const requiresToken = Boolean(result?.readToken);
    if (isDirect && requiresToken) {
      if (!token || token !== result.readToken) {
        warn("[BEWERTUNG] ❌ Invalid or missing read token for direct access", { id: idString });
        return res.status(403).json({ error: "Zugriff verweigert" });
      }
    }

    if (!result.bewertung) {
      info("[BEWERTUNG] ⏳ Document found but bewertung field is empty/null");
      return res.status(404).json({ 
        error: "Bewertung wird noch erstellt", 
        status: result.status || "unknown",
        found: true,
        processing: true
      });
    }

    info("[BEWERTUNG] ✅ Successfully returning bewertung");
    const tier = result?.current_tier || result?.purchased_tier || undefined;
    const response: BewertungResponse = tier 
      ? { bewertung: result.bewertung, tier }
      : { bewertung: result.bewertung };
    
    // Cache successful result
    setCachedBewertung(idString, response);
    
    return res.status(200).json(response);
  } catch (err) {
    error("[BEWERTUNG] ❌ Fehler beim Laden der Bewertung:", err);
    return res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}
