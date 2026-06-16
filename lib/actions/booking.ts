'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { requireAuth } from '@/lib/session'

// --- Allowlists (single source of truth) ---
const ALLOWED_FREQUENCIES = ['one-time', 'weekly', 'bi-weekly', 'monthly'] as const
const ALLOWED_TIMES = ['8am–10am', '10am–12pm', '12pm–2pm', '2pm–4pm', '4pm–6pm'] as const
const ALLOWED_STATUSES = ['confirmed', 'completed', 'cancelled'] as const
type AllowedStatus = typeof ALLOWED_STATUSES[number]

const PRICES: Record<string, Record<string, number>> = {
  'one-time': { '1': 5000, '2': 6500, '3': 8000, '4+': 9500 },
  weekly:     { '1': 2000, '2': 3000, '3': 4000, '4+': 5000 },
  'bi-weekly':{ '1': 3000, '2': 4500, '3': 6000, '4+': 7500 },
  monthly:    { '1': 4500, '2': 6000, '3': 7500, '4+': 9000 },
}

function getPrice(frequency: string, dogs: string): number {
  return PRICES[frequency]?.[dogs] ?? PRICES[frequency]?.['4+'] ?? 5500
}

// Simple date string validator — expects YYYY-MM-DD from <input type="date">
function isValidDateString(d: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d))
}

export async function createBooking(formData: FormData) {
  const user = await requireAuth()

  // --- Extract and sanitise every field ---
  const frequency = formData.get('frequency') as string
  const address   = (formData.get('address') as string ?? '').trim()
  const city      = (formData.get('city') as string ?? '').trim()
  const state     = (formData.get('state') as string ?? '').trim().toUpperCase()
  const zip       = (formData.get('zip') as string ?? '').trim()
  const scheduledDate = formData.get('scheduledDate') as string
  const scheduledTime = formData.get('scheduledTime') as string
  const dogsRaw   = parseInt(formData.get('dogs') as string ?? '1', 10)
  const notes     = (formData.get('notes') as string ?? '').trim()

  // --- Server-side validation ---
  if (!ALLOWED_FREQUENCIES.includes(frequency as typeof ALLOWED_FREQUENCIES[number])) {
    throw new Error('Invalid service frequency.')
  }
  if (!Number.isInteger(dogsRaw) || dogsRaw < 1 || dogsRaw > 20) {
    throw new Error('Invalid number of dogs.')
  }
  if (!address || address.length > 200) throw new Error('Invalid address.')
  if (!city || city.length > 100)       throw new Error('Invalid city.')
  if (!/^[A-Z]{2}$/.test(state))        throw new Error('Invalid state code.')
  if (!/^\d{5}(-\d{4})?$/.test(zip))    throw new Error('Invalid ZIP code.')
  if (!isValidDateString(scheduledDate)) throw new Error('Invalid date.')
  if (!ALLOWED_TIMES.includes(scheduledTime as typeof ALLOWED_TIMES[number])) {
    throw new Error('Invalid time window.')
  }
  if (notes.length > 500) throw new Error('Notes are too long (max 500 characters).')

  const dogs = Math.min(dogsRaw, 20)
  const dogsKey = dogs >= 4 ? '4+' : String(dogs)
  const amount = getPrice(frequency, dogsKey)
  // Service name is never user-supplied — it is always this fixed string.
  const service = 'Pet Waste Removal'

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      service,
      frequency,
      address,
      city,
      state,
      zip,
      scheduledDate,
      scheduledTime,
      dogs,
      notes: notes || null,
      amount,
      status: 'pending',
    },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `K-9 Pet Waste Removal — ${frequency}`,
            description: `${frequency} service for ${dogs} dog(s) on ${scheduledDate}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: { bookingId: booking.id },
    success_url: `${appUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/book?cancelled=1`,
  })

  await prisma.booking.update({
    where: { id: booking.id },
    data: { stripeId: checkoutSession.id },
  })

  redirect(checkoutSession.url!)
}

export async function cancelBooking(bookingId: string) {
  const user = await requireAuth()

  // Validate bookingId is a non-empty string (cuid format)
  if (!bookingId || typeof bookingId !== 'string' || bookingId.length > 50) return

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })

  // Ownership check
  if (!booking || booking.userId !== user.id) return

  // Only pending bookings can be cancelled by the customer
  if (booking.status !== 'pending') return

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'cancelled' },
  })
}

export async function adminUpdateStatus(bookingId: string, status: string) {
  const user = await requireAuth()

  // Re-verify admin role from DB — do not trust the JWT role alone.
  // If an admin is demoted, their token still says 'admin' until it expires.
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })
  if (!dbUser || dbUser.role !== 'admin') return

  // Allowlist statuses — never write arbitrary strings to the DB
  if (!ALLOWED_STATUSES.includes(status as AllowedStatus)) return

  // Validate bookingId
  if (!bookingId || typeof bookingId !== 'string' || bookingId.length > 50) return

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  })
}
