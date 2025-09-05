# PferdeWert 3-Tier Pricing – MVP Status & Launch Plan (Kurzfassung)

## 🎯 Aktueller Stand
Stand: 4. September 2025 – PRODUCTION READY ✅

### Implementiert (Essentials)
- 3 Tiers (Basic €14.90, Pro €19.90, Premium €39.90)
- **MVP Flow**: Homepage CTA → /preise → Tier Selection → Form (proven flow, enforced)
- ~~Alternative Flow~~ (REMOVED from MVP - postponed to Step 2 post-MVP)
- Session-Persistenz (30min TTL) und sichere Read-Tokens
- Content-Gating für Basic (marker-basiert)
- Stripe Checkout + Webhooks; Mongo: `purchased_tier`/`current_tier`
- Frontend: TierSelectionModal, Unified Form, Preise, Ergebnis
- Type/Lint grün; Structured Logging

---

## 🚀 MVP Launch – To-Dos (kompakt)
- Stripe: Produkte + Price IDs (Test und Live) anlegen
- Env Vars setzen:
```env
STRIPE_PRICE_ID_BASIC=...
STRIPE_PRICE_ID_PRO=...
STRIPE_PRICE_ID_PREMIUM=...
```
- Premium (manuell): Google Form für Foto-Upload erstellen und in Success-Page + E-Mail verlinken
- Analytics-Events prüfen: `pricing_tier_loaded_on_form`, `tier_selection_modal_shown`, `tier_selected_from_modal`, `begin_checkout_tier`
- Deploy: Branch `pricing` → `main` mergen; `npm run sitemap`; push

---

## 📈 Business Logic (MVP)
- Basic (€14.90): Preisspanne + Marktübersicht (~30%); Cut bei „## Preisfaktoren im Detail“
- Pro (€19.90): Vollständige AI-Analyse + PDF
- Premium (€39.90): Pro + Foto-Upload + Exterieur; MVP: manueller Google-Forms-Workflow

---

## 🔄 Nächste Schritte (Post-MVP)
- Step 2 – Alternative UX Flow & Upselling
  - Alternative Flow: TierSelectionModal + direct form entry ohne Tier-Preselection (komplett re-implementieren)
  - Basic → Pro Upgrade-Angebote nach Ergebnisansicht
  - Optional: günstiger Upgrade-Preis statt Neukauf
  - E-Mail‑basierte Upsell-Triggers
- Step 3 – Automatisierung Tier 3
  - Direkter Foto-Upload im Produkt
  - Vision‑AI Auswertung und automatisierter Report
  - Integration in Ergebnisseite und E-Mails

---

## 🎯 MVP Success Metrics
- Woche 1: 50% Basic / 40% Pro / 10% Premium; Conversion >15%; keine kritischen Payment/Analysis-Fehler
- Monat 1: Zufriedenheit >4.2/5; Premium Turnaround <48h; Uptime >99.5%
