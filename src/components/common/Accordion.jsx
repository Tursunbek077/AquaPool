import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

function AccordionItem({ item, open, onToggle }) {
  const panelId = useId()
  return (
    <div className={cn('rounded-xl border transition-colors', open ? 'border-ocean-300 bg-white' : 'border-transparent bg-aqua-100')}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold"
        >
          {item.question}
          <ChevronDown
            className={cn('size-5 shrink-0 text-ocean-600 transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="px-5 pb-5 text-sm leading-relaxed text-navy-700"
      >
        {item.answer}
      </div>
    </div>
  )
}

// FAQ akkordeoni: bir vaqtda bitta javob ochiq turadi.
export default function Accordion({ items, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId)
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  )
}
