"""
Simplified Model Configuration for PferdeWert OpenRouter Integration
Uses PRIMARY_MODEL and FALLBACK_MODEL from environment variables
"""

import os
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class ModelConfig:
    """Configuration for a specific AI model"""
    name: str
    openrouter_id: str
    max_tokens: int
    temperature: float
    top_p: float

class ModelManager:
    """
    Simplified model manager using PRIMARY_MODEL and FALLBACK_MODEL
    """

    def __init__(self):
        self.primary_model = self._get_primary_model()
        self.fallback_model = self._get_fallback_model()
        self.fallback_order = self._get_fallback_order()
        logging.info(f"ModelManager initialized - Primary: {self.primary_model.name}, Fallback: {self.fallback_model.name}")

    def _get_primary_model(self) -> ModelConfig:
        """Get primary model from environment"""
        model_id = os.getenv("PRIMARY_MODEL", "google/gemini-2.5-pro")
        return ModelConfig(
            name=self._get_model_name(model_id),
            openrouter_id=model_id,
            max_tokens=10000,
            temperature=0.3,
            top_p=0.8
        )

    def _get_fallback_model(self) -> ModelConfig:
        """Get fallback model from environment"""
        model_id = os.getenv("FALLBACK_MODEL", "anthropic/claude-3.5-sonnet")
        return ModelConfig(
            name=self._get_model_name(model_id),
            openrouter_id=model_id,
            max_tokens=10000,
            temperature=0.3,
            top_p=0.8
        )

    def _get_model_name(self, openrouter_id: str) -> str:
        """Extract friendly name from OpenRouter ID"""
        name_map = {
            "google/gemini-2.5-pro": "Gemini 2.5 Pro",
            "openai/gpt-4o": "GPT-4o",
            "anthropic/claude-opus-4-1-20250805": "Claude Opus",
            "openai/gpt-4o-mini": "GPT-4o Mini",
            "anthropic/claude-3-haiku": "Claude Haiku"
        }
        return name_map.get(openrouter_id, openrouter_id)

    def _get_fallback_order(self) -> List[ModelConfig]:
        """Get fallback order: primary → fallback"""
        return [self.primary_model, self.fallback_model]

    def get_primary_model(self) -> ModelConfig:
        """Get the primary model configuration"""
        return self.primary_model

    def get_fallback_models(self) -> List[ModelConfig]:
        """Get all models in fallback order"""
        return self.fallback_order

    def get_model_stats(self) -> Dict[str, Any]:
        """Get statistics about model configuration"""
        return {
            "primary_model": self.primary_model.openrouter_id,
            "fallback_model": self.fallback_model.openrouter_id,
            "fallback_count": len(self.fallback_order)
        }