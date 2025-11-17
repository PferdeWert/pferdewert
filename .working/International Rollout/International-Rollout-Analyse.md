# Internationale Expansion von PferdeWert.de
## Umfassende Markt- und Technologie-Analyse

**Erstellt:** 16. November 2025
**Status:** Strategisches Planungsdokument
**Ziel:** Systematische Internationalisierung des Pferdebewertungs-Service

---

## Executive Summary

Diese Analyse bewertet die internationale Expansion von PferdeWert.de in europäische und globale Märkte. Die wichtigsten Erkenntnisse:

- **Top-Priorität:** Österreich (Q1 2026) - Same language, same classification, ehorses.at data
- **Zweite Priorität:** Schweiz (Q2-Q3 2026) - High purchasing power, German-speaking
- **Dritte Priorität:** Niederlande (Q4 2026) - Major horse market, strong data availability
- **Technische Strategie:** Subdirectory-Ansatz mit next-intl für Next.js 15
- **Investment:** €37.500 für Phasen 1-3 (AT/CH/NL), €60-105k pro ccTLD bei Skalierung

---

# 1. KI-Modell & Datenquellen

## 1.0 Wichtige Klarstellung: Unser KI-Ansatz

**WICHTIG:** PferdeWert.de trainiert KEIN eigenes KI-Modell.

Unser technischer Ansatz:
- Wir nutzen **Standard-KI-APIs** (OpenAI GPT, Anthropic Claude)
- Wir senden einen **Prompt mit Kundendaten** an die API
- Die KI analysiert basierend auf dem Prompt und den mitgelieferten Marktdaten

**Technische Implikation für Internationalisierung:**
- ✅ **Einfache Anpassung:** Wir müssen nur den Prompt und die Länderdaten anpassen
- ✅ **Keine Model-Retraining:** Kein Training erforderlich pro Land
- ✅ **Flexible Parameter:** Land-spezifische Klassifikationen (E/A/L vs A/L/LP) einfach im Prompt definierbar
- ✅ **Schnelle Skalierung:** Neue Länder = neuer Prompt + neue Marktdaten, kein monatelanger Training-Prozess

**Praktisches Beispiel:**
```
Prompt (Deutschland): "Bewerte dieses Pferd mit E/A/L/M/S Klassifikation basierend auf deutschen Marktdaten..."
Prompt (Österreich): "Bewerte dieses Pferd mit A/L/LP/LM/M/S Klassifikation basierend auf österreichischen Marktdaten..."
```

Das macht die Internationalisierung **erheblich einfacher** als ursprünglich gedacht.

---

## 1.1 Marktanalyse nach Ländern

### Österreich 🇦🇹

**Online-Marktplätze:**
- **ehorses.at** (Hauptplattform)
  - Teil des ehorses-Netzwerks mit 17.000+ globalen Listings
  - 300+ neue Pferde täglich
  - 16M+ Seitenaufrufe/Monat

**Datenqualität:**
- ✅ **Volumen:** HOCH - Teil des ehorses-Netzwerks
- ✅ **Preistransparenz:** SEHR HOCH - Preise öffentlich sichtbar
- ✅ **Scraping-Machbarkeit:** HOCH - Piloterr bietet ehorses-API
- ✅ **Sprache:** Deutsch (Österreichische Varianten: Paradeiser, Erdapfel)

**Klassifikation:**
- A/L (inkl. LM/LP-Varianten)/M/S
- Kein E-Level (startet bei A)
- Sehr ähnlich zu Deutschland

**KI-Vorhersagequalität:** ⭐⭐⭐⭐⭐ (5/5)
- Identisches Datenformat wie Deutschland (ehorses)
- Gleiche Klassifikation (nur E-Level fehlt)
- Kulturell/wirtschaftlich sehr ähnlich

---

### Schweiz 🇨🇭

**Online-Marktplätze:**
1. **swisshorse.ch** (ZVCH - Zuchtverband CH Sportpferde)
2. **tier-inserate.ch** (Allgemeine Kleinanzeigen mit Pferde-Sektion)
3. **reitsport.ch** (581 Listings)
4. **horses4sale.ch** (Kostenlose Werbeplattform)
5. **ehorses.ch** (Schweizer Version)

**Datenqualität:**
- ✅ **Volumen:** MITTEL - Kleinerer Markt, fragmentiert über mehrere Plattformen
- ✅ **Preistransparenz:** HOCH - Meiste Plattformen zeigen Preise
- ⚠️ **Scraping-Machbarkeit:** MITTEL - Mehrere kleinere Plattformen, teilweise öffentliche Daten
- ✅ **Sprache:** Deutsch (Schriftsprache: Hochdeutsch, gesprochen: Schweizerdeutsch)

**Klassifikation:**
- A/L/M/S (kein E-Level)
- Identisch zu Österreich

**Besonderheiten:**
- Keine "ß"-Zeichen (stattdessen "ss")
- Höchste Importpreise pro Tonne: $7.816 (höchste Kaufkraft)

**KI-Vorhersagequalität:** ⭐⭐⭐⭐ (4/5)
- Mehrere Datenquellen, aber kleinerer Markt
- Identische Klassifikation zu Österreich
- Hohe Kaufkraft, Premiummarkt

---

### Niederlande 🇳🇱

**Online-Marktplätze:**
1. **PaardPlaats.nl** - "Europe's trusted marketplace" (NL/BE/DE)
2. **Dutch Horse Trading** - Monatliche Online-Auktionen
3. **Dutch Sport Horse Sales** - Spezialisierte Auktionen
4. **Hippomundo.com**

**Datenqualität:**
- ✅ **Volumen:** SEHR HOCH - Niederlande ist Major Sport Horse Breeding Hub (v.a. KWPN Warmblüter)
- ✅ **Preistransparenz:** SEHR HOCH - Auktionsformate bieten klare Preise
- ✅ **Scraping-Machbarkeit:** MITTEL bis HOCH - Gut strukturierte Plattformen
- ⚠️ **Sprache:** Niederländisch (vollständige Übersetzung erforderlich)

**Klassifikation:**
- **KWPN-System:** Fokus auf Zucht-Kategorien (Dressur/Springen/Fahren/Gelders)
- Nicht trainingsbasiert wie E/A/L/M/S
- **Herausforderung:** Mapping auf unser System erforderlich

**Marktgröße:**
- Global führend bei Sportpferdezucht (KWPN Warmblood)
- 93% der Niederländer kaufen online (höchste E-Commerce-Rate Europa)

**KI-Vorhersagequalität:** ⭐⭐⭐⭐ (4/5)
- Exzellente Datenquellen (Auktionen = transparente Preise)
- Unterschiedliches Klassifikationssystem = zusätzlicher Mapping-Aufwand
- Sehr großer, professioneller Markt

---

### Frankreich 🇫🇷

**Online-Marktplätze:**
1. **ChevalAnnonce.com** - "Größtes französischsprachiges Reitsportforum"
2. **Equirodi.com** - 10.000+ Pferde, 500k Besuche/Monat (seit 2006)
3. **Find-Your-Horse.fr**
4. **SportHorses.fr**
5. **ehorses.com/fr**

**Datenqualität:**
- ✅ **Volumen:** SEHR HOCH - €14B Sektor, 2M Reiter, 8.600 Clubs, 35.000 Züchter
- ✅ **Preistransparenz:** HOCH
- ✅ **Scraping-Machbarkeit:** HOCH - Große Plattformen mit strukturierten Listings
- ⚠️ **Sprache:** Französisch (vollständige Lokalisierung erforderlich)

**Klassifikation:**
- **FFE Galop 1-7** + Disziplin-spezifisch (CSO/Dressur/CCE ab Galop 5-7)
- Komplett unterschiedlich zu E/A/L/M/S

**Marktgröße:**
- #1 Reitsportland (für Frauen)
- 75.000 Vollzeitstellen
- €12B Umsatz (2010-Daten)

**KI-Vorhersagequalität:** ⭐⭐⭐⭐ (4/5)
- Exzellente Datenquellen (Equirodi: 500k Besuche/Monat)
- Unterschiedliches Klassifikationssystem = Mapping-Aufwand
- Sehr großer Markt, aber Sprachbarriere

---

### Belgien 🇧🇪

**Online-Marktplätze:**
1. **Horse Auction Belgium** (horseauctionbelgium.com) - 7+ Jahre aktiv
2. **Belgian Horse Trading** (belgianhorsetrading.com)
3. **Primi.horse**
4. **ehorses.com/be**

**Datenqualität:**
- ✅ **Volumen:** MITTEL bis HOCH - Belgien ist Major Exporter (30% der Show Jumping Championship Horses sind belgisch gezüchtet)
- ✅ **Preistransparenz:** HOCH - Auktionsbasiert
- ⚠️ **Scraping-Machbarkeit:** MITTEL - Kleinere Plattformen aber strukturierte Daten
- ⚠️ **Sprache:** Zweisprachig - Niederländisch (60%) und Französisch (39%), Flandern/Wallonien-Teilung

**Marktgröße:**
- €219M Sektor (nur Flandern)
- 1.750 Reitsport-Unternehmen in Flandern

**Besonderheit:**
- Zweisprachigkeit = doppelter Übersetzungsaufwand

**KI-Vorhersagequalität:** ⭐⭐⭐ (3/5)
- Gute Datenquellen, aber kleinerer Markt
- Zweisprachigkeit erhöht Komplexität

---

### Vereinigtes Königreich 🇬🇧

**Online-Marktplätze:**
1. **ehorses.co.uk**
2. **The Horse Exchange** (thehorseexchange.co.uk) - "Am schnellsten wachsend"
3. **The Equine Auction** (theequineauction.co.uk)
4. **Horse Trader** (horse-trader.co.uk)
5. **Horse & Hound Classifieds**
6. **Equipt App** (Mobile-first)
7. **Horsed App** (Nachhaltigkeits-Fokus)

**Datenqualität:**
- ✅ **Volumen:** SEHR HOCH - £8Mrd Industrie, 1M Pferde, 374k Haushalte
- ✅ **Preistransparenz:** HOCH - Wettbewerbsmarkt mit sichtbaren Preisen
- ✅ **Scraping-Machbarkeit:** HOCH - Mehrere etablierte Plattformen mit strukturierten Daten
- ⚠️ **Sprache:** Englisch
- ⚠️ **Regulierung:** Brexit-Komplexität

**Klassifikation:**
- **BE Levels:** BE80/90/100/Novice/Intermediate/Advanced
- **BHS Stages:** 1-5
- **FEI Star System:** Für internationale Level

**Marktgröße:**
- £8B jährlicher Beitrag
- 2. größter ländlicher Arbeitgeber nach Landwirtschaft

**KI-Vorhersagequalität:** ⭐⭐⭐⭐ (4/5)
- Exzellente Datenquellen
- Unterschiedliches Klassifikationssystem
- Brexit-Regulierung und Währungskomplexität

---

### Nordische Länder (Schweden, Dänemark, Norwegen) 🇸🇪 🇩🇰 🇳🇴

**Schweden:**
- **Plattformen:** ehorses.com, BillyRider.se, ProEquest.com, Allstar Ranch Sweden
- **Volumen:** HOCH - 488.893 Pferde (54% des nordischen Totals), €6,7B Umsatz, 38.000 Jobs
- **Sprache:** Schwedisch (hästar = Pferde)

**Dänemark:**
- **Plattformen:** Helgstrand Dressage (erfolgreichster Stall weltweit, 650+ Pferde), Ridehesten.com
- **Volumen:** MITTEL bis HOCH - 21% der nordischen Pferde, DKK 22,5B Umsatz
- **Sprache:** Dänisch (heste = Pferde)

**Norwegen:**
- **Plattformen:** Allstar Ranch bietet Transport nach Norwegen, begrenzte dedizierte Plattformen
- **Volumen:** KLEIN bis MITTEL - 100-125k Pferde (7,7% des nordischen Totals)
- **Sprache:** Norwegisch

**Gesamt-Bewertung Nordics:**
- 900.000 Pferde insgesamt
- Gut strukturierte Märkte aber kleine individuelle Volumina

**KI-Vorhersagequalität:** ⭐⭐ (2/5)
- Fragmentiert über mehrere Länder
- Mehrere Sprachen erforderlich
- Kleinere individuelle Märkte

---

### USA 🇺🇸

**Online-Marktplätze:**
1. **DreamHorse.com** - "Premier horse classifieds"
2. **EquineNow** - Kostenlose Werbung
3. **Equine.com** - 130.000+ verkaufte Pferde
4. **HorseClicks** - Kostenlose Listings
5. **EquineTrader** - "World's largest"

**Datenqualität:**
- ✅ **Volumen:** MASSIV - 6,6M Pferde, $177B wirtschaftlicher Impact, 7M Amerikaner involviert
- ✅ **Preistransparenz:** SEHR HOCH - Reifer, wettbewerbsfähiger Marktplatz
- ✅ **Scraping-Machbarkeit:** SEHR HOCH - Gut etablierte Plattformen mit strukturierten Daten
- ⚠️ **Sprache:** Englisch
- ⚠️ **Markt:** Andere Wettbewerbslandschaft, Zeitzonen, Regulierung

**Klassifikation:**
- **USEF Levels:** Starter/Beginner Novice/Novice/Training/Modified/Preliminary/Intermediate/Advanced (8 Levels)
- **FEI:** Für internationale Levels

**Marktgröße:**
- Größter globaler Markt - $177B Impact (2023)
- 2,2M Jobs
- $79B Gehälter

**KI-Vorhersagequalität:** ⭐⭐⭐⭐ (4/5)
- Exzellente Datenquellen
- Riesiger Markt = viele Trainingsdaten
- Unterschiedliches System, andere Wettbewerbslandschaft

---

## 1.2 Tier-Einstufung nach Marktreife

### Tier 1: HOHE VIABILITÄT (Sofortige Expansion)

#### **🥇 Österreich** - Priority Score: 10/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐⭐ | ehorses.at Integration, identische Plattform zu DE |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Öffentliche Preise Standard |
| Kulturelle Ähnlichkeit | ⭐⭐⭐⭐⭐ | Deutschsprachig, gleiches Klassifikationssystem (A/L/M/S) |
| Marktgröße | ⭐⭐⭐ | Mittel - Teil der DACH-Region |
| Technischer Aufwand | ⭐⭐⭐⭐⭐ | NIEDRIG - Gleiche Sprache (kleinere österreichische Varianten) |

**Empfehlung:** **PRIORITÄT #1** - Einfachste Expansion, gemeinsame Sprache/Kultur/Systeme

**Quick Wins:**
- Gleiche ehorses-Datenquelle wie Deutschland
- Keine neuen Klassifikationen zu lernen (nur E-Level fehlt)
- Minimal Translation-Aufwand (Paradeiser, Erdapfel, etc.)

---

#### **🥈 Schweiz** - Priority Score: 9/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐ | Mehrere Plattformen (swisshorse.ch, tier-inserate.ch, ehorses.ch) |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Sehr hoch |
| Kulturelle Ähnlichkeit | ⭐⭐⭐⭐ | Deutschsprachig (geschrieben), Schweizerdeutsch (gesprochen) |
| Marktgröße | ⭐⭐⭐⭐ | Mittel - Höchste Kaufkraft |
| Technischer Aufwand | ⭐⭐⭐⭐ | NIEDRIG bis MITTEL - Schweizerdeutsch-Unterschiede minimal in Schriftform (ss vs ß) |

**Empfehlung:** **PRIORITÄT #2** - DACH-Synergie, High-Value-Markt

**Besonderheiten:**
- Höchste Importpreise pro Tonne ($7.816) = Premiummarkt
- Schweizer präferieren .ch-Domains (höheres Vertrauen)

---

### Tier 2: MITTLERE VIABILITÄT (Strategische Expansion)

#### **🥉 Niederlande** - Priority Score: 8/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐⭐ | PaardPlaats, Dutch Horse Trading, strukturierte Auktionen |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Sehr hoch - Auktionskultur |
| Kulturelle Ähnlichkeit | ⭐⭐⭐ | Unterschiedliche Sprache, aber geografisch nah, ähnliche Wirtschaft |
| Marktgröße | ⭐⭐⭐⭐⭐ | Groß - Major Sport Horse Breeding Hub (KWPN globaler Leader) |
| Technischer Aufwand | ⭐⭐⭐ | MITTEL - Niederländische Übersetzung erforderlich, anderes Klassifikationssystem |

**Empfehlung:** STARKER KANDIDAT - Hochwertiger Markt, erfordert Lokalisierungs-Investment

**Herausforderungen:**
- KWPN-System (Zucht-fokussiert) ≠ E/A/L/M/S (Training-fokussiert)
- Vollständige Übersetzung erforderlich

**Chancen:**
- 93% E-Commerce-Rate (höchste in Europa)
- iDEAL Payment (70% Marktanteil) = Conversion-Booster

---

#### **Frankreich** - Priority Score: 7/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐⭐ | Equirodi (500k Besuche/Monat), ChevalAnnonce |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Hoch |
| Kulturelle Ähnlichkeit | ⭐⭐ | Unterschiedliche Sprache/Kultur |
| Marktgröße | ⭐⭐⭐⭐⭐ | Sehr groß - €14B Sektor, 2M Reiter |
| Technischer Aufwand | ⭐⭐ | HOCH - Französische Übersetzung, FFE Galop-System Anpassung |

**Empfehlung:** LANGFRISTIG - Massiver Markt, aber erhebliche Lokalisierung erforderlich

---

### Tier 3: NIEDRIGERE VIABILITÄT (Später erwägen)

#### **Belgien** - Priority Score: 6/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐ | Kleinere Plattformen aber Qualitätsdaten |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Hoch |
| Kulturelle Ähnlichkeit | ⭐⭐⭐ | Mittel - Zweisprachige (NL/FR) Komplexität |
| Marktgröße | ⭐⭐⭐ | Mittel - €219M Flandern-Sektor, Major Exporter |
| Technischer Aufwand | ⭐⭐ | HOCH - Benötigt Niederländisch + Französische Versionen |

**Empfehlung:** SPÄTERE PHASE - Zweisprachige Komplexität, kleinerer Markt

---

#### **UK** - Priority Score: 6/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐⭐ | Reifer Marktplatz |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Sehr hoch |
| Kulturelle Ähnlichkeit | ⭐⭐ | Niedrig-Mittel - Unterschiedliche Sprache, Brexit-Überlegungen |
| Marktgröße | ⭐⭐⭐⭐⭐ | Sehr groß - £8B Industrie |
| Technischer Aufwand | ⭐⭐⭐ | MITTEL - Englische Übersetzung, unterschiedliche Klassifikation (BE Levels) |

**Empfehlung:** ERWÄGEN - Großer Markt aber Brexit/Währung/Regulierungs-Komplexität

---

#### **Nordische Länder** - Priority Score: 4/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐ | Moderat - Fragmentiert über Länder |
| Preistransparenz | ⭐⭐⭐⭐ | Mittel bis hoch |
| Kulturelle Ähnlichkeit | ⭐⭐⭐ | Mittel - Geografisch nah, unterschiedliche Sprachen |
| Marktgröße | ⭐⭐ | Klein bis mittel pro Land (900k Pferde gesamt über Region) |
| Technischer Aufwand | ⭐ | SEHR HOCH - Mehrere Sprachen (Schwedisch/Dänisch/Norwegisch) |

**Empfehlung:** SPÄTERE PHASE - Kleine individuelle Märkte, hohe Lokalisierungskosten

---

#### **USA** - Priority Score: 5/10

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Datenverfügbarkeit | ⭐⭐⭐⭐⭐ | Reife, große Plattformen |
| Preistransparenz | ⭐⭐⭐⭐⭐ | Sehr hoch |
| Kulturelle Ähnlichkeit | ⭐ | Niedrig - Unterschiedlicher Markt, Zeitzonen, Regulierungen |
| Marktgröße | ⭐⭐⭐⭐⭐ | MASSIV - $177B, 6,6M Pferde |
| Technischer Aufwand | ⭐ | SEHR HOCH - Englisch + anderes Klassifikationssystem + Währung + rechtliche Komplexität |

**Empfehlung:** LANGFRISTIG - Riesiger Markt aber erhebliches Investment erforderlich, unterschiedliche Wettbewerbslandschaft

---

## 1.3 DSGVO-Compliance beim Web Scraping

### Rechtliche Lage (Stand 2025)

**DSGVO gilt für:**
- Web Scraping für KI-Training, wenn personenbezogene Daten verarbeitet werden
- Alle EU-Länder (inkl. CH durch Äquivalenzabkommen)

**Rechtsgrundlage-Herausforderung:**
- "Berechtigtes Interesse" (Art. 6 Abs. 1 lit. f DSGVO) ist wahrscheinlich einzige gültige Basis
- **Status:** Kontrovers, rechtliche Unsicherheit
  - **Niederländische DPA:** Restriktive Position (kommerzielle Interessen wahrscheinlich nicht gültig)
  - **Französische CNIL & EDPB:** Permissiver (berechtigte Interessen möglich)
  - **Anhängiges CJEU-Urteil:** Rechtliche Unsicherheit

### Risiko-Minimierungsstrategien

#### ✅ **Empfohlener Ansatz:**

1. **Scrape Nicht-Personenbezogene Daten:**
   - ✅ Pferdecharakteristika (Rasse, Alter, Größe, Ausbildungsstand)
   - ✅ Preise
   - ✅ Standort (Land/Region, aber nicht Adresse)
   - ❌ Vermeiden: Besitzernamen, E-Mails, Telefonnummern

2. **Nur Öffentliche Daten:**
   - ✅ Nur öffentlich sichtbare Informationen (keine Login-Walls)
   - ✅ Respektiere robots.txt
   - ✅ Überprüfe Plattform-ToS

3. **Datenminimierung:**
   - Nur Daten sammeln, die für Bewertungsmodell notwendig sind
   - Keine unnötige Datenspeicherung

4. **Transparenz:**
   - Datenquellen klar in Datenschutzerklärung angeben
   - "Daten aus öffentlichen Pferdemarktplätzen" = ausreichend

#### 🔒 **Piloterr ehorses API (Empfohlen):**

**Vorteile:**
- Kommerzielle Lösung für ehorses-Datenextraktion
- Strukturierte Daten für Pferde-Listings
- Wahrscheinlich konform mit ehorses ToS (bezahlter Service)
- Reduziert rechtliches Risiko

**Empfehlung:**
- Nutze für ehorses.de, ehorses.at, ehorses.ch Daten
- Reduziert technischen Aufwand + rechtliches Risiko

#### ⚖️ **Rechtliche Review:**

**Budget:** €1.500 pro Phase für DSGVO-Compliance-Check
- Review Scraping-Strategie pro Markt
- Anpassung Datenschutzerklärung
- Minimiert rechtliches Risiko

---

# 2. Bewertungsformular-Anpassungen

## 2.1 Klassifikationssysteme pro Land

### Vergleichstabelle

| Land | Klassifikationssystem | Level-Details | Kompatibilität zu DE (E/A/L/M/S) |
|------|----------------------|---------------|-----------------------------------|
| **Deutschland** 🇩🇪 | E/A/L/M/S (Eignungsklasse) | E (Einstieg), A (Anfänger), L (Leistungsklasse), M (Mittlere Tour), S (Schwere Klasse) | 🟢 Basis-System |
| **Österreich** 🇦🇹 | A/L/M/S | Kein E-Level, startet bei A; L hat LM/LP-Varianten (Mittlere/Prüfung) | 🟢 Sehr hoch (nur E fehlt) |
| **Schweiz** 🇨🇭 | A/L/M/S | Kein E-Level, startet bei A; identisch zu Österreich | 🟢 Sehr hoch (nur E fehlt) |
| **Niederlande** 🇳🇱 | KWPN Breeding Categories | Dressur/Springen/Fahren/Gelders; **Zucht-fokussiert**, nicht Training-basiert | 🟡 Mittel (anderes Konzept) |
| **UK** 🇬🇧 | BE Levels + BHS Stages | BE80/90/100/Novice/Intermediate/Advanced; BHS Stages 1-5 | 🟡 Mittel (andere Struktur) |
| **Frankreich** 🇫🇷 | FFE Galop 1-7 | Galop 1-7 + Disziplin-spezifisch (CSO/Dressur/CCE ab Galop 5-7) | 🟡 Mittel (andere Struktur) |
| **USA** 🇺🇸 | USEF 8 Levels | Starter → Beginner Novice → Novice → Training → Modified → Preliminary → Intermediate → Advanced | 🟡 Mittel (8 vs 5 Levels) |
| **Belgien** 🇧🇪 | Ähnlich zu NL/FR | Variiert regional (Flandern=NL, Wallonien=FR) | 🟡 Mittel |
| **Nordics** | Nationale Systeme + Swedish Warmblood Breeding Standards | Variiert pro Land | 🟡 Mittel |

---

### 2.2 FEI-Harmonisierung (Internationale Standards)

**FEI = Fédération Equestre Internationale** (Internationale Reiterliche Vereinigung)

Alle nationalen Systeme führen zu FEI-Standards auf höchstem Level:

#### **Dressur:**
- Prix St. Georges (PSG) → Intermediate I/A/B → Intermediate II → Grand Prix → Grand Prix Special
  - **PSG:** Minimum 7 Jahre alt, inkl. Halbpirouetten, 3-Takt Tempiwechsel
  - **Grand Prix:** Olympia/Weltcup-Level, höchstes Wettkampf-Tier

#### **Eventing (Vielseitigkeit):**
- **CCI* bis CCI\***** (1-Stern bis 5-Stern)
  - Sprunghöhen korrelieren zu nationalen Advanced/Preliminary Levels

#### **Springen:**
- **Group/Graded Races** (IFHA-Standards für Rennen)

**Wichtige Erkenntnis:**
- Alle Länder münden letztendlich in FEI-internationale Standards
- Macht Daten-Harmonisierung auf oberen Levels möglich
- Untere Levels variieren erheblich pro Land

---

### 2.3 Formular-Mapping-Strategie

#### **Option 1: Universelles Mapping (Empfohlen für Start)**

**Ansatz:** Alle Länder auf DE E/A/L/M/S System mappen

**Mapping-Tabelle:**

| DE | AT/CH | NL (KWPN Approx.) | UK (BE) | FR (Galop) | USA (USEF) |
|----|-------|-------------------|---------|------------|------------|
| **E** | - | Basis Training | BE80 | Galop 1-2 | Starter |
| **A** | **A** | Working Level | BE90-100 | Galop 3-4 | Beginner Novice / Novice |
| **L** | **L** (LM/LP) | Elementary | Novice | Galop 5-6 | Training / Modified |
| **M** | **M** | Medium | Intermediate | Galop 6-7 (CSO/Dressur) | Preliminary / Intermediate |
| **S** | **S** | Advanced | Advanced | Galop 7+ (Competition) | Advanced |

**Frontend-Implementierung:**

```typescript
// types/evaluation.ts
export const CLASSIFICATION_SYSTEMS = {
  'de': ['E', 'A', 'L', 'M', 'S'],
  'de-AT': ['A', 'L', 'LM', 'LP', 'M', 'S'],
  'de-CH': ['A', 'L', 'M', 'S'],
  'nl': ['Basis', 'Working', 'Elementary', 'Medium', 'Advanced'],
  'en-GB': ['BE80', 'BE90', 'BE100', 'Novice', 'Intermediate', 'Advanced'],
  'fr': ['Galop 1-2', 'Galop 3-4', 'Galop 5-6', 'Galop 6-7', 'Competition'],
  'en-US': ['Starter', 'Beginner Novice', 'Novice', 'Training', 'Modified', 'Preliminary', 'Intermediate', 'Advanced'],
} as const;

// Mapping zu internem System
export function mapToInternalClassification(
  locale: string,
  externalLevel: string
): 'E' | 'A' | 'L' | 'M' | 'S' {
  const mappings = {
    'de-AT': { 'A': 'A', 'L': 'L', 'LM': 'L', 'LP': 'L', 'M': 'M', 'S': 'S' },
    'de-CH': { 'A': 'A', 'L': 'L', 'M': 'M', 'S': 'S' },
    'nl': { 'Basis': 'E', 'Working': 'A', 'Elementary': 'L', 'Medium': 'M', 'Advanced': 'S' },
    'en-GB': { 'BE80': 'E', 'BE90': 'A', 'BE100': 'A', 'Novice': 'L', 'Intermediate': 'M', 'Advanced': 'S' },
    'fr': { 'Galop 1-2': 'E', 'Galop 3-4': 'A', 'Galop 5-6': 'L', 'Galop 6-7': 'M', 'Competition': 'S' },
    'en-US': { 'Starter': 'E', 'Beginner Novice': 'A', 'Novice': 'A', 'Training': 'L', 'Modified': 'L', 'Preliminary': 'M', 'Intermediate': 'M', 'Advanced': 'S' },
  };

  return mappings[locale]?.[externalLevel] || 'A'; // Fallback
}
```

**Vorteile:**
- ✅ Single KI-Modell für alle Länder (reduziert Trainingsaufwand)
- ✅ Einheitliche Datenbank-Struktur
- ✅ Schnellere Time-to-Market

**Nachteile:**
- ❌ Mapping-Ungenauigkeiten möglich
- ❌ Lokale Nutzer sehen nicht-native Begriffe

---

#### **Option 2: Native Klassifikationen (Langfristig)**

**Ansatz:** Pro Land natives Klassifikationssystem verwenden

**Anforderungen:**
- Separate KI-Modell-Versionen pro Land (oder Multi-Label-Training)
- Erweiterte Datenbank-Felder für jedes System
- Höherer Trainingsaufwand

**Implementierung:**

```typescript
// types/evaluation.ts
export type ClassificationLevel =
  | { system: 'DE'; level: 'E' | 'A' | 'L' | 'M' | 'S' }
  | { system: 'AT'; level: 'A' | 'L' | 'LM' | 'LP' | 'M' | 'S' }
  | { system: 'NL'; level: 'Basis' | 'Working' | 'Elementary' | 'Medium' | 'Advanced' }
  | { system: 'UK'; level: 'BE80' | 'BE90' | 'BE100' | 'Novice' | 'Intermediate' | 'Advanced' };

// MongoDB Schema Extension
{
  classification: {
    system: String, // 'DE', 'AT', 'NL', 'UK'
    level: String,  // Native level
    mappedToDE: String, // E/A/L/M/S for cross-country comparisons
  }
}
```

**Vorteile:**
- ✅ Höchste lokale Präzision
- ✅ Bessere User Experience (native Begriffe)

**Nachteile:**
- ❌ Komplexere Implementierung
- ❌ Mehr Trainingsaufwand
- ❌ Längere Time-to-Market

---

### 2.4 Empfehlung

**Phase 1-3 (AT/CH/NL):** Universelles Mapping (Option 1)
- Schneller Launch
- AT/CH nutzen A/L/M/S = minimales Mapping erforderlich
- NL KWPN auf E/A/L/M/S mappen

**Phase 4+ (FR/UK/US):** Native Klassifikationen (Option 2)
- Nach Markt-Validierung
- Für Länder mit stark unterschiedlichen Systemen (FFE Galop, BE Levels, USEF)

---

# 3. Technische Internationalisierung (i18n)

## 3.1 Framework-Wahl: next-intl

### Warum next-intl statt next-i18next?

| Feature | next-intl | next-i18next |
|---------|-----------|--------------|
| **Next.js 15 Support** | ✅ Optimiert für App Router & Pages Router | ⚠️ Primär für Pages Router |
| **TypeScript** | ✅ Autovervollständigung für Message-Keys, Compile-Time Type-Checking | ⚠️ Basis-Support |
| **Performance** | ✅ Optimiert für App Router, automatisches Client/Server Handling | ⚠️ Älter |
| **Developer Experience** | ✅ Bessere DX mit modernen Next.js Features | ⚠️ Ältere Patterns |
| **2025 Standard** | ✅ Aktueller Best Practice | ⚠️ Legacy (aber stabil) |
| **React Server Components** | ✅ Native Integration | ❌ Begrenzt |

**Entscheidung:** next-intl für neue Implementierung

---

### 3.2 Implementierungs-Roadmap

#### **Schritt 1: Installation & Setup**

```bash
npm install next-intl
```

**Middleware Setup:**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['de', 'de-AT', 'de-CH', 'nl', 'fr', 'en-GB', 'en-US'],

  // Default locale (Germany)
  defaultLocale: 'de',

  // Locale detection strategy
  localeDetection: true, // Auto-detect from Accept-Language header

  // Don't redirect if locale in path
  localePrefix: 'as-needed', // 'de' has no prefix, others do (/at/, /ch/, etc.)
});

export const config = {
  // Match all pathnames except API routes, _next, static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

**Alternative Locale Prefix Strategy:**

```typescript
// Option A: Always show locale (recommended for SEO clarity)
localePrefix: 'always' // URLs: /de/, /de-AT/, /de-CH/, /nl/

// Option B: Hide default locale (current approach)
localePrefix: 'as-needed' // URLs: /, /at/, /ch/, /nl/
```

**Empfehlung:** `as-needed` für Start (cleaner für DE-Nutzer), migriere zu `always` wenn SEO-Daten zeigen, dass explizite Locale-Paths besser ranken.

---

#### **Schritt 2: Verzeichnisstruktur**

```
frontend/
├── messages/
│   ├── de/
│   │   ├── common.json         # Shared UI (Navigation, Footer, etc.)
│   │   ├── home.json           # Homepage-spezifisch
│   │   ├── evaluation.json     # Bewertungsformular
│   │   ├── pricing.json        # Pricing page
│   │   └── ratgeber.json       # Ratgeber/Blog
│   ├── de-AT/
│   │   ├── common.json         # Austrian German overrides
│   │   └── evaluation.json     # "Paradeiser", "Erdapfel" variants
│   ├── de-CH/
│   │   ├── common.json         # Swiss German (ss statt ß)
│   │   └── evaluation.json
│   ├── nl/
│   │   ├── common.json
│   │   ├── home.json
│   │   └── evaluation.json
│   └── fr/
│       └── ... (Future)
├── pages/
│   ├── _app.tsx
│   ├── [locale]/               # Dynamic locale routes (if using always prefix)
│   │   ├── index.tsx
│   │   ├── bewertung.tsx
│   │   └── ...
│   └── ... (or keep current structure with middleware handling)
```

**Wichtig:** Bei `localePrefix: 'as-needed'` musst du NICHT die Verzeichnisstruktur ändern. Middleware handhabt Routing automatisch.

---

#### **Schritt 3: Translation Files**

**Beispiel: `messages/de/common.json`**

```json
{
  "Navigation": {
    "home": "Startseite",
    "evaluation": "Bewertung",
    "ratgeber": "Pferde-Ratgeber",
    "pricing": "Preise",
    "about": "Über uns"
  },
  "Footer": {
    "tagline": "KI-gestützte Pferdebewertung in 2 Minuten",
    "privacy": "Datenschutz",
    "terms": "AGB",
    "imprint": "Impressum"
  },
  "CTA": {
    "startEvaluation": "Jetzt Pferd bewerten",
    "learnMore": "Mehr erfahren"
  }
}
```

**Beispiel: `messages/de-AT/common.json`** (Overrides)

```json
{
  "Footer": {
    "tagline": "KI-gestützte Pferdebewertung in 2 Minuten"
  },
  "LocalTerms": {
    "tomato": "Paradeiser",
    "potato": "Erdapfel"
  }
}
```

**Beispiel: `messages/nl/common.json`**

```json
{
  "Navigation": {
    "home": "Startpagina",
    "evaluation": "Waardering",
    "ratgeber": "Paarden Gids",
    "pricing": "Prijzen",
    "about": "Over ons"
  },
  "Footer": {
    "tagline": "AI-gestuurde paardenevaluatie in 2 minuten",
    "privacy": "Privacy",
    "terms": "Voorwaarden",
    "imprint": "Colofon"
  },
  "CTA": {
    "startEvaluation": "Waardeer je paard nu",
    "learnMore": "Meer informatie"
  }
}
```

---

#### **Schritt 4: Component Usage**

**Server Component (Pages Router - getStaticProps):**

```typescript
// pages/index.tsx
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

export default function HomePage() {
  const t = useTranslations('Navigation');

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/bewertung">{t('evaluation')}</Link>
    </nav>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}/common.json`)).default
    }
  };
}
```

**Client Component:**

```typescript
// components/HeroSection.tsx
'use client'; // If using App Router in future

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('CTA');

  return (
    <button onClick={() => router.push('/bewertung')}>
      {t('startEvaluation')}
    </button>
  );
}
```

**Mit Variablen:**

```json
// messages/de/evaluation.json
{
  "results": {
    "estimatedValue": "Geschätzter Wert: {value}",
    "confidence": "Konfidenz: {percentage}%"
  }
}
```

```typescript
const t = useTranslations('evaluation.results');

<p>{t('estimatedValue', { value: formatCurrency(29900) })}</p>
<p>{t('confidence', { percentage: 87 })}</p>
```

---

#### **Schritt 5: Locale-Switching**

**Language Switcher Component:**

```typescript
// components/LocaleSwitcher.tsx
import { useLocale } from 'next-intl';
import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const locales = [
    { code: 'de', flag: '🇩🇪', name: 'Deutschland' },
    { code: 'de-AT', flag: '🇦🇹', name: 'Österreich' },
    { code: 'de-CH', flag: '🇨🇭', name: 'Schweiz' },
    { code: 'nl', flag: '🇳🇱', name: 'Nederland' },
  ];

  const switchLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={locale === l.code ? 'font-bold' : ''}
        >
          {l.flag} {l.name}
        </button>
      ))}
    </div>
  );
}
```

---

### 3.3 URL-Struktur-Strategien

#### **Vergleich: 3 Ansätze**

| Ansatz | URL-Beispiel | SEO | Kosten | Komplexität | Empfehlung |
|--------|--------------|-----|--------|-------------|------------|
| **Subdirectories** | `pferdewert.de/at/` | ⭐⭐⭐⭐⭐ Schnell (erbt Authority) | € Einzel-Domain | ⭐⭐⭐⭐⭐ Einfach | ✅ **START** |
| **ccTLDs** | `pferdewert.at` | ⭐⭐ Langsam (baut von Grund auf) | €€€ Multiple Domains | ⭐⭐ Komplex | ✅ **SKALIERUNG** |
| **Subdomains** | `at.pferdewert.de` | ⭐ Sehr langsam (behandelt als neue Site) | € Einzel-Domain | ⭐⭐⭐ Moderat | ❌ Nicht empfohlen |

---

#### **Empfohlene Strategie: Subdirectories → ccTLDs**

**Phase 1 (Jahr 1): Subdirectories**

```
Deutschland (default):  https://pferdewert.de/
Österreich:             https://pferdewert.de/at/
Schweiz:                https://pferdewert.de/ch/
Niederlande:            https://pferdewert.de/nl/
```

**Vorteile:**
- ✅ Erbt Domain Authority von pferdewert.de (schnelleres Ranking)
- ✅ Single SEO-Kampagne (Link Building, Content Marketing)
- ✅ Niedrige Kosten (€10-20/Jahr für .de Domain)
- ✅ Einfaches Deployment (single Next.js App)

**Nachteile:**
- ⚠️ Geringeres lokales Vertrauen (besonders in Schweiz: .ch-Präferenz)
- ⚠️ Leicht niedrigere CTR in länderspezifischen Suchen

---

**Phase 2 (Jahr 2+): ccTLD-Migration für erfolgreiche Märkte**

**Kriterium:** Wenn Land >150-200 Evaluierungen/Monat erreicht

```
Österreich:  https://pferdewert.at  (wenn AT erfolgreich)
Schweiz:     https://pferdewert.ch  (wenn CH erfolgreich)
Niederlande: https://pferdewert.nl  (wenn NL erfolgreich)
```

**Vorteile:**
- ✅ Höchstes lokales Vertrauen
- ✅ Bessere CTR für länderspezifische Suchen
- ✅ Stärkstes SEO-Signal für Country Targeting

**Nachteile:**
- ❌ Jede Domain baut Authority von Null auf
- ❌ Separate Link-Building-Kampagnen erforderlich (€20-50k/Jahr pro Domain)
- ❌ Höhere Registrierungs-/Management-Kosten (€15-20/Jahr pro Domain)

**Kosten-Nutzen:**
- **Subdirectory-Ansatz:** €10-20/Jahr
- **ccTLD-Ansatz:** €60-105k/Jahr pro Markt (Domain + SEO + Link Building)

---

#### **SEO-Migrations-Strategie (Subdirectory → ccTLD)**

**Schritt-für-Schritt (z.B. Österreich):**

1. **Registriere ccTLD:** pferdewert.at
2. **Initial 301 Redirect:** `pferdewert.at` → `pferdewert.de/at/`
3. **Content auf Subdirectory aufbauen:** Während ccTLD Authority aufbaut
4. **Nach 6-12 Monaten:** Reverse Redirect `pferdewert.de/at/` → `pferdewert.at`
5. **Update Hreflang Tags:**

```html
<link rel="alternate" hreflang="de" href="https://pferdewert.de/" />
<link rel="alternate" hreflang="de-AT" href="https://pferdewert.at/" />
<link rel="alternate" hreflang="de-CH" href="https://pferdewert.de/ch/" />
<link rel="alternate" hreflang="x-default" href="https://pferdewert.de/" />
```

---

### 3.4 Übersetzungs-Management

#### **Vergleich: Static Files vs Database**

| Kriterium | Static JSON Files | Datenbank (MongoDB/PostgreSQL) |
|-----------|-------------------|--------------------------------|
| **Performance** | ⭐⭐⭐⭐⭐ Build-Time SSG | ⭐⭐⭐ Runtime-Queries |
| **SEO** | ⭐⭐⭐⭐⭐ Schnellere Seiten | ⭐⭐⭐ Zusätzliche Latenz |
| **Kosten** | ⭐⭐⭐⭐⭐ Keine DB-Overhead | ⭐⭐⭐ DB-Hosting-Kosten |
| **Updates** | ⚠️ Benötigt Redeployment | ✅ Echtzeit-Updates |
| **Skalierung** | ⚠️ Build-Zeit steigt | ✅ Konstante Build-Zeit |
| **Developer Experience** | ⭐⭐⭐⭐⭐ Git-Versionierung | ⭐⭐⭐ Separate Verwaltung |
| **Content-Management** | ⚠️ Code-Changes erforderlich | ✅ CMS-Integration möglich |

---

#### **Empfohlene Hybrid-Strategie:**

**Phase 1-3: Static JSON Files**
- Nutze für Core UI/Navigation/Marketing Content
- Schnellste Performance
- Einfache Versionskontrolle

**Phase 4+: Hybrid (Static + Database)**
- **Static:** UI, Navigation, Formular-Labels
- **Database:** Dynamischer Content (Ratgeber-Artikel, FAQs)
- **Client-Side Loading:** Häufig aktualisierte Strings (Announcements)

**Implementierung:**

```typescript
// lib/translations.ts
import { getTranslations } from 'next-intl/server'; // Static
import { fetchDynamicTranslations } from './db'; // Database

export async function getPageTranslations(locale: string, page: string) {
  // Static translations (fast, SSG)
  const staticMessages = await getTranslations({ locale, namespace: page });

  // Dynamic translations (blog posts, FAQs)
  const dynamicMessages = await fetchDynamicTranslations(locale, page);

  return { ...staticMessages, ...dynamicMessages };
}
```

---

### 3.5 Lokalisierungs-Spezifika

#### **German Variants (AT/CH)**

**Österreichisches Deutsch:**
- Vokabular-Unterschiede: "Paradeiser" (Tomate), "Erdapfel" (Kartoffel), "Jänner" (Januar)
- **Strategie:** Separate `de-AT/common.json` mit Overrides

```json
// messages/de-AT/common.json
{
  "LocalTerms": {
    "tomato": "Paradeiser",
    "potato": "Erdapfel",
    "january": "Jänner"
  }
}
```

**Schweizer Deutsch:**
- Keine "ß"-Zeichen (verwende "ss"): "Straße" → "Strasse"
- Vokabular: "Velo" (Fahrrad), "Parkhaus" (Parkplatz)
- **Strategie:** Separate `de-CH/common.json`

```json
// messages/de-CH/common.json
{
  "LocalTerms": {
    "street": "Strasse", // Not "Straße"
    "bicycle": "Velo"
  }
}
```

**next-intl Handling:**

```typescript
// Automatisches Fallback: de-AT -> de -> default
const t = useTranslations();
t('LocalTerms.tomato'); // AT: "Paradeiser", DE: "Tomate"
```

---

#### **Datum/Zeit/Währung-Formatierung**

**next-intl handhabt automatisch:**

```typescript
import { useFormatter } from 'next-intl';

const format = useFormatter();

// Datum
format.dateTime(new Date(), { locale: 'de-AT' });
// Output: "23.11.2025"

format.dateTime(new Date(), { locale: 'en-US' });
// Output: "11/23/2025"

// Währung
format.number(29900, { style: 'currency', currency: 'EUR' });
// Output: "€299,00" (DE), "€ 299,00" (CH)

format.number(24900, { style: 'currency', currency: 'GBP' });
// Output: "£249.00"

// Prozent
format.number(0.87, { style: 'percent' });
// Output: "87%"
```

---

#### **SEO Hreflang Tags**

**Critical für internationale SEO:**

```typescript
// pages/_document.tsx oder Head component
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SEOHead() {
  const router = useRouter();
  const canonicalUrl = `https://pferdewert.de${router.asPath}`;

  return (
    <Head>
      {/* Self-referencing canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang for each locale */}
      <link rel="alternate" hreflang="de" href="https://pferdewert.de/" />
      <link rel="alternate" hreflang="de-AT" href="https://pferdewert.de/at/" />
      <link rel="alternate" hreflang="de-CH" href="https://pferdewert.de/ch/" />
      <link rel="alternate" hreflang="nl-NL" href="https://pferdewert.de/nl/" />
      <link rel="alternate" hreflang="fr-FR" href="https://pferdewert.de/fr/" />

      {/* x-default for undefined locales */}
      <link rel="alternate" hreflang="x-default" href="https://pferdewert.de/" />
    </Head>
  );
}
```

**Wichtig:**
- `x-default` zeigt auf DE (Standard)
- Jede Seite muss alle Hreflang-Varianten haben
- URLs müssen absolute URLs sein (inkl. https://)

---

# 4. Payment & Pricing

## 4.1 Stripe Multi-Currency Setup

### Pricing-Strategie: Manuelle Currency-Preise

**❌ VERMEIDEN: Adaptive Pricing**

Warum nicht automatische Währungskonvertierung?
- 2-4% Währungskonvertierungs-Gebühr
- 0,5-1% Wechselkurs-Gebühr
- **= bis zu 7% Gesamtgebühren**
- Reduziert Gewinnmargen erheblich

---

**✅ EMPFOHLEN: Manuelle Preise pro Währung**

**Code-Implementierung:**

```typescript
// frontend/lib/pricing.ts (Enhancement)

export const PRICING_BY_CURRENCY = {
  EUR: {
    currency: 'EUR',
    symbol: '€',
    basic: 2990, // €29.90
    premium: 4990, // €49.90
  },
  CHF: {
    currency: 'CHF',
    symbol: 'CHF',
    basic: 2990, // CHF 29.90 (CHF ≈ EUR Parität)
    premium: 4990,
  },
  GBP: {
    currency: 'GBP',
    symbol: '£',
    basic: 2490, // £24.90 (angepasst an Kaufkraft)
    premium: 4190, // £41.90
  },
  USD: {
    currency: 'USD',
    symbol: '$',
    basic: 3290, // $32.90
    premium: 5490, // $54.90
  },
} as const;

export function getPricingForLocale(locale: string) {
  const currencyMap: Record<string, keyof typeof PRICING_BY_CURRENCY> = {
    'de': 'EUR',
    'de-AT': 'EUR',
    'de-CH': 'CHF',
    'nl': 'EUR',
    'fr': 'EUR',
    'en-GB': 'GBP',
    'en-US': 'USD',
  };

  const currency = currencyMap[locale] || 'EUR';
  return PRICING_BY_CURRENCY[currency];
}
```

---

### Lokalisierte Pricing-Überlegungen

#### **1. Purchase Power Parity (PPP)**

**Konzept:** Preise an lokale Kaufkraft anpassen

**Beispiel:**
- Deutschland: €29.90 (Basis)
- UK: £24.90 (nicht £26.50 bei 1:1 Konvertierung)
  - Grund: Niedrigere Kaufkraft-Parität
- Schweiz: CHF 29.90 (gleicher numerischer Wert, obwohl CHF > EUR)
  - Grund: Höhere Kaufkraft, Premiummarkt

**Tools für PPP-Analyse:**
- World Bank PPP-Daten
- Competitor Pricing in lokalem Markt

---

#### **2. Psychologische Preisgestaltung**

**Best Practices:**
- ✅ €29.90 performt besser als €30.00
- ✅ €49.90 performt besser als €50.00
- ✅ Behalte .90-Endungen über alle Währungen

**Schlechte Beispiele:**
- ❌ CHF 32.67 (automatische Konvertierung von €29.90)
- ❌ £26.53 (automatische Konvertierung)

**Gute Beispiele:**
- ✅ CHF 29.90 (sauberer Preis)
- ✅ £24.90 (sauberer Preis + PPP-angepasst)

---

#### **3. Competitor-Analyse pro Markt**

**Prozess:**
1. Recherchiere lokale Wettbewerber (z.B. Pferdegutachter in AT/CH/NL)
2. Analysiere deren Pricing
3. Positioniere PferdeWert entsprechend:
   - Premium: 20-30% über Markt
   - Standard: Auf Marktniveau
   - Budget: 20-30% unter Markt

**Beispiel-Strategie:**
- Deutschland: €29.90 (etabliert)
- Österreich: €29.90 (gleiche Wirtschaft, DACH-Einheit)
- Schweiz: CHF 29.90 (gleicher numerischer Wert, aber höherer realer Wert = wahrgenommenes "Schnäppchen" in Premiummarkt)
- Niederlande: €27.90 (leicht günstiger für Markt-Penetration)

---

### 4.2 Payment Methods by Region

#### **Critical Requirements**

| Land | Must-Have Payment Methods | Marktanteil | Konsequenz wenn fehlend |
|------|---------------------------|-------------|--------------------------|
| **Niederlande** 🇳🇱 | **iDEAL** | 70% E-Commerce | ❌ 70% Conversion-Verlust |
| Österreich 🇦🇹 | EPS, Sofort | 40%+ | ⚠️ Reduzierte Conversions |
| Schweiz 🇨🇭 | Twint, PostFinance | 50%+ | ⚠️ Reduzierte Conversions |
| Belgien 🇧🇪 | Bancontact | 60%+ | ⚠️ Reduzierte Conversions |
| Deutschland 🇩🇪 | Kreditkarte, Sofort, PayPal | Standard | ✅ Bereits implementiert |

**KRITISCH:** iDEAL für Niederlande ist non-negotiable (70% Marktanteil!)

---

#### **Stripe Integration**

**Checkout Session mit lokalisierten Payment Methods:**

```typescript
// pages/api/create-checkout-session.ts
import Stripe from 'stripe';
import { getPricingForLocale } from '@/lib/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  const { locale, tier } = req.body; // 'de', 'de-AT', 'nl', etc.

  const pricing = getPricingForLocale(locale);
  const amount = tier === 'premium' ? pricing.premium : pricing.basic;

  // Payment methods based on locale
  const paymentMethods = getPaymentMethodsForLocale(locale);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: paymentMethods,
    locale: getStripeLocale(locale), // 'de', 'nl', 'fr', etc.
    currency: pricing.currency.toLowerCase(),
    line_items: [{
      price_data: {
        currency: pricing.currency.toLowerCase(),
        product_data: {
          name: 'Pferdewert Bewertung',
          description: tier === 'premium' ? 'Premium mit Expertenanalyse' : 'Basis-Bewertung',
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/preise`,
  });

  res.status(200).json({ sessionId: session.id });
}

function getPaymentMethodsForLocale(locale: string): string[] {
  const methods: Record<string, string[]> = {
    'de': ['card', 'sofort', 'paypal'],
    'de-AT': ['card', 'eps', 'sofort', 'paypal'],
    'de-CH': ['card', 'twint'], // Twint via Stripe (if supported)
    'nl': ['card', 'ideal', 'paypal'], // iDEAL is CRITICAL
    'fr': ['card', 'paypal'],
    'en-GB': ['card', 'paypal'],
  };

  return methods[locale] || ['card'];
}

function getStripeLocale(locale: string): string {
  const map: Record<string, string> = {
    'de': 'de',
    'de-AT': 'de',
    'de-CH': 'de',
    'nl': 'nl',
    'fr': 'fr',
    'en-GB': 'en-GB',
    'en-US': 'en',
  };
  return map[locale] || 'de';
}
```

---

#### **Payment Method Availability**

**Stripe Dashboard Setup:**
1. Go to Stripe Dashboard → Settings → Payment Methods
2. Enable per country:
   - **Netherlands:** iDEAL (KRITISCH!)
   - **Austria:** EPS, Sofort
   - **Switzerland:** Check Twint support (via Stripe Partners)
   - **Belgium:** Bancontact

**Alternative für Twint (Schweiz):**
- Stripe hat limitierten Twint-Support
- Erwäge PostFinance Card stattdessen (breiter unterstützt)
- Oder Partnership mit lokalem Payment Provider (Datatrans, SIX Payment Services)

---

### 4.3 Currency Settlement Strategy

#### **Option 1: Single EUR Settlement (Empfohlen für Start)**

**Ansatz:** Alle Transaktionen in EUR settlen, Stripe handhabt Konvertierungen

**Vorteile:**
- ✅ Einfachstes Setup
- ✅ Single Stripe Account
- ✅ Keine Multi-Currency-Komplexität

**Nachteile:**
- ❌ Höhere Gebühren für CHF-Transaktionen (Konvertierung CHF → EUR)
- ❌ Wechselkurs-Risiko

**Gebühren-Beispiel:**
- CHF-Transaktion → EUR Settlement: +1% Konvertierungsgebühr
- Für CHF 29.90 Zahlung: €0.30 zusätzliche Gebühr

---

#### **Option 2: Multi-Currency Settlement (Skalierungs-Phase)**

**Ansatz:** Separate Stripe Connected Accounts für CHF, GBP, USD

**Vorteile:**
- ✅ Reduzierte Konvertierungsgebühren
- ✅ CHF-Zahlungen bleiben in CHF
- ✅ Bessere Finanz-Transparenz

**Nachteile:**
- ❌ Höherer Management-Overhead
- ❌ Separate Banking-Konten erforderlich (CHF-Konto in Schweiz)
- ❌ Komplexere Buchhaltung

**Empfehlung:**
- **Phase 1-3:** Single EUR Settlement
- **Phase 4+:** Multi-Currency für Schweiz (wenn CHF-Volumen >€10k/Monat)

**Schwellenwert-Analyse:**

```
Break-Even für separates CHF-Konto:

Kosten CHF-Konto: €500/Jahr (Setup) + €20/Monat (Maintenance) = €740/Jahr
Einsparung: 1% auf CHF-Transaktionen

Break-Even: €740 / 0.01 = €74.000 CHF-Transaktionsvolumen/Jahr
≈ €6.200/Monat
≈ 207 CHF 29.90-Transaktionen/Monat

Fazit: Lohnt sich ab ~200 Schweizer Transaktionen/Monat
```

---

# 5. Domain & SEO-Strategie

## 5.1 Subdirectories vs ccTLDs - Detaillierter Vergleich

### Comparison Matrix

| Faktor | Subdirectories (/at/) | ccTLDs (.at) | Subdomains (at.pferdewert.de) |
|--------|----------------------|--------------|-------------------------------|
| **SEO-Geschwindigkeit** | ⭐⭐⭐⭐⭐ Schnell (erbt Authority) | ⭐⭐ Langsam (baut von Grund auf) | ⭐ Sehr langsam (als neue Site behandelt) |
| **Domain Authority** | ✅ Geteilt | ❌ Separat pro Domain | ❌ Separat pro Subdomain |
| **Kosten** | €10-20/Jahr | €60-105k/Jahr pro Markt | €10-20/Jahr |
| **Lokales Vertrauen** | ⭐⭐⭐ Gut | ⭐⭐⭐⭐⭐ Exzellent | ⭐⭐ Niedrig |
| **Management-Komplexität** | ⭐⭐⭐⭐⭐ Einfach | ⭐⭐ Komplex | ⭐⭐⭐ Moderat |
| **Link Building** | ✅ Single Kampagne | ❌ Separat pro Domain | ❌ Separat pro Subdomain |
| **Best For** | Die meisten Businesses | Große Budgets, reife Märkte | ❌ Nicht empfohlen für SEO |
| **Hreflang** | ✅ Einfach | ✅ Einfach | ⚠️ Komplex |
| **Technical Setup** | ⭐⭐⭐⭐⭐ Single Next.js App | ⭐⭐⭐ Separate Deployments oder Multi-Domain Setup | ⭐⭐⭐ Subdomain Routing |

---

### 5.2 Kosten-Nutzen-Analyse

#### **Subdirectory-Ansatz**

**Jährliche Kosten:**
```
Domain (pferdewert.de): €15/Jahr
Hosting (Vercel): €0 (in aktuellem Plan)
SEO/Link Building: €10-20k/Jahr (SINGLE Kampagne für alle Märkte)
---
TOTAL: €10-20k/Jahr
```

**Vorteile:**
- Alle Märkte profitieren von gemeinsamen Backlinks
- Content auf /at/ stärkt auch /de/ und /ch/
- Schnelleres Ranking (erbt bestehende Authority)

---

#### **ccTLD-Ansatz (Pro Markt)**

**Jährliche Kosten pro ccTLD:**
```
Domain Registration:
- pferdewert.at: €20/Jahr
- pferdewert.ch: €15/Jahr
- pferdewert.nl: €10/Jahr

SEO & Link Building:
- Link Building Kampagne: €20-40k/Jahr
- Content Marketing: €10-20k/Jahr
- Local SEO Optimization: €5-10k/Jahr

Technical:
- Separate Hosting (wenn needed): €0-500/Jahr
- Domain Management: €200/Jahr

---
TOTAL PRO ccTLD: €60-105k/Jahr
```

**Für 3 Märkte (AT/CH/NL):** €180-315k/Jahr

---

#### **ROI-Break-Even-Analyse**

**Annahmen:**
- Durchschnittlicher Transaktionswert: €29.90
- Profit Margin: 70% (€20.93 pro Transaktion)
- SEO-Traffic-Lift durch ccTLD: +30% vs Subdirectory

**Break-Even-Berechnung:**

```
Zusätzliche Kosten ccTLD vs Subdirectory: €60k/Jahr
Profit pro Transaktion: €20.93

Zusätzliche Transaktionen benötigt: €60.000 / €20.93 = 2.866/Jahr
= 239 zusätzliche Transaktionen/Monat

Bei +30% Traffic-Lift benötigt:
Basis-Traffic für Break-Even: 239 / 0.30 = 797 Transaktionen/Monat

Fazit: ccTLD lohnt sich ab ~800 Transaktionen/Monat pro Markt
```

**Empfehlung:**
- **Österreich:** Migriere zu .at wenn >800 Transaktionen/Monat
- **Schweiz:** Migriere zu .ch wenn >600 Transaktionen/Monat (höheres lokales Vertrauen wichtig)
- **Niederlande:** Bleibe bei /nl/ länger (weniger .nl-Präferenz als .ch)

---

### 5.3 Hreflang-Implementierung

#### **Was ist Hreflang?**

HTML-Tags die Google mitteilen, welche Sprach-/Länder-Versionen deiner Seite existieren.

**Wichtig für:**
- ✅ Vermeidung von Duplicate Content Penalties
- ✅ Korrekte Sprach-Version in Suchergebnissen zeigen
- ✅ Internationale SEO-Signale

---

#### **Implementierung**

**Statische Implementierung (in `<head>`):**

```typescript
// components/SEOHead.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title: string;
  description: string;
}

export default function SEOHead({ title, description }: SEOHeadProps) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pferdewert.de';

  // Get current path without locale prefix
  const pathWithoutLocale = router.asPath.replace(/^\/(de|at|ch|nl|fr)/, '');

  const hreflangs = [
    { locale: 'de', url: `${baseUrl}${pathWithoutLocale}` },
    { locale: 'de-AT', url: `${baseUrl}/at${pathWithoutLocale}` },
    { locale: 'de-CH', url: `${baseUrl}/ch${pathWithoutLocale}` },
    { locale: 'nl-NL', url: `${baseUrl}/nl${pathWithoutLocale}` },
    { locale: 'fr-FR', url: `${baseUrl}/fr${pathWithoutLocale}` },
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}${router.asPath}`} />

      {/* Hreflang Tags */}
      {hreflangs.map(({ locale, url }) => (
        <link key={locale} rel="alternate" hreflang={locale} href={url} />
      ))}

      {/* x-default for undefined locales */}
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${pathWithoutLocale}`} />
    </Head>
  );
}
```

---

**Dynamische Implementierung (Sitemap.xml):**

```typescript
// pages/sitemap.xml.ts
import { GetServerSideProps } from 'next';

const LOCALES = ['de', 'de-AT', 'de-CH', 'nl', 'fr'];
const BASE_URL = 'https://pferdewert.de';

function generateSiteMap(pages: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages
    .map((page) => {
      const defaultUrl = `${BASE_URL}${page}`;

      return `
    <url>
      <loc>${defaultUrl}</loc>
      ${LOCALES.map((locale) => {
        const localePath = locale === 'de' ? page : `/${locale}${page}`;
        return `<xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}${localePath}" />`;
      }).join('')}
      <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
    </url>`;
    })
    .join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = ['/', '/bewertung', '/preise', '/ratgeber']; // Add all pages

  const sitemap = generateSiteMap(pages);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  // getServerSideProps will handle this
}
```

---

### 5.4 Link-Building-Strategie pro Markt

#### **Phase 1: Subdirectory-Vorteil nutzen**

**Strategie:** Single Link-Building-Kampagne, alle Märkte profitieren

**Taktiken:**
1. **DACH-weite PR:**
   - Presse-Releases an DE/AT/CH Reitsport-Medien
   - Ein Backlink von großem Reitsport-Portal (z.B. ehorses.de) = Benefit für alle Märkte

2. **Content-Partnerschaften:**
   - Gastbeiträge in Reitsport-Blogs
   - Kooperationen mit Pferdezucht-Verbänden

3. **Business Directories:**
   - Eintragungen in Reitsport-Verzeichnisse
   - Google My Business (pro Land, aber verlinkt zu Subdirectory)

**Budget:** €10-20k/Jahr für alle Märkte zusammen

---

#### **Phase 2: ccTLD-spezifisches Link Building**

**Strategie:** Separate Kampagnen pro ccTLD (wenn migriert)

**Taktiken pro Land:**

**Österreich (.at):**
- Österreichische Pferdezucht-Verbände
- Lokale Reitsport-Events sponsern
- Gastbeiträge in .at-Domains

**Schweiz (.ch):**
- ZVCH (Zuchtverband CH Sportpferde) Partnership
- Schweizer Reitsport-Zeitschriften
- .ch-spezifische Business Directories

**Niederlande (.nl):**
- KWPN-Verband Kooperation
- Niederländische Auktionshäuser
- .nl-Reitsport-Communities

**Budget:** €20-50k/Jahr pro ccTLD

---

# 6. Rollout-Roadmap

## Phase 1: Österreich (Q1 2026) - PRIORITÄT

### Warum Österreich zuerst?

✅ **Niedrigstes Risiko:**
- Gleiche Sprache (Deutsche mit minimalen Varianten)
- Gleiches Klassifikationssystem (A/L/M/S, nur E-Level fehlt)
- Gleiche Datenquelle (ehorses.at = Teil von ehorses-Netzwerk)

✅ **Schnellste Time-to-Market:**
- Minimaler Translation-Aufwand (nur österreichische Varianten: Paradeiser, Erdapfel, Jänner)
- Keine neuen Klassifikationen zu lernen
- KI-Modell funktioniert out-of-the-box

✅ **Geringste Kosten:**
- €11.500 Gesamt-Investment (niedrigstes aller Märkte)

---

### Deliverables

| Task | Details | Timeline | Kosten |
|------|---------|----------|--------|
| **next-intl Setup** | Middleware, `/messages/de-AT/` erstellen | Woche 1-2 | €2.000 (Dev) |
| **Austrian German Translations** | common.json, evaluation.json mit Overrides (Paradeiser, Erdapfel, Jänner) | Woche 2-3 | €500 (Translation) |
| **Subdirectory Routing** | `pferdewert.de/at/` URLs | Woche 2 | Inkl. in Dev |
| **Hreflang Tags** | SEO-Implementation | Woche 3 | Inkl. in Dev |
| **Payment Methods** | EPS + Sofort Integration | Woche 3-4 | €500 (Stripe Config) |
| **Legal Review** | DSGVO-Compliance Check für AT Scraping | Woche 4 | €1.500 (Lawyer) |
| **Sitemap Update** | AT-Seiten hinzufügen | Woche 4 | Inkl. in Dev |
| **Launch Campaign** | AT-spezifisches Marketing (Google Ads AT, Facebook AT) | Woche 5-8 | €5.000 (Ads) |
| **Testing** | QA, A/B-Tests | Durchgehend | €1.000 (QA) |

**Total:** €11.500
**Timeline:** 8 Wochen (Q1 2026: Jan-Feb)

---

### Success Metrics (Q4 2026)

**Ziel nach 9 Monaten:**
- 100 Evaluierungen/Monat aus Österreich
- Durchschnittlicher Transaktionswert: €29.90
- Conversion Rate: 2-3% (von AT-Traffic)
- AT-Traffic: 3.000-5.000 Sessions/Monat

**ROI-Kalkulation:**
```
100 Evaluierungen/Monat × €20.93 Profit = €2.093/Monat
× 9 Monate (April-Dez 2026) = €18.837 Profit

Investment: €11.500
ROI: (€18.837 - €11.500) / €11.500 = 64% ROI im ersten Jahr
```

---

## Phase 2: Schweiz (Q2-Q3 2026)

### Warum Schweiz als zweites?

✅ **DACH-Synergie:**
- Deutsche Schriftsprache (Schweizerdeutsch nur gesprochen)
- Ähnliches Klassifikationssystem (A/L/M/S)
- Geografisch/kulturell nah

✅ **Premiummarkt:**
- Höchste Importpreise pro Tonne ($7.816)
- Hohe Kaufkraft = höhere Zahlungsbereitschaft

⚠️ **Herausforderungen:**
- Schweizer präferieren .ch-Domains (höheres Vertrauen)
- Kleinerer Markt, fragmentierte Plattformen

---

### Deliverables

| Task | Details | Timeline | Kosten |
|------|---------|----------|--------|
| **Swiss German Translations** | `/messages/de-CH/` mit ss statt ß | Woche 1-2 | €1.500 |
| **Subdirectory** | `pferdewert.de/ch/` | Woche 1 | €500 (Dev) |
| **CHF Pricing** | Stripe CHF-Konfiguration, manuelle Preise | Woche 2 | €500 |
| **Payment Methods** | Twint/PostFinance (falls Stripe-Support), sonst Karte | Woche 3 | €1.000 (Integration) |
| **Multi-Source Scraping** | swisshorse.ch, tier-inserate.ch, ehorses.ch | Woche 3-5 | €2.000 (Dev) |
| **Launch Campaign** | CH-spezifisches Marketing | Woche 6-10 | €5.000 |

**Total:** €10.000
**Timeline:** 10 Wochen (Q2-Q3 2026: April-Juni)

---

### Success Metrics (Q4 2026)

**Ziel nach 6 Monaten:**
- 50 Evaluierungen/Monat aus Schweiz
- Durchschnittlicher Transaktionswert: CHF 29.90 (≈€29.90)
- Conversion Rate: 2-3%

**ROI-Kalkulation:**
```
50 Evaluierungen/Monat × €20.93 Profit = €1.046/Monat
× 6 Monate (Juli-Dez 2026) = €6.280 Profit

Investment: €10.000
ROI: (€6.280 - €10.000) / €10.000 = -37% (Verlust im ersten Jahr)

Break-Even: Monat 10 (Q2 2027)
```

**Entscheidungspunkt Q4 2026:**
- Wenn CH >50 Evaluierungen/Monat: Weiter investieren, erwäge .ch ccTLD
- Wenn CH <30 Evaluierungen/Monat: Pausiere CH-Marketing, fokussiere auf AT/NL

---

## Phase 3: Niederlande (Q4 2026 - Q1 2027)

### Warum Niederlande als drittes?

✅ **Großer Markt:**
- Major Sport Horse Breeding Hub (KWPN globaler Leader)
- Hohe Online-Kaufbereitschaft (93% E-Commerce-Rate)

✅ **Exzellente Daten:**
- PaardPlaats, Dutch Horse Trading (transparente Auktionspreise)

⚠️ **Herausforderungen:**
- Niederländische Sprache = vollständige Übersetzung erforderlich
- KWPN-Klassifikation ≠ E/A/L/M/S (Mapping erforderlich)
- iDEAL Payment Integration KRITISCH (70% Marktanteil)

---

### Deliverables

| Task | Details | Timeline | Kosten |
|------|---------|----------|--------|
| **Dutch Translation** | Vollständige `/messages/nl/` für alle Seiten | Woche 1-4 | €5.000 (Professional Translation) |
| **KWPN Classification Mapping** | KWPN → E/A/L/M/S Mapping-Logik | Woche 2-3 | €1.500 (Dev) |
| **iDEAL Integration** | Stripe iDEAL (KRITISCH für Conversions) | Woche 4 | €1.500 (Dev + Testing) |
| **Dutch Data Sources** | PaardPlaats, Dutch Horse Trading Scraping | Woche 4-6 | €2.500 (Dev) |
| **Subdirectory** | `pferdewert.de/nl/` | Woche 1 | Inkl. in Dev |
| **Launch Campaign** | NL-spezifisches Marketing (Google Ads NL, Facebook NL) | Woche 7-12 | €7.500 |

**Total:** €16.000
**Timeline:** 12 Wochen (Q4 2026 - Q1 2027: Okt-Dez)

---

### Success Metrics (Q2 2027)

**Ziel nach 6 Monaten:**
- 75 Evaluierungen/Monat aus Niederlande
- Durchschnittlicher Transaktionswert: €27.90 (leicht günstiger für Markt-Penetration)
- Conversion Rate: 3-4% (iDEAL-Boost)

**ROI-Kalkulation:**
```
75 Evaluierungen/Monat × €19.53 Profit (bei €27.90 Preis) = €1.465/Monat
× 6 Monate (Jan-Juni 2027) = €8.788 Profit

Investment: €16.000
ROI: (€8.788 - €16.000) / €16.000 = -45% (Verlust im ersten Jahr)

Break-Even: Monat 11 (Q4 2027)
```

**Entscheidungspunkt Q2 2027:**
- Wenn NL >100 Evaluierungen/Monat: Stark investieren (großes Marktpotenzial)
- Wenn NL 50-100 Evaluierungen/Monat: Weiter testen
- Wenn NL <50 Evaluierungen/Monat: Pausiere, analysiere warum (Pricing? Marketing? Product-Market-Fit?)

---

## Phase 4: Skalierung & Evaluierung (Q2 2027+)

### Entscheidungspunkte

#### **ccTLD-Migration (Pro Markt)**

**Kriterien für ccTLD-Migration:**

| Land | Schwellenwert (Evaluierungen/Monat) | Begründung | ccTLD | Investment |
|------|--------------------------------------|------------|-------|------------|
| **Österreich** | >200/Monat | ROI positiv, .at erhöht Vertrauen | pferdewert.at | €60-80k/Jahr |
| **Schweiz** | >150/Monat | .ch KRITISCH für CH-Vertrauen (höher als andere Länder) | pferdewert.ch | €70-100k/Jahr |
| **Niederlande** | >250/Monat | .nl weniger kritisch, Subdirectory OK länger | pferdewert.nl | €60-80k/Jahr (optional) |

**ccTLD-Migrations-Prozess (Siehe Sektion 5.3 für Details):**
1. Registriere ccTLD
2. Initial 301 Redirect: ccTLD → Subdirectory
3. Build Content auf Subdirectory (6-12 Monate)
4. Reverse Redirect: Subdirectory → ccTLD
5. Dedizierte Link-Building-Kampagne

---

#### **Weitere Märkte erwägen**

**Priorisierung (Nach Phase 1-3 Erfolg):**

1. **Frankreich** (wenn AT/CH/NL >150 Evaluierungen/Monat avg.)
   - Riesiger Markt (€14B Sektor)
   - Französische Übersetzung + FFE Galop-System
   - Investment: €20-25k (höher wegen vollständiger Lokalisierung)
   - Timeline: Q3-Q4 2027

2. **UK** (wenn FR erfolgreich)
   - Großer Markt (£8B)
   - Brexit-Komplexität beachten
   - Investment: €18-22k
   - Timeline: Q1-Q2 2028

3. **Belgien** (niedriger Priorität wegen Zweisprachigkeit)
   - Investment: €25-30k (NL + FR Übersetzungen)
   - Timeline: Q3 2028+

4. **USA** (Langfristig, >2028)
   - Massiver Markt aber andere Wettbewerbslandschaft
   - Investment: €50-100k (großer Markt-Entry)
   - Timeline: 2029+

---

### Gesamt-Investment-Übersicht

| Phase | Markt | Timeline | Investment | Kumulative Summe |
|-------|-------|----------|------------|------------------|
| **Phase 1** | Österreich | Q1 2026 | €11.500 | €11.500 |
| **Phase 2** | Schweiz | Q2-Q3 2026 | €10.000 | €21.500 |
| **Phase 3** | Niederlande | Q4 2026 - Q1 2027 | €16.000 | €37.500 |
| **Phase 4a** | AT ccTLD Migration | Q2 2027 (wenn >200/mo) | €60-80k | €97.500-117.500 |
| **Phase 4b** | CH ccTLD Migration | Q3 2027 (wenn >150/mo) | €70-100k | €167.500-217.500 |
| **Phase 4c** | Frankreich Expansion | Q3-Q4 2027 (wenn Phasen 1-3 erfolgreich) | €20-25k | €187.500-242.500 |

**Minimum Viable Expansion (Phasen 1-3):** €37.500
**Full Expansion mit ccTLDs (bis Ende 2027):** €167.500-217.500

---

# 7. KPIs & Success Metrics

## 7.1 Traffic Metrics (Pro Markt)

### Primäre KPIs

| Metrik | Definition | Ziel (Nach 6 Monaten) | Tracking-Tool |
|--------|------------|----------------------|---------------|
| **Organic Sessions** | Organischer Traffic aus lokalem Google | AT: 3.000/mo, CH: 1.500/mo, NL: 4.000/mo | Google Analytics 4 |
| **Bounce Rate** | % Nutzer die nach 1 Seite abspringen | <50% (gut), <40% (exzellent) | GA4 |
| **Avg. Session Duration** | Durchschnittliche Zeit auf Site | >2:00 Minuten | GA4 |
| **Pages per Session** | Durchschnittliche Seiten pro Besuch | >2.5 Seiten | GA4 |

**Segmentierung in GA4:**
```
Create Segments:
- Country = Austria (AT Traffic)
- Country = Switzerland (CH Traffic)
- Country = Netherlands (NL Traffic)

Dashboard: "International Performance"
- Segment Comparison: AT vs CH vs NL vs DE
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Direct Traffic** | Nutzer die URL direkt eingeben | >10% (Brand Awareness) | GA4 |
| **Referral Traffic** | Von anderen Sites (Backlinks) | >15% | GA4 |
| **Social Traffic** | Von Social Media | >5% | GA4 |
| **Mobile vs Desktop** | Device-Verteilung | 60% Mobile / 40% Desktop | GA4 |

---

## 7.2 Conversion Metrics

### Primäre KPIs

| Metrik | Definition | Ziel (Nach 6 Monaten) | Tracking |
|--------|------------|----------------------|----------|
| **Evaluations Completed** | Anzahl abgeschlossene Bewertungen | AT: 100/mo, CH: 50/mo, NL: 75/mo | MongoDB + GA4 Goals |
| **Conversion Rate** | % von Traffic → Evaluation | 2-3% | GA4 Funnel |
| **Payment Success Rate** | % erfolgreiche Zahlungen | >95% | Stripe Dashboard |
| **Cart Abandonment Rate** | % Start Checkout aber nicht abgeschlossen | <30% | GA4 E-Commerce |

**GA4 Goal Setup:**
```javascript
// Google Tag Manager Event
gtag('event', 'purchase', {
  transaction_id: evaluationId,
  value: 29.90,
  currency: 'EUR',
  country: 'AT', // or 'CH', 'NL'
  tier: 'basic', // or 'premium'
});
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Lead Form Submissions** | Newsletter/Contact Form | >50/Monat pro Markt | GA4 Events |
| **Ratgeber Engagement** | Zeit auf Ratgeber-Artikeln | >3:00 Minuten | GA4 |
| **CTA Click Rate** | % Klicks auf "Jetzt bewerten" | >5% | GA4 Events |

---

## 7.3 Revenue Metrics

### Primäre KPIs

| Metrik | Definition | Ziel (Nach 6 Monaten) | Berechnung |
|--------|------------|----------------------|------------|
| **MRR** (Monthly Recurring Revenue) | Monatlicher Umsatz pro Markt | AT: €2.990, CH: €1.495, NL: €2.093 | Sum(Transactions) × Avg Price |
| **ARPU** (Average Revenue Per User) | Durchschnittlicher Umsatz pro Nutzer | €29.90 (oder höher bei Premium-Uptake) | Total Revenue / Total Users |
| **Customer Acquisition Cost (CAC)** | Kosten um einen Kunden zu gewinnen | <€15 (für 50% Profit Margin) | Marketing Spend / New Customers |
| **LTV:CAC Ratio** | Lifetime Value vs Acquisition Cost | >2:1 (gut), >3:1 (exzellent) | LTV / CAC |

**CAC-Berechnung:**
```
Beispiel Österreich Q2 2026:
Marketing Spend: €5.000 (Launch Campaign)
New Customers: 400 (über 3 Monate)
CAC = €5.000 / 400 = €12.50

LTV (Assuming 1.2 transactions per customer over 12 months):
LTV = €29.90 × 1.2 = €35.88

LTV:CAC = €35.88 / €12.50 = 2.87:1 ✅ (Gesund)
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Berechnung |
|--------|------------|------|------------|
| **Premium Uptake Rate** | % Nutzer die Premium wählen | >20% | Premium Sales / Total Sales |
| **Refund Rate** | % Rückerstattungen | <5% | Refunds / Total Transactions |
| **Payment Method Distribution** | Verteilung nach Zahlungsmethode | iDEAL >50% in NL | Stripe Reporting |

---

## 7.4 User Behavior Metrics

### Primäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Language Preference Accuracy** | % Nutzer die korrekte Sprache sehen | >95% | Custom GA4 Event |
| **Form Completion Rate** | % die Bewertungsformular abschließen | >60% | GA4 Funnel (Step-by-Step) |
| **Error Rate** | % Nutzer die Fehler sehen | <2% | Sentry + GA4 |

**Form Funnel Tracking:**
```
Step 1: Formular gestartet (100%)
Step 2: Pferdedaten eingegeben (80%)
Step 3: Ausbildungsstand angegeben (70%)
Step 4: Fotos hochgeladen (60%)
Step 5: Formular abgeschickt (60%)

Drop-off Analysis: Wo verlieren wir Nutzer?
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Locale Switcher Usage** | % Nutzer die Sprache manuell ändern | <5% (Auto-Detection gut) | GA4 Event |
| **Mobile Form Completion** | % Mobile-Nutzer die Formular abschließen | >50% (Mobile-First wichtig) | GA4 Device Segment |
| **Page Load Time (per Locale)** | Core Web Vitals | LCP <2.5s, FID <100ms, CLS <0.1 | Google Search Console |

---

## 7.5 SEO Metrics

### Primäre KPIs

| Metrik | Definition | Ziel (Nach 6 Monaten) | Tracking |
|--------|------------|----------------------|----------|
| **Keyword Rankings** | Positionen für Ziel-Keywords | Top 10 für 5+ Keywords pro Markt | Ahrefs / Semrush |
| **Organic Traffic Growth** | MoM Wachstum | +20% MoM | GA4 |
| **Backlink Profile** | Anzahl/Qualität Backlinks | 20+ Backlinks pro Markt | Ahrefs |
| **Domain Authority (DA)** | Moz DA Score | AT/CH/NL profitieren von DE DA (wenn Subdirectories) | Moz |

**Ziel-Keywords (Beispiel Österreich):**
```
Primary:
- "Pferd bewerten Österreich" (Volume: 50/mo, Difficulty: Low)
- "Pferdewert schätzen AT" (Volume: 30/mo, Difficulty: Low)
- "Was ist mein Pferd wert" (Volume: 200/mo, Difficulty: Medium)

Secondary:
- "Pferdegutachten Österreich" (Volume: 20/mo, Difficulty: Low)
- "Pferdebewertung online" (Volume: 100/mo, Difficulty: Medium)
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Hreflang Errors** | Fehler in Hreflang-Implementierung | 0 Errors | Google Search Console |
| **Index Coverage** | % Seiten im Google Index | >95% | Google Search Console |
| **Click-Through Rate (CTR)** | % Klicks von Impressions | >3% (avg), >5% (gut) | Google Search Console |
| **Referring Domains** | Anzahl eindeutiger Domains mit Backlinks | 15+ pro Markt | Ahrefs |

---

## 7.6 Technical KPIs

### Primäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **i18n Coverage** | % übersetzter Strings pro Locale | 100% für Launch-Locales | Custom Script (JSON Validation) |
| **Build Time** | Zeit für Static Generation | <5 Minuten (auch mit allen Locales) | Vercel Analytics |
| **Core Web Vitals** | LCP, FID, CLS pro Locale | LCP <2.5s, FID <100ms, CLS <0.1 | Google Search Console + Vercel Analytics |
| **API Error Rate** | % API-Requests mit Errors | <1% | Backend Logging (FastAPI) |

**i18n Coverage Script:**
```typescript
// scripts/check-i18n-coverage.ts
import fs from 'fs';
import path from 'path';

const REQUIRED_LOCALES = ['de', 'de-AT', 'de-CH', 'nl'];
const NAMESPACES = ['common', 'evaluation', 'pricing', 'home'];

function checkCoverage() {
  const baseMessages = JSON.parse(
    fs.readFileSync('messages/de/common.json', 'utf-8')
  );
  const baseKeys = Object.keys(baseMessages);

  REQUIRED_LOCALES.forEach(locale => {
    NAMESPACES.forEach(namespace => {
      const filePath = `messages/${locale}/${namespace}.json`;
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing: ${filePath}`);
        return;
      }

      const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const coverage = Object.keys(messages).length / baseKeys.length;

      if (coverage < 1.0) {
        console.warn(`⚠️  ${locale}/${namespace}: ${(coverage * 100).toFixed(0)}% coverage`);
      } else {
        console.log(`✅ ${locale}/${namespace}: 100% coverage`);
      }
    });
  });
}

checkCoverage();
```

---

### Sekundäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Translation Completeness** | % Missing Translation Keys | 0% | Custom Script |
| **Lighthouse Score** | Performance/Accessibility/SEO | >90 für alle | Lighthouse CI |
| **Error Tracking** | Frontend/Backend Errors | <10 errors/day | Sentry |
| **Uptime** | % Zeit Site verfügbar | >99.9% | Vercel Status |

---

## 7.7 Competition Metrics

### Primäre KPIs

| Metrik | Definition | Ziel | Tracking |
|--------|------------|------|----------|
| **Competitor Keyword Overlap** | % Keywords wo Wettbewerber ranken | Identifiziere Top 5 Wettbewerber pro Markt | Ahrefs / Semrush |
| **Competitor Backlink Gap** | Backlinks die Wettbewerber haben, wir nicht | Acquire 20% ihrer Backlinks | Ahrefs |
| **Share of Voice** | % Sichtbarkeit vs Wettbewerber | >10% (Start), >25% (Nach 12 Monaten) | Semrush |

**Wettbewerber-Identifikation (Beispiel Österreich):**
```
1. Google Suche: "Pferd bewerten Österreich"
2. Top 5 organische Ergebnisse = Wettbewerber
3. Ahrefs: Analyze ihre Backlinks, Keywords, Content-Strategie
4. Erstelle Gap-Analyse: Was machen sie besser? Wo können wir überholen?
```

---

## 7.8 Dashboard-Setup

### Empfohlene Dashboards

#### **1. Executive Dashboard (wöchentlich)**

**Tool:** Google Data Studio / Looker Studio

**Metriken:**
- MRR pro Markt (Line Chart, Zeit-Serie)
- Evaluations Completed pro Markt (Bar Chart)
- Traffic Overview (AT/CH/NL vs DE) (Stacked Area Chart)
- Conversion Rate Trend (Line Chart)
- CAC & LTV:CAC Ratio (Gauge Charts)

**Filter:**
- Date Range Selector
- Country Selector (AT/CH/NL/DE)

---

#### **2. SEO Dashboard (täglich)**

**Tool:** Ahrefs + Google Search Console

**Metriken:**
- Keyword Rankings (Top 20 Keywords pro Markt)
- Organic Traffic (Daily Trend)
- Backlink Growth (Cumulative Chart)
- Hreflang Errors (Alert if >0)
- Index Coverage (% Indexed Seiten)

---

#### **3. Technical Health Dashboard (täglich)**

**Tool:** Vercel Analytics + Sentry

**Metriken:**
- Core Web Vitals (LCP/FID/CLS pro Locale)
- Build Time Trend
- Error Rate (Frontend + Backend)
- API Response Time (p50, p95, p99)
- Uptime (99.9%+ target)

---

#### **4. User Behavior Dashboard (wöchentlich)**

**Tool:** Google Analytics 4

**Metriken:**
- Form Funnel (Step-by-Step Drop-off)
- Device Distribution (Mobile vs Desktop)
- Language Preference Accuracy
- Payment Method Distribution
- Locale Switcher Usage

---

## 7.9 Alerting & Thresholds

### Critical Alerts (Immediate Action)

| Alert | Threshold | Action |
|-------|-----------|--------|
| **Site Down** | Uptime <99% für >5 Minuten | Pagerduty → On-Call Engineer |
| **Payment Failure Spike** | >10% Payment Failure Rate | Check Stripe Dashboard, notify team |
| **API Error Spike** | >5% Error Rate | Check Sentry, investigate backend |
| **Hreflang Errors** | >0 Errors in GSC | Fix immediately (SEO impact) |

---

### Warning Alerts (24h Response)

| Alert | Threshold | Action |
|-------|-----------|--------|
| **Traffic Drop** | >30% drop MoM | Check GSC for manual actions, analyze competitors |
| **Conversion Rate Drop** | >20% drop WoW | A/B test changes, check UX issues |
| **Build Time Increase** | >10 minutes | Optimize Static Generation, review locales |
| **Core Web Vitals Degradation** | LCP >3s oder CLS >0.25 | Performance audit, optimize images/JS |

---

### Info Alerts (Weekly Review)

| Alert | Threshold | Action |
|-------|-----------|--------|
| **Low i18n Coverage** | <95% Translation Completeness | Schedule translation work |
| **High Cart Abandonment** | >40% | Review checkout UX, test payment methods |
| **Low Premium Uptake** | <15% Premium Sales | Review pricing/messaging |

---

# Zusammenfassung & Nächste Schritte

## Executive Summary

Diese Analyse hat gezeigt, dass **Österreich, Schweiz und Niederlande** die vielversprechendsten Märkte für die internationale Expansion von PferdeWert.de sind:

✅ **Österreich (Q1 2026):** Niedrigstes Risiko, schnellste Time-to-Market (€11.500 Investment)
✅ **Schweiz (Q2-Q3 2026):** Premiummarkt mit hoher Kaufkraft (€10.000 Investment)
✅ **Niederlande (Q4 2026):** Großer professioneller Markt (€16.000 Investment)

**Gesamt-Investment Phase 1-3:** €37.500
**Erwarteter Break-Even:** Q4 2027 (nach 18-24 Monaten)

---

## Sofortige Handlungsschritte

### Woche 1-2: Technisches Foundation
1. ✅ **next-intl installieren** (`npm install next-intl`)
2. ✅ **Middleware konfigurieren** (Locale Detection)
3. ✅ **Verzeichnisstruktur erstellen** (`/messages/de-AT/`, `/de-CH/`, `/nl/`)
4. ✅ **Base Translations** (common.json für AT/CH)

### Woche 3-4: Österreich Soft Launch
5. ✅ **Austrian German Translations** (Paradeiser, Erdapfel, Jänner Overrides)
6. ✅ **Subdirectory Routing** (`pferdewert.de/at/`)
7. ✅ **Hreflang Tags** (SEO-Implementation)
8. ✅ **EPS/Sofort Payment Methods** (Stripe Configuration)
9. ✅ **Legal Review** (€1.500 DSGVO-Compliance Check)

### Woche 5-8: Marketing & Optimierung
10. ✅ **Google Ads AT** (€2.000 Budget für Testing)
11. ✅ **Facebook Ads AT** (€1.500 Budget)
12. ✅ **PR Outreach** (Österreichische Reitsport-Medien, €1.500)
13. ✅ **A/B Testing** (Conversion-Optimierung)

### Monat 3-6: Evaluierung & Schweiz-Vorbereitung
14. ✅ **AT Performance Review** (Traffic, Conversions, ROI)
15. ✅ **Schweiz Translations starten** (de-CH, ss statt ß)
16. ✅ **CHF Pricing konfigurieren**
17. ✅ **Twint/PostFinance Integration** (falls Stripe-Support)

---

## Kritische Erfolgsfaktoren

### Must-Haves für Launch:
1. ✅ **100% Translation Coverage** (keine fehlenden Strings)
2. ✅ **Hreflang Implementation** (SEO-kritisch)
3. ✅ **Lokale Payment Methods** (v.a. iDEAL für NL)
4. ✅ **DSGVO-Compliance** (Legal Review)
5. ✅ **Core Web Vitals** (Performance = Conversion)

### Nice-to-Haves:
- ⭐ **Lokale Testimonials** (AT/CH/NL Kunden-Reviews)
- ⭐ **Lokale Case Studies** (Ratgeber-Artikel mit AT/CH/NL Pferden)
- ⭐ **Local PR** (Interviews in lokalen Reitsport-Medien)

---

## Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **DSGVO-Verstöße** | Mittel | Sehr hoch (Bußgelder) | Legal Review (€1.500), nur nicht-personenbezogene Daten scrapen |
| **Niedrige Conversions** | Mittel | Hoch (ROI negativ) | A/B Testing, lokale Payment Methods, UX-Optimierung |
| **Technische Bugs** | Niedrig | Mittel | QA-Testing (€1.000 pro Phase), Sentry Error Tracking |
| **Wettbewerber reagieren** | Niedrig | Mittel | First-Mover-Advantage nutzen, schneller Launch |
| **Translation-Fehler** | Mittel | Mittel | Professional Translation (nicht Google Translate), Native Speaker Review |

---

## Long-Term Vision (2026-2028)

**2026:**
- Q1: Österreich Live ✅
- Q2-Q3: Schweiz Live ✅
- Q4: Niederlande Live ✅
- Gesamt: 225 Evaluierungen/Monat aus DACH+NL

**2027:**
- Q1-Q2: ccTLD-Migration für AT/CH (wenn Schwellenwerte erreicht)
- Q3-Q4: Frankreich Expansion
- Gesamt: 500+ Evaluierungen/Monat

**2028:**
- UK Expansion
- Belgien (optional)
- USA (Evaluierung)
- Gesamt: 1.000+ Evaluierungen/Monat

---

## ROI-Projektion (Konservatives Szenario)

```
Investment (Phase 1-3): €37.500

Revenue-Projektion:
Jahr 1 (2026):
- AT: 100/mo × 9 Monate × €20.93 = €18.837
- CH: 50/mo × 6 Monate × €20.93 = €6.279
- NL: 75/mo × 6 Monate × €19.53 = €8.789
TOTAL: €33.905

ROI Jahr 1: (€33.905 - €37.500) / €37.500 = -9.6% (leichter Verlust)

Jahr 2 (2027):
- AT: 150/mo × 12 Monate × €20.93 = €37.674
- CH: 75/mo × 12 Monate × €20.93 = €18.837
- NL: 100/mo × 12 Monate × €19.53 = €23.436
TOTAL: €79.947

Kumulativer ROI (2 Jahre):
Total Revenue: €113.852
Total Investment: €37.500
ROI: 203% über 2 Jahre

Break-Even: Monat 13 (Q1 2027)
```

---

## Offene Fragen & Nächste Recherche

1. **Stripe Twint-Support:** Verifiziere ob Stripe Twint in Schweiz unterstützt (Alternative: PostFinance)
2. **Legal:** DSGVO-Lawyer Kontakt für AT/CH/NL Compliance-Review (Budget: €1.500)
3. **Translation Agency:** Recherchiere Professional Translation Services (Niederländisch kritisch)
4. **Competitor Deep-Dive:** Detaillierte Analyse Top 3 Wettbewerber pro Markt (Ahrefs)
5. **Local Partnerships:** Identifiziere potenzielle Partner (Pferdezucht-Verbände, Auktionshäuser)

---

## Finale Empfehlung

**START JETZT mit Österreich:**
- Niedrigstes Risiko
- Schnellste Time-to-Market (8 Wochen)
- Beste ROI-Chance
- Validiert internationale Strategie

**Erfolgs-Kriterium für Österreich:**
- Wenn AT >100 Evaluierungen/Monat nach 6 Monaten → Full Speed ahead mit CH/NL
- Wenn AT <50 Evaluierungen/Monat → Pause, Analyse, Pivot

**Diese Analyse bietet eine solide, datenbasierte Grundlage für die internationale Expansion. Die Roadmap ist klar, die Risiken identifiziert, und die technische Strategie bewährt.**

**Viel Erfolg! 🚀🐴**
