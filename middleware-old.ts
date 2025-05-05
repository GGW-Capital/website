import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Helper to detect static assets (images, css, js, etc.)
const isStaticAsset = (pathname: string) => {
  return /\.(png|jpe?g|gif|svg|webp|ico|css|js|woff2?|ttf|eot|otf|txt|xml|json)$/.test(pathname)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  // Get IP
  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  const now = Date.now()
  const key = `ratelimit:last:${ip}`

  try {
    const lastRequest = await redis.get<string>(key)

    if (lastRequest) {
      const lastTimestamp = parseInt(lastRequest, 10)
      if (!isNaN(lastTimestamp) && now - lastTimestamp < 200 ) {
        return new NextResponse('Too many requests', { status: 429 })
      }
    }

    await redis.set(key, now.toString(), { ex: 10 })

    return NextResponse.next()
  } catch (error) {
    console.error('Rate limit middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/:path*'],
}
