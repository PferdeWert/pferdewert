# main.py – PferdeWert API mit OpenRouter Integration + Fallback System
import os
import logging
import json
import re
from typing import Optional, Dict, Any

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import random
import uuid

import tiktoken  # Token-Zähler

# OpenRouter Integration
from ai_clients.ai_service import AIService, AIServiceResponse

# ───────────────────────────────
#  Konfiguration
# ───────────────────────────────
load_dotenv()

# Initialize OpenRouter AIService
ai_service = None
try:
    ai_service = AIService()
    logging.info("✅ OpenRouter AIService initialized successfully")
except Exception as e:
    logging.error(f"❌ Failed to initialize OpenRouter AIService: {e}")
    logging.warning("🔄 Will use legacy clients only")


# Logging Settings
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
AI_DEBUG = os.getenv("AI_DEBUG", "false").lower() == "true"

logging.basicConfig(level=getattr(logging, LOG_LEVEL), format="%(levelname)s: %(message)s")

# Configure library logging
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.info("🚀 PferdeWert API started with OpenRouter AI integration")


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
    allow_origin_regex=r"https://pferdewert-git-.*-pferdewerts-projects\.vercel\.app",  # Vercel Preview Deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID middleware for better log correlation
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    req_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())[:8]
    request.state.request_id = req_id
    logging.info(f"[{req_id}] ⇢ {request.method} {request.url.path}")
    try:
        response = await call_next(request)
    except Exception as e:
        logging.exception(f"[{req_id}] ✖ Unhandled error: {e}")
        raise
    response.headers["X-Request-ID"] = req_id
    logging.info(f"[{req_id}] ⇠ {request.method} {request.url.path} → {response.status_code}")
    return response

# Centralized validation error logging with helpful hints
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    req_id = getattr(request.state, "request_id", "-")
    try:
        raw_body = await request.body()
        body_text = raw_body.decode("utf-8", errors="ignore")
        if len(body_text) > 2000:
            body_text = body_text[:2000] + "...(truncated)"
    except Exception:
        body_text = "<unavailable>"

    errors = exc.errors()
    unknown_fields = []
    missing_fields = []
    other_errors = []
    for e in errors:
        loc = e.get("loc", [])
        msg = e.get("msg", "")
        etype = e.get("type", "")
        path = ".".join(map(str, loc))
        if etype.endswith("extra"):
            field = str(loc[1]) if len(loc) > 1 else path
            unknown_fields.append(field)
        elif msg == "field required" or etype == "value_error.missing":
            field = str(loc[1]) if len(loc) > 1 else path
            missing_fields.append(field)
        else:
            other_errors.append({"loc": path, "msg": msg, "type": etype})

    logging.warning(
        f"[{req_id}] 422 Validation at {request.url.path} | "
        f"missing={missing_fields} unknown={unknown_fields} other={other_errors} | body={body_text}"
    )

    return JSONResponse(
        status_code=422,
        content={
            "detail": errors,
            "hint": {
                "missing_fields": missing_fields,
                "unknown_fields": unknown_fields,
                "request_id": req_id,
            },
        },
    )

# ───────────────────────────────
#  Request-Schema
# ───────────────────────────────
class BewertungRequest(BaseModel):
    # Pflichtfelder
    rasse: str
    alter: int
    geschlecht: str
    stockmass: int
    ausbildung: str

    # Optionale Angaben (aktuell verwendet im Frontend)
    abstammung: Optional[str] = None
    haupteignung: Optional[str] = None  # Ersetzt verwendungszweck
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    standort: Optional[str] = None
    charakter: Optional[str] = None  # NEU: Frontend-Feld
    besonderheiten: Optional[str] = None  # NEU: Frontend-Feld
    land: Optional[str] = None  # AT-Rollout: Country field (DE, AT, etc.)

    # Marketing-/Quelle-Felder: akzeptieren, aber NICHT im Prompt verwenden
    quelle: Optional[str] = None
    attribution_source: Optional[str] = None

    # Legacy Support (falls alte Daten gesendet werden)
    verwendungszweck: Optional[str] = None
    # Payment tracking field (not used in AI prompt)
    payment_id: Optional[str] = None

    # DEPRECATED: Felder werden für Legacy-Support akzeptiert, aber nicht verwendet
    farbe: Optional[str] = None  # OBSOLET
    zuechter: Optional[str] = None  # OBSOLET

    class Config:
        # Unbekannte Felder verbieten → striktes Schema
        extra = "forbid"

# ───────────────────────────────
#  AI Bewertung (OpenRouter + Legacy Fallback)
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> dict:
    """
    Hauptfunktion: OpenRouter 2-Stage Fallback System
    Stage 1: OpenRouter (PRIMARY_MODEL)
    Stage 2: OpenRouter (FALLBACK_MODEL)
    """
    req_id = getattr(d, '_request_id', str(uuid.uuid4())[:8])

    # Build horse data dictionary for OpenRouter service
    horse_data = {
        "rasse": d.rasse,
        "alter": d.alter,
        "geschlecht": d.geschlecht,
        "abstammung": d.abstammung,
        "stockmass": d.stockmass,
        "ausbildung": d.ausbildung,
        "haupteignung": d.haupteignung,
        "standort": d.standort,
        "aku": d.aku,
        "erfolge": d.erfolge,
        "charakter": d.charakter,
        "besonderheiten": d.besonderheiten,
        "land": d.land  # AT-Rollout: Country for market-specific valuation
    }

    # Try OpenRouter 2-Stage Fallback System
    if ai_service:
        try:
            logging.info(f"[{req_id}] 🚀 Starting OpenRouter 2-Stage Fallback System...")
            ai_response = ai_service.generate_valuation(horse_data)

            logging.info(f"[{req_id}] ✅ OpenRouter success: {ai_response.model} (tier: {ai_response.tier})")
            return {
                "bewertung": ai_response.content,
                "model": ai_response.model.lower(),
                "model_version": ai_response.model_version,
                "tier": ai_response.tier,
                "usage": ai_response.usage
            }

        except Exception as e:
            logging.error(f"[{req_id}] ❌ OpenRouter system failed: {e}")
    else:
        logging.warning(f"[{req_id}] ⚠️ OpenRouter not available")

    # Fallback response when OpenRouter is not available
    logging.error(f"[{req_id}] ❌ OpenRouter AI service not available")
    fallback_msg = (
        "Wir arbeiten gerade an unserem KI-Modell, "
        "bitte schicke uns eine E-Mail an info@pferdewert.de "
        "und wir melden uns, sobald das Modell wieder online ist."
    )
    return {
        "bewertung": fallback_msg,
        "model": "fallback",
        "model_version": "none",
        "tier": "fallback"
    }

# ───────────────────────────────
#  API-Endpoint
# ───────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    req_id = str(uuid.uuid4())[:8]
    req._request_id = req_id  # Add request ID for tracking

    logging.info(f"[{req_id}] 📝 Incoming Request: {req.dict()}")
    try:
        ai_result = ai_valuation(req)

        # Build clean response following frontend schema leadership
        response = {
            # PRIMARY FIELDS: Frontend-schema als Standard
            "ai_response": ai_result["bewertung"],
            "ai_model": ai_result["model"],

            # METADATA: Tracking und Analytics
            "model_version": ai_result["model_version"],
            "tier": ai_result.get("tier", "unknown"),
            "usage": ai_result.get("usage"),
            "request_id": req_id
        }

        logging.info(f"[{req_id}] ✅ Response delivered: {ai_result['model']} (tier: {ai_result.get('tier', 'unknown')})")
        return response
    except Exception as e:
        logging.error(f"[{req_id}] ❌ AI-Error: {e}")

        # Fehler-Response: Frontend-Schema als Standard
        error_response = {
            # PRIMARY FIELDS: Frontend-schema als Standard
            "ai_response": (
                "Wir arbeiten gerade an unserem KI-Modell, "
                "bitte schicke uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das Modell wieder online ist."
            ),
            "ai_model": "error",

            # METADATA: Tracking und Analytics
            "model_version": "none",
            "tier": "fallback",
            "usage": None,
            "request_id": req_id
        }

        return error_response

# ───────────────────────────────
#  API-DEBUG-Endpoint - DISABLED FOR SECURITY
# ───────────────────────────────
# SECURITY FIX: Debug endpoint disabled to prevent unauthorized access to internal AI responses
# This endpoint exposed both GPT and Claude responses without authentication, which could
# allow attackers to abuse the AI services and access sensitive model interactions.
# Uncomment only for local development/testing purposes with proper access controls.


# ───────────────────────────────
#  Zertifikat System Prompt (für Verkäufer-Wertgutachten)
# ───────────────────────────────
ZERTIFIKAT_SYSTEM_PROMPT = """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für professionelle Verkaufs-Wertgutachten von Sport- und Zuchtpferden.

**DEINE AUFGABE:** Erstelle ein strukturiertes Verkaufs-Wertgutachten im JSON-Format.

**AUSGABE:** Antworte NUR mit einem validen JSON-Objekt ohne zusätzlichen Text. Kein Markdown, keine Erklärungen.

Das JSON muss folgende Struktur haben:
{
  "preisVon": <untere Preisgrenze als Integer>,
  "preisBis": <obere Preisgrenze als Integer>,
  "haupteignung": "<Haupteignung des Pferdes>",
  "bewertungsDetails": {
    "rasseText": "<2-3 Sätze zur Rasse und deren Marktwert>",
    "abstammungText": "<2-3 Sätze zur Abstammung und deren Einfluss auf den Wert>",
    "ausbildungText": "<2-3 Sätze zum Ausbildungsstand und dessen Werteinfluss>",
    "gesundheitText": "<2-3 Sätze zum AKU-Status und Gesundheitsbewertung>",
    "fazit": "<3-4 Sätze zusammenfassendes Fazit mit Verkaufsempfehlung>"
  }
}

**WICHTIGE REGELN:**
- Preise in Euro als INTEGER (z.B. 25000, nicht "25.000" oder "25000€")
- Realistische Preise für den deutschen/österreichischen Markt
- Bei fehlendem AKU: Annahme "ohne besondere Befunde", aber Hinweis im gesundheitText
- Bei fehlender Abstammung: Generische Bewertung basierend auf Rasse
- Texte sollen professionell und verkaufsfördernd klingen
- KEINE Markdown-Formatierung in den Texten"""


def parse_zertifikat_json(ai_response: str) -> Optional[Dict[str, Any]]:
    """Parse AI response to extract JSON zertifikat data"""
    try:
        # Try direct JSON parse first
        return json.loads(ai_response)
    except json.JSONDecodeError:
        pass

    # Try to extract JSON from markdown code blocks
    json_match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', ai_response)
    if json_match:
        try:
            return json.loads(json_match.group(1))
        except json.JSONDecodeError:
            pass

    # Try to find JSON object in response
    json_match = re.search(r'\{[\s\S]*\}', ai_response)
    if json_match:
        try:
            return json.loads(json_match.group(0))
        except json.JSONDecodeError:
            pass

    return None


def generate_zertifikat_valuation(horse_data: Dict[str, Any]) -> Dict[str, Any]:
    """Generate structured zertifikat data using AI"""
    req_id = str(uuid.uuid4())[:8]

    # Build user prompt
    prompt_parts = [
        f"Erstelle ein Verkaufs-Wertgutachten für folgendes Pferd:",
        f"",
        f"Rasse: {horse_data.get('rasse', 'k. A.')}",
        f"Alter: {horse_data.get('alter', 'k. A.')} Jahre",
        f"Geschlecht: {horse_data.get('geschlecht', 'k. A.')}",
        f"Abstammung: {horse_data.get('abstammung') or 'nicht angegeben'}",
        f"Stockmaß: {horse_data.get('stockmass', 'k. A.')} cm",
        f"Ausbildungsstand: {horse_data.get('ausbildung', 'k. A.')}",
        f"Haupteignung: {horse_data.get('haupteignung') or 'nicht angegeben'}",
        f"AKU-Status: {horse_data.get('aku') or 'nicht angegeben'}",
        f"Erfolge: {horse_data.get('erfolge') or 'keine angegeben'}",
        f"Standort: {horse_data.get('standort') or 'Deutschland'}",
    ]

    if horse_data.get('charakter'):
        prompt_parts.append(f"Charakter: {horse_data['charakter']}")
    if horse_data.get('besonderheiten'):
        prompt_parts.append(f"Besonderheiten: {horse_data['besonderheiten']}")
    if horse_data.get('land'):
        prompt_parts.append(f"Land: {horse_data['land']}")

    user_prompt = "\n".join(prompt_parts)

    messages = [
        {"role": "system", "content": ZERTIFIKAT_SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt}
    ]

    if not ai_service or not ai_service.openrouter_client:
        logging.error(f"[{req_id}] ❌ OpenRouter not available for zertifikat")
        return {"error": "AI service not available"}

    # Get fallback models
    fallback_models = ai_service.model_manager.get_fallback_models()

    for i, model_config in enumerate(fallback_models, 1):
        try:
            stage_name = "Primary" if i == 1 else "Fallback"
            logging.info(f"[{req_id}] Zertifikat Stage {i} ({stage_name}): Trying {model_config.name}")

            response = ai_service.openrouter_client.create_completion(
                model=model_config.openrouter_id,
                messages=messages,
                max_tokens=model_config.max_tokens,
                temperature=0.7,  # Slightly lower for more consistent JSON output
                top_p=model_config.top_p,
                stream=False
            )

            # Parse the JSON response
            zertifikat_data = parse_zertifikat_json(response.content)

            if zertifikat_data and "preisVon" in zertifikat_data and "preisBis" in zertifikat_data:
                logging.info(f"[{req_id}] ✅ Zertifikat Stage {i} successful: {model_config.name}")
                return {
                    "zertifikat_data": zertifikat_data,
                    "ai_model": model_config.name,
                    "model_version": model_config.openrouter_id
                }
            else:
                logging.warning(f"[{req_id}] ⚠️ Stage {i} returned invalid JSON structure")
                logging.debug(f"[{req_id}] Raw response: {response.content[:500]}")
                continue

        except Exception as e:
            logging.error(f"[{req_id}] ❌ Zertifikat Stage {i} error: {e}")
            continue

    logging.error(f"[{req_id}] ❌ All zertifikat stages failed")
    return {"error": "Failed to generate zertifikat"}


# ───────────────────────────────
#  API-Endpoint: Zertifikat (Verkäufer-Wertgutachten)
# ───────────────────────────────
@app.post("/api/zertifikat")
def zertifikat(req: BewertungRequest):
    """
    Generate structured Verkäufer-Wertgutachten (Zertifikat)
    Returns JSON with preisVon, preisBis, haupteignung, and bewertungsDetails
    """
    req_id = str(uuid.uuid4())[:8]

    logging.info(f"[{req_id}] 📜 Zertifikat Request: {req.dict()}")

    horse_data = {
        "rasse": req.rasse,
        "alter": req.alter,
        "geschlecht": req.geschlecht,
        "abstammung": req.abstammung,
        "stockmass": req.stockmass,
        "ausbildung": req.ausbildung,
        "haupteignung": req.haupteignung,
        "standort": req.standort,
        "aku": req.aku,
        "erfolge": req.erfolge,
        "charakter": req.charakter,
        "besonderheiten": req.besonderheiten,
        "land": req.land
    }

    result = generate_zertifikat_valuation(horse_data)

    if "error" in result:
        logging.error(f"[{req_id}] ❌ Zertifikat generation failed: {result['error']}")
        return {
            "error": result["error"],
            "ai_model": "error",
            "model_version": "none"
        }

    logging.info(f"[{req_id}] ✅ Zertifikat generated successfully")
    return result


# ───────────────────────────────
#  Health Check
# ───────────────────────────────
@app.get("/health")
def health_check():
    """Enhanced health check including OpenRouter integration status"""

    # Get OpenRouter AI service health
    ai_health = {}
    if ai_service:
        try:
            ai_health = ai_service.health_check()
        except Exception as e:
            logging.error(f"AI Service health check failed: {e}")
            ai_health = {"status": "error", "error": str(e)}

    # Build comprehensive health response
    health_status = {
        # OPENROUTER INTEGRATION STATUS
        "status": "ok",
        "openrouter": {
            "enabled": bool(ai_service),
            "status": ai_health.get("status", "unknown"),
            "services": ai_health.get("services", {}),
            "models": ai_health.get("models", {})
        },

        # SYSTEM OVERVIEW
        "ai_system": {
            "primary_ai": "openrouter" if ai_service else "none",
            "total_ai_services": 1 if ai_service else 0
        }
    }

    # Determine overall health status
    if ai_service and ai_health.get("status") == "healthy":
        health_status["status"] = "healthy"
    else:
        health_status["status"] = "critical"  # No AI services available

    return health_status
