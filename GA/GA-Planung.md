# GA4 Setup für PferdeWert.de

## ✅ Status (22.08.2025)
- **Setup**: GA4 läuft auf Vercel mit korrekten Environment Variables
- **Events**: 10 Events implementiert und komplett gefixt
- **Conversions**: ✅ Nur `purchase` (14,90€) als Schlüsselereignis
- **Problem**: ✅ Custom Events wurden komplett repariert

---

## 📊 Aktuelle Events

### ✅ **Funktionieren:**
- `purchase` - Zahlungen (14,90€) → **Einzige Conversion**
- `pferde_bewertung_started` - Formular-Start → Engagement
- `form_progress` - Formular-Steps → Engagement  
- Standard GA4: `page_view`, `session_start`, `user_engagement`

### ✅ **Komplett Fixed (22.08.2025):**
- `begin_checkout` - Cookie Consent + Parameter-Fix
- `pferde_bewertung_started` - Cookie Consent + Parameter-Fix
- `pferde_pdf_download` - Cookie Consent + Parameter-Fix
- `form_abandon` - Cookie Consent + Parameter-Fix
- `regional_keyword_landing` - Cookie Consent + Parameter-Fix

---

## 🔧 Sofort-Todos

### **1. ✅ Custom Events komplett repariert (22.08.2025)**
**Problem identifiziert und gelöst:**
- ❌ `custom_parameters` Nested-Object → GA4 Standard verletzt
- ❌ Cookie Consent Timing → Events vor Consent gefeuert
- ✅ **Fix implementiert**: Direct Parameters + Cookie Consent Checks

**Alle betroffenen Functions gefixt:**
- `trackValuationStart()` - Bewertung gestartet
- `trackPaymentStart()` - begin_checkout Event  
- `trackValuationCompleted()` - purchase Event
- `trackPDFDownload()` - PDF Download
- `trackFormAbandonment()` - Formular verlassen
- `trackRegionalKeyword()` - SEO Keywords

### **2. ⏳ Deployment & Test (Nächster Schritt)**
- **Status**: Code ready, wartet auf Deployment
- **Test**: Console-Logs prüfen nach Deployment
- **Erwartung**: Alle Custom Events sollten in GA4 Real-time erscheinen

### **3. Funnel-Analyse einrichten (Diese Woche)**
```
GA4 → Berichte → Engagement → Ereignisse
Filter auf: pferde_bewertung_started, begin_checkout, purchase
```

**Neue Conversion-Rate Berechnung:**
```
Checkout-Rate = begin_checkout / pferde_bewertung_started × 100
Purchase-Rate = purchase / begin_checkout × 100
Overall-Rate = purchase / pferde_bewertung_started × 100
```

### **4. Audience für Remarketing (Nach Test)**
```
GA4 → Audiences → Neue Audience:
"Checkout-Abbrecher" = begin_checkout ABER NICHT purchase
"Interessenten" = pferde_bewertung_started ABER NICHT begin_checkout
```

---

## 🎯 Weekly Dashboard Checks

### **Montags (5 Min):**
- Berichte → Realtime → Aktuelle User
- Berichte → Monetarisierung → E-commerce-Käufe → Purchase Revenue

### **Freitags (10 Min):**
- Wöchentliche Conversion Rate: `purchases / pferde_bewertung_started`
- Traffic Sources: Woher kommen die Käufer?
- Problem-Spots: Wo springen User nach `pferde_bewertung_started` ab?

---

## 💰 Success Metrics für MVP (50-100 Besucher/Woche)

### **Realistische Ziele:**
- **Conversion Rate**: 1-3% (1-3 Käufe/Woche)
- **Weekly Revenue**: 15-45€
- **User Journey**: Verstehen wo 95% der User abspringen

### **Optimierung-Priorität:**
1. ✅ **begin_checkout** Event gefixed → Bessere Payment-Funnel Sicht
2. **Form-Abbrüche** reduzieren → Mehr Completions
3. **Traffic-Quellen** optimieren → Mehr qualifizierte Besucher

---

## 🔍 Technical Details vom Fix

### **Root Cause Analysis:**
1. **Parameter Structure Problem**: 
   - GA4 erwartet `{event_name: "test", param1: "value"}` 
   - Code verwendete `{event_name: "test", custom_parameters: {param1: "value"}}` ❌

2. **Cookie Consent Timing**:
   - Events gefeuert bevor User Cookies akzeptiert hat
   - GA4 verwirft Events ohne Consent ❌

### **Solution Implemented:**
```typescript
// Vorher (broken):
window.gtag("event", "begin_checkout", {
  custom_parameters: { horse_breed: "warmblut" }
});

// Nachher (fixed):
if (document.cookie.includes("pferdewert_cookie_consent=allow")) {
  window.gtag("event", "begin_checkout", {
    horse_breed: "warmblut"  // Direct parameters
  });
}
```

---

*Updated: 22.08.2025 | Next Review: Post-Deployment Custom Events Test*