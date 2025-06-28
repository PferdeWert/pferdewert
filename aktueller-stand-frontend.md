**Aktueller Stand PferdeWert.de – Cookie Banner & Analytics (Stand: 28.06.2025)**

---

### 🌐 Frontend

#### ✅ CookieConsent-Integration (Osano)

* ✔ Cookie-Banner korrekt initialisiert über `window.cookieconsent.initialise`
* ✔ Opt-in-Modus (DSGVO-konform)
* ✔ Barrierefrei: `role="dialog"`, `aria-live="assertive"`
* ✔ Farben & Texte CI-konform angepasst
* ✔ Zentrale Steuerung über `_app.tsx`

#### 🔹 Verbesserungen:

* ✅ Verzicht auf `display: flex !important` – automatische Steuerung durch Library
* ✅ Sanfter Fade-out über Tailwind (`opacity-0`, `transition-opacity`, `duration-200`)
* ✅ Manuelles `popup.remove()` nach 200ms als Fallback

---

### 📈 Analytics & Consent Mode

#### ✅ Status-Handling

* ✔ Klick auf "Zustimmen"/"Ablehnen" wird korrekt erkannt
* ✔ `gtag('consent','update',...)` wird bei Zustimmung korrekt ausgelöst

#### ❌ Noch offen:

* ⚠ Kein `gtag('consent','default',...)` vor Ladezeitpunkt von `gtag.js`
* ⚠ Noch kein Consent Mode v2 (Google) implementiert
* ⚠ Kein Debug via Google Tag Assistant aktiviert

---

### 🛠 Nächste Schritte (Empfehlung)

* [ ] Consent Mode v2 einführen (ad\_user\_data, ad\_personalization)
* [ ] `gtag('consent','default')` vor GTM/gtag laden
* [ ] Cookie-Banner optional in eigene Komponente auslagern
* [ ] Storybook-Integration für UX-Testbarkeit
* [ ] Lighthouse-Check nach Deployment
