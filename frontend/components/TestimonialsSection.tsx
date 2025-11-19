// components/TestimonialsSection.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Instagram } from "lucide-react";

export interface RealTestimonial {
  name: string;
  location: string;
  role: string;
  photo: string;
  instagramHandle?: string;
  quote: string;
  verifiedDate: string;
  rating: number;
}

export const TESTIMONIALS_DATA: RealTestimonial[] = [
  {
    name: "Miriam F.",
    location: "Deutschland",
    role: "Ambitionierte Freizeitreiterin (Dressur)",
    photo: "/images/testimonials/miriam-customer-64.webp",
    instagramHandle: "herzenspferd_felino",
    quote: "Nach einem Jahr gemeinsamer Zeit war ich neugierig, wie mein Pferd aktuell bewertet wird. Die Bewertung über PferdeWert war für mich eine tolle Möglichkeit, eine realistische Einschätzung zu bekommen – unkompliziert, nachvollziehbar und professionell. Wer wissen möchte, was das eigene Pferd wirklich wert ist, findet bei PferdeWert eine durchdachte und fachlich fundierte Einschätzung. Besonders gut: Es wird nicht nur pauschal bewertet, sondern auch individuell auf Abstammung und Gesundheitsstatus eingegangen.",
    verifiedDate: "2024-01-15",
    rating: 5
  },
  {
    name: "Eva T.",
    location: "Deutschland",
    role: "Besitzerin von Fürstiano",
    photo: "/images/testimonials/eva-customer-64.webp",
    instagramHandle: "die_rappenschmiede",
    quote: "Nach einer Verletzung von Fürstiano war ich unsicher über seinen aktuellen Marktwert. Die PferdeWert-Analyse war super einfach auszufüllen und das Ergebnis kam sofort. Besonders hilfreich fand ich die detaillierte Aufschlüsselung der Bewertungsfaktoren - das hat mir wirklich geholfen, die Situation realistisch einzuschätzen. Auch wenn für mich mein Pferd unbezahlbar bleibt, war es interessant zu wissen, wo er marktmäßig steht.",
    verifiedDate: "2024-12-20",
    rating: 5
  },
  {
    name: "Denise B.",
    location: "Deutschland",
    role: "von energy_emotion",
    photo: "/images/testimonials/denise-customer-64.webp",
    instagramHandle: "energy_emotion",
    quote: "Auch wenn ein Verkauf meiner beiden Stuten nicht in Frage kommt, war ich neugierig, wo ihr aktueller Marktwert liegt. Die Bewertung bei PferdeWert war überraschend einfach – ein paar Fragen zur Abstammung, zu eventuellen Krankheitsbildern, Ausbildung und Turniererfolgen, das war's. Keine 10 Minuten später hatte ich eine detaillierte Analyse zu beiden Pferden. Perfekt für alle, die vor einem Pferdekauf oder Pferdeverkauf stehen oder einfach so wissen möchten, was ihre Pferde wert sind.",
    verifiedDate: "2025-01-12",
    rating: 5
  }
];

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TestimonialsSection({
  title = "Das sagen unsere Kunden",
  subtitle = "Erfahrungen von Pferdebesitzern und Reitern",
  ctaText = "Jetzt Pferdewert berechnen",
  ctaHref = "/pferde-preis-berechnen",
  onCtaClick
}: TestimonialsSectionProps): React.ReactElement {
  return (
    <section className="section bg-brand-light/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Optimized grid layout for 3 testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div key={index} className="flex">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative flex flex-col w-full h-auto">
                {/* Customer info with consistent height */}
                <div className="flex items-start mb-6 min-h-[80px]">
                  <div className="relative w-16 mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.photo}
                      alt={`${testimonial.name} Profilbild`}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full border-2 border-brand-gold/30 shadow-sm object-cover"
                    />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 leading-snug">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                  ))}
                </div>

                {/* Quote - grows to fill available space */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  {testimonial.quote}
                </blockquote>

                {/* Instagram link - always at bottom with consistent height */}
                <div className="mt-auto min-h-[48px] flex items-center">
                  {testimonial.instagramHandle && (
                    <a
                      href={`https://instagram.com/${testimonial.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                      aria-label={`${testimonial.name} auf Instagram folgen`}
                    >
                      <Instagram className="w-4 h-4" />
                      @{testimonial.instagramHandle}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center mt-16">
          <div className="mb-4">
            <p className="text-lg text-gray-700 font-medium mb-6">
              Professionelle Pferdebewertung für Pferdebesitzer und Pferdekäufer
            </p>
          </div>

          <Link
            href={ctaHref}
            className="btn-primary text-lg px-8 py-4 inline-block"
            onClick={onCtaClick}
          >
            {ctaText}
          </Link>

          <div className="mt-4">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              30 Tage Geld-zurück-Garantie
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}