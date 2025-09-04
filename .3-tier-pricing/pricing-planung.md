# 3-Tier Pricing Implementation Plan mit Upselling

## Übersicht
Implementierung eines 3-stufigen Pricing-Modells mit Upselling-Möglichkeiten nach dem Kauf von Tier 1 (Basic).

## Tier-Struktur
1. **Basic (14,90€)**: Preisspanne + Erklärung (Anfang der Analyse)
2. **Pro (19,90€)**: Vollständige AI-Analyse mit PDF-Report  
3. **Premium (39,90€)**: Pro + Foto-Upload + Exterieur-Bewertung

## Kern-Konzept: Progressive Disclosure mit Upselling

### Schlanke Lösung ohne Over-Engineering
Bei Basic-Kauf wird die **vollständige Pro-Analyse** erstellt und in der DB gespeichert, aber nur teilweise angezeigt. Dies ermöglicht sofortiges Upselling ohne weitere AI-Calls. Premium Tier mit Foto Upload machen wir für den MVP manuell. Kunde soll uns Fotos per Mail schicken oder per Dropbox oder Google Docs oder irgend ein einfacher manueller Mechanismus ohne Anpassungen hier im Code (bitte einen Vorschlag machen der möglichst einfach funktioniert) und wir prompten es manuell an eine KI.

## Implementierungsplan

### 1. Backend-Anpassungen (Minimal)

#### 1.1 Analyse-Response erweitern
```python
# backend/main.py - Erweiterte Response-Struktur
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    ai_text = ai_valuation(req)
    
    # Neue Response mit Tier-Info
    return {
        "raw_gpt": ai_text,  # Vollständige Analyse
        "tier": req.tier,    # "basic", "pro", oder "premium"
        "payment_id": req.payment_id  # Für Upselling-Tracking
    }
```

#### 1.2 MongoDB-Schema erweitern
```python
# Speichere vollständige Analyse mit Tier-Info
valuation_doc = {
    "_id": payment_id,
    "full_analysis": ai_text,        # Komplette Pro-Analyse
    "purchased_tier": "basic",        # Initial gekaufter Tier
    "current_tier": "basic",          # Nach Upselling: "pro"
    "created_at": datetime.now(),
    "horse_data": {...},             # Original-Eingaben
    "upsell_viewed": False,          # Tracking
}
```

### 2. Frontend-Anpassungen (Hauptfokus)

#### 2.1 Analyse-Splitting im Frontend
```typescript
// lib/analysisSplitter.ts
export function splitAnalysis(fullAnalysis: string, tier: string) {
  // Marker-basierte Trennung (robusteste Lösung)
  const BASIC_END_MARKER = "## Marktübersicht";  // Nach Preisspanne
  
  if (tier === 'basic') {
    const basicEndIndex = fullAnalysis.indexOf(BASIC_END_MARKER);
    if (basicEndIndex > -1) {
      return {
        visible: fullAnalysis.substring(0, basicEndIndex),
        hidden: fullAnalysis.substring(basicEndIndex),
        hasMore: true
      };
    }
  }
  
  return { visible: fullAnalysis, hidden: '', hasMore: false };
}
```

#### 2.2 Ergebnis-Seite mit Upselling
```tsx
// pages/ergebnis/[id].tsx - Erweiterte Ergebnis-Anzeige
export default function ErgebnisSeite() {
  const [analysis, setAnalysis] = useState(null);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  
  useEffect(() => {
    const { visible, hidden, hasMore } = splitAnalysis(
      data.full_analysis, 
      data.current_tier
    );
    
    setAnalysis({ visible, hidden, hasMore });
    
    // Zeige Upsell nach 3 Sekunden bei Basic
    if (data.current_tier === 'basic' && hasMore) {
      setTimeout(() => setShowUpsellModal(true), 3000);
    }
  }, [data]);
  
  return (
    <>
      {/* Sichtbarer Teil der Analyse */}
      <div className="analysis-content">
        {analysis?.visible}
      </div>
      
      {/* Teaser für versteckten Content */}
      {analysis?.hasMore && (
        <UpsellTeaser 
          hiddenPreview={analysis.hidden.substring(0, 200)}
          onUpgrade={() => setShowUpsellModal(true)}
        />
      )}
      
      {/* Upsell Modal */}
      <UpsellModal 
        open={showUpsellModal}
        currentTier="basic"
        targetTier="pro"
        paymentId={data.payment_id}
      />
    </>
  );
}
```

#### 2.3 Upselling-Komponente
```tsx
// components/UpsellTeaser.tsx
export default function UpsellTeaser({ hiddenPreview, onUpgrade }) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-amber-300">
      <h3 className="text-xl font-bold mb-3">
        🔓 Deine vollständige Analyse wartet auf dich!
      </h3>
      
      {/* Verschwommene Vorschau */}
      <div className="relative mb-4">
        <div className="blur-sm opacity-70 line-clamp-3">
          {hiddenPreview}...
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Upgrade auf Pro für nur <span className="font-bold">+5€</span>
          </p>
          <ul className="text-xs text-gray-500 mt-1">
            <li>✓ Vollständige AI-Analyse</li>
            <li>✓ Detaillierter PDF-Report</li>
            <li>✓ Sofort verfügbar</li>
          </ul>
        </div>
        
        <button 
          onClick={onUpgrade}
          className="btn-primary px-6 py-3"
        >
          Jetzt freischalten
        </button>
      </div>
    </div>
  );
}
```

### 3. Upselling-Flow

#### 3.1 Payment Processing
```typescript
// pages/api/upgrade-tier.ts
export default async function upgradeTier(req, res) {
  const { paymentId, fromTier, toTier } = req.body;
  
  // Preisdifferenz berechnen
  const priceDiff = TIER_PRICES[toTier] - TIER_PRICES[fromTier];
  
  // Stripe Checkout für Differenz
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Upgrade zu ${toTier}`,
          description: 'Freischaltung der vollständigen Analyse'
        },
        unit_amount: priceDiff * 100,
      },
      quantity: 1,
    }],
    success_url: `/ergebnis/${paymentId}?upgraded=true`,
    cancel_url: `/ergebnis/${paymentId}`,
    metadata: {
      paymentId,
      upgradeFrom: fromTier,
      upgradeTo: toTier
    }
  });
  
  return res.json({ url: session.url });
}
```

#### 3.2 MongoDB Update nach Upselling
```typescript
// Nach erfolgreichem Upselling
await db.collection('valuations').updateOne(
  { _id: paymentId },
  { 
    $set: { 
      current_tier: 'pro',
      upgraded_at: new Date(),
      upsell_completed: true
    }
  }
);
```

### 4. Analyse-Trennung: Optimale Cut-Points

#### Option 1: Marker-basiert (EMPFOHLEN)
```typescript
// Nutze existierende Überschriften als natürliche Trennpunkte
const CUT_POINTS = {
  basic: {
    // Nach Preisspanne und grundlegender Erklärung
    marker: "## Marktübersicht",
    fallback: 1500  // Falls Marker nicht gefunden: Zeichen-Limit
  }
};
```

#### Option 2: Zeichen-basiert (Fallback)
```typescript
// Einfachste Lösung: Feste Zeichenanzahl
const BASIC_CHAR_LIMIT = 1500;  // ~300 Wörter
const basicContent = fullAnalysis.substring(0, BASIC_CHAR_LIMIT);
```

#### Option 3: Absatz-basiert
```typescript
// Zeige erste 3-4 Absätze
const paragraphs = fullAnalysis.split('\n\n');
const basicContent = paragraphs.slice(0, 4).join('\n\n');
```

### 5. Premium Tier (Zukunft)

Für Premium mit Foto-Upload:
1. Zusätzliches AI-Model für Bildanalyse (GPT-4 Vision / Claude Vision)
2. Separater Upload-Flow nach Payment
3. Erweiterte MongoDB-Struktur für Bilder
4. Längere Verarbeitungszeit kommunizieren

### 6. Analytics & Tracking

```typescript
// Tracking für Conversion-Optimierung
const trackUpsellEvent = (action: string) => {
  gtag('event', 'upsell_interaction', {
    action,  // 'viewed', 'clicked', 'completed'
    from_tier: 'basic',
    to_tier: 'pro',
    payment_id: paymentId
  });
};
```

## Vorteile dieser Lösung

1. **Minimal Code Changes**: Hauptsächlich Frontend-Anpassungen
2. **Keine doppelten AI-Calls**: Analyse wird nur 1x erstellt
3. **Sofortiges Upselling**: Kunde sieht sofort den Mehrwert
4. **Einfache Implementierung**: Nutzt bestehende Infrastruktur
5. **Psychologisch optimal**: "Deine Analyse ist schon fertig" statt "Kaufe mehr"

## Timeline

### 🚀 **MVP (Go-Live Priorität)**

**Phase 1 - Schlanker 3-Tier MVP (2-3 Tage):**
- ✅ 3-Tier Pricing Pages bereits implementiert (Traditional + Alternative Flow)
- Backend: Tier-Parameter in Request/Response
- Frontend: Tier-Badge und Preis-Display im Formular
- **KEIN Upselling** - Jeder Tier zeigt vollständige Analyse für bezahlten Preis
- Basic (14,90€), Pro (19,90€), Premium (39,90€) als separate Kaufoptionen
- Premium: Manuelle Foto-Upload Lösung (siehe Google Forms Setup unten)

### 📈 **Post-MVP (nach Go-Live)**

**Phase 2 - Upselling Implementation (nach Marktfeedback):**
- Analyse-Splitting für Basic Tier
- Upselling UI-Komponenten
- Payment-Flow für Upgrades
- A/B Testing zwischen Vollanalyse vs. Upselling-Ansatz

**Phase 3 - Optimierung:**
- Automatisierter Premium Foto-Upload
- Advanced Analytics & Conversion-Optimierung
- Tier-Empfehlungs-Algorithmus

## Kritische Entscheidungen

1. **Cut-Point für Basic**: Nach Preisspanne + Marktübersicht (~30% der Analyse)
2. **Upsell-Timing**: 3 Sekunden nach Anzeige oder beim Scrollen
3. **Preis-Differenz**: 5€ von Basic zu Pro (psychologisch optimal)
4. **Preview-Länge**: 200 Zeichen verschwommen für Teaser

## Risiken & Mitigationen

- **Kunde fühlt sich getäuscht**: Klare Kommunikation "Vollständige Analyse verfügbar"
- **Technische Probleme**: Fallback auf vollständige Anzeige bei Fehlern
- **Conversion zu niedrig**: A/B Testing verschiedener Cut-Points

## Google Forms Setup für Premium Tier (MVP)

### 1. **Form-Erstellung**
```
Titel: "PferdeWert Premium - Foto-Upload für Exterieur-Bewertung"
Beschreibung: "Laden Sie hier Ihre Pferdefotos hoch für die erweiterte Premium-Analyse"
```

### 2. **Form-Felder**
```
1. Name/Kontakt (Pflichtfeld)
   - Typ: Kurze Antwort
   
2. Payment ID (Pflichtfeld) 
   - Typ: Kurze Antwort
   - Beschreibung: "Finden Sie in Ihrer Kaufbestätigung oder Browser-URL"
   
3. Pferdename (Optional)
   - Typ: Kurze Antwort
   
4. Foto-Upload (Pflichtfeld)
   - Typ: Datei-Upload
   - Einstellungen: "Mehrere Dateien zulassen" (max 5)
   - Beschreibung: "Bitte laden Sie 3-5 aussagekräftige Fotos hoch:
     • Seitliche Gesamtansicht (Exterieur)
     • Kopf/Hals von der Seite  
     • Bewegung (Trab/Galopp wenn vorhanden)
     • Optional: weitere Detailaufnahmen"
   
5. Besondere Wünsche (Optional)
   - Typ: Absatz
   - Beschreibung: "Haben Sie spezielle Fragen zur Exterieur-Bewertung?"
```

### 3. **Form-Einstellungen**
- ✅ E-Mail-Benachrichtigung bei neuen Antworten
- ✅ Antworten in Google Sheets sammeln
- ✅ Bestätigungs-E-Mail an Kunden senden

### 4. **Integration in Website**
```typescript
// Nach Premium-Kauf in Success-Seite
const PREMIUM_UPLOAD_FORM = "https://forms.gle/[DEIN-FORM-LINK]";

<div className="premium-next-steps">
  <h3>📸 Nächster Schritt: Foto-Upload</h3>
  <p>Für Ihre Premium-Analyse mit Exterieur-Bewertung:</p>
  <a href={PREMIUM_UPLOAD_FORM} target="_blank" className="btn-primary">
    Fotos jetzt hochladen
  </a>
</div>
```

### 5. **E-Mail Templates**
**Nach Premium-Kauf:**
```
Betreff: PferdeWert Premium - Foto-Upload für erweiterte Analyse

Hallo [Name],

vielen Dank für Ihren Premium-Kauf! 

Für die Exterieur-Bewertung benötigen wir noch Fotos Ihres Pferdes.
Bitte laden Sie diese hier hoch: [FORM-LINK]

Ihre Payment-ID: [PAYMENT-ID]

Die erweiterte Analyse erhalten Sie innerhalb von 2-3 Werktagen.
```

## Nächste Schritte für MVP

**Sofort (MVP Launch):**
1. ✅ 3-Tier Flows sind bereits implementiert  
2. Backend: Tier-Parameter verarbeiten (minimal)
3. Google Forms für Premium Setup
4. E-Mail-Templates vorbereiten
5. Go-Live mit vollständigen Analysen pro Tier

**Post-Launch (Optimierung):**
1. Markt-Feedback sammeln zu Tier-Verteilung
2. Entscheidung: Upselling vs. separate Tiers beibehalten
3. A/B Testing verschiedener Ansätze