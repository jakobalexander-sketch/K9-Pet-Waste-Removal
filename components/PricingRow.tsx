'use client'

const DOG_LABELS: Record<number, string> = { 1: '1 Dog', 2: '2 Dogs', 3: '3 Dogs', 4: '4+ Dogs' }

export default function PricingRow({ freq, price, highlight }: {
  freq: string; price: Record<number, number>; highlight: boolean
}) {
  const borderStyle = highlight ? '1px solid rgba(212,168,83,0.3)' : '1px solid var(--border)'
  const bgStyle = highlight ? 'rgba(212,168,83,0.04)' : 'rgba(13,16,24,0.8)'
  const boxShadow = highlight ? '0 0 40px rgba(212,168,83,0.06)' : 'none'
  const priceColor = highlight ? 'var(--gold)' : 'white'

  return (
    <div
      className="glass rounded-2xl transition-all duration-300"
      style={{ border: borderStyle, background: bgStyle, boxShadow }}
    >
      {/* ── Mobile layout: stacked card ── */}
      <div className="sm:hidden px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-white text-base">{freq}</span>
          {highlight && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--gold)', color: '#06080e' }}>
              Most Popular
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-xl px-3 py-3 flex flex-col gap-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs tracking-wide uppercase" style={{ color: 'var(--text-subtle)' }}>
                {DOG_LABELS[n]}
              </span>
              <div>
                <span className="text-2xl font-light" style={{ color: priceColor, fontFamily: 'var(--font-display)' }}>
                  ${price[n]}
                </span>
                <span className="text-xs ml-1" style={{ color: 'var(--text-subtle)' }}>/visit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop layout: table row ── */}
      <div className="hidden sm:grid grid-cols-5 items-center gap-3 px-6 py-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-white">{freq}</span>
          {highlight && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--gold)', color: '#06080e' }}>
              Most Popular
            </span>
          )}
        </div>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="text-center">
            <span className="text-xl font-light" style={{ color: priceColor, fontFamily: 'var(--font-display)' }}>
              ${price[n]}
            </span>
            <span className="text-xs ml-0.5" style={{ color: 'var(--text-subtle)' }}>/visit</span>
          </div>
        ))}
      </div>
    </div>
  )
}
