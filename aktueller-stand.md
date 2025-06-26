## Projektstand: PferdeWert.de (Stand: 26.06.2025)

### Ziel

Bereitstellung eines MVP zur Online-Pferdebewertung, der anonym, einfach und schnell eine Marktwert-Schätzung liefert – mit Fokus auf Conversion, UX und rechtliche Absicherung.

---

### 1. **Landing Page (/index.tsx)**

* ✅ Hero mit starkem H1: "Was ist dein Pferd wert?"
* ✅ Klare Bullet Points mit Trust-Faktoren (u. a. "Zahlreiche zufriedene Pferdebesitzer")
* ✅ Preis im Text nicht erwähnt (nur auf Bewertungsseite)
* ✅ SEO-optimierte Metadaten: Titel, Beschreibung, OG-Tags
* ✅ Responsive mit CTA "Pferd jetzt bewerten"
* 🔍 Noch offen: Optionale Mikro-Copy für SEO-Feintuning (z. B. H2 für Keywords)

### 2. **Bewertungsformular (/bewerten.tsx)**

* ✅ Felder mit sinnvoll gewählten Platzhaltern (z. B. "Cornet x Contender")
* ✅ Pflichtfeldprüfung + UX-Hinweis bei fehlender Zustimmung
* ✅ Einwilligung zu sofortigem Leistungsbeginn (§356 BGB) korrekt eingebaut
* ✅ Preis klar kommuniziert: "einmalig 4,90 €"
* ✅ DSGVO-freundlich: "Keine Anmeldung nötig – anonym & sicher"
* ✅ Fehlerbehandlung + Stripe-Redirect implementiert
* 🔍 Noch offen: Optional weitere Beispiele / Validierung (z. B. Eingabefilter)

### 3. **Technik & Struktur**

* ✅ TypeScript sauber typisiert (inkl. Fix für dynamisches `form[field.name]`)
* ✅ Projektstruktur folgt Next.js-Konventionen
* ✅ Deployment-Ready für MVP

### 4. **APIs mit Zod validiert**

* ✅ `/api/generate.ts`: Strukturprüfung via Zod-Schema
* ✅ `/api/bewertung.ts`: Absicherung mit ObjectId-Prüfung
* ✅ `/api/session.ts`: Zod-Validierung mit Mindestlänge für `session_id`

### 5. **Cookie Consent**

* ✅ DSGVO-konformes Consent-Banner mit `react-cookie-consent` & `cookies-next`
* ✅ Blockierung externer Skripte bis Zustimmung (z. B. Google Analytics, Stripe)
* ✅ Speicherung und Widerrufsmöglichkeit der Entscheidung vorhanden

### 6. **Nächste Schritte**

* 🔜 Optional: SEO-Microcopy ergänzen
* 🔜 Stripe Live Key setzen (sofern nicht erfolgt)
* 🔜 Domain-Setup + Hosting auf Render o.ä. finalisieren

---

✅ MVP ist rechtlich, technisch und funktional startklar für den Go-Live.
