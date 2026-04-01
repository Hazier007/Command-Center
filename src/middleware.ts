import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip auth entirely if NextAuth is not configured
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.next()
  }

  // In Edge Runtime we can't use Prisma, so we check for the session token cookie directly
  const sessionToken =
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value

  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api/agent (agent API uses Bearer token)
     * - /api/auth (NextAuth routes)
     * - /api/cron (cron jobs)
     * - /login (auth page)
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico, /icon.svg, etc.
     */
    "/((?!api/agent|api/auth|api/cron|login|_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
}
