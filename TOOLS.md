---
summary: "Workspace template for TOOLS.md"
read_when:
  - Bootstrapping a workspace manually
---

# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Web search defaults (OpenClaw)

- **Default web search provider:** Perplexity via **OpenRouter** (`https://openrouter.ai/api/v1`)
- **Normal web_search model:** `perplexity/sonar-pro-search`
- **When Bart or Lisa explicitly asks for "Deep Research":** use `perplexity/sonar-deep-research` (also via OpenRouter).
- **Deep research output:** always save as a **`.md`** file in the workspace and share it in Discord.

Add whatever helps you do your job. This is your cheat sheet.