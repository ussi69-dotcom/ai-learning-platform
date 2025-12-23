from __future__ import annotations

from typing import Dict, List
import logging
import time
import httpx

from app.config import settings

logger = logging.getLogger(__name__)


class MentorClientError(RuntimeError):
    pass


def select_base_url(mode: str) -> str:
    return settings.MENTOR_FAST_URL


def select_timeout(mode: str) -> float:
    return settings.MENTOR_TIMEOUT_FAST


def check_health(mode: str) -> Dict[str, object]:
    base_url = select_base_url(mode)
    timeout = httpx.Timeout(2.5, connect=1.0)
    start = time.monotonic()

    try:
        with httpx.Client(timeout=timeout) as client:
            response = client.get(f"{base_url}/health", headers={"Accept": "application/json"})
            response.raise_for_status()
        latency_ms = round((time.monotonic() - start) * 1000, 1)
        detail = None
        try:
            payload = response.json()
            if isinstance(payload, dict):
                detail = payload.get("status")
        except ValueError:
            detail = None
        return {"mode": mode, "status": "healthy", "latency_ms": latency_ms, "detail": detail}
    except httpx.HTTPError as exc:
        latency_ms = round((time.monotonic() - start) * 1000, 1)
        return {"mode": mode, "status": "unhealthy", "latency_ms": latency_ms, "detail": str(exc)}


def call_chat(
    messages: List[Dict[str, str]],
    mode: str,
    max_tokens: int | None = None,
    temperature: float | None = None,
    top_p: float | None = None,
) -> str:
    base_url = select_base_url(mode)
    payload = {
        "model": "local-mentor",
        "messages": messages,
        "max_tokens": max_tokens or settings.MENTOR_MAX_TOKENS,
        "temperature": temperature if temperature is not None else settings.MENTOR_TEMPERATURE,
        "top_p": top_p if top_p is not None else settings.MENTOR_TOP_P,
        "stream": False,
    }

    timeout = httpx.Timeout(select_timeout(mode), connect=5.0)

    def extract_message(data: Dict[str, object]) -> tuple[str, str | None]:
        choices = data.get("choices")
        if not choices:
            error = data.get("error") or {}
            if isinstance(error, dict) and error.get("message"):
                raise MentorClientError(str(error.get("message")))
            raise MentorClientError("Model returned no choices.")

        choice = choices[0] if isinstance(choices, list) else choices
        message = choice.get("message") if isinstance(choice, dict) else {}
        if not isinstance(message, dict):
            message = {}
        finish_reason = choice.get("finish_reason") if isinstance(choice, dict) else None
        content = (
            message.get("content")
            or (choice.get("text") if isinstance(choice, dict) else None)
            or (choice.get("delta", {}).get("content") if isinstance(choice, dict) else None)
        )
        if not content or not str(content).strip():
            raise MentorClientError("Model returned empty content.")
        return str(content).strip(), finish_reason

    def run_request(
        request_messages: List[Dict[str, str]],
        max_tokens_override: int | None = None,
    ) -> tuple[str, str | None]:
        request_payload = {
            **payload,
            "messages": request_messages,
            "max_tokens": max_tokens_override or payload["max_tokens"],
        }
        for attempt in range(2):
            try:
                with httpx.Client(timeout=timeout) as client:
                    response = client.post(
                        f"{base_url}/v1/chat/completions",
                        json=request_payload,
                        headers={"Accept": "application/json"},
                    )
                    response.raise_for_status()
                try:
                    data = response.json()
                except ValueError as exc:
                    raise MentorClientError("Invalid JSON response from model.") from exc
                return extract_message(data)
            except httpx.HTTPError as exc:
                if attempt == 0:
                    time.sleep(0.4)
                    continue
                logger.warning("Mentor request failed: %s", exc)
                raise MentorClientError(str(exc)) from exc
            except MentorClientError as exc:
                if attempt == 0 and any(
                    token in str(exc).lower()
                    for token in ("no choices", "empty content", "invalid json")
                ):
                    time.sleep(0.4)
                    continue
                logger.warning("Mentor response invalid: %s", exc)
                raise

    content, finish_reason = run_request(messages)
    if finish_reason != "length":
        return content

    continuation_prompt = "Continue and finish the answer without repeating. Complete any cut sentence."
    combined = content

    for _ in range(2):
        tail = combined[-1200:]
        continuation_messages = [
            *messages,
            {"role": "assistant", "content": tail},
            {"role": "user", "content": continuation_prompt},
        ]
        try:
            continuation, continuation_reason = run_request(continuation_messages)
        except MentorClientError as exc:
            logger.warning("Mentor continuation failed: %s", exc)
            break

        combined = f"{combined}\n\n{continuation}".strip()
        if continuation_reason != "length":
            break

    return combined
