import { Link } from 'react-router'
import { History } from 'lucide-react'
import { Badge, Card, SmartImage } from '../common'

// Murabbiy kartasi. "Darsga yozilish" tanlangan murabbiy bilan Jadval sahifasini ochadi.
export default function CoachCard({ coach, variant = 'full' }) {
  return (
    <Card padding="sm" hoverable className="flex flex-col">
      <div className="relative">
        <SmartImage src={coach.image} alt={coach.name} className="aspect-[4/5] rounded-xl" />
        <Badge variant="dark" size="sm" className="absolute bottom-3 left-3 bg-navy-900/85 backdrop-blur">
          {coach.role}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <h3 className="text-xl font-bold">{coach.name}</h3>
        <p className="mt-0.5 text-xs font-bold text-ocean-600">{coach.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">{coach.bio}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-aqua-100 px-3 py-2 font-semibold">
            <History className="size-3.5 text-ocean-600" aria-hidden="true" />
            Haftalik: {coach.weeklyHours} dars soati
          </span>
          <Link
            to={`/jadval?murabbiy=${coach.id}#slotlar`}
            className="font-bold text-ocean-700 transition-colors hover:text-ocean-900"
          >
            {variant === 'compact' ? 'Jadvalni ko\'rish →' : 'Darsga yozilish →'}
          </Link>
        </div>
      </div>
    </Card>
  )
}
