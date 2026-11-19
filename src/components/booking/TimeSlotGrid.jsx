import { ArrowRight, Clock, Lock } from 'lucide-react'
import { GENDER_OPTIONS } from '../../data/initialSchedule'
import { cn } from '../../utils/cn'
import { Badge, Button, Card, SmartImage } from '../common'
import CapacityPill from './CapacityPill'

function SlotCard({ slot, onBook }) {
  const full = slot.state === 'full'
  const unavailable = full || slot.isPast
  const gender = GENDER_OPTIONS[slot.gender]

  return (
    <Card padding="none" className={cn('flex flex-col p-5', unavailable && 'bg-white/70')}>
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold',
            unavailable ? 'bg-aqua-200 text-navy-500' : 'bg-aqua-300 text-navy-900',
          )}
        >
          <Clock className="size-3.5" aria-hidden="true" />
          {slot.start} - {slot.end}
        </span>
        {full ? (
          <Badge variant="danger" size="sm">
            Joy to'lgan
          </Badge>
        ) : (
          <Badge variant={slot.gender === 'mixed' ? 'neutral' : 'ocean'} size="sm">
            {gender.label}
          </Badge>
        )}
      </div>

      <h3 className={cn('mt-4 text-lg font-bold leading-snug', unavailable && 'text-navy-500')}>{slot.title}</h3>
      <p className="mt-0.5 text-xs font-semibold text-ocean-700">
        {slot.lane}
        {full && ` · ${gender.label}`}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">{slot.description}</p>

      {slot.coach && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-aqua-100 p-2.5">
          <SmartImage src={slot.coach.image} alt="" className="size-10 shrink-0 rounded-full" />
          <p className="min-w-0 text-sm">
            <span className="block truncate font-bold">{slot.coach.name}</span>
            <span className="block truncate text-xs text-navy-500">{slot.coach.title}</span>
          </p>
        </div>
      )}

      <div className="mt-4">
        <CapacityPill capacity={slot} />
      </div>

      <div className="mt-auto pt-4">
        {full ? (
          <Button disabled variant="soft" fullWidth leftIcon={<Lock className="size-4" />}>
            Bo'sh joy qolmagan
          </Button>
        ) : slot.isPast ? (
          <Button disabled variant="soft" fullWidth>
            Vaqt o'tib ketgan
          </Button>
        ) : (
          <Button fullWidth onClick={() => onBook(slot)} rightIcon={<ArrowRight className="size-4" />}>
            Bron qilish
          </Button>
        )}
      </div>
    </Card>
  )
}

// Tanlangan kun slotlari. onBook(slot) bron oynasini ochadi.
export default function TimeSlotGrid({ slots, onBook }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {slots.map((slot) => (
        <SlotCard key={slot.slotId} slot={slot} onBook={onBook} />
      ))}
    </div>
  )
}
