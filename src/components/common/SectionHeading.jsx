import { cn } from '../../utils/cn'

// Bo'lim sarlavhasi: kichik yorliq (eyebrow), katta sarlavha va izoh.
export default function SectionHeading({ eyebrow, title, description, align = 'center', action, className }) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4',
        centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ocean-600">{eyebrow}</p>
        )}
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base text-navy-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
