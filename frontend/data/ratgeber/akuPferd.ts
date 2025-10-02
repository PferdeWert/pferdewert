import { RatgeberRelatedArticle } from '@/components/ratgeber/RatgeberRelatedArticles'
import { FAQItem } from '@/types/faq.types'

export interface RatgeberSectionItem {
  id: string
  title: string
}

export interface AkuClassItem {
  class: string
  title: string
  cost: string
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

export const akuRelatedArticles: RatgeberRelatedArticle[] = [
  {
    href: '/pferde-ratgeber/aku-pferd/ablauf',
    image: '/images/ratgeber/aku-pferd/ablauf/aku-ablauf-untersuchung.webp',
    title: 'AKU Ablauf verstehen',
    badge: 'AKU Guide',
    readTime: '10 Min.',
    description: 'Von Vorbereitung bis Befund – so läuft die Ankaufsuntersuchung Schritt für Schritt ab.'
  },
  {
    href: '/pferde-ratgeber/aku-pferd/klassen',
    image: '/images/ratgeber/aku-pferd/klassen/aku-klassen-uebersicht.webp',
    title: 'AKU Klassen erklärt',
    badge: 'AKU Guide',
    readTime: '8 Min.',
    description: 'Welche Befunde bedeuten was? Klassen 1–5 mit Risiko- und Kaufempfehlungen.'
  },
  {
    href: '/pferde-ratgeber/aku-pferd/kosten',
    image: '/images/ratgeber/aku-pferd/kosten/aku-kosten-tierarzt.webp',
    title: 'AKU Kosten 2025',
    badge: 'Kosten & Preise',
    readTime: '7 Min.',
    description: 'Transparente Kostenübersicht, Zusatzkosten und Spartipps für Käufer.'
  }
]

export const akuSections: RatgeberSectionItem[] = [
  { id: 'basics', title: 'AKU Grundlagen' },
  { id: 'classes', title: 'AKU-Klassen' },
  { id: 'costs', title: 'AKU Kosten' },
  { id: 'process', title: 'Ablauf & Dauer' },
  { id: 'findings', title: 'Befunde verstehen' },
  { id: 'tierarzt', title: 'AKU-Tierarzt finden' },
  { id: 'valuation', title: 'Marktwert & Daten' }
]

export const akuClasses: AkuClassItem[] = [
  {
    class: 'I',
    title: 'Kleine AKU',
    cost: '150-300€',
    duration: '1-2 Stunden',
    includes: ['Klinische Untersuchung', 'Bewegungsanalyse', 'Flexionsproben', 'Basisröntgen (2-4 Aufnahmen)'],
    suitable: 'Freizeitpferde bis 5.000€'
  },
  {
    class: 'II',
    title: 'Große AKU',
    cost: '400-800€',
    duration: '2-4 Stunden',
    includes: ['Alle Punkte der Klasse I', 'Erweiterte Röntgenaufnahmen (8-10)', 'Belastungstest', 'Herz-Kreislauf-Untersuchung'],
    suitable: 'Sportpferde bis 25.000€'
  },
  {
    class: 'III-V',
    title: 'Spezialisierte AKU',
    cost: '800-2000€+',
    duration: 'Mehrere Termine',
    includes: ['Alle Punkte der Klasse II', 'Ultraschall', 'Endoskopie', 'Spezialröntgen', 'Laboruntersuchungen'],
    suitable: 'Hochwertige Sport- und Zuchtpferde'
  }
]

export const akuTimeTiles: AkuTimeTile[] = [
  {
    title: 'Klasse I (Kleine AKU)',
    value: '1-2 Stunden',
    description: 'Basis-Untersuchung mit wenigen Röntgenaufnahmen'
  },
  {
    title: 'Klasse II (Große AKU)',
    value: '2-4 Stunden',
    description: 'Erweiterte Untersuchung mit mehr Röntgenbildern'
  },
  {
    title: 'Klasse III-V',
    value: '4+ Stunden',
    description: 'Komplette Untersuchung, oft über mehrere Termine'
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

export const akuFaqItems: FAQItem[] = [
  {
    question: 'Was kostet eine AKU beim Pferd?',
    answer: 'Die Kosten für eine Ankaufsuntersuchung variieren je nach Umfang: AKU Klasse I (kleine AKU): 150-300€, AKU Klasse II (große AKU): 400-800€, AKU Klasse III-V: 800-2000€. Die Preise können regional unterschiedlich sein.'
  },
  {
    question: 'Wie lange dauert eine AKU?',
    answer: 'Eine kleine AKU (Klasse I) dauert etwa 1-2 Stunden, eine große AKU (Klasse II) 2-4 Stunden. Bei umfangreicheren Untersuchungen (Klasse III-V) können mehrere Termine erforderlich sein.'
  },
  {
    question: 'Welche AKU-Klasse ist die richtige?',
    answer: 'AKU Klasse I für Freizeitpferde bis 5.000€, Klasse II für Sportpferde bis 25.000€, Klasse III-V für hochwertige Sport- und Zuchtpferde. Die Wahl hängt vom Kaufpreis und Verwendungszweck ab.'
  },
  {
    question: 'Was wird bei der AKU untersucht?',
    answer: 'Klinische Untersuchung, Bewegungsanalyse, Flexionsproben, Röntgenaufnahmen (je nach Klasse), Ultraschall (bei höheren Klassen), Endoskopie der Atemwege (optional), Blutuntersuchung (optional).'
  },
  {
    question: 'Ist eine AKU beim Pferdekauf Pflicht?',
    answer: 'Eine AKU ist rechtlich nicht verpflichtend, aber dringend empfohlen. Ohne AKU trägt der Käufer das volle Risiko für alle Gesundheitsprobleme und hat keine rechtliche Absicherung.'
  },
  {
    question: 'Wie lange ist eine AKU gültig?',
    answer: 'Eine AKU ist in der Regel 2-4 Wochen gültig. Bei längeren Zeiträumen sollte eine neue Untersuchung durchgeführt werden, da sich der Gesundheitszustand des Pferdes ändern kann.'
  },
  {
    question: 'Was passiert bei negativen AKU-Befunden?',
    answer: 'AKU-Befunde sind nicht automatisch ein Grund für Kaufabbruch, sondern bilden die Grundlage für objektive Preisverhandlungen. Je nach Schweregrad können Preisreduktionen oder spezielle Verwendungsvereinbarungen getroffen werden.'
  },
  {
    question: 'Welche AKU bei welchem Kaufpreis?',
    answer: 'Bis 5.000€: Kleine AKU (Klasse I-II). Von 5.000-15.000€: Große AKU mit Röntgen (Klasse II). Über 15.000€: Umfassende AKU mit Spezialuntersuchungen (Klasse III-V). Die Investition sollte 2-5% des Kaufpreises betragen.'
  },
  {
    question: 'Wie beeinflusst eine AKU den Versicherungsschutz?',
    answer: 'Viele Pferdeversicherungen verlangen eine aktuelle AKU als Nachweis des Gesundheitszustands. Ohne AKU können Versicherungsanträge abgelehnt oder Prämienzuschläge verlangt werden. Eine saubere AKU sichert bessere Konditionen.'
  },
  {
    question: 'Sind AKU-Befunde zwischen Tierärzten übertragbar?',
    answer: 'AKU-Protokolle sind zwischen Tierärzten übertragbar, aber Interpretationen können variieren. Bei unklaren Befunden ist eine Zweitmeinung sinnvoll. Röntgenbilder sollten immer im digitalen Format übergeben werden für bessere Vergleichbarkeit.'
  }
]
