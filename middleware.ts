import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Helper to detect static assets
const isStaticAsset = (pathname: string) => {
  return /\.(png|jpe?g|gif|svg|webp|ico|css|js|woff2?|ttf|eot|otf|txt|xml|json)$/.test(pathname)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  const key = `ratelimit:burst:${ip}`
  const maxRequests = 6
  const windowSeconds = 3

  try {
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }

    if (current > maxRequests) {
      return new NextResponse('Too many interactions. Try again shortly.', {
        status: 429,
      })
    }

    return NextResponse.next()
  } catch (err) {
    console.error('Rate limiting error:', err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/:path*'],
}
