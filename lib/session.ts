import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Fail loudly at startup rather than silently using a weak/public fallback.
function getSecret(): Uint8Array {
  const raw = process.env.SESSION_SECRET
  if (!raw || raw.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set to a random string of at least 32 characters. ' +
      'Generate one with: openssl rand -hex 32'
    )
  }
  return new TextEncoder().encode(raw)
}

const COOKIE = 'k9_session'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: string
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',  // upgraded from 'lax' — stricter CSRF protection
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload.user as SessionUser
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE)
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSession()
  if (!user) redirect('/login')
  return user
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireAuth()
  if (user.role !== 'admin') redirect('/dashboard')
  return user
}
