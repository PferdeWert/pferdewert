# SEO Artikel-Automatisierung - Implementierungsplan

**Erstellt:** 2025-12-14
**Status:** In Implementierung

---

## Ziel
Tägliche, vollautomatische Erstellung von SEO-optimierten Mini-Pages auf dem Hetzner Server ohne manuellen Eingriff.

## Bestätigter Status (Hetzner Server)
- [x] Claude Code CLI v1.0.80 funktioniert
- [x] DataForSEO MCP funktioniert (API-Call getestet: 40.500 SV für "pferd kaufen")
- [x] Alle Commands/Agents vorhanden
- [x] Git konfiguriert und aktuell

---

## Architektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HETZNER CRON (täglich 6:00)                  │
│                                                                      │
│  1. article_queue.json     2. /seo-mini        3. German Quality    │
│     ─────────────────>        ─────────>          ─────────────>    │
│     (nächstes Keyword)        (Content)           (Sprachprüfung)   │
│                                                                      │
│  4. /page                  5. Git Push          6. Telegram         │
│     ─────────────────>        ─────────>          ─────────────>    │
│     (Next.js Page)            (GitHub)            (Notification)    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────┐
                    │ Vercel Auto  │
                    │ Deploy       │
                    └──────────────┘
```

---

## Zu erstellende Dateien

### 1. `/seo-mini` Command
**Pfad:** `.claude/commands/seo-mini.md`
**Status:** [ ] Erstellt

**Aufruf:**
```bash
/seo-mini <keyword> --pillar=<pillar-slug>
```

**Phasen:**
1. Pillar-Check: Liest Pillar-Artikel, extrahiert behandelte Themen
2. Keyword-Research: DataForSEO für lokale/regionale Keywords
3. Content-Erstellung: NUR unique Inhalte (800-1000 Wörter)
4. Internal-Linking: Generiert `internal-linking.json` mit **garantiertem Pillar-Link**

**Anti-Duplikat-Logik:**
- Liest existierenden Pillar-Content
- Extrahiert H2/H3 Themen
- Content darf diese Themen NICHT wiederholen
- Fokus auf lokale/regionale UNIQUE Aspekte

---

### 2. German Quality Agent
**Pfad:** `.claude/agents/german-quality-checker.md`
**Status:** [ ] Erstellt

**Prüfkriterien:**
- Natürlicher Sprachfluss (keine keyword-stuffed Sätze)
- Grammatik und Rechtschreibung
- Satzstruktur
- Keyword-Integration: Wenn unnatürlich → umformulieren
- **Pillar-Link vorhanden?** → Fehler wenn nicht!

**Beispiel-Korrekturen:**
| Vorher (schlecht) | Nachher (gut) |
|-------------------|---------------|
| "Wenn Sie Pferd kaufen Bayern möchten" | "Wenn Sie in Bayern ein Pferd kaufen möchten" |
| "Islandpferd kaufen ist eine gute Wahl beim Islandpferd kaufen" | "Der Kauf eines Islandpferdes ist eine bereichernde Entscheidung" |

**Regel:** Korrektes Deutsch > Perfekte Keyword-Platzierung

---

### 3. `daily_article.py` Orchestrator
**Pfad:** `scripts/daily_article.py`
**Status:** [ ] Erstellt

```python
def main():
    # 1. Nächsten Artikel aus Queue holen
    article = get_next_from_queue()

    # 2. Content erstellen mit /seo-mini
    run_claude(f"/seo-mini {article['keyword']} --pillar={article['pillar']}")

    # 3. German Quality Check
    run_claude(f"german-quality-checker: prüfe {article['keyword']}")

    # 4. Page generieren mit /page
    run_claude(f"/page {article['keyword']}")

    # 5. Git commit & push
    git_push(article['keyword'])

    # 6. Queue aktualisieren
    mark_completed(article)

    # 7. Telegram Notification
    send_telegram(f"✅ Artikel erstellt: {article['keyword']}")
```

---

### 4. `article_queue.json`
**Pfad:** `SEO/article_queue.json`
**Status:** [ ] Erstellt

```json
{
  "pending": [
    {
      "keyword": "islandpferd kaufen",
      "type": "mini",
      "pillar": "pferd-kaufen",
      "priority": 1
    }
  ],
  "completed": [],
  "failed": []
}
```

---

### 5. Cron Job
**Status:** [ ] Konfiguriert

```bash
# Auf Hetzner einrichten:
0 6 * * * cd /home/dev && python3 scripts/daily_article.py >> logs/daily_article.log 2>&1
```

---

## Implementierungs-Reihenfolge

1. [x] Plan erstellen
2. [x] `/seo-mini` Command erstellen → `.claude/commands/seo-mini.md`
3. [x] `german-quality-checker` Agent erstellen → `.claude/agents/german-quality-checker.md`
4. [x] `daily_article.py` Script erstellen → `scripts/daily_article.py`
5. [x] `article_queue.json` mit ersten Keywords füllen → `SEO/article_queue.json` (12 Artikel)
6. [x] `image_fetcher.py` erstellen → `scripts/image_fetcher.py`
   - Wikimedia Commons API
   - WebP-Konvertierung (sips/ImageMagick/Pillow)
   - Sprechende Namensgebung basierend auf Bildinhalt
   - Regionale Rassen-Erkennung (Bayern→Bayerisches Warmblut)
   - Attributionen in JSON gespeichert
7. [x] Image Fetcher in Pipeline integriert (Phase 3)
8. [ ] Auf Hetzner deployen (git push)
9. [ ] Cron Job einrichten
10. [ ] 1 Woche Dry-Run testen

---

## Sicherheits-Features

1. **Dry-Run Mode**: Erste Woche nur simulieren, nicht pushen
2. **Max 1 Artikel/Tag**: Keine Spam-Gefahr
3. **Failed-Queue**: Fehlerhafte Artikel werden geloggt
4. **Manual Override**: Queue kann jederzeit editiert werden
5. **Pillar-Link Pflicht**: German Quality Agent prüft

---

## Referenz-Dateien

- Existierender `/seo` Command: `.claude/commands/seo.md`
- Existierender `/page` Command: `.claude/commands/page.md`
- Pillar-Page Beispiel: `frontend/pages/pferde-ratgeber/pferd-kaufen.tsx`
- Voice Bot Pattern: `scripts/voice_bot.py`
