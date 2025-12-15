#!/usr/bin/env python3
"""
Gemini Deep Research Agent - Autonomous Research Tool

Usage:
    python gemini_deep_research.py "Your research question"
    python gemini_deep_research.py --file questions.txt

Requirements:
    pip install google-genai

Environment:
    GOOGLE_API_KEY or GEMINI_API_KEY in .env

Documentation:
    https://ai.google.dev/gemini-api/docs/deep-research
"""

import sys
import os
import time
import argparse
from pathlib import Path
from datetime import datetime

# Load .env from project root
env_path = Path(__file__).parent.parent.parent / '.env'
if env_path.exists():
    with open(env_path) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                os.environ.setdefault(key, value)

try:
    from google import genai
except ImportError:
    print("ERROR: google-genai not installed. Run: pip install google-genai")
    sys.exit(1)


def run_deep_research(question: str, timeout_minutes: int = 60) -> dict:
    """
    Run Gemini Deep Research Agent on a question.

    Args:
        question: Research question to investigate
        timeout_minutes: Max time to wait (default 60, max supported by API)

    Returns:
        dict with 'status', 'output', 'duration_seconds'
    """
    api_key = os.environ.get('GOOGLE_API_KEY') or os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY not found in environment")

    client = genai.Client(api_key=api_key)

    print(f"🔬 Starting Deep Research...")
    print(f"📝 Question: {question[:100]}{'...' if len(question) > 100 else ''}")
    print(f"⏱️  Max timeout: {timeout_minutes} minutes")
    print("-" * 50)

    start_time = time.time()

    # Create async research interaction
    interaction = client.interactions.create(
        input=question,
        agent='deep-research-pro-preview-12-2025',
        background=True,  # Required for long-running research
        agent_config={
            'type': 'deep-research',
            'thinking_summaries': 'auto'  # Capture reasoning steps
        }
    )

    interaction_id = interaction.id
    print(f"🆔 Interaction ID: {interaction_id}")

    # Poll for completion
    poll_interval = 30  # seconds
    max_polls = (timeout_minutes * 60) // poll_interval

    for i in range(max_polls):
        time.sleep(poll_interval)
        elapsed = time.time() - start_time

        interaction = client.interactions.get(interaction_id)
        status = interaction.status

        print(f"   [{int(elapsed)}s] Status: {status}")

        if status == 'completed':
            duration = time.time() - start_time
            print(f"\n✅ Research completed in {duration:.1f} seconds ({duration/60:.1f} min)")
            # Extract text from outputs array
            output_text = interaction.outputs[-1].text if interaction.outputs else "No output"
            return {
                'status': 'completed',
                'output': output_text,
                'duration_seconds': duration,
                'interaction_id': interaction_id
            }
        elif status == 'failed':
            print(f"\n❌ Research failed")
            return {
                'status': 'failed',
                'output': getattr(interaction, 'error', 'Unknown error'),
                'duration_seconds': time.time() - start_time,
                'interaction_id': interaction_id
            }

    # Timeout
    print(f"\n⏰ Timeout after {timeout_minutes} minutes")
    return {
        'status': 'timeout',
        'output': None,
        'duration_seconds': time.time() - start_time,
        'interaction_id': interaction_id
    }


def save_output(result: dict, question: str, output_dir: Path = None):
    """Save research output to file."""
    if output_dir is None:
        output_dir = Path(__file__).parent.parent.parent / '.ai-context' / 'Perplexity_assist'

    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"gemini_research_{timestamp}.md"
    filepath = output_dir / filename

    with open(filepath, 'w') as f:
        f.write(f"# Gemini Deep Research Report\n\n")
        f.write(f"**Date:** {datetime.now().isoformat()}\n")
        f.write(f"**Status:** {result['status']}\n")
        f.write(f"**Duration:** {result['duration_seconds']:.1f}s\n")
        f.write(f"**Interaction ID:** {result.get('interaction_id', 'N/A')}\n\n")
        f.write(f"## Question\n\n{question}\n\n")
        f.write(f"## Output\n\n{result['output']}\n")

    print(f"📄 Saved to: {filepath}")
    return filepath


def main():
    parser = argparse.ArgumentParser(
        description='Gemini Deep Research Agent - Autonomous 20-60 min research',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python gemini_deep_research.py "Compare RAG vs fine-tuning for enterprise LLMs"
    python gemini_deep_research.py "Market analysis of AI code assistants 2025"
    python gemini_deep_research.py --timeout 30 "Quick competitive analysis of X"
        """
    )
    parser.add_argument('question', nargs='?', help='Research question')
    parser.add_argument('--file', '-f', help='Read question from file')
    parser.add_argument('--timeout', '-t', type=int, default=60, help='Timeout in minutes (max 60)')
    parser.add_argument('--no-save', action='store_true', help='Do not save output to file')

    args = parser.parse_args()

    # Get question
    if args.file:
        with open(args.file) as f:
            question = f.read().strip()
    elif args.question:
        question = args.question
    else:
        print("Enter your research question (Ctrl+D when done):")
        question = sys.stdin.read().strip()

    if not question:
        print("ERROR: No question provided")
        sys.exit(1)

    # Run research
    try:
        result = run_deep_research(question, min(args.timeout, 60))

        # Print output
        print("\n" + "=" * 50)
        print("RESEARCH OUTPUT")
        print("=" * 50 + "\n")
        print(result['output'])

        # Save to file
        if not args.no_save and result['status'] == 'completed':
            save_output(result, question)

    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
