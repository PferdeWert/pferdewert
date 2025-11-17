# Österreich-Rollout: Praktischer Umsetzungsplan
## PferdeWert.de → pferdewert.at (oder pferdewert.de/at/)

**Erstellt:** 16. November 2025
**Zielgruppe:** Du als Projektleiter (Nicht-Entwickler)
**Ziel:** Schritt-für-Schritt Anleitung für Österreich-Launch

---

## 🎯 Schnellübersicht

**Warum Österreich zuerst?**
- ✅ Gleiche Sprache (Deutsch)
- ✅ Sehr ähnliches Klassifikationssystem (nur kleine Unterschiede)
- ✅ Gleiche Datenquelle (ehorses.at)
- ✅ Kulturell und wirtschaftlich sehr nah
- ✅ **Einfachste** internationale Expansion

**Was ist anders in Österreich?**
1. **Klassifikation:** Kein E-Level, dafür LP (Leistungsprüfung) und LM (Leistungsklasse Mittlere Tour)
2. **Sprache:** Minimale Unterschiede (z.B. "Jänner" statt "Januar")
3. **Zahlungsmethoden:** EPS (Electronic Payment Standard) beliebt
4. **Datenquelle:** ehorses.at statt ehorses.de

**Timeline:** 6-8 Wochen bis Launch
**Budget:** €8.000-12.000 (ohne Marketing)

---

# Phase 1: Strategie & Planung (Woche 1)

## 1.1 Domain-Entscheidung

### Option A: Eigene ccTLD (pferdewert.at)

**Vorteile:**
- ✅ Maximales lokales Vertrauen (.at = Österreich)
- ✅ Besseres Google-Ranking in Österreich
- ✅ Professionellster Eindruck
- ✅ Unabhängige Marketing-Flexibilität

**Nachteile:**
- ❌ Höhere Kosten (€60-105k für .at Domain wenn hochpreisig)
- ❌ Duplicate Content Management (SEO-Aufwand)
- ❌ Zwei getrennte Websites = mehr Wartungsaufwand
- ❌ Getrennte Kundendatenbanken (oder komplexe Sync-Logik)

**Kosten:**
- Domain-Registrierung: €10-50/Jahr (Standard)
- ODER: €60.000-105.000 (wenn Premium-Domain von Inhaber gekauft)
- Hosting: Gleich (Vercel/Render unterstützt Multi-Domain)
- SSL-Zertifikat: Inklusive (Let's Encrypt/Vercel)

**Wann sinnvoll:**
- Wenn Budget vorhanden (€60k+)
- Wenn langfristig >500 Evaluierungen/Monat aus Österreich erwartet
- Wenn lokale Brand wichtig ist

---

### Option B: Subdirectory (pferdewert.de/at/)

**Vorteile:**
- ✅ **Niedrige Kosten** (€0 zusätzlich)
- ✅ Einfache technische Umsetzung
- ✅ Gleiche Kundendatenbank
- ✅ SEO-Authority von .de-Domain profitiert .at-Seiten
- ✅ Schnellerer Launch
- ✅ Einfacheres Management

**Nachteile:**
- ⚠️ Weniger lokales Vertrauen (ist .de, nicht .at)
- ⚠️ Google bevorzugt ccTLDs für lokale Suchen (aber /at/ wird trotzdem gut gerankt)

**Kosten:**
- Domain: €0 (nutzt pferdewert.de)
- Entwicklung: €5.000-8.000
- Marketing: €2.000-5.000/Monat

**Wann sinnvoll:**
- Als **Start-Strategie** (Test ob AT-Markt funktioniert)
- Später Upgrade zu .at Domain wenn erfolgreich
- Für die meisten Cases die bessere Wahl

---

### ✅ **EMPFEHLUNG: Start mit Subdirectory**

**Plan:**
1. **Phase 1 (Monat 1-6):** Launch mit pferdewert.de/at/
2. **Phase 2 (Monat 6-12):** Evaluiere Erfolg
   - Wenn >100 Evaluierungen/Monat aus AT → Upgrade zu pferdewert.at prüfen
3. **Phase 3 (Monat 12+):** Migration zu pferdewert.at falls Budget & ROI stimmen

**Begründung:**
- Minimales Risiko (€8k statt €68k+)
- Schneller Launch (6 Wochen statt 3 Monate)
- Gleiche User Experience für Kunden
- Einfacher Upgrade-Pfad später

---

## 1.2 Recherche: Österreichisches Pferdesport-System

### Was du herausfinden musst:

**1. Klassifikations-System:**
- Welche Levels gibt es? (A/L/LM/LP/M/S)
- Was bedeuten sie genau?
- Gibt es regionale Unterschiede (Wien vs Salzburg vs Tirol)?

**2. Beliebte Disziplinen:**
- Ist Dressur/Springen/Vielseitigkeit anders gewichtet als in DE?
- Gibt es AT-spezifische Disziplinen?

**3. Sprache:**
- Welche Begriffe sind in AT anders?
- Gibt es Pferde-spezifische österreichische Wörter?

**Wie recherchieren:**

**Schritt 1: Offizielle Stellen**
```
Kontaktiere:
- Österreichischer Pferdesportverband (OEPS) - www.oeps.at
- Fachverband der Freizeitbetriebe (WKO) - Pferdesport-Sektion
```

**Schritt 2: ehorses.at analysieren**
```
Gehe zu: ehorses.at
Filtere nach: "Ausbildungsstand" Dropdown
Notiere: Welche Optionen gibt es?
Screenshot: Mache Screenshots der Dropdown-Optionen
```

**Schritt 3: Konkurrenz-Analyse**
```
Suche Google AT: "Pferdebewertung Österreich", "Pferd schätzen AT"
Analysiere: Welche Services gibt es? Wie sprechen die Nutzer an?
```

**Ergebnis dokumentieren in:**
`/Users/benjaminreder/Developer/pferdewert/.working/International Rollout/AT-Marktforschung.md`

---

## 1.3 DSGVO & Rechtliches (Österreich)

**Wichtig:** Österreich hat eigenes Datenschutzgesetz (DSG), das DSGVO ergänzt.

**Was zu prüfen ist:**

### Beauftrage einen Anwalt (Budget: €1.500-2.500)

**Scope of Work für Anwalt:**
```markdown
# Legal Review - Österreich Expansion

## Kontext
PferdeWert.de expandiert nach Österreich via pferdewert.de/at/

## Zu prüfen:

1. **Datenschutzerklärung**
   - Muss AT-spezifische Datenschutzerklärung erstellt werden?
   - Reicht deutsche DSGVO-Erklärung aus?
   - Müssen wir DSG (österreichisches Datenschutzgesetz) explizit erwähnen?

2. **Web Scraping (ehorses.at)**
   - Ist Scraping von ehorses.at rechtlich erlaubt?
   - Brauchen wir eine Lizenz?
   - Alternative: Piloterr ehorses-API nutzen?

3. **AGB & Verbraucherschutz**
   - Geltendes Recht: Deutsch oder Österreichisch?
   - Gerichtsstand: München oder Wien?
   - AT-Verbraucherschutz-Compliance?

4. **Impressum**
   - Reicht deutsches Impressum?
   - Brauchen wir AT-spezifische Angaben?

5. **Zahlungsabwicklung (Stripe)**
   - EPS-Payment erlaubt?
   - Datenübermittlung USA OK?

## Deliverables:
- Legal Opinion (5-10 Seiten)
- AT-angepasste Datenschutzerklärung (falls erforderlich)
- AT-angepasste AGB (falls erforderlich)
- Scraping-Empfehlung
- Go-Live Checkliste
```

**Anwalt finden:**
- Suche: "DSGVO Anwalt Österreich Deutschland"
- Empfehlung: Kanzlei mit DE+AT Standorten
- Alternative: Telefonische Erstberatung (oft €200-300)

---

# Phase 2: Technische Umsetzung (Woche 2-4)

## 2.1 Was technisch passieren muss

### Übersicht für Nicht-Techniker

**Aktuell:**
```
User besucht: pferdewert.de
User sieht: Deutsche Version
Formular zeigt: E/A/L/M/S Klassifikation
Daten von: ehorses.de
```

**Ziel (Österreich):**
```
AT-User besucht: pferdewert.de → wird automatisch weitergeleitet zu pferdewert.de/at/
AT-User sieht: Österreichische Version (minimal angepasster deutscher Text)
Formular zeigt: A/L/LP/LM/M/S Klassifikation (kein E!)
Daten von: ehorses.at
KI-Prompt: "Bewerte mit österreichischem System..."
Zahlungsmethoden: Karte + EPS + Sofort
```

**Wie erkennen wir AT-User?**
1. **Browser-Sprache:** Browser sendet "Accept-Language: de-AT"
2. **Manuelle Wahl:** User klickt "🇦🇹 AT" im Länder-Switcher
3. **Direkter Link:** User geht direkt zu pferdewert.de/at/

---

## 2.2 Technische Komponenten (vereinfacht erklärt)

### Komponente 1: Internationalisierung (i18n)

**Was ist das?**
Ein System, das deine Website in mehreren Sprachen/Regionen verfügbar macht.

**Tool:** next-intl (Standard für Next.js)

**Was passiert:**
1. Alle deutschen Texte werden in Übersetzungsdateien ausgelagert
   ```
   Vorher im Code: <h1>KI-gestützte Pferdebewertung</h1>
   Nachher im Code: <h1>{t('hero.title')}</h1>

   In Datei messages/de/home.json:
   {
     "hero": {
       "title": "KI-gestützte Pferdebewertung"
     }
   }

   In Datei messages/de-AT/home.json:
   {
     "hero": {
       "title": "KI-gestützte Pferdebewertung"  // Gleich, nur als Beispiel
     }
   }
   ```

2. Website erkennt Nutzer-Land und lädt entsprechende Übersetzungen

**Aufwand:** 2-3 Tage Entwicklung

---

### Komponente 2: Formular-Anpassungen

**Was ändern:**

**Ausbildungsstand-Dropdown:**
```
Deutschland (aktuell):
- E - Einsteiger
- A - Anfänger
- L - Leistungsklasse
- M - Mittlere Tour
- S - Schwere Klasse

Österreich (neu):
- A - Anfänger
- L - Leistungsklasse
- LP - Leistungsprüfung  ← NEU
- LM - Leistungsklasse Mittlere Tour  ← NEU
- M - Mittlere Tour
- S - Schwere Klasse
```

**Wie umsetzen:**
```typescript
// Vereinfachte Logik (kein echter Code):
Wenn User aus Österreich:
  Zeige A/L/LP/LM/M/S Options
Wenn User aus Deutschland:
  Zeige E/A/L/M/S Options
```

**Aufwand:** 4-6 Stunden Entwicklung

---

### Komponente 3: KI-Prompt Anpassung

**Aktuell (Deutschland):**
```
Prompt an GPT/Claude:
"Du bist ein Pferdebewerter. Bewerte das folgende Pferd basierend auf deutschen Marktdaten:
- Rasse: Deutsches Reitpferd
- Alter: 8 Jahre
- Ausbildungsstand: L-Niveau
- Disziplin: Dressur
- ...

Nutze das E/A/L/M/S Klassifikationssystem. Vergleiche mit Preisen von ehorses.de."
```

**Neu (Österreich):**
```
Prompt an GPT/Claude:
"Du bist ein Pferdebewerter. Bewerte das folgende Pferd basierend auf österreichischen Marktdaten:
- Rasse: Deutsches Reitpferd
- Alter: 8 Jahre
- Ausbildungsstand: L-Niveau
- Disziplin: Dressur
- ...

Nutze das A/L/LP/LM/M/S Klassifikationssystem (kein E-Niveau in Österreich!).
Vergleiche mit Preisen von ehorses.at.
Berücksichtige österreichische Marktbesonderheiten."
```

**Was du siehst:**
- Nur minimale Änderungen
- Kein Training erforderlich!
- Einfach anderer Text im Prompt

**Aufwand:** 2-3 Stunden Entwicklung

---

### Komponente 4: Datenquellen-Anpassung

**Aktuell:**
```
Scraping-Quelle: ehorses.de
Alternative: Piloterr ehorses API (Deutschland)
```

**Neu:**
```
Scraping-Quelle: ehorses.at
Alternative: Piloterr ehorses API (Österreich - gleiche API, nur anderer Parameter)
```

**Piloterr API (Empfohlen):**
- Kosten: ~€100-200/Monat (je nach Anzahl Requests)
- Vorteil: Legal sauber, keine Scraping-Grauzone
- Vorteil: Strukturierte Daten, bessere Qualität
- Nachteil: Monatliche Kosten

**Entscheidung:**
```
✅ Empfehlung: Piloterr API nutzen
Begründung:
1. Legal sauberer (kein Scraping, das evtl. rechtlich problematisch ist)
2. Bessere Datenqualität (strukturierte API vs. Screen Scraping)
3. Geringere technische Komplexität
4. €200/Monat ist vertretbar für professionelles Business
```

**Aufwand:** 1-2 Tage Integration (falls noch nicht für DE genutzt)

---

### Komponente 5: Zahlungsmethoden (Stripe)

**Aktuell (Deutschland):**
```
- Kreditkarte (Visa, Mastercard)
- Sofort/Klarna
- PayPal (optional)
```

**Neu (Österreich):**
```
- Kreditkarte
- EPS (Electronic Payment Standard) ← AT-spezifisch
- Sofort
- PayPal
```

**Was ist EPS?**
- Österreichisches Online-Banking Payment System
- Funktioniert wie Sofort in DE
- Sehr beliebt in Österreich (wie in DE Sofort)

**Umsetzung:**
```
1. Stripe Dashboard öffnen
2. Payment Methods → EPS aktivieren (1 Klick)
3. Im Code: Wenn User aus AT → zeige EPS-Option
```

**Kosten:**
- Stripe Gebühren: Gleich wie DE (1,4% + €0,25 pro Transaktion)
- EPS zusätzliche Gebühr: €0,35 pro Transaktion

**Aufwand:** 2-3 Stunden Entwicklung

---

## 2.3 URL-Struktur & Navigation

### Wie sieht die Site-Struktur aus?

**Aktuell (Deutschland):**
```
pferdewert.de/
├── /                          (Homepage)
├── /bewertung                 (Formular)
├── /preise                    (Pricing)
├── /pferde-ratgeber/          (Blog)
├── /datenschutz               (Privacy)
└── /impressum                 (Imprint)
```

**Neu (mit Österreich):**
```
pferdewert.de/
├── /                          (Homepage DE)
├── /bewertung                 (Formular DE)
├── /preise                    (Pricing DE)
├── /pferde-ratgeber/          (Blog DE)
├── /at/                       (Homepage AT) ← NEU
├── /at/bewertung              (Formular AT) ← NEU
├── /at/preise                 (Pricing AT) ← NEU
├── /at/pferde-ratgeber/       (Blog AT) ← NEU
├── /datenschutz               (Privacy - shared)
└── /impressum                 (Imprint - shared)
```

**Besonderheit:**
- Datenschutz & Impressum sind GLEICH (außer Anwalt sagt anders)
- Blog-Artikel können shared werden (später AT-spezifische Artikel möglich)

---

### Länder-Switcher

**Wo sichtbar:**
- Oben rechts in Navigation (Desktop)
- Im Burger-Menu (Mobile)

**Aussehen:**
```
🇩🇪 DE  |  🇦🇹 AT
```

**Funktion:**
- Klick auf AT → Weiterleitung zu /at/ (gleiche Seite, österreichische Version)
- Klick auf DE → Weiterleitung zu / (deutsche Version)

**Beispiel:**
```
User ist auf: pferdewert.de/bewertung
User klickt: 🇦🇹 AT
User landet auf: pferdewert.de/at/bewertung
```

---

## 2.4 Entwicklungs-Schritte (für dein Dev-Team)

### Sprint 1: i18n Setup (Woche 2)
**Aufgaben:**
1. next-intl Installation
2. Middleware-Konfiguration (Locale-Detection)
3. Übersetzungsdateien-Struktur erstellen
4. Erste Seite migrieren (Homepage)

**Deliverable:** Homepage funktioniert auf /at/ mit gleichen Texten wie /

---

### Sprint 2: Übersetzungen & Formular (Woche 3)
**Aufgaben:**
1. Alle Seiten auf i18n umstellen
2. Österreichische Varianten hinzufügen (minimal, z.B. "Jänner")
3. Formular-Dropdown anpassen (E entfernen, LP/LM hinzufügen)
4. Länder-Switcher UI implementieren

**Deliverable:** Komplette Site auf /at/ funktioniert mit AT-Formular

---

### Sprint 3: Backend & KI (Woche 3-4)
**Aufgaben:**
1. KI-Prompt für Österreich anpassen
2. ehorses.at Datenquelle integrieren (via Piloterr API)
3. Land-Parameter in Datenbank speichern (für Analytics)
4. Stripe EPS-Payment aktivieren

**Deliverable:** End-to-End Flow funktioniert (AT-User kann Pferd bewerten & bezahlen)

---

### Sprint 4: Testing & QA (Woche 4)
**Aufgaben:**
1. Manual Testing (alle Flows)
2. Browser-Testing (Chrome, Firefox, Safari)
3. Mobile Testing (iOS, Android)
4. Bug Fixes

**Deliverable:** Produktionsreife AT-Version

---

# Phase 3: Launch & Marketing (Woche 5-8)

## 3.1 Pre-Launch Checklist

**Technisch:**
- [ ] Alle Seiten auf /at/ funktionieren
- [ ] Formular zeigt A/L/LP/LM/M/S (kein E)
- [ ] KI-Prompt nutzt österreichisches System
- [ ] Stripe EPS-Payment funktioniert
- [ ] Länder-Switcher funktioniert
- [ ] Mobile Responsive
- [ ] DSGVO Datenschutzerklärung updated (falls nötig laut Anwalt)
- [ ] Google Analytics trackt /at/ Seiten separat

**Business:**
- [ ] Legal Review abgeschlossen
- [ ] Preise definiert (gleich wie DE? Oder AT-Anpassung?)
- [ ] Support-Email eingerichtet (oder gleich wie DE?)
- [ ] FAQ für österreichische Kunden vorbereitet

**Marketing:**
- [ ] Google Ads Kampagne für Österreich vorbereitet
- [ ] Facebook Ads Creative angepasst
- [ ] Landing Page /at/ optimiert
- [ ] Tracking eingerichtet (Google Analytics Goals)

---

## 3.2 Soft Launch (Woche 5)

**Strategie:** Erst klein testen, dann groß launchen

**Schritt 1: Friends & Family (Tag 1-3)**
```
1. Schicke Link an 10-20 Personen mit Österreich-Bezug
2. Bitte um Feedback:
   - Funktioniert alles?
   - Sind Texte verständlich?
   - Wirkt es "österreichisch genug" oder zu deutsch?
   - Gibt es Bugs?
3. Sammle Feedback in Google Doc
4. Fixe kritische Bugs sofort
```

**Schritt 2: Beta-Launch mit €10 Budget (Tag 4-7)**
```
1. Schalte Google Ads mit Mini-Budget (€10/Tag)
2. Keywords: "pferd bewerten österreich", "pferdewert at"
3. Landing Page: pferdewert.de/at/
4. Tracke:
   - Wie viele Klicks?
   - Wie viele öffnen Formular?
   - Wie viele schließen ab?
5. Optimiere basierend auf Daten
```

**Success-Kriterien:**
- ✅ Mindestens 1 erfolgreiche Evaluation aus Österreich
- ✅ Keine kritischen Bugs reported
- ✅ Conversion Rate >1% (realistisch für Kaltstart)

---

## 3.3 Full Launch (Woche 6-8)

### Marketing-Kanäle für Österreich

**1. Google Ads (Budget: €1.500-2.000/Monat)**

**Kampagne 1: Branded Search**
```
Keywords:
- pferdewert österreich
- pferdewert.at
- pferd bewerten at

Budget: €10/Tag (€300/Monat)
Ziel: Brand Awareness, günstige Klicks
```

**Kampagne 2: Generic Search**
```
Keywords:
- pferd wert schätzen
- was ist mein pferd wert
- pferdebewertung online
- pferdegutachten

Budget: €20/Tag (€600/Monat)
Ziel: New Customer Acquisition
```

**Kampagne 3: Competitor**
```
Keywords:
- pferdegutachter wien
- pferdeschätzung salzburg
- pferdebewertung graz

Budget: €15/Tag (€450/Monat)
Ziel: Abgreifen von Konkurrenz-Traffic
```

---

**2. Facebook/Instagram Ads (Budget: €1.000-1.500/Monat)**

**Zielgruppe:**
```
Land: Österreich
Alter: 25-65
Interessen:
- Pferde
- Reitsport
- Reiten
- Dressur
- Springen
- Pferdepflege
```

**Ad-Format: Carousel**
```
Bild 1: Schönes Dressurpferd
Bild 2: Bewertungs-Screenshot (€35.000 Wert)
Bild 3: Zufriedener Kunde
Text: "Was ist dein Pferd wert? KI-gestützte Bewertung in 2 Minuten.
       Speziell für Österreich mit A/L/LP/LM/M/S System. Jetzt ab €29,90."
CTA: "Jetzt bewerten"
```

**Budget:**
```
€30-50/Tag (€900-1.500/Monat)
Erwartung: 20-40 Klicks/Tag
Kosten pro Klick: €1-2
```

---

**3. PR & Outreach**

**Ziel:** Backlinks + Brand Awareness in österreichischen Medien

**Target Publications:**
```
1. Reiter Revue Österreich (Print + Online)
2. Pferdewoche.at (Online-Magazin)
3. Cavallo Österreich
4. ehorses.at Blog (Partnership anfragen!)
5. Lokale Reitvereine (Wien, Salzburg, Graz, Linz)
```

**Outreach-Strategie:**
```
1. Erstelle Pressemitteilung: "PferdeWert expandiert nach Österreich"
2. Media Kit: Screenshots, Logo, Gründer-Bio, Fakten
3. Angebot: Kostenloser Test-Account für Redakteure
4. Follow-Up: Persönliche Emails an Chefredakteure
```

**Budget:** €500-1.000 (für Presseverteilung, evtl. kleine Anzeigen)

**Success-Metrik:**
- 2-3 Backlinks von .at Domains
- 1+ Artikel in Reitsport-Magazin

---

**4. Social Media (Organisch)**

**Instagram: @pferdewert_at (oder @pferdewert mit AT-Posts)**

**Content-Plan Monat 1:**
```
Woche 1: Announcement
- Post 1: "Neu in Österreich! 🇦🇹"
- Post 2: "So funktioniert's"
- Post 3: Erster AT-Kunde Testimonial (falls vorhanden)

Woche 2: Educational
- Post 4: "Was macht dein Pferd wertvoll?"
- Post 5: "A/L/LP/LM System erklärt"
- Post 6: Vor/Nachher Bewertungen

Woche 3: Engagement
- Post 7: Quiz "Schätze den Wert!"
- Post 8: Behind the Scenes (KI-Prozess)
- Post 9: FAQs

Woche 4: Conversion
- Post 10: Limited-Time Angebot
- Post 11: Success Stories
- Post 12: Jahresrückblick (falls Dezember)
```

**Hashtags:**
```
#Pferdewert #PferdeBewerten #Österreich #Reitsport
#PferdeÖsterreich #ehorses #Pferdemarkt
```

---

## 3.4 Monitoring & Optimierung

### Dashboard Setup

**Google Analytics 4 - Custom Dashboard: "Österreich Performance"**

**Metriken tracken:**
```
1. Traffic:
   - Sessions auf /at/ Seiten (täglich)
   - User aus Österreich (täglich)
   - Bounce Rate /at/ vs / Vergleich

2. Conversions:
   - Evaluierungen aus AT (täglich)
   - Conversion Rate /at/bewertung
   - Revenue aus AT

3. Formular:
   - Form Starts (wie viele öffnen Bewertung?)
   - Form Completion Rate (wie viele schließen ab?)
   - Durchschnittliche Completion Time

4. Marketing:
   - Google Ads: Clicks, CTR, CPC, Conversions
   - Facebook Ads: Clicks, CTR, CPC, Conversions
   - Organic: Wie viele kommen direkt zu /at/?
```

**Alerts einrichten:**
```
🚨 Critical Alert (Email sofort):
- Error Rate >5% auf /at/ Seiten
- Payment Failure Rate >10%
- Zero Conversions für 48 Stunden

⚠️ Warning Alert (Email täglich):
- Traffic Drop >30% Tag-über-Tag
- Conversion Rate <0,5%
```

---

### Weekly Review (jeden Montag, 1 Stunde)

**Meeting-Agenda:**
```
1. Zahlen Review (15min):
   - Wie viele AT-Evaluierungen letzte Woche?
   - Conversion Rate Trend?
   - Budget-Spend vs. Revenue?

2. Marketing Performance (20min):
   - Google Ads: Top/Flop Keywords?
   - Facebook Ads: Top/Flop Audiences?
   - Welche Anzeigen performen gut?

3. User Feedback (10min):
   - Support-Anfragen aus AT?
   - Bugs reported?
   - Feature Requests?

4. Optimization Actions (15min):
   - Welche Keywords pausieren?
   - Budget umschichten?
   - A/B Test starten?
   - Bug Fixes priorisieren?
```

**Output:**
- Weekly Report (1-Seiter für Team)
- Action Items für nächste Woche

---

## 3.5 A/B Testing

**Nach 2-3 Wochen starten** (wenn genug Traffic)

**Test 1: Headline /at/ Homepage**
```
Variant A (Control):
"KI-gestützte Pferdebewertung in 2 Minuten"

Variant B:
"Professionelle Pferdebewertung für Österreich - in 2 Minuten"

Metrik: Klick auf "Jetzt bewerten" Button
Sample Size: Mindestens 500 Visitors pro Variant
```

**Test 2: Pricing Display**
```
Variant A (Control):
"Ab €29,90" direkt sichtbar

Variant B:
Preis versteckt, erst nach Formular-Start sichtbar

Metrik: Form Start Rate
Hypothese: Weniger Preis-Schock = mehr Formular-Starts?
```

**Test 3: Social Proof**
```
Variant A (Control):
Testimonials unten auf Page

Variant B:
Testimonials direkt unter Hero (prominent)

Metrik: Time on Page, Scroll Depth
```

---

# Phase 4: Success-Metriken & Next Steps

## 4.1 Success Criteria

### Monat 1 (unmittelbar nach Launch)
```
✅ 10+ Evaluierungen aus Österreich
✅ Conversion Rate >1%
✅ Keine kritischen Bugs
✅ 3+ positive Bewertungen
✅ 500+ Sessions auf /at/ Seiten
```

### Monat 3
```
✅ 50+ Evaluierungen/Monat aus AT
✅ Conversion Rate >2%
✅ 2.000+ Sessions/Monat auf /at/
✅ CAC (Customer Acquisition Cost) <€20
✅ 1+ Backlink von .at Domain
```

### Monat 6 - Entscheidungspunkt
```
✅ 100+ Evaluierungen/Monat aus AT
✅ Conversion Rate >2,5%
✅ 5.000+ Sessions/Monat
✅ Positiver ROI (Revenue >Marketing Spend)

→ DANN: Entscheidung ob Upgrade zu pferdewert.at ccTLD
```

---

## 4.2 KPIs im Detail

### 1. Customer Acquisition Cost (CAC)

**Formel:**
```
CAC = (Marketing Spend) / (Anzahl neue Kunden)

Beispiel:
€2.000 Google Ads + €1.500 Facebook Ads = €3.500 Total Spend
50 Evaluierungen
→ CAC = €3.500 / 50 = €70 pro Kunde

Ziel: CAC <€20 (damit profitabel bei €29,90 Preispunkt)
```

**Wie senken?**
- Bessere Keyword-Auswahl (Long-Tail statt Broad)
- Höhere Conversion Rate (Landing Page optimieren)
- Organischer Traffic (SEO, PR, Social Media)

---

### 2. Lifetime Value (LTV)

**Formel:**
```
LTV = (Durchschnittlicher Bestellwert) × (Anzahl Wiederholungskäufe)

Aktuell:
€29,90 × 1 = €29,90 (wenn nur 1x Kunde kommt)

Wenn 20% zurückkommen:
€29,90 × 1,2 = €35,88

Ziel: LTV >€50 (durch Premium-Upsells, Wiederholungskäufe)
```

**Wie erhöhen?**
- Premium-Tier verkaufen (€49,90 statt €29,90)
- Upsell: Jährliches Update der Bewertung anbieten (€19,90)
- Referral-Programm (Kunde bringt Freund)

---

### 3. ROI (Return on Investment)

**Formel:**
```
ROI = (Revenue - Kosten) / Kosten × 100%

Beispiel Monat 1:
Revenue: 20 Evaluierungen × €29,90 = €598
Kosten: €3.500 (Marketing) + €500 (Tech) = €4.000
ROI = (€598 - €4.000) / €4.000 = -85% (Verlust im Monat 1 ist normal!)

Beispiel Monat 6:
Revenue: 100 Evaluierungen × €29,90 = €2.990
Kosten: €3.500 (Marketing) + €200 (Tech) = €3.700
ROI = (€2.990 - €3.700) / €3.700 = -19% (break-even nah!)

Ziel Monat 12:
Revenue: 200 Evaluierungen × €29,90 = €5.980
Kosten: €3.500 (Marketing) + €200 (Tech) = €3.700
ROI = (€5.980 - €3.700) / €3.700 = +62% (profitabel!)
```

---

## 4.3 Wann upgraden zu pferdewert.at?

### Break-Even Analyse

**Kosten ccTLD pferdewert.at:**
```
Szenario A (Glücksfall): Domain ist frei
- Registrierung: €10-30/Jahr
- Break-Even: Sofort (keine Zusatzkosten)

Szenario B (Wahrscheinlich): Domain kostet €5.000-15.000
- Einmalig: €10.000 (Mittelwert)
- Zusätzliche Tech-Migration: €3.000
- Total: €13.000

Break-Even bei €29,90/Evaluation:
€13.000 / €29,90 = 435 Evaluierungen

Wenn du 100/Monat machst → Break-Even nach 4-5 Monaten

Szenario C (Premium): Domain kostet €60.000+
- Einmalig: €60.000
- Migration: €5.000
- Total: €65.000

Break-Even: €65.000 / €29,90 = 2.174 Evaluierungen
Bei 100/Monat → Break-Even nach 22 Monaten (fast 2 Jahre!)
```

**Entscheidungs-Matrix:**

| Evaluierungen/Monat | Domain-Kosten | Empfehlung | Begründung |
|---------------------|---------------|------------|------------|
| <50/Monat | Beliebig | ❌ NEIN | Zu wenig Traffic, lohnt nicht |
| 50-100/Monat | <€10k | ✅ JA | Schneller Break-Even |
| 50-100/Monat | >€10k | ⚠️ VIELLEICHT | Rechne genau |
| >100/Monat | <€15k | ✅ JA | Lohnt sich |
| >100/Monat | >€15k | ⚠️ VIELLEICHT | Ab >200/Monat klares JA |

---

## 4.4 Expansion-Roadmap

**Wenn Österreich erfolgreich läuft (>100 Eval/Monat):**

### Nächste Länder:

**1. Schweiz 🇨🇭 (Q2 2026)**
- Ähnlich wie Österreich (Deutsch, A/L/M/S, ehorses.ch)
- Höhere Kaufkraft (Premium-Markt)
- Gleiche Tech-Basis wie AT
- Aufwand: 3-4 Wochen (da Struktur existiert)

**2. Niederlande 🇳🇱 (Q3 2026)**
- Großer Markt (KWPN Warmblood Hub)
- Vollständige Übersetzung erforderlich (Niederländisch)
- Anderes Klassifikations-System (Herausforderung)
- Aufwand: 6-8 Wochen

**3. Frankreich 🇫🇷 (Q4 2026)**
- Riesiger Markt (2M Reiter)
- Vollständige Übersetzung erforderlich (Französisch)
- Anderes System (FFE Galop 1-7)
- Aufwand: 8-10 Wochen

---

# Anhang: Checklisten & Templates

## A.1 Go-Live Checklist

**1 Woche vor Launch:**
```
Technical:
□ Alle /at/ Seiten live auf Staging
□ Formular getestet (alle Felder, Validierung)
□ KI-Prompt tested (3+ Test-Evaluierungen durchgeführt)
□ Stripe EPS-Payment tested (Test-Kauf durchgeführt)
□ Email-Benachrichtigungen funktionieren
□ PDF-Generation funktioniert
□ Mobile Testing abgeschlossen (iOS + Android)
□ Browser Testing abgeschlossen (Chrome, Safari, Firefox)

Legal:
□ DSGVO Legal Review abgeschlossen
□ Datenschutzerklärung updated (falls erforderlich)
□ AGB updated (falls erforderlich)
□ Cookie-Banner funktioniert

Marketing:
□ Google Ads Kampagnen bereit (pausiert)
□ Facebook Ads Kampagnen bereit (pausiert)
□ Landing Page /at/ optimiert
□ Google Analytics Goals konfiguriert
□ Tracking tested (Test-Conversion durchgeführt)

Business:
□ Support-Prozess definiert (wer antwortet auf AT-Anfragen?)
□ Preise final bestätigt
□ FAQ AT-spezifisch erstellt
```

**Launch Day:**
```
□ 09:00: Final Check auf Production
□ 10:00: Google Ads aktivieren
□ 10:00: Facebook Ads aktivieren
□ 11:00: Social Media Post (Instagram, Facebook)
□ 12:00: Email an Newsletter (falls vorhanden)
□ 14:00: Monitoring Check (sind erste Klicks sichtbar?)
□ 17:00: End-of-Day Review (irgendwelche Fehler?)
```

**1 Woche nach Launch:**
```
□ Tägliches Monitoring (erste 7 Tage kritisch!)
□ Alle Support-Anfragen beantworten (max. 24h Response Time)
□ Bugs priorisieren und fixen
□ Erste Optimierungen basierend auf Daten
```

---

## A.2 Budget-Kalkulation (Monat 1-3)

### Einmalige Kosten (Setup)
| Position | Kosten |
|----------|--------|
| Development (Frontend) | €4.000 |
| Development (Backend/KI) | €2.000 |
| Development (Payment) | €1.000 |
| Legal Review (DSGVO) | €1.500 |
| Testing & QA | €1.500 |
| **TOTAL SETUP** | **€10.000** |

### Monatliche Kosten (laufend)
| Position | Monat 1 | Monat 2 | Monat 3 |
|----------|---------|---------|---------|
| Google Ads | €1.500 | €2.000 | €2.000 |
| Facebook Ads | €1.000 | €1.500 | €1.500 |
| Piloterr API (ehorses.at) | €200 | €200 | €200 |
| Stripe Fees (bei 20/50/100 Eval) | €120 | €300 | €600 |
| Support/Wartung | €500 | €500 | €500 |
| **TOTAL MONAT** | **€3.320** | **€4.500** | **€4.800** |

### Total Investment (3 Monate)
```
Setup: €10.000
Monat 1: €3.320
Monat 2: €4.500
Monat 3: €4.800
─────────────────
TOTAL: €22.620
```

### Revenue-Projektion (konservativ)
```
Monat 1: 20 Evaluierungen × €29,90 = €598
Monat 2: 50 Evaluierungen × €29,90 = €1.495
Monat 3: 100 Evaluierungen × €29,90 = €2.990
────────────────────────────────────────
TOTAL REVENUE: €5.083

ROI nach 3 Monaten:
(€5.083 - €22.620) / €22.620 = -78% (Verlust, normal für Startup-Phase!)
```

### Break-Even Analyse
```
Monatliche Fixkosten (ohne Ads): €700 (API + Support)
Monatliche Ads-Kosten: €3.500 (Google + Facebook)
Total monatlich: €4.200

Break-Even:
€4.200 / €29,90 = 140 Evaluierungen/Monat

Realistische Timeline: Monat 6-9 (wenn Wachstum konstant)
```

---

## A.3 Risk Management

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **DSGVO-Verstoß** | Niedrig | Sehr hoch | Legal Review (€1.500), nur nicht-personenbezogene Daten scrapen |
| **Niedrige Conversions (<1%)** | Mittel | Hoch | A/B Testing, lokale Payment (EPS), UX-Optimierung |
| **Technische Bugs** | Mittel | Mittel | Umfangreiche QA, Beta-Test mit Friends & Family |
| **Marketing ROI negativ** | Mittel | Hoch | Start mit Mini-Budget (€10/Tag), wöchentliche Optimierung |
| **AT-Klassifikation falsch** | Niedrig | Mittel | Recherche bei OEPS, ehorses.at analysieren, AT-Experte konsultieren |
| **Domain pferdewert.at zu teuer** | Mittel | Niedrig | Subdirectory-Strategie (/at/) nutzen, später upgraden |

---

## A.4 Wichtige Kontakte

**Entwicklung:**
- Frontend-Team: [Kontakt einfügen]
- Backend-Team: [Kontakt einfügen]

**Legal:**
- DSGVO-Anwalt: [Zu finden, Empfehlung: Kanzlei mit DE+AT]

**Marketing:**
- Google Ads Agentur (optional): [Falls extern]
- Facebook Ads Manager: [Falls extern]

**Daten:**
- Piloterr Support: support@piloterr.com (ehorses API)

**Österreich-Expertise:**
- OEPS (Österreichischer Pferdesportverband): office@oeps.at
- ehorses.at Kontakt: [Falls Partnership gewünscht]

---

# Zusammenfassung: Deine nächsten Schritte

## Diese Woche (Woche 1):

**Tag 1-2: Strategie finalisieren**
1. ✅ Entscheidung: pferdewert.at Domain kaufen oder /at/ Subdirectory?
   - Recherchiere Preis für pferdewert.at
   - **Empfehlung:** Start mit /at/, später Upgrade

2. ✅ Recherche AT-Klassifikation:
   - Kontaktiere OEPS (office@oeps.at)
   - Analysiere ehorses.at Dropdown-Optionen
   - Dokumentiere Ergebnisse

**Tag 3-4: Legal & Planning**
3. ✅ DSGVO-Anwalt kontaktieren
   - Anfrage mit Scope of Work (siehe Abschnitt 1.3)
   - Angebot einholen
   - Beauftragen

4. ✅ Team-Meeting:
   - Dieser Plan durchgehen
   - Rollen verteilen
   - Timeline bestätigen

**Tag 5: Kick-off Development**
5. ✅ Dev-Team briefen
   - Technische Requirements durchgehen
   - Sprint 1 Tasks definieren
   - Fragen klären

---

## Nächste 2 Wochen (Woche 2-3):

6. ✅ Wöchentliche Stand-ups mit Dev-Team
7. ✅ Legal Review abschließen
8. ✅ Marketing-Material vorbereiten (Ads-Texte, Creatives)

---

## Nächste 4 Wochen (Woche 4-5):

9. ✅ Beta-Testing
10. ✅ Launch-Vorbereitung
11. ✅ Go-Live!

---

**Du schaffst das! 🚀🇦🇹**

Bei Fragen: Einfach dieses Dokument als Referenz nutzen und Schritt für Schritt abarbeiten.
