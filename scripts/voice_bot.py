#!/usr/bin/env python3
"""
PferdeWert Whisper Voice Bot - MVP
Simple Telegram bot with voice-to-text using Whisper
"""

import os
import tempfile
import telebot
import whisper
from dotenv import load_dotenv
import logging
import subprocess
import asyncio
import json
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Add current directory to PATH for FFmpeg
current_dir = os.path.dirname(os.path.abspath(__file__))
os.environ['PATH'] = current_dir + os.pathsep + os.environ.get('PATH', '')

# Initialize bot and Whisper model
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
if not TELEGRAM_TOKEN:
    print("❌ TELEGRAM_TOKEN not found in .env file!")
    exit(1)

bot = telebot.TeleBot(TELEGRAM_TOKEN)
print("🤖 Loading Whisper model (this might take a moment)...")
model = whisper.load_model("small")  # Better quality: ~244MB (99% accuracy für deutsche Sprache)
print("✅ Whisper model loaded successfully!")

# Store for pending corrections
pending_corrections = {}
correction_history = []

def execute_claude_command(command):
    """Execute Claude Code CLI command and return response"""
    try:
        logger.info(f"Executing Claude command: {command[:100]}...")
        
        result = subprocess.run(
            ["/home/dev/node_modules/.bin/claude", "--print", "--dangerously-skip-permissions", command],
            cwd="/home/dev",
            capture_output=True,
            text=True,
            timeout=120  # 2 minutes timeout
        )
        
        if result.returncode == 0:
            output = result.stdout.strip()
            if output:
                logger.info(f"Claude response: {len(output)} characters")
                return output
            else:
                return "✅ Command executed successfully (no output)"
        else:
            error_msg = result.stderr.strip() if result.stderr else "Unknown error"
            logger.error(f"Claude command failed: {error_msg}")
            return f"❌ Claude Error: {error_msg}"
            
    except subprocess.TimeoutExpired:
        logger.error("Claude command timed out")
        return "⏱️ Command timed out after 2 minutes"
    except Exception as e:
        logger.error(f"Error executing Claude command: {str(e)}")
        return f"❌ Error: {str(e)}"

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    """Welcome message"""
    bot.reply_to(message, 
        "🐴 Willkommen zum PferdeWert Voice Bot!\n\n"
        "📢 Sende mir eine Sprachnachricht und ich wandle sie in Text um.\n"
        "🎯 Kommandos: 'claude', 'notion', 'status'\n"
        "✏️ Korrektur: '/fix [corrected text]' um letzte Transkription zu korrigieren\n"
        "📝 Geschichte: '/history' zeigt Korrekturen\n\n"
        "Made with ❤️ for PferdeWert.de"
    )

@bot.message_handler(content_types=['voice'])
def voice_to_text(message):
    """Handle voice messages - convert to text using Whisper"""
    try:
        logger.info(f"Voice message received from {message.from_user.first_name}")
        
        # Download voice file
        file_info = bot.get_file(message.voice.file_id)
        downloaded_file = bot.download_file(file_info.file_path)
        logger.info(f"Downloaded voice file: {file_info.file_path}")
        
        # Transcribe with auto-cleanup
        logger.info("Starting transcription...")
        with tempfile.NamedTemporaryFile(suffix='.ogg', delete=True) as temp_file:
            temp_file.write(downloaded_file)
            temp_file.flush()
            logger.info(f"Temporary file created: {temp_file.name}")
            
            result = model.transcribe(temp_file.name)
            transcribed_text = result["text"].strip()
        
        if not transcribed_text:
            logger.warning("Empty transcription result")
            bot.reply_to(message, "🤔 Ich konnte nichts verstehen. Versuche es nochmal!")
            return
        
        logger.info(f"Transcribed: {transcribed_text}")
        
        # Store transcription for potential correction
        user_id = message.from_user.id
        pending_corrections[user_id] = {
            'original_text': transcribed_text,
            'timestamp': datetime.now(),
            'message_id': message.message_id
        }
        
        # Send transcription confirmation with correction option
        bot.reply_to(message, f"📝 Verstanden: *{transcribed_text}*\n\n💡 Falls nicht korrekt: `/fix [korrigierter Text]`", parse_mode='Markdown')
        
        # Execute Claude Code command
        logger.info("Sending command to Claude Code...")
        bot.reply_to(message, "🤖 Claude arbeitet...")
        
        claude_response = execute_claude_command(transcribed_text)
        
        # Split long responses (Telegram limit: 4096 chars)
        if len(claude_response) > 4000:
            # Send in chunks
            chunks = [claude_response[i:i+4000] for i in range(0, len(claude_response), 4000)]
            for i, chunk in enumerate(chunks[:3]):  # Max 3 messages
                if i == 0:
                    bot.reply_to(message, f"📤 **Claude Response** (Teil {i+1}/{min(len(chunks), 3)}):\n\n```\n{chunk}\n```", parse_mode='Markdown')
                else:
                    bot.send_message(message.chat.id, f"📤 **Teil {i+1}:**\n\n```\n{chunk}\n```", parse_mode='Markdown')
            
            if len(chunks) > 3:
                bot.send_message(message.chat.id, f"⚠️ Response zu lang - {len(chunks)-3} weitere Teile abgeschnitten")
        else:
            bot.reply_to(message, f"📤 **Claude Response:**\n\n```\n{claude_response}\n```", parse_mode='Markdown')
        
        logger.info("Voice → Claude pipeline completed successfully")
        
    except Exception as e:
        logger.error(f"Error processing voice: {e}", exc_info=True)
        bot.reply_to(message, f"🚨 Fehler beim Verarbeiten der Sprachnachricht: {str(e)}")

# Removed process_command - now using direct Claude Code integration

@bot.message_handler(commands=['fix'])
def fix_transcription(message):
    """Handle transcription corrections"""
    try:
        user_id = message.from_user.id
        
        # Check if user has pending correction
        if user_id not in pending_corrections:
            bot.reply_to(message, "❌ Keine ausstehende Transkription zum Korrigieren gefunden!")
            return
        
        # Extract corrected text
        command_parts = message.text.split(' ', 1)
        if len(command_parts) < 2:
            bot.reply_to(message, "❌ Bitte gib den korrigierten Text an: `/fix [korrigierter Text]`")
            return
        
        corrected_text = command_parts[1].strip()
        pending = pending_corrections[user_id]
        
        # Save to correction history
        correction_entry = {
            'user_id': user_id,
            'original': pending['original_text'],
            'corrected': corrected_text,
            'timestamp': datetime.now().isoformat()
        }
        correction_history.append(correction_entry)
        
        # Execute corrected command
        logger.info(f"Executing corrected text: {corrected_text}")
        bot.reply_to(message, f"✅ Korrigiert von:\n*{pending['original_text']}*\n\nzu:\n*{corrected_text}*\n\n🤖 Claude arbeitet mit korrigiertem Text...", parse_mode='Markdown')
        
        claude_response = execute_claude_command(corrected_text)
        
        # Send corrected response
        if len(claude_response) > 4000:
            chunks = [claude_response[i:i+4000] for i in range(0, len(claude_response), 4000)]
            for i, chunk in enumerate(chunks[:3]):
                if i == 0:
                    bot.reply_to(message, f"📤 **Claude Response (korrigiert)** (Teil {i+1}/{min(len(chunks), 3)}):\n\n```\n{chunk}\n```", parse_mode='Markdown')
                else:
                    bot.send_message(message.chat.id, f"📤 **Teil {i+1}:**\n\n```\n{chunk}\n```", parse_mode='Markdown')
            
            if len(chunks) > 3:
                bot.send_message(message.chat.id, f"⚠️ Response zu lang - {len(chunks)-3} weitere Teile abgeschnitten")
        else:
            bot.reply_to(message, f"📤 **Claude Response (korrigiert):**\n\n```\n{claude_response}\n```", parse_mode='Markdown')
        
        # Clean up pending correction
        del pending_corrections[user_id]
        logger.info("Text correction completed successfully")
        
    except Exception as e:
        logger.error(f"Error in fix_transcription: {e}", exc_info=True)
        bot.reply_to(message, f"🚨 Fehler beim Korrigieren: {str(e)}")

@bot.message_handler(commands=['history'])
def show_correction_history(message):
    """Show correction history"""
    try:
        user_id = message.from_user.id
        user_corrections = [c for c in correction_history if c['user_id'] == user_id]
        
        if not user_corrections:
            bot.reply_to(message, "📝 Noch keine Korrekturen vorgenommen.")
            return
        
        history_text = "📝 **Korrektur-Geschichte:**\n\n"
        for i, correction in enumerate(user_corrections[-10:], 1):  # Last 10 corrections
            history_text += f"{i}. 🕐 {correction['timestamp'][:19]}\n"
            history_text += f"   ❌ *{correction['original']}*\n"
            history_text += f"   ✅ *{correction['corrected']}*\n\n"
        
        bot.reply_to(message, history_text, parse_mode='Markdown')
        
    except Exception as e:
        logger.error(f"Error showing history: {e}", exc_info=True)
        bot.reply_to(message, f"🚨 Fehler beim Anzeigen der Geschichte: {str(e)}")

@bot.message_handler(func=lambda message: True)
def handle_text(message):
    """Handle text messages"""
    bot.reply_to(message, 
        "📱 Sende mir eine Sprachnachricht für die Whisper-Transkription!\n"
        "✏️ `/fix [Text]` um letzte Transkription zu korrigieren\n"
        "📝 `/history` für Korrektur-Geschichte\n"
        "Oder verwende /help für mehr Infos."
    )

if __name__ == "__main__":
    logger.info("PferdeWert Voice Bot starting...")
    logger.info("Send voice messages to test Whisper transcription!")
    logger.info("Press Ctrl+C to stop")
    
    # Check if FFmpeg is available
    import subprocess
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        logger.info("FFmpeg found and working")
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        logger.error(f"FFmpeg not found or not working: {e}")
        logger.error("Voice transcription will not work without FFmpeg!")
    
    try:
        # Clear any pending updates first with shorter timeout
        logger.info("Clearing pending updates...")
        try:
            bot.get_updates(offset=-1, timeout=1)
        except Exception as e:
            logger.warning(f"Could not clear updates: {e}")
        logger.info("Starting polling...")
        
        # Use infinity polling with shorter timeout
        bot.infinity_polling(restart_on_change=False, none_stop=True, timeout=10)
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Bot error: {e}", exc_info=True)