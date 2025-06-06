import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Exclude the coming-soon page itself and any static assets
  if (
    path === "/coming-soon" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/admin") ||
    path.includes(".") // This will catch most static files
  ) {
    return NextResponse.next();
  }

  // Redirect all other paths to the coming-soon page
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /coming-soon path
     * 2. /_next (Next.js internals)
     * 3. /api (API routes)
     * 4. all root files inside public (e.g. /favicon.ico)
     */
    "/((?!coming-soon|_next|api|.*\\..*).*)",
  ],
};
