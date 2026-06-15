import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Cormorant_Garamond, Cinzel } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-brand',
  weight: ['400', '600', '700', '900'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'K-9 Pet Waste Removal — Premium Yard Care',
  description: 'Professional, reliable pet waste removal for dog owners who value their time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${cormorant.variable} ${cinzel.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }} className="py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xl font-black tracking-[0.12em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-brand)' }}>
                K-9 Pet Waste Removal
              </div>
              <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: 'var(--text-subtle)' }}>Est. 2023 · Premium Yard Care</p>
            </div>
            <p style={{ color: 'var(--text-subtle)' }} className="text-sm">
              © {new Date().getFullYear()} K-9 Pet Waste Removal. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
              <a href="#services" className="hover:text-white transition-colors tracking-wide">Services</a>
              <a href="#pricing" className="hover:text-white transition-colors tracking-wide">Pricing</a>
              <a href="/book" className="hover:text-white transition-colors tracking-wide">Book Now</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
