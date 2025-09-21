# SEO Process für PferdeWert.de - Optimiert für Claude Code + Bordmittel

## Verfügbare Tools
- **Claude Code**: AI-gestützte Analyse und Content-Erstellung
- **DataForSEO MCP**: Keyword Research, SERP Analysis, On-Page Audit
- **Firecrawl MCP**: Website Scraping und Content-Extraktion
- **File Storage**: JSON/MD-Dateien für Datenablage und Prozess-Tracking

---

## Prozess 0: SEO Unternehmensbeschreibung erstellen

### Zweck
Nutzbaren Keyword-Filter auf Basis des Webauftritts formulieren und Unternehmensprofil für SEO-Arbeit definieren.

### Schritte mit Claude Code
1. **Firecrawl Website-Analyse**: `firecrawl_scrape` für Homepage und Hauptseiten
2. **Content-Extraktion**: H1, USP, Dienstleistungen, Zielgruppen erfassen
3. **Claude Profil-Erstellung**: Unternehmensprofil, Alleinstellungsmerkmale, Kernzielgruppen
4. **Keyword-Filter ableiten**: Ausschluss- und Einschlusskriterien definieren
5. **Speicherung**: Unternehmensprofil in `SEO/SEO-CONTENT/{keyword}/company-profile-{date}.md`

### Input/Output
- **Input**: Domain, bestehende Unternehmensinfos
- **Output**: Strukturiertes Unternehmensprofil, Keyword-Filter-Kriterien

### Ablage-Struktur
```
SEO/company/
├── company-profile-{date}.md
├── keyword-filters-{date}.json
└── brand-exclusions-{date}.json
```

---

## Prozess 1: Seed Keywords & Regionale Fokussierung

### Zweck
Generierung und Verfeinerung von Seed Keywords mit regionalem Fokus für deutsche Pferdemärkte.

### Schritte mit Claude Code
1. **Company Profile laden**: Existierende `SEO/company/company-profile-{date}.md` verwenden
2. **Keyword-Filter anwenden**: Ausschlusskriterien aus Company Profile beachten
3. **Seed Keyword Brainstorming**: Claude generiert Keywords basierend auf Content-Fokus aus Profil
4. **DataForSEO Keyword Ideas**: `dataforseo_labs_google_keyword_ideas` für Keyword-Expansion
5. **Regionale Anpassung**: Keywords für definierte Regionen aus Company Profile erweitern
6. **Speicherung**: Ergebnisse in `SEO/keywords/seed-keywords-{date}.json` ablegen

### Input/Output
- **Input**: Existierendes Company Profile, Target Keyword
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
1. **Company Profile & Seeds laden**: `SEO/company/company-profile-{date}.md` + Seed Keywords
2. **Multi-API Keyword Research**:
   - `dataforseo_labs_google_keyword_ideas`
   - `dataforseo_labs_google_related_keywords`
   - `dataforseo_labs_google_keyword_suggestions`
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
1. **Company Profile & Target Keyword laden**: Company Profile + Keywords aus Prozess 2
2. **Competitor Analysis**:
   - `firecrawl_search` für Top 10 Competitors
   - `firecrawl_scrape` für Heading-Extraktion
3. **SERP Research**: `dataforseo_serp_organic_live_advanced` für aktuelle Rankings
4. **People Also Ask**: `serp_organic_live_advanced` mit `people_also_ask_click_depth`
5. **Company-optimierte Outline**: Content-Struktur nach Tonalität aus Company Profile
6. **FAQ-Sektion**: PAA-Daten + USPs aus Company Profile kombinieren
7. **Speicherung**: Outline als Markdown-Datei

### Input/Output
- **Input**: Company Profile, Target Keywords aus Prozess 2, SERP Data
- **Output**: Content Outline (H1-H3), FAQ-Fragen, Competitor-Analyse

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── {keyword}-outline-{date}.md
├── {keyword}-competitors-{date}.json
└── {keyword}-paa-{date}.json
```

---

## Prozess 4: Technical SEO Audit

### Zweck
Umfassende technische SEO-Analyse der PferdeWert.de Website mit automatisierter Problemerkennung.

### Schritte mit Claude Code
1. **Website Mapping**: `firecrawl_map` für vollständige URL-Erfassung
2. **URL Priorisierung**: Claude bewertet URLs nach Wichtigkeit
3. **OnPage Analyse**: `dataforseo_on_page_instant_pages` für jede wichtige URL
4. **Lighthouse Audit**: `dataforseo_on_page_lighthouse` für Performance-Metriken
5. **Problem-Kategorisierung**: Claude klassifiziert Probleme (Critical/Warning/Info)
6. **Report Generation**: Markdown-Report mit priorisierten Fixes
7. **Action Items**: Konkrete Verbesserungsvorschläge

### Input/Output
- **Input**: Domain (pferdewert.de)
- **Output**: Technical SEO Report, Problem-Liste, Action Items

### Ablage-Struktur
```
SEO/SEO-CONTENT/{keyword}/
├── technical-audit-{date}.md
├── lighthouse-scores-{date}.json
├── onpage-issues-{date}.json
└── action-items-{date}.md
```

---

## Prozess 5: Rank Tracking & Monitoring

### Zweck
Regelmäßige Überwachung der Keyword-Rankings mit automatisierter Verlust-Erkennung.

### Schritte mit Claude Code
1. **Keyword-Liste laden**: Aus Research-Prozess
2. **Position Checking**: `dataforseo_serp_organic_live_advanced` für alle Keywords
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

## Prozess 6: SEO Content Creation

### Zweck
Automatisierte Erstellung suchoptimierter Artikel basierend auf SERP-Analyse und Keyword-Research.

### Schritte mit Claude Code
1. **Company Profile & Content-Brief laden**: Company Profile + Outline aus Prozess 3
2. **SERP Analysis**: Top 20 Ergebnisse mit `dataforseo_serp_organic_live_advanced`
3. **Content Research**: `firecrawl_scrape` für Top-Performer Content
4. **Competitive Analysis**: Claude analysiert Content-Gaps basierend auf USPs
5. **Brand-optimierte Content Creation**: Artikel nach Tonalität & Content-Fokus aus Company Profile
6. **USP-Integration**: Alleinstellungsmerkmale in Content einbauen
7. **On-Page Optimization**: Meta-Tags, Internal Links, Structured Data
8. **Quality Check**: Review gegen Company Profile Standards

### Input/Output
- **Input**: Company Profile, Content Outline aus Prozess 3, SERP Competitor Data
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

### Workflow-Integration
1. **Weekly Keyword Review**: Prozess 1-2 für neue Opportunities
2. **Monthly Content Planning**: Prozess 3 für Content-Pipeline
3. **Quarterly Technical Audit**: Prozess 4 für Site Health
4. **Daily Rank Monitoring**: Prozess 5 für Performance Tracking
5. **Bi-weekly Content Creation**: Prozess 6 für regelmäßige Veröffentlichungen

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

### Problem-Analyse
- **Context-Overflow**: Komplexer SEO-Prozess übersteigt Token-Limits
- **Sequenzielle Abhängigkeiten**: 6 Hauptprozesse mit 3-7 Einzelschritten
- **Datenpersistenz**: Zwischenergebnisse müssen zwischen Agenten übertragen werden

### Agenten-Ketten-Strategie

#### **Agent 1: Process-Coordination** (pferdewert-frontend-dev)
```
Input: target_keyword (z.B. "pferd kaufen bayern")
Actions:
├── Erstelle Ordnerstruktur: SEO/SEO-CONTENT/{keyword}/
├── Initialisiere: {keyword}-process.md mit Tracking-Header
├── Setup: Prozess-Metadaten und Timestamps
└── Übergabe: keyword + folder_path an Agent 2
```

#### **Agent 2: Data-Collection** (general-purpose)
```
Input: target_keyword + DataForSEO/Firecrawl APIs
Actions:
├── Keyword Research: dataforseo_labs_google_keyword_ideas
├── Related Keywords: dataforseo_labs_google_related_keywords
├── SERP Analysis: dataforseo_serp_organic_live_advanced
├── Speichere Rohdaten: {keyword}-raw-data.json
└── Übergabe: raw_data_file an Agent 3
```

#### **Agent 3: Keyword-Analysis** (pferdewert-frontend-dev)
```
Input: {keyword}-raw-data.json
Actions:
├── AI-Filterung: Entfernung irrelevanter Keywords
├── Intent-Klassifizierung: Commercial/Informational/Navigational
├── Priority-Scoring: Relevanz für PferdeWert (1-4)
├── Regional-Mapping: Bayern/NRW/Niedersachsen spezifisch
├── Speichere: {keyword}-keywords-analyzed.json
└── Übergabe: analyzed_keywords an Agent 4
```

#### **Agent 4: Competitor-Research** (general-purpose)
```
Input: target_keyword + analyzed_keywords
Actions:
├── SERP Top 10: dataforseo_serp_organic_live_advanced
├── Content Scraping: firecrawl_scrape für Top-Performer
├── Heading-Extraktion: H1-H3 Strukturen erfassen
├── Content-Gap-Analyse: Fehlende Themen identifizieren
├── Speichere: {keyword}-competitors-raw.json
└── Übergabe: competitor_data an Agent 5
```

#### **Agent 5: Content-Outline-Generation** (pferdewert-ux-designer)
```
Input: analyzed_keywords + competitor_data
Actions:
├── AI-Outline-Erstellung: H1 + 5-8 H2 + H3 Struktur
├── Content-Gap-Integration: Unique Angles identifizieren
├── FAQ-Generierung: People Also Ask Integration
├── Internal-Link-Mapping: PferdeWert.de relevante Links
├── Word-Count-Target: 1000-2500 Wörter definieren
├── Speichere: {keyword}-outline.md
└── Übergabe: content_outline an Agent 6
```

#### **Agent 6: Final-Content-Creation** (pferdewert-business-analyst)
```
Input: content_outline + alle vorherigen Analysen
Actions:
├── AI-Artikel-Generierung: Vollständiger deutscher SEO-Text
├── On-Page-Optimierung: Keyword-Density 1-2%, Meta-Tags
├── Schema-Markup: JSON-LD für Structured Data
├── Internal-Links: Integration bestehender PferdeWert-Seiten
├── Meta-Assets: Title, Description, Open Graph
├── Speichere: {keyword}-article.md + {keyword}-meta.json
└── Process Complete: Update {keyword}-process.md
```

### Zwischenspeicher-Management

#### **Kritische Dateien pro Agent:**
```
SEO/SEO-CONTENT/{keyword}/
├── {keyword}-process.md          # Agent 1: Process Tracking
├── {keyword}-raw-data.json       # Agent 2: API Rohdaten
├── {keyword}-keywords-analyzed.json  # Agent 3: AI-gefilterte Keywords
├── {keyword}-competitors-raw.json    # Agent 4: Competitor Intelligence
├── {keyword}-outline.md             # Agent 5: Content-Struktur
├── {keyword}-article.md             # Agent 6: Finaler Artikel
└── {keyword}-meta.json              # Agent 6: Meta-Assets
```

#### **Context-Overflow-Vermeidung:**
- **Daten-Chunking**: Jeder Agent lädt nur relevante Input-Dateien
- **Sequenzielle Übergabe**: Keine parallelen API-Calls in einem Agent
- **Persistente Zwischenspeicherung**: Wiederaufnahme bei Unterbrechungen möglich
- **Spezialisierte Agents**: Content-Agents nur für AI-intensive Tasks

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
