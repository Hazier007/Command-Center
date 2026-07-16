import { promises as fs } from "node:fs"
import path from "node:path"

import { NextResponse } from "next/server"

import { localLeadOpsRegistry, type LocalLeadOpsRegistryItem } from "@/lib/locallead-ops-registry"

const dataDir = path.join(process.cwd(), "data")
const dataPath = path.join(dataDir, "locallead-ops-registry.json")

async function readRegistry(): Promise<LocalLeadOpsRegistryItem[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8")
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as LocalLeadOpsRegistryItem[]
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code !== "ENOENT") {
      console.error("LocalLead registry read failed", error)
    }
  }

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

    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(dataPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8")

    return NextResponse.json({ ok: true, items: normalized })
  } catch (error) {
    console.error("LocalLead registry write failed", error)
    return NextResponse.json({ error: "Failed to save registry" }, { status: 500 })
  }
}
