import { NextRequest, NextResponse } from 'next/server'
import { notify, type NotifyLevel } from '@/lib/notify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, level = 'info' } = body

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    }

    const success = await notify(message, level as NotifyLevel)

    return NextResponse.json({ success })
  } catch (error) {
    console.error('Notify error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
