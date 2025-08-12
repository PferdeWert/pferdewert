#!/bin/bash
set -e

echo "🚀 PferdeWert Development Server Setup"
echo "======================================"

# System Updates
echo "📦 System-Updates..."
sudo apt update && sudo apt upgrade -y

# Essential tools
echo "🛠️  Entwicklungstools installieren..."
sudo apt install -y curl wget git build-essential python3-pip unzip

# Node.js 20 LTS via NodeSource
echo "📦 Node.js 20 LTS installieren..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
echo "✅ Versionen prüfen..."
node --version
npm --version
git --version

# Claude Code CLI
echo "🤖 Claude Code CLI installieren..."
npm install -g @anthropic-ai/claude-code

# Python für Backend
echo "🐍 Python-Tools installieren..."
sudo apt install -y python3-venv python3-dev

# MongoDB tools (für lokale Entwicklung optional)
echo "🗄️  MongoDB Shell installieren..."
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-mongosh

# Clone PferdeWert repo if not exists
if [ ! -d ~/pferdewert ]; then
    echo "📥 PferdeWert Repository klonen..."
    cd ~
    git clone https://github.com/bencodes8/pferdewert.git
else
    echo "📂 PferdeWert Repository existiert bereits"
fi

cd ~/pferdewert

# Frontend setup
echo "🎨 Frontend Dependencies installieren..."
cd frontend
npm install

# Backend setup
echo "⚙️  Backend Virtual Environment erstellen..."
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create env files templates
echo "📝 Umgebungsvariablen Templates erstellen..."
cd ~/pferdewert/frontend
if [ ! -f .env.local ]; then
    cat > .env.local.example << 'EOF'
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# MongoDB
MONGODB_URI=

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
EOF
    echo "⚠️  Bitte .env.local konfigurieren!"
fi

cd ~/pferdewert/backend
if [ ! -f .env ]; then
    cat > .env.example << 'EOF'
# MongoDB
MONGODB_URI=

# OpenAI
OPENAI_API_KEY=

# Anthropic Claude
ANTHROPIC_API_KEY=

# CORS
FRONTEND_URL=http://localhost:3000
EOF
    echo "⚠️  Bitte backend/.env konfigurieren!"
fi

# Terminus-specific optimizations
echo "📱 Terminus-Optimierungen..."
cat > ~/pferdewert/start-dev.sh << 'EOF'
#!/bin/bash
# Start development servers for Terminus

echo "Starting PferdeWert Development Environment..."

# Backend in background
cd ~/pferdewert/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Frontend
cd ~/pferdewert/frontend
npm run dev -- --hostname 0.0.0.0

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
EOF

chmod +x ~/pferdewert/start-dev.sh

# SSH keep-alive for Terminus
echo "🔌 SSH Keep-Alive konfigurieren..."
if ! grep -q "ServerAliveInterval" ~/.ssh/config 2>/dev/null; then
    cat >> ~/.ssh/config << 'EOF'

Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
EOF
fi

echo ""
echo "✅ Installation abgeschlossen!"
echo "======================================"
echo ""
echo "📋 Nächste Schritte:"
echo "1. Umgebungsvariablen konfigurieren:"
echo "   - frontend/.env.local"
echo "   - backend/.env"
echo ""
echo "2. Development starten:"
echo "   ./start-dev.sh"
echo ""
echo "3. Claude Code nutzen:"
echo "   claude-code"
echo ""
echo "4. Für Terminus: Port-Forwarding einrichten"
echo "   - Frontend: 3000"
echo "   - Backend: 8000"