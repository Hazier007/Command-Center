# Changelog

All notable changes to Command Center will be documented in this file.

## [2026-04-04] - Feedback & Decision Layer

### Added
- **Decision model** — Formele besluitvorming met verplicht rationale-veld, polymorfe linking naar Project/Idea/Task/Site, opvolging via resultStatus
- **Decisions API** — Volledige CRUD (`/api/decisions`, `/api/decisions/[id]`) met filtering op projectId, ideaId, category, outcome, decidedBy
- **Decisions pagina** — `/decisions` met zoeken, filteren op categorie/uitkomst, stats cards, en inline formulier
- **FeedbackSection component** — Herbruikbaar component voor feedback op elke entiteit (Project, Idea, Task, Site, Content, Sprint)
- **Note uitbreiding** — 4 nieuwe linking velden (linkedProjectId, linkedIdeaId, linkedContentId, linkedSprintId), sentiment, actionNeeded
- **Task uitbreiding** — linkedIdeaId (origin tracking), linkedSprintId, completedAt (velocity)
- **Idea uitbreiding** — convertedToTaskId (lifecycle tracking), rejectedReason
- **Sprint uitbreiding** — retrospective veld voor lessons learned
- **Agent decision endpoint** — `POST /api/agent/decision` voor agents om beslissingen vast te leggen
- **Agent note uitbreiding** — Alle linking velden + sentiment + actionNeeded beschikbaar via agent API
- **Context API uitbreiding** — recentDecisions meegegeven in agent context response
- **Feedback protocol** — Gedocumenteerd in alle 6 agent prompt bestanden
- **New TypeScript types** — NoteType, Sentiment, DecisionOutcome, DecisionCategory, DecisionResultStatus

### Fixed
- **Agent report bugfix** — `body` → `content` in `/api/agent/report/route.ts` (field name mismatch met Prisma schema)
- **Agent report** — Voegt nu ook linkedProjectId toe aan notes

### Changed
- **Navigation** — Decisions pagina toegevoegd aan "Werk" navigatiegroep
- **Notes API** — Query parameters uitgebreid voor alle nieuwe linking velden + actionNeeded filter
- **Agent action types** — `decision` toegevoegd als nieuwe agent actie

## [Unreleased] - 2026-02-23

### Added by JC 🥊
- **.env.example** — Template voor database en API credentials
- **Comprehensive README.md** — Setup instructies, tech stack docs, project structuur
- **Loading states** — `LoadingSpinner` en `LoadingState` components voor betere UX
- **Error handling** — `ErrorState` component met retry functionaliteit
- **Empty states** — `EmptyState` component voor lege data scenarios
- **Error boundary** — Global error boundary voor crash recovery
- **CHANGELOG.md** — Dit bestand om releases bij te houden

### Improved by JC 🥊
- **Dashboard** — Loading/error states, retry on fail, betere error messages
- **README** — Van default Next.js naar complete setup guide met:
  - Database setup instructies
  - Development workflow
  - Project structure uitleg
  - API routes documentatie
  - Team workflow beschrijving
  - Roadmap items
- **Type safety** — Consistente error handling in data loading

### Fixed by JC 🥊
- **Missing .env documentation** — App kon niet starten zonder docs
- **Loading state inconsistency** — Sommige pages hadden wel, sommige niet
- **Error messages** — Van generic "failed" naar specifieke feedback

---

## [0.1.0] - 2026-02-23

### Built by Lisa 👑

#### Core Features
- **Dashboard** — NOW items (max 3), Alerts systeem, Today overview
- **Projects** — Volledige CRUD met status/phase/category tracking
- **Sites** — 88+ domeinen management met tech stack en revenue
- **Tasks** — Team task assignment voor Bart/Lisa/JC/Wout/Copycat
- **Content** — Review workflow (draft → review → approved/rejected → live)
- **Research** — Knowledge base met keyword research, market analysis
- **Oracle** — Top 25 AI-generated business ideas met ranking
- **Producten** — Affiliate product management voor Preppedia e.a.
- **Finance** — Budget tracking, cost management
- **Team** — Overzicht van team members en assignments

#### Tech Stack
- Next.js 16 (App Router)
- Prisma ORM + Neon Postgres
- shadcn/ui components
- Tailwind CSS v4
- Dark mode (Hazier branding)

#### Database
- **Prisma schema** — 13 models (Project, Site, Task, Content, Research, Product, etc.)
- **Seed data** — 26 projecten, 88 sites, complete startup data
- **API routes** — RESTful endpoints voor alle models

#### UI/UX
- **Navigation** — Grouped dropdowns (desktop), sheet menu (mobile)
- **Dark mode** — Forced dark met Hazier oranje accent (#F5911E)
- **Mobile-first** — Responsive design, touch-friendly
- **Real-time** — localStorage fallback voor snelheid (migreert naar DB)

#### Workflows
- **Content review** — Approve/reject met feedback notes
- **Task assignment** — Per team member met notification tracking
- **Project phases** — Idea → Research → Build → Testing → Live → Optimizing
- **Alert system** — Snooze (7d) of resolve

---

## Roadmap

### 🔴 Critical (Pre-Production)
- [ ] Database ENV setup validation
- [ ] Auth layer (NextAuth.js)
- [ ] Backup/export strategie
- [ ] Production error logging

### 🟡 High Priority
- [ ] Notifications (Telegram bot)
- [ ] Content review notifications
- [ ] Task deadline reminders
- [ ] AdSense API integration
- [ ] Analytics API integration

### 🟢 Medium Priority
- [ ] SEO rank tracking (SerpAPI)
- [ ] Activity feed (GitHub + Vercel webhooks)
- [ ] Global search (CMD+K)
- [ ] Oracle → database (nu hardcoded)
- [ ] Product specs → JSON refactor
- [ ] Dark/light mode toggle

### 🔵 Future
- [ ] Real-time updates (Supabase/Pusher)
- [ ] Mobile app (PWA)
- [ ] Voice commands
- [ ] AI assistant integration
- [ ] Slack/Discord integrations

---

## Credits

**Built by:** Lisa (Claude Opus 4) 👑  
**Fine-tuned by:** Jean-Cloud van Damme (Claude Sonnet 4.5) 🥊  
**For:** Bart @ Hazier  

**Repository:** [Hazier007/Command-Center](https://github.com/Hazier007/Command-Center)
