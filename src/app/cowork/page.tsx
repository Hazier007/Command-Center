"use client"

import { cn } from "@/lib/utils"

// ─── Skill definitions ─────────────────────────────────────────
interface Skill {
  id: string
  name: string
  description: string
  emoji: string
  agents: { name: string; color: string }[]
}

interface SkillCategory {
  title: string
  emoji: string
  skills: Skill[]
}

const categories: SkillCategory[] = [
  {
    title: "SEO & Traffic",
    emoji: "📡",
    skills: [
      {
        id: "seo-audit", name: "SEO Audit", emoji: "🔍",
        description: "Volledige audit: GSC data, keyword kansen, technische checks, content gaps",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
        ],
      },
      {
        id: "keyword-research", name: "Keyword Research", emoji: "📊",
        description: "Keyword cluster analyse voor een niche of site. Zoekvolume, concurrentie, kansen.",
        agents: [{ name: "RADAR", color: "bg-blue-500/15 text-blue-400" }],
      },
      {
        id: "traffic-rapport", name: "Traffic & Revenue Rapport", emoji: "📈",
        description: "GA4 + GSC + AdSense gecombineerd rapport. Trends, kansen, aanbevelingen.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" },
        ],
      },
    ],
  },
  {
    title: "Content & Copy",
    emoji: "✒️",
    skills: [
      {
        id: "content-batch", name: "Content Batch", emoji: "📝",
        description: "Genereer een batch van X artikelen voor een site. RADAR research → INK schrijft.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
        ],
      },
      {
        id: "pseo-pages", name: "pSEO Pagina's", emoji: "🏙️",
        description: "Programmatic SEO: genereer stad/regio pagina's voor een lead gen site.",
        agents: [
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "FORGE", color: "bg-green-500/15 text-green-400" },
        ],
      },
      {
        id: "klant-rapportage", name: "Klant Rapportage", emoji: "📧",
        description: "Maandelijks SEO rapport genereren voor een klant. Data + copy + export.",
        agents: [{ name: "INK", color: "bg-purple-500/15 text-purple-400" }],
      },
    ],
  },
  {
    title: "Business & Growth",
    emoji: "🚀",
    skills: [
      {
        id: "nieuwe-niche", name: "Nieuwe Niche Site", emoji: "🌐",
        description: "Van niche-idee → domein check → site bouwen → content plan → deploy op Vercel.",
        agents: [
          { name: "RADAR", color: "bg-blue-500/15 text-blue-400" },
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
        ],
      },
      {
        id: "idee-eval", name: "Idee Evaluatie", emoji: "🎯",
        description: "SPARK scoort een business idee op 6 dimensies. ROI, haalbaarheid, fit.",
        agents: [
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
          { name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" },
        ],
      },
      {
        id: "lead-gen", name: "Lead Gen Campagne", emoji: "🏢",
        description: "Offerte, outreach, en sales assets voor klant acquisitie bij Hazier.",
        agents: [
          { name: "INK", color: "bg-purple-500/15 text-purple-400" },
          { name: "SPARK", color: "bg-[#F5911E]/15 text-[#F5911E]" },
        ],
      },
    ],
  },
  {
    title: "Technisch & Ops",
    emoji: "🔧",
    skills: [
      {
        id: "site-deploy", name: "Site Deploy", emoji: "🏗️",
        description: "Build, test, en deploy een site naar Vercel. Inclusief Lighthouse check.",
        agents: [{ name: "FORGE", color: "bg-green-500/15 text-green-400" }],
      },
      {
        id: "financieel-rapport", name: "Financieel Rapport", emoji: "💰",
        description: "P&L per business unit. Revenue vs kosten. Gap naar €100K analyse.",
        agents: [{ name: "LEDGER", color: "bg-yellow-500/15 text-yellow-400" }],
      },
      {
        id: "weekplanning", name: "Weekplanning", emoji: "📋",
        description: "ATLAS maakt weekplan: prioriteiten, taken verdelen, blockers identificeren.",
        agents: [{ name: "ATLAS", color: "bg-blue-500/15 text-blue-300" }],
      },
    ],
  },
]

// ─── Page ──────────────────────────────────────────────────────
export default function CoworkPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
          🧠
        </div>
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white">
            Cowork <span className="text-cyan-400">Skills</span>
          </h1>
          <p className="text-[13px] text-zinc-500">
            Klik op een skill → ik voer uit → taken worden verdeeld over je agents
          </p>
        </div>
      </div>

      {/* Skill Categories */}
      {categories.map((cat) => (
        <div key={cat.title}>
          <h3 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
            {cat.emoji} {cat.title}
            <span className="flex-1 h-px bg-white/[0.06]" />
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {cat.skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => {
                  const agentNames = skill.agents.map((a) => a.name).join(", ")
                  alert(
                    `🧠 Cowork start "${skill.name}" workflow...\n\nBetrokken agents: ${agentNames}\n\nTaken worden aangemaakt in Werk.`
                  )
                }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-800/30 p-4 text-left transition-all duration-200 hover:border-cyan-500/30 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(6,182,212,0.08)]"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xl">{skill.emoji}</span>
                  <div className="flex gap-1">
                    {skill.agents.map((a) => (
                      <span
                        key={a.name}
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[8px] font-bold uppercase",
                          a.color
                        )}
                      >
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-white mb-1">
                  {skill.name}
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
                  {skill.description}
                </p>

                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                  ▶ Start workflow →
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
