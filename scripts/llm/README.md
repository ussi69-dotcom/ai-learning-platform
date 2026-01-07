# LLM Mentor (Local CPU)

This folder contains helper scripts for running CPU-only mentor models on the lab host.

## Prereqs
- `llama.cpp` built at `/home/deploy/llama.cpp/build`
- Models in `/home/deploy/models`

## Start servers

Fast (Qwen 2.5 7B):
```bash
scripts/llm/start-mentor-fast.sh
```

Reasoning (DeepSeek R1 Distill Qwen 7B):
```bash
scripts/llm/start-mentor-reasoning.sh
```

Deep (Apriel 1.6 15B):
```bash
scripts/llm/start-mentor-deep.sh
```

All scripts default to `127.0.0.1` and ports `8081/8082/8083`. Override:
```bash
HOST=0.0.0.0 PORT=8081 scripts/llm/start-mentor-fast.sh
```

## Benchmark
```bash
scripts/llm/bench-mentor.sh
```

## Notes
- For latency <5s, keep prompts short and cap generation tokens.
- Use a reverse proxy or tunnel if you need external access.
