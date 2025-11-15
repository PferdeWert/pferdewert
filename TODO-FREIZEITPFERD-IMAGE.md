# TODO: Freizeitpferd-kaufen Hero-Bild Setup

## ⚠️ WICHTIG: Nur noch Bild-Konvertierung erforderlich

Die Seite `/pferde-ratgeber/freizeitpferd-kaufen` ist fertig und die Attribution ist bereits im Code hinterlegt!

**✅ Bereits erledigt:**
- ✅ Lizenz-Informationen verifiziert (CC BY-SA 2.5 - SICHER für kommerzielle Nutzung)
- ✅ Attribution in ATTRIBUTIONS.md hinzugefügt
- ✅ Attribution im Code aktualisiert

**⚠️ Noch zu tun:**
- [ ] Bild herunterladen und zu WebP konvertieren

---

## Lizenz-Informationen (Verifiziert)

**Wikimedia URL:** https://commons.wikimedia.org/wiki/File:Haflinger_Deckhengst_Fohlenhof_Ebbs_3.JPG

**Verifizierte Details:**
- **Author**: Böhringer Friedrich
- **License**: CC BY-SA 2.5 (SICHER - kommerziell nutzbar)
- **License URL**: https://creativecommons.org/licenses/by-sa/2.5/deed.en
- **Original Size**: 3,657 × 2,438 pixels (4.8 MB)
- **Date**: 8 May 2011

---

## 1. Bild von Wikimedia Commons herunterladen

**Download URL (Original):** https://upload.wikimedia.org/wikipedia/commons/6/62/Haflinger_Deckhengst_Fohlenhof_Ebbs_3.JPG

### Schritte:
1. Öffne die Download-URL im Browser (oder Rechtsklick → "Speichern unter" auf das Bild auf der Wikimedia-Seite)
2. Speichere als: `Haflinger_Deckhengst_Fohlenhof_Ebbs_3.jpg` in einem temporären Ordner

---

## 2. Bild konvertieren zu WebP

```bash
# Im frontend/public/images/ratgeber/ Verzeichnis
cd frontend/public/images/ratgeber/

# Mit ImageMagick konvertieren (85% Qualität)
convert /pfad/zum/download/Haflinger_Deckhengst_Fohlenhof_Ebbs_3.jpg \
  -resize 1920x1080^ \
  -gravity center \
  -extent 1920x1080 \
  -quality 85 \
  haflinger-deckhengst-fohlenhof-ebbs.webp

# Alternativ mit cwebp (Google WebP Tools)
cwebp -q 85 -resize 1920 1080 \
  /pfad/zum/download/Haflinger_Deckhengst_Fohlenhof_Ebbs_3.jpg \
  -o haflinger-deckhengst-fohlenhof-ebbs.webp
```

**⚠️ WICHTIG:** Stelle sicher, dass die Datei genau `haflinger-deckhengst-fohlenhof-ebbs.webp` heißt!

---

## 3. Testen

```bash
cd frontend
npm run dev
```

Öffne: http://localhost:3000/pferde-ratgeber/freizeitpferd-kaufen

Prüfe:
- [ ] Bild wird korrekt angezeigt
- [ ] Attribution unter dem Bild ist sichtbar und korrekt formatiert
- [ ] Keine Konsolenfehler bzgl. fehlendem Bild

---

## ✅ Checkliste

- [x] Lizenz-Informationen verifiziert (CC BY-SA 2.5 - kommerziell sicher! ✅)
- [x] Attribution in ATTRIBUTIONS.md hinzugefügt
- [x] Attribution im Code aktualisiert
- [ ] Bild von Wikimedia heruntergeladen
- [ ] Bild zu WebP konvertiert (1920x1080, 85% Qualität)
- [ ] Datei gespeichert als: `frontend/public/images/ratgeber/haflinger-deckhengst-fohlenhof-ebbs.webp`
- [ ] Page getestet im Browser
- [ ] Bild wird korrekt angezeigt und Attribution ist sichtbar

---

## 📝 Hinweise

**Lizenz:** Die Lizenz CC BY-SA 2.5 ist sicher für kommerzielle Nutzung! Du musst nur:
1. Den Autor nennen (✅ bereits im Code)
2. Link zur Lizenz bereitstellen (✅ bereits im Code)
3. Änderungen angeben (✅ bereits in ATTRIBUTIONS.md)
4. Abgeleitete Werke unter gleicher Lizenz veröffentlichen (wird automatisch durch Attribution erfüllt)
