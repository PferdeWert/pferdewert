# main.py – PferdeWert API mit OpenRouter Integration + Fallback System
import os
import logging
from typing import Optional

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
        "besonderheiten": d.besonderheiten
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
