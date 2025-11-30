# Code-Review: Redirect-Loop Fix (Commit 4c1b363)

## Executive Summary

**Status:** ✅ **FIX KORREKT & VOLLSTÄNDIG**

Der Fix für den `ERR_TOO_MANY_REDIRECTS` Fehler ist korrekt implementiert. Die Änderung von `CANONICAL_DOMAINS.DE` von `'www.pferdewert.de'` auf `'pferdewert.de'` behebt das Problem vollständig.

---

## Root-Cause-Analyse

### Das Problema Verursachte
```
Vercel Dashboard:  www.pferdewert.de → pferdewert.de (308 Permanent)
Middleware (alt):  pferdewert.de → www.pferdewert.de (301 Move)
                   ↓
                   INFINITE REDIRECT LOOP → ERR_TOO_MANY_REDIRECTS
```

### Die Lösung
```typescript
// VOR (commit d4451ee)
const CANONICAL_DOMAINS = {
  AT: 'pferdewert.at',
  DE: 'www.pferdewert.de',  // ❌ Conflict mit Vercel 308
} as const;

// NACH (commit 4c1b363)
const CANONICAL_DOMAINS = {
  AT: 'pferdewert.at',
  DE: 'pferdewert.de',  // ✅ Matching mit Vercel 308
} as const;
```

**Warum funktioniert das:**
- Vercel leitet **immer** www → non-www (308 Permanent)
- Middleware soll zur **Canonical-Domain** umleiten
- Mit `pferdewert.de`: Request → Vercel → Middleware → non-www ✅
- Mit `www.pferdewert.de`: Request → Vercel → Middleware → www → Vercel → **LOOP** ❌

---

## Detaillierte Analyse der Änderungen

### 1. middleware.ts - ✅ CORRECT

**Änderung in Zeile 17-20:**
```typescript
const CANONICAL_DOMAINS = {
  AT: 'pferdewert.at',
  DE: 'pferdewert.de',  // ✅ FIX KORREKT
} as const;
```

**Logik (Zeilen 45-54):**
```typescript
if (domainConfig) {
  const canonicalHost = CANONICAL_DOMAINS[domainConfig.country as 'AT' | 'DE'];
  // Wenn Host nicht Canonical: redirect
  if (host !== canonicalHost) {
    const redirectUrl = `${protocol}//${canonicalHost}${pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }
}
```

**Ergebnis:**
- `www.pferdewert.de` != `pferdewert.de` → Redirect zu `pferdewert.de` ✅
- `pferdewert.de` === `pferdewert.de` → Kein Redirect ✅
- **Keine Endlosschleife mehr**

---

## Überprüfung der Domain-Referenzen im Codebase

### Hardcoded Canonical URLs in Pages

**Status: ✅ ALLE KORREKT**

```typescript
// /pages/ergebnis.tsx
<link rel="canonical" href="https://pferdewert.de/ergebnis" />  // ✅

// /pages/beispiel-analyse.tsx
canonicalUrl: "https://pferdewert.de/beispiel-analyse",  // ✅

// /pages/ueber-pferdewert.tsx
<link rel="canonical" href="https://pferdewert.de/ueber-pferdewert" />  // ✅

// /pages/agb.tsx, /pages/datenschutz.tsx, /pages/impressum.tsx
const { canonical } = useSEO();  // ✅ Dynamisch
```

### Ratgeber-spezifische URLs

**Status: ✅ KORREKT**

```typescript
// /lib/mongo/ratgeber-repository.ts (Zeile 17)
const SITE_URL = 'https://pferdewert.de';  // ✅ Non-www

// Zeile 95
canonical_url: `${SITE_URL}/pferde-ratgeber/${payload.slug}`,
// Generiert: https://pferdewert.de/pferde-ratgeber/slug ✅
```

### Hook-basierte SEO (useSEO)

**Status: ✅ KORREKT & CONSISTENT**

```typescript
// /hooks/useSEO.ts (Zeile 18-21)
const DOMAINS = {
  DE: 'https://pferdewert.de',   // ✅ Non-www
  AT: 'https://pferdewert.at',   // ✅
} as const;

// Zeile 94-98
const deUrl = `${DOMAINS.DE}${pathname}`;
const canonical = isAustria ? atUrl : deUrl;
// Generiert: https://pferdewert.de/... ✅
```

---

## CRITICAL FINDINGS: Domain Mismatches

### Issue 1: Sitemap enthält www URLs ⚠️

**Datei:** `/scripts/generate-sitemap.mjs` (Zeile 7-9)

```javascript
// AKTUELL (❌ FALSCH)
const DOMAINS = {
  DE: 'https://www.pferdewert.de',  // Mit www - aber Middleware leitet zu non-www!
  AT: 'https://pferdewert.at',
};
```

**Problem:**
- Sitemap enthält: `https://www.pferdewert.de/pferde-ratgeber/...`
- Canonical Tags enthalten: `https://pferdewert.de/pferde-ratgeber/...`
- Google sieht: "Sitemap URL" != "Canonical URL" = **Mismatch**
- Resultat: Potenziell doppelt indexierte URLs, GSC Warnung

**Lösung erforderlich:**
```javascript
const DOMAINS = {
  DE: 'https://pferdewert.de',  // Non-www wie Middleware erwartet
  AT: 'https://pferdewert.at',
};
```

### Issue 2: robots.txt API Fallback zeigt www URL ⚠️

**Datei:** `/pages/api/robots.ts` (Zeile 24)

```typescript
// AKTUELL (❌ FALSCH)
const domain = isAtDomain
  ? 'https://pferdewert.at'
  : 'https://www.pferdewert.de';  // Mit www!

// Fallback-robots.txt sagt:
// Sitemap: https://www.pferdewert.de/sitemap.xml  ❌
```

**Problem:** Falls `robots-de.txt` File nicht existiert, Fallback zeigt www-URL

**Lösung erforderlich:**
```typescript
const domain = isAtDomain
  ? 'https://pferdewert.at'
  : 'https://pferdewert.de';  // Non-www

// Fallback-robots.txt sagt:
// Sitemap: https://pferdewert.de/sitemap.xml  ✅
```

### Issue 3: Lighthouse Report (Informativ) ℹ️

**Datei:** `/frontend/lighthouse-after-redirect-fix.report.json`

Das Report zeigt:
```json
"finalUrl": "https://www.pferdewert.de/",  // Mit www
```

**Grund:** Report wurde erstellt, bevor der Fix deployed wurde
**Lösung:** Nach Deployment neues Lighthouse-Report generieren (wird dann non-www zeigen)

---

## SEO-Auswirkungen

### ✅ Was funktioniert korrekt

| Aspekt | Status | Details |
|--------|--------|---------|
| **Canonical URLs in Meta-Tags** | ✅ | Alle verwenden `https://pferdewert.de` |
| **useSEO Hook** | ✅ | Generiert korrekte non-www URLs |
| **hreflang Tags** | ✅ | Domain-basierte Struktur korrekt |
| **Structured Data (JSON-LD)** | ✅ | @id verwendet SITE_URL (non-www) |
| **Ratgeber canonical_url** | ✅ | Verwendet SITE_URL constant |
| **CANONICAL_DOMAINS.DE** | ✅ | Jetzt matching mit Vercel |

### ⚠️ Zu korrigieren

| Datei | Issue | Priorität |
|-------|-------|-----------|
| `/scripts/generate-sitemap.mjs` | Sitemap enthält www URLs | HIGH |
| `/pages/api/robots.ts` | Fallback zeigt www URL | MEDIUM |
| `/lighthouse-after-redirect-fix.report.json` | Veraltetes Report | LOW |

---

## Redirect-Flow nach dem Fix

### Scenario 1: User navigiert zu www.pferdewert.de

```
1. Browser: GET https://www.pferdewert.de/about
   ↓
2. Vercel CDN: 308 Permanent Redirect → https://pferdewert.de/about
   ↓
3. Middleware (next.js):
   - host = 'pferdewert.de'
   - canonicalHost = 'pferdewert.de' (CANONICAL_DOMAINS.DE)
   - host === canonicalHost ✅
   - KEIN zusätzlicher Redirect
   ↓
4. Server: Renders page with <link rel="canonical" href="https://pferdewert.de/about" />
   ↓
5. Response: HTTP 200 OK ✅
```

### Scenario 2: User navigiert zu pferdewert.de direkt

```
1. Browser: GET https://pferdewert.de/about
   ↓
2. Vercel: Kein Redirect nötig ✅
   ↓
3. Middleware: host === canonicalHost → Kein Redirect ✅
   ↓
4. Server: Renders page
   ↓
5. Response: HTTP 200 OK ✅
```

### Scenario 3: User navigiert zu pferdewert.at

```
1. Browser: GET https://pferdewert.at/about
   ↓
2. Vercel: AT domain, kein www-Redirect ✅
   ↓
3. Middleware:
   - host = 'pferdewert.at'
   - canonicalHost = 'pferdewert.at'
   - Kein Redirect ✅
   ↓
4. Server: Renders page
   ↓
5. Response: HTTP 200 OK ✅
```

---

## Verbleibende www-Referenzen im Codebase

```bash
Suche nach "www.pferdewert.de" im Frontend:

✅ middleware.ts (Zeile 11): DOMAIN_CONFIG (Input-Verarbeitung)
   - Notwendig, um www-Requests zu verarbeiten

✅ middleware.ts (Zeile 44): Kommentar
   - Dokumentation (kein Code-Impact)

❌ generate-sitemap.mjs (Zeile 8): MUSS GEÄNDERT WERDEN
   - Sitemap-Domain

❌ robots.ts (Zeile 24): MUSS GEÄNDERT WERDEN
   - Fallback-Domain

✅ lighthouse-after-redirect-fix.report.json: REPORT (nicht critical)
   - Report-Datei aus Vergangenheit
```

---

## Zusammenfassung & Empfehlungen

### ✅ Was ist KORREKT

1. **CANONICAL_DOMAINS.DE Fix** → Correct & solves redirect loop
2. **middleware.ts Logik** → Correct redirect logic
3. **Hardcoded Canonical URLs** → Alle non-www, correct
4. **useSEO Hook** → Generiert korrekte non-www URLs
5. **Ratgeber canonical_url** → Correct (uses SITE_URL)
6. **hreflang Tags** → Correct domain-based structure

### ❌ HIGH PRIORITY: Zu Korrigieren

**1. Sitemap Generator** → `/scripts/generate-sitemap.mjs` (Zeile 8)

```javascript
// VON:
const DOMAINS = { DE: 'https://www.pferdewert.de', AT: 'https://pferdewert.at' };

// ZU:
const DOMAINS = { DE: 'https://pferdewert.de', AT: 'https://pferdewert.at' };
```

**2. robots.txt Fallback** → `/pages/api/robots.ts` (Zeile 24)

```typescript
// VON:
const domain = isAtDomain ? 'https://pferdewert.at' : 'https://www.pferdewert.de';

// ZU:
const domain = isAtDomain ? 'https://pferdewert.at' : 'https://pferdewert.de';
```

---

## Deployment-Checklist

```
✅ 1. Middleware Fix deployed (commit 4c1b363)
⏳ 2. Sitemap regenerieren: npm run sitemap
⏳ 3. Fix robots.ts Fallback-Domain (Zeile 24)
⏳ 4. robots-de.xml & sitemap-de.xml neu generieren hochladen
⏳ 5. Google Search Console: robots.txt prüfen
⏳ 6. Lighthouse-Report neu generieren
⏳ 7. Monitoring: 3-7 Tage auf Redirect-Fehler prüfen
```

---

## Risk Assessment

| Risiko | Level | Status | Mitigation |
|--------|-------|--------|-----------|
| Redirect-Loop | ✅ FIXED | Behoben | Monitoring aktiv |
| Sitemap URL Mismatch | ⚠️ MEDIUM | Pending | Sitemap regenerieren |
| robots.txt Fallback | ⚠️ LOW | Pending | robots.ts fix |
| Duplicate Content | ℹ️ LOW | Risiko minimal | Canonical-URLs korrekt |
| GSC Warnings | ℹ️ INFO | Zu erwarten | Nach Sitemap-Fix weg |

---

## FAZIT

**Der Fix ist korrekt und behebt das Redirect-Loop-Problem vollständig.**

Die Middleware-Logik funktioniert jetzt korrekt mit Vercels www-Redirect, und die Canonical-Domains sind konsistent.

**Allerdings benötigen 2 weitere Dateien Updates für vollständige SEO-Konsistenz:**
1. **Critical:** `generate-sitemap.mjs` - Sitemap-Domain zu non-www ändern
2. **Important:** `robots.ts` - Fallback-Domain zu non-www ändern

Danach ist die Domain-Konfiguration vollständig konsistent und SEO-sicher.

---

**Review erstellt:** 2025-11-25
**Reviewer:** Claude Code (Haiku 4.5)
**Commit:** 4c1b363 - fix(i18n): Remove obsolete /at/ rewrites causing redirect loop
