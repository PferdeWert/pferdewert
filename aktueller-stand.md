## Projektstatus: PferdeWert.de (Stand: 26.06.2025)

### Ziel

Bereitstellung eines MVP zur Online-Pferdebewertung, der anonym, einfach und schnell eine Marktwert-Schätzung liefert – mit Fokus auf Conversion, UX und rechtliche Absicherung.

---

### 1. **Landing Page (/index.tsx)**

* ✅ Hero mit starkem H1: "Was ist dein Pferd wert?"
* ✅ Klare Bullet Points mit Trust-Faktoren (u. a. "Zahlreiche zufriedene Pferdebesitzer")
* ✅ Preis im Text nicht erwähnt (nur auf Bewertungsseite)
* ✅ SEO-optimierte Metadaten: Titel, Beschreibung, OG-Tags
* ✅ Responsive mit CTA "Pferd jetzt bewerten"
* 🔍 Noch offen: Optionale Mikro-Copy für SEO-Feintuning (z. B. H2 für Keywords)

### 2. **Bewertungsformular (/bewerten.tsx)**

* ✅ Felder mit sinnvoll gewählten Platzhaltern (z. B. "Cornet x Contender")
* ✅ Pflichtfeldprüfung + UX-Hinweis bei fehlender Zustimmung
* ✅ Einwilligung zu sofortigem Leistungsbeginn (§356 BGB) korrekt eingebaut
* ✅ Preis klar kommuniziert: "einmalig 4,90 €"
* ✅ DSGVO-freundlich: "Keine Anmeldung nötig – anonym & sicher"
* ✅ Fehlerbehandlung + Stripe-Redirect implementiert
* 🔍 Noch offen: Optional weitere Beispiele / Validierung (z. B. Eingabefilter)

### 3. **Technik & Struktur**

* ✅ TypeScript sauber typisiert (inkl. Fix für dynamisches `form[field.name]`)
* ✅ Projektstruktur folgt Next.js-Konventionen
* ✅ Deployment-Ready für MVP

### 4. **Nächste Schritte**

* 🔜 Review der Seite **/ergebnis.tsx**
* 🔜 Optional: Cookie-Banner + Datenschutzerklärung prüfen
* 🔜 Optional: Validierungsregeln verfeinern
* 🔜 Go-Live vorbereiten (z. B. Stripe Live Key, Domain, Hosting)

---

Bei Fragen oder nächsten Features (z. B. Bewertungsergebnisse als Link speichern, Datenbankanbindung) jederzeit Bescheid geben.
