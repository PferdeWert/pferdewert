# 🚨 SEO Recovery Plan - Dezember 2025

> **Datum:** 21. Dezember 2025
> **Auslöser:** Google December 2025 Core Update (11.-12. Dezember)
> **Problem:** Traffic-Drop von ~100 auf ~0 Besucher/Tag
> **Ursache:** "Scaled Content" Pattern erkannt durch Algorithmus

---

## 📊 Keyword-Analyse (Daten vom 21.12.2025)

### Seiten nach Search Volume sortiert:

| Seite | Keyword | SV/Monat | Aktion | Priorität |
|-------|---------|----------|--------|-----------|
| `/pferd-kaufen/pony` | pony kaufen | 6.600 | ✅ KEEP | P1 |
| `/pferd-kaufen/haflinger` | haflinger kaufen | 5.400 | ✅ KEEP | P1 |
| `/pferd-kaufen/islandpferd` | islandpferd kaufen | 4.400 | ✅ KEEP | P1 |
| `/pferd-kaufen/quarter-horse` | quarter horse kaufen | 3.600 | ✅ KEEP | P1 |
| `/pferd-kaufen/dressurpferd` | dressurpferd kaufen | 2.400 | ✅ KEEP | P2 |
| `/pferd-kaufen/springpferd` | springpferd kaufen | 2.400 | ✅ KEEP | P2 |
| `/pferd-kaufen/freizeitpferd` | freizeitpferd kaufen | 1.900 | ✅ KEEP | P2 |
| `/pferd-kaufen/friese` | friese kaufen | 1.900 | ✅ KEEP | P2 |
| `/pferd-kaufen/bayern` | pferd kaufen bayern | 1.900 | ✅ KEEP | P2 |
| `/pferd-kaufen/nrw` | pferd kaufen nrw | 1.600 | ✅ KEEP | P2 |
| `/pferd-kaufen/fohlen` | fohlen kaufen | 1.300 | ⚠️ NOINDEX | P3 |
| `/pferd-kaufen/kaufvertrag` | pferdekaufvertrag | 1.000 | ⚠️ NOINDEX | P3 |
| `/pferd-kaufen/lipizzaner` | lipizzaner kaufen | 480 | ⚠️ NOINDEX | P3 |
| `/pferd-kaufen/anfaenger` | pferd für anfänger | 260 | ⚠️ NOINDEX | P3 |
| `/pferde-ratgeber/aku-pferd/kosten` | aku pferd kosten | 210 | ⚠️ NOINDEX | P3 |
| `/pferde-ratgeber/pferdemarkt` | pferdemarkt deutschland | 110 | ⚠️ NOINDEX | P3 |

### Regionale Seiten (Sonderfall):

| Seite | Domain | Aktion |
|-------|--------|--------|
| `/pferd-kaufen/oesterreich` | nur pferdewert.at | ✅ KEEP |
| `/pferd-kaufen/schweiz` | nur pferdewert.ch | ✅ KEEP |

---

## 🎯 Phase 1: Sofortige Konsolidierung

### Ziel: Seitenanzahl von 23 auf 12 reduzieren

**Aktion: NOINDEX hinzufügen zu folgenden Seiten:**

```tsx
// In jeder Seite: <Head> anpassen
<meta name="robots" content="noindex, follow" />
```

### NOINDEX-Liste (11 Seiten):

1. ❌ `/pferd-kaufen/fohlen` (SV: 1.300 - zu ähnlich zu anderen Typen)
2. ❌ `/pferd-kaufen/kaufvertrag` (SV: 1.000 - informational, kein Kauf-Intent)
3. ❌ `/pferd-kaufen/lipizzaner` (SV: 480 - niedrig)
4. ❌ `/pferd-kaufen/anfaenger` (SV: 260 - niedrig)
5. ❌ `/pferde-ratgeber/aku-pferd/kosten` (SV: 210 - in Haupt-AKU-Artikel integrieren)
6. ❌ `/pferde-ratgeber/pferdemarkt` (SV: 110 - nicht core business)
7. ❌ `/pferd-kaufen/index` (Hub-Seite ohne echten Content)
8. ❌ `/pferde-ratgeber/index` (Hub-Seite ohne echten Content)

**Optional (nach Beobachtung):**
- `/pferd-kaufen/friese` - Bei weiterem Drop auch noindexen
- `/pferd-kaufen/freizeitpferd` - Bei weiterem Drop auch noindexen

### KEEP-Liste (12 Seiten - Core Content):

**Hauptseiten (3):**
1. ✅ `/` (Homepage)
2. ✅ `/pferde-preis-berechnen` (Conversion-Seite)
3. ✅ `/ueber-pferdewert` (E-E-A-T)

**Top Rassen (4):**
4. ✅ `/pferd-kaufen/pony` (SV: 6.600)
5. ✅ `/pferd-kaufen/haflinger` (SV: 5.400)
6. ✅ `/pferd-kaufen/islandpferd` (SV: 4.400)
7. ✅ `/pferd-kaufen/quarter-horse` (SV: 3.600)

**Top Typen (2):**
8. ✅ `/pferd-kaufen/dressurpferd` (SV: 2.400)
9. ✅ `/pferd-kaufen/springpferd` (SV: 2.400)

**Regional DE (2):**
10. ✅ `/pferd-kaufen/bayern` (SV: 1.900)
11. ✅ `/pferd-kaufen/nrw` (SV: 1.600)

**Ratgeber Core (1):**
12. ✅ `/pferde-ratgeber/aku-pferd` (mit kosten integriert)

---

## 🔧 Phase 2: Content-Qualität erhöhen

### Für jede KEEP-Seite folgende Elemente hinzufügen:

#### 1. Persönliche Expertise (E-E-A-T)
```markdown
> **Aus unserer Erfahrung:** Als Pferdefamilie haben wir selbst einen
> [Haflinger/Quarter Horse/etc.] und wissen aus erster Hand...
```

#### 2. Unique Data aus euren Bewertungen
```markdown
### Aktuelle Marktdaten (Stand: Dezember 2025)
- Durchschnittspreis [Rasse]: X.XXX € (basierend auf XX Bewertungen)
- Preisspanne: X.XXX € - X.XXX €
- Beliebteste Altersgruppe: X-X Jahre
```

#### 3. Interaktive Elemente
- ✅ Preis-Rechner Einbettung (bereits vorhanden)
- ⬜ FAQ-Section mit Schema.org Markup
- ⬜ Vergleichstabellen (Rasse vs Rasse)

#### 4. User-Generated Content Signale
- ⬜ Testimonials von echten Nutzern
- ⬜ Bewertungszitate (anonymisiert)

---

## 📈 Phase 3: Monitoring & Rollback

### Erfolgsmetriken (Google Search Console):

| Metrik | Aktuell | Ziel (30 Tage) | Ziel (90 Tage) |
|--------|---------|----------------|----------------|
| Impressions | ~0 | >500 | >2.000 |
| Clicks | ~0 | >20 | >100 |
| Avg. Position | n/a | <20 | <10 |
| Indexierte Seiten | 23 | 12 | 12-15 |

### Rollback-Trigger:
- Wenn nach 30 Tagen keine Verbesserung → weitere Seiten noindexen
- Wenn Verbesserung → schrittweise Seiten zurückbringen (1 pro Woche)

---

## 🔄 AT/CH Domains: Cleanup

### Problem gefunden:
Google hat Seiten auf pferdewert.at indexiert, die per Middleware blockiert sind.

### Aktion:
1. In Google Search Console für pferdewert.at:
   - URL-Entfernung beantragen für `/pferd-kaufen`, `/pferde-ratgeber`, etc.
2. Sitemap für AT/CH aktualisieren (bereits korrekt: 7 URLs)
3. robots.txt für AT/CH anpassen:

```
# Für pferdewert.at und pferdewert.ch
User-agent: *
Disallow: /pferd-kaufen/
Disallow: /pferde-ratgeber/
Allow: /pferd-kaufen/oesterreich  # nur .at
Allow: /pferd-kaufen/schweiz      # nur .ch
```

---

## ✅ Implementierungs-Checkliste

### Sofort (Tag 1):
- [ ] NOINDEX-Tags zu Phase-1-Seiten hinzufügen
- [ ] Google Search Console: Index-Entfernung für AT/CH-Altlasten
- [ ] Deployment auf Vercel

### Woche 1:
- [ ] Top 4 Rassen-Seiten mit E-E-A-T-Elementen aufwerten
- [ ] FAQ-Schema.org zu Hauptseiten hinzufügen
- [ ] Internal Links von NOINDEX-Seiten zu KEEP-Seiten umleiten

### Woche 2-4:
- [ ] Monitoring in GSC
- [ ] Bei Verbesserung: Content-Qualität für weitere Seiten
- [ ] Bei keiner Verbesserung: Weitere Konsolidierung

### Nach Core Update Rollout (Ende Dezember):
- [ ] Re-Evaluation aller Metriken
- [ ] Entscheidung über Reaktivierung von NOINDEX-Seiten

---

## 📝 Notizen

### Warum NOINDEX statt DELETE?
- Content bleibt erhalten für spätere Reaktivierung
- Keine 404-Fehler oder Broken Links
- Schnelle Rollback-Möglichkeit
- Erhalt der internen Verlinkungsstruktur

### Warum diese Seiten behalten?
- Höchste Search Volumes = höchstes Traffic-Potenzial
- Commercial Intent = Conversion-nah
- Unique Data-Potenzial (Bewertungsdaten verfügbar)

### Langfristige Strategie:
Nach erfolgreicher Recovery kann das Long-Tail-Targeting wieder aufgenommen werden, aber:
- Max. 1-2 neue Seiten pro Monat
- Jede Seite mit echtem Mehrwert (nicht nur Template)
- User Engagement als Primärmetrik

---

*Erstellt: 21.12.2025 | Letzte Aktualisierung: 21.12.2025*
