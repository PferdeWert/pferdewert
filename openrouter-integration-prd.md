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

## Deliverables

### Code Deliverables
- [ ] `ai_clients/openrouter_client.py` - OpenRouter API Client
- [ ] `config/models.py` - Modellkonfiguration
- [ ] Updated `main.py` mit OpenRouter Integration
- [ ] Comprehensive Unit & Integration Tests

### Documentation
- [ ] API-Dokumentation für neue Konfiguration
- [ ] Migration-Runbook für Production-Deployment
- [ ] Monitoring-Playbook für Support-Team
- [ ] Cost-Analysis-Report

### Testing
- [ ] A/B-Testing-Framework
- [ ] Performance-Benchmarks
- [ ] Quality-Assurance-Tests mit Experten-Review
- [ ] Load-Testing für OpenRouter Integration

---

**Version**: 1.0
**Erstellt**: 25. September 2025
**Status**: Draft - Bereit für Review und Implementierung