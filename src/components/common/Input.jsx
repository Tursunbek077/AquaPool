import { useId } from 'react'
import { cn } from '../../utils/cn'

// Matn kiritish maydoni: label, xato va yordam matni bilan.
// React 19: `ref` oddiy prop sifatida keladi.
export default function Input({
  label,
  error,
  hint,
  icon,
  id,
  className,
  inputClassName,
  ref,
  ...rest
}) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-msg`
  const message = error || hint

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-navy-900">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-navy-500">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-navy-900 placeholder:text-navy-400',
            'transition-colors focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20',
            'disabled:cursor-not-allowed disabled:bg-aqua-100 disabled:text-navy-400',
            icon && 'pl-10',
            error ? 'border-danger-600 focus:border-danger-600 focus:ring-danger-600/20' : 'border-aqua-400',
            inputClassName,
          )}
          {...rest}
        />
      </div>
      {message && (
        <p id={messageId} className={cn('text-xs', error ? 'text-danger-600' : 'text-navy-500')}>
          {message}
        </p>
      )}
    </div>
  )
}
