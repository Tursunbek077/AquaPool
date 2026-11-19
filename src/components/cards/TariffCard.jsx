import { Link } from 'react-router'
import { CircleCheck, CircleX, Star } from 'lucide-react'
import { YEARLY_DISCOUNT } from '../../data/initialServices'
import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatters'
import { Badge, Button, Card } from '../common'

// A'zolik tarifi kartasi.
// tone: "light" (oddiy), "featured" (bosh sahifadagi ajratilgan), "dark" (Narxlar sahifasidagi VIP)
export default function TariffCard({ tariff, billing = 'monthly', tone = 'light' }) {
  const dark = tone === 'dark'
  const yearly = billing === 'yearly'
  const monthlyPrice = yearly ? Math.round(tariff.monthlyPrice * (1 - YEARLY_DISCOUNT)) : tariff.monthlyPrice

  return (
    <Card tone={tone} padding="none" className={cn('relative flex flex-col p-6', dark && 'lg:-my-3 lg:py-9')}>
      {tariff.popular && (
        <Badge variant="ocean" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm">
          <Star className="size-3" aria-hidden="true" />
          ENG MASHHUR TARIF
        </Badge>
      )}

      <p className={cn('text-xs font-bold uppercase tracking-widest', dark ? 'text-ocean-300' : 'text-ocean-600')}>
        {tariff.label}
      </p>
      <h3 className={cn('mt-1 text-2xl font-extrabold', dark && 'text-white')}>{tariff.name}</h3>
      <p className={cn('mt-1 text-sm', dark ? 'text-aqua-400' : 'text-navy-500')}>{tariff.description}</p>

      <p className="mt-5 font-display text-3xl font-extrabold">
        {formatPrice(monthlyPrice)}{' '}
        <span className={cn('whitespace-nowrap text-sm font-medium', dark ? 'text-aqua-400' : 'text-navy-500')}>
          so'm / oy
        </span>
      </p>
      <p className={cn('mt-1 text-xs', dark ? 'text-ocean-300' : 'text-navy-500')}>
        {yearly
          ? `Yiliga ${formatPrice(monthlyPrice * 12)} so'm (20% tejaysiz)`
          : tariff.visits
            ? 'oyiga bir kishi uchun'
            : 'oylik cheksiz limit'}
      </p>

      <ul className={cn('mt-5 flex flex-1 flex-col gap-2.5 border-t pt-5 text-sm', dark ? 'border-navy-700' : 'border-aqua-300')}>
        {tariff.features.map((feature) => (
          <li
            key={feature.text}
            className={cn('flex items-start gap-2.5', !feature.included && 'text-navy-400 line-through decoration-1')}
          >
            {feature.included ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-ocean-500" aria-hidden="true" />
            ) : (
              <CircleX className="mt-0.5 size-4 shrink-0 text-navy-400" aria-hidden="true" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Button
        as={Link}
        to={`/kabinet/azolik?tarif=${tariff.id}`}
        variant={dark || tone === 'featured' ? 'primary' : 'soft'}
        fullWidth
        className="mt-6"
      >
        {dark ? "VIP a'zo bo'lish" : tone === 'featured' ? "A'zolikni rasmiylashtirish" : 'Tanlash'}
      </Button>
    </Card>
  )
}
