"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shield, Award, Star, ArrowRight } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    /* ---------- HERO START ---------- */
   <section className="relative overflow-hidden">
  {/* VOLLBREITER ROSA‑HINTERGRUND */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-200 via-rose-50 to-white" />
  
  <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-20">
        {/* Grid-Wrapper NICHT entfernen, sonst stehen Text und Bild untereinander */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text‑Spalte */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Badge */}
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              🏆 Deutschlands #1 Plattform
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Deutschlands führende Plattform für{" "}
              <span className="text-amber-700">Pferdebewertung</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Entwickelt von Reitern für Reiter – präzise, transparent, vertrauenswürdig.
              Erhalten Sie eine professionelle KI‑basierte Bewertung Ihres Pferdes in nur 2 Minuten.
            </p>

            {/* Trust‑Indikatoren */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>In 2 Minuten</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Kein Abo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Geld‑zurück‑Garantie</span>
              </div>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span>4,7/5</span>
              </div>
            </div>

            {/* CTA‑Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-md bg-amber-800 hover:bg-amber-900 text-white transition-colors"
              >
                Jetzt Pferdewert berechnen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/beispiel-analyse"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-md border border-amber-200 text-amber-700 bg-white hover:bg-amber-50 transition-colors"
              >
                Beispielanalyse ansehen
              </Link>
            </div>
          </div>

          {/* Bild‑Spalte */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* OPTIONAL: wenn der gelb/orange Blob stört, entweder löschen
                  oder auf Rosa umstellen (z.B. from-rose-300/30 to-rose-400/30) */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-3xl" />
              <Image
                src="/images/blossi-shooting.webp"
                alt="Pferd Blossom – professionelle Bewertung"
                width={600}
                height={600}
                className="relative rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    /* ---------- HERO END ---------- */
  );
}
