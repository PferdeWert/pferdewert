# Extended Guides

## Specialized Agents
- **pferdewert-frontend-dev**: Frontend development specialist
- **pferdewert-debugger**: Bug hunting and problem solving
- **pferdewert-code-reviewer**: Code quality and best practices review

## MCP Troubleshooting Guide
### Common MCP Setup Issues
1. **Package Namen verifizieren**: `npm search [package] mcp` vor Installation
2. **Korrekte Syntax**: `claude mcp add [name] --scope user --env KEY=value -- npx [package]`
3. **Das `--` ist KRITISCH** - trennt Claude-Flags von Server-Args
4. **API-Keys prüfen**: Viele MCP-Server brauchen Environment Variables
5. **Connection testen**: `claude mcp list` zeigt Status aller Server

## Voice Integration & Automation
- **Whisper Voice Bot**: Voice transcription → Claude Code CLI integration on Hetzner server
- **Notion Integration**: Voice-controlled diary entries and workspace management
- **Voice Bot Scripts**: `voice_bot.py`, `voice_bot_notion.py`, `notion_analyzer.py`

## Development Tools & Workflows
- **Visual Testing**: Always use Playwright MCP for frontend changes
- **Token Savings**: Use Gemini CLI for ESLint fixes, TypeScript types
- **Web Research**: Always use Firecrawl MCP for online searches and web scraping
- **SEO Management**: Always run `npm run sitemap` before deployment to update sitemap.xml & robots.txt

## Additional Documentation
For detailed coding standards and guidelines:
- **[frontend-guidelines.md](./frontend-guidelines.md)** - React/Next.js standards
- **[typescript-guidelines.md](./typescript-guidelines.md)** - TS/ESLint rules  
- **[design-guidelines.md](./design-guidelines.md)** - UI/UX patterns
- **[agents.md](./agents.md)** - pferdewert-* specialized agents
- **[gemini/setup.md](./gemini/setup.md)** - Gemini CLI setup and integration
- **[gemini/usage.md](./gemini/usage.md)** - Gemini CLI usage patterns for token savings
- **[notion-voice-setup.md](./notion-voice-setup.md)** - Complete Notion voice integration setup
- **[security-fixes.md](./security-fixes.md)** - Security implementation guide

## Server Access Details
- **Hetzner Server**: 167.235.233.90
- **SSH Access**: `ssh pferdewert-hetzner` (configured alias)
- **Alternative**: `ssh dev@167.235.233.90`
- **SSH Key**: `~/.ssh/hetzner_key`
- **Claude Access**: Available when started with `c` (alias for --dangerous-allow-all-permissions)
- **Server Specs**: Ubuntu 24.04.3 LTS, Python 3.12.3, Node.js v20.19.4