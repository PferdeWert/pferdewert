# DataForSEO Direct API Setup

## 1. Environment Variables

**WICHTIG:** Auth-Daten in `.env.local` und `.env.production.template` eintragen!

### Setup:

**Get credentials:** https://app.dataforseo.com/api-dashboard

**Add to `frontend/.env.local`:**
```bash
DATAFORSEO_LOGIN=your_email@example.com
DATAFORSEO_PASSWORD=your_api_password
```

**Add to `frontend/.env.production.template`:**
```bash
DATAFORSEO_LOGIN=your_email@example.com
DATAFORSEO_PASSWORD=your_api_password
```

### Wie die Auth funktioniert:

```typescript
// lib/dataforseo.ts verwendet automatisch die .env Variablen:

export function getDataForSEOClient(): DataForSEOClient {
  const login = process.env.DATAFORSEO_LOGIN;     // ← aus .env.local
  const password = process.env.DATAFORSEO_PASSWORD; // ← aus .env.local

  if (!login || !password) {
    throw new Error('DataForSEO credentials not configured');
  }

  // Basic Auth Header wird automatisch generiert:
  // Authorization: Basic base64(login:password)
  return new DataForSEOClient({ login, password });
}
```

### Wichtige Hinweise:

- ✓ `.env.local` für Development (localhost)
- ✓ `.env.production.template` für Production (Vercel deployment)
- ✓ Beide Files sind in `.gitignore` (werden NICHT committed)
- ✗ **NIEMALS** echte API-Keys in Code oder Docs committen!

## 2. Usage Examples

### Complete SEO Research
```typescript
// Get everything at once
const response = await fetch('/api/seo/research?keyword=pferd+kaufen');
const data = await response.json();

console.log(data.data.keywordData);      // Search volume, CPC, competition
console.log(data.data.suggestions);      // Keyword suggestions
console.log(data.data.serpResults);      // Top 100 SERP results
console.log(data.data.relatedKeywords);  // Related keywords
console.log(data.data.competitors);      // Competitor domains
console.log(data.data.trends);           // Historical search volume
```

### Keyword Research
```typescript
const response = await fetch('/api/seo/keywords', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keyword: 'pferd kaufen',
    includeRelated: true
  })
});

const data = await response.json();
console.log(data.keywordData);        // Volume, CPC, competition
console.log(data.suggestions);        // Keyword suggestions
console.log(data.relatedKeywords);    // Related keywords
```

### SERP Analysis
```typescript
const response = await fetch('/api/seo/serp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ keyword: 'pferd kaufen' })
});

const data = await response.json();
console.log(data.results[0].items);  // Top 100 organic results
```

### Competitor Analysis
```typescript
// By keyword
const response = await fetch('/api/seo/competitors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ keyword: 'pferd kaufen' })
});

// By domain
const response = await fetch('/api/seo/competitors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ domain: 'ehorses.de' })
});

const data = await response.json();
console.log(data.keywordCompetitors);  // Competing domains
console.log(data.backlinks);           // Backlink profile
console.log(data.domainMetrics);       // Domain authority, etc.
```

## 3. Direct Client Usage (Backend)

```typescript
import { getDataForSEOClient } from '@/lib/dataforseo';

const client = getDataForSEOClient();

// Single keyword
const keywordData = await client.getKeywordData('pferd kaufen');

// Bulk keywords
const bulkData = await client.getBulkKeywordData([
  'pferd kaufen',
  'pferd verkaufen',
  'pferdewert'
]);

// Get everything
const [volume, suggestions, serp, competitors] = await Promise.all([
  client.getKeywordData('pferd kaufen'),
  client.getKeywordSuggestions('pferd kaufen'),
  client.getSERPResults('pferd kaufen'),
  client.getCompetitors('pferd kaufen')
]);
```

## 4. Available Features

### Keywords
- ✅ Search volume, CPC, competition
- ✅ Keyword suggestions (100+)
- ✅ Related keywords (100+)
- ✅ Keyword difficulty
- ✅ Historical trends
- ✅ Bulk keyword data

### SERP
- ✅ Top 100 organic results
- ✅ Featured snippets
- ✅ People also ask
- ✅ Related searches
- ✅ Competitor rankings

### Competitors
- ✅ Competing domains
- ✅ Backlink analysis
- ✅ Domain authority
- ✅ Domain metrics

### On-Page
- ✅ Page content analysis
- ✅ Technical SEO checks

## 5. Cost Optimization

DataForSEO charges per task. Optimize costs:

1. **Use bulk endpoints** when possible:
   ```typescript
   // ❌ Expensive (5 tasks = $0.05)
   for (const kw of keywords) {
     await client.getKeywordData(kw);
   }

   // ✅ Cheap (1 task = $0.01)
   await client.getBulkKeywordData(keywords);
   ```

2. **Cache results** in MongoDB:
   ```typescript
   // Check cache first
   const cached = await db.collection('seo_cache').findOne({ keyword });
   if (cached && Date.now() - cached.timestamp < 86400000) {
     return cached.data;
   }

   // Fetch from API
   const data = await client.getKeywordData(keyword);

   // Cache result
   await db.collection('seo_cache').updateOne(
     { keyword },
     { $set: { data, timestamp: Date.now() } },
     { upsert: true }
   );
   ```

3. **Use parallel requests** for independent data:
   ```typescript
   // All requests run simultaneously
   const [vol, serp, comp] = await Promise.all([
     client.getKeywordData(kw),
     client.getSERPResults(kw),
     client.getCompetitors(kw)
   ]);
   ```

## 6. Location Codes

Common German locations:
- `2276` - Germany (default)
- `1001127` - Berlin
- `1001168` - Munich
- `1001098` - Hamburg

## 7. API Documentation

Full docs: https://docs.dataforseo.com/v3/

## 8. Testing

```bash
# Test API connection
curl -X POST https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live \
  -H "Authorization: Basic $(echo -n 'login:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '[{"keywords":["pferd kaufen"],"location_code":2276,"language_code":"de"}]'
```