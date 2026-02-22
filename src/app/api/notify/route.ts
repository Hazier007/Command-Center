import { NextResponse } from 'next/server'

const DISCORD_AGENT_IDS: Record<string, string> = {
  jc: '<@1470813961690681569>',
  wout: '<@1470816627976044706>',
  copycat: '<@1473402918739775619>',
  lisa: 'Lisa 📋',
}

const AGENT_EMOJI: Record<string, string> = {
  jc: '🥊',
  wout: '🔭',
  copycat: '✍️',
  lisa: '📋',
  bart: '👑',
}

const PRIORITY_EMOJI: Record<string, string> = {
  high: '🔴',
  medium: '🟠',
  low: '🟢',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agent, taskTitle, taskDescription, projectName, priority, deadline } = body

    if (!agent || !taskTitle) {
      return NextResponse.json({ error: 'agent and taskTitle are required' }, { status: 400 })
    }

    const discordTag = DISCORD_AGENT_IDS[agent.toLowerCase()] || agent
    const emoji = AGENT_EMOJI[agent.toLowerCase()] || '👤'
    const prioEmoji = PRIORITY_EMOJI[priority?.toLowerCase()] || '⚪'

    let message = `📋 **Nieuwe taak voor ${discordTag}** ${emoji}\n\n`
    message += `**Taak:** ${taskTitle}\n`
    if (taskDescription) message += `**Details:** ${taskDescription}\n`
    if (projectName) message += `**Project:** ${projectName}\n`
    message += `**Prioriteit:** ${prioEmoji} ${priority || 'normaal'}\n`
    if (deadline) message += `**Deadline:** ${deadline}\n`
    message += `\n🔗 [Bekijk in Command Center](https://command-center-pearl.vercel.app/tasks)`

    return NextResponse.json({
      success: true,
      message,
      agent: agent.toLowerCase(),
      discordTag,
    })
  } catch (error) {
    console.error('Notify error:', error)
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}
