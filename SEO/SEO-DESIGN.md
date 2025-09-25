Aktualisierter Style Guide für die Erstellung einer Ratgeberseite auf pferdewert.de
Ziel: Erstelle aus dem bereitgestellten Text (Content) eine visuell ansprechende, gut lesbare und auf die Conversion zum KI-Service ausgerichtete Ratgeberseite.

1. Grundstruktur des Artikels:

Titel (H 
1
​
 ): Der Haupttitel des Artikels.

Metadaten: Direkt unter dem Titel, in kleinerer Schrift: Name des Autors, Veröffentlichungsdatum und geschätzte Lesezeit.

Einleitung: Ein kurzer, einleitender Absatz.

Hauptinhalt: Der restliche Text, strukturiert nach den folgenden Regeln.

2. Textformatierung und Lesbarkeit:

Absätze: Halte Absätze kurz, idealerweise nur 3-4 Sätze lang, um Textwände zu vermeiden.[8, 11]

Überschriften: Gliedere den Text großzügig mit Zwischenüberschriften (H 
2
​
 ,H 
3
​
  etc.), um eine klare, scannbare Struktur zu schaffen.[8, 11]

Listen: Wandle Aufzählungen oder schrittweise Anleitungen immer in nummerierte Listen oder Bullet Points um.[8]

Hervorhebungen: Setze wichtige Kernaussagen oder Zitate visuell vom Rest des Textes ab, indem du sie als Blockquote formatierst.

3. Typografie (Schriftarten):

Überschriften (H 
1
​
 ,H 
2
​
 ,H 
3
​
 ,H 
4
​
 ): Verwende Playfair Display.

Fließtext, Listen, Links, Buttons: Verwende Lato.

Blockquotes: Verwende Playfair Display (kursiv).

4. Farbpalette (HEX-Codes):

Hintergrund: Helles Beige (#f8f8f6).

Haupttext (Fließtext, Überschriften): Dunkelbraun (#4e463b).

Links und sekundäre Akzente (z.B. H 
3
​
 -Überschriften, Blockquote-Ränder): Waldgrün (#406243).

Haupt-Call-to-Action-Button (am Ende des Artikels): Hintergrund Braun (#92400e), Text Weiß (#FFFFFF).

Grafische Highlights (nicht für Text): Amber/Gold (#f6c36a).

5. Visuelle Elemente (Bilder & Videos):

Bildsprache: Verwende ausschließlich hochwertige, authentische und emotionale Bilder von Pferden und Menschen. Vermeide gestellte Stockfotos.[10]

Platzierung: Füge Bilder passend zum Kontext ein, um lange Textblöcke aufzulockern.[11]

Videos: Wenn Videos im Content erwähnt werden, bette sie direkt in die Seite ein. Wichtig: Videos dürfen niemals automatisch abgespielt werden.[8]

6. Primärer Call-to-Action (CTA):

Platzierung: Am Ende jedes Artikels.

Struktur: Der CTA besteht aus zwei Teilen:

Kontextbezogene Überschrift/Frage: Eine Frage, die direkt an den Artikelinhalt anknüpft.

Beispiel: "Willst du wissen, wie ein bestimmter AKU-Befund sich auf den Wert deines Pferdes auswirkt?"

Einheitlicher Button: Ein Button mit dem festen Text:

Jetzt Pferdewert berechnen

## 7. Verfügbare Komponenten

### ArticleMetadata
**Verwendung**: Anzeige von Artikel-Metadaten direkt unter dem Haupttitel
**Eigenschaften**:
- Autor-Information mit User-Icon
- Veröffentlichungsdatum (deutsches Datumsformat)
- Geschätzte Lesezeit mit Clock-Icon
- Responsive Design mit flexiblem Layout

```tsx
<ArticleMetadata
  author="Dr. Sarah Müller"
  publishedDate="2024-01-15"
  readTime="8 Min. Lesezeit"
/>
```

### Blockquote
**Verwendung**: Hervorhebung wichtiger Zitate oder Kernaussagen
**Design**:
- Playfair Display (kursiv) für den Text
- Waldgrüne linke Randbegrenzung (#406243)
- Quote-Icon als visueller Akzent
- Optionale Autor-Attribution

```tsx
<Blockquote author="Tierarzt Prof. Schmid">
  "Ein gründliche AKU-Untersuchung ist das Fundament einer jeden seriösen Pferdebewertung."
</Blockquote>
```

### RelatedArticles
**Verwendung**: Anzeige verwandter Artikel am Ende jeder Ratgeberseite
**Features**:
- Grid-Layout (1-3 Spalten je nach Bildschirmgröße)
- Hover-Effekte mit sanften Übergängen
- Badge-System für Kategorisierung
- Integrierte Lesezeit-Anzeige
- Responsive Bilddarstellung

```tsx
<RelatedArticles
  sectionTitle="Weitere hilfreiche Ratgeber"
  articles={relatedArticlesData}
/>
```

### Bereits vorhandene Komponenten
- **FAQ**: Erweiterbarer FAQ-Bereich mit Schema.org Integration
- **ContentSection**: Strukturierte Inhaltsblöcke mit optionalen Icons
- **CTAButton**: Verschiedene Button-Stile (primary, secondary, expert)
- **InfoBox**: Hervorhebungsboxen (tip, warning, expert, cost)