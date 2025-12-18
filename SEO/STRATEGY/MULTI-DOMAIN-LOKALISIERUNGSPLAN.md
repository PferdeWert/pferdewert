# Multi-Domain Lokalisierung PferdeWert

**Status:** ✅ Implementiert | **Aktualisiert:** 18. Dezember 2025

---

## Strategie

```
.de = Content-Hub (28 Seiten: alle Ratgeber, Rassen, Regionen)
.at = Conversion-Maschine (7 Seiten)
.ch = Conversion-Maschine (7 Seiten)
```

**Prinzip:** AT/CH-User kommen zum Bewerten, nicht zum Lesen. Kein Duplicate Content.

---

## Seiten-Matrix

| Seite | .de | .at | .ch |
|-------|:---:|:---:|:---:|
| `/` | ✅ | ✅ | ✅ |
| `/pferde-preis-berechnen` | ✅ | ✅ | ✅ |
| `/pferd-kaufen/oesterreich` | ❌ | ✅ | ❌ |
| `/pferd-kaufen/schweiz` | ❌ | ❌ | ✅ |
| `/ueber-pferdewert` | ✅ | ✅ | ✅ |
| `/impressum`, `/datenschutz`, `/agb` | ✅ | ✅ | ✅ |
| `/pferd-kaufen/*` (Hub, Rassen, Regionen) | ✅ | ❌ | ❌ |
| `/pferde-ratgeber/*` | ✅ | ❌ | ❌ |

---

## Implementierung

### Whitelist (`lib/country-exclusive-pages.ts`)
```typescript
AT: ['/', '/pferde-preis-berechnen', '/pferd-kaufen/oesterreich',
     '/ueber-pferdewert', '/impressum', '/datenschutz', '/agb']
CH: ['/', '/pferde-preis-berechnen', '/pferd-kaufen/schweiz',
     '/ueber-pferdewert', '/impressum', '/datenschutz', '/agb']
```

### Middleware (`middleware.ts`)
- Nicht-erlaubte Seiten → 301-Redirect zur Homepage
- Blacklist: `/pferd-kaufen/oesterreich` nur auf .at, `/schweiz` nur auf .ch

### Header (`Header.tsx`)
| Domain | Navigation |
|--------|------------|
| .de | Ratgeber (Dropdown) + Über uns |
| .at | Pferdekauf Österreich + Über uns |
| .ch | Pferdekauf Schweiz + Über uns |

### Footer (`Footer.tsx`)
| Domain | SEO-Magnet Link |
|--------|-----------------|
| .at | Pferdekauf Österreich |
| .ch | Pferdekauf Schweiz |

### Homepage (`index.tsx`)
- Hero Badge: "🏆 #1 Online Pferdebewertung in Österreich/Schweiz"
- Geo-Tags: `geo.region: AT/CH`
- Schema: `areaServed: Österreich/Schweiz`

### Sitemaps
```bash
npm run sitemap
# DE: 28 Seiten | AT: 7 Seiten | CH: 7 Seiten
```

---

## Nächste Schritte

- [ ] Google Search Console: Sitemaps einreichen
- [ ] Nach 2-4 Wochen: Indexierung prüfen
