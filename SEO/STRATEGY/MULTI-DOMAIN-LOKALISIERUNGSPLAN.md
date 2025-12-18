# Multi-Domain Lokalisierungsplan für PferdeWert

**Status:** Phase 1 implementiert ✅ | Phase 2 offen
**Erstellt:** 17. Dezember 2025
**Zuletzt aktualisiert:** 18. Dezember 2025
**Strategie:** Radikale Entschlankung - AT/CH = Conversion-Maschinen, .de = Content-Hub

---

## Aktueller Stand

### ✅ Phase 1: Implementiert
- [x] Whitelist-Config in `lib/country-exclusive-pages.ts`
- [x] Middleware: 301-Redirect für nicht-erlaubte Seiten
- [x] Header: Kein Ratgeber-Link auf AT/CH (nur "Pferd kaufen" + "Über uns")
- [x] Footer: SEO-Magnet-Links für AT/CH

### 🚀 Phase 2: Content-Lokalisierung (optional)
- [ ] Homepage lokalisieren (Geo-Tags, Trust-Signale)
- [ ] Formular-Seite lokalisieren (Währung, Beispiele)

### 📊 Phase 3: Monitoring
- [ ] Deployment auf Vercel
- [ ] Sitemaps neu generieren (`npm run sitemap`)
- [ ] Google Search Console: Sitemaps einreichen
- [ ] Nach 2-4 Wochen: Indexierung & Rankings prüfen

---

## 1. Strategie: Radikale Entschlackung

### Kernprinzip
```
.de  = Content-Hub (alle Ratgeber, alle Rassen, alle Regionen)
.at  = Conversion-Maschine (6 Seiten + 1 SEO-Magnet im Footer)
.ch  = Conversion-Maschine (6 Seiten + 1 SEO-Magnet im Footer)
```

### Philosophie
> **AT/CH-User kommen zum Bewerten, nicht zum Lesen.**
> Wer Ratgeber will, findet sie über Google auf .de.

### Warum radikal?
1. **Kein Duplicate Content** - Jede Seite existiert nur auf einer Domain
2. **Google MUSS indexieren** - Keine Alternative für AT/CH-Suchen
3. **Minimaler Wartungsaufwand** - 6 Seiten statt 25+ pro Domain
4. **Klare User Journey** - Kommen → Bewerten → Fertig
5. **Kein Ratgeber im Header** - User werden nicht abgelenkt
6. **SEO-Magnet versteckt** - Im Footer für Google crawlbar, nicht prominent

---

## 2. Seiten-Matrix

### Whitelist pro Domain

| Seite | .de | .at | .ch | Lokalisiert? |
|-------|:---:|:---:|:---:|:-------------|
| `/` | ✅ | ✅ | ✅ | Phase 2 |
| `/pferde-preis-berechnen` | ✅ | ✅ | ✅ | Phase 2 |
| `/pferd-kaufen/` (Hub) | ✅ | ✅ | ✅ | Keine Tiles auf AT/CH |
| `/pferd-kaufen/oesterreich` | ❌ | ✅ | ❌ | ✅ SEO-Magnet |
| `/pferd-kaufen/schweiz` | ❌ | ❌ | ✅ | ✅ SEO-Magnet |
| `/pferd-kaufen/{region}` | ✅ | ❌ | ❌ | DE-Regionen |
| `/pferd-kaufen/{rasse}` | ✅ | ❌ | ❌ | Rassen |
| `/pferde-ratgeber/*` | ✅ | ❌ | ❌ | Nur .de |
| `/ueber-pferdewert` | ✅ | ✅ | ✅ | - |
| `/impressum`, `/datenschutz`, `/agb` | ✅ | ✅ | ✅ | - |

### Ergebnis
- **.de:** ~30 Seiten (Content-Hub)
- **.at:** 6 Seiten (Conversion + SEO-Magnet)
- **.ch:** 6 Seiten (Conversion + SEO-Magnet)

---

## 3. Technische Implementierung

### 3.1 Whitelist-Config
**Datei:** `frontend/lib/country-exclusive-pages.ts`

```typescript
export const COUNTRY_ALLOWED_PATHS: Record<CountryCode, readonly string[]> = {
  DE: ['*'], // All pages allowed
  AT: ['/', '/pferde-preis-berechnen', '/pferd-kaufen', '/pferd-kaufen/oesterreich',
       '/ueber-pferdewert', '/impressum', '/datenschutz', '/agb'],
  CH: ['/', '/pferde-preis-berechnen', '/pferd-kaufen', '/pferd-kaufen/schweiz',
       '/ueber-pferdewert', '/impressum', '/datenschutz', '/agb'],
};
```

### 3.2 Middleware: 301 Redirect
**Datei:** `frontend/middleware.ts`

- Nicht-erlaubte Seiten → 301-Redirect zur Homepage
- Besser für UX (keine Sackgasse) und SEO (Link Equity erhalten)

### 3.3 Header: Conditional Navigation
**Datei:** `frontend/components/Header.tsx`

| Domain | Navigation |
|--------|------------|
| .de | Ratgeber (Dropdown) + Über uns |
| .at/.ch | Pferd kaufen + Über uns |

### 3.4 Footer: SEO-Magnet Links
**Datei:** `frontend/components/Footer.tsx`

| Domain | Footer-Link |
|--------|-------------|
| .at | "Pferdekauf Österreich" → `/pferd-kaufen/oesterreich` |
| .ch | "Pferdekauf Schweiz" → `/pferd-kaufen/schweiz` |
| .de | Keine zusätzlichen Links |

---

## 4. Phase 2: Content-Lokalisierung

### 4.1 Homepage lokalisieren

**Aktueller Stand:** Stark DE-fokussiert
- Meta-Tags: `geo.region: DE`, `geo.country: Deutschland`
- Texte: "deutschen Pferdemarktes", "50.000 Verkaufsdaten aus Deutschland"
- Schema: `areaServed: Deutschland`

**Zu lokalisieren für AT:**

| Element | DE (aktuell) | AT (neu) |
|---------|--------------|----------|
| Geo Meta | `geo.region: DE` | `geo.region: AT` |
| Trust-Signal | "100+ erfolgreiche Bewertungen" | "Auch in Österreich verfügbar" |
| Marktplatz-Referenz | - | willhaben.at, ehorses.at |
| Schema areaServed | Deutschland | Österreich |

**Zu lokalisieren für CH:**

| Element | DE (aktuell) | CH (neu) |
|---------|--------------|----------|
| Geo Meta | `geo.region: DE` | `geo.region: CH` |
| Währung | € implizit | CHF erwähnen |
| Marktplatz-Referenz | - | anibis.ch, tutti.ch |
| Schema areaServed | Deutschland | Schweiz |

### 4.2 Formular-Seite lokalisieren

**Mögliche Anpassungen:**

| Element | DE | AT | CH |
|---------|----|----|-----|
| Beispielpreise | Deutsche Preise | Österreichische Preise | CHF-Preise |
| Zahlungsmethoden | Alle | +EPS hervorheben | - |
| Trust-Text | "deutscher Pferdemarkt" | "österreichischer Pferdemarkt" | "Schweizer Pferdemarkt" |

### 4.3 Hub-Seite `/pferd-kaufen/` auf AT/CH

**Strategie:** Keine lokalen Tiles auf AT/CH.

- Hub-Seite zeigt auf AT/CH **keine Regionen-Tiles** (Bayern, NRW, etc.)
- Der einzige lokale Content ist `/pferd-kaufen/oesterreich` bzw. `/schweiz`
- Dieser ist **nur im Footer verlinkt** (SEO-Magnet, nicht prominent)
- User sollen direkt zur Bewertung, nicht durch Tiles abgelenkt werden

---

## 5. SEO-Auswirkungen

### Erwartete Ergebnisse

| Metrik | Vorher | Nach Phase 1 | Nach Phase 2 |
|--------|--------|--------------|--------------|
| Seiten auf .at/.ch | ~25 | 6 | 6 |
| Duplicate Content | 100% | 0% | 0% |
| Lokale Trust-Signale | 0 | 0 | ✅ |
| Wartungsaufwand | Hoch | Minimal | Minimal |

### User Journey (AT)

```
AT-User sucht "Pferdebewertung Österreich"
         │
         ▼
Google zeigt pferdewert.at (einzige Option!)
         │
         ▼
User landet auf pferdewert.at/
(Lokalisierte Homepage mit AT-Trust-Signalen)
         │
         ├── Klickt "Pferd bewerten" → /pferde-preis-berechnen ✅
         │   (Lokalisiert mit österreichischen Beispielen)
         │
         └── Will Ratgeber? → Nicht im Header sichtbar
             → Findet über Google auf pferdewert.de
```

---

## 6. Implementierungshinweise

### Homepage-Lokalisierung (useCountryConfig)

```typescript
// In pages/index.tsx
const { isAustria, isSwitzerland, isGermany } = useCountryConfig();

// Geo Meta Tags
<meta name="geo.region" content={isAustria ? "AT" : isSwitzerland ? "CH" : "DE"} />
<meta name="geo.country" content={isAustria ? "Österreich" : isSwitzerland ? "Schweiz" : "Deutschland"} />

// Trust-Signal
{isAustria && <span>Auch für den österreichischen Pferdemarkt</span>}
{isSwitzerland && <span>Auch für den Schweizer Pferdemarkt</span>}

// Schema.org areaServed
areaServed: {
  "@type": "Country",
  "name": isAustria ? "Österreich" : isSwitzerland ? "Schweiz" : "Deutschland"
}
```

### Prioritäten

1. **Hoch:** Homepage Geo-Tags + Schema (SEO-kritisch)
2. **Mittel:** Trust-Signale auf Homepage (Conversion)
3. **Niedrig:** Formular-Beispielpreise (Nice-to-have)

---

## 7. Änderungsverlauf

| Datum | Änderung |
|-------|----------|
| 17.12.2025 | Initial: Blacklist-Ansatz für regionale Seiten |
| 18.12.2025 | Refactoring: Whitelist-Ansatz für radikale Entschlackung |
| 18.12.2025 | Ergänzt: Phase 2 Lokalisierungsplan mit konkreten Anpassungen |
| 18.12.2025 | Vereinfacht: Keine Tiles auf AT/CH Hub, nur Footer-SEO-Magnet |
