'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createBooking } from '@/lib/actions/booking'
import Link from 'next/link'

const frequencies = [
  { value: 'one-time', label: 'One-Time', sub: 'Single visit' },
  { value: 'weekly', label: 'Weekly', sub: 'Every week' },
  { value: 'bi-weekly', label: 'Bi-Weekly', sub: 'Every 2 weeks' },
  { value: 'monthly', label: 'Monthly', sub: 'Once a month' },
]

const PRICES: Record<string, Record<string, number>> = {
  'one-time': { '1': 25, '2': 35, '3': 45, '4+': 55 },
  weekly: { '1': 15, '2': 22, '3': 29, '4+': 36 },
  'bi-weekly': { '1': 18, '2': 26, '3': 34, '4+': 42 },
  monthly: { '1': 20, '2': 29, '3': 38, '4+': 47 },
}

function getPrice(freq: string, dogs: number) {
  const key = dogs >= 4 ? '4+' : String(dogs)
  return PRICES[freq]?.[key] ?? 55
}

const STEPS = ['Service', 'Location', 'Schedule', 'Review']

export default function BookPage() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [frequency, setFrequency] = useState('weekly')
  const [dogs, setDogs] = useState(1)

  const price = getPrice(frequency, dogs)
  const freq = frequencies.find((f) => f.value === frequency)!

  function go(next: number) {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.05) 0%, transparent 50%)'
      }} />

      <div className="max-w-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="divider-gold mx-auto mb-5" />
          <h1 className="font-display text-5xl font-light italic text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Book Your Service
          </h1>
          <p className="text-xs tracking-editorial uppercase" style={{ color: 'var(--text-muted)' }}>Takes less than 2 minutes</p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                  style={{
                    background: i <= step ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                    color: i <= step ? '#06080e' : 'var(--text-subtle)',
                    boxShadow: i === step ? '0 0 20px var(--gold-glow)' : 'none',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-[10px] mt-1.5 font-semibold hidden sm:block"
                  style={{ color: i <= step ? 'var(--gold)' : 'var(--text-subtle)' }}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 mt-[-12px] sm:mt-[-18px] transition-all duration-500"
                  style={{ background: i < step ? 'var(--gold)' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </motion.div>

        <form action={createBooking}>
          <input type="hidden" name="service" value="Pet Waste Removal" />
          <input type="hidden" name="frequency" value={frequency} />
          <input type="hidden" name="dogs" value={dogs} />

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl p-7 sm:p-9"
                style={{ border: '1px solid var(--border)' }}
              >
                {step === 0 && (
                  <div>
                    <h2 className="text-xl font-black text-white mb-6">Choose your service</h2>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {frequencies.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setFrequency(f.value)}
                          className="p-4 rounded-2xl text-left transition-all duration-200"
                          style={{
                            background: frequency === f.value ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                            border: frequency === f.value ? '1px solid rgba(34,197,94,0.35)' : '1px solid var(--border)',
                            boxShadow: frequency === f.value ? '0 0 20px rgba(34,197,94,0.1)' : 'none',
                          }}
                        >
                          <div className="font-bold text-white text-sm">{f.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.sub}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Number of dogs</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setDogs(n)}
                            className="flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                            style={{
                              background: dogs === n ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                              color: dogs === n ? '#06080e' : 'var(--text-muted)',
                              border: dogs === n ? 'none' : '1px solid var(--border)',
                              boxShadow: dogs === n ? '0 0 20px var(--gold-glow)' : 'none',
                            }}
                          >
                            {n === 4 ? '4+' : n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{freq.label} · {dogs} dog{dogs > 1 ? 's' : ''}</span>
                      <span className="text-2xl font-black" style={{ color: 'var(--gold)' }}>${price}<span className="text-sm font-normal text-white/40">/visit</span></span>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-black text-white mb-6">Service address</h2>
                    <div className="space-y-4">
                      <BookingField name="address" label="Street Address" placeholder="123 Main St" />
                      <div className="grid grid-cols-2 gap-4">
                        <BookingField name="city" label="City" placeholder="Springfield" />
                        <BookingField name="state" label="State" placeholder="IL" maxLength={2} />
                      </div>
                      <BookingField name="zip" label="ZIP Code" placeholder="62701" maxLength={10} />
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Access Notes (optional)</label>
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Gate code, dog's name, special instructions…"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 placeholder:opacity-30 resize-none"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
                          onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)' }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border)' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-black text-white mb-6">Pick a date & time</h2>
                    <div className="space-y-4">
                      <BookingField name="scheduledDate" label="Preferred Date" type="date" min={new Date().toISOString().split('T')[0]} />
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Preferred Time Window</label>
                        <select
                          name="scheduledTime"
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', colorScheme: 'dark' }}
                          onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)' }}
                          onBlur={e => { e.target.style.borderColor = 'var(--border)' }}
                        >
                          <option value="">Select a window…</option>
                          {['8am–10am', '10am–12pm', '12pm–2pm', '2pm–4pm', '4pm–6pm'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-black text-white mb-6">Review & Pay</h2>
                    <div className="space-y-3 mb-6">
                      {[
                        ['Service', 'Pet Waste Removal'],
                        ['Frequency', freq.label],
                        ['Dogs', String(dogs)],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{k}</span>
                          <span className="text-sm font-semibold text-white">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-2xl mb-6" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <span className="font-semibold text-white">Total due today</span>
                      <span className="text-3xl font-black" style={{ color: 'var(--gold)' }}>${price}</span>
                    </div>
                    <p className="text-xs text-center mb-3" style={{ color: 'var(--text-subtle)' }}>
                      🔒 Secure payment via Stripe · Your card is never stored on our servers
                    </p>
                    <p className="text-xs text-center" style={{ color: 'var(--text-subtle)' }}>
                      Need an account?{' '}
                      <Link href="/signup" style={{ color: 'var(--gold)' }} className="underline">Sign up</Link>
                      {' '}or{' '}
                      <Link href="/login" style={{ color: 'var(--gold)' }} className="underline">log in</Link>
                      {' '}to complete booking.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-5">
            {step > 0 && (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                ← Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => go(step + 1)}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                style={{ background: 'var(--gold)', color: '#06080e', boxShadow: '0 0 25px var(--gold-glow)' }}
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                style={{ background: 'var(--gold)', color: '#06080e', boxShadow: '0 0 30px var(--gold-glow)' }}
              >
                Pay ${price} & Confirm →
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function BookingField({ name, label, placeholder, type = 'text', min, maxLength }: {
  name: string; label: string; placeholder?: string; type?: string; min?: string; maxLength?: number
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        min={min}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 placeholder:opacity-30"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', colorScheme: 'dark' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.03)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
      />
    </div>
  )
}
