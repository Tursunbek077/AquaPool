import { cn } from '../../utils/cn'

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const TONES = {
  light: 'border border-aqua-300 bg-white text-navy-900 shadow-card',
  // Tavsiya etilgan tarif ("Premium VIP") uchun ajratilgan karta
  featured: 'border border-ocean-300 bg-white text-navy-900 shadow-pop ring-2 ring-ocean-600/30',
  // To'q karta (VIP tarif)
  dark: 'border border-navy-800 bg-navy-800 text-white shadow-pop',
  // Yumshoq havorang karta
  soft: 'border border-aqua-300 bg-aqua-100 text-navy-900',
}

export default function Card({
  as: Component = 'div',
  tone = 'light',
  padding = 'md',
  hoverable = false,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={cn(
        'rounded-2xl',
        TONES[tone],
        PADDING[padding],
        hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
