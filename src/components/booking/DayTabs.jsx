import { cn } from '../../utils/cn'
import { shortDate, weekdayName } from '../../utils/dates'

// Haftaning 7 kuni: bugun va ertaga uchun maxsus yozuv.
export default function DayTabs({ dates, today, selected, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Kunni tanlang"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {dates.map((date, index) => {
        const active = date === selected
        const sub = date === today ? 'Bugun' : index === 1 ? 'Ertaga' : shortDate(date)
        return (
          <button
            key={date}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(date)}
            className={cn(
              'flex min-w-[6.5rem] shrink-0 flex-col items-start rounded-xl px-4 py-2.5 text-left transition-colors',
              active ? 'bg-navy-900 text-white shadow-sm' : 'bg-white text-navy-900 hover:bg-aqua-200',
            )}
          >
            <span className="text-sm font-bold">{weekdayName(date)}</span>
            <span className={cn('text-xs', active ? 'text-aqua-400' : 'text-navy-500')}>{sub}</span>
          </button>
        )
      })}
    </div>
  )
}
