import { useState } from 'react'
import { Link } from 'react-router'
import { CircleCheck, CreditCard, Droplets, FlaskConical, Info, Pause, Sun, Thermometer, Waves, Baby, Heart } from 'lucide-react'
import TariffCard from '../components/cards/TariffCard'
import { Accordion, Badge, Button, Card, PageHeader, Section, SectionHeading, SmartImage } from '../components/common'
import CallbackForm from '../components/home/CallbackForm'
import { initialFaq } from '../data/initialFaq'
import { initialMemberships, initialSingleVisits, YEARLY_DISCOUNT } from '../data/initialServices'
import { cn } from '../utils/cn'
import { formatPrice } from '../utils/formatters'

const VISIT_ICONS = { 'erta-seans': Sun, 'standart-seans': Thermometer, 'bolalar-chipta': Baby, 'sauna-basseyn': Heart }

const WHY_US = [
  {
    icon: Pause,
    title: 'Qulay muzlatish (Freezing)',
    text: "Xizmat safari, ta'til yoki kasallik sababli mashg'ulotni to'xtatishga majbur bo'lsangiz, oylik a'zolikni shaxsiy kabinet orqali 14 kungacha bepul muzlatish imkoniyati mavjud.",
    note: "Yo'qotishlarsiz va ortiqcha to'lovlarsiz",
  },
  {
    icon: FlaskConical,
    title: 'Toza suv va professional nazorat',
    text: "Avtomatlashtirilgan ko'p bosqichli qum va ultrabinafsha filtrlash tizimlari. Har bir yo'lakda xalqaro sertifikatga ega qutqaruvchilar va tibbiy mutaxassislar doimiy navbatchilikda.",
    note: 'Har 4 soatda laboratoriya tahlillari',
  },
  {
    icon: CreditCard,
    title: "Qulay to'lov",
    text: "Bron qilish bepul. To'lovni resepsiyada naqd yoki karta orqali amalga oshiring, yoki karta chekining rasmini shaxsiy kabinetga yuklang. Avtomatik chek va shartnoma taqdim etiladi.",
    note: 'Yuridik shaxslar uchun hisob-faktura',
  },
]

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly')

  return (
    <>
      <PageHeader
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="ocean" dot>
              A'ZOLIK VA TARIFLAR
            </Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700">
              <Waves className="size-3.5 text-ocean-600" aria-hidden="true" /> Hovuz harorati: +28.4°C
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700">
              <CircleCheck className="size-3.5 text-ocean-600" aria-hidden="true" /> DIN 19643 standarti
            </span>
          </div>
        }
        title="A'zolik paketlari va qulay narxlar"
        description="Sizning turmush tarzingizga moslashuvchan tariflar. Doimiy mashg'ulotlar uchun tejash imkoniyati, xalqaro gigiyena va professional murabbiylar nazorati."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div role="group" aria-label="To'lov davri" className="inline-flex rounded-xl bg-aqua-200 p-1">
            {[
              { id: 'monthly', label: "Oylik to'lov" },
              { id: 'yearly', label: "Yillik to'lov" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={billing === option.id}
                onClick={() => setBilling(option.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  billing === option.id ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-700 hover:text-navy-900',
                )}
              >
                {option.label}
                {option.id === 'yearly' && (
                  <Badge variant="ocean" size="sm">
                    TEJANG {YEARLY_DISCOUNT * 100}%
                  </Badge>
                )}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-navy-500">
            <Info className="size-4 text-ocean-600" aria-hidden="true" />
            Yillik tariflar bilan a'zolikni bepul 30 kungacha muzlatish kafolatlanadi.
          </p>
        </div>
      </PageHeader>

      <Section tone="aqua" className="pt-6 sm:pt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {initialMemberships.map((tariff) => (
            <TariffCard key={tariff.id} tariff={tariff} billing={billing} tone={tariff.popular ? 'dark' : 'light'} />
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          align="left"
          eyebrow="A'zoliksiz qatnashuvchilar uchun"
          title="Bir martalik tashriflar narxlari"
          description="Shunchaki bir bor suzib ko'rish yoki dam olish kunida hordiq chiqarish uchun qulay chiptalar."
          action={
            <p className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-navy-700 shadow-sm">
              <CreditCard className="size-4 text-ocean-600" aria-hidden="true" />
              Resepsiyada naqd va karta orqali to'lov qabul qilinadi
            </p>
          }
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <SmartImage
              src="/images/facilities/olimpiya-hovuz.webp"
              alt="50 metrli olimpiya basseyni"
              className="h-72 rounded-2xl lg:h-full"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-navy-950/85 to-transparent p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-ocean-300">Zamonaviy olimpiya standarti</p>
              <p className="mt-1 font-display text-xl font-bold">50 metrli 8 ta keng yo'lak va ozonli filtrlash tizimi</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {initialSingleVisits.map((visit) => {
              const Icon = VISIT_ICONS[visit.id] ?? Droplets
              return (
                <Card key={visit.id} className="flex flex-col">
                  <div className="flex items-start justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ocean-600">{visit.label}</p>
                    <Icon className="size-5 text-ocean-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{visit.title}</h3>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-navy-500">{visit.note}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="whitespace-nowrap font-display text-lg font-extrabold text-ocean-700">
                      {formatPrice(visit.price)} so'm
                    </p>
                    <Button as={Link} to={`/jadval?xizmat=${visit.id}`} variant="soft" size="sm" className="shrink-0 whitespace-nowrap">
                      Bron qilish
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="AquaPool xavfsizlik va xizmat kafolatlari"
          title="Nega bizning a'zolarimiz AquaPoolni tanlaydi?"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {WHY_US.map(({ icon: Icon, title, text, note }) => (
            <Card key={title} tone="soft" className="flex flex-col">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-ocean-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{text}</p>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-bold text-ocean-700">
                <CircleCheck className="size-4" aria-hidden="true" /> {note}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="aqua">
        <SectionHeading
          eyebrow="Savollaringiz bormi?"
          title="A'zolik bo'yicha ko'p beriladigan savollar"
          description="Qo'shimcha ma'lumotlar va qoidalar haqida aniq javoblar."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion items={initialFaq.slice(0, 4)} defaultOpenId={initialFaq[0].id} />
        </div>
      </Section>

      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-6 rounded-3xl bg-ocean-600 p-6 text-white sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Badge variant="dark">Maxsus konsultatsiya</Badge>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Qaysi tarif sizga mos kelishini bilmayapsizmi?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Raqamingizni qoldiring, mutaxassisimiz 10 daqiqa ichida qo'ng'iroq qilib, sizning jadvalingiz va
              maqsadingizga eng mos paketni hisoblab beradi.
            </p>
          </div>
          <CallbackForm source="narxlar-konsultatsiya" buttonLabel="Maslahat olish" layout="inline" />
        </div>
      </Section>
    </>
  )
}
