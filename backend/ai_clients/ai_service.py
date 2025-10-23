"""
AI Service with 2-Stage Fallback System for PferdeWert
Implements: PRIMARY_MODEL → FALLBACK_MODEL (both via OpenRouter)
"""

import os
import logging
from typing import Dict, Any, Optional
from dataclasses import dataclass

from .openrouter_client import OpenRouterClient, OpenRouterError, ModelResponse
from config.models import ModelManager, ModelConfig

@dataclass
class AIServiceResponse:
    """Standardized response from AI Service"""
    content: str
    model: str
    model_version: str
    tier: str
    usage: Optional[Dict[str, Any]] = None

class AIService:
    """
    Main AI service implementing 2-stage fallback system
    Uses only OpenRouter for both primary and fallback models
    """

    def __init__(self):
        # Initialize OpenRouter client
        self.openrouter_client = None
        try:
            if os.getenv("OPENROUTER_API_KEY"):
                self.openrouter_client = OpenRouterClient()
                logging.info("✅ OpenRouter client initialized")
            else:
                logging.warning("⚠️ OPENROUTER_API_KEY not found - OpenRouter unavailable")
        except Exception as e:
            logging.error(f"❌ Failed to initialize OpenRouter client: {e}")

        # Initialize model manager
        self.model_manager = ModelManager()

        # Get system prompts
        self.system_prompt = self._get_system_prompt()

        logging.info(f"AIService initialized - OpenRouter: {'✅' if self.openrouter_client else '❌'}")

    def _get_system_prompt(self) -> str:
        """Get system prompt for horse valuation"""
        return os.getenv(
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

    def generate_valuation(self, horse_data: Dict[str, Any]) -> AIServiceResponse:
        """
        Main method: Generate horse valuation using 2-stage fallback
        Stage 1: PRIMARY_MODEL (via OpenRouter)
        Stage 2: FALLBACK_MODEL (via OpenRouter)
        """
        user_prompt = self._build_user_prompt(horse_data)
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        # Check if OpenRouter is available
        if not self.openrouter_client:
            logging.error("❌ OpenRouter client not available - returning fallback message")
            return self._get_fallback_response()

        # Get fallback models (primary + fallback)
        fallback_models = self.model_manager.get_fallback_models()

        for i, model_config in enumerate(fallback_models, 1):
            try:
                stage_name = "Primary" if i == 1 else "Fallback"
                logging.info(f"Stage {i} ({stage_name}): Trying {model_config.name} via OpenRouter...")

                response = self.openrouter_client.create_completion(
                    model=model_config.openrouter_id,
                    messages=messages,
                    max_tokens=model_config.max_tokens,
                    temperature=model_config.temperature,
                    top_p=model_config.top_p,
                    stream=False  # Explicitly disable streaming to prevent OpenRouter auto-enabling
                )

                logging.info(f"✅ Stage {i} successful: {model_config.name}")

                return AIServiceResponse(
                    content=response.content,
                    model=model_config.name,
                    model_version=model_config.openrouter_id,
                    tier="openrouter",
                    usage=response.usage
                )

            except OpenRouterError as e:
                logging.warning(f"❌ Stage {i} failed ({model_config.name}): {e}")
                continue
            except Exception as e:
                logging.error(f"❌ Stage {i} unexpected error ({model_config.name}): {e}")
                continue

        # All models failed
        logging.error("❌ All AI models failed - returning fallback message")
        return self._get_fallback_response()

    def _get_fallback_response(self) -> AIServiceResponse:
        """Return standardized fallback response when all AI services fail"""
        return AIServiceResponse(
            content=(
                "Wir arbeiten gerade an unserem KI-Modell, "
                "bitte schicke uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das Modell wieder online ist."
            ),
            model="Fallback",
            model_version="none",
            tier="fallback"
        )

    def _build_user_prompt(self, horse_data: Dict[str, Any]) -> str:
        """Build user prompt from horse data (following existing pattern)"""
        prompt_parts = [
            f"Rasse: {horse_data.get('rasse', 'k. A.')}",
            f"Alter: {horse_data.get('alter', 'k. A.')}",
            f"Geschlecht: {horse_data.get('geschlecht', 'k. A.')}",
            f"Abstammung: {horse_data.get('abstammung') or 'k. A.'}",
            f"Stockmaß: {horse_data.get('stockmass', 'k. A.')} cm",
            f"Ausbildungsstand: {horse_data.get('ausbildung', 'k. A.')}",
            f"Haupteignung / Disziplin: {horse_data.get('haupteignung') or 'k. A.'}",
            f"Aktueller Standort (PLZ): {horse_data.get('standort') or 'k. A.'}",
            f"Gesundheitsstatus / AKU-Bericht: {horse_data.get('aku') or 'k. A.'}",
            f"Erfolge: {horse_data.get('erfolge') or 'k. A.'}"
        ]

        # Add optional fields
        if horse_data.get('charakter'):
            prompt_parts.append(f"Charakter & Rittigkeit: {horse_data['charakter']}")
        if horse_data.get('besonderheiten'):
            prompt_parts.append(f"Besonderheiten: {horse_data['besonderheiten']}")

        return "\n".join(prompt_parts)

    def health_check(self) -> Dict[str, Any]:
        """Health check for AI service (OpenRouter only)"""
        health = {
            "status": "healthy",
            "services": {
                "openrouter": False
            },
            "models": self.model_manager.get_model_stats()
        }

        # Check OpenRouter health
        if self.openrouter_client:
            try:
                or_health = self.openrouter_client.health_check()
                health["services"]["openrouter"] = or_health["status"] == "healthy"
                health["openrouter_details"] = or_health
            except Exception as e:
                logging.error(f"OpenRouter health check failed: {e}")
                health["services"]["openrouter"] = False

        # Overall health status - only based on OpenRouter
        if not health["services"]["openrouter"]:
            health["status"] = "critical"

        return health