#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="${MODEL_DIR:-/home/deploy/models}"
LLAMA_SERVER="${LLAMA_SERVER:-/home/deploy/llama.cpp/build/bin/llama-server}"
MODEL_FILE="${MODEL_FILE:-$MODEL_DIR/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf}"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-8082}"
THREADS="${THREADS:-$(nproc)}"
CTX_SIZE="${CTX_SIZE:-8192}"
N_PREDICT="${N_PREDICT:-256}"

if [[ ! -x "$LLAMA_SERVER" ]]; then
  echo "llama-server not found or not executable: $LLAMA_SERVER" >&2
  exit 1
fi

if [[ ! -f "$MODEL_FILE" ]]; then
  echo "Model file not found: $MODEL_FILE" >&2
  exit 1
fi

exec "$LLAMA_SERVER" \
  --model "$MODEL_FILE" \
  --host "$HOST" \
  --port "$PORT" \
  --threads "$THREADS" \
  --threads-batch "$THREADS" \
  --ctx-size "$CTX_SIZE" \
  --n-predict "$N_PREDICT" \
  --flash-attn on
