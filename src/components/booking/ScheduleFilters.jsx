import { Droplets, RefreshCw, Sun, User } from 'lucide-react'
import { GENDER_OPTIONS, TIME_BANDS } from '../../data/initialSchedule'
import { cn } from '../../utils/cn'
import { Select } from '../common'

const GENDER_TABS = [
  { value: '', label: 'Barchasi' },
  ...Object.entries(GENDER_OPTIONS).map(([value, option]) => ({ value, label: option.filterLabel })),
]

// Filtrlar: xizmat turi, murabbiy, vaqt oralig'i va gender (Erkaklar/Ayollar soatlari).
// value: { xizmat, murabbiy, vaqt, jins } (bo'sh qator = filtr yo'q)
export default function ScheduleFilters({ value, services, coaches, onChange, onReset }) {
  const serviceOptions = [
    { value: '', label: 'Barcha xizmat turlari' },
    ...services.map((service) => ({ value: service.id, label: service.title })),
  ]
  const coachOptions = [
    { value: '', label: 'Barcha murabbiylar' },
    ...coaches.map((coach) => ({ value: coach.id, label: coach.name })),
  ]
  const timeOptions = [{ value: '', label: 'Barcha vaqtlar' }, ...TIME_BANDS]

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <Select
          aria-label="Xizmat turi"
          icon={<Droplets className="size-4" />}
          options={serviceOptions}
          value={value.xizmat}
          onChange={(e) => onChange({ xizmat: e.target.value })}
        />
        <Select
          aria-label="Murabbiy"
          icon={<User className="size-4" />}
          options={coachOptions}
          value={value.murabbiy}
          onChange={(e) => onChange({ murabbiy: e.target.value })}
        />
        <Select
          aria-label="Vaqt oralig'i"
          icon={<Sun className="size-4" />}
          options={timeOptions}
          value={value.vaqt}
          onChange={(e) => onChange({ vaqt: e.target.value })}
        />
        <button
          type="button"
          onClick={onReset}
          aria-label="Filtrlarni tozalash"
          title="Filtrlarni tozalash"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-aqua-300 px-4 text-sm font-semibold text-navy-700 transition-colors hover:bg-aqua-400 sm:col-span-2 lg:col-span-1"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          <span className="lg:sr-only">Tozalash</span>
        </button>
      </div>

      <div role="group" aria-label="Erkaklar va ayollar soatlari" className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold text-navy-500">Kimlar uchun:</span>
        {GENDER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={value.jins === tab.value}
            onClick={() => onChange({ jins: tab.value })}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
              value.jins === tab.value ? 'bg-ocean-600 text-white' : 'bg-white text-navy-700 hover:bg-aqua-200',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
