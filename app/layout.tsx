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
        <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }} className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
              <div>
                <div className="text-xl font-black tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--gold)', fontFamily: 'var(--font-brand)' }}>
                  K-9 Pet Waste Removal
                </div>
                <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-subtle)' }}>Premium Yard Care</p>
              </div>
              {/* Contact */}
              <div>
                <p className="text-xs tracking-editorial uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Contact Us</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:6196273686" className="text-sm transition-colors hover:text-white flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--gold)' }}>✆</span> 619-627-3686
                  </a>
                  <a href="mailto:jared@k-9petwasteremoval.com" className="text-sm transition-colors hover:text-white flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--gold)' }}>✉</span> jared@k-9petwasteremoval.com
                  </a>
                </div>
              </div>
              {/* Nav */}
              <div>
                <p className="text-xs tracking-editorial uppercase mb-3 font-medium" style={{ color: 'var(--gold)' }}>Quick Links</p>
                <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <a href="#services" className="hover:text-white transition-colors tracking-wide">Services</a>
                  <a href="#pricing" className="hover:text-white transition-colors tracking-wide">Pricing</a>
                  <a href="/book" className="hover:text-white transition-colors tracking-wide">Book Now</a>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)' }} className="pt-6">
              <p style={{ color: 'var(--text-subtle)' }} className="text-xs text-center">
                © {new Date().getFullYear()} K-9 Pet Waste Removal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
