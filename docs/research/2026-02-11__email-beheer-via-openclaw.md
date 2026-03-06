# Email beheer via OpenClaw (info@hazier.be) — research

Doel: Lisa moet de mailbox **info@hazier.be** kunnen monitoren, leads opvolgen en mails beantwoorden vanuit OpenClaw.

> TL;DR: Kies eerst **welke provider** achter `info@hazier.be` zit (Google Workspace vs Microsoft 365 vs “klassieke” IMAP-host zoals cPanel/DirectAdmin). Daarna is de meest robuuste + veilige aanpak meestal:
> - **Provider-API (Gmail API / Graph)** als het kan (OAuth, geen wachtwoorden),
> - anders **IMAP/SMTP** met **app password** + strikte secret handling.

---

## Samenvatting (3–5 bullets)

- **IMAP/SMTP kan** via community skills (ClawHub) of via een eigen mini-script; dit werkt met quasi elke mailbox, maar vereist **(app) password** en extra security.
- Voor **Google Workspace/Gmail** is **Gmail API (OAuth)** meestal de beste keuze (geen SMTP credentials in plain, scopes instelbaar, betere thread/reply support).
- Voor **Microsoft 365** is **Microsoft Graph API** de cleanste integratie (zelfde voordelen als Gmail API).
- **Inbox monitoring**: gebruik bij voorkeur **OpenClaw cron** (betrouwbaar, interval-based) i.p.v. heartbeat (meer “presence”-achtig).
- **Security**: bewaar secrets in **OpenClaw config env vars** (redacted) of in een secrets store buiten git; gebruik **app passwords** en minimal scopes.

---

## 0) Eerst: bepaal de mail-provider van info@hazier.be

Dit bepaalt meteen de beste optie.

**Snelle checks (1 minuut):**
- Check MX records van `hazier.be`:
  - Google: `ASPMX.L.GOOGLE.COM` etc.
  - Microsoft 365: `*.mail.protection.outlook.com`
  - cPanel/hosted: `mail.hazier.be`, `mx*.yourhoster...`

> Als je wilt, geef mij de MX records (copy/paste) en ik zeg meteen welke optie het best matcht.

---

## Optie 1 — Gmail API (OAuth) (beste als info@hazier.be op Google Workspace zit)

### Wat is het?
Mailbox lezen/verwerken en mails sturen via de **Gmail API** i.p.v. IMAP/SMTP.

**Pros**
- Geen IMAP/SMTP passwords nodig (OAuth tokens met scopes).
- Betere ondersteuning voor threads/reply/labels.
- Makkelijker te beperken tot “read-only” + “send” scopes.

**Cons**
- Setup is wat technischer (Google Cloud project + OAuth consent + tokens).
- Tokens/refresh moeten veilig bewaard worden.

### Skills op ClawHub (indicatief)
- `email-manager` (Gmail API-achtig) — https://clawhub.ai/sa9saQ/email-manager
- `gmail-client-*` — https://clawhub.ai/DeXiaong/gmail-client-pmte (en varianten)

> Let op: ClawHub kan skills “flaggen” als suspicious. **Altijd Files tab reviewen** (zie Security sectie).

### Setup stappen (hoog niveau)
1. Maak Google Cloud Project → enable Gmail API.
2. Maak OAuth client (desktop/web) + consent screen.
3. Authorize 1x als `info@hazier.be` en bewaar refresh token (liefst encrypted).
4. Installeer skill of gebruik eigen script dat Gmail API calls doet.
5. Voeg monitoring toe via cron (bv. elke 5–10 min):
   - “List unread → classify → draft reply → (human approve?) → send/reply”.

### Monitoring (cron)
- Maak een cron job die:
  - Unread mails ophaalt,
  - Samenvatting + voorgestelde replies post in #seo/#taken,
  - Optioneel: labels zet (bv. `lead`, `spam`, `todo`).

---

## Optie 2 — Microsoft Graph API (beste als mailbox op Microsoft 365/Outlook zit)

### Pros
- OAuth-based (geen IMAP/SMTP passwords).
- Sterke features voor inbox/folders/categories/threads.

### Cons
- Azure App registration + consent nodig.

### Skill op ClawHub (indicatief)
- `outlook-email` — https://clawhub.ai/… (vindbaar via Skills search: “Outlook-email /outlook-email”)

### Setup stappen (hoog niveau)
1. Azure Portal → App Registration.
2. API permissions: Mail.Read, Mail.Send (of restricted varianten).
3. OAuth flow + token storage.
4. Cron voor polling + workflow.

---

## Optie 3 — Klassiek IMAP/SMTP (universeel; werkt bij bijna elke host)

### Wat is het?
OpenClaw leest via **IMAP** (inbox) en verstuurt via **SMTP** (outgoing).

**Pros**
- Werkt met bijna elke provider (ook “mail.hazier.be”).
- Snel op te zetten.

**Cons**
- Vereist wachtwoord/app password → grotere impact bij leakage.
- IMAP parsing + attachments = meer edge cases.

### Skills / tools op ClawHub (indicatief)
- `imap-smtp-email` — https://clawhub.ai/gzlicanyi/imap-smtp-email
- `imap-email` (alleen lezen) — https://clawhub.ai/… (vindbaar via search)
- `smtp-send` / `send-email` (alleen outbound) — via Skills search
- `himalaya` (CLI mail client) — https://clawhub.ai/lamelas/himalaya

> Opmerking: ik zag in ClawHub UI dat sommige email skills een **“Skill flagged — suspicious patterns detected”** banner krijgen. Dat betekent niet automatisch “malicious”, maar wél: **review de bronbestanden** voor je installeert.

### Aanbevolen IMAP/SMTP setup voor Hazier
1. Maak (indien mogelijk) een **app password** (of aparte mailbox user) met minimale rechten.
2. Zet IMAP/SMTP endpoints:
   - IMAP: meestal `imap.<provider>` port 993 (TLS)
   - SMTP: `smtp.<provider>` port 587 (STARTTLS) of 465 (TLS)
3. Secrets bewaren via OpenClaw config (zie Security).
4. Poll unread mails via cron.
5. Stuur antwoorden via SMTP:
   - Ofwel: agent maakt draft + jij/Lisa approve
   - Ofwel: agent verstuurt automatisch voor “lage risico” replies

### Voorbeeld: eigen mini-script (meest controleerbaar)
Als we community skills niet willen vertrouwen, kan Jean-Cloud een super-kleine Node/Python integratie maken.

**Node (conceptueel):**
- `imapflow` (IMAP) of `imap-simple`
- `nodemailer` (SMTP)

Pseudo-structuur:
```bash
/scripts/email/check-inbox.js   # list unread + fetch body + attachments metadata
/scripts/email/send.js          # send via SMTP
```
OpenClaw cron draait dan:
- `node scripts/email/check-inbox.js --unread --since 24h`
- output → samenvatting + voorstel reply

---

## Inbox monitoring: Heartbeat vs Cron

### Cron (aanbevolen)
**Gebruik cron** voor “check elke X minuten”.
- Voorspelbaar en onafhankelijk van chat-activiteit.
- Past bij inbox monitoring.

### Heartbeat
Heartbeat is eerder “ik ben actief en ping af en toe” en is minder geschikt als harde scheduler.

**Praktische suggestie:**
- Cron elke 5–10 min voor unread scan.
- Extra cron 1x/dag voor “daily digest”.

---

## Security: credentials veilig bewaren in OpenClaw

### 1) Voorkeur: OAuth (geen IMAP/SMTP wachtwoord)
- Gmail API / Graph API.
- Tokens: liefst encrypted-at-rest (bv. file encrypted met age/sops) + beperkte filesystem rechten.

### 2) Als IMAP/SMTP nodig is
**Aanbevelingen:**
- Gebruik **app password** (niet het “main” mailbox wachtwoord).
- Beperk netwerk/host exposure (firewall, geen publieke logs).
- Bewaar secrets in **OpenClaw config env vars** (zoals jullie DataForSEO al doen).
  - In jullie config staat al `env.vars` met redaction support.

Voorbeeld (conceptueel):
```json
{
  "env": {
    "vars": {
      "EMAIL_IMAP_HOST": "imap.…",
      "EMAIL_IMAP_USER": "info@hazier.be",
      "EMAIL_IMAP_PASS": "__SECRET__",
      "EMAIL_SMTP_HOST": "smtp.…",
      "EMAIL_SMTP_USER": "info@hazier.be",
      "EMAIL_SMTP_PASS": "__SECRET__"
    }
  }
}
```

> Belangrijk: zet nooit secrets in repo-bestanden. Als een skill `.env` gebruikt: **.env in .gitignore** en file permissions beperken.

### 3) “Human-in-the-loop” veiligheidsrem
Voor outbound mails:
- Laat de agent eerst een **draft** maken + post in Discord ter goedkeuring.
- Na “OK” stuurt agent pas via SMTP/API.

---

## Kan een agent mails versturen namens info@hazier.be via SMTP?

Ja, technisch wel.

Maar:
- Je moet SMTP credentials/app password hebben.
- De From header moet kloppen met het account, anders deliverability issues.
- Zet SPF/DKIM/DMARC correct (domein niveau).

Alternatief voor outbound-only (zonder mailbox toegang):
- Mailgun/Resend/SMTP relay (maar dat is niet “namens bestaande mailbox” tenzij goed geconfigureerd).

---

## Aanbevolen aanpak (voor Bart/Lisa)

### Als info@hazier.be op Google Workspace zit
**Kies Optie 1 (Gmail API)**.
- Beste security en beste thread/reply flow.

### Als info@hazier.be op Microsoft 365 zit
**Kies Optie 2 (Graph API)**.

### Als info@hazier.be op klassieke hosting zit
**Kies Optie 3 (IMAP/SMTP)**, maar met:
- App password / dedicated mailbox user
- Cron polling
- Draft/approve flow
- Skills code review (of eigen script)

---

## Stap-voor-stap (IMAP/SMTP met ClawHub skill) — template

> Dit is het snelste pad, maar doe eerst security review van de skill.

1. (Eenmalig) Installeer ClawHub CLI:
   ```bash
   npm i -g clawhub
   ```
2. Zoek skill:
   ```bash
   clawhub search "imap smtp"
   ```
3. Installeer (voorbeeld):
   ```bash
   clawhub install imap-smtp-email
   ```
4. Review de files (`Files` tab op ClawHub) en scan output.
5. Configureer credentials (bij voorkeur via OpenClaw `env.vars`, anders `.env` in skill folder).
6. Maak cron job (elke 5–10 min):
   - “check unread → summary → propose reply → (optional send)”.

---

## Bronnen / links

- ClawHub skill library: https://clawhub.ai/skills
- ClawHub CLI usage (install/search/install/update): (OpenClaw skill doc) `clawhub`
- Example skills (voor verificatie):
  - IMAP/SMTP: https://clawhub.ai/gzlicanyi/imap-smtp-email
  - Gmail API-ish manager: https://clawhub.ai/sa9saQ/email-manager
  - Generic email skill: https://clawhub.ai/0xterrybit/email
  - CLI mail client: https://clawhub.ai/lamelas/himalaya

---

## Volgende stappen (wat ik nodig heb van jullie)

1) Welke provider is `info@hazier.be`? (MX records of “Google Workspace / M365 / andere”)  
2) Willen jullie **auto-send** of eerst **draft + approval**?  
3) Moet dit alleen in Discord werken, of ook via WhatsApp/Telegram notificaties?  

Als ik die 3 antwoorden heb, kan ik de setup 1-op-1 uitschrijven voor jullie exacte situatie (incl. cron prompt en minimale scopes).