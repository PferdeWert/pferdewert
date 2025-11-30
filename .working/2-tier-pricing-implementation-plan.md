# 2-Tier Pricing System Implementation Plan

## Projekt: Implementierung eines 2-stufigen Preissystems für PferdeWert.de

**Datum**: 2025-11-29
**Status**: Finalisiert - Bereit zur Implementierung

---

## 1. EXECUTIVE SUMMARY

### Ziel
Upgrade von Single-Tier (19.90€) zu 2-Tier Preissystem:
- **Standard-Analyse**: 9.90€ (nur Text-Analyse)
- **Premium-Analyse**: 19.90€ (mit 3-5 Bildupload + Vision AI)

### Kern-Unterschied zum alten 3-Tier-System
- **Flow**: Tier-Auswahl **nach** Formular (schlanker!)
- **2 Tiers**: Fokussiert statt 3 Optionen
- **Vollständige Integration**: Frontend + Backend + Bildupload + Vision AI
- **Production-Ready**: Nicht nur Frontend wie alter Branch

### Geschätzte Implementierungszeit
**50-60 Stunden** (inkl. 8h Buffer für Upgrade-Feature)

---

## 2. FINALISIERTE ANFORDERUNGEN

### Preise (alle 3 als VARS in pricing.ts)
- **Standard**: 9.90€ (VAR behält bisherigen Namen)
- **Premium**: 19.90€ (neue VAR)
- **Upgrade** (Standard → Premium): 10.00€ (neue VAR für Nachkauf)
- Flexibel für Pricing-Experimente

### AI-Modell für Vision-Analyse
**Claude Sonnet 4.5** (bereits Primary Model)
- Exzellente Vision-Capabilities
- Bereits integriert via OpenRouter
- Kostengünstiger als GPT-4 Vision (~40%)
- Perfekt für strukturierte Exterieur-Bewertung

### Bildupload
**3-5 Bilder**
- Minimum 3: Front, Seite, Bewegung
- Optional +2: Weitere Perspektiven
- Formate: JPG, PNG, HEIC
- Max 5MB pro Bild, 15MB gesamt

---

## 3. BILDUPLOAD-STRATEGIE: VERGLEICH DER 3 OPTIONEN

### ❌ Option A: Email-basiert (Manuell)
**Flow**: Zahlung → Email → Kunde sendet Bilder → Manuell verarbeiten

**Pros:**
- Entwicklungszeit: 2-3h (nur Email-Template)
- Keine Storage-Infrastruktur
- Sofort testbar

**Cons:**
- 5-10 Min manuelle Arbeit pro Order
- Bricht "2 Minuten"-Versprechen
- Nicht skalierbar
- Hoher Support-Aufwand

**Verdict**: Nur als temporärer MVP

---

### ✅ Option B: Hetzner Server Upload (EMPFOHLEN)

**Flow**: Frontend → Hetzner Upload → Vision AI → Result

**Pros:**
- Vollautomatisch (hält "2 Minuten"-Versprechen)
- €0 laufende Kosten (Hetzner bereits vorhanden)
- Einfache Architektur (weniger Fehlerquellen)
- Schnelle Performance (single hop)
- Volle Kontrolle

**Cons:**
- Disk-Management nötig (Cleanup-Cronjob)
- Kein CDN (nicht nötig für Use-Case)
- Entwicklungszeit: 8-12h

**Implementation:**
- Backend: FastAPI multipart endpoint
- Storage: `/var/pferdewert/images/{bewertung_id}/`
- Cleanup: Täglicher Cron (>30 Tage alt)
- Security: File-Type-Validation

**Kosten:**
- Dev: 8-12h
- Storage: ~5GB/Monat (100 Premium × 3 × 15MB)
- Laufend: €0

**Verdict**: ✅ **EMPFOHLEN** - Bestes Kosten/Nutzen/UX-Verhältnis

---

### ⚠️ Option C: Cloud Storage (R2/S3)

**Flow**: Frontend → Presigned URL → R2/S3 → Webhook → Backend → Vision AI

**Pros:**
- Skaliert zu 1000+ concurrent uploads
- Built-in CDN
- Professional Infrastructure

**Cons:**
- Zusätzliche Dependency
- Laufende Kosten (€1-5/Monat)
- Komplexere Architektur
- Overkill für 100-200 Orders/Monat
- Höhere Debug-Komplexität

**Kosten:**
- Dev: 12-16h
- R2: €1-2/Monat
- S3: €3-5/Monat

**Verdict**: Over-engineered. Erst bei >1000 Premium/Monat relevant

---

## 4. EMPFOHLENE STRATEGIE: OPTION B (Hetzner Direct Upload)

**Rationale:**
1. **UX First**: Vollautomatisch = "2 Minuten"-Versprechen
2. **Kosten**: €0 vs €1-5/Monat
3. **Einfachheit**: Weniger Systeme = höher Reliability
4. **Aktuelle Scale**: 100-200 Orders rechtfertigen Cloud nicht
5. **Zukunftssicher**: Migration zu R2/S3 später möglich (4-6h, gleiche API)

---

## 5. NEUER USER FLOW

### Flow A: Premium direkt kaufen

```
1. Formular ausfüllen (wie bisher)
   └─ 3 Schritte: Grunddaten → Fähigkeiten → Details

2. ✨ NEU: Tier-Auswahl Modal
   ├─ Standard: 9.90€ (vorausgewählt)
   └─ Premium: 19.90€ (highlighted)

3. Stripe Checkout
   └─ Tier-spezifische Price ID

4. Payment Success
   └─ Standard: Weiter zu Loading Screen
   └─ Premium: Zeige ImageUpload (5 Bilder max)

5. Backend-Verarbeitung
   ├─ Standard: Text-only AI (Claude Sonnet 4.5)
   └─ Premium: Text + Vision AI (Claude Sonnet 4.5)

6. Ergebnis
   └─ PDF mit tier-spezifischem Content
```

### Flow B: Standard kaufen → Upgrade zu Premium (NEU!)

```
1. Kunde kauft Standard (9.90€)
   └─ Erhält Standard-Analyse

2. Auf /ergebnis: "Upgrade zu Premium"-CTA
   ├─ "Jetzt mit KI-Vision Exterieur-Bewertung upgraden"
   └─ "Nur 10€ mehr - keine Dateneingabe nötig"

3. Upgrade-Checkout
   ├─ Stripe Checkout mit Upgrade-Price (10€)
   ├─ bewertungId in metadata (verknüpft mit Original)
   └─ KEINE Formular-Daten nötig (bereits vorhanden)

4. Payment Success → ImageUpload
   └─ Zeige ImageUpload (5 Bilder max)

5. Backend Re-Processing
   ├─ Lade existierende Bewertung aus DB
   ├─ Füge Bilder hinzu
   ├─ Upgrade tier: 'standard' → 'premium'
   └─ Trigger Vision AI mit existierenden Daten + neue Bilder

6. Aktualisierte Ergebnis-Seite
   └─ Premium-PDF mit Vision-Analyse
```

---

## 6. DETAILLIERTE IMPLEMENTATION

### Phase 1: Pricing Configuration (2h)

**File**: `frontend/lib/pricing.ts`

**Änderungen:**
```typescript
// Neue Tier-Definition
export const PRICING_TIERS = {
  standard: {
    id: 'standard',
    price: 9.90,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD,
    features: [
      'Detaillierte Pferdebewertung',
      'PDF-Report (15+ Seiten)',
      'Abstammungsanalyse',
      'Marktvergleich'
    ],
    maxImages: 0
  },
  premium: {
    id: 'premium',
    price: 19.90,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM,
    features: [
      'Alles aus Standard',
      '✨ KI-Vision Exterieur-Bewertung',
      'Bildanalyse (3-5 Fotos)',
      'Premium PDF (25+ Seiten)'
    ],
    maxImages: 5
  }
}

// Upgrade-Preis (Standard → Premium)
export const PRICING_UPGRADE = {
  standardToPremium: {
    price: 10.00,  // Differenz: 19.90 - 9.90
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE,
    description: 'Upgrade zu Premium mit KI-Vision Analyse'
  }
}
```

**Environment Variables:**
```bash
NEXT_PUBLIC_STRIPE_PRICE_STANDARD=price_xxx_990
NEXT_PUBLIC_STRIPE_PRICE_PREMIUM=price_xxx_1990
NEXT_PUBLIC_STRIPE_PRICE_UPGRADE=price_xxx_1000  # 10€ Upgrade
```

**Stripe Setup:**
- Stripe Dashboard → Products → Create 3 prices:
  - Standard: 9.90€
  - Premium: 19.90€
  - Upgrade (Standard→Premium): 10.00€
- Copy Price IDs zu .env

---

### Phase 2: Database Schema (1h)

**Collection**: `bewertungen`

**Neue Fields (optional für Backward-Compatibility):**
```typescript
{
  tier?: 'standard' | 'premium',
  images?: {
    uploadedAt: Date,
    filenames: string[],
    storagePath: string
  },
  visionAnalysis?: string
}
```

Keine Migration nötig - alte Docs bleiben gültig.

---

### Phase 3: Tier Selection Modal (6h)

**Neue Komponente**: `components/TierSelectionModal.tsx`

**Features:**
- 2 Cards (Standard links, Premium rechts)
- Standard vorausgewählt
- Premium mit Glow-Highlight
- Mobile: Stacked
- Desktop: Side-by-side

**Integration**: `pages/pferde-preis-berechnen.tsx`

**Flow-Change:**
```diff
  const handleSubmit = () => {
-   // Direct POST to /api/checkout
+   // Show tier modal
+   setShowTierModal(true)
  }

+ const handleTierSelected = (tier) => {
+   // POST to /api/checkout with tier
+ }
```

---

### Phase 4: Checkout API (3h)

**File**: `pages/api/checkout.ts`

**Changes:**
```diff
  const schema = z.object({
+   tier: z.enum(['standard', 'premium']).default('standard'),
    // ... existing fields
  })

  const session = await stripe.checkout.sessions.create({
    line_items: [{
-     price: STRIPE_CONFIG.priceId,
+     price: getTierConfig(tier).stripePriceId,
      quantity: 1
    }],
    metadata: {
      bewertungId: id,
+     tier: tier
    }
  })

  await bewertungen.insertOne({
    // ... existing fields
+   tier: tier
  })
```

---

### Phase 5: Image Upload Frontend (8h)

**Wann gezeigt**: Nach Payment Success, BEVOR AI-Processing

**Neue Komponente**: `components/ImageUpload.tsx`

**Features:**
- Drag & Drop + File Picker
- Image Previews (Thumbnails)
- Remove Button pro Bild
- Progress Bar
- Validierung:
  - JPG/PNG/HEIC only
  - Max 5 Bilder
  - Max 5MB pro Bild
  - 15MB total

**Integration**: `components/StripeLoadingScreen.tsx`

```typescript
// Fetch bewertung to check tier
if (tier === 'premium' && !images) {
  return <ImageUpload bewertungId={id} onComplete={startPolling} />
}
```

---

### Phase 6: Image Upload Backend API (6h)

**Neue File**: `pages/api/upload-images.ts`

**Dependencies:**
```bash
npm install formidable @types/formidable
```

**Logic:**
1. Parse multipart form (`formidable`)
2. Verify bewertung exists + Premium tier
3. Validate files (type, count, size)
4. Create dir: `/var/pferdewert/images/{bewertungId}/`
5. Move files from temp → permanent
6. Update MongoDB mit images metadata

**Hetzner Setup:**
```bash
ssh pferdewert-hetzner
sudo mkdir -p /var/pferdewert/images
sudo chown www-data:www-data /var/pferdewert/images
sudo chmod 755 /var/pferdewert/images

# Cleanup Cron (täglich 3am)
sudo crontab -e
# Add: 0 3 * * * find /var/pferdewert/images -type f -mtime +30 -delete
```

---

### Phase 7: Webhook - Pass Images to Backend (4h)

**File**: `pages/api/webhook.ts`

**Changes:**
```typescript
// For Premium: Poll for image upload (max 2 min)
if (tier === 'premium') {
  for (let i = 0; i < 24; i++) { // 24 × 5s = 2 min
    const doc = await bewertungen.findOne({ stripeSessionId })
    if (doc.images) break
    await sleep(5000)
  }

  // Timeout → proceed without images + send email
  if (!doc.images) {
    await sendEmailRequestingImages(doc)
  }
}

// Pass tier + images to backend
const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
  body: JSON.stringify({
    ...bewertbareDaten,
    tier: tier,
    images: doc.images
  })
})
```

---

### Phase 8: Backend - Vision AI Integration (8h)

**File**: `backend/main.py`

**Schema Update:**
```python
class BewertungRequest(BaseModel):
    # ... existing fields ...
    tier: Optional[str] = 'standard'
    images: Optional[dict] = None
```

**File**: `backend/ai_clients/ai_service.py`

**Changes:**
```python
def generate_valuation(horse_data):
    tier = horse_data.get('tier', 'standard')
    images = horse_data.get('images')

    if tier == 'premium' and images:
        # Add vision prompt
        content = [
            {"type": "text", "text": base_prompt},
            *[{"type": "image_url", "image_url": encode_image(img)}
              for img in images['filenames']]
        ]
    else:
        content = base_prompt

    # Claude Sonnet 4.5 already supports vision via OpenRouter
    response = openrouter_client.chat.completions.create(
        model=PRIMARY_MODEL,  # Claude Sonnet 4.5
        messages=[{"role": "user", "content": content}]
    )
```

**Keine neuen Packages** - Claude Sonnet 4.5 Vision bereits verfügbar

---

### Phase 9: Upgrade-Flow auf /ergebnis (6h)

**Neue Komponente**: `components/UpgradeToPremiumCTA.tsx`

**Features:**
- Zeige nur bei tier='standard'
- Hervorgehobene CTA-Box
- "Upgrade zu Premium für nur 10€"
- "Keine Dateneingabe nötig - nur Bilder hochladen"
- Click → Upgrade-Checkout

**Integration**: `pages/ergebnis.tsx`

```typescript
// Fetch bewertung
const { tier, id } = bewertung

{tier === 'standard' && (
  <UpgradeToPremiumCTA
    bewertungId={id}
    onUpgrade={() => handleUpgradeCheckout(id)}
  />
)}
```

**Neue API**: `pages/api/checkout-upgrade.ts`

**Logic:**
```typescript
1. Validate bewertungId exists
2. Verify tier = 'standard' (prevent double upgrade)
3. Create Stripe session with UPGRADE price (10€)
4. Metadata: { bewertungId, upgradeFrom: 'standard' }
5. Success URL: /ergebnis?session_id={SESSION_ID}&upgrade=true
6. Return session URL
```

**Webhook-Änderung**: `pages/api/webhook.ts`

```typescript
// Detect upgrade purchase
const isUpgrade = metadata.upgradeFrom === 'standard'

if (isUpgrade) {
  // Fetch existing bewertung
  const existingDoc = await bewertungen.findOne({ _id: bewertungId })

  // Wait for image upload (same as Premium flow)
  // ... polling logic ...

  // Trigger backend RE-PROCESSING
  await fetch(`${BACKEND_URL}/api/bewertung`, {
    method: 'POST',
    body: JSON.stringify({
      ...existingDoc.formData,  // Reuse original data!
      tier: 'premium',
      images: uploadedImages,
      isUpgrade: true
    })
  })

  // Update document
  await bewertungen.updateOne(
    { _id: bewertungId },
    {
      $set: {
        tier: 'premium',
        images: uploadedImages,
        bewertung: newVisionAnalysis,
        upgraded: true,
        upgradedAt: new Date()
      }
    }
  )
}
```

**Backend-Änderung**: `backend/main.py`

```python
# Detect upgrade
is_upgrade = horse_data.get('isUpgrade', False)

if is_upgrade:
    logger.info(f"Processing UPGRADE for bewertung {bewertung_id}")
    # Same processing as Premium but log as upgrade
```

---

### Phase 10: PDF - Tier-Specific (3h)

**File**: `frontend/components/PferdeWertPDF.tsx`

**Changes:**
```typescript
interface Props {
  bewertung: Bewertung
  tier: 'standard' | 'premium'  // NEW
}

// Premium: Enhanced header
{tier === 'premium' && (
  <View style={styles.premiumBadge}>
    <Text>✨ Premium KI-Vision Analyse</Text>
  </View>
)}

// Premium: Enhanced footer
// Different page expectations (Standard: 15+, Premium: 25+)
```

---

## 7. TESTING CHECKLIST

### Stripe
- [ ] Test Price Objects erstellt (3x: Standard, Premium, Upgrade)
- [ ] Standard checkout funktioniert
- [ ] Premium checkout funktioniert
- [ ] Upgrade checkout funktioniert
- [ ] Korrekte Preise (9.90€ / 19.90€ / 10.00€)
- [ ] Tier in metadata gespeichert
- [ ] Upgrade-Flow: bewertungId verknüpft
- [ ] Promotion Codes funktionieren

### Image Upload
- [ ] 1-5 Bilder upload (success)
- [ ] 6 Bilder upload (fail)
- [ ] >5MB file (fail)
- [ ] PDF upload (fail - wrong type)
- [ ] JPG/PNG/HEIC (success)
- [ ] Files in korrektem Directory
- [ ] Cleanup Cron funktioniert

### Backend
- [ ] Standard text-only funktioniert
- [ ] Premium ohne Bilder (fallback)
- [ ] Premium mit Bildern (vision)
- [ ] Fallback zu GPT-4o funktioniert
- [ ] Error Handling

### End-to-End
- [ ] Standard: Form → Tier → Pay → Result (2 Min)
- [ ] Premium: Form → Tier → Pay → Upload → Result (2 Min)
- [ ] **Upgrade**: Standard Result → Upgrade CTA → Pay 10€ → Upload → Updated Result
- [ ] Upgrade: Keine Dateneingabe nötig (reused from original)
- [ ] PDF enthält tier-spezifischen Content
- [ ] Mobile UX smooth

---

## 8. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] `npm run lint && npm run type-check`
- [ ] Test in Staging
- [ ] Verify env vars

### Stripe Production
- [ ] Create PRODUCTION Price objects
- [ ] Copy Price IDs → .env
- [ ] Test webhook delivery

### Hetzner
- [ ] Create upload directory
- [ ] Set permissions
- [ ] Install cleanup cron
- [ ] Test disk space

### Vercel
- [ ] Deploy frontend
- [ ] Test tier selection
- [ ] Test image upload

### Render
- [ ] Deploy backend
- [ ] Verify vision AI works
- [ ] Monitor logs

---

## 9. RISIKEN & MITIGATION

| Risiko | Mitigation |
|--------|------------|
| Image upload fails | Timeout nach 2 Min → Email an Kunde → Manuell reprocessing |
| Vision AI fails | Graceful degradation zu text-only + Log error + Fallback GPT-4o |
| Disk space full | Disk usage alerts + Backup cleanup (7-day) + 20GB cap |
| Häufige Preisänderungen | Pricing.ts VARS + ggf. Stripe Lookup Keys |
| User Confusion | Feature-Vergleichstabelle + FAQ + Sample Premium PDF |

---

## 10. EMPFOHLENER ROLLOUT (PHASED APPROACH)

**Week 1**: Deploy Standard only (Preissenkung 19.90€ → 9.90€)
- Niedrigstes Risiko
- Test Stripe mit neuem Preis
- Monitor Conversion

**Week 2**: Add Premium tier (Soft Launch, kein Marketing)
- Test Image Upload
- Test Vision AI
- Fix Bugs

**Week 3**: Full Launch mit Marketing
- Announcement
- Email-Kampagne
- Social Media

**Vorteil**: Bug-Fixes möglich bevor Premium öffentlich

---

## 11. CRITICAL FILES

### Frontend
- `frontend/lib/pricing.ts` - PRICING_TIERS + PRICING_UPGRADE config
- `frontend/pages/pferde-preis-berechnen.tsx` - Tier modal
- `frontend/pages/ergebnis.tsx` - Upgrade CTA integration
- `frontend/pages/api/checkout.ts` - Tier handling
- `frontend/pages/api/checkout-upgrade.ts` - NEW: Upgrade checkout
- `frontend/pages/api/upload-images.ts` - NEW: Upload endpoint
- `frontend/pages/api/webhook.ts` - Upgrade flow handling
- `frontend/components/TierSelectionModal.tsx` - NEW: Modal
- `frontend/components/UpgradeToPremiumCTA.tsx` - NEW: Upgrade CTA
- `frontend/components/ImageUpload.tsx` - NEW: Upload UI
- `frontend/components/StripeLoadingScreen.tsx` - Image upload integration
- `frontend/components/PferdeWertPDF.tsx` - Tier-specific PDF

### Backend
- `backend/main.py` - BewertungRequest schema
- `backend/ai_clients/ai_service.py` - Vision AI integration

### Database
- `bewertungen` collection - tier + images fields

---

## 12. TIMELINE

**Week 1**: Pricing + DB + Tier Selection (20h)
**Week 2**: Image Upload Frontend + Backend (16h)
**Week 3**: Vision AI + PDF + Webhook (10h)
**Week 4**: Upgrade-Flow + Testing (12h)
**Week 5**: Deployment (4h)

**Total: 50-60h** (inkl. 8h Buffer für Upgrade-Feature)

---

## 13. UPGRADE-FLOW DETAILS

### Warum Upgrade wichtig ist

**Conversion-Optimierung:**
- Kunde kann Standard erst "testen" (niedrige Einstiegshürde 9.90€)
- Nach Ergebnis sieht er Wert → bereit für Upgrade
- Keine Dateneingabe = weniger Friction
- Nur 10€ Differenz wirkt günstiger als direkt 19.90€

**UX-Vorteile:**
- Kunde muss Daten nicht nochmal eingeben
- Nahtloser Übergang (gleiche bewertungId)
- Sofortiger Mehrwert (nur Bilder hochladen)

### Technische Herausforderungen

1. **Bewertung aktualisieren statt neu erstellen**
   - Gleiche _id beibehalten
   - tier: 'standard' → 'premium' update
   - Neue Felder: upgraded: true, upgradedAt: Date

2. **Formular-Daten wiederverwenden**
   - In MongoDB: formData field speichern
   - Bei Upgrade: formData aus DB laden
   - An Backend mit images senden

3. **Stripe-Verknüpfung**
   - Upgrade-Session metadata: { bewertungId, upgradeFrom: 'standard' }
   - Webhook erkennt Upgrade via upgradeFrom field

---

## 14. NÄCHSTE SCHRITTE

1. ✅ Plan finalisiert (inkl. Upgrade-Flow)
2. ✅ Plan nach `.working/` kopiert
3. ⏭️ Stripe Price Objects erstellen (3x: Standard, Premium, Upgrade)
4. ⏭️ Implementation starten (Phase 1)

---

**Status**: Plan finalisiert und bereit zur Implementierung
