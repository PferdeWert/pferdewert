# E-E-A-T Signals - Methodology Reference

**Purpose**: Comprehensive guide for implementing Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals in SEO content.

**When to Use**:
- ✅ **Phase 4 (Content Creation)**: Integrate E-E-A-T signals während des Schreibprozesses
- ✅ **Phase 6 (Quality Check)**: Validate E-E-A-T Score und identify missing signals

**Token Budget**: Reference-Only (loaded on-demand, nicht Teil der Pipeline-Execution)

---

## E-E-A-T Framework Overview

**E-E-A-T** ist Googles Quality-Bewertungs-Framework aus den [Search Quality Rater Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf).

### Die 4 Dimensionen (gleichgewichtet):

| Dimension | Definition | Gewicht | PferdeWert.de Kontext |
|-----------|-----------|---------|----------------------|
| **Experience** | Praktische First-Hand-Erfahrung mit dem Thema | 25% | Echte Pferdekauf-Erfahrungen, Praxis-Beispiele |
| **Expertise** | Fachliche Kompetenz und Qualifikationen | 25% | Tierärztliche Expertise, Pferdewirt-Credentials |
| **Authoritativeness** | Anerkennung als vertrauenswürdige Quelle | 25% | Branchenanerkennung, Citations, Backlinks |
| **Trustworthiness** | Verlässlichkeit, Transparenz, Integrität | 25% | Quellenangaben, Balanced Content, Transparenz |

---

## 1. Experience Signals (25% Gewicht)

### Was ist "Experience"?

**Google's Definition**: "The extent to which the content creator has the necessary first-hand or life experience for the topic."

**Für PferdeWert.de bedeutet das**:
- Praktische Erfahrung mit Pferdekauf, Pferdehaltung, Pferdebewertung
- Persönliche Fallbeispiele aus realen Situationen
- "Wir haben getestet"-Formulierungen
- Lessons Learned aus eigenen Fehlern

### Experience-Signal-Katalog

#### 1.1 Persönliche Fallbeispiele (Highest Impact)

**Wie implementieren**:
```markdown
**Praxis-Beispiel**: Bei der Bewertung eines 8-jährigen Warmblut-Wallachs
im letzten Jahr stellten wir fest, dass minimale Anzeichen von Arthrose
im Sprunggelenk den Marktwert um 15-20% reduzierten – trotz ansonsten
hervorragender Gesundheit.
```

**Scoring**:
- ✅ **+2.5 Punkte**: Min 1 konkretes Praxis-Beispiel mit Details
- ✅ **+1.5 Punkte**: Mehrere praktische Tipps aus eigener Erfahrung
- ✅ **+1.0 Punkte**: "Aus unserer Erfahrung"-Formulierungen
- ❌ **0 Punkte**: Rein theoretischer Content ohne Praxis-Bezug

#### 1.2 Persönliche Insights und Lessons Learned

**Wie implementieren**:
```markdown
**Wichtig aus der Praxis**: Viele Käufer unterschätzen die Bedeutung
der Ankaufsuntersuchung. In 30% der Fälle, die wir begleitet haben,
wurden gesundheitliche Probleme erst bei der tierärztlichen Untersuchung
entdeckt – die vom Verkäufer nicht erwähnt wurden.
```

**Best Practices**:
- Verwende "Wir haben festgestellt...", "In unserer Erfahrung...", "Aus 10 Jahren Praxis..."
- Nenne spezifische Zahlen/Prozente aus eigenen Beobachtungen
- Erwähne Fehler/Learnings: "Ein häufiger Fehler, den wir beobachten..."

#### 1.3 Hands-On Tutorials mit persönlichem Touch

**Wie implementieren**:
```markdown
**So gehen wir vor**: Bei der ersten Besichtigung konzentrieren wir uns
auf drei kritische Bereiche:
1. Gangbild (vorführen lassen, mindestens Schritt und Trab)
2. Hufe und Beinstellung (asymmetrische Abnutzung ist ein Red Flag)
3. Verhalten beim Putzen (zeigt Charakter und Handling)
```

**Scoring**:
- ✅ **Hoher Experience-Wert**: Tutorial mit persönlichen Hacks/Tricks
- ✅ **Mittlerer Wert**: Tutorial mit "Wir empfehlen..."-Formulierungen
- ❌ **Kein Wert**: Generic Step-by-Step ohne persönliche Note

#### 1.4 Zeitbasierte Erfahrung ("Years in Practice")

**Wie implementieren**:
```markdown
**Über den Autor**: Benjamin Reder hat in den letzten 5 Jahren über
200 Pferdebewertungen durchgeführt und dabei mit Tierärzten,
Pferdewirten und Verkäufern zusammengearbeitet.
```

**Best Practices**:
- Autorenbox am Anfang oder Ende des Artikels
- Konkrete Zahlen: "200+ Bewertungen", "5 Jahre Erfahrung", "30+ begleitete Käufe"
- Link zum About-Us oder Founder-Story

---

## 2. Expertise Signals (25% Gewicht)

### Was ist "Expertise"?

**Google's Definition**: "The extent to which the content creator has the necessary knowledge or skill for the topic."

**Für PferdeWert.de bedeutet das**:
- Fachliche Qualifikationen (Tierarzt, Pferdewirt, Trainer)
- Korrekte Verwendung von Fachbegriffen
- Detailtiefe zeigt Kompetenz
- Wissenschaftliche/medizinische Genauigkeit

### Expertise-Signal-Katalog

#### 2.1 Credentials und Qualifikationen

**Wie implementieren**:
```markdown
**Tierärztliche Expertise**: Dieser Artikel wurde in Zusammenarbeit
mit Dr. med. vet. Sarah Schmidt verfasst, Fachtierärztin für Pferde
mit Spezialisierung auf Kaufuntersuchungen.
```

**Scoring**:
- ✅ **+2.5 Punkte**: Autorenkredit mit relevanten Credentials (Tierarzt, Pferdewirt, Trainer)
- ✅ **+1.5 Punkte**: Fachberater/Experten-Quotes integriert
- ✅ **+1.0 Punkte**: "In Zusammenarbeit mit..." erwähnt
- ❌ **0 Punkte**: Keine Credentials erkennbar

**Credential-Typen für PferdeWert.de**:
- **Highest Value**: Tierarzt (Dr. med. vet.), Fachtierarzt für Pferde
- **High Value**: Pferdewirt Meister, Trainer A-Lizenz, Hufschmied Meister
- **Medium Value**: Pferdewirtschaftsmeister, Bereiter, Züchter (langjährig)
- **Low Value**: Generic "Experte" ohne Nachweis

#### 2.2 Fachbegriffe korrekt verwenden und erklären

**Wie implementieren**:
```markdown
**Ankaufsuntersuchung (AKU)**: Die tierärztliche Untersuchung vor dem
Kauf umfasst je nach Umfang:
- **Kleine AKU**: Klinische Untersuchung, Ganganalyse, Beugeproben
- **Große AKU**: Zusätzlich Röntgen (18-Standard-Aufnahmen), Ultraschall
- **Erweiterte AKU**: Blutbild, Endoskopie, ggf. weitere Diagnostik
```

**Best Practices**:
- Fachbegriffe beim ersten Vorkommen in Klammern erklären
- Deutsche und englische Begriffe nennen wenn relevant (z.B. "Equine Herpes Virus (EHV)")
- Abkürzungen einführen: "Ankaufsuntersuchung (AKU)"

**Scoring**:
- ✅ **+1.5 Punkte**: Min 5 Fachbegriffe korrekt verwendet und erklärt
- ✅ **+1.0 Punkte**: Fachbegriffe verwendet, aber nicht erklärt
- ❌ **0 Punkte**: Nur Laien-Sprache ohne Fachterminologie

#### 2.3 Detailtiefe zeigt Kompetenz

**Wie implementieren**:
```markdown
**Hufgesundheit beurteilen**: Achten Sie auf:
- **Hufstellung**: Zehenwinkel sollte 45-55° betragen (abhängig von Rasse)
- **Trachten**: Gleichmäßige Höhe, keine Untergeschobene Trachten
- **Hufwand**: Keine Risse/Spalten, gleichmäßiges Hornwachstum
- **Hufsohle**: Keine Einblutungen, Strahl gesund und elastisch
- **Beschlag**: Passgenau, nicht zu eng, regelmäßige Korrektur erkennbar
```

**Scoring**:
- ✅ **+2.0 Punkte**: Tiefes Detail mit spezifischen Zahlen/Winkeln/Messwerten
- ✅ **+1.0 Punkte**: Checklisten mit konkreten Prüfpunkten
- ❌ **0 Punkte**: Oberflächliche Beschreibung ohne Details

#### 2.4 Wissenschaftliche/Medizinische Genauigkeit

**Wie implementieren**:
```markdown
**Arthrose-Früherkennung**: Laut einer Studie der Tierärztlichen
Hochschule Hannover (2019) zeigen 40% der Warmblüter ab 8 Jahren
röntgenologische Anzeichen von Arthrose – oft ohne klinische Symptome.

Quelle: [Tietje et al., 2019, Journal of Equine Veterinary Science]
```

**Best Practices**:
- Zitiere veterinärmedizinische Studien
- Nenne spezifische Datenquellen (THH, FN, Universitäts-Kliniken)
- Verlinke auf autoritäre Quellen (keine Blogs!)

---

## 3. Authoritativeness Signals (25% Gewicht)

### Was ist "Authoritativeness"?

**Google's Definition**: "The extent to which the content creator or the website is recognized as a go-to source for the topic."

**Für PferdeWert.de bedeutet das**:
- Externe Anerkennung (Backlinks, Citations, Mentions)
- Referenzen zu etablierten Standards/Guidelines
- Branchendaten/Statistiken aus autoritativen Quellen
- Verlinkung von anderen Experten-Websites

### Authoritativeness-Signal-Katalog

#### 3.1 Externe Referenzen zu autoritativen Quellen

**Wie implementieren**:
```markdown
**Kaufvertrag rechtssicher gestalten**: Die Deutsche Reiterliche
Vereinigung (FN) stellt Musterverträge bereit, die alle relevanten
Klauseln enthalten:

- [FN Mustervertrag Pferdekauf](https://www.pferd-aktuell.de/)
- Gewährleistungsrechte nach BGB §§ 434 ff.
- Haftungsausschluss-Klauseln (nur eingeschränkt wirksam)
```

**Scoring**:
- ✅ **+2.5 Punkte**: Min 3 externe Referenzen zu autoritativen Quellen
- ✅ **+1.5 Punkte**: 1-2 externe Referenzen
- ✅ **+1.0 Punkte**: Verweise auf Standards/Guidelines ohne Link
- ❌ **0 Punkte**: Keine Quellenangaben

**Autoritäre Quellen für PferdeWert.de**:
- **Tier 1 (Highest Authority)**:
  - FN (Deutsche Reiterliche Vereinigung)
  - Tierärztliche Hochschule Hannover
  - BGB/Rechtsprechung (BGH-Urteile)
  - GOT (Gebührenordnung für Tierärzte)

- **Tier 2 (High Authority)**:
  - Fachzeitschriften (Pferdemarkt, Reiter Revue, St. Georg)
  - Landgestüte, Zuchtverbände (Hannoveraner, Holsteiner, etc.)
  - Berufsverbände (bpt - Bundesverband Praktizierender Tierärzte)

- **Tier 3 (Medium Authority)**:
  - Größere Pferdekliniken (Website-Content)
  - Reit- und Fahrvereine (Landes-Ebene)
  - Hufschmied-Verbände

#### 3.2 Branchendaten und Statistiken

**Wie implementieren**:
```markdown
**Marktentwicklung**: Laut FN-Zahlen 2023 wurden in Deutschland
ca. 18.000 Pferde pro Jahr verkauft, mit einem durchschnittlichen
Verkaufspreis von 8.500 Euro für Freizeitpferde. Turnierpferde
erzielen im Mittel 25.000-50.000 Euro.

Quelle: [FN Jahresbericht 2023]
```

**Scoring**:
- ✅ **+2.0 Punkte**: Min 2 Datenquellen mit Zahlen/Statistiken zitiert
- ✅ **+1.0 Punkte**: Allgemeine Branchentrends ohne Zahlen
- ❌ **0 Punkte**: Keine Daten/Statistiken

#### 3.3 Verweise auf etablierte Standards/Guidelines

**Wie implementieren**:
```markdown
**Röntgen-Standard**: Die 18-Standard-Aufnahmen nach der
Röntgenleitlinie 2018 der Gesellschaft für Pferdemedizin (GPM)
umfassen:
- Zehe vorne (4 Aufnahmen pro Bein)
- Sprunggelenk (4 Aufnahmen pro Bein)
- Knie, Rücken, Hals (weitere spezifische Aufnahmen)

Diese Standardisierung ermöglicht vergleichbare Bewertungen.
```

**Best Practices**:
- Zitiere offizielle Guidelines (GPM, FN, bpt)
- Erwähne gesetzliche Vorgaben (BGB, GOT)
- Verlinke auf PDF-Dokumente wenn verfügbar

#### 3.4 Brand Authority Signals

**Wie implementieren**:
```markdown
**Über PferdeWert.de**: Unsere KI-gestützte Pferdebewertung wurde
in Zusammenarbeit mit Tierärzten und Pferdewirten entwickelt und
berücksichtigt über 50 bewertungsrelevante Faktoren.

**Trust-Signale**:
- DSGVO-konform (deutsche Server, SSL-Verschlüsselung)
- Transparente Bewertungskriterien
- Kein Verkauf von Nutzer-Daten
```

**Signals**:
- ✅ Impressum vollständig und rechtskonform
- ✅ Datenschutzerklärung DSGVO-compliant
- ✅ About-Us mit echten Personen/Credentials
- ✅ Contact-Informationen (E-Mail, ggf. Telefon)

---

## 4. Trustworthiness Signals (25% Gewicht)

### Was ist "Trustworthiness"?

**Google's Definition**: "The extent to which the page is accurate, honest, safe, and reliable."

**Für PferdeWert.de bedeutet das**:
- Quellenangaben für alle Behauptungen
- Balanced Content (Pro/Contra, Risiken erwähnt)
- Transparenz über Limitationen/Unsicherheiten
- Keine übertriebenen Claims

### Trustworthiness-Signal-Katalog

#### 4.1 Quellenangaben für Behauptungen

**Wie implementieren**:
```markdown
**Kosten einer Ankaufsuntersuchung**: Eine große AKU kostet laut
GOT (Gebührenordnung für Tierärzte) zwischen 300-800 Euro, abhängig
von Umfang und Klinik.

Quelle: [GOT 2022, Ziffer 8.1.3]
```

**Scoring**:
- ✅ **+2.5 Punkte**: Alle Claims/Zahlen mit Quellen belegt
- ✅ **+1.5 Punkte**: Wichtigste Claims belegt, einige ohne Quelle
- ✅ **+1.0 Punkte**: Generische Quellen ("Experten raten...")
- ❌ **0 Punkte**: Unbelegt Claims ohne Quellen

**Quellen-Format**:
```markdown
**Inline-Zitat**: Laut FN-Statistik 2023 [1]...

**Quellenverzeichnis am Ende**:
[1] FN Jahresbericht 2023, S. 42
[2] Tietje et al., 2019, Journal of Equine Veterinary Science
[3] BGB § 434 - Sachmangel
```

#### 4.2 Balanced Content (Pro/Contra)

**Wie implementieren**:
```markdown
**Pferdekauf ohne Ankaufsuntersuchung**:

**Pro (Argumente):**
- Kostenersparnis 300-800 Euro
- Schneller Kaufabschluss möglich
- Bei sehr günstigen Freizeitpferden akzeptables Risiko

**Contra (Risiken):**
- Keine Gewährleistung bei versteckten Mängeln
- Gesundheitsprobleme können Folgekosten von 1000+ Euro verursachen
- Kein objektiver Gesundheitsstatus

**Unsere Empfehlung**: Bei Pferden über 3.000 Euro ist eine
Ankaufsuntersuchung fast immer wirtschaftlich sinnvoll.
```

**Scoring**:
- ✅ **+2.0 Punkte**: Pro/Contra klar strukturiert, keine einseitige Darstellung
- ✅ **+1.5 Punkte**: Risiken/Nachteile erwähnt
- ❌ **0 Punkte**: Nur positive Aspekte, keine Risiken erwähnt

#### 4.3 Transparenz über Limitationen/Unsicherheiten

**Wie implementieren**:
```markdown
**Grenzen der KI-Bewertung**: Unsere automatisierte Schätzung basiert
auf Marktdaten und statistischen Modellen. Sie ersetzt NICHT:
- Eine tierärztliche Untersuchung
- Eine persönliche Begutachtung durch Fachleute
- Die Berücksichtigung individueller Faktoren (Charakter, Ausbildung)

Die KI-Schätzung ist eine **Orientierungshilfe**, keine verbindliche
Wertfeststellung.
```

**Best Practices**:
- Kommuniziere Grenzen der eigenen Expertise
- Erwähne was NICHT garantiert werden kann
- Empfiehl zusätzliche Fachberatung wenn sinnvoll

**Scoring**:
- ✅ **+1.5 Punkte**: Limitationen klar kommuniziert
- ✅ **+1.0 Punkte**: Hinweis auf "ggf. Fachberatung einholen"
- ❌ **0 Punkte**: Übertriebene Claims ohne Einschränkungen

#### 4.4 Korrekte, ehrliche Informationen (Fact-Checking)

**Wie implementieren**:
```markdown
**Fact-Check durchgeführt**: Alle medizinischen Informationen in
diesem Artikel wurden von Dr. med. vet. Sarah Schmidt geprüft
(Stand: Januar 2025).

**Aktualität**: Preisangaben basieren auf Marktdaten Q4/2024.
```

**Best Practices**:
- Erwähne Review-Prozess (tierärztliche Prüfung)
- Update-Datum angeben
- Korrigiere Fehler transparent (Disclaimer bei Updates)

---

## E-E-A-T Integration in Content-Phasen

### Phase 4: Content Creation

**Checkliste während des Schreibens**:

- [ ] **Experience**: Min 1 konkretes Praxis-Beispiel integriert
- [ ] **Experience**: "Aus unserer Erfahrung"-Formulierungen verwendet
- [ ] **Expertise**: Autorenbox mit Credentials am Anfang/Ende
- [ ] **Expertise**: Min 5 Fachbegriffe korrekt verwendet und erklärt
- [ ] **Authoritativeness**: Min 3 externe Referenzen zu autoritativen Quellen
- [ ] **Authoritativeness**: Min 1 Branchendaten/Statistik zitiert
- [ ] **Trustworthiness**: Alle Claims/Zahlen mit Quellen belegt
- [ ] **Trustworthiness**: Pro/Contra für kontroverse Punkte
- [ ] **Trustworthiness**: Limitationen/Unsicherheiten kommuniziert

### Phase 6: Quality Check

**E-E-A-T Score Berechnung** (wie in phase-6-quality-check.md):

```json
{
  "eeat_score": {
    "total_score": 8.5,
    "experience_score": 2.0,   // 0-2.5 Punkte
    "expertise_score": 2.5,    // 0-2.5 Punkte
    "authoritativeness_score": 2.0,  // 0-2.5 Punkte
    "trustworthiness_score": 2.0,    // 0-2.5 Punkte
    "breakdown": {
      "personal_examples": true,
      "credentials_present": true,
      "external_references": 4,
      "sources_cited": true,
      "balanced_content": true,
      "limitations_mentioned": true
    }
  }
}
```

**Validation**:
- ✅ **E-E-A-T Score ≥ 8.0**: Excellent - starke Google Quality Signals
- ✅ **E-E-A-T Score 6.0-7.9**: Good - solide Quality Signals, minor improvements möglich
- ⚠️ **E-E-A-T Score 4.0-5.9**: Acceptable - mehrere Signale fehlen, Revision empfohlen
- ❌ **E-E-A-T Score < 4.0**: Poor - major E-E-A-T Signale fehlen, umfangreiches Rewrite erforderlich

---

## E-E-A-T für verschiedene Content-Typen

### Tutorial/How-To Content

**Must-Have E-E-A-T Signals**:
- ✅ **Experience**: Persönliche Tutorial-Durchführung beschrieben
- ✅ **Expertise**: Schritt-für-Schritt mit Fachbegriffen
- ✅ **Trustworthiness**: Risiken/häufige Fehler erwähnt

**Beispiel-Integration**:
```markdown
**Wie Sie ein Pferd sicher Probe reiten** (Tutorial)

**Unsere Empfehlung aus der Praxis** (Experience): Nehmen Sie eine
erfahrene Begleitperson mit – in 40% der Fälle die wir beobachtet haben,
erkennt ein neutraler Beobachter Probleme, die dem Reiter nicht auffallen.

**Schritt 1: Vorbereitung** (Expertise):
- Helm (DIN EN 1384), Sicherheitsweste, passende Reitstiefel
- Reitplatz oder abgeschlossene Halle bevorzugt
- Fragen Sie nach: Letzte Hufkorrektur? Aktuelle Impfungen?

**Häufige Fehler** (Trustworthiness):
- ❌ Zu schnelle Gangartwechsel ohne Eingewöhnungsphase
- ❌ Nur Reithalle testen (Verhalten im Gelände kann stark abweichen)
- ❌ Keine Bodenarbeits-Tests (zeigt Grundgehorsam)
```

### Vergleichs-Content

**Must-Have E-E-A-T Signals**:
- ✅ **Expertise**: Detaillierte Kriterien für Vergleich
- ✅ **Authoritativeness**: Externe Daten für Vergleichswerte
- ✅ **Trustworthiness**: Pro/Contra für jede Option

**Beispiel-Integration**:
```markdown
**Warmblut vs. Vollblut für Freizeitreiter** (Vergleich)

**Vergleichskriterien** (Expertise):
| Kriterium | Warmblut | Vollblut |
|-----------|----------|----------|
| Temperament | Ruhig, gelassen | Sensibel, temperamentvoll |
| Ausbildungszeit | 2-3 Jahre | 3-4 Jahre (längere Reifung) |
| Futterkosten/Monat | 150-200€ | 200-300€ (höherer Energiebedarf) |
| Gesundheit | Robust | Anfälliger für Koliken, Hufrehe |

**Datenquelle** (Authoritativeness): FN Züchterstatistik 2023

**Empfehlung** (Trustworthiness):
- ✅ **Warmblut**: Ideal für Anfänger, Freizeitreiter, Familien
- ✅ **Vollblut**: Für erfahrene Reiter, Distanzreiten, Vielseitigkeit
- ⚠️ **Bedenken**: Vollblüter benötigen sensiblere Haltung und Fütterung
```

### Ratgeber/Guide Content

**Must-Have E-E-A-T Signals**:
- ✅ **Experience**: Fallbeispiele aus eigener Praxis
- ✅ **Authoritativeness**: Referenzen zu FN/bpt/GOT
- ✅ **Trustworthiness**: Transparente Kostenangaben mit Quellen

**Beispiel-Integration**:
```markdown
**Der komplette Pferdekauf-Guide** (Ratgeber)

**Aus 5 Jahren Beratungspraxis** (Experience): Die drei häufigsten
Fehler die wir beobachten:
1. Kauf ohne Budget-Puffer (Folgekosten unterschätzt)
2. Emotional statt rational entschieden
3. Verkäufer-Aussagen nicht überprüft

**Rechtliche Grundlagen** (Authoritativeness):
Laut BGB § 434 gilt ein Pferd als mangelhaft wenn...
[Referenz: BGH-Urteil vom 15.03.2018, Az. VIII ZR 96/17]

**Realistische Kostenkalkulation** (Trustworthiness):
- Kaufpreis: 3.000-15.000€ (Freizeitpferd)
- Ankaufsuntersuchung: 300-800€ (GOT 2022)
- Versicherung: 20-40€/Monat (je nach Deckung)
- Monatliche Haltung: 350-600€ (regional unterschiedlich)

**Wichtiger Hinweis**: Diese Preise basieren auf Marktdaten Q4/2024
und können regional variieren.
```

---

## E-E-A-T Anti-Patterns (Was vermeiden?)

### ❌ Anti-Pattern 1: Generic Content ohne Expertise

**Schlecht**:
```markdown
Beim Pferdekauf sollte man auf die Gesundheit achten. Es ist wichtig,
dass das Pferd gesund ist. Gesunde Pferde sind besser als kranke Pferde.
```

**Warum schlecht**: Keine Expertise, keine Details, keine Actionable Insights

**Gut**:
```markdown
Bei der Gesundheitsbeurteilung fokussieren Sie sich auf drei kritische
Bereiche: 1) Bewegungsapparat (Gangbild, Beugeproben), 2) Atemwege
(Auskultation, ggf. Endoskopie bei Turnierpferden), 3) Zähne (Alter,
Kaufläche, EOTRH-Anzeichen bei Pferden > 15 Jahre).
```

### ❌ Anti-Pattern 2: Unbelegt Claims

**Schlecht**:
```markdown
80% aller Pferde haben Arthrose. Die meisten Verkäufer lügen beim Gesundheitszustand.
```

**Warum schlecht**: Keine Quellenangabe, übertriebene Claims, unprofessionell

**Gut**:
```markdown
Laut einer Studie der Tierärztlichen Hochschule Hannover (2019) zeigen
40% der Warmblüter ab 8 Jahren röntgenologische Anzeichen von Arthrose
[Quelle: Tietje et al., 2019]. Dies bedeutet nicht zwingend klinische
Symptome – eine tierärztliche Einzelfallbewertung ist entscheidend.
```

### ❌ Anti-Pattern 3: Einseitige Darstellung

**Schlecht**:
```markdown
Eine Ankaufsuntersuchung ist absolut notwendig und jeder der ohne kauft
ist fahrlässig. Es gibt keine Argumente dagegen.
```

**Warum schlecht**: Keine Trustworthiness (unbalanced), keine Nuancierung

**Gut**:
```markdown
**Pro Ankaufsuntersuchung**: Objektiver Gesundheitsstatus, rechtliche
Absicherung, Folgekosten vermeiden.

**Contra**: Zusatzkosten 300-800€, verzögert Kaufabschluss.

**Unsere Empfehlung**: Bei Pferden über 3.000€ ist die AKU fast immer
wirtschaftlich sinnvoll. Bei sehr günstigen Freizeitpferden (< 1.500€)
kann eine Kosten-Nutzen-Abwägung anders ausfallen.
```

### ❌ Anti-Pattern 4: Fehlende Credentials

**Schlecht**:
```markdown
[Artikel beginnt direkt ohne Autorenbox oder Credentials]
```

**Warum schlecht**: Kein Expertise-Signal, kein Trust

**Gut**:
```markdown
**Über den Autor**: Dr. med. vet. Sarah Schmidt ist Fachtierärztin für
Pferde mit Spezialisierung auf Kaufuntersuchungen. In ihrer Praxis in
Hamburg führt sie seit 2015 über 200 Ankaufsuntersuchungen pro Jahr durch.

[Artikel-Content...]
```

---

## E-E-A-T Quick Reference

### Content Creation Checklist

**Während des Schreibens** (verwende diese als Prompt):

```markdown
**E-E-A-T INTEGRATION CHECKLIST**:

**Experience (25%)**:
- [ ] Min 1 konkretes Praxis-Beispiel integriert
- [ ] "Aus unserer Erfahrung"-Formulierungen verwendet
- [ ] Persönliche Insights/Lessons Learned erwähnt

**Expertise (25%)**:
- [ ] Autorenbox mit Credentials am Anfang/Ende
- [ ] Min 5 Fachbegriffe korrekt verwendet und erklärt
- [ ] Detailtiefe mit spezifischen Zahlen/Messwerten

**Authoritativeness (25%)**:
- [ ] Min 3 externe Referenzen zu FN/bpt/THH
- [ ] Min 1 Branchendaten/Statistik zitiert
- [ ] Verweise auf etablierte Standards/Guidelines

**Trustworthiness (25%)**:
- [ ] Alle Claims/Zahlen mit Quellen belegt
- [ ] Pro/Contra für kontroverse Punkte
- [ ] Limitationen/Unsicherheiten kommuniziert
- [ ] Kostenangaben mit Quelle (GOT, Marktdaten)
```

### Quality Validation (Phase 6)

**Sub-Agent erhält diese E-E-A-T Scoring-Matrix**:

| E-Dimension | 2.5 Punkte | 1.5 Punkte | 1.0 Punkte | 0 Punkte |
|-------------|-----------|-----------|-----------|----------|
| **Experience** | Min 1 konkretes Fallbeispiel | Mehrere praktische Tipps | "Aus Erfahrung"-Formulierungen | Rein theoretisch |
| **Expertise** | Credentials + Fachbegriffe erklärt | Credentials vorhanden | Fachbegriffe ohne Erklärung | Keine Credentials |
| **Authoritativeness** | 3+ externe Referenzen | 1-2 Referenzen | Standards ohne Link | Keine Quellen |
| **Trustworthiness** | Alle Claims belegt + balanced | Claims belegt | Generische Quellen | Unbelegt |

**E-E-A-T Score Berechnung**:
```
Total Score = Experience + Expertise + Authoritativeness + Trustworthiness
Range: 0-10 Punkte
```

---

## Weiterführende Ressourcen

### Google's offizielle Dokumentation
- **Search Quality Rater Guidelines** (2024): https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf
- **Google Helpful Content Update**: https://developers.google.com/search/docs/appearance/helpful-content-system
- **E-E-A-T in Google's Search Central**: https://developers.google.com/search/docs/appearance/core-updates

### Weiterführende Lektüre
- **"Creating helpful, reliable, people-first content"** - Google Search Central
- **"Your Money or Your Life" (YMYL) Topics** - Erhöhte E-E-A-T Standards für Gesundheits-/Finanz-Content

---

**Version**: 1.0 (2025-01-04)
**Maintainer**: Claude Code (SEO Pipeline)
**Last Updated**: Initial E-E-A-T Methodology Documentation
**Next Review**: Phase 4/6 Integration Testing
