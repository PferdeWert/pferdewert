# Gemini CLI Setup für PferdeWert - Token-Einsparung

## Installation & Authentifizierung ✅
```bash
# Installation
npm install -g @google/gemini-cli

# Test
gemini --version  # 0.1.17

# Authentifizierung (beim ersten Aufruf)
GOOGLE_GENAI_USE_GCA=true gemini -p "Hello, world!"
# → Browser-Auth mit Google Account
# → 1.000 kostenlose Requests/Tag
```

## Konfiguration
**~/.gemini/settings.json:**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    },
    "filesystem": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "FILESYSTEM_ALLOWED_PATHS": "/Users/benjaminreder/Desktop:/Users/benjaminreder/Downloads"
      }
    }
  },
  "usageStatisticsEnabled": false
}
```

**~/.gemini/.env:**
```bash
GOOGLE_GENAI_USE_GCA=true
```

## Token-Einsparung Strategie

### Gemini CLI → Einfache Tasks (kostenlos)
- Code-Refactoring
- Tests schreiben
- Dokumentation
- Bug-Fixes
- TypeScript-Typen
- ESLint-Fixes

### Claude Code → Komplexe Tasks (Token-intensiv)
- Architektur-Entscheidungen
- Performance-Optimierung
- AI-Integration (OpenAI/Claude APIs)
- Specialized Agents (pferdewert-*)
- Komplexe Business Logic

## Nächste Schritte - MORGEN

### 1. CLAUDE.md Integration
- [ ] Gemini CLI Section unter "MCP Server Integration Status"
- [ ] Token-Einsparung Workflow dokumentieren
- [ ] Beispiele für Task-Verteilung

### 2. Agent Integration
- [ ] Specialized Agents erweitern um Gemini CLI Option
- [ ] pferdewert-frontend-dev: Einfache React Tasks → Gemini
- [ ] pferdewert-debugger: Simple Fixes → Gemini
- [ ] Task-Routing Logic entwickeln

### 3. Projekt-Setup
```bash
cd pferdewert
mkdir -p .gemini
# MongoDB MCP für PferdeWert DB hinzufügen
# Stripe MCP für Payment-Tests
# Context7 für aktuelle Docs
```

### 4. Workflow Automation
```bash
# Beispiel: Lint-Fixes automatisch
gemini -p "Fix all ESLint errors in frontend/components/"

# Beispiel: Test-Generation
gemini -p "Generate unit tests for this React component"
```

## Kostenvergleich
- **Gemini CLI**: 1.000 Requests/Tag KOSTENLOS
- **Claude Code**: ~$20-50/Monat für intensive Nutzung
- **Einsparung**: 60-80% der Claude Tokens für Routine-Tasks

## Status: READY TO USE ✅
Authentication erfolgreich, MCP Server konfiguriert, erste Tests bestanden.