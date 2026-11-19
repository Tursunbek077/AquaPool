import { cn } from '../../utils/cn'

const TEXT_COLORS = {
  available: 'text-ocean-700',
  low: 'text-warning-600',
  full: 'text-danger-600',
}

const BAR_COLORS = {
  available: 'bg-ocean-600',
  low: 'bg-warning-600',
  full: 'bg-danger-600',
}

// Slot bandligi: yozuv va rangli chiziq. state: available | low | full (utils/capacity.js)
export default function CapacityPill({ capacity }) {
  const { spotsLeft, total, percent, state } = capacity

  const label =
    state === 'full'
      ? "0 ta bo'sh joy (100% to'la)"
      : `${spotsLeft} / ${total} ta bo'sh joy qoldi${state === 'low' ? ' (Shoshiling)' : ''}`

  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-navy-700">Bandlik holati</span>
        <span className={cn('font-bold', TEXT_COLORS[state])}>{label}</span>
      </div>
      <div
        role="progressbar"
        aria-label="Bandlik"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-aqua-300"
      >
        <div className={cn('h-full rounded-full transition-all', BAR_COLORS[state])} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
