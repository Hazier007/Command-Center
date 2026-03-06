# OpenClaw op een VPS — de grootste veiligheidsfouten (en hoe je ze vermijdt)

Datum: 2026-02-10

## TL;DR (topfouten)
1. **Control UI / Gateway publiek exposen** (0.0.0.0 / reverse proxy zonder harde auth).
2. **`gateway.controlUi.allowInsecureAuth=true`** gebruiken buiten “break-glass” situaties.
3. **Reverse proxy zonder `gateway.trustedProxies`** (kan “local-client trust”/auth omzeilen of fout interpreteren).
4. **Secrets in chat, logs, of world-readable files** (Discord tokens, API keys, auth-profiles.json).
5. **Te brede tool-permissies** (elevated tools/exec aan in ‘open’ kamers) → prompt injection wordt meteen impactvol.

---

## 1) Control UI / Gateway publiek toegankelijk maken
**Wat gaat fout**
- Mensen zetten de OpenClaw Gateway/Control UI op een publiek IP (of achter een reverse proxy) en laten hem bereikbaar vanaf het internet.
- Gevolg: iedereen die je endpoint vindt (port scan/Shodan/Censys) kan proberen binnen te geraken; als auth/misconfig aanwezig is kan dit leiden tot credential leaks en/of tool-misbruik.

**Waarom gevaarlijk**
- De Control UI geeft toegang tot beheerfuncties (config, sessies, logs). OpenClaw zelf waarschuwt hiervoor in de security audit en docs.

**Best practice**
- Bind **loopback** waar mogelijk (localhost-only) en expose enkel via een veilige tunnel (bv. Tailscale Serve).
- Als je toch extern moet: **sterke gateway auth** (password/token) + firewall allowlist.

**Bron**
- OpenClaw security docs (Control UI secure context + threat model): https://docs.openclaw.ai/gateway/security

---

## 2) `gateway.controlUi.allowInsecureAuth=true` (insecure HTTP auth)
**Wat gaat fout**
- `allowInsecureAuth=true` laat token-only auth over HTTP toe en **skipt device identity checks**.

**Waarom gevaarlijk**
- Dit is expliciet een **security downgrade**. In OpenClaw’s eigen audit is dit een **CRITICAL** finding.

**Best practice**
- Laat dit **uit**.
- Gebruik HTTPS (bv. Tailscale Serve) of open de UI enkel op 127.0.0.1.

**Bron**
- OpenClaw security docs: https://docs.openclaw.ai/gateway/security
- Lokale audit-output op deze VPS (CRITICAL): `gateway.control_ui.insecure_auth`

---

## 3) Reverse proxy misconfig (geen `gateway.trustedProxies`)
**Wat gaat fout**
- Je zet nginx/Caddy/Traefik ervoor, maar configureert `gateway.trustedProxies` niet.

**Waarom gevaarlijk**
- Client-IP detectie en “local-client checks” kunnen fout lopen.
- OpenClaw raadt aan om trusted proxies expliciet te zetten en dat je proxy headers **overwrites** (niet append) om spoofing te vermijden.

**Best practice**
- Zet `gateway.trustedProxies` naar de IP’s van je proxy.
- Zorg dat je proxy `X-Forwarded-For` correct beheert.

**Bron**
- OpenClaw security docs (Reverse Proxy Configuration): https://docs.openclaw.ai/gateway/security

---

## 4) Slechte secret hygiene (tokens/keys lekken)
**Wat gaat fout**
- Secrets in chat plakken (Discord bot token, Brave key, OpenRouter key, …).
- Secrets in git committen (.env / config).
- Secrets laten loggen (debug output, config dumps).

**Waarom gevaarlijk**
- Zodra een token lekt, kan iemand:
  - je bot kapen (Discord),
  - je OpenClaw toolchain misbruiken,
  - je API credits verbranden,
  - of toegang krijgen tot gekoppelde accounts.

**Best practice**
- **Nooit** secrets in chat.
- Gebruik secrets manager (of minstens env vars / Docker secrets) en rotate keys bij twijfel.

**Bron (algemeen + OpenClaw-context)**
- OpenClaw security docs (Credential storage map + hygiene): https://docs.openclaw.ai/gateway/security
- Web research (synthese): Docker env vars zijn zichtbaar via `docker inspect` voor iedereen met Docker-host toegang.

---

## 5) File permissions te los op de VPS
**Wat gaat fout**
- `~/.openclaw` (of state dir) staat op 755 of gelijkaardig.
- `auth-profiles.json` en andere credential files zijn group/world-readable.

**Waarom gevaarlijk**
- Elke user/process op de host kan sessielogs en keys lezen.

**Best practice**
- Volg de audit-fixes:
  - state dir naar **700**
  - auth-profiles naar **600**
- Draai regelmatig: `openclaw security audit --fix`

**Bron**
- OpenClaw security docs (perms + audit --fix): https://docs.openclaw.ai/gateway/security
- Lokale audit-output op deze VPS (WARNs):
  - `fs.state_dir.perms_readable`
  - `fs.auth_profiles.perms_readable`

---

## 6) “Open” rooms + tools aan (prompt injection = impact)
**Wat gaat fout**
- GroupPolicy/DMPolicy te open zetten (iedereen kan bot triggeren).
- Tegelijk tooling breed open laten (exec/file/network), of “elevated tools” aan zonder strikte allowlist.

**Waarom gevaarlijk**
- Meeste echte incidenten zijn geen 0-days maar: *iemand zegt iets slims tegen de bot en hij voert het uit*.

**Best practice**
- Eerst identity control (pairing/allowlists), dan pas tools.
- Require-mention in groepen.
- Overweeg sandbox/allowlists voor tools.

**Bron**
- OpenClaw threat model & access control concept: https://docs.openclaw.ai/gateway/security

---

## 7) Docker-specifieke footguns (VPS)
**Wat gaat fout**
- Alles via env vars zetten en dan Docker-host toegang niet afschermen.
- OpenClaw ports mappen naar `0.0.0.0` per ongeluk.

**Best practice**
- Gebruik **Docker secrets** (file mounts) waar mogelijk.
- Zorg dat alleen jij (of je beheeraccount) Docker admin is.
- Bind poorten op `127.0.0.1:...` tenzij je zeer bewust expose’t.

---

## 8) Updates, logging en audit trail verwaarlozen
**Wat gaat fout**
- Geen regelmatige audit.
- Logs met gevoelige data laten rondzwerven.

**Best practice**
- Run regelmatig:
  - `openclaw security audit --deep`
  - `openclaw security audit --fix` (als je de fixes wil toepassen)
- Zet sensible redaction aan (OpenClaw audit noemt `logging.redactSensitive="tools"` als veiligere default).

**Bron**
- OpenClaw security docs (audit checklist): https://docs.openclaw.ai/gateway/security

---

## Praktische checklist (VPS hardened baseline)
- [ ] Gateway/Control UI niet publiek: loopback + tunnel/VPN (Tailscale Serve) of firewall allowlist
- [ ] `gateway.controlUi.allowInsecureAuth=false`
- [ ] Reverse proxy: `gateway.trustedProxies` correct + proxy overwrites X-Forwarded-For
- [ ] `openclaw security audit --deep` clean
- [ ] State dir 700, credential/auth files 600
- [ ] DM/group policies: pairing/allowlist + mention gating
- [ ] Secrets nooit in chat; rotate bij leak
- [ ] Docker: secrets/file mounts > env vars waar mogelijk; beperkte Docker admin toegang

