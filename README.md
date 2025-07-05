# PferdeWert

PferdeWert is an AI‑assisted service for estimating the market value of horses. The project combines a Next.js frontend with a FastAPI backend that communicates with the OpenAI API.

## Running in GitHub Codespaces

1. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app will be available at `https://<CODESPACE_HOST>-3000.app.github.dev`.

2. **Backend**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   The API is then reachable at `https://<CODESPACE_HOST>-8000.app.github.dev`.

Set the environment variables `OPENAI_API_KEY` and `PW_MODEL` in your Codespace so the backend can access the OpenAI model.

