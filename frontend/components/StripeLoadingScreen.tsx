import React from "react";
import Image from "next/image";

interface StripeLoadingScreenProps {
  loadingText?: string;
  successMessage?: string;
  estimatedTime?: string;
}

export default function StripeLoadingScreen({
  loadingText = "Ihre Pferdebewertung wird erstellt",
  successMessage = "Zahlung erfolgreich!",
  estimatedTime = "Geschätzte Wartezeit: wenige Sekunden",
}: StripeLoadingScreenProps) {
  return (
    <main
      className="bg-brand-light min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-12"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* ✅ STATIC LOGO - No animations */}
      <div className="flex justify-center">
        <div className="w-24 h-24 md:w-32 md:h-32 relative">
          <Image 
            src="/logo.png" 
            alt="PferdeWert Logo" 
            width={128} 
            height={128} 
            className="rounded-full"
            priority
          />
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand">
          🎉 {successMessage}
        </h1>
        <p className="text-xl md:text-2xl text-brand">
          Vielen Dank für Ihr Vertrauen in{" "}
          <span className="font-bold text-brand-brown">
            PferdeWert.de
          </span>
        </p>
        
        {/* ✅ SIMPLIFIED PROGRESS BAR - No animations, static design */}
        <div className="w-full max-w-md mx-auto pt-4" aria-label="Fortschrittsanzeige">
          <div className="w-full h-4 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div className="h-full w-3/4 bg-brand-brown rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-xl">
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-brand">
          {loadingText}
        </h2>
        <div className="text-base text-brand/70">
          {estimatedTime}
        </div>
      </div>
    </main>
  );
}