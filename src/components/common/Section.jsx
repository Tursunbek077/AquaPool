import { cn } from '../../utils/cn'

const TONES = {
  white: 'bg-white',
  aqua: 'bg-aqua-50',
  soft: 'bg-aqua-100',
}

// Sahifa bo'limi: fon rangi, ichki oraliq va markazlashgan konteyner.
export default function Section({ tone = 'aqua', id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-16 sm:py-20', TONES[tone], className)}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-8', containerClassName)}>{children}</div>
    </section>
  )
}
