import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/db'
import { adminUpdateStatus } from '@/lib/actions/booking'

const STATUS = {
  pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  confirmed: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  completed: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
  cancelled: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
}

export default async function AdminPage() {
  await requireAdmin()

  const bookings = await prisma.booking.findMany({
    include: { user: { select: { name: true, email: true, phone: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const stats = [
    { label: 'Total Bookings', value: bookings.length, accent: false },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, accent: false },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, accent: true },
    {
      label: 'Revenue',
      value: `$${(bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.amount, 0) / 100).toFixed(0)}`,
      accent: true,
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.04) 0%, transparent 50%)'
      }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Admin</p>
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
              <div className="text-3xl font-black mb-1" style={{ color: s.accent ? 'var(--accent)' : 'white' }}>
                {s.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-3xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-bold text-white">All Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Customer', 'Service', 'Date', 'Address', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const s = STATUS[b.status as keyof typeof STATUS] ?? STATUS.pending
                  return (
                    <tr
                      key={b.id}
                      style={{ borderBottom: i < bookings.length - 1 ? '1px solid var(--border)' : 'none' }}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-sm">{b.user.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>{b.user.email}</div>
                        {b.user.phone && <div className="text-xs" style={{ color: 'var(--text-subtle)' }}>{b.user.phone}</div>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-white capitalize">{b.frequency}</div>
                        <div className="text-xs" style={{ color: 'var(--text-subtle)' }}>{b.dogs} dog{b.dogs > 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-white">{b.scheduledDate}</div>
                        <div className="text-xs" style={{ color: 'var(--text-subtle)' }}>{b.scheduledTime}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {b.address}<br />{b.city}, {b.state}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold" style={{ color: 'var(--accent)' }}>
                        ${(b.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                          style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <form className="flex flex-col gap-1">
                          {['confirmed', 'completed', 'cancelled'].map((st) => (
                            <button
                              key={st}
                              formAction={adminUpdateStatus.bind(null, b.id, st)}
                              disabled={b.status === st}
                              className="text-xs px-3 py-1.5 rounded-lg capitalize transition-all"
                              style={{
                                background: b.status === st ? 'rgba(255,255,255,0.03)' : 'rgba(34,197,94,0.07)',
                                color: b.status === st ? 'var(--text-subtle)' : 'var(--accent)',
                                border: `1px solid ${b.status === st ? 'var(--border)' : 'rgba(34,197,94,0.2)'}`,
                              }}
                            >
                              {st}
                            </button>
                          ))}
                        </form>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-16" style={{ color: 'var(--text-subtle)' }}>No bookings yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
