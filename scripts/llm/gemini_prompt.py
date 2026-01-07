#!/home/deploy/ai-learning-platform/.venv/bin/python3
"""
Gemini API wrapper for non-interactive use (Codex, scripts, cron).
Uses GOOGLE_API_KEY from .env instead of OAuth.

Usage:
    python scripts/llm/gemini_prompt.py "Your prompt here"
    python scripts/llm/gemini_prompt.py --model gemini-2.0-flash "Quick question"
    echo "Multiline prompt" | python scripts/llm/gemini_prompt.py
"""

import sys
import os
import argparse
from pathlib import Path

# Load .env from project root
def load_env():
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ.setdefault(key.strip(), value.strip())

load_env()

def main():
    parser = argparse.ArgumentParser(description='Gemini API prompt wrapper')
    parser.add_argument('prompt', nargs='*', help='Prompt text')
    parser.add_argument('--model', '-m', default='gemini-2.0-flash',
                        help='Model to use (default: gemini-2.0-flash)')
    parser.add_argument('--file', '-f', help='Image file to include')
    parser.add_argument('--context', '-c', action='store_true',
                        help='Include MEMORY.md project context')
    args = parser.parse_args()

    # Get prompt from args or stdin
    if args.prompt:
        prompt = ' '.join(args.prompt)
    elif not sys.stdin.isatty():
        prompt = sys.stdin.read().strip()
    else:
        print("Error: No prompt provided", file=sys.stderr)
        sys.exit(1)

    # Inject MEMORY.md context if requested
    if args.context:
        memory_path = Path(__file__).parent.parent.parent / ".ai-context" / "state" / "MEMORY.md"
        if memory_path.exists():
            with open(memory_path) as f:
                memory_context = f.read()
            prompt = f"PROJECT CONTEXT:\n{memory_context}\n\n---\n\nTASK:\n{prompt}"

    api_key = os.environ.get('GOOGLE_API_KEY') or os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("Error: GOOGLE_API_KEY or GEMINI_API_KEY not found in environment", file=sys.stderr)
        sys.exit(1)

    try:
        from google import genai
        client = genai.Client(api_key=api_key)

        # Map friendly names to actual model names
        model_map = {
            'gemini-3-pro-preview': 'gemini-3-pro-preview',
            'gemini-3-pro': 'gemini-3-pro-preview',
            'pro': 'gemini-3-pro-preview',
            'flash': 'gemini-2.0-flash',
        }
        model = model_map.get(args.model, args.model)

        # Handle image if provided
        if args.file and os.path.exists(args.file):
            import base64
            with open(args.file, 'rb') as f:
                image_data = base64.b64encode(f.read()).decode()
            # Note: For image support, need to use different API call
            # For now, just include file path in prompt
            prompt = f"[Image: {args.file}]\n\n{prompt}"

        response = client.models.generate_content(
            model=model,
            contents=prompt
        )
        print(response.text)

    except ImportError:
        print("Error: google-genai not installed. Run: pip install google-genai", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
