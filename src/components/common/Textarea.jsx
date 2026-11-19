import { useId } from 'react'
import { cn } from '../../utils/cn'

export default function Textarea({ label, error, hint, id, className, ref, ...rest }) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = `${fieldId}-msg`
  const message = error || hint

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-navy-900">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        ref={ref}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'w-full resize-y rounded-lg border bg-white px-3.5 py-3 text-sm text-navy-900 placeholder:text-navy-400',
          'focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20',
          error ? 'border-danger-600' : 'border-aqua-400',
        )}
        {...rest}
      />
      {message && (
        <p id={messageId} className={cn('text-xs', error ? 'text-danger-600' : 'text-navy-500')}>
          {message}
        </p>
      )}
    </div>
  )
}
