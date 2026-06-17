'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { SessionUser } from '@/lib/session'

type Props = {
  session: SessionUser | null
  logoutAction: () => Promise<void>
}

export default function NavClient({ session, logoutAction }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,7,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-xl">🐾</span>
          <span
            className="text-sm font-black tracking-[0.14em] uppercase transition-colors duration-300"
            style={{ fontFamily: 'var(--font-brand)', color: 'var(--gold)' }}
          >
            K-9 Pet Waste
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['#services', '#pricing', '#contact'].map((href) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium transition-colors capitalize"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {href.replace('#', '')}
            </a>
          ))}
          {session ? (
            <>
              <Link
                href={session.role === 'admin' ? '/admin' : '/dashboard'}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {session.role === 'admin' ? 'Admin' : 'My Bookings'}
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-muted)' }}>
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                href="/book"
                className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
                style={{
                  background: 'var(--gold)',
                  color: '#06080e',
                  boxShadow: '0 0 20px var(--gold-glow)',
                }}
              >
                Book Now
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              animate={open
                ? i === 0 ? { rotate: 45, y: 8 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              className="block w-5 h-0.5 bg-white"
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(5,7,15,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {[['#services', 'Services'], ['#pricing', 'Pricing'], ['#contact', 'Contact']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="py-3 text-white/70 hover:text-white transition-colors border-b" style={{ borderColor: 'var(--border)' }}>
                  {label}
                </a>
              ))}
              {session ? (
                <>
                  <Link href={session.role === 'admin' ? '/admin' : '/dashboard'} className="py-3 text-white/70 hover:text-white transition-colors">
                    {session.role === 'admin' ? 'Admin' : 'My Bookings'}
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className="py-3 text-red-400 hover:text-red-300 transition-colors text-left w-full">Log out</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="py-3 text-white/70 hover:text-white transition-colors">Log in</Link>
                  <Link href="/book" className="mt-2 py-3 text-center rounded-full font-semibold" style={{ background: 'var(--gold)', color: '#06080e' }}>Book Now</Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
