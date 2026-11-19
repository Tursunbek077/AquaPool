import { useState } from 'react'
import { Link } from 'react-router'
import { CalendarX2 } from 'lucide-react'
import { Badge, Button, Card, Modal } from '../components/common'
import BookingCard from '../components/customer/BookingCard'
import { useBookings } from '../hooks/useBookings'
import { useProfile } from '../hooks/useProfile'
import { bookingsOfPhone, splitBookings } from '../services/bookingService'
import { cn } from '../utils/cn'
import { longDate, weekdayName } from '../utils/dates'

function EmptyState({ title, text, showAction }) {
  return (
    <Card tone="soft" padding="lg" className="mx-auto flex max-w-lg flex-col items-center text-center">
      <CalendarX2 className="size-10 text-ocean-600/60" aria-hidden="true" />
      <p className="mt-3 font-display text-xl font-bold">{title}</p>
      <p className="mt-1 text-sm text-navy-500">{text}</p>
      {showAction && (
        <Button as={Link} to="/jadval" className="mt-4">
          Mashg'ulotga yozilish
        </Button>
      )}
    </Card>
  )
}

// Mening bronlarim: kelgusi tashriflar, tarix, holat, tasdiq kodi va bekor qilish.
export default function MyBookingsPage() {
  const { bookings, cancel } = useBookings()
  const { profile } = useProfile()
  const [tab, setTab] = useState('upcoming')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const { upcoming, history } = splitBookings(bookingsOfPhone(bookings, profile.phone))
  const list = tab === 'upcoming' ? upcoming : history

  function closeCancel() {
    if (cancelling) return
    setCancelTarget(null)
    setCancelError('')
  }

  async function confirmCancel() {
    setCancelling(true)
    setCancelError('')
    try {
      await cancel(cancelTarget.id)
      setCancelTarget(null)
    } catch (error) {
      setCancelError(error?.message || "Bronni bekor qilib bo'lmadi")
    } finally {
      setCancelling(false)
    }
  }

  return (
    <section aria-labelledby="bookings-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="bookings-title" className="text-2xl font-extrabold tracking-tight">
          Mening bronlarim
        </h2>
        <div role="tablist" aria-label="Bronlar turi" className="inline-flex rounded-xl bg-aqua-200 p-1">
          {[
            { id: 'upcoming', label: 'Kelgusi', count: upcoming.length },
            { id: 'history', label: "O'tgan va bekor qilingan", count: history.length },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                tab === item.id ? 'bg-white shadow-sm' : 'text-navy-700 hover:text-navy-900',
              )}
            >
              {item.label}
              <Badge variant={tab === item.id ? 'ocean' : 'neutral'} size="sm">
                {item.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {list.length === 0 ? (
          tab === 'upcoming' ? (
            <EmptyState
              title="Kelgusi bronlar yo'q"
              text="Jadvaldan o'zingizga qulay vaqtni tanlab, mashg'ulotga yoziling."
              showAction
            />
          ) : (
            <EmptyState title="Tarix bo'sh" text="O'tgan va bekor qilingan bronlar shu yerda ko'rinadi." />
          )
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((booking) => (
              <BookingCard key={booking.id} booking={booking} upcoming={tab === 'upcoming'} onCancel={setCancelTarget} />
            ))}
          </div>
        )}
      </div>

      {cancelTarget && (
        <Modal
          open
          onClose={closeCancel}
          title="Bronni bekor qilish"
          size="sm"
          footer={
            <>
              <Button variant="soft" onClick={closeCancel} disabled={cancelling}>
                Yo'q, qoldirish
              </Button>
              <Button variant="danger" onClick={confirmCancel} loading={cancelling}>
                Ha, bekor qilish
              </Button>
            </>
          }
        >
          <p className="text-sm text-navy-700">
            <strong>{cancelTarget.title}</strong> ({weekdayName(cancelTarget.date)}, {longDate(cancelTarget.date)},{' '}
            {cancelTarget.start}) bronini bekor qilmoqchimisiz? Joy boshqa mijozlar uchun bo'shaydi.
          </p>
          {cancelError && (
            <p role="alert" className="mt-3 text-sm font-semibold text-danger-600">
              {cancelError}
            </p>
          )}
        </Modal>
      )}
    </section>
  )
}
