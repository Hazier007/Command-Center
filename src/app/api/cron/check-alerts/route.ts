import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notify } from '@/lib/notify'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check unresolved high-priority alerts
  const urgentAlerts = await prisma.alert.findMany({
    where: { resolved: false, priority: 'high' },
  })

  if (urgentAlerts.length > 0) {
    const alertList = urgentAlerts.map(a => `\u2022 ${a.title}`).join('\n')
    await notify(`\uD83D\uDEA8 *${urgentAlerts.length} urgente alerts open:*\n\n${alertList}`, 'urgent')
  }

  // ─── GitHub PAT expiration watchdog ──────────────────────────
  // De sandbox-token waarmee Claude naar GitHub pushed verloopt
  // op GITHUB_PAT_EXPIRES_AT (env). Als dat binnen 7 dagen is,
  // maken we een high-priority Alert zodat Bart tijdig een nieuwe
  // token genereert. Idempotent: één open alert tegelijk.
  const patExpiresRaw = process.env.GITHUB_PAT_EXPIRES_AT // ISO datum
  let patAlertCreated = false
  if (patExpiresRaw) {
    const expiresAt = new Date(patExpiresRaw)
    const msUntil = expiresAt.getTime() - Date.now()
    const daysUntil = Math.ceil(msUntil / (24 * 60 * 60 * 1000))
    if (!Number.isNaN(expiresAt.getTime()) && daysUntil <= 7 && daysUntil > -1) {
      const existing = await prisma.alert.findFirst({
        where: {
          resolved: false,
          title: { contains: 'GitHub PAT verloopt' },
        },
      })
      if (!existing) {
        await prisma.alert.create({
          data: {
            title: `GitHub PAT verloopt binnen ${daysUntil} dag${daysUntil === 1 ? '' : 'en'}`,
            body: `De Claude Cowork PAT (scope: Hazier007 / All repos) verloopt op ${expiresAt.toISOString().slice(0, 10)}. Genereer een nieuwe fine-grained PAT en vervang de lijn in /mnt/.claude/git/credentials. Zonder token kan Claude niet meer pushen naar GitHub.`,
            priority: 'high',
          },
        })
        patAlertCreated = true
      }
    }
  }

  // ─── Klant-contract expiry watchdog ──────────────────────────
  // Voor elke Client record met een contractEnd binnen 30 dagen (of
  // reeds verlopen) maken we één idempotent Alert. Levert Bart een
  // trigger om proactief te verlengen of af te sluiten.
  let clientContractAlerts = 0
  try {
    // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
    const clients = await prisma.client.findMany({
      where: {
        status: 'active',
        contractEnd: { not: null },
      },
      select: {
        id: true,
        name: true,
        contractEnd: true,
      },
    })

    const now = Date.now()
    const thirtyDays = 30 * 24 * 60 * 60 * 1000

    for (const c of clients) {
      if (!c.contractEnd) continue
      const endTs = new Date(c.contractEnd).getTime()
      const msUntil = endTs - now
      if (msUntil > thirtyDays) continue // nog ver weg
      if (msUntil < -7 * 24 * 60 * 60 * 1000) continue // >7d geleden verlopen, al lang bekend

      const daysLeft = Math.ceil(msUntil / (24 * 60 * 60 * 1000))
      const title =
        daysLeft < 0
          ? `Klant-contract verlopen: ${c.name}`
          : `Klant-contract verloopt binnen ${daysLeft}d: ${c.name}`

      // Idempotent: één open alert per klant tegelijk
      const existing = await prisma.alert.findFirst({
        where: {
          resolved: false,
          title: { contains: c.name },
          // alleen contract-alerts matchen (niet site-onboarding alerts)
          AND: { title: { contains: 'contract' } },
        },
      })
      if (existing) continue

      await prisma.alert.create({
        data: {
          title,
          body:
            daysLeft < 0
              ? `Contract met ${c.name} is ${Math.abs(daysLeft)}d geleden verlopen. Check of verlenging of afsluiting nodig is, en update contractEnd via /klanten.`
              : `Contract met ${c.name} verloopt op ${new Date(c.contractEnd).toLocaleDateString('nl-BE')}. Plan een gesprek voor verlenging of heronderhandeling.`,
          priority: daysLeft < 0 || daysLeft <= 7 ? 'high' : 'medium',
        },
      })
      clientContractAlerts++
    }
  } catch {
    // Client model nog niet gemigreerd — stil negeren
  }

  // Future: check domain expiry dates (Site.expirationDate)

  return NextResponse.json({
    success: true,
    alertsChecked: urgentAlerts.length,
    patAlertCreated,
    clientContractAlerts,
  })
}
