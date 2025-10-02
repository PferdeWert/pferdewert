# SEO Process für PferdeWert.de - Optimiert für Claude Code + Bordmittel

## Verfügbare Tools
- **Claude Code**: AI-gestützte Analyse und Content-Erstellung
- **DataForSEO API**: Keyword Research, SERP Analysis, On-Page Audit (via `/api/seo/*` Endpoints)
- **Firecrawl MCP**: Website Scraping und Content-Extraktion
- **File Storage**: JSON/MD-Dateien für Datenablage und Prozess-Tracking

---

## Prozess 0: SEO Unternehmensbeschreibung (EINMALIG ERSTELLT)

### Status: ✅ ABGESCHLOSSEN
Das Company Profile wurde bereits erstellt und wird von allen Content-Prozessen wiederverwendet.

### Zweck
Nutzbaren Keyword-Filter auf Basis des Webauftritts formulieren und Unternehmensprofil für SEO-Arbeit definieren.

### Verfügbare Assets
```
SEO/company/
├── company-profile-{date}.md      # ✅ Erstellt
├── keyword-filters-{date}.json    # ✅ Erstellt
└── brand-exclusions-{date}.json   # ✅ Erstellt
```

**Verwendung**: Alle Content-Prozesse (1,2,3,6) laden automatisch das existierende Company Profile.

---

## Prozess 1: Seed Keywords & Regionale Fokussierung

### Zweck
Generierung und Verfeinerung von Seed Keywords mit regionalem Fokus für deutsche Pferdemärkte.

### Schritte mit Claude Code
1. **Company Profile laden**: ✅ Existierende `SEO/company/company-profile-{date}.md` verwenden
2. **Keyword-Filter anwenden**: Ausschlusskriterien aus Company Profile beachten
3. **Seed Keyword Brainstorming**: Claude generiert Keywords basierend auf Content-Fokus aus Profil
4. **DataForSEO Keyword Ideas**: API Call via `/api/seo/keyword-ideas` für Keyword-Expansion
5. **Regionale Anpassung**: Keywords für definierte Regionen aus Company Profile erweitern
6. **Speicherung**: Ergebnisse in `SEO/SEO-CONTENT/{keyword}/seed-keywords-{date}.json` ablegen

### Input/Output
- **Input**: ✅ Bereits vorhandenes Company Profile aus `SEO/company/`, Target Keyword
- **Output**: JSON-Datei mit strukturierten Seed Keywords inkl. Search Volume

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── seed-keywords.json
├── regional-keywords-{region}.json
└── keyword-analysis.md
```

---

## Prozess 2: Automatisiertes Keyword Research

### Zweck
Umfassende Keyword-Recherche durch Expansion der Seed Keywords mit SEO-Daten und AI-Analyse.

### Schritte mit Claude Code
1. **Company Profile & Seeds laden**: ✅ `SEO/company/company-profile-{date}.md` + Seed Keywords aus Prozess 1
2. **Multi-API Keyword Research**:
   - API Call: `/api/seo/keyword-ideas`
   - API Call: `/api/seo/related-keywords`
   - API Call: `/api/seo/keyword-suggestions`
3. **Company-basierte AI-Filterung**: Keywords gegen Ausschlusskriterien aus Company Profile prüfen
4. **Keyword-Kategorisierung**: Nach Intent + Themenfeldern aus Company Profile
5. **Priority Scoring**: Relevanz nach Content-Fokus aus Company Profile (Prio 1-4)
6. **Speicherung**: Ergebnisse in strukturierter JSON-Datei

### Input/Output
- **Input**: Company Profile, Seed Keywords aus Prozess 1
- **Output**: Erweiterte Keyword-Liste mit Search Volume, CPC, Intent, Priority

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── keyword-expansion.json
├── intent-classification.json
└── priority-scoring.md
```

---

## Prozess 3: Content Outline Generierung

### Zweck
Automatische Erstellung umfassender Content-Outlines basierend auf Keyword-Analyse und Competitor Research.

### Schritte mit Claude Code
1. **Company Profile & Target Keyword laden**: ✅ Existierendes `SEO/company/company-profile-{date}.md` + Keywords aus Prozess 2
2. **Competitor Analysis**:
   - `firecrawl_search` für Top 10 Competitors
   - `firecrawl_scrape` für Heading-Extraktion
3. **SERP Research**: API Call via `/api/seo/serp` für aktuelle Rankings
4. **People Also Ask**: API Call via `/api/seo/serp` mit `people_also_ask_click_depth`
5. **Company-optimierte Outline**: Content-Struktur nach Tonalität aus Company Profile
6. **FAQ-Sektion**: PAA-Daten + USPs aus Company Profile kombinieren
7. **Speicherung**: Outline als Markdown-Datei

### Input/Output
- **Input**: ✅ Bereits vorhandenes Company Profile aus `SEO/company/`, Target Keywords aus Prozess 2, SERP Data
- **Output**: Content Outline (H1-H3), FAQ-Fragen, Competitor-Analyse

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── {keyword}-outline-{date}.md
├── {keyword}-competitors-{date}.json
└── {keyword}-paa-{date}.json
```

---

## Prozess 4: Rank Tracking & Monitoring

### Zweck
Regelmäßige Überwachung der Keyword-Rankings mit automatisierter Verlust-Erkennung.

### Schritte mit Claude Code
1. **Keyword-Liste laden**: Aus Research-Prozess
2. **Position Checking**: API Call via `/api/seo/serp` für alle Keywords
3. **Historical Comparison**: Vergleich mit vorherigen Daten aus JSON-Files
4. **Ranking-Analyse**: Claude identifiziert signifikante Änderungen
5. **Alert Generation**: Markdown-Report bei kritischen Verlusten
6. **Trend-Analyse**: Langzeit-Performance-Tracking
7. **Action Recommendations**: Konkrete Verbesserungsvorschläge

### Input/Output
- **Input**: Keyword-Liste, historische Daten
- **Output**: Ranking-Report, Alerts, Trend-Analyse

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── daily-rankings-{date}.json
├── ranking-changes-{date}.md
├── alerts-{date}.md
└── trends-{month}.json
```

---

## Prozess 5: SEO Content Creation

### Zweck
Automatisierte Erstellung suchoptimierter Artikel basierend auf SERP-Analyse und Keyword-Research.

### Schritte mit Claude Code
1. **Company Profile & Content-Brief laden**: ✅ Existierendes `SEO/company/company-profile-{date}.md` + Outline aus Prozess 3
2. **SERP Analysis**: API Call via `/api/seo/serp` für Top 20 Ergebnisse
3. **Content Research**: `firecrawl_scrape` für Top-Performer Content
4. **Competitive Analysis**: Claude analysiert Content-Gaps basierend auf USPs
5. **Brand-optimierte Content Creation**: Artikel nach Tonalität & Content-Fokus aus Company Profile
6. **USP-Integration**: Alleinstellungsmerkmale in Content einbauen
7. **On-Page Optimization**: Meta-Tags, Internal Links, Structured Data
8. **Quality Check**: Review gegen Company Profile Standards

### Input/Output
- **Input**: ✅ Bereits vorhandenes Company Profile aus `SEO/company/`, Content Outline aus Prozess 3, SERP Competitor Data
- **Output**: Brand-optimierter SEO-Artikel (Markdown), Meta-Daten, Internal Links

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── {keyword}-article-{date}.md
├── {keyword}-meta.json
├── {keyword}-links.json
└── {keyword}-schema.json
```

---

## Prozess-Orchestrierung

### Content-Erstellung Workflow (Pro Keyword-Artikel)
**Prozesse 1→2→3→5**: Keyword Research → Analyse → Outline → Content Creation
- **Input**: Target Keyword + ✅ Bereits erstelltes Company Profile
- **Output**: Vollständiger SEO-Artikel mit Meta-Daten

### Periodische Maintenance (Unabhängig)
**Prozess 4 - Rank Tracking**: Tägliches/wöchentliches Performance Monitoring

### Workflow-Integration
1. **Weekly Keyword Review**: Prozess 1-2 für neue Opportunities
2. **Content Creation Pipeline**: Prozess 1→2→3→5 für jeden neuen Artikel
3. **Weekly Rank Monitoring**: Prozess 4 für Performance Tracking (unabhängig)

### File-Management
- Alle Prozesse nutzen einheitliche JSON/MD-Struktur
- Historische Daten bleiben für Trend-Analyse verfügbar
- Claude Code kann jederzeit auf vorherige Analysen zugreifen
- Automatische Backup-Erstellung bei jedem Prozess-Lauf

### Integration mit PferdeWert.de
- Direkte Implementierung in `frontend/pages/` für neue Content-Seiten
- Automatische Sitemap-Updates via `npm run sitemap`
- SEO-Optimierungen direkt in bestehende Komponenten integrieren

---

## Agenten-basierte Ausführungsstrategie

### Vereinfachte SEO-Content-Pipeline

Mit dem spezialisierten `seo-content-writer` Agent wird der komplexe 6-Agent-Chain durch einen fokussierten Ansatz ersetzt:

#### **Agent: SEO Content Writer** (seo-content-writer)
```
Input: target_keyword + ✅ Company Profile aus SEO/company/
Umfang: Komplette Prozess-Kette 1→2→3→5 in einem Agent
Actions:
├── Lade Company Profile: SEO/company/company-profile-{date}.md
├── Keyword Research: API Calls via /api/seo/* (keyword-ideas + related + suggestions)
├── SERP Analysis: API Call via /api/seo/serp (Top 10)
├── Competitor Research: firecrawl_scrape für Content-Extraktion
├── Intent-Klassifizierung: Nach Company Profile Ausschlusskriterien
├── Content-Outline: H1-H3 Struktur + FAQ-Sektion
├── SEO-Artikel: Vollständiger deutscher Text (1000-2500 Wörter)
├── Meta-Optimierung: Title, Description, Schema Markup
├── Internal Links: Integration PferdeWert.de Seiten
└── Output: Kompletter SEO-Artikel + Meta-Assets
```

### Vereinfachtes File-Management

#### **Output-Struktur pro Keyword:**
```
SEO/SEO-CONTENT/{keyword}/
├── {keyword}-research-{date}.json    # Keyword + SERP Daten
├── {keyword}-competitors-{date}.json # Competitor Analysis
├── {keyword}-outline-{date}.md       # Content-Struktur
├── {keyword}-article-{date}.md       # Finaler SEO-Artikel
└── {keyword}-meta-{date}.json        # Meta-Tags + Schema
```

### Vorteile der SEO-Content-Writer Strategie
- **Einheitlicher Kontext**: Alle Entscheidungen basieren auf Company Profile
- **Konsistente Tonalität**: Durchgängiger Schreibstil nach Brand Guidelines
- **Optimierte Token-Nutzung**: Keine Context-Übergaben zwischen Agenten
- **E-E-A-T Integration**: Expertise, Authoritativeness, Trustworthiness in einem Agent
- **Schnellere Execution**: Kompletter Artikel in einem Durchlauf

### Praktische Ausführung

#### **Prozess-Start:**
```bash
# Koordinations-Agent startet SEO-Pipeline
Task(pferdewert-frontend-dev): "Setup SEO process for keyword 'pferd kaufen bayern' - create folder structure and initialize tracking"
```

#### **Agent-Kette triggern:**
1. **Agent 1** → Erstellt Setup + startet Agent 2
2. **Agent 2** → Sammelt Daten + startet Agent 3
3. **Agent 3** → Analysiert Keywords + startet Agent 4
4. **Agent 4** → Competitor Research + startet Agent 5
5. **Agent 5** → Content Outline + startet Agent 6
6. **Agent 6** → Final Content Creation + Process Complete

#### **Wiederaufnahme-Mechanismus:**
- Jeder Agent prüft existierende Dateien in `SEO/SEO-CONTENT/{keyword}/`
- Bei vorhandenen Zwischenergebnissen: Sprung zum entsprechenden Agent
- Process-Tracking in `{keyword}-process.md` zeigt aktuellen Status

### Quality Gates

#### **Agent-Übergabe-Validierung:**
- **Agent 2**: Mindestens 50 Keywords in raw-data.json
- **Agent 3**: Priority-Score 1-2 Keywords für Content-Creation
- **Agent 4**: Minimum 5 Competitor-URLs mit Content-Extraktion
- **Agent 5**: Vollständiges Outline mit H1-H3 + FAQ-Sektion
- **Agent 6**: 1000+ Wörter deutscher Text + komplette Meta-Assets

#### **Fehler-Handling:**
- Bei Agent-Fehlschlag: Automatischer Retry mit vorherigen Zwischenergebnissen
- Context-Overflow Detection: Automatische Aufgaben-Segmentierung
- API-Limit-Management: Pause-Resume-Mechanismus zwischen Agents

Diese Strategie maximiert die Effizienz der verfügbaren Agenten und verhindert Context-Probleme durch klare Datenübergabe-Ketten.
