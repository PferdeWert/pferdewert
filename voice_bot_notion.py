#!/usr/bin/env python3
"""
PferdeWert Whisper Voice Bot with Notion Integration - Enhanced Version
Voice-to-Text with Whisper + Claude Code + Notion API Integration
"""

import os
import sys
import tempfile
import telebot
import whisper
from dotenv import load_dotenv
import logging
import subprocess
import json
from datetime import datetime

# Add current directory to Python path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

# Import Notion command detection
try:
    from notion_voice_commands import detect_notion_command, format_notion_response
except ImportError as e:
    print(f"❌ Could not import notion_voice_commands: {e}")
    print("Make sure notion_voice_commands.py is in the same directory")
    sys.exit(1)

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

def execute_notion_command(notion_cmd):
    """Execute Notion-specific Python scripts using virtual environment"""
    try:
        venv_python = "/home/dev/notion_env/bin/python"
        
        if notion_cmd['type'] == 'tagebuch':
            # Tagebuch entry - SIMPLE & SAFE
            cmd = [venv_python, "/home/dev/notion_diary.py", "add", notion_cmd['content']]
            
        elif notion_cmd['type'] == 'analyse':
            if notion_cmd.get('subtype') == 'weekly':
                cmd = [venv_python, "/home/dev/notion_analyzer.py", "weekly"]
            else:
                cmd = [venv_python, "/home/dev/notion_analyzer.py", "analyze"]
                
        elif notion_cmd['type'] == 'search':
            cmd = [venv_python, "/home/dev/notion_analyzer.py", "search", notion_cmd['query']]
            
        elif notion_cmd['type'] == 'update':
            # For updates, we use Claude to find and update the page
            claude_cmd = f"Use Python to search Notion for '{notion_cmd['target']}' and append '{notion_cmd['content']}' to the most relevant page"
            return execute_claude_command(claude_cmd)
            
        elif notion_cmd['type'] == 'create_page':
            # For page creation, use Claude with the Python scripts
            claude_cmd = f"Create a new Notion page titled '{notion_cmd['title']}' using the notion_analyzer.py script"
            return execute_claude_command(claude_cmd)
            
        else:
            return f"❌ Unknown Notion command type: {notion_cmd['type']}"
        
        # Execute the command
        logger.info(f"Executing Notion command: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            return result.stdout.strip() or "✅ Notion command executed successfully"
        else:
            error_msg = result.stderr.strip() if result.stderr else "Unknown error"
            return f"❌ Notion Error: {error_msg}"
            
    except subprocess.TimeoutExpired:
        return "⏱️ Notion command timed out"
    except Exception as e:
        logger.error(f"Error executing Notion command: {str(e)}")
        return f"❌ Notion Error: {str(e)}"

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    """Welcome message"""
    bot.reply_to(message, 
        "🐴 Willkommen zum PferdeWert Voice Bot mit Notion Integration!\n\n"
        "📢 **Voice Commands:**\n"
        "🎯 **Normale Befehle:** 'claude [command]'\n"
        "📝 **Notion Tagebuch:** 'Tagebuch Eintrag: [text]'\n"
        "📊 **Notion Analyse:** 'Durchsuche mein Notion Board'\n"
        "🔍 **Notion Suche:** 'Suche in Notion nach [query]'\n"
        "✏️ **Notion Update:** 'Füge zum [page] hinzu: [content]'\n\n"
        "✏️ **Korrektur:** '/fix [corrected text]'\n"
        "📝 **Geschichte:** '/history' zeigt Korrekturen\n\n"
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
        
        # Check for Notion commands first
        notion_command = detect_notion_command(transcribed_text)
        
        if notion_command:
            # Handle Notion-specific commands
            logger.info(f"Notion command detected: {notion_command['type']}")
            bot.reply_to(message, f"📝 Notion Befehl erkannt: **{notion_command['type']}**", parse_mode='Markdown')
            bot.reply_to(message, "🔄 Verarbeite mit Notion API...")
            
            # Execute Notion command
            notion_response = execute_notion_command(notion_command)
            
            # Format and send response
            formatted_response = format_notion_response(notion_command, notion_response)
            
            # Split long responses
            if len(formatted_response) > 4000:
                chunks = [formatted_response[i:i+4000] for i in range(0, len(formatted_response), 4000)]
                for i, chunk in enumerate(chunks[:3]):
                    if i == 0:
                        bot.reply_to(message, chunk, parse_mode='Markdown')
                    else:
                        bot.send_message(message.chat.id, chunk, parse_mode='Markdown')
                        
                if len(chunks) > 3:
                    bot.send_message(message.chat.id, f"⚠️ Response zu lang - {len(chunks)-3} weitere Teile abgeschnitten")
            else:
                bot.reply_to(message, formatted_response, parse_mode='Markdown')
                
        else:
            # Handle regular Claude Code commands
            logger.info("Regular Claude command - sending to Claude Code...")
            bot.reply_to(message, "🤖 Claude arbeitet...")
            
            claude_response = execute_claude_command(transcribed_text)
            
            # Split long responses (Telegram limit: 4096 chars)
            if len(claude_response) > 4000:
                chunks = [claude_response[i:i+4000] for i in range(0, len(claude_response), 4000)]
                for i, chunk in enumerate(chunks[:3]):
                    if i == 0:
                        bot.reply_to(message, f"📤 **Claude Response** (Teil {i+1}/{min(len(chunks), 3)}):\n\n```\n{chunk}\n```", parse_mode='Markdown')
                    else:
                        bot.send_message(message.chat.id, f"📤 **Teil {i+1}:**\n\n```\n{chunk}\n```", parse_mode='Markdown')
                
                if len(chunks) > 3:
                    bot.send_message(message.chat.id, f"⚠️ Response zu lang - {len(chunks)-3} weitere Teile abgeschnitten")
            else:
                bot.reply_to(message, f"📤 **Claude Response:**\n\n```\n{claude_response}\n```", parse_mode='Markdown')
        
        logger.info("Voice processing completed successfully")
        
    except Exception as e:
        logger.error(f"Error processing voice: {e}", exc_info=True)
        bot.reply_to(message, f"🚨 Fehler beim Verarbeiten der Sprachnachricht: {str(e)}")

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
        
        bot.reply_to(message, f"✅ Korrigiert von:\n*{pending['original_text']}*\n\nzu:\n*{corrected_text}*\n\n🔄 Verarbeite korrigierten Text...", parse_mode='Markdown')
        
        # Check corrected text for Notion commands
        notion_command = detect_notion_command(corrected_text)
        
        if notion_command:
            logger.info(f"Corrected Notion command: {notion_command['type']}")
            bot.reply_to(message, f"📝 Korrigierter Notion Befehl: **{notion_command['type']}**", parse_mode='Markdown')
            
            notion_response = execute_notion_command(notion_command)
            formatted_response = format_notion_response(notion_command, notion_response)
            bot.reply_to(message, formatted_response, parse_mode='Markdown')
        else:
            # Regular Claude command
            claude_response = execute_claude_command(corrected_text)
            
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

@bot.message_handler(commands=['notion_test'])
def test_notion_integration(message):
    """Test Notion integration"""
    try:
        # Check environment variables
        notion_token = os.getenv('NOTION_TOKEN')
        diary_page_id = os.getenv('NOTION_TAGEBUCH_PAGE_ID')
        
        status_text = "🔍 **Notion Integration Test:**\n\n"
        
        if notion_token:
            status_text += "✅ NOTION_TOKEN gesetzt\n"
        else:
            status_text += "❌ NOTION_TOKEN fehlt\n"
            
        if diary_page_id:
            status_text += "✅ NOTION_TAGEBUCH_PAGE_ID gesetzt\n"
        else:
            status_text += "❌ NOTION_TAGEBUCH_PAGE_ID fehlt\n"
        
        # Test scripts
        try:
            venv_python = "/home/dev/notion_env/bin/python"
            result = subprocess.run([venv_python, "-c", "from notion_client import Client; print('✅ notion-client available')"], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                status_text += "✅ notion-client installiert\n"
            else:
                status_text += "❌ notion-client Problem\n"
        except:
            status_text += "❌ Virtual environment Problem\n"
        
        bot.reply_to(message, status_text, parse_mode='Markdown')
        
    except Exception as e:
        bot.reply_to(message, f"🚨 Test Fehler: {str(e)}")

@bot.message_handler(func=lambda message: True)
def handle_text(message):
    """Handle text messages"""
    bot.reply_to(message, 
        "📱 Sende mir eine **Sprachnachricht** für Whisper-Transkription!\n\n"
        "🎯 **Voice Commands:**\n"
        "• 'Claude [command]' - Normale Befehle\n"
        "• 'Tagebuch Eintrag: [text]' - Notion Diary\n"
        "• 'Durchsuche mein Notion Board' - Analyse\n"
        "• 'Suche in Notion nach [query]' - Suche\n\n"
        "✏️ `/fix [Text]` um letzte Transkription zu korrigieren\n"
        "📝 `/history` für Korrektur-Geschichte\n"
        "🔍 `/notion_test` für Notion Status\n"
        "Oder verwende /help für mehr Infos.", parse_mode='Markdown'
    )

if __name__ == "__main__":
    logger.info("PferdeWert Voice Bot with Notion Integration starting...")
    logger.info("Send voice messages to test Whisper + Notion integration!")
    logger.info("Press Ctrl+C to stop")
    
    # Check dependencies
    import subprocess
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        logger.info("FFmpeg found and working")
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        logger.error(f"FFmpeg not found: {e}")
        logger.error("Voice transcription will not work without FFmpeg!")
    
    # Check Notion environment
    if not os.getenv('NOTION_TOKEN'):
        logger.warning("NOTION_TOKEN not set - Notion features will not work")
    else:
        logger.info("NOTION_TOKEN found")
        
    if not os.getenv('NOTION_TAGEBUCH_PAGE_ID'):
        logger.warning("NOTION_TAGEBUCH_PAGE_ID not set - Diary features will not work")
    else:
        logger.info("NOTION_TAGEBUCH_PAGE_ID found")
    
    try:
        # Clear any pending updates
        logger.info("Clearing pending updates...")
        try:
            bot.get_updates(offset=-1, timeout=1)
        except Exception as e:
            logger.warning(f"Could not clear updates: {e}")
        logger.info("Starting polling...")
        
        # Use infinity polling
        bot.infinity_polling(restart_on_change=False, none_stop=True, timeout=10)
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Bot error: {e}", exc_info=True)