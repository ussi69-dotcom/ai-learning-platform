#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="${MODEL_DIR:-/home/deploy/models}"
LLAMA_BENCH="${LLAMA_BENCH:-/home/deploy/llama.cpp/build/bin/llama-bench}"
THREADS="${THREADS:-$(nproc)}"

if [[ ! -x "$LLAMA_BENCH" ]]; then
  echo "llama-bench not found or not executable: $LLAMA_BENCH" >&2
  exit 1
fi

MODELS=(
  "$MODEL_DIR/Qwen2.5-7B-Instruct-Q4_K_M.gguf"
  "$MODEL_DIR/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf"
  "$MODEL_DIR/ServiceNow-AI_Apriel-1.6-15b-Thinker-Q4_K_M.gguf"
)

for model in "${MODELS[@]}"; do
  if [[ ! -f "$model" ]]; then
    echo "Missing model: $model" >&2
    continue
  fi

  out="/tmp/bench-$(basename "$model").json"
  "$LLAMA_BENCH" -m "$model" -t "$THREADS" -p 512 -n 128 -r 1 -fa 1 -o json > "$out"
  echo "saved $out"
done

python3 - <<'PY'
import json
from pathlib import Path

files = sorted(Path('/tmp').glob('bench-*.json'))
for f in files:
    data = json.loads(f.read_text())
    pp = None
    tg = None
    for entry in data:
        if entry.get('n_gen') == 0 and entry.get('n_prompt'):
            pp = entry.get('avg_ts')
        if entry.get('n_prompt') == 0 and entry.get('n_gen'):
            tg = entry.get('avg_ts')
    print(f"{f.name}: prompt_toks_per_s={pp:.2f} gen_toks_per_s={tg:.2f}")
PY
