# PRD: AI-Bewertung Architektur-Umstellung

**Projekt:** PferdeWert.de
**Datum:** 2025-01-27
**Version:** 1.0
**Status:** Draft

## Übersicht

### Problem Statement
Die aktuelle AI-Bewertungslogik erfolgt **nach** der Stripe-Zahlung im Webhook, was zu längeren Wartezeiten für Kunden nach dem Bezahlvorgang führt. Bei AI-Fehlern oder Backend-Problemen haben Kunden bereits bezahlt, erhalten aber keine Bewertung.

### Zielsetzung
Umstellung der AI-Bewertung von "Post-Payment" zu "Pre-Payment" - die Bewertung soll **vor** der Stripe-Weiterleitung erstellt werden, um eine bessere User Experience und robustere Fehlerbehandlung zu ermöglichen.

---

## Aktuelle Architektur (IST-Zustand)

### Datenfluss
```
1. Formular (Frontend)
   ↓
2. /api/checkout.ts
   → Speichert Pferddaten in MongoDB (status: "offen")
   → Erstellt Stripe Session
   ↓
3. Stripe Checkout (Payment)
   ↓
4. /api/webhook.ts
   → Empfängt Stripe-Bestätigung
   → Ruft Backend AI-API auf (/api/bewertung)
   → Speichert Bewertung in MongoDB (status: "fertig")
   ↓
5. Frontend zeigt Bewertung an
```

### Betroffene Dateien & Code-Stellen

#### 1. `/frontend/pages/api/checkout.ts`
- **Zeile 119-125**: Initial-Speicherung ohne AI-Bewertung
```typescript
await collection.insertOne({
  _id: bewertungId,
  ...bewertungData,
  status: "offen",           // ← Status "offen"
  stripeSessionId: session.id,
  erstellt: new Date(),
});
```

#### 2. `/frontend/pages/api/webhook.ts`
- **Zeile 259-263**: AI-API Aufruf nach Stripe-Bestätigung
```typescript
const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(bewertbareDaten),
});
```
- **Zeile 290-305**: MongoDB Update mit AI-Response

#### 3. `/backend/main.py`
- **Zeile 462-485**: `/api/bewertung` Endpoint
- **Zeile 298-457**: `ai_valuation()` Funktion mit OpenRouter + Legacy Fallback
- **4-Stage Fallback System**:
  - OpenRouter (Gemini 2.5 Pro → GPT-4o → Claude)
  - Legacy (GPT + Claude direct APIs)

#### 4. `/frontend/pages/api/bewertung.ts`
- **Zeile 35-68**: GET Endpoint für Bewertungsabruf

---

## Ziel-Architektur (SOLL-Zustand)

### Neuer Datenfluss
```
1. Formular (Frontend)
   ↓
2. /api/checkout.ts
   → Ruft Backend AI-API auf (/api/bewertung)
   → Speichert Pferddaten + Bewertung in MongoDB (status: "fertig")
   → Erstellt Stripe Session
   ↓
3. Stripe Checkout (Payment)
   ↓
4. /api/webhook.ts
   → Empfängt Stripe-Bestätigung
   → Aktualisiert nur Payment-Status (bezahlt: true)
   ↓
5. Frontend zeigt bereits vorhandene Bewertung an
```

### Vorteile
- **Kürzere Wartezeit**: Bewertung sofort nach Payment verfügbar
- **Robustere Fehlerbehandlung**: AI-Fehler vor Payment = kein Geld verloren
- **Niedrige AI-Kosten**: Rechtfertigen Pre-Payment Ausführung
- **Bessere UX**: Predictable loading states

---

## Technische Implementierung

### Phase 1: Checkout-Umstellung

#### Änderungen in `/frontend/pages/api/checkout.ts`

**Vor der Stripe Session Creation:**
```typescript
// NEU: AI-Bewertung vor Payment
info("[CHECKOUT] 🤖 Starte AI-Bewertung vor Payment...");

try {
  const aiResponse = await fetch(`${BACKEND_URL}/api/bewertung`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bewertungData),
  });

  if (!aiResponse.ok) {
    throw new Error(`Backend AI-Fehler: ${aiResponse.status}`);
  }

  const aiResult = await aiResponse.json();
  const bewertung = aiResult.ai_response;

  info("[CHECKOUT] ✅ AI-Bewertung erfolgreich erstellt");

  // Speichere mit vollständiger Bewertung
  await collection.insertOne({
    _id: bewertungId,
    ...bewertungData,
    bewertung: bewertung,              // ← NEU: Bewertung bereits vorhanden
    ai_model: aiResult.ai_model,       // ← NEU: Verwendetes AI-Modell
    tier: aiResult.tier,               // ← NEU: OpenRouter Tier
    status: "fertig",                  // ← NEU: Status direkt "fertig"
    bezahlt: false,                    // ← NEU: Payment-Status getrennt
    stripeSessionId: session.id,
    erstellt: new Date(),
  });

} catch (aiError) {
  error("[CHECKOUT] ❌ AI-Bewertung fehlgeschlagen:", aiError);

  // Fehlerbehandlung: Kein Stripe-Redirect bei AI-Fehler
  return res.status(500).json({
    error: "AI-Bewertung momentan nicht verfügbar. Bitte versuchen Sie es später erneut.",
    code: "AI_SERVICE_UNAVAILABLE"
  });
}
```

#### Neue Umgebungsvariablen
```env
# Backend URL für AI-Calls aus Frontend
BACKEND_URL=https://pferdewert-backend.onrender.com
```

### Phase 2: Webhook-Vereinfachung

#### Änderungen in `/frontend/pages/api/webhook.ts`

**Entfernung des AI-Calls, nur Payment-Update:**
```typescript
// ENTFERNT: Komplette AI-Call Logik (Zeile 259-290)

// NEU: Nur Payment-Status Update
try {
  const updateResult = await collection.updateOne(
    { _id: new ObjectId(bewertungId) },
    {
      $set: {
        bezahlt: true,
        paymentConfirmed: new Date(),
        stripePaymentIntentId: paymentIntent?.id,
      }
    }
  );

  if (updateResult.matchedCount === 0) {
    warn('[WEBHOOK] ⚠️ Bewertung nicht gefunden für Payment-Update');
    return res.status(404).json({ error: "Bewertung nicht gefunden" });
  }

  info('[WEBHOOK] ✅ Payment-Status erfolgreich aktualisiert');

} catch (dbError) {
  error('[WEBHOOK] ❌ MongoDB Update Fehler:', dbError);
  return res.status(500).json({ error: "Datenbank-Fehler" });
}
```

### Phase 3: Schema-Anpassungen

#### Neue MongoDB-Felder
```typescript
interface BewertungDocument {
  _id: ObjectId;

  // Pferddaten (unverändert)
  rasse: string;
  alter: number;
  geschlecht: string;
  // ... weitere Felder

  // AI-Bewertung (bereits in checkout verfügbar)
  bewertung: string;          // ← Bewertungstext
  ai_model: string;           // ← Verwendetes Modell (gpt-4o, claude-opus, etc.)
  tier: string;               // ← OpenRouter Tier (premium, standard, etc.)

  // Status-Tracking (angepasst)
  status: "fertig" | "error"; // ← Vereinfacht: nur fertig oder error
  bezahlt: boolean;           // ← NEU: Separater Payment-Status

  // Zeitstempel
  erstellt: Date;             // ← AI-Bewertung Zeitpunkt
  paymentConfirmed?: Date;    // ← NEU: Payment-Bestätigung Zeitpunkt

  // Stripe-Integration
  stripeSessionId: string;
  stripePaymentIntentId?: string;  // ← NEU: Payment Intent ID
}
```

### Phase 4: Frontend-Anpassungen

#### Error Handling auf Checkout-Seite
```typescript
// Frontend: pages/pferde-preis-berechnen.tsx
const handleSubmit = async (data) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: JSON.stringify(data) }),
    });

    const result = await response.json();

    if (!response.ok) {
      // NEU: Spezifische AI-Fehlerbehandlung
      if (result.code === "AI_SERVICE_UNAVAILABLE") {
        setError("Die AI-Bewertung ist momentan nicht verfügbar. Bitte versuchen Sie es in wenigen Minuten erneut.");
        return;
      }
      throw new Error(result.error || "Unbekannter Fehler");
    }

    // Redirect zu Stripe nur bei erfolgreicher AI-Bewertung
    window.location.href = result.url;

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Edge Cases & Fehlerbehandlung

### 1. AI-Service Ausfall
**Problem**: Backend AI-Service nicht erreichbar
**Lösung**:
- Checkout-Fehler vor Stripe-Redirect
- Benutzerfreundliche Fehlermeldung
- Retry-Mechanismus mit exponential backoff
- Fallback auf "Warteschlange" für spätere Bearbeitung

```typescript
// Erweiterte Fehlerbehandlung
const MAX_AI_RETRIES = 3;
const AI_RETRY_DELAY = 1000; // 1s, 2s, 4s

for (let attempt = 1; attempt <= MAX_AI_RETRIES; attempt++) {
  try {
    const aiResponse = await fetch(`${BACKEND_URL}/api/bewertung`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bewertungData),
    });

    if (aiResponse.ok) break; // Erfolg

    if (attempt === MAX_AI_RETRIES) {
      throw new Error(`AI-Service nach ${MAX_AI_RETRIES} Versuchen nicht erreichbar`);
    }

    await new Promise(resolve => setTimeout(resolve, AI_RETRY_DELAY * Math.pow(2, attempt - 1)));

  } catch (error) {
    if (attempt === MAX_AI_RETRIES) {
      // Finale Fehlerbehandlung - Queue für späteren Retry
      await collection.insertOne({
        _id: bewertungId,
        ...bewertungData,
        status: "queued",              // ← Warteschlange
        bezahlt: false,
        erstellt: new Date(),
        retryCount: 0,
        lastRetry: new Date()
      });

      return res.status(503).json({
        error: "AI-Bewertung momentan überlastet. Wir bearbeiten Ihre Anfrage und senden Ihnen die Bewertung per E-Mail zu.",
        code: "AI_SERVICE_TEMPORARILY_UNAVAILABLE",
        bewertungId: bewertungId.toHexString()
      });
    }
  }
}
```

### 2. Partial Payment Success
**Problem**: Stripe Payment erfolgreich, aber Bewertung bereits da
**Lösung**: Webhook nur Payment-Status Update, keine AI-Verarbeitung

### 3. Timeout-Szenarien
**Problem**: AI-Bewertung dauert zu lange (>30s Vercel Limit)
**Lösung**:
- Timeout auf Frontend (25s)
- Background-Job für AI-Verarbeitung
- Polling-Interface für Status-Updates

```typescript
// Frontend: Polling für lange AI-Verarbeitung
const pollBewertungStatus = async (bewertungId: string) => {
  const maxAttempts = 20; // 20 * 3s = 60s max

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`/api/bewertung?id=${bewertungId}`);

    if (response.ok) {
      const data = await response.json();
      if (data.bewertung) {
        return data; // Bewertung fertig
      }
    }

    await new Promise(resolve => setTimeout(resolve, 3000)); // 3s wait
  }

  throw new Error("Bewertung-Timeout");
};
```

### 4. Dateninkonsistenz
**Problem**: Bewertung vorhanden, aber Payment fehlgeschlagen
**Lösung**:
- Cleanup-Job für unbezahlte Bewertungen (>24h alt)
- Status-Tracking für Payment-Retry

---

## Migration Strategy

### Schritt 1: Backend-Readiness (1-2 Tage)
1. ✅ Backend bereits bereit (`/api/bewertung` Endpoint funktioniert)
2. ✅ OpenRouter 4-Stage Fallback System implementiert
3. ✅ Robust error handling vorhanden

### Schritt 2: Schema-Migration (1 Tag)
1. **Neue Felder hinzufügen** (Non-breaking)
```javascript
// MongoDB Migration Script
db.bewertungen.updateMany(
  { bezahlt: { $exists: false } },
  {
    $set: {
      bezahlt: true,  // Existing records are all paid
      paymentConfirmed: "$erstellt"  // Use creation date as fallback
    }
  }
);
```

2. **Index-Optimierung**
```javascript
// Neue Indexes für Performance
db.bewertungen.createIndex({ "bezahlt": 1, "status": 1 });
db.bewertungen.createIndex({ "erstellt": 1 }, { expireAfterSeconds: 2592000 }); // 30 Tage TTL für unbezahlte
```

### Schritt 3: Feature Flag Implementation (1 Tag)
```typescript
// Environment variable für graduelle Umstellung
const USE_PRE_PAYMENT_AI = process.env.USE_PRE_PAYMENT_AI === "true";

if (USE_PRE_PAYMENT_AI) {
  // Neue Logic: AI vor Payment
} else {
  // Alte Logic: AI nach Payment (Fallback)
}
```

### Schritt 4: A/B Testing (3-5 Tage)
1. **50/50 Split**: Feature Flag per User-Session
2. **Monitoring**: Success rates, error rates, conversion rates
3. **Metrics**: AI response times, payment completion rates

### Schritt 5: Full Rollout (1 Tag)
1. Feature Flag auf 100% setzen
2. Alte Webhook-Logic entfernen
3. Clean-up nicht mehr benötigter Code

---

## Rollback Strategy

### Level 1: Feature Flag Rollback (Sofort)
```typescript
// Umgebungsvariable zurücksetzen
USE_PRE_PAYMENT_AI=false
```

### Level 2: Code Rollback (5-10 Minuten)
```bash
# Git-basierter Rollback
git revert <migration-commit-hash>
git push origin main
```

### Level 3: Schema Rollback (10-15 Minuten)
```javascript
// MongoDB Schema Cleanup falls nötig
db.bewertungen.updateMany(
  {},
  {
    $unset: {
      bezahlt: "",
      paymentConfirmed: "",
      stripePaymentIntentId: ""
    }
  }
);
```

### Rollback-Kriterien
- **Error Rate > 5%**: Automatischer Rollback
- **Conversion Rate Drop > 10%**: Manuel review + potentieller Rollback
- **Backend Response Time > 15s**: Automatischer Rollback zu Background-Processing

---

## Monitoring & Success Metrics

### KPIs (Key Performance Indicators)
1. **Conversion Rate**: Payment completion nach AI-Bewertung
2. **Error Rate**: Failed AI-Bewertungen vs. total requests
3. **Response Time**: Average AI-Bewertung duration
4. **User Experience**: Time from form submit to payment completion

### Alerts
```typescript
// Beispiel Monitoring Setup
const metrics = {
  ai_error_rate: errorCount / totalRequests,
  avg_response_time: totalTime / successfulRequests,
  conversion_rate: payments / ai_completions
};

// Alert Thresholds
if (metrics.ai_error_rate > 0.05) {
  alert("AI Error Rate über 5%");
}

if (metrics.avg_response_time > 15000) {
  alert("AI Response Time über 15s");
}
```

### Logging Strategy
```typescript
// Checkout.ts Logging
info("[CHECKOUT] 🤖 AI-Call gestartet", { bewertungId, model: "pre-payment" });
info("[CHECKOUT] ✅ AI-Call erfolgreich", { bewertungId, duration: timeMs, model: aiResult.ai_model });
error("[CHECKOUT] ❌ AI-Call fehlgeschlagen", { bewertungId, error: errorMsg, attempt: retryCount });

// Webhook.ts Logging
info("[WEBHOOK] 💰 Payment-Update", { bewertungId, amount: paymentIntent.amount });
warn("[WEBHOOK] ⚠️ Bewertung bereits vorhanden", { bewertungId, status: result.status });
```

---

## Risiko-Assessment

### Hohe Risiken
1. **AI-Response Time**: Variabel (2-30s) → Timeout-Handling erforderlich
2. **Backend-Verfügbarkeit**: Single Point of Failure → Redundancy erwägen
3. **User Dropout**: Längere Wartezeit vor Payment → UX-Optimierung wichtig

### Mittlere Risiken
1. **Schema-Migration**: Breaking Changes möglich → Schrittweise Migration
2. **Cost Increase**: AI-Calls für nicht-zahlende User → A/B-Test für ROI
3. **Webhook-Redundanz**: Doppelte Updates möglich → Idempotenz sicherstellen

### Niedrige Risiken
1. **Frontend-Changes**: Isoliert testbar → Standard QA-Process
2. **Logging-Overhead**: Minimal performance impact → Acceptable
3. **Environment Variables**: Configuration-only → Leicht rollback-bar

---

## Implementation Timeline

| Phase | Dauer | Beschreibung | Verantwortlich |
|-------|-------|--------------|----------------|
| **Prep** | 1 Tag | Environment Setup, Feature Flags | Backend Dev |
| **Schema** | 1 Tag | MongoDB Migration, Index Updates | Backend Dev |
| **Frontend** | 2 Tage | Checkout.ts Umbau, Error Handling | Frontend Dev |
| **Backend** | 1 Tag | Webhook.ts Vereinfachung | Backend Dev |
| **Testing** | 2 Tage | Unit Tests, Integration Tests | QA Team |
| **Staging** | 1 Tag | Staging Deployment, End-to-End Tests | DevOps |
| **A/B Test** | 5 Tage | 50/50 Feature Flag, Monitoring | Product Team |
| **Rollout** | 1 Tag | 100% Feature Flag, Cleanup | All Teams |
| **Monitor** | 7 Tage | Post-deployment monitoring | On-call Team |

**Total: ~14 Tage (2.8 Arbeitswochen)**

---

## Fazit

Die Umstellung von Post-Payment zu Pre-Payment AI-Bewertung bietet erhebliche UX-Verbesserungen bei überschaubarem technischen Risiko. Die schrittweise Migration mit Feature Flags und A/B-Testing minimiert Ausfallrisiken.

**Nächste Schritte:**
1. ✅ PRD Review & Approval
2. 🔄 Technical Spike für Backend-Timing
3. 📋 Detailed Implementation Tickets
4. 🚀 Sprint Planning & Resource Allocation

**Entscheidungsträger:** Product Owner, Tech Lead
**Review Datum:** 2025-01-28
**Go/No-Go Datum:** 2025-01-29