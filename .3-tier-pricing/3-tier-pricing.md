# 3-Tier Pricing MVP Plan für PferdeWert.de

## Executive Summary
Implementation eines 3-stufigen Pricing-Modells für PferdeWert.de mit schlankem MVP-Ansatz:

- **Basic (14,90€)**: Preisspanne ohne detaillierte Analyse
- **Standard (24,90€)**: Aktuelle AI-Analyse (bestehender Prompt)
- **Premium (99,90€)**: AI-Vision mit Bildanalyse (zunächst als Decoy für 99€)


## Pricing Tiers Spezifikation

### Basic (14,90€) - Naming: "PferdeWert Express"
**Service:**
- Schnelle Preisspanne (Min-Max)

**Tech Implementation:**
- Neuer vereinfachter Prompt
- Separate Checkout Option

### Standard (24,90€) - Naming: "PferdeWert Professional"  
**Service:**
- Bestehende KI-Analyse
- Aktuelles detailliertes PDF, siehe Beispiel-Analyse
- Marktvergleich und Trends
- Status quo beibehalten

**Tech Implementation:**
- Bestehender Code verwenden
- Minimale Anpassungen
- Migration der aktuellen Funktionalität

### Premium (49,90€/99,90€) - Naming: "PferdeWert KI-Vision" (BETA)
**Service (Decoy zunächst):**
- Versprechung: Multi-Foto AI-Analyse

**Tech Implementation:**
- Upload Interface (funktional) (Erster Schritt MVP Bilder per Mail oder Upload auf externem Service)
- Payment Processing (funktional)
- Placeholder für KI-Vision
- Refund Process (über Stripe, müssen wir nichts implementieren)


### Frontend Developer (@pferdewert-frontend-dev)
**Aufgaben:**
- Pricing Page UI/UX Design
- Checkout Flow für 3 Tiers
- Mobile Responsiveness
- Component Architektur
- Existing Code Reuse Analysis

**Deliverable:** `frontend-architecture-pricing.md`


## Architecture Overview

### Frontend Changes Needed

Ich nutze für alle 3 das gleiche Formular.

pages/
├── bewertung/
│   ├── basic.tsx      (NEW - simplified form)
│   ├── standard.tsx   (EXISTING - minimal changes)  
│   ├── premium.tsx    (NEW - with upload UI)
│   └── pricing.tsx    (NEW - tier comparison)
components/
├── pricing/
│   ├── TierCard.tsx   (NEW)
│   ├── PricingTable.tsx (NEW)
│   └── UpgradeModal.tsx (NEW)
```

### Backend Changes Needed
```
api/
├── bewertung/
│   ├── basic.ts       (NEW - simple pricing logic)
│   ├── standard.ts    (EXISTING - current logic)
│   └── premium.ts     (NEW - decoy + future AI-vision)
├── payment/
│   └── tiers.ts       (UPDATE - multi-tier pricing)
```

Bisher: 
Was wurde umgesetzt:

  📱 Mobile-First PricingCarousel:
  - Horizontales Carousel mit Touch-Gestures und Scroll-Snap
  - Standard Tier ist gehighlightet und erscheint zuerst beim Scrollen
  - Kleine, schöne Boxen (85% Breite) wie bei Zendesk
  - Navigation Dots für einfache Orientierung

  🎯 Wiederverwendbare Komponente:
  - components/pricing/PricingCarousel.tsx - komplett modular
  - TypeScript Interfaces für alle Pricing Tiers
  - Kann auf anderen Pages eingebunden werden

  📄 Komplette Preise-Seite:
  - /pages/preise.tsx mit Hero, Benefits, FAQ und CTA Sections
  - SEO-optimiert mit Meta-Tags und Schema.org
  - Stripe Payment Integration vorbereitet

  🎨 PferdeWert Design System:
  - Folgt bestehende Design-Patterns und Tailwind-Konfiguration
  - Responsive: Mobile Carousel, Desktop 3-Spalten Grid
  - Accessibility und Touch-Optimierung