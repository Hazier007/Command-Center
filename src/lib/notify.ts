export type NotifyLevel = 'info' | 'alert' | 'urgent'

const LEVEL_EMOJI: Record<NotifyLevel, string> = {
  info: '\u2139\uFE0F',
  alert: '\u26A0\uFE0F',
  urgent: '\uD83D\uDEA8',
}

export async function notify(message: string, level: NotifyLevel = 'info'): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing')
    return false
  }

  const emoji = LEVEL_EMOJI[level]
  const text = `${emoji} *Command Center*\n\n${message}`

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })

    if (!response.ok) {
      console.error('Telegram send failed:', await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error('Telegram send error:', error)
    return false
  }
}

export async function notifyNewTask(title: string, agent: string): Promise<boolean> {
  return notify(`\uD83D\uDCCB Nieuwe taak: *${title}*\nAgent: ${agent}`, 'info')
}

export async function notifyApprovalNeeded(title: string, type: string, agent: string): Promise<boolean> {
  return notify(`\uD83D\uDD14 Goedkeuring nodig: *${title}*\nType: ${type}\nVan: ${agent}`, 'alert')
}

export async function notifyDomainExpiring(domain: string, daysLeft: number): Promise<boolean> {
  return notify(`\uD83C\uDF10 Domein verloopt: *${domain}*\nNog ${daysLeft} dagen`, daysLeft <= 7 ? 'urgent' : 'alert')
}

export async function notifyWeeklyDigest(stats: {
  tasksCompleted: number
  tasksOpen: number
  revenue: number
  newIdeas: number
  alertsOpen: number
}): Promise<boolean> {
  const msg = `\uD83D\uDCCA *Weekly Digest*\n\n` +
    `\u2705 Taken afgerond: ${stats.tasksCompleted}\n` +
    `\uD83D\uDCCB Open taken: ${stats.tasksOpen}\n` +
    `\uD83D\uDCB0 Revenue deze maand: \u20AC${stats.revenue.toFixed(0)}\n` +
    `\uD83D\uDCA1 Nieuwe idee\u00EBn: ${stats.newIdeas}\n` +
    `\u26A0\uFE0F Open alerts: ${stats.alertsOpen}`

  return notify(msg, 'info')
}
