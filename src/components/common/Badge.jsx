import { cn } from '../../utils/cn'

const VARIANTS = {
  neutral: 'bg-aqua-300 text-navy-700',
  ocean: 'bg-ocean-100 text-ocean-700',
  // Bron holatlari: Tasdiqlandi / Kutilmoqda / Bekor qilindi
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  danger: 'bg-danger-50 text-danger-600',
  dark: 'bg-navy-900 text-white',
}

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
}

export default function Badge({ variant = 'neutral', size = 'md', dot = false, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
