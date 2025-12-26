# Horse-Value.com Setup Plan (NL Market)

## Ziel
Sauberer Neustart für den niederländischen Markt ohne Google-Verbindung zu pferdewert.de.

---

## 1. Technische Trennung (KRITISCH)

### Neues Git Repository - JA, komplett neu
```bash
# NICHT forken oder klonen von pferdewert!
mkdir ~/Developer/horse-value
cd ~/Developer/horse-value
git init
```

**Warum komplett neu?**
- Keine Git-History-Verbindung
- Keine Commit-Autor-Patterns die Google crawlen könnte
- Sauberer Start ohne "Altlasten"

### Was manuell kopieren (cherry-pick):
- Core Business Logic (Bewertungsformular)
- Stripe Integration
- MongoDB Schema (angepasst für NL)
- UI Components (generische, keine SEO-lastigen)

### Was NICHT kopieren:
- ❌ Ratgeber-Artikel / SEO-Content
- ❌ Sitemap-Generierung für Content-Seiten
- ❌ Blog/Content-Infrastruktur
- ❌ Interne Verlinkungslogik für SEO
- ❌ Analytics-IDs (GA, GSC)

---

## 2. Hosting & Infrastruktur

| Komponente | pferdewert.de | horse-value.com |
|------------|---------------|-----------------|
| Frontend | Vercel | **Neues Vercel-Projekt** (gleicher Account OK) |
| Backend | Render | Gleicher Render oder neues Projekt |
| MongoDB | Bestehendes Cluster | **Neue Database** im gleichen Cluster |
| Stripe | Bestehender Account | Gleicher Account (NL als Region hinzufügen) |
| Domain | Namecheap | **IONOS** (bereits vorhanden) |

### Pragmatischer Stack:
```
Frontend: Vercel (neues Projekt, gleicher Account)
Backend:  Render (neues Projekt oder Service)
Database: MongoDB Atlas - neue DB "horse-value" im Cluster
Domain:   IONOS
```

### Risiko-Akzeptanz:
- MongoDB/Stripe-Verbindung ist für Google nicht sichtbar (Backend)
- Wichtiger: Kein gemeinsamer Content, keine Cross-Links

---

## 3. Domain-Setup (IONOS)

### WHOIS Privacy aktivieren (KRITISCH!)
1. IONOS Domain-Verwaltung öffnen
2. **Domain Privacy aktivieren** (versteckt Inhaberdaten)
3. Falls möglich: andere E-Mail-Adresse für Domain verwenden

### DNS-Einträge bei IONOS:
```
horse-value.com       → CNAME → cname.vercel-dns.com
www.horse-value.com   → CNAME → cname.vercel-dns.com
api.horse-value.com   → CNAME → [render-service].onrender.com
mail.horse-value.com  → MX    → [E-Mail-Provider]
```

### Vercel-Projekt:
1. Neues Projekt in Vercel erstellen
2. Domain `horse-value.com` hinzufügen
3. Vercel zeigt DNS-Records an → bei IONOS eintragen

---

## 3b. E-Mail-Infrastruktur (NEU - aus Code Review)

### KRITISCH: Keine E-Mails von @pferdewert.de!

Transaktionale E-Mails (Bestätigung, PDF-Versand) müssen von eigener Domain kommen.

### Empfohlener Setup:
```
E-Mail-Provider: Resend (oder SendGrid)
Domain:          noreply@horse-value.com
```

### Bei IONOS einrichten:
1. MX-Records für horse-value.com
2. SPF/DKIM/DMARC Records (Resend gibt diese vor)

### Kosten:
- Resend Free Tier: 3.000 E-Mails/Monat (reicht für Start)
- Oder: IONOS E-Mail-Paket (~1€/Monat)

---

## 4. Content-Strategie (Minimal & Fokussiert)

### Nur diese Seiten erstellen (analog zu pferdewert.de):

| pferdewert.de | horse-value.com (NL) |
|---------------|----------------------|
| `/` | `/` → Landing Page |
| `/pferde-preis-berechnen` | `/paardenprijs-berekenen` → Formular |
| `/ueber-pferdewert` | `/over-ons` → Über uns |
| `/ergebnis` | `/resultaat` → Ergebnis nach Bewertung |
| `/beispiel-analyse` | `/voorbeeld-analyse` → Beispiel (optional) |
| `/datenschutz` | `/privacybeleid` |
| `/impressum` | `/impressum` oder `/colofon` |
| `/agb` | `/algemene-voorwaarden` |

### KEINE (das war der "scaled content"):
- ❌ `/pferde-ratgeber/*` - Keine Ratgeber-Artikel
- ❌ `/pferd-kaufen/*` - Keine regionalen/Rassen-Seiten
- ❌ Kein Blog
- ❌ Keine Hub/Spoke SEO-Architektur
- ❌ Keine automatisch generierten Seiten

---

## 5. SEO-Strategie (Anti-Scaled-Content)

### Fokus-Keywords (NL):
- "paard waarde" (Pferdewert)
- "wat is mijn paard waard" (Was ist mein Pferd wert)
- "paard taxatie" (Pferd Bewertung)
- "paardentaxatie online"

### Vorgehen:
1. **Eine starke Landing Page** statt viele schwache Seiten
2. **Echte User Signals** vor SEO-Content
3. **Google Ads** für initiale Sichtbarkeit (beschleunigt Trust)
4. **Social Proof** durch echte Bewertungen

### robots.txt (strikt):
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
```

### Keine automatische Sitemap-Generierung für Content!

---

## 6. Technische Implementierung

### Schritt 1: Neues Projekt aufsetzen
```bash
# Neues Verzeichnis (NICHT im pferdewert Ordner!)
mkdir ~/Developer/horse-value
cd ~/Developer/horse-value

# Next.js 15 mit PAGES ROUTER (wie pferdewert.de - schnelleres Portieren!)
npx create-next-app@latest . --typescript --tailwind --no-app

# Basis-Abhängigkeiten
npm install stripe @stripe/stripe-js mongodb

# GitHub Repo verbinden
git remote add origin git@github.com:DEIN-USER/horse-value.git
git push -u origin main
```

**Entscheidung: Pages Router (nicht App Router)**
- Ermöglicht schnelleres Copy-Paste von pferdewert.de
- Gleiche Architektur = weniger Umschreiben
- App Router wäre "sauberer getrennt", aber mehr Aufwand

### Schritt 2: Nur Core-Features portieren
Manuell kopieren und anpassen:
- `lib/mongo.ts` → Neue Connection (DB: "horse-value")
- `lib/stripe.ts` → Gleicher Account, neue Product-IDs
- `components/HorseForm/` → Anpassen für NL
- `types/` → Basis-Types

### Schritt 3: Stripe erweitern
- Bestehenden Stripe Account nutzen
- **Neue Product-IDs für NL erstellen** (nicht die deutschen wiederverwenden!)
- Gleiche API Keys, aber separate Produkte
```
# In Stripe Dashboard:
- Neues Produkt "Horse Value - NL" erstellen
- Neuer Price (z.B. €14,90 wie DE)
- Price-ID in .env.local speichern
```

### Schritt 4: MongoDB neue Database
```bash
# Neue Database im bestehenden Cluster
# Connection String anpassen:
MONGODB_URI="mongodb+srv://.../?retryWrites=true"
MONGODB_DB="horse-value"  # Neue DB, nicht "pferdewert"
```

### Schritt 5: Backend-Anpassungen für NL (NEU - aus Code Review)

Das Backend muss für NL angepasst werden:

**AI-Prompts (KRITISCH):**
```python
# NICHT übersetzen! Komplett NEU schreiben auf Niederländisch
# pferdewert: backend/prompts/
# horse-value: Neue NL-Prompts erstellen
```

**E-Mail-Templates:**
```
- Bestätigungs-E-Mail auf Niederländisch
- PDF-Versand E-Mail auf Niederländisch
- Absender: noreply@horse-value.com (NICHT @pferdewert.de!)
```

**PDF-Template (KRITISCH für Fingerprint):**
```
- Komplett NEUES PDF-Design
- Andere Farben/Layout als pferdewert.de
- NL-spezifische Formatierung
```

**Pferderassen für NL-Markt:**
```
- KWPN (Niederländisches Warmblut)
- Friese
- Groninger
- Gelders Paard
- + internationale Rassen
```

---

## 7. Checkliste Anti-Footprint

### Vor Launch prüfen (WICHTIG):
- [ ] **WHOIS Privacy bei IONOS aktiviert**
- [ ] **Neue GA4 Property** (NICHT mit pferdewert verbinden!)
- [ ] **Neue GSC Property** (separates Property, nicht verknüpfen)
- [ ] Kein Cross-Linking zwischen Domains
- [ ] Keine gemeinsamen Backlinks anfragen
- [ ] Content komplett NEU schreiben (nicht übersetzen!)
- [ ] Andere Kontaktdaten im Impressum (NL-Adresse?)
- [ ] **E-Mails von @horse-value.com** (nicht @pferdewert.de!)
- [ ] **Neues PDF-Design** (anderes Layout als pferdewert)
- [ ] **AI-Prompts NEU geschrieben** (nicht übersetzt)
- [ ] **Native Speaker Review** für NL-Texte

### Akzeptierte Verbindungen (Backend, nicht Google-sichtbar):
- ✅ Gleicher MongoDB Account (verschiedene DBs)
- ✅ Gleicher Stripe Account (verschiedene Product-IDs!)
- ✅ Gleicher Vercel Account (verschiedene Projekte)

### Nach Launch:
- [ ] In GSC als separates Property (NICHT verbinden!)
- [ ] Eigenes GA4 Property
- [ ] Keine Weiterleitungen von/zu pferdewert.de
- [ ] Keine hreflang-Tags zwischen den Domains

---

## 8. Kosten-Übersicht

| Service | Option | Zusatzkosten |
|---------|--------|--------------|
| Vercel | Bestehendes Team | €0 (im Plan) |
| Render | Neuer Service | ~€7/Monat |
| MongoDB | Bestehend | €0 |
| Stripe | Bestehend | €0 |
| Domain | IONOS (vorhanden) | €0 |
| E-Mail | Resend Free / IONOS | €0-1/Monat |
| Native Speaker | Einmalig | ~€100-200 |

**Laufende Kosten: ~€7-8/Monat**
**Einmalig: ~€100-200 für Native Speaker Review**

---

## 9. Zeitplan (Aufwand-Schätzung)

### Phase 1: Setup (Tag 1)
- Accounts erstellen (Netlify, Railway, Atlas, Stripe, Cloudflare)
- Domain registrieren
- Neues Git Repo

### Phase 2: Core Development (Tag 2-3)
- Landing Page mit Bewertungsformular
- Stripe Integration
- Backend API

### Phase 3: Content & Legal (Tag 4)
- NL-Texte schreiben (NICHT übersetzen, neu schreiben!)
- Impressum, Datenschutz, AGB

### Phase 4: Launch (Tag 5)
- DNS propagation
- SSL aktivieren
- Testen

---

## 10. Risiko-Minimierung

### Was Google verbinden KÖNNTE (vermeiden!):
1. **Gleiche IP-Ranges** → Separates Hosting
2. **WHOIS-Daten** → Privacy + andere E-Mail
3. **Analytics-Verbindung** → Separate Accounts
4. **Content-Fingerprint** → Komplett neu schreiben
5. **Backlink-Overlap** → Keine gemeinsamen Links
6. **Hosting-Footprint** → Anderer Anbieter
7. **Technischer Fingerprint** → Anderes Framework (optional)

### Optional für maximale Trennung:
- App Router statt Pages Router verwenden
- Anderes CSS Framework (z.B. Tailwind v4 mit anderer Config)
- Andere UI Component Library

---

## Fazit

**Pragmatischer Ansatz mit akzeptablem Risiko** (nach Code Review ergänzt)

### Was NEU sein muss (Google-sichtbar):
1. ✅ Neues Git Repo (kein Fork) - `git init` in neuem Ordner
2. ✅ Neue Domain (IONOS - horse-value.com) + **WHOIS Privacy!**
3. ✅ Neues Vercel-Projekt
4. ✅ Content komplett NEU schreiben (Native Speaker!)
5. ✅ Separate GA4 + GSC Properties
6. ✅ Nur 8 Kern-Seiten (/, Formular, Über uns, Ergebnis, Beispiel + 3x Legal)
7. ✅ E-Mails von @horse-value.com
8. ✅ Neues PDF-Design (kein Fingerprint)

### Was gleich bleiben kann (Backend, nicht Google-sichtbar):
- MongoDB (neue DB "horse-value" im Cluster)
- Stripe (gleicher Account, **neue Product-IDs**)
- Vercel Account (neues Projekt)
- Render Account (neuer Service)

### Entscheidend für Google-Trennung:
**Kein gemeinsamer Content, keine Cross-Links, keine hreflang-Verbindung.**

Backend-Infrastruktur ist für Google nicht sichtbar - das Risiko liegt im Frontend/Content.

---

## Quick-Start Befehle

```bash
# 1. Neues Projekt erstellen
mkdir ~/Developer/horse-value
cd ~/Developer/horse-value
npx create-next-app@latest . --typescript --tailwind --no-app

# 2. GitHub verbinden (neues leeres Repo erstellen auf github.com)
git remote add origin git@github.com:DEIN-USER/horse-value.git
git push -u origin main

# 3. Dependencies installieren
npm install stripe @stripe/stripe-js mongodb

# 4. .env.local erstellen
MONGODB_URI="mongodb+srv://..."
MONGODB_DB="horse-value"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PRICE_ID="price_NL_..."  # Neue NL Price-ID!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```
