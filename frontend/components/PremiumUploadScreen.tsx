import { useState } from 'react';
import { info } from '@/lib/log';

interface PremiumUploadScreenProps {
  onUploadClick: () => void;
}

export default function PremiumUploadScreen({ onUploadClick }: PremiumUploadScreenProps) {
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  
  const handleUploadClick = () => {
    info('[PREMIUM] Upload button clicked - opening Dropbox link');
    setIsUploadClicked(true);
    onUploadClick();
    // Open Dropbox link
    window.open('https://www.dropbox.com/request/XLF5Z1TW1S9qHDYk2Phc', '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Vielen Dank für Ihre Premium-Bestellung!
        </h1>
        <p className="text-gray-600">
          Ihre Zahlung wurde erfolgreich verarbeitet.
        </p>
      </div>

      {/* Expert Analysis Information */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div>
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Ihre persönliche Expertenanalyse
          </h2>
          <p className="text-blue-800 text-sm leading-relaxed">
            Für Ihre detaillierte Premium-Analyse benötigen wir möglichst hochwertige Fotos Ihres Pferdes. 
          </p>
        </div>
      </div>

      {/* Upload Instructions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          So geht&apos;s weiter:
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm">
                <strong>Fotos hochladen:</strong> Laden Sie 1-5 möglichst hochwertige Fotos Ihres Pferdes über den Link hoch.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm">
                <strong>PferdeWert-Analyse:</strong> Wir erstellen mithilfe der PferdeWert-KI eine detaillierte Exterieur-Analyse.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm">
                <strong>Ergebnis per E-Mail:</strong> Sie erhalten Ihre persönliche Expertenanalyse innerhalb von 24 Stunden
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Guidelines */}
      <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-200">
        <h4 className="text-sm font-semibold text-amber-900 mb-2">
          Tipps für optimale Fotos:
        </h4>
        <ul className="text-xs text-amber-800 space-y-1">
          <li>Seitliche Ganzkörperaufnahme (Profil)</li>
          <li>Frontale Ansicht von vorne</li>
          <li>Rückansicht</li>
          <li>Kopfdetail (seitlich und frontal)</li>
          <li>Beine und Hufe in guter Beleuchtung</li>
        </ul>
      </div>

      {/* Upload Button */}
      <div className="text-center">
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg min-h-[44px]"
          aria-label="Fotos für Premium-Analyse hochladen"
        >
          {isUploadClicked ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Öffnet Dropbox...</span>
            </span>
          ) : (
            "Fotos jetzt hochladen"
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-3">
          Sichere Übertragung über Dropbox • Ihre Daten werden vertraulich behandelt
        </p>
      </div>

      {/* Additional Information */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Fragen?</strong> Kontaktieren Sie uns unter:
        </p>
        <a 
          href="mailto:info@pferdewert.de" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          info@pferdewert.de
        </a>
      </div>
    </div>
  );
}