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

  // Future: check domain expiry dates

  return NextResponse.json({ success: true, alertsChecked: urgentAlerts.length })
}
