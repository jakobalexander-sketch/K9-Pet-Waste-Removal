import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import FadeIn from '@/components/animations/FadeIn'
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren'
import CountUp from '@/components/animations/CountUp'
import ServiceCard from '@/components/ServiceCard'
import PricingRow from '@/components/PricingRow'

const services = [
  { icon: '✦', title: 'One-Time Cleanup', desc: 'Get your yard spotless fast. Ideal for getting back under control or preparing for guests.', badge: 'Most Popular' },
  { icon: '◈', title: 'Weekly Service', desc: 'Set it and forget it. We visit every week so your yard stays pristine year-round.', badge: null },
  { icon: '◇', title: 'Bi-Weekly Service', desc: 'The perfect balance — every two weeks for yards with moderate foot traffic.', badge: 'Best Value' },
  { icon: '○', title: 'Monthly Service', desc: 'Once-a-month deep cleaning for lighter use yards or seasonal coverage.', badge: null },
]

const stats = [
  { value: 2400, suffix: '+', label: 'Yards Serviced' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 5, suffix: ' yrs', label: 'In Business' },
  { value: 850, suffix: '+', label: 'Happy Clients' },
]

const steps = [
  { n: '01', title: 'Book Online', desc: 'Choose your service, pick a date, and pay securely in under two minutes.' },
  { n: '02', title: 'We Arrive', desc: 'Our professional team shows up at your scheduled window — rain, shine, or snow.' },
  { n: '03', title: 'You Relax', desc: 'Your yard is restored. We send a completion notice so you always know when we\'re done.' },
]

const pricing = [
  { freq: 'One-Time', price: { 1: 25, 2: 35, 3: 45, 4: 55 }, highlight: false },
  { freq: 'Monthly', price: { 1: 20, 2: 29, 3: 38, 4: 47 }, highlight: false },
  { freq: 'Bi-Weekly', price: { 1: 18, 2: 26, 3: 34, 4: 42 }, highlight: false },
  { freq: 'Weekly', price: { 1: 15, 2: 22, 3: 29, 4: 36 }, highlight: true },
]

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Springfield, IL',
    text: 'K-9 has completely changed how I feel about my backyard. My kids can actually play out there again. Worth every penny.',
    stars: 5,
  },
  {
    name: 'James T.',
    location: 'Naperville, IL',
    text: "Super reliable, always on time, and they never miss a spot. I've tried two other services before — this is on another level.",
    stars: 5,
  },
  {
    name: 'Michelle R.',
    location: 'Aurora, IL',
    text: 'I have three large dogs. This service is a genuine lifesaver. Easy to book, and they\'re completely professional.',
    stars: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* Stats bar */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <StaggerChildren className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="font-display text-5xl font-light italic" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs mt-2 tracking-editorial uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Editorial split — image + intro text */}
      <section className="grid lg:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=90"
            alt="Labrador retriever enjoying a clean green lawn"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(6,8,14,0.6)] hidden lg:block" />
        </div>

        {/* Text */}
        <div className="flex items-center px-8 sm:px-14 py-20" style={{ background: 'var(--bg-surface)' }}>
          <FadeIn direction="left">
            <div className="divider-gold mb-8" />
            <p className="text-xs tracking-editorial uppercase mb-6" style={{ color: 'var(--gold)' }}>
              Why K-9
            </p>
            <h2 className="font-display text-5xl sm:text-6xl font-light italic leading-tight text-white mb-8"
              style={{ fontFamily: 'var(--font-display)' }}>
              Your time is<br />
              <em className="gradient-text not-italic">too valuable</em><br />
              to spend this way.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              We built K-9 for dog owners who love their pets but refuse to compromise on the quality of their outdoor space. Every visit is thorough, every technician is trained, and every yard is treated with the same care as our own.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
              No contracts. No commitments. Just a spotless yard, every time.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide transition-all duration-300 group"
              style={{ color: 'var(--gold)' }}
            >
              Book Your First Visit
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28 px-4 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 60%)'
        }} />
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-16">
            <div className="divider-gold mb-6" />
            <p className="text-xs tracking-editorial uppercase mb-5" style={{ color: 'var(--gold)' }}>What We Offer</p>
            <h2 className="font-display text-5xl sm:text-6xl font-light italic text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
              Service plans built around<br />
              <span className="gradient-text">your life</span>
            </h2>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <ServiceCard {...s} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Full-bleed image section — how it works */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2000&q=85"
            alt="Lush green grass in golden light"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,8,14,0.8)] via-[rgba(6,8,14,0.75)] to-[rgba(6,8,14,0.85)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-20">
            <div className="divider-gold mb-6" />
            <p className="text-xs tracking-editorial uppercase mb-5" style={{ color: 'var(--gold)' }}>The Process</p>
            <h2 className="font-display text-5xl sm:text-6xl font-light italic text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
              Effortless,<br />
              <span className="gradient-text">every single time</span>
            </h2>
          </FadeIn>

          <StaggerChildren className="grid lg:grid-cols-3 gap-12" staggerDelay={0.15}>
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="flex flex-col gap-5">
                  <div className="font-display text-6xl font-light italic" style={{ color: 'var(--gold)', opacity: 0.4, fontFamily: 'var(--font-display)' }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-light italic text-white mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,238,232,0.55)' }}>{s.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 px-4 relative" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-16">
            <div className="divider-gold mb-6" />
            <p className="text-xs tracking-editorial uppercase mb-5" style={{ color: 'var(--gold)' }}>Pricing</p>
            <h2 className="font-display text-5xl sm:text-6xl font-light italic text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
              Transparent pricing.<br />
              <span className="gradient-text">No surprises.</span>
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Per-visit pricing by dog count. No contracts — cancel anytime.
            </p>
          </FadeIn>

          <FadeIn className="mb-4">
            <div className="grid grid-cols-5 gap-3 px-6">
              <div />
              {['1 Dog', '2 Dogs', '3 Dogs', '4+ Dogs'].map(d => (
                <div key={d} className="text-center text-xs font-medium tracking-editorial uppercase" style={{ color: 'var(--text-subtle)' }}>{d}</div>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren className="flex flex-col gap-3" staggerDelay={0.07}>
            {pricing.map((row) => (
              <StaggerItem key={row.freq}>
                <PricingRow {...row} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.3} className="text-center mt-12">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 group"
              style={{ background: 'var(--gold)', color: '#06080e', boxShadow: '0 0 40px var(--gold-glow)' }}
            >
              Get Started Today
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <p className="mt-4 text-xs tracking-wide" style={{ color: 'var(--text-subtle)' }}>
              First-time customers receive 20% off their first visit
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials over image */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury backyard garden"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(6,8,14,0.88)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="flex flex-col items-center text-center mb-16">
            <div className="divider-gold mb-6" />
            <p className="text-xs tracking-editorial uppercase mb-5" style={{ color: 'var(--gold)' }}>Testimonials</p>
            <h2 className="font-display text-5xl sm:text-6xl font-light italic text-white"
              style={{ fontFamily: 'var(--font-display)' }}>
              Trusted by dog owners<br />
              <span className="gradient-text">across the region</span>
            </h2>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-3 gap-6" staggerDelay={0.1}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="glass rounded-2xl p-8 h-full flex flex-col gap-5 hover:border-[var(--gold-dim)] transition-all duration-500"
                  style={{ border: '1px solid var(--border)' }}>
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <span key={i} style={{ color: 'var(--gold)' }}>★</span>
                    ))}
                  </div>
                  <p className="font-display text-xl font-light italic leading-relaxed flex-1 text-white"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4">
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs mt-0.5 tracking-wide" style={{ color: 'var(--text-subtle)' }}>{t.location}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Final CTA with image */}
      <section className="relative py-36 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=2000&q=85"
            alt="Happy dog in a beautiful yard"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,8,14,0.7)] to-[rgba(6,8,14,0.9)]" />
        </div>

        <FadeIn className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="divider-gold" />
          </div>
          <p className="text-xs tracking-editorial uppercase mb-6" style={{ color: 'var(--gold)' }}>Ready to begin?</p>
          <h2 className="font-display text-6xl sm:text-7xl font-light italic text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}>
            A pristine yard<br />
            <span className="gradient-text">starts today</span>
          </h2>
          <p className="text-base mb-12 leading-relaxed" style={{ color: 'rgba(240,238,232,0.6)' }}>
            Book in under two minutes. No contracts, no commitments.<br />Just a spotless yard, every visit.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 group"
            style={{
              background: 'var(--gold)',
              color: '#06080e',
              boxShadow: '0 0 60px var(--gold-glow), 0 0 100px rgba(212,168,83,0.08)',
            }}
          >
            Schedule Your Cleanup
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
