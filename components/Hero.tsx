'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed background image with parallax */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=90"
          alt="Golden retriever in a lush green yard"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,8,14,0.2)] via-[rgba(6,8,14,0.4)] to-[rgba(6,8,14,0.92)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,8,14,0.5)] via-transparent to-[rgba(6,8,14,0.3)]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28"
      >
        {/* Editorial label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="divider-gold" />
          <span className="text-xs tracking-editorial uppercase font-medium" style={{ color: 'var(--gold)', fontFamily: 'var(--font-sans)' }}>
            Premium Pet Waste Removal
          </span>
        </motion.div>

        {/* Main heading — Cormorant Garamond */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.5rem,9vw,8.5rem)] font-light italic tracking-display leading-[0.9] text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your yard,
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.5rem,9vw,8.5rem)] font-light italic tracking-display leading-[0.9] gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            perfected.
          </motion.h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 sm:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-base sm:text-lg max-w-sm leading-relaxed"
            style={{ color: 'rgba(240,238,232,0.65)' }}
          >
            Professional pet waste removal delivered with care, consistency, and absolute discretion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
          >
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
              style={{
                background: 'var(--gold)',
                color: '#06080e',
                boxShadow: '0 0 40px var(--gold-glow)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Schedule a Cleanup
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(240,238,232,0.7)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute right-8 bottom-10 flex flex-col items-center gap-3"
          style={{ color: 'rgba(240,238,232,0.35)' }}
        >
          <span className="text-[10px] tracking-editorial uppercase" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
