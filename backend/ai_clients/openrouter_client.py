"""
OpenRouter Client Implementation for PferdeWert
Provides unified AI model access with exponential backoff retry logic
"""

import os
import time
import random
import logging
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
import httpx
import json

@dataclass
class ModelResponse:
    """Standardized response from AI models"""
    content: str
    model: str
    usage: Optional[Dict[str, Any]] = None
    finish_reason: Optional[str] = None

class OpenRouterError(Exception):
    """Custom exception for OpenRouter API errors"""
    def __init__(self, message: str, status_code: Optional[int] = None, model: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.model = model

class OpenRouterClient:
    """
    OpenRouter API client with retry logic and fallback capabilities
    Following PferdeWert patterns for exponential backoff and error handling
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: str = "https://openrouter.ai/api/v1",
        max_retries: int = 3,
        retry_delay: float = 1.0,
        timeout: int = 120,  # 2 minutes timeout for horse valuation tasks
    ):
        self.api_key = api_key or os.getenv("OPENROUTER_API_KEY")
        self.base_url = base_url
        self.max_retries = max_retries
        self.retry_delay = retry_delay
        self.timeout = timeout

        if not self.api_key:
            raise ValueError("OpenRouter API key is required. Set OPENROUTER_API_KEY environment variable.")

        # HTTP client with appropriate headers
        self.client = httpx.Client(
            base_url=self.base_url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://pferdewert.de",  # Optional: for tracking
                "X-Title": "PferdeWert AI Horse Valuation"  # Optional: for tracking
            },
            timeout=self.timeout
        )

        logging.info(f"OpenRouter client initialized with {max_retries} max retries")

    def create_completion(
        self,
        model: str,
        messages: List[Dict[str, str]],
        max_tokens: int = 10000,
        temperature: float = 0.3,
        top_p: float = 0.8,
        stream: bool = False,
        **kwargs
    ) -> ModelResponse:
        """
        Create completion with exponential backoff retry logic
        Following the same pattern as call_claude_with_retry in main.py
        """
        last_exception = None

        for attempt in range(self.max_retries):
            try:
                # Prepare request payload
                payload = {
                    "model": model,
                    "messages": messages,
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                    "top_p": top_p,
                    "stream": stream,
                    **kwargs
                }

                # Remove None values
                payload = {k: v for k, v in payload.items() if v is not None}

                # Make API request
                response = self.client.post("/chat/completions", json=payload)

                # Handle different status codes
                if response.status_code == 200:
                    data = response.json()

                    # Extract content from response
                    if "choices" in data and len(data["choices"]) > 0:
                        choice = data["choices"][0]
                        content = choice.get("message", {}).get("content", "")

                        if not content:
                            raise OpenRouterError(f"Empty response from {model}", 200, model)

                        return ModelResponse(
                            content=content.strip(),
                            model=data.get("model", model),
                            usage=data.get("usage"),
                            finish_reason=choice.get("finish_reason")
                        )
                    else:
                        raise OpenRouterError(f"No choices in response from {model}", 200, model)

                # Handle retryable errors (following Claude retry pattern)
                elif response.status_code in [429, 502, 503, 504]:  # Rate limit, bad gateway, service unavailable, timeout
                    if attempt < self.max_retries - 1:
                        # Exponential backoff with jitter (same pattern as Claude)
                        wait_time = (3 ** attempt) + random.uniform(0, 2)

                        # Only log on first retry to reduce spam
                        if attempt == 0:
                            logging.warning(
                                f"OpenRouter {model} rate limited/overloaded ({response.status_code}), "
                                f"retrying {self.max_retries - 1} times with backoff"
                            )

                        time.sleep(wait_time)
                        continue
                    else:
                        error_msg = f"OpenRouter API error after {self.max_retries} retries: {response.status_code}"
                        try:
                            error_detail = response.json()
                            if "error" in error_detail:
                                error_msg += f" - {error_detail['error']}"
                        except:
                            pass
                        raise OpenRouterError(error_msg, response.status_code, model)

                # Handle non-retryable errors
                else:
                    error_msg = f"OpenRouter API error: {response.status_code}"
                    try:
                        error_detail = response.json()
                        if "error" in error_detail:
                            error_msg += f" - {error_detail['error']}"
                    except:
                        pass
                    raise OpenRouterError(error_msg, response.status_code, model)

            except OpenRouterError:
                # Re-raise OpenRouter errors as-is
                raise
            except httpx.RequestError as e:
                last_exception = OpenRouterError(f"Network error calling {model}: {str(e)}", None, model)
                if attempt < self.max_retries - 1:
                    wait_time = (2 ** attempt) + random.uniform(0, 1)
                    logging.warning(f"Network error calling {model}, retrying in {wait_time:.1f}s")
                    time.sleep(wait_time)
                    continue
                else:
                    raise last_exception
            except Exception as e:
                last_exception = OpenRouterError(f"Unexpected error calling {model}: {str(e)}", None, model)
                if attempt < self.max_retries - 1:
                    wait_time = (2 ** attempt) + random.uniform(0, 1)
                    logging.warning(f"Unexpected error calling {model}, retrying in {wait_time:.1f}s")
                    time.sleep(wait_time)
                    continue
                else:
                    raise last_exception

        # This shouldn't be reached, but just in case
        if last_exception:
            raise last_exception
        raise OpenRouterError(f"Max retries exceeded for {model}")

    def get_available_models(self) -> List[Dict[str, Any]]:
        """Get list of available models from OpenRouter"""
        try:
            response = self.client.get("/models")
            if response.status_code == 200:
                data = response.json()
                return data.get("data", [])
            else:
                logging.error(f"Failed to fetch models: {response.status_code}")
                return []
        except Exception as e:
            logging.error(f"Error fetching available models: {e}")
            return []

    def health_check(self) -> Dict[str, Any]:
        """Check if OpenRouter API is accessible"""
        try:
            models = self.get_available_models()
            return {
                "status": "healthy",
                "models_available": len(models) > 0,
                "model_count": len(models)
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "models_available": False,
                "model_count": 0
            }

    def __del__(self):
        """Clean up HTTP client"""
        if hasattr(self, 'client'):
            self.client.close()