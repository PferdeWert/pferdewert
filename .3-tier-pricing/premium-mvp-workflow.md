# Premium MVP Workflow

## Overview
Premium-Kunden erhalten **keine automatische AI-Analyse**, sondern einen manuellen Service mit Expertenanalyse.

## Workflow

### 1. Premium Payment
- Kunde zahlt Premium-Preis (39,90€)
- Stripe Checkout erfolgreich

### 2. Premium User Experience  
- **KEIN AI-Analyse-Screen** anzeigen
- **Stattdessen**: Dropbox File Request Link präsentieren
- **Link**: https://www.dropbox.com/request/XLF5Z1TW1S9qHDYk2Phc

### 3. Kundenkommunikation
**Angezeigter Text nach Premium-Zahlung:**
```
Vielen Dank für Ihre Premium-Bestellung! 

Für Ihre detaillierte Expertenanalyse benötigen wir möglichst hochwertige Fotos Ihres Pferdes.

Bitte laden Sie 5-10 Fotos über diesen Link hoch:
[Dropbox Upload Link]

Nach dem Upload erhalten Sie Ihre persönliche Expertenanalyse per E-Mail innerhalb von 24 Stunden.
```

### 4. Backend-Workflow
1. **Kunde lädt Fotos hoch** → Dropbox Benachrichtigung
2. **Manuell**: Expertenanalyse mit Prompts + Bildern erstellen  
3. **Detaillierte Analyse per E-Mail** an Kunden senden
4. **Persönlicher Service** statt Automatisierung

## Technical Implementation
- Premium Tier Detection in Frontend
- Conditional Rendering: Upload-Link statt AI-Screen
- E-Mail Template für Premium-Kunden
- Dropbox Integration für File Organization

## Business Logic
- **Standard**: Sofortige AI-Analyse
- **Premium**: Manueller Expertenservice mit höherer Qualität
- **MVP**: Einfache Lösung ohne komplexe Automatisierung