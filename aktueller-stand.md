Projektstatus: PferdeWert.de – Stand GoLive 26.06.2025

✨ Ziel

Online-Plattform zur anonymen, schnellen und professionellen Pferdebewertung mit Fokus auf UX, Conversion und Rechtssicherheit.

🔄 Infrastruktur

Frontend: Next.js (Vercel Deployment)

Backend: FastAPI auf Render.com (kein Stripe-Handling dort)

Deployment: Vercel Production + Preview Umgebung

DNS:

pferdewert.de zeigt auf Vercel

Weiterleitungen von pferde-wert.de, .com, .eu, .org, horse-value.com korrekt eingerichtet bei IONOS

SSL via Vercel aktiv

💳 Stripe-Integration

Live-Modus aktiv (Stripe Dashboard)

Produkt: "Pferdebewertung" für 4,90 EUR (einmalig)

STRIPE_SECRET_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET in Vercel Production gesetzt

Klarna aktiviert, wird bei korrektem Setup im Checkout angezeigt

Webhook: /api/webhook.ts (Next.js API)

Verifiziert checkout.session.completed

Holt Bewertung per session.id und aktualisiert MongoDB

🚀 Frontend

Startseite (/index.tsx): SEO-optimiert, starke H1, Bullet-Points, OG-Tags, responsiv

Bewerten (/bewerten.tsx): Formular mit Validierung, rechtssicheren Checkboxen, Preisangabe, Weiterleitung zu Stripe

Ergebnis (/ergebnis.tsx): Zeigt Ergebnis nach Zahlung

Pages: /agb, /datenschutz, /impressum vorhanden und verlinkt

PDF: Generierung nach Bewertung implementiert

NEXT_PUBLIC_BASE_URL: getrennt für Production (https://pferdewert.de) & Preview gesetzt

⚡ Rechtssicherheit

Impressum, Datenschutz, AGB sauber eingebunden

Checkboxen zur Einwilligung & Leistungserbringung nach §356 BGB korrekt umgesetzt

Stripe als Zahlungsdienstleister in Datenschutz integriert (empfohlen noch prüfen)

🌐 Domains & Weiterleitungen

pferdewert.de ✔ Valid + HTTPS aktiv

www.pferdewert.de ✔ Weiterleitung aktiv

Weiterleitungen ✔ für: pferde-wert.de, .com, .eu, .org, horse-value.com

Kein SSL-Zertifikat bei IONOS notwendig (Vercel regelt HTTPS)

🔄 Nächste Schritte (empfohlen)

Stripe Klarna-Darstellung in der Session-Config validieren (payment_method_types: ['card', 'klarna'])

Google Search Console + Plausible / GA4 für Analytics einrichten

Optional: Feedback-Loop / E-Mail-PDF Versand bei Zahlungserfolg

Weiterentwicklung: Feature-Branches, Staging-Umgebung, lokale Tests → nur Test-Stripe Keys

