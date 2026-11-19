import { Droplets, Medal, Thermometer, Users, Waves } from 'lucide-react'

const STATS = [
  { icon: Waves, text: 'Olimpiya basseyni', value: '50m' },
  { icon: Thermometer, text: 'doimiy qulay harorat', value: '28°C' },
  { icon: Droplets, text: 'Ozon & UV filtratsiya', value: '' },
  { icon: Medal, text: 'tajribali murabbiy', value: '15+' },
  { icon: Users, text: 'mamnun mijoz', value: '5000+' },
]

export default function StatsStrip() {
  return (
    <section aria-label="Markaz haqida raqamlar" className="bg-aqua-50 pb-4 pt-10">
      <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-4 px-4 text-sm text-navy-700 sm:px-8">
        {STATS.map(({ icon: Icon, text, value }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon className="size-4 text-ocean-600" aria-hidden="true" />
            <span>
              {value && <strong className="font-bold text-navy-900">{value} </strong>}
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
