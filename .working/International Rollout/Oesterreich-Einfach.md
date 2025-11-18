# Österreich-Rollout: Status & Quick Reference

**Erstellt:** 16. November 2025
**Status:** Phase 1-5 ✅ KOMPLETT (95% Production-Ready)
**Letztes Update:** 18. November 2025, 23:45 Uhr

---

## 🎯 QUICK STATUS

### ✅ FERTIG (Commits: fd8e357, 2872526)

**Phase 1-3: Core** ✅
- i18n Setup, System-Prompt, Formular, Backend
- 106 Links lokalisiert, E-Level für AT ausgeblendet

**Phase 4: SEO** ✅
- useSEO Hook, hreflang Tags, sitemap.xml (38 URLs)
- og:locale support, canonical URLs

**Phase 5: Payment** ✅ (18.11.2025) - PRODUCTION READY!
- EPS in Stripe aktiviert
- `user_country` (Kunde) vs `land` (Pferd) Unterscheidung
- Dynamische Payment Methods: EPS für AT, Standard für DE
- Strikte enum-Validierung: z.enum(['DE','AT'])
- Backend Integration: webhook.ts + FormState types
- Code Review: 95% Production-Ready

### ⏳ TESTING (0.5 Tag)

- Full Flows (DE/AT Kunden)
- Edge Cases (AT-Kunde/DE-Pferd, etc.)
- EPS Test-Zahlung im Stripe Test Mode
- Mobile/Desktop Tests

---

## 🎯 Das Konzept

### Die Wahrheit:
- ✅ **Gleiche Page** (kein separates pferdewert.at)
- ✅ **Gleicher Content** (99% identisch)
- ✅ **Gleiche Datenbank** (kein separater AT-DB)
- ✅ **10-20 Wörter** anders (Jänner statt Januar, etc.)
- ✅ **Formular-Tweak** (E-Level ausblenden, LP/LM hinzufügen für AT)
- ✅ **KI-Prompt: Bereits angepasst!** ✅
- ❌ **KEIN Anwalt** (DSGVO gilt EU-weit)
- ❌ **KEINE neue Datenschutzerklärung**
- ❌ **KEINE neue AGB**

**Aufwand:** 3-4 Tage Development (statt 5 - System-Prompt ist fertig!)
**Kosten:** €1.920 (32h × €60/h)
**Risiko:** Minimal

---

## 📋 Die 7 Komponenten

### 1. URL-Struktur mit /at/ Präfix

```
DE-Variante:              AT-Variante (neu):
pferdewert.de/            pferdewert.de/at/
/bewertung                /at/bewertung
/preise                   /at/preise
```

**Wichtig:** Content ist IDENTISCH, nur URL & locale sind anders!

---

### 2. Hreflang Tags (Duplicate Content Killer!)

```html
<!-- In jeder Page im <head>: -->
<link rel="alternate" hreflang="de" href="https://pferdewert.de/" />
<link rel="alternate" hreflang="de-AT" href="https://pferdewert.de/at/" />
<link rel="alternate" hreflang="x-default" href="https://pferdewert.de/" />
```

**Das ist die WICHTIGSTE SEO-Maßnahme!**
- Google zeigt DE-Usern: pferdewert.de/
- Google zeigt AT-Usern: pferdewert.de/at/
- Keine Duplicate Content Strafe ✅

---

### 3. Minimale Wort-Lokalisierung

**Realität für PferdeWert:**
- 99% der Texte sind identisch!
- Nur Monatsnamen relevant (Jänner statt Januar)
- Pferde-Fachbegriffe sind gleich (Dressur, Springen, Wallach, etc.)

```json
// messages/de-AT/common.json (nur die Unterschiede!)
{
  "months": {
    "january": "Jänner"
  }
}
```

**Fallback:** Wenn AT-Datei ein Wort nicht hat → nutzt automatisch DE-Version

---

### 4. Formular: E-Level ausblenden + Land-Feld

**Ausbildungsstand - Unterschiede:**

| Deutschland | Österreich |
|-------------|------------|
| E - Einsteiger | ❌ (kein E-Level) |
| A - Anfänger | A - Anfänger |
| L - Leistungsklasse | L - Leistungsklasse |
| ❌ | **LP** - L mit fliegenden Galoppwechseln (AT-spezifisch!) |
| ❌ | **LM** - L mit Seitengängen (AT-spezifisch!) |
| M - Mittlere Tour | M - Mittlere Tour |
| S - Schwere Klasse | S - Schwere Klasse |

**Code:**
```typescript
// In useCountryConfig Hook:
ausbildungOptions: isAustria
  ? ["roh", "angeritten", "A", "L", "LP", "LM", "M", "S", "Sonstiges"]
  : ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"]
```

**Land-Feld hinzufügen (Step 3):**
```typescript
{
  name: "land",
  label: "Land",
  type: "select",
  options: [
    { value: "DE", label: "Deutschland 🇩🇪" },
    { value: "AT", label: "Österreich 🇦🇹" }
  ],
  halfWidth: true  // neben PLZ
}
```

**Smart Default:**
- `/bewertung` → "Deutschland" vorausgewählt ✅
- `/at/bewertung` → "Österreich" vorausgewählt ✅
- User kann es ändern → Flexibilität für Edge Cases!

---

### 5. KI-Prompt: ✅ BEREITS ANGEPASST! (17.11.2025)

**System-Prompt in Render wurde aktualisiert:**

```
**WICHTIG:**
- Preise in Euro, realistisch für lokalen Markt
- Länderkontext: Berücksichtige das Land des Pferdes und nutze lokale
  Marktdaten (z.B. Verkaufsplattformen wie ehorses.de für Deutschland,
  ehorses.at/willhaben.at für Österreich, regionale Auktionen) für die
  Preisermittlung
- Berücksichtige aktuelle Markttrends
- Begründe alle Einschätzungen sachlich
```

**Was fehlt noch:**
- Frontend: `country`-Feld in API-Call mitschicken
- Backend: `country`-Feld in User Message einbauen

**KI versteht dann automatisch:**
- `country: "AT"` → nutzt ehorses.at, willhaben.at
- `country: "DE"` → nutzt ehorses.de, deutsche Auktionen
- `country: "CH"` → nutzt ehorses.ch (für zukünftige CH-Expansion)

---

### 6. Datenbank: +2 Felder

**Neues MongoDB Schema:**
```javascript
{
  _id: ObjectId,
  email: "kunde@example.com",
  user_country: "AT",  // ← NEU: Aus URL (/at/ → AT)
  horse: {
    breed: "Deutsches Reitpferd",
    country: "AT",     // ← NEU: Aus Formular (Land-Feld)
    location: "1010",  // PLZ (bestehendes Feld)
    // ...
  }
}
```

**Warum 2 Felder?**
1. **`user_country`**: Marketing Attribution (Welche Page?)
2. **`horse.country`**: KI Accuracy (Welche Marktdaten?)

**Edge Cases:**
```typescript
// AT-User bewertet DE-Pferd:
user_country: "AT"     // kam über /at/
horse.country: "DE"    // User wählte "Deutschland" im Dropdown
→ KI nutzt ehorses.de ✅ (korrekt!)
```

**Aufwand:** 30 Minuten

---

### 7. Stripe: EPS Payment (Österreich)

**Für AT-Nutzer hinzufügen:**
```typescript
const paymentMethods = country === 'AT'
  ? ['card', 'eps', 'sofort', 'paypal']  // EPS für AT
  : ['card', 'sofort', 'paypal'];        // Standard DE
```

**EPS = Electronic Payment Standard**
- Österreichisches Online-Banking (wie Sofort in DE)
- Sehr beliebt in AT
- Kosten: €0 (gleiche Stripe-Fees wie Karte)

**Umsetzung:**
1. Stripe Dashboard → Settings → Payment Methods → EPS aktivieren
2. Code anpassen (siehe oben)

**Aufwand:** 1 Stunde

---

## 📊 Implementation Summary

### ✅ DONE (18.11.2025)
- Phase 1-2: i18n + System-Prompt
- Phase 3: Formular + Backend + 106 Links
- Phase 4: SEO + Hreflang + Sitemap
- **Phase 5: Payment (EPS) + Code Review Fixes**

### ⏳ TODO
- Phase 6: Testing (0.5 Tag)

**Timeline:** 0.5 Tag bis Launch! 🚀

---

## 💰 Budget

### Einmalige Kosten:
```
Development (32h × €60/h):     €1.920
Optional: Piloterr API Setup:  €200
──────────────────────────────────────
TOTAL:                         €2.120
```

### Monatliche Kosten:
```
Piloterr API (ehorses.at):     €100-200
Google Ads (Start):            €600
Optional: Facebook Ads:        €400
Stripe Fees (10 Eval):         €60
──────────────────────────────────────
TOTAL:                         €1.160 - €1.260/Monat
```

### ROI-Prognose:
```
Break-Even: ~35 Evaluierungen/Monat
Erreichbar: Monat 5-7
```

---

## 🚀 Launch-Plan

### Woche 1: Dev Work (REDUZIERT!)
```
Montag:      Formular anpassen (Hook integrieren, Land-Feld)
Dienstag:    Backend API erweitern (country-Felder)
Mittwoch:    SEO (useSEO Hook, Hreflang Tags)
Donnerstag:  Payment (EPS) + Testing Start
Freitag:     Testing + Bug Fixes
```

### Woche 2: Testing & Launch
```
Montag-Dienstag:  Final Testing + Bug Fixes
Mittwoch:         Soft Launch (Friends & Family)
Donnerstag:       Fixes based on Feedback
Freitag:          PRODUCTION LAUNCH 🚀
```

### Woche 3-4: Marketing
```
Google Ads: €20/Tag
Ziel: 5-10 AT-Evaluierungen
```

---

## ✅ Success Metrics

### Monat 1 (Launch):
- 3-5 AT-Evaluierungen
- Keine kritischen Bugs
- 200+ Sessions auf /at/
- Conversion Rate >1%

### Monat 3:
- 15-20 AT-Evaluierungen/Monat
- 1.000+ Sessions/Monat
- 1+ Google Review von AT-Kunde
- Conversion Rate >2%

### Monat 6 - Entscheidungspunkt:
- 40+ Evaluierungen/Monat (Break-Even!)
- 3.000+ Sessions/Monat
- CAC <€15
- Positive ROI
- **DANN:** Budget erhöhen oder Schweiz/NL starten

---

## 🎯 Nächste Schritte (Morgen!)

### ✅ Phase 1-4: KOMPLETT! (18.11.2025)
- ✅ i18n, Formular, Backend, SEO, Sitemap

### ⏳ Phase 5-6: Morgen (19.11.)

**Morgen früh (2h):**
1. Stripe: EPS aktivieren (15 Min)
2. checkout.ts: EPS für AT-User (30 Min)
3. Testing: Full Flows + Edge Cases (1h)

**Launch: 19. November 2025 Nachmittag** 🚀

---

## 📝 Ratgeber-SEO Strategie

### Phase 1 (Launch): KEINE AT-Varianten
```typescript
// Ratgeber bleiben nur auf /pferde-ratgeber/* (OHNE /at/)
// ABER: Hreflang Tags verweisen auf gleiche URL für beide Locales

hreflangTags: [
  { hreflang: 'de', href: `https://pferdewert.de/pferde-ratgeber/${slug}` },
  { hreflang: 'de-AT', href: `https://pferdewert.de/pferde-ratgeber/${slug}` },  // ← GLEICHE URL!
]
```

**Warum?**
- Kein Mehraufwand
- AT-User können Ratgeber trotzdem lesen
- Google versteht: "Gleicher Content für beide Länder"

### Phase 2 (Nach 3 Monaten): Top-Performer AT-Varianten
```
Analytics auswerten → Top 3-5 Ratgeber mit AT-Traffic
→ Nur diese bekommen AT-Varianten mit willhaben.at, KSchG, etc.
```

---

## 🔒 DSGVO: Kein Anwalt nötig!

**Fakten:**
- DSGVO gilt EU-weit (DE + AT identisch)
- Deine aktuelle Datenschutzerklärung gilt auch für AT
- Österreichisches DSG ergänzt DSGVO nur minimal (für Startups irrelevant)

**Ergebnis:** Du brauchst NICHTS zu ändern legal! ✅

**Wann brauchst du einen Anwalt?**
- >50 AT-Kunden/Monat
- AT-Behörde stellt Fragen (0,001% Chance)
- Du willst ehorses.at scrapen (dann Piloterr API nutzen statt)

---

## 🎉 Final Status

**Stand: 18. November 2025, 23:45 Uhr**

### ✅ KOMPLETT (95% Production-Ready)
- Phase 1-5: i18n, Formular, Backend, SEO, Payment ✅
- EPS Integration mit strikter Validierung
- user_country vs land korrekt getrennt
- Code Review: 95% Production-Ready

### ⏳ VERBLEIBEND
- Phase 6: Testing (0.5 Tag)
  - Full Flows, Edge Cases, EPS Test-Payment

**Launch:** 19. November 2025 🚀

---

**Commits:** fd8e357, 2872526 | **Branch:** feature/austria-rollout
