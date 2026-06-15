import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Middleware runs at the edge before any page renders — defense-in-depth
// The page-level requireAuth/requireAdmin calls remain as the authoritative check.
function getSecret() {
  const s = process.env.SESSION_SECRET
  if (!s) throw new Error('SESSION_SECRET environment variable is not set')
  return new TextEncoder().encode(s)
}

const ADMIN_PATHS = ['/admin']
const AUTH_PATHS = ['/dashboard', '/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const needsAuth = AUTH_PATHS.some(p => pathname.startsWith(p))
  if (!needsAuth) return NextResponse.next()

  const token = request.cookies.get('k9_session')?.value
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  try {
    const { payload } = await jwtVerify(token, getSecret())
    const user = payload.user as { role?: string }

    const needsAdmin = ADMIN_PATHS.some(p => pathname.startsWith(p))
    if (needsAdmin && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
  } catch {
    // Expired or tampered token — clear it and redirect
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('k9_session')
    return response
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
