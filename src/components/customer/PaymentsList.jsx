import { Paperclip } from 'lucide-react'
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_UI } from '../../data/bookingStatuses'
import { isoDateOfTimestamp, longDate } from '../../utils/dates'
import { formatPrice } from '../../utils/formatters'
import { Badge, Button, Card } from '../common'

// To'lovlar tarixi. Karta cheki usulidagi, hali to'lanmagan to'lovlarda "Chek yuklash" tugmasi bor.
export default function PaymentsList({ items, onUpload }) {
  if (items.length === 0) {
    return (
      <Card tone="soft" className="text-center text-sm text-navy-500">
        To'lovlar tarixi hozircha bo'sh. Bron qilganingizda yoki a'zolik so'rovi yuborganingizda shu yerda ko'rinadi.
      </Card>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const status = PAYMENT_STATUS_UI[item.statusKey]
        const canUpload = item.method === 'receipt' && item.statusKey !== 'paid'
        return (
          <li key={item.key}>
            <Card padding="sm" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{item.title}</p>
                <p className="mt-0.5 text-xs text-navy-500">
                  {longDate(isoDateOfTimestamp(item.createdAt))} · {PAYMENT_METHOD_LABELS[item.method]}
                </p>
              </div>
              <p className="whitespace-nowrap font-display text-lg font-extrabold">
                {item.amount === null ? '—' : `${formatPrice(item.amount)} `}
                <span className="text-xs font-medium text-navy-500">{item.amountSuffix}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Badge variant={status.variant} size="sm">
                  {status.label}
                </Badge>
                {item.receipt && (
                  <span className="inline-flex items-center gap-1 text-xs text-navy-500">
                    <Paperclip className="size-3" aria-hidden="true" /> chek
                  </span>
                )}
                {canUpload && (
                  <Button size="sm" variant={item.receipt ? 'soft' : 'primary'} onClick={() => onUpload(item)}>
                    {item.receipt ? 'Chekni almashtirish' : 'Chek yuklash'}
                  </Button>
                )}
              </div>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
