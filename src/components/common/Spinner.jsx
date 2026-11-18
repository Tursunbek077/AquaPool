import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

const SIZES = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-10',
}

// Yuklanish indikatori. `label` ekran o'quvchilar uchun matn.
export default function Spinner({ size = 'md', label = 'Yuklanmoqda...', className }) {
  return (
    <span role="status" className={cn('inline-flex items-center', className)}>
      <Loader2 className={cn('animate-spin text-ocean-600', SIZES[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}
