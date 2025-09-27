"""
AI Service with 4-Stage Fallback System for PferdeWert
Implements: Gemini 2.5 Pro → GPT-4o → Claude → Legacy Clients
"""

import os
import logging
import time
from typing import Dict, Any, Optional, List
from dataclasses import dataclass

from .openrouter_client import OpenRouterClient, OpenRouterError, ModelResponse
from config.models import ModelManager, ModelConfig, ModelTier

# Legacy client imports (for fallback)
import openai
import anthropic
import httpx

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
    Main AI service implementing 4-stage fallback system
    Integrates OpenRouter with legacy clients for maximum reliability
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

        # Initialize legacy clients (fallback)
        self.legacy_openai_client = None
        self.legacy_claude_client = None
        self._initialize_legacy_clients()

        # Get system prompts
        self.system_prompt = self._get_system_prompt()

        logging.info(f"AIService initialized - OpenRouter: {'✅' if self.openrouter_client else '❌'}")

    def _initialize_legacy_clients(self):
        """Initialize legacy AI clients for fallback"""
        # OpenAI legacy client
        if os.getenv("OPENAI_API_KEY"):
            try:
                self.legacy_openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
                logging.info("✅ Legacy OpenAI client initialized")
            except Exception as e:
                logging.error(f"❌ Failed to initialize legacy OpenAI client: {e}")

        # Claude legacy client
        if os.getenv("ANTHROPIC_API_KEY"):
            try:
                self.legacy_claude_client = anthropic.Anthropic(
                    api_key=os.getenv("ANTHROPIC_API_KEY"),
                    max_retries=0,  # We handle retries manually
                    http_client=httpx.Client(event_hooks={"request": [], "response": []})
                )
                logging.info("✅ Legacy Claude client initialized")
            except Exception as e:
                logging.error(f"❌ Failed to initialize legacy Claude client: {e}")

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
        Main method: Generate horse valuation using 4-stage fallback
        Stage 1: Gemini 2.5 Pro (OpenRouter)
        Stage 2: GPT-4o (OpenRouter)
        Stage 3: Claude (OpenRouter)
        Stage 4: Legacy clients
        """
        user_prompt = self._build_user_prompt(horse_data)
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        # Try OpenRouter models first (Stages 1-3)
        if self.openrouter_client:
            fallback_models = self.model_manager.get_fallback_models()

            for i, model_config in enumerate(fallback_models, 1):
                try:
                    logging.info(f"Stage {i}: Trying {model_config.name} via OpenRouter...")

                    response = self.openrouter_client.create_completion(
                        model=model_config.openrouter_id,
                        messages=messages,
                        max_tokens=model_config.max_tokens,
                        temperature=model_config.temperature,
                        top_p=model_config.top_p
                    )

                    logging.info(f"✅ Stage {i} successful: {model_config.name}")
                    return AIServiceResponse(
                        content=response.content,
                        model=model_config.name,
                        model_version=model_config.openrouter_id,
                        tier=model_config.tier.value,
                        usage=response.usage
                    )

                except OpenRouterError as e:
                    logging.warning(f"❌ Stage {i} failed ({model_config.name}): {e}")
                    continue
                except Exception as e:
                    logging.error(f"❌ Stage {i} unexpected error ({model_config.name}): {e}")
                    continue

        # Stage 4: Legacy clients fallback
        logging.warning("🔄 All OpenRouter models failed, falling back to legacy clients...")

        # Try legacy GPT-4o first
        if self.legacy_openai_client:
            try:
                logging.info("Stage 4a: Trying legacy GPT-4o...")
                response = self.legacy_openai_client.chat.completions.create(
                    model=os.getenv("PW_MODEL", "gpt-4o"),
                    messages=messages,
                    temperature=0.3,
                    top_p=0.8,
                    max_tokens=4000
                )

                content = response.choices[0].message.content.strip()
                logging.info("✅ Stage 4a successful: Legacy GPT-4o")
                return AIServiceResponse(
                    content=content,
                    model="GPT-4o",
                    model_version=os.getenv("PW_MODEL", "gpt-4o"),
                    tier="fallback"
                )

            except Exception as e:
                logging.error(f"❌ Stage 4a failed (Legacy GPT): {e}")

        # Try legacy Claude
        if self.legacy_claude_client:
            try:
                logging.info("Stage 4b: Trying legacy Claude...")
                response = self._call_claude_with_retry(
                    client=self.legacy_claude_client,
                    model=os.getenv("CLAUDE_MODEL", "claude-opus-4-1-20250805"),
                    messages=[{"role": "user", "content": user_prompt}],
                    system=self.system_prompt,
                    max_tokens=3000,
                    temperature=0.3
                )

                content = response.content[0].text.strip()
                logging.info("✅ Stage 4b successful: Legacy Claude")
                return AIServiceResponse(
                    content=content,
                    model="Claude",
                    model_version=os.getenv("CLAUDE_MODEL", "claude-opus-4-1-20250805"),
                    tier="fallback"
                )

            except Exception as e:
                logging.error(f"❌ Stage 4b failed (Legacy Claude): {e}")

        # Ultimate fallback message
        logging.error("❌ All AI services failed - returning fallback message")
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

    def _call_claude_with_retry(self, client, model, messages, system, max_tokens, temperature, max_retries=3):
        """Legacy Claude retry logic (from main.py)"""
        import random
        import time

        for attempt in range(max_retries):
            try:
                return client.messages.create(
                    model=model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system,
                    messages=messages
                )
            except anthropic.APIError as e:
                if e.status_code in [529, 503] and attempt < max_retries - 1:
                    wait_time = (3 ** attempt) + random.uniform(0, 2)
                    if attempt == 0:
                        logging.warning(f"Claude overloaded ({e.status_code}), retrying with backoff")
                    time.sleep(wait_time)
                    continue
                else:
                    logging.error(f"Claude API error: {e.status_code}")
                    raise e
            except Exception as e:
                logging.error(f"Unexpected error calling Claude: {type(e).__name__}")
                raise e

        raise Exception("Max retries exceeded")

    def health_check(self) -> Dict[str, Any]:
        """Health check for all AI services"""
        health = {
            "status": "healthy",
            "services": {
                "openrouter": False,
                "legacy_openai": bool(self.legacy_openai_client),
                "legacy_claude": bool(self.legacy_claude_client)
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

        # Overall health status
        healthy_services = sum(1 for v in health["services"].values() if v)
        if healthy_services == 0:
            health["status"] = "critical"
        elif healthy_services < 2:
            health["status"] = "degraded"

        return health