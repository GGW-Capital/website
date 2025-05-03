// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const key = `ratelimit:${ip}`

  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, 30) // 60 seconds window
  }

  if (count > 30) {
    return new NextResponse("Rate limit exceeded", { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'], // Apply middleware globally
}
