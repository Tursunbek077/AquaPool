import { Link } from 'react-router'
import { Hourglass, ShieldCheck } from 'lucide-react'
import { longDate } from '../../utils/dates'
import { formatPrice } from '../../utils/formatters'
import { Badge, Button, Card } from '../common'

// Joriy a'zolik: tarif, tugash sanasi, qolgan tashriflar. membership.state: 'active' | 'pending'.
export default function MembershipCard({ membership, state, visits }) {
  const active = state === 'active'
  const percentUsed = visits.unlimited || !visits.total ? 0 : Math.min(Math.round((visits.used / visits.total) * 100), 100)

  return (
    <Card tone={active ? 'dark' : 'soft'} padding="lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-12 items-center justify-center rounded-xl ${active ? 'bg-ocean-600 text-white' : 'bg-white text-ocean-600'}`}
          >
            {active ? <ShieldCheck className="size-6" aria-hidden="true" /> : <Hourglass className="size-6" aria-hidden="true" />}
          </span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-ocean-300' : 'text-ocean-600'}`}>
              Joriy a'zolik
            </p>
            <h2 className={`text-2xl font-extrabold ${active ? 'text-white' : ''}`}>{membership.tariffName}</h2>
          </div>
        </div>
        <Badge variant={active ? 'ocean' : 'warning'} dot>
          {active ? 'Faol' : "To'lov tasdig'i kutilmoqda"}
        </Badge>
      </div>

      {active ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-aqua-400">Amal qilish muddati</p>
            <p className="mt-0.5 font-display text-lg font-bold">
              {longDate(membership.startDate)} — {longDate(membership.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-aqua-400">Qolgan tashriflar</p>
            {visits.unlimited ? (
              <p className="mt-0.5 font-display text-lg font-bold">Cheksiz tashriflar</p>
            ) : (
              <>
                <p className="mt-0.5 font-display text-lg font-bold">
                  {visits.total} tadan {visits.left} ta qoldi
                </p>
                <div
                  role="progressbar"
                  aria-label="Sarflangan tashriflar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentUsed}
                  className="mt-2 h-2 overflow-hidden rounded-full bg-navy-700"
                >
                  <div className="h-full rounded-full bg-ocean-500" style={{ width: `${percentUsed}%` }} />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-navy-700">
          {membership.billing === 'yearly' ? 'Yillik' : 'Oylik'} to'lov, {formatPrice(membership.amount)} so'm. Administrator
          to'lovni tasdiqlagach a'zolik faollashadi va tashriflar limiti shu yerda ko'rinadi.
        </p>
      )}

      <div className="mt-5">
        <Button as={Link} to="/jadval" variant={active ? 'primary' : 'soft'} size="sm">
          Mashg'ulotga yozilish
        </Button>
      </div>
    </Card>
  )
}
