#!/usr/bin/env python3
"""
FastAPI wrapper for BitNet models to provide OpenAI-compatible API.
Wraps BitNet's run_inference.py with /v1/chat/completions endpoint.
"""

import os
import sys
import json
import time
import logging
import subprocess
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import uvicorn

# Configuration from environment
MODEL_PATH = os.environ.get("BITNET_MODEL_PATH", "/app/bitnet/models/Llama3-8B-1.58-100B-tokens")
INFERENCE_SCRIPT = os.environ.get("BITNET_INFERENCE_SCRIPT", "/app/bitnet/run_inference.py")
DEFAULT_MAX_TOKENS = int(os.environ.get("BITNET_MAX_TOKENS", "320"))
DEFAULT_TEMPERATURE = float(os.environ.get("BITNET_TEMPERATURE", "0.7"))
DEFAULT_THREADS = int(os.environ.get("BITNET_THREADS", os.cpu_count() or 8))
CONTEXT_SIZE = int(os.environ.get("BITNET_CONTEXT_SIZE", "4096"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="BitNet OpenAI-Compatible API")


class Message(BaseModel):
    role: str
    content: str


class ChatCompletionRequest(BaseModel):
    model: str
    messages: List[Message]
    max_tokens: Optional[int] = DEFAULT_MAX_TOKENS
    temperature: Optional[float] = DEFAULT_TEMPERATURE
    top_p: Optional[float] = 0.95
    stream: bool = False


class ChatCompletionResponse(BaseModel):
    id: str = Field(default_factory=lambda: f"chatcmpl-{int(time.time())}")
    object: str = "chat.completion"
    created: int = Field(default_factory=lambda: int(time.time()))
    model: str
    choices: List[Dict[str, Any]]
    usage: Dict[str, int]


class HealthResponse(BaseModel):
    status: str
    model: str
    framework: str = "BitNet-1.58"


def format_messages_as_prompt(messages: List[Message]) -> str:
    """
    Convert OpenAI-style messages to a single prompt string.
    Uses simple formatting compatible with instruction-tuned models.
    """
    prompt_parts = []

    for msg in messages:
        role = msg.role
        content = msg.content.strip()

        if role == "system":
            prompt_parts.append(f"System: {content}")
        elif role == "user":
            prompt_parts.append(f"User: {content}")
        elif role == "assistant":
            prompt_parts.append(f"Assistant: {content}")

    # Add final assistant prefix to prompt completion
    prompt_parts.append("Assistant:")
    return "\n\n".join(prompt_parts)


def run_bitnet_inference(
    prompt: str,
    max_tokens: int,
    temperature: float,
    threads: int
) -> str:
    """
    Call BitNet run_inference.py script and capture output.
    """
    cmd = [
        "python3",
        INFERENCE_SCRIPT,
        "-m", MODEL_PATH,
        "-p", prompt,
        "-n", str(max_tokens),
        "-t", str(threads),
        "-c", str(CONTEXT_SIZE),
        "-temp", str(temperature),
        "-cnv"  # Enable conversation mode
    ]

    logger.info(f"Running BitNet inference: {' '.join(cmd[:6])}...")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=120,  # 2 minute timeout
            check=True
        )

        # BitNet outputs to stdout - extract generated text
        output = result.stdout.strip()

        # Remove prompt echo if present
        if "Assistant:" in output:
            # Get text after the last "Assistant:" marker
            parts = output.split("Assistant:")
            if len(parts) > 1:
                output = parts[-1].strip()

        return output

    except subprocess.TimeoutExpired:
        logger.error("BitNet inference timeout")
        raise HTTPException(status_code=504, detail="Model inference timeout")
    except subprocess.CalledProcessError as e:
        logger.error(f"BitNet inference error: {e.stderr}")
        raise HTTPException(status_code=500, detail=f"Model inference failed: {e.stderr}")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    # Verify model path exists
    if not os.path.exists(MODEL_PATH):
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "error": "Model not found"}
        )

    return HealthResponse(
        status="ok",
        model=os.path.basename(MODEL_PATH)
    )


@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    """
    OpenAI-compatible chat completions endpoint.
    """
    if request.stream:
        raise HTTPException(status_code=400, detail="Streaming not supported")

    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")

    # Convert messages to prompt
    prompt = format_messages_as_prompt(request.messages)

    # Run inference
    max_tokens = request.max_tokens or DEFAULT_MAX_TOKENS
    temperature = request.temperature or DEFAULT_TEMPERATURE

    start_time = time.time()
    generated_text = run_bitnet_inference(
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        threads=DEFAULT_THREADS
    )
    inference_time = time.time() - start_time

    logger.info(f"Generated {len(generated_text)} chars in {inference_time:.2f}s")

    # Build OpenAI-compatible response
    response = ChatCompletionResponse(
        model=request.model,
        choices=[
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": generated_text
                },
                "finish_reason": "stop"
            }
        ],
        usage={
            "prompt_tokens": len(prompt.split()),  # Rough estimate
            "completion_tokens": len(generated_text.split()),
            "total_tokens": len(prompt.split()) + len(generated_text.split())
        }
    )

    return response


if __name__ == "__main__":
    logger.info(f"Starting BitNet API wrapper")
    logger.info(f"Model: {MODEL_PATH}")
    logger.info(f"Max tokens: {DEFAULT_MAX_TOKENS}")
    logger.info(f"Temperature: {DEFAULT_TEMPERATURE}")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8080,
        log_level="info"
    )
