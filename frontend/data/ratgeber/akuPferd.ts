import { RatgeberRelatedArticle } from '@/components/ratgeber/RatgeberRelatedArticles'
import { FAQItem } from '@/types/faq.types'

export interface RatgeberSectionItem {
  id: string
  title: string
}

export interface AkuUmfangItem {
  umfang: string
  title: string
  duration: string
  includes: string[]
  suitable: string
}

export interface AkuTimeTile {
  title: string
  value: string
  description: string
}

export interface AkuRegionItem {
  title: string
  description: string
}

// KANDIBALISIERUNG GELÖST: Hub-Seite fokussiert auf INFORMATIONAL INTENT
// Spoke-Seite "/kosten" ist jetzt exclusive für Kosten-Keywords zuständig
// Keine Kosten-Daten auf Hub-Seite (nur Link zur Spoke-Seite)

export const akuRelatedArticles: RatgeberRelatedArticle[] = [
  {
    href: '/pferde-ratgeber/aku-pferd/kosten',
    image: '/images/ratgeber/aku-pferd/kosten/aku-kosten-tierarzt.webp',
    title: 'AKU Kosten 2025',
    badge: 'Kosten & Preise',
    readTime: '8 Min.',
    description: 'Was kostet eine Ankaufsuntersuchung? Alle Preise und Faktoren im Überblick - von der kleinen bis zur großen AKU.'
  },
  {
    href: '/pferde-ratgeber/was-kostet-ein-pferd',
    image: '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/pferd-kosten-uebersicht.webp',
    title: 'Was kostet ein Pferd?',
    badge: 'Kauf & Verkauf',
    readTime: '14 Min.',
    description: 'Detaillierte Übersicht aller Kosten: Kaufpreis, laufende Kosten und versteckte Ausgaben. So planst du dein Budget richtig.'
  },
  {
    href: '/pferde-ratgeber/pferd-kaufen',
    image: '/images/ratgeber/pferd-kaufen/pferd-kaufen-ratgeber.webp',
    title: 'Pferd kaufen - Der komplette Ratgeber',
    badge: 'Kauf & Verkauf',
    readTime: '18 Min.',
    description: 'Der ultimative Ratgeber für den Pferdekauf. Checklisten, rechtliche Aspekte, Bewertungskriterien und Tipps für die richtige Entscheidung.'
  }
]

// ÜBERARBEITET: Fokus auf INFORMATIONAL CONTENT, nicht Kosten
export const akuSections: RatgeberSectionItem[] = [
  { id: 'definition', title: 'Was ist eine AKU?' },
  { id: 'importance', title: 'Warum eine AKU wichtig ist' },
  { id: 'types', title: 'Kleine vs. Große AKU' },
  { id: 'process', title: 'Ablauf der Untersuchung' },
  { id: 'findings', title: 'Befunde verstehen (aktuelles System seit 2018)' },
  { id: 'when', title: 'Wann braucht man welche Stufe?' },
  { id: 'what-to-watch', title: 'Worauf sollte man achten?' },
  { id: 'legal', title: 'Rechtliche Aspekte' },
  { id: 'vet-selection', title: 'Den richtigen Tierarzt wählen' },
  { id: 'after-aku', title: 'Nach der AKU – Was dann?' },
  { id: 'takeaways', title: 'Fazit & Wichtigste Erkenntnisse' }
]

// AKTUALISIERT: Keine Befundklassen mehr (altes System I-V abgeschafft seit 2018)
// akuUmfange = AKU-Umfänge (Kleine, Große, Spezialisierte AKU)
// NICHT verwechseln mit Befundklassen (die es seit 2018 nicht mehr gibt)
export const akuClasses: AkuUmfangItem[] = [
  {
    umfang: 'klein',
    title: 'Kleine AKU',
    duration: '1-2 Stunden',
    includes: ['Klinische Untersuchung', 'Bewegungsanalyse', 'Flexionsproben', 'Basisröntgen (2-4 Aufnahmen)'],
    suitable: 'Freizeitpferde bis 5.000€'
  },
  {
    umfang: 'gross',
    title: 'Große AKU',
    duration: '2-4 Stunden',
    includes: ['Alle Punkte der Kleinen AKU', 'Erweiterte Röntgenaufnahmen (18 Standard-Aufnahmen seit 2018)', 'Belastungstest', 'Herz-Kreislauf-Untersuchung'],
    suitable: 'Sportpferde ab 10.000€'
  },
  {
    umfang: 'spezialisiert',
    title: 'Spezialisierte AKU',
    duration: 'Mehrere Termine',
    includes: ['Alle Punkte der Großen AKU', 'Ultraschall', 'Endoskopie', 'Spezialröntgen', 'Laboruntersuchungen'],
    suitable: 'Hochwertige Sport- und Zuchtpferde'
  }
]

export const akuTimeTiles: AkuTimeTile[] = [
  {
    title: 'Kleine AKU',
    value: '1-2 Stunden',
    description: 'Basis-Untersuchung mit wenigen Röntgenaufnahmen'
  },
  {
    title: 'Große AKU',
    value: '2-4 Stunden',
    description: 'Erweiterte Untersuchung mit vollständigen Röntgenbildern'
  },
  {
    title: 'Spezialisierte AKU',
    value: '4+ Stunden',
    description: 'Komplette Untersuchung mit Zusatzverfahren, oft über mehrere Termine'
  }
]

export const akuRegions: AkuRegionItem[] = [
  {
    title: 'Bayern',
    description: 'Warmblut-Zentren mit hochspezialisierten Praxen und besonders detaillierten Gutachten – ideal für Sport- und Zuchtpferde.'
  },
  {
    title: 'Niedersachsen',
    description: 'Größte Dichte an AKU-Tierärzten. Generationenlange Erfahrung mit unterschiedlichen Warmblutlinien und deren typischen Befundmustern.'
  },
  {
    title: 'Nordrhein-Westfalen',
    description: 'Fokus auf Freizeit- und Schulpferde. Angebote sind oftmals flexibel und auf städtische Pferdehalter zugeschnitten.'
  }
]

// ÜBERARBEITET: Keine Kosten-Fragen (gehören zur Spoke-Seite)
// Fokus auf: Definition, Ablauf, Befunde, Wichtigkeit
export const akuFaqItems: FAQItem[] = [
  {
    question: 'Was ist eine Ankaufsuntersuchung (AKU) beim Pferd?',
    answer: 'Eine Ankaufsuntersuchung ist eine standardisierte tierärztliche Untersuchung, die vor dem Pferdekauf durchgeführt wird. Sie dient dazu, den aktuellen Gesundheitszustand und die körperliche Eignung des Pferdes für den beabsichtigten Verwendungszweck zu überprüfen. Die AKU gibt dem Käufer Sicherheit und rechtliche Absicherung vor versteckten Mängeln.'
  },
  {
    question: 'Warum ist eine AKU beim Pferdekauf so wichtig?',
    answer: 'Eine AKU schützt Sie vor teuren Überraschungen nach dem Kauf. Sie dokumentiert den Gesundheitszustand zum Kaufzeitpunkt, ermöglicht Rücktritt „ohne Befund", bietet rechtliche Absicherung bei späteren Problemen und hilft Ihnen, die richtige Kaufentscheidung zu treffen. Eine AKU zahlt sich oft schon beim ersten Großschadenfall mehrfach aus.'
  },
  {
    question: 'Wo ist der Unterschied zwischen kleiner und großer AKU?',
    answer: 'Kleine AKU: Reine klinische Untersuchung ohne Röntgen, 1-2 Stunden, für Freizeitpferde unter 5.000€. Große AKU: Klinische Untersuchung + 18 Standard-Röntgenaufnahmen (seit Röntgenleitfaden 2018), 2-4 Stunden, empfohlen für Sportpferde und höhere Kaufpreise. Die große AKU bietet deutlich mehr Sicherheit bei der Beurteilung des Bewegungsapparats.'
  },
  {
    question: 'Wie läuft eine Ankaufsuntersuchung ab?',
    answer: 'Die AKU gliedert sich in: (1) Allgemeine Untersuchung (Herz, Lunge, Zähne, Augen), (2) Bewegungsanalyse (Schritt, Trab, Longieren), (3) Flexionsproben (alle Gelenke), (4) Röntgenaufnahmen (bei großer AKU), (5) Befundung und Protokoll-Erstellung (nach 1-2 Tagen). Der ganze Prozess dauert von Termin bis Protokoll etwa 2-3 Tage.'
  },
  {
    question: 'Wie funktioniert die Befundung seit dem Röntgenleitfaden 2018?',
    answer: 'Seit 2018 gilt ein neues System der Gesellschaft für Pferdemedizin (GPM): (1) "o.b.B." (ohne besonderen Befund) = keine Abweichungen von normaler Röntgenanatomie. (2) Befunde mit Abweichungen werden präzise beschrieben, nicht mehr klassifiziert. (3) Unterscheidung: Befunde, bei denen Lahmheitsrisiko nicht verlässlich einschätzbar ist, versus risikobehaftete Befunde (gekennzeichnet mit "Risiko"). Dieses System ist fairer und aussagekräftiger als das alte Klassensystem I-V.'
  },
  {
    question: 'Wer sollte eine AKU durchführen – der Tierarzt des Verkäufers?',
    answer: 'Nein, unbedingt ein unabhängiger Tierarzt, den Sie selbst auswählen. Der Stallveterinär des Verkäufers hat einen Interessenskonflikt. Ein unabhängiger Tierarzt gibt Ihnen objektive Befunde und rechtliche Sicherheit. Tipp: Wählen Sie einen erfahrenen AKU-Spezialisten mit guter Reputation.'
  }
]
