# SEO Content Creation Prompt

---

Keyword: 

```
Erstelle einen vollständig SEO-optimierten Artikel für das Keyword.

**Prozess-Dokumentation**: Folge exakt dem definierten Prozess in `/Users/benjaminreder/Library/CloudStorage/Dropbox/Startups - Business/PferdeWert/Code Repository/pferdewert/SEO/seo-analysis-results.md`

**Prozess-Kette**: 1 → 2 → 3 → 6 (Keyword Research → Analyse → Outline → Content Creation)

## Anforderungen

### 1. Setup & Validierung
- Erstelle Ordner-Struktur: `SEO/SEO-CONTENT/{keyword}/`
- Initialisiere `process-tracker.json` mit allen erforderlichen Phasen
- Lade Company Profile: `SEO/company/company-profile-*.md`
- Falls Company Profile fehlt: STOP und fordere Erstellung an

### 2. Prozess-Ausführung
Führe alle Prozesse gemäß `seo-analysis-results.md` aus:

**Prozess 1+2 - Keyword Research**:
- Ausgabe: `{keyword}-research.json`
- Validierung: Min. 50 Keywords mit Search Volume + Intent

**Prozess 3 - Competitor & Outline**:
- Ausgaben: `{keyword}-competitors.json`, `{keyword}-outline.md`
- Validierung: Min. 5 Competitors, vollständiges H1-H3 Outline, min. 5 FAQ

**Prozess 6 - Content Creation**:
- Ausgaben: `{keyword}-article.md`, `{keyword}-meta.json`
- Validierung: >1500 Wörter, Keyword-Dichte 1-2%, komplette Meta-Daten
- **CRITICAL**: NIEMALS "kostenlos"/"free" verwenden (Pricing-Policy)

### 3. Continuous Validation
Nach jeder Phase:
- Aktualisiere `process-tracker.json` mit completed_phases
- Prüfe ob alle Dateien existieren
- Bei fehlenden Dateien: Setze zurück zur fehlenden Phase und führe erneut aus

### 4. Quality Check
Am Ende:
- Validiere alle 5 erforderlichen Dateien existieren
- Prüfe Company Profile Compliance
- Prüfe Pricing-Policy (kein "kostenlos")
- Prüfe Word Count und Meta-Daten
- Bei Mängeln: Wiederhole betroffene Phase mit allen vorhandenen Daten

## Erforderliche Ausgabe-Dateien
```
SEO/SEO-CONTENT/{keyword}/
├── process-tracker.json        # Prozess-Status
├── {keyword}-research.json     # Prozess 1+2
├── {keyword}-competitors.json  # Prozess 3
├── {keyword}-outline.md        # Prozess 3
├── {keyword}-article.md        # Prozess 6
└── {keyword}-meta.json         # Prozess 6
```

## Completion Criteria
✅ Alle 6 Dateien existieren
✅ process-tracker.json zeigt status: "completed"
✅ Quality Check bestanden
✅ Company Profile Standards erfüllt
✅ Keine "kostenlos"/"free" Erwähnungen

Starte jetzt die Content-Erstellung!
```

---

## Beispiel-Verwendung

```bash
# Keyword einsetzen und Prompt direkt an Claude senden:

Erstelle einen vollständig SEO-optimierten Artikel für das Keyword: **pferd kaufen bayern**

[... rest des Prompts ...]
```

## Agent-Empfehlung
Nutze vorzugsweise den `seo-content-writer` Agent für optimale Ergebnisse.
Am Ende soll ein Agent prüfen, ob alle Dateien im Ordner vorhanden sind. wenn nicht soll der prozess dort wieder gestartet werden welches dokument fehlt und dann nochmal von dort komplett durchlaufen werden mit neuem content, auch der finale artikel soll dann überschrieben werden wenn nicht alle dokumente vorhanden waren.