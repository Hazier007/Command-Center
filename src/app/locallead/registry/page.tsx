import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { LocalLeadOpsGuardrails } from "@/components/locallead-ops-guardrails"
import { Button } from "@/components/ui/button"

export default function LocalLeadRegistryPage() {
  return (
    <main className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/locallead"><ArrowLeft className="mr-2 h-4 w-4" /> Terug naar LocalLead</Link>
        </Button>
        <p className="text-sm text-zinc-400">
          Vul hier per website repo, hosting, production domains, GSC, leadflow, blockers en volgende veilige actie aan.
        </p>
      </div>

      <LocalLeadOpsGuardrails />
    </main>
  )
}
