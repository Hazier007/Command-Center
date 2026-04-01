import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip auth if NextAuth is not configured
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.next()
  }

  // Dynamically import auth only when configured
  const { auth } = await import("@/auth")
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api/agent (agent API uses Bearer token)
     * - /api/auth (NextAuth routes)
     * - /login (auth page)
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico, /icon.svg, etc.
     */
    "/((?!api/agent|api/auth|login|_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
}
