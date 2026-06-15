import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { cancelBooking } from '@/lib/actions/booking'

const STATUS = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  confirmed: { label: 'Confirmed', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  completed: { label: 'Completed', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
  cancelled: { label: 'Cancelled', color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
}

export default async function DashboardPage() {
  const user = await requireAuth()
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.04) 0%, transparent 50%)'
      }} />

      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Dashboard</p>
            <h1 className="text-3xl font-black text-white">My Bookings</h1>
            <p className="mt-1" style={{ color: 'var(--text-muted)' }}>Welcome back, {user.name.split(' ')[0]}</p>
          </div>
          <Link
            href="/book"
            className="px-5 py-3 rounded-full text-sm font-bold transition-all duration-300"
            style={{ background: 'var(--accent)', color: '#000', boxShadow: '0 0 25px var(--accent-glow)' }}
          >
            + New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="glass rounded-3xl text-center py-24 px-8" style={{ border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-4">🐕</div>
            <h2 className="text-xl font-bold text-white mb-2">No bookings yet</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Schedule your first cleanup and enjoy a spotless yard!</p>
            <Link href="/book" className="px-6 py-3 rounded-full font-bold text-sm"
              style={{ background: 'var(--accent)', color: '#000' }}>
              Book Now →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const s = STATUS[b.status as keyof typeof STATUS] ?? STATUS.pending
              return (
                <div
                  key={b.id}
                  className="glass rounded-2xl p-6 flex items-start justify-between gap-4 flex-wrap transition-all duration-300 hover:border-white/10"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-white">{b.service}</span>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {b.frequency} · {b.dogs} dog{b.dogs > 1 ? 's' : ''} · {b.scheduledDate} @ {b.scheduledTime}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                      {b.address}, {b.city}, {b.state} {b.zip}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-black" style={{ color: 'var(--accent)' }}>
                      ${(b.amount / 100).toFixed(2)}
                    </div>
                    {b.status === 'pending' && (
                      <form action={cancelBooking.bind(null, b.id)} className="mt-2">
                        <button type="submit" className="text-xs transition-colors" style={{ color: 'var(--text-subtle)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}>
                          Cancel booking
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
