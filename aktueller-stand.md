**Projektstand PferdeWert (Stand: Juni 2025)**

---

### 🔧 Tech-Stack & Infrastruktur

* **Frontend:** Next.js (Pages Router)
* **Styling:** Tailwind CSS
* **Backend:** API-Routen in Next.js, Serverless Functions
* **Deployment:** GitHub Codespaces im Browser + Vercel
* **Domain:** [https://pferdewert.de](https://pferdewert.de) (live, produktiv)
* **CI/CD:** GitHub + `main` Branch als Deploy-Ziel bei Vercel
* **PDF-Export:** `@react-pdf/renderer`
* **Markdown-Rendering:** `react-markdown`

---

### 💳 Zahlungsabwicklung mit Stripe

* **Zahlmethoden aktiviert:** Kreditkarte, Klarna, Apple Pay, Google Wallet
* **PayPal:** Noch nicht aktiv (Business-Konto erforderlich)
* **Checkout:** Weiterleitung zu Stripe gehostetem Checkout
* **Session-Verarbeitung:** `session_id` wird im Query empfangen, Validierung erfolgt über `GET /api/session`
* **Zugriffsschutz:** Ergebnisseite nur nach erfolgreicher Zahlung sichtbar, sonst Weiterleitung zu `/bewerten`

---

---

### 📊 Analytics & Tracking

* **Google Analytics 4 (GA4)** integriert
* **Eigene Zugriffe:** über `gtag('set', 'send_to', null)` lokal deaktivierbar
* **Event-Tracking:** Conversion-Tracking bei Erfolg über `gtag('event', 'conversion')`
* **Keine Nutzung von Google Tag Manager** (bewusst modular via `lib/analytics.ts`)

---
PferdeWert.de – Projektübersicht (Technisch & Marketing)
1. Technischer Stack & Infrastruktur
Framework:
Next.js (aktuelle Version 13+) – React-basiertes Framework für SSR (Server-Side Rendering) und statische Seiten (SSG).

Programmiersprache:
TypeScript / JavaScript (TS ist empfohlen für bessere Wartbarkeit, aktuell JS möglich).

Styling:
Tailwind CSS – Utility-first CSS Framework für schnelles, responsives Styling und konsistente Design-Umsetzung.

Bildoptimierung:
next/image Komponente für automatisches Lazy Loading, Responsive Images, und Optimierung.

SEO & Performance:

Vollständige Meta-Tags (Title, Description, Open Graph, Twitter Card).

Strukturierte Daten mit JSON-LD (Schema.org WebSite).

Canonical URLs für Duplicate Content Vermeidung.

Optimierung auf Core Web Vitals mit Tailwind & Next.js.

Hosting & Deployment:
Vercel (Cloud Plattform speziell für Next.js-Projekte):

Automatische Builds und Deploys bei Push ins Git (CI/CD).

Globales CDN für schnelle Ladezeiten weltweit.

Preview Deployments für Feature-Branches.

Monitoring & Analytics (optional konfigurierbar).

Zahlungsintegration:
Stripe API (inkl. Apple Pay, Google Pay, Giropay, Klarna).

2. Frontend Komponenten & Struktur
Pages:

/index.tsx – Landing Page mit Hero, Preisbanner, Beispiel-Ergebnis, FAQs, Footer.

/bewerten – Bewertungsformular (nicht Teil dieses Snippets, aber vorhanden).

/beispiel – Beispielseite mit Musteranalyse-PDF.

Design:

Farbpalette: Blau (Hauptfarbe), Gelb (Preis-Highlight), Grautöne für Text.

Responsive Layout via Tailwind (mobile-first).

Konsistente Schriftgrößen, Abstände und Buttons mit Hover- und Fokus-States.

Call-to-Actions mehrfach platziert für Conversion.

Interaktive Elemente:

FAQ mit native <details> und <summary> für Zugänglichkeit.

Buttons mit Transition- und Hover-Effekten.

3. Marketing-relevante Features
Preis-Transparenz:
Klar kommunizierte Einmalzahlung (aktuell 4,90 € statt regulär 39 €) im Hero und Preisbanner.

Vertrauensanker:
„Von Reitern für Reiter entwickelt“ als Claim zur Zielgruppenbindung.

Conversion-Optimierung:

CTA-Buttons mit klarer Farbgebung und Hover-Effekten.

Preisbanner als visuelles Highlight.

FAQ zur Reduktion von Kaufbarrieren.

Social Sharing Metadaten und strukturierte Daten für bessere Auffindbarkeit.

Rechtliches:
Links zu Impressum und Datenschutz im Footer sind standardkonform implementiert.

4. Entwicklungs- & Betriebshinweise
Entwicklungsworkflow:

Git als Versionskontrolle.

Feature-Branches mit Preview-Deployments auf Vercel für Tests.

Code Reviews und Tests empfohlen (aktuell unklar, ob implementiert).

Performance & Optimierung:

Next.js optimiert Auslieferung automatisch via SSR/SSG.

Tailwind minimiert CSS-Größe.

Bilder optimiert durch next/image.

Vermeidung von Deprecated APIs (bspw. legacyBehavior bei Link wurde entfernt).

Barrierefreiheit:

Fokus auf zugängliche HTML-Elemente (z.B. native Details/Summary).

Alt-Texte für Bilder sind gesetzt.

Farbkontraste müssen noch geprüft und ggf. verbessert werden.

Zukünftige Erweiterungen:

Eventuell Trust-Badges und weitere Kundenbewertungen.

Newsletter-Integration.

Erweiterte SEO-Maßnahmen (Rich Snippets, Blog).

Analytics und Heatmaps für Nutzerverhalten.

5. Empfehlungen für Team
Frontend-Entwickler:

Fokus auf Tailwind-konformes Styling, saubere Komponententrennung.

Nutzung moderner Next.js Features (App Router, Middleware etc.).

Einheitliche Typisierung und Tests.

Regelmäßige Performance Checks via Lighthouse.

Marketing-Team:

Kontrolle der Content-Texte auf Conversion-Wirkung.

Monitoring der Funnel-Performance.

Pflege von Keywords und Meta-Daten.

Plan für A/B-Testing von CTAs und Preis-Texten.

