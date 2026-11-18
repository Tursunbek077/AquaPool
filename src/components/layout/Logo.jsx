import { Link } from 'react-router'
import { Waves } from 'lucide-react'
import { cn } from '../../utils/cn'

// AquaPool logotipi: bosh sahifaga olib boradi.
export default function Logo({ tone = 'light', className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="AquaPool, bosh sahifa"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-ocean-600 text-white">
        <Waves className="size-5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          'font-display text-xl font-extrabold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-navy-900',
        )}
      >
        AquaPool
      </span>
    </Link>
  )
}
