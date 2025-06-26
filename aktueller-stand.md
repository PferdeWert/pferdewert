**Projekt: PferdeWert – Online Pferdebewertung**

**Technischer Gesamtstand (Stand: 26.06.2025)**

---

### 1. Architektur & Infrastruktur

* **Frontend:** Next.js App mit TailwindCSS.
* **Backend/API:** Next.js API-Routen.
* **Datenbank:** MongoDB (extern gehostet, angebunden über `getCollection()`).
* **Zahlung:** Stripe Checkout mit Webhook.
* **Deployment:**

  * Vercel (Frontend + API)
  * Render (Backend für KI-Auswertung `/api/bewertung`)

### 2. Wichtige Features

* Nutzer gibt Pferdedaten über `/bewerten` ein.
* Session wird per Stripe Checkout erstellt (`/api/checkout`).
* Nach Bezahlung Redirect zu `/ergebnis?session_id=...`.
* Webhook (`/api/webhook`) verarbeitet Stripe-Event `checkout.session.completed`.
* Bewertungsdaten werden an Render-API gesendet, GPT-Ergebnis wird gespeichert.
* PDF-Download auf `/ergebnis` via `@react-pdf/renderer`.

### 3. Technische Integrationen

* **Stripe:**

  * `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` in `.env`
  * Webhook erwartet exakte Secret-Validierung.
  * Webhook sendet Session-Daten an Render-API bei Erfolg.
* **MongoDB:** Dokument wird mit Session-ID gespeichert, dann bei GPT-Rückgabe aktualisiert.
* **OpenAI / GPT:** Response wird persistiert und für PDF verwendet.

### 4. Aktuelle Probleme (26.06.2025)

1. **Webhook liefert 401**

   * Stripe meldet: „Signature verification failed“.
   * Ursache: Lokale Umgebungsvariable `STRIPE_WEBHOOK_SECRET` stimmt evtl. nicht mit Stripe-Webhook überein.
   * Möglicherweise kein Zugriff auf korrekte Secret in Vercel oder lokale Umgebung.

2. **Bewertung wird nicht erzeugt**

   * Log zeigt: Mongo-Dokument wird korrekt gespeichert (`Session gespeichert`).
   * API `/api/bewertung` wird mit `id` abgefragt, liefert aber 404 (nicht gefunden).
   * Mögliche Ursachen:

     * Webhook hat Bewertung nicht gesendet (siehe Punkt 1).
     * Render API liefert kein `raw_gpt` oder Fehler.

3. **Vercel verweigert POST auf `/api/checkout` mit 405**

   * Ursache unklar, möglicherweise fehlende Authentifizierung oder fehlerhafte Konfiguration in Vercel-Umgebung.

4. **Environment Confusion bei Vercel**

   * Erwartung: Deploy auf main = Production Vars.
   * Tatsächlich: Vercel verwendet teilweise Preview Environment.
   * → Dadurch evtl. falsche Stripe-Keys / Webhook-Secrets.

### 5. Debug-Maßnahmen bereits erfolgt

* Manuelles Logging eingefügt (Headers, ENV).
* Überprüfung Webhook-Zustellung in Stripe.
* Getestet mit Stripe-Testdaten.
* Manuelle Session-ID-Tests lokal und in Vercel.

### 6. Empfehlungen (Next Steps)

* Sicherstellen, dass Vercel `Production Environment` korrekt konfiguriert ist.
* Überprüfen, ob `STRIPE_WEBHOOK_SECRET` exakt mit Stripe-Webhook-übereinstimmt.
* Testweise Webhook lokal via `stripe listen` und `ngrok` forwarden.
* Render-API auf Logs prüfen (Rückgabe `raw_gpt`).
* End-to-End Test mit Stripe-Testumgebung + verifizierter Datenbankverbindung.
