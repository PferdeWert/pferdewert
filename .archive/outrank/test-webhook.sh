#!/bin/bash
# Webhook Test Script for Outrank.so Integration
# Usage: ./test-webhook.sh [local|production]

ENV=${1:-local}

if [ "$ENV" = "local" ]; then
  URL="http://localhost:3000/api/webhooks/outrank-publish"
  echo "🧪 Testing LOCAL webhook endpoint..."
elif [ "$ENV" = "production" ]; then
  URL="https://pferdewert.de/api/webhooks/outrank-publish"
  echo "🚀 Testing PRODUCTION webhook endpoint..."
else
  echo "❌ Invalid environment. Use: ./test-webhook.sh [local|production]"
  exit 1
fi

# Replace with your generated secret
WEBHOOK_SECRET="NzjVpwnqnvhwf7/5dJEnLi0CqyYlMSrVtiGSWuP8Qz0="

echo "📡 Sending POST request to: $URL"
echo ""

curl -X POST "$URL" \
  -H "Authorization: Bearer $WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "article.published",
    "timestamp": "2024-10-21T12:00:00Z",
    "data": {
      "articles": [{
        "id": "test-article-001",
        "title": "Pferdekauf 2024: Der ultimative Ratgeber für Einsteiger",
        "content_markdown": "# Pferdekauf 2024\n\nDer Kauf eines Pferdes ist eine wichtige Entscheidung. In diesem Artikel erfahren Sie alles Wichtige über den Pferdekauf im Jahr 2024. Von der Auswahl des richtigen Pferdes bis zur Preisverhandlung - wir decken alle wichtigen Aspekte ab.",
        "content_html": "<h1>Pferdekauf 2024</h1><p>Der Kauf eines Pferdes ist eine wichtige Entscheidung. In diesem Artikel erfahren Sie alles Wichtige über den Pferdekauf im Jahr 2024. Von der Auswahl des richtigen Pferdes bis zur Preisverhandlung - wir decken alle wichtigen Aspekte ab.</p>",
        "meta_description": "Alles über Pferdekauf 2024: Von der Auswahl bis zur Preisverhandlung. Ihr umfassender Ratgeber für den erfolgreichen Pferdekauf.",
        "created_at": "2024-10-21T12:00:00Z",
        "image_url": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a",
        "slug": "pferdekauf-2024-ratgeber",
        "tags": ["Pferdekauf", "Ratgeber", "Einsteiger"]
      }]
    }
  }' \
  | jq '.'

echo ""
echo "✅ Test complete!"
