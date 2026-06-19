import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { BartReviewInbox, ReviewInboxHint } from "@/components/bart-review-inbox"
import { Button } from "@/components/ui/button"
import { getOpenReviewInboxItems, reviewInboxItems } from "@/lib/review-inbox"

export default function ReviewPage() {
  const openItems = getOpenReviewInboxItems()

  return (
    <main className="space-y-6 text-white">
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Terug naar cockpit</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/locallead">LocalLead</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/portfolio">Portfolio</Link>
        </Button>
      </div>

      <ReviewInboxHint />
      <BartReviewInbox
        items={openItems.length > 0 ? openItems : reviewInboxItems}
        title="Bart review inbox"
        description="Alle agent-output die expliciet op Bart wacht: partnerpitches, outreach-copy, voorstellen, beslissingen en bewijsstukken."
      />
    </main>
  )
}
