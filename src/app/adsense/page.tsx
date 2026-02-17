"use client"

import { ExternalLink, Github, Globe, CheckCircle, Clock, XCircle, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const adsenseSites = [
  { domain: "datumberekenen.be", status: "rejected", reason: "Te weinig content", faqs: 12, contentWords: 600, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/datumberekenen", vercel: true },
  { domain: "buitendrogen.be", status: "rejected", reason: "Te weinig content", faqs: 12, contentWords: 500, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/buitendrogen", vercel: true },
  { domain: "kmvergoeding.be", status: "pending", reason: null, faqs: 15, contentWords: 600, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/kmvergoeding", vercel: true },
  { domain: "goedkoopstroom.be", status: "pending", reason: null, faqs: 16, contentWords: 500, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/goedkoopstroom", vercel: true },
  { domain: "btw-calculator.be", status: "pending", reason: null, faqs: 14, contentWords: 600, lastAction: "FAQ + content + restyle", repo: "Hazier007/btw-calculator", vercel: true },
  { domain: "kleurcodes.be", status: "pending", reason: null, faqs: 14, contentWords: 600, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/kleurcodes", vercel: true },
  { domain: "huurrendementcalculator.be", status: "pending", reason: null, faqs: 6, contentWords: 800, lastAction: "Al voldoende content", repo: "Hazier007/huurrendementcalculator", vercel: true },
  { domain: "ibanvalidator.be", status: "pending", reason: null, faqs: 6, contentWords: 700, lastAction: "Al voldoende content", repo: "Hazier007/iban-validator", vercel: true },
  { domain: "zwangerschapscalculator.be", status: "pending", reason: null, faqs: 15, contentWords: 700, lastAction: "FAQ + content uitgebreid", repo: "Hazier007/zwangerschapscalculator", vercel: true },
  { domain: "interesten.be", status: "approved", reason: null, faqs: 0, contentWords: 0, lastAction: "Actief — heeft traffic", repo: "Hazier007/interest", vercel: true },
]

const statusConfig = {
  approved: { label: "Goedgekeurd", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white", icon: CheckCircle },
  pending: { label: "Pending", variant: "default" as const, className: "bg-yellow-600 hover:bg-yellow-700 text-white", icon: Clock },
  rejected: { label: "Geweigerd", variant: "default" as const, className: "bg-red-600 hover:bg-red-700 text-white", icon: XCircle },
}

export default function AdSensePage() {
  const total = adsenseSites.length
  const approved = adsenseSites.filter((s) => s.status === "approved").length
  const pending = adsenseSites.filter((s) => s.status === "pending").length
  const rejected = adsenseSites.filter((s) => s.status === "rejected").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AdSense Sites</h1>
        <p className="text-muted-foreground mt-1">
          Overzicht van alle sites en hun AdSense goedkeuringsstatus.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Totaal sites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#F5911E]" />
              <span className="text-3xl font-bold">{total}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Goedgekeurd</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-3xl font-bold text-green-500">{approved}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-500">{pending}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Geweigerd</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-3xl font-bold text-red-500">{rejected}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sites Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle sites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">FAQ&apos;s</TableHead>
                <TableHead className="hidden md:table-cell">Woorden</TableHead>
                <TableHead className="hidden lg:table-cell">Laatste actie</TableHead>
                <TableHead className="text-right">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adsenseSites.map((site) => {
                const config = statusConfig[site.status as keyof typeof statusConfig]
                return (
                  <TableRow key={site.domain}>
                    <TableCell className="font-medium">
                      <a
                        href={`https://${site.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5911E] hover:underline flex items-center gap-1"
                      >
                        {site.domain}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {site.reason && (
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          {site.reason}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={config.className}>
                        <config.icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{site.faqs}</TableCell>
                    <TableCell className="hidden md:table-cell">{site.contentWords}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {site.lastAction}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://github.com/${site.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          title="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                        <a
                          href={`https://${site.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          title="Live site"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
