# BitNet Quick Start

Quick reference for BitNet AI Mentor deployment.

## TL;DR

```bash
# Build images
docker compose build mentor-fast-bitnet mentor-think-bitnet

# Start services
docker compose up -d mentor-fast-bitnet mentor-think-bitnet

# Check health
curl http://localhost:8000/mentor/health

# Rebuild frontend
cd frontend && npm run build && cd ..
docker compose restart frontend
```

## What Changed

### Docker Services
- **NEW**: `mentor-fast-bitnet` (port 8081) - BitNet 3B model
- **NEW**: `mentor-think-bitnet` (port 8082) - BitNet Llama3 8B model
- **REPLACED**: `mentor-fast` (llama.cpp) → commented out, can be restored

### Backend
- Added `MENTOR_THINK_URL` config
- Added `"think"` to `VALID_MODES`
- New context/history limits for think mode

### Frontend
- Mode toggle UI: Fast ⚡ vs Think 🧠
- Dynamic model info display
- i18n: Added `mode_think`, `model_info_fast`, `model_info_think`

## Files Changed

```
docker/
  ├─ bitnet.Dockerfile                 # NEW: BitNet runtime image
  └─ bitnet_api_wrapper.py             # NEW: OpenAI-compatible API wrapper

docker-compose.yml                     # MODIFIED: Added BitNet services

backend/
  ├─ app/config.py                     # MODIFIED: Added THINK config
  ├─ app/routers/mentor.py             # MODIFIED: Added "think" mode
  └─ app/services/mentor_client.py     # MODIFIED: THINK URL routing

frontend/
  ├─ components/AIMentor.tsx           # MODIFIED: Mode toggle UI
  └─ messages/
      ├─ en.json                       # MODIFIED: Added i18n keys
      └─ cs.json                       # MODIFIED: Added i18n keys

docs/
  ├─ BITNET_DEPLOYMENT.md              # NEW: Full deployment guide
  └─ BITNET_QUICKSTART.md              # NEW: This file
```

## Architecture Diagram

```
User clicks "Fast" or "Think" toggle
        ↓
Frontend sends mode in POST body
        ↓
Backend routes to correct URL:
  - fast  → http://localhost:8081
  - think → http://localhost:8082
        ↓
BitNet API wrapper receives request
        ↓
BitNet inference engine generates response
        ↓
OpenAI-compatible JSON returned to backend
        ↓
Displayed in AI Mentor chat UI
```

## Model Comparison

| Feature        | Fast Mode           | Think Mode                  |
|----------------|---------------------|----------------------------|
| Model          | BitNet 3B           | BitNet Llama3 8B           |
| Speed          | 2-3s response       | 5-8s response              |
| Use Case       | Quick questions     | Complex reasoning          |
| Context Chunks | 2                   | 4                          |
| History        | 2 messages          | 6 messages                 |
| Timeout        | 30s                 | 60s                        |

## Environment Variables

Required in `.env`:

```bash
MENTOR_FAST_URL=http://mentor-fast-bitnet:8080
MENTOR_THINK_URL=http://mentor-think-bitnet:8080
MENTOR_TIMEOUT_FAST=30
MENTOR_TIMEOUT_THINK=60
```

## Rollback

If BitNet doesn't work, restore llama.cpp:

```bash
# 1. Stop BitNet
docker compose stop mentor-fast-bitnet mentor-think-bitnet

# 2. Uncomment mentor-fast in docker-compose.yml

# 3. Start llama.cpp
docker compose up -d mentor-fast

# 4. Update .env
MENTOR_FAST_URL=http://mentor-fast:8081
```

## Testing

### Frontend Test
1. Login to platform
2. Open any lesson page
3. Click "AI Mentor" button (bottom-right)
4. Click "Fast ⚡" or "Think 🧠" toggle
5. Ask a question

### API Test
```bash
# Test Think mode
curl -X POST http://localhost:8000/mentor/lessons/1/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain gradient descent",
    "mode": "think",
    "vibe": "jedi",
    "history": []
  }' \
  | jq .
```

## Performance Monitoring

```bash
# Watch CPU usage
docker stats mentor-fast-bitnet mentor-think-bitnet

# Watch logs
docker compose logs -f mentor-think-bitnet

# Check response times
curl -s -w "Time: %{time_total}s\n" \
  http://localhost:8082/health
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Container exits immediately | Check logs: `docker compose logs mentor-fast-bitnet` |
| "Model not found" | Models download on first start (5-10 min) |
| Timeout errors | Increase `MENTOR_TIMEOUT_THINK` in `.env` |
| High CPU usage | Reduce `BITNET_THREADS` in docker-compose.yml |

## Next Actions

After deployment:
- [ ] Verify both modes work in UI
- [ ] Check `/mentor/health` returns healthy
- [ ] Monitor CPU/RAM usage for 24h
- [ ] Test with 5-10 real user questions
- [ ] Compare quality vs llama.cpp baseline
- [ ] Document any model hallucinations/errors

## Further Reading

- Full deployment guide: `docs/BITNET_DEPLOYMENT.md`
- BitNet GitHub: https://github.com/microsoft/BitNet
- Model Hub: https://huggingface.co/HF1BitLLM
