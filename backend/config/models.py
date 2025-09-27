"""
Model Configuration Management for PferdeWert OpenRouter Integration
Defines the 4-stage fallback system and model settings
"""

import os
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from enum import Enum

class ModelTier(Enum):
    """Model performance tiers"""
    PRIMARY = "primary"     # Gemini 2.5 Pro
    SECONDARY = "secondary" # GPT-4o
    TERTIARY = "tertiary"   # Claude
    FALLBACK = "fallback"   # Legacy clients

@dataclass
class ModelConfig:
    """Configuration for a specific AI model"""
    name: str
    openrouter_id: str
    tier: ModelTier
    max_tokens: int
    temperature: float
    top_p: float
    enabled: bool = True
    cost_per_1k_tokens: float = 0.0
    context_window: int = 128000
    description: str = ""

class ModelManager:
    """
    Manages model configurations and fallback strategy
    Implements 4-stage fallback: Gemini 2.5 Pro → GPT-4o → Claude → Legacy
    """

    def __init__(self):
        self.models = self._initialize_models()
        self.fallback_order = self._get_fallback_order()
        logging.info(f"ModelManager initialized with {len(self.models)} models")

    def _initialize_models(self) -> Dict[str, ModelConfig]:
        """Initialize all model configurations"""
        models = {
            # PRIMARY: Gemini 2.5 Pro (best performance for horse valuations)
            "gemini-2.5-pro": ModelConfig(
                name="Gemini 2.5 Pro",
                openrouter_id="google/gemini-2.5-pro",
                tier=ModelTier.PRIMARY,
                max_tokens=4000,
                temperature=0.3,
                top_p=0.8,
                enabled=self._is_model_enabled("GEMINI_ENABLED", True),
                cost_per_1k_tokens=2.5,  # Estimated cost
                context_window=128000,
                description="Primary model for horse valuations - excellent reasoning and structured output"
            ),

            # SECONDARY: GPT-4o (reliable fallback)
            "gpt-4o": ModelConfig(
                name="GPT-4o",
                openrouter_id="openai/gpt-4o",
                tier=ModelTier.SECONDARY,
                max_tokens=4000,
                temperature=0.3,
                top_p=0.8,
                enabled=self._is_model_enabled("GPT4O_ENABLED", True),
                cost_per_1k_tokens=2.5,
                context_window=128000,
                description="Secondary model - proven performance for horse valuations"
            ),

            # TERTIARY: Claude (specialized expertise)
            "claude-opus": ModelConfig(
                name="Claude Opus",
                openrouter_id="anthropic/claude-opus-4-1-20250805",
                tier=ModelTier.TERTIARY,
                max_tokens=4000,
                temperature=0.3,
                top_p=0.8,
                enabled=self._is_model_enabled("CLAUDE_ENABLED", True),
                cost_per_1k_tokens=15.0,  # Higher cost, use as backup
                context_window=128000,
                description="Tertiary model - specialized reasoning for complex cases"
            ),

            # Additional models for testing/backup
            "gpt-4o-mini": ModelConfig(
                name="GPT-4o Mini",
                openrouter_id="openai/gpt-4o-mini",
                tier=ModelTier.SECONDARY,
                max_tokens=4000,
                temperature=0.3,
                top_p=0.8,
                enabled=self._is_model_enabled("GPT4O_MINI_ENABLED", False),
                cost_per_1k_tokens=0.15,
                context_window=128000,
                description="Cost-effective backup for GPT-4o"
            ),

            "claude-haiku": ModelConfig(
                name="Claude Haiku",
                openrouter_id="anthropic/claude-3-haiku",
                tier=ModelTier.TERTIARY,
                max_tokens=4000,
                temperature=0.3,
                top_p=0.8,
                enabled=self._is_model_enabled("CLAUDE_HAIKU_ENABLED", False),
                cost_per_1k_tokens=0.25,
                context_window=128000,
                description="Fast Claude model for simple valuations"
            ),
        }

        # Override model settings from environment variables
        self._apply_environment_overrides(models)
        return models

    def _is_model_enabled(self, env_var: str, default: bool) -> bool:
        """Check if model is enabled via environment variable"""
        return os.getenv(env_var, str(default)).lower() == "true"

    def _apply_environment_overrides(self, models: Dict[str, ModelConfig]) -> None:
        """Apply environment variable overrides to model configurations"""
        for model_key, config in models.items():
            env_prefix = model_key.upper().replace("-", "_").replace(".", "_")

            # Override max_tokens
            max_tokens_var = f"{env_prefix}_MAX_TOKENS"
            if os.getenv(max_tokens_var):
                try:
                    config.max_tokens = int(os.getenv(max_tokens_var))
                    logging.info(f"Override {model_key} max_tokens: {config.max_tokens}")
                except ValueError:
                    logging.warning(f"Invalid {max_tokens_var} value, using default")

            # Override temperature
            temp_var = f"{env_prefix}_TEMPERATURE"
            if os.getenv(temp_var):
                try:
                    config.temperature = float(os.getenv(temp_var))
                    logging.info(f"Override {model_key} temperature: {config.temperature}")
                except ValueError:
                    logging.warning(f"Invalid {temp_var} value, using default")

    def _get_fallback_order(self) -> List[str]:
        """Define the 4-stage fallback order"""
        # Base fallback order following the PRD
        base_order = [
            "gemini-2.5-pro",  # PRIMARY
            "gpt-4o",          # SECONDARY
            "claude-opus",     # TERTIARY
            # FALLBACK handled separately (legacy clients)
        ]

        # Filter out disabled models
        enabled_order = [
            model_key for model_key in base_order
            if model_key in self.models and self.models[model_key].enabled
        ]

        # Add backup models if main models are disabled
        backup_models = ["gpt-4o-mini", "claude-haiku"]
        for backup in backup_models:
            if backup in self.models and self.models[backup].enabled and backup not in enabled_order:
                enabled_order.append(backup)

        logging.info(f"Fallback order: {' → '.join(enabled_order)} → Legacy")
        return enabled_order

    def get_primary_model(self) -> Optional[ModelConfig]:
        """Get the primary model configuration"""
        if self.fallback_order:
            return self.models.get(self.fallback_order[0])
        return None

    def get_fallback_models(self) -> List[ModelConfig]:
        """Get all models in fallback order"""
        return [self.models[key] for key in self.fallback_order if key in self.models]

    def get_model_config(self, model_key: str) -> Optional[ModelConfig]:
        """Get configuration for a specific model"""
        return self.models.get(model_key)

    def get_enabled_models(self) -> Dict[str, ModelConfig]:
        """Get all enabled models"""
        return {k: v for k, v in self.models.items() if v.enabled}

    def is_model_available(self, model_key: str) -> bool:
        """Check if a model is available and enabled"""
        model = self.models.get(model_key)
        return model is not None and model.enabled

    def get_model_stats(self) -> Dict[str, Any]:
        """Get statistics about model configuration"""
        enabled_models = self.get_enabled_models()
        return {
            "total_models": len(self.models),
            "enabled_models": len(enabled_models),
            "primary_model": self.fallback_order[0] if self.fallback_order else None,
            "fallback_count": len(self.fallback_order),
            "model_tiers": {
                tier.value: len([m for m in enabled_models.values() if m.tier == tier])
                for tier in ModelTier
            }
        }

    def update_model_status(self, model_key: str, enabled: bool) -> bool:
        """Update model enabled status (useful for runtime configuration)"""
        if model_key in self.models:
            self.models[model_key].enabled = enabled
            # Regenerate fallback order
            self.fallback_order = self._get_fallback_order()
            logging.info(f"Model {model_key} {'enabled' if enabled else 'disabled'}")
            return True
        return False