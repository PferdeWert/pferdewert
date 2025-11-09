# Ratgeber Page Builder - Kompletter Workflow

Automatisierte Erstellung von SEO-optimierten Ratgeber-Seiten nach den Design-Vorgaben von `SEO-DESIGN.md`.

## 🎯 Überblick

Dieser Skill generiert aus SEO-Content (Markdown + Meta-JSON) automatisch eine vollständige Next.js Ratgeber-Page mit allen Design-Guidelines, Components und SEO-Optimierungen.

## 📁 Dateien

Alle Dateien befinden sich in `.claude/skills/ratgeber-builder/`:

1. **`skill.md`** - Skill-Definition für Claude Code (Slash-Command `/ratgeber-builder`)
2. **`template.tsx`** - Vollständiges Page-Template als Basis
3. **`parse-content.mjs`** - Helper-Script zum Content-Parsing
4. **`README.md`** - Diese Dokumentation

## 🚀 Workflow

### Schritt 1: SEO-Content analysieren (Optional aber empfohlen)

Verwende das Parser-Script, um die Content-Struktur zu extrahieren:

```bash
node .claude/skills/ratgeber-builder/parse-content.mjs <keyword>

# Beispiel:
node .claude/skills/ratgeber-builder/parse-content.mjs pferdemarkt
```

**Output:**
- Content-Statistiken (Wortanzahl, Lesezeit)
- Table of Contents Sections (automatisch aus H2 extrahiert)
- Hero-Section Vorschlag (Copy & Paste ready)
- FAQ Items (aus schema-faq.json)
- Registry-Eintrag Vorschlag

### Schritt 2: Skill in Claude Code ausführen

In Claude Code:

```
/ratgeber-builder pferdemarkt
```

Claude Code wird:
1. SEO-Content lesen (FINAL-ARTICLE.md + seo/*.json)
2. Page-Struktur nach Template generieren
3. Content in semantisches HTML konvertieren
4. Meta-Daten integrieren
5. Registry-Eintrag erstellen

### Schritt 3: Content in Page umwandeln

Verwende das Template als Basis:

```bash
# Template befindet sich in:
.claude/skills/ratgeber-builder/template.tsx

# Kopiere es nach:
frontend/pages/pferde-ratgeber/<keyword>.tsx
```

### Schritt 4: Manuelle Anpassungen

Nach der Generierung:

1. **Hero-Image wählen**:
   - WICHTIG: Inhaltsbasierte Benennung (z.B. `horses-field-sunset.webp`)
   - NICHT verwendungsbasiert (❌ `pferdemarkt-hero.webp`)
   - Speicherort: `/public/images/ratgeber/`

2. **Content-Review**:
   - Markdown in semantisches HTML konvertiert?
   - Max. 2-4 strategische HighlightBoxen?
   - Text First Prinzip befolgt?
   - Body Text überall `text-lg`? (NIEMALS `text-sm`)

3. **FAQ Section prüfen**:
   - `sectionSubtitle` themenspezifisch angepasst?
   - KEIN manuelles FAQ Schema im `<Head>`!

4. **Related Articles**:
   - Relevante Artikel aus Registry geholt?
   - Max. 3 Related Articles?

5. **Final CTA**:
   - Standard Image verwendet? (`/images/shared/blossi-shooting.webp`)
   - CTA-Link korrekt? (`/pferde-preis-berechnen`)

### Schritt 5: Registry aktualisieren

```bash
# Eintrag in /frontend/lib/ratgeber-registry.ts hinzufügen
# (wird vom Skill automatisch gemacht, sonst Parser-Output verwenden)
```

### Schritt 6: Sitemap generieren

```bash
cd frontend
npm run sitemap
```

Prüfe die Ausgabe:
- ✅ Neuer Eintrag in `sitemap.xml`?
- ✅ `robots.txt` aktualisiert?

### Schritt 7: Quality Checks

```bash
# Lint & Type-Check
npm run lint && npm run type-check

# Lokaler Test
npm run dev
```

Manuell testen:
- ✅ Page lädt ohne Fehler?
- ✅ Layout Props korrekt? (fullWidth + background)
- ✅ Hero-Section korrekt?
- ✅ Table of Contents funktioniert?
- ✅ FAQ öffnet/schließt?
- ✅ Related Articles angezeigt?
- ✅ Final CTA funktioniert?
- ✅ Mobile Responsiveness?

### Schritt 8: Deployment

```bash
git add .
git commit -m "feat(ratgeber): add <keyword> page"
git push
```

Nach Vercel-Deployment:
1. ✅ Page live unter `/pferde-ratgeber/<keyword>`?
2. ✅ Übersichtsseite zeigt neuen Artikel?
3. ✅ Sitemap korrekt?
4. ✅ Meta-Tags im HTML-Source?

## 📋 Design-Checkliste

### Layout Props (KRITISCH!)
```tsx
<Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
```
- ⚠️ **NIEMALS** Layout ohne diese Props verwenden!

### Content-Struktur
- ✅ **Text First**: 95% semantisches HTML
- ✅ **Max. 2-4 HighlightBoxen** pro Artikel
- ✅ **Body Text**: `text-lg` (NIEMALS `text-sm`)
- ✅ **Duzen**: "Du", "Dein", "Dir"
- ❌ **NIEMALS** InfoBox verwenden (deprecated!)

### Bilder
- ✅ **Inhaltsbasiert**: `horses-mountain-field.webp`
- ❌ **NICHT verwendungsbasiert**: `hero-1.webp`
- ✅ **Speicherort**: `/public/images/ratgeber/`

### SEO & Schema
- ✅ Meta-Tags aus `seo/seo-metadata.json`
- ✅ Article Schema aus `seo/schema-article.json`
- ✅ Breadcrumb Schema aus `seo/schema-breadcrumb.json`
- ❌ **KEIN** FAQ Schema im `<Head>` (wird automatisch generiert!)

### FAQ Section
```tsx
<FAQ
  faqs={faqItems}
  sectionTitle="Häufig gestellte Fragen"
  sectionSubtitle="[Themenspezifisch anpassen!]"  // PFLICHT!
/>
```

### CTAs
- ✅ **Primär-CTA**: "Jetzt Pferdewert berechnen"
- ✅ **Link**: `/pferde-preis-berechnen` (NICHT `/bewertung`!)
- ✅ **Final CTA Image**: `/images/shared/blossi-shooting.webp`

## 🚨 Häufige Fehler vermeiden

### ❌ Falsch:

```tsx
// Box-Inflation
<RatgeberHighlightBox title="Überschrift 1">...</RatgeberHighlightBox>
<RatgeberHighlightBox title="Überschrift 2">...</RatgeberHighlightBox>
<RatgeberHighlightBox title="Überschrift 3">...</RatgeberHighlightBox>
<RatgeberHighlightBox title="Überschrift 4">...</RatgeberHighlightBox>
<RatgeberHighlightBox title="Überschrift 5">...</RatgeberHighlightBox>
<RatgeberHighlightBox title="Überschrift 6">...</RatgeberHighlightBox>

// Zu kleine Schrift
<p className="text-sm">...</p>

// Verwendungsbasierte Bildnamen
<Image src="/images/ratgeber/hero-pferdemarkt.webp" />

// Manuelles FAQ Schema
<script type="application/ld+json">
  {JSON.stringify(faqSchema)}
</script>

// Layout ohne Props
<Layout>
  <article>...</article>
</Layout>
```

### ✅ Richtig:

```tsx
// Text First mit semantischem HTML
<section>
  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
    Hauptüberschrift
  </h2>
  <p className="text-lg text-gray-700 leading-relaxed">
    Semantischer Content...
  </p>
  <ul className="space-y-2 text-lg text-gray-700">
    <li>• Listenpunkt</li>
  </ul>
</section>

// Max. 2-4 strategische Boxen
<RatgeberHighlightBox
  title="KI-Bewertung nutzen"
  icon={<Award />}
>
  <p className="text-base">Conversion-CTA...</p>
</RatgeberHighlightBox>

// Lesbare Schrift
<p className="text-lg text-gray-700 leading-relaxed">...</p>

// Inhaltsbasierte Bildnamen
<Image src="/images/ratgeber/horses-grazing-meadow.webp" />

// FAQ Component generiert Schema automatisch
<FAQ faqs={faqItems} />

// Layout mit korrekten Props
<Layout
  fullWidth={true}
  background="bg-gradient-to-b from-amber-50 to-white"
>
  <article>...</article>
</Layout>
```

## 📚 Referenzen

- **Design-Guidelines**: `/SEO/SEO-DESIGN.md`
- **Page-Struktur**: `/SEO/STRATEGY/page-struktur-seo.md`
- **Ratgeber Registry**: `/frontend/lib/ratgeber-registry.ts`
- **Template**: `.claude/skills/ratgeber-builder/template.tsx`
- **Existing Examples**:
  - `/frontend/pages/pferde-ratgeber/pferd-kaufen.tsx`
  - `/frontend/pages/pferde-ratgeber/pferd-verkaufen.tsx`
  - `/frontend/pages/pferde-ratgeber/aku-pferd.tsx`

## 🔧 Troubleshooting

### Parser-Script findet Dateien nicht

```bash
# Prüfe Ordnerstruktur
ls -la SEO/SEO-CONTENT/<keyword>/

# Erwartete Struktur (neue SEO-Ordner-Struktur):
# SEO/SEO-CONTENT/<keyword>/
#   ├── content/
#   │   └── FINAL-ARTICLE.md
#   └── seo/
#       ├── seo-metadata.json
#       ├── schema-article.json
#       ├── schema-faq.json
#       └── schema-breadcrumb.json
```

### Page generiert, aber Fehler beim Build

```bash
# Lint-Fehler prüfen
npm run lint

# Type-Fehler prüfen
npm run type-check

# Häufige Ursachen:
# - Fehlende Imports
# - Falsche Component Props
# - Ungültige JSON in seo/*.json
```

### Sitemap zeigt neuen Artikel nicht

```bash
# Registry-Eintrag prüfen
cat frontend/lib/ratgeber-registry.ts | grep <keyword>

# Sitemap neu generieren
cd frontend && npm run sitemap

# Output prüfen
cat frontend/public/sitemap.xml | grep <keyword>
```

### FAQ Schema Duplikat-Fehler in Google Search Console

```bash
# Prüfe ob FAQ Schema manuell im <Head> definiert ist
# ❌ ENTFERNEN! FAQ Component generiert Schema automatisch

# Richtig:
<FAQ faqs={faqItems} withSchema={true} />  // Default: true

# Nur wenn bereits Schema vorhanden (Legacy):
<FAQ faqs={faqItems} withSchema={false} />
```

## 💡 Best Practices

1. **Parser-Script zuerst ausführen** (optional aber empfohlen) - Gibt optimale Struktur-Vorschläge
2. **Template als Basis verwenden** (`.claude/skills/ratgeber-builder/template.tsx`) - Garantiert alle Design-Guidelines
3. **Content Review vor Deployment** - Prüfe Text First Prinzip
4. **Bilder sinnvoll benennen** - Wiederverwendbarkeit & SEO
5. **FAQ Subtitle anpassen** - Themenspezifische Beschreibung
6. **Related Articles relevant wählen** - Aus Registry holen
7. **Lokaler Test vor Push** - Verhindert Production-Fehler
8. **Sitemap nicht vergessen** - Sonst keine Google-Indexierung!

## 🎯 Quick Start

Wenn du jetzt eine Ratgeber-Page erstellen möchtest:

**Variante A: Mit Parser (empfohlen)**
```bash
# 1. Parser ausführen (zeigt Struktur)
node .claude/skills/ratgeber-builder/parse-content.mjs pferdemarkt

# 2. Template kopieren & Outputs einsetzen
cp .claude/skills/ratgeber-builder/template.tsx frontend/pages/pferde-ratgeber/pferdemarkt.tsx

# 3. Anpassen & testen
npm run dev
```

**Variante B: Mit Skill**
```
# In Claude Code:
/ratgeber-builder pferdemarkt
```

---

**Version:** 1.0.0
**Erstellt:** 2025-11-09
**Dokumentation:** SEO/SEO-DESIGN.md
