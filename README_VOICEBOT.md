# 🤖 PferdeWert Whisper Voice Bot

Simple Telegram bot that converts voice messages to text using OpenAI Whisper.

## 🚀 Quick Start (5 Minutes)

### 1. Get Telegram Bot Token
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create new bot: `/newbot`
3. Choose name and username
4. Copy the token

### 2. Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env and add your TELEGRAM_TOKEN

# Run the bot
python voice_bot.py
```

### 3. Test
- Find your bot on Telegram
- Send `/start` for welcome message
- Send a voice message to test transcription!

## 📱 Features

- **Voice to Text**: Send voice messages, get transcribed text ✅
- **Command Detection**: Recognizes keywords like "claude", "notion", "status", "pferd" ✅
- **Notion Integration**: Tagebuch-Einträge und Workspace-Analyse per Voice ✅
- **German Support**: Works perfectly with German voice messages ✅
- **Production Ready**: Läuft stabil auf Hetzner Server ✅

## 🎯 Commands

Send voice messages containing these keywords:
- **"claude"** - Triggers Claude Code response
- **"notion"** - Triggers Notion response  
- **"status"** - Shows bot/server status
- **"pferd"** - Triggers horse evaluation response

## 🛠 Deploy to Server

### Option 1: Screen Session
```bash
# Upload files
scp voice_bot.py requirements.txt .env user@yourserver:~/

# SSH to server
ssh user@yourserver

# Install and run
pip install -r requirements.txt
screen -S voicebot python voice_bot.py

# Detach with Ctrl+A, D
```

### Option 2: Background Process
```bash
nohup python voice_bot.py > bot.log 2>&1 &
```

## 🔧 Troubleshooting

### Bot not responding?
- Check TELEGRAM_TOKEN in .env
- Verify bot is running: `ps aux | grep voice_bot`

### Whisper model loading slow?
- First run downloads ~140MB model
- Subsequent runs are faster
- Use smaller model: change `"base"` to `"tiny"` for speed

### Voice not transcribing?
- Check file format (Telegram sends .ogg)
- Try shorter voice messages first
- Check console output for errors

## 📦 File Structure
```
voice_bot.py       # Main bot code
requirements.txt   # Python dependencies
.env              # Your tokens (don't commit!)
.env.example      # Template for .env
README_VOICEBOT.md # This file
```

## ✅ Development Complete

**Week 1**: Voice transcription ✅  
**Week 2**: Notion integration ✅  
**Week 3**: Extended voice commands ✅  
**Week 4**: Production deployment ✅

**Status**: Bot läuft produktiv und wird täglich genutzt!  

## 💡 Anti-Over-Engineering

This follows the "Quick Win" approach from WHISPER_TODO.md:
- Single file until it gets too big
- Minimal dependencies
- No Docker for MVP
- No complex error handling
- No logging framework (uses print)
- No tests for quick win

Perfect is the enemy of done! 🚀