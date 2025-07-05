#!/bin/bash

echo "🐴 PferdeWert – Lokales Setup"

# ---- Frontend starten ----
echo "📦 Wechsel ins Frontend..."
cd frontend || { echo "❌ frontend-Verzeichnis nicht gefunden"; exit 1; }

echo "🔧 Abhängigkeiten installieren (npm install)..."
npm install

echo "🚀 Starte Frontend Dev-Server auf http://localhost:3000 ..."
npm run dev

# ---- OPTIONAL: Backend (Python) vorbereiten ----
# cd ../backend || { echo "❌ backend-Verzeichnis nicht gefunden"; exit 1; }
# echo "🐍 Aktiviere Python venv..."
# source .venv/Scripts/activate

# echo "📦 Installiere Python-Abhängigkeiten..."
# pip install -r requirements.txt

# echo "🚀 Starte Backend mit Uvicorn..."
# uvicorn main:app --reload
