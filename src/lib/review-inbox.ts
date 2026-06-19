export type ReviewInboxStatus = "needs-bart" | "approved" | "blocked" | "archived"
export type ReviewInboxKind = "outreach" | "partner-pitch" | "proposal" | "decision" | "evidence"

export type ReviewInboxItem = {
  id: string
  title: string
  business: "locallead" | "hazier" | "calqo" | "collectpro" | "infinite-events" | "general"
  asset: string
  kind: ReviewInboxKind
  status: ReviewInboxStatus
  priority: "P1" | "P2" | "P3"
  createdAt: string
  owner: string
  summary: string
  bartAction: string
  filePath: string
  localPath: string
  routeHint: string
  tags: string[]
}

export const reviewInboxItems: ReviewInboxItem[] = [
  {
    id: "LOC228-poxy-partnerpitch-outreach",
    title: "Poxy.be — Partnerpitch & Outreach-copy",
    business: "locallead",
    asset: "poxy.be",
    kind: "partner-pitch",
    status: "needs-bart",
    priority: "P1",
    createdAt: "2026-06-19",
    owner: "Bart + agent",
    summary: "Concept met twee outreach-mailvarianten, belscript, launch deal en placeholders voor regio, leadvolume, prijs en contactgegevens.",
    bartAction: "Controleren of toon/aanbod klopt, placeholders invullen en expliciet go/no-go geven vóór verzending.",
    filePath: "content/poxy.be/partnerpitch-outreach-LOC228.md",
    localPath: "C:\\Users\\Bart\\Projects\\Command-Center\\content\\poxy.be\\partnerpitch-outreach-LOC228.md",
    routeHint: "/locallead",
    tags: ["poxy", "outreach", "partner", "approval", "LOC-228"],
  },
]

export function getReviewInboxForBusiness(business: ReviewInboxItem["business"]) {
  return reviewInboxItems.filter((item) => item.business === business)
}

export function getReviewInboxForAsset(asset: string) {
  return reviewInboxItems.filter((item) => item.asset === asset)
}

export function getOpenReviewInboxItems() {
  return reviewInboxItems.filter((item) => item.status === "needs-bart" || item.status === "blocked")
}
