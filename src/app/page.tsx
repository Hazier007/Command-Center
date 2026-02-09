"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataInitializer } from "@/components/data-initializer";
import {
  nowItemsStorage,
  alertsStorage,
  tasksStorage,
  projectsStorage,
  sitesStorage,
  type NowItem,
  type Alert,
  type Task,
  type Project,
} from "@/lib/storage";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export default function Home() {
  const [nowItems, setNowItems] = useState<NowItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [todayNote, setTodayNote] = useState<string>("");
  const [sitesCount, setSitesCount] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      const [nowData, alertsData, projectsData, sitesData] = await Promise.all([
        nowItemsStorage.getAll(),
        alertsStorage.getAll(),
        projectsStorage.getAll(),
        sitesStorage.getAll(),
      ]);
      setNowItems(nowData);
      setAlerts(alertsData.filter((alert: Alert) => !alert.resolved));
      setProjects(projectsData);
      setSitesCount(sitesData.length);
      
      const today = new Date().toLocaleDateString();
      setTodayNote(`• Dashboard deployed with functional data\n• All seed data loaded successfully\n• Ready for mobile-first usage\n\nLast updated: ${today}`);
    };
    load();
  }, []);

  const handleResolveAlert = async (alertId: string) => {
    await alertsStorage.update(alertId, { resolved: true });
    const allAlerts = await alertsStorage.getAll();
    setAlerts(allAlerts.filter((alert: Alert) => !alert.resolved));
  };

  const handleSnoozeAlert = async (alertId: string) => {
    const snoozedUntil = new Date();
    snoozedUntil.setDate(snoozedUntil.getDate() + 7);
    await alertsStorage.update(alertId, { snoozedUntil: snoozedUntil.toISOString() });
    const allAlerts = await alertsStorage.getAll();
    setAlerts(allAlerts.filter((alert: Alert) => !alert.resolved && (!alert.snoozedUntil || new Date(alert.snoozedUntil) <= new Date())));
  };

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);

  return (
    <>
      <DataInitializer />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
          <header className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                  <Badge variant="secondary" className="text-xs">
                    {activeProjects} active
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  €{totalRevenue.toLocaleString()}/month · {projects.length} projects total
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/notes">
                    <Plus className="h-4 w-4 mr-1" />
                    Log
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/tasks">
                    <Calendar className="h-4 w-4 mr-1" />
                    Tasks
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Pill>NOW max 3</Pill>
              <Pill>Signals → Alerts</Pill>
              <Pill>Mobile-first</Pill>
            </div>
          </header>

          <Separator />

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">NOW</CardTitle>
                    <CardDescription>Max 3 focus items. Make them concrete.</CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/tasks">Manage</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {nowItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium leading-5">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.meta}</div>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {item.tag}
                      </Badge>
                    </div>
                    {item.description && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
                {nowItems.length === 0 && (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    No NOW items yet.{" "}
                    <Link href="/tasks" className="text-primary underline">
                      Create one
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">ALERTS</CardTitle>
                    <CardDescription>Auto-signals. Only what's actionable.</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {alerts.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium leading-5">{alert.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{alert.body}</div>
                      </div>
                      <Badge 
                        variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'} 
                        className="shrink-0"
                      >
                        {alert.priority === 'high' ? 'High' : alert.priority === 'medium' ? 'Med' : 'Low'}
                      </Badge>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleResolveAlert(alert.id)}>
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleSnoozeAlert(alert.id)}>
                        Snooze 7d
                      </Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    No active alerts. All good! 🎉
                  </div>
                )}
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
                  <div className="mt-2 text-sm whitespace-pre-line">
                    {todayNote}
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Quick links</div>
                  <div className="mt-2 flex flex-col gap-2">
                    <Button asChild variant="outline" className="justify-start" size="sm">
                      <Link href="/sites">Sites ({sitesCount})</Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start" size="sm">
                      <Link href="/projects">Projects ({projects.length})</Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start" size="sm">
                      <Link href="/ideas">Ideas ({nowItems.length})</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <footer className="pb-2 text-xs text-muted-foreground">
            Functional dashboard with localStorage persistence · Mobile-optimized · Dark mode ready
          </footer>
        </div>
      </div>
    </>
  );
}
