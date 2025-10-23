# Troubleshooting: Bewertungen (Evaluations)

## Problem: Unvollständige Bewertungen

**Symptom**: Backend (Render) war beim ersten Versuch nicht erreichbar, daher wurde die Fallback-Nachricht gespeichert statt der vollständigen KI-Bewertung.

**Lösung**: Bewertung nachträglich über das Backend generieren und in der Datenbank aktualisieren.

---

## Wichtiger Hinweis: Datenbank-Umgebung

⚠️ **CRITICAL**: Bewertungen sind in der `test` Datenbank, nicht in `pferdewert`.

Deshalb muss bei allen Scripts die Environment Variable gesetzt werden:
```bash
MONGODB_DB=test
```

---

## Verfügbare Helper Scripts

### 1. Bewertung nachträglich generieren
Regeneriert eine Bewertung für eine bestehende Bewertungs-ID:

```bash
MONGODB_DB=test node scripts/regenerate-evaluation.mjs <bewertung-id>
```

**Use Case**: Backend war nicht erreichbar und Fallback wurde gespeichert

---

### 2. Unvollständige Bewertungen finden
Findet alle Bewertungen mit Fallback-Nachricht:

```bash
MONGODB_DB=test node scripts/find-incomplete-evaluations.mjs
```

**Use Case**: Systematisches Aufspüren von fehlgeschlagenen Bewertungen

---

### 3. Bewertungsdetails abrufen
Zeigt vollständige Details einer Bewertung:

```bash
node scripts/get-evaluation-details.mjs <bewertung-id>
```

**Use Case**: Debugging und Analyse einer spezifischen Bewertung

---

### 4. Alle Datenbanken auflisten
Listet alle verfügbaren MongoDB Datenbanken auf:

```bash
node scripts/list-databases.mjs
```

**Use Case**: Verifizieren welche Datenbanken existieren (test vs. pferdewert)

---

## Typischer Workflow

1. **Problem erkennen**: Nutzer meldet fehlende Bewertung
2. **Unvollständige finden**: `find-incomplete-evaluations.mjs` ausführen
3. **Details prüfen**: `get-evaluation-details.mjs <id>` für Kontext
4. **Regenerieren**: `MONGODB_DB=test regenerate-evaluation.mjs <id>`

---

## Hintergrund: Warum test Datenbank?

Die Bewertungen werden in der `test` Datenbank gespeichert, während andere Produktionsdaten möglicherweise in der `pferdewert` Datenbank liegen. Dies ist eine bewusste Trennung für Entwicklung und Testing.

Bei Produktivbetrieb muss die korrekte Datenbank in den Environment Variables konfiguriert werden.
