import Stripe from 'stripe'

// Lazily initialised so the app starts without a Stripe key in development,
// but throws immediately on first use if the key is missing.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key.startsWith('sk_test_YOUR')) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. ' +
      'Add your key from https://dashboard.stripe.com/test/apikeys to .env'
    )
  }
  _stripe = new Stripe(key, { apiVersion: '2026-05-27.dahlia' })
  return _stripe
}

// Named export kept for backward compat — resolves lazily
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
