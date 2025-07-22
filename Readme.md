# Intent-Site — An AI-Accessible Web Prototype

**Intent-Site** is an experimental project demonstrating how websites can expose machine-readable actions for AI agents.

Instead of building for humans only, this site allows agents like ChatGPT to:
- Understand declared intents via `agent.json`
- Read current state from `status.json`
- Optionally trigger updates (via future POST endpoint)

## 🔍 Files

- `index.html` — Human-readable status page
- `status.json` — Current availability data
- `agent.json` — Declared intents for AI agents

## 💡 Example Intent

```json
{
  "name": "get_status",
  "method": "GET",
  "endpoint": "/status.json"
}
