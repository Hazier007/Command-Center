import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Command Center</h1>
                <Badge variant="secondary">v0</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your personal operating system: planning, signals, and momentum.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="secondary">
                <Link href="#">+ Now item</Link>
              </Button>
              <Button asChild>
                <Link href="#">+ Log</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Pill>NOW max 3</Pill>
            <Pill>Signals → Alerts</Pill>
            <Pill>Low-maintenance</Pill>
          </div>
        </header>

        <Separator />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">NOW</CardTitle>
              <CardDescription>Max 3 focus items. Make them concrete.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Submit AdSense",
                  meta: "Personal Projects · Tools",
                  tag: "Revenue",
                },
                {
                  title: "Triage GSC drops (14d)",
                  meta: "Kristof Ponnet",
                  tag: "SEO",
                },
                {
                  title: "Luwaert.be revamp feedback",
                  meta: "Filip Luwaert",
                  tag: "Delivery",
                },
              ].map((x) => (
                <div key={x.title} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium leading-5">{x.title}</div>
                      <div className="text-xs text-muted-foreground">{x.meta}</div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {x.tag}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Next action: define the smallest step you can do in 10 minutes.
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">ALERTS</CardTitle>
              <CardDescription>Auto-signals. Only what’s actionable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Sitemap redirect detected",
                  body: "One or more sites return 308/307 for /sitemap.xml. Set Vercel primary domain to non-www.",
                  tone: "destructive" as const,
                },
                {
                  title: "Tripwire: -20% clicks (14d)",
                  body: "Investigate if drop persists: query mix, pages, indexing, cannibalization.",
                  tone: "secondary" as const,
                },
                {
                  title: "GA4 sessions coming in",
                  body: "Traction detected on tool-sites. Good for AdSense readiness.",
                  tone: "outline" as const,
                },
              ].map((x) => (
                <div key={x.title} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium leading-5">{x.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{x.body}</div>
                    </div>
                    <Badge variant={x.tone} className="shrink-0">
                      {x.tone === "destructive" ? "High" : x.tone === "secondary" ? "Med" : "Info"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="secondary">
                      Resolve
                    </Button>
                    <Button size="sm" variant="ghost">
                      Snooze 7d
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">TODAY</CardTitle>
              <CardDescription>Quick state + next commitments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Daily note</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep it short. This becomes your pattern library.
                </p>
                <p className="mt-2 text-sm">
                  • Canonical cleanup finished for 9 tools<br />
                  • Sitemaps re-submitted on non-www<br />
                  • Next: build OS + automate signals
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Quick links</div>
                <div className="mt-2 flex flex-col gap-2">
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="#">Sites</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="#">Clients</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="#">Backlog</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">BACKLOG (High)</CardTitle>
            <CardDescription>Park ideas here. Pull into NOW sparingly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Add sites table + seed Personal Projects / Kristof / Luwaert",
              "Supabase auth (Bart only)",
              "Cron: sitemap health + GSC tripwire",
              "Render legacy COMMAND_CENTER.md (read-only)",
            ].map((t) => (
              <div key={t} className="flex items-center justify-between rounded-lg border p-3">
                <div className="text-sm">{t}</div>
                <Badge variant="secondary">High</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <footer className="pb-2 text-xs text-muted-foreground">
          Next step: connect Supabase, seed 3 clients + 9 sites, then wire the first two alerts.
        </footer>
      </div>
    </div>
  );
}
