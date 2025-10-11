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
  { id: 'versicherung', title: 'Versicherung & Kosten' },
  { id: 'sinnvoll', title: 'Wann sinnvoll?' },
  { id: 'rechtsaspekte', title: 'Rechtsaspekte' },
  { id: 'tierarzt', title: 'AKU-Tierarzt finden' },
  { id: 'fazit', title: 'Fazit & Takeaways' },
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
    question: 'Was kostet eine Ankaufsuntersuchung beim Pferd?',
    answer: 'Kleine AKU ohne Röntgen: 150-300€ (Durchschnitt 220€). Große AKU mit Röntgenbildern: 800-1.500€ (Durchschnitt 1.100€). Kosten variieren nach Region, Tierarzt-Qualifikation und Anzahl Röntgenbilder (Standard 10-18 Aufnahmen à 50-80€).'
  },
  {
    question: 'Wie lange dauert eine AKU beim Pferd?',
    answer: 'Kleine AKU (klinische Untersuchung): 1-2 Stunden. Große AKU inkl. Röntgen: 2-3 Stunden vor Ort. Befundung und Protokoll-Erstellung: 24-48 Stunden nach Untersuchung. Gesamt-Timeline vom Termin bis Protokoll-Übergabe: 2-3 Tage.'
  },
  {
    question: 'Wer zahlt die AKU – Käufer oder Verkäufer?',
    answer: 'Standard: Käufer zahlt AKU-Kosten, da er die Untersuchung beauftragt. Verhandlungssache: Kostenaufteilung möglich, oft 50/50 bei hohen Kaufpreisen. Wichtig: Vor Untersuchung im Kaufvertrag klären. Bei negativer AKU bleiben Kosten beim Käufer.'
  },
  {
    question: 'Was ist der Unterschied zwischen kleiner und großer AKU?',
    answer: 'Kleine AKU: Nur klinische Untersuchung (Gangbild, Herz, Lunge, Augen, Allgemeinzustand), keine Röntgenbilder, 150-300€, geeignet für Freizeitpferde <5.000€. Große AKU: Zusätzlich Röntgenuntersuchung (10-18 Aufnahmen), 800-1.500€, empfohlen für Sport-/Turnierpferde und Kaufpreis >10.000€.'
  },
  {
    question: 'Wie oft sollte man eine AKU wiederholen?',
    answer: 'AKU ist eine einmalige Momentaufnahme vor dem Kauf. Wiederholung nicht üblich. Ausnahme: Bei Probereiten >3 Monate zwischen AKU und Kaufabschluss – dann Update-AKU empfohlen. Nach Kauf: Regelmäßige tierärztliche Routineuntersuchungen (1-2x jährlich), aber keine vollständige AKU mehr nötig.'
  },
  {
    question: 'Kann ich die AKU-Kosten steuerlich absetzen?',
    answer: 'Gewerbliche Pferdehaltung (Zucht, Reitbetrieb, Pensionsstall): Ja, als Betriebsausgabe absetzbar. Private Pferdehaltung: Nein, keine steuerliche Absetzbarkeit. Ausnahme: Nachweis gewerblicher Tätigkeit mit Gewinnerzielungsabsicht erforderlich. Bei Unsicherheit: Steuerberater konsultieren.'
  }
]
