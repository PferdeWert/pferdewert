---
argument-hint: <keyword> --pillar=<pillar-slug>
description: Create SEO-optimized Mini-Page content (800-1000 words) with anti-duplicate logic
allowed-tools: Task, Read, Write, Bash(mkdir:*), mcp__dataforseo__*
---

Du erstellst SEO-optimierten Content für **Mini-Pages** (Spoke-Artikel im Topic Cluster).

**Eingabe**: "$ARGUMENTS"

## Argument-Parsing

Extrahiere aus `$ARGUMENTS`:
- `keyword`: Das Ziel-Keyword (z.B. "islandpferd kaufen")
- `pillar`: Der Pillar-Slug nach `--pillar=` (z.B. "pferd-kaufen")

Beispiel: `islandpferd kaufen --pillar=pferd-kaufen`
→ keyword = "islandpferd kaufen"
→ pillar = "pferd-kaufen"

**FEHLER wenn `--pillar=` fehlt!** Mini-Pages MÜSSEN eine Pillar-Page haben.

---

## Unterschied zu /seo (Full Pipeline)

| Aspekt | /seo (Full) | /seo-mini (Mini-Page) |
|--------|-------------|----------------------|
| Wörter | 2000-2500 | 800-1000 |
| Phasen | 8 | 4 |
| Keywords | 80 | 20-30 |
| Fokus | Umfassend | NUR unique Aspekte |
| Duplikate | N/A | Pillar-Check! |

---

## PHASE 0: Setup

```bash
# Erstelle Slug aus Keyword
# "islandpferd kaufen" → "islandpferd-kaufen"
mkdir -p "SEO/SEO-CONTENT/$KEYWORD_SLUG/research"
mkdir -p "SEO/SEO-CONTENT/$KEYWORD_SLUG/content"
mkdir -p "SEO/SEO-CONTENT/$KEYWORD_SLUG/seo"
```

---

## PHASE 1: Pillar-Check (Anti-Duplikat)

**KRITISCH**: Lies den Pillar-Artikel und extrahiere behandelte Themen.

```
1. Lies: frontend/pages/pferde-ratgeber/{pillar}.tsx
2. Extrahiere ALLE H2/H3 Überschriften
3. Extrahiere Haupt-Themen und Kernaussagen
4. Speichere in: SEO/SEO-CONTENT/$KEYWORD_SLUG/research/pillar-themes.json
```

**Output-Format** (pillar-themes.json):
```json
{
  "pillar_slug": "pferd-kaufen",
  "pillar_url": "/pferde-ratgeber/pferd-kaufen",
  "headings": [
    "Worauf beim Pferdekauf achten",
    "Die richtige Pferderasse wählen",
    "AKU und Probezeit"
  ],
  "covered_topics": [
    "Allgemeine Kaufberatung",
    "Preisfaktoren",
    "Rechtliche Aspekte"
  ],
  "forbidden_topics": [
    "Diese Themen sind bereits im Pillar behandelt - NICHT wiederholen!"
  ]
}
```

---

## PHASE 2: Keyword Research (Regional/Lokal-Fokus)

Spawne Sub-Agent:
```
subagent_type: seo-content-writer
prompt:
  SEO-MINI PHASE 2: KEYWORD RESEARCH for '$KEYWORD'
  Pillar: $PILLAR

  STEP 1: Lies pillar-themes.json aus Phase 1

  STEP 2: DataForSEO Call - Related Keywords:
  mcp__dataforseo__dataforseo_labs_google_related_keywords:
  {
    "keyword": "$KEYWORD",
    "location_name": "Germany",
    "language_code": "de",
    "depth": 1,
    "limit": 30
  }

  STEP 3: DataForSEO Call - Keyword Overview:
  mcp__dataforseo__dataforseo_labs_google_keyword_overview:
  {
    "keywords": ["$KEYWORD"],
    "location_name": "Germany",
    "language_code": "de"
  }

  STEP 4: Filter Keywords
  - Entferne Keywords die Pillar-Themen duplizieren
  - Behalte NUR lokale/regionale/spezifische Keywords
  - Max 25 Keywords

  STEP 5: Speichere:
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/research/keywords.json
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/research/phase-2-summary.md

  RETURN: "Phase 2 ✅ | Keywords: {count} | SV: {main_sv} | Unique topics: {count}"
```

---

## PHASE 3: Content Writing (800-1000 Wörter)

Spawne Sub-Agent:
```
subagent_type: seo-content-writer
prompt:
  SEO-MINI PHASE 3: CONTENT WRITING for '$KEYWORD'

  LIES ZUERST:
  1. SEO/SEO-CONTENT/$KEYWORD_SLUG/research/pillar-themes.json
  2. SEO/SEO-CONTENT/$KEYWORD_SLUG/research/keywords.json

  CONTENT-REGELN:

  1. **LÄNGE**: 800-1000 Wörter (NICHT mehr!)

  2. **UNIQUE CONTENT ONLY**:
     - NIEMALS Themen aus pillar-themes.json wiederholen
     - Fokus auf lokale/regionale/spezifische Aspekte
     - Was macht $KEYWORD ANDERS als das allgemeine Pillar-Thema?

  3. **STRUKTUR**:
     - 1x H1 (Titel)
     - 3-4x H2 (Hauptabschnitte)
     - Optional 1-2x H3 pro H2

  4. **KEYWORDS**:
     - Primary Keyword: 3-4x natürlich einbauen
     - Secondary Keywords: je 1-2x
     - NIEMALS Keyword-Stuffing!

  5. **PILLAR-LINK (PFLICHT!)**:
     Im Fazit oder Einleitung MUSS stehen:
     "Weitere Informationen finden Sie in unserem ausführlichen Ratgeber zum [Thema des Pillars](/pferde-ratgeber/{pillar})."

  6. **CTA**:
     - Alle CTAs verlinken auf "/pferde-preis-berechnen"
     - NICHT auf "/bewertung"!

  7. **SPRACHE**:
     - Natürliches, flüssiges Deutsch
     - Korrektes Deutsch > Perfekte Keyword-Platzierung
     - Keine unnatürlichen Satzkonstruktionen

  OUTPUT:
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/content/draft-article.md
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/content/word-count.txt

  RETURN: "Phase 3 ✅ | Words: {count} | H2s: {count} | Pillar-Link: ✓"
```

---

## PHASE 4: SEO Metadata & Internal Linking

Spawne Sub-Agent:
```
subagent_type: seo-content-writer
prompt:
  SEO-MINI PHASE 4: METADATA & LINKING for '$KEYWORD'

  LIES: SEO/SEO-CONTENT/$KEYWORD_SLUG/content/draft-article.md

  ERSTELLE:

  1. **seo-metadata.json** (DE + AT + CH):
     {
       "phase": "4-mini",
       "primary_keyword": "$KEYWORD",
       "slug": "$KEYWORD_SLUG",
       "locales": {
         "de": {
           "title": "SEO-Titel (50-60 Zeichen)",
           "description": "Meta-Description (150-160 Zeichen)",
           "keywords": "keyword1, keyword2, keyword3"
         },
         "at": {
           "title": "AT-Titel mit Österreich-Bezug",
           "description": "AT-Description",
           "keywords": "..."
         },
         "ch": {
           "title": "CH-Titel mit Schweiz-Bezug",
           "description": "CH-Description",
           "keywords": "..."
         }
       }
     }

  2. **internal-linking.json** (PFLICHT Pillar-Link!):
     {
       "internal_links": [
         {
           "url": "/pferde-ratgeber/{pillar}",
           "anchor": "ausführlichen Ratgeber zum {Pillar-Thema}",
           "required": true,
           "placement": {
             "section": "intro_or_conclusion",
             "recommendation": "Natürlich im Fließtext einbauen"
           }
         },
         {
           "url": "/pferde-ratgeber/andere-seite",
           "anchor": "relevanter Anchor-Text",
           "required": false,
           "placement": { ... }
         }
       ]
     }

  3. **schema-article.json**:
     {
       "@type": "Article",
       "headline": "...",
       "datePublished": "2025-12-14",
       "wordCount": {word_count}
     }

  4. **final-article.md**:
     - Kopiere draft-article.md
     - Füge interne Links ein (als Markdown-Links)
     - Prüfe Pillar-Link ist vorhanden

  OUTPUT:
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/seo/seo-metadata.json
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/seo/internal-linking.json
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/seo/schema-article.json
  - SEO/SEO-CONTENT/$KEYWORD_SLUG/content/final-article.md

  RETURN: "Phase 4 ✅ | Meta: DE+AT+CH | Links: {count} (Pillar: ✓) | Schema: ✓"
```

---

## FINAL SUMMARY

Nach Phase 4:
```
✅ Mini-Page Pipeline completed!
📁 Output: SEO/SEO-CONTENT/$KEYWORD_SLUG/
📊 Word Count: {count} (Target: 800-1000)
🔗 Pillar-Link: ✓ (zu /pferde-ratgeber/{pillar})
🎯 Keywords: {count}
📝 Status: Ready for /page command

Nächster Schritt:
/page $KEYWORD
```

---

## ANTI-DUPLIKAT CHECKLISTE

Vor Abschluss prüfen:
- [ ] Keine H2/H3 die im Pillar bereits existieren
- [ ] Keine Kernaussagen die im Pillar stehen
- [ ] Content ist SPEZIFISCH für $KEYWORD (lokal/regional/Rasse)
- [ ] Pillar-Link ist im Content vorhanden
- [ ] Wortanzahl: 800-1000 (NICHT mehr!)
