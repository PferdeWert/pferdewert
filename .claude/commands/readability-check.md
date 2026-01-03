---
argument-hint: <url>
description: Prüft Readability einer Seite mit DataForSEO (Ziel: Flesch ≥60)
allowed-tools: mcp__dataforseo__on_page_instant_pages, Read
---

Du prüfst die Readability einer URL oder lokalen Datei.

**Target**: "$ARGUMENTS"

## Workflow

### 1. URL oder Datei prüfen
- Wenn URL (https://...): Nutze `mcp__dataforseo__on_page_instant_pages`
- Wenn Dateipfad: Lies Datei und analysiere manuell

### 2. DataForSEO API Call (für URLs)
```
mcp__dataforseo__on_page_instant_pages:
{
  "url": "$ARGUMENTS"
}
```

### 3. Extrahiere Readability-Metriken aus Response
Aus `meta.content`:
- `flesch_kincaid_readability_index` → Hauptmetrik
- `automated_readability_index` → Schulklassen-Niveau
- `coleman_liau_readability_index` → Alternative
- `smog_readability_index` → Komplexität
- `plain_text_word_count` → Wortanzahl

### 4. Bewertung ausgeben

**Flesch-Kincaid Score Interpretation:**
| Score | Niveau | Status |
|-------|--------|--------|
| 90-100 | 5. Klasse | ✅ Sehr einfach |
| 80-89 | 6. Klasse | ✅ Einfach |
| 70-79 | 7. Klasse | ✅ Gut |
| **60-69** | **8. Klasse** | **✅ Ziel erreicht!** |
| 50-59 | 10. Klasse | ⚠️ Grenzwertig |
| 30-49 | Abitur/Uni | ❌ Zu komplex |
| 0-29 | Akademisch | ❌ Viel zu komplex |

### 5. Output Format

```
## Readability Check: [URL]

### Scores
| Metrik | Wert | Status |
|--------|------|--------|
| Flesch-Kincaid | XX | ✅/❌ |
| Schulklassen-Niveau | X. Klasse | |
| Wortanzahl | XXXX | |

### Bewertung
[✅ Readability OK / ❌ Readability zu niedrig]

### Empfehlungen (wenn Score < 60)
1. Sätze kürzen: Max 15 Wörter pro Satz
2. Schachtelsätze auflösen
3. Einfachere Wörter verwenden
4. Passiv → Aktiv umformulieren
```

## Beispiel

Input: `https://pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd`

Output:
```
## Readability Check: was-kostet-ein-pferd

### Scores
| Metrik | Wert | Status |
|--------|------|--------|
| Flesch-Kincaid | 34.3 | ❌ Zu komplex |
| Schulklassen-Niveau | 12. Klasse | ⚠️ Zu hoch |
| Wortanzahl | 3966 | ✅ OK |

### Bewertung
❌ **Readability zu niedrig!** Ziel: ≥60, Ist: 34

### Empfehlungen
1. Durchschnittliche Satzlänge reduzieren (Ziel: 15 Wörter)
2. Komplexe Fachbegriffe erklären oder ersetzen
3. Schachtelsätze in mehrere kurze Sätze aufteilen
4. Passive Formulierungen durch aktive ersetzen
```
