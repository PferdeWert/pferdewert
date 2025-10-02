import { RatgeberSection, RatgeberRelatedArticle } from '@/types/global'

// Table of Contents Sections
export const wasKostetPferdSections: RatgeberSection[] = [
  { id: 'anschaffung', title: 'Anschaffungskosten' },
  { id: 'unterhalt', title: 'Monatliche Unterhaltungskosten' },
  { id: 'regional', title: 'Regionale Preisunterschiede' },
  { id: 'bewertung', title: 'Was ist mein Pferd wert?' },
  { id: 'kauftipps', title: 'Pferdekauf-Checkliste' },
  { id: 'faq', title: 'Häufige Fragen' },
  { id: 'related', title: 'Weiterführende Artikel' }
]

// Highlight Boxes for Rassen-Preise
export const rassenPreise = [
  {
    title: 'Deutsche Warmblüter',
    price: '8.000€ - 50.000€',
    description: 'Hannoveraner, Holsteiner, Oldenburger – Hochwertige Zucht, vielseitig einsetzbar'
  },
  {
    title: 'Robustpferderassen',
    price: '3.000€ - 15.000€',
    description: 'Haflinger, Islandpferde – Ideal für Freizeitreiter, familienfreundlich'
  },
  {
    title: 'Ponyrassen',
    price: '1.500€ - 10.000€',
    description: 'Deutsches Reitpony, Welsh Pony, Shetlandpony – Für Kinder und Jugendliche'
  }
]

// Info Tiles for Alter-Preisspannen
export const alterPreisTiles = [
  {
    title: 'Fohlen (0-1 Jahr)',
    value: '1.500€ - 8.000€',
    description: 'Günstig, aber 3-4 Jahre bis zur Reitbarkeit'
  },
  {
    title: 'Jungpferde (3-4 Jahre)',
    value: '4.000€ - 15.000€',
    description: 'Angeritten oder in Grundausbildung'
  },
  {
    title: 'Ausgebildet (5-10 Jahre)',
    value: '8.000€ - 50.000€',
    description: 'Sofort reitbar, höchste Preisklasse'
  },
  {
    title: 'Ältere Pferde (11+ Jahre)',
    value: '3.000€ - 15.000€',
    description: 'Erfahren und verlässlich'
  }
]

// Unterhaltungskosten Breakdown
export const unterhaltKostenTiles = [
  {
    title: 'Stallmiete',
    value: '200€ - 600€/Monat',
    description: 'Vollpension inkl. Futter, Einstreu, Weide'
  },
  {
    title: 'Hufschmied',
    value: '40€ - 100€/Monat',
    description: 'Alle 6-8 Wochen Hufpflege oder Beschlag'
  },
  {
    title: 'Tierarzt (Basis)',
    value: '30€ - 80€/Monat',
    description: 'Impfungen, Wurmkuren, Zahnkontrolle'
  },
  {
    title: 'Versicherung',
    value: '10€ - 30€/Monat',
    description: 'Pferdehaftpflicht ist PFLICHT'
  }
]

// Regional-Regions for Bayern Focus
export const regionalBayernRegions = [
  {
    title: 'München',
    description: 'Stallmiete 400€-600€/Monat | Warmblut 12.000€-35.000€ | Höchste Preise, starke Nachfrage'
  },
  {
    title: 'Nürnberg',
    description: 'Stallmiete 320€-480€/Monat | Warmblut 9.000€-25.000€ | Mittelpreissegment, gute Infrastruktur'
  },
  {
    title: 'Augsburg',
    description: 'Stallmiete 300€-450€/Monat | Warmblut 8.500€-22.000€ | Günstiger als München'
  }
]

// FAQ Items
export const wasKostetPferdFaqItems = [
  {
    question: 'Was kostet ein Pferd im Monat?',
    answer: 'Ein Pferd kostet durchschnittlich zwischen 300€ und 800€ pro Monat. Die monatlichen Kosten setzen sich zusammen aus: Stallmiete (150€-500€), Futter (80€-150€), Hufschmied alle 6-8 Wochen (40€-100€ anteilig), Tierarzt und Impfungen (30€-80€ anteilig), Versicherung (20€-60€) und Ausrüstung/Zubehör (30€-100€). In Ballungsräumen wie München oder Hamburg können die Kosten höher ausfallen, während ländliche Regionen günstiger sind. Realistisch sollten Sie für ein Freizeitpferd in Vollpension 500€-700€/Monat einplanen, für Turnierpferde mit Beritt und Training entsprechend mehr.'
  },
  {
    question: 'Wie viel kostet ein Warmblut?',
    answer: 'Ein Warmblut kostet zwischen 3.000€ und 50.000€, abhängig von Alter, Ausbildungsstand und Turniererfolgen. Ein junges, ungerittenes Warmblut liegt bei 3.000€-8.000€. Ein gut ausgebildetes Freizeit-Warmblut kostet 8.000€-15.000€. Turnierpferde mit Erfolgen können 20.000€-50.000€ oder mehr kosten. Deutsche Warmblutrassen wie Hannoveraner oder Holsteiner sind aufgrund ihrer Zuchtqualität oft im höheren Preissegment angesiedelt. Das Bayerische Warmblut liegt preislich bei 10.000€-25.000€ und ist besonders für seine Vielseitigkeit und sein ausgeglichenes Temperament bekannt.'
  },
  {
    question: 'Was kostet ein Pferd für Anfänger?',
    answer: 'Ein geeignetes Anfängerpferd kostet 5.000€ bis 12.000€. Für Reitanfänger sind erfahrene Pferde zwischen 8-14 Jahren ideal – sie sind nervenstark, gut ausgebildet und verzeihen Reiterfehler. Robuste Rassen wie Haflinger (3.000€-10.000€), Islandpferde (3.500€-12.000€) oder gut ausgebildete Freizeitpferde sind empfehlenswert. Wichtiger als der Preis ist der Charakter: Das Pferd sollte gutmütig, umgänglich und im Umgang unkompliziert sein. Vorsicht vor Schnäppchen unter 3.000€ – diese Pferde haben oft gesundheitliche oder Verhaltensprobleme. Investieren Sie lieber in ein solides Lehrpferd und lassen Sie sich von einem erfahrenen Reitlehrer beim Kauf beraten.'
  },
  {
    question: 'Wie viel kostet ein Fohlen?',
    answer: 'Ein Fohlen kostet zwischen 1.500€ und 8.000€, je nach Rasse, Abstammung und Zuchtlinie. Warmblut-Fohlen mit guten Papieren liegen bei 3.000€-8.000€, während Pony-Fohlen günstiger sind (1.500€-4.000€). Wichtig: Ein Fohlen ist die günstigste Anschaffungsoption, aber bringt hohe Folgekosten und Risiken mit sich. Sie müssen 3-4 Jahre bis zur Reitbarkeit warten, in dieser Zeit fallen Aufzucht- und Ausbildungskosten von 5.000€-15.000€ an. Zudem ist das spätere Potenzial unsicher – nicht jedes Fohlen entwickelt sich zum gewünschten Reitpferd. Fohlen sind nur für erfahrene Pferdebesitzer geeignet, die Zeit, Geduld und finanzielle Reserven haben.'
  },
  {
    question: 'Was ist mein Pferd wert?',
    answer: 'Der Wert eines Pferdes hängt von vielen Faktoren ab: Alter, Rasse, Ausbildungsstand, Gesundheitszustand, Turniererfolge und Charakter. Eine professionelle Pferdebewertung berücksichtigt alle diese Aspekte und vergleicht mit aktuellen Marktpreisen. Freizeitpferde liegen meist zwischen 3.000€-15.000€, während Turnierpferde deutlich mehr wert sein können. Für Verkäufer ist eine realistische Einschätzung wichtig, um den optimalen Verkaufspreis zu finden – zu hoch führt zu monatelanger Verkaufsdauer, zu niedrig verschenkt Geld. Für Käufer hilft eine Bewertung, Überzahlung zu vermeiden.'
  },
  {
    question: 'Wie teuer ist eine Ankaufsuntersuchung beim Pferd?',
    answer: 'Eine Ankaufsuntersuchung (AKU) kostet zwischen 200€ und 1.500€, abhängig vom Umfang. Die kleine AKU (200€-400€) umfasst klinische Untersuchung, Herz-Kreislauf-Check und Bewegungsanalyse – ausreichend für Freizeitpferde ohne sportliche Ambitionen. Die große AKU (800€-1.500€) beinhaltet zusätzlich Röntgenaufnahmen (18 Standard-Bilder), Blutuntersuchung und detaillierte Lahmheitsdiagnostik – empfohlen für Turnierpferde oder höhere Kaufpreise ab 15.000€. Eine AKU ist unverzichtbar beim Pferdekauf – sie deckt versteckte gesundheitliche Probleme auf und schützt vor Fehlkäufen. Vergleichen Sie die AKU-Kosten mit dem Kaufpreis: 500€ AKU bei einem 10.000€-Pferd sind eine Investition, die tausende Euro an späteren Tierarztkosten vermeiden kann.'
  },
  {
    question: 'Was kostet ein Dressurpferd?',
    answer: 'Ein Dressurpferd kostet zwischen 8.000€ und 100.000€+, abhängig von Ausbildungsstand und Turniererfolgen. Ein Dressurpferd mit A-/L-Niveau liegt bei 8.000€-18.000€, während M-Niveau-Pferde 15.000€-35.000€ kosten. S-Dressurpferde mit Platzierungen können 40.000€-150.000€ oder mehr kosten – Spitzenpferde erreichen sechsstellige Beträge. Wichtige Preisfaktoren sind: Grundgangarten (Takt, Schwung, Durchlässigkeit), Turnierplatzierungen, Alter (optimal 7-12 Jahre) und Rasse (Warmblüter dominieren). Deutsche Reitpferde sind aufgrund ihrer Zuchtqualität besonders gefragt. Für Hobby-Dressurreiter sind gut ausgebildete Freizeitpferde mit Dressur-Eignung oft ausreichend (8.000€-15.000€).'
  },
  {
    question: 'Wie viel kostet Stallmiete?',
    answer: 'Stallmiete für Vollpension (inkl. Futter, Einstreu, Weide) kostet in Deutschland 200€ bis 600€ pro Monat. In ländlichen Regionen wie Mecklenburg-Vorpommern oder Brandenburg zahlen Sie 180€-320€/Monat, während Großstadt-Nähe teurer ist: München (400€-600€), Hamburg (350€-550€), Köln/Düsseldorf (300€-500€). Unterschied Stadt vs. Land: In Stadtrandlagen sind Ställe bis zu 50% teurer als im Umland (30-50 km entfernt). Offenstallhaltung ist oft günstiger (150€-350€/Monat) als Boxenhaltung, bietet aber weniger Komfort. Aktivställe mit Paddock Trail liegen im mittleren Segment (250€-450€/Monat). Prüfen Sie genau, was in der Stallmiete enthalten ist – manche Ställe berechnen Zusatzkosten für Weidegang, Führanlage oder Heuraufe.'
  },
  {
    question: 'Was kostet ein Pferd in Bayern?',
    answer: 'In Bayern kostet ein Pferd im Durchschnitt 8.000€ bis 20.000€ für Warmblüter. Die Preise variieren je nach Region: Im Raum München liegen die Preise 10-20% höher als im bayerischen Umland. Das Bayerische Warmblut, eine beliebte regionale Zucht, kostet 10.000€-25.000€ und ist bekannt für sein ausgeglichenes Temperament und Vielseitigkeit. Auch die monatlichen Unterhaltungskosten sind in Bayern höher: München (400€-600€/Monat Stallmiete), Nürnberg (320€-480€/Monat), Augsburg (300€-450€/Monat), Regensburg (280€-420€/Monat), Würzburg (270€-400€/Monat). Tipp für Budget-Käufer: Schauen Sie 50-100 km außerhalb von München – in Oberbayern oder Niederbayern sinken die Preise um 20-30%, ohne an Qualität zu verlieren.'
  },
  {
    question: 'Lohnt sich ein eigenes Pferd finanziell?',
    answer: 'Ein eigenes Pferd ist finanziell eine langfristige Verpflichtung: Über 20 Jahre Lebenszeit entstehen Gesamtkosten von 100.000€ bis 300.000€ (Kaufpreis + Unterhalt). Bei monatlichen Kosten von 500€-800€ und durchschnittlich 25 Jahren Lebenserwartung sind das 150.000€-240.000€ nur für den Unterhalt. Alternativen, die günstiger sind: Reitbeteiligung (50€-200€/Monat), Pflegepferd (100€-300€/Monat) oder Reitstunden (25€-60€/Stunde). Ein eigenes Pferd lohnt sich finanziell nicht – aber emotional und für Ihre reiterliche Entwicklung kann es unbezahlbar sein. Entscheidend ist: Können Sie sich die monatlichen Fixkosten langfristig leisten? Haben Sie ein Notfall-Budget von 5.000€+? Wenn ja, und Sie sind bereit für die Verantwortung, ist ein eigenes Pferd eine wunderbare Bereicherung.'
  }
]

// Related Articles
export const wasKostetPferdRelatedArticles: RatgeberRelatedArticle[] = [
  {
    href: '/pferde-ratgeber/aku-pferd',
    image: '/images/shared/blossi-shooting.webp',
    title: 'AKU Pferd: Ankaufsuntersuchung',
    badge: 'Pferde-Ratgeber',
    readTime: '12 min',
    description: 'Alles über Kosten, Ablauf und Befunde der Ankaufsuntersuchung beim Pferdekauf.'
  },
  {
    href: '/pferde-ratgeber/pferd-kaufen',
    image: '/images/ratgeber/pferd-kaufen/hero.webp',
    title: 'Pferd kaufen: Der komplette Ratgeber',
    badge: 'Pferde-Ratgeber',
    readTime: '15 min',
    description: 'Checkliste, Tipps und Kaufberatung für Ihren erfolgreichen Pferdekauf.'
  },
  {
    href: '/pferde-ratgeber/pferd-verkaufen',
    image: '/images/ratgeber/pferd-verkaufen/hero.webp',
    title: 'Pferd verkaufen: Optimaler Preis',
    badge: 'Pferde-Ratgeber',
    readTime: '10 min',
    description: 'So finden Sie den richtigen Verkaufspreis für Ihr Pferd.'
  }
]
