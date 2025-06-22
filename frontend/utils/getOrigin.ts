import { NextApiRequest } from "next";

export function getOrigin(req: NextApiRequest): string {
  // 1. ENV-Variable nutzen, am zuverlässigsten für PROD/DEV
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // 2. Origin aus Header (nur bei Browser-Requests gesetzt)
  if (req.headers.origin) {
    return req.headers.origin;
  }

  // 3. Host aus Header + dynamisches Protokoll (http/https)
  if (req.headers.host) {
    // HTTPS annehmen, außer du möchtest HTTP explizit forcieren
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    return `${protocol}://${req.headers.host}`;
  }

  // 4. Fallback, falls alles andere fehlt
  return "http://localhost:3000";
}
