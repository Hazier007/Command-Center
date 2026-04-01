import { NextRequest, NextResponse } from 'next/server'

export function validateAgentToken(request: NextRequest): { valid: boolean; error?: string } {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return { valid: false, error: 'Missing Authorization header' }
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Invalid Authorization format. Use: Bearer <token>' }
  }

  const token = authHeader.slice(7)
  const expectedToken = process.env.AGENT_API_KEY

  if (!expectedToken) {
    return { valid: false, error: 'AGENT_API_KEY not configured on server' }
  }

  if (token !== expectedToken) {
    return { valid: false, error: 'Invalid API key' }
  }

  return { valid: true }
}

export function unauthorizedResponse(error: string): NextResponse {
  return NextResponse.json({ error }, { status: 401 })
}
