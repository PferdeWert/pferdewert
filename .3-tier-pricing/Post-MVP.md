# Post‑MVP – Upselling Plan (Basic → Pro, Pro → Premium)

Ziel: Käufer von Basic bzw. Pro maximal friktionsfrei zum Upgrade bewegen. Der Kunde zahlt nur die Differenz zum jeweiligen höheren Tier. Keine erneute Formulareingabe – wir nutzen die im MVP bereits vollständig erzeugte und in der DB gespeicherte Analyse.

---

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
- Basic→Pro: „Vollständige Analyse sofort freischalten – nur €5 Aufpreis“
- Pro→Premium: „Premium mit Foto‑Check – jetzt für €20 upgraden“
- Nach Upgrade: „Danke! Deine erweiterten Inhalte sind freigeschaltet.“

