import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function middleware(req: NextRequest) {
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

      if (!isNaN(lastTimestamp) && now - lastTimestamp < 10000) {
        console.log(`⛔ Throttled IP: ${ip}, waited only ${now - lastTimestamp}ms`)
        return new NextResponse('Too many requests', { status: 429 })
      }
    }

    // Store new timestamp with 10-second expiry
    await redis.set(key, now.toString(), { ex: 10 })

    return NextResponse.next()
  } catch (error) {
    console.error('Rate limit middleware error:', error)
    // Let request through if Redis fails (fail open)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/:path*'],
}
