import { Link } from 'react-router'
import { ArrowRight, Droplets, Flag, Gauge, ShieldCheck, Thermometer } from 'lucide-react'
import { Badge, Button, SmartImage } from '../common'

const LIVE_STATS = [
  { icon: Thermometer, label: 'Suv harorati: 28.2°C' },
  { icon: Gauge, label: 'pH balansi: 7.2 (Ideal)' },
  { icon: Flag, label: "10 ta ochiq yo'lak" },
]

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-aqua-100 to-aqua-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 pt-10 sm:px-8 lg:grid-cols-2 lg:pt-16">
        <div>
          <Badge variant="ocean" dot>
            TOSHKENTDAGI ENG ZAMONAVIY SPORT MAJMUASI
          </Badge>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Sog'lom hayot va suzish zavqi bir joyda —{' '}
            <span className="text-ocean-600">AquaPool markazi</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-500 sm:text-lg">
            Zamonaviy 50 metrlik olimpiya standartidagi basseyn, xalqaro toifadagi murabbiylar va 5 bosqichli xavfsiz
            suv tozalash tizimi bilan professional tajribani his eting.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button as={Link} to="/jadval" size="lg" leftIcon={<Droplets className="size-5" />}>
              Mashg'ulotni bron qilish
            </Button>
            <Button as={Link} to="/xizmatlar" variant="soft" size="lg" rightIcon={<ArrowRight className="size-4" />}>
              Xizmatlar bilan tanishish
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-navy-700">
            {LIVE_STATS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-ocean-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <SmartImage
            src="/images/pool-hero.webp"
            alt="AquaPool olimpiya standartidagi yopiq basseyn"
            loading="eager"
            className="aspect-[4/3] rounded-3xl shadow-pop"
          />
          <div className="absolute -bottom-6 left-4 flex max-w-[16rem] items-center gap-3 rounded-2xl bg-white p-4 shadow-pop sm:left-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ocean-100 text-ocean-700">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-xs leading-snug text-navy-500">
              <span className="block font-display text-lg font-extrabold text-navy-900">5000+</span>
              Muvaffaqiyatli darslar va sertifikatlangan bitiruvchilar
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
