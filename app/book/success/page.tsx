'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 60%)'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-7xl mb-6"
        >
          🎉
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 className="text-4xl font-black text-white mb-3">You&apos;re all set!</h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            Your booking is confirmed. We&apos;ll see you soon — get ready for a spotless yard.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-full font-bold text-sm transition-all duration-300"
              style={{ background: 'var(--accent)', color: '#000', boxShadow: '0 0 30px var(--accent-glow)' }}
            >
              View My Bookings
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
