# Technical SEO Audit - PferdeWert.de

## Zweck
Umfassende technische SEO-Analyse der PferdeWert.de Website mit automatisierter Problemerkennung und priorisierten Handlungsempfehlungen.

## Prozess-Übersicht

### Input
- **Domain**: pferdewert.de (oder spezifische Subdomain/Sektion)
- **Optional**: Spezifischer Keyword-Fokus für Content-Audit

### Output-Struktur
```
SEO/SEO-AUDIT/{keyword}/
├── technical-audit-{date}.md
├── lighthouse-scores-{date}.json
├── onpage-issues-{date}.json
└── action-items-{date}.md
```

---

## Audit-Workflow

### Schritt 1: Website Mapping
**Tool**: Firecrawl MCP (`firecrawl_map`)

**Zweck**: Vollständige Erfassung aller URLs der Website

**Aktionen**:
1. Führe `firecrawl_map` für die Zieldomain aus
2. Extrahiere alle gefundenen URLs (intern)
3. Kategorisiere URLs nach Typ:
   - Hauptseiten (Homepage, Bewertungsformular)
   - Ratgeber-Artikel
   - Informationsseiten (Über uns, Datenschutz)
   - Technische Seiten (API-Dokumentation)
4. Erstelle URL-Inventar mit Metadaten

**Speicherung**: `url-inventory-{date}.json`

---

### Schritt 2: URL-Priorisierung
**Tool**: Claude Code AI-Analyse

**Zweck**: URLs nach Geschäftswichtigkeit und SEO-Potenzial bewerten

**Bewertungskriterien**:
- **Business Critical** (Prio 1): Homepage, Bewertungsformular, Checkout
- **High Value** (Prio 2): Top-Ratgeber, Service-Seiten
- **Medium Value** (Prio 3): Zusätzliche Ratgeber, Informationsseiten
- **Low Priority** (Prio 4): Footer-Links, technische Seiten

**Claude-Analyse**:
- Identifiziere revenue-generating pages
- Erkenne high-traffic potential pages (Ratgeber)
- Markiere conversion-kritische Seiten

**Output**: Priorisierte URL-Liste für tiefgreifende Analyse

---

### Schritt 3: OnPage-Analyse
**API**: DataForSEO `/api/seo/onpage-pages`

**Zweck**: Technische OnPage-Faktoren jeder wichtigen URL prüfen

**Zu analysierende Metriken**:
1. **Meta-Tags**:
   - Title-Tag (Länge, Keyword-Platzierung)
   - Meta Description (Länge, Call-to-Action)
   - Canonical Tags
   - Hreflang-Attribute (für DACH-Regionen)

2. **Heading-Struktur**:
   - H1-Tag (Eindeutigkeit, Keyword-Nutzung)
   - H2-H3 Hierarchie
   - Keyword-Verteilung in Headings

3. **Content-Qualität**:
   - Wortanzahl pro Seite
   - Keyword-Dichte
   - Duplicate Content Detection
   - Interne Link-Struktur

4. **Technische Faktoren**:
   - HTTPS-Status
   - Redirect-Ketten
   - 404-Fehler
   - Broken Internal Links
   - Image Alt-Attribute

5. **Mobile Optimization**:
   - Viewport Meta-Tag
   - Font-Größen
   - Touch-Target-Größen

**API Call Beispiel**:
```json
POST /api/seo/onpage-pages
{
  "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen",
  "enable_javascript": true,
  "custom_user_agent": "Mozilla/5.0..."
}
```

**Speicherung**: `onpage-issues-{date}.json`

---

### Schritt 4: Lighthouse Performance-Audit
**API**: DataForSEO `/api/seo/lighthouse`

**Zweck**: Core Web Vitals und Performance-Metriken erfassen

**Zu erfassende Metriken**:
1. **Core Web Vitals**:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay) / INP (Interaction to Next Paint)
   - CLS (Cumulative Layout Shift)

2. **Performance Scores**:
   - Performance (0-100)
   - Accessibility (0-100)
   - Best Practices (0-100)
   - SEO (0-100)

3. **Spezifische Checks**:
   - Image Optimization
   - JavaScript/CSS Minification
   - Render-Blocking Resources
   - Server Response Time
   - Caching-Strategien

**API Call Beispiel**:
```json
POST /api/seo/lighthouse
{
  "url": "https://pferdewert.de",
  "categories": ["performance", "accessibility", "best-practices", "seo"],
  "device": "mobile"
}
```

**Speicherung**: `lighthouse-scores-{date}.json`

---

### Schritt 5: Problem-Kategorisierung
**Tool**: Claude Code AI-Analyse

**Zweck**: Gefundene Issues nach Schweregrad und Business-Impact klassifizieren

**Kategorien**:
1. **CRITICAL** (Sofort beheben):
   - Broken pages (404/500 errors) auf wichtigen URLs
   - Fehlende/doppelte Title-Tags auf Prio-1-Seiten
   - Core Web Vitals deutlich unter Grenzwerten
   - Mobile Usability Issues auf conversion-kritischen Seiten
   - HTTPS-Probleme

2. **WARNING** (Kurzfristig beheben):
   - Suboptimale Meta-Descriptions
   - H1-Duplikate
   - Langsame Ladezeiten (nicht kritisch)
   - Fehlende Alt-Attribute auf wichtigen Bildern
   - Redirect-Ketten

3. **INFO** (Langfristig optimieren):
   - Keyword-Optimierungspotenzial
   - Interne Linking-Verbesserungen
   - Content-Erweiterungsmöglichkeiten
   - Schema-Markup-Optimierungen

**Claude-Analyse**:
- Priorisiere nach Business-Impact
- Identifiziere Quick Wins (hoher Impact, geringer Aufwand)
- Erkenne systematische Probleme (betreffen mehrere Seiten)

---

### Schritt 6: Report-Generierung
**Tool**: Claude Code Content Generation

**Zweck**: Umfassender, actionable Technical SEO Report

**Report-Struktur**:

```markdown
# Technical SEO Audit Report - PferdeWert.de
## Audit-Datum: {timestamp}
## Analysierte URLs: {url_count}

---

## Executive Summary
- **Gesamt-Health-Score**: X/100
- **Kritische Issues**: X
- **Warnings**: X
- **Optimierungspotenzial**: X

### Top 3 Handlungsempfehlungen
1. [CRITICAL Issue mit höchstem Business-Impact]
2. [Quick Win mit hohem ROI]
3. [Systematisches Problem mit Skalierungspotenzial]

---

## 1. Core Web Vitals Performance

### Mobile Performance
- LCP: X.Xs (Ziel: <2.5s)
- INP: Xms (Ziel: <200ms)
- CLS: X.XX (Ziel: <0.1)

### Desktop Performance
- LCP: X.Xs
- INP: Xms
- CLS: X.XX

**Kritische Findings**:
- [Liste spezifischer Performance-Issues]

---

## 2. OnPage SEO Issues

### CRITICAL
| URL | Issue | Impact | Empfehlung |
|-----|-------|--------|------------|
| /page1 | Fehlender Title-Tag | Hoch | Title-Tag ergänzen mit Primary Keyword |
| /page2 | Doppelter H1 | Mittel | H1-Duplikat entfernen |

### WARNING
[Tabelle mit Warning-Level Issues]

### INFO
[Tabelle mit Optimierungspotenzial]

---

## 3. Technical SEO Health

### Indexierung
- Indexierbare Seiten: X
- Noindex-Seiten: X
- Robots.txt-Blockierungen: X

### Crawlability
- Broken Links: X
- Redirect-Ketten: X
- Orphan Pages: X

### Mobile Optimization
- Mobile-Friendly Score: X/100
- Viewport Issues: X
- Touch-Target-Probleme: X

---

## 4. Content-Analyse

### Keyword-Optimierung
- Seiten mit optimaler Keyword-Dichte: X%
- Seiten mit Thin Content (<300 Wörter): X
- Duplicate Content Issues: X

### Heading-Struktur
- Seiten ohne H1: X
- Seiten mit mehreren H1: X
- Heading-Hierarchie-Probleme: X

---

## 5. Priorisierte Action Items

### Sprint 1 (Woche 1) - CRITICAL Fixes
1. **Fix broken pages**
   - Betroffene URLs: [Liste]
   - Geschätzter Aufwand: X Stunden
   - Business-Impact: Hoch

2. **Title-Tag-Optimierung**
   - Betroffene URLs: [Liste]
   - Geschätzter Aufwand: X Stunden
   - Business-Impact: Hoch

### Sprint 2 (Woche 2-3) - WARNING Fixes
[Liste mit priorisierten WARNING-Issues]

### Backlog - Langfristige Optimierungen
[Liste mit INFO-Level Optimierungen]

---

## 6. Monitoring-Empfehlungen

### Zu trackende Metriken
1. Core Web Vitals (wöchentlich via Lighthouse)
2. Indexierungsstatus (täglich via Search Console)
3. Crawl-Errors (wöchentlich)
4. Page Speed Scores (monatlich)

### Automatisierung
- Lighthouse-Audit alle 7 Tage
- OnPage-Check für neue Ratgeber-Seiten
- Broken Link Check alle 14 Tage
```

**Speicherung**: `technical-audit-{date}.md`

---

### Schritt 7: Action Items Generierung
**Tool**: Claude Code Task Planning

**Zweck**: Konkrete, umsetzbare Handlungsempfehlungen mit Aufwandsschätzung

**Action Item Format**:
```markdown
## Action Item #1: [Issue-Titel]

### Problem-Beschreibung
[Detaillierte Beschreibung des gefundenen Problems]

### Betroffene URLs
- URL 1
- URL 2
- ...

### Business-Impact
- **SEO-Impact**: Hoch/Mittel/Niedrig
- **User Experience**: Hoch/Mittel/Niedrig
- **Conversion-Impact**: Hoch/Mittel/Niedrig

### Lösungsansatz
[Schritt-für-Schritt-Anleitung zur Behebung]

### Technische Umsetzung
```typescript
// Code-Beispiel oder Konfiguration
```

### Aufwandsschätzung
- **Entwicklungszeit**: X Stunden
- **Testing**: X Stunden
- **Deployment**: X Minuten

### Success Metrics
- [KPI 1]: Aktuell X → Ziel Y
- [KPI 2]: Aktuell X → Ziel Y

### Dependencies
- [Optional: Abhängigkeiten zu anderen Action Items]
```

**Speicherung**: `action-items-{date}.md`

---

## Ausführungs-Checkliste

Wenn `/seo-audit` ausgeführt wird:

- [ ] **1. Website Mapping**
  - [ ] firecrawl_map für Domain ausführen
  - [ ] URL-Inventar erstellen
  - [ ] Speichere url-inventory-{date}.json

- [ ] **2. URL-Priorisierung**
  - [ ] URLs nach Business-Wichtigkeit klassifizieren
  - [ ] Top 20 URLs für Deep-Analysis identifizieren

- [ ] **3. OnPage-Analyse**
  - [ ] Für jede Prio-1/2 URL: /api/seo/onpage-pages aufrufen
  - [ ] Meta-Tags, Headings, Content analysieren
  - [ ] Speichere onpage-issues-{date}.json

- [ ] **4. Lighthouse-Audit**
  - [ ] Für Top-10 URLs: /api/seo/lighthouse aufrufen (Mobile + Desktop)
  - [ ] Core Web Vitals erfassen
  - [ ] Speichere lighthouse-scores-{date}.json

- [ ] **5. Problem-Kategorisierung**
  - [ ] Alle Issues nach CRITICAL/WARNING/INFO klassifizieren
  - [ ] Business-Impact bewerten
  - [ ] Quick Wins identifizieren

- [ ] **6. Report-Generierung**
  - [ ] Comprehensive Markdown-Report erstellen
  - [ ] Executive Summary mit Top-3-Empfehlungen
  - [ ] Speichere technical-audit-{date}.md

- [ ] **7. Action Items**
  - [ ] Für Top-10 Issues: Detaillierte Action Items erstellen
  - [ ] Aufwandsschätzungen hinzufügen
  - [ ] Speichere action-items-{date}.md

---

## API-Integration Details

### DataForSEO OnPage API
```json
{
  "endpoint": "/api/seo/onpage-pages",
  "method": "POST",
  "required_params": {
    "url": "string",
    "enable_javascript": true
  },
  "response_data": {
    "meta": {
      "title": "string",
      "description": "string",
      "canonical": "string"
    },
    "page_metrics": {
      "internal_links_count": "number",
      "external_links_count": "number",
      "broken_links": "array"
    },
    "content": {
      "plain_text_word_count": "number",
      "duplicate_content": "boolean"
    }
  }
}
```

### DataForSEO Lighthouse API
```json
{
  "endpoint": "/api/seo/lighthouse",
  "method": "POST",
  "required_params": {
    "url": "string",
    "categories": ["performance", "accessibility", "best-practices", "seo"],
    "device": "mobile"
  },
  "response_data": {
    "lighthouseResult": {
      "categories": {
        "performance": { "score": 0.95 },
        "accessibility": { "score": 0.88 },
        "best-practices": { "score": 0.92 },
        "seo": { "score": 0.90 }
      },
      "audits": {
        "largest-contentful-paint": { "numericValue": 2100 },
        "cumulative-layout-shift": { "numericValue": 0.05 }
      }
    }
  }
}
```

### Firecrawl Map API
```javascript
// Via MCP firecrawl_map tool
{
  "url": "https://pferdewert.de",
  "options": {
    "includeSubdomains": false,
    "limit": 1000,
    "ignoreQueryParameters": true
  }
}
```

---

## Nutzungsbeispiel

```bash
# Slash Command ausführen
/seo-audit

# Optional: Mit spezifischem Keyword-Fokus
/seo-audit pferd-kaufen
```

Das System wird dann:
1. Die Website vollständig mappen
2. Alle kritischen Seiten analysieren
3. Performance-Metriken erfassen
4. Einen umfassenden Report generieren
5. Priorisierte Action Items erstellen

Alle Ergebnisse werden in `SEO/SEO-AUDIT/{keyword}/` gespeichert.

---

## Quality Metrics

### Erfolgreicher Audit-Run
- **URL Coverage**: >95% der wichtigen Seiten analysiert
- **API Success Rate**: >90% erfolgreiche API-Calls
- **Lighthouse Data**: Mobile + Desktop für Top-10 URLs
- **Action Items**: Mindestens 3 CRITICAL + 5 WARNING Items identifiziert

### Report-Qualität
- **Actionability**: Jedes Issue hat konkrete Lösungsempfehlung
- **Priorisierung**: Issues nach Business-Impact sortiert
- **Aufwandsschätzung**: Realistische Time-Estimates für Fixes
- **Messbarkeit**: Success Metrics für jedes Action Item definiert
