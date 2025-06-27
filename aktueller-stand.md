**Projektstand PferdeWert (Stand: Juni 2025)**

---

### 🔧 Tech-Stack & Infrastruktur

* **Frontend:** Next.js (Pages Router)
* **Styling:** Tailwind CSS
* **Backend:** API-Routen in Next.js, Serverless Functions
* **Datenhaltung:** Firestore (Firebase) für Bewertungen & Sessions
* **Auth & Session Mgmt:** Session-ID via Stripe Metadata
* **Deployment:** GitHub Codespaces + Vercel
* **Domain:** [https://pferdewert.de](https://pferdewert.de) (live, produktiv)
* **CI/CD:** GitHub + `main` Branch als Deploy-Ziel bei Vercel
* **PDF-Export:** `@react-pdf/renderer`
* **Markdown-Rendering:** `react-markdown`

---

### 💳 Zahlungsabwicklung mit Stripe

* **Zahlmethoden aktiviert:** Kreditkarte, Klarna, Apple Pay, Google Wallet, Amazon Pay
* **PayPal:** Noch nicht aktiv (Business-Konto erforderlich)
* **Checkout:** Weiterleitung zu Stripe gehostetem Checkout
* **Session-Verarbeitung:** `session_id` wird im Query empfangen, Validierung erfolgt über `GET /api/session`
* **Zugriffsschutz:** Ergebnisseite nur nach erfolgreicher Zahlung sichtbar, sonst Weiterleitung zu `/bewerten`

---

### 📈 SEO & Metadaten

* **Alle Hauptseiten optimiert:**

  * `index`, `bewerten`, `beispiel-analyse` ✓
  * mit `<title>`, `<meta name="description">`, Open Graph, Twitter Cards, JSON-LD strukturiert
  * `rel="canonical"` jeweils korrekt gesetzt
* **Ergebnisseite:** `noindex, nofollow` via `<meta name="robots">`
* **Sitemap & robots.txt:** Noch nicht vorhanden (Empfehlung: `next-sitemap`)

---

### 📊 Analytics & Tracking

* **Google Analytics 4 (GA4)** integriert
* **Eigene Zugriffe:** über `gtag('set', 'send_to', null)` lokal deaktivierbar
* **Event-Tracking:** Conversion-Tracking bei Erfolg über `gtag('event', 'conversion')`
* **Keine Nutzung von Google Tag Manager** (bewusst modular via `lib/analytics.ts`)

---

### 📝 Inhalt & Positionierung

* **Startseite:**

  * Hero: USP-basiertes Value-Prop "Jetzt den Pferdewert & Preis online berechnen"
  * Optimiert auf Keywords: "Pferdebewertung", "Pferdekauf", "Pferdeverkauf"
* **Bewerten-Page:** Optimiert auf Conversion, klarer CTA zur Stripe-Weiterleitung
* **Beispiel-Analyse:** Content-Rich mit Markdown-gestütztem Beispiel inkl. Preisspanne, Abstammung etc.
* **Ergebnis-Page:**

  * Dynamisch über Markdown
  * PDF-Export der KI-Analyse möglich
  * Nach Zahlung automatisch erreichbar

---

### 🚀 Aktueller Fokus & Nächste Schritte

* **Indexierung über Google Search Console** initial angestoßen (manuell für alle relevanten Seiten)
* **Nächster Schritt:** Setup von automatisierten End-to-End Tests (z. B. mit Playwright)
* **Optional:**  Performance-Monitoring (Core Web Vitals)


Aktueller Projektstand (basierend auf deinen Inputs)
1. Website / Landingpage
Klar fokussierte Startseite mit CTA „Jetzt Pferdewert berechnen“

Headline und Subline klar strukturiert, gut typografisch abgestimmt

Bullet-Points mit Social Proof und Nutzenkommunikation

Stimmige Farbgestaltung, die Vertrauen schafft (Brandfarben Blau, Gold, Grün)

Hero Image passend und professionell eingebunden

Ablauf-Sektion erklärt Nutzerprozess klar und verständlich

FAQ-Bereich beantwortet wichtige Kundenfragen

Beispiel-Ergebnis zeigt Transparenz und erhöht Glaubwürdigkeit

Social Proof-Sektion mit Bewertungen, DSGVO-Hinweis und KI-Verweis

2. SEO & Meta
Title und Meta Description optimiert, stark auf Conversion & Keywordfokus ausgerichtet

Open Graph und Twitter Cards sauber implementiert

Strukturierte Daten für Website und einzelne Seiten implementiert

Canonical Tags gesetzt, um Duplicate Content zu vermeiden

3. Technik & UX
Next.js-Framework mit modernem Image-Handling

Formulare mit Validierung, Pflichtfeldern und User-Feedback

Consent-Checkbox zur rechtssicheren Einwilligung

Ladezustände und Fehlerbehandlung implementiert

Klare Call-to-Actions und übersichtliche Nutzerführung

💡 Empfehlungen & Ergänzungen
A. Conversion-Optimierung
A/B-Testing für Headlines, Subline und CTA-Farben / Texte starten

Mehr Nutzer-Feedback integrieren (z. B. Testimonials oder Ratings in Hero)

Vertrauensanker (z. B. „DSGVO-konform“ oder „Sicher & anonym“) prominent im Hero platzieren

B. Content & Storytelling
Storytelling-Elemente ergänzen: Warum „Pferdewert“? Was macht den Service besonders?

Mehr FAQ-Punkte aufnehmen, vor allem zu Sicherheit und Datenverarbeitung

Blog/News-Bereich zur Markenpositionierung & SEO aufbauen

C. Technische Skalierung & Monitoring
Performance-Optimierung mit Lighthouse-Checks regelmäßig durchführen

Tracking-Setup (Google Analytics, ggf. Hotjar für Heatmaps)

Automatisierte Tests (Unit, Integration, E2E) für Formulare und Seiten

D. Rechtliche Absicherung
Datenschutz (DSGVO) prüfen, ggf. Cookie-Management ergänzen

Impressum & AGB vollständig und gut verlinkt