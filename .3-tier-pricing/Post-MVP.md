# Post‑MVP – Upselling Plan (Basic → Pro, Pro → Premium)

Ziel: Käufer von Basic bzw. Pro maximal friktionsfrei zum Upgrade bewegen. Der Kunde zahlt nur die Differenz zum jeweiligen höheren Tier. Keine erneute Formulareingabe – wir nutzen die im MVP bereits vollständig erzeugte und in der DB gespeicherte Analyse.

---

Als erstes nach dem Formular die Möglichkeit geben nochmal den Tier zu wechseln, evtl machen da schin welche Upselling!

## 1) Ziele & Prinzipien
- Einfach: Minimal-invasiv, ohne Over‑Engineering; bestehende Flows wiederverwenden.
- Friktionsarm: 1–2 Klicks vom Ergebnis zur Zahlung, sofortige Freischaltung.
- Fair: Betrag = Differenz zwischen Ziel‑Tier und bereits gezahltem Tier.
- Sicher: Server‑seitiges Prüfen der Upgrade‑Berechtigung; Read‑Tokens.
- Messbar: Klare Events und Conversion‑Ziele für Optimierung.

---

## 2) UX‑Flow (Web)
- Ergebnisseite (Basic):
  - Sichtbar gesperrte Abschnitte zeigen Preview + Nutzenargumente.
  - Deutliche CTA: „Vollständige Analyse freischalten für €5 (Basic→Pro)“.
  - CTA klick → Stripe Checkout (Upgrade‑Price) → Redirect zurück zur Ergebnisseite (nun Pro freigeschaltet).
- Ergebnisseite (Pro):
  - CTA zum Premium‑Upgrade: „Premium inkl. Foto‑Check für €20 freischalten“.
  - Nach Zahlung: Ergebnisseite zeigt Premium‑Status + Anweisung/Link zum Foto‑Upload (manuell via Google Form, bis Automatisierung von Tier 3 steht).
- E‑Mail:
  - Direkt nach Basic‑Ergebnis: E‑Mail mit Deep‑Link „Pro‑Upgrade für €5 freischalten“.
  - Optional (später): 24h Follow‑up, falls kein Upgrade.

Hinweis: Kein erneutes Formular – wir verwenden dieselbe `analysis_id` und entsperren Inhalte tier‑abhängig.

---

## 3) Pricing & Stripe Setup (ohne Over‑Engineering)
- Feste Upgrade‑Preise als eigene Stripe Prices anlegen:
  - `Upgrade Basic → Pro`: Preis = `Pro − Basic` (aktuell €5.00)
  - `Upgrade Pro → Premium`: Preis = `Premium − Pro` (aktuell €20.00)
- Vorteile: Keine dynamischen Coupons, einfache Abrechnung, geringes Fehler‑/Abuse‑Risiko.
- Env Vars ergänzen:
  - `STRIPE_PRICE_ID_UPGRADE_BASIC_TO_PRO`
  - `STRIPE_PRICE_ID_UPGRADE_PRO_TO_PREMIUM`
- Checkout‑Session‑Metadata (für Webhook):
  - `mode=upgrade`, `upgrade_from`, `upgrade_to`, `analysis_id`, `original_payment_id`.

---

## 4) Backend (kleine Erweiterungen)
- Bestehende Checkout‑Route erweitern (kein neuer Endpoint nötig):
  - Neuer Parameter: `mode: 'upgrade'`, `target_tier: 'pro' | 'premium'`, `analysis_id`.
  - Serverseitige Checks:
    - `analysis_id` existiert und gehört zur Session/Read‑Token.
    - Aktuell gekauftes Tier (`purchased_tier`) erlaubt die gewünschte Upgrade‑Richtung.
  - Auswahl des korrekten Stripe‑Preis‑IDs je Upgrade‑Richtung.
  - Session‑Metadata wie oben setzen.
- Webhook (`checkout.session.completed`):
  - Wenn `mode=upgrade`: `purchased_tier` auf `upgrade_to` erhöhen, `current_tier` synchronisieren.
  - `payments[]` um `payment_id`, `upgrade_from`, `upgrade_to`, `ts` ergänzen.
  - Optional: neuen Read‑Token für `upgrade_to` generieren (oder vorhandenen Token erweitern).

DB (keine Schema‑Überholung, nur Felder konsistent nutzen):
- Bereits vorhanden: `purchased_tier`, `current_tier`, vollständige Analyse (alle Tiers) pro `analysis_id`.
- Ergänzend (optional, flach): `payments: {payment_id, tier, mode, upgrade_from?, upgrade_to?, ts}[]`.

---

## 5) Frontend (kleine Anpassungen)
- Ergebnisseite `pages/ergebnis.tsx`:
  - Gated‑Blöcke mit Upgrade‑Preview und Nutzenliste versehen (Basic → Pro).
  - Feste CTA‑Buttons (kein neuer Flow): Aufruf der bestehenden Checkout‑Action mit `mode='upgrade'` + `target_tier`.
  - Nach erfolgreichem Redirect: UI zeigt entsperrte Abschnitte (Pro/Premium). Optional: Toast „Upgrade erfolgreich – Inhalte freigeschaltet“.
- Reuse Komponenten:
  - `TierSelectionModal.tsx` optional als „UpgradeModal“ verwenden (Text/CTA anpassen) – oder direkt Button ohne Modal.
  - `analysisSplitter` und Tier‑Gating unverändert nutzen.

---

## 6) Sicherheit & Missbrauchsvermeidung
- Server prüft Upgrade‑Berechtigung (z. B. Basic darf nur → Pro; Pro nur → Premium).
- Preise nur serverseitig auswählbar (keine clientseitigen Price‑IDs).
- Read‑Token an `analysis_id` gebunden; nach Upgrade neuer Token (optional) mit höherem Tier.
- Webhook ist Quelle der Wahrheit für Tier‑Freischaltung.

---

## 7) Analytics & Erfolgsmessung
- Events (Naming an bestehende Telemetrie anlehnen):
  - `upsell_cta_viewed` (tier, location: header/inline/sticky)
  - `upsell_cta_clicked` (from_tier, to_tier)
  - `begin_checkout_upgrade` (from_tier, to_tier)
  - `upgrade_success` (from_tier, to_tier, amount)
  - `upgrade_fail` (reason)
- KPI‑Ziele (erste Iteration):
  - View→Click > 15%, Click→Paid > 35%, Net Upgrade‑Rate Basic→Pro > 8%.

---

## 8) E‑Mail‑Erweiterungen (leicht)
- Basic Kaufbestätigung: Block „Pro für €5 freischalten“ + Deep‑Link (mit `analysis_id` + Token → Ergebnisseite, Upgrade‑CTA im Sichtfeld).
- Pro Kaufbestätigung: „Premium für €20“ + Deep‑Link.
- Nach Upgrade: Bestätigung + Link zur entsperrten Ergebnisansicht; bei Premium zusätzlich Google‑Form‑Link.

---

## 9) Edge Cases
- Bereits Pro/Premium: Upgrade‑CTA nicht anzeigen / disabled.
- Mehrfachkauf/Reload: Idempotenz via Webhook + `payments`‑Historie.
- Preisänderungen: Solange feste Upgrade‑Prices genutzt werden, bitte beide Upgrade‑Prices mit anpassen.
- Währung: Annahme EUR; bei Multicurrency später zusätzliche Upgrade‑Prices anlegen.
- Refund/Chargeback: Bei Rückerstattung höheres Tier ggf. wieder herabstufen (separate Policy).

---

## 10) QA‑Plan (manuell, schnell)
- Basic→Pro:
  - CTA sichtbar, Preis korrekt (€5), Checkout erstellt, Redirect zurück, Pro‑Inhalte sofort sichtbar.
- Pro→Premium:
  - CTA sichtbar, Preis korrekt (€20), Checkout erstellt, Redirect zurück, Premium‑Status aktiv, E‑Mail mit Foto‑Upload‑Link.
- Token‑/Sicherheits‑Checks: Fremde `analysis_id` wird serverseitig abgelehnt.
- Events feuern korrekt; Funnels in Analytics sichtbar.

---

## 11) Rollout & Feature Flag
- Gate über `NEXT_PUBLIC_UPSELL_ENABLED=true` (Frontend) + `UPSELL_ENABLED=true` (Backend), damit schrittweise aktivierbar.
- Soft‑Launch: 20% Traffic; Monitoring; dann 100%.

---

## 12) Umsetzungsschritte (klein & wiederverwendend)
1) Stripe: Zwei Upgrade‑Prices anlegen; Env‑Vars setzen.
2) Backend: Checkout‑Route um `mode='upgrade'` + `target_tier` + Checks erweitern; Webhook‑Update.
3) Frontend: Ergebnis‑CTAs + optional UpgradeModal; Redirect‑Handling.
4) E‑Mail: Templates für Upgrade‑Hinweise/Bestätigungen ergänzen.
5) Analytics: Events hinzufügen, Dashboard‑Widget.
6) FF an, Soft‑Launch, QA, Rollout.

Grobschätzung: 0.5–1 PT Engineering, 0.5 PT Content/Stripe/QA.

---

## 13) Copy‑Vorschläge (kurz)
- Basic→Pro: „Vollständige Analyse sofort freischalten – nur €5 Aufpreis"
- Pro→Premium: „Premium mit Foto‑Check – jetzt für €20 upgraden"
- Nach Upgrade: „Danke! Deine erweiterten Inhalte sind freigeschaltet."

---

# Premium Upload System - Professional Image Upload (v2.0)

## Current Problem
- Unprofessional Dropbox link (`https://www.dropbox.com/request/XLF5Z1TW1S9qHDYk2Phc`)
- External dependency on personal Dropbox
- Poor user experience
- No upload progress feedback

## Simple Architecture Plan (NO OVER-ENGINEERING)

### 1. File Storage Solution
**Decision: Hetzner Server + Simple File System**
- Use existing Hetzner server (167.235.233.90)
- Simple directory structure: `/uploads/premium/{session_id}/`
- No complex CDN needed initially
- Direct file system storage (cheap & reliable)

**Why NOT Firebase/Supabase:**
- Current stack is FastAPI + Hetzner
- Adding third-party increases complexity
- File system storage is sufficient for MVP+
- Can migrate later if needed

### 2. Database Requirements
**Decision: NO database needed initially**
- Store upload metadata as JSON files alongside images
- Format: `{session_id}.json` with upload details
- Simple file-based tracking sufficient for start
- Can add MongoDB Atlas later for analytics

**Data Flow:**
```
1. User uploads → Hetzner `/uploads/premium/{session_id}/`
2. Create metadata → `{session_id}.json`
3. Email notification with session_id
4. Manual processing workflow
```

### 3. Implementation Plan

#### Backend (FastAPI)
```python
# New endpoint: POST /api/upload/premium
- Accept multiple files (max 5)
- Generate unique session_id
- Store in /uploads/premium/{session_id}/
- Create metadata JSON
- Send email notification
```

#### Frontend (React)
```tsx
// Replace PremiumUploadScreen.tsx Dropbox link
- Modern drag & drop zone
- File preview before upload
- Progress bar during upload
- Success confirmation
```

#### Nginx Configuration
```nginx
# Add file upload limits
client_max_body_size 50M;
```

### 4. Technical Specifications

**File Handling:**
- Max file size: 10MB per image
- Max total: 5 images per session
- Allowed formats: JPG, PNG, HEIC
- Auto-resize to max 2048px width

**Security:**
- Generate secure session IDs (UUID4)
- Validate file types server-side
- Rate limiting on upload endpoint
- Clean up old uploads (30-day retention)

**Error Handling:**
- Network failures → auto-retry
- File too large → clear error message
- Server full → graceful fallback

### 5. Implementation Steps

1. **Backend Upload Endpoint** (2 hours)
   - FastAPI route with file handling
   - Directory creation & metadata storage

2. **Frontend Upload Component** (3 hours)
   - Replace Dropbox link with upload zone
   - Progress feedback & error handling

3. **Email Integration** (1 hour)
   - Notification system for new uploads
   - Include session_id in email

4. **Hetzner Server Setup** (1 hour)
   - Create upload directories
   - Set proper permissions
   - Configure Nginx

**Total Effort: ~7 hours**

### 6. Future Enhancements (Post-Implementation)

**Phase 2:**
- MongoDB Atlas integration for analytics
- Upload history in user dashboard
- Automatic image optimization

**Phase 3:**
- AI-powered image quality checks
- Integration with premium analysis pipeline
- Real-time processing status

### Benefits of This Approach
- ✅ **Simple**: Uses existing infrastructure
- ✅ **Professional**: Custom domain upload experience
- ✅ **Fast**: No third-party API dependencies
- ✅ **Cost-effective**: No additional cloud storage costs
- ✅ **Maintainable**: Minimal complexity increase
- ✅ **Scalable**: Can enhance incrementally

### Migration Path
Current → File-based → MongoDB Atlas (if needed)
- Start simple with file system
- Add database when traffic justifies complexity
- Keep upgrade path open

---

*Plan follows "Keep it Simple" principle - solve the immediate problem (unprofessional Dropbox) with minimal complexity while maintaining upgrade flexibility.*

