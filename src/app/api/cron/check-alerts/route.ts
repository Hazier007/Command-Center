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

  // Future: check domain expiry dates (Site.expirationDate)

  return NextResponse.json({
    success: true,
    alertsChecked: urgentAlerts.length,
    patAlertCreated,
  })
}
