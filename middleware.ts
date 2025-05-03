import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const key = `ratelimit:${ip}`

  const requests = await kv.incr(key)
  if (requests === 1) {
    await kv.expire(key, 60) // 60 seconds window
  }

  if (requests > 100) {
    return new NextResponse("Too many requests", { status: 429 })
  }

  return NextResponse.next()
}
