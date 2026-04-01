export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api/agent (agent API uses Bearer token)
     * - /login (auth page)
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico, /icon.svg, etc.
     */
    "/((?!api/agent|login|_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
}
