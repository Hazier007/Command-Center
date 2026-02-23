# Command Center 🎯

**Persoonlijk operating systeem voor Hazier — projects, pipeline, team, finance en knowledge management.**

Gebouwd door Lisa 👑 | Fine-tuned door Jean-Cloud 🥊

---

## Features

- **Dashboard** — NOW items (max 3), Alerts, Today overview
- **Projects** — Alle projecten met status, revenue tracking, fase management
- **Pipeline** — Van idee tot live (Kanban view)
- **Sites** — 88+ domeinen, tech stack, revenue per site
- **Tasks** — Team task management (Bart/Lisa/JC/Wout/Copycat)
- **Content** — Review workflow voor Wout & Copycat output
- **Research** — Knowledge base met keyword research, market analysis, Oracle AI ideas
- **Producten** — Affiliate product management (Preppedia etc.)
- **Finance** — Budget tracking, AdSense, Analytics, SEO monitoring
- **Team** — Overzicht wie wat doet

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Neon Postgres (serverless)
- **ORM:** Prisma
- **UI:** shadcn/ui + Tailwind CSS v4
- **Dark Mode:** Forced (Hazier orange accent #F5911E)
- **Deployment:** Vercel

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/Hazier007/Command-Center.git commandcenter
cd commandcenter
npm install
```

### 2. Database Setup

1. **Maak een Neon account** → [neon.tech](https://neon.tech)
2. **Maak een nieuw project** → Copy de connection string
3. **Maak `.env` file**:

```bash
cp .env.example .env
```

4. **Vul `.env` in met jouw Neon credentials:**

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

### 3. Database Migrations & Seed

```bash
# Genereer Prisma client
npx prisma generate

# Push schema naar database
npx prisma db push

# Seed de database met Lisa's data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Database Management

```bash
# Open Prisma Studio (visual database editor)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Re-seed after reset
npx prisma db seed
```

---

## Project Structure

```
commandcenter/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data (Lisa's projects/sites)
├── src/
│   ├── app/
│   │   ├── api/             # API routes (CRUD voor alle data)
│   │   ├── page.tsx         # Dashboard
│   │   ├── projects/        # Projects overzicht + detail
│   │   ├── pipeline/        # Kanban view
│   │   ├── sites/           # Sites management
│   │   ├── tasks/           # Task management
│   │   ├── content/         # Content review workflow
│   │   ├── research/        # Research docs
│   │   ├── oracle/          # AI idea generator (hardcoded top 25)
│   │   ├── producten/       # Affiliate products
│   │   ├── team/            # Team overview
│   │   ├── budget/          # Cost tracking
│   │   ├── adsense/         # AdSense dashboard
│   │   ├── analytics/       # Traffic analytics
│   │   └── seo/             # SEO monitoring
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── navigation.tsx   # Main nav met grouped dropdowns
│   │   └── data-initializer.tsx
│   └── lib/
│       ├── prisma.ts        # Prisma client singleton
│       ├── storage.ts       # API wrapper functions
│       └── utils.ts         # Helper functions
└── public/                  # Static assets
```

---

## Development Notes

### Dark Mode

Forced dark mode via `<html className="dark">`. Hazier branding:
- **Primary:** #F5911E (oranje)
- **Background:** zinc-950
- **Text:** zinc-50

### Mobile First

Designed for mobile use (je bent vaak onderweg). Desktop krijgt extra features.

### NOW Philosophy

Max 3 items in NOW section (Derek Sivers principe). Focus > chaos.

### Alerts

Auto-generated signals die actie vereisen:
- Pending AdSense approval
- High-priority tasks
- Revenue drops
- System notifications

Snooze = 7 dagen, Resolve = gone forever.

---

## API Routes

Alle data via API:

- `GET /api/projects` — List all projects
- `POST /api/projects` — Create project
- `PATCH /api/projects/[id]` — Update project
- `DELETE /api/projects/[id]` — Delete project

Idem voor:
- `/api/sites`
- `/api/tasks`
- `/api/ideas`
- `/api/notes`
- `/api/alerts`
- `/api/now-items`
- `/api/content`
- `/api/research`
- `/api/products`
- `/api/costs`

---

## Team Workflow

### Content Review (Wout/Copycat → Bart)

1. Wout/Copycat schrijft content → status `draft`
2. Submit voor review → status `review`
3. Bart opent `/content` → ziet pending items
4. Approve → status `approved` (ready to publish)
5. Reject → status `rejected` + feedback note

### Task Assignment

```typescript
assignee: 'bart' | 'lisa' | 'jc' | 'wout' | 'copycat'
```

Toekomstige feature: notificaties via Telegram bot.

---

## Roadmap

### ✅ Done (Lisa)
- Dashboard met NOW/Alerts/Today
- Projects CRUD
- Sites management
- Tasks system
- Content/Research models
- Oracle idea generator
- Team overview
- Dark mode design
- Mobile navigation
- Prisma schema + seed

### 🔧 Fine-tuning (JC)
- [x] .env.example + setup docs
- [x] README update
- [ ] Mobile responsive fixes (tables → cards)
- [ ] Loading states + error boundaries
- [ ] Content review UI (approve/reject buttons)
- [ ] Empty state improvements
- [ ] Oracle → database (nu hardcoded)
- [ ] Product model refactor (specs → JSON)

### 🚀 Backlog
- [ ] Notifications (Telegram bot integration)
- [ ] AdSense API integration
- [ ] Analytics API integration
- [ ] SEO rank tracking (SerpAPI)
- [ ] Activity feed (GitHub + Vercel webhooks)
- [ ] Global search (CMD+K)
- [ ] Backup/export strategie
- [ ] Auth (NextAuth.js) — optioneel voor private hosting

---

## Deployment

### Vercel (recommended)

1. **Push naar GitHub**
2. **Import project in Vercel**
3. **Add environment variables:**
   - `DATABASE_URL`
   - `DIRECT_URL`
4. **Deploy**

Database migrations draaien automatisch via `postinstall` hook.

### Custom Server

```bash
npm run build
npm start
```

Requires Node.js 18+.

---

## Support

**Built by:** Lisa (Opus 4) 👑  
**Maintained by:** Jean-Cloud (Sonnet 4.5) 🥊  
**For:** Bart @ Hazier

Questions? Ping Lisa of JC in de team chat.

---

**Last updated:** 2026-02-23
