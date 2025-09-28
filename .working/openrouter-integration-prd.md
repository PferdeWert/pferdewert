# PRD: OpenRouter.ai Integration für PferdeWert KI-Bewertung

## Überblick

### Problem Statement
Die aktuelle KI-Bewertungsarchitektur von PferdeWert nutzt separate API-Clients für OpenAI und Anthropic, was zu folgenden Herausforderungen führt:
- **Komplexe Modellverwaltung**: Separate Clients und Konfigurationen für jeden Anbieter
- **Eingeschränkte Flexibilität**: Manueller Code-Aufwand beim Hinzufügen neuer Modelle
- **Fehlerbehandlung**: Verschiedene Error-Handling-Strategien pro Anbieter
- **Testing**: Schwierige Vergleichstests zwischen verschiedenen Modellen

### Proposed Solution
Integration von **OpenRouter.ai** als einheitlicher API-Gateway für alle KI-Modelle, beginnend mit der Migration von Claude auf Gemini 2.5 Pro.

## Projektziele

### Primäre Ziele
1. **Einheitliche API**: Ein Client für alle KI-Modelle über OpenRouter.ai
2. **Einfache Modellumstellung**: Konfigurierbare Modellwahl ohne Code-Änderungen
3. **Kostenoptimierung**: Transparente Kostenvergleiche zwischen Modellen
4. **Verbesserte Testbarkeit**: Einfache A/B-Tests zwischen verschiedenen Modellen

### Sekundäre Ziele
- Vereinfachte Error-Handling-Logik
- Reduzierte Abhängigkeiten von mehreren SDK-Bibliotheken
- Zentrale Rate-Limiting-Behandlung
- Bessere Observability und Logging

## Aktueller Zustand

### Technische Analyse
```python
# Aktuelle Architektur (backend/main.py)
- openai_client = OpenAI(api_key=OPENAI_KEY)
- claude_client = anthropic.Anthropic(api_key=CLAUDE_KEY)
- Dual-API-Aufrufe mit komplexer Retry-Logik
- Separate Token-Zählung für verschiedene Modelle
- Model-spezifische Konfiguration (CLAUDE_MODEL, MODEL_ID)
```

### Aktuelle Modellnutzung
- **Primär**: Claude Opus 4.1 (`claude-opus-4-1-20250805`)
- **Fallback**: GPT-4o (konfigurierbar via `PW_MODEL`)
- **Parallele Verarbeitung**: Optional für Vergleichstests
- **Retry-Logik**: Spezifisch für Claude 529-Fehler

## Funktionale Anforderungen

### Core Features

#### 1. OpenRouter Client Integration
- **Requirement**: Implementierung eines OpenRouter.ai API-Clients
- **Details**:
  - Einheitliche Request/Response-Struktur
  - Support für Chat Completions API
  - Konfigurierbare Modellauswahl
- **Acceptance Criteria**:
  - [ ] OpenRouter Client kann alle aktuell genutzten Modelle ansprechen
  - [ ] Response-Format ist kompatibel mit bestehender Bewertungslogik

#### 2. Modellkonfiguration
- **Requirement**: Umgebungsvariablen-basierte Modellkonfiguration
- **Details**:
  ```
  OPENROUTER_API_KEY=<key>
  PRIMARY_MODEL=google/gemini-2.5-pro  # Neues Standard-Modell
  FALLBACK_MODEL=anthropic/claude-3.5-sonnet
  USE_OPENROUTER=true
  ```
- **Acceptance Criteria**:
  - [ ] Modell kann über ENV-Variable gewechselt werden
  - [ ] Fallback-Modell funktioniert bei Primary-Modell-Ausfällen

#### 3. API Response Format
- **Requirement**: Modernisierung der API Response-Felder
- **Details**:
  - `raw_gpt` → `ai_response` (technisch korrekt)
  - `ai_model` → `ai_model` (vereinfacht, enthält vollständigen Identifier)
- **Acceptance Criteria**:
  - [ ] Neue Response-Felder sind implementiert
  - [ ] Frontend nutzt neue Feldnamen (3 Dateien zu ändern)

### Migration Features

#### 4. Gemini 2.5 Pro Integration
- **Requirement**: Nahtloser Wechsel von Claude auf Gemini 2.5 Pro
- **Details**:
  - Model: `google/gemini-2.5-pro` (über OpenRouter)
  - Temperatur: 0.3 (für realistische Bewertungen)
  - Same System Prompt wie aktuell
- **Acceptance Criteria**:
  - [ ] Gemini 2.5 Pro liefert qualitativ vergleichbare Bewertungen
  - [ ] Response-Zeit ist akzeptabel (<10s)
  - [ ] Kosten pro Request sind dokumentiert

### Monitoring & Observability

#### 5. Enhanced Logging
- **Requirement**: Detailliertes Logging für Modellvergleiche
- **Details**:
  - Model-Name und Version in jedem Log-Entry
  - Response-Zeit und Token-Zählung
  - Error-Rate pro Modell
- **Acceptance Criteria**:
  - [ ] Logs enthalten alle relevanten Metriken
  - [ ] Performance-Vergleiche zwischen Modellen sind möglich

## Technische Spezifikationen

### Architektur-Änderungen

#### Neue Dateistruktur
```
backend/
├── main.py                 # Hauptanwendung (minimal geändert)
├── ai_clients/
│   ├── __init__.py
│   ├── openrouter_client.py  # Neuer OpenRouter Client
│   └── legacy_clients.py     # Bestehende Clients (für Fallback)
└── config/
    ├── models.py            # Modellkonfiguration
    └── prompts.py           # System Prompts
```

#### OpenRouter Client Implementation
```python
class OpenRouterClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openrouter.ai/api/v1"

    def chat_completion(self,
                       model: str,
                       messages: list,
                       temperature: float = 0.3,
                       max_tokens: int = 3000) -> dict:
        # Implementierung mit Retry-Logik
        pass
```

### API-Änderungen

#### Umgebungsvariablen (Neue)
```bash
# OpenRouter Configuration
OPENROUTER_API_KEY=your_api_key_here
USE_OPENROUTER=true

# Model Selection
PRIMARY_MODEL=google/gemini-2.5-pro
FALLBACK_MODEL=anthropic/claude-3.5-sonnet

# Legacy Support (falls OpenRouter deaktiviert)
OPENAI_API_KEY=legacy_fallback
ANTHROPIC_API_KEY=legacy_fallback
```

#### Response-Format (Modernisiert)
```json
{
  "ai_response": "Bewertungstext...",
  "model": "google/gemini-2.5-pro"
}
```

### Modell-Spezifikationen

#### Gemini 2.5 Pro (google/gemini-2.5-pro)
- **Kontext**: 1M Tokens
- **Output**: Max 8192 Tokens
- **Temperatur**: 0.3 (für natürlichere Bewertungen)
- **Kosten**: $1.25/1M input tokens, $10/1M output tokens
- **Besonderheiten**: Multimodal-Fähigkeiten (zukünftig für Pferdebilder)

#### Fallback-Strategie
1. **Primary**: Gemini 2.5 Pro via OpenRouter
2. **Secondary**: Claude 3.5 Sonnet via OpenRouter
3. **Tertiary**: GPT-4o via OpenRouter
4. **Emergency**: Legacy OpenAI/Claude Clients

## Implementierungsplan

### Phase 1: Foundation (Woche 1)
- [ ] OpenRouter Client Implementierung
- [ ] Konfigurationssystem für Modelle
- [ ] Unit Tests für Client
- [ ] Integration in bestehende ai_valuation() Funktion
- [ ] Frontend-Anpassungen für neue Response-Felder (3 Dateien)

### Phase 2: Migration (Woche 2)
- [ ] Gemini 2.5 Pro Integration über OpenRouter
- [ ] A/B-Testing-Framework für Modellvergleiche
- [ ] Logging und Monitoring erweitern
- [ ] Performance-Tests

### Phase 3: Production (Woche 3)
- [ ] Stufenweise Migration: 10% → 50% → 100% Traffic
- [ ] Monitoring und Alerting
- [ ] Fallback-Mechanismen testen
- [ ] Legacy-Code Cleanup

### Phase 4: Optimization (Woche 4)
- [ ] Kosten-Analyse und -Optimierung
- [ ] Response-Zeit Optimierung
- [ ] Erweiterte Modell-Features (Multimodal)
- [ ] Dokumentation und Training


## Success Metrics

### Technical KPIs
- **Response Time**: <10s für Pferdebewertung (aktuell: ~8s)
- **Error Rate**: <1% (aktuell: <0.5%)
- **Uptime**: 99.9% (aktuell: 99.8%)

### Business KPIs
- **Bewertungsqualität**: User-Feedback Score ≥4.0/5.0
- **Cost per Request**: Max 20% Steigerung akzeptabel
- **Development Velocity**: Neue Modelle in <1 Tag integrierbar

### Quality Metrics
- **A/B-Test Results**: Gemini ≥ Claude in Blind-User-Tests
- **Expert Review**: Fachliche Bewertungsqualität maintained
- **Response Consistency**: <5% Abweichung bei identischen Inputs

## Dependencies

### Externe Dependencies
- **OpenRouter.ai Account**: API-Key und Credits
- **Python Package**: `openai` (für OpenRouter-kompatible Requests)

### Interne Dependencies
- **Backend Deployment**: Neue ENV-Variablen
- **Monitoring Setup**: Erweiterte Logging-Pipeline
- **Testing Infrastructure**: A/B-Testing-Capabilities

## Render Environment Variables TODO

### Variables zu LÖSCHEN
- [ ] `CLAUDE_MODEL` (wird durch PRIMARY_MODEL ersetzt)
- [ ] `MODEL_ID` (wird durch PRIMARY_MODEL ersetzt)
- [ ] `PW_MODEL` (wird durch FALLBACK_MODEL ersetzt)

### Variables zu ÄNDERN
- [ ] `ANTHROPIC_API_KEY` → Optional (nur für Emergency Fallback)
- [ ] `OPENAI_API_KEY` → Optional (nur für Emergency Fallback)

### Variables zu HINZUFÜGEN
- [ ] `OPENROUTER_API_KEY` - OpenRouter API Key
- [ ] `USE_OPENROUTER=true` - Feature Flag für OpenRouter
- [ ] `PRIMARY_MODEL=google/gemini-2.5-pro` - Hauptmodell
- [ ] `FALLBACK_MODEL=anthropic/claude-3.5-sonnet` - Fallback-Modell

## Frontend Requirements

### API Response Handling (Phase 1)

#### Betroffene Dateien (3 Files zu ändern)
1. **`/pages/api/webhook.ts`** (Lines 31-33)
   - Interface `BackendResponse` aktualisieren
   - Logging-Statements anpassen
   - Error-Handling für neue Feldnamen

2. **`/scripts/fix-failed-order.ts`** (Line ~118)
   - Variable `rawGpt = gptResponse?.raw_gpt` aktualisieren
   - Error-Messages entsprechend anpassen

3. **API Response Handler** (zu identifizieren)
   - Weitere Dateien die Backend-Response verarbeiten

#### TypeScript Interface Updates

```typescript
// VORHER (Aktuell)
interface BackendResponse {
  raw_gpt?: string;
}

// NACHHER (OpenRouter)
interface BackendResponse {
  ai_response?: string;
  ai_model?: string; // Neues Feld für Modell-Identifier
}

// Erweiterte Response mit OpenRouter Metadaten
interface OpenRouterBackendResponse {
  ai_response: string;
  ai_model: string; // z.B. "google/gemini-2.5-pro"
  response_time_ms?: number;
  token_usage?: {
    input_tokens: number;
    output_tokens: number;
    total_cost_usd?: number;
  };
  error?: string;
}
```

#### Error Handling Erweiterungen

```typescript
// Neue OpenRouter-spezifische Error Types
interface OpenRouterError {
  code: string;
  message: string;
  model: string;
  retry_after?: number; // Rate limiting
}

// Error Mapping für Frontend
const OPENROUTER_ERROR_MESSAGES: Record<string, string> = {
  'rate_limit_exceeded': 'KI-Service ist überlastet. Bitte versuche es in wenigen Minuten erneut.',
  'model_not_available': 'Das angeforderte KI-Modell ist nicht verfügbar. Wir nutzen automatisch ein Ersatzmodell.',
  'insufficient_credits': 'Temporärer Service-Fehler. Unser Team wurde benachrichtigt.',
  'invalid_model': 'KI-Konfigurationsfehler. Bitte kontaktiere den Support.',
  'context_length_exceeded': 'Die Pferdetdaten sind zu umfangreich für die Verarbeitung.',
};
```

### UI/UX Überlegungen

#### Modell-Anzeige für Nutzer (Optional)
- **Empfehlung**: NICHT sichtbar für Endnutzer
- **Begründung**: Technische Details verwirren und beeinflussen Vertrauen
- **Alternative**: Interne Logging für Support und Debugging

#### Loading States für verschiedene Modelle

```typescript
interface LoadingState {
  isLoading: boolean;
  currentModel?: string;
  estimatedWaitTime?: number; // in Sekunden
  stage: 'preparing' | 'analyzing' | 'generating' | 'finalizing';
}

// Model-spezifische Loading-Zeiten
const MODEL_EXPECTATIONS = {
  'google/gemini-2.5-pro': { avgTime: 8, maxTime: 15 },
  'anthropic/claude-3.5-sonnet': { avgTime: 6, maxTime: 12 },
  'openai/gpt-4o': { avgTime: 5, maxTime: 10 },
} as const;
```

#### Progressive Loading UI Enhancement

```tsx
// Erweiterte Loading Component für verschiedene Modelle
interface ProgressiveLoadingProps {
  currentModel: string;
  elapsedTime: number;
  estimatedTime: number;
}

const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({
  currentModel,
  elapsedTime,
  estimatedTime
}) => {
  const progress = Math.min((elapsedTime / estimatedTime) * 100, 90);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-center text-gray-600">
        KI-Analyse läuft... ({Math.round(elapsedTime)}s)
      </p>

      {/* Debug Info für Development */}
      {process.env.NODE_ENV === 'development' && (
        <p className="text-xs text-gray-400 text-center mt-2">
          Model: {currentModel}
        </p>
      )}
    </div>
  );
};
```

### Configuration Interface (Admin)

#### Environment-basierte Modell-Kontrolle
- **KEINE** Admin-UI notwendig
- **Modellwechsel**: Nur über Umgebungsvariablen (Sicherheit)
- **Monitoring**: Read-only Dashboard für Modell-Performance

#### A/B Testing Integration

```typescript
// A/B Testing Configuration (Backend-gesteuert)
interface ABTestConfig {
  enabled: boolean;
  trafficSplit: {
    model_a: number; // 0-100
    model_b: number; // 0-100
  };
  models: {
    model_a: string; // z.B. "google/gemini-2.5-pro"
    model_b: string; // z.B. "anthropic/claude-3.5-sonnet"
  };
}

// Frontend A/B Test Tracking
const trackABTestResult = (testGroup: 'model_a' | 'model_b', userFeedback: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_feedback', {
      test_group: testGroup,
      user_rating: userFeedback,
      session_id: sessionId
    });
  }
};
```

### Mobile & Performance Optimierungen

#### Response Streaming (Zukünftig)
```typescript
// Vorbereitung für Streaming Responses
interface StreamingResponse {
  chunk: string;
  isComplete: boolean;
  totalChunks?: number;
  currentChunk?: number;
}

// Progressive Content Updates
const useStreamingResponse = (sessionId: string) => {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // EventSource für Server-Sent Events
    const eventSource = new EventSource(`/api/stream-evaluation?session=${sessionId}`);

    eventSource.onmessage = (event) => {
      const data: StreamingResponse = JSON.parse(event.data);
      setContent(prev => prev + data.chunk);

      if (data.isComplete) {
        setIsStreaming(false);
        eventSource.close();
      }
    };

    return () => eventSource.close();
  }, [sessionId]);

  return { content, isStreaming };
};
```

#### Performance Monitoring
```typescript
// Performance Tracking für verschiedene Modelle
interface PerformanceMetrics {
  modelUsed: string;
  responseTime: number;
  tokenCount: number;
  userRating?: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

const trackModelPerformance = (metrics: PerformanceMetrics) => {
  // Analytics Event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'model_performance', {
      model: metrics.modelUsed,
      response_time: metrics.responseTime,
      token_count: metrics.tokenCount,
      device_type: metrics.deviceType,
      custom_map: {
        metric_type: 'ai_response_quality'
      }
    });
  }

  // Lokale Performance-Daten sammeln
  const perfData = {
    timestamp: Date.now(),
    ...metrics
  };

  // Zum Backend senden für Monitoring
  fetch('/api/analytics/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(perfData)
  }).catch(err => {
    // Silent fail für Analytics
    console.warn('Analytics failed:', err);
  });
};
```

#### Stripe Integration Kompatibilität
- **Keine Änderungen** am Stripe Checkout Flow erforderlich
- **Session-ID** bleibt unverändert als Tracking-Mechanismus
- **Webhook-Verarbeitung** funktioniert identisch mit neuen Feldnamen

### Implementierungsdetails

#### Phase 1: Field Migration (Woche 1)
```bash
# 1. TypeScript Interface Updates
# Datei: pages/api/webhook.ts
- raw_gpt → ai_response
- Hinzufügen: ai_model field

# 2. Script Updates
# Datei: scripts/fix-failed-order.ts
- gptResponse?.raw_gpt → gptResponse?.ai_response

# 3. Error Message Updates
- "Expected raw_gpt field" → "Expected ai_response field"
```

#### Phase 2: Enhanced Error Handling (Woche 1-2)
```typescript
// Neue Error Handler für OpenRouter
const handleOpenRouterError = (error: OpenRouterError) => {
  const userMessage = OPENROUTER_ERROR_MESSAGES[error.code] ||
    'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.';

  // Log für Debugging
  error('[OPENROUTER_ERROR]', {
    code: error.code,
    message: error.message,
    model: error.model,
    retryAfter: error.retry_after
  });

  return userMessage;
};
```

#### Phase 3: Performance Monitoring (Woche 2-3)
```typescript
// Performance Dashboard Integration
interface ModelMetrics {
  model: string;
  avgResponseTime: number;
  successRate: number;
  userSatisfaction: number;
  costPerRequest: number;
  dailyVolume: number;
}

// Read-only Monitoring Component
const ModelPerformanceDashboard = () => {
  const [metrics, setMetrics] = useState<ModelMetrics[]>([]);

  // Fetch Performance Data
  useEffect(() => {
    fetch('/api/admin/model-metrics')
      .then(res => res.json())
      .then(setMetrics);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map(metric => (
        <div key={metric.model} className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">{metric.model}</h3>
          <div className="space-y-2 text-sm">
            <div>Ø Response: {metric.avgResponseTime}s</div>
            <div>Success Rate: {metric.successRate}%</div>
            <div>User Rating: {metric.userSatisfaction}/5</div>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Deliverables

### Code Deliverables
- [ ] `ai_clients/openrouter_client.py` - OpenRouter API Client
- [ ] `config/models.py` - Modellkonfiguration
- [ ] Updated `main.py` mit OpenRouter Integration
- [ ] **Frontend Updates**: 3 Dateien mit `raw_gpt` → `ai_response`
- [ ] Enhanced Error Handling für OpenRouter-spezifische Fehler
- [ ] Performance Monitoring Integration
- [ ] Comprehensive Unit & Integration Tests

### Documentation
- [ ] API-Dokumentation für neue Konfiguration
- [ ] Migration-Runbook für Production-Deployment
- [ ] **Frontend Migration Guide**: TypeScript Interface Changes
- [ ] Monitoring-Playbook für Support-Team
- [ ] Cost-Analysis-Report

### Testing
- [ ] A/B-Testing-Framework
- [ ] Performance-Benchmarks
- [ ] **Frontend Compatibility Tests**: Stripe Integration
- [ ] **Mobile Performance Tests**: Response Time auf verschiedenen Geräten
- [ ] Quality-Assurance-Tests mit Experten-Review
- [ ] Load-Testing für OpenRouter Integration

### Frontend Monitoring & Analytics
- [ ] **Enhanced GA4 Events**: Modell-Performance Tracking
- [ ] **Error Tracking**: OpenRouter-spezifische Fehlerbehandlung
- [ ] **User Experience Metrics**: Loading-Zeit und Zufriedenheit
- [ ] **A/B Test Dashboards**: Model Comparison Visualisierung

## Backend Architecture

### Überblick

Die Backend-Architektur für die OpenRouter Integration folgt dem Prinzip "Keep It Simple" und optimiert die bestehende FastAPI-Struktur für maximale Wartbarkeit und Performance. Die Implementierung umfasst:

1. **OpenRouter Client** mit intelligenter Retry-Logik
2. **4-Stage Fallback-System** für maximale Verfügbarkeit
3. **MongoDB Integration** für Performance-Tracking
4. **Enhanced Configuration Management**
5. **Comprehensive Error Handling**

### 1. OpenRouter Client Implementation

#### Core Client Class

```python
# ai_clients/openrouter_client.py
import httpx
import asyncio
import logging
import time
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum

@dataclass
class TokenUsage:
    input_tokens: int
    output_tokens: int
    total_tokens: int
    cost_usd: Optional[float] = None

@dataclass
class OpenRouterResponse:
    content: str
    model: str
    usage: TokenUsage
    response_time_ms: int
    headers: Dict[str, str]

class ModelTier(Enum):
    PRIMARY = "primary"
    SECONDARY = "secondary"
    TERTIARY = "tertiary"
    EMERGENCY = "emergency"

class OpenRouterClient:
    """
    Production-ready OpenRouter client with exponential backoff,
    rate limiting, and comprehensive error handling.
    """

    def __init__(self, api_key: str, base_url: str = "https://openrouter.ai/api/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = httpx.AsyncClient(
            timeout=httpx.Timeout(60.0, connect=10.0),
            limits=httpx.Limits(max_connections=10, max_keepalive_connections=5)
        )
        self.logger = logging.getLogger(__name__)

        # Rate limiting state
        self._last_request_time = 0
        self._min_request_interval = 0.1  # 100ms between requests

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.session.aclose()

    async def chat_completion(
        self,
        model: str,
        messages: List[Dict[str, str]],
        temperature: float = 0.3,
        max_tokens: int = 3000,
        max_retries: int = 3
    ) -> OpenRouterResponse:
        """
        Execute chat completion with exponential backoff retry logic.

        Args:
            model: OpenRouter model identifier (e.g., "google/gemini-2.5-pro")
            messages: Chat messages in OpenAI format
            temperature: Sampling temperature (0.0-1.0)
            max_tokens: Maximum response tokens
            max_retries: Maximum retry attempts

        Returns:
            OpenRouterResponse with content, usage, and metadata

        Raises:
            OpenRouterError: On unrecoverable errors
            asyncio.TimeoutError: On timeout
        """

        for attempt in range(max_retries + 1):
            try:
                # Rate limiting
                await self._enforce_rate_limit()

                start_time = time.time()

                payload = {
                    "model": model,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens,
                    "stream": False
                }

                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://pferdewert.de",
                    "X-Title": "PferdeWert KI-Bewertung"
                }

                response = await self.session.post(
                    f"{self.base_url}/chat/completions",
                    json=payload,
                    headers=headers
                )

                response_time_ms = int((time.time() - start_time) * 1000)

                if response.status_code == 200:
                    data = response.json()
                    return self._parse_success_response(data, model, response_time_ms, response.headers)

                elif response.status_code in [429, 503, 502, 504] and attempt < max_retries:
                    wait_time = await self._calculate_backoff_time(response, attempt)
                    self.logger.warning(f"Rate limited (attempt {attempt + 1}), waiting {wait_time}s")
                    await asyncio.sleep(wait_time)
                    continue

                else:
                    error_data = self._parse_error_response(response)
                    raise OpenRouterError(
                        code=error_data.get("code", "http_error"),
                        message=error_data.get("message", f"HTTP {response.status_code}"),
                        model=model,
                        status_code=response.status_code
                    )

            except httpx.TimeoutException:
                if attempt < max_retries:
                    wait_time = (2 ** attempt) + random.uniform(0, 1)
                    self.logger.warning(f"Timeout (attempt {attempt + 1}), retrying in {wait_time}s")
                    await asyncio.sleep(wait_time)
                    continue
                else:
                    raise asyncio.TimeoutError(f"Request timeout after {max_retries + 1} attempts")

            except Exception as e:
                if attempt < max_retries and self._is_retryable_error(e):
                    wait_time = (2 ** attempt) + random.uniform(0, 1)
                    self.logger.warning(f"Retryable error (attempt {attempt + 1}): {str(e)}")
                    await asyncio.sleep(wait_time)
                    continue
                else:
                    raise

        raise OpenRouterError("Max retries exceeded", "max_retries_exceeded", model)

    async def _enforce_rate_limit(self):
        """Enforce minimum time between requests."""
        current_time = time.time()
        time_since_last = current_time - self._last_request_time

        if time_since_last < self._min_request_interval:
            await asyncio.sleep(self._min_request_interval - time_since_last)

        self._last_request_time = time.time()

    async def _calculate_backoff_time(self, response: httpx.Response, attempt: int) -> float:
        """Calculate exponential backoff with jitter."""
        # Check for Retry-After header
        retry_after = response.headers.get("retry-after")
        if retry_after:
            try:
                return float(retry_after)
            except ValueError:
                pass

        # Exponential backoff with jitter
        base_delay = 2 ** attempt
        jitter = random.uniform(0, min(base_delay * 0.1, 2))
        return min(base_delay + jitter, 30)  # Cap at 30 seconds

    def _parse_success_response(
        self,
        data: Dict,
        model: str,
        response_time_ms: int,
        headers: Dict[str, str]
    ) -> OpenRouterResponse:
        """Parse successful OpenRouter response."""
        choice = data["choices"][0]
        content = choice["message"]["content"]

        usage_data = data.get("usage", {})
        usage = TokenUsage(
            input_tokens=usage_data.get("prompt_tokens", 0),
            output_tokens=usage_data.get("completion_tokens", 0),
            total_tokens=usage_data.get("total_tokens", 0)
        )

        # Extract cost information if available
        if "x-ratelimit-tokens-remaining" in headers:
            usage.cost_usd = self._estimate_cost(model, usage)

        return OpenRouterResponse(
            content=content,
            model=model,
            usage=usage,
            response_time_ms=response_time_ms,
            headers=dict(headers)
        )

    def _parse_error_response(self, response: httpx.Response) -> Dict[str, str]:
        """Parse error response from OpenRouter."""
        try:
            error_data = response.json()
            if "error" in error_data:
                return error_data["error"]
            return error_data
        except:
            return {
                "code": f"http_{response.status_code}",
                "message": response.text or f"HTTP {response.status_code} error"
            }

    def _estimate_cost(self, model: str, usage: TokenUsage) -> float:
        """Estimate cost based on known OpenRouter pricing."""
        # Pricing per 1M tokens (as of September 2025)
        PRICING = {
            "google/gemini-2.5-pro": {"input": 1.25, "output": 10.0},
            "anthropic/claude-3.5-sonnet": {"input": 3.0, "output": 15.0},
            "openai/gpt-4o": {"input": 5.0, "output": 15.0}
        }

        if model not in PRICING:
            return 0.0

        rates = PRICING[model]
        input_cost = (usage.input_tokens / 1_000_000) * rates["input"]
        output_cost = (usage.output_tokens / 1_000_000) * rates["output"]

        return round(input_cost + output_cost, 6)

    def _is_retryable_error(self, error: Exception) -> bool:
        """Determine if an error is retryable."""
        retryable_types = (
            httpx.ConnectTimeout,
            httpx.ReadTimeout,
            httpx.NetworkError,
            ConnectionError
        )
        return isinstance(error, retryable_types)

class OpenRouterError(Exception):
    """Custom exception for OpenRouter API errors."""

    def __init__(self, message: str, code: str, model: str, status_code: int = None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.model = model
        self.status_code = status_code
        self.retry_after = None
```

#### Model Configuration System

```python
# config/models.py
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum
import os

@dataclass
class ModelConfig:
    """Configuration for a specific AI model."""
    identifier: str
    tier: ModelTier
    temperature: float
    max_tokens: int
    timeout_seconds: int
    cost_per_1k_tokens: float
    features: List[str]

class ModelManager:
    """Centralized model configuration and fallback management."""

    def __init__(self):
        self.models = self._load_model_configs()
        self.fallback_chain = self._build_fallback_chain()

    def _load_model_configs(self) -> Dict[str, ModelConfig]:
        """Load model configurations from environment variables."""
        return {
            "google/gemini-2.5-pro": ModelConfig(
                identifier="google/gemini-2.5-pro",
                tier=ModelTier.PRIMARY,
                temperature=0.3,
                max_tokens=3000,
                timeout_seconds=45,
                cost_per_1k_tokens=0.00125,
                features=["multimodal", "large_context"]
            ),
            "anthropic/claude-3.5-sonnet": ModelConfig(
                identifier="anthropic/claude-3.5-sonnet",
                tier=ModelTier.SECONDARY,
                temperature=0.3,
                max_tokens=3000,
                timeout_seconds=30,
                cost_per_1k_tokens=0.003,
                features=["reasoning", "analysis"]
            ),
            "openai/gpt-4o": ModelConfig(
                identifier="openai/gpt-4o",
                tier=ModelTier.TERTIARY,
                temperature=0.3,
                max_tokens=3000,
                timeout_seconds=25,
                cost_per_1k_tokens=0.005,
                features=["fast", "reliable"]
            )
        }

    def _build_fallback_chain(self) -> List[str]:
        """Build ordered fallback chain based on configuration."""
        primary = os.getenv("PRIMARY_MODEL", "google/gemini-2.5-pro")
        fallback = os.getenv("FALLBACK_MODEL", "anthropic/claude-3.5-sonnet")
        tertiary = os.getenv("TERTIARY_MODEL", "openai/gpt-4o")

        return [primary, fallback, tertiary]

    def get_model_config(self, model_id: str) -> ModelConfig:
        """Get configuration for a specific model."""
        return self.models.get(model_id)

    def get_fallback_chain(self) -> List[str]:
        """Get ordered list of models for fallback."""
        return self.fallback_chain.copy()

    def get_active_model(self) -> str:
        """Get currently active primary model."""
        return self.fallback_chain[0]
```

### 2. Enhanced AI Service with 4-Stage Fallback

```python
# ai_clients/ai_service.py
import asyncio
import logging
from typing import Dict, List, Optional, Tuple
from .openrouter_client import OpenRouterClient, OpenRouterError, OpenRouterResponse
from .legacy_clients import LegacyClaudeClient, LegacyOpenAIClient
from config.models import ModelManager
import os

class AIService:
    """
    Production AI service with 4-stage fallback strategy:
    1. OpenRouter Primary Model (Gemini 2.5 Pro)
    2. OpenRouter Secondary Model (Claude 3.5 Sonnet)
    3. OpenRouter Tertiary Model (GPT-4o)
    4. Legacy Direct API Clients (Emergency)
    """

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.model_manager = ModelManager()

        # Initialize clients
        self.openrouter_client = None
        self.legacy_claude_client = None
        self.legacy_openai_client = None

        self._initialize_clients()

    def _initialize_clients(self):
        """Initialize all API clients."""
        # OpenRouter client
        openrouter_key = os.getenv("OPENROUTER_API_KEY")
        if openrouter_key:
            self.openrouter_client = OpenRouterClient(openrouter_key)

        # Legacy clients for emergency fallback
        claude_key = os.getenv("ANTHROPIC_API_KEY")
        if claude_key:
            self.legacy_claude_client = LegacyClaudeClient(claude_key)

        openai_key = os.getenv("OPENAI_API_KEY")
        if openai_key:
            self.legacy_openai_client = LegacyOpenAIClient(openai_key)

    async def generate_horse_valuation(
        self,
        horse_data: Dict,
        system_prompt: str,
        user_message: str
    ) -> Tuple[str, str, Dict]:
        """
        Generate horse valuation using 4-stage fallback strategy.

        Returns:
            Tuple of (ai_response, model_used, metadata)
        """

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        # Stage 1-3: OpenRouter models
        if self.openrouter_client:
            for model_id in self.model_manager.get_fallback_chain():
                try:
                    result = await self._try_openrouter_model(model_id, messages)
                    if result:
                        response, metadata = result
                        self.logger.info(f"Success with OpenRouter model: {model_id}")
                        return response.content, model_id, metadata

                except Exception as e:
                    self.logger.warning(f"OpenRouter model {model_id} failed: {str(e)}")
                    continue

        # Stage 4: Legacy clients (Emergency fallback)
        self.logger.warning("All OpenRouter models failed, trying legacy clients")

        # Try legacy Claude
        if self.legacy_claude_client:
            try:
                response = await self.legacy_claude_client.generate(messages)
                self.logger.info("Success with legacy Claude client")
                return response, "claude-3.5-sonnet-legacy", {"source": "legacy_claude"}
            except Exception as e:
                self.logger.error(f"Legacy Claude failed: {str(e)}")

        # Try legacy OpenAI
        if self.legacy_openai_client:
            try:
                response = await self.legacy_openai_client.generate(messages)
                self.logger.info("Success with legacy OpenAI client")
                return response, "gpt-4o-legacy", {"source": "legacy_openai"}
            except Exception as e:
                self.logger.error(f"Legacy OpenAI failed: {str(e)}")

        # All fallbacks exhausted
        raise Exception("All AI services are currently unavailable")

    async def _try_openrouter_model(
        self,
        model_id: str,
        messages: List[Dict]
    ) -> Optional[Tuple[OpenRouterResponse, Dict]]:
        """Try a specific OpenRouter model with appropriate configuration."""

        config = self.model_manager.get_model_config(model_id)
        if not config:
            self.logger.warning(f"No configuration found for model: {model_id}")
            return None

        try:
            async with self.openrouter_client as client:
                response = await client.chat_completion(
                    model=model_id,
                    messages=messages,
                    temperature=config.temperature,
                    max_tokens=config.max_tokens
                )

                metadata = {
                    "source": "openrouter",
                    "response_time_ms": response.response_time_ms,
                    "token_usage": {
                        "input_tokens": response.usage.input_tokens,
                        "output_tokens": response.usage.output_tokens,
                        "total_tokens": response.usage.total_tokens,
                        "cost_usd": response.usage.cost_usd
                    },
                    "model_tier": config.tier.value
                }

                return response, metadata

        except OpenRouterError as e:
            # Don't retry OpenRouter errors, let fallback handle it
            self.logger.warning(f"OpenRouter error for {model_id}: {e.code} - {e.message}")
            return None

        except Exception as e:
            self.logger.error(f"Unexpected error with {model_id}: {str(e)}")
            return None
```

### 3. MongoDB Integration for Performance Tracking

#### Database Schema Design

```python
# database/schemas.py
from pymongo import MongoClient
from datetime import datetime, timezone
from typing import Dict, List, Optional
import os

class MongoManager:
    """MongoDB connection and collection management."""

    def __init__(self):
        self.client = None
        self.db = None
        self._initialize_connection()

    def _initialize_connection(self):
        """Initialize MongoDB connection."""
        mongo_uri = os.getenv("MONGODB_URI")
        if not mongo_uri:
            raise ValueError("MONGODB_URI environment variable is required")

        self.client = MongoClient(mongo_uri)
        self.db = self.client.pferdewert

        # Ensure indexes exist
        self._create_indexes()

    def _create_indexes(self):
        """Create necessary MongoDB indexes for performance."""

        # ai_requests collection indexes
        self.db.ai_requests.create_index([
            ("timestamp", -1),
            ("model_used", 1)
        ])

        self.db.ai_requests.create_index([
            ("session_id", 1),
            ("timestamp", -1)
        ])

        self.db.ai_requests.create_index([
            ("model_used", 1),
            ("success", 1),
            ("timestamp", -1)
        ])

        # model_performance collection indexes
        self.db.model_performance.create_index([
            ("model_id", 1),
            ("date", -1)
        ])

        self.db.model_performance.create_index([
            ("date", -1)
        ])

        # error_logs collection indexes
        self.db.error_logs.create_index([
            ("timestamp", -1),
            ("error_type", 1)
        ])

        self.db.error_logs.create_index([
            ("model_used", 1),
            ("timestamp", -1)
        ])

# Collection Schemas (for documentation)

AI_REQUEST_SCHEMA = {
    "_id": "ObjectId",
    "session_id": "str",  # Stripe session ID for tracking
    "timestamp": "datetime",
    "model_used": "str",  # e.g., "google/gemini-2.5-pro"
    "model_tier": "str",  # primary, secondary, tertiary, emergency
    "horse_data": {
        "alter": "int",
        "geschlecht": "str",
        "rasse": "str",
        "haupteignung": "str",
        "ausbildungsstand": "str",
        "gesundheitszustand": "str",
        "besonderheiten": "str"
    },
    "response_data": {
        "content": "str",
        "response_time_ms": "int",
        "token_usage": {
            "input_tokens": "int",
            "output_tokens": "int",
            "total_tokens": "int",
            "cost_usd": "float"
        }
    },
    "success": "bool",
    "error_details": "dict",  # Only if success=False
    "user_feedback": {
        "rating": "int",  # 1-5 stars
        "timestamp": "datetime"
    }
}

MODEL_PERFORMANCE_SCHEMA = {
    "_id": "ObjectId",
    "model_id": "str",
    "date": "date",  # Daily aggregation
    "metrics": {
        "total_requests": "int",
        "successful_requests": "int",
        "failed_requests": "int",
        "avg_response_time_ms": "float",
        "total_tokens_used": "int",
        "total_cost_usd": "float",
        "avg_user_rating": "float",
        "p95_response_time_ms": "float"
    },
    "error_breakdown": {
        "timeout_errors": "int",
        "rate_limit_errors": "int",
        "api_errors": "int",
        "other_errors": "int"
    },
    "updated_at": "datetime"
}

ERROR_LOG_SCHEMA = {
    "_id": "ObjectId",
    "timestamp": "datetime",
    "session_id": "str",
    "model_used": "str",
    "error_type": "str",  # timeout, rate_limit, api_error, etc.
    "error_code": "str",
    "error_message": "str",
    "stack_trace": "str",
    "request_data": "dict",
    "retry_attempts": "int",
    "fallback_used": "bool",
    "resolved": "bool"
}
```

#### Database Migration Scripts

```python
# migrations/001_create_openrouter_collections.py
"""
Migration: Create OpenRouter Performance Tracking Collections
Date: 2025-09-26
"""

from pymongo import MongoClient
import os
from datetime import datetime, timezone

def migrate_up():
    """Create collections and indexes for OpenRouter integration."""

    client = MongoClient(os.getenv("MONGODB_URI"))
    db = client.pferdewert

    print("Creating OpenRouter performance tracking collections...")

    # Create collections with validation schemas
    db.create_collection("ai_requests", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["session_id", "timestamp", "model_used", "success"],
            "properties": {
                "session_id": {"bsonType": "string"},
                "timestamp": {"bsonType": "date"},
                "model_used": {"bsonType": "string"},
                "model_tier": {"enum": ["primary", "secondary", "tertiary", "emergency"]},
                "success": {"bsonType": "bool"},
                "response_data": {
                    "bsonType": "object",
                    "properties": {
                        "response_time_ms": {"bsonType": "int", "minimum": 0},
                        "token_usage": {
                            "bsonType": "object",
                            "properties": {
                                "total_tokens": {"bsonType": "int", "minimum": 0},
                                "cost_usd": {"bsonType": "double", "minimum": 0}
                            }
                        }
                    }
                }
            }
        }
    })

    db.create_collection("model_performance", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["model_id", "date", "metrics"],
            "properties": {
                "model_id": {"bsonType": "string"},
                "date": {"bsonType": "date"},
                "metrics": {
                    "bsonType": "object",
                    "required": ["total_requests", "successful_requests"],
                    "properties": {
                        "total_requests": {"bsonType": "int", "minimum": 0},
                        "successful_requests": {"bsonType": "int", "minimum": 0}
                    }
                }
            }
        }
    })

    db.create_collection("error_logs")

    # Create indexes
    print("Creating performance indexes...")

    # ai_requests indexes
    db.ai_requests.create_index([("timestamp", -1), ("model_used", 1)])
    db.ai_requests.create_index([("session_id", 1), ("timestamp", -1)])
    db.ai_requests.create_index([("model_used", 1), ("success", 1), ("timestamp", -1)])

    # model_performance indexes
    db.model_performance.create_index([("model_id", 1), ("date", -1)], unique=True)
    db.model_performance.create_index([("date", -1)])

    # error_logs indexes
    db.error_logs.create_index([("timestamp", -1), ("error_type", 1)])
    db.error_logs.create_index([("model_used", 1), ("timestamp", -1)])

    print("Migration completed successfully!")

    client.close()

def migrate_down():
    """Rollback migration - drop collections."""

    client = MongoClient(os.getenv("MONGODB_URI"))
    db = client.pferdewert

    print("Rolling back OpenRouter collections...")

    db.drop_collection("ai_requests")
    db.drop_collection("model_performance")
    db.drop_collection("error_logs")

    print("Rollback completed!")

    client.close()

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2 or sys.argv[1] not in ["up", "down"]:
        print("Usage: python 001_create_openrouter_collections.py [up|down]")
        sys.exit(1)

    if sys.argv[1] == "up":
        migrate_up()
    else:
        migrate_down()
```

#### Performance Tracking Service

```python
# services/performance_tracker.py
from datetime import datetime, timezone, date
from typing import Dict, Optional
from database.schemas import MongoManager
import logging

class PerformanceTracker:
    """Track and aggregate AI model performance metrics."""

    def __init__(self):
        self.mongo = MongoManager()
        self.logger = logging.getLogger(__name__)

    async def log_ai_request(
        self,
        session_id: str,
        model_used: str,
        model_tier: str,
        horse_data: Dict,
        response_data: Optional[Dict] = None,
        success: bool = True,
        error_details: Optional[Dict] = None
    ):
        """Log individual AI request for tracking."""

        document = {
            "session_id": session_id,
            "timestamp": datetime.now(timezone.utc),
            "model_used": model_used,
            "model_tier": model_tier,
            "horse_data": self._sanitize_horse_data(horse_data),
            "success": success
        }

        if response_data:
            document["response_data"] = response_data

        if error_details:
            document["error_details"] = error_details

        try:
            self.mongo.db.ai_requests.insert_one(document)
        except Exception as e:
            self.logger.error(f"Failed to log AI request: {str(e)}")

    async def log_error(
        self,
        session_id: str,
        model_used: str,
        error_type: str,
        error_code: str,
        error_message: str,
        retry_attempts: int = 0,
        fallback_used: bool = False
    ):
        """Log error for analysis and alerting."""

        document = {
            "timestamp": datetime.now(timezone.utc),
            "session_id": session_id,
            "model_used": model_used,
            "error_type": error_type,
            "error_code": error_code,
            "error_message": error_message,
            "retry_attempts": retry_attempts,
            "fallback_used": fallback_used,
            "resolved": fallback_used
        }

        try:
            self.mongo.db.error_logs.insert_one(document)
        except Exception as e:
            self.logger.error(f"Failed to log error: {str(e)}")

    async def aggregate_daily_performance(self, target_date: date = None):
        """Aggregate daily performance metrics for each model."""

        if target_date is None:
            target_date = date.today()

        # Aggregation pipeline for daily metrics
        pipeline = [
            {
                "$match": {
                    "timestamp": {
                        "$gte": datetime.combine(target_date, datetime.min.time()).replace(tzinfo=timezone.utc),
                        "$lt": datetime.combine(target_date, datetime.max.time()).replace(tzinfo=timezone.utc)
                    }
                }
            },
            {
                "$group": {
                    "_id": "$model_used",
                    "total_requests": {"$sum": 1},
                    "successful_requests": {"$sum": {"$cond": ["$success", 1, 0]}},
                    "failed_requests": {"$sum": {"$cond": ["$success", 0, 1]}},
                    "avg_response_time": {"$avg": "$response_data.response_time_ms"},
                    "total_tokens": {"$sum": "$response_data.token_usage.total_tokens"},
                    "total_cost": {"$sum": "$response_data.token_usage.cost_usd"},
                    "response_times": {"$push": "$response_data.response_time_ms"}
                }
            }
        ]

        results = list(self.mongo.db.ai_requests.aggregate(pipeline))

        # Save aggregated metrics
        for result in results:
            model_id = result["_id"]

            # Calculate P95 response time
            response_times = [rt for rt in result.get("response_times", []) if rt is not None]
            p95_response_time = self._calculate_percentile(response_times, 95) if response_times else 0

            # Aggregate error breakdown
            error_breakdown = await self._get_error_breakdown(model_id, target_date)

            document = {
                "model_id": model_id,
                "date": target_date,
                "metrics": {
                    "total_requests": result["total_requests"],
                    "successful_requests": result["successful_requests"],
                    "failed_requests": result["failed_requests"],
                    "avg_response_time_ms": result.get("avg_response_time", 0),
                    "total_tokens_used": result.get("total_tokens", 0),
                    "total_cost_usd": result.get("total_cost", 0),
                    "p95_response_time_ms": p95_response_time
                },
                "error_breakdown": error_breakdown,
                "updated_at": datetime.now(timezone.utc)
            }

            # Upsert daily performance record
            self.mongo.db.model_performance.replace_one(
                {"model_id": model_id, "date": target_date},
                document,
                upsert=True
            )

    async def _get_error_breakdown(self, model_id: str, target_date: date) -> Dict[str, int]:
        """Get error breakdown for a specific model and date."""

        pipeline = [
            {
                "$match": {
                    "model_used": model_id,
                    "timestamp": {
                        "$gte": datetime.combine(target_date, datetime.min.time()).replace(tzinfo=timezone.utc),
                        "$lt": datetime.combine(target_date, datetime.max.time()).replace(tzinfo=timezone.utc)
                    }
                }
            },
            {
                "$group": {
                    "_id": "$error_type",
                    "count": {"$sum": 1}
                }
            }
        ]

        results = list(self.mongo.db.error_logs.aggregate(pipeline))

        error_breakdown = {
            "timeout_errors": 0,
            "rate_limit_errors": 0,
            "api_errors": 0,
            "other_errors": 0
        }

        for result in results:
            error_type = result["_id"]
            count = result["count"]

            if error_type in ["timeout", "read_timeout", "connect_timeout"]:
                error_breakdown["timeout_errors"] += count
            elif error_type in ["rate_limit", "429"]:
                error_breakdown["rate_limit_errors"] += count
            elif error_type in ["api_error", "http_error"]:
                error_breakdown["api_errors"] += count
            else:
                error_breakdown["other_errors"] += count

        return error_breakdown

    def _sanitize_horse_data(self, horse_data: Dict) -> Dict:
        """Remove sensitive data from horse data before logging."""
        # Remove any potentially sensitive fields
        safe_fields = [
            "alter", "geschlecht", "rasse", "haupteignung",
            "ausbildungsstand", "gesundheitszustand", "besonderheiten"
        ]

        return {k: v for k, v in horse_data.items() if k in safe_fields}

    def _calculate_percentile(self, values: list, percentile: int) -> float:
        """Calculate percentile for response time analysis."""
        if not values:
            return 0.0

        sorted_values = sorted(values)
        index = int((percentile / 100) * len(sorted_values))
        index = min(index, len(sorted_values) - 1)

        return float(sorted_values[index])
```

### 4. Enhanced API Design

#### Updated Main Application

```python
# main.py (Enhanced sections)
from fastapi import FastAPI, HTTPException, BackgroundTasks
from contextlib import asynccontextmanager
from ai_clients.ai_service import AIService
from services.performance_tracker import PerformanceTracker
import logging

# Global service instances
ai_service = None
performance_tracker = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management."""
    global ai_service, performance_tracker

    # Startup
    logging.info("Initializing AI services...")
    ai_service = AIService()
    performance_tracker = PerformanceTracker()

    # Validate configuration
    await validate_configuration()

    yield

    # Shutdown
    logging.info("Shutting down AI services...")
    if hasattr(ai_service, 'openrouter_client') and ai_service.openrouter_client:
        await ai_service.openrouter_client.session.aclose()

app = FastAPI(lifespan=lifespan)

@app.post("/ai-valuation")
async def ai_valuation(request: HorseValuationRequest, background_tasks: BackgroundTasks):
    """Enhanced AI valuation endpoint with comprehensive tracking."""

    session_id = request.session_id
    horse_data = request.model_dump()

    try:
        # Generate system prompt and user message
        system_prompt = generate_system_prompt()
        user_message = format_horse_data_for_ai(horse_data)

        # Generate valuation using 4-stage fallback
        ai_response, model_used, metadata = await ai_service.generate_horse_valuation(
            horse_data=horse_data,
            system_prompt=system_prompt,
            user_message=user_message
        )

        # Log successful request
        background_tasks.add_task(
            performance_tracker.log_ai_request,
            session_id=session_id,
            model_used=model_used,
            model_tier=metadata.get("model_tier", "unknown"),
            horse_data=horse_data,
            response_data=metadata,
            success=True
        )

        # Return modernized response format
        return {
            "ai_response": ai_response,
            "ai_model": model_used,
            "response_time_ms": metadata.get("response_time_ms"),
            "token_usage": metadata.get("token_usage")
        }

    except Exception as e:
        # Log error
        background_tasks.add_task(
            performance_tracker.log_error,
            session_id=session_id,
            model_used="unknown",
            error_type=type(e).__name__,
            error_code="ai_generation_failed",
            error_message=str(e)
        )

        # Return error response
        raise HTTPException(
            status_code=500,
            detail="AI service is temporarily unavailable. Please try again in a few moments."
        )

# Admin endpoints for monitoring
@app.get("/admin/model-performance")
async def get_model_performance(days: int = 7):
    """Get model performance metrics for admin dashboard."""

    # This would fetch aggregated performance data
    # Implementation depends on specific monitoring needs

    from datetime import date, timedelta

    results = []
    for i in range(days):
        target_date = date.today() - timedelta(days=i)

        daily_metrics = list(performance_tracker.mongo.db.model_performance.find({
            "date": target_date
        }))

        results.extend(daily_metrics)

    return {"performance_data": results}

@app.get("/health/openrouter")
async def health_check_openrouter():
    """Health check endpoint for OpenRouter connectivity."""

    try:
        # Simple connectivity test
        if not ai_service.openrouter_client:
            return {"status": "disabled", "message": "OpenRouter client not initialized"}

        # Test with minimal request
        test_messages = [{"role": "user", "content": "Hello"}]

        async with ai_service.openrouter_client as client:
            response = await client.chat_completion(
                model="google/gemini-2.5-pro",
                messages=test_messages,
                max_tokens=5
            )

        return {
            "status": "healthy",
            "response_time_ms": response.response_time_ms,
            "model": response.model
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "fallback_available": bool(ai_service.legacy_claude_client or ai_service.legacy_openai_client)
        }

async def validate_configuration():
    """Validate environment configuration on startup."""

    import os

    required_vars = ["OPENROUTER_API_KEY", "MONGODB_URI"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        raise ValueError(f"Missing required environment variables: {missing_vars}")

    # Test database connection
    try:
        performance_tracker.mongo.client.admin.command('ping')
        logging.info("MongoDB connection successful")
    except Exception as e:
        logging.error(f"MongoDB connection failed: {str(e)}")
        raise

    # Test OpenRouter connection
    if os.getenv("USE_OPENROUTER", "").lower() == "true":
        try:
            # Initialize but don't test full request during startup
            ai_service._initialize_clients()
            logging.info("OpenRouter client initialized")
        except Exception as e:
            logging.warning(f"OpenRouter initialization failed: {str(e)}")
```

### 5. Deployment & DevOps

#### Render Environment Variables

```bash
# render-env-production.sh
# OpenRouter Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
USE_OPENROUTER=true

# Model Selection
PRIMARY_MODEL=google/gemini-2.5-pro
FALLBACK_MODEL=anthropic/claude-3.5-sonnet
TERTIARY_MODEL=openai/gpt-4o

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pferdewert?retryWrites=true&w=majority

# Legacy Fallback (Optional)
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here

# Application Settings
LOG_LEVEL=INFO
ENVIRONMENT=production

# Performance Monitoring
ENABLE_PERFORMANCE_TRACKING=true
DAILY_AGGREGATION_HOUR=2  # 2 AM UTC for daily metrics aggregation
```

#### Health Check Implementation

```python
# services/health_monitor.py
import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List
from dataclasses import dataclass

@dataclass
class HealthStatus:
    service: str
    status: str  # healthy, degraded, unhealthy
    response_time_ms: int
    last_check: datetime
    error_message: str = None

class HealthMonitor:
    """Comprehensive health monitoring for AI services."""

    def __init__(self, ai_service, performance_tracker):
        self.ai_service = ai_service
        self.performance_tracker = performance_tracker
        self.logger = logging.getLogger(__name__)

        self.health_history = []
        self.alert_thresholds = {
            "response_time_ms": 15000,  # 15 seconds
            "error_rate_percent": 10,   # 10% error rate
            "consecutive_failures": 3    # 3 consecutive failures
        }

    async def check_all_services(self) -> Dict[str, HealthStatus]:
        """Check health of all AI services."""

        results = {}

        # Check OpenRouter models
        for model_id in self.ai_service.model_manager.get_fallback_chain():
            results[f"openrouter_{model_id}"] = await self._check_openrouter_model(model_id)

        # Check legacy clients
        if self.ai_service.legacy_claude_client:
            results["legacy_claude"] = await self._check_legacy_claude()

        if self.ai_service.legacy_openai_client:
            results["legacy_openai"] = await self._check_legacy_openai()

        # Check database
        results["mongodb"] = await self._check_mongodb()

        # Store health history
        self.health_history.append({
            "timestamp": datetime.utcnow(),
            "results": results
        })

        # Keep only last 24 hours of history
        cutoff = datetime.utcnow() - timedelta(hours=24)
        self.health_history = [
            h for h in self.health_history
            if h["timestamp"] > cutoff
        ]

        return results

    async def _check_openrouter_model(self, model_id: str) -> HealthStatus:
        """Check health of specific OpenRouter model."""

        start_time = datetime.utcnow()

        try:
            test_messages = [{"role": "user", "content": "Test"}]

            async with self.ai_service.openrouter_client as client:
                response = await asyncio.wait_for(
                    client.chat_completion(
                        model=model_id,
                        messages=test_messages,
                        max_tokens=5
                    ),
                    timeout=10.0
                )

            response_time = (datetime.utcnow() - start_time).total_seconds() * 1000

            return HealthStatus(
                service=f"openrouter_{model_id}",
                status="healthy",
                response_time_ms=int(response_time),
                last_check=datetime.utcnow()
            )

        except asyncio.TimeoutError:
            return HealthStatus(
                service=f"openrouter_{model_id}",
                status="unhealthy",
                response_time_ms=10000,  # Timeout value
                last_check=datetime.utcnow(),
                error_message="Request timeout"
            )

        except Exception as e:
            return HealthStatus(
                service=f"openrouter_{model_id}",
                status="unhealthy",
                response_time_ms=0,
                last_check=datetime.utcnow(),
                error_message=str(e)
            )

    async def _check_mongodb(self) -> HealthStatus:
        """Check MongoDB connectivity and performance."""

        start_time = datetime.utcnow()

        try:
            # Simple ping test
            await asyncio.get_event_loop().run_in_executor(
                None,
                self.performance_tracker.mongo.client.admin.command,
                'ping'
            )

            response_time = (datetime.utcnow() - start_time).total_seconds() * 1000

            return HealthStatus(
                service="mongodb",
                status="healthy",
                response_time_ms=int(response_time),
                last_check=datetime.utcnow()
            )

        except Exception as e:
            return HealthStatus(
                service="mongodb",
                status="unhealthy",
                response_time_ms=0,
                last_check=datetime.utcnow(),
                error_message=str(e)
            )

    def get_overall_health(self) -> str:
        """Get overall system health status."""

        if not self.health_history:
            return "unknown"

        latest_results = self.health_history[-1]["results"]

        # Check for any unhealthy services
        unhealthy_services = [
            service for service, status in latest_results.items()
            if status.status == "unhealthy"
        ]

        if unhealthy_services:
            # If primary OpenRouter model is down but fallbacks work, status is degraded
            primary_model = self.ai_service.model_manager.get_active_model()
            primary_service = f"openrouter_{primary_model}"

            if primary_service in unhealthy_services:
                # Check if any fallback is healthy
                healthy_fallbacks = [
                    service for service, status in latest_results.items()
                    if status.status == "healthy" and service.startswith("openrouter_")
                ]

                if healthy_fallbacks:
                    return "degraded"
                else:
                    return "unhealthy"
            else:
                return "degraded"

        return "healthy"
```

#### Rollback Strategy

```python
# scripts/rollback_openrouter.py
"""
Emergency rollback script for OpenRouter integration.
This script reverts to legacy API clients and updates environment variables.
"""

import os
import logging
from typing import Dict

class OpenRouterRollback:
    """Handle emergency rollback from OpenRouter to legacy clients."""

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def execute_rollback(self) -> Dict[str, str]:
        """Execute complete rollback to legacy clients."""

        self.logger.info("Starting OpenRouter rollback...")

        rollback_status = {}

        try:
            # Step 1: Disable OpenRouter
            os.environ["USE_OPENROUTER"] = "false"
            rollback_status["openrouter_disabled"] = "success"

            # Step 2: Validate legacy client credentials
            claude_key = os.getenv("ANTHROPIC_API_KEY")
            openai_key = os.getenv("OPENAI_API_KEY")

            if not claude_key and not openai_key:
                raise ValueError("No legacy API keys available for rollback")

            # Step 3: Update model configuration to legacy
            if claude_key:
                os.environ["PRIMARY_MODEL"] = "claude-3.5-sonnet"
                rollback_status["primary_model"] = "claude-3.5-sonnet"
            elif openai_key:
                os.environ["PRIMARY_MODEL"] = "gpt-4o"
                rollback_status["primary_model"] = "gpt-4o"

            # Step 4: Clear OpenRouter-specific configuration
            openrouter_vars = [
                "OPENROUTER_API_KEY",
                "FALLBACK_MODEL",
                "TERTIARY_MODEL"
            ]

            for var in openrouter_vars:
                if var in os.environ:
                    del os.environ[var]

            rollback_status["config_cleanup"] = "success"

            # Step 5: Log rollback event
            self.logger.info("OpenRouter rollback completed successfully")
            rollback_status["rollback_status"] = "completed"

            return rollback_status

        except Exception as e:
            self.logger.error(f"Rollback failed: {str(e)}")
            rollback_status["rollback_status"] = "failed"
            rollback_status["error"] = str(e)
            return rollback_status

    def validate_legacy_functionality(self) -> bool:
        """Test that legacy clients are working after rollback."""

        try:
            # This would be called after rollback to ensure everything works
            from ai_clients.legacy_clients import LegacyClaudeClient, LegacyOpenAIClient

            claude_key = os.getenv("ANTHROPIC_API_KEY")
            if claude_key:
                client = LegacyClaudeClient(claude_key)
                # Test minimal request
                # ... implementation details

            return True

        except Exception as e:
            self.logger.error(f"Legacy validation failed: {str(e)}")
            return False

# CLI script for emergency rollback
if __name__ == "__main__":
    import sys

    logging.basicConfig(level=logging.INFO)
    rollback = OpenRouterRollback()

    print("🚨 Emergency OpenRouter Rollback")
    print("This will disable OpenRouter and revert to legacy API clients.")

    if len(sys.argv) > 1 and sys.argv[1] == "--force":
        proceed = True
    else:
        confirm = input("Are you sure you want to proceed? (yes/no): ")
        proceed = confirm.lower() == "yes"

    if proceed:
        result = rollback.execute_rollback()

        if result["rollback_status"] == "completed":
            print("✅ Rollback completed successfully")
            print(f"Primary model set to: {result.get('primary_model', 'unknown')}")

            # Validate functionality
            if rollback.validate_legacy_functionality():
                print("✅ Legacy clients validated and working")
            else:
                print("⚠️  Legacy client validation failed - manual intervention required")
        else:
            print("❌ Rollback failed:")
            print(f"Error: {result.get('error', 'Unknown error')}")
            sys.exit(1)
    else:
        print("Rollback cancelled")
```

---

**Version**: 1.2
**Erstellt**: 25. September 2025
**Aktualisiert**: 26. September 2025
**Status**: Draft - Erweitert um detaillierte Backend-Architektur