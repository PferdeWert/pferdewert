from unittest.mock import patch
import os
import sys
import types

dummy_tiktoken = types.SimpleNamespace(
    encoding_for_model=lambda model: types.SimpleNamespace(encode=lambda s: [])
)
sys.modules.setdefault("tiktoken", dummy_tiktoken)

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

os.environ.setdefault("PW_MODEL", "gpt-3.5-turbo")
os.environ.setdefault("OPENAI_API_KEY", "test-key")

from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

@patch("backend.main.client.chat.completions.create")
def test_bewertung_endpoint(mock_create):
    # Mock-Response vorbereiten
    class MockMessage:
        content = "Mocked response"

    class MockChoice:
        message = MockMessage()

    mock_create.return_value.choices = [MockChoice()]

    payload = {
        "rasse": "Hannoveraner",
        "alter": 7,
        "geschlecht": "Wallach",
        "abstammung": "Stamm 123",
        "stockmass": 170,
        "ausbildung": "Dressur"
    }

    response = client.post("/api/bewertung", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ai_response"] == "Mocked response"
