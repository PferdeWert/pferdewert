# SEO Metadata Struktur (DE + AT Lokalisierung)

## Übersicht

Alle `seo-metadata.json` Dateien im SEO-Pipeline müssen **separate Metadata für Deutschland (.de) und Österreich (.de/at)** enthalten.

## Dateistruktur

```json
{
  "phase": "5A",
  "primary_keyword": "keyword",
  "timestamp": "2025-01-24T12:00:00Z",
  "seo_analysis": {
    "search_volume": 12345,
    "competition_level": "MEDIUM",
    "keyword_difficulty": 45,
    "cpc": 1.20,
    "search_intent": "informational"
  },
  "de": {
    "metadata": {
      "title": "SEO-optimierter Titel (50-60 Zeichen)",
      "title_length": 58,
      "title_status": "OPTIMAL",
      "description": "Meta-Description für Deutschland (150-160 Zeichen)",
      "description_length": 155,
      "description_status": "OPTIMAL",
      "keywords": "hauptkeyword, nebenkeyword, longtail",
      "canonical_url": "https://pferdewert.de/pferde-ratgeber/slug",
      "locale": "de_DE",
      "slug": "slug"
    },
    "open_graph": {
      "og_title": "OG Titel für DE",
      "og_description": "OG Description für DE",
      "og_image": "https://pferdewert.de/images/og/slug.jpg",
      "og_image_alt": "Alt-Text für OG Image",
      "og_image_width": 1200,
      "og_image_height": 630,
      "og_type": "article",
      "og_url": "https://pferdewert.de/pferde-ratgeber/slug",
      "og_locale": "de_DE"
    },
    "twitter_card": {
      "twitter_card": "summary_large_image",
      "twitter_title": "Twitter Titel für DE",
      "twitter_description": "Twitter Description für DE",
      "twitter_image": "https://pferdewert.de/images/og/slug.jpg",
      "twitter_creator": "@pferdewertde"
    }
  },
  "at": {
    "metadata": {
      "title": "SEO-optimierter Titel mit Österreich-Bezug (50-60 Zeichen)",
      "title_length": 58,
      "title_status": "OPTIMAL",
      "description": "Meta-Description für Österreich mit regionalem Bezug (150-160 Zeichen)",
      "description_length": 155,
      "description_status": "OPTIMAL",
      "keywords": "hauptkeyword, nebenkeyword österreich, longtail",
      "canonical_url": "https://pferdewert.de/at/pferde-ratgeber/slug",
      "locale": "de_AT",
      "slug": "slug"
    },
    "open_graph": {
      "og_title": "OG Titel für AT",
      "og_description": "OG Description für AT",
      "og_image": "https://pferdewert.de/images/og/slug.jpg",
      "og_image_alt": "Alt-Text für OG Image",
      "og_image_width": 1200,
      "og_image_height": 630,
      "og_type": "article",
      "og_url": "https://pferdewert.de/at/pferde-ratgeber/slug",
      "og_locale": "de_AT"
    },
    "twitter_card": {
      "twitter_card": "summary_large_image",
      "twitter_title": "Twitter Titel für AT",
      "twitter_description": "Twitter Description für AT",
      "twitter_image": "https://pferdewert.de/images/og/slug.jpg",
      "twitter_creator": "@pferdewertde"
    }
  },
  "hreflang": {
    "de-de": "https://pferdewert.de/pferde-ratgeber/slug",
    "de-at": "https://pferdewert.de/at/pferde-ratgeber/slug",
    "x-default": "https://pferdewert.de/pferde-ratgeber/slug"
  },
  "image_specifications": {
    "featured_image": {
      "url": "https://pferdewert.de/images/slug.webp",
      "alt": "Alt-Text für Featured Image",
      "width": 1200,
      "height": 630,
      "format": "webp",
      "file_size_kb": 150,
      "recommendation": "Custom Image empfohlen: [Beschreibung]"
    },
    "fallback_image": "https://pferdewert.de/images/og-default.jpg"
  }
}
```

## Lokalisierungs-Regeln

### Deutschland (.de)
- Standard-Metadata ohne geografische Einschränkung
- Canonical URL: `https://pferdewert.de/pferde-ratgeber/{slug}`
- Locale: `de_DE`
- Zielgruppe: Deutsche Pferdebesitzer und -käufer

### Österreich (.de/at)
- **Title**: Bei geografisch relevantem Content → "... in Österreich" anhängen
  - Beispiel: "Pferd kaufen Tipps" → "Pferd kaufen Tipps in Österreich"
  - Nur wenn sinnvoll (lokale Märkte, Züchter, Rechtliches)
- **Description**: Österreich-Bezug einbauen, regionale Begriffe
  - Beispiel: "Finde Österreichs beste Züchter..."
  - Regionale Anpassungen: "Pferdemarkt" → "Pferdemarkt Österreich"
- **Canonical URL**: `https://pferdewert.de/at/pferde-ratgeber/{slug}`
- **Locale**: `de_AT`
- **OG/Twitter**: Ebenfalls angepasst mit AT-Fokus

### hreflang Tags
**KRITISCH**: Beide Versionen MÜSSEN aufeinander verweisen!

```html
<link rel="alternate" hrefLang="de-de" href="https://pferdewert.de/pferde-ratgeber/slug" />
<link rel="alternate" hrefLang="de-at" href="https://pferdewert.de/at/pferde-ratgeber/slug" />
<link rel="alternate" hrefLang="x-default" href="https://pferdewert.de/pferde-ratgeber/slug" />
```

## Nutzung in Next.js

```tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import seoMetadata from '@/path/to/seo-metadata.json';

export default function RatgeberPage() {
  const { locale } = useRouter();
  const isAT = locale === 'at';
  const metadata = isAT ? seoMetadata.at : seoMetadata.de;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metadata.metadata.title}</title>
        <meta name="description" content={metadata.metadata.description} />
        <meta name="keywords" content={metadata.metadata.keywords} />
        <link rel="canonical" href={metadata.metadata.canonical_url} />

        {/* hreflang Tags */}
        <link rel="alternate" hrefLang="de-de" href={seoMetadata.hreflang['de-de']} />
        <link rel="alternate" hrefLang="de-at" href={seoMetadata.hreflang['de-at']} />
        <link rel="alternate" hrefLang="x-default" href={seoMetadata.hreflang['x-default']} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.open_graph.og_title} />
        <meta property="og:description" content={metadata.open_graph.og_description} />
        <meta property="og:type" content={metadata.open_graph.og_type} />
        <meta property="og:url" content={metadata.open_graph.og_url} />
        <meta property="og:image" content={metadata.open_graph.og_image} />
        <meta property="og:image:alt" content={metadata.open_graph.og_image_alt} />
        <meta property="og:image:width" content={metadata.open_graph.og_image_width} />
        <meta property="og:image:height" content={metadata.open_graph.og_image_height} />
        <meta property="og:locale" content={metadata.open_graph.og_locale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter_card.twitter_card} />
        <meta name="twitter:title" content={metadata.twitter_card.twitter_title} />
        <meta name="twitter:description" content={metadata.twitter_card.twitter_description} />
        <meta name="twitter:image" content={metadata.twitter_card.twitter_image} />
        <meta name="twitter:creator" content={metadata.twitter_card.twitter_creator} />
      </Head>

      {/* Page Content */}
    </>
  );
}
```

## Beispiel: Geografisch relevanter Content

**Keyword**: "Pferdemarkt"

### DE Version
```json
{
  "de": {
    "metadata": {
      "title": "Pferdemarkt 2025: Online Plattformen & Traditionelle Märkte",
      "description": "Entdecke die besten Pferdemärkte in Deutschland: Havelberg, Bietigheim & Online-Plattformen mit 19.000+ Inseraten. Jetzt Traumpferd finden!"
    }
  }
}
```

### AT Version
```json
{
  "at": {
    "metadata": {
      "title": "Pferdemarkt Österreich 2025: Beste Plattformen & Märkte",
      "description": "Österreichs führende Pferdemärkte: Online-Plattformen mit 2.500+ Inseraten, regionale Märkte & Züchter. Finde dein Traumpferd in Österreich!"
    }
  }
}
```

## Beispiel: Nicht geografisch relevanter Content

**Keyword**: "Pferdefütterung"

### DE Version
```json
{
  "de": {
    "metadata": {
      "title": "Pferdefütterung: Der komplette Guide für gesunde Pferde",
      "description": "Alles über richtige Pferdefütterung: Heu, Kraftfutter, Mineralstoffe. Fütterungsplan, Portionen & häufige Fehler. Jetzt informieren!"
    }
  }
}
```

### AT Version
```json
{
  "at": {
    "metadata": {
      "title": "Pferdefütterung: Der komplette Guide für gesunde Pferde",
      "description": "Alles über richtige Pferdefütterung: Heu, Kraftfutter, Mineralstoffe. Fütterungsplan für österreichische Pferde. Jetzt informieren!"
    }
  }
}
```

Minimaler Unterschied in der Description ("österreichische Pferde") - kein "in Österreich" im Title, da das Thema universell ist.

## Workflow

### /seo Command (Phase 5)
Erstellt automatisch beide Varianten in `seo-metadata.json`

### /page Command
Liest beide Varianten und integriert sie mit `useRouter().locale` Check

## Checkliste

- [ ] Beide `de` und `at` Objekte vorhanden
- [ ] AT Title hat relevanten Österreich-Bezug (wenn geografisch sinnvoll)
- [ ] AT Description unterscheidet sich von DE
- [ ] Canonical URLs korrekt: DE ohne `/at/`, AT mit `/at/`
- [ ] Locale korrekt: `de_DE` vs `de_AT`
- [ ] hreflang Tags enthalten alle 3 Varianten (de-de, de-at, x-default)
- [ ] Open Graph Locale angepasst
- [ ] Title & Description Länge optimal (50-60 / 150-160 Zeichen)
