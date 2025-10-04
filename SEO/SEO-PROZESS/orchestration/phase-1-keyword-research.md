# Phase 1: Keyword Research

**Token Budget**: ~500 Tokens
**Main Deliverables**: `keyword-analysis.json`, Top 20 Keywords with metrics
**Agent Pattern**: Main-Agent → Sub-Agent (API calls + analysis)

---

## Phase 1A: Data Collection (Sub-Agent: SEO-Content-Writer)

### Step 1+2: Parallel API Calls (Related Keywords + Keyword Ideas)

**OPTIMIERUNG**: Step 1+2 werden parallel ausgeführt um API-Wartezeiten zu minimieren (~40% Zeitersparnis).

```xml
<function_calls>
<invoke name="mcp__dataforseo__dataforseo_labs_google_related_keywords">
<parameter name="keyword">{PRIMARY_KEYWORD}</parameter>
<parameter name="location_name">Germany</parameter>
<parameter name="language_code">de</parameter>
<parameter name="depth">1</parameter>
<parameter name="limit">20</parameter>
</invoke>
<invoke name="mcp__dataforseo__dataforseo_labs_google_keyword_ideas">
<parameter name="keywords">["{PRIMARY_KEYWORD}"]</parameter>
<parameter name="location_name">Germany</parameter>
<parameter name="language_code">de</parameter>
<parameter name="limit">15</parameter>
</invoke>
</function_calls>
```

**Erwartetes Ergebnis Step 1 (Related Keywords)**: 8-20 Keywords mit:
- `search_volume` - Monatliches Suchvolumen
- `competition_level` - LOW/MEDIUM/HIGH für Paid Search
- `search_intent` - informational/commercial/transactional/navigational
- `monthly_searches` - 12-Monats-Trend-Daten

**Erwartetes Ergebnis Step 2 (Keyword Ideas)**: 10-15 zusätzliche Keywords

**KRITISCH**:
- Step 2 nutzt nur PRIMARY_KEYWORD als Seed (nicht Related Keywords aus Step 1)
- Limit auf 15 reduziert um Token-Overflow zu vermeiden
- Original-Limit von 50 führt zu 30000+ Tokens und Context-Problemen

**Fehlerbehandlung**:
- Wenn Step 1 failed → Proceed mit Step 2 Daten + Retry Step 1 mit depth=2
- Wenn Step 2 failed → Proceed mit Step 1 Daten (min 8 Keywords erforderlich)
- Wenn BEIDE failed → HARD FAIL, retry mit anderem Primary Keyword

**Speichere beide Ergebnisse** in Variablen für Step 3 + Phase 1B Delegation.

---

### Step 3: Keyword Overview

Hole detaillierte Metriken für die vielversprechendsten Keywords aus Step 1+2.

```xml
<function_calls>
<invoke name="mcp__dataforseo__dataforseo_labs_google_keyword_overview">
<parameter name="keywords">["{KEYWORD_1}", "{KEYWORD_2}", "{KEYWORD_3}", "{KEYWORD_4}", "{KEYWORD_5}"]</parameter>
<parameter name="location_name">Germany</parameter>
<parameter name="language_code">de</parameter>
<parameter name="include_clickstream_data">false</parameter>
</invoke>
</function_calls>
```

**Keyword-Auswahl**:
- Nimm Top 5 Keywords nach search_volume aus Step 1+2
- Fokus auf informational/commercial intent
- Priorisiere LOW/MEDIUM competition

---

### Quality Gate Phase 1A

**KRITISCHE VALIDIERUNG (in dieser Reihenfolge)**:

**Schritt 1: Duplikate entfernen**
```
# Kombiniere Related Keywords (Step 1) + Keyword Ideas (Step 2)
all_keywords = step1_keywords + step2_keywords

# Entferne exakte Duplikate (case-insensitive)
unique_keywords = []
seen_keywords = set()

for kw in all_keywords:
  normalized_kw = kw.keyword.lower().strip()

  if normalized_kw not in seen_keywords:
    unique_keywords.append(kw)
    seen_keywords.add(normalized_kw)

duplicates_removed = len(all_keywords) - len(unique_keywords)
```

**Schritt 2: API-Erfolg validieren**
```
# Prüfe ob beide API-Calls erfolgreich waren
step1_success = len(step1_keywords) > 0
step2_success = len(step2_keywords) > 0

if not step1_success and not step2_success:
  → HARD FAIL: Beide API-Calls failed, retry mit anderem Primary Keyword

if not step1_success or not step2_success:
  → WARNING: Ein API-Call failed, proceed mit verfügbaren Daten
```

**Schritt 3: Semantische Relevanz prüfen**
```
# Prüfe ob Keywords zum Primary Keyword passen
primary_words = set(PRIMARY_KEYWORD.lower().split())
relevant_count = 0

for kw in unique_keywords:
  kw_words = set(kw.keyword.lower().split())

  # Keyword ist relevant wenn:
  # 1. Mind. 1 Wort übereinstimmt mit Primary Keyword, ODER
  # 2. Keyword enthält Pferde/Equine-bezogene Begriffe (pferd, reiten, equine, etc.)

  if len(primary_words.intersection(kw_words)) > 0:
    relevant_count += 1
  elif any(term in kw.keyword.lower() for term in ['pferd', 'reiten', 'equine', 'ross', 'hengst', 'stute', 'fohlen']):
    relevant_count += 1

relevance_ratio = relevant_count / len(unique_keywords) if len(unique_keywords) > 0 else 0.0

if relevance_ratio < 0.5:
  → HARD FAIL: < 50% semantisch relevant, Primary Keyword zu broad/unspecific
  → Remediation: Verfeinere Primary Keyword (z.B. "pferd kaufen" statt nur "pferd")
```

**Schritt 4: Quantitative Schwellwerte**
```
total_keywords = len(unique_keywords)
high_volume_keywords = [kw for kw in unique_keywords if kw.search_volume > 100]
informational_keywords = [kw for kw in unique_keywords if kw.search_intent == "informational"]

# HARD FAIL Bedingungen
if total_keywords < 5:
  → HARD FAIL: Kritisch wenig Keywords
  → Remediation: Retry Step 1 mit depth=2, oder verwende breiteres Primary Keyword

# WARNING Bedingungen
if total_keywords < 10:
  → WARNING: Unterdurchschnittliche Keyword-Anzahl (5-9 Keywords)
  → Action: Proceed, aber flagge in quality_gates.warnings

if len(high_volume_keywords) < 3:
  → WARNING: Wenig High-Volume Keywords
  → Impact: Content wird weniger Traffic generieren
  → Action: Proceed, aber adjustiere Expectations

if len(informational_keywords) < 2:
  → WARNING: Wenig Informational Intent Keywords
  → Impact: Schwieriger für Ratgeber-Content
  → Action: Proceed, priorisiere commercial intent Keywords

# SUCCESS Bedingungen
if total_keywords >= 10 and len(high_volume_keywords) >= 3 and len(informational_keywords) >= 3:
  → SUCCESS: Ideale Datenbasis für Phase 1B
```

**Schritt 5: Entscheidungsmatrix**
```
# Kombiniere alle Validierungen für finale Entscheidung
quality_score = 0.0

# Scoring Komponenten
if total_keywords >= 10:
  quality_score += 0.4
elif total_keywords >= 5:
  quality_score += 0.2

if relevance_ratio >= 0.8:
  quality_score += 0.3
elif relevance_ratio >= 0.5:
  quality_score += 0.15

if len(high_volume_keywords) >= 5:
  quality_score += 0.2
elif len(high_volume_keywords) >= 3:
  quality_score += 0.1

if len(informational_keywords) >= 3:
  quality_score += 0.1

# Finale Entscheidung
if quality_score >= 0.7:
  → PROCEED TO PHASE 1B (Ideal)
elif quality_score >= 0.4:
  → PROCEED TO PHASE 1B mit Warnings
else:
  → HARD FAIL: Retry Phase 1A mit adjusted parameters
```

**OUTPUT FÜR DEBUGGING**:
- `total_keywords`: {number}
- `duplicates_removed`: {number}
- `relevance_ratio`: {0.0-1.0}
- `quality_score`: {0.0-1.0}
- `warnings`: [{warning1}, {warning2}, ...]
- `decision`: "PROCEED" | "PROCEED_WITH_WARNINGS" | "HARD_FAIL"

---

## Phase 1B: Keyword Analysis (Sub-Agent)

**WICHTIG**: Main-Agent delegiert via Task-Tool an `seo-content-writer` Agent.

### Sub-Agent Delegation

```xml
<function_calls>
<invoke name="Task">
<parameter name="description">Analyze keyword research data for content strategy</parameter>
<parameter name="subagent_type">seo-content-writer</parameter>
<parameter name="prompt">
Analysiere die gesammelten Keyword-Daten aus Phase 1A und erstelle eine Content-Strategie.

## DATEN (JSON):
{
  "related_keywords": [...],  // Alle Related Keywords von Step 1
  "keyword_ideas": [...],     // Alle Keyword Ideas von Step 2
  "keyword_overview": [...]   // Overview-Daten für Top 5 Keywords
}

## AUFGABE:

### 1. Keyword-Priorisierung
Berechne Relevanz-Score für jedes Keyword basierend auf:
- **Search Volume** (40% Gewicht) - Höheres Volumen = bessere Reichweite
- **Search Intent Match** (30% Gewicht) - informational/commercial bevorzugt
- **Competition Level** (20% Gewicht) - LOW/MEDIUM bevorzugt (einfacher zu ranken)
- **Trend** (10% Gewicht) - Positive 12-Monats-Trends bevorzugt

**Formel**: `relevance_score = (volume_normalized * 0.4) + (intent_score * 0.3) + (competition_score * 0.2) + (trend_score * 0.1)`

**Normalisierung (KRITISCH - EXAKTE Berechnungen erforderlich)**:

1. **volume_normalized** (Min-Max Normalisierung):
   ```
   min_vol = min(keyword.search_volume for all keywords)
   max_vol = max(keyword.search_volume for all keywords)
   volume_normalized = (keyword.search_volume - min_vol) / (max_vol - min_vol)

   EDGE CASE: Wenn max_vol == min_vol → volume_normalized = 0.5 (neutral)
   ```

2. **intent_score** (Lookup Table):
   ```
   intent_scores = {
     "informational": 1.0,
     "commercial": 0.8,
     "transactional": 0.6,
     "navigational": 0.3,
     "unknown": 0.0
   }
   intent_score = intent_scores.get(keyword.search_intent, 0.0)
   ```

3. **competition_score** (Lookup Table - INVERTIERT für Paid Search Competition):
   ```
   competition_scores = {
     "LOW": 1.0,      # Niedrige Competition = Einfacher zu ranken
     "MEDIUM": 0.6,
     "HIGH": 0.3,
     "UNKNOWN": 0.5
   }
   competition_score = competition_scores.get(keyword.competition_level, 0.5)
   ```

4. **trend_score** (12-Monats-Trend aus monthly_searches):
   ```
   # monthly_searches ist Array von {year, month, search_volume}
   recent_months = monthly_searches[-3:]  # Letzte 3 Monate
   old_months = monthly_searches[:3]      # Erste 3 Monate

   recent_avg = sum(m.search_volume for m in recent_months) / 3
   old_avg = sum(m.search_volume for m in old_months) / 3

   trend_ratio = recent_avg / old_avg if old_avg > 0 else 1.0
   trend_score = min(1.0, trend_ratio)  # Cap bei 1.0

   EDGE CASE: Wenn monthly_searches nicht vorhanden → trend_score = 0.5 (neutral)
   ```

**Validierung**: Alle Scores müssen im Bereich [0.0, 1.0] liegen. Finaler relevance_score muss ebenfalls [0.0, 1.0] sein.

### 2. Content-Cluster-Bildung
Gruppiere Keywords in thematische Cluster mit folgendem Algorithmus:

**CLUSTERING-ALGORITHMUS (Schritt-für-Schritt)**:

**Schritt 1: Intent-basierte Vorgruppierung**
```
# Gruppiere alle Keywords nach search_intent
intent_groups = {
  "informational": [keyword for keyword in all_keywords if keyword.search_intent == "informational"],
  "commercial": [keyword for keyword in all_keywords if keyword.search_intent == "commercial"],
  "transactional": [keyword for keyword in all_keywords if keyword.search_intent == "transactional"],
  "navigational": [keyword for keyword in all_keywords if keyword.search_intent == "navigational"]
}

# Fokus auf informational + commercial für Ratgeber-Content
relevant_keywords = intent_groups["informational"] + intent_groups["commercial"]
```

**Schritt 2: Keyword-Overlap-Berechnung**
```
# Für jedes Keyword-Paar: Berechne Word-Overlap
def calculate_overlap(kw1, kw2):
  words1 = set(kw1.keyword.lower().split())
  words2 = set(kw2.keyword.lower().split())

  intersection = words1.intersection(words2)
  union = words1.union(words2)

  overlap_score = len(intersection) / len(union) if len(union) > 0 else 0.0
  return overlap_score

# Erstelle Overlap-Matrix für alle Keyword-Paare
overlap_matrix = {}
for kw1 in relevant_keywords:
  for kw2 in relevant_keywords:
    if kw1 != kw2:
      overlap_matrix[(kw1, kw2)] = calculate_overlap(kw1, kw2)
```

**Schritt 3: Cluster-Merging (>60% Overlap)**
```
# Keywords mit >60% Overlap werden zu einem Cluster zusammengefasst
clusters = []
used_keywords = set()

for kw in sorted(relevant_keywords, key=lambda x: x.search_volume, reverse=True):
  if kw in used_keywords:
    continue

  # Neuer Cluster mit diesem Keyword als Seed
  cluster = [kw]
  used_keywords.add(kw)

  # Finde alle verwandten Keywords (>60% Overlap)
  for candidate in relevant_keywords:
    if candidate in used_keywords:
      continue

    if overlap_matrix.get((kw, candidate), 0) > 0.6:
      cluster.append(candidate)
      used_keywords.add(candidate)

  clusters.append(cluster)
```

**Schritt 4: Cluster-Ranking & Kategorisierung**
```
# Berechne Total Search Volume pro Cluster
for cluster in clusters:
  cluster_volume = sum(kw.search_volume for kw in cluster)
  cluster_primary = max(cluster, key=lambda x: x.search_volume)

  # Kategorisiere nach Volume
  if cluster_volume > 1000:
    cluster_type = "hero_content"
  elif cluster_volume > 300:
    cluster_type = "supporting_topic"
  else:
    cluster_type = "longtail_questions"

# Sortiere Cluster nach Total Volume (höchste zuerst)
clusters = sorted(clusters, key=lambda c: sum(kw.search_volume for kw in c), reverse=True)
```

**Schritt 5: Cluster-Namen generieren**
```
# Cluster-Name = Häufigstes Bi-Gram im Primary Keyword
def generate_cluster_name(cluster):
  primary_kw = max(cluster, key=lambda x: x.search_volume)
  words = primary_kw.keyword.split()

  # Nutze ersten 2-3 Wörter als Cluster-Name (Titel-Kapital)
  if len(words) >= 3:
    return " ".join(words[:3]).title()
  else:
    return primary_kw.keyword.title()
```

**ERWARTETES ERGEBNIS**:
- Min 3 thematische Cluster
- Cluster sortiert nach Total Search Volume
- Jeder Cluster hat: Primary Keyword, Supporting Keywords, Cluster Type, Total Volume

**CLUSTER-KATEGORIEN**:

**Haupt-Topic (Hero Content)**:
- Total Volume > 1000 searches/month
- Informational/commercial intent
- Breite Themen-Abdeckung
- Beispiel: "Pferd Kaufen Worauf Achten" (primary) + "gesundes pferd kaufen", "pferd kaufen tipps"

**Supporting Topics**:
- Total Volume 300-1000 searches/month
- Related zu Haupt-Topic (>60% Overlap)
- Spezifischere Aspekte
- Beispiel: "Pferdekauf Gesundheitscheck" + "ankaufsuntersuchung pferd", "tierarztcheck pferd"

**Long-tail Questions**:
- Total Volume < 300 searches/month
- Specific user questions
- FAQ/PAA Integration
- Beispiel: "wie viel kostet pferd kaufen" + "was kostet pferd monatlich"

### 3. Content-Empfehlung
Für Top 3 Keyword-Cluster erstelle Empfehlungen:
- Welche Keywords im selben Artikel abdecken?
- Welche User-Intent/Pain-Points adressieren?
- Welches Content-Format (Guide/Tutorial/Vergleich/Checkliste)?
- Geschätzte Wortanzahl für comprehensive coverage

## OUTPUT FORMAT (JSON):
{
  "top_keywords": [
    {
      "keyword": "pferd kaufen worauf achten",
      "search_volume": 1200,
      "relevance_score": 0.85,
      "intent": "informational",
      "competition": "LOW",
      "trend": "stable",
      "recommended_use": "primary_keyword"
    }
  ],
  "content_clusters": [
    {
      "cluster_name": "Pferdekauf Grundlagen",
      "primary_keyword": "pferd kaufen worauf achten",
      "supporting_keywords": [
        "gesundes pferd kaufen",
        "pferd kaufen tipps",
        "pferdekauf beratung"
      ],
      "user_intent": "Käufer suchen Orientierung für sicheren Pferdekauf",
      "content_format": "guide",
      "estimated_word_count": 2500
    }
  ],
  "recommendations": {
    "top_article_topics": [
      "Pferdekauf-Guide: Worauf achten beim Pferdekauf",
      "Gesundheitscheck beim Pferdekauf",
      "Pferdekauf Checkliste"
    ],
    "keyword_density_targets": {
      "primary_keyword": 0.01,
      "supporting_keywords": 0.005
    },
    "estimated_word_count": 2500
  }
}

**WICHTIG**:
- Verwende NUR die bereitgestellten Daten, keine Annahmen!
- Alle Keywords müssen aus den API-Ergebnissen stammen
- Relevanz-Scores müssen nachvollziehbar berechnet sein
</parameter>
</invoke>
</function_calls>
```

---

### Quality Gate Phase 1B

Prüfe ob Sub-Agent vollständige Analyse geliefert hat:

✅ **Min 3 Content-Cluster identifiziert**
✅ **Top 10 Keywords mit Relevanz-Score**
✅ **Min 1 Artikel-Empfehlung mit primary + supporting keywords**
✅ **Target Word Count definiert (2000-3500 Range)**
❌ **Wenn Analyse unvollständig** → Retry mit clarifications

**Partial Success**: Wenn nur 2 Cluster statt 3 → proceed mit Warning.

---

## Output Files

Speichere Ergebnisse in `SEO/SEO-CONTENT/{keyword-slug}/research/`:

### 1. `keyword-analysis.json`
```json
{
  "phase": "1B",
  "primary_keyword": "pferd kaufen worauf achten",
  "timestamp": "2025-01-04T14:30:00Z",
  "data_sources": {
    "related_keywords_count": 18,
    "keyword_ideas_count": 15,
    "total_keywords_analyzed": 33
  },
  "top_keywords": [...],
  "content_clusters": [...],
  "recommendations": {...}
}
```

### 2. `keyword-raw-data.json` (Optional)
Speichere vollständige API-Responses für spätere Referenz.

---

## Troubleshooting

### Problem: Zu wenig Keywords gefunden (< 10)
**Lösung**:
- Retry Step 1 mit `depth=2` für tiefere Expansion
- Verwende breitere Seed-Keywords
- Prüfe ob Keyword zu nischig ist

### Problem: Token-Overflow bei Keyword Ideas
**Lösung**:
- Limit auf 10 reduzieren (statt 15)
- Verwende nur 2 Seed-Keywords statt 3

### Problem: Sub-Agent liefert unstrukturiertes Output
**Lösung**:
- Prüfe ob JSON-Format klar im Prompt definiert ist
- Stelle sicher dass "OUTPUT FORMAT (JSON)" Sektion vorhanden ist
- Retry mit expliziterem Beispiel-Output

---

## Next Phase

Nach erfolgreichem Abschluss von Phase 1:
→ **Phase 2: SERP Analysis** (`phase-2-serp-analysis.md`)

Verwende `primary_keyword` aus Phase 1B Output als Input für Phase 2.

---

**Phase 1 Checklist**:
- [ ] Step 1: Related Keywords API Call ausgeführt
- [ ] Step 2: Keyword Ideas API Call ausgeführt
- [ ] Step 3: Keyword Overview API Call ausgeführt
- [ ] Quality Gate 1A: Min 10 Keywords gesammelt
- [ ] Sub-Agent Delegation für Analyse
- [ ] Quality Gate 1B: Min 3 Content-Cluster identifiziert
- [ ] Output Files gespeichert in `research/` Ordner
- [ ] Ready für Phase 2: Primary Keyword identifiziert
