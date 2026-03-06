# OpenClaw Production Best Practices - Deep Research Report

**Research Date:** 21 February 2026  
**Sources:** docs.openclaw.ai, GitHub repo, Discord community, real-world deployments

---

## Executive Summary

OpenClaw is a self-hosted AI agent gateway connecting messaging platforms (WhatsApp, Telegram, Discord, Slack, etc.) to AI coding agents. This report consolidates production best practices from official documentation, community discussions, and real-world deployments, focusing on team workflows, quality gates, and common pitfalls.

**Key Findings:**
- Production setups favor VPS + Docker with security hardening via `openclaw security audit`
- Multi-agent coordination uses coordinator → specialist patterns with parallel execution
- Sub-agent pitfalls (half-finished tasks, cleanup issues) are the #1 production challenge
- Quality gates require explicit human approval workflows + automated verification
- Token bloat and session management are major cost/performance concerns

---

## Top 10 Lessons Learned

### 1. **Context Bloat Kills Performance**
Session history files grow unchecked, causing:
- 30-50% unnecessary token usage
- Slow responses (full transcripts resent per prompt)
- Rate limit hits on simple tasks

**Solution:**
- Use `/new` for separate tasks
- Run `/compact` to summarize long threads
- Set up periodic session resets in cron
- Offload large file processing to sub-agents (summary only back)

### 2. **Sub-Agents Need Explicit Cleanup**
Default `cleanup: "keep"` leaves sessions lingering; auto-archive is 60 minutes.

**Best Practice:**
```javascript
sessions_spawn({
  task: "Research competitor",
  runTimeoutSeconds: 300,
  cleanup: "delete"  // Archives immediately after announce
})
```

Monitor with `/subagents list`, kill stale sessions with `/subagents kill all`.

### 3. **Sandbox Mode Is Misunderstood**
`sandbox.mode: "non-main"` bases on `session.mainKey` (not agent ID), so group/channel sessions sandbox unexpectedly.

**Fix:** Override per-agent:
```json
{
  "agents": {
    "list": [{
      "id": "personal",
      "sandbox": {"mode": "off"}
    }, {
      "id": "public",
      "sandbox": {"mode": "all"}
    }]
  }
}
```

### 4. **Tool Deny Lists Don't Work as Expected**
Filtering order: global → agent → sandbox → subagent. Each level restricts further but **cannot re-grant**.

**Verify:** Check logs for `[tools] filtering tools for agent:${agentId}`.

### 5. **DM Access Is a Security Landmine**
Default `dmPolicy="pairing"` is safe, but `dmPolicy="open"` with `allowFrom: ["*"]` exposes full tool access to unknown senders.

**Production Standard:**
- Always use pairing or explicit allowlists
- Run `openclaw doctor` to surface risky DM policies
- Require mentions in groups: `requireMention: true`

### 6. **Heartbeats Without `NO_REPLY` Spam Transcripts**
Always-on heartbeats generate noise, bloating context and costs.

**Solution:**
```json
{
  "heartbeat": {
    "enabled": true,
    "intervalMinutes": 10,
    "message": "Check server status",
    "announce": {"replyMode": "NO_REPLY"}
  }
}
```

### 7. **Uncontrolled Nesting Causes Runaway Spawns**
Default `maxSpawnDepth: 1`; enabling depth 2 risks runaway if `maxChildrenPerAgent` (default 5) is exceeded.

**Limit:**
```json
{
  "agents": {
    "defaults": {
      "subagents": {
        "maxSpawnDepth": 2,
        "maxChildrenPerAgent": 3,
        "maxConcurrent": 8
      }
    }
  }
}
```

### 8. **File Permissions Break Production**
World-readable `~/.openclaw` or missing 600 on credentials causes security audit failures.

**Auto-Fix:**
```bash
openclaw security audit --deep --fix
chmod 700 ~/.openclaw
chmod 600 ~/.openclaw/openclaw.json
chmod 600 ~/.openclaw/credentials/**/*
```

### 9. **Migration from ClawdBot Leaves Dual Services**
Port 18789 conflicts, token mismatches (HTTP 401), dashboard inaccessible.

**Clean Migration:**
```bash
systemctl --user stop clawdbot-gateway.service
npm uninstall -g clawdbot
rm -rf ~/.config/systemd/user/clawdbot*
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### 10. **Timeout Handling Is Non-Obvious**
`runTimeoutSeconds` aborts but doesn't trigger cleanup—session persists until auto-archive.

**Best Practice:**
- Always set timeout: `runTimeoutSeconds: 600`
- Combine with `cleanup: "delete"`
- Monitor via `/subagents info <id>`

---

## Production Setup Recommendations

### 1. VPS Docker Deployment (Hetzner Example)

**Minimal ~$5/month VPS:**
```bash
# Provision Ubuntu/Debian VPS
ssh root@your-vps-ip

# Install Docker
curl -fsSL https://get.docker.com | sh

# Clone repo
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# Create persistent dirs
mkdir -p /root/.openclaw
chown 1000:1000 /root/.openclaw

# Set environment
cat > .env << EOF
OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)
BIND=lan
PORT=18789
NODE_ENV=production
EOF

# Configure docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'
services:
  gateway:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:18789:18789"
    volumes:
      - /root/.openclaw:/home/node/.openclaw
    environment:
      - NODE_ENV=production
EOF

# Build and start
docker compose up -d

# Verify
docker compose logs -f
# Expect: "[gateway] listening on ws://0.0.0.0:18789"

# SSH tunnel for access
ssh -L 18789:127.0.0.1:18789 root@your-vps-ip
# Open: http://127.0.0.1:18789/
```

### 2. Security Hardening Checklist

**Essential Controls:**
```json
{
  "gateway": {
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "<long-random-token>"
    }
  },
  "channels": {
    "whatsapp": {
      "allowFrom": ["+1234567890"],
      "dmPolicy": "pairing",
      "groups": {
        "*": {"requireMention": true}
      }
    }
  },
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main",
        "scope": "agent",
        "workspaceAccess": "rw"
      }
    }
  },
  "tools": {
    "deny": ["group:automation", "gateway", "cron"],
    "elevated": {"enabled": false},
    "fs": {"workspaceOnly": true}
  },
  "logging": {
    "redactSensitive": "tools"
  }
}
```

**Audit Routine:**
```bash
# Weekly security audit
openclaw security audit --deep --fix

# Check for:
# - World-readable ~/.openclaw (fix to 700/600)
# - No-auth binds
# - Open DMs without pairing
# - Sandbox misconfigs
# - Policy drift
```

**Firewall (UFW):**
```bash
ufw default deny incoming
ufw allow ssh
ufw allow 41641/udp  # Tailscale
ufw enable
```

### 3. Tailscale Access (Recommended)

**Gateway-only HTTPS:**
```json
{
  "gateway": {
    "bind": "loopback",
    "tailscale": {
      "mode": "serve",  // tailnet-only
      "resetOnExit": true
    },
    "auth": {
      "mode": "token",
      "allowTailscale": true
    }
  }
}
```

**Public Funnel (requires password):**
```json
{
  "gateway": {
    "tailscale": {
      "mode": "funnel"
    },
    "auth": {
      "mode": "password",
      "password": "<strong-password>"
    }
  }
}
```

---

## Team Workflows

### Coordinator → Specialist Pattern

**Architecture:**
```
Main Agent (Coordinator)
  ├─ spawns → Research Agent (specialist)
  ├─ spawns → Analysis Agent (specialist)
  └─ spawns → Report Agent (specialist)
```

**Implementation:**
```javascript
// Coordinator prompt
"You are a coordinator agent. Break down complex tasks, 
delegate to specialists via sessions_spawn, and synthesize results."

// Example: Morning briefing
const tasks = [
  {task: "Fetch weather", model: "gpt-4o-mini"},
  {task: "Summarize calendar", model: "gpt-4o-mini"},
  {task: "Check critical emails", model: "claude-sonnet-4.5"},
  {task: "News headlines", model: "gpt-4o-mini"}
];

// Spawn parallel (reduces 36s sequential → 20s)
for (const t of tasks) {
  await sessions_spawn({
    ...t,
    runTimeoutSeconds: 300,
    cleanup: "delete",
    announce: {channel: "telegram", to: "channel:main"}
  });
}

// Main agent waits for announces, compiles report
```

**Fan-Out/Fan-In Example:**
```javascript
// Market analysis: 5 competitors
const competitors = ["A", "B", "C", "D", "E"];

// Fan-out (parallel)
competitors.forEach(c => 
  sessions_spawn({
    task: `Research ${c}: pricing, reviews, features`,
    model: "gpt-4o-mini",
    runTimeoutSeconds: 600,
    cleanup: "delete"
  })
);

// Fan-in: Main agent receives announces, synthesizes report
```

### Team Coordination Config

**Multi-Agent Routing:**
```json
{
  "agents": {
    "list": [
      {
        "id": "personal",
        "workspace": "~/.openclaw/agents/personal",
        "model": "anthropic/claude-opus-4-6",
        "sandbox": {"mode": "off"},
        "bindings": [
          {"type": "peer", "channel": "whatsapp", "value": "+1234567890"}
        ]
      },
      {
        "id": "ops",
        "workspace": "~/.openclaw/agents/ops",
        "model": "openai/gpt-4o-mini",
        "sandbox": {"mode": "all"},
        "tools": {
          "allow": ["read", "exec"],
          "deny": ["write", "browser"]
        },
        "bindings": [
          {"type": "channel", "channel": "slack", "value": "channel:ops-team"}
        ]
      },
      {
        "id": "qa",
        "workspace": "~/.openclaw/agents/qa",
        "model": "openai/gpt-4o",
        "sandbox": {"mode": "all", "workspaceAccess": "ro"},
        "tools": {"allow": ["read"], "deny": ["exec", "write"]},
        "bindings": [
          {"type": "account", "channel": "discord", "value": "qa-bot"}
        ]
      }
    ]
  }
}
```

**Verify Bindings:**
```bash
openclaw agents list --bindings
docker ps  # Check sandbox containers
```

---

## Quality Gates & Verification

### 1. Human Approval Workflows

**Lobster Multi-Step Pipeline:**
```javascript
// Workflow with approval gate
const workflow = {
  steps: [
    {action: "draft_email", params: {to: "client@example.com"}},
    {action: "approval_gate", prompt: "Send 2 draft replies?"},
    {action: "send_email"}
  ]
};

// Pauses at approval gate, returns:
{
  requiresApproval: true,
  prompt: "Send 2 draft replies?",
  resumeToken: "abc123..."
}

// User approves via:
{
  action: "resume",
  token: "abc123...",
  approve: true  // or false to cancel
}
```

**Exec Approvals (Command Guardrails):**
```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "ask": "on-miss"  // Prompt for new commands
    }
  }
}
```

Prompts show: `Allow once`, `Always allow` (adds to allowlist), or `Deny`.

### 2. Automated QA Agent

**Pre-Deploy Config Audit:**
```javascript
// QA agent prompt
"Audit this OpenClaw config for security issues:
- Missing sandbox on non-main agents
- Weak auth (no token/password)
- Open DM policy without allowlist
- Exec tool enabled without approval
- World-writable state dirs

Output: {risk: 'CRITICAL|HIGH|MEDIUM|LOW', issues: [...], fixes: [...]}"
```

**Example CI Integration:**
```yaml
# .github/workflows/deploy.yml
- name: Security Audit
  run: |
    openclaw security audit --deep --json > audit.json
    if grep -q "CRITICAL" audit.json; then
      echo "::error::Critical security issues found"
      exit 1
    fi
    
- name: QA Agent Review
  run: |
    openclaw agent --agent qa --message "Review config: $(cat openclaw.json)" > qa-report.md
    if grep -q "BLOCK" qa-report.md; then
      exit 1
    fi
```

### 3. Verification Checklist

**Pre-Deploy:**
- [ ] `openclaw security audit --deep` passes (no CRITICAL)
- [ ] File permissions: `~/.openclaw` (700), `openclaw.json` (600), credentials (600)
- [ ] Gateway bind: loopback only (`bind: "127.0.0.1"`)
- [ ] Auth mode: `token` or `password` (not `none`)
- [ ] DM policy: `pairing` or explicit allowlist (not `open` + `["*"]`)
- [ ] Sandbox mode: `"non-main"` or `"all"` for public agents
- [ ] Tool deny list: includes `["gateway", "cron", "exec"]` for untrusted
- [ ] Elevated exec: disabled or sender-gated
- [ ] Secrets: not in config (use env vars or key vault)

**Post-Deploy:**
- [ ] `openclaw status --deep` shows all channels connected
- [ ] Test message flow: send DM, verify response
- [ ] Sub-agent spawn: `/subagents spawn --task "health check"`
- [ ] Cron job: verify first run within schedule window
- [ ] Logs: `tail -f /tmp/openclaw/openclaw-*.log` (no errors)
- [ ] Resource usage: CPU <50%, memory <2GB, disk <5GB

**Ongoing Monitoring:**
- [ ] Weekly: `openclaw security audit --deep --fix`
- [ ] Daily: Check `/subagents list` for stuck sessions
- [ ] Daily: Review error rate (`openclaw logs --level error`)
- [ ] Weekly: Session cleanup (`/compact` or `/new` in long threads)
- [ ] Monthly: Token usage analysis (optimize context)

---

## Sub-Agent Management Best Practices

### Pitfalls & Solutions

| **Pitfall** | **Symptom** | **Solution** |
|-------------|-------------|-------------|
| **Half-Finished Tasks** | Sub-agent times out mid-task, no result | Set `runTimeoutSeconds` generously (600+), monitor `/subagents info` |
| **Cleanup Neglect** | Sessions linger for 60min, waste resources | Use `cleanup: "delete"` on spawn, kill manually if stuck |
| **Context Blindness** | Sub-agents lack SOUL.md/USER.md, behave generically | Inject context via `message` field, not workspace files |
| **Runaway Spawning** | Depth-2 orchestrator spawns 50 workers | Limit `maxChildrenPerAgent: 3`, `maxSpawnDepth: 2` |
| **Timeout ≠ Cleanup** | Timed-out session persists until auto-archive | Combine timeout with `cleanup: "delete"` |
| **Announce Delivery Loss** | Gateway restart loses pending announces | Use persistent channels (e.g., Telegram) for critical results |
| **Tool Availability** | Sub-agent can't access browser despite allow | Check sandbox filters: global → agent → sandbox → subagent |
| **Concurrency Overload** | 20 sub-agents hit resource limits | Cap `maxConcurrent: 8`, use cheaper models |

### Recommended Patterns

**1. Research Fan-Out:**
```javascript
// Coordinator spawns 5 research agents
const topics = ["Topic A", "Topic B", "Topic C", "Topic D", "Topic E"];
topics.forEach(t => 
  sessions_spawn({
    task: `Research ${t} thoroughly`,
    model: "gpt-4o-mini",  // Cheaper for parallelism
    runTimeoutSeconds: 600,
    cleanup: "delete"
  })
);

// Main waits for 5 announces, compiles report
```

**2. Pipeline (Sequential Handoff):**
```javascript
// Step 1: Fetch data
const dataSession = await sessions_spawn({
  task: "Fetch competitor data from API",
  cleanup: "keep"  // Persist for next step
});

// Step 2: Analyze (after announce)
const analysisSession = await sessions_spawn({
  task: `Analyze data from session ${dataSession.sessionKey}`,
  cleanup: "keep"
});

// Step 3: Report (after both)
await sessions_spawn({
  task: "Compile final report",
  cleanup: "delete"
});
```

**3. Specialist Routing:**
```javascript
// Main agent routes by topic
const task = userRequest.toLowerCase();

if (task.includes("security")) {
  sessions_spawn({agent: "security-specialist", task, cleanup: "delete"});
} else if (task.includes("performance")) {
  sessions_spawn({agent: "perf-specialist", task, cleanup: "delete"});
} else {
  sessions_spawn({agent: "general", task, cleanup: "delete"});
}
```

### Monitoring Commands

```bash
# List all sub-agents (active + recent)
openclaw subagents list

# Detailed info
openclaw subagents info <session-id>

# View logs
openclaw subagents log <session-id> --limit 100

# Kill stuck session
openclaw subagents kill <session-id>

# Kill all
openclaw subagents kill all

# Check concurrency
openclaw status --json | jq '.subagents.active'
```

---

## Automated Verification & Monitoring

### 1. Cron Health Checks

**Hourly Server Check:**
```bash
openclaw cron add \
  --name "Server health" \
  --cron "0 * * * *" \
  --session isolated \
  --message "Check CPU, memory, disk. Alert if >80%." \
  --announce \
  --channel telegram \
  --to "channel:ops"
```

**Daily Backup Verification:**
```bash
openclaw cron add \
  --name "Backup check" \
  --cron "0 6 * * *" \
  --tz "America/Los_Angeles" \
  --session isolated \
  --message "Verify last backup completed. Check S3 timestamp." \
  --announce \
  --channel slack \
  --to "channel:devops"
```

**Deployment Validation (One-Shot):**
```bash
openclaw cron add \
  --name "Deploy validation" \
  --at "2026-02-21T20:00:00Z" \
  --session isolated \
  --message "Test production endpoints. Verify API responses." \
  --announce \
  --channel discord \
  --to "channel:deployments" \
  --delete-after-run
```

### 2. Webhook Triggers

**GitHub PR Review:**
```bash
# Webhook endpoint: https://your-vps.ts.net/webhook/github-pr

# In GitHub webhook settings:
# Payload URL: https://your-vps.ts.net/webhook/github-pr
# Content type: application/json
# Events: Pull requests

# OpenClaw config:
{
  "webhook": {
    "enabled": true,
    "routes": {
      "/github-pr": {
        "agent": "code-reviewer",
        "message": "Review PR: {{body.pull_request.html_url}}"
      }
    }
  }
}
```

**Sentry Error Alerts:**
```json
{
  "webhook": {
    "routes": {
      "/sentry-error": {
        "agent": "ops",
        "message": "Investigate: {{body.message}}. Stacktrace: {{body.exception}}",
        "announce": {
          "channel": "slack",
          "to": "channel:incidents"
        }
      }
    }
  }
}
```

### 3. Monitoring Dashboard

**Custom Script (cron every 5min):**
```bash
#!/bin/bash
# /usr/local/bin/openclaw-monitor.sh

STATUS=$(openclaw status --json)

# Extract metrics
ACTIVE_SESSIONS=$(echo "$STATUS" | jq '.sessions.active')
SUBAGENT_COUNT=$(echo "$STATUS" | jq '.subagents.active')
ERROR_RATE=$(openclaw logs --level error --since 5m | wc -l)

# Alert thresholds
if [ "$ERROR_RATE" -gt 10 ]; then
  openclaw message send \
    --channel telegram \
    --to "+1234567890" \
    --message "⚠️ High error rate: $ERROR_RATE in 5min"
fi

if [ "$SUBAGENT_COUNT" -gt 15 ]; then
  openclaw message send \
    --channel telegram \
    --to "+1234567890" \
    --message "⚠️ High sub-agent count: $SUBAGENT_COUNT"
fi

# Log for dashboard
echo "$(date),${ACTIVE_SESSIONS},${SUBAGENT_COUNT},${ERROR_RATE}" >> /var/log/openclaw-metrics.csv
```

**Add to crontab:**
```bash
*/5 * * * * /usr/local/bin/openclaw-monitor.sh
```

### 4. Health Check Endpoint

**External Monitoring (UptimeRobot, Pingdom):**
```bash
# Endpoint: http://127.0.0.1:18789/health (via Tailscale or SSH tunnel)

# Returns:
{
  "status": "ok",
  "channels": {
    "whatsapp": "connected",
    "telegram": "connected"
  },
  "sessions": 3,
  "uptime": "7d 4h 23m"
}

# Monitor via curl:
curl -H "Authorization: Bearer $OPENCLAW_TOKEN" http://127.0.0.1:18789/health
```

---

## Common Mistakes & How to Avoid

### 1. **Token Bloat**

**Mistake:** Full session history resent every prompt.

**Impact:** 3x cost, 2x latency, rate limits.

**Fix:**
- Use `/compact` every 20-30 messages
- Use `/new` for unrelated tasks
- Disable excessive skills in config
- Offload large files to sub-agents (summary only)

**Example Config:**
```json
{
  "agents": {
    "defaults": {
      "compaction": {
        "mode": "safeguard",
        "maxMessagesBeforeCompact": 30
      }
    }
  }
}
```

### 2. **Placeholder Content Shipped**

**Mistake:** Agent generates `TODO: Add implementation` code, gets deployed.

**Impact:** Broken features, production outages.

**Fix:**
- Add QA agent review before merge
- Use grep in CI: `grep -r "TODO\|FIXME\|XXX" . && exit 1`
- Human approval gate for critical paths

**Example CI:**
```yaml
- name: Check for placeholders
  run: |
    if grep -rE "TODO|FIXME|XXX|PLACEHOLDER" src/; then
      echo "::error::Placeholder content found"
      exit 1
    fi
```

### 3. **Broken Deploys (No Validation)**

**Mistake:** Deploy succeeds, but services crash on first request.

**Impact:** Downtime, rollback required.

**Fix:**
- Smoke tests post-deploy
- Health check before traffic routing
- Canary deployments (10% traffic first)

**Example Validation:**
```bash
# Post-deploy script
set -e

# Wait for service
for i in {1..30}; do
  if curl -f http://localhost:8080/health; then
    break
  fi
  sleep 2
done

# Run smoke tests
npm run test:smoke

# Validate critical endpoints
curl -f http://localhost:8080/api/users
curl -f http://localhost:8080/api/orders

echo "✅ Deploy validated"
```

### 4. **Missed Deadlines (Sub-Agent Stuck)**

**Mistake:** Sub-agent runs forever, main task never completes.

**Impact:** SLA breach, customer impact.

**Fix:**
- Always set `runTimeoutSeconds`
- Monitor `/subagents list` in cron
- Alert on sessions >10min active

**Example Monitor:**
```bash
# Cron every 10min
STUCK=$(openclaw subagents list --json | jq '[.[] | select(.duration > 600)] | length')
if [ "$STUCK" -gt 0 ]; then
  openclaw message send --to "+1234567890" --message "⚠️ $STUCK stuck sub-agents"
fi
```

### 5. **Secrets in Config**

**Mistake:** API keys in `openclaw.json`, committed to Git.

**Impact:** Credential leak, security breach.

**Fix:**
- Use env vars: `ANTHROPIC_API_KEY`
- Secret scanning in CI (detect-secrets)
- Rotate compromised keys immediately

**Example CI:**
```yaml
- name: Secret scan
  run: |
    pip install detect-secrets
    detect-secrets scan --baseline .secrets.baseline
```

### 6. **No Rate Limiting**

**Mistake:** Agent makes 1000 API calls in parallel, gets banned.

**Impact:** Service disruption, manual unban required.

**Fix:**
- Limit sub-agent concurrency: `maxConcurrent: 8`
- Add delays in loops: `await sleep(1000)`
- Use bulk APIs where available

### 7. **Log Overflow**

**Mistake:** Verbose logging fills disk in 24h.

**Impact:** Service crash, manual cleanup.

**Fix:**
- Rotate logs: `logrotate` config
- Set log level: `logging.level: "warn"`
- Redact sensitive data: `logging.redactSensitive: "tools"`

**Example logrotate:**
```
/tmp/openclaw/openclaw-*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
```

---

## Copy-Paste Example Workflows

### 1. Morning Team Briefing

**Goal:** Automated daily summary to Telegram at 7am.

```bash
openclaw cron add \
  --name "Morning briefing" \
  --cron "0 7 * * *" \
  --tz "America/Los_Angeles" \
  --session isolated \
  --message "Compile: weather, calendar (next 3 events), top 5 unread emails, news headlines (tech)" \
  --announce \
  --channel telegram \
  --to "channel:team"
```

### 2. GitHub PR Review Bot

**Goal:** Auto-review PRs on webhook, post comments.

```json
{
  "webhook": {
    "enabled": true,
    "routes": {
      "/github-pr": {
        "agent": "code-reviewer",
        "message": "Review PR: {{body.pull_request.html_url}}. Check: security, tests, performance. Post GitHub comment with findings.",
        "announce": {"replyMode": "NO_REPLY"}
      }
    }
  },
  "agents": {
    "list": [{
      "id": "code-reviewer",
      "model": "anthropic/claude-opus-4-6",
      "workspace": "~/.openclaw/agents/code-reviewer",
      "sandbox": {"mode": "all"},
      "tools": {
        "allow": ["read", "web_fetch", "web_search"],
        "deny": ["exec", "write"]
      }
    }]
  }
}
```

**GitHub webhook:** `https://your-vps.ts.net/webhook/github-pr`

### 3. Server Monitoring with Auto-Fix

**Goal:** Check server health every 10min, auto-fix minor issues.

```bash
openclaw cron add \
  --name "Server monitor" \
  --cron "*/10 * * * *" \
  --session isolated \
  --agent ops \
  --message "Check: CPU, memory, disk, Docker containers. If disk >90%, clear /tmp. If any service down, attempt restart. Report status."
```

**Ops Agent Config:**
```json
{
  "agents": {
    "list": [{
      "id": "ops",
      "model": "openai/gpt-4o",
      "sandbox": {"mode": "off"},
      "tools": {
        "allow": ["exec", "read"],
        "deny": ["write"]
      }
    }]
  }
}
```

### 4. Customer Support Triage

**Goal:** WhatsApp messages auto-routed to support agent.

```json
{
  "agents": {
    "list": [{
      "id": "support",
      "model": "openai/gpt-4o-mini",
      "workspace": "~/.openclaw/agents/support",
      "sandbox": {"mode": "all"},
      "tools": {
        "allow": ["read", "web_search"],
        "deny": ["exec", "write"]
      },
      "bindings": [
        {"type": "channel", "channel": "whatsapp", "value": "support-number"}
      ]
    }]
  },
  "channels": {
    "whatsapp": {
      "allowFrom": ["*"],
      "dmPolicy": "open"
    }
  }
}
```

### 5. Multi-Agent Research Pipeline

**Goal:** Coordinator → 3 specialists → synthesized report.

```javascript
// Main coordinator agent receives: "Research AI coding agents market"

// Step 1: Decompose
const tasks = [
  "Research competitors: pricing, features, market share",
  "Analyze customer reviews: pain points, praise",
  "Summarize tech trends: LLMs, agent frameworks, tooling"
];

// Step 2: Fan-out to specialists
const sessionKeys = [];
for (const task of tasks) {
  const result = await sessions_spawn({
    agent: "research-specialist",
    task: task,
    model: "gpt-4o-mini",
    runTimeoutSeconds: 600,
    cleanup: "keep"  // Keep for synthesis
  });
  sessionKeys.push(result.sessionKey);
}

// Step 3: Wait for announces (automatic)
// OpenClaw delivers announces back to coordinator

// Step 4: Synthesize
const synthesisResult = await sessions_spawn({
  task: `Synthesize market research from sessions: ${sessionKeys.join(", ")}. Create executive summary, SWOT, recommendations.`,
  model: "anthropic/claude-opus-4-6",
  runTimeoutSeconds: 300,
  cleanup: "delete"
});

// Step 5: Deliver final report
return synthesisResult;
```

### 6. CI/CD Integration

**Goal:** Watch main branch, alert on failures.

```json
{
  "webhook": {
    "routes": {
      "/github-ci": {
        "agent": "ci-monitor",
        "message": "CI failed: {{body.workflow.name}} on {{body.repository.name}}. Check: {{body.workflow_run.html_url}}",
        "announce": {
          "channel": "slack",
          "to": "channel:engineering"
        }
      }
    }
  }
}
```

**GitHub Action:**
```yaml
# .github/workflows/ci.yml
on:
  push:
    branches: [main]
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  notify-openclaw:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    steps:
      - name: Send to OpenClaw
        run: |
          curl -X POST https://your-vps.ts.net/webhook/github-ci \
            -H "Content-Type: application/json" \
            -d @- << EOF
          {
            "workflow": {"name": "${{ github.workflow }}"},
            "repository": {"name": "${{ github.repository }}"},
            "workflow_run": {"html_url": "${{ github.event.workflow_run.html_url }}"}
          }
          EOF
```

---

## Quality Gates Checklist

### Pre-Commit
- [ ] Run `pnpm build && pnpm check && pnpm test`
- [ ] TypeScript types pass
- [ ] Linter passes (no errors)
- [ ] Formatter applied
- [ ] Secret scan clean (detect-secrets)
- [ ] No `TODO`/`FIXME`/`PLACEHOLDER` in critical paths

### Pre-Deploy
- [ ] `openclaw security audit --deep` passes
- [ ] File permissions correct (700/600)
- [ ] Gateway bind: loopback only
- [ ] Auth mode: token or password (not none)
- [ ] DM policy: pairing or allowlist (not open + *)
- [ ] Sandbox enabled for non-main agents
- [ ] Tool deny list includes high-risk tools
- [ ] Secrets in env vars (not config)
- [ ] Config validated: `openclaw config validate`
- [ ] Backup taken of current state

### Post-Deploy
- [ ] `openclaw status --deep` green
- [ ] All channels connected
- [ ] Test message flow (send/receive)
- [ ] Sub-agent spawn test passes
- [ ] Cron jobs running (check next run time)
- [ ] No errors in logs (past 10min)
- [ ] Resource usage normal (CPU <50%, mem <2GB)
- [ ] Health endpoint responding
- [ ] Monitoring alerts configured

### Daily Operations
- [ ] Check error rate (`openclaw logs --level error --since 24h | wc -l`)
- [ ] Review stuck sub-agents (`/subagents list`)
- [ ] Token usage within budget
- [ ] Disk space >20% free
- [ ] Session count <100

### Weekly Maintenance
- [ ] Run `openclaw security audit --deep --fix`
- [ ] Rotate logs (if manual)
- [ ] Review token usage trends
- [ ] Clean up old sessions (`/compact` in long threads)
- [ ] Update OpenClaw if new version
- [ ] Backup configuration files

### Monthly Review
- [ ] Audit allowlists (remove inactive users)
- [ ] Review tool usage patterns
- [ ] Optimize context/compaction settings
- [ ] Update skills (check for new versions)
- [ ] Credential rotation (API keys, tokens)
- [ ] Disaster recovery test (restore from backup)

---

## Concrete Recommendations

### For Small Teams (1-5 people)

**Setup:**
- Single VPS ($5-10/month Hetzner/DigitalOcean)
- Docker deployment
- Tailscale Serve for access
- One personal agent + one shared agent

**Config:**
```json
{
  "agents": {
    "list": [
      {
        "id": "personal",
        "model": "anthropic/claude-opus-4-6",
        "sandbox": {"mode": "off"},
        "bindings": [{"type": "peer", "channel": "telegram", "value": "@you"}]
      },
      {
        "id": "team",
        "model": "openai/gpt-4o",
        "sandbox": {"mode": "all"},
        "tools": {"allow": ["read", "web_search"], "deny": ["exec"]},
        "bindings": [{"type": "channel", "channel": "slack", "value": "channel:general"}]
      }
    ]
  }
}
```

**Automation:**
- Daily team briefing (7am)
- Weekly backup reminder (Friday 5pm)
- Server health check (every 10min)

### For Medium Teams (5-20 people)

**Setup:**
- VPS with 4GB RAM + Docker
- Multiple specialized agents (ops, support, code-review, qa)
- Webhook integrations (GitHub, Sentry, Slack)
- Sub-agent coordination for complex tasks

**Config:**
```json
{
  "agents": {
    "list": [
      {"id": "ops", "bindings": [{"channel": "slack", "value": "channel:ops"}]},
      {"id": "support", "bindings": [{"channel": "whatsapp", "value": "support-number"}]},
      {"id": "code-review", "bindings": [{"channel": "webhook", "value": "/github-pr"}]},
      {"id": "qa", "tools": {"allow": ["read"], "deny": ["exec", "write"]}}
    ],
    "defaults": {
      "subagents": {
        "maxSpawnDepth": 2,
        "maxConcurrent": 8
      }
    }
  }
}
```

**Automation:**
- PR auto-review (GitHub webhook)
- Error alert triage (Sentry webhook)
- Daily ops summary (6am)
- Weekly cost report (Monday 9am)

### For Large Teams (20+ people)

**Setup:**
- Dedicated VPS (8GB+ RAM) or Kubernetes cluster
- 5+ specialized agents with isolated workspaces
- Full CI/CD integration
- Monitoring dashboard + alerting
- Disaster recovery plan

**Config:**
```json
{
  "agents": {
    "list": [
      {"id": "ops", "model": "openai/gpt-4o", "sandbox": {"mode": "agent"}},
      {"id": "support", "model": "openai/gpt-4o-mini", "sandbox": {"mode": "agent"}},
      {"id": "code-review", "model": "anthropic/claude-opus-4-6", "sandbox": {"mode": "all"}},
      {"id": "qa", "model": "openai/gpt-4o", "sandbox": {"mode": "all"}},
      {"id": "security", "model": "anthropic/claude-opus-4-6", "sandbox": {"mode": "all"}},
      {"id": "coordinator", "model": "anthropic/claude-opus-4-6", "sandbox": {"mode": "off"}}
    ],
    "defaults": {
      "subagents": {
        "maxSpawnDepth": 3,
        "maxConcurrent": 20,
        "model": "openai/gpt-4o-mini"
      }
    }
  },
  "cron": {
    "enabled": true,
    "maxConcurrentRuns": 5
  }
}
```

**Automation:**
- All PR auto-reviewed with security scan
- Incident auto-triage (Sentry/PagerDuty)
- Daily ops dashboard (6am)
- Hourly health checks with auto-fix
- Weekly cost optimization report

---

## Resources & Next Steps

### Essential Links
- **Official Docs:** https://docs.openclaw.ai
- **GitHub Repo:** https://github.com/openclaw/openclaw
- **Discord Community:** https://discord.gg/clawd
- **ClawHub (Skills):** https://clawhub.com

### Recommended Reading Order
1. [Getting Started](https://docs.openclaw.ai/start/getting-started)
2. [Security Guide](https://docs.openclaw.ai/gateway/security)
3. [Configuration Reference](https://docs.openclaw.ai/gateway/configuration)
4. [Sub-Agents](https://docs.openclaw.ai/concepts/subagents)
5. [Cron Automation](https://docs.openclaw.ai/automation/cron-jobs)

### Community Patterns
- **DAPERL Workflow:** Detection → Analysis → Planning → Execution → Review → Learning
- **Coordinator Pattern:** Main agent → specialist sub-agents → synthesis
- **Quality Gates:** Human approval + automated QA + post-deploy validation

### Tools & Extensions
- **openclaw-mem:** Local ledger for context packing
- **Cybercentry:** Pre-deploy security audits via ACP
- **claw-dash:** Monitoring dashboard
- **Antfarm:** Multi-agent team builder

---

## Conclusion

OpenClaw production deployments succeed when teams:
1. **Invest in security hardening** (audit, sandbox, DM pairing)
2. **Manage context aggressively** (/compact, /new, sub-agent summaries)
3. **Set explicit timeouts and cleanup** for sub-agents
4. **Implement quality gates** (QA agents, human approvals, CI checks)
5. **Monitor continuously** (cron health checks, error alerts, token tracking)

The #1 mistake is treating OpenClaw like a toy—production requires the same rigor as any infrastructure service: configuration management, monitoring, incident response, and continuous improvement.

**Start small, harden early, automate incrementally.**

---

*Report compiled from 10+ sources including official documentation, GitHub discussions, Discord community patterns, and real-world production deployments. Last updated: 21 Feb 2026.*
