# BitNet 1.58-bit LLM Deployment Guide

This guide covers deploying Microsoft BitNet 1.58-bit models for the AI Mentor feature.

## What is BitNet?

BitNet is Microsoft's 1-bit LLM framework that achieves **1.37x to 6.17x speedup** on CPU while reducing energy consumption by **55-82%** compared to traditional quantized models.

- **Fast mode**: `bitnet_b1_58-3B` (3.3B parameters) - Quick responses for basic questions
- **Think mode**: `Llama3-8B-1.58-100B-tokens` (8.0B parameters) - Deep reasoning for complex questions

## Architecture

```
┌──────────────────────────────────────────────────┐
│  Frontend (AIMentor.tsx)                         │
│  ├─ Fast mode toggle (⚡ Zap icon)               │
│  └─ Think mode toggle (🧠 Brain icon)            │
└──────────────────────────────────────────────────┘
                    ↓ HTTP POST /mentor/lessons/{id}/chat
┌──────────────────────────────────────────────────┐
│  Backend (mentor_client.py)                      │
│  ├─ Fast: http://localhost:8081                  │
│  └─ Think: http://localhost:8082                 │
└──────────────────────────────────────────────────┘
                    ↓ /v1/chat/completions (OpenAI-compatible)
┌──────────────────────────────────────────────────┐
│  BitNet Docker Containers                        │
│  ├─ mentor-fast-bitnet (port 8081)               │
│  │  └─ bitnet_b1_58-3B model                     │
│  └─ mentor-think-bitnet (port 8082)              │
│     └─ Llama3-8B-1.58 model                      │
└──────────────────────────────────────────────────┘
```

## Prerequisites

- **Hardware**: CPU with AVX2 support (ARM or x86)
- **RAM**: Minimum 16GB (Fast: ~4GB, Think: ~10GB)
- **Storage**: ~15GB for both models
- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+

## Step 1: Build BitNet Docker Image

The BitNet Dockerfile is located at `docker/bitnet.Dockerfile`.

```bash
cd /home/deploy/ai-learning-platform

# Build the image (takes ~10-15 minutes)
docker compose build mentor-fast-bitnet mentor-think-bitnet
```

**What this does:**
- Installs Ubuntu 22.04 base with Python 3.10
- Installs Clang 18 (required for BitNet compilation)
- Clones Microsoft BitNet repository
- Builds BitNet inference engine
- Installs FastAPI wrapper for OpenAI-compatible API

## Step 2: Download BitNet Models

BitNet models must be downloaded using the BitNet setup script inside the container.

### Option A: Automatic Download (Recommended)

The Dockerfile already includes model download via:

```dockerfile
RUN python3 setup_env.py --hf-repo HF1BitLLM/Llama3-8B-1.58-100B-tokens -q i2_s
```

This downloads the **Think mode** model. The **Fast mode** model will be downloaded on first container start.

### Option B: Manual Download (Advanced)

If you want to pre-download models:

```bash
# Enter the container
docker run -it --rm ai-learning-platform-mentor-fast-bitnet bash

# Inside container
cd /app/bitnet
python3 setup_env.py --hf-repo HF1BitLLM/bitnet_b1_58-3B -q i2_s
python3 setup_env.py --hf-repo HF1BitLLM/Llama3-8B-1.58-100B-tokens -q i2_s
```

## Step 3: Update Environment Variables

Add/update in `.env`:

```bash
# BitNet Mentor Configuration
MENTOR_FAST_URL=http://mentor-fast-bitnet:8080
MENTOR_THINK_URL=http://mentor-think-bitnet:8080
MENTOR_TIMEOUT_FAST=30
MENTOR_TIMEOUT_THINK=60

# Context limits for Think mode
MENTOR_MAX_CONTEXT_CHUNKS_THINK=4
MENTOR_MAX_HISTORY_THINK=6
MENTOR_CONTEXT_CHARS_THINK=1400
MENTOR_HISTORY_CHARS_THINK=1200
```

## Step 4: Start Services

```bash
# Stop old services
docker compose stop mentor-fast

# Start BitNet services
docker compose up -d mentor-fast-bitnet mentor-think-bitnet

# Check logs
docker compose logs -f mentor-fast-bitnet
docker compose logs -f mentor-think-bitnet
```

## Step 5: Verify Deployment

### Health Check

```bash
# Check backend can reach both services
curl http://localhost:8000/mentor/health
```

Expected response:

```json
{
  "status": "healthy",
  "services": [
    {"mode": "fast", "status": "healthy", "latency_ms": 15.2},
    {"mode": "think", "status": "healthy", "latency_ms": 18.7}
  ]
}
```

### Test Fast Mode

```bash
curl -X POST http://localhost:8081/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "bitnet-fast",
    "messages": [{"role": "user", "content": "What is AI?"}],
    "max_tokens": 100
  }'
```

### Test Think Mode

```bash
curl -X POST http://localhost:8082/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "bitnet-think",
    "messages": [{"role": "user", "content": "Explain reasoning behind gradient descent."}],
    "max_tokens": 200
  }'
```

## Step 6: Frontend Rebuild

```bash
cd frontend
npm run build
docker compose restart frontend
```

## Performance Benchmarks

### Expected Inference Speed (24-core EPYC)

| Mode  | Model Size | Prompt Speed | Generation Speed | Latency |
|-------|------------|--------------|------------------|---------|
| Fast  | 3.3B       | ~150 tok/s   | ~15 tok/s        | 2-3s    |
| Think | 8.0B       | ~80 tok/s    | ~8 tok/s         | 5-8s    |

### Memory Usage

| Mode  | RAM Usage | CPU Usage |
|-------|-----------|-----------|
| Fast  | ~4GB      | 40-60%    |
| Think | ~10GB     | 60-80%    |

## Troubleshooting

### Issue: Container exits with "Model not found"

**Solution**: Models are downloaded on first run. Check logs:

```bash
docker compose logs mentor-fast-bitnet | grep "setup_env"
```

If download failed, manually trigger:

```bash
docker exec -it mentor-fast-bitnet bash
cd /app/bitnet
python3 setup_env.py --hf-repo HF1BitLLM/bitnet_b1_58-3B -q i2_s
```

### Issue: "Target closed" or subprocess timeout

**Cause**: Model inference taking too long

**Solution**: Increase timeout in `.env`:

```bash
MENTOR_TIMEOUT_THINK=90  # Increase to 90 seconds
```

### Issue: High CPU usage

**Cause**: BitNet uses all available CPU cores by default

**Solution**: Limit threads via environment variable:

```yaml
# In docker-compose.yml
mentor-fast-bitnet:
  environment:
    - BITNET_THREADS=12  # Reduce from 16 to 12
```

### Issue: Container crashes with "Illegal instruction"

**Cause**: CPU lacks AVX2 support

**Solution**: BitNet requires AVX2. Check CPU features:

```bash
grep -o 'avx2' /proc/cpuinfo
```

If missing, BitNet cannot run. Consider using traditional llama.cpp models instead.

## Rollback to llama.cpp

If BitNet deployment fails, you can rollback to the original llama.cpp setup:

```bash
# In docker-compose.yml, uncomment the llama.cpp section:
# mentor-fast:
#   <<: *llama_server
#   ...

# Stop BitNet services
docker compose stop mentor-fast-bitnet mentor-think-bitnet

# Start llama.cpp service
docker compose up -d mentor-fast

# Update .env
MENTOR_FAST_URL=http://mentor-fast:8081
```

## Model Management

### Switching Models

To use different BitNet models, update `docker-compose.yml`:

```yaml
mentor-fast-bitnet:
  environment:
    - BITNET_MODEL_PATH=/app/bitnet/models/bitnet_b1_58-large  # Change here
```

Available models:
- `bitnet_b1_58-large` (0.7B) - Ultra-fast, basic responses
- `bitnet_b1_58-3B` (3.3B) - Balanced (default fast mode)
- `Llama3-8B-1.58-100B-tokens` (8.0B) - Best reasoning (default think mode)
- `Falcon3-*` (1B-10B) - Alternative Falcon family

### Disk Space Cleanup

Remove unused models:

```bash
docker exec -it mentor-fast-bitnet bash
cd /app/bitnet/models
ls -lh  # See all models
rm -rf <unused-model-dir>
```

## Security Considerations

1. **No external network access**: BitNet containers only communicate with backend
2. **Read-only models**: Model directories mounted as `:ro` (not implemented yet - TODO)
3. **Resource limits**: Set CPU/memory limits in production:

```yaml
mentor-think-bitnet:
  deploy:
    resources:
      limits:
        cpus: '20'
        memory: 12G
```

## Next Steps

- [ ] Add model caching to reduce cold-start time
- [ ] Implement streaming responses for think mode
- [ ] Add A/B testing to compare BitNet vs llama.cpp quality
- [ ] Monitor token/sec metrics via Prometheus
- [ ] Add model warm-up on container start

## References

- [Microsoft BitNet Repository](https://github.com/microsoft/BitNet)
- [BitNet Paper](https://arxiv.org/abs/2402.17764)
- [HuggingFace BitNet Models](https://huggingface.co/HF1BitLLM)
