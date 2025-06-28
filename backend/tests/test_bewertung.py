from fastapi.testclient import TestClient
from main import app  # Import aus backend/main.py

client = TestClient(app)

def test_bewertung_endpoint():
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
    assert "raw_gpt" in data
    assert isinstance(data["raw_gpt"], str)
