import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client using env variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function middleware(req: NextRequest) {
  // Get client IP from request or header fallback
  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  const now = Date.now()
  const key = `ratelimit:last:${ip}`

  // Fetch the last request timestamp
  const lastRequest = await redis.get(key)

  // If last request was made less than 1 second ago, throttle
  if (lastRequest && now - Number(lastRequest) < 1000) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  // Otherwise, store/update the timestamp with expiry (10 seconds)
  await redis.set(key, now.toString(), { ex: 10 })

  // Allow request to proceed
  return NextResponse.next()
}

// Apply middleware to all routes
export const config = {
  matcher: ['/:path*'],
}
