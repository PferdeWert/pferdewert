// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import Stripe from "stripe";
import { info, error } from "@/lib/log";

interface HealthCheck {
  healthy: boolean;
  checks: {
    database: boolean;
    stripe: boolean;
    environment: boolean;
    backend?: boolean;
  };
  timestamp: string;
  version?: string;
}

/**
 * Check database connectivity
 */
async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const collection = await getCollection("bewertungen");
    // Simple ping test - try to count documents (limit 1 for performance)
    await collection.countDocuments({}, { limit: 1 });
    return true;
  } catch (err) {
    error("[HEALTH] Database check failed:", err);
    return false;
  }
}

/**
 * Check Stripe API connectivity
 */
async function checkStripeConnection(): Promise<boolean> {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return false;
    }
    
    const stripe = new Stripe(stripeKey);
    // Simple API test - retrieve account info
    await stripe.accounts.retrieve();
    return true;
  } catch (err) {
    error("[HEALTH] Stripe check failed:", err);
    return false;
  }
}

/**
 * Check required environment variables
 */
function checkEnvironmentVariables(): boolean {
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID_BASIC', 
    'STRIPE_PRICE_ID_PRO',
    'STRIPE_PRICE_ID_PREMIUM',
    'STRIPE_WEBHOOK_SECRET',
    'MONGODB_URI'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    error("[HEALTH] Missing environment variables:", missing);
    return false;
  }
  
  return true;
}

/**
 * Optional: Check backend API connectivity
 */
async function checkBackendConnection(): Promise<boolean> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return false;
    }
    
    // Use AbortController for timeout functionality
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (err) {
    error("[HEALTH] Backend check failed:", err);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthCheck>) {
  info("[HEALTH] Health check requested");
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      healthy: false,
      checks: {
        database: false,
        stripe: false,
        environment: false,
      },
      timestamp: new Date().toISOString(),
    });
  }
  
  try {
    // Run all health checks in parallel for faster response
    const [databaseOk, stripeOk, envOk, backendOk] = await Promise.all([
      checkDatabaseConnection(),
      checkStripeConnection(),
      checkEnvironmentVariables(),
      checkBackendConnection(),
    ]);
    
    const checks = {
      database: databaseOk,
      stripe: stripeOk,
      environment: envOk,
      backend: backendOk,
    };
    
    // System is healthy if critical checks pass (backend is optional)
    const healthy = databaseOk && stripeOk && envOk;
    
    const response: HealthCheck = {
      healthy,
      checks,
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
    };
    
    const statusCode = healthy ? 200 : 503;
    
    info(`[HEALTH] Health check completed:`, {
      healthy,
      statusCode,
      checks,
    });
    
    return res.status(statusCode).json(response);
  } catch (err) {
    error("[HEALTH] Health check failed:", err);
    
    return res.status(503).json({
      healthy: false,
      checks: {
        database: false,
        stripe: false,
        environment: false,
      },
      timestamp: new Date().toISOString(),
    });
  }
}