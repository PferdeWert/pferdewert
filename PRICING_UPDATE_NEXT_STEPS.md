# 🚀 Preiserhöhung: 9,90€ → 14,90€ 
## Entwicklerdokumentation & Next Steps

**Status:** ✅ Analysiert | 🔄 Bereit für Implementation  
**Stripe Price-ID:** `price_1RuFlMKoHsLHy9OTPv9tRBa0` (14,90€)  
**Datum:** 09.01.2025  

---

## 📊 **STRIPE KONFIGURATION**

### Neue Price-ID Details:
```json
{
  "id": "price_1RuFlMKoHsLHy9OTPv9tRBa0",
  "object": "price",
  "active": true,
  "unit_amount": 1490,        // = 14,90€ 
  "currency": "eur",
  "type": "one_time",
  "product": "prod_Sdzp07K4N62iyU",
  "livemode": true
}
```

### Aktuelle vs. Neue Konfiguration:
- **ALT:** `price_1RcPCqKoHsLHy9OTgyOJMLSU` (9,90€)
- **NEU:** `price_1RuFlMKoHsLHy9OTPv9tRBa0` (14,90€)

---

## 🎯 **ÄNDERUNGSLISTE (VOLLSTÄNDIG)**

### **1. ENVIRONMENT VARIABLEN** ⚡ KRITISCH
```bash
# /frontend/.env.local (Development)
STRIPE_PRICE_ID=price_1RuFlMKoHsLHy9OTPv9tRBa0  # NEU

# Vercel Dashboard (Production) 
# Settings → Environment Variables → STRIPE_PRICE_ID
# Wert ersetzen mit: price_1RuFlMKoHsLHy9OTPv9tRBa0
```

### **2. FRONTEND ÄNDERUNGEN** 
#### `/frontend/pages/was-ist-mein-pferd-wert.tsx`

**6 Stellen müssen geändert werden:**

```typescript
// ZEILE 31: Mobile Sticky Button
"Jetzt Pferd bewerten → 9,90€" 
→ "Jetzt Pferd bewerten → 14,90€"

// ZEILE 102: FAQ Antwort 
"kostet aktuell 9,90 Euro"
→ "kostet aktuell 14,90 Euro"

// ZEILE 156: Schema.org Structured Data
"price": "9.90"
→ "price": "14.90"

// ZEILE 206: CTA Button (Hero Section)
"Jetzt 9,90€-Analyse starten"
→ "Jetzt 14,90€-Analyse starten"

// ZEILE 329: CTA Button (Features Section)
"Jetzt 9,90€-Analyse starten" 
→ "Jetzt 14,90€-Analyse starten"

// ZEILE 365: CTA Button (FAQ Section)
"Jetzt 9,90€-Analyse starten"
→ "Jetzt 14,90€-Analyse starten"
```

### **3. DOKUMENTATION UPDATES**

#### `/FRONTEND_CODING_GUIDELINES.md`
**4 Stellen mit veralteten Preisreferenzen:**
- Zeile 231: Event-Tracking Beispiel (4,90€)
- Zeile 284: Button Text Beispiel (4,90€) 
- Zeile 380: React Component Test (4,90€)
- Zeile 382: Jest Test Assertion (4,90€)

#### `/.claude/agents/pferdewert-business-analyst.md`
- Preiskalkulationen in Agent-Prompts aktualisieren

#### `/.claude/agents/pferdewert-frontend-dev.md` 
- Zeile 11: Preisreferenz in Beispielen

#### `/aktueller-stand.md`
- Zeile 132: Projektübersicht Preisangabe

---

## 🛠️ **IMPLEMENTATION SCHRITTE**

### **Phase 1: Environment (SOFORT)**
```bash
# 1. Development Environment
cd frontend
# Ändere .env.local Zeile 9:
STRIPE_PRICE_ID=price_1RuFlMKoHsLHy9OTPv9tRBa0

# 2. Production Environment  
# Vercel Dashboard → Settings → Environment Variables
# STRIPE_PRICE_ID → price_1RuFlMKoHsLHy9OTPv9tRBa0
```

### **Phase 2: Frontend Code**
```bash
# Mit Gemini CLI für Performance:
cd frontend

# Bulk-Replace in was-ist-mein-pferd-wert.tsx
sed -i 's/9,90€/14,90€/g' pages/was-ist-mein-pferd-wert.tsx
sed -i 's/9,90 Euro/14,90 Euro/g' pages/was-ist-mein-pferd-wert.tsx  
sed -i 's/"9.90"/"14.90"/g' pages/was-ist-mein-pferd-wert.tsx

# Validation
npm run type-check && npm run lint
```

### **Phase 3: Dokumentation** 
```bash
# Guidelines aktualisieren
sed -i 's/4,90€/14,90€/g' FRONTEND_CODING_GUIDELINES.md

# Agent-Konfigurationen
find .claude/agents -name "*.md" -exec sed -i 's/9,90/14,90/g' {} \;

# Projekt-Docs  
sed -i 's/9,90€/14,90€/g' aktueller-stand.md
```

### **Phase 4: Testing**
```bash
# Lokaler Test
npm run dev
# → http://localhost:3000/was-ist-mein-pferd-wert
# → Alle Preise auf 14,90€ prüfen

# Checkout-Flow testen
# → Stripe Checkout sollte 14,90€ anzeigen

# Production Deploy & Test
vercel --prod
```

---

## ✅ **VALIDATION CHECKLIST**

- [ ] **Environment**: `.env.local` Price-ID aktualisiert
- [ ] **Vercel**: Production Environment Variable gesetzt
- [ ] **Frontend**: Alle 6 Stellen in was-ist-mein-pferd-wert.tsx geändert
- [ ] **Schema.org**: Structured Data Preis korrekt (14.90)
- [ ] **Stripe**: Checkout zeigt €14,90 an
- [ ] **TypeScript**: `npm run type-check` erfolgreich  
- [ ] **ESLint**: `npm run lint` ohne Warnings
- [ ] **Visuell**: Alle Buttons und Texte zeigen 14,90€
- [ ] **Mobile**: Sticky Button korrekt
- [ ] **FAQ**: Preisangabe in FAQ korrekt

---

## 🚨 **WICHTIGE HINWEISE**

### **Decoy-Preis bleibt unverändert:**
- 39€ Referenzen **NICHT** ändern
- Diese dienen als Anker-Preis

### **Backend:**
- ✅ **Keine Änderungen nötig** - Backend ist preis-agnostic
- Stripe Webhook verarbeitet automatisch neue Price-ID

### **Tests:**
- ✅ **Keine Test-Updates nötig** - keine Preislogik in Tests

### **Rollback-Plan:**
```bash
# Falls Probleme auftreten:
# 1. Environment Variable zurücksetzen
STRIPE_PRICE_ID=price_1RcPCqKoHsLHy9OTgyOJMLSU

# 2. Git Revert
git revert HEAD

# 3. Vercel Re-Deploy
vercel --prod
```

---

## ⏱️ **ZEITSCHÄTZUNG**
- **Environment Setup**: 5 Minuten
- **Code-Änderungen**: 10 Minuten  
- **Dokumentation**: 5 Minuten
- **Testing & Validation**: 10 Minuten
- **Production Deploy**: 5 Minuten
- **TOTAL**: ~35 Minuten

---

## 📞 **SUPPORT**
Bei Problemen:
1. Stripe Dashboard: https://dashboard.stripe.com/products
2. Vercel Environment: https://vercel.com/pferdewert/settings/environment-variables
3. Lokaler Test: `npm run dev` in `/frontend`

**Ready to deploy! 🚀**