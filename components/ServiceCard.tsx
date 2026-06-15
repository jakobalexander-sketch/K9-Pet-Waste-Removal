'use client'

export default function ServiceCard({ icon, title, desc, badge }: {
  icon: string; title: string; desc: string; badge: string | null
}) {
  return (
    <div
      className="group relative glass rounded-2xl p-7 flex flex-col gap-5 cursor-default transition-all duration-500 hover:-translate-y-1"
      style={{ border: '1px solid var(--border)' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 24px 60px rgba(212,168,83,0.08)'; e.currentTarget.style.borderColor = 'rgba(212,168,83,0.18)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      {badge && (
        <div className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full tracking-wide"
          style={{ background: 'rgba(212,168,83,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,168,83,0.2)' }}>
          {badge}
        </div>
      )}
      <div className="text-xl font-light" style={{ color: 'var(--gold)', opacity: 0.7 }}>{icon}</div>
      <div>
        <h3 className="font-display text-2xl font-light italic text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </div>
  )
}
