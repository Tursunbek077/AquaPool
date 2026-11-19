import { CalendarDays, Clock, Info, User, Users } from 'lucide-react'
import { BOOKING_STATUS_UI, PAYMENT_METHOD_LABELS } from '../../data/bookingStatuses'
import { initialCoaches } from '../../data/initialCoaches'
import { FREE_CANCEL_HOURS } from '../../data/initialSchedule'
import { canCancel } from '../../services/bookingService'
import { longDate, weekdayName } from '../../utils/dates'
import { Badge, Button, Card } from '../common'

function Info2({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
      <div>
        <p className="text-xs text-navy-500">{label}</p>
        <p className="font-semibold">{children}</p>
      </div>
    </div>
  )
}

// Bitta bron: holat, vaqt, tasdiq kodi va (mumkin bo'lsa) bekor qilish.
// upcoming=true bo'lsa bekor qilish tugmasi yoki muddat o'tgani haqida eslatma ko'rsatiladi.
export default function BookingCard({ booking, upcoming = false, onCancel }) {
  const status = BOOKING_STATUS_UI[booking.status] ?? BOOKING_STATUS_UI.pending
  const coach = initialCoaches.find((item) => item.id === booking.coachId)
  const active = booking.status === 'pending' || booking.status === 'confirmed'
  const cancellable = upcoming && canCancel(booking)

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <Badge variant={status.variant} dot>
          {status.label}
        </Badge>
        <span className="text-xs font-semibold text-navy-500">Bron #{booking.number}</span>
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug">{booking.title}</h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Info2 icon={CalendarDays} label="Sana">
          {weekdayName(booking.date)}, {longDate(booking.date)}
        </Info2>
        <Info2 icon={Clock} label="Vaqt">
          {booking.start} - {booking.end}
        </Info2>
        {coach && (
          <Info2 icon={User} label="Murabbiy">
            {coach.name}
          </Info2>
        )}
        <Info2 icon={Users} label="Kishilar soni">
          {booking.people} kishi
        </Info2>
      </div>

      {active && (
        <div className="mt-4 rounded-xl border-2 border-dashed border-ocean-300 bg-aqua-100 px-4 py-3 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-navy-500">Tasdiq kodi</p>
          <p
            className="font-mono text-2xl font-extrabold tracking-[0.25em] text-ocean-700"
            aria-label={`Kod: ${booking.code.split('').join(' ')}`}
          >
            {booking.code}
          </p>
        </div>
      )}

      <p className="mt-3 text-xs text-navy-500">To'lov usuli: {PAYMENT_METHOD_LABELS[booking.payment]}</p>

      {upcoming && active && (
        <div className="mt-4">
          {cancellable ? (
            <Button variant="soft" size="sm" fullWidth onClick={() => onCancel(booking)}>
              Bronni bekor qilish
            </Button>
          ) : (
            <p className="flex gap-2 rounded-lg bg-aqua-100 p-2.5 text-xs text-navy-700">
              <Info className="mt-0.5 size-3.5 shrink-0 text-ocean-600" aria-hidden="true" />
              Mashg'ulotga {FREE_CANCEL_HOURS} soatdan kam vaqt qoldi, bronni endi onlayn bekor qilib bo'lmaydi. Iltimos,
              markazga qo'ng'iroq qiling.
            </p>
          )}
        </div>
      )}
    </Card>
  )
}
