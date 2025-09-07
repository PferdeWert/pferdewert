// Test API für Entwicklung - nur in development verfügbar
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' });
  }

  const testBewertung = `# PferdeWert-Analyse - Test

## Grunddaten
- **Rasse**: Deutsches Reitpferd
- **Alter**: 8 Jahre
- **Geschlecht**: Wallach
- **Stockmaß**: 168cm
- **Farbe**: Dunkelbraun

## Bewertung

### Exterieur (8.5/10)
Das Pferd zeigt ein harmonisches Erscheinungsbild mit korrekten Proportionen. Besonders positiv fallen die starke Oberlinie und die gute Bemuskelung auf.

### Gangarten (8/10)
- **Schritt**: Raumgreifend und taktklar
- **Trab**: Schwungvoll mit guter Versammlung
- **Galopp**: Ausbalanciert und bergauf

### Gesundheit (9/10)
Keine erkennbaren Mängel, gute Allgemeinverfassung.

## Geschätzter Marktwert
**€15.000 - €18.000**

*Diese Analyse wurde zu Testzwecken erstellt.*`;

  res.status(200).json({
    bewertung: testBewertung,
    tier: req.query.tier || 'pro'
  });
}