---
name: image-processing
description: Verarbeitet Bilder für PferdeWert - konvertiert zu WebP mit sprechendem Namen. Automatisch verwenden wenn User einen Bild-Link schickt!
allowed-tools: Bash, Read, Write
---

# Bild-Verarbeitung für PferdeWert

## Wann diesen Skill verwenden
- User schickt einen Bild-Link (URL zu einem Bild)
- User bittet dich, ein Bild zu verwenden/hinzuzufügen
- Neue Ratgeber-Seite braucht ein Bild

## Kritische Regeln

### 1. Sprechender Dateiname (NIEMALS Slug!)
- **VERBOTEN**: Dateiname = Page-Slug (z.B. `pferd-kaufen-bayern.webp` für `/pferde-ratgeber/pferd-kaufen-bayern`)
- **GRUND**: Führt zu doppelter Verwendung wenn gleicher Slug woanders genutzt wird!
- **RICHTIG**: Beschreibender Name der das Bild-MOTIV beschreibt

**Beispiele:**
| Slug | FALSCH | RICHTIG |
|------|--------|---------|
| pferd-kaufen-bayern | pferd-kaufen-bayern.webp | braunes-warmblut-auf-koppel.webp |
| pony-kaufen | pony-kaufen.webp | shetland-pony-mit-kind.webp |
| pferdepflege-winter | pferdepflege-winter.webp | pferd-mit-winterdecke-im-schnee.webp |

### 2. WebP-Konvertierung
Konvertiere IMMER zu WebP mit optimaler Qualität:

```bash
# Für JPG/PNG → WebP
sips -s format webp -s formatOptions 80 input.jpg --out /Users/benjaminreder/Developer/pferdewert/frontend/public/images/ratgeber/sprechender-name.webp

# Oder mit ImageMagick (falls installiert)
convert input.jpg -quality 80 -resize "1200x800>" output.webp
```

### 3. Zielverzeichnis
Alle Ratgeber-Bilder gehören nach:
```
frontend/public/images/ratgeber/
```

### 4. Optimale Bildgröße
- Breite: max 1200px
- Qualität: 80% (guter Kompromiss)
- Format: WebP

## Workflow

1. **Bild herunterladen** (wenn URL gegeben)
2. **Motiv analysieren** - Was zeigt das Bild konkret?
3. **Sprechenden Namen wählen** - Beschreibt das Motiv, NICHT die Seite
4. **Zu WebP konvertieren** mit sips
5. **In richtiges Verzeichnis speichern**
6. **Bildattribution prüfen** - Siehe `docs/image-attribution-guide.md` bei externen Bildern

## Beispiel-Ablauf

User: "Verwende dieses Bild: https://example.com/horse.jpg für die Seite pferd-kaufen-nrw"

```bash
# 1. Herunterladen
curl -o /tmp/temp-horse.jpg "https://example.com/horse.jpg"

# 2. Motiv analysieren → z.B. "Fuchs-Pferd springt über Hindernis"

# 3. Konvertieren mit sprechendem Namen
sips -s format webp -s formatOptions 80 /tmp/temp-horse.jpg --out /Users/benjaminreder/Developer/pferdewert/frontend/public/images/ratgeber/fuchs-springpferd-hindernis.webp

# 4. Aufräumen
rm /tmp/temp-horse.jpg
```

## Checkliste vor Abschluss
- [ ] Dateiname beschreibt das MOTIV, nicht die Seite
- [ ] Format ist WebP
- [ ] Liegt in `frontend/public/images/ratgeber/`
- [ ] Keine Duplikate mit bestehendem Namen
- [ ] Bei externen Bildern: Attribution geprüft
