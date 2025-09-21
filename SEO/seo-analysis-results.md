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
1. **Business-Analyse**: Claude analysiert PferdeWert.de Kontext aus CLAUDE.md
2. **Seed Keyword Brainstorming**: Claude generiert initiale Keywords basierend auf Pferdemarkt
3. **DataForSEO Keyword Ideas**: `dataforseo_labs_google_keyword_ideas` für Keyword-Expansion
4. **Regionale Anpassung**: Keywords für Bayern, NRW, Niedersachsen etc. erweitern
5. **Speicherung**: Ergebnisse in `SEO/keywords/seed-keywords-{date}.json` ablegen

### Input/Output
- **Input**: Business-Kontext, regionale Präferenzen, Ziel-Keywords
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
1. **Seed Keywords laden**: Aus vorherigem Prozess (`SEO/SEO-CONTENT/{keyword}/seed-keywords.json`)
2. **Multi-API Keyword Research**:
   - `dataforseo_labs_google_keyword_ideas`
   - `dataforseo_labs_google_related_keywords`
   - `dataforseo_labs_google_keyword_suggestions`
3. **Claude AI-Filterung**: Entfernung irrelevanter Keywords, Search Intent Klassifizierung
4. **Keyword-Kategorisierung**: Nach Intent (Informational, Commercial, Transactional)
5. **Priority Scoring**: Claude bewertet Keywords nach Relevanz für PferdeWert (Prio 1-4)
6. **Speicherung**: Ergebnisse in strukturierter JSON-Datei

### Input/Output
- **Input**: Seed Keywords, Unternehmensfokus, regionale Einstellungen
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
1. **Target Keyword definieren**: Aus Keyword Research auswählen
2. **Competitor Analysis**:
   - `firecrawl_search` für Top 10 Competitors
   - `firecrawl_scrape` für Heading-Extraktion
3. **SERP Research**: `dataforseo_serp_organic_live_advanced` für aktuelle Rankings
4. **People Also Ask**: `serp_organic_live_advanced` mit `people_also_ask_click_depth`
5. **Claude Outline Generation**: Umfassende deutsche Content-Struktur erstellen
6. **FAQ-Sektion**: Basierend auf PAA-Daten
7. **Speicherung**: Outline als Markdown-Datei

### Input/Output
- **Input**: Target Keyword, Competitor URLs
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
1. **Topic Input**: Target Keyword aus Research-Prozess
2. **SERP Analysis**: Top 20 Ergebnisse mit `dataforseo_serp_organic_live_advanced`
3. **Content Research**: `firecrawl_scrape` für Top-Performer Content
4. **Competitive Analysis**: Claude analysiert Content-Gaps und Chancen
5. **Outline Creation**: Detaillierte Content-Struktur
6. **Content Writing**: Claude erstellt vollständigen SEO-Artikel
7. **On-Page Optimization**: Meta-Tags, Internal Links, Structured Data
8. **Quality Check**: Final Review und Optimierung

### Input/Output
- **Input**: Target Keyword, Content-Brief
- **Output**: Vollständiger SEO-Artikel (Markdown), Meta-Daten, Internal Link Suggestions

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
