'use client'

export default function PricingRow({ freq, price, highlight }: {
  freq: string; price: Record<number, number>; highlight: boolean
}) {
  return (
    <div
      className="glass grid grid-cols-5 items-center gap-3 px-6 py-5 rounded-2xl transition-all duration-300"
      style={{
        border: highlight ? '1px solid rgba(212,168,83,0.3)' : '1px solid var(--border)',
        background: highlight ? 'rgba(212,168,83,0.04)' : 'rgba(13,16,24,0.8)',
        boxShadow: highlight ? '0 0 40px rgba(212,168,83,0.06)' : 'none',
      }}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-medium text-white">{freq}</span>
        {highlight && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'var(--gold)', color: '#06080e' }}>
            Best
          </span>
        )}
      </div>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="text-center">
          <span className="text-xl font-light" style={{ color: highlight ? 'var(--gold)' : 'white', fontFamily: 'var(--font-display)' }}>
            ${price[n]}
          </span>
          <span className="text-xs ml-0.5" style={{ color: 'var(--text-subtle)' }}>/visit</span>
        </div>
      ))}
    </div>
  )
}
