# 📧 E-Mail-Vorlagen - 3-Tier Pricing System

**PferdeWert.de - Professionelle HTML E-Mail-Vorlagen für alle Pricing Tiers**

Datum: 04.09.2025  
Version: 1.0  
System: 3-Tier Pricing (Basic €14.90 | Pro €19.90 | Premium €39.90)

---

## 📋 Übersicht der E-Mail-Vorlagen

### 1. **Basic Tier Success E-Mail** - Upgrade Empfehlung
- **Zweck**: Hinweis auf Pro Upgrade für vollständige Analyse
- **Zielgruppe**: Basic-Kunden (€14.90)
- **CTA**: Subtiles Upgrade-Angebot zu Pro

### 2. **Pro Tier Success E-Mail** - Standard Success
- **Zweck**: Standard Success mit vollständiger Analyse-Zugang
- **Zielgruppe**: Pro-Kunden (€19.90)
- **CTA**: PDF-Download und Zufriedenheits-Feedback

### 3. **Premium Tier Success E-Mail** - Foto-Upload Prozess
- **Zweck**: Google Forms Link für Premium Foto-Upload Workflow
- **Zielgruppe**: Premium-Kunden (€39.90)
- **CTA**: Foto-Upload für Exterieur-Bewertung

### 4. **Admin Notification E-Mail** - Optimiert
- **Zweck**: Interne Team-Benachrichtigung mit Tier-Info
- **Empfänger**: kauf@pferdewert.de Team
- **Inhalt**: Kaufdetails + Kundendaten + Tier-Spezifika

---

## 🎨 Brand Guidelines für E-Mails

### **Farbschema**
- **Primary Blue**: `#2563eb` (CTAs, Links)
- **Success Green**: `#16a34a` (Bestätigungen)
- **Warning Orange**: `#ea580c` (Upgrade-Hints)
- **Text Gray**: `#374151` (Body Text)
- **Light Gray**: `#f8f9fa` (Backgrounds)

### **Typografie**
- **Schriftart**: Arial, Helvetica, sans-serif
- **H1**: 24px, bold, #2563eb
- **H2**: 20px, bold, #374151
- **Body**: 16px, normal, #374151
- **Small**: 14px, normal, #6b7280

### **Mobile Responsive**
- Fluid Layout (100% width)
- Minimum 44px touch targets
- Single column design
- Optimized for 320px+ screens

---

## 📧 E-Mail Vorlagen (Copy-Paste Ready)

### 1. **BASIC TIER SUCCESS E-MAIL**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🐴 Deine Basic Pferdebewertung ist fertig!</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px 20px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .upgrade-box { background: #fff7ed; border: 2px solid #ea580c; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .upgrade-box h3 { color: #ea580c; margin-top: 0; }
    .cta-button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0; }
    .cta-button:hover { background: #1d4ed8; }
    .upgrade-button { background: #ea580c; }
    .upgrade-button:hover { background: #dc2626; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
    .divider { border-top: 1px solid #e5e7eb; margin: 25px 0; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🐴 Deine Basic Bewertung ist fertig!</h1>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h2>Hallo!</h2>
      
      <p>Deine <strong>Basic Pferdebewertung (€14.90)</strong> wurde erfolgreich erstellt und steht jetzt zur Verfügung.</p>
      
      <!-- CTA Button -->
      <p style="text-align: center;">
        <a href="https://www.pferdewert.de/ergebnis?id={{DOC_ID}}{{READ_TOKEN}}" class="cta-button">
          🐴 Zur Basic Bewertung
        </a>
      </p>
      
      <!-- Upgrade Box -->
      <div class="upgrade-box">
        <h3>💡 Möchtest du die vollständige Analyse sehen?</h3>
        <p><strong>Basic Bewertung enthält:</strong> Preisspanne + Marktübersicht (~30% der vollständigen Analyse)</p>
        
        <p><strong>Pro Upgrade (nur €5 mehr!) bietet dir:</strong></p>
        <ul>
          <li>✅ <strong>Vollständige AI-Analyse</strong> mit allen Details</li>
          <li>✅ <strong>PDF-Report</strong> für deine Unterlagen</li>
          <li>✅ <strong>Detaillierte Bewertungsfaktoren</strong></li>
          <li>✅ <strong>Marktvergleiche</strong> und Empfehlungen</li>
        </ul>
        
        <p style="text-align: center;">
          <a href="https://www.pferdewert.de/upgrade?from=basic&id={{DOC_ID}}" class="cta-button upgrade-button">
            🚀 Upgrade zur Pro-Analyse (€19.90)
          </a>
        </p>
        
        <p style="font-size: 14px; color: #6b7280;">
          <em>Du zahlst nur die Differenz von €5.00 zu deinem Basic-Kauf.</em>
        </p>
      </div>
      
      <div class="divider"></div>
      
      <p><strong>Bei Fragen sind wir für dich da:</strong><br>
      📧 <a href="mailto:info@pferdewert.de">info@pferdewert.de</a></p>
      
      <p>Viele Grüße,<br>
      <strong>Dein PferdeWert-Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>PferdeWert.de - KI-gestützte Pferdebewertung<br>
      Diese E-Mail wurde automatisch generiert.</p>
    </div>
  </div>
</body>
</html>
```

---

### 2. **PRO TIER SUCCESS E-MAIL**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🐴 Deine Pro Pferdebewertung ist fertig!</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px 20px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .success-box { background: #f0f9ff; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .success-box h3 { color: #2563eb; margin-top: 0; }
    .cta-button { display: inline-block; background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0; }
    .cta-button:hover { background: #15803d; }
    .features-list { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
    .divider { border-top: 1px solid #e5e7eb; margin: 25px 0; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🐴 Deine Pro Bewertung ist fertig!</h1>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h2>Perfekt! 🎉</h2>
      
      <p>Deine <strong>Pro Pferdebewertung (€19.90)</strong> wurde erfolgreich abgeschlossen und steht jetzt vollständig zur Verfügung.</p>
      
      <!-- Success Box -->
      <div class="success-box">
        <h3>✅ Du erhältst die vollständige Analyse:</h3>
        <div class="features-list">
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>🤖 Komplette AI-Bewertung</strong> mit allen Details</li>
            <li><strong>📄 PDF-Report</strong> zum Download für deine Unterlagen</li>
            <li><strong>📊 Detaillierte Marktanalyse</strong> und Preisvergleiche</li>
            <li><strong>💡 Bewertungsfaktoren</strong> und Empfehlungen</li>
            <li><strong>🎯 Verkaufs-/Kaufberatung</strong> basierend auf den Daten</li>
          </ul>
        </div>
      </div>
      
      <!-- CTA Button -->
      <p style="text-align: center;">
        <a href="https://www.pferdewert.de/ergebnis?id={{DOC_ID}}{{READ_TOKEN}}" class="cta-button">
          🐴 Zur vollständigen Bewertung & PDF-Download
        </a>
      </p>
      
      <div class="divider"></div>
      
      <p><strong>💡 Tipp:</strong> Lade dir unbedingt das PDF herunter und speichere den Link - so hast du deine Bewertung immer griffbereit!</p>
      
      <p><strong>Fragen oder Feedback?</strong><br>
      Wir freuen uns über deine Rückmeldung: 📧 <a href="mailto:info@pferdewert.de">info@pferdewert.de</a></p>
      
      <p>Viele Grüße,<br>
      <strong>Dein PferdeWert-Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>PferdeWert.de - KI-gestützte Pferdebewertung<br>
      Diese E-Mail wurde automatisch generiert.</p>
      
      <p style="font-size: 12px; margin-top: 15px;">
        <a href="https://www.pferdewert.de/bewertung-teilen" style="color: #2563eb;">📱 Bewertung teilen</a> | 
        <a href="https://www.pferdewert.de/weitere-bewertung" style="color: #2563eb;">🐴 Weiteres Pferd bewerten</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### 3. **PREMIUM TIER SUCCESS E-MAIL**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🐴 Deine Premium Bewertung - Nächster Schritt: Foto-Upload</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 30px 20px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .premium-box { background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 30%); border: 2px solid #f59e0b; border-radius: 8px; padding: 25px; margin: 20px 0; }
    .premium-box h3 { color: #92400e; margin-top: 0; font-size: 20px; }
    .upload-steps { background: white; padding: 20px; border-radius: 6px; margin: 15px 0; }
    .step { display: flex; align-items: flex-start; margin: 15px 0; }
    .step-number { background: #7c3aed; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
    .cta-button { display: inline-block; background: #7c3aed; color: white; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0; font-size: 18px; }
    .cta-button:hover { background: #6d28d9; }
    .analysis-button { background: #16a34a; margin-left: 10px; }
    .analysis-button:hover { background: #15803d; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
    .divider { border-top: 1px solid #e5e7eb; margin: 25px 0; }
    .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🏆 Premium Bewertung - Fast geschafft!</h1>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h2>Glückwunsch! 🎉</h2>
      
      <p>Du hast die <strong>Premium Pferdebewertung (€39.90)</strong> erworben. Deine Grundanalyse ist bereits fertig, und jetzt folgt der exklusive Premium-Service:</p>
      
      <!-- Premium Box -->
      <div class="premium-box">
        <h3>🏆 Premium Service: Exterieur-Bewertung mit Fotos</h3>
        <p><strong>Das macht den Premium-Service besonders:</strong></p>
        <ul>
          <li>✅ <strong>Vollständige Pro-Analyse</strong> bereits verfügbar</li>
          <li>🏆 <strong>Exterieur-Bewertung</strong> basierend auf deinen Pferdefotos</li>
          <li>📸 <strong>Professionelle Foto-Analyse</strong> von Körperbau und Typ</li>
          <li>📋 <strong>Detaillierter Exterieur-Report</strong> als Zusatz-PDF</li>
        </ul>
      </div>
      
      <!-- Upload Steps -->
      <div class="upload-steps">
        <h3 style="color: #7c3aed; margin-top: 0;">📸 So geht's weiter - Foto-Upload in 3 Schritten:</h3>
        
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <strong>Fotos vorbereiten:</strong><br>
            Bitte bereite <span class="highlight">4-6 hochwertige Fotos</span> deines Pferdes vor:
            <ul style="margin-top: 8px; margin-bottom: 0;">
              <li>Seitliche Ganzkörper-Aufnahme (wichtigste!)</li>
              <li>Frontale Ansicht</li>
              <li>Hintere Ansicht</li>
              <li>Kopf-Detail (optional)</li>
            </ul>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div>
            <strong>Upload über Google Forms:</strong><br>
            Klicke auf den Button unten und lade deine Fotos im Formular hoch. Das Formular ist speziell für Premium-Kunden eingerichtet.
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div>
            <strong>Exterieur-Bewertung erhalten:</strong><br>
            Innerhalb von <span class="highlight">24-48 Stunden</span> erhältst du deinen zusätzlichen Exterieur-Report per E-Mail.
          </div>
        </div>
      </div>
      
      <!-- CTA Buttons -->
      <p style="text-align: center;">
        <a href="https://forms.google.com/premium-foto-upload?customer_id={{DOC_ID}}" class="cta-button">
          📸 Jetzt Fotos hochladen (Premium)
        </a>
        <br>
        <a href="https://www.pferdewert.de/ergebnis?id={{DOC_ID}}{{READ_TOKEN}}" class="cta-button analysis-button">
          🐴 Zur Grundanalyse (bereits verfügbar)
        </a>
      </p>
      
      <div class="divider"></div>
      
      <p><strong>💡 Wichtiger Hinweis:</strong> Du kannst deine Grundbewertung bereits jetzt einsehen und das PDF herunterladen. Der Exterieur-Report wird als separates PDF nachgeliefert.</p>
      
      <p><strong>Fragen zum Premium-Service?</strong><br>
      📧 <a href="mailto:premium@pferdewert.de">premium@pferdewert.de</a> | 📞 <em>Telefon-Support für Premium-Kunden verfügbar</em></p>
      
      <p>Viele Grüße,<br>
      <strong>Dein PferdeWert Premium-Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p><strong>🏆 PferdeWert.de Premium Service</strong><br>
      Professionelle KI-gestützte Pferdebewertung mit Exterieur-Analyse</p>
      
      <p style="font-size: 12px; margin-top: 15px;">
        Diese E-Mail wurde automatisch generiert.<br>
        Premium Support: <a href="mailto:premium@pferdewert.de">premium@pferdewert.de</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### 4. **ADMIN NOTIFICATION E-MAIL** (Optimiert)

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>💰 Neuer Kauf auf PferdeWert.de</title>
  <style>
    body { font-family: 'Courier New', monospace; margin: 0; padding: 20px; background-color: #1a1a1a; color: #e5e5e5; }
    .container { max-width: 800px; margin: 0 auto; background: #2a2a2a; border-radius: 8px; padding: 20px; }
    .header { background: #0ea5e9; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .tier-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .tier-basic { background: #f59e0b; color: white; }
    .tier-pro { background: #16a34a; color: white; }
    .tier-premium { background: #7c3aed; color: white; }
    .section { background: #3a3a3a; padding: 15px; margin: 15px 0; border-radius: 6px; }
    .section h3 { margin-top: 0; color: #60a5fa; }
    .required-fields { border-left: 4px solid #dc2626; }
    .optional-fields { border-left: 4px solid #2563eb; }
    .ai-response { background: #1e293b; border: 1px solid #475569; }
    .field-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; align-items: center; }
    .field-label { font-weight: bold; color: #94a3b8; }
    .field-value { background: #1a1a1a; padding: 8px; border-radius: 4px; }
    .empty-field { color: #6b7280; font-style: italic; }
    @media (max-width: 600px) { .field-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>💰 Neuer Kauf auf PferdeWert.de!</h1>
      <span class="tier-badge tier-{{TIER_CLASS}}">{{TIER_NAME}} - {{AMOUNT}}</span>
    </div>
    
    <!-- Payment Details Section -->
    <div class="section">
      <h3>💳 Zahlungsdetails</h3>
      <div class="field-grid">
        <span class="field-label">Session ID:</span>
        <span class="field-value">{{SESSION_ID}}</span>
        
        <span class="field-label">Betrag:</span>
        <span class="field-value">{{AMOUNT}}</span>
        
        <span class="field-label">Tier:</span>
        <span class="field-value tier-badge tier-{{TIER_CLASS}}">{{TIER_NAME}}</span>
        
        <span class="field-label">Kunde E-Mail:</span>
        <span class="field-value">{{CUSTOMER_EMAIL}}</span>
        
        <span class="field-label">Zeitstempel:</span>
        <span class="field-value">{{TIMESTAMP}}</span>
      </div>
    </div>
    
    <!-- Required Fields -->
    <div class="section required-fields">
      <h3>🔴 Pflichtfelder (Kundeneingabe)</h3>
      <div class="field-grid">
        <span class="field-label">Rasse:</span>
        <span class="field-value">{{RASSE}}</span>
        
        <span class="field-label">Alter:</span>
        <span class="field-value">{{ALTER}} Jahre</span>
        
        <span class="field-label">Geschlecht:</span>
        <span class="field-value">{{GESCHLECHT}}</span>
        
        <span class="field-label">Stockmaß:</span>
        <span class="field-value">{{STOCKMASS}} cm</span>
        
        <span class="field-label">Haupteignung:</span>
        <span class="field-value">{{HAUPTEIGNUNG}}</span>
        
        <span class="field-label">Ausbildungsstand:</span>
        <span class="field-value">{{AUSBILDUNG}}</span>
      </div>
    </div>
    
    <!-- Optional Fields -->
    <div class="section optional-fields">
      <h3>🔵 Optionale Felder</h3>
      <div class="field-grid">
        <span class="field-label">Turniererfahrung:</span>
        <span class="field-value">{{ERFOLGE}}</span>
        
        <span class="field-label">Abstammung:</span>
        <span class="field-value">{{ABSTAMMUNG}}</span>
        
        <span class="field-label">Charakter:</span>
        <span class="field-value">{{CHARAKTER}}</span>
        
        <span class="field-label">Gesundheit/AKU:</span>
        <span class="field-value">{{AKU}}</span>
        
        <span class="field-label">Besonderheiten:</span>
        <span class="field-value">{{BESONDERHEITEN}}</span>
        
        <span class="field-label">Standort (PLZ):</span>
        <span class="field-value">{{STANDORT}}</span>
      </div>
    </div>
    
    <!-- Marketing Data -->
    <div class="section">
      <h3>📊 Marketing & Analytics</h3>
      <div class="field-grid">
        <span class="field-label">Quelle:</span>
        <span class="field-value">{{ATTRIBUTION_SOURCE}}</span>
        
        <span class="field-label">Conversion Tier:</span>
        <span class="field-value tier-badge tier-{{TIER_CLASS}}">
          {{TIER_NAME}} (€{{TIER_PRICE}})
        </span>
      </div>
    </div>
    
    <!-- AI Response -->
    <div class="section ai-response">
      <h3>🤖 KI-Bewertung</h3>
      <div style="background: #0a0a0a; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.4; max-height: 400px; overflow-y: auto;">{{RAW_GPT}}</div>
    </div>
    
    <!-- Action Items (Tier-specific) -->
    <div class="section" style="border: 2px solid #f59e0b;">
      <h3>⚡ Tier-spezifische Aktionen</h3>
      <div id="tier-actions">
        <!-- Basic Tier -->
        <div class="tier-basic-actions" style="display: {{BASIC_DISPLAY}};">
          <p>🟡 <strong>Basic Tier:</strong> Kunde erhält limitierte Analyse (30%). 
          <strong>Upgrade-Potential überwachen!</strong></p>
        </div>
        
        <!-- Pro Tier -->
        <div class="tier-pro-actions" style="display: {{PRO_DISPLAY}};">
          <p>🟢 <strong>Pro Tier:</strong> Standard-Service. Kunde erhält vollständige Analyse + PDF. 
          <strong>Keine weiteren Aktionen nötig.</strong></p>
        </div>
        
        <!-- Premium Tier -->
        <div class="tier-premium-actions" style="display: {{PREMIUM_DISPLAY}};">
          <p>🟣 <strong>Premium Tier:</strong> 
          <strong style="color: #f59e0b;">AKTION ERFORDERLICH!</strong></p>
          <p>1. ✅ Kunde sollte Google Forms E-Mail für Foto-Upload erhalten haben<br>
          2. 📸 Fotos überwachen auf: <a href="https://forms.google.com/premium-uploads" style="color: #60a5fa;">Google Forms Dashboard</a><br>
          3. ⏰ Exterieur-Bewertung binnen 24-48h erstellen<br>
          4. 📧 Nachfolge-E-Mail mit Exterieur-PDF senden</p>
        </div>
      </div>
    </div>
    
    <!-- Quick Links -->
    <div class="section">
      <h3>🔗 Quick Actions</h3>
      <p>
        <a href="https://www.pferdewert.de/admin/bewertung/{{DOC_ID}}" style="color: #60a5fa;">🔍 Bewertung ansehen</a> | 
        <a href="https://dashboard.stripe.com/payments/{{SESSION_ID}}" style="color: #60a5fa;">💳 Stripe Payment</a> | 
        <a href="https://www.pferdewert.de/admin/analytics" style="color: #60a5fa;">📊 Analytics Dashboard</a>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #475569; color: #6b7280; font-size: 12px;">
      <p>🤖 Automatisch generiert vom PferdeWert.de Webhook-System<br>
      Timestamp: {{CURRENT_TIMESTAMP}} | Version: 1.0</p>
    </div>
  </div>
</body>
</html>
```

---

## 🔧 Technische Integration

### **Webhook Anpassungen (webhook.ts)**

```typescript
// Tier-spezifische E-Mail-Logik
const selectedTier = session?.metadata?.selectedTier || 'basic';
const customerEmail = session.customer_details?.email;

if (customerEmail && resend) {
  let emailTemplate: string;
  let emailSubject: string;
  
  switch (selectedTier) {
    case 'basic':
      emailTemplate = BASIC_TIER_EMAIL_TEMPLATE;
      emailSubject = "🐴 Deine Basic Pferdebewertung ist fertig!";
      break;
    case 'pro':
      emailTemplate = PRO_TIER_EMAIL_TEMPLATE;
      emailSubject = "🐴 Deine Pro Pferdebewertung ist fertig!";
      break;
    case 'premium':
      emailTemplate = PREMIUM_TIER_EMAIL_TEMPLATE;
      emailSubject = "🐴 Deine Premium Bewertung - Nächster Schritt: Foto-Upload";
      break;
    default:
      emailTemplate = PRO_TIER_EMAIL_TEMPLATE; // Fallback
      emailSubject = "🐴 Deine Pferdebewertung ist fertig!";
  }
  
  // Replace placeholders
  const personalizedEmail = emailTemplate
    .replace(/{{DOC_ID}}/g, doc._id.toString())
    .replace(/{{READ_TOKEN}}/g, doc.readToken ? `&token=${doc.readToken}` : '');
    
  await resend.emails.send({
    from: "PferdeWert <info@pferdewert.de>",
    to: customerEmail,
    subject: emailSubject,
    html: personalizedEmail
  });
}
```

### **Admin E-Mail Erweiterte Variablen**

```typescript
// Admin E-Mail mit Tier-spezifischen Details
const adminEmailHtml = ADMIN_EMAIL_TEMPLATE
  .replace(/{{SESSION_ID}}/g, sessionId)
  .replace(/{{AMOUNT}}/g, amount)
  .replace(/{{CUSTOMER_EMAIL}}/g, customerEmail || 'unbekannt')
  .replace(/{{TIER_NAME}}/g, selectedTier.toUpperCase())
  .replace(/{{TIER_CLASS}}/g, selectedTier)
  .replace(/{{TIER_PRICE}}/g, getTierPrice(selectedTier))
  .replace(/{{RAW_GPT}}/g, rawGpt)
  .replace(/{{DOC_ID}}/g, doc._id.toString())
  .replace(/{{CURRENT_TIMESTAMP}}/g, new Date().toISOString())
  // Tier-specific display logic
  .replace(/{{BASIC_DISPLAY}}/g, selectedTier === 'basic' ? 'block' : 'none')
  .replace(/{{PRO_DISPLAY}}/g, selectedTier === 'pro' ? 'block' : 'none')
  .replace(/{{PREMIUM_DISPLAY}}/g, selectedTier === 'premium' ? 'block' : 'none')
  // Form field replacements
  .replace(/{{RASSE}}/g, rasse || '<span class="empty-field">nicht angegeben</span>')
  .replace(/{{ALTER}}/g, alter ? `${alter}` : '<span class="empty-field">nicht angegeben</span>')
  // ... weitere Feldersetzungen
```

---

## ✅ **Implementierungs-Checkliste**

### **Phase 1: E-Mail Templates (Sofort)**
- [ ] E-Mail-Templates als Konstanten in webhook.ts definieren
- [ ] Tier-Detection Logik implementieren
- [ ] Template-Replacement Funktion erstellen
- [ ] Test-E-Mails für alle 3 Tiers senden

### **Phase 2: Admin Dashboard Erweiterung**
- [ ] Admin-E-Mail mit Tier-spezifischen Action Items
- [ ] Google Forms Integration für Premium vorbereiten
- [ ] Tier-Analytics in Admin Dashboard

### **Phase 3: Upgrade-Flow (Basic → Pro)**
- [ ] Upgrade-Landing-Page erstellen
- [ ] Differenz-Payment über Stripe implementieren
- [ ] Basic-to-Pro Conversion Tracking

### **Phase 4: Premium Workflow**
- [ ] Google Forms für Foto-Upload erstellen
- [ ] Exterieur-Bewertung Workflow definieren
- [ ] Nachfolge-E-Mail für Exterieur-Report

---

## 🎯 **Performance KPIs**

### **E-Mail Metriken**
- **Öffnungsraten** pro Tier (Ziel: >40%)
- **Click-Through-Raten** auf CTAs (Ziel: >25%)
- **Upgrade-Rate Basic→Pro** (Ziel: >15%)

### **Customer Satisfaction**
- **PDF Download Rate** (Pro/Premium: Ziel >80%)
- **Premium Foto-Upload Rate** (Ziel >60%)
- **Support Ticket Reduction** durch bessere E-Mail-Kommunikation

### **Conversion Tracking**
- **Tier Distribution** über Zeit verfolgen
- **Revenue per Tier** analysieren
- **Premium Service Completion Rate** messen

---

*© 2025 PferdeWert.de - Professionelle E-Mail-Vorlagen für 3-Tier Pricing System*