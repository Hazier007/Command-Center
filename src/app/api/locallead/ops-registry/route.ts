import { promises as fs } from "node:fs"
import * as path from "node:path"

import { NextResponse } from "next/server"

import { localLeadOpsRegistry, type LocalLeadOpsRegistryItem } from "@/lib/locallead-ops-registry"

const dataDir = path.join(process.cwd(), "data")
const registryFilePath = "data/locallead-ops-registry.json"
const dataPath = path.join(process.cwd(), registryFilePath)
const githubApiBase = "https://api.github.com"

type GitHubContentResponse = {
  content?: string
  encoding?: string
  sha?: string
}

function getGitHubConfig() {
  const token = process.env.COMMAND_CENTER_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN
  const repo = process.env.COMMAND_CENTER_GITHUB_REPO ?? process.env.GITHUB_REPOSITORY ?? "Hazier007/Command-Center"
  const branch = process.env.COMMAND_CENTER_GITHUB_BRANCH ?? "main"

  return { token, repo, branch }
}

function isProductionLike() {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production"
}

async function githubRequest<T>(url: string, init: RequestInit = {}): Promise<T> {
  const { token } = getGitHubConfig()

  if (!token) {
    throw new Error("GitHub token ontbreekt. Zet COMMAND_CENTER_GITHUB_TOKEN in Vercel env vars.")
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 300)}`)
  }

  return response.json() as Promise<T>
}

function decodeGitHubContent(payload: GitHubContentResponse): string | null {
  if (!payload.content) return null

  if (payload.encoding && payload.encoding !== "base64") {
    throw new Error(`Onverwachte GitHub encoding: ${payload.encoding}`)
  }

  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8")
}

function encodeBase64(content: string) {
  return Buffer.from(content, "utf8").toString("base64")
}

async function readRegistryFromGitHub(): Promise<LocalLeadOpsRegistryItem[] | null> {
  const { repo, branch } = getGitHubConfig()
  const url = `${githubApiBase}/repos/${repo}/contents/${registryFilePath}?ref=${encodeURIComponent(branch)}`
  const payload = await githubRequest<GitHubContentResponse>(url)
  const raw = decodeGitHubContent(payload)
  if (!raw) return null

  const parsed = JSON.parse(raw)
  return Array.isArray(parsed) ? parsed as LocalLeadOpsRegistryItem[] : null
}

async function readRegistryFromFile(): Promise<LocalLeadOpsRegistryItem[] | null> {
  try {
    const raw = await fs.readFile(dataPath, "utf8")
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as LocalLeadOpsRegistryItem[]
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code !== "ENOENT") {
      console.error("LocalLead registry file read failed", error)
    }
  }

  return null
}

async function readRegistry(): Promise<LocalLeadOpsRegistryItem[]> {
  const { token } = getGitHubConfig()

  if (token) {
    try {
      const githubRegistry = await readRegistryFromGitHub()
      if (githubRegistry) return githubRegistry
    } catch (error) {
      console.error("LocalLead registry GitHub read failed", error)
    }
  }

  const fileRegistry = await readRegistryFromFile()
  if (fileRegistry) return fileRegistry

  return localLeadOpsRegistry
}

function normalizeItem(item: LocalLeadOpsRegistryItem): LocalLeadOpsRegistryItem {
  return {
    ...item,
    productionDomains: Array.isArray(item.productionDomains)
      ? item.productionDomains.map((domain) => String(domain).trim()).filter(Boolean)
      : [],
    access: {
      github: item.access?.github ?? "unknown",
      hosting: item.access?.hosting ?? "unknown",
      gsc: item.access?.gsc ?? "unknown",
      dns: item.access?.dns ?? "unknown",
    },
  }
}

async function writeRegistryToFile(normalized: LocalLeadOpsRegistryItem[]) {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(dataPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8")
}

async function writeRegistryToGitHub(normalized: LocalLeadOpsRegistryItem[]) {
  const { repo, branch } = getGitHubConfig()
  const url = `${githubApiBase}/repos/${repo}/contents/${registryFilePath}`
  const current = await githubRequest<GitHubContentResponse>(`${url}?ref=${encodeURIComponent(branch)}`)
  const content = `${JSON.stringify(normalized, null, 2)}\n`

  await githubRequest(url, {
    method: "PUT",
    body: JSON.stringify({
      message: "Update LocalLead ops registry",
      content: encodeBase64(content),
      sha: current.sha,
      branch,
    }),
  })
}

export async function GET() {
  const registry = await readRegistry()
  return NextResponse.json(registry)
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json()
    const incoming = Array.isArray(payload) ? payload : payload.items

    if (!Array.isArray(incoming)) {
      return NextResponse.json({ error: "Expected registry items array" }, { status: 400 })
    }

    const normalized = incoming.map((item) => normalizeItem(item as LocalLeadOpsRegistryItem))
    const { token } = getGitHubConfig()

    if (token) {
      await writeRegistryToGitHub(normalized)
    } else if (isProductionLike()) {
      return NextResponse.json(
        { error: "GitHub save niet geconfigureerd. Zet COMMAND_CENTER_GITHUB_TOKEN in Vercel env vars om production saves te bewaren." },
        { status: 500 },
      )
    } else {
      await writeRegistryToFile(normalized)
    }

    return NextResponse.json({ ok: true, items: normalized, persistence: token ? "github" : "filesystem" })
  } catch (error) {
    console.error("LocalLead registry write failed", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to save registry" }, { status: 500 })
  }
}
