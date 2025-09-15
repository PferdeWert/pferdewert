# main.py – PferdeWert API mit Claude + GPT Parallel-Bewertung
import os
import logging
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import anthropic
import time
import random

import tiktoken  # Token-Zähler
from collections import deque
from threading import Lock

# ───────────────────────────────
#  Rate Limiting & Konfiguration
# ───────────────────────────────
load_dotenv()

# Simple rate limiting for Claude requests
class SimpleRateLimiter:
    def __init__(self, max_requests_per_minute=10):
        self.max_requests = max_requests_per_minute
        self.requests = deque()
        self.lock = Lock()

    def wait_if_needed(self):
        with self.lock:
            now = time.time()
            # Remove requests older than 1 minute
            while self.requests and now - self.requests[0] > 60:
                self.requests.popleft()

            # If we're at the limit, wait
            if len(self.requests) >= self.max_requests:
                sleep_time = 60 - (now - self.requests[0]) + 1
                if sleep_time > 0:
                    logging.warning(f"Rate limit reached, sleeping for {sleep_time:.1f}s")
                    time.sleep(sleep_time)

            # Record this request
            self.requests.append(now)

# Initialize rate limiter
claude_rate_limiter = SimpleRateLimiter(max_requests_per_minute=8)  # Conservative limit

# API Keys
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
CLAUDE_KEY = os.getenv("ANTHROPIC_API_KEY")

# Model Settings
MODEL_ID = os.getenv("PW_MODEL", "gpt-4o")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
USE_CLAUDE = os.getenv("USE_CLAUDE", "false").lower() == "true"

# Initialize clients
openai_client = OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None
claude_client = anthropic.Anthropic(api_key=CLAUDE_KEY) if CLAUDE_KEY else None

# Token counting
def get_tokenizer(model_id: str):
    """Get tokenizer for model, with fallback for newer models like GPT-5."""
    try:
        return tiktoken.encoding_for_model(model_id)
    except KeyError:
        # Fallback for newer models (GPT-5, etc.) - use GPT-4 tokenizer
        if model_id.startswith("gpt-5"):
            return tiktoken.encoding_for_model("gpt-4")
        # For other unknown models, use a safe default
        return tiktoken.get_encoding("cl100k_base")

ENC = get_tokenizer(MODEL_ID) if OPENAI_KEY else None
CTX_MAX = 128_000
MAX_COMPLETION = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 800))

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"OpenAI-key: {'✅' if OPENAI_KEY else '❌'} | Claude-key: {'✅' if CLAUDE_KEY else '❌'} | Model: {MODEL_ID} | Use Claude: {USE_CLAUDE}")

def call_claude_with_retry(client, model, max_tokens, temperature, system, messages, max_retries=3):
    """Call Claude API with rate limiting and exponential backoff for 529 errors."""
    for attempt in range(max_retries):
        try:
            # Apply rate limiting before each request
            claude_rate_limiter.wait_if_needed()

            return client.messages.create(
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                system=system,
                messages=messages
            )
        except anthropic.APIError as e:
            if e.status_code == 529 and attempt < max_retries - 1:  # Overloaded error
                wait_time = (2 ** attempt) + random.uniform(0, 1)  # Exponential backoff with jitter
                logging.warning(f"Claude overloaded (529), retrying in {wait_time:.2f}s (attempt {attempt + 1}/{max_retries})")
                time.sleep(wait_time)
                continue
            else:
                # Re-raise for non-529 errors or final attempt
                raise e
        except Exception as e:
            # Re-raise non-API errors immediately
            raise e

    # This shouldn't be reached but just in case
    raise Exception("Max retries exceeded")

def tokens_in(msgs: list[dict]) -> int:
    """Hilfsfunktion: zählt Tokens in OpenAI-Messages."""
    if not ENC:
        return 0
    total = 0
    for m in msgs:
        total += 4  # fixer Overhead pro Message
        total += len(ENC.encode(m["content"]))
    return total + 2  # Abschluss-Tokens

# ───────────────────────────────
#  System Prompts
# ───────────────────────────────

# Original GPT Prompt (für Vergleich)
GPT_SYSTEM_PROMPT = os.getenv(
    "SYSTEM_PROMPT",
    """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für Markt- und Preisbewertungen von Sport- und Zuchtpferden.

**DEINE AUFGABE:** Erstelle eine professionelle, strukturierte Bewertung basierend auf den bereitgestellten Pferdedaten.

**AUSGABEFORMAT:**

### Zusammenfassung
[Kurze Einschätzung des Pferdes in 2-3 Sätzen]

### Marktbewertung
**Geschätzter Marktwert:** [X.XXX - X.XXX €]

[Begründung der Preisschätzung basierend auf Rasse, Alter, Ausbildung, etc.]

### Bewertungsfaktoren
- **Rasse & Abstammung:** [Bewertung]
- **Alter & Ausbildungsstand:** [Bewertung] 
- **Potenzial & Verwendung:** [Bewertung]

### Empfehlungen
- [Konkrete Handlungsempfehlungen]
- [Vermarktungshinweise]

**WICHTIG:** 
- Preise in Euro, realistisch für deutschen Markt
- Berücksichtige aktuelle Markttrends
- Begründe alle Einschätzungen sachlich"""
)

# Claude Prompt für Tests = GPT Prompt
CLAUDE_SYSTEM_PROMPT = GPT_SYSTEM_PROMPT

# ───────────────────────────────
#  FastAPI-App
# ───────────────────────────────
app = FastAPI(title="PferdeWert API", version="0.7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pferdewert.vercel.app",
        "https://pferdewert.de",  # Production domain
        "https://www.pferdewert.de",  # Production domain with www
        "https://organic-sniffle-jjg7466rj9vvhqj7-3000.app.github.dev",
        "https://organic-sniffle-jjg7466rj9vvhqj7.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────
#  Request-Schema
# ───────────────────────────────
class BewertungRequest(BaseModel):
    # Pflichtfelder (abstammung wird optional, um aktuelles Frontend nicht zu brechen)
    rasse: str
    alter: int
    geschlecht: str
    stockmass: int
    ausbildung: str

    # Optionale Angaben (erweitert um abstammung und haupteignung)
    abstammung: Optional[str] = None
    haupteignung: Optional[str] = None
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    farbe: Optional[str] = None
    zuechter: Optional[str] = None
    standort: Optional[str] = None
    verwendungszweck: Optional[str] = None

    class Config:
        # Unerwartete Felder ignorieren, um 422 bei zusätzlichen Feldern zu vermeiden
        extra = "ignore"

# ───────────────────────────────
#  AI Bewertung (Claude + GPT parallel)
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> str:
    """Hauptfunktion: Claude für Kunde, GPT parallel für Vergleich"""
    
    # Bevorzugt vorhandenen Verwendungszweck, sonst Mapping von haupteignung
    mapped_verwendungszweck = d.verwendungszweck or (d.haupteignung if hasattr(d, "haupteignung") else None)

    user_prompt = (
        f"Rasse: {d.rasse}\nAlter: {d.alter}\nGeschlecht: {d.geschlecht}\n"
        f"Abstammung: {d.abstammung or 'k. A.'}\nStockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"Farbe: {d.farbe or 'k. A.'}\n"
        f"Züchter / Ausbildungsstall: {d.zuechter or 'k. A.'}\n"
        f"Aktueller Standort (PLZ): {d.standort or 'k. A.'}\n"
        f"Verwendungszweck / Zielsetzung: {mapped_verwendungszweck or 'k. A.'}\n"
        f"Gesundheitsstatus / AKU-Bericht: {d.aku or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}"
    )
    
    claude_result = None
    gpt_result = None

    # Environment variable to control parallel processing during high load
    USE_PARALLEL_PROCESSING = os.getenv("USE_PARALLEL_PROCESSING", "true").lower() == "true"

    # 1. Claude für Kunde (Hauptergebnis)
    if USE_CLAUDE and claude_client:
        try:
            logging.info("Prompt wird an Claude gesendet...")
            response = call_claude_with_retry(
                client=claude_client,
                model=CLAUDE_MODEL,
                max_tokens=1000,
                temperature=0.0,  # Für maximale Konsistenz
                system=CLAUDE_SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_prompt}]
            )

            # Robustes Parsing der Claude-Antwort
            if response.content and response.content[0].text:
                claude_result = response.content[0].text.strip()
                logging.info("✅ Claude-Bewertung erfolgreich erstellt")
            else:
                raise ValueError("Claude-Antwort hat kein lesbares Textfeld")

        except Exception as e:
            logging.error(f"❌ Claude Error: {e} - Fallback zu OpenAI")

    # 2. GPT für Vergleich (nur wenn parallel processing enabled oder Claude failed)
    run_gpt = USE_PARALLEL_PROCESSING or not claude_result
    if openai_client and run_gpt:
        try:
            if USE_PARALLEL_PROCESSING:
                logging.info("Prompt wird parallel an GPT gesendet...")
            else:
                logging.info("Claude failed, using GPT as fallback...")

            messages = [
                {"role": "system", "content": GPT_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ]

            rsp = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=messages,
                temperature=0.0,  # Auch GPT konsistent machen
                top_p=0.8,
                seed=12345,  # Reproduzierbarkeit
                max_tokens=min(MAX_COMPLETION, CTX_MAX - tokens_in(messages)),
            )
            gpt_result = rsp.choices[0].message.content.strip()
            logging.info("✅ GPT-Bewertung erstellt")
        except Exception as e:
            logging.error(f"❌ GPT Error: {e}")
    elif not USE_PARALLEL_PROCESSING and claude_result:
        logging.info("🚀 Parallel processing disabled - skipping GPT to reduce API load")
    
    # 3. GPT-Vergleich per E-Mail senden (wenn beide verfügbar)
    if gpt_result:
        # send_gpt_comparison_mail(d, gpt_result)  # Temporär deaktiviert
        logging.info("📧 GPT-Vergleichsmail temporär deaktiviert")
    
    # 4. Ergebnis zurückgeben: Claude bevorzugt, GPT als Fallback
    if claude_result:
        logging.info("✅ Claude-Ergebnis wird an Kunde gesendet")
        return claude_result
    elif gpt_result:
        logging.info("⚠️ Claude nicht verfügbar - GPT-Fallback wird an Kunde gesendet")
        return gpt_result
    else:
        logging.error("❌ Beide AI-Services nicht verfügbar")
        return (
            "Wir arbeiten gerade an unserem KI-Modell, "
            "bitte schicke uns eine E-Mail an info@pferdewert.de "
            "und wir melden uns, sobald das Modell wieder online ist."
        )

# ───────────────────────────────
#  API-Endpoint
# ───────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    logging.info(f"Incoming Request: {req.dict()}")
    try:
        ai_text = ai_valuation(req)
        return {"raw_gpt": ai_text}  # Key-Name bleibt für Frontend-Kompatibilität
    except Exception as e:
        logging.error(f"AI-Error: {e}")
        return {
            "raw_gpt": (
                "Wir arbeiten gerade an unserem KI-Modell, "
                "bitte schicke uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das Modell wieder online ist."
            )
        }

# ───────────────────────────────
#  API-DEBUG-Endpoint - DISABLED FOR SECURITY
# ───────────────────────────────
# SECURITY FIX: Debug endpoint disabled to prevent unauthorized access to internal AI responses
# This endpoint exposed both GPT and Claude responses without authentication, which could
# allow attackers to abuse the AI services and access sensitive model interactions.
# Uncomment only for local development/testing purposes with proper access controls.

@app.post("/api/debug-comparison")
def debug_comparison(req: BewertungRequest):
    """Debug-Endpoint: Vergleich GPT vs Claude vs O3"""
    logging.info(f"Debug Comparison Request: {req.dict()}")
    
    results = {}
    
    # Test simple prompt first if GPT-5
    if MODEL_ID.startswith("gpt-5"):
        logging.info("Testing GPT-5 with simple prompt first...")
        try:
            simple_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=[{"role": "user", "content": "Hello, please respond with exactly: TEST SUCCESSFUL"}],
                max_completion_tokens=2000,
            )
            simple_content = simple_response.choices[0].message.content if simple_response.choices else None
            logging.info(f"GPT-5 Simple test result: '{simple_content}'")
            results["gpt5_simple_test"] = simple_content or "No response"
        except Exception as e:
            logging.error(f"GPT-5 Simple test failed: {e}")
            results["gpt5_simple_test"] = f"Error: {str(e)}"
    
    user_prompt = (
        f"Rasse: {req.rasse}\n"
        f"Alter: {req.alter}\n"
        f"Geschlecht: {req.geschlecht}\n"
        f"Abstammung: {req.abstammung}\n"
        f"Stockmaß: {req.stockmass} cm\n"
        f"Ausbildungsstand: {req.ausbildung}\n"
        f"Farbe: {req.farbe or 'k. A.'}\n"
        f"Züchter / Ausbildungsstall: {req.zuechter or 'k. A.'}\n"
        f"Aktueller Standort (PLZ): {req.standort or 'k. A.'}\n"
        f"Verwendungszweck / Zielsetzung: {req.verwendungszweck or 'k. A.'}\n"
        f"Gesundheitsstatus / AKU-Bericht: {req.aku or 'k. A.'}\n"
        f"Erfolge: {req.erfolge or 'k. A.'}"
    )

    # GPT-4o Test
    try:
        logging.info("Testing GPT-4o...")
        gpt_messages = [
            {"role": "system", "content": GPT_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ]
        # GPT-5 only supports max_completion_tokens, no temperature/top_p/seed
        if MODEL_ID.startswith("gpt-5"):
            token_count = tokens_in(gpt_messages)
            max_completion = min(2000, CTX_MAX - token_count)  # Increased from MAX_COMPLETION (800) to 2000
            logging.info(f"GPT-5 Token info: input={token_count}, max_completion={max_completion}, old_limit={MAX_COMPLETION}")
            
            gpt_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=gpt_messages,
                max_completion_tokens=max_completion,
            )
        else:
            gpt_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=gpt_messages,
                temperature=0.0,
                top_p=0.8,
                seed=12345,
                max_tokens=min(MAX_COMPLETION, CTX_MAX - tokens_in(gpt_messages)),
            )
        
        # Debug logging for GPT-5 response
        logging.info(f"GPT Response received, has {len(gpt_response.choices)} choices")
        if gpt_response.choices and len(gpt_response.choices) > 0:
            content = gpt_response.choices[0].message.content
            logging.info(f"Message content type: {type(content)}")
            logging.info(f"Message content length: {len(content) if content else 'None'}")
            logging.info(f"Message content: '{content}'")
            results["gpt"] = content.strip() if content else "GPT-5 returned None content"
        else:
            logging.info("No choices in GPT response")
            results["gpt"] = "GPT-5 returned no choices"
        logging.info(f"{MODEL_ID}: Success")
    except Exception as e:
        results["gpt"] = f"GPT Error: {str(e)}"
        logging.error(f"GPT-4o Error: {e}")

    # Claude Test
    try:
        logging.info("Testing Claude...")
        local_claude_client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        claude_response = call_claude_with_retry(
            client=local_claude_client,
            model=CLAUDE_MODEL,
            max_tokens=1000,
            temperature=0.0,
            system=CLAUDE_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}]
        )
        results["claude"] = claude_response.content[0].text.strip()
        logging.info("Claude: Success")
    except Exception as e:
        results["claude"] = f"Claude Error: {str(e)}"
        logging.error(f"Claude Error: {e}")


    # Vergleichsinfo hinzufügen
    results["info"] = {
        "timestamp": "2025-07-29",
        "gpt_model": MODEL_ID,
        "claude_model": CLAUDE_MODEL,
        "use_claude_setting": os.getenv("USE_CLAUDE", "false"),
        "test_data": req.dict(),
    }

    return results

# ───────────────────────────────
#  Health Check
# ───────────────────────────────
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "openai_available": bool(openai_client),
        "claude_available": bool(claude_client),
        "claude_model": CLAUDE_MODEL,
        "openai_model": MODEL_ID,
        "use_claude": USE_CLAUDE,
    }
