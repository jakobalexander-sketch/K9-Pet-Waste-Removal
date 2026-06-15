'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { signup } from '@/lib/actions/auth'

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.06) 0%, transparent 60%)'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="glass rounded-3xl p-8 sm:p-10" style={{ border: '1px solid var(--border)' }}>
          <div className="text-center mb-8">
            <div className="divider-gold mx-auto mb-6" />
            <h1 className="font-display text-4xl font-light italic text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Create your account
            </h1>
            <p className="text-xs tracking-editorial uppercase" style={{ color: 'var(--text-muted)' }}>Start scheduling pet waste removal today</p>
          </div>

          {state?.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-4 py-3 mb-6 text-sm border"
              style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}
            >
              {state.error}
            </motion.div>
          )}

          <form action={action} className="space-y-4">
            <InputField name="name" type="text" label="Full Name" placeholder="Jane Smith" />
            <InputField name="email" type="email" label="Email" placeholder="jane@example.com" />
            <InputField name="phone" type="tel" label="Phone (optional)" placeholder="(555) 000-0000" />
            <InputField name="password" type="password" label="Password" placeholder="Min 8 characters" />
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 mt-2 disabled:opacity-50"
              style={{
                background: 'var(--gold)',
                color: '#06080e',
                boxShadow: pending ? 'none' : '0 0 30px var(--gold-glow)',
              }}
            >
              {pending ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold hover:text-white transition-colors" style={{ color: 'var(--gold)' }}>
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function InputField({ name, type, label, placeholder }: { name: string; type: string; label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 placeholder:opacity-30"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
        }}
        onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
      />
    </div>
  )
}
