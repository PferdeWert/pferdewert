from unittest.mock import patch
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
    assert data["raw_gpt"] == "Mocked response"
