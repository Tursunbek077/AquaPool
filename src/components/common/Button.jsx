import { cn } from '../../utils/cn'
import Spinner from './Spinner'

const VARIANTS = {
  // Asosiy: "Bron qilish", "Joy band qilish"
  primary: 'bg-ocean-600 text-white shadow-sm hover:bg-ocean-700 active:bg-ocean-900',
  // Yumshoq: "Batafsil", "Tanlash"
  soft: 'bg-aqua-300 text-navy-900 hover:bg-aqua-400',
  // To'q: "Maslahat olish", to'q fondagi tugmalar
  dark: 'bg-navy-900 text-white hover:bg-navy-800',
  // Chiziqli
  outline: 'border border-ocean-600 bg-transparent text-ocean-700 hover:bg-ocean-100',
  // Fonsiz
  ghost: 'bg-transparent text-navy-900 hover:bg-aqua-200',
  // Bekor qilish / rad etish
  danger: 'bg-danger-600 text-white hover:bg-danger-600/90',
}

const SIZES = {
  sm: 'h-9 gap-1.5 px-3 text-sm',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-13 gap-2 px-7 text-base',
}

// `as` orqali boshqa element berish mumkin (masalan, 2-bosqichda react-router Link).
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  className,
  children,
  type,
  ...rest
}) {
  const isDisabled = disabled || loading
  const buttonProps = Component === 'button' ? { type: type ?? 'button', disabled: isDisabled } : {}

  return (
    <Component
      className={cn(
        'inline-flex select-none items-center justify-center rounded-lg font-semibold transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isDisabled && Component !== 'button' && 'pointer-events-none opacity-50',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...buttonProps}
      {...rest}
    >
      {loading ? <Spinner size="sm" label="Yuklanmoqda..." className="[&_svg]:text-current" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Component>
  )
}
