'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'

type AuthState = { error: string } | undefined

// Pre-computed during module init so it's ready before the first login attempt.
// Used to keep bcrypt timing constant whether or not the user exists,
// preventing email-enumeration via response-time difference.
const TIMING_DUMMY_HASH = bcrypt.hash('__k9_timing_dummy_constant__', 12)

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.'
  if (password.length > 128) return 'Password is too long.'
  return null
}

export async function signup(_state: AuthState, formData: FormData): Promise<AuthState> {
  const name = (formData.get('name') as string ?? '').trim()
  const email = (formData.get('email') as string ?? '').trim().toLowerCase()
  const password = formData.get('password') as string ?? ''
  const phone = (formData.get('phone') as string ?? '').trim()

  if (!name || !email || !password) {
    return { error: 'All fields are required.' }
  }
  if (name.length > 100) return { error: 'Name is too long.' }
  if (!isValidEmail(email)) return { error: 'Please enter a valid email address.' }

  const pwError = validatePassword(password)
  if (pwError) return { error: pwError }

  if (phone && phone.length > 30) return { error: 'Phone number is too long.' }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: 'An account with this email already exists.' }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, password: hashed, phone: phone || null },
  })

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role })
  redirect('/dashboard')
}

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = (formData.get('email') as string ?? '').trim().toLowerCase()
  const password = formData.get('password') as string ?? ''

  if (!email || !password) return { error: 'Email and password are required.' }
  if (!isValidEmail(email)) return { error: 'Invalid email or password.' }

  const user = await prisma.user.findUnique({ where: { email } })

  // Always run bcrypt.compare regardless of whether the user exists.
  // This prevents timing-based email enumeration attacks.
  const hashToCompare = user?.password ?? await TIMING_DUMMY_HASH
  const valid = await bcrypt.compare(password, hashToCompare)

  if (!user || !valid) return { error: 'Invalid email or password.' }

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role })

  if (user.role === 'admin') redirect('/admin')
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
