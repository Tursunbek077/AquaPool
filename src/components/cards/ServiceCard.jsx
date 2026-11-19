import { Link } from 'react-router'
import { ArrowRight, Clock } from 'lucide-react'
import { formatPrice } from '../../utils/formatters'
import { Badge, Button, Card, SmartImage } from '../common'

// Xizmat kartasi. variant="compact": bosh sahifa (qisqa), "full": Xizmatlar sahifasi (batafsil).
export default function ServiceCard({ service, variant = 'full' }) {
  const bookTo = `/jadval?xizmat=${service.id}`

  return (
    <Card padding="none" hoverable className="flex flex-col overflow-hidden">
      <div className="relative">
        <SmartImage
          src={`/images/facilities/${service.id}.webp`}
          alt={service.title}
          className={variant === 'full' ? 'h-44' : 'h-40'}
        />
        <Badge variant="dark" size="sm" className="absolute bottom-3 left-3 bg-navy-900/85 backdrop-blur">
          <Clock className="size-3" aria-hidden="true" />
          {service.duration} daqiqa
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-ocean-600">{service.tag}</p>
          <p className="shrink-0 font-display text-lg font-extrabold">
            {formatPrice(service.price)}{' '}
            <span className="text-xs font-medium text-navy-500">{service.priceNote}</span>
          </p>
        </div>
        <h3 className="mt-1 text-lg font-bold">{service.title}</h3>

        {variant === 'full' && (
          <>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">{service.description}</p>
            <dl className="mt-4 flex flex-col gap-2 rounded-xl bg-aqua-100 p-3 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-navy-500">Kimga mos:</dt>
                <dd className="text-right font-semibold">{service.suitableFor}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-navy-500">Qulayliklar:</dt>
                <dd className="text-right font-semibold">{service.capacityNote}</dd>
              </div>
            </dl>
          </>
        )}

        <div className="mt-auto flex gap-2 pt-5">
          {variant === 'full' && (
            <Button as={Link} to="/aloqa" variant="soft" size="sm" className="flex-1">
              Batafsil
            </Button>
          )}
          <Button
            as={Link}
            to={bookTo}
            size="sm"
            className="flex-1"
            rightIcon={variant === 'compact' ? <ArrowRight className="size-3.5" /> : undefined}
          >
            Bron qilish
          </Button>
        </div>
      </div>
    </Card>
  )
}
