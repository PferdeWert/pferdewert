# Google Analytics Planung für PferdeWert.de

## Aktueller Stand (Analysiert am 18.08.2025)

### ✅ Bereits implementiert:
- **GA4 Setup**: Google Analytics ist über `frontend/lib/analytics.ts` implementiert
- **DSGVO-konform**: Cookie Consent mit `SimpleCookieConsent.tsx`
- **Umfangreiche Events**: 8 verschiedene Event-Typen werden getrackt
- **E-commerce Tracking**: Purchase und begin_checkout Events für Stripe-Integration

### 📊 Aktuelle Event-Struktur:

#### 1. **Conversion Events (Hauptziele)**
- `purchase` - Erfolgreiche Zahlung (14,90€) 
- `pferde_bewertung_completed` - Hauptkonversion für GA4 Goals
- `begin_checkout` - Payment-Start

#### 2. **Engagement Events**
- `form_progress` - Fortschritt durch Bewertungsformular
- `file_download` - PDF-Download
- `form_abandon` - Formular-Abbruch (für Optimierung)

#### 3. **Funnel Events**
- `pferde_bewertung_started` - Start der Bewertung
- `pferde_payment_started` - Payment-Prozess begonnen

#### 4. **SEO Events**
- `regional_keyword_landing` - Regionale Keywords (für SEO-Insights)

---

## 📋 Umsetzungsplan

### Phase 1: GA4 Dashboard Setup (Sofort)
1. **Conversions konfigurieren** - Wichtigste Events als Conversion markieren
2. **Audiences erstellen** - Für verschiedene Nutzergruppen
3. **Goals definieren** - Klare KPIs festlegen
4. **Funnel-Analyse einrichten** - Von Landing Page bis Conversion

### Phase 2: Enhanced Tracking (1-2 Wochen)
1. **Scroll-Tracking hinzufügen** - Wie tief scrollen Nutzer?
2. **Page Engagement** - Zeit auf Seite, Interaktionen
3. **Error Tracking** - JavaScript-Fehler, failed API calls
4. **Search Terms** - Interne Suche (falls relevant)

### Phase 3: Advanced Analytics (2-4 Wochen)
1. **Custom Dimensions** - Pferde-spezifische Eigenschaften
2. **Attribution Models** - Multi-Touch Attribution
3. **Cohort Analysis** - Nutzerverhalten über Zeit
4. **Predictive Metrics** - Churn-Prediction, Purchase Probability

---

## 🎯 Guidelines für PferdeWert.de

### DO's ✅
- **Datenschutz first**: Alle Events nur mit User-Consent
- **Business-fokussiert**: Events die ROI/Optimierung ermöglichen
- **Consistent naming**: `pferde_` Prefix für custom events
- **Rich metadata**: Relevante custom parameters mitschicken

### DON'Ts ❌
- **Keine PII**: Keine persönlichen Daten in Events
- **Nicht over-tracken**: Nur relevante Events (Performance)
- **Keine irrelevanten Events**: Jedes Event sollte Wert haben
- **Nicht ohne Tests**: Events erst testen, dann deployen

---

## 📊 GA4 Dashboard Erklärleitfaden

### 1. **Hauptmetriken (Was du überwachen solltest)**

#### 🔥 Top Priority Metrics:
- **Conversion Rate** - % der Besucher die kaufen
- **Revenue** - Gesamtumsatz (sollte ~50-100€/Woche sein bei deinem Traffic)
- **Session to Purchase** - Wie viele Sessions bis zum Kauf?
- **Form Abandonment Rate** - Wo verlierst du Nutzer?

#### 📈 Engagement Metrics:
- **Pages per Session** - Durchschnittliche Seitenaufrufe
- **Session Duration** - Wie lange bleiben Nutzer?
- **Bounce Rate** - Verlassen nach einer Seite
- **Return Visitor Rate** - Wie viele kommen zurück?

### 2. **Reports die du regelmäßig checken solltest**

#### 📅 Täglich (2-3 Minuten):
- **Realtime Report** - Aktuelle Besucher und Traffic
- **Conversions Report** - Tägliche Verkäufe
- **Acquisition Overview** - Woher kommen die Nutzer?

#### 📅 Wöchentlich (10-15 Minuten):
- **GA4 Intelligence** - Automatische Insights
- **Funnel Analysis** - Wo verlierst du Nutzer im Prozess?
- **Traffic Sources** - Welche Kanäle performen am besten?
- **Page Performance** - Welche Seiten konvertieren?

#### 📅 Monatlich (30-45 Minuten):
- **Audience Analysis** - Wer sind deine besten Kunden?
- **Attribution Analysis** - Customer Journey verstehen
- **Technical Performance** - Page Speed, Errors
- **Custom Reports** - Pferde-spezifische Analysen

### 3. **Konkrete Aktionen für deine 50-100 Besucher/Woche**

#### 🔍 Was du sofort erkennst:
- **Beste Traffic-Quellen**: Google/Social/Direct
- **Conversion-Hotspots**: Welche Seiten verkaufen?
- **Problembereiche**: Wo springen Nutzer ab?
- **Optimale Tageszeiten**: Wann sind Nutzer aktiv?

#### 🎯 Optimierungsansätze:
- **Form-Verbesserung**: Abbruchstellen reduzieren
- **Content-Anpassung**: Beliebte Seiten ausbauen
- **Traffic-Strategie**: Erfolgreiche Kanäle verstärken
- **UX-Optimierung**: Problembereiche überarbeiten

---

## 🛠 Technische Implementierung

### Environment Variables prüfen:
```bash
# Diese sollten gesetzt sein:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Event-Testing:
```javascript
// In Browser Console testen:
gtag('event', 'test_event', {
  'custom_parameter': 'test_value'
});
```

### Debug Mode aktivieren:
- GA4 DebugView für Live-Testing
- Chrome Extension "Google Analytics Debugger"
- Real-time Reports für sofortige Validierung

---

## 📝 Nächste Schritte (Priorität)

### 🚀 Sofort (heute):
1. **GA4 Property prüfen** - Ist alles korrekt konfiguriert?
2. **Conversions aktivieren** - Events als Conversions markieren
3. **Standard-Reports einrichten** - Dashboard personalisieren

### 📈 Diese Woche:
1. **Baseline KPIs dokumentieren** - Aktuelle Performance festhalten
2. **Wöchentliche Reports automatisieren** - Email-Benachrichtigungen
3. **Funnel-Analyse einrichten** - Conversion-Path verstehen

### 🎯 Nächste 2 Wochen:
1. **Enhanced Events implementieren** - Scroll, Engagement, Error-Tracking
2. **Custom Audiences erstellen** - Für Remarketing und Analyse
3. **Attribution Model optimieren** - Bessere Customer Journey Insights

---

## 💡 Pro-Tips für dein MVP

### Bei 50-100 Besuchern/Woche:
- **Fokus auf Conversion Rate** - Jeder Besucher ist wertvoll
- **Qualität über Quantität** - Wenige aber relevante Events
- **Wöchentliche Rhythmus** - Täglich zu wenig Daten
- **Trends über Absolutes** - Richtung wichtiger als exakte Zahlen

### Quick Wins:
- **Mobile vs Desktop** - Unterschiedliche Conversion Rates?
- **Traffic Sources** - Google Organic vs Direct vs Social
- **Time to Convert** - Wie schnell entscheiden sich Nutzer?
- **Returning Visitors** - Kommen zufriedene Kunden zurück?

---

*Erstellt am 18.08.2025 | Status: Ready for Implementation*