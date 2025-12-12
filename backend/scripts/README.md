# Backend Scripts

Automation scripts for the AI Learning Platform.

## Daily Digest Cron (`daily_digest_cron.py`)

Fetches daily AI news from Perplexity Search API and posts to our webhook endpoint.

### Prerequisites

1. **Perplexity API Key**
   - Go to https://www.perplexity.ai/settings/api
   - Create or copy your API key
   - Note: This uses credits from your Perplexity account

2. **Python 3.10+** with `httpx` library
   ```bash
   pip install httpx
   ```

### Environment Variables

Set these in your shell or in a `.env` file:

```bash
# Required
export PERPLEXITY_API_KEY="pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export DIGEST_WEBHOOK_URL="https://ai-teaching.eu/api/digest/webhook"

# Optional (recommended for production)
export PERPLEXITY_WEBHOOK_SECRET="your-secret-here"
```

### Manual Test Run

```bash
# From the scripts directory
cd /path/to/ai-learning-platform/backend/scripts

# Set env vars
export PERPLEXITY_API_KEY="your-key"
export DIGEST_WEBHOOK_URL="http://localhost:8000/digest/webhook"

# Run
python3 daily_digest_cron.py
```

### Cron Setup (Production)

Add to crontab (`crontab -e`):

```cron
# Daily AI Digest at 08:00 CET (07:00 UTC in winter, 06:00 UTC in summer)
# Adjust based on your server timezone
0 7 * * * /usr/bin/python3 /home/user/ai-learning-platform/backend/scripts/daily_digest_cron.py >> /var/log/daily-digest.log 2>&1
```

Or with environment variables inline:

```cron
0 7 * * * PERPLEXITY_API_KEY="pplx-xxx" DIGEST_WEBHOOK_URL="https://ai-teaching.eu/api/digest/webhook" PERPLEXITY_WEBHOOK_SECRET="secret" /usr/bin/python3 /home/user/ai-learning-platform/backend/scripts/daily_digest_cron.py >> /var/log/daily-digest.log 2>&1
```

### How It Works

1. **Calls Perplexity API** with a structured prompt asking for:
   - 5-8 English bullet points (SUMMARY_EN)
   - 5-8 Czech bullet points (SUMMARY_CS)
   - Detailed feed items with URLs (FEED_EN)
   - Czech translations (FEED_CS)

2. **Parses the response** using section markers (`===SUMMARY_EN===`, etc.)

3. **Posts to webhook** with this JSON structure:
   ```json
   {
     "summary_en": ["bullet 1", "bullet 2", ...],
     "summary_cs": ["bullet 1", "bullet 2", ...],
     "feed_en": [
       {"title": "...", "description": "...", "source_url": "..."}
     ],
     "feed_cs": [...],
     "digest_date": "2025-12-12T08:00:00Z",
     "raw_response": "..."
   }
   ```

### Troubleshooting

**API Key Issues:**
- Verify key at https://www.perplexity.ai/settings/api
- Check you have credits available

**Parsing Errors:**
- The script logs the raw response on failure
- Check `/var/log/daily-digest.log` for details

**Webhook Errors:**
- Ensure `PERPLEXITY_WEBHOOK_SECRET` matches backend config
- Check backend logs: `docker compose logs backend`

### Cost Estimation

- Uses `sonar` model (~$1 per 1000 requests)
- One request per day = ~$0.03/month
- Use `sonar-pro` for better quality (~$5 per 1000 requests)

---

## Perplexity MCP Server (Claude Code Integration)

The same Perplexity API key can be used for Deep Research tasks directly in Claude Code via MCP.

### Installation (Already Configured)

The MCP server is configured in `~/.claude.json` under the project's `mcpServers`:

```json
"perplexity-search": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@jschuller/perplexity-mcp"],
  "env": {
    "PERPLEXITY_API_KEY": "pplx-xxx..."
  }
}
```

### Available Tools (after Claude Code restart)

After restarting Claude Code, you'll have access to:

| Tool | Description |
|------|-------------|
| `perplexity_search` | Quick web search with Sonar model |
| `perplexity_research` | Deep Research mode for comprehensive analysis |

### Usage Examples

**Quick Search:**
```
Search for the latest news about Claude 4 release
```

**Deep Research:**
```
Research the current state of AI code assistants in 2025,
compare Claude Code, Cursor, GitHub Copilot, and alternatives
```

### Model Options

| Model | Best For | Cost |
|-------|----------|------|
| `sonar` | Quick searches, daily digest | ~$1/1000 req |
| `sonar-pro` | Better quality, nuanced answers | ~$5/1000 req |
| `sonar-deep-research` | Comprehensive research reports | Higher |

### Workflow Integration

1. **Daily Digest**: Automated via cron script (this file's main topic)
2. **Ad-hoc Research**: Use MCP tools in Claude Code session
3. **Content Generation**: Combine with Gemini for research → content pipeline

Example workflow:
```
1. Use perplexity_research for topic deep dive
2. Pass research results to Gemini for content generation
3. Review and publish
```
