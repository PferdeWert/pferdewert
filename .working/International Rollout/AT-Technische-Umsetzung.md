# Österreich-Rollout: Technische Umsetzung
## Konkrete Code-Änderungen für Dev-Team

**Erstellt:** 16. November 2025
**Zielgruppe:** Dev-Team
**Aufwand:** 3-5 Tage

---

## 📋 Übersicht der Änderungen

### Was geändert werden muss:

1. ✅ **Formular:** E-Level nur für DE anzeigen (nicht für AT)
2. ✅ **Payment:** EPS als Zahlungsmethode für AT hinzufügen
3. ✅ **i18n:** next-intl Setup für Locale-Detection
4. ✅ **SEO:** Hreflang Tags gegen Duplicate Content
5. ✅ **KI-Prompt:** Country-Parameter hinzufügen
6. ✅ **Datenbank:** Country-Field zu Bewertungen

---

# 1. Formular-Anpassungen

## 🎯 Ziel
Österreichische Nutzer sollen **kein E-Level** im Ausbildungsstand-Dropdown sehen.

## 📍 Datei
`frontend/pages/pferde-preis-berechnen.tsx`

## 🔍 Aktuelle Situation (Zeile 167)
```typescript
{
  name: "ausbildung",
  label: "Ausbildungsstand",
  type: "select",
  required: true,
  options: ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"],
  halfWidth: true
},
```

## ✏️ Änderung Option A: Conditional Options (EMPFOHLEN)

**Schritt 1:** Locale aus Router holen

```typescript
// Am Anfang der Komponente (nach den imports)
import { useRouter } from 'next/router';

// In der Komponente
export default function PferdePreisBerechnen() {
  const router = useRouter();
  const locale = router.locale || 'de'; // Fallback zu 'de'

  // ... restlicher Code
```

**Schritt 2:** Ausbildungsstufen basierend auf Locale

```typescript
// Vor stepData-Definition (z.B. nach den imports)
const getAusbildungOptions = (locale: string) => {
  const baseOptions = ["roh", "angeritten"];

  if (locale === 'de-AT') {
    // Österreich: Kein E-Level
    return [...baseOptions, "A", "L", "M", "S", "Sonstiges"];
  }

  // Deutschland: Mit E-Level
  return [...baseOptions, "E", "A", "L", "M", "S", "Sonstiges"];
};
```

**Schritt 3:** stepData dynamisch machen

```typescript
// Ändere stepData von const zu function
const getStepData = (locale: string): StepData[] => [
  {
    id: 1,
    title: "Grunddaten",
    // ... (gleich wie vorher)
  },
  {
    id: 2,
    title: "Fähigkeiten",
    subtitle: "Ausbildung & Verwendung",
    description: "Wofür ist dein Pferd ausgebildet?",
    icon: "🏆",
    iconBg: "bg-blue-100",
    fields: [
      {
        name: "haupteignung",
        label: "Haupteignung / Disziplin",
        required: true,
        placeholder: "z.B. Freizeit, Dressur, Springen, Vielseitigkeit",
        halfWidth: true
      },
      {
        name: "ausbildung",
        label: "Ausbildungsstand",
        type: "select",
        required: true,
        options: getAusbildungOptions(locale), // ← HIER DIE ÄNDERUNG!
        halfWidth: true
      },
      // ... restliche Felder
    ]
  },
  // ... restliche Steps
];
```

**Schritt 4:** In der Komponente nutzen

```typescript
export default function PferdePreisBerechnen() {
  const router = useRouter();
  const locale = router.locale || 'de';
  const stepData = getStepData(locale); // Dynamisch basierend auf Locale

  // ... restlicher Code (alles andere bleibt gleich)
```

---

## ✏️ Änderung Option B: Einfachere Variante (nur wenn next-intl noch nicht läuft)

Falls next-intl noch nicht implementiert ist, kannst du erstmal mit URL-Detection arbeiten:

```typescript
// Prüfe ob URL /at/ enthält
const isAustria = router.asPath.includes('/at/');

const ausbildungOptions = isAustria
  ? ["roh", "angeritten", "A", "L", "M", "S", "Sonstiges"] // Kein E
  : ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"]; // Mit E
```

---

## 🧪 Testing

**Test 1: Deutsche Version**
```bash
# Öffne: http://localhost:3000/pferde-preis-berechnen
# Erwartung: Ausbildungsstand zeigt "E" als Option
```

**Test 2: Österreichische Version**
```bash
# Öffne: http://localhost:3000/at/pferde-preis-berechnen
# Erwartung: Ausbildungsstand zeigt KEIN "E"
```

**Test 3: Formular Submit**
```bash
# Fülle Formular in AT-Version aus
# Wähle "A" als Ausbildungsstand
# Submit
# Erwartung: Keine Errors, Weiterleitung zu Stripe Checkout
```

---

# 2. Payment-Anpassungen (Stripe EPS)

## 🎯 Ziel
Österreichische Nutzer sollen **EPS** (Electronic Payment Standard) als Zahlungsoption sehen.

## 📍 Datei
`frontend/pages/api/checkout.ts`

## 🔍 Aktuelle Situation (Zeile 118)
```typescript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card", "klarna", "paypal"],
  // ... rest
});
```

## ✏️ Änderung

**Schritt 1: Country-Detection**

```typescript
// Am Anfang der handler-Funktion (nach Validierung)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ... existing validation code ...

  const validation = BewertungSchema.safeParse(parsedData);
  if (!validation.success) {
    // ... error handling
  }

  const bewertungData = validation.data;

  // NEU: Detect country from form data or locale
  const country = req.body.country || 'DE'; // Fallback zu Deutschland

  info("[CHECKOUT] 🌍 Detected country:", country);
```

**Schritt 2: Payment Methods basierend auf Country**

```typescript
// Helper-Funktion (außerhalb handler, am Anfang der Datei nach imports)
function getPaymentMethods(country: string): string[] {
  const baseMethods = ["card", "paypal"];

  if (country === 'AT') {
    // Österreich: EPS + Sofort zusätzlich
    return [...baseMethods, "eps", "sofort"];
  }

  if (country === 'DE') {
    // Deutschland: Klarna + Sofort
    return [...baseMethods, "klarna", "sofort"];
  }

  // Fallback
  return baseMethods;
}
```

**Schritt 3: In Stripe Session nutzen**

```typescript
const session = await stripe.checkout.sessions.create({
  payment_method_types: getPaymentMethods(country), // ← GEÄNDERT!
  line_items: [{ price: STRIPE_CONFIG.priceId, quantity: 1 }],
  mode: "payment",
  allow_promotion_codes: true,
  success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/pferde-preis-berechnen?abgebrochen=1`,
  metadata: {
    bewertungId: bewertungId.toHexString(),
    country: country, // ← NEU: Country in Metadata speichern
    datafast_visitor_id: datafastVisitorId,
    datafast_session_id: datafastSessionId,
    analytics_consent: analyticsConsent ? 'true' : 'false',
  },
});
```

**Schritt 4: Country aus Formular übergeben**

In `pferde-preis-berechnen.tsx` (wo das Formular submitted wird):

```typescript
// Beim Submit (suche nach der Stelle wo checkout.ts aufgerufen wird)
const handleSubmit = async () => {
  const router = useRouter();
  const locale = router.locale || 'de';

  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      country: locale === 'de-AT' ? 'AT' : 'DE', // ← NEU!
    }),
  });

  // ... rest
};
```

---

## 🔧 Stripe Dashboard Setup

**WICHTIG:** Bevor der Code funktioniert, musst du EPS in Stripe aktivieren!

**Schritt 1: Stripe Dashboard öffnen**
```
https://dashboard.stripe.com/settings/payment_methods
```

**Schritt 2: EPS aktivieren**
1. Scrolle zu "Bank debits"
2. Finde "EPS"
3. Toggle auf "ON"
4. Klicke "Save"

**Kosten:**
- EPS Gebühren: 1,4% + €0,25 (gleich wie Karte)
- Keine zusätzlichen Setup-Kosten

**Schritt 3: Test Mode**
Aktiviere EPS auch in Test Mode für Testing!

---

## 🧪 Testing

**Test 1: Deutsche Nutzer (kein EPS)**
```bash
# 1. Öffne: http://localhost:3000/pferde-preis-berechnen
# 2. Fülle Formular aus
# 3. Klicke "Zur Kasse"
# 4. Erwartung in Stripe Checkout:
#    - Karte ✅
#    - PayPal ✅
#    - Klarna ✅
#    - Sofort ✅
#    - EPS ❌ (nicht sichtbar!)
```

**Test 2: Österreichische Nutzer (mit EPS)**
```bash
# 1. Öffne: http://localhost:3000/at/pferde-preis-berechnen
# 2. Fülle Formular aus
# 3. Klicke "Zur Kasse"
# 4. Erwartung in Stripe Checkout:
#    - Karte ✅
#    - PayPal ✅
#    - EPS ✅ (neu!)
#    - Sofort ✅
#    - Klarna ❌ (nicht für AT)
```

**Test 3: EPS Test-Zahlung**
```bash
# In Stripe Test Mode:
# 1. Wähle EPS
# 2. Wähle "Test Bank"
# 3. Klicke "Authorize Test Payment"
# 4. Erwartung: Erfolgreiche Zahlung, Redirect zu /ergebnis
```

**Stripe Test-Daten für EPS:**
- Bank: Beliebige aus der Liste auswählen
- Status: "Successful" auswählen
- Klicke "Authorize"

---

# 3. Datenbank-Änderung

## 🎯 Ziel
Speichere das Land (AT/DE) für jede Bewertung, um später Analytics zu machen.

## 📍 Datei
`frontend/pages/api/checkout.ts`

## 🔍 Aktuelle Situation (Zeile 135-141)
```typescript
await collection.insertOne({
  _id: bewertungId,
  ...bewertungData,
  status: "offen",
  stripeSessionId: session.id,
  erstellt: new Date(),
});
```

## ✏️ Änderung

```typescript
await collection.insertOne({
  _id: bewertungId,
  ...bewertungData,
  country: country, // ← NEU: Land speichern
  status: "offen",
  stripeSessionId: session.id,
  erstellt: new Date(),
});
```

---

## 🔍 MongoDB Schema (zur Info)

**Neu:**
```javascript
{
  _id: ObjectId("..."),
  rasse: "Hannoveraner",
  alter: 8,
  geschlecht: "Wallach",
  ausbildung: "L",
  country: "AT", // ← NEU! (DE oder AT)
  status: "offen",
  stripeSessionId: "cs_test_...",
  erstellt: ISODate("2025-11-16T12:00:00Z")
}
```

**Nutzen:**
- Analytics: Wie viele AT vs DE Evaluierungen?
- Marketing: ROI pro Land
- Pricing: Evtl. später unterschiedliche Preise?

---

# 4. next-intl Setup (i18n)

## 🎯 Ziel
Automatische Locale-Detection und URL-Routing für /at/

## 📦 Installation

```bash
cd frontend
npm install next-intl
```

---

## 📍 Schritt 1: Middleware erstellen

**Neue Datei:** `frontend/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Unterstützte Locales
  locales: ['de', 'de-AT'],

  // Default Locale
  defaultLocale: 'de',

  // Locale aus Accept-Language Header erkennen
  localeDetection: true,

  // URL-Präfix nur für nicht-default Locales
  localePrefix: 'as-needed', // '/' für DE, '/at/' für AT
});

export const config = {
  // Auf alle Routen außer API, _next, static files anwenden
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**Was passiert?**
- User aus Österreich (Accept-Language: de-AT) → automatisch zu /at/ weitergeleitet
- User aus Deutschland (Accept-Language: de-DE) → bleibt auf /
- Manuelle Navigation zu /at/ funktioniert auch

---

## 📍 Schritt 2: Next.js Config anpassen

**Datei:** `frontend/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // NEU: i18n Config
  i18n: {
    locales: ['de', 'de-AT'],
    defaultLocale: 'de',
    localeDetection: true,
  },

  // ... restliche Config (unverändert)
};

module.exports = nextConfig;
```

---

## 📍 Schritt 3: Übersetzungsdateien

**Struktur:**
```
frontend/
├── messages/
│   ├── de/
│   │   └── common.json
│   └── de-AT/
│       └── common.json
```

**Erstelle:** `frontend/messages/de/common.json`

```json
{
  "months": {
    "january": "Januar",
    "february": "Februar"
  },
  "form": {
    "ausbildung": {
      "label": "Ausbildungsstand",
      "roh": "Roh",
      "angeritten": "Angeritten",
      "e_level": "E - Einsteiger",
      "a_level": "A - Anfänger",
      "l_level": "L - Leistungsklasse",
      "m_level": "M - Mittlere Tour",
      "s_level": "S - Schwere Klasse",
      "other": "Sonstiges"
    }
  }
}
```

**Erstelle:** `frontend/messages/de-AT/common.json`

```json
{
  "months": {
    "january": "Jänner"
  }
}
```

**Wichtig:**
- AT-Datei enthält NUR die Unterschiede!
- Alles andere fällt auf DE zurück

---

## 📍 Schritt 4: Provider in _app.tsx

**Datei:** `frontend/pages/_app.tsx`

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale || 'de'}
      messages={pageProps.messages}
      timeZone="Europe/Vienna" // Default Timezone
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
```

---

## 📍 Schritt 5: Messages in Pages laden

**Beispiel für pferde-preis-berechnen.tsx:**

```typescript
import { GetStaticPropsContext } from 'next';

// Am Ende der Datei hinzufügen:
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}/common.json`),
    }
  };
}
```

---

## 📍 Schritt 6: Übersetzungen nutzen (optional)

Falls du später Texte übersetzen willst:

```typescript
import { useTranslations } from 'next-intl';

export default function PferdePreisBerechnen() {
  const t = useTranslations('form.ausbildung');

  // Nutze so:
  const label = t('label'); // "Ausbildungsstand"

  // Oder direkt im JSX:
  <label>{t('label')}</label>
}
```

**ABER:** Für den Start brauchst du das nicht! Die Locale-Detection reicht.

---

# 5. SEO: Hreflang Tags

## 🎯 Ziel
Google sagen, dass /at/ die österreichische Variante ist (kein Duplicate Content).

## 📍 Datei
`frontend/pages/_document.tsx`

## 🔍 Aktuelle Situation
```typescript
<Head>
  <title>PferdeWert.de</title>
  {/* ... meta tags */}
</Head>
```

## ✏️ Änderung

```typescript
import { useRouter } from 'next/router';

export default function MyDocument() {
  const router = useRouter();
  const locale = router.locale || 'de';

  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pferdewert.de';

  // Aktueller Pfad (ohne Locale)
  const pathname = router.asPath.replace(/^\/at/, ''); // Entferne /at prefix

  return (
    <Html>
      <Head>
        {/* Hreflang Tags für jede Page */}
        <link
          rel="alternate"
          hrefLang="de"
          href={`${baseUrl}${pathname}`}
        />
        <link
          rel="alternate"
          hrefLang="de-AT"
          href={`${baseUrl}/at${pathname}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}${pathname}`}
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={locale === 'de-AT' ? `${baseUrl}/at${pathname}` : `${baseUrl}${pathname}`}
        />
      </Head>
      <body>
        {/* ... */}
      </body>
    </Html>
  );
}
```

**Alternative:** Falls _document.tsx kompliziert ist, kannst du die Hreflang Tags auch in jeder einzelnen Page im `<Head>` hinzufügen.

---

## 🧪 Testing Hreflang

**Test 1: View Source**
```bash
# Öffne: http://localhost:3000/
# Right-Click → "View Page Source"
# Suche nach "hreflang"
# Erwartung:
<link rel="alternate" hreflang="de" href="https://pferdewert.de/" />
<link rel="alternate" hreflang="de-AT" href="https://pferdewert.de/at/" />
```

**Test 2: Google Search Console**
```bash
# Nach Deployment:
# 1. Gehe zu: https://search.google.com/search-console
# 2. Property: pferdewert.de
# 3. Navigiere zu: Einstellungen → Internationale Ausrichtung
# 4. Erwartung: DE und DE-AT werden erkannt
```

---

# 6. KI-Prompt Anpassung

## 🎯 Ziel
KI soll wissen, für welches Land die Bewertung ist.

## 📍 Datei
Vermutlich `backend/main.py` oder wo immer der Prompt definiert ist.

## ✏️ Änderung

**Aktueller Prompt (Deutschland):**
```python
prompt = f"""
Du bist ein professioneller Pferdebewerter.

Bewerte das folgende Pferd:
- Rasse: {data['rasse']}
- Alter: {data['alter']}
- Ausbildung: {data['ausbildung']}
- Disziplin: {data['haupteignung']}
...

Vergleiche mit Marktdaten von ehorses.de.
"""
```

**Neuer Prompt (mit Country):**
```python
def generate_prompt(data: dict, country: str = 'DE'):
    # Datenquelle basierend auf Land
    data_source = 'ehorses.at' if country == 'AT' else 'ehorses.de'

    # AT-spezifische Hinweise
    training_note = ""
    if country == 'AT':
        training_note = "\nHINWEIS: In Österreich gibt es kein E-Niveau. Das Ausbildungssystem startet bei A."

    prompt = f"""
Du bist ein professioneller Pferdebewerter.

Bewerte das folgende Pferd für den {country}-Markt:
- Rasse: {data['rasse']}
- Alter: {data['alter']}
- Ausbildung: {data['ausbildung']}
- Disziplin: {data['haupteignung']}
- Land: {country}
...
{training_note}

Vergleiche mit Marktdaten von {data_source}.
Berücksichtige regionale Marktbesonderheiten.
"""

    return prompt
```

**Nutze so:**
```python
# In der API-Route die Bewertung erstellt
country = request_data.get('country', 'DE')
prompt = generate_prompt(bewertung_data, country=country)

# An OpenAI/Claude senden
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)
```

---

# 7. Locale Switcher (UI)

## 🎯 Ziel
User soll manuell zwischen DE und AT wechseln können.

## 📍 Datei
`frontend/components/Navigation.tsx` (oder Layout.tsx)

## ✏️ Neue Komponente

**Erstelle:** `frontend/components/LocaleSwitcher.tsx`

```typescript
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;

  return (
    <div className="flex items-center gap-2">
      <Link
        href={asPath}
        locale="de"
        className={`
          px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${locale === 'de'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
      >
        🇩🇪 DE
      </Link>

      <Link
        href={asPath}
        locale="de-AT"
        className={`
          px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${locale === 'de-AT'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
      >
        🇦🇹 AT
      </Link>
    </div>
  );
}
```

**Nutze in Navigation:**

```typescript
// In components/Navigation.tsx
import LocaleSwitcher from './LocaleSwitcher';

export default function Navigation() {
  return (
    <nav className="...">
      {/* ... existing nav items ... */}

      <LocaleSwitcher />
    </nav>
  );
}
```

---

# 8. Deployment Checklist

## ✅ Pre-Deployment

**Code:**
- [ ] next-intl installiert
- [ ] middleware.ts erstellt
- [ ] Formular: E-Level conditional
- [ ] Payment: EPS für AT aktiviert
- [ ] Hreflang Tags in allen Pages
- [ ] Country-Field in DB
- [ ] KI-Prompt mit Country-Parameter

**Stripe:**
- [ ] EPS aktiviert in Dashboard (Test Mode)
- [ ] EPS aktiviert in Dashboard (Live Mode)
- [ ] Test-Zahlung mit EPS durchgeführt

**Testing:**
- [ ] Formular DE zeigt E-Level ✅
- [ ] Formular AT zeigt KEIN E-Level ✅
- [ ] Payment DE zeigt Klarna ✅
- [ ] Payment AT zeigt EPS ✅
- [ ] Hreflang Tags sichtbar ✅
- [ ] Keine 404s auf /at/ URLs ✅

**SEO:**
- [ ] sitemap.xml enthält /at/ URLs
- [ ] robots.txt erlaubt /at/
- [ ] Google Search Console /at/ Property hinzugefügt

---

## 🚀 Deployment

```bash
# 1. Commit all changes
git add .
git commit -m "feat: Add Austria support (/at/ locale) with EPS payment"

# 2. Push to main
git push origin main

# 3. Vercel auto-deploys
# 4. Verify deployment in Vercel Dashboard
```

---

## ✅ Post-Deployment Verification

**URLs testen:**
```bash
# Homepage
https://pferdewert.de/          ✅
https://pferdewert.de/at/        ✅

# Formular
https://pferdewert.de/pferde-preis-berechnen     ✅
https://pferdewert.de/at/pferde-preis-berechnen  ✅

# Ratgeber
https://pferdewert.de/pferde-ratgeber/           ✅
https://pferdewert.de/at/pferde-ratgeber/        ✅
```

**Hreflang testen:**
```bash
curl -I https://pferdewert.de/at/ | grep -i hreflang
# Sollte hreflang tags zeigen
```

**Google Search Console:**
```
1. Gehe zu: https://search.google.com/search-console
2. Property: pferdewert.de
3. Sitemaps: Neue sitemap.xml submitten
4. Internationale Ausrichtung: Verifiziere DE und DE-AT
```

---

# 9. Monitoring & Analytics

## 📊 Google Analytics Setup

**Custom Dimension: Country**

```javascript
// In Analytics-Setup (z.B. _app.tsx oder Layout)
gtag('config', 'GA_MEASUREMENT_ID', {
  'custom_map': {
    'dimension1': 'country'
  }
});

// Bei Event senden:
gtag('event', 'evaluation_started', {
  'country': locale === 'de-AT' ? 'AT' : 'DE'
});
```

**Custom Reports:**
- Evaluierungen pro Land (DE vs AT)
- Conversion Rate DE vs AT
- Revenue DE vs AT
- Formular Completion Time DE vs AT

---

# 10. FAQ für Dev-Team

**Q: Muss ich alle Texte übersetzen?**
A: NEIN! Für Start: 99% gleich. Nur "Jänner" statt "Januar" relevant.

**Q: Wie teste ich lokal ob /at/ funktioniert?**
A: `npm run dev` → öffne `http://localhost:3000/at/`

**Q: Was wenn User manuell die Locale ändert?**
A: next-intl speichert Locale in Cookie → bleibt persistent.

**Q: Kostet EPS extra bei Stripe?**
A: Nein, gleiche Gebühren wie Karte (1,4% + €0,25).

**Q: Wie erkenne ich in Analytics AT-Traffic?**
A: URL-Filter auf "/at/" ODER Custom Dimension "country".

**Q: Was wenn AT-Markt nicht funktioniert?**
A: Einfach /at/ URLs auf 404 setzen oder redirecten zu / → kein großer Verlust.

**Q: Brauchen wir separate Datenschutzerklärung für AT?**
A: NEIN! DSGVO gilt EU-weit, gleiche Datenschutzerklärung OK.

---

# Zusammenfassung

## 🎯 Die 3 wichtigsten Änderungen:

1. **Formular:** E-Level nur für DE (3 Zeilen Code)
2. **Payment:** EPS für AT (5 Zeilen Code + Stripe Dashboard)
3. **SEO:** Hreflang Tags (10 Zeilen Code)

**Total Code-Änderungen:** ~50-100 Zeilen
**Aufwand:** 2-3 Tage (mit Testing)
**Risiko:** Sehr niedrig (alles backward-compatible)

## ✅ Success Metrics

**Technisch:**
- [ ] Alle Tests grün
- [ ] Keine Console Errors
- [ ] Lighthouse Score >90

**Business:**
- [ ] Erste AT-Evaluierung innerhalb 7 Tage
- [ ] 5+ AT-Evaluierungen im ersten Monat
- [ ] Conversion Rate AT >1%

---

**Let's go! 🚀🇦🇹**

Bei Fragen → Slack/Email/GitHub Issues
