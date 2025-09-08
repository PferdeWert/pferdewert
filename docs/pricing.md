# Preisanpassung Guide für PferdeWert.de

## Überblick
Dieses Dokument erklärt, wie Preisänderungen in der PferdeWert.de Anwendung durchgeführt werden. Das zentrale Pricing-System ist darauf ausgelegt, dass nur **eine einzige Datei** angepasst werden muss.

## 🎯 Zentrale Pricing-Datei

### `frontend/lib/pricing.ts` - DIE wichtigste Datei
Diese Datei ist die **einzige Quelle** für alle Preisangaben im gesamten System. Alle anderen Dateien importieren von hier.

**Aktuelle Konfiguration:**
- Current Price: `9.90€`  
- Decoy Price: `29.00€`
- Historical Launch: `4.90€`
- Historical Previous: `9.90€`

## 📋 Schritt-für-Schritt Preisanpassung

### 1. Hauptpreis ändern in `frontend/lib/pricing.ts`

```typescript
export const PRICING = {
  current: 12.90,        // ← Neuen Preis hier eintragen
  decoy: 39.00,         // ← Ankerpreis entsprechend anpassen
  historical: {
    launch: 4.90,       // ← Bleibt unverändert
    previous: 9.90      // ← Bei Bedarf auf alten current-Preis setzen
  }
}
```

### 2. Stripe Price ID aktualisieren

**Zwei Schritte erforderlich:**

#### A) Neue Stripe Price erstellen
In Stripe Dashboard:
1. Products → PferdeWert Bewertung
2. "Add another price" 
3. Neuen Preis eingeben (z.B. 12,90€)
4. Price ID kopieren (z.B. `price_1XxxxxKoHsLHy9OTxxxxxxxX`)

#### B) Environment Variables aktualisieren
```bash
# frontend/.env.local (Development)
STRIPE_PRICE_ID=price_1XxxxxKoHsLHy9OTxxxxxxxX

# Render Environment Variables (Production)
STRIPE_PRICE_ID=price_1XxxxxKoHsLHy9OTxxxxxxxX
```

### 3. Testen und Deployen
```bash
# Linting und Type-Check
npm run lint && npm run type-check

# Sitemap für SEO aktualisieren  
npm run sitemap

# Deploy auf Vercel erfolgt automatisch bei Push
git add . && git commit -m "feat: Price update to X,XX€"
```

## 🔍 Automatisch aktualisierte Stellen

Nach Änderung von `frontend/lib/pricing.ts` werden **automatisch** alle folgenden Stellen aktualisiert:

### Frontend Pages
- `pages/index.tsx` - Hauptseite CTA Button & Preisanzeigen
- `pages/pferd-verkaufen.tsx` - Verkaufen-Seite CTA & Preistexte  
- `pages/datenschutz.tsx` - Meta Description mit Preis

### Components
- Alle Button-Texte mit Preisangaben
- FAQ-Antworten mit aktuellen Preisen
- Schema.org Structured Data für SEO

### Analytics
- `lib/analytics.ts` - Google Analytics Purchase Events
- GA4 Revenue Tracking automatisch korrekt

### Marketing Copy
- CTA Button Texte: `"Jetzt X,XX€-Analyse starten"`
- Mobile Button: `"Jetzt Pferd bewerten → X,XX€"`
- Sparpotenzial: `"Nur X,XX€ können dir tausende Euro sparen"`

## 📁 Dateien die automatisch aktualisiert werden

### ✅ Automatisch über Imports aktualisiert:
```
frontend/lib/pricing.ts          ← ZENTRALE DATEI
├── frontend/lib/analytics.ts     ← Import PRICING.current
├── frontend/pages/index.tsx      ← Import PRICING_FORMATTED, PRICING_TEXTS
├── frontend/pages/pferd-verkaufen.tsx ← Import PRICING_TEXTS  
├── frontend/pages/datenschutz.tsx ← Import PRICING_FORMATTED
└── frontend/components/* ← Bei Bedarf via Props
```

### ❌ NICHT automatisch aktualisiert (manuell prüfen):
```
CHANGELOG.md                     ← Preise in Commit-Messages
GA/GA-Planung.md                 ← Marketing-Planung  
documentation/                   ← API-Dokumentation
.working/                        ← Arbeitsdokumente
```

## 🧪 Validierung & Testing

### Automatische Validierung
Das System prüft automatisch:
- `PRICING.current > 0` (Preis muss positiv sein)
- `PRICING.decoy > PRICING.current` (Ankerpreis muss höher sein)
- `STRIPE_CONFIG.priceId` vorhanden

### Test-Checklist
- [ ] Hauptseite zeigt neuen Preis
- [ ] CTA Buttons haben korrekten Text
- [ ] Stripe Checkout funktioniert
- [ ] GA4 Revenue Events korrekt
- [ ] Mobile Ansicht optimiert
- [ ] SEO Meta Descriptions aktualisiert

## 🚀 Deployment-Prozess

### Development
```bash
cd frontend
npm run dev
# Teste alle relevanten Seiten
```

### Production
```bash
# Pre-deployment checks
npm run lint && npm run type-check
npm run sitemap

# Deploy
git push origin main
# Vercel deployed automatisch
```

### Post-Deployment
1. **Stripe Webhook testen** - Test-Kauf durchführen
2. **GA4 Events prüfen** - Revenue Tracking validieren  
3. **SEO Tools checken** - Preise in Meta Descriptions
4. **Mobile UX testen** - Button-Texte & Preisanzeigen

## 📊 Pricing-Strategien

### Psychologische Preisgestaltung
- **Current vs Decoy**: Ankereffekt nutzen (9,90€ vs 29€)
- **Historische Preise**: "Früher X€, jetzt Y€" für Vergleiche
- **Uneven Pricing**: X,90€ wirkt günstiger als X,00€

### A/B Testing
Bei größeren Preisänderungen über mehrere Wochen:
1. **Woche 1**: Neuen Preis bei 50% der Besucher testen
2. **Woche 2**: Conversion-Rate & Revenue analysieren
3. **Woche 3**: Finaler Rollout bei positiven Ergebnissen

## 🔧 Technische Details

### Pricing System Architektur
```typescript
// Zentrale Konfiguration
PRICING (Dezimalzahlen) → Berechnungen
    ↓
PRICING_FORMATTED (Strings) → UI Anzeige
    ↓  
PRICING_TEXTS (Templates) → Marketing Copy
    ↓
STRIPE_CONFIG (Cent-Beträge) → Payment
```

### Formatierung
- **Deutsche Anzeige**: `9,90€` (Komma als Dezimaltrennzeichen)
- **Schema.org/JSON**: `"9.90"` (Punkt für internationale Standards)  
- **Stripe API**: `990` (Cent-Betrag als Integer)

## 📈 Monitoring nach Preisänderung

### KPIs überwachen
- **Conversion Rate**: Checkout-Rate vor/nach Änderung
- **Revenue/Tag**: Durchschnittlicher Tagesumsatz
- **Bounce Rate**: Verlassen Nutzer bei höherem Preis?
- **Mobile vs Desktop**: Unterschiedliche Reaktionen?

### Tools
- **Google Analytics 4**: Revenue Events & E-Commerce Tracking
- **Stripe Dashboard**: Erfolgreiche Zahlungen
- **Vercel Analytics**: Page Views & Performance
- **Google Search Console**: SEO Impact von Meta-Änderungen

## ⚠️ Häufige Fehlerquellen

### 1. Stripe Price ID vergessen
**Problem**: Checkout funktioniert nicht  
**Lösung**: Environment Variables in Development + Production aktualisieren

### 2. Cache-Probleme
**Problem**: Alte Preise werden angezeigt  
**Lösung**: Hard-Refresh (Cmd+Shift+R) oder Vercel Cache invalidieren

### 3. Linting-Fehler nach Preisänderung
**Problem**: ESLint meckert über Formatierung  
**Lösung**: `npm run lint` vor Commit ausführen

### 4. SEO Meta Descriptions
**Problem**: Google zeigt alte Preise in Suchergebnissen  
**Lösung**: `npm run sitemap` + Warten auf Google Re-Crawl (1-2 Wochen)

---

## 📞 Support

Bei Fragen oder Problemen:
- **Code-Review**: `pferdewert-code-reviewer` Agent nutzen
- **Debugging**: `pferdewert-debugger` Agent für Fehlersuche
- **Frontend-Entwicklung**: `pferdewert-frontend-dev` Agent

---

*Letzte Aktualisierung: August 2025*  
*Version: 1.0 - Basis-Guide für zentrale Preisanpassungen*