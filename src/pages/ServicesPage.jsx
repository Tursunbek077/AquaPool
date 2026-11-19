import { useState } from 'react'
import { Link } from 'react-router'
import {
  Armchair,
  Baby,
  Droplets,
  Eye,
  GraduationCap,
  Medal,
  MonitorPlay,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Trophy,
  Users,
  Waves,
  CalendarDays,
  CircleCheck,
  Clock,
  Phone,
} from 'lucide-react'
import ServiceCard from '../components/cards/ServiceCard'
import { Badge, Button, Card, PageHeader, Section, SectionHeading } from '../components/common'
import { academyLevels, initialServices, serviceFilters } from '../data/initialServices'
import { cn } from '../utils/cn'

// Tab -> qaysi kategoriyalar ko'rsatiladi
const FILTER_CATEGORIES = {
  all: null,
  kids: ['kids'],
  adults: ['adults', 'individual'],
  aqua: ['aqua', 'spa'],
}

const LEVEL_ICONS = { 'aqua-start': Baby, 'aqua-pro': Waves, 'aqua-champion': Trophy }

const ACADEMY_PERKS = [
  {
    icon: Medal,
    title: 'Rasmiy sertifikatlash',
    text: "Har bir bosqich yakunida bolalarga maxsus xalqaro standartdagi sertifikat beriladi.",
  },
  {
    icon: MonitorPlay,
    title: 'Ota-onalar uchun kuzatuv',
    text: "Kafedan turib jonli ekranda mashg'ulot jarayonini bemalol kuzatish imkoniyati.",
  },
  {
    icon: Droplets,
    title: 'Ozonli tozalash tizimi',
    text: "Xlorsiz, ko'zni achitmaydigan va nozik teri uchun mutlaqo zararsiz toza suv.",
  },
]

const CHECKLIST = [
  { icon: Waves, title: 'Suzish kiyimi', text: 'Sport plavkasi yoki mayosi' },
  { icon: GraduationCap, title: 'Suzish qalpoqchasi', text: 'Silikon yoki matoli qalpoqcha' },
  { icon: Eye, title: "Suzish ko'zoynagi", text: "Ko'z qulayligi va aniq ko'rish" },
  { icon: Armchair, title: 'Shaxsiy shippak va sochiq', text: 'Toza rezina shippak' },
]

export default function ServicesPage() {
  const [filter, setFilter] = useState('all')

  const categories = FILTER_CATEGORIES[filter]
  const services = categories ? initialServices.filter((s) => categories.includes(s.category)) : initialServices
  const showAcademy = filter === 'all' || filter === 'kids'

  return (
    <>
      <PageHeader
        eyebrow={
          <Badge variant="ocean" dot className="whitespace-normal! text-left">
            TOSHKENTDAGI ENG YIRIK SUZISH KOMPLEKSI · Suv harorati: +28°C
          </Badge>
        }
        title="Bizning xizmatlarimiz va Suzish akademiyasi"
        description="Bolalardan kattalargacha — har qanday yosh va daraja uchun professional suzish darslari va sog'lomlashtirish dasturlari."
        aside={
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
            <ShieldCheck className="size-8 text-ocean-600" aria-hidden="true" />
            <p className="text-sm text-navy-500">
              <strong className="block text-navy-900">FINA standartlari</strong>
              50m olimpiya havzasi
            </p>
          </div>
        }
      >
        <div role="tablist" aria-label="Xizmat turlari" className="mt-8 flex flex-wrap gap-2">
          {serviceFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                filter === item.id ? 'bg-navy-900 text-white' : 'bg-white text-navy-700 hover:bg-aqua-200',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {showAcademy && (
        <Section id="akademiya" tone="soft">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600">
                <GraduationCap className="size-4" aria-hidden="true" /> Yosh chempionlar maskani
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">AquaPool Bolalar Suzish Akademiyasi</h2>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-700">
              <li className="flex items-center gap-1.5">
                <Users className="size-4 text-ocean-600" aria-hidden="true" /> Maksimal 8 bola
              </li>
              <li className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-ocean-600" aria-hidden="true" /> Haftada 3 marta
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-ocean-600" aria-hidden="true" /> 100% xavfsizlik
              </li>
            </ul>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {academyLevels.map((level) => {
              const Icon = LEVEL_ICONS[level.id]
              return (
                <Card key={level.id} tone={level.featured ? 'featured' : 'light'} className="flex flex-col">
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <Badge variant={level.featured ? 'ocean' : 'neutral'} size="sm">
                      {level.level}
                    </Badge>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ocean-600">
                    {level.step} ({level.ages})
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">{level.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{level.description}</p>
                  <ul className="mt-4 flex flex-col gap-2 text-sm">
                    {level.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between rounded-lg bg-aqua-100 px-3 py-2.5 text-sm">
                    <span className="text-navy-500">Mashg'ulot vaqti:</span>
                    <span className="font-bold">{level.duration} daqiqa</span>
                  </div>
                  <Button as={Link} to={`/jadval?xizmat=${level.id}`} fullWidth className="mt-4">
                    Ro'yxatdan o'tish →
                  </Button>
                </Card>
              )
            })}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-aqua-300 bg-white p-5 md:grid-cols-3">
            {ACADEMY_PERKS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone="aqua">
        <SectionHeading
          align="left"
          eyebrow="To'liq xizmatlar ro'yxati"
          title="Har bir tashrifingiz — salomatlik va quvvat manbai"
          action={<p className="text-sm text-navy-500">Barcha xizmatlarga onlayn bron mavjud</p>}
        />
        {services.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-navy-500">Bu bo'limda hozircha xizmat yo'q.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </Section>

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600">
              <CircleCheck className="size-4" aria-hidden="true" /> Tashrif buyuruvchilar uchun eslatma
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Mashg'ulot uchun nimalar kerak?</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              AquaPool majmuasida xavfsizlik va gigiyena talablari xalqaro me'yorlarga to'liq javob beradi.
              Mashg'ulotlarga kelishdan avval quyidagi anjomlar mavjudligiga ishonch hosil qiling:
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {CHECKLIST.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-center gap-3 rounded-xl bg-aqua-100 p-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-ocean-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-sm">{title}</strong>
                    <span className="text-xs text-navy-500">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Card tone="soft" className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ocean-700">
              <Stethoscope className="size-5" aria-hidden="true" /> Tibbiy ma'lumotnoma talabi
            </p>
            <p className="text-sm leading-relaxed text-navy-700">
              Barcha tashrif buyuruvchilar salomatligi va suv tozaligini ta'minlash maqsadida suzish havzasiga kirish
              uchun tibbiy ma'lumotnoma (forma 086 yoki dermatolog xulosasi) taqdim etilishi shart.
            </p>
            <div className="rounded-xl bg-white p-4 text-sm">
              <p className="flex items-center gap-2 font-bold">
                <Clock className="size-4 text-ocean-600" aria-hidden="true" /> Joyida ko'rikdan o'tish
              </p>
              <p className="mt-1 text-xs leading-relaxed text-navy-500">
                Agar sizda ma'lumotnoma bo'lmasa, majmuamiz shifokor kabinetida 10 daqiqa ichida tezkor tibbiy
                ko'rikdan o'tishingiz mumkin (Narxi: 20,000 so'm, muddati: 3 oy).
              </p>
            </div>
            <Button as={Link} to="/aloqa" variant="soft" leftIcon={<Phone className="size-4" />}>
              Shifokor bilan bog'lanish
            </Button>
          </Card>
        </div>
      </Section>

      <Section tone="aqua" className="pt-0 sm:pt-0">
        <div className="grid gap-6 rounded-3xl bg-gradient-to-br from-navy-950 to-navy-800 p-6 text-white sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <Badge variant="ocean">
              <Thermometer className="size-3" aria-hidden="true" /> Birinchi dars 100% bepul
            </Badge>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Farzandingiz yoki o'zingiz uchun mos darajani tanlashda qiynalyapsizmi?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-aqua-400">
              Tajribali katta murabbiyimiz bilan bepul diagnostika mashg'ulotiga yoziling. 30 daqiqa ichida suvga
              moslashuv va texnika darajangiz aniqlanadi!
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button as={Link} to="/jadval?xizmat=diagnostika" size="lg" fullWidth>
              Bepul diagnostikaga yozilish
            </Button>
            <Button as={Link} to="/aloqa" variant="soft" size="lg" fullWidth>
              Konsultatsiya olish
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
