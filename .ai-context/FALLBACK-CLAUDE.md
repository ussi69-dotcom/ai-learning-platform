# Fallback Protocol: Claude

## When to use
1.  **Complex Refactoring**: When changes affect many files and require deep context understanding.
2.  **Stuck State**: After 2 failed attempts to fix a bug or test failure.
3.  **Creative Generation**: When generating large amounts of new content/text.

## How to use
1.  **Export Context**: Use `git diff` or copy relevant files.
2.  **Prompting**: Be specific. "Fix this error in this function."
3.  **Import**: Apply changes via patch or manual copy-paste.
4.  **Log**: Record the fallback usage in `AGENT-STATE.md`.
