import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Exclude the not-ready page itself and any static assets
  if (
    path === "/not-ready" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".") // This will catch most static files
  ) {
    return NextResponse.next()
  }

  // Redirect all other paths to the not-ready page
  const url = request.nextUrl.clone()
  url.pathname = "/not-ready"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /not-ready path
     * 2. /_next (Next.js internals)
     * 3. /api (API routes)
     * 4. all root files inside public (e.g. /favicon.ico)
     */
    "/((?!not-ready|_next|api|.*\\..*).*)",
  ],
}
