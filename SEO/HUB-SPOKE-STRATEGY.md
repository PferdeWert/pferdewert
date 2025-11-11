# Hub-Spoke Content Strategie für PferdeWert.de

## 🎯 Ziel
Verhindere Duplicate Content zwischen Hub- und Spoke-Artikeln und maximiere interne Linking-Power zu Hub-Artikeln.

## 📐 Hub-Spoke-Architektur

### Hub-Artikel (Pillar Content)
**Definition**: Umfassende, autoritative Guides zu Hauptthemen
**Beispiele**:
- `/pferde-ratgeber/pferd-kaufen-tipps` (Hub: Pferdekauf)
- `/pferde-ratgeber/pferde-haltung-kosten` (Hub: Pferdehaltung)
- `/pferde-ratgeber/pferde-gesundheit` (Hub: Gesundheit)

**Eigenschaften**:
- 2500-4000 Wörter
- Breite Themenabdeckung
- High Search Volume Keywords (500+ SV)
- Linking-Ziel für alle Spoke-Artikel

### Spoke-Artikel (Supporting Content)
**Definition**: Spezialisierte, tiefgehende Artikel zu Sub-Themen
**Beispiele** (für Hub "Pferdekauf"):
- `/pferde-ratgeber/warmblut-kaufen`
- `/pferde-ratgeber/freizeitpferd-kaufen`
- `/pferde-ratgeber/pferdeankaufsuntersuchung`

**Eigenschaften**:
- 1500-2500 Wörter
- Fokus auf spezifisches Sub-Thema
- Long-Tail Keywords (50-500 SV)
- MUSS zu Hub-Artikel verlinken

---

## 🚨 Duplicate Content Prevention

### Regel 1: Content-Winkel-Differenzierung
**Hub-Artikel**: Überblick + Best Practices + Entscheidungshilfe
**Spoke-Artikel**: Deep-Dive in spezifischen Aspekt

**Beispiel Pferdekauf**:

**Hub ("pferd-kaufen-tipps")**:
```markdown
## Welche Pferderasse passt zu mir?

Beim Pferdekauf ist die Rassewahl entscheidend. Hier ein Überblick:

### Warmblüter
Vielseitig einsetzbar, ideal für Sport und Freizeit.
→ [Mehr zu Warmblütern](warmblut-kaufen)

### Freizeitpferde
Entspannte Charaktere für gemütliche Ausritte.
→ [Freizeitpferd finden](freizeitpferd-kaufen)

### Kaufentscheidung
Checkliste für die richtige Wahl...
```

**Spoke ("warmblut-kaufen")**:
```markdown
## Warmblut kaufen: Der ultimative Guide

Du hast dich für ein Warmblut entschieden? Hier erfährst du alles
über Zuchtlinien, Preise, typische Eigenschaften und worauf du beim
Kauf speziell bei Warmblütern achten musst.

### Warmblut-Zuchtlinien im Detail
[DEUTLICH MEHR DETAIL ALS IM HUB]

### Preisstruktur bei Warmblütern
[SPEZIFISCHE PREISTABELLEN]

→ Zurück zum [Pferdekauf-Guide](pferd-kaufen-tipps) für den Gesamtüberblick
```

### Regel 2: 70%-Regel
**Maximal 30% Content-Overlap zwischen Hub und Spoke erlaubt**

**Gemessen an**:
- Unique Paragraphs (min. 3 Sätze)
- Unique Headings (H2-H3)
- Unique Keyword-Phrasen

**Validation-Tool** (siehe unten):
```bash
npm run check-duplicate-content -- --hub=pferd-kaufen-tipps --spoke=warmblut-kaufen
```

### Regel 3: Perspektiven-Shift
**Hub**: "Was sind die wichtigsten Faktoren?"
**Spoke**: "Wie machst du es konkret?"

**Hub-Stil**: Übersicht, Vergleich, Entscheidungsframework
**Spoke-Stil**: Step-by-Step, Detailanalyse, Spezialfälle

### Regel 4: Unique Value Proposition
Jeder Spoke MUSS haben:
- ✅ Spezialwissen, das im Hub NICHT steht
- ✅ Mindestens 3 unique H2-Sections
- ✅ Eigene FAQ-Section (andere Fragen als Hub)
- ✅ Eigene Beispiele/Cases

---

## 🔗 Internal Linking Rules

### Hub → Spoke Links
**Minimum**: 3-5 Spoke-Links pro Hub-Artikel
**Placement**:
- Im Content-Flow (kontextuell)
- In "Weitere Artikel"-Section am Ende
- In Related-Content-Box (Sidebar/Bottom)

**Anchor-Text-Strategie**:
```tsx
// ✅ GOOD: Descriptive + Keyword
<Link href="/pferde-ratgeber/warmblut-kaufen">
  Warmblut kaufen: Alles zu Preisen und Auswahl
</Link>

// ❌ BAD: Generic
<Link href="/pferde-ratgeber/warmblut-kaufen">
  Hier klicken
</Link>
```

### Spoke → Hub Links
**Minimum**: 2-3 Hub-Links pro Spoke-Artikel
**Placement**:
- **CRITICAL**: Im ersten Paragraph ("Breadcrumb-Link")
- Im Content (kontextuell, wenn Hub-Thema erwähnt)
- Am Ende ("Für den Gesamtüberblick...")

**Beispiel**:
```tsx
// Spoke-Artikel Anfang
<p>
  Du möchtest ein Warmblut kaufen? In unserem umfassenden{' '}
  <Link href="/pferde-ratgeber/pferd-kaufen-tipps">
    Pferdekauf-Guide
  </Link>{' '}
  findest du alle Basics. Hier fokussieren wir uns speziell auf Warmblüter.
</p>

// Spoke-Artikel Ende
<p>
  → Zurück zum{' '}
  <Link href="/pferde-ratgeber/pferd-kaufen-tipps">
    kompletten Pferdekauf-Ratgeber
  </Link>
</p>
```

### Cross-Spoke Links
**Minimum**: 1-2 Links zu verwandten Spoke-Artikeln
**Beispiel**: "warmblut-kaufen" → "pferdeankaufsuntersuchung"

### Link-Verteilung (PageRank-Optimierung)
**Hub-Artikel**: Sollen MEISTE interne Links erhalten
**Ziel**: Hub-Artikel als "Authority Pages" etablieren

**Berechnung** (für Scripts):
```python
hub_importance_score = (
    incoming_spoke_links * 2.0 +  # Spoke → Hub (wichtigster Faktor)
    outgoing_spoke_links * 1.0 +  # Hub → Spoke
    cross_spoke_mentions * 0.5    # Spoke erwähnt Hub-Thema
)
```

---

## 🛠️ Implementation in SEO-Optimierung

### Phase 1: Analyse - Hub/Spoke-Detection
```python
# Im Analysis-Agent

def detect_article_type(article_path):
    """Erkenne ob Artikel Hub oder Spoke ist"""

    # Hub-Indikatoren:
    # - Word count > 2500
    # - Main keyword SV > 500
    # - Title enthält breite Begriffe (Guide, Ratgeber, Alles über)
    # - Viele ausgehende interne Links (5+)

    # Spoke-Indikatoren:
    # - Word count < 2500
    # - Long-tail keyword (word count > 3)
    # - Spezifisches Thema
    # - Wenige ausgehende Links (1-3)

    return "hub" or "spoke"

def find_related_hub(spoke_article):
    """Finde den thematischen Hub für einen Spoke"""

    # 1. Extrahiere main keyword aus Spoke
    # 2. Suche Hub-Artikel mit ähnlichem semantic Topic
    # 3. Check bestehende Links (Spoke → Hub vorhanden?)

    return hub_article_slug or None
```

### Phase 2: Duplicate Content Check
```python
def check_content_overlap(hub_path, spoke_path):
    """Prüfe Content-Overlap zwischen Hub und Spoke"""

    hub_content = extract_paragraphs(hub_path)
    spoke_content = extract_paragraphs(spoke_path)

    # Cosine Similarity auf Paragraph-Level
    overlaps = []
    for hub_p in hub_content:
        for spoke_p in spoke_content:
            similarity = cosine_similarity(hub_p, spoke_p)
            if similarity > 0.7:  # 70%+ ähnlich
                overlaps.append({
                    'hub_paragraph': hub_p,
                    'spoke_paragraph': spoke_p,
                    'similarity': similarity
                })

    overlap_ratio = len(overlaps) / len(spoke_content)

    return {
        'overlap_ratio': overlap_ratio,
        'status': 'PASS' if overlap_ratio < 0.3 else 'FAIL',
        'overlapping_sections': overlaps
    }
```

### Phase 3: Internal Linking Audit
```python
def audit_internal_linking(article_path, article_type):
    """Prüfe interne Link-Struktur"""

    links = extract_internal_links(article_path)
    hub_links = [l for l in links if is_hub_article(l)]
    spoke_links = [l for l in links if is_spoke_article(l)]

    if article_type == "spoke":
        required_hub_links = 2
        if len(hub_links) < required_hub_links:
            return {
                'status': 'FAIL',
                'issue': f'Nur {len(hub_links)}/{required_hub_links} Hub-Links',
                'action': 'Add hub links to first paragraph + end'
            }

    elif article_type == "hub":
        required_spoke_links = 3
        if len(spoke_links) < required_spoke_links:
            return {
                'status': 'FAIL',
                'issue': f'Nur {len(spoke_links)}/{required_spoke_links} Spoke-Links',
                'action': 'Add spoke links in relevant sections'
            }

    return {'status': 'PASS'}
```

### Phase 4: Auto-Fix Internal Linking
```typescript
// Im pferdewert-frontend-dev Agent

function addHubLinkToSpoke(spokePath: string, hubSlug: string) {
  // 1. Lese Spoke-Artikel
  // 2. Finde ersten <p>-Tag im Content
  // 3. Füge Hub-Link ein:

  const hubLink = `
In unserem umfassenden <Link href="/pferde-ratgeber/${hubSlug}">
  ${getHubTitle(hubSlug)}
</Link> findest du alle Basics zum Thema.
  `.trim();

  // Insert after first paragraph
  // Edit tool verwenden
}

function addSpokeLinkToHub(hubPath: string, spokeSlug: string) {
  // 1. Lese Hub-Artikel
  // 2. Finde relevante Section (semantic match)
  // 3. Füge Spoke-Link ein:

  const spokeLink = `
→ [${getSpokeTitle(spokeSlug)}](/pferde-ratgeber/${spokeSlug})
  `.trim();

  // Insert in relevant H2 section
}
```

---

## 📊 Tracking & Validation

### Pre-Publish-Checks
```bash
# Check vor jedem neuen Artikel
npm run validate-hub-spoke -- --article=neuer-artikel

# Output:
✅ Article Type: spoke
✅ Related Hub: pferd-kaufen-tipps
❌ Duplicate Content: 35% overlap (max 30%)
✅ Hub Links: 2/2 required
⚠️  Cross-Spoke Links: 0/1 recommended

Issues to fix:
1. Reduce paragraph overlap in Section "Kaufentscheidung"
2. Add link to related spoke article "pferdeankaufsuntersuchung"
```

### Monthly Hub-Score
```bash
# Berechne Hub-Authority-Score
npm run hub-score-report

# Output:
Hub: pferd-kaufen-tipps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Incoming Spoke Links:    8/10 spokes ✅
Outgoing Spoke Links:    5/10 spokes ⚠️
Cross-Spoke Mentions:    12 mentions ✅
Avg. Link Quality:       8.5/10 ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hub Authority Score:     87/100 🟢

Recommendations:
1. Add links to missing spokes: warmblut-kaufen, dressurpferd-kaufen
2. Ensure all spokes link back in first paragraph
```

---

## 🔧 Integration in /seo-optimierung Command

### Erweitere Phase 1 Analysis:
```markdown
STEP 6: Hub-Spoke-Analysis
- Detect article type (hub/spoke)
- Find related hub (if spoke)
- Check duplicate content with hub (if spoke)
- Audit internal linking (hub ↔ spoke)
- Calculate hub-authority-score (if hub)

Save to: SEO/OPTIMIZATIONS/$ARTICLE_SLUG/hub-spoke-analysis.json
```

### Erweitere Phase 3 Implementation:
```markdown
STEP 6: Fix Hub-Spoke-Linking

IF article is SPOKE:
  - Add hub link to first paragraph (if missing)
  - Add hub link to conclusion (if missing)
  - Add 1-2 cross-spoke links

IF article is HUB:
  - Add links to all related spokes (min 3)
  - Ensure spokes are mentioned in relevant sections
  - Create "Weitere Artikel" section at end

STEP 7: Reduce Duplicate Content (if overlap > 30%)
  - Identify overlapping paragraphs
  - Rewrite spoke sections with unique angle
  - Add unique examples/data
```

---

## 📝 Hub-Spoke-Mapping (Current)

### Hub: Pferdekauf
**Slug**: `pferd-kaufen-tipps`
**Spokes**:
- ❌ `warmblut-kaufen` (MISSING - needs creation)
- ❌ `freizeitpferd-kaufen` (MISSING)
- ✅ `pferd-kaufen-vertrag`
- ❌ `pferdeankaufsuntersuchung` (MISSING)
- ❌ `pferd-kaufen-kosten` (MISSING)

### Hub: Pferdehaltung
**Slug**: `pferde-haltung-kosten`
**Spokes**:
- ❌ `offenstall-kosten` (MISSING)
- ❌ `boxenhaltung-kosten` (MISSING)
- ❌ `pferdepension-finden` (MISSING)

### Hub: Pferdegesundheit
**Slug**: TBD (needs creation)
**Spokes**:
- ✅ `kolik-pferd-symptome`
- ✅ `hufgeschwuer-behandlung`
- ❌ `erste-hilfe-pferd` (MISSING)

### Hub: Pferdebewertung (Service-Hub)
**Slug**: TBD (needs creation - promotes our service!)
**Spokes**:
- ❌ `pferdewert-ermitteln` (MISSING)
- ❌ `pferd-verkaufen-preis` (MISSING)
- ❌ `pferd-versichern-wert` (MISSING)

---

## 🎯 Actionable Next Steps

1. **Audit existing articles**:
   ```bash
   /seo-optimierung pferd-kaufen-tipps
   /seo-optimierung pferd-kaufen-vertrag
   # → Check overlap + linking
   ```

2. **Create missing Hub-Spoke-Mappings**:
   ```bash
   # Create mapping file
   echo '{ "hubs": [...] }' > SEO/hub-spoke-mapping.json
   ```

3. **Implement validation scripts**:
   ```bash
   # In package.json
   "scripts": {
     "validate-hub-spoke": "node scripts/validate-hub-spoke.mjs",
     "hub-score-report": "node scripts/hub-score-report.mjs"
   }
   ```

4. **Integrate in CI/CD**:
   - Pre-commit hook: Check duplicate content
   - PR checks: Validate internal linking
   - Monthly: Generate hub-score-report

---

## 📖 Quick Reference

### Spoke-Artikel Checklist
- [ ] Word count: 1500-2500
- [ ] Max 30% content overlap with hub
- [ ] Hub-Link im ersten Paragraph
- [ ] Hub-Link am Ende
- [ ] 1-2 Cross-Spoke-Links
- [ ] Unique FAQ section
- [ ] Unique examples/data

### Hub-Artikel Checklist
- [ ] Word count: 2500-4000
- [ ] Links zu ALLEN relevanten Spokes (min 3)
- [ ] Spokes in passenden Sections erwähnt
- [ ] "Weitere Artikel"-Section am Ende
- [ ] Breadth over depth (Überblick, nicht Deep-Dive)

### Link-Quality Checklist
- [ ] Descriptive anchor text (nicht "hier klicken")
- [ ] Keyword in anchor text (wenn natural)
- [ ] Kontextuell platziert (im Text-Flow)
- [ ] Rel=nofollow NICHT setzen (interne Links!)

---

**Status**: ✅ Ready for Implementation
**Last Updated**: 2025-01-11
**Next Review**: Nach 10 neuen Artikeln
