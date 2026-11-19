import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

// Tanlash maydoni. options: [{ value, label }]
export default function Select({ label, options, icon, id, className, selectClassName, ref, ...rest }) {
  const autoId = useId()
  const selectId = id ?? autoId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-navy-500">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ocean-600">{icon}</span>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-aqua-400 bg-white pr-9 text-sm text-navy-900',
            'focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20',
            icon ? 'pl-10' : 'pl-3.5',
            selectClassName,
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-navy-500"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
