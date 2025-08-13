# Hetzner Server Setup - Komplette Dokumentation

## 🌐 Server Übersicht

### Server Details
- **Provider**: Hetzner Cloud
- **IP**: 167.235.233.90
- **OS**: Ubuntu 22.04 LTS (Linux 6.8.0-71-generic)
- **Architektur**: x86_64
- **RAM**: 3.7GB (2.5GB verfügbar)
- **Storage**: 38GB SSD (13GB verwendet, 23GB frei)
- **User**: `dev` (Haupt-Entwicklungsuser)

### Hostname & Netzwerk
```bash
# Server: pferdewert-dev
# Public IP: 167.235.233.90
# Private IP: 127.0.0.1 (loopback)
# IPv6: fe80::9000:6ff:fe56:da77/64
```

## 🛠️ Installierte Software & Services

### System Services (aktiv)
- **SSH Server**: OpenBSD Secure Shell server (Port 22)
- **UFW Firewall**: Uncomplicated firewall (aktiv aber nicht konfiguriert)

### Development Stack
```bash
# Node.js & NPM
Node.js: v20.19.4
NPM: v10.8.2

# Python Stack
Python: 3.12.3
pip: 24.0

# Tools
Git: ✅ (installiert)
Curl/Wget: ✅ (installiert)
Build-essential: ✅ (installiert)
```

### Claude Code CLI
```bash
# Installation
Location: /home/dev/node_modules/.bin/claude
Install Command: npm install -g @anthropic-ai/claude-code

# Usage
./node_modules/.bin/claude --all-permissions
```

## 📁 Projektstruktur

### Haupt-Arbeitsverzeichnis: `/home/dev/`

```
/home/dev/
├── pferdewert/                 # Haupt-Projekt
│   ├── frontend/              # Next.js Frontend
│   │   ├── package.json       # Frontend Dependencies
│   │   ├── components/        # React Komponenten
│   │   ├── pages/            # Next.js Routes
│   │   └── .env.local        # Frontend Umgebungsvariablen
│   ├── backend/              # FastAPI Backend
│   │   ├── main.py           # FastAPI Hauptdatei
│   │   ├── requirements.txt  # Python Dependencies
│   │   ├── venv/            # Virtual Environment
│   │   └── .env             # Backend Umgebungsvariablen
│   ├── CLAUDE.md            # Claude Code Kontext
│   ├── voice_bot.py         # Whisper Telegram Bot
│   └── voicebot_env/        # Voice Bot Virtual Environment
├── .env                     # Server Umgebungsvariablen
├── .ssh/                    # SSH Konfiguration
├── setup-hetzner.sh         # Server Setup Script
└── *.md                     # Dokumentation
```

### Aktive Prozesse
```bash
# Python Voice Bot
Process: python voice_bot.py
PID: 9042
Memory: 698MB (17.8% RAM usage)
Status: Running seit Aug 12

# PM2 Process Manager
Process: PM2 v6.0.8 God Daemon
PID: 2077
Memory: 57MB
Status: Running
```

## 🔧 Setup & Installation

### Automatisches Setup
```bash
# Haupt-Setup Script
./setup-hetzner.sh

# Was wird installiert:
- System Updates (apt update/upgrade)
- Node.js 20 LTS
- Python 3.12 + pip + venv
- Git + Build Tools
- Claude Code CLI
- MongoDB Shell
- PferdeWert Repository
```

### Manuelle Installation Schritte
```bash
# 1. System Updates
sudo apt update && sudo apt upgrade -y

# 2. Development Tools
sudo apt install -y curl wget git build-essential python3-pip python3-venv

# 3. Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 5. Python Voice Bot Dependencies
cd ~/pferdewert
python3 -m venv voicebot_env
source voicebot_env/bin/activate
pip install python-telegram-bot openai-whisper python-dotenv
```

## 🔐 Sicherheit & Authentifizierung

### SSH Konfiguration
```bash
# SSH Keys
Private Key: ~/.ssh/id_ed25519
Public Key: ~/.ssh/id_ed25519.pub
Authorized Keys: ~/.ssh/authorized_keys

# Keep-Alive Settings (in ~/.ssh/config)
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### User Permissions (dev User)
```bash
# User Details
Username: dev
Groups: dev, sudo, users
Home: /home/dev
Shell: /bin/bash

# Sudo Berechtigung
Status: ✅ Hat sudo Rechte
Passwort: ⚠️ ERFORDERLICH für sudo Befehle
Einschränkung: Passwort-Eingabe bei jedem sudo

# Claude Code Permissions
Working Directory: /home/dev (volle Rechte)
File Operations: ✅ Lesen, Schreiben, Ausführen
System Operations: ❌ Nur mit sudo + Passwort
Network: ✅ Kann auf Ports binden (3000, 8000)

# Was Claude Code KANN (ohne sudo):
- Dateien in /home/dev erstellen/bearbeiten/löschen
- Python/Node.js Scripts ausführen
- Git Operationen
- npm install, pip install
- Port 3000, 8000 für Development
- Prozesse des dev Users starten/stoppen

# Was Claude Code NICHT KANN (braucht sudo + PW):
- System-Packages installieren (apt install)
- System Services verwalten (systemctl)
- Firewall Regeln ändern (ufw)
- System-Dateien in /etc bearbeiten
- Als root oder andere User agieren
- System Reboot/Shutdown
```

### Firewall Status
```bash
# UFW Status
Status: active (aber nicht konfiguriert)
Default: deny (incoming), allow (outgoing)

# Empfohlene Firewall Regeln:
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 3000/tcp  # Frontend Dev
sudo ufw allow 8000/tcp  # Backend Dev
sudo ufw enable
```

### API Keys & Secrets
```bash
# In /home/dev/.env
TELEGRAM_TOKEN=8445071008:***  # Telegram Bot Token

# In pferdewert/frontend/.env.local
STRIPE_SECRET_KEY=***
MONGODB_URI=***
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=***

# In pferdewert/backend/.env
OPENAI_API_KEY=***
ANTHROPIC_API_KEY=***
MONGODB_URI=***
```

## 🚀 Development Workflows

### PferdeWert Projekt starten
```bash
# Option 1: Manuell
# Backend
cd ~/pferdewert/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend (neue Terminal Session)
cd ~/pferdewert/frontend
npm run dev -- --hostname 0.0.0.0

# Option 2: Mit Script
cd ~/pferdewert
./start-dev.sh  # Startet beide Services
```

### Voice Bot Management
```bash
# Voice Bot starten
cd ~/pferdewert
source voicebot_env/bin/activate
python voice_bot.py

# Mit Screen (dauerhaft)
screen -S voicebot
python voice_bot.py
# Ctrl+A, D zum detachen

# Voice Bot Status prüfen
ps aux | grep voice_bot.py
```

### Claude Code Usage
```bash
# Claude mit vollen Permissions (im User-Kontext)
cd /home/dev
./node_modules/.bin/claude --all-permissions

# Über npm script (wenn global installiert)
claude --all-permissions

# In Kombination mit Voice Bot
# Bot führt aus: subprocess.run(["claude", "--all-permissions", command])

# WICHTIG: Claude Code Einschränkungen
# ✅ Funktioniert OHNE Passwort:
claude "erstelle eine neue React Komponente"
claude "führe npm install aus"
claude "starte npm run dev"
claude "analysiere den Code und finde Bugs"
claude "erstelle ein Python Script"

# ❌ Funktioniert NICHT (braucht sudo + Passwort):
claude "installiere nginx"                    # → sudo apt install nginx
claude "starte systemd service"               # → sudo systemctl start
claude "öffne Firewall Port"                 # → sudo ufw allow
claude "bearbeite /etc/hosts"                # → sudo nano /etc/hosts

# Workaround für System-Operationen:
# 1. Manual: SSH mit Termius → sudo Befehle manuell
# 2. Script: Claude erstellt Script, du führst mit sudo aus
# 3. Docker: Claude arbeitet in Container (falls installiert)
```

## 📊 Monitoring & Wartung

### System Resources
```bash
# Speicher prüfen
free -h
# 3.7GB total, ~1.2GB verwendet, 2.5GB verfügbar

# Festplatte prüfen
df -h
# 38GB total, 13GB verwendet, 23GB frei (37% Usage)

# Aktive Prozesse
ps aux | head -20

# Network Status
ss -tulpn | grep LISTEN
```

### Logs & Debugging
```bash
# System Logs
sudo journalctl -f

# Voice Bot Logs
tail -f ~/pferdewert/voice_bot.log  # Falls logging aktiviert

# Frontend/Backend Logs
cd ~/pferdewert/frontend && npm run dev  # Live logs
cd ~/pferdewert/backend && uvicorn main:app --reload  # Live logs
```

### Backup & Updates
```bash
# Git Updates
cd ~/pferdewert
git pull origin main

# Python Dependencies Update
cd ~/pferdewert/backend
source venv/bin/activate
pip install --upgrade -r requirements.txt

# Node Dependencies Update
cd ~/pferdewert/frontend
npm update

# System Updates
sudo apt update && sudo apt upgrade -y
```

## 🤖 Whisper Telegram Bot Integration

### Bot Setup
```bash
# Virtual Environment
Location: ~/pferdewert/voicebot_env/
Activation: source voicebot_env/bin/activate

# Dependencies
python-telegram-bot==20.7
openai-whisper==20231117
python-dotenv==1.0.0

# Configuration
File: /home/dev/.env
TELEGRAM_TOKEN=8445071008:***
```

### Bot Features
- ✅ Voice Message → Whisper Transcription
- ✅ Claude Code Integration via subprocess
- ✅ Security: Only authorized Telegram user
- ✅ Working Directory: /home/dev (access to all projects)
- ✅ Full Permissions: --all-permissions flag

### Bot Commands
```python
# Beispiel Voice Commands:
"Claude, zeig mir die package.json vom pferdewert frontend"
"Claude, starte npm run dev im pferdewert frontend"
"Claude, führe git status aus"
"Claude, analysiere mein Notion Workspace"
```

## 🔗 External Integrations

### MongoDB
```bash
# MongoDB Shell installiert
Command: mongosh
Connect: mongosh "mongodb+srv://cluster.example.mongodb.net/"
```

### Notion API
```bash
# Via Python Scripts
Script: ~/notion_analyzer.py
Dependencies: notion-client
API Token: In .env NOTION_TOKEN=***
```

### Vercel Frontend Deployment
```bash
# Frontend deployed to Vercel
Domain: pferdewert.de
Source: Github Repository
Auto-Deploy: On main branch push
```

### Render Backend Deployment
```bash
# Backend deployed to Render
Domain: API endpoint (configured in frontend)
Source: Github Repository
Auto-Deploy: On main branch push
```

## 📋 Wartungsaufgaben

### Täglich
- [ ] Voice Bot Status prüfen (`ps aux | grep voice_bot`)
- [ ] Disk Space monitoring (`df -h`)
- [ ] Memory Usage check (`free -h`)

### Wöchentlich  
- [ ] System Updates (`sudo apt update && sudo apt upgrade`)
- [ ] Git Repository Updates (`git pull`)
- [ ] Log File Cleanup (`sudo journalctl --vacuum-time=7d`)

### Monatlich
- [ ] Dependencies Updates (npm update, pip upgrade)
- [ ] SSH Key Rotation (falls erforderlich)
- [ ] Backup wichtiger Konfigurationen
- [ ] Security Audit (fail2ban, firewall rules)

## 🆘 Troubleshooting

### Häufige Probleme

#### Voice Bot startet nicht
```bash
# Check Python Environment
source ~/pferdewert/voicebot_env/bin/activate
python -c "import telegram; print('OK')"

# Check Telegram Token
grep TELEGRAM_TOKEN /home/dev/.env
```

#### Claude Code funktioniert nicht
```bash
# Check Installation
ls -la ~/node_modules/.bin/claude
./node_modules/.bin/claude --version

# Permissions
chmod +x ~/node_modules/.bin/claude

# Häufiger Fehler: sudo Permission denied
# Problem: Claude versucht sudo Befehle ohne Passwort
# Lösung: Befehle umformulieren oder manual mit Termius ausführen

# Beispiel Problem:
claude "installiere python package systemweit"
# → Fehler: sudo pip install braucht Passwort

# Lösung:
claude "installiere python package in virtual environment"
# → Funktioniert: pip install in venv braucht kein sudo
```

#### Port bereits belegt
```bash
# Check Port Usage
sudo ss -tulpn | grep :3000
sudo ss -tulpn | grep :8000

# Kill Process
sudo kill $(sudo lsof -t -i:3000)
```

#### SSH Connection Drops
```bash
# Check SSH Config
cat ~/.ssh/config

# Add Keep-Alive
echo "ServerAliveInterval 60" >> ~/.ssh/config
```

## 🔄 Deployment Pipeline

### Development → Staging → Production
```bash
# 1. Local Development (Hetzner Server)
npm run dev (Frontend)
uvicorn main:app --reload (Backend)

# 2. Git Push
git add .
git commit -m "Feature: ..."
git push origin main

# 3. Auto-Deploy
Vercel: Frontend deployment (automatic)
Render: Backend deployment (automatic)

# 4. Testing
curl https://api.pferdewert.de/health
curl https://pferdewert.de/
```

## 📞 Support & Kontakte

### Server Access

#### SSH via Terminal/CLI
```bash
# Standard SSH Connection
ssh dev@167.235.233.90

# Mit SSH Key (empfohlen)
ssh -i ~/.ssh/id_ed25519 dev@167.235.233.90

# Port Forwarding für Development
ssh -L 3000:localhost:3000 -L 8000:localhost:8000 dev@167.235.233.90
```

#### Termius App (Mobile/Desktop)
```yaml
# Termius Connection Settings
Host: 167.235.233.90
Port: 22
Username: dev
Authentication: SSH Key (id_ed25519) oder Password

# Port Forwarding in Termius:
Local Port 3000 → Remote localhost:3000 (Frontend)
Local Port 8000 → Remote localhost:8000 (Backend)

# Termius Features für PferdeWert:
- Snippets: Häufige Befehle speichern
- SFTP: Datei-Upload/Download
- Terminal Tabs: Frontend/Backend/Voice Bot parallel
- Keep-Alive: Automatisch in Termius aktiviert
```

#### Termius Quick Commands Setup
```bash
# In Termius als Snippets speichern:

# PferdeWert Development
cd ~/pferdewert && ./start-dev.sh

# Voice Bot Status
ps aux | grep voice_bot && free -h

# Quick Git Status
cd ~/pferdewert && git status && git log --oneline -5

# Claude Code Session
cd /home/dev && ./node_modules/.bin/claude --all-permissions

# System Status
df -h && free -h && uptime

# Restart Voice Bot
pkill -f voice_bot.py && cd ~/pferdewert && source voicebot_env/bin/activate && python voice_bot.py &
```

### Support Resources
```bash
# Claude Code Support
GitHub: https://github.com/anthropics/claude-code/issues

# Hetzner Console
https://console.hetzner.cloud/

# Termius Support
https://termius.com/support
```

### Wichtige Befehle
```bash
# Quick Server Status
systemctl status ssh
free -h
df -h
ps aux | grep -E "(python|node)"

# Quick Restart Services
sudo systemctl restart ssh
pkill -f "voice_bot.py" && python voice_bot.py &

# Emergency
sudo reboot  # Neustart des gesamten Servers
```

---

*Erstellt: 2025-08-13*  
*Server: pferdewert-dev (167.235.233.90)*  
*User: dev*  
*Status: Production Ready*