# Österreich-Rollout: Implementation Guide
## Gleiche Page, minimale Änderungen, kein Duplicate Content

**Erstellt:** 16. November 2025
**Letzte Aktualisierung:** 17. November 2025
**Ansatz:** Keep it simple, stupid (KISS)

---

## 📊 AKTUELLER STATUS

### ✅ Bereits erledigt (Phase 1-3 KOMPLETT!):
- **Phase 1: i18n Setup** ✅
  - middleware.ts mit Locale Detection
  - messages/de/ und messages/de-AT/ Ordner
  - useCountryConfig Hook erstellt

- **Phase 2: System-Prompt** ✅ (17.11.2025)
  - "deutschen Markt" → "lokalen Markt"
  - Neuer Punkt "Länderkontext" hinzugefügt
  - KI nutzt automatisch länderspezifische Datenquellen

- **Phase 3: Formular & Backend** ✅
  - ✅ useCountryConfig Hook integriert (Commit: 605ced5)
  - ✅ Land-Feld zu Step 3 hinzugefügt
  - ✅ E-Level für AT ausgeblendet (dynamisch)
  - ✅ Ausbildungsoptionen dynamisch (DE: mit E, AT: ohne E)
  - ✅ Backend Schema: `land` Feld hinzugefügt (Commit: 790449a)
  - ✅ API: land-Feld wird akzeptiert und an KI weitergegeben
  - ✅ Alle internen Links lokalisiert (106 Links in 14 Files - Commit: 2f20e88)

### ⏳ Noch zu tun (1-2 Tage!):
1. **SEO implementieren** (0.5 Tag)
   - ⏳ useSEO Hook erstellen (hooks/useSEO.ts)
   - ⏳ Hreflang Tags in 6 Main Pages einbauen (index, bewertung, preise, impressum, datenschutz, agb)
   - ⏳ Sitemap.xml erweitern (/at/ URLs)

2. **Payment erweitern** (0.5 Tag)
   - ⏳ Stripe Dashboard: EPS aktivieren
   - ⏳ checkout.ts: EPS zu payment_method_types für AT-User

3. **Testing** (0.5-1 Tag)
   - ⏳ Full Flow: DE-User auf /bewertung
   - ⏳ Full Flow: AT-User auf /at/bewertung
   - ⏳ Edge Cases (AT→DE, DE→AT Pferde)
   - ⏳ Mobile/Desktop Tests

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

## 📊 Dev-Checklist (Kompakt)

### Phase 1: ✅ i18n Setup (ERLEDIGT!)
```
✅ npm install next-intl
✅ middleware.ts erstellt (Locale Detection)
✅ messages/de/ und messages/de-AT/ Ordner
✅ useCountryConfig Hook erstellt
```

### Phase 2: ✅ Formular anpassen (ERLEDIGT!)
```
✅ useCountryConfig Hook in pferde-preis-berechnen.tsx integriert
✅ Land-Feld zu Step 3 hinzugefügt (nach "standort")
✅ stepData.ausbildung: ausbildungOptions vom Hook genutzt
✅ useEffect: Auto-fill land based on locale
✅ Dynamische Ausbildungsoptionen (DE: mit E, AT: ohne E)
```

### Phase 3: ✅ KI-Prompt & Backend (ERLEDIGT!)
```
✅ System-Prompt in Render angepasst (17.11.2025)
✅ Frontend: country in API-Call mitgeschickt (webhook.ts)
✅ Backend: land aus Request in BewertungRequest Schema
✅ Backend: land wird an KI weitergegeben
✅ MongoDB Schema: land Feld hinzugefügt
✅ Alle internen Links lokalisiert (106 Links)
```

### Phase 4: ⏳ SEO (0.5 Tag) - VERBLEIBEND
```
⏳ useSEO Hook erstellen (hooks/useSEO.ts)
⏳ 6 Pages anpassen: index, bewertung, preise, impressum, datenschutz, agb
⏳ Sitemap.xml: /at/ URLs hinzufügen
⏳ Google Search Console: /at/ Property hinzufügen (nach Launch)
```

### Phase 5: ⏳ Payment (0.5 Tag) - VERBLEIBEND
```
⏳ Stripe Dashboard: EPS aktivieren
⏳ Code: EPS für AT-User in payment_method_types
⏳ Test: Test-Kauf mit EPS (Stripe Test Mode)
```

### Phase 6: ⏳ Testing (0.5-1 Tag) - VERBLEIBEND
```
⏳ Full Flow: DE-User auf /bewertung
⏳ Full Flow: AT-User auf /at/bewertung
⏳ Edge Case: AT-User wählt "Deutschland" im Formular
⏳ Edge Case: DE-User wählt "Österreich" im Formular
⏳ Mobile Test: iOS, Android
⏳ Desktop Test: Chrome, Firefox, Safari
```

**Total:** 1.5-2 Tage verbleibend (Phase 1-3 = 100% erledigt! 🎉)

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

## 🎯 Nächste Schritte (FINALE PHASE!)

### ✅ KOMPLETT: Phase 1-3 (Formular, Backend, Links)
```
✅ i18n Setup (middleware, messages, Hook)
✅ Formular mit Land-Feld und dynamischen Ausbildungsoptionen
✅ Backend API: land Feld in Schema und KI-Prompt
✅ Alle 106 internen Links lokalisiert
```

### ⏳ VERBLEIBEND: Phase 4-6 (SEO, Payment, Testing)

#### 1. SEO implementieren (Tag 1: 4h)
```typescript
# hooks/useSEO.ts erstellen
# 6 Main Pages: hreflang Tags einbauen
# scripts/sitemap.ts: /at/ URLs hinzufügen
# npm run sitemap ausführen
```

#### 2. Payment erweitern (Tag 1: 2h)
```typescript
# Stripe Dashboard: EPS aktivieren
# pages/api/checkout.ts: EPS für AT-User
# Test-Kauf mit EPS (Stripe Test Mode)
```

#### 3. Testing (Tag 2: 4-8h)
```
- Full Flow DE & AT
- Edge Cases (Cross-Country)
- Mobile/Desktop Tests
- Bug Fixes
```

**Timeline:** 2 Tage bis Launch-Ready! 🚀

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

## 🎉 Zusammenfassung

**Status (17. November 2025):**
- ✅ Phase 1-3: KOMPLETT ERLEDIGT! (85% des Projekts)
- ⏳ Phase 4-6: 1.5-2 Tage verbleibend (15% des Projekts)

**Was bereits fertig ist:**
- ✅ i18n Setup (middleware, messages, Hook)
- ✅ 10 Wörter österreichisch ("Jänner") - Fallback-System aktiv
- ✅ E-Level für AT ausgeblendet, dynamische Ausbildungsoptionen
- ✅ Land-Feld im Formular (vorausgefüllt, änderbar)
- ✅ land Feld in Backend API und MongoDB
- ✅ System-Prompt: länderabhängige Marktdaten
- ✅ 106 interne Links lokalisiert

**Was noch fehlt:**
- ⏳ Hreflang Tags (wichtigste SEO-Maßnahme!) - 0.5 Tag
- ⏳ EPS Payment für AT - 0.5 Tag
- ⏳ Testing - 0.5-1 Tag

**Kein Aufwand für:**
- ❌ KEIN Anwalt (DSGVO gilt EU-weit)
- ❌ KEINE neue Website (gleiche Domain)
- ❌ KEINE separaten Ratgeber-Varianten (erst ab Monat 3)

**Budget:**
- Setup: €1.920 (32h) → **Bereits €1.200 investiert!** (20h erledigt)
- Verbleibend: €720 (12h für SEO, Payment, Testing)
- Monatlich: €1.200 (Ads + API)

**Timeline:**
- Start: ✅ BEREITS GESTARTET!
- Phase 1-3: ✅ ERLEDIGT (17.11.2025)
- Phase 4-6: 2 Tage (18.-19.11.2025)
- **LAUNCH: 20. November 2025** 🚀
- Break-Even: Monat 5-7

---

**Das war's! 🚀**

Bei Fragen → Dokumentation oder Claude fragen.
