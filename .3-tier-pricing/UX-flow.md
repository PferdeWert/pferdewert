# 3-Tier Pricing UX Flow

## 🎯 Problemstellung
Wie wissen wir nach dem Formular, welches Pricing-Tier der Kunde ursprünglich gewählt hat?

## ✅ Empfohlene Lösung: Session Storage + URL Parameters

### Flow-Übersicht
```
1. /preise → Kunde wählt Tier
2. → /pferde-preis-berechnen?tier=basic (URL-Parameter + Session Storage)
3. → Formular ausfüllen
4. → /checkout?tier=basic (Tier wird durchgereicht)
5. → Stripe Checkout mit korrektem Preis
```

## 📋 Detaillierter UX-Flow

### Schritt 1: Pricing-Auswahl (/preise)
- Kunde sieht 3 Pricing-Tiers: Basic, Professional, Premium
- Klickt auf "Basic kaufen"
- **Aktion**: 
  - Tier wird in Session Storage gespeichert
  - Redirect zu `/pferde-preis-berechnen?tier=basic`

### Schritt 2: Formular (/pferde-preis-berechnen)
- **Beim Laden**:
  1. Tier aus URL-Parameter lesen (`?tier=basic`)
  2. Falls kein Parameter: Aus Session Storage laden
  3. Falls beides leer: Redirect zurück zu `/preise`
  
- **Im Formular**:
  - Oben: Kleiner Badge zeigt gewähltes Tier (z.B. "Basic-Bewertung")
  - Formular bleibt identisch für alle Tiers
  - Hidden Field oder State speichert Tier-Auswahl
  
- **Nach Formular-Submit**:
  - Formulardaten + Tier werden zusammen verarbeitet
  - Weiterleitung zu `/checkout?tier=basic`

### Schritt 3: Checkout-Seite (/checkout)
- **Zwei mögliche Varianten**:

#### Variante A: Direkter Checkout (Empfohlen)
```
- Zeige gewähltes Tier prominent
- Preis und Leistungen nochmal anzeigen
- Ein Button: "Jetzt für 14,90€ kaufen"
- Direkt zu Stripe Checkout
```

#### Variante B: Tier-Auswahl nochmal zeigen
```
- Alle 3 Tiers anzeigen
- Gewähltes Tier vorselektiert/hervorgehoben
- Möglichkeit zum Upgrade (Upsell-Chance!)
- Button pro Tier führt zu jeweiligem Stripe Checkout
```

## 💡 Implementierungs-Details

### 1. Session Storage Helper
```typescript
// lib/pricing-session.ts
export const savePricingTier = (tier: 'basic' | 'pro' | 'premium') => {
  sessionStorage.setItem('selectedTier', tier);
  sessionStorage.setItem('tierTimestamp', Date.now().toString());
};

export const getPricingTier = (): string | null => {
  const tier = sessionStorage.getItem('selectedTier');
  const timestamp = sessionStorage.getItem('tierTimestamp');
  
  // Tier verfällt nach 30 Minuten
  if (timestamp && Date.now() - parseInt(timestamp) > 30 * 60 * 1000) {
    clearPricingTier();
    return null;
  }
  
  return tier;
};
```

### 2. URL Parameter Handling
```typescript
// In pferde-preis-berechnen.tsx
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tierFromUrl = urlParams.get('tier');
  
  if (tierFromUrl) {
    savePricingTier(tierFromUrl);
    setSelectedTier(tierFromUrl);
  } else {
    const savedTier = getPricingTier();
    if (!savedTier) {
      router.push('/preise');
    } else {
      setSelectedTier(savedTier);
    }
  }
}, []);
```

### 3. Formular State
```typescript
interface FormState {
  // ... existing fields
  selectedTier: 'basic' | 'pro' | 'premium';
  tierPrice: number;
  stripeProductId: string;
}
```

## 🎨 UI-Elemente

### Tier-Indikator im Formular
```jsx
<div className="bg-brand-brown text-white px-4 py-2 rounded-lg mb-4">
  <span className="text-sm">Gewählte Bewertung:</span> {/* Finde den Slogan nicht so schön "Gewählte Bewertung". Würde eher nur den tierdisplayname in größe einer überschrift nehmen, evtl noch mit "-Bewertung" dabei.  */}
  <strong className="ml-2">{tierDisplayName}</strong>
  <span className="ml-2">({formatPrice(tierPrice)})</span>
</div>
```

### Checkout-Seite Design
```jsx
// Variante A: Direkter Checkout. Hier bitte das Wording von meiner aktuellen /pferde-preis-berechnen übernehmen. Da steht über dem Preis "Die Analyse kostet einmalig". Da wenn möglich schreiben "Die Basic-Analyse kostet.." Und Basic eben austauschen für die Tier var. und den Preis als VAR austauschen. aber ansonsten können wir aus meiner sicht alles von meiner bestehenden page nehmen vor dem checkout.
<div className="max-w-2xl mx-auto">
  <h1>Bestellung abschließen</h1>
  
  <div className="border rounded-lg p-6 mb-6">
    <h2>{tierDisplayName}</h2>
    <p className="text-3xl font-bold">{formatPrice(tierPrice)}</p>
    <ul className="mt-4">
      {tierFeatures.map(feature => (
        <li key={feature}>✓ {feature}</li>
      ))}
    </ul>
  </div>
  
  <StripeCheckoutButton 
    productId={stripeProductId}
    formData={formData}
  />
  
  <Link href="/preise" className="text-sm text-gray-600">
    ← Anderen Tarif wählen
  </Link>
</div>
```

## 🔄 Alternative Ansätze (nicht empfohlen)

### ❌ Ansatz 1: Separates Formular pro Tier
- `/bewertung-basic`, `/bewertung-pro`, `/bewertung-premium`
- **Nachteile**: Code-Duplizierung, schwere Wartung

### ❌ Ansatz 2: Tier-Auswahl im Formular
- Dropdown/Radio im Formular selbst
- **Nachteile**: Verwirrt Nutzer, unterbricht Flow

### ❌ Ansatz 3: Cookies
- **Nachteile**: DSGVO-Komplexität, kann blockiert werden

## 📊 Vorteile der empfohlenen Lösung

1. **Klarer Flow**: Nutzer weiß immer, was er gewählt hat
2. **Flexibilität**: Upgrade-Möglichkeit bei Checkout
3. **Tracking**: Analytics kann Tier-Auswahl verfolgen
4. **Fehlerresistent**: Fallbacks über Session Storage
5. **SEO-freundlich**: URLs mit Parametern indexierbar

## 🚀 Nächste Schritte

1. [ ] Session Storage Helper implementieren
2. [ ] `/preise` Page anpassen für Tier-Weitergabe
3. [ ] `/pferde-preis-berechnen` für Tier-Empfang vorbereiten
4. [ ] Checkout-Seite erstellen
5. [ ] Stripe-Integration pro Tier konfigurieren
6. [ ] Analytics-Events für Tier-Tracking

## 📈 Next Steps Conversion-Optimierung

- **Upsell-Chance**: Nachdem ein Kauf getätigkt wurde und der Kudne das Ergebnis angezeigt bekommt wollen wir ihm einen Upsell anbieten auf die nächsten Preis Tier. 

---

Kurze Zusammenfassung der erledigten Schritte

- Schritt 1: Session Storage Helper implementiert (`frontend/lib/pricing-session.ts` mit save/get/clear, 30 Min Expiry, Mapping pro→standard)
- Schritt 2: /preise (preise-neu) angepasst – Auswahl wird via `savePricingTier` gespeichert und Redirect zu `/pferde-preis-berechnen?tier=...` (standard→pro) umgesetzt
- Schritt 3: Formularseite vorbereitet – Tier aus URL/Session lesen, Indikator oben eingefügt, Preis-/Produkt-Infos in Form-State übernommen und Checkout-Preistext dynamisch gemacht
- Schritt 4: Checkout-Flow (Variante A) integriert – bestehende Bezahl-Phase nutzt jetzt den gewählten Tiernamen und -preis, ohne separate /checkout-Seite
- Schritt 5: Stripe pro Tier konfiguriert – API `/api/checkout` wählt Price-ID anhand `selectedTier` (Env: STRIPE_PRICE_ID_BASIC/STANDARD/PREMIUM, Fallback vorhanden)
- Schritt 6: Analytics erweitert – Events für Tier auf Formular (`pricing_tier_loaded_on_form`) und bei Checkoutstart (`begin_checkout_tier`)
